package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.domain.DwhEntity;


public class CiItemDTO { //implements Serializable
	private Long id;
    private String name;
    private String alias;
    private String applicationCat1Txt;
    private String applicationCat2Txt;
    private String location;
	private Integer tableId;
	private String typeName;
	
//	isTemplate Y = -1, N = 0, else = all
	private String isTemplate;

//	private Integer ciTypeId;//tableId
//	private Integer ciSubTypeId;

	private String ciOwner;
	private String ciOwnerHidden;
	private String ciOwnerDelegate;
	private String ciOwnerDelegateHidden;
	
	//------- Zusatzfelder für CI Anwendung für die CiResultGrid Suchergebnistabelle und reactivation check (deleteQuelle) --------
	private String applicationOwner;
	private String applicationOwnerHidden;
	private String applicationOwnerDelegate;
	private String applicationOwnerDelegateHidden;
	private String applicationSteward;
	private String applicationStewardHidden;
	private String deleteQuelle;
	//------- Zusatzfelder für CI Anwendung für die CiResultGrid Suchergebnistabelle und reactivation check (deleteQuelle) --------

	// for the new advanced search;
//	private String itSetId;
//	private String itSecGroupId;
//	private String source;
//	private String businessEssentialId;
	
	
	//Added by vandana
	private String providerName;
	private String providerAddress;
	private String itHead;
	public CiItemDTO() {
	}

	public CiItemDTO(DwhEntity dwhEntity) {
		setId(dwhEntity.getCiId());
		setName(dwhEntity.getCiName());
		setAlias(dwhEntity.getCiAlias());
		setTypeName(dwhEntity.getCiType());
		setCiOwner(dwhEntity.getCiOwner());
		setCiOwnerDelegate(dwhEntity.getCiOwnerDelegate());
		setApplicationCat1Txt(dwhEntity.getCiType());
		setApplicationCat2Txt(dwhEntity.getCategoryIt());
		setLocation(dwhEntity.getLocation());
		setApplicationOwner(dwhEntity.getAppOwner());
		setApplicationOwnerDelegate(dwhEntity.getAppOwnerDelegate());
		setApplicationSteward(dwhEntity.getAppSteward());
		setDeleteQuelle(dwhEntity.getDeleted());
		setTableId(dwhEntity.getTableId());
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public String getApplicationCat1Txt() {
		return applicationCat1Txt;
	}
	public void setApplicationCat1Txt(String applicationCat1Txt) {
		this.applicationCat1Txt = applicationCat1Txt;
	}
	public String getApplicationCat2Txt() {
		return applicationCat2Txt;
	}
	public void setApplicationCat2Txt(String applicationCat2Txt) {
		this.applicationCat2Txt = applicationCat2Txt;
	}
    public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Integer getTableId() {
		return tableId;
	}
	public void setTableId(Integer tableId) {
		this.tableId = tableId;
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
	public void setCiOwnerDelegateHidden(String ciOwnerDelegateHidden) {
		this.ciOwnerDelegateHidden = ciOwnerDelegateHidden;
	}
	public String getCiOwnerDelegateHidden() {
		return ciOwnerDelegateHidden;
	}

	public String getApplicationOwner() {
		return applicationOwner;
	}
	public void setApplicationOwner(String applicationOwner) {
		this.applicationOwner = applicationOwner;
	}
	public String getApplicationOwnerHidden() {
		return applicationOwnerHidden;
	}
	public void setApplicationOwnerHidden(String applicationOwnerHidden) {
		this.applicationOwnerHidden = applicationOwnerHidden;
	}
	public String getApplicationOwnerDelegate() {
		return applicationOwnerDelegate;
	}
	public void setApplicationOwnerDelegate(String applicationOwnerDelegate) {
		this.applicationOwnerDelegate = applicationOwnerDelegate;
	}
	public String getApplicationOwnerDelegateHidden() {
		return applicationOwnerDelegateHidden;
	}
	public void setApplicationOwnerDelegateHidden(
			String applicationOwnerDelegateHidden) {
		this.applicationOwnerDelegateHidden = applicationOwnerDelegateHidden;
	}
	public String getApplicationSteward() {
		return applicationSteward;
	}
	public void setApplicationSteward(String applicationSteward) {
		this.applicationSteward = applicationSteward;
	}
	public String getApplicationStewardHidden() {
		return applicationStewardHidden;
	}
	public void setApplicationStewardHidden(String applicationStewardHidden) {
		this.applicationStewardHidden = applicationStewardHidden;
	}
	public String getDeleteQuelle() {
		return deleteQuelle;
	}
	public void setDeleteQuelle(String deleteQuelle) {
		this.deleteQuelle = deleteQuelle;
	}


	public String getIsTemplate() {
		return isTemplate;
	}
	public void setIsTemplate(String isTemplate) {
		this.isTemplate = isTemplate;
	}

//Added by vandna
	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}

	public String getProviderAddress() {
		return providerAddress;
	}


	public void setProviderAddress(String providerAddress) {
		this.providerAddress = providerAddress;
	}

	public String getItHead() {
		return itHead;
	}


	public void setItHead(String itHead) {
		this.itHead = itHead;
	}

	/**
	 * @return the typeName
	 */
	public String getTypeName() {
		return typeName;
	}

	/**
	 * @param typeName the typeName to set
	 */
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
	
	
	
	//added by vandana
	
	

}