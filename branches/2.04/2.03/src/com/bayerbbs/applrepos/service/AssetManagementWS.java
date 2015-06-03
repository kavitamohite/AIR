package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.SoftwareComponentHbn;

public class AssetManagementWS {

	public AssetManagementParameterOutput searchAsset(AssetManagementParameterInput input) {

		AssetManagementParameterOutput out = null;
		
		if (input.getQueryMode().equalsIgnoreCase("hardware")) {
			out = HardwareComponentHbn.searchAsset(input);
		} else if (input.getQueryMode().equalsIgnoreCase("software")) {
			out = SoftwareComponentHbn.searchAsset(input);
		}

		
		return out;
	}
}
