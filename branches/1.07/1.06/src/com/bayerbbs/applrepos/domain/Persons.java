package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "PERSONS")
public class Persons extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -5657570461268334451L;
	
	private Long personId;
	private String cwid;
	private String persNr;
	private String lastname;
	private String firstname;
	
	private String inactive;	// inactive Y/N (or null)
	private String pstat;		// "PRIMARY CWID", "SECONDARDY CWID", "MACHINE CWID"
	
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public Persons() {
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
		return getPersonId();
	}

	/**
	 * Returns the value of the field {@link #personId}.
	 * 
	 * @return Value of the {@link #personId} field.
	 */
	@Id
	@Column(name = "PERSON_ID")
	public Long getPersonId() {
		return personId;
	}

	/**
	 * Sets the value of the {@link #personId} field.
	 * 
	 * @param personId
	 *            The value to set.
	 */
	public void setPersonId(Long personId) {
		this.personId = personId;
	}
	
	/**
	 * Returns the value of the field {@link #cwid}.
	 * 
	 * @return Value of the {@link #cwid} field.
	 */
	@Column(name = "CWID")
	public String getCwid() {
		return cwid;
	}

	/**
	 * Sets the value of the {@link #cwid} field.
	 * 
	 * @param cwid
	 *            The value to set.
	 */
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

	/**
	 * Returns the value of the field {@link #persNr}.
	 * 
	 * @return Value of the {@link #persNr} field.
	 */
	@Column(name = "PERS_NR")
	public String getPersNr() {
		return persNr;
	}

	/**
	 * Sets the value of the {@link #persNr} field.
	 * 
	 * @param persNr
	 *            The value to set.
	 */
	public void setPersNr(String persNr) {
		this.persNr = persNr;
	}
	
	/**
	 * Returns the value of the field {@link #lastname}.
	 * 
	 * @return Value of the {@link #lastname} field.
	 */
	@Column(name = "NACHNAME")
	public String getLastname() {
		return lastname;
	}

	/**
	 * Sets the value of the {@link #lastname} field.
	 * 
	 * @param lastname
	 *            The value to set.
	 */
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	/**
	 * Returns the value of the field {@link #firstname}.
	 * 
	 * @return Value of the {@link #firstname} field.
	 */
	@Column(name = "VORNAME")
	public String getFirstname() {
		return firstname;
	}

	/**
	 * Sets the value of the {@link #firstname} field.
	 * 
	 * @param firstname
	 *            The value to set.
	 */
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	/**
	 * Returns the value of the field {@link #inactive}.
	 * 
	 * @return Value of the {@link #inactive} field.
	 */
	@Column(name = "INACTIVE")
	public String getInactive() {
		return inactive;
	}

	/**
	 * Sets the value of the {@link #inactive} field.
	 * 
	 * @param inactive
	 *            The value to set.
	 */
	public void setInactive(String inactive) {
		this.inactive = inactive;
	}

	/**
	 * Returns the value of the field {@link #pstat}.
	 * 
	 * @return Value of the {@link #pstat} field.
	 */
	@Column(name = "PSTAT")
	public String getPstat() {
		return pstat;
	}

	/**
	 * Sets the value of the {@link #pstat} field.
	 * 
	 * @param pstat
	 *            The value to set.
	 */
	public void setPstat(String pstat) {
		this.pstat = pstat;
	}

}
