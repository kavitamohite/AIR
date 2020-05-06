package com.bayerbbs.bov;

import java.sql.Date;
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
import org.apache.commons.lang.StringEscapeUtils;


public class BovApplication {
	public static String STR_NO  = "N";
	public static String STR_YES = "Y";

	private Application application;

	private String dispApplicationAlias;
	private String dispApplicationName;
	private String dispApplicationStatus;
	private String dispBusinessOwner;
	private String dispCIModifiedDate;
	private String dispCiOwnerManager;
	private String dispDataPrivacy;

	private String dispDrLevel;
	private String dispGiscRelevant;
	private String dispGR1435Relevant;
	
//	private String dispGxpRelevant;
	private String dispInformationClassification;
	private String dispNotificationDate;
	private String dispOwnershipStatus;
	private String dispOwningBusiness;
	
	private String dispProcessed;
	private String dispRequestVerifiedBy;
	
	private String dispRequestVerifiedOn;
	private String dispSeverityLevel;
	
	public BovApplication() {
		init();
	}
	
	private String formatDate(Date dt) {
		String result = "";
		
		if (null != dt) result = new SimpleDateFormat("dd-MMM-yyyy").format(dt);
		return result;
	}
	private String formatTimestamp(Timestamp ts) {
		String result = "";
		
		if (null != ts) result=  new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss.SSS z").format(ts);
		return result;
	}

	public Application getApplication() {
		return application;
	}
	
	private String getApplicationAlias() {
		return StringEscapeUtils.escapeHtml(application.getApplicationAlias());
	}

	private String getApplicationName() {
		return StringEscapeUtils.escapeHtml(application.getApplicationName());
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
	private String getCiOwnerManager() 
	{
		String result = "";
		ArrayList<CiGroupsDTO> listCiGroup = CiGroupsHbn.findCiGroups(AirKonstanten.TABLE_ID_APPLICATION, application.getApplicationId(), AirKonstanten.CONTACT_TYPE_CI_OWNER);
		if (listCiGroup.size() == 1)
			result = getCwidName(GroupHbn.findGroupById(listCiGroup.get(0).getGroupId()).getManagerCwid());
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
		return StringEscapeUtils.escapeHtml(result);
	}
	public String getDispApplicationAlias() {
		return dispApplicationAlias;
	}
	
	public String getDispApplicationName() {
		return dispApplicationName;
	}
	
	public String getDispApplicationStatus() {
		return dispApplicationStatus;
	}

	public String getDispBusinessOwner() {
		return dispBusinessOwner;
	}

	public String getDispCIModifiedDate() {
		return dispCIModifiedDate;
	}
	
	
	public String getDispCiOwnerManager() {
		return dispCiOwnerManager;
	}

	public String getDispDataPrivacy() {
		return dispDataPrivacy;
	}

	public String getDispDrLevel() {
		return dispDrLevel;
	}

	public String getDispGiscRelevant() {
		return dispGiscRelevant;
	}

	public String getDispGR1435Relevant() {
		return dispGR1435Relevant;
	}
//	ELERJ GXP
/*	public String getDispGxpRelevant() {
		return dispGxpRelevant;
	}
*/
	public String getDispInformationClassification() {
		return dispInformationClassification;
	}

	public String getDispNotificationDate() {
		return dispNotificationDate;
	}

	public String getDispOwnershipStatus() {
		return dispOwnershipStatus;
	}

	public String getDispOwningBusiness() {
		return dispOwningBusiness;
	}

	public String getDispProcessed() {
		return dispProcessed;
	}

	public String getDispRequestVerifiedBy() {
		return dispRequestVerifiedBy;
	}

	public String getDispRequestVerifiedOn() {
		return dispRequestVerifiedOn;
	}

	public String getDispSeverityLevel() {
		return dispSeverityLevel;
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

	private String getOwningBusiness() 
	{
		String result = "";
		ArrayList<CiGroupsDTO> listCiGroup = CiGroupsHbn.findCiGroups(AirKonstanten.TABLE_ID_APPLICATION, application.getApplicationId(), AirKonstanten.CONTACT_TYPE_OWNING_BUSINESS_GROUP);
		if (listCiGroup.size() == 1)
			result = GroupHbn.findGroupById(listCiGroup.get(0).getGroupId()).getGroupName();
		return result;
	}

	private String getOwningBusinessManager() 
	{
		String result = "";
		ArrayList<CiGroupsDTO> listCiGroup = CiGroupsHbn.findCiGroups(AirKonstanten.TABLE_ID_APPLICATION, application.getApplicationId(), AirKonstanten.CONTACT_TYPE_OWNING_BUSINESS_GROUP);
		Iterator<CiGroupsDTO> ciGroup = listCiGroup.iterator();
		while ("" == result && ciGroup.hasNext()) {
			CiGroupsDTO dto = ciGroup.next();
			result = getCwidName(GroupHbn.findGroupById(dto.getGroupId()).getManagerCwid());
		}
		return result;
	}

	/*private String getSeverityLevel(Long severityLevelId) {
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
	}*/

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

	private String getValueYesNo(String input) {
		String result = null;
		if (null != input) {
			if (STR_YES.equals(input)) 
			{
				result = "Yes";
			}
			else if (STR_NO.equals(input)) {
				result = "No";
			}
		}
		if (null == result) {
			result = "";
		}
		return result;
	}

	private void init() {
		application = null;
		dispBusinessOwner = "";
		dispCiOwnerManager = "";
		dispApplicationStatus = "";
		dispOwningBusiness = "";
		dispCIModifiedDate = "";
		dispProcessed = "";
		dispNotificationDate = "";
		dispOwnershipStatus = "";
		dispDrLevel = "";
		dispSeverityLevel = "";
//		ELERJ GXP
//		dispGxpRelevant = "";
		dispGiscRelevant = "";
		dispGR1435Relevant = "";
		dispInformationClassification = "";
		dispDataPrivacy = "";
		dispRequestVerifiedOn = "";
		dispRequestVerifiedBy = "";
	}

	public void setApplication(Application application) {
		this.application = application;
		try {
			dispBusinessOwner = getOwningBusinessManager();;
			dispCiOwnerManager = getCiOwnerManager();
			dispApplicationName = getApplicationName();
			dispApplicationAlias = getApplicationAlias();
			dispApplicationStatus = getApplicationStatus(application.getLifecycleStatusId());
			dispOwningBusiness = getOwningBusiness();
			dispCIModifiedDate = formatTimestamp(application.getUpdateTimestamp());
			dispProcessed = getValueYesNo(application.getBovProcessed());
			dispNotificationDate = formatDate(application.getBovNotificationDate());
			if (null != application.getBovOwnershipStatus()) dispOwnershipStatus = application.getBovOwnershipStatus();
			if (null != application.getDisasterRecoveryLevel()) {
				dispDrLevel = "Level " + application.getDisasterRecoveryLevel();
			}

					//	dispSeverityLevel = getSeverityLevel(application.getSeverityLevelId());
			/*if (null != application.getGxpFlag())

				dispGxpRelevant = "Yes";
			else
				dispGxpRelevant = "No";
*/						/*ELERJ ICS*/
//			dispGiscRelevant = getValueYesNo(application.getRelevanceICS());
			dispGR1435Relevant = getValueYesNo(application.getRelevanzITSEC());
			dispInformationClassification = getInformationClassification(application.getClassInformationId());
			dispDataPrivacy = getValueYesNo(application.getDataPrivacyPersonalData());
			
			dispRequestVerifiedOn = formatTimestamp(application.getBovLastTimestamp());
			dispRequestVerifiedBy = getCwidName(application.getBovAcceptedBy());
			
			
		} catch (Exception e) {
			System.out.println(e.toString());
		}
	}

	public void setDispOwnershipStatus(String dispOwnershipStatus) {
		this.dispOwnershipStatus = dispOwnershipStatus;
	}

	public void setDispProcessed(String dispProcessed) {
		this.dispProcessed = dispProcessed;
	}
}
