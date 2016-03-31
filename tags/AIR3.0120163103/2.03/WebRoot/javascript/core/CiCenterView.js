Ext.namespace('AIR');

AIR.CiCenterView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'card',
		    activeItem: 2,
		    border: false,
		    items: [{
				xtype: 'AIR.MyPlaceView',
				id: 'myPlaceView'
			},{
				xtype: 'AIR.MyPlaceHomeView',
				id: 'myPlaceHomeView'
			},{
	        	xtype: 'AIR.CiSearchView',
	        	id: 'ciSearchView'
			},{
	        	xtype: 'AIR.CiEditView',
	        	id: 'ciEditView'
			},{
	        	xtype: 'AIR.CiCreateView',
	        	id: 'ciCreateView'
			},{
	        	xtype: 'AIR.CiAssetManagementView',
	        	id: 'ciAssetManagementView'
			},{
	        	xtype: 'AIR.CiNewAssetView',
	        	id: 'ciNewAssetView'
			},{
	        	xtype: 'AIR.CiNewSoftwareAsset',
	        	id: 'ciNewSoftwareAsset'
			},{
				xtype: 'AIR.CiNewHardwareAsset',
				id: 'ciNewHardwareAsset'
			},{
				xtype: 'form',
				id: 'exportForm',
				border: false,
				
				//Important: h prefix for all hidden fields where the id corresponds the fields of CiAdvancedSearchView to avoid duplicate ExtJS Component field IDs
				items: [{
					xtype: 'hidden',
					id: 'hciNameAliasQuery'//query
				},{
					xtype: 'hidden',
					id: 'cwid'
				},{
					xtype: 'hidden',
					id: 'token'
				},{
					xtype: 'hidden',
					id: 'start'
				},{
					xtype: 'hidden',
					id: 'limit'
				},{
					xtype: 'hidden',
					id: 'searchAction'//searchPoint
				},{
					xtype: 'hidden',
					id: 'sort'
				},{
					xtype: 'hidden',
					id: 'dir'
				},{
					xtype: 'hidden',
					id: 'isOnlyApplications'//onlyapplications
				},{
					xtype: 'hidden',
					id: 'query'
				},{
					xtype: 'hidden',
					id: 'queryMode'
				},{
					xtype: 'hidden',
					id: 'isAdvancedSearch'//advancedsearch
				},{
					xtype: 'hidden',
					id: 'hdescription'//hadvsearchdescription
				},{
					xtype: 'hidden',
					id: 'hciTypeId'//htableId hadvsearchObjectTypeId
				},{
					xtype: 'hidden',
					id: 'hciSubTypeId'
				}/*,{
					xtype: 'hidden',
					id: 'hadvsearchObjectTypeText'
				}*/,{
					xtype: 'hidden',
					id: 'happOwner'//hadvsearchappowner
				},{
					xtype: 'hidden',
					id: 'happOwnerHidden'//hadvsearchappownerHidden
				},{
					xtype: 'hidden',
					id: 'happOwnerDelegate'//hadvsearchappdelegate
				},{
					xtype: 'hidden',
					id: 'happOwnerDelegateHidden'//hadvsearchappdelegateHidden
				},{
					xtype: 'hidden',
					id: 'happSteward'//hadvsearchsteward
				},{
					xtype: 'hidden',
					id: 'happStewardHidden'//hadvsearchstewardHidden
				},{
					xtype: 'hidden',
					id: 'hciOwner'//hadvsearchciowner
				},{
					xtype: 'hidden',
					id: 'hciOwnerHidden'//hadvsearchciownerHidden
				},{
					xtype: 'hidden',
					id: 'hciOwnerDelegate'//hadvsearchcidelegate
				},{
					xtype: 'hidden',
					id: 'hciOwnerDelegateHidden'//hadvsearchcidelegateHidden
				},{
					xtype: 'hidden',
					id: 'hoperationalStatusId'//hadvsearchoperationalStatusid
				},{
					xtype: 'hidden',
					id: 'happlicationCat2Id'//hadvsearchoperationalStatusid
				},{
					xtype: 'hidden',
					id: 'hlifecycleStatusId'//hadvsearchoperationalStatusid
				},{
					xtype: 'hidden',
					id: 'hprocessId'//hadvsearchoperationalStatusid
				},{
					xtype: 'hidden',
					id: 'hbarRelevance'
				},{
					xtype: 'hidden',
					id: 'horganisationalScope'
				},{
					xtype: 'hidden',
					id: 'hitSetId'
				},{
					xtype: 'hidden',
					id: 'hitSecGroupId'
				},{
					xtype: 'hidden',
					id: 'hsource'
				},{
					xtype: 'hidden',
					id: 'hbusinessEssentialId'
				},{
					xtype: 'hidden',
					id: 'houCiType'
				},{
					xtype: 'hidden',
					id: 'houUnit'
				},{
					xtype: 'hidden',
					id: 'hciOwnerType'
				},{
					xtype: 'hidden',
					id: 'houQueryMode'
				},
				//vandana C0000049066
				{
					xtype: 'hidden',
					id: 'manufacturer'
				},{
					xtype: 'hidden',
					id: 'subCategory'
				},{
					xtype: 'hidden',
					id: 'type'
				},{
					xtype: 'hidden',
					id: 'model'
				},{
					xtype: 'hidden',
					id: 'sapDescription'
				},
				{
					xtype: 'hidden',
					id: 'multipleasset'
				},
				//C0000049066
				// C0000049066 - Start by anit
				{
					xtype: 'hidden',
					id: 'pspElement'
				},
				{
					xtype: 'hidden',
					id: 'costCenter'
				},
				{
					xtype: 'hidden',
					id: 'serialNumber'
				},
				{
					xtype: 'hidden',
					id: 'technicalMaster'
				},
				{   
					xtype: 'hidden',
					id: 'technicalNumber'
				},
				{   
					xtype: 'hidden',
					id: 'inventorynumber'
				},
				{   
					xtype: 'hidden',
					id: 'organisation'
				},
				{   
					xtype: 'hidden',
					id: 'country'
				},
				{
					xtype: 'hidden',
					id: 'site'
				},
				{
					xtype: 'hidden',
					id: 'building'
				},
				{
					xtype: 'hidden',
					id: 'room'
				},
				{
					xtype: 'hidden',
					id: 'rackPosition'
				},
				{
					xtype: 'hidden',
					id: 'generateDCFlag'
				},
				{
					xtype: 'hidden',
					id: 'selectedHwAssets'
				},
				{
					xtype: 'hidden',
					id: 'language'
				},
				{
					xtype: 'hidden',
					id: 'orderNumber'
				},
				{
					xtype: 'hidden',
					id: 'companyCode'
				},
				{
					xtype: 'hidden',
					id: 'companyName'
				}
				// C0000049066 - End by anit   
				]
			}]
		});
		
		AIR.CiCenterView.superclass.initComponent.call(this);
	},
	
	onNavigation: function(viewId, link, options) {//callback, options
		var myPlaceView = this.getComponent('myPlaceView');
		var myPlaceHomeView = this.getComponent('myPlaceHomeView');
		var ciSearchView = this.getComponent('ciSearchView');
		
		var ciCreateView = this.getComponent('ciCreateView');
		var ciCreateWizardPagesView = ciCreateView.getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView');
		
		//RFC 8271 - Wizard for Mandatory and/or Required Fields
		var ciCreatePagesView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView');
		var ciCreateWizardView = ciCreatePagesView.getComponent('ciCreateWizardView');
		//RFC 8271 - Wizard for Mandatory and/or Required Fields

		var ciEditView = this.getComponent('ciEditView');
		
		var ciNewAssetView=this.getComponent('ciNewAssetView');
		var clCiProduct = ciNewAssetView.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product');
		var clCiLocation = ciNewAssetView.getComponent('bottomPanel').getComponent('rightPanel').getComponent('location');
		var clCiTechnics = ciNewAssetView.getComponent('bottomPanel').getComponent('leftPanel').getComponent('technics');
		var clCiBusinessInformation = ciNewAssetView.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation');
		var clCiContacts = ciNewAssetView.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts');
		
		var ciNewSoftwareAsset=this.getComponent('ciNewSoftwareAsset');
		var clSoftwareProduct = ciNewSoftwareAsset.getComponent('bottomPanel').getComponent('leftPanel').getComponent('product');
		var clSoftwareBusinessInformation = ciNewSoftwareAsset.getComponent('bottomPanel').getComponent('rightPanel').getComponent('businessInformation');
		var clSoftwareContacts = ciNewSoftwareAsset.getComponent('bottomPanel').getComponent('leftPanel').getComponent('contacts');
		
		this.lastNavigation = {
			viewId: viewId,
			link: link,
			options: options
		};

		
		switch(viewId) {
			case 'clMyPlace':

				var verwerfenCallback = function() {
					if(ciEditView)
						ciEditView.ciModified = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;
					
					this.getLayout().setActiveItem('myPlaceHomeView');
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.onSaveApplication();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				
				break;
			case 'clMyPlaceMyCIs':
				var verwerfenCallback = function() {
					
					if(ciEditView)
						ciEditView.ciModified = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;
					
					this.getLayout().setActiveItem('myPlaceView');
					var myPlaceTabView = this.getComponent('myPlaceView').getComponent('myPlaceTabView');
					myPlaceTabView.getLayout().setActiveItem('card-mycis');
					
					myPlaceView.update(viewId);
					myPlaceView.updateLabels(AIR.AirApplicationManager.getLabels());
					
					myPlaceTabView.loadMyOwnCIsGrid('myCis');
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.onSaveApplication();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);

				break;
			case 'clMyPlaceMyCIsDelegate':
				var verwerfenCallback = function() {
					
					if(ciEditView)
						ciEditView.ciModified = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;

					this.getLayout().setActiveItem('myPlaceView');
					var myPlaceTabView = this.getComponent('myPlaceView').getComponent('myPlaceTabView');
					myPlaceTabView.getLayout().setActiveItem('card-myapps');
					
					myPlaceView.update(viewId);
					myPlaceView.updateLabels(AIR.AirApplicationManager.getLabels());
					
					myPlaceTabView.loadDelegateCIsGrid('myCisSubstitute');
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.onSaveApplication();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				
				break;
			case 'clSearch':
				var verwerfenCallback = function() {
					ciSearchView.setAdvSearch(false);
					
					if(ciEditView)
						ciEditView.ciModified = false;

					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;

					this.getLayout().setActiveItem('ciSearchView');
					
					ciSearchView.handleSearch(link);
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.onSaveApplication();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);

				break;
			case 'clAdvancedSearch':
				var verwerfenCallback = function() {
					if(ciEditView)
						ciEditView.ciModified = false;

					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;
					
					this.getLayout().setActiveItem('ciSearchView');
					
					ciSearchView.handleUiAdvancedSearch(link);
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.onSaveApplication();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
			
				break;
			case 'clOuSearch':
				var verwerfenCallback = function() {
					if(ciEditView)
						ciEditView.ciModified = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;
					
					this.getLayout().setActiveItem('ciSearchView');
					
					ciSearchView.handleUiOuSearch(link);
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
			
			var saveCallback = function() {
				verwerfenCallback();
				if(ciEditView)
					ciEditView.onSaveApplication();
			}.createDelegate(this);

			this.handleNavigation(verwerfenCallback, saveCallback);
				break;
			case 'clCiCreate':
				var verwerfenCallback = function() {
					this.getLayout().setActiveItem('ciCreateView');
					if(ciEditView)
						ciEditView.ciModified = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;

					var ciCreatePagesView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView');//Ext.getCmp('ciCreatePagesView');//CiCreationCardPanel
					ciCreatePagesView.getLayout().setActiveItem('CiCreateInfoView');
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.onSaveApplication();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
								
				break;
			case 'clCiCreateWizard':
				var verwerfenCallback = function() {
					this.getLayout().setActiveItem('ciCreateView');
					
					if(ciEditView)
						ciEditView.ciModified = false;
					
					//RFC 8271 - Wizard for Mandatory and/or Required Fields
					if(ciCreateWizardView) {
						ciCreatePagesView.getLayout().setActiveItem('ciCreateWizardView');
						ciCreateWizardView.reset();
						
						if(options && options.callback)
							options.callback();
					}
					//RFC 8271 - Wizard for Mandatory and/or Required Fields
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.onSaveApplication();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				
				break;
			case 'clCiCreateCopyFrom':
				var verwerfenCallback = function() {
					this.getLayout().setActiveItem('ciCreateView');
					
					if(ciEditView)
						ciEditView.ciModified = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;

					var ciCreatePagesView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView');
					ciCreatePagesView.getLayout().setActiveItem('CiCopyFromView');
					
					var ciCopyFromView = ciCreatePagesView.getComponent('CiCopyFromView');
					ciCopyFromView.reset();

					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.onSaveApplication();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				
				break;
			case 'clCiDelete':
				var verwerfenCallback = function() {
					this.getLayout().setActiveItem('ciCreateView');
					
					if(ciEditView)
						ciEditView.ciModified = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;

					var ciCreatePagesView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView');
					ciCreatePagesView.getLayout().setActiveItem('ciDeleteView');
					
					
					var ciDeleteView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciDeleteView');
					ciDeleteView.loadDeleteGrid();
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.onSaveApplication();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				
				break;
			case 'clCiDetails':
			case 'clCiSpecifics':
			case 'clCiContacts':
			case 'clCiAgreements':
			case 'clCiProtection':
			case 'clCiCompliance':
			case 'clCiLicense':
			case 'clCiSpecialAttributes':
			case 'clCiConnections':
			case 'clCiSupportStuff':
			case 'clCiHistory':
				
				if(ciCreateWizardView)
					ciCreateWizardView.wizardStarted = false;
				
				this.forwardNavigation(options);
				break;
			
			case 'clAssetManagement':
				var verwerfenCallback = function() {
				this.getLayout().setActiveItem('ciAssetManagementView');
				if(ciEditView)
					ciEditView.ciModified = false;
				if(ciCreateWizardView)
					ciCreateWizardView.wizardStarted = false;
					if(options && options.callback)
						options.callback();
					}.createDelegate(this);
				var saveCallback = function() {
						verwerfenCallback();
					}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
					break;
				
			case 'clCiIntangibleAsset':
				
				var verwerfenCallback = function() {
				this.getLayout().setActiveItem('ciNewSoftwareAsset');
				if(ciEditView)
					ciEditView.ciModified = false;
				if(ciCreateWizardView)
					ciCreateWizardView.wizardStarted = false;
				clSoftwareProduct.setVisible(true);
				clSoftwareBusinessInformation.setVisible(true);
				clSoftwareContacts.setVisible(false);
				clSoftwareBusinessInformation.getComponent('cbSapAsset').store = AIR.AirStoreManager.getStoreByName('sapAssetSoftwareListStore');

				AAM.setComponentType("software");
				ciNewSoftwareAsset.resetFormFields(null);				
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				var saveCallback = function() {
					verwerfenCallback();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				if(AAM.getAssetId()){
					this.forwardToEdit(AAM.getAssetId());
				}
				break;
					
			case 'clCiTangibleAsset':				
				var verwerfenCallback = function() {
				this.getLayout().setActiveItem('ciNewHardwareAsset');
				if(ciEditView)
					ciEditView.ciModified = false;
				if(ciCreateWizardView)
					ciCreateWizardView.wizardStarted = false;
				var ciNewHardwareAsset = this.getComponent('ciNewHardwareAsset');
				ciNewHardwareAsset.updateLabels(AIR.AirApplicationManager.getLabels());				
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				var saveCallback = function() {
					verwerfenCallback();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
					break;
					
			case 'clCiAssetwithInventory':

				var verwerfenCallback = function() {
				this.getLayout().setActiveItem('ciNewAssetView');
				if(ciEditView)
					ciEditView.ciModified = false;
				if(ciCreateWizardView)
					ciCreateWizardView.wizardStarted = false;
				clCiProduct.setVisible(true);
				clCiLocation.setVisible(true);
				clCiBusinessInformation.setVisible(true);
				clCiTechnics.setVisible(true);
				clCiContacts.setVisible(false);
				clCiBusinessInformation.getComponent('cbSapAsset').store = AIR.AirStoreManager.getStoreByName('sapAssetListStore');
				AAM.setComponentType("hardware");
				
				ciNewAssetView.getComponent('assetPanelHeader').setText("Asset Management - Hardware Asset - Asset with Inventory").setVisible(true);
				ciNewAssetView.resetFormFields(null);
					if(options && options.callback)
						options.callback();
					}.createDelegate(this);
					var saveCallback = function() {
						verwerfenCallback();
					}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				if(AAM.getAssetId()){
					this.forwardToEdit(AAM.getAssetId());
				}
				// Added by enqmu
				var cbSubCategoryValue = clCiProduct.getComponent('cbSubCategory').getRawValue();
				var btnDCName = clCiTechnics.getComponent('pSystemPlatform').getComponent('dcName');
		        if(cbSubCategoryValue == 'Server')
				{
					btnDCName.disabled = false;
					Ext.Msg.alert('Message', 'Press DC Name button to auto generate DC numbers otherwise it will not be generated.');
				}
		        // end
					break;	
					
			case 'clCiAssetwithoutInventory':
				var verwerfenCallback = function() {
				this.getLayout().setActiveItem('ciNewAssetView');
				if(ciEditView)
					ciEditView.ciModified = false;
				if(ciCreateWizardView)
					ciCreateWizardView.wizardStarted = false;
				clCiProduct.setVisible(true);
				clCiLocation.setVisible(true);
				clCiBusinessInformation.setVisible(true);
				clCiTechnics.setVisible(true);
				clCiContacts.setVisible(false);
				clCiBusinessInformation.getComponent('cbSapAsset').store = AIR.AirStoreManager.getStoreByName('sapAssetListStore');
				AAM.setComponentType("hardware");
				
				ciNewAssetView.getComponent('assetPanelHeader').setText("Asset Management - Hardware Asset - Asset without Inventory").setVisible(true);
				ciNewAssetView.resetFormFields(null);
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				var saveCallback = function() {
					verwerfenCallback();
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				if(AAM.getAssetId()){
					this.forwardToEdit(AAM.getAssetId());
				}
				// Added by enqmu
				var cbSubCategoryValue = clCiProduct.getComponent('cbSubCategory').getRawValue();
				var btnDCName = clCiTechnics.getComponent('pSystemPlatform').getComponent('dcName');
		        if(cbSubCategoryValue == 'Server')
				{
					btnDCName.disabled = false;
					Ext.Msg.alert('Message', 'Press DC Name button to auto generate DC numbers otherwise it will not be generated.');
				}
				// end
					break;	
			default: break;
		}
	},
	
	onCiEditTabViewAdded: function(ct) {
		AIR.AirApplicationManager.registerCiEditView(this);
		this.forwardNavigation();
	},
	
	forwardToEdit: function(assetId){
		var ciDetailStore = AIR.AirStoreFactory.createAssetListStore();
		ciDetailStore.on('beforeload', this.onBeforeAssetLoad, this);
		ciDetailStore.on('load', this.onAssetLoad, this);
		ciDetailStore.load({
			params: {
				assetId: assetId,
				queryMode: AAM.getComponentType()
			}
		});
		AAM.setAssetId(null);
	},
	
	onBeforeAssetLoad: function(store, options) {
		AAM.getMask(AC.MASK_TYPE_LOAD).show();
	},
	
	onAssetLoad: function(store, records, options) {
		if(records[0]!=undefined){
			var assetData = records[0].data;
			var isSoftwareComponent = (assetData.isSoftwareComponent === 'true');
			var assetView;
			if(isSoftwareComponent){
				assetView = this.getComponent('ciNewSoftwareAsset');
			} else {
				assetView = this.getComponent('ciNewAssetView');
			}
			assetView.update(assetData);
		}
	},
	
	forwardNavigation: function(options) {
		var ciEditView = this.getComponent('ciEditView');
		
		if(this.lastNavigation.options && this.lastNavigation.options.reset)
			ciEditView.reset();
						
		this.getLayout().setActiveItem('ciEditView');
		ciEditView.onNavigation(this.lastNavigation.viewId, this.lastNavigation.link, options);
		
		
		if(this.lastNavigation.options && this.lastNavigation.options.callback) {// && !this.isInitialNavigation
//			this.isInitialNavigation = true;
			this.lastNavigation.options.callback();
		}
	},
	
	handleNavigation: function(callback, saveCallback) {
		var ciEditView = this.getComponent('ciEditView');//.getComponent('ciEditTabView');
		
		//RFC 8271 - Wizard for Mandatory and/or Required Fields
		var ciCreateWizardView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciCreateWizardView');
		//RFC 8271 - Wizard for Mandatory and/or Required Fields
		
		if(ciEditView && ciEditView.isCiModified()) {
			var isCiInvalid = ACM.getRequiredFields(AIR.AirApplicationManager.getAppDetail()).length > 0;
			var options = {
				isCiInvalid: isCiInvalid
			};
			
			var callbackMap = {
				verwerfen: callback,
				speichern: saveCallback//ciEditView.saveApplication.createDelegate(ciEditView)
			};
			
			var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_CHANGED', callbackMap, null, null, options);
			dynamicWindow.show();
			 
		} else if(ciCreateWizardView && ciCreateWizardView.isWizardStarted()) {
			var callbackMap = {
				yes: callback
			};
			
			var dynamicYesNoWindow = AIR.AirWindowFactory.createDynamicMessageWindow('CANCEL_WIZARD', callbackMap, null, null);
			dynamicYesNoWindow.show();
		} else {
			callback();
		}
	},
	
	checkDataChanged: function(callbackMap) {
		var dataChanged = false;
			
		if (showCiDetailDataChanged) {
			dataChanged = true;
			
			var dynamicWindow = AIR.AirWindowFactory.createDynamicMessageWindow('DATA_CHANGED', callbackMap);
			dynamicWindow.show();
		}
		
		return dataChanged;
	},
	
	updateLabels: function(labels) {
		var myPlaceView = this.getComponent('myPlaceView');
		myPlaceView.updateLabels(labels);
		
		var myPlaceTabView = this.getComponent('myPlaceView').getComponent('myPlaceTabView');
		myPlaceTabView.updateLabels(labels);
		
		var myPlaceHomeView = this.getComponent('myPlaceHomeView');
		myPlaceHomeView.updateLabels(labels);
		
		var ciSearchView = this.getComponent('ciSearchView');
		ciSearchView.updateLabels(labels);
		
		var ciEditView = this.getComponent('ciEditView');
		ciEditView.updateLabels(labels);
		
		var ciCreateView = this.getComponent('ciCreateView');
		ciCreateView.updateLabels(labels);
		
		var ciAssetManagementView = this.getComponent('ciAssetManagementView');
		ciAssetManagementView.updateLabels(labels);
		
		var ciNewAssetView = this.getComponent('ciNewAssetView');
		ciNewAssetView.updateLabels(labels);
		
		var ciNewSoftwareAsset = this.getComponent('ciNewSoftwareAsset');
		ciNewSoftwareAsset.updateLabels(labels);
		
		var ciNewHardwareAsset = this.getComponent('ciNewHardwareAsset');
		ciNewHardwareAsset.updateLabels(labels);
		
	},
	
	updateToolTips: function(toolTips) {
		var ciSearchView = this.getComponent('ciSearchView');
		ciSearchView.updateToolTips(toolTips);
		
		var ciEditView = this.getComponent('ciEditView');
		ciEditView.updateToolTips(toolTips);
		
		var ciCreateView = this.getComponent('ciCreateView');
		ciCreateView.updateToolTips(toolTips);
	}
	
});
Ext.reg('AIR.CiCenterView', AIR.CiCenterView);