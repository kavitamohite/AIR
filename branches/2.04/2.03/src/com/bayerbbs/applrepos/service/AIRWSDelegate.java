package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ItsecUserOptionDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "AIRWSService", portName = "AIRWSPort")
public class AIRWSDelegate {
	com.bayerbbs.applrepos.service.AIRWS airWS = new com.bayerbbs.applrepos.service.AIRWS();

	//ApplicationParamOutput
	public CiItemsResultDTO findCIsByOrganisationUnit(ApplicationParameterInput anwParamInp) {
		return airWS.findCIsByOrganisationUnit(anwParamInp);
	}

	public ItsecUserOptionDTO[] getItsecUserOption(ItsecUserOptionParameter parameter) {
		return airWS.getItsecUserOption(parameter);
	}

	public RolePersonDTO[] getRolePerson(ItsecUserOptionParameter parameter) {
		return airWS.getRolePerson(parameter);
	}

	public RolePersonDTO[] getRolePersonBusinessEssentialEditor(ItsecUserOptionParameter parameter) {
		return airWS.getRolePersonBusinessEssentialEditor(parameter);
	}

	public ApplicationEditParameterOutput saveUserOption(UserOptionParameterInput editInput) {
		return airWS.saveUserOption(editInput);
	}
	
	// Added by enqmu
	public ApplicationEditParameterOutput saveUserColumnsProfilePreference(UserOptionParameterInput editInput) {
		return airWS.saveUserColumnsProfilePreference(editInput);
	}
	
}