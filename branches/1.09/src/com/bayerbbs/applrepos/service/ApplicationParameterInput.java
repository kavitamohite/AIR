package com.bayerbbs.applrepos.service;

import java.io.Serializable;

public class ApplicationParameterInput implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4879117627848606292L;

	/** the cwid logged in*/
	String cwid;

	/** the token - session */
	String token;
	
	/** the search Action - search, myCis, myCisSubstitute */
	String searchAction;
	
	/** the query we are searching for */
	String query;
	
	/** the query mode how to search for the name */
	String queryMode;	// BEGINS_WITH, CONTAINS, EXACT (Default = CONTAINS)
	
	/** only applications */
	String onlyapplications;
	
	/** template Y = 0, N = -1, else = all */
	String template;
	
	/** advanced search true/false */
	String advancedsearch;
	
	/** advanced search parameters */
	Long advsearchObjectTypeId;
	String advsearchObjectTypeText;
	
	Long advsearchcitypeid;
	String advsearchappowner;
	String advsearchappdelegate;
	String advsearchciowner;
	String advsearchcidelegate;
	String advsearchsteward;
	String advsearchdescription;
	
	/** advanced search plus parameters */
	Long advsearchoperationalstatusid;
	Long advsearchapplicationcat2id;
	Long advsearchlifecyclestatusid;
	Long advsearchprocessid;
	
//---	
	String advsearchcountry;
	String advsearchsite;
	String advsearchbuilding;
	String advsearchroom;
	
	String sort;
	String dir;
	
	// for the ou-search
	String ciType;
	String ouUnit;
	String ciOwnerType;
	String ouQueryMode;

	// for the new advanced search
	String barRelevance;	// Y, N, U =Undefined -> null in database
	String organisationalScope;
	String itSetId;
	String itSecGroupId;
	String source;
	String businessEssentialId;
	

	/** the start index of the result */
	Long start;
	
	/** the limit how many results to return */
	Long limit;
	
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
}
