package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ANWEND_IT_SYSTEM")
public class ApplicationItSystem extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -6868013375508539998L;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	Long applicationItSystemId;
	
	Long applicationId;
	Long itSystemId;
	
	
	/**
	 * Creates a new instance.
	 */
	public ApplicationItSystem() {
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
		return getApplicationItSystemId();
	}

	/**
	 * Returns the value of the field {@link #applicationItSystemId}.
	 * 
	 * @return Value of the {@link #applicationItSystemId} field.
	 */
	@Id
	@Column(name = "ANW_IT_SYSTEM_ID")
	public Long getApplicationItSystemId() {
		return applicationItSystemId;
	}

	/**
	 * Sets the value of the {@link #applicationItSystemId} field.
	 * 
	 * @param applicationItSystemId
	 *            The value to set.
	 */
	public void setApplicationItSystemId(Long applicationItSystemId) {
		this.applicationItSystemId = applicationItSystemId;
	}

	/**
	 * Returns the value of the field {@link #applicationId}.
	 * 
	 * @return Value of the {@link #applicationId} field.
	 */
	@Column(name = "ANWENDUNG_ID")
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
	 * Returns the value of the field {@link #itSystemId}.
	 * 
	 * @return Value of the {@link #itSystemId} field.
	 */
	@Column(name = "IT_SYSTEM_ID")
	public Long getItSystemId() {
		return itSystemId;
	}

	/**
	 * Sets the value of the {@link #itSystemId} field.
	 * 
	 * @param itSystemId
	 *            The value to set.
	 */
	public void setItSystemId(Long itSystemId) {
		this.itSystemId = itSystemId;
	}
	
}
