/**
 * 
 */
package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.CiComplianceRequest;
import com.bayerbbs.applrepos.domain.Service;
import com.bayerbbs.applrepos.domain.ServiceDTO;
import com.bayerbbs.applrepos.domain.ServiceEditParameterInput;
import com.bayerbbs.applrepos.domain.Ways;
import com.bayerbbs.applrepos.dto.PathwayDTO;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.ComplianceHbn;
import com.bayerbbs.applrepos.hibernate.PathwayHbn;
import com.bayerbbs.applrepos.hibernate.ServiceHbn;

/**
 * @author equuw
 * 
 */
public class ServiceWS {

	public CiEntityEditParameterOutput createService(
			ServiceEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		ErrorCodeManager errorCodeManager = new ErrorCodeManager();
		if (input != null
				&& (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))) {
			if (StringUtils.isNotNullOrEmpty(input.getCwid())) {

				if (input.getId() == null || input.getId() == 0) {
				
					List<Service> services = ServiceHbn.findServiceByNameORAlias(input.getName(), input.getServiceAias());
					if(services.isEmpty()){
						 ServiceHbn.createService(input, output);
						
					}else{
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] {  errorCodeManager.getErrorMessage("11000") });
					}

				} else {
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] {  errorCodeManager.getErrorMessage("101") });
				}

			} else {
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { errorCodeManager.getErrorMessage("100")});
			}

		}

		return output;
	}
	
	
	//eugxs
		//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit

	public static void createServiceByCopyInternal(CiCopyParameterInput copyInput,
			CiEntityEditParameterOutput output) {
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			ServiceDTO dto = new ServiceDTO();
			Service serviceSource = ServiceHbn.findById(copyInput.getCiIdSource());

			if (null != serviceSource) {
				//PathwayHbn.getWays(dto, waySource);
				ServiceHbn.getService(dto, serviceSource);
				dto.setId(new Long(0));
				dto.setName(copyInput.getCiNameTarget());
				dto.setAlias(copyInput.getCiAliasTarget());
				
				// set the actual cwid as responsible
				dto.setCiOwner(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
				dto.setCiOwnerDelegate(serviceSource.getCiOwnerDelegate());
				dto.setCiOwnerDelegateHidden(serviceSource.getCiOwnerDelegate());
				dto.setTemplate(serviceSource.getTemplate());
				
				dto.setRelevanzItsec(serviceSource.getRelevanceITSEC());
				/*--ELERJ ICS--*/
//				dto.setRelevanceICS(serviceSource.getRelevanceICS());
				//EUGXS
				//C0000431412-Adapt AIR compliance part to the new IT security and ICS frameworks to ensure a successful PSR KRITIS audit
				List<CiComplianceRequest> ComplianceIDS = ComplianceHbn.getCiCompliance_request(AirKonstanten.TABLE_ID_SERVICE,serviceSource.getId());

				for(int i =0; i<ComplianceIDS.size(); i++ ){

					if(ComplianceIDS.get(i).getComplianceRequestId() == 5){
						dto.setRelevanceCD3010(AirKonstanten.YES_SHORT);
					}

					if(ComplianceIDS.get(i).getComplianceRequestId() == 6){
						dto.setRelevanceCD3011(AirKonstanten.YES_SHORT);
					}
				}


				if(serviceSource.getRelevanceITSEC() == -1)
					dto.setRelevanceGR1435(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1435(AirKonstanten.NO_SHORT);
				}

				/*if(serviceSource.getRelevanceICS() == -1)
					dto.setRelevanceGR1920(AirKonstanten.YES_SHORT);
				else{
					dto.setRelevanceGR1920(AirKonstanten.NO_SHORT);
				}*/
				
				// save / create itSystem
				dto.setId(serviceSource.getServiceId());
				CiEntityEditParameterOutput createOutput = new CiEntityEditParameterOutput();
				//CiEntityEditParameterOutput createOutput = PathwayHbn.createPathway(copyInput.getCwid(), dto, true);
				createOutput = ServiceHbn.createServiceCopy(copyInput.getCwid(),dto,createOutput);

				if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
					Service service = ServiceHbn.findByName(copyInput.getCiNameTarget());
					if (null != service) {
						dto.setId(service.getId());
						
						Long ciId = service.getId();
						Service serviceTarget = ServiceHbn.findById(ciId);
						
						if (null != serviceTarget) {
							//CiEntityEditParameterOutput temp = PathwayHbn.copyPathway(copyInput.getCwid(), serviceSource.getId(), serviceTarget.getId(), copyInput.getCiNameTarget(), copyInput.getCiAliasTarget());
							CiEntityEditParameterOutput temp = ServiceHbn.copyService(copyInput.getCwid(), serviceSource.getId(), serviceTarget.getId(), copyInput.getCiNameTarget(), copyInput.getCiAliasTarget());
							
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

	


	public CiEntityEditParameterOutput saveService(ServiceEditParameterInput input) {
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();
		String messageSQL=null;//IM0007113591
		
		if(input != null
				&& (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))){			
			if (null != input.getId()
					|| 0 < input.getId().longValue()) {
				ServiceHbn.saveService(input, output);
			}
			if(input.getUpStreamAdd() != null && input.getUpStreamAdd().length() > 0 || input.getUpStreamDelete() != null && input.getUpStreamDelete().length() > 0)
				messageSQL=	CiEntitiesHbn.saveCiRelations(AirKonstanten.TABLE_ID_SERVICE, input.getId(), input.getUpStreamAdd(), input.getUpStreamDelete(), "UPSTREAM", input.getCwid());
			
			//IM0007113591
			if (messageSQL!=null)
			{
				
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { "Relationship Saving Failed Due to DBError" });
			}
		}
		return output;
	}

}
