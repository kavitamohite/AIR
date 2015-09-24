package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.OperationalStatusDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "OperationalStatusWSService", portName = "OperationalStatusWSPort")
public class OperationalStatusWSDelegate {

	com.bayerbbs.applrepos.service.OperationalStatusWS operationalStatusWS = new com.bayerbbs.applrepos.service.OperationalStatusWS();

	public OperationalStatusDTO[] getOperationalStatusList() {
		return operationalStatusWS.getOperationalStatusList();
	}

}