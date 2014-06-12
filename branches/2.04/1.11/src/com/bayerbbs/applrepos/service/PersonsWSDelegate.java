package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.PersonsDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "PersonsWSService", portName = "PersonsWSPort")
public class PersonsWSDelegate {

	com.bayerbbs.applrepos.service.PersonsWS personsWS = new com.bayerbbs.applrepos.service.PersonsWS();

	public PersonsDTO[] findPersonsByCWID(PersonsParameterInput persParamInput) {
		return personsWS.findPersonsByCWID(persParamInput);
	}

	public PersonsDTO[] findPersonByCWID(PersonsParameterInput persParamInput) {
		return personsWS.findPersonByCWID(persParamInput);
	}

	public PersonsDTO[] findPersonByFunctionSignee(PersonsParameterInput persParamInput) {
		return personsWS.findPersonByFunctionSignee(persParamInput);
	}
}