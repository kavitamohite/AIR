package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiBase;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.domain.Ways;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.PathwayDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;
import com.bayerbbs.applrepos.service.LDAPAuthWS;



public class PathwayHbn extends BaseHbn{

	private static final Log log = LogFactory.getLog(PathwayHbn.class);

	public static Ways findById(Long Id) {
		return findById(Ways.class,Id);
	}


	public static CiEntityEditParameterOutput createPathway(String cwid,
			PathwayDTO pathwayDTO, boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		Long id = null;

		if (null != cwid) {

			cwid = cwid.toUpperCase();

			if (null != pathwayDTO.getId() && pathwayDTO.getId() == 0) {
				List<String> messages = validatePathway(pathwayDTO, false);

				if (messages.isEmpty()) {
					Ways way = new Ways();
					Session session = HibernateUtil.getSession();
					Transaction tx = null;
					tx = session.beginTransaction();
					setUpCi(way, pathwayDTO, cwid, true);

					boolean autoCommit = false;
					try {
						id =(Long) session.save(way);
						session.flush();
						autoCommit = true;

					} catch (Exception e) {
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { e.getMessage() });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session,
								autoCommit);
						if (autoCommit) {
							if (hbnMessage == null) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
								output.setTableId(AirKonstanten.TABLE_ID_WAYS);
								output.setCiId(id);
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
				// ci id not 0
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "the ci id should be 0" });
			}

		} else {
			// cwid missing
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { "cwid missing" });
		}
		return output;

	}
	
	public static CiEntityEditParameterOutput saveWays(PathwayDTO pathwayDTO,
			String cwid) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		if (StringUtils.isNotNullOrEmpty(cwid)) {
			if (null != pathwayDTO.getId()
					|| 0 < pathwayDTO.getId().longValue()) {
				List<String> messages=validateCi(pathwayDTO);
				if(messages.isEmpty()){
					Long id = new Long(pathwayDTO.getId());
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					Ways ways = (Ways) session.get(Ways.class, id);
					if (null == ways) {
						// Ways was not found in database
						output.setErrorMessage("1000", EMPTY + id);
					} else if (null != ways.getDeleteTimestamp()) {
						// Ways is deleted
						output.setErrorMessage("1001", EMPTY + id);
					} else {
						BaseHbn.setUpCi(ways, pathwayDTO, cwid, false);
					}
					boolean toCommit = false;
					try {
						if (null != ways && null == ways.getDeleteTimestamp()) {
							session.saveOrUpdate(ways);
							session.flush();
							toCommit = true;
						}
					} catch (Exception e) {
						String message = e.getMessage();
						log.error(message);
						// handle exception
						output.setResult(AirKonstanten.RESULT_ERROR);
						message = ApplReposHbn
								.getOracleTransbaseErrorMessage(message);
						output.setMessages(new String[] { message });
					} finally {
						String hbnMessage = HibernateUtil.close(tx, session,
								toCommit);
						if (toCommit && null != ways) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output.setResult(AirKonstanten.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}

						if (ways.getRefId() == null
								&& ways.getItsecGroupId() != null) {
							ItsecMassnahmeStatusHbn.saveSaveguardAssignment(
									pathwayDTO.getTableId(), pathwayDTO.getId(),
									pathwayDTO.getItsecGroupId());
						}
					}
				}


			}
		}
		return output;
	}
	

	private static List<String> validatePathway(PathwayDTO pathwayDTO,
			boolean isUpdate) {
		Ways way = findByName(pathwayDTO.getName());
		List<String> messages = validateCi(pathwayDTO);
		boolean alreadyExist = isUpdate ? way != null
				&& way.getId().longValue() != pathwayDTO.getId().longValue()
				: way != null;
		
		if (alreadyExist) {
			ErrorCodeManager errorCodeManager = new ErrorCodeManager();
			messages.add(errorCodeManager.getErrorMessage("10000", null));
		}
		return messages;

	}
    //new vandana
	public static void getWays(PathwayDTO dto, Ways way) {
		dto.setTableId(AirKonstanten.TABLE_ID_WAYS);
		BaseHbn.getCi((CiBaseDTO) dto, (CiBase) way);
		dto.setId(way.getWaysId());
		dto.setName(way.getWayName());

	}
	
	public static CiEntityEditParameterOutput copyPathway(String cwid, Long pathwayIdSource, Long pathwayIdTarget, String ciNameTarget, String ciAliasTarget) {
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
				Ways pathwaySource = (Ways) session.get(Ways.class, pathwayIdSource);
				Ways pathwayTarget = null;
				if (null == pathwayIdSource) {
					// Komplette Neuanlage des Datensatzes mit Insert/Update-Feldern
					
					pathwayTarget = new Ways();
					// schrank - insert values
					pathwayTarget.setInsertUser(cwid);
					pathwayTarget.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					pathwayTarget.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

					// schrank - update values
					pathwayTarget.setUpdateUser(pathwayTarget.getInsertUser());
					pathwayTarget.setUpdateQuelle(pathwayTarget.getInsertQuelle());
					pathwayTarget.setUpdateTimestamp(pathwayTarget.getInsertTimestamp());
					
					
					pathwayTarget.setWayName(ciNameTarget); 
					 
					pathwayTarget.setCiOwner(cwid.toUpperCase());
					pathwayTarget.setCiOwnerDelegate(pathwaySource.getCiOwnerDelegate());
					pathwayTarget.setTemplate(pathwaySource.getTemplate());
					
					pathwayTarget.setRelevanceITSEC(pathwaySource.getRelevanceITSEC());
					pathwayTarget.setRelevanceICS(pathwaySource.getRelevanceICS());

				}
				else {
					// Reaktivierung / Übernahme des bestehenden Datensatzes
					pathwayTarget = (Ways) session.get(Ways.class, pathwayIdTarget);
					// room found - change values
					output.setCiId(pathwayIdTarget);
					
					pathwayTarget.setUpdateUser(cwid);
					pathwayTarget.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					pathwayTarget.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
				}
				if (null == pathwaySource) {
					// itsystem was not found in database
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the itsystem id "	+ pathwayIdSource + " was not found in database" });
				}
				else if (null != pathwayTarget.getDeleteTimestamp()) {
					// room is deleted
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { "the itsystem id "	+ pathwayIdTarget + " is deleted" });
				}else {

					//pathwayTarget.setSeverityLevelId(pathwaySource.getSeverityLevelId());
					//pathwayTarget.setBusinessEssentialId(pathwaySource.getBusinessEssentialId());

					// ==============================
					pathwayTarget.setItSecSbAvailability(pathwaySource.getItSecSbAvailability());
					pathwayTarget.setItSecSbAvailabilityTxt(pathwaySource.getItSecSbAvailabilityTxt());
					
					// der kopierende User wird Responsible
					pathwayTarget.setCiOwner(cwid);
					pathwayTarget.setCiOwnerDelegate(pathwaySource.getCiOwnerDelegate());
					
					// ==========
					// compliance
					// ==========
					
					// IT SET only view!
					pathwayTarget.setItset(pathwaySource.getItset());
					pathwayTarget.setTemplate(pathwaySource.getTemplate());
					pathwayTarget.setItsecGroupId(null);
					pathwayTarget.setRefId(null);
					
				}
				boolean toCommit = false;
				try {
					if (null == validationMessage) {
						if (null != pathwayTarget && null == pathwayTarget.getDeleteTimestamp()) {
							session.saveOrUpdate(pathwayTarget);
							session.flush();
							
							output.setCiId(pathwayTarget.getId());
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
				}finally {
					String hbnMessage = HibernateUtil.close(tx, session, toCommit);
					if (toCommit && null != pathwayTarget) {
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
	//vandana
	

	//new vandana
	public static Ways findByName(String name) {
		Session session = HibernateUtil.getSession();
		Query q = session.getNamedQuery("findPathwayByName");
		q.setParameter("name", name);

		Ways way = (Ways) q.uniqueResult();
		return way;

	}

	private static void setUpCi(Ways ci, PathwayDTO ciDTO, String cwid,
			boolean isCiCreate) {
		// protected <T extends CiBase> void setUpCi(T ci, CiBaseDTO ciDTO,
		// String cwid) {
		ci.setName(ciDTO.getName());
		BaseHbn.setUpCi(ci, ciDTO, cwid, isCiCreate);

	}

	public static CiItemsResultDTO findPathwayBy(
			ApplicationSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("WAYS_ID", "WAYS_NAME", null,
				"land_kennzeichen", "Way", "WAYS", AirKonstanten.TABLE_ID_WAYS,
				null, null, null);
		return findPathwayCisBy(input, metaData);
	}

	public static CiItemsResultDTO findPathwayCisBy(CiSearchParamsDTO input,
			CiMetaData metaData) {
		if (!LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			return new CiItemsResultDTO();// new CiItemDTO[0];

		StringBuilder sql = getAdvSearchCiBaseSql(input, metaData);

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
					ci.setCiOwner(rs.getString("responsible"));
					ci.setCiOwnerDelegate(rs.getString("sub_responsible"));
					ci.setTableId(metaData.getTableId());
					ci.setDeleteQuelle(rs.getString("del_quelle"));

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


	protected static StringBuilder getAdvSearchCiBaseSql(
			CiSearchParamsDTO input, CiMetaData metaData) {
		StringBuilder sql = new StringBuilder();

		sql.append("SELECT ").append(metaData.getIdField()).append(", ")
				.append(metaData.getNameField());

		// cwid_verantw_betr statt responsible
		sql.append(", responsible, sub_responsible, del_quelle FROM ")
				.append(metaData.getTableName()).append(" WHERE 1=1 ");

		// append(" hw_ident_or_trans = ").append(input.getCiSubTypeId()).
		if (input.getShowDeleted() == null
				|| !input.getShowDeleted().equals(AirKonstanten.YES_SHORT))
			sql.append(" AND del_quelle IS NULL");

		sql.append(" AND UPPER(").append(metaData.getNameField())
				.append(") LIKE '");

		if (CiEntitiesHbn.isLikeStart(input.getQueryMode()))
			sql.append("%");

		sql.append(input.getCiNameAliasQuery().toUpperCase());

		if (CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
			sql.append("%");

		sql.append("'");

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
			isNot = isNot(input.getItSecGroupOptions());
			sql.append(
					" AND NVL(itsec_gruppe_id, -1) "
							+ getEqualNotEqualOperator(isNot) + " ").append(
					Long.parseLong(input.getItSecGroupId()));
		}

		if (StringUtils.isNotNullOrEmpty(input.getSource())) {
			isNot = isNot(input.getSourceOptions());
			sql.append(
					" AND insert_quelle " + getEqualNotEqualOperator(isNot)
							+ " '").append(input.getSource()).append("'");
		}

		if (StringUtils.isNotNullOrEmpty(input.getCiOwnerHidden())) {
			isNot = isNot(input.getCiOwnerOptions());

			sql.append(" AND ");
			if (isNot)
				sql.append("UPPER(responsible) IS NULL OR ");

			sql.append(
					"UPPER(responsible) " + getLikeNotLikeOperator(isNot)
							+ " '")
					.append(input.getCiOwnerHidden().toUpperCase()).append("'");
		}

		if (StringUtils.isNotNullOrEmpty(input.getCiOwnerDelegate())) {
			boolean isCwid = input.getCiOwnerDelegate().indexOf(')') > -1;
			String delegate = isCwid ? input.getCiOwnerDelegateHidden() : input
					.getCiOwnerDelegate();// gruppe oder cwid?

			isNot = isNot(input.getCiOwnerDelegateOptions());

			sql.append(" AND ");
			if (isNot)
				sql.append("UPPER(sub_responsible) IS NULL OR ");

			sql.append(
					"UPPER(sub_responsible) " + getLikeNotLikeOperator(isNot)
							+ " '").append(delegate.toUpperCase()).append("'");

			if (!isCwid)
				sql.insert(sql.length() - 2, '%');
		}

		return sql;
	}

}