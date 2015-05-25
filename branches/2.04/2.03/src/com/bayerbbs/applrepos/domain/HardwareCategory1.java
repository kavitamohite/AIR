package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "HW_KATEGORIE1")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "HwCategorySeq", sequenceName = "TBADM.SEQ_HW_KATEGORIE1")
public class HardwareCategory1 extends DeletableRevisionInfo implements
		Serializable {
	private static final long serialVersionUID = -9160754796793917441L;
	private Long id;
	private String hwKategory1;
	private String text;
	private String en;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "HwCategorySeq")
	@Column(name = "HW_KATEGORIE1_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "HW_KATEGORIE1")
	public String getHwKategory1() {
		return hwKategory1;
	}

	public void setHwKategory1(String hwKategory1) {
		this.hwKategory1 = hwKategory1;
	}

	@Column(name = "HW_KATEGORIE1_TXT")
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Column(name = "HW_KATEGORIE1_EN")
	public String getEn() {
		return en;
	}

	public void setEn(String en) {
		this.en = en;
	}

}
