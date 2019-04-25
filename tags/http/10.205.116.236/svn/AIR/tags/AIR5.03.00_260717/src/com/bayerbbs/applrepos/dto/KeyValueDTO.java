package com.bayerbbs.applrepos.dto;

public class KeyValueDTO implements Comparable<KeyValueDTO> {
	private Long id;
	private String name;
	
	public KeyValueDTO() {
	}
	
	public KeyValueDTO(Long id, String name) {
		this.id = id;
		this.name = name;
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

	@Override
	public int compareTo(KeyValueDTO other) {
		return name.compareTo(other.getName());
	}
}
