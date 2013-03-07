package com.bayerbbs.applrepos.service;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "TerrainWSService", portName = "TerrainWSPort")
public class TerrainWSDelegate {
	TerrainWS terrainWS = new TerrainWS();
	
	public CiEntityEditParameterOutput saveTerrain(TerrainEditParameterInput editInput) {
		return terrainWS.saveTerrain(editInput);
	}

	public CiEntityEditParameterOutput deleteTerrain(TerrainEditParameterInput editInput) {
		return terrainWS.deleteTerrain(editInput);
	}
	
	public CiEntityEditParameterOutput createTerrain(TerrainEditParameterInput editInput) {
		return terrainWS.createTerrain(editInput);
	}
	
	public CiEntityEditParameterOutput saveTerrainArea(TerrainEditParameterInput editInput) {
		return terrainWS.saveTerrain(editInput);
	}

	public CiEntityEditParameterOutput deleteAreaTerrain(TerrainEditParameterInput editInput) {
		return terrainWS.deleteTerrain(editInput);
	}
	
	public CiEntityEditParameterOutput createTerrainArea(TerrainEditParameterInput editInput) {
		return terrainWS.createTerrain(editInput);
	}
}