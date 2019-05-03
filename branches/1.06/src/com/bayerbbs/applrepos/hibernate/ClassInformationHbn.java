package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.ClassData;
import com.bayerbbs.applrepos.domain.ClassInformation;
import com.bayerbbs.applrepos.dto.ClassDataDTO;
import com.bayerbbs.applrepos.dto.ClassInformationDTO;

public class ClassInformationHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static ClassInformationDTO[] getArrayFromList(
			List<ClassInformationDTO> input) {
		ClassInformationDTO output[] = new ClassInformationDTO[input.size()];
		int i = 0;
		for (final ClassInformationDTO data : input) {
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
	private static List<ClassInformationDTO> getDTOList(
			List<ClassInformation> input) {
		ArrayList<ClassInformationDTO> listDTO = new ArrayList<ClassInformationDTO>();

		for (Iterator<ClassInformation> iter = input.iterator(); iter.hasNext();) {
			ClassInformation data = (ClassInformation) iter.next();
			ClassInformationDTO dto = new ClassInformationDTO();

			dto.setClassInformationId(data.getClassInformationId());
			dto.setClassInformationName(data.getClassInformationName());
			dto.setClassProtectionName(data.getClassProtectionName());
			
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	@SuppressWarnings("unchecked")
	public static List<ClassInformationDTO> listClassInformation() {

		List<ClassInformationDTO> listResult = new ArrayList<ClassInformationDTO>();
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<ClassInformation> values = session.createQuery(
						"select h from ClassInformation as h where h.deleteTimestamp is null order by h.classInformationName").list();
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}

}
