package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.CiBaseDTO;


public class CiDetailParameterOutput<T extends CiBaseDTO> {// extends BaseDTO

//	private RoomDTO roomDTO;
//
//	public RoomDTO getRoomDTO() {
//		return roomDTO;
//	}
//
//	public void setRoomDTO(RoomDTO roomDTO) {
//		this.roomDTO = roomDTO;
//	}

	private T detailDTO;

//	public T getCiDetailDTO() {
//		return detailDTO;
//	}
	
	public T getRoomDTO() {
		return detailDTO;
	}

	public void setCiDetailDTO(T detailDTO) {
		this.detailDTO = detailDTO;
	}
}
