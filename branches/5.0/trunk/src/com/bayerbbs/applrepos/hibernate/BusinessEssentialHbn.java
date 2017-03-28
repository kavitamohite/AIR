package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.BusinessEssential;
import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;

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

		for (Iterator<BusinessEssential> iter = input.iterator(); iter
				.hasNext();) {
			BusinessEssential data = iter.next();
			if (!data.getInherited()) {
				BusinessEssentialDTO dto = new BusinessEssentialDTO();
				dto.setSeverityLevelId(data.getBusinessEssentialId());
				dto.setSeverityLevel(data.getBusinessEssentialName());
				dto.setSeverityGPSC(data.getBusinessEssentialCode());
				dto.setBeCode(data.getBusinessEssentialCode());
				dto.setUsage(data.getInherited_Y_N());
				listDTO.add(dto);
			}

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
	 * list all businessEssential (Severity_Level with usage = "ITSCM"
	 * 
	 * @return
	 */
	public static List<BusinessEssentialDTO> listBusinessEssentialHbn() {

		return listBusinessEssential();
	}

	private static List<BusinessEssentialDTO> listBusinessEssential() {

		List<BusinessEssentialDTO> listResult = new ArrayList<BusinessEssentialDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<BusinessEssential> values = session
					.createQuery(
							"select h from BusinessEssential as h order by h.businessEssentialCode, h.businessEssentialNameGPSC, h.businessEssentialId")
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

	public static BusinessEssential getBusinessEssential(Long businessEssentialID) {

		BusinessEssential businessEssential = new BusinessEssential();

		Session session = HibernateUtil.getSessionFactory().openSession();
	    businessEssential = (BusinessEssential) session.get(BusinessEssential.class, businessEssentialID);
	    return businessEssential;
	}

}
