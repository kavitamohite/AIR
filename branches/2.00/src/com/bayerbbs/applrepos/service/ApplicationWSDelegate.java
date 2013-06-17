package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ComplianceControlStatusDTO;
import com.bayerbbs.applrepos.dto.HistoryViewDataDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ApplicationWSService", portName = "ApplicationWSPort")
public class ApplicationWSDelegate {
	com.bayerbbs.applrepos.service.ApplicationWS applicationWS = new com.bayerbbs.applrepos.service.ApplicationWS();

	//ApplicationParamOutput
	public CiItemsResultDTO checkAllowedApplicationName(ApplicationParameterInput anwParamInp) {
		return applicationWS.checkAllowedApplicationName(anwParamInp);
	}

	//ApplicationParamOutput
	public CiItemsResultDTO findApplications(ApplicationSearchParamsDTO anwParamInp) {//ApplicationParameterInput
		return applicationWS.findApplications(anwParamInp);
	}

	public ApplicationEditParameterOutput saveApplication(ApplicationEditParameterInput editInput) {
		return applicationWS.saveApplication(editInput);
	}

	public ApplicationEditParameterOutput createApplication(ApplicationEditParameterInput editInput) {
		return applicationWS.createApplication(editInput);
	}

	public CiEntityEditParameterOutput deleteApplication(CiEntityParameterInput editInput) {//ApplicationEditParameterOutput ApplicationEditParameterInput
		return applicationWS.deleteApplication(editInput);
	}

	public ApplicationViewdataOutput getApplicationUpstream(ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationUpstream(detailInput);
	}

	public ApplicationViewdataOutput getApplicationDownstream(ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationDownstream(detailInput);
	}

	public ApplicationViewdataOutput getApplicationProcess(ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationProcess(detailInput);
	}

	public ApplicationViewdataOutput getAllConnections(ApplicationDetailParameterInput detailInput) {
		return applicationWS.getAllConnections(detailInput);
	}

	public ApplicationViewdataOutput getApplicationItSystems(ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationItSystems(detailInput);
	}

	public ApplicationEditParameterOutput createApplicationByCopy(ApplicationCopyParameterInput copyInput) {
		return applicationWS.createApplicationByCopy(copyInput);
	}
	
	public ApplicationDetailParameterOutput getApplication(ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplication(detailInput);
	}

	public ApplicationDetailParameterOutput getApplicationDetail(ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationDetail(detailInput);
	}

	public ApplicationContactsParameterOutput getApplicationContacts(ApplicationContactsParameterInput contactsInput) {
		return applicationWS.getApplicationContacts(contactsInput);
	}

	public ComplianceControlStatusDTO[] getApplicationComplianceControlStatus(ApplicationContactsParameterInput contactsInput) {
		return applicationWS
				.getApplicationComplianceControlStatus(contactsInput);
	}

	public HistoryViewDataDTO[] getApplicationHistory(ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationHistory(detailInput);
	}

}