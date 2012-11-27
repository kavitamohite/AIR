package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "LifecycleStatusWSService", portName = "LifecycleStatusWSPort")
public class LifecycleStatusWSDelegate {

	com.bayerbbs.applrepos.service.LifecycleStatusWS lifecycleStatusWS = new com.bayerbbs.applrepos.service.LifecycleStatusWS();

	public LifecycleStatusDTO[] getLifecycleStatusList() {
		return lifecycleStatusWS.getLifecycleStatusList();
	}

}