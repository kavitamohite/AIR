package com.bayerbbs.applrepos.dto;

/**
 * The DTO (Data transfer object) for the database table "ANWENDUNG_KAT2"
 * 
 * @author evafl
 *
 */

public class ApplicationCat2DTO {

	private long applicationCat2Id;
	
	private String applicationCat2Text;
	
	private long sort;

	private long applicationCat1Id;
	
	private String guiSAPNameWizard;

	public long getApplicationCat2Id() {
		return applicationCat2Id;
	}

	public void setApplicationCat2Id(long applicationCat2Id) {
		this.applicationCat2Id = applicationCat2Id;
	}

	public String getApplicationCat2Text() {
		return applicationCat2Text;
	}

	public void setApplicationCat2Text(String applicationCat2Text) {
		this.applicationCat2Text = applicationCat2Text;
	}

	public long getSort() {
		return sort;
	}

	public void setSort(long sort) {
		this.sort = sort;
	}

	public long getApplicationCat1Id() {
		return applicationCat1Id;
	}

	public void setApplicationCat1Id(long applicationCat1Id) {
		this.applicationCat1Id = applicationCat1Id;
	}

	public String getGuiSAPNameWizard() {
		return guiSAPNameWizard;
	}

	public void setGuiSAPNameWizard(String guiSAPNameWizard) {
		this.guiSAPNameWizard = guiSAPNameWizard;
	}
	
}
