package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Konto;
import com.bayerbbs.applrepos.dto.KeyValueDTO;

public class CostcenterHbn {


	private static List<KeyValueDTO> getDTOCostcenterList(List<Konto> input) {
		List<KeyValueDTO> listDTO = new ArrayList<KeyValueDTO>();

		for (Konto konto : input) {
			listDTO.add(new KeyValueDTO(konto.getId(), konto.getName()));
		}
		return listDTO;
	}

	public static KeyValueDTO[] getCostcenterById(Long kontoId) {

		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Konto> values = session.createQuery("from Konto k where k.deleteQuelle is null").list();

			data = getDTOCostcenterList(values);

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
