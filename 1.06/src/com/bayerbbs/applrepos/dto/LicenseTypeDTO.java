package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class LicenseTypeDTO implements Serializable {

	private static final long serialVersionUID = -8704435433607331729L;

	private Long licenseTypeId;
	private String licenseTypeName;
	
	public Long getLicenseTypeId() {
		return licenseTypeId;
	}
	public void setLicenseTypeId(Long licenseTypeId) {
		this.licenseTypeId = licenseTypeId;
	}
	public String getLicenseTypeName() {
		return licenseTypeName;
	}
	public void setLicenseTypeName(String licenseTypeName) {
		this.licenseTypeName = licenseTypeName;
	}
	
}
