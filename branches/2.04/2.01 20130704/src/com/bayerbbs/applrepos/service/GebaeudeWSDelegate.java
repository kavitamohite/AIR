package com.bayerbbs.applrepos.service;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "GebaeudeWSService", portName = "GebaeudeWSPort")
public class GebaeudeWSDelegate {
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
}