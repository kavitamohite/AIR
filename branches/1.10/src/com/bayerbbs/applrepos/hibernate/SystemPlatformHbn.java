package com.bayerbbs.applrepos.hibernate;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Session;

import com.bayerbbs.air.error.ErrorCodeManager;
import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.ApplreposConstants;
import com.bayerbbs.applrepos.domain.SystemPlatform;
import com.bayerbbs.applrepos.dto.SystemPlatformDTO;
import com.bayerbbs.applrepos.service.SystemPlatformEditParameterOutput;

public class SystemPlatformHbn {

	/** The logger. */
	private static final Log log = LogFactory.getLog(SystemPlatformHbn.class);
	
	/**
	 * only for testing
	 */
	public static void listSystemPlatform() 
	{
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		try 
		{
			@SuppressWarnings("rawtypes")
			Iterator iter = session.createQuery("from SystemPlatform spl order by spl.systemPlatformName").iterate();
			while (iter.hasNext())
			{
				@SuppressWarnings("unused")
				SystemPlatform element = (SystemPlatform) iter.next();
			}
		} 
		catch (RuntimeException e) 
		{
			log.error(e.getMessage());
			throw e;
		}
		finally
		{
			session.flush();
		}
	}

	/**
	 * @param systemPlatformId
	 */
	public static SystemPlatform findSystemPlatformById(Long systemPlatformId) 
	{
		SystemPlatform theSystemPlatform = null;
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		try 
		{
			theSystemPlatform = (SystemPlatform) session.load(SystemPlatform.class, systemPlatformId);	
		} 
		catch (RuntimeException e) 
		{
			log.error(e.getMessage());
			throw e;
		}
		finally 
		{
			session.flush();
		}
		return theSystemPlatform;
	}
	/**
	 * @param systemPlatformName
	 */
	public static SystemPlatform findDeletedSystemPlatformByName(String systemPlatformName) 
	{
		SystemPlatform theSystemPlatform = null;
		Session session = HibernateUtil.getSession();
		try 
		{
			theSystemPlatform = (SystemPlatform) session.createQuery("select spl from SystemPlatform as spl where spl.deleteTimestamp is not null and upper(spl.systemPlatformName) = :name")
							.setString("name", systemPlatformName.toUpperCase())
							.uniqueResult();
		} 
		catch (RuntimeException e) 
		{
			log.error(e.getMessage());
			throw e;
		}
		finally
		{
			session.flush();
		}
		return theSystemPlatform;
	}

	/**
	 * @param systemPlatformName
	 */
	public static SystemPlatform findSystemPlatformByName(String systemPlatformName) 
	{
		SystemPlatform theSystemPlatform = null;
		Session session = HibernateUtil.getSession();
		try 
		{
			theSystemPlatform = (SystemPlatform) session.createQuery("from SystemPlatform spl where upper(spl.name) = :name")
							.setString("name", systemPlatformName.toUpperCase())
							.uniqueResult();
		} 
		catch (RuntimeException e) 
		{
			log.error(e.getMessage());
			throw e;
		}
		finally
		{
			session.flush();
		}
		return theSystemPlatform;
	}

	/**
	 * updates an existing entry
	 * 
	 * @param cwid
	 * @param dto
	 * @return
	 */
	public static SystemPlatformEditParameterOutput saveSystemPlatform(String cwid,	SystemPlatformDTO dto) 
	{
		SystemPlatformEditParameterOutput output = new SystemPlatformEditParameterOutput();

		@SuppressWarnings("unused")
		String validationMessage = null;
		Session session = null; 
		if (cwid != null) 
		{
			cwid = cwid.toUpperCase();
			if (dto.getSystemPlatformID() > 0)
			{
				Long id = new Long(dto.getSystemPlatformID());
				// check input
				List<String> messages = validateSystemPlatform(dto);

				if (messages.isEmpty()) 
				{
					try 
					{
						session = HibernateUtil.getSessionFactory().getCurrentSession();
						session.beginTransaction();
						SystemPlatform theSystemPlatform = (SystemPlatform) session.get(SystemPlatform.class, id);
						if (dto.getSystemPlatformName() != null) theSystemPlatform.setName(dto.getSystemPlatformName());
						theSystemPlatform.setAlias(dto.getAlias());
						if (dto.getHwIdentOrTrans() != null) theSystemPlatform.setHwIdentOrTrans(dto.getHwIdentOrTrans());
						theSystemPlatform.getOperatingSystem().setOsNameId(dto.getOsNameID());
						theSystemPlatform.getPrimaryFunction().setPrimaryFunctionId(dto.getPrimaryFunctionID());
						theSystemPlatform.getOperationalStatus().setOperationalStatusId(dto.getOperationalStatusID());
						theSystemPlatform.getLifecycle().setLcSubStatId(dto.getLcStatusID());
						theSystemPlatform.setLicenseScanning(dto.getLicenseScanning());
						theSystemPlatform.setPriorityLevel(dto.getPriorityLevelID());
						theSystemPlatform.setSeverityLevelID(dto.getSeverityLevelID());
						theSystemPlatform.setBusinessEssentialID(dto.getBusinessEssentialID());
						theSystemPlatform.setClusterCode(dto.getClusterCode());
						theSystemPlatform.setClusterType(dto.getClusterType());
						theSystemPlatform.setVirtualHW(dto.getVirtualHW());
						theSystemPlatform.setVirtualHost(dto.getVirtualHost());
						theSystemPlatform.setVirtualHostSW(dto.getVirtualHostSW());
						// common attributes
						theSystemPlatform.setTemplate(dto.getTemplate());
						//theSystemPlatform.setResponsible(dto.getResponsible());
						//theSystemPlatform.setSubResponsible(dto.getSubResponsible());
						theSystemPlatform.setRefID(dto.getRefID());
						theSystemPlatform.setRelevanceGR1920(dto.getRelevanceGR1920());
						theSystemPlatform.setRelevanceGR1435(dto.getRelevanceGR1435());
						//theSystemPlatform.getGxpFlag().(dto.getGxpFlag());
						//theSystemPlatform.setItsecGroupID(dto.getItsecGroupID());
						theSystemPlatform.setSampleTestDate(dto.getSampleTestDate());
						theSystemPlatform.setSampleTestResult(dto.getSampleTestResult());
						// contracts
						theSystemPlatform.setSlaID(dto.getSlaID());
						theSystemPlatform.setServiceContractID(dto.getServiceContractID());
						// PL attributes
						//theSystemPlatform.setItsecPLIntegrityID(dto.getItsecPLIntegrityID());
						//theSystemPlatform.setItsecPLIntegrityText(dto.getItsecPLIntegrityText());
						//theSystemPlatform.setItsecPLAvailabilityID(dto.getItsecPLAvailabilityID());
						//theSystemPlatform.setItsecPLAvailabilityText(dto.getItsecPLAvailabilityText());
						//theSystemPlatform.setItsecPLConfidentialityID(dto.getItsecPLConfidentialityID());
						//theSystemPlatform.setItsecPLConfidentialityText(dto.getItsecPLConfidentialityText());
						// overhead
						theSystemPlatform.setUpdateUser(cwid);
						theSystemPlatform.setUpdateQuelle(ApplreposConstants.APPLICATION_GUI_NAME);
						theSystemPlatform.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
						
						session.saveOrUpdate(theSystemPlatform);
						session.getTransaction().commit();
					}
					catch (RuntimeException e)
					{
						session.getTransaction().rollback();
						log.error(e.getMessage());
						throw e;					
					}
					finally
					{
						session.flush();
					}
				}
			}
		}
		return output;
	}

	private static List<String> validateSystemPlatform(SystemPlatformDTO dto) 
	{
		List<String> messages = new ArrayList<String>();
		
		ErrorCodeManager errorCodeManager = new ErrorCodeManager();
		
		if (StringUtils.isNullOrEmpty(dto.getSystemPlatformName()))
		{
			messages.add("System platform name is empty");
		}
		else
		{
			if (!checkSplNameOrAlias(dto.getSystemPlatformName(), dto.getSystemPlatformID()))
			{
				messages.add(errorCodeManager.getErrorMessage("1100", dto.getSystemPlatformName()));
			}
		}
		return messages;
	}

	private static boolean checkSplNameOrAlias(String systemPlatformName, Long systemPlatformID) 
	{
		Boolean output = null;
		Session session = null;
		try 
		{
			session = HibernateUtil.getSessionFactory().getCurrentSession();
			Long foundS = (Long) session.createQuery("case count(*) when 0 then 0 else -1 end as found from SystemPlatform as spl where spl.systemPlatformId <> :id and :name in (upper(spl.systemPlatformName), upper(spl.alias)")
											.setLong("id", systemPlatformID)
											.setString("name", systemPlatformName.toUpperCase())
											.uniqueResult();
			Long foundA = (Long) session.createQuery("case count(*) when 0 then 0 else -1 end as found from Application as app where :name in (upper(app.applicationName), upper(app.applicationAlias))")
										.setString("name", systemPlatformName.toUpperCase())
										.uniqueResult();
			output = (foundS != 0) && (foundA != 0);
		}
		catch (RuntimeException e)
		{
			log.error(e.getMessage());
			throw e;							
		}
		finally
		{
			session.flush();
		}
		return output;
	}
}