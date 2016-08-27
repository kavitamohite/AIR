package com.bayerbbs.applrepos.hibernate;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiSupportStuff;
import com.bayerbbs.applrepos.dto.CiSupportStuffDTO;

public class CiSupportStuffHbn {

	public static CiSupportStuffDTO findCiSupportStuffByTableAndCiAndTypeId(
			Integer tableId, Long ciId, Long ciSupportStuffTypeId) {

		CiSupportStuffDTO result = new CiSupportStuffDTO();

		if (null != tableId && null != ciId && null != ciSupportStuffTypeId) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				@SuppressWarnings("unchecked")
				List<CiSupportStuff> values = session.createQuery(
						"select h from CiSupportStuff as h where h.tableId = "
								+ tableId + " and h.ciId = " + ciId
								+ " and h.ciSupportStuffTypeId="
								+ ciSupportStuffTypeId
								+ " and h.deleteTimestamp is null order by h.ciSupportStuffId").list();

				if (null != values && 0 < values.size()) {
					CiSupportStuff myValue = values.get(0);

					result.setCiSupportStuffId(myValue.getCiSupportStuffId());
					result.setCiSupportStuffTypeId(myValue.getCiSupportStuffTypeId());
					result.setTableId(myValue.getTableId());
					result.setCiId(myValue.getCiId());
					result.setCiSupportStuffValue(myValue
							.getCiSupportStuffValue());

				}

				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}
		}

		return result;
	}

	public static CiSupportStuff findCiSupportStuffAll(Integer tableId, Long ciId, Long ciSupportStuffTypeId) {
		CiSupportStuff result = null;
		
		if (null != tableId && null != ciId && null != ciSupportStuffTypeId) {
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			
			try {
				tx = session.beginTransaction();
				@SuppressWarnings("unchecked")
				List<CiSupportStuff> values = session.createQuery(
						"select h from CiSupportStuff as h where h.tableId = "
								+ tableId + " and h.ciId = " + ciId
								+ " and h.ciSupportStuffTypeId="
								+ ciSupportStuffTypeId + " order by h.deleteQuelle desc, h.ciSupportStuffId").list();

				if (null != values && 0 < values.size()) {
					result = values.get(0);
				}

				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}
		}
		return result;
	}

	/**
	 * saves all ci support stuff data
	 * @param cwid
	 * @param ciId
	 * @param userAuthorizationSupportedByDocumentation
	 * @param userAuthorizationProcess
	 * @param changeManagementSupportedByTool
	 * @param userManagementProcess
	 * @param applicationDocumentation
	 * @param rootDirectory
	 * @param dataDirectory
	 * @param providedServices
	 * @param providedMachineUsers
	 */
	public static void saveCiSupportStuffAll(String cwid, Long ciId,
			String userAuthorizationSupportedByDocumentation, String userAuthorizationProcess, String changeManagementSupportedByTool, String userManagementProcess, String applicationDocumentation, String rootDirectory, String dataDirectory, String providedServices, String providedMachineUsers) {

		saveSupportStuff(cwid, AirKonstanten.TABLE_ID_APPLICATION,
				ciId, AirKonstanten.CI_SUPPORT_STUFF_TYPE_UserAuthorizationSupportedByDocumentation, userAuthorizationSupportedByDocumentation);
		saveSupportStuff(cwid, AirKonstanten.TABLE_ID_APPLICATION,
				ciId, AirKonstanten.CI_SUPPORT_STUFF_TYPE_UserAuthorizationProcess, userAuthorizationProcess);
		saveSupportStuff(cwid, AirKonstanten.TABLE_ID_APPLICATION,
				ciId, AirKonstanten.CI_SUPPORT_STUFF_TYPE_ChangeManagementSupportedByTool, changeManagementSupportedByTool);
		saveSupportStuff(cwid, AirKonstanten.TABLE_ID_APPLICATION,
				ciId, AirKonstanten.CI_SUPPORT_STUFF_TYPE_UserManagementProcess, userManagementProcess);
		saveSupportStuff(cwid, AirKonstanten.TABLE_ID_APPLICATION,
				ciId, AirKonstanten.CI_SUPPORT_STUFF_TYPE_ApplicationDocumentation, applicationDocumentation);
		saveSupportStuff(cwid, AirKonstanten.TABLE_ID_APPLICATION,
				ciId, AirKonstanten.CI_SUPPORT_STUFF_TYPE_RootDirectory, rootDirectory);
		saveSupportStuff(cwid, AirKonstanten.TABLE_ID_APPLICATION,
				ciId, AirKonstanten.CI_SUPPORT_STUFF_TYPE_DataDirectory, dataDirectory);
		saveSupportStuff(cwid, AirKonstanten.TABLE_ID_APPLICATION,
				ciId, AirKonstanten.CI_SUPPORT_STUFF_TYPE_ProvidedServices, providedServices);
		saveSupportStuff(cwid, AirKonstanten.TABLE_ID_APPLICATION,
				ciId, AirKonstanten.CI_SUPPORT_STUFF_TYPE_ProvidedMachineUsers, providedMachineUsers);
	}

	public static void saveSupportStuff(String cwid, int tableId, Long ciId, Long supportStuffTypeId, String value) {

//		boolean update = true;
		
		cwid = cwid.toUpperCase();

		CiSupportStuff supportStuff = findCiSupportStuffAll(tableId, ciId,
				supportStuffTypeId);

		if (null == value || "".equals(value.trim())) {
			// no input - try to delete the old entries

			if (null != supportStuff
					&& null == supportStuff.getDeleteTimestamp()) {
				// set deletion information
				supportStuff
						.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				supportStuff.setDeleteUser(cwid);
				supportStuff.setDeleteTimestamp(ApplReposTS
						.getDeletionTimestamp());
			}
		} else if (null != supportStuff) {
			// update existing entry
			supportStuff.setCiSupportStuffValue(value);
			supportStuff
					.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			supportStuff.setUpdateUser(cwid.toUpperCase());
			supportStuff.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
			if (null != supportStuff.getDeleteTimestamp()) {
				// oh it is deleted, so reactivate it
				supportStuff
						.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
				supportStuff.setInsertUser(cwid);
				supportStuff.setInsertTimestamp(supportStuff
						.getUpdateTimestamp());
				supportStuff.setDeleteQuelle(null);
				supportStuff.setDeleteUser(null);
				supportStuff.setDeleteTimestamp(null);
			}
		} else {
			// application - insert values
//			update = false;
			supportStuff = new CiSupportStuff();
			supportStuff
					.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			supportStuff.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
			supportStuff.setInsertUser(cwid);
			// --
			supportStuff.setTableId(tableId);
			supportStuff.setCiId(ciId);
			supportStuff.setCiSupportStuffTypeId(supportStuffTypeId);
			supportStuff.setCiSupportStuffValue(value);
		}

		if (null != supportStuff) {
			Session session = HibernateUtil.getSession();
			Transaction tx = null;
			tx = session.beginTransaction();
			boolean toCommit = false;
			try {
				session.saveOrUpdate(supportStuff);
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
