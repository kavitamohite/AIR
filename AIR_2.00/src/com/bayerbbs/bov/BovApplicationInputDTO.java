package com.bayerbbs.bov;

public class BovApplicationInputDTO {

	private Boolean processed;
	private String ownershipStatus;
	private Long drLevel;
	private Long severityLevel;
//	ELERJ GXP
//	private String gxpRelevant;
	/*ELERJ ICS*/
//	private String icsRelevant;
	private String itsecRelevant;
	
	private String informationClassification;
	private String dataPrivacyPersonalData;
	private String dataPrivacyBetweenCountries;
	private String applicationDescription;
	
	public Long getDrLevel() {
		return drLevel;
	}
	public void setDrLevel(Long drLevel) {
		this.drLevel = drLevel;
	}
	public Long getSeverityLevel() {
		return severityLevel;
	}
	public void setSeverityLevel(Long severityLevel) {
		this.severityLevel = severityLevel;
	}
//	ELERJ GXP
	/*public String getGxpRelevant() {
		return gxpRelevant;
	}
	public void setGxpRelevant(String gxpRelevant) {
		this.gxpRelevant = gxpRelevant;
	}*/
	public String getInformationClassification() {
		return informationClassification;
	}
	public void setInformationClassification(String informationClassification) {
		this.informationClassification = informationClassification;
	}
	public String getDataPrivacyPersonalData() {
		return dataPrivacyPersonalData;
	}
	public void setDataPrivacyPersonalData(String dataPrivacyPersonalData) {
		this.dataPrivacyPersonalData = dataPrivacyPersonalData;
	}
	public String getDataPrivacyBetweenCountries() {
		return dataPrivacyBetweenCountries;
	}
	public void setDataPrivacyBetweenCountries(String dataPrivacyBetweenCountries) {
		this.dataPrivacyBetweenCountries = dataPrivacyBetweenCountries;
	}
	public String getItsecRelevant() {
		return itsecRelevant;
	}
	public void setItsecRelevant(String itsecRelevant) {
		this.itsecRelevant = itsecRelevant;
	}
	/*ELERJ ICS*/
/*	public String getIcsRelevant() {
		return icsRelevant;
	}
	public void setIcsRelevant(String icsRelevant) {
		this.icsRelevant = icsRelevant;
	}
*/	public String getApplicationDescription() {
		return applicationDescription;
	}
	public void setApplicationDescription(String applicationDescription) {
		this.applicationDescription = applicationDescription;
	}
	public Boolean getProcessed() {
		return processed;
	}
	public void setProcessed(Boolean processed) {
		this.processed = processed;
	}
	public String getOwnershipStatus() {
		return ownershipStatus;
	}
	public void setOwnershipStatus(String ownershipStatus) {
		this.ownershipStatus = ownershipStatus;
	}
}
