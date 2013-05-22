package com.bayerbbs.applrepos.dto;

public class OsTypeDTO {// implements Comparable<KeyValueTypeDTO>
	private Integer osTypeId;
	private String osName;
	private String osGroup;
	private Long itSystemType;
	private Integer licenseScanning;
	
	public OsTypeDTO() {
	}
	public OsTypeDTO(Integer osTypeId, String osName, String osGroup, Long itSystemType, Integer licenseScanning) {
		this.osTypeId = osTypeId;
		this.osName = osName;
		this.osGroup = osGroup;
		this.itSystemType = itSystemType;
		this.licenseScanning = licenseScanning;
	}

	public Integer getOsTypeId() {
		return osTypeId;
	}
	public void setOsTypeId(Integer osTypeId) {
		this.osTypeId = osTypeId;
	}
	
	public String getOsName() {
		return osName;
	}
	public void setOsName(String osName) {
		this.osName = osName;
	}
	
	public String getOsGroup() {
		return osGroup;
	}
	public void setOsGroup(String osGroup) {
		this.osGroup = osGroup;
	}
	
	public Long getItSystemType() {
		return itSystemType;
	}
	public void setItSystemType(Long itSystemType) {
		this.itSystemType = itSystemType;
	}
	
	public void setLicenseScanning(Integer licenseScanning) {
		this.licenseScanning = licenseScanning;
	}
	public Integer getLicenseScanning() {
		return licenseScanning;
	}

//	@Override
//	public int compareTo(KeyValueTypeDTO other) {
//		return name.compareTo(other.getName());
//	}
}
