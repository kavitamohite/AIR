package com.bayerbbs.applrepos.dto;

import java.io.Serializable;

public class BuildingDTO extends LocationDTO implements Serializable {
	private static final long serialVersionUID = 1853465853927062074L;
	
	private String alias;
	
	private String buildingCode;
	private String street;
	private String streetNumber;
	private String postalCode;
	private String location;
	
	
	//Added by vandana
	private String Provider_Name;
	private String Provider_NameHidden;
	private String Provider_Address;
	private String Provider_AddressHidden;
	
	public String getProvider_Name() {
		return Provider_Name;
	}

	public void setProvider_Name(String Provider_Name) {
		this.Provider_Name = Provider_Name;
	}

	public String getProvider_NameHidden() {
		return Provider_NameHidden;
	}

	public void setProvider_NameHidden(String Provider_NameHidden) {
		this.Provider_NameHidden = Provider_NameHidden;
	}
	
	public String getProvider_Address() {
		return Provider_Address;
	}

	public void setProvider_Address(String Provider_Address) {
		this.Provider_Address = Provider_Address;
	}

	public String getProvider_AddressHidden() {
		return Provider_AddressHidden;
	}

	public void setProvider_AddressHidden(String Provider_AddressHidden) {
		this.Provider_AddressHidden = Provider_AddressHidden;
	}
	//ended by vandana

	

	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getBuildingCode() {
		return buildingCode;
	}
	public void setBuildingCode(String buildingCode) {
		this.buildingCode = buildingCode;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getStreetNumber() {
		return streetNumber;
	}
	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
}