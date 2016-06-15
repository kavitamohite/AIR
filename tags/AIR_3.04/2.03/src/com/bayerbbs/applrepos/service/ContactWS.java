package com.bayerbbs.applrepos.service;


import com.bayerbbs.applrepos.dto.EditorGroupDTO;
import com.bayerbbs.applrepos.hibernate.EditorGroupHbn;

public class ContactWS {
	public EditorGroupDTO[] findEditorGroupList() {
		return EditorGroupHbn.getEditorGroupById();
	}
	
}
