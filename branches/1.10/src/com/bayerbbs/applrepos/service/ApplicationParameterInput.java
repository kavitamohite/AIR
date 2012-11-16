package com.bayerbbs.applrepos.service;

import java.io.Serializable;

public class ApplicationParameterInput implements Serializable {
	private static final long serialVersionUID = -4879117627848606292L;

	private String cwid;
	private String token;
	
	/** the search Action - search, myCis, myCisSubstitute */
	private String searchAction;
	private String query;
	private String queryMode;	// BEGINS_WITH, CONTAINS, EXACT (Default = CONTAINS)
	private String onlyapplications;
	
	/** template Y = 0, N = -1, else = all */
	private String template;
	
	/** advanced search true/false */
	private String advancedsearch;
	
	/** advanced search parameters */
	private Long advsearchObjectTypeId;
	private String advsearchObjectTypeText;
	
	private Long advsearchcitypeid;
	private String advsearchappowner;
	private String advsearchappdelegate;
	private String advsearchappdelegateHidden;
	private String advsearchciowner;
	private String advsearchcidelegate;
	private String advsearchcidelegateHidden;
	private String advsearchsteward;
	private String advsearchdescription;
	
	/** advanced search plus parameters */
	private Long advsearchoperationalstatusid;
	private Long advsearchapplicationcat2id;
	private Long advsearchlifecyclestatusid;
	private Long advsearchprocessid;
	
//---	
	private String advsearchcountry;
	private String advsearchsite;
	private String advsearchbuilding;
	private String advsearchroom;
	
	private Long start;
	private Long limit;
	private String sort;
	private String dir;
	
	// for the ou-search
	private String ciType;
	private String ouUnit;
	private String ciOwnerType;
	private String ouQueryMode;

	// for the new advanced search
	private String barRelevance;	// Y, N, U =Undefined -> null in database
	private String organisationalScope;
	private String itSetId;
	private String itSecGroupId;
	private String source;
	private String businessEssentialId;
	
	
	private String ciTypeOptions;
	private String itSetOptions;
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


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	
	public ApplicationParameterInput() {
	}
	
	public ApplicationParameterInput(String query, Long start, Long limit) {
		this.query = query;
		this.start = start;
		this.limit = limit;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public Long getStart() {
		return start;
	}

	public void setStart(Long start) {
		this.start = start;
	}

	public Long getLimit() {
		return limit;
	}

	public void setLimit(Long limit) {
		this.limit = limit;
	}

	public String getCwid() {
		return cwid;
	}

	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getSearchAction() {
		return searchAction;
	}

	public void setSearchAction(String searchAction) {
		this.searchAction = searchAction;
	}

	public String getOnlyapplications() {
		return onlyapplications;
	}

	public void setOnlyapplications(String onlyapplications) {
		this.onlyapplications = onlyapplications;
	}

	public String getAdvancedsearch() {
		return advancedsearch;
	}

	public void setAdvancedsearch(String advancedsearch) {
		this.advancedsearch = advancedsearch;
	}

	public String getAdvsearchciowner() {
		return advsearchciowner;
	}

	public void setAdvsearchciowner(String advsearchciowner) {
		this.advsearchciowner = advsearchciowner;
	}

	public String getAdvsearchcidelegate() {
		return advsearchcidelegate;
	}
	public void setAdvsearchcidelegate(String advsearchcidelegate) {
		this.advsearchcidelegate = advsearchcidelegate;
	}
	public void setAdvsearchcidelegateHidden(String advsearchcidelegateHidden) {
		this.advsearchcidelegateHidden = advsearchcidelegateHidden;
	}
	public String getAdvsearchcidelegateHidden() {
		return advsearchcidelegateHidden;
	}
	
	public void setAdvsearchappdelegateHidden(String advsearchappdelegateHidden) {
		this.advsearchappdelegateHidden = advsearchappdelegateHidden;
	}
	public String getAdvsearchappdelegateHidden() {
		return advsearchappdelegateHidden;
	}

	public String getAdvsearchcountry() {
		return advsearchcountry;
	}

	public void setAdvsearchcountry(String advsearchcountry) {
		this.advsearchcountry = advsearchcountry;
	}

	public String getAdvsearchsite() {
		return advsearchsite;
	}

	public void setAdvsearchsite(String advsearchsite) {
		this.advsearchsite = advsearchsite;
	}

	public String getAdvsearchbuilding() {
		return advsearchbuilding;
	}

	public void setAdvsearchbuilding(String advsearchbuilding) {
		this.advsearchbuilding = advsearchbuilding;
	}

	public String getAdvsearchroom() {
		return advsearchroom;
	}

	public void setAdvsearchroom(String advsearchroom) {
		this.advsearchroom = advsearchroom;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public Long getAdvsearchcitypeid() {
		return advsearchcitypeid;
	}

	public void setAdvsearchcitypeid(Long advsearchcitypeid) {
		this.advsearchcitypeid = advsearchcitypeid;
	}

	public String getAdvsearchdescription() {
		return advsearchdescription;
	}

	public void setAdvsearchdescription(String advsearchdescription) {
		this.advsearchdescription = advsearchdescription;
	}

	public Long getAdvsearchoperationalstatusid() {
		return advsearchoperationalstatusid;
	}

	public void setAdvsearchoperationalstatusid(Long advsearchoperationalstatusid) {
		this.advsearchoperationalstatusid = advsearchoperationalstatusid;
	}

	public Long getAdvsearchapplicationcat2id() {
		return advsearchapplicationcat2id;
	}

	public void setAdvsearchapplicationcat2id(Long advsearchapplicationcat2id) {
		this.advsearchapplicationcat2id = advsearchapplicationcat2id;
	}

	public Long getAdvsearchlifecyclestatusid() {
		return advsearchlifecyclestatusid;
	}

	public void setAdvsearchlifecyclestatusid(Long advsearchlifecyclestatusid) {
		this.advsearchlifecyclestatusid = advsearchlifecyclestatusid;
	}

	public Long getAdvsearchprocessid() {
		return advsearchprocessid;
	}

	public void setAdvsearchprocessid(Long advsearchprocessid) {
		this.advsearchprocessid = advsearchprocessid;
	}

	public String getAdvsearchappowner() {
		return advsearchappowner;
	}

	public void setAdvsearchappowner(String advsearchappowner) {
		this.advsearchappowner = advsearchappowner;
	}

	public String getAdvsearchappdelegate() {
		return advsearchappdelegate;
	}

	public void setAdvsearchappdelegate(String advsearchappdelegate) {
		this.advsearchappdelegate = advsearchappdelegate;
	}

	public Long getAdvsearchObjectTypeId() {
		return advsearchObjectTypeId;
	}

	public void setAdvsearchObjectTypeId(Long advsearchObjectTypeId) {
		this.advsearchObjectTypeId = advsearchObjectTypeId;
	}

	public String getAdvsearchObjectTypeText() {
		return advsearchObjectTypeText;
	}

	public void setAdvsearchObjectTypeText(String advsearchObjectTypeText) {
		this.advsearchObjectTypeText = advsearchObjectTypeText;
	}

	public String getQueryMode() {
		return queryMode;
	}

	public void setQueryMode(String queryMode) {
		this.queryMode = queryMode;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
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

	public String getCiType() {
		return ciType;
	}

	public void setCiType(String ciType) {
		this.ciType = ciType;
	}

	public String getCiOwnerType() {
		return ciOwnerType;
	}

	public void setCiOwnerType(String ciOwnerType) {
		this.ciOwnerType = ciOwnerType;
	}

	public String getAdvsearchsteward() {
		return advsearchsteward;
	}

	public void setAdvsearchsteward(String advsearchsteward) {
		this.advsearchsteward = advsearchsteward;
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
	

	public String getCiTypeOptions() {
		return ciTypeOptions;
	}

	public void setCiTypeOptions(String ciTypeOptions) {
		this.ciTypeOptions = ciTypeOptions;
	}

	public String getItSetOptions() {
		return itSetOptions;
	}

	public void setItSetOptions(String itSetOptions) {
		this.itSetOptions = itSetOptions;
	}

	public String getDescriptionOptions() {
		return descriptionOptions;
	}

	public void setDescriptionOptions(String descriptionOptions) {
		this.descriptionOptions = descriptionOptions;
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
