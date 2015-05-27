package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.HardwareCategory3;
import com.bayerbbs.applrepos.dto.KeyValueDTO;

public class TypeHbn {

	private static List<KeyValueDTO> getDTOTypeList(List<HardwareCategory3> input) {
		List<KeyValueDTO> listDTO = new ArrayList<KeyValueDTO>();

		for (HardwareCategory3 data : input) {
			listDTO.add(new KeyValueDTO(data.getId(), data.getHwKategory3()));
		}
		return listDTO;
	}

	@SuppressWarnings("unchecked")
	public static KeyValueDTO[] getTypeById(Long partnerId, Long kategory2Id) {
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();

			Query query = session.getNamedQuery("findCategorybyPartnerIdandkategoryId");
			query.setParameter("partnerId", partnerId);
			query.setParameter("kategory2Id", kategory2Id);
			List<HardwareCategory3> values = query.list();
			data = getDTOTypeList(values);

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
