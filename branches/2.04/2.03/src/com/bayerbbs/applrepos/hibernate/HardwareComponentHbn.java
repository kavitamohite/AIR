package com.bayerbbs.applrepos.hibernate;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.HardwareComponent;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.Konto;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.service.AssetManagementParameterInput;
import com.bayerbbs.applrepos.service.AssetManagementParameterOutput;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;

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
		if (hwComp.getInventoryP69() == null) {
			dto.setIsHardwareWithoutInventory(true);
		} else {
			dto.setIsHardwareWithInventory(true);
		}
		dto.setSerialNumber(hwComp.getSerialNumber());
		
		// Asset Information
		dto.setIdentNumber(hwComp.getName());
		dto.setInventoryNumber(hwComp.getInventoryP69());

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
		dto.setSapDescription(hwComp.getSapDescription());

		// Technics
		dto.setTechnicalNumber(hwComp.getTechnicalNumber());
		dto.setTechnicalMaster(hwComp.getTechnicalMaster());
		if(hwComp.getItSystem()!= null){
			 dto.setSystemPlatformName(hwComp.getItSystem().getName());
			 dto.setOsNameId(hwComp.getItSystem().getOsNameId());
		}
		dto.setHardwareTransientSystem(hwComp.getAssetId());

		if (hwComp.getLifecycleSubStat() != null) {
			dto.setWorkflowStatusId(hwComp.getLifecycleSubStat().getId());
			dto.setWorkflowStatus(hwComp.getLifecycleSubStat().getStatus());
		}
		if (hwComp.getOperationalStatus() != null) {
			dto.setGeneralUsageId(hwComp.getOperationalStatus().getId());
		}
		dto.setItSecurityRelevance(hwComp.getRelevantItsec());
		dto.setComment(hwComp.getNote1());

		Schrank rack = hwComp.getSchrank();

		if(rack != null){
			//Location
			
			Room room = rack.getRoom();
			Building building = room.getBuildingArea().getBuilding();
			Standort site = building.getTerrain().getStandort();
			
			Long countryId = site.getLandId();
			
			dto.setCountryId(countryId);

			dto.setSiteId(site.getId());
			dto.setSite(site.getName());

			dto.setBuildingId(building.getId());
			dto.setBuilding(building.getName());

			dto.setRoomId(room.getId());
			dto.setRoom(room.getName());

			dto.setRackId(rack.getId());
			dto.setRack(rack.getName());

		}

		// Business Administration
		dto.setOrderNumber(hwComp.getBestSellText());
		dto.setPspElement(hwComp.getAmKommision());
		Konto pspelement = PspElementHbn.getPspElementByName(hwComp
				.getAmKommision());
		if (pspelement != null) {
			dto.setPspElementId(pspelement.getId());
			dto.setPspText(pspelement.getBeschreibung());
		}
		if (hwComp.getKonto() != null) {
			dto.setCostCenter(hwComp.getKonto().getName());
			dto.setCostCenterId(hwComp.getKonto().getId());
			if (hwComp.getCwidVerantw() != null) {
				dto.setCostCenterManagerId(hwComp.getCwidVerantw());
				List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(hwComp
						.getCwidVerantw());
				if(persons.size() > 0){
					dto.setCostCenterManager(persons.get(0).getDisplayNameFull());
					dto.setOrganizationalunit(persons.get(0).getOrgUnit());
				}
			}

		}
		if(hwComp.getSubResponsible() != null && hwComp.getSubResponsible().length() > 0){
			dto.setOrganizationalunit(hwComp.getSubResponsible());
		}
		if(hwComp.getRequester() != null){
			dto.setRequesterId(hwComp.getRequester());
			List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(hwComp
					.getRequester());
			if(persons.size() > 0){
				dto.setRequester(persons.get(0).getDisplayNameFull());
			}
		}
		if(hwComp.getPartner() != null){
			dto.setOwnerId(hwComp.getPartnerId());
			dto.setOwner(hwComp.getPartner().getOwner());
		}
		if (hwComp.getHardwareCategory1() != null) {
			dto.setSapAssetClass(hwComp.getHardwareCategory1().getHwKategory1());
			dto.setSapAssetClassId(hwComp.getHardwareCategory1().getId());
		}
		
		//Contacts
		dto.setEditorsGroup(hwComp.getSubResponsible());
		
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
	
	@SuppressWarnings("unchecked")
	public static HardwareComponent findById(Long assetId) {
		Transaction tx = null;
		List<HardwareComponent> values = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			Criteria criteria = session.createCriteria(HardwareComponent.class);
			criteria.add(Restrictions.eq("id", assetId));
			values = (List<HardwareComponent>) criteria.list();
			tx.commit();
			session.close();
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
		if(values != null && values.size() > 0){
			return values.get(0);
		}
		return null;
	}
	
	public static AssetViewDataDTO saveHardwareAsset(
			AssetViewDataDTO dto) {

		HardwareComponent hardwareComponent = getHardwareComponent(dto);
		
		String error = validateHardwareComponent(hardwareComponent);
		
		if(error == null){
			ItSystem itSystem = hardwareComponent.getItSystem();
			ItSystemDTO itDTO = new ItSystemDTO();
			CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
			
			if(dto.getSystemPlatformName().length() != 0 && dto.getOsNameId() != 0){
				if(itSystem != null){
					ItSystemHbn.getItSystem(itDTO, itSystem);
					itDTO.setId(itSystem.getId());
					itDTO.setAlias(dto.getSystemPlatformName());
					itDTO.setName(dto.getSystemPlatformName());
					itDTO.setOsNameId(dto.getOsNameId());
					output = ItSystemHbn.saveItSystem(dto.getCwid(), itDTO);
				} else {
					itDTO.setAlias(dto.getSystemPlatformName());
					itDTO.setName(dto.getSystemPlatformName());
					itDTO.setOsNameId(dto.getOsNameId());
					itDTO.setCiSubTypeId(1);
					itDTO.setId(0l);
					output = ItSystemHbn.createItSystem(dto.getCwid(), itDTO, true);
				}
			} else {
				if(itSystem != null ){
					String[] err = {"System platform name is missing." };
					output.setMessages(err);
				} else if(dto.getSystemPlatformName().length() != 0 || dto.getOsNameId() != 0) {
					String[] err = {"System platform name or Os name is missing." };
					output.setMessages(err);					
				}
			}
			if(output.getMessages() != null && output.getMessages()[0].length() > 0){
				dto.setError(output.getMessages()[0]);
				hardwareComponent = null;
			} else {
				if(itDTO.getId() != null){
					itSystem = ItSystemHbn.findItSystemById(itDTO.getId());
					hardwareComponent.setItSystem(itSystem);
				}
			}
		} else {
			dto.setError(error);
			hardwareComponent = null;
		}
		
		if(hardwareComponent != null){
			
			Session session = HibernateUtil.getSession();
			Transaction tx = null;
			tx = session.beginTransaction();

			try {
				session.saveOrUpdate(hardwareComponent);
				session.flush();
			} catch (Exception e) {
				System.out.println("error---" + e.getMessage());
				if (tx.isActive()) {
					tx.rollback();
				}
				return null;
			} finally {
				if (tx.isActive()) {
					tx.commit();
				}
				session.close();
			}
			dto.setId(hardwareComponent.getId());
			dto.setIdentNumber(hardwareComponent.getName());
		}
		
		return dto;
	}

	private static String validateHardwareComponent(HardwareComponent hardwareComponent) {
		HardwareComponent existingHwComp = findByInventoryNumber(hardwareComponent.getInventoryP69());
		String error = null;
		if(existingHwComp != null && existingHwComp.getId().longValue() != hardwareComponent.getId().longValue()){
			error = "Asset with same inventory number already exist.";
		}
		return error;
	}

	private static HardwareComponent findByInventoryNumber(String inventoryP69) {
		List<HardwareComponent> values = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			Criteria criteria = session.createCriteria(HardwareComponent.class);
			criteria.add(Restrictions.eq("inventoryP69", inventoryP69));
			values = (List<HardwareComponent>) criteria.list();
			session.close();
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
		if(values != null && values.size() > 0){
			return values.get(0);
		}
		return null;
	}

	private static HardwareComponent getHardwareComponent(AssetViewDataDTO dto) {
		HardwareComponent hardwareComponent = new HardwareComponent();

		if (dto.getId() == null) {
			hardwareComponent
					.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			hardwareComponent.setInsertTimestamp(ApplReposTS
					.getCurrentTimestamp());
			hardwareComponent.setInsertUser(dto.getCwid());
		} else {
			hardwareComponent = findById(dto.getId());
		}
		
		hardwareComponent.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
		hardwareComponent.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
		hardwareComponent.setUpdateUser(dto.getCwid());

		if (dto.getIdentNumber() != null && dto.getIdentNumber().length() > 0) {
			hardwareComponent.setName(dto.getIdentNumber());
		} else {
			hardwareComponent.setName(getIdentNumber());
		}
		if(dto.getInventoryNumber().length() == 0){
			if(hardwareComponent.getInventoryStockNumber() == null){
				hardwareComponent.setInventoryStockNumber("ExtInventory");
				hardwareComponent.setInventoryP69(null);
			}
		} else {
			hardwareComponent.setInventoryP69(dto.getInventoryNumber());
			hardwareComponent.setInventoryStockNumber(null);
		}

		//Product
		hardwareComponent.setHerstellerId(dto.getManufacturerId());
		hardwareComponent.setHardwareCategory2Id(dto.getSubcategoryId());
		hardwareComponent.setHardwareCategory3Id(dto.getTypeId());
		hardwareComponent.setHardwareCategory4Id(dto.getModelId());
		hardwareComponent.setSapDescription(dto.getSapDescription());

		//Location
		hardwareComponent.setSchrankId(dto.getRackId());
		
		//Technics
		hardwareComponent.setTechnicalMaster(dto.getTechnicalMaster());
		hardwareComponent.setTechnicalNumber(dto.getTechnicalNumber());
		hardwareComponent.setLifecycleSubStatId(dto.getWorkflowStatusId());
		hardwareComponent.setOperationalStatusId(dto.getGeneralUsageId());
		hardwareComponent.setRelevantItsec(dto.getItSecurityRelevance());
		hardwareComponent.setNote1(dto.getComment());

		//Contacts
		hardwareComponent.setSubResponsible(dto.getEditorsGroup());

		//Business
		hardwareComponent.setBestSellText(dto.getOrderNumber());
		hardwareComponent.setAmKommision(dto.getPspElement());
		hardwareComponent.setKontoId(dto.getCostCenterId());
		hardwareComponent.setAssetId(dto.getHardwareTransientSystem());
		hardwareComponent.setCwidVerantw(dto.getCostCenterManagerId());
		hardwareComponent.setRequester(dto.getRequesterId());
		hardwareComponent.setHardwareCategory1Id(dto.getSapAssetClassId());
		hardwareComponent.setSubResponsible(dto.getOrganizationalunit());
		hardwareComponent.setPartnerId(dto.getOwnerId());
		
		Long itSet = null;
		String strItSet = ApplReposHbn.getItSetFromCwid(dto.getRequesterId());
		if (null != strItSet) {
			itSet = Long.parseLong(strItSet);
		}
		if (null == itSet) {
			itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
		}
		hardwareComponent.setItset(itSet);

		return hardwareComponent;
		
	}

	private static String getIdentNumber() {
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		return df.format(new Date(System.currentTimeMillis()));
	}

}
