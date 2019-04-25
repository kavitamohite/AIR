package com.bayerbbs.applrepos.dto;

import java.sql.Timestamp;

public class PersonOptionDTO {

	Long personOptionId;
	
	Long interfaceId;
	String CWID;
	String name;
	String value;

	Timestamp insertTimestamp;
	String insertUser;
	String insertQuelle;

	Timestamp updateTimestamp;
	String updateUser;
	String updateQuelle;

	Timestamp deleteTimestamp;
	String deleteUser;
	String deleteQuelle;

	
	public Long getPersonOptionId() {
		return personOptionId;
	}
	public void setPersonOptionId(Long personOptionId) {
		this.personOptionId = personOptionId;
	}
	public Long getInterfaceId() {
		return interfaceId;
	}
	public void setInterfaceId(Long interfaceId) {
		this.interfaceId = interfaceId;
	}
	public String getCWID() {
		return CWID;
	}
	public void setCWID(String cWID) {
		CWID = cWID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public Timestamp getInsertTimestamp() {
		return insertTimestamp;
	}
	public void setInsertTimestamp(Timestamp insertTimestamp) {
		this.insertTimestamp = insertTimestamp;
	}
	public String getInsertUser() {
		return insertUser;
	}
	public void setInsertUser(String insertUser) {
		this.insertUser = insertUser;
	}
	public String getInsertQuelle() {
		return insertQuelle;
	}
	public void setInsertQuelle(String insertQuelle) {
		this.insertQuelle = insertQuelle;
	}
	public Timestamp getUpdateTimestamp() {
		return updateTimestamp;
	}
	public void setUpdateTimestamp(Timestamp updateTimestamp) {
		this.updateTimestamp = updateTimestamp;
	}
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	public String getUpdateQuelle() {
		return updateQuelle;
	}
	public void setUpdateQuelle(String updateQuelle) {
		this.updateQuelle = updateQuelle;
	}
	public Timestamp getDeleteTimestamp() {
		return deleteTimestamp;
	}
	public void setDeleteTimestamp(Timestamp deleteTimestamp) {
		this.deleteTimestamp = deleteTimestamp;
	}
	public String getDeleteUser() {
		return deleteUser;
	}
	public void setDeleteUser(String deleteUser) {
		this.deleteUser = deleteUser;
	}
	public String getDeleteQuelle() {
		return deleteQuelle;
	}
	public void setDeleteQuelle(String deleteQuelle) {
		this.deleteQuelle = deleteQuelle;
	}
	
}
