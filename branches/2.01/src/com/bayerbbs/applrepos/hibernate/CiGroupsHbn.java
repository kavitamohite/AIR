package com.bayerbbs.applrepos.hibernate;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiGroups;
import com.bayerbbs.applrepos.dto.CiGroupsDTO;

public class CiGroupsHbn {

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static ArrayList<CiGroupsDTO> getDTOList(
			List<CiGroups> input) {
		ArrayList<CiGroupsDTO> listDTO = new ArrayList<CiGroupsDTO>();

		for (Iterator<CiGroups> iter = input.iterator(); iter.hasNext();) {
			CiGroups data = iter.next();
			CiGroupsDTO dto = new CiGroupsDTO();

			dto.setCiGroupsId(data.getCiGroupsId());
			dto.setCiId(data.getCiId());
			dto.setGroupId(data.getGroupId());
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
	public static CiGroupsDTO[] getArrayFromList(
			List<CiGroupsDTO> input) {
		CiGroupsDTO output[] = new CiGroupsDTO[input.size()];
		int i = 0;
		for (final CiGroupsDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}


///	@Deprecated
//	public static List<CiGroupsDTO> findCiGroupsBy(Long ciId, Long groupTypeId) {
//
//		List<CiGroupsDTO> listResult = new ArrayList<CiGroupsDTO>();
//
//		Transaction tx = null;
//		Session session = HibernateUtil.getSession();
//		try {
//			tx = session.beginTransaction();
//			
//			@SuppressWarnings("unchecked")
//			List<CiGroups> values = session
//					.createQuery(
//							"select h from CiGroups as h where h.deleteTimestamp is null and h.ciId = " + ciId + " and h.groupTypeId = " + groupTypeId)
//							.list();
//
//			listResult = getDTOList(values);
//
//			HibernateUtil.close(tx, session, true);
//		} catch (RuntimeException e) {
//			System.out.println(e.toString());
//			HibernateUtil.close(tx, session, false);
//		}
//
//		return listResult;
//	}
	
	public static ArrayList<CiGroupsDTO>  findCiGroups(int tableId, Long ciId, int contactTypeId) {

		final String SQL = "select h from CiGroups as h where h.tableId = :tableId and h.ciId = :ciId and h.groupTypeId = :contactTypeId and h.deleteQuelle IS NULL";
		ArrayList<CiGroupsDTO>  result = null;
		Session session = HibernateUtil.getSession();
		Query selectQuery = session.createQuery(SQL);
		selectQuery.setInteger("tableId", tableId);
		selectQuery.setLong("ciId", ciId);
		selectQuery.setInteger("contactTypeId", contactTypeId);

		try {
			
			@SuppressWarnings("unchecked")
			List<CiGroups> values = selectQuery.list();
			result = getDTOList(values);

		} catch (RuntimeException e) {
			System.out.println(e.toString());
		}

		return result;
	}
	
	private static void stampCiGroups(Integer tableId, Long ciId, Long groupTypeId, String cwid, Session session) {
		String stampSQL = "UPDATE ci_groups SET last_sync_source = ?, syncing = ? WHERE table_id = ? AND ci_id = ? AND group_type_id = ? AND del_timestamp IS NULL";
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
	
	private static void purgeCiGroups(Integer tableId, Long ciId, Long groupTypeId, String cwid, Session session) {
		String stampSQL = "UPDATE ci_groups SET del_timestamp=sysdate, del_quelle = ?, del_user=?, syncing = NULL "
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
	}

	@SuppressWarnings("deprecation")
	private static void syncCiGroups(Integer tableId, Long ciId, String groupType, String[] ciGroupNamesArray,
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

		for (String group : ciGroupNamesArray) {
			group = group.trim();
			System.out.println("{? = call  TOOLS.FV_SYNC_CONTACT(" + tableId + "," + ciId + ",'" + groupType + "', '" + group + "', '"
					+ AirKonstanten.APPLICATION_GUI_NAME + "','" + cwid + "')}");
			try {
				stmt.setString(2, group);
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
	 * TODO CiGroups !!!
	 * TODO TABLE_ID
	 * ACHTUNG bearbeitet nur EINEN Datensatz, bei Mehrfachauswahl nicht anwendbar!!!
	 * 
	 * @param cwid
	 * @param ciId
	 * @param groupTypeId
	 * @param groupname
	 * @param value
	 * @return
	 */
	public static boolean saveCiGroup(String cwid, Integer tableId, Long ciId, Long groupTypeId, String groupType, String ciGroupNames) {
		boolean result = false;

		cwid = cwid.toUpperCase();

//		Integer tableId = AirKonstanten.TABLE_ID_APPLICATION;
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		stampCiGroups(tableId, ciId, groupTypeId, cwid, session);
		if (null != ciGroupNames) {
			//ciPersonCWID = ciPersonCWID.toUpperCase();
			String[] ciGroupNamesArray = ciGroupNames.split("\n");
			syncCiGroups(tableId, ciId, groupType, ciGroupNamesArray, cwid, session);
		}
		purgeCiGroups(tableId, ciId, groupTypeId, cwid, session);
		HibernateUtil.close(tx, session, true);

		return result;
	}
	
}
