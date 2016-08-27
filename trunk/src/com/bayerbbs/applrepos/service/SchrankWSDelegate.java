package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "SchrankWSService", portName = "SchrankWSPort")
public class SchrankWSDelegate {
	SchrankWS schrankWS = new SchrankWS();
	
	public CiEntityEditParameterOutput saveSchrank(SchrankEditParameterInput editInput) {
		return schrankWS.saveSchrank(editInput);
	}

	public CiEntityEditParameterOutput deleteSchrank(SchrankEditParameterInput editInput) {
		return schrankWS.deleteSchrank(editInput);
	}
	
	public CiEntityEditParameterOutput createSchrank(SchrankEditParameterInput editInput) {
		return schrankWS.createSchrank(editInput);
	}
	
	public KeyValueDTO[] findSchrankByRoomId(DefaultDataInput detailInput) {
		return schrankWS.findSchrankByRoomId(detailInput.getId());
	}
}