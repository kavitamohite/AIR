package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "RAUM")
public class Room extends CiBase implements Serializable {
	private static final long serialVersionUID = -1270064907617489118L;
	
//	private Long roomId;
//	private String roomName;
//	private String roomAlias;
	private String roomType;
	private String floor;
	
	private Long severityLevelId;
	private Long businessEssentialId;
	
	private Long buildingAreaId;
	private BuildingArea buildingArea;

	
//	@Transient
//	public Long getId() {
//		return getRoomId();
//	}

	@Id
	@Column(name = "RAUM_ID")
	public Long getRoomId() {
		return getId();//roomId;
	}

	public void setRoomId(Long roomId) {
		setId(roomId);
//		this.roomId = roomId;
	}

	@Column(name = "RAUM_NAME")
	public String getRoomName() {
		return getName();//roomName;
	}


	public void setRoomName(String roomName) {
		setName(roomName);
//		this.roomName = roomName;
	}

	@Column(name = "RAUMALIAS")
	public String getRoomAlias() {
		return getAlias();//roomAlias;
	}

	public void setRoomAlias(String roomAlias) {
		setAlias(roomAlias);
//		this.roomAlias = roomAlias;
	}

	@Column(name = "RAUM_TYP")
	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	@Column(name = "ETAGE")
	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

	
	@Column(name = "SEVERITY_LEVEL_ID")
	public Long getSeverityLevelId() {
		return severityLevelId;
	}

	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}
	
	
	@Column(name = "BUSINESS_ESSENTIAL_ID")
	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}

	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}
	
	
	
	@ManyToOne
	@JoinColumn(name="AREA_ID")
	public BuildingArea getBuildingArea() {
		return buildingArea;
	}
	public void setBuildingArea(BuildingArea buildingArea) {
		this.buildingArea = buildingArea;
	}
	@Column(name = "AREA_ID", insertable=false, updatable=false)
	public Long getBuildingAreaId() {
		return buildingAreaId;
	}

	public void setBuildingAreaId(Long areaId) {
		this.buildingAreaId = areaId;
	}
}