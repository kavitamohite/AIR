package com.bayerbbs.applrepos.service;

public class BaseEditParameterInput {
	private String cwid;
	private String token;
	

	private Long id;
	private String name;
	
	private String ciOwner;
	private String ciOwnerHidden;
	private String ciOwnerDelegate;
	private String ciOwnerDelegateHidden;

	
	private Long slaId;
	private Long serviceContractId;
	
	private Long itset;
	private Long template;
	private Long itSecGroupId;
	private Long refId;
	
	private Long relevanceICS;
	private Long relevanzITSEC;
	private String relevanceGR1435;
	private String relevanceGR1920;
	//EUGXS
	//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
	private String relevanceGR2008;
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
	public String getRelevanceGR2008() {
		return relevanceGR2008;
	}
	public void setRelevanceGR2008(String relevanceGR2008) {
		this.relevanceGR2008 = relevanceGR2008;
	}
	private String gxpFlag;
	private String gxpFlagId;	// falls später über id referenziert wird
	
	private Long itSecSbAvailabilityId;
	private String itSecSbAvailabilityTxt;
//	private String itSecSbAvailabilityDescription;
	
	private Long itSecSbIntegrityId;
	private String itSecSbIntegrityTxt;
//	private String itSecSbIntegrityDescription;
	
	private Long classInformationId;
	private String classInformationExplanation;

	private String downStreamAdd;
	private String downStreamDelete;
	
	private String gpsccontactResponsibleAtCustomerSideHidden;
	private String gpsccontactSupportGroupHidden;
	private String gpsccontactChangeTeamHidden;
	private String gpsccontactServiceCoordinatorHidden;
	private String gpsccontactEscalationHidden;
	private String gpsccontactCiOwnerHidden;
	private String gpsccontactServiceCoordinatorIndivHidden;
	private String gpsccontactEscalationIndivHidden;
	private String gpsccontactSystemResponsibleHidden;
	private String gpsccontactImpactedBusinessHidden;
	
	private String gpsccontactResponsibleAtCustomerSide;
	private String gpsccontactSupportGroup;
	private String gpsccontactChangeTeam;
	private String gpsccontactServiceCoordinator;
	private String gpsccontactEscalation;
	private String gpsccontactCiOwner;
	private String gpsccontactServiceCoordinatorIndiv;
	private String gpsccontactEscalationIndiv;
	private String gpsccontactSystemResponsible;
	private String gpsccontactImpactedBusiness;

	
	
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
	

	public Long getSlaId() {
		return slaId;
	}
	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}
	public Long getServiceContractId() {
		return serviceContractId;
	}
	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
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
	public Long getRelevanzITSEC() {
		return relevanzITSEC;
	}
	public void setRelevanzITSEC(Long relevanzITSEC) {
		this.relevanzITSEC = relevanzITSEC;
	}
	public String getRelevanceGR1435() {
		return relevanceGR1435;
	}
	public void setRelevanceGR1435(String relevanceGR1435) {
		this.relevanceGR1435 = relevanceGR1435;
	}
	public String getRelevanceGR1920() {
		return relevanceGR1920;
	}
	public void setRelevanceGR1920(String relevanceGR1920) {
		this.relevanceGR1920 = relevanceGR1920;
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
	
	
	public Long getItSecSbAvailabilityId() {
		return itSecSbAvailabilityId;
	}
	public void setItSecSbAvailabilityId(Long itSecSbAvailabilityId) {
		this.itSecSbAvailabilityId = itSecSbAvailabilityId;
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
	
	public Long getItSecSbIntegrityId() {
		return itSecSbIntegrityId;
	}
	public void setItSecSbIntegrityId(Long itSecSbIntegrityId) {
		this.itSecSbIntegrityId = itSecSbIntegrityId;
	}
	public String getItSecSbIntegrityTxt() {
		return itSecSbIntegrityTxt;
	}
	public void setItSecSbIntegrityTxt(String itSecSbIntegrityTxt) {
		this.itSecSbIntegrityTxt = itSecSbIntegrityTxt;
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
	
	public String getGpsccontactResponsibleAtCustomerSideHidden() {
		return gpsccontactResponsibleAtCustomerSideHidden;
	}
	public void setGpsccontactResponsibleAtCustomerSideHidden(String gpsccontactResponsibleAtCustomerSideHidden) {
		this.gpsccontactResponsibleAtCustomerSideHidden = gpsccontactResponsibleAtCustomerSideHidden;
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
	public String getGpsccontactResponsibleAtCustomerSide() {
		return gpsccontactResponsibleAtCustomerSide;
	}
	public void setGpsccontactResponsibleAtCustomerSide(String gpsccontactResponsibleAtCustomerSide) {
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
	//Added by vandana
	private String providerName;
	private String providerNameHidden;
	
	private String providerAddress;
	private String providerAddressHidden;



	/**
	 * @return the providerName
	 */
	public String getProviderName() {
		return providerName;
	}
	/**
	 * @param providerName the providerName to set
	 */
	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}
	/**
	 * @return the provider_NameHidden
	 */
	public String getProviderNameHidden() {
		return providerNameHidden;
	}
	/**
	 * @param provider_NameHidden the provider_NameHidden to set
	 */
	public void setProvider_NameHidden(String providerNameHidden) {
		this.providerNameHidden = providerNameHidden;
	}
	/**
	 * @return the providerAddress
	 */
	public String getProviderAddress() {
		return providerAddress;
	}
	/**
	 * @param providerAddress the providerAddress to set
	 */
	public void setProviderAddress(String providerAddress) {
		this.providerAddress = providerAddress;
	}
	/**
	 * @return the provider_AddressHidden
	 */
	public String getProviderAddressHidden() {
		return providerAddressHidden;
	}
	/**
	 * @param provider_AddressHidden the provider_AddressHidden to set
	 */
	public void setProviderAddressHidden(String providerAddressHidden) {
		this.providerAddressHidden = providerAddressHidden;
	}



}