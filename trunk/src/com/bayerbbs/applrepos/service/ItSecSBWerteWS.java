package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ItSecSBWerteDTO;
import com.bayerbbs.applrepos.hibernate.ItSecSBWerteHbn;

public class ItSecSBWerteWS {

	public ItSecSBWerteDTO[] getItSecSBWerteList() {
		return ItSecSBWerteHbn.getArrayFromList(ItSecSBWerteHbn.getListItSecSBWerte());
	}

}
