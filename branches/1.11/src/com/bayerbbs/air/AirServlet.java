package com.bayerbbs.air;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bayerbbs.air.error.ErrorCodeReader;
import com.bayerbbs.applrepos.validation.ValidationReader;

public class AirServlet extends HttpServlet {
	private static final long serialVersionUID = 3569239290421829949L;
		
	public void init(ServletConfig config) {
		String configFile = config.getServletContext().getRealPath("config/AttributeProperties.xml");//htdocs
		ValidationReader.setValidationConfigFile(configFile);
		
		String errorMessageFile = config.getServletContext().getRealPath("lang/english_errormessages.xml");//htdocs
		ErrorCodeReader.setErrorMessageConfigFile(errorMessageFile);
		
//		String connectionPropertiesFile = config.getServletContext().getRealPath("htdocs/config/ConnectionProperties.xml");
//		ConnectionPropertiesReader.setConfigFile(connectionPropertiesFile);
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
//		String ciId = req.getParameter("id");
		
		StringBuffer html = new StringBuffer();
		
		String userAgent = req.getHeader("user-agent");
		boolean isIE = userAgent.contains("MSIE");
		
		if(isIE) {
			html.append("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n");
		} else {
			html.append("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n");//<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">	<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">
		}
		
//		String einsprungHiddenFeld = "";
//		if(ciId != null)
//			einsprungHiddenFeld = "<hidden id='ciId' value='"+ciId+"'/>\n";
		
//		String basePath = req.getScheme()+"://"+req.getServerName()+":"+req.getServerPort()+req.getContextPath();
		
		html.
		append("<html>\n").
			append("<head>\n").
				append("<meta name='description' content='BBS Application Infrastructure Repository'>\n").
				append("<meta name='keywords' content='BBS, AIR, Application Infrastructure Repository'>\n").
				append("<meta name='author' content='BBS-ITO-BDC-FSC-SCM'>\n").
				append("<meta http-equiv='expires' content='0'>\n").//content='0' 86400
				append("<meta http-equiv='pragma' content='no-cache'>\n").
				append("<meta http-equiv='cache-control' content='no-cache'>\n").
				append("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>\n").
				
	//			===================================================================================================================
				
				append("<title>BBS Application Infrastructure Repository</title>\n").
				append("<link rel='shortcut icon' type='image/x-icon' href='data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//AAAAAAC+//8AwP//CMv//yG5+/hIsO/pdb/k3pm55+J+st7aVMj//yS+//8Ivv7+AAAAAAC+//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//Abr9/BPF//9UedHHv0nAq+xJwaX7W7ie/4e7o/+ytJzxh4BxxMf//1+8//8cvfn5AwAAAAC+//8Avv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+//8AAAAAAL7//wC///8Qwv//Yl7OvvAryKz/OMuy/jzFqP88w6H/OryW/1Owjv6zvKP/fFc9/rnb1Jq+//81vf7+Cb7+/QAAAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv/+Bsz//0ld08XkJ8uz/zfPuP46yLD/OsWn/zvBoP8/vJj/QLiR/1G2j/6pvqD/gU8t/5aNd8fP//9Quv//EL3+/gAAAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL7//wC9/v8giefgqjHQvv4z1cD+N863/znKsf84xqf/PsGh/z66mP9At4//RLKJ/0ane/+zyqv/fkYc/4dnSu3F//9qvv//Gb7//wEAAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+//8Auv39CcX//1xQ2Mr3MNfG/zLTv/8zy7T/StC5+1vMtfRayrHwU8Kk+0Kyjv8+sIX/RK6A/k+qfP+xuJb+gUIU/4VfPfOz1MuMyP//Jrz8/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//AL7//wDK//8goPDrvyTSwP8x2cj/PdG+/6To0v+tzb7ft//+ba/x71qc3tx4mtnRwXC+ovpCqXz/Ral2/lWkdP/Wzqz+hEkW/3tCF/unsaOywv//Ob38/AkAAAAAAAAAAL7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvf//Bdb//1JE1sn5LNzN/z7Xx/+l0rv+lGU2/7vZz55ihIUpZU08UaWJcqXSqYvH++vV1bXayO9Yr4P9RKFp/2SldP67oXT/k1Yg/n1CFf+foY7Iv/v5VcH//xO+/v4BAAAAAL7//wAAAAAAAAAAAAAAAAAAAAAAvv//AAAAAADA//8Rn/DtlynYyv413M3+rebP/5tpMv+lg1b7l9HUcZdpTpvmzrDAypx/wNqpib/rvZ7B/ubLyeX26t+BuZn5QZhZ/5vBlP6dbzv/n2Al/4JDD/+GYkTov/LwfLz//yK9+vkEAAAAAL7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAMH//yhr5t7JLt/T/3Hm1/+ZeEn/oWQm/6ukiN/Ep4zA58qqwOXHqb7Wo4a+9samvv7VtL7/3r2//O7Pw////tOly7DzSY9W/9LYsv+bYSb+qGou/41NFv9+TCT/tNLJo7///za9/v4HAAAAAAAAAAC+//8AAAAAAAAAAAC+//8Cu/38Sljh2esv3dL/p8mv/6BoLP+gYyf/2s207fDlz8f/8NC+6Mmsv+3CpL/85cS//fTSv/3417/68c+/9+7Xwf//+M7D3cfqaZhp/8Krd/+nbyn+qm8s/p1fIv+BRhn/oaGNwcD//zq7+vkHv/39AAAAAAC+//8AAAAAAL3//gm1+/pyQeDW/1jl2v/Am2f/pmoo/55lKf/e2Mzp+/fixuHRucO4k33IyrieytHOssjb28bF39/OxdfUwcbVzrTG5N/Exuncxsvv+PPjsrqX/bJ+Nv+wdij/rnUp/6puKv6FQw3/tM3Cv8L//0O9//8Mvv//AAAAAAAAAAAAvP7/D7H7+o4p29L/r/Hd/qpxJ/+qcCj/oGYq/9/azujr4NHMuKCS1a6onN2utaXbsr6w17G6s9a7xcLVqa2n162tnNapq5fTv76n0NXQu9/R/PPxx7GM+7N5If+1eyr/snws/6BhH/6SWyf/wdrH0Ln59z69/fwEAAAAAAAAAAC+//8Urvr4oDHg1v/Eyp7/rXIf/65zKf+iaSn/3tnM6/XnzOHPq2b4zKxj+dfAifPXxpTxvcOk7qWmcPa/0bzvicar8bTFt+Pc5dfmXcal+2LQsPvo+evutH0q/7yCKP67gyv/sHMl/55gIP+dnXH/tOrij7///xIAAAAAAAAAAMP//xum+PW0UOfd/7iaVP+7fiX/sXgo/6VpJP/d1MXy37Jd/dCnYvvbv4n55di29sWKIf/i2bn4jJtW/tXhzvdFp3r/1/fu8m7Fo/s+t5D/xtnI8baypOXRuYP5wock/8SJKv+7fyn/q2kh/qaaZv+MuKLR0P//Jr7//wC+//8Ayv//H5rz7s9r59j/tIkv/7+EJ/+2eyf/qW0k/8WwlvjnvW3+z6hr+tvClfju6930x44o/t7Yuvl1pGr+zuHP90eicv7b7+X1kdG091a6lPxjvJr6mZSG5dnNre/IkCb/ypIp/8OHJv+zciH/qKFs/3ige/DT//83vv//AQAAAADA//8arPn3r3zhzP+8iyj/w4gm/7qAKP+vdij/roNQ/vr26O3Il037xI48/di3gfvFiyf+4Nu993S3i/vM5Nb0SJpm/uT18e/K2Mvm9P368kSwg/7B077l9fTh5M+gO/7RmSn/yYwk/7h3IP+mp3P/caB19NP//zu+//8BAAAAAL3//xKx+vmVhd3K/7uIJv7IjCX/vYIn/7R7Kf6fZR3/7/Hs7O3l0evaw5730Kpu+8KGKP/o9e7pa8Gh+tHs4uxXnm38c7GK+qPPtfR7vp37VLCH/PH34Nj2++7Y1KlK/NufJv/QkSL/uHwe/52vfP95qH7t0v//N77//wEAAAAAvf//CLT6+mqY6uD/qHYc/8uPJf7Chyb/uX4o/6xzI/+9nnX727J1+bh7LPzDjkb57uzf3/P999Cq1rjh6/f009rs4t1jpnb4R5hj/GWug/jW7eDe/e3Qxvr77tLZs1X646Qp/9SSHv/GkTr/faRy/32tjtzT//8rvv//AAAAAAC+//8Bvv7+LaT38ra1pGzxt20J/76BH/6/hCv/tHoq/qh2Nf7s9PPr////2f///83+///E//30wf/238Lmy7LB/fPaxP//7sn//e7M//vmyv/q0MP+07O/+vrp0d+6WPrlrCb/1I8V/+TKif5LgUf/ns69vMj//x4AAAAAAAAAAAAAAAC+//8Ivfz8MML+/Imxdif/s2oN/7JwF/+3fSr/r3Un/ru4kv+O5N/69v//2vz//8X///+/0KqTvvHr4b/93cG//+HAv/7bur/+1bW//8+vvv7Jqb/29uLS4rxO+e+wJv/amSb/us+e/zp0N/+z6uCYvf//EgAAAAAAAAAAAAAAAL7+/gC9//8CvP//JLrNspuudyn8qGAJ/6hmFv6ydSb/qnU1/qPt3f9q4dn84vv54f//+8nlxqzA59fIv97Iv77lwq2//c6uv//Lq7//xaW+/8inxcnPubnjukH08bEe/+rHcP9KhUr/U41U/7Pz7mu+/v0IAAAAAAAAAAC+//8AAAAAAAAAAAC+/v4Ev///JMDv5YCti1PzpFwN/5paE/6maCD/qY5e/2/s4/9J2Mr+yvPv6/733832yq3C0ZyAvvHDp7/rqY6//8Ojvv/BoMSohXCOuNvAjPDFO/3qqyP/nLV4/zl/P/9im2zpuPf0SL7//wEAAAAAAAAAAAAAAAAAAAAAvv//AAAAAAC//v0Cu/z8FsL//1yplm3Tnl4Z/5ZQDP+XXR//qcOn/z7Zyv481ML/q+vi8/Hexdj5vaLG1GlLv8ZcPL/fmn26tIx1fmybny3W6baw8rko/9XMff9Hi1T/O4BC/navjcPB//8lAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//AAAAAAC+//8Avf//C8X//zqyx7SilWAo/pFOEf+TXi3+o+nb/yzRvv840Lv/ZNK++9Pdx+j2qYrLqGdPk3NXSUQkSU4TuP//PdrTjOjX2Yr/SY9a/zSDQv45fD7+pNvOicD//w4AAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL7//wAAAAAAvv/+A77//yTC7eeJjV4v9YZDD/+UbEj/hebZ/znQu/84zbT/O8Go/3TSxO2i6+WqsPPwdrP18Wyy9vSfo9aw8jaIVf8zik7+OYVH/1qUafDa//9Cvf7+AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvfz7Ar3//xfD/Ppmm4lp3Hs4Cv+biWn+Y9K+/znNtP9CybH+P8Ol/0m+n/9bw6T+YMKi+0+vhv4rjlv/M49X/jiKUv8+hUv/rOTam8f//xe+/v4Avv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvv//AL3//w3D//9Gqa2bynU4Ef+4sZf/UMKr/jfDpf9EyKj/SsSh/0u+l/89qoD/M51s/zWZZP87lF7+Q5Ja/3OwkOC///9Avf7+BL7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL7//wAAAAAAAAAAALv18wfE//8yrb+yon9UMvmnoIP/YMSp/i6wjP83r4v/OKmA/zuleP8/onP/QZ9t/kebZv9Wmm78p+Pae73+/hIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL7//wAAAAAAAAAAAL3+/gS///8hv/n4b5uLduanmoL/jtO8/0Gwjv5JsYv/TK6G/1Cqf/9Tp3n/XKJ4/63p4JfD//8ivv/+AgAAAAC+//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+//8AAAAAAL/+/QC7+vkQx///QaWyq6SsqZrlrdPB+nnBp/5mupn2cbub7nu8oti38Ox+wv//Irv7+QMAAAAAvv//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+//8AAAAAAL7//wC9//8Ewv//F7729j++7elmwvXxcK/w61639vNNw///MML//xC9/f0BAAAAAL7//wAAAAAAAAAAAAAAAAAAAAAA/+////8B///+AH///AA///gAH//4AAf/8DgD//AwAf/gQAD/4AAAP+AAAB/gAAAPwAAAB8AAAAPAAAADwAAAA8AAAAPAAAAD4AAAA+AAAAPwAAAD+AAAB/wAAAf/AAYH/4AOB//ADA//8AAP//gAH//8AD///wA///+A//////8='>\n").
				append("<link rel='stylesheet' id='standardTheme' type='text/css' href='javascript/lib/extjs/resources/css/ext-all-air.css'>\n").
					
				append("<script type='text/javascript' src='javascript/lib/extjs/adapter/ext/ext-base-debug.js'></script><!-- ext-base.js ext-base-debug.js -->\n").
				append("<script type='text/javascript' src='javascript/lib/extjs/ext-all-debug.js'></script><!-- ext-all.js ext-all-debug.js -->\n").
					
	//			===================================================================================================================

				append("<script type='text/javascript' src='javascript/lib/extjs/ux/Ext.ux.grid.RowActions.js'></script>\n").
				append("<link rel='stylesheet' type='text/css' href='javascript/lib/extjs/ux/css/air.css'>\n").
				append("<link rel='stylesheet' type='text/css' href='javascript/lib/extjs/ux/css/rowactions.css'>\n").
				append("<link rel='stylesheet' type='text/css' href='javascript/lib/extjs/ux/css/Ext.ux.grid.RowActions.css'>\n").
				
				append("<script type='text/javascript' src='javascript/lib/extjs/ux/searchfield/SearchField.js'></script>\n").
				append("<script type='text/javascript' src='javascript/lib/extjs/ux/Soap1/WsdlContainer.js'></script>\n").
				append("<script type='text/javascript' src='javascript/lib/extjs/ux/Soap1/SoapProxy.js'></script>\n").
				append("<script type='text/javascript' src='javascript/lib/extjs/ux/Soap1/SoapReader.js'></script>\n").
				
				append("<script type='text/javascript' src='javascript/lib/jquery/1.7.1/jquery.min.js'></script>\n").
				append("<script type='text/javascript' src='javascript/lib/jquery/jquery.corner.js'></script>\n").
				append("<script type='text/javascript' src='javascript/lib/mootools/mootools-core-1.4.5-full-compat.js'></script>\n").
					
	//			===================================================================================================================
					
				append("<script type='text/javascript' src='javascript/common/AirConstants.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/Util.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/data/AirStoreLoader.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/data/AirStoreManager.js'></script>\n").
				 
				append("<script type='text/javascript' src='javascript/common/component/picker/AirPickerManager.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/picker/AirPersonPicker.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/picker/AirGroupPicker.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/picker/AirRemovePicker.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/picker/AirRecordPicker.js'></script>\n").
				
				append("<script type='text/javascript' src='javascript/common/component/AppLabelTag.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/CommandLink.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/DynamicWindow.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/AirView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/SearchField.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/FilterComboBox.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/component/RowExpander.js'></script>\n").
	
				append("<script type='text/javascript' src='javascript/common/AirWindowFactory.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirAclManager.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirTaskManager.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirApplicationManager.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirPagingToolbar.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirStoreFactory.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirOverrides.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirUiFactory.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirConfigFactory.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirHistoryManager.js'></script>\n").
				append("<script type='text/javascript' src='javascript/common/AirCallbackManager.js'></script>\n").
				
				append("<script type='text/javascript' src='javascript/search/CiAdvancedSearchView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/search/CiSearchView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/search/CiResultView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/search/CiResultGrid.js'></script>\n").
				append("<script type='text/javascript' src='javascript/search/CiStandardSearchView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/search/CiOuSearchView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/search/DwhEntityGrid.js'></script>\n").
				
				append("<script type='text/javascript' src='javascript/myplace/MyPlaceTabView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/myplace/MyPlaceView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/myplace/MyPlaceHomeView.js'></script>\n").
				
				append("<script type='text/javascript' src='javascript/ciEdit/CiEditView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/CiDetailsView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/specifics/CiSpecificsView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/specifics/CiSpecificsAnwendungView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/specifics/CiSpecificsTerrainView.js'></script>\n").
				
				append("<script type='text/javascript' src='javascript/ciDetails/CiContactsView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/CiAgreementsView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/CiProtectionView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/CiComplianceView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/CiLicenseView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/CiConnectionsView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/CiSupportStuffView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/CiHistoryView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/ComplianceControlsWindow.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/ComplianceLinkView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciDetails/CiDetailsCommon.js'></script>\n").
				
				append("<script type='text/javascript' src='javascript/ciCreate/CiCopyFromDetailView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciCreate/CiCopyFromView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciCreate/CiCreateView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciCreate/CiDeleteView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciCreate/wizard/CiCreateInfoView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciCreate/wizard/CiCreateWizardView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciCreate/wizard/CiCreateWizardP1.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciCreate/wizard/CiCreateAppMandatoryView.js'></script>\n").
				append("<!-- 		<script type='text/javascript' src='javascript/ciCreate/wizard/CiCreateApplicationPlatformView.js'></script> -->\n").
				append("<!-- 		<script type='text/javascript' src='javascript/ciCreate/wizard/CiCreateCommonServiceView.js'></script> -->\n").
				append("<script type='text/javascript' src='javascript/ciCreate/wizard/CiCreateWizardP2.js'></script>\n").
				append("<script type='text/javascript' src='javascript/ciCreate/wizard/CiCreateAppRequiredView.js'></script>\n").
	
				append("<script type='text/javascript' src='javascript/core/CiTitleView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/core/CiInfoView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/core/CiCenterView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/core/CiNavigationView.js'></script>\n").
				append("<script type='text/javascript' src='javascript/core/AirMainPanel.js'></script>\n").
				append("<script type='text/javascript' src='javascript/core/AirViewport.js'></script>\n").
				append("<script type='text/javascript' src='javascript/core/AirLoginWindow.js'></script>\n").
				append("<script type='text/javascript' src='javascript/core/AirBootstrap.js'></script>\n").
				append("<script type='text/javascript' src='javascript/core/Main.js'></script>\n").
				
	//			===================================================================================================================
				
				append("<script type='text/javascript' src='conf/config.js'></script>\n").
			append("</head>\n").
			
			
			append("<body style='background-color: #D3E1F1;'>\n").
//				append(einsprungHiddenFeld).
				append("<div id='content' style='background-color: #043453;'>\n").
					append("<div id='startscreen' class='x-hidden' style='color: darkblue; font-family: Arial, Helvetica, sans-serif !important;'><h1>Startseite</h1>Dies ist die Einstiegsseite zur Anwendung...</div>\n").
					append("<div id='searchgrid' class='x-hidden'></div>\n").
					append("<div id='infotext' style='margin-left: 5px;color: darkblue; font-family: Arial, Helvetica, sans-serif !important; font-size: 7pt !important; font-weight: bold !important;'> </div>\n").
				append("</div>").
				
				append("<div id='pwtext' class='x-hidden' style='color: darkblue; font-family: Arial, Helvetica, sans-serif !important; font-size: 7pt !important; font-weight: bold !important;'>\n").
					append("AIR uses the Bayer LDAP password (intranet password)<br/>\n").
					append("for user authentication. You can set up, proof, change or<br/>\n").
					append("reset this password on<br/>").
					append("<a href='http://by-password.bayer-ag.com/domino/httppw.nsf/Start?OpenForm=English' target='_blank'>Intranet-Password-Management</a>.<br/>\n").
					append("Additional information regarding the application login<br/>").
					append("can be found in our <a href='http://sp-coll-bbs.bayer-ag.com/sites/000127/ConfigMgmt/Forum/Benutzerhandbuch%20AIR.docx' target='_blank'>manual</a>.<br/>\n").
					append("If you need access <a href='mailto:ITILcenter@bayer.com&amp;subject=AIR:%20Request%20for%20access'>contact the administrator</a>.\n").
				append("</div>\n");
				
				if(isIE) {
					html.
					append("<form id='history-form' class='x-hidden'>\n").
						append("<input type='hidden' id='x-history-field'/>\n").
						append("<iframe id='x-history-frame'></iframe>\n").
				    append("</form>");
				}
				
			html.
			append("</body>\n").
		append("</html>");
		
		configureResponse(req, res);
		PrintWriter out = res.getWriter();
		out.print(html.toString());
	}
	
	private void configureResponse(HttpServletRequest req, HttpServletResponse res) {
		String userAgent = req.getHeader("user-agent");
		String encoding = userAgent.contains("MSIE") ? "Windows-1252" : "UTF-8";//ISO-8859-1

		res.setContentType("text/html");
		res.setCharacterEncoding(encoding);//Windows-1252 UTF-8 ISO-8859-1
	}
}