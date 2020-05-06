package com.bayerbbs.applrepos.dto;

import com.bayerbbs.applrepos.constants.AirKonstanten;

public class CiBaseDTO {// implements Serializable
	private Long id;
	private Integer tableId;
	private String name;
	private String alias;

	private String ciOwner;
	private String ciOwnerHidden;
	private String ciOwnerDelegate;
	private String ciOwnerDelegateHidden;

	
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

	private Long slaId;
	private String slaName;
	private Long serviceContractId;
	
	// compliance
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	private String templateLinkWithCIs;
	
	private String relevanceGR1435;//ITSEC
	private String relevanceGR1920;//ICS
	//EUGXS
	//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
	private String relevanceGR2008;
	private String relevanceCD3010;
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

	private String relevanceCD3011;
	
	public String getRelevanceGR2008() {
		return relevanceGR2008;
	}

	public void setRelevanceGR2008(String relevanceGR2008) {
		this.relevanceGR2008 = relevanceGR2008;
	}
//	ELERJ ICS
//	private Long relevanceICS;
	private Long relevanzItsec;
	
//	ELERJ GXP
//	private String gxpFlag;
//	private String gxpFlagId;// falls später über id referenziert wird
	
	// Protection
	private Long itSecSbAvailabilityId;
	private String itSecSbAvailabilityTxt;
	
	
	//nur Application!!
	private Long classInformationId;
	private String classInformationTxt;
	
	
	private Long itSecSbIntegrityId;
	private String itSecSbIntegrityTxt;


	
	//====================
	private String relevanceOperational = AirKonstanten.NO_SHORT;
	
//	Rechteeinschränkungen auf einzelne Felder, wenn CI aus anderen Quellen als SISECGui, AIR kommt
	
	private String ciOwnerAcl;
	private String ciOwnerDelegateAcl;
	
	private String relevanceGR1435Acl;
	private String relevanceGR1920Acl;
	
	private String gxpFlagIdAcl;
	private String refIdAcl;
	private String itsecGroupIdAcl;
	
	private String slaIdAcl;
	private String serviceContractIdAcl;
	
	
//	private String serviceLevelAcl; //Application, Room/Raum, Position/Schrank
//	private String priorityLevelAcl; //Application
	
	
	private String downStreamAdd;
	private String downStreamDelete;	
	
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
	
	
	private String messageText;				// only to display information to the user about restricted edit rights
	private String messageTextSecureSystem;	// only to display information to the user concerning secure systems
	
	//====================
	
	public CiBaseDTO() {}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public Integer getTableId() {
		return tableId;
	}

	public void setTableId(Integer tableId) {
		this.tableId = tableId;
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

	public String getRelevanceGR1920() {
		return relevanceGR1920;
	}
	public void setRelevanceGR1920(String relevanceGR1920) {
		this.relevanceGR1920 = relevanceGR1920;
		/*if ("Y".equals(relevanceGR1920)) {
			setRelevanceICS(new Long(-1));
		}
		else if ("N".equals(relevanceGR1920)) {
			setRelevanceICS(new Long(0));
		}*/
	}
	
	public Long getRelevanzItsec() {
		return relevanzItsec;
	}
	public void setRelevanzItsec(Long relevanzItsec) {
		this.relevanzItsec = relevanzItsec;
	}
//	ELERJ ICS
	/*public Long getRelevanceICS() {
		return relevanceICS;
	}
	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}*/

//	ELERJ GXP
	/*public String getGxpFlag() {
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
*/
	public String getCiOwnerAcl() {
		return ciOwnerAcl;
	}
	public void setCiOwnerAcl(String ciOwnerAcl) {
		this.ciOwnerAcl = ciOwnerAcl;
	}

	public String getCiOwnerDelegateAcl() {
		return ciOwnerDelegateAcl;
	}
	public void setCiOwnerDelegateAcl(String ciOwnerDelegateAcl) {
		this.ciOwnerDelegateAcl = ciOwnerDelegateAcl;
	}

	public String getRelevanceGR1435Acl() {
		return relevanceGR1435Acl;
	}
	public void setRelevanceGR1435Acl(String relevanceGR1435Acl) {
		this.relevanceGR1435Acl = relevanceGR1435Acl;
	}

	public String getRelevanceGR1920Acl() {
		return relevanceGR1920Acl;
	}
	public void setRelevanceGR1920Acl(String relevanceGR1920Acl) {
		this.relevanceGR1920Acl = relevanceGR1920Acl;
	}

//	ELERJ GXP
	/*public String getGxpFlagIdAcl() {
		return gxpFlagIdAcl;
	}
	public void setGxpFlagIdAcl(String gxpFlagIdAcl) {
		this.gxpFlagIdAcl = gxpFlagIdAcl;
	}*/

	public String getRefIdAcl() {
		return refIdAcl;
	}
	public void setRefIdAcl(String refIdAcl) {
		this.refIdAcl = refIdAcl;
	}

	public String getItsecGroupIdAcl() {
		return itsecGroupIdAcl;
	}
	public void setItsecGroupIdAcl(String itsecGroupIdAcl) {
		this.itsecGroupIdAcl = itsecGroupIdAcl;
	}

	public String getSlaIdAcl() {
		return slaIdAcl;
	}
	public void setSlaIdAcl(String slaIdAcl) {
		this.slaIdAcl = slaIdAcl;
	}

	public String getServiceContractIdAcl() {
		return serviceContractIdAcl;
	}
	public void setServiceContractIdAcl(String serviceContractIdAcl) {
		this.serviceContractIdAcl = serviceContractIdAcl;
	}

	public String getRelevanceOperational() {
		return relevanceOperational;
	}
	public void setRelevanceOperational(String relevanceOperational) {
		this.relevanceOperational = relevanceOperational;
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
	
	//nur Application!!
//	public Long getClassInformationId() {
//		return classInformationId;
//	}
//	public void setClassInformationId(Long classInformationId) {
//		this.classInformationId = classInformationId;
//	}
//	public String getClassInformationExplanation() {
//		return classInformationExplanation;
//	}
//	public void setClassInformationExplanation(String classInformationExplanation) {
//		this.classInformationExplanation = classInformationExplanation;
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
		if (null != classInformationId && AirKonstanten.CONFIDENTIALITY_SECRET.longValue() == classInformationId.longValue()){
			setMessageTextSecureSystem("secureSystem");
		}
	}

	/**
	 * @return the classInformationExplanation
	 */
	public String getClassInformationTxt() {
		return classInformationTxt;
	}

	/**
	 * @param classInformationExplanation the classInformationExplanation to set
	 */
	public void setClassInformationTxt(String classInformationTxt) {
		this.classInformationTxt = classInformationTxt;
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

	public String getMessageText() {
		return messageText;
	}

	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}

	public String getMessageTextSecureSystem() {
		return messageTextSecureSystem;
	}

	public void setMessageTextSecureSystem(String messageTextSecureSystem) {
		this.messageTextSecureSystem = messageTextSecureSystem;
	}

	/**
	 * @return the templateLinkWithCIs
	 */
	public String getTemplateLinkWithCIs() {
		return templateLinkWithCIs;
	}

	/**
	 * @param templateLinkWithCIs the templateLinkWithCIs to set
	 */
	public void setTemplateLinkWithCIs(String templateLinkWithCIs) {
		this.templateLinkWithCIs = templateLinkWithCIs;
	}
	
}