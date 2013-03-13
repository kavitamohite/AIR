package com.bayerbbs.applrepos.dto;

public class OsTypeDTO {// implements Comparable<KeyValueTypeDTO>
	private Integer osTypeId;
	private String osName;
	private String osGroup;
	private Long itSystemType;
	
	public OsTypeDTO() {
	}
	public OsTypeDTO(Integer osTypeId, String osName, String osGroup, Long itSystemType) {
		this.osTypeId = osTypeId;
		this.osName = osName;
		this.osGroup = osGroup;
		this.itSystemType = itSystemType;
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

//	@Override
//	public int compareTo(KeyValueTypeDTO other) {
//		return name.compareTo(other.getName());
//	}
}
