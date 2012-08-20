package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "EINSATZ_STATUS")
public class OperationalStatus implements Serializable {

	private static final long serialVersionUID = -8672683745548361394L;

	private Long operationalStatusId;
	private String operationalStatus;
	private String operationalStatusEn;
	private String operationalStatusTxt;
	private Long sort;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public OperationalStatus() {
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
		return getOperationalStatusId();
	}

	/**
	 * Returns the value of the field {@link #operationalStatusId}.
	 * 
	 * @return Value of the {@link #operationalStatusId} field.
	 */
	@Id
	@Column(name = "EINSATZ_STATUS_ID")
	public Long getOperationalStatusId() {
		return operationalStatusId;
	}

	/**
	 * Sets the value of the {@link #operationalStatusId} field.
	 * 
	 * @param lcStatusId
	 *            The value to set.
	 */
	public void setOperationalStatusId(Long operationalStatusId) {
		this.operationalStatusId = operationalStatusId;
	}

	/**
	 * Returns the value of the field {@link #operationalStatus}.
	 * 
	 * @return Value of the {@link #operationalStatus} field.
	 */
	@Column(name = "EINSATZ_STATUS")
	public String getOperationalStatus() {
		return operationalStatus;
	}

	/**
	 * Sets the value of the {@link #operationalStatus} field.
	 * 
	 * @param operationalStatus
	 *            The value to set.
	 */
	public void setOperationalStatus(String operationalStatus) {
		this.operationalStatus = operationalStatus;
	}
	
	/**
	 * Returns the value of the field {@link #operationalStatusEn}.
	 * 
	 * @return Value of the {@link #operationalStatusEn} field.
	 */
	@Column(name = "EINSATZ_STATUS_EN")
	public String getOperationalStatusEn() {
		return operationalStatusEn;
	}

	/**
	 * Sets the value of the {@link #operationalStatusEn} field.
	 * 
	 * @param operationalStatusEn
	 *            The value to set.
	 */
	public void setOperationalStatusEn(String operationalStatusEn) {
		this.operationalStatusEn = operationalStatusEn;
	}
	
	/**
	 * Returns the value of the field {@link #operationalStatusTxt}.
	 * 
	 * @return Value of the {@link #operationalStatusEnTxt} field.
	 */
	@Column(name = "EINSATZ_STATUS_TXT")
	public String getOperationalStatusTxt() {
		return operationalStatusTxt;
	}

	/**
	 * Sets the value of the {@link #operationalStatusTxt} field.
	 * 
	 * @param operationalStatusTxt
	 *            The value to set.
	 */
	public void setOperationalStatusTxt(String operationalStatusTxt) {
		this.operationalStatusTxt = operationalStatusTxt;
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

}
