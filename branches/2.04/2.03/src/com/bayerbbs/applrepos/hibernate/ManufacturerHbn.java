package com.bayerbbs.applrepos.hibernate;

import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Partner;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
public class ManufacturerHbn  extends BaseHbn{
	
	private static final String SQL_Hardware_Product = "select * from partner where partner_id in (select partner_id from hw_kategorie3)";
	private static final String SQL_Software_Product ="select * from partner where partner_id in (select hersteller_partnid from SW_KATEGORIE2)";
	
	public static Partner findById(Long id) {
		return findById(Partner.class, id);
	}
	
	private static List<KeyValueDTO> getDTOManufacturerList(List<Partner> input) {
		List<KeyValueDTO> listDTO = new ArrayList<KeyValueDTO>();

		for (Partner partner : input) {
			listDTO.add(new KeyValueDTO(partner.getId(), partner.getName()));
		}
		return listDTO;
	}


	public static KeyValueDTO[] getManufacturerById(Long partnerId) {

		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		
			try {
				Connection conn = session.connection();
				Statement stmt =conn.createStatement();
				ResultSet rs = stmt.executeQuery(SQL_Hardware_Product);
				while (rs.next()) {
					KeyValueDTO keyValueDTO = new KeyValueDTO();
					keyValueDTO.setId(rs.getLong(1));
					keyValueDTO.setName(rs.getString(2));
					data.add(keyValueDTO);
				}
				rs.close();
				stmt.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Collections.sort(data);
		return data.toArray(new KeyValueDTO[0]);
	}
	
	
	public static KeyValueDTO[] getSoftwareManufacturerById(Long partnerId) {

		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		
			try {
				Connection conn = session.connection();
				Statement stmt =conn.createStatement();
				ResultSet rs = stmt.executeQuery(SQL_Software_Product);
				while (rs.next()) {
					KeyValueDTO keyValueDTO = new KeyValueDTO();
					keyValueDTO.setId(rs.getLong(1));
					keyValueDTO.setName(rs.getString(2));
					data.add(keyValueDTO);
				}
				rs.close();
				stmt.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Collections.sort(data);
		return data.toArray(new KeyValueDTO[0]);
	}
	public static KeyValueDTO[] getLegalEntity(Long partnerId) {
		List<KeyValueDTO> data = new ArrayList<KeyValueDTO>();
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Partner> values = session.createQuery("from Partner p where p.number is null and p.deleteTimestamp is null").list();

			data = getDTOManufacturerList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {

					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				// throw again the first exception
				throw e;
			}
		}
		Collections.sort(data);
		return data.toArray(new KeyValueDTO[0]);

	}

}
