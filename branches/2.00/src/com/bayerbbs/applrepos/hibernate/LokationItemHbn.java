package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.domain.CiLokationsKette;
import com.bayerbbs.applrepos.domain.Land;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;
import com.bayerbbs.applrepos.service.LDAPAuthWS;

public class LokationItemHbn extends BaseHbn {
	private static final Log log = LogFactory.getLog(LokationItemHbn.class);

	static final String RAUM_TYPE_LOCATION = "raumId";
	static final String STANDORT_TYPE_LOCATION = "standortId";
	static final String TERRAIN_TYPE_LOCATION = "terrainId";
	static final String GEBAEUDE_TYPE_LOCATION = "gebaeudeId";
	static final String BUILDING_AREA_TYPE_LOCATION = "areaId";
	static final String AREA_TYPE_LOCATION = "areaId";
	static final String SCHRANK_TYPE_LOCATION = "schrankId";
	
	
	protected static StringBuilder getAdvSearchCiBaseSql(CiSearchParamsDTO input, CiMetaData metaData) {
		StringBuilder sql = new StringBuilder();
		
		sql.
		append("SELECT ").append(metaData.getIdField()).append(", ").append(metaData.getNameField());
		
		if(metaData.getAliasField() != null)
			sql.append(", ").append(metaData.getAliasField());
		
		sql.append(", responsible, sub_responsible FROM ").append(metaData.getTableName()).append(" WHERE").// (
		append(" del_timestamp IS NULL AND (").
		append(" UPPER(").append(metaData.getNameField()).append(") LIKE '");
		
		
		if(CiEntitiesHbn.isLikeStart(input.getQueryMode()))
			sql.append("%");
		
		sql.append(input.getCiNameAliasQuery().toUpperCase());
		
		if(CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
			sql.append("%");
		
		sql.append("'");
		
		if(metaData.getAliasField() != null) {
			sql.append(" OR UPPER(").append(metaData.getAliasField()).append(") LIKE '");
			
			if(CiEntitiesHbn.isLikeStart(input.getQueryMode()))
				sql.append("%");
			
			sql.append(input.getCiNameAliasQuery().toUpperCase());
			
			if(CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
				sql.append("%");
			
			sql.append("'");
		}
		
		sql.append(")");
		
		boolean isNot = false;
		
		
		if(StringUtils.isNotNullOrEmpty(input.getItSetId())) {
			isNot = isNot(input.getItSetOptions());
			sql.append(" AND itset "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(input.getItSetId()));
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getBusinessEssentialId())) {
			isNot = isNot(input.getBusinessEssentialOptions());
			sql.append(" AND business_essential_id "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(input.getBusinessEssentialId()));
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getItSecGroupId())) {
			isNot = isNot(input.getItSecGroupOptions());
			sql.append(" AND itsec_gruppe_id "+ getEqualNotEqualOperator(isNot) +" ").append(Long.parseLong(input.getItSecGroupId()));
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getSource())) {
			isNot = isNot(input.getSourceOptions());
			sql.append(" AND insert_quelle "+ getEqualNotEqualOperator(isNot) +" '").append(input.getSource()).append("'");
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getCiOwnerHidden())) {
			isNot = isNot(input.getCiOwnerOptions());
			
			sql.append(" AND (");
			if(isNot)
				sql.append("UPPER(responsible) IS NULL OR ");
			
			sql.append("UPPER(responsible) " + getLikeNotLikeOperator(isNot) + " '").append(input.getCiOwnerHidden().toUpperCase()).append("')");
		}
		
		if(StringUtils.isNotNullOrEmpty(input.getCiOwnerDelegate())) {
			boolean isCwid = input.getCiOwnerDelegate().indexOf(')') > -1;
			String delegate = isCwid ? input.getCiOwnerDelegateHidden() : input.getCiOwnerDelegate();//gruppe oder cwid?
			
			isNot = isNot(input.getCiOwnerDelegateOptions());
			
			sql.append(" AND (");
			if(isNot)
				sql.append("UPPER(sub_responsible) IS NULL OR ");
			
			sql.append("UPPER(sub_responsible) "+ getLikeNotLikeOperator(isNot) +" '").append(delegate.toUpperCase()).append("')");
			
			if(!isCwid)
				sql.insert(sql.length() - 2, '%');
		}
		
		return sql;
	}
	
	public static CiItemsResultDTO findLocationCisBy(CiSearchParamsDTO input, CiMetaData metaData) {
		if(!LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			return new CiItemsResultDTO();//new CiItemDTO[0];
		
		StringBuilder sql = getAdvSearchCiBaseSql(input, metaData);
		
		List<CiItemDTO> cis = new ArrayList<CiItemDTO>();

		Session session = null;
		Transaction ta = null;
		Connection conn = null;
		Statement stmt = null;//PreparedStatement
		ResultSet rs = null;
		
		Integer start = input.getStart();
		Integer limit = input.getLimit();
		Integer i = 0;
		boolean commit = false;
		
		try {
			session = HibernateUtil.getSession();
			ta = session.beginTransaction();
			conn = session.connection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql.toString());
			
//			stmt = conn.prepareStatement(sql.toString(), ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
//			rs = stmt.executeQuery();
//			if(0 != start)
//				rs.absolute(start + 1);//relative
			
			if(null == start)
				start = 0;
			if(null == limit)
				limit = 20;
			
			CiItemDTO ci = null;
			
			while(rs.next()) {
				if(i >= start && i < limit + start) {
					ci = new CiItemDTO();
					ci.setId(rs.getLong(metaData.getIdField()));
					ci.setName(rs.getString(metaData.getNameField()));
					if(metaData.getAliasField() != null)
						ci.setAlias(rs.getString(metaData.getAliasField()));
					ci.setApplicationCat1Txt(metaData.getTypeName());
					ci.setCiOwner(rs.getString("responsible"));
					ci.setCiOwnerDelegate(rs.getString("sub_responsible"));
					ci.setTableId(metaData.getTableId());
					
					cis.add(ci);
					//i++;
				}// else break;
				
				i++;
			}
						
			ta.commit();
			rs.close();
			stmt.close();
			conn.close();
			
			commit = true;
		} catch(SQLException e) {
			if(ta.isActive())
				ta.rollback();
			
			System.out.println(e);
		} finally {
			HibernateUtil.close(ta, session, commit);

//			try {
//				rs.close();
//				stmt.close();
//				conn.close();
//				session.close();
//			} catch (SQLException e) {
//				System.out.println(e);
//			}
		}
		
		CiItemsResultDTO result = new CiItemsResultDTO();
		result.setCiItemDTO(cis.toArray(new CiItemDTO[0]));
		result.setCountResultSet(i);//i + start
		return result;
	}
	
	public static CiLokationsKette findLokationsKetteByCiTypeAndCiId(String ciType, Long ciId) {
		CiLokationsKette lokationsKette = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		
		try {
			tx = session.beginTransaction();
			List<CiLokationsKette> list = session.createQuery("select lk from CiLokationsKette lk where lk."+ciType+"=" + ciId).list();

			if(null != list && 0 < list.size())
				lokationsKette = (CiLokationsKette) list.get(0);

			tx.commit();
		} catch (RuntimeException e) {
			if (tx != null && tx.isActive()) {
				try {
					// Second try catch as the rollback could fail as well
					tx.rollback();
				} catch (HibernateException e1) {
					log.error(e1.getMessage());
				}
				// throw again the first exception
				throw e;
			}

		}
		return lokationsKette;
	}
	
	public static List<Land> findAllLand() {
		Session session = HibernateUtil.getSession();
		
		Query q = session.getNamedQuery("findAllLand");
		List<Land> laender = q.list();
		
		Collections.sort(laender);
		
		return laender;
	}
	

}