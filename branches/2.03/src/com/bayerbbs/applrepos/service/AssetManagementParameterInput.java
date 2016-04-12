package com.bayerbbs.applrepos.service;

public class AssetManagementParameterInput {
	
	private Long assetId;

	private String cwid;

	private String token;

	private Long tableId;

	private String query;

	private int start;

	private int limit;
	
	private String sort;
	
	private String queryMode;
	
	private String dir;
	
	
	private String selectedAssets;
	
	public Long getAssetId() {
		return assetId;
	}

	public void setAssetId(Long assetId) {
		this.assetId = assetId;
	}

	public String getCwid() {
		return cwid;
	}

	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Long getTableId() {
		return tableId;
	}

	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getQueryMode() {
		return queryMode;
	}

	public void setQueryMode(String queryMode) {
		this.queryMode = queryMode;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public String getSelectedAssets() {
		return selectedAssets;
	}

	public void setSelectedAssets(String selectedAssets) {
		this.selectedAssets = selectedAssets;
	}
	
	
	
}
