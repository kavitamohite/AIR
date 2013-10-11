<%@ page import="com.bayerbbs.bov.BovApplication"%>
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

Application app = AnwendungHbn.findApplicationById(applicationId);
if (null != app)
{
	if (null == cwidSteward)	cwidSteward = app.getApplicationSteward();
	if (null == cwidSteward)	cwidSteward = app.getApplicationOwner();
}
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
		
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <head>
    <title>Business Owner Verification</title>
	<link rel='shortcut icon' type='image/x-icon' href='data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//AAAAAAC+//8AwP//CMv//yG5+/hIsO/pdb/k3pm55+J+st7aVMj//yS+//8Ivv7+AAAAAAC+//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//Abr9/BPF//9UedHHv0nAq+xJwaX7W7ie/4e7o/+ytJzxh4BxxMf//1+8//8cvfn5AwAAAAC+//8Avv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+//8AAAAAAL7//wC///8Qwv//Yl7OvvAryKz/OMuy/jzFqP88w6H/OryW/1Owjv6zvKP/fFc9/rnb1Jq+//81vf7+Cb7+/QAAAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv/+Bsz//0ld08XkJ8uz/zfPuP46yLD/OsWn/zvBoP8/vJj/QLiR/1G2j/6pvqD/gU8t/5aNd8fP//9Quv//EL3+/gAAAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL7//wC9/v8giefgqjHQvv4z1cD+N863/znKsf84xqf/PsGh/z66mP9At4//RLKJ/0ane/+zyqv/fkYc/4dnSu3F//9qvv//Gb7//wEAAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+//8Auv39CcX//1xQ2Mr3MNfG/zLTv/8zy7T/StC5+1vMtfRayrHwU8Kk+0Kyjv8+sIX/RK6A/k+qfP+xuJb+gUIU/4VfPfOz1MuMyP//Jrz8/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//AL7//wDK//8goPDrvyTSwP8x2cj/PdG+/6To0v+tzb7ft//+ba/x71qc3tx4mtnRwXC+ovpCqXz/Ral2/lWkdP/Wzqz+hEkW/3tCF/unsaOywv//Ob38/AkAAAAAAAAAAL7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvf//Bdb//1JE1sn5LNzN/z7Xx/+l0rv+lGU2/7vZz55ihIUpZU08UaWJcqXSqYvH++vV1bXayO9Yr4P9RKFp/2SldP67oXT/k1Yg/n1CFf+foY7Iv/v5VcH//xO+/v4BAAAAAL7//wAAAAAAAAAAAAAAAAAAAAAAvv//AAAAAADA//8Rn/DtlynYyv413M3+rebP/5tpMv+lg1b7l9HUcZdpTpvmzrDAypx/wNqpib/rvZ7B/ubLyeX26t+BuZn5QZhZ/5vBlP6dbzv/n2Al/4JDD/+GYkTov/LwfLz//yK9+vkEAAAAAL7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAMH//yhr5t7JLt/T/3Hm1/+ZeEn/oWQm/6ukiN/Ep4zA58qqwOXHqb7Wo4a+9samvv7VtL7/3r2//O7Pw////tOly7DzSY9W/9LYsv+bYSb+qGou/41NFv9+TCT/tNLJo7///za9/v4HAAAAAAAAAAC+//8AAAAAAAAAAAC+//8Cu/38Sljh2esv3dL/p8mv/6BoLP+gYyf/2s207fDlz8f/8NC+6Mmsv+3CpL/85cS//fTSv/3417/68c+/9+7Xwf//+M7D3cfqaZhp/8Krd/+nbyn+qm8s/p1fIv+BRhn/oaGNwcD//zq7+vkHv/39AAAAAAC+//8AAAAAAL3//gm1+/pyQeDW/1jl2v/Am2f/pmoo/55lKf/e2Mzp+/fixuHRucO4k33IyrieytHOssjb28bF39/OxdfUwcbVzrTG5N/Exuncxsvv+PPjsrqX/bJ+Nv+wdij/rnUp/6puKv6FQw3/tM3Cv8L//0O9//8Mvv//AAAAAAAAAAAAvP7/D7H7+o4p29L/r/Hd/qpxJ/+qcCj/oGYq/9/azujr4NHMuKCS1a6onN2utaXbsr6w17G6s9a7xcLVqa2n162tnNapq5fTv76n0NXQu9/R/PPxx7GM+7N5If+1eyr/snws/6BhH/6SWyf/wdrH0Ln59z69/fwEAAAAAAAAAAC+//8Urvr4oDHg1v/Eyp7/rXIf/65zKf+iaSn/3tnM6/XnzOHPq2b4zKxj+dfAifPXxpTxvcOk7qWmcPa/0bzvicar8bTFt+Pc5dfmXcal+2LQsPvo+evutH0q/7yCKP67gyv/sHMl/55gIP+dnXH/tOrij7///xIAAAAAAAAAAMP//xum+PW0UOfd/7iaVP+7fiX/sXgo/6VpJP/d1MXy37Jd/dCnYvvbv4n55di29sWKIf/i2bn4jJtW/tXhzvdFp3r/1/fu8m7Fo/s+t5D/xtnI8baypOXRuYP5wock/8SJKv+7fyn/q2kh/qaaZv+MuKLR0P//Jr7//wC+//8Ayv//H5rz7s9r59j/tIkv/7+EJ/+2eyf/qW0k/8WwlvjnvW3+z6hr+tvClfju6930x44o/t7Yuvl1pGr+zuHP90eicv7b7+X1kdG091a6lPxjvJr6mZSG5dnNre/IkCb/ypIp/8OHJv+zciH/qKFs/3ige/DT//83vv//AQAAAADA//8arPn3r3zhzP+8iyj/w4gm/7qAKP+vdij/roNQ/vr26O3Il037xI48/di3gfvFiyf+4Nu993S3i/vM5Nb0SJpm/uT18e/K2Mvm9P368kSwg/7B077l9fTh5M+gO/7RmSn/yYwk/7h3IP+mp3P/caB19NP//zu+//8BAAAAAL3//xKx+vmVhd3K/7uIJv7IjCX/vYIn/7R7Kf6fZR3/7/Hs7O3l0evaw5730Kpu+8KGKP/o9e7pa8Gh+tHs4uxXnm38c7GK+qPPtfR7vp37VLCH/PH34Nj2++7Y1KlK/NufJv/QkSL/uHwe/52vfP95qH7t0v//N77//wEAAAAAvf//CLT6+mqY6uD/qHYc/8uPJf7Chyb/uX4o/6xzI/+9nnX727J1+bh7LPzDjkb57uzf3/P999Cq1rjh6/f009rs4t1jpnb4R5hj/GWug/jW7eDe/e3Qxvr77tLZs1X646Qp/9SSHv/GkTr/faRy/32tjtzT//8rvv//AAAAAAC+//8Bvv7+LaT38ra1pGzxt20J/76BH/6/hCv/tHoq/qh2Nf7s9PPr////2f///83+///E//30wf/238Lmy7LB/fPaxP//7sn//e7M//vmyv/q0MP+07O/+vrp0d+6WPrlrCb/1I8V/+TKif5LgUf/ns69vMj//x4AAAAAAAAAAAAAAAC+//8Ivfz8MML+/Imxdif/s2oN/7JwF/+3fSr/r3Un/ru4kv+O5N/69v//2vz//8X///+/0KqTvvHr4b/93cG//+HAv/7bur/+1bW//8+vvv7Jqb/29uLS4rxO+e+wJv/amSb/us+e/zp0N/+z6uCYvf//EgAAAAAAAAAAAAAAAL7+/gC9//8CvP//JLrNspuudyn8qGAJ/6hmFv6ydSb/qnU1/qPt3f9q4dn84vv54f//+8nlxqzA59fIv97Iv77lwq2//c6uv//Lq7//xaW+/8inxcnPubnjukH08bEe/+rHcP9KhUr/U41U/7Pz7mu+/v0IAAAAAAAAAAC+//8AAAAAAAAAAAC+/v4Ev///JMDv5YCti1PzpFwN/5paE/6maCD/qY5e/2/s4/9J2Mr+yvPv6/733832yq3C0ZyAvvHDp7/rqY6//8Ojvv/BoMSohXCOuNvAjPDFO/3qqyP/nLV4/zl/P/9im2zpuPf0SL7//wEAAAAAAAAAAAAAAAAAAAAAvv//AAAAAAC//v0Cu/z8FsL//1yplm3Tnl4Z/5ZQDP+XXR//qcOn/z7Zyv481ML/q+vi8/Hexdj5vaLG1GlLv8ZcPL/fmn26tIx1fmybny3W6baw8rko/9XMff9Hi1T/O4BC/navjcPB//8lAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//AAAAAAC+//8Avf//C8X//zqyx7SilWAo/pFOEf+TXi3+o+nb/yzRvv840Lv/ZNK++9Pdx+j2qYrLqGdPk3NXSUQkSU4TuP//PdrTjOjX2Yr/SY9a/zSDQv45fD7+pNvOicD//w4AAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL7//wAAAAAAvv/+A77//yTC7eeJjV4v9YZDD/+UbEj/hebZ/znQu/84zbT/O8Go/3TSxO2i6+WqsPPwdrP18Wyy9vSfo9aw8jaIVf8zik7+OYVH/1qUafDa//9Cvf7+AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvfz7Ar3//xfD/Ppmm4lp3Hs4Cv+biWn+Y9K+/znNtP9CybH+P8Ol/0m+n/9bw6T+YMKi+0+vhv4rjlv/M49X/jiKUv8+hUv/rOTam8f//xe+/v4Avv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//AL3//w3D//9Gqa2bynU4Ef+4sZf/UMKr/jfDpf9EyKj/SsSh/0u+l/89qoD/M51s/zWZZP87lF7+Q5Ja/3OwkOC///9Avf7+BL7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL7//wAAAAAAAAAAALv18wfE//8yrb+yon9UMvmnoIP/YMSp/i6wjP83r4v/OKmA/zuleP8/onP/QZ9t/kebZv9Wmm78p+Pae73+/hIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL7//wAAAAAAAAAAAL3+/gS///8hv/n4b5uLduanmoL/jtO8/0Gwjv5JsYv/TK6G/1Cqf/9Tp3n/XKJ4/63p4JfD//8ivv/+AgAAAAC+//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+//8AAAAAAL/+/QC7+vkQx///QaWyq6SsqZrlrdPB+nnBp/5mupn2cbub7nu8oti38Ox+wv//Irv7+QMAAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+//8AAAAAAL7//wC9//8Ewv//F7729j++7elmwvXxcK/w61639vNNw///MML//xC9/f0BAAAAAL7//wAAAAAAAAAAAAAAAAAAAAAA/+////8B///+AH///AA///gAH//4AAf/8DgD//AwAf/gQAD/4AAAP+AAAB/gAAAPwAAAB8AAAAPAAAADwAAAA8AAAAPAAAAD4AAAA+AAAAPwAAAD+AAAB/wAAAf/AAYH/4AOB//ADA//8AAP//gAH//8AD///wA///+A//////8='/>
	<link rel='stylesheet' id='standardTheme' type='text/css' href='javascript/lib/extjs/resources/css/ext-all-air.css'/>	
	<link rel='stylesheet' type='text/css' href='javascript/lib/extjs/ux/css/air.css?2.01.004'/>
	<link rel='stylesheet' type='text/css' href='javascript/lib/extjs/ux/css/rowactions.css?2.01.004'/>
	<link rel='stylesheet' type='text/css' href='javascript/lib/extjs/ux/css/Ext.ux.grid.RowActions.css?2.01.004'/>
	<script type="text/javascript">
function clickButton(buttonName)
{
	var question = "";
	var confirmation = "";
	switch(buttonName)
	{
		case "accept":
			question = "Do you want to retire the application?";
			if (window.confirm(question))
			{
				confirmation = "Application retired!";
				window.alert(confirmation);
				document.getElementById("FormApplication").bovAction.value = "retire";
				document.getElementById("FormApplication").submit();
			}
			else
			{
				confirmation = "Ownership accepted!";
				window.alert(confirmation);
				document.getElementById("FormApplication").reset();
			}	
			break;
		case "reject":
			confirmation ="Ownership rejected!";
			window.alert(confirmation);
			document.getElementById("FormApplication").bovAction.value = "denial";
			document.getElementById("FormApplication").submit();
			break;
	}
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
  		valign: top;
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
</style>
  
  </head>
 <body class="body">
  
  
<% if (null == app) { %>

Could not find the application.
<% } else if (!isStewardValid) { %>
The application Steward does not match

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
	<button type="button" name="accept" value="Accept" onclick="clickButton('accept')">Accept</button>
	<button type="button" name="reject" value="Reject" onclick="clickButton('reject')">Reject</button>
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
	<input type='hidden' name='cwidSteward' value='<%=cwidSteward%>'/>
	<input type='hidden' name='bovAction' value=''/>
	<input type='hidden' name='bovReason' value=''/>
	<input type='submit' value=' Save ' name='save'/>
	<input type='reset' value= ' Cancel ' name='cancel'/>
</fieldset>
<p>
	<a href="http://users.skynet.be/mgueury/mozilla/">
	  <img src="http://users.skynet.be/mgueury/mozilla/serial_16.gif"
	  alt="Validated by HTML Validator" height="16" width="39"/>
	</a>
</p>
</form>

<% } %>

</body>
</html>