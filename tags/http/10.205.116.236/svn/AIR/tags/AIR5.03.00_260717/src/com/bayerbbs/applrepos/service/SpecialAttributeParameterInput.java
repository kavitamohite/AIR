package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.SpecialAttributeViewDataDTO;

public class SpecialAttributeParameterInput {

	private Long ciId;
	private String token;
	private String cwid;
	private String ciTypeId;
	private Long tableId;

	private SpecialAttributeViewDataDTO specialAttributeViewDataDTO;

	public Long getCiId() {
		return ciId;
	}

	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getCwid() {
		return cwid;
	}

	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

	public String getCiTypeId() {
		return ciTypeId;
	}

	public void setCiTypeId(String ciTypeId) {
		this.ciTypeId = ciTypeId;
	}

	public SpecialAttributeViewDataDTO getSpecialAttributeViewDataDTO() {
		return specialAttributeViewDataDTO;
	}

	public void setSpecialAttributeViewDataDTO(
			SpecialAttributeViewDataDTO specialAttributeViewDataDTO) {
		this.specialAttributeViewDataDTO = specialAttributeViewDataDTO;
	}

	public Long getTableId() {
		return tableId;
	}

	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

}
