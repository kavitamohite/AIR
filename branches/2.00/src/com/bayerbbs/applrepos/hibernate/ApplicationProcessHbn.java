package com.bayerbbs.applrepos.hibernate;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.StringTokenizer;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.ApplicationProcess;

public class ApplicationProcessHbn {

	public static ApplicationProcess findApplicationProcess(Long applicationId, Long processId) {
		ApplicationProcess result = null;
		List<ApplicationProcess> values = null;
		if (null != applicationId && null != processId) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				values = session.createQuery(
						"select h from ApplicationProcess as h where h.applicationId = "
								+ applicationId + 
								" and h.processId = " + processId +
								" order by h.deleteQuelle desc").list();

				if (!values.isEmpty()) {
					result = values.get(0);
				}
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}
		}
		return result;
	}

	
	private static void stampApplicationProcess(Long applicationId, String cwid) {
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();
		String stampSQL = "UPDATE application_process SET last_sync_source = ?, syncing = ? WHERE application_id = ? AND del_timestamp IS NULL";
		try {
			PreparedStatement stmt = session.connection().prepareStatement(stampSQL);
			stmt.setString(1, AirKonstanten.APPLICATION_GUI_NAME);
			stmt.setString(2, AirKonstanten.APPLICATION_GUI_NAME + '_' + cwid);
			stmt.setLong(3, applicationId);
			stmt.executeUpdate();
		} catch (Exception e) {
			// handle exception
			System.out.println(e.toString());
		}
		HibernateUtil.close(tx, session, true);

	}
	
	private static void purgeApplicationProcess(Long applicationId, String cwid) {
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();
		String stampSQL = "UPDATE application_process SET del_timestamp=sysdate, del_quelle = ?, del_user=?, syncing = NULL "
				+ "WHERE application_id = ? AND del_timestamp IS NULL AND syncing=?";
		try {
			PreparedStatement stmt = session.connection().prepareStatement(stampSQL);
			stmt.setString(1, AirKonstanten.APPLICATION_GUI_NAME);
			stmt.setString(2, cwid);
			stmt.setLong(3, applicationId);
			stmt.setString(4, AirKonstanten.APPLICATION_GUI_NAME + "_" + cwid);
			stmt.executeUpdate();
			
		} catch (Exception e) {
			// handle exception
			System.out.println(e.toString());
		}
		HibernateUtil.close(tx, session, true);
	}
	
	/**
	 * save application process all
	 * @param cwid
	 * @param applicationId
	 * @param allProcessId
	 */
	public static void saveApplicationProcessAll(String cwid, Long applicationId, String allProcessId) {
		cwid = cwid.toUpperCase();
		stampApplicationProcess(applicationId, cwid);
		if (null != cwid && null != applicationId && null != allProcessId) {
			 StringTokenizer strTk  = new StringTokenizer(allProcessId, ",");
			 while (strTk.hasMoreTokens()) {
				 String temp = strTk.nextToken().toString();
				 Long processId = Long.parseLong(temp);
				 saveApplicationProcess(cwid, applicationId, processId);
			 }
		}
		purgeApplicationProcess(applicationId, cwid);
		
	}
	
	
	/**
	 * save one application process
	 * @param cwid
	 * @param applicationId
	 * @param processId
	 */
	public static void saveApplicationProcess(String cwid, Long applicationId, Long processId) {

		cwid = cwid.toUpperCase();

		ApplicationProcess applicationProcess = findApplicationProcess(applicationId, processId);

		
		if (null != applicationProcess) {
			// update existing entry / or reactivate it
			
			if (null != applicationProcess.getDeleteTimestamp()) {
				applicationProcess.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				applicationProcess.setUpdateUser(cwid.toUpperCase());
				applicationProcess.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
				// oh it is deleted, so reactivate it
				applicationProcess.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				applicationProcess.setInsertUser(cwid);
				applicationProcess.setInsertTimestamp(applicationProcess.getUpdateTimestamp());
				applicationProcess.setDeleteQuelle(null);
				applicationProcess.setDeleteUser(null);
				applicationProcess.setDeleteTimestamp(null);
			}
			applicationProcess.setSyncing(null);
		} else {
			// application process - insert values
			applicationProcess = new ApplicationProcess();
			applicationProcess.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			applicationProcess.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
			applicationProcess.setInsertUser(cwid);
			// --
			applicationProcess.setApplicationId(applicationId);
			applicationProcess.setProcessId(processId);
		}

		if (null != applicationProcess) {
			Session session = HibernateUtil.getSession();
			Transaction tx = null;
			tx = session.beginTransaction();
			boolean toCommit = false;
			try {
				session.saveOrUpdate(applicationProcess);
				session.flush();
				toCommit = true;
			} catch (Exception e) {
				// handle exception
				System.out.println(e.toString());
				// output.setResult(ApplreposConstants.RESULT_ERROR);
				// output.setMessages(new String[] { e.getMessage() });
			} finally {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (toCommit) {
					if (null == hbnMessage) {
						// output
						// .setResult(ApplreposConstants.RESULT_OK);
						// output.setMessages(new String[] { "" });
					} else {
						// output
						// .setResult(ApplreposConstants.RESULT_ERROR);
						// output
						// .setMessages(new String[] { hbnMessage });
					}
				}
			}
		}

	}

}
