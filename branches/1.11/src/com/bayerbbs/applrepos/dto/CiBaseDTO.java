package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class CiBaseDTO implements Serializable {
	private static final long serialVersionUID = -7096067985931326775L;
	
	private Long id;
	private Long tableId;
	private String name;
	private String alias;

	private String ciOwner;
	private String ciOwnerHidden;
	private String ciOwnerDelegate;
	private String ciOwnerDelegateHidden;

	
	// insert, update, delete attributes
	private String insertQuelle;
	private String insertTimestamp;
	private String insertUser;
	private String updateQuelle;
	private String updateTimestamp;
	private String updateUser;
	private String deleteQuelle;
	private String deleteTimestamp;
	private String deleteUser;

	private Long slaId;
	private String slaName;
	
	// compliance
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	
	private String relevanceGR1435;//ITSEC
	private String relevanceGR1920;//ICS
	
	private Long relevanceICS;
	private Long relevanzItsec;
	

	private String gxpFlag;
	private String gxpFlagId;	// falls später über id referenziert wird

	
	public CiBaseDTO() {}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public Long getTableId() {
		return tableId;
	}

	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getCiOwner() {
		return ciOwner;
	}

	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}

	public String getCiOwnerHidden() {
		return ciOwnerHidden;
	}

	public void setCiOwnerHidden(String ciOwnerHidden) {
		this.ciOwnerHidden = ciOwnerHidden;
	}

	public String getCiOwnerDelegate() {
		return ciOwnerDelegate;
	}

	public void setCiOwnerDelegate(String ciOwnerDelegate) {
		this.ciOwnerDelegate = ciOwnerDelegate;
	}

	public String getCiOwnerDelegateHidden() {
		return ciOwnerDelegateHidden;
	}

	public void setCiOwnerDelegateHidden(String ciOwnerDelegateHidden) {
		this.ciOwnerDelegateHidden = ciOwnerDelegateHidden;
	}

	public String getInsertQuelle() {
		return insertQuelle;
	}

	public void setInsertQuelle(String insertQuelle) {
		this.insertQuelle = insertQuelle;
	}

	public String getInsertTimestamp() {
		return insertTimestamp;
	}

	public void setInsertTimestamp(String insertTimestamp) {
		this.insertTimestamp = insertTimestamp;
	}

	public String getInsertUser() {
		return insertUser;
	}

	public void setInsertUser(String insertUser) {
		this.insertUser = insertUser;
	}

	public String getUpdateQuelle() {
		return updateQuelle;
	}

	public void setUpdateQuelle(String updateQuelle) {
		this.updateQuelle = updateQuelle;
	}

	public String getUpdateTimestamp() {
		return updateTimestamp;
	}

	public void setUpdateTimestamp(String updateTimestamp) {
		this.updateTimestamp = updateTimestamp;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public String getDeleteQuelle() {
		return deleteQuelle;
	}

	public void setDeleteQuelle(String deleteQuelle) {
		this.deleteQuelle = deleteQuelle;
	}

	public String getDeleteTimestamp() {
		return deleteTimestamp;
	}

	public void setDeleteTimestamp(String deleteTimestamp) {
		this.deleteTimestamp = deleteTimestamp;
	}

	public String getDeleteUser() {
		return deleteUser;
	}

	public void setDeleteUser(String deleteUser) {
		this.deleteUser = deleteUser;
	}
	
	

	public Long getSlaId() {
		return slaId;
	}

	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}

	public String getSlaName() {
		return slaName;
	}

	public void setSlaName(String slaName) {
		this.slaName = slaName;
	}


	public Long getItset() {
		return itset;
	}

	public void setItset(Long itset) {
		this.itset = itset;
	}

	public Long getTemplate() {
		return template;
	}

	public void setTemplate(Long template) {
		this.template = template;
	}

	public Long getItsecGroupId() {
		return itsecGroupId;
	}

	public void setItsecGroupId(Long itsecGroupId) {
		this.itsecGroupId = itsecGroupId;
	}

	public Long getRefId() {
		return refId;
	}

	public void setRefId(Long refId) {
		this.refId = refId;
	}

	public String getRelevanceGR1435() {
		return relevanceGR1435;
	}

	public void setRelevanceGR1435(String relevanceGR1435) {
		this.relevanceGR1435 = relevanceGR1435;
		if ("Y".equals(relevanceGR1435)) {
			setRelevanzItsec(new Long(-1));
		}
		else if ("N".equals(relevanceGR1435)) {
			setRelevanzItsec(new Long(0));
		}
	}

	public Long getRelevanzItsec() {
		return relevanzItsec;
	}

	public void setRelevanzItsec(Long relevanzItsec) {
		this.relevanzItsec = relevanzItsec;
	}
	
	
	public String getRelevanceGR1920() {
		return relevanceGR1920;
	}

	public void setRelevanceGR1920(String relevanceGR1920) {
		this.relevanceGR1920 = relevanceGR1920;
		if ("Y".equals(relevanceGR1920)) {
			setRelevanceICS(new Long(-1));
		}
		else if ("N".equals(relevanceGR1920)) {
			setRelevanceICS(new Long(0));
		}
	}
	
	public Long getRelevanceICS() {
		return relevanceICS;
	}

	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}
	

	public String getGxpFlag() {
		return gxpFlag;
	}

	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}

	public String getGxpFlagId() {
		return gxpFlagId;
	}

	public void setGxpFlagId(String gxpFlagId) {
		this.gxpFlagId = gxpFlagId;
	}
	
}