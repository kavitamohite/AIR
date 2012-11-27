package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Currency;
import com.bayerbbs.applrepos.dto.CurrencyDTO;

public class CurrencyHbn {

	/** The logger. */
	private static final Log log = LogFactory.getLog(CurrencyHbn.class);
	
	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<CurrencyDTO> getDTOList(
			List<Currency> input) {
		ArrayList<CurrencyDTO> listDTO = new ArrayList<CurrencyDTO>();

		for (Iterator<Currency> iter = input.iterator(); iter.hasNext();) {
			Currency data = iter.next();
			CurrencyDTO dto = new CurrencyDTO();

			dto.setCurrencyId(data.getCurrencyId());
			dto.setCurrencyName(data.getCurrencyName());
			dto.setCurrencySymbol(data.getCurrencySymbol());
			
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
	public static CurrencyDTO[] getArrayFromList(
			List<CurrencyDTO> input) {
		CurrencyDTO output[] = new CurrencyDTO[input.size()];
		int i = 0;
		for (final CurrencyDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	/**
	 * returns all currencies (not deleted)
	 * @return
	 */
	public static List<CurrencyDTO> listCurrencyHbn() {

		List<CurrencyDTO> listResult = new ArrayList<CurrencyDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<Currency> values = session
					.createQuery(
							"select h from Currency as h where h.deleteTimestamp is null order by h.currencyName")
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
