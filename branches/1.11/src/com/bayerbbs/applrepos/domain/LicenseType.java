package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "LICENSE_TYPE")
public class LicenseType extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = 1115199930658830080L;

	private Long licenseTypeId;
	private String licenseTypeName;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public LicenseType() {
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
		return getLicenseTypeId();
	}

	/**
	 * Returns the value of the field {@link #licenseTypeId}.
	 * 
	 * @return Value of the {@link #licenseTypeId} field.
	 */
	@Id
	@Column(name = "LICENSE_TYPE_ID")
	public Long getLicenseTypeId() {
		return licenseTypeId;
	}

	/**
	 * Sets the value of the {@link #licenseTypeId} field.
	 * 
	 * @param licenseTypeId
	 *            The value to set.
	 */
	public void setLicenseTypeId(Long licenseTypeId) {
		this.licenseTypeId = licenseTypeId;
	}
	
	/**
	 * Returns the value of the field {@link #licenseTypeName}.
	 * 
	 * @return Value of the {@link #licenseTypeName} field.
	 */
	@Column(name = "LICENSE_TYPE_NAME")
	public String getLicenseTypeName() {
		return licenseTypeName;
	}

	/**
	 * Sets the value of the {@link #licenseTypeName} field.
	 * 
	 * @param licenseTypeName
	 *            The value to set.
	 */
	public void setLicenseTypeName(String licenseTypeName) {
		this.licenseTypeName = licenseTypeName;
	}

}
