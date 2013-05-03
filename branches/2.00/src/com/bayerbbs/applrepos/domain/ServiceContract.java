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

	private Integer serviceContractId;
	private String serviceContract;

	public ServiceContract() {
	}

	@Transient
	public Integer getId() {
		return getServiceContractId();
	}

	@Id
	@Column(name = "SERVICE_CONTRACT_ID")
	public Integer getServiceContractId() {
		return serviceContractId;
	}
	public void setServiceContractId(Integer serviceContractId) {
		this.serviceContractId = serviceContractId;
	}
	
	@Column(name = "SERVICE_CONTRACT")
	public String getServiceContract() {
		return serviceContract;
	}
	public void setServiceContract(String serviceContract) {
		this.serviceContract = serviceContract;
	}
}