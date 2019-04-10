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
@Table(name = "V_MD_PRIMARY_FUNCTION")
public class PrimaryFunction implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -73964249142361340L;

	private Long primaryFunctionId;
	private String primaryFunctionName;
	private String description;
	private Long tableId;
	private String insertSource;
	
	PrimaryFunction(){
	}
	@Transient
	public Long getId() {
		return getPrimaryFunctionId();
	}
	@Id
	@Column(name = "PRIMARY_FUNCTION_ID")
	public Long getPrimaryFunctionId() {
		return primaryFunctionId;
	}

	public void setPrimaryFunctionId(Long primaryFunctionId) {
		this.primaryFunctionId = primaryFunctionId;
	}
	@Column(name = "PRIMARY_FUNCTION_NAME")
	public String getPrimaryFunctionName() {
		return primaryFunctionName;
	}

	public void setPrimaryFunctionName(String primaryFunctionName) {
		this.primaryFunctionName = primaryFunctionName;
	}

	@Column(name = "DESCRIPTION")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "TABLE_ID")
	public Long getTableId() {
		return tableId;
	}

	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	@Column(name = "INSERT_SOURCE")
	public String getInsertSource() {
		return insertSource;
	}

	public void setInsertSource(String insertSource) {
		this.insertSource = insertSource;
	}
}
