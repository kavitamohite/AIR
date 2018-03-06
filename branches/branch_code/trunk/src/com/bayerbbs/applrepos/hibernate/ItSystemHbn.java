package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.CiBase;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.dto.ItSystemNetworkInformationDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.KeyValueType2DTO;
import com.bayerbbs.applrepos.dto.KeyValueTypeDTO;
import com.bayerbbs.applrepos.dto.OsNameDTO;
import com.bayerbbs.applrepos.dto.OsTypeDTO;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiDetailParameterInput;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;
import com.bayerbbs.applrepos.service.ItSytemNetworkInformationOutPut;
import com.bayerbbs.applrepos.service.LDAPAuthWS;

public class ItSystemHbn extends BaseHbn {
	private static final Log log = LogFactory.getLog(ItSystemHbn.class);

	public static CiEntityEditParameterOutput deleteItSystem(String cwid, ItSystemDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();

			if (null != dto.getId() && 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				Session session = HibernateUtil.getSession();
				Transaction tx = session.beginTransaction();
				ItSystem itSystem = (ItSystem) session.get(ItSystem.class, id);

				if (null == itSystem) {
					// application was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the itSystem id " + id + " was not found in database" });
				}

				// if it is not already marked as deleted, we can do it
				else if (null == itSystem.getDeleteTimestamp()) {
					itSystem.setDeleteUser(cwid);
					itSystem.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					itSystem.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());

					boolean toCommit = false;
					try {
						session.saveOrUpdate(itSystem);
						session.flush();
						toCommit = true;
					} catch (Exception e) {
						log.error(e.getMessage());
						// handle exception
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { e.getMessage() });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session, toCommit);

						if (toCommit) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output.setResult(AirKonstanten.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}
					}
				} else {
					// application is already deleted
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the itSystem is already deleted" });
				}
			} else {
				// application id is missing
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the itSystem id is missing or invalid" });
			}
		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}

	public static CiEntityEditParameterOutput saveItSystem(String cwid, ItSystemDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;

		if (null != cwid) {
			cwid = cwid.toUpperCase();

			boolean hasBusinessEssentialChanged = false;
			Long businessEssentialIdOld = null;

			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				List<String> messages = validateItSystem(dto, true);

				if (messages.isEmpty()) {
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					ItSystem itSystem = (ItSystem) session.get(ItSystem.class, id);

					if (null == itSystem) {
						// itSystem was not found in database
						output.setErrorMessage("1000", EMPTY + id);
					} else if (null != itSystem.getDeleteTimestamp()) {
						// itSystem is deleted
						output.setErrorMessage("1001", EMPTY + id);
					} else {
						// itSystem found - change values

						hasBusinessEssentialChanged = false;
						businessEssentialIdOld = itSystem.getBusinessEssentialId();
						if (null == dto.getBusinessEssentialId()) {
							if (null == itSystem.getBusinessEssentialId()) {
								// set the default value
								itSystem.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
								hasBusinessEssentialChanged = true;
							}
						} else {
							if (null == itSystem.getBusinessEssentialId()
									|| itSystem.getBusinessEssentialId()
											.longValue() != dto
											.getBusinessEssentialId()
											.longValue()) {
								hasBusinessEssentialChanged = true;
							}
							itSystem.setBusinessEssentialId(dto.getBusinessEssentialId());
						}

						setUpCi(itSystem, dto, cwid, false);
						setUpItSystem(itSystem, dto, cwid);

						if (dto.getUpStreamAdd() != null
								&& dto.getUpStreamAdd().length() > 0
								|| dto.getUpStreamDelete() != null
								&& dto.getUpStreamDelete().length() > 0)
							CiEntitiesHbn.saveCiRelations(dto.getTableId(),
									dto.getId(), dto.getUpStreamAdd(),
									dto.getUpStreamDelete(), AirKonstanten.UP,
									cwid);

						if (dto.getDownStreamAdd() != null
								&& dto.getDownStreamAdd().length() > 0
								|| dto.getDownStreamDelete() != null
								&& dto.getDownStreamDelete().length() > 0)
							CiEntitiesHbn.saveCiRelations(dto.getTableId(),
									dto.getId(), dto.getDownStreamAdd(),
									dto.getDownStreamDelete(),
									AirKonstanten.DN, cwid);
					}

					boolean toCommit = false;

					try {
						if (null == validationMessage) {
							if (null != itSystem
									&& null == itSystem.getDeleteTimestamp()) {
								session.saveOrUpdate(itSystem);
								session.flush();

								toCommit = true;

								if (hasBusinessEssentialChanged) {
									sendBusinessEssentialChangedMail(itSystem,
											dto, businessEssentialIdOld);
								}

							}
						}
					} catch (Exception e) {
						String message = e.getMessage();
						log.error(message);
						// handle exception
						output.setResult(AirKonstanten.RESULT_ERROR);
						message = ApplReposHbn.getOracleTransbaseErrorMessage(message);
						output.setMessages(new String[] { message });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session, toCommit);
						if (toCommit && null != itSystem) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output.setResult(AirKonstanten.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}

						if (itSystem.getRefId() == null && itSystem.getItsecGroupId() != null) {
							// Anlegen der ITSec Massnahmen
							ItsecMassnahmeStatusHbn.saveSaveguardAssignment(
									dto.getTableId(), itSystem.getId(),
									itSystem.getItsecGroupId());
						}
					}
				} else {
					// messages
					output.setResult(AirKonstanten.RESULT_ERROR);
					String astrMessages[] = new String[messages.size()];
					for (int i = 0; i < messages.size(); i++) {
						astrMessages[i] = messages.get(i);
					}
					output.setMessages(astrMessages);
				}

			} else {
				// application id is missing
				output.setErrorMessage("1003");
			}

		} else {
			// cwid missing
			output.setErrorMessage("100");
		}

		if (AirKonstanten.RESULT_ERROR.equals(output.getResult())) {
			// errorcodes / Texte
			if (null != output.getMessages() && output.getMessages().length > 0) {
				output.setDisplayMessage(output.getMessages()[0]);
			}
		}

		return output;
	}

	private static void setUpItSystem(ItSystem itSystem, ItSystemDTO dto,
			String cwid) {
		if (null != dto.getAlias() && dto.getAlias().length() > 0)
			itSystem.setAlias(dto.getAlias());

		if (null != dto.getOsNameId()) {
			if (dto.getOsNameId() > -1)
				itSystem.setOsNameId(dto.getOsNameId());
			else
				itSystem.setOsNameId(null);
		}

		if (DELETE.equals(dto.getClusterCode()))
			itSystem.setClusterCode(null);// DB (Trigger?) defaults to "N"
		else
			itSystem.setClusterCode(dto.getClusterCode());

		if (DELETE.equals(dto.getClusterType()))
			itSystem.setClusterType(null);
		else
			itSystem.setClusterType(dto.getClusterType());

		if(DELETE.equals(dto.getBackupType()))
			itSystem.setBackupType(null);
		else
			itSystem.setBackupType(dto.getBackupType());
		
		if (DELETE.equals(dto.getVirtualHardwareSoftware()))
			itSystem.setVirtualHardwareSoftware(null);
		else
			itSystem.setVirtualHardwareSoftware(dto.getVirtualHardwareSoftware());
		
		if(DELETE.equals(dto.getServicePack()))
			itSystem.setServicePack(null);
		else
			itSystem.setServicePack(dto.getServicePack());
		

		if (DELETE.equals(dto.getIsVirtualHardwareClient()))
			itSystem.setIsVirtualHardwareClient(null);
		else
			itSystem.setIsVirtualHardwareClient(dto
					.getIsVirtualHardwareClient());

		if (DELETE.equals(dto.getIsVirtualHardwareHost()))
			itSystem.setIsVirtualHardwareHost(null);
		else
			itSystem.setIsVirtualHardwareHost(dto.getIsVirtualHardwareHost());

		if (null != dto.getLifecycleStatusId()) {
			if (dto.getLifecycleStatusId() > -1)
				itSystem.setLifecycleStatusId(dto.getLifecycleStatusId());
			else
				itSystem.setLifecycleStatusId(null);
		}

		if (null != dto.getEinsatzStatusId()) {
			if (dto.getEinsatzStatusId() > -1)
				itSystem.setEinsatzStatusId(dto.getEinsatzStatusId());
			else
				itSystem.setEinsatzStatusId(null);
		}

		if (null != dto.getPrimaryFunctionId()) {
			if (dto.getPrimaryFunctionId() > -1)
				itSystem.setPrimaryFunctionId(dto.getPrimaryFunctionId());
			else
				itSystem.setPrimaryFunctionId(null);
		}

		if (null != dto.getLicenseScanningId()) {
			if (dto.getLicenseScanningId() > -1)
				itSystem.setLicenseScanningId(dto.getLicenseScanningId());
			else
				itSystem.setLicenseScanningId(null);
		}

		if (null != dto.getPriorityLevelId()) {
			if (-1 == dto.getPriorityLevelId()) {
				itSystem.setPriorityLevelId(null);
			} else {
				itSystem.setPriorityLevelId(dto.getPriorityLevelId());
			}
		}

		if (null != dto.getSeverityLevelId()) {
			if (-1 == dto.getSeverityLevelId()) {
				itSystem.setSeverityLevelId(null);
			} else {
				itSystem.setSeverityLevelId(dto.getSeverityLevelId());
			}
		}

		if (null == dto.getBusinessEssentialId()) {
			// messages.add("business essential is empty");
			// TODO 1 TESTCODE getBusinessEssentialId
			dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
		}

		itSystem.setBusinessEssentialId(dto.getBusinessEssentialId());
		itSystem.setCiSubTypeId(dto.getCiSubTypeId());
	}

	public static CiEntityEditParameterOutput reactivateItSystem(String cwid,
			ItSystemDTO dto, ItSystem itSystem) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		if (null == itSystem) {
			// application was not found in database
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "the itSystem was not found in database" });
		} else {
			Timestamp tsNow = ApplReposTS.getCurrentTimestamp();

			// system platform found - change values
			itSystem.setUpdateUser(cwid);
			itSystem.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			itSystem.setUpdateTimestamp(tsNow);
			// override INSERT-attributes
			itSystem.setInsertUser(cwid);
			itSystem.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			itSystem.setInsertTimestamp(tsNow);

			// reactivate DELETE-attributes
			itSystem.setDeleteTimestamp(null);
			itSystem.setDeleteQuelle(null);
			itSystem.setDeleteUser(null);

			itSystem.setName(null);

			itSystem.setCiOwner(null);
			itSystem.setCiOwnerDelegate(null);

			itSystem.setItset(null);
			itSystem.setTemplate(null);
			itSystem.setItsecGroupId(null);
			itSystem.setRefId(null);

			itSystem.setRelevanceICS(null);
			itSystem.setRelevanceITSEC(null);
			itSystem.setGxpFlag(null);
		}

		boolean toCommit = false;
		try {
			if (null != itSystem) {
				session.saveOrUpdate(itSystem);
				session.flush();
			}
			toCommit = true;
		} catch (Exception e) {
			log.error(e.getMessage());
			// handle exception
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { e.getMessage() });
		} finally {
			String hbnMessage = HibernateUtil.close(tx, session, toCommit);
			if (toCommit && null != itSystem) {
				if (null == hbnMessage) {
					output.setResult(AirKonstanten.RESULT_OK);
					output.setMessages(new String[] { EMPTY });
				} else {
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { hbnMessage });
				}
			}
		}

		return output;
	}

	public static CiEntityEditParameterOutput createItSystem(String cwid,
			ItSystemDTO dto, Boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();

			if (null != dto.getId() && 0 == dto.getId()) {

				List<String> messages = validateItSystem(dto, false);// validateCi
																		// ,
																		// listCi

				if (messages.isEmpty()) {
					ItSystem itSystem = new ItSystem();
					boolean isNameAndAliasNameAllowed = true;

					if (isNameAndAliasNameAllowed) {
						// create the ci

						Session session = HibernateUtil.getSession();
						Transaction tx = null;
						tx = session.beginTransaction();

						setUpCi(itSystem, dto, cwid, true);
						setUpItSystem(itSystem, dto, cwid);

						boolean toCommit = false;
						try {
							session.save(itSystem);
							dto.setId(itSystem.getId());
							session.flush();
							if (dto.getUpStreamAdd() != null
									&& dto.getUpStreamAdd().length() > 0
									|| dto.getUpStreamDelete() != null
									&& dto.getUpStreamDelete().length() > 0)
								CiEntitiesHbn.saveCiRelations(dto.getTableId(),
										dto.getId(), dto.getUpStreamAdd(),
										dto.getUpStreamDelete(),
										AirKonstanten.UP, cwid);
							if (dto.getDownStreamAdd() != null
									&& dto.getDownStreamAdd().length() > 0
									|| dto.getDownStreamDelete() != null
									&& dto.getDownStreamDelete().length() > 0)
								CiEntitiesHbn.saveCiRelations(dto.getTableId(),
										dto.getId(), dto.getDownStreamAdd(),
										dto.getDownStreamDelete(),
										AirKonstanten.DN, cwid);
							toCommit = true;
						} catch (Exception e) {
							// handle exception
							output.setResult(AirKonstanten.RESULT_ERROR);
							output.setMessages(new String[] { e.getMessage() });
						} finally {
							String hbnMessage = HibernateUtil.close(tx,
									session, toCommit);
							if (toCommit) {
								if (null == hbnMessage) {
									output.setResult(AirKonstanten.RESULT_OK);
									output.setMessages(new String[] { EMPTY });
									output.setTableId(dto.getTableId());
									output.setCiSubTypeId(dto.getCiSubTypeId());
								} else {
									output.setResult(AirKonstanten.RESULT_ERROR);
									output.setMessages(new String[] { hbnMessage });
								}
							}
						}
					}
				} else {
					// messages
					output.setResult(AirKonstanten.RESULT_ERROR);
					String astrMessages[] = new String[messages.size()];
					for (int i = 0; i < messages.size(); i++) {
						astrMessages[i] = messages.get(i);
					}
					output.setMessages(astrMessages);
				}
			} else {
				// ci id not 0
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the ci id should not be 0" });
			}
		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		return output;
	}

	protected static StringBuilder getAdvSearchCiBaseSql(
			CiSearchParamsDTO input, CiMetaData metaData) {
		StringBuilder sql = new StringBuilder();
		// Start Adding for C0000241362 
		String complainceGR1435=input.getComplainceGR1435();
		String complainceICS=input.getComplainceICS();
		//ETNTX - IM0006132933 - missing Search functionality Start
		Long operationalStatusId=input.getOperationalStatusId();//advsearchoperationalstatusid
		
		 Long lifecycleStatusId=input.getLifecycleStatusId();//advsearchlifecyclestatusid
		 
		//ETNTX - IM0006132933 - missing Search functionality End
		
		System.out.println("operationalStatusId in hardwaresystem"+operationalStatusId+"lifecycleStatusId :="+lifecycleStatusId);
				long complainceGR1435Long=0;
				long complainceICSLong=0;
				System.out.println("complainceGR1435"+complainceGR1435);
				System.out.println("complainceICS"+complainceICS);
//IM0005978424 
				if(complainceGR1435!=null&&complainceGR1435.equalsIgnoreCase("Yes"))
					
					complainceGR1435Long = -1;
				//IM0005978424 
				if(complainceGR1435!=null&&complainceGR1435.equalsIgnoreCase("No"))
					complainceGR1435Long=0;
				//IM0005978424 
				if(complainceICS!=null&&complainceICS.equalsIgnoreCase("Yes"))
					complainceICSLong = -1;
				//IM0005978424 
				if(complainceICS!=null&&complainceICS.equalsIgnoreCase("No"))
					complainceICSLong=0;
				// End Adding for C0000241362
		sql.append("SELECT ").append(metaData.getIdField()).append(", ")
				.append(metaData.getNameField());

		if (metaData.getAliasField() != null)
			sql.append(", ").append(metaData.getAliasField());

		// int itSystemType =

		// cwid_verantw_betr statt responsible
		sql.append(
				", cwid_verantw_betr, sub_responsible, template, del_quelle FROM ")
				.append(metaData.getTableName()).append(" WHERE 1=1 ");

		// append(" hw_ident_or_trans = ").append(input.getCiSubTypeId()).
		// start Adding for C0000241362
				// RELEVANCE_ICS
		if(complainceICS!=null&&complainceICS.length()>0)
		{
				sql.append(" AND UPPER (RELEVANCE_ICS) = '"+complainceICSLong+"'");
				
				System.out.println("complainceGR1435Long appened"+complainceICSLong);
		}
				// RELEVANZ_ITSEC
		if(complainceGR1435!=null&&complainceGR1435.length()>0)
		{
				sql.append("AND  UPPER (RELEVANZ_ITSEC) = '"+complainceGR1435Long+"'");
				
		System.out.println("complainceGR1435Long appened"+complainceGR1435Long);
		}
		
		//ETNTX - IM0006132933 - missing Search functionality Start
		if(operationalStatusId!=null)
		{
				sql.append("AND  UPPER (EINSATZ_STATUS_ID) = '"+operationalStatusId+"'");
				
		System.out.println("operationalStatusId appened"+operationalStatusId);
		}
		
		
		if(lifecycleStatusId!=null)
		{
				sql.append("AND  UPPER (LC_SUB_STATUS_ID ) = '"+lifecycleStatusId+"'");
				
		System.out.println("lifecycleStatusId appened"+lifecycleStatusId);
		}
		
		//ETNTX - IM0006132933 - missing Search functionality End
			
				// End Adding for C0000241362 
		if (input.getShowDeleted() == null
				|| !input.getShowDeleted().equals(AirKonstanten.YES_SHORT))
			sql.append(" AND del_quelle IS NULL");

		sql.append(" AND (UPPER(").append(metaData.getNameField())
				.append(") LIKE '");

		if (CiEntitiesHbn.isLikeStart(input.getQueryMode()))
			sql.append("%");

		sql.append(input.getCiNameAliasQuery().toUpperCase());

		if (CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
			sql.append("%");

		sql.append("'");

		if (metaData.getAliasField() != null) {
			sql.append(" OR UPPER(").append(metaData.getAliasField())
					.append(") like '");

			if (CiEntitiesHbn.isLikeStart(input.getQueryMode()))
				sql.append("%");

			sql.append(input.getCiNameAliasQuery().toUpperCase());

			if (CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
				sql.append("%");

			sql.append("') ");
		}

		sql.append(
				"AND (NVL(hw_ident_or_trans, "
						+ AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM_TRANSIENT
						+ ") = ").append(input.getCiSubTypeId());
		sql.append(")");

		boolean isNot = false;

		if (StringUtils.isNotNullOrEmpty(input.getItSetId())) {
			isNot = isNot(input.getItSetOptions());
			sql.append(
					" AND NVL(itset, 0) " + getEqualNotEqualOperator(isNot)
							+ " ").append(Long.parseLong(input.getItSetId()));
		}

		if (StringUtils.isNotNullOrEmpty(input.getBusinessEssentialId())) {
			isNot = isNot(input.getBusinessEssentialOptions());
			sql.append(
					" AND business_essential_id "
							+ getEqualNotEqualOperator(isNot) + " ").append(
					Long.parseLong(input.getBusinessEssentialId()));
		}

		if (StringUtils.isNotNullOrEmpty(input.getItSecGroupId())) {
			Long itsec = Long.parseLong(input.getItSecGroupId());
			isNot = isNot(input.getItSecGroupId());
			if(1234567<=itsec && itsec<=1234578){
				sql.append(" and NVL(ITSEC_GRUPPE_ID, -1) "+ getEqualNotEqualOperator(isNot) +" ").append(10136);
			}else{
				sql.append(" and NVL(ITSEC_GRUPPE_ID, -1) "+ getEqualNotEqualOperator(isNot) +" ").append(itsec);
			}
		}

		if (StringUtils.isNotNullOrEmpty(input.getSource())) {
			isNot = isNot(input.getSourceOptions());
			sql.append(
					" AND insert_quelle " + getEqualNotEqualOperator(isNot)
							+ " '").append(input.getSource()).append("'");
		}

		if (StringUtils.isNotNullOrEmpty(input.getCiOwnerHidden())) {
			isNot = isNot(input.getCiOwnerOptions());

			sql.append(" AND (");
			if (isNot)
				sql.append("UPPER(cwid_verantw_betr) IS NULL OR ");

			sql.append(
					"UPPER(cwid_verantw_betr) " + getLikeNotLikeOperator(isNot)
							+ " '")
					.append(input.getCiOwnerHidden().toUpperCase())
					.append("')");
		}

		if (StringUtils.isNotNullOrEmpty(input.getCiOwnerDelegate())) {
			boolean isCwid = input.getCiOwnerDelegate().indexOf(')') > -1;
			String delegate = isCwid ? input.getCiOwnerDelegateHidden() : input
					.getCiOwnerDelegate();// gruppe oder cwid?

			isNot = isNot(input.getCiOwnerDelegateOptions());

			sql.append(" AND (");
			if (isNot)
				sql.append("UPPER(sub_responsible) IS NULL OR ");

			sql.append(
					"UPPER(sub_responsible) " + getLikeNotLikeOperator(isNot)
							+ " '").append(delegate.toUpperCase()).append("')");

			if (!isCwid)
				sql.insert(sql.length() - 2, '%');
		}
		String template = input.getIsTemplate();
		if (null != input) {
			String searchTemplate = null;
			if ("Y".equals(template)) {
				searchTemplate = "-1";
			} else if ("N".equals(template)) {
				searchTemplate = "0";
			}

			if (null != searchTemplate) {
				sql.append(" and NVL(template, 0) = ").append(searchTemplate);
			}
		}
System.out.println("HARDWARE System SQL in ITSYSTEMHBN.java"+sql);
		return sql;
	}

	public static CiItemsResultDTO findItSystemsBy(
			ApplicationSearchParamsDTO input) {
		
		String typeName = input.getCiSubTypeId().equals(
				AirKonstanten.IT_SYSTEM_TYPE_HARDWARE_SYSTEM_IDENTIFIYING) ? AirKonstanten.IT_SYSTEM_TYPE_HARDWARE_SYSTEM
				: AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM;
		CiMetaData metaData = new CiMetaData("it_system_id", "it_system_name",
				"alias", null, typeName, "it_system",
				AirKonstanten.TABLE_ID_IT_SYSTEM, null, null, null);
		return findItSystemCisBy(input, metaData);
	}

	public static CiItemsResultDTO findItSystemCisBy(CiSearchParamsDTO input,
			CiMetaData metaData) {
		if (!LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			return new CiItemsResultDTO();// new CiItemDTO[0];

		StringBuilder sql = getAdvSearchCiBaseSql(input, metaData);
		String sort = input.getSort();
		String dir = input.getDir();
		sql.append(" order by nlssort(");
		if (sort == null) {
			sql.append(metaData.getNameField());
		} else {
			if (sort.equals("name")) {
				sql.append(metaData.getNameField());
			} else {
				if (sort.equals("alias")) {
					sql.append(metaData.getAliasField());
				} else {
					if (sort.equals("ciOwner")) {
						sql.append("cwid_verantw_betr");
					} else {
						if (sort.equals("ciOwnerDelegate"))
							sql.append("sub_responsible");
						else
							sql.append(metaData.getNameField());
					}
				}
			}
		}
		sql.append(", 'NLS_SORT = GENERIC_M')");
		if (StringUtils.isNotNullOrEmpty(dir)) {
			sql.append(" ").append(dir);
		}

		List<CiItemDTO> cis = new ArrayList<CiItemDTO>();

		Session session = null;
		Transaction ta = null;
		Statement stmt = null;// PreparedStatement
		ResultSet rs = null;

		Integer start = input.getStart();
		Integer limit = input.getLimit();
		Integer i = 0;
		boolean commit = false;

		try {
			session = HibernateUtil.getSession();
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql.toString());

			if (null == start)
				start = 0;
			if (null == limit)
				limit = 20;

			CiItemDTO ci = null;

			while (rs.next()) {
				if (i >= start && i < limit + start) {
					ci = new CiItemDTO();
					ci.setId(rs.getLong(metaData.getIdField()));
					ci.setName(rs.getString(metaData.getNameField()));
					if (metaData.getAliasField() != null)
						ci.setAlias(rs.getString(metaData.getAliasField()));
					ci.setApplicationCat1Txt(metaData.getTypeName());
					ci.setCiOwner(rs.getString("cwid_verantw_betr"));
					ci.setCiOwnerDelegate(rs.getString("sub_responsible"));
					ci.setTableId(metaData.getTableId());
					ci.setDeleteQuelle(rs.getString("del_quelle"));
					if (AirKonstanten.IS_TEMPLATE == rs.getInt("template")) {
						ci.setIsTemplate(AirKonstanten.YES);
					} else {
						ci.setIsTemplate(AirKonstanten.NO);
					}
					cis.add(ci);
					// i++;
				}// else break;

				i++;
			}

			ta.commit();
			rs.close();
			stmt.close();
			conn.close();

			commit = true;
		} catch (SQLException e) {
			if (ta.isActive())
				ta.rollback();

			System.out.println(e);
		} finally {
			HibernateUtil.close(ta, session, commit);

		}

		CiItemsResultDTO result = new CiItemsResultDTO();
		result.setCiItemDTO(cis.toArray(new CiItemDTO[0]));
		result.setCountResultSet(i);// i + start
		return result;
	}

	public static List<KeyValueTypeDTO> getItSystemOsGroups() {
		List<KeyValueTypeDTO> osGroups = new ArrayList<KeyValueTypeDTO>();

		Transaction ta = null;
		Statement stmt = null;
		// Connection conn = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();// "SELECT ci_id, table_id, type, name, itset, FROM dwh_entity WHERE template = 'Yes'";
		sql.append("SELECT DISTINCT os_group, hw_ident_or_trans FROM v_md_os WHERE hw_ident_or_trans IS NOT NULL ORDER BY hw_ident_or_trans");

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			int i = 1;
			while (rs.next())
				osGroups.add(new KeyValueTypeDTO(i++, rs.getString("os_group"),
						rs.getInt("hw_ident_or_trans")));

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		return osGroups;
	}

	public static List<OsTypeDTO> getItSystemOsTypes() {
		List<OsTypeDTO> osTypes = new ArrayList<OsTypeDTO>();

		Transaction ta = null;
		Statement stmt = null;
		// Connection conn = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.append("SELECT DISTINCT os_type_id, os_type, os_group, hw_ident_or_trans, license_scanning FROM v_md_os ORDER BY os_type ");

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			while (rs.next())
				osTypes.add(new OsTypeDTO(rs.getInt("os_type_id"), rs
						.getString("os_type"), rs.getString("os_group"), rs
						.getLong("hw_ident_or_trans"), rs
						.getInt("license_scanning")));

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		return osTypes;
	}

	public static List<OsNameDTO> getItSystemOsNames() {// KeyValueTypeDTO
		List<OsNameDTO> osNames = new ArrayList<OsNameDTO>();// KeyValueTypeDTO

		Transaction ta = null;
		Statement stmt = null;
		// Connection conn = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.append("SELECT os_name_id, os_name, os_type_id, hw_ident_or_trans FROM v_md_os ORDER BY os_name");

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			while (rs.next())
				osNames.add(new OsNameDTO(rs.getInt("os_name_id"), rs
						.getString("os_name"), rs.getInt("os_type_id"), rs
						.getLong("hw_ident_or_trans")));
			// osNames.add(new KeyValueTypeDTO(rs.getInt("os_name_id"),
			// rs.getString("os_name"), rs.getInt("os_type_id")));

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		return osNames;
	}

	public static String findItSystemOsNameById(Integer id) {
		String osName = "";
		Transaction ta = null;
		Statement stmt = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.append("SELECT os_name FROM v_md_os where os_name_id = " + id);

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			while (rs.next())
				osName = rs.getString("os_name");

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
		return osName;
	}

	public static List<KeyValueType2DTO> getItSystemClusterCodes() {
		List<KeyValueType2DTO> clusterCodes = new ArrayList<KeyValueType2DTO>();

		// wichtig: mit id=1 und nicht 0, sonst wird in der combo immer ein Wert
		// gesetzt, auch dann wenn
		// er gerade manuell gelöscht wurde.
		clusterCodes.add(new KeyValueType2DTO(1, "Cluster", "C"));
		clusterCodes.add(new KeyValueType2DTO(2, "Cluster Partner", "CP"));
		clusterCodes.add(new KeyValueType2DTO(3, "Cluster Ressource", "CR"));
		clusterCodes.add(new KeyValueType2DTO(4, "no Cluster", "N"));
		clusterCodes.add(new KeyValueType2DTO(5, "Virtual Machine", "VM"));

		return clusterCodes;
	}

	public static List<KeyValueDTO> getItSystemClusterTypes() {
		List<KeyValueDTO> clusterTypes = new ArrayList<KeyValueDTO>();

		Transaction ta = null;
		Statement stmt = null;
		// Connection conn = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.append("SELECT DISTINCT cluster_type FROM it_system WHERE cluster_type IS NOT NULL ORDER BY cluster_type");

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			long i = 1;
			while (rs.next())
				clusterTypes.add(new KeyValueDTO(i++, rs
						.getString("cluster_type")));

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		return clusterTypes;
	}
	//Avanti
	public static List<KeyValueDTO> getBackupType() {
		List<KeyValueDTO> backupType = new ArrayList<KeyValueDTO>();

		Transaction ta = null;
		Statement stmt = null;
		// Connection conn = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.append("SELECT DISTINCT backup_type FROM it_system WHERE backup_type IS NOT NULL ORDER BY backup_type");

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			long i = 1;
			while (rs.next())
				backupType.add(new KeyValueDTO(i++, rs
						.getString("backup_type").trim()));

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		return backupType;
	}

	public static List<KeyValueDTO> getServicePack() {
		List<KeyValueDTO> servicePack = new ArrayList<KeyValueDTO>();

		Transaction ta = null;
		Statement stmt = null;
		// Connection conn = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.append("Select distinct operating_system_version From It_System where operating_system_version Is Not Null Order By operating_system_version");

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			long i = 1;
			while (rs.next())
				servicePack.add(new KeyValueDTO(i++, rs
						.getString("operating_system_version").trim()));

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		return servicePack;
	}

	
	public static List<KeyValueDTO> getVirtualHardwareSoftwareTypes() {
		List<KeyValueDTO> virtualHWSWTypes = new ArrayList<KeyValueDTO>();

		Transaction ta = null;
		Statement stmt = null;
		// Connection conn = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.append("SELECT DISTINCT ")
				.append("	DECODE(virtual_host_sw, 'VMWare', 'VMware', virtual_host_sw)")
				.append("	AS virtual_host_sw ")
				.append("FROM it_system WHERE virtual_host_sw IS NOT NULL ORDER BY virtual_host_sw");

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			long i = 1;
			while (rs.next())
				virtualHWSWTypes.add(new KeyValueDTO(i++, rs
						.getString("virtual_host_sw")));

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		return virtualHWSWTypes;
	}

	public static List<KeyValueDTO> getItSystemPrimaryFunctions() {
		List<KeyValueDTO> clusterTypes = new ArrayList<KeyValueDTO>();

		Transaction ta = null;
		Statement stmt = null;
		// Connection conn = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.append("SELECT primary_function_id, primary_function_name FROM v_md_primary_function WHERE table_id = 1 ORDER BY primary_function_name");

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			while (rs.next())
				clusterTypes.add(new KeyValueDTO(rs
						.getLong("primary_function_id"), rs
						.getString("primary_function_name")));

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		return clusterTypes;
	}

	public static String getItSystemPrimaryFunctionById(Integer id) {
		String primaryFunctionName = "";

		Transaction ta = null;
		Statement stmt = null;
		// Connection conn = null;
		Session session = HibernateUtil.getSession();

		boolean commit = false;

		StringBuilder sql = new StringBuilder();
		sql.append("SELECT primary_function_name FROM v_md_primary_function WHERE table_id = 1 and primary_function_id = "
				+ id);

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql.toString());
			ResultSet rs = stmt.executeQuery(sql.toString());

			while (rs.next())
				primaryFunctionName = rs.getString("primary_function_name");

			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		return primaryFunctionName;
	}

	public static List<KeyValueDTO> getItSystemLicenseScannings() {
		List<KeyValueDTO> licenseScannings = new ArrayList<KeyValueDTO>();

		// wichtig: mit id=1 und nicht 0, sonst wird in der combo immer ein Wert
		// gesetzt, auch dann wenn
		// er gerade manuell gelöscht wurde.
		licenseScannings.add(new KeyValueDTO(0L, "no exception from scanning"));
		licenseScannings.add(new KeyValueDTO(1L, "OS not supported"));
		licenseScannings.add(new KeyValueDTO(2L,
				"Embedded System, no scanner can be installed"));
		licenseScannings.add(new KeyValueDTO(3L, "Customer declined"));
		licenseScannings
				.add(new KeyValueDTO(4L,
						"OEM Software installed, loss of warranty by scanner installation"));
		licenseScannings.add(new KeyValueDTO(5L,
				"Access to system not possible"));
		licenseScannings.add(new KeyValueDTO(6L, "Other Scanning Method Used"));
		licenseScannings
				.add(new KeyValueDTO(7L, "Internal Lab / Test Systems"));

		return licenseScannings;
	}

	public static ItSystem findItSystemByName(String name) {
		Session session = HibernateUtil.getSession();

		Query q = session.getNamedQuery("findItSystemByName");
		q.setParameter("name", name);

		ItSystem itSystem = (ItSystem) q.uniqueResult();
		session.close();

		return itSystem;
	}

	public static List<ItSystem> findItSystemsByNameOrAlias(String name,
			String alias) {
		Session session = HibernateUtil.getSession();

		Query q = session.getNamedQuery("findItSystemsByNameOrAlias");
		q.setParameter("name", name.toUpperCase());
		q.setParameter("alias", alias.toUpperCase());

		@SuppressWarnings("unchecked")
		List<ItSystem> itSystems = q.list();

		return itSystems;
	}

	public static List<Application> findApplicationsByNameOrAlias(String name,
			String alias) {
		Session session = HibernateUtil.getSession();

		Query q = session.getNamedQuery("findApplicationsByNameOrAlias");
		q.setParameter("name", name.toUpperCase());
		q.setParameter("alias", alias.toUpperCase());

		@SuppressWarnings("unchecked")
		List<Application> applications = q.list();

		return applications;
	}

	static List<String> validateItSystem(CiBaseDTO dto, boolean isUpdate) {

		List<String> messages = validateCi(dto);// new ArrayList<String>();

		if (isUpdate) {
			if (StringUtils.isNotNullOrEmpty(dto.getName())
					&& StringUtils.isNotNullOrEmpty(dto.getAlias())) {
				List<Application> applications = findApplicationsByNameOrAlias(
						dto.getName(), dto.getAlias());
				List<ItSystem> itSystems = findItSystemsByNameOrAlias(
						dto.getName(), dto.getAlias());

				// check allowed itsystem name
				for (ItSystem itSystem : itSystems) {
					if (itSystem.getId().longValue() != dto.getId().longValue()) {
						ErrorCodeManager errorCodeManager = new ErrorCodeManager();
						messages.add(errorCodeManager.getErrorMessage("8000",
								null));
					}
				}

				// check allowed application name
				for (Application application : applications) {
					if (application.getId().longValue() != dto.getId()
							.longValue()) {
						ErrorCodeManager errorCodeManager = new ErrorCodeManager();
						messages.add(errorCodeManager.getErrorMessage("9000",
								null));
					}
				}
			}
		} else {
			List<Application> applications = findApplicationsByNameOrAlias(
					dto.getName(), dto.getAlias());
			List<ItSystem> itSystems = findItSystemsByNameOrAlias(
					dto.getName(), dto.getAlias());

			if (itSystems.size() > 0) {
				ErrorCodeManager errorCodeManager = new ErrorCodeManager();

				messages.add(errorCodeManager.getErrorMessage("8000", null));
			}

			if (applications.size() > 0) {
				ErrorCodeManager errorCodeManager = new ErrorCodeManager();

				messages.add(errorCodeManager.getErrorMessage("9000", null));
			}
		}

		return messages;
	}

	public static ItSystem findItSystemById(Long itSystemId) {
		ItSystem itSystem = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();

		try {
			tx = session.beginTransaction();
			itSystem = (ItSystem) session
					.createQuery(
							"select h from ItSystem as h where h.itSystemId = :id")
					.setLong("id", itSystemId).uniqueResult();
			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
				// throw again the first exception
				throw e;
			}

		}
		return itSystem;
	}

	public static void getItSystem(ItSystemDTO dto, ItSystem itSystem) {
		dto.setTableId(AirKonstanten.TABLE_ID_IT_SYSTEM);
		BaseHbn.getCi((CiBaseDTO) dto, (CiBase) itSystem);
		Session session = HibernateUtil.getSession();
		//System.out.println("itSystem.getId()"+itSystem.getId()+"dto.getTableId()"+dto.getTableId());
		dto.setUpStreamAdd((String) session
				/*.createSQLQuery(
						"SELECT DBMS_LOB.SUBSTR(WM_CONCAT(Id), 4000, 1) FROM TABLE(Pck_Air.FT_RelatedCIs(:Table_Id, :Id, :Direction)) WHERE Table_Id = 1")
				*/// ETNTX - IM0006168023 - Copy was not working for Location CI for Function CR will be created seperatly
				.createSQLQuery(
						"SELECT DBMS_LOB.SUBSTR(listagg(Id) within group(order by Id), 4000, 1) FROM TABLE(Pck_Air.FT_RelatedCIs(:Table_Id, :Id, :Direction)) WHERE Table_Id = 1")
				.setLong("Table_Id", dto.getTableId())
				.setLong("Id", itSystem.getId())
				.setString("Direction", AirKonstanten.UP).uniqueResult());
		session.close();
		dto.setOsNameId(itSystem.getOsNameId());
		dto.setIsVirtualHardwareClient(itSystem.getIsVirtualHardwareClient());
		dto.setIsVirtualHardwareHost(itSystem.getIsVirtualHardwareHost());
		dto.setLifecycleStatusId(itSystem.getLifecycleStatusId());
		dto.setEinsatzStatusId(itSystem.getEinsatzStatusId());
		dto.setPrimaryFunctionId(itSystem.getPrimaryFunctionId());
		dto.setLicenseScanningId(itSystem.getLicenseScanningId());
		dto.setBackupType(itSystem.getBackupType());
		dto.setServicePack(itSystem.getServicePack());
		dto.setSeverityLevelId(itSystem.getSeverityLevelId());
		dto.setBusinessEssentialId(itSystem.getBusinessEssentialId());
		dto.setCiSubTypeId(itSystem.getCiSubTypeId());
	}

	// vandana 11154
	public static CiEntityEditParameterOutput copyTtsystem(String cwid,
			Long itsystemIdSource, Long itsystemIdTarget, String ciNameTarget,
			String ciAliasTarget) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		String validationMessage = null;

		if (null != cwid) {
			cwid = cwid.toUpperCase();

			// check der InputWerte
			List<String> messages = new ArrayList<String>();

			if (messages.isEmpty()) {
				Session session = HibernateUtil.getSession();
				Transaction tx = null;
				tx = session.beginTransaction();
				ItSystem itsystemSource = (ItSystem) session.get(
						ItSystem.class, itsystemIdSource);
				ItSystem itsystemTarget = null;
				if (null == itsystemIdSource) {
					// Komplette Neuanlage des Datensatzes mit
					// Insert/Update-Feldern

					itsystemTarget = new ItSystem();

					itsystemTarget.setInsertUser(cwid);
					itsystemTarget
							.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					itsystemTarget.setInsertTimestamp(ApplReposTS
							.getCurrentTimestamp());

					itsystemTarget
							.setUpdateUser(itsystemTarget.getInsertUser());
					itsystemTarget.setUpdateQuelle(itsystemTarget
							.getInsertQuelle());
					itsystemTarget.setUpdateTimestamp(itsystemTarget
							.getInsertTimestamp());

					// itsystemTarget.setItSystemName(ciNameTarget);
					itsystemTarget.setAlias(ciAliasTarget);

					itsystemTarget.setCiOwner(cwid.toUpperCase());
					itsystemTarget.setCiOwnerDelegate(itsystemSource
							.getCiOwnerDelegate());
					itsystemTarget.setTemplate(itsystemSource.getTemplate());

					itsystemTarget.setRelevanceITSEC(itsystemSource
							.getRelevanceITSEC());
					itsystemTarget.setRelevanceICS(itsystemSource
							.getRelevanceICS());

				} else {
					// Reaktivierung / Übernahme des bestehenden Datensatzes
					itsystemTarget = (ItSystem) session.get(ItSystem.class,
							itsystemIdTarget);

					output.setCiId(itsystemIdTarget);

					itsystemTarget.setUpdateUser(cwid);
					itsystemTarget
							.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					itsystemTarget.setUpdateTimestamp(ApplReposTS
							.getCurrentTimestamp());
				}
				if (null == itsystemSource) {
					// itsystem was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the itsystem id "
							+ itsystemIdSource + " was not found in database" });
				} else if (null != itsystemTarget.getDeleteTimestamp()) {
					// room is deleted
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the itsystem id "
							+ itsystemIdTarget + " is deleted" });
				} else {

					// ==========
					itsystemTarget.setSeverityLevelId(itsystemSource
							.getSeverityLevelId());
					itsystemTarget.setBusinessEssentialId(itsystemSource
							.getBusinessEssentialId());

					// ==============================
					itsystemTarget.setItSecSbAvailability(itsystemSource
							.getItSecSbAvailability());
					itsystemTarget.setItSecSbAvailabilityTxt(itsystemSource
							.getItSecSbAvailabilityTxt());

					// der kopierende User wird Responsible
					itsystemTarget.setCiOwner(cwid);
					itsystemTarget.setCiOwnerDelegate(itsystemSource
							.getCiOwnerDelegate());

					// ==========
					// compliance
					// ==========

					// IT SET only view!
					itsystemTarget.setItset(itsystemSource.getItset());
					itsystemTarget.setTemplate(itsystemSource.getTemplate());
					itsystemTarget.setItsecGroupId(null);
					itsystemTarget.setRefId(null);

				}
				boolean toCommit = false;
				try {
					if (null == validationMessage) {
						if (null != itsystemTarget
								&& null == itsystemTarget.getDeleteTimestamp()) {
							session.saveOrUpdate(itsystemTarget);
							session.flush();

							output.setCiId(itsystemTarget.getId());
						}
						toCommit = true;
					}
				} catch (Exception e) {
					String message = e.getMessage();
					log.error(message);
					// handle exception
					output.setResult(AirKonstanten.RESULT_ERROR);

					if (null != message && message.startsWith("ORA-20000: ")) {
						message = message.substring("ORA-20000: ".length());
					}

					output.setMessages(new String[] { message });
				} finally {
					String hbnMessage = HibernateUtil.close(tx, session,
							toCommit);
					if (toCommit && null != itsystemTarget) {
						if (null == hbnMessage) {
							output.setResult(AirKonstanten.RESULT_OK);
							output.setMessages(new String[] { EMPTY });
						} else {
							output.setResult(AirKonstanten.RESULT_ERROR);
							output.setMessages(new String[] { hbnMessage });
						}
					}
				}
			} else {
				// messages
				output.setResult(AirKonstanten.RESULT_ERROR);
				String astrMessages[] = new String[messages.size()];
				for (int i = 0; i < messages.size(); i++) {
					astrMessages[i] = messages.get(i);
				}
				output.setMessages(astrMessages);
			}

		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}

		if (AirKonstanten.RESULT_ERROR.equals(output.getResult())) {
			// TODO errorcodes / Texte
			if (null != output.getMessages() && output.getMessages().length > 0) {
				output.setDisplayMessage(output.getMessages()[0]);
			}
		}

		return output;

	}

	// vandana

	public static void sendBusinessEssentialChangedMail(ItSystem itsystem,
			ItSystemDTO dto, Long businessEssentialIdOld) {

		ApplReposHbn
				.sendBusinessEssentialChangedMail(
						itsystem.getCiOwner(),
						(dto.getCiSubTypeId() == AirKonstanten.IT_SYSTEM_TYPE_HARDWARE_SYSTEM_IDENTIFIYING ? AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM
								: AirKonstanten.IT_SYSTEM_TYPE_HARDWARE_SYSTEM),
						itsystem.getName(), itsystem.getAlias(), dto
								.getBusinessEssentialId(),
						businessEssentialIdOld, dto.getTableId(), dto.getId());

	}

	public static KeyValueDTO[] getOsNames() {
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			Connection conn = session.connection();
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt
					.executeQuery("select os_name_id, os_name from v_md_os where hw_ident_or_trans = 1  ORDER BY NLSSORT(os_name, 'NLS_SORT=GENERIC_M')");
			while (rs.next()) {
				KeyValueDTO osNameDto = new KeyValueDTO();
				osNameDto.setId(Long.parseLong(rs.getString(1)));
				osNameDto.setName(rs.getString(2));
				data.add(osNameDto);
			}
			rs.close();
			stmt.close();
			conn.close();
		} catch (Exception e) {
			System.out.println(e);
		}
		return data.toArray(new KeyValueDTO[data.size()]);
	}

	public static KeyValueDTO[] getSystemPlatformListById(Long id) {
		if (id == null)
			return new KeyValueDTO[0];

		List<ItSystem> itSystems = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			Criteria criteria = session.createCriteria(ItSystem.class);
			criteria.add(Restrictions.eq("osNameId", id.intValue()));
			criteria.add(Restrictions.isNull("deleteTimestamp"));
			criteria.addOrder(Order.asc("itSystemName").ignoreCase());
			itSystems = (List<ItSystem>) criteria.list();
			tx.commit();
			//session.close();
		} catch (RuntimeException e) {
			//e.printStackTrace();
			if (tx != null && tx.isActive()) {
				try {
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				throw e;
			}

		}

		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		for (ItSystem itSystem : itSystems) {
			if (null == itSystem.getDeleteTimestamp()) {
				data.add(new KeyValueDTO(itSystem.getId(), itSystem.getName()));
			}
		}
		return data.toArray(new KeyValueDTO[0]);
	}
	
	public static long getMaximumDCNumberInSequence()
	{
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			Connection conn = session.connection();
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("select max(TO_NUMBER(SUBSTR(IT_SYSTEM_NAME,3))) FROM it_system it WHERE regexp_like (it_system_name ,'^DC[0-9]*{4}?[0-9]*$') ORDER BY insert_timestamp DESC");
			while (rs.next()) {
				return rs.getLong(1);
			}
			rs.close();
			stmt.close();
			conn.close();
		} catch (Exception e) {
			System.out.println(e);
			e.printStackTrace();
		}
		return -1l;
	}
	
	public static List<String> getAvailabeDCNumbers()
	{
		List<String> returnList = new ArrayList<String>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			Connection conn = session.connection();
			Statement stmt = conn.createStatement();   
			ResultSet rs = stmt.executeQuery("select 'DC'||TRIM(to_char (q1,'0000'))sequence from ( select to_number(trim(level)) - 1 q1 from dual connect by level <=9999 minus SELECT TO_NUMBER(SUBSTR(trim(IT_SYSTEM_NAME),3)) q1 FROM it_system it WHERE DEL_TIMESTAMP IS NULL AND regexp_like (it_system_name ,'^DC[[:digit:]]{4}$'))");
			while (rs.next()) {
				returnList.add(rs.getString(1));
			}
			rs.close();
			stmt.close();
			conn.close();
		} catch (Exception e) {
			System.out.println(e);
			e.printStackTrace();
		}
		System.out.println("returnList size >>>>>>>>> "+returnList.size());
		return returnList;
	}
	
	public static ItSystem saveItSystem(ItSystem itSystem)
	{
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		try {
			String strItSet = ApplReposHbn.getItSetFromCwid(itSystem.getCiOwner());
			if (null != strItSet) {
				itSystem.setItset(Long.parseLong(strItSet));
			}
			
			session.saveOrUpdate(itSystem);
			session.flush();
		} catch(Exception ex)
		{
			System.out.println("Error >>>>>>>>>>>>> "+ex.getMessage());
			ex.printStackTrace();
			if (tx.isActive()) {
				tx.rollback();
			}
			return null;
		} finally {
			if (tx.isActive()) {
				tx.commit();
			}
			session.close();
		}
		return itSystem;
	}
	
	///////////Avanti
	
	public static ItSytemNetworkInformationOutPut getDNSDetailQIP(Long ciId) {
		String sql = "Select netz.nwa_name ,netz.domain_name, netz.ip_adresse,vl.vlan_name From Netzwerkanschluss Netz ,Subnet Sub , vlan vl Where NETZ.it_System_Id="+ciId+" And Netz.Del_Timestamp Is Null  And Netz.Insert_Quelle='QIP' and Netz.Subnetz_Id=Sub.Subnetz_Id and Sub.Vlan_Id=Vl.Vlan_Id";
		
		Transaction ta = null;
		Statement stmt = null;
//		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;

		List<ItSystemNetworkInformationDTO> itSystemNetworkInformation = new ArrayList<ItSystemNetworkInformationDTO>();
		ItSytemNetworkInformationOutPut output = new ItSytemNetworkInformationOutPut();
		
		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql);
		
			ResultSet rs = stmt.executeQuery(sql);

			//boolean isReferenced = false;
			ItSystemNetworkInformationDTO itSystemNetworkInfo = null;
			
			while (rs.next()) {
				itSystemNetworkInfo = new ItSystemNetworkInformationDTO();
				
				itSystemNetworkInfo.setHostName(rs.getString("nwa_name"));
				itSystemNetworkInfo.setAdDomain(rs.getString("domain_name"));
				itSystemNetworkInfo.setIpAddress(rs.getString("ip_adresse"));
				itSystemNetworkInfo.setVlan(rs.getString("vlan_name"));
				itSystemNetworkInformation.add(itSystemNetworkInfo);
			}
			
			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
		
		output.setNetworkInformationDtos(itSystemNetworkInformation.toArray(new ItSystemNetworkInformationDTO[0]));
		
		return output;
	}

	public static ItSytemNetworkInformationOutPut getNetworkTcpIp(Long ciId) {
		String sql = "Select netz.nwa_name ,vl.vlan_name, netz.ip_adresse ,netz.subnetmask ,netz.default_gateway ,m.mac_address,netz.Insert_Quelle  From Netzwerkanschluss Netz ,Subnet Sub , vlan vl , MAC m Where NETZ.it_System_Id="+ciId+"  And Netz.Del_Timestamp Is Null  And Netz.Insert_Quelle='HPED' And Netz.Subnetz_Id=Sub.Subnetz_Id And Sub.Vlan_Id=Vl.Vlan_Id AND netz.mac_id = m.mac_id";
		
		Transaction ta = null;
		Statement stmt = null;
//		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;

		List<ItSystemNetworkInformationDTO> itSystemNetworkInformation = new ArrayList<ItSystemNetworkInformationDTO>();
		ItSytemNetworkInformationOutPut output = new ItSytemNetworkInformationOutPut();
		
		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.prepareStatement(sql);
		
			ResultSet rs = stmt.executeQuery(sql);

			//boolean isReferenced = false;
			ItSystemNetworkInformationDTO itSystemNetworkInfo = null;
			
			while (rs.next()) {
				itSystemNetworkInfo = new ItSystemNetworkInformationDTO();
				
				itSystemNetworkInfo.setHostName(rs.getString("nwa_name"));
				itSystemNetworkInfo.setVlan(rs.getString("vlan_name"));
				itSystemNetworkInfo.setIpAddress(rs.getString("ip_adresse"));
				itSystemNetworkInfo.setNetMask(rs.getString("subnetmask"));
				itSystemNetworkInfo.setGateWay(rs.getString("default_gateway"));
				itSystemNetworkInfo.setMacAdress(rs.getString("mac_address"));
				itSystemNetworkInfo.setSource(rs.getString("Insert_Quelle"));
				itSystemNetworkInformation.add(itSystemNetworkInfo);
			}
			
			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
		
		output.setNetworkInformationDtos(itSystemNetworkInformation.toArray(new ItSystemNetworkInformationDTO[0]));
		
		return output;
	}
	
	
}
