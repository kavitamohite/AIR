package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.ItSet;
import com.bayerbbs.applrepos.dto.ItSetDTO;

public class ItSetHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static ItSetDTO[] getArrayFromList(
			List<ItSetDTO> input) {
		ItSetDTO output[] = new ItSetDTO[input.size()];
		int i = 0;
		for (final ItSetDTO data : input) {
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
	private static List<ItSetDTO> getDTOList(
			List<ItSet> input) {
		ArrayList<ItSetDTO> listDTO = new ArrayList<ItSetDTO>();

		for (Iterator<ItSet> iter = input.iterator(); iter.hasNext();) {
			ItSet data = iter.next();
			ItSetDTO dto = new ItSetDTO();

			dto.setId(data.getId());
			dto.setItSetName(data.getItSetName());
			
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	@SuppressWarnings("unchecked")
	public static List<ItSetDTO> listItSet() {

		List<ItSetDTO> listResult = new ArrayList<ItSetDTO>();
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<ItSet> values = session.createQuery(
						"select h from ItSet as h order by h.itSetName").list();
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}

}