package com.bayerbbs.applrepos.domain;


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
public abstract class RevisionInfo {
	private Timestamp insertTimestamp;
	private String insertQuelle;
	private String insertUser;
	private Timestamp updateTimestamp;
	private String updateQuelle;
	private String updateUser;


	public RevisionInfo() {
	}


	@Transient
	public String getRevisionInsertDisp() {
		if (insertUser == null)
			return insertUser;

		return "I: " + insertUser + "/"	+ BbsDateFormat.getInstance().format(insertTimestamp);
	}

	@Transient
	public String getRevisionUpdateDisp() {
		if (updateUser == null)
			return StringUtils.EMPTY;

		return "U: " + updateUser + "/"	+ BbsDateFormat.getInstance().format(updateTimestamp);
	}

	@Column(name = "INSERT_QUELLE")
	public String getInsertQuelle() {
		return insertQuelle;
	}


	@Column(name = "INSERT_TIMESTAMP")
	public Timestamp getInsertTimestamp() {
		return insertTimestamp;
	}

	@Column(name = "INSERT_USER")
	public String getInsertUser() {
		return insertUser;
	}

	@Column(name = "UPDATE_QUELLE")
	public String getUpdateQuelle() {
		return updateQuelle;
	}

	@Column(name = "UPDATE_TIMESTAMP")
	public Timestamp getUpdateTimestamp() {
		return updateTimestamp;
	}

	@Column(name = "UPDATE_USER")
	public String getUpdateUser() {
		return updateUser;
	}

	public void setInsertQuelle(String insertQuelle) {
		this.insertQuelle = insertQuelle;
	}

	public void setInsertTimestamp(Timestamp insertTimestamp) {
		this.insertTimestamp = insertTimestamp;
	}

	public void setInsertUser(String insertUser) {
		this.insertUser = insertUser;
	}

	public void setUpdateQuelle(String updateQuelle) {
		this.updateQuelle = updateQuelle;
	}

	public void setUpdateTimestamp(Timestamp updateTimestamp) {
		this.updateTimestamp = updateTimestamp;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
}