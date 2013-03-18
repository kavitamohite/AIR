package com.bayerbbs.applrepos.service;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ItSystemWSService", portName = "ItSystemWSPort")
public class ItSystemWSDelegate {
	ItSystemWS itSystemWS = new ItSystemWS();
	
	public CiEntityEditParameterOutput saveItSystem(ItSystemEditParameterInput editInput) {
		return itSystemWS.saveItSystem(editInput);
	}

	public CiEntityEditParameterOutput deleteItSystem(ItSystemEditParameterInput editInput) {
		return itSystemWS.deleteItSystem(editInput);
	}
	
	public CiEntityEditParameterOutput createItSystem(ItSystemEditParameterInput editInput) {
		return itSystemWS.createItSystem(editInput);
	}
}