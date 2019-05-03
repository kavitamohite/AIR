package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.ApplicationCat1;
import com.bayerbbs.applrepos.dto.ApplicationCat1DTO;

public class ApplicationCat1Hbn {

	/**
	 * converts the list entry database table to dto
	 * @param input
	 * @return
	 */
	private static List<ApplicationCat1DTO> getDTOList(List<ApplicationCat1> input) {
		ArrayList<ApplicationCat1DTO> listDTO = new ArrayList<ApplicationCat1DTO>();

		for (Iterator<ApplicationCat1> iter = input.iterator(); iter.hasNext();) {
			ApplicationCat1 data = (ApplicationCat1) iter.next();
			ApplicationCat1DTO dto = new ApplicationCat1DTO();
			dto.setApplicationCat1Id(data.getId());
			dto.setApplicationCat1Text(data.getApplicationCat1Txt());
			dto.setApplicationCat1En(data.getApplicationCat1En());
			if (null != data.getSort()) {
				dto.setSort(data.getSort());
			}
			listDTO.add(dto);
		}
		return listDTO;
	}

	
	
	public static List<ApplicationCat1DTO> listApplicationCat1Hbn() {
		
		List<ApplicationCat1DTO> listResult = new ArrayList<ApplicationCat1DTO>();
		
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<ApplicationCat1> values = session.createQuery(
					"select h from ApplicationCat1 as h order by h.sort").list();
			
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
