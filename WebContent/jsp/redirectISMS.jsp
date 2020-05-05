<%@page import="com.bayerbbs.applrepos.service.LDAPAuthWS"%>
<%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterInput"%>
<%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterOutput"%>
<%@ page language="java" import="java.util.*, org.hibernate.cfg.*, java.net.InetAddress, com.bayerbbs.applrepos.constants.AirKonstanten" pageEncoding="ISO-8859-1" %>
<% 
String cwid = request.getParameter("cwid");
String token = request.getParameter("token");

//LDAPAuthWS ldapAuthWS = new LDAPAuthWS();

//ldapAuthWS.logout(cwid, token);
InetAddress iAddress=null;
String hostName = "";
String redirect = "";
try {
	iAddress = InetAddress.getLocalHost();
	hostName = iAddress.getHostName();
} catch (Exception ex) {
	System.out.println(ex.getMessage());
} 

System.out.println("iAddress  "+iAddress);
System.out.println("hostName  "+hostName);
/* if (hostName.equals(AirKonstanten.SERVERNAME_PROD)) {
	redirect = "/AIR";
} else {
	if(hostName.equals(AirKonstanten.SERVERNAME_BMS_PROD))
		redirect = "/AIR-P-MS";
	else{
		if(hostName.equals(AirKonstanten.SERVERNAME_BMS_QA)){
			redirect = "/AIR-Q-MS";
		}else
			redirect = "/AIR";
	}				    		
} *///

//response.forward(redirect);//htdocs/index.html authenticate.html

//RequestDispatcher rd = request.getRequestDispatcher("/ISMS/js/doLogin");
 // rd.forward(request, response);
  
  
  
  //
  // Set a request attribute and forward to hello.jsp page on another 
  // context.
  //
  //request.setAttribute("MESSAGE", "Hello There!");
  //RequestDispatcher dispatcher = ctx.getRequestDispatcher("/js/index.html");
  //System.out.println("dispatcher  "+dispatcher);
  //dispatcher.forward(request, response);
  response.sendRedirect("/ISMS/js");
  
%>