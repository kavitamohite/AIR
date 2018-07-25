/**
 * 
 */
package com.bayerbbs.applrepos.domain;

import com.bayerbbs.applrepos.service.BaseEditParameterInput;

/**
 * @author equuw
 *
 */
public class ServiceEditParameterInput extends BaseEditParameterInput{
	
	private String serviceAias;
	private String orderNumber;
	private String projectName;
	private String serviceDescription;
	private String organisationalScope;
	private String companyCode;
	private String upStreamAdd;
	private String upStreamDelete;
	/**
	 * @return the serviceAias
	 */
	public String getServiceAias() {
		return serviceAias;
	}
	/**
	 * @param serviceAias the serviceAias to set
	 */
	public void setServiceAias(String serviceAias) {
		this.serviceAias = serviceAias;
	}
	/**
	 * @return the orderNumber
	 */
	public String getOrderNumber() {
		return orderNumber;
	}
	/**
	 * @param orderNumber the orderNumber to set
	 */
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	/**
	 * @return the projectName
	 */
	public String getProjectName() {
		return projectName;
	}
	/**
	 * @param projectName the projectName to set
	 */
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	/**
	 * @return the serviceDescription
	 */
	public String getServiceDescription() {
		return serviceDescription;
	}
	/**
	 * @param serviceDescription the serviceDescription to set
	 */
	public void setServiceDescription(String serviceDescription) {
		this.serviceDescription = serviceDescription;
	}
	/**
	 * @return the organisationalScope
	 */
	public String getOrganisationalScope() {
		return organisationalScope;
	}
	/**
	 * @param organisationalScope the organisationalScope to set
	 */
	public void setOrganisationalScope(String organisationalScope) {
		this.organisationalScope = organisationalScope;
	}
	/**
	 * @return the companyCode
	 */
	public String getCompanyCode() {
		return companyCode;
	}
	/**
	 * @param companyCode the companyCode to set
	 */
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}
	/**
	 * @return the upStreamAdd
	 */
	public String getUpStreamAdd() {
		return upStreamAdd;
	}
	/**
	 * @param upStreamAdd the upStreamAdd to set
	 */
	public void setUpStreamAdd(String upStreamAdd) {
		this.upStreamAdd = upStreamAdd;
	}
	/**
	 * @return the upStreamDelete
	 */
	public String getUpStreamDelete() {
		return upStreamDelete;
	}
	/**
	 * @param upStreamDelete the upStreamDelete to set
	 */
	public void setUpStreamDelete(String upStreamDelete) {
		this.upStreamDelete = upStreamDelete;
	}

	
}
