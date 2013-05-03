package com.bayerbbs.applrepos.hibernate;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.ComplianceControlStatusDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;

public class ApplReposHbn {

	private static final String SELECT_ROLES = "SELECT DISTINCT ROL.Role_Id, " +
					         "ROL.Role_Name " +
					         "FROM     ROLE ROL  " +
					         "INNER JOIN ROLE_PERSON R2P ON ROL.Role_Id=R2P.Role_Id AND Current_Date BETWEEN R2P.Date_Start AND R2P.Date_End AND R2P.Del_Timestamp IS NULL " + 
					         "INNER JOIN ROLE_INTERFACE R2I ON R2P.Role_Id=R2I.Role_Id AND R2I.Del_Timestamp IS NULL  " +
					         "INNER JOIN INTERFACES INT ON R2I.Interface_Id=INT.Interfaces_Id AND INT.Del_Timestamp IS NULL AND INT.Token = 'AIR' " +
								"WHERE    R2P.Cwid = :Cwid " +
								"AND      ROL.Del_Quelle IS NULL";
	private static final String SELECT_ROLE_BUSINESS_ESSENTIAL = "SELECT DISTINCT ROL.Role_Id, " +
															    "ROL.Role_Name " +
															    "FROM     ROLE ROL  " +
															    "INNER JOIN ROLE_PERSON R2P ON ROL.Role_Id=R2P.Role_Id AND Current_Date BETWEEN R2P.Date_Start AND R2P.Date_End AND R2P.Del_Timestamp IS NULL " + 
															    "INNER JOIN ROLE_INTERFACE R2I ON R2P.Role_Id=R2I.Role_Id AND R2I.Del_Timestamp IS NULL  " +
															    "INNER JOIN INTERFACES INT ON R2I.Interface_Id=INT.Interfaces_Id AND INT.Del_Timestamp IS NULL AND INT.Token = 'AIR' " +
																"WHERE    R2P.Cwid = :Cwid " +
																"AND      ROL.Role_Name = :Role_Name "+
																"AND      ROL.Del_Quelle IS NULL"; 

	private static final String TRANSBASE_ORA_20000 = "ORA-20000: ";
	private static final Log log = LogFactory.getLog(ApplReposHbn.class);

	
	/**
	 * finds the ItSet for a cwid,
	 * null if not found or no cwid
	 * 
	 * @param cwid
	 * @return
	 */
	public static String getItSetFromCwid(String cwid) {
		String resultItSet = null;

		if (null != cwid && cwid.length() > 0) {
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();
			Connection conn = null;

			try {
				tx = session.beginTransaction();
				conn = session.connection();

				selectStmt = conn.createStatement();
				ResultSet rsMessage = selectStmt
						.executeQuery("select pck_sync_tools.FN_ITset('" + cwid + "',null,null,null,null) from dual");

				if (null != rsMessage) {
					rsMessage.next();
					resultItSet = rsMessage.getString(1);
				}

				if (null != rsMessage) {
					rsMessage.close();
				}
				if (null != selectStmt) {
					selectStmt.close();
				}
				if (null != conn) {
					conn.close();
				}
				tx.commit();
			} catch (Exception e) {
				if (tx != null && tx.isActive()) {
					try {
						// Second try catch as the rollback could fail as well
						tx.rollback();
					} catch (HibernateException e1) {
						System.out.println("Error rolling back transaction");
					}
					// throw again the first exception
					// throw e;
				}
			}
		}
		
		return resultItSet;
	}



	public static String getCountFromGroupNameAndCwid(String groupname, String cwid) {
		String resultCount = null;

		if (null != cwid && !"".equals(cwid)) {
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			sql.append("select count(*) from v_person_groups where (upper(group_name) = '");
			sql.append(groupname.toUpperCase()).append("'");
			sql.append(" and upper(cwid)='").append(cwid.toUpperCase()).append("')");
			
			try {
				tx = session.beginTransaction();
				conn = session.connection();

				selectStmt = conn.createStatement();
				ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

				if (null != rsMessage) {
					rsMessage.next();
					resultCount = rsMessage.getString(1);
				}

				if (null != rsMessage) {
					rsMessage.close();
				}
				if (null != selectStmt) {
					selectStmt.close();
				}
				if (null != conn) {
					conn.close();
				}
				tx.commit();
			} catch (Exception e) {
				if (tx != null && tx.isActive()) {
					try {
						// Second try catch as the rollback could fail as well
						tx.rollback();
					} catch (HibernateException e1) {
						System.out.println("Error rolling back transaction");
					}
					// throw again the first exception
					// throw e;
				}
			}
		}
		return resultCount;
	}

	
	public static String getCountFromRoleNameAndCwid(String rolename, String cwid) {
		String resultCount = null;

		if (null != cwid && !"".equals(cwid)) {
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			sql.append("select count(*) from role_person rp join role rl on rp.role_id = rl.role_id and rl.role_name = '");
			sql.append(rolename).append("'");
			sql.append(" where upper(cwid)='").append(cwid.toUpperCase()).append("'");
			sql.append(" and rp.date_end >= SYSDATE");
			sql.append(" and rp.del_timestamp is null");
			
			
			try {
				tx = session.beginTransaction();
				conn = session.connection();

				selectStmt = conn.createStatement();
				ResultSet rsMessage = selectStmt
						.executeQuery(sql.toString());

				if (null != rsMessage) {
					rsMessage.next();
					resultCount = rsMessage.getString(1);
				}

				if (null != rsMessage) {
					rsMessage.close();
				}
				if (null != selectStmt) {
					selectStmt.close();
				}
				if (null != conn) {
					conn.close();
				}
				tx.commit();
			} catch (Exception e) {
				if (tx != null && tx.isActive()) {
					try {
						// Second try catch as the rollback could fail as well
						tx.rollback();
					} catch (HibernateException e1) {
						System.out.println("Error rolling back transaction");
					}
					// throw again the first exception
					// throw e;
				}

			}
		}
		return resultCount;
	}

	
	public static String getCountFromGPSCGroupCIOwnder(Long objectId, Long tableId, String cwid) {

		String resultCount = null;

		if (null != cwid && !"".equals(cwid)) {

			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

			Connection conn = null;

//			select * from ci_groups cigrp
//			left join group_types grptyp on cigrp.group_type_id = grptyp.group_type_id and grptyp.group_type_name = 'CI OWNER'
//			left join person_groups persgrp on cigrp.group_id = persgrp.group_id
//			where
//			    cigrp.del_timestamp is null
//			and cigrp.table_id=2
//			and cigrp.ci_id=4981
//			and grptyp.del_timestamp is null
//			and grptyp.group_type_name = 'CI OWNER'
//			and persgrp.del_timestamp is null
//			and persgrp.cwid = 'EVAFL';

			
			
			StringBuffer sql = new StringBuffer();
			
			sql.append("select count(*) from ci_groups cigrp");
			sql.append(" left join group_types grptyp on cigrp.group_type_id = grptyp.group_type_id and grptyp.group_type_name = 'CI OWNER'");
			sql.append(" left join person_groups persgrp on cigrp.group_id = persgrp.group_id");
			sql.append(" where");
			sql.append(" cigrp.del_timestamp is null");
			sql.append(" and cigrp.table_id=" + tableId);
			sql.append(" and cigrp.ci_id=" + objectId);
			sql.append(" and grptyp.del_timestamp is null");
			sql.append(" and grptyp.group_type_name = 'CI OWNER'");
			sql.append(" and persgrp.del_timestamp is null");
			sql.append(" and persgrp.cwid = '").append(cwid.toUpperCase()).append("'");

					
			
			try {
				tx = session.beginTransaction();

				conn = session.connection();

				selectStmt = conn.createStatement();
				ResultSet rsMessage = selectStmt
						.executeQuery(sql.toString());

				if (null != rsMessage) {
					rsMessage.next();
					resultCount = rsMessage.getString(1);
				}

				if (null != rsMessage) {
					rsMessage.close();
				}
				if (null != selectStmt) {
					selectStmt.close();
				}
				if (null != conn) {
					conn.close();
				}
				tx.commit();
			} catch (Exception e) {
				if (tx != null && tx.isActive()) {
					try {
						// Second try catch as the rollback could fail as well
						tx.rollback();
					} catch (HibernateException e1) {
						System.out.println("Error rolling back transaction");
					}
					// throw again the first exception
					// throw e;
				}

			}
		}
		return resultCount;
	}
	
	public static List<ComplianceControlStatusDTO> getComplianceControlStatus(Integer tableId, Long ciId) {
		
		ArrayList<ComplianceControlStatusDTO> listControl = new ArrayList<ComplianceControlStatusDTO>();
		
		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();
		
		sql.append("SELECT STW.Status_Wert_En AS \"Controledited\", TO_CHAR(COUNT(1), '999G999') AS \"Quantity\"," + 
"TO_CHAR(ROUND(RATIO_TO_REPORT(SUM(1)) OVER () * 100, 2), '990D00')||'%' AS \"Rate\" FROM (SELECT NVL(Status_Id, 5) AS Status_ID FROM ITSEC_MASSN_STATUS WHERE Ref_Table_Id IS NULL AND Ref_Pk_Id IS NULL CONNECT BY Tabelle_Id = PRIOR Ref_Table_Id AND Tabelle_Pk_Id = PRIOR Ref_Pk_Id AND Massnahme_Gstoolid = PRIOR Massnahme_Gstoolid START WITH Itsec_Massn_St_Id IN ((SELECT Itsec_Massn_St_Id FROM TABLE(pck_SISec.FT_Compliance(" + tableId + ", " + ciId + "))))) STA INNER JOIN ITSEC_MASSN_STWERT STW ON STA.Status_Id=STW.Itsec_Massn_Wertid GROUP BY STW.Itsec_Massn_Wertid, STW.Status_Wert_En ORDER BY STW.Itsec_Massn_Wertid");
		
		try {
			tx = session.beginTransaction();

			conn = HibernateUtil.getSession().connection();

			selectStmt = conn.createStatement();
			ResultSet rsSet = selectStmt
					.executeQuery(sql.toString());

			if (null != rsSet) {
				while (rsSet.next()) {
					ComplianceControlStatusDTO dto = new ComplianceControlStatusDTO();
					dto.setControlStatus(rsSet.getString("Controledited"));
					dto.setQuantity(rsSet.getLong("Quantity"));
					dto.setRate(rsSet.getString("Rate"));
					listControl.add(dto);
				}
			}
			commit = true;
			
		} catch (Exception e) {
			//
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listControl;
	}

	public static List<RolePersonDTO> findRolePerson(String cwid) {
		
		ArrayList<RolePersonDTO> listDTO = new ArrayList<RolePersonDTO>();
		
		if (StringUtils.isNotNullOrEmpty(cwid)) {

			Session session = HibernateUtil.getSession();

			try {
				
				@SuppressWarnings("unchecked")
				List<Object[]> listTemp = session.createSQLQuery(SELECT_ROLES)
					.setString("Cwid", cwid.toUpperCase())
					.list();
				
				for (Iterator<Object[]> iterator = listTemp.iterator(); iterator.hasNext();) 
				{
					Object obj[] = iterator.next();
					try 
					{
						RolePersonDTO dto = new RolePersonDTO();
						dto.setRoleId(((BigDecimal)obj[0]).longValue());
						dto.setCwid(cwid.toUpperCase());
						dto.setRoleName((String) obj[1]);
						listDTO.add(dto);
					} 
					catch (Exception e) 
					{
						System.out.println(e.toString());
					}
					
				}			
			} 
			catch (Exception e) 
			{
				System.out.println(e.toString());
			}
			finally 
			{
				session.flush();
			}
		}
		return listDTO;
	}
	

	public static List<RolePersonDTO> findRolePersonBusinessEssentialEditor(String cwid) {
		
		ArrayList<RolePersonDTO> listDTO = new ArrayList<RolePersonDTO>();
		
		if (StringUtils.isNotNullOrEmpty(cwid)) {

			Session session = HibernateUtil.getSession();

			try {
				
				@SuppressWarnings("unchecked")
				List<Object[]> listTemp = session.createSQLQuery(SELECT_ROLE_BUSINESS_ESSENTIAL)
					.setString("Cwid", cwid.toUpperCase())
					.setString("Role_Name", AirKonstanten.ROLE_BUSINESS_ESSENTIAL_EDITOR)
					.list();
				
				for (Iterator<Object[]> iterator = listTemp.iterator(); iterator.hasNext();) 
				{
					Object obj[] = iterator.next();
					try 
					{
						RolePersonDTO dto = new RolePersonDTO();
						dto.setRoleId(((BigDecimal)obj[0]).longValue());
						dto.setCwid(cwid.toUpperCase());
						dto.setRoleName((String) obj[1]);
						listDTO.add(dto);
					} 
					catch (Exception e) 
					{
						System.out.println(e.toString());
					}
					
				}			
			} 
			catch (Exception e) 
			{
				System.out.println(e.toString());
			}
			finally 
			{
				session.flush();
			}
		}
		return listDTO;
	}

	public static String getCountReferencingTemplates(Long applicationId) {
		StringBuffer sql = new StringBuffer();
		sql.append("select count(*) from anwendung where del_timestamp is null and ref_id = ").append(applicationId);
		return getCountInternal(sql.toString());
	}

	public static String getInterfaceIdFromApplication() {
		StringBuffer sql = new StringBuffer();
		sql.append("select interfaces_id from interfaces where token = '").append(AirKonstanten.APPLICATION_GUI_NAME).append("'");
		return getCountInternal(sql.toString());
	}
	
	protected static String getCountInternal(String sql) {

		String resultCount = null;

			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

			Connection conn = null;

			try {
				tx = session.beginTransaction();

				conn = session.connection();

				selectStmt = conn.createStatement();
				ResultSet rsMessage = selectStmt
						.executeQuery(sql);

				if (null != rsMessage) {
					rsMessage.next();
					resultCount = rsMessage.getString(1);
				}

				if (null != rsMessage) {
					rsMessage.close();
				}
				if (null != selectStmt) {
					selectStmt.close();
				}
				if (null != conn) {
					conn.close();
				}
				tx.commit();
			} catch (Exception e) {
				
				log.error(e.toString());
				
				if (tx != null && tx.isActive()) {
					try {
						// Second try catch as the rollback could fail as well
						tx.rollback();
					} catch (HibernateException e1) {
						System.out.println("Error rolling back transaction");
					}
					// throw again the first exception
					// throw e;
				}

			}

			return resultCount;
	}

	/**
	 * returns the database display (production, QA-system)
	 * @return
	 */
	public static String getDatabaseDisplayName() {
		StringBuffer sql = new StringBuffer();
		//TODO: Eigener Parameter für AIR
		sql.append("select v_value from parameter where label = 'SISnet.TEXT_DATABASE_DISPLAY'");
		return getCountInternal(sql.toString());
	}

	
	/**
	 * extracts the transbase error message
	 * @param message
	 * @return
	 */
	public static String getOracleTransbaseErrorMessage(String message) {
		
		String resultMessage = message;
		
		if (null != message) {
			int index = message.indexOf(TRANSBASE_ORA_20000);
			if (-1 != index) {
				resultMessage = message.substring(index + TRANSBASE_ORA_20000.length());
			}
		}

		return resultMessage;
	}
	
	public static void testmail() {
		sendMail("udo.hoffmann@bayer.com", "udo.hoffmann@bayer.com", "subject", "body", "AIR");
	}
	
	
	/**
	 * sends the email by calling an oracle function. 
	 * @param sendTo
	 * @param copyTo
	 * @param subject
	 * @param body
	 * @param source
	 */
	public static void sendMail(String sendTo, String copyTo, String subject, String body, String source) {
		
		if (null != sendTo) {
			
			if (null == copyTo) {
				copyTo = "";
			}
			
			StringBuffer sb = new StringBuffer();
			
			sb = new StringBuffer();
	
			sb.append("DECLARE S VARCHAR2(4000); ");
			
			sb.append("BEGIN");
			sb.append(" s:= pck_Mail.FV_CreateMail (");
	
			sb.append("'");
			sb.append(sendTo);
			sb.append("','");
			sb.append(copyTo);
			sb.append("','");
			sb.append(subject);
			sb.append("','");
			sb.append(body);
			sb.append("','");
			sb.append(source);
			sb.append("',");
			sb.append("'Y',");	// Y = immediate, N = Not immediate
			sb.append("'TEXT'");
			sb.append(");");
			sb.append(" END;");
	
			
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
	
			Connection conn = null;
			CallableStatement callableStmt = null;
	
			try {
				tx = session.beginTransaction();
	
				conn = session.connection();
	
				callableStmt = conn.prepareCall(sb.toString());
	
				callableStmt.execute();
	
				if (null != callableStmt) {
					callableStmt.close();
				}
				if (null != conn) {
					conn.close();
				}
				tx.commit();
			} catch (Exception e) {
				
				log.error(e.toString());
				
				if (tx != null && tx.isActive()) {
					try {
						// Second try catch as the rollback could fail as well
						tx.rollback();
					} catch (HibernateException e1) {
						System.out.println("Error rolling back transaction");
					}
					// throw again the first exception
					// throw e;
				}
			}
		}
	}
	
	public boolean hasRole(String cwid) {
		
		return false;
	}
}

