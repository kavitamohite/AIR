package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "IT_SYSTEM")
@SequenceGenerator(name = "MySeqITSystem", sequenceName = "TBADM.SEQ_IT_SYSTEM")
public class SystemPlatform extends CI implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2407052791148141236L;
	@Id
	@GeneratedValue
	private Long systemPlatformID;
	@NaturalId
	private String systemPlatformName;
	private String alias;
	private Long hwIdentOrTrans;
	private Long osNameID;
	private Long primaryFunctionID;
	private Long operationalStatusID;
	private String clusterCode;
	private String clusterType;
	@Basic
	private Character virtualHW;
	@Basic
	private Character virtualHost;
	private String virtualHostSW;
	private Long lcStatusID;
	private Long licenseScanning;
		
	/**
	 * 
	 */
	public SystemPlatform() {
		super();
		this.setCiType(CIType.SYSTEM_PLATFORM);
	}
	@Transient
	public Long getID() {
		return getSystemPlatformID();
	}
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqITSystem")
	@Column(name = "IT_SYSTEM_ID")
	public Long getSystemPlatformID() {
		return systemPlatformID;
	}
	public void setSystemPlatformID(Long systemPlatformID) {
		this.systemPlatformID = systemPlatformID;
		this.setID(systemPlatformID);
	}
	@Column(name = "IT_SYSTEM_NAME")
	public String getSystemPlatformName() {
		return systemPlatformName;
	}
	public void setSystemPlatformName(String systemPlatformName) {
		this.systemPlatformName = systemPlatformName;
		this.setName(systemPlatformName);
	}
	@Column(name = "ALIAS")
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	@Column(name = "HW_IDENT_OR_TRANS")
	public Long getHwIdentOrTrans() {
		return hwIdentOrTrans;
	}
	public void setHwIdentOrTrans(Long hwIdentOrTrans) {
		this.hwIdentOrTrans = hwIdentOrTrans;
	}
	@Column(name = "OS_NAME_ID")
	public Long getOsNameID() {
		return osNameID;
	}
	public void setOsNameID(Long osNameID) {
		this.osNameID = osNameID;
	}
	@Column(name = "PRIMARY_FUNCTION_ID")
	public Long getPrimaryFunctionID() {
		return primaryFunctionID;
	}
	public void setPrimaryFunctionID(Long primaryFunctionID) {
		this.primaryFunctionID = primaryFunctionID;
	}
	@Column(name = "EINSATZ_STATUS_ID")
	public Long getOperationalStatusID() {
		return operationalStatusID;
	}
	public void setOperationalStatusID(Long operationalStatusID) {
		this.operationalStatusID = operationalStatusID;
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
	@Column(name = "VIRTUAL_HW_Y_N")
	public Boolean getVirtualHW() {
		if (virtualHW == null) return null;
		return virtualHW == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}
	public void setVirtualHW(Boolean virtualHW) {
		if (virtualHW == null)
		{
			this.virtualHW = null;
		}
		else
		{
			this.virtualHW = virtualHW == true  ? 'Y' : 'N';
		}
	}
	@Column(name = "VIRTUAL_HOST_Y_N")
	public Boolean getVirtualHost() {
		if (virtualHost == null) return null;
		return virtualHost == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}
	public void setVirtualHost(Boolean virtualHost) {
		if (virtualHost == null)
		{
			this.virtualHost = null;
		}
		else
		{
			this.virtualHost = virtualHost == true  ? 'Y' : 'N';
		}
	}
	
	@Column(name = "VIRTUAL_HOST_SW")
	public String getVirtualHostSW() {
		return virtualHostSW;
	}
	public void setVirtualHostSW(String virtualHostSW) {
		this.virtualHostSW = virtualHostSW;
	}
	@Column(name = "LC_SUB_STATUS_ID")
	public Long getLcStatusID() {
		return lcStatusID;
	}
	public void setLcStatusID(Long lcStatusID) {
		this.lcStatusID = lcStatusID;
	}
	@Column(name = "LICENSE_SCANNING")
	public Long getLicenseScanning() {
		return licenseScanning;
	}
	public void setLicenseScanning(Long licenseScanning) {
		this.licenseScanning = licenseScanning;
	}
	@Override
	@Column(name = "CWID_VERANTW_BETR")
	public String getResponsible() {
		return responsible;
	}
	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}
}