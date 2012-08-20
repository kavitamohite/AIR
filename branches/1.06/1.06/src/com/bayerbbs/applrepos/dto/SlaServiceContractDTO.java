package com.bayerbbs.applrepos.dto;

public class SlaServiceContractDTO {

	private Long slaServiceContractId;
	private Long slaId;
	private Long serviceContractId;
	
	public Long getSlaServiceContractId() {
		return slaServiceContractId;
	}
	public void setSlaServiceContractId(Long slaServiceContractId) {
		this.slaServiceContractId = slaServiceContractId;
	}
	public Long getSlaId() {
		return slaId;
	}
	public void setSlaId(Long slaId) {
		this.slaId = slaId;
	}
	public Long getServiceContractId() {
		return serviceContractId;
	}
	public void setServiceContractId(Long serviceContractId) {
		this.serviceContractId = serviceContractId;
	}

}
