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
@Table(name = "SW_KATEGORIE1")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "SwCategorySeq", sequenceName = "TBADM.SEQ_SW_KATEGORIE1")
public class SoftwareCategory1 extends DeletableRevisionInfo implements Serializable {
	private static final long serialVersionUID = -9160754796793917441L;

	private Long id;

	private String swKategory1;

	private String text;

	private String en;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SwCategorySeq")
	@Column(name = "SW_KATEGORIE1_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "SW_KATEGORIE1")
	public String getSwKategory1() {
		return swKategory1;
	}

	public void setSwKategory1(String swKategory1) {
		this.swKategory1 = swKategory1;
	}

	@Column(name = "SW_KATEGORIE1_TXT")
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Column(name = "SW_KATEGORIE1_EN")
	public String getEn() {
		return en;
	}

	public void setEn(String en) {
		this.en = en;
	}

}
