package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Immutable
@Entity
@Table(name = "V_MD_LIFECYCLE_STATUS")
public class LifecycleStatus implements Serializable {

	private static final long serialVersionUID = 1302835433144931166L;

	private Long lcStatusId;
	private String lcStatus;
	private String lcStatusTxt;
	private Long sort;
	private Long tabelleId;
	private String lcStatusEn;
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public LifecycleStatus() {
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
		return getLcStatusId();
	}

	/**
	 * Returns the value of the field {@link #lcStatusId}.
	 * 
	 * @return Value of the {@link #lcStatusId} field.
	 */
	@Id
	@Column(name = "LC_STATUS_ID")
	public Long getLcStatusId() {
		return lcStatusId;
	}

	/**
	 * Sets the value of the {@link #lcStatusId} field.
	 * 
	 * @param lcStatusId
	 *            The value to set.
	 */
	public void setLcStatusId(Long lcStatusId) {
		this.lcStatusId = lcStatusId;
	}

	
	/**
	 * Returns the value of the field {@link #lcStatus}.
	 * 
	 * @return Value of the {@link #lcStatus} field.
	 */
	@Column(name = "LC_STATUS")
	public String getlcStatus() {
		return lcStatus;
	}

	/**
	 * Sets the value of the {@link #lcStatus} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setLcStatus(String lcStatus) {
		this.lcStatus = lcStatus;
	}

	/**
	 * Returns the value of the field {@link #lcStatusTxt}.
	 * 
	 * @return Value of the {@link #lcStatusTxt} field.
	 */
	@Column(name = "LC_STATUS_TXT")
	public String getlcStatusTxt() {
		return lcStatusTxt;
	}

	/**
	 * Sets the value of the {@link #lcStatusTxt} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setLcStatusTxt(String lcStatusTxt) {
		this.lcStatusTxt = lcStatusTxt;
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
	 * @param name
	 *            The value to set.
	 */
	public void setSort(Long sort) {
		this.sort = sort;
	}

	/**
	 * Returns the value of the field {@link #tabelleId}.
	 * 
	 * @return Value of the {@link #tabelleId} field.
	 */
	@Column(name = "TABELLE_ID")
	public Long getTabelleId() {
		return tabelleId;
	}

	/**
	 * Sets the value of the {@link #tabelleId} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setTabelleId(Long tabelleId) {
		this.tabelleId = tabelleId;
	}

	/**
	 * Returns the value of the field {@link #lcStatusEn}.
	 * 
	 * @return Value of the {@link #lcStatusEn} field.
	 */
	@Column(name = "LC_STATUS_EN")
	public String getlcStatusEn() {
		return lcStatusEn;
	}

	/**
	 * Sets the value of the {@link #lcStatusEn} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setLcStatusEn(String lcStatusEn) {
		this.lcStatusEn = lcStatusEn;
	}

}
