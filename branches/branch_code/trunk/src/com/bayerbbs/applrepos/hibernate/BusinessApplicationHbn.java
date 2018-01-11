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

import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.BusinessApplication;
import com.bayerbbs.applrepos.domain.BusinessApplicationDTO;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.LDAPAuthWS;

public class BusinessApplicationHbn extends BaseHbn {

	private static final Log log = LogFactory
			.getLog(BusinessApplicationHbn.class);

	public static BusinessApplication findById(Long Id) {
		return findById(BusinessApplication.class, Id);
	}

	public static BusinessApplication findByName(String name, String alias) {
		Session session = HibernateUtil.getSession();
		Query q = session.getNamedQuery("findBusinessApplicationByNameORAlias");
		q.setParameter("applicationName", name);
		// q.setParameter("alias", alias);
		BusinessApplication businessApplication = (BusinessApplication) q
				.uniqueResult();
		return businessApplication;

	}

	public static CiEntityEditParameterOutput saveBusinessApplication(
			BusinessApplicationDTO businessApplicationDTO, String cwid) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		try {
			if (StringUtils.isNotNullOrEmpty(cwid)) {
				if (null != businessApplicationDTO.getId()
						|| 0 < businessApplicationDTO.getId().longValue()) {
					if (businessApplicationDTO.getUpStreamAdd() != null
							&& businessApplicationDTO.getUpStreamAdd().length() > 0
							|| businessApplicationDTO.getUpStreamDelete() != null
							&& businessApplicationDTO.getUpStreamDelete()
									.length() > 0)
						CiEntitiesHbn.saveCiRelations(
								businessApplicationDTO.getTableId(),
								businessApplicationDTO.getId(),
								businessApplicationDTO.getUpStreamAdd(),
								businessApplicationDTO.getUpStreamDelete(),
								AirKonstanten.UP, cwid);

					if (businessApplicationDTO.getDownStreamAdd() != null
							&& businessApplicationDTO.getDownStreamAdd()
									.length() > 0
							|| businessApplicationDTO.getDownStreamDelete() != null
							&& businessApplicationDTO.getDownStreamDelete()
									.length() > 0)
						CiEntitiesHbn.saveCiRelations(
								businessApplicationDTO.getTableId(),
								businessApplicationDTO.getId(),
								businessApplicationDTO.getDownStreamAdd(),
								businessApplicationDTO.getDownStreamDelete(),
								AirKonstanten.DN, cwid);
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

			output.setResult(AirKonstanten.RESULT_OK);
			output.setMessages(new String[] { EMPTY });

		}

		return output;

	}

	// /Avanti

	public static CiItemsResultDTO findBusinessApplicationBy(
			ApplicationSearchParamsDTO input) {

		CiMetaData metaData = new CiMetaData("BUSINESS_APPLICATION_ID",
				"APPLICATION_NAME", "APPLICATION_ALIAS", null,
				"Business Application",
				AirKonstanten.TABLE_BUSINESS_APPLICATION,
				AirKonstanten.TABLE_ID_BUSINESS_APPLICATION, null, null, null);

		return findBusinessApplicationCisBy(input, metaData);
	}

	public static CiItemsResultDTO findBusinessApplicationCisBy(
			ApplicationSearchParamsDTO input, CiMetaData metaData) {
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
					// ci.setTypeName(metaData.getTypeName());
					ci.setApplicationCat1Txt(metaData.getTypeName());
					ci.setApplicationOwner(rs.getString("APPLICATION_OWNER"));
					ci.setApplicationSteward(rs
							.getString("APPLICATION_STEWARD"));
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
			ApplicationSearchParamsDTO input, CiMetaData metaData) {
		StringBuilder sql = new StringBuilder();
		
		// Start Adding for C0000241362 
		String complainceGR1435=input.getComplainceGR1435();
		String complainceICS=input.getComplainceICS();
				long complainceGR1435Long=0;
				long complainceICSLong=0;
				System.out.println("complainceGR1435"+complainceGR1435);
				System.out.println("complainceICS"+complainceICS);
				if(complainceGR1435.equalsIgnoreCase("Yes"))
					
					complainceGR1435Long = -1;
				if(complainceGR1435.equalsIgnoreCase("No"))
					complainceGR1435Long=0;
				
				if(complainceICS.equalsIgnoreCase("Yes"))
					complainceICSLong = -1;
				if(complainceICS.equalsIgnoreCase("No"))
					complainceICSLong=0;
				// End Adding for C0000241362

		sql.append("SELECT ").append(metaData.getIdField()).append(", ")
				.append(metaData.getNameField());
		sql.append(",").append(metaData.getAliasField());

		sql.append(",APPLICATION_STEWARD,APPLICATION_OWNER, del_quelle FROM ")
				.append(metaData.getTableName()).append(" WHERE 1=1 ");

		if (input.getShowDeleted() == null
				|| !input.getShowDeleted().equals(AirKonstanten.YES_SHORT))
			sql.append(" AND del_quelle IS NULL");
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
				sql.append(" AND  UPPER (RELEVANZ_ITSEC) = '"+complainceGR1435Long+"'");
				
		System.out.println("complainceGR1435Long appened"+complainceGR1435Long);
		}
				// End Adding for C0000241362 
		sql.append(" AND UPPER(").append(metaData.getNameField())
				.append(") LIKE '");

		if (CiEntitiesHbn.isLikeStart(input.getQueryMode()))
			sql.append("%");

		sql.append(input.getCiNameAliasQuery().toUpperCase());

		if (CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
			sql.append("%");

		sql.append("'");

		boolean isNot = false;

		if (StringUtils.isNotNullOrEmpty(input.getSource())) {
			isNot = isNot(input.getSourceOptions());
			sql.append(
					" AND insert_quelle " + getEqualNotEqualOperator(isNot)
							+ " '").append(input.getSource()).append("'");
		}

		if (StringUtils.isNotNullOrEmpty(input.getAppOwnerHidden())) {
			isNot = isNot(input.getAppOwnerOptions());

			sql.append(" AND ");
			if (isNot)
				sql.append("UPPER(APPLICATION_OWNER) IS NULL OR ");

			sql.append(
					"UPPER(APPLICATION_OWNER) " + getLikeNotLikeOperator(isNot)
							+ " '")
					.append(input.getAppOwnerHidden().toUpperCase())
					.append("'");
		}

		if (StringUtils.isNotNullOrEmpty(input.getAppStewardHidden())) {// advsearchsteward
			isNot = isNot(input.getAppStewardOptions());

			sql.append(" and (");
			if (isNot)
				sql.append("UPPER(APPLICATION_STEWARD) is null or ");

			sql.append(
					"UPPER(APPLICATION_STEWARD) "
							+ getLikeNotLikeOperator(isNot) + " '")
					.append(input.getAppStewardHidden().toUpperCase())
					.append("')");// advsearchsteward
		}

		if (StringUtils.isNotNullOrEmpty(input.getDescription())) {
			isNot = isNot(input.getDescriptionOptions());
			sql.append(
					" and UPPER(APPLICATION_DESCRIPTION) "
							+ getLikeNotLikeOperator(isNot) + " '%")
					.append(input.getDescription().toUpperCase()).append("%'");
		}

		if (null != (input.getLifecycleStatusId())) {
			isNot = isNot(input.getLifecycleStatusOptions());
			sql.append(
					" and NVL(LIFE_CYCLE_STATUS, 0) "
							+ getEqualNotEqualOperator(isNot) + " ").append(
					input.getLifecycleStatusId().longValue());
		}
		log.info("SQL- Business application search" + sql);
		return sql;
	}

}
