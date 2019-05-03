<%@page import="com.bayerbbs.applrepos.service.LDAPAuthWS"%><%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterInput"%><%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterOutput"%><%@page import="com.bayerbbs.applrepos.constants.ApplreposConstants"%><% 
String cwid = request.getParameter("cwid");
String token = request.getParameter("token");

LDAPAuthParameterInput paramInput = new LDAPAuthParameterInput();
paramInput.setCwid(cwid);
paramInput.setToken(token);

LDAPAuthWS ldapAuthWS = new LDAPAuthWS();
LDAPAuthParameterOutput paramOutput = ldapAuthWS.isTokenValid(paramInput);

String output = null;

if (ApplreposConstants.RESULT_OK.equals(paramOutput.getResult())) {
	// logged in
	output = "{\"success\": true, \"token\": \"" + paramOutput.getToken() + "\",\"cwid\":\"" + cwid + "\",\"username\":\"" + paramOutput.getUsername() + "\", \"lastlogon\": \"" + paramOutput.getLastLogon()+ "\"}";
}
else {
	// token invalid
	output = "{\"success\":false,\"errors\":{\"title\":\"failed\",\"reason\":\"please login\"}}";
}

%><%=output %>