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
@Table(name = "BUILDING_AREA")
@SequenceGenerator(name = "MySeqBuildingArea", sequenceName = "TBADM.SEQ_BUILDING_AREA")
public class BuildingArea extends CiBase1 implements Serializable {
	private static final long serialVersionUID = -3547134682025456121L;
	
	private Long buildingId;
	
    private Set<Room> rooms;
	private Building building;

	
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