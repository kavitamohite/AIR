package com.bayerbbs.applrepos.hibernate;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.AttributeValue;
import com.bayerbbs.applrepos.domain.SpecialAttribute;
import com.bayerbbs.applrepos.dto.SpecialAttributeViewDataDTO;

public class SpecialAttributeHbn {

	private static String asIsStatus = "AS_IS";
	private static String toBeStatus = "TO_BE";

	public static boolean saveSpecialAttributeFromDTO(String cwid, Long cIid,
			Long tableId,
			SpecialAttributeViewDataDTO specialAttributeViewDataDTO) {

		SpecialAttribute asIs = null, toBe = null;
		List<SpecialAttribute> specialAttribute = findByCiIdAndAttributeId(
				cIid, specialAttributeViewDataDTO.getAttributeId());

		for (SpecialAttribute spAttribute : specialAttribute) {
			if ("AS_IS".equals(spAttribute.getStatus())) {
				asIs = spAttribute;
			} else {
				toBe = spAttribute;
			}
		}

		if (asIs == null) {
			asIs = new SpecialAttribute();
			asIs.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			asIs.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
			asIs.setInsertUser(cwid);
			asIs.setCiId(cIid);
			asIs.setTableId(tableId);
			asIs.setAttribute(AttributeHbn.findById(specialAttributeViewDataDTO
					.getAttributeId()));
			asIs.setStatus(asIsStatus);
		}

		if (specialAttributeViewDataDTO.getAsIsValueId() == 0l) {
			asIs.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			asIs.setDeleteTimestamp(ApplReposTS.getCurrentTimestamp());
			asIs.setDeleteUser(cwid);
		} else {
			asIs.setAttributeValue(new AttributeValue(
					specialAttributeViewDataDTO.getAsIsValueId()));
			asIs.setDeleteQuelle(null);
			asIs.setDeleteTimestamp(null);
			asIs.setDeleteUser(null);
			asIs.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			asIs.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
			asIs.setUpdateUser(cwid);

		}

		if (toBe == null) {
			toBe = new SpecialAttribute();
			toBe.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			toBe.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
			toBe.setInsertUser(cwid);
			toBe.setCiId(cIid);
			toBe.setTableId(tableId);
			toBe.setAttribute(AttributeHbn.findById(specialAttributeViewDataDTO
					.getAttributeId()));
			toBe.setStatus(toBeStatus);
		}

		if (specialAttributeViewDataDTO.getToBeValueId() == 0l) {
			toBe.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			toBe.setDeleteTimestamp(ApplReposTS.getCurrentTimestamp());
			toBe.setDeleteUser(cwid);
		} else {
			toBe.setAttributeValue(new AttributeValue(
					specialAttributeViewDataDTO.getToBeValueId()));
			toBe.setDeleteQuelle(null);
			toBe.setDeleteTimestamp(null);
			toBe.setDeleteUser(null);
			toBe.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			toBe.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
			toBe.setUpdateUser(cwid);
		}

		Session session = HibernateUtil.getSession();

		Transaction tx = null;
		tx = session.beginTransaction();
		try {
			if (asIs.getId() == null && asIs.getAttributeValue() != null) {
				session.createSQLQuery(createInsertQuery(asIs, cwid))
						.executeUpdate();
			} else if (asIs.getId() != null) {
				session.update(asIs);
			}
			if (toBe.getId() == null && toBe.getAttributeValue() != null) {
				session.createSQLQuery(createInsertQuery(toBe, cwid))
						.executeUpdate();
			} else if (toBe.getId() != null) {
				session.update(toBe);
			}
			session.flush();
			tx.commit();
		} catch (Exception e) {
			System.out.println(e.toString());
			if (tx.isActive()) {
				tx.rollback();
			}
			return false;
		} finally {
			if (tx.isActive()) {
				tx.commit();
			}
			session.close();
		}

		return true;
	}

	@SuppressWarnings("unchecked")
	private static List<SpecialAttribute> findByCiIdAndAttributeId(Long cIid,
			Long attributeId) {
		List<SpecialAttribute> values = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			values = session.createQuery(
					"select h from SpecialAttribute as h where h.ciId = "
							+ cIid + " and h.attribute = " + attributeId)
					.list();

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			HibernateUtil.close(tx, session, false);
		}
		return values;
	}

	@SuppressWarnings("unchecked")
	public static List<SpecialAttribute> findByCiId(Long cIid) {
		List<SpecialAttribute> values = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			values = session.createQuery(
					"select h from SpecialAttribute as h where h.ciId = "
							+ cIid).list();

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			HibernateUtil.close(tx, session, false);
		}
		return values;
	}

	private static String createInsertQuery(SpecialAttribute specialAttribute,
			String cwid) {
		String insertQuery = "insert into CI_ATTRIBUTE_VALUE_RELATION (INSERT_QUELLE, INSERT_TIMESTAMP, INSERT_USER, UPDATE_QUELLE, UPDATE_TIMESTAMP, UPDATE_USER, ATTRIBUTE_ID, ATTRIBUTE_VALUE_ID, CI_ID, STATUS, TABLE_ID) values "
				+ "('"
				+ AirKonstanten.APPLICATION_GUI_NAME
				+ "', current_timestamp"
				+ ", '"
				+ cwid
				+ "', '"
				+ AirKonstanten.APPLICATION_GUI_NAME
				+ "', "
				+ "current_timestamp, '"
				+ cwid
				+ "',"
				+ specialAttribute.getAttribute().getId()
				+ ","
				+ specialAttribute.getAttributeValue().getId()
				+ ","
				+ specialAttribute.getCiId()
				+ ",'"
				+ specialAttribute.getStatus()
				+ "',"
				+ specialAttribute.getTableId() + ")";

		return insertQuery;

	}

}