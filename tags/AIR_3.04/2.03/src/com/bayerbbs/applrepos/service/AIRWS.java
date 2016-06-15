package com.bayerbbs.applrepos.service;

import java.util.ArrayList;
import java.util.List;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.dto.ItsecUserOptionDTO;
import com.bayerbbs.applrepos.dto.PersonOptionDTO;
import com.bayerbbs.applrepos.dto.RolePersonDTO;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.PersonOptionHbn;

public class AIRWS {

	/**
	 * searches CIs or Applications by Organisation Unit and CI/APP
	 * 
	 * returns all CI's in the ApplicationDTO
	 * 
	 * @param anwParamInp
	 * @return
	 */
	// ApplicationParamOutput
	public CiItemsResultDTO findCIsByOrganisationUnit(ApplicationParameterInput anwParamInp) {

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
		String ciOwnerType = anwParamInp.getCiOwnerType(); // "APP", "CI" oder
															// "ALL"
		String ouQueryMode = anwParamInp.getOuQueryMode(); // "EXAKT" oder
															// "START"

		// ApplicationDTO
		List<CiItemDTO> listAnwendungen = null;

		if (LDAPAuthWS.isLoginValid(anwParamInp.getCwid(), anwParamInp.getToken())) {
			listAnwendungen = CiEntitiesHbn.findCisByOUunit(ciType, ouUnit, ciOwnerType, ouQueryMode,anwParamInp.getSort(),anwParamInp.getDir());
		}

		if (null == listAnwendungen) {
			listAnwendungen = new ArrayList<CiItemDTO>();// ApplicationDTO
		}

		CiItemDTO anwendungen[] = null;// ApplicationDTO

		if (listAnwendungen.size() > (startwert)) {
			List<CiItemDTO> listAnwTemp = new ArrayList<CiItemDTO>();// ApplicationDTO
			long tempCounter = startwert;
			long anzCounter = 0;

			while (tempCounter < listAnwendungen.size() && anzCounter < limit) {
				listAnwTemp.add(listAnwendungen.get((int) tempCounter));
				tempCounter++;
				anzCounter++;
			}

			// weniger CI's / Anwendungen als erwartet
			anwendungen = new CiItemDTO[listAnwTemp.size()];// ApplicationDTO

			int i = 0;
			for (CiItemDTO anw : listAnwTemp) {// ApplicationDTO
				anwendungen[i] = anw;
				i++;
			}

		} else {
			// weniger CI's / Anwendungen als erwartet
			anwendungen = new CiItemDTO[listAnwendungen.size()];// ApplicationDTO

			int i = 0;
			for (CiItemDTO anw : listAnwendungen) {// ApplicationDTO
				anwendungen[i] = anw;
				i++;
			}
		}

		// ApplicationParamOutput anwendungParamOut = new
		// ApplicationParamOutput();
		// anwendungParamOut.setCountResultSet(listAnwendungen.size());
		// anwendungParamOut.setApplicationDTO(anwendungen);
		// return anwendungParamOut;

		CiItemsResultDTO result = new CiItemsResultDTO();
		result.setCiItemDTO(anwendungen);
		result.setCountResultSet(anwendungen.length);
		return result;
	}

	public ItsecUserOptionDTO[] getItsecUserOption(ItsecUserOptionParameter parameter) {
		ItsecUserOptionDTO[] itsecUserOptions = null;
		List<PersonOptionDTO> listPersonOptions = PersonOptionHbn.findPersonOptions(parameter.getCwid());
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

	public ApplicationEditParameterOutput saveUserOption(UserOptionParameterInput editInput) {

		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		if (null != editInput && editInput.isSave() && StringUtils.isNotNullOrEmpty(editInput.getCwid())) {

			List<PersonOptionDTO> listOptions = PersonOptionHbn.findPersonOptionsWithDeleted(editInput.getCwid());

			PersonOptionHbn
					.savePersonOptions(editInput.getCwid(), listOptions, "AIR_CURRENCY", editInput.getCurrency());
			PersonOptionHbn
					.savePersonOptions(editInput.getCwid(), listOptions, "AIR_LANGUAGE", editInput.getLanguage());
			PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_NUMBER_FORMAT",
					editInput.getNumberFormat());
			PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_HELP_ACTIVATE",
					editInput.getHelp());
			PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_SKIP_WIZARD",
					editInput.getSkipWizard());
			PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_TOOLTIP", editInput.getTooltip());
			PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions, "AIR_SHOW_DELETED",
					editInput.getShowDeleted());

		}
		CiEntitiesHbn.findCisByNameOrAlias("BYZREH", false, "CONTAINS", false, "applicationName", "ASC", 10, 100);
		System.out.println("CiEntitiesHbn.findCisByNameOrAlias  calling");

		return output;
	}
	
	/**
	 * @author enqmu 
	 * @param editInput
	 * @return
	 */
	public ApplicationEditParameterOutput saveUserColumnsProfilePreference(
			UserOptionParameterInput editInput) {

		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		if (null != editInput && editInput.isSave()
				&& StringUtils.isNotNullOrEmpty(editInput.getCwid())) {

			List<PersonOptionDTO> listOptions = PersonOptionHbn
					.findPersonOptionsWithDeleted(editInput.getCwid());

			PersonOptionHbn.savePersonOptions(editInput.getCwid(), listOptions,
					"AIR_USER_PROFILE_COLUMNS_PREFERENCE",
					editInput.getUserColumnsPreference());
		}

		return output;
	}


}
