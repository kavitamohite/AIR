Ext.namespace('AIR');

AIR.CiCenterView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
		    layout: 'card',
		    activeItem: 2,
		    border: false,
		    
//		    deferredRender: false,
//		    autoScroll: true,
//		    baseCls: 'x-box',//round coerners
		    
//		    bodyStyle: {//style: kein Effekt
////		    	borderTopLeftRadius: '100px 100px;'
//		    	background: 'url("images/arrondissement_left.jpg") no-repeat top left;'
//		    },
		    
//		    bodyStyle: {
//		    	border-top-left-radius:     1em 5em;  
//		    	border-top-right-radius:    1em 5em;  
//		    },
//		    cls: 'roundCorners',
		    

			/*
		    bodyStyle: {
	    		borderRadius: '30px 30px 0px 0px'
//	    		backgroundColor: '#12638e'
	    	},*/
		    
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
			},
			{
				xtype: 'form',
				id: 'exportForm',
				//hidden: true,
				border: false,
				
				//Important: h prefix for all hidden fields where the id corresponds the fields of CiAdvancedSearchView
				items: [{
					xtype: 'hidden',
					id: 'query'
				},{
					xtype: 'hidden',
					id: 'cwid'
				},{
					xtype: 'hidden',
					id: 'searchAction'//searchPoint
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
					id: 'onlyapplications'
				},{
					xtype: 'hidden',
					id: 'queryMode'
				},{
					xtype: 'hidden',
					id: 'advancedsearch'
				},{
					xtype: 'hidden',
					id: 'hadvsearchdescription'
				},{
					xtype: 'hidden',
					id: 'hadvsearchObjectTypeId'
				}/*,{
					xtype: 'hidden',
					id: 'hadvsearchObjectTypeText'
				}*/,{
					xtype: 'hidden',
					id: 'hadvsearchappowner'
				},{
					xtype: 'hidden',
					id: 'hadvsearchappownerHidden'
				},{
					xtype: 'hidden',
					id: 'hadvsearchappdelegate'
				},{
					xtype: 'hidden',
					id: 'hadvsearchappdelegateHidden'
				},{
					xtype: 'hidden',
					id: 'hadvsearchsteward'
				},{
					xtype: 'hidden',
					id: 'hadvsearchstewardHidden'
				},{
					xtype: 'hidden',
					id: 'hadvsearchciowner'
				},{
					xtype: 'hidden',
					id: 'hadvsearchciownerHidden'
				},{
					xtype: 'hidden',
					id: 'hadvsearchcidelegate'
				},{
					xtype: 'hidden',
					id: 'hadvsearchcidelegateHidden'
				},{
					xtype: 'hidden',
					id: 'hadvsearchoperationalStatusid'
				},{
					xtype: 'hidden',
					id: 'hadvsearchapplicationcat2id'
				},{
					xtype: 'hidden',
					id: 'hadvsearchlifecyclestatusid'
				},{
					xtype: 'hidden',
					id: 'hadvsearchprocessid'
				},
				
				
				{
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
				},
				
				
				{
					xtype: 'hidden',
					id: 'hciType'
				},{
					xtype: 'hidden',
					id: 'houUnit'
				},{
					xtype: 'hidden',
					id: 'hciOwnerType'
				},{
					xtype: 'hidden',
					id: 'houQueryMode'
				}]
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
		
		this.lastNavigation = {
			viewId: viewId,
			link: link,
			options: options
		};

		
		switch(viewId) {
			case 'clMyPlace':
//			    var ciSearchResultView = Ext.getCmp('ciSearchResultView');
//			    ciSearchResultView.setVisible(false);

				var verwerfenCallback = function() {
					if(ciEditView)
						ciEditView.ciModified = false;
//					if(ciCreateWizardPagesView)
//						ciCreateWizardPagesView.wizardStarted = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;
					
					this.getLayout().setActiveItem('myPlaceHomeView');
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.saveApplication({ skipLoading: true });
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				
				break;
			case 'clMyPlaceMyCIs':
				var verwerfenCallback = function() {
//					searchAction = 'myCis';
					
					if(ciEditView)
						ciEditView.ciModified = false;
//					if(ciCreateWizardPagesView)
//						ciCreateWizardPagesView.wizardStarted = false;
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
						ciEditView.saveApplication({ skipLoading: true });
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);

				break;
			case 'clMyPlaceMyCIsDelegate':
				var verwerfenCallback = function() {
//					searchAction = 'myCisSubstitute';
					
					if(ciEditView)
						ciEditView.ciModified = false;
//					if(ciCreateWizardPagesView)
//						ciCreateWizardPagesView.wizardStarted = false;
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
						ciEditView.saveApplication({ skipLoading: true });
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
						ciEditView.saveApplication({ skipLoading: true });
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
						ciEditView.saveApplication({ skipLoading: true });
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
			
				break;
			case 'clOuSearch':
				var verwerfenCallback = function() {
					if(ciEditView)
						ciEditView.ciModified = false;
//					if(ciCreateWizardPagesView)
//						ciCreateWizardPagesView.wizardStarted = false;
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
					ciEditView.saveApplication({ skipLoading: true });
			}.createDelegate(this);

			this.handleNavigation(verwerfenCallback, saveCallback);
				break;
			case 'clCiCreate':
				var verwerfenCallback = function() {
					this.getLayout().setActiveItem('ciCreateView');
					if(ciEditView)
						ciEditView.ciModified = false;
//					if(ciCreateWizardPagesView)
//						ciCreateWizardPagesView.wizardStarted = false;
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
						ciEditView.saveApplication({ skipLoading: true });
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
								
				break;
			case 'clCiCreateWizard':
				var verwerfenCallback = function() {
					this.getLayout().setActiveItem('ciCreateView');
					
					if(ciEditView)
						ciEditView.ciModified = false;
//					if(ciCreateWizardPagesView) {
//						ciCreateWizardPagesView.wizardStarted = false;
//					
//						var ciCreatePagesView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView');//Ext.getCmp('ciCreatePagesView');//CiCreationCardPanel
//						ciCreatePagesView.getLayout().setActiveItem('ciCreateWizardPagesView');
//						
//						//notwendig, wenn Wizard info/start Seite durch skipWizard user option ausgeschaltet wurde. Alternative: skipWizard auswerten und evtl. wizard hier nicht starten 
//						ciCreatePagesView.getComponent('ciCreateWizardPagesView').wizardStart(false);
//						
//						if(options && options.callback)
//							options.callback();
//					}
					
					//RFC 8271 - Wizard for Mandatory and/or Required Fields
					if(ciCreateWizardView) {
						ciCreatePagesView.getLayout().setActiveItem('ciCreateWizardView');
						ciCreateWizardView.reset();
						
						//if(options && options.wizardStarted !== undefined)
							//ciCreateWizardView.wizardStarted = options.wizardStarted;
						
						//ciCreateWizardView.wizardStarted = false;
//						ciCreatePagesView.wizardStarted = false;
						
						if(options && options.callback)
							options.callback();
					}
					//RFC 8271 - Wizard for Mandatory and/or Required Fields
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.saveApplication({ skipLoading: true });
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				
				break;
			case 'clCiCreateCopyFrom':
				var verwerfenCallback = function() {
					this.getLayout().setActiveItem('ciCreateView');
					
					if(ciEditView)
						ciEditView.ciModified = false;
//					if(ciCreateWizardPagesView)
//						ciCreateWizardPagesView.wizardStarted = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;

					var ciCreatePagesView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView');
					ciCreatePagesView.getLayout().setActiveItem('CiCopyFromView');
					
					var ciCopyFromView = ciCreatePagesView.getComponent('CiCopyFromView');
					ciCopyFromView.reset();
//					ciCopyFromView.getLayout().setActiveItem(0);

					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.saveApplication({ skipLoading: true });
				}.createDelegate(this);

				this.handleNavigation(verwerfenCallback, saveCallback);
				
				break;
			case 'clCiDelete':
				var verwerfenCallback = function() {
					this.getLayout().setActiveItem('ciCreateView');
					
					if(ciEditView)
						ciEditView.ciModified = false;
//					if(ciCreateWizardPagesView)
//						ciCreateWizardPagesView.wizardStarted = false;
					if(ciCreateWizardView)
						ciCreateWizardView.wizardStarted = false;

					var ciCreatePagesView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView');//Ext.getCmp('ciCreatePagesView');//CiCreationCardPanel
					ciCreatePagesView.getLayout().setActiveItem('ciDeleteView');
					
					
					var ciDeleteView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciDeleteView');
					ciDeleteView.loadDeleteGrid();
					
					if(options && options.callback)
						options.callback();
				}.createDelegate(this);
				
				var saveCallback = function() {
					verwerfenCallback();
					if(ciEditView)
						ciEditView.saveApplication({ skipLoading: true });
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
			case 'clCiConnections':
			case 'clCiSupportStuff':
			case 'clCiHistory':
				
				AAM.updateCookie({
					navigation: viewId,
					ciId: AAM.getCiId(),
					tableId: AAM.getTableId()
				});

				
				//A)
//				if(ciEditView)
//					ciEditView.onNavigation(viewId, link);
				
				//B)
				if(ciEditView) {
					this.forwardNavigation(options);
				} else {
					ciEditView = new AIR.CiEditView({ id: 'ciEditView' });
//					var v = ciEditView.getComponent('clCiHistory');
					ciEditView.getComponent('clCiHistory').on('afterlayout', this.onCiEditTabViewAdded, this);//ciEditView afterrender .getComponent('clCiCompliance')
//					ciEditView.on('afterlayout', this.onCiEditTabViewAdded, this);//ciEditView afterrender .getComponent('clCiCompliance')
//					
//					for(var i = 0; i < ciEditView.items.items.length; i++)
//						ciEditView.items.items[i].on('afterlayout', this.onCiEditTabViewAdded, this);
					
					//ciEditView.add(ciEditTabView);
					ciEditView.doLayout(true, true);
				}
				
				break;
			
			default: break;
		}
	},
	
	onCiEditTabViewAdded: function(ct) {
//		Util.log(ct.getId());
//		alert(ct.getId());
		
		AIR.AirApplicationManager.registerCiEditView(this);
		this.forwardNavigation();
	},
	
	forwardNavigation: function(options) {
		//var ciEditTabView = this.getComponent('ciEditView').getComponent('ciEditTabView');
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
//		var ciCreateWizardPagesView = this.getComponent('ciCreateView').getComponent('ciCreatePagesView').getComponent('ciCreateWizardPagesView');
		
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
	
	
//	onCiSelected: function(source, ciId, target) {
//		this.getLayout().setActiveItem('ciEditView');
//	},
	
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
	},
	
	updateToolTips: function(toolTips) {
		var ciSearchView = this.getComponent('ciSearchView');
		ciSearchView.updateToolTips(toolTips);
		
		var ciEditView = this.getComponent('ciEditView');
		ciEditView.updateToolTips(toolTips);
		
		var ciCreateView = this.getComponent('ciCreateView');
		ciCreateView.updateToolTips(toolTips);
	}
	

	
//	afterRender: function(parentCt) {
//		$(this).corner();//this 'ciCenterView'
//	}
});
Ext.reg('AIR.CiCenterView', AIR.CiCenterView);