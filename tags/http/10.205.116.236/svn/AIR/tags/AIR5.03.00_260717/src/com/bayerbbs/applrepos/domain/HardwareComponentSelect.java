package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "HARDWAREKOMPONENTE")
public class HardwareComponentSelect extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = 2374268074399112699L;

	private Long id;

	private String name;

	private String assetId;

	private Long relevantItsec;

	private String technicalMaster;

	private String technicalNumber;



	

	private String serialNumber;

	

	private String inventoryP69;
	
	private String inventoryStockNumber;

	

	

	
    @Id
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


	

	@Column(name = "SERIEN_NR")
	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	
	@Column(name = "INVENTAR_P69")
	public String getInventoryP69() {
		return inventoryP69;
	}

	public void setInventoryP69(String inventoryP69) {
		this.inventoryP69 = inventoryP69;
	}
	
	@Column(name = "INVENTARNUMMER_OHNE")
	public String getInventoryStockNumber() {
		return inventoryStockNumber;
	}

	public void setInventoryStockNumber(String inventoryStockNumber) {
		this.inventoryStockNumber = inventoryStockNumber;
	}


	

	


	
	
	

	

	
	
	

	
}
