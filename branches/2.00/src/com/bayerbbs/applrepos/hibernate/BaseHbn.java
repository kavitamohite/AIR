package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.CiBaseDTO;

public class BaseHbn {
	protected static final String NOT_EQUAL = "<>";
	protected static final String EQUAL = "=";
	protected static final String EMPTY = "";
	protected static final String KOMMA = ",";
	
	protected static final String NOT_LIKE = "not like";
	protected static final String LIKE = "like";
	
	protected static final String Y = "Y";
	protected static final String N = "N";
	
	
	public static <T> T findById(Class<T> ci, Long id) {
		Session session = HibernateUtil.getSession();

		T t = (T)session.get(ci, id);

		return t;
	}
	
	protected static List<String> validateCi(CiBaseDTO dto) {
		List<String> messages = new ArrayList<String>();
		
		ErrorCodeManager errorCodeManager = new ErrorCodeManager();

		if (StringUtils.isNullOrEmpty(dto.getName())) {
			messages.add("room name is empty");
		}
		else {
			List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_ROOM, false);
			if (!listCi.isEmpty()) {
				// check if the name is unique
				if (dto.getId().longValue() != listCi.get(0).getId().longValue()) {
					messages.add(errorCodeManager.getErrorMessage("1100", dto.getName()));
				}
			}
		}

		//evtl. berücksichtigen, dass nicht alle CI-Typen einen alias haben. Z.B wenn CI-Typ ohne Alias "-1" zurückgibt
		//nicht den Namen für den Alias setzen.
		if (StringUtils.isNullOrEmpty(dto.getAlias())) {
			// messages.add("application alias is empty");
			dto.setAlias(dto.getName());
		}
		else {
			List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_ROOM, false);
			if (!listCi.isEmpty()) {
				// check if the alias is unique
				if (dto.getId().longValue() != listCi.get(0).getId().longValue()) {
					messages.add(errorCodeManager.getErrorMessage("1101", dto.getAlias()));
				}
			}
		}

		return messages;
	}
	
	
	
	protected static boolean isNot(String options) {
		if(options == null)
			return false;
		
		boolean isNot = options.indexOf(',') > 0 ? options.split(KOMMA)[0].equals(Y) : options.equals(Y);//options != null && 
		
		return isNot;
	}
	
	protected static String getLikeNotLikeOperator(boolean isNot) {
		return isNot ? NOT_LIKE : LIKE;
	}
	
	protected static String getEqualNotEqualOperator(boolean isNot) {
		return isNot ? NOT_EQUAL : EQUAL;
	}
}
