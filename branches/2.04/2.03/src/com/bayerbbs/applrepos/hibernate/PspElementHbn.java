package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Pspelement;
import com.bayerbbs.applrepos.dto.KeyValueDTO;

public class PspElementHbn {
	
	private static List<KeyValueDTO> getDTOPspElementList(List<Pspelement> input) {
		List<KeyValueDTO> listDTO = new ArrayList<KeyValueDTO>();

		for (Pspelement pspelement : input) {
			listDTO.add(new KeyValueDTO(pspelement.getId(), pspelement.getName()));
		}
		return listDTO;
	}

	public static KeyValueDTO[] getPspElementById(Long kontoId) {

		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Pspelement> values = session.createQuery("from Pspelement").list();

			data = getDTOPspElementList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {

					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				// throw again the first exception
				throw e;
			}

		}
		Collections.sort(data);
		return data.toArray(new KeyValueDTO[0]);
	}




}
