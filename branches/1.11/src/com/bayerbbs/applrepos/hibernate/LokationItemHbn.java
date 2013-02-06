package com.bayerbbs.applrepos.hibernate;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.CiLokationsKette;

public class LokationItemHbn {
	private static final Log log = LogFactory.getLog(LokationItemHbn.class);

	static final String RAUM_TYPE_LOCATION = "raumId";
	static final String STANDORT_TYPE_LOCATION = "standortId";
	static final String TERRAIN_TYPE_LOCATION = "terrainId";
	static final String GEBAEUDE_TYPE_LOCATION = "gebaeudeId";
	static final String BUILDING_AREA_TYPE_LOCATION = "areaId";
	static final String AREA_TYPE_LOCATION = "areaId";
	static final String SCHRANK_TYPE_LOCATION = "schrankId";
	
	
	public static CiLokationsKette findLokationsKetteByCiTypeAndCiId(String ciType, Long ciId) {
		CiLokationsKette lokationsKette = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		
		try {
			tx = session.beginTransaction();
			List<CiLokationsKette> list = session.createQuery("select lk from CiLokationsKette lk where lk."+ciType+"=" + ciId).list();

			if (null != list && 0 < list.size()) {
				lokationsKette = (CiLokationsKette) list.get(0);
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
		return lokationsKette;
	}
}