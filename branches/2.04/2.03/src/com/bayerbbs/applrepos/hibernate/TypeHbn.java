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

import com.bayerbbs.applrepos.domain.HardwareCategory3;
import com.bayerbbs.applrepos.dto.ProductDTO;
import com.bayerbbs.applrepos.dto.TypeDTO;

public class TypeHbn  extends BaseHbn{
	

	public static HardwareCategory3 findById(Long id) {
		return findById(HardwareCategory3.class, id);
	}
	
	private static List<ProductDTO> getDTOTypeList(List<HardwareCategory3> input) {
		List<ProductDTO> listDTO = new ArrayList<ProductDTO>();

		for (HardwareCategory3 data : input) {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setSubcategory(data.getHwCategory2().getHwKategory2());
			productDTO.setSubcategoryId(data.getHwCategory2().getId());
			productDTO.setManufacturer(data.getPartner().getName());
			productDTO.setManufacturerId(data.getPartnerId());
			productDTO.setType(data.getHwKategory3());
			productDTO.setTypeId(data.getId());
			listDTO.add(productDTO);
		}
		return listDTO;
	}

	@SuppressWarnings("unchecked")
	public static ProductDTO[] findTypeList(TypeDTO type) {
		List<ProductDTO> data = new ArrayList<ProductDTO>();
		List<HardwareCategory3> values = new ArrayList<HardwareCategory3>();
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {

			if(type.getPartnerId() != null && type.getKategory2Id() != null){
				Query query = session.getNamedQuery("findCategorybyPartnerIdandkategoryId");
				query.setParameter("partnerId", type.getPartnerId());
				query.setParameter("kategory2Id", type.getKategory2Id());
				values = query.list();
			} else {
				Criteria criteria = session.createCriteria(HardwareCategory3.class);
				criteria.add(Restrictions.isNotNull("partnerId"));
				criteria.add(Restrictions.isNull("deleteTimestamp"));
				values = criteria.list();
			}
			data = getDTOTypeList(values);

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
	public static Long findTypeIdByWhereName(Long partnerId, Long kategory2Id, String name)
    {
    	Long typeId = null;
    	TypeDTO type = new TypeDTO();
    	type.setPartnerId(partnerId);
    	type.setKategory2Id(kategory2Id);
//    	String query = "select * from HW_KATEGORIE3 where HW_KATEGORIE3 = ?";
    	try {
//    		Session session = HibernateUtil.getSessionFactory().openSession();
    		/*ProductDTO[] productDTOArr = findTypeList(type);
    		
    		for(ProductDTO productDTO: productDTOArr)
    		{
    			if(productDTO != null && productDTO.getManufacturerId() != null && productDTO.getManufacturerId().equals(partnerId) && productDTO.getSubcategoryId() != null && productDTO.getSubcategoryId().equals(kategory2Id) && productDTO.getType().equalsIgnoreCase(name))
    			{
    				typeId = productDTO.getTypeId();
    			}
    		}*/
    		
    		Session session = HibernateUtil.getSessionFactory().openSession();
    		Criteria criteria = session.createCriteria(HardwareCategory3.class);
			criteria.add(Restrictions.eq("partnerId", partnerId));
			criteria.add(Restrictions.eq("kategory2Id", kategory2Id));
			criteria.add(Restrictions.eq("hwKategory3", name)); 
			criteria.add(Restrictions.isNull("deleteTimestamp"));
			
			List<HardwareCategory3> values = criteria.list();
			
			if(values != null && !values.isEmpty())
			{
				for(HardwareCategory3 objHardwareCategory3 : values)
				{
					if(objHardwareCategory3 != null && objHardwareCategory3.getId() != null)
					{
						typeId = objHardwareCategory3.getId();
						break;
					}
				}
			}
    		/*Connection conn = session.connection();
			PreparedStatement stmt = conn.prepareStatement(query);
			stmt.setString(1, name);
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				typeId = rs.getLong(1);
				break;
			}
			rs.close();
			stmt.close();*/
    	} catch(Exception ex)
    	{
    		ex.printStackTrace();
    	}
    	return typeId;
    }
	
}
