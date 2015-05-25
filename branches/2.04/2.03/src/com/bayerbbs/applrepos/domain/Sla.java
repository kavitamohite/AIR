package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.sql.Timestamp;

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

	private String remarks;// REMARKS VARCHAR2(4000)
	private Long itset;// ITSET NUMBER
	private String subResponsible;// SUB_RESPONSIBLE VARCHAR2(160)
	private String responsible; // RESPONSIBLE VARCHAR2(32)
	private String timezone;// TIMEZONE VARCHAR2(160)
	private String slaNameGsdb;// SLA_NAME_GSDB VARCHAR2(960)
	private Timestamp lastSync;// LAST_SYNC_TIMESTAMP TIMESTAMP(6)
	private String lastSyncSource;// LAST_SYNC_SOURCE VARCHAR2(40)
	private String syncing;// SYNCING VARCHAR2(40)

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public Sla() {
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
		return getSlaId();
	}

	/**
	 * Returns the value of the field {@link #slaId}.
	 * 
	 * @return Value of the {@link #slaId} field.
	 */
	@Id
	@Column(name = "SLA_ID")
	public Long getSlaId() {
		return slaId;
	}

	/**
	 * Sets the value of the {@link #slaId} field.
	 * 
	 * @param slaId
	 *            The value to set.
	 */
	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}

	/**
	 * Returns the value of the field {@link #slaName}.
	 * 
	 * @return Value of the {@link #slaName} field.
	 */
	@Column(name = "SLA_NAME")
	public String getSlaName() {
		return slaName;
	}

	/**
	 * Sets the value of the {@link #slaName} field.
	 * 
	 * @param slaName
	 *            The value to set.
	 */
	public void setSlaName(String slaName) {
		this.slaName = slaName;
	}

	/**
	 * Returns the value of the field {@link #slaClassId}.
	 * 
	 * @return Value of the {@link #slaClassId} field.
	 */
	@Column(name = "SLA_CLASS_ID")
	public Long getSlaClassId() {
		return slaClassId;
	}

	/**
	 * Sets the value of the {@link #slaClassId} field.
	 * 
	 * @param slaClassId
	 *            The value to set.
	 */
	public void setSlaClassId(Long slaClassId) {
		this.slaClassId = slaClassId;
	}

}
