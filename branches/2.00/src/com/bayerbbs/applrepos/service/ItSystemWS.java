package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.hibernate.CiGroupsHbn;
import com.bayerbbs.applrepos.hibernate.CiPersonsHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;

public class ItSystemWS {
	
	protected ItSystemDTO getItSystemDTOFromEditInput(ItSystemEditParameterInput input) {
		ItSystemDTO itSystemDTO = new ItSystemDTO();
		itSystemDTO.setTableId(AirKonstanten.TABLE_ID_IT_SYSTEM);
		itSystemDTO.setCiSubTypeId(input.getCiSubTypeId());
		
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
		itSystemDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription

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
		
		
		itSystemDTO.setGpsccontactSupportGroupHidden(input.getGpsccontactSupportGroupHidden());
		itSystemDTO.setGpsccontactChangeTeamHidden(input.getGpsccontactChangeTeamHidden());
		itSystemDTO.setGpsccontactServiceCoordinatorHidden(input.getGpsccontactServiceCoordinatorHidden());
		itSystemDTO.setGpsccontactEscalationHidden(input.getGpsccontactEscalationHidden());
		itSystemDTO.setGpsccontactCiOwnerHidden(input.getGpsccontactCiOwnerHidden());
		itSystemDTO.setGpsccontactServiceCoordinatorIndivHidden(input.getGpsccontactServiceCoordinatorIndivHidden());
		itSystemDTO.setGpsccontactEscalationIndivHidden(input.getGpsccontactEscalationIndivHidden());
		itSystemDTO.setGpsccontactResponsibleAtCustomerSideHidden(input.getGpsccontactResponsibleAtCustomerSideHidden());
		itSystemDTO.setGpsccontactSystemResponsibleHidden(input.getGpsccontactSystemResponsibleHidden());
		itSystemDTO.setGpsccontactImpactedBusinessHidden(input.getGpsccontactImpactedBusinessHidden()); 

		itSystemDTO.setGpsccontactSupportGroup(input.getGpsccontactSupportGroup());
		itSystemDTO.setGpsccontactChangeTeam(input.getGpsccontactChangeTeam());
		itSystemDTO.setGpsccontactServiceCoordinator(input.getGpsccontactServiceCoordinator());
		itSystemDTO.setGpsccontactEscalation(input.getGpsccontactEscalation());
		itSystemDTO.setGpsccontactCiOwner(input.getGpsccontactCiOwner());
		itSystemDTO.setGpsccontactServiceCoordinatorIndiv(input.getGpsccontactServiceCoordinatorIndiv());
		itSystemDTO.setGpsccontactEscalationIndiv(input.getGpsccontactEscalationIndiv());
		itSystemDTO.setGpsccontactResponsibleAtCustomerSide(input.getGpsccontactResponsibleAtCustomerSide());
		itSystemDTO.setGpsccontactSystemResponsible(input.getGpsccontactSystemResponsible());
		itSystemDTO.setGpsccontactImpactedBusiness(input.getGpsccontactImpactedBusiness()); 
		
		
		return itSystemDTO;
	}
	
	public CiEntityEditParameterOutput saveItSystem(ItSystemEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			ItSystemDTO dto = getItSystemDTOFromEditInput(input);
			output = ItSystemHbn.saveItSystem(input.getCwid(), dto);
			
			
			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult())) {
				try {
					for (String[] grouptype : AirKonstanten.GPSCGROUP_MAPPING) {
						if(grouptype[4].indexOf(dto.getTableId().toString()) > -1) {//IT System GPSC Kontakt?
							char d[] = grouptype[1].toCharArray();
							d[0] = String.valueOf(d[0]).toUpperCase().charAt(0);
							String method = "get" + new String(d);
							String methodHidden = "get" + new String(d) + AirKonstanten.GPSCGROUP_HIDDEN_DESCRIPTOR;

							String gpscContact = (String) ItSystemDTO.class.getMethod(method).invoke(dto);
							String gpscContactHidden = (String) ItSystemDTO.class.getMethod(methodHidden).invoke(dto);
							if (!(AirKonstanten.GPSCGROUP_DISABLED_MARKER.equals(gpscContact)) && !(AirKonstanten.GPSCGROUP_DISABLED_MARKER.equals(gpscContactHidden))) {
								if (AirKonstanten.YES_SHORT.equals(grouptype[2])) { // Individual Contact(s)
									CiPersonsHbn.saveCiPerson(input.getCwid(), dto.getTableId(),
											 dto.getId(), new Long(grouptype[0]), grouptype[3],
											 gpscContactHidden);
								} else { // Group(s)
									CiGroupsHbn.saveCiGroup(input.getCwid(), dto.getTableId(),
											 dto.getId(), new Long(grouptype[0]), grouptype[3],
											 gpscContact);
								}
							}
						}
					}
				} catch (Exception e) {
					// TODO: handle exception
					System.out.println(e.toString());
				}
			}
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
//			if (null == dto.getCiOwner()) {
//				dto.setCiOwner(input.getCwid().toUpperCase());
//				dto.setCiOwnerHidden(input.getCwid().toUpperCase());
//			}
//			if (null == dto.getBusinessEssentialId()) {
//				dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
//			}

			// save / create application
			output = ItSystemHbn.createItSystem(input.getCwid(), dto, true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {
				ItSystem itSystem = ItSystemHbn.findItSystemByName(dto.getName());
				output.setCiId(itSystem.getId());
				output.setTableId(AirKonstanten.TABLE_ID_IT_SYSTEM);
				
				/*
				// get detail
				List<CiBaseDTO> listCi = CiEntitiesHbn.findCisByNameOrAlias(dto.getName(), AirKonstanten.TABLE_ID_IT_SYSTEM, false);
				if (null != listCi && 1 == listCi.size()) {
					Long ciId = listCi.get(0).getId();
					output.setCiId(ciId);
					output.setTableId(AirKonstanten.TABLE_ID_IT_SYSTEM);
				} else {
					// unknown?
					output.setCiId(new Long(-1));
				}*/
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
