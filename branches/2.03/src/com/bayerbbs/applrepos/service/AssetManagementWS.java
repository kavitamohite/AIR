package com.bayerbbs.applrepos.service;

import java.sql.Timestamp;

import org.hibernate.CacheMode;
import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.bayerbbs.applrepos.common.ApplReposTS;
import com.bayerbbs.applrepos.common.StringUtils;
import com.bayerbbs.applrepos.constants.AirKonstanten;
import com.bayerbbs.applrepos.domain.HardwareComponent;
import com.bayerbbs.applrepos.dto.AssetViewDataDTO;
import com.bayerbbs.applrepos.hibernate.HardwareComponentHbn;
import com.bayerbbs.applrepos.hibernate.HibernateUtil;
import com.bayerbbs.applrepos.hibernate.SoftwareComponentHbn;

public class AssetManagementWS {

	public AssetManagementParameterOutput searchAsset(
			AssetManagementParameterInput input) {

		AssetManagementParameterOutput out = null;

		if (input.getQueryMode().equalsIgnoreCase("hardware")) {
			if (input.getAssetId() != null) {
				out = HardwareComponentHbn.findAssetById(input.getAssetId());
			} else {
				out = HardwareComponentHbn.searchAsset(input);
			}
		} else if (input.getQueryMode().equalsIgnoreCase("software")) {
			if (input.getAssetId() != null) {
				out = SoftwareComponentHbn.findAssetById(input.getAssetId());
			} else {
				out = SoftwareComponentHbn.searchAsset(input);
			}
		}

		return out;
	}

	public AssetManagementParameterOutput saveAsset(AssetViewDataDTO dto) {
		AssetManagementParameterOutput output = new AssetManagementParameterOutput();
		if (dto.getIsSoftwareComponent() != null
				&& dto.getIsSoftwareComponent()) {
			dto = SoftwareComponentHbn.saveSoftwareAsset(dto);
		} else {
			dto = HardwareComponentHbn.saveHardwareAsset(dto);
		}
		if (dto == null) {
			output.setResult(false);
		} else {
			if(StringUtils.isNotNullOrEmpty(dto.getError())){
				output.setResult(false);
			} else {
				output.setResult(true);
			}
			output.setAssetViewDataDTO(new AssetViewDataDTO[] { dto });
		}
		return output;
	}
	
	public DeleteAssetParameterOutput deleteAssets(AssetManagementParameterInput input){		
		DeleteAssetParameterOutput output = new DeleteAssetParameterOutput();
			String sql = "select h from HardwareComponent as h where h.id in("
				+ input.getSelectedAssets() + ")";
			Session session = HibernateUtil.getSession();
			Transaction tx = session.beginTransaction();
			boolean toCommit = false;
			try {
				ScrollableResults hardwareAssets = session.createQuery(sql)
				.setCacheMode(CacheMode.IGNORE)
				.scroll(ScrollMode.FORWARD_ONLY);
				int count=0;
				while(hardwareAssets.next()){
					HardwareComponent component = (HardwareComponent) hardwareAssets.get(0);
					component.setDeleteQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					component.setDeleteUser(input.getCwid());
					component.setDeleteTimestamp(ApplReposTS.getCurrentTimestamp());
					component.setUpdateQuelle(AirKonstanten.APPLICATION_GUI_NAME);
					component.setUpdateUser(input.getCwid());
					component.setUpdateTimestamp(ApplReposTS.getCurrentTimestamp());
					if (++count % 20 == 0) {
						session.flush();
						session.clear();
					}
				}
				session.flush();
				session.clear();
                tx.commit();
                toCommit=true;
			} catch (Exception e) {
				output.setResult(AirKonstanten.RESULT_ERROR);
				output.setMessages(new String[] { e.getCause()
						.getMessage() });
			}finally{
				String hbnMessage = HibernateUtil.close(tx, session, toCommit);
				if (toCommit) {
					if (null == hbnMessage) {
						output.setResult(AirKonstanten.RESULT_OK);
						output.setMessages(new String[] { "" });
					} else {
						output.setResult(AirKonstanten.RESULT_ERROR);
						output.setMessages(new String[] { hbnMessage });
					}
				}
			}
		   return output;
	}

}
