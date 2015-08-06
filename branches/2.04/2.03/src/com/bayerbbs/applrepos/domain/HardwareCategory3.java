package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "HW_KATEGORIE3")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "HwCategorySeq3", sequenceName = "TBADM.SEQ_HW_KATEGORIE3")
@NamedQueries({
	@NamedQuery(name="findCategorybyPartnerIdandkategoryId", query="FROM HardwareCategory3 WHERE  partnerId=:partnerId and kategory2Id =:kategory2Id")
})
public class HardwareCategory3 extends DeletableRevisionInfo{
	private Long id;
	private String hwKategory3;
	private String text;

	private Partner partner;
	private HardwareCategory2 hwCategory2;

	private Character hwsFlag;
	private Long partnerId;
	private Long kategory2Id;

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

	//@OneToOne(fetch = FetchType.LAZY)
	@ManyToOne
	@JoinColumn(name = "PARTNER_ID")
	public Partner getPartner() {
		return partner;
	}

	public void setPartner(Partner partner) {
		this.partner = partner;
	}
	@Column(name = "PARTNER_ID", insertable=false, updatable=false)
	public Long getPartnerId() {
		return partnerId;
	}
	public void setPartnerId(Long partnerId) {
		this.partnerId = partnerId;
	}

	//@OneToOne(fetch = FetchType.LAZY)
	@ManyToOne
	@JoinColumn(name = "HW_KATEGORIE2_ID")
	public HardwareCategory2 getHwCategory2() {
		return hwCategory2;
	}

	public void setHwCategory2(HardwareCategory2 hwCategory2) {
		this.hwCategory2 = hwCategory2;
	}
	@Column(name = "HW_KATEGORIE2_ID", insertable=false, updatable=false)
	public Long getKategory2Id() {
		return kategory2Id;
	}
	public void setKategory2Id(Long kategory2Id) {
		this.kategory2Id = kategory2Id;
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
