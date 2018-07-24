/**
 * 
 */
package com.bayerbbs.applrepos.dto;

/**
 * @author equuw
 *
 */
public class DirectLinkCIDTO {
	
	private long id;
	private String name;

	//ETNTX- IM0006852855
	private String type;
	private String completeLink;
	

	

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCompleteLink() {
		return completeLink;
	}

	public void setCompleteLink(String completeLink) {
		this.completeLink = completeLink;
	}

	//ETNTX- IM0006852855
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}
	

}
