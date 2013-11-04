package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.ServiceContract;
import com.bayerbbs.applrepos.dto.ServiceContractDTO;

public class ServiceContractHbn {

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static ServiceContractDTO[] getArrayFromList(
			List<ServiceContractDTO> input) {
		ServiceContractDTO output[] = new ServiceContractDTO[input.size()];
		int i = 0;
		for (final ServiceContractDTO data : input) {
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
	private static List<ServiceContractDTO> getDTOList(
			List<ServiceContract> input) {
		ArrayList<ServiceContractDTO> listDTO = new ArrayList<ServiceContractDTO>();

		for (Iterator<ServiceContract> iter = input.iterator(); iter.hasNext();) {
			ServiceContract data = (ServiceContract) iter.next();
			ServiceContractDTO dto = new ServiceContractDTO();

			dto.setServiceContractId(data.getServiceContractId());
			dto.setServiceContractName(data.getServiceContract());
			
			listDTO.add(dto);
		}
		return listDTO;
	}
	
	@SuppressWarnings("unchecked")
	public static List<ServiceContractDTO> listServiceContract() {

		List<ServiceContractDTO> listResult = new ArrayList<ServiceContractDTO>();
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<ServiceContract> values = session.createQuery(
						"select h from ServiceContract as h where h.deleteTimestamp is null order by h.serviceContract").list();
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}

	@SuppressWarnings("unchecked")
	public static List<ServiceContractDTO> findServiceContractsBySlaId(Long slaId) {

		List<ServiceContractDTO> listResult = new ArrayList<ServiceContractDTO>();
		
		StringBuffer sb = new StringBuffer();
		sb.append("select h.* from Service_Contract h");
		sb.append(" join Sla_Service_Contract slaservice on h.service_Contract_Id = slaservice.service_Contract_Id");
		sb.append(" where h.del_Timestamp is null");
		sb.append(" and slaservice.del_Timestamp is null");
		sb.append(" and slaservice.sla_Id =").append(slaId);
		sb.append(" order by h.service_Contract");
		
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				//List<ServiceContract> values = 
					SQLQuery query = session.createSQLQuery(
						(sb.toString()));
					query.addEntity(ServiceContract.class);
					
					List<ServiceContract> values = query.list();
				
				listResult = getDTOList(values);
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}

		return listResult;
	}

}
