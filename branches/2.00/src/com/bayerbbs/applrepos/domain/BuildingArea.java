package com.bayerbbs.applrepos.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "BUILDING_AREA")
public class BuildingArea extends CiBase implements Serializable {
	private static final long serialVersionUID = -3547134682025456121L;
	
	private Long buldingId;
	
    private Set<Room> rooms;
	private Building building;

	
	@Id
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
	public Long getBuldingId() {
		return buldingId;
	}
	public void setBuldingId(Long buldingId) {
		this.buldingId = buldingId;
	}
	
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "buildingArea")//EAGER
	public Set<Room> getRooms() {
		return rooms;
	}
	public void setRooms(Set<Room> rooms) {
		this.rooms = rooms;
	}
}