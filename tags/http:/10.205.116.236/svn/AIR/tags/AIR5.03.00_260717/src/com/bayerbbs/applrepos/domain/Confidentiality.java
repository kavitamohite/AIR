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
@Table(name = "CONFIDENTIALITY")
public class Confidentiality implements Serializable {

	private static final long serialVersionUID = 4738538509135553887L;


	private Long confidentialityId;
	private String confidentialityName;
	private String confidentialityNameEn;
	
	private String delQuelle;
	
	private Long sort;
	
	@Transient
	public Long getId() {
		return getConfidentialityId();
	}
	
	@Id
	@Column(name = "CONFIDENTIALITY_ID")
	public Long getConfidentialityId() {
		return confidentialityId;
	}
	public void setConfidentialityId(Long confidentialityId) {
		this.confidentialityId = confidentialityId;
	}

	@Column(name = "CONFIDENTIALITY_NAME")
	public String getConfidentialityName() {
		return confidentialityName;
	}
	public void setConfidentialityName(String confidentialityName) {
		this.confidentialityName = confidentialityName;
	}

	@Column(name = "CONFIDENTIALITY_NAME_EN")
	public String getConfidentialityNameEn() {
		return confidentialityNameEn;
	}
	public void setConfidentialityNameEn(String confidentialityNameEn) {
		this.confidentialityNameEn = confidentialityNameEn;
	}

	
	@Column(name = "DEL_QUELLE")
	public String getDelQuelle() {
		return delQuelle;
	}
	public void setDelQuelle(String delQuelle) {
		this.delQuelle = delQuelle;
	}

	@Column(name = "SORT")
	public Long getSort() {
		return sort;
	}
	public void setSort(Long sort) {
		this.sort = sort;
	}

}
