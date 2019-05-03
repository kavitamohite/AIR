package com.bayerbbs.applrepos.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "SERVICE_CONTRACT")
public class ServiceContract extends DeletableRevisionInfo implements Serializable {

	private static final long serialVersionUID = -924659591525578344L;

	private Long serviceContractId;
	private String serviceContract;

	
	// ------------------------------------------------------
	// -
	// ------------------------------------------------------

	/**
	 * Creates a new instance.
	 */
	public ServiceContract() {
	}

	// ------------------------------------------------------
	// hibernate get / set
	// ------------------------------------------------------

	/**
	 * Returns the value of the field {@link #id}.
	 * 
	 * @return Value of the {@link #id} field.
	 */
	@Transient
	public Long getId() {
		return getServiceContractId();
	}

	/**
	 * Returns the value of the field {@link #serviceContractId}.
	 * 
	 * @return Value of the {@link #serviceContractId} field.
	 */
	@Id
	@Column(name = "SERVICE_CONTRACT_ID")
	public Long getServiceContractId() {
		return serviceContractId;
	}

	/**
	 * Sets the value of the {@link #serviceContractId} field.
	 * 
	 * @param serviceContractId
	 *            The value to set.
	 */
	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}
	
	/**
	 * Returns the value of the field {@link #serviceContract}.
	 * 
	 * @return Value of the {@link #serviceContract} field.
	 */
	@Column(name = "SERVICE_CONTRACT")
	public String getServiceContract() {
		return serviceContract;
	}

	/**
	 * Sets the value of the {@link #serviceContract} field.
	 * 
	 * @param serviceContract
	 *            The value to set.
	 */
	public void setServiceContract(String serviceContract) {
		this.serviceContract = serviceContract;
	}
	

}
