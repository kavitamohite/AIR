/**
 * 
 */
package com.bayerbbs.applrepos.service;

/**
 * @author equuw
 *
 */
public class MassUpdateChangeAttrParameterInput {
	private String token;
	private String cwid;
	private Long ciTypeId;
	private String selectedCIs;
	
	private String comments;
	private Long applicationCat2Id;
	private Long lifecycleStatusId;
	private Long operationalStatusId;
	private String clusterCode;
	private String clusterType;
	// agreements
	//private Long slaId;
	private Long priorityLevelId;
	//private Long serviceContractId;
	private Long severityLevelId;
	
	//Protections
	private Long itSecSbAvailability;
	private String itSecSbAvailabilityTxt;
	
	private Long itSecSbIntegrityId;
	private String itSecSbIntegrityTxt;

	private Long itSecSbConfidentialityId;
	private String itSecSbConfidentialityTx;
	
	private Long classInformationId;
	private String classInformationExplanation;
	
	private Long itsecGroupId;
	private String applicationOwner;
	private String applicationDelegate;
	private String applicationSteward;
	private String applicationDelegateHidden;
	private String ciOwnerPrimaryPerson;
	private String ciOwnerDelegate;
	private String ciOwnerDelegateHidden;
	
	private Long categoryBusinessId;
	private Long classDataId;
	private String organisationalScope;
	
	private Long relevanceICS;
	private Long relevanzITSEC;
	// compliance request
	private String relevanceGR1435;
	private String relevanceGR1920;
	private String relevanceGR2059;
	private String relevanceGR2008;
	//EUGXS
	//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
	private String relevanceCD3010;
	private String relevanceCD3011;
	public String getRelevanceCD3010() {
		return relevanceCD3010;
	}
	public void setRelevanceCD3010(String relevanceCD3010) {
		this.relevanceCD3010 = relevanceCD3010;
	}
	public String getRelevanceCD3011() {
		return relevanceCD3011;
	}
	public void setRelevanceCD3011(String relevanceCD3011) {
		this.relevanceCD3011 = relevanceCD3011;
	}
	private String gxpFlag;
	private String gxpFlagId;	// falls später über id referenziert wird
	
	private Integer osNameId;
	private String isVirtualHardwareClient;
	private String isVirtualHardwareHost;
	private String virtualHardwareSoftware;
	private Integer primaryFunctionId;
	private String barRelevance;
	private String version;
	private Long businessEssentialId;
	/**
	 * @return the token
	 */
	public String getToken() {
		return token;
	}
	/**
	 * @param token the token to set
	 */
	public void setToken(String token) {
		this.token = token;
	}
	/**
	 * @return the cwid
	 */
	public String getCwid() {
		return cwid;
	}
	/**
	 * @param cwid the cwid to set
	 */
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	/**
	 * @return the ciTypeId
	 */
	public Long getCiTypeId() {
		return ciTypeId;
	}
	/**
	 * @param ciTypeId the ciTypeId to set
	 */
	public void setCiTypeId(Long ciTypeId) {
		this.ciTypeId = ciTypeId;
	}
	/**
	 * @return the selectedCIs
	 */
	public String getSelectedCIs() {
		return selectedCIs;
	}
	/**
	 * @param selectedCIs the selectedCIs to set
	 */
	public void setSelectedCIs(String selectedCIs) {
		this.selectedCIs = selectedCIs;
	}
	/**
	 * @return the applicationCat2Id
	 */
	public Long getApplicationCat2Id() {
		return applicationCat2Id;
	}
	/**
	 * @param applicationCat2Id the applicationCat2Id to set
	 */
	public void setApplicationCat2Id(Long applicationCat2Id) {
		this.applicationCat2Id = applicationCat2Id;
	}
	/**
	 * @return the lifecycleStatusId
	 */
	public Long getLifecycleStatusId() {
		return lifecycleStatusId;
	}
	/**
	 * @param lifecycleStatusId the lifecycleStatusId to set
	 */
	public void setLifecycleStatusId(Long lifecycleStatusId) {
		this.lifecycleStatusId = lifecycleStatusId;
	}
	/**
	 * @return the operationalStatusId
	 */
	public Long getOperationalStatusId() {
		return operationalStatusId;
	}
	/**
	 * @param operationalStatusId the operationalStatusId to set
	 */
	public void setOperationalStatusId(Long operationalStatusId) {
		this.operationalStatusId = operationalStatusId;
	}
	
	/**
	 * @return the clusterCode
	 */
	public String getClusterCode() {
		return clusterCode;
	}
	/**
	 * @param clusterCode the clusterCode to set
	 */
	public void setClusterCode(String clusterCode) {
		this.clusterCode = clusterCode;
	}
	/**
	 * @return the clusterType
	 */
	public String getClusterType() {
		return clusterType;
	}
	/**
	 * @param clusterType the clusterType to set
	 */
	public void setClusterType(String clusterType) {
		this.clusterType = clusterType;
	}
	/**
	 * @return the slaId
	 */
/*	public Long getSlaId() {
		return slaId;
	}
	*//**
	 * @param slaId the slaId to set
	 *//*
	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}*/
	/**
	 * @return the priorityLevelId
	 */
	public Long getPriorityLevelId() {
		return priorityLevelId;
	}
	/**
	 * @param priorityLevelId the priorityLevelId to set
	 */
	public void setPriorityLevelId(Long priorityLevelId) {
		this.priorityLevelId = priorityLevelId;
	}
	/**
	 * @return the serviceContractId
	 */
	/*public Long getServiceContractId() {
		return serviceContractId;
	}*/
	/**
	 * @param serviceContractId the serviceContractId to set
	 */
	/*public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}*/
	/**
	 * @return the severityLevelId
	 */
	/*public Long getSeverityLevelId() {
		return severityLevelId;
	}*/
	/**
	 * @param severityLevelId the severityLevelId to set
	 */
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}
	/**
	 * @return the itSecSbAvailability
	 */
	public Long getItSecSbAvailability() {
		return itSecSbAvailability;
	}
	/**
	 * @param itSecSbAvailability the itSecSbAvailability to set
	 */
	public void setItSecSbAvailability(Long itSecSbAvailability) {
		this.itSecSbAvailability = itSecSbAvailability;
	}
	/**
	 * @return the itSecSbAvailabilityTxt
	 */
	public String getItSecSbAvailabilityTxt() {
		return itSecSbAvailabilityTxt;
	}
	/**
	 * @param itSecSbAvailabilityTxt the itSecSbAvailabilityTxt to set
	 */
	public void setItSecSbAvailabilityTxt(String itSecSbAvailabilityTxt) {
		this.itSecSbAvailabilityTxt = itSecSbAvailabilityTxt;
	}
	/**
	 * @return the itSecSbIntegrityId
	 */
	public Long getItSecSbIntegrityId() {
		return itSecSbIntegrityId;
	}
	/**
	 * @param itSecSbIntegrityId the itSecSbIntegrityId to set
	 */
	public void setItSecSbIntegrityId(Long itSecSbIntegrityId) {
		this.itSecSbIntegrityId = itSecSbIntegrityId;
	}
	/**
	 * @return the itSecSbIntegrityTxt
	 */
	public String getItSecSbIntegrityTxt() {
		return itSecSbIntegrityTxt;
	}
	/**
	 * @param itSecSbIntegrityTxt the itSecSbIntegrityTxt to set
	 */
	public void setItSecSbIntegrityTxt(String itSecSbIntegrityTxt) {
		this.itSecSbIntegrityTxt = itSecSbIntegrityTxt;
	}
	/**
	 * @return the itSecSbConfidentialityId
	 */
	public Long getItSecSbConfidentialityId() {
		return itSecSbConfidentialityId;
	}
	/**
	 * @param itSecSbConfidentialityId the itSecSbConfidentialityId to set
	 */
	public void setItSecSbConfidentialityId(Long itSecSbConfidentialityId) {
		this.itSecSbConfidentialityId = itSecSbConfidentialityId;
	}
	/**
	 * @return the itSecSbConfidentialityTx
	 */
	public String getItSecSbConfidentialityTx() {
		return itSecSbConfidentialityTx;
	}
	/**
	 * @param itSecSbConfidentialityTx the itSecSbConfidentialityTx to set
	 */
	public void setItSecSbConfidentialityTx(String itSecSbConfidentialityTx) {
		this.itSecSbConfidentialityTx = itSecSbConfidentialityTx;
	}
	/**
	 * @return the classInformationId
	 */
	public Long getClassInformationId() {
		return classInformationId;
	}
	/**
	 * @param classInformationId the classInformationId to set
	 */
	public void setClassInformationId(Long classInformationId) {
		this.classInformationId = classInformationId;
	}
	/**
	 * @return the classInformationExplanation
	 */
	public String getClassInformationExplanation() {
		return classInformationExplanation;
	}
	/**
	 * @param classInformationExplanation the classInformationExplanation to set
	 */
	public void setClassInformationExplanation(String classInformationExplanation) {
		this.classInformationExplanation = classInformationExplanation;
	}
	/**
	 * @return the itsecGroupId
	 */
	public Long getItsecGroupId() {
		return itsecGroupId;
	}
	/**
	 * @param itsecGroupId the itsecGroupId to set
	 */
	public void setItsecGroupId(Long itsecGroupId) {
		this.itsecGroupId = itsecGroupId;
	}
	/**
	 * @return the applicationOwner
	 */
	public String getApplicationOwner() {
		return applicationOwner;
	}
	/**
	 * @param applicationOwner the applicationOwner to set
	 */
	public void setApplicationOwner(String applicationOwner) {
		this.applicationOwner = applicationOwner;
	}
	/**
	 * @return the applicationDelegate
	 */
	public String getApplicationDelegate() {
		return applicationDelegate;
	}
	/**
	 * @param applicationDelegate the applicationDelegate to set
	 */
	public void setApplicationDelegate(String applicationDelegate) {
		this.applicationDelegate = applicationDelegate;
	}
	/**
	 * @return the applicationSteward
	 */
	public String getApplicationSteward() {
		return applicationSteward;
	}
	/**
	 * @param applicationSteward the applicationSteward to set
	 */
	public void setApplicationSteward(String applicationSteward) {
		this.applicationSteward = applicationSteward;
	}
	/**
	 * @return the applicationDelegateHidden
	 */
	public String getApplicationDelegateHidden() {
		return applicationDelegateHidden;
	}
	/**
	 * @param applicationDelegateHidden the applicationDelegateHidden to set
	 */
	public void setApplicationDelegateHidden(String applicationDelegateHidden) {
		this.applicationDelegateHidden = applicationDelegateHidden;
	}
	/**
	 * @return the ciOwnerPrimaryPerson
	 */
	public String getCiOwnerPrimaryPerson() {
		return ciOwnerPrimaryPerson;
	}
	/**
	 * @param ciOwnerPrimaryPerson the ciOwnerPrimaryPerson to set
	 */
	public void setCiOwnerPrimaryPerson(String ciOwnerPrimaryPerson) {
		this.ciOwnerPrimaryPerson = ciOwnerPrimaryPerson;
	}
	/**
	 * @return the ciOwnerDelegate
	 */
	public String getCiOwnerDelegate() {
		return ciOwnerDelegate;
	}
	/**
	 * @param ciOwnerDelegate the ciOwnerDelegate to set
	 */
	public void setCiOwnerDelegate(String ciOwnerDelegate) {
		this.ciOwnerDelegate = ciOwnerDelegate;
	}
	/**
	 * @return the ciOwnerDelegateHidden
	 */
	public String getCiOwnerDelegateHidden() {
		return ciOwnerDelegateHidden;
	}
	/**
	 * @param ciOwnerDelegateHidden the ciOwnerDelegateHidden to set
	 */
	public void setCiOwnerDelegateHidden(String ciOwnerDelegateHidden) {
		this.ciOwnerDelegateHidden = ciOwnerDelegateHidden;
	}
	/**
	 * @return the categoryBusinessId
	 */
	public Long getCategoryBusinessId() {
		return categoryBusinessId;
	}
	/**
	 * @param categoryBusinessId the categoryBusinessId to set
	 */
	public void setCategoryBusinessId(Long categoryBusinessId) {
		this.categoryBusinessId = categoryBusinessId;
	}
	/**
	 * @return the classDataId
	 */
	public Long getClassDataId() {
		return classDataId;
	}
	/**
	 * @param classDataId the classDataId to set
	 */
	public void setClassDataId(Long classDataId) {
		this.classDataId = classDataId;
	}
	/**
	 * @return the relevanceICS
	 */
	public Long getRelevanceICS() {
		return relevanceICS;
	}
	/**
	 * @param relevanceICS the relevanceICS to set
	 */
	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}
	/**
	 * @return the relevanzITSEC
	 */
	public Long getRelevanzITSEC() {
		return relevanzITSEC;
	}
	/**
	 * @param relevanzITSEC the relevanzITSEC to set
	 */
	public void setRelevanzITSEC(Long relevanzITSEC) {
		this.relevanzITSEC = relevanzITSEC;
	}
	/**
	 * @return the relevanceGR1435
	 */
	public String getRelevanceGR1435() {
		return relevanceGR1435;
	}
	/**
	 * @param relevanceGR1435 the relevanceGR1435 to set
	 */
	public void setRelevanceGR1435(String relevanceGR1435) {
		this.relevanceGR1435 = relevanceGR1435;
	}
	/**
	 * @return the relevanceGR1920
	 */
	public String getRelevanceGR1920() {
		return relevanceGR1920;
	}
	/**
	 * @param relevanceGR1920 the relevanceGR1920 to set
	 */
	public void setRelevanceGR1920(String relevanceGR1920) {
		this.relevanceGR1920 = relevanceGR1920;
	}
	/**
	 * @return the relevanceGR2059
	 */
	public String getRelevanceGR2059() {
		return relevanceGR2059;
	}
	/**
	 * @param relevanceGR2059 the relevanceGR2059 to set
	 */
	public void setRelevanceGR2059(String relevanceGR2059) {
		this.relevanceGR2059 = relevanceGR2059;
	}
	/**
	 * @return the relevanceGR2008
	 */
	public String getRelevanceGR2008() {
		return relevanceGR2008;
	}
	/**
	 * @param relevanceGR2008 the relevanceGR2008 to set
	 */
	public void setRelevanceGR2008(String relevanceGR2008) {
		this.relevanceGR2008 = relevanceGR2008;
	}
	/**
	 * @return the gxpFlag
	 */
	public String getGxpFlag() {
		return gxpFlag;
	}
	/**
	 * @param gxpFlag the gxpFlag to set
	 */
	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
	/**
	 * @return the gxpFlagId
	 */
	public String getGxpFlagId() {
		return gxpFlagId;
	}
	/**
	 * @param gxpFlagId the gxpFlagId to set
	 */
	public void setGxpFlagId(String gxpFlagId) {
		this.gxpFlagId = gxpFlagId;
	}
	/**
	 * @return the osNameId
	 */
	public Integer getOsNameId() {
		return osNameId;
	}
	/**
	 * @param osNameId the osNameId to set
	 */
	public void setOsNameId(Integer osNameId) {
		this.osNameId = osNameId;
	}
	/**
	 * @return the isVirtualHardwareClient
	 */
	public String getIsVirtualHardwareClient() {
		return isVirtualHardwareClient;
	}
	/**
	 * @param isVirtualHardwareClient the isVirtualHardwareClient to set
	 */
	public void setIsVirtualHardwareClient(String isVirtualHardwareClient) {
		this.isVirtualHardwareClient = isVirtualHardwareClient;
	}
	/**
	 * @return the isVirtualHardwareHost
	 */
	public String getIsVirtualHardwareHost() {
		return isVirtualHardwareHost;
	}
	/**
	 * @param isVirtualHardwareHost the isVirtualHardwareHost to set
	 */
	public void setIsVirtualHardwareHost(String isVirtualHardwareHost) {
		this.isVirtualHardwareHost = isVirtualHardwareHost;
	}
	/**
	 * @return the virtualHardwareSoftware
	 */
	public String getVirtualHardwareSoftware() {
		return virtualHardwareSoftware;
	}
	/**
	 * @param virtualHardwareSoftware the virtualHardwareSoftware to set
	 */
	public void setVirtualHardwareSoftware(String virtualHardwareSoftware) {
		this.virtualHardwareSoftware = virtualHardwareSoftware;
	}
	/**
	 * @return the primaryFunctionId
	 */
	public Integer getPrimaryFunctionId() {
		return primaryFunctionId;
	}
	/**
	 * @param primaryFunctionId the primaryFunctionId to set
	 */
	public void setPrimaryFunctionId(Integer primaryFunctionId) {
		this.primaryFunctionId = primaryFunctionId;
	}
	/**
	 * @return the comments
	 */
	public String getComments() {
		return comments;
	}
	/**
	 * @param comments the comments to set
	 */
	public void setComments(String comments) {
		this.comments = comments;
	}
	/**
	 * @return the organisationalScope
	 */
	public String getOrganisationalScope() {
		return organisationalScope;
	}
	/**
	 * @param organisationalScope the organisationalScope to set
	 */
	public void setOrganisationalScope(String organisationalScope) {
		this.organisationalScope = organisationalScope;
	}
	/**
	 * @return the barRelevance
	 */
	public String getBarRelevance() {
		return barRelevance;
	}
	/**
	 * @param barRelevance the barRelevance to set
	 */
	public void setBarRelevance(String barRelevance) {
		this.barRelevance = barRelevance;
	}
	/**
	 * @return the version
	 */
	public String getVersion() {
		return version;
	}
	/**
	 * @param version the version to set
	 */
	public void setVersion(String version) {
		this.version = version;
	}
	/**
	 * @return the businessEssentialId
	 */
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}
	/**
	 * @param businessEssentialId the businessEssentialId to set
	 */
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}

	
}
