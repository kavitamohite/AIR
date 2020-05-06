package com.bayerbbs.applrepos.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

@MappedSuperclass
public class ControlItem extends DeletableRevisionInfo  
{
	public ControlItem() {
		super();
	}
	
	@Id @GeneratedValue
	public Long getID() {
		return id;
	}
	public void setID(Long id) {
		this.id = id;
	}
	protected Long id;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	protected String name;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RESPONSIBLE")
	public Person getResponsible() {
		return responsible;
	}
	public void setResponsible(Person responsible) {
		this.responsible = responsible;
	}
	protected Person responsible;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SUB_RESPONSIBLE", nullable = true)
	public Person getSubResponsible() {
		return subResponsible;
	}
	public void setSubResponsible(Person subResponsible) {
		this.subResponsible = subResponsible;
	}
	private Person subResponsible;
	
	@Type(type="onezero-boolean")
	@Column(name = "TEMPLATE", nullable = false)
	public Boolean getTemplate() {
		return template;
	}
	public void setTemplate(Boolean template) {
		this.template = template;
	}
	private Boolean template;
//	ELERJ ICS
/*	@Type(type="onezero-boolean")
	@Column(name = "RELEVANCE_ICS")
	public Boolean getRelevanceGR1920() {
		return relevanceGR1920;
	}
*/	public void setRelevanceGR1920(Boolean relevanceGR1920) {
		this.relevanceGR1920 = relevanceGR1920;
	}
	private Boolean relevanceGR1920;
	
	@Type(type="onezero-boolean")
	@Column(name = "RELEVANZ_ITSEC")
	public Boolean getRelevanceGR1435() {
		return relevanceGR1435;
	}
	public void setRelevanceGR1435(Boolean relevanceGR1435) {
		this.relevanceGR1435 = relevanceGR1435;
	}
	private Boolean relevanceGR1435;
//	ELERJ GXP
	/*@Enumerated(EnumType.STRING)
	@Column(name = "GXP_FLAG")
	public GxpFlag getGxpFlag() {
		return gxpFlag;
	}
	public void setGxpFlag(GxpFlag gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
	private GxpFlag gxpFlag;*/
	
	@Column(name = "REF_ID")
	public Long getRefID() {
		return refID;
	}
	public void setRefID(Long refID) {
		this.refID = refID;
	}
	private Long refID;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSEC_GRUPPE_ID", nullable = false)
	public ItSecGroup getItsecGroup() {
		return itsecGroup;
	}
	public void setItsecGroup(ItSecGroup itsecGroup) {
		this.itsecGroup = itsecGroup;
	}
	private ItSecGroup itsecGroup;

	@Column(name = "SAMPLE_TEST_DATE") 
	public Timestamp getSampleTestDate() {
		return sampleTestDate;
	}
	public void setSampleTestDate(Timestamp sampleTestDate) {
		this.sampleTestDate = sampleTestDate;
	}
	private Timestamp sampleTestDate;
	
	@Column(name = "SAMPLE_TEST_RESULT")
	public String getSampleTestResult() {
		return sampleTestResult;
	}
	public void setSampleTestResult(String sampleTestResult) {
		this.sampleTestResult = sampleTestResult;
	}
	private String sampleTestResult;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SERVICE_CONTRACT_ID")
	public ServiceContract getServiceContractID() {
		return serviceContract;
	}
	public void setServiceContractID(ServiceContract serviceContract) {
		this.serviceContract = serviceContract;
	}
	private ServiceContract serviceContract;
	
	/*@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SLA_ID")
	public Sla getSla() {
		return sla;
	}
	public void setSla(Sla sla) {
		this.sla = sla;
	}
	private Sla sla;*/
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PRIORITY_LEVEL_ID")
	public PriorityLevel getPriorityLevelID() {
		return priorityLevel;
	}
	public void setPriorityLevelID(PriorityLevel priorityLevel) {
		this.priorityLevel = priorityLevel;
	}
	private PriorityLevel priorityLevel;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SEVERITY_LEVEL_ID")
	public SeverityLevel getSeverityLevel() {
		return severityLevel;
	}
	public void setSeverityLevelID(SeverityLevel severityLevel) {
		this.severityLevel = severityLevel;
	}
	private SeverityLevel severityLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "BUSINESS_ESSENTIAL_ID")
	public BusinessEssential getBusinessEssential() {
		return businessEssential;
	}
	public void setBusinessEssentialID(BusinessEssential businessEssential) {
		this.businessEssential = businessEssential;
	}
	private BusinessEssential businessEssential;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSEC_SB_INTEG_ID", nullable = true)
	public ItsecPL getIntegrity() {
		return integrity;
	}
	public void setIntegrity(ItsecPL integrity) {
		this.integrity = integrity;
	}
	protected ItsecPL integrity;
	
	@Column(name = "ITSEC_SB_INTEG_TXT")
	public String getIntegrityText() {
		return integrityText;
	}
	public void setIntegrityText(String integrityText) {
		this.integrityText = integrityText;
	}
	private String integrityText;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSEC_SB_VERFG_ID", nullable = true)
	public ItsecPL getAvailability() {
		return availability;
	}
	public void setAvailability(ItsecPL availability) {
		this.availability = availability;
	}
	protected ItsecPL availability;
	
	@Column(name = "ITSEC_SB_VERFG_TXT")
	public String getAvailabilityText() {
		return availabilityText;
	}
	public void setAvailabilityText(String availabilityText) {
		this.availabilityText = availabilityText;
	}
	private String availabilityText;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSEC_SB_VERTR_ID", nullable = true)
	public ItsecPL getConfidentiality() {
		return confidentiality;
	}
	public void setConfidentiality(ItsecPL confidentiality) {
		this.confidentiality = confidentiality;
	}
	protected ItsecPL confidentiality;
	
	@Column(name = "ITSEC_SB_VERTR_TXT")
	public String getConfidentialityText() {
		return confidentialityText;
	}
	public void setConfidentialityText(String confidentialiyText) {
		this.confidentialityText = confidentialiyText;
	}
	private String confidentialityText;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ITSET", nullable = false)
	public ItSet getItset() {
		return itset;
	}
	public void setItset(ItSet itset) {
		this.itset = itset;
	}
	protected ItSet itset;
	
	@Transient
	public CIType getCiType() {
		return ciType;
	}
	public void setCiType(CIType ciType) {
		this.ciType = ciType;
	}
	private CIType ciType;
}
