package com.bayerbbs.applrepos.dto;

public class CiTypeDTO implements Comparable<CiTypeDTO> {
	private int id;
	private String ciTypeName;
	private Integer ciTypeId;
	private Integer ciSubTypeId;
	private int sortId;
	
	public CiTypeDTO() {}
	
	public CiTypeDTO(String ciTypeId, String ciTypeName) {
		this.ciTypeId = Integer.parseInt(ciTypeId);
		this.ciTypeName = ciTypeName;
	}
	
	public CiTypeDTO(int id, String ciTypeName, Integer ciTypeId, Integer ciSubTypeId) {
		this.id = id;
		this.ciTypeName = ciTypeName;
		this.ciTypeId = ciTypeId;
		this.ciSubTypeId = ciSubTypeId;
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public Integer getCiTypeId() {
		return ciTypeId;
	}
	public void setCiTypeId(Integer ciTypeId) {
		this.ciTypeId = ciTypeId;
	}
	
	public String getCiTypeName() {
		return ciTypeName;
	}
	public void setCiTypeName(String ciTypeName) {
		this.ciTypeName = ciTypeName;
	}

	public Integer getCiSubTypeId() {
		return ciSubTypeId;
	}
	public void setCiSubTypeId(Integer ciSubTypeId) {
		this.ciSubTypeId = ciSubTypeId;
	}

	public int getSortId() {
		return sortId;
	}
	public void setSortId(int sortId) {
		this.sortId = sortId;
	}

	@Override
	public int compareTo(CiTypeDTO o) {
		return getSortId() > o.getSortId() ? 1 : getSortId() < o.getSortId() ? -1 : 0;
	}
}