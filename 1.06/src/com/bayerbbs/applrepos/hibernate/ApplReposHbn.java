package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.dto.ComplianceControlStatusDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;

public class ApplReposHbn {

	private static final String TRANSBASE_ORA_20000 = "ORA-20000: ";
	/** The logger. */
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

		if (null != cwid && !"".equals(cwid)) {

			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

			Connection conn = null;

			try {
				tx = session.beginTransaction();

				conn = session.connection();

				selectStmt = conn.createStatement();
				ResultSet rsMessage = selectStmt
						.executeQuery("select pck_sync_tools.FN_ITset('" + cwid
								+ "',null,null,null,null) from dual");

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
	
	public static List<ComplianceControlStatusDTO> getComplianceControlStatus(Long tableId, Long ciId) {
		
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

			boolean commit = false;
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			
			sql.append("select");
			sql.append(" rp.*");
			sql.append(" , ro.role_name");
			sql.append(" from role_person rp");
			sql.append(" join role ro on ro.role_id = rp.role_id");
			sql.append(" where rp.cwid = '").append(cwid.toUpperCase()).append("'");
			sql.append(" and rp.date_start <= current_date");
			sql.append(" and rp.date_end > current_date");
			sql.append(" and (ro.role_name like 'AIR%' or (ro.role_name = '").append(ApplreposConstants.ROLE_BUSINESS_ESSENTIAL_EDITOR).append("' and rp.zob_id=11397))");
			
			try {
				tx = session.beginTransaction();

				conn = session.connection();

				selectStmt = conn.createStatement();
				ResultSet rsSet = selectStmt
						.executeQuery(sql.toString());

				if (null != rsSet) {
					while (rsSet.next()) {
						RolePersonDTO dto = new RolePersonDTO();
						dto.setRoleId(rsSet.getLong("ROLE_ID"));
						dto.setCwid(rsSet.getString("CWID"));
						dto.setRoleName(rsSet.getString("ROLE_NAME"));
						listDTO.add(dto);
					}
				}
				commit = true;
				
			} catch (Exception e) {
				System.out.println(e.toString());
				try {
					System.out.println(conn.isClosed());
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				session.disconnect();
			}
			finally {
				HibernateUtil.close(tx, session, commit);
			}

			
		}

		return listDTO;
	}
	

	public static List<RolePersonDTO> findRolePersonBusinessEssentialEditor(String cwid) {
		
		ArrayList<RolePersonDTO> listDTO = new ArrayList<RolePersonDTO>();
		
		if (StringUtils.isNotNullOrEmpty(cwid)) {

			boolean commit = false;
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();

			Connection conn = null;

			StringBuffer sql = new StringBuffer();
			
			sql.append("select");
			sql.append(" rp.*");
			sql.append(" , ro.role_name");
			sql.append(" from role_person rp");
			sql.append(" join role ro on ro.role_id = rp.role_id");
			sql.append(" where rp.cwid = '").append(cwid.toUpperCase()).append("'");
			sql.append(" and rp.date_start <= current_date");
			sql.append(" and rp.date_end > current_date");
			sql.append(" and ro.role_name = '").append(ApplreposConstants.ROLE_BUSINESS_ESSENTIAL_EDITOR).append("'");
			
			try {
				tx = session.beginTransaction();

				conn = HibernateUtil.getSession().connection();

				selectStmt = conn.createStatement();
				ResultSet rsSet = selectStmt
						.executeQuery(sql.toString());

				if (null != rsSet) {
					while (rsSet.next()) {
						RolePersonDTO dto = new RolePersonDTO();
						dto.setRoleId(rsSet.getLong("ROLE_ID"));
						dto.setCwid(rsSet.getString("CWID"));
						dto.setRoleName(rsSet.getString("ROLE_NAME"));
						listDTO.add(dto);
					}
				}
				commit = true;
				
			} catch (Exception e) {
				//
			}
			finally {
				HibernateUtil.close(tx, session, commit);
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
		sql.append("select interfaces_id from interfaces where token = '").append(ApplreposConstants.APPLICATION_GUI_NAME).append("'");
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
	
}
