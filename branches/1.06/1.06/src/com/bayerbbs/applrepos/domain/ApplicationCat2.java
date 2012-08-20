package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ANWENDUNG_KAT2")
public class ApplicationCat2 implements Serializable {

	// ------------------------------------------------------
	// private
	// ------------------------------------------------------

	/** serial id */
	private static final long serialVersionUID = -2410206992724504924L;

	private Long id;

	private String anwendungKat2Text;
	
	private Long sort;
	
	private Long anwendungKat1Id;

	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public ApplicationCat2() {
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
	@Column(name = "ANWENDUNG_KAT2_ID")
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
	 * Returns the value of the field {@link #anwendungKat2Text}.
	 * 
	 * @return Value of the {@link #anwendungKat2Text} field.
	 */
	@Column(name = "ANWENDUNG_KAT2_TXT")
	public String getAnwendungKat2Text() {
		return anwendungKat2Text;
	}

	/**
	 * Sets the value of the {@link #anwendungKat2Text} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setAnwendungKat2Text(String anwendungKat2Text) {
		this.anwendungKat2Text = anwendungKat2Text;
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
	
	/**
	 * Returns the value of the field {@link #anwendungKat1Id}.
	 * 
	 * @return Value of the {@link #anwendungKat1Id} field.
	 */
	@Column(name = "ANWENDUNG_KAT1_ID")
	public Long getAnwendungKat1Id() {
		return anwendungKat1Id;
	}

	/**
	 * Sets the value of the {@link #anwendungKat1Id} field.
	 * 
	 * @param name
	 *            The value to set.
	 */
	public void setAnwendungKat1Id(Long anwendungKat1Id) {
		this.anwendungKat1Id = anwendungKat1Id;
	}


}
