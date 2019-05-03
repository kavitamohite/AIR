package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "GAP_CLASS")
public class GapClass implements Serializable {

	private static final long serialVersionUID = -3989621753131447982L;

	private Long gapPriority;
	private String gapClassTextDE;
	private String gapClassTextEN;
	
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public GapClass() {
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
		return getGapPriority();
	}

	/**
	 * Returns the value of the field {@link #gapPriority}.
	 * 
	 * @return Value of the {@link #gapPriority} field.
	 */
	@Id
	@Column(name = "GAP_PRIORITY")
	public Long getGapPriority() {
		return gapPriority;
	}

	/**
	 * Sets the value of the {@link #gapPriority} field.
	 * 
	 * @param gapPriority
	 *            The value to set.
	 */
	public void setGapPriority(Long gapPriority) {
		this.gapPriority = gapPriority;
	}

	/**
	 * Returns the value of the field {@link #gapClassTextDE}.
	 * 
	 * @return Value of the {@link #gapClassTextDE} field.
	 */
	@Column(name = "GAP_CLASS_TEXT_DE")
	public String getGapClassTextDE() {
		return gapClassTextDE;
	}

	/**
	 * Sets the value of the {@link #gapClassTextDE} field.
	 * 
	 * @param gapClassTextDE
	 *            The value to set.
	 */
	public void setGapClassTextDE(String gapClassTextDE) {
		this.gapClassTextDE = gapClassTextDE;
	}

	/**
	 * Returns the value of the field {@link #gapClassTextEN}.
	 * 
	 * @return Value of the {@link #gapClassTextEN} field.
	 */
	@Column(name = "GAP_CLASS_TEXT_EN")
	public String getGapClassTextEN() {
		return gapClassTextEN;
	}

	/**
	 * Sets the value of the {@link #gapClassTextEN} field.
	 * 
	 * @param gapClassTextEN
	 *            The value to set.
	 */
	public void setGapClassTextEN(String gapClassTextEN) {
		this.gapClassTextEN = gapClassTextEN;
	}
	
}
