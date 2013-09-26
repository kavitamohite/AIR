package com.bayerbbs.bov;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.dto.CiGroupsDTO;
import com.bayerbbs.applrepos.dto.ClassInformationDTO;
import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.SeverityLevelDTO;
import com.bayerbbs.applrepos.hibernate.CiGroupsHbn;
import com.bayerbbs.applrepos.hibernate.ClassInformationHbn;
import com.bayerbbs.applrepos.hibernate.GroupHbn;
import com.bayerbbs.applrepos.hibernate.LifecycleStatusHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;
import com.bayerbbs.applrepos.hibernate.SeverityLevelHbn;

public class BovApplication {
	private Application application;

	private String dispOwnerCWID;
	private String dispManagerCWID;
	private String dispCIOwnerRepresentative;
	private String dispApplicationStatus;
	private String dispOwnerBusinessLine;
	private String dispOwnerBusinessManager;
	private String dispCIModifiedDate;
	
	private String dispDrLevel;
	private String dispSeverityLevel;
	private String dispGxpRelevant;
	private String dispIcsRelevant;
	private String dispItsecRelevant;
	
	private String dispInformationClassification;
	private String dispDataPrivacy;
	private String dispApplicationName;
	private String dispApplicationDescription;
	
	private String dispRequestVerifiedOn;
	private String dispRequestVerifiedBy;
	
	public BovApplication() {
		init();
	}
	
	private void init() {
		application = null;
		dispOwnerCWID = "";
		dispManagerCWID = "";
		dispCIOwnerRepresentative = "";
		dispApplicationStatus = "";
		dispOwnerBusinessLine = "";
		dispOwnerBusinessManager = "";
		dispCIModifiedDate = "";
		dispDrLevel = "";
		dispSeverityLevel = "";
		dispGxpRelevant = "";
		dispIcsRelevant = "";
		dispItsecRelevant = "";
		dispInformationClassification = "";
		dispDataPrivacy = "";
		dispApplicationName = "";
		dispApplicationDescription = "";
		dispRequestVerifiedOn = "";
		dispRequestVerifiedBy = "";
	}

	public void setApplication(Application application) {
		this.application = application;
		try {
			dispOwnerCWID = getCwidName(application.getApplicationOwner());
			dispManagerCWID = getCwidName(application.getResponsible());
			dispCIOwnerRepresentative = getCwidName(application.getApplicationSteward());
			dispApplicationStatus = getApplicationStatus(application.getLifecycleStatusId());
			dispOwnerBusinessLine = getOwnerBusinessLine();
			dispOwnerBusinessManager = getOwnerBusinessManager();
			dispCIModifiedDate = formatTimestamp(application.getUpdateTimestamp());
			if (null != application.getDisasterRecoveryLevel()) {
				dispDrLevel = "Level " + application.getDisasterRecoveryLevel();
			}
			
			dispSeverityLevel = getSeverityLevel(application.getSeverityLevelId());
			if (null != application.getGxpFlag())
				dispGxpRelevant = "Yes";
			else
				dispGxpRelevant = "No";

			dispIcsRelevant = getValueYesNo(application.getRelevanceICS());
			dispItsecRelevant = getValueYesNo(application.getRelevanzITSEC());
			dispInformationClassification = getInformationClassification(application.getClassInformationId());
			dispDataPrivacy = "";
			dispApplicationName = application.getApplicationName();
			dispApplicationDescription = application.getApplicationAlias();
			
			dispRequestVerifiedOn = formatTimestamp(application.getBovLastTimestamp());
			dispRequestVerifiedBy = getCwidName(application.getBovAcceptedBy());
			
			
		} catch (Exception e) {
			System.out.println(e.toString());
		}
	}
	
	private String formatTimestamp(Timestamp ts) {
		String result = "";
		
		if (null != ts) result=  new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss.SSS z").format(ts);
		return result;
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
	private String getOwnerBusinessLine() 
	{
		String result = "";
		ArrayList<CiGroupsDTO> listCiGroup = CiGroupsHbn.findCiGroups(AirKonstanten.TABLE_ID_APPLICATION, application.getApplicationId(), AirKonstanten.CONTACT_TYPE_OWNING_BUSINESS_GROUP);
		if (listCiGroup.size() == 1)
			result = GroupHbn.findGroupById(listCiGroup.get(0).getGroupId()).getGroupName();
		return result;
	}
	private String getOwnerBusinessManager() 
	{
		String result = "";
		ArrayList<CiGroupsDTO> listCiGroup = CiGroupsHbn.findCiGroups(AirKonstanten.TABLE_ID_APPLICATION, application.getApplicationId(), AirKonstanten.CONTACT_TYPE_OWNING_BUSINESS_GROUP);
		if (listCiGroup.size() == 1)
			result = getCwidName(GroupHbn.findGroupById(listCiGroup.get(0).getGroupId()).getManagerCwid());
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
		return dispGxpRelevant;
	}
	public String getDispIcsRelevant() {
		return dispIcsRelevant;
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
	
	public String getDispCIOwnerRepresentative() {
		return dispCIOwnerRepresentative;
	}

	public String getDispGxpRelevant() {
		return dispGxpRelevant;
	}

	public String getDispOwnerBusinessLine() {
		return dispOwnerBusinessLine;
	}

	public String getDispCIModifiedDate() {
		return dispCIModifiedDate;
	}

	public String getDispRequestVerifiedOn() {
		return dispRequestVerifiedOn;
	}

	public String getDispItsecRelevant() {
		return dispItsecRelevant;
	}

	public String getDispOwnerBusinessManager() {
		return dispOwnerBusinessManager;
	}
}
