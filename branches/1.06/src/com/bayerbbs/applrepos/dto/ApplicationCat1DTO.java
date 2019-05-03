package com.bayerbbs.applrepos.dto;

/**
 * The DTO (Data transfer object) for the database table "ANWENDUNG_KAT1"
 * 
 * @author evafl
 *
 */
public class ApplicationCat1DTO {

	private long applicationCat1Id;
	
	private String applicationCat1Text;
	
	private String applicationCat1En;
	
	private long sort;

	public long getApplicationCat1Id() {
		return applicationCat1Id;
	}

	public void setApplicationCat1Id(long applicationCat1Id) {
		this.applicationCat1Id = applicationCat1Id;
	}

	public String getApplicationCat1Text() {
		return applicationCat1Text;
	}

	public void setApplicationCat1Text(String applicationCat1Text) {
		this.applicationCat1Text = applicationCat1Text;
	}

	public String getApplicationCat1En() {
		return applicationCat1En;
	}

	public void setApplicationCat1En(String applicationCat1En) {
		this.applicationCat1En = applicationCat1En;
	}

	public long getSort() {
		return sort;
	}

	public void setSort(long sort) {
		this.sort = sort;
	}

	
	
	
}
