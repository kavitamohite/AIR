package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Konto;

import com.bayerbbs.applrepos.dto.KeyValueEnDTO;

public class PspElementHbn {
	
	private static List<KeyValueEnDTO> getDTOPspElementList(List<Konto> input) {
		List<KeyValueEnDTO> listDTO = new ArrayList<KeyValueEnDTO>();

		for (Konto konto : input) {
			listDTO.add(new KeyValueEnDTO(konto.getId(), konto.getName(),konto.getBeschreibung()));
		}
		return listDTO;
	}

	public static KeyValueEnDTO[] getPspElementById(Long kontoId) {

		List<KeyValueEnDTO> data = new ArrayList<KeyValueEnDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Konto> values = session.createQuery("select k from Konto as k where (k.art='PSP') ").list();

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
		return data.toArray(new KeyValueEnDTO[0]);
	}




}
