package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.GroupType;
import com.bayerbbs.applrepos.dto.GroupTypesDTO;

public class GroupTypesHbn {

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<GroupTypesDTO> getDTOList(List<GroupType> input) {
		ArrayList<GroupTypesDTO> listDTO = new ArrayList<GroupTypesDTO>();

		for (Iterator<GroupType> iter = input.iterator(); iter.hasNext();) {
			GroupType data = (GroupType) iter.next();
			GroupTypesDTO dto = new GroupTypesDTO();

			dto.setGroupTypeId(data.getGroupTypeId());
			dto.setGroupTypeName(data.getGroupTypeName());
			
			dto.setMinContacts(data.getMinContacts());
			dto.setMaxContacts(data.getMaxContacts());
			dto.setVisibleApplication(data.getVisibleApplication());
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
	public static GroupTypesDTO[] getArrayFromList(List<GroupTypesDTO> input) {
		GroupTypesDTO output[] = new GroupTypesDTO[input.size()];
		int i = 0;
		for (final GroupTypesDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	public static List<GroupTypesDTO> listGroupTypesHbn() {

		List<GroupTypesDTO> listResult = new ArrayList<GroupTypesDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<GroupType> values = session.createQuery(
					"select h from GroupType as h where h.delTimestamp is null order by h.groupTypeName")
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
