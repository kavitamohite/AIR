package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.domain.Interfaces;
import com.bayerbbs.applrepos.domain.ItSecGroup;
import com.bayerbbs.applrepos.dto.InterfacesDTO;
import com.bayerbbs.applrepos.dto.ItSecGroupDTO;

public class InterfacesHbn {

	
	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static InterfacesDTO[] getArrayFromList(
			List<InterfacesDTO> input) {
		InterfacesDTO output[] = new InterfacesDTO[input.size()];
		int i = 0;
		for (final InterfacesDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}
	
	public static InterfacesDTO findInterfacesByInterfaceToken(String interfaceToken) {
		InterfacesDTO result = new InterfacesDTO();

		if (StringUtils.isNotNullOrEmpty(interfaceToken)) {
			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			
			try {
				tx = session.beginTransaction();
				@SuppressWarnings("unchecked")
				List<Interfaces> values = session.createQuery("select h from Interfaces as h where h.interfaceToken = '" + interfaceToken + "'").list();

				if (null != values && 1 == values.size()) {
					Interfaces myValue = values.get(0);
					result.setInterfacesId(myValue.getInterfacesId());
					result.setInterfaceToken(myValue.getInterfaceToken());
					result.setInterfaceName(myValue.getInterfaceName());
					result.setSisecEditable(myValue.getSisecEditable());
					// TODO Token zerlegen?
				}
				
				HibernateUtil.close(tx, session, true);
			} catch (RuntimeException e) {
				HibernateUtil.close(tx, session, false);
			}
		}

		return result;
	}
	
	public static List<InterfacesDTO> findAllImportInterfaces() {
		ArrayList<InterfacesDTO> listDTO = new ArrayList<InterfacesDTO>();

		
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		
		try {
			tx = session.beginTransaction();
			@SuppressWarnings("unchecked")
			List<Interfaces> values = session.createQuery("select h from Interfaces as h where importYN='Y' order by UPPER(h.interfaceToken)").list();

			for (Iterator<Interfaces> iter = values.iterator(); iter.hasNext();) {
				Interfaces data = iter.next();
				InterfacesDTO dto = new InterfacesDTO();

				dto.setInterfacesId(data.getId());
				dto.setInterfaceName(data.getInterfaceName());
				dto.setInterfaceToken(data.getInterfaceToken());
				
				listDTO.add(dto);
			}
			
			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			HibernateUtil.close(tx, session, false);
		}
		

		return listDTO;
	}
}