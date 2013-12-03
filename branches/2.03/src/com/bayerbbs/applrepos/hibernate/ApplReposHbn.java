package com.bayerbbs.applrepos.hibernate;

import java.math.BigDecimal;
import java.net.InetAddress;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.dto.ComplianceControlStatusDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;

public class ApplReposHbn {

	private static final String SELECT_ROLES = "SELECT DISTINCT ROL.Role_Id, " +
					         "ROL.Role_Name " +
					         "FROM     ROLE ROL  " +
					         "INNER JOIN ROLE_PERSON R2P ON ROL.Role_Id=R2P.Role_Id AND SYSDATE BETWEEN R2P.Date_Start AND R2P.Date_End AND R2P.Del_Quelle IS NULL " + 
					         "INNER JOIN ROLE_INTERFACE R2I ON R2P.Role_Id=R2I.Role_Id AND R2I.Del_Quelle IS NULL  " +
					         "INNER JOIN INTERFACES INT ON R2I.Interface_Id=INT.Interfaces_Id AND INT.Del_Quelle IS NULL AND INT.Token = 'AIR' " +
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
//			Connection conn = null;

			try {
				tx = session.beginTransaction();
				@SuppressWarnings("deprecation")
				Connection conn = session.connection();

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

//			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			/* DO NOT use V_PERSON_GROUPS because of performance reasons */ 
			sql.append(" select count(*) FROM person p");
			sql.append(" JOIN person_groups pg ON p.cwid = pg.cwid AND pg.del_quelle IS NULL");
			sql.append(" JOIN groups g ON pg.group_id = g.group_id AND g.del_quelle IS NULL AND upper(g.group_name) = '").append(cwid.toUpperCase()).append("'");
			sql.append(" WHERE p.del_quelle IS NULL AND p.cwid = '").append(cwid.toUpperCase()).append("'");

			try {
				tx = session.beginTransaction();
				@SuppressWarnings("deprecation")
				Connection conn = session.connection();

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

//			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			sql.append("select count(*) from role_person rp join role rl on rp.role_id = rl.role_id and rl.role_name = '");
			sql.append(rolename).append("'");
			sql.append(" where upper(cwid)='").append(cwid.toUpperCase()).append("'");
			sql.append(" and rp.date_end >= SYSDATE");
			sql.append(" and rp.del_timestamp is null");
			
			
			try {
				tx = session.beginTransaction();
				@SuppressWarnings("deprecation")
				Connection conn = session.connection();

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

//			Connection conn = null;

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

				@SuppressWarnings("deprecation")
				Connection conn = session.connection();

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

//		Connection conn = null;

		StringBuffer sql = new StringBuffer();
		
		sql.append("SELECT STW.Status_Wert_En AS \"Controledited\", TO_CHAR(COUNT(1), '999G999') AS \"Quantity\"," + 
"TO_CHAR(ROUND(RATIO_TO_REPORT(SUM(1)) OVER () * 100, 2), '990D00')||'%' AS \"Rate\" FROM (SELECT NVL(Status_Id, 5) AS Status_ID FROM ITSEC_MASSN_STATUS WHERE Ref_Table_Id IS NULL AND Ref_Pk_Id IS NULL CONNECT BY Tabelle_Id = PRIOR Ref_Table_Id AND Tabelle_Pk_Id = PRIOR Ref_Pk_Id AND Massnahme_Gstoolid = PRIOR Massnahme_Gstoolid START WITH Itsec_Massn_St_Id IN ((SELECT Itsec_Massn_St_Id FROM TABLE(pck_SISec.FT_Compliance(" + tableId + ", " + ciId + "))))) STA INNER JOIN ITSEC_MASSN_STWERT STW ON STA.Status_Id=STW.Itsec_Massn_Wertid GROUP BY STW.Itsec_Massn_Wertid, STW.Status_Wert_En ORDER BY STW.Itsec_Massn_Wertid");
		
		try {
			tx = session.beginTransaction();

			@SuppressWarnings("deprecation")
			Connection conn = HibernateUtil.getSession().connection();

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

	@SuppressWarnings("deprecation")
	public static List<RolePersonDTO> findRolePerson(String cwid) {
		
		ArrayList<RolePersonDTO> listDTO = new ArrayList<RolePersonDTO>();
		
		if (StringUtils.isNotNullOrEmpty(cwid)) {

			Session session = HibernateUtil.getSession();
			PreparedStatement stmt = null;

			try {
				stmt = session.connection().prepareStatement(SELECT_ROLES);
				stmt.setString(1, cwid.toUpperCase());
				
				ResultSet rs = stmt.executeQuery();
				while(rs.next()) {
					RolePersonDTO dto = new RolePersonDTO();
					dto.setRoleId(rs.getLong(1));
					dto.setCwid(cwid.toUpperCase());
					dto.setRoleName(rs.getString(2));
					listDTO.add(dto);
				}
				
				/*
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
					
				}*/
			} 
			catch (Exception e) 
			{
				System.out.println(e.toString());
			}
			finally 
			{
				try {
					stmt.close();
				} catch (SQLException e) {}
				
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

//			Connection conn = null;

			try {
				tx = session.beginTransaction();

				@SuppressWarnings("deprecation")
				Connection conn = session.connection();

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
	 * construct the email for be-changed notification and send it
	 * @param cwid
	 * @param ciType
	 * @param name
	 * @param alias
	 * @param businessEssentialId
	 * @param businessEssentialIdOld
	 */
	public static void sendBusinessEssentialChangedMail(String cwid, String ciType, String name, String alias, Long businessEssentialId, Long businessEssentialIdOld, Integer tableId, Long ciId) {
		String businessEssentialNew = null;
		String businessEssentialOld = null;

		String sendTo = null;
		PersonsDTO personDTO = null;
		
		// Person for email and name
		if (null != cwid) {
			List<PersonsDTO> listPersonsDTO = PersonsHbn.findPersonByCWID(cwid);
			if (1 == listPersonsDTO.size()) {
				personDTO = listPersonsDTO.get(0);
				sendTo = personDTO.getMail();
			}
		}
		
		// business essential for new/old values
		List<BusinessEssentialDTO> listBE = BusinessEssentialHbn.listBusinessEssentialHbn();
		Iterator<BusinessEssentialDTO> itBE = listBE.iterator();
		while (itBE.hasNext()) {
			BusinessEssentialDTO be = itBE.next();
			if (be.getSeverityLevelId().longValue() == businessEssentialId.longValue()) {
				businessEssentialNew = be.getSeverityLevel();
			}
			if (be.getSeverityLevelId().longValue() == businessEssentialIdOld.longValue()) {
				businessEssentialOld = be.getSeverityLevel();
			}
		}
		if (null == businessEssentialNew) {
			businessEssentialNew = "---";
		}
		if (null == businessEssentialOld) {
			businessEssentialOld = "---";
		}
		
		if (null == alias || "".equals(alias)) {
			alias = "no alias";
		}
		
		if (null != sendTo) {
			String linkTo = "";
			try  {
				if (InetAddress.getLocalHost().getHostName() == AirKonstanten.PRODUCTIONSERVER) {
					linkTo = AirKonstanten.PRODUCTIONURL;
				} else {
					linkTo = AirKonstanten.QAURL;
				}
			}
			catch (Exception e) {
				log.error(e.toString());
			}
			
			StringBuffer sql = new StringBuffer();
			sql.append("SELECT c_eye_id_prefix FROM transbase_object WHERE transbase_object_id = ").append(tableId.toString());
			String ciLinkId = getCountInternal(sql.toString()) + "-" + ciId.toString();
			
			String copyTo = "itilcenter@bayer.com";
			
			StringBuffer sbSubject = new StringBuffer();
			sbSubject.append(ciType);
			sbSubject.append(" ");
			sbSubject.append("\"");
			sbSubject.append(name);
			sbSubject.append("\"");
			sbSubject.append(" (").append(alias).append(")");
			sbSubject.append(" now ");
			sbSubject.append("\"");
			sbSubject.append(businessEssentialNew);
			sbSubject.append("\"");

			StringBuffer sb = new StringBuffer();
			sb.append("Dear ").append(personDTO.getFirstname()).append(" ").append(personDTO.getLastname()).append(",\r\n\r\n");
			sb.append("within Application Infrastructure Repository AIR your ");
			sb.append(ciType);
			
			sb.append(" \"");
			sb.append(name);
			sb.append("\"");
			sb.append(" (").append(alias).append(")");
			

			
			sb.append(" was set from \"").append(businessEssentialOld).append("\" to \"").append(businessEssentialNew).append("\"\r\n\r\n");
			sb.append("Link to \"");
			sb.append(name);
			sb.append("\" ");
			sb.append(linkTo);
			sb.append("?id=");
			sb.append(ciLinkId);
			sb.append("\r\n\r\n");
			sb.append("If you have questions about this please contact ITILcenter@bayer.com.\r\n\r\n");
			sb.append("Best Regards\r\n");
			sb.append("ITILcenter Administration");
			ApplReposHbn.sendMail(sendTo, copyTo, sbSubject.toString(), sb.toString(), AirKonstanten.APPLICATION_GUI_NAME);
		}
		
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
			
			sb.append("DECLARE s VARCHAR2(4000); ");
			
			sb.append("BEGIN");
			sb.append(" s := pck_Mail.FV_CreateMail(:sendTo, :copyTo, :subject, :body, :source, 'Y', 'TEXT'); ");	
			sb.append("END;");	
			
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
	
//			Connection conn = null;
			CallableStatement callableStmt = null;
	
			try {
				tx = session.beginTransaction();
	
				@SuppressWarnings("deprecation")
				Connection conn = session.connection();
	
				callableStmt = conn.prepareCall(sb.toString());
				callableStmt.setString(1, sendTo);
				callableStmt.setString(2, copyTo);
				callableStmt.setString(3, subject);
				callableStmt.setString(4, body);
				callableStmt.setString(5, source);
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

