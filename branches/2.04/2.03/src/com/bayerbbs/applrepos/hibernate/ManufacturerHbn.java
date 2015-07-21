package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Partner;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
public class ManufacturerHbn  extends BaseHbn{
	public static Partner findById(Long id) {
		return findById(Partner.class, id);
	}
	
	private static List<KeyValueDTO> getDTOManufacturerList(List<Partner> input) {
		List<KeyValueDTO> listDTO = new ArrayList<KeyValueDTO>();

		for (Partner partner : input) {
			listDTO.add(new KeyValueDTO(partner.getId(), partner.getName()));
		}
		return listDTO;
	}

	@SuppressWarnings("unchecked")
	public static KeyValueDTO[] getManufacturerById(Long partnerId) {

		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<Partner> values = session.createQuery("from Partner p where p.number is null and p.deleteTimestamp is null").list();
			data = getDTOManufacturerList(values);
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
	
	public static KeyValueDTO[] getSoftwareProductById(Long partnerId) {
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Partner> values = session.createQuery("from Partner").list();

			data = getDTOManufacturerList(values);

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
