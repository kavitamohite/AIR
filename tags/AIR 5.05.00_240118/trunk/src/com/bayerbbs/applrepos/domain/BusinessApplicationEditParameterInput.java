package com.bayerbbs.applrepos.domain;



public class BusinessApplicationEditParameterInput {

	private String cwid;
	private String token;
	
	// basic
	private Long id;//Business Application Id
	private Long barAppId;//BAR Application Id
	
	// connections
	private String upStreamAdd;
	private String upStreamDelete;
	private String downStreamAdd;
	private String downStreamDelete;
	
	//private Boolean forceOverride;
	private Integer tableId;
	public String getCwid() {
		return cwid;
	}
	public void setCwid(String cwid) {
		this.cwid = cwid;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getBarAppId() {
		return barAppId;
	}
	public void setBarAppId(Long barAppId) {
		this.barAppId = barAppId;
	}
	public String getUpStreamAdd() {
		return upStreamAdd;
	}
	public void setUpStreamAdd(String upStreamAdd) {
		this.upStreamAdd = upStreamAdd;
	}
	public String getUpStreamDelete() {
		return upStreamDelete;
	}
	public void setUpStreamDelete(String upStreamDelete) {
		this.upStreamDelete = upStreamDelete;
	}
	public String getDownStreamAdd() {
		return downStreamAdd;
	}
	public void setDownStreamAdd(String downStreamAdd) {
		this.downStreamAdd = downStreamAdd;
	}
	public String getDownStreamDelete() {
		return downStreamDelete;
	}
	public void setDownStreamDelete(String downStreamDelete) {
		this.downStreamDelete = downStreamDelete;
	}
	/*public Boolean getForceOverride() {
		return forceOverride;
	}
	public void setForceOverride(Boolean forceOverride) {
		this.forceOverride = forceOverride;
	}*/
	public Integer getTableId() {
		return tableId;
	}
	public void setTableId(Integer tableId) {
		this.tableId = tableId;
	}
	
	
	
	
	
}
