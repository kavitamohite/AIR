package com.bayerbbs.applrepos.service;


@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "AssetManagementWSService", portName = "AssetManagementWSPort")
public class AssetManagementWSDelegate {

	AssetManagementWS assetManagementWS = new AssetManagementWS();

	public AssetManagementParameterOutput searchAsset(
			AssetManagementParameterInput input) {

		return assetManagementWS.searchAsset(input);
	}
}