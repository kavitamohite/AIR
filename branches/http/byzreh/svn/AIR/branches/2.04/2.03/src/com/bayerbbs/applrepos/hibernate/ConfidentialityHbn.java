package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Confidentiality;
import com.bayerbbs.applrepos.dto.ConfidentialityDTO;

public class ConfidentialityHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static ConfidentialityDTO[] getArrayFromList(
			List<ConfidentialityDTO> input) {
		ConfidentialityDTO output[] = new ConfidentialityDTO[input.size()];
		int i = 0;
		for (final ConfidentialityDTO data : input) {
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
	private static List<ConfidentialityDTO> getDTOList(
			List<Confidentiality> input) {
		ArrayList<ConfidentialityDTO> listDTO = new ArrayList<ConfidentialityDTO>();

		for (Iterator<Confidentiality> iter = input.iterator(); iter.hasNext();) {
			Confidentiality data = iter.next();
			ConfidentialityDTO dto = new ConfidentialityDTO();

			dto.setConfidentialityId(data.getConfidentialityId());
			dto.setConfidentialityName(data.getConfidentialityName());
			dto.setConfidentialityNameEn(data.getConfidentialityNameEn());
			
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	@SuppressWarnings("unchecked")
	public static List<ConfidentialityDTO> listConfidentiality() {

		List<ConfidentialityDTO> listResult = new ArrayList<ConfidentialityDTO>();
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<Confidentiality> values = session.createQuery(
						"select h from Confidentiality as h where h.delQuelle is null order by h.sort").list();// where h.deleteTimestamp is null
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}

}
