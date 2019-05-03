package com.bayerbbs.applrepos.dto;

public class ItsecMassnahmenDTO {

	private Long itsecMassnahmenStatusId;
	
	private String ident;
	private String massnahmeTitel;
	// Link
	private String statusWert;
	private Long statusWertId;

	private Long massnahmeGstoolId;
	private Long zobId;
	
	
	
	public Long getItsecMassnahmenStatusId() {
		return itsecMassnahmenStatusId;
	}
	public void setItsecMassnahmenStatusId(Long itsecMassnahmenStatusId) {
		this.itsecMassnahmenStatusId = itsecMassnahmenStatusId;
	}
	public String getIdent() {
		return ident;
	}
	public void setIdent(String ident) {
		this.ident = ident;
	}
	public String getMassnahmeTitel() {
		return massnahmeTitel;
	}
	public void setMassnahmeTitel(String massnahmeTitel) {
		this.massnahmeTitel = massnahmeTitel;
	}
	public String getStatusWert() {
		return statusWert;
	}
	public void setStatusWert(String statusWert) {
		this.statusWert = statusWert;
	}
	public Long getMassnahmeGstoolId() {
		return massnahmeGstoolId;
	}
	public void setMassnahmeGstoolId(Long massnahmeGstoolId) {
		this.massnahmeGstoolId = massnahmeGstoolId;
	}
	public Long getZobId() {
		return zobId;
	}
	public void setZobId(Long zobId) {
		this.zobId = zobId;
	}
	public Long getStatusWertId() {
		return statusWertId;
	}
	public void setStatusWertId(Long statusWertId) {
		this.statusWertId = statusWertId;
	}
	
}
