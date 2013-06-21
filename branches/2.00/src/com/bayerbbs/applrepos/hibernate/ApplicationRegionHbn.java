package com.bayerbbs.applrepos.hibernate;

import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.ApplicationRegion;
import com.bayerbbs.applrepos.dto.ItSetDTO;

public class ApplicationRegionHbn {

	
	public static List<ApplicationRegion> findCurrentApplicationRegion(Long applicationId) {
		List<ApplicationRegion> values = null;
		if (null != applicationId) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				values = session.createQuery(
						"select h from ApplicationRegion as h where h.deleteTimestamp is null and  h.applicationId = "
								+ applicationId + 
								" order by h.regionId").list();

				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}
		}
		return values;
	}

	public static List<ApplicationRegion> findApplicationRegion(Long applicationId) {
		List<ApplicationRegion> values = null;
		if (null != applicationId) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				values = session.createQuery(
						"select h from ApplicationRegion as h where h.applicationId = "
								+ applicationId + 
								" order by h.regionId, h.deleteQuelle").list();

				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}
		}
		return values;
	}

	
	public static ApplicationRegion findApplicationRegion(Long applicationId, Long regionId) {
		ApplicationRegion result = null;
		List<ApplicationRegion> values = null;
		if (null != applicationId) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				values = session.createQuery(
						"select h from ApplicationRegion as h where h.applicationId = "
								+ applicationId + 
								" and h.regionId = " + regionId +
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

	
	public static void saveApplicationRegionsAll(String cwid, Long applicationId, String licenseUsingRegions) {
		
		List<ItSetDTO> listPossibleItSets = ItSetHbn.listItSet();
		
		List<ApplicationRegion> listApplicationRegions = findApplicationRegion(applicationId);
		
		Iterator<ItSetDTO> itPossible = listPossibleItSets.iterator();
		while (itPossible.hasNext()) {
			ItSetDTO itSet = itPossible.next();
			String newValue = null;
			
			if (null != licenseUsingRegions && licenseUsingRegions.contains(  ""+itSet.getId())) {
				newValue = "Y";
			}
			else {
				newValue = "";	// empty for deletion
			}
			
			
			boolean found = false;

			Iterator<ApplicationRegion> itRegions = listApplicationRegions.iterator();
			while (itRegions.hasNext()) {
				ApplicationRegion appRegion = itRegions.next();
 				if (appRegion.getId().longValue() == itSet.getId().longValue()) {
 					found = true;
 					ApplicationRegionHbn.saveApplicationRegion(cwid, applicationId, appRegion.getId(), newValue);
 				}
			}
			
			if (!found) {
				// insert the value
				ApplicationRegionHbn.saveApplicationRegion(cwid, applicationId, itSet.getId(), newValue);
			}
			
		}
		
		
		
	}
	
	
	public static void saveApplicationRegion(String cwid, Long applicationId, Long regionId, String value) {
//		boolean update = true;
		cwid = cwid.toUpperCase();

		ApplicationRegion applicationRegion = findApplicationRegion(applicationId, regionId);
		
		if (null == value || "".equals(value.trim())) {
			// no input - try to delete the old entries

			if (null != applicationRegion && null == applicationRegion.getDeleteTimestamp()) {
				// set deletion information
				applicationRegion.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				applicationRegion.setDeleteUser(cwid);
				applicationRegion.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());
			}
		} else if (null != applicationRegion) {
			// update existing entry
			applicationRegion.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			applicationRegion.setUpdateUser(cwid.toUpperCase());
			applicationRegion.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
			if (null != applicationRegion.getDeleteTimestamp()) {
				// oh it is deleted, so reactivate it
				applicationRegion.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				applicationRegion.setInsertUser(cwid);
				applicationRegion.setInsertTimestamp(applicationRegion.getUpdateTimestamp());
				applicationRegion.setDeleteQuelle(null);
				applicationRegion.setDeleteUser(null);
				applicationRegion.setDeleteTimestamp(null);
			}
		} else {
			// application - insert values
//			update = false;
			applicationRegion = new ApplicationRegion();
			applicationRegion.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			applicationRegion.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
			applicationRegion.setInsertUser(cwid);
			// --
			applicationRegion.setApplicationId(applicationId);
			applicationRegion.setRegionId(regionId);
		}

		if (null != applicationRegion) {
			Session session = HibernateUtil.getSession();
			Transaction tx = null;
			tx = session.beginTransaction();
			boolean toCommit = false;
			
			try {
				session.saveOrUpdate(applicationRegion);
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