package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * Represents one ItSet / ITSEC_IT_VERBUND
 */
@Entity
@Table(name = "ITSEC_IT_VERBUND")
public class ItSet implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 761282130329716952L;



	private Long id;

	private String itSetName;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public ItSet() {
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
	@Column(name = "GSTOOL_ZOB_ID")
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
	@Column(name = "IT_VERBUND_NAME")
	public String getItSetName() {
		return itSetName;
	}

	/**
	 * Sets the value of the {@link #itSetName} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setItSetName(String itSetName) {
		this.itSetName = itSetName;
	}

}
