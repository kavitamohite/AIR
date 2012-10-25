package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.AccountDTO;
import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.dto.CategoryBusinessDTO;
import com.bayerbbs.applrepos.dto.CiTypeDTO;
import com.bayerbbs.applrepos.dto.ClassInformationDTO;
import com.bayerbbs.applrepos.dto.CurrencyDTO;
import com.bayerbbs.applrepos.dto.DedicatedDTO;
import com.bayerbbs.applrepos.dto.GroupsDTO;
import com.bayerbbs.applrepos.dto.GxpFlagDTO;
import com.bayerbbs.applrepos.dto.ItSecGroupDTO;
import com.bayerbbs.applrepos.dto.ItSecSBWerteDTO;
import com.bayerbbs.applrepos.dto.ItSetDTO;
import com.bayerbbs.applrepos.dto.LicenseTypeDTO;
import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;
import com.bayerbbs.applrepos.dto.LoadClassDTO;
import com.bayerbbs.applrepos.dto.OperationalStatusDTO;
import com.bayerbbs.applrepos.dto.OrganisationalScopeDTO;
import com.bayerbbs.applrepos.dto.PriorityLevelDTO;
import com.bayerbbs.applrepos.dto.ProcessDTO;
import com.bayerbbs.applrepos.dto.ReferenzDTO;
import com.bayerbbs.applrepos.dto.SISoogleAttribute;
import com.bayerbbs.applrepos.dto.ServiceModelDTO;
import com.bayerbbs.applrepos.dto.SeverityLevelDTO;
import com.bayerbbs.applrepos.dto.SlaDTO;
import com.bayerbbs.applrepos.dto.SlaServiceContractDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.ApplicationCat1Hbn;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "AIRToolsWSService", portName = "AIRToolsWSPort")
public class AIRToolsWSDelegate {

	com.bayerbbs.applrepos.service.AIRToolsWS aIRToolsWS = new com.bayerbbs.applrepos.service.AIRToolsWS();

	public AccountDTO[] getAccountList() {
		return aIRToolsWS.getAccountList();
	}

	public BusinessEssentialDTO[] getBusinessEssentialList() {
		return aIRToolsWS.getBusinessEssentialList();
	}

	public CurrencyDTO[] getCurrencyList() {
		return aIRToolsWS.getCurrencyList();
	}

	public GroupsDTO[] getGroupByGroupUsage(String groupUsageName) {
		return aIRToolsWS.getGroupByGroupUsage(groupUsageName);
	}

	public GxpFlagDTO[] getGxpFlagList() {
		return aIRToolsWS.getGxpFlagList();
	}
	
	public OrganisationalScopeDTO[] getOrganisationalScopeList() {
		return aIRToolsWS.getOrganisationalScopeList();
	}

	public DedicatedDTO[] getDedicatedList() {
		return aIRToolsWS.getDedicatedList();
	}

	public LoadClassDTO[] getLoadClassList() {
		return aIRToolsWS.getLoadClassList();
	}

	public ServiceModelDTO[] getServiceModelList() {
		return aIRToolsWS.getServiceModelList();
	}

	public ItSecGroupDTO[] getItSecGroupList() {
		return aIRToolsWS.getItSecGroupList();
	}

	public ItSecSBWerteDTO[] getItSecSBWerteList() {
		return aIRToolsWS.getItSecSBWerteList();
	}

	public ItSetDTO[] getItSetList() {
		return aIRToolsWS.getItSetList();
	}

	public LicenseTypeDTO[] getLicenseTypeList() {
		return aIRToolsWS.getLicenseTypeList();
	}

	public LifecycleStatusDTO[] getLifecycleStatusList() {
		return aIRToolsWS.getLifecycleStatusList();
	}

	public ProcessDTO[] getProcessList() {
		return aIRToolsWS.getProcessList();
	}

	public OperationalStatusDTO[] getOperationalStatusList() {
		return aIRToolsWS.getOperationalStatusList();
	}

	public PriorityLevelDTO[] getPriorityLevelList() {
		return aIRToolsWS.getPriorityLevelList();
	}

	public ReferenzDTO[] getReferenzList() {
		return aIRToolsWS.getReferenzList();
	}

	public SeverityLevelDTO[] getSeverityLevelList() {
		return aIRToolsWS.getSeverityLevelList();
	}

	public SlaDTO[] getSlaList() {
		return aIRToolsWS.getSlaList();
	}

	public SlaServiceContractDTO[] getSlaServiceContractList() {
		return aIRToolsWS.getSlaServiceContractList();
	}

	public CategoryBusinessDTO[] getCategoryBusinessList() {
		return aIRToolsWS.getCategoryBusinessList();
	}

	public ClassInformationDTO[] getClassInformationList() {
		return aIRToolsWS.getClassInformationList();
	}

	public ViewDataDTO getDatabaseDisplayName() {
		return aIRToolsWS.getDatabaseDisplayName();
	}

	public SISoogleAttribute[] getSISoogleAttributesByType(SisoogleAttributesInput input) {//String type
		return aIRToolsWS.getSISoogleAttributesByType(input);//type
	}
	
	public CiTypeDTO[] getCiTypes() {
		return aIRToolsWS.getCiTypes();
	}
}