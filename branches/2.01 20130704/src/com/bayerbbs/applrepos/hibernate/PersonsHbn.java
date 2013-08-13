package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Person;
import com.bayerbbs.applrepos.dto.PersonsDTO;

public class PersonsHbn {
	
	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<PersonsDTO> getDTOList(
			List<Person> input) {
		ArrayList<PersonsDTO> listDTO = new ArrayList<PersonsDTO>();

		for (Iterator<Person> iter = input.iterator(); iter.hasNext();) {
			Person data = iter.next();
			PersonsDTO dto = new PersonsDTO();

			dto.setPersonId(data.getPersonId());
			dto.setCwid(data.getCwid());
			dto.setPersNr(data.getPersNr());
			dto.setLastname(data.getLastname());
			dto.setFirstname(data.getFirstname());
			dto.setMail(data.getMail());

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
	public static PersonsDTO[] getArrayFromList(
			List<PersonsDTO> input) {
		PersonsDTO output[] = new PersonsDTO[input.size()];
		int i = 0;
		for (final PersonsDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	public static List<PersonsDTO> listPersonsHbn() {

		List<PersonsDTO> listResult = new ArrayList<PersonsDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Person> values = session
					.createQuery(
							"select h from Person as h order by h.lastname, h.firstname")
					.list();

			listResult = getDTOList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				// throw again the first exception
				throw e;
			}

		}

		return listResult;
	}

	/**
	 * searches Persons by cwid
	 * @param cwid
	 * @return
	 */
	public static List<PersonsDTO> findPersonsByCWID(String cwid) {

		List<PersonsDTO> listResult = new ArrayList<PersonsDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Person> values = session
					.createQuery(
							"select h from Person as h where h.deleteTimestamp is null and h.cwid like '" + cwid.toUpperCase() +"%' order by h.cwid")
					.list();

			listResult = getDTOList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				// throw again the first exception
				throw e;
			}

		}

		return listResult;
	}
	
	/**
	 * searches Persons by query (CWID or Name)
	 * @param query
	 * @param queryMethod TODO
	 * @return
	 */
	public static List<PersonsDTO> findPersonsByQuery(String query, String primaryCWID, String secondaryCWID, String machineCWID, String queryMethod) {

		List<PersonsDTO> listResult = new ArrayList<PersonsDTO>();
		
		StringBuffer pstat = new StringBuffer();
		if ("Y".equals(primaryCWID)) {
			pstat.append("'PRIMARY CWID'");
		}
		if ("Y".equals(secondaryCWID)) {
			if (0 != pstat.length()) {
				pstat.append(",");
			}
			pstat.append("'SECONDARY CWID'");
		}
		if ("Y".equals(machineCWID)) {
			if (0 != pstat.length()) {
				pstat.append(",");
			}
			pstat.append("'MACHINE CWID'");
		}
		
		StringBuffer sb = new StringBuffer();
		sb.append("select h from Person as h where h.deleteTimestamp is null");
		sb.append(" and (NVL(h.inactive,'N') ='N')");
		if (0 != pstat.length()) {
			sb.append(" and h.pstat in (").append(pstat).append(")");
		}
		
		sb.append(" and");
		if ("CWID".equals(queryMethod)) {
			sb.append(" ( UPPER(h.cwid) like '").append(query.toUpperCase()).append("%')");
			sb.append(" order by h.cwid");
		} else {
			String[] namearray;
			namearray = query.split(",");
			if (namearray.length==1) {
				sb.append(" UPPER(h.lastname) like '").append(namearray[0].trim().toUpperCase()).append("%'");
			} else if (namearray.length>1) {
				sb.append(" UPPER(h.lastname) = '").append(namearray[0].trim().toUpperCase()).append("'");
				sb.append(" AND UPPER(h.firstname) like '").append(namearray[1].trim().toUpperCase()).append("%'");
			} else {
				sb.append(" 1=0 ");
			}
			sb.append(" order by h.lastname, h.firstname");
		}
		
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Person> values = session
					.createQuery(
							sb.toString())
					.list();

			listResult = getDTOList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				// throw again the first exception
				throw e;
			}

		}

		return listResult;
	}

	/**
	 * searches Persons by function and query (CWID or Name)
	 * @param query
	 * @param queryMethod TODO
	 * @return
	 */
	public static List<PersonsDTO> findPersonsByFunctionAndQuery(String query, String primaryCWID, String secondaryCWID, String machineCWID, String functionCWID, String queryMethod) {

		List<PersonsDTO> listResult = new ArrayList<PersonsDTO>();
		
		String searchCWIDType = null;
		
		if ("Y".equals(primaryCWID)) {
			searchCWIDType = "PRIMARY CWID";
		}
		if ("Y".equals(secondaryCWID)) {
			searchCWIDType = "SECONDARY CWID";
		}
		if ("Y".equals(machineCWID)) {
			searchCWIDType = "MACHINE CWID";
		}

		if (null != functionCWID) {
			searchCWIDType = "FUNCTION CWID";
		}

		
		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

//		Connection conn = null;
		
		try {
			StringBuffer sql = new StringBuffer();
			
			sql.append("SELECT * FROM TABLE (PCK_AIR.FT_PERSONPICK('").append(searchCWIDType).append("','").append(queryMethod).append("','").append(query).append("'))");
			
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			
			selectStmt = conn.createStatement();
			ResultSet rset = selectStmt.executeQuery(sql.toString());
			while (rset.next()) {
				PersonsDTO pers = getPersonsDTOFromResultSet(rset);
				listResult.add(pers);
			}

			// disconnect
			rset.close();
			selectStmt.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}
		
		return listResult;
	}

	private static PersonsDTO getPersonsDTOFromResultSet(ResultSet rset) {
		PersonsDTO personsDTO = new PersonsDTO();
		try {
			personsDTO.setCwid(rset.getString("CWID"));
			personsDTO.setFirstname(rset.getString("FIRSTNAME"));
			personsDTO.setLastname(rset.getString("LASTNAME"));
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return personsDTO;
	}
	
	
	
	/**
	 * searches person by cwid
	 * @param cwid
	 * @return
	 */
	public static List<PersonsDTO> findPersonByCWID(String cwid) {

		List<PersonsDTO> listResult = new ArrayList<PersonsDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Person> values = session
					.createQuery(
							"select h from Person as h where h.cwid = '" + cwid.toUpperCase() +"'")
					.list();

			listResult = getDTOList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				// throw again the first exception
				throw e;
			}

		}

		return listResult;
	}
	
	
	public static List<PersonsDTO> findPersonsByFunctionSignee(Long itSet) {

		List<PersonsDTO> listResult = new ArrayList<PersonsDTO>();
		
		if (null != itSet) {
		
			boolean commit = false;
			Transaction tx = null;
			Statement selectStmt = null;
			Session session = HibernateUtil.getSession();
	
//			Connection conn = null;
			
			try {
				StringBuffer sql = new StringBuffer();
				
				sql.append("select pers.cwid, pers.nachname as lastname, pers.vorname as firstname from Person pers"); 
				sql.append(" join function func on func.responsible = pers.cwid and func.del_timestamp is null and func.itset=").append(itSet);
				sql.append(" where pers.del_timestamp is null");
				sql.append(" order by pers.nachname, pers.vorname");
				
				@SuppressWarnings("deprecation")
				Connection conn = session.connection();
				
				selectStmt = conn.createStatement();
				ResultSet rset = selectStmt.executeQuery(sql.toString());
				while (rset.next()) {
					PersonsDTO pers = getPersonsDTOFromResultSet(rset);
					listResult.add(pers);
				}
	
				// disconnect
				rset.close();
				selectStmt.close();
				conn.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			finally {
				HibernateUtil.close(tx, session, commit);
			}

		}
		return listResult;
	}

}
