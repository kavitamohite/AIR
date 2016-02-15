package com.bayerbbs.applrepos.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.bayerbbs.applrepos.domain.HardwareCategory4;
import com.bayerbbs.applrepos.domain.Konto;
import com.bayerbbs.applrepos.domain.Land;
import com.bayerbbs.applrepos.domain.Standort;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.dto.KeyValueDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.hibernate.BuildingHbn;
import com.bayerbbs.applrepos.hibernate.CostcenterHbn;
import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.LokationItemHbn;
import com.bayerbbs.applrepos.hibernate.ModelHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;
import com.bayerbbs.applrepos.hibernate.RoomHbn;
import com.bayerbbs.applrepos.hibernate.SchrankHbn;
import com.bayerbbs.applrepos.hibernate.StandortHbn;

/**
 * This class implements the Servlet to import Excel or CSV file.
 * @author ENQMU
 *
 */
public class AirExcelImportServlet extends HttpServlet {

	private final static Logger logger = Logger.getLogger(AirExcelImportServlet.class);
	
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		response.setContentType("text/html");
		java.io.PrintWriter out = response.getWriter();
		
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		logger.info("isMultipart :: "+isMultipart);
		
		// None files upload message to Client.
		if(!isMultipart) {
			out.println("<html>");
			out.println("<head>");
			out.println("<title>Servlet upload</title>");  
			out.println("</head>");
			out.println("<body>");
			out.println("<p>No file uploaded</p>"); 
			out.println("</body>");
			out.println("</html>");
			return;
		}
		
		DiskFileItemFactory factory = new DiskFileItemFactory();

		// Create a new file upload handler
		ServletFileUpload upload = new ServletFileUpload(factory);
		
		try { 
			// Parse the request to get file items.
			List<FileItem> fileItems = upload.parseRequest(request);
			
			// Response for No any file(s) uploaded.
			if(fileItems == null || fileItems.isEmpty() || fileItems.get(0).getSize() == 0)
			{
				logger.info("fileItems is empty.");
				out.println("<html>");
				out.println("<head>");
				out.println("<title>Servlet upload</title>");  
				out.println("</head>");
				out.println("<body>");
				out.println("<p>No file uploaded.</p>"); 
				out.println("</body>");
				out.println("</html>");
				return;
			}
			logger.info("fileItems size :: "+fileItems.size());
			// Declaring variable for CWID
			String cwid = null;
			// Process the uploaded file items
			Iterator<FileItem> filesIterator = fileItems.iterator();

			out.println("<html>");
			out.println("<head>");
			out.println("<title>File upload</title>");  
			out.println("</head>");
			out.println("<body>");
			StringBuilder msg = new StringBuilder();
			
			// List of errors existing in the CSV or Excel file.
			List<String> errors = new ArrayList<String>();
			// List of assets populated from CSV or Excel file. 
			List<AssetViewDataDTO> assests = new ArrayList<AssetViewDataDTO>();
			// List of errors generated while saving hardware assets.
			List<String> errorsInSaving = new ArrayList<String>();
			
			while (filesIterator.hasNext()) 
			{
				FileItem fi = filesIterator.next();
				// Form field obtained.
				if(fi.isFormField())
			    {
			        if(fi.getFieldName().equals("usercwid"))
			        {
			        	cwid = fi.getString();
			        	logger.info("CWID >>>>>>>>> "+fi.getString()); 
			        }
			    }
				// Uploaded file is obtained.
				else if(!fi.isFormField())
				{
					logger.info("Uploaded file is obtained.");
					if(fi.getName().endsWith(".xls") || fi.getName().endsWith(".xlsx") || fi.getName().endsWith(".csv"))
					{
						Workbook workbook = new XSSFWorkbook(fi.getInputStream());

						Sheet sheet = workbook.getSheetAt(0);

						// Every sheet has rows, iterate over them
						Iterator<Row> rowIterator = sheet.iterator();

						// Reaching to the row where records exists.
						for(int j = 0; j < 3; j++)
						{
							if(rowIterator.hasNext())
							{
								rowIterator.next();
							}
						}
						
						
						int rowNum = 0;
						// Creating instances of AssetViewDataDTO class for each row of records in the uploaded file.
						while (rowIterator.hasNext()) 
						{
							
							String manufacturer = null;
							String subCategory = null;
							String type = null;
							
							AssetViewDataDTO obAssetViewDataDTO = new AssetViewDataDTO();
							assests.add(obAssetViewDataDTO);
							try {
								Row row = rowIterator.next();
								rowNum = row.getRowNum();
								obAssetViewDataDTO.setCwid(cwid);
								

								if(row.getCell(0) != null)
								{
									manufacturer = getExcelDataByColumnNumber(row, 0); 
								}

								if(row.getCell(1) != null)
								{
									subCategory = getExcelDataByColumnNumber(row, 1); 
								}

								if(row.getCell(2) != null)
								{
									type = getExcelDataByColumnNumber(row, 2);
								}
								// getting Model object
								HardwareCategory4 objModel = null;
								// When model name is found in the file.
								if(row.getCell(3) != null)
								{
									String model = getExcelDataByColumnNumber(row, 3); 
									objModel = ModelHbn.findModelIdByWhereName(model);
									// When model name is found in the database.
									if(objModel != null)
									{
										String dbManufacturer = objModel.getHwCategory3().getPartner().getName();
										if(!dbManufacturer.equalsIgnoreCase(manufacturer))
										{
											errors.add("Please input correct manufacturer name ("+ dbManufacturer +") at row number : "+rowNum + " and try again later.");
										}
										String subCategory2 = objModel.getHwCategory3().getHwCategory2().getHwKategory2();
										if(subCategory2 != null && subCategory != null && !subCategory2.equalsIgnoreCase(subCategory))
										{
											errors.add("Please input correct sub category name ("+ subCategory2 +") at row number : "+rowNum + " and try again later.");
										}
										String type2 = objModel.getHwCategory3().getHwKategory3();
										if(type2 != null && type != null && !type2.equalsIgnoreCase(type))
										{
											errors.add("Please input correct type name ("+ type2 +") at row number : "+rowNum + " and try again later.");
										}

										obAssetViewDataDTO.setManufacturer(objModel.getHwCategory3().getPartner().getName());
										obAssetViewDataDTO.setManufacturerId(objModel.getHwCategory3().getPartnerId());
										obAssetViewDataDTO.setSubCategory(objModel.getHwCategory3().getHwCategory2().getHwKategory2());
										obAssetViewDataDTO.setSubcategoryId(objModel.getHwCategory3().getHwCategory2().getId());
										obAssetViewDataDTO.setModel(model);
										obAssetViewDataDTO.setModelId(objModel.getId());

									}
									else
									{
										errors.add("Please correct invalid model name ("+ model +") at row number : "+rowNum + " and try again later.");
									}
								}
								else
								{
									errors.add("Please input model name at row number : "+rowNum + " and try again later.");
								}
								obAssetViewDataDTO.setSapDescription(getExcelDataByColumnNumber(row, 4));
								obAssetViewDataDTO.setPspElement(getExcelDataByColumnNumber(row, 5));

								Konto konto = null;
								String costCenter =  getExcelDataByColumnNumber(row, 6);
								if(costCenter != null)
								{
									obAssetViewDataDTO.setCostCenter(costCenter);  
									konto = CostcenterHbn.findCostCenterIdByName(costCenter);
									if(konto != null) {
										obAssetViewDataDTO.setCostCenterId(konto.getId());
										obAssetViewDataDTO.setCostCenterManagerId(konto.getCwidVerantw());
										List<PersonsDTO> persons = PersonsHbn.findPersonByCWID(konto.getCwidVerantw());
										if(persons != null && !persons.isEmpty())
										{
											obAssetViewDataDTO.setOrganizationalunit(persons.get(0).getOrgUnit());
										}
									}
									else
									{
										errors.add("Please correct invalid Cost center name ("+ costCenter +") at row number : "+rowNum + " and try again later.");
									}
								}

								Standort standort = null;
								String country = getExcelDataByColumnNumber(row, 7);
								String site = getExcelDataByColumnNumber(row, 8);
								String building = getExcelDataByColumnNumber(row, 9);
								String room = getExcelDataByColumnNumber(row, 10);
								String rackPosition = getExcelDataByColumnNumber(row, 11);
								logger.info("Country >>>>>>>>>>>>>> "+country); 

								Land land = null;
								if(country == null || country.isEmpty())
								{
									errors.add("Please provide country name at row number : "+rowNum + " and try again later.");
								}
								else
								{
									land = LokationItemHbn.findLandByWhereName(country);
									if(land == null)
									{
										errors.add("Please correct invalid country name ("+ country +") at row number : "+rowNum + " and try again later.");
									}
								}

								if(site == null || site.isEmpty())
								{
									errors.add("Please provide site name at row number : "+rowNum + " and try again later.");
								}
								else
								{
									standort = StandortHbn.findSiteByNameAndLandId(site, land.getId());
									if(standort == null)
									{
										errors.add("Please correct invalid site name ("+ site +") at row number : "+rowNum + " and try again later.");
									}
									else 
									{
										if(building == null || building.isEmpty())
										{
											errors.add("Please provide building name at row number : "+rowNum + " and try again later.");
										}
										else
										{
											boolean isAvailable = false;

											Long buildingAreaId = null; 

											KeyValueDTO[] dataArr = BuildingHbn.findBuildingsBySiteId(standort.getId());

											if(dataArr != null && dataArr.length > 0) 
											{
												for(KeyValueDTO data : dataArr)
												{
													if(data != null && data.getName() != null)
													{
														if(building.equalsIgnoreCase(data.getName()))
														{
															isAvailable = true;
															buildingAreaId = data.getId();
															break;
														}
													}
												}
												// If building name is not found in database.
												if(!isAvailable)
												{
													errors.add("Please correct invalid building name ("+ building +") at row number : "+rowNum + " and try again later.");
												}
											}

											if(room == null || room.isEmpty()) {
												errors.add("Please provide room name at row number : "+rowNum + " and try again later.");
											}
											else {
												boolean roomAvailable = false;
												Long roomId = null;
												// Getting list of rooms for a building area 
												KeyValueDTO[] roomsArr =  RoomHbn.findRoomsByBuildingId(buildingAreaId);

												if(roomsArr != null && roomsArr.length > 0)
												{
													for(KeyValueDTO data : roomsArr)
													{
														if(data != null && data.getName() != null)
														{
															if(room.equalsIgnoreCase(data.getName()))
															{
																roomAvailable = true;
																roomId = data.getId();
																break;
															}
														}
													}
												}

												// If room name is not found in database.
												if(!roomAvailable)
												{
													errors.add("Please correct invalid room name ("+ room +") at row number : "+rowNum + " and try again later.");
												}
												else
												{
													if(rackPosition == null || rackPosition.isEmpty())
													{
														errors.add("Please provide rack position name at row number : "+rowNum + " and try again later.");
													}
													else
													{
														boolean schrankAvailable = false;
														Long schrankId = null;
														KeyValueDTO[] schranksArr = SchrankHbn.findSchrankByRoomId(roomId);
														if(schranksArr != null && schranksArr.length > 0)
														{
															for(KeyValueDTO data : schranksArr)
															{
																if(data != null && data.getName() != null)
																{
																	if(rackPosition.equalsIgnoreCase(data.getName()))
																	{
																		schrankAvailable = true;
																		schrankId = data.getId();
																		break;
																	}
																}
															}
														}

														if(!schrankAvailable)
														{
															errors.add("Please correct invalid rack position name ("+ rackPosition +") at row number : "+rowNum + " and try again later.");
														}
														else if(schrankId != null)
														{
															obAssetViewDataDTO.setRackId(schrankId);
														}
													}

												}

											}



										}
									}
								}



								//							obAssetViewDataDTO.setSite(getExcelDataByColumnNumber(row, 8));
								//							obAssetViewDataDTO.setSerialNumber(getExcelDataByColumnNumber(row, 8));
								obAssetViewDataDTO.setTechnicalMaster(getExcelDataByColumnNumber(row, 12));
								obAssetViewDataDTO.setTechnicalNumber(getExcelDataByColumnNumber(row, 13));

								String inventoryNumber = getExcelDataByColumnNumber(row, 14);
								if(inventoryNumber != null)
								{
									boolean exists = HardwareComponentHbn.isHardwareComponentByInventoryNumberExists(inventoryNumber.trim());
									if(exists)
									{
										errors.add("Inventory number ("+ inventoryNumber +") at row number "+rowNum + " already exists and please change it and try again later.");
									}
									else
									{
										obAssetViewDataDTO.setInventoryNumber(inventoryNumber.trim());
									}
								}

								String organizationalUnitValue = getExcelDataByColumnNumber(row, 15); 
								if(organizationalUnitValue != null && konto != null)
								{
									if(!organizationalUnitValue.trim().equals(obAssetViewDataDTO.getOrganizationalunit()))
									{
										errors.add("Please input correct Organisation Unit ("+ obAssetViewDataDTO.getOrganizationalunit() +") at row number "+rowNum + " and try again later.");
									}

								}
							} catch(Exception ex)
							{
								ex.printStackTrace();
								logger.error(ex.getMessage(), ex);
								msg.append(ex.getMessage() + " at row number : " +rowNum);
								msg.append("\n");
							}
							
						}
					}
					else
					{
						out.println("<html>");
						out.println("<head>");
						out.println("<title>Servlet upload</title>");  
						out.println("</head>");
						out.println("<body>");
						out.println("<p>Please upload either Excel or CSV file only.</p>"); 
						out.println("</body>");
						out.println("</html>");
						return;
					}
				}
				
			}
			// Displaying list of errors found in Excel or CSV file.
			if(!errors.isEmpty())
			{
				out.println("<html>");
				out.println("<head>");
				out.println("<title>Servlet upload</title>");  
				out.println("</head>");
				out.println("<body>");
				for(String error : errors)
				{
					out.println(error);
					out.println("<br/>");
				}
				out.println("</body>");
				out.println("</html>");
				return;
			}
			else if(!assests.isEmpty())
			{
				
				for(AssetViewDataDTO objAssetViewDataDTO : assests)
				{
					if(cwid != null)
					{
						objAssetViewDataDTO.setCwid(cwid);
					}
					AssetViewDataDTO savedAssetViewDataDTO = HardwareComponentHbn.saveHardwareAsset(objAssetViewDataDTO);
					if(savedAssetViewDataDTO.getError() != null)
					{
						errorsInSaving.add(savedAssetViewDataDTO.getError() + " : Inventory number >> "+savedAssetViewDataDTO.getInventoryNumber());
					}
				}
			}
			
			out.println("File uploaded successfully.");
			out.println("<br/><br/>");
			// Displaying list of errors generating while saving hardware assets.
			if(!errorsInSaving.isEmpty())
			{
				for(String err : errorsInSaving)
				{
					out.println(err);
					out.println("<br/>");
				}
			}
			out.println("</body>");
			out.println("</html>");
		}catch(Exception ex) {
			System.out.println(ex);
			ex.printStackTrace();
		}
	}
	
	/**
	 * This method return Excel data in String at a particular row by column number
	 * @param row
	 * @param columnNumber
	 * @return String - Excel data by column number at a particular row.
	 */
	private String getExcelDataByColumnNumber(Row row, int columnNumber)
	{
		
		if(row == null || columnNumber < 0)
		{
			return null;
		}
		
		String returnValue = null; 
		try {
			Cell cell = row.getCell(columnNumber);

			if(cell == null)
			{
				return null;
			}

			//check the cell type and process accordingly
			switch(cell.getCellType()) {
			case Cell.CELL_TYPE_STRING:
				returnValue = cell.getStringCellValue();
				break;
			case Cell.CELL_TYPE_NUMERIC:
				returnValue = String.valueOf(cell.getNumericCellValue());
				break;
			}
		} catch(Exception ex)
		{
			ex.printStackTrace();
			logger.error(ex.getMessage(), ex);
		}
		return returnValue;
	}
}
