/**
 * 
 */
package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * @author equuw
 * 
 */
@Entity
@Table(name = "SERVICE")
@org.hibernate.annotations.Entity(dynamicInsert = true)
@SequenceGenerator(name = "MySeqService", sequenceName = "SEQ_SERVICE")
@NamedQueries({ @NamedQuery(name = "findServicesByNameORAlias", query = "FROM Service s where UPPER(s.serviceName)= upper(:name) OR UPPER(s.serviceAias)= upper(:alias) OR UPPER(s.serviceName)= upper(:alias) OR UPPER(s.serviceAias) = upper(:name)")})
public class Service extends CiBase1 implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2978204751107056476L;

	private String serviceAias;
	private String orderNumber;
	private String projectName;
	private String serviceDescription;
	private String organisationalScope;
	private String companyCode;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MySeqService")
	@Column(name = "SERVICE_ID")
	public Long getServiceId() {
		return getId();
	}

	public void setServiceId(Long id) {
		setId(id);
	}

	@Column(name = "SERVICE_NAME")
	public String getServiceName() {
		return getName();
	}

	public void setServiceName(String name) {
		setName(name);
	}

	/**
	 * @return the serviceAias
	 */
	@Column(name = "SERVICE_ALIAS")
	public String getServiceAias() {
		return serviceAias;
	}

	/**
	 * @param serviceAias
	 *            the serviceAias to set
	 */
	public void setServiceAias(String serviceAias) {
		this.serviceAias = serviceAias;
	}

	/**
	 * @return the orderNumber
	 */
	@Column(name = "ORDER_NUMBER")
	public String getOrderNumber() {
		return orderNumber;
	}

	/**
	 * @param orderNumber
	 *            the orderNumber to set
	 */
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	/**
	 * @return the projectName
	 */
	@Column(name = "PROJECT_NAME")
	public String getProjectName() {
		return projectName;
	}

	/**
	 * @param projectName
	 *            the projectName to set
	 */
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	/**
	 * @return the serviceDescription
	 */
	@Column(name = "SERVICE_DESCRIPTION")
	public String getServiceDescription() {
		return serviceDescription;
	}

	/**
	 * @param serviceDescription
	 *            the serviceDescription to set
	 */
	public void setServiceDescription(String serviceDescription) {
		this.serviceDescription = serviceDescription;
	}

	/**
	 * @return the organisationalScope
	 */
	@Column(name = "MANDANT_SECURITY_I")
	public String getOrganisationalScope() {
		return organisationalScope;
	}

	/**
	 * @param organisationalScope
	 *            the organisationalScope to set
	 */
	public void setOrganisationalScope(String organisationalScope) {
		this.organisationalScope = organisationalScope;
	}

	/**
	 * @return the companyCode
	 */
	@Column(name = "MANDANT_SECURITY_II")
	public String getCompanyCode() {
		return companyCode;
	}

	/**
	 * @param companyCode
	 *            the companyCode to set
	 */
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

}
