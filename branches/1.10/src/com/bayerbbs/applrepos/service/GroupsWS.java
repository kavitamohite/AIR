package com.bayerbbs.applrepos.service;

import java.util.ArrayList;

import com.bayerbbs.applrepos.dto.GroupsDTO;
import com.bayerbbs.applrepos.hibernate.GroupsHbn;

public class GroupsWS {

//	public GroupsDTO[] getGroupsList() {
//		return GroupsHbn.getArrayFromList(GroupsHbn.listGroupsHbn());
//	}

	public GroupsDTO[] findGroups(GroupsParameterInput input) {
		return GroupsHbn.getArrayFromList(GroupsHbn.findGroupsByName(input.getGroupName(),
				input.getImpactedBusinessGroup(),
				input.getChangeTeam(),
				input.getCiOwner(),
				input.getEscalationList(),
				input.getImplementationTeam(),
				input.getOwningBusinessGroup(),
				input.getServiceCoordinator(),
				input.getSupportGroupIMResolver(),
				input.getManagerCWID(),
				input.getFullLikeSearch()));
	}
}
