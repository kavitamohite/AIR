package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.OperationalStatusDTO;
import com.bayerbbs.applrepos.hibernate.OperationalStatusHbn;

public class OperationalStatusWS {

	public OperationalStatusDTO[] getOperationalStatusList() {
		return OperationalStatusHbn.getArrayFromList(OperationalStatusHbn.listOperationalStatusHbn());
	}
}
