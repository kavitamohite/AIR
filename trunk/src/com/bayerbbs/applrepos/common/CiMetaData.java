package com.bayerbbs.applrepos.common;

public class CiMetaData {
	private String idField;
	private String nameField;
	private String aliasField;
	private String typeName;
	private String tableName;
	private Integer tableId;
	private String locationFields;
	private String providerName;
	private String providerAddress;
	private String itHead;
	
	public CiMetaData(String idField, String nameField, String aliasField, String locationFields, String typeName, String tableName, Integer tableId, String providerName, String providerAddress,String itHead) {
		this.idField = idField;
		this.nameField = nameField;
		this.aliasField = aliasField;
		this.typeName = typeName;
		this.tableName = tableName;
		this.tableId = tableId;
		this.locationFields = locationFields;
		this.providerName = providerName;
		this.providerAddress = providerAddress;
		this.itHead=itHead;
	}
	
	public String getIdField() {
		return idField;
	}
	public String getNameField() {
		return nameField;
	}
	public String getAliasField() {
		return aliasField;
	}
	public String getTypeName() {
		return typeName;
	}
	public String getTableName() {
		return tableName;
	}
	public Integer getTableId() {
		return tableId;
	}
	public void setLocationFields(String locationFields) {
		this.locationFields = locationFields;
	}
	public String getLocationFields() {
		return locationFields;
	}

	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}


	public String getProviderAddress() {
		return providerAddress;
	}

	public void setProviderAddress(String providerAddress) {
		this.providerAddress = providerAddress;
	}
	public String getItHead() {
		return itHead;
	}
	
}