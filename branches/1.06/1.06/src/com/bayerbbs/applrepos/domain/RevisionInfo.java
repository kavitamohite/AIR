package com.bayerbbs.applrepos.domain;

/*
 * Class:   RevisionInfo.java
 */
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

import com.bayerbbs.applrepos.common.BbsDateFormat;

/**
 * Represents an object which changes are going to be recorded Timestamp, user
 * and source infos will be stored
 */
@MappedSuperclass
public class RevisionInfo {

	// --------------------------------------
	// members
	// --------------------------------------

	private Timestamp insertTimestamp;

	private String insertQuelle;

	private String insertUser;

	private Timestamp updateTimestamp;

	private String updateQuelle;

	private String updateUser;

	// --------------------------------------
	// .ctor
	// --------------------------------------

	/**
	 * Creates a new instance.
	 */
	public RevisionInfo() {
	}

	// --------------------------------------
	// public
	// --------------------------------------

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

	/**
	 * The revisioninfos as display string
	 * 
	 * @return updateinfo as String
	 */
	@Transient
	public String getRevisionUpdateDisp() {
		if (updateUser == null)
			return StringUtils.EMPTY;

		return "U: " + updateUser + "/"
				+ BbsDateFormat.getInstance().format(updateTimestamp);
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
	 * Returns the value of the field {@link #updateQuelle}.
	 * 
	 * @return Value of the {@link #updateQuelle} field.
	 */
	@Column(name = "UPDATE_QUELLE")
	public String getUpdateQuelle() {
		return updateQuelle;
	}

	/**
	 * Returns the value of the field {@link #updateTimestamp}.
	 * 
	 * @return Value of the {@link #updateTimestamp} field.
	 */
	@Column(name = "UPDATE_TIMESTAMP")
	public Timestamp getUpdateTimestamp() {
		return updateTimestamp;
	}

	/**
	 * Returns the value of the field {@link #updateUser}.
	 * 
	 * @return Value of the {@link #updateUser} field.
	 */
	@Column(name = "UPDATE_USER")
	public String getUpdateUser() {
		return updateUser;
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

	/**
	 * Sets the value of the {@link #updateQuelle} field.
	 * 
	 * @param updateQuelle
	 *            The value to set.
	 */
	public void setUpdateQuelle(String updateQuelle) {
		this.updateQuelle = updateQuelle;
	}

	/**
	 * Sets the value of the {@link #updateTimestamp} field.
	 * 
	 * @param updateTimestamp
	 *            The value to set.
	 */
	public void setUpdateTimestamp(Timestamp updateTimestamp) {
		this.updateTimestamp = updateTimestamp;
	}

	/**
	 * Sets the value of the {@link #updateUser} field.
	 * 
	 * @param updateUser
	 *            The value to set.
	 */
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

}

