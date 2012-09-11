Ext.namespace('AIR');

AIR.CiTitleView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
//			layout: 'table',
//			layoutConfig: {
//				columns: 1,
//				tableAttrs: {
//					style: {
//						width: '100%'
//					}
//				}
//			},
			
			baseCls: 'x-plain',
			
			layout: 'border',
			
			items: [{
				region: 'north',
		        xtype: 'panel',
		        id: 'pCiTitleViewNorth',
			    border: false,
			    height: 30,
				
//				layout: 'hbox',
//			    layoutConfig: {
//			        padding:'5',
//			        pack:'end',
//			        align:'middle'
//			    },
			    
//			    defaults: { margins:'0 10 0 0' },
//			    baseCls: 'x-plain',
			    
			    
				layout: 'table',
				layoutConfig: {
					columns: 6,//8 6
					padding: 5,
			        tableAttrs: {
			            style: {
			            	float: 'right',
			            	padding: 5
			            }
			        }
				},
			    
				items: [{
//					id: 'lclink',
//					html: '<a href="#" onclick="languagecheck.show();">Check Language</a>',
////					hidden: true,
//					baseCls: 'x-plain'
					
			        id: 'lclink',
			        xtype: 'commandlink',
			        text: 'Check Language'
				},{
//					html: '<span id="languageDetailslanguagePicture" onclick="switchLanguage();"><img id="languageDetailslanguagePNG" align="top" src="' + urlFlagLanguage +'" alt="Language"></span>',
//					baseCls: 'x-plain'//oder mit xtype: 'container' und parent[baseCls: 'x-plain'] 
					
//					flex: 1
					
		        	
			        id: 'clLanguage',
			        xtype: 'commandlink',
			        img: urlFlagLanguage
				},{
			        id: 'clInfo',
			        xtype: 'commandlink',
			        img: img_Info
				},{
					html: '<a href="' + manual_en + '" target="_blank"><img id="helpImage" align="top" src="' + img_Help + '" alt="Help"></a>',
					baseCls: 'x-plain'
					
//					flex: 1
					
					
//			        id: 'clHelp',
//			        xtype: 'commandlink',
//			        img: img_Help
				},{
			        id: 'clLogOut',
			        xtype: 'commandlink',
			        img: img_Logoff
				},{
					xtype: 'hidden',
					id: 'hHistory'
				}],
			    bodyStyle: {//ohne: Hintergrundfarbe weiss
			    	backgroundColor: '#043453',
			    	color: '#CEE7F7',
			    	fontFamily: fontType
			    }
			}, {
				region: 'center',
				xtype: 'panel',
				id: 'pCiTitleCenter',
				
			    border: false,
			    height: 65,
			    
//				layout: 'hbox',
//			    layoutConfig: {
//			        padding:'5',
//			        pack:'start',
//			        align:'middle'
//			    },
			    
//			    defaults:{margins:'0 0 0 0'},
			    baseCls: 'x-plain',
			    
				layout: 'table',
				layoutConfig: {
					columns: 3
				},

			    style: {
			    	backgroundImage: 'url("' + img_HeaderTop + '")',
			    	backgroundRepeat: 'repeat-x'
			    },
			    
				items: [{
					xtype: 'container',
					html: '<img src="' + img_AppLogo + '">',
					style: {
					   	color: '#ededed',
					   	fontWeight: 'bold',
				    	fontFamily: fontType,
				    	marginLeft: '180px',
				    	marginRight: '5px',
				    	marginTop: '5px'
				  }
				},{
					xtype: 'applabeltag',
					id: 'tAppLabel'
				}],
			    bodyStyle: {
			    	//backgroundColor: '#085E8B',
			    	color: '#ededed',
			    	fontFamily: fontType
			    }
			}]
		});
		
		AIR.CiTitleView.superclass.initComponent.call(this);
		
		var databaseDisplayNameListStore = AIR.AirStoreManager.getStoreByName('databaseDisplayNameListStore');
		var databaseInfoText = databaseDisplayNameListStore.data.items[0].data.text;
		
        var data = {
			shortName: app_shortname,
			longName: app_name,
			version: app_version,
			database: databaseInfoText
	    };
    		
        var tAppLabel = this.getComponent('pCiTitleCenter').getComponent('tAppLabel');
        tAppLabel.setData(data);
        
        
        var clInfo = this.getComponent('pCiTitleViewNorth').getComponent('clInfo');
        clInfo.on('click', this.onInfoClick, this);
        
//        var clHelp = this.getComponent('pCiTitleViewNorth').getComponent('clHelp');
//        clHelp.on('click', this.onHelpClick, this);
        
//        var clLogOut = this.getComponent('pCiTitleViewNorth').getComponent('clLogOut');
//        clLogOut.on('click', this.onLogOutClick, this);
	},
	
//	onLogOutClick: function(button, event) {
//		
//	},
	
	onHelpClick: function(button, event) {
		
	},
	
	onInfoClick: function(button, event) {
		window.open('versioninfo.html', 'version', 'width=580,height=360,scrollbars=no, toolbar=no,status=no, resizable=yes,menubar=no,location=no,directories=no,top=10,left=10');
	},
	
	
	update: function(language) {
		// check role developer
    	if (hasRoleDeveloper) {
			Ext.getCmp('lclink').show();
		}
		else {
			Ext.getCmp('lclink').hide();
		}
		
//		var databaseDisplayNameListStore = AIR.AirStoreManager.getStoreByName('databaseDisplayNameListStore');
//		var databaseInfoText = databaseDisplayNameListStore.data.items[0].data.text;
//		
//		var lThisappdatabase = this.getComponent('pCiTitleCenter').getComponent('thisappdatabase');//cThisappdatabase
//		lThisappdatabase.setText(databaseInfoText);
////		cThisappdatabase.dom.innerHTML = '<br/><span style="font-size: 7pt;">' + databaseInfoText + '</span>';
		
		
//        var data = {
//			shortName: app_shortname,
//			longName: app_name,
//			version: app_version,
//			database: databaseInfoText
//        };
//		
//        var tAppLabel = this.getComponent('pCiTitleCenter').getComponent('tAppLabel');
//        tAppLabel.update(data);
//        
//        var f = function() {
//        	tAppLabel.update(data);
//        };
//        
//        //TODO: make DelayedTask obsolete
//        var task = new Ext.util.DelayedTask(f.createDelegate(this));
//        task.delay(1000);
        
        
        
        
		//richtige Flagge setzen anhand paramter language
		var clLanguage = this.getComponent('pCiTitleViewNorth').getComponent('clLanguage');
		
		switch(language) {
			case 'DE':
//				clLanguage.img = img_LangEN;
				clLanguage.setIcon(img_LangEN);
				break;
			case '':
			case 'EN':
//				clLanguage.img = img_LangDE;
				clLanguage.setIcon(img_LangDE);
				break;
			default:
				throw new Error('Not supported language: '+language);
				break;
		}
		
//		clLanguage.setIcon(clLanguage.img);
		
		//PROBLEM: event gets fired before AIR.AirApplicationManager is registered on clLanguage's click event during startup
//		clLanguage.fireEvent('click', clLanguage);
	}
});
Ext.reg('AIR.CiTitleView', AIR.CiTitleView);