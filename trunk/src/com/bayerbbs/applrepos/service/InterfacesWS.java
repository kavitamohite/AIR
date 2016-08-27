package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.InterfacesDTO;
import com.bayerbbs.applrepos.hibernate.InterfacesHbn;

public class InterfacesWS {

	public InterfacesDTO[] findAllImportInterfaces() {
		return InterfacesHbn.getArrayFromList(InterfacesHbn.findAllImportInterfaces());
	}
}
