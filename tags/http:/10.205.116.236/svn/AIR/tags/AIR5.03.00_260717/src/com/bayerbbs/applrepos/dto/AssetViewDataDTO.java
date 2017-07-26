package com.bayerbbs.applrepos.dto;

import java.util.Comparator;

public class AssetViewDataDTO {

	private Boolean isSoftwareComponent;
	private Boolean isHardwareWithInventory;
	private Boolean isHardwareWithoutInventory;
	private String cwid;
	private String error;

	// Asset Information
	private Long id;
	private String identNumber;
	private String inventoryNumber;
	private String sapDescription;

	// Product
	private String manufacturer;
	private Long manufacturerId;

	private String subCategory;
	private Long subcategoryId;

	private String type;
	private Long typeId;

	private String model;
	private Long modelId;

	private String softwareId;// product name in software
	// Technicas
	private String technicalNumber;
	private String technicalMaster;
	private Long systemPlatformNameId;
	private String systemPlatformName;

	private String osName;
	private Integer osNameId;

	private String hardwareTransientSystem;
	private Long workflowStatusId;
	private String workflowStatus;
	private Long generalUsageId;
	private Long itSecurityRelevance;
	private String comment;

	// Location
	private String country;
	private Long countryId;

	private String site;
	private Long siteId;

	private String building;
	private Long buildingId;

	private String room;
	private Long roomId;

	private String rack;
	private Long rackId;

	// Business Information
	private String orderNumber;
	private String costCenter;
	private Long costCenterId;
	private String pspElement;
	private Long pspElementId;
	private String pspText;
	private String requester;
	private String requesterId;
	private String costCenterManager;
	private String costCenterManagerId;
	private String organizationalunit;
	private String owner;
	private Long ownerId;
	private String sapAssetClass;
	private Long sapAssetClassId;

	// Contacts
	private Long editorsGroupId;
	private String editorsGroup;

	// Others
	private String serialNumber;
	
	private String insertUser;
	
	private String insertSource;
	
	private String inventoryStockNumber;

	public String getInventoryStockNumber() {
		return inventoryStockNumber;
	}

	public void setInventoryStockNumber(String inventoryStockNumber) {
		this.inventoryStockNumber = inventoryStockNumber;
	}

	public Boolean getIsSoftwareComponent() {
		return isSoftwareComponent;
	}

	public void setIsSoftwareComponent(Boolean isSoftwareComponent) {
		this.isSoftwareComponent = isSoftwareComponent;
	}

	public Boolean getIsHardwareWithInventory() {
		return isHardwareWithInventory;
	}

	public void setIsHardwareWithInventory(Boolean isHardwareWithInventory) {
		this.isHardwareWithInventory = isHardwareWithInventory;
	}

	public Boolean getIsHardwareWithoutInventory() {
		return isHardwareWithoutInventory;
	}

	public void setIsHardwareWithoutInventory(Boolean isHardwareWithoutInventory) {
		this.isHardwareWithoutInventory = isHardwareWithoutInventory;
	}

	public String getCwid() {
		return cwid;
	}

	public void setCwid(String cwid) {
		this.cwid = cwid;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIdentNumber() {
		return identNumber;
	}

	public void setIdentNumber(String identNumber) {
		this.identNumber = identNumber;
	}

	public String getInventoryNumber() {
		return inventoryNumber;
	}

	public void setInventoryNumber(String inventoryNumber) {
		this.inventoryNumber = inventoryNumber;
	}

	public String getSapDescription() {
		return sapDescription;
	}

	public void setSapDescription(String sapDescription) {
		this.sapDescription = sapDescription;
	}

	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public Long getManufacturerId() {
		return manufacturerId;
	}

	public void setManufacturerId(Long manufacturerId) {
		this.manufacturerId = manufacturerId;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	public Long getSubcategoryId() {
		return subcategoryId;
	}

	public void setSubcategoryId(Long subcategoryId) {
		this.subcategoryId = subcategoryId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Long getModelId() {
		return modelId;
	}

	public void setModelId(Long modelId) {
		this.modelId = modelId;
	}

	public String getTechnicalNumber() {
		return technicalNumber;
	}

	public void setTechnicalNumber(String technicalNumber) {
		this.technicalNumber = technicalNumber;
	}

	public String getTechnicalMaster() {
		return technicalMaster;
	}

	public void setTechnicalMaster(String technicalMaster) {
		this.technicalMaster = technicalMaster;
	}
	
	public Long getSystemPlatformNameId() {
		return systemPlatformNameId;
	}

	public void setSystemPlatformNameId(Long systemPlatformNameId) {
		this.systemPlatformNameId = systemPlatformNameId;
	}

	public String getSystemPlatformName() {
		return systemPlatformName;
	}

	public void setSystemPlatformName(String systemPlatformName) {
		this.systemPlatformName = systemPlatformName;
	}

	public String getOsName() {
		return osName;
	}

	public void setOsName(String osName) {
		this.osName = osName;
	}

	public Integer getOsNameId() {
		return osNameId;
	}

	public void setOsNameId(Integer osNameId) {
		this.osNameId = osNameId;
	}

	public String getHardwareTransientSystem() {
		return hardwareTransientSystem;
	}

	public void setHardwareTransientSystem(String hardwareTransientSystem) {
		this.hardwareTransientSystem = hardwareTransientSystem;
	}

	public Long getWorkflowStatusId() {
		return workflowStatusId;
	}

	public void setWorkflowStatusId(Long workflowStatusId) {
		this.workflowStatusId = workflowStatusId;
	}

	public String getWorkflowStatus() {
		return workflowStatus;
	}

	public void setWorkflowStatus(String workflowStatus) {
		this.workflowStatus = workflowStatus;
	}

	public Long getGeneralUsageId() {
		return generalUsageId;
	}

	public void setGeneralUsageId(Long generalUsageId) {
		this.generalUsageId = generalUsageId;
	}

	public Long getItSecurityRelevance() {
		return itSecurityRelevance;
	}

	public void setItSecurityRelevance(Long itSecurityRelevance) {
		this.itSecurityRelevance = itSecurityRelevance;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Long getCountryId() {
		return countryId;
	}

	public void setCountryId(Long countryId) {
		this.countryId = countryId;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public Long getSiteId() {
		return siteId;
	}

	public void setSiteId(Long siteId) {
		this.siteId = siteId;
	}

	public String getBuilding() {
		return building;
	}

	public void setBuilding(String building) {
		this.building = building;
	}

	public Long getBuildingId() {
		return buildingId;
	}

	public void setBuildingId(Long buildingId) {
		this.buildingId = buildingId;
	}

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}

	public Long getRoomId() {
		return roomId;
	}

	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}

	public String getRack() {
		return rack;
	}

	public void setRack(String rack) {
		this.rack = rack;
	}

	public Long getRackId() {
		return rackId;
	}

	public void setRackId(Long rackId) {
		this.rackId = rackId;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getCostCenter() {
		return costCenter;
	}

	public void setCostCenter(String costCenter) {
		this.costCenter = costCenter;
	}

	public Long getCostCenterId() {
		return costCenterId;
	}

	public void setCostCenterId(Long costCenterId) {
		this.costCenterId = costCenterId;
	}

	public String getPspElement() {
		return pspElement;
	}

	public void setPspElement(String pspElement) {
		this.pspElement = pspElement;
	}

	public Long getPspElementId() {
		return pspElementId;
	}

	public void setPspElementId(Long pspElementId) {
		this.pspElementId = pspElementId;
	}

	public String getPspText() {
		return pspText;
	}

	public void setPspText(String pspText) {
		this.pspText = pspText;
	}

	public String getRequester() {
		return requester;
	}

	public void setRequester(String requester) {
		this.requester = requester;
	}

	public String getRequesterId() {
		return requesterId;
	}

	public void setRequesterId(String requesterId) {
		this.requesterId = requesterId;
	}

	public String getCostCenterManager() {
		return costCenterManager;
	}

	public void setCostCenterManager(String costCenterManager) {
		this.costCenterManager = costCenterManager;
	}

	public String getCostCenterManagerId() {
		return costCenterManagerId;
	}

	public void setCostCenterManagerId(String costCenterManagerId) {
		this.costCenterManagerId = costCenterManagerId;
	}

	public String getOrganizationalunit() {
		return organizationalunit;
	}

	public void setOrganizationalunit(String organizationalunit) {
		this.organizationalunit = organizationalunit;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}

	public String getSapAssetClass() {
		return sapAssetClass;
	}

	public void setSapAssetClass(String sapAssetClass) {
		this.sapAssetClass = sapAssetClass;
	}

	public Long getSapAssetClassId() {
		return sapAssetClassId;
	}

	public void setSapAssetClassId(Long sapAssetClassId) {
		this.sapAssetClassId = sapAssetClassId;
	}

	public Long getEditorsGroupId() {
		return editorsGroupId;
	}

	public void setEditorsGroupId(Long editorsGroupId) {
		this.editorsGroupId = editorsGroupId;
	}

	public String getEditorsGroup() {
		return editorsGroup;
	}

	public void setEditorsGroup(String editorsGroup) {
		this.editorsGroup = editorsGroup;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	/**
	 * @return the softwareId
	 */
	public String getSoftwareId() {
		return softwareId;
	}

	/**
	 * @param softwareId
	 *            the softwareId to set
	 */
	public void setSoftwareId(String softwareId) {
		this.softwareId = softwareId;
	}
	
	

	public String getInsertUser() {
		return insertUser;
	}

	public void setInsertUser(String insertUser) {
		this.insertUser = insertUser;
	}

	public String getInsertSource() {
		return insertSource;
	}

	public void setInsertSource(String insertSource) {
		this.insertSource = insertSource;
	}

	@Override
	public String toString() {
		return "AssetViewDataDTO [isSoftwareComponent=" + isSoftwareComponent
				+ ", isHardwareWithInventory=" + isHardwareWithInventory
				+ ", isHardwareWithoutInventory=" + isHardwareWithoutInventory
				+ ", cwid=" + cwid + ", error=" + error + ", id=" + id
				+ ", identNumber=" + identNumber + ", inventoryNumber="
				+ inventoryNumber + ", sapDescription=" + sapDescription
				+ ", manufacturer=" + manufacturer + ", manufacturerId="
				+ manufacturerId + ", subCategory=" + subCategory
				+ ", subcategoryId=" + subcategoryId + ", type=" + type
				+ ", typeId=" + typeId + ", model=" + model + ", modelId="
				+ modelId + ", softwareId=" + softwareId + ", technicalNumber="
				+ technicalNumber + ", technicalMaster=" + technicalMaster
				+ ", systemPlatformNameId=" + systemPlatformNameId
				+ ", systemPlatformName=" + systemPlatformName + ", osName="
				+ osName + ", osNameId=" + osNameId
				+ ", hardwareTransientSystem=" + hardwareTransientSystem
				+ ", workflowStatusId=" + workflowStatusId
				+ ", workflowStatus=" + workflowStatus + ", generalUsageId="
				+ generalUsageId + ", itSecurityRelevance="
				+ itSecurityRelevance + ", comment=" + comment + ", country="
				+ country + ", countryId=" + countryId + ", site=" + site
				+ ", siteId=" + siteId + ", building=" + building
				+ ", buildingId=" + buildingId + ", room=" + room + ", roomId="
				+ roomId + ", rack=" + rack + ", rackId=" + rackId
				+ ", orderNumber=" + orderNumber + ", costCenter=" + costCenter
				+ ", costCenterId=" + costCenterId + ", pspElement="
				+ pspElement + ", pspElementId=" + pspElementId + ", pspText="
				+ pspText + ", requester=" + requester + ", requesterId="
				+ requesterId + ", costCenterManager=" + costCenterManager
				+ ", costCenterManagerId=" + costCenterManagerId
				+ ", organizationalunit=" + organizationalunit + ", owner="
				+ owner + ", ownerId=" + ownerId + ", sapAssetClass="
				+ sapAssetClass + ", sapAssetClassId=" + sapAssetClassId
				+ ", editorsGroupId=" + editorsGroupId + ", editorsGroup="
				+ editorsGroup + ", serialNumber=" + serialNumber
				+ ", insertUser=" + insertUser + ", insertSource="
				+ insertSource + "]";
	}
	
	
	
	public static Comparator <AssetViewDataDTO> buildingComparatorASC
    = new Comparator<AssetViewDataDTO>() {

public int compare(AssetViewDataDTO asset1, AssetViewDataDTO asset2) {

String buildingName1 = asset1.getBuilding();
String buildingName2 = asset2.getBuilding();

//ascending order
return buildingName1.compareTo(buildingName2);

//descending order
//return fruitName2.compareTo(fruitName1);
}

};


public static Comparator <AssetViewDataDTO> buildingComparatorDSC
= new Comparator<AssetViewDataDTO>() {

public int compare(AssetViewDataDTO asset1, AssetViewDataDTO asset2) {

String buildingName1 = asset1.getBuilding();
String buildingName2 = asset2.getBuilding();


return buildingName2.compareTo(buildingName1);


}
};

public static Comparator <AssetViewDataDTO> roomComparatorDSC
= new Comparator<AssetViewDataDTO>() {

public int compare(AssetViewDataDTO asset1, AssetViewDataDTO asset2) {

String roomName1 = asset1.getRoom();
String roomName2 = asset2.getRoom();


return roomName2.compareTo(roomName1);


}
};

public static Comparator <AssetViewDataDTO> roomComparatorASC
= new Comparator<AssetViewDataDTO>() {

public int compare(AssetViewDataDTO asset1, AssetViewDataDTO asset2) {

String roomName1 = asset1.getRoom();
String roomName2 = asset2.getRoom();


return roomName1.compareTo(roomName2);


}
};


public static Comparator <AssetViewDataDTO> rackComparatorASC
= new Comparator<AssetViewDataDTO>() {

public int compare(AssetViewDataDTO asset1, AssetViewDataDTO asset2) {

String rackName1 = asset1.getRack();
String rackName2 = asset2.getRack();


return rackName1.compareTo(rackName2);


}
};

public static Comparator <AssetViewDataDTO> rackComparatorDSC
= new Comparator<AssetViewDataDTO>() {

public int compare(AssetViewDataDTO asset1, AssetViewDataDTO asset2) {

String rackName1 = asset1.getRack();
String rackName2 = asset2.getRack();


return rackName2.compareTo(rackName1);


}
};


}
