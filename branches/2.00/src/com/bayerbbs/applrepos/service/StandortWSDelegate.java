package com.bayerbbs.applrepos.service;


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
}