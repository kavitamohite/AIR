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
@Table(name = "V_MD_LIFECYCLE")
public class Lifecycle implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2566836701881963478L;

	private Long lcStatusId;
	private String lcStatus;
	private String lcStatusTxt;
	private String lcStatusEn;
	private String lcStatusInsertSource;
	private Long lcSubStatId;
	private String lcSubStatStatus;
	private String lcSubStatStatEn;
	private String lcSubStatTxt;
	private String active;
	private String sort;
	private String lifecycleStatus;
	private String lcSubstatusInsertSource;
	private Long tableId;
	private String tableName;
		
	public Lifecycle(){
	}
	@Transient
	public Long getId() {
		return getLcSubStatId();
	}
	@Id
	@Column(name = "LC_SUB_STAT_ID", unique = true, nullable = false)
	public Long getLcSubStatId() {
		return lcSubStatId;
	}
	public void setLcSubStatId(Long lcSubStatId) {
		this.lcSubStatId = lcSubStatId;
	}
	@Column(name = "LC_STATUS_ID", nullable = false)
	public void setLcStatusId(Long lcStatusId) {
		this.lcStatusId = lcStatusId;
	}
	public Long getLcStatusId() {
		return lcStatusId;
	}
	@Column(name = "LC_STATUS")
	public void setLcStatus(String lcStatus) {
		this.lcStatus = lcStatus;
	}
	public String getLcStatus() {
		return lcStatus;
	}
	@Column(name = "LC_STATUS_TXT")
	public void setLcStatusTxt(String lcStatusTxt) {
		this.lcStatusTxt = lcStatusTxt;
	}
	public String getLcStatusTxt() {
		return lcStatusTxt;
	}
	@Column(name = "LC_STATUS_EN")
	public void setLcStatusEn(String lcStatusEn) {
		this.lcStatusEn = lcStatusEn;
	}
	public String getLcStatusEn() {
		return lcStatusEn;
	}
	@Column(name = "LC_STATUS_INSERT_SOURCE")
	public void setLcStatusInsertSource(String lcStatusInsertSource) {
		this.lcStatusInsertSource = lcStatusInsertSource;
	}
	public String getLcStatusInsertSource() {
		return lcStatusInsertSource;
	}
	@Column(name = "LC_SUB_STAT_STATUS")
	public void setLcSubStatStatus(String lcSubStatStatus) {
		this.lcSubStatStatus = lcSubStatStatus;
	}
	public String getLcSubStatStatus() {
		return lcSubStatStatus;
	}
	@Column(name = "LC_SUB_STAT_STATEN")
	public void setLcSubStatStatEn(String lcSubStatStatEn) {
		this.lcSubStatStatEn = lcSubStatStatEn;
	}
	public String getLcSubStatStatEn() {
		return lcSubStatStatEn;
	}
	@Column(name = "LC_SUB_STAT_TXT")
	public void setLcSubStatTxt(String lcSubStatTxt) {
		this.lcSubStatTxt = lcSubStatTxt;
	}
	public String getLcSubStatTxt() {
		return lcSubStatTxt;
	}
	@Column(name = "ACTIVE_Y_N")
	public void setActive(String active) {
		this.active = active;
	}
	public String getActive() {
		return active;
	}
	@Column(name = "SORT")
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getSort() {
		return sort;
	}
	@Column(name = "LIFECYCLE_STATUS")
	public void setLifecycleStatus(String lifecycleStatus) {
		this.lifecycleStatus = lifecycleStatus;
	}
	public String getLifecycleStatus() {
		return lifecycleStatus;
	}
	@Column(name = "LC_SUBSTATUS_INSERT_SOURCE")
	public void setLcSubstatusInsertSource(String lcSubstatusInsertSource) {
		this.lcSubstatusInsertSource = lcSubstatusInsertSource;
	}
	public String getLcSubstatusInsertSource() {
		return lcSubstatusInsertSource;
	}
	@Column(name = "TABLE_ID")
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}
	public Long getTableId() {
		return tableId;
	}
	@Column(name = "TABLE_NAME")
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getTableName() {
		return tableName;
	}
}
