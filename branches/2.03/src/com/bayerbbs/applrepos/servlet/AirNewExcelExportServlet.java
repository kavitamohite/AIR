package com.bayerbbs.applrepos.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.bayerbbs.applrepos.domain.Partner;
import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;
import com.bayerbbs.applrepos.hibernate.ManufacturerHbn;

public class AirNewExcelExportServlet extends HttpServlet {
	private static final long serialVersionUID = 3569239290421829949L;

	private static final String[] SERVER_COLUMNS = { "Company Code", "Company Name", "Manufacturer", "Type", "Model", "Serial Number",
			"Tech.Nr.", "Country", "Site", "Building", "Room", "Rack - Position", "Inventory Number", "Order-Nr.",
			"PSP - Element", "Cost Center", "User", "DC-Name", "IP-Adresse-RIB", "Sub-Net-Mask", "Default Gateway" };
	
	private static final String[] NON_SERVER_COLUMNS = { "Company Code", "Company Name", "Manufacturer", "Type", "Model", "Serial Number",
		"Tech.Nr.", "Country", "Site", "Building", "Room", "Rack - Position", "Inventory Number", "Order-Nr.",
		"PSP - Element", "Cost Center", "User", "Anzeige ID" };
	
	private static final String UNDERSCORE = "_";

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		doPost(req, res);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		setUpResponse(req, res);

		Workbook workbook = createWorkbook(req, res);
		workbook.write(res.getOutputStream());
	}

	private void setUpResponse(HttpServletRequest req, HttpServletResponse res) {
		String cwid = req.getParameter("cwid");
		String fileName = "AirNewAssetExport";

		if (cwid != null && cwid.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(cwid);
		
 	      fileName = fileName.concat(".xlsx");

		res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
		res.setCharacterEncoding("application/x-www-form-urlencoded");
		
		
	}

	private Workbook createWorkbook(HttpServletRequest req,
			HttpServletResponse res) {
		
		String genearteDCFlag = req.getParameter("generateDCFlag");
//		System.out.println("generateDCFlag >>>>>>>>>>>> "+genearteDCFlag + " " + ItSystemHbn.getAvailabeDCNumbers());
		long maxDCNumberFound = ItSystemHbn.getMaximumDCNumberInSequence();
//		List<String> availableDCNumbers = ItSystemHbn.getAvailabeDCNumbers();
		String subCategory = req.getParameter("subCategory");
		
		Workbook workbook = new XSSFWorkbook();
		
		Sheet sheet = workbook.createSheet("Sheet1");
		((XSSFSheet) sheet).setDefaultColumnWidth(25);
		
		/*Row titleRow = sheet.createRow(0);
		Cell titleCell = titleRow.createCell(0);
		titleCell.setCellValue("WARNING: This data was exported by AIR at "
				+ DateFormat.getInstance().format(
						new Date(System.currentTimeMillis()))
				+ " and may now be incorrect or old!!!");*/

		/*Row spaceRow = sheet.createRow(1);
		Cell spaceCell = spaceRow.createCell(0);
		spaceCell.setCellValue("");*/

		Row headerRow = sheet.createRow(0);
		Cell headerCell = null;

		CellStyle headerRowStyle = workbook.createCellStyle();
		headerRowStyle.setWrapText(true);
		headerRowStyle.setAlignment(CellStyle.ALIGN_CENTER);
		
		String[] columns = NON_SERVER_COLUMNS;
		
		if(subCategory.equalsIgnoreCase("Server"))
		{
			columns = SERVER_COLUMNS;
		}
		
		int count = 0;
		for (int i = 0; i < columns.length; i++) {
			// Escaping DC-Name Column when subCategory is server.
			/*if(subCategory != null && !subCategory.equalsIgnoreCase("Server") && COLUMNS[i].equals("DC-Name"))
			{
				continue;
			}*/
			headerCell = headerRow.createCell(count++);
			headerCell.setCellValue(columns[i]);
			headerCell.setCellStyle(headerRowStyle);
		}
		
		int lastRowNum = 0;
		
		if(req.getParameter("multipleasset") != null)
		{
			lastRowNum = Integer.parseInt(req.getParameter("multipleasset")) + 1;
		}
		
		Row row = null;
//		int dcNameIndex = 0;
		Cell cell = null;
			for(int i=1; i < lastRowNum; i++){
			row = sheet.createRow(i);
			
			cell = row.createCell(0);
			
			// cell.setCellValue(req.getParameter("companyCode"));
			if(req.getParameter("companyName") != null && req.getParameter("companyCode") != null)
			{
				Partner partner = ManufacturerHbn.findByPartnerNameAndNumber(req.getParameter("companyName"), Long.parseLong(req.getParameter("companyCode")));
				if(partner != null) {
					cell.setCellValue(partner.getCompanyCode());
				}
			}
			
			cell = row.createCell(1);
			cell.setCellValue(req.getParameter("companyName"));
			
			cell = row.createCell(2);
			cell.setCellValue(req.getParameter("manufacturer"));
			
			cell = row.createCell(3);
			cell.setCellValue(req.getParameter("type"));			

			cell = row.createCell(4);
			cell.setCellValue(req.getParameter("model"));
			
			if(subCategory != null && subCategory.equalsIgnoreCase("Server") && genearteDCFlag != null && genearteDCFlag.equals("true"))
			{
				cell = row.createCell(17);
				/*if(availableDCNumbers != null && !availableDCNumbers.isEmpty() && availableDCNumbers.get(dcNameIndex) != null)
				{
					cell.setCellValue(availableDCNumbers.get(dcNameIndex++));
				} else {
					cell.setCellValue("DC"+maxDCNumberFound++);
				}*/
				String dcName = "DC"+(String.format("%04d", ++maxDCNumberFound));
				cell.setCellValue(dcName);
				HardwareComponentHbn.saveITSystem(req.getParameter("cwid"), dcName);
			}
			
			/*cell = row.createCell(4);
			cell.setCellValue(req.getParameter("sapDescription"));*/
			
			cell = row.createCell(14);
			cell.setCellValue(req.getParameter("pspElement"));
			
			cell = row.createCell(15);
			cell.setCellValue(req.getParameter("costCenter"));
			
			cell = row.createCell(7);
			cell.setCellValue(req.getParameter("country"));
			
			cell = row.createCell(8);
			cell.setCellValue(req.getParameter("site"));
			
			cell = row.createCell(9);
			cell.setCellValue(req.getParameter("building"));
			
			cell = row.createCell(10);
			cell.setCellValue(req.getParameter("room"));
			
			cell = row.createCell(11);
			cell.setCellValue(req.getParameter("rackPosition"));
			
			cell = row.createCell(5);
			cell.setCellValue(req.getParameter("serialNumber"));
			
			/*cell = row.createCell(13);
			cell.setCellValue(req.getParameter("technicalMaster"));*/
		
			cell = row.createCell(6);
			cell.setCellValue(req.getParameter("technicalNumber"));
			
			cell = row.createCell(12);
			cell.setCellValue(req.getParameter("inventorynumber"));
			
			cell = row.createCell(13);
			cell.setCellValue(req.getParameter("orderNumber"));
			
			}		
			return workbook;
	}
}
