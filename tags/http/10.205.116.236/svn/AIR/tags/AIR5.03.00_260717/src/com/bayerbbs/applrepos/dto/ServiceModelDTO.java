package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class ServiceModelDTO implements Serializable {

	private static final long serialVersionUID = -8603876356097493328L;
	
	private String serviceModelId;
	private String serviceModelTxt;

	public ServiceModelDTO() {
	}
	
	public ServiceModelDTO(String serviceModelTxt) {
		this(serviceModelTxt, serviceModelTxt);
	}
	
	public ServiceModelDTO(String serviceModelId, String serviceModelTxt) {
		this.serviceModelId = serviceModelId;
		this.serviceModelTxt = serviceModelTxt;
	}

	public String getServiceModelId() {
		return serviceModelId;
	}

	public void setServiceModelId(String serviceModelId) {
		this.serviceModelId = serviceModelId;
	}

	public String getServiceModelTxt() {
		return serviceModelTxt;
	}

	public void setServiceModelTxt(String serviceModelTxt) {
		this.serviceModelTxt = serviceModelTxt;
	}
	
}
