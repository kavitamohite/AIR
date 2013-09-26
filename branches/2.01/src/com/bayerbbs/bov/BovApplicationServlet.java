package com.bayerbbs.bov;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BovApplicationServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		doPost(req, res);
	}
	
	@SuppressWarnings("unused")
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String denyOwnership = (String) req.getParameter("denial");
		String retireApplication = (String) req.getParameter("retire");
		String delegateVerification = (String) req.getParameter("delegate");
		
		String strApplicationId = (String) req.getParameter("applicationId");
		String cwidSteward = (String) req.getParameter("cwidSteward");
		
		String strDrlevel = (String) req.getParameter("drlevel");
		String strSeveritylevel = (String) req.getParameter("severitylevel");
		
		String strGxpRelevant = (String) req.getParameter("gxprelevant");
		String strIcsRelevant = (String) req.getParameter("icsrelevant");
		String strItsecRelevant = (String) req.getParameter("itsecrelevant");
		
		String strInformationClassification = (String) req.getParameter("informationclassification");
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
	

}
