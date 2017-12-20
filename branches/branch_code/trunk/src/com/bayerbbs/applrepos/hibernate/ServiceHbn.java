/**
 * 
 */
package com.bayerbbs.applrepos.hibernate;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.CiMetaData;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.Service;
import com.bayerbbs.applrepos.domain.ServiceEditParameterInput;
import com.bayerbbs.applrepos.service.ApplicationSearchParamsDTO;
import com.bayerbbs.applrepos.service.CiEntityEditParameterOutput;
import com.bayerbbs.applrepos.service.CiItemDTO;
import com.bayerbbs.applrepos.service.CiItemsResultDTO;
import com.bayerbbs.applrepos.service.CiSearchParamsDTO;
import com.bayerbbs.applrepos.service.LDAPAuthWS;
import com.sun.xml.bind.marshaller.Messages;

/**
 * @author equuw
 * 
 */
public class ServiceHbn extends BaseHbn {

	private static final Log log = LogFactory.getLog(ServiceHbn.class);

	public static CiItemsResultDTO findServiceBy(
			ApplicationSearchParamsDTO input) {
		if (!LDAPAuthWS.isLoginValid(input.getCwid(), input.getToken()))
			return new CiItemsResultDTO();
		;
		CiMetaData ciMetaData = new CiMetaData("SERVICE_ID", "SERVICE_NAME",
				"SERVICE_ALIAS", null, "Service", "SERVICE",
				AirKonstanten.TABLE_ID_SERVICE, null, null, null);

		StringBuilder sql = getAdvSearchCiBaseSql(input, ciMetaData);
		String sort = input.getSort();
		String dir = input.getDir();
		sql.append(" order by nlssort(");
		if (sort == null) {
			sql.append(ciMetaData.getNameField());
		} else {
			if (sort.equals("name")) {
				sql.append(ciMetaData.getNameField());
			} else {
				if (sort.equals("alias")) {
					sql.append(ciMetaData.getAliasField());
				} else {
					if (sort.equals("ciOwner")) {
						sql.append("responsible");
					} else {
						if (sort.equals("ciOwnerDelegate"))
							sql.append("sub_responsible");
						else
							sql.append(ciMetaData.getNameField());
					}
				}
			}
		}
		sql.append(", 'NLS_SORT = GENERIC_M')");

		if (StringUtils.isNotNullOrEmpty(dir)) {
			sql.append(" ").append(dir);
		}
		List<CiItemDTO> cis = new ArrayList<CiItemDTO>();

		Session session = null;
		Transaction ta = null;
		Statement stmt = null;// PreparedStatement
		ResultSet rs = null;

		Integer start = input.getStart();
		Integer limit = input.getLimit();
		Integer i = 0;
		boolean commit = false;

		try {
			session = HibernateUtil.getSession();
			ta = session.beginTransaction();
			@SuppressWarnings("deprecation")
			Connection conn = session.connection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql.toString());

			if (null == start)
				start = 0;
			if (null == limit)
				limit = 20;

			CiItemDTO ci = null;

			while (rs.next()) {
				if (i >= start && i < limit + start) {
					ci = new CiItemDTO();
					ci.setId(rs.getLong(ciMetaData.getIdField()));
					ci.setName(rs.getString(ciMetaData.getNameField()));
					if (ciMetaData.getAliasField() != null)
						ci.setAlias(rs.getString(ciMetaData.getAliasField()));
					ci.setApplicationCat1Txt(ciMetaData.getTypeName());
					ci.setCiOwner(rs.getString("responsible"));
					ci.setCiOwnerDelegate(rs.getString("sub_responsible"));
					ci.setTableId(ciMetaData.getTableId());
					ci.setDeleteQuelle(rs.getString("del_quelle"));
					if (AirKonstanten.IS_TEMPLATE == rs.getInt("template")) {
						ci.setIsTemplate(AirKonstanten.YES);
					} else {
						ci.setIsTemplate(AirKonstanten.NO);
					}
					cis.add(ci);
					// i++;
				}// else break;

				i++;
			}

			ta.commit();
			rs.close();
			stmt.close();
			conn.close();

			commit = true;
		} catch (SQLException e) {
			if (ta.isActive())
				ta.rollback();

			System.out.println(e);
		} finally {
			HibernateUtil.close(ta, session, commit);
		}

		CiItemsResultDTO result = new CiItemsResultDTO();
		result.setCiItemDTO(cis.toArray(new CiItemDTO[0]));
		result.setCountResultSet(i);// i + start
		return result;

	}

	protected static StringBuilder getAdvSearchCiBaseSql(
			CiSearchParamsDTO input, CiMetaData metaData) {
		StringBuilder sql = new StringBuilder();
		// Start Adding for C0000241362 
		String complainceGR1435=input.getComplainceGR1435();
		String complainceICS=input.getComplainceICS();
				long complainceGR1435Long;
				long complainceICSLong;
				System.out.println("complainceGR1435"+complainceGR1435);
				System.out.println("complainceICS"+complainceICS);
				if(complainceGR1435.equals("Y"))
					
					complainceGR1435Long = -1;
				else
					complainceGR1435Long=0;
				if(complainceICS.equals("Y"))
					complainceICSLong = -1;
				else
					complainceICSLong=0;
				// End Adding for C0000241362
		sql.append("SELECT ").append(metaData.getIdField()).append(", ")
				.append(metaData.getNameField());

		if (metaData.getAliasField() != null)
			sql.append(", ").append(metaData.getAliasField());

		sql.append(", RESPONSIBLE, sub_responsible, template, del_quelle FROM ")
				.append(metaData.getTableName()).append(" WHERE 1=1 ");

		// append(" hw_ident_or_trans = ").append(input.getCiSubTypeId()).
		
		// start Adding for C0000241362
				// RELEVANCE_ICS
				sql.append(" AND UPPER (RELEVANCE_ICS) = '"+complainceICSLong+"'");
				
				System.out.println("complainceGR1435Long appened"+complainceICSLong);
				// RELEVANZ_ITSEC
				sql.append("AND  UPPER (RELEVANZ_ITSEC) = '"+complainceGR1435Long+"'");
				
		System.out.println("complainceGR1435Long appened"+complainceGR1435Long);
				// End Adding for C0000241362 
		if (input.getShowDeleted() == null
				|| !input.getShowDeleted().equals(AirKonstanten.YES_SHORT))
			sql.append(" AND del_quelle IS NULL");
		
		

		sql.append(" AND (UPPER(").append(metaData.getNameField())
				.append(") LIKE '");

		if (CiEntitiesHbn.isLikeStart(input.getQueryMode()))
			sql.append("%");

		sql.append(input.getCiNameAliasQuery().toUpperCase());

		if (CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
			sql.append("%");

		sql.append("'");

		if (metaData.getAliasField() != null) {
			sql.append(" OR UPPER(").append(metaData.getAliasField())
					.append(") like '");

			if (CiEntitiesHbn.isLikeStart(input.getQueryMode()))
				sql.append("%");

			sql.append(input.getCiNameAliasQuery().toUpperCase());

			if (CiEntitiesHbn.isLikeEnd(input.getQueryMode()))
				sql.append("%");

			sql.append("') ");
		}
System.out.println("Service SQL"+sql);
		boolean isNot = false;

		if (StringUtils.isNotNullOrEmpty(input.getItSetId())) {
			isNot = isNot(input.getItSetOptions());
			sql.append(
					" AND NVL(itset, 0) " + getEqualNotEqualOperator(isNot)
							+ " ").append(Long.parseLong(input.getItSetId()));
		}

		if (StringUtils.isNotNullOrEmpty(input.getBusinessEssentialId())) {
			isNot = isNot(input.getBusinessEssentialOptions());
			sql.append(
					" AND business_essential_id "
							+ getEqualNotEqualOperator(isNot) + " ").append(
					Long.parseLong(input.getBusinessEssentialId()));
		}

		if (StringUtils.isNotNullOrEmpty(input.getItSecGroupId())) {
			Long itsec = Long.parseLong(input.getItSecGroupId());
			isNot = isNot(input.getItSecGroupId());
			if(1234567<=itsec && itsec<=1234578){
				sql.append(" and NVL(ITSEC_GRUPPE_ID, -1) "+ getEqualNotEqualOperator(isNot) +" ").append(10136);
			}else{
				sql.append(" and NVL(ITSEC_GRUPPE_ID, -1) "+ getEqualNotEqualOperator(isNot) +" ").append(itsec);
			}
		}

		if (StringUtils.isNotNullOrEmpty(input.getSource())) {
			isNot = isNot(input.getSourceOptions());
			sql.append(
					" AND insert_quelle " + getEqualNotEqualOperator(isNot)
							+ " '").append(input.getSource()).append("'");
		}

		if (StringUtils.isNotNullOrEmpty(input.getCiOwnerHidden())) {
			isNot = isNot(input.getCiOwnerOptions());

			sql.append(" AND (");
			if (isNot)
				sql.append("UPPER(RESPONSIBLE) IS NULL OR ");

			sql.append(
					"UPPER(RESPONSIBLE) " + getLikeNotLikeOperator(isNot)
							+ " '")
					.append(input.getCiOwnerHidden().toUpperCase())
					.append("')");
		}

		if (StringUtils.isNotNullOrEmpty(input.getCiOwnerDelegate())) {
			boolean isCwid = input.getCiOwnerDelegate().indexOf(')') > -1;
			String delegate = isCwid ? input.getCiOwnerDelegateHidden() : input
					.getCiOwnerDelegate();

			isNot = isNot(input.getCiOwnerDelegateOptions());

			sql.append(" AND (");
			if (isNot)
				sql.append("UPPER(sub_responsible) IS NULL OR ");

			sql.append(
					"UPPER(sub_responsible) " + getLikeNotLikeOperator(isNot)
							+ " '").append(delegate.toUpperCase()).append("')");

			if (!isCwid)
				sql.insert(sql.length() - 2, '%');
		}
		String template = input.getIsTemplate();
		if (null != input) {
			String searchTemplate = null;
			if ("Y".equals(template)) {
				searchTemplate = "-1";
			} else if ("N".equals(template)) {
				searchTemplate = "0";
			}

			if (null != searchTemplate) {
				sql.append(" and NVL(template, 0) = ").append(searchTemplate);
			}
		}

		return sql;
	}

	public static List<Service> findServiceByNameORAlias(String name,
			String alias) {
		Session session = HibernateUtil.getSession();
		Query query = session.getNamedQuery("findServicesByNameORAlias");
		query.setParameter("name", name);
		query.setParameter("alias", alias);

		@SuppressWarnings("unchecked")
		List<Service> services = query.list();
		return services;

	}

	public static void createService(ServiceEditParameterInput input,
			CiEntityEditParameterOutput output) {
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		Long id = null;
		boolean autoCommit = false;
		try {
			Service service = new Service();
			setUpServiceCi(input, service, true);
			id = (Long) session.save(service);
			session.flush();
			autoCommit = true;
		} catch (Exception e) {
			output.setResult(AirKonstanten.RESULT_ERROR);
			output.setMessages(new String[] { e.getMessage() });

		} finally {
			String hbnMessage = HibernateUtil.close(tx, session, autoCommit);
			if (autoCommit) {
				if (null == hbnMessage) {
					output.setResult(AirKonstanten.RESULT_OK);
					output.setMessages(new String[] { EMPTY });
					output.setTableId(AirKonstanten.TABLE_ID_SERVICE);
					output.setCiId(id);
				} else {
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { hbnMessage });
				}
			}
		}
	}

	private static  void setUpServiceCi(ServiceEditParameterInput input,
			Service service, boolean isCiCreate) {
		if (isCiCreate) {
			service.setInsertUser(input.getCwid());
			service.setInsertQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			service.setInsertTimestamp(ApplReposTS.getCurrentTimestamp());

			service.setUpdateUser(input.getCwid());
			service.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			service.setUpdateTimestamp(service.getInsertTimestamp());
		} else {
			service.setUpdateUser(input.getCwid());
			service.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
			service.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
		}
		service.setServiceName(input.getName());
		service.setProjectName(input.getProjectName());
		service.setOrderNumber(input.getOrderNumber());
		service.setOrganisationalScope(input.getOrganisationalScope());
		service.setServiceDescription(input.getServiceDescription());
		service.setServiceAias(input.getServiceAias());

		if (null != input.getSlaId()) {
			if (-1 != input.getSlaId())
				service.setSlaId(input.getSlaId());
		}
		if (null != input.getServiceContractId()) {
			if (-1 != input.getServiceContractId())
				service.setServiceContractId(input.getServiceContractId());
		}

		service.setCiOwner(input.getCiOwnerHidden());
		service.setCiOwnerDelegate(input.getCiOwnerDelegateHidden());


	}

	public static void saveService(ServiceEditParameterInput input,
			CiEntityEditParameterOutput output) {
		Long id = input.getId();
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		Service service = (Service) session.get(Service.class, id);
		if (null == service) {
			// Service was not found in database
			output.setErrorMessage("1000", EMPTY + id);
		} else if (null != service.getDeleteTimestamp()) {
			// Ways is deleted
			output.setErrorMessage("1001", EMPTY + id);
		} else {
			setUpServiceCi(input, service, false);
		}
		boolean toCommit = false;
		try {
			session.saveOrUpdate(service);
			session.flush();
			toCommit = true;
		} catch (Exception e) {
			String message = e.getMessage();
			log.error(message);
			// handle exception
			output.setResult(AirKonstanten.RESULT_ERROR);
			message = ApplReposHbn.getOracleTransbaseErrorMessage(message);
			output.setMessages(new String[] { message });

		} finally {
			String hbnMessage = HibernateUtil.close(tx, session, toCommit);
			if (toCommit && null != service) {
				if (null == hbnMessage) {
					output.setResult(AirKonstanten.RESULT_OK);
					output.setMessages(new String[] { EMPTY });
				} else {
					output.setResult(AirKonstanten.RESULT_ERROR);
					output.setMessages(new String[] { hbnMessage });
				}

			}
		}

	}

}
