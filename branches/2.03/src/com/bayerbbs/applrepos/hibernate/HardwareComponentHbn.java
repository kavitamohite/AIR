package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.HardwareComponent;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.Konto;
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

			Criterion hwName = Restrictions.like("name",
					"%" + input.getQuery() + "%").ignoreCase();
			Criterion sapDescription = Restrictions.like("sapDescription",
					"%" + input.getQuery() + "%").ignoreCase();
			Criterion pspElement = Restrictions.like("amKommision",
					"%" + input.getQuery() + "%").ignoreCase();
			criteria.createAlias("konto", "konto", CriteriaSpecification.LEFT_JOIN);
			Criterion kontoName = Restrictions.and(Restrictions.isNotNull("konto"), Restrictions.like("konto.name", "%" + input.getQuery() + "%").ignoreCase());
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
					.add(hwName)
					.add(sapDescription)
					.add(pspElement)
					.add(kontoName)
					.add(serialNumber)
					.add(technicalMaster)
					.add(technicalNumber)
					.add(inventoryNumber)
					.add(orgUnit)
					;
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
			 dto.setSystemPlatformNameId(hwComp.getItSystem().getId());
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
		String tecError = validateHardwareComponent(hardwareComponent);
		
		if (error == null && tecError == null) {
			ItSystem itSystem = null;

			if (StringUtils.isNotNullOrEmpty(dto.getSystemPlatformName())) {
				itSystem = ItSystemHbn.findItSystemByName(dto.getSystemPlatformName());
				hardwareComponent.setItSystem(itSystem);
			}
		} else {
			
				dto.setError(error);
				dto.setError(tecError);
			
			return dto;
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
				String meassage1 = e.getCause().getMessage();
				if(meassage1.contains("Only SAP may")){
					dto.setError("You are not allowed to update inventory number starting with 1251 and SAP ");
				}else{
					dto.setError(e.getCause().getMessage());
				}
				
				return dto;
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
		HardwareComponent existingInHwComp = findByInventoryNumber(hardwareComponent.getInventoryP69());
		HardwareComponent existingInHwComp1 = findByTechnicalNumber(hardwareComponent.getTechnicalNumber());	
		String error = null;
		if(existingInHwComp != null && (hardwareComponent.getId() == null || existingInHwComp.getId().longValue() != hardwareComponent.getId().longValue())){
			error = "Asset with same Inventory number already exist.";
		}
		
		if(existingInHwComp1 != null && (hardwareComponent.getId() == null || existingInHwComp1.getId().longValue() != hardwareComponent.getId().longValue())){
			error = "Asset with same Technical number already exist.";
		}
	
		return error;
	}
	
	/*private static String validateTechnicalNumber(HardwareComponent hardwareComponent) {
		HardwareComponent existingTecHwComp = findByTechnicalNumber(hardwareComponent.getTechnicalNumber());
		
		String tecError = null;
		if(existingTecHwComp != null && (hardwareComponent.getId() == null || existingTecHwComp.getId().longValue() != hardwareComponent.getId().longValue())){
			tecError = "Asset with same Technicalnumber already exist.";
		}
		return tecError;
	}*/
	
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
	
	private static HardwareComponent findByTechnicalNumber(String technicalNumber) {
		List<HardwareComponent> values = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			Criteria criteria = session.createCriteria(HardwareComponent.class);
			criteria.add(Restrictions.eq("technicalNumber", technicalNumber));
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
	
	private static HardwareComponent findByIndenNumber(String indentNumber) {
		HardwareComponent value = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			Criteria criteria = session.createCriteria(HardwareComponent.class);
			criteria.add(Restrictions.eq("name", indentNumber));
			value = (HardwareComponent) criteria.uniqueResult();
			session.close();
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
		return value;
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
		if(dto.getInventoryNumber() != null && dto.getInventoryNumber().length() == 0){
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
		hardwareComponent.setSerialNumber(dto.getSerialNumber());
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
		if(hardwareComponent.getItset() == null){
			String strItSet = ApplReposHbn.getItSetFromCwid(dto.getRequesterId());
			itSet = new Long(AirKonstanten.IT_SET_DEFAULT);

			if (null != strItSet) {
				itSet = Long.parseLong(strItSet);
			}
			hardwareComponent.setItset(itSet);
		}

		return hardwareComponent;
		
	}

	private static String getIdentNumber() {
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		return df.format(new Date(System.currentTimeMillis()));
	}
	
	/**
	 * @author enqmu
	 * This method checks for Hardware component exists for an inventory number or not.
	 * @param inventoryP69
	 * @return boolean
	 */
	public static boolean isHardwareComponentByInventoryNumberExists(String inventoryP69) {
		
		Session session = HibernateUtil.getSessionFactory().openSession();
		boolean returnFlag = true;
		try {
			
			Criteria criteria = session.createCriteria(HardwareComponent.class);
			criteria.add(Restrictions.eq("inventoryP69", inventoryP69));
			List<HardwareComponent> values = (List<HardwareComponent>) criteria.list();
			if(values == null || values.isEmpty())
			{
				returnFlag = false;
			}
		} catch (Exception e) {
			System.out.println("Error ------> "+e.getMessage());
			e.printStackTrace();
			returnFlag = true;
		}finally{
			session.close();
		}
		return returnFlag;
	}
	
	@SuppressWarnings("unchecked")
	public static HardwareComponent findHardwareComponentById(Long assetId) {
		Transaction tx = null;
		List<HardwareComponent> values = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			Criteria criteria = session.createCriteria(HardwareComponent.class); 
			criteria.setFetchMode("hardwareCategory3", FetchMode.EAGER);
			criteria.setFetchMode("hardwareCategory4", FetchMode.EAGER); 
			criteria.setFetchMode("schrank", FetchMode.EAGER);
			criteria.setFetchMode("konto", FetchMode.EAGER);
			criteria.setFetchMode("konto", FetchMode.EAGER); 
			criteria.setFetchMode("itSystem", FetchMode.EAGER);
			criteria.setFetchMode("partner", FetchMode.EAGER);
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
	
	public static String saveHardwareAssets(List<AssetViewDataDTO> assests)
	{
		String message = "File uploaded successfully.";
		String indentNumber=null;
		String itSystemString=null;
		ItSystem itSystem=null;
		AssetViewDataDTO assetDto = null;
		List<String> indentNumbers= new ArrayList<String>();
		 try {
			Session session = HibernateUtil.getSession();
			Connection conn = session.connection();
			PreparedStatement pstmt = conn.prepareStatement("insert into HARDWAREKOMPONENTE (HW_NAME, ITSET, HERSTELLER_PARTNID, HW_KATEGORIE2_ID, HW_KATEGORIE3_ID, HW_KATEGORIE4_ID, INVENTAR_P69, SCHRANK_ID, sub_responsible, SERIEN_NR, TECHNISCHE_NR, AM_BESTELL_TEXT, AM_KOMMISSION, KONTO_ID, INSERT_USER, INSERT_QUELLE, UPDATE_TIMESTAMP, UPDATE_USER, UPDATE_QUELLE, ANFORDERER, CWID_VERANTW_BETR, OWNER_PARTNID) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			int batchSize = 20;
			int hwCount = 0;
			
			for (AssetViewDataDTO asset : assests) {
				++hwCount;
		    indentNumber = UUID.randomUUID().toString();
		    indentNumbers.add(indentNumber);
			pstmt.setString(1, indentNumber);
			Long itSet = null;
			if(asset.getCwid() != null) {
				itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
				String strItSet = ApplReposHbn.getItSetFromCwid(asset.getRequesterId());

				if (null != strItSet) {
					itSet = Long.parseLong(strItSet);
				}
			}
			else
			{
				itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
			}
			if(itSet == null)
			{
				pstmt.setNull(2, java.sql.Types.NULL);
			} else {
				pstmt.setLong(2, itSet);
			}
			if(asset.getManufacturerId() == null)
			{
				pstmt.setNull(3, java.sql.Types.NULL);
			} else {
				pstmt.setLong(3, asset.getManufacturerId());
			}
			if(asset.getSubcategoryId() == null)
			{
				pstmt.setNull(4, java.sql.Types.NULL);
			} else {
				pstmt.setLong(4, asset.getSubcategoryId());
			}
			if(asset.getTypeId() == null)
			{
				pstmt.setNull(5, java.sql.Types.NULL);
			} else {
				pstmt.setLong(5, asset.getTypeId());
			}
			if(asset.getModelId() == null)
			{
				pstmt.setNull(6, java.sql.Types.NULL);
			} else {
				pstmt.setLong(6, asset.getModelId());
			}
			if(asset.getInventoryNumber() == null)
			{
				pstmt.setNull(7, java.sql.Types.NULL);
			} else {
				pstmt.setString(7, asset.getInventoryNumber());
			}
			if(asset.getRackId() != null)
			{
				pstmt.setLong(8, asset.getRackId());
			}
			else
			{
				pstmt.setNull(8, java.sql.Types.NULL);
			}
			if(asset.getOrganizationalunit() != null)
			{
				pstmt.setString(9, asset.getOrganizationalunit());
			}
			else
			{
				pstmt.setNull(9, java.sql.Types.NULL);
			}
			if(asset.getSerialNumber() != null)
			{
				pstmt.setString(10, asset.getSerialNumber());
			}
			else
			{
				pstmt.setNull(10, java.sql.Types.NULL);
			}
			if(asset.getTechnicalNumber() != null)
			{
				pstmt.setString(11, asset.getTechnicalNumber());
			}
			else
			{
				pstmt.setNull(11, java.sql.Types.NULL);
			}
			if(asset.getOrderNumber() != null)
			{
				pstmt.setString(12, asset.getOrderNumber());
			}
			else
			{
				pstmt.setNull(12, java.sql.Types.NULL);
			}
			if(asset.getPspElement() != null)
			{
				pstmt.setString(13, asset.getPspElement());
			}
			else
			{
				pstmt.setNull(13, java.sql.Types.NULL);
			}
			if(asset.getCostCenterId() != null)
			{
				pstmt.setLong(14, asset.getCostCenterId());
			}
			else
			{
				pstmt.setNull(14, java.sql.Types.NULL);
			}
			if(asset.getCwid() != null)
			{
				pstmt.setString(15, asset.getCwid());
			}
			else
			{
				pstmt.setNull(15, java.sql.Types.NULL);
			}
			if(AirKonstanten.APPLICATION_GUI_NAME != null)
			{
				pstmt.setString(16, AirKonstanten.APPLICATION_GUI_NAME);
			}
			else
			{
				pstmt.setNull(16, java.sql.Types.NULL);
			}
			if(ApplReposTS.getCurrentTimestamp() != null)
			{
				pstmt.setTimestamp(17, ApplReposTS.getCurrentTimestamp());
			}
			else
			{
				pstmt.setNull(17, java.sql.Types.NULL);
			}
			if(asset.getCwid() != null)
			{
				pstmt.setString(18, asset.getCwid());
			}
			else
			{
				pstmt.setNull(18, java.sql.Types.NULL);
			}
			if(AirKonstanten.APPLICATION_GUI_NAME != null)
			{
				pstmt.setString(19, AirKonstanten.APPLICATION_GUI_NAME);
			}
			else
			{
				pstmt.setNull(19, java.sql.Types.NULL);
			}
			if(asset.getCwid() != null)
			{
				pstmt.setString(20, asset.getCwid());
			}
			else
			{
				pstmt.setNull(20, java.sql.Types.NULL);
			}
			if(asset.getCostCenterManagerId() != null)
			{
				pstmt.setString(21, asset.getCostCenterManagerId());
			}
			else
			{
				pstmt.setNull(21, java.sql.Types.NULL);
			}
			if(asset.getOwnerId() != null)
			{
				pstmt.setLong(22, asset.getOwnerId());
			}
			else
			{
				pstmt.setNull(22, java.sql.Types.NULL);
			}
			pstmt.addBatch();
			
			
			if(hwCount % batchSize == 0)
			{
				int[] resultCount = pstmt.executeBatch();
				System.out.println("Total records saved >>>>>>>> " + resultCount.length);
				pstmt.clearBatch();
			}   
			
		}
			
		if(hwCount % batchSize != 0) {
			int[] resultCount = pstmt.executeBatch();
			pstmt.clearBatch();
			System.out.println("Remaining HW records saved >>>>>>>> " + resultCount.length);
		}

		pstmt.close();
		conn.close();
		session.close();
		} catch(Exception ex)
		{
			System.out.println("Error ------> "+ex.getMessage());
			ex.printStackTrace();
			message = "File is not imported. Please contact ITILCenter Help Desk.";
		}
		
		HashMap<Long, Long> hwIDIndent = new HashMap<Long, Long>();

		try {
			
			HardwareComponent haComponent=null;
			
			for(int i=0; i < assests.size(); i++){
				indentNumber = indentNumbers.get(i);
				assetDto = assests.get(i);
				itSystemString = assetDto.getSystemPlatformName();

				if(itSystemString != null) {
					itSystem = ItSystemHbn.findItSystemByName(itSystemString);
					if(itSystem == null) {
						itSystem = new ItSystem();
					}
					itSystem.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					itSystem.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
					itSystem.setInsertUser(assetDto.getCwid());
					itSystem.setCiOwner(assetDto.getCwid());
					itSystem.setItSystemName(assetDto.getSystemPlatformName());
					itSystem.setCiSubTypeId(AirKonstanten.IT_SYSTEM_TYPE_HARDWARE_SYSTEM_IDENTIFIYING);
					itSystem.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					itSystem.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
					itSystem.setUpdateUser(assetDto.getCwid());
					itSystem.setDeleteUser(null);
					itSystem.setDeleteTimestamp(null);
					itSystem.setDeleteUser(null);
					itSystem.setDeleteQuelle(null);
					ItSystemHbn.saveItSystem(itSystem);
					
					haComponent = findByIndenNumber(indentNumber);
					hwIDIndent.put(haComponent.getId(), itSystem.getId());
					
				}
			}
			} catch (Exception ex) {
				System.out.println("Error ------> "+ex.getMessage());
				ex.printStackTrace();
			}
				Session session1 = HibernateUtil.getSession();
				Connection conn1 = session1.connection();
				try {
					PreparedStatement pstmtITSys = conn1.prepareStatement("insert into it_system_hw (IT_SYSTEM_ID, HW_ID, INSERT_USER, INSERT_QUELLE, UPDATE_TIMESTAMP, UPDATE_QUELLE, UPDATE_USER) values(?,?,?,?,?,?,?)");
					int batchSize = 20;
					int itSysCount = 0;
					
					for(Long key : hwIDIndent.keySet())
					{
						++itSysCount;
						pstmtITSys.setLong(1, hwIDIndent.get(key));
						pstmtITSys.setLong(2, key);
						if(assetDto.getCwid() != null)
						{
							pstmtITSys.setString(3, assetDto.getCwid());
							pstmtITSys.setString(7, assetDto.getCwid());
						}
						else
						{
							pstmtITSys.setNull(3, java.sql.Types.NULL);
							pstmtITSys.setNull(7, java.sql.Types.NULL);
						}
						if(AirKonstanten.APPLICATION_GUI_NAME != null)
						{
							pstmtITSys.setString(4, AirKonstanten.APPLICATION_GUI_NAME);
							pstmtITSys.setString(6, AirKonstanten.APPLICATION_GUI_NAME);
						}
						else
						{
							pstmtITSys.setNull(4, java.sql.Types.NULL);
							pstmtITSys.setNull(6, java.sql.Types.NULL);
						}
						if(ApplReposTS.getCurrentTimestamp() != null)
						{
							pstmtITSys.setTimestamp(5, ApplReposTS.getCurrentTimestamp());
						}
						else
						{
							pstmtITSys.setNull(5, java.sql.Types.NULL);
						}
						pstmtITSys.addBatch();
						if (itSysCount % batchSize == 0) {
							int[] countPstmtITSys = pstmtITSys.executeBatch();
							System.out
									.println("Total ITSysHwd records saved >>>>>>>> "
											+ countPstmtITSys.length);
							pstmtITSys.clearBatch();
						}
		
					}
					if(itSysCount % batchSize != 0){
						int[] resultCount = pstmtITSys.executeBatch();
						pstmtITSys.clearBatch();
						System.out.println("Remaining IT System Hardware records saved >>>>>>>> " + resultCount.length);
					}
					pstmtITSys.close();
					conn1.close();
					session1.close();
				}
				catch(Exception ex){
					System.out.println("Error ------> "+ex.getMessage());
					ex.printStackTrace();
					message = "Errors occured during saving DC Names. Please contact ITILCenter Help Desk.";
				}
		return message;
	}
	

	
	private static long getMaximumHardwareId()
	{
		long hwId = -1l;
		try {
			String sql = "select max(HW_ID) from HARDWAREKOMPONENTE order by HW_ID desc";
			Session session = HibernateUtil.getSessionFactory().openSession();
			Connection conn = session.connection();
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			
			while (rs.next()) {
				hwId = rs.getLong(1);
				break;
			}
			rs.close();
			stmt.close();
			conn.close();
			session.close();
			System.out.println("hwId >>>>>>>>>>>>> "+hwId);
		} catch(Exception ex)
		{
			System.out.println("Error ------> "+ex.getMessage());
			ex.printStackTrace();
		}
		return hwId;
	}
	
	private static long getMaximumItSysHwId()
	{
		long itSysHwId = -1l;
		try {
			String sql = "select max(IT_SYSTEM_HW_ID) from it_system_hw order by IT_SYSTEM_HW_ID desc";
			Session session = HibernateUtil.getSessionFactory().openSession();
			Connection conn = session.connection();
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			
			while (rs.next()) {
				itSysHwId = rs.getLong(1);
				break;
			}
			rs.close();
			stmt.close();
			conn.close();
			session.close();
			System.out.println("ItSysHwId >>>>>>>>>>>>> "+itSysHwId);
		} catch(Exception ex)
		{
			System.out.println("Error ------> "+ex.getMessage());
			ex.printStackTrace();
		}
		return itSysHwId;
	}
	
	public static boolean isPSPElementExists(String pspElement)
	{
		boolean returnFlag = false;
		try {
			Session session = HibernateUtil.getSessionFactory().openSession();
			Connection conn = session.connection();
			PreparedStatement pstmt = conn.prepareStatement("select * from Konto k where k.KONTO_ART='PSP' and  k.KONTO_NAME = ?");
			pstmt.setString(1, pspElement);
			ResultSet rs = pstmt.executeQuery();
			
			while (rs.next()) {
				returnFlag = true;
				break;
			}
			rs.close();
			pstmt.close();
			conn.close();
			session.close();
			System.out.println("returnFlag >>>>>>>>>>>>> "+returnFlag);
		} catch(Exception ex)
		{
			System.out.println("Error ------> "+ex.getMessage());
			ex.printStackTrace();
			returnFlag = false;
		}
		return returnFlag;
	}
	
}
