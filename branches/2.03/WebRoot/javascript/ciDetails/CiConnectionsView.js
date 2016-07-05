Ext.namespace('AIR');

AIR.CiConnectionsView = Ext.extend(AIR.AirView, {//Ext.Panel
	toolbarMessageTpl: new Ext.XTemplate('<table><tr><td><img src="images/{icon}"/></td><td>{text}</td></tr><table>'),//images/{icon}
	toolbarEmptyMessage: '<table><tr><td>&nbsp;</td></tr><table>',
	
	initComponent: function() {
		var raDeleteUpStreamConnection = new Ext.ux.grid.RowActions({
			id: 'raDeleteUpStreamConnectionColumn',
			
			actions: [{
				iconCls: 'icon-delete'//iconCls ist gleichzeitig id/iconIndex f�r Spalte!
//				qtipIndex: 'qtip1',
//				tooltip: 'Open'
			}],
		
	        tpl: new Ext.XTemplate(),
	        renderer: this.getDeleteUpStreamConnectionRenderer.createDelegate(this)
		});

		raDeleteUpStreamConnection.on({
            action: this.onUpStreamConnectionRemoved.createDelegate(this)
        });
		
		
		var raDeleteDownStreamConnection = new Ext.ux.grid.RowActions({
			id: 'raDeleteDownStreamConnectionColumn',
			
			actions: [{
				iconCls: 'icon-delete'//iconCls ist gleichzeitig id/iconIndex f�r Spalte!
//				qtipIndex: 'qtip1',
//				tooltip: 'Open'
			}],
		
	        tpl: new Ext.XTemplate(),
	        renderer: this.getDeleteDownStreamConnectionRenderer.createDelegate(this)
		});

		raDeleteDownStreamConnection.on({
            action: this.onDownStreamConnectionRemoved.createDelegate(this)
        });
		
		Ext.apply(this, {
		    title: 'Connections',
		    layout: 'hbox',//form hbox
		    border: false,
		    
//		    height: 800,//650 550
			height: 485,//480 550 500 450 350 
			autoScroll: true,
		    			
		    items: [{
		    	xtype: 'panel',
		    	id: 'pConnectionsUpDownStreamV',
		    	layout: 'form',
		    	border: false,
		    	
		    	height: 530,//520 500 580 480
		    	margins: '10 0 0 10',
		    	flex: 4,
		    	
		    	items: [{
		    		xtype: 'label',
		    		id: 'lUpStreamConnections',
		    		text: 'UpStream Connections',
				    style: {
				    	fontSize: '12px'
				    }
		    	},{
					xtype: 'grid',//listview grid
					id: 'lvUpStreamConnections',
					store: AIR.AirStoreFactory.createCiConnectionsStore(),//true createCiUpStreamConnectionsStore createCiUpDownStreamConnectionsStore(),
					multiSelect: false,
					singleSelect: true,
					border: true,
					autoScroll: true,
					
					height: 180,//200 230 165
//			        hideHeaders: true,
			        					
					columns: [{
				        header: 'CI Name',
				        dataIndex: 'ciName',//name
				        width: 180,
				        menuDisabled: true
				    },{
				        header: 'CI Type',
				        dataIndex: 'ciType',//type
				        width: 180,
				        menuDisabled: true
				    },{
				        header: 'Source',
				        dataIndex: 'source',
				        width: 100,
				        menuDisabled: true
				    }, raDeleteUpStreamConnection],
				    
				    bbar: {
				    	xtype: 'toolbar',
				    	
				    	items: [{
					    	xtype: 'label',
					    	id: 'lTbUpstreamConnectionMsg',
					    	html: this.toolbarEmptyMessage
				    	}]
				    },
				    
//					enableDragDrop: true,
					ddGroup: 'ddCiConnectionsUpStreamRemoveGroup',
				    
				    plugins: [ raDeleteUpStreamConnection ]
		    	},{
		    		xtype: 'container',
		    		height: 20
		    	},{
		    		xtype: 'label',
		    		id: 'lDownStreamConnections',
		    		text: 'DownStream Connections',
				    style: {
				    	fontSize: '12px'
				    }
		    	},{
					xtype: 'grid',//listview grid
					id: 'lvDownStreamConnections',
					store: AIR.AirStoreFactory.createCiConnectionsStore(),//createCiDownStreamConnectionsStore createCiUpDownStreamConnectionsStore(),
					multiSelect: false,
					singleSelect: true,
					border: true,
					autoScroll: true,
					
					height: 180,//200 230 165
//			        hideHeaders: true,
								        
					columns: [{
				        header: 'CI Name',
				        dataIndex: 'ciName',//name
				        width: 180,//150
				        menuDisabled: true
				    },{
				        header: 'CI Type',
				        dataIndex: 'ciType',//type
				        width: 180,
				        menuDisabled: true
				    },{
				        header: 'Source',
				        dataIndex: 'source',
				        width: 100,
				        menuDisabled: true
				    }, raDeleteDownStreamConnection],
				    
				    bbar: {
				    	xtype: 'toolbar',
				    	
				    	items: [{
					    	xtype: 'label',
					    	id: 'lTbDownstreamConnectionMsg',
					    	html: this.toolbarEmptyMessage
				    	}]
				    },
				    
//					enableDragDrop: true,
					ddGroup: 'ddCiConnectionsDownStreamRemoveGroup',

				    plugins: [ raDeleteDownStreamConnection ]
		    	}]
		    }, {
		    	xtype: 'panel',
		    	id: 'p1',
		    	border: false,
		    	
		    	flex: 5,
		    	
		    	layout: 'form',//border form
		    	height: 680,//640 650 520 450
		    	margins: '10 0 0 15',
		    	
		    	items: [{
		    		xtype: 'panel',
		    		id: 'p11',
		    		layout: 'hbox',
		    		border: false,
		    		
		    		items: [{
		    			html: '&nbsp',
		    			border: false,
		    			//flex: 2
		    		},{
			    		xtype: 'button',
			    		id: 'bEditConnections',
			    		text: 'Edit Connections',
			    		autoWidth: false,
			    		style: {
			    			align: 'right'
			    		},
			    		//flex: 1,
			    		//buttonAlign: 'right',
			    		pack: 'end',
			    		enableToggle: true
		    		}]
		    	}, {
			    	xtype: 'panel',
			    	id: 'pConnectionsCiSearchV',
			    	region: 'center',
			    	
			    	hidden: true,
			    	border: false,
			    	layout: 'form',//form vbox
//			    	flex: 1,
//			    	height: 720,
			    	
//			    	title: 'Edit Up/Down stream connections',
//				    collapsible: true,
//				    collapsed: true,//verursacht rendering Probleme. Auch bei pConnectionsCiSearchV.toggleCollapse(true) oder collapse()
//				    
			    	
			    	defaults: { labelWidth: 80 },//anchor: '100%'
			    	margins: '10 0 0 10',
			    	
			    	items: [{
			    		xtype: 'container',
			    		height: 5
			    	}, {
			    		xtype: 'filterCombo',//combo filterCombo
			    		id: 'cbConnectionsObjectType',
			            store: AIR.AirStoreFactory.createCiTypeListStore(false), // always long CiTypeList, because you may search for all CI-types
			    	    
			            fieldLabel: 'Object Type',
			    	    valueField: 'id',//id ciTypeId
			            displayField: 'text',//english ciTypeName
			            mode: 'local',
			            anchor: '100%',

			            triggerAction: 'all',
			            lazyRender: true,
			            lazyInit: false,
			            editable: false
			    	}, {
			    		xtype: 'textfield',
			    		id: 'tfConnectionsQuickSearch',
			    		fieldLabel: 'Quick Search',
			    		anchor: '100%'
			    	}, {
			    		xtype: 'container',
			    		height: 5
			    	}, {
			    		xtype: 'button',
			    		id: 'bConnectionsSearch',
			    		text: 'Search'
			    	}, {
			    		xtype: 'container',
			    		height: 10
			    	}, {
						xtype: 'AIR.DwhEntityGrid',//CiResultGrid
						id: 'CiConnectionsResultGrid',
						anchor: '100%',
						
						
						enableDragDrop: true,
						ddGroup: 'ddCiConnectionsGroup',
						hidden: true,
						complete: false
			    	}]
		    	}]
		    }]
		});
		
		AIR.CiConnectionsView.superclass.initComponent.call(this);
		
		this.addEvents('ciBeforeChange', 'ciChange');
		
		//check user rights to enable/disable editing
		var bEditConnections = this.getComponent('p1').getComponent('p11').getComponent('bEditConnections');
		bEditConnections.on('click', this.editConnections, this);
		
		var bConnectionsSearch = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('bConnectionsSearch');
		bConnectionsSearch.mon(bConnectionsSearch, 'click', this.onConnectionsCiSearch, this);
		
		//if(userHasEditPermission) pConnectionsCiSearchV.setVisible(true);
		var pConnectionsCiSearchV = this.getComponent('p1').getComponent('pConnectionsCiSearchV');
		var grid = pConnectionsCiSearchV.getComponent('CiConnectionsResultGrid');
		grid.getStore().on('beforeload', this.onGridBeforeLoaded , this);
		grid.getStore().on('load', this.onGridLoaded, this);
		grid.updateHeight();
		
		var lvUpStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvUpStreamConnections');
		var lvDownStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvDownStreamConnections');
		
		lvUpStreamConnections.getStore().on('add', this.onCiConnectionAdded, this);
		lvDownStreamConnections.getStore().on('add', this.onCiConnectionAdded, this);
		
		lvUpStreamConnections.getStore().on('remove', this.onCiConnectionRemoved, this);
		lvDownStreamConnections.getStore().on('remove', this.onCiConnectionRemoved, this);
		
//		lvUpStreamConnections.on('rowdblclick', this.onRowDoubleClick, this);
//		lvDownStreamConnections.on('rowdblclick', this.onRowDoubleClick, this);
		
		this.CiUpDownStreamConnectionsRecord = new Ext.data.Record.create([
			{ name: 'ciName' },
			{ name: 'ciType' },
			{ name: 'id' },//ciId
			{ name: 'source' },
			{ name: 'dwhEntityId' }	
		]);
		
		
		var cbConnectionsObjectType = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('cbConnectionsObjectType');
		var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
		var records = store.getRange();
		for(var i = 0; i < records.length; i++)
//			if(records[i].get('ciTypeId') === AC.TABLE_ID_IT_SYSTEM || 
//			   records[i].get('ciTypeId') === AC.TABLE_ID_APPLICATION)
				cbConnectionsObjectType.getStore().add(records[i]);
	},
	
	editConnections: function(button, event) {
		var pConnectionsCiSearchV = this.getComponent('p1').getComponent('pConnectionsCiSearchV');
		
		if(button.pressed) {
			pConnectionsCiSearchV.setVisible(true);
		} else {
			pConnectionsCiSearchV.setVisible(false);
		}
	},
	
	onConnectionsCiSearch: function(button, event) {
		this.createDropTargets();
		
		var cbConnectionsObjectType = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('cbConnectionsObjectType');
		var tfConnectionsQuickSearch = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('tfConnectionsQuickSearch');
		
		var connectionsObjectType = cbConnectionsObjectType.getRawValue();//getValue
		var connectionsQuickSearch = tfConnectionsQuickSearch.getValue();
		
				
		var params = {
		 	cwid: AIR.AirApplicationManager.getCwid(),
		 	token: AIR.AirApplicationManager.getToken(),
			start: 0,
			limit: 20,
			type: connectionsObjectType,
			query: connectionsQuickSearch
		};

		
		if(params.query.length > 0) {
		    while(params.query.indexOf('*') > -1)
		    	params.query = params.query.replace('*', '%');
		    
		    while(params.query.indexOf('?') > -1)
		    	params.query = params.query.replace('?', '_');
		}
		
		
		var grid = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('CiConnectionsResultGrid');
		grid.getStore().load({
			params: params
		});
		
		delete params.start;
		delete params.limit;
		grid.setPagingParams(params);
	},
	
	onGridBeforeLoaded: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
	},
	
	onGridLoaded: function(store, records, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).hide();
		
		var grid = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('CiConnectionsResultGrid');
		grid.setVisible(true);
	},
	
	//muss nach dem Rendern in initComponent() von edittabpanel als Klasse(!) aufgerufen werden!!.
	//Das listview el ist erst NACH dem vollst�ndigen Rendern dieses Panels mit allen Unterelementen
	//vorhanden.
	//Zum Testen behelfsm��ig in onConnectionsCiSearch aufgerufen.
	createDropTargets: function() {
		var lvUpStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvUpStreamConnections');
		var lvDownStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvDownStreamConnections');
//		if(lvUpStreamConnections.getEl()) return;//nur aufrufen wenn el noch nicht erstellt
		
		
        this.ddUpStreamConnectionsGroup = new Ext.dd.DropTarget(lvUpStreamConnections.getEl().dom, {//lvUpStreamConnections.getView().scroller.dom
            ddGroup: 'ddCiConnectionsGroup',
            notifyDrop: this.onUpStreamConnectionAdded.createDelegate(this)
        });
        
        this.ddDownStreamConnectionsGroup = new Ext.dd.DropTarget(lvDownStreamConnections.getEl().dom, {
            ddGroup: 'ddCiConnectionsGroup',
            notifyDrop: this.onDownStreamConnectionAdded.createDelegate(this)
        });
        
        
//        var grid = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('CiConnectionsResultGrid');
//        
//        this.ddCiConnectionsUpStreamRemoveGroup = new Ext.dd.DropTarget(grid.getView().scroller.dom, {
//            ddGroup: 'ddCiConnectionsUpStreamRemoveGroup',
//            notifyDrop: this.onUpStreamConnectionRemoved.createDelegate(this)
//        });
//        
//        
//        this.ddCiConnectionsDownStreamRemoveGroup = new Ext.dd.DropTarget(grid.getView().scroller.dom, {
//            ddGroup: 'ddCiConnectionsDownStreamRemoveGroup',
//            notifyDrop: this.onDownStreamConnectionRemoved.createDelegate(this)
//        });
	},
	
	onUpStreamConnectionAdded: function(ddSource, e, data) {
		return this.addConnection(ddSource, e, data, 'lvUpStreamConnections', AC.UPSTREAM);
		
//		lvUpStreamConnections.getStore().add(record);//breakpoint auf Ext.grid.GridView.onAdd() ! 
		//this.fireEvent('add', this, records, index); //line 24034
		//  this.insertRows(store, index, index + (records.length-1)); //line 48446
		//	  Ext.DomHelper.insertHtml('beforeEnd', this.mainBody.dom, html); // line 47898
		//		el.insertAdjacentHTML(hashVal[0], html); // line 516
	},
	
	onDownStreamConnectionAdded: function(ddSource, e, data) {
		return this.addConnection(ddSource, e, data, 'lvDownStreamConnections', AC.DOWNSTREAM);
	},
	
	addConnection: function(ddSource, e, data, listViewId, direction) {
		var record = ddSource.dragData.selections[0].data;
		
		var newCiData = {
			ciName: record.ciName,
			ciType: record.ciType,
			id: record.ciId,
			source: record.source,
			dwhEntityId: record.dwhEntityId
		};
		
		var newCiRecord = new this.CiUpDownStreamConnectionsRecord(newCiData);
//		newCiRecord.id = newCiData.id;
		newCiRecord.dwhEntityId = newCiData.dwhEntityId;
		

		
		var exists = this.isAlreadyUpDownStream(newCiRecord.data.dwhEntityId);//newCiRecord.data.id listView.getStore().getById(newCiRecord.data.id);
		var appDetail = AIR.AirApplicationManager.getAppDetail();//applicationDetailStore.data.items[0].data;//
		
//		var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
//		var typeField = appDetail.applicationCat1Id || appDetail.ciSubTypeId ? 'ciSubTypeId' : 'ciTypeId';
//		var typeFieldId = appDetail.applicationCat1Id || appDetail.ciSubTypeId || appDetail.tableId;
//		var r = Util.getStoreRecord(store, typeField, parseInt(typeFieldId));//appDetail.tableId
		var r = Util.getCiTypeRecord(appDetail);
		
		
		var ciName = appDetail.name;
		var ciType = r.get('text');//appDetail.applicationCat1Txt;//
		var newCiName = newCiRecord.data.ciName;
		var newCiType = newCiRecord.data.ciType;
		
		
//		ORIG: var result = AIR.AirApplicationManager.validateCreateConnection(exists, ciType, ciName, newCiType, newCiName, direction);
		var result = AIR.AirApplicationManager.validateCreateConnection(exists, newCiType, newCiName, ciType, ciName, direction);
		if(result.isSuccessful) {
			var listView = this.getComponent('pConnectionsUpDownStreamV').getComponent(listViewId);
			listView.getStore().add(newCiRecord);
		}
		
		this.updateToolbar(listViewId, result.messageType, result.message);
		
		return result.isSuccessful;
	},
	
	isAlreadyUpDownStream: function(newCiId) {
		var upStreamListView = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvUpStreamConnections');
		var downStreamListView = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvDownStreamConnections');
		
		//Funktioniert nicht wie erwartet. idProperty im reader des listView Stores ist undefined, obwohl in AirStoreFactory.createCiConnectionsStore()
		//idProperty: 'dwhEntityId' gesetzt ist. So m�sste es funktionieren.
//		var alreadyExists = upStreamListView.getStore().getById(newCiId) ||
//							downStreamListView.getStore().getById(newCiId);
//		alreadyExists = alreadyExists == undefined ? false : true;

		var alreadyExists = upStreamListView.getStore().findExact('dwhEntityId', newCiId) > -1 ||
							downStreamListView.getStore().findExact('dwhEntityId', newCiId) > -1;
		
		return alreadyExists;
	},
	
	
	onCiConnectionAdded: function(store, records, index) {
		this.fireEvent('ciChange', this, store, records);
//		activateButtonSaveApplication();//activateStandardButtons in editfunctions.js
	},
	
	onCiConnectionRemoved: function(store, record, index) {
        if (record.phantom) {//wenn record schon persistent war, geladen wurde
        	store.remove(record);
        } else {
        	//wenn record zuvor durch user aus edit Suchtabelle neu hinzugef�gt wurde und wieder
        	//aus up oder down stream listview gel�scht wurde. --> nicht zum L�schen �bertragen!
        	store.removed.push(record);
        }
        
        //zu l�schende Verkn�pfung (record) aus den stores l�schen, in denen record EVTL. zuvor lokal hinzugef�gt wurde
		var lvUpStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvUpStreamConnections');
		var records = lvUpStreamConnections.getStore().getModifiedRecords();
		for(var i = 0; i < records.length; i++)
			if(records[i].get('id') == record.get('id'))
				records.splice(i, 1);
				
		var lvDownStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvDownStreamConnections');
		records = lvDownStreamConnections.getStore().getModifiedRecords();
		for(var i = 0; i < records.length; i++)
			if(records[i].get('id') == record.get('id'))
				records.splice(i, 1);
	},
	
	//getCiConnectionDataChanges: function() {
	setData: function(data) {
		var lvUpStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvUpStreamConnections');
		var lvDownStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvDownStreamConnections');
		
		var newUpStreamRecords = lvUpStreamConnections.getStore().getModifiedRecords();
		var newDownStreamRecords = lvDownStreamConnections.getStore().getModifiedRecords();
		
		var deletedUpStreamRecords = lvUpStreamConnections.getStore().removed;
		var deletedDownStreamRecords = lvDownStreamConnections.getStore().removed;

		
		var upStreamAdd = '';
		for(var i = 0; i < newUpStreamRecords.length; i++) {
			if(i > 0)
				upStreamAdd += ',';
			
			upStreamAdd += newUpStreamRecords[i].data.dwhEntityId;//id
		}
		if(upStreamAdd.length > 0)
			data.upStreamAdd = upStreamAdd;
		
		
		var downStreamAdd = '';
		for(var i = 0; i < newDownStreamRecords.length; i++) {
			if(i > 0)
				downStreamAdd += ',';
			
			downStreamAdd += newDownStreamRecords[i].data.dwhEntityId;//id
		}
		if(downStreamAdd.length > 0)
			data.downStreamAdd = downStreamAdd;
			
		
		var upStreamDelete = '';
		for(var i = 0; i < deletedUpStreamRecords.length; i++) {
			if(i > 0)
				upStreamDelete += ',';
			
			upStreamDelete += deletedUpStreamRecords[i].data.dwhEntityId;//id
		}
		if(upStreamDelete.length > 0)
			data.upStreamDelete = upStreamDelete;
		
		
		var downStreamDelete = '';
		for(var i = 0; i < deletedDownStreamRecords.length; i++) {
			if(i > 0)
				downStreamDelete += ',';
			
			downStreamDelete += deletedDownStreamRecords[i].data.dwhEntityId;//id
		}
		if(downStreamDelete.length > 0)
			data.downStreamDelete = downStreamDelete;
	},
	
	clear: function(data) {
		this.update(data);
	},
	
	update: function(data) {
		this.reset();
		
		var bEditConnections = this.getComponent('p1').getComponent('p11').getComponent('bEditConnections');
		var isLocationCI = AAM.isLocationCi(data.tableId);
//		this.getComponent('p1').setVisible(!isLocationCI);
		if(isLocationCI)
			bEditConnections.disable();
		else{
			if( AIR.AirApplicationManager.hasRole(AC.USER_ROLE_AIR_BAR_EDITOR) && AC.TABLE_ID_BUSINESS_APPLICATION==data.tableId ){
				bEditConnections.enable();
			}else{
			AIR.AirAclManager.setAccessMode(bEditConnections, data);
			}
		}
		
		var lvUpStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvUpStreamConnections');
		var lvDownStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvDownStreamConnections');
		
		if(data.isCiCreate) {
			lvUpStreamConnections.getStore().removeAll();
			lvDownStreamConnections.getStore().removeAll();
		} else {
			lvUpStreamConnections.getStore().load({
				params: {
				 	cwid: AIR.AirApplicationManager.getCwid(),
				 	token: AIR.AirApplicationManager.getToken(),
	//				applicationId: AIR.AirApplicationManager.getCiId()//selectedCIId
				 	
				 	tableId: AIR.AirApplicationManager.getTableId(),
			 		ciId: AIR.AirApplicationManager.getCiId(),
		 			direction: 'UPSTREAM'
				}
			});
	
			lvDownStreamConnections.getStore().load({
				params: {
				 	cwid: AIR.AirApplicationManager.getCwid(),
				 	token: AIR.AirApplicationManager.getToken(),
	//				applicationId: AIR.AirApplicationManager.getCiId()//selectedCIId
				 	
				 	tableId: AIR.AirApplicationManager.getTableId(),
			 		ciId: AIR.AirApplicationManager.getCiId(),
		 			direction: 'DOWNSTREAM'
				}
			});
		}
		
		this.resetToolbar();
		
		var cbConnectionsObjectType = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('cbConnectionsObjectType');
		
//		cbConnectionsObjectType.reset();
		this.filterCiTypes(cbConnectionsObjectType, data);
		
		var r = cbConnectionsObjectType.getStore().getAt(0);
		var v = r ? r.get('text') : '';
		cbConnectionsObjectType.setValue(v);
	},
	
	filterCiTypes: function(cbConnectionsObjectType, data) {
		/* Variante 3 */
		var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
		var records = store.getRange();
		
//		var r = Util.getStoreRecord(store, 'ciTypeId', parseInt(data.tableId));//tableId
//		var ciTypeSource = r.get('text');
		var r = Util.getCiTypeRecord(data);
		var ciTypeSource = r.get('text');//appDetail.applicationCat1Txt;//
		
		cbConnectionsObjectType.getStore().removeAll();
		for(var i = 0; i < records.length; i++) {
			var ciTypeDest = records[i].get('text');
			if(AAM.isConnectionCiTypeAllowed(ciTypeSource, ciTypeDest))
				cbConnectionsObjectType.getStore().add(records[i]);
		}
		
		// Variante 1 (die beste) und 2 funktionieren/greifen erst ab zweitem CI Neuladen und Combobox Bedienung/expand.
		// Grund unbekannt. Daher unsch�ne aber sichere Variante 3.
		
		/* Variante 2
		var r = Util.getComboRecord(cbConnectionsObjectType, 'ciTypeId', parseInt(data.tableId));//tableId
		var ciTypeSource = r.get('text');
		var records = cbConnectionsObjectType.getStore().getRange();
		
		
		var matches = [];
		for(var i = 0; i < records.length; i++) {
			var ciTypeDest = records[i].get('text');
			if(AAM.isConnectionCiTypeAllowed(ciTypeSource, ciTypeDest))
				matches.push(ciTypeDest);
		}
		var filterData = { text: matches };//matches[0]
		cbConnectionsObjectType.filterByDataValueList(filterData);//filterByData
		*/
		
		/* Variante 1
		cbConnectionsObjectType.reset();
		var r = Util.getComboRecord(cbConnectionsObjectType, 'ciTypeId', parseInt(data.tableId));
		var ciTypeSource = r.get('text');
		
		var filterFn = function(record) {
			var ciTypeDest = record.get('text');
			return AAM.isConnectionCiTypeAllowed(ciTypeSource, ciTypeDest);
		};
		
		cbConnectionsObjectType.getStore().filterBy(filterFn);*/
	},
	
//	onRowDoubleClick: function (grid, rowIndex, e) {
//		
//		//�berfl�ssig, da durch von up/down connections hinzuf�gen schon aktiviert. Wenn bereits
//		//vorhandene gel�scht sind diese nie phantom
////		if(!grid.getStore().getAt(rowIndex).phantom)
//		activateButtonSaveApplication();//activateStandardButtons();
//		
//		grid.getStore().removeAt(rowIndex);
//	},
	
	//called by yesCallback of applicationSaveStore's load listener
	commitChanges: function() {
		var lvUpStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvUpStreamConnections');
		var lvDownStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvDownStreamConnections');
		
		lvUpStreamConnections.getStore().commitChanges();
		lvDownStreamConnections.getStore().commitChanges();
	},
	
	onCiSelected: function(grid, rowIndex, e) {
		this.reset();
	},
	
	reset: function() {
		var pConnectionsCiSearchV = this.getComponent('p1').getComponent('pConnectionsCiSearchV');
		var grid = pConnectionsCiSearchV.getComponent('CiConnectionsResultGrid');
		grid.getStore().removeAll();
		grid.setVisible(false);
		
		var tfConnectionsQuickSearch = pConnectionsCiSearchV.getComponent('tfConnectionsQuickSearch');
		tfConnectionsQuickSearch.reset();
		
//		var cbConnectionsObjectType = pConnectionsCiSearchV.getComponent('cbConnectionsObjectType');
//		cbConnectionsObjectType.reset();
//		var data = { tableId: AAM.getTableId() };
//		this.filterCiTypes(cbConnectionsObjectType, data);
		
		pConnectionsCiSearchV.setVisible(false);
		var bEditConnections = this.getComponent('p1').getComponent('p11').getComponent('bEditConnections');
		if(bEditConnections.pressed)
			bEditConnections.toggle();//kein Toogle Effekt: bEditConnections.fireEvent('click', bEditConnections);

		this.resetToolbar();
//		this.getEl().scroll('top', 1000);
		//this.getEl().scrollTo('top', 0);//rowPosY rowElParent
		
//		this.isLoaded = false;
	},
	
	resetToolbar: function() {
		this.updateToolbar('lvUpStreamConnections', 'clear', '&nbsp;');
		this.updateToolbar('lvDownStreamConnections', 'clear', '&nbsp;');
	},
	
	updateToolbar: function(toolbarParentId, messageType, message) {
		var lvUpStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent(toolbarParentId);
		var lTbUpstreamConnectionMsg = lvUpStreamConnections.getBottomToolbar().items.items[0];
		
		var icon = null;
		switch(messageType) {
			case 'info': icon = 'ok_type2_16x16.png'; break;
			case 'error': icon = 'failed_type2_16x16.png'; break;
			case 'warning': icon = 'warning_type2_16x16.png'; break;
			case 'clear':
			default: icon = 'Transparent.png';//this.toolbarMessageTpl.set(this.toolbarEmptyMessage, true); return;//lTbUpstreamConnectionMsg.setText(this.toolbarEmptyMessage, true); return;
		}
		
		var data = {
			icon: icon,
			text: message
		};
		
		this.toolbarMessageTpl.overwrite(lTbUpstreamConnectionMsg.el, data);
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.CiConnectionsViewTitle);
		
		var lUpStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lUpStreamConnections');
		lUpStreamConnections.setText(labels.CiConnectionsViewUpStreamConnections);
		
		var lDownStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lDownStreamConnections');
		lDownStreamConnections.setText(labels.CiConnectionsViewDownStreamConnections);
		
		var bEditConnections = this.getComponent('p1').getComponent('p11').getComponent('bEditConnections');
		bEditConnections.setText(labels.CiConnectionsViewEditConnections);
		
		var bConnectionsSearch = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('bConnectionsSearch');
		bConnectionsSearch.setText(labels.CiConnectionsViewSearch);
		
		var cbConnectionsObjectType = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('cbConnectionsObjectType');
		var tfConnectionsQuickSearch = this.getComponent('p1').getComponent('pConnectionsCiSearchV').getComponent('tfConnectionsQuickSearch');
		
				
		cbConnectionsObjectType.el.up('.x-form-item', 10, true).child('.x-form-item-label').update(labels.CiConnectionsViewObjectType);
		tfConnectionsQuickSearch.el.up('.x-form-item', 10, true).child('.x-form-item-label').update(labels.CiConnectionsViewQuickSearch);
				
		
//		this.doLayout();//getComponent('p1').getComponent('p11'). bringt nichts f�r bEditConnections Gr��e
	},
	
	updateToolTips: function(toolTips) {
		
	},

	
	
//	onUpStreamConnectionRemoved: function(ddSource, e, data) {
////		ddSource.grid
//		data.grid.getStore().remove(data.selections);
//		activateButtonSaveApplication();//activateStandardButtons();
//	},
//	
//	onDownStreamConnectionRemoved: function(ddSource, e, data) {
//		data.grid.getStore().removeAt(data.rowIndex);
//		activateButtonSaveApplication();//activateStandardButtons();
//	},
	
	onUpStreamConnectionRemoved: function(grid, record, action, row, col) {
		var result = AIR.AirApplicationManager.validateDeleteConnection();
		
		this.updateToolbar(grid.getId(), result.messageType, result.message);
		
		if(result.isSuccessful) {
			grid.getStore().remove(record);
			this.fireEvent('ciChange', this, grid, record);
//			activateButtonSaveApplication();
		}
    },
    
	onDownStreamConnectionRemoved: function(grid, record, action, row, col) {
		var result = AIR.AirApplicationManager.validateDeleteConnection();
		
		this.updateToolbar(grid.getId(), result.messageType, result.message);
		
		if(result.isSuccessful) {
			grid.getStore().remove(record);
			this.fireEvent('ciChange', this, grid, record);
//			activateButtonSaveApplication();
		}
    },
    
	getDeleteUpStreamConnectionRenderer: function(value, cell, record, row, col, store) {
    	var lvUpStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvUpStreamConnections');
        var raDeleteUpStreamConnection = lvUpStreamConnections.getColumnModel().getColumnById('raDeleteUpStreamConnectionColumn');
        
        return this.getDeleteConnectionRenderer(value, cell, record, row, col, store, raDeleteUpStreamConnection, AC.UPSTREAM);
	},
	
	getDeleteDownStreamConnectionRenderer: function(value, cell, record, row, col, store) {
    	var lvDownStreamConnections = this.getComponent('pConnectionsUpDownStreamV').getComponent('lvDownStreamConnections');
        var raDeleteDownStreamConnection = lvDownStreamConnections.getColumnModel().getColumnById('raDeleteDownStreamConnectionColumn');
        
        return this.getDeleteConnectionRenderer(value, cell, record, row, col, store, raDeleteDownStreamConnection, AC.DOWNSTREAM);
	},
	
    getDeleteConnectionRenderer: function(value, cell, record, row, col, store, raDeleteConnection, direction) {
    	var data = AIR.AirApplicationManager.getAppDetail();//applicationDetailStore.data.items[0].data;//AIR.AirApplicationManager.getAppDetail();
    	
    	var isAdmin = AAM.hasRole(AC.USER_ROLE_AIR_ADMINISTRATOR);//AAM.hasRole(AC.USER_ROLE_AIR_APPLICATION_MANAGER) || 
		var isEditable = (data.relevanceStrategic == 'Y' || data.relevanceOperational == 'Y' || isAdmin);
		
		//location CI - upstream: nicht l�schbar - downstream und name=unknown: nicht l�schbar
		isEditable = isEditable && !record.get('isReferenced') &&
					 ((direction === AC.UPSTREAM && (data.tableId == AC.TABLE_ID_IT_SYSTEM || data.tableId == AC.TABLE_ID_APPLICATION || data.tableId == AC.TABLE_ID_BUSINESS_APPLICATION)) || 
					  (direction === AC.DOWNSTREAM && record.get('ciName') !== AC.UNKNOWN));// AAM.isLocationCi(data.tableId) && 
		
        raDeleteConnection.tpl.html = '<div class="ux-row-action">';
        if(isEditable)
        	raDeleteConnection.tpl.html += '<div class="ux-row-action-item icon-delete " style="" qtip=""></div>';
        raDeleteConnection.tpl.html += '</div>';

        cell.css += (cell.css ? ' ' : '') + 'ux-row-action-cell';//n�tig, damit die icons nebeneinander sind!
        
//        var dataRecord = raDeleteUpStreamConnection.getData(value, cell, record, row, col, store);
        
        raDeleteConnection.tpl.master.compiled = function() {
            return raDeleteConnection.tpl.html;
        };
        
        return raDeleteConnection.tpl.apply(record);//dataRecord
    }/*,
    
    afterRender: function() {
		//geht nicht, wieso?!
//		var x = Ext.getCmp('workpanel');
		var ciSearchView = Ext.getCmp('searchpanel');//searchpanel CiSearchView
		var ciSearchGrid = ciSearchView.getComponent('ciSearchResultView').getComponent('ciSearchGrid');
//		ciSearchGrid.on('rowclick', this.onCiSelected, this);
    }*/
});
Ext.reg('AIR.CiConnectionsView', AIR.CiConnectionsView);