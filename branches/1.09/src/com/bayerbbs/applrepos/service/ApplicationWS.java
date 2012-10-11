package com.bayerbbs.applrepos.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.ApplicationRegion;
import com.bayerbbs.applrepos.dto.ApplicationAccessDTO;
import com.bayerbbs.applrepos.dto.ApplicationContact;
import com.bayerbbs.applrepos.dto.ApplicationContactEntryDTO;
import com.bayerbbs.applrepos.dto.ApplicationContactGroupDTO;
import com.bayerbbs.applrepos.dto.ApplicationContactsDTO;
import com.bayerbbs.applrepos.dto.ApplicationDTO;
import com.bayerbbs.applrepos.dto.CiSupportStuffDTO;
import com.bayerbbs.applrepos.dto.ComplianceControlStatusDTO;
import com.bayerbbs.applrepos.dto.HistoryViewDataDTO;
import com.bayerbbs.applrepos.dto.InterfacesDTO;
import com.bayerbbs.applrepos.dto.PersonsDTO;
import com.bayerbbs.applrepos.dto.ViewDataDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationApplicationHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationProcessHbn;
import com.bayerbbs.applrepos.hibernate.ApplicationRegionHbn;
import com.bayerbbs.applrepos.hibernate.CiEntitesHbn;
import com.bayerbbs.applrepos.hibernate.CiGroupsHbn;
import com.bayerbbs.applrepos.hibernate.CiPersonsHbn;
import com.bayerbbs.applrepos.hibernate.CiSupportStuffHbn;
import com.bayerbbs.applrepos.hibernate.InterfacesHbn;
import com.bayerbbs.applrepos.hibernate.PersonsHbn;

public class ApplicationWS {

	// request functions
	private static final String MY_CIS_SUBSTITUTE = "myCisSubstitute";
	private static final String MY_CIS = "myCis";
	private static final String MY_CIS_FOR_DELETE = "myCisForDelete";

	/**
	 * checks if the name (or alias) is already in usage. Return the count of
	 * entries. This function does not check deleted items.
	 * 
	 * @param anwParamInp
	 * @return
	 */
	public ApplicationParamOutput checkAllowedApplicationName(ApplicationParameterInput anwParamInp) {

		String searchname = anwParamInp.getQuery();
		List<ApplicationDTO> listAnwendungen = null;
		listAnwendungen = CiEntitesHbn.findExistantCisByNameOrAlias(searchname, false);
		ApplicationParamOutput output = new ApplicationParamOutput();
		output.setCountResultSet(listAnwendungen.size());
		if (0 != listAnwendungen.size()) {
			output.setInformationText(listAnwendungen.get(0).getApplicationCat1Txt());
		}
		return output;
	}

	
	
	
	/**
	 * finds the applications
	 * 
	 * @param anwParamInp
	 * @return
	 */
	public ApplicationParamOutput findApplications(ApplicationParameterInput anwParamInp) {

		String searchname = anwParamInp.getQuery();
		Long startwert = anwParamInp.getStart();
		Long limit = anwParamInp.getLimit();

		String cwid = anwParamInp.getCwid();
		String searchAction = anwParamInp.getSearchAction();
		
		String ciType = anwParamInp.getCiType();
		String ouUnit = anwParamInp.getOuUnit(); // "BBS-ITO-SOL-BPS-SEeB"
		String ciOwnerType = anwParamInp.getCiOwnerType(); // "APP", "CI" oder "ALL"
		String ouQueryMode = anwParamInp.getOuQueryMode(); //  "EXAKT" oder "START"

		List<ApplicationDTO> listAnwendungen = null;

		if (LDAPAuthWS.isLoginValid(anwParamInp.getCwid(), anwParamInp.getToken())) {

			if (null == startwert) {
				startwert = 0L;
			}
			if (null == limit) {
				limit = 20L;
			}
			
			
			boolean onlyApplications = false;
			if (null != anwParamInp.getOnlyapplications()
					&& ApplreposConstants.STRING_TRUE.equals(anwParamInp.getOnlyapplications())) {
				onlyApplications = true;
			}
			
			if (null == anwParamInp.getSort()) {
				// default sort
				anwParamInp.setSort("applicationName");
			}

			if (null != ouUnit && !"".equals(ouUnit)) {
				// advanced search by ou
				if ("BEGINS_WITH".equals(ouQueryMode)) {
					ouQueryMode = "START";
				}
				
				listAnwendungen = CiEntitesHbn.findCisByOUunit(ciType, ouUnit, ciOwnerType, ouQueryMode);
			}
			else if (MY_CIS.equals(searchAction)) {
				if (StringUtils.isNotNullOrEmpty(cwid)) {
					listAnwendungen = CiEntitesHbn.findMyCisOwner(cwid, anwParamInp.getSort(), anwParamInp.getDir(), onlyApplications);
				}
			} else if (MY_CIS_SUBSTITUTE.equals(searchAction)) {
				if (StringUtils.isNotNullOrEmpty(cwid)) {
					listAnwendungen = CiEntitesHbn.findMyCisDelegate(cwid, anwParamInp.getSort(), anwParamInp.getDir(), onlyApplications);
				}
			} else if (MY_CIS_FOR_DELETE.equals(searchAction)) {
				if (StringUtils.isNotNullOrEmpty(cwid)) {
					listAnwendungen = CiEntitesHbn.findMyCisForDelete(cwid, anwParamInp.getSort(), anwParamInp.getDir(), onlyApplications);
				}
			} else {
				// standard search

				if (ApplreposConstants.STRING_TRUE.equals(anwParamInp.getAdvancedsearch())) {
					listAnwendungen = AnwendungHbn.findApplications(searchname, anwParamInp.getQueryMode(),
							anwParamInp.getAdvsearchappowner(), anwParamInp.getAdvsearchappdelegate(),
							anwParamInp.getAdvsearchciowner(), anwParamInp.getAdvsearchcidelegate(), onlyApplications,
							anwParamInp.getAdvsearchObjectTypeId(), anwParamInp.getSort(), anwParamInp.getDir(),
							anwParamInp.getAdvsearchcitypeid(), anwParamInp.getAdvsearchdescription(),
							anwParamInp.getAdvsearchoperationalstatusid(), anwParamInp.getAdvsearchapplicationcat2id(),
							anwParamInp.getAdvsearchlifecyclestatusid(), anwParamInp.getAdvsearchprocessid(), anwParamInp.getTemplate(), anwParamInp.getAdvsearchsteward(), anwParamInp.getBarRelevance(), anwParamInp.getOrganisationalScope());
				} else {
					listAnwendungen = CiEntitesHbn.findCisByNameOrAlias(searchname, anwParamInp.getQueryMode(),
							onlyApplications, anwParamInp.getSort(), anwParamInp.getDir());
				}
			}

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

			// weniger Anwendungen als erwartet
			anwendungen = new ApplicationDTO[listAnwTemp.size()];

			int i = 0;
			for (final ApplicationDTO anw : listAnwTemp) {
				anwendungen[i] = anw;
				i++;
			}

		} else {
			// weniger Anwendungen als erwartet
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

	public ApplicationEditParameterOutput saveApplication(ApplicationEditParameterInput editInput) {

		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		if (null != editInput) {
			ApplicationDTO dto = getApplicationDTOFormEditInput(editInput);

			output = AnwendungHbn.saveAnwendung(editInput.getCwid(), dto);

			if (!ApplreposConstants.RESULT_ERROR.equals(output.getResult())) {
				try {
					// TODO DEBUG Test SupportStuff
					CiSupportStuffHbn.saveCiSupportStuffAll(editInput.getCwid(), dto.getApplicationId(),
							dto.getCiSupportStuffUserAuthorizationSupportedByDocumentation(),
							dto.getCiSupportStuffUserAuthorizationProcess(),
							dto.getCiSupportStuffChangeManagementSupportedByTool(),
							dto.getCiSupportStuffUserManagementProcess(),

							dto.getCiSupportStuffApplicationDocumentation(), dto.getCiSupportStuffRootDirectory(),
							dto.getCiSupportStuffDataDirectory(), dto.getCiSupportStuffProvidedServices(),
							dto.getCiSupportStuffProvidedMachineUsers());

					
					if (null != dto.getLicenseUsingRegions()) {
						ApplicationRegionHbn.saveApplicationRegionsAll(editInput.getCwid(), dto.getApplicationId(),
								dto.getLicenseUsingRegions());
					}

					ApplicationProcessHbn.saveApplicationProcessAll(editInput.getCwid(), dto.getApplicationId(), dto.getBusinessProcessHidden());
					// ApplicationProcessHbn.saveApplicationProcessAll(editInput.getCwid(),
					// dto.getApplicationId(), dto.getConnection_process_D(),
					// "D");

					for (String[] grouptype : ApplreposConstants.GPSCGROUP_MAPPING) {
						char d[] = grouptype[1].toCharArray();
						d[0] = String.valueOf(d[0]).toUpperCase().charAt(0);
						String method = "get" + new String(d);
						String gpscContact = (String) ApplicationDTO.class.getMethod(method).invoke(dto);
						String methodHidden = "get" + new String(d) + ApplreposConstants.GPSCGROUP_HIDDEN_DESCRIPTOR;
						String gpscContactHidden = (String) ApplicationDTO.class.getMethod(methodHidden).invoke(dto);
						if (!(ApplreposConstants.GPSCGROUP_DISABLED_MARKER.equals(gpscContact)) && !(ApplreposConstants.GPSCGROUP_DISABLED_MARKER.equals(gpscContactHidden))) {
							if ("Y".equals(grouptype[2])) { // Individual Contact(s)
								CiPersonsHbn.saveCiPerson(editInput.getCwid(),
										 dto.getApplicationId(), new Long(grouptype[0]), grouptype[3],
										 gpscContactHidden);
							} else { // Group(s)
								CiGroupsHbn.saveCiGroup(editInput.getCwid(),
										 dto.getApplicationId(), new Long(grouptype[0]), grouptype[3],
										 gpscContact);
							}
						}
					}

					
					if(dto.getUpStreamAdd() != null && dto.getUpStreamAdd().length() > 0 || dto.getUpStreamDelete() != null && dto.getUpStreamDelete().length() > 0)
						CiEntitesHbn.saveCiRelations(editInput.getTableId(), dto.getApplicationId(), dto.getUpStreamAdd(), dto.getUpStreamDelete(), "UPSTREAM", editInput.getCwid());
					
					if(dto.getDownStreamAdd() != null && dto.getDownStreamAdd().length() > 0 || dto.getDownStreamDelete() != null && dto.getDownStreamDelete().length() > 0)
						CiEntitesHbn.saveCiRelations(editInput.getTableId(), dto.getApplicationId(), dto.getDownStreamAdd(), dto.getDownStreamDelete(), "DOWNSTREAM", editInput.getCwid());
					
					
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
					// TODO: handle exception
					System.out.println(e.toString());
				}
			}
		}

		return output;
	}

	public ApplicationEditParameterOutput createApplication(ApplicationEditParameterInput editInput) {

		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		if (null != editInput) {
			ApplicationDTO dto = getApplicationDTOFormEditInput(editInput);

			// create Application - fill attributes
			if (null == dto.getResponsible()) {
				dto.setResponsible(editInput.getCwid().toUpperCase());
				dto.setResponsibleHidden(editInput.getCwid().toUpperCase());
			}
			if (null == dto.getBusinessEssentialId()) {
				dto.setBusinessEssentialId(ApplreposConstants.BUSINESS_ESSENTIAL_DEFAULT);
			}

			// save / create application
			output = AnwendungHbn.createAnwendung(editInput.getCwid(), dto, editInput.getForceOverride());

			if (ApplreposConstants.RESULT_OK.equals(output.getResult())) {
				// get detail
				List<Application> listAnwendung = AnwendungHbn.findApplicationByName(editInput.getApplicationName());
				if (null != listAnwendung && 1 == listAnwendung.size()) {
					output.setApplicationId(listAnwendung.get(0).getApplicationId());
					
					Long ciId = listAnwendung.get(0).getApplicationId();
					
					//--- neu seit Wizard RFC 8271 - required Attributes
					
					if (null != editInput.getGpsccontactSupportGroupHidden()) {
						CiGroupsHbn.saveCiGroup(editInput.getCwid(),
								ciId, new Long(1), "SUPPORT GROUP - IM RESOLVER",
										dto.getGpsccontactSupportGroup());//getGpsccontactSupportGroupHidden
					}
					if (null != editInput.getGpsccontactOwningBusinessGroupHidden()) {
						CiGroupsHbn.saveCiGroup(editInput.getCwid(),
								ciId, new Long(6), "OWNING BUSINESS GROUP",
								dto.getGpsccontactOwningBusinessGroup());//getGpsccontactOwningBusinessGroupHidden
					}
					
					if (null != dto.getLicenseUsingRegions()) {
						ApplicationRegionHbn.saveApplicationRegionsAll(editInput.getCwid(), ciId,
								dto.getLicenseUsingRegions());
					}

					ApplicationProcessHbn.saveApplicationProcessAll(editInput.getCwid(), ciId, dto.getBusinessProcessHidden());

					
					// TODO: GPSCContact "Application Owner" wird beim Create nicht mehr gespeichert... Kann das hier weg?
					// save gpsc contact 'application owner'
//					if (null != editInput.getGpscContact1Hidden()) {
//						CiPersonsHbn.saveCiPerson(editInput.getCwid(), listAnwendung.get(0).getApplicationId(),
//								new Long(11), dto.getGpscContact1Hidden(), "save");
//					}
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

	public ApplicationEditParameterOutput deleteApplication(ApplicationEditParameterInput editInput) {

		ApplicationEditParameterOutput output = new ApplicationEditParameterOutput();

		if (null != editInput) {

			if (LDAPAuthWS.isLoginValid(editInput.getCwid(), editInput.getToken())) {
				ApplicationDTO dto = getApplicationDTOFormEditInput(editInput);

				AnwendungHbn.deleteApplicationApplication(editInput.getCwid(), dto.getApplicationId());
				AnwendungHbn.deleteApplicationItSystem(editInput.getCwid(), dto.getApplicationId());
				
				output = AnwendungHbn.deleteAnwendung(editInput.getCwid(), dto);
			} else {
				// TODO MESSAGE LOGGED OUT
			}
		}

		return output;

	}

	/**
	 * converts the editInput to the dto
	 * 
	 * @param editInput
	 * @return
	 */
	private ApplicationDTO getApplicationDTOFormEditInput(ApplicationEditParameterInput editInput) {
		ApplicationDTO dto = new ApplicationDTO();
		dto.setApplicationId(editInput.getApplicationId());

		// Basics
		dto.setApplicationName(editInput.getApplicationName());
		dto.setApplicationAlias(editInput.getApplicationAlias());
		dto.setVersion(editInput.getVersion());
		dto.setApplicationCat2Id(editInput.getApplicationCat2Id());
		// view - primary function
		dto.setLifecycleStatusId(editInput.getLifecycleStatusId());
		dto.setOperationalStatusId(editInput.getOperationalStatusId());
		dto.setComments(editInput.getComments());
		dto.setBarRelevance(editInput.getBarRelevance());
		// TODO business category

		// Agreements
		dto.setSlaId(editInput.getSlaName());
		dto.setPriorityLevelId(editInput.getPriorityLevel());
		dto.setServiceContractId(editInput.getServiceContract());
		dto.setSeverityLevelId(editInput.getSeverityLevel());
		dto.setBusinessEssentialId(editInput.getBusinessEssentialId());

		dto.setClusterCode(editInput.getClusterCode());
		dto.setClusterType(editInput.getClusterType());

		// contacts
		dto.setResponsible(editInput.getResponsible());
		dto.setSubResponsible(editInput.getSubResponsible());

		dto.setResponsibleHidden(editInput.getResponsibleHidden());
		dto.setSubResponsibleHidden(editInput.getSubResponsibleHidden());

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

		dto.setCiSupportStuffUserAuthorizationSupportedByDocumentation(editInput
				.getCiSupportStuffUserAuthorizationSupportedByDocumentation());
		dto.setCiSupportStuffUserAuthorizationProcess(editInput.getCiSupportStuffUserAuthorizationProcess());
		dto.setCiSupportStuffChangeManagementSupportedByTool(editInput
				.getCiSupportStuffChangeManagementSupportedByTool());
		dto.setCiSupportStuffUserManagementProcess(editInput.getCiSupportStuffUserManagementProcess());
		dto.setCiSupportStuffApplicationDocumentation(editInput.getCiSupportStuffApplicationDocumentation());
		dto.setCiSupportStuffRootDirectory(editInput.getCiSupportStuffRootDirectory());
		dto.setCiSupportStuffDataDirectory(editInput.getCiSupportStuffDataDirectory());
		dto.setCiSupportStuffProvidedServices(editInput.getCiSupportStuffProvidedServices());
		dto.setCiSupportStuffProvidedMachineUsers(editInput.getCiSupportStuffProvidedMachineUsers());

		dto.setItSecSbAvailabilityId(editInput.getItSecSbAvailability());
		dto.setItSecSbAvailabilityDescription(editInput.getItSecSbAvailabilityDescription());

		dto.setCategoryBusinessId(editInput.getCategoryBusinessId());
		
		dto.setClassDataId(editInput.getClassDataId());
		dto.setClassInformationId(editInput.getClassInformationId());
		dto.setClassInformationExplanation(editInput.getClassInformationExplanation());

		// business Process
		dto.setBusinessProcess(editInput.getBusinessProcess());
		dto.setBusinessProcessHidden(editInput.getBusinessProcessHidden());
		
		// compliance request
		dto.setRelevanceGR1435(editInput.getRelevanceGR1435());
		dto.setRelevanceGR1775(editInput.getRelevanceGR1775());
		dto.setRelevanceGR1920(editInput.getRelevanceGR1920());
		dto.setRelevanceGR2008(editInput.getRelevanceGR2008());
		
		// connections
		dto.setUpStreamAdd(editInput.getUpStreamAdd());
		dto.setUpStreamDelete(editInput.getUpStreamDelete());
		dto.setDownStreamAdd(editInput.getDownStreamAdd());
		dto.setDownStreamDelete(editInput.getDownStreamDelete());
		
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
			if (null != detailInput.getApplicationId()) {
				List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationUpStream(detailInput.getApplicationId());

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
			if (null != detailInput.getApplicationId()) {
				List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationDownStream(detailInput.getApplicationId());

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
			if (null != detailInput.getApplicationId()) {
				 List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationProcess(detailInput.getApplicationId());

				//List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationConnections(detailInput.getApplicationId());

				output.setViewdataDTO(getViewDataArray(listDTO));
			}
		}

		return output;
	}

	public ApplicationViewdataOutput getAllConnections(ApplicationDetailParameterInput detailInput) {

		ApplicationViewdataOutput output = new ApplicationViewdataOutput();

		if (LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			if (null != detailInput.getApplicationId()) {
				List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationConnections(detailInput.getApplicationId());

				output.setViewdataDTO(getViewDataArray(listDTO));
			}
		}

		return output;
	}

	public ApplicationViewdataOutput getApplicationItSystems(ApplicationDetailParameterInput detailInput) {

		ApplicationViewdataOutput output = new ApplicationViewdataOutput();

		if (LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {
			if (null != detailInput.getApplicationId()) {
				List<ViewDataDTO> listDTO = AnwendungHbn.findApplicationItSystems(detailInput.getApplicationId());
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

		ApplicationDTO dto = new ApplicationDTO();
		
		output.setResult(ApplreposConstants.RESULT_ERROR);
		
		if (LDAPAuthWS.isLoginValid(copyInput.getCwid(), copyInput.getToken())) {

			// TODO check tableId !!! (app only)
			
			Application applicationSource = AnwendungHbn.findApplicationById(copyInput.getCiIdSource());

			if (null != applicationSource) {
				//	source found.
				
				// create Application - fill attributes
				
				dto.setApplicationId(new Long(0));
				dto.setApplicationName(copyInput.getCiNameTarget());
				dto.setApplicationAlias(copyInput.getCiAliasTarget());
				
				dto.setResponsible(copyInput.getCwid().toUpperCase());

				if (null == dto.getBusinessEssentialId()) {
					dto.setBusinessEssentialId(ApplreposConstants.BUSINESS_ESSENTIAL_DEFAULT);
				}

				// set the actual cwid as responsible
				dto.setResponsibleHidden(copyInput.getCwid().toUpperCase());
				// ---
				dto.setSubResponsible(applicationSource.getSubResponsible());
				dto.setSubResponsibleHidden(applicationSource.getSubResponsible());
				dto.setTemplate(applicationSource.getTemplate());
				dto.setRelevanzItsec(applicationSource.getRelevanzITSEC());
				dto.setRelevanceICS(applicationSource.getRelevanceICS());
				
				// save / create application
				ApplicationEditParameterOutput createOutput = AnwendungHbn.createAnwendung(copyInput.getCwid(), dto, null);

				if (ApplreposConstants.RESULT_OK.equals(createOutput.getResult())) {
					// get detail
					List<Application> listAnwendung = AnwendungHbn.findApplicationByName(copyInput.getCiNameTarget());
					if (null != listAnwendung && 1 == listAnwendung.size()) {
						dto.setApplicationId(listAnwendung.get(0).getApplicationId());
						
						Long ciId = listAnwendung.get(0).getApplicationId();

						Application applicationTarget = AnwendungHbn.findApplicationById(ciId);
						if (null != applicationTarget) {
							
							ApplicationEditParameterOutput temp = null;
							
							temp = AnwendungHbn.copyApplication(copyInput.getCwid(), applicationSource.getId(), applicationTarget.getId());
							
							output.setApplicationId(temp.getApplicationId());
							output.setResult(temp.getResult());
							output.setMessages(temp.getMessages());
							output.setDisplayMessage(temp.getDisplayMessage());
						}
					}
				}
				else {
					output.setApplicationId(createOutput.getApplicationId());
					output.setResult(createOutput.getResult());
					output.setMessages(createOutput.getMessages());
					output.setDisplayMessage(createOutput.getDisplayMessage());
				}
				
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
			Application application = AnwendungHbn.findApplicationById(detailInput.getApplicationId());

			applicationDTO.setApplicationId(application.getApplicationId());
			applicationDTO.setApplicationName(application.getApplicationName());
			applicationDTO.setApplicationAlias(application.getApplicationAlias());
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

		// ValidationReader reader = new ValidationReader();
		// reader.readConfigData();

		ApplicationDTO dto = new ApplicationDTO();
		ApplicationAccessDTO accessDTO = new ApplicationAccessDTO();

		if (LDAPAuthWS.isLoginValid(detailInput.getCwid(), detailInput.getToken())) {

			Application application = AnwendungHbn.findApplicationById(detailInput.getApplicationId());

			if (null != application) {

				dto = AnwendungHbn.getApplicationDetail(detailInput.getApplicationId());

				dto.setTemplateReferencedByItem("N");
				if (null != dto.getTemplate() && !"0".equals(dto.getTemplate())) {
					// it is a template, so see if it is referenced by some ci's
					if (!"0".equals(ApplReposHbn.getCountReferencingTemplates(detailInput.getApplicationId()))) {
						dto.setTemplateReferencedByItem("Y");
					}
				}

				if (StringUtils.isNotNullOrEmpty(dto.getResponsible())) {
					List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(dto.getResponsible());
					if (null != listPers && 1 == listPers.size()) {
						PersonsDTO tempPers = listPers.get(0);
						dto.setResponsible(tempPers.getDisplayNameFull());
					}
				}

				if (StringUtils.isNotNullOrEmpty(dto.getSubResponsible())) {
					List<PersonsDTO> listPers = PersonsHbn.findPersonByCWID(dto.getSubResponsible());
					if (null != listPers && 1 == listPers.size()) {
						PersonsDTO tempPers = listPers.get(0);
						dto.setSubResponsible(tempPers.getDisplayNameFull());
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

				if (checker.isEditable(application.getApplicationId(), new Long(2), detailInput.getCwid())) {
					dto.setIsEditable(ApplreposConstants.YES_SHORT);
				}

				// RFC 7465
				if (checker.isRelevanceOperational(detailInput.getCwid(), application)) {
					accessDTO.setRelevanceOperational(ApplreposConstants.YES_SHORT);
				} else {
					accessDTO.setRelevanceOperational(ApplreposConstants.NO_SHORT);
				}

				if (checker.isRelevanceStrategic(detailInput.getCwid(), application)) {
					accessDTO.setRelevanceStrategic(ApplreposConstants.YES_SHORT);
				} else {
					accessDTO.setRelevanceStrategic(ApplreposConstants.NO_SHORT);
				}

				if (StringUtils.isNotNullOrEmpty(application.getInsertQuelle())) {
					if (ApplreposConstants.YES_SHORT.equals(dto.getIsEditable())) {

						if (ApplreposConstants.INSERT_QUELLE_SISEC.equals(application.getInsertQuelle())
								|| ApplreposConstants.APPLICATION_GUI_NAME.equals(application.getInsertQuelle())) {
							// for the application itself, all are editable
							accessDTO.setAllEditable();
						} else {

							InterfacesDTO interfaceDto = InterfacesHbn.findInterfacesByInterfaceToken(application
									.getInsertQuelle());
							if (StringUtils.isNotNullOrEmpty(interfaceDto.getSisecEditable()) && null != interfaceDto) {
								String allRights = interfaceDto.getSisecEditable();
								if (-1 != allRights.indexOf("License_Scanning")) {
									accessDTO.setLicense_Scanning(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Responsible")) {
									accessDTO.setResponsible(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Sub_Responsible")) {
									accessDTO.setSub_Responsible(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Relevance_Ics")) {
									accessDTO.setRelevance_Ics(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Relevanz_Itsec")) {
									accessDTO.setRelevanz_Itsec(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Gxp_Flag")) {
									accessDTO.setGxp_Flag(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_Gruppe_Id")) {
									accessDTO.setItsec_Gruppe_Id(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Sample_Test_Date")) {
									accessDTO.setSample_Test_Date(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Sample_Test_Result")) {
									accessDTO.setSample_Test_Result(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Sla_Id")) {
									accessDTO.setSla_Id(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Service_Contract_Id")) {
									accessDTO.setService_Contract_Id(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Priority_Level_Id")) {
									accessDTO.setPriority_Level_Id(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Severity_Level_Id")) {
									accessDTO.setSeverity_Level_Id(ApplreposConstants.YES_SHORT);
								}

								// business essential only by group right

								if (-1 != allRights.indexOf("Itsec_SB_Integ_ID")) {
									accessDTO.setItsec_SB_Integ_ID(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Integ_Txt")) {
									accessDTO.setItsec_SB_Integ_Txt(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Verfg_ID")) {
									accessDTO.setItsec_SB_Verfg_ID(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Verfg_Txt")) {
									accessDTO.setItsec_SB_Verfg_Txt(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Vertr_ID")) {
									accessDTO.setItsec_SB_Vertr_ID(ApplreposConstants.YES_SHORT);
								}
								if (-1 != allRights.indexOf("Itsec_SB_Vertr_Txt")) {
									accessDTO.setItsec_SB_Vertr_Txt(ApplreposConstants.YES_SHORT);
								}

							}
						}

					}
				}

				// ci support stuff
				// ================
				readAndFillCiStuff(dto, application);
				
				// compliance request
				// ==================
				
				// compliance
				Long releItsec = dto.getRelevanzItsec();
				Long releICS = dto.getRelevanceICS();
				Long rele1775 = dto.getRelevance1775();
				Long rele2008 = dto.getRelevance2008();
				
				if (-1 == releItsec) {
					dto.setRelevanceGR1435("Y");
				}
				else if (0 == releItsec) {
					dto.setRelevanceGR1435("N");
				}
				if (-1 == releICS) {
					dto.setRelevanceGR1920("Y");
				}
				else if (0 == releICS) {
					dto.setRelevanceGR1920("N");
				}
				if (-1 == rele1775) {
					dto.setRelevanceGR1775("Y");
				}
				else if (0 == rele1775) {
					dto.setRelevanceGR1775("N");
				}
				if (-1 == rele2008) {
					dto.setRelevanceGR2008("Y");
				}
				else if (0 == rele2008) {
					dto.setRelevanceGR2008("N");
				}

				
				
				// licenseUsingRegions
				// ===================
				StringBuffer licenseUsingRegions = new StringBuffer();
				List<ApplicationRegion> listApplicationRegion = ApplicationRegionHbn
						.findCurrentApplicationRegion(detailInput.getApplicationId());

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
			String count = ApplReposHbn.getCountFromRoleNameAndCwid(ApplreposConstants.ROLE_BUSINESS_ESSENTIAL_EDITOR,
					detailInput.getCwid());
			if (null != count && !"0".equals(count)) {
				accessDTO.setBusiness_Essential_Id(ApplreposConstants.YES_SHORT);
				// if we can edit the business essential, we can edit the ci
				dto.setIsEditable(ApplreposConstants.YES_SHORT);
			} else {
				accessDTO.setBusiness_Essential_Id(ApplreposConstants.NO_SHORT);
			}

		} // end of if valid session

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
				ApplreposConstants.TABELLEN_ID_APPLICATION, ciId,
				ApplreposConstants.CI_SUPPORT_STUFF_TYPE_UserAuthorizationSupportedByDocumentation);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffUserAuthorizationSupportedByDocumentation(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				ApplreposConstants.TABELLEN_ID_APPLICATION, ciId,
				ApplreposConstants.CI_SUPPORT_STUFF_TYPE_UserAuthorizationProcess);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffUserAuthorizationProcess(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				ApplreposConstants.TABELLEN_ID_APPLICATION, ciId,
				ApplreposConstants.CI_SUPPORT_STUFF_TYPE_ChangeManagementSupportedByTool);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffChangeManagementSupportedByTool(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				ApplreposConstants.TABELLEN_ID_APPLICATION, ciId,
				ApplreposConstants.CI_SUPPORT_STUFF_TYPE_UserManagementProcess);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffUserManagementProcess(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				ApplreposConstants.TABELLEN_ID_APPLICATION, ciId,
				ApplreposConstants.CI_SUPPORT_STUFF_TYPE_ApplicationDocumentation);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffApplicationDocumentation(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				ApplreposConstants.TABELLEN_ID_APPLICATION, ciId,
				ApplreposConstants.CI_SUPPORT_STUFF_TYPE_RootDirectory);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffRootDirectory(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				ApplreposConstants.TABELLEN_ID_APPLICATION, ciId,
				ApplreposConstants.CI_SUPPORT_STUFF_TYPE_DataDirectory);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffDataDirectory(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				ApplreposConstants.TABELLEN_ID_APPLICATION, ciId,
				ApplreposConstants.CI_SUPPORT_STUFF_TYPE_ProvidedServices);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffProvidedServices(supportStuffDTO.getCiSupportStuffValue());
		}

		supportStuffDTO = CiSupportStuffHbn.findCiSupportStuffByTableAndCiAndTypeId(
				ApplreposConstants.TABELLEN_ID_APPLICATION, ciId,
				ApplreposConstants.CI_SUPPORT_STUFF_TYPE_ProvidedMachineUsers);
		if (null != supportStuffDTO) {
			dto.setCiSupportStuffProvidedMachineUsers(supportStuffDTO.getCiSupportStuffValue());
		}

		// quickhack
		if (null == dto.getCiSupportStuffUserAuthorizationSupportedByDocumentation()) {
			dto.setCiSupportStuffUserAuthorizationSupportedByDocumentation("");
		}
		if (null == dto.getCiSupportStuffUserAuthorizationProcess()) {
			dto.setCiSupportStuffUserAuthorizationProcess("");
		}
		if (null == dto.getCiSupportStuffChangeManagementSupportedByTool()) {
			dto.setCiSupportStuffChangeManagementSupportedByTool("");
		}
		if (null == dto.getCiSupportStuffUserManagementProcess()) {
			dto.setCiSupportStuffUserManagementProcess("");
		}
		if (null == dto.getCiSupportStuffApplicationDocumentation()) {
			dto.setCiSupportStuffApplicationDocumentation("");
		}
		if (null == dto.getCiSupportStuffRootDirectory()) {
			dto.setCiSupportStuffRootDirectory("");
		}
		if (null == dto.getCiSupportStuffDataDirectory()) {
			dto.setCiSupportStuffDataDirectory("");
		}
		if (null == dto.getCiSupportStuffProvidedServices()) {
			dto.setCiSupportStuffProvidedServices("");
		}
		if (null == dto.getCiSupportStuffProvidedMachineUsers()) {
			dto.setCiSupportStuffProvidedMachineUsers("");
		}
	}

	/**
	 * delivers the grouped contacts for the ci application
	 * 
	 * @param contactsInput
	 * @return
	 */
	public ApplicationContactsParameterOutput getApplicationContacts(ApplicationContactsParameterInput contactsInput) {
		ApplicationContactsParameterOutput output = new ApplicationContactsParameterOutput();

		ApplicationContactsDTO applicationContactsDTO = new ApplicationContactsDTO();

		List<ApplicationContact> listContacts = AnwendungHbn.findApplicationContacts(contactsInput.getApplicationId());

		String lastGroupTypeName = "";

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
			} else {
				// add the entry to the actual group (more than one entry for
				// the group)
//				if (null != entry) {
//					listEntries.add(entry);
//				}

				// --- only for testing
				// TODO Application contacts - einzelne Anzeige
//				ApplicationContactGroupDTO groupTest = new ApplicationContactGroupDTO();
//				groupTest.setGroupTypeId(contact.getGroupTypeId());
//				groupTest.setGroupTypeName(contact.getGroupTypeName());
//				groupTest.setIndividualContactYN(contact.getIndividualContactYN());
//				groupTest.setMinContacts(contact.getMinContacts());
//				groupTest.setMaxContacts(contact.getMaxContacts());
//
//				ApplicationContactEntryDTO temp[] = new ApplicationContactEntryDTO[1];
//				temp[0] = entry;
//				groupTest.setApplicationContactEntryDTO(temp);
//				listGroups.add(groupTest);
				// --- only for testing
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

		// add the last one..
//		if (null != contact) {
//			// --- only for testing
//			// TODO Application contacts - einzelne Anzeige
//			ApplicationContactGroupDTO groupTest = new ApplicationContactGroupDTO();
//			groupTest.setGroupTypeId(contact.getGroupTypeId());
//			groupTest.setGroupTypeName(contact.getGroupTypeName());
//			groupTest.setIndividualContactYN(contact.getIndividualContactYN());
//			groupTest.setMinContacts(contact.getMinContacts());
//			groupTest.setMaxContacts(contact.getMaxContacts());
//
//			ApplicationContactEntryDTO temp[] = new ApplicationContactEntryDTO[1];
//			temp[0] = entry;
//			groupTest.setApplicationContactEntryDTO(temp);
//			listGroups.add(groupTest);
//			// --- only for testing
//
//		}

		// create the result (array)
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

		Long tableId = ApplreposConstants.TABELLEN_ID_APPLICATION;

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

		if (null != detailInput.getApplicationId() && 0 < detailInput.getApplicationId().longValue()) {
		
			List<HistoryViewDataDTO> listHistory = AnwendungHbn.findApplicationHistory(detailInput.getApplicationId());
			
			if (!listHistory.isEmpty()) {
				arrayHist = new HistoryViewDataDTO[listHistory.size()];
				for (int i = 0; i < arrayHist.length; i++) {
					arrayHist[i] = listHistory.get(i);
				}
			}
		}
		return arrayHist;
	}

}
