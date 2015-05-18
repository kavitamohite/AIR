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
@Table(name = "BUILDING_AREA")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "MySeqBuildingArea", sequenceName = "TBADM.SEQ_BUILDING_AREA")
@NamedQueries({
	@NamedQuery(name="findByNameAndBuildingId", query="FROM BuildingArea ba WHERE upper(ba.buildingAreaName)=upper(:name) AND buildingId=:buildingId")
})
public class BuildingArea extends CiBase1 implements Serializable {
	private static final long serialVersionUID = -3547134682025456121L;
	
	private Long buildingId;
	
    private Set<Room> rooms;
	private Building building;
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
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqBuildingArea")
	@Column(name = "AREA_ID")
	public Long getBuildingAreaId() {
		return getId();
	}
	public void setBuildingAreaId(Long buildingAreaId) {
		setId(buildingAreaId);
	}

	
	@Column(name = "AREA_NAME")
	public String getBuildingAreaName() {
		return getName();//buildingName;
	}
	public void setBuildingAreaName(String buildingAreaName) {
		setName(buildingAreaName);
//		this.buildingName = buildingName;
	}

	@ManyToOne
	@JoinColumn(name="GEBAEUDE_ID")
	public Building getBuilding() {
		return building;
	}
	public void setBuilding(Building building) {
		this.building = building;
	}
	@Column(name = "GEBAEUDE_ID", insertable=false, updatable=false)
	public Long getBuildingId() {
		return buildingId;
	}
	public void setBuildingId(Long buildingId) {
		this.buildingId = buildingId;
	}
	
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "buildingArea")//EAGER
	public Set<Room> getRooms() {
		return rooms;
	}
	public void setRooms(Set<Room> rooms) {
		this.rooms = rooms;
	}
}