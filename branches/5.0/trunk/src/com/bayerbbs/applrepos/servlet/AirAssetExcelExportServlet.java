package com.bayerbbs.applrepos.servlet;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.formula.functions.Column;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.bayerbbs.applrepos.domain.HardwareComponent;
import com.bayerbbs.applrepos.domain.Land;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.LokationItemHbn;
import com.bayerbbs.applrepos.hibernate.SoftwareComponentHbn;
import com.bayerbbs.applrepos.service.AssetManagementParameterInput;
import com.bayerbbs.applrepos.service.AssetManagementParameterOutput;

public class AirAssetExcelExportServlet extends HttpServlet {
	private static final long serialVersionUID = 3569239290421829949L;

	private static final String[] COLUMNS = { "SAP Description", "PSP Element",
			"Cost center", "Site", "Serial Number", "Technical Master",
			"Technical Number/Asset-Id", "Inventory Number", "Organizational Unit" };
	/*private static final String[] EXPORTED_COLUMNS = { "Company Code", "Company Name", "Manufacturer", "Type", "Model", "Serial Number",
		"Tech.Nr.", "Country", "Site", "Building", "Room", "Rack - Position", "Inventory Number", "Order-Nr.",
		"PSP - Element", "Cost Center", "User", "DC-Name", "Anzeige ID", "IP-Adresse-RIB", "Sub-Net-Mask", "Default Gateway" };*/ //emria
	
	
	
	private static final String[] EXPORTED_COLUMNS = { "Company Code", "Company Name", "Manufacturer", "Type", "Model", "Serial Number",
		"Tech.Nr.", "Country", "Site", "Building", "Room", "Rack - Position", "Inventory Number", "Order-Nr.",
		"PSP - Element", "Cost Center" };
	
	private static final String UNDERSCORE = "_";

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		doPost(req, res);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		setUpResponse(req, res);
		
		String selectedHwAssets = req.getParameter("selectedHwAssets");
		System.out.println("Assets >>>>>>>>>>>>>>>> "+selectedHwAssets);
		System.out.println("Language >>>>>>>>>>>>>>>> "+req.getParameter("language"));
		
		Workbook workbook = null;
		if(selectedHwAssets != null && !selectedHwAssets.isEmpty())
		{
			workbook = createExportedAssetsSheet(req);
		}
		else {
			workbook = createWorkbook(req, res);
		}
		workbook.write(res.getOutputStream());
	}
	
	private Workbook createExportedAssetsSheet(HttpServletRequest req) {
		Workbook workbook = new XSSFWorkbook();
		
		String selectedHwAssets = req.getParameter("selectedHwAssets");
		
		if(selectedHwAssets == null || selectedHwAssets.isEmpty())
		{
			return null;
		}
		
		Sheet sheet = workbook.createSheet("Sheet1");
		((XSSFSheet) sheet).setDefaultColumnWidth(25);
		
		Row headerRow = sheet.createRow(0);
		Cell headerCell = null;

		CellStyle headerRowStyle = workbook.createCellStyle();
		headerRowStyle.setWrapText(true);		
		headerRowStyle.setAlignment(CellStyle.ALIGN_CENTER);
		
		for (int i = 0; i < EXPORTED_COLUMNS.length; i++) {
			headerCell = headerRow.createCell(i);
			headerCell.setCellValue(EXPORTED_COLUMNS[i]);
			headerCell.setCellStyle(headerRowStyle);
		}
		
		
		
		
		try {
			String[] hardwareIdArr = selectedHwAssets.split("~");
			if(hardwareIdArr != null && hardwareIdArr.length > 0)
			{
				int rowCount = 1;
				for(String hwId : hardwareIdArr)
				{
					try {
						if(hwId != null && !hwId.isEmpty()) {
							long hardwareId = Long.parseLong(hwId);
							HardwareComponent objHardwareComponent = HardwareComponentHbn.findHardwareComponentById(hardwareId);
							if(objHardwareComponent != null) {
								Row row = sheet.createRow(rowCount++);
								
								Cell cell;
								cell = row.createCell(0);
								if(objHardwareComponent.getPartner() != null)
								{
									System.out.println("cell" +cell);
									System.out.println("objHardwareComponent.getPartner() " +objHardwareComponent.getPartner().getNumber());
									if(objHardwareComponent.getPartner().getNumber()!= null)
										cell.setCellValue(objHardwareComponent.getPartner().getNumber());
									else
										cell.setCellValue("");
									
									cell = row.createCell(1);
									if(objHardwareComponent.getPartner().getName()!= null)
										cell.setCellValue(objHardwareComponent.getPartner().getName());
									else
										cell.setCellValue("");
									
								}
								

								cell = row.createCell(2);
								if(objHardwareComponent.getHardwareCategory3() != null && objHardwareComponent.getHardwareCategory3().getPartner() != null) {
									cell.setCellValue(objHardwareComponent.getHardwareCategory3().getPartner().getName());
								}
								cell = row.createCell(3);
								if(objHardwareComponent.getHardwareCategory3() != null) {
									cell.setCellValue(objHardwareComponent.getHardwareCategory3().getHwKategory3());
								}
								cell = row.createCell(4);
								if(objHardwareComponent.getHardwareCategory4() != null) {
									cell.setCellValue(objHardwareComponent.getHardwareCategory4().getHwKategory4());
								}
								cell = row.createCell(5);
								cell.setCellValue(objHardwareComponent.getSerialNumber());

								cell = row.createCell(6);
								cell.setCellValue(objHardwareComponent.getTechnicalNumber());

								if(objHardwareComponent.getSchrank() != null)
								{
									cell = row.createCell(11);
									cell.setCellValue(objHardwareComponent.getSchrank().getName());
									if(objHardwareComponent.getSchrank().getRoom() != null)
									{
										cell = row.createCell(10);
										cell.setCellValue(objHardwareComponent.getSchrank().getRoom().getName());
										
										if(objHardwareComponent.getSchrank().getRoom().getBuildingArea() != null && objHardwareComponent.getSchrank().getRoom().getBuildingArea().getBuilding() != null)
										{
											cell = row.createCell(9);
											cell.setCellValue(objHardwareComponent.getSchrank().getRoom().getBuildingArea().getBuilding().getName());
											
											if(objHardwareComponent.getSchrank().getRoom().getBuildingArea().getBuilding().getTerrain() != null && objHardwareComponent.getSchrank().getRoom().getBuildingArea().getBuilding().getTerrain().getStandort() != null)
											{
												cell = row.createCell(8);
												Standort standort = objHardwareComponent.getSchrank().getRoom().getBuildingArea().getBuilding().getTerrain().getStandort(); 
												String site = "DE".equalsIgnoreCase(req.getParameter("language")) ? standort.getName() : standort.getNameEn();
												cell.setCellValue(site);
												
												Long landId = standort.getLandId();
												
												Land land = LokationItemHbn.findLandById(landId);
												
												if(land != null)
												{
													String country = "DE".equalsIgnoreCase(req.getParameter("language")) ? land.getName() : land.getNameEn();
													cell = row.createCell(7);
													cell.setCellValue(country);
												}
											}
											
										}
										
									}
									
								}
								
								cell = row.createCell(12);
								cell.setCellValue(objHardwareComponent.getInventoryP69());
								
								cell = row.createCell(13);
								cell.setCellValue(objHardwareComponent.getBestSellText());
								
								cell = row.createCell(14);
								cell.setCellValue(objHardwareComponent.getAmKommision());
								
								if(objHardwareComponent.getKonto() != null) {
									cell = row.createCell(15);
									cell.setCellValue(objHardwareComponent.getKonto().getName());
								}
								
								/*if(objHardwareComponent.getItSystem() != null) {
									cell = row.createCell(17);
									cell.setCellValue(objHardwareComponent.getItSystem().getName());
								}*/
								
							}
						}
					} catch(Exception ex)
					{
						System.out.println("Error -----> "+ex.getMessage());
						ex.printStackTrace();
					}
				}
			}
		} catch(Exception ex)
		{
			System.out.println("Error -----> "+ex.getMessage());
			ex.printStackTrace();
		}
		return workbook;
	}
	
	private void setUpResponse(HttpServletRequest req, HttpServletResponse res) {
		String query = req.getParameter("query");
		String cwid = req.getParameter("cwid");
		String searchAction = req.getParameter("searchAction");
		
		String fileName = "AirAssetExport";

		if (cwid != null && cwid.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(cwid);
		if (searchAction != null && searchAction.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(searchAction);
		if (query != null && query.length() > 0)
			fileName = fileName.concat(UNDERSCORE).concat(query);

		fileName = fileName.concat(".xlsx");

		res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
		res.setCharacterEncoding("application/x-www-form-urlencoded");
	}

	private Workbook createWorkbook(HttpServletRequest req,
			HttpServletResponse res) {

		String searchAction = req.getParameter("searchAction");

		Workbook workbook = new XSSFWorkbook();

		Sheet sheet = workbook.createSheet(searchAction);
		((XSSFSheet) sheet).setDefaultColumnWidth(25);

		Row titleRow = sheet.createRow(0);
		Cell titleCell = titleRow.createCell(0);
		titleCell.setCellValue("WARNING: This data was exported by AIR at "
				+ DateFormat.getInstance().format(
						new Date(System.currentTimeMillis()))
				+ " and may now be incorrect or old!!!");

		Row spaceRow = sheet.createRow(1);
		Cell spaceCell = spaceRow.createCell(0);
		spaceCell.setCellValue("");

		Row headerRow = sheet.createRow(2);
		Cell headerCell = null;

		CellStyle headerRowStyle = workbook.createCellStyle();
		headerRowStyle.setWrapText(true);
		headerRowStyle.setAlignment(CellStyle.ALIGN_CENTER);

		for (int i = 0; i < COLUMNS.length; i++) {
			headerCell = headerRow.createCell(i);
			headerCell.setCellValue(COLUMNS[i]);
			headerCell.setCellStyle(headerRowStyle);
		}

		int i = 3;
		Row row = null;
		Cell cell = null;

		AssetManagementParameterOutput output = getAssets(req);

		for (AssetViewDataDTO hwComp : output.getAssetViewDataDTO()) {
			row = sheet.createRow(i++);
			cell = row.createCell(0);
			cell.setCellValue(hwComp.getSapDescription());

			cell = row.createCell(1);
			cell.setCellValue(hwComp.getPspElement());

			cell = row.createCell(2);
			cell.setCellValue(hwComp.getCostCenter());

			cell = row.createCell(3);
			cell.setCellValue(hwComp.getSite());

			cell = row.createCell(4);
			cell.setCellValue(hwComp.getSerialNumber());

			cell = row.createCell(5);
			cell.setCellValue(hwComp.getTechnicalMaster());

			cell = row.createCell(6);
			cell.setCellValue(hwComp.getTechnicalNumber());

			cell = row.createCell(7);
			cell.setCellValue(hwComp.getInventoryNumber());

			cell = row.createCell(8);
			cell.setCellValue(hwComp.getOrganizationalunit());

		}

		return workbook;
	}

	private AssetManagementParameterOutput getAssets(HttpServletRequest req) {

		String query = req.getParameter("query");
		String cwid = req.getParameter("cwid");
		String queryMode = req.getParameter("queryMode");
		String sort = req.getParameter("sort");
		String dir = req.getParameter("dir");
		int start = Integer.parseInt(req.getParameter("start"));
		int limit = Integer.parseInt(req.getParameter("limit"));
		
		AssetManagementParameterInput input = new AssetManagementParameterInput();
		input.setCwid(cwid);
		input.setQuery(query);
		input.setQueryMode(queryMode);
		input.setStart(start);
		input.setLimit(limit);
		input.setSort(sort);
		input.setDir(dir);
		
		AssetManagementParameterOutput out = null;

		if (input.getQueryMode().equalsIgnoreCase("hardware")) {
			out = HardwareComponentHbn.searchAsset(input);
		} else if (input.getQueryMode().equalsIgnoreCase("software")) {
			out = SoftwareComponentHbn.searchAsset(input);
		}

		return out;
	}
}