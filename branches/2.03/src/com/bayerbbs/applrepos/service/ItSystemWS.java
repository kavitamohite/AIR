package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.hibernate.BaseHbn;
import com.bayerbbs.applrepos.hibernate.ItSystemHbn;

public class ItSystemWS {
	
	public CiEntityEditParameterOutput createItSystem(ItSystemEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input && (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))) {
			ItSystemDTO dto = getItSystemDTOFromEditInput(input);
			output = ItSystemHbn.createItSystem(input.getCwid(), dto, true);
				

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {
				
				ItSystem itSystem = ItSystemHbn.findItSystemByName(dto.getName());
				output.setCiId(itSystem.getId());
				output.setTableId(AirKonstanten.TABLE_ID_IT_SYSTEM);
				
				dto.setId(itSystem.getId());
				BaseHbn.saveGpscContacts(dto, input.getCwid());

			} else {
				// TODO errorcodes / Texte
				if (null != output.getMessages() && output.getMessages().length > 0) {
					output.setDisplayMessage(output.getMessages()[0]);
				}
			}
		}

		return output;
	}
	
	public CiEntityEditParameterOutput createItSystemByCopy(CiCopyParameterInput copyInput) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		
		output.setResult(AirKonstanten.RESULT_ERROR);
		
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			createByCopyInternal(copyInput, output);
		}
		if (null == output.getDisplayMessage() && null != output.getMessages()) {
			output.setDisplayMessage(output.getMessages()[0]);
		}
		return output;
	}

	public static void createByCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
			ItSystemDTO dto = new ItSystemDTO();
			ItSystem itSystemSource = ItSystemHbn.findItSystemById(copyInput.getCiIdSource());

		if (null != itSystemSource) 
		{
			ItSystemHbn.getItSystem(dto, itSystemSource);
			dto.setId(new Long(0));
			dto.setName(copyInput.getCiNameTarget());
			dto.setAlias(copyInput.getCiAliasTarget());
			
			// set the actual cwid as responsible
			dto.setCiOwner(copyInput.getCwid().toUpperCase());
			dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
			dto.setCiOwnerDelegateHidden(dto.getCiOwnerDelegate());		
			// save / create itSystem
			CiEntityEditParameterOutput createOutput = null;
			ItSystem itSystemTarget = ItSystemHbn.findItSystemByName(dto.getName());
			createOutput = (null != itSystemTarget) ? ItSystemHbn.reactivateItSystem(copyInput.getCwid(), dto, itSystemTarget) : ItSystemHbn.createItSystem(copyInput.getCwid(), dto, null);
			BaseHbn.saveGpscContacts(dto, copyInput.getCwid());
			output.setCiId(createOutput.getCiId());
			output.setResult(createOutput.getResult());
			output.setMessages(createOutput.getMessages());
			output.setDisplayMessage(createOutput.getDisplayMessage());
		}
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
		itSystemDTO.setPriorityLevelId(input.getPriorityLevelId());
		itSystemDTO.setSeverityLevelId(input.getSeverityLevelId());
		itSystemDTO.setBusinessEssentialId(input.getBusinessEssentialId());
		
		//Protection
		itSystemDTO.setItSecSbAvailabilityId(input.getItSecSbAvailabilityId());
		itSystemDTO.setItSecSbAvailabilityTxt(input.getItSecSbAvailabilityTxt());//setItSecSbAvailabilityDescription/getItSecSbAvailabilityDescription
		itSystemDTO.setItSecSbIntegrityId(input.getItSecSbIntegrityId());
		itSystemDTO.setItSecSbIntegrityTxt(input.getItSecSbIntegrityTxt());

		itSystemDTO.setClassInformationId(input.getClassInformationId());
		itSystemDTO.setClassInformationTxt(input.getClassInformationExplanation());
		
		//Compliance
		itSystemDTO.setItset(input.getItset());
		itSystemDTO.setTemplate(input.getTemplate());
		itSystemDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		itSystemDTO.setRefId(input.getRefId());
		
		itSystemDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		itSystemDTO.setRelevanceGR1920(input.getRelevanceGR1920());
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
		
		itSystemDTO.setUpStreamAdd(input.getUpStreamAdd());
		itSystemDTO.setUpStreamDelete(input.getUpStreamDelete());
		itSystemDTO.setDownStreamAdd(input.getDownStreamAdd());
		itSystemDTO.setDownStreamDelete(input.getDownStreamDelete());
		
		return itSystemDTO;
	}
	
	public CiEntityEditParameterOutput saveItSystem(ItSystemEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != input) {
			ItSystemDTO dto = getItSystemDTOFromEditInput(input);
			output = ItSystemHbn.saveItSystem(input.getCwid(), dto);
			
			
			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult()))
				BaseHbn.saveGpscContacts(dto, input.getCwid());
		}
		
		return output;
	}

	//Vandana
	public static void createItsystemByCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			ItSystemDTO dto = new ItSystemDTO();
			ItSystem itSystemSource = ItSystemHbn.findItSystemById(copyInput.getCiIdSource());
			if (null != itSystemSource) {
				ItSystemHbn.getItSystem(dto, itSystemSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegateHidden(dto.getCiOwnerDelegate());	
				// save / create itSystem
				CiEntityEditParameterOutput createOutput = ItSystemHbn.createItSystem(copyInput.getCwid(), dto, null);
				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					ItSystem itSystem = ItSystemHbn.findItSystemByName(copyInput.getCiNameTarget());
					if (null != itSystem) {
                          dto.setId(itSystem.getId());
						
						Long ciId = itSystem.getId();
						ItSystem itSystemTarget = ItSystemHbn.findItSystemById(ciId);
						if (null != itSystemTarget) {
							CiEntityEditParameterOutput temp = ItSystemHbn.copyTtsystem(copyInput.getCwid(),
									itSystemSource.getId(), itSystemTarget.getId(), copyInput.getCiNameTarget(),copyInput.getCiAliasTarget());
							if (null != temp) {
								output.setCiId(temp.getCiId());
								output.setResult(temp.getResult());
								output.setMessages(temp.getMessages());
								output.setDisplayMessage(temp.getDisplayMessage());
							}
							
							
						}
						
					}
				}
				else {
					output.setCiId(createOutput.getCiId());
					output.setResult(createOutput.getResult());
					output.setMessages(createOutput.getMessages());
					output.setDisplayMessage(createOutput.getDisplayMessage());
				}
			}
		}

		if (null == output.getDisplayMessage() && null != output.getMessages()) {
			output.setDisplayMessage(output.getMessages()[0]);
		}
	
		
	}
	
	public CiEntityEditParameterOutput getNextDCNumber()
	{
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		long cdConstant = ItSystemHbn.getMaximumDCNumberInSequence();
		cdConstant++;		
		output.setDcConstant("DC"+String.format("%04d", cdConstant));
		return output;
	}
	
}
