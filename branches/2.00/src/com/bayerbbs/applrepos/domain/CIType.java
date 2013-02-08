package com.bayerbbs.applrepos.domain;

import com.bayerbbs.applrepos.constants.ApplreposConstants;

public enum CIType
{
	APPLICATION("Application", 5, ApplreposConstants.TABLE_ID_APPLICATION, 1),
	APPLICATION_PLATFORM("Application Platform", -10006, ApplreposConstants.TABLE_ID_APPLICATION, 2),
	MIDDLEWARE("Middleware", -10007, ApplreposConstants.TABLE_ID_APPLICATION, 3),
	COMMON_SERVICE("Common Service", -10013, ApplreposConstants.TABLE_ID_APPLICATION, 4),
	NET_SECURITY_ZONE("Net Security Zone", 4, 112L, 5),
	SYSTEM_PLATFORM("System Platform", 3, ApplreposConstants.TABLE_ID_IT_SYSTEM, 6),
	POSITION("Position", -10015, 13L, 7),
	ROOM("Room", 2, 3L, 8),
	BUILDING_AREA("Building Area", -10005, 88L, 9),
	BUILDING ("Building", 1, 4L, 10),
	TERRAIN("Terrain", -10012, 30L, 11),
	SITE("Site", -10011, 12L, 12),
	PATHWAY_INSIDE("Pathway Inside", -10014, ApplreposConstants.TABLE_ID_WAYS, 13),
	PATHWAY_OUTSIDE("Pathway Outside", -10017, ApplreposConstants.TABLE_ID_WAYS, 14),
	FUNCTION("Function", 6, 33L, 16);
	
	private final int type;
	private final int tableID;
	private final int sort;
	private final String name;
	CIType(String name, int type, Long tableID, int sort)
	{
		this.name = name;
		this.type = type;
		this.tableID = tableID.intValue();
		this.sort = sort;
	}
	public int getType() {
		return type;
	}
	public int getTableID() {
		return tableID;
	}
	public int getSort() {
		return sort;
	}
	public String getName() {
		return name;
	}
}