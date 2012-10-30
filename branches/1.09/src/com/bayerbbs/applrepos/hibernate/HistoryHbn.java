package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.dto.HistorySISecViewDataDTO;


public class HistoryHbn {

	
	private static final String SQL_HISTORY_LIST = "SELECT   EVT.History_Event_Id," +
	        " TO_CHAR(EVT.Change_Timestamp,'DD-MON-YYYY HH24:MI:SS') AS Change_Timestamp,"+
	        " EVT.User_Name,"+
	        " EVT.Ins_Upd_Del,"+
	        " DTL.History_Detail_Id,"+
	        " DTL.Chg_Attribut_Log,"+
	        " DTL.Old_Value,"+
	        " DTL.New_Value,"+
	        " DTL.Anzeigetyp"+
	        " FROM     HISTORY_EVENT EVT"+ 
	        " 	INNER JOIN HISTORY_DETAIL DTL ON EVT.History_Event_Id=DTL.History_Event_Id"+
	        " WHERE    DTL.Chg_Tabelle_Id = ?"+
	        " AND      DTL.Chg_Tabelle_Pk_Id = ?"+
	        " ORDER BY EVT.History_Event_Id, DTL.History_Detail_Id";

	
	
	public static List<HistorySISecViewDataDTO> findHistoryList(long tableId, long tablePkId) {

		List<HistorySISecViewDataDTO> listResult = new ArrayList<HistorySISecViewDataDTO>();
		
		boolean commit = false;
		Transaction tx = null;
		PreparedStatement pselectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;
		
		try {
			tx = session.beginTransaction();

			conn = session.connection();

			pselectStmt = conn.prepareStatement(SQL_HISTORY_LIST);
			pselectStmt.setLong(1, tableId);
			pselectStmt.setLong(2, tablePkId);
			
			ResultSet rset = pselectStmt.executeQuery();

			if (null != rset) {
				while (rset.next()) {
					long id = rset.getLong("History_Event_Id");
					String change_Timestamp = rset.getString("Change_Timestamp");
					String userName = rset.getString("User_Name");
					String insUpdDel = rset.getString("Ins_Upd_Del");
					Long detailId = rset.getLong("History_Detail_Id");
					String chgAttributeLog = rset.getString("Chg_Attribut_Log");
					String oldValue = rset.getString("Old_Value");
					String newValue = rset.getString("New_Value");
					Integer displayType = rset.getInt("Anzeigetyp");
					// 
					
					listResult.add(new HistorySISecViewDataDTO(id, change_Timestamp, userName, insUpdDel, detailId, chgAttributeLog, oldValue, newValue, displayType));
				}
				commit = true;
			}
			
			if (null != rset) {
				rset.close();
			}
			if (null != pselectStmt) {
				pselectStmt.close();
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
		return listResult;
	}

}
