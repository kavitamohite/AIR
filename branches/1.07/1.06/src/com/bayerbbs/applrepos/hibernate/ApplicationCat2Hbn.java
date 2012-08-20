package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.ApplicationCat2;
import com.bayerbbs.applrepos.dto.ApplicationCat2DTO;

public class ApplicationCat2Hbn {

	/** The logger. */
	private static final Log log = LogFactory.getLog(ApplicationCat2Hbn.class);
	
	/**
	 * converts the list entry database table to dto
	 * @param input
	 * @return
	 */
	private static List<ApplicationCat2DTO> getDTOList(List<ApplicationCat2> input) {
		ArrayList<ApplicationCat2DTO> listDTO = new ArrayList<ApplicationCat2DTO>();

		for (Iterator<ApplicationCat2> iter = input.iterator(); iter.hasNext();) {
			ApplicationCat2 data = (ApplicationCat2) iter.next();
			ApplicationCat2DTO dto = new ApplicationCat2DTO();
			dto.setApplicationCat2Id(data.getId());
			dto.setApplicationCat1Id(data.getAnwendungKat1Id());
			dto.setApplicationCat2Text(data.getAnwendungKat2Text());
			if (null != data.getSort()) {
				dto.setSort(data.getSort());
			}
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	public static ApplicationCat2DTO[] getArrayFromList(List<ApplicationCat2DTO> input) {
		ApplicationCat2DTO output[] = new ApplicationCat2DTO[input.size()]; 
		  
		  int i=0;
		  for (final ApplicationCat2DTO data : input) {
			  output[i] = data;
			  i++;
		  }
		  return output;
	}

	public static List<ApplicationCat2DTO> listApplicationCat2Hbn() {
		
		List<ApplicationCat2DTO> listResult = new ArrayList<ApplicationCat2DTO>();
		
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<ApplicationCat2> values = session.createQuery(
					"select h from ApplicationCat2 as h").list();
			
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
	
	public static List<ApplicationCat2DTO> findApplicationCat2ByCat1Hbn_OLD(long anwendungKat1Id) {
		
		List<ApplicationCat2DTO> listResult = new ArrayList<ApplicationCat2DTO>();
		
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select ");

		
		try {
			tx = session.beginTransaction();
			List<ApplicationCat2> values = session.createQuery(
					"select h from ApplicationCat2 as h where h.anwendungKat1Id=" + anwendungKat1Id + " order by upper(h.anwendungKat2Text)").list();
			
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
	
	public static List<ApplicationCat2DTO> findApplicationCat2ByCat1Hbn(long anwendungKat1Id) {
		
		List<ApplicationCat2DTO> listResult = new ArrayList<ApplicationCat2DTO>();
		
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select ");
		sql.append(" anwkat2.*");
		sql.append(" from anwendung_kat2 anwkat2");
		sql.append(" where anwkat2.anwendung_kat1_id = ").append(anwendungKat1Id);
		sql.append(" and GUI_USE_Y_N = 'Y'");
		sql.append(" order by upper(anwkat2.anwendung_kat2_txt)");

		
		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
				ApplicationCat2DTO applicationCat2DTO = new ApplicationCat2DTO();
				applicationCat2DTO.setApplicationCat2Id(rsMessage
						.getLong("ANWENDUNG_KAT2_ID"));
				applicationCat2DTO.setApplicationCat2Text(rsMessage
						.getString("ANWENDUNG_KAT2_TXT"));
				applicationCat2DTO.setSort(rsMessage
						.getLong("SORT"));
				applicationCat2DTO.setApplicationCat1Id(rsMessage
						.getLong("ANWENDUNG_KAT1_ID"));
				applicationCat2DTO.setGuiSAPNameWizard(rsMessage.getString("GUI_SAPNAME_WIZARD_Y_N"));
				listResult.add(applicationCat2DTO);
				}
			}

			if (null != rsMessage) {
				rsMessage.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
			}
			if (null != conn) {
				conn.close();
			}
			tx.commit();
		} catch (Exception e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
				// throw again the first exception
				// throw e;
			}

		}
		
		return listResult;
	}
	
}
