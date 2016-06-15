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

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.LifecycleStatus;
import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;

public class LifecycleStatusHbn {
	private static final Log log = LogFactory.getLog(LifecycleStatusHbn.class);
	
	public static LifecycleStatus findById(Long id){
		Session session = HibernateUtil.getSession();
		return (LifecycleStatus)session.get(LifecycleStatus.class, id);
	}
	

	private static List<LifecycleStatusDTO> getDTOList(
			List<LifecycleStatus> input) {
		ArrayList<LifecycleStatusDTO> listDTO = new ArrayList<LifecycleStatusDTO>();

		for (Iterator<LifecycleStatus> iter = input.iterator(); iter.hasNext();) {
			LifecycleStatus data = iter.next();
			LifecycleStatusDTO dto = new LifecycleStatusDTO();

			dto.setLcStatusId(data.getLcStatusId());
			dto.setLcStatus(data.getlcStatus());
			dto.setLcStatusTxt(data.getlcStatusTxt());
			dto.setTableId(data.getTabelleId());
			dto.setLcStatusEn(data.getlcStatusEn());

			if (null != data.getSort()) {
				dto.setSort(data.getSort());
			}
			listDTO.add(dto);
		}
		return listDTO;
	}


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
			@SuppressWarnings("unchecked")
			List<LifecycleStatus> values = session.createQuery("select h from LifecycleStatus as h where h.tabelleId = " + AirKonstanten.TABLE_ID_APPLICATION + "  order by h.sort").list();

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
	
	
	public static List<LifecycleStatusDTO> listLifecycleStatus(Integer tableId) {
		ArrayList<LifecycleStatusDTO> listResult = new ArrayList<LifecycleStatusDTO>();

		Transaction tx = null;
		Statement stmt = null;
		Session session = HibernateUtil.getSession();
//		Connection conn = null;

		StringBuffer sql = new StringBuffer();

//		sql.append("select lcsubstat.*");
//		sql.append(" ,lcstat.lc_status_en");
//		sql.append(" from lifecycle_sub_stat lcsubstat");
//		sql.append(" left join lifecycle_status lcstat on lcstat.lc_status_id = lcsubstat.lc_status_id");
//		sql.append(" where lcsubstat.tabelle_id = ");
//		sql.append(tableId);
//		sql.append(" ORDER BY lcstat.SORT, lcsubstat.SORT");
		
		sql.
		append("SELECT subStatus.tabelle_id, subStatus.lc_sub_stat_id, subStatus.lc_sub_stat_staten, status.lc_status_id, status.lc_status_en ").
		append("FROM lifecycle_sub_stat subStatus ").
		append("JOIN lifecycle_status status ON status.lc_status_id = subStatus.lc_status_id ").
//		append("WHERE subStatus.tabelle_id = 1 "). 
//		append("ORDER BY status.SORT, subStatus.SORT ").
		//Updated by ENFZM for Business Application
		append("WHERE subStatus.tabelle_id IN(1,2,13,3,4,88,30,12,37,19,183) ").
		append("ORDER BY subStatus.tabelle_id, status.lc_status_en");

		try {
			tx = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql.toString());

			if (null != rs) {
				while (rs.next()) {
					LifecycleStatusDTO dto = new LifecycleStatusDTO();
					dto.setLcStatusId(rs.getLong("LC_SUB_STAT_ID"));
					String lcStatusEn = rs.getString("LC_STATUS_EN");
					String lcSubStatusEn = rs.getString("LC_SUB_STAT_STATEN");
					
					dto.setLcStatus(lcStatusEn + " :: " + lcSubStatusEn);
					dto.setLcStatusTxt(lcStatusEn + " :: " + lcSubStatusEn);
					
					dto.setTableId(rs.getLong("TABELLE_ID"));
					dto.setLcSubStatusId(rs.getLong("LC_SUB_STAT_ID"));
					
					listResult.add(dto);
				}
			}

			if (null != rs) {
				rs.close();
			}
			if (null != stmt) {
				stmt.close();
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