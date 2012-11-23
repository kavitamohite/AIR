package com.bayerbbs.applrepos.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

@MappedSuperclass
public class ControlItem extends DeletableRevisionInfo  
{
	private CIType ciType;
	private Long id;
	private String name;
	protected Person responsible;
	private Person subResponsible;
	@Type(type="onezero-boolean")
	private Boolean template;
	@Type(type="onezero-boolean")
	private Boolean relevanceGR1920;
	@Type(type="onezero-boolean")
	private Boolean relevanceGR1435;
	private GxpFlag gxpFlag;
	private Long refID;
	private ItSecGroup itsecGroup;
	private Timestamp sampleTestDate;
	private String sampleTestResult;
	private Long serviceContractID;
	private Long slaID;
	private Long priorityLevelID;
	private Long severityLevelID;
	private Long businessEssentialID;
	private ItsecPL integrity;
	private String integrityText;
	private ItsecPL availability;
	private String availabilityText;
	private ItsecPL confidentiality;
	private String confidentialityText;
	private ItSet itset;

	public ControlItem() {
		super();
	}
	@Transient
	@Id
	public Long getID() {
		return id;
	}
	public void setID(Long id) {
		this.id = id;
	}
	@Transient
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Transient
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RESPONSIBLE")
	public Person getResponsible() {
		return responsible;
	}
	public void setResponsible(Person responsible) {
		this.responsible = responsible;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SUB_RESPONSIBLE")
	public Person getSubResponsible() {
		return subResponsible;
	}
	public void setSubResponsible(Person subResponsible) {
		this.subResponsible = subResponsible;
	}
	@Column(name = "TEMPLATE", nullable = false)
	public Boolean getTemplate() {
		return template;
	}
	public void setTemplate(Boolean template) {
		this.template = template;
	}
	@Column(name = "RELEVANCE_ICS")
	public Boolean getRelevanceGR1920() {
		return relevanceGR1920;
	}
	public void setRelevanceGR1920(Boolean relevanceGR1920) {
		this.relevanceGR1920 = relevanceGR1920;
	}
	@Column(name = "RELEVANZ_ITSEC")
	public Boolean getRelevanceGR1435() {
		return relevanceGR1435;
	}
	public void setRelevanceGR1435(Boolean relevanceGR1435) {
		this.relevanceGR1435 = relevanceGR1435;
	}
	@Column(name = "GXP_FLAG")
	public GxpFlag getGxpFlag() {
		return gxpFlag;
	}
	public void setGxpFlag(GxpFlag gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
	@Column(name = "REF_ID")
	public Long getRefID() {
		return refID;
	}
	public void setRefID(Long refID) {
		this.refID = refID;
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
	@Column(name = "SERVICE_CONTRACT_ID")
	public Long getServiceContractID() {
		return serviceContractID;
	}
	public void setServiceContractID(Long serviceContractID) {
		this.serviceContractID = serviceContractID;
	}
	@Column(name = "SLA_ID")
	public Long getSlaID() {
		return slaID;
	}
	public void setSlaID(Long slaID) {
		this.slaID = slaID;
	}
	@Column(name = "PRIORITY_LEVEL_ID")
	public Long getPriorityLevelID() {
		return priorityLevelID;
	}
	public void setPriorityLevelID(Long priorityLevelID) {
		this.priorityLevelID = priorityLevelID;
	}
	@Column(name = "SEVERITY_LEVEL_ID")
	public Long getSeverityLevelID() {
		return severityLevelID;
	}
	public void setSeverityLevelID(Long severityLevelID) {
		this.severityLevelID = severityLevelID;
	}
	@Column(name = "BUSINESS_ESSENTIAL_ID")
	public Long getBusinessEssentialID() {
		return businessEssentialID;
	}
	public void setBusinessEssentialID(Long businessEssentialID) {
		this.businessEssentialID = businessEssentialID;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSEC_SB_INTEG_ID", nullable = true)
	public void setIntegrity(ItsecPL integrity) {
		this.integrity = integrity;
	}
	public ItsecPL getIntegrity() {
		return integrity;
	}
	@Column(name = "ITSEC_SB_INTEG_TXT")
	public String getIntegrityText() {
		return integrityText;
	}
	public void setIntegrityText(String integrityText) {
		this.integrityText = integrityText;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSEC_SB_VERFG_ID", nullable = true)
	public ItsecPL getAvailability() {
		return availability;
	}
	public void setAvailability(ItsecPL availability) {
		this.availability = availability;
	}
	@Column(name = "ITSEC_SB_VERFG_TXT")
	public String getAvailabilityText() {
		return availabilityText;
	}
	public void setAvailabilityText(String availabilityText) {
		this.availabilityText = availabilityText;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSEC_SB_VERTR_ID", nullable = true)
	public ItsecPL getConfidentiality() {
		return confidentiality;
	}
	public void setConfidentiality(ItsecPL confidentiality) {
		this.confidentiality = confidentiality;
	}
	@Column(name = "ITSEC_SB_VERTR_TXT")
	public String getConfidentialityText() {
		return confidentialityText;
	}
	public void setConfidentialityText(String confidentialiyText) {
		this.confidentialityText = confidentialiyText;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSET", nullable = false)
	public ItSet getItset() {
		return itset;
	}
	public void setItset(ItSet itset) {
		this.itset = itset;
	}
	@Transient
	public CIType getCiType() {
		return ciType;
	}
	public void setCiType(CIType ciType) {
		this.ciType = ciType;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSEC_GRUPPE_ID", nullable = false)
	public void setItsecGroup(ItSecGroup itsecGroup) {
		this.itsecGroup = itsecGroup;
	}
	public ItSecGroup getItsecGroup() {
		return itsecGroup;
	}
}
