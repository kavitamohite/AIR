package com.bayerbbs.applrepos.hibernate;

import java.util.List;
import java.util.StringTokenizer;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.ApplicationApplication;

public class ApplicationApplicationHbn {


	public static ApplicationApplication findApplicationApplication(Long applicationHigherId, Long applicationLowerId) {
		ApplicationApplication result = null;
		List<ApplicationApplication> values = null;
		if (null != applicationHigherId && null != applicationLowerId) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				values = session.createQuery(
						"select h from ApplicationApplication as h where h.applicationHigherId = "
								+ applicationHigherId + 
								" and h.applicationLowerId = " + applicationLowerId +
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


	public static void saveApplicationApplication(String cwid, Long applicationHigherId, Long applicationLowerId, String value) {
		boolean update = true;
		cwid = cwid.toUpperCase();

		ApplicationApplication applicationApplication = findApplicationApplication(applicationHigherId, applicationLowerId);
		
		if (null == value || "".equals(value.trim()) || "DELETE".equals(value)) {
			// no input - try to delete the old entries

			if (null != applicationApplication && null == applicationApplication.getDeleteTimestamp()) {
				// set deletion information
				applicationApplication.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				applicationApplication.setDeleteUser(cwid);
				applicationApplication.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());
			}
		} else if (null != applicationApplication) {
			// update existing entry
			applicationApplication.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			applicationApplication.setUpdateUser(cwid.toUpperCase());
			applicationApplication.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
			if (null != applicationApplication.getDeleteTimestamp()) {
				// oh it is deleted, so reactivate it
				applicationApplication.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				applicationApplication.setInsertUser(cwid);
				applicationApplication.setInsertTimestamp(applicationApplication.getUpdateTimestamp());
				applicationApplication.setDeleteQuelle(null);
				applicationApplication.setDeleteUser(null);
				applicationApplication.setDeleteTimestamp(null);
			}
			applicationApplication.setApplicationHigherId(applicationHigherId);
			applicationApplication.setApplicationLowerId(applicationLowerId);
			
		} else {
			// application - insert values
			update = false;
			applicationApplication = new ApplicationApplication();
			applicationApplication.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			applicationApplication.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
			applicationApplication.setInsertUser(cwid);
			// --
			applicationApplication.setApplicationHigherId(applicationHigherId);
			applicationApplication.setApplicationLowerId(applicationLowerId);
		}

		if (null != applicationApplication) {
			Session session = HibernateUtil.getSession();
			Transaction tx = null;
			tx = session.beginTransaction();
			boolean toCommit = false;
			try {
				session.saveOrUpdate(applicationApplication);
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
	
	public static void saveApplicationApplicationAll(String cwid, Long applicationHigherId, Long applicationLowerId, String allApplicationId, String value) {
		if (null != cwid && null != allApplicationId) {
			 StringTokenizer strTk  = new StringTokenizer(allApplicationId, ",");
			 while (strTk.hasMoreTokens()) {
				 String temp = strTk.nextToken().toString();
				 Long tempApplicationId = Long.parseLong(temp);

				 // find out if temp is higher or lower
				 Long tempAppHigher = applicationHigherId;
				 Long tempAppLower  = applicationLowerId;

				 if (null == tempAppHigher) {
					 tempAppHigher = tempApplicationId;
				 }
				 else if (null == tempAppLower) {
					 tempAppLower = tempApplicationId;
				 }
				 
				 saveApplicationApplication(cwid, tempAppHigher, tempAppLower, value);
			 }
		}
	}
	
}
