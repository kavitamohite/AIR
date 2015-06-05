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

import com.bayerbbs.applrepos.domain.HardwareCategory1;
import com.bayerbbs.applrepos.domain.HardwareCategory2;
import com.bayerbbs.applrepos.domain.HardwareCategory3;
import com.bayerbbs.applrepos.domain.HardwareCategory4;
import com.bayerbbs.applrepos.domain.HardwareComponent;
import com.bayerbbs.applrepos.domain.Konto;
import com.bayerbbs.applrepos.domain.Partner;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.service.AssetManagementParameterInput;
import com.bayerbbs.applrepos.service.AssetManagementParameterOutput;

public class HardwareComponentHbn {

	@SuppressWarnings("unchecked")
	public static AssetManagementParameterOutput searchAsset(AssetManagementParameterInput input) {
		AssetManagementParameterOutput out = new AssetManagementParameterOutput();

		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			BigDecimal total = (BigDecimal) session.createSQLQuery(
					"select count(*) from HARDWAREKOMPONENTE where lower(SAP_DESCRIPTION) like '%"
							+ input.getQuery().toLowerCase() + "%'").uniqueResult();
			out.setCountResultSet(total.longValue());

			Criteria criteria = session.createCriteria(HardwareComponent.class);
			criteria.add(Restrictions.like("sapDescription", "%" + input.getQuery() + "%").ignoreCase());

			if (input.getSort() != null) {
				addSortingCriteria(criteria, input.getSort());
			}
			criteria.setFirstResult(input.getStart());
			criteria.setMaxResults(input.getLimit());
			List<HardwareComponent> values = (List<HardwareComponent>) criteria.list();
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

	private static List<AssetViewDataDTO> getDTOList(List<HardwareComponent> values) {

		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();
		for (HardwareComponent hwComp : values) {
			AssetViewDataDTO dto = getDTO(hwComp);
			list.add(dto);
		}
		return list;
	}

	private static AssetViewDataDTO getDTO(HardwareComponent hwComp) {

		AssetViewDataDTO dto = new AssetViewDataDTO();

		dto.setId(hwComp.getId());
		
		//Asset Information
		dto.setIdentNumber(hwComp.getName());
		dto.setInventoryNumber(hwComp.getInventoryP69());
		dto.setSapDescription(hwComp.getSapDescription());
		

		//Product
		if (hwComp.getHersteller() != null) {
			dto.setManufacturer(hwComp.getHersteller().getName());
			dto.setManufacturerId(hwComp.getHersteller().getId());
		}
		if (hwComp.getHardwareCategory2() != null) {
			dto.setSubCategory(hwComp.getHardwareCategory2().getHwKategory2());
			dto.setSubcategoryId(hwComp.getHardwareCategory2().getId());
		}
		if (hwComp.getHardwareCategory3() != null) {
			dto.setTypeId(hwComp.getHardwareCategory3().getId());
			dto.setType(hwComp.getHardwareCategory3().getHwKategory3());
		}
		if (hwComp.getHardwareCategory4() != null) {
			dto.setModelId(hwComp.getHardwareCategory4().getId());
			dto.setModel(hwComp.getHardwareCategory4().getHwKategory4());
		}

		//Technics
		dto.setTechnicalNumber(hwComp.getTechnicalNumer());
		dto.setTechnicalMaster(hwComp.getTechnicalMaster());
		dto.setSystemPlatformName("SYSTEM PLATOFORM");
		dto.setHardwareSystem("HARDWARE SYSTEM");
		dto.setHardwareTransientSystem("TRANSIENT SYSTEM");
		if(hwComp.getLifecycleSubStat()!=null){
			dto.setWorkflowStatusId(hwComp.getLifecycleSubStat().getId());
			dto.setWorkflowStatus(hwComp.getLifecycleSubStat().getStatus());
		}
		dto.setGeneralUsageId(hwComp.getOperationalStatus().getId());
		
		//Location
//		dto.setCountryId(countryId);
//		dto.setSiteId(siteId);
		dto.setSite("SITE");
//		dto.setBuildingId(buildingId);
//		dto.setRoomId(roomId);
//		dto.setRackId(rackId);
		
		//Business Administration
		dto.setOrderNumber(hwComp.getOrderNumber());
		if (hwComp.getKonto() != null) {
			dto.setCostCenter(hwComp.getKonto().getName());
			dto.setCostCenterId(hwComp.getKonto().getId());
			dto.setCostCenterManager(hwComp.getKonto().getCwidVerantw());
			dto.setPspElement(hwComp.getAmKommision());
		}
		dto.setRequester(hwComp.getRequester());
		dto.setOrganizationalunit(hwComp.getSubResponsible());
		dto.setOwner("OWNER");
		if (hwComp.getHardwareCategory1() != null) {
			dto.setSapAssetClass(hwComp.getHardwareCategory1().getHwKategory1());
			dto.setSapAssetClassId(hwComp.getHardwareCategory1().getId());
			dto.setUsefulEconomicLife(hwComp.getHardwareCategory1().getMonth());
		}
		dto.setAcquisitionValue(hwComp.getAcquitionValue());
//		dto.setBookValue();
//		dto.setDateOfBookValue();
		
		dto.setSerialNumber(hwComp.getSerialNumber());
		dto.setAssetChecked("ASSET CHECKED");
		dto.setAlias("ALIAS");
		dto.setOsName("OS Name");
		return dto;
	}

	@SuppressWarnings("unchecked")
	public static AssetManagementParameterOutput findAssetById(Long assetId) {
		AssetManagementParameterOutput out = new AssetManagementParameterOutput();
		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			Criteria criteria = session.createCriteria(HardwareComponent.class);
			criteria.add(Restrictions.eq("id", assetId));
			List<HardwareComponent> values = (List<HardwareComponent>) criteria.list();
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

	public static AssetManagementParameterOutput saveHardwareAsset(AssetViewDataDTO dto) {
		AssetManagementParameterOutput output = new AssetManagementParameterOutput();
//		HardwareComponent hardwareComponent=new HardwareComponent();
//		Session session = HibernateUtil.getSession();
//		Transaction tx = null;
//		tx = session.beginTransaction();
//		Partner partner = ManufacturerHbn.findById(dto.getId());
//		hardwareComponent.setHersteller(partner);
//		System.out.println("Manufacturer values "+dto.getId());
//	    
//		HardwareCategory2 hardwareCategory2 = SubCategoryHbn.findById(dto.getHardwareCategory2_id());
//		hardwareComponent.setHardwareCategory2(hardwareCategory2);
//		System.out.println("hardwareCategory2 values "+dto.getHardwareCategory2_id());
//		
//		HardwareCategory3 hardwareCategory3 = TypeHbn.findById(dto.getHardwareCategory3_id());
//		hardwareComponent.setHardwareCategory3(hardwareCategory3);
//		System.out.println("hardwareCategory3 values "+dto.getHardwareCategory3_id());
//		
//		HardwareCategory4 hardwareCategory4 = ModelHbn.findById(dto.getHardwareCategory4_id());
//		hardwareComponent.setHardwareCategory4(hardwareCategory4);
//		System.out.println("hardwareCategory4 values "+dto.getHardwareCategory4_id());
//		
//		hardwareComponent.setAmKommision(dto.getPspElement());
//		System.out.println("PSP values "+dto.getPspElement());
//		
//		Konto konto = CostcenterHbn.findById(dto.getKontoid());
//		hardwareComponent.setKonto(konto);
//		System.out.println("costcenter values "+dto.getKontoid());
//		
//
//		HardwareCategory1 hardwareCategory1 = SapAssetHbn.findById(dto.getHardwareCategory1_id());
//		hardwareComponent.setHardwareCategory1(hardwareCategory1);
//		System.out.println("hardwareCategory1 values "+dto.getHardwareCategory1_id());
//		
//		hardwareComponent.setRequester(dto.getRequester());
//		System.out.println("requester values "+dto.getRequester());
//		
//		hardwareComponent.setServiceNumber(dto.getMonth());
//		System.out.println("month values "+dto.getMonth());
		
		
//		tx.commit();
		return output;
	}

}
