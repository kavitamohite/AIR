package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;

public class PersonsWS {

//	public PersonsDTO[] getPersonsList() {
//		return PersonsHbn.getArrayFromList(PersonsHbn.listPersonsHbn());
//	}
	
	public PersonsDTO[] findPersonsByCWID(PersonsParameterInput persParamInput) {

		PersonsDTO[] aPersonen = null;
		
		if (null == persParamInput.getFunctionCWID() || "N".equals(persParamInput.getFunctionCWID())) {
			// normale Personensuche
			// aPersonen = PersonsHbn.getArrayFromList(PersonsHbn.findPersonsByQuery(persParamInput.getQuery(), persParamInput.getPrimaryCWID(), persParamInput.getSecondaryCWID(), persParamInput.getMachineCWID(), persParamInput.getQueryMethod()));

			aPersonen = PersonsHbn.getArrayFromList(PersonsHbn.findPersonsByFunctionAndQuery(persParamInput.getQuery(), persParamInput.getPrimaryCWID(), persParamInput.getSecondaryCWID(), persParamInput.getMachineCWID(), null, persParamInput.getQueryMethod()));
		}
		else {
			// Personensuche nach Personen mit Funktionen
			aPersonen = PersonsHbn.getArrayFromList(PersonsHbn.findPersonsByFunctionAndQuery(persParamInput.getQuery(), persParamInput.getPrimaryCWID(), persParamInput.getSecondaryCWID(), persParamInput.getMachineCWID(), persParamInput.getFunctionCWID(), persParamInput.getQueryMethod()));
		}
		return aPersonen;
	}

	public PersonsDTO[] findPersonByCWID(PersonsParameterInput persParamInput) {
		return PersonsHbn.getArrayFromList(PersonsHbn.findPersonByCWID(persParamInput.getQuery()));
	}
	
	public PersonsDTO[] findPersonByFunctionSignee(PersonsParameterInput persParamInput) {
		return PersonsHbn.getArrayFromList(PersonsHbn.findPersonsByFunctionSignee(persParamInput.getItSet()));
	}

}
