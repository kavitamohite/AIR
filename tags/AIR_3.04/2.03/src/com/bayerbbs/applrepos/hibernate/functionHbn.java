/**
 * 
 */
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
import com.bayerbbs.applrepos.domain.CiBase1;
import com.bayerbbs.applrepos.domain.Function;
import com.bayerbbs.applrepos.domain.FunctionDTO;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;
import com.bayerbbs.applrepos.service.LDAPAuthWS;

/**
 * @author equuw
 * 
 */
public class functionHbn extends BaseHbn {

	private static final Log log = LogFactory.getLog(functionHbn.class);

	public static Function findById(Long Id) {
		return findById(Function.class, Id);
	}

	public static CiEntityEditParameterOutput createFunction(String cwid,
			FunctionDTO functionDTO, boolean forceOverride) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		Long id = null;

		if (null != cwid) {

			cwid = cwid.toUpperCase();

			if (null != functionDTO.getId() && functionDTO.getId() == 0) {
				List<String> messages = validateFunction(functionDTO, false);

				if (messages.isEmpty()) {
					Function function = new Function();
					Session session = HibernateUtil.getSession();
					Transaction tx = null;
					tx = session.beginTransaction();
					setUpCi(function, functionDTO, cwid, true);

					boolean autoCommit = false;
					try {
						id = (Long) session.save(function);
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
								output.setTableId(AirKonstanten.TABLE_ID_FUNCTION);
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

	private static List<String> validateFunction(FunctionDTO functionDTO,
			boolean isUpdate) {
		Function function = findByName(functionDTO.getName());

		List<String> messages = validateCi(functionDTO);

		boolean alreadyExist = isUpdate ? function != null
				&& function.getId().longValue() != functionDTO.getId()
						.longValue() : function != null;
		if (alreadyExist) {
			ErrorCodeManager errorCodeManager = new ErrorCodeManager();
			messages.add(errorCodeManager.getErrorMessage("10000", null));
		}
		return messages;

	}

	public static Function findByName(String name) {
		Session session = HibernateUtil.getSession();
		Query q = session.getNamedQuery("findFunctionByName");
		q.setParameter("name", name);

		Function function = (Function) q.uniqueResult();
		return function;

	}

	public static CiItemsResultDTO findFunctionBy(
			ApplicationSearchParamsDTO input) {
		CiMetaData metaData = new CiMetaData("FUNCTION_ID", "FUNCTION_NAME",
				null, "land_kennzeichen", "Function", "function",
				AirKonstanten.TABLE_ID_FUNCTION, null, null, null);
		return findFunctionCisBy(input, metaData);
	}

	public static CiItemsResultDTO findFunctionCisBy(CiSearchParamsDTO input,
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

	public static CiEntityEditParameterOutput saveFunction(
			FunctionDTO functionDTO, String cwid) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		boolean toCommit = false;

		if (StringUtils.isNotNullOrEmpty(cwid)) {
			if (null != functionDTO.getId()
					|| 0 < functionDTO.getId().longValue()) {
				List<String> messages = validateCi(functionDTO);
				if (messages.isEmpty()) {
					Long id = functionDTO.getId();
					Session session = HibernateUtil.getSession();
					Transaction tx = session.beginTransaction();
					Function function = (Function) session.get(Function.class,
							id);
					if (null == function) {
						// Ways was not found in database
						output.setErrorMessage("1000", EMPTY + id);
					} else if (null != function.getDeleteTimestamp()) {
						// Ways is deleted
						output.setErrorMessage("1001", EMPTY + id);
					} else {
						setUpCi(function, functionDTO, cwid, false);
					}
					try {
						if (null != function
								&& null == function.getDeleteTimestamp()) {
							session.saveOrUpdate(function);
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
						if (toCommit && null != function) {
							if (null == hbnMessage) {
								output.setResult(AirKonstanten.RESULT_OK);
								output.setMessages(new String[] { EMPTY });
							} else {
								output.setResult(AirKonstanten.RESULT_ERROR);
								output.setMessages(new String[] { hbnMessage });
							}
						}

						if (function.getRefId() == null
								&& function.getItsecGroupId() != null) {
							ItsecMassnahmeStatusHbn.saveSaveguardAssignment(
									functionDTO.getTableId(),
									functionDTO.getId(),
									functionDTO.getItsecGroupId());
						}
					}
				}
			}
		}
		return output;

	}

	protected static void setUpCi(Function ci, CiBaseDTO ciDTO, String cwid,
			boolean isCiCreate) {
		if (null != ciDTO.getCiOwnerHidden()) {
			if (StringUtils.isNullOrEmpty(ciDTO.getCiOwnerHidden())) {
				ci.setCiOwner(null);
			} else {
				ci.setCiOwner(ciDTO.getCiOwnerHidden());
			}
		}

		Long itSet = null;
		String strItSet = ApplReposHbn.getItSetFromCwid(ciDTO.getCiOwner());
		if (null != strItSet) {
			itSet = Long.parseLong(strItSet);
			ci.setItset(itSet);
		}
		ci.setName(ciDTO.getName());
		if (isCiCreate) {
			ci.setInsertUser(cwid);
			ci.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			ci.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

			// ci - update values
			ci.setUpdateUser(ci.getInsertUser());
			ci.setUpdateQuelle(ci.getInsertQuelle());
			ci.setUpdateTimestamp(ci.getInsertTimestamp());
		} else {
			ci.setUpdateUser(cwid);
			ci.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			ci.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
		}
		if (null != ciDTO.getCiOwnerDelegateHidden()) {
			if (StringUtils.isNullOrEmpty(ciDTO.getCiOwnerDelegateHidden())) {
				ci.setCiOwnerDelegate(null);
			} else {
				ci.setCiOwnerDelegate(ciDTO.getCiOwnerDelegateHidden());
			}
		}
		if (isCiCreate && null == ciDTO.getTemplate()) {
			ciDTO.setTemplate(new Long(0)); // no template
		}
		if (null != ciDTO.getTemplate()) {

			ci.setTemplate(ciDTO.getTemplate());

		}

		if (null != ciDTO.getItsecGroupId() && 0 != ciDTO.getItsecGroupId()) {
			if (-1 == ciDTO.getItsecGroupId()) {
				ci.setItsecGroupId(null);
			} else {
				ci.setItsecGroupId(ciDTO.getItsecGroupId());
			}
		}

		if (null != ciDTO.getRefId()) {
			if (-1 == ciDTO.getRefId() || 0 == ciDTO.getRefId()) {
				ci.setRefId(null);
				// Anlegen der ITSec Massnahmen
				ItsecMassnahmeStatusHbn.saveSaveguardAssignment(
						ciDTO.getTableId(), ci.getId(), ci.getItsecGroupId());
			} else {
				ci.setRefId(ciDTO.getRefId());
			}
		}

		if (null == ciDTO.getRelevanzItsec()) {
			if (Y.equals(ciDTO.getRelevanceGR1435())) {
				ciDTO.setRelevanzItsec(new Long(-1));
			} else if (N.equals(ciDTO.getRelevanceGR1435())) {
				ciDTO.setRelevanzItsec(new Long(0));
			}
		}
		if (null == ciDTO.getRelevanceICS()) {
			if (Y.equals(ciDTO.getRelevanceGR1920())) {
				ciDTO.setRelevanceICS(new Long(-1));
			} else if (N.equals(ciDTO.getRelevanceGR1920())) {
				ciDTO.setRelevanceICS(new Long(0));
			}
		}

		ci.setRelevanceITSEC(ciDTO.getRelevanzItsec());
		ci.setRelevanceICS(ciDTO.getRelevanceICS());

		if (StringUtils.isNotNullOrEmpty(ciDTO.getGxpFlag())) {
			if ("null".equals(ciDTO.getGxpFlag())) {
				ci.setGxpFlag(null);
			} else {
				ci.setGxpFlag(ciDTO.getGxpFlag());
			}
		}
	}

}
