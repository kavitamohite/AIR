package com.bayerbbs.applrepos.hibernate;

import java.util.HashMap;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.AnnotationConfiguration;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
	private static SessionFactory sessionFactory;
	private static final Map<Integer, SessionFactory> sessionFactories = new HashMap<Integer, SessionFactory>();
	
	public static final int DATASOURCE_ID_GSTOOL = 0x4711;
	public static final int DATASOURCE_ID_TRANSBASE = 0x0815;
	
	/*private static Configuration transbaseConf;

	static {
		try {
			// Einlesen der Standard-Konfig (aus der hibernate.cfg.xml)
			transbaseConf = new Configuration().configure();

			// Erzeugung der Session.
			sessionFactory = transbaseConf.buildSessionFactory();

		} catch (RuntimeException ex) {
			System.out.println(ex.getMessage());
		}
	}*/
	
	public static SessionFactory getSessionFactory(int dataSourceId) {
		SessionFactory sf = sessionFactories.get(dataSourceId);
		
		if(sf == null) {
			Configuration config = null;
			
			switch(dataSourceId) {
				case DATASOURCE_ID_GSTOOL:
					config = new AnnotationConfiguration().configure("hibernate.gstool.cfg.xml");
					break;
				case DATASOURCE_ID_TRANSBASE:
					config = new AnnotationConfiguration().configure();
//					transbaseConf = config;
					break;
				default: break;
			}
			
			sf = config.buildSessionFactory();
			sessionFactories.put(dataSourceId, sf);
		}
		
		return sf;
	}
	
	public static Session getSession(int dataSourceId) {
		Session session = getSessionFactory(dataSourceId).openSession();
		return session;
	}
	

	public static SessionFactory getSessionFactory() {
		if (null == sessionFactory) {
			try {
				
				// Einlesen der Standard-Konfig (aus der hibernate.cfg.xml)
// 				Configuration conf = new Configuration().configure();

				AnnotationConfiguration conf = new AnnotationConfiguration().configure();
				
				// Erzeugung der Session.
				sessionFactory = conf.buildSessionFactory();

			} catch (RuntimeException ex) {
				System.out.println(ex.getMessage());
			}
			
		}
		
		return sessionFactory;
	}
	

	public static Session getSession() {
		Session session = HibernateUtil.getSessionFactory().openSession();
		return session;
	}
	

	public static String close(Transaction tx, Session session, boolean commit) {
		String message = null;
		try {
			if (null != tx && tx.isActive()) {
				if (commit) {
					tx.commit();
				}
				else {
					tx.rollback();
				}
			}
		} catch (Exception e) {
			// handle exception
			message = e.getMessage();
			if (null != e.getCause()) {
				message = e.getCause().toString();
			}
		}
		
		try {
			if (null != session && session.isOpen()) {
				session.connection().close();
				session.close();
				
			}
		} catch (Exception e) {
			// handle exception
			message = e.getMessage();
		}
		return message;
	}
}