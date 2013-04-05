package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "IT_SYSTEM")
@SequenceGenerator(name = "MySeqItSystem", sequenceName = "TBADM.SEQ_IT_SYSTEM")
@NamedQueries({
//	@NamedQuery(name="findItSystemsByNameOrAlias", query="FROM ItSystem i WHERE i.itSystemName=:name OR i.alias=:alias"),
	@NamedQuery(name="findItSystemsByNameOrAlias", query="FROM ItSystem i WHERE i.itSystemName=:name OR i.alias=:alias OR i.itSystemName=:alias OR i.alias=:name"),
	@NamedQuery(name="findItSystemByName", query="FROM ItSystem i WHERE i.itSystemName=:name")
})
public class ItSystem extends CiBase2 implements Serializable {//DeletableRevisionInfo
	private static final long serialVersionUID = -9152390693208339445L;

	private String alias;
	private Integer ciSubTypeId;
	
	private Long severityLevelId;
	private Long businessEssentialId;
	
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
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqItSystem")
	@Column(name = "IT_SYSTEM_ID")
	public Long getItSystemId() {
		return getId();
	}
	public void setItSystemId(Long id) {
		setId(id);
	}

	@Column(name = "IT_SYSTEM_NAME")
	public String getItSystemName() {
		return getName();
	}
	public void setItSystemName(String name) {
		setName(name);
	}

	@Column(name = "ALIAS")
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	
//	@Column(name = "CWID_VERANTW_BETR")
//	//weil Feld CWID_VERANTW_BETR und nicht RESPONSIBLE heisst wie in allen anderen Tabellen, kann nicht von CiBase
//	//abgeleitet werden.
//	public String getCiOwner() {
//		return ciOwner;
//	}
//	public void setCiOwner(String ciOwner) {
//		this.ciOwner = ciOwner;
//	}
	
	/*
	@Column(name = "SUB_RESPONSIBLE")
	public String getCiOwnerDelegate() {
		return ciOwnerDelegate;
	}

	public void setCiOwnerDelegate(String ciOwnerDelegate) {
		this.ciOwnerDelegate = ciOwnerDelegate;
	}*/
	
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


	
	@Column(name = "HW_IDENT_OR_TRANS")
	public Integer getCiSubTypeId() {
		return ciSubTypeId;
	}
	public void setCiSubTypeId(Integer ciSubTypeId) {
		this.ciSubTypeId = ciSubTypeId;
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