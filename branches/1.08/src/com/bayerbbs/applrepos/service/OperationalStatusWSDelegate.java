package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;
import com.bayerbbs.applrepos.dto.OperationalStatusDTO;
import com.bayerbbs.applrepos.hibernate.LifecycleStatusHbn;
import com.bayerbbs.applrepos.hibernate.OperationalStatusHbn;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "OperationalStatusWSService", portName = "OperationalStatusWSPort")
public class OperationalStatusWSDelegate {

	com.bayerbbs.applrepos.service.OperationalStatusWS operationalStatusWS = new com.bayerbbs.applrepos.service.OperationalStatusWS();

	public OperationalStatusDTO[] getOperationalStatusList() {
		return operationalStatusWS.getOperationalStatusList();
	}

}