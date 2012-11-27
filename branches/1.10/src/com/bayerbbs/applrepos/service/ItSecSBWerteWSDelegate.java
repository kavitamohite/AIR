	package com.bayerbbs.applrepos.service;

	import com.bayerbbs.applrepos.dto.ItSecSBWerteDTO;

@javax.jws.WebService(
targetNamespace = 
	"http://service.applrepos.bayerbbs.com/"
,
serviceName = 
	"ItSecSBWerteWSService"
, 
portName =
	"ItSecSBWerteWSPort"
)



public class ItSecSBWerteWSDelegate {

	com.bayerbbs.applrepos.service.ItSecSBWerteWS itSecSBWerteWS = new com.bayerbbs.applrepos.service.ItSecSBWerteWS();

			public ItSecSBWerteDTO[] getItSecSBWerteList()  {		
			return itSecSBWerteWS.getItSecSBWerteList();
		}
	
}