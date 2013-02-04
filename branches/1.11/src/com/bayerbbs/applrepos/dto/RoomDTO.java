package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class RoomDTO extends LocationDTO implements Serializable {
	private static final long serialVersionUID = 1853465853927062074L;
	
	private String floor;
	private String roomType;
	
	private Long severityLevelId;
	private Long businessEssentialId;


	public String getFloor() {
		return floor;
	}
	public void setFloor(String floor) {
		this.floor = floor;
	}

	public String getRoomType() {
		return roomType;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	
	public Long getSeverityLevelId() {
		return severityLevelId;
	}

	public void setSeverityLevelId(Long severityLevelId) {
		this.severityLevelId = severityLevelId;
	}

	public Long getBusinessEssentialId() {
		return businessEssentialId;
	}

	public void setBusinessEssentialId(Long businessEssentialId) {
		this.businessEssentialId = businessEssentialId;
	}
}