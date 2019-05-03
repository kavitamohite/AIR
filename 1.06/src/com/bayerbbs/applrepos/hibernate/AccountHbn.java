package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Account;
import com.bayerbbs.applrepos.dto.AccountDTO;

public class AccountHbn {

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<AccountDTO> getDTOList(
			List<Account> input) {
		ArrayList<AccountDTO> listDTO = new ArrayList<AccountDTO>();

		for (Iterator<Account> iter = input.iterator(); iter.hasNext();) {
			Account data = (Account) iter.next();
			AccountDTO dto = new AccountDTO();

			dto.setAccountId(data.getAccountId());
			dto.setAccountName(data.getAccountName());
			
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
	public static AccountDTO[] getArrayFromList(
			List<AccountDTO> input) {
		AccountDTO output[] = new AccountDTO[input.size()];
		int i = 0;
		for (final AccountDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	public static List<AccountDTO> listAccountHbn() {

		List<AccountDTO> listResult = new ArrayList<AccountDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<Account> values = session
					.createQuery(
							"select h from Account as h where h.deleteTimestamp is null and (h.accountType='KST' or (h.accountType='PSP' and h.accountName like 'O%')) order by h.accountName")
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
