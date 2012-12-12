package com.bayerbbs.applrepos.hibernate;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.AnnotationConfiguration;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.bayerbbs.applrepos.domain.ApplicationCat2;
import com.bayerbbs.applrepos.dto.DwhEntityDTO;
import com.bayerbbs.applrepos.service.DwhEntityParameterOutput;

public class Test_PLSQL_Functions {
	Session session = null;

	@Before
	public void setUp() throws Exception {
		SessionFactory sf = new AnnotationConfiguration().configure().buildSessionFactory();//new File("src/hibernate.cfg.xml") nicht nötig
		session = sf.openSession();
	}
	
	@Test
	public void testGetDwhEntityRelations() throws HibernateException, SQLException {
		DwhEntityParameterOutput output = CiEntitiesHbn.getDwhEntityRelations(2L, 119504L, "UPSTREAM");
		
		System.out.println(output.getDwhEntityDTO().length);
	}
	
	@Test
	public void testP_save_relations() throws HibernateException, SQLException {
		Long tableId = 2L;
		Long ciId = 119504L;
		String ciRelationsAddList = "SPL-1371";//SPL-116266 SPL-114473 APP-136668
		String ciRelationsDeleteList = "";//APP-136664 APP-136668
		String direction = "UPSTREAM";//UPSTREAM DOWNSTREAM
		String cwid = "ERCVA";
		//exception test: ciRelationsAddList = "SPL-1371", direction = "DOWNSTREAM"
		
		//Stored procedure call
		String sql = "{call pck_air.p_save_relations(?,?,?,?,?,?)}";//"begin pck_air.p_save_relations(?,?,?,?,?,?); end;";//"EXEC pck_air.p_save_relations ("+tableId+", "+ciId+", "+ciRelationsAddList+", "+ciRelationsDeleteList+", "+direction+", "+cwid+")";
		
		Transaction ta = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;
		
		try {
			ta = session.beginTransaction();
			Connection conn = session.connection();
			
			CallableStatement stmt = conn.prepareCall(sql);
			stmt.setLong(1, tableId);
			stmt.setLong(2, ciId);
			stmt.setString(3, ciRelationsAddList);
			stmt.setString(4, ciRelationsDeleteList);
			stmt.setString(5, direction);
			stmt.setString(6, cwid);
			stmt.executeUpdate();
			ta.commit();
			
//			Object o = stmt.getObject(1);
//			System.out.println(o);
			
			stmt.close();
			conn.close();
			
			commit = true;
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
	}
	
	@Test
	public void ntestFT_History() throws HibernateException, SQLException {
		String ciId = "116219";
		StringBuilder sql = new StringBuilder("select * from table(pck_air.ft_history("+ciId+"))");
				
		PreparedStatement statement = session.connection().prepareStatement(sql.toString());
		ResultSet rs = statement.executeQuery();
		
		
		System.out.println("TABLE_ID\tCI_ID\t\tDATETIME\t\t\t\tSOURCE\tUSERNAME\tDBUSER\tCOLUMN_NAME\tOLD_VALUE\tNEW_VALUE\tTABLE_NAME");
		while(rs.next()) {
			System.out.println(rs.getString("TABLE_ID")+"\t\t"+rs.getString("CI_ID")+"\t\t"+rs.getString("DATETIME")+"\t\t"+rs.getString("SOURCE")+"\t"+rs.getString("USERNAME")+"\t\t"+rs.getString("DBUSER")+"\t"+rs.getString("COLUMN_NAME")+"\t"+rs.getString("OLD_VALUE")+"\t\t"+rs.getString("NEW_VALUE")+"\t\t"+rs.getString("TABLE_NAME"));
		}
	}
	
	@Test
	public void testFT_Findcis() throws HibernateException, SQLException {
		String ciType = "Application";
		String ciName = "test";//emea
		int start = 150;
		int limit = 50;
		
		String sql = "SELECT * FROM TABLE (pck_air.ft_findcis('" + ciName + "', '" + ciType + "'))";
		
		Transaction ta = null;
		Statement stmt = null;
		Connection conn = null;
		Session session = HibernateUtil.getSession();
		
		boolean commit = false;

		List<DwhEntityDTO> ciTypes = new ArrayList<DwhEntityDTO>();
		
		try {
			ta = session.beginTransaction();
			conn = session.connection();
			stmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);//prepareStatement(sql, | createStatement 
			ResultSet rs = stmt.executeQuery(sql);
			
//			System.out.println("testFT_Findcis FetchSize="+rs.getFetchSize());
			rs.absolute(start + 1);//absolute relative
			rs.setFetchSize(limit);
//			System.out.println("testFT_Findcis FetchSize="+rs.getFetchSize());
			
			DwhEntityDTO dwhEntity = null;
			int i = 0;
			
			while (rs.next()) {
				if(i == limit)
					break;
				
				if(i == 0)
					System.out.println(rs.getString("CI_ID"));
				
				dwhEntity = new DwhEntityDTO();
				
				dwhEntity.setCiId(rs.getString("CI_ID"));
				dwhEntity.setCiType(rs.getString("TYPE"));
				dwhEntity.setCiName(rs.getString("NAME"));
				dwhEntity.setCiAlias(rs.getString("ASSET_ID_OR_ALIAS"));
				dwhEntity.setTableId(rs.getString("TABLE_ID"));
				dwhEntity.setCiOwner(rs.getString("RESPONSIBLE"));
				dwhEntity.setCiOwnerDelegate(rs.getString("SUB_RESPONSIBLE"));
				dwhEntity.setAppOwner(rs.getString("APP_OWNER"));
				dwhEntity.setAppOwnerDelegate(rs.getString("APP_OWNER_DELEGATE"));
				dwhEntity.setAppSteward(rs.getString("APP_STEWARD"));
				dwhEntity.setCategoryIt(rs.getString("CATEGORY"));
				dwhEntity.setLifecycleStatus(rs.getString("LIFECYCLE"));
				dwhEntity.setSource(rs.getString("SOURCE"));
				dwhEntity.setTemplate(rs.getString("TEMPLATE"));

//				dwhEntity.setOperationalStatus(rs.getString("OPERATIONAL_STATUS"));
//				dwhEntity.setGxpRelevance(rs.getString("GXP_RELEVANCE"));
//				dwhEntity.setItSet(rs.getString("ITSET"));
//				dwhEntity.setServiceContract(rs.getString("SERVICE_CONTRACT"));
//				dwhEntity.setSeverityLevel(rs.getString("SEVERITY_LEVEL"));
//				dwhEntity.setPriorityLevel(rs.getString("PRIORITY_LEVEL"));
//				dwhEntity.setSla(rs.getString("SLA"));
//				dwhEntity.setBusinessEssential(rs.getString("BUSINESS_ESSENTIAL"));
				//evtl. mehr
				
				ciTypes.add(dwhEntity);
				i++;
			}
			
			rs.close();
			stmt.close();
			conn.close();
			
			commit = true;
			
			System.out.println("CiEntitesHbn::findByTypeAndName: ciTypes="+ciTypes.size());
		} catch (Exception e) {
			System.out.println(e.toString());
		} finally {
			HibernateUtil.close(ta, session, commit);
		}
	}
	
	@Test
	public void testDefault() { 
		/*List<ApplicationCat2> values = session.createQuery("select h from ApplicationCat2 as h where h.delTimestamp is null").list();
		for(ApplicationCat2 value : values)
			System.out.println(value.getAnwendungKat2Text() + " :: " + value.getDelTimestamp());
		
		System.out.println(values.size());*/
		
//		Float f1 = new Float(0.0001);
		float f1 = 0.0001f;
		
		System.out.println(new Float(String.format(Locale.ENGLISH, "%.2f", f1)));//Locale.getDefault()
		
		
		/*
//		Float f2 = new Float(0.0155);
		float f2 = 0.0155f;
		
		System.out.println(String.format(Locale.ENGLISH, "%.2g", f2));//%.2f %.2g%n Locale.getDefault()
		System.out.println(String.format(Locale.ENGLISH, "%.2f", f2));
		
		System.out.println(String.format("%.5g%n", 0.912385));
		System.out.println(new Float(String.format("%.1g%n", 0.0015)));*/
	}

	@After
	public void tearDown() throws Exception {
		session.close();
	}

}
