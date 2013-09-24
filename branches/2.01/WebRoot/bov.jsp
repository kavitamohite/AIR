<%@page import="com.bayerbbs.bov.BovApplication"%>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="java.util.*" %>
<%@ page import="org.hibernate.cfg.*" %>
<%@ page import="com.bayerbbs.applrepos.domain.*" %>
<%@ page import="com.bayerbbs.applrepos.hibernate.*" %>
<%
String strInputApplID = (String) request.getParameter("applicationId");
String cwidSteward = (String) request.getParameter("cwidSteward");

Long applicationId = null;

if (null != strInputApplID) {
	applicationId = Long.parseLong(strInputApplID);
}

if (null == applicationId) {
	applicationId = new Long(143698); 
}

if (null == cwidSteward) {
	cwidSteward = "";
}

Application app = AnwendungHbn.findApplicationById(applicationId);
BovApplication bovApp = null;

boolean isStewardValid = false;

if (null != app) {
	bovApp = new BovApplication();
	bovApp.setApplication(app);
	
	// check steward
	if (null != app.getApplicationSteward()) {
		if (cwidSteward.toUpperCase().equals(app.getApplicationSteward().toUpperCase())) {
			isStewardValid = true;
		}
	}
	else {
		isStewardValid = true;
	}
}

// TODO Check deleted?
// TODO check steward noch erlaubt ?!? und wenn nicht, was dann?
isStewardValid = true;		
		
String spalte1 = "150";
String spalte2 = "400";

%>
<html>
  <head>
    <title>BOV</title>
  
  <style>
  	.tableheader 
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 11px;
  		color: #FFFFFF;
  		background-color: #4863A0;
  	}
  	.tablename
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 11px;
  		background-color: #FFFFC2;
  		valign: 'top';
  	}
  	.tablevalue
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 11px;
  		valign: 'top';
  	}
  	.tablered
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 11px;
  		color: #FF0000;
  	}
  </style>
  
  </head>
 <body>
  
  
<% if (null == app) { %>

Could not find the application.
<% } else if (!isStewardValid) { %>
The application Steward does not match

<% } else { %>

<form name="FormApplication" method="POST" action="BovApplicationServlet"> 



<table border="1">
<tr class="tableheader">
<td colspan="2">Business Owner Request Information</td>
</tr>
<tr>
<td class="tablename" width="<%=spalte1%>">Owner CWID:</td><td class='tablevalue' width="<%=spalte2%>"><%=bovApp.getDispOwnerCWID() %></td>
</tr>
<tr>
<td class="tablename">Manager CWID:</td><td class='tablevalue'><%=bovApp.getDispManagerCWID() %></td>
</tr>
<tr>
<td class="tablename">Logical Name:</td><td class='tablevalue'><%=app.getApplicationName() %></td>
</tr>
<tr>
<td class="tablename">CI Description:</td><td class='tablevalue'><%=app.getApplicationAlias() %></td>
</tr>
<tr>
<td class="tablename">CI Owner Representative:</td><td class='tablevalue'><%=app.getApplicationSteward() %></td>
</tr>
<tr>
<td class="tablename">Architecture:</td><td class='tablevalue'><%="Architecture??" %></td>
</tr>
<tr>
<td class="tablename">Application Source:</td><td class='tablevalue'><%="Application Source??" %></td>
</tr>
<tr>
<td class="tablename">Application (CI) Status:</td><td class='tablevalue'><%=bovApp.getDispApplicationStatus() %></td>
</tr>
<tr>
<td class="tablename">Draft:</td><td class='tablevalue'><%="Draft??" %></td>
</tr>
<tr>
<td class="tablename">Owner Business Line:</td><td class='tablevalue'><%="Owner Business Line??" %></td>
</tr>
<tr>
<td class="tablename">Owner Country:</td><td class='tablevalue'><%="Owner Country??" %></td>
</tr>
<tr>
<td class="tablename">CI Modified Date:</td><td class='tablevalue'><%=app.getUpdateTimestamp() %></td>
</tr>
<tr>
<td class="tablename">Processed:</td><td class='tablevalue'><%="Processed??" %></td>
</tr>
<tr>
<td class="tablename">Notification Date:</td><td class='tablevalue'><%="Notification Date??" %></td>
</tr>
<tr>
<td class="tablename">Ownership Status:</td><td class='tablevalue'><%="Ownership Status??" %></td>
</tr>
<tr>
<td class="tablename">Request Verified On:</td><td class='tablevalue'>
	<% if (null != app.getBovLastTimestamp()) { %>
		<%=app.getBovLastTimestamp() %>
	<% } %>
</td>
</tr>
<tr>
<td class="tablename">Request Verified By:</td><td class='tablevalue'><%=bovApp.getDispRequestVerifiedBy() %></td>
</tr>

</table>

<br/>



<table border="1">
<tr class="tableheader">
<td colspan="2">CI Characteristics</td>
</tr>

<tr>
<td class="tablename" width="<%=spalte1 %>" >DR Level:</td>
	<td class='tablevalue'width="<%=spalte2%>">
	<input type="radio" name="drlevel" value="1"> <=24 hours (Level 1)<br/>
	<input type="radio" name="drlevel" value="2"> 2-5 days (Level 2)<br/>
	<input type="radio" name="drlevel" value="3"> Best Effort (Level 3)<br/>
	<input type="radio" name="drlevel" value="4"> Best Effort (Level 4)<br/>
	<br/>
	<span class='tablered'>Original Disaster Recovery (DR): <%=bovApp.getDispDrLevel()%></span>
	</td>
</tr>
<tr>
<td class="tablename">Severity Level:</td>
	<td class='tablevalue'>
	<input type="radio" name="severitylevel" value="1">Level 1-Emergency<br/>
	<input type="radio" name="severitylevel" value="2">Level 2-Important<br/>
	<input type="radio" name="severitylevel" value="3">Level 3-Medium<br/>
	<input type="radio" name="severitylevel" value="4">Level 4-Low<br/>
	<br/>
	
	<span class="tablered">Original Severity: <%=bovApp.getDispSeverityLevel()%></span>
	</td>
</tr>
<tr>
<td class="tablename">GxP Relevant:</td><td class='tablevalue'>GxP Relevant???  Yes/No  possible values: empty, GXP, GCP, GLP, GMP</td>
</tr>
<tr>
<td class="tablename">GISC Relevant:</td>
	<td class='tablevalue'>
	<input type="radio" name="giscrelevant" value="Y"> Yes<br/>
	<input type="radio" name="giscrelevant" value="N"> No<br/>
	<br/>
	<span class='tablered'>Original Generals IS Controls Relevancy: <%=bovApp.getDispGiscRelevant()%></span>
	</td>
</tr>
</table>

<br/>



<table border="1">
<tr class="tableheader">
<td colspan="2">Healtch Care - CI Characteristics</td>
</tr>

<tr>
<td class="tablename" width="<%=spalte1%>">Information Classification:</td>
	<td class='tablevalue' width="<%=spalte2%>">
	<input type="radio" name="informationclassification" value="public">1-Public<br/>
	<input type="radio" name="informationclassification" value="internal">2-Internal<br/>
	<input type="radio" name="informationclassification" value="restricted">3-Restricted<br/>
	<input type="radio" name="informationclassification" value="secret">4-Secret<br/>
	<br/>
	<span class='tablered'>Original Information Classification: <%=bovApp.getDispInformationClassification()%></span>
	</td>
</tr>
<tr>
<td class="tablename">Data Privacy:</td><td class='tablevalue'>Data Privacy???</td>
</tr>
<tr>
<td class="tablename">Application Name:</td><td class='tablevalue'><%=bovApp.getDispApplicationName() %></td>
</tr>
<tr>
<td class="tablename">Application Description:</td><td class='tablevalue'><%=bovApp.getDispApplicationDescription() %></td>
</tr>
</table>

<input type='hidden' name='applicationId' value='<%=""+app.getApplicationId().longValue()%>'>
<input type='hidden' name='cwidSteward' value='<%=cwidSteward%>'>
<INPUT type='submit' value="save" name=save>
</form>

<% } %>

</body>
</html>