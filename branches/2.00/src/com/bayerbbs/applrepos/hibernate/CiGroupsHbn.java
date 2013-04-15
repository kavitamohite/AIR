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
import com.bayerbbs.applrepos.domain.CiGroups;
import com.bayerbbs.applrepos.dto.CiGroupsDTO;

public class CiGroupsHbn {

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<CiGroupsDTO> getDTOList(
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


	/**
	 * @deprecated Eine Selektion von CI_GROUPS ohne Angabe der TABLE_ID ist sinnlos.
	 * 
	 */
	@Deprecated
	public static List<CiGroupsDTO> findCiGroupsBy(Long ciId, Long groupTypeId) {

		List<CiGroupsDTO> listResult = new ArrayList<CiGroupsDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			
			List<CiGroups> values = session
					.createQuery(
							"select h from CiGroups as h where h.deleteTimestamp is null and h.ciId = " + ciId + " and h.groupTypeId = " + groupTypeId)
							.list();

			listResult = getDTOList(values);

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			System.out.println(e.toString());
			HibernateUtil.close(tx, session, false);
		}

		return listResult;
	}
	
	public static CiGroups findCiGroup(Long tableId, Long ciId, Long groupTypeId) {

		CiGroups result = null;

		StringBuffer sb = new StringBuffer();
		sb.append("select h from CiGroups as h where");
		sb.append(" h.tableId = ").append(tableId);
		sb.append(" and h.ciId = ").append(ciId);
		sb.append(" and h.groupTypeId = ").append(groupTypeId);
		// sb.append(" and h.groupId = ").append(groupId);
		
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			
			List<CiGroups> values = session
					.createQuery(sb.toString())
							.list();

			if (1 == values.size()) {
				result = values.get(0);
			}

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			System.out.println(e.toString());
			HibernateUtil.close(tx, session, false);
		}

		return result;
	}
	
	private static void stampCiGroups(Integer tableId, Long ciId, Long groupTypeId, String cwid, Session session) {
		String stampSQL = "UPDATE ci_groups SET last_sync_source = ?, syncing = ? WHERE table_id = ? AND ci_id = ? AND group_type_id = ? AND del_timestamp IS NULL";
		try {
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
