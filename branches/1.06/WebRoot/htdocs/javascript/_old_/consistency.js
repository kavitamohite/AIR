//function isDraft() {
//	records = aclstore.getRange();
//	var commonRetValue = false;
//	var oppositeRetValue = false;
//	Ext.each(records, function(item, index, allItems) {
//		if (item.data.Mandatory==='needed') {
//			draftItemCmp = Ext.getCmp(item.data.id);
//			if(draftItemCmp!==undefined) {
//				switch (draftItemCmp.getXType()) {
//					case "textfield":
//					case "textarea":
//					case "combo":
//						if (draftItemCmp.getValue()===undefined || draftItemCmp.getValue()==="") {
//							if (draftItemCmp.disabled) {
//								oppositeRetValue = oppositeRetValue || true;
//							} else {
//								commonRetValue = commonRetValue || true;
//							}
//						}
//					break;
//				}
//			}
//		}
//		
//	});
//	
////	acl = applicationDetailStore.getRange(0,0);
////	op = acl[0].get('relevanceOperational');
////	st = acl[0].get('relevanceStrategic');
//	
//	var appDetail = applicationDetailStore.data.items[0].data;//AIR.ApplicationManager.getAppDetail();(#3)
//	var relevanceOperational = appDetail.relevanceOperational;
//	var relevanceStrategic = appDetail.relevanceStrategic;
//	
//	if (commonRetValue || ('Y' === relevanceOperational && 'Y' === relevanceStrategic)) {//'Y'===op && 'Y'===st
//		draftFlag = "";
//		return commonRetValue;
//	}
//	if ('Y' === relevanceOperational) {//'Y'===op
//		draftFlag = "(" + languagestore.getAt(0).data['wizardAppowner'] + ")"; // TODO hier das richtige Element aus der Editmaske ziehen
//		return oppositeRetValue;
//	}
//	if ('Y' === relevanceStrategic) {//'Y'===st
//		draftFlag =  "(" + languagestore.getAt(0).data['wizardCiowner'] + ")"; // TODO hier das richtige Element aus der Editmaske ziehen
//		return oppositeRetValue;
//	}
//	draftFlag = "(unknown)";
//	return commonRetValue;
//}

//function setDraft(isDraft) {
//	if (Ext.getCmp('workpanel').layout.activeItem.id === 'editPanel') {
//		if(isDraft) {
//			Ext.getCmp('editpaneldraft').el.dom.innerHTML = languagestore.getAt(0).data['header_applicationIsDraft'].replace('##', draftFlag);
//			Ext.getCmp('editpaneldraft').show();
//		} else {
//			Ext.getCmp('editpaneldraft').hide();
//		}
//	}
//}
//
//function listRequiredFields() {
//	incompleteFieldList = '';
//	records = aclstore.getRange();
//	Ext.each(records, function(item, index, allItems) {
//		if (item.data.Mandatory==='required') {
//			reqItemCmp = Ext.getCmp(item.data.id);
//			if(reqItemCmp!==undefined) {
//				switch (reqItemCmp.getXType()) {
//					case "textfield":
//					case "textarea":
//					case "combo":
//						if (!reqItemCmp.disabled && (reqItemCmp.getValue()===undefined || reqItemCmp.getValue()==="")) {
//							rec = languagestore.getAt(0).data;
//							if (rec[reqItemCmp.id]!==undefined) {
//								incompleteFieldList += rec[reqItemCmp.id] + ', ' ;
//							}
//						}
//					break;
//				}
//			}
//		}
//	});
//	if (incompleteFieldList.length>2) {
//		incompleteFieldList = incompleteFieldList.substring(0, incompleteFieldList.length-2);
//	}
//	return incompleteFieldList;
//}
//
//function setPanelMessage(message) {
//	if (Ext.getCmp('workpanel').layout.activeItem.id === 'editPanel') {
//		if(message!==undefined && message!=="") {
//			Ext.get("editpanelmessage").dom.innerHTML = message;
//			Ext.getCmp('editpanelmessage').show();
//		} else {
//			Ext.getCmp('editpanelmessage').hide();
//		}
//	}
//}


