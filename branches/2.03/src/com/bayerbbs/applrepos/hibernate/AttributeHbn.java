package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Attribute;

public class AttributeHbn {

	@SuppressWarnings("unchecked")
	public static List<Attribute> listAttributeForCiType(String ciType) {

		List<Attribute> listResult = new ArrayList<Attribute>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();

			SQLQuery query = session
					.createSQLQuery("select * from attribute where attribute_id in (select attribute_id from CI_TYPE_ATTRIBUTE_RELATION where config_item_type_id = (select config_item_type_id from config_item_type where upper(config_item_type_name) = '"
							+ ciType.toUpperCase() + "'))");
			query.addEntity(Attribute.class);
			listResult = query.list();

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

		return listResult;
	}

	@SuppressWarnings("unchecked")
	public static Attribute findById(Long attributeId) {
		Attribute result = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			SQLQuery query = session.createSQLQuery("select * from attribute where attribute_id = " + attributeId);
			query.addEntity(Attribute.class);
			List<Attribute> listResult = query.list();
			if (listResult.size() > 0) {
				result = listResult.get(0);
			}
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
		return result;

	}

	@SuppressWarnings("unchecked")
	public static List<Attribute> listAttributeForTableId(Long tableId) {
		List<Attribute> listResult = new ArrayList<Attribute>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();

			SQLQuery query = session
					.createSQLQuery("select * from attribute where attribute_id in (select attribute_id from CI_TYPE_ATTRIBUTE_RELATION where config_item_type_id in(select config_item_type_id from table_config_item_type where table_id ="
							+ tableId + "))");
			query.addEntity(Attribute.class);
			listResult = query.list();

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
		return listResult;
	}
}
