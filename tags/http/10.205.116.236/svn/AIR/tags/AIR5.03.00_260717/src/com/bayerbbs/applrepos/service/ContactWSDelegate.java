package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.EditorGroupDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ContactWSService", portName = "ContactWSPort")

public class ContactWSDelegate {
ContactWS contactWS=new ContactWS();
	
	public EditorGroupDTO[] findEditorGroupList(
			DefaultDataInput input) {
		return contactWS.findEditorGroupList();
	}
}
