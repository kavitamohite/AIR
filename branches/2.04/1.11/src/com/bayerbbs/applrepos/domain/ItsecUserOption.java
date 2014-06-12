package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ITSEC_USER_OPTION")
@SequenceGenerator(name = "MySeqItSecUserOption", sequenceName = "TBADM.SEQ_ITSEC_USER_OPTION")
public class ItsecUserOption implements Serializable {

	private static final long serialVersionUID = -6531934266342636361L;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	Long itsecUserOptionId;
	
	Long itsecUserOptionInterfaceId;
	String itsecUserOptionCWID;
	String itsecUserOptionName;
	String itsecUserOptionValue;
	
	
	/**
	 * Creates a new instance.
	 */
	public ItsecUserOption() {
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
		return getItsecUserOptionId();
	}

	/**
	 * Returns the value of the field {@link #itsecUserOptionId}.
	 * 
	 * @return Value of the {@link #itsecUserOptionId} field.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqItSecUserOption")
	@Column(name = "ITSEC_USER_OPTION_ID")
	public Long getItsecUserOptionId() {
		return itsecUserOptionId;
	}

	/**
	 * Sets the value of the {@link #itsecUserOptionId} field.
	 * 
	 * @param itsecUserOptionId
	 *            The value to set.
	 */
	public void setItsecUserOptionId(Long itsecUserOptionId) {
		this.itsecUserOptionId = itsecUserOptionId;
	}

	@Column(name = "ITSEC_USER_OPTION_INTERFACE_ID")
	public Long getItsecUserOptionInterfaceId() {
		return itsecUserOptionInterfaceId;
	}

	public void setItsecUserOptionInterfaceId(Long itsecUserOptionInterfaceId) {
		this.itsecUserOptionInterfaceId = itsecUserOptionInterfaceId;
	}

	@Column(name = "ITSEC_USER_OPTION_CWID")
	public String getItsecUserOptionCWID() {
		return itsecUserOptionCWID;
	}

	public void setItsecUserOptionCWID(String itsecUserOptionCWID) {
		this.itsecUserOptionCWID = itsecUserOptionCWID;
	}

	@Column(name = "ITSEC_USER_OPTION_NAME")
	public String getItsecUserOptionName() {
		return itsecUserOptionName;
	}

	public void setItsecUserOptionName(String itsecUserOptionName) {
		this.itsecUserOptionName = itsecUserOptionName;
	}

	@Column(name = "ITSEC_USER_OPTION_VALUE")
	public String getItsecUserOptionValue() {
		return itsecUserOptionValue;
	}

	public void setItsecUserOptionValue(String itsecUserOptionValue) {
		this.itsecUserOptionValue = itsecUserOptionValue;
	}
	
}
