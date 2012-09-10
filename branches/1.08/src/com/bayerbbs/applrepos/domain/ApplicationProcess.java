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
@Table(name = "APPLICATION_PROCESS")
@SequenceGenerator(name = "MySeqApplicationProcess", sequenceName = "TBADM.SEQ_APPLICATION_PROCESS")
public class ApplicationProcess extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -8502538148794386334L;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	Long applicationProcessId;
	
	Long processId;
	Long applicationId;
	private String lastSyncSource;
	private String syncing;
	
	
	/**
	 * Creates a new instance.
	 */
	public ApplicationProcess() {
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
		return getApplicationProcessId();
	}

	/**
	 * Returns the value of the field {@link #applicationProcessId}.
	 * 
	 * @return Value of the {@link #applicationProcessId} field.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqApplicationProcess")
	@Column(name = "APPLICATION_PROCESS_ID")
	public Long getApplicationProcessId() {
		return applicationProcessId;
	}

	/**
	 * Sets the value of the {@link #applicationProcessId} field.
	 * 
	 * @param applicationProcessId
	 *            The value to set.
	 */
	public void setApplicationProcessId(Long applicationProcessId) {
		this.applicationProcessId = applicationProcessId;
	}

	/**
	 * Returns the value of the field {@link #processId}.
	 * 
	 * @return Value of the {@link #processId} field.
	 */
	@Column(name = "PROCESS_ID")
	public Long getProcessId() {
		return processId;
	}

	/**
	 * Sets the value of the {@link #processId} field.
	 * 
	 * @param processId
	 *            The value to set.
	 */
	public void setProcessId(Long processId) {
		this.processId = processId;
	}

	
	/**
	 * Returns the value of the field {@link #applicationId}.
	 * 
	 * @return Value of the {@link #applicationId} field.
	 */
	@Column(name = "APPLICATION_ID")
	public Long getApplicationId() {
		return applicationId;
	}

	/**
	 * Sets the value of the {@link #applicationId} field.
	 * 
	 * @param applicationId
	 *            The value to set.
	 */
	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
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
