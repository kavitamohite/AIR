package com.bayerbbs.applrepos.dto;

public class ItsecMassnahmenDTO {

	private Long itsecMassnahmenStatusId;
	
	private String ident;
	private String massnahmeTitel;
	// Link
	private String statusWert;
	private Long statusWertId;
	private String statusWertEn;

	private Long massnahmeGstoolId;
	private Long zobId;
	
	private String massnahmeLink;
	
	private Integer chocoMerkmal; // Merkmal, ob diese Massnahme auf eine Funktion "verlinkt" werden darf
	
	
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
	public void setStatusWertEn(String statusWert) {
		this.statusWert = statusWert;
	}
	public String getStatusWertEn() {
		return statusWertEn;
	}
	public void setStatusWert(String statusWertEn) {
		this.statusWertEn = statusWertEn;
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
	public String getMassnahmeLink() {
		return massnahmeLink;
	}
	public void setMassnahmeLink(String massnahmeLink) {
		this.massnahmeLink = massnahmeLink;
	}
	public Integer getChocoMerkmal() {
		return chocoMerkmal;
	}
	public void setChocoMerkmal(Integer chocoMerkmal) {
		this.chocoMerkmal = chocoMerkmal;
	}
	
}
