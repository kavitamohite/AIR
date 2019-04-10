package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

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
@Table(name = "SOFTWAREKOMPONENTE")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "SoftwareComponentSeq", sequenceName = "TBADM.SEQ_SOFTWAREKOMPONENTE")
public class SoftwareComponent extends RevisionInfo implements Serializable {

	private static final long serialVersionUID = 6865402274791965182L;

	private Long id;

	private String name;

	private String prouctDescription;

	private Partner hersteller;

	private Long herstellerId;
	
	private String responsible;

	private SoftwareCategory1 softwareCategory1;

	private Long softwareCategory1Id;

	private SoftwareCategory2 softwareCategory2;

	private Long softwareCategory2Id;

	private Long itset;

	private String subResponsible;

	private String technicalMaster;

	private String technicalNumber;

	private String bestellNumber; // BESTELL_NR

	private Konto konto;// KONTO_ID

	private Long kontoId;

	private String innenauftrag;// Internal Order

	private String inventoryNumber; // INVENTAR_NR

	private String requester;

	private Partner partner;

	private Long partnerId;

	private String serialNumber;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SoftwareComponentSeq")
	@Column(name = "SW_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "SW_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "PRODUKTBEZ")
	public String getProuctDescription() {
		return prouctDescription;
	}

	public void setProuctDescription(String prouctDescription) {
		this.prouctDescription = prouctDescription;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SW_HERSTELLER_ID", insertable = false, updatable = false)
	public Partner getHersteller() {
		return hersteller;
	}

	public void setHersteller(Partner hersteller) {
		this.hersteller = hersteller;
	}

	@Column(name = "SW_HERSTELLER_ID")
	public Long getHerstellerId() {
		return herstellerId;
	}

	public void setHerstellerId(Long herstellerId) {
		this.herstellerId = herstellerId;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SW_KATEGORIE1_ID", insertable = false, updatable = false)
	public SoftwareCategory1 getSoftwareCategory1() {
		return softwareCategory1;
	}

	public void setSoftwareCategory1(SoftwareCategory1 softwareCategory1) {
		this.softwareCategory1 = softwareCategory1;
	}

	@Column(name = "SW_KATEGORIE1_ID")
	public Long getSoftwareCategory1Id() {
		return softwareCategory1Id;
	}

	public void setSoftwareCategory1Id(Long softwareCategory1Id) {
		this.softwareCategory1Id = softwareCategory1Id;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SW_KATEGORIE2_ID", insertable = false, updatable = false)
	public SoftwareCategory2 getSoftwareCategory2() {
		return softwareCategory2;
	}

	public void setSoftwareCategory2(SoftwareCategory2 softwareCategory2) {
		this.softwareCategory2 = softwareCategory2;
	}

	@Column(name = "SW_KATEGORIE2_ID")
	public Long getSoftwareCategory2Id() {
		return softwareCategory2Id;
	}

	public void setSoftwareCategory2Id(Long softwareCategory2Id) {
		this.softwareCategory2Id = softwareCategory2Id;
	}

	@Column(name = "itset")
	public Long getItset() {
		return itset;
	}

	public void setItset(Long itset) {
		this.itset = itset;
	}
	
	@Column(name = "RESPONSIBLE")
	public String getResponsible() {
		return responsible;
	}

	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}

	@Column(name = "SUB_RESPONSIBLE")
	public String getSubResponsible() {
		return subResponsible;
	}

	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}

	@Column(name = "TECHNISCHER_MASTER")
	public String getTechnicalMaster() {
		return technicalMaster;
	}

	public void setTechnicalMaster(String technicalMaster) {
		this.technicalMaster = technicalMaster;
	}

	@Column(name = "TECHNISCHE_NR")
	public String getTechnicalNumber() {
		return technicalNumber;
	}

	public void setTechnicalNumber(String technicalNumer) {
		this.technicalNumber = technicalNumer;
	}

	@Column(name = "SERIEN_NR")
	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	@Column(name = "INVENTAR_NR")
	public String getInventoryNumber() {
		return inventoryNumber;
	}

	public void setInventoryNumber(String inventoryNumber) {
		this.inventoryNumber = inventoryNumber;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "KONTO_ID", insertable = false, updatable = false)
	public Konto getKonto() {
		return konto;
	}

	public void setKonto(Konto konto) {
		this.konto = konto;
	}

	@Column(name = "KONTO_ID")
	public Long getKontoId() {
		return kontoId;
	}

	public void setKontoId(Long kontoId) {
		this.kontoId = kontoId;
	}

	@Column(name = "ANFORDERER")
	public String getRequester() {
		return requester;
	}

	public void setRequester(String requester) {
		this.requester = requester;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "OWNER_PARTNID", insertable = false, updatable = false)
	public Partner getPartner() {
		return partner;
	}

	public void setPartner(Partner partner) {
		this.partner = partner;
	}

	@Column(name = "OWNER_PARTNID")
	public Long getPartnerId() {
		return partnerId;
	}

	public void setPartnerId(Long partnerId) {
		this.partnerId = partnerId;
	}

	@Column(name = "BESTELL_NR")
	public String getBestellNumber() {
		return bestellNumber;
	}

	public void setBestellNumber(String bestellNumber) {
		this.bestellNumber = bestellNumber;
	}

	@Column(name = "INNENAUFTRAG")
	public String getInnenauftrag() {
		return innenauftrag;
	}

	public void setInnenauftrag(String innenauftrag) {
		this.innenauftrag = innenauftrag;
	}

}
