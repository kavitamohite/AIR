package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "LAND")
@NamedQueries(
	@NamedQuery(name="findAllLand", query="from Land")
)
public class Land implements Comparable<Land> {//extends RevisionInfo {
	private Long id;
	private String name;
	private String nameEn;
	
	private Integer itSetId;
	private String locale;
	
	public Land() {}
	
	@Id
	@Column(name = "LAND_ID")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "LAND_NAME")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "LAND_NAME_EN")
	public String getNameEn() {
		return nameEn;
	}
	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}
	
	@Column(name = "ITSET")
	public Integer getItSetId() {
		return itSetId;
	}
	public void setItSetId(Integer itSetId) {
		this.itSetId = itSetId;
	}
	
	@Column(name = "LAND_KENNZEICHEN")
	public String getLocale() {
		return locale;
	}
	public void setLocale(String locale) {
		this.locale = locale;
	}

	@Override
	public int compareTo(Land other) {
		return name.compareTo(other.getName());
	}
}