package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "IT_SYSTEM")
public class ItSystem extends DeletableRevisionInfo implements Serializable {


	private static final long serialVersionUID = -9152390693208339445L;
	private Long itSystemId;
	private String itSystemName;
	private String alias;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public ItSystem() {
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
		return getItSystemId();
	}

	/**
	 * Returns the value of the field {@link #itSystemId}.
	 * 
	 * @return Value of the {@link #itSystemId} field.
	 */
	@Id
	@Column(name = "IT_SYSTEM_ID")
	public Long getItSystemId() {
		return itSystemId;
	}

	/**
	 * Sets the value of the {@link #itSystemId} field.
	 * 
	 * @param itSystemId
	 *            The value to set.
	 */
	public void setItSystemId(Long itSystemId) {
		this.itSystemId = itSystemId;
	}

	/**
	 * Returns the value of the field {@link #itSystemName}.
	 * 
	 * @return Value of the {@link #itSystemName} field.
	 */
	@Column(name = "IT_SYSTEM_NAME")
	public String getItSystemName() {
		return itSystemName;
	}

	/**
	 * Sets the value of the {@link #itSystemName} field.
	 * 
	 * @param itSystemName
	 *            The value to set.
	 */
	public void setItSystemName(String itSystemName) {
		this.itSystemName = itSystemName;
	}

	/**
	 * Returns the value of the field {@link #alias}.
	 * 
	 * @return Value of the {@link #alias} field.
	 */
	@Column(name = "ALIAS")
	public String getAlias() {
		return alias;
	}

	/**
	 * Sets the value of the {@link #alias} field.
	 * 
	 * @param alias
	 *            The value to set.
	 */
	public void setAlias(String alias) {
		this.alias = alias;
	}

}
