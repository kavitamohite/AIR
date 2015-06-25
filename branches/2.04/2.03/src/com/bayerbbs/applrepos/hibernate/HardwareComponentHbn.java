package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.HardwareCategory1;
import com.bayerbbs.applrepos.domain.HardwareCategory2;
import com.bayerbbs.applrepos.domain.HardwareCategory3;
import com.bayerbbs.applrepos.domain.HardwareCategory4;
import com.bayerbbs.applrepos.domain.HardwareComponent;
import com.bayerbbs.applrepos.domain.Konto;
import com.bayerbbs.applrepos.domain.OperationalStatus;
import com.bayerbbs.applrepos.domain.Partner;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.service.AssetManagementParameterInput;
import com.bayerbbs.applrepos.service.AssetManagementParameterOutput;

public class HardwareComponentHbn {

	@SuppressWarnings("unchecked")
	public static AssetManagementParameterOutput searchAsset(
			AssetManagementParameterInput input) {
		AssetManagementParameterOutput out = new AssetManagementParameterOutput();

		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();

			Criteria criteria = session.createCriteria(HardwareComponent.class);

			Criterion sapDescription = Restrictions.like("sapDescription",
					"%" + input.getQuery() + "%").ignoreCase();
			Criterion pspElement = Restrictions.like("amKommision",
					"%" + input.getQuery() + "%").ignoreCase();
			criteria.createAlias("konto", "konto");
			Criterion kontoName = Restrictions.like("konto.name",
					"%" + input.getQuery() + "%").ignoreCase();
			Criterion serialNumber = Restrictions.like("serialNumber",
					"%" + input.getQuery() + "%").ignoreCase();
			Criterion technicalMaster = Restrictions.like("technicalMaster",
					"%" + input.getQuery() + "%").ignoreCase();
			Criterion technicalNumber = Restrictions.like("technicalNumber",
					"%" + input.getQuery() + "%").ignoreCase();
			Criterion inventoryNumber = Restrictions.like("inventoryP69",
					"%" + input.getQuery() + "%").ignoreCase();

			Criterion orgUnit = Restrictions.like("subResponsible",
					"%" + input.getQuery() + "%").ignoreCase();

			Criterion completeCondition = Restrictions.disjunction()
					.add(sapDescription).add(pspElement).add(kontoName)
					.add(serialNumber).add(technicalMaster)
					.add(technicalNumber).add(inventoryNumber).add(orgUnit);
			criteria.add(completeCondition);

			if (input.getSort() != null) {
				addSortingCriteria(criteria, input.getSort(), input.getDir());
			}
			
			criteria.setFirstResult(input.getStart());
			criteria.setMaxResults(input.getLimit());
			List<HardwareComponent> values = (List<HardwareComponent>) criteria
					.list();

			criteria.setFirstResult(0);
			Integer total = (Integer) criteria.setProjection(
					Projections.rowCount()).uniqueResult();
			out.setCountResultSet(total.longValue());
			list = getDTOList(values);
			out.setAssetViewDataDTO(list.toArray(new AssetViewDataDTO[list
					.size()]));
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

	private static void addSortingCriteria(Criteria criteria, String sort,
			String desc) {

		if (sort.equals("sapDescription")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("sapDescription"));
			} else {
				criteria.addOrder(Order.asc("sapDescription"));
			}
		} else if (sort.equals("pspElement")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("amKommision"));
			} else {
				criteria.addOrder(Order.asc("amKommision"));
			}
		} else if (sort.equals("costCenter")) {
			criteria.createAlias("konto", "konto");
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("konto.name"));
			} else {
				criteria.addOrder(Order.asc("konto.name"));
			}
		} else if (sort.equals("site")) {
		} else if (sort.equals("serialNumber")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("serialNumber"));
			} else {
				criteria.addOrder(Order.asc("serialNumber"));
			}
		} else if (sort.equals("technicalMaster")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("technicalMaster"));
			} else {
				criteria.addOrder(Order.asc("technicalMaster"));
			}
		} else if (sort.equals("technicalNumber")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("technicalNumber"));
			} else {
				criteria.addOrder(Order.asc("technicalNumber"));
			}
		} else if (sort.equals("inventoryNumber")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("inventoryP69"));
			} else {
				criteria.addOrder(Order.asc("inventoryP69"));
			}
		} else if (sort.equals("organizationalunit")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("subResponsible"));
			} else {
				criteria.addOrder(Order.asc("subResponsible"));
			}
		}
	}

	private static List<AssetViewDataDTO> getDTOList(
			List<HardwareComponent> values) {

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

		// Asset Information
		dto.setIdentNumber(hwComp.getName());
		dto.setInventoryNumber(hwComp.getInventoryP69());
		dto.setSapDescription(hwComp.getSapDescription());

		if (hwComp.getInventoryP69() == null) {
			dto.setIsHardwareWithoutInventory(true);
		} else {
			dto.setIsHardwareWithInventory(true);
		}
		// Product
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

		// Technics
		dto.setTechnicalNumber(hwComp.getTechnicalNumber());
		dto.setTechnicalMaster(hwComp.getTechnicalMaster());
//		dto.setSystemPlatformName("SYSTEM PLATOFORM");
//		dto.setHardwareSystem("HARDWARE SYSTEM");
//		dto.setHardwareTransientSystem("TRANSIENT SYSTEM");
		if (hwComp.getLifecycleSubStat() != null) {
			dto.setWorkflowStatusId(hwComp.getLifecycleSubStat().getId());
			dto.setWorkflowStatus(hwComp.getLifecycleSubStat().getStatus());
		}
		if (hwComp.getOperationalStatus() != null) {
			dto.setGeneralUsageId(hwComp.getOperationalStatus().getId());
		}
		dto.setItSecurityRelevance(hwComp.getRelevantItsec());

		Long countryId = hwComp.getSchrank().getRoom().getBuildingArea()
				.getBuilding().getTerrain().getStandort().getLandId();
		Standort site = hwComp.getSchrank().getRoom().getBuildingArea()
				.getBuilding().getTerrain().getStandort();
		Building building = hwComp.getSchrank().getRoom().getBuildingArea()
				.getBuilding();
		Room room = hwComp.getSchrank().getRoom();
		Schrank rack = hwComp.getSchrank();
		// Location
		dto.setCountryId(countryId);
		
		dto.setSiteId(site.getId());
		dto.setSite(site.getName());
		
		dto.setBuildingId(building.getId());
		dto.setBuilding(building.getName());
		
		dto.setRoomId(room.getId());
		dto.setRoom(room.getName());
		
		dto.setRackId(rack.getId());
		dto.setRack(rack.getName());
		// Business Administration
		dto.setOrderNumber(hwComp.getBestSellText());
		if (hwComp.getKonto() != null) {
			dto.setCostCenter(hwComp.getKonto().getName());
			dto.setCostCenterId(hwComp.getKonto().getId());
			if (hwComp.getKonto().getCwidVerantw() != null) {
				List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(hwComp
						.getKonto().getCwidVerantw());
				dto.setCostCenterManager(persons.get(0).getDisplayNameFull());
			}
			dto.setPspElement(hwComp.getAmKommision());
			Konto pspelement = PspElementHbn.getPspElementByName(hwComp.getAmKommision());
			if(pspelement != null){
				dto.setPspElementId(pspelement.getId());
				dto.setPspText(pspelement.getBeschreibung());
			}
		}
		dto.setRequester(hwComp.getRequester());
		dto.setOrganizationalunit(hwComp.getSubResponsible());
//		dto.setOwner("OWNER");
		if (hwComp.getHardwareCategory1() != null) {
			dto.setSapAssetClass(hwComp.getHardwareCategory1().getHwKategory1());
			dto.setSapAssetClassId(hwComp.getHardwareCategory1().getId());
			dto.setUsefulEconomicLife(hwComp.getHardwareCategory1().getMonth());
		}
		dto.setAcquisitionValue(hwComp.getAcquitionValue());
		// dto.setBookValue();
		// dto.setDateOfBookValue();

		dto.setSerialNumber(hwComp.getSerialNumber());
		dto.setDepreciationStartDate(hwComp.getStartDate());
		dto.setRetirementDate(hwComp.getEndDate());
//		dto.setAssetChecked("ASSET CHECKED");
//		dto.setAlias("ALIAS");
//		dto.setOsName("OS Name");
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
			List<HardwareComponent> values = (List<HardwareComponent>) criteria
					.list();
			list = getDTOList(values);
			out.setAssetViewDataDTO(list.toArray(new AssetViewDataDTO[list
					.size()]));
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

	public static AssetManagementParameterOutput saveHardwareAsset(
			AssetViewDataDTO dto) {

		AssetManagementParameterOutput output = new AssetManagementParameterOutput();
		HardwareComponent hardwareComponent = new HardwareComponent();
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		hardwareComponent.setId(dto.getId());

		hardwareComponent.setName("test");

		Partner partner = ManufacturerHbn.findById(dto.getManufacturerId());
		hardwareComponent.setHersteller(partner);
		System.out.println("Manufacturer values " + dto.getManufacturerId());

		HardwareCategory2 hardwareCategory2 = SubCategoryHbn.findById(dto
				.getSubcategoryId());

		hardwareComponent.setHardwareCategory2(hardwareCategory2);
		System.out
				.println("hardwareCategory2 values " + dto.getSubcategoryId());

		HardwareCategory3 hardwareCategory3 = TypeHbn.findById(dto.getTypeId());

		hardwareComponent.setHardwareCategory3(hardwareCategory3);
		System.out.println("hardwareCategory3 values " + dto.getTypeId());

		HardwareCategory4 hardwareCategory4 = ModelHbn.findById(dto
				.getModelId());

		hardwareComponent.setHardwareCategory4(hardwareCategory4);
		System.out.println("hardwareCategory4 values " + dto.getModelId());

		hardwareComponent.setAmKommision(dto.getPspElement());
		System.out.println("PSP values " + dto.getPspElement());

		Konto konto = CostcenterHbn.findById(dto.getKontoId());
		hardwareComponent.setKonto(konto);
		System.out.println("costcenter values " + dto.getKontoId());

		HardwareCategory1 hardwareCategory1 = SapAssetHbn.findById(dto
				.getSapAssetClassId());
		hardwareComponent.setHardwareCategory1(hardwareCategory1);
		System.out.println("hardwareCategory1 values "
				+ dto.getSapAssetClassId());

		hardwareComponent.setRequester(dto.getRequester());
		System.out.println("requester values " + dto.getRequester());

		hardwareComponent.setServiceNumber(dto.getUsefulEconomicLife());
		System.out.println("month values " + dto.getUsefulEconomicLife());

		OperationalStatus operationalStatus = OperationalStatusHbn.findById(dto
				.getGeneralUsageId());
		hardwareComponent.setOperationalStatus(operationalStatus);
		System.out.println("operationalStatus values "
				+ dto.getGeneralUsageId());

		hardwareComponent.setRelevantItsec(dto.getItSecurityRelevance());
		System.out.println("ItSecurityRelevanc values "
				+ dto.getItSecurityRelevance());

		// other fields
		hardwareComponent.setBestSellText(null);
		hardwareComponent.setInventoryNumber(null);
		hardwareComponent.setItset(10002L);
		hardwareComponent.setBusinessEssential(null);
		hardwareComponent.setRelevantItsec((long) 0);

		try {
			session.save(hardwareComponent);
			session.flush();
		} catch (Exception e) {
			System.out.println("error---" + e.getMessage());
		}
		tx.commit();

		return output;
	}

}
