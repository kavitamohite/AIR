package com.bayerbbs.applrepos.dto;

public class OsNameDTO {// implements Comparable<KeyValueTypeDTO>
	private Integer osNameId;
	private String osName;
	private Integer osTypeId;
	private Long itSystemType;
	
	public OsNameDTO() {
	}
	public OsNameDTO(Integer osNameId, String osName, Integer osTypeId, Long itSystemType) {
		this.osNameId = osNameId;
		this.osName = osName;
		this.osTypeId = osTypeId;
		this.itSystemType = itSystemType;
	}

	public Integer getosNameId() {
		return osNameId;
	}
	public void setosNameId(Integer osNameId) {
		this.osNameId = osNameId;
	}
	
	public String getOsName() {
		return osName;
	}
	public void setOsName(String osName) {
		this.osName = osName;
	}
	
	public Integer getOsTypeId() {
		return osTypeId;
	}
	public void setOsTypeId(Integer osTypeId) {
		this.osTypeId = osTypeId;
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
