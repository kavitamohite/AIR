package com.bayerbbs.applrepos.domain;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types; 

import org.hibernate.dialect.Dialect;
import org.hibernate.type.BooleanType; 

public class OneZeroBoolean extends BooleanType
{
	private static final long serialVersionUID = 1L; 
	
	public Object get(ResultSet rs, String name) throws SQLException
	{
		if (rs.getObject(name) == null)
			return null;
		int code = rs.getInt(name);
		return code != 0;
	} 
	
	public void set(PreparedStatement st, Object value, int index) throws SQLException
	{
		if (value == null)
			st.setObject(index, null);
		else
			st.setInt(index, Boolean.TRUE.equals(value) ? -1 : 0);
	} 
	
	public int sqlType()
	{
		return Types.INTEGER;
	} 
	
	public String objectToSQLString(Object value, Dialect dialect) throws Exception
	{
		return ((Boolean)value).booleanValue() ? "-1" : "0"; 
	} 
	
	public Object stringToObject(String xml) throws Exception
	{
		if ("0".equals(xml))
		{
			return Boolean.FALSE;
		} else
		{
			return Boolean.TRUE;
		}
	}
}