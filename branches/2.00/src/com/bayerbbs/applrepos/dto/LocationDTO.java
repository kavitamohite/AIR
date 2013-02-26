package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

import com.bayerbbs.applrepos.domain.CiLokationsKette;

public abstract class LocationDTO extends CiBaseDTO implements Serializable {
	private static final long serialVersionUID = 2827211748912639421L;
	
	private String hasMarkedDeletedItems;
	private Long standordLoeschung;
	private Long terrainLoeschung;
	private Long gebaeudeLoeschung;
	private Long aereaLoeschung;
	private Long raumLoeschung;
	private Long schrankLoeschung;
	
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
	
	
	public void setCiLokationsKette(CiLokationsKette kette) {
		setHasMarkedDeletedItems(kette.getHasMarkedDeletedItems());
		if(kette.getStandordLoeschung() != null)
			setStandordLoeschung(kette.getStandordLoeschung().getTime());
		if(kette.getTerrainLoeschung() != null)
			setTerrainLoeschung(kette.getTerrainLoeschung().getTime());
		if(kette.getGebaeudeLoeschung() != null)
			setGebaeudeLoeschung(kette.getGebaeudeLoeschung().getTime());
		if(kette.getAereaLoeschung() != null)
			setAereaLoeschung(kette.getAereaLoeschung().getTime());
		if(kette.getRaumLoeschung() != null)
			setRaumLoeschung(kette.getRaumLoeschung().getTime());
		if(kette.getSchrankLoeschung() != null)
			setSchrankLoeschung(kette.getSchrankLoeschung().getTime());
		
		setLandId(kette.getLandId());
		setLandName(kette.getLandName());
		setLandNameEn(kette.getLandNameEn());
		setLandKennzeichen(kette.getLandKennzeichen());
		
		setStandortId(kette.getStandortId());
		setStandortName(kette.getStandortName());
		setStandortCode(kette.getStandortCode());
		
		setTerrainId(kette.getTerrainId());
		setTerrainName(kette.getTerrainName());
		
		setGebaeudeId(kette.getGebaeudeId());
		setGebaeudeName(kette.getGebaeudeName());
		
		setAreaId(kette.getAreaId());
		setAreaName(kette.getAreaName());
		
		setRaumId(kette.getRaumId());
		setRaumName(kette.getRaumName());
		
		setSchrankId(kette.getSchrankId());
		setSchrankName(kette.getSchrankName());
	}
	

	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}
	public Long getAreaId() {
		return areaId;
	}
	public String getHasMarkedDeletedItems() {
		return hasMarkedDeletedItems;
	}
	public void setHasMarkedDeletedItems(String hasMarkedDeletedItems) {
		this.hasMarkedDeletedItems = hasMarkedDeletedItems;
	}
	public Long getStandordLoeschung() {
		return standordLoeschung;
	}
	public void setStandordLoeschung(Long standordLoeschung) {
		this.standordLoeschung = standordLoeschung;
	}
	public Long getTerrainLoeschung() {
		return terrainLoeschung;
	}
	public void setTerrainLoeschung(Long terrainLoeschung) {
		this.terrainLoeschung = terrainLoeschung;
	}
	public Long getGebaeudeLoeschung() {
		return gebaeudeLoeschung;
	}
	public void setGebaeudeLoeschung(Long gebaeudeLoeschung) {
		this.gebaeudeLoeschung = gebaeudeLoeschung;
	}
	public Long getAereaLoeschung() {
		return aereaLoeschung;
	}
	public void setAereaLoeschung(Long aereaLoeschung) {
		this.aereaLoeschung = aereaLoeschung;
	}
	public Long getRaumLoeschung() {
		return raumLoeschung;
	}
	public void setRaumLoeschung(Long raumLoeschung) {
		this.raumLoeschung = raumLoeschung;
	}
	public Long getSchrankLoeschung() {
		return schrankLoeschung;
	}
	public void setSchrankLoeschung(Long schrankLoeschung) {
		this.schrankLoeschung = schrankLoeschung;
	}
	public Long getLandId() {
		return landId;
	}
	public void setLandId(Long landId) {
		this.landId = landId;
	}
	public String getLandName() {
		return landName;
	}
	public void setLandName(String landName) {
		this.landName = landName;
	}
	public String getLandNameEn() {
		return landNameEn;
	}
	public void setLandNameEn(String landNameEn) {
		this.landNameEn = landNameEn;
	}
	public String getLandKennzeichen() {
		return landKennzeichen;
	}
	public void setLandKennzeichen(String landKennzeichen) {
		this.landKennzeichen = landKennzeichen;
	}
	public Long getStandortId() {
		return standortId;
	}
	public void setStandortId(Long standortId) {
		this.standortId = standortId;
	}
	public String getStandortName() {
		return standortName;
	}
	public void setStandortName(String standortName) {
		this.standortName = standortName;
	}
	public String getStandortCode() {
		return standortCode;
	}
	public void setStandortCode(String standortCode) {
		this.standortCode = standortCode;
	}
	public Long getTerrainId() {
		return terrainId;
	}
	public void setTerrainId(Long terrainId) {
		this.terrainId = terrainId;
	}
	public String getTerrainName() {
		return terrainName;
	}
	public void setTerrainName(String terrainName) {
		this.terrainName = terrainName;
	}
	public Long getGebaeudeId() {
		return gebaeudeId;
	}
	public void setGebaeudeId(Long gebaeudeId) {
		this.gebaeudeId = gebaeudeId;
	}
	public String getGebaeudeName() {
		return gebaeudeName;
	}
	public void setGebaeudeName(String gebaeudeName) {
		this.gebaeudeName = gebaeudeName;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public Long getRaumId() {
		return raumId;
	}
	public void setRaumId(Long raumId) {
		this.raumId = raumId;
	}
	public String getRaumName() {
		return raumName;
	}
	public void setRaumName(String raumName) {
		this.raumName = raumName;
	}
	public Long getSchrankId() {
		return schrankId;
	}
	public void setSchrankId(Long schrankId) {
		this.schrankId = schrankId;
	}
	public String getSchrankName() {
		return schrankName;
	}
	public void setSchrankName(String schrankName) {
		this.schrankName = schrankName;
	}
}