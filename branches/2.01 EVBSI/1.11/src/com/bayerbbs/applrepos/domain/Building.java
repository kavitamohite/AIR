package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "GEBAEUDE")
public class Building extends CiBase implements Serializable {
	private static final long serialVersionUID = 2431254723377623846L;
	
//	private Long buildingId;
//	private String buildingName;
//	private String buildingAlias;
	private String buildingCode;
	private Long terrainId;
	
	private String street;
	private String streetNumber;
	private String postalCode;
	private String location;
	
    private Set<BuildingArea> buildingAreas;
	
	
//	@Transient
//	public Long getId() {
//		return getBuildingId();
//	}

	@Id
	@Column(name = "GEBAEUDE_ID")
	public Long getBuildingId() {
		return getId();//buildingId;
	}
	public void setBuildingId(Long buildingId) {
		setId(buildingId);
//		this.buildingId = buildingId;
	}

	
	@Column(name = "GEBAEUDE_NAME")
	public String getBuildingName() {
		return getName();//buildingName;
	}
	public void setBuildingName(String buildingName) {
		setName(buildingName);
//		this.buildingName = buildingName;
	}

	
	@Column(name = "ALIAS")
	public String getBuildingAlias() {
		return getAlias();//buildingAlias;
	}
	public void setBuildingAlias(String buildingAlias) {
		setAlias(buildingAlias);
//		this.buildingAlias = buildingAlias;
	}

	
	@Column(name = "GEBAEUDE_CODE")
	public String getBuildingCode() {
		return buildingCode;
	}
	public void setBuildingCode(String buildingCode) {
		this.buildingCode = buildingCode;
	}

	
	@Column(name = "TERRAIN_ID")
	public Long getTerrainId() {
		return terrainId;
	}
	public void setTerrainId(Long terrainId) {
		this.terrainId = terrainId;
	}

	
	@Column(name = "STRASSE")
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}

	
	@Column(name = "NR")
	public String getStreetNumber() {
		return streetNumber;
	}
	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	
	@Column(name = "PLZ")
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	
	@Column(name = "ORT")
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "building")//, mappedBy = "building"
	public Set<BuildingArea> getBuildingAreas() {
		return buildingAreas;
	}
	public void setBuildingAreas(Set<BuildingArea> buildingAreas) {
		this.buildingAreas = buildingAreas;
	}
}