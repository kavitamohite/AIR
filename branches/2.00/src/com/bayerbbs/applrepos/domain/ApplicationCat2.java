package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;

@Immutable
@Entity
@Table(name = "V_MD_APPLICATION_CAT2")
public class ApplicationCat2 implements Serializable {
	private static final long serialVersionUID = -2410206992724504924L;
	
	private Long id;
	private String anwendungKat2Text;
	private Long sort;
	private Long anwendungKat1Id;
	private String guiSAPNameWizard;
	
//	private Date delTimestamp;

	public ApplicationCat2() {
	}


	@Id
	@Column(name = "APPLICATION_CAT2_ID")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}


	@Column(name = "APPLICATION_CAT2_TXT")
	public String getAnwendungKat2Text() {
		return anwendungKat2Text;
	}
	public void setAnwendungKat2Text(String anwendungKat2Text) {
		this.anwendungKat2Text = anwendungKat2Text;
	}
	

	@Column(name = "SORT")
	public Long getSort() {
		return sort;
	}
	public void setSort(Long sort) {
		this.sort = sort;
	}
	

	@Column(name = "APPLICATION_CAT1_ID")
	public Long getAnwendungKat1Id() {
		return anwendungKat1Id;
	}
	public void setAnwendungKat1Id(Long anwendungKat1Id) {
		this.anwendungKat1Id = anwendungKat1Id;
	}
	
	@Column(name = "GUI_SAPNAME_WIZARD_Y_N")
	public String getGuiSAPNameWizard() {
		return guiSAPNameWizard;
	}

	public void setGuiSAPNameWizard(String guiSAPNameWizard) {
		this.guiSAPNameWizard = guiSAPNameWizard;
	}

}