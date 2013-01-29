package com.bayerbbs.applrepos.service;

public class RoomEditParameterInput {

	private String cwid;
	private String token;
	

	// basic
	private Long id;
	private String name;
	private String alias;

	private String floor;
	
	private Long areaId;
	
	private String ciOwner;
	private String ciOwnerHidden;
	private String ciOwnerDelegate;
	private String ciOwnerDelegateHidden;
	
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	
	private Long relevanceICS;
	private Long relevanzITSEC;
	private String gxpFlag;
	private String gxpFlagId;	// falls später über id referenziert wird


	
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
	public String getFloor() {
		return floor;
	}
	public void setFloor(String floor) {
		this.floor = floor;
	}
	public Long getAreaId() {
		return areaId;
	}
	public void setAreaId(Long areaId) {
		this.areaId = areaId;
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
	public Long getRelevanceICS() {
		return relevanceICS;
	}
	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}
	public Long getRelevanzITSEC() {
		return relevanzITSEC;
	}
	public void setRelevanzITSEC(Long relevanzITSEC) {
		this.relevanzITSEC = relevanzITSEC;
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
