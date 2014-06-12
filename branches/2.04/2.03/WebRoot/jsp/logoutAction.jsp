<%@page import="com.bayerbbs.applrepos.service.LDAPAuthWS"%>
<%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterInput"%>
<%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterOutput"%>
<% 
String cwid = request.getParameter("cwid");
String token = request.getParameter("token");

LDAPAuthWS ldapAuthWS = new LDAPAuthWS();

ldapAuthWS.logout(cwid, token);

response.sendRedirect("/AIR");//htdocs/index.html authenticate.html
%>