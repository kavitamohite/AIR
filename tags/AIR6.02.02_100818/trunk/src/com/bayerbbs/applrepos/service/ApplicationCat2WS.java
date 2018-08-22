package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ApplicationCat2DTO;
import com.bayerbbs.applrepos.hibernate.ApplicationCat2Hbn;

public class ApplicationCat2WS {

	public ApplicationCat2DTO[] getApplicationCat2List() {
		return ApplicationCat2Hbn.getArrayFromList(ApplicationCat2Hbn.listApplicationCat2Hbn());
	}
	
	public ApplicationCat2DTO[] findApplicationCat2ByApplicationKat1Id(ApplicationCat2ParameterInput input) {
		return ApplicationCat2Hbn.getArrayFromList(ApplicationCat2Hbn.findApplicationCat2ByCat1Hbn(input.getAnwendungKat1Id()));
	}


}
