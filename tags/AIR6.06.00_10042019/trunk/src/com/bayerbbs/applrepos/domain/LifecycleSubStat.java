package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "LIFECYCLE_SUB_STAT")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "LifeCycleSubStatSeq", sequenceName = "TBADM.SEQ_LIFECYCLE_SUB_STAT")
public class LifecycleSubStat extends DeletableRevisionInfo implements Serializable{

	private static final long serialVersionUID = 1117308020887608278L;
	private Long id;// LC_SUB_STAT_ID NOT NULL NUMBER
	private String status;// LC_SUB_STAT_STATUS NOT NULL VARCHAR2(160)
	private String staten;// LC_SUB_STAT_STATEN VARCHAR2(160)
	private String text; // LC_SUB_STAT_TXT VARCHAR2(1020)
	private LifecycleStatus lifecycleStatus; // LC_STATUS_ID NOT NULL NUMBER
	private Long tableId; // TABELLE_ID NUMBER
	private Character active; // ACTIVE_Y_N VARCHAR2(1)
	private Long sort; // SORT NOT NULL NUMBER

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "LifeCycleSubStatSeq")
	@Column(name = "LC_SUB_STAT_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "LC_SUB_STAT_STATUS")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "LC_SUB_STAT_STATEN")
	public String getStaten() {
		return staten;
	}

	public void setStaten(String staten) {
		this.staten = staten;
	}

	@Column(name = "LC_SUB_STAT_TXT")
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LC_STATUS_ID")
	public LifecycleStatus getLifecycleStatus() {
		return lifecycleStatus;
	}

	public void setLifecycleStatus(LifecycleStatus lifecycleStatus) {
		this.lifecycleStatus = lifecycleStatus;
	}

	@Column(name = "TABELLE_ID")
	public Long getTableId() {
		return tableId;
	}

	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	@Type(type = "yes_no")
	@Column(name = "ACTIVE_Y_N")
	public Boolean getActive() {
		if (active == null)
			return null;
		return active == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setActive(Boolean active) {
		if (active == null) {
			this.active = null;
		} else {
			this.active = active == true ? 'Y' : 'N';
		}
	}

	@Column(name = "SORT")
	public Long getSort() {
		return sort;
	}

	public void setSort(Long sort) {
		this.sort = sort;
	}

}
