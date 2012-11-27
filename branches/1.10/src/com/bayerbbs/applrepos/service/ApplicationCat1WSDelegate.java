package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ApplicationCat1DTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ApplicationCat1WSService", portName = "ApplicationCat1WSPort")
public class ApplicationCat1WSDelegate {

	com.bayerbbs.applrepos.service.ApplicationCat1WS applicationCat1WS = new com.bayerbbs.applrepos.service.ApplicationCat1WS();

	public ApplicationCat1DTO[] getApplicationCat1List() {
		return applicationCat1WS.getApplicationCat1List();
	}

}