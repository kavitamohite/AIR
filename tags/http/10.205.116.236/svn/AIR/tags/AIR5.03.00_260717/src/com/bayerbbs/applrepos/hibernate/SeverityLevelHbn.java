package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.SeverityLevel;
import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.dto.SeverityLevelDTO;

public class SeverityLevelHbn {
	
	
	
	public static SeverityLevel findById(Long id){		
		Session session = HibernateUtil.getSession();
		return (SeverityLevel)session.get(SeverityLevel.class, id);
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
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<BusinessEssentialDTO> getDTOList(
			List<SeverityLevel> input) {
		ArrayList<BusinessEssentialDTO> listDTO = new ArrayList<BusinessEssentialDTO>();

		for (Iterator<SeverityLevel> iter = input.iterator(); iter.hasNext();) {
			SeverityLevel data = iter.next();
			BusinessEssentialDTO dto = new BusinessEssentialDTO();

			dto.setSeverityLevelId(data.getSeverityLevelId());
			dto.setSeverityLevel(data.getSeverityLevelName());
			dto.setSeverityGPSC(data.getSeverityGPSC());
			dto.setBeCode(data.getBeCode());
			listDTO.add(dto);
		}
		return listDTO;
	}

	
	/**
	 * list all severity level (Severity_Level with usage = "non-ITSCM"
	 * @return
	 */
	public static List<SeverityLevelDTO> listSeverityLevelHbn() {

		List<BusinessEssentialDTO> listBusinessEssential =  listSeverity();
		
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


	private static List<BusinessEssentialDTO> listSeverity() {

		List<BusinessEssentialDTO> listResult = new ArrayList<BusinessEssentialDTO>();
		String where = "h.usage = 'non-ITSCM'";
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<SeverityLevel> values = session
					.createQuery(
							"select h from SeverityLevel as h where " + where + " order by h.beCode, h.severityGPSC, h.severityLevelName")
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
