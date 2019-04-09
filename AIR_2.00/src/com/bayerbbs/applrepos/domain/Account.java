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
@Table(name = "V_MD_ACCOUNT")
public class Account implements Serializable {

	private static final long serialVersionUID = 2432846363309970397L;
	private Long accountId;
	private String accountName;
	
	private String accountType;	// KONTO_ART

	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public Account() {
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
		return getAccountId();
	}

	/**
	 * Returns the value of the field {@link #accountId}.
	 * 
	 * @return Value of the {@link #accountId} field.
	 */
	@Id
	@Column(name = "ACCOUNT_ID")
	public Long getAccountId() {
		return accountId;
	}

	/**
	 * Sets the value of the {@link #accountId} field.
	 * 
	 * @param accountId
	 *            The value to set.
	 */
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	
	/**
	 * Returns the value of the field {@link #accountName}.
	 * 
	 * @return Value of the {@link #accountName} field.
	 */
	@Column(name = "ACCOUNT_NAME")
	public String getAccountName() {
		return accountName;
	}

	/**
	 * Sets the value of the {@link #accountName} field.
	 * 
	 * @param accountName
	 *            The value to set.
	 */
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	/**
	 * Returns the value of the field {@link #accountType}.
	 * 
	 * @return Value of the {@link #accountType} field.
	 */
	@Column(name = "ACCOUNT_TYPE")
	public String getAccountType() {
		return accountType;
	}

	/**
	 * Sets the value of the {@link #accountType} field.
	 * 
	 * @param accountType
	 *            The value to set.
	 */
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

}
