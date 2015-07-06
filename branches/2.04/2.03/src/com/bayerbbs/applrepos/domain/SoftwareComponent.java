package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

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

	private String herstellerAnsp;

	private Long type;

	private String responsible;

	private SoftwareCategory1 softwareCategory1;

	private Long softwareCategory1Id;

	private SoftwareCategory2 softwareCategory2;

	private Long softwareCategory2Id;

	private SoftwareComponent softwareComponent;

	private String articleNumber;

	private String serialNumber;

	private Long itset;

	private String subResponsible;

	private String technicalMaster;

	private String technicalNumber;

	private Long lieferantid;

	private String lieferantansp;

	private String bestellVeranlass;// BESTELL_VERANLASS

	private String bestellNumber; // BESTELL_NR

	private Konto konto;// KONTO_ID

	private Long kontoId;

	private String innenauftrag;// Internal Order

	private String vertragsart; // Contract

	private Long anschaffungspreis;// purchase price

	private String inventoryNumber; // INVENTAR_NR

	private Date datumaktivierung; // DATUM_AKTIVIERUNG

	private Date datumgueltigab; // DATUM_GUELTIG_AB

	private Date datumgueltigbis; // DATUM_GUELTIG_BIS

	private String innutzung; // IN_NUTZUNG

	private String swvertragnr; // SW_VERTRAG_NR

	private Long afadauermonate;// AFA_DAUER_MONATE

	private String kundenbereich;// KUNDENBEREICH

	private String nutzungsbereich;// NUTZUNGSBEREICH

	private String uebertragbar;// UEBERTRAGBAR

	private String wartungsvertrag;// WARTUNGSVERTRAG

	private Date datumwartungbeg; // DATUM_WARTUNG_BEG

	private Date datumwartungende; // DATUM_WARTUNG_ENDE

	private String kuendigbedingung;// KUENDIG_BEDINGUNG

	private String kostenwartungj;// KOSTEN_WARTUNG_J

	private String bemerkung;// BEMERKUNG

	private String sortierfeld;// SORTIERFELD

	private Timestamp sampleTestDate; // SAMPLE_TEST_DATE TIMESTAMP(6)

	private String sampleTestResult; // SAMPLE_TEST_RESULT VARCHAR2(4000 BYTE)

	private String swversion;// SW_VERSION

	private String productfamily;// PRODUCT_FAMILY

	private String licenserequired;// LICENSE_REQUIRED_Y_N

	private Timestamp lastSyncTimestamp; // LAST_SYNC_TIMESTAMP TIMESTAMP(6)

	private String lastSyncSource; // LAST_SYNC_SOURCE VARCHAR2(40 BYTE)

	private String syncing; // SYNCING VARCHAR2(40 BYTE)

	private LifecycleSubStat lifecycleSubStat;// LC_SUB_STAT_ID

	private Date endDate;

	private Timestamp syncTimestamp; // SYNC_TIMESTAMP

	private Long syncConfig; // SYNC_CONFIG

	private LifecycleSubStat commercialStatus;// COMMERCIAL_STATUS_ID

	private String requester; // ANFORDERER

	private Partner partner;// OWNER_PARTNID

	private String inventoryStockNumber; // INVENTARNUMMER_OHNE

	private Long duplicateSer;

	private Long duplicateInv;

	private Long purchaseNumber; // BUCHWERT

	private String purchaseName; // PURCHASER_NAME

	private Date purchaseDate; // BUCHWERT_DATUM

	private String vbp; // VBP VARCHAR2(68 BYTE)

	private Long salesPrice;

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

	@Column(name = "HERSTELLER_ANSP")
	public String getHerstellerAnsp() {
		return herstellerAnsp;
	}

	public void setHerstellerAnsp(String herstellerAnsp) {
		this.herstellerAnsp = herstellerAnsp;
	}

	@Column(name = "SW_TYP")
	public Long getType() {
		return type;
	}

	public void setType(Long type) {
		this.type = type;
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

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SW_ID1")
	public SoftwareComponent getSoftwareComponent() {
		return softwareComponent;
	}

	public void setSoftwareComponent(SoftwareComponent softwareComponent) {
		this.softwareComponent = softwareComponent;
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

	@Column(name = "SW_LIEFERANT_ID")
	public Long getLieferantid() {
		return lieferantid;
	}

	public void setLieferantid(Long lieferantid) {
		this.lieferantid = lieferantid;
	}

	@Column(name = "LIEFERANT_ANSP")
	public String getLieferantansp() {
		return lieferantansp;
	}

	public void setLieferantansp(String lieferantansp) {
		this.lieferantansp = lieferantansp;
	}

	@Column(name = "ARTIKEL_NR")
	public String getArticleNumber() {
		return articleNumber;
	}

	public void setArticleNumber(String articleNumber) {
		this.articleNumber = articleNumber;
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
	@JoinColumn(name = "LC_SUB_STAT_ID")
	public LifecycleSubStat getLifecycleSubStat() {
		return lifecycleSubStat;
	}

	public void setLifecycleSubStat(LifecycleSubStat lifecycleSubStat) {
		this.lifecycleSubStat = lifecycleSubStat;
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

	@Column(name = "AM_JAHR_ENDE")
	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Column(name = "BUCHWERT")
	public Long getPurchaseNumber() {
		return purchaseNumber;
	}

	public void setPurchaseNumber(Long purchaseNumber) {
		this.purchaseNumber = purchaseNumber;
	}

	@Column(name = "BUCHWERT_DATUM")
	public Date getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	@Column(name = "ANFORDERER")
	public String getRequester() {
		return requester;
	}

	public void setRequester(String requester) {
		this.requester = requester;
	}

	@Column(name = "SAMPLE_TEST_DATE")
	public Timestamp getSampleTestDate() {
		return sampleTestDate;
	}

	public void setSampleTestDate(Timestamp sampleTestDate) {
		this.sampleTestDate = sampleTestDate;
	}

	@Column(name = "SAMPLE_TEST_RESULT")
	public String getSampleTestResult() {
		return sampleTestResult;
	}

	public void setSampleTestResult(String sampleTestResult) {
		this.sampleTestResult = sampleTestResult;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "OWNER_PARTNID")
	public Partner getPartner() {
		return partner;
	}

	public void setPartner(Partner partner) {
		this.partner = partner;
	}

	@Column(name = "SYNC_TIMESTAMP")
	public Timestamp getSyncTimestamp() {
		return syncTimestamp;
	}

	public void setSyncTimestamp(Timestamp syncTimestamp) {
		this.syncTimestamp = syncTimestamp;
	}

	@Column(name = "SYNC_CONFIG")
	public Long getSyncConfig() {
		return syncConfig;
	}

	public void setSyncConfig(Long syncConfig) {
		this.syncConfig = syncConfig;
	}

	@Column(name = "DUPLICATE_SER")
	public Long getDuplicateSer() {
		return duplicateSer;
	}

	public void setDuplicateSer(Long duplicateSer) {
		this.duplicateSer = duplicateSer;
	}

	@Column(name = "DUPLICATE_INV")
	public Long getDuplicateInv() {
		return duplicateInv;
	}

	public void setDuplicateInv(Long duplicateInv) {
		this.duplicateInv = duplicateInv;
	}

	@Column(name = "INVENTARNUMMER_OHNE")
	public String getInventoryStockNumber() {
		return inventoryStockNumber;
	}

	public void setInventoryStockNumber(String inventoryStockNumber) {
		this.inventoryStockNumber = inventoryStockNumber;
	}

	@Column(name = "VBP")
	public String getVbp() {
		return vbp;
	}

	public void setVbp(String vbp) {
		this.vbp = vbp;
	}

	@Column(name = "SALES_PRICE")
	public Long getSalesPrice() {
		return salesPrice;
	}

	public void setSalesPrice(Long salesPrice) {
		this.salesPrice = salesPrice;
	}

	@Column(name = "PURCHASER_NAME")
	public String getPurchaseName() {
		return purchaseName;
	}

	public void setPurchaseName(String purchaseName) {
		this.purchaseName = purchaseName;
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

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "COMMERCIAL_STATUS_ID")
	public LifecycleSubStat getCommercialStatus() {
		return commercialStatus;
	}

	public void setCommercialStatus(LifecycleSubStat commercialStatus) {
		this.commercialStatus = commercialStatus;
	}

	@Column(name = "BESTELL_VERANLASS")
	public String getBestellVeranlass() {
		return bestellVeranlass;
	}

	public void setBestellVeranlass(String bestellVeranlass) {
		this.bestellVeranlass = bestellVeranlass;
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

	@Column(name = "VERTRAGSART")
	public String getVertragsart() {
		return vertragsart;
	}

	public void setVertragsart(String vertragsart) {
		this.vertragsart = vertragsart;
	}

	@Column(name = "ANSCHAFFUNGSPREIS")
	public Long getAnschaffungspreis() {
		return anschaffungspreis;
	}

	public void setAnschaffungspreis(Long anschaffungspreis) {
		this.anschaffungspreis = anschaffungspreis;
	}

	@Column(name = "DATUM_AKTIVIERUNG")
	public Date getDatumaktivierung() {
		return datumaktivierung;
	}

	public void setDatumaktivierung(Date datumaktivierung) {
		this.datumaktivierung = datumaktivierung;
	}

	@Column(name = "DATUM_GUELTIG_AB")
	public Date getDatumgueltigab() {
		return datumgueltigab;
	}

	public void setDatumgueltigab(Date datumgueltigab) {
		this.datumgueltigab = datumgueltigab;
	}

	@Column(name = "DATUM_GUELTIG_BIS")
	public Date getDatumgueltigbis() {
		return datumgueltigbis;
	}

	public void setDatumgueltigbis(Date datumgueltigbis) {
		this.datumgueltigbis = datumgueltigbis;
	}

	@Column(name = "IN_NUTZUNG")
	public String getInnutzung() {
		return innutzung;
	}

	public void setInnutzung(String innutzung) {
		this.innutzung = innutzung;
	}

	@Column(name = "SW_VERTRAG_NR")
	public String getSwvertragnr() {
		return swvertragnr;
	}

	public void setSwvertragnr(String swvertragnr) {
		this.swvertragnr = swvertragnr;
	}

	@Column(name = "AFA_DAUER_MONATE")
	public Long getAfadauermonate() {
		return afadauermonate;
	}

	public void setAfadauermonate(Long afadauermonate) {
		this.afadauermonate = afadauermonate;
	}

	@Column(name = "KUNDENBEREICH")
	public String getKundenbereich() {
		return kundenbereich;
	}

	public void setKundenbereich(String kundenbereich) {
		this.kundenbereich = kundenbereich;
	}

	@Column(name = "NUTZUNGSBEREICH")
	public String getNutzungsbereich() {
		return nutzungsbereich;
	}

	public void setNutzungsbereich(String nutzungsbereich) {
		this.nutzungsbereich = nutzungsbereich;
	}

	@Column(name = "UEBERTRAGBAR")
	public String getUebertragbar() {
		return uebertragbar;
	}

	public void setUebertragbar(String uebertragbar) {
		this.uebertragbar = uebertragbar;
	}

	@Column(name = "WARTUNGSVERTRAG")
	public String getWartungsvertrag() {
		return wartungsvertrag;
	}

	public void setWartungsvertrag(String wartungsvertrag) {
		this.wartungsvertrag = wartungsvertrag;
	}

	@Column(name = "DATUM_WARTUNG_BEG")
	public Date getDatumwartungbeg() {
		return datumwartungbeg;
	}

	public void setDatumwartungbeg(Date datumwartungbeg) {
		this.datumwartungbeg = datumwartungbeg;
	}

	@Column(name = "DATUM_WARTUNG_ENDE")
	public Date getDatumwartungende() {
		return datumwartungende;
	}

	public void setDatumwartungende(Date datumwartungende) {
		this.datumwartungende = datumwartungende;
	}

	@Column(name = "KUENDIG_BEDINGUNG")
	public String getKuendigbedingung() {
		return kuendigbedingung;
	}

	public void setKuendigbedingung(String kuendigbedingung) {
		this.kuendigbedingung = kuendigbedingung;
	}

	@Column(name = "KOSTEN_WARTUNG_J")
	public String getKostenwartungj() {
		return kostenwartungj;
	}

	public void setKostenwartungj(String kostenwartungj) {
		this.kostenwartungj = kostenwartungj;
	}

	@Column(name = "BEMERKUNG")
	public String getBemerkung() {
		return bemerkung;
	}

	public void setBemerkung(String bemerkung) {
		this.bemerkung = bemerkung;
	}

	@Column(name = "SORTIERFELD")
	public String getSortierfeld() {
		return sortierfeld;
	}

	public void setSortierfeld(String sortierfeld) {
		this.sortierfeld = sortierfeld;
	}

	@Column(name = "SW_VERSION")
	public String getSwversion() {
		return swversion;
	}

	public void setSwversion(String swversion) {
		this.swversion = swversion;
	}

	@Column(name = "PRODUCT_FAMILY")
	public String getProductfamily() {
		return productfamily;
	}

	public void setProductfamily(String productfamily) {
		this.productfamily = productfamily;
	}

	@Column(name = "LICENSE_REQUIRED_Y_N")
	public String getLicenserequired() {
		return licenserequired;
	}

	public void setLicenserequired(String licenserequired) {
		this.licenserequired = licenserequired;
	}

}
