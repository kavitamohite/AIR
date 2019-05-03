package com.bayerbbs.applrepos.hibernate;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.domain.Interfaces;
import com.bayerbbs.applrepos.dto.InterfacesDTO;

public class InterfacesHbn {

	public static InterfacesDTO findInterfacesByInterfaceToken(
			String interfaceToken) {

		InterfacesDTO result = new InterfacesDTO();

		if (StringUtils.isNotNullOrEmpty(interfaceToken)) {

			Transaction tx = null;
			Session session = HibernateUtil.getSession();
			try {
				tx = session.beginTransaction();
				List<Interfaces> values = session.createQuery(
						"select h from Interfaces as h where h.interfaceToken = '"
								+ interfaceToken + "'").list();

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

}
