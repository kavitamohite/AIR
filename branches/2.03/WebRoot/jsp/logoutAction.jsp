<%@page import="com.bayerbbs.applrepos.service.LDAPAuthWS"%>
<%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterInput"%>
<%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterOutput"%>
<%@ page language="java" import="java.util.*, org.hibernate.cfg.*, java.net.InetAddress, com.bayerbbs.applrepos.constants.AirKonstanten" pageEncoding="ISO-8859-1" %>
<% 
String cwid = request.getParameter("cwid");
String token = request.getParameter("token");

LDAPAuthWS ldapAuthWS = new LDAPAuthWS();

ldapAuthWS.logout(cwid, token);
InetAddress iAddress;
String hostName = "";
String redirect = "";
try {
	iAddress = InetAddress.getLocalHost();
	hostName = iAddress.getHostName();
} catch (Exception ex) {
	System.out.println(ex.getMessage());
} 
if (hostName.equals(AirKonstanten.SERVERNAME_PROD)) {
	redirect = "/AIR";
} else {
	if(hostName.equals(AirKonstanten.SERVERNAME_BMS_PROD))
		redirect = "/AIR_P_MS";
	else{
		if(hostName.equals(AirKonstanten.SERVERNAME_BMS_QA)){
			redirect = "/AIR_Q_MS";
		}else
			redirect = "/AIR";

	}				    		
}

response.sendRedirect(redirect);//htdocs/index.html authenticate.html
%>