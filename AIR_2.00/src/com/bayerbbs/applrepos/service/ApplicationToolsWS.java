package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ClassDataDTO;
import com.bayerbbs.applrepos.dto.ServiceContractDTO;
import com.bayerbbs.applrepos.hibernate.ClassDataHbn;
import com.bayerbbs.applrepos.hibernate.ServiceContractHbn;

public class ApplicationToolsWS {

//	private final static String CACHENAME = "airCache";
	
/*
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
		return LifecycleStatusHbn.getArrayFromList(LifecycleStatusHbn.listLifecycleStatus(ApplreposConstants.TABLE_ID_APPLICATION));
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
*/	
	/*public ServiceContractDTO[] getServiceContractList(Long id) { //emria
		//return ServiceContractHbn.findAllServiceContracts().toArray(new ServiceContractDTO[0]);
		return ServiceContractHbn.findAllServiceContracts(id).toArray(new ServiceContractDTO[0]);	//emria  IM0006263625 : Issue saving Contract in AIR
	}*/
	
//	public ServiceContractDTO[] getServiceContractList(ApplicationEditParameterInput editInput) {
//		if (null == editInput.getSlaId() || 0 == editInput.getSlaId().longValue()) {
//			return ServiceContractHbn.getArrayFromList(ServiceContractHbn.listServiceContract());
//		}
//		else {
//			return ServiceContractHbn.getArrayFromList(ServiceContractHbn.findServiceContractsBySlaId(editInput.getSlaId()));	
//		}
//	}
	
/*
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
*/

/*	
	public ApplicationEditParameterOutput saveUserOption(
			UserOptionParameterInput editInput) {

		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		if (null != editInput && StringUtils.isNotNullOrEmpty(editInput.getCwid())) {
			List<ItsecUserOptionDTO> listOptions = ItsecUserOptionHbn.findItSecUserOptions(editInput.getCwid());
			
			ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_CURRENCY", editInput.getCurrency());
			ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_LANGUAGE", editInput.getLanguage());
			ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_NUMBER_FORMAT", editInput.getNumberFormat());
			ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_HELP_ACTIVATE", editInput.getHelp());
			ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_SKIP_WIZARD", editInput.getSkipWizard());
			ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_TOOLTIP", editInput.getTooltip());
		}
		
		return output;
	}
*/
	
/*
	public CategoryBusinessDTO[] getCategoryBusinessList() {
		return CategoryBusinessHbn.getArrayFromList(CategoryBusinessHbn.listCategoryBusiness());
	}
*/

	public ClassDataDTO[] getClassDataList(ApplicationEditParameterInput editInput) {
		return ClassDataHbn.getArrayFromList(ClassDataHbn.findClassDataByCategoryBusiness(editInput.getCategoryBusinessId()));
	}
	
/*
	public ClassInformationDTO[] getClassInformationList() {
		return ClassInformationHbn.getArrayFromList(ClassInformationHbn.listClassInformation());
	}
	
	public ViewDataDTO getDatabaseDisplayName() {
		ViewDataDTO dto = new ViewDataDTO();
		dto.setId("1");
		dto.setText(ApplReposHbn.getDatabaseDisplayName());
		return dto;
	}
*/
}
