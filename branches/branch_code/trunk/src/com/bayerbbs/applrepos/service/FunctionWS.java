/**
 * 
 */
package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiComplianceRequest;
import com.bayerbbs.applrepos.domain.Function;
import com.bayerbbs.applrepos.domain.FunctionDTO;
import com.bayerbbs.applrepos.domain.Ways;
import com.bayerbbs.applrepos.dto.PathwayDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ComplianceHbn;
import com.bayerbbs.applrepos.hibernate.PathwayHbn;
import com.bayerbbs.applrepos.hibernate.functionHbn;

/**
 * @author equuw
 *
 */
public class FunctionWS {
	
	
	public CiEntityEditParameterOutput createFunction(BaseEditParameterInput input) {
		
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		if(null != input &&(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) ){
			FunctionDTO functionDTO = getFunctionDTOFromFromEditInput(input);
			output = functionHbn.createFunction(input.getCwid(), functionDTO, true);			
		}
		return output;
	}
	
	public CiEntityEditParameterOutput saveFunction(BaseEditParameterInput input){
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		if(null != input &&(LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))){
			FunctionDTO functionDTO = getFunctionDTOFromFromEditInput(input);
			output = functionHbn.saveFunction(functionDTO,input.getCwid());
			
		}
		return output;
		
	}
	
	protected FunctionDTO getFunctionDTOFromFromEditInput(BaseEditParameterInput input){
		FunctionDTO functionDTO = new FunctionDTO();
		//functionDTO.setTableId(AirKonstanten.TABLE_ID_SITE);//commented by vandana
		functionDTO.setTableId(AirKonstanten.TABLE_ID_FUNCTION);
		//Specifics
		functionDTO.setId(input.getId());
		functionDTO.setName(input.getName());


		
		//Contacts
		functionDTO.setCiOwner(input.getCiOwner());
		functionDTO.setCiOwnerHidden(input.getCiOwnerHidden());
		functionDTO.setCiOwnerDelegate(input.getCiOwnerDelegate());
		functionDTO.setCiOwnerDelegateHidden(input.getCiOwnerDelegateHidden());


		
		//Compliance
		functionDTO.setItset(input.getItset());
		functionDTO.setTemplate(input.getTemplate());
		functionDTO.setItsecGroupId(input.getItSecGroupId());
		//im BaseEditParameterInput heisst es s/getItSecGroupId, in CiBaseDTO heisst es s/getItsecGroupId 
		//(s vs S !!) Ursprung ApplicationWS.getApplicationDTOFromEditInput() REFAC!!
		functionDTO.setRefId(input.getRefId());
		
		functionDTO.setRelevanceGR1435(input.getRelevanceGR1435());
		functionDTO.setRelevanceGR1920(input.getRelevanceGR1920());
		//EUGXS
		//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
		
		functionDTO.setRelevanceCD3010(input.getRelevanceCD3010());
		functionDTO.setRelevanceCD3011(input.getRelevanceCD3011());
		functionDTO.setGxpFlag(input.getGxpFlag());
		functionDTO.setGxpFlagId(input.getGxpFlag());
		
		return functionDTO;
		
	}
			//EUGXS 
			//IM0008125159 - Cleanup function CI BS-ITO-ITPI-APM-CPS Group head => 18-2,19-2

	public CiEntityEditParameterOutput deleteFunction(CiEntityParameterInput editInput) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != editInput) {
			if (LDAPAuthWS.isLoginValid(editInput.getCwid(), editInput.getToken())) {

				
				output = functionHbn.deleteFunction(editInput.getCwid(), editInput.getCiId());
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}
	//EUGXS
	//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
	
	public static void createFunctionByCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			FunctionDTO dto = new FunctionDTO();
			Function functionSource = functionHbn.findById(copyInput.getCiIdSource());

			if (null != functionSource) {
				functionHbn.getFunction(dto, functionSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegate(functionSource.getCiOwnerDelegate());
				dto.setCiOwnerDelegateHidden(functionSource.getCiOwnerDelegate());
				dto.setTemplate(functionSource.getTemplate());
				
				dto.setRelevanzItsec(functionSource.getRelevanceITSEC());
				dto.setRelevanceICS(functionSource.getRelevanceICS());
				List<CiComplianceRequest> ComplianceIDS = ComplianceHbn.getCiCompliance_request(AirKonstanten.TABLE_ID_FUNCTION,functionSource.getId());

				for(int i =0; i<ComplianceIDS.size(); i++ ){

					if(ComplianceIDS.get(i).getComplianceRequestId() == AirKonstanten.COMPLIANCE_ID_CD3010){
						dto.setRelevanceCD3010(AirKonstanten.YES_SHORT);
					}

					if(ComplianceIDS.get(i).getComplianceRequestId() == AirKonstanten.COMPLIANCE_ID_CD3011){
						dto.setRelevanceCD3011(AirKonstanten.YES_SHORT);
					}
				}


				if(functionSource.getRelevanceITSEC() == -1)
					dto.setRelevanceGR1435(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1435(AirKonstanten.NO_SHORT);
				}

				if(functionSource.getRelevanceICS() == -1)
					dto.setRelevanceGR1920(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1920(AirKonstanten.NO_SHORT);
				}
				
				// save / create itSystem
				//dto.setId(functionSource.getId());
				CiEntityEditParameterOutput createOutput = functionHbn.createFunction(copyInput.getCwid(), dto, true);

				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					Function function = functionHbn.findByName(copyInput.getCiNameTarget());
					if (null != function) {
						dto.setId(function.getId());
						
						Long ciId = function.getId();
						Function functionTarget = functionHbn.findById(ciId);
						
						if (null != functionTarget) {
							CiEntityEditParameterOutput temp = functionHbn.copyFunction(copyInput.getCwid(), functionSource.getId(), functionTarget.getId(), copyInput.getCiNameTarget(), copyInput.getCiAliasTarget());
							
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
}
