package com.bayerbbs.applrepos.service;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.AppRepAuthData;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.CiBase1;
import com.bayerbbs.applrepos.domain.CiBase2;
import com.bayerbbs.applrepos.dto.RolePersonDTO;
import com.bayerbbs.applrepos.hibernate.AnwendungHbn;
import com.bayerbbs.applrepos.hibernate.ApplReposHbn;

public class AccessRightChecker {

	/**
	 * checks if the object is editable
	 * 
	 * The check handles responsible, subresponsible, belonging groups, role admin and substitutes 
	 * 
	 * @param objectId
	 * @param tableId
	 * @param cwidInput
	 * @return
	 */
	public boolean isEditable(Long objectId, Long tableId, String cwidInput) {
		boolean isEditable = false;

		String cwid = cwidInput.toUpperCase();

		// application
		if (2 == tableId.longValue()) {
			Application application = AnwendungHbn.findApplicationById(objectId);

			if (null == application || null != application.getDeleteTimestamp()) {
				// deleted items are not to be edited
				isEditable = false;
			} else if (StringUtils.isNotNullOrEmpty(application.getResponsible())
					&& cwid.equals(application.getResponsible().toUpperCase())) {
				// responsible has the right
				isEditable = true;
			} else if (StringUtils.isNotNullOrEmpty(application
					.getSubResponsible()) && cwid.equals(application.getSubResponsible().toUpperCase())) {
				// sub-responsible has the right
				isEditable = true;
			} else {
				// TODO neu GPSC-Group CI-Owner
				if (!isEditable && StringUtils.isNotNullOrEmpty(cwid)) {
					if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromGPSCGroupCIOwnder(objectId, tableId, cwid))) {
						// allowed by GPSC-Group CI Owner
						isEditable = true;
					}
				}
				
				// check group rights responsible
				if (!isEditable
						&& StringUtils.isNotNullOrEmpty(cwid) && StringUtils.isNotNullOrEmpty(application.getResponsible())) {
					if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromGroupNameAndCwid(
							application.getResponsible(), cwid))) {
						// allowed by group rights
						isEditable = true;
					}
				}

				if (!isEditable
						&& StringUtils.isNotNullOrEmpty(cwid) && StringUtils.isNotNullOrEmpty(application
								.getSubResponsible())) {
					if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromGroupNameAndCwid(
							application.getSubResponsible(), cwid))) {
						// allowed by group rights
						isEditable = true;
					}
				}

				// admin rights check
				if (!isEditable && StringUtils.isNotNullOrEmpty(cwid)) {
					// Admin-Rolle nur für die Role AIR Administrator
					
					if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromRoleNameAndCwid(
							AirKonstanten.ROLE_AIR_ADMINISTRATOR, cwid))) {
						// allowed by group rights for admin
						isEditable = true;
					}
				}

				// subsitute rights check
				if (!isEditable && StringUtils.isNotNullOrEmpty(cwid)) {
					// check subsitute group rights responsible
					if (StringUtils.isNotNullOrEmpty(application
							.getResponsible())) {
						if (!AirKonstanten.STRING_0.equals(ApplReposHbn
								.getCountFromGroupNameAndCwid(
										AirKonstanten.ROLE_SUBSTITUTE
												+ AirKonstanten.STRING_ONE_BLANK
												+ application.getResponsible(),
										cwid))) {
							// allowed by subsitute group rights
							isEditable = true;
						}
					}

					if (!isEditable && !StringUtils.isNotNullOrEmpty(cwid)
							&& StringUtils.isNotNullOrEmpty(application
									.getSubResponsible())) {
						if (!AirKonstanten.STRING_0.equals(ApplReposHbn
								.getCountFromGroupNameAndCwid(
										AirKonstanten.ROLE_SUBSTITUTE
												+ AirKonstanten.STRING_ONE_BLANK
												+ application.getSubResponsible(), cwid))) {
							// allowed by subsitute group rights
							isEditable = true;
						}
					}
				}
			}
		}

		return isEditable;
	}
	
	//Doppelt weil: siehe @Column(name = "CWID_VERANTW_BETR") ciOwner Feld in Hibernateklasse ItSystem
	//anstatt @Column(name = "RESPONSIBLE") wie in allen anderen Transbase CI Tabellen
	public boolean isRelevanceOperational(String cwid, String token, CiBase2 ci) {//ItSystem ci
		if(cwid == null || ci == null)// || (ci.getCiOwner() == null && ci.getCiOwnerDelegate() == null)
			return false;
		
		if(cwid.equals(ci.getCiOwner()) || 
		   cwid.equals(ci.getCiOwnerDelegate()) || 
		   (ci.getCiOwner() == null && ci.getCiOwnerDelegate() == null))//wenn kein owner oder delegate, dürfen alle editieren
			return true;
		
		String groupCount = ci.getCiOwnerDelegate() != null ? ApplReposHbn.getCountFromGroupNameAndCwid(ci.getCiOwnerDelegate(), cwid) : AirKonstanten.STRING_0;
		if (StringUtils.isNotNullOrEmpty(ci.getCiOwnerDelegate()) && !groupCount.equals(AirKonstanten.STRING_0))
			return true;
		
		return false;
	}

	//Location CIs mit dem Namen unknown dürfen nicht editiert werden !!
	public boolean isRelevanceOperational(String cwid, String token, CiBase1 ci) {
		if(cwid == null || ci == null)// || (ci.getCiOwner() == null && ci.getCiOwnerDelegate() == null)
			return false;
		
		boolean isUnknown = ci.getName().equalsIgnoreCase(AirKonstanten.UNKNOWN);
		
		if(!isUnknown && (cwid.equals(ci.getCiOwner()) || 
		   cwid.equals(ci.getCiOwnerDelegate()) || 
		   (ci.getCiOwner() == null && ci.getCiOwnerDelegate() == null)))//wenn kein owner oder delegate, dürfen alle editieren
			return true;
		
		String groupCount = ci.getCiOwnerDelegate() != null ? ApplReposHbn.getCountFromGroupNameAndCwid(ci.getCiOwnerDelegate(), cwid) : AirKonstanten.STRING_0;
		if (!isUnknown && (StringUtils.isNotNullOrEmpty(ci.getCiOwnerDelegate()) && !groupCount.equals(AirKonstanten.STRING_0)))
			return true;
		
		boolean hasEditRights = !isUnknown && hasRole(cwid, token, AirKonstanten.ROLE_AIR_LOCATION_DATA_MAINTENANCE);//&& false;// 
		
		return hasEditRights;//false
	}
	
	public boolean isRelevanceOperational(String cwidInput, Application application) {
		boolean isRelevanceOperational = false;
		
		if (null != cwidInput && null != application) {
			String cwid = cwidInput.toUpperCase();
			
			if (cwid.equals(application.getResponsible())) {
				isRelevanceOperational = true;
			}
			
			if (!isRelevanceOperational && cwid.equals(application.getSubResponsible())) {
				isRelevanceOperational = true;
			}
			
			if (!isRelevanceOperational && cwid.equals(application.getApplicationSteward())) {
				isRelevanceOperational = true;
			}

			
			if (!isRelevanceOperational && StringUtils.isNotNullOrEmpty(application.getSubResponsible())) {
				if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromGroupNameAndCwid(application.getSubResponsible(), cwid))) {
					// allowed by group rights
					isRelevanceOperational = true;
				}
			}
		
			/*
			//wenn kein ciOwner, ciOwnerDelegate und kein Steward vorhanden, dürfen alle editieren, wenn die
			//app nicht löschmarkiert ist!
			if(!isRelevanceOperational &&
			   StringUtils.isNullOrEmpty(application.getResponsible()) &&
			   StringUtils.isNullOrEmpty(application.getSubResponsible()) &&
			   StringUtils.isNullOrEmpty(application.getApplicationSteward()) &&
			   application.getDeleteTimestamp() == null)
				isRelevanceOperational = true;*/
			
			if(isRelevanceOperational && application.getDeleteTimestamp() != null)
				isRelevanceOperational = false;
		}
		
		return isRelevanceOperational;
	}
	

	public boolean isRelevanceStrategic(String cwidInput, Application application) {
		boolean isRelevanceStrategic = false;
		
		if (null != cwidInput && null != application) {
			String cwid = cwidInput.toUpperCase();
			
			if (cwid.equals(application.getApplicationOwner())) {
				isRelevanceStrategic = true;
			}
			
			if (!isRelevanceStrategic && cwid.equals(application.getApplicationOwnerDelegate())) {
				isRelevanceStrategic = true;
			}

			if (!isRelevanceStrategic && cwid.equals(application.getApplicationSteward())) {
				isRelevanceStrategic = true;
			}
			
			if (!isRelevanceStrategic && StringUtils.isNotNullOrEmpty(application.getApplicationOwnerDelegate())) {
				if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromGroupNameAndCwid(application.getApplicationOwnerDelegate(), cwid))) {
					// allowed by group rights
					isRelevanceStrategic = true;
				}
			}
			
			if (!isRelevanceStrategic) {
				if (isEditableRoleApplicationManager(cwid)) {
					// allowed by role rights for admin
					isRelevanceStrategic = true;
				}
			}
			
			
			//wenn kein ciOwner, ciOwnerDelegate und kein Steward vorhanden, dürfen alle editieren, wenn die
			//app nicht löschmarkiert ist!
			if(!isRelevanceStrategic &&
			   StringUtils.isNullOrEmpty(application.getApplicationOwner()) &&
			   StringUtils.isNullOrEmpty(application.getApplicationOwnerDelegate()) &&
			   StringUtils.isNullOrEmpty(application.getApplicationSteward()))
				isRelevanceStrategic = true;
			
			if(isRelevanceStrategic && application.getDeleteTimestamp() != null)
				isRelevanceStrategic = false;
		}
		
		return isRelevanceStrategic;
	}

	private boolean isEditableByRoleAdminType(String adminTypeRoleName, String cwidInput) {
		boolean isEditableByRoleAdminType = false;
		if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromRoleNameAndCwid(adminTypeRoleName, cwidInput))) {
			// allowed by role rights for admin type
			isEditableByRoleAdminType = true;
		}
		
		return isEditableByRoleAdminType;
	}

	public boolean isEditableRoleApplicationManager(String cwidInput) {
		return isEditableByRoleAdminType(AirKonstanten.ROLE_AIR_APPLICATION_MANAGER, cwidInput);
	}
	
	public boolean isEditableRoleInfrastructureManager(String cwidInput) {
		return isEditableByRoleAdminType(AirKonstanten.ROLE_AIR_INFRASTRUCTURE_MANAGER, cwidInput);
	}
	
	private String getCacheKey(String cwid, String token) {
		return cwid + ":" + token;
	}
	
	private boolean hasRole(String cwid, String token, String roleName) {
		Cache cache = CacheManager.getInstance().getCache(AirKonstanten.CACHENAME);
		Element element = cache.get(getCacheKey(cwid.toLowerCase(), token));
		AppRepAuthData authData = (AppRepAuthData)element.getObjectValue();
		
		for(RolePersonDTO role : authData.getRoles())
			if(role.getRoleName().equals(roleName))
				return true;
			
		return false;
	}
}
