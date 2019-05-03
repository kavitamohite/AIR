package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ItsecMassnahmeDetailDTO;

public class ItsecMassnahmenParameterInput {

	private String token;
	private String cwid;

	// for the list page
	private Long tableId;
	private Long ciId;
	private String language;	// de, en
	
	// for detail page
	private Long itsecGruppenId;
	private Long itsecMassnahmenStatusId;
	
	// for saving the detail information
	private ItsecMassnahmeDetailDTO itsecMassnahmeDetailsDTO;//[]
	
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
	public Long getTableId() {
		return tableId;
	}
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}
	public Long getCiId() {
		return ciId;
	}
	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public Long getItsecGruppenId() {
		return itsecGruppenId;
	}
	public void setItsecGruppenId(Long itsecGruppenId) {
		this.itsecGruppenId = itsecGruppenId;
	}
	public Long getItsecMassnahmenStatusId() {
		return itsecMassnahmenStatusId;
	}
	public void setItsecMassnahmenStatusId(Long itsecMassnahmenStatusId) {
		this.itsecMassnahmenStatusId = itsecMassnahmenStatusId;
	}
	public ItsecMassnahmeDetailDTO getItsecMassnahmeDetailsDTO() {//[]
		return itsecMassnahmeDetailsDTO;
	}
	public void setItsecMassnahmeDetailsDTO(ItsecMassnahmeDetailDTO itsecMassnahmeDetailsDTO) {//[]
		this.itsecMassnahmeDetailsDTO = itsecMassnahmeDetailsDTO;
	}
}
