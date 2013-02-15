package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.domain.Group;
import com.bayerbbs.applrepos.dto.GroupsDTO;

public class GroupHbn {

	/**
	 * converts the list entry database table to dto
	 * 
	 * @param input
	 * @return
	 */
	private static List<GroupsDTO> getDTOList(List<Group> input) {
		ArrayList<GroupsDTO> listDTO = new ArrayList<GroupsDTO>();

		for (Iterator<Group> iter = input.iterator(); iter.hasNext();) {
			Group data = (Group) iter.next();
			GroupsDTO dto = new GroupsDTO();

			dto.setGroupId(data.getGroupId());
			
			StringBuffer sb = new StringBuffer();
			sb.append(data.getGroupName());
			if (null != data.getOrgUnit()) {
				sb.append(" (").append(data.getOrgUnit()).append(")");	
			}
			
			dto.setGroupName(sb.toString());
			dto.setManagerCwid(data.getManagerCwid());
			dto.setManagerSubstituteCwid(data.getManagerSubstituteCwid());

			listDTO.add(dto);
		}
		return listDTO;
	}

	/**
	 * returns the array from list
	 * 
	 * @param input
	 * @return
	 */
	public static GroupsDTO[] getArrayFromList(List<GroupsDTO> input) {
		GroupsDTO output[] = new GroupsDTO[input.size()];
		int i = 0;
		for (final GroupsDTO data : input) {
			output[i] = data;
			i++;
		}
		return output;
	}

	public static List<GroupsDTO> listGroupsHbn() {
		List<GroupsDTO> listResult = new ArrayList<GroupsDTO>();

		boolean commit = false;
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<Group> values = session.createQuery("select h from Group as h where order by h.groupName").list();

			listResult = getDTOList(values);
			commit = true;
		} catch (RuntimeException e) {
			System.out.println(e);
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}

	
	public static GroupsDTO findGroupByName(String groupname) {
		GroupsDTO groupsDTO = null;

		List<GroupsDTO> listResult = new ArrayList<GroupsDTO>();

		boolean commit = false;
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			List<Group> values = session.createQuery("select h from Group as h where upper(h.groupName) = '" + groupname.toUpperCase() +"'").list();

			listResult = getDTOList(values);
			commit = true;
			
			if (null != listResult && !listResult.isEmpty()) {
				groupsDTO = listResult.get(0);
			}
		} catch (RuntimeException e) {
			System.out.println(e);
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return groupsDTO;
	}
	
	/**
	 * finds groups by group UsageName
	 * @param groupUsageName
	 * @return
	 */
	public static List<GroupsDTO> findGroupByGroupUsage(String groupUsageName) {
		String searchParameter = null;
		if ("CHANGE_TEAM_Y_N".equals(groupUsageName)) {
			searchParameter = "changeTeamYN";
		}
		else if ("CI_OWNER_Y_N".equals(groupUsageName)) {
			searchParameter = "ciOwnerYN";
		}
		else if ("ESCALATION_LIST_Y_N".equals(groupUsageName)) {
			searchParameter = "escalationListYN";
		}
		else if ("IMPACTED_BUSINESS_GROUP_Y_N".equals(groupUsageName)) {
			searchParameter = "impactedBusinessGroupYN";
		}
		else if ("IMPLEMENTATION_TEAM_Y_N".equals(groupUsageName)) {
			searchParameter = "implementationTeamYN";
		}
		else if ("OWNING_BUSINESS_GROUP_Y_N".equals(groupUsageName)) {
			searchParameter = "owningBusinessGroupYN";
		}
		else if ("SERVICE_COORDINATOR_Y_N".equals(groupUsageName)) {
			searchParameter = "serviceCoordinatorYN";
		}
		else if ("SUPPORT_GROUP_IM_RESOLVER_Y_N".equals(groupUsageName)) {
			searchParameter = "supportGroupImResolverYN";
		}

		if (null != searchParameter) {
			searchParameter = " and " + searchParameter + "='Y'";
		}
		
		List<GroupsDTO> listResult = new ArrayList<GroupsDTO>();

		boolean commit = false;
		Transaction tx = null;
		Session session = HibernateUtil.getSession();
		try {
			tx = session.beginTransaction();
			List<Group> values = session.createQuery("select h from Group as h where " + searchParameter + " order by h.groupName").list();

			listResult = getDTOList(values);
			commit = true;
		} catch (RuntimeException e) {
			System.out.println(e);
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}
	

	public static List<GroupsDTO> findGroupsByName(String groupname, String impactedBusinessGroup,
		String changeTeam,
		String ciOwner,
		String escalationList,
		String implementataionTeam,
		String owningBusinessGroup,
		String serviceCoordinator,
		String supportGroupIMResolver,
		String managerCWID,
		String fullLikeSearch,
		int start,
		int limit) {
		
		List<GroupsDTO> listResult = new ArrayList<GroupsDTO>();
		

		StringBuffer sb = new StringBuffer();
		sb.append("select h from Group as h where 1=1");
		if (null != groupname) {
			sb.append(" and upper(h.groupName) like '");
			if (null != fullLikeSearch) {
				sb.append("%");
			}
			sb.append(groupname.toUpperCase().replace("_", "\\_") +"%' ESCAPE '\\'");
		}
		
		if ("Y".equals(impactedBusinessGroup)) {
			sb.append(" and h.impactedBusinessGroupYN='Y'");
		}
		if ("Y".equals(changeTeam)) {
			sb.append(" and h.changeTeamYN='Y'");
		}
		if ("Y".equals(ciOwner)) {
			sb.append(" and h.ciOwnerYN='Y'");
		}
		if ("Y".equals(escalationList)) {
			sb.append(" and h.escalationListYN='Y'");
		}
		if ("Y".equals(implementataionTeam)) {
			sb.append(" and h.implementationTeamYN='Y'");
		}
		if ("Y".equals(owningBusinessGroup)) {
			sb.append(" and h.owningBusinessGroupYN='Y'");
		}
		if ("Y".equals(serviceCoordinator)) {
			sb.append(" and h.serviceCoordinatorYN='Y'");
		}
		if ("Y".equals(supportGroupIMResolver)) {
			sb.append(" and h.supportGroupImResolverYN='Y'");
		}
		if (null != managerCWID) {
			sb.append(" and upper(h.managerCwid) ='").append(managerCWID.toUpperCase()).append("'");
		}
		
		sb.append(" order by h.groupName");
		
		boolean commit = false;
		Transaction tx = null;
		Session session = HibernateUtil.getSessionFactory().openSession();
		try {
			tx = session.beginTransaction();
			Query query = session.createQuery(sb.toString());
			
//			System.out.println("start="+start+" limit="+limit);
			if(start > 0 || limit > 0)
				query.setFirstResult(start).setMaxResults(limit);
			
			List<Group> values = query.list();

			listResult = getDTOList(values);
			commit = true;
		} catch (RuntimeException e) {
			System.out.println(e);
		}
		finally {
			HibernateUtil.close(tx, session, commit);
		}

		return listResult;
	}
	
	public static String getCleanedGroupname(String input) {
		if (null != input && -1 != input.indexOf(" (")) {
			return input.substring(0, input.indexOf(" ("));
		}
		return input;
	}
}