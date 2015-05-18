package com.bayerbbs.applrepos.dto;



public class BuildingAreaDTO extends LocationDTO {
	private static final long serialVersionUID = -8683668255902232558L;
	
//	private Set<BuildingDTO> buildings;
	private String buildingData;
	
	private Long buildingId;
	
	private String street;
	private String streetNumber;
	private String postalCode;
	private String location;
	
	//Added by vandana
	private String providerName;
	private String providerNameHidden;
	private String providerAddress;
	private String providerAddressHidden;
	
	
//	public Set<BuildingDTO> getBuildings() {
//		return buildings;
//	}
//	public void setBuildings(Set<BuildingDTO> buildings) {
//		this.buildings = buildings;
//	}
	
	public String getBuildingData() {
		return buildingData;
	}
	public void setBuildingData(String buildingData) {
		this.buildingData = buildingData;
	}
	
	public Long getBuildingId() {
		return buildingId;
	}
	public void setBuildingId(Long buildingId) {
		this.buildingId = buildingId;
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
	/**
	 * @return the providerName
	 */
	public String getProviderName() {
		return providerName;
	}
	/**
	 * @param providerName the providerName to set
	 */
	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}
	/**
	 * @return the providerNameHidden
	 */
	public String getProviderNameHidden() {
		return providerNameHidden;
	}
	/**
	 * @param providerNameHidden the providerNameHidden to set
	 */
	public void setProviderNameHidden(String providerNameHidden) {
		this.providerNameHidden = providerNameHidden;
	}
	/**
	 * @return the providerAddress
	 */
	public String getProviderAddress() {
		return providerAddress;
	}
	/**
	 * @param providerAddress the providerAddress to set
	 */
	public void setProviderAddress(String providerAddress) {
		this.providerAddress = providerAddress;
	}
	/**
	 * @return the providerAddressHidden
	 */
	public String getProviderAddressHidden() {
		return providerAddressHidden;
	}
	/**
	 * @param providerAddressHidden the providerAddressHidden to set
	 */
	public void setProviderAddressHidden(String providerAddressHidden) {
		this.providerAddressHidden = providerAddressHidden;
	}
	
	
}