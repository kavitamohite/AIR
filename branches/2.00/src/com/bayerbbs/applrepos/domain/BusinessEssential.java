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
@Table(name = "V_MD_SEVERITY_LEVEL")
public class BusinessEssential implements Serializable {

	private static final long serialVersionUID = 6850005829893569522L;

	private Long severityLevelId;
	private String severityLevel;
	private Long severityGPSC;
	private String usage;
	private Long beCode;

	
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
		return getSeverityLevelId();
	}

	/**
	 * Returns the value of the field {@link #severityLevelId}.
	 * 
	 * @return Value of the {@link #severityLevelId} field.
	 */
	@Id
	@Column(name = "SEVERITY_LEVEL_ID")
	public Long getSeverityLevelId() {
		return severityLevelId;
	}

	/**
	 * Sets the value of the {@link #severityLevelId} field.
	 * 
	 * @param severityLevelId
	 *            The value to set.
	 */
	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}

	@Transient
	public Boolean getInherited() 
	{
		switch (this.beCode.intValue())
		{
		case 2:			// BE_Code 2: inherited: Business Essential
		case 4:			// BE_Code 4: inherited: Pandemic Business Essential
			return true;
		default:
			return false;
		}
	}
	/**
	 * Returns the value of the field {@link #severityLevel}.
	 * 
	 * @return Value of the {@link #severityLevel} field.
	 */
	@Column(name = "SEVERITY_LEVEL")
	public String getSeverityLevel() {
		return severityLevel;
	}

	/**
	 * Sets the value of the {@link #severityLevel} field.
	 * 
	 * @param severityLevel
	 *            The value to set.
	 */
	public void setSeverityLevel(String severityLevel) {
		this.severityLevel = severityLevel;
	}

	/**
	 * Returns the value of the field {@link #severityGPSC}.
	 * 
	 * @return Value of the {@link #severityGPSC} field.
	 */
	@Column(name = "SEVERITY_GPSC")
	public Long getSeverityGPSC() {
		return severityGPSC;
	}

	/**
	 * Sets the value of the {@link #severityGPSC} field.
	 * 
	 * @param severityGPSC
	 *            The value to set.
	 */
	public void setSeverityGPSC(Long severityGPSC) {
		this.severityGPSC = severityGPSC;
	}

	/**
	 * Returns the value of the field {@link #usage}.
	 * 
	 * @return Value of the {@link #usage} field.
	 */
	@Column(name = "USAGE")
	public String getUsage() {
		return usage;
	}

	/**
	 * Sets the value of the {@link #usage} field.
	 * 
	 * @param usage
	 *            The value to set.
	 */
	public void setUsage(String usage) {
		this.usage = usage;
	}
	
	/**
	 * Returns the value of the field {@link #beCode}.
	 * 
	 * @return Value of the {@link #beCode} field.
	 */
	@Column(name = "BE_CODE")
	public Long getBeCode() {
		return beCode;
	}

	/**
	 * Sets the value of the {@link #beCode} field.
	 * 
	 * @param beCode
	 *            The value to set.
	 */
	public void setBeCode(Long beCode) {
		this.beCode = beCode;
	}

	private String insertQuelle;

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
