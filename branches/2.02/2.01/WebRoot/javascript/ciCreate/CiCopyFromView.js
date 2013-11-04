Ext.namespace('AIR');

AIR.CiCopyFromView = Ext.extend(Ext.Panel, {
	CI_TYPE_APPLICATION: 2,
	
	initComponent: function() {
		Ext.apply(this, {
			//irgendwo muss leider die initiale Groesse für die child container angegeben sein
//			width: 600,
			height: 1200,
			
			border: false,
			layout: 'card',//anchor border anchor vbox
			activeItem: 0,
			
			items: [{
				xtype: 'panel',
				id: 'pCopyFromSearchCard',
				
				layout: 'form',//fit: dadurch fehlte die pagingBar der Tabelle (?!)
				border: false,
				
				items: [{
					xtype: 'panel',
					id: 'pCopyFromCiSearch',
					title: 'Select CI to copy',//languagestore.data.items[0].data['ciCopyFromViewTitle'],//
					
	//				anchor: '100%',
					border: false,
					
		            layout: 'table',//USE column oder hbox layout here!!
					layoutConfig: {
						columns: 3
					},
					
	//				padding: 5,
					
					items: [{
						xtype: 'textfield',
						id: 'tfCopyFromCiSearch',
						maskRe: /[\w\d\-+\/ ,&]/,
						border: false,
						
						enableKeyEvents: true,
						listeners: {
			                specialkey: function(field, e){
			                    if (e.getKey() == e.ENTER) {
			                    	var bCopyFromSearch = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('bCopyFromSearch');
			                    	bCopyFromSearch.fireEvent('click', bCopyFromSearch);
			                    }
			                }.createDelegate(this)
						},
						
						style: {
							width: 200,
							marginTop: 5
						}
					}, {
						xtype: 'button',
						id: 'bCopyFromSearch',
						text: 'Search',
						width: 50,
						
						style: {
							marginTop: 5,
							marginLeft: 5
						}
					}, {
						xtype: 'button',
						text: 'Next',
						id: 'bCopyFromNext',
						hidden: true,
						width: 50,
						
						style: {
							marginTop: 5,
							marginLeft: 5
						}
					}]
				},{
					xtype: 'AIR.CiResultGrid',//soll hier nur applications anzeigen
					id: 'CiSearchWizzardResultGrid',//load mask starten/stoppen
					anchor: '100%',
					ownerPrefix: 'ciCopyFromSearchGrid',
					hidden: true,
					
					style: {
						marginTop: 20
					}
				}]
			}, {
				id: 'CiCopyFromDetailView',
				xtype: 'AIR.CiCopyFromDetailView'
			}]
		});

		AIR.CiCopyFromView.superclass.initComponent.call(this);
		
		this.addEvents('appDetailLoaded', 'externalNavigation');
		
		var grid = this.getComponent('pCopyFromSearchCard').getComponent('CiSearchWizzardResultGrid');
		grid.on('rowclick', this.onRowClick, this);
		grid.on('rowdblclick', Ext.emptyFn);
		grid.getStore().on('beforeload', this.onGridBeforeLoaded , this);
		grid.getStore().on('load', this.onGridLoaded, this);
//		grid.getStore().baseParams.cwid = cwid;
//		grid.getStore().baseParams.token = token;
		
//		this.appDetailStore = AIR.AirStoreFactory.createAppDetailStore();
//		this.appDetailStore.on('load', this.onAppDetailLoaded, this);

		var bCopyFromSearch = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('bCopyFromSearch');
		bCopyFromSearch.on('click', this.onSearch, this);
		
		var bCopyFromNext = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('bCopyFromNext');
		bCopyFromNext.on('click', this.onNext, this);
		
		var ciCopyFromDetailView = this.getComponent('CiCopyFromDetailView');
		var bCopyFromBack = ciCopyFromDetailView.getComponent('pCopyFromDetailsSouthRegion').getComponent('bCopyFromBack');
		var bCopyFromCancel = ciCopyFromDetailView.getComponent('pCopyFromDetailsSouthRegion').getComponent('bCopyFromCancel');
		var bCopyFromCopy = ciCopyFromDetailView.getComponent('pCopyFromDetailsSouthRegion').getComponent('bCopyFromCopy');
		
		bCopyFromBack.on('click', this.onCopyFromBack, this);
		bCopyFromCancel.on('click', this.onCopyFromCancel, this);
		bCopyFromCopy.on('click', ciCopyFromDetailView.onCopyApplication, ciCopyFromDetailView);
		ciCopyFromDetailView.on('copyApplication', this.onCopyApplication, this);
		
		
		var pagingBar = grid.getBottomToolbar();
		var clExcelExport = pagingBar.getComponent('ciCopyFromSearchGrid_clExcelExport');
		clExcelExport.on('click', this.onExcelExport, this);
		
		var tfCopyFromCiSearch = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('tfCopyFromCiSearch');
		tfCopyFromCiSearch.on('keyup', this.onSearchChange, this);
	},
	
	onExcelExport: function(link, event) {
		var tfCopyFromCiSearch = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('tfCopyFromCiSearch');
//		var exportWindow = window.open('/AIR/excelexport?query='+tfCopyFromCiSearch.getValue()+'&cwid='+AIR.AirApplicationManager.getCwid()+'&searchPoint=Search');
		
		
		var exportForm = AIR.AirApplicationManager.getExportForm();//this.getComponent('ciSearchResultView').getComponent('exportForm').getEl().dom.children[0].children[0];//document.createElement('form');//
		
		exportForm.action = '/AIR/excelexport';
		exportForm.method = 'POST';
		exportForm.target = '_blank';
		
		//query searchPoint cwid: already rendered <hidden> fields!
		exportForm.query.value = tfCopyFromCiSearch.getValue();
		exportForm.searchAction.value = 'search';
		exportForm.cwid.value = AIR.AirApplicationManager.getCwid();
		
		exportForm.submit();
	},
	
	onSearch: function(button, event) {
		var bCopyFromNext = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('bCopyFromNext');
		bCopyFromNext.hide();
		
		this.query = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('tfCopyFromCiSearch').getValue().trim();

		if(this.query.length > 0) {
		    while(this.query.indexOf('*') > -1)
		    	this.query = this.query.replace('*', '%');
		    
		    while(this.query.indexOf('?') > -1)
		    	this.query = this.query.replace('?', '_');
		
	    
			var params = {
				start: 0,
				limit: 20,
				ciNameAliasQuery: this.query,//query
				queryMode: 'CONTAINS',
				searchAction: 'search',
				// Rückbau: alle Datentypen dürfen kopiert werden				
				isOnlyApplications: 'true',//onlyapplications
   			 	cwid: AIR.AirApplicationManager.getCwid(),
   			 	token: AIR.AirApplicationManager.getToken()
			};
			
			var grid = this.getComponent('pCopyFromSearchCard').getComponent('CiSearchWizzardResultGrid');
			
			grid.getStore().load({
				params: params
//				callback: function() {
//					grid.setVisible(true);
//					grid.updateHeight();
//				}
			});
			
//			delete params.start;
//			delete params.limit;
			grid.setPagingParams(params);
		}
	},
	
	onSearchChange: function() {
		var bCopyFromNext = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('bCopyFromNext');
		bCopyFromNext.hide();
	},
	
	onRowClick: function(grid, rowIndex, e) {
		var record = grid.getStore().getAt(rowIndex);
		this.ciId = record.data.id;//applicationId
		this.applicationName = record.data.name;
		this.applicationCat1 = record.data.applicationCat1Txt;
		this.applicationCat2 = record.data.applicationCat2Txt;
		this.tableId = record.data.tableId;
		
		var bCopyFromNext = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('bCopyFromNext');
		bCopyFromNext.show();
//		bCopyFromNext.enable();
	},
	
//	onAppDetailLoaded: function(store, records, options) {
//		var appDetail = records[0].data;
//		
//		var ciCreatePagesView = Ext.getCmp('ciCreatePagesView');
//		var ciCopyFromDetailView = /*this.findParentByType*/ciCreatePagesView.getComponent('CiCopyFromDetailView');		
//		ciCopyFromDetailView.update(appDetail.applicationName);
//		
//		ciCreatePagesView.getLayout().setActiveItem('CiCopyFromDetailView');
//	},
	
	onNext: function(button, event) {
//		var params = {
//			applicationId: this.ciId,
//			cwid: cwid,
//			token: token
//		};
//		
//		this.appDetailStore.load({
//			params: params
//		});
		
//		var ciCreatePagesView = Ext.getCmp('ciCreatePagesView');
//		var ciCopyFromDetailView = /*this.findParentByType*/ciCreatePagesView.getComponent('CiCopyFromDetailView');
//		ciCreatePagesView.getLayout().setActiveItem('CiCopyFromDetailView');
		
		var ciCopyFromDetailView = this.getComponent('CiCopyFromDetailView');
		ciCopyFromDetailView.update(this.applicationName, this.applicationCat1, this.applicationCat2, this.tableId);
		
		this.getLayout().setActiveItem(1);
	},
	
	onGridBeforeLoaded: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
	},
	
	onGridLoaded: function(store, records, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).hide();
		
		var grid = this.getComponent('pCopyFromSearchCard').getComponent('CiSearchWizzardResultGrid');
		grid.setVisible(true);
		grid.updateHeight();
	},
	
	onCopyApplication: function(data) {//appName, appAlias
		this.applicationNameNew = data.ciNameTarget;
		this.applicationAliasNew = data.ciAliasTarget;
		
		data.cwid = AIR.AirApplicationManager.getCwid();
		data.token = AIR.AirApplicationManager.getToken();
		data.ciIdSource = this.ciId;
		data.tableIdSource = this.tableId;// this.CI_TYPE_APPLICATION;
		
		var applicationByCopyStore = AIR.AirStoreFactory.createApplicationByCopyStore();
		applicationByCopyStore.on('load', this.onApplicationCopy, this);
		applicationByCopyStore.on('beforeload', this.onApplicationBeforeCopy, this);
		
		applicationByCopyStore.load({
			params: data
		});
	},
	
	onApplicationBeforeCopy: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_SAVE).show();
	},
	
	onApplicationCopy: function(store, records, options) {
		//eine gemeinsame Funktion mit CiCreateWizardPagesView::onApplicationCreate ?!
		
		AAM.getMask(AC.MASK_TYPE_SAVE).hide();
		
		switch(records[0].data.result) {
			case 'OK':
				AAM.setCiId(parseInt(records[0].data.applicationId));//applicationId!! id
//				AAM.setTableId(AC.TABLE_ID_APPLICATION); // nach unten verschoben
				
				var data = {
					name: this.applicationName,
					applicationCat1: this.applicationCat1,
					nameNew: this.applicationNameNew
				};
				this.fireEvent('airAction', this, 'appCopySuccess', data);
	
				var continueEditingCallback = function() {
					var grid = this.getComponent('pCopyFromSearchCard').getComponent('CiSearchWizzardResultGrid');
					var record = grid.getSelectionModel().getSelected();//grid.getStore().getAt(rowIndex);
					
//					var store = AIR.AirStoreManager.getStoreByName('ciTypeListStore');
//					var r = Util.getStoreRecord(store, 'text', record.get('applicationCat1Txt'));
//					var ciSubTypeId = r ? r.get('ciSubTypeId') : AC.APP_CAT1_APPLICATION;
					
					var options = {
//						tableId: record.get('tableId'),
//						ciSubTypeId: ciSubTypeId,//parseInt(record.get('applicationCat1Txt'))//applicationCat1Id
						reset: true
					};

					// Setze TableID aus dem Source-Object
					AAM.setTableId(parseInt(record.get('tableId')));

					this.fireEvent('externalNavigation', this, null, 'clCiDetails', options);
					
//					this.fireEvent('externalNavigation', this, null, 'clCiDetails');
				}.createDelegate(this);
				
				var createNewCiCallback = function() {					
					this.fireEvent('externalNavigation', this, null, 'clCiCreateWizard');//or clCiCreateCopyFrom: only reset all and switch card like back button
				}.createDelegate(this);
				
				var redirectToSearchCallback = function() {
					AAM.setCiId(-1);
					AAM.setTableId(-1);
					
					this.fireEvent('externalNavigation', this, null, 'clSearch');
				}.createDelegate(this);
	
				var callbackMap = {
					'continueEditing': continueEditingCallback,
					'createNewCi': createNewCiCallback,
					'redirectToSearch': redirectToSearchCallback
				};
				
				var afterSaveAppWindow = AIR.AirWindowFactory.createDynamicMessageWindow('AFTER_APP_SAVE', callbackMap);
				afterSaveAppWindow.show();
				break;
				
			case 'ERROR':
				var afterSaveAppFailWindow = AIR.AirWindowFactory.createDynamicMessageWindow('AFTER_APP_SAVE_FAIL', null, records[0].data.displayMessage);
				afterSaveAppFailWindow.show();
				break;
		}
	},
	
	isCopyFromDataValid: function() {
		//isValid
		var ciCreatePagesView = Ext.getCmp('ciCreatePagesView');
		var ciCopyFromDetailView = /*this.findParentByType*/ciCreatePagesView.getComponent('CiCopyFromDetailView');
		
		return ciCopyFromDetailView.isCopyFromDataValid();
	},
	
	onCopyFromBack: function(button, event) {
//		var ciCreatePagesView = Ext.getCmp('ciCreatePagesView');
//		ciCreatePagesView.getLayout().setActiveItem('CiCopyFromView');
		
		
		this.getLayout().setActiveItem(0);
	},

	onCopyFromCancel: function(button, event) {
		var verwerfenCallback = function() {
			this.fireEvent('externalNavigation', this, null, 'clSearch');
		}.createDelegate(this);			
		
		var callbackMap = {
			'yes': verwerfenCallback
		};
		
		var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CANCEL_CONFIRMATION', callbackMap);
		dynamicWindow.show();
	},
	
	reset: function() {
		this.getLayout().setActiveItem(0);
		
		var grid = this.getComponent('pCopyFromSearchCard').getComponent('CiSearchWizzardResultGrid');
		grid.getStore().removeAll();
		
		var bCopyFromNext = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('bCopyFromNext');
		bCopyFromNext.hide();
		
		var tfCopyFromCiSearch = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('tfCopyFromCiSearch');
		tfCopyFromCiSearch.reset();
	},
	
	updateLabels: function(labels) {
		this.setTitle(labels.ciCopyFromViewTitle);
		
		var bCopyFromSearch = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('bCopyFromSearch');
		var bCopyFromNext = this.getComponent('pCopyFromSearchCard').getComponent('pCopyFromCiSearch').getComponent('bCopyFromNext');
		bCopyFromSearch.setText(labels.button_general_search);
		bCopyFromNext.setText(labels.button_general_next);
		
		var grid = this.getComponent('pCopyFromSearchCard').getComponent('CiSearchWizzardResultGrid');
		grid.getColumnModel().setColumnHeader(0, labels.searchResultName);
		grid.getColumnModel().setColumnHeader(1, labels.searchResultAlias);
		grid.getColumnModel().setColumnHeader(2, labels.searchResultType);
		grid.getColumnModel().setColumnHeader(3, labels.searchResultCategory);
		grid.getColumnModel().setColumnHeader(4, labels.searchResultAppOwner);
		grid.getColumnModel().setColumnHeader(5, labels.searchResultAppOwnerDelegate);
		grid.getColumnModel().setColumnHeader(6, labels.searchResultAppSteward);
		grid.getColumnModel().setColumnHeader(7, labels.applicationManager);
		grid.getColumnModel().setColumnHeader(8, labels.applicationManagerDelegate);
		
		var ciCopyFromDetailView = this.getComponent('CiCopyFromDetailView');
		ciCopyFromDetailView.updateLabels(labels);
	}
	
	
//    afterRender: function() {
//    	AIR.CiCopyFromView.superclass.afterRender.call(this);
//    	
//		
//		var ciCreatePagesView = Ext.getCmp('ciCreatePagesView');
//		var ciCopyFromDetailView = /*this.findParentByType*/ciCreatePagesView.getComponent('CiCopyFromDetailView');
//		ciCopyFromDetailView.on('copyApplication', this.onCopyApplication, this);
//		
//		var bCopyFromBack = ciCopyFromDetailView.getComponent('pCopyFromDetailsSouthRegion').getComponent('bCopyFromBack');
//		var bCopyFromCancel = ciCopyFromDetailView.getComponent('pCopyFromDetailsSouthRegion').getComponent('bCopyFromCancel');
//		
//		bCopyFromBack.on('click', this.onCopyFromBack, this);
//		bCopyFromCancel.on('click', this.onCopyFromCancel, this);
//    }
	
/*
	onKeyUp: function(textField, event) {
		var searchString = textField.getValue();
		if(searchString.length < 3)
			return;
			
		var task = new Ext.util.DelayedTask(function() {
			var params = {
				start: 0,
				limit: 20,
				query: searchString,
				queryMode: 'CONTAINS',
				searchAction: 'search',
				cwid: cwid,
				token: token
			};
			
			var grid = this.getComponent('pCopyFromSearchCard').getComponent('CiSearchWizzardResultGrid');
			
			grid.getStore().load({
				params: params
			});
		});
		task.delay(500);
	}
	
//		this.fireEvent('appDetailLoaded', appDetail);
		
		//ersatzweise wizardStepOnePanel holen und dessen Felder (oder nur ein Feld zum Testen) setzen.
//		var wizardStepOnePanel = Ext.getCmp('wizardStepOneView');
//		var tfWizardApplicationName = wizardStepOnePanel.getComponent('wizardApplicationName');
//		tfWizardApplicationName.setValue(appDetail.applicationName);
 */
});
Ext.reg('AIR.CiCopyFromView', AIR.CiCopyFromView);