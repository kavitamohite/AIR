package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "DWH_ENTITY")
@NamedQueries({
	@NamedQuery(name="findDwhEntityByNameOrAlias", query="FROM DwhEntity d WHERE UPPER(d.ciName)=:name OR UPPER(d.ciAlias)=:alias OR UPPER(d.ciName)=:alias OR UPPER(d.ciAlias)=:name"),
	@NamedQuery(name="findDwhEntityByNameOrAliasLike", query="FROM DwhEntity d WHERE UPPER(d.ciName) LIKE :name OR UPPER(d.ciAlias) LIKE :alias OR UPPER(d.ciName) LIKE :alias OR UPPER(d.ciAlias) LIKE :name"),// AND d.tableId IN(:typeList)
	@NamedQuery(name="findDwhEntityByNameOrAliasLikeCount", query="SELECT COUNT(d) FROM DwhEntity d WHERE UPPER(d.ciName) LIKE :name OR UPPER(d.ciAlias) LIKE :alias OR UPPER(d.ciName) LIKE :alias OR UPPER(d.ciAlias) LIKE :name"),// AND d.tableId IN(:typeList)

	
	@NamedQuery(name="findDwhEntityByNameOrAliasWithDeleted", query="FROM DwhEntity d WHERE UPPER(d.ciName)=:name OR UPPER(d.ciAlias)=:alias OR UPPER(d.ciName)=:alias OR UPPER(d.ciAlias)=:name AND d.deleted = 'Yes'"),
	@NamedQuery(name="findDwhEntityByNameOrAliasLikeWithDeleted", query="FROM DwhEntity d WHERE UPPER(d.ciName) LIKE :name OR UPPER(d.ciAlias) LIKE :alias OR UPPER(d.ciName) LIKE :alias OR UPPER(d.ciAlias) LIKE :name AND d.deleted = 'Yes'")

})

public class DwhEntity {
	private Long ciId;
//	private Long ciType;
	private String ciName;
	private String ciAlias;
	private String ciType;
	private String dwhEntityId;
	private Integer tableId;
	private String ciOwner;
	private String ciOwnerDelegate;
	private String appOwner;
	private String appOwnerDelegate;
	private String appSteward;
	private String categoryIt;
	private String location;
	private String lifecycleStatus;
	private String source;
	private String template;
	
	private String deleted;
	
	
//	private String operationalStatus;
//	private String gxpRelevance;
//	private String itSet;
//	private String serviceContract;
//	private String severityLevel;
//	private String priorityLevel;
//	private String sla;
	private String businessEssential;
	
	@Column(name = "CI_ID")
	public Long getCiId() {
		return ciId;
	}
	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}
	
//	@Column(name = "AREA_NAME")
//	public Long getCiType() {
//		return ciType;
//	}
//	public void setCiType(Long ciType) {
//		this.ciType = ciType;
//	}
	
	@Column(name = "NAME")
	public String getCiName() {
		return ciName;
	}
	public void setCiName(String ciName) {
		this.ciName = ciName;
	}
	
	@Column(name = "ASSET_ID_OR_ALIAS")
	public String getCiAlias() {
		return ciAlias;
	}
	public void setCiAlias(String ciAlias) {
		this.ciAlias = ciAlias;
	}
	
	@Id
	@Column(name = "ID")
	public String getDwhEntityId() {
		return dwhEntityId;
	}
	public void setDwhEntityId(String dwhEntityId) {
		this.dwhEntityId = dwhEntityId;
	}

	
	@Column(name = "TABLE_ID")
	public Integer getTableId() {
		return tableId;
	}
	public void setTableId(Integer tableId) {
		this.tableId = tableId;
	}
	
	
	@Column(name = "RESPONSIBLE")
	public String getCiOwner() {
		return ciOwner;
	}
	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}
	
	@Column(name = "SUB_RESPONSIBLE")
	public String getCiOwnerDelegate() {
		return ciOwnerDelegate;
	}
	public void setCiOwnerDelegate(String ciOwnerDelegate) {
		this.ciOwnerDelegate = ciOwnerDelegate;
	}
	
	@Column(name = "APP_OWNER")
	public String getAppOwner() {
		return appOwner;
	}
	public void setAppOwner(String appOwner) {
		this.appOwner = appOwner;
	}
	
	@Column(name = "APP_OWNER_DELEGATE")
	public String getAppOwnerDelegate() {
		return appOwnerDelegate;
	}
	public void setAppOwnerDelegate(String appOwnerDelegate) {
		this.appOwnerDelegate = appOwnerDelegate;
	}
	
	@Column(name = "APP_STEWARD")
	public String getAppSteward() {
		return appSteward;
	}
	public void setAppSteward(String appSteward) {
		this.appSteward = appSteward;
	}
	
	@Column(name = "CATEGORY")
	public String getCategoryIt() {
		return categoryIt;
	}
	public void setCategoryIt(String categoryIt) {
		this.categoryIt = categoryIt;
	}
	
	
	@Column(name = "LIFECYCLE")
	public String getLifecycleStatus() {
		return lifecycleStatus;
	}
	public void setLifecycleStatus(String lifecycleStatus) {
		this.lifecycleStatus = lifecycleStatus;
	}
	
	@Column(name = "SOURCE")
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	
	@Column(name = "TEMPLATE")
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
		return businessEssential;
	}
	public void setBusinessEssential(String businessEssential) {
		this.businessEssential = businessEssential;
	}
	
	
	@Column(name = "DELETED")
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	
	@Column(name = "TYPE")
	public String getCiType() {
		return ciType;
	}
	public void setCiType(String ciType) {
		this.ciType = ciType;
	}
	
	@Column(name = "LOCATION")
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}


}