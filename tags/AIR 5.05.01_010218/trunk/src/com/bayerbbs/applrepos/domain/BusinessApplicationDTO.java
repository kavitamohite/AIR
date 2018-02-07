package com.bayerbbs.applrepos.domain;

import com.bayerbbs.applrepos.dto.ApplicationDTO;
import com.bayerbbs.applrepos.dto.CiBaseDTO;

public class BusinessApplicationDTO extends ApplicationDTO {
	
	//private Long id;
	private Long barAppId; 
	private String applicationName;
	private String applicationAlias;
	private String applicationDescription;
	private Long externallyHosted;
	private String lastModification;
	
	
	
	/**
	 * @return the barAppid
	 */
	public Long getBarAppId() {
		return barAppId;
	}
	
	/**
	 * @param barAppid the barAppid to set
	 */
	public void setBarAppId(Long barAppId) {
		this.barAppId = barAppId;
	}
	
	/**
	 * @return the applicationName
	 */
	public String getApplicationName() {
		return applicationName;
	}
	/**
	 * @param applicationName the applicationName to set
	 */
	public void setApplicationName(String applicationName) {
		this.applicationName = applicationName;
	}
	/**
	 * @return the applicationAlias
	 */
	public String getApplicationAlias() {
		return applicationAlias;
	}
	/**
	 * @param applicationAlias the applicationAlias to set
	 */
	public void setApplicationAlias(String applicationAlias) {
		this.applicationAlias = applicationAlias;
	}
	/**
	 * @return the applicationDescription
	 */
	public String getApplicationDescription() {
		return applicationDescription;
	}
	/**
	 * @param applicationDescription the applicationDescription to set
	 */
	public void setApplicationDescription(String applicationDescription) {
		this.applicationDescription = applicationDescription;
	}
	/**
	 * @return the externallyHosted
	 */
	public Long getExternallyHosted() {
		return externallyHosted;
	}
	/**
	 * @param externallyHosted the externallyHosted to set
	 */
	public void setExternallyHosted(Long externallyHosted) {
		this.externallyHosted = externallyHosted;
	}
	/**
	 * @return the lastModification
	 */
	public String getLastModification() {
		return lastModification;
	}
	/**
	 * @param lastModification the lastModification to set
	 */
	public void setLastModification(String lastModification) {
		this.lastModification = lastModification;
	}

	
	

}
