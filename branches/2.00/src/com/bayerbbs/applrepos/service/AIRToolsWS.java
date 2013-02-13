package com.bayerbbs.applrepos.service;
 
import java.util.Iterator;
import java.util.List;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import com.bayerbbs.applrepos.constants.AirKonstanten;
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
import com.bayerbbs.applrepos.dto.LinkCIDTO;
import com.bayerbbs.applrepos.dto.LinkCITypeDTO;
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
import com.bayerbbs.applrepos.hibernate.AccountHbn;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationCat1Hbn;
import com.bayerbbs.applrepos.hibernate.BusinessEssentialHbn;
import com.bayerbbs.applrepos.hibernate.CategoryBusinessHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.ClassInformationHbn;
import com.bayerbbs.applrepos.hibernate.ComplianceHbn;
import com.bayerbbs.applrepos.hibernate.CurrencyHbn;
import com.bayerbbs.applrepos.hibernate.GroupHbn;
import com.bayerbbs.applrepos.hibernate.ItSecGroupHbn;
import com.bayerbbs.applrepos.hibernate.ItSecSBWerteHbn;
import com.bayerbbs.applrepos.hibernate.ItSetHbn;
import com.bayerbbs.applrepos.hibernate.LicenseTypeHbn;
import com.bayerbbs.applrepos.hibernate.LifecycleStatusHbn;
import com.bayerbbs.applrepos.hibernate.OperationalStatusHbn;
import com.bayerbbs.applrepos.hibernate.PriorityLevelHbn;
import com.bayerbbs.applrepos.hibernate.ProcessHbn;
import com.bayerbbs.applrepos.hibernate.SisoogleValuesHbn;
import com.bayerbbs.applrepos.hibernate.SlaHbn;
import com.bayerbbs.applrepos.hibernate.SlaServiceContractHbn;

public class AIRToolsWS {
	private final static String CACHENAME = "airCache";
	
	public AccountDTO[] getAccountList() {
		AccountDTO[] aAccountsDTO = null;
		String cacheKeyName = "accountList";
		
		Cache myCache = (Cache) CacheManager.getInstance().getCache(CACHENAME);
		if (null != myCache) {
			Element element = myCache.get(cacheKeyName);
			if (null != element) {
				aAccountsDTO = (AccountDTO[]) element.getObjectValue();
			}
		}
		
		if (null == aAccountsDTO) {
			aAccountsDTO = AccountHbn.getArrayFromList(AccountHbn.listAccountHbn());
			
			if (null != aAccountsDTO) {
				if (null != myCache) {
					Element element = new Element(cacheKeyName, aAccountsDTO);
					myCache.put(element);
				}
			}
		}
		
		return aAccountsDTO;
	}
	
	public BusinessEssentialDTO[] getBusinessEssentialList() {
		return BusinessEssentialHbn.getBEArrayFromList(BusinessEssentialHbn.listBusinessEssentialHbn());
	}

	public CurrencyDTO[] getCurrencyList() {
		return CurrencyHbn.getArrayFromList(CurrencyHbn.listCurrencyHbn());
	}

	public GroupsDTO[] getGroupByGroupUsage(String groupUsageName) {
		return GroupHbn.getArrayFromList(GroupHbn.findGroupByGroupUsage(groupUsageName));
	}
	
	public GxpFlagDTO[] getGxpFlagList() {
		//&nbsp; <br/> als Leertextoption --> Problem: keines der beiden Textwerte wird als HTML gerendert NACHDEM es ausgewählt wurde.
		//Gelöst durch ExtJS Combobox Override Anpassung
		GxpFlagDTO[] gxpFlags = {
			new GxpFlagDTO(""),
			new GxpFlagDTO("GXP"),
			new GxpFlagDTO("GCP"),
			new GxpFlagDTO("GLP"),
			new GxpFlagDTO("GMP")
		};
		
		return gxpFlags; 
	}
	
	public OrganisationalScopeDTO[] getOrganisationalScopeList() {
		OrganisationalScopeDTO[] orgScopes = {
//				new OrganisationalScopeDTO(""),
			new OrganisationalScopeDTO("BHC"),
			new OrganisationalScopeDTO("BCS"),
			new OrganisationalScopeDTO("BMS"),
			new OrganisationalScopeDTO("BBS"),
			new OrganisationalScopeDTO("BTS"),
			new OrganisationalScopeDTO("CUR"),
			new OrganisationalScopeDTO("BAG"),
			new OrganisationalScopeDTO("Bayer Group")
		};
		
		return orgScopes;
	}
	
	public ServiceModelDTO[] getServiceModelList() {
		ServiceModelDTO[] serviceModels = {
			new ServiceModelDTO(" "),
			new ServiceModelDTO("Fully Integrated Business Service"),
			new ServiceModelDTO("Full integrated IT Services"),
			new ServiceModelDTO("SAAS (Software as a Service)"),
			new ServiceModelDTO("Application Hosting"),
			new ServiceModelDTO("Housing"),
			new ServiceModelDTO("Client Application")
		};
		
		return serviceModels;
	}
	
	public DedicatedDTO[] getDedicatedList() {
		DedicatedDTO[] dedicated = { new DedicatedDTO("-1", ""), new DedicatedDTO("Y", "yes"), new DedicatedDTO("N", "no")};
		return dedicated;
	}
	
	public LoadClassDTO[] getLoadClassList() {
		LoadClassDTO[] loadclasses = { new LoadClassDTO("-1", ""), new LoadClassDTO("low"), new LoadClassDTO("medium"), new LoadClassDTO("high"),};
		return loadclasses;
	}
	
	public ItSecGroupDTO[] getItSecGroupList() {
		return ItSecGroupHbn.getArrayFromList(ItSecGroupHbn.getListItSecGroupWerte());
	}
	
	public ItSecSBWerteDTO[] getItSecSBWerteList() {
		List<ItSecSBWerteDTO> listTemp = ItSecSBWerteHbn.getListItSecSBWerte();
		return ItSecSBWerteHbn.getArrayFromList(listTemp);
	}
	
	public ItSetDTO[] getItSetList() {
		return ItSetHbn.getArrayFromList(ItSetHbn.listItSet());
	}
	
	public LicenseTypeDTO[] getLicenseTypeList() {
		return LicenseTypeHbn.getArrayFromList(LicenseTypeHbn.listLicenseTypeHbn());
	}
	
	public LifecycleStatusDTO[] getLifecycleStatusList() {
		return LifecycleStatusHbn.getArrayFromList(LifecycleStatusHbn.listLifecycleStatus(AirKonstanten.TABLE_ID_APPLICATION));
	}
	
	public ProcessDTO[] getProcessList() {
		return ProcessHbn.getArrayFromList(ProcessHbn.listProcessHbn());
	}

	public OperationalStatusDTO[] getOperationalStatusList() {
		return OperationalStatusHbn.getArrayFromList(OperationalStatusHbn.listOperationalStatusHbn());
	}

	public PriorityLevelDTO[] getPriorityLevelList() {
		return PriorityLevelHbn.getArrayFromList(PriorityLevelHbn.getListPriorityLevel());
	}

	public ReferenzDTO[] getReferenzList() {
		List<ReferenzDTO> listRef = AnwendungHbn.findApplicationReferenz();
		ReferenzDTO[] aRefs = null;
		if (null != listRef) {
			aRefs = new ReferenzDTO[listRef.size()];
			int i = 0;
			for (final ReferenzDTO ref : listRef) {
				aRefs[i] = ref;
				i++;
			}
		}
		return aRefs;
	}
	
	public ReferenzDTO[] getTemplateCIs() {//Integer tableId
		List<ReferenzDTO> templateList = CiEntitiesHbn.getTemplateCIs();
		
		return templateList.toArray(new ReferenzDTO[0]);
	}
	
	public SeverityLevelDTO[] getSeverityLevelList() {
		return BusinessEssentialHbn.getSLArrayFromList(BusinessEssentialHbn.listSeverityLevelHbn());
	}

	public SlaDTO[] getSlaList() {
		return SlaHbn.getArrayFromList(SlaHbn.listSlaHbn());
	}
	

	public SlaServiceContractDTO[] getSlaServiceContractList() {
		List<SlaServiceContractDTO> listSlaServiceContracts = SlaServiceContractHbn.listSlaServiceContracts();

		SlaServiceContractDTO[] aSlaServiceContracts = null;
		
		
		if (null != listSlaServiceContracts) {
		
			aSlaServiceContracts = new SlaServiceContractDTO[listSlaServiceContracts.size()];
			int i=0;
			Iterator<SlaServiceContractDTO> itTemp = listSlaServiceContracts.iterator();
			while (itTemp.hasNext()) {
				SlaServiceContractDTO data = itTemp.next();
				aSlaServiceContracts[i] = data;
				i++;
			}
		}
		
		return aSlaServiceContracts; 
	}

	public CategoryBusinessDTO[] getCategoryBusinessList() {
		return CategoryBusinessHbn.getArrayFromList(CategoryBusinessHbn.listCategoryBusiness());
	}

	public ClassInformationDTO[] getClassInformationList() {
		return ClassInformationHbn.getArrayFromList(ClassInformationHbn.listClassInformation());
	}
	
	public ViewDataDTO getDatabaseDisplayName() {
		ViewDataDTO dto = new ViewDataDTO();
		dto.setId("1");
		dto.setText(ApplReposHbn.getDatabaseDisplayName());
		return dto;
	}

	public SISoogleAttribute[] getSISoogleAttributesByType(SisoogleAttributesInput input) {//String type
		return SisoogleValuesHbn.getSISoogleAttributesByType(input.getType());//type
	}
	
	public CiTypeDTO[] getCiTypes() {
		return ApplicationCat1Hbn.getCiTypes();
	}
	
	public LinkCITypeDTO[] getLinkCITypeList() {
		return ComplianceHbn.getArrayFromList(ComplianceHbn.findLinkCIType());
	}
	
	public LinkCIDTO[] getLinkCIList(CiComplianceParameterInput input) {
		return ComplianceHbn.getArrayFromListLinkCIList(ComplianceHbn.findLinkCIList(input.getZielotypGSToolId(), input.getItSetId(), input.getApplicationId(), input.getMassnahmeId(), input.getApplicationCat1Id()));
	}
	
}
