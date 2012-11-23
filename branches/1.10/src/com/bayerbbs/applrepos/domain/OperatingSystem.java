package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Type;

@Immutable
@Entity
@Table(name = "V_MD_OS")
public class OperatingSystem implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8190720700715144264L;
	
	private Long osNameId;
	private String osName;
	private Long sort;
	private Date endOfVendorSupport;
	private String osNameInsertSource;
	private Long osTypeId;
	private String osType;
	private String osGroup;
	private Long hwIdentOrTrans;
	private Long licenseScanning;
	private String clusterCode;
	private String virtualHostSW;
	private Character virtualHost;
	private String osTypeInsertSource;
	private Long osPatchLevelId;
	private String osPatchLevelName;
	private Date osplEndOfVendorSupport;
	private String osPatchInsertSource;
	private Long lcStatusId;
	private Long lcSubStatId;
	private String lifecycleStatus;
	private Long tableId;
	private String tableName;
	
	public OperatingSystem(){
	}
	@Transient
	public Long getId() {
		return getOsNameId();
	}
	@Id
	@Column(name = "OS_NAME_ID")
	public Long getOsNameId() {
		return osNameId;
	}
	public void setOsNameId(Long osNameId) {
		this.osNameId = osNameId;
	}
	@Column(name = "OS_NAME")
	public String getOsName() {
		return osName;
	}
	public void setOsName(String osName) {
		this.osName = osName;
	}
	@Column(name = "SORT")
	public Long getSort() {
		return sort;
	}
	public void setSort(Long sort) {
		this.sort = sort;
	}
	@Column(name = "END_OF_VENDOR_SUPPORT")
	public Date getEndOfVendorSupport() {
		return endOfVendorSupport;
	}
	public void setEndOfVendorSupport(Date endOfVendorSupport) {
		this.endOfVendorSupport = endOfVendorSupport;
	}
	@Column(name = "OS_NAME_INSERT_SOURCE")
	public String getOsNameInsertSource() {
		return osNameInsertSource;
	}
	public void setOsNameInsertSource(String osNameInsertSource) {
		this.osNameInsertSource = osNameInsertSource;
	}
	@Column(name = "OS_TYPE_ID")
	public Long getOsTypeId() {
		return osTypeId;
	}
	public void setOsTypeId(Long osTypeId) {
		this.osTypeId = osTypeId;
	}
	@Column(name = "OS_TYPE")
	public String getOsType() {
		return osType;
	}
	public void setOsType(String osType) {
		this.osType = osType;
	}
	@Column(name = "OS_GROUP")
	public String getOsGroup() {
		return osGroup;
	}
	public void setOsGroup(String osGroup) {
		this.osGroup = osGroup;
	}
	@Column(name = "HW_IDENT_OR_TRANS")
	public Long getHwIdentOrTrans() {
		return hwIdentOrTrans;
	}
	public void setHwIdentOrTrans(Long hwIdentOrTrans) {
		this.hwIdentOrTrans = hwIdentOrTrans;
	}
	@Column(name = "LICENSE_SCANNING")
	public Long getLicenseScanning() {
		return licenseScanning;
	}
	public void setLicenseScanning(Long licenseScanning) {
		this.licenseScanning = licenseScanning;
	}
	@Column(name = "CLUSTER_CODE")
	public String getClusterCode() {
		return clusterCode;
	}
	public void setClusterCode(String clusterCode) {
		this.clusterCode = clusterCode;
	}
	@Column(name = "VIRTUAL_HOST_SW")
	public String getVirtualHostSW() {
		return virtualHostSW;
	}
	public void setVirtualHostSW(String virtualHostSW) {
		this.virtualHostSW = virtualHostSW;
	}
	@Type(type="yes_no")
	@Column(name = "VIRTUAL_HOST_Y_N")
	public Character getVirtualHost() {
		return virtualHost;
	}
	public void setVirtualHost(Character virtualHost) {
		this.virtualHost = virtualHost;
	}
	@Column(name = "OS_TYPE_INSERT_SOURCE")
	public String getOsTypeInsertSource() {
		return osTypeInsertSource;
	}
	public void setOsTypeInsertSource(String osTypeInsertSource) {
		this.osTypeInsertSource = osTypeInsertSource;
	}
	@Column(name = "OS_PATCH_LEVEL_ID")
	public Long getOsPatchLevelId() {
		return osPatchLevelId;
	}
	public void setOsPatchLevelId(Long osPatchLevelId) {
		this.osPatchLevelId = osPatchLevelId;
	}
	@Column(name = "OS_PATCH_LEVEL_NAME")
	public String getOsPatchLevelName() {
		return osPatchLevelName;
	}
	public void setOsPatchLevelName(String osPatchLevelName) {
		this.osPatchLevelName = osPatchLevelName;
	}
	@Column(name = "OSPL_END_OF_VENDOR_SUPPORT")
	public Date getOsplEndOfVendorSupport() {
		return osplEndOfVendorSupport;
	}
	public void setOsplEndOfVendorSupport(Date osplEndOfVendorSupport) {
		this.osplEndOfVendorSupport = osplEndOfVendorSupport;
	}
	@Column(name = "OS_PATCH_INSERT_SOURCE")
	public String getOsPatchInsertSource() {
		return osPatchInsertSource;
	}
	public void setOsPatchInsertSource(String osPatchInsertSource) {
		this.osPatchInsertSource = osPatchInsertSource;
	}
	@Column(name = "LC_STATUS_ID")
	public Long getLcStatusId() {
		return lcStatusId;
	}
	public void setLcStatusId(Long lcStatusId) {
		this.lcStatusId = lcStatusId;
	}
	@Column(name = "LC_SUB_STAT_ID")
	public Long getLcSubStatId() {
		return lcSubStatId;
	}
	public void setLcSubStatId(Long lcSubStatId) {
		this.lcSubStatId = lcSubStatId;
	}
	@Column(name = "LIFECYCLE_STATUS")
	public String getLifecycleStatus() {
		return lifecycleStatus;
	}
	public void setLifecycleStatus(String lifecycleStatus) {
		this.lifecycleStatus = lifecycleStatus;
	}
	@Column(name = "TABLE_ID")
	public Long getTableId() {
		return tableId;
	}
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}
	@Column(name = "TABLE_NAME")
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
}
