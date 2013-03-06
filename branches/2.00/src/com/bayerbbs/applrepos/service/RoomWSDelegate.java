package com.bayerbbs.applrepos.service;


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
}