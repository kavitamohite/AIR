package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

@MappedSuperclass
public abstract class CiBase extends DeletableRevisionInfo {
	private Long id;
	private String name;
	
	private String ciOwner;
	private String ciOwnerDelegate;
	
	// compliance
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	
	private Long relevanceICS;
	private Long relevanceITSEC;
	private String gxpFlag;
	
	private Long slaId;
	private Long serviceContractId;
	
	private Long itSecSbAvailability;
	private String itSecSbAvailabilityText;
	
	//nur Application!!
//	private Long classInformationId;
//	private String classInformationExplanation;
	private Long itSecSbIntegrityId;
//	private String itSecSbIntegrityTxt;
	private String itSecSbIntegrityDescription;

	private Long itSecSbConfidentialityId;
//	private String itSecSbConfidentialityTxt;
	private String itSecSbConfidentialityDescription;
	
	
	@Transient
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	@Transient
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	
	
	@Column(name = "RESPONSIBLE")
	public String getCiOwner() {
		return ciOwner;
	}

	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}

	@Column(name = "SUB_RESPONSIBLE")
	public String getCiOwnerDelegate() {
		return ciOwnerDelegate;
	}

	public void setCiOwnerDelegate(String ciOwnerDelegate) {
		this.ciOwnerDelegate = ciOwnerDelegate;
	}
	
	@Column(name = "ITSET")
	public Long getItset() {
		return itset;
	}

	public void setItset(Long itset) {
		this.itset = itset;
	}

	@Column(name = "TEMPLATE")
	public Long getTemplate() {
		return template;
	}

	public void setTemplate(Long template) {
		this.template = template;
	}

	@Column(name = "ITSEC_GRUPPE_ID")
	public Long getItsecGroupId() {
		return itsecGroupId;
	}

	public void setItsecGroupId(Long itsecGroupId) {
		this.itsecGroupId = itsecGroupId;
	}

	@Column(name = "REF_ID")
	public Long getRefId() {
		return refId;
	}

	public void setRefId(Long refId) {
		this.refId = refId;
	}
	
	
	@Column(name = "RELEVANCE_ICS")
	public Long getRelevanceICS() {
		return relevanceICS;
	}

	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}

	@Column(name = "RELEVANZ_ITSEC")
	public Long getRelevanceITSEC() {
		return relevanceITSEC;
	}

	public void setRelevanceITSEC(Long relevanceITSEC) {
		this.relevanceITSEC = relevanceITSEC;
	}

	@Column(name = "GXP_FLAG")
	public String getGxpFlag() {
		return gxpFlag;
	}

	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
	
	
	@Column(name = "SERVICE_CONTRACT_ID")
	public Long getServiceContractId() {
		return serviceContractId;
	}

	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}


	
	@Column(name = "SLA_ID")
	public Long getSlaId() {
		return slaId;
	}

	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}
	
	
	@Column(name = "ITSEC_SB_VERFG_ID")
	public Long getItSecSbAvailability() {
		return itSecSbAvailability;
	}
	public void setItSecSbAvailability(Long itSecSbAvailability) {
		this.itSecSbAvailability = itSecSbAvailability;
	}


	@Column(name = "ITSEC_SB_VERFG_TXT")
	public String getItSecSbAvailabilityText() {
		return itSecSbAvailabilityText;
	}
	public void setItSecSbAvailabilityText(String itSecSbAvailabilityText) {
		this.itSecSbAvailabilityText = itSecSbAvailabilityText;
	}
	
	
	//nur Application!!
//	@Column(name = "CLASS_INFORMATION_ID")
//	public Long getClassInformationId() {
//		return classInformationId;
//	}
//
//	public void setClassInformationId(Long classInformationId) {
//		this.classInformationId = classInformationId;
//	}
//
//	@Column(name = "CLASS_INFORMATION_EXPLANATION")
//	public String getClassInformationExplanation() {
//		return classInformationExplanation;
//	}
//
//	public void setClassInformationExplanation(String classInformationExplanation) {
//		this.classInformationExplanation = classInformationExplanation;
//	}
	
	@Column(name = "ITSEC_SB_INTEG_ID")
	public Long getItSecSbIntegrityId() {
		return itSecSbIntegrityId;
	}
	public void setItSecSbIntegrityId(Long itSecSbIntegrityId) {
		this.itSecSbIntegrityId = itSecSbIntegrityId;
	}
//	public String getItSecSbIntegrityTxt() {
//		return itSecSbIntegrityTxt;
//	}
//	public void setItSecSbIntegrityTxt(String itSecSbIntegrityTxt) {
//		this.itSecSbIntegrityTxt = itSecSbIntegrityTxt;
//	}
	
	@Column(name = "ITSEC_SB_INTEG_TXT")
	public String getItSecSbIntegrityDescription() {
		return itSecSbIntegrityDescription;
	}
	public void setItSecSbIntegrityDescription(String itSecSbIntegrityDescription) {
		this.itSecSbIntegrityDescription = itSecSbIntegrityDescription;
	}

	
	@Column(name = "ITSEC_SB_VERTR_ID")
	public Long getItSecSbConfidentialityId() {
		return itSecSbConfidentialityId;
	}
	public void setItSecSbConfidentialityId(Long itSecSbConfidentialityId) {
		this.itSecSbConfidentialityId = itSecSbConfidentialityId;
	}
//	public String getItSecSbConfidentialityTxt() {
//		return itSecSbConfidentialityTxt;
//	}
//	public void setItSecSbConfidentialityTxt(String itSecSbConfidentialityTxt) {
//		this.itSecSbConfidentialityTxt = itSecSbConfidentialityTxt;
//	}
	
	@Column(name = "ITSEC_SB_VERTR_TXT")
	public String getItSecSbConfidentialityDescription() {
		return itSecSbConfidentialityDescription;
	}
	public void setItSecSbConfidentialityDescription(String itSecSbConfidentialityDescription) {
		this.itSecSbConfidentialityDescription = itSecSbConfidentialityDescription;
	}
}