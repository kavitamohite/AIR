package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;



public class AssetManagementWS {

	public AssetManagementParameterOutput searchAsset(AssetManagementParameterInput input){
		
		AssetManagementParameterOutput out = new AssetManagementParameterOutput();
		List<AssetViewDataDTO> dtoList =  HardwareComponentHbn.searchAsset(input.getQuery());
		AssetViewDataDTO[] ary = dtoList.toArray(new AssetViewDataDTO[dtoList.size()]);
		out.setAssetViewDataDTO(ary);
		return out;
	}
}
