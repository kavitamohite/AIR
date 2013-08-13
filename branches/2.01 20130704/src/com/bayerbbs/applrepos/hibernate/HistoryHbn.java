package com.bayerbbs.applrepos.hibernate;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.dto.HistorySISecViewDataDTO;

public class HistoryHbn {
	
	private static final String INSERT_HISTORY_EVENT = 
		"INSERT INTO HISTORY_EVENT (" +
		"         History_Event_Id," +
		"         Change_Timestamp," +
		"         User_Name," +
		"         User_Id," +
		"         Ins_Upd_Del) " +
		"Values(" +
		"         :eventID,                                          " +
		"         SYSTIMESTAMP,                                      " +
		"         :userName,                                         " +
		"         :userId,                                           " +
		"         :insUpdDel)                                        ";
	private static final String INSERT_HISTORY_DETAIL = 
		"INSERT INTO HISTORY_DETAIL (" +
		"         History_Event_Id," +
		"         Chg_Tabelle_Id," +
		"         Chg_Tabelle_Pk_Id," +
		"         Chg_Attribut_Techn," +
		"         Chg_Attribut_Log," +
		"         Old_Value," +
		"         New_Value," +
		"         Ins_Upd_Del," +
		"         Anzeigetyp) " +
		"Values(" +
		"         :eventID,                                          " +
		"         :tableID,                                          " +
		"         :pkID,                                             " +
		"         :chgAttributeTechn,                                " +
		"         :chgAttributeLog,                                  " +
		"         :oldValue,                                         " +
		"         :newValue,                                         " +
		"         :insUpdDel,                                        " +
		"         :displayType)                                      ";
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
		
		Query selectQuery = null;
		Session session = HibernateUtil.getSession();

		try {
			selectQuery = session.createSQLQuery(SQL_HISTORY_LIST);
			selectQuery.setLong("Table_ID", tableId);
			selectQuery.setLong("Table_PK_ID", tablePkId);
			@SuppressWarnings("unchecked")
			List<Object[]> listTemp = selectQuery.list();
			
			for (Iterator<Object[]> iterator = listTemp.iterator(); iterator.hasNext();) {
				Object obj[] = iterator.next();
				try {
					listResult.add(new HistorySISecViewDataDTO((Long) (((BigDecimal)obj[0]).longValue()), (String) obj[1], (String)obj[2], ((Character)obj[3]).toString(), (((BigDecimal)obj[4]).longValue()), (String)obj[5], (String)obj[6], (String)obj[7], new Integer((Character)obj[8]).intValue()));					
				} catch (Exception e) {
					System.out.println(e.toString());
				}
				
			}
		
		} catch (Exception e) {
			//
			System.out.println(e.toString());
		}
		finally {
			session.flush();		
		}
		return listResult;
	}
	
	public static Long insertHistoryEvent(String userID, char insUpdDel)
	{
		boolean commit = false;
		Transaction tx = null;
		Long eventID = null;
		Session session = HibernateUtil.getSession();
		Query insertQuery = session.createSQLQuery(INSERT_HISTORY_EVENT)
			.setString("userName", getUserName(userID))
			.setString("userId", userID)
			.setCharacter("insUpdDel", insUpdDel);
		try 
		{
			tx = session.beginTransaction();
			eventID = getNextEventID();
			int recordsAffected = insertQuery
				.setLong("eventID", eventID)
				.executeUpdate();
			commit = (recordsAffected == 1);
		} 
		catch (Exception e) {
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}
		return eventID;
	}
	
	public static Boolean insertHistoryDetail(Long eventID, long tableID, long pkID, String chgAttributeTechn, String chgAttributeLog, String oldValue, String newValue, char insUpdDel, Integer displayType)
	{
		boolean commit = false;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		Query insertQuery = session.createSQLQuery(INSERT_HISTORY_DETAIL)
		.setLong("eventID", eventID)
		.setLong("tableID", tableID)
		.setLong("pkID", pkID)
		.setString("chgAttributeTechn", chgAttributeTechn)
		.setString("chgAttributeLog", chgAttributeLog)
		.setString("oldValue", oldValue)
		.setString("newValue", newValue)
		.setCharacter("insUpdDel", insUpdDel)
		.setInteger("displayType", displayType);
		try 
		{
			tx = session.beginTransaction();
			int recordsAffected = insertQuery.executeUpdate();
			commit = (recordsAffected == 1);
		} 
		catch (Exception e) {
			System.out.println(e.toString());
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}
		return commit;
	}
	
	private static String getUserName(String userID)
	{
		String result = null;
		Session session = HibernateUtil.getSession();
		Query selectQuery = session.createSQLQuery("SELECT Vorname || ' ' || Nachname AS \"Name\" FROM PERSON WHERE Cwid = :userID")
		.setString("userID", userID);
		try 
		{
			result = (String) selectQuery.uniqueResult();
		} 
		catch (Exception e) 
		{
			System.out.println(e.toString());
		}
		finally
		{
			session.flush();		
		}
		return result;
	}
	private static Long getNextEventID()
	{
		Long result = null;
		Session session = HibernateUtil.getSession();
		Query selectQuery = session.createSQLQuery("SELECT SEQ_HISTORY_EVENT.NEXTVAL FROM DUAL");
		try 
		{
			result = ((BigDecimal) selectQuery.uniqueResult()).longValue();
		} 
		catch (Exception e) 
		{
			System.out.println(e.toString());
		}
		finally
		{
			session.flush();		
		}
		return result;	
	}
}

