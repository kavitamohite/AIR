package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.DwhEntityDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "CiEntityWSService", portName = "CiEntityWSPort")
public class CiEntityWSDelegate {

	com.bayerbbs.applrepos.service.CiEntityWS ciEntityWS = new com.bayerbbs.applrepos.service.CiEntityWS();

	public CiEntityParameterOutput findCiEntities(CiEntityParameterInput input) {
		return ciEntityWS.findCiEntities(input);
	}

	public DwhEntityDTO[] findByTypeAndName(CiEntityParameterInput input) {
		return ciEntityWS.findByTypeAndName(input);
	}
}