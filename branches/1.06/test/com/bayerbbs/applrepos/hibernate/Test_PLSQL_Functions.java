package com.bayerbbs.applrepos.hibernate;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class Test_PLSQL_Functions {
	Session session = null;

	@Before
	public void setUp() throws Exception {
		SessionFactory sf = new AnnotationConfiguration().configure().buildSessionFactory();//new File("src/hibernate.cfg.xml") nicht nötig
		session = sf.openSession();
		

		
	}
	
	@Test
	public void testFT_History() throws HibernateException, SQLException {
		String ciId = "116219";
		StringBuilder sql = new StringBuilder("select * from table(pck_air.ft_history("+ciId+"))");
				
		PreparedStatement statement = session.connection().prepareStatement(sql.toString());
		ResultSet rs = statement.executeQuery();
		
		
		System.out.println("TABLE_ID\tCI_ID\t\tDATETIME\t\t\t\tSOURCE\tUSERNAME\tDBUSER\tCOLUMN_NAME\tOLD_VALUE\tNEW_VALUE\tTABLE_NAME");
		while(rs.next()) {
			System.out.println(rs.getString("TABLE_ID")+"\t\t"+rs.getString("CI_ID")+"\t\t"+rs.getString("DATETIME")+"\t\t"+rs.getString("SOURCE")+"\t"+rs.getString("USERNAME")+"\t\t"+rs.getString("DBUSER")+"\t"+rs.getString("COLUMN_NAME")+"\t"+rs.getString("OLD_VALUE")+"\t\t"+rs.getString("NEW_VALUE")+"\t\t"+rs.getString("TABLE_NAME"));
		}
		
	}
	
	

	@After
	public void tearDown() throws Exception {
		session.close();
	}

}
