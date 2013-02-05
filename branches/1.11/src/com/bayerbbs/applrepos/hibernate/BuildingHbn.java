package com.bayerbbs.applrepos.hibernate;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.CiLokationsKette;

public class BuildingHbn extends LokationItemHbn {
	private static final Log log = LogFactory.getLog(BuildingHbn.class);
	
	public static Building findById(Long id) {
		Building building = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		
		try {
			tx = session.beginTransaction();
			List<Building> list = session.createQuery("select b from Building as b where b.buildingId=" + id).list();

			if (null != list && 0 < list.size()) {
				building = (Building) list.get(0);
			}

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
				// throw again the first exception
				throw e;
			}

		}
		return building;
	}
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.GEBAEUDE_TYPE_LOCATION, ciId);
	}

}