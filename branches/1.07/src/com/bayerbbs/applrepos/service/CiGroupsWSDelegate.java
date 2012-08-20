	package com.bayerbbs.applrepos.service;

	import com.bayerbbs.applrepos.dto.CiGroupsDTO;
	import com.bayerbbs.applrepos.hibernate.CiGroupsHbn;

@javax.jws.WebService(
targetNamespace = 
	"http://service.applrepos.bayerbbs.com/"
,
serviceName = 
	"CiGroupsWSService"
, 
portName =
	"CiGroupsWSPort"
)



public class CiGroupsWSDelegate {

	com.bayerbbs.applrepos.service.CiGroupsWS ciGroupsWS = new com.bayerbbs.applrepos.service.CiGroupsWS();

			public CiGroupsDTO[] getGroupsList(Long ciId, Long groupTypeId)  {		
			return ciGroupsWS.getGroupsList(ciId,groupTypeId);
		}
	
}