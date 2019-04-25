package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Represents one ItSecGroup
 */
@Entity
@Table(name = "ITSEC_GRUPPE")
public class ItSecGroup implements Serializable {

	// ------------------------------------------------------
	// private
	// ------------------------------------------------------

	/** serial id */
	private static final long serialVersionUID = -2410206992724504924L;

	private Long id;

	private String name;
	
	private Long sort;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public ItSecGroup() {
	}

	// ------------------------------------------------------
	// hibernate get / set
	// ------------------------------------------------------

	/**
	 * Returns the value of the field {@link #id}.
	 * 
	 * @return Value of the {@link #id} field.
	 */
	@Id
	@Column(name = "ITSEC_GRP_GSTOOLID")
	public Long getId() {
		return id;
	}

	/**
	 * Sets the value of the {@link #id} field.
	 * 
	 * @param id
	 *            The value to set.
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Returns the value of the field {@link #name}.
	 * 
	 * @return Value of the {@link #name} field.
	 */
	@Column(name = "ITSEC_GRUPPE")
	public String getName() {
		return name;
	}

	/**
	 * Sets the value of the {@link #name} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Returns the value of the field {@link #sort}.
	 * @return
	 */
	@Column(name = "SORT")
	public Long getSort() {
		return sort;
	}

	/**
	 * Sets the value of the {@link #sort} field.
	 * 
	 * @param sort
	 *            The value to set.
	 */
	public void setSort(Long sort) {
		this.sort = sort;
	}

}
