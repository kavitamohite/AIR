package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Type;

@Immutable
@Entity
@Table(name = "V_MD_PERSON")
public class Person implements Serializable {

	private static final long serialVersionUID = -5657570461268334451L;
	
	private Long personId;
	private String cwid;
	private String personNo;
	private String lastName;
	private String firstName;
	private String mail;		// the internet email address
	
	private Boolean inactive;	// inactive Y/N (or null)
	private String pstat;		// "PRIMARY CWID", "SECONDARDY CWID", "MACHINE CWID"
	
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public Person() {
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
	public String getId() {
		return getCwid();
	}

	/**
	 * Returns the value of the field {@link #personId}.
	 * 
	 * @return Value of the {@link #personId} field.
	 */
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
	@Id
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
	 * Returns the value of the field {@link #personNo}.
	 * 
	 * @return Value of the {@link #personNo} field.
	 */
	@Column(name = "PERSON_NO")
	public String getPersNr() {
		return personNo;
	}

	/**
	 * Sets the value of the {@link #personNo} field.
	 * 
	 * @param persNr
	 *            The value to set.
	 */
	public void setPersNr(String personNo) {
		this.personNo = personNo;
	}
	
	/**
	 * Returns the value of the field {@link #lastName}.
	 * 
	 * @return Value of the {@link #lastName} field.
	 */
	@Column(name = "LASTNAME")
	public String getLastname() {
		return lastName;
	}

	/**
	 * Sets the value of the {@link #lastName} field.
	 * 
	 * @param lastname
	 *            The value to set.
	 */
	public void setLastname(String lastname) {
		this.lastName = lastname;
	}

	/**
	 * Returns the value of the field {@link #firstName}.
	 * 
	 * @return Value of the {@link #firstName} field.
	 */
	@Column(name = "FIRST_NAME")
	public String getFirstname() {
		return firstName;
	}

	/**
	 * Sets the value of the {@link #firstName} field.
	 * 
	 * @param firstname
	 *            The value to set.
	 */
	public void setFirstname(String firstname) {
		this.firstName = firstname;
	}

	/**
	 * Returns the value of the field {@link #inactive}.
	 * 
	 * @return Value of the {@link #inactive} field.
	 */
	@Type(type="yes_no")
	@Column(name = "INACTIVE")
	public Boolean getInactive() {
		return inactive;
	}

	/**
	 * Sets the value of the {@link #inactive} field.
	 * 
	 * @param inactive
	 *            The value to set.
	 */
	public void setInactive(Boolean inactive) {
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

	/**
	 * Returns the value of the field {@link #mail}.
	 * 
	 * @return Value of the {@link #mail} field.
	 */
	@Column(name = "MAIL")
	public String getMail() {
		return mail;
	}

	/**
	 * Sets the value of the {@link #mail} field.
	 * 
	 * @param mail
	 *            The value to set.
	 */
	public void setMail(String mail) {
		this.mail = mail;
	}

}
