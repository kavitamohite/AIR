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

import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.LifecycleStatus;
import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;

public class LifecycleStatusHbn {

	/** The logger. */
	private static final Log log = LogFactory.getLog(LifecycleStatusHbn.class);
	
	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<LifecycleStatusDTO> getDTOList(
			List<LifecycleStatus> input) {
		ArrayList<LifecycleStatusDTO> listDTO = new ArrayList<LifecycleStatusDTO>();

		for (Iterator<LifecycleStatus> iter = input.iterator(); iter.hasNext();) {
			LifecycleStatus data = (LifecycleStatus) iter.next();
			LifecycleStatusDTO dto = new LifecycleStatusDTO();

			dto.setLcStatusId(data.getLcStatusId());
			dto.setLcStatus(data.getlcStatus());
			dto.setLcStatusTxt(data.getlcStatusTxt());
			dto.setTabelleId(data.getTabelleId());
			dto.setLcStatusEn(data.getlcStatusEn());

			if (null != data.getSort()) {
				dto.setSort(data.getSort());
			}
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
	public static LifecycleStatusDTO[] getArrayFromList(
			List<LifecycleStatusDTO> input) {
		LifecycleStatusDTO output[] = new LifecycleStatusDTO[input.size()];
		int i = 0;
		for (final LifecycleStatusDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	public static List<LifecycleStatusDTO> listLifecycleStatusHbn() {

		List<LifecycleStatusDTO> listResult = new ArrayList<LifecycleStatusDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<LifecycleStatus> values = session
					.createQuery(
							"select h from LifecycleStatus as h where h.tabelleId = " + ApplreposConstants.TABELLEN_ID_APPLICATION + "  order by h.sort")
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
	 * find the application contacts
	 * @param applicationId
	 * @return
	 */
	public static List<LifecycleStatusDTO> listLifecycleStatus(Long tablellen_id) {
		
		ArrayList<LifecycleStatusDTO> listResult = new ArrayList<LifecycleStatusDTO>();

		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select lcsubstat.*");
		sql.append(" ,lcstat.lc_status_en");
		sql.append(" from lifecycle_sub_stat lcsubstat");
		sql.append(" left join lifecycle_status lcstat on lcstat.lc_status_id = lcsubstat.lc_status_id");
		sql.append(" where lcsubstat.tabelle_id = ");
		sql.append(tablellen_id);
		sql.append(" ORDER BY lcstat.SORT, lcsubstat.SORT"); 

		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					LifecycleStatusDTO dto = new LifecycleStatusDTO();
					dto.setLcStatusId(rsMessage.getLong("LC_SUB_STAT_ID"));
					String lcStatusEn = rsMessage.getString("LC_STATUS_EN");
					String lcSubStatusEn = rsMessage.getString("LC_SUB_STAT_STATEN");
					
					dto.setLcStatus(lcStatusEn + " :: " + lcSubStatusEn);
					dto.setLcStatusTxt(lcStatusEn + " :: " + lcSubStatusEn);
					
					listResult.add(dto);
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
