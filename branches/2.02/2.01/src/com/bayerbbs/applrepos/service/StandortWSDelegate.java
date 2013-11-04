package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "StandortWSService", portName = "StandortWSPort")
public class StandortWSDelegate {
	StandortWS standortWS = new StandortWS();
	
	public CiEntityEditParameterOutput saveStandort(StandortEditParameterInput editInput) {
		return standortWS.saveStandort(editInput);
	}

	public CiEntityEditParameterOutput deleteStandort(StandortEditParameterInput editInput) {
		return standortWS.deleteStandort(editInput);
	}
	
	public CiEntityEditParameterOutput createStandort(StandortEditParameterInput editInput) {
		return standortWS.createStandort(editInput);
	}
	
	public CiEntityEditParameterOutput saveStandortArea(StandortEditParameterInput editInput) {
		return standortWS.saveStandort(editInput);
	}

	public CiEntityEditParameterOutput deleteAreaStandort(StandortEditParameterInput editInput) {
		return standortWS.deleteStandort(editInput);
	}
	
	public CiEntityEditParameterOutput createStandortArea(StandortEditParameterInput editInput) {
		return standortWS.createStandort(editInput);
	}
	
//	public KeyValueDTO[] findSitesByLandId(DefaultDataInput input) {//DefaultDataInput input
//		return standortWS.findSitesByLandId(input);
//	}
	public KeyValueDTO[] findSitesByLandId(DefaultDataInput detailInput) {//KeyValueOutput/CiDetailParameterInput
//		KeyValueOutput out = new KeyValueOutput();
//		out.setKeyValueDTO(standortWS.findSitesByLandId(detailInput.getCiId()));//input
//		return out;
		
		return standortWS.findSitesByLandId(detailInput.getId());//getCiId
	}
}