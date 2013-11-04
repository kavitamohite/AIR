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
@Table(name = "V_MD_GROUP_TYPE")
public class GroupType implements Serializable {

	private static final long serialVersionUID = -2303209644906360270L;

	private Long groupTypeId;
	private String groupTypeName;
	private String individualContact;
	private Long minContacts;
	private Long maxContacts;
	private Long visibleApplication;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public GroupType() {
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
		return getGroupTypeId();
	}

	/**
	 * Returns the value of the field {@link #groupTypeId}.
	 * 
	 * @return Value of the {@link #groupTypeId} field.
	 */
	@Id
	@Column(name = "GROUP_TYPE_ID")
	public Long getGroupTypeId() {
		return groupTypeId;
	}

	/**
	 * Sets the value of the {@link #groupTypeId} field.
	 * 
	 * @param groupTypeId
	 *            The value to set.
	 */
	public void setGroupTypeId(Long groupTypeId) {
		this.groupTypeId = groupTypeId;
	}

	/**
	 * Returns the value of the field {@link #groupTypeName}.
	 * 
	 * @return Value of the {@link #groupTypeName} field.
	 */
	@Column(name = "GROUP_TYPE_NAME")
	public String getGroupTypeName() {
		return groupTypeName;
	}

	/**
	 * Sets the value of the {@link #groupTypeName} field.
	 * 
	 * @param groupTypeName
	 *            The value to set.
	 */
	public void setGroupTypeName(String groupTypeName) {
		this.groupTypeName = groupTypeName;
	}

	/**
	 * Returns the value of the field {@link #individualContact}.
	 * 
	 * @return Value of the {@link #individualContact} field.
	 */
	@Column(name = "INDIVIDUAL_CONTACT_Y_N")
	public String getIndividualContact() {
		return individualContact;
	}

	/**
	 * Sets the value of the {@link #individualContact} field.
	 * 
	 * @param individualContact
	 *            The value to set.
	 */
	public void setIndividualContact(String individualContact) {
		this.individualContact = individualContact;
	}

	
	/**
	 * Returns the value of the field {@link #minContacts}.
	 * 
	 * @return Value of the {@link #minContacts} field.
	 */
	@Column(name = "MIN_CONTACTS")
	public Long getMinContacts() {
		return minContacts;
	}

	/**
	 * Sets the value of the {@link #minContacts} field.
	 * 
	 * @param minContacts
	 *            The value to set.
	 */
	public void setMinContacts(Long minContacts) {
		this.minContacts = minContacts;
	}

	/**
	 * Returns the value of the field {@link #maxContacts}.
	 * 
	 * @return Value of the {@link #maxContacts} field.
	 */
	@Column(name = "MAX_CONTACTS")
	public Long getMaxContacts() {
		return maxContacts;
	}

	/**
	 * Sets the value of the {@link #maxContacts} field.
	 * 
	 * @param maxContacts
	 *            The value to set.
	 */
	public void setMaxContacts(Long maxContacts) {
		this.maxContacts = maxContacts;
	}
	
	
	/**
	 * Returns the value of the field {@link #visibleApplication}.
	 * 
	 * @return Value of the {@link #visibleApplication} field.
	 */
	@Column(name = "VISIBLE_APPLICATION")
	public Long getVisibleApplication() {
		return visibleApplication;
	}

	/**
	 * Sets the value of the {@link #visibleApplication} field.
	 * 
	 * @param visibleApplication
	 *            The value to set.
	 */
	public void setVisibleApplication(Long visibleApplication) {
		this.visibleApplication = visibleApplication;
	}
	
}
