package com.bayerbbs.applrepos.dto;

public class CiTypeDTO {
	private String ciTypeId;
	private String ciTypeName;
	
	public CiTypeDTO() {}
	
	public CiTypeDTO(String ciTypeId, String ciTypeName) {
		this.ciTypeId = ciTypeId;
		this.ciTypeName = ciTypeName;
	}

	public String getCiTypeId() {
		return ciTypeId;
	}
	public void setCiTypeId(String ciTypeId) {
		this.ciTypeId = ciTypeId;
	}
	public String getCiTypeName() {
		return ciTypeName;
	}
	public void setCiTypeName(String ciTypeName) {
		this.ciTypeName = ciTypeName;
	}
}