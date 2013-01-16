package com.bayerbbs.applrepos.dto;

public class HistoryViewDataDTO {

	Long id;	// internal id - NOT from database - only for internal use 
	Long tableId;
	Long ciId;
	String datetime;
	String changeSource;
	String changeDBUser;
	String changeUserCWID;
	String changeUserName;
	String changeAttributeName;
	String changeAttributeOldValue;
	String changeAttributeNewValue;
	
	String infoType;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public String getDatetime() {
		return datetime;
	}
	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
	public String getChangeSource() {
		return changeSource;
	}
	public void setChangeSource(String changeSource) {
		this.changeSource = changeSource;
	}
	public String getChangeDBUser() {
		return changeDBUser;
	}
	public void setChangeDBUser(String changeDBUser) {
		this.changeDBUser = changeDBUser;
	}
	public String getChangeUserCWID() {
		return changeUserCWID;
	}
	public void setChangeUserCWID(String changeUserCWID) {
		this.changeUserCWID = changeUserCWID;
	}
	public String getChangeUserName() {
		return changeUserName;
	}
	public void setChangeUserName(String changeUserName) {
		this.changeUserName = changeUserName;
	}
	public String getChangeAttributeName() {
		return changeAttributeName;
	}
	public void setChangeAttributeName(String changeAttributeName) {
		this.changeAttributeName = changeAttributeName;
	}
	public String getChangeAttributeOldValue() {
		return changeAttributeOldValue;
	}
	public void setChangeAttributeOldValue(String changeAttributeOldValue) {
		this.changeAttributeOldValue = changeAttributeOldValue;
	}
	public String getChangeAttributeNewValue() {
		return changeAttributeNewValue;
	}
	public void setChangeAttributeNewValue(String changeAttributeNewValue) {
		this.changeAttributeNewValue = changeAttributeNewValue;
	}
	public String getInfoType() {
		return infoType;
	}
	public void setInfoType(String infoType) {
		this.infoType = infoType;
	}
}
