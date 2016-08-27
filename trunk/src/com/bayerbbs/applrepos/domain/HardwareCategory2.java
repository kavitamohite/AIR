package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "HW_KATEGORIE2")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "HwCategorySeq", sequenceName = "TBADM.SEQ_HW_KATEGORIE2")
public class HardwareCategory2 {

	private Long id;
	private String hwKategory2;
	private String text;
	private String en;
	private Character facilityComponent; // FACILITY_COMPONENT_Y_N VARCHAR2(2)

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "HwCategorySeq")
	@Column(name = "HW_KATEGORIE2_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "HW_KATEGORIE2")
	public String getHwKategory2() {
		return hwKategory2;
	}

	public void setHwKategory2(String hwKategory2) {
		this.hwKategory2 = hwKategory2;
	}

	@Column(name = "HW_KATEGORIE2_TXT")
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Column(name = "HW_KATEGORIE2_EN")
	public String getEn() {
		return en;
	}

	public void setEn(String en) {
		this.en = en;
	}

	@Type(type = "yes_no")
	@Column(name = "FACILITY_COMPONENT_Y_N")
	public Boolean getFacilityComponent() {
		if (facilityComponent == null)
			return null;
		return facilityComponent == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setFacilityComponent(Boolean facilityComponent) {
		if (facilityComponent == null) {
			this.facilityComponent = null;
		} else {
			this.facilityComponent = facilityComponent == true ? 'Y' : 'N';
		}
	}

}
