package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.bayerbbs.applrepos.domain.HardwareCategory4;
import com.bayerbbs.applrepos.dto.ProductDTO;

public class ModelHbn extends BaseHbn {

	public static HardwareCategory4 findById(Long id) {
		return findById(HardwareCategory4.class, id);
	}

	private static List<ProductDTO> getDTOModelList(List<HardwareCategory4> input) {
		List<ProductDTO> listDTO = new ArrayList<ProductDTO>();

		for (HardwareCategory4 data : input) {
			if(data.getHwCategory3().getPartner() != null){
				ProductDTO productDTO = new ProductDTO();
				productDTO.setSubcategory(data.getHwCategory3().getHwCategory2().getHwKategory2());
				productDTO.setSubcategoryId(data.getHwCategory3().getHwCategory2().getId());
				productDTO.setManufacturer(data.getHwCategory3().getPartner().getName());
				productDTO.setManufacturerId(data.getHwCategory3().getPartnerId());
				productDTO.setType(data.getHwCategory3().getHwKategory3());
				productDTO.setTypeId(data.getHwCategory3().getId());
				productDTO.setModel(data.getHwKategory4());
				productDTO.setModelId(data.getId());
				listDTO.add(productDTO);
			}
		}
		return listDTO;
	}

	@SuppressWarnings("unchecked")
	public static ProductDTO[] findModelList(Long kategory3Id) {
		List<ProductDTO> data = new ArrayList<ProductDTO>();
		List<HardwareCategory4> values = new ArrayList<HardwareCategory4>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {

			if (kategory3Id != null) {
				Query query = session.getNamedQuery("findCategory4byKategory3Id");
				query.setParameter("kategory3Id", kategory3Id);
				values = query.list();
			} else {
				Criteria criteria = session.createCriteria(HardwareCategory4.class);
				criteria.add(Restrictions.isNull("deleteTimestamp"));
				criteria.addOrder(Order.asc("hwKategory4").ignoreCase());
				values = criteria.list();
			}

			data = getDTOModelList(values);
		} catch (RuntimeException e) {
			e.printStackTrace();
			throw e;
		}
		return data.toArray(new ProductDTO[data.size()]);
	}
	/**
	 * This method provides the typeId for a Type name
	 * @author enqmu
	 * 
	 */
	public static HardwareCategory4 findModelIdByWhereName(String name)
    {
    	HardwareCategory4 returnHardwareCategory4 = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
    	try {
    		Criteria criteria = session.createCriteria(HardwareCategory4.class);
    		criteria.setFetchMode("hwCategory3", FetchMode.EAGER);
    		criteria.add(Restrictions.eq("hwKategory4", name));
			criteria.add(Restrictions.isNull("deleteTimestamp"));
			returnHardwareCategory4 = (HardwareCategory4) criteria.uniqueResult();
			
    	} catch(RuntimeException ex)
    	{
    		ex.printStackTrace();
    		throw ex;
    	}finally{
    		session.close();
    	}
    	return returnHardwareCategory4;
    }
	

}
