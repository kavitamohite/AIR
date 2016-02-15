package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
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
@Table(name = "KONTO")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "KontoSeq", sequenceName = "TBADM.SEQ_KONTO")
public class Konto extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -4649584367492656471L;
	private Long id;
	private String name;
	private String art;
	private String cwidVerantw;
	private String beschreibung;
	private Long itset;
	private String subResponsible;
	private Long sisnetConfig;
	private Timestamp lastSync;
	private String lastSyncSource;
	private String syncing;
	private String khinr;
	private Long sisnetConfigSwitch;
	private Long costCenterProtected;
	private Konto deliveryBlock;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "KontoSeq")
	@Column(name = "KONTO_ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "KONTO_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "KONTO_ART")
	public String getArt() {
		return art;
	}

	public void setArt(String art) {
		this.art = art;
	}

	@Column(name = "CWID_VERANTW")
	public String getCwidVerantw() {
		return cwidVerantw;
	}

	public void setCwidVerantw(String cwidVerantw) {
		this.cwidVerantw = cwidVerantw;
	}

	@Column(name = "BESCHREIBUNG")
	public String getBeschreibung() {
		return beschreibung;
	}

	public void setBeschreibung(String beschreibung) {
		this.beschreibung = beschreibung;
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

	@Column(name = "SISNET_CONFIG")
	public Long getSisnetConfig() {
		return sisnetConfig;
	}

	public void setSisnetConfig(Long sisnetConfig) {
		this.sisnetConfig = sisnetConfig;
	}

	@Column(name = "LAST_SYNC_TIMESTAMP")
	public Timestamp getLastSync() {
		return lastSync;
	}

	public void setLastSync(Timestamp lastSync) {
		this.lastSync = lastSync;
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

	@Column(name = "KHINR")
	public String getKhinr() {
		return khinr;
	}

	public void setKhinr(String khinr) {
		this.khinr = khinr;
	}

	@Column(name = "SISNET_CONFIG_SWITCH")
	public Long getSisnetConfigSwitch() {
		return sisnetConfigSwitch;
	}

	public void setSisnetConfigSwitch(Long sisnetConfigSwitch) {
		this.sisnetConfigSwitch = sisnetConfigSwitch;
	}

	@Column(name = "COSTCENTERPROTECTED")
	public Long getCostCenterProtected() {
		return costCenterProtected;
	}

	public void setCostCenterProtected(Long costCenterProtected) {
		this.costCenterProtected = costCenterProtected;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "DELIVERYBLOCK_ID")
	public Konto getDeliveryBlock() {
		return deliveryBlock;
	}

	public void setDeliveryBlock(Konto deliveryBlock) {
		this.deliveryBlock = deliveryBlock;
	}
}
