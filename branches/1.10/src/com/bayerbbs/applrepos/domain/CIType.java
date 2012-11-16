package com.bayerbbs.applrepos.domain;

public enum CIType
{
	APPLICATION("Application", 5, 2, 1),
	APPLICATION_PLATFORM("Application Platform", -10006, 2, 2),
	MIDDLEWARE("Middleware", -10007, 2, 3),
	COMMON_SERVICE("Common Service", -10013, 2, 4),
	NET_SECURITY_ZONE("Net Security Zone", 4, 112, 5),
	SYSTEM_PLATFORM("System Platform", 3, 1, 6),
	POSITION("Position", -10015, 13, 7),
	ROOM("Room", 2, 3, 8),
	BUILDING_AREA("Building Area", -10005, 88, 9),
	BUILDING ("Building", 1, 4, 10),
	TERRAIN("Terrain", -10012, 30, 11),
	SITE("Site", -10011, 12, 12),
	PATHWAY_INSIDE("Pathway Inside", -10014, 37, 13),
	PATHWAY_OUTSIDE("Pathway Outside", -10017, 37, 14),
	FUNCTION("Function", 6, 33, 16);
	
	private final int type;
	private final int tableID;
	private final int sort;
	private final String name;
	CIType(String name, int type, int tableID, int sort)
	{
		this.name = name;
		this.type = type;
		this.tableID = tableID;
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