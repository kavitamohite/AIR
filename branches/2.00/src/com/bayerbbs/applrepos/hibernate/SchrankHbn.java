package com.bayerbbs.applrepos.hibernate;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Schrank;

public class SchrankHbn extends LokationItemHbn {
	private static final Log log = LogFactory.getLog(BuildingHbn.class);
	
	public static Schrank findById(Long id) {
		Schrank schrank = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		
		try {
			tx = session.beginTransaction();
//			List<Schrank> list = session.createQuery("select b from Building as b where b.buildingId=" + id).list();
//
//			if (null != list && 0 < list.size()) {
//				schrank = (Schrank) list.get(0);
//			}
			
			schrank = (Schrank)session.get(Schrank.class, id);

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
		return schrank;
	}
	
	
	public static CiLokationsKette findLokationsKetteById(Long ciId) {
		return findLokationsKetteByCiTypeAndCiId(LokationItemHbn.SCHRANK_TYPE_LOCATION, ciId);
	}


}