package com.bayerbbs.applrepos.dto;

public class LinkCITypeDTO {

	private long id;
	private String type;
	private String language;
	private String tableId;
	
	public LinkCITypeDTO() {}
	
	public LinkCITypeDTO(long id, String language, String type, String tableId) {
		this.id = id;
		this.language = language;
		this.type = type;
		this.tableId = tableId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getLanguage() {
		return language;
	}

	public void setTableId(String tableId) {
		this.tableId = tableId;
	}

	public String getTableId() {
		return tableId;
	}
}