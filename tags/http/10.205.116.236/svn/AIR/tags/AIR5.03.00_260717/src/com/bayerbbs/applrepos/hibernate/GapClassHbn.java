package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.GapClass;
import com.bayerbbs.applrepos.dto.GapClassDTO;

public class GapClassHbn {

	/** The logger. */
	private static final Log log = LogFactory.getLog(GapClassHbn.class);

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<GapClassDTO> getDTOList(
			List<GapClass> input) {
		ArrayList<GapClassDTO> listDTO = new ArrayList<GapClassDTO>();

		for (Iterator<GapClass> iter = input.iterator(); iter.hasNext();) {
			GapClass data = iter.next();
			GapClassDTO dto = new GapClassDTO();

			dto.setGapPriority(data.getGapPriority());
			dto.setGapClassTextDE(data.getGapClassTextDE());
			dto.setGapClassTextEN(data.getGapClassTextEN());
			
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
	public static GapClassDTO[] getArrayFromList(
			List<GapClassDTO> input) {
		GapClassDTO output[] = new GapClassDTO[input.size()];
		int i = 0;
		for (final GapClassDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	
	/**
	 * returns all gap classes
	 * @return
	 */
	public static List<GapClassDTO> listGapClassesHbn() {

		List<GapClassDTO> listResult = new ArrayList<GapClassDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<GapClass> values = session
					.createQuery(
							"select h from GapClass as h order by h.gapPriority")
					.list();

			listResult = getDTOList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
				// throw again the first exception
				throw e;
			}

		}

		return listResult;
	}
	
}
