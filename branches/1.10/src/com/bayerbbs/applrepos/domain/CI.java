package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import oracle.sql.TIMESTAMP;

import org.hibernate.Session;
import org.hibernate.annotations.Type;

import com.bayerbbs.applrepos.hibernate.HibernateUtil;

public class CI extends DeletableRevisionInfo  
{
	private CIType ciType;
	private Long id;
	private String name;
	protected String responsible;
	private String subResponsible;
	@Type(type="onezero-boolean")
	private Boolean template;
	@Type(type="onezero-boolean")
	private Boolean relevanceGR1920;
	@Type(type="onezero-boolean")
	private Boolean relevanceGR1435;
	private String gxpFlag;
	private Long refID;
	private Long itsecGroupID;
	private TIMESTAMP sampleTestDate;
	private String sampleTestResult;
	private Long serviceContractID;
	private Long slaID;
	private Long priorityLevelID;
	private Long severityLevelID;
	private Long businessEssentialID;
	private Long itsecPLIntegrityID;
	private String itsecPLIntegrityText;
	private Long itsecPLAvailabilityID;
	private String itsecPLAvailabilityText;
	private Long itsecPLConfidentialityID;
	private String itsecPLConfidentialityText;
	private Long itset;
	@OneToOne
	@JoinColumn(name="REF_ID", referencedColumnName="ID")
	private CI link;

	public CI() {
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column(name = "RESPONSIBLE")
	public String getResponsible() {
		return responsible;
	}
	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}
	@Column(name = "SUB_RESPONSIBLE")
	public String getSubResponsible() {
		return subResponsible;
	}
	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}
	@Column(name = "TEMPLATE")
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
	public String getGxpFlag() {
		return gxpFlag;
	}
	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}
	@Column(name = "REF_ID")
	public Long getRefID() {
		return refID;
	}
	public void setRefID(Long refID) {
		this.refID = refID;
		if (refID != null)
		{
			String sql = "";
			switch (this.ciType)
			{
				case APPLICATION:
				case APPLICATION_PLATFORM:
				case MIDDLEWARE:
				case COMMON_SERVICE:
					sql = "from Application as app where app.id = :id";
				case SYSTEM_PLATFORM:
					sql = "from SystemPlatform as spl where spl.id = :id";
			}
			if (!sql.isEmpty())
			{
				Session session = HibernateUtil.getSessionFactory().getCurrentSession();
				this.setLink((CI) session.createQuery(sql).setLong("id", refID).uniqueResult());
				session.flush();
			}
		}
		else this.link = null;
	}
	@Column(name = "ITSEC_GRUPPE_ID")
	public Long getItsecGroupID() {
		return itsecGroupID;
	}
	public void setItsecGroupID(Long itsecGroupID) {
		this.itsecGroupID = itsecGroupID;
	}
	@Column(name = "SAMPLE_TEST_DATE")
	public TIMESTAMP getSampleTestDate() {
		return sampleTestDate;
	}
	public void setSampleTestDate(TIMESTAMP sampleTestDate) {
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
	@Column(name = "ITSEC_SB_INTEG_ID")
	public Long getItsecPLIntegrityID() {
		return itsecPLIntegrityID;
	}
	public void setItsecPLIntegrityID(Long itsecPLIntegrityID) {
		this.itsecPLIntegrityID = itsecPLIntegrityID;
	}
	@Column(name = "ITSEC_SB_INTEG_TXT")
	public String getItsecPLIntegrityText() {
		return itsecPLIntegrityText;
	}
	public void setItsecPLIntegrityText(String itsecPLIntegrityText) {
		this.itsecPLIntegrityText = itsecPLIntegrityText;
	}
	@Column(name = "ITSEC_SB_VERFG_ID")
	public Long getItsecPLAvailabilityID() {
		return itsecPLAvailabilityID;
	}
	public void setItsecPLAvailabilityID(Long itsecPLAvailabilityID) {
		this.itsecPLAvailabilityID = itsecPLAvailabilityID;
	}
	@Column(name = "ITSEC_SB_VERFG_TXT")
	public String getItsecPLAvailabilityText() {
		return itsecPLAvailabilityText;
	}
	public void setItsecPLAvailabilityText(String itsecPLAvailabilityText) {
		this.itsecPLAvailabilityText = itsecPLAvailabilityText;
	}
	@Column(name = "ITSEC_SB_VERTR_ID")
	public Long getItsecPLConfidentialityID() {
		return itsecPLConfidentialityID;
	}
	public void setItsecPLConfidentialityID(Long itsecPLConfidentialityID) {
		this.itsecPLConfidentialityID = itsecPLConfidentialityID;
	}
	@Column(name = "ITSEC_SB_VERTR_TXT")
	public String getItsecPLConfidentialityText() {
		return itsecPLConfidentialityText;
	}
	public void setItsecPLConfidentialityText(String itsecPLConfidentialiyText) {
		this.itsecPLConfidentialityText = itsecPLConfidentialiyText;
	}
	@Column(name = "ITSET")
	public Long getItset() {
		return itset;
	}
	public void setItset(Long itset) {
		this.itset = itset;
	}
	public void setLink(CI link) {
		this.link = link;
	}
	public CI getLink() {
		return link;
	}
	public void setCiType(CIType ciType) {
		this.ciType = ciType;
	}
	public CIType getCiType() {
		return ciType;
	}
}
