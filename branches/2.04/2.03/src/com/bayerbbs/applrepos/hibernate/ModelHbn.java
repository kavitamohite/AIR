package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
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
	@SuppressWarnings("unchecked")
	public static HardwareCategory4 findModelIdByWhereName(String name)
    {
    	HardwareCategory4 returnHardwareCategory4 = null;
    	try {
    		Session session = HibernateUtil.getSessionFactory().openSession();
    		Criteria criteria = session.createCriteria(HardwareCategory4.class);
    		criteria.add(Restrictions.eq("hwKategory4", name));
			criteria.add(Restrictions.isNull("deleteTimestamp"));
			
			List<HardwareCategory4> values = criteria.list();
			
			if(values != null && !values.isEmpty()) {
				returnHardwareCategory4 = values.get(0);
			}
			
    	} catch(RuntimeException ex)
    	{
    		ex.printStackTrace();
    		throw ex;
    	}
    	return returnHardwareCategory4;
    }

}
