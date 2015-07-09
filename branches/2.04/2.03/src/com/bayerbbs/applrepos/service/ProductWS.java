package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.hibernate.ManufacturerHbn;
import com.bayerbbs.applrepos.hibernate.ModelHbn;
import com.bayerbbs.applrepos.hibernate.SubCategoryHbn;
import com.bayerbbs.applrepos.hibernate.TypeHbn;

public class ProductWS {
	public KeyValueDTO[] findManufacturerList(Long id) {
		return ManufacturerHbn.getManufacturerById(id);
	}

	public KeyValueDTO[] findSubCategoryList(Long id) {
		return SubCategoryHbn.getSubCategoryById(id);
	}

	public KeyValueDTO[] findTypeList(Long partnerId, Long kategory2Id) {
		return TypeHbn.getTypeById(partnerId, kategory2Id);
	}

	public KeyValueDTO[] findModelList(Long id) {
		return ModelHbn.getModelById(id);
	}

	public KeyValueDTO[] findSoftwareManufacturerList(Long id) {
		return ManufacturerHbn.getManufacturerById(id);
	}

	public KeyValueDTO[] findSoftwareProductList(Long id) {
		return ManufacturerHbn.getSoftwareProductById(id);
	}
}
