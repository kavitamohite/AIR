package com.bayerbbs.air;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.InetAddress;
import java.nio.CharBuffer;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;

import com.bayerbbs.air.error.ErrorCodeReader;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.AccountDTO;
import com.bayerbbs.applrepos.dto.ApplicationCat1DTO;
import com.bayerbbs.applrepos.dto.ApplicationCat2DTO;
import com.bayerbbs.applrepos.dto.BusinessEssentialDTO;
import com.bayerbbs.applrepos.dto.CategoryBusinessDTO;
import com.bayerbbs.applrepos.dto.CiTypeDTO;
import com.bayerbbs.applrepos.dto.ClassInformationDTO;
import com.bayerbbs.applrepos.dto.ConfidentialityDTO;
import com.bayerbbs.applrepos.dto.CurrencyDTO;
import com.bayerbbs.applrepos.dto.DedicatedDTO;
import com.bayerbbs.applrepos.dto.GapClassDTO;
import com.bayerbbs.applrepos.dto.GxpFlagDTO;
import com.bayerbbs.applrepos.dto.InterfacesDTO;
import com.bayerbbs.applrepos.dto.ItSecGroupDTO;
import com.bayerbbs.applrepos.dto.ItSecSBWerteDTO;
import com.bayerbbs.applrepos.dto.ItSetDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.KeyValueType2DTO;
import com.bayerbbs.applrepos.dto.KeyValueTypeDTO;
import com.bayerbbs.applrepos.dto.LicenseTypeDTO;
import com.bayerbbs.applrepos.dto.LifecycleStatusDTO;
import com.bayerbbs.applrepos.dto.LoadClassDTO;
import com.bayerbbs.applrepos.dto.OperationalStatusDTO;
import com.bayerbbs.applrepos.dto.OrganisationalScopeDTO;
import com.bayerbbs.applrepos.dto.OsNameDTO;
import com.bayerbbs.applrepos.dto.OsTypeDTO;
import com.bayerbbs.applrepos.dto.PriorityLevelDTO;
import com.bayerbbs.applrepos.dto.ProcessDTO;
import com.bayerbbs.applrepos.dto.ReferenzDTO;
import com.bayerbbs.applrepos.dto.ServiceModelDTO;
import com.bayerbbs.applrepos.dto.SeverityLevelDTO;
import com.bayerbbs.applrepos.dto.SlaDTO;
import com.bayerbbs.applrepos.service.AIRToolsWS;
import com.bayerbbs.applrepos.service.ApplicationCat1WS;
import com.bayerbbs.applrepos.service.ApplicationCat2WS;
import com.bayerbbs.applrepos.service.ApplicationToolsWS;
import com.bayerbbs.applrepos.service.InterfacesWS;
import com.bayerbbs.applrepos.service.ItsecMassnahmenWS;
import com.yahoo.platform.yui.compressor.JavaScriptCompressor;

final class YuiCompressorErrorReporter implements ErrorReporter {
    public void warning(String message, String sourceName, int line, String lineSource, int lineOffset) {
        if (line < 0) {
            System.out.println("Warning: " +  message);
        } else {
        	System.out.println("Warning: " + line + ':' + lineOffset + ':' + message);
        }
    }
 
    public void error(String message, String sourceName, int line, String lineSource, int lineOffset) {
        if (line < 0) {
        	System.out.println("Error: " + message);
        } else {
        	System.out.println("Error: " + line + ':' + lineOffset + ':' + message + "\n" + lineSource);
        }
    }
 
    public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource, int lineOffset) {
        error(message, sourceName, line, lineSource, lineOffset);
        return new EvaluatorException(message);
    }
}
	
public class AirServlet extends HttpServlet {
	private static final long serialVersionUID = 3569239290421829949L;
		
	public void init(ServletConfig config) {
		try {
			super.init(config);
		} 
		catch (Exception e) {
			System.out.println(e.toString());
		}
		String errorMessageFile = config.getServletContext().getRealPath("conf/lang/english_errormessages.xml");//lang htdocs
		ErrorCodeReader.setErrorMessageConfigFile(errorMessageFile);
		
	}


	private StringWriter getXMLFile(String filename) {
		String fs = System.getProperty("file.separator");
		CharBuffer sw = CharBuffer.allocate(1048576);
		ServletContext servletContext = getServletContext();
		String target = servletContext.getRealPath("/").concat(filename);
		
		try {
			BufferedReader reader = new BufferedReader( new FileReader (target), 1048576);
		    String line = null;
		    StringWriter stringBuilder = new StringWriter();
		     
		    String ls = System.getProperty("line.separator");
		    stringBuilder.append("var " + filename.replace("/", "_").replace(".", "_") + " = '");
		    while( ( line = reader.readLine() ) != null ) {
		    	//byte[] ptext = line.getBytes("ISO-8859-1");
		        //stringBuilder.append( new String(ptext).trim().replace("'", "\\'"));
		        stringBuilder.append( line.trim().replace("'", "\\'"));
		    }
		    stringBuilder.append("';\n");
		    return stringBuilder;
		} catch (Exception e) {
			return new StringWriter().append("Error in file " + target + " -> " + e.toString());
		}
	}
	
	private boolean existsCompressedJSFile(String version, String filename, String compressedcodedir) {
		String fs = System.getProperty("file.separator");
		ServletContext servletContext = getServletContext();
		String current = servletContext.getRealPath("/").concat(filename.replace("/", "_").replace(".", "__"));
		String target = current.replace("javascript_", compressedcodedir + fs).replace("__js", version);
		File f = new File(target);
		if(f.isFile()) {
			return true;
		}
		return false;
	}
	
	private boolean writeCompressedJSFile(String version, String filename, String compressedcodedir, StringWriter sw) {
		String fs = System.getProperty("file.separator");
		ServletContext servletContext = getServletContext();
		String current = servletContext.getRealPath("/").concat(filename.replace("/", "_").replace(".", "__"));
		String target = current.replace("javascript_", compressedcodedir + fs).replace("__js", version);
		try {
			File nf = new File(target);
			nf.createNewFile();
			nf.setReadable(true);
			nf.setWritable(true);
			FileWriter f = new FileWriter(target);
			f.write(sw.toString());
			f.close();
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	private StringWriter readCompressedJSFile(String version, String filename, String compressedcodedir) {
		String fs = System.getProperty("file.separator");
		CharBuffer sw = CharBuffer.allocate(1048576);
		ServletContext servletContext = getServletContext();
		String current = servletContext.getRealPath("/").concat(filename.replace("/", "_").replace(".", "__"));
		String target = current.replace("javascript_", compressedcodedir + fs).replace("__js", version);
		try {
			BufferedReader reader = new BufferedReader( new FileReader (target), 1048576);
		    String line = null;
		    StringWriter stringBuilder = new StringWriter();
		    String ls = System.getProperty("line.separator");
		    while( ( line = reader.readLine() ) != null ) {
		        stringBuilder.append( line );
		        stringBuilder.append( ls );
		    }
		    return stringBuilder;
		} catch (Exception e) {
			return new StringWriter().append("Error in file " + target + " -> " + e.toString());
		}
	}
	
	private String compressJSFile(String fileName, String version) {
		StringWriter sw = new StringWriter();
		String cversion = version.replace(".", "").replace("?", ".");
		try {
			if (AirKonstanten.SERVERNAME_PROD.equals(InetAddress.getLocalHost()
					.getHostName())
					|| AirKonstanten.SERVERNAME_QA.equals(InetAddress
							.getLocalHost().getHostName())
					|| AirKonstanten.SERVERNAME_BMS_PROD.equals(InetAddress
							.getLocalHost().getHostName())
					|| AirKonstanten.SERVERNAME_BMS_QA.equals(InetAddress
							.getLocalHost().getHostName())) {
				ServletContext servletContext = getServletContext();
				String current = servletContext.getRealPath("/");
				if (!existsCompressedJSFile(cversion, fileName,
						AirKonstanten.COMPRESSEDCODEDIR)) {
					FileReader f = new FileReader(current + fileName);
					sw.append("<script>/* ").append(fileName).append(" */ ");
					System.out.println(fileName);
					JavaScriptCompressor compressor = new JavaScriptCompressor(
							f, new YuiCompressorErrorReporter());
					compressor.compress(sw, -1, false, false, false, false);
					sw.append("</script>\n");
					writeCompressedJSFile(cversion, fileName,
							AirKonstanten.COMPRESSEDCODEDIR, sw);
				} else {
					sw = readCompressedJSFile(cversion, fileName,
							AirKonstanten.COMPRESSEDCODEDIR);
				}
			} else {
				sw = new StringWriter();
				sw.append("<script type='text/javascript' src='").append(fileName).append(version).append("'></script>\n");
			}
		}
		catch (Exception e) { 
			sw = new StringWriter();
			sw.append("<script type='text/javascript' src='").append(fileName).append(version).append(e.toString()).append("'></script>\n");
		}
		return sw.toString();
	}
	
//	private String compressCSSFile(String fileName, String version) {
//		StringWriter sw = new StringWriter();
//		try {
//			if (AirKonstanten.SERVERNAME_PROD.equals(InetAddress.getLocalHost().getHostName()) || AirKonstanten.SERVERNAME_QA.equals(InetAddress.getLocalHost().getHostName()) ) {
//				ServletContext servletContext = getServletContext();
//				String current = servletContext.getRealPath("/");
//				FileReader f = new FileReader(current + fileName);
//				sw.append("<style>/* ").append(fileName).append(" */ ");
//				CssCompressor compressor = new CssCompressor(f);
//				compressor.compress(sw, -1);
//				sw.append("</style>\n");
//			} else {
//				sw = new StringWriter();
//				sw.append("<link rel='stylesheet' type='text/css' href='").append(fileName).append(version).append("'>\n");
//			}
//		}
//		catch (Exception e) { 
//			sw = new StringWriter();
//			sw.append("<link rel='stylesheet' type='text/css' href='").append(fileName).append(version).append(e.toString()).append("'>\n");
//		}
//		return sw.toString();
//	}
	
	private String getDataStores() {
		AIRToolsWS dataInput = new AIRToolsWS();
		//ApplicationWS appDataInput = new ApplicationWS();
		ApplicationToolsWS applicationDataInput = new ApplicationToolsWS();
		ApplicationCat1WS cat1DataInput = new ApplicationCat1WS();
		ApplicationCat2WS cat2DataInput = new ApplicationCat2WS();
		ItsecMassnahmenWS itsecMasnDataInput = new ItsecMassnahmenWS();
		InterfacesWS interfacesDataInput = new InterfacesWS();
		long ts = System.currentTimeMillis();
		
		String output = "\n";
		CurrencyDTO[] currencies = dataInput.getCurrencyList();
		String currencyLine = "";
		for(CurrencyDTO currencyItem : currencies) {
			currencyLine += "['" + currencyItem.getCurrencyId().toString() + "','" + currencyItem.getCurrencyName() + "','" + currencyItem.getCurrencySymbol() + "'],";
		}
		currencyLine = "var currencyData = [" + currencyLine.substring(0, currencyLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += currencyLine + "\n";
		
		LicenseTypeDTO[] licenseTypes = dataInput.getLicenseTypeList();
		String licenseTypeLine = "";
		for(LicenseTypeDTO licenseTypeItem : licenseTypes) {
			licenseTypeLine += "['" + licenseTypeItem.getLicenseTypeId().toString() + "','" + licenseTypeItem.getLicenseTypeName() + "'],"; 
		}
		licenseTypeLine = "var licenseTypeData = [" + licenseTypeLine.substring(0, licenseTypeLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += licenseTypeLine + "\n";
		
		AccountDTO[] accounts = dataInput.getAccountList();
		String accountLine = "";
		for(AccountDTO accountItem : accounts) {
			accountLine += "['" + accountItem.getAccountId().toString() + "','" + accountItem.getAccountName() + "'],"; 
		}
		accountLine = "var accountData = [" + accountLine.substring(0, accountLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += accountLine + "\n";
		
		ItSetDTO[] itsets = dataInput.getItSetList();
		String itsetLine = "";
		for(ItSetDTO itsetItem : itsets) {
			itsetLine += "['" + itsetItem.getId().toString() + "','" + itsetItem.getItSetName() + "'],"; 
		}
		itsetLine = "var itsetData = [" + itsetLine.substring(0, itsetLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += itsetLine + "\n";
		
		ItSecSBWerteDTO[] itsecSBWerte = dataInput.getItSecSBWerteList();
		String itsecSBWerteLine = "";
		for(ItSecSBWerteDTO itsecSBWerteItem : itsecSBWerte) {
			itsecSBWerteLine += "['" + itsecSBWerteItem.getItsecSBId().toString() + "','" + itsecSBWerteItem.getSbTextEn() + "'],"; 
		}
		itsecSBWerteLine = "var itsecSBWerteData = [" + itsecSBWerteLine.substring(0, itsecSBWerteLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += itsecSBWerteLine + "\n";
		
		ClassInformationDTO[] classinformations = dataInput.getClassInformationList();
		String classinformationLine = "";
		for(ClassInformationDTO classinformationItem : classinformations) {
			classinformationLine += "['" + classinformationItem.getClassInformationId().toString() + "','" + classinformationItem.getClassInformationName() + "','" + classinformationItem.getClassProtectionName() + "'],"; 
		}
		classinformationLine = "var classinformationData = [" + classinformationLine.substring(0, classinformationLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += classinformationLine + "\n";
		
		// Confidentiality
		ConfidentialityDTO[] confidentialitys = dataInput.getConfidentialityList();
		String confidentialityLine = "";
		for(ConfidentialityDTO confidentialityItem : confidentialitys) {
			confidentialityLine += "['" + confidentialityItem.getConfidentialityId() + "','" + confidentialityItem.getConfidentialityName() + "'],"; 
		}
		confidentialityLine = "var confidentialityData = [" + confidentialityLine.substring(0, confidentialityLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += confidentialityLine + "\n";

		// SLA
		SlaDTO[] slas = dataInput.getSlaList();
		String slaLine = "";
		for(SlaDTO slaItem : slas) {
			slaLine += "['" + slaItem.getSlaId() + "','" + slaItem.getSlaName() + "'],"; 
		}
		slaLine = "var slaData = [" + slaLine.substring(0, slaLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += slaLine + "\n";
		
		
		
/*		ServiceContractDTO[] serviceContracts = applicationDataInput.getServiceContractList();
		String serviceContractLine = "";
		for(ServiceContractDTO serviceContractItem : serviceContracts) {
			serviceContractLine += "['" + serviceContractItem.getServiceContractId().toString() + "','" + serviceContractItem.getServiceContractName() + "','" + serviceContractItem.getSlaId().toString() + "'],"; 
		}*/
//		serviceContractLine = "var serviceContractData = [" + serviceContractLine.substring(0, serviceContractLine.length()-1) + "];";
//		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
//		ts = System.currentTimeMillis();
//		output += serviceContractLine + "\n";
		
		PriorityLevelDTO[] priorityLevels = dataInput.getPriorityLevelList();
		String priorityLevelLine = "";
		for(PriorityLevelDTO priorityLevelItem : priorityLevels) {
			priorityLevelLine += "['" + priorityLevelItem.getPriorityLevelId().toString() + "','" + priorityLevelItem.getPriorityLevel() + "'],"; 
		}
		priorityLevelLine = "var priorityLevelData = [" + priorityLevelLine.substring(0, priorityLevelLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += priorityLevelLine + "\n";
		
		SeverityLevelDTO[] severityLevels = dataInput.getSeverityLevelList();
		String severityLevelLine = "";
		for(SeverityLevelDTO severityLevelItem : severityLevels) {
			severityLevelLine += "['" + severityLevelItem.getSeverityLevel() + "','" + severityLevelItem.getSeverityLevelId().toString() + "'],"; 
		}
		severityLevelLine = "var severityLevelData = [" + severityLevelLine.substring(0, severityLevelLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += severityLevelLine + "\n";
		
		BusinessEssentialDTO[] businessEssentials = dataInput.getBusinessEssentialList();
		String beLine = "";
		for(BusinessEssentialDTO beItem : businessEssentials) {
			beLine += "['" + beItem.getSeverityLevel() + "','" + beItem.getSeverityLevelId().toString()  + "','" + beItem.getUsage()+ "'],"; 
		}
		beLine = "var beData = [" + beLine.substring(0, beLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += beLine + "\n";
		
		ApplicationCat2DTO[] applicationCat2s = cat2DataInput.getApplicationCat2List();
		String applicationCat2Line = "";
		for(ApplicationCat2DTO applicationCat2Item : applicationCat2s) {
			applicationCat2Line += "['" + applicationCat2Item.getApplicationCat2Id() + "','" + applicationCat2Item.getApplicationCat1Id() + "','" + applicationCat2Item.getApplicationCat2Text() + "','" + applicationCat2Item.getGuiSAPNameWizard() + "'],"; 
		}
		applicationCat2Line = "var applicationCat2Data = [" + applicationCat2Line.substring(0, applicationCat2Line.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += applicationCat2Line + "\n";
		
		LifecycleStatusDTO[] lifecycleStatuus = dataInput.getLifecycleStatusList();
		String lifecycleStatusLine = "";
		for(LifecycleStatusDTO lifecycleStatusItem : lifecycleStatuus) {
			lifecycleStatusLine += "['" + lifecycleStatusItem.getLcStatusId().toString() + "','" + lifecycleStatusItem.getLcSubStatusId().toString() + "','" + lifecycleStatusItem.getTableId().toString() + "','" + lifecycleStatusItem.getLcStatus() + "'],"; 
		}
		lifecycleStatusLine = "var lifecycleStatusData = [" + lifecycleStatusLine.substring(0, lifecycleStatusLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += lifecycleStatusLine + "\n";
		
		OperationalStatusDTO[] oprationalstatuus = dataInput.getOperationalStatusList();
		String oprationalStatusLine = "";
		for(OperationalStatusDTO oprationalstatusItem : oprationalstatuus) {
			oprationalStatusLine += "['" + oprationalstatusItem.getOperationalStatusId().toString() + "','" + oprationalstatusItem.getOperationalStatusEn() + "'],"; 
		}
		oprationalStatusLine = "var oprationalStatusData = [" + oprationalStatusLine.substring(0, oprationalStatusLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += oprationalStatusLine + "\n";
		
		CategoryBusinessDTO[] categoryBusinesses = dataInput.getCategoryBusinessList();
		String categoryBusinessLine = "";
		for(CategoryBusinessDTO categoryBusinessItem : categoryBusinesses) {
			categoryBusinessLine += "['" + categoryBusinessItem.getCategoryBusinessId().toString() + "','" + categoryBusinessItem.getCategoryBusinessName() + "'],"; 
		}
		categoryBusinessLine = "var categoryBusinessData = [" + categoryBusinessLine.substring(0, categoryBusinessLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += categoryBusinessLine + "\n";
		
		ProcessDTO[] processes = dataInput.getProcessList();
		String processLine = "";
		for(ProcessDTO processItem : processes) {
			processLine += "['" + processItem.getProcessId().toString() + "','" + processItem.getProcessName() + "'],"; 
		}
		processLine = "var processData = [" + processLine.substring(0, processLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += processLine + "\n";
		
		ApplicationCat1DTO[] appCat1s = cat1DataInput.getApplicationCat1List();
		String appCat1Line = "";
		for(ApplicationCat1DTO appCat1Item : appCat1s) {
			appCat1Line += "['" + appCat1Item.getApplicationCat1Id() + "','" + appCat1Item.getApplicationCat1Text() + "','" + appCat1Item.getApplicationCat1En() + "'],"; 
		}
		appCat1Line = "var appCat1Data = [" + appCat1Line.substring(0, appCat1Line.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += appCat1Line + "\n";
		
		String databaseLine = "var databaseData = [['" + dataInput.getDatabaseDisplayName().getId() + "','" + dataInput.getDatabaseDisplayName().getText() + "']];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += databaseLine + "\n";
		
		CiTypeDTO[] ciTypes = dataInput.getCiTypes(false);
		String ciTypeLine = "";
		for(CiTypeDTO ciTypeItem : ciTypes) {
			ciTypeLine += "['" + ciTypeItem.getId() + "','" + ciTypeItem.getCiTypeName() + "','" + ciTypeItem.getCiTypeId() + "','" + ciTypeItem.getCiSubTypeId() + "','" + ciTypeItem.getSortId() + "'],"; 
		}
		ciTypeLine = "var ciTypeData = [" + ciTypeLine.substring(0, ciTypeLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += ciTypeLine + "\n";
		
		CiTypeDTO[] ciTypesShort = dataInput.getCiTypes(true);
		String ciTypeShortLine = "";
		for(CiTypeDTO ciTypeItem : ciTypesShort) {
			ciTypeShortLine += "['" + ciTypeItem.getId() + "','" + ciTypeItem.getCiTypeName() + "','" + ciTypeItem.getCiTypeId() + "','" + ciTypeItem.getCiSubTypeId() + "','" + ciTypeItem.getSortId() + "'],"; 
		}
		ciTypeShortLine = "var ciTypeShortData = [" + ciTypeShortLine.substring(0, ciTypeShortLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += ciTypeShortLine + "\n";
		
		DedicatedDTO[] dedicatets = dataInput.getDedicatedList();
		String dedicatedLine = "";
		for(DedicatedDTO dedicatedItem: dedicatets) {
			dedicatedLine += "['" + dedicatedItem.getDedicatedId() + "','" + dedicatedItem.getDedicatedTxt() + "'],";
		}
		dedicatedLine = "var dedicatedData = [" + dedicatedLine.substring(0, dedicatedLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += dedicatedLine + "\n";
		
		OrganisationalScopeDTO[] oScopes = dataInput.getOrganisationalScopeList();
		String oScopeLine = "";
		for (OrganisationalScopeDTO oScopeItem : oScopes) {
			oScopeLine += "['" + oScopeItem.getOrganisationalScopeId() + "','" + oScopeItem.getOrganisationalScopeTxt() + "'],"; 
		}
		oScopeLine = "var oScopeData = [" + oScopeLine.substring(0, oScopeLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += oScopeLine + "\n";
		
		LoadClassDTO[] loadClasses = dataInput.getLoadClassList();
		String loadClassLine = "";
		for (LoadClassDTO loadClassItem : loadClasses) {
			loadClassLine += "['" + loadClassItem.getLoadClassId() + "','" + loadClassItem.getLoadClassTxt() + "'],"; 
		}
		loadClassLine = "var loadClassData = [" + loadClassLine.substring(0, loadClassLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += loadClassLine + "\n";
		
		ServiceModelDTO[] serviceModels = dataInput.getServiceModelList();
		String serviceModelLine = "";
		for (ServiceModelDTO serviceModelItem : serviceModels) {
			serviceModelLine += "['" + serviceModelItem.getServiceModelId() + "','" + serviceModelItem.getServiceModelTxt() + "'],"; 
		}
		serviceModelLine = "var serviceModelData = [" + serviceModelLine.substring(0, serviceModelLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += serviceModelLine + "\n";
		
		GxpFlagDTO[] gxpFlags = dataInput.getGxpFlagList();
		String gxpFlagLine = "";
		for (GxpFlagDTO gxpFlagItem : gxpFlags) {
			gxpFlagLine += "['" + gxpFlagItem.getGxpFlagId() + "','" + gxpFlagItem.getGxpFlagTxt() + "'],"; 
		}
		gxpFlagLine = "var gxpFlagData = [" + gxpFlagLine.substring(0, gxpFlagLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += gxpFlagLine + "\n";
		
		ItSecGroupDTO[] itsecGroups = dataInput.getItSecGroupList();
		String itsecGroupLine = "";
		int count = 0;
		for (ItSecGroupDTO itsecGroupItem : itsecGroups) {
			itsecGroupLine += "['" + String.valueOf(count++) + "','" + itsecGroupItem.getItSecGroupId() + "','" + itsecGroupItem.getItSecGroupName() + "','" + itsecGroupItem.getItsetId() + "','" + itsecGroupItem.getCiKat1() + "','" + itsecGroupItem.getTableId().toString() +"'],";
		}
		itsecGroupLine = "var itsecGroupData = [" + itsecGroupLine.substring(0, itsecGroupLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += itsecGroupLine + "\n";
		
		ItSecGroupDTO[] itsecGroupsSimple = dataInput.getItSecGroupSimpleList();
		String itsecGroupSimpleLine = "";
		for (ItSecGroupDTO itsecGroupItem : itsecGroupsSimple) {
			itsecGroupSimpleLine += "['" + itsecGroupItem.getItSecGroupId() + "','" + itsecGroupItem.getItSecGroupName() + "','" + itsecGroupItem.getCiKat1() + "'," + itsecGroupItem.getTableId() +"],";
		}
		itsecGroupSimpleLine="['1234567','None','-1234567',123],['1234568','None','-1234568',33],['1234569','None','-1234569',37],"+
        "['1234570','None','-1234570',12],['1234571','None','-1234571',30],['1234572','None','-1234572',88],['1234574','None','-10006',2],"+
        "['1234573','None','-1234567',1],['1234574','None','5',2],['1234579','None','-10013',2],['1234575','None','-1234574',13],"+
        "['1234576','None','-1234575',3],['1234577','None','-10007',2],['1234579','None','-10006',2],['1234578','None','-1234576',4],"+itsecGroupSimpleLine;
		itsecGroupSimpleLine = "var itsecGroupSimpleData = [" + itsecGroupSimpleLine.substring(0, itsecGroupSimpleLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += itsecGroupSimpleLine + "\n";
		
		KeyValueDTO[] clusterTypes = dataInput.getItSystemClusterTypes();
		String clusterTypeLine = "";
		for (KeyValueDTO clusterTypeItem : clusterTypes) {
			clusterTypeLine += "['" + clusterTypeItem.getId().toString() + "','" + clusterTypeItem.getName() + "'],"; 
		}
		clusterTypeLine = "var clusterTypeData = [" + clusterTypeLine.substring(0, clusterTypeLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += clusterTypeLine + "\n";
		
		KeyValueType2DTO[] clusterCodes = dataInput.getItSystemClusterCodes();
		String clusterCodeLine = "";
		for (KeyValueType2DTO clusterCodeItem : clusterCodes) {
			clusterCodeLine += "['" + clusterCodeItem.getId().toString() + "','" + clusterCodeItem.getName() + "','" + clusterCodeItem.getType() + "'],"; 
		}
		clusterCodeLine = "var clusterCodeData = [" + clusterCodeLine.substring(0, clusterCodeLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += clusterCodeLine + "\n";
		
		KeyValueTypeDTO[] osGroups = dataInput.getItSystemOsGroups();
		String osGroupLine = "";
		for (KeyValueTypeDTO osGroupItem : osGroups) {
			osGroupLine += "['" + osGroupItem.getId().toString() + "','" + osGroupItem.getName() + "','" + osGroupItem.getType() + "'],"; 
		}
		osGroupLine = "var osGroupData = [" + osGroupLine.substring(0, osGroupLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += osGroupLine + "\n";
		
		OsTypeDTO[] osTypes = dataInput.getItSystemOsTypes();
		String osTypeLine = "";
		for (OsTypeDTO osTypeItem : osTypes) {
			osTypeLine += "['" + osTypeItem.getOsTypeId().toString() + "','" + osTypeItem.getOsName() + "','" + osTypeItem.getOsGroup() + "','" + osTypeItem.getItSystemType().toString() + "','" + osTypeItem.getLicenseScanning().toString() + "'],"; 
		}
		osTypeLine = "var osTypeData = [" + osTypeLine.substring(0, osTypeLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += osTypeLine + "\n";
		
		OsNameDTO[] osNames = dataInput.getItSystemOsNames();
		String osNameLine = "";
		for (OsNameDTO osNameItem : osNames) {
			osNameLine += "['" + osNameItem.getosNameId().toString() + "','" + osNameItem.getOsName() + "','" + osNameItem.getOsTypeId().toString() + "','" + osNameItem.getItSystemType().toString() + "'],"; 
		}
		osNameLine = "var osNameData = [" + osNameLine.substring(0, osNameLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += osNameLine + "\n";
		
		GapClassDTO[] gapClasses = itsecMasnDataInput.getGapClassList();
		String gapClassLine = "";
		for (GapClassDTO gapClassItem : gapClasses) {
			gapClassLine += "['" + gapClassItem.getGapPriority() + "','" + gapClassItem.getGapClassTextDE() + "','" + gapClassItem.getGapClassTextEN() + "'],";
		}
		gapClassLine = "var gapClassData = [" + gapClassLine.substring(0, gapClassLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += gapClassLine + "\n"; 
		
		ReferenzDTO[] references = dataInput.getTemplateCIs();
		String referenceLine = "";
		for (ReferenzDTO referenceItem : references) {
			referenceLine += "['" + referenceItem.getId().toString() + "','" + referenceItem.getName() +"','" + referenceItem.getTableId().toString() +  "','" + referenceItem.getItsetId().toString() + "','" + referenceItem.getItsecGroupId().toString() + "','" + (referenceItem.getDelTimestamp()==null?"":referenceItem.getDelTimestamp().toString()) + "','" + referenceItem.getCiKat1().toString() + "'],";
		}
		referenceLine = "var templateData = [" + referenceLine.substring(0, referenceLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += referenceLine + "\n";
		
		InterfacesDTO[] interfaces = interfacesDataInput.findAllImportInterfaces();
		String interfacesLine = "";
		for (InterfacesDTO interfaceItem : interfaces) {
			interfacesLine += "['" + interfaceItem.getInterfacesId().toString() + "','" + interfaceItem.getInterfaceToken() + "'],";
		}
		interfacesLine = "var interfacesData = [" + interfacesLine.substring(0, interfacesLine.length()-1) + "];";
		output += "/*" + (System.currentTimeMillis() - ts) + "*/";
		ts = System.currentTimeMillis();
		output += interfacesLine + "\n";
		
		return output;
	}
	

	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
		 System.out.println("total JVM Memory-------"+Runtime.getRuntime().totalMemory());
		 System.out.println("total JVM Free memory-------"+Runtime.getRuntime().freeMemory());
		 Runtime.getRuntime().gc();
		 System.out.println("total JVM Free memory after GC-------"+Runtime.getRuntime().freeMemory());
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String version = "?" + AirKonstanten.AIR_VERSION;
		////changes for CR Kerboros Implementation C0000275214
		String cwid="-1";
		String logout=(String)req.getSession().getAttribute("logout");
		System.out.println("request.getSession().getAttribute(logout)"+logout);
		if(logout != null && ("1").equals(logout)){
			cwid="-1";
			req.getSession().setAttribute("logout","0");
		}else{
			//cwid="EMRIA";
			//cwid=req.getUserPrincipal().getName();
			cwid=req.getRemoteUser();
		}
		////changes end for CR Kerboros Implementation C0000275214
		StringBuffer html = new StringBuffer();
		
		String userAgent = req.getHeader("user-agent");
		boolean isIE = userAgent.contains("MSIE");

		res.addHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		if(isIE) {
			html.append("<!DOCTYPE html>");
	//			===================================================================================================================
		} else {
			html.append("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n");//<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">	<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">
		
		}
		
		html.
		append("<html>\n").
			append("<head>\n").
				append("<meta name='description' content='BBS Application Infrastructure Repository'>\n").
				append("<meta name='keywords' content='BBS, AIR, Application Infrastructure Repository'>\n").
				append("<meta name='author' content='BBS-IAO-SBO-IPS'>\n").
				append("<meta http-equiv='expires' content='0'>\n").//content='0' 86400
				append("<meta http-equiv='pragma' content='no-cache'>\n").
				append("<meta http-equiv='cache-control' content='no-cache'>\n").
				append("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>\n").
				
	//			===================================================================================================================
				
				append("<title>BBS Application Infrastructure Repository</title>\n").
				append("<link rel='shortcut icon' type='image/x-icon' href='data:image/x-icon;base64,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'>\n").
				append("<link rel='stylesheet' id='standardTheme' type='text/css' href='javascript/lib/extjs/resources/css/ext-all-air.css'>\n").
				append("<link rel='stylesheet' type='text/css' href='javascript/lib/extjs/ux/css/air.css").append(version).append("'>\n").
				append("<link rel='stylesheet' type='text/css' href='javascript/lib/extjs/ux/css/rowactions.css").append(version).append("'>\n").
				append("<link rel='stylesheet' type='text/css' href='javascript/lib/extjs/ux/css/Ext.ux.grid.RowActions.css").append(version).append("'>\n").
				append("</head>\n").
				append("<body style='background-color: #D3E1F1;'>\n");
	
			if(isIE) {
				html.
				append("<form id='history-form' class='x-hidden'>\n").
					append("<input type='hidden' id='x-history-field'/>\n").
					append("<iframe id='x-history-frame'></iframe>\n").
			    append("</form>");
			}
				System.out.println("-----> AIR running on " + InetAddress.getLocalHost().getHostName() + ".");
				html.append("<!--" + InetAddress.getLocalHost().getHostName() + "-->");
		if (AirKonstanten.SERVERNAME_PROD.equals(InetAddress.getLocalHost()
				.getHostName())
				|| AirKonstanten.SERVERNAME_QA.equals(InetAddress
						.getLocalHost().getHostName())
				|| AirKonstanten.SERVERNAME_BMS_QA.equals(InetAddress
						.getLocalHost().getHostName())
				|| AirKonstanten.TRANSBASE_PROD_HOST.equals(InetAddress
						.getLocalHost().getHostName())) {
			html.append(
					"<script type='text/javascript' src='javascript/lib/extjs/adapter/ext/ext-base.js'></script>\n")
					.append("<script type='text/javascript' src='javascript/lib/extjs/ext-all.js'></script>\n");
		} else {
					html.append("<script type='text/javascript' src='javascript/lib/extjs/adapter/ext/ext-base-debug.js'></script>\n").
				    append("<script type='text/javascript' src='javascript/lib/extjs/ext-all-debug.js'></script>\n");
				}
					
	//			===================================================================================================================

			html.append(compressJSFile("javascript/lib/extjs/ux/Ext.ux.grid.RowActions.js", version)).
				
				
				append(compressJSFile("javascript/lib/extjs/ux/searchfield/SearchField.js", version)).
				append(compressJSFile("javascript/lib/extjs/ux/Soap1/WsdlContainer.js", version)).
				append(compressJSFile("javascript/lib/extjs/ux/Soap1/SoapProxy.js", version)).
				append(compressJSFile("javascript/lib/extjs/ux/Soap1/SoapReader.js", version)).
				
	//			append(compressJSFile("javascript/lib/jquery/1.7.1/jquery.min.js", version)).
	//			append(compressJSFile("javascript/lib/jquery/jquery.corner.js", version)).
				append(compressJSFile("javascript/lib/mootools/mootools-core-1.4.5-full-compat.js", version)).
					
	//			===================================================================================================================
				append("<script>var app_version 		='" + AirKonstanten.AIR_VERSION + "'</script>").
				append("<script>" + getDataStores() + "</script>\n").
				append("<script>" + getXMLFile("conf/lang/german_tooltips.xml").toString() + "</script>\n").
				append("<script>" + getXMLFile("conf/lang/english_tooltips.xml").toString() + "</script>\n").
				append("<script>" + getXMLFile("conf/lang/german_help.xml").toString() + "</script>\n").
				append("<script>" + getXMLFile("conf/lang/german.xml").toString() + "</script>\n").
				append("<script>" + getXMLFile("conf/lang/english.xml").toString() + "</script>\n").
				append("<script>" + getXMLFile("conf/ConnectionProperties.xml").toString() + "</script>\n").
				append("<script>" + getXMLFile("conf/AttributeProperties.xml").toString() + "</script>\n").
				append(compressJSFile("javascript/common/AirConstants.js", version)).
				append(compressJSFile("javascript/common/Util.js", version)).
				append(compressJSFile("javascript/common/data/AirStoreLoader.js", version)).
				append(compressJSFile("javascript/common/data/AirStoreManager.js", version)).
				append(compressJSFile("javascript/common/data/CiLocationRecord.js", version)).
				 
				append(compressJSFile("javascript/common/component/picker/AirPickerManager.js", version)).
				append(compressJSFile("javascript/common/component/picker/AirPersonPicker.js", version)).
				append(compressJSFile("javascript/common/component/picker/AirGroupPicker.js", version)).
				append(compressJSFile("javascript/common/component/picker/AirRemovePicker.js", version)).
				append(compressJSFile("javascript/common/component/picker/AirRecordPicker.js", version)).
				
				append(compressJSFile("javascript/common/component/AppLabelTag.js", version)).
				append(compressJSFile("javascript/common/component/CommandLink.js", version)).
				append(compressJSFile("javascript/common/component/DynamicWindow.js", version)).
				append(compressJSFile("javascript/common/component/AirView.js", version)).
				append(compressJSFile("javascript/common/component/SearchField.js", version)).
				append(compressJSFile("javascript/common/component/FilterComboBox.js", version)).
				append(compressJSFile("javascript/common/component/RowExpander.js", version)).
	
				append(compressJSFile("javascript/common/AirWindowFactory.js", version)).
				append(compressJSFile("javascript/common/AirAclManager.js", version)).
				append(compressJSFile("javascript/common/AirTaskManager.js", version)).
				append(compressJSFile("javascript/common/AirApplicationManager.js", version)).
				append(compressJSFile("javascript/common/AirPagingToolbar.js", version)).
				append(compressJSFile("javascript/common/AirStoreFactory.js", version)).
				append(compressJSFile("javascript/common/AirOverrides.js", version)).
				append(compressJSFile("javascript/common/AirUiFactory.js", version)).
				append(compressJSFile("javascript/common/AirConfigFactory.js", version)).
				append(compressJSFile("javascript/common/AirHistoryManager.js", version)).
				append(compressJSFile("javascript/common/AirCallbackManager.js", version)).
				append(compressJSFile("javascript/common/AirBusinessRules.js", version)).
				
				append(compressJSFile("javascript/search/CiAdvancedSearchView.js", version)).
				append(compressJSFile("javascript/search/CiSearchView.js", version)).
				append(compressJSFile("javascript/search/CiResultView.js", version)).
				append(compressJSFile("javascript/search/CiResultGrid.js", version)).
				append(compressJSFile("javascript/search/CiStandardSearchView.js", version)).
				append(compressJSFile("javascript/search/CiOuSearchView.js", version)).
				append(compressJSFile("javascript/search/DwhEntityGrid.js", version)).
				append(compressJSFile("javascript/massUpdate/MassUpdateSerachCITemplateWindow.js", version)).

				
				append(compressJSFile("javascript/myplace/MyPlaceTabView.js", version)).
				append(compressJSFile("javascript/myplace/MyPlaceView.js", version)).
				append(compressJSFile("javascript/myplace/MyPlaceHomeView.js", version)).
								
				append(compressJSFile("javascript/ciEdit/CiEditView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiDetailsView.js", version)).
				append(compressJSFile("javascript/ciDetails/specifics/CiSpecificsView.js", version)).
				append(compressJSFile("javascript/ciDetails/specifics/CiSpecificsAnwendungView.js", version)).
				append(compressJSFile("javascript/ciDetails/specifics/CiSpecificsLocationItemView.js", version)).//CiSpecificsTerrainView.js
				append(compressJSFile("javascript/ciDetails/specifics/CiSpecificsItItemView.js", version)).
				append(compressJSFile("javascript/ciDetails/specifics/CiSpecificsServiceView.js", version)).
				append(compressJSFile("javascript/ciDetails/specifics/CiSpecificsBusinessApplication.js", version)).
				
				append(compressJSFile("javascript/ciDetails/CiContactsView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiAgreementsView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiProtectionView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiComplianceView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiLicenseView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiSpecialAttributesView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiNetworkView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiConnectionsView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiSupportStuffView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiHistoryView.js", version)).
				append(compressJSFile("javascript/ciDetails/ComplianceControlsWindow.js", version)).
				append(compressJSFile("javascript/ciDetails/DirectLinkCITemplateWindow.js", version)).
				append(compressJSFile("javascript/ciDetails/DirectLinkageCIsAnswerWindow.js", version)).
				append(compressJSFile("javascript/ciDetails/ComplianceLinkView.js", version)).
				append(compressJSFile("javascript/ciDetails/CiDetailsCommon.js", version)).
				
				append(compressJSFile("javascript/ciCreate/CiCopyFromDetailView.js", version)).
				append(compressJSFile("javascript/ciCreate/CiCopyFromView.js", version)).
				append(compressJSFile("javascript/ciCreate/CiCreateView.js", version)).
				append(compressJSFile("javascript/ciCreate/CiDeleteView.js", version)).
				append(compressJSFile("javascript/ciCreate/wizard/CiCreateInfoView.js", version)).
				append(compressJSFile("javascript/ciCreate/wizard/CiCreateWizardView.js", version)).
				append(compressJSFile("javascript/ciCreate/wizard/CiCreateWizardP1.js", version)).
				append(compressJSFile("javascript/ciCreate/wizard/CiCreateAppMandatoryView.js", version)).
				append(compressJSFile("javascript/ciCreate/wizard/CiCreateWizardP2.js", version)).
				append(compressJSFile("javascript/ciCreate/wizard/CiCreateAppRequiredView.js", version)).
	
				append(compressJSFile("javascript/core/CiTitleView.js", version)).
				append(compressJSFile("javascript/core/CiInfoView.js", version)).
				append(compressJSFile("javascript/core/CiCenterView.js", version)).
				append(compressJSFile("javascript/core/CiNavigationView.js", version)).
				append(compressJSFile("javascript/core/AirMainPanel.js", version)).
				append(compressJSFile("javascript/core/AirViewport.js", version)).
				append(compressJSFile("javascript/core/AirLoginWindow.js", version)).
				append(compressJSFile("javascript/core/AirBootstrap.js", version)).
				append(compressJSFile("javascript/core/Main.js", version)).
				
				append(compressJSFile("javascript/massUpdate/MassUpdateAttributeValueTransferWindow.js", version)).
				append(compressJSFile("javascript/massUpdate/MassUpdateComplianceCotrolSelectionWindow.js",version)).
				append(compressJSFile("javascript/massUpdate/MassUpdateSelectAttributeValueWindow.js",version)).
				append(compressJSFile("javascript/ciDetails/CiSpecialAttributesView.js", version)).


                //asset management
				append(compressJSFile("javascript/assetManagement/CiAssetManagementView.js", version)).
				append(compressJSFile("javascript/assetManagement/CiNewSoftwareAsset.js", version)).
				append(compressJSFile("javascript/assetManagement/search/CiAssetManageSearchView.js", version)).
				append(compressJSFile("javascript/assetManagement/search/CiAssetResultGrid.js", version)).				
				append(compressJSFile("javascript/assetManagement/search/CiAssetResultView.js", version)).
				append(compressJSFile("javascript/assetManagement/CiNewAssetView.js", version)).
				append(compressJSFile("javascript/assetManagement/details/CiTopPanel.js", version)).
				append(compressJSFile("javascript/assetManagement/details/CiProduct.js", version)).
				append(compressJSFile("javascript/assetManagement/details/CiContact.js", version)).
				append(compressJSFile("javascript/assetManagement/details/CiLocation.js", version)).
				append(compressJSFile("javascript/assetManagement/details/CiBusiness.js", version)).
				append(compressJSFile("javascript/assetManagement/details/CiTechnics.js", version)).
				append(compressJSFile("javascript/assetManagement/details/CiSoftwareProduct.js", version)).
				append(compressJSFile("javascript/assetManagement/CiNewHardwareAsset.js", version)).
				append(compressJSFile("javascript/assetManagement/CiHardwareInfo.js", version)).
				
				
	//			===================================================================================================================
				
				append(compressJSFile("conf/config.js", version)).
				append("<input type='hidden' id='serverCWID' name='serverCWID' value="+cwid+">").
				
			append("</body>\n").
		append("</html>");
		//ETSZF
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
	
	private String getVersion(String configFilePath) throws IOException {
		BufferedReader reader = new BufferedReader(new FileReader(new File(configFilePath)));
		
		String line = null;
		while((line = reader.readLine()) != null) {
			if(line.contains(AirKonstanten.VERSION_PARAM)) {
				line = line.split(AirKonstanten.EQUAL)[1].trim();
				break;
			}
		}
				
		line = AirKonstanten.QUESTION_MARK.concat(line.replace("'", "").replace(";", ""));

		return line;
	}
}