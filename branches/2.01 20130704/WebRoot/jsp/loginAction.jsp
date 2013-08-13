<%@page import="com.bayerbbs.applrepos.service.LDAPAuthWS"%>
<%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterInput"%>
<%@page import="com.bayerbbs.applrepos.service.LDAPAuthParameterOutput"%>
<%@page import="com.bayerbbs.applrepos.constants.AirKonstanten"%>
<% 
	String cwid = request.getParameter("cwid");
	String password = request.getParameter("password");
	
	LDAPAuthParameterInput paramInput = new LDAPAuthParameterInput();
	paramInput.setCwid(cwid);
	paramInput.setPassword(password);
	
	LDAPAuthWS ldapAuthWS = new LDAPAuthWS();
	LDAPAuthParameterOutput paramOutput = ldapAuthWS.login(paramInput);
	
	String output = null;
	
	if (AirKonstanten.RESULT_OK.equals(paramOutput.getResult())) {
		request.setAttribute("token", paramOutput.getToken());
		output = "{\"success\": true, \"token\": \"" + paramOutput.getToken() + "\", \"cwid\": \"" + paramOutput.getCwid() + "\", \"lastlogon\": \"" + paramOutput.getLastLogon()+ "\"}";
	}
	else {
		request.setAttribute("result", paramOutput.getResult());
		String reason = paramOutput.getMessages()[0];
	
		output = "{\"success\":false,\"errors\":{\"title\":\"failed\",\"reason\":\"" + reason + "\",\"cwid\":\"" + cwid + "\"}}";
	}
%>
<%=output %>