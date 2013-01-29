package com.bayerbbs.applrepos.dto;

public class BaseDTO {
	private Long id;
	private Long tableId;
	private String name;
	private String alias;

	private String ciOwner;
	private String ciOwnerHidden;
	private String ciOwnerDelegate;
	private String ciOwnerDelegateHidden;

	
	// insert, update, delete attributes
	private String insertQuelle;
	private String insertTimestamp;
	private String insertUser;
	private String updateQuelle;
	private String updateTimestamp;
	private String updateUser;
	private String deleteQuelle;
	private String deleteTimestamp;
	private String deleteUser;

	
	public BaseDTO() {}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public Long getTableId() {
		return tableId;
	}

	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getCiOwner() {
		return ciOwner;
	}

	public void setCiOwner(String ciOwner) {
		this.ciOwner = ciOwner;
	}

	public String getCiOwnerHidden() {
		return ciOwnerHidden;
	}

	public void setCiOwnerHidden(String ciOwnerHidden) {
		this.ciOwnerHidden = ciOwnerHidden;
	}

	public String getCiOwnerDelegate() {
		return ciOwnerDelegate;
	}

	public void setCiOwnerDelegate(String ciOwnerDelegate) {
		this.ciOwnerDelegate = ciOwnerDelegate;
	}

	public String getCiOwnerDelegateHidden() {
		return ciOwnerDelegateHidden;
	}

	public void setCiOwnerDelegateHidden(String ciOwnerDelegateHidden) {
		this.ciOwnerDelegateHidden = ciOwnerDelegateHidden;
	}

	public String getInsertQuelle() {
		return insertQuelle;
	}

	public void setInsertQuelle(String insertQuelle) {
		this.insertQuelle = insertQuelle;
	}

	public String getInsertTimestamp() {
		return insertTimestamp;
	}

	public void setInsertTimestamp(String insertTimestamp) {
		this.insertTimestamp = insertTimestamp;
	}

	public String getInsertUser() {
		return insertUser;
	}

	public void setInsertUser(String insertUser) {
		this.insertUser = insertUser;
	}

	public String getUpdateQuelle() {
		return updateQuelle;
	}

	public void setUpdateQuelle(String updateQuelle) {
		this.updateQuelle = updateQuelle;
	}

	public String getUpdateTimestamp() {
		return updateTimestamp;
	}

	public void setUpdateTimestamp(String updateTimestamp) {
		this.updateTimestamp = updateTimestamp;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public String getDeleteQuelle() {
		return deleteQuelle;
	}

	public void setDeleteQuelle(String deleteQuelle) {
		this.deleteQuelle = deleteQuelle;
	}

	public String getDeleteTimestamp() {
		return deleteTimestamp;
	}

	public void setDeleteTimestamp(String deleteTimestamp) {
		this.deleteTimestamp = deleteTimestamp;
	}

	public String getDeleteUser() {
		return deleteUser;
	}

	public void setDeleteUser(String deleteUser) {
		this.deleteUser = deleteUser;
	}
	
}