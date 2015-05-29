package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.AssetViewDataDTO;

public class AssetManagementParameterOutput {

	private long countResultSet;

	private AssetViewDataDTO[] assetViewDataDTO = null;

	public AssetViewDataDTO[] getAssetViewDataDTO() {
		return assetViewDataDTO;
	}

	public void setAssetViewDataDTO(AssetViewDataDTO[] assetViewDataDTO) {
		this.assetViewDataDTO = assetViewDataDTO;
	}

	public long getCountResultSet() {
		return countResultSet;
	}

	public void setCountResultSet(long countResultSet) {
		this.countResultSet = countResultSet;
	}

}
