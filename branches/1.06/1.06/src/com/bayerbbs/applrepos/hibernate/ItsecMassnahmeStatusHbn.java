package com.bayerbbs.applrepos.hibernate;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.ItsecMassnahmeStatus;
import com.bayerbbs.applrepos.dto.ItsecMassnahmeDetailDTO;

public class ItsecMassnahmeStatusHbn {

	
	public static ItsecMassnahmeStatus findById(Long itsecMassnStId) {
		ItsecMassnahmeStatus result = null;

		if (null != itsecMassnStId) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<ItsecMassnahmeStatus> values = session.createQuery(
						"select h from ItsecMassnahmeStatus as h where h.itsecMassnStId = " + itsecMassnStId).list();

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

	public static ItsecMassnahmeDetailDTO findDTOById(Long itsecMassnStId) {
		ItsecMassnahmeDetailDTO dto = null;
		
		ItsecMassnahmeStatus status = findById(itsecMassnStId);
		
		if (null != status) {
			dto = new ItsecMassnahmeDetailDTO();
			dto.setItsecMassnahmenStatusId(status.getItsecMassnStId());
			dto.setZobId(status.getZobId());
			dto.setTabelleId(status.getTabelleId());
			dto.setTabellePkId(status.getTabellePkId());
			dto.setStatusId(status.getStatusId());
			dto.setStatusKommentar(status.getStatusKommentar());
			dto.setMassnahmeGstoolId(status.getMassnahmeGSTOOLID());
			dto.setNoUpdateYN(status.getNoUpdateYN());
			dto.setGap(status.getGap());
			dto.setGapResponsible(status.getGapResponsible());
			dto.setGapMeasure(status.getGapMeasure());
			dto.setGapEndDate(status.getGapEndDate().getTime());//.toString()
			dto.setGapPriority(status.getGapPriority());
			dto.setRefTableID(status.getRefTableID());
			dto.setRefPKID(status.getRefPKID());
			// --
			dto.setExpense(status.getExpense());
			dto.setProbOccurence(status.getProbOccurence());
			dto.setDamage(status.getDamage());
			dto.setMitigationPotential(status.getMitigationPotential());
			dto.setSignee(status.getSignee());
			dto.setGapClassApproved(status.getGapClassApproved().getTime());//.toString()
			// --
			dto.setExpenseText(status.getExpenseT());
			dto.setProbOccurenceText(status.getProbOccucrenceT());
			dto.setDamageText(status.getDamageT());
			dto.setMitigationPotentialText(status.getMitigationPotentialT());
			dto.setRiskAnalysesAsFreetext(status.getRiskAnalysesAsFreetext());
			dto.setGapEndDateIncreased(status.getGapEndDateIncreased());
			dto.setCurrency(status.getCurrency());
			dto.setTemplateException(status.getTemplateException());
		}
		
		return dto;
	}
	
	private static boolean isNotNullOrEmpty(String input) {
		boolean isNotNullOrEmpty = false;
		if (null != input && !"".equals(input)) {
			isNotNullOrEmpty = true;
		}
		return isNotNullOrEmpty;
	}
	
	public static boolean saveItsecMassnahmeFromDTO(Long itsecMassnStId, ItsecMassnahmeDetailDTO dto) {
		boolean result = false;
		
		if (null != itsecMassnStId) {
			ItsecMassnahmeStatus status = findById(itsecMassnStId);
			
			if (null != status) {
				// fill data
				if (null != dto.getZobId()) {
					status.setZobId(dto.getZobId());
				}
				if (null != dto.getTabelleId()) {
					status.setTabelleId(dto.getTabelleId());
				}
				if (null != dto.getTabellePkId()) {
					status.setTabellePkId(dto.getTabellePkId());
				}
				status.setStatusId(dto.getStatusId());
				status.setStatusKommentar(dto.getStatusKommentar());
				status.setMassnahmeGSTOOLID(dto.getMassnahmeGstoolId());
				if (isNotNullOrEmpty(dto.getNoUpdateYN())) {
					status.setNoUpdateYN(dto.getNoUpdateYN());
				}
				status.setGap(dto.getGap());
				status.setGapResponsible(dto.getGapResponsible());
				status.setGapMeasure(dto.getGapMeasure());

//				if (null != dto.getGapEndDate() && !"".equals(dto.getGapEndDate())) {
//					Date gapEndDate = Date.valueOf(dto.getGapEndDate());
//					status.setGapEndDate(gapEndDate);
//				}
				if(dto.getGapEndDate() != null) {
					Date gapEndDate = new Date(dto.getGapEndDate());
					status.setGapEndDate(gapEndDate);
				}
				else {
					status.setGapEndDate(null);
				}
				
				status.setGapPriority(dto.getGapPriority());
				if (null != dto.getRefTableID()) {
					status.setRefTableID(dto.getRefTableID());
				}
				if (null != dto.getRefPKID()) {
					status.setRefPKID(dto.getRefPKID());
				}
				// --
				status.setExpense(dto.getExpense());
				status.setProbOccurence(dto.getProbOccurence());
				status.setDamage(dto.getDamage());
				status.setMitigationPotential(dto.getMitigationPotential());
				status.setSignee(dto.getSignee());
				
//				if (null != dto.getGapClassApproved() && !"".equals(dto.getGapClassApproved())) {
//					Date gapClassApproved = Date.valueOf(dto.getGapClassApproved());
//					status.setGapClassApproved(gapClassApproved);
//				}
				if(dto.getGapClassApproved() != null) {
					Date gapClassApproved = new Date(dto.getGapClassApproved());
					status.setGapClassApproved(gapClassApproved);
				}
				else {
					status.setGapClassApproved(null);
				}
				// --
				status.setExpenseT(dto.getExpenseText());
				status.setProbOccucrenceT(dto.getProbOccurenceText());
				status.setDamageT(dto.getDamageText());
				status.setMitigationPotentialT(dto.getMitigationPotentialText());
				status.setRiskAnalysesAsFreetext(dto.getRiskAnalysesAsFreetext());
				status.setGapEndDateIncreased(dto.getGapEndDateIncreased());
				status.setCurrency(dto.getCurrency());
				status.setTemplateException(dto.getTemplateException());
			}
			

			if (null != status) {
				// save data
				Session session = HibernateUtil.getSession();
				Transaction tx = null;
				tx = session.beginTransaction();
				boolean toCommit = false;
				try {
					session.saveOrUpdate(status);
					session.flush();
					toCommit = true;
					result = true;
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
		return result;
	}
}