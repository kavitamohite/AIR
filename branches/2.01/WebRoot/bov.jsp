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
  <script>
function denyOwnership()
{
	alert("Ownership denied!");
}
function retireApplication()
{
	alert('Application retired!');
}
function delegateVerification()
{
	alert('Verification delegated!');
}
</script>
  
  <style>
  	.tableheader 
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 14px;
  		color: #FFFFFF;
  		background-color: #4863A0;
  	}
  	.tablename
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 11px;
  		background-color: #FFFFC2;
  		vertical-align: 'top';
  		text-align: 'right';
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
  		font-size: 12px;
  		color: #FF0000;
  	}
  	.tableQM
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 12px;
  		color: LemonChiffon;
  		background-color: DeepPink;
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
<td class="tablename">CI Owner Representative:</td><td class='tablevalue'><%=bovApp.getDispCIOwnerRepresentative() %></td>
</tr>
<tr>
<td class="tablename">Architecture:</td><td class='tableQM'><%="Architecture??" %></td>
</tr>
<tr>
<td class="tablename">Application Source:</td><td class='tableQM'><%="Application Source??" %></td>
</tr>
<tr>
<td class="tablename">Application (CI) Status:</td><td class='tablevalue'><%=bovApp.getDispApplicationStatus() %></td>
</tr>
<tr>
<td class="tablename">Draft:</td><td class='tableQM'><%="Draft??" %></td>
</tr>
<tr>
<td class="tablename">Owner Business Line:</td><td class='tablevalue'><%=bovApp.getDispOwnerBusinessLine() %></td>
</tr>
<tr>
<td class="tablename">Owner Country:</td><td class='tableQM'><%="Owner Country??" %></td>
</tr>
<tr>
<td class="tablename">CI Modified Date:</td><td class='tablevalue'><%=bovApp.getDispCIModifiedDate() %></td>
</tr>
<tr>
<td class="tablename">Processed:</td><td class='tableQM'><%="Processed??" %></td>
</tr>
<tr>
<td class="tablename">Notification Date:</td><td class='tableQM'><%="Notification Date??" %></td>
</tr>
<tr>
<td class="tablename">Ownership Status:</td><td class='tableQM'><%="Ownership Status??" %></td>
</tr>
<tr>
<td class="tablename">Request Verified On:</td><td class='tablevalue'><%=bovApp.getDispRequestVerifiedOn() %></td>
</tr>
<tr>
<td class="tablename">Request Verified By:</td><td class='tablevalue'><%=bovApp.getDispRequestVerifiedBy() %></td>
</tr>

</table>

<p>
<button type="button" name="denial" value="Deny Ownership" onclick="denyOwnership()">Deny Ownership</button>
<button type="button" name="retire" value="Retire Application" onclick="retireApplication()">Retire Application</button>
<button type="button" name="delegate" value="Delegate Verification" onclick="delegateVerification()">Delegate Verification</button>
</p>

<table border="1">
<tr class="tableheader">
<td colspan="2">CI Characteristics</td>
</tr>

<tr>
<td class="tablename" width="<%=spalte1 %>" >DR Level:</td>
	<td class='tablevalue'width="<%=spalte2%>">
	<input type="radio" name="drlevel" value="1"> &le;24 hours (Level 1)<br/>
	<input type="radio" name="drlevel" value="2"> 2-5 days (Level 2)<br/>
	<input type="radio" name="drlevel" value="3"> Best Effort (Level 3)<br/>
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
<td class="tablename">GxP Relevant:</td><td class='tablevalue'>
	<input type="radio" name="gxprelevant" value="GXP"> Yes<br/>
	<input type="radio" name="gxprelevant" value=""> No<br/>
	<br/>
	<span class='tablered'>Original GxP Relevancy: <%=bovApp.getDispGxpRelevant()%></span>
</td>
</tr>
<tr>
<td class="tablename">ICS Relevant:</td>
	<td class='tablevalue'>
	<input type="radio" name="icsrelevant" value="Y"> Yes<br/>
	<input type="radio" name="icsrelevant" value="N"> No<br/>
	<br/>
	<span class='tablered'>Original ICS Relevancy: <%=bovApp.getDispIcsRelevant()%></span>
	</td>
</tr>
</table>

<br/>

<table border="1">
<tr class="tableheader">
<td colspan="2">Health Care - CI Characteristics</td>
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
<td class="tablename">Data Privacy:</td><td class='tableQM'>Data Privacy???</td>
</tr>

<tr>
<td class="tablename">Application Description:</td><td class='tablevalue'><%=bovApp.getDispApplicationDescription() %></td>
</tr>
</table>

<input type='hidden' name='applicationId' value='<%=""+app.getApplicationId().longValue()%>'>
<input type='hidden' name='cwidSteward' value='<%=cwidSteward%>'>
<input type='submit' value=" Save " name=save/>
<input type='reset' value= " Cancel " name=cancel/>
</form>

<% } %>

</body>
</html>