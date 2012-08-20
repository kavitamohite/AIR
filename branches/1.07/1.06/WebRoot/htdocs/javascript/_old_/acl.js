//Ext.apply(Ext.form.VTypes, {
//    //  vtype validation function
//    required: function(val, field) {
//        return val!==undefined && val !=='';
//    },
//    // vtype Text property: The error text to display when the validation function returns false
//    requiredText: 'This field ist required.'
//});
//
//
//var needed = '<span class="x-form-text-required"> </span>';
//
//var aclOldValue = "";
//var specialKeyPressed = false;
//
//
//function setFormElementEnable(item, enable) {
//	if(enable) {
//		item.enable();
//		
//		switch (item.getXType()) {
//			case 'checkboxgroup':
//			case 'radiogroup':
//			case 'button':
//				item.enable();
//				break;
//			case 'textfield':
//			case 'textarea':
//				if (Ext.getCmp(item.id + 'addimg')!==undefined) {
//					Ext.getCmp(item.id + 'addimg').show();
//				}
//				if (Ext.getCmp(item.id + 'addgroupimg')!==undefined) {
//					Ext.getCmp(item.id + 'addgroupimg').show();
//				}
//				if (Ext.getCmp(item.id + 'removeimg')!==undefined) {
//					Ext.getCmp(item.id + 'removeimg').show();
//				}
//				break;
//			case 'combo':
//				item.setHideTrigger(false);
//				if (item.el.dom.className.indexOf("x-item-disabled")>-1) {
//					cls = item.el.dom.className.split(" ");
//					item.el.dom.className = "";
//					for(var x=0;x<cls.length;++x) {
//						if (cls[x]!=='x-item-disabled') {
//							item.el.dom.className += " "+ cls[x];
//						}
//					}
//					
//				}
//			    break;
//			case 'listview':
//				item.show();
//				Ext.getCmp(item.id + 'Hidden').hide();
//				Ext.getCmp(item.id + 'Hidden').setValue('');
//				sValue = '';
//				break;
////			case 'grid':
////				addbutton = Ext.getCmp(item.id + 'AddButton');
////				if (addbutton!==undefined) {
////					addbutton.enable();
////				}
////				removebutton = Ext.getCmp(item.id + 'RemoveButton');
////				if (removebutton!==undefined) {
////					removebutton.enable();
////				}
////				break;
//		}
//	} else {
//		switch (item.getXType()) {
//			case 'textfield':
//			case 'textarea':
//				if (Ext.getCmp(item.id + 'addimg')!==undefined) {
//					Ext.getCmp(item.id + 'addimg').hide();
//				}
//				if (Ext.getCmp(item.id + 'addgroupimg')!==undefined) {
//					Ext.getCmp(item.id + 'addgroupimg').hide();
//				}
//				if (Ext.getCmp(item.id + 'removeimg')!==undefined) {
//					Ext.getCmp(item.id + 'removeimg').hide();
//				}
//				item.clearInvalid();
//				item.disable();
//				break;
//			case 'checkboxgroup':
//			case 'radiogroup':
//			case 'button':
//			case 'checkbox':
//				item.disable();
//				break;
//			case 'combo': 
//				item.setHideTrigger(true);
//				if (item.el.dom.className.indexOf("x-item-disabled")==-1) {
//					item.el.dom.className += " x-item-disabled";
//				}
//				item.clearInvalid();
//				item.disable();
//				break;
//			case 'listview':
//				item.enable();
//				sValue = '';
//				Ext.each(item.getSelectedRecords(), function (recitem, index, allItems) {
//					sValue += recitem.get('text') + '\n';
//				});
//				Ext.getCmp(item.id + 'Hidden').setValue(sValue);
//				item.hide();
//				Ext.getCmp(item.id + 'Hidden').show();
//				item.disable();
//				break;
////			case 'grid':
////				addbutton = Ext.getCmp(item.id + 'AddButton');
////				if (addbutton!==undefined) {
////					addbutton.disable();
////				}
////				removebutton = Ext.getCmp(item.id + 'RemoveButton');
////				if (removebutton!==undefined) {
////					removebutton.disable();
////				}
////				break;
//		}
//	}
//}
//
//function setLabelRequired (item) {
//	switch (item.getXType()) {
//		case "textfield":
//		case "textarea":
//		case "checkbox":
//		case "combo":
//			if(item.label===undefined) {
//				labelItem = Ext.getCmp("label" + item.id);
//				if (labelItem!==undefined) {
//					labelItem.el.dom.style.fontWeight = "bold";
//					if (labelItem.el.dom.className.indexOf("x-form-text-required")==-1) {
//						labelItem.el.dom.className += " x-form-text-required";
//					}
//				}  
//			} else {
//				item.label.dom.style.fontWeight = "bold";
//				if (item.label.dom.className.indexOf("x-form-text-required")==-1) {
//					item.label.dom.className += " x-form-text-required";
//				}
//			}
//		break;
//		case "listview":
//			fieldsetItem = item.findParentByType('fieldset');
//			fieldsetItem.el.dom.firstChild.firstChild.style.fontWeight = "bolder";
//			if (fieldsetItem.el.dom.firstChild.firstChild.className.indexOf("x-form-text-required")==-1) {
//				fieldsetItem.el.dom.firstChild.firstChild.className += " x-form-text-required";
//			}
//		break;
//	}
//}
//
//function setLabelNeeded (item) {
//	switch (item.getXType()) {
//		case "textfield":
//		case "textarea":
//		case "checkbox":
//		case "combo":
//			if(item.label===undefined) {
//				labelItem = Ext.getCmp("label" + item.id);
//				if (labelItem!==undefined) {
//					labelItem.el.dom.style.fontWeight = "normal";
//					if (labelItem.el.dom.className.indexOf("x-form-text-required")==-1) {
//						labelItem.el.dom.className += " x-form-text-required";
//					}
//				} 
//			} else {
//				item.label.dom.style.fontWeight = "normal";
//				if (item.label.dom.className.indexOf("x-form-text-required")==-1) {
//					item.label.dom.className += " x-form-text-required";
//				}
//			}
//		break;
//		case "listview":
//			fieldsetItem = item.findParentByType('fieldset');
//			fieldsetItem.el.dom.firstChild.firstChild.style.fontWeight = "bold";
//			if (fieldsetItem.el.dom.firstChild.firstChild.className.indexOf("x-form-text-required")==-1) {
//				fieldsetItem.el.dom.firstChild.firstChild.className += " x-form-text-required";
//			}
//		break;
//	}
//}
//
//function setLabelDefault (item) {
//	switch (item.getXType()) {
//		case "textfield":
//		case "textarea":
//		case "checkbox":
//		case "combo":
//			if(item.label===undefined) {
//				labelItem = Ext.getCmp("label" + item.id);
//				if (labelItem!==undefined) {
//					labelItem.el.dom.style.fontWeight = "normal";
//					if (labelItem.el.dom.className.indexOf("x-form-text-required")>-1) {
//						cls = labelItem.el.dom.className.split(" ");
//						labelItem.el.dom.className = "";
//						for(var x=0;x<cls.length;++x) {
//							if (cls[x]!=='x-form-text-required') {
//								labelItem.el.dom.className += " "+ cls[x];
//							}
//						}
//					}
//				} 
//				
//			} else {
//				item.label.dom.style.fontWeight = "normal";
//				if (item.label.dom.className.indexOf("x-form-text-required")>-1) {
//					cls = item.label.dom.className.split(" ");
//					item.label.dom.className = "";
//					for(var x=0;x<cls.length;++x) {
//						if (cls[x]!=='x-form-text-required') {
//							item.label.dom.className += " "+ cls[x];
//						}
//					}
//				}
//			}
//		break;
//		case "listview": 
//			fieldsetItem = item.findParentByType('fieldset');
//			fieldsetItem.el.dom.firstChild.firstChild.style.fontWeight = "bold";
//			if (fieldsetItem.el.dom.firstChild.firstChild.className.indexOf("x-form-text-required")>-1) {
//				cls = fieldsetItem.el.dom.firstChild.firstChild.className.split(" ");
//				fieldsetItem.el.dom.firstChild.firstChild.className = "";
//				for(var x=0;x<cls.length;++x) {
//					if (cls[x]!=='x-form-text-required') {
//						fieldsetItem.el.dom.firstChild.firstChild.className += " "+ cls[x];
//					}
//				}
//			}
//		break;
//	}
//}
//
//function setMandatory(item, mandatory) {
//	switch (mandatory) {
//	case "required": 
//		/* Diese Attribute sollten im Wizard auftauchen. 
//		 * Das Speichern eines Datensatzes, bei dem ein Attribut von diesem Typ leer ist, 
//		 * ist nicht zulässig 
//		 * Vorschlag zu Anzeige: Fett und mit * hinter dem Attributnamen */
//		setLabelRequired(item);
//		item.vtype = 'required';
//		item.allowBlank = false;
//		break;
//	case "needed":
//		/* needed: Diese Attribute sollen als "Pflichtfeld" markiert werden. 
//		 * Anders als required, kann man jedoch diese auch leer speichern. 
//		 * In "MyPlace" sind diese dann zu einem späteren Zeitpunkt (nicht Bestandteil diese RfCs) als to-do aufzuführen.
//			Vorschlag zu Anzeige: mit * hinter dem Attributnamen */
//		setLabelNeeded(item);
//		item.vtype = null;
//		item.allowBlank = true;
//		break;
//	case "optional":
//		/* optional: Diese Attribute sind nicht hervorzuheben. 
//		 * Sie können leer gespeichert werden.	 */
//		setLabelDefault(item);
//		item.vtype = null;
//		item.allowBlank = true;
//		break;
//	case "by reference":
//		/* by reference: Felder sind nicht editierbar. 
//		 * Deren Inhalt ergibt sich in Abhängigkeit von einem anderen Attribut.
//		 * (z.B. Primary Function wird in Abhängigkeit der Category gesetzt) */
//		setLabelDefault(item);
//		item.vtype = null;
//		item.allowBlank = true;
//		item.setDisabled(true);
//		break;
//	case "dependent on other":
//		/* dependent on other: Pflichtfeld (needed), falls ein Attribut einen bestimmten Wert hat. 
//		 * Programmintern abzubilden. 
//		 * (z.B. ITSecGroup oder Link sind Pflichtfelder (needed), 
//		 * wenn relevanceGR1435 oder relevanceGR1920 gesetzt sind) */
//		setLabelDefault(item);
//		item.vtype = null;
//		item.allowBlank = true;
//		break;
//	default: 
//		setLabelDefault(item);
//		item.vtype = null;
//		item.allowBlank = true;
//		break;
//
//	}
//}
//
//function isEditable(item)  {
////	aclRec = applicationDetailStore.getRange(0,0);
////	insertSource = aclRec[0].get('insertQuelle');
//	
//	var appDetail = applicationDetailStore.data.items[0].data;//AIR.ApplicationManager.getAppDetail();(#3)
//	var insertSource = appDetail.insertQuelle;
//	
//	idx = aclstore.find('id', item.id);
//	editableIfSource = aclstore.getAt(idx).get('EditableIfSource');
//	if(app_interfacename===insertSource || editableIfSource.indexOf(insertSource)>-1)	{
//		return true;
//	}
//	return false;
//}
//
//function setEditable(item) {
//	if (isEditable(item)) {
//		setFormElementEnable(item, true);
//	} else {
//		setFormElementEnable(item, false);
//	}
//
//}
//
//function isRelevance(item) {
////	aclRec = applicationDetailStore.getRange(0,0);
////	userOperational = aclRec[0].get('relevanceOperational');
////	userStrategic = aclRec[0].get('relevanceStrategic');
//	
//	var appDetail = applicationDetailStore.data.items[0].data;//AIR.ApplicationManager.getAppDetail();(#3)
//	var userOperational = appDetail.relevanceOperational;
//	var userStrategic = appDetail.relevanceStrategic;
//	
//	idx = aclstore.find('id', item.id);
//	if (idx>-1) {
//		rec = aclstore.getAt(idx);
//	
//		switch (rec.get('Relevance')) {
//			case "operational": 
//				if ('Y'===userOperational) 
//					return true;
//				break;
//			case "strategic":
//				if ('Y'===userStrategic) 
//					return true;
//				break;
//			case "operational and strategic":
//				if ('Y'===userStrategic || 'Y'===userOperational) 
//					return true;
//				break;
//			default: return false;
//		}
//	}
//	return false;
//}
//
//function setRelevance(item) {
//	if (isRelevance(item)) {
//		setFormElementEnable(item, true);
//	} else {
//		setFormElementEnable(item, false);
//	}
//}
//
//function specialKeyPress(e) {
//	switch (e.getKey()) {
//		case e.BACKSPACE:
//		case e.DELETE:
//		case e.LEFT:
//		case e.RIGHT:
//		case e.DOWN:
//		case e.UP:
//		case e.HOME:
//		case e.END:	
//		case e.ENTER:	
//		case e.RETURN:
//		case e.SHIFT:	
//		case e.TAB:
//			specialKeyPressed = true;
//			break;
//		default:
//			e.stopEvent();
//	}
//}
//
//function setAttributeProperty(item, attributeType, attributeLength, attributeMask, attributeMandatory) {
//	switch (item.getXType()) {
//		case 'textfield':
//		case 'textarea':
//			item.addListener('keyup', function(field, e) {
//				if (attributeLength!==undefined && attributeLength > 0) {
//					if (field.getValue().length>attributeLength) {
//						field.setValue(aclOldValue.substr(0, attributeLength));
//					}
//					if (attributeMask!='') {
//						matchValue = field.getValue().match(eval(attributeMask));
//						if (null!==matchValue) {
//							field.setValue(matchValue.join(''));
//						} else {
//							field.setValue('');
//						}
//					}
//				}
//			});
//			item.addListener('keydown', function(field, e) {
//				if (e.isSpecialKey()) {
//					specialKeyPress(e);
//				} 
//				if (attributeLength!==undefined && attributeLength > 0) {
//					aclOldValue = field.getValue();
//					if (attributeMask!=='') {
//						matchValue = String.fromCharCode(e.getCharCode()).match(eval(attributeMask));
//					} else {
//						matchValue = ''; 
//					}
//					if (!specialKeyPressed && (aclOldValue.length>attributeLength || null==matchValue)) {
//						specialKeyPressed = false;
//						e.stopEvent();
//					}
//					specialKeyPressed = false;
//				}
//			});
//			break;
//	}
//}

//var aclstore = new Ext.data.XmlStore({
//    autoLoad: false,
//    storeId: 'aclStore',
//    url: 'config/AttributeProperties.xml', // automatically configures a HttpProxy
//
//    record: 'Identifier', // records will have an "Identifier" tag
//    
//    fields: [
//        {name: 'id'},
//        {name: 'Mandatory'},
//        {name: 'Relevance'},
//        {name: 'EditableIfSource'},
//        {name: 'attributeType'},
//		{name: 'attributeLength'},
//		{name: 'attributeMask'}
//    ],
//    
//    listeners: {
//		load: function(store, records, options) {
////			aclRec = applicationDetailStore.getRange(0,0);
////			relevanceOperational = aclRec[0].get('relevanceOperational');
////        	relevanceStrategic = aclRec[0].get('relevanceStrategic');
//			
////			var appDetail = applicationDetailStore.data.items[0].data;
////			var relevanceOperational = appDetail.relevanceOperational;
////			var relevanceStrategic = appDetail.relevanceStrategic;
//        	
//			Ext.each(records, function(item, index, allItems) {
//    			var aclItemCmp = Ext.getCmp(item.data.id);
//    			if (aclItemCmp!==undefined) {
//    				switch(aclItemCmp.getXType()) {
//						case "checkboxgroup":
//						case "radiogroup":
//						case 'button':
//							
//    					case "textfield":
//    					case "textarea":
//    					case "combo":
//    					case "checkbox":
//    					case "listview":
////    					case "grid":
////    						if(aclItemCmp.getId() == 'cbgRegulations' || aclItemCmp.getId() == 'rgRelevanceBYTSEC')
////    							var x;
//    						
//    						//if(!aclItemCmp.disabled) {
//	    						setEditable(aclItemCmp);
//	    						if(!aclItemCmp.disabled) {
//	    							setRelevance(aclItemCmp);
//	    							if(!aclItemCmp.disabled) {
//	    								setMandatory(aclItemCmp, item.data.Mandatory);
//	    								setAttributeProperty(aclItemCmp, 
//	    													item.data.attributeType, 
//	    													item.data.attributeLength, 
//	    													item.data.attributeMask,
//	    													item.data.Mandatory);
//	    							} else {
//	    								setMandatory(aclItemCmp, 'optional');
//	    							}
//	    						} else {
//	    							setMandatory(aclItemCmp, 'optional');
//	    						}
////    						} else {
////    							setMandatory(aclItemCmp, 'optional');
////    						}
//    						break;
//    					default: break;
//    				}
//    			}
//        	});
//			
//			// Special for business Essential
//			aclItemCmp = Ext.getCmp('businessEssential');
//			if (!hasRoleBusinessEssentialEditor) {
//				aclItemCmp.disable();
//				aclItemCmp.setHideTrigger(true);
//				setMandatory(aclItemCmp, 'optional');
//			}
//			
//			// Special for relevances
//			/*aclItemCmp = Ext.getCmp('relevanceGR1435');
//			
//// Abbau Sonderbehandlung da Button nur noch Show-Button
////			if (aclItemCmp.disabled) {
////				Ext.getCmp('bRelevanceGR1435').disable();
////				Ext.getCmp('msgrelevanceGR1435').disable();
////			} else {
//// TODO Relevance 1435
////				Ext.getCmp('bRelevanceGR1435').enable();
////				Ext.getCmp('msgrelevanceGR1435').enable();
////				Ext.getCmp('bRelevanceGR1435').disable();
////				Ext.getCmp('msgrelevanceGR1435').disable();
////			}
//			
//			//CiComplianceView
//			aclItemCmp = Ext.getCmp('relevanceGR1775');
//			if (aclItemCmp.disabled) {
//				Ext.getCmp('bRelevanceGR1775').disable();
//				Ext.getCmp('msgrelevanceGR1775').disable();
//			} else {
//				Ext.getCmp('bRelevanceGR1775').enable();
//				Ext.getCmp('msgrelevanceGR1775').enable();
//			}
//			aclItemCmp = Ext.getCmp('relevanceGR1920');
//			if (aclItemCmp.disabled) {
//				Ext.getCmp('bRelevanceGR1920').disable();
//				Ext.getCmp('msgrelevanceGR1920').disable();
//			} else {
//				Ext.getCmp('bRelevanceGR1920').enable();
//				Ext.getCmp('msgrelevanceGR1920').enable();
//			}
//			aclItemCmp = Ext.getCmp('relevanceGR2008');
//			if (aclItemCmp.disabled) {
//				Ext.getCmp('bRelevanceGR2008').disable();
//				Ext.getCmp('msgrelevanceGR2008').disable();
//			} else {
//				Ext.getCmp('bRelevanceGR2008').enable();
//				Ext.getCmp('msgrelevanceGR2008').enable();
//			}
//			aclItemCmp = Ext.getCmp('relevanceGxp');
//			if (aclItemCmp.disabled) {
//				Ext.getCmp('CBrelevanceGxp').disable();
//				Ext.getCmp('CBrelevanceGxp').setHideTrigger(true);
//			} else {
//				Ext.getCmp('CBrelevanceGxp').enable();
//				Ext.getCmp('CBrelevanceGxp').setHideTrigger(false);
//			}
//			
//			if ('Y' == applicationDetailStore.data.items[0].data.isEditable) {
//				Ext.getCmp('bEditConnections').enable();
//				// alert('test yes');
//			}
//			else {
//				Ext.getCmp('bEditConnections').disable();
//				// alert('test no');
//			}*/
//			
//			
//			
////			var ciConnectionsView = Ext.getCmp('connectionsPanel');
////			ciConnectionsView.update();
//
//			
//			// always hidden
//			aclItemCmp = Ext.getCmp('objectType');
//			aclItemCmp.hide();
//
//			// always disabled
//			// TODO Maskenänderungen nachziehen
////			aclItemCmp = Ext.getCmp('itsetName');
////			aclItemCmp.disable();
//			setMandatory(aclItemCmp, 'optional');
//			aclItemCmp = Ext.getCmp('protectionApplicationProtection');
//			aclItemCmp.disable();
//			setMandatory(aclItemCmp, 'optional');
//			
//			
//			// Draft
//			setDraft(isDraft());
//		}
//    }
//});