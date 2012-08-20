package com.bayerbbs.applrepos.dto;

public class ViewDataDTO {

	String id;
	String name;
	String alias;
	String type;
	String category;
	String direction;
	
	String responsible;
	String subResponsible;
	
	Long tableId;
	Long ciId;
	
	String groupsort;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	// can be refactored to Name
	public String getText() {
		return name;
	}
	public void setText(String text) {
		this.name = text;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String text) {
		this.name = text;
	}

	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDirection() {
		return direction;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	public String getResponsible() {
		return responsible;
	}
	public void setResponsible(String responsible) {
		this.responsible = responsible;
	}
	public String getSubResponsible() {
		return subResponsible;
	}
	public void setSubResponsible(String subResponsible) {
		this.subResponsible = subResponsible;
	}
	public Long getTableId() {
		return tableId;
	}
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}
	public Long getCiId() {
		return ciId;
	}
	public void setCiId(Long ciId) {
		this.ciId = ciId;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getGroupsort() {
		return groupsort;
	}
	public void setGroupsort(String groupsort) {
		this.groupsort = groupsort;
	}
	
}
