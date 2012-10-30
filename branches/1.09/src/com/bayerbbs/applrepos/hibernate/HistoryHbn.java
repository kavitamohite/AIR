package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.dto.HistorySISecViewDataDTO;

public class HistoryHbn {
	
	private static final String SQL_HISTORY_LIST = 
		"SELECT   EVT.History_Event_Id, " +
		"         TO_CHAR(EVT.Change_Timestamp,'DD-MON-YYYY HH24:MI:SS') AS Change_Timestamp, " +
		"         EVT.User_Name, " +
		"         EVT.Ins_Upd_Del, " +
		"         DTL.History_Detail_Id, " +
		"         DTL.Chg_Attribut_Log, " +
		"         DTL.Old_Value, " +
		"         DTL.New_Value, " +
		"         DTL.Anzeigetyp " +
		"FROM     HISTORY_EVENT EVT " + 
		"         INNER JOIN HISTORY_DETAIL DTL ON EVT.History_Event_Id=DTL.History_Event_Id " +
		"WHERE    DTL.Chg_Tabelle_Id = :Table_ID " +
		"AND      DTL.Chg_Tabelle_Pk_Id = :Table_PK_ID " +
		"ORDER BY EVT.History_Event_Id, DTL.History_Detail_Id";

	public static List<HistorySISecViewDataDTO> findHistoryList(long tableId, long tablePkId) {

		List<HistorySISecViewDataDTO> listResult = new ArrayList<HistorySISecViewDataDTO>();
		
		boolean commit = false;
		Transaction tx = null;
		SQLQuery selectQuery = null;
		Session session = HibernateUtil.getSession();

		try {
			tx = session.beginTransaction();

			selectQuery = session.createSQLQuery(SQL_HISTORY_LIST);
			selectQuery.setLong("Table_ID", tableId);
			selectQuery.setLong("Table_PK_ID", tablePkId);
			listResult=selectQuery.list();
			commit = true;
		
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
