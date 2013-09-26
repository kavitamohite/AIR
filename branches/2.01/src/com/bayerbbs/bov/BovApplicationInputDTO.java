package com.bayerbbs.bov;

public class BovApplicationInputDTO {

	private Long drLevel;
	private Long severityLevel;
	private String gxpRelevant;
	private String icsRelevant;
	private String itsecRelevant;
	
	private String informationClassification;
	private String dataPrivacy;
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
	public String getGxpRelevant() {
		return gxpRelevant;
	}
	public void setGxpRelevant(String gxpRelevant) {
		this.gxpRelevant = gxpRelevant;
	}
	public String getInformationClassification() {
		return informationClassification;
	}
	public void setInformationClassification(String informationClassification) {
		this.informationClassification = informationClassification;
	}
	public String getDataPrivacy() {
		return dataPrivacy;
	}
	public void setDataPrivacy(String dataPrivacy) {
		this.dataPrivacy = dataPrivacy;
	}
	public String getItsecRelevant() {
		return itsecRelevant;
	}
	public void setItsecRelevant(String itsecRelevant) {
		this.itsecRelevant = itsecRelevant;
	}
	public String getIcsRelevant() {
		return icsRelevant;
	}
	public void setIcsRelevant(String icsRelevant) {
		this.icsRelevant = icsRelevant;
	}
	public String getApplicationDescription() {
		return applicationDescription;
	}
	public void setApplicationDescription(String applicationDescription) {
		this.applicationDescription = applicationDescription;
	}
	
}
