package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.CategoryBusiness;
import com.bayerbbs.applrepos.dto.CategoryBusinessDTO;

public class CategoryBusinessHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static CategoryBusinessDTO[] getArrayFromList(
			List<CategoryBusinessDTO> input) {
		CategoryBusinessDTO output[] = new CategoryBusinessDTO[input.size()];
		int i = 0;
		for (final CategoryBusinessDTO data : input) {
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
	private static List<CategoryBusinessDTO> getDTOList(
			List<CategoryBusiness> input) {
		ArrayList<CategoryBusinessDTO> listDTO = new ArrayList<CategoryBusinessDTO>();

		for (Iterator<CategoryBusiness> iter = input.iterator(); iter.hasNext();) {
			CategoryBusiness data = (CategoryBusiness) iter.next();
			CategoryBusinessDTO dto = new CategoryBusinessDTO();

			dto.setCategoryBusinessId(data.getCategoryBusinessId());
			dto.setCategoryBusinessName(data.getCategoryBusinessName());
			
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	@SuppressWarnings("unchecked")
	public static List<CategoryBusinessDTO> listCategoryBusiness() {

		List<CategoryBusinessDTO> listResult = new ArrayList<CategoryBusinessDTO>();
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<CategoryBusiness> values = session.createQuery(
						"select h from CategoryBusiness as h where h.deleteTimestamp is null order by h.categoryBusinessName").list();
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}
	
}
