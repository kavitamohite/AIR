package com.bayerbbs.applrepos.dto;

public class ComplianceControlStatusDTO {

	private String controlStatus;
	private Long quantity;
	private String rate;
	
	public String getControlStatus() {
		return controlStatus;
	}
	public void setControlStatus(String controlStatus) {
		this.controlStatus = controlStatus;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	
}
