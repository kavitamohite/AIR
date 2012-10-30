package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.dto.CurrencyDTO;
import com.bayerbbs.applrepos.dto.GapClassDTO;
import com.bayerbbs.applrepos.dto.ItsecMassnahmeDetailDTO;
import com.bayerbbs.applrepos.dto.ItsecMassnahmenDTO;
import com.bayerbbs.applrepos.dto.ItsecMassnahmenStatusWertDTO;
import com.bayerbbs.applrepos.hibernate.CurrencyHbn;
import com.bayerbbs.applrepos.hibernate.GapClassHbn;
import com.bayerbbs.applrepos.hibernate.ItsecHbn;
import com.bayerbbs.applrepos.hibernate.ItsecMassnahmeStatusHbn;

public class ItsecMassnahmenWS {

	
	/**
	 * finds all itsec massnahmen for one ci
	 * @param input
	 * @return
	 */
	public static ItsecMassnahmenParameterOutput getItsecMassnahmen(ItsecMassnahmenParameterInput input) {

		ItsecMassnahmenParameterOutput output = new ItsecMassnahmenParameterOutput();
		
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {		
		
			String language = input.getLanguage();
			if (null == language || (!language.equals("de") && !language.equals("en"))) {
				language = "de";
			}
			
			
			List<ItsecMassnahmenDTO> listDTO = ItsecHbn.findItsecMassnahmen(input.getTableId(), input.getCiId(), language);
			
			if (null != listDTO && !listDTO.isEmpty()) {
	
				ItsecMassnahmenDTO result[] = null;
	
				result = new ItsecMassnahmenDTO[listDTO.size()];
				
				for (int i = 0; i < result.length; i++) {
					result[i] = listDTO.get(i);
				}
				
				output.setItsecMassnahmenDTO(result);
			}

		}
		
		return output;
	}
	

	/**
	 * finds one detail information
	 * @param input
	 * @return
	 */
	public static ItsecMassnahmenParameterOutput getItsecMassnahmeDetail(ItsecMassnahmenParameterInput input) {

		ItsecMassnahmenParameterOutput output = new ItsecMassnahmenParameterOutput();
		
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
		
			ItsecMassnahmeDetailDTO detailDTO = ItsecHbn.findItsecMassnahmeDetail(input.getItsecGruppenId(), input.getItsecMassnahmenStatusId());
			
			if ( null != detailDTO.getRefTableID() && 0 != detailDTO.getRefTableID().longValue() && null != detailDTO.getRefPKID() 
				&& 0 != detailDTO.getRefPKID().longValue()) {
				// Weiterverlinkt... deshalb Datensatz nachladen...
				detailDTO = ItsecHbn.findItsecMassnahmeDetailWeiterverlinkt(detailDTO.getRefTableID(), detailDTO.getRefPKID(), detailDTO.getMassnahmeGstoolId());
			}
			
			// neue kann nicht abgelöst werden, da spezieller SQL s.o.
			// ItsecMassnahmeDetailDTO detailDTO = ItsecMassnahmeStatusHbn.findDTOById(input.getItsecMassnahmenStatusId());
			
			output.setItsecMassnahmeDetailDTO(detailDTO);
		}
		
		return output;
		
		
	}

	/**
	 * saves an array of ItsecMassnahmeDetailDTO
	 * @param input
	 * @return
	 */
	public static ItsecMassnahmenParameterOutput saveItsecMassnahmenDetails(ItsecMassnahmenParameterInput input) {

		ItsecMassnahmenParameterOutput output = new ItsecMassnahmenParameterOutput();
		
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
		
			boolean result = true;
//			
//			if (null != input.getItsecMassnahmeDetailsDTO()) {
//				ItsecMassnahmeDetailDTO aItsecMassnahmen[] = input.getItsecMassnahmeDetailsDTO();
//				for (int i = 0; i < aItsecMassnahmen.length; i++) {
//	
//					if (result) {
//						ItsecMassnahmeDetailDTO itsecMassnahmeDTO = aItsecMassnahmen[i];
//						if (null != itsecMassnahmeDTO.getItsecMassnahmenStatusId() && null != itsecMassnahmeDTO.getStatusId()) {
//							result = ItsecHbn.saveItsecMassnahmeDetail(itsecMassnahmeDTO);
//						}
//						else {
//							result = false;
//							// TODO set Message
//						}
//					}
//					
//				}
				
				ItsecMassnahmeDetailDTO itsecMassnahmeDTO = input.getItsecMassnahmeDetailsDTO();
				if (null != itsecMassnahmeDTO.getItsecMassnahmenStatusId() && null != itsecMassnahmeDTO.getStatusId()) {
					result = ItsecHbn.saveItsecMassnahmeDetail(itsecMassnahmeDTO);
				} else {
					result = false;
				}
//			}
		}
		
		
		return output;
	}

	/**
	 * saves one ItsecMassnahmeDetailDTO
	 * @param input
	 * @return
	 */
	public ItsecMassnahmenParameterOutput saveItsecMassnahmenDetailComplete(ItsecMassnahmenParameterInput input) {

		ItsecMassnahmenParameterOutput output = new ItsecMassnahmenParameterOutput();
		
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
		
			boolean result = true;
				
			ItsecMassnahmeDetailDTO itsecMassnahmeDTO = input.getItsecMassnahmeDetailsDTO();
			if (null != itsecMassnahmeDTO.getItsecMassnahmenStatusId() && null != itsecMassnahmeDTO.getStatusId()) {
				ItsecMassnahmeStatusHbn.saveItsecMassnahmeFromDTO(itsecMassnahmeDTO.getItsecMassnahmenStatusId(), itsecMassnahmeDTO);
			} else {
				result = false;
			}
			
		}
		
		return output;
	}

	
	
	/**
	 * return the selectbox entries
	 * @param input
	 * @return
	 */
	public static ItsecMassnahmenParameterOutput getItsecMassnahmenStatusWerte(ItsecMassnahmenParameterInput input) {

		ItsecMassnahmenParameterOutput output = new ItsecMassnahmenParameterOutput();
		
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {		

			List<ItsecMassnahmenStatusWertDTO> listDTO = ItsecHbn.findItsecMassnahmenStatusWerte();
		
			if (null != listDTO && !listDTO.isEmpty()) {
				
				ItsecMassnahmenStatusWertDTO result[] = null;
	
				result = new ItsecMassnahmenStatusWertDTO[listDTO.size()];
				
				for (int i = 0; i < result.length; i++) {
					result[i] = listDTO.get(i);
				}
				
				output.setItsecMassnahmenStatusWerteDTO(result);
			}
			
		}
		
		return output;
	}

	public GapClassDTO[] getGapClassList() {
		return GapClassHbn.getArrayFromList(GapClassHbn.listGapClassesHbn());
	}
	

	/**
	 * liefert die verlinkte Massnahme
	 * @param input
	 * @return
	 */
	public static ItsecMassnahmenParameterOutput getLinkedMassnahmeDetail(ItsecMassnahmenParameterInput input) {

		ItsecMassnahmenParameterOutput output = new ItsecMassnahmenParameterOutput();
		
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
		
			ItsecMassnahmeDetailDTO detailDTO = ItsecHbn.findItsecMassnahmeDetailWeiterverlinkt(input.getLinkCiTableId(), input.getLinkCiId(), input.getMassnahmeGstoolId());
			
			if ( null != detailDTO.getRefTableID() && 0 != detailDTO.getRefTableID().longValue() && null != detailDTO.getRefPKID() 
					&& 0 != detailDTO.getRefPKID().longValue()) {
					// Weiterverlinkt... deshalb Datensatz nachladen...
					detailDTO = ItsecHbn.findItsecMassnahmeDetailWeiterverlinkt(detailDTO.getRefTableID(), detailDTO.getRefPKID(), detailDTO.getMassnahmeGstoolId());
				}
				
				// neue kann nicht abgelöst werden, da spezieller SQL s.o.
				// ItsecMassnahmeDetailDTO detailDTO = ItsecMassnahmeStatusHbn.findDTOById(input.getItsecMassnahmenStatusId());
				
			output.setItsecMassnahmeDetailDTO(detailDTO);
		}
		
		return output;
		
		
	}

}
