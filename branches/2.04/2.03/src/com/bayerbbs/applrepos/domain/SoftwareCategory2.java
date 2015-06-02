package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "SW_KATEGORIE2")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "SwCategorySeq", sequenceName = "TBADM.SEQ_SW_KATEGORIE2")
public class SoftwareCategory2 {

	private Long id;
	private String hwKategory2;
	private String text;
	private SoftwareCategory1 softwareCategory1;
	private String fremdSwMgr;
	private Partner hersteller;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SwCategorySeq")
	@Column(name = "SW_KATEGORIE2_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "SW_KATEGORIE2")
	public String getHwKategory2() {
		return hwKategory2;
	}

	public void setHwKategory2(String hwKategory2) {
		this.hwKategory2 = hwKategory2;
	}

	@Column(name = "SW_KATEGORIE2_TXT")
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SW_KATEGORIE1_ID")
	public SoftwareCategory1 getSoftwareCategory1() {
		return softwareCategory1;
	}

	public void setSoftwareCategory1(SoftwareCategory1 softwareCategory1) {
		this.softwareCategory1 = softwareCategory1;
	}

	@Column(name = "FREMD_SW_MGR")
	public String getFremdSwMgr() {
		return fremdSwMgr;
	}

	public void setFremdSwMgr(String fremdSwMgr) {
		this.fremdSwMgr = fremdSwMgr;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HERSTELLER_PARTNID")
	public Partner getHersteller() {
		return hersteller;
	}

	public void setHersteller(Partner hersteller) {
		this.hersteller = hersteller;
	}
	
	

}
