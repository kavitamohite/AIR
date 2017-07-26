package com.bayerbbs.applrepos.dto;

public class KeyValueEnDTO implements Comparable<KeyValueEnDTO> {
	private Long id;
	private String nameEn;
	private String name;
	
	
	public KeyValueEnDTO() {
	}
	public KeyValueEnDTO(Long id, String name, String nameEn) {
		this.id = id;
		this.name = name;
		this.nameEn = nameEn;
	}

	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	public String getNameEn() {
		return nameEn;
	}
	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}
	
	@Override
	public int compareTo(KeyValueEnDTO other) {
		return name.compareTo(other.getName());
	}
}
