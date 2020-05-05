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
public class SeverityLevel implements Serializable {

	private static final long serialVersionUID = -1121903985201502247L;

//	private Long severityLevelId;
	//private String severityLevelName;
	private Long severityGPSC;
	private String gpscCode;
	private String usage;
	private Long beCode;
	
	private String insertQuelle;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public SeverityLevel() {
	}

	/*@Transient
	public Long getId() {
		return getSeverityLevelId();
	}*/
	
	/*@Id
	@Column(name = "SEVERITY_LEVEL_ID")
//	@Column(name = "SEVERITY_LEVEL_ID", insertable = false, updatable = false)
	public Long getSeverityLevelId() {
		return severityLevelId;
	}

	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}*/

	/*@Column(name = "SEVERITY_LEVEL")
	public String getSeverityLevelName() {
		return severityLevelName;
	}
	public void setSeverityLevelName(String severityLevelName) {
		this.severityLevelName = severityLevelName;
	}*/
	
	@Column(name = "SEVERITY_GPSC")
	public Long getSeverityGPSC() {
		return severityGPSC;
	}
	public void setSeverityGPSC(Long severityGPSC) {
		this.severityGPSC = severityGPSC;
	}
	
	@Column(name = "GPSC_CODE")
	public String getGpscCode() {
		return gpscCode;
	}
	public void setGpscCode(String gpscCode) {
		this.gpscCode = gpscCode;
	}

	@Column(name = "USAGE")
	public String getUsage() {
		return usage;
	}
	public void setUsage(String usage) {
		this.usage = usage;
	}

	@Column(name = "BE_CODE")
	public Long getBeCode() {
		return beCode;
	}
	public void setBeCode(Long beCode) {
		this.beCode = beCode;
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
