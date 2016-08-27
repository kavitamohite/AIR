package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "BuildingWSService", portName = "BuildingWSPort")
public class BuildingWSDelegate {
	BuildingWS buildingWS = new BuildingWS();
	
	public CiEntityEditParameterOutput saveBuilding(BuildingEditParameterInput editInput) {
		return buildingWS.saveBuilding(editInput);
	}

	public CiEntityEditParameterOutput deleteBuilding(BuildingEditParameterInput editInput) {
		return buildingWS.deleteBuilding(editInput);
	}
	
	public CiEntityEditParameterOutput createBuilding(BuildingEditParameterInput editInput) {
		return buildingWS.createBuilding(editInput);
	}
	
	
	public CiEntityEditParameterOutput saveBuildingArea(BuildingAreaEditParameterInput editInput) {
		return buildingWS.saveBuildingArea(editInput);
	}

	public CiEntityEditParameterOutput deleteAreaBuilding(BuildingAreaEditParameterInput editInput) {
		return buildingWS.deleteBuildingArea(editInput);
	}
	
	public CiEntityEditParameterOutput createBuildingArea(BuildingAreaEditParameterInput editInput) {
		return buildingWS.createBuildingArea(editInput);
	}
	
	
	public KeyValueOutput getBuildingsByBuildingArea(CiDetailParameterInput input) {//CiDetailParameterOutput
		return buildingWS.getBuildingsByBuildingArea(input);
	}
	
	public KeyValueDTO[] findBuildingsByTerrainId(DefaultDataInput detailInput) {
		return buildingWS.findBuildingsByTerrainId(detailInput.getId());
	}
	
	public KeyValueDTO[] findBuildingAreasByBuildingId(DefaultDataInput detailInput) {
		return buildingWS.findBuildingAreasByBuildingId(detailInput.getId());
	}
	
	public KeyValueDTO[] findBuildingsBySiteId(DefaultDataInput input){
		return buildingWS.findBuildingsBySiteId(input.getId());
	}
}