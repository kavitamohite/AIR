package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.LicenseType;
import com.bayerbbs.applrepos.dto.LicenseTypeDTO;

public class LicenseTypeHbn {

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<LicenseTypeDTO> getDTOList(
			List<LicenseType> input) {
		ArrayList<LicenseTypeDTO> listDTO = new ArrayList<LicenseTypeDTO>();

		for (Iterator<LicenseType> iter = input.iterator(); iter.hasNext();) {
			LicenseType data = iter.next();
			LicenseTypeDTO dto = new LicenseTypeDTO();

			dto.setLicenseTypeId(data.getLicenseTypeId());
			dto.setLicenseTypeName(data.getLicenseTypeName());
			
			listDTO.add(dto);
		}
		return listDTO;
	}

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static LicenseTypeDTO[] getArrayFromList(
			List<LicenseTypeDTO> input) {
		LicenseTypeDTO output[] = new LicenseTypeDTO[input.size()];
		int i = 0;
		for (final LicenseTypeDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	public static List<LicenseTypeDTO> listLicenseTypeHbn() {

		List<LicenseTypeDTO> listResult = new ArrayList<LicenseTypeDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<LicenseType> values = session
					.createQuery(
							"select h from LicenseType as h order by h.licenseTypeName")
					.list();

			listResult = getDTOList(values);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					System.out.println("Error rolling back transaction");
				}
				// throw again the first exception
				throw e;
			}

		}

		return listResult;
	}

}
