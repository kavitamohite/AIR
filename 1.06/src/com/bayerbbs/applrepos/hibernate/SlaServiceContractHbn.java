package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.dto.SlaServiceContractDTO;

public class SlaServiceContractHbn {

	/** The logger. */
	private static final Log log = LogFactory.getLog(SlaServiceContractHbn.class);
	
	/**
	 * find the sla service contracts
	 * @return
	 */
	public static List<SlaServiceContractDTO> listSlaServiceContracts() {
		
		ArrayList<SlaServiceContractDTO> listResult = new ArrayList<SlaServiceContractDTO>();

		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("select sla_service_contract_id, sla_id, service_contract_id from sla_service_contract");
		sql.append(" where del_timestamp is null");
		sql.append(" order by sla_service_contract_id");
		

		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rsMessage = selectStmt.executeQuery(sql.toString());

			if (null != rsMessage) {
				while (rsMessage.next()) {
					SlaServiceContractDTO dto = new SlaServiceContractDTO();
					dto.setSlaServiceContractId(rsMessage.getLong("SLA_SERVICE_CONTRACT_ID"));
					dto.setSlaId(rsMessage.getLong("SLA_ID"));
					dto.setServiceContractId(rsMessage.getLong("SERVICE_CONTRACT_ID"));
					
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
