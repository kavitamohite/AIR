package com.bayerbbs.applrepos.service;

public class ApplicationEditParameterInput {

	private String cwid;
	private String token;
	

	// basic
	private Long applicationId;
	private String applicationName;
	private String applicationAlias;
	
	private String barRelevance;
	
	private String version;

	private Long applicationCat2Id;

	private String clusterCode;

	private String clusterType;

	private String comments;

	private Long lifecycleStatusId;

	private Long operationalStatusId;
	
	private String organisationalScope;

	// contacts
	private String responsible;
	private String responsibleHidden;

	private String subResponsible;
	private String subResponsibleHidden;
	
	// owner
	private String applicationOwner;
	private String applicationOwnerHidden;
	
	private String applicationSteward;
	private String applicationStewardHidden;
	
	private String applicationOwnerDelegate;
	private String applicationOwnerDelegateHidden;
	

	private String gpsccontactResponsibleAtCustomerSideHidden;
	private String gpsccontactSupportGroupHidden;
	private String gpsccontactChangeTeamHidden;
	private String gpsccontactServiceCoordinatorHidden;
	private String gpsccontactEscalationHidden;
	private String gpsccontactCiOwnerHidden;
	private String gpsccontactOwningBusinessGroupHidden;
	private String gpsccontactImplementationTeamHidden;
	private String gpsccontactServiceCoordinatorIndivHidden;
	private String gpsccontactEscalationIndivHidden;
	private String gpsccontactSystemResponsibleHidden;
	private String gpsccontactImpactedBusinessHidden;
	private String gpsccontactBusinessOwnerRepresentativeHidden;
	
	private String gpsccontactResponsibleAtCustomerSide;
	private String gpsccontactSupportGroup;
	private String gpsccontactChangeTeam;
	private String gpsccontactServiceCoordinator;
	private String gpsccontactEscalation;
	private String gpsccontactCiOwner;
	private String gpsccontactOwningBusinessGroup;
	private String gpsccontactImplementationTeam;
	private String gpsccontactServiceCoordinatorIndiv;
	private String gpsccontactEscalationIndiv;
	private String gpsccontactSystemResponsible;
	private String gpsccontactImpactedBusiness;
	private String gpsccontactBusinessOwnerRepresentative;
	
	
	// agreements
	private Long slaName;
	private Long priorityLevel;
	private Long serviceContract;
	private Long severityLevel;
	private Long businessEssentialId;

	
	
	// compliance
	private Long itset;
	private Long template;
	private Long itSecGroupId;
	private Long refId;
	private Long relevanceICS;
	private Long relevanzItsec;
	private String gxpFlag;
	//private String riskAnalysisYN;
	// ---
	
	
	// license & costs
	private Long licenseTypeId;
	private String dedicated;
	private Long accessingUserCount;
	private Long accessingUserCountMeasured;
	private String loadClass;
	private String serviceModel;
	private Long costRunPa;
	private Long costChangePa;
	private Long currencyId;
	private Long costRunAccountId;
	private Long costChangeAccountId;
	private String licenseUsingRegions;

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
	
	// it Sec Sb
	private Long itSecSbAvailability;
	private String itSecSbAvailabilityTxt;
	private String itSecSbAvailabilityDescription;
	
	private Long categoryBusinessId;
	
	private Long classDataId;
	private Long classInformationId;
	private String classInformationExplanation;
	
	// businessProcess
	private String businessProcess;	
	private String businessProcessHidden;	
	
	// compliance request
	private String relevanceGR1435;
	private String relevanceGR1775;
	private String relevanceGR1920;
	private String relevanceGR2008;

	// connections
	private String upStreamAdd;
	private String upStreamDelete;
	private String downStreamAdd;
	private String downStreamDelete;
	
	private Boolean forceOverride;
	
	
	public ApplicationEditParameterInput() {
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


	public Long getApplicationId() {
		return applicationId;
	}


	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
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


	public Long getItSecGroupId() {
		return itSecGroupId;
	}


	public void setItSecGroupId(Long itSecGroupId) {
		this.itSecGroupId = itSecGroupId;
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


	public Long getRelevanzItsec() {
		return relevanzItsec;
	}


	public void setRelevanzItsec(Long relevanzItsec) {
		this.relevanzItsec = relevanzItsec;
	}


	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}


	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}


// task 142
//	public String getRiskAnalysisYN() {
//		return riskAnalysisYN;
//	}
//
//
//	public void setRiskAnalysisYN(String riskAnalysisYN) {
//		this.riskAnalysisYN = riskAnalysisYN;
//	}

	public String getGxpFlag() {
		return gxpFlag;
	}

	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}

	public Long getLicenseTypeId() {
		return licenseTypeId;
	}


	public void setLicenseTypeId(Long licenseTypeId) {
		this.licenseTypeId = licenseTypeId;
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

	public String getServiceModel() {
		return serviceModel;
	}


	public void setServiceModel(String serviceModel) {
		this.serviceModel = serviceModel;
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


	public Long getCostRunAccountId() {
		return costRunAccountId;
	}


	public void setCostRunAccountId(Long costRunAccountId) {
		this.costRunAccountId = costRunAccountId;
	}


	public Long getCostChangeAccountId() {
		return costChangeAccountId;
	}


	public void setCostChangeAccountId(Long costChangeAccountId) {
		this.costChangeAccountId = costChangeAccountId;
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


	public Long getItSecSbAvailability() {
		return itSecSbAvailability;
	}


	public void setItSecSbAvailability(Long itSecSbAvailability) {
		this.itSecSbAvailability = itSecSbAvailability;
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

	
	public Long getSlaName() {
		return slaName;
	}


	public void setSlaName(Long slaName) {
		this.slaName = slaName;
	}


	public Long getPriorityLevel() {
		return priorityLevel;
	}


	public void setPriorityLevel(Long priorityLevel) {
		this.priorityLevel = priorityLevel;
	}


	public Long getServiceContract() {
		return serviceContract;
	}


	public void setServiceContract(Long serviceContract) {
		this.serviceContract = serviceContract;
	}


	public Long getSeverityLevel() {
		return severityLevel;
	}


	public void setSeverityLevel(Long severityLevel) {
		this.severityLevel = severityLevel;
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


	public String getGpsccontactResponsibleAtCustomerSideHidden() {
		return gpsccontactResponsibleAtCustomerSideHidden;
	}


	public void setGpsccontactResponsibleAtCustomerSideHidden(
			String gpsccontactResponsibleAtCustomerSideHidden) {
		this.gpsccontactResponsibleAtCustomerSideHidden = gpsccontactResponsibleAtCustomerSideHidden;
	}


	public String getGpsccontactSupportGroupHidden() {
		return gpsccontactSupportGroupHidden;
	}


	public void setGpsccontactSupportGroupHidden(
			String gpsccontactSupportGroupHidden) {
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


	public void setGpsccontactServiceCoordinatorHidden(
			String gpsccontactServiceCoordinatorHidden) {
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


	public void setGpsccontactOwningBusinessGroupHidden(
			String gpsccontactOwningBusinessGroupHidden) {
		this.gpsccontactOwningBusinessGroupHidden = gpsccontactOwningBusinessGroupHidden;
	}


	public String getGpsccontactImplementationTeamHidden() {
		return gpsccontactImplementationTeamHidden;
	}


	public void setGpsccontactImplementationTeamHidden(
			String gpsccontactImplementationTeamHidden) {
		this.gpsccontactImplementationTeamHidden = gpsccontactImplementationTeamHidden;
	}


	public String getGpsccontactServiceCoordinatorIndivHidden() {
		return gpsccontactServiceCoordinatorIndivHidden;
	}


	public void setGpsccontactServiceCoordinatorIndivHidden(
			String gpsccontactServiceCoordinatorIndivHidden) {
		this.gpsccontactServiceCoordinatorIndivHidden = gpsccontactServiceCoordinatorIndivHidden;
	}


	public String getGpsccontactEscalationIndivHidden() {
		return gpsccontactEscalationIndivHidden;
	}


	public void setGpsccontactEscalationIndivHidden(
			String gpsccontactEscalationIndivHidden) {
		this.gpsccontactEscalationIndivHidden = gpsccontactEscalationIndivHidden;
	}


	public String getGpsccontactSystemResponsibleHidden() {
		return gpsccontactSystemResponsibleHidden;
	}


	public void setGpsccontactSystemResponsibleHidden(
			String gpsccontactSystemResponsibleHidden) {
		this.gpsccontactSystemResponsibleHidden = gpsccontactSystemResponsibleHidden;
	}


	public String getGpsccontactImpactedBusinessHidden() {
		return gpsccontactImpactedBusinessHidden;
	}


	public void setGpsccontactImpactedBusinessHidden(
			String gpsccontactImpactedBusinessHidden) {
		this.gpsccontactImpactedBusinessHidden = gpsccontactImpactedBusinessHidden;
	}


	public String getGpsccontactBusinessOwnerRepresentativeHidden() {
		return gpsccontactBusinessOwnerRepresentativeHidden;
	}


	public void setGpsccontactBusinessOwnerRepresentativeHidden(
			String gpsccontactBusinessOwnerRepresentativeHidden) {
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


	public String getApplicationOwnerHidden() {
		return applicationOwnerHidden;
	}


	public void setApplicationOwnerHidden(String applicationOwnerHidden) {
		this.applicationOwnerHidden = applicationOwnerHidden;
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

	public Long getCategoryBusinessId() {
		return categoryBusinessId;
	}


	public void setCategoryBusinessId(Long categoryBusinessId) {
		this.categoryBusinessId = categoryBusinessId;
	}


	public Long getClassDataId() {
		return classDataId;
	}


	public void setClassDataId(Long classDataId) {
		this.classDataId = classDataId;
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


	public String getRelevanceGR1435() {
		return relevanceGR1435;
	}


	public void setRelevanceGR1435(String relevanceGR1435) {
		this.relevanceGR1435 = relevanceGR1435;
	}


	public String getRelevanceGR1775() {
		return relevanceGR1775;
	}


	public void setRelevanceGR1775(String relevanceGR1775) {
		this.relevanceGR1775 = relevanceGR1775;
	}


	public String getRelevanceGR1920() {
		return relevanceGR1920;
	}


	public void setRelevanceGR1920(String relevanceGR1920) {
		this.relevanceGR1920 = relevanceGR1920;
	}


	public String getRelevanceGR2008() {
		return relevanceGR2008;
	}


	public void setRelevanceGR2008(String relevanceGR2008) {
		this.relevanceGR2008 = relevanceGR2008;
	}


	public String getGpsccontactResponsibleAtCustomerSide() {
		return gpsccontactResponsibleAtCustomerSide;
	}


	public void setGpsccontactResponsibleAtCustomerSide(
			String gpsccontactResponsibleAtCustomerSide) {
		this.gpsccontactResponsibleAtCustomerSide = gpsccontactResponsibleAtCustomerSide;
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


	public void setGpsccontactServiceCoordinator(
			String gpsccontactServiceCoordinator) {
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


	public void setGpsccontactOwningBusinessGroup(
			String gpsccontactOwningBusinessGroup) {
		this.gpsccontactOwningBusinessGroup = gpsccontactOwningBusinessGroup;
	}


	public String getGpsccontactImplementationTeam() {
		return gpsccontactImplementationTeam;
	}


	public void setGpsccontactImplementationTeam(
			String gpsccontactImplementationTeam) {
		this.gpsccontactImplementationTeam = gpsccontactImplementationTeam;
	}


	public String getGpsccontactServiceCoordinatorIndiv() {
		return gpsccontactServiceCoordinatorIndiv;
	}


	public void setGpsccontactServiceCoordinatorIndiv(
			String gpsccontactServiceCoordinatorIndiv) {
		this.gpsccontactServiceCoordinatorIndiv = gpsccontactServiceCoordinatorIndiv;
	}


	public String getGpsccontactEscalationIndiv() {
		return gpsccontactEscalationIndiv;
	}


	public void setGpsccontactEscalationIndiv(String gpsccontactEscalationIndiv) {
		this.gpsccontactEscalationIndiv = gpsccontactEscalationIndiv;
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


	public void setGpsccontactBusinessOwnerRepresentative(
			String gpsccontactBusinessOwnerRepresentative) {
		this.gpsccontactBusinessOwnerRepresentative = gpsccontactBusinessOwnerRepresentative;
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


	public void setForceOverride(Boolean forceOverride) {
		this.forceOverride = forceOverride;
	}


	public Boolean getForceOverride() {
		return forceOverride;
	}


	public String getOrganisationalScope() {
		return organisationalScope;
	}


	public void setOrganisationalScope(String organisationalScope) {
		this.organisationalScope = organisationalScope;
	}


	public String getBarRelevance() {
		return barRelevance;
	}


	public void setBarRelevance(String barRelevance) {
		this.barRelevance = barRelevance;
	}
	
}
