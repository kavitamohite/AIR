package com.bayerbbs.applrepos.dto;

public class DwhEntityDTO {
	private String ciId;
	private String ciType;
	private String ciName;
	private String ciAlias;
	private String dwhEntityId;
	private String tableId;
	private String ciOwner;
	private String ciOwnerDelegate;
	private String appOwner;
	private String appOwnerDelegate;
	private String appSteward;
	private String categoryIt;
	private String lifecycleStatus;
	private String source;
	private String template;
	
	private boolean isReferenced;
	
//	private String operationalStatus;
//	private String gxpRelevance;
//	private String itSet;
//	private String serviceContract;
//	private String severityLevel;
//	private String priorityLevel;
//	private String sla;
private String businessEssential;
	
	
	public String getCiId() {
		return ciId;
	}
	public void setCiId(String ciId) {
		this.ciId = ciId;
	}
	public String getCiType() {
		return ciType;
	}
	public void setCiType(String ciType) {
		this.ciType = ciType;
	}
	public String getCiName() {
		return ciName;
	}
	public void setCiName(String ciName) {
		this.ciName = ciName;
	}
	public void setCiAlias(String ciAlias) {
		this.ciAlias = ciAlias;
	}
	public String getCiAlias() {
		return ciAlias;
	}
	public void setDwhEntityId(String dwhEntityId) {
		this.dwhEntityId = dwhEntityId;
	}
	public String getDwhEntityId() {
		return dwhEntityId;
	}
	public String getTableId() {
		return tableId;
	}
	public void setTableId(String tableId) {
		this.tableId = tableId;
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
	public String getAppOwner() {
		return appOwner;
	}
	public void setAppOwner(String appOwner) {
		this.appOwner = appOwner;
	}
	public String getAppOwnerDelegate() {
		return appOwnerDelegate;
	}
	public void setAppOwnerDelegate(String appOwnerDelegate) {
		this.appOwnerDelegate = appOwnerDelegate;
	}
	public String getAppSteward() {
		return appSteward;
	}
	public void setAppSteward(String appSteward) {
		this.appSteward = appSteward;
	}
	public String getCategoryIt() {
		return categoryIt;
	}
	public void setCategoryIt(String categoryIt) {
		this.categoryIt = categoryIt;
	}
	public String getLifecycleStatus() {
		return lifecycleStatus;
	}
	public void setLifecycleStatus(String lifecycleStatus) {
		this.lifecycleStatus = lifecycleStatus;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getTemplate() {
		return template;
	}
	public void setTemplate(String template) {
		this.template = template;
	}
//	public String getOperationalStatus() {
//		return operationalStatus;
//	}
//	public void setOperationalStatus(String operationalStatus) {
//		this.operationalStatus = operationalStatus;
//	}
//	public String getGxpRelevance() {
//		return gxpRelevance;
//	}
//	public void setGxpRelevance(String gxpRelevance) {
//		this.gxpRelevance = gxpRelevance;
//	}
//	public String getItSet() {
//		return itSet;
//	}
//	public void setItSet(String itSet) {
//		this.itSet = itSet;
//	}
//	public String getServiceContract() {
//		return serviceContract;
//	}
//	public void setServiceContract(String serviceContract) {
//		this.serviceContract = serviceContract;
//	}
//	public String getSeverityLevel() {
//		return severityLevel;
//	}
//	public void setSeverityLevel(String severityLevel) {
//		this.severityLevel = severityLevel;
//	}
//	public String getPriorityLevel() {
//		return priorityLevel;
//	}
//	public void setPriorityLevel(String priorityLevel) {
//		this.priorityLevel = priorityLevel;
//	}
//	public String getSla() {
//		return sla;
//	}
//	public void setSla(String sla) {
//		this.sla = sla;
//	}
	public String getBusinessEssential() {
		return businessEssential;	}
	public void setBusinessEssential(String businessEssential) {
		this.businessEssential = businessEssential;
	}
	public void setIsReferenced(boolean isReferenced) {
		this.isReferenced = isReferenced;
	}
	public boolean getIsReferenced() {
		return isReferenced;
	}
}