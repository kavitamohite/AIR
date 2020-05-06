package com.bayerbbs.bov;

import java.io.IOException;
import java.net.InetAddress;
import java.security.Principal;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.cfg.AnnotationConfiguration;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;

public class BovApplicationServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	private AnnotationConfiguration config;
	private InetAddress iAddress;
	private String hostName = "";
	
	private String redirectPath = "";

	/**
	 * 
	 */
	public BovApplicationServlet() {
		super();
		try {
			iAddress = InetAddress.getLocalHost();
			hostName = iAddress.getHostName();
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} 
		System.out.println("Running on Host: " + hostName);
	    if (hostName.equals(AirKonstanten.SERVERNAME_PROD)) {
	    	config = new AnnotationConfiguration().configure("hibernate.prod.cfg.xml");
	    } else {
	    	config = new AnnotationConfiguration().configure("hibernate.qa.cfg.xml");
	    }
	    redirectPath = config.getProperty("hibernate.connection.url").contains(AirKonstanten.TRANSBASE_PROD_HOST) ? "/AIR/P" : "/AIR/Q";
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String bovAction = (String) req.getParameter("bovAction");
		Boolean denyOwnership = (bovAction.equals("denial") ? Boolean.TRUE : Boolean.FALSE);
		Boolean retireApplication = (bovAction.equals("retire") ? Boolean.TRUE : Boolean.FALSE);
		String strApplicationId = (String) req.getParameter("applicationId");
		long applicationId = Long.parseLong(strApplicationId);
		String cwidRequestor = (String) req.getParameter("cwidRequestor");
		if ("".equals(cwidRequestor)) cwidRequestor = req.getRemoteUser();
		if (null == cwidRequestor) {
			Principal user = req.getUserPrincipal();
			if (null != user) cwidRequestor = user.getName();
		}
	
		String redirect = redirectPath.concat(String.format("?id=APP-%s#", strApplicationId));
		BovApplicationInputDTO dto = new BovApplicationInputDTO();
		dto.setProcessed(false);

		if (denyOwnership) {
			doDenialOfOwnership(applicationId, cwidRequestor, req.getParameter("bovReason").toString());
			dto.setOwnershipStatus("reject");
		}
		else { 
			dto.setOwnershipStatus("accept");
			if (retireApplication) { 
				doInitiateRetirement(applicationId, cwidRequestor, req.getParameter("bovReason").toString());
			}
			else {
				dto.setProcessed(true);
				String strDrlevel = (String) req.getParameter("drlevel");
				String strSeveritylevel = (String) req.getParameter("severitylevel");
//				ELERJ GXP
//				String strGxpRelevant = (String) req.getParameter("gxprelevant");
				/*ELERJ ICS*/
//				String strIcsRelevant = (String) req.getParameter("icsrelevant");
				String strItsecRelevant = (String) req.getParameter("itsecrelevant");
				
				String strInformationClassification = (String) req.getParameter("informationclassification");
				String strDataPrivacyPersonalData = (String) req.getParameter("personaldata");
				String strDataPrivacyBetweenCountries = (String) req.getParameter("betweencountries");
				String strApplicationDescription = (String) req.getParameter("applicationdescription");		
			
			
				if (null != strDrlevel) {
					dto.setDrLevel(Long.parseLong(strDrlevel));	
				}
				if (null != strSeveritylevel) {
					dto.setSeverityLevel(Long.parseLong(strSeveritylevel));	
				}
//				ELERJ GXP
				/*if (null != strGxpRelevant) {
					dto.setGxpRelevant(strGxpRelevant);
				}*/
				/*ELERJ ICS*/
			/*	if (null != strIcsRelevant) {
					dto.setIcsRelevant(strIcsRelevant);
				}
			*/	
				if (null != strItsecRelevant) dto.setItsecRelevant(strItsecRelevant);
				
				if (null != strInformationClassification) {
					dto.setInformationClassification(strInformationClassification);
				}
				if (null != strDataPrivacyPersonalData) dto.setDataPrivacyPersonalData(strDataPrivacyPersonalData);
				if (null != strDataPrivacyBetweenCountries) dto.setDataPrivacyBetweenCountries(strDataPrivacyBetweenCountries);
				
				
				if (null != strApplicationDescription) dto.setApplicationDescription(strApplicationDescription);
			}
		}
		
		if (null != cwidRequestor && !"null".equals(cwidRequestor)) {
			// was dann ??? 
		}
		else {
			
		}

		
		boolean result = BovApplicationHbn.saveBovApplication(cwidRequestor, applicationId, dto);
		
		if (result == true) {
			res.sendRedirect(redirect);		
		}
		else {
			res.getWriter().write("!!! Could not save data - please check the data !!!");
		}
	}

	private void doInitiateRetirement(Long applicationId, String requestor, String reason) {
		Application app = AnwendungHbn.findApplicationById(applicationId);
		String subject = String.format("Retirement of Application ''%s'' requested!", app.getApplicationName());
 		String body = String.format("Retirement requested by: %s\n\nReason given:\n%s", getCwidName(requestor), reason);
		ApplReposHbn.sendMail(getMail(app.getResponsible()), getMail(requestor), subject, body, "BOV");
		return;
	}

	private void doDenialOfOwnership(Long applicationId, String requestor, String newOwner) {
		Application app = AnwendungHbn.findApplicationById(applicationId);
		String subject = String.format("Ownership of Application '%s' rejected!", app.getApplicationName());
 		String body = String.format("Ownership rejected by: %s\nNew Onwer nominated: $s", getCwidName(requestor), newOwner);
		ApplReposHbn.sendMail(getMail(app.getResponsible()), getMail(requestor), subject, body, "BOV");
		return;
	}
	private String getCwidName(String cwid) {
		String result = "";
		if (null != cwid) {
			StringBuffer sb = new StringBuffer();

			List<PersonsDTO> list = PersonsHbn.findPersonByCWID(cwid);
			if (null != list && 1 == list.size()) {
				sb.append(list.get(0).getDisplayNameFull());
			}
			
			if (0 == sb.length()) {
				sb.append(cwid);
			}
			
			result = sb.toString();
		}
		return result;
	}
	private String getMail(String cwid){
		String sendTo = null;
		PersonsDTO personDTO = null;

		if (null != cwid) {
			List<PersonsDTO> listPersonsDTO = PersonsHbn.findPersonByCWID(cwid);
			if (1 == listPersonsDTO.size()) {
				personDTO = listPersonsDTO.get(0);
				sendTo = personDTO.getMail();
			}
		}
		return sendTo;
	}

}
