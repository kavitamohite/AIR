package com.bayerbbs.applrepos.service;

public class UserOptionParameterInput {

	private String cwid;
	private String token;
	
	private String currency;		// EUR, US
	private String language;		// DE, EN
	private String numberFormat; 	// US, GERMAN
	private String help;			// YES, NO
	private String skipWizard;		// YES, NO
	private String tooltip;			// YES, NO
	
	
	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getNumberFormat() {
		return numberFormat;
	}
	public void setNumberFormat(String numberFormat) {
		this.numberFormat = numberFormat;
	}
	public String getHelp() {
		return help;
	}
	public void setHelp(String help) {
		this.help = help;
	}
	public String getSkipWizard() {
		return skipWizard;
	}
	public void setSkipWizard(String skipWizard) {
		this.skipWizard = skipWizard;
	}
	public String getTooltip() {
		return tooltip;
	}
	public void setTooltip(String tooltip) {
		this.tooltip = tooltip;
	}
	
}
