package com.bayerbbs.applrepos.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

@MappedSuperclass
public abstract class CiBase extends DeletableRevisionInfo {
	private Long id;
	private String name;
	
//	private String ciOwner;
	private String ciOwnerDelegate;
	
	// compliance
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	/*--ELERJ ICS--*/
//	private Long relevanceICS;
	private Long relevanceITSEC;
	/*--ELERJ GXP---*/
//	private String gxpFlag;
	
	//private Long slaId;
	private Long serviceContractId;
	
	private Long itSecSbAvailability;
	private String itSecSbAvailabilityTxt;
	
	//nur Application!!
	private Long classInformationId;
	private String classInformationTxt;
	
	private Long itSecSbIntegrityId;
	private String itSecSbIntegrityTxt;
	
	private Timestamp sampleTestDate;
	private String sampleTestResult;
	
	
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
	
	
/*	@Column(name = "RELEVANCE_ICS")
	public Long getRelevanceICS() {
		return relevanceICS;
	}

	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}
*/
	@Column(name = "RELEVANZ_ITSEC")
	public Long getRelevanceITSEC() {
		return relevanceITSEC;
	}

	public void setRelevanceITSEC(Long relevanceITSEC) {
		this.relevanceITSEC = relevanceITSEC;
	}

	/*@Column(name = "GXP_FLAG")
	public String getGxpFlag() {
		return gxpFlag;
	}

	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
*/	
	
	@Column(name = "SERVICE_CONTRACT_ID")
	public Long getServiceContractId() {
		return serviceContractId;
	}

	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}


	
	/*@Column(name = "SLA_ID")
	public Long getSlaId() {
		return slaId;
	}

	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}*/
	
	
	@Column(name = "ITSEC_SB_VERFG_ID")
	public Long getItSecSbAvailability() {
		return itSecSbAvailability;
	}
	public void setItSecSbAvailability(Long itSecSbAvailability) {
		this.itSecSbAvailability = itSecSbAvailability;
	}


	@Column(name = "ITSEC_SB_VERFG_TXT")
	public String getItSecSbAvailabilityTxt() {
		return itSecSbAvailabilityTxt;
	}
	public void setItSecSbAvailabilityTxt(String itSecSbAvailabilityTxt) {
		this.itSecSbAvailabilityTxt = itSecSbAvailabilityTxt;
	}
	
	@Column(name = "ITSEC_SB_INTEG_ID")
	public Long getItSecSbIntegrityId() {
		return itSecSbIntegrityId;
	}
	public void setItSecSbIntegrityId(Long itSecSbIntegrityId) {
		this.itSecSbIntegrityId = itSecSbIntegrityId;
	}

	
	@Column(name = "ITSEC_SB_INTEG_TXT")
	public String getItSecSbIntegrityTxt() {
		return itSecSbIntegrityTxt;
	}
	public void setItSecSbIntegrityTxt(String itSecSbIntegrityTxt) {
		this.itSecSbIntegrityTxt = itSecSbIntegrityTxt;
	}
	/**
	 * @return the classInformationId
	 */
	@Column(name = "ITSEC_SB_VERTR_ID")
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
	@Column(name = "ITSEC_SB_VERTR_TXT")
	public String getClassInformationTxt() {
		return classInformationTxt;
	}
	/**
	 * @param classInformationExplanation the classInformationExplanation to set
	 */
	public void setClassInformationTxt(String classInformationTxt) {
		this.classInformationTxt = classInformationTxt;
	}
	
	@Column(name = "SAMPLE_TEST_DATE")
	public Timestamp getSampleTestDate() {
		return sampleTestDate;
	}
	public void setSampleTestDate(Timestamp sampleTestDate) {
		this.sampleTestDate = sampleTestDate;
	}
	@Column(name = "SAMPLE_TEST_RESULT")
	public String getSampleTestResult() {
		return sampleTestResult;
	}
	public void setSampleTestResult(String sampleTestResult) {
		this.sampleTestResult = sampleTestResult;
	}
			
}