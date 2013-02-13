package com.bayerbbs.applrepos.hibernate;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Terrain;

public class TerrainHbn extends LokationItemHbn {
	private static final Log log = LogFactory.getLog(TerrainHbn.class);
	
	public static Terrain findById(Long id) {
		Terrain terrain = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		
		try {
			tx = session.beginTransaction();
//			List<Schrank> list = session.createQuery("select b from Building as b where b.buildingId=" + id).list();
//
//			if (null != list && 0 < list.size()) {
//				schrank = (Schrank) list.get(0);
//			}
			
			terrain = (Terrain)session.get(Terrain.class, id);

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
		return terrain;
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.TERRAIN_TYPE_LOCATION, ciId);
	}


}