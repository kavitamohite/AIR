package com.bayerbbs.bov;

import java.util.Iterator;
import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.dto.ClassInformationDTO;
import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.SeverityLevelDTO;
import com.bayerbbs.applrepos.hibernate.ClassInformationHbn;
import com.bayerbbs.applrepos.hibernate.LifecycleStatusHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;
import com.bayerbbs.applrepos.hibernate.SeverityLevelHbn;

public class BovApplication {
	private Application application;

	private String dispOwnerCWID;
	private String dispManagerCWID;
	private String dispApplicationStatus;
	
	
	private String dispDrLevel;
	private String dispSeverityLevel;
	private String dispGxpLevel;
	private String dispGiscRelevant;
	
	private String dispInformationClassification;
	private String dispDataPrivacy;
	private String dispApplicationName;
	private String dispApplicationDescription;
	
	
	private String dispRequestVerifiedBy;
	
	public BovApplication() {
		init();
	}
	
	private void init() {
		application = null;
		dispOwnerCWID = "";
		dispManagerCWID = "";
		dispApplicationStatus = "";
		dispDrLevel = "";
		dispSeverityLevel = "";
		dispGxpLevel = "";
		dispGiscRelevant = "";
		dispInformationClassification = "";
		dispDataPrivacy = "";
		dispApplicationName = "";
		dispApplicationDescription = "";
		dispRequestVerifiedBy = "";
	}

	public void setApplication(Application application) {
		this.application = application;
		try {
			dispOwnerCWID = getCwidName(application.getApplicationOwner());
			dispManagerCWID = getCwidName(application.getResponsible());
			dispApplicationStatus = getApplicationStatus(application.getLifecycleStatusId());
			if (null != application.getDisasterRecoveryLevel()) {
				dispDrLevel = "Level " + application.getDisasterRecoveryLevel();
			}
			
			dispSeverityLevel = getSeverityLevel(application.getSeverityLevelId());
			dispGxpLevel = "";
			dispGiscRelevant = getValueYesNo(application.getRelevanceICS());
			dispInformationClassification = getInformationClassification(application.getClassInformationId());
			dispDataPrivacy = "";
			dispApplicationName = application.getApplicationName();
			dispApplicationDescription = application.getApplicationAlias();
			
			dispRequestVerifiedBy = getCwidName(application.getBovAcceptedBy());
			
			
		} catch (Exception e) {
			System.out.println(e.toString());
		}
	}
	
	private String getApplicationStatus(Long lifecycleStatusId) {
		String result = null;
		List<LifecycleStatusDTO> listLcStatus = LifecycleStatusHbn.listLifecycleStatus(AirKonstanten.TABLE_ID_APPLICATION);
		Iterator<LifecycleStatusDTO> itLcStatus = listLcStatus.iterator();
		while (null == result && itLcStatus.hasNext()) {
			LifecycleStatusDTO dto = itLcStatus.next();
			if (dto.getLcStatusId().longValue() == lifecycleStatusId.longValue()) {
				result = dto.getLcStatus();
			}
		}
		
		if (null == result) {
			result = "";
		}
		
		return result;
	}
	
	private String getSeverityLevel(Long severityLevelId) {
		String result = null;
		if (null != severityLevelId) {
			List<SeverityLevelDTO> listSeverity = SeverityLevelHbn.listSeverityLevelHbn();
			Iterator<SeverityLevelDTO> itSeverity = listSeverity.iterator();
			while (null == result && itSeverity.hasNext()) {
				SeverityLevelDTO dto = itSeverity.next();
				if (dto.getSeverityLevelId().longValue() == severityLevelId.longValue()) {
					result = "Level " + dto.getSeverityGPSC().longValue();
				}
			}
		}
		if (null == result) {
			result = "";
		}
		return result;
	}
	
	private String getInformationClassification(Long classInformationId) {
		String result = null;
		if (null != classInformationId) {
			List<ClassInformationDTO> listClassInfo = ClassInformationHbn.listClassInformation();
			Iterator<ClassInformationDTO> itClassInfo = listClassInfo.iterator();
			while (null == result && itClassInfo.hasNext()) {
				ClassInformationDTO dto = itClassInfo.next();
				if (dto.getClassInformationId().longValue() == classInformationId.longValue()) {
					result = dto.getClassInformationName();
				}
			}
		}
		if (null == result) {
			result = "";
		}
		return result;
		
	}
	
	private String getValueYesNo(Long input) {
		String result = null;
		if (null != input) {
			if (BovApplicationHbn.DB_VALUE_YES.longValue() == input.longValue()) {
				result = "Yes";
			}
			else if (BovApplicationHbn.DB_VALUE_NO.longValue() == input.longValue()) {
				result = "No";
			}
		}
		if (null == result) {
			result = "";
		}
		return result;
	}

	private String getCwidName(String cwid) {
		String result = "";
		if (null != cwid) {
			StringBuffer sb = new StringBuffer();

			List<PersonsDTO> list = PersonsHbn.findPersonByCWID(cwid);
			if (null != list && 1 == list.size()) {
				sb.append(list.get(0).getDisplayNameFull());
			}
			
			if (0 == sb.length()) {
				sb.append(cwid);
			}
			
			result = sb.toString();
		}
		return result;
	}
	
	
	public Application getApplication() {
		return application;
	}
	public String getDispOwnerCWID() {
		return dispOwnerCWID;
	}
	public String getDispManagerCWID() {
		return dispManagerCWID;
	}
	public String getDispApplicationStatus() {
		return dispApplicationStatus;
	}
	public String getDispDrLevel() {
		return dispDrLevel;
	}
	public String getDispSeverityLevel() {
		return dispSeverityLevel;
	}
	public String getDispGxpLevel() {
		return dispGxpLevel;
	}
	public String getDispGiscRelevant() {
		return dispGiscRelevant;
	}
	public String getDispInformationClassification() {
		return dispInformationClassification;
	}
	public String getDispDataPrivacy() {
		return dispDataPrivacy;
	}
	public String getDispApplicationName() {
		return dispApplicationName;
	}
	public String getDispApplicationDescription() {
		return dispApplicationDescription;
	}
	public String getDispRequestVerifiedBy() {
		return dispRequestVerifiedBy;
	}
	
}
