package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ANWENDUNG")
@SequenceGenerator(name = "MySeqAnwendung", sequenceName = "TBADM.SEQ_ANWENDUNG")
public class Application extends DeletableRevisionInfo {


	// basics
	/** identifier field */
	private Long applicationId;
	private String barApplicationId;	// Bayer application register id
	private String applicationName;
	private String applicationAlias;
	private String version;
	private Long applicationCat2Id;
	// primary function - only display
	private Long lifecycleStatusId; // Attribut LC_STATUS_ID
	private Long operationalStatusId; // Attribut EINSATZ_STATUS_ID
	private String comments;
	

	// contacts
	private String responsible; // Attribut CWID_VERANTW_BETR
	private String subResponsible;
	
	
	// agreements
	private Long slaId;
	private Long priorityLevelId;
	private Long serviceContractId;
	private Long severityLevelId;
	private Long businessEssentialId;


	// protection
	private Long itSecSbAvailability;
	private String itSecSbAvailabilityText;
	

	// compliance
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	
	private Long relevanceICS;
	private Long relevanzITSEC;
	private String gxpFlag;
	// private String riskAnalysisYN;
	
	
	// license & costs
	private Long licenseTypeId;
	
	private String dedicated;
	private Long accessingUserCount;
	private Long accessingUserCountMeasured;
	private String loadClass;
	private Long costRunPa;
	private Long costChangePa;
	private Long currencyId;
	private Long costRunAccountId;
	private Long costChangeAccountId;
	
	
	// unsorted
	private String clusterCode;

	private String clusterType;
	
	private String applicationOwner;
	private String applicationOwnerDelegate;
	
	private Long categoryBusiness;

	
	private Long classDataId;
	private Long classInformationId;
	private String classInformationExplanation;
	
	private String serviceModel;
	
	/**
	 * default constructor - for jpa
	 */
	public Application() {
	}

	
	@Transient
	public Long getId() {
		return getApplicationId();
	}

	// ------------------------------------------------
	// hibernate get / set
	// ------------------------------------------------
	/**
	 * Returns the value of the field {@link #Id}.
	 * 
	 * @return Value of the {@link #Id} field.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqAnwendung")
	@Column(name = "ANWENDUNG_ID")
	public Long getApplicationId() {
		return applicationId;
	}

	/**
	 * @param anwendungId
	 */
	public void setApplicationId(Long anwendungId) {
		this.applicationId = anwendungId;
	}

	/**
	 * Returns the value of the field {@link #barApplicationId}.
	 * 
	 * @return Value of the {@link #barApplicationId} field.
	 */
	@Column(name = "BAR_APPLICATION_ID")
	public String getBarApplicationId() {
		return barApplicationId;
	}

	/**
	 * Sets the value of the {@link #barApplicationId} field.
	 * 
	 * @param barApplicationId
	 *            The value to set.
	 */
	public void setBarApplicationId(String barApplicationId) {
		this.barApplicationId = barApplicationId;
	}

	/**
	 * Returns the value of the field {@link #applicationName}.
	 * 
	 * @return Value of the {@link #applicationName} field.
	 */
	@Column(name = "ANWENDUNG_NAME")
	public String getApplicationName() {
		return applicationName;
	}

	/**
	 * Sets the value of the {@link #applicationName} field.
	 * 
	 * @param applicationName
	 *            The value to set.
	 */
	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}

	/**
	 * Returns the value of the field {@link #applicationAlias}.
	 * 
	 * @return Value of the {@link #applicationAlias} field.
	 */
	@Column(name = "ALIAS")
	public String getApplicationAlias() {
		return applicationAlias;
	}

	/**
	 * Sets the value of the {@link #applicationAlias} field.
	 * 
	 * @param applicationAlias
	 *            The value to set.
	 */
	public void setApplicationAlias(String applicationAlias) {
		this.applicationAlias = applicationAlias;
	}

	/**
	 * @return the anwendungKat2Id
	 */
	@Column(name = "ANWENDUNG_KAT2_ID")
	public Long getApplicationCat2Id() {
		return applicationCat2Id;
	}

	/**
	 * Sets the value of the {@link #applicationCat2Id} field.
	 * 
	 * @param applicationCat2Id
	 *            The value to set.
	 */
	public void setApplicationCat2Id(Long applicationCat2Id) {
		this.applicationCat2Id = applicationCat2Id;
	}

	/**
	 * Returns the value of the field {@link #clusterCode}.
	 * 
	 * @return Value of the {@link #clusterCode} field.
	 */
	@Column(name = "CLUSTER_CODE")
	public String getClusterCode() {
		return clusterCode;
	}

	/**
	 * Sets the value of the {@link #clusterCode} field.
	 * 
	 * @param clusterCode
	 *            The value to set.
	 */
	public void setClusterCode(String clusterCode) {
		this.clusterCode = clusterCode;
	}

	/**
	 * Returns the value of the field {@link #clusterType}.
	 * 
	 * @return Value of the {@link #clusterType} field.
	 */
	@Column(name = "CLUSTER_TYPE")
	public String getClusterType() {
		return clusterType;
	}

	/**
	 * Sets the value of the {@link #clusterType} field.
	 * 
	 * @param clusterType
	 *            The value to set.
	 */
	public void setClusterType(String clusterType) {
		this.clusterType = clusterType;
	}

	/**
	 * Returns the value of the field {@link #comments}.
	 * 
	 * @return Value of the {@link #comments} field.
	 */
	@Column(name = "COMMENTS")
	public String getComments() {
		return comments;
	}

	/**
	 * Sets the value of the {@link #comments} field.
	 * 
	 * @param comments
	 *            The value to set.
	 */
	public void setComments(String comments) {
		this.comments = comments;
	}

	/**
	 * @return the lifecycleStatusId
	 */
	@Column(name = "LC_STATUS_ID")
	public Long getLifecycleStatusId() {
		return lifecycleStatusId;
	}

	/**
	 * Sets the value of the {@link #lifecycleStatusId} field.
	 * 
	 * @param lifecycleStatusId
	 *            The value to set.
	 */
	public void setLifecycleStatusId(Long lifecycleStatusId) {
		this.lifecycleStatusId = lifecycleStatusId;
	}

	/**
	 * @return the responsible
	 */
	@Column(name = "CWID_VERANTW_BETR")
	public String getResponsible() {
		return responsible;
	}

	/**
	 * Sets the value of the {@link #responsible} field.
	 * 
	 * @param responsible
	 *            The value to set.
	 */
	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}

	/**
	 * @return the subResponsible
	 */
	@Column(name = "SUB_RESPONSIBLE")
	public String getSubResponsible() {
		return subResponsible;
	}

	/**
	 * Sets the value of the {@link #subResponsible} field.
	 * 
	 * @param subResponsible
	 *            The value to set.
	 */
	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}

	/**
	 * @return the gxpFlag
	 */
	@Column(name = "GXP_FLAG")
	public String getGxpFlag() {
		return gxpFlag;
	}

	/**
	 * Sets the value of the {@link #gxpFlag} field.
	 * 
	 * @param gxpFlag
	 *            The value to set.
	 */
	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}

	
	/**
	 * @return the operationalStatusId
	 */
	@Column(name = "EINSATZ_STATUS_ID")
	public Long getOperationalStatusId() {
		return operationalStatusId;
	}

	/**
	 * Sets the value of the {@link #operationalStatusId} field.
	 * 
	 * @param operationalStatusId
	 *            The value to set.
	 */
	public void setOperationalStatusId(Long operationalStatusId) {
		this.operationalStatusId = operationalStatusId;
	}

	/**
	 * @return the itset
	 */
	@Column(name = "ITSET")
	public Long getItset() {
		return itset;
	}

	/**
	 * Sets the value of the {@link #itset} field.
	 * 
	 * @param itset
	 *            The value to set.
	 */
	public void setItset(Long itset) {
		this.itset = itset;
	}

	/**
	 * @return the template
	 */
	@Column(name = "TEMPLATE")
	public Long getTemplate() {
		return template;
	}

	/**
	 * Sets the value of the {@link #template} field.
	 * 
	 * @param template
	 *            The value to set.
	 */
	public void setTemplate(Long template) {
		this.template = template;
	}

	/**
	 * @return the itsecGroupId
	 */
	@Column(name = "ITSEC_GRUPPE_ID")
	public Long getItsecGroupId() {
		return itsecGroupId;
	}

	/**
	 * Sets the value of the {@link #itsecGroupId} field.
	 * 
	 * @param itsecGroupId
	 *            The value to set.
	 */
	public void setItsecGroupId(Long itsecGroupId) {
		this.itsecGroupId = itsecGroupId;
	}

	/**
	 * @return the refId
	 */
	@Column(name = "REF_ID")
	public Long getRefId() {
		return refId;
	}

	/**
	 * Sets the value of the {@link #refId} field.
	 * 
	 * @param refId
	 *            The value to set.
	 */
	public void setRefId(Long refId) {
		this.refId = refId;
	}
	
	
	/**
	 * @return the relevanceICS
	 */
	@Column(name = "RELEVANCE_ICS")
	public Long getRelevanceICS() {
		return relevanceICS;
	}

	/**
	 * Sets the value of the {@link #relevanceICS} field.
	 * 
	 * @param relevanceICS
	 *            The value to set.
	 */
	public void setRelevanceICS(Long relevanceICS) {
		this.relevanceICS = relevanceICS;
	}

	/**
	 * @return the relevanzITSEC
	 */
	@Column(name = "RELEVANZ_ITSEC")
	public Long getRelevanzITSEC() {
		return relevanzITSEC;
	}

	/**
	 * Sets the value of the {@link #relevanzITSEC} field.
	 * 
	 * @param relevanzITSEC
	 *            The value to set.
	 */
	public void setRelevanzITSEC(Long relevanzITSEC) {
		this.relevanzITSEC = relevanzITSEC;
	}

	/**
	 * @return the businessEssentialId
	 */
	@Column(name = "BUSINESS_ESSENTIAL_ID")
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}

	/**
	 * Sets the value of the {@link #businessEssentialId} field.
	 * 
	 * @param businessEssentialId
	 *            The value to set.
	 */
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}

// task 142
//	/**
//	 * @return the riskAnalysisYN
//	 */
//	@Column(name = "RISK_ANALYSIS_YN")
//	public String getRiskAnalysisYN() {
//		return riskAnalysisYN;
//	}
//
//	/**
//	 * Sets the value of the {@link #riskAnalysisYN} field.
//	 * 
//	 * @param riskAnalysisYN
//	 *            The value to set.
//	 */
//	public void setRiskAnalysisYN(String riskAnalysisYN) {
//		this.riskAnalysisYN = riskAnalysisYN;
//	}

	/**
	 * @return the licenseTypeId
	 */
	@Column(name = "LICENSE_TYPE_ID")
	public Long getLicenseTypeId() {
		return licenseTypeId;
	}

	/**
	 * Sets the value of the {@link #licenseTypeId} field.
	 * 
	 * @param licenseTypeId
	 *            The value to set.
	 */
	public void setLicenseTypeId(Long licenseTypeId) {
		this.licenseTypeId = licenseTypeId;
	}

	/**
	 * @return the dedicated
	 */
	@Column(name = "DEDICATED_Y_N")
	public String getDedicated() {
		return dedicated;
	}
	
	/**
	 * Sets the value of the {@link #dedicated} field.
	 * 
	 * @param dedicated
	 *            The value to set.
	 */
	public void setDedicated(String dedicated) {
		this.dedicated = dedicated;
	}
	
	/**
	 * @return the accessingUserCount
	 */
	@Column(name = "ACCESSING_USER_COUNT")
	public Long getAccessingUserCount() {
		return accessingUserCount;
	}

	/**
	 * Sets the value of the {@link #accessingUserCount} field.
	 * 
	 * @param accessingUserCount
	 *            The value to set.
	 */
	public void setAccessingUserCount(Long accessingUserCount) {
		this.accessingUserCount = accessingUserCount;
	}

	/**
	 * @return the accessingUserCountMeasured
	 */
	@Column(name = "ACCESSING_USER_COUNT_MEASURED")
	public Long getAccessingUserCountMeasured() {
		return accessingUserCountMeasured;
	}

	/**
	 * Sets the value of the {@link #accessingUserCountMeasured} field.
	 * 
	 * @param accessingUserCountMeasured
	 *            The value to set.
	 */
	public void setAccessingUserCountMeasured(Long accessingUserCountMeasured) {
		this.accessingUserCountMeasured = accessingUserCountMeasured;
	}

	/**
	 * @return the loadClass
	 */
	@Column(name = "LOAD_CLASS")
	public String getLoadClass() {
		return loadClass;
	}
	
	/**
	 * Sets the value of the {@link #loadClass} field.
	 * 
	 * @param loadClass
	 *            The value to set.
	 */
	public void setLoadClass(String loadClass) {
		this.loadClass = loadClass;
	}

	
	/**
	 * @return the version
	 */
	@Column(name = "VERSION")
	public String getVersion() {
		return version;
	}

	/**
	 * Sets the value of the {@link #version} field.
	 * 
	 * @param version
	 *            The value to set.
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	/**
	 * @return the costRunPa
	 */
	@Column(name = "COST_RUN_PA")
	public Long getCostRunPa() {
		return costRunPa;
	}

	/**
	 * Sets the value of the {@link #costRunPa} field.
	 * 
	 * @param costRunPa
	 *            The value to set.
	 */
	public void setCostRunPa(Long costRunPa) {
		this.costRunPa = costRunPa;
	}

	/**
	 * @return the costChangePa
	 */
	@Column(name = "COST_CHANGE_PA")
	public Long getCostChangePa() {
		return costChangePa;
	}

	/**
	 * Sets the value of the {@link #costChangePa} field.
	 * 
	 * @param costChangePa
	 *            The value to set.
	 */
	public void setCostChangePa(Long costChangePa) {
		this.costChangePa = costChangePa;
	}

	/**
	 * @return the currencyId
	 */
	@Column(name = "CURRENCY_ID")
	public Long getCurrencyId() {
		return currencyId;
	}

	/**
	 * Sets the value of the {@link #currencyId} field.
	 * 
	 * @param currencyId
	 *            The value to set.
	 */
	public void setCurrencyId(Long currencyId) {
		this.currencyId = currencyId;
	}

	/**
	 * @return the costRunAccountId
	 */
	@Column(name = "COST_RUN_ACCOUNT_ID")
	public Long getCostRunAccountId() {
		return costRunAccountId;
	}

	/**
	 * Sets the value of the {@link #costRunAccountId} field.
	 * 
	 * @param costRunAccountId
	 *            The value to set.
	 */
	public void setCostRunAccountId(Long costRunAccountId) {
		this.costRunAccountId = costRunAccountId;
	}

	/**
	 * @return the costChangeAccountId
	 */
	@Column(name = "COST_CHANGE_ACCOUNT_ID")
	public Long getCostChangeAccountId() {
		return costChangeAccountId;
	}

	/**
	 * Sets the value of the {@link #costChangeAccountId} field.
	 * 
	 * @param costChangeAccountId
	 *            The value to set.
	 */
	public void setCostChangeAccountId(Long costChangeAccountId) {
		this.costChangeAccountId = costChangeAccountId;
	}

	/**
	 * @return the itSecSbAvailability
	 */
	@Column(name = "ITSEC_SB_VERFG_ID")
	public Long getItSecSbAvailability() {
		return itSecSbAvailability;
	}

	/**
	 * Sets the value of the {@link #itSecSbAvailability} field.
	 * 
	 * @param itSecSbAvailability
	 *            The value to set.
	 */
	public void setItSecSbAvailability(Long itSecSbAvailability) {
		this.itSecSbAvailability = itSecSbAvailability;
	}

	/**
	 * @return the itSecSbAvailabilityText
	 */
	@Column(name = "ITSEC_SB_VERFG_TXT")
	public String getItSecSbAvailabilityText() {
		return itSecSbAvailabilityText;
	}

	/**
	 * Sets the value of the {@link #itSecSbAvailabilityText} field.
	 * 
	 * @param itSecSbAvailabilityText
	 *            The value to set.
	 */
	public void setItSecSbAvailabilityText(String itSecSbAvailabilityText) {
		this.itSecSbAvailabilityText = itSecSbAvailabilityText;
	}

	/**
	 * @return the slaId
	 */
	@Column(name = "SLA_ID")
	public Long getSlaId() {
		return slaId;
	}

	/**
	 * Sets the value of the {@link #slaId} field.
	 * 
	 * @param slaId
	 *            The value to set.
	 */
	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}

	/**
	 * @return the priorityLevelId
	 */
	@Column(name = "PRIORITY_LEVEL_ID")
	public Long getPriorityLevelId() {
		return priorityLevelId;
	}

	/**
	 * Sets the value of the {@link #priorityLevelId} field.
	 * 
	 * @param priorityLevelId
	 *            The value to set.
	 */
	public void setPriorityLevelId(Long priorityLevelId) {
		this.priorityLevelId = priorityLevelId;
	}
	
	/**
	 * @return the serviceContractId
	 */
	@Column(name = "SERVICE_CONTRACT_ID")
	public Long getServiceContractId() {
		return serviceContractId;
	}

	/**
	 * Sets the value of the {@link #serviceContractId} field.
	 * 
	 * @param serviceContractId
	 *            The value to set.
	 */
	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}

	/**
	 * @return the severityLevelId
	 */
	@Column(name = "SEVERITY_LEVEL_ID")
	public Long getSeverityLevelId() {
		return severityLevelId;
	}

	/**
	 * Sets the value of the {@link #severityLevelId} field.
	 * 
	 * @param severityLevelId
	 *            The value to set.
	 */
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}

	/**
	 * Returns the value of the field {@link #applicationOwner}.
	 * 
	 * @return Value of the {@link #applicationOwner} field.
	 */
	@Column(name = "APPLICATION_OWNER")
	public String getApplicationOwner() {
		return applicationOwner;
	}

	/**
	 * Sets the value of the {@link #applicationOwner} field.
	 * 
	 * @param applicationOwner
	 *            The value to set.
	 */
	public void setApplicationOwner(String applicationOwner) {
		this.applicationOwner = applicationOwner;
	}

	/**
	 * Returns the value of the field {@link #applicationOwnerDelegate}.
	 * 
	 * @return Value of the {@link #applicationOwnerDelegate} field.
	 */
	@Column(name = "APPLICATION_OWNER_DELEGATE")
	public String getApplicationOwnerDelegate() {
		return applicationOwnerDelegate;
	}

	/**
	 * Sets the value of the {@link #applicationOwnerDelegate} field.
	 * 
	 * @param applicationOwnerDelegate
	 *            The value to set.
	 */
	public void setApplicationOwnerDelegate(String applicationOwnerDelegate) {
		this.applicationOwnerDelegate = applicationOwnerDelegate;
	}

	/**
	 * @return the categoryBusiness
	 */
	@Column(name = "CATEGORY_BUSINESS_ID")
	public Long getCategoryBusiness() {
		return categoryBusiness;
	}

	/**
	 * Sets the value of the {@link #categoryBusiness} field.
	 * 
	 * @param categoryBusiness
	 *            The value to set.
	 */
	public void setCategoryBusiness(Long categoryBusiness) {
		this.categoryBusiness = categoryBusiness;
	}
	
	/**
	 * @return the classDataId
	 */
	@Column(name = "CLASS_DATA_ID")
	public Long getClassDataId() {
		return classDataId;
	}

	/**
	 * Sets the value of the {@link #classDataId} field.
	 * 
	 * @param classDataId
	 *            The value to set.
	 */
	public void setClassDataId(Long classDataId) {
		this.classDataId = classDataId;
	}

	/**
	 * @return the classInformationId
	 */
	@Column(name = "CLASS_INFORMATION_ID")
	public Long getClassInformationId() {
		return classInformationId;
	}

	/**
	 * Sets the value of the {@link #classInformationId} field.
	 * 
	 * @param classInformationId
	 *            The value to set.
	 */
	public void setClassInformationId(Long classInformationId) {
		this.classInformationId = classInformationId;
	}


	/**
	 * @return the classInformationExplanation
	 */
	@Column(name = "CLASS_INFORMATION_EXPLANATION")
	public String getClassInformationExplanation() {
		return classInformationExplanation;
	}

	/**
	 * Sets the value of the {@link #classInformationExplanation} field.
	 * 
	 * @param classInformationExplanation
	 *            The value to set.
	 */
	public void setClassInformationExplanation(String classInformationExplanation) {
		this.classInformationExplanation = classInformationExplanation;
	}

	/**
	 * @return the serviceModel
	 */
	@Column(name = "SERVICE_MODEL")
	public String getServiceModel() {
		return serviceModel;
	}

	/**
	 * Sets the value of the {@link #serviceModel} field.
	 * 
	 * @param serviceModel
	 *            The value to set.
	 */
	public void setServiceModel(String serviceModel) {
		this.serviceModel = serviceModel;
	}

}
