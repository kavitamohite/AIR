package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

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
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			Criteria criteria = session.createCriteria(SoftwareCategory2.class);
			criteria.add(Restrictions.eq("herstellerId", id));
			@SuppressWarnings("unchecked")
			List<SoftwareCategory2> values = (List<SoftwareCategory2>) criteria.list();

			data = getDTOSoftwareProductList(values);
			session.close();
		} catch (RuntimeException e) {
			session.close();
			throw e;
		}

		Collections.sort(data);
		return data.toArray(new KeyValueDTO[data.size()]);
	}
}
