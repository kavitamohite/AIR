package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "INTERFACES")
public class Interfaces implements Serializable {

	private static final long serialVersionUID = -1269472619097704156L;

	private Long interfacesId;
	private String interfaceToken;
	private String interfaceName;
	private String sisecEditable;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public Interfaces() {
	}

	// ------------------------------------------------------
	// hibernate get / set
	// ------------------------------------------------------

	/**
	 * Returns the value of the field {@link #id}.
	 * 
	 * @return Value of the {@link #id} field.
	 */
	@Transient
	public Long getId() {
		return getInterfacesId();
	}

	/**
	 * Returns the value of the field {@link #interfacesId}.
	 * 
	 * @return Value of the {@link #interfacesId} field.
	 */
	@Id
	@Column(name = "INTERFACES_ID")
	public Long getInterfacesId() {
		return interfacesId;
	}

	/**
	 * Sets the value of the {@link #interfacesId} field.
	 * 
	 * @param interfacesId
	 *            The value to set.
	 */
	public void setInterfacesId(Long interfacesId) {
		this.interfacesId = interfacesId;
	}

	/**
	 * Returns the value of the field {@link #interfaceToken}.
	 * 
	 * @return Value of the {@link #interfaceToken} field.
	 */
	@Column(name = "TOKEN")
	public String getInterfaceToken() {
		return interfaceToken;
	}

	/**
	 * Sets the value of the {@link #interfaceToken} field.
	 * 
	 * @param interfaceToken
	 *            The value to set.
	 */
	public void setInterfaceToken(String interfaceToken) {
		this.interfaceToken = interfaceToken;
	}

	/**
	 * Returns the value of the field {@link #interfaceName}.
	 * 
	 * @return Value of the {@link #interfaceName} field.
	 */
	@Column(name = "INTERFACE_NAME")
	public String getInterfaceName() {
		return interfaceName;
	}

	/**
	 * Sets the value of the {@link #interfaceName} field.
	 * 
	 * @param interfaceName
	 *            The value to set.
	 */
	public void setInterfaceName(String interfaceName) {
		this.interfaceName = interfaceName;
	}

	/**
	 * Returns the value of the field {@link #sisecEditable}.
	 * 
	 * @return Value of the {@link #sisecEditable} field.
	 */
	@Column(name = "SISEC_EDITABLE")
	public String getSisecEditable() {
		return sisecEditable;
	}

	/**
	 * Sets the value of the {@link #sisecEditable} field.
	 * 
	 * @param sisecEditable
	 *            The value to set.
	 */
	public void setSisecEditable(String sisecEditable) {
		this.sisecEditable = sisecEditable;
	}

}
