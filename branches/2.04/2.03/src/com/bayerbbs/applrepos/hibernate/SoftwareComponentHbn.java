package com.bayerbbs.applrepos.hibernate;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.bayerbbs.applrepos.domain.HardwareComponent;
import com.bayerbbs.applrepos.domain.SoftwareComponent;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.service.AssetManagementParameterInput;
import com.bayerbbs.applrepos.service.AssetManagementParameterOutput;

public class SoftwareComponentHbn {

	@SuppressWarnings("unchecked")
	public static AssetManagementParameterOutput searchAsset(AssetManagementParameterInput input) {
		AssetManagementParameterOutput out = new AssetManagementParameterOutput();

		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			BigDecimal total = (BigDecimal) session.createSQLQuery(
					"select count(*) from SOFTWAREKOMPONENTE where lower(PRODUKTBEZ) like '%"
							+ input.getQuery().toLowerCase() + "%'").uniqueResult();
			out.setCountResultSet(total.longValue());

			Criteria criteria = session.createCriteria(SoftwareComponent.class);
			criteria.add(Restrictions.like("prouctDescription", "%" + input.getQuery() + "%").ignoreCase());

			// if (input.getSort() != null) {
			// addSortingCriteria(criteria, input.getSort());
			// }
			criteria.setFirstResult(input.getStart());
			criteria.setMaxResults(input.getLimit());
			List<SoftwareComponent> values = (List<SoftwareComponent>) criteria.list();
			list = getDTOList(values);
			out.setAssetViewDataDTO(list.toArray(new AssetViewDataDTO[list.size()]));
			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				throw e;
			}
		}
		return out;
	}

	private static void addSortingCriteria(Criteria criteria, String sort) {

		if (sort.equals("manufacturer")) {
			criteria.createAlias("partner", "partner");
			criteria.addOrder(Order.asc("partner.name"));
		} else if (sort.equals("sapDescription")) {
			criteria.addOrder(Order.asc("sapDescription"));
		} else if (sort.equals("serialNumber")) {
			criteria.addOrder(Order.asc("serialNumber"));
		} else if (sort.equals("costCenterManager")) {
			criteria.createAlias("konto", "konto");
			criteria.addOrder(Order.asc("konto.cwidVerantw"));
		} else if (sort.equals("organizationalunit")) {
			criteria.addOrder(Order.asc("subResponsible"));
		} else if (sort.equals("costCenter") || sort.equals("pspElement")) {
			criteria.createAlias("konto", "konto");
			criteria.addOrder(Order.asc("konto.name"));
		} else if (sort.equals("inventoryNumber")) {
			criteria.addOrder(Order.asc("inventoryNumber"));
		} else if (sort.equals("requester")) {
			criteria.addOrder(Order.asc("requester"));
		} else if (sort.equals("technicalMaster")) {
			criteria.addOrder(Order.asc("technicalMaster"));
		} else if (sort.equals("technicalNumber")) {
			criteria.addOrder(Order.asc("technicalNumber"));
		} else if (sort.equals("acquisitionValue")) {
			criteria.addOrder(Order.asc("amAnschaffwert"));
		} else if (sort.equals("orderNumber")) {
			criteria.addOrder(Order.asc("orderNumber"));
		} else if (sort.equals("site")) {
			// criteria.addOrder(Order.asc("amAnschaffwert"));
		} else if (sort.equals("assetChecked")) {
			// criteria.addOrder(Order.asc("assetChecked"));
		} else if (sort.equals("sapAssetClass")) {
			criteria.createAlias("hardwareCategory1", "hardwareCategory1");
			criteria.addOrder(Order.asc("hardwareCategory1.hwKategory1"));
		} else if (sort.equals("systemPlatformName")) {
			// criteria.addOrder(Order.asc("systemPlatformName"));
		} else if (sort.equals("subCategory")) {
			criteria.createAlias("hardwareCategory2", "hardwareCategory2");
			criteria.addOrder(Order.asc("hardwareCategory2.hwKategory2"));
		} else if (sort.equals("type")) {
			// criteria.addOrder(Order.asc("type"));
		} else if (sort.equals("model")) {
			// criteria.addOrder(Order.asc("model"));
		} else if (sort.equals("hardwareSystem")) {
			// criteria.addOrder(Order.asc("hardwareSystem"));
		} else if (sort.equals("hardwareTransientSystem")) {
			// criteria.addOrder(Order.asc("hardwareTransientSystem"));
		} else if (sort.equals("site")) {
			// criteria.addOrder(Order.asc("alias"));
		} else if (sort.equals("alias")) {
			// criteria.addOrder(Order.asc("amAnschaffwert"));
		}
	}

	private static List<AssetViewDataDTO> getDTOList(List<SoftwareComponent> values) {

		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();
		for (SoftwareComponent hwComp : values) {
			AssetViewDataDTO dto = getDTO(hwComp);
			list.add(dto);
		}
		return list;
	}

	private static AssetViewDataDTO getDTO(SoftwareComponent hwComp) {

		AssetViewDataDTO dto = new AssetViewDataDTO();
		dto.setId(hwComp.getId());
		if (hwComp.getPartner() != null) {
			dto.setManufacturer(hwComp.getPartner().getName());
		}

		dto.setSapDescription(hwComp.getProuctDescription());
		dto.setSerialNumber(hwComp.getSerialNumber());

		if (hwComp.getKonto() != null) {
			dto.setCostCenter(hwComp.getKonto().getName());
			dto.setCostCenterManager(hwComp.getKonto().getCwidVerantw());
			dto.setPspElement(hwComp.getKonto().getName());
		}
		dto.setOrganizationalunit(hwComp.getSubResponsible());
		dto.setInventoryNumber(hwComp.getInventoryNumber());

		dto.setRequester(hwComp.getRequester());
		dto.setTechnicalMaster(hwComp.getTechnicalMaster());
		dto.setTechnicalNumber(hwComp.getTechnicalNumer());
		dto.setSite("SITE");
		dto.setOrderNumber(hwComp.getBestellNumber());
		dto.setAssetChecked("ASSET CHECKED");
		if (hwComp.getSoftwareCategory1() != null) {
			dto.setSapAssetClass(hwComp.getSoftwareCategory1().getSwKategory1());
		}
		dto.setSapAssetClass("SAP ASSET CLASS");
		if (hwComp.getSoftwareCategory2() != null) {
			dto.setSubCategory(hwComp.getSoftwareCategory2().getHwKategory2());
		}
		dto.setType("TYPE");
		dto.setSystemPlatformName("SYSTEM PLATOFORM");
		dto.setHardwareSystem("HARDWARE SYSTEM");
		dto.setHardwareTransientSystem("TRANSIENT SYSTEM");
		dto.setAlias("ALIAS");
		dto.setOsName("OS Name");
		return dto;
	}

	public static AssetManagementParameterOutput findAssetById(Long assetId) {
		AssetManagementParameterOutput out = new AssetManagementParameterOutput();
		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			Criteria criteria = session.createCriteria(SoftwareComponent.class);
			criteria.add(Restrictions.eq("id", assetId));
			List<SoftwareComponent> values = (List<SoftwareComponent>) criteria.list();
			list = getDTOList(values);
			out.setAssetViewDataDTO(list.toArray(new AssetViewDataDTO[list.size()]));
			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				throw e;
			}
		}
		return out;
	}

}
