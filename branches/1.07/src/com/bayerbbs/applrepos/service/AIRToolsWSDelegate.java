package com.bayerbbs.applrepos.service;

import java.util.Iterator;
import java.util.List;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.dto.AccountDTO;
import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.dto.CategoryBusinessDTO;
import com.bayerbbs.applrepos.dto.ClassDataDTO;
import com.bayerbbs.applrepos.dto.ClassInformationDTO;
import com.bayerbbs.applrepos.dto.CurrencyDTO;
import com.bayerbbs.applrepos.dto.DedicatedDTO;
import com.bayerbbs.applrepos.dto.GroupsDTO;
import com.bayerbbs.applrepos.dto.GxpFlagDTO;
import com.bayerbbs.applrepos.dto.ItSecGroupDTO;
import com.bayerbbs.applrepos.dto.ItSecSBWerteDTO;
import com.bayerbbs.applrepos.dto.ItSetDTO;
import com.bayerbbs.applrepos.dto.ItsecUserOptionDTO;
import com.bayerbbs.applrepos.dto.LicenseTypeDTO;
import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;
import com.bayerbbs.applrepos.dto.LoadClassDTO;
import com.bayerbbs.applrepos.dto.OperationalStatusDTO;
import com.bayerbbs.applrepos.dto.PriorityLevelDTO;
import com.bayerbbs.applrepos.dto.ProcessDTO;
import com.bayerbbs.applrepos.dto.ReferenzDTO;
import com.bayerbbs.applrepos.dto.ServiceContractDTO;
import com.bayerbbs.applrepos.dto.ServiceModelDTO;
import com.bayerbbs.applrepos.dto.SeverityLevelDTO;
import com.bayerbbs.applrepos.dto.SlaDTO;
import com.bayerbbs.applrepos.dto.SlaServiceContractDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.AccountHbn;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.BusinessEssentialHbn;
import com.bayerbbs.applrepos.hibernate.CategoryBusinessHbn;
import com.bayerbbs.applrepos.hibernate.ClassDataHbn;
import com.bayerbbs.applrepos.hibernate.ClassInformationHbn;
import com.bayerbbs.applrepos.hibernate.CurrencyHbn;
import com.bayerbbs.applrepos.hibernate.GroupsHbn;
import com.bayerbbs.applrepos.hibernate.ItSecGroupHbn;
import com.bayerbbs.applrepos.hibernate.ItSecSBWerteHbn;
import com.bayerbbs.applrepos.hibernate.ItSetHbn;
import com.bayerbbs.applrepos.hibernate.ItsecUserOptionHbn;
import com.bayerbbs.applrepos.hibernate.LicenseTypeHbn;
import com.bayerbbs.applrepos.hibernate.LifecycleStatusHbn;
import com.bayerbbs.applrepos.hibernate.OperationalStatusHbn;
import com.bayerbbs.applrepos.hibernate.PriorityLevelHbn;
import com.bayerbbs.applrepos.hibernate.ProcessHbn;
import com.bayerbbs.applrepos.hibernate.ServiceContractHbn;
import com.bayerbbs.applrepos.hibernate.SlaHbn;
import com.bayerbbs.applrepos.hibernate.SlaServiceContractHbn;

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

}