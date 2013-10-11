package com.bayerbbs.bov;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.cfg.AnnotationConfiguration;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;

public class BovApplicationServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	private static final String TRANSBASE_PROD_HOST = "byob01.bayer-ag.com";
	private String redirectPath = new AnnotationConfiguration().configure().getProperty("hibernate.connection.url").contains(TRANSBASE_PROD_HOST) ? "/AIR/P" : "/AIR/Q";

	/**
	 * 
	 */
	public BovApplicationServlet() {
		super();


	}
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}
	
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String bovAction = (String) req.getParameter("bovAction");
		Boolean denyOwnership = (bovAction.equals("denial") ? Boolean.TRUE : Boolean.FALSE);
		Boolean retireApplication = (bovAction.equals("retire") ? Boolean.TRUE : Boolean.FALSE);
		String strApplicationId = (String) req.getParameter("applicationId");
		String cwidSteward = (String) req.getParameter("cwidSteward");
	
		String redirect = redirectPath.concat(String.format("?id=APP-%s#", strApplicationId));
		if (denyOwnership) {
			doDenialOfOwnership(Long.parseLong(strApplicationId), cwidSteward);
			res.sendRedirect(redirect);
			return;
		}
		if (retireApplication) {
			doInitiateRetirement(Long.parseLong(strApplicationId), cwidSteward, req.getParameter("bovReason").toString());
			res.sendRedirect(redirect);
			return;
		}
		
		String strDrlevel = (String) req.getParameter("drlevel");
		String strSeveritylevel = (String) req.getParameter("severitylevel");
		
		String strGxpRelevant = (String) req.getParameter("gxprelevant");
		String strIcsRelevant = (String) req.getParameter("icsrelevant");
		String strItsecRelevant = (String) req.getParameter("itsecrelevant");
		
		String strInformationClassification = (String) req.getParameter("informationclassification");
		String strDataPrivacyPersonalData = (String) req.getParameter("personaldata");
		String strDataPrivacyBetweenCountries = (String) req.getParameter("betweencountries");
		String strApplicationDescription = (String) req.getParameter("applicationdescription");
		
		long applicationId = Long.parseLong(strApplicationId);
		
		
		BovApplicationInputDTO dto = new BovApplicationInputDTO();
		if (null != strDrlevel) {
			dto.setDrLevel(Long.parseLong(strDrlevel));	
		}
		if (null != strSeveritylevel) {
			dto.setSeverityLevel(Long.parseLong(strSeveritylevel));	
		}
		if (null != strGxpRelevant) {
			dto.setGxpRelevant(strGxpRelevant);
		}
		if (null != strIcsRelevant) {
			dto.setIcsRelevant(strIcsRelevant);
		}
		
		if (null != strItsecRelevant) dto.setItsecRelevant(strItsecRelevant);
		
		if (null != strInformationClassification) {
			dto.setInformationClassification(strInformationClassification);
		}
		if (null != strDataPrivacyPersonalData) dto.setDataPrivacyPersonalData(strDataPrivacyPersonalData);
		if (null != strDataPrivacyBetweenCountries) dto.setDataPrivacyBetweenCountries(strDataPrivacyBetweenCountries);
		
		
		if (null != strApplicationDescription) dto.setApplicationDescription(strApplicationDescription);
		
		if (null != cwidSteward && !"null".equals(cwidSteward)) {
			// was dann ??? 
		}
		else {
			
		}

		
		boolean result = BovApplicationHbn.saveBovApplication(cwidSteward, applicationId, dto);
		
		if (result == true) {
			res.getWriter().write("data saved");
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

	private void doDenialOfOwnership(Long applicationId, String requestor) {
		Application app = AnwendungHbn.findApplicationById(applicationId);
		String subject = String.format("Ownership of Application '%s' rejected!", app.getApplicationName());
 		String body = String.format("Ownership rejected by: %s", getCwidName(requestor));
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
