package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;

//nicht verwendbar, da Feld OS_GROUP des Views V_MD_OS ein Kategoriefeld ist, dem keine ID zugeordnet werden
//kann.
@Immutable
@Entity
@Table(name = "V_MD_OS")
public class OsType implements Serializable {
	private static final long serialVersionUID = 8478160996489779518L;

	private String name;
	private Integer ciSubType;

	@Column(name = "OS_GROUP")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "HW_IDENT_OR_TRANS")
	public Integer getCiSubType() {
		return ciSubType;
	}
	public void setCiSubType(Integer ciSubType) {
		this.ciSubType = ciSubType;
	}
}