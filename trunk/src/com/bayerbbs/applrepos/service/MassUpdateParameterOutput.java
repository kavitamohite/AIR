/**
 * 
 */
package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.MassUpdateAttributeDTO;

/**
 * @author equuw
 *
 */
public class MassUpdateParameterOutput {
	
	
	private MassUpdateAttributeDTO[] massUpdateAttributeDTO;

	/**
	 * @return the massUpdateAttributeDTO
	 */
	public MassUpdateAttributeDTO[] getMassUpdateAttributeDTO() {
		return massUpdateAttributeDTO;
	}

	/**
	 * @param massUpdateAttributeDTO the massUpdateAttributeDTO to set
	 */
	public void setMassUpdateAttributeDTO(
			MassUpdateAttributeDTO[] massUpdateAttributeDTO) {
		this.massUpdateAttributeDTO = massUpdateAttributeDTO;
	}

	

}
