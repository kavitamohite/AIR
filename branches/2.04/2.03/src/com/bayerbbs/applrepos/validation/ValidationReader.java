package com.bayerbbs.applrepos.validation;

import java.io.File;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


public class ValidationReader {
	private static String AIR_VALIDATION_FILE;
	
	public static void setValidationConfigFile(String filename) {
		AIR_VALIDATION_FILE = filename;
	}

	public HashMap<String, ValidationData> readConfigData() {
		HashMap<String, ValidationData> hmValidation = new HashMap<String, ValidationData>();
		
		try {
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			dbFactory.setValidating(false);
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(new File( AIR_VALIDATION_FILE ));
			doc.getDocumentElement().normalize();

			NodeList paramsList = doc.getElementsByTagName("AttributePropertyItems");
			if (null != paramsList) {
				NodeList propertyList = ((Element) paramsList.item(0)).getElementsByTagName("Identifier");
				
				for (int i = 0; i < propertyList.getLength(); i++) {
					Element currentZeile = (Element) propertyList.item(i);
					String id = getValue(currentZeile, "id");
					String mandatory = getValue(currentZeile, "Mandatory");
					String relevance = getValue(currentZeile, "Relevance");
					String editableIfSource = getValue(currentZeile, "EditableIfSource");
					String useInWizard = getValue(currentZeile, "UseInWizard");
					
					String attributeType = getValue(currentZeile, "attributeType");
					String attributeLength = getValue(currentZeile, "attributeLength");
					String attributeMask = getValue(currentZeile, "attributeMask");
					
					ValidationData data = new ValidationData();
					data.setId(id);
					data.setMandatory(mandatory);
					data.setRelevance(relevance);
					data.setEditableIfSource(editableIfSource);
					data.setUseInWizard(useInWizard);
					data.setAttributeType(attributeType);
					data.setAttributeLength(attributeLength);
					data.setAttributeMask(attributeMask);
					
					hmValidation.put(data.getId() , data);
				}
				// Element elemRequest = (Element) requestList.item(0);
//				getItemAvailability.setRequestname(elemRequest.getAttribute("Name"));
			}
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.toString());
		}
		System.out.println("XML Ende");
		return hmValidation;
	}
	
	protected String getValue(Element currentZeile, String key) {
		String result = null;
		
		if (null != currentZeile) {
			NodeList nodelist = currentZeile.getElementsByTagName(key);
			
			if (null != nodelist && 0 < nodelist.getLength()) {
				Element element = (Element) nodelist.item(0);
				if (null != element) {
					result = element.getTextContent();
				}
			}
			
		}

		return result;
	}

	
}
