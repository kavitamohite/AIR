package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.HardwareCategory2;
import com.bayerbbs.applrepos.dto.KeyValueDTO;


public class SubCategoryHbn extends BaseHbn {
	
	public static HardwareCategory2 findById(Long id) {
		return findById(HardwareCategory2.class, id);
	}
	
	private static List<KeyValueDTO> getDTOSubCategoryList(List<HardwareCategory2> input) {
		List<KeyValueDTO> listDTO = new ArrayList<KeyValueDTO>();

		for (HardwareCategory2 data : input) {
			listDTO.add(new KeyValueDTO(data.getId(), data.getHwKategory2()));
		}
		return listDTO;
	}
	
	
	public static KeyValueDTO[] findSubCategoryList() {

		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<HardwareCategory2> values = session
					.createQuery("from HardwareCategory2")
					.list();

			data = getDTOSubCategoryList(values);

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
