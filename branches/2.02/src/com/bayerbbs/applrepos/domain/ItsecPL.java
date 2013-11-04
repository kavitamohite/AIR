package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "ITSEC_SB_WERTE")
public class ItsecPL implements Serializable {
	private static final long serialVersionUID = 1499502978832308901L;

	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	Long itsecPlId;
	
	String plText;
	Long plValue;
	Long sort;
	String plTextEn;
	
	
	/**
	 * Creates a new instance.
	 */
	public ItsecPL() {
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
		return getItsecPLId();
	}

	/**
	 * Returns the value of the field {@link #itsecPlId}.
	 * 
	 * @return Value of the {@link #itsecPlId} field.
	 */
	@Id
	@Column(name = "ITSEC_SB_ID")
	public Long getItsecPLId() {
		return itsecPlId;
	}

	/**
	 * Sets the value of the {@link #itsecPlId} field.
	 * 
	 * @param itsecPlId
	 *            The value to set.
	 */
	public void setItsecPLId(Long itsecPLId) {
		this.itsecPlId = itsecPLId;
	}

	/**
	 * Returns the value of the field {@link #plText}.
	 * 
	 * @return Value of the {@link #plText} field.
	 */
	@Column(name = "SB_TEXT")
	public String getPLText() {
		return plText;
	}

	/**
	 * Sets the value of the {@link #plText} field.
	 * 
	 * @param plText
	 *            The value to set.
	 */
	public void setPLText(String plText) {
		this.plText = plText;
	}

	/**
	 * Returns the value of the field {@link #plValue}.
	 * 
	 * @return Value of the {@link #plValue} field.
	 */
	@Column(name = "SB_WERT")
	public Long getPLValue() {
		return plValue;
	}

	/**
	 * Sets the value of the {@link #plValue} field.
	 * 
	 * @param plValue
	 *            The value to set.
	 */
	public void setPLValue(Long plValue) {
		this.plValue = plValue;
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
	 * Returns the value of the field {@link #plTextEn}.
	 * 
	 * @return Value of the {@link #plTextEn} field.
	 */
	@Column(name = "SB_TEXT_EN")
	public String getPLTextEn() {
		return plTextEn;
	}

	/**
	 * Sets the value of the {@link #plTextEn} field.
	 * 
	 * @param plTextEn
	 *            The value to set.
	 */
	public void setPLTextEn(String plTextEn) {
		this.plTextEn = plTextEn;
	}

}
