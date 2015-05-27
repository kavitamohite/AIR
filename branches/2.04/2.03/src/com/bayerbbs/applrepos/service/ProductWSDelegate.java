package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.TypeDTO;

@javax.jws.WebService(targetNamespace = "http://service.applrepos.bayerbbs.com/", serviceName = "ProductWSService", portName = "ProductWSPort")

public class ProductWSDelegate {
	
	ProductWS productWS=new ProductWS();
	
	public KeyValueDTO[] findManufacturerList(
			DefaultDataInput input) {
		return productWS.findManufacturerList(input.getId());
	}

	public KeyValueDTO[] findSubCategoryList(
			DefaultDataInput input) {
		return productWS.findSubCategoryList(input.getId());
	}
	
	public KeyValueDTO[] findTypeList(
			TypeDTO input) {
		return productWS.findTypeList(input.getPartnerId(), input.getKategory2Id());
	}
	
	public KeyValueDTO[] findModelList(
			DefaultDataInput input) {
		return productWS.findModelList(input.getId());
	}
}
