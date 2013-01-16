package com.bayerbbs.applrepos.hibernate;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;

public class TestApplReposHbn {


	public static void main(String[] args) throws Exception {
		TestApplReposHbn t = new TestApplReposHbn();
		
		t.init();
		t.testFindRolePerson();
	}
	
	private void init() throws HibernateException, SQLException {
		SessionFactory sf = new AnnotationConfiguration().configure().buildSessionFactory();//new File("src/hibernate.cfg.xml") nicht nötig
		Session session = sf.openSession();
		
//		System.out.println(session.getClass().getName());
		
		//select rp.* , ro.role_name from role_person rp join role ro on ro.role_id = rp.role_id where rp.cwid = 'ERCVA' and rp.date_start <= current_date and rp.date_end > current_date and (ro.role_name like 'AIR%' or (ro.role_name = 'BusinessEssential-Editor' and rp.zob_id=11397))
		StringBuilder sql = new StringBuilder("select rp.* , ro.role_name from role_person rp join role ro on ro.role_id = rp.role_id where rp.cwid = 'ERCVA' and rp.date_start <= current_date and rp.date_end > current_date");
		
//		Statement statement = session.connection().createStatement();
//		ResultSet rs = statement.executeQuery(sql.toString());
		
		PreparedStatement statement = session.connection().prepareStatement(sql.toString());
		ResultSet rs = statement.executeQuery();
		
		while(rs.next()) {
			System.out.println(rs.getString("ROLE_NAME"));
		}
		
		session.close();
	}


	private void testFindRolePerson() {
		
	}
}
