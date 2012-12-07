package com.bayerbbs.applrepos.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.ApplicationRegion;
import com.bayerbbs.applrepos.dto.ApplicationAccessDTO;
import com.bayerbbs.applrepos.dto.ApplicationContact;
import com.bayerbbs.applrepos.dto.ApplicationContactEntryDTO;
import com.bayerbbs.applrepos.dto.ApplicationContactGroupDTO;
import com.bayerbbs.applrepos.dto.ApplicationContactsDTO;
import com.bayerbbs.applrepos.dto.ApplicationDTO;
import com.bayerbbs.applrepos.dto.CiSupportStuffDTO;
import com.bayerbbs.applrepos.dto.ComplianceControlStatusDTO;
import com.bayerbbs.applrepos.dto.HistoryViewDataDTO;
import com.bayerbbs.applrepos.dto.InterfacesDTO;
import com.bayerbbs.applrepos.dto.ItsecUserOptionDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationApplicationHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationProcessHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationRegionHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitesHbn;
import com.bayerbbs.applrepos.hibernate.CiGroupsHbn;
import com.bayerbbs.applrepos.hibernate.CiPersonsHbn;
import com.bayerbbs.applrepos.hibernate.CiSupportStuffHbn;
import com.bayerbbs.applrepos.hibernate.InterfacesHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;
import com.bayerbbs.applrepos.validation.ValidationReader;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ApplicationWSService", portName = "ApplicationWSPort")
public class ApplicationWSDelegate {

	com.bayerbbs.applrepos.service.ApplicationWS applicationWS = new com.bayerbbs.applrepos.service.ApplicationWS();

	public ApplicationParamOutput checkAllowedApplicationName(
			ApplicationParameterInput anwParamInp) {
		return applicationWS.checkAllowedApplicationName(anwParamInp);
	}

	public ApplicationParamOutput findApplications(
			ApplicationParameterInput anwParamInp) {
		return applicationWS.findApplications(anwParamInp);
	}

	public ApplicationEditParameterOutput saveApplication(
			ApplicationEditParameterInput editInput) {
		return applicationWS.saveApplication(editInput);
	}

	public ApplicationEditParameterOutput createApplication(
			ApplicationEditParameterInput editInput) {
		return applicationWS.createApplication(editInput);
	}

	public ApplicationEditParameterOutput deleteApplication(
			ApplicationEditParameterInput editInput) {
		return applicationWS.deleteApplication(editInput);
	}

	public ApplicationViewdataOutput getApplicationUpstream(
			ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationUpstream(detailInput);
	}

	public ApplicationViewdataOutput getApplicationDownstream(
			ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationDownstream(detailInput);
	}

	public ApplicationViewdataOutput getApplicationProcess(
			ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationProcess(detailInput);
	}

	public ApplicationViewdataOutput getAllConnections(
			ApplicationDetailParameterInput detailInput) {
		return applicationWS.getAllConnections(detailInput);
	}

	public ApplicationViewdataOutput getApplicationItSystems(
			ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationItSystems(detailInput);
	}

	public ApplicationEditParameterOutput createApplicationByCopy(
			ApplicationCopyParameterInput copyInput) {
		return applicationWS.createApplicationByCopy(copyInput);
	}
	
	public ApplicationDetailParameterOutput getApplication(
			ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplication(detailInput);
	}

	public ApplicationDetailParameterOutput getApplicationDetail(
			ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationDetail(detailInput);
	}

	public ApplicationContactsParameterOutput getApplicationContacts(
			ApplicationContactsParameterInput contactsInput) {
		return applicationWS.getApplicationContacts(contactsInput);
	}

	public ComplianceControlStatusDTO[] getApplicationComplianceControlStatus(
			ApplicationContactsParameterInput contactsInput) {
		return applicationWS
				.getApplicationComplianceControlStatus(contactsInput);
	}

	public HistoryViewDataDTO[] getApplicationHistory(
			ApplicationDetailParameterInput detailInput) {
		return applicationWS.getApplicationHistory(detailInput);
	}

}