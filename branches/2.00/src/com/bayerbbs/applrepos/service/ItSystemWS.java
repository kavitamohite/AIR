package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.dto.CiBaseDTO;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;

public class ItSystemWS {
	
	protected ItSystemDTO getItSystemDTOFromEditInput(ItSystemEditParameterInput input) {
		ItSystemDTO itSystemDTO = new ItSystemDTO();
		
		//Specifics
		itSystemDTO.setId(input.getId());//für ItSystemHbn.saveItSystem
		itSystemDTO.setName(input.getName());//für ItSystemHbn.validateItSystem
		itSystemDTO.setAlias(input.getAlias());
		
		itSystemDTO.setOsNameId(input.getOsNameId());
		itSystemDTO.setClusterCode(input.getClusterCode());
		itSystemDTO.setClusterType(input.getClusterType());
		itSystemDTO.setIsVirtualHardwareClient(input.getIsVirtualHardwareClient());
		itSystemDTO.setIsVirtualHardwareHost(input.getIsVirtualHardwareHost());
		itSystemDTO.setVirtualHardwareSoftware(input.getVirtualHardwareSoftware());
		itSystemDTO.setLifecycleStatusId(input.getLifecycleStatusId());
		itSystemDTO.setEinsatzStatusId(input.getEinsatzStatusId());
		itSystemDTO.setPrimaryFunctionId(input.getPrimaryFunctionId());
		itSystemDTO.setLicenseScanningId(input.getLicenseScanningId());
		
		
		
		//Contacts
		itSystemDTO.setCiOwner(input.getCiOwner());
		itSystemDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		itSystemDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		itSystemDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());

		//Agreements
		itSystemDTO.setSlaId(input.getSlaId());
		itSystemDTO.setServiceContractId(input.getServiceContractId());
		itSystemDTO.setSeverityLevelId(input.getSeverityLevelId());
		itSystemDTO.setBusinessEssentialId(input.getBusinessEssentialId());
		
		//Protection
		itSystemDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		itSystemDTO.setItSecSbAvailabilityDescription(input.getItSecSbAvailabilityDescription());
//		itSystemDTO.setClassInformationId(input.getClassInformationId());
//		itSystemDTO.setClassInformationExplanation(input.getClassInformationExplanation());
		
		//Compliance
		itSystemDTO.setItset(input.getItset());
		itSystemDTO.setTemplate(input.getTemplate());
		itSystemDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		itSystemDTO.setRefId(input.getRefId());
		
		itSystemDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		itSystemDTO.setRelevanceGR1920(input.getRelevanceGR1920());
//		itSystemDTO.setRelevanceICS(input.getRelevanceICS());
//		itSystemDTO.setRelevanzItsec(input.getRelevanzITSEC());
		itSystemDTO.setGxpFlag(input.getGxpFlag());
		itSystemDTO.setGxpFlagId(input.getGxpFlag());
		
		return itSystemDTO;
	}
	
	public CiEntityEditParameterOutput saveItSystem(ItSystemEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			ItSystemDTO dto = getItSystemDTOFromEditInput(input);
			output = ItSystemHbn.saveItSystem(input.getCwid(), dto);
		}
		
		return output;
	}
	
	public CiEntityEditParameterOutput deleteItSystem(ItSystemEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
				ItSystemDTO dto = getItSystemDTOFromEditInput(input);

				output = ItSystemHbn.deleteItSystem(input.getCwid(), dto);
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}

	
	public CiEntityEditParameterOutput createItSystem(ItSystemEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input && (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ) {
			ItSystemDTO dto = getItSystemDTOFromEditInput(input);

			// create Application - fill attributes
			if (null == dto.getCiOwner()) {
				dto.setCiOwner(input.getCwid().toUpperCase());
				dto.setCiOwnerHidden(input.getCwid().toUpperCase());
			}
			if (null == dto.getBusinessEssentialId()) {
				dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
			}

			// save / create application
			output = ItSystemHbn.createItSystem(input.getCwid(), dto, true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {
				// get detail
				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_ROOM, false);
				if (null != listCi && 1 == listCi.size()) {
					Long ciId = listCi.get(0).getId();
					output.setCiId(ciId);
				} else {
					// unknown?
					output.setCiId(new Long(-1));
				}
			} else {
				// TODO errorcodes / Texte
				if (null != output.getMessages() && output.getMessages().length > 0) {
					output.setDisplayMessage(output.getMessages()[0]);
				}
			}
		}

		return output;
	}

}
