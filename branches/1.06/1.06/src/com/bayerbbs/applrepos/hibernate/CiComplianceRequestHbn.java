package com.bayerbbs.applrepos.hibernate;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.CiComplianceRequest;
import com.bayerbbs.applrepos.dto.CiComplianceRequestDTO;

public class CiComplianceRequestHbn {

	public static CiComplianceRequestDTO findCiComplianceRequestByTableCiAndComplianceRequestId(
			Long tableId, Long ciId, Long complianceRequestId) {

		CiComplianceRequestDTO result = new CiComplianceRequestDTO();

		if (null != tableId && null != ciId) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<CiComplianceRequest> values = session.createQuery(
						"select h from CiComplianceRequest as h where h.tableId = "
								+ tableId + " and h.ciId = " + ciId
								+ " and h.complianceRequestId="
								+ complianceRequestId
								+ " and h.deleteTimestamp is null order by h.ciComplianceRequestId").list();

				if (null != values && 0 < values.size()) {
					CiComplianceRequest myValue = values.get(0);

					result.setTableId(myValue.getTableId());
					result.setCiId(myValue.getCiId());
					result.setComplianceRequestId(myValue.getComplianceRequestId());
					result.setCiComplianceRequestId(myValue.getCiComplianceRequestId());
					if (null == myValue.getDeleteTimestamp()) {
						result.setValue(ApplreposConstants.YES_SHORT);
					}
					else {
						result.setValue(ApplreposConstants.NO_SHORT);
					}
				}

				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}
		}

		return result;
	}

	
	
	@SuppressWarnings("unchecked")
	public static CiComplianceRequest findCiComplianceRequestAll(Long tableId, Long ciId,
			Long complianceRequestId) {
		CiComplianceRequest result = null;
		if (null != tableId && null != ciId && null != complianceRequestId) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<CiComplianceRequest> values = session.createQuery(
						"select h from CiComplianceRequest as h where h.tableId = "
								+ tableId + " and h.ciId = " + ciId
								+ " and h.complianceRequestId="
								+ complianceRequestId + " order by h.deleteQuelle desc, h.ciComplianceRequestId").list();

				if (null != values && 0 < values.size()) {
					result = values.get(0);
				}

				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}
		}
		return result;
	}

	public static void saveCiComplianceRequestAll(String cwid, long tableId, Long ciId, String GR1435, String GR1775, String GR1920, String GR2008) {
		
		saveCiComplianceRequest(cwid, tableId, ciId, ApplreposConstants.COMPLIANCE_REQUEST_GR1435, GR1435);
		saveCiComplianceRequest(cwid, tableId, ciId, ApplreposConstants.COMPLIANCE_REQUEST_GR1775, GR1775);
		saveCiComplianceRequest(cwid, tableId, ciId, ApplreposConstants.COMPLIANCE_REQUEST_GR1920, GR1920);
		saveCiComplianceRequest(cwid, tableId, ciId, ApplreposConstants.COMPLIANCE_REQUEST_GR2008, GR2008);
	}
	
	
	public static void saveCiComplianceRequest(String cwid, Long tableId, Long ciId, Long complianceRequestId, String value) {
		
		boolean update = true;
		
		if (null == value) {
			return;
		}
		
		if (!ApplreposConstants.YES_SHORT.equals(value) && !ApplreposConstants.NO_SHORT.equals(value)) {
			return;
		}
		
		cwid = cwid.toUpperCase();

		CiComplianceRequest complianceRequest = findCiComplianceRequestAll(tableId, ciId,
				complianceRequestId);

		if ("N".equals(value)) {
			// no input - try to delete the old entries

			if (null != complianceRequest
					&& null == complianceRequest.getDeleteTimestamp()) {
				// set deletion information
				complianceRequest
						.setDeleteQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
				complianceRequest.setDeleteUser(cwid);
				complianceRequest.setDeleteTimestamp(ApplReposTS
						.getDeletionTimestamp());
			}
		} else if (null != complianceRequest) {
			// update existing entry
			// we have no data to set here !!
			// complianceRequest.setCiSupportStuffValue(value);
			complianceRequest
					.setUpdateQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
			complianceRequest.setUpdateUser(cwid.toUpperCase());
			complianceRequest.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
			if (null != complianceRequest.getDeleteTimestamp()) {
				// oh it is deleted, so reactivate it
				complianceRequest
						.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
				complianceRequest.setInsertUser(cwid);
				complianceRequest.setInsertTimestamp(complianceRequest
						.getUpdateTimestamp());
				complianceRequest.setDeleteQuelle(null);
				complianceRequest.setDeleteUser(null);
				complianceRequest.setDeleteTimestamp(null);
			}
		} else {
			// application - insert values
			update = false;
			complianceRequest = new CiComplianceRequest();
			complianceRequest
					.setInsertQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
			complianceRequest.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
			complianceRequest.setInsertUser(cwid);
			// --
			complianceRequest.setTableId(tableId);
			complianceRequest.setCiId(ciId);
			complianceRequest.setComplianceRequestId(complianceRequestId);
		}

		if (null != complianceRequest) {
			Session session = HibernateUtil.getSession();
			Transaction tx = null;
			tx = session.beginTransaction();
			boolean toCommit = false;
			try {
				session.saveOrUpdate(complianceRequest);
				session.flush();
				toCommit = true;
			} catch (Exception e) {
				// handle exception
				System.out.println(e.toString());
				// output.setResult(ApplreposConstants.RESULT_ERROR);
				// output.setMessages(new String[] { e.getMessage() });
			} finally {
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (toCommit) {
					if (null == hbnMessage) {
						// output
						// .setResult(ApplreposConstants.RESULT_OK);
						// output.setMessages(new String[] { "" });
					} else {
						// output
						// .setResult(ApplreposConstants.RESULT_ERROR);
						// output
						// .setMessages(new String[] { hbnMessage });
					}
				}
			}
		}

	}
	
	
	
	/**
	 * find all the ci's 
	 * @return
	 
	public static List<ComplianceControlDTO> findComplianceControlByComplianceRequestId(Long complianceRequestId) {

		ArrayList<ComplianceControlDTO> listResult = new ArrayList<ComplianceControlDTO>();

		boolean commit = false;
		Transaction tx = null;
		Statement selectStmt = null;
		Session session = HibernateUtil.getSession();

		Connection conn = null;

		StringBuffer sql = new StringBuffer();

		sql.append("SELECT * FROM compliance_control ccl");
		sql.append(" LEFT JOIN ci_compliance_statement ccs ON ccs.compliance_control_id=ccl.compliance_control_id");
		sql.append(" AND ccs.ci_compliance_request_id =").append(complianceRequestId);
		sql.append(" ORDER BY ccl.sort ASC");
		
		
		try {
			tx = session.beginTransaction();

			conn = session.connection();

			selectStmt = conn.createStatement();
			ResultSet rset = selectStmt.executeQuery(sql.toString());

			if (null != rset) {
				while (rset.next()) {
					ComplianceControlDTO anw = getComplianceControlDTOFromResultSet(rset, complianceRequestId);
					listResult.add(anw);
				}
				commit = true;
			}
			
			if (null != rset) {
				rset.close();
			}
			if (null != selectStmt) {
				selectStmt.close();
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

	private static ComplianceControlDTO getComplianceControlDTOFromResultSet(ResultSet rset, Long complianceRequestId) throws Exception {
		ComplianceControlDTO cc = new ComplianceControlDTO();
		
		cc.setComplianceRequestId(complianceRequestId);	// the parent
		
		cc.setComplianceControlId(rset.getLong("COMPLIANCE_CONTROL_ID"));
		cc.setComplianceControlName(rset.getString("COMPLIANCE_CONTROL_NAME"));
		cc.setComplianceControlDelTimestamp(rset.getLong("DEL_TIMESTAMP"));
		
		cc.setCiComplianceStatementId(rset.getLong("CI_COMPLIANCE_STATEMENT_ID"));	// the child-values
		cc.setCiComplianceRequestId(rset.getLong("CI_COMPLIANCE_REQUEST_ID"));
		cc.setCompliantStatus(rset.getString("COMPLIANT_STATUS"));
		cc.setJustification(rset.getString("JUSTIFICATION"));
		return cc;
	}*/
	
}
