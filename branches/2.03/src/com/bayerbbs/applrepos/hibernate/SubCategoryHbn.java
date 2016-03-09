package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import com.bayerbbs.applrepos.domain.HardwareCategory2;
import com.bayerbbs.applrepos.dto.ProductDTO;


public class SubCategoryHbn extends BaseHbn {
	
	public static HardwareCategory2 findById(Long id) {
		return findById(HardwareCategory2.class, id);
	}
	
	private static List<ProductDTO> getDTOSubCategoryList(List<HardwareCategory2> input) {
		List<ProductDTO> listDTO = new ArrayList<ProductDTO>();

		for (HardwareCategory2 data : input) {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setSubcategory(data.getHwKategory2());
			productDTO.setSubcategoryId(data.getId());
			listDTO.add(productDTO);
		}
		return listDTO;
	}
	
	
	public static ProductDTO[] findSubCategoryList() {

		List<ProductDTO> data = new ArrayList<ProductDTO>();

		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<HardwareCategory2> values = session
					.createQuery("from HardwareCategory2 ORDER BY NLSSORT(hwKategory2, 'NLS_SORT=GENERIC_M')")
					.list();
			
			data = getDTOSubCategoryList(values);
			
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
		return data.toArray(new ProductDTO[data.size()]);
	}
	
}
