<%@ page import="com.bayerbbs.bov.BovApplication"%>
<%@ page language="java" pageEncoding="UTF-8" %>
<%@ page import="java.util.*" %>
<%@ page import="org.hibernate.cfg.*" %>
<%@ page import="com.bayerbbs.applrepos.domain.*" %>
<%@ page import="com.bayerbbs.applrepos.hibernate.*" %>
<%
String strInputApplID = (String) request.getParameter("applicationId");
String cwidRequestor = (String) request.getParameter("cwidRequestor");

Long applicationId = null;

if (null != strInputApplID) {
	applicationId = Long.parseLong(strInputApplID);
}

Application app = AnwendungHbn.findApplicationById(applicationId);
BovApplication bovApp = null;

if (null != app) {
	bovApp = new BovApplication();
	bovApp.setApplication(app);	
}

// TODO Check deleted?
// TODO check access rights
		
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <head>
    <title>Business Owner Verification</title>
	<script type="text/javascript">
function clickButton(buttonName)
{
	var question = "";
	var confirmation = "";
	var reason = "";
	var newOwner = space(80);
	switch(buttonName)
	{
		case "accept":
			question = "Do you want to retire the application?";
			if (window.confirm(question))
			{
				reason = window.prompt("Please give your reasons!", "obsolete");
				confirmation = "Application retired!";
				window.alert(confirmation);
				document.getElementById("FormApplication").bovAction.value = "retire";
				document.getElementById("FormApplication").bovReason.value = reason;		
			}
			else
			{
				confirmation = "Ownership accepted!";
				window.alert(confirmation);
			}	
			break;
		case "reject":
			newOwner = window.prompt("Please nominate the new/real owner!", newOwner);
			confirmation = "Ownership rejected!";
			window.alert(confirmation);
			document.getElementById("FormApplication").bovAction.value = "denial";
			document.getElementById("FormApplication").bovReason.value = newOwner;		
			break;
	}
	document.getElementById("FormApplication").accept.disabled = true;
	document.getElementById("FormApplication").reject.disabled = true;
	document.getElementById("FormApplication").submit.disabled = false;
	getUserName();
}
function space(num) {   return new Array(num + 1).join(" "); } 
function getUserName() 
{
	var userName = "";
	switch(navigator.appName)
	{
		case "Microsoft Internet Explorer":
		    var WinNetwork = new ActiveXObject("WScript.Network");
		    userName = WinNetwork.UserName;
		    break;
	}
	document.getElementById("FormApplication").cwidRequestor.value = userName.toUpperCase();
}
</script>
  
  <style type="text/css">
  	.tableheader 
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 14px;
  		color: White;
  		background-color: Navy;
  		text-align: center;
  	}
  	.tablename
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 12px;
  		background-color: LemonChiffon;
  		vertical-align: top;
  		text-align: right;
  		width: 150px;
  	}
  	.tablevalue
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 11px;
  		width: 500px;
  	}
  	.tablered
  	{
  		font-family: Arial,Helvetica,sans-serif;
  		font-size: 11px;
  		color: Red;
  	}
	.body 
	{
	    background-color: #D3F0F1;
	    /* For WebKit (Safari, Chrome, etc) */
	    background: #D3F0F1 -webkit-gradient(linear, left top, left bottom, from(#D3DCF1), to(#D3F0F1)) no-repeat;
	    /* Mozilla,Firefox/Gecko */
	    background: #D3F0F1 -moz-linear-gradient(top, #D3DCF1, #D3F0F1) no-repeat;
	    /* IE 5.5 - 7 */
	    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#D3DCF1, endColorstr=#D3F0F1) no-repeat;
	    /* IE 8 */
	    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#D3DCF1, endColorstr=#D3DCF1)" no-repeat;
	}
	.button {
		-moz-box-shadow:inset 0px 1px 0px 0px #bbdaf7;
		-webkit-box-shadow:inset 0px 1px 0px 0px #bbdaf7;
		box-shadow:inset 0px 1px 0px 0px #bbdaf7;
	    /* For WebKit (Safari, Chrome, etc) */
		background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5) );
	    /* Mozilla,Firefox/Gecko */
		background:-moz-linear-gradient( center top, #79bbff 5%, #378de5 100% );
	    /* IE 5.5 - 7 */
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5');
		background-color:#79bbff;
		border:1px solid #84bbf3;
		display:inline-block;
		color:#ffffff;
		font-family:Arial;
		font-size:15px;
		font-weight:bold;
		font-style:normal;
		height:40px;
		line-height:40px;
		width:100px;
		text-decoration:none;
		text-align:center;
		text-shadow:1px 1px 0px #528ecc;
	}
	.button:hover {
	    /* For WebKit (Safari, Chrome, etc) */
		background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #378de5), color-stop(1, #79bbff) );
	    /* Mozilla,Firefox/Gecko */
		background:-moz-linear-gradient( center top, #378de5 5%, #79bbff 100% );
	    /* IE 5.5 - 7 */
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#378de5', endColorstr='#79bbff');
		background-color:#378de5;
	}
	.button:active {
		position:relative;
		top:1px;
	}
	.btnGreen {
		-moz-box-shadow:inset 0px 1px 0px 0px #c1ed9c;
		-webkit-box-shadow:inset 0px 1px 0px 0px #c1ed9c;
		box-shadow:inset 0px 1px 0px 0px #c1ed9c;
		background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #9dce2c), color-stop(1, #8cb82b) );
		background:-moz-linear-gradient( center top, #9dce2c 5%, #8cb82b 100% );
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#9dce2c', endColorstr='#8cb82b');
		background-color:#9dce2c;
		-webkit-border-top-left-radius:15px;
		-moz-border-radius-topleft:15px;
		border-top-left-radius:15px;
		-webkit-border-top-right-radius:15px;
		-moz-border-radius-topright:15px;
		border-top-right-radius:15px;
		-webkit-border-bottom-right-radius:15px;
		-moz-border-radius-bottomright:15px;
		border-bottom-right-radius:15px;
		-webkit-border-bottom-left-radius:15px;
		-moz-border-radius-bottomleft:15px;
		border-bottom-left-radius:15px;
		text-indent:0;
		border:1px solid #83c41a;
		display:inline-block;
		color:#ffffff;
		font-family:Arial;
		font-size:15px;
		font-weight:bold;
		font-style:normal;
		height:40px;
		line-height:40px;
		width:100px;
		text-decoration:none;
		text-align:center;
		text-shadow:1px 1px 0px #689324;
	}
	.btnGreen:hover {
		background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #8cb82b), color-stop(1, #9dce2c) );
		background:-moz-linear-gradient( center top, #8cb82b 5%, #9dce2c 100% );
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#8cb82b', endColorstr='#9dce2c');
		background-color:#8cb82b;
	}
	.btnGreen:active {
		position:relative;
		top:1px;
	}
	.btnRed {
		-moz-box-shadow:inset 0px 1px 0px 0px #f29c93;
		-webkit-box-shadow:inset 0px 1px 0px 0px #f29c93;
		box-shadow:inset 0px 1px 0px 0px #f29c93;
		background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #fe1a00), color-stop(1, #ce0100) );
		background:-moz-linear-gradient( center top, #fe1a00 5%, #ce0100 100% );
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fe1a00', endColorstr='#ce0100');
		background-color:#fe1a00;
		-webkit-border-top-left-radius:15px;
		-moz-border-radius-topleft:15px;
		border-top-left-radius:15px;
		-webkit-border-top-right-radius:15px;
		-moz-border-radius-topright:15px;
		border-top-right-radius:15px;
		-webkit-border-bottom-right-radius:15px;
		-moz-border-radius-bottomright:15px;
		border-bottom-right-radius:15px;
		-webkit-border-bottom-left-radius:15px;
		-moz-border-radius-bottomleft:15px;
		border-bottom-left-radius:15px;
		text-indent:0;
		border:1px solid #d83526;
		display:inline-block;
		color:#ffffff;
		font-family:Arial;
		font-size:15px;
		font-weight:bold;
		font-style:normal;
		height:40px;
		line-height:40px;
		width:100px;
		text-decoration:none;
		text-align:center;
		text-shadow:1px 1px 0px #b23e35;
	}
	.btnRed:hover {
		background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ce0100), color-stop(1, #fe1a00) );
		background:-moz-linear-gradient( center top, #ce0100 5%, #fe1a00 100% );
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ce0100', endColorstr='#fe1a00');
		background-color:#ce0100;
	}
	.btnRed:active {
		position:relative;
		top:1px;
	}
</style>
  
  </head>
 <body class="body">
  
  
<% if (null == app) { %>

Could not find the application.
<% } else { %>

<form id="FormApplication" method="post" action="BovApplicationServlet"> 

<table border="1">
<tr class="tableheader">
<td colspan="2">Business Owner Request Information</td>
</tr>
<tr>
<td class="tablename">Business Owner:</td>
<td class="tablevalue"><%=bovApp.getDispBusinessOwner() %></td>
</tr>
<tr>
	<td class="tablename">CI Owner Manager:</td>
	<td class="tablevalue"><%=bovApp.getDispCiOwnerManager() %></td>
</tr>
<tr>
	<td class="tablename">Logical Name:</td>
	<td class="tablevalue"><%=bovApp.getDispApplicationName() %></td>
</tr>
<tr>
	<td class="tablename">CI Description:</td>
	<td class="tablevalue"><%=bovApp.getDispApplicationAlias() %></td>
</tr>
<tr>
	<td class="tablename">Application (CI) Status:</td>
	<td class="tablevalue"><%=bovApp.getDispApplicationStatus() %></td>
</tr>
<tr>
	<td class="tablename">Owning Business:</td>
	<td class="tablevalue"><%=bovApp.getDispOwningBusiness() %></td>
</tr>
<tr>
	<td class="tablename">CI Modified Date:</td>
	<td class="tablevalue"><%=bovApp.getDispCIModifiedDate() %></td>
</tr>
<tr>
	<td class="tablename">Processed:</td>
	<td class='tablevalue'><%=bovApp.getDispProcessed()%></td>
</tr>
<tr>
	<td class="tablename">Notification Date:</td>
	<td class='tablevalue'><%=bovApp.getDispNotificationDate() %></td>
</tr>
<tr>
	<td class="tablename">Ownership Status:</td>
	<td class='tablevalue'><%=bovApp.getDispOwnershipStatus() %></td>
</tr>
<tr>
	<td class="tablename">Request Verified On:</td>
	<td class="tablevalue"><%=bovApp.getDispRequestVerifiedOn() %></td>
</tr>
<tr>
	<td class="tablename">Request Verified By:</td>
	<td class="tablevalue"><%=bovApp.getDispRequestVerifiedBy() %></td>
</tr>

</table>

<p>
	<button class="btnGreen" type="button" name="accept" value="Accept" onclick="clickButton('accept')">Accept</button>
	<button class="btnRed" type="button" name="reject" value="Reject" onclick="clickButton('reject')">Reject</button>
</p>

<table border="1">
<tr class="tableheader">
<td colspan="2">CI Characteristics</td>
</tr>
<tr title="This field indicates how quickly an application needs to be returned to service in the event of a declared disaster in the Data Center and also, how much data loss can be accepted for that recovery.">
	<td class="tablename">DR Level:</td>
	<td class="tablevalue">
		<input type="radio" name="drlevel" value="1" title="Level 1 - Return to Service within 24 Hours and maximum data loss of 1 Hour."/> &le;24 hours (Level 1)<br/>
		<input type="radio" name="drlevel" value="2" title="Level 2 - Return to Service within 5 Days and maximum data loss up to last successful backup."/> 2-5 days (Level 2)<br/>
		<input type="radio" name="drlevel" value="3" title="Level 3 - Best effort to return to Service and maximum data loss up to last successful backup."/> Best Effort (Level 3)<br/>
		<br/>
		<span class="tablered">Original Disaster Recovery (DR): <%=bovApp.getDispDrLevel()%></span>
	</td>
</tr>
<tr title="This setting summarizes the parameters specified in the Service Level Agreement (SLA) in effect for this item.  It also alerts individuals logging calls into the Incident Management system how to categorize the call.">
<td class="tablename">Severity Level:</td>
<td class="tablevalue">
	<input type="radio" name="severitylevel" value="1" title="Level 1 - Failure INHIBITS Bayer's ability to do mission critical business or presents significant safety risk; multi-users."/>Level 1-Emergency<br/>
	<input type="radio" name="severitylevel" value="2" title="Level 2 - Failure IMPACTS Bayer's ability to do business or effects regulatory requirements; multi-users."/>Level 2-Important<br/>
	<input type="radio" name="severitylevel" value="3" title="Level 3 - Failure does not inhibit or impact any Bayer mission critical business; multi-users."/>Level 3-Medium<br/>
	<input type="radio" name="severitylevel" value="4" title="Level 4 - Failure does not inhibit or impact any Bayer mission critical business; single-user."/>Level 4-Low<br/>
	<br/>
	<span class="tablered">Original Severity: <%=bovApp.getDispSeverityLevel()%></span>
	</td>
</tr>
<tr title="Relevant applications are those applications that must adhere to certain FDA compliance regulations in the Clinical, Laboratory or Manufacturing areas.  GXP stands for Good x Practices where the x stands for Clinical, Laboratory, or Manufacturing.">
<td class="tablename">GxP Relevant:</td>
<td class="tablevalue">
	<input type="radio" name="gxprelevant" value="GXP"/> Yes<br/>
	<input type="radio" name="gxprelevant" value=""/> No<br/>
	<br/>
	<span class="tablered">Original GxP Relevancy: <%=bovApp.getDispGxpRelevant()%></span>
</td>
</tr>
<tr title="GISC compliance relevant applications are those applications that are listed by our clients on their 'General IS Control Landscape' as being financially significant and require the appropriate General IS Controls (GISC).">
<td class="tablename">GISC Relevant:</td>
	<td class="tablevalue">
	<input type="radio" name="icsrelevant" value="Y"/> Yes<br/>
	<input type="radio" name="icsrelevant" value="N"/> No<br/>
	<br/>
	<span class="tablered">Original GISC Relevancy: <%=bovApp.getDispGiscRelevant()%></span>
	</td>
</tr>
<tr>
<td class="tablename">GR1435 Relevant:</td>
	<td class="tablevalue">
	<input type="radio" name="itsecrelevant" value="Y"/> Yes<br/>
	<input type="radio" name="itsecrelevant" value="N"/> No<br/>
	<br/>
	<span class="tablered">Original GR1435 Relevancy: <%=bovApp.getDispGR1435Relevant()%></span>
	</td>
</tr>
</table>


<table border="1">
<tr class="tableheader">
<td colspan="2">Information Classification</td>
</tr>
<tr>
<td class="tablename">Information Classification:</td>
	<td class="tablevalue">
	<input type="radio" name="informationclassification" value="public"  title="1- Public: Public Access - No protection is required."/>1-Public<br/>
	<input type="radio" name="informationclassification" value="internal" title="2 - Internal: Generic Access - Access is granted to Bayer employees and possibly contractors with CWIDs.  Protection against external access is required."/>2-Internal<br/>
	<input type="radio" name="informationclassification" value="restricted" title="3 - Restricted: Managed Access - Access is granted to a group of people defined by the business owner. Information may be re-distributed to others on a ‘need to know’ basis. Protection against unwanted external access is required."/>3-Restricted<br/>
	<input type="radio" name="informationclassification" value="secret" title="4 - Secret: Strictly Managed Access and Read-Protected Storage. Access is strictly granted to a group of people defined by the business owner. Information is not stored as ‘clear/plain text’, (eg., encrypted). Protection against any other unwanted access is required. (If protection is not possible, the information must be deleted, destroyed, or made unrecoverable)."/>4-Secret<br/>
	<br/>
	<span class="tablered">Original Information Classification: <%=bovApp.getDispInformationClassification()%></span>
	</td>
</tr>
<tr  title="Does the data contained within the application contain personal data (eg. Data for employees, customers, clinical trial patients, suppliers, etc.)">
<td class="tablename">Data Privacy:</td>
<td class='tablevalue'>
	<input type="radio" name="personaldata" value="Y"/> Yes<br/>
	<input type="radio" name="personaldata" value="N"/> No<br/>
	<br/>
	<span class="tablered">Original Data Privacy: <%=bovApp.getDispDataPrivacy()%></span>
</td>
</tr>
</table>
<fieldset>
	<input type='hidden' name='applicationId' value='<%=""+app.getApplicationId().longValue()%>'/>
	<input type='hidden' name='cwidRequestor'/>
	<input type='hidden' name='bovAction' value=''/>
	<input type='hidden' name='bovReason' value=''/>
	<input class="btnGreen" type='submit' value='Submit' name='submit' disabled='disabled'/>
	<input class="btnRed" type='reset' value='Reset' name='reset'/>
</fieldset>
<div>
<a href="http://users.skynet.be/mgueury/mozilla/">
  <img src="http://users.skynet.be/mgueury/mozilla/serial_16.gif"
  alt="Validated by HTML Validator" height="16" width="39"/>
</a>
</div>
</form>

<% } %>

</body>
</html>