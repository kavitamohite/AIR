package com.bayerbbs.applrepos.dto;

public class AssetViewDataDTO {

	private Boolean isIntangibleAsset;
	private Boolean isTangibleAssetWithInventory;
	private Boolean isTangibleAssetWithoutInventory;

	// Asset Information
	private Long id;
	private String identNumber;
	private String inventoryNumber;
	private String sapDescription;
	private Long reasonId;

	// Product
	private String manufacturer;
	private Long manufacturerId;

	private String subCategory;
	private Long subcategoryId;

	private String type;
	private Long typeId;

	private String model;
	private Long modelId;

	// Technicas
	private String technicalNumber;
	private String technicalMaster;
	private String systemPlatformName;
	private String hardwareSystem;
	private String osName;
	private String workflowStatusHws;
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
	private Long requesterId;
	private String costCenterManager;
	private String costCenterManagerId;
	private String organizationalunit;
	private String owner;
	private String sapAssetClass;
	private Long sapAssetClassId;
	private Long acquisitionValue;
	private Long bookValue;
	private String bookValueDate;
	private String depreciationStartDate;
	private Long usefulEconomicLife;
	private String retirementDate;

	// Contacts
	private Long editorsGroupId;
	private String editorsGroup;

	// Others
	private String serialNumber;
	private String assetChecked;
	private String alias;
	private Long kontoId;

	public Boolean getIsIntangibleAsset() {
		return isIntangibleAsset;
	}

	public void setIsIntangibleAsset(Boolean isIntangibleAsset) {
		this.isIntangibleAsset = isIntangibleAsset;
	}

	public Boolean getIsTangibleAssetWithInventory() {
		return isTangibleAssetWithInventory;
	}

	public void setIsTangibleAssetWithInventory(
			Boolean isTangibleAssetWithInventory) {
		this.isTangibleAssetWithInventory = isTangibleAssetWithInventory;
	}

	public Boolean getIsTangibleAssetWithoutInventory() {
		return isTangibleAssetWithoutInventory;
	}

	public void setIsTangibleAssetWithoutInventory(
			Boolean isTangibleAssetWithoutInventory) {
		this.isTangibleAssetWithoutInventory = isTangibleAssetWithoutInventory;
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

	public Long getReasonId() {
		return reasonId;
	}

	public void setReasonId(Long reasonId) {
		this.reasonId = reasonId;
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

	public String getSystemPlatformName() {
		return systemPlatformName;
	}

	public void setSystemPlatformName(String systemPlatformName) {
		this.systemPlatformName = systemPlatformName;
	}

	public String getHardwareSystem() {
		return hardwareSystem;
	}

	public void setHardwareSystem(String hardwareSystem) {
		this.hardwareSystem = hardwareSystem;
	}

	public String getOsName() {
		return osName;
	}

	public void setOsName(String osName) {
		this.osName = osName;
	}

	public String getHardwareTransientSystem() {
		return hardwareTransientSystem;
	}

	public void setHardwareTransientSystem(String hardwareTransientSystem) {
		this.hardwareTransientSystem = hardwareTransientSystem;
	}

	public String getWorkflowStatusHws() {
		return workflowStatusHws;
	}

	public void setWorkflowStatusHws(String workflowStatusHws) {
		this.workflowStatusHws = workflowStatusHws;
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

	public Long getRequesterId() {
		return requesterId;
	}

	public void setRequesterId(Long requesterId) {
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

	public Long getAcquisitionValue() {
		return acquisitionValue;
	}

	public void setAcquisitionValue(Long acquisitionValue) {
		this.acquisitionValue = acquisitionValue;
	}

	public Long getBookValue() {
		return bookValue;
	}

	public void setBookValue(Long bookValue) {
		this.bookValue = bookValue;
	}

	public String getBookValueDate() {
		return bookValueDate;
	}

	public void setBookValueDate(String bookValueDate) {
		this.bookValueDate = bookValueDate;
	}

	public String getDepreciationStartDate() {
		return depreciationStartDate;
	}

	public void setDepreciationStartDate(String depreciationStartDate) {
		this.depreciationStartDate = depreciationStartDate;
	}

	public Long getUsefulEconomicLife() {
		return usefulEconomicLife;
	}

	public void setUsefulEconomicLife(Long usefulEconomicLife) {
		this.usefulEconomicLife = usefulEconomicLife;
	}

	public String getRetirementDate() {
		return retirementDate;
	}

	public void setRetirementDate(String retirementDate) {
		this.retirementDate = retirementDate;
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

	public String getAssetChecked() {
		return assetChecked;
	}

	public void setAssetChecked(String assetChecked) {
		this.assetChecked = assetChecked;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public Long getKontoId() {
		return kontoId;
	}

	public void setKontoId(Long kontoId) {
		this.kontoId = kontoId;
	}

}
