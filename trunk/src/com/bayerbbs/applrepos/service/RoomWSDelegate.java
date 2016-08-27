package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "RoomWSService", portName = "RoomWSPort")
public class RoomWSDelegate {
	RoomWS roomWSPort = new RoomWS();
	
	public CiEntityEditParameterOutput saveRoom(RoomEditParameterInput editInput) {
		return roomWSPort.saveRoom(editInput);
	}

	public CiEntityEditParameterOutput deleteRoom(RoomEditParameterInput editInput) {
		return roomWSPort.deleteRoom(editInput);
	}
	
	public CiEntityEditParameterOutput createRoom(RoomEditParameterInput editInput) {
		return roomWSPort.createRoom(editInput);
	}
	
	public KeyValueDTO[] findRoomsByBuildingAreaId(DefaultDataInput detailInput) {
		return roomWSPort.findRoomsByBuildingAreaId(detailInput.getId());
	}
	
	public KeyValueDTO[] findRoomsByBuildingId(DefaultDataInput detailInput) {
		return roomWSPort.findRoomsByBuildingId(detailInput.getId());
	}
}