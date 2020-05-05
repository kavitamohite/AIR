package com.bayerbbs.applrepos.dto;

import com.bayerbbs.applrepos.constants.AirKonstanten;



public class ApplicationDTO extends CiBaseDTO {
	private static final long serialVersionUID = 6615538451865795610L;

	//private String barApplicationId;
	
	private Long applicationCat2Id;
	private String applicationCat2Txt;

	private Long applicationCat1Id;
	private String applicationCat1Txt;
	
	private Long primaryFunctionId;
	private String primaryFunctionTxt;
	
	private String comments;

	private Long lifecycleStatusId;
	private String lifecycleStatusTxt;

	private Long operationalStatusId;
	private String operationalStatusTxt;

	private String userCreate;
	
	
	private String applicationOwner;
	private String applicationOwnerHidden;
	private String applicationOwnerDelegate;
	private String applicationOwnerDelegateHidden;
	private String applicationSteward;
	private String applicationStewardHidden;
	
	private String itsetName;
	
	// compliance request
	private String relevanceGR2059;
	private String relevanceGR2008;
	
	private Long relevance2059;
	private Long relevance2008;
	
	
	private String templateReferencedByItem; 
	
	private String refTxt;
	private String itsecGroup;
	
	private Long serviceContractId;
	private String serviceContract;

	private Long priorityLevelId;
	private String priorityLevel;
	private Long severityLevelId;
	private String severityLevel;
	private String locationPath;
	private Long businessEssentialId;
	private String businessEssential;
	
	private String gxpFlagTxt;	// kann ausgelagert werden in gxpFlag - Methoden anpassen !!!

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

	// Protection
	private Long itSecSbIntegrityId;
	private String itSecSbIntegrityTxt;
	private String itSecSbIntegrityDescription;
	private Long itSecSbAvailabilityId;
	private String itSecSbAvailabilityTxt;
	private Long classInformationId;
	private String classInformationExplanation;

	// gpsc (baseCiDTO / local)
	private String gpsccontactOwningBusinessGroup;
	private String gpsccontactImplementationTeam;
	private String gpsccontactBusinessOwnerRepresentative;
	
	private String gpsccontactOwningBusinessGroupHidden;
	private String gpsccontactImplementationTeamHidden;
	private String gpsccontactBusinessOwnerRepresentativeHidden;
	
	// connections
	private String businessProcess;
	private String businessProcessHidden;
	private String organisationalScope;
	//private String barRelevance;
	private Long categoryBusinessId;
	private String categoryBusiness;

	private Long classDataId;
	private String classData;
	private String applicationProtection;	// only for display usage
	private String serviceModel;


	// connections
	private String upStreamAdd;
	private String upStreamDelete;
	private String downStreamAdd;
	private String downStreamDelete;
	
	private String serviceEnvironmentOwner;
	
	public ApplicationDTO() {
	}

	/*public String getBarApplicationId() {
		return barApplicationId;
	}

	public void setBarApplicationId(String barApplicationId) {
		this.barApplicationId = barApplicationId;
	}*/

	public Long getApplicationCat2Id() {
		return applicationCat2Id;
	}

	public void setApplicationCat2Id(Long applicationCat2Id) {
		this.applicationCat2Id = applicationCat2Id;
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

	public String getItsecGroup() {
		return itsecGroup;
	}

	public void setItsecGroup(String itsecGroup) {
		this.itsecGroup = itsecGroup;
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

	/*public Long getSeverityLevelId() {
		return severityLevelId;
	}

	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}*/

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

	public String getTemplateReferencedByItem() {
		return templateReferencedByItem;
	}

	public void setTemplateReferencedByItem(String templateReferencedByItem) {
		this.templateReferencedByItem = templateReferencedByItem;
	}

	public String getGxpFlagTxt() {
		return gxpFlagTxt;
	}

	public void setGxpFlagTxt(String gxpFlagTxt) {
		this.gxpFlagTxt = gxpFlagTxt;
	}

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

	public void setCiSupportStuffProvidedMachineUsers(String ciSupportStuffProvidedMachineUsers) {
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
//	public String getItSecSbAvailabilityTxt() {
//		return itSecSbAvailabilityTxt;
//	}
//	public void setItSecSbAvailabilityTxt(String itSecSbAvailabilityTxt) {
//		this.itSecSbAvailabilityTxt = itSecSbAvailabilityTxt;
//	}

//	public Long getItSecSbConfidentialityId() {
//		return itSecSbConfidentialityId;
//	}
//	public void setItSecSbConfidentialityId(Long itSecSbConfidentialityId) {
//		this.itSecSbConfidentialityId = itSecSbConfidentialityId;
//	}

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
//	public String getItSecSbAvailabilityDescription() {
//		return itSecSbAvailabilityDescription;
//	}
//	public void setItSecSbAvailabilityDescription(String itSecSbAvailabilityDescription) {
//		this.itSecSbAvailabilityDescription = itSecSbAvailabilityDescription;
//	}

//	public String getItSecSbConfidentialityTxt() {
//		return itSecSbConfidentialityTxt;
//	}
//	public void setItSecSbConfidentialityTxt(String itSecSbConfidentialityTxt) {
//		this.itSecSbConfidentialityTxt = itSecSbConfidentialityTxt;
//	}
//	public String getItSecSbConfidentialityDescription() {
//		return itSecSbConfidentialityDescription;
//	}
//	public void setItSecSbConfidentialityDescription(String itSecSbConfidentialityDescription) {
//		this.itSecSbConfidentialityDescription = itSecSbConfidentialityDescription;
//	}

	
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

	public String getGpsccontactBusinessOwnerRepresentative() {
		return gpsccontactBusinessOwnerRepresentative;
	}

	public void setGpsccontactBusinessOwnerRepresentative(String gpsccontactBusinessOwnerRepresentative) {
		this.gpsccontactBusinessOwnerRepresentative = gpsccontactBusinessOwnerRepresentative;
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
		// RFC 10057 info message secure system
		if (null != classInformationId && AirKonstanten.CONFIDENTIALITY_SECRET.longValue() == classInformationId.longValue()){
			setMessageTextSecureSystem("secureSystem");
		}
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

	public String getRelevanceGR2059() {
		return relevanceGR2059;
	}

	public void setRelevanceGR2059(String relevanceGR2059) {
		this.relevanceGR2059 = relevanceGR2059;
		if ("Y".equals(relevanceGR2059)) {
			setRelevance2059(new Long(-1));
		}
		else if ("N".equals(relevanceGR2059)) {
			setRelevance2059(new Long(0));
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
	
	public Long getRelevance2059() {
		return relevance2059;
	}

	public void setRelevance2059(Long relevance2059) {
		this.relevance2059 = relevance2059;
	}

	public Long getRelevance2008() {
		return relevance2008;
	}

	public void setRelevance2008(Long relevance2008) {
		this.relevance2008 = relevance2008;
	}

	/*public String getBarRelevance() {
		return barRelevance;
	}

	public void setBarRelevance(String barRelevance) {
		this.barRelevance = barRelevance;
	}*/

	public String getServiceEnvironmentOwner() {
		return serviceEnvironmentOwner;
	}

	public void setServiceEnvironmentOwner(String serviceEnvironmentOwner) {
		this.serviceEnvironmentOwner = serviceEnvironmentOwner;
	}

}
