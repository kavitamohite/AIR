package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.NaturalId;


@Immutable
@Entity
@Table(name = "V_MD_SEVERITY_LEVEL")

public class SeverityLevel extends DeletableRevisionInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 168789052260094674L;

	/**
	 * 
	 */
	public SeverityLevel() {
		super();
	}
	@Id
	@Column(name = "SEVERITY_LEVEL_ID", insertable = false, updatable = false)
	public Long getId() {
		return this.id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	private Long id;
	
	@NaturalId
	@Column(name = "SEVERITY_LEVEL")
	public String getSeverityLevel() {
		return severityLevel;
	}
	public void setSeverityLevel(String severityLevel) {
		this.severityLevel = severityLevel;
	}
	private String severityLevel;
}
