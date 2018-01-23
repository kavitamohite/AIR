/**
 * 
 */
package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ItSystemNetworkInformationDTO;

/**
 * @author ENLIK
 *
 */
public class ItSytemNetworkInformationOutPut {
	
	private ItSystemNetworkInformationDTO[]  networkInformationDtos;
	/**
	 * @return the networkInformationDtos
	 */
	public ItSystemNetworkInformationDTO[] getNetworkInformationDtos() {
		return networkInformationDtos;
	}

	/**
	 * @param networkInformationDtos the networkInformationDtos to set
	 */
	public void setNetworkInformationDtos(
			ItSystemNetworkInformationDTO[] networkInformationDtos) {
		this.networkInformationDtos = networkInformationDtos;
	}
	
	

}
