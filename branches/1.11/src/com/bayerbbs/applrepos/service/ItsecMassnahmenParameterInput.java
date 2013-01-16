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
	
	// for the linked GSTOOL Massnahme
	private Long linkCiId;
	private Long linkCiTableId;
	private Long massnahmeGstoolId;
	
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
	public Long getLinkCiId() {
		return linkCiId;
	}
	public void setLinkCiId(Long linkCiId) {
		this.linkCiId = linkCiId;
	}
	public Long getLinkCiTableId() {
		return linkCiTableId;
	}
	public void setLinkCiTableId(Long linkCiTableId) {
		this.linkCiTableId = linkCiTableId;
	}
	public Long getMassnahmeGstoolId() {
		return massnahmeGstoolId;
	}
	public void setMassnahmeGstoolId(Long massnahmeGstoolId) {
		this.massnahmeGstoolId = massnahmeGstoolId;
	}
	
	
}
