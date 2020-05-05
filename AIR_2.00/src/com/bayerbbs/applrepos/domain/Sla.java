/*package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Immutable
@Entity
@Table(name = "V_MD_SLA")
public class Sla implements Serializable {

	private static final long serialVersionUID = -5884944103452028930L;

	private Long slaId;
	private String slaName;
	private Long slaClassId;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	*//**
	 * Creates a new instance.
	 *//*
	public Sla() {
	}

	// ------------------------------------------------------
	// hibernate get / set
	// ------------------------------------------------------
	*//**
	 * Returns the value of the field {@link #id}.
	 * 
	 * @return Value of the {@link #id} field.
	 *//*
	@Transient
	public Long getId() {
		return getSlaId();
	}

	*//**
	 * Returns the value of the field {@link #slaId}.
	 * 
	 * @return Value of the {@link #slaId} field.
	 *//*
	@Id
	@Column(name = "SLA_ID")
	public Long getSlaId() {
		return slaId;
	}

	*//**
	 * Sets the value of the {@link #slaId} field.
	 * 
	 * @param slaId
	 *            The value to set.
	 *//*
	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}

	*//**
	 * Returns the value of the field {@link #slaName}.
	 * 
	 * @return Value of the {@link #slaName} field.
	 *//*
	@Column(name = "SLA_NAME")
	public String getSlaName() {
		return slaName;
	}

	*//**
	 * Sets the value of the {@link #slaName} field.
	 * 
	 * @param slaName
	 *            The value to set.
	 *//*
	public void setSlaName(String slaName) {
		this.slaName = slaName;
	}

	*//**
	 * Returns the value of the field {@link #slaClassId}.
	 * 
	 * @return Value of the {@link #slaClassId} field.
	 *//*
	@Column(name = "SLA_CLASS_ID")
	public Long getSlaClassId() {
		return slaClassId;
	}

	*//**
	 * Sets the value of the {@link #slaClassId} field.
	 * 
	 * @param slaClassId
	 *            The value to set.
	 *//*
	public void setSlaClassId(Long slaClassId) {
		this.slaClassId = slaClassId;
	}

}
*/