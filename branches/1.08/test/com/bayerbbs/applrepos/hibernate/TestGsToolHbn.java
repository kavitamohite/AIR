package com.bayerbbs.applrepos.hibernate;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class TestGsToolHbn {
	Session session = null;

	@Before
	public void setUp() throws Exception {
		SessionFactory sf = new AnnotationConfiguration().configure("hibernate.gstool.cfg.xml").buildSessionFactory();//new File("src/hibernate.cfg.xml") nicht nötig
		session = sf.openSession();
	}

	@Test
	public void testGetMassnahmeBeschreibungDefault() throws HibernateException, SQLException { 
		StringBuilder sql = new StringBuilder("select * from mb_massn_txt where mas_id = ?");//select * from mb_massn_txt
		
//		Statement statement = session.connection().createStatement();
//		ResultSet rs = statement.executeQuery(sql.toString());
		
		PreparedStatement statement = session.connection().prepareStatement(sql.toString());
		statement.setString(1, "-10041");
		ResultSet rs = statement.executeQuery();

		while(rs.next()) {
			System.out.println(rs.getString("BESCHREIBUNG"));//BESCHREIBUNG NAME
			System.out.println("---------------------------------------------------------\n\n\n\n");
		}
		
		rs.close();
		session.close();
	}
	
	@Test
	public void testDefault() throws HibernateException, SQLException { 
		StringBuilder sql = new StringBuilder("select * from mb_massn_txt");
		
//		Statement statement = session.connection().createStatement();
//		ResultSet rs = statement.executeQuery(sql.toString());
		
		PreparedStatement statement = session.connection().prepareStatement(sql.toString());
		ResultSet rs = statement.executeQuery();
		
		ResultSetMetaData metaData = rs.getMetaData();
		int columns = metaData.getColumnCount();
		for(int i = 0; i < columns; i++)
			System.out.println(metaData.getColumnName(i+1));
		
//		int i = 0;
//		while(rs.next()) {
//			System.out.println(i++);
//		}
		rs.close();
		
		session.close();
	}

	@After
	public void tearDown() throws Exception {
		session.close();
	}
}