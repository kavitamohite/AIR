package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.domain.FunctionDTO;
import com.bayerbbs.applrepos.dto.BuildingAreaDTO;
import com.bayerbbs.applrepos.dto.BuildingDTO;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.dto.RoomDTO;
import com.bayerbbs.applrepos.dto.SchrankDTO;
import com.bayerbbs.applrepos.dto.StandortDTO;
import com.bayerbbs.applrepos.dto.TerrainDTO;


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
	
	public BuildingAreaDTO getBuildingArea(CiDetailParameterInput input) {//CiDetailParameterOutput
		return ciEntityWS.getBuildingArea(input);
	}
	
	public TerrainDTO getTerrain(CiDetailParameterInput input) {//CiDetailParameterOutput
		return ciEntityWS.getTerrain(input);
	}
	
	public StandortDTO getStandort(CiDetailParameterInput input) {//CiDetailParameterOutput
		return ciEntityWS.getStandort(input);
	}
	
	public SchrankDTO getSchrank(CiDetailParameterInput input) {//CiDetailParameterOutput
		return ciEntityWS.getSchrank(input);
	}

	public CiItemsResultDTO findCis(ApplicationSearchParamsDTO input) {//CiDetailParameterOutput CiSearchParamsDTO
		return ciEntityWS.findCis(input);
	}
	
	public ItSystemDTO getItSystem(CiDetailParameterInput input) {
		return ciEntityWS.getItSystem(input);
	}
	
	public FunctionDTO getFunction(CiDetailParameterInput input){
		return ciEntityWS.getFunction(input);
		
	}
	
	public CiEntityEditParameterOutput deleteCi(CiEntityParameterInput input) {
		return ciEntityWS.deleteCi(input);
	}
	public ComplianceTemplateParameterOutput findAllDirectLinkCIWithTemplate(CiDetailParameterInput input){
		return ciEntityWS.findAllDirectLinkCIWithTemplate(input);
	}
	
	public MassUpdateParameterOutput  getCIAttributesForMassUpdate(CiDetailParameterInput input){		
		return ciEntityWS.getCIAttributesForMassUpdate(input);		
	}
	
	public MassUpdateValueTransferParameterOutPut massUpdate(MassUpdateParameterInput  massUpdateParameterInput){
		return ciEntityWS.massUpdate(massUpdateParameterInput);
	}
	
	public ComplianceControlParameterOutput findAllCIComplianceControlForMassUpdate(CiDetailParameterInput input){
		return ciEntityWS.findAllCIComplianceControlForMassUpdate(input);
	}

}