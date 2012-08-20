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
@Table(name = "APPLICATION_REGION")
@SequenceGenerator(name = "MySeqApplicationRegion", sequenceName = "TBADM.SEQ_APPLICATION_REGION")
public class ApplicationRegion  extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = 2348683975086461924L;
	
	private Long applicationRegionId;
	private Long applicationId;
	private Long regionId;
	
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public ApplicationRegion() {
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
		return getApplicationRegionId();
	}

	/**
	 * Returns the value of the field {@link #applicationRegionId}.
	 * 
	 * @return Value of the {@link #applicationRegionId} field.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqApplicationRegion")
	@Column(name = "APPLICATION_REGION_ID")
	public Long getApplicationRegionId() {
		return applicationRegionId;
	}

	/**
	 * Sets the value of the {@link #applicationRegionId} field.
	 * 
	 * @param applicationRegionId
	 *            The value to set.
	 */
	public void setApplicationRegionId(Long applicationRegionId) {
		this.applicationRegionId = applicationRegionId;
	}
	
	/**
	 * Returns the value of the field {@link #applicationId}.
	 * 
	 * @return Value of the {@link #applicationId} field.
	 */
	@Column(name = "APPLICATION_ID")
	public Long getapplicationId() {
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
	 * Returns the value of the field {@link #regionId}.
	 * 
	 * @return Value of the {@link #regionId} field.
	 */
	@Column(name = "REGION_ID")
	public Long getRegionId() {
		return regionId;
	}

	/**
	 * Sets the value of the {@link #regionId} field.
	 * 
	 * @param regionId
	 *            The value to set.
	 */
	public void setRegionId(Long regionId) {
		this.regionId = regionId;
	}

	
}
