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
@Table(name = "V_MD_CI_SUPPORT_STUFF_TYPE")
public class CiSupportStuffType implements Serializable {

	private static final long serialVersionUID = -5815607844011557914L;

	private Long ciSupportStuffTypeId;
	private String ciSupportStuffTypeName;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public CiSupportStuffType() {
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
		return getCiSupportStuffTypeId();
	}

	/**
	 * Returns the value of the field {@link #ciSupportStuffTypeId}.
	 * 
	 * @return Value of the {@link #ciSupportStuffTypeId} field.
	 */
	@Id
	@Column(name = "CI_SUPPORT_STUFF_TYPE_ID")
	public Long getCiSupportStuffTypeId() {
		return ciSupportStuffTypeId;
	}

	/**
	 * Sets the value of the {@link #ciSupportStuffTypeId} field.
	 * 
	 * @param ciSupportStuffTypeId
	 *            The value to set.
	 */
	public void setCiSupportStuffTypeId(Long ciSupportStuffTypeId) {
		this.ciSupportStuffTypeId = ciSupportStuffTypeId;
	}
	
	/**
	 * Returns the value of the field {@link #ciSupportStuffTypeName}.
	 * 
	 * @return Value of the {@link #ciSupportStuffTypeName} field.
	 */
	@Column(name = "CI_SUPPORT_STUFF_TYPE_NAME")
	public String getCiSupportStuffTypeName() {
		return ciSupportStuffTypeName;
	}

	/**
	 * Sets the value of the {@link #ciSupportStuffTypeName} field.
	 * 
	 * @param ciSupportStuffTypeName
	 *            The value to set.
	 */
	public void setCiSupportStuffTypeName(String ciSupportStuffTypeName) {
		this.ciSupportStuffTypeName = ciSupportStuffTypeName;
	}

}
