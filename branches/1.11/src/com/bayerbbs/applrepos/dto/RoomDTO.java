package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class RoomDTO extends BaseDTO implements Serializable {
	
	private static final long serialVersionUID = 1853465853927062074L;
	
	private String floor;
	private String roomType;
	private Long areaId;

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

	public Long getAreaId() {
		return areaId;
	}

	public void setAreaId(Long areaId) {
		this.areaId = areaId;
	}	

}
