<%@page import="com.bayerbbs.applrepos.service.LDAPAuthWS"%><%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterInput"%><%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterOutput"%><%@page import="com.bayerbbs.applrepos.constants.ApplreposConstants"%><% 
String cwid = request.getParameter("cwid");

LDAPAuthWS ldapAuthWS = new LDAPAuthWS();

ldapAuthWS.logout(cwid);

response.sendRedirect("htdocs/index.html");//authenticate.html
%>

