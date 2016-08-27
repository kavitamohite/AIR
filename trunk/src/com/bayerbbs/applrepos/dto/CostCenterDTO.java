package com.bayerbbs.applrepos.dto;

public class CostCenterDTO {

	private Long id;

	private String name;

	private String cwid;

	public CostCenterDTO() {
	}

	public CostCenterDTO(Long id, String name, String cwid) {
		super();
		this.id = id;
		this.name = name;
		this.cwid = cwid;
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

	public String getCwid() {
		return cwid;
	}

	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

}
