/*function switchLanguage() {
 	 if ('EN' === selectedLanguage) {
			selectedLanguage = 'DE';
			urlLanguage = lng_DE;
			urlLanguageTooltips = lng_DETooltips;
			urlLanguageHelp = lng_DEHelp;
			// urlFlagLanguage = img_LangDE;
			urlFlagLanguage = img_LangEN;
		}
		else {
			selectedLanguage = 'EN';
			urlLanguage = lng_EN;
			urlLanguageTooltips = lng_ENTooltips;
			urlLanguageHelp = lng_ENHelp;
			// urlFlagLanguage = img_LangEN;
			urlFlagLanguage = img_LangDE;
		}
		languagestore.load();
		languagetooltipstore.load();
		languagehelpstore.load();
		
		Ext.get('languageDetailslanguagePNG').dom.src = urlFlagLanguage;
  }*/


//var titlePanel = 
//new Ext.Panel({	
//	layout: 'table',
//	layoutConfig: {
//		columns: 1,
//		tableAttrs: {
//			style: {
//				width: '100%'
//			}
//		}
//	},
//	baseCls: 'x-plain',
//	items: [
//		new  Ext.Panel({
//			layout:'hbox',
//		    layoutConfig: {
//		        padding:'5',
//		        pack:'end',
//		        align:'middle'
//		    },
//		    height : 30,
//		    defaults:{margins:'0 10 0 0'},
//		    baseCls: 'x-plain',
//		    border: false,
//			items: [{ xtype: 'container',
//					id: 'lclink',
//				  html: '<a href="#" onclick="languagecheck.show();">Check Language</a>',
//				  hidden: true
//				},
//					{ xtype: 'container',	  
//					  html: '<span id="languageDetailslanguagePicture" onclick="switchLanguage();"><img id="languageDetailslanguagePNG" align="top" src="' + urlFlagLanguage +'" alt="Language"></span>',
//					  style: {cursor:'pointer'}
//					},
//					{ xtype: 'container',
//						  html: '<a target="version" onclick="window.open(\'\', \'version\', \'width=580,height=360,scrollbars=no, toolbar=no,status=no, resizable=yes,menubar=no,location=no,directories=no,top=10,left=10\')" href="versioninfo.html"><img id="infoImage" align="top" src="' + img_Info +'" alt="Versioninfo"></a>',
//						  style: {cursor:'pointer'}
//					},
//					{ xtype: 'container',
//					  html: '<a href="' + manual_en + '" target="_blank"><img id="helpImage" align="top" src="' + img_Help + '" alt="Help"></a>',
//					  style: {cursor:'pointer'}
//					},
//					{ xtype: 'container',	  
//						  html: '<span id="logoutImage" onclick="logout();"><img id="logoutImagePNG" align="top" src="' + img_Logoff + '" alt="Logout"></span>',
//						  style: {cursor:'pointer'}
//					}
//				],
//		    bodyStyle: {
//		    	backgroundColor: '#043453',
//		    	color: '#CEE7F7',
//		    	fontFamily: fontType
//		    }
//		}),
//		new  Ext.Panel({
//			layout:'hbox',
//		    layoutConfig: {
//		        padding:'5',
//		        pack:'start',
//		        align:'middle'
//		    },
//		    style: {
//		    	backgroundImage: 'url("' + img_HeaderTop + '")',
//		    	backgroundRepeat: 'repeat-x'
//		    },
//		    defaults:{margins:'0 0 0 0'},
//		    baseCls: 'x-plain',
//		    border: false,
//		    height: 65,
//			items: [
//				{ xtype: 'container',
//				  html: '&nbsp;',
//				  style : {
//				    width: '160px'
//				  }
//				},
//				{ xtype: 'container',
//				  html: '<img src="' + img_AppLogo + '">',
//				  style : {
//				   	//backgroundColor: '#085E8B',
//				   	color: '#ededed',
//				   	fontWeight: 'bold',
//			    	fontFamily: fontType
//				  }
//				},
//				{ xtype: 'container',
//				  html: '&nbsp;&nbsp;',
//				  style : {
//				   	//backgroundColor: '#085E8B',
//				   	color: '#ededed',
//				   	fontWeight: 'bold',
//			    	fontFamily: fontType
//				  }
//				},
//				{ xtype: 'container',
//				  id: 'thisappversion',
//				  html: '' + app_shortname + ' - ' + app_name + '<br/><span style="font-size: 7pt;">v' + app_version + '</span>',
//				  style : {
//				   	//backgroundColor: '#085E8B',
//				    color: '#ededed',
//					fontWeight: 'bold',
//			    	fontFamily: fontType
//			  		}
//				},
//				{ xtype: 'container',
//				  id: 'thisappdatabase',
//				  html: '<br/><span style="font-size: 7pt;">database version</span>',
//				  style : {
//				   	//backgroundColor: '#085E8B',
//					color: '#ededed',
//					fontWeight: 'bold',
//			    	fontFamily: fontType
//			  		}
//				}
//				
//				],
//		    bodyStyle : {
//		    	//backgroundColor: '#085E8B',
//		    	color: '#ededed',
//		    	fontFamily: fontType
//		    }
//		})/*,
//		new  Ext.Panel({
//			layout:'hbox',
//			layoutConfig: {
//		        padding:'5',
//		        align:'middle'
//		    },
//		    defaults:{margins:'0 0 0 0'},
//		    baseCls: 'x-plain',
//		    border: false,
//		    height: 28,
//			items: [
//					{ xtype: 'container',
//					  html: '',
//					  id: 'username',
//					  height: 28,
//					  width: 155,
//					  style : {
//					   	backgroundColor: '#085E8B',
//					   	color: '#ededed',
//					   	fontWeight: 'bold',
//					   	fontSize: '7pt',
//				    	fontFamily: fontType,
//					   	width: 155
//					  }
//					},
//					{ xtype: 'container',
//					  html : '&nbsp;',
//					  height: 28,
//					  flex: 1,
//					  style : {
//					   	backgroundColor: panelbgcolor,
//					   	color: '#000000',
//				    	fontFamily: fontType,
//				    	opacity: 1
//					  }
//					},
//					{ xtype: 'container',
//					  html: 'Help [ <span style="font-weight:normal;">On</span> | Off ]',
//					  height: 28,
//					  width: 155,
//					  style : {
//					   	textAlign: 'right',
//					   	padding: '5',
//						backgroundColor: '#085E8B',
//					   	color: '#ededed',
//					   	fontWeight: 'bold',
//				    	fontFamily: fontType,
//					   	fontSize: '10pt',
//					   	width: 155
//					  }
//					}
//				],
//		    bodyStyle : {
//		    	backgroundColor: '#085E8B',
//		    	color: '#ededed',
//		    	fontFamily: fontType
//		    }
//		})*/
//	]
//});