package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.bayerbbs.applrepos.domain.HardwareComponent;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;

public class HardwareComponentHbn {

	@SuppressWarnings("unchecked")
	public static List<AssetViewDataDTO> searchAsset(String sapDescription){
		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();
		
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			Criteria criteria = session.createCriteria(HardwareComponent.class);
			criteria.add(Restrictions.like("sapDescription", sapDescription));
			List<HardwareComponent> values = (List<HardwareComponent>) criteria.list();

			list = getDTOList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				throw e;
			}

		}

		return list;
		
	}

	private static List<AssetViewDataDTO> getDTOList(
			List<HardwareComponent> values) {

		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();
		for(HardwareComponent hwComp : values){
			AssetViewDataDTO dto = getDTO(hwComp);
			list.add(dto);
		}
		return list;
	}

	private static AssetViewDataDTO getDTO(HardwareComponent hwComp) {

		AssetViewDataDTO dto = new AssetViewDataDTO();
		dto.setId(hwComp.getId());
		dto.setManufacturer(hwComp.getPartner().getName());
		dto.setSapDescription(hwComp.getSapDescription());
		dto.setSerialNumber(hwComp.getSerialNumber());
		dto.setCostCenterManager(hwComp.getKonto().getName()); // Needs to be checked
		dto.setOrganizationalunit(hwComp.getSubResponsible());
		dto.setCostCenterManager(hwComp.getKonto().getName());
		dto.setInventoryNumber(hwComp.getInventoryNumber());
		dto.setPspElement("PSP ELEMENT");
		dto.setRequester(hwComp.getRequester());
		dto.setTechnicalMaster(hwComp.getTechnicalMaster());
		dto.setTechnicalNumber(hwComp.getTechnicalNumer());
		dto.setAcquisitionValue(hwComp.getAmAnschaffwert());
		dto.setSite("SITE");
		dto.setOrderNumber(hwComp.getOrderNumber());
		dto.setAssetChecked("ASSET CHECKED");
		dto.setSapAssetClass("SAP ASSET CLASS");
		dto.setSubCategory(hwComp.getHardwareCategory2().getId());
		dto.setType("TYPE");
		dto.setModel(hwComp.getCpuModel());
		dto.setSystemPlatformName("SYSTEM PLATOFORM");
		dto.setHardwareSystem("HARDWARE SYSTEM");
		dto.setHardwareTransientSystem("TRANSIENT SYSTEM");
		dto.setAlias("ALIAS");
		dto.setOsName("OS Name");
		return dto;
	}

}
