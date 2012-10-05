package com.bayerbbs.applrepos.dto;

public class PersonOptionDTO {

	Long personOptionId;
	
	Long interfaceId;
	String CWID;
	String name;
	String value;

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
	
}
