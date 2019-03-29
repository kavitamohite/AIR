package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiComplianceRequest;
import com.bayerbbs.applrepos.domain.ItSystem;
import com.bayerbbs.applrepos.dto.ItSystemDTO;
import com.bayerbbs.applrepos.hibernate.BaseHbn;
import com.bayerbbs.applrepos.hibernate.ComplianceHbn;
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
		//C0000181270 - Added for Appliance Flag
		System.out.println("input.getIsApplianceFlag()"+input.getIsApplianceFlag());
		
		long appliangeFlag=input.getIsApplianceFlag();
		System.out.println("input.getIsApplianceFlag()"+input.getIsApplianceFlag());
		
		//if (input.getIsApplianceFlag()!=null && input.getIsApplianceFlag().equalsIgnoreCase("-1"))
			//appliangeFlag=-1;
		
		//if (input.getIsApplianceFlag()!=null && input.getIsApplianceFlag().equalsIgnoreCase("0"))
			//appliangeFlag=0;
		
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
		//C0000181270 - Added for Appliance Flag
		itSystemDTO.setIsApplianceFlag(appliangeFlag);
		itSystemDTO.setIsVirtualHardwareHost(input.getIsVirtualHardwareHost());
		itSystemDTO.setVirtualHardwareSoftware(input.getVirtualHardwareSoftware());
		itSystemDTO.setBackupType(input.getBackupType());
		itSystemDTO.setServicePack(input.getServicePackFor());
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
		//EUGXS
		//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
		itSystemDTO.setRelevanceCD3010(input.getRelevanceCD3010());
		itSystemDTO.setRelevanceCD3011(input.getRelevanceCD3011());
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
		System.out.println("1st line createItsystemByCopyInternal");
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			ItSystemDTO dto = new ItSystemDTO();
			System.out.println("1st line createItsystemByCopyInternal");
			ItSystem itSystemSource = ItSystemHbn.findItSystemById(copyInput.getCiIdSource());
			System.out.println("2nd line createItsystemByCopyInternal");
			if (null != itSystemSource) {
				ItSystemHbn.getItSystem(dto, itSystemSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				System.out.println("3rd line createItsystemByCopyInternal");
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegateHidden(dto.getCiOwnerDelegate());	
				dto.setIsApplianceFlag(itSystemSource.getIsApplianceFlag());
				//EUGXS
				//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
				List<CiComplianceRequest> ComplianceIDS = ComplianceHbn.getCiCompliance_request(AirKonstanten.TABLE_ID_IT_SYSTEM,itSystemSource.getId());
				
				for(int i =0; i<ComplianceIDS.size(); i++ ){					
				
					if(ComplianceIDS.get(i).getComplianceRequestId() == 5){
						dto.setRelevanceCD3010(AirKonstanten.YES_SHORT);
					}
					
					if(ComplianceIDS.get(i).getComplianceRequestId() == 6){
						dto.setRelevanceCD3011(AirKonstanten.YES_SHORT);
					}
				}
				
				
				if(itSystemSource.getRelevanceITSEC() == -1)
					dto.setRelevanceGR1435(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1435(AirKonstanten.NO_SHORT);
				}
				
				if(itSystemSource.getRelevanceICS() == -1)
					dto.setRelevanceGR1920(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1920(AirKonstanten.NO_SHORT);
				}
				
				System.out.println("dto.setIsApplianceFlag set while copy"+itSystemSource.getIsApplianceFlag());
				// save / create itSystem
				CiEntityEditParameterOutput createOutput = ItSystemHbn.createItSystem(copyInput.getCwid(), dto, null);
				
				System.out.println("4th line createItsystemByCopyInternal");
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
	
	public ItSytemNetworkInformationOutPut getDNSDetailQIP(CiDetailParameterInput input){
		ItSytemNetworkInformationOutPut informationOutPut = new ItSytemNetworkInformationOutPut();
		
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			informationOutPut = ItSystemHbn.getDNSDetailQIP(input.getCiId());
		
		return informationOutPut;
	}

	public ItSytemNetworkInformationOutPut getNetworkTcpIp(CiDetailParameterInput input) {
		ItSytemNetworkInformationOutPut informationOutPut = new ItSytemNetworkInformationOutPut();
		
		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			informationOutPut = ItSystemHbn.getNetworkTcpIp(input.getCiId());
		return informationOutPut;
	}
	
}
