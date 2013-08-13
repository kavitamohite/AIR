package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "CI_PERSONS")
@SequenceGenerator(name = "MySeqCiPersons", sequenceName = "TBADM.SEQ_CI_PERSONS")
public class CiPersons  extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -7156464759919517248L;

	private Long ciPersonsId;
	private Long tableId;
	private Long ciId;
	private String cwid;
	private Long groupTypeId;
	private String lastSyncSource;
	private String syncing;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public CiPersons() {
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
		return getCiPersonsId();
	}

	/**
	 * Returns the value of the field {@link #ciPersonsId}.
	 * 
	 * @return Value of the {@link #ciPersonsId} field.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqCiPersons")
	@Column(name = "CI_PERSONS_ID")
	public Long getCiPersonsId() {
		return ciPersonsId;
	}

	/**
	 * Sets the value of the {@link #ciPersonsId} field.
	 * 
	 * @param ciPersonsId
	 *            The value to set.
	 */
	public void setCiPersonsId(Long ciPersonsId) {
		this.ciPersonsId = ciPersonsId;
	}
	
	/**
	 * Returns the value of the field {@link #tableId}.
	 * 
	 * @return Value of the {@link #tableId} field.
	 */
	@Column(name = "TABLE_ID")
	public Long getTableId() {
		return tableId;
	}

	/**
	 * Sets the value of the {@link #tableId} field.
	 * 
	 * @param tableId
	 *            The value to set.
	 */
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	/**
	 * Returns the value of the field {@link #ciId}.
	 * 
	 * @return Value of the {@link #ciId} field.
	 */
	@Column(name = "CI_ID")
	public Long getCiId() {
		return ciId;
	}

	/**
	 * Sets the value of the {@link #ciId} field.
	 * 
	 * @param ciId
	 *            The value to set.
	 */
	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}
	
	/**
	 * Returns the value of the field {@link #cwid}.
	 * 
	 * @return Value of the {@link #cwid} field.
	 */
	@Column(name = "CWID")
	public String getCwid() {
		return cwid;
	}

	/**
	 * Sets the value of the {@link #cwid} field.
	 * 
	 * @param cwid
	 *            The value to set.
	 */
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

	/**
	 * Returns the value of the field {@link #groupTypeId}.
	 * 
	 * @return Value of the {@link #groupTypeId} field.
	 */
	@Column(name = "GROUP_TYPE_ID")
	public Long getGroupTypeId() {
		return groupTypeId;
	}

	/**
	 * Sets the value of the {@link #groupTypeId} field.
	 * 
	 * @param groupTypeId
	 *            The value to set.
	 */
	public void setGroupTypeId(Long groupTypeId) {
		this.groupTypeId = groupTypeId;
	}
	
	/**
	 * Returns the value of the field {@link #lastSyncSource}.
	 * 
	 * @return Value of the {@link #lastSyncSource} field.
	 */
	@Column(name = "LAST_SYNC_SOURCE")
	public String getLastSyncSource() {
		return lastSyncSource;
	}

	/**
	 * Sets the value of the {@link #lastSyncSource} field.
	 * 
	 * @param lastSyncSource
	 *            The value to set.
	 */
	public void setLastSyncSource(String lastSyncSource) {
		this.lastSyncSource = lastSyncSource;
	}

	/**
	 * Returns the value of the field {@link #syncing}.
	 * 
	 * @return Value of the {@link #syncing} field.
	 */
	@Column(name = "SYNCING")
	public String getSyncing() {
		return syncing;
	}

	/**
	 * Sets the value of the {@link #lastSyncSource} field.
	 * 
	 * @param lastSyncSource
	 *            The value to set.
	 */
	public void setSyncing(String syncing) {
		this.syncing = syncing;
	}

	
}
