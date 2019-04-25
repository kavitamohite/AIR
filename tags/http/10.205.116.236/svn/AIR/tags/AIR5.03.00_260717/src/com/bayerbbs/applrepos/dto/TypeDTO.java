package com.bayerbbs.applrepos.dto;

public class TypeDTO {
	private Long category3Id;
	private String category3Name;
	private Long partnerId;
	private Long kategory2Id;
	private String query;

	/**
	 * @return the category3Id
	 */
	public Long getCategory3Id() {
		return category3Id;
	}

	/**
	 * @param category3Id
	 *            the category3Id to set
	 */
	public void setCategory3Id(Long category3Id) {
		this.category3Id = category3Id;
	}

	public String getCategory3Name() {
		return category3Name;
	}

	public void setCategory3Name(String category3Name) {
		this.category3Name = category3Name;
	}

	/**
	 * @return the partnerId
	 */
	public Long getPartnerId() {
		return partnerId;
	}

	/**
	 * @param partnerId
	 *            the partnerId to set
	 */
	public void setPartnerId(Long partnerId) {
		this.partnerId = partnerId;
	}

	/**
	 * @return the kategory2Id
	 */
	public Long getKategory2Id() {
		return kategory2Id;
	}

	/**
	 * @param kategory2Id
	 *            the kategory2Id to set
	 */
	public void setKategory2Id(Long kategory2Id) {
		this.kategory2Id = kategory2Id;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

}
