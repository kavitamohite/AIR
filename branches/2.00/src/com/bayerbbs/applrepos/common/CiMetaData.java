package com.bayerbbs.applrepos.common;

public class CiMetaData {
	private String idField;
	private String nameField;
	private String aliasField;
	private String typeName;
	private String tableName;
	private Integer tableId;
	
	public CiMetaData(String idField, String nameField, String aliasField, String typeName, String tableName, Integer tableId) {
		this.idField = idField;
		this.nameField = nameField;
		this.aliasField = aliasField;
		this.typeName = typeName;
		this.tableName = tableName;
		this.tableId = tableId;
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
}