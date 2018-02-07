package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.GroupTypesDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "GroupTypesWSService", portName = "GroupTypesWSPort")
public class GroupTypesWSDelegate {

	com.bayerbbs.applrepos.service.GroupTypesWS groupTypesWS = new com.bayerbbs.applrepos.service.GroupTypesWS();

	public GroupTypesDTO[] getGroupTypesList() {
		return groupTypesWS.getGroupTypesList();
	}

}