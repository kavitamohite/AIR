package com.bayerbbs.applrepos.dto;

public class LinkCITypeDTO {

	private long zielotyp_gstoolid;
	private String type;
	String language;
	

	public LinkCITypeDTO(long zielotyp_gstoolid, String language, String type) {
		this.zielotyp_gstoolid = zielotyp_gstoolid;
		this.language = language;
		this.type = type;
	}

	public long getZielotyp_gstoolid() {
		return zielotyp_gstoolid;
	}

	public void setZielotyp_gstoolid(long zielotyp_gstoolid) {
		this.zielotyp_gstoolid = zielotyp_gstoolid;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
