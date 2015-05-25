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

import org.hibernate.annotations.Type;

@Entity
@Table(name = "HW_KATEGORIE3")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "HwCategorySeq3", sequenceName = "TBADM.SEQ_HW_KATEGORIE3")
public class HardwareCategory3 {
	private Long id;// HW_KATEGORIE1_ID NOT NULL NUMBER
	private String hwKategory3;// HW_KATEGORIE1 NOT NULL VARCHAR2(160)
	private String text;// HW_KATEGORIE1_TXT VARCHAR2(1020)

	private Partner partner;
	private HardwareCategory2 hwCategory2;

	private Character hwsFlag;

	// PARTNER_ID NUMBER
	// HW_KATEGORIE2_ID NOT NULL NUMBER
	// HWS_FLAG VARCHAR2(1)

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "HwCategorySeq3")
	@Column(name = "HW_KATEGORIE3_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "HW_KATEGORIE3")
	public String getHwKategory3() {
		return hwKategory3;
	}

	public void setHwKategory3(String hwKategory3) {
		this.hwKategory3 = hwKategory3;
	}

	@Column(name = "HW_KATEGORIE3_TXT")
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "PARTNER_ID")
	public Partner getPartner() {
		return partner;
	}

	public void setPartner(Partner partner) {
		this.partner = partner;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HW_KATEGORIE2_ID")
	public HardwareCategory2 getHwCategory2() {
		return hwCategory2;
	}

	public void setHwCategory2(HardwareCategory2 hwCategory2) {
		this.hwCategory2 = hwCategory2;
	}

	@Type(type = "yes_no")
	@Column(name = "HWS_FLAG")
	public Boolean getHwsFlag() {
		if (hwsFlag == null)
			return null;
		return hwsFlag == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setHwsFlag(Boolean hwsFlag) {
		if (hwsFlag == null) {
			this.hwsFlag = null;
		} else {
			this.hwsFlag = hwsFlag == true ? 'Y' : 'N';
		}
	}

}
