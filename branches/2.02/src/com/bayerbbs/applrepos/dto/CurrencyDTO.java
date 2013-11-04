package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class CurrencyDTO implements Serializable {

	private static final long serialVersionUID = -2240850923321713293L;
	
	private Long currencyId;
	private String currencyName;
	private String currencySymbol;
	
	public Long getCurrencyId() {
		return currencyId;
	}
	public void setCurrencyId(Long currencyId) {
		this.currencyId = currencyId;
	}
	public String getCurrencyName() {
		return currencyName;
	}
	public void setCurrencyName(String currencyName) {
		this.currencyName = currencyName;
	}
	public String getCurrencySymbol() {
		return currencySymbol;
	}
	public void setCurrencySymbol(String currencySymbol) {
		this.currencySymbol = currencySymbol;
	}
	
}
