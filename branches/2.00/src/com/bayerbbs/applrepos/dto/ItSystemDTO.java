package com.bayerbbs.applrepos.dto;


public class ItSystemDTO extends CiBaseDTO {
	private Integer ciSubTypeId;
	
	//Specifics
	private Integer osNameId;//bestimmt gleichzeitig auch noch osType und osGroup
	private String clusterCode;
	private String clusterType;
	
	private String isVirtualHardwareClient;
	private String isVirtualHardwareHost;
	private String virtualHardwareSoftware;
	
	private Integer lifecycleStatusId;
	private Integer einsatzStatusId;
	
	private Integer primaryFunctionId;
	private Integer licenseScanningId;
	
	private Long severityLevelId;
	private Long businessEssentialId;
	
	private String gpsccontactSupportGroup;
	private String gpsccontactChangeTeam;
	private String gpsccontactServiceCoordinator;
	private String gpsccontactEscalation;
	private String gpsccontactCiOwner;

	private String gpsccontactServiceCoordinatorIndiv;
	private String gpsccontactEscalationIndiv;
	private String gpsccontactResponsibleAtCustomerSide;
	private String gpsccontactSystemResponsible;
	private String gpsccontactImpactedBusiness;
	private String gpsccontactSupportGroupHidden;
	private String gpsccontactChangeTeamHidden;
	private String gpsccontactServiceCoordinatorHidden;
	private String gpsccontactEscalationHidden;
	private String gpsccontactCiOwnerHidden;

	private String gpsccontactServiceCoordinatorIndivHidden;
	private String gpsccontactEscalationIndivHidden;
	private String gpsccontactResponsibleAtCustomerSideHidden;
	private String gpsccontactSystemResponsibleHidden;
	private String gpsccontactImpactedBusinessHidden;
	
	
	public Integer getCiSubTypeId() {
		return ciSubTypeId;
	}
	public void setCiSubTypeId(Integer ciSubTypeId) {
		this.ciSubTypeId = ciSubTypeId;
	}
	
	public Integer getOsNameId() {
		return osNameId;
	}
	public void setOsNameId(Integer osNameId) {
		this.osNameId = osNameId;
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
	public String getIsVirtualHardwareClient() {
		return isVirtualHardwareClient;
	}
	public void setIsVirtualHardwareClient(String isVirtualHardwareClient) {
		this.isVirtualHardwareClient = isVirtualHardwareClient;
	}
	public String getIsVirtualHardwareHost() {
		return isVirtualHardwareHost;
	}
	public void setIsVirtualHardwareHost(String isVirtualHardwareHost) {
		this.isVirtualHardwareHost = isVirtualHardwareHost;
	}
	public String getVirtualHardwareSoftware() {
		return virtualHardwareSoftware;
	}
	public void setVirtualHardwareSoftware(String virtualHardwareSoftware) {
		this.virtualHardwareSoftware = virtualHardwareSoftware;
	}
	public Integer getLifecycleStatusId() {
		return lifecycleStatusId;
	}
	public void setLifecycleStatusId(Integer lifecycleStatusId) {
		this.lifecycleStatusId = lifecycleStatusId;
	}
	public Integer getEinsatzStatusId() {
		return einsatzStatusId;
	}
	public void setEinsatzStatusId(Integer einsatzStatusId) {
		this.einsatzStatusId = einsatzStatusId;
	}
	public Integer getPrimaryFunctionId() {
		return primaryFunctionId;
	}
	public void setPrimaryFunctionId(Integer primaryFunctionId) {
		this.primaryFunctionId = primaryFunctionId;
	}
	public Integer getLicenseScanningId() {
		return licenseScanningId;
	}
	public void setLicenseScanningId(Integer licenseScanningId) {
		this.licenseScanningId = licenseScanningId;
	}
	
	public Long getSeverityLevelId() {
		return severityLevelId;
	}
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
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


}