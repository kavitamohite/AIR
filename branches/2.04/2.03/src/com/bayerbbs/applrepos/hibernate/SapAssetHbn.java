package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.HardwareCategory1;
import com.bayerbbs.applrepos.dto.KeyValueEnDTO;

public class SapAssetHbn extends BaseHbn{
	
	public static HardwareCategory1 findById(Long id) {
		return findById(HardwareCategory1.class, id);
	}

	
	private static List<KeyValueEnDTO> getDTOSapAssetList(List<HardwareCategory1> input) {
		List<KeyValueEnDTO> listDTO = new ArrayList<KeyValueEnDTO>();

		for (HardwareCategory1 hardwarecategory1 : input) {
			listDTO.add(new KeyValueEnDTO(hardwarecategory1.getId(),(hardwarecategory1.getHwKategory1()+ " "+ hardwarecategory1.getText()), ""+hardwarecategory1.getMonth()));
		}
		return listDTO;
	}

	public static KeyValueEnDTO[] getSapAssetById(Long id) {

		List<KeyValueEnDTO> data = new ArrayList<KeyValueEnDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<HardwareCategory1> values = session.createQuery("from HardwareCategory1").list();

			data = getDTOSapAssetList(values);

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
