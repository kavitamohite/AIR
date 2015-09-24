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
import com.bayerbbs.applrepos.domain.HardwareComponent;
import com.bayerbbs.applrepos.domain.Konto;
import com.bayerbbs.applrepos.domain.SoftwareComponent;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.service.AssetManagementParameterInput;
import com.bayerbbs.applrepos.service.AssetManagementParameterOutput;

public class SoftwareComponentHbn {

	@SuppressWarnings("unchecked")
	public static AssetManagementParameterOutput searchAsset(
			AssetManagementParameterInput input) {
		AssetManagementParameterOutput out = new AssetManagementParameterOutput();

		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {

			tx = session.beginTransaction();

			Criteria criteria = session.createCriteria(SoftwareComponent.class);

			Criterion sapDescription = Restrictions.like("prouctDescription",
					"%" + input.getQuery() + "%").ignoreCase();
			Criterion pspElement = Restrictions.like("innenauftrag",
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
			Criterion inventoryNumber = Restrictions.like("inventoryNumber",
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
			List<SoftwareComponent> values = (List<SoftwareComponent>) criteria
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
				criteria.addOrder(Order.desc("prouctDescription"));
			} else {
				criteria.addOrder(Order.asc("prouctDescription"));
			}
		} else if (sort.equals("pspElement")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("innenauftrag"));
			} else {
				criteria.addOrder(Order.asc("innenauftrag"));
			}
		} else if (sort.equals("costCenter")) {
			criteria.createAlias("konto", "konto");
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("konto.name"));
			} else {
				criteria.addOrder(Order.asc("konto.name"));
			}
		} else if (sort.equals("serialNumber")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("serialNumber"));
			} else {
				criteria.addOrder(Order.asc("serialNumber"));
			}
		} else if (sort.equals("inventoryNumber")) {
			if ("DESC".equalsIgnoreCase(desc)) {
				criteria.addOrder(Order.desc("inventoryNumber"));
			} else {
				criteria.addOrder(Order.asc("inventoryNumber"));
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
			List<SoftwareComponent> values) {

		List<AssetViewDataDTO> list = new ArrayList<AssetViewDataDTO>();
		for (SoftwareComponent hwComp : values) {
			AssetViewDataDTO dto = getDTO(hwComp);
			dto.setIsSoftwareComponent(true);
			list.add(dto);
		}
		return list;
	}

	private static AssetViewDataDTO getDTO(SoftwareComponent swComp) {

		AssetViewDataDTO dto = new AssetViewDataDTO();

		dto.setId(swComp.getId());

		// Asset Information
		dto.setIdentNumber(swComp.getName());
		dto.setInventoryNumber(swComp.getInventoryNumber());
		dto.setSapDescription(swComp.getProuctDescription());

		// Product
		if (swComp.getHersteller() != null) {
			dto.setManufacturer(swComp.getHersteller().getName());
			dto.setManufacturerId(swComp.getHersteller().getId());
		}
		if (swComp.getSoftwareCategory2() != null) {
			dto.setSubCategory(swComp.getSoftwareCategory2().getHwKategory2());
			dto.setSubcategoryId(swComp.getSoftwareCategory2().getId());
		}
		// Product Name remaining

		// Business Administration
		dto.setOrderNumber(swComp.getBestellNumber());
		Konto pspelement = PspElementHbn.getPspElementByName(swComp
				.getInnenauftrag());
		dto.setPspElement(swComp.getInnenauftrag());
		if (pspelement != null) {
			dto.setPspElementId(pspelement.getId());
			dto.setPspText(pspelement.getBeschreibung());
		}
		if (swComp.getKonto() != null) {
			dto.setCostCenter(swComp.getKonto().getName());
			dto.setCostCenterId(swComp.getKonto().getId());
			dto.setCostCenterManagerId(swComp.getKonto().getCwidVerantw());
			if (swComp.getKonto().getCwidVerantw() != null) {
				List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(swComp
						.getKonto().getCwidVerantw());
				if(persons.size() > 0){
					dto.setCostCenterManager(persons.get(0).getDisplayNameFull());
					dto.setOrganizationalunit(persons.get(0).getOrgUnit());
				}
				
			}
		}
		
		if(swComp.getSubResponsible() != null && swComp.getSubResponsible().length() > 0){
			dto.setOrganizationalunit(swComp.getSubResponsible());
		}
		dto.setRequesterId(swComp.getRequester());
		dto.setOrganizationalunit(swComp.getSubResponsible());
		if(swComp.getRequester() != null){
			List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(swComp
					.getRequester());
			if(persons.size() > 0){
				dto.setRequester(persons.get(0).getDisplayNameFull());
			} else {
				dto.setRequester(swComp.getRequester());
			}
		}
		if(swComp.getPartner() != null){
			dto.setOwnerId(swComp.getPartnerId());
			dto.setOwner(swComp.getPartner().getOwner());
		}
		if (swComp.getSoftwareCategory1() != null) {
			dto.setSapAssetClass(swComp.getSoftwareCategory1().getSwKategory1());
			dto.setSapAssetClassId(swComp.getSoftwareCategory1().getId());
		}

		dto.setSerialNumber(swComp.getSerialNumber());
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
			Criteria criteria = session.createCriteria(SoftwareComponent.class);
			criteria.add(Restrictions.eq("id", assetId));
			List<SoftwareComponent> values = (List<SoftwareComponent>) criteria
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

	public static AssetViewDataDTO saveSoftwareAsset(
			AssetViewDataDTO dto) {
		Session session = HibernateUtil.getSession();
		Transaction tx = null;
		tx = session.beginTransaction();

		SoftwareComponent softwareComponent = getSoftwareComponent(dto);
		try {
			session.saveOrUpdate(softwareComponent);
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
		dto.setId(softwareComponent.getId());
		dto.setIdentNumber(softwareComponent.getName());
		return dto;
	}

	private static SoftwareComponent getSoftwareComponent(AssetViewDataDTO dto) {
		SoftwareComponent softwareComponent = new SoftwareComponent();

		if (dto.getId() == null) {
			softwareComponent
					.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			softwareComponent.setInsertTimestamp(ApplReposTS
					.getCurrentTimestamp());
			softwareComponent.setInsertUser(dto.getCwid());
		} else {
			softwareComponent = findById(dto.getId());
		}
		softwareComponent.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
		softwareComponent.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
		softwareComponent.setUpdateUser(dto.getCwid());

		if (dto.getIdentNumber() != null && dto.getIdentNumber().length() > 0) {
			softwareComponent.setName(dto.getIdentNumber());
		} else {
			softwareComponent.setName(getIdentNumber());
		}

		softwareComponent.setInventoryNumber(dto.getInventoryNumber());
		softwareComponent.setSerialNumber(dto.getSerialNumber());

		softwareComponent.setSoftwareCategory1Id(dto.getSapAssetClassId());
		softwareComponent.setSoftwareCategory2Id(dto.getSubcategoryId());
		softwareComponent.setHerstellerId(dto.getManufacturerId());

		softwareComponent.setKontoId(dto.getCostCenterId());
		softwareComponent.setBestellNumber(dto.getOrderNumber());
		softwareComponent.setInnenauftrag(dto.getPspElement());
		softwareComponent.setInventoryNumber(dto.getInventoryNumber());
		softwareComponent.setSubResponsible(dto.getOrganizationalunit());
		softwareComponent.setPartnerId(dto.getOwnerId());

		softwareComponent.setRequester(dto.getRequesterId());
		softwareComponent.setProuctDescription(dto.getSapDescription());
		softwareComponent.setResponsible(dto.getCostCenterManagerId());

		Long itSet = null;
		String strItSet = ApplReposHbn.getItSetFromCwid(dto.getRequesterId());
		if (null != strItSet) {
			itSet = Long.parseLong(strItSet);
		}
		if (null == itSet) {
			itSet = new Long(AirKonstanten.IT_SET_DEFAULT);
		}
		softwareComponent.setItset(itSet);

		return softwareComponent;
	}

	@SuppressWarnings("unchecked")
	public static SoftwareComponent findById(Long assetId) {
		Transaction tx = null;
		List<SoftwareComponent> values = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			Criteria criteria = session.createCriteria(SoftwareComponent.class);
			criteria.add(Restrictions.eq("id", assetId));
			values = (List<SoftwareComponent>) criteria.list();
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
	
	private static String getIdentNumber() {

		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		return df.format(new Date(System.currentTimeMillis()));
	}

}
