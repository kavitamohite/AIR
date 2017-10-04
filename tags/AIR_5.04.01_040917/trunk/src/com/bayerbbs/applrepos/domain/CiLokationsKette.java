package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="SEARCH_LOC")//SEARCH_LOC ist ein Transbase VIEW
public class CiLokationsKette implements Serializable {
	private static final long serialVersionUID = -1270064907617489118L;
	
	private String hasMarkedDeletedItems;
	private Date standordLoeschung;
	private Date terrainLoeschung;
	private Date gebaeudeLoeschung;
	private Date aereaLoeschung;
	private Date raumLoeschung;
	private Date schrankLoeschung;
	
	private Long landId;
	private String landName;
	private String landNameEn;
	private String landKennzeichen;
	
	private Long standortId;
	private String standortName;
	private String standortCode;
	
	private Long terrainId;
	private String terrainName;
	
	private Long gebaeudeId;
	private String gebaeudeName;
	
	private Long areaId;
	private String areaName;
	
	private Long raumId;
	private String raumName;
	
	private Long schrankId;
	private String schrankName;


	@Column(name = "DEL")
	public String getHasMarkedDeletedItems() {
		return hasMarkedDeletedItems;
	}
	public void setHasMarkedDeletedItems(String hasMarkedDeletedItems) {
		this.hasMarkedDeletedItems = hasMarkedDeletedItems;
	}

	@Column(name = "DEL_STD")
	public Date getStandordLoeschung() {
		return standordLoeschung;
	}
	public void setStandordLoeschung(Date standordLoeschung) {
		this.standordLoeschung = standordLoeschung;
	}

	@Column(name = "DEL_TER")
	public Date getTerrainLoeschung() {
		return terrainLoeschung;
	}
	public void setTerrainLoeschung(Date terrainLoeschung) {
		this.terrainLoeschung = terrainLoeschung;
	}

	@Column(name = "DEL_GEB")
	public Date getGebaeudeLoeschung() {
		return gebaeudeLoeschung;
	}
	public void setGebaeudeLoeschung(Date gebaeudeLoeschung) {
		this.gebaeudeLoeschung = gebaeudeLoeschung;
	}

	@Column(name = "DEL_BDA")
	public Date getAereaLoeschung() {
		return aereaLoeschung;
	}
	public void setAereaLoeschung(Date aereaLoeschung) {
		this.aereaLoeschung = aereaLoeschung;
	}

	@Column(name = "DEL_RAU")
	public Date getRaumLoeschung() {
		return raumLoeschung;
	}
	public void setRaumLoeschung(Date raumLoeschung) {
		this.raumLoeschung = raumLoeschung;
	}

	@Column(name = "DEL_SCH")
	public Date getSchrankLoeschung() {
		return schrankLoeschung;
	}
	public void setSchrankLoeschung(Date schrankLoeschung) {
		this.schrankLoeschung = schrankLoeschung;
	}

	@Column(name = "LAND_ID")
	public Long getLandId() {
		return landId;
	}
	public void setLandId(Long landId) {
		this.landId = landId;
	}
	@Column(name = "LAND_NAME")
	public String getLandName() {
		return landName;
	}
	public void setLandName(String landName) {
		this.landName = landName;
	}
	@Column(name = "LAND_NAME_EN")
	public String getLandNameEn() {
		return landNameEn;
	}
	public void setLandNameEn(String landNameEn) {
		this.landNameEn = landNameEn;
	}
	@Column(name = "LAND_KENNZEICHEN")
	public String getLandKennzeichen() {
		return landKennzeichen;
	}
	public void setLandKennzeichen(String landKennzeichen) {
		this.landKennzeichen = landKennzeichen;
	}

	@Column(name = "STANDORT_ID")
	public Long getStandortId() {
		return standortId;
	}
	public void setStandortId(Long standortId) {
		this.standortId = standortId;
	}

	@Column(name = "STANDORT_NAME")
	public String getStandortName() {
		return standortName;
	}
	public void setStandortName(String standortName) {
		this.standortName = standortName;
	}

	@Column(name = "STANDORT_CODE")
	public String getStandortCode() {
		return standortCode;
	}
	public void setStandortCode(String standortCode) {
		this.standortCode = standortCode;
	}

	@Column(name = "TERRAIN_ID")
	public Long getTerrainId() {
		return terrainId;
	}
	public void setTerrainId(Long terrainId) {
		this.terrainId = terrainId;
	}

	@Column(name = "TERRAIN_NAME")
	public String getTerrainName() {
		return terrainName;
	}
	public void setTerrainName(String terrainName) {
		this.terrainName = terrainName;
	}

	@Column(name = "GEBAEUDE_ID")
	public Long getGebaeudeId() {
		return gebaeudeId;
	}
	public void setGebaeudeId(Long gebaeudeId) {
		this.gebaeudeId = gebaeudeId;
	}

	@Column(name = "GEBAEUDE_NAME")
	public String getGebaeudeName() {
		return gebaeudeName;
	}
	public void setGebaeudeName(String gebaeudeName) {
		this.gebaeudeName = gebaeudeName;
	}

	@Column(name = "AREA_ID")
	public Long getAreaId() {
		return areaId;
	}
	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}

	@Column(name = "AREA_NAME")
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	@Column(name = "RAUM_ID")
	public Long getRaumId() {
		return raumId;
	}
	public void setRaumId(Long raumId) {
		this.raumId = raumId;
	}

	@Column(name = "RAUM_NAME")
	public String getRaumName() {
		return raumName;
	}
	public void setRaumName(String raumName) {
		this.raumName = raumName;
	}

	@Id//ERSATZ PK
	@Column(name = "SCHRANK_ID")
	public Long getSchrankId() {
		return schrankId;
	}
	public void setSchrankId(Long schrankId) {
		this.schrankId = schrankId;
	}

	@Column(name = "SCHRANK_NAME")
	public String getSchrankName() {
		return schrankName;
	}
	public void setSchrankName(String schrankName) {
		this.schrankName = schrankName;
	}
}