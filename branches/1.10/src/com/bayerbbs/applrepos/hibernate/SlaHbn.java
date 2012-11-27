package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Sla;
import com.bayerbbs.applrepos.dto.SlaDTO;

public class SlaHbn {
	
	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<SlaDTO> getDTOList(
			List<Sla> input) {
		ArrayList<SlaDTO> listDTO = new ArrayList<SlaDTO>();

		for (Iterator<Sla> iter = input.iterator(); iter.hasNext();) {
			Sla data = iter.next();
			SlaDTO dto = new SlaDTO();

			dto.setSlaId(data.getSlaId());
			dto.setSlaName(data.getSlaName());
			dto.setSlaClassId(data.getSlaClassId());
			
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
	public static SlaDTO[] getArrayFromList(
			List<SlaDTO> input) {
		SlaDTO output[] = new SlaDTO[input.size()];
		int i = 0;
		for (final SlaDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	@SuppressWarnings("unchecked")
	public static List<SlaDTO> listSlaHbn() {

		List<SlaDTO> listResult = new ArrayList<SlaDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<Sla> values = session
					.createQuery(
							"select h from Sla as h where h.deleteTimestamp is null order by h.slaName")
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
