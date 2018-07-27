package com.bayerbbs.applrepos.service;


public class ApplicationSearchParamsDTO extends CiSearchParamsDTO {
	// the search Action - search, myCis, myCisSubstitute
	private String searchAction;
	private String isOnlyApplications;//onlyapplications
	
	
	// advanced search true/false
	private String isAdvSearch;//advancedsearch
	
	private String appOwner;
	private String appOwnerHidden;
	
	private String appOwnerDelegate;
	private String appOwnerDelegateHidden;
	
	private String appSteward;
	private String appStewardHidden;

	
	private String description;//advsearchdescription
	private Long operationalStatusId;//advsearchoperationalstatusid
	private Long applicationCat2Id;//advsearchapplicationcat2id
	private Long lifecycleStatusId;//advsearchlifecyclestatusid
	private Long processId;//advsearchprocessid
	

	// for the new advanced search
	private String barRelevance;	// Y, N, U =Undefined -> null in database
	private String organisationalScope;
	private String itSetId;
	private String itSecGroupId;
	private String source;
	private String businessEssentialId;
	
	
	// OU search
	private String ouCiType;//ou CI Type speichern in tableId,ciSubTypeId
	private String ouUnit;
	private String ciOwnerType;
	private String ouQueryMode;
	// OU search
	
	

	private String descriptionOptions;

	private String appOwnerOptions;
	private String appOwnerDelegateOptions;
	private String appStewardOptions;
	private String ciOwnerOptions;
	private String ciOwnerDelegateOptions;

	private String generalUsageOptions;
	private String itCategoryOptions;
	private String lifecycleStatusOptions;
	private String organisationalScopeOptions;
	private String itSecGroupOptions;
	private String processOptions;
	private String sourceOptions;
	private String businessEssentialOptions;
	// Start Adding for C0000241362
    private String complainceGR1435;
    private String complainceICS;
    
    public String getComplainceGR1435() {
		return complainceGR1435;
	}


	public void setComplainceGR1435(String complainceGR1435) {
		this.complainceGR1435 = complainceGR1435;
	}


	public String getComplainceICS() {
		return complainceICS;
	}


	public void setComplainceICS(String complainceICS) {
		this.complainceICS = complainceICS;
	}
    
    
 // End Adding for C0000241362 

	


	public ApplicationSearchParamsDTO() {
	}
	

	public String getSearchAction() {
		return searchAction;
	}

	public void setSearchAction(String searchAction) {
		this.searchAction = searchAction;
	}

//	public String getOnlyapplications() {
//		return onlyapplications;
//	}
//
//	public void setOnlyapplications(String onlyapplications) {
//		this.onlyapplications = onlyapplications;
//	}
	
	public String getIsOnlyApplications() {
		return isOnlyApplications;
	}
	public void setIsOnlyApplications(String isOnlyApplications) {
		this.isOnlyApplications = isOnlyApplications;
	}


	
//	public String getAdvancedsearch() {
//		return advancedsearch;
//	}
//
//	public void setAdvancedsearch(String advancedsearch) {
//		this.advancedsearch = advancedsearch;
//	}

	
	public String getIsAdvSearch() {
		return isAdvSearch;
	}
	public void setIsAdvSearch(String isAdvSearch) {
		this.isAdvSearch = isAdvSearch;
	}

	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public Long getOperationalStatusId() {
		return operationalStatusId;
	}
	public void setOperationalStatusId(Long operationalStatusId) {
		this.operationalStatusId = operationalStatusId;
	}

	public Long getApplicationCat2Id() {
		return applicationCat2Id;
	}
	public void setApplicationCat2Id(Long applicationCat2Id) {
		this.applicationCat2Id = applicationCat2Id;
	}

	public Long getLifecycleStatusId() {
		return lifecycleStatusId;
	}
	public void setLifecycleStatusId(Long lifecycleStatusId) {
		this.lifecycleStatusId = lifecycleStatusId;
	}

	public Long getProcessId() {
		return processId;
	}
	public void setProcessId(Long processId) {
		this.processId = processId;
	}


	public String getBarRelevance() {
		return barRelevance;
	}
	public void setBarRelevance(String barRelevance) {
		this.barRelevance = barRelevance;
	}

	public String getOrganisationalScope() {
		return organisationalScope;
	}
	public void setOrganisationalScope(String organisationalScope) {
		this.organisationalScope = organisationalScope;
	}
	
	public String getItSetId() {
		return itSetId;
	}
	public void setItSetId(String itSetId) {
		this.itSetId = itSetId;
	}

	public String getItSecGroupId() {
		return itSecGroupId;
	}
	public void setItSecGroupId(String itSecGroupId) {
		this.itSecGroupId = itSecGroupId;
	}

	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}	
	
	public String getBusinessEssentialId() {
		return businessEssentialId;
	}
	public void setBusinessEssentialId(String businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}
	


	public String getDescriptionOptions() {
		return descriptionOptions;
	}

	public void setDescriptionOptions(String descriptionOptions) {
		this.descriptionOptions = descriptionOptions;
	}
	
	
	public String getAppOwner() {
		return appOwner;
	}
	public void setAppOwner(String appOwner) {
		this.appOwner = appOwner;
	}

	public String getAppOwnerHidden() {
		return appOwnerHidden;
	}
	public void setAppOwnerHidden(String appOwnerHidden) {
		this.appOwnerHidden = appOwnerHidden;
	}

	public String getAppOwnerDelegate() {
		return appOwnerDelegate;
	}
	public void setAppOwnerDelegate(String appOwnerDelegate) {
		this.appOwnerDelegate = appOwnerDelegate;
	}

	public String getAppOwnerDelegateHidden() {
		return appOwnerDelegateHidden;
	}
	public void setAppOwnerDelegateHidden(String appOwnerDelegateHidden) {
		this.appOwnerDelegateHidden = appOwnerDelegateHidden;
	}

	public String getAppSteward() {
		return appSteward;
	}
	public void setAppSteward(String appSteward) {
		this.appSteward = appSteward;
	}

	public String getAppStewardHidden() {
		return appStewardHidden;
	}
	public void setAppStewardHidden(String appStewardHidden) {
		this.appStewardHidden = appStewardHidden;
	}
	
	public String getOuUnit() {
		return ouUnit;
	}
	public void setOuUnit(String ouUnit) {
		this.ouUnit = ouUnit;
	}

	public String getOuQueryMode() {
		return ouQueryMode;
	}
	public void setOuQueryMode(String ouQueryMode) {
		this.ouQueryMode = ouQueryMode;
	}
	public String getOuCiType() {
		return ouCiType;
	}
	public void setOuCiType(String ouCiType) {
		this.ouCiType = ouCiType;
	}
	public String getCiOwnerType() {
		return ciOwnerType;
	}
	public void setCiOwnerType(String ciOwnerType) {
		this.ciOwnerType = ciOwnerType;
	}


	public String getAppOwnerOptions() {
		return appOwnerOptions;
	}

	public void setAppOwnerOptions(String appOwnerOptions) {
		this.appOwnerOptions = appOwnerOptions;
	}

	public String getAppOwnerDelegateOptions() {
		return appOwnerDelegateOptions;
	}

	public void setAppOwnerDelegateOptions(String appOwnerDelegateOptions) {
		this.appOwnerDelegateOptions = appOwnerDelegateOptions;
	}

	public String getAppStewardOptions() {
		return appStewardOptions;
	}

	public void setAppStewardOptions(String appStewardOptions) {
		this.appStewardOptions = appStewardOptions;
	}

	public String getCiOwnerOptions() {
		return ciOwnerOptions;
	}

	public void setCiOwnerOptions(String ciOwnerOptions) {
		this.ciOwnerOptions = ciOwnerOptions;
	}

	public String getCiOwnerDelegateOptions() {
		return ciOwnerDelegateOptions;
	}

	public void setCiOwnerDelegateOptions(String ciOwnerDelegateOptions) {
		this.ciOwnerDelegateOptions = ciOwnerDelegateOptions;
	}

	public String getGeneralUsageOptions() {
		return generalUsageOptions;
	}

	public void setGeneralUsageOptions(String generalUsageOptions) {
		this.generalUsageOptions = generalUsageOptions;
	}

	public String getItCategoryOptions() {
		return itCategoryOptions;
	}

	public void setItCategoryOptions(String itCategoryOptions) {
		this.itCategoryOptions = itCategoryOptions;
	}

	public String getLifecycleStatusOptions() {
		return lifecycleStatusOptions;
	}

	public void setLifecycleStatusOptions(String lifecycleStatusOptions) {
		this.lifecycleStatusOptions = lifecycleStatusOptions;
	}

	public String getOrganisationalScopeOptions() {
		return organisationalScopeOptions;
	}

	public void setOrganisationalScopeOptions(String organisationalScopeOptions) {
		this.organisationalScopeOptions = organisationalScopeOptions;
	}

	public String getItSecGroupOptions() {
		return itSecGroupOptions;
	}

	public void setItSecGroupOptions(String itSecGroupOptions) {
		this.itSecGroupOptions = itSecGroupOptions;
	}

	public String getProcessOptions() {
		return processOptions;
	}

	public void setProcessOptions(String processOptions) {
		this.processOptions = processOptions;
	}

	public String getSourceOptions() {
		return sourceOptions;
	}

	public void setSourceOptions(String sourceOptions) {
		this.sourceOptions = sourceOptions;
	}

	public String getBusinessEssentialOptions() {
		return businessEssentialOptions;
	}

	public void setBusinessEssentialOptions(String businessEssentialOptions) {
		this.businessEssentialOptions = businessEssentialOptions;
	}


	
}
