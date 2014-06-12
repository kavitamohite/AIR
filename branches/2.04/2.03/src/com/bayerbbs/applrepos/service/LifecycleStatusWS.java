package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;
import com.bayerbbs.applrepos.hibernate.LifecycleStatusHbn;

public class LifecycleStatusWS {

	public LifecycleStatusDTO[] getLifecycleStatusList() {
		return LifecycleStatusHbn.getArrayFromList(LifecycleStatusHbn.listLifecycleStatusHbn());
	}
	
}
