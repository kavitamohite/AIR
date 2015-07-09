package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.SoftwareComponentHbn;

public class AssetManagementWS {

	public AssetManagementParameterOutput searchAsset(
			AssetManagementParameterInput input) {

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

	public AssetManagementParameterOutput saveAsset(AssetViewDataDTO dto) {
		AssetManagementParameterOutput output = new AssetManagementParameterOutput();
		Boolean result = false;
		if(dto.getIsSoftwareComponent() != null && dto.getIsSoftwareComponent()){
			result = SoftwareComponentHbn.saveSoftwareAsset(dto);
		} else {
			result = HardwareComponentHbn.saveHardwareAsset(dto);
		}
		output.setResult(result);
		return output;
	}
}
