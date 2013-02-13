package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Application;
import com.bayerbbs.applrepos.domain.CiBase;
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

	public boolean isRelevanceOperational(String cwid, CiBase ci) {
		if(cwid == null || ci == null)// || (ci.getCiOwner() == null && ci.getCiOwnerDelegate() == null)
			return false;
		
		if(cwid.equals(ci.getCiOwner()) || cwid.equals(ci.getCiOwnerDelegate()) || (ci.getCiOwner() == null && ci.getCiOwnerDelegate() == null))
			return true;
		
		String groupCount = ApplReposHbn.getCountFromGroupNameAndCwid(ci.getCiOwnerDelegate(), cwid);
		if (StringUtils.isNotNullOrEmpty(ci.getCiOwnerDelegate()) && !groupCount.equals(AirKonstanten.STRING_0))
			return true;
		
		return false;
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
			
			if (!isRelevanceOperational && StringUtils.isNotNullOrEmpty(application
					.getSubResponsible())) {
				if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromGroupNameAndCwid(
						application.getSubResponsible(), cwid))) {
					// allowed by group rights
					isRelevanceOperational = true;
				}
			}
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
				if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromGroupNameAndCwid(
						application.getApplicationOwnerDelegate(), cwid))) {
					// allowed by group rights
					isRelevanceStrategic = true;
				}
			}
			
			if (!isRelevanceStrategic) {
				if (isEditableRoleApplicationManager( cwid)) {
					// allowed by role rights for admin
					isRelevanceStrategic = true;
				}
			}
		}
		
		return isRelevanceStrategic;
	}

	private boolean isEditableByRoleAdminType(String adminTypeRoleName, String cwidInput) {
		boolean isEditableByRoleAdminType = false;
		if (!AirKonstanten.STRING_0.equals(ApplReposHbn.getCountFromRoleNameAndCwid(
				adminTypeRoleName, cwidInput))) {
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
	
}
