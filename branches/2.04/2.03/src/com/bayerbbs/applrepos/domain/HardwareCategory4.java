package com.bayerbbs.applrepos.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "HW_KATEGORIE4")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "HwCategorySeq4", sequenceName = "TBADM.SEQ_HW_KATEGORIE4")
@NamedQueries({
	@NamedQuery(name="findCategory4byKategory3Id", query="FROM HardwareCategory4 WHERE  kategory3Id=:kategory3Id")
})
public class HardwareCategory4 {
	private Long id;// HW_KATEGORIE1_ID NOT NULL NUMBER
	private String hwKategory1;// HW_KATEGORIE1 NOT NULL VARCHAR2(160)
	private String text;// HW_KATEGORIE1_TXT VARCHAR2(1020)
	private HardwareCategory3 hwCategory3; // HW_KATEGORIE3_ID NOT NULL NUMBER
	private Long heightRackunits; // HEIGHT_RACKUNITS NUMBER
	private String cpuModel;// CPU_MODEL VARCHAR2(90)
	private Long cpuCount;// CPU_COUNT NUMBER
	private Long ramMemory;// RAM_MEMORY NUMBER
	private Long intDiskSpace;// INT_DISK_SPACE NUMBER
	private Long extDiscSpace;// EXT_DISK_SPACE NUMBER
	private Long cpuSpeed;// CPU_SPEED NUMBER
	private Long powerSupplyCount;// POWERSUPPLY_COUNT NUMBER
	private Long powerConsumption;// POWER_CONSUMPTION NUMBER
	private Long expectedLifetimeMonths;// EXPECTED_LIFETIME_MONTHS NUMBER
	private Character masterAsset;// MASTER_ASSET VARCHAR2(1)
	private String tShirtSize;// T_SHIRT_SIZE VARCHAR2(3)
	private Long cpuCoreCount;// CPU_CORE_COUNT NUMBER
	private LifecycleSubStat lifecycleSubStat;// LC_SUB_STATUS_ID NUMBER
	private Long kategory3Id;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "HwCategorySeq4")
	@Column(name = "HW_KATEGORIE4_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "HW_KATEGORIE4")
	public String getHwKategory1() {
		return hwKategory1;
	}

	public void setHwKategory1(String hwKategory1) {
		this.hwKategory1 = hwKategory1;
	}

	@Column(name = "HW_KATEGORIE4_TXT")
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HW_KATEGORIE3_ID")
	public HardwareCategory3 getHwCategory3() {
		return hwCategory3;
	}

	public void setHwCategory3(HardwareCategory3 hwCategory3) {
		this.hwCategory3 = hwCategory3;
	}
	@Column(name = "HW_KATEGORIE3_ID", insertable=false, updatable=false)
	public Long getKategory3Id() {
		return kategory3Id;
	}
	public void setKategory3Id(Long kategory3Id) {
		this.kategory3Id = kategory3Id;
	}

	@Column(name = "HEIGHT_RACKUNITS ")
	public Long getHeightRackunits() {
		return heightRackunits;
	}

	public void setHeightRackunits(Long heightRackunits) {
		this.heightRackunits = heightRackunits;
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
	public Long getIntDiskSpace() {
		return intDiskSpace;
	}

	public void setIntDiskSpace(Long intDiskSpace) {
		this.intDiskSpace = intDiskSpace;
	}

	@Column(name = "EXT_DISK_SPACE")
	public Long getExtDiscSpace() {
		return extDiscSpace;
	}

	public void setExtDiscSpace(Long extDiscSpace) {
		this.extDiscSpace = extDiscSpace;
	}

	@Column(name = "CPU_SPEED")
	public Long getCpuSpeed() {
		return cpuSpeed;
	}

	public void setCpuSpeed(Long cpuSpeed) {
		this.cpuSpeed = cpuSpeed;
	}

	@Column(name = "POWERSUPPLY_COUNT")
	public Long getPowerSupplyCount() {
		return powerSupplyCount;
	}

	public void setPowerSupplyCount(Long powerSupplyCount) {
		this.powerSupplyCount = powerSupplyCount;
	}

	@Column(name = "POWER_CONSUMPTION")
	public Long getPowerConsumption() {
		return powerConsumption;
	}

	public void setPowerConsumption(Long powerConsumption) {
		this.powerConsumption = powerConsumption;
	}

	@Column(name = "EXPECTED_LIFETIME_MONTHS")
	public Long getExpectedLifetimeMonths() {
		return expectedLifetimeMonths;
	}

	public void setExpectedLifetimeMonths(Long expectedLifetimeMonths) {
		this.expectedLifetimeMonths = expectedLifetimeMonths;
	}

	@Type(type = "yes_no")
	@Column(name = "MASTER_ASSET")
	public Boolean getMasterAsset() {
		if (masterAsset == null)
			return null;
		return masterAsset == 'Y' ? Boolean.TRUE : Boolean.FALSE;
	}

	public void setMasterAsset(Boolean masterAsset) {
		if (masterAsset == null) {
			this.masterAsset = null;
		} else {
			this.masterAsset = masterAsset == true ? 'Y' : 'N';
		}
	}

	@Column(name = "T_SHIRT_SIZE")
	public String gettShirtSize() {
		return tShirtSize;
	}

	public void settShirtSize(String tShirtSize) {
		this.tShirtSize = tShirtSize;
	}

	@Column(name = "CPU_CORE_COUNT")
	public Long getCpuCoreCount() {
		return cpuCoreCount;
	}

	public void setCpuCoreCount(Long cpuCoreCount) {
		this.cpuCoreCount = cpuCoreCount;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LC_SUB_STATUS_ID")
	public LifecycleSubStat getLifecycleSubStat() {
		return lifecycleSubStat;
	}

	public void setLifecycleSubStat(LifecycleSubStat lifecycleSubStat) {
		this.lifecycleSubStat = lifecycleSubStat;
	}

}
