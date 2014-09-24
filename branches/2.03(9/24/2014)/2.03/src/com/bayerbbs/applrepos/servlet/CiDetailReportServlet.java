package com.bayerbbs.applrepos.servlet;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.pdfbox.exceptions.COSVisitorException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.edit.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
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
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.HibernateUtil;
import com.bayerbbs.applrepos.hibernate.ItSecGroupHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;
import com.bayerbbs.applrepos.hibernate.SchrankHbn;
import com.bayerbbs.applrepos.hibernate.ServiceContractHbn;
import com.bayerbbs.applrepos.hibernate.SlaHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;
import com.bayerbbs.applrepos.hibernate.TerrainHbn;
import com.bayerbbs.pdf.pdfCell;
import com.bayerbbs.pdf.pdfRow;
import com.bayerbbs.pdf.pdfTable;

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
	private String ciName = "";

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		doPost(req, res);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {

		String ciId = req.getParameter("ciId");
		String tableId = req.getParameter("tableId");
		String language = req.getParameter("lang");
		String CIName = "";

		// Create a document and add a page to it
		PDDocument document = new PDDocument();
		PDPage page = new PDPage();
		document.addPage(page);

		// Start a new content stream which will "hold" the to be created
		// content
		PDPageContentStream contentStream = new PDPageContentStream(document,
				page);
		// Create a new font object selecting one of the PDF base fonts
		PDFont font = PDType1Font.HELVETICA;

		float pageHeight = page.findMediaBox().getHeight();
		float pageWeidth = page.findMediaBox().getWidth();
		float Margin = 50;

		contentStream.beginText();
		contentStream.setFont(font, 10);
		contentStream.moveTextPositionByAmount(Margin, (pageHeight - 50));
		contentStream.setNonStrokingColor(java.awt.Color.GRAY);
		List<String[]> CIData = printNameAndGetCiData(ciId, tableId,
				contentStream);
		contentStream.moveTextPositionByAmount(0, -25);
		PDFont font1 = PDType1Font.HELVETICA_BOLD;
		contentStream.setFont(font1, 20);
		contentStream.setNonStrokingColor(java.awt.Color.BLACK);
		contentStream.drawString("Compliance Statements");
		contentStream.moveTextPositionByAmount(0, -25);
		contentStream.drawString("relevant for GR 1435 / ISO 27001 / ICS");

		contentStream.endText();

		float tableWidth = pageWeidth - (2 * Margin);
		float top = pageHeight - (2.5f * Margin);
		pdfTable table = new pdfTable(top, Margin, page, contentStream);

		// Add multiple rows with random facts about Belgium
		for (String[] data : CIData) {
			pdfRow row = new pdfRow(20f);
			pdfCell cell = new pdfCell(((tableWidth / 3)), data[0]);
			cell.setFont(PDType1Font.HELVETICA);
			cell.setFontSize(13);
			row.addCell(cell);
			for (int i = 1; i < data.length; i++) {
				cell = new pdfCell((tableWidth / 3) * 2, data[i]);
				cell.setFont(PDType1Font.HELVETICA);
				cell.setFontSize(13);
				row.addCell(cell);
			}
			table.drawRow(row);
			// Start a new page if needed
			if (table.isEndOfPage()) {
				contentStream.close();
				// Start new table on new page
				page = addNewPage(document);
				contentStream = new PDPageContentStream(document, page);
				top = page.findMediaBox().getHeight() - Margin;
				table = new pdfTable((top - (1 * 20f)), Margin, page,
						contentStream);
			}

		}
		table.endTable(tableWidth);
		contentStream.close();

		List<ComplianceDetail> complianceDetails = getComplianceDeatils(
				Long.valueOf(tableId), Long.valueOf(ciId), language);
		writeComplianceDetail(complianceDetails, document, language);
		this.ciName=ciName.replaceAll(" {1,10}", "");

		// Save the results and ensure that the document is properly closed:
		try {
			File pdf = new File("/app/sisnet/catalina/temp/Compliance_Statements_"+ciName+".pdf");
			document.save(pdf);
		} catch (COSVisitorException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		document.close();

		printPdfOutputstream(res);

	}

	private void printPdfOutputstream(HttpServletResponse res)
			throws ServletException, IOException {
		ServletOutputStream stream = null;
		BufferedInputStream buf = null;
		try {
			stream = res.getOutputStream();
			File pdf = new File("/app/sisnet/catalina/temp/Compliance_Statements_"+ciName+".pdf");
			res.setContentType("application/pdf");

			res.addHeader("Content-Disposition", "attachment; filename="
					+ "Compliance_Statements_"+ciName+".pdf");
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
		}
	}

	private static PDPage addNewPage(PDDocument doc) {
		PDPage page = new PDPage();
		doc.addPage(page);
		return page;
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

	private static void writeComplianceDetail(
			List<ComplianceDetail> complianceDetails, PDDocument pagDocument,
			String Language) {
		Session session = HibernateUtil
				.getSession(HibernateUtil.DATASOURCE_ID_GSTOOL);
		ResultSet rs = null;
		try {
			@SuppressWarnings("deprecation")
			PreparedStatement statement = session.connection()
					.prepareStatement(STMT_SELECT_MASSN_BESCHREIBUNG);
			statement.setInt(2, getLanguageId(Language));
			for (ComplianceDetail detail : complianceDetails) {
				PDPage page = addNewPage(pagDocument);
				PDPageContentStream contentStream = null;
				try {
					contentStream = new PDPageContentStream(pagDocument, page);
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}

				String description = getDescription(statement,
						detail.getGStoolId(), rs);
				PDFont font = PDType1Font.HELVETICA;
				try {
					PDRectangle mediabox = page.findMediaBox();
					float margin = 50;
					float startX = mediabox.getLowerLeftX() + margin;
					float startY = mediabox.getUpperRightY() - margin;
					contentStream.beginText();
					contentStream.moveTextPositionByAmount(startX, startY);
					PDFont fontHeader = PDType1Font.HELVETICA_BOLD;
					contentStream.setFont(fontHeader, 13);
					contentStream.setNonStrokingColor(java.awt.Color.BLACK);
					contentStream.drawString(StringUtils
							.substringBetween(description, "<h1>", "</h1>")
							.trim().replaceAll("\\W{2,10}", " "));
					contentStream.moveTextPositionByAmount(0, -20);
					contentStream.setFont(font, 9);
					contentStream.setNonStrokingColor(java.awt.Color.BLUE);
					contentStream.drawString("Refers to regulations:");
					contentStream.moveTextPositionByAmount(0, -20);
					String pattern = "(<.*?>)";
					String GR1435 = StringUtils.substringBetween(description,
							"GR1435:", "ICS:");
					contentStream.drawString("GR1435: "
							+ GR1435.replaceAll(pattern, ""));
					contentStream.moveTextPositionByAmount(0, -20);
					String ICS = StringUtils.substringBetween(description,
							"ICS:", "ISO2700x:");
					contentStream.drawString("ICS: "
							+ ICS.replaceAll(pattern, ""));
					contentStream.moveTextPositionByAmount(0, -20);
					String ISO2700x = StringUtils.substringBetween(description,
							"ISO2700x:", "</font></p>");
					contentStream.drawString("ISO2700x: "
							+ ISO2700x.replaceAll(pattern, ""));
					contentStream.moveTextPositionByAmount(0, -20);
					List<String> lines = new ArrayList<String>();
					String paragarph = StringUtils.substringBetween(
							description, "</font></p>", "</body>");
					if (StringUtils.isNotEmpty(paragarph)) {
						paragarph = paragarph.replaceAll(pattern, ";");
						paragarph = paragarph.replaceAll(";{1,10}", ";");
						String[] print = paragarph.split(";");
						for (int i = 0; i < print.length; i++) {
							List<String> result = getLines(print[i].trim(),
									(page.findMediaBox().getWidth()), font);
							if (result != null) {
								lines.addAll(result);
							}
						}
						contentStream.setNonStrokingColor(java.awt.Color.RED);
						for (String line : lines) {
							contentStream.drawString(line.trim());
							contentStream.moveTextPositionByAmount(0, -20);
						}
						contentStream.endText();
						float pageHeight = startY - (20 * (lines.size() + 5));
						float pageWeidth = page.findMediaBox().getWidth();
						float tableWidth = pageWeidth - (2 * 50);
						pdfTable table = new pdfTable(pageHeight, 50, page,
								contentStream);
						List<String[]> complianceData = createComplianceDataTable(detail);
						for (String[] data : complianceData) {
							if (table.isEndOfPage()) {
								contentStream.close();
								// Start new table on new page
								page = addNewPage(pagDocument);
								contentStream = new PDPageContentStream(
										pagDocument, page);
								float top = page.findMediaBox().getHeight() - 50;
								table = new pdfTable((top - (1 * 20f)), 50,
										page, contentStream);
							}
							pdfRow row = new pdfRow(25f);
							pdfCell cell = new pdfCell(((tableWidth / 3)),
									data[0]);
							cell.setFont(PDType1Font.HELVETICA);
							cell.setFontSize(15);
							row.addCell(cell);
							for (int i = 1; i < data.length; i++) {
								cell = new pdfCell((tableWidth / 3) * 2,
										data[i]);
								cell.setFont(PDType1Font.HELVETICA);
								cell.setFontSize(13);
								row.addCell(cell);
							}
							table.drawRow(row);
							// Start a new page if needed
							if (table.isEndOfPage()) {
								contentStream.close();
								// Start new table on new page
								page = addNewPage(pagDocument);
								contentStream = new PDPageContentStream(
										pagDocument, page);
								float top = page.findMediaBox().getHeight() - 50;
								table = new pdfTable((top - (1 * 20f)), 50,
										page, contentStream);
							}

						}
						table.endTable(tableWidth);
						contentStream.close();

					}

				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		} catch (SQLException e) {
		} finally {
			try {
				if (rs != null)
					rs.close();
			} catch (SQLException e) {
			}

			session.close();
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

	private static List<String> getLines(String text, float width, PDFont font)
			throws IOException {
		List<String> result = new ArrayList<String>();
		if (text == null || text.isEmpty()) {
			return null;
		}
		String test = text.replaceAll("\\W{2,10}", " ");
		String[] split = test.split("(?<=\\W)");
		int[] possibleWrapPoints = new int[split.length];
		possibleWrapPoints[0] = split[0].length();
		for (int i = 1; i < split.length; i++) {
			possibleWrapPoints[i] = possibleWrapPoints[i - 1]
					+ split[i].length();
		}

		int start = 0;
		int end = 0;
		for (int i : possibleWrapPoints) {
			float width1 = font.getStringWidth(test.substring(start, i)) / 1000 * 11;
			if (start < end && width1 > width) {
				result.add(test.substring(start, end));
				start = end;
			}
			end = i;
		}
		// Last piece of text
		result.add(test.substring(start));
		return result;
	}

	private static List<String[]> createComplianceDataTable(
			ComplianceDetail complianceDetail) {
		List<String[]> complianceDatas = new ArrayList<String[]>();
		complianceDatas.add(new String[] { "Indent",
				complianceDetail.getIndent() });
		complianceDatas.add(new String[] { "Control",
				complianceDetail.getControl() });
		complianceDatas.add(new String[] { "Relevance ICS Security Management",
				complianceDetail.getReICSSecurity() });
		complianceDatas.add(new String[] { "Justification/Evidence",
				complianceDetail.getJustification() });
		return complianceDatas;
	}

	private List<String[]> printNameAndGetCiData(String ciId, String tableId,
			PDPageContentStream contentStream) {
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
				contentStream.drawString("Compliance Statements " + ciName);
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
				contentStream.drawString("Compliance Statements "
						+ name.toString());
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
				contentStream.drawString("Compliance Statements "
						+ name.toString());
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
				contentStream.drawString("Compliance Statements "
						+ name.toString());
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

				contentStream.drawString("Compliance Statements "
						+ name.toString());
				CIData = createBuildingData(building);
				this.ciName = building.getBuildingName();
				return CIData;
			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_TERRAIN) {
				Terrain terrain = TerrainHbn.findById(Long.valueOf(ciId));
				StringBuilder name = new StringBuilder();
				Standort standort = terrain.getStandort();
				name.append(terrain.getTerrainName()).append(" (")
						.append(standort.getStandortName()).append(")");

				contentStream.drawString("Compliance Statements "
						+ name.toString());
				CIData = createTerrainData(terrain);
				this.ciName = terrain.getTerrainName();
				return CIData;
			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_SITE) {
				Standort standort = StandortHbn.findById(Long.valueOf(ciId));
				contentStream.drawString("Compliance Statements "
						+ standort.getStandortName());
				CIData = createStandortData(standort);
				this.ciName = standort.getStandortName();
				return CIData;
			} else if (Integer.parseInt(tableId) == AirKonstanten.TABLE_ID_IT_SYSTEM) {
				ItSystem itSystem = ItSystemHbn.findById(ItSystem.class,
						Long.valueOf(ciId));
				contentStream.drawString("Compliance Statements "
						+ itSystem.getName());
				CIData = createitSystemData(itSystem);
				this.ciName = itSystem.getItSystemName();
			}

		} catch (Exception e) {
			// TODO: handle exception
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
		CIData.add(new String[] { "Protection Level Confidentiality",
				getValue(dto.getItSecSbConfidentialityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				dto.getItSecSbConfidentialityTxt() });
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
		CIData.add(new String[] { "Protection Level Confidentiality",
				getValue(schrank.getItSecSbConfidentialityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				schrank.getItSecSbConfidentialityTxt() });
		return CIData;
	}

	private List<String[]> createRoomData(Room room) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set", getItsetName(room.getItset()) });
		CIData.add(new String[] { "Room", room.getRoomName() });
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
		CIData.add(new String[] { "Protection Level Confidentiality",
				getValue(room.getItSecSbConfidentialityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				room.getItSecSbConfidentialityTxt() });
		return CIData;
	}

	private List<String[]> createBuildingAreaData(BuildingArea buildingArea) {
		List<String[]> CIData = new ArrayList<String[]>();
		CIData.add(new String[] { "IT Set",
				getItsetName(buildingArea.getItset()) });
		CIData.add(new String[] { "Building Area",
				buildingArea.getBuildingAreaName() });
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
		CIData.add(new String[] { "Protection Level Confidentiality",
				getValue(buildingArea.getItSecSbConfidentialityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				buildingArea.getItSecSbConfidentialityTxt() });
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
		CIData.add(new String[] { "Protection Level Confidentiality",
				getValue(building.getItSecSbConfidentialityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				building.getItSecSbConfidentialityTxt() });
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
		CIData.add(new String[] { "Protection Level Confidentiality",
				getValue(terrain.getItSecSbConfidentialityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				terrain.getItSecSbConfidentialityTxt() });
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
		CIData.add(new String[] { "Protection Level Confidentiality",
				getValue(standort.getItSecSbConfidentialityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				standort.getItSecSbConfidentialityTxt() });
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
		CIData.add(new String[] { "Protection Level Confidentiality",
				getValue(itSystem.getItSecSbConfidentialityId()) });
		CIData.add(new String[] { "Explanation for Protection Level",
				itSystem.getItSecSbConfidentialityTxt() });
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

}
