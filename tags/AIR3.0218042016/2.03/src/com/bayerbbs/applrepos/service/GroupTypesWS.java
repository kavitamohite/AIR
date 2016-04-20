package com.bayerbbs.applrepos.service;

import com.bayerbbs.applrepos.dto.GroupTypesDTO;
import com.bayerbbs.applrepos.hibernate.GroupTypesHbn;

public class GroupTypesWS {
	public GroupTypesDTO[] getGroupTypesList() {
		return GroupTypesHbn.getArrayFromList(GroupTypesHbn.listGroupTypesHbn());
	}
}
