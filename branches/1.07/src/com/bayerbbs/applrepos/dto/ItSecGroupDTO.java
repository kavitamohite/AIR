package com.bayerbbs.applrepos.dto;

public class ItSecGroupDTO {
	private Long itSecGroupId;
	private String itSecGroupName;
	private Long itsetId;
	private Long ciKat1;
	

	public Long getItSecGroupId() {
		return itSecGroupId;
	}

	public void setItSecGroupId(Long itSecGroupId) {
		this.itSecGroupId = itSecGroupId;
	}

	public String getItSecGroupName() {
		return itSecGroupName;
	}

	public void setItSecGroupName(String itSecGroupName) {
		this.itSecGroupName = itSecGroupName;
	}

	public Long getItsetId() {
		return itsetId;
	}

	public void setItsetId(Long itsetId) {
		this.itsetId = itsetId;
	}
	
	public Long getCiKat1() {
		return ciKat1;
	}
	public void setCiKat1(Long ciKat1) {
		this.ciKat1 = ciKat1;
	}
}