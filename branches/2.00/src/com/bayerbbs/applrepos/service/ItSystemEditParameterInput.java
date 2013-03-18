package com.bayerbbs.applrepos.service;


public class ItSystemEditParameterInput extends BaseEditParameterInput {
	private String alias;
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
	
	private Long severityLevelId;
	private Long businessEssentialId;

	
	
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	
	public Integer getOsNameId() {
		return osNameId;
	}
	public void setOsNameId(Integer osNameId) {
		this.osNameId = osNameId;
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
	public String getIsVirtualHardwareClient() {
		return isVirtualHardwareClient;
	}
	public void setIsVirtualHardwareClient(String isVirtualHardwareClient) {
		this.isVirtualHardwareClient = isVirtualHardwareClient;
	}
	public String getIsVirtualHardwareHost() {
		return isVirtualHardwareHost;
	}
	public void setIsVirtualHardwareHost(String isVirtualHardwareHost) {
		this.isVirtualHardwareHost = isVirtualHardwareHost;
	}
	public String getVirtualHardwareSoftware() {
		return virtualHardwareSoftware;
	}
	public void setVirtualHardwareSoftware(String virtualHardwareSoftware) {
		this.virtualHardwareSoftware = virtualHardwareSoftware;
	}
	public Integer getLifecycleStatusId() {
		return lifecycleStatusId;
	}
	public void setLifecycleStatusId(Integer lifecycleStatusId) {
		this.lifecycleStatusId = lifecycleStatusId;
	}
	public Integer getEinsatzStatusId() {
		return einsatzStatusId;
	}
	public void setEinsatzStatusId(Integer einsatzStatusId) {
		this.einsatzStatusId = einsatzStatusId;
	}
	public Integer getPrimaryFunctionId() {
		return primaryFunctionId;
	}
	public void setPrimaryFunctionId(Integer primaryFunctionId) {
		this.primaryFunctionId = primaryFunctionId;
	}
	public Integer getLicenseScanningId() {
		return licenseScanningId;
	}
	public void setLicenseScanningId(Integer licenseScanningId) {
		this.licenseScanningId = licenseScanningId;
	}
	
	public Long getSeverityLevelId() {
		return severityLevelId;
	}
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}
}