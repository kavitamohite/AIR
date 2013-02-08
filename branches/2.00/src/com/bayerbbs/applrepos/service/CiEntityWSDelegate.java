package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "CiEntityWSService", portName = "CiEntityWSPort")
public class CiEntityWSDelegate {

	com.bayerbbs.applrepos.service.CiEntityWS ciEntityWS = new com.bayerbbs.applrepos.service.CiEntityWS();

	public CiEntityParameterOutput findCiEntities(CiEntityParameterInput input) {
		return ciEntityWS.findCiEntities(input);
	}

	public DwhEntityParameterOutput findByTypeAndName(CiEntityParameterInput input) {
		return ciEntityWS.findByTypeAndName(input);
	}
	
	public DwhEntityParameterOutput getDwhEntityRelations(CiEntityParameterInput input) {
		return ciEntityWS.getDwhEntityRelations(input);
	}
	
	public RoomDTO getRoom(CiDetailParameterInput input) {//CiDetailParameterOutput
		return ciEntityWS.getRoom(input);
	}
	
	public BuildingDTO getBuilding(CiDetailParameterInput input) {//CiDetailParameterOutput
		return ciEntityWS.getBuilding(input);
	}
}