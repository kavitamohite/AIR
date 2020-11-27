package com.bayerbbs.applrepos.hibernate;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.AttributeValue;
import com.bayerbbs.applrepos.domain.SpecialAttribute;
import com.bayerbbs.applrepos.dto.SpecialAttributeViewDataDTO;
import com.bayerbbs.applrepos.service.AccessRightChecker;

public class SpecialAttributeHbn {

	private static String asIsStatus = "AS_IS";
	private static String toBeStatus = "TO_BE";

	public synchronized static boolean saveSpecialAttributeFromDTO(String cwid,String token, Long cIid, Long tableId, SpecialAttributeViewDataDTO specialAttributeViewDataDTO) {

		SpecialAttribute asIs = null, toBe = null;
		SpecialAttribute asIsTemp = new SpecialAttribute(), toBeTemp = new SpecialAttribute();
		Long oldToBevalue = 0L;
		List<SpecialAttribute> specialAttribute = findByCiIdAndAttributeId(cIid, specialAttributeViewDataDTO.getAttributeId());

		for (SpecialAttribute spAttribute : specialAttribute) {
			if ("AS_IS".equals(spAttribute.getStatus())) {
				asIs = spAttribute;
				asIsTemp.setDeleteTimestamp(asIs.getDeleteTimestamp());
			} else {
				toBe = spAttribute;
				
				oldToBevalue = toBe.getAttributeValue().getId();
				if((specialAttributeViewDataDTO.getToBeValueId() == null || specialAttributeViewDataDTO.getToBeValueId() == 0l || specialAttributeViewDataDTO.getToBeValueId()== Long.MAX_VALUE) && toBe.getDeleteTimestamp()!= null){
					oldToBevalue = 0L;
				}
				toBeTemp.setDeleteTimestamp(toBe.getDeleteTimestamp());
			}
		}

		if (asIs == null) {
			asIs = new SpecialAttribute();
			asIs.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			asIs.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
			asIs.setInsertUser(cwid);
			asIs.setCiId(cIid);
			asIs.setTableId(tableId);
			asIs.setAttribute(AttributeHbn.findById(specialAttributeViewDataDTO.getAttributeId()));

			asIs.setStatus(asIsStatus);
		}

		if (specialAttributeViewDataDTO.getAsIsValueId() == null || specialAttributeViewDataDTO.getAsIsValueId() == 0l || specialAttributeViewDataDTO.getAsIsValueId() == 1000000000000L) {
			asIs.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			asIs.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());
			asIs.setDeleteUser(cwid);
		} else {
			asIs.setAttributeValue(new AttributeValue(specialAttributeViewDataDTO.getAsIsValueId()));
            asIsTemp.setDeleteTimestamp(null);
			asIs.setDeleteQuelle(null);
			asIs.setDeleteTimestamp(null);
			asIs.setDeleteUser(null);
			asIs.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			asIs.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
			asIs.setUpdateUser(cwid);

		}
		if(AccessRightChecker.hasRole(cwid, token, AirKonstanten.ROLE_AIR_SPECIAL_ATTRIBUTE_EDITOR)){
		if (toBe == null) {
			toBe = new SpecialAttribute();
			toBe.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			toBe.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());
			toBe.setInsertUser(cwid);
			toBe.setCiId(cIid);
			toBe.setTableId(tableId);
			toBe.setAttribute(AttributeHbn.findById(specialAttributeViewDataDTO.getAttributeId()));

			toBe.setStatus(toBeStatus);
		}

		if (specialAttributeViewDataDTO.getToBeValueId() == null || specialAttributeViewDataDTO.getToBeValueId() == 0l || specialAttributeViewDataDTO.getToBeValueId()== Long.MAX_VALUE) {
			toBe.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			toBe.setDeleteTimestamp(ApplReposTS.getDeletionTimestamp());
			toBe.setDeleteUser(cwid);
		} else {
			toBe.setAttributeValue(new AttributeValue(specialAttributeViewDataDTO.getToBeValueId()));
            toBeTemp.setDeleteTimestamp(null);
			toBe.setDeleteQuelle(null);
			toBe.setDeleteTimestamp(null);
			toBe.setDeleteUser(null);
			toBe.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			toBe.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
			toBe.setUpdateUser(cwid);
		}
		}

		Session session = HibernateUtil.getSession();

		Transaction tx = null;
		tx = session.beginTransaction();
		try {
			if (asIs.getId() == null && asIs.getAttributeValue() != null) {
//				System.out.println("Debug 11 ");
				session.createSQLQuery(createInsertQuery(asIs, cwid)).executeUpdate();
			} else if (asIs.getId() != null) {
//				System.out.println("Debug 12 ");
//				System.out.println("asis::"+asIs);
				session.update(asIs);					
			}
			if(AccessRightChecker.hasRole(cwid, token, AirKonstanten.ROLE_AIR_SPECIAL_ATTRIBUTE_EDITOR)){
			if (toBe.getId() == null && toBe.getAttributeValue() != null) {
				System.out.println("Debug 13 ");
				session.createSQLQuery(createInsertQuery(toBe, cwid)).executeUpdate();

			} else if (toBe.getId() != null) {
				System.out.println("Debug 14 ");
				session.update(toBe);
			}
			}

			session.flush();
			tx.commit();
			
		} catch (Exception e) {
			
			e.printStackTrace();
			if (tx.isActive()) {
				tx.rollback();
			}
			return false;
		} finally {
			if (tx.isActive()) {
				tx.commit();
			}
			session.close();
		}
		
		final Long  a=toBe.getTableId();
//		System.out.println("a::"+a);
		final Long  b=toBe.getCiId();
//		System.out.println("b::"+b);
		final Long  c=toBe.getAttribute().getId();
//		System.out.println("c::"+c);
		final Long  d=specialAttributeViewDataDTO.getToBeValueId();
//		System.out.println("d::"+d);
		final Long  e=oldToBevalue;
//		System.out.println("e"+e);
		final String f=cwid;
//		System.out.println("f"+f);
			
		try{
//			System.out.println("outside If oldToBevalue ="+oldToBevalue +" specialAttributeViewDataDTO.getToBeValueId="+specialAttributeViewDataDTO.getToBeValueId());
			if(!oldToBevalue.equals(specialAttributeViewDataDTO.getToBeValueId())){
				
//				System.out.println("In If 1 "+a+" cid "+b+" &  "+c);
				if (specialAttributeViewDataDTO.getToBeValueId() == null
						&& toBe.getAttributeValue() != null) {
//					System.out.println("In If 2 "+a+" cid "+b+" &  "+c);
					
					//Long tableId, Long ciId, Long attributeId, Long attributeValueId, Long prevAttributeValueId, String source,
					if(oldToBevalue!=0L){
						
//						System.out.println("In If 3 dam chalna h "+a+" cid "+b+" &  "+c);
						ExecutorService executor = Executors.newSingleThreadExecutor();
						
						executor.submit(new Runnable() {
							
							@Override
							public void run() {
								// TODO Auto-generated method stub
								startInheritance(a, b, c,d, e,AirKonstanten.APPLICATION_GUI_NAME, f);
								
							}
						});
						
//						System.out.println("In If 3 dam chala diay  "+a+" cid "+b+" &  "+c);
					/*startInheritance(toBe.getTableId(), toBe.getCiId(), toBe
							.getAttribute().getId(),
							specialAttributeViewDataDTO.getToBeValueId(), oldToBevalue,
							AirKonstanten.APPLICATION_GUI_NAME, cwid);*/
					
					}
					
					} else if (specialAttributeViewDataDTO.getToBeValueId() != null) {
//						System.out.println("In else 4 "+a+" cid "+b+" &  "+c);
						ExecutorService executor1 = Executors.newSingleThreadExecutor();
						
						executor1.submit(new Runnable() {
							
							@Override
							public void run() {
								// TODO Auto-generated method stub
								startInheritance(a, b, c,d, e,AirKonstanten.APPLICATION_GUI_NAME, f);
								
							}
						});
						
//						System.out.println("In else 4 chal gya "+a+" cid "+b+" &  "+c);

				/*	startInheritance(toBe.getTableId(), toBe.getCiId(), toBe
							.getAttribute().getId(),
							specialAttributeViewDataDTO.getToBeValueId(), oldToBevalue,
							AirKonstanten.APPLICATION_GUI_NAME, cwid);*/
				}
				}
			
		}
		catch(Exception w ){
			w.printStackTrace();
			//return false;
		}
		/*catch (Exception z) {
			z.printStackTrace();
			return false;
			// TODO: handle exception
		}*/
		
		
		return true;
	}

	@SuppressWarnings("unchecked")
	private static List<SpecialAttribute> findByCiIdAndAttributeId(Long cIid, Long attributeId) {
		List<SpecialAttribute> values = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			values = session.createQuery("select h from SpecialAttribute as h where h.ciId = " + cIid + " and h.attribute = " + attributeId).list();

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			HibernateUtil.close(tx, session, false);
		}
		return values;
	}

	@SuppressWarnings("unchecked")
	public static List<SpecialAttribute> findByCiId(Long cIid) {
		List<SpecialAttribute> values = null;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			values = session.createQuery("select h from SpecialAttribute as h where h.ciId = " + cIid).list();

			HibernateUtil.close(tx, session, true);
		} catch (RuntimeException e) {
			HibernateUtil.close(tx, session, false);
		}
		return values;
	}

	private static String createInsertQuery(SpecialAttribute specialAttribute, String cwid) {
		String insertQuery = "insert into CI_ATTRIBUTE_VALUE_RELATION (INSERT_QUELLE, INSERT_TIMESTAMP, INSERT_USER, UPDATE_QUELLE, UPDATE_TIMESTAMP, UPDATE_USER, ATTRIBUTE_ID, ATTRIBUTE_VALUE_ID, CI_ID, STATUS, TABLE_ID) values "
				+ "('"
				+ AirKonstanten.APPLICATION_GUI_NAME
				+ "', systimestamp"
				+ ", '"
				+ cwid
				+ "', '"
				+ AirKonstanten.APPLICATION_GUI_NAME
				+ "', "
				+ "systimestamp, '"
				+ cwid
				+ "',"
				+ specialAttribute.getAttribute().getId()
				+ ","
				+ specialAttribute.getAttributeValue().getId()
				+ ","
				+ specialAttribute.getCiId()
				+ ",'"
				+ specialAttribute.getStatus()
				+ "',"
				+ specialAttribute.getTableId() + ")";

		return insertQuery;

	}

	public static void startInheritance(Long tableId, Long ciId, Long attributeId, Long attributeValueId, Long prevAttributeValueId, String source,
			String user)  {
		String sql = "{? = call PCK_INHERITANCE.FV_Inheritance_Attr(?,?,?,?,?,?,?)}";

		Transaction ta = null;
		Session session = HibernateUtil.getSession();
		 
		boolean commit = false;
		 //System.out.println("Inherited started for ");
//		System.out.println("Inherited started for "+System.nanoTime());
//		System.out.println("Table inheritence :" + tableId);
//		System.out.println("ciId :" + ciId);
//		System.out.println("attributeId :" + attributeId);
//		System.out.println("attributeValueId :" + attributeValueId);
//		System.out.println("prevAttributeValueId :" + prevAttributeValueId);
//		System.out.println("source :" + source);
//		System.out.println("user :" + user);

		try {
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();

			CallableStatement stmt = conn.prepareCall(sql);
			stmt.registerOutParameter(1, Types.VARCHAR);
			stmt.setLong(2, tableId);
			stmt.setLong(3, ciId);
			stmt.setLong(4, attributeId);
			stmt.setObject(5, attributeValueId);
			stmt.setObject(6, prevAttributeValueId);
			stmt.setString(7, source);
			stmt.setString(8, user);
			stmt.execute();
			//throw new Exception("Check Attribute ");
			ta.commit();

			stmt.close();
			conn.close();

			commit = true;
		} catch (SQLException e) {
			e.printStackTrace();
			//throw new SQLException(e);
		} 
		catch (Exception e) {
			e.printStackTrace();
			//throw new Exception(e);
		}finally {
			System.out.println("Inherited ended  for "+System.nanoTime());
			System.out.println("Table inheritence :" + tableId);
			System.out.println("ciId :" + ciId);
			System.out.println("attributeId :" + attributeId);
			System.out.println("attributeValueId :" + attributeValueId);
			System.out.println("prevAttributeValueId :" + prevAttributeValueId);
			System.out.println("source :" + source);
			System.out.println("user :" + user);
			
			HibernateUtil.close(ta, session, commit);
		}
	}

}
