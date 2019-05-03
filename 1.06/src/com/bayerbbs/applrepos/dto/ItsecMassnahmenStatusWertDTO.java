package com.bayerbbs.applrepos.dto;

public class ItsecMassnahmenStatusWertDTO {

	private Long itsecMassnahmenWertId;
	private String statusWert;
	private String statusWertEn;
	
	public Long getItsecMassnahmenWertId() {
		return itsecMassnahmenWertId;
	}
	public void setItsecMassnahmenWertId(Long itsecMassnahmenWertId) {
		this.itsecMassnahmenWertId = itsecMassnahmenWertId;
	}
	public String getStatusWert() {
		return statusWert;
	}
	public void setStatusWert(String statusWert) {
		this.statusWert = statusWert;
	}
	public String getStatusWertEn() {
		return statusWertEn;
	}
	public void setStatusWertEn(String statusWertEn) {
		this.statusWertEn = statusWertEn;
	}
	
}
