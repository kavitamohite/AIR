package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.bayerbbs.applrepos.domain.Konto;
import com.bayerbbs.applrepos.dto.CostCenterDTO;

public class CostcenterHbn extends BaseHbn{

	public static Konto findById(Long id) {
		return findById(Konto.class, id);
	}

	private static List<CostCenterDTO> getDTOCostcenterList(List<Konto> input) {
		List<CostCenterDTO> listDTO = new ArrayList<CostCenterDTO>();

		for (Konto konto : input) {
			listDTO.add(new CostCenterDTO(konto.getId(), konto.getName(), konto.getCwidVerantw()));
		}
		return listDTO;
	}

	@SuppressWarnings("unchecked")
	public static CostCenterDTO[] getCostcenterList(Long kontoId) {

		List<CostCenterDTO> data = new ArrayList<CostCenterDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			Criteria criteria = session.createCriteria(Konto.class);
			criteria.add(Restrictions.isNull("deleteTimestamp"));
			criteria.add(Restrictions.eq("art", "KST"));
			criteria.addOrder(Order.asc("name"));
			List<Konto> values = criteria.list();

			data = getDTOCostcenterList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				throw e;
			}

		}
		return data.toArray(new CostCenterDTO[0]);
	}

}
