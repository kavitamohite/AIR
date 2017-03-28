/**
 * 
 */
package com.bayerbbs.applrepos.domain;

import com.bayerbbs.applrepos.dto.CiBaseDTO;

/**
 * @author equuw
 * 
 */
public class ServiceDTO extends CiBaseDTO {

	private String serviceAias;
	private String orderNumber;
	private String projectName;
	private String serviceDescription;
	private String organisationalScope;
	private String companyCode;

	public String getServiceAias() {
		return serviceAias;
	}

	public void setServiceAias(String serviceAias) {
		this.serviceAias = serviceAias;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getServiceDescription() {
		return serviceDescription;
	}

	public void setServiceDescription(String serviceDescription) {
		this.serviceDescription = serviceDescription;
	}

	public String getOrganisationalScope() {
		return organisationalScope;
	}

	public void setOrganisationalScope(String organisationalScope) {
		this.organisationalScope = organisationalScope;
	}

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

}
