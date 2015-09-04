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
		            header: 'Attribute Name',
		            dataIndex: 'attributeName',
		            id: 'attributeName',
					menuDisabled: true,
					flex : 1 
		        },{
		            header: 'To be value',
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
	                    listeners: {
	                    	expand : function(combo){
	                    		var attributeId = Ext.getCmp('specialAttributesListView').getSelectionModel().selection.record.data.attributeId;
	                    		combo.store.filter('attributeId',attributeId);
	                    	},
	                    	change : function(combo, newValue, oldValue) {
	                            if (Util.isComboValueValid(combo, newValue, oldValue)) {

	                                if (typeof newValue === 'string' && newValue.length === 0) {
	                                    combo.reset();
	                                }
	                            }
	                        }
	                    }
	               },
	               renderer: this.columnRenderer
		        }, {
		            header: 'As is value',
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
	                    listeners: {
	                    	expand : function(combo){
	                    		var attributeId = Ext.getCmp('specialAttributesListView').getSelectionModel().selection.record.data.attributeId;
	                    		combo.store.filter('attributeId',attributeId);
	                    	},
	                    	change : function(combo, newValue, oldValue) {
	                            if (Util.isComboValueValid(combo, newValue, oldValue)) {

	                                if (typeof newValue === 'string' && newValue.length === 0) {
	                                    combo.reset();
	                                }
	                            }
	                        }
	                    }
	               },
  	               renderer: this.columnRenderer
		        },{
		            header: 'Group',
		            dataIndex: 'group',
		            id: 'group',
		            flex : 1,
					menuDisabled: true
		    	}]				
		    }],
		    buttons: [{
		        text: 'Save',
		        id: 'saveAttributeBtn',
		        disabled: true,
		        tooltip: 'Click to save all changes to the database',
		        handler: function() {
		        	var isSuccess = true;
		        	var records = this.getComponent('specialAttributesListView').getStore().getRange();
		        	records.forEach(function(record){
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
						    callback: function(records, operation, success) {
								isSuccess = isSuccess && success;
						    }
						});
		        	});
		        	
		        	var yesCallback = function() {
						this.wizardStarted = false;
						this.fireEvent('externalNavigation', this, null, 'clCiSpecialAttributes');
					};
		        	
		        	var callbackMap = {
						yes: yesCallback.createDelegate(this)
					};
		        	
		        	if (isSuccess) {
			        	var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED', callbackMap);
						afterSaveAppWindow.show();
			        } else {
			        	var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_SAVED_ERROR', callbackMap);
						afterSaveAppWindow.show();
			        }
		        	
		        },
		        scope:this
		    }]
		});
		
		AIR.CiSpecialAttributesView.superclass.initComponent.call(this);
		
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
    
    updateBasedOnRole : function(grid){
		var rolePersonListStore = AIR.AirStoreManager.getStoreByName('rolePersonListStore');
		var btn = this.buttons[0];
		var ci = undefined;
		if(Ext.getCmp('tpCiSearchResultTables').getActiveTab()!=null)
		ci = Ext.getCmp('tpCiSearchResultTables').getActiveTab().store.data.items[ciResultGrid.store.find('id',AAM.getCiId())];
		
		rolePersonListStore.each(function(item) {
			var value = item.data.roleName;
			if(value === 'AIR_SPECIAL_ATTRIBUTE_EDITOR'){
				grid.getColumnModel().getColumnById('toBeValue').editor.disabled = false;
				grid.getColumnModel().getColumnById('asIsValue').editor.disabled = false;
				btn.disabled = false;
				return;
			}
		});
		if(ci != undefined){
			if(ci.get('ciOwner') === AAM.getCwid() || ci.get('ciOwnerDelegate') === AAM.getCwid() ||
					ci.get('applicationSteward') === AAM.getCwid()){
				grid.getColumnModel().getColumnById('asIsValue').editor.disabled = false;
				btn.disabled = false;
				return;
			}
		} else {
			ci = AAM.getAppDetail();
			if(ci.applicationOwnerHidden === AAM.getCwid() || ci.applicationOwnerDelegateHidden === AAM.getCwid() ||
					ci.applicationStewardHidden === AAM.getCwid()){
				grid.getColumnModel().getColumnById('asIsValue').editor.disabled = false;
				btn.disabled = false;
				return;
			}
		}
	},
	
	update: function() {
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
		
		this.updateBasedOnRole(attributeValueListStore);
	}
	
});
Ext.reg('AIR.CiSpecialAttributesView', AIR.CiSpecialAttributesView);