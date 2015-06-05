package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.HardwareCategory4;
import com.bayerbbs.applrepos.dto.KeyValueDTO;

public class ModelHbn {

	private static List<KeyValueDTO> getDTOModelList(List<HardwareCategory4> input) {
		List<KeyValueDTO> listDTO = new ArrayList<KeyValueDTO>();

		for (HardwareCategory4 data : input) {
			listDTO.add(new KeyValueDTO(data.getId(), data.getHwKategory4()));
		}
		return listDTO;
	}

	@SuppressWarnings("unchecked")
	public static KeyValueDTO[] getModelById(Long kategory3Id) {
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();

			Query query = session.getNamedQuery("findCategory4byKategory3Id");
			query.setParameter("kategory3Id", kategory3Id);
			List<HardwareCategory4> values = query.list();
			data = getDTOModelList(values);
			// Model model = (Model)query.uniqueResult();

			// return (List<ModelDTO>) model;

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
