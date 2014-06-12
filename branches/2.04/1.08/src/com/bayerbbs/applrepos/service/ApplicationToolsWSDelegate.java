package com.bayerbbs.applrepos.service;

import java.util.Iterator;
import java.util.List;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.AppRepAuthData;
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

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ApplicationToolsWSService", portName = "ApplicationToolsWSPort")
public class ApplicationToolsWSDelegate {

	com.bayerbbs.applrepos.service.ApplicationToolsWS applicationToolsWS = new com.bayerbbs.applrepos.service.ApplicationToolsWS();

	public ServiceContractDTO[] getServiceContractList(
			ApplicationEditParameterInput editInput) {
		return applicationToolsWS.getServiceContractList(editInput);
	}

	public ClassDataDTO[] getClassDataList(
			ApplicationEditParameterInput editInput) {
		return applicationToolsWS.getClassDataList(editInput);
	}

}