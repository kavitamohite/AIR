package com.bayerbbs.applrepos.dto;


public class ItSystemDTO extends CiBaseDTO {
	private Integer ciSubTypeId;
	
	//Specifics
	private Integer osNameId;//bestimmt gleichzeitig auch noch osType und osGroup
	private String clusterCode;
	private String clusterType;
	
	private String isVirtualHardwareClient;
	private String isVirtualHardwareHost;
	//C0000181270 - Added for Appliance Flag
	private long isApplianceFlag;
	
	private String virtualHardwareSoftware;
	
	private Integer lifecycleStatusId;
	private Integer einsatzStatusId;
	
	private Integer primaryFunctionId;
	private Integer licenseScanningId;
	
	private Long priorityLevelId;
	private Long severityLevelId;
	private Long businessEssentialId;
	
	private String upStreamAdd;
	private String upStreamDelete;
	
	private String backupType;
	private String servicePack;
	
	
	public Integer getCiSubTypeId() {
		return ciSubTypeId;
	}
	public void setCiSubTypeId(Integer ciSubTypeId) {
		this.ciSubTypeId = ciSubTypeId;
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
	
	public Long getPriorityLevelId() {
		return priorityLevelId;
	}
	public void setPriorityLevelId(Long priorityLevelId) {
		this.priorityLevelId = priorityLevelId;
	}
/*	public Long getSeverityLevelId() {
		return severityLevelId;
	}
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}*/
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}
	
	


	public String getUpStreamAdd() {
		return upStreamAdd;
	}
	public void setUpStreamAdd(String upStreamAdd) {
		this.upStreamAdd = upStreamAdd;
	}
	public String getUpStreamDelete() {
		return upStreamDelete;
	}
	public void setUpStreamDelete(String upStreamDelete) {
		this.upStreamDelete = upStreamDelete;
	}
	/**
	 * @return the backupType
	 */
	public String getBackupType() {
		return backupType;
	}
	/**
	 * @param backupType the backupType to set
	 */
	public void setBackupType(String backupType) {
		this.backupType = backupType;
	}
	/**
	 * @return the servicePack
	 */
	public String getServicePack() {
		return servicePack;
	}
	/**
	 * @param servicePack the servicePack to set
	 */
	public void setServicePack(String servicePack) {
		this.servicePack = servicePack;
	}
	
	//Started for - C0000181270 - Appliance Flag
	public long getIsApplianceFlag() {
		return isApplianceFlag;
	}
	public void setIsApplianceFlag(long isApplianceFlag) {
		this.isApplianceFlag = isApplianceFlag;
	}
	
	//Ended for - C0000181270 - Appliance Flag
	
}