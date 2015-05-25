package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "PARTNER")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "PartnerSeq", sequenceName = "TBADM.SEQ_PARTNER")
public class Partner extends DeletableRevisionInfo implements Serializable {
	private static final long serialVersionUID = 1472262066294993295L;
	private Long id;// PARTNER_ID NOT NULL NUMBER
	private String name;// PARTNER_NAME NOT NULL VARCHAR2(320)
	private Long number;// PARTNER_NR NUMBER
	private Character bayerKonzern;// BAYER_KONZERN_Y_N CHAR(1)
	private String businessUnit;// BUSINESS_UNIT VARCHAR2(160)
	private String plz;// PLZ VARCHAR2(40)
	private String ort;// ORT VARCHAR2(320)
	private String strasse;// STRASSE VARCHAR2(320)
	private String nr;// NR VARCHAR2(48)
	private Long countryId;// COUNTRY_ID NUMBER
	private String telephone;// TEL VARCHAR2(160)
	private String fax;// FAX VARCHAR2(160)
	private String mail;// MAIL VARCHAR2(160)
	private String hotline;// HOTLINE VARCHAR2(160)
	private String url;// URL VARCHAR2(320)
	private String partnerType;// PARTNER_TYPE NOT NULL VARCHAR2(4)
	private Timestamp lastSyncTimestamp;// LAST_SYNC_TIMESTAMP TIMESTAMP(6)
	private String lastSyncSource;// LAST_SYNC_SOURCE VARCHAR2(40)
	private String syncing;// SYNCING VARCHAR2(40)
	private String companyCode;// COMPANY_CODE VARCHAR2(4)
	private Character headquater;// HEADQUARTER_Y_N VARCHAR2(1)
	private String subgroupLegal;// SUBGROUP_LEGAL VARCHAR2(80)
	private String subgroupEconomic;// SUBGROUP_ECONOMIC VARCHAR2(80)
	private Character kontoKorrentType;// KONTO_KORRENT_TYP VARCHAR2(1)

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "PartnerSeq")
	@Column(name = "PARTNER_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "PARTNER_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "PARTNER_NR")
	public Long getNumber() {
		return number;
	}

	public void setNumber(Long number) {
		this.number = number;
	}

	@Type(type = "yes_no")
	@Column(name = "BAYER_KONZERN_Y_N")
	public Boolean getBayerKonzern() {
		if (bayerKonzern == null)
			return null;
		return bayerKonzern == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setBayerKonzern(Boolean bayerKonzern) {
		if (bayerKonzern == null) {
			this.bayerKonzern = null;
		} else {
			this.bayerKonzern = bayerKonzern == true ? 'Y' : 'N';
		}
	}

	@Column(name = "BUSINESS_UNIT")
	public String getBusinessUnit() {
		return businessUnit;
	}

	public void setBusinessUnit(String businessUnit) {
		this.businessUnit = businessUnit;
	}

	@Column(name = "PLZ")
	public String getPlz() {
		return plz;
	}

	public void setPlz(String plz) {
		this.plz = plz;
	}

	@Column(name = "ORT")
	public String getOrt() {
		return ort;
	}

	public void setOrt(String ort) {
		this.ort = ort;
	}

	@Column(name = "STRASSE")
	public String getStrasse() {
		return strasse;
	}

	public void setStrasse(String strasse) {
		this.strasse = strasse;
	}

	@Column(name = "NR")
	public String getNr() {
		return nr;
	}

	public void setNr(String nr) {
		this.nr = nr;
	}

	@Column(name = "COUNTRY_ID")
	public Long getCountryId() {
		return countryId;
	}

	public void setCountryId(Long countryId) {
		this.countryId = countryId;
	}

	@Column(name = "TEL")
	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	@Column(name = "FAX")
	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	@Column(name = "MAIL")
	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	@Column(name = "HOTLINE")
	public String getHotline() {
		return hotline;
	}

	public void setHotline(String hotline) {
		this.hotline = hotline;
	}

	@Column(name = "URL")
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "PARTNER_TYPE")
	public String getPartnerType() {
		return partnerType;
	}

	public void setPartnerType(String partnerType) {
		this.partnerType = partnerType;
	}

	@Column(name = "LAST_SYNC_TIMESTAMP")
	public Timestamp getLastSyncTimestamp() {
		return lastSyncTimestamp;
	}

	public void setLastSyncTimestamp(Timestamp lastSyncTimestamp) {
		this.lastSyncTimestamp = lastSyncTimestamp;
	}

	@Column(name = "LAST_SYNC_SOURCE")
	public String getLastSyncSource() {
		return lastSyncSource;
	}

	public void setLastSyncSource(String lastSyncSource) {
		this.lastSyncSource = lastSyncSource;
	}

	@Column(name = "SYNCING")
	public String getSyncing() {
		return syncing;
	}

	public void setSyncing(String syncing) {
		this.syncing = syncing;
	}

	@Column(name = "COMPANY_CODE")
	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	@Type(type = "yes_no")
	@Column(name = "HEADQUARTER_Y_N")
	public Boolean getHeadquater() {
		if (headquater == null)
			return null;
		return headquater == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setHeadquater(Boolean headquater) {
		if (headquater == null) {
			this.headquater = null;
		} else {
			this.headquater = headquater == true ? 'Y' : 'N';
		}
	}

	@Column(name = "SUBGROUP_LEGAL")
	public String getSubgroupLegal() {
		return subgroupLegal;
	}

	public void setSubgroupLegal(String subgroupLegal) {
		this.subgroupLegal = subgroupLegal;
	}

	@Column(name = "SUBGROUP_ECONOMIC")
	public String getSubgroupEconomic() {
		return subgroupEconomic;
	}

	public void setSubgroupEconomic(String subgroupEconomic) {
		this.subgroupEconomic = subgroupEconomic;
	}

	@Type(type = "yes_no")
	@Column(name = "KONTO_KORRENT_TYP")
	public Boolean getKontoKorrentType() {
		if (kontoKorrentType == null)
			return null;
		return kontoKorrentType == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setKontoKorrentType(Boolean kontoKorrentType) {
		if (kontoKorrentType == null) {
			this.kontoKorrentType = null;
		} else {
			this.kontoKorrentType = kontoKorrentType == true ? 'Y' : 'N';
		}
	}

}
