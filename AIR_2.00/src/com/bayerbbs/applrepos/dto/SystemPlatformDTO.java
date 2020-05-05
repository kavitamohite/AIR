package com.bayerbbs.applrepos.dto;

import java.sql.Timestamp;

import com.bayerbbs.applrepos.domain.LicenseScanning;

public class SystemPlatformDTO {
	private Long systemPlatformID;
	private String systemPlatformName;
	private String alias;
	private Long hwIdentOrTrans;
	private Long osNameID;
	private Long primaryFunctionID;
	private Long operationalStatusID;
	private String clusterCode;
	private String clusterType;
	private Boolean virtualHW;
	private Boolean virtualHost;
	private String virtualHostSW;
	private Long lcStatusID;
	private LicenseScanning licenseScanning;
	private String responsible;
	private String subResponsible;
	private Boolean template;
	private Boolean relevanceGR1920;
	private Boolean relevanceGR1435;
	private String gxpFlag;
	private Long refID;
	private Long itsecGroupID;
	private Timestamp sampleTestDate;
	private String sampleTestResult;
	private Long serviceContractID;
	//private Long slaID;
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

	public String getSystemPlatformName() {
		return systemPlatformName;
	}

	public void setSystemPlatformName(String systemPlatformName) {
		this.systemPlatformName = systemPlatformName;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public Long getHwIdentOrTrans() {
		return hwIdentOrTrans;
	}

	public void setHwIdentOrTrans(Long hwIdentOrTrans) {
		this.hwIdentOrTrans = hwIdentOrTrans;
	}

	public Long getOsNameID() {
		return osNameID;
	}

	public void setOsNameID(Long osNameID) {
		this.osNameID = osNameID;
	}

	public Long getPrimaryFunctionID() {
		return primaryFunctionID;
	}

	public void setPrimaryFunctionID(Long primaryFunctionID) {
		this.primaryFunctionID = primaryFunctionID;
	}

	public Long getOperationalStatusID() {
		return operationalStatusID;
	}

	public void setOperationalStatusID(Long operationalStatusID) {
		this.operationalStatusID = operationalStatusID;
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

	public Boolean getVirtualHW() {
		return virtualHW;
	}

	public void setVirtualHW(Boolean virtualHW) {
		this.virtualHW = virtualHW;
	}

	public Boolean getVirtualHost() {
		return virtualHost;
	}

	public void setVirtualHost(Boolean virtualHost) {
		this.virtualHost = virtualHost;
	}

	public String getVirtualHostSW() {
		return virtualHostSW;
	}

	public void setVirtualHostSW(String virtualHostSW) {
		this.virtualHostSW = virtualHostSW;
	}

	public Long getLcStatusID() {
		return lcStatusID;
	}

	public void setLcStatusID(Long lcStatusID) {
		this.lcStatusID = lcStatusID;
	}

	public LicenseScanning getLicenseScanning() {
		return licenseScanning;
	}

	public void setLicenseScanning(LicenseScanning licenseScanning) {
		this.licenseScanning = licenseScanning;
	}

	public String getResponsible() {
		return responsible;
	}

	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}

	public String getSubResponsible() {
		return subResponsible;
	}

	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}

	public Boolean getTemplate() {
		return template;
	}

	public void setTemplate(Boolean template) {
		this.template = template;
	}

	public Boolean getRelevanceGR1920() {
		return relevanceGR1920;
	}

	public void setRelevanceGR1920(Boolean relevanceGR1920) {
		this.relevanceGR1920 = relevanceGR1920;
	}

	public Boolean getRelevanceGR1435() {
		return relevanceGR1435;
	}

	public void setRelevanceGR1435(Boolean relevanceGR1435) {
		this.relevanceGR1435 = relevanceGR1435;
	}

	public String getGxpFlag() {
		return gxpFlag;
	}

	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}

	public Long getRefID() {
		return refID;
	}

	public void setRefID(Long refID) {
		this.refID = refID;
	}

	public Long getItsecGroupID() {
		return itsecGroupID;
	}

	public void setItsecGroupID(Long itsecGroupID) {
		this.itsecGroupID = itsecGroupID;
	}

	public Timestamp getSampleTestDate() {
		return sampleTestDate;
	}

	public void setSampleTestDate(Timestamp sampleTestDate) {
		this.sampleTestDate = sampleTestDate;
	}

	public String getSampleTestResult() {
		return sampleTestResult;
	}

	public void setSampleTestResult(String sampleTestResult) {
		this.sampleTestResult = sampleTestResult;
	}

	public Long getServiceContractID() {
		return serviceContractID;
	}

	public void setServiceContractID(Long serviceContractID) {
		this.serviceContractID = serviceContractID;
	}

	/*public Long getSlaID() {
		return slaID;
	}

	public void setSlaID(Long slaID) {
		this.slaID = slaID;
	}*/

	public Long getPriorityLevelID() {
		return priorityLevelID;
	}

	public void setPriorityLevelID(Long priorityLevelID) {
		this.priorityLevelID = priorityLevelID;
	}

	/*public Long getSeverityLevelID() {
		return severityLevelID;
	}

	public void setSeverityLevelID(Long severityLevelID) {
		this.severityLevelID = severityLevelID;
	}*/

	public Long getBusinessEssentialID() {
		return businessEssentialID;
	}

	public void setBusinessEssentialID(Long businessEssentialID) {
		this.businessEssentialID = businessEssentialID;
	}

	public Long getItsecPLIntegrityID() {
		return itsecPLIntegrityID;
	}

	public void setItsecPLIntegrityID(Long itsecPLIntegrityID) {
		this.itsecPLIntegrityID = itsecPLIntegrityID;
	}

	public String getItsecPLIntegrityText() {
		return itsecPLIntegrityText;
	}

	public void setItsecPLIntegrityText(String itsecPLIntegrityText) {
		this.itsecPLIntegrityText = itsecPLIntegrityText;
	}

	public Long getItsecPLAvailabilityID() {
		return itsecPLAvailabilityID;
	}

	public void setItsecPLAvailabilityID(Long itsecPLAvailabilityID) {
		this.itsecPLAvailabilityID = itsecPLAvailabilityID;
	}

	public String getItsecPLAvailabilityText() {
		return itsecPLAvailabilityText;
	}

	public void setItsecPLAvailabilityText(String itsecPLAvailabilityText) {
		this.itsecPLAvailabilityText = itsecPLAvailabilityText;
	}

	public Long getItsecPLConfidentialityID() {
		return itsecPLConfidentialityID;
	}

	public void setItsecPLConfidentialityID(Long itsecPLConfidentialityID) {
		this.itsecPLConfidentialityID = itsecPLConfidentialityID;
	}

	public String getItsecPLConfidentialityText() {
		return itsecPLConfidentialityText;
	}

	public void setItsecPLConfidentialityText(String itsecPLConfidentialityText) {
		this.itsecPLConfidentialityText = itsecPLConfidentialityText;
	}

	public Long getItset() {
		return itset;
	}

	public void setItset(Long itset) {
		this.itset = itset;
	}

	public Long getSystemPlatformID() {
		return systemPlatformID;
	}

	public void setSystemPlatformID(Long systemPlatformID) {
		this.systemPlatformID = systemPlatformID;
	}
}
