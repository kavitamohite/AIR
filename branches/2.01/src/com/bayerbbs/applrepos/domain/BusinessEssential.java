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
@Table(name = "V_MD_BUSINESS_ESSENTIAL")
public class BusinessEssential implements Serializable {

	private static final long serialVersionUID = 6850005829893569522L;

	private Long businessEssentialId;
	private String businessEssentialName;
	private String businessEssentialNameGPSC;
	private Long businessEssentialCode;
	private String inherited_Y_N;

	private String insertQuelle;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public BusinessEssential() {
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
		return getBusinessEssentialId();
	}

	/**
	 * Returns the value of the field {@link #businessEssentialId}.
	 * 
	 * @return Value of the {@link #businessEssentialId} field.
	 */
	@Id
	@Column(name = "BUSINESS_ESSENTIAL_ID")
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}

	/**
	 * Sets the value of the {@link #businessEssentialId} field.
	 * 
	 * @param businessEssentialId
	 *            The value to set.
	 */
	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}

	@Transient
	public Boolean getInherited() 
	{
		if ("Y".equals(inherited_Y_N)) {
			return true;
		}
		return false;
	}
	/**
	 * Returns the value of the field {@link #businessEssentialName}.
	 * 
	 * @return Value of the {@link #businessEssentialName} field.
	 */
	@Column(name = "BUSINESS_ESSENTIAL_NAME")
	public String getBusinessEssentialName() {
		return businessEssentialName;
	}

	/**
	 * Sets the value of the {@link #businessEssentialName} field.
	 * 
	 * @param businessEssentialName
	 *            The value to set.
	 */
	public void setBusinessEssentialName(String businessEssentialName) {
		this.businessEssentialName = businessEssentialName;
	}

	/**
	 * Returns the value of the field {@link #businessEssentialNameGPSC}.
	 * 
	 * @return Value of the {@link #businessEssentialNameGPSC} field.
	 */
	@Column(name = "BUSINESS_ESSENTIAL_NAME_GPSC")
	public String getBusinessEssentialNameGPSC() {
		return businessEssentialNameGPSC;
	}

	/**
	 * Sets the value of the {@link #businessEssentialNameGPSC} field.
	 * 
	 * @param businessEssentialNameGPSC
	 *            The value to set.
	 */
	public void setBusinessEssentialNameGPSC(String businessEssentialNameGPSC) {
		this.businessEssentialNameGPSC = businessEssentialNameGPSC;
	}

	/**
	 * Returns the value of the field {@link #businessEssentialCode}.
	 * 
	 * @return Value of the {@link #businessEssentialCode} field.
	 */
	@Column(name = "BUSINESS_ESSENTIAL_CODE")
	public Long getBusinessEssentialCode() {
		return businessEssentialCode;
	}

	/**
	 * Sets the value of the {@link #businessEssentialCode} field.
	 * 
	 * @param businessEssentialCode
	 *            The value to set.
	 */
	public void setBusinessEssentialCode(Long businessEssentialCode) {
		this.businessEssentialCode = businessEssentialCode;
	}


	/**
	 * Returns the value of the field {@link #insertSource}.
	 * 
	 * @return Value of the {@link #insertSource} field.
	 */
	@Column(name = "INSERT_SOURCE")
	public String getInsertQuelle() {
		return insertQuelle;
	}
	/**
	 * Sets the value of the {@link #insertSource} field.
	 * 
	 * @param insertSource
	 *            The value to set.
	 */
	public void setInsertQuelle(String insertSource) {
		this.insertQuelle = insertSource;
	}

}
