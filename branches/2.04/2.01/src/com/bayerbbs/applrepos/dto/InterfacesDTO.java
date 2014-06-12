package com.bayerbbs.applrepos.dto;

public class InterfacesDTO {

	/**
	 * The DTO (Data transfer object) for the database table "INTERFACES"
	 * 
	 * @author evafl
	 *
	 */
	
	private Long interfacesId;
	private String interfaceToken;
	private String interfaceName;
	private String sisecEditable;
	
	public Long getInterfacesId() {
		return interfacesId;
	}
	public void setInterfacesId(Long interfacesId) {
		this.interfacesId = interfacesId;
	}
	public String getInterfaceToken() {
		return interfaceToken;
	}
	public void setInterfaceToken(String interfaceToken) {
		this.interfaceToken = interfaceToken;
	}
	public String getInterfaceName() {
		return interfaceName;
	}
	public void setInterfaceName(String interfaceName) {
		this.interfaceName = interfaceName;
	}
	public String getSisecEditable() {
		return sisecEditable;
	}
	public void setSisecEditable(String sisecEditable) {
		this.sisecEditable = sisecEditable;
	}
	
}
