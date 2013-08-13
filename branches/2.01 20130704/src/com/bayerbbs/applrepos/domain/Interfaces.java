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
@Table(name = "V_MD_INTERFACE")
public class Interfaces implements Serializable {
	private static final long serialVersionUID = -1269472619097704156L;

	private Long interfacesId;
	private String interfaceToken;
	private String interfaceName;
	private String sisecEditable;

	@Transient
	public Long getId() {
		return getInterfacesId();
	}

	@Id
	@Column(name = "INTERFACES_ID")
	public Long getInterfacesId() {
		return interfacesId;
	}
	public void setInterfacesId(Long interfacesId) {
		this.interfacesId = interfacesId;
	}

	@Column(name = "TOKEN")
	public String getInterfaceToken() {
		return interfaceToken;
	}
	public void setInterfaceToken(String interfaceToken) {
		this.interfaceToken = interfaceToken;
	}

	@Column(name = "INTERFACE_NAME")
	public String getInterfaceName() {
		return interfaceName;
	}
	public void setInterfaceName(String interfaceName) {
		this.interfaceName = interfaceName;
	}

	@Column(name = "SISEC_EDITABLE")
	public String getSisecEditable() {
		return sisecEditable;
	}
	public void setSisecEditable(String sisecEditable) {
		this.sisecEditable = sisecEditable;
	}
}