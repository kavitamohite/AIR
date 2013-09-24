package com.bayerbbs.bov;

import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.dto.ClassInformationDTO;
import com.bayerbbs.applrepos.dto.SeverityLevelDTO;
import com.bayerbbs.applrepos.hibernate.ClassInformationHbn;
import com.bayerbbs.applrepos.hibernate.HibernateUtil;
import com.bayerbbs.applrepos.hibernate.SeverityLevelHbn;

public class BovApplicationHbn {
	
	public static String STR_YES = "Y";
	public static String STR_NO  = "N";
	
	public static Long DB_VALUE_YES = -1L;
	public static Long DB_VALUE_NO  =  0L;
	

	
	public static boolean saveBovApplication(String cwid, Long applicationId, BovApplicationInputDTO dto) {
		Long drLevelId = null;
		Long severityLevelId = null;
		String gxpRelevant;
		Long giscRelevant = null;

		Long classInformationId = null;


		// DR Level
		drLevelId = dto.getDrLevel();
		
		// Severity Level
		if (null != dto.getSeverityLevel()) {
			List<SeverityLevelDTO> listSeverity = SeverityLevelHbn.listSeverityLevelHbn();
			Iterator<SeverityLevelDTO> itSeverity = listSeverity.iterator();
			while (null == severityLevelId && itSeverity.hasNext()) {
				SeverityLevelDTO dtoSeverity = itSeverity.next();
				if (dtoSeverity.getSeverityGPSC().longValue() == dto.getSeverityLevel().longValue()) {
					severityLevelId = dtoSeverity.getSeverityLevelId();
				}
			}
		}
		
		// TODO GXP Relevant

		// GISC Relevant
		if (null != dto.getGiscRelevant()) {
			// relevance ICS
			if (STR_YES.equals(dto.getGiscRelevant().toUpperCase())) {
				giscRelevant = DB_VALUE_YES;
			}
			else if (STR_NO.equals(dto.getGiscRelevant().toUpperCase())) {
				giscRelevant =DB_VALUE_NO;
			}
		}

		// information classification
		if (null != dto.getInformationClassification()) {
			List<ClassInformationDTO> listClassInformation = ClassInformationHbn.listClassInformation();
			Iterator<ClassInformationDTO> itClIterator = listClassInformation.iterator();
			while (null == classInformationId && itClIterator.hasNext()) {
				ClassInformationDTO dtoClassInformation = itClIterator.next();
				if (dto.getInformationClassification().toLowerCase().equals(dtoClassInformation.getClassInformationName())) {
					classInformationId = dtoClassInformation.getClassInformationId();
				}
			}
		}

		
		return saveBovApplication(cwid, applicationId, drLevelId, severityLevelId, null, giscRelevant, classInformationId);
	}
	

	
	public static boolean saveBovApplication(String cwid, Long applicationId, Long drLevelId, Long severityLevelId, String gxpRelevant, Long giscRelevant, Long classInformationId) {
		boolean result = false;
		
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();
		Application application = (Application) session.get(Application.class, applicationId);

		if (null != application) {
			
			
			// DR Level
			if (null != drLevelId) {
				application.setDisasterRecoveryLevel("" + drLevelId.longValue());
			}
			
			// Severity Level
			if (null != severityLevelId) {
				application.setSeverityLevelId(severityLevelId);
			}
				
//			
//			if (null != dto.getGxpRelevant()) {
//				application.setGxpFlag(gxpFlag)
//			}
//			
			// GISC relevant
			if (null != giscRelevant) {
				application.setRelevanceICS(giscRelevant);
			}

			
			
			// class information
			if (null != classInformationId) {
				application.setClassInformationId(classInformationId);
			}
			
			// BOV attributes
			Timestamp ts = ApplReposTS.getCurrentTimestamp();
			
			application.setBovAcceptedBy(cwid);
			application.setBovLastTimestamp(ts);
			
			
			// set update information
			application.setUpdateUser(cwid);
			application.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			application.setUpdateTimestamp(ts);
			
			// save data
			boolean toCommit=false;
			try {
				session.saveOrUpdate(application);
				session.flush();
				
				toCommit = true;
				result = true;
			} catch (HibernateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			String message = HibernateUtil.close(tx, session, toCommit);
			if (null != message) {
				result = false;
			}
		}
		return result;
	}
	
}
