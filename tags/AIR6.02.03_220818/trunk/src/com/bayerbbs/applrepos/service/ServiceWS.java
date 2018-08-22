/**
 * 
 */
package com.bayerbbs.applrepos.service;

import java.util.List;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Service;
import com.bayerbbs.applrepos.domain.ServiceEditParameterInput;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
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
