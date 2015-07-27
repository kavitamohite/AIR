package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.TypeDTO;
import com.bayerbbs.applrepos.hibernate.ManufacturerHbn;
import com.bayerbbs.applrepos.hibernate.ModelHbn;
import com.bayerbbs.applrepos.hibernate.SoftwareProductHbn;
import com.bayerbbs.applrepos.hibernate.SubCategoryHbn;
import com.bayerbbs.applrepos.hibernate.TypeHbn;

public class ProductWS {
	public KeyValueDTO[] findManufacturerList() {
		return ManufacturerHbn.findManufacturerList();
	}

	public KeyValueDTO[] findSubCategoryList() {
		return SubCategoryHbn.findSubCategoryList();
	}

	public KeyValueDTO[] findTypeList(TypeDTO type) {
		return TypeHbn.getTypeById(type);
	}

	public KeyValueDTO[] findModelList(Long id) {
		return ModelHbn.getModelById(id);
	}

	public KeyValueDTO[] findSoftwareManufacturerList(Long id) {
		return ManufacturerHbn.getSoftwareManufacturerById(id);
	}

	public KeyValueDTO[] findSoftwareProductList(Long id) {
		return SoftwareProductHbn.getSoftwareProductById(id);
	}
}
