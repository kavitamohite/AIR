Ext.namespace('AIR');

AIR.CiSpecialAttributesView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
		    title: 'Special Attributes',
		    border: false,
		    
		    items: [{
		    	xtype: 'editorgrid',
		        id: 'specialAttributesListView',
		        viewConfig:{
		        	forceFit: true
		        },
		        height: 400,
		    	store: AIR.AirStoreFactory.createSpecialAttributesListStore(),
		        border: false,
		        autoScroll: true,
		        clicksToEdit: 1,
		        columns: [{
		        	header: 'attributeId',
		            dataIndex: 'attributeId',
		            id: 'attributeId',
		            hidden: true
		        },{
		            header: 'Group',
		            dataIndex: 'group',
		            id: 'group',
		            flex : 1,
					menuDisabled: true
		    	},{
		            header: 'Attribute Name',
		            dataIndex: 'attributeName',
		            id: 'attributeName',
					menuDisabled: true,
					flex : 1 
		        },{
		            header: 'Attribute To be value',
		            dataIndex: 'toBeValueId',
		            id: 'toBeValue',
		            menuDisabled: true,
		            flex : 1,
					editor : {
	                    xtype : 'combo',
	                    store: AIR.AirStoreFactory.createAttributeValueListStore(),
	                    valueField: 'id',
	                    displayField: 'name',
	                    triggerAction: 'all',
	                    mode : 'local',
	                    disabled: true,
	                    editable: false,
	                    listeners: {
	                    	expand : function(combo){
	                    		var attributeId = Ext.getCmp('specialAttributesListView').getSelectionModel().selection.record.data.attributeId;
	                    		combo.store.filterBy(function(record){
	                    			return record.data.attributeId === parseInt(attributeId) && record.data.selectable === true || record.data.name ==='None';
	                    		},this);
	                    	},
	                    	change : function(combo, newValue, oldValue) {
	                            if (Util.isComboValueValid(combo, newValue, oldValue)) {

	                                if (typeof newValue === 'string' && newValue.length === 0) {
	                                    combo.reset();
	                                }
	                            }
	                            if(newValue!=oldValue){
	                            var savebtn =  Ext.getCmp('clCiSpecialAttributes').buttons[0];
	                            savebtn.setDisabled(false);
	                            }
	                        },
	                    	select : function(combo, record, index) {
	                    		
		                        if(record){
		 	                            var savebtn =  Ext.getCmp('clCiSpecialAttributes').buttons[0];
		 	                            savebtn.setDisabled(false);
		                        }
	                    	}
	                    }
	               },
	               renderer: this.columnRenderer
		        }, {
		            header: 'Attribute As is value',
		            dataIndex: 'asIsValueId',
		           	id: 'asIsValue',
		           	menuDisabled: true,
		           	flex : 1,
					editor : {
	                    xtype : 'combo',
	                    store: AIR.AirStoreFactory.createAttributeValueListStore(),
	                    valueField: 'id',
	                    displayField: 'name',
	                    triggerAction: 'all',
	                    mode : 'local',
	                    disabled: true,
			           	editable: false,
	                    listeners: {
	                    	expand : function(combo){
	                    		var attributeId = Ext.getCmp('specialAttributesListView').getSelectionModel().selection.record.data.attributeId;
	                    		combo.store.filterBy(function(record){
	                    			return record.data.attributeId === parseInt(attributeId) && record.data.selectable === true || record.data.name ==='None';
	                    		},this);
	                    	},
	                    	change : function(combo, newValue, oldValue) {
	                            if (Util.isComboValueValid(combo, newValue, oldValue)) {

	                                if (typeof newValue === 'string' && newValue.length === 0) {
	                                    combo.reset();
	                                }
	                                if(newValue!=oldValue){
	                                var savebtn =  Ext.getCmp('clCiSpecialAttributes').buttons[0];
		                            savebtn.setDisabled(false);
	                                }
	                            }
	                        },
	                    	select : function(combo, record, index) {
	                    		
		                        if(record){
		 	                            var savebtn =  Ext.getCmp('clCiSpecialAttributes').buttons[0];
		 	                            savebtn.setDisabled(false);
		                        }
	                    	}
	                    }
	               },
  	               renderer: this.columnRenderer
		        }]				
		    }],
		    buttons: [{
		        text: 'Save Attributes',
		        id: 'saveAttributeBtn',
		        hidden: true,
		        tooltip: 'Click to save all changes to the database',
		        handler: function(button, event) {
		        	var saveMask = AIR.AirApplicationManager.getMask(AC.MASK_TYPE_SAVE);
		        	saveMask.show();
		        	var isSuccess = true;
		        	var records = this.getComponent('specialAttributesListView').getStore().getRange();
		        	var editedRecords=[];
		        	var counter=0;
		        	records.forEach(function(record){
		        		if(record.dirty == true){
		        			editedRecords.push(record);
			              }
		        		
		        	});
		        			        	
		        	editedRecords.forEach(function(record){
			        	var specialAttributeSaveStore = AIR.AirStoreFactory.createSpecialAttributeSaveStore();

		        		var params = {
		        				specialAttributeViewDataDTO: record.data,
		        				ciId: AIR.AirApplicationManager.getCiId(),
			    			 	cwid: AIR.AirApplicationManager.getCwid(),
			    			 	token: AIR.AirApplicationManager.getToken(),
			    			 	tableId: AAM.getTableId()
			    		};
		        		
			        	specialAttributeSaveStore.load({
							params: params,
							scope: this,
						    callback: function(record, operation, result) {
						    	var yesCallback = function() {
									this.wizardStarted = false;
									this.fireEvent('externalNavigation', this, null, 'clCiSpecialAttributes');
								};
					        	
					        	var callbackMap = {
									yes: yesCallback.createDelegate(this)
								};
//					        	console.log("records::"+record[0].node.textContent);
						    	if(record!=null && record!=""){
								isSuccess = isSuccess && record[0].node.textContent;
								console.log("records::"+record[0].node.textContent);
								console.log("isSuccess"+isSuccess);
					        	if(++counter==editedRecords.length){
					        	
					        	if (isSuccess == 'true') {
					        		var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED', callbackMap);
						        	saveMask.hide();
									afterSaveAppWindow.show();
//									Added by EPCHI
//									history.go(0);
						        } else {
//						        	var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED_ERROR_ATTRIBUTE', callbackMap);
						        	var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED', callbackMap);
						        	saveMask.hide();
									afterSaveAppWindow.show();
									//return false; //change for atribte
						        }
					        	
					        	}
						    	}else{
						    		
//						    		var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED_ERROR', callbackMap);
						    		var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED', callbackMap);
						    		saveMask.hide();
									afterSaveAppWindow.show();
						        
						    	}
//						    	elerj removedall
//						    	specialAttributeSaveStore.removeAll();
//						    	records.data.removeAll();
						    }
						});
			        	
		        	});
		        	
		        },
		        scope:this
		    }]
		});
		
		AIR.CiSpecialAttributesView.superclass.initComponent.call(this);
		var saveBtnFlag=false;
//		specialAttributeSaveStore.removeAll();
//		this.on('render', this.loadStore, this);
	},
	/* loadStore: function() {
	        this.getStore().load();
	    }
*/	onChangeSave:function(){
		
	},
	

	columnRenderer: function(value,metaData,record) {
        if(value) {
            var attributes = Ext.getCmp('specialAttributesListView').getColumnModel().getColumnById('toBeValue').getEditor().getStore();
            var record = attributes.findExact('id', value);
            if(record != -1){
                return attributes.getAt(record).get('name') ? attributes.getAt(record).get('name'): "";
            } else {
            	attributes = Ext.getCmp('specialAttributesListView').getColumnModel().getColumnById('asIsValue').getEditor().getStore();
            	record = attributes.findExact('id', value);
                if(record != -1){
                    return attributes.getAt(record).get('name') ? attributes.getAt(record).get('name'): "";
                } else {
                	return "";
                }
            }
        } else return "";
    },
    
    updateBasedOnRole : function(grid,data){
		var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');
		var btn = this.buttons[0];
		var ci = undefined;
		if(Ext.getCmp('tpCiSearchResultTables').getActiveTab()!=null)
		ci = Ext.getCmp('tpCiSearchResultTables').getActiveTab().store.data.items[ciResultGrid.store.find('id',AAM.getCiId())];
		grid.getColumnModel().getColumnById('toBeValue').editor.disabled = true;
		grid.getColumnModel().getColumnById('asIsValue').editor.disabled = true;
		btn.hide();
		var isDeleted = data.deleteTimestamp && data.deleteTimestamp.length > 0;
		if(isDeleted){
			return;
		}
		rolePersonListStore.each(function(item) {
			var value = item.data.roleName;
			if(value === AC.USER_ROLE_AIR_SPECIAL_ATTRIBUTE_EDITOR){
				
				grid.getColumnModel().getColumnById('toBeValue').editor.disabled = false;
				grid.getColumnModel().getColumnById('asIsValue').editor.disabled = false;
				btn.show();
				btn.setDisabled(true);
				return;
			}
			if(value === AC.USER_ROLE_AIR_ADMINISTRATOR){
				btn.show();
				btn.setDisabled(true);
				grid.getColumnModel().getColumnById('asIsValue').editor.disabled = false;
				//btn.disabled = false;
				
				
			}
		});
		
		if(ci != undefined){
			if(ci.get('ciOwner') === AAM.getCwid() || ci.get('ciOwnerDelegate') === AAM.getCwid() ||
					ci.get('applicationSteward') === AAM.getCwid()){
				grid.getColumnModel().getColumnById('asIsValue').editor.disabled = false;
				btn.show();
				btn.setDisabled(true);
				return;
			}

		} 
		else {
			ci = AAM.getAppDetail();
			if(ci.applicationOwnerHidden === AAM.getCwid() || ci.applicationOwnerDelegateHidden === AAM.getCwid() ||
					ci.applicationStewardHidden === AAM.getCwid()){
				grid.getColumnModel().getColumnById('asIsValue').editor.disabled = false;
				btn.show();
				btn.setDisabled(true);
				return;
			}
			
		}
	
	},
	
	update: function(data) {
		//ENFZM : Need to add the delete timestamp check
		var attributeValueListStore = this.getComponent('specialAttributesListView');
		
		attributeValueListStore.getColumnModel().getColumnById('toBeValue').getEditor().getStore().load();
		attributeValueListStore.getColumnModel().getColumnById('asIsValue').getEditor().getStore().load();
		
		var specialAttributesListStore = this.getComponent('specialAttributesListView').getStore();

		var params = {
			cwid: AAM.getCwid(),
			ciId: AAM.getCiId(),
			token: AAM.getToken(),
			ciTypeId: AAM.getCiTypeId(),
			id: AAM.getCiId(),
			tableId: AAM.getTableId()
		};
		
		specialAttributesListStore.load({
			params: params
		});
		
		this.updateBasedOnRole(attributeValueListStore,data);
//		Ext.getCmp('attributeValueListStore').store.load();
		
	}
	
});
Ext.reg('AIR.CiSpecialAttributesView', AIR.CiSpecialAttributesView);