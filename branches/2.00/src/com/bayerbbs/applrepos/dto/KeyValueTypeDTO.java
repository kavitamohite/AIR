package com.bayerbbs.applrepos.dto;

public class KeyValueTypeDTO {// implements Comparable<KeyValueTypeDTO>
	private Integer id;
	private Integer type;
	private String name;
	
	
	public KeyValueTypeDTO() {
	}
	public KeyValueTypeDTO(Integer id, String name, Integer type) {
		this.id = id;
		this.name = name;
		this.type = type;
	}

	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	
//	@Override
//	public int compareTo(KeyValueTypeDTO other) {
//		return name.compareTo(other.getName());
//	}
}
