package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.PriorityLevel;
import com.bayerbbs.applrepos.dto.PriorityLevelDTO;

public class PriorityLevelHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static PriorityLevelDTO[] getArrayFromList(
			List<PriorityLevelDTO> input) {
		PriorityLevelDTO output[] = new PriorityLevelDTO[input.size()];
		int i = 0;
		for (final PriorityLevelDTO data : input) {
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
	private static List<PriorityLevelDTO> getDTOList(
			List<PriorityLevel> input) {
		ArrayList<PriorityLevelDTO> listDTO = new ArrayList<PriorityLevelDTO>();

		for (Iterator<PriorityLevel> iter = input.iterator(); iter.hasNext();) {
			PriorityLevel data = iter.next();
			PriorityLevelDTO dto = new PriorityLevelDTO();

			dto.setPriorityLevelId(data.getPriorityLevelId());
			dto.setPriorityLevel(data.getPriorityLevel());
			
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	@SuppressWarnings("unchecked")
	public static List<PriorityLevelDTO> getListPriorityLevel() {

		List<PriorityLevelDTO> listResult = new ArrayList<PriorityLevelDTO>();
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<PriorityLevel> values = session.createQuery(
						"select h from PriorityLevel as h order by h.priorityLevelId").list();	// where h.deleteTimestamp is null 
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}

	
}
