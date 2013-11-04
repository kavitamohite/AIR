package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ITSEC_SB_WERTE")
public class ItsecSBWerte implements Serializable {

	private static final long serialVersionUID = 1499502978832308901L;

	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	Long itsecSBId;
	
	String sbText;
	Long sbWert;
	Long sort;
	String sbTextEn;
	
	
	/**
	 * Creates a new instance.
	 */
	public ItsecSBWerte() {
	}

	// ------------------------------------------------------
	// hibernate get / set
	// ------------------------------------------------------

	/**
	 * Returns the value of the field {@link #id}.
	 * 
	 * @return Value of the {@link #id} field.
	 */
	@Transient
	public Long getId() {
		return getItsecSBId();
	}

	/**
	 * Returns the value of the field {@link #itsecSBId}.
	 * 
	 * @return Value of the {@link #itsecSBId} field.
	 */
	@Id
	@Column(name = "ITSEC_SB_ID")
	public Long getItsecSBId() {
		return itsecSBId;
	}

	/**
	 * Sets the value of the {@link #itsecSBId} field.
	 * 
	 * @param itsecSBId
	 *            The value to set.
	 */
	public void setItsecSBId(Long itsecSBId) {
		this.itsecSBId = itsecSBId;
	}

	/**
	 * Returns the value of the field {@link #sbText}.
	 * 
	 * @return Value of the {@link #sbText} field.
	 */
	@Column(name = "SB_TEXT")
	public String getSbText() {
		return sbText;
	}

	/**
	 * Sets the value of the {@link #sbText} field.
	 * 
	 * @param sbText
	 *            The value to set.
	 */
	public void setSbText(String sbText) {
		this.sbText = sbText;
	}

	/**
	 * Returns the value of the field {@link #sbWert}.
	 * 
	 * @return Value of the {@link #sbWert} field.
	 */
	@Column(name = "SB_WERT")
	public Long getSbWert() {
		return sbWert;
	}

	/**
	 * Sets the value of the {@link #sbWert} field.
	 * 
	 * @param sbWert
	 *            The value to set.
	 */
	public void setSbWert(Long sbWert) {
		this.sbWert = sbWert;
	}

	/**
	 * Returns the value of the field {@link #sort}.
	 * 
	 * @return Value of the {@link #sort} field.
	 */
	@Column(name = "SORT")
	public Long getSort() {
		return sort;
	}

	/**
	 * Sets the value of the {@link #sort} field.
	 * 
	 * @param sort
	 *            The value to set.
	 */
	public void setSort(Long sort) {
		this.sort = sort;
	}

	
	/**
	 * Returns the value of the field {@link #sbTextEn}.
	 * 
	 * @return Value of the {@link #sbTextEn} field.
	 */
	@Column(name = "SB_TEXT_EN")
	public String getSbTextEn() {
		return sbTextEn;
	}

	/**
	 * Sets the value of the {@link #sbTextEn} field.
	 * 
	 * @param sbTextEn
	 *            The value to set.
	 */
	public void setSbTextEn(String sbTextEn) {
		this.sbTextEn = sbTextEn;
	}

}
