package com.bayerbbs.applrepos.hibernate;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiPersons;
import com.bayerbbs.applrepos.dto.CiPersonsDTO;

public class CiPersonsHbn {

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<CiPersonsDTO> getDTOList(List<CiPersons> input) {
		ArrayList<CiPersonsDTO> listDTO = new ArrayList<CiPersonsDTO>();

		for (Iterator<CiPersons> iter = input.iterator(); iter.hasNext();) {
			CiPersons data = iter.next();
			CiPersonsDTO dto = new CiPersonsDTO();

			dto.setCiPersonsId(data.getCiPersonsId());
			dto.setCiId(data.getCiId());
			dto.setCwid(data.getCwid());
			dto.setGroupTypeId(data.getGroupTypeId());
			dto.setTableId(data.getTableId());

			listDTO.add(dto);
		}
		return listDTO;
	}

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static CiPersonsDTO[] getArrayFromList(List<CiPersonsDTO> input) {
		CiPersonsDTO output[] = new CiPersonsDTO[input.size()];
		int i = 0;
		for (final CiPersonsDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	/**
	 * @deprecated Eine Selektion aus CI_PERSON ohne Angabe der TABLE_ID ist sinnlos
	 *
	 */
	@Deprecated
	public static List<CiPersonsDTO> findCiPersonsBy(Long ciId, Long groupTypeId) {

		List<CiPersonsDTO> listResult = new ArrayList<CiPersonsDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<CiPersons> values = session.createQuery(
					"select h from CiPersons as h where h.deleteTimestamp is null and h.ciId = " + ciId
							+ " and h.groupTypeId = " + groupTypeId).list();

			listResult = getDTOList(values);

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			HibernateUtil.close(tx, session, false);
		}

		return listResult;
	}

	public static List<CiPersons> findCiPersons(Long tableId, Long ciId, Long groupTypeId) {
		// TODO: Use Prepared Statement
		List<CiPersons> result = null;

		StringBuffer sb = new StringBuffer();
		sb.append("select h from CiPersons as h where");
		sb.append(" h.tableId = ").append(tableId);
		sb.append(" and h.ciId = ").append(ciId);
		sb.append(" and h.groupTypeId = ").append(groupTypeId);
		sb.append(" and h.deleteTimestamp is null");

		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();

			@SuppressWarnings("unchecked")
			List<CiPersons> values = session.createQuery(sb.toString()).list();
			result = values;

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			System.out.println(e.toString());
			HibernateUtil.close(tx, session, false);
		}

		return result;
	}

//	private static List<CiPersons> findStampedCiPersons(Long tableId, Long ciId, Long groupTypeId, String cwid) {
//		// TODO Use Prepared Statement
//		List<CiPersons> result = null;
//
//		StringBuffer sb = new StringBuffer();
//		sb.append("select h from CiPersons as h where");
//		sb.append(" h.tableId = ").append(tableId);
//		sb.append(" and h.ciId = ").append(ciId);
//		sb.append(" and h.groupTypeId = ").append(groupTypeId);
//		sb.append(" and h.deleteTimestamp is null");
//		sb.append(" and h.syncing = '"+AirKonstanten.APPLICATION_GUI_NAME + '_' + cwid+"'");
//
//
//		Transaction tx = null;
//		Session session = HibernateUtil.getSession();
//		try {
//			tx = session.beginTransaction();
//
//			List<CiPersons> values = session.createQuery(sb.toString()).list();
//			result = values;
//
//			HibernateUtil.close(tx, session, true);
//		} catch (RuntimeException e) {
//			System.out.println(e.toString());
//			HibernateUtil.close(tx, session, false);
//		}
//
//		return result;
//	}

	private static void stampCiPersons(Integer tableId, Long ciId, Long groupTypeId, String cwid, Session session) {
		String stampSQL = "UPDATE ci_persons SET last_sync_source = ?, syncing = ? WHERE table_id = ? AND ci_id = ? AND group_type_id = ? AND del_timestamp IS NULL";
		try {
			@SuppressWarnings("deprecation")
			PreparedStatement stmt = session.connection().prepareStatement(stampSQL);
			stmt.setString(1, AirKonstanten.APPLICATION_GUI_NAME);
			stmt.setString(2, AirKonstanten.APPLICATION_GUI_NAME + '_' + cwid);
			stmt.setLong(3, tableId);
			stmt.setLong(4, ciId);
			stmt.setLong(5, groupTypeId);
			stmt.executeUpdate();
			
		} catch (Exception e) {
			// handle exception
			System.out.println(e.toString());
		}

	}
	
	private static void purgeCiPersons(Integer tableId, Long ciId, Long groupTypeId, String cwid, Session session) {
		String stampSQL = "UPDATE ci_persons SET del_timestamp=DECODE(TO_CHAR(SYSDATE, 'mmdd'), '0229', (SYSTIMESTAMP-1), SYSTIMESTAMP) + INTERVAL '10' YEAR, del_quelle = ?, del_user=?, syncing = NULL "
				+ "WHERE table_id = ? AND ci_id = ? AND group_type_id = ? AND del_timestamp IS NULL AND syncing=?";
		try {
			@SuppressWarnings("deprecation")
			PreparedStatement stmt = session.connection().prepareStatement(stampSQL);
			stmt.setString(1, AirKonstanten.APPLICATION_GUI_NAME);
			stmt.setString(2, cwid);
			stmt.setLong(3, tableId);
			stmt.setLong(4, ciId);
			stmt.setLong(5, groupTypeId);
			stmt.setString(6, AirKonstanten.APPLICATION_GUI_NAME + "_" + cwid);
			stmt.executeUpdate();
			
		} catch (Exception e) {
			// handle exception
			System.out.println(e.toString());
		}
		/*List<CiPersons> ciPersons = findStampedCiPersons(tableId, ciId, groupTypeId, cwid);
		if (null!=ciPersons) {
			for (Iterator<CiPersons> iter = ciPersons.iterator(); iter.hasNext();) {
				CiPersons singleCiPerson = (CiPersons) iter.next();
				singleCiPerson.setDeleteQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
				singleCiPerson.setDeleteUser(cwid);
				singleCiPerson.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());
				singleCiPerson.setLastSyncSource(null);
				singleCiPerson.setSyncing(null);
				try {
					session.saveOrUpdate(singleCiPerson);
					session.flush();
				} catch (Exception e) {
					// handle exception
					System.out.println(e.toString());
				}
			}
		}*/

	}

	private static void syncCiPersons(Integer tableId, Long ciId, String groupType, String[] ciPersonCWIDArray,
			String cwid, Session session) {

		CallableStatement stmt = null;
		try {
			stmt = session.connection().prepareCall(
					"{? = call  TOOLS.FV_SYNC_CONTACT(" + tableId + "," + ciId + ",'" + groupType + "', NULL, ?, '"
							+ AirKonstanten.APPLICATION_GUI_NAME + "','" + cwid + "')}");
		} catch (HibernateException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		for (String person : ciPersonCWIDArray) {
			person = person.trim().toUpperCase();

			try {
				stmt.setString(2, person);
				stmt.registerOutParameter(1, java.sql.Types.VARCHAR);
				stmt.execute();
				String stmtResult = stmt.getString(1);
				if (null!=stmtResult) {
					System.out.println(stmtResult);
				}
			} catch (Exception e) {
				// handle exception
				System.out.println(e.toString());
			}

		}

	}

	/**
	 * TODO TABLE_ID
	 * 
	 * @param cwid
	 * @param ciId
	 * @param groupTypeId
	 * @param ciPersonCWID
	 *            a list of comma separated CWIDs
	 * @param value
	 * @return
	 */
	public static boolean saveCiPerson(String cwid, Integer tableId, Long ciId, Long groupTypeId, String groupType, String ciPersonCWID) {
		boolean result = false;

		cwid = cwid.toUpperCase();

//		Integer tableId = AirKonstanten.TABLE_ID_APPLICATION;
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		stampCiPersons(tableId, ciId, groupTypeId, cwid, session);
		if (null != ciPersonCWID) {
			ciPersonCWID = ciPersonCWID.toUpperCase();
			String[] ciPersonCWIDArray = ciPersonCWID.split(",");
			syncCiPersons(tableId, ciId, groupType, ciPersonCWIDArray, cwid, session);
		}
		purgeCiPersons(tableId, ciId, groupTypeId, cwid, session);
		HibernateUtil.close(tx, session, true);

		return result;
	}

}
