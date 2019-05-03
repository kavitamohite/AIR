package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.ClassData;
import com.bayerbbs.applrepos.dto.ClassDataDTO;

public class ClassDataHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static ClassDataDTO[] getArrayFromList(
			List<ClassDataDTO> input) {
		ClassDataDTO output[] = new ClassDataDTO[input.size()];
		int i = 0;
		for (final ClassDataDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	
	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<ClassDataDTO> getDTOList(
			List<ClassData> input) {
		ArrayList<ClassDataDTO> listDTO = new ArrayList<ClassDataDTO>();

		for (Iterator<ClassData> iter = input.iterator(); iter.hasNext();) {
			ClassData data = (ClassData) iter.next();
			ClassDataDTO dto = new ClassDataDTO();

			dto.setClassDataId(data.getClassDataId());
			dto.setClassDataName(data.getClassDataName());
			
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	@SuppressWarnings("unchecked")
	public static List<ClassDataDTO> listClassData() {

		List<ClassDataDTO> listResult = new ArrayList<ClassDataDTO>();
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<ClassData> values = session.createQuery(
						"select h from ClassData as h where h.deleteTimestamp is null order by h.classDataName").list();
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}
	
	@SuppressWarnings("unchecked")
	public static List<ClassDataDTO> findClassDataByCategoryBusiness(Long categoryBusinessId) {

		List<ClassDataDTO> listResult = new ArrayList<ClassDataDTO>();
		
		if (null != categoryBusinessId) {
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<ClassData> values = session.createQuery(
						"select h from ClassData as h where h.deleteTimestamp is null and h.categoryBusinessId = " + categoryBusinessId + " order by h.classDataName").list();
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}
		}
			
		return listResult;
	}
		
	
	
}
