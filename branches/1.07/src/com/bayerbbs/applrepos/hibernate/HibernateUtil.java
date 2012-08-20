package com.bayerbbs.applrepos.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.AnnotationConfiguration;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
	private static SessionFactory sessionFactory;

	static {
		try {
			
			// Einlesen der Standard-Konfig (aus der hibernate.cfg.xml)
			Configuration conf = new Configuration().configure();

			// Erzeugung der Session.
			sessionFactory = conf.buildSessionFactory();

		} catch (RuntimeException ex) {
			System.out.println(ex.getMessage());
		}
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
	
	/**
	 * gets a session from the sessionfactory
	 * @return
	 */
	public static Session getSession() {
		Session session = HibernateUtil.getSessionFactory().openSession();
		return session;
	}
	
	
	/**
	 * closes the transaction and session
	 * @param tx
	 * @param session
	 * @param rollback
	 */
	public static String close(Transaction tx, Session session, boolean commit) {
		String message = null;
		try {
			if (null != tx && tx.isActive()) {
				if (commit) {
					tx.commit();
				}
				else {
/*
					System.out.println("OPEN:" 			+ session.isOpen());
					System.out.println("CONNECTED: " 	+ session.isConnected());
					System.out.println("DIRTY:" 		+ session.isDirty());
*/					
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
/*
				System.out.println("! OPEN:" 		+ session.isOpen());
				System.out.println("! CONNECTED: " 	+ session.isConnected());
				System.out.println("! DIRTY:" 		+ session.isDirty());
*/
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