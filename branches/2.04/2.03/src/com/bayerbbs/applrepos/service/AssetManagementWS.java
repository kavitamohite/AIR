package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.SoftwareComponentHbn;

public class AssetManagementWS {

	public AssetManagementParameterOutput searchAsset(AssetManagementParameterInput input) {

		AssetManagementParameterOutput out = null;

		if (input.getQueryMode().equalsIgnoreCase("hardware")) {
			if (input.getAssetId() != null) {
				out = HardwareComponentHbn.findAssetById(input.getAssetId());
			} else {
				out = HardwareComponentHbn.searchAsset(input);
			}
		} else if (input.getQueryMode().equalsIgnoreCase("software")) {
			if (input.getAssetId() != null) {
				out = SoftwareComponentHbn.findAssetById(input.getAssetId());
			} else {
				out = SoftwareComponentHbn.searchAsset(input);
			}

		}

		return out;
	}
}
