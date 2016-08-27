package com.bayerbbs.applrepos.dto;

public class KeyValueType2DTO {// implements Comparable<KeyValueTypeDTO>
	private Integer id;
	private String type;
	private String name;
	
	
	public KeyValueType2DTO() {
	}
	public KeyValueType2DTO(Integer id, String name, String type) {
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
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
//	@Override
//	public int compareTo(KeyValueTypeDTO other) {
//		return name.compareTo(other.getName());
//	}
}
