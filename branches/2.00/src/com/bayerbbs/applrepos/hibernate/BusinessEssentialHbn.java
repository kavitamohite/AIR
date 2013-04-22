package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.BusinessEssential;
import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.dto.SeverityLevelDTO;

public class BusinessEssentialHbn {

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<BusinessEssentialDTO> getDTOList(
			List<BusinessEssential> input) {
		ArrayList<BusinessEssentialDTO> listDTO = new ArrayList<BusinessEssentialDTO>();

		for (Iterator<BusinessEssential> iter = input.iterator(); iter.hasNext();) {
			BusinessEssential data = iter.next();
			BusinessEssentialDTO dto = new BusinessEssentialDTO();

			dto.setSeverityLevelId(data.getSeverityLevelId());
			dto.setSeverityLevel(data.getSeverityLevel());
			dto.setSeverityGPSC(data.getSeverityGPSC());
			dto.setUsage(data.getUsage());
			if (null != data.getBeCode()) {
				dto.setBeCode(data.getBeCode());
			}
			listDTO.add(dto);
		}
		return listDTO;
	}

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static BusinessEssentialDTO[] getBEArrayFromList(
			List<BusinessEssentialDTO> input) {
		BusinessEssentialDTO output[] = new BusinessEssentialDTO[input.size()];
		int i = 0;
		for (final BusinessEssentialDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	
	public static SeverityLevelDTO[] getSLArrayFromList(
			List<SeverityLevelDTO> input) {
		SeverityLevelDTO output[] = new SeverityLevelDTO[input.size()];
		int i = 0;
		for (final SeverityLevelDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	
	/**
	 * list all businessEssential (Severity_Level with usage = "ITSCM"
	 * @return
	 */
	public static List<BusinessEssentialDTO> listBusinessEssentialHbn() {

		return listBeOrSeverity("Business Essential");
	}

	/**
	 * list all severity level (Severity_Level with usage = "non-ITSCM"
	 * @return
	 */
	public static List<SeverityLevelDTO> listSeverityLevelHbn() {

		List<BusinessEssentialDTO> listBusinessEssential =  listBeOrSeverity("Severity Level");
		
		ArrayList<SeverityLevelDTO> listSeverityLevel = new ArrayList<SeverityLevelDTO>();
		for (final BusinessEssentialDTO data : listBusinessEssential) {
			SeverityLevelDTO dto = new SeverityLevelDTO();
			dto.setSeverityLevelId(data.getSeverityLevelId());
			dto.setSeverityLevel(data.getSeverityLevel());
			dto.setSeverityGPSC(data.getSeverityGPSC());
			dto.setUsage(data.getUsage());
			if (null != data.getBeCode()) {
				dto.setBeCode(data.getBeCode());
			}
			listSeverityLevel.add(dto);
		}
		
		return listSeverityLevel;
	}


	private static List<BusinessEssentialDTO> listBeOrSeverity(String usage) {

		List<BusinessEssentialDTO> listResult = new ArrayList<BusinessEssentialDTO>();
		String where = "";
		if (usage=="Business Essential") {
			where = "h.usage = 'ITSCM' and h.beCode in (0,1,2,3)";//neu wegen eins application CI loading bugs: 2 dazugenommen (22042013)
		} else if (usage=="Severity Level") {
			where = "h.usage = 'non-ITSCM'";
		} else {
			where = "1=0";
		}
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<BusinessEssential> values = session
					.createQuery(
							"select h from BusinessEssential as h where " + where + " and h.deleteTimestamp is null order by h.beCode, severityGPSC, h.severityLevel")
					.list();

			listResult = getDTOList(values);

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

	
}
