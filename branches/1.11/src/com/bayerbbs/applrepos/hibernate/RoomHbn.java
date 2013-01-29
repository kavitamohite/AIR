package com.bayerbbs.applrepos.hibernate;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Room;

public class RoomHbn {

	private static final Log log = LogFactory.getLog(AnwendungHbn.class);
	
	public static Room findById(Long id) {
		Room room = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			List<Room> list = session.createQuery(
					"select h from Room as h where h.roomId= "
							+ id).list();

			if (null != list && 0 < list.size()) {
				room = (Room) list.get(0);
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
		return room;
	}

	
}
