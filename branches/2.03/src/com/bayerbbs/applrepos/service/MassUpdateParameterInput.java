/**
 * 
 */
package com.bayerbbs.applrepos.service;

/**
 * @author EQUUW
 *
 */
public class MassUpdateParameterInput {
	
	private String token;
	private String cwid;
	private Long templateCiId;
	private Long ciTypeId;
	private Long ciSubTypeId;
	private String selectedCIs;
	private boolean applicationCat2Id;
	private boolean lifecycleStatusId;
	private boolean operationalStatusId;
	private boolean priorityLevelId;
	private boolean severityLevelId;
	private boolean clusterCode;
	private boolean clusterType;
	private boolean responsible;
	private boolean subResponsible;
	private boolean refId;
	private boolean relevanzITSEC;
	private boolean gxpFlag;
	private boolean itsecGroupId;
	private boolean slaId;
	private boolean serviceContractId;
	private boolean itSecSbAvailability;
	private boolean itSecSbAvailabilityTxt;
	private boolean itSecSbConfidentiality;
	private boolean itSecSbConfidentialityTxt;
	private boolean itSecSbIntegrityId;
	private boolean itSecSbIntegrityTxt;
	private boolean classInformationId;
	private boolean classInformationExplanation;
	private boolean allGPSCContacts;
	private boolean nonEmptyGPSCContacts;
	private boolean applicationOwner;
	private boolean applicationOwnerDelegate;
	private boolean applicationSteward;
	private boolean version;
	private boolean comments;
	private boolean organisationalScope;
	private boolean barRelevance;
	private boolean categoryBusiness;
	private boolean classDataId;
	private boolean relevanceICS;
	private boolean relevance2059;
	private boolean relevance2008;
	private boolean osNameId;
	private boolean primaryFunctionId;
	private boolean virtualHardwareSoftware;
	private boolean isVirtualHardwareClient;
	private boolean isVirtualHardwareHost;
	public boolean businessEssentialId;
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
	 * @return the templateCiId
	 */
	public Long getTemplateCiId() {
		return templateCiId;
	}
	/**
	 * @param templateCiId the templateCiId to set
	 */
	public void setTemplateCiId(Long templateCiId) {
		this.templateCiId = templateCiId;
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
	 * @return the ciSubTypeId
	 */
	public Long getCiSubTypeId() {
		return ciSubTypeId;
	}
	/**
	 * @param ciSubTypeId the ciSubTypeId to set
	 */
	public void setCiSubTypeId(Long ciSubTypeId) {
		this.ciSubTypeId = ciSubTypeId;
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
	public boolean getApplicationCat2Id() {
		return applicationCat2Id;
	}
	/**
	 * @param applicationCat2Id the applicationCat2Id to set
	 */
	public void setApplicationCat2Id(boolean applicationCat2Id) {
		this.applicationCat2Id = applicationCat2Id;
	}
	/**
	 * @return the lifecycleStatusId
	 */
	public boolean getLifecycleStatusId() {
		return lifecycleStatusId;
	}
	/**
	 * @param lifecycleStatusId the lifecycleStatusId to set
	 */
	public void setLifecycleStatusId(boolean lifecycleStatusId) {
		this.lifecycleStatusId = lifecycleStatusId;
	}
	/**
	 * @return the operationalStatusId
	 */
	public boolean getOperationalStatusId() {
		return operationalStatusId;
	}
	/**
	 * @param operationalStatusId the operationalStatusId to set
	 */
	public void setOperationalStatusId(boolean operationalStatusId) {
		this.operationalStatusId = operationalStatusId;
	}
	/**
	 * @return the priorityLevelId
	 */
	public boolean getPriorityLevelId() {
		return priorityLevelId;
	}
	/**
	 * @param priorityLevelId the priorityLevelId to set
	 */
	public void setPriorityLevelId(boolean priorityLevelId) {
		this.priorityLevelId = priorityLevelId;
	}
	/**
	 * @return the severityLevelId
	 */
	public boolean getSeverityLevelId() {
		return severityLevelId;
	}
	/**
	 * @param severityLevelId the severityLevelId to set
	 */
	public void setSeverityLevelId(boolean severityLevelId) {
		this.severityLevelId = severityLevelId;
	}
	/**
	 * @return the clusterCode
	 */
	public boolean getClusterCode() {
		return clusterCode;
	}
	/**
	 * @param clusterCode the clusterCode to set
	 */
	public void setClusterCode(boolean clusterCode) {
		this.clusterCode = clusterCode;
	}
	/**
	 * @return the clusterType
	 */
	public boolean getClusterType() {
		return clusterType;
	}
	/**
	 * @param clusterType the clusterType to set
	 */
	public void setClusterType(boolean clusterType) {
		this.clusterType = clusterType;
	}
	/**
	 * @return the responsible
	 */
	public boolean getResponsible() {
		return responsible;
	}
	/**
	 * @param responsible the responsible to set
	 */
	public void setResponsible(boolean responsible) {
		this.responsible = responsible;
	}
	/**
	 * @return the subResponsible
	 */
	public boolean getSubResponsible() {
		return subResponsible;
	}
	/**
	 * @param subResponsible the subResponsible to set
	 */
	public void setSubResponsible(boolean subResponsible) {
		this.subResponsible = subResponsible;
	}
	/**
	 * @return the refId
	 */
	public boolean getRefId() {
		return refId;
	}
	/**
	 * @param refId the refId to set
	 */
	public void setRefId(boolean refId) {
		this.refId = refId;
	}
	/**
	 * @return the relevanzITSEC
	 */
	public boolean getRelevanzITSEC() {
		return relevanzITSEC;
	}
	/**
	 * @param relevanzITSEC the relevanzITSEC to set
	 */
	public void setRelevanzITSEC(boolean relevanzITSEC) {
		this.relevanzITSEC = relevanzITSEC;
	}
	/**
	 * @return the gxpFlag
	 */
	public boolean getGxpFlag() {
		return gxpFlag;
	}
	/**
	 * @param gxpFlag the gxpFlag to set
	 */
	public void setGxpFlag(boolean gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
	/**
	 * @return the itsecGroupId
	 */
	public boolean getItsecGroupId() {
		return itsecGroupId;
	}
	/**
	 * @param itsecGroupId the itsecGroupId to set
	 */
	public void setItsecGroupId(boolean itsecGroupId) {
		this.itsecGroupId = itsecGroupId;
	}
	/**
	 * @return the slaId
	 */
	public boolean getSlaId() {
		return slaId;
	}
	/**
	 * @param slaId the slaId to set
	 */
	public void setSlaId(boolean slaId) {
		this.slaId = slaId;
	}
	/**
	 * @return the serviceContractId
	 */
	public boolean getServiceContractId() {
		return serviceContractId;
	}
	/**
	 * @param serviceContractId the serviceContractId to set
	 */
	public void setServiceContractId(boolean serviceContractId) {
		this.serviceContractId = serviceContractId;
	}
	/**
	 * @return the itSecSbAvailability
	 */
	public boolean getItSecSbAvailability() {
		return itSecSbAvailability;
	}
	/**
	 * @param itSecSbAvailability the itSecSbAvailability to set
	 */
	public void setItSecSbAvailability(boolean itSecSbAvailability) {
		this.itSecSbAvailability = itSecSbAvailability;
	}
	/**
	 * @return the itSecSbAvailabilityTxt
	 */
	public boolean getItSecSbAvailabilityTxt() {
		return itSecSbAvailabilityTxt;
	}
	/**
	 * @param itSecSbAvailabilityTxt the itSecSbAvailabilityTxt to set
	 */
	public void setItSecSbAvailabilityTxt(boolean itSecSbAvailabilityTxt) {
		this.itSecSbAvailabilityTxt = itSecSbAvailabilityTxt;
	}
	/**
	 * @return the itSecSbConfidentiality
	 */
	public boolean getItSecSbConfidentiality() {
		return itSecSbConfidentiality;
	}
	/**
	 * @param itSecSbConfidentiality the itSecSbConfidentiality to set
	 */
	public void setItSecSbConfidentiality(boolean itSecSbConfidentiality) {
		this.itSecSbConfidentiality = itSecSbConfidentiality;
	}
	/**
	 * @return the itSecSbConfidentialityTxt
	 */
	public boolean getItSecSbConfidentialityTxt() {
		return itSecSbConfidentialityTxt;
	}
	/**
	 * @param itSecSbConfidentialityTxt the itSecSbConfidentialityTxt to set
	 */
	public void setItSecSbConfidentialityTxt(boolean itSecSbConfidentialityTxt) {
		this.itSecSbConfidentialityTxt = itSecSbConfidentialityTxt;
	}
	/**
	 * @return the allGPSCContacts
	 */
	public boolean getAllGPSCContacts() {
		return allGPSCContacts;
	}
	/**
	 * @param allGPSCContacts the allGPSCContacts to set
	 */
	public void setAllGPSCContacts(boolean allGPSCContacts) {
		this.allGPSCContacts = allGPSCContacts;
	}
	/**
	 * @return the nonEmptyGPSCContacts
	 */
	public boolean getNonEmptyGPSCContacts() {
		return nonEmptyGPSCContacts;
	}
	/**
	 * @param nonEmptyGPSCContacts the nonEmptyGPSCContacts to set
	 */
	public void setNonEmptyGPSCContacts(boolean nonEmptyGPSCContacts) {
		this.nonEmptyGPSCContacts = nonEmptyGPSCContacts;
	}
	/**
	 * @return the itSecSbIntegrityId
	 */
	public boolean isItSecSbIntegrityId() {
		return itSecSbIntegrityId;
	}
	/**
	 * @param itSecSbIntegrityId the itSecSbIntegrityId to set
	 */
	public void setItSecSbIntegrityId(boolean itSecSbIntegrityId) {
		this.itSecSbIntegrityId = itSecSbIntegrityId;
	}
	/**
	 * @return the itSecSbIntegrityTxt
	 */
	public boolean isItSecSbIntegrityTxt() {
		return itSecSbIntegrityTxt;
	}
	/**
	 * @param itSecSbIntegrityTxt the itSecSbIntegrityTxt to set
	 */
	public void setItSecSbIntegrityTxt(boolean itSecSbIntegrityTxt) {
		this.itSecSbIntegrityTxt = itSecSbIntegrityTxt;
	}
	/**
	 * @return the applicationOwner
	 */
	public boolean isApplicationOwner() {
		return applicationOwner;
	}
	/**
	 * @param applicationOwner the applicationOwner to set
	 */
	public void setApplicationOwner(boolean applicationOwner) {
		this.applicationOwner = applicationOwner;
	}
	/**
	 * @return the applicationOwnerDelegate
	 */
	public boolean isApplicationOwnerDelegate() {
		return applicationOwnerDelegate;
	}
	/**
	 * @param applicationOwnerDelegate the applicationOwnerDelegate to set
	 */
	public void setApplicationOwnerDelegate(boolean applicationOwnerDelegate) {
		this.applicationOwnerDelegate = applicationOwnerDelegate;
	}
	/**
	 * @return the applicationSteward
	 */
	public boolean isApplicationSteward() {
		return applicationSteward;
	}
	/**
	 * @param applicationSteward the applicationSteward to set
	 */
	public void setApplicationSteward(boolean applicationSteward) {
		this.applicationSteward = applicationSteward;
	}
	/**
	 * @return the version
	 */
	public boolean isVersion() {
		return version;
	}
	/**
	 * @param version the version to set
	 */
	public void setVersion(boolean version) {
		this.version = version;
	}
	/**
	 * @return the comments
	 */
	public boolean isComments() {
		return comments;
	}
	/**
	 * @param comments the comments to set
	 */
	public void setComments(boolean comments) {
		this.comments = comments;
	}
	/**
	 * @return the organisationalScope
	 */
	public boolean isOrganisationalScope() {
		return organisationalScope;
	}
	/**
	 * @param organisationalScope the organisationalScope to set
	 */
	public void setOrganisationalScope(boolean organisationalScope) {
		this.organisationalScope = organisationalScope;
	}
	/**
	 * @return the barRelevance
	 */
	public boolean isBarRelevance() {
		return barRelevance;
	}
	/**
	 * @param barRelevance the barRelevance to set
	 */
	public void setBarRelevance(boolean barRelevance) {
		this.barRelevance = barRelevance;
	}
	/**
	 * @return the categoryBusiness
	 */
	public boolean isCategoryBusiness() {
		return categoryBusiness;
	}
	/**
	 * @param categoryBusiness the categoryBusiness to set
	 */
	public void setCategoryBusiness(boolean categoryBusiness) {
		this.categoryBusiness = categoryBusiness;
	}
	/**
	 * @return the classDataId
	 */
	public boolean isClassDataId() {
		return classDataId;
	}
	/**
	 * @param classDataId the classDataId to set
	 */
	public void setClassDataId(boolean classDataId) {
		this.classDataId = classDataId;
	}
	/**
	 * @return the relevanceICS
	 */
	public boolean isRelevanceICS() {
		return relevanceICS;
	}
	/**
	 * @param relevanceICS the relevanceICS to set
	 */
	public void setRelevanceICS(boolean relevanceICS) {
		this.relevanceICS = relevanceICS;
	}
	/**
	 * @return the relevance2059
	 */
	public boolean isRelevance2059() {
		return relevance2059;
	}
	/**
	 * @param relevance2059 the relevance2059 to set
	 */
	public void setRelevance2059(boolean relevance2059) {
		this.relevance2059 = relevance2059;
	}
	/**
	 * @return the relevance2008
	 */
	public boolean isRelevance2008() {
		return relevance2008;
	}
	/**
	 * @param relevance2008 the relevance2008 to set
	 */
	public void setRelevance2008(boolean relevance2008) {
		this.relevance2008 = relevance2008;
	}
	/**
	 * @return the classInformationId
	 */
	public boolean isClassInformationId() {
		return classInformationId;
	}
	/**
	 * @param classInformationId the classInformationId to set
	 */
	public void setClassInformationId(boolean classInformationId) {
		this.classInformationId = classInformationId;
	}
	/**
	 * @return the classInformationExplanation
	 */
	public boolean isClassInformationExplanation() {
		return classInformationExplanation;
	}
	/**
	 * @param classInformationExplanation the classInformationExplanation to set
	 */
	public void setClassInformationExplanation(boolean classInformationExplanation) {
		this.classInformationExplanation = classInformationExplanation;
	}
	/**
	 * @return the osNameId
	 */
	public boolean isOsNameId() {
		return osNameId;
	}
	/**
	 * @param osNameId the osNameId to set
	 */
	public void setOsNameId(boolean osNameId) {
		this.osNameId = osNameId;
	}
	/**
	 * @return the primaryFunctionId
	 */
	public boolean isPrimaryFunctionId() {
		return primaryFunctionId;
	}
	/**
	 * @param primaryFunctionId the primaryFunctionId to set
	 */
	public void setPrimaryFunctionId(boolean primaryFunctionId) {
		this.primaryFunctionId = primaryFunctionId;
	}
	/**
	 * @return the virtualHardwareSoftware
	 */
	public boolean isVirtualHardwareSoftware() {
		return virtualHardwareSoftware;
	}
	/**
	 * @param virtualHardwareSoftware the virtualHardwareSoftware to set
	 */
	public void setVirtualHardwareSoftware(boolean virtualHardwareSoftware) {
		this.virtualHardwareSoftware = virtualHardwareSoftware;
	}
	/**
	 * @return the isVirtualHardwareClient
	 */
	public boolean isVirtualHardwareClient() {
		return isVirtualHardwareClient;
	}
	/**
	 * @param isVirtualHardwareClient the isVirtualHardwareClient to set
	 */
	public void setVirtualHardwareClient(boolean isVirtualHardwareClient) {
		this.isVirtualHardwareClient = isVirtualHardwareClient;
	}
	/**
	 * @return the isVirtualHardwareHost
	 */
	public boolean isVirtualHardwareHost() {
		return isVirtualHardwareHost;
	}
	/**
	 * @param isVirtualHardwareHost the isVirtualHardwareHost to set
	 */
	public void setVirtualHardwareHost(boolean isVirtualHardwareHost) {
		this.isVirtualHardwareHost = isVirtualHardwareHost;
	}
	/**
	 * @return the businessEssentialId
	 */
	public boolean isBusinessEssentialId() {
		return businessEssentialId;
	}
	/**
	 * @param businessEssentialId the businessEssentialId to set
	 */
	public void setBusinessEssentialId(boolean businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}
		

}
