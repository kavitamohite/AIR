package com.bayerbbs.applrepos.dto;

public class LinkCIDTO {

	private long id;
	private String name;
	private String sort;
	private long subTypeId;
	
	public LinkCIDTO() {
		
	}
	
	public LinkCIDTO(long id, String name, String sort, long subTypeId) {
		this(id, name, sort);
		this.subTypeId = subTypeId;
	}
	
	public LinkCIDTO(long id, String name, String sort) {
		this.id = id;
		this.name = name;
		this.sort = sort;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}

	public void setSubTypeId(long subTypeId) {
		this.subTypeId = subTypeId;
	}
	public long getSubTypeId() {
		return subTypeId;
	}
}