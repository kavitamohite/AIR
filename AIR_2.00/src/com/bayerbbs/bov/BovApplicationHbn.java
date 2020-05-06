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
		String processed = null;
		String ownershipStatus = null;
		Long drLevelId = null;
		Long severityLevelId = null;
//		String gxpRelevant = null;
		/*ELERJ ICS*/
//		Long icsRelevant = null;
		Boolean itsecRelevant = null;

		Long classInformationId = null;
		String dataPrivacyPersonalData = null;
		String dataPrivacyBetweenCountries = null;
		String applicationDescription = null;

		// Processed
		processed = dto.getProcessed() ? STR_YES : STR_NO;
		// Ownership Status
		ownershipStatus = dto.getOwnershipStatus();
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
//		ELERJ GXP
		// GxP Relevant
//		if (null != dto.getGxpRelevant())			gxpRelevant = dto.getGxpRelevant();
		/*ELERJ ICS*/
		// ICS Relevant
		/*if (null != dto.getIcsRelevant()) {
			// relevance ICS
			if (STR_YES.equals(dto.getIcsRelevant().toUpperCase())) {
				icsRelevant = DB_VALUE_YES;
			}
			else if (STR_NO.equals(dto.getIcsRelevant().toUpperCase())) {
				icsRelevant = DB_VALUE_NO;
			}
		}*/

		// GR1435 relevant
		if (null != dto.getItsecRelevant()) 
		{
			if (STR_YES.equals(dto.getItsecRelevant().toUpperCase()))
			{
				itsecRelevant = Boolean.TRUE;
			}
			else if (STR_NO.equals(dto.getItsecRelevant().toUpperCase())) 
			{
				itsecRelevant = Boolean.FALSE;
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
		// data privacy - personal data
		if (null != dto.getDataPrivacyPersonalData()) {
			dataPrivacyPersonalData = dto.getDataPrivacyPersonalData();
		}
		// data privacy - personal data
		if (null != dto.getDataPrivacyBetweenCountries()) {
			dataPrivacyBetweenCountries = dto.getDataPrivacyBetweenCountries();
		}
		// application description
		if (null != dto.getApplicationDescription())
		{
			applicationDescription = dto.getApplicationDescription();
			if (applicationDescription.length() == 0) applicationDescription = null;
		}
//		ELERJ GXP
		return saveBovApplication(cwid, applicationId, processed, ownershipStatus, drLevelId, severityLevelId, /*gxpRelevant,*//* icsRelevant,*/ itsecRelevant, classInformationId, dataPrivacyPersonalData, dataPrivacyBetweenCountries, applicationDescription);
	}
	

	
	public static boolean saveBovApplication(String cwid, Long applicationId, String processed, String ownershipStatus, Long drLevelId, Long severityLevelId, /*String gxpRelevant,*/ /*Long icsRelevant,*/ Boolean itsecRelevant, Long classInformationId, String dataPrivacyPersonalData, String dataPrivacyBetweenCountries, String applicationDescription) {
		boolean result = false;
		
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();
		Application application = (Application) session.get(Application.class, applicationId);

		if (null != application) {
			// Processed
			application.setBovProcessed(processed);
			// Ownership Status
			application.setBovOwnershipStatus(ownershipStatus);
			// DR Level
			if (null != drLevelId) {
				application.setDisasterRecoveryLevel("" + drLevelId.longValue());
			}
			
			// Severity Level
			if (null != severityLevelId) {
				application.setSeverityLevelId(severityLevelId);
			}
//			ELERJ GXP
			// GxP relevant			
			/*if (null != gxpRelevant) {
				application.setGxpFlag(gxpRelevant);
			}*/
			
			// ics relevant
			/*if (null != icsRelevant) {
				application.setRelevanceICS(icsRelevant);
			}*/		
			// GR1435 relevant
			if (null != itsecRelevant) application.setRelevanzITSEC(itsecRelevant ? DB_VALUE_YES : DB_VALUE_NO);
			
			// class information
			if (null != classInformationId) {
				application.setClassInformationId(classInformationId);
			}
			// data privacy - personal data
			if (null != dataPrivacyPersonalData) {
				application.setDataPrivacyPersonalData(dataPrivacyPersonalData);
			}
			// data privacy - between countries
			if (null != dataPrivacyBetweenCountries) {
				application.setDataPrivacyBetweenCountries(dataPrivacyBetweenCountries);
			}			
			// application description
			if (null != applicationDescription) application.setApplicationAlias(applicationDescription);
			
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
