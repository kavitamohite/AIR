package com.bayerbbs.applrepos.service;

import java.util.ArrayList;
import java.util.List;

import com.bayerbbs.applrepos.domain.Attribute;
import com.bayerbbs.applrepos.domain.SpecialAttribute;
import com.bayerbbs.applrepos.dto.SpecialAttributeViewDataDTO;
import com.bayerbbs.applrepos.hibernate.AttributeHbn;
import com.bayerbbs.applrepos.hibernate.SpecialAttributeHbn;


public class SpecialAttributeWS {

	public SpecialAttributeViewDataDTO[] getSpecialAttributes(
			SpecialAttributeParameterInput input) {
		List<Attribute> attributes = null;
		
		if(input.getCiTypeId() != null && ! (input.getCiTypeId().isEmpty())){ //emria specialAttribute Fix
			
			attributes = AttributeHbn.listAttributeForCiType(input.getCiTypeId());
		} else {
			attributes = AttributeHbn.listAttributeForTableId(input.getTableId());
		}
		List<SpecialAttribute> savedAttributes = SpecialAttributeHbn.findByCiId(input.getCiId());
		List<SpecialAttributeViewDataDTO> specialAttributesViewDataList = new ArrayList<SpecialAttributeViewDataDTO>();
		
		for(SpecialAttribute speAttribute : savedAttributes){
			if(speAttribute.getDeleteTimestamp()==null){
				SpecialAttributeViewDataDTO spa = new SpecialAttributeViewDataDTO();
				spa.setAttributeName(speAttribute.getAttribute().getName());
				spa.setGroup(speAttribute.getAttribute().getAttributeGroup().getName());
				spa.setAttributeId(speAttribute.getAttribute().getId());
				
				if(specialAttributesViewDataList.contains(spa)){
					spa = specialAttributesViewDataList.get(specialAttributesViewDataList.indexOf(spa));
				} 
				
				if("AS_IS".equals(speAttribute.getStatus())){
					spa.setAsIsValueId(speAttribute.getAttributeValue().getId());
				} else {
					spa.setToBeValueId(speAttribute.getAttributeValue().getId());
				}
				
				if(!specialAttributesViewDataList.contains(spa)){
					specialAttributesViewDataList.add(spa);
				} 
			}

		}
		
		for(Attribute temp : attributes){
			SpecialAttributeViewDataDTO spa = new SpecialAttributeViewDataDTO();
			spa.setAttributeName(temp.getName());
			spa.setAttributeId(temp.getId());
			if(temp.getAttributeGroup()!=null){
				spa.setGroup(temp.getAttributeGroup().getName());
			}
			if(!specialAttributesViewDataList.contains(spa)){
				specialAttributesViewDataList.add(spa);
			}
		}
		
		return specialAttributesViewDataList.toArray(new SpecialAttributeViewDataDTO[specialAttributesViewDataList.size()]);
	}
	
	public Boolean saveSpecialAttribute(SpecialAttributeParameterInput input){
		return SpecialAttributeHbn.saveSpecialAttributeFromDTO(input.getCwid(),input.getToken(), input.getCiId(), input.getTableId(), input.getSpecialAttributeViewDataDTO());
	}
}
