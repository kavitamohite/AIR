package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.GapClassDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ItsecMassnahmenWSService", portName = "ItsecMassnahmenWSPort")
public class ItsecMassnahmenWSDelegate {

	com.bayerbbs.applrepos.service.ItsecMassnahmenWS itsecMassnahmenWS = new com.bayerbbs.applrepos.service.ItsecMassnahmenWS();

	public ItsecMassnahmenParameterOutput getItsecMassnahmen(
			ItsecMassnahmenParameterInput input) {
		return itsecMassnahmenWS.getItsecMassnahmen(input);
	}

	public ItsecMassnahmenParameterOutput getItsecMassnahmeDetail(
			ItsecMassnahmenParameterInput input) {
		return itsecMassnahmenWS.getItsecMassnahmeDetail(input);
	}

	public ItsecMassnahmenParameterOutput saveItsecMassnahmenDetails(
			ItsecMassnahmenParameterInput input) {
		return itsecMassnahmenWS.saveItsecMassnahmenDetails(input);
	}

	public ItsecMassnahmenParameterOutput getItsecMassnahmenStatusWerte(
			ItsecMassnahmenParameterInput input) {
		return itsecMassnahmenWS.getItsecMassnahmenStatusWerte(input);
	}

	public GapClassDTO[] getGapClassList() {
		return itsecMassnahmenWS.getGapClassList();
	}

	public ItsecMassnahmenParameterOutput saveItsecMassnahmenDetailComplete(
			ItsecMassnahmenParameterInput input) {
		return itsecMassnahmenWS.saveItsecMassnahmenDetailComplete(input);
	}
}