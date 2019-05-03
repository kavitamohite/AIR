package com.bayerbbs.applrepos.validation;

public class ValidationData {

	private String id; 			// applicationName
	private String mandatory;	// required
	private String relevance;	// strategic
	private String editableIfSource;	// SISec
	private String useInWizard;	// marks if used in wizard
	private String attributeType;
	private String attributeLength;
	private String attributeMask;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMandatory() {
		return mandatory;
	}
	public void setMandatory(String mandatory) {
		this.mandatory = mandatory;
	}
	public String getRelevance() {
		return relevance;
	}
	public void setRelevance(String relevance) {
		this.relevance = relevance;
	}
	public String getEditableIfSource() {
		return editableIfSource;
	}
	public void setEditableIfSource(String editableIfSource) {
		this.editableIfSource = editableIfSource;
	}
	public String getUseInWizard() {
		return useInWizard;
	}
	public void setUseInWizard(String useInWizard) {
		this.useInWizard = useInWizard;
	}
	public String getAttributeType() {
		return attributeType;
	}
	public void setAttributeType(String attributeType) {
		this.attributeType = attributeType;
	}
	public String getAttributeLength() {
		return attributeLength;
	}
	public void setAttributeLength(String attributeLength) {
		this.attributeLength = attributeLength;
	}
	public String getAttributeMask() {
		return attributeMask;
	}
	public void setAttributeMask(String attributeMask) {
		this.attributeMask = attributeMask;
	}
	
}
