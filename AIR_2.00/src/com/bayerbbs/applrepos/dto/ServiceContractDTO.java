package com.bayerbbs.applrepos.dto;

public class ServiceContractDTO {
	private Integer serviceContractId;
	private String serviceContractName;
	//private Integer slaId;
	
	public ServiceContractDTO() {}
	
	/*public ServiceContractDTO(Integer serviceContractId, String serviceContractName, Integer slaId) {
		this.serviceContractId = serviceContractId;
		this.serviceContractName = serviceContractName;
		this.slaId = slaId;
	}*/
	
	public Integer getServiceContractId() {
		return serviceContractId;
	}
	public void setServiceContractId(Integer serviceContractId) {
		this.serviceContractId = serviceContractId;
	}
	public String getServiceContractName() {
		return serviceContractName;
	}
	public void setServiceContractName(String serviceContractName) {
		this.serviceContractName = serviceContractName;
	}
	/*public Integer getSlaId() {
		return slaId;
	}
	public void setSlaId(Integer slaId) {
		this.slaId = slaId;
	}*/
}