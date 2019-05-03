package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.ItsecMassnahmeDetailDTO;
import com.bayerbbs.applrepos.dto.ItsecMassnahmenDTO;
import com.bayerbbs.applrepos.dto.ItsecMassnahmenStatusWertDTO;

public class ItsecMassnahmenParameterOutput {

	private ItsecMassnahmenDTO[] itsecMassnahmenDTO;			// for the list view
	
	private ItsecMassnahmeDetailDTO itsecMassnahmeDetailDTO;	// for the detail / edit page
	
	private ItsecMassnahmenStatusWertDTO[] itsecMassnahmenStatusWerteDTO;	// for the selectbox entry

	public ItsecMassnahmenDTO[] getItsecMassnahmenDTO() {
		return itsecMassnahmenDTO;
	}

	public void setItsecMassnahmenDTO(ItsecMassnahmenDTO[] itsecMassnahmenDTO) {
		this.itsecMassnahmenDTO = itsecMassnahmenDTO;
	}

	public ItsecMassnahmeDetailDTO getItsecMassnahmeDetailDTO() {
		return itsecMassnahmeDetailDTO;
	}

	public void setItsecMassnahmeDetailDTO(
			ItsecMassnahmeDetailDTO itsecMassnahmeDetailDTO) {
		this.itsecMassnahmeDetailDTO = itsecMassnahmeDetailDTO;
	}

	public ItsecMassnahmenStatusWertDTO[] getItsecMassnahmenStatusWerteDTO() {
		return itsecMassnahmenStatusWerteDTO;
	}

	public void setItsecMassnahmenStatusWerteDTO(
			ItsecMassnahmenStatusWertDTO[] itsecMassnahmenStatusWerteDTO) {
		this.itsecMassnahmenStatusWerteDTO = itsecMassnahmenStatusWerteDTO;
	}
	
}
