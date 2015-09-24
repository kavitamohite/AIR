package com.bayerbbs.applrepos.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

import com.bayerbbs.applrepos.common.BbsDateFormat;

@MappedSuperclass
public abstract class DeletableRevisionInfo extends RevisionInfo {
	private Timestamp deleteTimestamp;
	private String deleteQuelle;
	private String deleteUser;


	public DeletableRevisionInfo() {
	}
	

	@Transient
	public String getRevisionDeleteDisp() {
		return deleteTimestamp != null ? "D: " + deleteUser + "/"
				+ BbsDateFormat.getInstance().format(deleteTimestamp)
				: StringUtils.EMPTY;
	}


	@Column(name = "DEL_QUELLE")
	public String getDeleteQuelle() {
		return deleteQuelle;
	}


	@Column(name = "DEL_TIMESTAMP")
	public Timestamp getDeleteTimestamp() {
		return deleteTimestamp;
	}


	@Column(name = "DEL_USER")
	public String getDeleteUser() {
		return deleteUser;
	}


	public void setDeleteQuelle(String deleteQuelle) {
		this.deleteQuelle = deleteQuelle;
	}
	public void setDeleteTimestamp(Timestamp deleteTimestamp) {
		this.deleteTimestamp = deleteTimestamp;
	}
	public void setDeleteUser(String deleteUser) {
		this.deleteUser = deleteUser;
	}
}
