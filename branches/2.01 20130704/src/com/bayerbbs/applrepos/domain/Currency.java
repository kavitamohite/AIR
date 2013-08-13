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
@Table(name = "V_MD_CURRENCY")
public class Currency implements Serializable {

	private static final long serialVersionUID = -8109810718354929068L;

	private Long currencyId;
	private String currencyName;
	private String currencySymbol;
	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public Currency() {
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
		return getCurrencyId();
	}

	/**
	 * Returns the value of the field {@link #currencyId}.
	 * 
	 * @return Value of the {@link #currencyId} field.
	 */
	@Id
	@Column(name = "CURRENCY_ID")
	public Long getCurrencyId() {
		return currencyId;
	}

	/**
	 * Sets the value of the {@link #currencyId} field.
	 * 
	 * @param currencyId
	 *            The value to set.
	 */
	public void setCurrencyId(Long currencyId) {
		this.currencyId = currencyId;
	}
	
	/**
	 * Returns the value of the field {@link #currencyName}.
	 * 
	 * @return Value of the {@link #currencyName} field.
	 */
	@Column(name = "CURRENCY_NAME")
	public String getCurrencyName() {
		return currencyName;
	}

	/**
	 * Sets the value of the {@link #currencyName} field.
	 * 
	 * @param currencyName
	 *            The value to set.
	 */
	public void setCurrencyName(String currencyName) {
		this.currencyName = currencyName;
	}

	/**
	 * Returns the value of the field {@link #currencySymbol}.
	 * 
	 * @return Value of the {@link #currencySymbol} field.
	 */
	@Column(name = "CURRENCY_SYMBOL")
	public String getCurrencySymbol() {
		return currencySymbol;
	}

	/**
	 * Sets the value of the {@link #currencySymbol} field.
	 * 
	 * @param currencySymbol
	 *            The value to set.
	 */
	public void setCurrencySymbol(String currencySymbol) {
		this.currencySymbol = currencySymbol;
	}
	
}
