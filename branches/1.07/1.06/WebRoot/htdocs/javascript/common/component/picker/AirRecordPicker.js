Ext.namespace('AIR');

AIR.AirRecordPicker = Ext.extend(Ext.Tip, {
	constructor: function(event, objectType, pc) {
		this.event = event;
		this.objectType = objectType;
		this.pickerConfig = pc;		
		
//		var beginTitle = comp.getValue().length == 0 ? 'Add' : 'Replace';
//		this.title = beginTitle + ' CWID to ' + Ext.get('label' + comp.getId()).dom.innerHTML + '<br><hr>';//personpickercomponent
		
		AIR.AirRecordPicker.superclass.constructor.call(this);
	},

	initComponent: function() {
		Ext.apply(this, {
			title: 'Add Connection<br/><hr>',
			id: 'recordpickertip',
			hidden: true,
			autoHeight: true,
			minWidth: 475,
			maxWidth: 550,
			autoDestroy: true,
			draggable: true,
			layout: 'form',
			labelWidth: 5,
			cls: 'filter',
			
			tools: [{
				id: 'close',
				qtip: 'Cancel',
				handler: function (event, toolEl, panel, object) {
					this.close();
				}.createDelegate(this)
			}],
			
			items: [{
				xtype: 'panel',
				id: 'tbRecordSearch',
				layout: 'hbox',//toolbar
				border: false,
				
			    bodyStyle: {
			    	background: 'transparent'
//			    	backgroundColor: 'transparent'//'#DFE8F6'
			    },
				
				items: [{ 
					xtype: 'searchfield',//textfield
					id: 'rpQueryField',

					width: 150,
					enableKeyEvents: true,
					maskRe: /[\w\d\-+\/ ,&.]/
					
//					listeners: {
//						keyup: function(field) {
//							this.search();
//						}.createDelegate(this)
//					}
				},{
				    xtype: 'combo',
					id: 'rpQuerySelectorRecord',

//				    forceSelection: true,
//				    autoSelect: true,
				    width: 150,
				    
				    hidden: true,
				    store: AIR.AirStoreFactory.createRecordTypeStore(),
					mode: 'local',
				    
				    valueField: 'type',
				    displayField: 'displayText',
				    
				    style: {
				    	marginLeft: 5
				    }
				    
//				    listeners: {
//				    	change: function (rg, radio) {
//							var field = this.getComponent('tbRecordSearch').getComponent('rpQueryField');
//							field.reset();
//				    	}.createDelegate(this)
//				    }
				}]
			}, {
				xtype: 'listview',
				id: 'lvRecords',
				
				store: AIR.AirStoreFactory.createRecordPickerStore(),
				
				singleSelect: false,
				emptyText: '',
				autoScroll: true,
				height: 95,
				loadingText: '&nbsp;',
				emptyText: 'No records found.',
				
				columns: [{
					tpl: '<img src="' + img_AddSelectedConnection + '">',
					width: .05
				}, {
					header: 'Name',
					dataIndex: 'name'
				}, {
					header: 'Owner',
					dataIndex: 'responsible',
					width: .20
				}],
				
				listeners: {
					click: function(dv, index, node, evt) {
						this.updateField(dv.getRecord(node), this.comp);
					}.createDelegate(this)
				}
			}],
			bbar: ['->', {
	    	    xtype: 'button',
	    	    id: 'rpClose',
	            text: 'Close',
	            handler: function (button, event) {
		            this.close();
		        }.createDelegate(this)
	        }]
		});
		
	    AIR.AirRecordPicker.superclass.initComponent.call(this);
	    
	    this.addEvents('recordAdd');
	    
	    var field = this.getComponent('tbRecordSearch').getComponent('rpQueryField');
	    field.on('search', this.onSearch, this);
	    field.on('specialkey', this.onEnter, this);
	},
	
	onEnter: function(field, e){
        if(e.getKey() === e.ENTER)
        	this.onSearch(field);
	},
	
	
	updateField: function(record, comp) {//, pickerConfig
		var element = Ext.getCmp(comp.getId());
		
		if (element.getXType()==='grid') {
			var connectionRecord = new ciConnectionRecordDef({
				id: -1,
				type: record.get('type'), 
			    name: record.get('name'), 
			    alias: record.get('alias'), 
			    responsible: record.get('responsible'), 
			    subResponsible: record.get('subResponsible'),
			    category: record.get('category'), 
			    tableId: record.get('tableId'),
			    ciId: record.get('ciId'), 
			    direction: record.get('direction'),
			    groupsort: 'L::' + record.get('type'),
			    status: 'I'
			});
			
			element.store.addSorted(connectionRecord);
		} else {
			var hiddenElement = Ext.getCmp(comp.getId() + 'Hidden');
			var contains = false;
//			maxWidth = 25;
			
			if (element !== undefined) {
				if (element.getXType() === 'textarea') {
//					if (maxWidth<record.get('name').length) {
//						maxWidth = record.get('name').length > 50 ? 50 : record.get('name').length;
//					}
					if (element.getValue().length == 0) {
						element.setValue(record.get('name'));
					} else if (element.getValue().indexOf(record.get('name')) === -1) {
						element.setValue(element.getValue() + '\n' + record.get('name'));
					} else {
						contains = true;
					}
				} else {
					element.setValue(record.get('name'));
				}
			}
			if (hiddenElement !== undefined) {
				if (element.getXType() === 'textarea' && hiddenElement.getValue().length > 0) {
					if (!contains) {
						hiddenElement.setValue(hiddenElement.getValue() + ',' + record.get('ciId'));
					}
				} else {
					hiddenElement.setValue(record.get('ciId'));
				}
				
				this.fireEvent('recordAdd', this, element, hiddenElement);
			}
		}
		
		this.close();
	},
	
	onSearch: function(field) {
		var queryTask = new Ext.util.DelayedTask(function() {
//			var field = this.getComponent('tbRecordSearch').getComponent('rpQueryField');
			var store = this.getComponent('lvRecords').getStore();
			var rpQuerySelectorRecord = this.getComponent('tbRecordSearch').getComponent('rpQuerySelectorRecord');
			
			if (field.getValue().length >= 2) {
				var params = {
					query: field.getValue(),
					type: this.objectType ? this.objectType : rpQuerySelectorRecord.getValue()
				};
				
				store.load({
					params: params
				});
				
//				rpStore.baseParams = {};
//		    	rpStore.setBaseParam('query', field.getValue());
//		    	if (recordpickerObjectType===null) {
//		    		rpStore.setBaseParam('type', Ext.getCmp('rpQuerySelectorRecord').getValue());
//		    	} else {
//		    		rpStore.setBaseParam('type', recordpickerObjectType);
//		    	}
//			    rpStore.load();
		   } else {
			   store.removeAll();
		   }
		}.createDelegate(this));
		
		queryTask.delay(500);
	},
	
	update: function(comp, objectType) {
		this.comp = comp;
		this.objectType = objectType;
		
		var tfSearch = this.getComponent('tbRecordSearch').getComponent('rpQueryField');//.items.items[0];//tbRecordSearch
		tfSearch.reset();
		tfSearch.focus(true, 500);
		
		if (undefined!==Ext.getCmp('label' + this.comp.getId())) {
			label = Ext.get('label' + this.comp.getId()).dom.innerHTML;
		} else {
			label = 'connections';
		}
		
		this.setTitle('Add record to ' + label + '<br><hr>');
	},
	
	close: function() {
		var lvRecords = this.getComponent('lvRecords');
		lvRecords.getStore().removeAll();
		
//		this.destroy();
		this.hide();
	}
});