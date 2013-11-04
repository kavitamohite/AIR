package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;

public class ItSecUserHbn {

	/**
	 * reads the last login
	 * @param cwid
	 * @return
	 */
	public static String findItSecUserLastLogon(String cwid) {

		String lastLogon = null;

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;
		
		StringBuffer sql = new StringBuffer();
		sql.append("select * from ITSEC_USER");
		sql.append(" where CWID = '").append(cwid.toUpperCase())
				.append("'");

		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rset = selectStmt.executeQuery(sql.toString());

			if (null != rset) {
				while (rset.next()) {
					// TODO Attribut korrigieren
					Timestamp timestamp = rset.getTimestamp("AIR_LAST_LOGON");
					
					if (null != timestamp) {
						// String DATE_FORMAT = "dd-MM-yyyy HH:mm";
						String DATE_FORMAT = "yyyy-MM-dd HH:mm";
						SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
						lastLogon =  sdf.format(timestamp);
					}
					else {
						lastLogon = "";
					}
				}
				commit = true;
			}
			
			if (null != rset) {
				rset.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
		} catch (Exception e) {
			//
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}
		
		return lastLogon;
	}


	public static void updateItSecUserLastLogon(String cwid) {

		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		String stampSQL = "UPDATE ITSEC_USER SET AIR_LAST_LOGON = ? where upper(cwid) = ?";
		try {
			PreparedStatement stmt = session.connection().prepareStatement(stampSQL);
			stmt.setTimestamp(1, ApplReposTS.getCurrentTimestamp());
			stmt.setString(2, cwid.toUpperCase());
			stmt.executeUpdate();
			stmt.close();
		} catch (Exception e) {
			// handle exception
			System.out.println(e.toString());
		}
		
		HibernateUtil.close(tx, session, true);
	}

	public static void updateItSecUserLastLogoff(String cwid) {

		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		tx = session.beginTransaction();
		String stampSQL = "UPDATE ITSEC_USER SET AIR_LAST_LOGOFF = ? where upper(cwid) = ?";
		try {
			PreparedStatement stmt = session.connection().prepareStatement(stampSQL);
			stmt.setTimestamp(1, ApplReposTS.getCurrentTimestamp());
			stmt.setString(2, cwid.toUpperCase());
			stmt.executeUpdate();
			stmt.close();
		} catch (Exception e) {
			// handle exception
			System.out.println(e.toString());
		}
		
		HibernateUtil.close(tx, session, true);
	}

}
