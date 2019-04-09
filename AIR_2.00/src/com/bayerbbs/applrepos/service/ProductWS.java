package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.ProductDTO;
import com.bayerbbs.applrepos.dto.TypeDTO;
import com.bayerbbs.applrepos.hibernate.ManufacturerHbn;
import com.bayerbbs.applrepos.hibernate.ModelHbn;
import com.bayerbbs.applrepos.hibernate.SoftwareProductHbn;
import com.bayerbbs.applrepos.hibernate.SubCategoryHbn;
import com.bayerbbs.applrepos.hibernate.TypeHbn;

public class ProductWS {
	public ProductDTO[] findManufacturerList() {
		return ManufacturerHbn.findManufacturerList();
	}

	public ProductDTO[] findSubCategoryList() {
		return SubCategoryHbn.findSubCategoryList();
	}

	public ProductDTO[] findTypeList(TypeDTO type) {
		return TypeHbn.findTypeList(type);
	}

	public ProductDTO[] findModelList(Long id) {
		return ModelHbn.findModelList(id);
	}

	public KeyValueDTO[] findSoftwareManufacturerList(Long id) {
		return ManufacturerHbn.findSoftwareManufacturerList();
	}

	public KeyValueDTO[] findSoftwareProductList(Long id) {
		return SoftwareProductHbn.getSoftwareProductById(id);
	}
}
