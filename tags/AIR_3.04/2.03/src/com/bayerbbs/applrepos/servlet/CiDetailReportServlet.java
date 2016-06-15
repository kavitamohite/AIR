package com.bayerbbs.applrepos.servlet;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.hibernate.HibernateException;
import org.hibernate.Session;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.Building;
import com.bayerbbs.applrepos.domain.BuildingArea;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.domain.Room;
import com.bayerbbs.applrepos.domain.Schrank;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.domain.Terrain;
import com.bayerbbs.applrepos.dto.ApplicationDTO;
import com.bayerbbs.applrepos.dto.ConfidentialityDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.ConfidentialityHbn;
import com.bayerbbs.applrepos.hibernate.HibernateUtil;
import com.bayerbbs.applrepos.hibernate.ItSecGroupHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;
import com.bayerbbs.applrepos.hibernate.SchrankHbn;
import com.bayerbbs.applrepos.hibernate.ServiceContractHbn;
import com.bayerbbs.applrepos.hibernate.SlaHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;
import com.bayerbbs.applrepos.hibernate.TerrainHbn;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.HeaderFooter;
import com.lowagie.text.PageSize;
import com.lowagie.text.Phrase;
import com.lowagie.text.html.simpleparser.HTMLWorker;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

public class CiDetailReportServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2354728653868583491L;

	private static final String COMPLIANCE_DETAIL = "SELECT   TO_CHAR(MAS.Katalog_Id, 'fm00') || '.' || TO_CHAR(MAS.Massnahme_Nr,'fm000') AS Ident,"
			+ "MTX.Massnahme_Titel,STA.Massnahme_Gstoolid,NVL(MAS.Relevance_Ics, 0) AS Relevance_Ics,"
			+ "NVL(MAS.Relevance_Ics, 0) AS Relevance_Ics,"
			+ "DECODE(MTX.Langu, 'de', STW.Status_Wert, STW.Status_Wert_En) AS Status_Wert,"
			+ "REF.Status_Kommentar,REF.Gap,"
			+ "NVL(pck_SISec.Get_UName(REF.Gap_Responsible), REF.Gap_Responsible) AS Gap_Responsible,"
			+ "REF.Gap_Measure,REF.Gap_End_Date,"
			+ "DECODE(MTX.Langu, 'de', GAP.Gap_Class_Text_De, GAP.Gap_Class_Text_En) AS Gap_Priority,"
			+ "MAS.Link,DECODE(REF.Risk_Analysis_As_FreeText, -1, REF.Expense_T, REF.Expense) AS Expense,"
			+ "DECODE(REF.Risk_Analysis_As_FreeText, -1, REF.Prob_Occurence_T, REF.Prob_Occurence) AS Prob_Occurence,"
			+ "DECODE(REF.Risk_Analysis_As_FreeText, -1, REF.Damage_T, REF.Damage) AS Damage,"
			+ "DECODE(REF.Risk_Analysis_As_FreeText, -1, REF.Mitigation_Potential_T, TO_CHAR(REF.Mitigation_Potential, '0D99')) AS Mitigation_Potential,"
			+ "NVL(pck_SISec.Get_UName(REF.Signee), REF.Signee) AS Signee,"
			+ "REF.Gap_Class_Approved,"
			+ "NVL(REF.Currency, 'EUR') AS Currency "
			+ "FROM TABLE(pck_SISec.FT_Compliance(?, ?)) STA "
			+ "INNER JOIN ITSEC_MASSN_STATUS REF ON REF.Itsec_Massn_St_Id=pck_SISec.EffControlId(STA.Itsec_Massn_St_Id)"
			+ "INNER JOIN ITSEC_MASSN MAS ON STA.Massnahme_Gstoolid=MAS.Massnahme_Id "
			+ "INNER JOIN ITSEC_MASSN_STWERT STW ON STW.Itsec_Massn_Wertid=NVL(pck_SISec.EffStatusId(STA.Itsec_Massn_St_Id), 5)"
			+ "LEFT OUTER JOIN ITSEC_MASSNT MTX ON STA.Massnahme_Gstoolid=MTX.Massnahme_Id "
			+ "LEFT OUTER JOIN GAP_CLASS GAP ON REF.Gap_Priority=GAP.Gap_Priority "
			+ "WHERE    MTX.Langu = ?"
			+ " ORDER BY MAS.Katalog_Id, MAS.Massnahme_Nr";

	private static final String STMT_SELECT_MASSN_BESCHREIBUNG = "SELECT   TXT.Beschreibung FROM BBS_Prod.DBO.MB_MASSN_TXT TXT"
			+ " INNER JOIN BBS_Prod.DBO.MB_MASSN MAS ON TXT.Mas_Id=MAS.Mas_Id AND TXT.Mas_Imp_Id=MAS.Mas_Imp_Id"
			+ " WHERE    MAS.Mas_Imp_Id IN (-1, 1)"
			+ " AND      MAS.Loesch_Datum IS NULL"
			+ " AND      MAS.Cm_Sta_Id IN (1, 5)"
			+ " AND      MAS.Mas_Id = ?"
			+ " AND      TXT.Spr_Id = ?";

	private static final String PARAM_VALUE_DE = "de";
	private static final String PARAM_VALUE_EN = "en";

	private static final int LANG_GSTOOL_DE = 1;
	private static final int LANG_GSTOOL_EN = 2;
	private static final String SQL_RESULT_BESCHREIBUNG = "BESCHREIBUNG";
	private static HashMap<Long, String> confidentialityList= new HashMap<Long, String>();
	private String ciName = "";
	private String HeaderCIName = "";
	private Integer headerpageNo = 0;
	private Integer totalPageNo = 2;
	private String footerPreparedBy = "";
	private String footerCreatedDate = "";

	// FOr production and QA /app/sisnet/catalina/temp/Compliance_Statements_

	private String fileName = "Compliance_Statements_";
    private String filePath="/app/sisnet/catalina/temp/";
	//private String filePath = "m:\\temp\\";

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		doPost(req, res);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {

		String ciId = req.getParameter("ciId");
		String tableId = req.getParameter("tableId");
		String language = req.getParameter("lang");
		String cwid = req.getParameter("cwid");
		String lastName = req.getParameter("lastName");
		String firstName = req.getParameter("firstName");
		this.fileName="Compliance_Statements_";
		footerPreparedBy = "Prepared By " + lastName + ", " + firstName + " ("
				+ cwid + ")" + ")";
		Date date1 = new Date();
		SimpleDateFormat ft = new SimpleDateFormat("dd-MMM-yyyy");
		footerCreatedDate = ft.format(date1);

		List<ComplianceDetail> complianceDetails = getComplianceDeatils(
				Long.valueOf(tableId), Long.valueOf(ciId), language);
		List<String[]> CIData = getCiData(ciId, tableId);
		this.ciName = ciName.replaceAll(" {1,10}", "");
		this.fileName = this.fileName + ciName + ".pdf";

		totalPageNo = 2 + complianceDetails.size();

		Document document = new Document(PageSize.LETTER);
		try {
			PdfWriter.getInstance(document, new FileOutputStream(filePath
					+ fileName));
			document.open();
			HeaderFooter footer = new HeaderFooter(
					new Phrase(
							footerPreparedBy
									+ "                                                                      "
									+ footerCreatedDate), false);
			footer.setBorder(0);
			document.setFooter(footer);
			HeaderFooter header = new HeaderFooter(new Phrase(HeaderCIName),false);
			header.setBorder(0);
			document.setHeader(header);
			document.add(new Phrase(HeaderCIName));
			document.add(new Phrase(100, "\n Compliance Statements", new Font(
					BaseFont.createFont(FontFactory.HELVETICA_BOLD, "", true),
					25)));
			document.add(new Phrase(60,
					"\n relevant for GR 1435 / ISO 27001 / ICS", new Font(
							BaseFont.createFont(FontFactory.HELVETICA_BOLD, "",
									true), 25)));

			document.newPage();
			PdfPTable pdftable = new PdfPTable(2);
			pdftable.setTotalWidth(500);
			pdftable.setWidths(new float[] { 1, 1 });

			// Add multiple rows with random facts about Belgium
			for (String[] data : CIData) {
				pdftable.addCell(data[0]);
				pdftable.addCell(data[1]);

			}
			document.add(pdftable);
			document.newPage();

			writeComplianceDetail(complianceDetails, document, language);

		} catch (Exception e) {
			// TODO: handle exception
		}

		document.close();

		printPdfOutputstream(res);

	}

	private void printPdfOutputstream(HttpServletResponse res)
			throws ServletException, IOException {
		ServletOutputStream stream = null;
		BufferedInputStream buf = null;
		File pdf = new File(filePath + fileName);
		try {
			stream = res.getOutputStream();			
			res.setContentType("application/pdf");			
			res.addHeader("Content-Disposition", "attachment; filename="
					+ fileName);
			res.setContentLength((int) pdf.length());
			FileInputStream input = new FileInputStream(pdf);
			buf = new BufferedInputStream(input);
			int readBytes = 0;

			while ((readBytes = buf.read()) != -1)
				stream.write(readBytes);
		} catch (IOException ioe) {
			throw new ServletException(ioe.getMessage());
		} finally {
			if (stream != null)
				stream.close();
			if (buf != null)
				buf.close();
			  pdf.delete();
		}
	}
	private static String getValue(Long id) {
		if (id == null)
			return " ";
		else if (id == 3)
			return "high";
		else if (id == 2)
			return "medium";
		else if (id == 1)
			return "low";
		else
			return " ";

	}

	private static List<ComplianceDetail> getComplianceDeatils(Long tableId,
			Long apllicationId, String language) {
		List<ComplianceDetail> complianceDetails = new ArrayList<ComplianceDetail>();
		Session session = HibernateUtil
				.getSession(HibernateUtil.DATASOURCE_ID_TRANSBASE);
		ResultSet rset = null;
		try {
			@SuppressWarnings("deprecation")
			PreparedStatement statement = session.connection()
					.prepareStatement(COMPLIANCE_DETAIL);
			statement.setLong(1, tableId);
			statement.setLong(2, apllicationId);
			statement.setString(3, language.toLowerCase());
			rset = statement.executeQuery();
			if (null != rset) {
				while (rset.next()) {
					ComplianceDetail detail = getComplianceDeatilFromResultSet(rset);// ApplicationDTO
					complianceDetails.add(detail);
				}

			}
		} catch (HibernateException e) {

			e.printStackTrace();
		} catch (SQLException e) {

			e.printStackTrace();
		} finally {
			try {
				if (rset != null)
					rset.close();
			} catch (SQLException e) {
			}

			session.close();
		}
		return complianceDetails;
	}

	private static ComplianceDetail getComplianceDeatilFromResultSet(
			ResultSet rset) {
		ComplianceDetail complianceDetail = new ComplianceDetail();
		try {
			complianceDetail.setIndent(rset.getString("IDENT"));
			complianceDetail.setGStoolId(rset.getString("Massnahme_Gstoolid"));
			complianceDetail.setComplianceStatus(rset.getString("STATUS_WERT"));
			complianceDetail.setControl(rset.getString("Massnahme_Titel"));
			complianceDetail.setJustification(rset
					.getString("Status_Kommentar"));
			complianceDetail.setReICSSecurity(rset.getString("Relevance_Ics"));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return complianceDetail;
	}

	private static int getLanguageId(String lang) {
		int langId;
		if (null == lang) {
			lang = PARAM_VALUE_EN;
		}
		if (PARAM_VALUE_DE.equals(lang.toLowerCase()))
			langId = LANG_GSTOOL_DE;
		else
			langId = LANG_GSTOOL_EN;
		return langId;
	}

	private void writeComplianceDetail(
			List<ComplianceDetail> complianceDetails, Document document,
			String Language) throws SQLException, IOException,
			DocumentException {
		Session session = HibernateUtil
				.getSession(HibernateUtil.DATASOURCE_ID_GSTOOL);
		ResultSet rs = null;

		@SuppressWarnings("deprecation")
		PreparedStatement statement = session.connection().prepareStatement(
				STMT_SELECT_MASSN_BESCHREIBUNG);
		statement.setInt(2, getLanguageId(Language));
		for (ComplianceDetail detail : complianceDetails) {
			// document.newPage();
			String description = getDescription(statement,
					detail.getGStoolId(), rs);
			description=description.replaceAll( "<hr>", "<p>******************************************************************************************************************</p>");
			description=description.replaceAll( "<hr />", "<p>******************************************************************************************************************</p>");
			HTMLWorker htmlWorker = new HTMLWorker(document);
			htmlWorker.parse(new StringReader(description));
			PdfPTable pdftable = new PdfPTable(2);
			pdftable.setTotalWidth(500);
			pdftable.setWidths(new float[] { 1, 1 });
			pdftable.setSpacingBefore(30f);

			List<String[]> complianceData = createComplianceDataTable(detail);
			for (String[] data : complianceData) {
				pdftable.addCell(new Phrase(data[0]));
				pdftable.addCell(new Phrase(data[1]));
			}
			document.add(pdftable);
			document.newPage();

		}

	}

	private static String getDescription(PreparedStatement statement,
			String massnahmeGstoolId, ResultSet rs) {
		String description = "";
		try {
			statement.setString(1, massnahmeGstoolId);
			rs = statement.executeQuery();

			if (rs.next()) {
				description = rs.getString(SQL_RESULT_BESCHREIBUNG);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return description;

	}


	private static List<String[]> createComplianceDataTable(
			ComplianceDetail complianceDetail) {
		List<String[]> complianceDatas = new ArrayList<String[]>();
		complianceDatas.add(new String[] { "Ident",
				complianceDetail.getIndent() });
		complianceDatas.add(new String[] { "Control",
				complianceDetail.getControl() });
		if(complianceDetail.getReICSSecurity().equals("-1")){
			complianceDatas.add(new String[] { "Relevance ICS Security Management",
					"Yes" });
		}
		else{
			complianceDatas.add(new String[] { "Relevance ICS Security Management",
			"No" });			
		}

		complianceDatas.add(new String[] { "Justification/Evidence",
				complianceDetail.getJustification() });
		return complianceDatas;
	}

	private List<String[]> getCiData(String ciId, String tableId) {
		List<String[]> CIData = null;
		try {
			if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_APPLICATION) {
				Application application = AnwendungHbn.findApplicationById(Long
						.valueOf(ciId));
				ApplicationDTO dto = new ApplicationDTO();
				if (null != application) {
					dto = AnwendungHbn.getApplicationDetail(Long.valueOf(ciId));
				}
				this.ciName = application.getApplicationName();
				this.HeaderCIName = "Compliance Statements " + ciName;
				CIData = createApplicationData(application, dto);
				return CIData;
			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_POSITION) {
				Schrank schrank = SchrankHbn.findById(Long.valueOf(ciId));
				StringBuilder name = new StringBuilder();
				Room room = schrank.getRoom();
				BuildingArea buildingArea = room.getBuildingArea();
				Building building = buildingArea.getBuilding();
				Terrain terrian = building.getTerrain();
				Standort standort = terrian.getStandort();

				name.append(schrank.getName()).append(" (")
						.append(standort.getStandortName()).append(":")
						.append(terrian.getTerrainName()).append(":")
						.append(building.getBuildingName());
				if (StringUtils.isNotEmpty(building.getAlias())) {
					name.append("(").append(building.getAlias()).append(")");
				}
				name.append(":").append(buildingArea.getBuildingAreaName())
						.append(":").append(room.getRoomName());
				if (StringUtils.isNotEmpty(room.getAlias())) {
					name.append("(").append(building.getAlias()).append(")");
				}
				name.append(")");
				this.HeaderCIName = "Compliance Statements " + name.toString();
				CIData = createPositionData(schrank);
				this.ciName = schrank.getSchrankName();
				return CIData;

			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_ROOM) {
				Room room = RoomHbn.findById(Long.valueOf(ciId));
				StringBuilder name = new StringBuilder();
				BuildingArea buildingArea = room.getBuildingArea();
				Building building = buildingArea.getBuilding();
				Terrain terrian = building.getTerrain();
				Standort standort = terrian.getStandort();
				name.append(room.getRoomName()).append(" (")
						.append(standort.getStandortName()).append(":")
						.append(terrian.getTerrainName()).append(":")
						.append(building.getBuildingName());
				if (StringUtils.isNotEmpty(building.getAlias())) {
					name.append("(").append(building.getAlias()).append(")");
				}
				name.append(":").append(buildingArea.getBuildingAreaName())
						.append(")");
				this.HeaderCIName = "Compliance Statements " + name.toString();
				this.ciName = room.getRoomName();
				CIData = createRoomData(room);
				return CIData;

			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_BUILDING_AREA) {
				BuildingArea buildingArea = BuildingHbn.findById(
						BuildingArea.class, Long.valueOf(ciId));
				StringBuilder name = new StringBuilder();
				Building building = buildingArea.getBuilding();
				Terrain terrian = building.getTerrain();
				Standort standort = terrian.getStandort();
				name.append(buildingArea.getBuildingAreaName()).append(" (")
						.append(standort.getStandortName()).append(":")
						.append(terrian.getTerrainName()).append(":")
						.append(building.getBuildingName());
				if (StringUtils.isNotEmpty(building.getAlias())) {
					name.append("(").append(building.getAlias()).append(")");
				}
				name.append(")");
				this.HeaderCIName = "Compliance Statements " + name.toString();
				CIData = createBuildingAreaData(buildingArea);
				this.ciName = buildingArea.getBuildingAreaName();
				return CIData;

			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_BUILDING) {
				Building building = BuildingHbn.findById(Long.valueOf(ciId));
				StringBuilder name = new StringBuilder();
				Terrain terrian = building.getTerrain();
				Standort standort = terrian.getStandort();
				name.append(building.getBuildingName()).append(" (")
						.append(standort.getStandortName()).append(":")
						.append(terrian.getTerrainName()).append(")");
				this.HeaderCIName = "Compliance Statements " + name.toString();
				CIData = createBuildingData(building);
				this.ciName = building.getBuildingName();
				return CIData;
			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_TERRAIN) {
				Terrain terrain = TerrainHbn.findById(Long.valueOf(ciId));
				StringBuilder name = new StringBuilder();
				Standort standort = terrain.getStandort();
				name.append(terrain.getTerrainName()).append(" (")
						.append(standort.getStandortName()).append(")");
				this.HeaderCIName = "Compliance Statements " + name.toString();
				/*
				 * contentStream.drawString("Compliance Statements " +
				 * name.toString());
				 */
				CIData = createTerrainData(terrain);
				this.ciName = terrain.getTerrainName();
				return CIData;
			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_SITE) {
				Standort standort = StandortHbn.findById(Long.valueOf(ciId));
				this.HeaderCIName = "Compliance Statements "
						+ standort.getStandortName();
				CIData = createStandortData(standort);
				this.ciName = standort.getStandortName();
				return CIData;
			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_IT_SYSTEM) {
				ItSystem itSystem = ItSystemHbn.findById(ItSystem.class,
						Long.valueOf(ciId));
				this.HeaderCIName = "Compliance Statements "
						+ itSystem.getName();
				CIData = createitSystemData(itSystem);
				this.ciName = itSystem.getItSystemName();
			}

		} catch (Exception e) {

		}
		return CIData;

	}

	private List<String[]> createApplicationData(Application application,
			ApplicationDTO dto) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set", dto.getItsetName() });
		long applCat1Id = dto.getApplicationCat1Id().longValue();
		if (AirKonstanten.APPLICATION_CAT1_APPLICATION.longValue() == applCat1Id) {
			CIData.add(new String[] { "Application",
					application.getApplicationName() });
		} else if (AirKonstanten.APPLICATION_CAT1_COMMON_SERVICE.longValue() == applCat1Id) {
			CIData.add(new String[] { "Common Service",
					application.getApplicationName() });
		} else if (AirKonstanten.APPLICATION_CAT1_COMMON_MIDDLEWARE.longValue() == applCat1Id) {
			CIData.add(new String[] { "Middleware",
					application.getApplicationName() });

		} else if (AirKonstanten.APPLICATION_CAT1_COMMON_APPLICATIONPLATFORM
				.longValue() == applCat1Id) {
			CIData.add(new String[] { "Application Platform",
					application.getApplicationName() });
		}

		CIData.add(new String[] { "Primary Person",
				application.getResponsible() });
		CIData.add(new String[] { "Delegate Person/Group",
				dto.getApplicationOwnerDelegate() });
		if (dto.getSeverityLevel() != null) {
			CIData.add(new String[] { "Severity Level", dto.getSeverityLevel() });
		} else {
			CIData.add(new String[] { "Severity Level", " " });
		}
		CIData.add(new String[] { "Business Essential",
				dto.getBusinessEssential() });
		if (dto.getTemplate() == 1)
			CIData.add(new String[] { "Template Object", "Yes" });
		else {
			CIData.add(new String[] { "Template Object", "No" });
		}
		CIData.add(new String[] { "Link", dto.getRefTxt() });
		Long releItsec = dto.getRelevanzItsec();
		Long releICS = dto.getRelevanceICS();
		if (-1 == releItsec) {
			CIData.add(new String[] { "GR1435", "Yes" });
		} else if (0 == releItsec) {
			CIData.add(new String[] { "GR1435", "No" });
		}
		if (-1 == releICS) {
			CIData.add(new String[] { "ICS", "Yes" });
		} else if (0 == releICS) {
			CIData.add(new String[] { "ICS", "No" });
		}
		CIData.add(new String[] { "GxP", dto.getGxpFlagTxt() });
		CIData.add(new String[] { "ITSec Group", dto.getItsecGroup() });
		if (application.getSampleTestDate() != null) {
			CIData.add(new String[] { "Time Testing",
					application.getSampleTestDate().toString() });
		} else {
			CIData.add(new String[] { "Time Testing", " " });
		}
		CIData.add(new String[] { "Result Testing",
				application.getSampleTestResult() });

		CIData.add(new String[] { "SLA", dto.getSlaName() });
		CIData.add(new String[] { "Service Contract", dto.getServiceContract() });
		CIData.add(new String[] { "Protection Level Integrity",
				getValue(dto.getItSecSbIntegrityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				dto.getItSecSbIntegrityTxt() });
		CIData.add(new String[] { "Protection Level Availability",
				getValue(dto.getItSecSbAvailabilityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				dto.getItSecSbAvailabilityTxt() });
		CIData.add(new String[] { "Protection Level Class Information",
				getConfidentialityList().get(dto.getClassInformationId())  });
		CIData.add(new String[] { "Explanation for Protection Level",
				dto.getClassInformationTxt() });
		return CIData;
	}

	private List<String[]> createPositionData(Schrank schrank) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set", getItsetName(schrank.getItset()) });
		CIData.add(new String[] { "Position", schrank.getSchrankName() });
		Room room = schrank.getRoom();
		BuildingArea buildingArea = room.getBuildingArea();
		Building building = buildingArea.getBuilding();
		Terrain terrian = building.getTerrain();
		Standort standort = terrian.getStandort();
		StringBuilder roomDeatil = new StringBuilder();
		roomDeatil.append(room.getRoomName()).append("(")
				.append(standort.getStandortName()).append(":")
				.append(terrian.getTerrainName()).append(":")
				.append(building.getBuildingName()).append(":")
				.append(buildingArea.getBuildingAreaName()).append(")");
		CIData.add(new String[] { "Room", roomDeatil.toString() });
		CIData.add(new String[] { "Severity Level",
				getSeverityLevel(schrank.getSeverityLevelId()) });
		CIData.add(new String[] { "Business Essential",
				getSeverityLevel(schrank.getBusinessEssentialId()) });
		if (schrank.getTemplate() == 1)
			CIData.add(new String[] { "Template Object", "Yes" });
		else {
			CIData.add(new String[] { "Template Object", "No" });
		}
		CIData.add(new String[] { "Primary Person", schrank.getCiOwner() });
		CIData.add(new String[] { "Delegate Person/Group",
				schrank.getCiOwnerDelegate() });
		CIData.add(new String[] {
				"Link",
				CiEntitiesHbn.getCIName(AirKonstanten.TABLE_ID_POSITION,
						schrank.getRefId()) });
		if (-1 == schrank.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "Yes" });
		} else if (0 == schrank.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "No" });
		}
		if (-1 == schrank.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "Yes" });
		} else if (0 == schrank.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "No" });
		}
		CIData.add(new String[] { "GxP", schrank.getGxpFlag() });
		CIData.add(new String[] { "ITSec Group",
				ItSecGroupHbn.getItSecGroup(schrank.getItsecGroupId()) });
		if (schrank.getSampleTestDate() != null) {
			CIData.add(new String[] { "Time Testing",
					schrank.getSampleTestDate().toString() });
		} else {
			CIData.add(new String[] { "Time Testing", " " });
		}
		CIData.add(new String[] { "Result Testing",
				schrank.getSampleTestResult() });
		CIData.add(new String[] { "SLA", SlaHbn.getSlaName(schrank.getSlaId()) });
		CIData.add(new String[] {
				"Service Contract",
				ServiceContractHbn.getServiceContract(schrank
						.getServiceContractId()) });
		CIData.add(new String[] { "Protection Level Integrity",
				getValue(schrank.getItSecSbIntegrityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				schrank.getItSecSbIntegrityTxt() });
		CIData.add(new String[] { "Protection Level Availability",
				getValue(schrank.getItSecSbAvailability()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				schrank.getItSecSbAvailabilityTxt() });
		CIData.add(new String[] { "Protection Level Information Class",
				getConfidentialityList().get(standort.getClassInformationId())  });
		CIData.add(new String[] { "Explanation for Protection Level",
				schrank.getClassInformationTxt() });
		return CIData;
	}

	private List<String[]> createRoomData(Room room) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set", getItsetName(room.getItset()) });
		CIData.add(new String[] { "Room", room.getRoomName() });
		//vandana
		CIData.add(new String[] { "Provider Name", room.getProvider_Name() });
		CIData.add(new String[] { "Provider Address", room.getProvider_Address() });
		//vandana
		BuildingArea buildingArea = room.getBuildingArea();
		Building building = buildingArea.getBuilding();
		Terrain terrian = building.getTerrain();
		Standort standort = terrian.getStandort();
		StringBuilder BuildingAreaDeatil = new StringBuilder();
		BuildingAreaDeatil.append(buildingArea.getBuildingAreaName())
				.append("(").append(standort.getStandortName()).append(":")
				.append(terrian.getTerrainName()).append(":")
				.append(building.getBuildingName()).append(")");
		CIData.add(new String[] { "Building Area",
				BuildingAreaDeatil.toString() });
		CIData.add(new String[] { "Severity Level",
				getSeverityLevel(room.getSeverityLevelId()) });
		CIData.add(new String[] { "Business Essential",
				getSeverityLevel(room.getBusinessEssentialId()) });
		if (room.getTemplate() == 1)
			CIData.add(new String[] { "Template Object", "Yes" });
		else {
			CIData.add(new String[] { "Template Object", "No" });
		}
		CIData.add(new String[] { "Primary Person", room.getCiOwner() });
		CIData.add(new String[] { "Delegate Person/Group",
				room.getCiOwnerDelegate() });
		CIData.add(new String[] {
				"Link",
				CiEntitiesHbn.getCIName(AirKonstanten.TABLE_ID_ROOM,
						room.getRefId()) });
		if (-1 == room.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "Yes" });
		} else if (0 == room.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "No" });
		}
		if (-1 == room.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "Yes" });
		} else if (0 == room.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "No" });
		}
		CIData.add(new String[] { "GxP", room.getGxpFlag() });
		CIData.add(new String[] { "ITSec Group",
				ItSecGroupHbn.getItSecGroup(room.getItsecGroupId()) });
		if (room.getSampleTestDate() != null) {
			CIData.add(new String[] { "Time Testing",
					room.getSampleTestDate().toString() });
		} else {
			CIData.add(new String[] { "Time Testing", " " });
		}
		CIData.add(new String[] { "Result Testing", room.getSampleTestResult() });
		CIData.add(new String[] { "SLA", SlaHbn.getSlaName(room.getSlaId()) });
		CIData.add(new String[] {
				"Service Contract",
				ServiceContractHbn.getServiceContract(room
						.getServiceContractId()) });
		CIData.add(new String[] { "Protection Level Integrity",
				getValue(room.getItSecSbIntegrityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				room.getItSecSbIntegrityTxt() });
		CIData.add(new String[] { "Protection Level Availability",
				getValue(room.getItSecSbAvailability()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				room.getItSecSbAvailabilityTxt() });
		CIData.add(new String[] { "Protection Level Information Class",
				getConfidentialityList().get(room.getClassInformationId())  });
		CIData.add(new String[] { "Explanation for Protection Level",
				room.getClassInformationTxt() });
		return CIData;
	}

	private List<String[]> createBuildingAreaData(BuildingArea buildingArea) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set",
				getItsetName(buildingArea.getItset()) });
		CIData.add(new String[] { "Building Area",
				buildingArea.getBuildingAreaName() });
				//vandana
		CIData.add(new String[] { "Provider Name", buildingArea.getProvider_Name() });
		CIData.add(new String[] { "Provider Address", buildingArea.getProvider_Address() });
		//vandana
		Building building = buildingArea.getBuilding();
		Terrain terrian = building.getTerrain();
		Standort standort = terrian.getStandort();
		StringBuilder buildingDeatil = new StringBuilder();
		buildingDeatil.append(building.getBuildingName()).append("(")
				.append(standort.getStandortName()).append(":")
				.append(terrian.getTerrainName()).append(":").append(")");
		CIData.add(new String[] { "Building", buildingDeatil.toString() });
		if (buildingArea.getTemplate() == 1)
			CIData.add(new String[] { "Template Object", "Yes" });
		else {
			CIData.add(new String[] { "Template Object", "No" });
		}
		CIData.add(new String[] { "Primary Person", buildingArea.getCiOwner() });
		CIData.add(new String[] { "Delegate Person/Group",
				buildingArea.getCiOwnerDelegate() });
		CIData.add(new String[] {
				"Link",
				CiEntitiesHbn.getCIName(AirKonstanten.TABLE_ID_BUILDING_AREA,
						buildingArea.getRefId()) });
		if (-1 == buildingArea.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "Yes" });
		} else if (0 == buildingArea.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "No" });
		}
		if (-1 == buildingArea.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "Yes" });
		} else if (0 == buildingArea.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "No" });
		}
		CIData.add(new String[] { "GxP", buildingArea.getGxpFlag() });
		CIData.add(new String[] { "ITSec Group",
				ItSecGroupHbn.getItSecGroup(buildingArea.getItsecGroupId()) });
		if (buildingArea.getSampleTestDate() != null) {
			CIData.add(new String[] { "Time Testing",
					buildingArea.getSampleTestDate().toString() });
		} else {
			CIData.add(new String[] { "Time Testing", " " });
		}
		CIData.add(new String[] { "Result Testing",
				buildingArea.getSampleTestResult() });
		CIData.add(new String[] { "SLA",
				SlaHbn.getSlaName(buildingArea.getSlaId()) });
		CIData.add(new String[] {
				"Service Contract",
				ServiceContractHbn.getServiceContract(buildingArea
						.getServiceContractId()) });
		CIData.add(new String[] { "Protection Level Integrity",
				getValue(buildingArea.getItSecSbIntegrityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				buildingArea.getItSecSbIntegrityTxt() });
		CIData.add(new String[] { "Protection Level Availability",
				getValue(buildingArea.getItSecSbAvailability()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				buildingArea.getItSecSbAvailabilityTxt() });
		CIData.add(new String[] { "Protection Level Information Information Class",
				getConfidentialityList().get(buildingArea.getClassInformationId())  });
		CIData.add(new String[] { "Explanation for Protection Level",
				buildingArea.getClassInformationTxt() });
		return CIData;
	}

	private List<String[]> createBuildingData(Building building) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set", getItsetName(building.getItset()) });
		CIData.add(new String[] { "Building", building.getBuildingName() });
		Terrain terrian = building.getTerrain();
		Standort standort = terrian.getStandort();
		StringBuilder buildingDeatil = new StringBuilder();
		buildingDeatil.append(terrian.getTerrainName()).append("(")
				.append(standort.getStandortName()).append(")");
		CIData.add(new String[] { "Terrain", buildingDeatil.toString() });
		if (building.getTemplate() == 1)
			CIData.add(new String[] { "Template Object", "Yes" });
		else {
			CIData.add(new String[] { "Template Object", "No" });
		}
		CIData.add(new String[] { "Primary Person", building.getCiOwner() });
		CIData.add(new String[] { "Delegate Person/Group",
				building.getCiOwnerDelegate() });
		CIData.add(new String[] {
				"Link",
				CiEntitiesHbn.getCIName(AirKonstanten.TABLE_ID_BUILDING,
						building.getRefId()) });
		if (-1 == building.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "Yes" });
		} else if (0 == building.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "No" });
		}
		if (-1 == building.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "Yes" });
		} else if (0 == building.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "No" });
		}
		CIData.add(new String[] { "GxP", building.getGxpFlag() });
		CIData.add(new String[] { "ITSec Group",
				ItSecGroupHbn.getItSecGroup(building.getItsecGroupId()) });
		if (building.getSampleTestDate() != null) {
			CIData.add(new String[] { "Time Testing",
					building.getSampleTestDate().toString() });
		} else {
			CIData.add(new String[] { "Time Testing", " " });
		}
		CIData.add(new String[] { "Result Testing",
				building.getSampleTestResult() });
		CIData.add(new String[] { "SLA", SlaHbn.getSlaName(building.getSlaId()) });
		CIData.add(new String[] {
				"Service Contract",
				ServiceContractHbn.getServiceContract(building
						.getServiceContractId()) });
		CIData.add(new String[] { "Protection Level Integrity",
				getValue(building.getItSecSbIntegrityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				building.getItSecSbIntegrityTxt() });
		CIData.add(new String[] { "Protection Level Availability",
				getValue(building.getItSecSbAvailability()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				building.getItSecSbAvailabilityTxt() });
		CIData.add(new String[] { "Protection Level Information Class",
				getConfidentialityList().get(building.getClassInformationId())  });
		CIData.add(new String[] { "Explanation for Protection Level",
				building.getClassInformationTxt() });
		//vandana
		CIData.add(new String[] { "Provider Name", building.getProvider_Name() });
		CIData.add(new String[] { "Provider Address", building.getProvider_Address() });
		//vandana
		return CIData;
	}

	private List<String[]> createTerrainData(Terrain terrain) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set", getItsetName(terrain.getItset()) });
		CIData.add(new String[] { "Terrain", terrain.getTerrainName() });
		CIData.add(new String[] { "Site",
				terrain.getStandort().getStandortName() });
		if (terrain.getTemplate() == 1)
			CIData.add(new String[] { "Template Object", "Yes" });
		else {
			CIData.add(new String[] { "Template Object", "No" });
		}
		CIData.add(new String[] { "Primary Person", terrain.getCiOwner() });
		CIData.add(new String[] { "Delegate Person/Group",
				terrain.getCiOwnerDelegate() });
		CIData.add(new String[] {
				"Link",
				CiEntitiesHbn.getCIName(AirKonstanten.TABLE_ID_TERRAIN,
						terrain.getRefId()) });
		if (-1 == terrain.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "Yes" });
		} else if (0 == terrain.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "No" });
		}
		if (-1 == terrain.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "Yes" });
		} else if (0 == terrain.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "No" });
		}
		CIData.add(new String[] { "GxP", terrain.getGxpFlag() });
		CIData.add(new String[] { "ITSec Group",
				ItSecGroupHbn.getItSecGroup(terrain.getItsecGroupId()) });
		if (terrain.getSampleTestDate() != null) {
			CIData.add(new String[] { "Time Testing",
					terrain.getSampleTestDate().toString() });
		} else {
			CIData.add(new String[] { "Time Testing", " " });
		}
		CIData.add(new String[] { "Result Testing",
				terrain.getSampleTestResult() });
		CIData.add(new String[] { "SLA", SlaHbn.getSlaName(terrain.getSlaId()) });
		CIData.add(new String[] {
				"Service Contract",
				ServiceContractHbn.getServiceContract(terrain
						.getServiceContractId()) });
		CIData.add(new String[] { "Protection Level Integrity",
				getValue(terrain.getItSecSbIntegrityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				terrain.getItSecSbIntegrityTxt() });
		CIData.add(new String[] { "Protection Level Availability",
				getValue(terrain.getItSecSbAvailability()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				terrain.getItSecSbAvailabilityTxt() });
		CIData.add(new String[] { "Protection Level Information Class",
				getConfidentialityList().get(terrain.getClassInformationId())  });
		CIData.add(new String[] { "Explanation for Protection Level",
				terrain.getClassInformationTxt() });
		return CIData;
	}

	private List<String[]> createStandortData(Standort standort) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set", getItsetName(standort.getItset()) });
		CIData.add(new String[] { "SIte", standort.getStandortName() });
		if (standort.getTemplate() == 1)
			CIData.add(new String[] { "Template Object", "Yes" });
		else {
			CIData.add(new String[] { "Template Object", "No" });
		}
		CIData.add(new String[] { "Primary Person", standort.getCiOwner() });
		CIData.add(new String[] { "Delegate Person/Group",
				standort.getCiOwnerDelegate() });
		CIData.add(new String[] {
				"Link",
				CiEntitiesHbn.getCIName(AirKonstanten.TABLE_ID_SITE,
						standort.getRefId()) });
		if (-1 == standort.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "Yes" });
		} else if (0 == standort.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "No" });
		}
		if (-1 == standort.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "Yes" });
		} else if (0 == standort.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "No" });
		}
		CIData.add(new String[] { "GxP", standort.getGxpFlag() });
		CIData.add(new String[] { "ITSec Group",
				ItSecGroupHbn.getItSecGroup(standort.getItsecGroupId()) });
		if (standort.getSampleTestDate() != null) {
			CIData.add(new String[] { "Time Testing",
					standort.getSampleTestDate().toString() });
		} else {
			CIData.add(new String[] { "Time Testing", " " });
		}
		CIData.add(new String[] { "Result Testing",
				standort.getSampleTestResult() });
		CIData.add(new String[] { "SLA", SlaHbn.getSlaName(standort.getSlaId()) });
		CIData.add(new String[] {
				"Service Contract",
				ServiceContractHbn.getServiceContract(standort
						.getServiceContractId()) });
		CIData.add(new String[] { "Protection Level Integrity",
				getValue(standort.getItSecSbIntegrityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				standort.getItSecSbIntegrityTxt() });
		CIData.add(new String[] { "Protection Level Availability",
				getValue(standort.getItSecSbAvailability()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				standort.getItSecSbAvailabilityTxt() });
		CIData.add(new String[] { "Protection Level Class Information",
				getConfidentialityList().get(standort.getClassInformationId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				standort.getClassInformationTxt() });
		return CIData;
	}

	private List<String[]> createitSystemData(ItSystem itSystem) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set", getItsetName(itSystem.getItset()) });
		Integer ciSubType = itSystem.getCiSubTypeId() != null ? itSystem
				.getCiSubTypeId()
				: AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM_TRANSIENT;

		if (ciSubType == AirKonstanten.IT_SYSTEM_TYPE_SYSTEM_PLATFORM_TRANSIENT) {
			CIData.add(new String[] { "Transient System Platform",
					itSystem.getItSystemName() });
		} else {
			CIData.add(new String[] { "Hardware System",
					itSystem.getItSystemName() });
		}

		if (itSystem.getTemplate() == 1)
			CIData.add(new String[] { "Template Object", "Yes" });
		else {
			CIData.add(new String[] { "Template Object", "No" });
		}
		CIData.add(new String[] { "Primary Person", itSystem.getCiOwner() });
		CIData.add(new String[] { "Delegate Person/Group",
				itSystem.getCiOwnerDelegate() });
		CIData.add(new String[] {
				"Link",
				CiEntitiesHbn.getCIName(AirKonstanten.TABLE_ID_IT_SYSTEM,
						itSystem.getRefId()) });
		if (-1 == itSystem.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "Yes" });
		} else if (0 == itSystem.getRelevanceITSEC()) {
			CIData.add(new String[] { "GR1435", "No" });
		}
		if (-1 == itSystem.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "Yes" });
		} else if (0 == itSystem.getRelevanceICS()) {
			CIData.add(new String[] { "ICS", "No" });
		}
		CIData.add(new String[] { "GxP", itSystem.getGxpFlag() });
		CIData.add(new String[] { "ITSec Group",
				ItSecGroupHbn.getItSecGroup(itSystem.getItsecGroupId()) });
		if (itSystem.getSampleTestDate() != null) {
			CIData.add(new String[] { "Time Testing",
					itSystem.getSampleTestDate().toString() });
		} else {
			CIData.add(new String[] { "Time Testing", " " });
		}
		CIData.add(new String[] { "Result Testing",
				itSystem.getSampleTestResult() });
		CIData.add(new String[] { "SLA", SlaHbn.getSlaName(itSystem.getSlaId()) });
		CIData.add(new String[] {
				"Service Contract",
				ServiceContractHbn.getServiceContract(itSystem
						.getServiceContractId()) });
		CIData.add(new String[] { "Protection Level Integrity",
				getValue(itSystem.getItSecSbIntegrityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				itSystem.getItSecSbIntegrityTxt() });
		CIData.add(new String[] { "Protection Level Availability",
				getValue(itSystem.getItSecSbAvailability()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				itSystem.getItSecSbAvailabilityTxt() });
		CIData.add(new String[] { "Protection Level Class Information",
				getConfidentialityList().get(itSystem.getClassInformationId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				itSystem.getClassInformationTxt() });
		return CIData;
	}

	private String getItsetName(Long ItSet) {
		if (ItSet == 10002)
			return "Germany";
		else if (ItSet == 10263)
			return "AsiaPacific";
		else if (ItSet == 10260)
			return "NorthAmerica";
		else if (ItSet == 10620)
			return "LatinAmerica";
		else if (ItSet == 10719)
			return "Bayer Global";
		else if (ItSet == 10264)
			return "EMEA";
		else
			return "unknown";

	}

	private String getSeverityLevel(Long severityLevelId) {
		if (severityLevelId == null)
			return "";
		else if (severityLevelId == 1)
			return "Business Essential";
		else if (severityLevelId == 16)
			return "Not Business Essential";
		else if (severityLevelId == 5)
			return "Emergency";
		else if (severityLevelId == 6)
			return "Important";
		else if (severityLevelId == 7)
			return "Medium";
		else if (severityLevelId == 8)
			return "Low";
		else
			return "";

	}
  private static HashMap<Long, String> getConfidentialityList(){
	  if(confidentialityList.isEmpty()){
		  List<ConfidentialityDTO> listResult = new ArrayList<ConfidentialityDTO>();
		  listResult =ConfidentialityHbn.listConfidentiality();
		  if(!listResult.isEmpty()){
			  for(ConfidentialityDTO coDto : listResult){
				  confidentialityList.put(coDto.getConfidentialityId(), coDto.getConfidentialityName());
			  }
		  }
	  }
	  return confidentialityList;
  }



}
