package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.AssetViewDataDTO;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "AssetManagementWSService", portName = "AssetManagementWSPort")
public class AssetManagementWSDelegate {

	AssetManagementWS assetManagementWS = new AssetManagementWS();

	public AssetManagementParameterOutput searchAsset(
			AssetManagementParameterInput input) {

		return assetManagementWS.searchAsset(input);
	}
	
	public AssetManagementParameterOutput saveAsset(
			AssetViewDataDTO input) {
		return assetManagementWS.saveAsset(input);
	}
	
	public DeleteAssetParameterOutput deleteAssets(AssetManagementParameterInput input){
		return assetManagementWS.deleteAssets(input);		
	}
}