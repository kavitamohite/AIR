package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

/**
 * The DTO (Data transfer object) for the database table "ANWENDUNG"
 * 
 * @author evafl
 * 
 */
public class ApplicationDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6615538451865795610L;

	private Long applicationId;
	
	private String barApplicationId;

	private String applicationName;

	private String applicationAlias;

	private Long applicationCat2Id;
	
	private String applicationCat2Txt;

	private Long applicationCat1Id;
	
	private String applicationCat1Txt;
	
	private Long primaryFunctionId;
	
	private String primaryFunctionTxt;
	
	private String clusterCode;

	private String clusterType;

	private String comments;

	private Long lifecycleStatusId;
	
	private String lifecycleStatusTxt;

	private Long operationalStatusId;
	
	private String operationalStatusTxt;

	private String userCreate;
	
	private String responsible;
	
	private String responsibleHidden;

	private String subResponsible;

	private String subResponsibleHidden;

	private Long itset;
	
	private String itsetName;
	
	private Long relevanzItsec;
	
	private Long relevanceICS;
	
	private Long relevance1775;
	
	private Long relevance2008;
	
	private Long template;
	private String templateReferencedByItem; 
	
	private Long itsecGroupId;
	
	private Long refId;
	private String refTxt;
	
	private String itsecGroup;

	private Long slaId;
	private String slaName;
	
	private Long serviceContractId;
	private String serviceContract;

	private Long priorityLevelId;
	private String priorityLevel;
	private Long severityLevelId;
	private String severityLevel;
	private String locationPath;
	private Long businessEssentialId;
	private String businessEssential;
	
	private String gxpFlagId;
	private String gxpFlagTxt;

	// private String riskAnalysisYN;
	private Long licenseTypeId;
	private String licenseTypeTxt;
	private String dedicated;
	private Long accessingUserCount;
	private Long accessingUserCountMeasured;
	private String loadClass;
	private String version;
	private Long costRunPa;
	private Long costChangePa;
	private Long currencyId;
	private String currencyTxt;
	private Long costRunAccountId;
	private String costRunAccountTxt;
	private Long costChangeAccountId;
	private String costChangeAccountTxt;
	private String licenseUsingRegions;
	

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

	
	// access rights
	private String isEditable = "N";
	
	// ci support stuff
	private String ciSupportStuffUserAuthorizationSupportedByDocumentation;
	private String ciSupportStuffUserAuthorizationProcess;
	private String ciSupportStuffChangeManagementSupportedByTool;
	private String ciSupportStuffUserManagementProcess;
	private String ciSupportStuffApplicationDocumentation;
	private String ciSupportStuffRootDirectory;
	private String ciSupportStuffDataDirectory;
	private String ciSupportStuffProvidedServices;
	private String ciSupportStuffProvidedMachineUsers;

	// itSec
	private Long itSecSbIntegrityId;
	private String itSecSbIntegrityTxt;
	private String itSecSbIntegrityDescription;
	private Long itSecSbAvailabilityId;
	private String itSecSbAvailabilityTxt;
	private String itSecSbAvailabilityDescription;
	private Long itSecSbConfidentialityId;
	private String itSecSbConfidentialityTxt;
	private String itSecSbConfidentialityDescription;

	// gpsc
	private String gpsccontactSupportGroup;
	private String gpsccontactChangeTeam;
	private String gpsccontactServiceCoordinator;
	private String gpsccontactEscalation;
	private String gpsccontactCiOwner;
	private String gpsccontactOwningBusinessGroup;
	private String gpsccontactImplementationTeam;
	private String gpsccontactServiceCoordinatorIndiv;
	private String gpsccontactEscalationIndiv;
	private String gpsccontactResponsibleAtCustomerSide;
	private String gpsccontactSystemResponsible;
	private String gpsccontactImpactedBusiness;
	private String gpsccontactBusinessOwnerRepresentative;
	private String gpsccontactSupportGroupHidden;
	private String gpsccontactChangeTeamHidden;
	private String gpsccontactServiceCoordinatorHidden;
	private String gpsccontactEscalationHidden;
	private String gpsccontactCiOwnerHidden;
	private String gpsccontactOwningBusinessGroupHidden;
	private String gpsccontactImplementationTeamHidden;
	private String gpsccontactServiceCoordinatorIndivHidden;
	private String gpsccontactEscalationIndivHidden;
	private String gpsccontactResponsibleAtCustomerSideHidden;
	private String gpsccontactSystemResponsibleHidden;
	private String gpsccontactImpactedBusinessHidden;
	private String gpsccontactBusinessOwnerRepresentativeHidden;
	
	// connections
	private String businessProcess;
	private String businessProcessHidden;
	
	// owner
	private String applicationOwner;
	private String applicationOwnerDelegate;
	private String applicationSteward;
	private String applicationOwnerHidden;
	private String applicationOwnerDelegateHidden;
	private String applicationStewardHidden;
	
	private Long categoryBusinessId;
	private String categoryBusiness;

	private Long tableId;
	
	private Long classDataId;
	private String classData;
	private Long classInformationId;
	private String classInformationExplanation;
	private String applicationProtection;	// only for display usage
	
	private String serviceModel;
	
	private String organisationalScope;
	
	private String barRelevance;
	
	// compliance request
	private String relevanceGR1435;
	private String relevanceGR1775;
	private String relevanceGR1920;
	private String relevanceGR2008;

	private Long ciComplianceRequestId1435;
	private Long ciComplianceRequestId1775;
	private Long ciComplianceRequestId1920;
	private Long ciComplianceRequestId2008;
	
	// connections
	private String upStreamAdd;
	private String upStreamDelete;
	private String downStreamAdd;
	private String downStreamDelete;
	
	public ApplicationDTO() {
	}

	public Long getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
	}

	public String getBarApplicationId() {
		return barApplicationId;
	}

	public void setBarApplicationId(String barApplicationId) {
		this.barApplicationId = barApplicationId;
	}

	public String getApplicationName() {
		return applicationName;
	}

	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	public String getApplicationAlias() {
		return applicationAlias;
	}

	public void setApplicationAlias(String applicationAlias) {
		this.applicationAlias = applicationAlias;
	}

	public String getResponsible() {
		return responsible;
	}

	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}

	public String getSubResponsible() {
		return subResponsible;
	}

	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}

	public Long getApplicationCat2Id() {
		return applicationCat2Id;
	}

	public void setApplicationCat2Id(Long applicationCat2Id) {
		this.applicationCat2Id = applicationCat2Id;
	}

	public String getClusterCode() {
		return clusterCode;
	}

	public void setClusterCode(String clusterCode) {
		this.clusterCode = clusterCode;
	}

	public String getClusterType() {
		return clusterType;
	}

	public void setClusterType(String clusterType) {
		this.clusterType = clusterType;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Long getLifecycleStatusId() {
		return lifecycleStatusId;
	}

	public void setLifecycleStatusId(Long lifecycleStatusId) {
		this.lifecycleStatusId = lifecycleStatusId;
	}

	public Long getOperationalStatusId() {
		return operationalStatusId;
	}

	public void setOperationalStatusId(Long operationalStatusId) {
		this.operationalStatusId = operationalStatusId;
	}

	public Long getItset() {
		return itset;
	}

	public void setItset(Long itset) {
		this.itset = itset;
	}

	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}

	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}

	public String getIsEditable() {
		return isEditable;
	}

	public void setIsEditable(String isEditable) {
		this.isEditable = isEditable;
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

	public String getApplicationCat2Txt() {
		return applicationCat2Txt;
	}

	public void setApplicationCat2Txt(String applicationCat2Txt) {
		this.applicationCat2Txt = applicationCat2Txt;
	}

	public String getLifecycleStatusTxt() {
		return lifecycleStatusTxt;
	}

	public void setLifecycleStatusTxt(String lifecycleStatusTxt) {
		this.lifecycleStatusTxt = lifecycleStatusTxt;
	}

	public String getOperationalStatusTxt() {
		return operationalStatusTxt;
	}

	public void setOperationalStatusTxt(String operationalStatusTxt) {
		this.operationalStatusTxt = operationalStatusTxt;
	}

	public Long getApplicationCat1Id() {
		return applicationCat1Id;
	}

	public void setApplicationCat1Id(Long applicationCat1Id) {
		this.applicationCat1Id = applicationCat1Id;
	}

	public String getApplicationCat1Txt() {
		return applicationCat1Txt;
	}

	public void setApplicationCat1Txt(String applicationCat1Txt) {
		this.applicationCat1Txt = applicationCat1Txt;
	}

	public Long getRelevanzItsec() {
		return relevanzItsec;
	}

	public void setRelevanzItsec(Long relevanzItsec) {
		this.relevanzItsec = relevanzItsec;
	}

	public Long getItsecGroupId() {
		return itsecGroupId;
	}

	public void setItsecGroupId(Long itsecGroupId) {
		this.itsecGroupId = itsecGroupId;
	}

	public String getItsecGroup() {
		return itsecGroup;
	}

	public void setItsecGroup(String itsecGroup) {
		this.itsecGroup = itsecGroup;
	}

	public Long getRefId() {
		return refId;
	}

	public void setRefId(Long refId) {
		this.refId = refId;
	}

	public String getRefTxt() {
		return refTxt;
	}

	public void setRefTxt(String refTxt) {
		this.refTxt = refTxt;
	}

	public String getUserCreate() {
		return userCreate;
	}

	public void setUserCreate(String userCreate) {
		this.userCreate = userCreate;
	}

	public String getItsetName() {
		return itsetName;
	}

	public void setItsetName(String itsetName) {
		this.itsetName = itsetName;
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

	public Long getServiceContractId() {
		return serviceContractId;
	}

	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}

	public String getServiceContract() {
		return serviceContract;
	}

	public void setServiceContract(String serviceContract) {
		this.serviceContract = serviceContract;
	}

	public Long getPriorityLevelId() {
		return priorityLevelId;
	}

	public void setPriorityLevelId(Long priorityLevelId) {
		this.priorityLevelId = priorityLevelId;
	}

	public String getPriorityLevel() {
		return priorityLevel;
	}

	public void setPriorityLevel(String priorityLevel) {
		this.priorityLevel = priorityLevel;
	}

	public Long getSeverityLevelId() {
		return severityLevelId;
	}

	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}

	public String getSeverityLevel() {
		return severityLevel;
	}

	public void setSeverityLevel(String severityLevel) {
		this.severityLevel = severityLevel;
	}

	public String getLocationPath() {
		return locationPath;
	}

	public void setLocationPath(String locationPath) {
		this.locationPath = locationPath;
	}

	public String getBusinessEssential() {
		return businessEssential;
	}

	public void setBusinessEssential(String businessEssential) {
		this.businessEssential = businessEssential;
	}

	public Long getRelevanceICS() {
		return relevanceICS;
	}

	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}
	
	public Long getTemplate() {
		return template;
	}

	public void setTemplate(Long template) {
		this.template = template;
	}

	public String getTemplateReferencedByItem() {
		return templateReferencedByItem;
	}

	public void setTemplateReferencedByItem(String templateReferencedByItem) {
		this.templateReferencedByItem = templateReferencedByItem;
	}

	public String getGxpFlagId() {
		return gxpFlagId;
	}

	public void setGxpFlagId(String gxpFlagId) {
		this.gxpFlagId = gxpFlagId;
	}

	public String getGxpFlagTxt() {
		return gxpFlagTxt;
	}

	public void setGxpFlagTxt(String gxpFlagTxt) {
		this.gxpFlagTxt = gxpFlagTxt;
	}

// task 142
//	public String getRiskAnalysisYN() {
//		return riskAnalysisYN;
//	}
//
//	public void setRiskAnalysisYN(String riskAnalysisYN) {
//		this.riskAnalysisYN = riskAnalysisYN;
//	}

	public Long getLicenseTypeId() {
		return licenseTypeId;
	}

	public void setLicenseTypeId(Long licenseTypeId) {
		this.licenseTypeId = licenseTypeId;
	}

	public String getLicenseTypeTxt() {
		return licenseTypeTxt;
	}

	public void setLicenseTypeTxt(String licenseTypeTxt) {
		this.licenseTypeTxt = licenseTypeTxt;
	}

	public String getDedicated() {
		return dedicated;
	}

	public void setDedicated(String dedicated) {
		this.dedicated = dedicated;
	}

	public Long getAccessingUserCount() {
		return accessingUserCount;
	}

	public void setAccessingUserCount(Long accessingUserCount) {
		this.accessingUserCount = accessingUserCount;
	}

	public Long getAccessingUserCountMeasured() {
		return accessingUserCountMeasured;
	}

	public void setAccessingUserCountMeasured(Long accessingUserCountMeasured) {
		this.accessingUserCountMeasured = accessingUserCountMeasured;
	}

	public String getLoadClass() {
		return loadClass;
	}

	public void setLoadClass(String loadClass) {
		this.loadClass = loadClass;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Long getCostRunPa() {
		return costRunPa;
	}

	public void setCostRunPa(Long costRunPa) {
		this.costRunPa = costRunPa;
	}

	public Long getCostChangePa() {
		return costChangePa;
	}

	public void setCostChangePa(Long costChangePa) {
		this.costChangePa = costChangePa;
	}

	public Long getCurrencyId() {
		return currencyId;
	}

	public void setCurrencyId(Long currencyId) {
		this.currencyId = currencyId;
	}

	public String getCurrencyTxt() {
		return currencyTxt;
	}

	public void setCurrencyTxt(String currencyTxt) {
		this.currencyTxt = currencyTxt;
	}

	public Long getCostRunAccountId() {
		return costRunAccountId;
	}

	public void setCostRunAccountId(Long costRunAccountId) {
		this.costRunAccountId = costRunAccountId;
	}

	public String getCostRunAccountTxt() {
		return costRunAccountTxt;
	}

	public void setCostRunAccountTxt(String costRunAccountTxt) {
		this.costRunAccountTxt = costRunAccountTxt;
	}

	public Long getCostChangeAccountId() {
		return costChangeAccountId;
	}

	public void setCostChangeAccountId(Long costChangeAccountId) {
		this.costChangeAccountId = costChangeAccountId;
	}

	public String getCostChangeAccountTxt() {
		return costChangeAccountTxt;
	}

	public void setCostChangeAccountTxt(String costChangeAccountTxt) {
		this.costChangeAccountTxt = costChangeAccountTxt;
	}

	public String getLicenseUsingRegions() {
		return licenseUsingRegions;
	}

	public void setLicenseUsingRegions(String licenseUsingRegions) {
		this.licenseUsingRegions = licenseUsingRegions;
	}

	public String getCiSupportStuffUserAuthorizationSupportedByDocumentation() {
		return ciSupportStuffUserAuthorizationSupportedByDocumentation;
	}

	public void setCiSupportStuffUserAuthorizationSupportedByDocumentation(
			String ciSupportStuffUserAuthorizationSupportedByDocumentation) {
		this.ciSupportStuffUserAuthorizationSupportedByDocumentation = ciSupportStuffUserAuthorizationSupportedByDocumentation;
	}

	public String getCiSupportStuffUserAuthorizationProcess() {
		return ciSupportStuffUserAuthorizationProcess;
	}

	public void setCiSupportStuffUserAuthorizationProcess(
			String ciSupportStuffUserAuthorizationProcess) {
		this.ciSupportStuffUserAuthorizationProcess = ciSupportStuffUserAuthorizationProcess;
	}

	public String getCiSupportStuffChangeManagementSupportedByTool() {
		return ciSupportStuffChangeManagementSupportedByTool;
	}

	public void setCiSupportStuffChangeManagementSupportedByTool(
			String ciSupportStuffChangeManagementSupportedByTool) {
		this.ciSupportStuffChangeManagementSupportedByTool = ciSupportStuffChangeManagementSupportedByTool;
	}

	public String getCiSupportStuffUserManagementProcess() {
		return ciSupportStuffUserManagementProcess;
	}

	public void setCiSupportStuffUserManagementProcess(
			String ciSupportStuffUserManagementProcess) {
		this.ciSupportStuffUserManagementProcess = ciSupportStuffUserManagementProcess;
	}

	public String getCiSupportStuffApplicationDocumentation() {
		return ciSupportStuffApplicationDocumentation;
	}

	public void setCiSupportStuffApplicationDocumentation(
			String ciSupportStuffApplicationDocumentation) {
		this.ciSupportStuffApplicationDocumentation = ciSupportStuffApplicationDocumentation;
	}

	public String getCiSupportStuffRootDirectory() {
		return ciSupportStuffRootDirectory;
	}

	public void setCiSupportStuffRootDirectory(String ciSupportStuffRootDirectory) {
		this.ciSupportStuffRootDirectory = ciSupportStuffRootDirectory;
	}

	public String getCiSupportStuffDataDirectory() {
		return ciSupportStuffDataDirectory;
	}

	public void setCiSupportStuffDataDirectory(String ciSupportStuffDataDirectory) {
		this.ciSupportStuffDataDirectory = ciSupportStuffDataDirectory;
	}

	public String getCiSupportStuffProvidedServices() {
		return ciSupportStuffProvidedServices;
	}

	public void setCiSupportStuffProvidedServices(
			String ciSupportStuffProvidedServices) {
		this.ciSupportStuffProvidedServices = ciSupportStuffProvidedServices;
	}

	public String getCiSupportStuffProvidedMachineUsers() {
		return ciSupportStuffProvidedMachineUsers;
	}

	public void setCiSupportStuffProvidedMachineUsers(
			String ciSupportStuffProvidedMachineUsers) {
		this.ciSupportStuffProvidedMachineUsers = ciSupportStuffProvidedMachineUsers;
	}

	public Long getItSecSbIntegrityId() {
		return itSecSbIntegrityId;
	}

	public void setItSecSbIntegrityId(Long itSecSbIntegrityId) {
		this.itSecSbIntegrityId = itSecSbIntegrityId;
	}


	public Long getItSecSbAvailabilityId() {
		return itSecSbAvailabilityId;
	}

	public void setItSecSbAvailabilityId(Long itSecSbAvailabilityId) {
		this.itSecSbAvailabilityId = itSecSbAvailabilityId;
	}


	public Long getItSecSbConfidentialityId() {
		return itSecSbConfidentialityId;
	}

	public void setItSecSbConfidentialityId(Long itSecSbConfidentialityId) {
		this.itSecSbConfidentialityId = itSecSbConfidentialityId;
	}

	public String getItSecSbIntegrityTxt() {
		return itSecSbIntegrityTxt;
	}

	public void setItSecSbIntegrityTxt(String itSecSbIntegrityTxt) {
		this.itSecSbIntegrityTxt = itSecSbIntegrityTxt;
	}

	public String getItSecSbIntegrityDescription() {
		return itSecSbIntegrityDescription;
	}

	public void setItSecSbIntegrityDescription(String itSecSbIntegrityDescription) {
		this.itSecSbIntegrityDescription = itSecSbIntegrityDescription;
	}

	public String getItSecSbAvailabilityTxt() {
		return itSecSbAvailabilityTxt;
	}

	public void setItSecSbAvailabilityTxt(String itSecSbAvailabilityTxt) {
		this.itSecSbAvailabilityTxt = itSecSbAvailabilityTxt;
	}

	public String getItSecSbAvailabilityDescription() {
		return itSecSbAvailabilityDescription;
	}

	public void setItSecSbAvailabilityDescription(
			String itSecSbAvailabilityDescription) {
		this.itSecSbAvailabilityDescription = itSecSbAvailabilityDescription;
	}

	public String getItSecSbConfidentialityTxt() {
		return itSecSbConfidentialityTxt;
	}

	public void setItSecSbConfidentialityTxt(String itSecSbConfidentialityTxt) {
		this.itSecSbConfidentialityTxt = itSecSbConfidentialityTxt;
	}

	public String getItSecSbConfidentialityDescription() {
		return itSecSbConfidentialityDescription;
	}

	public void setItSecSbConfidentialityDescription(
			String itSecSbConfidentialityDescription) {
		this.itSecSbConfidentialityDescription = itSecSbConfidentialityDescription;
	}

	public Long getPrimaryFunctionId() {
		return primaryFunctionId;
	}

	public void setPrimaryFunctionId(Long primaryFunctionId) {
		this.primaryFunctionId = primaryFunctionId;
	}

	public String getPrimaryFunctionTxt() {
		return primaryFunctionTxt;
	}

	public void setPrimaryFunctionTxt(String primaryFunctionTxt) {
		this.primaryFunctionTxt = primaryFunctionTxt;
	}

	public String getResponsibleHidden() {
		return responsibleHidden;
	}

	public void setResponsibleHidden(String responsibleHidden) {
		this.responsibleHidden = responsibleHidden;
	}

	public String getSubResponsibleHidden() {
		return subResponsibleHidden;
	}

	public void setSubResponsibleHidden(String subResponsibleHidden) {
		this.subResponsibleHidden = subResponsibleHidden;
	}

	public String getGpsccontactSupportGroup() {
		return gpsccontactSupportGroup;
	}

	public void setGpsccontactSupportGroup(String gpsccontactSupportGroup) {
		this.gpsccontactSupportGroup = gpsccontactSupportGroup;
	}

	public String getGpsccontactChangeTeam() {
		return gpsccontactChangeTeam;
	}

	public void setGpsccontactChangeTeam(String gpsccontactChangeTeam) {
		this.gpsccontactChangeTeam = gpsccontactChangeTeam;
	}

	public String getGpsccontactServiceCoordinator() {
		return gpsccontactServiceCoordinator;
	}

	public void setGpsccontactServiceCoordinator(String gpsccontactServiceCoordinator) {
		this.gpsccontactServiceCoordinator = gpsccontactServiceCoordinator;
	}

	public String getGpsccontactEscalation() {
		return gpsccontactEscalation;
	}

	public void setGpsccontactEscalation(String gpsccontactEscalation) {
		this.gpsccontactEscalation = gpsccontactEscalation;
	}

	public String getGpsccontactCiOwner() {
		return gpsccontactCiOwner;
	}

	public void setGpsccontactCiOwner(String gpsccontactCiOwner) {
		this.gpsccontactCiOwner = gpsccontactCiOwner;
	}

	public String getGpsccontactOwningBusinessGroup() {
		return gpsccontactOwningBusinessGroup;
	}

	public void setGpsccontactOwningBusinessGroup(String gpsccontactOwningBusinessGroup) {
		this.gpsccontactOwningBusinessGroup = gpsccontactOwningBusinessGroup;
	}

	public String getGpsccontactImplementationTeam() {
		return gpsccontactImplementationTeam;
	}

	public void setGpsccontactImplementationTeam(String gpsccontactImplementationTeam) {
		this.gpsccontactImplementationTeam = gpsccontactImplementationTeam;
	}

	public String getGpsccontactServiceCoordinatorIndiv() {
		return gpsccontactServiceCoordinatorIndiv;
	}

	public void setGpsccontactServiceCoordinatorIndiv(String gpsccontactServiceCoordinatorIndiv) {
		this.gpsccontactServiceCoordinatorIndiv = gpsccontactServiceCoordinatorIndiv;
	}

	public String getGpsccontactEscalationIndiv() {
		return gpsccontactEscalationIndiv;
	}

	public void setGpsccontactEscalationIndiv(String gpsccontactEscalationIndiv) {
		this.gpsccontactEscalationIndiv = gpsccontactEscalationIndiv;
	}

	public String getGpsccontactResponsibleAtCustomerSide() {
		return gpsccontactResponsibleAtCustomerSide;
	}

	public void setGpsccontactResponsibleAtCustomerSide(String gpsccontactResponsibleAtCustomerSide) {
		this.gpsccontactResponsibleAtCustomerSide = gpsccontactResponsibleAtCustomerSide;
	}

	public String getGpsccontactSystemResponsible() {
		return gpsccontactSystemResponsible;
	}

	public void setGpsccontactSystemResponsible(String gpsccontactSystemResponsible) {
		this.gpsccontactSystemResponsible = gpsccontactSystemResponsible;
	}

	public String getGpsccontactImpactedBusiness() {
		return gpsccontactImpactedBusiness;
	}

	public void setGpsccontactImpactedBusiness(String gpsccontactImpactedBusiness) {
		this.gpsccontactImpactedBusiness = gpsccontactImpactedBusiness;
	}

	public String getGpsccontactBusinessOwnerRepresentative() {
		return gpsccontactBusinessOwnerRepresentative;
	}

	public void setGpsccontactBusinessOwnerRepresentative(String gpsccontactBusinessOwnerRepresentative) {
		this.gpsccontactBusinessOwnerRepresentative = gpsccontactBusinessOwnerRepresentative;
	}

	public String getGpsccontactSupportGroupHidden() {
		return gpsccontactSupportGroupHidden;
	}

	public void setGpsccontactSupportGroupHidden(String gpsccontactSupportGroupHidden) {
		this.gpsccontactSupportGroupHidden = gpsccontactSupportGroupHidden;
	}

	public String getGpsccontactChangeTeamHidden() {
		return gpsccontactChangeTeamHidden;
	}

	public void setGpsccontactChangeTeamHidden(String gpsccontactChangeTeamHidden) {
		this.gpsccontactChangeTeamHidden = gpsccontactChangeTeamHidden;
	}

	public String getGpsccontactServiceCoordinatorHidden() {
		return gpsccontactServiceCoordinatorHidden;
	}

	public void setGpsccontactServiceCoordinatorHidden(String gpsccontactServiceCoordinatorHidden) {
		this.gpsccontactServiceCoordinatorHidden = gpsccontactServiceCoordinatorHidden;
	}

	public String getGpsccontactEscalationHidden() {
		return gpsccontactEscalationHidden;
	}

	public void setGpsccontactEscalationHidden(String gpsccontactEscalationHidden) {
		this.gpsccontactEscalationHidden = gpsccontactEscalationHidden;
	}

	public String getGpsccontactCiOwnerHidden() {
		return gpsccontactCiOwnerHidden;
	}

	public void setGpsccontactCiOwnerHidden(String gpsccontactCiOwnerHidden) {
		this.gpsccontactCiOwnerHidden = gpsccontactCiOwnerHidden;
	}

	public String getGpsccontactOwningBusinessGroupHidden() {
		return gpsccontactOwningBusinessGroupHidden;
	}

	public void setGpsccontactOwningBusinessGroupHidden(String gpsccontactOwningBusinessGroupHidden) {
		this.gpsccontactOwningBusinessGroupHidden = gpsccontactOwningBusinessGroupHidden;
	}

	public String getGpsccontactImplementationTeamHidden() {
		return gpsccontactImplementationTeamHidden;
	}

	public void setGpsccontactImplementationTeamHidden(String gpsccontactImplementationTeamHidden) {
		this.gpsccontactImplementationTeamHidden = gpsccontactImplementationTeamHidden;
	}

	public String getGpsccontactServiceCoordinatorIndivHidden() {
		return gpsccontactServiceCoordinatorIndivHidden;
	}

	public void setGpsccontactServiceCoordinatorIndivHidden(String gpsccontactServiceCoordinatorIndivHidden) {
		this.gpsccontactServiceCoordinatorIndivHidden = gpsccontactServiceCoordinatorIndivHidden;
	}

	public String getGpsccontactEscalationIndivHidden() {
		return gpsccontactEscalationIndivHidden;
	}

	public void setGpsccontactEscalationIndivHidden(String gpsccontactEscalationIndivHidden) {
		this.gpsccontactEscalationIndivHidden = gpsccontactEscalationIndivHidden;
	}

	public String getGpsccontactResponsibleAtCustomerSideHidden() {
		return gpsccontactResponsibleAtCustomerSideHidden;
	}

	public void setGpsccontactResponsibleAtCustomerSideHidden(String gpsccontactResponsibleAtCustomerSideHidden) {
		this.gpsccontactResponsibleAtCustomerSideHidden = gpsccontactResponsibleAtCustomerSideHidden;
	}

	public String getGpsccontactSystemResponsibleHidden() {
		return gpsccontactSystemResponsibleHidden;
	}

	public void setGpsccontactSystemResponsibleHidden(String gpsccontactSystemResponsibleHidden) {
		this.gpsccontactSystemResponsibleHidden = gpsccontactSystemResponsibleHidden;
	}

	public String getGpsccontactImpactedBusinessHidden() {
		return gpsccontactImpactedBusinessHidden;
	}

	public void setGpsccontactImpactedBusinessHidden(String gpsccontactImpactedBusinessHidden) {
		this.gpsccontactImpactedBusinessHidden = gpsccontactImpactedBusinessHidden;
	}

	public String getGpsccontactBusinessOwnerRepresentativeHidden() {
		return gpsccontactBusinessOwnerRepresentativeHidden;
	}

	public void setGpsccontactBusinessOwnerRepresentativeHidden(String gpsccontactBusinessOwnerRepresentativeHidden) {
		this.gpsccontactBusinessOwnerRepresentativeHidden = gpsccontactBusinessOwnerRepresentativeHidden;
	}

	public String getBusinessProcess() {
		return businessProcess;
	}

	public void setBusinessProcess(String businessProcess) {
		this.businessProcess = businessProcess;
	}

	public String getBusinessProcessHidden() {
		return businessProcessHidden;
	}

	public void setBusinessProcessHidden(String businessProcessHidden) {
		this.businessProcessHidden = businessProcessHidden;
	}

	public String getApplicationOwner() {
		return applicationOwner;
	}

	public void setApplicationOwner(String applicationOwner) {
		this.applicationOwner = applicationOwner;
	}

	public String getApplicationOwnerDelegate() {
		return applicationOwnerDelegate;
	}

	public void setApplicationOwnerDelegate(String applicationOwnerDelegate) {
		this.applicationOwnerDelegate = applicationOwnerDelegate;
	}
	
	public String getApplicationSteward() {
		return applicationSteward;
	}
	public void setApplicationSteward(String applicationSteward) {
		this.applicationSteward = applicationSteward;
	}

	public String getApplicationOwnerHidden() {
		return applicationOwnerHidden;
	}

	public void setApplicationOwnerHidden(String applicationOwnerHidden) {
		this.applicationOwnerHidden = applicationOwnerHidden;
	}

	public String getApplicationOwnerDelegateHidden() {
		return applicationOwnerDelegateHidden;
	}

	public void setApplicationOwnerDelegateHidden(String applicationOwnerDelegateHidden) {
		this.applicationOwnerDelegateHidden = applicationOwnerDelegateHidden;
	}

	public String getApplicationStewardHidden() {
		return applicationStewardHidden;
	}

	public void setApplicationStewardHidden(String applicationStewardHidden) {
		this.applicationStewardHidden = applicationStewardHidden;
	}
	
	public Long getCategoryBusinessId() {
		return categoryBusinessId;
	}

	public void setCategoryBusinessId(Long categoryBusinessId) {
		this.categoryBusinessId = categoryBusinessId;
	}

	public String getCategoryBusiness() {
		return categoryBusiness;
	}

	public void setCategoryBusiness(String categoryBusiness) {
		this.categoryBusiness = categoryBusiness;
	}

	public Long getTableId() {
		return tableId;
	}

	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	public Long getClassDataId() {
		return classDataId;
	}

	public void setClassDataId(Long classDataId) {
		this.classDataId = classDataId;
	}

	public String getClassData() {
		return classData;
	}

	public void setClassData(String classData) {
		this.classData = classData;
	}

	public Long getClassInformationId() {
		return classInformationId;
	}

	public void setClassInformationId(Long classInformationId) {
		this.classInformationId = classInformationId;
	}

	public String getClassInformationExplanation() {
		return classInformationExplanation;
	}

	public void setClassInformationExplanation(String classInformationExplanation) {
		this.classInformationExplanation = classInformationExplanation;
	}

	public String getApplicationProtection() {
		return applicationProtection;
	}

	public void setApplicationProtection(String applicationProtection) {
		this.applicationProtection = applicationProtection;
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

	public String getRelevanceGR1775() {
		return relevanceGR1775;
	}

	public void setRelevanceGR1775(String relevanceGR1775) {
		this.relevanceGR1775 = relevanceGR1775;
		if ("Y".equals(relevanceGR1775)) {
			setRelevance1775(new Long(-1));
		}
		else if ("N".equals(relevanceGR1775)) {
			setRelevance1775(new Long(0));
		}
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

	public String getRelevanceGR2008() {
		return relevanceGR2008;
	}

	public void setRelevanceGR2008(String relevanceGR2008) {
		this.relevanceGR2008 = relevanceGR2008;
		if ("Y".equals(relevanceGR2008)) {
			setRelevance2008(new Long(-1));
		}
		else if ("N".equals(relevanceGR2008)) {
			setRelevance2008(new Long(0));
		}
	}

	public Long getCiComplianceRequestId1435() {
		return ciComplianceRequestId1435;
	}

	public void setCiComplianceRequestId1435(Long ciComplianceRequestId1435) {
		this.ciComplianceRequestId1435 = ciComplianceRequestId1435;
	}

	public Long getCiComplianceRequestId1775() {
		return ciComplianceRequestId1775;
	}

	public void setCiComplianceRequestId1775(Long ciComplianceRequestId1775) {
		this.ciComplianceRequestId1775 = ciComplianceRequestId1775;
	}

	public Long getCiComplianceRequestId1920() {
		return ciComplianceRequestId1920;
	}

	public void setCiComplianceRequestId1920(Long ciComplianceRequestId1920) {
		this.ciComplianceRequestId1920 = ciComplianceRequestId1920;
	}

	public Long getCiComplianceRequestId2008() {
		return ciComplianceRequestId2008;
	}

	public void setCiComplianceRequestId2008(Long ciComplianceRequestId2008) {
		this.ciComplianceRequestId2008 = ciComplianceRequestId2008;
	}

	public String getUpStreamAdd() {
		return upStreamAdd;
	}

	public void setUpStreamAdd(String upStreamAdd) {
		this.upStreamAdd = upStreamAdd;
	}

	public String getUpStreamDelete() {
		return upStreamDelete;
	}

	public void setUpStreamDelete(String upStreamDelete) {
		this.upStreamDelete = upStreamDelete;
	}

	public String getDownStreamAdd() {
		return downStreamAdd;
	}

	public void setDownStreamAdd(String downStreamAdd) {
		this.downStreamAdd = downStreamAdd;
	}

	public String getDownStreamDelete() {
		return downStreamDelete;
	}

	public void setDownStreamDelete(String downStreamDelete) {
		this.downStreamDelete = downStreamDelete;
	}

	public String getServiceModel() {
		return serviceModel;
	}

	public void setServiceModel(String serviceModel) {
		this.serviceModel = serviceModel;
	}

	public String getOrganisationalScope() {
		return organisationalScope;
	}

	public void setOrganisationalScope(String organisationalScope) {
		this.organisationalScope = organisationalScope;
	}
	
	public Long getRelevance1775() {
		return relevance1775;
	}

	public void setRelevance1775(Long relevance1775) {
		this.relevance1775 = relevance1775;
	}

	public Long getRelevance2008() {
		return relevance2008;
	}

	public void setRelevance2008(Long relevance2008) {
		this.relevance2008 = relevance2008;
	}

	public String getBarRelevance() {
		return barRelevance;
	}

	public void setBarRelevance(String barRelevance) {
		this.barRelevance = barRelevance;
	}

}
