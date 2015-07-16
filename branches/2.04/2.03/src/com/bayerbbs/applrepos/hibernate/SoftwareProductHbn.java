package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.SoftwareCategory2;
import com.bayerbbs.applrepos.dto.KeyValueDTO;

public class SoftwareProductHbn extends BaseHbn{
	public static SoftwareCategory2 findById(Long id) {
		return findById(SoftwareCategory2.class, id);
	}
	private static List<KeyValueDTO> getDTOSoftwareProductList(List<SoftwareCategory2> input) {
		List<KeyValueDTO> listDTO = new ArrayList<KeyValueDTO>();

		for (SoftwareCategory2 softwareCategory2 : input) {
			listDTO.add(new KeyValueDTO(softwareCategory2.getId(),softwareCategory2.getHwKategory2()));
		}
		return listDTO;
	}

	public static KeyValueDTO[] getSoftwareProductById(Long id) {

		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<SoftwareCategory2> values = session.createQuery("from SoftwareCategory2").list();

			data = getDTOSoftwareProductList(values);

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
