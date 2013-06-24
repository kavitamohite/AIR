Ext.namespace('AIR');

AIR.AirAclManager = function() {
	
	return {
//		needed: '<span class="x-form-text-required"> </span>',

		aclOldValue: '',
		specialKeyPressed: false,
		
		init: function() {
			this.aclStore = AIR.AirStoreManager.getStoreByName('aclStore');
			
			Ext.apply(Ext.form.VTypes, {
			    //  vtype validation function
			    required: function(val, field) {
			        return val && val.length > 0;
			    },
			    // vtype Text property: The error text to display when the validation function returns false
			    requiredText: 'This field ist mandatory.' // requiredText:
			});
		},
		
		setFormElementEnable: function(item, enable) {
			if(enable) {
				item.enable();
				
				switch (item.getXType()) {
					case 'checkboxgroup':
					case 'radiogroup':
					case 'button':
						item.enable();
						break;
					case 'textfield':
					case 'textarea':
						if(Ext.getCmp(item.id + 'Add'))
							Ext.getCmp(item.id + 'Add').show();
						
						if(Ext.getCmp(item.id + 'AddGroup'))
							Ext.getCmp(item.id + 'AddGroup').show();
						
						if(Ext.getCmp(item.id + 'Remove'))
							Ext.getCmp(item.id + 'Remove').show();
						
						break;
					case 'combo':
					case 'filterCombo':
						item.setHideTrigger(false);
						/*if(item.el.dom.className.indexOf('x-item-disabled')>-1) {
							var cls = item.el.dom.className.split(' ');
							item.el.dom.className = '';
							for(var x=0;x<cls.length;++x)
								if(cls[x]!=='x-item-disabled')
									item.el.dom.className += ' '+ cls[x];
								
							
						}*/
					    break;
					case 'listview'://listview grid
						item.show();
						Ext.getCmp(item.id + 'Hidden').hide();
						
						
						
//						Ext.getCmp(item.id + 'Hidden').setValue('');
//						sValue = '';
						
//						item.getSelectionModel().unlock();
						break;
//					case 'grid':
//						addbutton = Ext.getCmp(item.id + 'AddButton');
//						if(addbutton!==undefined) {
//							addbutton.enable();
//						}
//						removebutton = Ext.getCmp(item.id + 'RemoveButton');
//						if(removebutton!==undefined) {
//							removebutton.enable();
//						}
//						break;
				}
			} else {
				switch (item.getXType()) {
					case 'textfield':
					case 'textarea':
						if(Ext.getCmp(item.id + 'Add'))
							Ext.getCmp(item.id + 'Add').hide();
						
						if(Ext.getCmp(item.id + 'AddGroup'))
							Ext.getCmp(item.id + 'AddGroup').hide();
						
						if(Ext.getCmp(item.id + 'Remove'))
							Ext.getCmp(item.id + 'Remove').hide();
						
						item.clearInvalid();
						item.disable();
						break;
					case 'checkboxgroup':
					case 'radiogroup':
					case 'button':
					case 'checkbox':
						item.disable();
						break;
					case 'combo':
					case 'filterCombo':
						item.setHideTrigger(true);
						/*if(item.el.dom.className.indexOf('x-item-disabled') == -1)
							item.el.dom.className += ' x-item-disabled';*/
						
						item.clearInvalid();
						if(Ext.isIE)
							item.el.dom.disabled = true;//combo NOT shot in IE
						else
							item.disable();//combo shot in IE
							//item.setDisabled(true);//combo shot in IE

						break;
					case 'listview'://listview grid
//						item.enable();
//						sValue = '';
//						Ext.each(item.getSelectedRecords(), function (recitem, index, allItems) {
//							sValue += recitem.get('text') + '\n';
//						});
//						Ext.getCmp(item.id + 'Hidden').setValue(sValue);
						item.hide();
						Ext.getCmp(item.id + 'Hidden').show();
						item.disable();
						
//						item.getSelectionModel().lock();
						break;
//					case 'grid':
//						addbutton = Ext.getCmp(item.id + 'AddButton');
//						if(addbutton!==undefined) {
//							addbutton.disable();
//						}
//						removebutton = Ext.getCmp(item.id + 'RemoveButton');
//						if(removebutton!==undefined) {
//							removebutton.disable();
//						}
//						break;
				}
			}
		},

		setLabelRequired: function(item) {
			switch (item.getXType()) {
				case 'textfield':
				case 'textarea':
				case 'checkbox':
				case 'combo':
				case 'filterCombo':
				case 'radiogroup':
					if(item.label) {
						item.label.dom.style.fontWeight = 'bold';
						if(item.label.dom.className.indexOf('x-form-text-required') == -1)
							item.label.dom.className += ' x-form-text-required';
					} else {
						var labelItem = Ext.getCmp('label' + item.id);
						if(labelItem && labelItem.el) {
							labelItem.el.dom.style.fontWeight = 'bold';
							if(labelItem.el.dom.className.indexOf('x-form-text-required') == -1)
								labelItem.el.dom.className += ' x-form-text-required';
						}
					}
					break;
				case 'listview'://grid
					var fieldsetItem = item.findParentByType('fieldset');
					if(fieldsetItem) {
						fieldsetItem.el.dom.firstChild.firstChild.style.fontWeight = 'bolder';
						if(fieldsetItem.el.dom.firstChild.firstChild.className.indexOf('x-form-text-required') == -1)
							fieldsetItem.el.dom.firstChild.firstChild.className += ' x-form-text-required';
					} else {
						this.setNecessity(item);
					}
					break;
				case 'label':
					this.setNecessity(item);
			}
		},

		setLabelNeeded: function(item) {
			switch (item.getXType()) {
				case 'checkbox':
//					item.el.dom.nextSibling.addClass('x-form-text-required');
					Util.addClass(item.el.dom.nextSibling, 'x-form-text-required');
					break;
				case 'textfield':
				case 'textarea':
				case 'combo':
				case 'filterCombo':
				case 'radiogroup':
					if(item.label) {
						item.label.dom.style.fontWeight = 'normal';
//						if(item.label.dom.className.indexOf('x-form-text-required') == -1) {
//							item.label.dom.className += ' x-form-text-required';
//						}
						
						item.label.addClass('x-form-text-required');
					} else {
						var labelItem = Ext.getCmp('label' + item.id);
						if(labelItem) {
							labelItem.el.dom.style.fontWeight = 'normal';
//							if(labelItem.el.dom.className.indexOf('x-form-text-required')==-1) {
//								labelItem.el.dom.className += ' x-form-text-required';
//							}
							
							labelItem.el.addClass('x-form-text-required');
						}
					}
					break;
				case 'listview'://grid
					var fieldsetItem = item.findParentByType('fieldset');
					if(fieldsetItem) {
						fieldsetItem.el.dom.firstChild.firstChild.style.fontWeight = 'bold';
						if(fieldsetItem.el.dom.firstChild.firstChild.className.indexOf('x-form-text-required') == -1)
							fieldsetItem.el.dom.firstChild.firstChild.className += ' x-form-text-required';
					} else {
						this.setNecessity(item);
					}
					break;
				case 'label':
					this.setNecessity(item);
			}
		},

		setLabelDefault: function(item) {
			switch (item.getXType()) {
				case 'checkbox':
//					item.el.dom.nextSibling.removeClass('x-form-text-required');
					Util.removeClass(item.el.dom.nextSibling, 'x-form-text-required');
					break;
				case 'textfield':
				case 'textarea':
				case 'combo':
				case 'filterCombo':
					if(item.label) {
						item.label.dom.style.fontWeight = 'normal';
						
						item.label.removeClass('x-form-text-required');
//						if(item.label.dom.className.indexOf('x-form-text-required')>-1) {
//							var cls = item.label.dom.className.split(' ');
//							item.label.dom.className = '';
//							
//							for(var x=0;x<cls.length;++x)
//								if(cls[x]!=='x-form-text-required')
//									item.label.dom.className += ' '+ cls[x];
//						}
					} else {
						var labelItem = Ext.getCmp('label' + item.id);
						if(labelItem) {
							labelItem.el.dom.style.fontWeight = 'normal';
							
							labelItem.el.removeClass('x-form-text-required');
//							if(labelItem.el.dom.className.indexOf('x-form-text-required')>-1) {
//								var cls = labelItem.el.dom.className.split(' ');
//								labelItem.el.dom.className = '';
//								
//								for(var x=0;x<cls.length;++x)
//									if(cls[x]!=='x-form-text-required')
//										labelItem.el.dom.className += ' '+ cls[x];
//								
//							}
						}
					}
					
					item.allowBlank = true;
					item.clearInvalid();
					
					break;
				case 'grid': 
					fieldsetItem = item.findParentByType('fieldset');
					fieldsetItem.el.dom.firstChild.firstChild.style.fontWeight = 'bold';
					if(fieldsetItem.el.dom.firstChild.firstChild.className.indexOf('x-form-text-required')>-1) {
						var cls = fieldsetItem.el.dom.firstChild.firstChild.className.split(' ');
						fieldsetItem.el.dom.firstChild.firstChild.className = '';
						
						for(var x=0;x<cls.length;++x)
							if(cls[x]!=='x-form-text-required')
								fieldsetItem.el.dom.firstChild.firstChild.className += ' '+ cls[x];
							
						
					}
					break;
				case 'label':
//					this.setNecessity(item);
					
					if(item.el) {
						item.el.dom.style.fontWeight = 'normal';
						item.el.removeClass('x-form-text-required');
					} else {
						item.style.fontWeight = 'normal';
						item.removeClass('x-form-text-required');
					}
					break;
			}
		},
		
		
		setAttributeProperty: function(item, attributeType, attributeLength, attributeMask, attributeMandatory) {
			switch (item.getXType()) {
				case 'textfield':
				case 'textarea':
					item.addListener('keyup', function(field, e) {
						if(attributeLength!==undefined && attributeLength > 0) {
							if(field.getValue().length > attributeLength)
								field.setValue(aclOldValue.substr(0, attributeLength));
							
							if(attributeMask != '') {
								var matchValue = field.getValue().match(eval(attributeMask));
								if(null !== matchValue) {
									field.setValue(matchValue.join(''));
								} else {
									field.setValue('');
								}
							}
						}
					});
					item.addListener('keydown', function(field, e) {
						if(attributeLength !== undefined && attributeLength > 0) {
							aclOldValue = field.getValue();
							
                            if(aclOldValue.length > attributeLength)
                                e.stopEvent();
						}
					}.createDelegate(this));
					
					break;
			}
		},
		
		setMandatory: function(item, aclItem, data) {//mandatory
			if(this.isCiTypeField(data, aclItem)) {//, item
				switch(aclItem.data.Mandatory) {//mandatory
					case 'mandatory':
						this.setLabelRequired(item);
						item.vtype = 'required';
						item.allowBlank = false;
						break;
					case 'required':
						this.setLabelNeeded(item);
						item.vtype = null;
						item.allowBlank = true;
						break;
					/*case 'optional':
	//					 * optional: Diese Attribute sind nicht hervorzuheben. 
	//					 * Sie können leer gespeichert werden.
						this.setLabelDefault(item);
						item.vtype = null;
						item.allowBlank = true;
						break;
					case 'by reference':
	//					 * by reference: Felder sind nicht editierbar. 
	//					 * Deren Inhalt ergibt sich in Abhängigkeit von einem anderen Attribut.
	//					 * (z.B. Primary Function wird in Abhängigkeit der Category gesetzt)
						this.setLabelDefault(item);
						item.vtype = null;
						item.allowBlank = true;
						item.setDisabled(true);
						break;
					case 'dependent on other':
	//					 * dependent on other: Pflichtfeld (needed), falls ein Attribut einen bestimmten Wert hat. 
	//					 * Programmintern abzubilden. 
	//					 * (z.B. ITSecGroup oder Link sind Pflichtfelder (needed), 
	//					 * wenn relevanceGR1435 oder relevanceGR1920 gesetzt sind)
						this.setLabelDefault(item);
						item.vtype = null;
						item.allowBlank = true;
						break;
					default: 
						this.setLabelDefault(item);
						item.vtype = null;
						item.allowBlank = true;
						break;*/
				}
			} else {
				this.setLabelDefault(item);
			}
		},
		
		isEditable: function(item) {
//			aclRec = applicationDetailStore.getRange(0,0);
//			insertSource = aclRec[0].get('insertQuelle');
			
			var isAdmin = AAM.hasRole(AC.USER_ROLE_AIR_ADMINISTRATOR);
			if(isAdmin)
				return true;
			
			var appDetail = AAM.getAppDetail();//applicationDetailStore.data.items[0].data;//AIR.ApplicationManager.getAppDetail();(#3)
			var insertSource = appDetail.insertQuelle;
			
			var index = this.aclStore.findExact('id', item.id);
			var editableIfSource = this.aclStore.getAt(index).get('EditableIfSource');
			if(app_interfacename === insertSource || editableIfSource.indexOf(insertSource) > -1)
				return true;
			
			return false;
		},

		setEditable: function(item) {
			this.setFormElementEnable(item, this.isEditable(item));
		},

		isRelevance: function(item, appDetail) {
			var isAdmin = AIR.AirApplicationManager.hasRole(AC.USER_ROLE_AIR_ADMINISTRATOR);
			if(isAdmin)
				return true;
			
//			var appDetail = AIR.AirApplicationManager.getAppDetail();//applicationDetailStore.data.items[0].data;//AIR.ApplicationManager.getAppDetail();(#3)
			var userOperational = appDetail.relevanceOperational;
			var userStrategic = appDetail.relevanceStrategic;
			
			var index = this.aclStore.findExact('id', item.id);
			if(index > -1) {
				rec = this.aclStore.getAt(index);
			
				switch (rec.get('Relevance')) {
					case 'operational': 
						if('Y' === userOperational)
							return true;
					case 'strategic':
						if('Y' === userStrategic)
							return true;
					case 'operational and strategic':
						if('Y' === userStrategic || 'Y' === userOperational)
							return true;
					default:
						return false;
				}
			}
			return false;
		},

		setRelevance: function(item, appDetail) {
			// RFC 8225
			var hasEditRights = this.isRelevance(item, appDetail);

			if(hasEditRights) {
				if(item.hidden)
					item.setVisible(true);
				
				this.setFormElementEnable(item, true);//hasEditRights
			} else {
				var index = this.aclStore.findExact('id', item.id);
				var rolesAllowed = this.aclStore.getAt(index).get('rolesAllowed');//restrictionLevel
				
				if(rolesAllowed) {
					//falls Rollen für dieses Elemente definiert sind, die ohne Editrechte dieses CI Detailseitenfeld sehen dürfen,
					//müss geprüft werden, ob der User diese Rolle(n) hat im rolePersonListStore. Nur wenn er diese nicht hat:
					item.setVisible(false);
					//In der ersten Ausbaustufe und für den RFC 8225 gibt es keine Rollen, mit denen User ohne Editrechte die Felder 
					//costRunPa und costChangePa sehen drüfen. Daher werden diese von der Seite genommen.
				} else {
					this.setFormElementEnable(item, false);//hasEditRights
				}
			}
			// RFC 8225
			
			
			//ORIG
//			var appDetail = AIR.AirApplicationManager.getAppDetail();
//			this.setFormElementEnable(item, this.isRelevance(item, appDetail));
		},

		specialKeyPress: function(e) {
			switch (e.getKey()) {
				case e.BACKSPACE:
				case e.DELETE:
				case e.LEFT:
				case e.RIGHT:
				case e.DOWN:
				case e.UP:
				case e.HOME:
				case e.END:	
				case e.ENTER:	
				case e.RETURN:
				case e.SHIFT:	
				case e.TAB:
					this.specialKeyPressed = true;
					break;
				default:
					e.stopEvent();
			}
		},

	
		isEditMaskValid: function() {
			var valid = true;
			
			//get and check UI elements by CI (and Sub) Type... !!
			
			Ext.each(this.aclStore.getRange(), function(item, index, allItems) {
				var aclItemCmp = Ext.getCmp(item.data.id);
				if(aclItemCmp && !aclItemCmp.disabled) {
					switch (aclItemCmp.getXType()) {
						case 'textfield':
						case 'textarea':
							if(aclItemCmp.getValue() && aclItemCmp.getValue() !== aclItemCmp.getValue().trim())
								aclItemCmp.setValue(aclItemCmp.getValue().trim());
							
							// no break!
						case 'combo':
						case 'filterCombo':
						case 'checkbox':
							valid = aclItemCmp.isValid();//valid && aclItemCmp.isValid();
	//						if(!valid)
	//							var x;
							break;
						default:
							break;
					}
				}
			});
			
			return valid;
		},
		
		//wenn ein required Feld nicht ausgefüllt ist, dann ist das CI im Draft Modus
		isDraft: function(data) {
			records = this.aclStore.getRange();
			var commonRetValue = false;
			var oppositeRetValue = false;
			
			for(var i = 0; i < records.length; i++) {
				var item = records[i];				
				
				if(this.isCiTypeField(data, item)) {
					if(item.data.Mandatory === 'required') {
						var draftItemCmp = Ext.getCmp(item.data.id);
						
						if(draftItemCmp && draftItemCmp.getId().charAt(draftItemCmp.getId().length - 1) !== 'W') {
							switch (draftItemCmp.getXType()) {
								case 'textfield':
								case 'textarea':
								case 'combo':
								case 'filterCombo':
									var length = draftItemCmp.getValue().length;
									if(length === 0)
										return true;
									break;
								case 'checkbox':
									//solange nur checkboxen GR1435,GR1920 required sind: nur wenn keine Aussage vorhanden/Null in der DB --> Draft 
									if((!data.relevanceGR1435 || !data.relevanceGR1920) ||
									   data.relevanceGR1435 != 'Y' && data.relevanceGR1435 != 'N' && 
									   data.relevanceGR1435 != '1' && data.relevanceGR1435 != '0' && data.relevanceGR1435 != '-1' &&
									   data.relevanceGR1920 != 'Y' && data.relevanceGR1920 != 'N' && 
									   data.relevanceGR1920 != '1' && data.relevanceGR1920 != '0' && data.relevanceGR1920 != '-1'   
									)
										return true;
									
//									if(!draftItemCmp.getValue())
//										return true;
									break;
								case 'listview':			
									var scopeRecords = draftItemCmp.getSelectedRecords();
									return scopeRecords.length === 0;
									
									break;
								default: break;
							}
						}
					} else {
						var draftItemCmp = Ext.getCmp(item.data.id);
						var isDraft = draftItemCmp &&
									  data.tableId == AC.TABLE_ID_APPLICATION &&
								      data.applicationCat1Id == AC.APP_CAT1_APPLICATION &&
								     (draftItemCmp.id == 'gpsccontactCiOwner' || draftItemCmp.id == 'gpsccontactSupportGroup') &&
								    (draftItemCmp.getValue().length === 0);//!draftItemCmp.getValue() || 
						if(isDraft)
							return isDraft;
					}
				}
			}
			
			return false;
		},

		setDraft: function(isDraft) {
			if(isDraft) {
				Ext.getCmp('editpaneldraft').el.dom.innerHTML = AAM.getLabels().header_applicationIsDraft.replace('##', '');//draftFlag '' (#8)
				Ext.getCmp('editpaneldraft').show();
			} else {
				Ext.getCmp('editpaneldraft').hide();
			}
		},
		
		getRequiredFields: function(data) {
			var incompleteFieldList = '';
			var aclItems = this.aclStore.getRange();
			var labels = AAM.getLabels();
			
			
//			Ext.each(aclItems, function(item, index, allItems) {
			for(var i = 0; i < aclItems.length; i++) {
//				if(item.data.Mandatory === 'mandatory' && item.data.id.charAt(item.data.id.length - 1) !== 'W') { //'required'
				if(aclItems[i].data.Mandatory === 'mandatory' && aclItems[i].data.id.charAt(aclItems[i].data.id.length - 1) !== 'W') { //'required'
					var uiElement = Ext.getCmp(aclItems[i].data.id);
					
					if(uiElement && this.isCiTypeField(data, aclItems[i])) {//, uiElement
						switch (uiElement.getXType()) {
							case 'textfield':
							case 'textarea':
							case 'combo':
							case 'filterCombo':

								//nur wenn tableId == AC.TABLE_ID_APPLICATION wird bei, aufgrund von Benutzerrechten deaktivierten, Pflichtfeldern nicht auf ein auszufüllendes Feld hingewiesen
								if((!uiElement.disabled || data.tableId != AC.TABLE_ID_APPLICATION) && (!uiElement.getValue() || uiElement.getValue().length === 0)) {
									var label = this.getLabel(uiElement, labels, data);//labels[uiElement.id] || uiElement.label.dom.innerHTML;
									if(label)											
										incompleteFieldList += label + ', ';
								}
								break;
							case 'listview':
								if(!uiElement.disabled && uiElement.getSelectedRecords().length === 0)
									incompleteFieldList += labels[uiElement.id] + ', ';
								break;
							case 'radiogroup':
								var selected = uiElement.getValue();
								if(!uiElement.disabled && (!selected || selected.inputValue === 'U'))//selected === null
									incompleteFieldList += labels[uiElement.id] + ', ';
								break;
						}
					}
				}
			}
//			});
			
			if(incompleteFieldList.length > 2)
				incompleteFieldList = incompleteFieldList.substring(0, incompleteFieldList.length - 2);
			
			
			return incompleteFieldList;
		},
		
		isCiTypeField: function(data, aclItem) {//mit allen CI Typen: tableId, ciSubType; , uiElement nicht mehr nötig
			var aclCiType = aclItem.get('ciTypeId');
			var aclCiSubType = aclItem.get('ciSubTypeId');
			
			var t = data.tableId.toString();
			var isCiType = !aclCiType || 
							aclCiType.length === 0 || 
							aclCiType === t || //data.tableId.toString()
							Util.isValueInCommaString(aclCiType, t);//data.tableId.toString()
			var isCiSubType = !data.applicationCat1Id || aclCiSubType.length === 0 || aclCiSubType === data.applicationCat1Id.toString() || aclCiSubType.indexOf(data.applicationCat1Id.toString()) > -1;
			
			//(noch) nicht konfigurierbare Sonderlocke
			
			//(noch) nicht konfigurierbare Sonderlocke
			
			return isCiType && isCiSubType;
			
//			var index = this.aclStore.find('id', uiElement.id);
//			var accessMode = this.aclStore.getAt(index);
			
//			return !(data.applicationCat1Id !== AC.APP_CAT1_APPLICATION && AC.APP_CAT1_ONLY_FIELDS.indexOf(reqItemCmp.getId()) > -1);
		},
		
		
		
		
		setAccessMode: function(uiElement, appDetail) {
			//var accessMode = this.aclStore.getById(uiElement.getId());//.get('Mandatory');
			var index = this.aclStore.findExact('id', uiElement.id);
			var accessMode = this.aclStore.getAt(index);//.get('Mandatory');
			
			this.setEditable(uiElement);//editableIfSource and isAdmin check
			
//			if(!uiElement.disabled) {
				this.setRelevance(uiElement, appDetail);
				
				
				//var index = this.aclStore.find('id', uiElement.id);
				//var necessity = this.aclStore.getAt(index).get('Mandatory');
				
				
				this.setMandatory(uiElement, accessMode, appDetail);//accessMode.data.Mandatory ohne appDetail
				this.setAttributeProperty(
					uiElement, 
					accessMode.data.attributeType, 
					accessMode.data.attributeLength, 
					accessMode.data.attributeMask,
					accessMode.data.Mandatory
				);
//			}
		},
		
		
		//===================================================================================================================
		setNecessity: function(item) {
			var xtype = item.getXType();
			var index = this.aclStore.findExact('id', item.id);
			var necessity = this.aclStore.getAt(index).get('Mandatory');
			
			switch(xtype) {
				case 'textfield':
				case 'textarea':
				case 'combo':
				case 'filterCombo':
				case 'checkboxgroup':
				case 'radiogroup':
				case 'listview':
					this.setNecessityInternal(item.label, necessity);
					break;
				case 'label':
					this.setNecessityInternal(item.getEl(), necessity);
					break;
			}
		},
		
		setNecessityInternal: function(labelEl, necessity) {
			switch(necessity) {
				case 'mandatory':
					if(labelEl) {
						labelEl.dom.style.fontWeight = 'bold';
						labelEl.addClass('x-form-text-required');
					}
					break;
				case 'required':
					labelEl.dom.style.fontWeight = 'normal';
					labelEl.addClass('x-form-text-required');
					break;
				default:
					labelEl.dom.style.fontWeight = 'normal';
					labelEl.removeClass('x-form-text-required');
					break;
			}
		},
		
		getLabel: function(uiElement, labels, data) {
			if(uiElement.id == 'gpsccontactCiOwner' || uiElement.id == 'gpsccontactSupportGroup') {
//				return data.tableId == AC.TABLE_ID_APPLICATION &&
//					   data.applicationCat1Id == AC.APP_CAT1_APPLICATION ?
//						labels.contactsCIOwnerApplication : labels.contactsCIOwner;
				if(data.tableId != AC.TABLE_ID_APPLICATION &&
				   data.applicationCat1Id != AC.APP_CAT1_APPLICATION)
					return labels[uiElement.id] || uiElement.label.dom.innerHTML;
			} else {
				return labels[uiElement.id] || uiElement.label.dom.innerHTML;
			}
		}
		//===================================================================================================================
    };
}();
ACM = AIR.AirAclManager;