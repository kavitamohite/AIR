package com.bayerbbs.applrepos.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

import com.bayerbbs.applrepos.common.BbsDateFormat;

@MappedSuperclass
public class DeletableRevisionInfo extends RevisionInfo {
	private Timestamp deleteTimestamp;

	private String deleteQuelle;

	private String deleteUser;

	/**
	 * Creates a new instance.
	 */
	public DeletableRevisionInfo() {
	}
	
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
}
