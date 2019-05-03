package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

import com.bayerbbs.applrepos.common.BbsDateFormat;

@Entity
@Table(name = "SEVERITY_LEVEL")
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

	
	private Timestamp deleteTimestamp;

	private String deleteQuelle;

	private String deleteUser;

	/**
	 * The revisioninfos as display string
	 * 
	 * @return deleteinfo as String
	 */
	@Transient
	public String getRevisionDeleteDisp() {

		return deleteTimestamp != null ? "D: " + deleteUser + "/"
				+ BbsDateFormat.getInstance().format(deleteTimestamp)
				: StringUtils.EMPTY;
	}

	/**
	 * Returns the value of the field {@link #deleteQuelle}.
	 * 
	 * @return Value of the {@link #deleteQuelle} field.
	 */
	@Column(name = "DEL_QUELLE")
	public String getDeleteQuelle() {
		return deleteQuelle;
	}

	/**
	 * Returns the value of the field {@link #deleteTimestamp}.
	 * 
	 * @return Value of the {@link #deleteTimestamp} field.
	 */
	@Column(name = "DEL_TIMESTAMP")
	public Timestamp getDeleteTimestamp() {
		return deleteTimestamp;
	}

	/**
	 * Returns the value of the field {@link #deleteUser}.
	 * 
	 * @return Value of the {@link #deleteUser} field.
	 */
	@Column(name = "DEL_USER")
	public String getDeleteUser() {
		return deleteUser;
	}

	/**
	 * Sets the value of the {@link #deleteQuelle} field.
	 * 
	 * @param deleteQuelle
	 *            The value to set.
	 */
	public void setDeleteQuelle(String deleteQuelle) {
		this.deleteQuelle = deleteQuelle;
	}

	/**
	 * Sets the value of the {@link #deleteTimestamp} field.
	 * 
	 * @param deleteTimestamp
	 *            The value to set.
	 */
	public void setDeleteTimestamp(Timestamp deleteTimestamp) {
		this.deleteTimestamp = deleteTimestamp;
	}

	/**
	 * Sets the value of the {@link #deleteUser} field.
	 * 
	 * @param deleteUser
	 *            The value to set.
	 */
	public void setDeleteUser(String deleteUser) {
		this.deleteUser = deleteUser;
	}

	private Timestamp insertTimestamp;

	private String insertQuelle;

	private String insertUser;

	/**
	 * The revisioninfos as display string
	 * 
	 * @return insertinfo as String
	 */
	@Transient
	public String getRevisionInsertDisp() {

		if (insertUser == null)
			return insertUser;

		return "I: " + insertUser + "/"
				+ BbsDateFormat.getInstance().format(insertTimestamp);
	}

	// --------------------------------------
	// hibernate get / set
	// --------------------------------------

	/**
	 * Returns the value of the field {@link #insertQuelle}.
	 * 
	 * @return Value of the {@link #insertQuelle} field.
	 */
	@Column(name = "INSERT_QUELLE")
	public String getInsertQuelle() {
		return insertQuelle;
	}

	/**
	 * Returns the value of the field {@link #insertTimestamp}.
	 * 
	 * @return Value of the {@link #insertTimestamp} field.
	 */
	@Column(name = "INSERT_TIMESTAMP")
	public Timestamp getInsertTimestamp() {
		return insertTimestamp;
	}

	/**
	 * Returns the value of the field {@link #insertUser}.
	 * 
	 * @return Value of the {@link #insertUser} field.
	 */
	@Column(name = "INSERT_USER")
	public String getInsertUser() {
		return insertUser;
	}


	/**
	 * Sets the value of the {@link #insertQuelle} field.
	 * 
	 * @param insertQuelle
	 *            The value to set.
	 */
	public void setInsertQuelle(String insertQuelle) {
		this.insertQuelle = insertQuelle;
	}

	/**
	 * Sets the value of the {@link #insertTimestamp} field.
	 * 
	 * @param insertTimestamp
	 *            The value to set.
	 */
	public void setInsertTimestamp(Timestamp insertTimestamp) {
		this.insertTimestamp = insertTimestamp;
	}

	/**
	 * Sets the value of the {@link #insertUser} field.
	 * 
	 * @param insertUser
	 *            The value to set.
	 */
	public void setInsertUser(String insertUser) {
		this.insertUser = insertUser;
	}

}
