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
@Table(name = "PERSON_OPTION")
@SequenceGenerator(name = "MySeqPersonOption", sequenceName = "TBADM.SEQ_PERSON_OPTION")
public class PersonOption extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -61673704636446765L;

	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	Long personOptionId;
	
	Long interfaceId;
	String CWID;
	String name;
	String value;
	
	
	/**
	 * Creates a new instance.
	 */
	public PersonOption() {
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
		return getPersonOptionId();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqPersonOption")
	@Column(name = "PERSON_OPTION_ID")
	public Long getPersonOptionId() {
		return personOptionId;
	}

	public void setPersonOptionId(Long personOptionId) {
		this.personOptionId = personOptionId;
	}

	@Column(name = "INTERFACE_ID")
	public Long getInterfaceId() {
		return interfaceId;
	}

	public void setInterfaceId(Long interfaceId) {
		this.interfaceId = interfaceId;
	}

	@Column(name = "CWID")
	public String getCWID() {
		return CWID;
	}

	public void setCWID(String CWID) {
		this.CWID = CWID;
	}

	@Column(name = "NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "VALUE")
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	
}
