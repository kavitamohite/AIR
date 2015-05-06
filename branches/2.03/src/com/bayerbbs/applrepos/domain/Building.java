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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "GEBAEUDE")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "MySeqGebaeude", sequenceName = "SEQ_GEBAEUDE")
@NamedQueries({
//	@NamedQuery(name="findByNameOrAliasAndTerrainId", query="FROM Building b WHERE (b.buildingName=:name OR b.alias=:alias) AND terrainId=:terrainId"),
	@NamedQuery(name="findByNameOrAliasAndTerrainId", query="FROM Building b WHERE (upper(b.buildingName)=upper(:name) OR upper(b.alias)=upper(:alias) OR upper(b.buildingName)=upper(:alias) OR upper(b.alias)=upper(:name)) AND terrainId=:terrainId"),
	@NamedQuery(name="findByNameAndTerrainId", query="FROM Building b WHERE upper(b.buildingName)=upper(:name) AND terrainId=:terrainId")
})
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
    
    //vandana
    private String Provider_Name;
    private String Provider_Address; 
    
    @Column(name = "PROVIDER_NAME")
	public String getProvider_Name() {
		return Provider_Name;
	}
	public void setProvider_Name(String Provider_Name) {
		this.Provider_Name = Provider_Name;
	}
	
	@Column(name = "PROVIDER_ADDRESS")
	public String getProvider_Address() {
		return Provider_Address;
	}
	public void setProvider_Address(String Provider_Address) {
		this.Provider_Address = Provider_Address;
	}
	
    //ended vandana


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