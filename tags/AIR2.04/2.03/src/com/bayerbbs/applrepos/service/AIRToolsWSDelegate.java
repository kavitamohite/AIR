package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.domain.Land;
import com.bayerbbs.applrepos.dto.AccountDTO;
import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.dto.CategoryBusinessDTO;
import com.bayerbbs.applrepos.dto.CiTypeDTO;
import com.bayerbbs.applrepos.dto.ClassInformationDTO;
import com.bayerbbs.applrepos.dto.CurrencyDTO;
import com.bayerbbs.applrepos.dto.DedicatedDTO;
import com.bayerbbs.applrepos.dto.GroupTypesDTO;
import com.bayerbbs.applrepos.dto.GroupsDTO;
import com.bayerbbs.applrepos.dto.GxpFlagDTO;
import com.bayerbbs.applrepos.dto.ItSecGroupDTO;
import com.bayerbbs.applrepos.dto.ItSecSBWerteDTO;
import com.bayerbbs.applrepos.dto.ItSetDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.KeyValueType2DTO;
import com.bayerbbs.applrepos.dto.KeyValueTypeDTO;
import com.bayerbbs.applrepos.dto.LicenseTypeDTO;
import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;
import com.bayerbbs.applrepos.dto.LinkCIDTO;
import com.bayerbbs.applrepos.dto.LinkCITypeDTO;
import com.bayerbbs.applrepos.dto.LoadClassDTO;
import com.bayerbbs.applrepos.dto.OperationalStatusDTO;
import com.bayerbbs.applrepos.dto.OrganisationalScopeDTO;
import com.bayerbbs.applrepos.dto.OsNameDTO;
import com.bayerbbs.applrepos.dto.OsTypeDTO;
import com.bayerbbs.applrepos.dto.PriorityLevelDTO;
import com.bayerbbs.applrepos.dto.ProcessDTO;
import com.bayerbbs.applrepos.dto.ReferenzDTO;
import com.bayerbbs.applrepos.dto.SISoogleAttribute;
import com.bayerbbs.applrepos.dto.ServiceModelDTO;
import com.bayerbbs.applrepos.dto.SeverityLevelDTO;
import com.bayerbbs.applrepos.dto.SlaDTO;
import com.bayerbbs.applrepos.dto.SlaServiceContractDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "AIRToolsWSService", portName = "AIRToolsWSPort")
public class AIRToolsWSDelegate {

	com.bayerbbs.applrepos.service.AIRToolsWS airToolsWS = new com.bayerbbs.applrepos.service.AIRToolsWS();

	public AccountDTO[] getAccountList() {
		return airToolsWS.getAccountList();
	}

	public BusinessEssentialDTO[] getBusinessEssentialList() {
		return airToolsWS.getBusinessEssentialList();
	}

	public CurrencyDTO[] getCurrencyList() {
		return airToolsWS.getCurrencyList();
	}

	public GroupsDTO[] getGroupByGroupUsage(String groupUsageName) {
		return airToolsWS.getGroupByGroupUsage(groupUsageName);
	}

	public GxpFlagDTO[] getGxpFlagList() {
		return airToolsWS.getGxpFlagList();
	}
	
	public OrganisationalScopeDTO[] getOrganisationalScopeList() {
		return airToolsWS.getOrganisationalScopeList();
	}

	public DedicatedDTO[] getDedicatedList() {
		return airToolsWS.getDedicatedList();
	}

	public LoadClassDTO[] getLoadClassList() {
		return airToolsWS.getLoadClassList();
	}

	public ServiceModelDTO[] getServiceModelList() {
		return airToolsWS.getServiceModelList();
	}

	public ItSecGroupDTO[] getItSecGroupList() {
		return airToolsWS.getItSecGroupList();
	}

	public ItSecGroupDTO[] getItSecGroupSimpleList() {
		return airToolsWS.getItSecGroupSimpleList();
	}

	public ItSecSBWerteDTO[] getItSecSBWerteList() {
		return airToolsWS.getItSecSBWerteList();
	}

	public ItSetDTO[] getItSetList() {
		return airToolsWS.getItSetList();
	}

	public LicenseTypeDTO[] getLicenseTypeList() {
		return airToolsWS.getLicenseTypeList();
	}

	public LifecycleStatusDTO[] getLifecycleStatusList() {
		return airToolsWS.getLifecycleStatusList();
	}

	public ProcessDTO[] getProcessList() {
		return airToolsWS.getProcessList();
	}

	public OperationalStatusDTO[] getOperationalStatusList() {
		return airToolsWS.getOperationalStatusList();
	}

	public PriorityLevelDTO[] getPriorityLevelList() {
		return airToolsWS.getPriorityLevelList();
	}

	public ReferenzDTO[] getReferenzList() {
		return airToolsWS.getReferenzList();
	}

	public SeverityLevelDTO[] getSeverityLevelList() {
		return airToolsWS.getSeverityLevelList();
	}

	public SlaDTO[] getSlaList() {
		return airToolsWS.getSlaList();
	}

	public SlaServiceContractDTO[] getSlaServiceContractList() {
		return airToolsWS.getSlaServiceContractList();
	}

	public CategoryBusinessDTO[] getCategoryBusinessList() {
		return airToolsWS.getCategoryBusinessList();
	}

	public ClassInformationDTO[] getClassInformationList() {
		return airToolsWS.getClassInformationList();
	}

	public ViewDataDTO getDatabaseDisplayName() {
		return airToolsWS.getDatabaseDisplayName();
	}

	public SISoogleAttribute[] getSISoogleAttributesByType(SisoogleAttributesInput input) {//String type
		return airToolsWS.getSISoogleAttributesByType(input);//type
	}
	
	public CiTypeDTO[] getCiTypes(boolean shortlist) {
		return airToolsWS.getCiTypes(shortlist);
	}
	
	public LinkCITypeDTO[] getLinkCITypeList() {
		return airToolsWS.getLinkCITypeList();
	}

	public LinkCIDTO[] getLinkCIList(CiComplianceParameterInput input) {
		return airToolsWS.getLinkCIList(input);
	}
	
	public ReferenzDTO[] getTemplateCIs() {
		return airToolsWS.getTemplateCIs();
	}
	
	
	public KeyValueTypeDTO[] getItSystemOsGroups() {
		return airToolsWS.getItSystemOsGroups();
	}
	public OsTypeDTO[] getItSystemOsTypes() {
		return airToolsWS.getItSystemOsTypes();
	}
	public OsNameDTO[] getItSystemOsNames() {//KeyValueTypeDTO
		return airToolsWS.getItSystemOsNames();
	}
	public KeyValueType2DTO[] getItSystemClusterCodes() {
		return airToolsWS.getItSystemClusterCodes();
	}
	public KeyValueDTO[] getItSystemClusterTypes() {
		return airToolsWS.getItSystemClusterTypes();
	}
	public KeyValueDTO[] getVirtualHardwareSoftwareTypes() {
		return airToolsWS.getVirtualHardwareSoftwareTypes();
	}
	public KeyValueDTO[] getItSystemPrimaryFunctions() {
		return airToolsWS.getItSystemPrimaryFunctions();
	}
	public KeyValueDTO[] getItSystemLicenseScannings() {
		return airToolsWS.getItSystemLicenseScannings();
	}
	
	
	public List<Land> getLaender() {
		return airToolsWS.getLaender();
	}
	
	public GroupTypesDTO[] getGroupTypesList() {
		return airToolsWS.getGroupTypesList();
	}

}