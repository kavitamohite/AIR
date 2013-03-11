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
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;
import com.bayerbbs.applrepos.service.LDAPAuthWS;

public class ItSystemHbn extends BaseHbn {
	private static final Log log = LogFactory.getLog(ItSystemHbn.class);

	public static CiEntityEditParameterOutput deleteItSystem(String cwid, ItSystemDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId()	&& 0 < dto.getId().longValue()) {
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

	
	public static CiEntityEditParameterOutput saveItSystem(String cwid,	ItSystemDTO dto) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String validationMessage = null;
		
		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() || 0 < dto.getId().longValue()) {
				Long id = new Long(dto.getId());

				// check der InputWerte
				List<String> messages = validateCi(dto);

				if (messages.isEmpty()) {
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					ItSystem itSystem = (ItSystem) session.get(ItSystem.class, id);

					if (null == itSystem) {
						// itSystem was not found in database
						output.setErrorMessage("1000", EMPTY+id);
					} else if (null != itSystem.getDeleteTimestamp()) {
						// itSystem is deleted
						output.setErrorMessage("1001", EMPTY+id);
					} else {
						// itSystem found - change values
						
						// validate template
//						if (null != itSystem.getTemplate() && -1 == itSystem.getTemplate().longValue()) {
//							if (null != dto.getTemplate()) {
//								if (0 == dto.getTemplate().longValue()) {
//									// user wants to change to non template
//									// check if there are referencing values
//									if (!"0".equals(ApplReposHbn.getCountReferencingTemplates(id))) {
//										output.setErrorMessage("1002");
//									}
//								}
//							}
//						}
						

						itSystem.setUpdateUser(cwid);
						itSystem.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						itSystem.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
						
						// RFC8344 change Insert-Quelle? // RFC 8532
//						if (ApplreposConstants.INSERT_QUELLE_ANT.equals(application.getInsertQuelle()) ||
//							ApplreposConstants.INSERT_QUELLE_RFC.equals(application.getInsertQuelle())  ||
//							ApplreposConstants.INSERT_QUELLE_SISEC.equals(application.getInsertQuelle())) {
//							application.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
//						}

						// ======
						// Basics
						// ======

//						if (null != dto.getName()) {
//							itSystem.setItSystemName(dto.getName());
//						}

						

						
						// ================
						// Owner / Delegate
						// ================
						if (null != dto.getCiOwnerHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerHidden())) {
								itSystem.setCiOwner(null);
							}
							else {
								itSystem.setCiOwner(dto.getCiOwnerHidden());
							}
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							if(StringUtils.isNullOrEmpty(dto.getCiOwnerDelegateHidden())) {
								itSystem.setCiOwnerDelegate(null);
							}
							else {
								itSystem.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
							}
						}
						
						itSystem.setSlaId(dto.getSlaId());
						itSystem.setServiceContractId(dto.getServiceContractId());


						
//						Long businessEssentialIdOld = itSystem.getBusinessEssentialId();
//						if (hasBusinessEssentialChanged) {
//							sendBusinessEssentialChangedMail(itSystem, dto, businessEssentialIdOld);
//						}
						
						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								itSystem.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								itSystem.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}
						if (null != dto.getItSecSbAvailabilityDescription()) {
							itSystem.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
						}
						
						// ==========
						// compliance
						// ==========
						// Template
						if (null != dto.getTemplate()) {
//							if (-1 == dto.getTemplate()) {
//								application.setTemplate(null);
//							}
//							else {
							itSystem.setTemplate(dto.getTemplate());
//							}
						}
						
						if (null != dto.getItsecGroupId() && 0 != dto.getItsecGroupId()) {
							if (-1 == dto.getItsecGroupId()) {
								itSystem.setItsecGroupId(null);
							}
							else {
								itSystem.setItsecGroupId(dto.getItsecGroupId());
							}
						}
						
						if (null != dto.getRefId()) {
							if (-1 == dto.getRefId()) {
								itSystem.setRefId(null);
							}
							else {
								itSystem.setRefId(dto.getRefId());
							}
						}
						
//						if (null != dto.getRelevanceICS()) {
//							itSystem.setRelevanceICS(dto.getRelevanceICS());
//						}
//						if (null != dto.getRelevanzItsec()) {//getRelevanceITSEC
//							itSystem.setRelevanceITSEC(dto.getRelevanzItsec());//getRelevanceITSEC
//						}
						
//						if (null != dto.getRelevanceICS()) {
//							itSystem.setRelevanceICS(dto.getRelevanceGR1920());
//						}
//						if (null != dto.getRelevanzItsec()) {
//							itSystem.setRelevanceITSEC(dto.getRelevanceGR1435());
//						}
						
						if (null == dto.getRelevanzItsec()) {
							if (Y.equals(dto.getRelevanceGR1435())) {
								dto.setRelevanzItsec(new Long(-1));
							}
							else if (N.equals(dto.getRelevanceGR1435())) {
								dto.setRelevanzItsec(new Long(0));
							}
						}
						if (null == dto.getRelevanceICS()) {
							if (Y.equals(dto.getRelevanceGR1920())) {
								dto.setRelevanceICS(new Long(-1));
							}
							else if (N.equals(dto.getRelevanceGR1920())) {
								dto.setRelevanceICS(new Long(0));
							}
						}
						
						itSystem.setRelevanceITSEC(dto.getRelevanzItsec());
						itSystem.setRelevanceICS(dto.getRelevanceICS());
						

						if (null == dto.getGxpFlag()) {
							//	we don't know, let the current value 
						}
						else {
							if (EMPTY.equals(dto.getGxpFlag())) {
								itSystem.setGxpFlag(null);
							}
							else {
								itSystem.setGxpFlag(dto.getGxpFlag());
							}
						}

						if (null != dto.getItSecSbAvailabilityId()) {
							if (-1 == dto.getItSecSbAvailabilityId()) {
								itSystem.setItSecSbAvailability(null);
							}
							else if (0 != dto.getItSecSbAvailabilityId().longValue()) {
								itSystem.setItSecSbAvailability(dto.getItSecSbAvailabilityId());
							}
						}
						if (null != dto.getItSecSbAvailabilityDescription()) {
							itSystem.setItSecSbAvailabilityText(dto.getItSecSbAvailabilityDescription());
						}
						
						
//						if (null != dto.getClassInformationId()) {
//							if (-1 == dto.getClassInformationId()) {
//								itSystem.setClassInformationId(null);
//							} else {
//								itSystem.setClassInformationId(dto.getClassInformationId());
//							}
//						}
//						if (null != dto.getClassInformationExplanation()) {
//							itSystem.setClassInformationExplanation(dto.getClassInformationExplanation());
//						}
					}
					
					boolean toCommit = false;
					
					try {
						if (null == validationMessage) {
							if (null != itSystem && null == itSystem.getDeleteTimestamp()) {
								session.saveOrUpdate(itSystem);
								session.flush();
								
								toCommit = true;
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
	

	public static CiEntityEditParameterOutput reactivateItSystem(String cwid, ItSystemDTO dto, ItSystem itSystem) {
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
			
			// application found - change values
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
	
	public static CiEntityEditParameterOutput createItSystem(String cwid, ItSystemDTO dto, Boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != cwid) {
			cwid = cwid.toUpperCase();
			
			if (null != dto.getId() && 0 == dto.getId()) {

				// check der InputWerte
				List<String> messages = validateCi(dto);

				if (messages.isEmpty()) {
					ItSystem itSystem = new ItSystem();
					boolean isNameAndAliasNameAllowed = true;
					
					if (isNameAndAliasNameAllowed) {
						List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_ROOM, true);
						if (null != listCi && 0 < listCi.size()) {
							// name is not allowed
							isNameAndAliasNameAllowed = false;
							output.setResult(AirKonstanten.RESULT_ERROR);
							if (null != listCi.get(0).getDeleteQuelle()) {
								boolean override = forceOverride != null && forceOverride.booleanValue();
								
								if(override) {
									// ENTWICKLUNG RFC8279
									Session session = HibernateUtil.getSession();
									ItSystem itSystemDeleted = (ItSystem)session.get(ItSystem.class, listCi.get(0).getId());
									
									// reactivate
									reactivateItSystem(cwid, dto, itSystemDeleted);
									// save the data
									dto.setId(itSystemDeleted.getId());
									return saveItSystem(cwid, dto);

								} else {
									output.setMessages(new String[] {"ItSystem Name '" + listCi.get(0).getName() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
								}
							}
							else {
								output.setMessages(new String[] {"ItSystem Name '" + listCi.get(0).getName() + "' already exists."});
							}
						}
					}
					
					if (isNameAndAliasNameAllowed) {
						List<CiBaseDTO> listCI = CiEntitiesHbn.findCisByNameOrAlias(dto.getAlias(), AirKonstanten.TABLE_ID_ROOM, true);
						if (null != listCI && 0 < listCI.size()) {
							// alias is not allowed
							isNameAndAliasNameAllowed = false;
							output.setResult(AirKonstanten.RESULT_ERROR);
							if (null != listCI.get(0).getDeleteQuelle()) {
								output.setMessages(new String[] {"ItSystem Alias '" + listCI.get(0).getAlias() + "' already exists but marked as deleted<br>Please ask ITILcenter@bayer.com for reactivation."});
							}
							else {
								output.setMessages(new String[] {"ItSystem Alias '" + listCI.get(0).getAlias() + "' already exists."});
							}
						}						
					}
					
					
					if (isNameAndAliasNameAllowed) {
						// create the ci

						// calculates the ItSet
						Long itSet = null;
						String strItSet = ApplReposHbn.getItSetFromCwid(dto.getCiOwner());
						if (null != strItSet) {
							itSet = Long.parseLong(strItSet);
						}
						if (null == itSet) {
							// set default itSet
							itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
						}


						Session session = HibernateUtil.getSession();
						Transaction tx = null;
						tx = session.beginTransaction();

						// ci - insert values
						itSystem.setInsertUser(cwid);
						itSystem.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
						itSystem.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

						// ci - update values
						itSystem.setUpdateUser(itSystem.getInsertUser());
						itSystem.setUpdateQuelle(itSystem.getInsertQuelle());
						itSystem.setUpdateTimestamp(itSystem.getInsertTimestamp());

						// ci - attributes
//						itSystem.setItSystemName(dto.getName());

						
						if (null != dto.getCiOwnerHidden()) {
							itSystem.setCiOwner(dto.getCiOwnerHidden());
						}
						if (null != dto.getCiOwnerDelegateHidden()) {
							itSystem.setCiOwnerDelegate(dto.getCiOwnerDelegateHidden());
						}

						
						boolean toCommit = false;
						try {
							session.save(itSystem);
							session.flush();
							toCommit = true;
						} catch (Exception e) {
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

	protected static StringBuilder getAdvSearchCiBaseSql(CiSearchParamsDTO input, CiMetaData metaData) {
		StringBuilder sql = new StringBuilder();
		
		sql.
		append("SELECT ").append(metaData.getIdField()).append(", ").append(metaData.getNameField());
		
		if(metaData.getAliasField() != null)
			sql.append(", ").append(metaData.getAliasField());
		
//		int itSystemType = 

		
		
		//cwid_verantw_betr statt responsible
		sql.append(", cwid_verantw_betr, sub_responsible FROM ").append(metaData.getTableName()).append(" WHERE (").
		append("(hw_ident_or_trans = ").append(input.getCiSubTypeId());
		if(input.getCiSubTypeId().equals(AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM_TRANSIENT))
			sql.append(" OR hw_ident_or_trans IS NULL");
//		append(" hw_ident_or_trans = ").append(input.getCiSubTypeId()).
		
		sql.append(") AND UPPER(").append(metaData.getNameField()).append(") like '");
		
		
		if(CiEntitiesHbn.isLikeStart(input.getQueryMode()))
			sql.append("%");
		
		sql.append(input.getCiNameAliasQuery().toUpperCase());
		
		if(CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
			sql.append("%");
		
		sql.append("'");
		
		if(metaData.getAliasField() != null) {
			sql.append(" OR UPPER(").append(metaData.getAliasField()).append(") like '");
			
			if(CiEntitiesHbn.isLikeStart(input.getQueryMode()))
				sql.append("%");
			
			sql.append(input.getCiNameAliasQuery().toUpperCase());
			
			if(CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
				sql.append("%");
			
			sql.append("'");
		}
		
		sql.append(")");
		
		boolean isNot = false;
		
		
		if(StringUtils.isNotNullOrEmpty(input.getItSetId())) {
			isNot = isNot(input.getItSetOptions());
			sql.append(" AND itset "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(input.getItSetId()));
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getBusinessEssentialId())) {
			isNot = isNot(input.getBusinessEssentialOptions());
			sql.append(" AND business_essential_id "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(input.getBusinessEssentialId()));
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getItSecGroupId())) {
			isNot = isNot(input.getItSecGroupOptions());
			sql.append(" AND itsec_gruppe_id "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(input.getItSecGroupId()));
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getSource())) {
			isNot = isNot(input.getSourceOptions());
			sql.append(" AND insert_quelle "+ getEqualNotEqualOperator(isNot) +" '").append(input.getSource()).append("'");
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getCiOwnerHidden())) {
			isNot = isNot(input.getCiOwnerOptions());
			
			sql.append(" AND (");
			if(isNot)
				sql.append("UPPER(cwid_verantw_betr) IS NULL OR ");
			
			sql.append("UPPER(cwid_verantw_betr) " + getLikeNotLikeOperator(isNot) + " '").append(input.getCiOwnerHidden().toUpperCase()).append("')");
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getCiOwnerDelegate())) {
			boolean isCwid = input.getCiOwnerDelegate().indexOf(')') > -1;
			String delegate = isCwid ? input.getCiOwnerDelegateHidden() : input.getCiOwnerDelegate();//gruppe oder cwid?
			
			isNot = isNot(input.getCiOwnerDelegateOptions());
			
			sql.append(" AND (");
			if(isNot)
				sql.append("UPPER(sub_responsible) IS NULL OR ");
			
			sql.append("UPPER(sub_responsible) "+ getLikeNotLikeOperator(isNot) +" '").append(delegate.toUpperCase()).append("')");
			
			if(!isCwid)
				sql.insert(sql.length() - 2, '%');
		}
		
		return sql;
	}


	public static CiItemsResultDTO findItSystemsBy(ApplicationSearchParamsDTO input) {
		String typeName = input.getCiSubTypeId().equals(AirKonstanten.IT_SYSTEM_TYPE_HARDWARE_SYSTEM_IDENTIFIYING) ? AirKonstanten.IT_SYSTEM_TYPE_HARDWARE_SYSTEM : AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM;
		CiMetaData metaData = new CiMetaData("it_system_id", "it_system_name", null, typeName, "it_system", AirKonstanten.TABLE_ID_IT_SYSTEM);
		return findItSystemCisBy(input, metaData);
	}
	
	
	public static CiItemsResultDTO findItSystemCisBy(CiSearchParamsDTO input, CiMetaData metaData) {
		if(!LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			return new CiItemsResultDTO();//new CiItemDTO[0];
		
		StringBuilder sql = getAdvSearchCiBaseSql(input, metaData);
		
		List<CiItemDTO> cis = new ArrayList<CiItemDTO>();

		Session session = null;
		Transaction ta = null;
		Connection conn = null;
		Statement stmt = null;//PreparedStatement
		ResultSet rs = null;
		
		Integer start = input.getStart();
		Integer limit = input.getLimit();
		Integer i = 0;
		boolean commit = false;
		
		try {
			session = HibernateUtil.getSession();
			ta = session.beginTransaction();
			conn = session.connection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql.toString());
			
//			stmt = conn.prepareStatement(sql.toString(), ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
//			rs = stmt.executeQuery();
//			if(0 != start)
//				rs.absolute(start + 1);//relative
			
			if(null == start)
				start = 0;
			if(null == limit)
				limit = 20;
			
			CiItemDTO ci = null;
			
			while(rs.next()) {
				if(i >= start && i < limit + start) {
					ci = new CiItemDTO();
					ci.setId(rs.getLong(metaData.getIdField()));
					ci.setName(rs.getString(metaData.getNameField()));
					if(metaData.getAliasField() != null)
						ci.setAlias(rs.getString(metaData.getAliasField()));
					ci.setApplicationCat1Txt(metaData.getTypeName());
					ci.setCiOwner(rs.getString("cwid_verantw_betr"));
					ci.setCiOwnerDelegate(rs.getString("sub_responsible"));
					ci.setTableId(metaData.getTableId());
					
					cis.add(ci);
					//i++;
				}// else break;
				
				i++;
			}
						
			ta.commit();
			rs.close();
			stmt.close();
			conn.close();
			
			commit = true;
		} catch(SQLException e) {
			if(ta.isActive())
				ta.rollback();
			
			System.out.println(e);
		} finally {
			HibernateUtil.close(ta, session, commit);

//			try {
//				rs.close();
//				stmt.close();
//				conn.close();
//				session.close();
//			} catch (SQLException e) {
//				System.out.println(e);
//			}
		}
		
		CiItemsResultDTO result = new CiItemsResultDTO();
		result.setCiItemDTO(cis.toArray(new CiItemDTO[0]));
		result.setCountResultSet(i);//i + start
		return result;
	}
}