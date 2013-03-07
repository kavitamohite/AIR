package com.bayerbbs.applrepos.service;


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
}