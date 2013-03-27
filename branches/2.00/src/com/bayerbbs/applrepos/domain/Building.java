package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "GEBAEUDE")
@SequenceGenerator(name = "MySeqGebaeude", sequenceName = "TBADM.SEQ_GEBAEUDE")
public class Building extends CiBase1 implements Serializable {
	private static final long serialVersionUID = 2431254723377623846L;
	
	private String alias;
	private String buildingCode;
	private Long terrainId;
	
	private String street;
	private String streetNumber;
	private String postalCode;
	private String location;
	
    private Set<BuildingArea> buildingAreas;
    private Terrain terrain;


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqGebaeude")
	@Column(name = "GEBAEUDE_ID")
	public Long getBuildingId() {
		return getId();
	}
	public void setBuildingId(Long buildingId) {
		setId(buildingId);
	}
	
	@Column(name = "GEBAEUDE_NAME")
	public String getBuildingName() {
		return getName();
	}
	public void setBuildingName(String buildingName) {
		setName(buildingName);
	}
	
	@Column(name = "ALIAS")
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	
	@Column(name = "GEBAEUDE_CODE")
	public String getBuildingCode() {
		return buildingCode;
	}
	public void setBuildingCode(String buildingCode) {
		this.buildingCode = buildingCode;
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
	
	
	@ManyToOne
	@JoinColumn(name="TERRAIN_ID")
	public Terrain getTerrain() {
		return terrain;
	}
	public void setTerrain(Terrain terrain) {
		this.terrain = terrain;
	}
	@Column(name = "TERRAIN_ID", insertable=false, updatable=false)
	public Long getTerrainId() {
		return terrainId;
	}
	public void setTerrainId(Long terrainId) {
		this.terrainId = terrainId;
	}
	
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "building")//
	public Set<BuildingArea> getBuildingAreas() {
		return buildingAreas;
	}
	public void setBuildingAreas(Set<BuildingArea> buildingAreas) {
		this.buildingAreas = buildingAreas;
	}
}