package com.bayerbbs.applrepos.dto;

public class ItSecSBWerteDTO {

	/**
	 * The DTO (Data transfer object) for the database table "ITSEC_SB_WERTE"
	 * 
	 * @author evafl
	 *
	 */
	
	Long itsecSBId;
	
	String sbText;
	Long sbWert;
	Long sort;
	String sbTextEn;

	public Long getItsecSBId() {
		return itsecSBId;
	}
	public void setItsecSBId(Long itsecSBId) {
		this.itsecSBId = itsecSBId;
	}
	public String getSbText() {
		return sbText;
	}
	public void setSbText(String sbText) {
		this.sbText = sbText;
	}
	public Long getSbWert() {
		return sbWert;
	}
	public void setSbWert(Long sbWert) {
		this.sbWert = sbWert;
	}
	public Long getSort() {
		return sort;
	}
	public void setSort(Long sort) {
		this.sort = sort;
	}
	public String getSbTextEn() {
		return sbTextEn;
	}
	public void setSbTextEn(String sbTextEn) {
		this.sbTextEn = sbTextEn;
	}
	
}
