package com.bayerbbs.applrepos.service;

import java.util.ArrayList;
import java.util.List;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.dto.ApplicationDTO;
import com.bayerbbs.applrepos.dto.ItsecUserOptionDTO;
import com.bayerbbs.applrepos.dto.PersonOptionDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitesHbn;
import com.bayerbbs.applrepos.hibernate.ItsecUserOptionHbn;
import com.bayerbbs.applrepos.hibernate.PersonOptionHbn;

public class AIRWS {

	public final static boolean usePersonOptions = false;	// RFC 8303
	
	
	/**
	 * searches CIs or Applications by Organisation Unit and CI/APP
	 * 
	 * returns all CI's in the ApplicationDTO
	 * 
	 * @param anwParamInp
	 * @return
	 */
	public ApplicationParamOutput findCIsByOrganisationUnit(ApplicationParameterInput anwParamInp) {
		
		Long startwert = anwParamInp.getStart();
		Long limit = anwParamInp.getLimit();
		
		if (null == startwert) {
			startwert = 0L;
		}
		if (null == limit) {
			limit = 20L;
		}
		
		
		String ciType = anwParamInp.getCiType();
		String ouUnit = anwParamInp.getOuUnit(); // "BBS-ITO-SOL-BPS-SEeB"
		String ciOwnerType = anwParamInp.getCiOwnerType(); // "APP", "CI" oder "ALL"
		String ouQueryMode = anwParamInp.getOuQueryMode(); //  "EXAKT" oder "START"

		List<ApplicationDTO> listAnwendungen = null;

		if (LDAPAuthWS.isLoginValid(anwParamInp.getCwid(), anwParamInp.getToken())) {
				listAnwendungen = CiEntitesHbn.findCisByOUunit(ciType, ouUnit, ciOwnerType, ouQueryMode);
		}
		
		
		if (null == listAnwendungen) {
			listAnwendungen = new ArrayList<ApplicationDTO>();
		}

		ApplicationDTO anwendungen[] = null;

		if (listAnwendungen.size() > (startwert)) {
			List<ApplicationDTO> listAnwTemp = new ArrayList<ApplicationDTO>();
			long tempCounter = startwert;
			long anzCounter = 0;
			while (tempCounter < listAnwendungen.size() && anzCounter < limit) {
				listAnwTemp.add(listAnwendungen.get((int) tempCounter));
				tempCounter++;
				anzCounter++;
			}

			// weniger CI's / Anwendungen als erwartet
			anwendungen = new ApplicationDTO[listAnwTemp.size()];

			int i = 0;
			for (final ApplicationDTO anw : listAnwTemp) {
				anwendungen[i] = anw;
				i++;
			}

		} else {
			// weniger CI's / Anwendungen als erwartet
			anwendungen = new ApplicationDTO[listAnwendungen.size()];

			int i = 0;
			for (final ApplicationDTO anw : listAnwendungen) {
				anwendungen[i] = anw;
				i++;
			}
		}

		ApplicationParamOutput anwendungParamOut = new ApplicationParamOutput();
		anwendungParamOut.setCountResultSet(listAnwendungen.size());
		anwendungParamOut.setApplicationDTO(anwendungen);

		return anwendungParamOut;
	}

	public ItsecUserOptionDTO[] getItsecUserOption(ItsecUserOptionParameter parameter) {
		ItsecUserOptionDTO[] itsecUserOptions = null;
		if (usePersonOptions) {
			List<PersonOptionDTO> listPersonOptions= PersonOptionHbn.findPersonOptions(parameter.getCwid());
			itsecUserOptions = new ItsecUserOptionDTO[listPersonOptions.size()];
			for (int i = 0; i < itsecUserOptions.length; i++) {
				ItsecUserOptionDTO temp = new ItsecUserOptionDTO();
				PersonOptionDTO personTemp = listPersonOptions.get(i);
				temp.setItsecUserOptionId(personTemp.getPersonOptionId());
				temp.setItsecUserOptionCWID(personTemp.getCWID());
				temp.setItsecUserOptionInterfaceId(personTemp.getInterfaceId());
				temp.setItsecUserOptionName(personTemp.getName());
				temp.setItsecUserOptionValue(personTemp.getValue());
				itsecUserOptions[i] = temp;
			}
			
		}
		else {
			itsecUserOptions = ItsecUserOptionHbn.getArrayFromList(ItsecUserOptionHbn.findItSecUserOptions(parameter.getCwid()));
		}
		
		return itsecUserOptions;
	}

	public RolePersonDTO[] getRolePerson(ItsecUserOptionParameter parameter) {
		List<RolePersonDTO> listRolePerson = ApplReposHbn.findRolePerson(parameter.getCwid());

		RolePersonDTO[] arrayRP = null;

		if (!listRolePerson.isEmpty()) {
			arrayRP = new RolePersonDTO[listRolePerson.size()];
			for (int i = 0; i < arrayRP.length; i++) {
				arrayRP[i] = listRolePerson.get(i);
			}
		}
		return arrayRP;
	}

	public RolePersonDTO[] getRolePersonBusinessEssentialEditor(ItsecUserOptionParameter parameter) {
		List<RolePersonDTO> listRolePerson = ApplReposHbn.findRolePersonBusinessEssentialEditor(parameter.getCwid());

		RolePersonDTO[] arrayRP = null;

		if (!listRolePerson.isEmpty()) {
			arrayRP = new RolePersonDTO[listRolePerson.size()];
			for (int i = 0; i < arrayRP.length; i++) {
				arrayRP[i] = listRolePerson.get(i);
			}
		}
		return arrayRP;
	}
	

	public ApplicationEditParameterOutput saveUserOption(
			UserOptionParameterInput editInput) {

		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		if (null != editInput && StringUtils.isNotNullOrEmpty(editInput.getCwid())) {
			
			if (usePersonOptions) {
				List<PersonOptionDTO> listOptions = PersonOptionHbn.findPersonOptions(editInput.getCwid());
				
				PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_CURRENCY", editInput.getCurrency());
				PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_LANGUAGE", editInput.getLanguage());
				PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_NUMBER_FORMAT", editInput.getNumberFormat());
				PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_HELP_ACTIVATE", editInput.getHelp());
				PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_SKIP_WIZARD", editInput.getSkipWizard());
				PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_TOOLTIP", editInput.getTooltip());
			}
			else {
				List<ItsecUserOptionDTO> listOptions = ItsecUserOptionHbn.findItSecUserOptions(editInput.getCwid());
				
				ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_CURRENCY", editInput.getCurrency());
				ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_LANGUAGE", editInput.getLanguage());
				ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_NUMBER_FORMAT", editInput.getNumberFormat());
				ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_HELP_ACTIVATE", editInput.getHelp());
				ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_SKIP_WIZARD", editInput.getSkipWizard());
				ItsecUserOptionHbn.saveUserOptions(editInput.getCwid(), listOptions, "AIR_TOOLTIP", editInput.getTooltip());
			}
		}
		
		return output;
	}

}
