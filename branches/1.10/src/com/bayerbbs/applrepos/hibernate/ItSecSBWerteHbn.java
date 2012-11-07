package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.ItsecSBWerte;
import com.bayerbbs.applrepos.dto.ItSecSBWerteDTO;


public class ItSecSBWerteHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static ItSecSBWerteDTO[] getArrayFromList(
			List<ItSecSBWerteDTO> input) {
		ItSecSBWerteDTO output[] = new ItSecSBWerteDTO[input.size()];
		int i = 0;
		for (final ItSecSBWerteDTO data : input) {
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
	private static List<ItSecSBWerteDTO> getDTOList(
			List<ItsecSBWerte> input) {
		ArrayList<ItSecSBWerteDTO> listDTO = new ArrayList<ItSecSBWerteDTO>();

		for (Iterator<ItsecSBWerte> iter = input.iterator(); iter.hasNext();) {
			ItsecSBWerte data = (ItsecSBWerte) iter.next();
			ItSecSBWerteDTO dto = new ItSecSBWerteDTO();

			dto.setItsecSBId(data.getItsecSBId());
			dto.setSbText(data.getSbText());
			dto.setSbWert(data.getSbWert());
			dto.setSbTextEn(data.getSbTextEn());
			
			if (null != data.getSort()) {
				dto.setSort(data.getSort());
			}
			
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	@SuppressWarnings("unchecked")
	public static List<ItSecSBWerteDTO> getListItSecSBWerte() {

		List<ItSecSBWerteDTO> listResult = new ArrayList<ItSecSBWerteDTO>();
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<ItsecSBWerte> values = session.createQuery(
						"select h from ItsecSBWerte as h order by h.sort").list();
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}

	
}
