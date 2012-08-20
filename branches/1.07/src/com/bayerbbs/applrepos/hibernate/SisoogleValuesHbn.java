package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.service.SissogleParameterInput;


public class SisoogleValuesHbn {

	public static List<String> findValues(SissogleParameterInput parameter) {

		List<String> listResult = new ArrayList<String>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			String sqlQuery = getSearchCommand(parameter);
			
			tx = session.beginTransaction();
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

	private static String getSearchCommand(SissogleParameterInput parameter) {
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
		if (StringUtils.isNotNullOrEmpty(parameter.getRelevanceICS())) {
			sb.append(" and RELEVANCE_ICS='").append(parameter.getRelevanceICS()).append("'");
		}
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
	
}
