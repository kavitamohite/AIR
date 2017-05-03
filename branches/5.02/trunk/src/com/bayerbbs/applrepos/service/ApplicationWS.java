package com.bayerbbs.applrepos.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.ApplicationCat1;
import com.bayerbbs.applrepos.domain.ApplicationCat2;
import com.bayerbbs.applrepos.domain.ApplicationRegion;
import com.bayerbbs.applrepos.dto.ApplicationAccessDTO;
import com.bayerbbs.applrepos.dto.ApplicationContact;
import com.bayerbbs.applrepos.dto.ApplicationContactEntryDTO;
import com.bayerbbs.applrepos.dto.ApplicationContactGroupDTO;
import com.bayerbbs.applrepos.dto.ApplicationContactsDTO;
import com.bayerbbs.applrepos.dto.ApplicationDTO;
import com.bayerbbs.applrepos.dto.AttributeValueDTO;
import com.bayerbbs.applrepos.dto.CiSupportStuffDTO;
import com.bayerbbs.applrepos.dto.ComplianceControlStatusDTO;
import com.bayerbbs.applrepos.dto.HistoryViewDataDTO;
import com.bayerbbs.applrepos.dto.InterfacesDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationCat1Hbn;
import com.bayerbbs.applrepos.hibernate.ApplicationCat2Hbn;
import com.bayerbbs.applrepos.hibernate.ApplicationProcessHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationRegionHbn;
import com.bayerbbs.applrepos.hibernate.AttributeValueHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitiesHbn;
import com.bayerbbs.applrepos.hibernate.CiGroupsHbn;
import com.bayerbbs.applrepos.hibernate.CiPersonsHbn;
import com.bayerbbs.applrepos.hibernate.CiSupportStuffHbn;
import com.bayerbbs.applrepos.hibernate.InterfacesHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;

public class ApplicationWS {


	/**
	 * checks if the name (or alias) is already in usage. Return the count of
	 * entries. This function does not check deleted items.
	 * 
	 * @param input
	 * @return
	 */
	//ApplicationParamOutput
	public CiItemsResultDTO checkAllowedApplicationName(ApplicationParameterInput input) {
		String searchname = input.getQuery();
		List<CiItemDTO> listAnwendungen = null;//ApplicationDTO
		listAnwendungen = CiEntitiesHbn.findExistantCisByNameOrAlias(searchname, false);
		CiItemsResultDTO output = new CiItemsResultDTO();//ApplicationParamOutput
		output.setCountResultSet(listAnwendungen.size());
		
		if (0 != listAnwendungen.size()) {
			output.setInformationText(listAnwendungen.get(0).getApplicationCat1Txt());
		}
		
		return output;
	}

	//ApplicationParamOutput
	public CiItemsResultDTO findApplications(ApplicationSearchParamsDTO input) {//ApplicationParameterInput
		String searchname = input.getCiNameAliasQuery();//getQuery
		Integer startwert = input.getStart();
		Integer limit = input.getLimit();
		String cwid = input.getCwid();
		String searchAction = input.getSearchAction();

		List<CiItemDTO> listAnwendungen = null;//ApplicationDTO
		
		Long anzahlDatensaetze = null;

		if (LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken())) {
			if (null == startwert) {
				startwert = 0;
			}
			if (null == limit) {
				limit = 20;
			}
			
			boolean showDeleted = false;
			if (null != input.getShowDeleted() && AirKonstanten.YES_SHORT.equals(input.getShowDeleted())) {
				showDeleted = true;
			}
			
			
			boolean onlyApplications = false;
			if (null != input.getIsOnlyApplications() && AirKonstanten.STRING_TRUE.equals(input.getIsOnlyApplications())) {//getOnlyapplications
				onlyApplications = true;
			}
			
			if (null == input.getSort()) {
				// default sort
				input.setSort("applicationName");
			}

//			if (null != ouUnit && ouUnit.length() > 0) {
			
			if (AirKonstanten.SEARCH_TYPE_OU_SEARCH.equals(searchAction)) {
//				String ciType = input.getCiTypeId() != null ? Integer.toString(input.getCiTypeId()) : AirKonstanten.STRING_EMPTY;
				String ouUnit = input.getOuUnit(); // "BBS-ITO-SOL-BPS-SEeB"
				String ciOwnerType = input.getCiOwnerType(); // "APP", "CI" oder "ALL"
				String ouQueryMode = input.getOuQueryMode(); //  "EXAKT" oder "START"
				
				// advanced search by ou
				if ("BEGINS_WITH".equals(ouQueryMode)) {
					ouQueryMode = "START";
				}
				
				String ouCiType = input.getOuCiType();
				listAnwendungen = CiEntitiesHbn.findCisByOUunit(ouCiType, ouUnit, ciOwnerType, ouQueryMode,input.getSort(), input.getDir());//ciType
			} else if (AirKonstanten.MY_CIS.equals(searchAction)) {
				if (StringUtils.isNotNullOrEmpty(cwid)) {
					listAnwendungen = CiEntitiesHbn.findMyCisOwner(cwid, input.getSort(), input.getDir(), onlyApplications);
				}
			} else if (AirKonstanten.MY_CIS_SUBSTITUTE.equals(searchAction)) {
				if (StringUtils.isNotNullOrEmpty(cwid)) {
					listAnwendungen = CiEntitiesHbn.findMyCisDelegate(cwid, input.getSort(), input.getDir(), onlyApplications);
				}
			} else if (AirKonstanten.MY_CIS_FOR_DELETE.equals(searchAction)) {
				if (StringUtils.isNotNullOrEmpty(cwid)) {
					listAnwendungen = CiEntitiesHbn.findMyCisForDelete(cwid, input.getSort(), input.getDir(), onlyApplications, input.getCiNameAliasQuery());
				}
			} else {
				if (AirKonstanten.STRING_TRUE.equals(input.getIsAdvSearch())) {
					listAnwendungen = AnwendungHbn.findApplications(searchname, showDeleted, input.getQueryMode(),
						input.getAppOwner(), input.getAppOwnerHidden(), input.getAppOwnerDelegate(), input.getAppOwnerDelegateHidden(), 
						input.getCiOwner(), input.getCiOwnerHidden(), input.getCiOwnerDelegate(), input.getCiOwnerDelegateHidden(),
						onlyApplications, input.getSort(), input.getDir(),
						input.getCiTypeId(), input.getCiSubTypeId(), input.getDescription(),
						input.getOperationalStatusId(), input.getApplicationCat2Id(),
						input.getLifecycleStatusId(), input.getProcessId(), input.getIsTemplate(),
						input.getAppSteward(), input.getAppStewardHidden(), input.getBarRelevance(), input.getOrganisationalScope(),
						input.getItSetId(), input.getItSecGroupId(), input.getSource(), input.getBusinessEssentialId(),
						input.getCiTypeOptions(),input.getItSetOptions(), input.getDescriptionOptions(),
						input.getAppOwnerOptions(), input.getAppOwnerDelegateOptions(), input.getAppStewardOptions(),
						input.getCiOwnerOptions(), input.getCiOwnerDelegateOptions(),
						input.getGeneralUsageOptions(), input.getItCategoryOptions(), input.getLifecycleStatusOptions(),
						input.getOrganisationalScopeOptions(), input.getItSecGroupOptions(),
						input.getProcessOptions(), input.getSourceOptions(), input.getBusinessEssentialOptions()
					);
				} else {
//					boolean showDeleted = true;
					
					listAnwendungen = CiEntitiesHbn.findCisByNameOrAlias(searchname, showDeleted, input.getQueryMode(), onlyApplications, input.getSort(), input.getDir(), startwert, limit);
					anzahlDatensaetze = 0L;
					// Zahl der Datensätze nur direkt in der Datenbank bestimmen, wenn wir (noch) nicht geblättert haben oder das Resultset > als "limit" ist.
					if (null!=listAnwendungen) {
						anzahlDatensaetze = (long) listAnwendungen.size();
					}
					if (startwert != 0L || (long) limit == anzahlDatensaetze) {
						anzahlDatensaetze = CiEntitiesHbn.findCountCisByNameOrAlias(searchname, showDeleted, input.getQueryMode(), onlyApplications);
					}
				}
			}
		}

		if (null == listAnwendungen) {
			listAnwendungen = new ArrayList<CiItemDTO>();//ApplicationDTO
		}

//		ApplicationDTO anwendungen[] = null;
		CiItemDTO[] anwendungen = null;

		if (listAnwendungen.size() > startwert) {
			List<CiItemDTO> listAnwTemp = new ArrayList<CiItemDTO>();//ApplicationDTO
			long tempCounter = startwert;
			long anzCounter = 0;
			
			while (tempCounter < listAnwendungen.size() && anzCounter < limit) {
				listAnwTemp.add(listAnwendungen.get((int) tempCounter));
				tempCounter++;
				anzCounter++;
			}
//
			// weniger Anwendungen als erwartet
			anwendungen = new CiItemDTO[listAnwTemp.size()];//ApplicationDTO

			int i = 0;
			for (CiItemDTO anwendung : listAnwTemp) {//ApplicationDTO
				anwendungen[i] = anwendung;
				i++;
			}

		} else {
			// weniger Anwendungen als erwartet
			anwendungen = new CiItemDTO[listAnwendungen.size()];//ApplicationDTO

			int i = 0;
			for (CiItemDTO anwendung : listAnwendungen) {//ApplicationDTO
				anwendungen[i] = anwendung;
				i++;
			}
		}

		
		
		CiItemsResultDTO output = new CiItemsResultDTO();
		output.setCountResultSet(listAnwendungen.size());
		if (null != anzahlDatensaetze) {
			output.setCountResultSet(anzahlDatensaetze);
		}
		output.setCiItemDTO(anwendungen);
		return output;
		
//		ApplicationParamOutput anwendungParamOut = new ApplicationParamOutput();
//		anwendungParamOut.setCountResultSet(listAnwendungen.size());
//		anwendungParamOut.setApplicationDTO(anwendungen);
//		return anwendungParamOut;
	}

	public ApplicationEditParameterOutput saveApplication(ApplicationEditParameterInput editInput) {
		ApplicationEditParameterOutput output = null;//= new ApplicationEditParameterOutput();
        String mes=null;
		if (null != editInput) {
			output = new ApplicationEditParameterOutput();
			ApplicationDTO dto = getApplicationDTOFromEditInput(editInput);
			output = AnwendungHbn.saveAnwendung(editInput.getCwid(), dto);

			if (!AirKonstanten.RESULT_ERROR.equals(output.getResult())) {
				try {
					// TODO DEBUG Test SupportStuff
					CiSupportStuffHbn.saveCiSupportStuffAll(editInput.getCwid(), dto.getId(),
							dto.getCiSupportStuffUserAuthorizationSupportedByDocumentation(),
							dto.getCiSupportStuffUserAuthorizationProcess(),
							dto.getCiSupportStuffChangeManagementSupportedByTool(),
							dto.getCiSupportStuffUserManagementProcess(),

							dto.getCiSupportStuffApplicationDocumentation(), dto.getCiSupportStuffRootDirectory(),
							dto.getCiSupportStuffDataDirectory(), dto.getCiSupportStuffProvidedServices(),
							dto.getCiSupportStuffProvidedMachineUsers());

					
					if (null != dto.getLicenseUsingRegions()) {
						ApplicationRegionHbn.saveApplicationRegionsAll(editInput.getCwid(), dto.getId(), dto.getLicenseUsingRegions());
					}

					ApplicationProcessHbn.saveApplicationProcessAll(editInput.getCwid(), dto.getId(), dto.getBusinessProcessHidden());

					for (String[] grouptype : AirKonstanten.GPSCGROUP_MAPPING) {
						char d[] = grouptype[1].toCharArray();
						d[0] = String.valueOf(d[0]).toUpperCase().charAt(0);
						String method = "get" + new String(d);
						String gpscContact = (String) ApplicationDTO.class.getMethod(method).invoke(dto);
						String methodHidden = "get" + new String(d) + AirKonstanten.GPSCGROUP_HIDDEN_DESCRIPTOR;
						String gpscContactHidden = (String) ApplicationDTO.class.getMethod(methodHidden).invoke(dto);
						if (!(AirKonstanten.GPSCGROUP_DISABLED_MARKER.equals(gpscContact)) && !(AirKonstanten.GPSCGROUP_DISABLED_MARKER.equals(gpscContactHidden))) {
							if ("Y".equals(grouptype[2])) { // Individual Contact(s)
								CiPersonsHbn.saveCiPerson(editInput.getCwid(), dto.getTableId(),
										 dto.getId(), new Long(grouptype[0]), grouptype[3],
										 gpscContactHidden);
							} else { // Group(s)
								CiGroupsHbn.saveCiGroup(editInput.getCwid(), dto.getTableId(),
										 dto.getId(), new Long(grouptype[0]), grouptype[3],
										 gpscContact);
							}
						}
					}

					System.out.println("cwid inside Application WS  "+ editInput.getCwid());
					
					if(dto.getUpStreamAdd() != null && dto.getUpStreamAdd().length() > 0 || dto.getUpStreamDelete() != null && dto.getUpStreamDelete().length() > 0){
						System.out.println("result in upstream is  "+editInput.getTableId()+" "+dto.getId()+" "+dto.getUpStreamAdd()+" "+dto.getUpStreamDelete());
						 mes = CiEntitiesHbn.saveCiRelations(editInput.getTableId(), dto.getId(), dto.getUpStreamAdd(), dto.getUpStreamDelete(), "UPSTREAM", editInput.getCwid());
					}
					
					if(mes!=null){
						output.setResult(AirKonstanten.RESULT_ERROR);
						//output.setMessages(new String[] {mes});
						output.setMessages(splitError(mes));
					}
					
					if(dto.getDownStreamAdd() != null && dto.getDownStreamAdd().length() > 0 || dto.getDownStreamDelete() != null && dto.getDownStreamDelete().length() > 0){
						if (mes== null){
							
						mes=CiEntitiesHbn.saveCiRelations(editInput.getTableId(), dto.getId(), dto.getDownStreamAdd(), dto.getDownStreamDelete(), "DOWNSTREAM", editInput.getCwid());
						
						}
					
					if(mes!=null){
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(splitError(mes));
					}
					}
					
					
					// Connection higher/lower
//					String cwid = editInput.getCwid();
//					Long applicationId = dto.getApplicationId();
//
//					ApplicationApplicationHbn.saveApplicationApplicationAll(cwid, null, applicationId, dto.getUpStreamAdd(), "ADD");
//					ApplicationApplicationHbn.saveApplicationApplicationAll(cwid, null, applicationId, dto.getUpStreamDelete(), "DELETE");
//					ApplicationApplicationHbn.saveApplicationApplicationAll(cwid, applicationId, null, dto.getDownStreamAdd(), "ADD");
//					ApplicationApplicationHbn.saveApplicationApplicationAll(cwid, applicationId, null, dto.getDownStreamDelete(), "DELETE");
					
					// TODO Connections ITSystem
					// Die heißt pck_Sync_Tools.Support_Anwend_IT_System
					
					// ==========================================================================
					// FUNCTION Support_Anwend_IT_System (pin_APP_ID IN NUMBER,
					//	                                   pin_SPL_ID IN NUMBER,
					//	                                   piv_Quelle IN VARCHAR2,
					//	                                   piv_User IN VARCHAR2) RETURN BOOLEAN;
					//	==========================================================================




				} catch (Exception e) {
					System.out.println("In Exception Application");
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(splitError(e.getMessage()));
					// TODO: handle exception
					System.out.println(e.toString());
				}
			}
		}

		return output;
	}
	
	public String[] splitError(String mes){
		System.out.println("mes "+mes);
		
		
		
		//ArrayList<String> n= new ArrayList<String>();
		if(mes !=null && mes.contains("~")){
			int i=mes.indexOf('~');
			int l=mes.lastIndexOf('~');
			mes=mes.substring(i+1, l) ;
			/*String m[] = mes.split("~");
		n.add(m[0]);
		for(int j=1;j<m.length;j++){
			if(m[j]!=null && !m[j].isEmpty() && ! m[0].equals(m[j])){
				n.add(m[j]);
			}
			else{
				if(("UPSTREAM".equals(n.get(n.size()-1))) || ("DOWNSTREAM".equals(n.get(n.size()-1))) )
					n.remove(n.size()-1);
			}
				
					
				
			}*/
		
		/*for(String s: n){
			System.out.println(" SPlitted value"+s);
		}*/
		return new String[]{mes};
		//return (String[]) n.toArray(new String[n.size()]);
		}
		else{
			System.out.println("In Else");
			return new String[] {mes};
		}
		
	//return mes.split("~");
	}

	public ApplicationEditParameterOutput createApplication(ApplicationEditParameterInput editInput) {
		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		if (null != editInput) {
			ApplicationDTO dto = getApplicationDTOFromEditInput(editInput);
			
			// create Application - fill attributes
			if (null == dto.getCiOwner() || dto.getCiOwner().length() == 0) {//getResponsible
				dto.setCiOwner(editInput.getCwid().toUpperCase());//oder dto.getApplicationOwner() ?
				dto.setCiOwnerHidden(editInput.getCwid().toUpperCase());//oder dto.getApplicationOwnerHidden() ?
			}
			if (null == dto.getBusinessEssentialId()) {
				dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
			}

			// save / create application
			output = AnwendungHbn.createAnwendung(editInput.getCwid(), dto, editInput.getForceOverride(), true);

			if (AirKonstanten.RESULT_OK.equals(output.getResult())) {
				// get detail
				//List<Application> listAnwendung = AnwendungHbn.findApplicationByName(editInput.getName());
				Long applicationId = output.getApplicationId();
				if (null != applicationId && 0 < applicationId) {
					//--- neu seit Wizard RFC 8271 - required Attributes
					
			        ApplicationCat2 applicationCat2 =ApplicationCat2Hbn.findById(dto.getApplicationCat2Id());
			        System.out.println(applicationCat2.getAnwendungKat2Text());
			        ApplicationCat1 applicationCat1 =ApplicationCat1Hbn.findById(applicationCat2.getAnwendungKat1Id());
			        AnwendungHbn.updateDWHTypeAndCategory(applicationCat1.getApplicationCat1En(),applicationCat2.getAnwendungKat2Text(), applicationId);
			        System.out.println(applicationCat1.getApplicationCat1En());
					
					if (null != editInput.getGpsccontactSupportGroupHidden()) {
						CiGroupsHbn.saveCiGroup(editInput.getCwid(), dto.getTableId(),
								applicationId, new Long(1), "SUPPORT GROUP - IM RESOLVER",
										dto.getGpsccontactSupportGroup());//getGpsccontactSupportGroupHidden
					}
					if (null != editInput.getGpsccontactOwningBusinessGroupHidden()) {
						CiGroupsHbn.saveCiGroup(editInput.getCwid(), dto.getTableId(),
								applicationId, new Long(6), "OWNING BUSINESS GROUP",
								dto.getGpsccontactOwningBusinessGroup());//getGpsccontactOwningBusinessGroupHidden
					}
					
					if (null != dto.getLicenseUsingRegions()) {
						ApplicationRegionHbn.saveApplicationRegionsAll(editInput.getCwid(), applicationId, dto.getLicenseUsingRegions());
					}

					ApplicationProcessHbn.saveApplicationProcessAll(editInput.getCwid(), applicationId, dto.getBusinessProcessHidden());

				} else {
					// unknown?
					output.setApplicationId(new Long(-1));
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
	
	
	public CiEntityEditParameterOutput deleteApplication(CiEntityParameterInput editInput) {//ApplicationEditParameterInput
		CiEntityEditParameterOutput output = new CiEntityEditParameterOutput();

		if (null != editInput) {
			if (LDAPAuthWS.isLoginValid(editInput.getCwid(), editInput.getToken())) {

				AnwendungHbn.deleteApplicationApplication(editInput.getCwid(), editInput.getCiId());
				AnwendungHbn.deleteApplicationItSystem(editInput.getCwid(), editInput.getCiId());
				
				output = AnwendungHbn.deleteAnwendung(editInput.getCwid(), editInput.getCiId());
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;
	}
	

//	public ApplicationEditParameterOutput deleteApplication(ApplicationEditParameterInput editInput) {
//		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();
//
//		if (null != editInput) {
//
//			if (LDAPAuthWS.isLoginValid(editInput.getCwid(), editInput.getToken())) {
//				ApplicationDTO dto = getApplicationDTOFromEditInput(editInput);
//
//				AnwendungHbn.deleteApplicationApplication(editInput.getCwid(), dto.getId());
//				AnwendungHbn.deleteApplicationItSystem(editInput.getCwid(), dto.getId());
//				
//				output = AnwendungHbn.deleteAnwendung(editInput.getCwid(), dto);
//			} else {
//				// TODO MESSAGE LOGGED OUT
//			}
//		}
//
//		return output;
//	}

	/**
	 * converts the editInput to the dto
	 * 
	 * @param editInput
	 * @return
	 */
	private ApplicationDTO getApplicationDTOFromEditInput(ApplicationEditParameterInput editInput) {
		ApplicationDTO dto = new ApplicationDTO();
		dto.setId(editInput.getId());
		dto.setTableId(AirKonstanten.TABLE_ID_APPLICATION);

		// Basics
		dto.setName(editInput.getName());
		dto.setAlias(editInput.getAlias());
		dto.setVersion(editInput.getVersion());
		//ENFZM: C0000145157
		//dto.setBarApplicationId(editInput.getBarApplicationId());
		//ENFZM: C0000145157
		dto.setApplicationCat2Id(editInput.getApplicationCat2Id());
		// view - primary function
		dto.setLifecycleStatusId(editInput.getLifecycleStatusId());
		dto.setOperationalStatusId(editInput.getOperationalStatusId());
		dto.setComments(editInput.getComments());
		//ENFZM: C0000145157
		//dto.setBarRelevance(editInput.getBarRelevance());
		//ENFZM: C0000145157
		// TODO business category

		// Agreements
		dto.setSlaId(editInput.getSlaId());
		dto.setPriorityLevelId(editInput.getPriorityLevelId());
		dto.setServiceContractId(editInput.getServiceContractId());
		dto.setSeverityLevelId(editInput.getSeverityLevelId());
		dto.setBusinessEssentialId(editInput.getBusinessEssentialId());

		// contacts
		dto.setCiOwner(editInput.getCiOwner());//setResponsible
		dto.setCiOwnerDelegate(editInput.getCiOwnerDelegate());//setSubResponsible

		dto.setCiOwnerHidden(editInput.getCiOwnerHidden());
		dto.setCiOwnerDelegateHidden(editInput.getCiOwnerDelegateHidden());

		dto.setApplicationOwner(editInput.getApplicationOwner());
		dto.setApplicationSteward(editInput.getApplicationSteward());
		dto.setApplicationOwnerDelegate(editInput.getApplicationOwnerDelegate());

		dto.setApplicationOwnerHidden(editInput.getApplicationOwnerHidden());
		dto.setApplicationStewardHidden(editInput.getApplicationStewardHidden());
		dto.setApplicationOwnerDelegateHidden(editInput.getApplicationOwnerDelegateHidden());
		
		dto.setGpsccontactSupportGroupHidden(editInput.getGpsccontactSupportGroupHidden());
		dto.setGpsccontactChangeTeamHidden(editInput.getGpsccontactChangeTeamHidden());
		dto.setGpsccontactServiceCoordinatorHidden(editInput.getGpsccontactServiceCoordinatorHidden());
		dto.setGpsccontactEscalationHidden(editInput.getGpsccontactEscalationHidden());
		dto.setGpsccontactCiOwnerHidden(editInput.getGpsccontactCiOwnerHidden());
		dto.setGpsccontactOwningBusinessGroupHidden(editInput.getGpsccontactOwningBusinessGroupHidden());
		dto.setGpsccontactImplementationTeamHidden(editInput.getGpsccontactImplementationTeamHidden());
		dto.setGpsccontactServiceCoordinatorIndivHidden(editInput.getGpsccontactServiceCoordinatorIndivHidden());
		dto.setGpsccontactEscalationIndivHidden(editInput.getGpsccontactEscalationIndivHidden());
		dto.setGpsccontactResponsibleAtCustomerSideHidden(editInput.getGpsccontactResponsibleAtCustomerSideHidden());
		dto.setGpsccontactSystemResponsibleHidden(editInput.getGpsccontactSystemResponsibleHidden());
		dto.setGpsccontactImpactedBusinessHidden(editInput.getGpsccontactImpactedBusinessHidden()); 
		dto.setGpsccontactBusinessOwnerRepresentativeHidden(editInput.getGpsccontactBusinessOwnerRepresentativeHidden());

		dto.setGpsccontactSupportGroup(editInput.getGpsccontactSupportGroup());
		dto.setGpsccontactChangeTeam(editInput.getGpsccontactChangeTeam());
		dto.setGpsccontactServiceCoordinator(editInput.getGpsccontactServiceCoordinator());
		dto.setGpsccontactEscalation(editInput.getGpsccontactEscalation());
		dto.setGpsccontactCiOwner(editInput.getGpsccontactCiOwner());
		dto.setGpsccontactOwningBusinessGroup(editInput.getGpsccontactOwningBusinessGroup());
		dto.setGpsccontactImplementationTeam(editInput.getGpsccontactImplementationTeam());
		dto.setGpsccontactServiceCoordinatorIndiv(editInput.getGpsccontactServiceCoordinatorIndiv());
		dto.setGpsccontactEscalationIndiv(editInput.getGpsccontactEscalationIndiv());
		dto.setGpsccontactResponsibleAtCustomerSide(editInput.getGpsccontactResponsibleAtCustomerSide());
		dto.setGpsccontactSystemResponsible(editInput.getGpsccontactSystemResponsible());
		dto.setGpsccontactImpactedBusiness(editInput.getGpsccontactImpactedBusiness()); 
		dto.setGpsccontactBusinessOwnerRepresentative(editInput.getGpsccontactBusinessOwnerRepresentative());
		
		// compliance
		dto.setItset(editInput.getItset());
		dto.setTemplate(editInput.getTemplate());
		dto.setItsecGroupId(editInput.getItSecGroupId());
		dto.setRefId(editInput.getRefId());
		dto.setRelevanceICS(editInput.getRelevanceICS());
		dto.setRelevanzItsec(editInput.getRelevanzItsec());
		dto.setGxpFlagId(editInput.getGxpFlag());
		dto.setGxpFlagTxt(editInput.getGxpFlag());
//		dto.setRiskAnalysisYN(editInput.getRiskAnalysisYN());
		// TODO ITSEC Group
		// ---

		dto.setLicenseTypeId(editInput.getLicenseTypeId());
		dto.setDedicated(editInput.getDedicated());
		dto.setAccessingUserCount(editInput.getAccessingUserCount());
		dto.setAccessingUserCountMeasured(editInput.getAccessingUserCountMeasured());
		dto.setLoadClass(editInput.getLoadClass());
		dto.setServiceModel(editInput.getServiceModel());
		dto.setOrganisationalScope(editInput.getOrganisationalScope());

		dto.setCostRunPa(editInput.getCostRunPa());
		dto.setCostChangePa(editInput.getCostChangePa());
		dto.setCurrencyId(editInput.getCurrencyId());
		dto.setCostRunAccountId(editInput.getCostRunAccountId());
		dto.setCostChangeAccountId(editInput.getCostChangeAccountId());
		dto.setLicenseUsingRegions(editInput.getLicenseUsingRegions());

		dto.setCiSupportStuffUserAuthorizationSupportedByDocumentation(editInput.getCiSupportStuffUserAuthorizationSupportedByDocumentation());
		dto.setCiSupportStuffUserAuthorizationProcess(editInput.getCiSupportStuffUserAuthorizationProcess());
		dto.setCiSupportStuffChangeManagementSupportedByTool(editInput.getCiSupportStuffChangeManagementSupportedByTool());
		dto.setCiSupportStuffUserManagementProcess(editInput.getCiSupportStuffUserManagementProcess());
		dto.setCiSupportStuffApplicationDocumentation(editInput.getCiSupportStuffApplicationDocumentation());
		dto.setCiSupportStuffRootDirectory(editInput.getCiSupportStuffRootDirectory());
		dto.setCiSupportStuffDataDirectory(editInput.getCiSupportStuffDataDirectory());
		dto.setCiSupportStuffProvidedServices(editInput.getCiSupportStuffProvidedServices());
		dto.setCiSupportStuffProvidedMachineUsers(editInput.getCiSupportStuffProvidedMachineUsers());

		dto.setItSecSbAvailabilityId(editInput.getItSecSbAvailabilityId());
		dto.setItSecSbAvailabilityTxt(editInput.getItSecSbAvailabilityTxt());//getItSecSbAvailabilityDescription
		dto.setClassInformationId(editInput.getClassInformationId());
		dto.setClassInformationExplanation(editInput.getClassInformationExplanation());

		
		dto.setCategoryBusinessId(editInput.getCategoryBusinessId());
		dto.setClassDataId(editInput.getClassDataId());


		// business Process
		dto.setBusinessProcess(editInput.getBusinessProcess());
		dto.setBusinessProcessHidden(editInput.getBusinessProcessHidden());
		
		// compliance request
		dto.setRelevanceGR1435(editInput.getRelevanceGR1435());
		dto.setRelevanceGR1920(editInput.getRelevanceGR1920());
		dto.setRelevanceGR2059(editInput.getRelevanceGR2059());
		dto.setRelevanceGR2008(editInput.getRelevanceGR2008());
		
		// connections
		dto.setUpStreamAdd(editInput.getUpStreamAdd());
		dto.setUpStreamDelete(editInput.getUpStreamDelete());
		dto.setDownStreamAdd(editInput.getDownStreamAdd());
		dto.setDownStreamDelete(editInput.getDownStreamDelete());
		
		dto.setItSecSbIntegrityId(editInput.getItSecSbIntegrityId());
		dto.setItSecSbIntegrityTxt(editInput.getItSecSbIntegrityTxt());
		
		return dto;
	}

	/**
	 * delivers the application upstream information
	 * 
	 * @param detailInput
	 * @return
	 */
	public ApplicationViewdataOutput getApplicationUpstream(ApplicationDetailParameterInput detailInput) {

		ApplicationViewdataOutput output = new ApplicationViewdataOutput();

		if (LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			if (null != detailInput.getId()) {
				List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationUpStream(detailInput.getId());

				output.setViewdataDTO(getViewDataArray(listDTO));
			}
		}

		return output;
	}

	/**
	 * delivers the application downstream information
	 * 
	 * @param detailInput
	 * @return
	 */
	public ApplicationViewdataOutput getApplicationDownstream(ApplicationDetailParameterInput detailInput) {

		ApplicationViewdataOutput output = new ApplicationViewdataOutput();

		if (LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			if (null != detailInput.getId()) {
				List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationDownStream(detailInput.getId());

				output.setViewdataDTO(getViewDataArray(listDTO));
			}
		}

		return output;
	}

	/**
	 * delivers the application downstream information
	 * 
	 * @param detailInput
	 * @return
	 */
	public ApplicationViewdataOutput getApplicationProcess(ApplicationDetailParameterInput detailInput) {

		ApplicationViewdataOutput output = new ApplicationViewdataOutput();

		if (LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			if (null != detailInput.getId()) {
				 List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationProcess(detailInput.getId());

				//List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationConnections(detailInput.getId());

				output.setViewdataDTO(getViewDataArray(listDTO));
			}
		}

		return output;
	}

	public ApplicationViewdataOutput getAllConnections(ApplicationDetailParameterInput detailInput) {

		ApplicationViewdataOutput output = new ApplicationViewdataOutput();

		if (LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			if (null != detailInput.getId()) {
				List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationConnections(detailInput.getId());

				output.setViewdataDTO(getViewDataArray(listDTO));
			}
		}

		return output;
	}

	public ApplicationViewdataOutput getApplicationItSystems(ApplicationDetailParameterInput detailInput) {

		ApplicationViewdataOutput output = new ApplicationViewdataOutput();

		if (LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			if (null != detailInput.getId()) {
				List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationItSystems(detailInput.getId());
				output.setViewdataDTO(getViewDataArray(listDTO));
			}
		}

		return output;
	}

	private static ViewDataDTO[] getViewDataArray(List<ViewDataDTO> listDTO) {
		ViewDataDTO aViewDataDTO[] = null;
		if (null != listDTO && !listDTO.isEmpty()) {
			aViewDataDTO = new ViewDataDTO[listDTO.size()];
			for (int i = 0; i < aViewDataDTO.length; i++) {
				aViewDataDTO[i] = listDTO.get(i);
			}
		}
		return aViewDataDTO;
	}

	
	public ApplicationEditParameterOutput createApplicationByCopy(ApplicationCopyParameterInput copyInput) {	
		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();
		output.setResult(AirKonstanten.RESULT_ERROR);
		
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {
			// Erstelle das temporäre Zwischenobjekt für alle CiTypen
			CiCopyParameterInput ciCopyInput = new CiCopyParameterInput();
			ciCopyInput.setToken(copyInput.getToken());
			ciCopyInput.setCwid(copyInput.getCwid());
			ciCopyInput.setTableIdSource(copyInput.getTableIdSource());
			ciCopyInput.setCiIdSource(copyInput.getCiIdSource());
			
			ciCopyInput.setCiNameTarget(copyInput.getCiNameTarget());
			ciCopyInput.setCiAliasTarget(copyInput.getCiAliasTarget());
			
			CiEntityEditParameterOutput outputCI = new CiEntityEditParameterOutput();
			
			switch(copyInput.getTableIdSource().intValue())
			{
				case AirKonstanten.TABLE_ID_APPLICATION:
					ApplicationDTO dto = new ApplicationDTO();
					Application applicationSource = AnwendungHbn.findApplicationById(copyInput.getCiIdSource());
		
					if (null != applicationSource) {
						dto.setId(new Long(0));
						dto.setName(copyInput.getCiNameTarget());
						dto.setAlias(copyInput.getCiAliasTarget());
						
						if (null == dto.getBusinessEssentialId()) {
							dto.setBusinessEssentialId(AirKonstanten.BUSINESS_ESSENTIAL_DEFAULT);
						}
		
						// set the actual cwid as responsible
						dto.setCiOwner(copyInput.getCwid().toUpperCase());
						dto.setCiOwnerHidden(copyInput.getCwid().toUpperCase());
						dto.setCiOwnerDelegate(applicationSource.getSubResponsible());
						dto.setCiOwnerDelegateHidden(applicationSource.getSubResponsible());
						dto.setTemplate(applicationSource.getTemplate());
						
						dto.setRelevanzItsec(applicationSource.getRelevanzITSEC());
						dto.setRelevanceICS(applicationSource.getRelevanceICS());
		
						dto.setRelevance2059(applicationSource.getRelevance2059());
						dto.setRelevance2008(applicationSource.getRelevance2008());

						// save / create application
						boolean neuanlage = false;
						ApplicationEditParameterOutput createOutput = AnwendungHbn.createAnwendung(copyInput.getCwid(), dto, null, neuanlage);
		
						if (AirKonstanten.RESULT_OK.equals(createOutput.getResult())) {
							List<Application> listAnwendung = AnwendungHbn.findApplicationByName(copyInput.getCiNameTarget());
							if (null != listAnwendung && 1 == listAnwendung.size()) {
								// Neuanlage / durch reaktivierten Datensatz
								dto.setId(listAnwendung.get(0).getApplicationId());
								
								Long ciId = listAnwendung.get(0).getApplicationId();
								Application applicationTarget = AnwendungHbn.findApplicationById(ciId);
								
								if (null != applicationTarget) {
									ApplicationEditParameterOutput temp = AnwendungHbn.copyApplication(copyInput.getCwid(), applicationSource.getId(), applicationTarget.getId(), copyInput.getCiNameTarget(), copyInput.getCiAliasTarget());
									
									output.setApplicationId(temp.getApplicationId());
									output.setResult(temp.getResult());
									output.setMessages(temp.getMessages());
									output.setDisplayMessage(temp.getDisplayMessage());
								}
							}
							else {
								// Neuanlage durch komplett neuen Datensatz
								ApplicationEditParameterOutput temp = AnwendungHbn.copyApplication(copyInput.getCwid(), applicationSource.getId(), null, copyInput.getCiNameTarget(), copyInput.getCiAliasTarget());
								
								output.setApplicationId(temp.getApplicationId());
								output.setResult(temp.getResult());
								output.setMessages(temp.getMessages());
								output.setDisplayMessage(temp.getDisplayMessage());							
							}
						}
						else {
							output.setApplicationId(createOutput.getApplicationId());
							output.setResult(createOutput.getResult());
							output.setMessages(createOutput.getMessages());
							output.setDisplayMessage(createOutput.getDisplayMessage());
						}
					}	
					break;
				case AirKonstanten.TABLE_ID_IT_SYSTEM:
					//ItSystemWS.createByCopyInternal(ciCopyInput, outputCI);
					ItSystemWS.createItsystemByCopyInternal(ciCopyInput, outputCI);
					break;
				case AirKonstanten.TABLE_ID_POSITION:
					SchrankWS.createPositionCopyInternal(ciCopyInput, outputCI);
					break;
				case AirKonstanten.TABLE_ID_ROOM:
					RoomWS.createRoomCopyInternal(ciCopyInput, outputCI);
					break;
				case AirKonstanten.TABLE_ID_BUILDING_AREA:
					BuildingWS.createBuildingAreaByCopyInternal(ciCopyInput, outputCI);
					break;
				case AirKonstanten.TABLE_ID_BUILDING:
					BuildingWS.createBuildingByCopyInternal(ciCopyInput, outputCI);
					break;
				case AirKonstanten.TABLE_ID_TERRAIN:
					TerrainWS.createTerrainCopyInternal(ciCopyInput, outputCI);
					break;
				case AirKonstanten.TABLE_ID_SITE:
					StandortWS.createSiteCopyInternal(ciCopyInput, outputCI);
					break;
				case AirKonstanten.TABLE_ID_WAYS:
					WaysWS.createWayByCopyInternal(ciCopyInput, outputCI);
					break;
			}
			

			if (AirKonstanten.TABLE_ID_APPLICATION != copyInput.getTableIdSource().intValue()) {
				// setzen der Rückgabewerte von CI's in das applicationOutput
				output.setResult(outputCI.getResult());
				
				output.setDisplayMessage(outputCI.getDisplayMessage());	// one message, that should be displayed to the user
				
				output.setMessages(outputCI.getMessages());
				
				output.setApplicationId(outputCI.getCiId());
			}
			
		}

		if (null == output.getDisplayMessage() && null != output.getMessages()) {
			output.setDisplayMessage(output.getMessages()[0]);
		}
		
		return output;
	}
	
	public ApplicationDetailParameterOutput getApplication(ApplicationDetailParameterInput detailInput) {
		ApplicationDTO applicationDTO = new ApplicationDTO();
		ApplicationDetailParameterOutput output = new ApplicationDetailParameterOutput();

		if(LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			Application application = AnwendungHbn.findApplicationById(detailInput.getId());

			applicationDTO.setId(application.getApplicationId());
			applicationDTO.setName(application.getApplicationName());
			applicationDTO.setAlias(application.getApplicationAlias());
			applicationDTO.setApplicationCat2Id(application.getApplicationCat2Id());
			applicationDTO.setItsecGroupId(application.getItsecGroupId());
			//evtl. weitere falls diese Methode noch woanders benötigt wird

		}
		
		output.setApplicationDTO(applicationDTO);
		return output;
	}
	
	/**
	 * delivers the application detail information with the acl
	 * 
	 * @param detailInput
	 * @return
	 */
	public ApplicationDetailParameterOutput getApplicationDetail(ApplicationDetailParameterInput detailInput) {
		ApplicationDetailParameterOutput output = new ApplicationDetailParameterOutput();

		ApplicationDTO dto = new ApplicationDTO();
		ApplicationAccessDTO accessDTO = new ApplicationAccessDTO();

		if (LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			Application application = AnwendungHbn.findApplicationById(detailInput.getId());

			if (null != application) {
				dto = AnwendungHbn.getApplicationDetail(detailInput.getId());
				dto.setTemplateReferencedByItem(AirKonstanten.NO_SHORT);
				
				if (null != dto.getTemplate() && !"0".equals(dto.getTemplate())) {
					// it is a template, so see if it is referenced by some ci's
					if (!"0".equals(ApplReposHbn.getCountReferencingTemplates(detailInput.getId()))) {
						dto.setTemplateReferencedByItem(AirKonstanten.YES_SHORT);
					}
					//check this CI is if template then go for is related with other CI or not					
					if ("Y".equals(CiEntitiesHbn.findCIisLinkWithTemplate(detailInput.getId(), AirKonstanten.TABLE_ID_APPLICATION))) {
						dto.setTemplateLinkWithCIs("Y");
					}
					
				}

				if (StringUtils.isNotNullOrEmpty(dto.getCiOwner())) {
					List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(dto.getCiOwner());
					if (null != listPers && 1 == listPers.size()) {
						PersonsDTO tempPers = listPers.get(0);
						dto.setCiOwner(tempPers.getDisplayNameFull());
					}
				}

				if (StringUtils.isNotNullOrEmpty(dto.getCiOwnerDelegate())) {
					List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(dto.getCiOwnerDelegate());
					if (null != listPers && 1 == listPers.size()) {
						PersonsDTO tempPers = listPers.get(0);
						dto.setCiOwnerDelegate(tempPers.getDisplayNameFull());
					}
				}

				if (StringUtils.isNotNullOrEmpty(dto.getApplicationOwner())) {
					List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(dto.getApplicationOwner());
					if (null != listPers && 1 == listPers.size()) {
						PersonsDTO tempPers = listPers.get(0);
						dto.setApplicationOwner(tempPers.getDisplayNameFull());
					}
				}
				
				if (StringUtils.isNotNullOrEmpty(dto.getApplicationSteward())) {
					List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(dto.getApplicationSteward());
					if (null != listPers && 1 == listPers.size()) {
						PersonsDTO tempPers = listPers.get(0);
						dto.setApplicationSteward(tempPers.getDisplayNameFull());
					}
				}

				if (StringUtils.isNotNullOrEmpty(dto.getApplicationOwnerDelegate())) {
					List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(dto.getApplicationOwnerDelegate());
					if (null != listPers && 1 == listPers.size()) {
						PersonsDTO tempPers = listPers.get(0);
						dto.setApplicationOwnerDelegate(tempPers.getDisplayNameFull());
					}
				}

				AccessRightChecker checker = new AccessRightChecker();

				// hier wird geprüft, ob der aktive Anwender über Edit-Zugriffsrechte (über Person, seine Gruppenzugehörigkeit oder globale Adminrechte) verfügt  
				if (checker.isEditable(application.getApplicationId(), new Long(2), detailInput.getCwid(),detailInput.getToken())) {
					dto.setIsEditable(AirKonstanten.YES_SHORT);
				}

				// RFC 7465
				if (checker.isRelevanceOperational(detailInput.getCwid(), detailInput.getToken(), dto.getApplicationCat1Id(), application)) {
					accessDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
				} else {
					accessDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
				}

				// RFC 9101 Erweiterung "AIR Infrastructure Manager"
				long applCat1Id = dto.getApplicationCat1Id().longValue();
				if (AirKonstanten.APPLICATION_CAT1_APPLICATION.longValue() == applCat1Id) {
					// nur für CI's Typ = Anwendung
					if (checker.isRelevanceStrategic(detailInput.getCwid(), detailInput.getToken(), dto.getApplicationCat1Id(), application)) {
						accessDTO.setRelevanceStrategic(AirKonstanten.YES_SHORT);
					} else {
						accessDTO.setRelevanceStrategic(AirKonstanten.NO_SHORT);
					}
				}
				else if (AirKonstanten.APPLICATION_CAT1_COMMON_SERVICE.longValue() == applCat1Id ||
						 AirKonstanten.APPLICATION_CAT1_COMMON_MIDDLEWARE.longValue() == applCat1Id ||
						 AirKonstanten.APPLICATION_CAT1_COMMON_APPLICATIONPLATFORM.longValue() == applCat1Id) {

					if (AirKonstanten.NO_SHORT.equals(accessDTO.getRelevanceOperational())) {
						// Abfrage Infrastructure Manager
//						if (checker.isEditableRoleInfrastructureManager(detailInput.getCwid())) {
//							accessDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
//						}
						if (checker.isRelevanceOperational(detailInput.getCwid(), detailInput.getToken(), dto.getApplicationCat1Id(), application)) {
							accessDTO.setRelevanceOperational(AirKonstanten.YES_SHORT);
						}
					}
					
					// diese CI's haben keine Trennung zwischen Operational und Strategic
					// deshalb setzen wir hier beide Berechtigungen gleich
					accessDTO.setRelevanceStrategic(accessDTO.getRelevanceOperational());
				}
				else {

					// alle anderen CI's haben keine Trennung, z.B. Raum
					// deshalb setzen wir hier beide Berechtigungen gleich
					accessDTO.setRelevanceStrategic(accessDTO.getRelevanceOperational());
				}
				

				if (StringUtils.isNotNullOrEmpty(application.getInsertQuelle())) {
					if (AirKonstanten.YES_SHORT.equals(dto.getIsEditable())) {

						if (AirKonstanten.INSERT_QUELLE_SISEC.equals(application.getInsertQuelle())
								|| AirKonstanten.APPLICATION_GUI_NAME.equals(application.getInsertQuelle())) {
							// for the application itself, all are editable
							accessDTO.setAllEditable();
						}
						else if (AirKonstanten.INSERT_QUELLE_GSDB.equals(application.getInsertQuelle()) && AirKonstanten.SERVICE_ENVIRONMENT_OWNER_SE_BCBS.equals(application.getServiceEnvironmentOwner())) {
							// GSDB and SE_BCBS is not editable RFC 9176
							accessDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
							accessDTO.setRelevanceStrategic(AirKonstanten.NO_SHORT);
							dto.setIsEditable(AirKonstanten.NO_SHORT);
							dto.setMessageText("editInGPSC");
						} else {
							InterfacesDTO interfaceDto = InterfacesHbn.findInterfacesByInterfaceToken(application.getInsertQuelle());
							
							if (StringUtils.isNotNullOrEmpty(interfaceDto.getSisecEditable()) && null != interfaceDto) {
								String allRights = interfaceDto.getSisecEditable();
								if (-1 != allRights.indexOf("License_Scanning")) {
									accessDTO.setLicense_Scanning(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Responsible")) {
									accessDTO.setResponsible(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Sub_Responsible")) {
									accessDTO.setSub_Responsible(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Relevance_Ics")) {
									accessDTO.setRelevance_Ics(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Relevanz_Itsec")) {
									accessDTO.setRelevanz_Itsec(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Gxp_Flag")) {
									accessDTO.setGxp_Flag(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_Gruppe_Id")) {
									accessDTO.setItsec_Gruppe_Id(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Sample_Test_Date")) {
									accessDTO.setSample_Test_Date(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Sample_Test_Result")) {
									accessDTO.setSample_Test_Result(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Sla_Id")) {
									accessDTO.setSla_Id(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Service_Contract_Id")) {
									accessDTO.setService_Contract_Id(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Priority_Level_Id")) {
									accessDTO.setPriority_Level_Id(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Severity_Level_Id")) {
									accessDTO.setSeverity_Level_Id(AirKonstanten.YES_SHORT);
								}

								// business essential only by group right

								if (-1 != allRights.indexOf("Itsec_SB_Integ_ID")) {
									accessDTO.setItsec_SB_Integ_ID(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Integ_Txt")) {
									accessDTO.setItsec_SB_Integ_Txt(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Verfg_ID")) {
									accessDTO.setItsec_SB_Verfg_ID(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Verfg_Txt")) {
									accessDTO.setItsec_SB_Verfg_Txt(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Vertr_ID")) {
									accessDTO.setItsec_SB_Vertr_ID(AirKonstanten.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Vertr_Txt")) {
									accessDTO.setItsec_SB_Vertr_Txt(AirKonstanten.YES_SHORT);
								}
							}
						}
					}
				}

				// ci support stuff
				// ================
				readAndFillCiStuff(dto, application);
				
				// compliance
				Long releItsec = dto.getRelevanzItsec();
				Long releICS = dto.getRelevanceICS();
				Long rele2059 = dto.getRelevance2059();
				Long rele2008 = dto.getRelevance2008();
				
				if (-1 == releItsec) {
					dto.setRelevanceGR1435(AirKonstanten.YES_SHORT);
				}
				else if (0 == releItsec) {
					dto.setRelevanceGR1435(AirKonstanten.NO_SHORT);
				}
				if (-1 == releICS) {
					dto.setRelevanceGR1920(AirKonstanten.YES_SHORT);
				}
				else if (0 == releICS) {
					dto.setRelevanceGR1920(AirKonstanten.NO_SHORT);
				}
				if (-1 == rele2059) {
					dto.setRelevanceGR2059(AirKonstanten.YES_SHORT);
				}
				else if (0 == rele2059) {
					dto.setRelevanceGR2059(AirKonstanten.NO_SHORT);
				}
				if (-1 == rele2008) {
					dto.setRelevanceGR2008(AirKonstanten.YES_SHORT);
				}
				else if (0 == rele2008) {
					dto.setRelevanceGR2008(AirKonstanten.NO_SHORT);
				}

				
				
				// licenseUsingRegions
				// ===================
				StringBuffer licenseUsingRegions = new StringBuffer();
				List<ApplicationRegion> listApplicationRegion = ApplicationRegionHbn.findCurrentApplicationRegion(detailInput.getId());

				if (null != listApplicationRegion && !listApplicationRegion.isEmpty()) {
					for (ApplicationRegion applRegion : listApplicationRegion) {
						if (0 < licenseUsingRegions.length()) {
							licenseUsingRegions.append(",");
						}
						licenseUsingRegions.append(applRegion.getRegionId());
					}
				}

				dto.setLicenseUsingRegions(licenseUsingRegions.toString());
			}

			// the attribute business essential is only editable for users
			// with the role "BusinessEssential-Editor"
			// so we have to check it here
			String count = ApplReposHbn.getCountFromRoleNameAndCwid(AirKonstanten.ROLE_BUSINESS_ESSENTIAL_EDITOR, detailInput.getCwid(),detailInput.getToken());
			if (null != count && !"0".equals(count)) {
				accessDTO.setBusiness_Essential_Id(AirKonstanten.YES_SHORT);
				// if we can edit the business essential, we can edit the ci
				dto.setIsEditable(AirKonstanten.YES_SHORT);
			} else {
				accessDTO.setBusiness_Essential_Id(AirKonstanten.NO_SHORT);
			}

			// DELETED Application
			if (null != application && StringUtils.isNotNullOrEmpty(application.getDeleteQuelle())) {
				// der Datensatz ist löschmarkiert und darf nicht editiert werden!
				// auch nicht vom Admin!
				accessDTO.setRelevanceOperational(AirKonstanten.NO_SHORT);
				accessDTO.setRelevanceStrategic(AirKonstanten.NO_SHORT);
				accessDTO.setBusiness_Essential_Id(AirKonstanten.NO_SHORT);
				dto.setIsEditable(AirKonstanten.NO_SHORT);
				dto.setMessageText("deleted");
			}

		
		} // end of if valid session

		
		// Sonderverarbeitung für Datenbereinigung BAR ID RFC 9397
		
		//ENFZM: C0000145157
		/*if (null != dto && ((null == dto.getBarRelevance() || "N".equals(dto.getBarRelevance()) && null != dto.getBarApplicationId()))) {
			// BAR ID ist gefüllt, aber muss leer sein.
			AnwendungHbn.cleanBARApplicationID(detailInput.getCwid(), dto);
			dto.setBarApplicationId(null);
		}*/
		//ENFZM: C0000145157
		
		output.setApplicationDTO(dto);
		output.setApplicationAccessDTO(accessDTO);

		return output;
	}


	/**
	 * reads and fills the ci stuff related data. The empty values will be set
	 * as empty string.
	 * 
	 * @param dto
	 * @param application
	 */
	private void readAndFillCiStuff(ApplicationDTO dto, Application application) {
		Long ciId = application.getApplicationId();
		CiSupportStuffDTO supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				AirKonstanten.TABLE_ID_APPLICATION, ciId,
				AirKonstanten.CI_SUPPORT_STUFF_TYPE_UserAuthorizationSupportedByDocumentation);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffUserAuthorizationSupportedByDocumentation(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				AirKonstanten.TABLE_ID_APPLICATION, ciId,
				AirKonstanten.CI_SUPPORT_STUFF_TYPE_UserAuthorizationProcess);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffUserAuthorizationProcess(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				AirKonstanten.TABLE_ID_APPLICATION, ciId,
				AirKonstanten.CI_SUPPORT_STUFF_TYPE_ChangeManagementSupportedByTool);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffChangeManagementSupportedByTool(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				AirKonstanten.TABLE_ID_APPLICATION, ciId,
				AirKonstanten.CI_SUPPORT_STUFF_TYPE_UserManagementProcess);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffUserManagementProcess(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				AirKonstanten.TABLE_ID_APPLICATION, ciId,
				AirKonstanten.CI_SUPPORT_STUFF_TYPE_ApplicationDocumentation);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffApplicationDocumentation(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				AirKonstanten.TABLE_ID_APPLICATION, ciId,
				AirKonstanten.CI_SUPPORT_STUFF_TYPE_RootDirectory);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffRootDirectory(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				AirKonstanten.TABLE_ID_APPLICATION, ciId,
				AirKonstanten.CI_SUPPORT_STUFF_TYPE_DataDirectory);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffDataDirectory(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				AirKonstanten.TABLE_ID_APPLICATION, ciId,
				AirKonstanten.CI_SUPPORT_STUFF_TYPE_ProvidedServices);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffProvidedServices(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				AirKonstanten.TABLE_ID_APPLICATION, ciId,
				AirKonstanten.CI_SUPPORT_STUFF_TYPE_ProvidedMachineUsers);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffProvidedMachineUsers(supportStuffDTO.getCiSupportStuffValue());
		}

		// quickhack
		if (null == dto.getCiSupportStuffUserAuthorizationSupportedByDocumentation()) {
			dto.setCiSupportStuffUserAuthorizationSupportedByDocumentation(AirKonstanten.STRING_EMPTY);
		}
		if (null == dto.getCiSupportStuffUserAuthorizationProcess()) {
			dto.setCiSupportStuffUserAuthorizationProcess(AirKonstanten.STRING_EMPTY);
		}
		if (null == dto.getCiSupportStuffChangeManagementSupportedByTool()) {
			dto.setCiSupportStuffChangeManagementSupportedByTool(AirKonstanten.STRING_EMPTY);
		}
		if (null == dto.getCiSupportStuffUserManagementProcess()) {
			dto.setCiSupportStuffUserManagementProcess(AirKonstanten.STRING_EMPTY);
		}
		if (null == dto.getCiSupportStuffApplicationDocumentation()) {
			dto.setCiSupportStuffApplicationDocumentation(AirKonstanten.STRING_EMPTY);
		}
		if (null == dto.getCiSupportStuffRootDirectory()) {
			dto.setCiSupportStuffRootDirectory(AirKonstanten.STRING_EMPTY);
		}
		if (null == dto.getCiSupportStuffDataDirectory()) {
			dto.setCiSupportStuffDataDirectory(AirKonstanten.STRING_EMPTY);
		}
		if (null == dto.getCiSupportStuffProvidedServices()) {
			dto.setCiSupportStuffProvidedServices(AirKonstanten.STRING_EMPTY);
		}
		if (null == dto.getCiSupportStuffProvidedMachineUsers()) {
			dto.setCiSupportStuffProvidedMachineUsers(AirKonstanten.STRING_EMPTY);
		}
	}

	/**
	 * delivers the grouped contacts for the ci application
	 * 
	 * @param contactsInput
	 * @return
	 */
	public ApplicationContactsParameterOutput getApplicationContacts(ApplicationContactsParameterInput input) {
		ApplicationContactsParameterOutput output = new ApplicationContactsParameterOutput();

		ApplicationContactsDTO applicationContactsDTO = new ApplicationContactsDTO();

		List<ApplicationContact> listContacts = AnwendungHbn.findApplicationContacts(input.getApplicationId(), input.getTableId());

		String lastGroupTypeName = AirKonstanten.STRING_EMPTY;

		ArrayList<ApplicationContactGroupDTO> listGroups = new ArrayList<ApplicationContactGroupDTO>();
		ArrayList<ApplicationContactEntryDTO> listEntries = new ArrayList<ApplicationContactEntryDTO>();
		ApplicationContactGroupDTO group = new ApplicationContactGroupDTO();

		Iterator<ApplicationContact> itContacts = listContacts.iterator();

		ApplicationContact contact = null;
		ApplicationContactEntryDTO entry = new ApplicationContactEntryDTO();

		while (itContacts.hasNext()) {
			contact = itContacts.next();

			if (!lastGroupTypeName.equals(contact.getGroupTypeName()) || !itContacts.hasNext()) {
				if ("".equals(lastGroupTypeName)) {
					// handle the first group - nothing more to do
					group.setGroupTypeId(contact.getGroupTypeId());
					group.setGroupTypeName(contact.getGroupTypeName());
					group.setIndividualContactYN(contact.getIndividualContactYN());
					group.setMinContacts(contact.getMinContacts());
					group.setMaxContacts(contact.getMaxContacts());
					
					lastGroupTypeName = contact.getGroupTypeName();
					
				} else {
					if (null != entry) {
						listEntries.add(entry);
					}
					// the group is finished - set entries
					ApplicationContactEntryDTO temp[] = new ApplicationContactEntryDTO[listEntries.size()];
					for (int i = 0; i < temp.length; i++) {
						temp[i] = listEntries.get(i);
					}
					group.setApplicationContactEntryDTO(temp);
					listGroups.add(group);
					lastGroupTypeName = contact.getGroupTypeName();
					// new group
					group = new ApplicationContactGroupDTO();
					group.setGroupTypeId(contact.getGroupTypeId());
					group.setGroupTypeName(contact.getGroupTypeName());
					group.setIndividualContactYN(contact.getIndividualContactYN());
					group.setMinContacts(contact.getMinContacts());
					group.setMaxContacts(contact.getMaxContacts());

					listEntries = new ArrayList<ApplicationContactEntryDTO>();
					entry = new ApplicationContactEntryDTO();

				}
			}
			if (null != contact.getCwid()) { 
				// contact has valid entry
				//entry = new ApplicationContactEntryDTO();
				entry.setCwid(contact.getCwid());
				StringBuffer sb = new StringBuffer();
				sb.append(contact.getPersonName());
				sb.append(" (").append(contact.getCwid()).append(")");
				entry.setPersonName(sb.toString());
			}
				// entry.setPersonName(contact.getPersonName());
			if ( null != contact.getGroupName()) {
				entry.setGroupId(contact.getGroupId().toString());
				entry.setGroupName(contact.getGroupName());
			}

		}

        
		// create the result (array)
		group.setApplicationContactEntryDTO(new ApplicationContactEntryDTO[]{entry});
		listGroups.add(group);
		ApplicationContactGroupDTO temp[] = new ApplicationContactGroupDTO[listGroups.size()];
		for (int i = 0; i < temp.length; i++) {
			temp[i] = listGroups.get(i);
		}

		applicationContactsDTO.setApplicationContactGroupDTO(temp);

		output.setApplicationContactsDTO(applicationContactsDTO);

		return output;
	}

	/**
	 * delivers the ApplicationComplianceControlStatus for the ci application
	 * 
	 * @param contactsInput
	 * @return
	 */
	public ComplianceControlStatusDTO[] getApplicationComplianceControlStatus(
			ApplicationContactsParameterInput contactsInput) {

		Integer tableId = AirKonstanten.TABLE_ID_APPLICATION;

		ComplianceControlStatusDTO aControls[] = null;

		if (null != contactsInput.getApplicationId()) {
		
			List<ComplianceControlStatusDTO> listControls = ApplReposHbn.getComplianceControlStatus(tableId,
					contactsInput.getApplicationId());
	
	
			if (null != listControls && !listControls.isEmpty()) {
				aControls = new ComplianceControlStatusDTO[listControls.size()];
				for (int i = 0; i < listControls.size(); i++) {
					aControls[i] = listControls.get(i);
				}
			}
			
		}
		return aControls;
	}

	
	public HistoryViewDataDTO[] getApplicationHistory(ApplicationDetailParameterInput detailInput) {
		
		HistoryViewDataDTO[] arrayHist = null;

		if (null != detailInput.getId() && 0 < detailInput.getId().longValue()) {
		
			List<HistoryViewDataDTO> listHistory = AnwendungHbn.findApplicationHistory(detailInput.getTableId() , detailInput.getId());
			
			if (!listHistory.isEmpty()) {
				arrayHist = new HistoryViewDataDTO[listHistory.size()];
				for (int i = 0; i < arrayHist.length; i++) {
					arrayHist[i] = listHistory.get(i);
				}
			}
		}
		return arrayHist;
	}

	public AttributeValueDTO[] getAttributeValue(ApplicationParameterInput input){
		List<AttributeValueDTO> values = AttributeValueHbn.listAttributeValue();
		AttributeValueDTO blank = new AttributeValueDTO();
		blank.setAttributeId(Long.MAX_VALUE);
		blank.setId(Long.MAX_VALUE);
		blank.setName("None");
		AttributeValueDTO blank1 = new AttributeValueDTO();
		blank1.setSelectable(true);
		blank1.setAttributeId(null);
		blank1.setId(null);
		blank1.setName("");
		values.add(0, blank1);
		values.add(blank);
		return values.toArray(new AttributeValueDTO[values.size()]);
	}
}
