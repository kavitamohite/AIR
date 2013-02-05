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
@Table(name = "V_MD_APPLICATION_CAT1")
public class ApplicationCat1 implements Serializable {

	private static final long serialVersionUID = 5606742662561150268L;
	
	
	private Long applicationCat1Id;

	private String applicationCat1Txt;
	
	private String applicationCat1En;
	
	private Long sort;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public ApplicationCat1() {
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
		return getApplicationCat1Id();
	}
	
	/**
	 * Returns the value of the field {@link #id}.
	 * 
	 * @return Value of the {@link #id} field.
	 */
	@Id
	@Column(name = "APPLICATION_CAT1_ID")
	public Long getApplicationCat1Id() {
		return applicationCat1Id;
	}

	/**
	 * Sets the value of the {@link #id} field.
	 * 
	 * @param id
	 *            The value to set.
	 */
	public void setApplicationCat1Id(Long applicationCat1Id) {
		this.applicationCat1Id = applicationCat1Id;
	}

	/**
	 * Returns the value of the field {@link #applicationCat1Txt}.
	 * 
	 * @return Value of the {@link #applicationCat1Txt} field.
	 */
	@Column(name = "APPLICATION_CAT1_TXT")
	public String getApplicationCat1Txt() {
		return applicationCat1Txt;
	}

	/**
	 * Sets the value of the {@link #applicationCat1Txt} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setApplicationCat1Txt(String applicationCat1Txt) {
		this.applicationCat1Txt = applicationCat1Txt;
	}

	/**
	 * Returns the value of the field {@link #applicationCat1En}.
	 * 
	 * @return Value of the {@link #applicationCat1En} field.
	 */
	@Column(name = "APPLICATION_CAT1_EN")
	public String getApplicationCat1En() {
		return applicationCat1En;
	}

	/**
	 * Sets the value of the {@link #applicationCat1En} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setApplicationCat1En(String applicationCat1En) {
		this.applicationCat1En = applicationCat1En;
	}

	/**
	 * Returns the value of the field {@link #sort}.
	 * 
	 * @return Value of the {@link #sort} field.
	 */
	@Column(name = "SORT")
	public Long getSort() {
		return sort;
	}

	/**
	 * Sets the value of the {@link #sort} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setSort(Long sort) {
		this.sort = sort;
	}


}
