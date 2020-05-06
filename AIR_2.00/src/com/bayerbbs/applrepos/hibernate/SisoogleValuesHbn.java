package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.dto.SISoogleAttribute;
import com.bayerbbs.applrepos.service.SisoogleParameterInput;


public class SisoogleValuesHbn {

	public static List<String> findValues(SisoogleParameterInput parameter) {

		List<String> listResult = new ArrayList<String>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			String sqlQuery = getSearchCommand(parameter);
			
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Object[]> temp = session
					.createSQLQuery(sqlQuery)
					.list();

			// handle entry
			if (null != temp && 0 < temp.size()) {
				Iterator<Object[]> itTemp = temp.iterator();
				while (itTemp.hasNext()) {
					Object tempObj = itTemp.next();
					String value = (String) tempObj;
					listResult.add(value);
				}
			}


			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				// throw again the first exception
				throw e;
			}

		}

		return listResult;
	}

	private static String getSearchCommand(SisoogleParameterInput parameter) {
		StringBuffer sb = new StringBuffer();
		sb.append("select distinct(").append(parameter.getTargetAttribut()).append(") from MV_SISOOGLE_VALUES where");
		sb.append(" CI_TYPE is not null");

		if (StringUtils.isNotNullOrEmpty(parameter.getCiType())) {
			sb.append(" and CI_TYPE='").append(parameter.getCiType()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getResponsible())) {
			sb.append(" and RESPONSIBLE='").append(parameter.getResponsible()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getResponsibleOE())) {
			sb.append(" and RESPONSIBLE_OE='").append(parameter.getResponsibleOE()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getSubResponsible())) {
			sb.append(" and SUB_RESPONSIBLE='").append(parameter.getSubResponsible()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getSubResponsibleOE())) {
			sb.append(" and SUB_RESPONSIBLE_OE='").append(parameter.getSubResponsibleOE()).append("'");
		}
		/*ELERJ ICS*/
		/*if (StringUtils.isNotNullOrEmpty(parameter.getRelevanceICS())) {
			sb.append(" and RELEVANCE_ICS='").append(parameter.getRelevanceICS()).append("'");
		}*/
		if (StringUtils.isNotNullOrEmpty(parameter.getRelevanceItsec())) {
			sb.append(" and RELEVANZ_ITSEC='").append(parameter.getRelevanceItsec()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getItsecGroup())) {
			sb.append(" and ITSEC_GROUP='").append(parameter.getItsecGroup()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getItSet())) {
			sb.append(" and IT_SET='").append(parameter.getItSet()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getOperationalStatus())) {
			sb.append(" and OPERATIONAL_STATUS='").append(parameter.getOperationalStatus()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getLifecycle())) {
			sb.append(" and LIFECYCLE='").append(parameter.getLifecycle()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getOsTyp())) {
			sb.append(" and OS_TYP='").append(parameter.getOsTyp()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getOsName())) {
			sb.append(" and OS_NAME='").append(parameter.getOsName()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getApplicationCat2())) {
			sb.append(" and ANWENDUNG_KAT2='").append(parameter.getApplicationCat2()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getActiveYN())) {
			sb.append(" and ACTIVE_Y_N='").append(parameter.getActiveYN()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getInsertQuelle())) {
			sb.append(" and INSERT_QUELLE='").append(parameter.getInsertQuelle()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getSeverityLevel())) {
			sb.append(" and SEVERITY_LEVEL='").append(parameter.getSeverityLevel()).append("'");
		}
		if (StringUtils.isNotNullOrEmpty(parameter.getGapResponsible())) {
			sb.append(" and GAP_RESPONSIBLE='").append(parameter.getGapResponsible()).append("'");
		}
		// TODO	String gapEndDate; Date
		// GAP_END_DATE

		
		
		return sb.toString();
	}

	public static SISoogleAttribute[] getSISoogleAttributesByType(String type) {
		StringBuilder sql = new StringBuilder();
		
		sql.
		append("SELECT DISTINCT ").append(type).
		append(" FROM MV_SISOOGLE_VALUES ").
		append("WHERE (UPPER(ACTIVE_Y_N) LIKE '%' OR ACTIVE_Y_N IS NULL) ").
		append("AND (UPPER(ANWENDUNG_KAT2) LIKE '%' OR ANWENDUNG_KAT2 IS NULL) ").
		append("AND (UPPER(CI_TYPE) LIKE '%' OR CI_TYPE IS NULL) ").
		append("AND (TO_CHAR(GAP_END_DATE) <= '9999-12-31' OR GAP_END_DATE IS NULL) ").
		append("AND (UPPER(GAP_RESPONSIBLE) LIKE '%' OR GAP_RESPONSIBLE IS NULL) ").
		append("AND (UPPER(INSERT_QUELLE) LIKE '%' OR INSERT_QUELLE IS NULL) ").
		append("AND (UPPER(IT_SET) LIKE '%' OR IT_SET IS NULL) ").
		append("AND (UPPER(ITSEC_GROUP) LIKE '%' OR ITSEC_GROUP IS NULL) ").
		append("AND (UPPER(LIFECYCLE) LIKE '%' OR LIFECYCLE IS NULL) ").
		append("AND (UPPER(OPERATIONAL_STATUS) LIKE '%' OR OPERATIONAL_STATUS IS NULL) ").
		append("AND (UPPER(OS_TYP) LIKE '%' OR OS_TYP IS NULL) ").
		/*ELERJ ICS*/
//		append("AND (UPPER(RELEVANCE_ICS) LIKE '%' OR RELEVANCE_ICS IS NULL) ").
		append("AND (UPPER(RELEVANZ_ITSEC) LIKE '%' OR RELEVANZ_ITSEC IS NULL) ").
		append("AND (UPPER(RESPONSIBLE) LIKE '%' OR RESPONSIBLE IS NULL) ").
		append("AND (UPPER(RESPONSIBLE_OE) LIKE '%' OR RESPONSIBLE_OE IS NULL) ").
		append("AND (UPPER(SEVERITY_LEVEL) LIKE '%' OR SEVERITY_LEVEL IS NULL) ").
		append("AND (UPPER(SUB_RESPONSIBLE) LIKE '%' OR SUB_RESPONSIBLE IS NULL) ").
		append("AND (UPPER(SUB_RESPONSIBLE_OE) LIKE '%' OR SUB_RESPONSIBLE_OE IS NULL) ").
		append("ORDER BY ").append(type);
		
		Transaction ta = null;
		Statement stmt = null;
//		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;

		List<SISoogleAttribute> siSoogleAttributes = new ArrayList<SISoogleAttribute>();
		
		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql.toString());
			
			int i = 7856;
			while (rs.next())
				siSoogleAttributes.add(new SISoogleAttribute(i++, rs.getString(1)));
		
			rs.close();
			stmt.close();
			conn.close();
			
			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
		
		return siSoogleAttributes.toArray(new SISoogleAttribute[0]);
	}
}