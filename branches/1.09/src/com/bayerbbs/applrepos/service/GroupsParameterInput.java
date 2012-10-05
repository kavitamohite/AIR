package com.bayerbbs.applrepos.service;

public class GroupsParameterInput {

	private String groupName;	// the search parameter
	
	private String impactedBusinessGroup;
	private String changeTeam;
	private String ciOwner;
	private String escalationList;
	private String implementationTeam;
	private String owningBusinessGroup;
	private String serviceCoordinator;
	private String supportGroupIMResolver;
	
	private String managerCWID;
	private String fullLikeSearch;
	
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getImpactedBusinessGroup() {
		return impactedBusinessGroup;
	}
	public void setImpactedBusinessGroup(String impactedBusinessGroup) {
		this.impactedBusinessGroup = impactedBusinessGroup;
	}
	public String getChangeTeam() {
		return changeTeam;
	}
	public void setChangeTeam(String changeTeam) {
		this.changeTeam = changeTeam;
	}
	public String getCiOwner() {
		return ciOwner;
	}
	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}
	public String getEscalationList() {
		return escalationList;
	}
	public void setEscalationList(String escalationList) {
		this.escalationList = escalationList;
	}
	public String getImplementationTeam() {
		return implementationTeam;
	}
	public void setImplementationTeam(String implementationTeam) {
		this.implementationTeam = implementationTeam;
	}
	public String getOwningBusinessGroup() {
		return owningBusinessGroup;
	}
	public void setOwningBusinessGroup(String owningBusinessGroup) {
		this.owningBusinessGroup = owningBusinessGroup;
	}
	public String getServiceCoordinator() {
		return serviceCoordinator;
	}
	public void setServiceCoordinator(String serviceCoordinator) {
		this.serviceCoordinator = serviceCoordinator;
	}
	public String getSupportGroupIMResolver() {
		return supportGroupIMResolver;
	}
	public void setSupportGroupIMResolver(String supportGroupIMResolver) {
		this.supportGroupIMResolver = supportGroupIMResolver;
	}
	public String getManagerCWID() {
		return managerCWID;
	}
	public void setManagerCWID(String managerCWID) {
		this.managerCWID = managerCWID;
	}
	public String getFullLikeSearch() {
		return fullLikeSearch;
	}
	public void setFullLikeSearch(String fullLikeSearch) {
		this.fullLikeSearch = fullLikeSearch;
	}
	
}
