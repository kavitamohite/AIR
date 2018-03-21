package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "PROCESS")
public class Process extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = 5769498462773909141L;

	private Long processId;
	private String processName;
	private String processOwner;
	private String processManager;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public Process() {
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
		return getProcessId();
	}

	/**
	 * Returns the value of the field {@link #processId}.
	 * 
	 * @return Value of the {@link #processId} field.
	 */
	@Id
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
	 * Returns the value of the field {@link #processName}.
	 * 
	 * @return Value of the {@link #processName} field.
	 */
	@Column(name = "PROCESS_NAME")
	public String getProcessName() {
		return processName;
	}

	/**
	 * Sets the value of the {@link #processName} field.
	 * 
	 * @param processName
	 *            The value to set.
	 */
	public void setProcessName(String processName) {
		this.processName = processName;
	}

	/**
	 * Returns the value of the field {@link #processOwner}.
	 * 
	 * @return Value of the {@link #processOwner} field.
	 */
	@Column(name = "PROCESS_OWNER")
	public String getProcessOwner() {
		return processOwner;
	}

	/**
	 * Sets the value of the {@link #processOwner} field.
	 * 
	 * @param processOwner
	 *            The value to set.
	 */
	public void setProcessOwner(String processOwner) {
		this.processOwner = processOwner;
	}
	

	/**
	 * Returns the value of the field {@link #processManager}.
	 * 
	 * @return Value of the {@link #processManager} field.
	 */
	@Column(name = "PROCESS_MANAGER")
	public String getProcessManager() {
		return processManager;
	}

	/**
	 * Sets the value of the {@link #processManager} field.
	 * 
	 * @param processManager
	 *            The value to set.
	 */
	public void setProcessManager(String processManager) {
		this.processManager = processManager;
	}

}
