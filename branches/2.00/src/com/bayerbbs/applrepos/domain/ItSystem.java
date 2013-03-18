package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "IT_SYSTEM")
//@NamedQueries(
//	@NamedQuery(name="getItSystemClusterTypes", query="...")
//)
public class ItSystem extends DeletableRevisionInfo implements Serializable {
	private static final long serialVersionUID = -9152390693208339445L;

	private Long id;
	private String name;
	private String alias;

	private String ciOwner;
	private String ciOwnerDelegate;
	
	private Long itset;
	private Long template;
	private Long itsecGroupId;
	private Long refId;
	
	private Long relevanceICS;
	private Long relevanceITSEC;
	private String gxpFlag;
	
	private Long slaId;
	private Long serviceContractId;
	private Long severityLevelId;
	private Long businessEssentialId;
	
	private Long itSecSbAvailability;
	private String itSecSbAvailabilityText;
	
	private Long itSecSbIntegrityId;
//	private String itSecSbIntegrityTxt;
	private String itSecSbIntegrityDescription;

	private Long itSecSbConfidentialityId;
//	private String itSecSbConfidentialityTxt;
	private String itSecSbConfidentialityDescription;

	private Integer ciSubType;
	
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
	
	
	@Id
	@Column(name = "IT_SYSTEM_ID")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "IT_SYSTEM_NAME")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "ALIAS")
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	
	@Column(name = "CWID_VERANTW_BETR")
	//weil Feld CWID_VERANTW_BETR und nicht RESPONSIBLE heisst wie in allen anderen Tabellen, kann nicht von CiBase
	//abgeleitet werden.
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
	
	
	@Column(name = "SLA_ID")
	public Long getSlaId() {
		return slaId;
	}
	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}
	
	
	@Column(name = "SERVICE_CONTRACT_ID")
	public Long getServiceContractId() {
		return serviceContractId;
	}
	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}

	@Column(name = "SEVERITY_LEVEL_ID")
	public Long getSeverityLevelId() {
		return severityLevelId;
	}
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}
	
	@Column(name = "BUSINESS_ESSENTIAL_ID")
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
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
	
	@Column(name = "HW_IDENT_OR_TRANS")
	public Integer getCiSubType() {
		return ciSubType;
	}
	public void setCiSubType(Integer ciSubType) {
		this.ciSubType = ciSubType;
	}
	
	@Column(name = "OS_NAME_ID")
	public Integer getOsNameId() {
		return osNameId;
	}
	public void setOsNameId(Integer osNameId) {
		this.osNameId = osNameId;
	}
	
	@Column(name = "CLUSTER_CODE")
	public String getClusterCode() {
		return clusterCode;
	}
	public void setClusterCode(String clusterCode) {
		this.clusterCode = clusterCode;
	}
	
	@Column(name = "CLUSTER_TYPE")
	public String getClusterType() {
		return clusterType;
	}
	public void setClusterType(String clusterType) {
		this.clusterType = clusterType;
	}
	
	@Column(name = "VIRTUAL_HOST_Y_N")
	public String getIsVirtualHardwareClient() {
		return isVirtualHardwareClient;
	}
	public void setIsVirtualHardwareClient(String isVirtualHardwareClient) {
		this.isVirtualHardwareClient = isVirtualHardwareClient;
	}
	
	@Column(name = "VIRTUAL_HW_Y_N")
	public String getIsVirtualHardwareHost() {
		return isVirtualHardwareHost;
	}
	public void setIsVirtualHardwareHost(String isVirtualHardwareHost) {
		this.isVirtualHardwareHost = isVirtualHardwareHost;
	}
	
	@Column(name = "VIRTUAL_HOST_SW")
	public String getVirtualHardwareSoftware() {
		return virtualHardwareSoftware;
	}
	public void setVirtualHardwareSoftware(String virtualHardwareSoftware) {
		this.virtualHardwareSoftware = virtualHardwareSoftware;
	}
	
	@Column(name = "LC_SUB_STATUS_ID")
	public Integer getLifecycleStatusId() {
		return lifecycleStatusId;
	}
	public void setLifecycleStatusId(Integer lifecycleStatusId) {
		this.lifecycleStatusId = lifecycleStatusId;
	}
	
	@Column(name = "EINSATZ_STATUS_ID")
	public Integer getEinsatzStatusId() {
		return einsatzStatusId;
	}
	public void setEinsatzStatusId(Integer einsatzStatusId) {
		this.einsatzStatusId = einsatzStatusId;
	}
	
	@Column(name = "PRIMARY_FUNCTION_ID")
	public Integer getPrimaryFunctionId() {
		return primaryFunctionId;
	}
	public void setPrimaryFunctionId(Integer primaryFunctionId) {
		this.primaryFunctionId = primaryFunctionId;
	}
	
	@Column(name = "LICENSE_SCANNING")
	public Integer getLicenseScanningId() {
		return licenseScanningId;
	}
	public void setLicenseScanningId(Integer licenseScanningId) {
		this.licenseScanningId = licenseScanningId;
	}
	
	
	
}