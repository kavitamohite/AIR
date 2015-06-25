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
			BigDecimal total = (BigDecimal) session.createSQLQuery(
					"select count(*) from SOFTWAREKOMPONENTE where lower(PRODUKTBEZ) like '%"
							+ input.getQuery().toLowerCase() + "%'")
					.uniqueResult();
			out.setCountResultSet(total.longValue());

			Criteria criteria = session.createCriteria(SoftwareComponent.class);
			criteria.add(Restrictions.like("prouctDescription",
					"%" + input.getQuery() + "%").ignoreCase());

			if (input.getSort() != null) {
				addSortingCriteria(criteria, input.getSort(), input.getDir());
			}
			criteria.setFirstResult(input.getStart());
			criteria.setMaxResults(input.getLimit());
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

	private static AssetViewDataDTO getDTO(SoftwareComponent hwComp) {

		AssetViewDataDTO dto = new AssetViewDataDTO();

		dto.setId(hwComp.getId());

		// Asset Information
		dto.setIdentNumber(hwComp.getName());
		dto.setInventoryNumber(hwComp.getInventoryNumber());
		dto.setSapDescription(hwComp.getProuctDescription());

		// Product
		if (hwComp.getHersteller() != null) {
			dto.setManufacturer(hwComp.getHersteller().getName());
			dto.setManufacturerId(hwComp.getHersteller().getId());
		}
		//Product Name remaining


		// Business Administration
		dto.setOrderNumber(hwComp.getBestellNumber());
		if (hwComp.getKonto() != null) {
			dto.setCostCenter(hwComp.getKonto().getName());
			dto.setCostCenterId(hwComp.getKonto().getId());
			if (hwComp.getKonto().getCwidVerantw() != null) {
				List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(hwComp
						.getKonto().getCwidVerantw());
				dto.setCostCenterManager(persons.get(0).getDisplayNameFull());
			}
			dto.setPspElement(hwComp.getInnenauftrag());
		}
		dto.setRequester(hwComp.getRequester());
		dto.setOrganizationalunit(hwComp.getSubResponsible());
		dto.setOwner("OWNER");
		if (hwComp.getSoftwareCategory1() != null) {
			dto.setSapAssetClass(hwComp.getSoftwareCategory1().getSwKategory1());
			dto.setSapAssetClassId(hwComp.getSoftwareCategory1().getId());
//			dto.setUsefulEconomicLife(hwComp.getSoftwareCategory1().get);
		}
//		dto.setAcquisitionValue(hwComp.);
		// dto.setBookValue();
		// dto.setDateOfBookValue();

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

}
