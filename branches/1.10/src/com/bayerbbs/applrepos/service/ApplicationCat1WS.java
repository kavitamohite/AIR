package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.dto.ApplicationCat1DTO;
import com.bayerbbs.applrepos.hibernate.ApplicationCat1Hbn;

public class ApplicationCat1WS {

	public ApplicationCat1DTO[] getApplicationCat1List() {
		// ApplicationCat1DAO anwDao = new ApplicationCat1DAO();
		
		// List<ApplicationCat1DTO> listAnwendungen = anwDao.getApplicationsCat1List();
		List<ApplicationCat1DTO> listAnwendungen = ApplicationCat1Hbn.listApplicationCat1Hbn();
		
		ApplicationCat1DTO anwendungen[] = new ApplicationCat1DTO[listAnwendungen.size()]; 
		  
		  int i=0;
		  for (final ApplicationCat1DTO anw : listAnwendungen) {
			  anwendungen[i] = anw;
			  i++;
		  }
		  
		  return anwendungen;
	}
	
}
