package com.bayerbbs.bov;

public class BovApplicationInputDTO {

	private Long drLevel;
	private Long severityLevel;
	private String gxpRelevant;
	private String giscRelevant;
	
	private String informationClassification;
	private String dataPrivacy;
	
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
	public String getGiscRelevant() {
		return giscRelevant;
	}
	public void setGiscRelevant(String giscRelevant) {
		this.giscRelevant = giscRelevant;
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
	
}
