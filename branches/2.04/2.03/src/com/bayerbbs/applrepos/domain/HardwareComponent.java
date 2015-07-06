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

import org.hibernate.annotations.Type;

@Entity
@Table(name = "HARDWAREKOMPONENTE")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "HardwareComponentSeq", sequenceName = "TBADM.SEQ_HARDWAREKOMPONENTE")
public class HardwareComponent extends RevisionInfo implements Serializable {

	private static final long serialVersionUID = 2374268074399112605L;

	private Long id;

	private String name;

	private String assetId;

	private Long relevantItsec;

	private String technicalMaster;

	private String technicalNumber;

	private Schrank schrank;

	private Long schrankId;

	private String serialNumber;

	private String inventoryNumber;

	private LifecycleSubStat lifecycleSubStat;

	private Long lifecycleSubStatId;

	private HardwareCategory1 hardwareCategory1;

	private Long hardwareCategory1Id;

	private HardwareCategory2 hardwareCategory2;

	private Long hardwareCategory2Id;

	private HardwareCategory3 hardwareCategory3;

	private Long hardwareCategory3Id;

	private HardwareCategory4 hardwareCategory4;

	private Long hardwareCategory4Id;

	private HardwareComponent hardwareComponent;

	private OperationalStatus operationalStatus;

	private Long operationalStatusId;

	private Partner hersteller;

	private Long herstellerId;

	private String inventoryOld;

	private Konto konto;

	private Long kontoId;

	// LIEFERANT_PARTNID NUMBER Needs to be checked

	private String startDate;

	private Date accessDate;

	private String endDate;

	private Long serviceNumber;

	private String bestSellText;

	private String amBanf;

	private String amKommision;

	// LEASINGGEB_PARTNID NUMBER needs to be checked

	private Sla sla;

	private String note1;

	private String note2;

	private String vUser;

	private Long powerSupplyCount;

	private Character powerSupply1;

	private Character powerSupply2;

	private Long acquitionValue;

	private Long amSumme;

	private Long purchaseNumber;

	private String purchaseDate;

	private String inventoryP69;

	private String cwidVerantw;

	private Long itset;

	private String subResponsible;

//	private Long relevantIcsNumber;

	private String requester;

	private Timestamp sampleTestDate;

	private String sampleTestResult;

	private Partner partner;

	private String sapDescription;

	private Timestamp syncTimestamp;

	private Long syncConfig;

	private Long duplicateSer;

	private Long duplicateInv;

	private String inventoryStockNumber;

	private String cpuModel;

	private Long cpuCount;

	private Long ramMemory;

	private Float intDiskSpace;

	private Float extDiskSpace;

	private Float cpuSpeed;

	private String vbp;

	private Long salesPrice;

	private String purchaseName;

	private Long heightRackUnits;

	private Long powerConsumption;

	private Timestamp lastSyncTimestamp;

	private String lastSyncSource;

	private String syncing;

	private String gxpFlag;

	private LifecycleSubStat commercialStatus;

	private String contactForService;

	private String acRequest;

	private Date acRequestEndDate;

	private String orderNumber;

	private String specifics;

	private ServiceContract serviceContract;

	private SeverityLevel severityLevel;

	private Long hbaCount;

	private Long lanCount;

	private Long cpuCoreCount;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "HardwareComponentSeq")
	@Column(name = "HW_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "HW_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "ASSET_ID")
	public String getAssetId() {
		return assetId;
	}

	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}

	@Column(name = "RELEVANZ_ITSEC")
	public Long getRelevantItsec() {
		return relevantItsec;
	}

	public void setRelevantItsec(Long relevantItsec) {
		this.relevantItsec = relevantItsec;
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

	public void setTechnicalNumber(String technicalNumber) {
		this.technicalNumber = technicalNumber;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SCHRANK_ID", insertable = false, updatable = false)
	public Schrank getSchrank() {
		return schrank;
	}

	public void setSchrank(Schrank schrank) {
		this.schrank = schrank;
	}

	@Column(name = "SCHRANK_ID")
	public Long getSchrankId() {
		return schrankId;
	}

	public void setSchrankId(Long schrankId) {
		this.schrankId = schrankId;
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
	@JoinColumn(name = "LC_SUB_STAT_ID", insertable = false, updatable = false)
	public LifecycleSubStat getLifecycleSubStat() {
		return lifecycleSubStat;
	}

	public void setLifecycleSubStat(LifecycleSubStat lifecycleSubStat) {
		this.lifecycleSubStat = lifecycleSubStat;
	}

	@Column(name = "LC_SUB_STAT_ID")
	public Long getLifecycleSubStatId() {
		return lifecycleSubStatId;
	}

	public void setLifecycleSubStatId(Long lifecycleSubStatId) {
		this.lifecycleSubStatId = lifecycleSubStatId;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HW_KATEGORIE1_ID", insertable = false, updatable = false)
	public HardwareCategory1 getHardwareCategory1() {
		return hardwareCategory1;
	}

	public void setHardwareCategory1(HardwareCategory1 hardwareCategory1) {
		this.hardwareCategory1 = hardwareCategory1;
	}

	@Column(name = "HW_KATEGORIE1_ID")
	public Long getHardwareCategory1Id() {
		return hardwareCategory1Id;
	}

	public void setHardwareCategory1Id(Long hardwareCategory1Id) {
		this.hardwareCategory1Id = hardwareCategory1Id;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HW_KATEGORIE2_ID", insertable = false, updatable = false)
	public HardwareCategory2 getHardwareCategory2() {
		return hardwareCategory2;
	}

	public void setHardwareCategory2(HardwareCategory2 hardwareCategory2) {
		this.hardwareCategory2 = hardwareCategory2;
	}

	@Column(name = "HW_KATEGORIE2_ID")
	public Long getHardwareCategory2Id() {
		return hardwareCategory2Id;
	}

	public void setHardwareCategory2Id(Long hardwareCategory2Id) {
		this.hardwareCategory2Id = hardwareCategory2Id;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HW_KATEGORIE3_ID", insertable = false, updatable = false)
	public HardwareCategory3 getHardwareCategory3() {
		return hardwareCategory3;
	}

	public void setHardwareCategory3(HardwareCategory3 hardwareCategory3) {
		this.hardwareCategory3 = hardwareCategory3;
	}

	@Column(name = "HW_KATEGORIE3_ID")
	public Long getHardwareCategory3Id() {
		return hardwareCategory3Id;
	}

	public void setHardwareCategory3Id(Long hardwareCategory3Id) {
		this.hardwareCategory3Id = hardwareCategory3Id;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HW_KATEGORIE4_ID", insertable = false, updatable = false)
	public HardwareCategory4 getHardwareCategory4() {
		return hardwareCategory4;
	}

	public void setHardwareCategory4(HardwareCategory4 hardwareCategory4) {
		this.hardwareCategory4 = hardwareCategory4;
	}

	@Column(name = "HW_KATEGORIE4_ID")
	public Long getHardwareCategory4Id() {
		return hardwareCategory4Id;
	}

	public void setHardwareCategory4Id(Long hardwareCategory4Id) {
		this.hardwareCategory4Id = hardwareCategory4Id;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HW_ID1")
	public HardwareComponent getHardwareComponent() {
		return hardwareComponent;
	}

	public void setHardwareComponent(HardwareComponent hardwareComponent) {
		this.hardwareComponent = hardwareComponent;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "EINSATZ_STATUS_ID", insertable = false, updatable = false)
	public OperationalStatus getOperationalStatus() {
		return operationalStatus;
	}

	public void setOperationalStatus(OperationalStatus operationalStatus) {
		this.operationalStatus = operationalStatus;
	}

	@Column(name = "EINSATZ_STATUS_ID")
	public Long getOperationalStatusId() {
		return operationalStatusId;
	}

	public void setOperationalStatusId(Long operationalStatusId) {
		this.operationalStatusId = operationalStatusId;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HERSTELLER_PARTNID", insertable = false, updatable = false)
	public Partner getHersteller() {
		return hersteller;
	}

	public void setHersteller(Partner hersteller) {
		this.hersteller = hersteller;
	}

	@Column(name = "HERSTELLER_PARTNID")
	public Long getHerstellerId() {
		return herstellerId;
	}

	public void setHerstellerId(Long herstellerId) {
		this.herstellerId = herstellerId;
	}

	@Column(name = "INVENTAR_OLD")
	public String getInventoryOld() {
		return inventoryOld;
	}

	public void setInventoryOld(String inventoryOld) {
		this.inventoryOld = inventoryOld;
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

	@Column(name = "AM_JAHR_START")
	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	@Column(name = "AM_JAHR_ZUGANG")
	public Date getAccessDate() {
		return accessDate;
	}

	public void setAccessDate(Date accessDate) {
		this.accessDate = accessDate;
	}

	@Column(name = "AM_JAHR_ENDE")
	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	@Column(name = "AM_NUTZDAUER")
	public Long getServiceNumber() {
		return serviceNumber;
	}

	public void setServiceNumber(Long serviceNumber) {
		this.serviceNumber = serviceNumber;
	}

	@Column(name = "AM_BESTELL_TEXT")
	public String getBestSellText() {
		return bestSellText;
	}

	public void setBestSellText(String bestSellText) {
		this.bestSellText = bestSellText;
	}

	@Column(name = "AM_BANF")
	public String getAmBanf() {
		return amBanf;
	}

	public void setAmBanf(String amBanf) {
		this.amBanf = amBanf;
	}

	@Column(name = "AM_KOMMISSION")
	public String getAmKommision() {
		return amKommision;
	}

	public void setAmKommision(String amKommision) {
		this.amKommision = amKommision;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SLA_ID")
	public Sla getSla() {
		return sla;
	}

	public void setSla(Sla sla) {
		this.sla = sla;
	}

	@Column(name = "AM_BEMERKUNG1")
	public String getNote1() {
		return note1;
	}

	public void setNote1(String note1) {
		this.note1 = note1;
	}

	@Column(name = "AM_BEMERKUNG2")
	public String getNote2() {
		return note2;
	}

	public void setNote2(String note2) {
		this.note2 = note2;
	}

	@Column(name = "VUSER")
	public String getvUser() {
		return vUser;
	}

	public void setvUser(String vUser) {
		this.vUser = vUser;
	}

	@Column(name = "POWERSUPPLY_COUNT")
	public Long getPowerSupplyCount() {
		return powerSupplyCount;
	}

	public void setPowerSupplyCount(Long powerSupplyCount) {
		this.powerSupplyCount = powerSupplyCount;
	}

	@Type(type = "yes_no")
	@Column(name = "POWER_SUPPLY_1")
	public Boolean getPowerSupply1() {
		if (powerSupply1 == null)
			return null;
		return powerSupply1 == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setPowerSupply1(Boolean powerSupply1) {
		if (powerSupply1 == null) {
			this.powerSupply1 = null;
		} else {
			this.powerSupply1 = powerSupply1 == true ? 'Y' : 'N';
		}
	}

	@Type(type = "yes_no")
	@Column(name = "POWER_SUPPLY_2")
	public Boolean getPowerSupply2() {
		if (powerSupply2 == null)
			return null;
		return powerSupply2 == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setPowerSupply2(Boolean powerSupply2) {
		if (powerSupply2 == null) {
			this.powerSupply2 = null;
		} else {
			this.powerSupply2 = powerSupply2 == true ? 'Y' : 'N';
		}
	}

	@Column(name = "AM_ANSCHAFFWERT")
	public Long getAcquitionValue() {
		return acquitionValue;
	}

	public void setAcquitionValue(Long acquitionValue) {
		this.acquitionValue = acquitionValue;
	}

	@Column(name = "AM_L_SUMME")
	public Long getAmSumme() {
		return amSumme;
	}

	public void setAmSumme(Long amSumme) {
		this.amSumme = amSumme;
	}

	@Column(name = "BUCHWERT")
	public Long getPurchaseNumber() {
		return purchaseNumber;
	}

	public void setPurchaseNumber(Long purchaseNumber) {
		this.purchaseNumber = purchaseNumber;
	}

	@Column(name = "BUCHWERT_DATUM")
	public String getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(String purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	@Column(name = "INVENTAR_P69")
	public String getInventoryP69() {
		return inventoryP69;
	}

	public void setInventoryP69(String inventoryP69) {
		this.inventoryP69 = inventoryP69;
	}

	@Column(name = "CWID_VERANTW_BETR")
	public String getCwidVerantw() {
		return cwidVerantw;
	}

	public void setCwidVerantw(String cwidVerantw) {
		this.cwidVerantw = cwidVerantw;
	}

	@Column(name = "ITSET")
	public Long getItset() {
		return itset;
	}

	public void setItset(Long itset) {
		this.itset = itset;
	}

	@Column(name = "SUB_RESPONSIBLE")
	public String getSubResponsible() {
		return subResponsible;
	}

	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}

//	@Column(name = "RELEVANCE_ICS")
//	public Long getRelevantIcsNumber() {
//		return relevantIcsNumber;
//	}
//
//	public void setRelevantIcsNumber(Long relevantIcsNumber) {
//		this.relevantIcsNumber = relevantIcsNumber;
//	}

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

	@Column(name = "SAP_DESCRIPTION")
	public String getSapDescription() {
		return sapDescription;
	}

	public void setSapDescription(String sapDescription) {
		this.sapDescription = sapDescription;
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

	@Column(name = "CPU_MODEL")
	public String getCpuModel() {
		return cpuModel;
	}

	public void setCpuModel(String cpuModel) {
		this.cpuModel = cpuModel;
	}

	@Column(name = "CPU_COUNT")
	public Long getCpuCount() {
		return cpuCount;
	}

	public void setCpuCount(Long cpuCount) {
		this.cpuCount = cpuCount;
	}

	@Column(name = "RAM_MEMORY")
	public Long getRamMemory() {
		return ramMemory;
	}

	public void setRamMemory(Long ramMemory) {
		this.ramMemory = ramMemory;
	}

	@Column(name = "INT_DISK_SPACE")
	public Float getIntDiskSpace() {
		return intDiskSpace;
	}

	public void setIntDiskSpace(Float intDiskSpace) {
		this.intDiskSpace = intDiskSpace;
	}

	@Column(name = "EXT_DISK_SPACE")
	public Float getExtDiskSpace() {
		return extDiskSpace;
	}

	public void setExtDiskSpace(Float extDiskSpace) {
		this.extDiskSpace = extDiskSpace;
	}

	@Column(name = "CPU_SPEED")
	public Float getCpuSpeed() {
		return cpuSpeed;
	}

	public void setCpuSpeed(Float cpuSpeed) {
		this.cpuSpeed = cpuSpeed;
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

	@Column(name = "HEIGHT_RACKUNITS")
	public Long getHeightRackUnits() {
		return heightRackUnits;
	}

	public void setHeightRackUnits(Long heightRackUnits) {
		this.heightRackUnits = heightRackUnits;
	}

	@Column(name = "POWER_CONSUMPTION")
	public Long getPowerConsumption() {
		return powerConsumption;
	}

	public void setPowerConsumption(Long powerConsumption) {
		this.powerConsumption = powerConsumption;
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

	@Column(name = "GXP_FLAG", insertable = false, updatable = false)
	public String getGxpFlag() {
		return gxpFlag;
	}

	public void setGxpFlag(String gxpFlag) {
		this.gxpFlag = gxpFlag;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "COMMERCIAL_STATUS_ID")
	public LifecycleSubStat getCommercialStatus() {
		return commercialStatus;
	}

	public void setCommercialStatus(LifecycleSubStat commercialStatus) {
		this.commercialStatus = commercialStatus;
	}

	@Column(name = "CONTRACT_FOR_SERVICE")
	public String getContactForService() {
		return contactForService;
	}

	public void setContactForService(String contactForService) {
		this.contactForService = contactForService;
	}

	@Column(name = "GXP_FLAG")
	public String getAcRequest() {
		return acRequest;
	}

	public void setAcRequest(String acRequest) {
		this.acRequest = acRequest;
	}

	@Column(name = "AC_REQUEST_END")
	public Date getAcRequestEndDate() {
		return acRequestEndDate;
	}

	public void setAcRequestEndDate(Date acRequestEndDate) {
		this.acRequestEndDate = acRequestEndDate;
	}

	@Column(name = "ORDER_NUMBER")
	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	@Column(name = "SPECIFICS")
	public String getSpecifics() {
		return specifics;
	}

	public void setSpecifics(String specifics) {
		this.specifics = specifics;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SERVICE_CONTRACT_ID")
	public ServiceContract getServiceContract() {
		return serviceContract;
	}

	public void setServiceContract(ServiceContract serviceContract) {
		this.serviceContract = serviceContract;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SEVERITY_LEVEL_ID")
	public SeverityLevel getSeverityLevel() {
		return severityLevel;
	}

	public void setSeverityLevel(SeverityLevel severityLevel) {
		this.severityLevel = severityLevel;
	}

	@Column(name = "HBA_COUNT")
	public Long getHbaCount() {
		return hbaCount;
	}

	public void setHbaCount(Long hbaCount) {
		this.hbaCount = hbaCount;
	}

	@Column(name = "LAN_COUNT")
	public Long getLanCount() {
		return lanCount;
	}

	public void setLanCount(Long lanCount) {
		this.lanCount = lanCount;
	}

	@Column(name = "CPU_CORE_COUNT")
	public Long getCpuCoreCount() {
		return cpuCoreCount;
	}

	public void setCpuCoreCount(Long cpuCoreCount) {
		this.cpuCoreCount = cpuCoreCount;
	}

	@Override
	public String toString() {
		return "HardwareComponent [id=" + id + ", name=" + name + ", assetId="
				+ assetId + ", relevantItsec=" + relevantItsec
				+ ", technicalMaster=" + technicalMaster + ", technicalNumber="
				+ technicalNumber + ", schrank=" + schrank + ", schrankId="
				+ schrankId + ", serialNumber=" + serialNumber
				+ ", inventoryNumber=" + inventoryNumber
				+ ", lifecycleSubStat=" + lifecycleSubStat
				+ ", lifecycleSubStatId=" + lifecycleSubStatId
				+ ", hardwareCategory1=" + hardwareCategory1
				+ ", hardwareCategory1Id=" + hardwareCategory1Id
				+ ", hardwareCategory2=" + hardwareCategory2
				+ ", hardwareCategory2Id=" + hardwareCategory2Id
				+ ", hardwareCategory3=" + hardwareCategory3
				+ ", hardwareCategory3Id=" + hardwareCategory3Id
				+ ", hardwareCategory4=" + hardwareCategory4
				+ ", hardwareCategory4Id=" + hardwareCategory4Id
				+ ", hardwareComponent=" + hardwareComponent
				+ ", operationalStatus=" + operationalStatus
				+ ", operationalStatusId=" + operationalStatusId
				+ ", hersteller=" + hersteller + ", herstellerId="
				+ herstellerId + ", inventoryOld=" + inventoryOld + ", konto="
				+ konto + ", kontoId=" + kontoId + ", startDate=" + startDate
				+ ", accessDate=" + accessDate + ", endDate=" + endDate
				+ ", serviceNumber=" + serviceNumber + ", bestSellText="
				+ bestSellText + ", amBanf=" + amBanf + ", amKommision="
				+ amKommision + ", sla=" + sla + ", note1=" + note1
				+ ", note2=" + note2 + ", vUser=" + vUser
				+ ", powerSupplyCount=" + powerSupplyCount + ", powerSupply1="
				+ powerSupply1 + ", powerSupply2=" + powerSupply2
				+ ", acquitionValue=" + acquitionValue + ", amSumme=" + amSumme
				+ ", purchaseNumber=" + purchaseNumber + ", purchaseDate="
				+ purchaseDate + ", inventoryP69=" + inventoryP69
				+ ", cwidVerantw=" + cwidVerantw + ", itset=" + itset
				+ ", subResponsible=" + subResponsible  + ", requester=" + requester
				+ ", sampleTestDate=" + sampleTestDate + ", sampleTestResult="
				+ sampleTestResult + ", partner=" + partner
				+ ", sapDescription=" + sapDescription + ", syncTimestamp="
				+ syncTimestamp + ", syncConfig=" + syncConfig
				+ ", duplicateSer=" + duplicateSer + ", duplicateInv="
				+ duplicateInv + ", inventoryStockNumber="
				+ inventoryStockNumber + ", cpuModel=" + cpuModel
				+ ", cpuCount=" + cpuCount + ", ramMemory=" + ramMemory
				+ ", intDiskSpace=" + intDiskSpace + ", extDiskSpace="
				+ extDiskSpace + ", cpuSpeed=" + cpuSpeed + ", vbp=" + vbp
				+ ", salesPrice=" + salesPrice + ", purchaseName="
				+ purchaseName + ", heightRackUnits=" + heightRackUnits
				+ ", powerConsumption=" + powerConsumption
				+ ", lastSyncTimestamp=" + lastSyncTimestamp
				+ ", lastSyncSource=" + lastSyncSource + ", syncing=" + syncing
				+ ", gxpFlag=" + gxpFlag + ", commercialStatus="
				+ commercialStatus + ", contactForService=" + contactForService
				+ ", acRequest=" + acRequest + ", acRequestEndDate="
				+ acRequestEndDate + ", orderNumber=" + orderNumber
				+ ", specifics=" + specifics + ", serviceContract="
				+ serviceContract + ", severityLevel=" + severityLevel
				+ ", hbaCount=" + hbaCount + ", lanCount=" + lanCount
				+ ", cpuCoreCount=" + cpuCoreCount + "]";
	}
	
	

}
