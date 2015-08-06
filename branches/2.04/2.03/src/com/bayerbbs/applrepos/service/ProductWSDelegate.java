package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.ProductDTO;
import com.bayerbbs.applrepos.dto.TypeDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ProductWSService", portName = "ProductWSPort")
public class ProductWSDelegate {

	ProductWS productWS = new ProductWS();

	public ProductDTO[] findManufacturerList(DefaultDataInput input) {
		return productWS.findManufacturerList();
	}

	public ProductDTO[] findSubCategoryList(DefaultDataInput input) {
		return productWS.findSubCategoryList();
	}

	public ProductDTO[] findTypeList(TypeDTO input) {
		return productWS.findTypeList(input);
	}

	public ProductDTO[] findModelList(DefaultDataInput input) {
		return productWS.findModelList(input.getId());
	}

	public KeyValueDTO[] findSoftwareManufacturerList(DefaultDataInput input) {
		return productWS.findSoftwareManufacturerList(input.getId());
	}

	public KeyValueDTO[] findSoftwareProductList(DefaultDataInput input) {
		return productWS.findSoftwareProductList(input.getId());
	}

}
