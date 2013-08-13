package com.bayerbbs.applrepos.service;
	
public class CiItemsResultDTO {// implements Serializable
	private long countResultSet;
	private CiItemDTO[] ciItemDTO;
	private String informationText;
	
	public CiItemsResultDTO() {
	}
	
	public long getCountResultSet() {
		return countResultSet;
	}
	public void setCountResultSet(long countResultSet) {
		this.countResultSet = countResultSet;
	}

	public CiItemDTO[] getCiItemDTO() {
		return ciItemDTO;
	}

	public void setCiItemDTO(CiItemDTO[] ciItemDTO) {
		this.ciItemDTO = ciItemDTO;
	}

	public String getInformationText() {
		return informationText;
	}

	public void setInformationText(String informationText) {
		this.informationText = informationText;
	}
}