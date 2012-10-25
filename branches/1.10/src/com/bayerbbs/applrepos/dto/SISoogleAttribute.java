package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class SISoogleAttribute implements Serializable {
	private static final long serialVersionUID = -4284159838660845387L;
	
	private int id;
	private String name;
	
	public SISoogleAttribute() {}
	
//	public SISoogleAttribute(String name) {
//		this(name, name);
//	}
	
	public SISoogleAttribute(int id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
}