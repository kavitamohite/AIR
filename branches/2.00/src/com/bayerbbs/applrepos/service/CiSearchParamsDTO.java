package com.bayerbbs.applrepos.service;


public class CiSearchParamsDTO { //implements Serializable
	private String cwid;
	private String token;
	private Integer start;
	private Integer limit;
	private String sort;
	private String dir;
	
	private String ciNameAliasQuery;
	private String queryMode;	// BEGINS_WITH, CONTAINS, EXACT (Default = CONTAINS)
	
//	isTemplate Y = 0, N = -1, else = all
	private String isTemplate;

	private Integer ciTypeId;//tableId
	private Integer ciSubTypeId;

	private String ciOwner;
	private String ciOwnerHidden;
	private String ciOwnerDelegate;
	private String ciOwnerDelegateHidden;

	// for the new advanced search
	private String itSetId;
	private String itSecGroupId;
	private String source;
	private String businessEssentialId;
	
	
	private String ciTypeOptions;
	private String itSetOptions;

	private String ciOwnerOptions;
	private String ciOwnerDelegateOptions;

	private String itSecGroupOptions;
	private String sourceOptions;
	private String businessEssentialOptions;
	
	

	
	
	public CiSearchParamsDTO() {
	}
	
//	public CiSearchParamsDTO(String ciNameAliasQuery, Long start, Long limit) {
//		this.ciNameAliasQuery = ciNameAliasQuery;
//		this.start = start;
//		this.limit = limit;
//	}

	public String getCiNameAliasQuery() {
		return ciNameAliasQuery;
	}
	public void setCiNameAliasQuery(String ciNameAliasQuery) {
		this.ciNameAliasQuery = ciNameAliasQuery;
	}

	public Integer getStart() {
		return start;
	}
	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
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


	public String getCiOwner() {
		return ciOwner;
	}
	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}

	public String getCiOwnerDelegate() {
		return ciOwnerDelegate;
	}
	public void setCiOwnerDelegate(String ciOwnerDelegate) {
		this.ciOwnerDelegate = ciOwnerDelegate;
	}
	public void setCiOwnerDelegateHidden(String ciOwnerDelegateHidden) {
		this.ciOwnerDelegateHidden = ciOwnerDelegateHidden;
	}
	public String getCiOwnerDelegateHidden() {
		return ciOwnerDelegateHidden;
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


//	public Integer getTableId() {
//		return tableId;
//	}
//	public void setTableId(Integer tableId) {
//		this.tableId = tableId;
//	}

	public Integer getCiTypeId() {
		return ciTypeId;
	}
	public void setCiTypeId(Integer ciTypeId) {
		this.ciTypeId = ciTypeId;
	}


	public Integer getCiSubTypeId() {
		return ciSubTypeId;
	}
	public void setCiSubTypeId(Integer ciSubTypeId) {
		this.ciSubTypeId = ciSubTypeId;
	}
	

	public String getQueryMode() {
		return queryMode;
	}
	public void setQueryMode(String queryMode) {
		this.queryMode = queryMode;
	}

	
	public String getIsTemplate() {
		return isTemplate;
	}
	public void setIsTemplate(String isTemplate) {
		this.isTemplate = isTemplate;
	}

	

	
	public String getCiOwnerHidden() {
		return ciOwnerHidden;
	}
	public void setCiOwnerHidden(String ciOwnerHidden) {
		this.ciOwnerHidden = ciOwnerHidden;
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

	
	public String getItSecGroupOptions() {
		return itSecGroupOptions;
	}
	public void setItSecGroupOptions(String itSecGroupOptions) {
		this.itSecGroupOptions = itSecGroupOptions;
	}
	

//	public String getProcessOptions() {
//		return processOptions;
//	}
//	public void setProcessOptions(String processOptions) {
//		this.processOptions = processOptions;
//	}

	
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