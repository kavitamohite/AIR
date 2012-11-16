Ext.namespace('AIR');

//AIR.AirStoreFactory = {
AIR.AirStoreFactory = function() {
	return {
	
		//====================== initial stores ======================
		createCurrencyListStore: function() {
			var currencyListRecord = Ext.data.Record.create([
 	            {name: 'id', mapping: 'currencyId'},
	            {name: 'text', mapping: 'currencyName'},
	            {name: 'symbol', mapping: 'currencySymbol'}
	        ]);
	
			var currencyListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'currencyId'//id currencyId
			}, currencyListRecord); 
	
			var currencyListStore = new Ext.data.XmlStore({
				autoDestroy: true,
	           	storeId: 'currencyListStore',
	           	autoLoad: false,
	           	
	       		proxy: new Ext.ux.soap.SoapProxy({
		       		url: webcontext + '/AIRToolsWSPort',
		       		loadMethod: 'getCurrencyList',
		       		timeout: 120000,
		       		reader: currencyListReader
		       	}),
		       	
		       	fields: [ 'id', 'text', 'symbol' ],
	
		       	reader: currencyListReader
	       });
			
			return currencyListStore;
		},
		
		
		createLicenseTypeListStore: function() {
			var licenseTypeListRecord = Ext.data.Record.create([
	            {name: 'id', mapping: 'licenseTypeId'},
	            {name: 'text', mapping: 'licenseTypeName'}
	        ]);
		
			var licenseTypeListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, licenseTypeListRecord); 
		
			var licenseTypeListStore = new Ext.data.XmlStore({
		      	autoDestroy: true,
		      	storeId: 'licenseTypeStore',
		      	autoLoad: false,
		      
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRToolsWSPort',
		      		loadMethod: 'getLicenseTypeList',
		      		timeout: 120000,
		      		reader: licenseTypeListReader
		      	}),
		      	
		      	fields: [ 'id', 'text' ],
	
		      	reader: licenseTypeListReader
			});
		  
			return licenseTypeListStore;
		},
		
		createChangeAccountListStore: function() {
			var changeAccountListRecord = Ext.data.Record.create([
	             {name: 'text', mapping: 'accountName'},
	             {name: 'id', mapping: 'accountId'}
	        ]);
	
	        var changeAccountListReader = new Ext.data.XmlReader({
	            record: 'return',
	            idProperty: 'id'
	        }, changeAccountListRecord); 
	
	        var changeAccountListStore = new Ext.data.XmlStore({
	            autoDestroy: true,
	            storeId: 'changeAccountListStore',
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext +'/AIRToolsWSPort',
	        		loadMethod: 'getAccountList',
	        		timeout: 120000,
	        		reader: changeAccountListReader
	        	}),
	        	
	        	fields: [ 'id', 'text' ],
	
	        	reader: changeAccountListReader
	        });
	        
	        return changeAccountListStore;
		},
	        
		createRunAccountListStore: function() {
			var runAccountListRecord = Ext.data.Record.create([
	              {name: 'text', mapping: 'accountName'},
	              {name: 'id', mapping: 'accountId'}
	         ]);
	
	         var runAccountListReader = new Ext.data.XmlReader({
	             record: 'return',
	             idProperty: 'id'
	         }, runAccountListRecord); 
	
	        var runAccountListStore = new Ext.data.XmlStore({
	        	autoDestroy: true,
	        	storeId: 'runAccountListStore',
	        	autoLoad: false,
	             
	         	proxy: new Ext.ux.soap.SoapProxy({
	         		url: webcontext +'/AIRToolsWSPort',
	         		loadMethod: 'getAccountList',
	         		timeout: 120000,
	         		reader: runAccountListReader
	         	}),
	         	
	         	fields: [ 'id', 'text' ],
	
	         	reader: runAccountListReader
	         });
	         
	         return runAccountListStore;
		},
		
		createItSetListStore: function() {
			var itSetListRecord = Ext.data.Record.create([
	            {name: 'id', mapping: 'id'},
	            {name: 'text', mapping: 'itSetName'}
	        ]);
	
			var itSetListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, itSetListRecord); 
	
			var itSetListStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'itSetListStore',
				autoLoad: false,
				
	         	proxy: new Ext.ux.soap.SoapProxy({
	         		url: webcontext +'/AIRToolsWSPort',
	         		loadMethod: 'getItSetList',
	         		timeout: 120000,
	         		reader: itSetListReader
	         	}),
	         	
	         	fields: [ 'id',	'text' ],
	
	         	reader: itSetListReader
			});
			
			return itSetListStore;
		},
		
		getItSecSBWerteListReader: function() {
			var itSecSBWerteListRecord = Ext.data.Record.create([
	            {name: 'text', mapping: 'sbTextEn'},
		        {name: 'id', mapping: 'itsecSBId'}
	        ]);
		
			var itSecSBWerteListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, itSecSBWerteListRecord); 
			
			return itSecSBWerteListReader;
		},
		
		createItSecSBWerteListStore: function() {
			var itSecSBWerteListReader = AIR.AirStoreFactory.getItSecSBWerteListReader();
			
			var itSecSBIntegrityListStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'itSecSBIntegrityListStore',
				autoLoad: false,
		       
			   	proxy: new Ext.ux.soap.SoapProxy({
			   		url: webcontext + '/AIRToolsWSPort',
			   		loadMethod: 'getItSecSBWerteList',
			   		timeout: 120000,
			   		reader: itSecSBWerteListReader
			   	}),
		   	
			   	fields: [ 'id', 'text' ],
	
			   	reader: itSecSBWerteListReader
			});
			
			return itSecSBIntegrityListStore;
		},
		
		createItSecSBAvailabilityListStore: function() {
			var itSecSBWerteListReader = AIR.AirStoreFactory.getItSecSBWerteListReader();
			
			var itSecSBAvailabilityListStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'itSecSBAvailabilityListStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/AIRToolsWSPort',
					loadMethod: 'getItSecSBWerteList',
					timeout: 120000,
					reader: itSecSBWerteListReader
				}),
				
				fields: [ 'id', 'text' ],
	
				reader : itSecSBWerteListReader
			});
			
			return itSecSBAvailabilityListStore;
		},
		
		createItSecSBConfidentialityListStore: function() {
			var itSecSBWerteListReader = AIR.AirStoreFactory.getItSecSBWerteListReader();
			
			var itSecSBConfidentialityListStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'itSecSBConfidentialityListStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/AIRToolsWSPort',
					loadMethod: 'getItSecSBWerteList',
					timeout: 120000,
					reader: itSecSBWerteListReader
				}),
				
				fields: [ 'id', 'text' ],
	
				reader: itSecSBWerteListReader
			});
			
			return itSecSBConfidentialityListStore;
		},
		
		createClassInformationListStore: function() {
			var classInformationListRecord = Ext.data.Record.create([
	        	{name: 'id', mapping: 'classInformationId'},
	        	{name: 'text', mapping: 'classInformationName'},
	        	{name: 'classProtectionName', mapping: 'classProtectionName'}
	        ]);
	
	        var classInformationListReader = new Ext.data.XmlReader({
	            record: 'return',
	            idProperty: 'id'
	        }, classInformationListRecord); 
	
	        var classInformationListStore = new Ext.data.XmlStore({
	            autoDestroy: true,
	            storeId: 'classInformationListStore',
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext +'/AIRToolsWSPort',
	        		loadMethod: 'getClassInformationList',
	        		timeout: 120000,
	        		reader: classInformationListReader
	        	}),
	        	
	        	fields: [ 'id', 'text', 'classProtectionName' ],
	
	        	reader : classInformationListReader
	        });
	        
	        return classInformationListStore;
		},
		
		createSlaListStore: function() {
			var slaListRecord = Ext.data.Record.create([
	           {name: 'text', mapping: 'slaName'},
	           {name: 'id', mapping: 'slaId'}
	        ]);
	
			var slaListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'slaId'//'id'
			}, slaListRecord); 
	
			var slaListStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'slaListStore',
				autoLoad: false,
	          
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRToolsWSPort',
		      		loadMethod: 'getSlaList',
		      		timeout: 120000,
		      		reader: slaListReader
		      	}),
		      	
		      	fields: [ 'id', 'text' ],
		
		      	reader: slaListReader
			});
			
			return slaListStore;
		},
		
		createServiceContractListStore: function() {
			var serviceContractListRecord = Ext.data.Record.create([
	            {name: 'text', mapping: 'serviceContractName'},
	            {name: 'id', mapping: 'serviceContractId'}
	        ]);
	
			var serviceContractListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, serviceContractListRecord); 
	
			var serviceContractListStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'serviceContractListStore',
				autoLoad: false,
				
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/ApplicationToolsWSPort',
		      		loadMethod: 'getServiceContractList',
		      		timeout: 120000,
		      		reader: serviceContractListReader
		      	}),
		      	
//		      	baseParams: {
//		      		applicationId: -1,	
//		      		cwid: cwid,
//		      		token: '',
//		      		slaName: selectedSlaId
//		      	},
		      	
		      	fields: [ 'id', 'text' ],
	
		      	reader: serviceContractListReader
			});
			
			return serviceContractListStore;
		},
		
		createPriorityLevelListStore: function() {
			var priorityLevelListRecord = Ext.data.Record.create([
	            {name: 'text', mapping: 'priorityLevel'},
	            {name: 'id', mapping: 'priorityLevelId'}
	        ]);
	
	        var priorityLevelListReader = new Ext.data.XmlReader({
	            record: 'return',
	            idProperty: 'id'
	        }, priorityLevelListRecord); 
	
	        var priorityLevelListStore = new Ext.data.XmlStore({
	            autoDestroy: true,
	            storeId: 'priorityLevelListStore',
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext +'/AIRToolsWSPort',
	        		loadMethod: 'getPriorityLevelList',
	        		timeout: 120000,
	        		reader: priorityLevelListReader
	        	}),
	        	
	        	fields: [ 'id', 'text' ],
	
	        	reader : priorityLevelListReader
	        });
	        
	        return priorityLevelListStore;
		},
		
		createSeverityLevelListStore: function() {
			var severityLevelListRecord = Ext.data.Record.create([
	            {name: 'text', mapping: 'severityLevel'},
	            {name: 'id', mapping: 'severityLevelId'}
		    ]);
		
		    var severityLevelListReader = new Ext.data.XmlReader({
		        record: 'return',
		        idProperty: 'id'
		    }, severityLevelListRecord); 
		
		    var severityLevelListStore = new Ext.data.XmlStore({
		        autoDestroy: true,
		        storeId: 'severityLevelListStore',
		        autoLoad: false,
		        
		    	proxy: new Ext.ux.soap.SoapProxy({
		    		url: webcontext +'/AIRToolsWSPort',
		    		loadMethod: 'getSeverityLevelList',
		    		timeout: 120000,
		    		reader: severityLevelListReader
		    	}),
		    	
		    	fields: [ 'id', 'text' ],
	
		    	reader: severityLevelListReader
		    });
		    
		    return severityLevelListStore;
		},
	
		createBusinessEssentialListStore: function() {
			var businessEssentialListRecord = Ext.data.Record.create([
	            {name: 'text', mapping: 'severityLevel'},
	            {name: 'id', mapping: 'severityLevelId'}
	        ]);
	
	        var businessEssentialListReader = new Ext.data.XmlReader({
	            record: 'return',
	            idProperty: 'severityLevelId'//'id'
	        }, businessEssentialListRecord); 
	
	        var businessEssentialListStore = new Ext.data.XmlStore({
	            autoDestroy: true,
	            storeId: 'businessEssentialListStore',
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext +'/BusinessEssentialWSPort',
	        		loadMethod: 'getBusinessEssentialList',
	        		timeout: 120000,
	        		reader: businessEssentialListReader
	        	}),
	        	
	        	fields: [ 'id', 'text' ],
	
	        	reader : businessEssentialListReader
	        });
	        
	        return businessEssentialListStore;
		},
		
		createApplicationCat2ListStore: function() {
			var applicationCat2ListRecord = Ext.data.Record.create([{
				name: 'applicationCat1Id'
			}, {
				name: 'id',
				mapping: 'applicationCat2Id'
			}, {
				name: 'text',
				mapping: 'applicationCat2Text'
			}, {
				name: 'guiSAPNameWizard',
				mapping: 'guiSAPNameWizard'
			}]);
		
			var applicationCat2ListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'applicationCat2Id'//'id'
			}, applicationCat2ListRecord);
		
			var applicationCat2ListStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'applicationCat2ListStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationCat2WSPort',
					loadMethod: 'getApplicationCat2List',//'findApplicationCat2ByApplicationKat1Id',
					timeout: 120000,
					reader: applicationCat2ListReader
				}),
				
//				baseParams: {
//					anwendungKat1Id: 5//0 5
//				},
				
				fields: [ 'applicationCat1Id', 'id', 'text', 'guiSAPNameWizard' ],
	
				reader: applicationCat2ListReader
				
				//A1
//				listeners: {
//					beforeload: function(store, options) {
//						applicationCat2ListStore.baseParams.anwendungKat1Id = selectedCiCat1Id;
//					}
//				}
			});
	
			return applicationCat2ListStore;
		},
		
		createLifecycleStatusListStore: function() {
			var lifecycleStatusListRecord = Ext.data.Record.create([
	            {name: 'text', mapping: 'lcStatus'},
	            {name: 'id', mapping: 'lcStatusId'}
	        ]);
	
			var lifecycleStatusListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, lifecycleStatusListRecord); 
	
			var lifecycleStatusListStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'lifecycleStatusListStore',
				autoLoad: false,
				
	          	proxy: new Ext.ux.soap.SoapProxy({
	          		url: webcontext +'/AIRToolsWSPort',
	          		loadMethod: 'getLifecycleStatusList',
	          		timeout: 120000,
	          		reader: lifecycleStatusListReader
	          	}),
	          	
	          	fields: [ 'id', 'text' ],
	
	          	reader: lifecycleStatusListReader
	        });
			
			return lifecycleStatusListStore;
		},
		
		createOperationalStatusListStore: function() {
			var operationalStatusListRecord = Ext.data.Record.create([
	            {name: 'text', mapping: 'operationalStatusEn'},
	            {name: 'id', mapping: 'operationalStatusId'}
	        ]);
	
	        var operationalStatusListReader = new Ext.data.XmlReader({
	            record: 'return',
	            idProperty: 'id'
	        }, operationalStatusListRecord); 
	
	        var operationalStatusListStore = new Ext.data.XmlStore({
	            autoDestroy: true,
	            storeId: 'operationalStatusListStore',
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext +'/AIRToolsWSPort',
	        		loadMethod: 'getOperationalStatusList',
	        		timeout: 120000,
	        		reader: operationalStatusListReader
	        	}),
	        	
	        	fields: [ 'id', 'text' ],
	
	        	reader: operationalStatusListReader
	        });
	        
	        return operationalStatusListStore;
		},
		
		createCategoryBusinessListStore: function() {
			var categoryBusinessListRecord = Ext.data.Record.create([
	        	{name: 'id', mapping: 'categoryBusinessId'},
	        	{name: 'text', mapping: 'categoryBusinessName'}
	        ]);
	
	        var categoryBusinessListReader = new Ext.data.XmlReader({
	            record: 'return',
	            idProperty: 'categoryBusinessId'//'id'
	        }, categoryBusinessListRecord); 
	
	        var categoryBusinessListStore = new Ext.data.XmlStore({
	            autoDestroy: true,
	            storeId: 'categoryBusinessListStore',
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext +'/AIRToolsWSPort',
	        		loadMethod: 'getCategoryBusinessList',
	        		timeout: 120000,
	        		reader: categoryBusinessListReader
	        	}),
	        	
	        	fields: [ 'id', 'text' ],
	
	        	reader: categoryBusinessListReader
	        });
	        
	        return categoryBusinessListStore;
		},
		
		createDataClassListStore: function() {
			var dataClassListRecord = Ext.data.Record.create([
	            {name: 'id', mapping: 'classDataId'},
	         	{name: 'text', mapping: 'classDataName'}
	        ]);
	
			var dataClassListReader = new Ext.data.XmlReader({
	            record: 'return',
	            idProperty: 'id'
			}, dataClassListRecord); 
	
			var dataClassListStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'dataClassListStore',
				autoLoad: false,
				
	     		proxy: new Ext.ux.soap.SoapProxy({
	         		url: webcontext +'/ApplicationToolsWSPort',
	         		loadMethod: 'getClassDataList',
	         		timeout: 120000,
	         		reader: dataClassListReader
	         	}),
	         	
//	         	baseParams: {
//	         		applicationId: -1,	
//	         		cwid: cwid,
//	         		token: '',
//	         		categoryBusinessId: selectedCategoryBusinessId
//	         	},
	         	
	         	fields: [ 'id', 'text' ],
	
	         	reader: dataClassListReader
			});
	         
			return dataClassListStore;
		},
		
		createItsecUserOptionListStore: function() {
			var itsecUserOptionListRecord = Ext.data.Record.create([
	            {name: 'id', mapping: 'itsecUserOptionId'},
	            {name: 'itsecUserOptionName', mapping: 'itsecUserOptionName'},
	            {name: 'itsecUserOptionValue', mapping: 'itsecUserOptionValue'}
	        ]);
	
			var itsecUserOptionListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, itsecUserOptionListRecord); 
	
			var itsecUserOptionListStore = new Ext.data.XmlStore({
				autoDestroy: false,
				storeId: 'itsecUserOptionListStore',
				autoLoad: false,
	           
	       		proxy: new Ext.ux.soap.SoapProxy({
	       			url: webcontext +'/AIRWSPort',
		       		loadMethod: 'getItsecUserOption',
		       		timeout: 120000,
		       		reader: itsecUserOptionListReader
		       	}),
		       
		       	fields: [ 'id', 'itsecUserOptionId', 'itsecUserOptionName',	'itsecUserOptionValue' ],
		
		       	reader: itsecUserOptionListReader
		       	
//		       	listeners: {
//		       		beforeload: function(store, options) {
//		       			itsecUserOptionListStore.baseParams.cwid = cwid;
//		       		}
	//	       		load: function(store, records, options) {
	//	       		   	handleUserOptions();
	//	       		   	inactivateButtonSaveUserOptions();
	//	       		}
//		       	}
			});
			
			return itsecUserOptionListStore;
		},
		
		createUserOptionSaveStore: function() {
			var userOptionSaveRecord = Ext.data.Record.create([
	            {name: 'result'},
	            {name: 'displayMessage'},
	            {name: 'messages'}
	      	]);
	
			var userOptionSaveReader = new Ext.data.XmlReader({
				record: 'return'
			}, userOptionSaveRecord); 
	
			var userOptionSaveStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'userOptionSaveStore',
				autoLoad: false,
	          
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRWSPort',
		      		loadMethod: 'saveUserOption',
		      		timeout: 120000,
		      		reader: userOptionSaveReader
		      	}),
	      	
	      		fields: [ 'result', 'displayMessage', 'messages' ],
	      	         
	      		reader: userOptionSaveReader
			});
			
			return userOptionSaveStore;
		},
		
		createRolePersonListStore: function() {
			var rolePersonListRecord = Ext.data.Record.create([
	            {name: 'id', mapping: 'roleId'},
	            {name: 'cwid', mapping: 'cwid'},
	            {name: 'roleName', mapping: 'roleName'}
	        ]);
	
			var rolePersonListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, rolePersonListRecord); 
	
			var rolePersonListStore = new Ext.data.XmlStore({
				autoDestroy: false,
				storeId: 'rolePersonListStore',
				autoLoad: false,
	          
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRWSPort',
		      		loadMethod: 'getRolePerson',
		      		timeout: 120000,
		      		reader: rolePersonListReader
		      	}),
		      	
		      	fields: [ 'id',	'roleId', 'cwid', 'roleName' ],
		
		      	reader: rolePersonListReader
			});
			
			return rolePersonListStore;
		},
		
		//not used
		createRolePersonBusinessEssentialListStore: function() {
			var rolePersonBusinessEssentialListRecord = Ext.data.Record.create([
           	    {name: 'id', mapping: 'roleId'},
           		{name: 'cwid', mapping: 'cwid'},
           		{name: 'roleName', mapping: 'roleName'}
       		]);

			var rolePersonBusinessEssentialListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, rolePersonBusinessEssentialListRecord); 

			var rolePersonBusinessEssentialListStore = new Ext.data.XmlStore({
				autoDestroy: false,
				storeId: 'rolePersonBusinessEssentialListStore',
				autoLoad: false,
               
	           	proxy: new Ext.ux.soap.SoapProxy({
	           		url: webcontext +'/AIRWSPort',
	           		loadMethod: 'getRolePersonBusinessEssentialEditor',
	           		timeout: 120000,
	           		reader: rolePersonBusinessEssentialListReader
	           	}),
	           	
	           	baseParams: {
	           		cwid: cwid
	           	},
	           	
	           	fields: [ 'id',	'roleId', 'cwid', 'roleName' ],
	
	           	reader: rolePersonBusinessEssentialListReader,
	           	
	           	listeners: {
	           		beforeload: function(store, options) {
	           			rolePersonBusinessEssentialListStore.baseParams.cwid = cwid;
	           		},
	           		load: function(store, records, options) {
	           			var beinfo = 'NO';
	           			hasRoleBusinessEssentialEditor = false;
	           			
	           		   	if (undefined !== records && records.hasOwnProperty('0') && 'BusinessEssential-Editor' === records[0].data.roleName) {
	           	       		hasRoleBusinessEssentialEditor = true;
	           	       		beinfo = 'YES';
	                 	}
	           		   	
	           		   	Ext.getCmp('myplacerolebusinessessentialeditor').setValue(beinfo);
	           		}
	           	}
			});
			
			return rolePersonBusinessEssentialListStore;
		},
		
		createProcessListStore: function() {
			var processListRecord = Ext.data.Record.create([
                {name: 'text', mapping: 'processName'},
                {name: 'id', mapping: 'processId'}
            ]);

			var processListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, processListRecord); 

			var processListStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'processListStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
	          		url: webcontext +'/AIRToolsWSPort',
	          		loadMethod: 'getProcessList',
	          		timeout: 120000,
	          		reader: processListReader
	          	}),
	          	
	          	fields: [ 'id', 'text' ],
	
	          	reader: processListReader
			});
			
			return processListStore;
		},
		
		createApplicationCat1ListStore: function() {
			var applicationCat1ListRecord = Ext.data.Record.create([ {
				name: 'id',
				mapping: 'applicationCat1Id'
			}, {
				name: 'text',
				mapping: 'applicationCat1Text'
			}, {
				name: 'english',
				mapping: 'applicationCat1En'
			}]);
	
			var applicationCat1ListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, applicationCat1ListRecord);
	
			var applicationCat1ListStore = new Ext.data.XmlStore({
				autoDestroy : false,
				storeId: 'applicationCat1ListStore',
				autoLoad: true,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationCat1WSPort',
					loadMethod: 'getApplicationCat1List',
					timeout: 120000,
					reader: applicationCat1ListReader
				}),
				
				fields: [ 'id', 'text', 'english' ],

				reader: applicationCat1ListReader
			});
			
			return applicationCat1ListStore;
		},
		
		createDatabaseDisplayNameListStore: function() {
			var databaseDisplayNameListRecord = Ext.data.Record.create([ {
				name: 'id'
			}, {
				name: 'text'
			}]);
	
			var databaseDisplayNameListReader = new Ext.data.XmlReader({
				record: 'return'
				// record: 'viewdataDTO'
			}, databaseDisplayNameListRecord); 
	
			var databaseDisplayNameListStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'databaseDisplayNameListStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url : webcontext +'/AIRToolsWSPort',
					loadMethod: 'getDatabaseDisplayName',
					timeout : 120000,
					reader : databaseDisplayNameListReader
				}),
				
				fields: [ 'id', 'text', 'return' ],

				reader: databaseDisplayNameListReader
			});
			
			return databaseDisplayNameListStore;
		},
		
		createLanguageHelpStore: function() {
			var languageHelpStore = new Ext.data.XmlStore({
			    autoLoad: false,
			    storeId: 'languageHelpStore',
			    url: 'lang/german_help.xml',

			    record: 'Items',
			    
			    fields: [
			        {name: 'help_infotext'},
			        {name: 'help_myplace'},
			        {name: 'help_search'},
			        {name: 'help_search_advanced'},
			        {name: 'help_create_ci'},
			        {name: 'help_details_details'},
			        {name: 'help_details_specific'},
			        {name: 'help_details_contacts'},
			        {name: 'help_details_agreements'},
			        {name: 'help_details_protection'},
			        {name: 'help_details_compliance'},
			        {name: 'help_details_licensecosts'},
			        {name: 'help_details_connections'},
			        {name: 'help_details_supportstuff'},
			        {name: 'help_details_history'}
			    ]
			});
			
			return languageHelpStore;
		},
		
		createLanguageStoreEN: function() {
			return this.createLanguageStore('EN');
		},
		createLanguageStoreDE: function() {
			return this.createLanguageStore('DE');
		},
		createLanguageStore: function(language) {
			var url = language == 'de' || language == 'DE' ? 'lang/german.xml' : 'lang/english.xml';
			
			var languageStore = new Ext.data.XmlStore({
			    autoLoad: false,
			    storeId: 'languageStore_' + language,
			    url: url,
	
			    record: 'Items',
			    
			    fields: [
	             	{name: 'applicationManager'},
			             
			             
			        {name: 'general_yes'},
			        {name: 'general_no'},
			        {name: 'indefinite_article'},
			        {name: 'indefinite_article_no'},
			        {name: 'OR'},
			        
			        {name: 'dynamicWindowOKButtonText'},
			        {name: 'objectType'},
					{name: 'notRelevant'},
//			        {name: 'applicationOwner'},
//			        {name: 'applicationManager'},
			        {name: 'both'},
			        {name: 'lifecycleStatus'},
			        {name: 'organisationalScope'},
			        {name: 'operationalStatus'},
			        {name: 'applicationCat2'},
			        {name: 'businessProcess'},
			        {name: 'osType'},
			        {name: 'osName'},
			        {name: 'source'},
			        {name: 'gapResponsible'},
			        {name: 'itSet'},
			        {name: 'bUpdateCiSearchResult'},
			        {name: 'bExpandAdvSearchParams'},
			        {name: 'bCollapseAdvSearchParams'},
			        {name: 'searchTypeSearch'},
			        {name: 'searchTypeAdvancedSearch'},
			        {name: 'searchTypeOuSearch'},
			        
			        {name: 'label_menu_loggedinas'},
			        {name: 'label_menu_myplacemenuitem'},
			        {name: 'label_menu_myplacemycismenuitem'},
			        {name: 'label_menu_myplacemycissubsmenuitem'},
			        
			        {name: 'label_menu_searchmenuitem'},
			        {name: 'label_menu_advancedsearchmenuitem'},
			        {name: 'lMenuItemOuSearch'},
	
			        {name: 'label_menu_createmenuitem'},
			        {name: 'label_menu_wizardmenuitem'},
			        {name: 'label_menu_copyfrommenuitem'},
			        {name: 'label_menu_delete'},
			        
			        {name: 'label_menu_detailsdetails'},
			        {name: 'label_menu_detailsspecific'},
			        {name: 'label_menu_detailscontacts'},
			        {name: 'label_menu_detailsagreements'},
			        {name: 'label_menu_detailscompliance'},
			        {name: 'label_menu_detailsprotection'},
			        {name: 'label_menu_detailslicense'},
			        {name: 'label_menu_detailsconnections'},
			        {name: 'label_menu_detailssupportstuff'},
			        {name: 'label_menu_detailshistory'},
	
					// myPlace
			        {name: 'label_myplace_user'},
			        {name: 'label_myplace_cwid'},
			        {name: 'label_myplace_lastlogon'},
			        {name: 'label_myplace_roleperson'},
			        
			        // user options
			        {name: 'label_myplace_useroption'},
			        {name: 'label_useroptions_currency'},
			        {name: 'label_useroptions_language'},
			        {name: 'label_useroptions_numberformat'},
			        {name: 'label_useroptions_help'},
			        {name: 'label_useroptions_createwizard'},
			        {name: 'label_useroptions_disableTooltip'},
			        
			        //validation Messages
			        {name: 'editDataNotValid'},
			        
			        //applicationEditor
			        {name: 'header_applicationIsDraft'},
			        {name: 'header_applicationIsIncomplete'},
			        
					// details
			        {name: 'detailsPanelTitle'},
			        {name: 'label_details_alias'},
			        {name: 'label_details_category_business'},
			        {name: 'label_details_category'},
			        {name: 'label_details_ciOwner'},
			        {name: 'label_details_applicationOwner'},
			        {name: 'label_details_sla'},
			        {name: 'label_details_businessessential'},
			        {name: 'label_details_insertdata'},
			        {name: 'label_details_updatedata'},
			        
			        // specific
			        {name: 'specificsPanelTitle'},
			        {name: 'applicationName'},
			        {name: 'applicationAlias'},
			        {name: 'barApplicationId'},
			        {name: 'rgBARrelevance'},
			        {name: 'applicationVersion'},
			        {name: 'applicationCat2'},
			        {name: 'lifecycleStatus'},
			        {name: 'operationalStatus'},
			        {name: 'comments'},
			        
			        {name: 'specificsCategory'},
			        {name: 'applicationBusinessCat'},
			        {name: 'dataClass'},
			        {name: 'applicationCat2'},
			        {name: 'businessProcess'},
	
			        // contacts
			        {name: 'contactsPanelTitle'},
			        {name: 'contactsCIOwner'},
			        {name: 'contactsCIOwnerApplication'}, // for applications only
			        {name: 'ciResponsible'},
			        {name: 'ciSubResponsible'},
			        {name: 'fsApplicationOwner'},
			        {name: 'applicationOwner'},        
			        {name: 'applicationOwnerDelegate'},
			        {name: 'applicationSteward'},
			        {name: 'contactsGPSC'},
			        {name: 'gpsccontactResponsibleAtCustomerSide'},
			        {name: 'gpsccontactSupportGroup'},
			        {name: 'gpsccontactChangeTeam'},
			        {name: 'gpsccontactServiceCoordinator'},
			        {name: 'gpsccontactEscalation'},
			        {name: 'gpsccontactCiOwner'},
			        {name: 'gpsccontactOwningBusinessGroup'},
			        {name: 'gpsccontactImplementationTeam'},
			        {name: 'gpsccontactServiceCoordinatorIndiv'},
			        {name: 'gpsccontactEscalationIndiv'},
			        {name: 'gpsccontactSystemResponsible'},
			        {name: 'gpsccontactImpactedBusiness'},
			        {name: 'gpsccontactBusinessOwnerRepresentative'},
	
			        // agreements
			        {name: 'agreementsPanelTitle'},
			        {name: 'sla'},
			        {name: 'priorityLevel'},
			        {name: 'serviceContract'},
			        {name: 'severityLevel'},
			        {name: 'businessEssential'},
			        
			        // protection
					{name: 'protectionPanelTitle'},
					{name: 'itSecSbAvailabilityId'},
					{name: 'itSecSbAvailabilityDescription'},
					{name: 'protectionClassInformation'},
					{name: 'protectionClassInformationExplanation'},
					{name: 'protectionApplicationProtection'},
					
			        
					// compliance
					{name: 'compliancePanelTitle'},
					{name: 'complianceBYTSEC'},
					{name: 'complianceNonBYTSEC'},
					{name: 'complianceUndefined'},
					{name: 'complianceManagementText'},
					{name: 'complianceInfoText'},
					
					{name: 'complianceprocedures'},
					{name: 'isTemplate'},
					{name: 'compliancerelevance'},
					{name: 'compliancecontrols'},
					{name: 'itsetName'},
			        {name: 'relevanceGR1920'},
			        {name: 'relevanceGR1435'},
			        {name: 'relevanceGR1775'},
			        {name: 'relevanceGR2008'},
			        {name: 'relevanceEditButton'},
					{name: 'relevanceViewButton'},
			        {name: 'relevance1435EditButton'},
			        {name: 'relevanceEditMsg'},
			        {name: 'gxpFlag'},
			        {name: 'riskAnalysisYN'},
			        {name: 'itsecGroup'},
			        {name: 'referencedTemplate'},
					{name: 'referencedTemplateInvalid'},
					{name: 'checkItsecGroupWindowTitle'},
					{name: 'checkItsecGroupWindowMessage'},
	
					// license			
					{name: 'licensePanelTitle'},
					{name: 'licenselicense'},
					{name: 'licensecosts'},
					{name: 'licenseType'},
					{name: 'applicationAccessingUserCount'},
					{name: 'applicationAccessingUserCountMeasured'},
					{name: 'applicationDedicatedShared'},
					{name: 'applicationLoadClass'},
					{name: 'applicationServiceModel'},
					{name: 'version'},
					{name: 'costRunPa'},
					{name: 'costChangePa'},
					{name: 'currency'},
			        {name: 'runAccount'},
			        {name: 'changeAccount'},
			        {name: 'usingRegions'},
	
			        // support stuff
			        {name: 'supportStuffPanelTitle'},
			        {name: 'supportStuffApplication'},
			        {name: 'supportStuffUserAuthorisation'},
			        {name: 'supportStuffChangeManagement'},
			        {name: 'supportStuffUserManagement'},
			        {name: 'supportstuffUASupportingDoc'},
			        {name: 'supportstuffUAProcess'},
			        {name: 'supportstuffCMSupportingTool'},
			        {name: 'supportstuffUMProcess'},
			        {name: 'supportstuffAppDoc'},
			        {name: 'supportstuffAppRootDir'},
			        {name: 'supportstuffAppDataDir'},
			        {name: 'supportstuffAppProvidedServices'},
			        {name: 'supportstuffAppProvidedMUser'},
			        
			        // history
			        {name: 'historyPanelTitle'},
			        {name: 'historyDatetime'},
			        {name: 'historyChangeSource'},
			        {name: 'historyChangeDBUser'},
			        {name: 'historyChangeUserCWID'},
			        {name: 'historyChangeAttributeName'},
			        {name: 'historyChangeAttributeNewValue'},
			        {name: 'historyChangeAttributeOldValue'},
			        {name: 'infoType'},
					{name: 'ciId'},
	
			        // buttons        
			        {name: 'button_general_save'},
			        {name: 'button_general_back'},
			        {name: 'button_general_cancel'},
			        {name: 'button_general_search'},
			        {name: 'button_general_next'},
			        {name: 'button_general_copy'},
			        {name: 'newSearch'},
			        {name: 'findAll'},
			        
			        // general
			        {name: 'gerneral_message_loading'},
			        {name: 'gerneral_message_saving'},
			        
			        // special
			        {name: 'searchfield'},
			        {name: 'searchpanelheader'},
			        {name: 'advancedsearchpanelheader'},
			        {name: 'advancedsearchlink'},
			        {name: 'advancedsearchpluslink'},
			        {name: 'advancedsearchminuslink'},
			        
			        // search
			        {name: 'advsearchPanelTitle'},
			        {name: 'advsearchObjectType'},
			        {name: 'advsearchdescription'},
			        
			        {name: 'advsearchowner'},
			        {name: 'advsearchappowner'},
			        {name: 'advsearchappownerdelegate'},
			        {name: 'advsearchciowner'},
			        {name: 'advsearchcidelegate'},
			        {name: 'advsearchsteward'},
			        
			        {name: 'advsearchplusfieldset'},
			        
			        {name: 'rbgQueryModeContains'},
			        {name: 'rbgQueryModeBeginsWith'},
			        {name: 'rbgQueryModeExact'},
			        
			        // search result
			        {name: 'searchResultPanelTitle'},
			        {name: 'searchResultName'},
			        {name: 'searchResultAlias'},
			        {name: 'searchResultType'},
			        {name: 'searchResultCategory'},
			        {name: 'searchResultResponsible'},
			        {name: 'searchResultSubResponsible'},
			        {name: 'searchResultAppOwner'},
			        {name: 'searchResultAppSteward'},
			        {name: 'searchResultAppOwnerDelegate'},
			        {name: 'applicationManager'},
			        {name: 'applicationManagerDelegate'},
			        
			        // wizard
			        {name: 'createpanelheader'},
			        {name: 'createstartbutton'},
			        {name: 'createbackbutton'},
			        {name: 'createcancelbutton'},
			        {name: 'createnextbutton'},
			        {name: 'createfinishbutton'},
			        {name: 'ciCreateWizardPage0'},
			        {name: 'createIntroText'},
			        {name: 'wizardcbskip'},
			        
			        {name: 'ciCreateWizardPage1'},
			        {name: 'wizardobjectType'},
			        {name: 'wizardapplicationName'},
			        {name: 'wizardapplicationNameSAP'},
			        {name: 'wizardapplicationNameSAP1'},
			        {name: 'wizardapplicationNameSAP2'},
			        {name: 'wizardapplicationNameSAP3'},
			        {name: 'wizardapplicationAlias'},
			        {name: 'wizardcomments'},
			        {name: 'wizardRelevance'},
			        {name: 'labelwizardrelevanceGR1920'},
			        {name: 'labelwizardrelevanceGR1435'},
			        {name: 'labelwizardrelevanceGR1775'},
			        {name: 'labelwizardrelevanceGR2008'},
			        {name: 'labelwizardrelevanceGxp'},
			        {name: 'wizardisTemplate'},
			        {name: 'tfApplicationIdW'},
			        {name: 'labeltfApplicationOwnerCompanyW'},
			        {name: 'wizardapplicationNameSAPillegal'},
			        
			        
			        {name: 'ciCreateWizardPage2'},
			        {name: 'wizardBasics'},
			        {name: 'wizardlifecycleStatus'},
			        {name: 'wizardoperationalStatus'},
			        {name: 'wizardapplicationBusinessCat'},
			        {name: 'wizardapplicationCat2'},
			        {name: 'wizardAgreements'},
			        {name: 'wizardsla'},
			        {name: 'wizardserviceContract'},
			        {name: 'wizardseverityLevel'},
			        {name: 'wizardbusinessEssential'},
			        {name: 'lvApplicationUsingRegionsW'},

			        {name: 'ciCreateWizardPage3'},
			        {name: 'wizardAppowner'},
			        {name: 'labelwizardapplicationOwner'},
			        {name: 'labelwizardapplicationOwnerDelegate'},
			        {name: 'wizardCiowner'},
			        {name: 'wizardCiownerApplication'},
			        {name: 'labelwizardciResponsible'},
			        {name: 'labelwizardciSubResponsible'},
			        
			        {name: 'wizardallowedNameText'},
			        {name: 'wizardallowedAliasText'},
			        {name: 'wizardRequiredField'},
			        
			        {name: 'wizardDataNotValid'},
			        {name: 'wizardCancelQuestion'},
			        {name: 'wizardCancelTitle'},
			        {name: 'wizardSaveSuccessTitle'},
			        {name: 'wizardSaveSuccess'},
			        {name: 'wizardSaveFailTitle'},
			        {name: 'wizardSaveFail'},
			        
			        {name: 'dynamicWindowDataChangedTitle'},
			        {name: 'dynamicWindowDataChangedText'},
			        {name: 'dynamicWindowDataChangedSaveButtonText'},
			        {name: 'dynamicWindowDataChangedSaveButtonDiscard'},
			        {name: 'dynamicWindowDataChangedSaveButtonBack'},
	
			        {name: 'dynamicWindowDataSavedTitle'},
			        {name: 'dynamicWindowDataSavedText'},
			        {name: 'dynamicWindowDataSavedOKButtonText'},
			        {name: 'dynamicWindowDataSaveFailTitle'},
	
			        {name: 'dynamicWindowDataSavedErrorTitle'},
			        {name: 'dynamicWindowDataSavedErrorOKButtonText'},
			        
			        {name: 'dynamicWindowCiTypeNotSupportedWarningTitle'},
			        {name: 'dynamicWindowCiTypeNotSupportedWarningText'},
			        {name: 'dynamicWindowCiTypeNotSupportedWarningOKButtonText'},
			        
			        {name: 'dynamicWindowCancelConfirmationTitle'},
			        {name: 'dynamicWindowCancelConfirmationText'},
			        {name: 'dynamicWindowCancelConfirmationButtonOKText'},
			        {name: 'dynamicWindowCancelConfirmationButtonNOText'},
			        
			        {name: 'dynamicWindowAfterAppSaveContinueEditingButtonText'},
			        {name: 'dynamicWindowAfterAppSaveNewCiButtonText'},
			        {name: 'dynamicWindowAfterAppSaveBackToSearchButtonText'},
			        
			        {name: 'dynamicWindowNonBYTsecTitle'},
			        {name: 'dynamicWindowNonBYTsecText'},
			        
			        {name: 'dynamicWindowConfirmDeleteTitle'},
			        {name: 'dynamicWindowConfirmDeleteText'},
			        
			        
			        {name: 'ciCopyFromViewTitle'},
			        {name: 'ciCopyFromDetailViewHeaderLabel'},
			        {name: 'ciCopyFromDetailViewTitle'},
			        
			        {name: 'createstartpagewizardtext'},
			        {name: 'createstartpagewizardbutton'},
			        {name: 'createstartpagecopyfromtext'},
			        {name: 'createstartpagecopyfrombutton'},
			        {name: 'createstartpagedeletetext'},
			        {name: 'createstartpagedeletebutton'},
	
			        
			        {name: 'compliance1435WindowTitle'},
			        {name: 'compliance1435WindowItSet'},
			        {name: 'compliance1435WindowUseAsTemplate'},
			        {name: 'compliance1435WindowLink'},
			        {name: 'compliance1435WindowItSecGroup'},
			        
			        {name: 'complianceWindowTitle'},
			        {name: 'complianceWindowControls'},
			        
			        {name: 'RelevanceICSSecurityManagement'},
			        {name: 'RelevanceICSAccessManagement'},
			        {name: 'RelevanceICSITManagement'},
			        {name: 'LinkCiType'},
			        {name: 'LinkCi'},
			        
			        {name: 'complianceWindowStatement'},
			        {name: 'complianceWindowStatementUntreated'},
			        {name: 'complianceWindowStatementDispensable'},
			        {name: 'complianceWindowCompliant'},
			        {name: 'complianceWindowJustification'},
			        {name: 'complianceStatementInfo'},
			        
			        {name: 'complianceWindowGap'},
			        {name: 'complianceWindowGapDescription'},
			        {name: 'complianceWindowGapElimination'},
			        {name: 'complianceWindowGapResponsible'},
			        {name: 'complianceWindowGapClass'},
			        {name: 'complianceWindowPlanOfAction'},
			        {name: 'complianceWindowGapClass'},
			        {name: 'complianceWindowTargetDate'},
			        
			        {name: 'complianceWindowRiskAnalysisAndMgmt'},
			        {name: 'complianceWindowRiskAnalysisByFreeText'},
			        {name: 'complianceWindowOccurenceOfDamagePerYear'},
			        {name: 'complianceWindowMaximumDamagePerEvent'},
			        {name: 'complianceWindowMitigationPotential'},
			        {name: 'complianceWindowRiskMitigation'},
			        {name: 'complianceWindowSignee'},
			        {name: 'complianceWindowDateOfApproval'},
			        {name: 'complianceRiskAnalysisAndMgmtTypeSelectTitle'},
			        {name: 'complianceRiskAnalysisAndMgmtTypeSelectMessage'},
			        {name: 'complianceRiskAnalysisAndMgmtTypeFreeText'},
			        {name: 'complianceRiskAnalysisAndMgmtTypeNonFreeText'},
			        
			        
			        {name: 'CiConnectionsViewTitle'},
			        {name: 'CiConnectionsViewUpStreamConnections'},
			        {name: 'CiConnectionsViewDownStreamConnections'},
			        {name: 'CiConnectionsViewEditConnections'},
			        {name: 'CiConnectionsViewObjectType'},
			        {name: 'CiConnectionsViewQuickSearch'},
			        {name: 'CiConnectionsViewSearch'},
			        
			        {name: 'CiConnectionsViewMsgSuccessfullyAdded'},
			        {name: 'CiConnectionsViewMsgSuccessfullyDeleted'},
			        {name: 'CiConnectionsViewMsgAlreadyExists'},
			        {name: 'CiConnectionsViewMsgNotAllowed'},
			        
			        {name: 'dynamicWindowFForIETitle'},
			        {name: 'dynamicWindowFForIEText'},
			        {name: 'dynamicWindowFForIEContinueFFButtonText'},
			        {name: 'dynamicWindowFForIEKeepIEButtonText'},
	
			        {name: 'CiDeleteViewTitle'},
			        {name: 'CiDeleteViewButtonDelete'},
			        
			        {name: 'CiOuSearchViewTitle'},
			        {name: 'CiOuSearchViewOrgUnit'},
			        {name: 'CiOuSearchViewOUSearchQueryMode'},
			        {name: 'CiOuSearchViewOUSearchOwnerType'},
			        
			        {name: 'ToolbarInvalidCat2SAP'},
			        {name: 'SAPNameToStandardNameInvalid'},
			        {name: 'StandardNameToSAPNameInvalid'},
			        
					{name: 'ToolbarInvalidTemplate'},
			        {name: 'dynamicWindowCIreactivationPrompt'}
			    ]
			});
		
			return languageStore;
		},
		
		
		createLanguageToolTipStoreEN: function() {
			return this.createLanguageToolTipStore('EN');
		},
		createLanguageToolTipStoreDE: function() {
			return this.createLanguageToolTipStore('DE');
		},
		createLanguageToolTipStore: function(language) {
			var url = language == 'de' || language == 'DE' ? 'lang/german_tooltips.xml' : 'lang/english_tooltips.xml';
			
			var languageToolTipStore = new Ext.data.XmlStore({
			    autoLoad: false,
			    storeId: 'languageToolTipStore_' + language,
				url: url,
		
			    record: 'Items',
			    
			    fields: [
			        //specifics
			        {name: 'applicationName'},
			        {name: 'applicationNameText'},
			        {name: 'applicationAlias'},
			        {name: 'applicationAliasText'},
			        {name: 'barApplicationRelevant'},
			        {name: 'barApplicationRelevantText'},
			        {name: 'barApplicationId'},
			        {name: 'barApplicationIdText'},
			        {name: 'version'},
			        {name: 'versionText'},
			        {name: 'applicationCat2'},
			        {name: 'applicationCat2Text'},
			        {name: 'lifecycleStatus'},
			        {name: 'lifecycleStatusText'},
			        {name: 'organisationalScope'},
			        {name: 'organisationalScopeText'},
			        {name: 'operationalStatus'},
			        {name: 'operationalStatusText'},
			        {name: 'comments'},
			        {name: 'commentsText'},
			        
			        {name: 'applicationBusinessCat'},
			        {name: 'applicationBusinessCatText'},
			        {name: 'dataClass'},
			        {name: 'dataClassText'},
			        {name: 'businessProcess'},
			        {name: 'businessProcessText'},
	
			        // contacts
			        {name: 'applicationOwner'},
			        {name: 'applicationOwnerText'},
			        {name: 'applicationSteward'},
			        {name: 'applicationStewardText'},
			        {name: 'applicationOwnerDelegate'},
			        {name: 'applicationOwnerDelegateText'},
			        
			        {name: 'ciResponsible'},
			        {name: 'ciResponsibleText'},
			        {name: 'ciSubResponsible'},
			        {name: 'ciSubResponsibleText'},
			        
			        {name: 'gpsccontactCiOwner'},
			        {name: 'gpsccontactCiOwnerText'},
			        {name: 'gpsccontactResponsibleAtCustomerSide'},
			        {name: 'gpsccontactResponsibleAtCustomerSideText'},
			        {name: 'gpsccontactSystemResponsible'},
			        {name: 'gpsccontactSystemResponsibleText'},
			        {name: 'gpsccontactSupportGroup'},
			        {name: 'gpsccontactSupportGroupText'},
			        {name: 'gpsccontactChangeTeam'},
			        {name: 'gpsccontactChangeTeamText'},
			        {name: 'gpsccontactServiceCoordinator'},
			        {name: 'gpsccontactServiceCoordinatorText'},
			        {name: 'gpsccontactServiceCoordinatorIndiv'},
			        {name: 'gpsccontactServiceCoordinatorIndivText'},
			        {name: 'gpsccontactImplementationTeam'},
			        {name: 'gpsccontactImplementationTeamText'},
			        {name: 'gpsccontactEscalation'},
			        {name: 'gpsccontactEscalationText'},
			        {name: 'gpsccontactEscalationIndiv'},
			        {name: 'gpsccontactEscalationIndivText'},
			        {name: 'gpsccontactImpactedBusiness'},
			        {name: 'gpsccontactImpactedBusinessText'},
			        {name: 'gpsccontactOwningBusinessGroup'},
			        {name: 'gpsccontactOwningBusinessGroupText'},
			        {name: 'gpsccontactBusinessOwnerRepresentative'},
			        {name: 'gpsccontactBusinessOwnerRepresentativeText'},
			        
	
			        // agreements
			        {name: 'slaName'},
			        {name: 'slaNameText'},
			        {name: 'priorityLevel'},
			        {name: 'priorityLevelText'},
			        {name: 'serviceContract'},
			        {name: 'serviceContractText'},
			        {name: 'severityLevel'},
			        {name: 'severityLevelText'},
			        {name: 'businessEssential'},
			        {name: 'businessEssentialText'},
			        
			        // protection
					{name: 'itSecSbAvailabilityId'},
					{name: 'itSecSbAvailabilityIdText'},
					{name: 'itSecSbAvailabilityDescription'},
					{name: 'itSecSbAvailabilityDescriptionText'},
			        {name: 'itSecSbAppProtection'},
			        {name: 'itSecSbAppProtectionText'},
			        {name: 'protectionClassInformation'},
			        {name: 'protectionClassInformationText'},
					{name: 'protectionClassInformationExplanation'},
			        {name: 'protectionClassInformationExplanationText'},
			        
	
					
					// compliance
					{name: 'itsetName'},
					{name: 'itsetNameText'},
					{name: 'isTemplate'},
					{name: 'isTemplateText'},
					{name: 'referencedTemplate'},
					{name: 'referencedTemplateText'},
					{name: 'itsecGroup'},
					{name: 'itsecGroupText'},
					
			        {name: 'relevanceGR1435'},
			        {name: 'relevanceGR1435Text'},
			        {name: 'relevanceGR1775'},
			        {name: 'relevanceGR1775Text'},
			        {name: 'relevanceGR1920'},
			        {name: 'relevanceGR1920Text'},
			        {name: 'relevanceGR2008'},
			        {name: 'relevanceGR2008Text'},
			        {name: 'gxpFlag'},
			        {name: 'gxpFlagText'},
			        {name: 'riskAnalysisYN'},
			        {name: 'riskAnalysisYNText'},
			        {name: 'itsecGroup'},
			        {name: 'itsecGroupText'},
			        {name: 'references'},
			        {name: 'referencesText'},
			        
			        
					// license
					{name: 'licenseType'},
					{name: 'licenseTypeText'},
			        {name: 'applicationAccessingUserCount'},
					{name: 'applicationAccessingUserCountText'},
		        	{name: 'applicationAccessingUserCountMeasured'},
		    		{name: 'applicationAccessingUserCountMeasuredText'},
		    		{name: 'dedicated'},
		    		{name: 'dedicatedText'},
		    		{name: 'loadClass'},
		    		{name: 'loadClassText'},
		    		{name: 'serviceModel'},
		    		{name: 'serviceModelText'},
					{name: 'costRunPa'},
					{name: 'costRunPaText'},
					{name: 'costChangePa'},
					{name: 'costChangePaText'},
					{name: 'currency'},
					{name: 'currencyText'},
					{name: 'runAccount'},
					{name: 'runAccountText'},
					{name: 'changeAccount'},
					{name: 'changeAccountText'},
					{name: 'applicationUsingRegions'},
					{name: 'applicationUsingRegionsText'},
					
			        // support stuff
					{name: 'supportstuffAppDoc'},
					{name: 'supportstuffAppDocText'},
			        {name: 'supportstuffAppRootDir'},
			        {name: 'supportstuffAppRootDirText'},
			        {name: 'supportstuffAppDataDir'},
			        {name: 'supportstuffAppDataDirText'},
			        {name: 'supportstuffAppProvidedServices'},
			        {name: 'supportstuffAppProvidedServicesText'},
			        {name: 'supportstuffAppProvidedMUser'},
			        {name: 'supportstuffAppProvidedMUserText'},
			        {name: 'supportstuffUASupportingDoc'},
			        {name: 'supportstuffUASupportingDocText'},
			        {name: 'supportstuffUAProcess'},
			        {name: 'supportstuffUAProcessText'},
			        {name: 'supportstuffCMSupportingTool'},
			        {name: 'supportstuffCMSupportingToolText'},
			        {name: 'supportstuffUMProcess'},
			        {name: 'supportstuffUMProcessText'}
			    ]
			});
			
			return languageToolTipStore;
		},
		
		createApplicationContactsStore: function() {
			var applicationContactsRecord = Ext.data.Record.create([ {
				name: 'groupId',
				mapping: 'applicationContactEntryDTO > groupId'
			}, {
				name: 'groupName',
				mapping: 'applicationContactEntryDTO > groupName'
			}, {
				name: 'personName',
				mapping: 'applicationContactEntryDTO > personName'
			}, {
				name: 'cwid',
				mapping: 'applicationContactEntryDTO > cwid'
			}, {
				name: 'groupTypeId',
				mapping: 'groupTypeId'
			}, {
				name: 'groupTypeName',
				mapping: 'groupTypeName'
			}, {
				name: 'individualContactYN',
				mapping: 'individualContactYN'
			}, {
				name: 'maxContacts',
				mapping: 'maxContacts'
			}, {
				name: 'minContacts',
				mapping: 'minContacts'
			}]);
	
			var applicationContactsReader = new Ext.data.XmlReader({
				record: 'applicationContactGroupDTO'
			}, applicationContactsRecord);
	
			var applicationContactsStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'applicationContactsStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'getApplicationContacts',
					timeout: 120000,
					reader: applicationContactsReader
				}),
				
				fields: [ 'groupId', 'groupName', 'personName', 'groupTypeId', 'groupTypeName', 'individualContactYN',	'maxContacts', 'minContacts' ],

				reader: applicationContactsReader
				
//				listeners: {
//					beforeload: function(store, options) {
//						applicationContactsStore.baseParams.cwid = cwid;
//						applicationContactsStore.baseParams.token = token;
//						applicationContactsStore.baseParams.applicationId = selectedCIId;
//					},
//					load: function(store, records, options) {
//						for(var i = 0; i < records.length; ++i)
//							setContactInformation(records[i]);
//						
//						fillDetailsInformation();
//					}
//				}
			});
			
			return applicationContactsStore;
		},
		
		createHistoryListStore: function() {
			var historyListRecord = Ext.data.Record.create([ {
				name : 'id',
				mapping : 'id'
			}, {
				name : 'tableId',
				mapping : 'tableId'
			}, {
				name : 'datetime',
				mapping : 'datetime'
			}, {
				name : 'changeSource',
				mapping : 'changeSource'
			}, {
				name : 'changeDBUser',
				mapping : 'changeDBUser'
			}, {
				name : 'changeUserCWID',
				mapping : 'changeUserCWID'
			}, {
				name : 'changeUserName',
				mapping : 'changeUserName'
			}, {
				name : 'changeAttributeName',
				mapping : 'changeAttributeName'
			}, {
				name : 'ciId',
				mapping : 'ciId'
			}, {
				name : 'changeAttributeOldValue',
				mapping : 'changeAttributeOldValue'
			}, {
				name : 'changeAttributeNewValue',
				mapping : 'changeAttributeNewValue'
			}, {
				name: 'infoType',
				mapping: 'infoType'
			}]);
	
	
			var historyListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, historyListRecord);
	
			var historyListStore = new Ext.data.GroupingStore({//XmlStore
				autoDestroy: false,
				storeId: 'historyListStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'getApplicationHistory',
					timeout: 120000,
					reader: historyListReader
				}),
				
				fields: [ 'id', 'tableId', 'ciId', 'datetime', 'changeSource', 'changeDBUser', 'changeUserCWID', 'changeUserName', 'changeAttributeNewValue', 'changeAttributeOldValue', 'infoType'],

				reader: historyListReader,
				groupField: 'infoType'
			});
			
			return historyListStore;
		},
		
		createCiTypeListStore: function() {
			var ciTypeListRecord = Ext.data.Record.create([
		        {name: 'ciTypeId'},
		        {name: 'ciTypeName'}
		    ]);
		
		    var ciTypeListReader = new Ext.data.XmlReader({
		    	record: 'return',//return ciTypeDTO
		        idProperty: 'ciTypeId',
		        	
		        fields: ['ciTypeId', 'ciTypeName']
		    }, ciTypeListRecord); 
			
		    var ciTypeListStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	storeId: 'ciTypeListStore',
		    	autoLoad: false,
		    	
		      	fields: ['ciTypeId', 'ciTypeName'],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/AIRToolsWSPort',
		      		loadMethod: 'getCiTypes',
		      		timeout: 120000,
		      		reader: ciTypeListReader
		      	}),
		    	
		      	reader: ciTypeListReader
		    });
		    
		    return ciTypeListStore;
		},
		
		createDwhEntityListStore: function() {
			var dwhEntityListRecord = Ext.data.Record.create([
		        {name: 'ciId'},
		        {name: 'ciType'},
		        {name: 'ciName'},
		        {name: 'dwhEntityId'},
		        {name: 'ciAlias'},
		        {name: 'tableId'},
		        {name: 'ciOwner'},
		        {name: 'ciOwnerDelegate'},
		        {name: 'appOwner'},
		        {name: 'appOwnerDelegate'},
		        {name: 'appSteward'},
		        {name: 'operationalStatus'},
		        {name: 'categoryIt'},
		        {name: 'gxpRelevance'},
		        {name: 'itSet'},
		        {name: 'serviceContract'},
		        {name: 'severityLevel'},
		        {name: 'priorityLevel'},
		        {name: 'sla'},
		        {name: 'lifecycleStatus'},
		        {name: 'source'},
		        {name: 'businessEssential'},
		        {name: 'template'}
		    ]);
		
		    var dwhEntityListReader = new Ext.data.XmlReader({
		    	record: 'dwhEntityDTO',//return ciTypeDTO
		    	totalProperty: 'total',
		        idProperty: 'ciId',
		        	
		        fields: ['ciId', 'ciType', 'ciName', 'ciAlias', 'dwhEntityId', 'tableId', 'ciOwner', 'ciOwnerDelegate', 'appOwner', 'appOwnerDelegate', 'appSteward', 'operationalStatus', 'categoryIt', 'gxpRelevance', 'itSet', 'serviceContract', 'severityLevel', 'priorityLevel', 'sla', 'lifecycleStatus', 'source', 'businessEssential', 'template']
		    }, dwhEntityListRecord); 
			
		    var dwhEntityListStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: ['ciId', 'ciType', 'ciName', 'ciAlias', 'dwhEntityId', 'tableId', 'ciOwner', 'ciOwnerDelegate', 'appOwner', 'appOwnerDelegate', 'appSteward', 'operationalStatus', 'categoryIt', 'gxpRelevance', 'itSet', 'serviceContract', 'severityLevel', 'priorityLevel', 'sla', 'lifecycleStatus', 'source', 'businessEssential', 'template'],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/CiEntityWSPort',
		      		loadMethod: 'findByTypeAndName',
		      		timeout: 120000,
		      		reader: dwhEntityListReader
		      	}),
		    	
		      	reader: dwhEntityListReader
		    });
		    
		    return dwhEntityListStore;
		},
		
		//====================== initial stores ====================== var url = language == 'de' || language == 'DE' ? 'lang/german.xml' : 'lang/english.xml';
		
		createAclStore: function() {
			var aclStore = new Ext.data.XmlStore({
			    autoLoad: false,//false true
			    storeId: 'aclStore',
			    url: 'config/AttributeProperties.xml', // config/AttributeProperties.xml

			    record: 'Identifier', // records will have an 'Identifier' tag
			    
			    fields: [ 'id', 'Mandatory', 'Relevance', 'EditableIfSource', 'attributeType', 'attributeLength', 'attributeMask', 'UseInWizard', 'rolesAllowed' ]//restrictionLevel
			});
			
			return aclStore;
		},
		
		createDedicatedListStore: function() {
			var dedicatedListRecord = Ext.data.Record.create([
			     { name: 'text', mapping: 'dedicatedTxt' },
			     { name: 'id', mapping: 'dedicatedId' }
			]);
			
			var dedicatedListReader = new Ext.data.XmlReader({
			    record: 'return',
			    idProperty: 'id'
			}, dedicatedListRecord); 
			
			var dedicatedListStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'dedicatedListStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/AIRToolsWSPort',
					loadMethod: 'getDedicatedList',
					timeout: 120000,
					reader: dedicatedListReader
				}),
				
				fields: [ 'id', 'text' ],

				reader: dedicatedListReader
			});
			
			return dedicatedListStore;
		},
		
		createOrganisationalScopeListStore: function() {
			var organisationalScopeListRecord = Ext.data.Record.create([
 			     { name: 'id', mapping: 'organisationalScopeId' },
 			     { name: 'name', mapping: 'organisationalScopeTxt' }
 			]);
 			
 			var organisationalScopeListReader = new Ext.data.XmlReader({
 			    record: 'return',
 			    idProperty: 'id'
 			}, organisationalScopeListRecord); 
 			
 			var organisationalScopeListStore = new Ext.data.XmlStore({
 			    autoDestroy: true,
 			    storeId: 'organisationalScopeListStore',
 			    autoLoad: false,
 			    
 				proxy: new Ext.ux.soap.SoapProxy({
 					url: webcontext +'/AIRToolsWSPort',
 					loadMethod: 'getOrganisationalScopeList',
 					timeout: 120000,
 					reader: organisationalScopeListReader
 				}),
 				
 				fields: [ 'id', 'name' ],

 				reader: organisationalScopeListReader
 			});
 			
 			return organisationalScopeListStore;
 		},
		
		createLoadClassListStore: function() {
			var loadClassListRecord = Ext.data.Record.create([
			     {name: 'text', mapping: 'loadClassTxt'},
			     {name: 'id', mapping: 'loadClassId'}
			]);
			
			var loadClassListReader = new Ext.data.XmlReader({
			    record: 'return',
			    idProperty: 'id'
			}, loadClassListRecord); 
			
			var loadClassListStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'loadClassListStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/AIRToolsWSPort',
					loadMethod: 'getLoadClassList',
					timeout: 120000,
					reader: loadClassListReader
				}),
				
				fields: [ 'id', 'text' ],

				reader: loadClassListReader
			});
			
			return loadClassListStore;
		},
		
		createServiceModelListStore: function() {
			var serviceModelListRecord = Ext.data.Record.create([
			     {name: 'text', mapping: 'serviceModelTxt'},
			     {name: 'id', mapping: 'serviceModelId'}
			]);
			
			var serviceModelListReader = new Ext.data.XmlReader({
			    record: 'return',
			    idProperty: 'id'
			}, serviceModelListRecord); 
			
			var serviceModelListStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'serviceModelListStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/AIRToolsWSPort',
					loadMethod: 'getServiceModelList',
					timeout: 120000,
					reader: serviceModelListReader
				}),
				
				fields: [ 'id', 'text' ],

				reader: serviceModelListReader
			});
			
			return serviceModelListStore;
		},

		createApplicationProcessStore: function() {
			var applicationProcessRecord = Ext.data.Record.create([
			    { name: 'id' },
			    { name: 'text' }
			]);
			
			var applicationProcessReader = new Ext.data.XmlReader({
				record: 'viewdataDTO'
			}, applicationProcessRecord);
			
			var applicationProcessStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'applicationProcessStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'getApplicationProcess',
					timeout: 120000,
					reader: applicationProcessReader
				}),
	
				fields: [ 'id', 'text' ],
				reader: applicationProcessReader
			});
			
			return applicationProcessStore;
		},
		
		//====================== store refacs ======================
		createGxpFlagListStore: function() {
			var gxpFlagListRecord = Ext.data.Record.create([
	            { name: 'id', mapping: 'gxpFlagId' },
	            { name: 'text', mapping: 'gxpFlagTxt' }
	       	]);
	
			var gxpFlagListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
			}, gxpFlagListRecord); 
			
			var gxpFlagListStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'gxpFlagListStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/AIRToolsWSPort',
					loadMethod: 'getGxpFlagList',
					timeout: 120000,
					reader: gxpFlagListReader
				}),
				
				fields: [ 'id',	'text' ],
	
				reader : gxpFlagListReader
			});
			
			return gxpFlagListStore;
		},
		//====================== store refacs ======================
			
		
//		createCiConnectionListStore: function() {
//			var ciConnectionRecordDef = Ext.data.Record.create([
//	            {name: 'id'},
//	            {name: 'type'}, 
//	            {name: 'name'}, 
//	            {name: 'alias'},
//	            {name: 'responsible'},
//	            {name: 'subResponsible'},
//	            {name: 'category'}, 
//	            {name: 'tableId'},
//	            {name: 'ciId'},
//	            {name: 'direction'},
//	            {name: 'groupsort'},
//	            {name: 'status'}
//	        ]);
//	
//	        var ciConnectionListReader = new Ext.data.XmlReader({
//	            totalProperty: 'countResultSet',
//	            record: 'viewdataDTO',
//	            idProperty: 'id'
//	        }, ciConnectionRecordDef); 
//	
//	        var ciConnectionListStore = new Ext.data.GroupingStore({
//	            autoDestroy: true,
//	            storeId: 'ciConnectionStore',
//	            autoLoad: false,
////	            remoteSort: true,
//	            pruneModifiedRecords: true,
//	            
//	        	proxy: new Ext.ux.soap.SoapProxy({
//	        		url: webcontext + '/ApplicationWSPort',
//	        		loadMethod: 'getAllConnections',
//	        		timeout: 120000,
//	        		reader: ciConnectionListReader
//	        	}),
//	        	
//	            baseParams: {
//	    		 	cwid: AIR.AirApplicationManager.getCwid(),
//	    		 	token: AIR.AirApplicationManager.getToken(),
//	        		id: -1,
//	        		start: 0,	
//	        		limit : 20
//	        	},
//	        	
//	        	fields: [
//	    	         'id',
//	    	         'type',
//	    	         'name',
//	    	         'alias',
//	    	         'responsible',
//	    	         'subResponsible',
//	    	         'category',
//	    	         'tableId',
//	    	         'ciId',
//	    	         'direction',
//	    	         'groupsort',
//	    	         'status'
//	         	],
//	        	groupField: 'groupsort',
//	
//	            // reader configs
//	        	reader: ciConnectionListReader,
//	        	listeners: {
//	        		beforeload: function(store, options) {
//	        			ciConnectionListStore.baseParams.cwid = cwid;
//	        			ciConnectionListStore.baseParams.token= token;
//	        			ciConnectionListStore.baseParams.applicationId = selectedCIId;
//	        		}
//	        	}
//	        });
//	        
//	        return ciConnectionListStore;
//		},
		
		createApplicationListStore: function() {
			var applicationListRecord = Ext.data.Record.create([
			    {name: 'applicationId', mapping: 'applicationId'},
			    {name: 'applicationName'},
			    {name: 'applicationAlias'},
			    {name: 'applicationCat1Txt'},
			    {name: 'applicationCat2Txt'},
			    {name: 'responsible'},
			    {name: 'subResponsible'},
			    {name: 'applicationOwner'},
			    {name: 'applicationSteward'},
			    {name: 'applicationOwnerDelegate'},
			    {name: 'tableId'}
			]);
	
			var applicationListReader = new Ext.data.XmlReader({
			    totalProperty: 'countResultSet',
			    record: 'applicationDTO',
			    idProperty: 'applicationId'
			}, applicationListRecord); 
	
			var applicationListStore = new Ext.data.GroupingStore({//XmlStore
			    autoDestroy: true,
			    autoLoad: false,
//			    remoteSort: true,
			    
				fields: [
					'applicationId', 
					'applicationName', 
					'applicationAlias',
					'advancedsearch',
					'responsible', 
					'subResponsible',
					'applicationCat2Txt',
					'applicationCat1Txt',
					'applicationOwner',
					'applicationSteward',
					'applicationOwnerDelegate',
					'tableId'
				],
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/ApplicationWSPort',
					loadMethod: 'findApplications',
					timeout: 120000,
					reader: applicationListReader
				}),
				
				reader: applicationListReader,
	
			    baseParams: {
				 	cwid: AIR.AirApplicationManager.getCwid(),
				 	token: AIR.AirApplicationManager.getToken(),
					searchAction: searchAction,
					start: 0,	
					limit: 20
				},
				
				getGroupState: Ext.emptyFn
			});
			
			return applicationListStore;
		},
		
		createApplicationStore: function() {
			var applicationDetailRecord = Ext.data.Record.create([{
				name: 'applicationId',
				mapping: 'applicationDTO > applicationId'
			}, {
				name: 'barApplicationId',
				mapping: 'applicationDTO > barApplicationId'
			}, {
				name: 'applicationName',
				mapping: 'applicationDTO > applicationName'
			}, {
				name: 'applicationAlias',
				mapping: 'applicationDTO > applicationAlias'
			}, {
				name: 'itsecGroupId',
				mapping: 'applicationDTO > itsecGroupId'
			}/*, {
				name : 'itsecGroupTxt',
				mapping : 'applicationDTO > itsecGroup'
			}, {
				name : 'refId',
				mapping : 'applicationDTO > refId'
			}, {
				name : 'references',
				mapping : 'applicationDTO > refTxt'
			}*/]);
			
			var applicationReader = new Ext.data.XmlReader({
				record: 'return'
			}, applicationRecord);

			var applicationStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'applicationStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod : 'getApplication',
					timeout: 120000,
					reader: applicationDetailReader
				}),
				
				fields: [ 
					'applicationDTO', 'applicationId', 'applicationName', 'applicationAlias', 'applicationCat1Id',
					'applicationCat1Txt', 'applicationCat2', 'applicationCat2Txt', 'isEditable'
				],

				reader: applicationReader
			});
			
			return applicationStore;
		},
		
		createApplicationDetailStore: function() {
			var applicationDetailRecord = Ext.data.Record.create([{
				name : 'applicationId',
				mapping : 'applicationDTO > applicationId'
			}, {
				name : 'barApplicationId',
				mapping : 'applicationDTO > barApplicationId'
			}, {
				name : 'barRelevance',
				mapping : 'applicationDTO > barRelevance'
			}, {
				name : 'applicationName',
				mapping : 'applicationDTO > applicationName'
			}, {
				name : 'applicationAlias',
				mapping : 'applicationDTO > applicationAlias'
			}, {
				name : 'categoryBusinessId',
				mapping : 'applicationDTO > categoryBusinessId'
			}, {
				name : 'categoryBusiness',
				mapping : 'applicationDTO > categoryBusiness'
			}, {
				name : 'dataClassId',
				mapping : 'applicationDTO > classDataId'
			}, {
				name : 'dataClass',
				mapping : 'applicationDTO > classData'
			}, {
				name : 'applicationCat1Id',
				mapping : 'applicationDTO > applicationCat1Id'
			}, {
				name : 'applicationCat1Txt',
				mapping : 'applicationDTO > applicationCat1Txt'
			}, {
				name : 'applicationCat2',
				mapping : 'applicationDTO > applicationCat2Id'
			}, {
				name : 'applicationCat2Txt',
				mapping : 'applicationDTO > applicationCat2Txt'
			}, {
				name : 'clusterCode',
				mapping : 'applicationDTO > clusterCode'
			}, {
				name : 'clusterType',
				mapping : 'applicationDTO > clusterType'
			}, {
				name : 'lifecycleStatusId',
				mapping : 'applicationDTO > lifecycleStatusId'
			}, {
				name : 'lifecycleStatusTxt',
				mapping : 'applicationDTO > lifecycleStatusTxt'
			}, {
				name : 'organisationalScope',
				mapping : 'applicationDTO > organisationalScope'
			}, {
				name : 'operationalStatusId',
				mapping : 'applicationDTO > operationalStatusId'
			}, {
				name : 'operationalStatusTxt',
				mapping : 'applicationDTO > operationalStatusTxt'
			}, {
				name : 'ciResponsible',
				mapping : 'applicationDTO > responsible'
			}, {
				name : 'ciResponsibleHidden',
				mapping : 'applicationDTO > responsibleHidden'
			}, {
				name : 'ciSubResponsible',
				mapping : 'applicationDTO > subResponsible'
			}, {
				name : 'ciSubResponsibleHidden',
				mapping : 'applicationDTO > subResponsibleHidden'
			}, {
				name : 'applicationOwner',
				mapping : 'applicationDTO > applicationOwner'
			}, {
				name : 'applicationOwnerHidden',
				mapping : 'applicationDTO > applicationOwnerHidden'
			}, {
				name : 'applicationOwnerDelegate',
				mapping : 'applicationDTO > applicationOwnerDelegate'
			}, {
				name : 'applicationOwnerDelegateHidden',
				mapping : 'applicationDTO > applicationOwnerDelegateHidden'
			}, {
				name : 'applicationSteward',
				mapping : 'applicationDTO > applicationSteward'
			}, {
				name : 'applicationStewardHidden',
				mapping : 'applicationDTO > applicationStewardHidden'
			}, {
				name : 'itset',
				mapping : 'applicationDTO > itset'
			}, {
				name : 'itsetName',
				mapping : 'applicationDTO > itsetName'
			}, {
				name : 'isTemplate',
				mapping : 'applicationDTO > template'
			}, {
				name : 'isTemplateReferencedByItem',
				mapping : 'applicationDTO > templateReferencedByItem'
			}, {
				name : 'relevanceGR1435',
				mapping : 'applicationDTO > relevanceGR1435'
			}, {
				name : 'relevanceGR1775',
				mapping : 'applicationDTO > relevanceGR1775'
			}, {
				name : 'relevanceGR1920',
				mapping : 'applicationDTO > relevanceGR1920'
			}, {
				name : 'relevanceGR2008',
				mapping : 'applicationDTO > relevanceGR2008'
			}, {
				name : 'ciComplianceRequestId1435',
				mapping : 'applicationDTO > ciComplianceRequestId1435'
			}, {
				name : 'ciComplianceRequestId1775',
				mapping : 'applicationDTO > ciComplianceRequestId1775'
			}, {
				name : 'ciComplianceRequestId1920',
				mapping : 'applicationDTO > ciComplianceRequestId1920'
			}, {
				name : 'ciComplianceRequestId2008',
				mapping : 'applicationDTO > ciComplianceRequestId2008'
			}, {
				name : 'gxpFlagId',
				mapping : 'applicationDTO > gxpFlagId'
			}, {
				name : 'gxpFlagTxt',
				mapping : 'applicationDTO > gxpFlagTxt'
			}, {
				name : 'itsecGroupId',
				mapping : 'applicationDTO > itsecGroupId'
			}, {
				name : 'itsecGroupTxt',
				mapping : 'applicationDTO > itsecGroup'
			}, {
				name : 'refId',
				mapping : 'applicationDTO > refId'
			}, {
				name : 'refTxt',
				mapping : 'applicationDTO > refTxt'
			}, {
				name : 'slaId',
				mapping : 'applicationDTO > slaId'
			}, {
				name : 'sla',
				mapping : 'applicationDTO > slaName'
			}, {
				name : 'serviceContractId',
				mapping : 'applicationDTO > serviceContractId'
			}, {
				name : 'serviceContract',
				mapping : 'applicationDTO > serviceContract'
			}, {
				name : 'comments',
				mapping : 'applicationDTO > comments'
			}, {
				name : 'isEditable',
				mapping : 'applicationDTO > isEditable'
			}, {
				name : 'priorityLevelId',
				mapping : 'applicationDTO > priorityLevelId'
			}, {
				name : 'priorityLevel',
				mapping : 'applicationDTO > priorityLevel'
			}, {
				name : 'severityLevelId',
				mapping : 'applicationDTO > severityLevelId'
			}, {
				name : 'severityLevel',
				mapping : 'applicationDTO > severityLevel'
			}, {
				name : 'locationPath',
				mapping : 'applicationDTO > locationPath'
			}, {
				name : 'businessEssentialId',
				mapping : 'applicationDTO > businessEssentialId'
			}, {
				name : 'businessEssential',
				mapping : 'applicationDTO > businessEssential'
			}, {
				name : 'riskAnalysisYN',
				mapping : 'applicationDTO > riskAnalysisYN'
			}, {
				name : 'licenseType',
				mapping : 'applicationDTO > licenseTypeTxt'
			}, {
				name : 'licenseTypeId',
				mapping : 'applicationDTO > licenseTypeId'
			}, {
				name : 'applicationAccessingUserCount',
				mapping : 'applicationDTO > accessingUserCount'
			}, {
				name : 'applicationAccessingUserCountMeasured',
				mapping : 'applicationDTO > accessingUserCountMeasured'
			}, {
				name : 'loadClass',
				mapping : 'applicationDTO > loadClass'
			}, {
				name : 'serviceModel',
				mapping : 'applicationDTO > serviceModel'
			}, {
				name : 'dedicated',
				mapping : 'applicationDTO > dedicated'
			},
			
			
			{
				name : 'applicationVersion',
				mapping : 'applicationDTO > version'
			}, {
				name : 'costRunPa',
				mapping : 'applicationDTO > costRunPa'
			}, {
				name : 'costChangePa',
				mapping : 'applicationDTO > costChangePa'
			}, {
				name : 'currencyId',
				mapping : 'applicationDTO > currencyId'
			}, {
				name : 'currency',
				mapping : 'applicationDTO > currencyTxt'
			}, {
				name : 'costRunAccountId',
				mapping : 'applicationDTO > costRunAccountId'
			}, {
				name : 'costRunAccountTxt',
				mapping : 'applicationDTO > costRunAccountTxt'
			}, {
				name : 'costChangeAccountId',
				mapping : 'applicationDTO > costChangeAccountId'
			}, {
				name : 'costChangeAccountTxt',
				mapping : 'applicationDTO > costChangeAccountTxt'
			}, {
				name : 'licenseUsingRegions',
				mapping : 'applicationDTO > licenseUsingRegions'
			},

			// itSec
			{
				name : 'itSecSbAvailabilityId',
				mapping : 'applicationDTO > itSecSbAvailabilityId'
			}, {
				name : 'itSecSbAvailabilityTxt',
				mapping : 'applicationDTO > itSecSbAvailabilityTxt'
			}, {
				name : 'protectionAvailabilityDescription',
				mapping : 'applicationDTO > itSecSbAvailabilityDescription'
			}, {
				name : 'classInformationId',
				mapping : 'applicationDTO > classInformationId'
			}, {
				name : 'classInformationTxt',
				mapping : 'applicationDTO > classInformationTxt'
			}, {
				name : 'protectionClassInformationExplanation',
				mapping : 'applicationDTO > classInformationExplanation'
			}, {
				name : 'protectionApplicationProtection',
				mapping : 'applicationDTO > applicationProtection'
			},


			// support stuff
			{
				name : 'supportstuffUASupportingDoc',
				mapping : 'applicationDTO > ciSupportStuffUserAuthorizationSupportedByDocumentation'
			}, {
				name : 'supportstuffUAProcess',
				mapping : 'applicationDTO > ciSupportStuffUserAuthorizationProcess'
			}, {
				name : 'supportstuffCMSupportingTool',
				mapping : 'applicationDTO > ciSupportStuffChangeManagementSupportedByTool'
			}, {
				name : 'supportstuffUMProcess',
				mapping : 'applicationDTO > supportstuffUMProcess'
			}, {
				name : 'supportstuffAppDoc',
				mapping : 'applicationDTO > ciSupportStuffApplicationDocumentation'
			}, {
				name : 'supportstuffAppRootDir',
				mapping : 'applicationDTO > ciSupportStuffRootDirectory'
			}, {
				name : 'supportstuffAppDataDir',
				mapping : 'applicationDTO > ciSupportStuffDataDirectory'
			}, {
				name : 'supportstuffAppProvidedServices',
				mapping : 'applicationDTO > ciSupportStuffProvidedServices'
			}, {
				name : 'supportstuffAppProvidedMUser',
				mapping : 'applicationDTO > ciSupportStuffProvidedMachineUsers'
			}, {
				name : 'ciSupportStuffUserManagement',
				mapping : 'applicationDTO > ciSupportStuffUserManagement'
			},

			// insert / update infos
			{
				name : 'insertQuelle',
				mapping : 'applicationDTO > insertQuelle'
			}, {
				name : 'insertTimestamp',
				mapping : 'applicationDTO > insertTimestamp'
			}, {
				name : 'insertUser',
				mapping : 'applicationDTO > insertUser'
			}, {
				name : 'updateQuelle',
				mapping : 'applicationDTO > updateQuelle'
			}, {
				name : 'updateTimestamp',
				mapping : 'applicationDTO > updateTimestamp'
			}, {
				name : 'updateUser',
				mapping : 'applicationDTO > updateUser'
			},

			// access rights acl
			// =================
			{
				name : 'relevanceOperational',
				mapping : 'applicationAccessDTO > relevanceOperational'
			}, {
				name : 'relevanceStrategic',
				mapping : 'applicationAccessDTO > relevanceStrategic'
			}, {
				name : 'aclBusiness_Essential_Id',
				mapping : 'applicationAccessDTO > business_Essential_Id'
			}, {
				name : 'aclGxp_Flag',
				mapping : 'applicationAccessDTO > gxp_Flag'
			}, {
				name : 'aclItsec_Gruppe_Id',
				mapping : 'applicationAccessDTO > itsec_Gruppe_Id'
			}, {
				name : 'aclItsec_SB_Integ_ID',
				mapping : 'applicationAccessDTO > itsec_SB_Integ_ID'
			}, {
				name : 'aclItsec_SB_Integ_Txt',
				mapping : 'applicationAccessDTO > itsec_SB_Integ_Txt'
			}, {
				name : 'aclItsec_SB_Verfg_ID',
				mapping : 'applicationAccessDTO > itsec_SB_Verfg_ID'
			}, {
				name : 'aclItsec_SB_Verfg_Txt',
				mapping : 'applicationAccessDTO > itsec_SB_Verfg_Txt'
			}, {
				name : 'aclItsec_SB_Vertr_ID',
				mapping : 'applicationAccessDTO > itsec_SB_Vertr_ID'
			}, {
				name : 'aclItsec_SB_Vertr_Txt',
				mapping : 'applicationAccessDTO > itsec_SB_Vertr_Txt'
			}, {
				name : 'aclLicense_Scanning',
				mapping : 'applicationAccessDTO > license_Scanning'
			//}, {
//				name : 'aclPrimary_Function_Id',
//				mapping : 'applicationAccessDTO > primary_Function_Id'
			}, {
				name : 'aclPriority_Level_Id',
				mapping : 'applicationAccessDTO > priority_Level_Id'
			}, {
				name : 'aclRef_Id',
				mapping : 'applicationAccessDTO > ref_Id'
			}, {
				name : 'aclRelevance_Ics',
				mapping : 'applicationAccessDTO > relevance_Ics'
			}, {
				name : 'aclRelevanz_Itsec',
				mapping : 'applicationAccessDTO > relevanz_Itsec'
			}, {
				name : 'aclResponsible',
				mapping : 'applicationAccessDTO > responsible'
			}, {
				name : 'aclSample_Test_Date',
				mapping : 'applicationAccessDTO > sample_Test_Date'
			}, {
				name : 'aclSample_Test_Result',
				mapping : 'applicationAccessDTO > sample_Test_Result'
			}, {
				name : 'aclService_Contract_Id',
				mapping : 'applicationAccessDTO > service_Contract_Id'
			}, {
				name : 'aclSeverity_Level_Id',
				mapping : 'applicationAccessDTO > severity_Level_Id'
			}, {
				name : 'aclSla_Id',
				mapping : 'applicationAccessDTO > sla_Id'
			}, {
				name : 'aclSub_Responsible',
				mapping : 'applicationAccessDTO > sub_Responsible'
			}]);

			var applicationDetailReader = new Ext.data.XmlReader({
				record: 'return'
			}, applicationDetailRecord);

			var applicationDetailStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'applicationDetailStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod : 'getApplicationDetail',
					timeout: 120000,
					reader: applicationDetailReader
				}),
				
				fields: [ 
					'applicationDTO', 'applicationId', 'applicationName', 'applicationAlias', 'applicationCat1Id',
					'applicationCat1Txt', 'applicationCat2', 'applicationCat2Txt', 'isEditable'
				],

				reader: applicationDetailReader
			});
			
			return applicationDetailStore;
		},
		
		createApplicationCreateStore: function() {
			var applicationCreateRecord = Ext.data.Record.create([ {
					name: 'result'
				}, {
					name: 'displayMessage'
				}, {
					name: 'messages'
				}, {
					name: 'applicationId'
				}]
			);
			
			var applicationCreateReader = new Ext.data.XmlReader({
				record: 'return'
			}, applicationCreateRecord);
			
			var applicationCreateStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'appCreateStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'createApplication',
					timeout: 120000,
					reader: applicationCreateReader
				}),
				
				baseParams : {
				 	cwid: AIR.AirApplicationManager.getCwid(),
				 	token: AIR.AirApplicationManager.getToken(),
					applicationId: 0
				},
				
				fields: [ 'result', 'displayMessage', 'messages' ],
	
				reader: applicationCreateReader
			});
			
			return applicationCreateStore;
		},
		
		createApplicationSaveStore: function() {
			var applicationSaveRecord = Ext.data.Record.create(['result', 'displayMessage', 'messages']);
	
			var applicationSaveReader = new Ext.data.XmlReader({
				record: 'return'
			}, applicationSaveRecord);
	
			var applicationSaveStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'appSaveStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'saveApplication',
					timeout: 120000,
					reader: applicationSaveReader
				}),
				
				baseParams: {
				 	cwid: AIR.AirApplicationManager.getCwid(),
				 	token: AIR.AirApplicationManager.getToken(),
					applicationId: -1
				},
				
				fields: [ 'result', 'displayMessage', 'messages' ],
	
				reader: applicationSaveReader
			});
			
			return applicationSaveStore;
		},
		
	
		createApplicationByCopyStore: function() {
			var applicationByCopyRecord = Ext.data.Record.create([
			    {name: 'result'},
			    {name: 'displayMessage'},
			    {name: 'messages'},
			    {name: 'applicationId'}
	        ]);
	
	        var applicationByCopyReader = new Ext.data.XmlReader({
	        	record: 'return'
	        }, applicationByCopyRecord); 
	
	        var applicationByCopyStore = new Ext.data.Store({//Grouping
	            autoDestroy: true,
	            autoLoad: false,
	//            remoteSort: true,
	//            pruneModifiedRecords: true,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext + '/ApplicationWSPort',
	        		loadMethod: 'createApplicationByCopy',
	        		timeout: 120000,
	        		reader: applicationByCopyReader
	        	}),
	        	
	        	fields: [ 'result', 'displayMessage', 'messages' ],
	        	
	//        	groupField: 'groupsort',
	
	        	reader: applicationByCopyReader
	        });
	        
	        return applicationByCopyStore;
		},
		
		createComplianceControlsStore: function() {
			//return record
			var complianceControls = Ext.data.Record.create([
			    {name: 'complianceRequestId'},
			    {name: 'complianceControlId'},
			    {name: 'complianceControlName'},
			    {name: 'complianceControlDelTimestamp'},
			    {name: 'ciComplianceStatementId'},
			    {name: 'ciComplianceRequestId'},
			    {name: 'compliantStatus'},
			    {name: 'justification'}
	        ]);
	
	        var complianceControlsReader = new Ext.data.XmlReader({
	        	record: 'return'
	        }, complianceControls); 
	
	        var complianceControlsStore = new Ext.data.Store({//Grouping
	            autoDestroy: true,
	            autoLoad: false,
	//            remoteSort: true,
	//            pruneModifiedRecords: true,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext + '/ApplicationWSPort',
	        		loadMethod: 'getComplianceControls',
	        		timeout: 120000,
	        		reader: complianceControlsReader
	        	}),
	        	
	        	//return fields
	        	fields: [ 
					'complianceRequestId', 'complianceControlId', 'complianceControlName', 'complianceControlDelTimestamp', 
					'ciComplianceStatementId', 'ciComplianceRequestId', 'compliantStatus', 'justification'
	        	],
	        	
	//        	groupField: 'groupsort',
	
	        	reader: complianceControlsReader
	        });
	        
	        return complianceControlsStore;
		},
		
//		createCompliantStatusStore: function() {
//			var compliantStatusStore = new Ext.data.ArrayStore({
//		        fields: [
//		            'compliantStatusId',
//		            'compliantStatusText'
//		        ],
//		        data: [
//	//				['0', languagestore.getAt(0).data['general_yes']],//0 5
//	//				['1', languagestore.getAt(0).data['general_no']],//yes/no (beides zusammen) nicht mehr getrennt in ja,nein ?? 
//	//				['2', languagestore.getAt(0).data['complianceWindowStatementDispensable']],
//	//				['3', languagestore.getAt(0).data['complianceWindowStatementUntreated']],//3 5 = Untreated oder general_yes ??
//	//				['4', languagestore.getAt(0).data['complianceWindowStatementPartly']]
//	
//					['0', 'yes/ja'],
//					['1', 'dispensable/entbehrlich'],
//					['2', 'no/nein'],
//					['3', 'partly/teilweise'],
//					['4', 'untreated/unbearbeitet'],
//		        ]
//		    });
//			
//			return compliantStatusStore;
//		},
		
		createSaveComplianceControlsStore: function() {
			//return record
			var saveComplianceControls = Ext.data.Record.create([
			    {name: 'complianceRequestId'},
			    {name: 'complianceControlId'}
	        ]);
	
	        var saveComplianceControlsReader = new Ext.data.XmlReader({
	        	record: 'return'
	        }, saveComplianceControls); 
	
	        var saveComplianceControlsStore = new Ext.data.Store({
	            autoDestroy: true,
	            autoLoad: false,
	
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext + '/ApplicationWSPort',
	        		loadMethod: 'saveComplianceControls',
	        		timeout: 120000,
	        		reader: saveComplianceControlsReader
	        	}),
	        	
	        	//return fields
	        	fields: [ 
					'complianceRequestId', 'complianceControlId'
	        	],
	        	
	//        	groupField: 'groupsort',
	
	        	reader: saveComplianceControlsReader
	        });
	        
	        return saveComplianceControlsStore;
		},
		
		createReferencesListStore: function() {
			var referencesListRecord = Ext.data.Record.create([
		      	{ name: 'id' },//,{ name: 'id', mapping: 'id' }
		      	{ name: 'name' },//{ name: 'text', mapping: 'name' }
		      	{ name: 'itsetId' },
		      	{ name: 'itsecGroupId' },
				{ name: 'ciKat1' }
		    ]);
		
		    var referencesListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
		    }, referencesListRecord); 
		
		    var referencesListStore = new Ext.data.XmlStore({
		    	autoDestroy: true,//true false
				autoLoad: false,
				storeId: 'referencesListStore',
				
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRToolsWSPort',
		      		loadMethod: 'getReferenzList',
		      		timeout: 120000,
		      		reader: referencesListReader
		      	}),
		      	fields: ['id', 'name', 'itsetId', 'itsecGroupId', 'ciKat1'],
		      	
		      	baseParams: {
				 	cwid: AIR.AirApplicationManager.getCwid(),
				 	token: AIR.AirApplicationManager.getToken()
		      	},
	
		      	reader: referencesListReader
		    });
		    
		    return referencesListStore;
		},
		
		createItSecGroupListStore: function() {
			var itSecGroupListRecord = Ext.data.Record.create([
		      	{ name: 'id', mapping: 'itSecGroupId' },//name: 'id'		, mapping: 'itSecGroupId'
		      	{ name: 'name', mapping: 'itSecGroupName' },//name: 'name'		, mapping: 'itSecGroupName'
		      	{ name: 'itsetId', mapping: 'itsetId' },
				{ name: 'ciKat1' }
		    ]);
		
		    var itSecGroupListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'//nix id itSecGroupId
		    }, itSecGroupListRecord); 
		
		    var itSecGroupListStore = new Ext.data.XmlStore({
		    	autoDestroy: true,//true false
		        storeId: 'itSecGroupListStore',
		        autoLoad: false,
		        
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRToolsWSPort',
		      		loadMethod: 'getItSecGroupList',
		      		timeout: 120000,
		      		reader: itSecGroupListReader
		      	}),
		      	fields: [ 'id', 'name', 'itsetId', 'ciKat1' ],//'itSecGroupId', 'itSecGroupName' :: 'id', 'name'
		      	
		      	reader: itSecGroupListReader
		    });
		    
		    return itSecGroupListStore;
		},
		
		
		createGenericIdNameStore: function() {
	//		var genericIdNameRecord = Ext.data.Record.create([
	//  	      	{ name: 'id' },
	//  	      	{ name: 'name' }
	//  	    ]);
	//  	
	//  	    var genericIdNameReader = new Ext.data.XmlReader({
	//  			record: 'return',
	//  			idProperty: 'id'
	//  	    }, genericIdNameRecord); 
			
		    var genericIdNameStore = new Ext.data.ArrayStore({
		    	autoDestroy: true,
				autoLoad: false,
	
		      	fields: ['id', 'name']
		    });
		    
		    return genericIdNameStore;
		},
		
		createCiConnectionsStore: function() {//isUpStream
			var method = 'getDwhEntityRelations';//isUpStream ? 'getApplicationUpstream' : 'getApplicationDownstream';
			
			var ciConnectionsRecord = Ext.data.Record.create([
		        {name: 'id'},
		        {name: 'ciName'},//name
		        {name: 'ciType'},//type
		        {name: 'source'},
		        {name: 'dwhEntityId'}
		    ]);
		
		    var ciConnectionsReader = new Ext.data.XmlReader({
		    	record: 'dwhEntityDTO',//viewdataDTO
		        idProperty: 'dwhEntityId',//id
		        	
		        fields: ['id', 'ciName', 'ciType', 'source', 'dwhEntityId']//name type
		    }, ciConnectionsRecord); 
			
		    var ciConnectionsStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: ['id', 'ciName', 'ciType', 'source', 'dwhEntityId'],//name type
	
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/CiEntityWSPort',//ApplicationWSPort
		      		loadMethod: method,
		      		timeout: 120000,
		      		reader: ciConnectionsReader
		      	}),
		    	
		      	reader: ciConnectionsReader
		    });
		    
		    return ciConnectionsStore;
		},
		
		/*
		createCiUpStreamConnectionsStore: function() {
			var ciUpStreamConnectionsReader = Ext.data.Record.create([
		        {name: 'id'},
		        {name: 'name'},
		        {name: 'type'}
	//	        {name: 'deleteAction'}
	//	        {name: 'alias'},
	//	        {name: 'category'},
	//	        {name: 'direction'},
	//	        {name: 'responsible'},
	//	        {name: 'subResponsible'},
	//	        {name: 'tableId'},
	//	        {name: 'ciId'},
	//	        {name: 'groupsort'}
		    ]);
		
		    var ciUpStreamConnectionsReader = new Ext.data.XmlReader({
		    	record: 'viewdataDTO',//return
		        idProperty: 'id'//name ciId
		        	
		        ,fields: ['id', 'name', 'type']//, 'deleteAction'
		    }, ciUpStreamConnectionsReader); 
			
		    var ciUpStreamConnectionsStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: ['id', 'name', 'type'],
	
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/ApplicationWSPort',
		      		loadMethod: 'getApplicationUpstream',
		      		timeout: 120000,
		      		reader: ciUpStreamConnectionsReader
		      	}),
		    	
		      	reader: ciUpStreamConnectionsReader
		    });
		    
		    return ciUpStreamConnectionsStore;
		},
	
		createCiDownStreamConnectionsStore: function() {
			var ciDownStreamConnectionsReader = Ext.data.Record.create([
		        {name: 'id'},
		        {name: 'name'},
		        {name: 'type'},
		        {name: 'source'}
	//	        {name: 'deleteAction'},
	//	        {name: 'alias'},
	//	        {name: 'category'},
	//	        {name: 'direction'},
	//	        {name: 'responsible'},
	//	        {name: 'subResponsible'},
	//	        {name: 'tableId'},
	//	        {name: 'ciId'},
	//	        {name: 'groupsort'}
		    ]);
		
		    var ciDownStreamConnectionsReader = new Ext.data.XmlReader({
		    	record: 'viewdataDTO',//return
		        idProperty: 'id',//name ciId
		        	
		        fields: ['id', 'name', 'type', 'source']//, 'deleteAction'
		    }, ciDownStreamConnectionsReader); 
			
		    var ciDownStreamConnectionsStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: ['id', 'name', 'type', 'source'],
	
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/ApplicationWSPort',
		      		loadMethod: 'getApplicationDownstream',
		      		timeout: 120000,
		      		reader: ciDownStreamConnectionsReader
		      	}),
		    	
		      	reader: ciDownStreamConnectionsReader
		    });
		    
		    return ciDownStreamConnectionsStore;
		},*/
		
		createConnectionPropertiesStore: function() {
			
			var store = new Ext.data.XmlStore({
			    autoLoad: false,
			    url: 'config/ConnectionProperties.xml',
			    
			    // reader configs
			    record: 'Identifier',
			    fields: [ 'Source', 'Destination', 'Relevance', 'Upstream', 'Downstream' ]
			});
			
			// im Gegensatz tu FF geht folgendes nicht im Explodierer:
	//		var IdentifierRecord = Ext.data.Record.create([
	//		   {name: 'Source'},
	//		   {name: 'Destination'},
	//		   {name: 'Relevance'},
	//		   {name: 'Upstream'},
	//		   {name: 'Downstream'}
	//		]);
	//		
	//		var store = new Ext.data.XmlStore({
	//			storeId: 'connectionPropertiesStore',
	//		    url: 'config/ConnectionProperties.xml',//'/AIR/htdocs/config/ConnectionProperties.xml',
	//			autoLoad: false,
	//			
	//			reader: new Ext.data.XmlReader({
	//				record: 'Identifier',
	//				root: 'ConnectionPropertyItems'
	//		    }, IdentifierRecord)
	//		});
			
			return store;
		},
		
		createSisoogleOsTypeListStore: function() {
			return this.createSisoogleAttributeListStore();
		},
		createSisoogleOsNameListStore: function() {
			return this.createSisoogleAttributeListStore();
		},
		createSisoogleSourceListStore: function() {
			return this.createSisoogleAttributeListStore();
		},
		createSisoogleGapResponsibleListStore: function() {
			return this.createSisoogleAttributeListStore();
		},
		createSisoogleGapEndDateListStore: function() {
			return this.createSisoogleAttributeListStore();
		},
		createSisoogleActiveStateListStore: function() {
			return this.createSisoogleAttributeListStore();
		},
		createSisoogleGpscOwnerListStore: function() {
			return this.createSisoogleAttributeListStore();
		},
		
		createSisoogleAttributeListStore: function() {
			var sisoogleAttributeListRecord = Ext.data.Record.create([
		      	{ name: 'id' },
		      	{ name: 'name' }
		    ]);
		
		    var sisoogleAttributeListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
		    }, sisoogleAttributeListRecord); 
		
		    var sisoogleAttributeListStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
				autoLoad: false,
				storeId: 'sisoogleAttributeListStore',
				
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRToolsWSPort',
		      		loadMethod: 'getSISoogleAttributesByType',
		      		timeout: 120000,
		      		reader: sisoogleAttributeListReader
		      	}),
		      	fields: [ 'id', 'name' ],
	
		      	reader: sisoogleAttributeListReader
		    });
		    
		    return sisoogleAttributeListStore;
		},
		
		createLinkCiTypeListStore: function() {
			var linkCiTypeListRecord = Ext.data.Record.create([
		      	{ name: 'id' },
		      	{ name: 'type' },
		      	{ name: 'language' },
		      	{ name: 'tableId' }
		    ]);
		
		    var linkCiTypeListReader = new Ext.data.XmlReader({
				record: 'return'
//				idProperty: 'id'//damit nicht deutsche oder englische Einträge überschrieben werden, wenn id als Schlüssel feld gesetzt ist
		    }, linkCiTypeListRecord);
		
		    var linkCiTypeListStore = new Ext.data.XmlStore({
//		    	autoDestroy: true,
				autoLoad: false,
				storeId: 'linkCiTypeListStore',
				
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRToolsWSPort',
		      		loadMethod: 'getLinkCITypeList',
		      		timeout: 120000,
		      		reader: linkCiTypeListReader
		      	}),
		      	fields: [ 'id', 'type', 'language', 'tableId' ],
	
		      	reader: linkCiTypeListReader
		    });
		    
		    return linkCiTypeListStore;
		},
		
		createLinkCiListStore: function() {
			var linkCiListRecord = Ext.data.Record.create([
		      	{ name: 'id' },
		      	{ name: 'name' },
		      	{ name: 'subTypeId' },
		      	{ name: 'sort' }
		    ]);
		
		    var linkCiListReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'id'
		    }, linkCiListRecord);
		
		    var linkCiListStore = new Ext.data.XmlStore({
//		    	autoDestroy: true,
				autoLoad: false,
				storeId: 'linkCiListStore',
				
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext +'/AIRToolsWSPort',
		      		loadMethod: 'getLinkCIList',
		      		timeout: 120000,
		      		reader: linkCiListReader
		      	}),
		      	fields: [ 'id', 'name', 'sort', 'subTypeId' ],
	
		      	reader: linkCiListReader
		    });
		    
		    return linkCiListStore;
		},
		
		//==============================================================================================================================
		
		createItsecMassnahmenStore: function() {//statusWertDisplayField
			var itsecMassnahmenRecord = Ext.data.Record.create([
		        'ident', 'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'massnahmeTitel', 'statusWert', 'statusWertId', 'zobId', 'massnahmeLink', 'chocoMerkmal'//'statusWert' statusWertDisplayField
		    ]);
		
		    var itsecMassnahmenReader = new Ext.data.XmlReader({
		    	record: 'itsecMassnahmenDTO',
		        idProperty: 'itsecMassnahmenStatusId'
		    }, itsecMassnahmenRecord); 
			
		    var itsecMassnahmenStore = new Ext.data.GroupingStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: [ 'ident', 'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'massnahmeTitel', 'statusWert', 'statusWertId', 'zobId', 'massnahmeLink', 'chocoMerkmal' ],//'statusWert' statusWertDisplayField
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/ItsecMassnahmenWSPort',
		      		loadMethod: 'getItsecMassnahmen',
		      		timeout: 120000,
		      		reader: itsecMassnahmenReader
		      	}),
		    	
		      	reader: itsecMassnahmenReader,
		      	
		      	groupField: 'statusWert'//'statusWert' statusWertDisplayField
	//	      	sortInfo: { field: statusWertDisplayField, direction: "ASC" }
		    });
		    
		    return itsecMassnahmenStore;
		},
		
		createItsecMassnahmeDetailStore: function() {
			var itsecMassnahmeDetailRecord = Ext.data.Record.create([
		        'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'katalogId', 'massnahmeNr', 'massnahmeTitel', 'statusId', 'statusKommentar', 'gap','gapResponsible','gapMeasure','gapPriority','gapEndDate','riskAnalysisAsFreetext','expense','probOccurence','damage','mitigationPotential','expenseText','probOccurenceText','damageText','mitigationPotentialText','signee','gapClassApproved', 'currency', 'secuRelevance', 'accsRelevance', 'itopRelevance', 'refTableID', 'refPKID', 'refCiSubTypeId'
		    ]);
			
		    var itsecitsecMassnahmeDetailReader = new Ext.data.XmlReader({
		    	record: 'itsecMassnahmeDetailDTO',
		        idProperty: 'itsecMassnahmenStatusId'
		    }, itsecMassnahmeDetailRecord); 
			
		    var itsecMassnahmeDetailStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: [ 'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'katalogId', 'massnahmeNr', 'massnahmeTitel', 'statusId', 'statusKommentar', 'gap','gapResponsible','gapMeasure','gapPriority','gapEndDate','riskAnalysisAsFreetext','expense','probOccurence','damage','mitigationPotential','expenseText','probOccurenceText','damageText','mitigationPotentialText','signee','gapClassApproved', 'currency', 'secuRelevance', 'accsRelevance', 'itopRelevance', 'refTableID', 'refPKID', 'refCiSubTypeId' ],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/ItsecMassnahmenWSPort',
		      		loadMethod: 'getItsecMassnahmeDetail',
		      		timeout: 120000,
		      		reader: itsecitsecMassnahmeDetailReader
		      	}),
		    	
		      	reader: itsecitsecMassnahmeDetailReader
		    });
		    
		    return itsecMassnahmeDetailStore;
		},
		
		createItsecMassnahmenDetailsSaveStore: function() {
			var itsecMassnahmenDetailsSaveRecord = Ext.data.Record.create([
	 	        'result'
	 	    ]);
	 	
	 	    var itsecMassnahmenDetailsSaveReader = new Ext.data.XmlReader({
	 	    	record: 'return'
	 	    }, itsecMassnahmenDetailsSaveRecord); 
	 		
	 	    var itsecMassnahmenDetailsSaveStore = new Ext.data.XmlStore({
	 	    	autoDestroy: true,
	 	    	autoLoad: false,
	 	    	
	 	      	fields: [ 'result' ],
	 	      	
	 	      	proxy: new Ext.ux.soap.SoapProxy({
	 	      		url: webcontext + '/ItsecMassnahmenWSPort',
	 	      		loadMethod: 'saveItsecMassnahmenDetails',
	 	      		timeout: 120000,
	 	      		reader: itsecMassnahmenDetailsSaveReader
	 	      	}),
	 	    	
	 	      	reader: itsecMassnahmenDetailsSaveReader
	 	    });
	 	    
	 	    return itsecMassnahmenDetailsSaveStore;
		},
		
		createItsecMassnahmenDetailCompleteSaveStore: function() {
			var itsecMassnahmenDetailCompleteSaveRecord = Ext.data.Record.create([
	 	        'result'
	 	    ]);
	 	
	 	    var itsecMassnahmenDetailCompleteSaveReader = new Ext.data.XmlReader({
	 	    	record: 'return'
	 	    }, itsecMassnahmenDetailCompleteSaveRecord); 
	 		
	 	    var itsecMassnahmenDetailCompleteSaveStore = new Ext.data.XmlStore({
	 	    	autoDestroy: true,
	 	    	autoLoad: false,
	 	    	
	 	      	fields: [ 'result' ],
	 	      	
	 	      	proxy: new Ext.ux.soap.SoapProxy({
	 	      		url: webcontext + '/ItsecMassnahmenWSPort',
	 	      		loadMethod: 'saveItsecMassnahmenDetailComplete',
	 	      		timeout: 120000,
	 	      		reader: itsecMassnahmenDetailCompleteSaveReader
	 	      	}),
	 	    	
	 	      	reader: itsecMassnahmenDetailCompleteSaveReader
	 	    });
	 	    
	 	    return itsecMassnahmenDetailCompleteSaveStore;
		},
		
		/**
		 * Tabelle: ITSEC_MASSN_STWERT
		 */
		createItsecMassnahmenStatusWerteStore: function() {
			var itsecMassnahmenStatusWerteRecord = Ext.data.Record.create([
	             'itsecMassnahmenWertId', 'statusWert', 'statusWertEn'
		    ]);
		
		    var itsecMassnahmenStatusWerteReader = new Ext.data.XmlReader({
		    	record: 'itsecMassnahmenStatusWerteDTO',
		        idProperty: 'itsecMassnahmenWertId'
		    }, itsecMassnahmenStatusWerteRecord);
			
		    var itsecMassnahmenStatusWerteStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: [ 'itsecMassnahmenWertId', 'statusWert', 'statusWertEn' ],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/ItsecMassnahmenWSPort',
		      		loadMethod: 'getItsecMassnahmenStatusWerte',
		      		timeout: 120000,
		      		reader: itsecMassnahmenStatusWerteReader
		      	}),
		    	
		      	reader: itsecMassnahmenStatusWerteReader
		    });
		    
		    return itsecMassnahmenStatusWerteStore;
		},
		
		createItsecMassnahmenGapClassStore: function() {
			var itsecMassnahmenGapClassRecord = Ext.data.Record.create([
	             'gapPriority', 'gapClassTextDE', 'gapClassTextEN'
		    ]);
		
		    var itsecMassnahmenGapClassReader = new Ext.data.XmlReader({
		    	record: 'return',//'gapClassDTO',
		        idProperty: 'gapPriority'
		    }, itsecMassnahmenGapClassRecord); 
			
		    var itsecMassnahmenGapClassStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	storeId: 'itsecMassnahmenGapClassStore',
		    	
		      	fields: [ 'gapPriority', 'gapClassTextDE', 'gapClassTextEN' ],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/ItsecMassnahmenWSPort',
		      		loadMethod: 'getGapClassList',
		      		timeout: 120000,
		      		reader: itsecMassnahmenGapClassReader
		      	}),
		    	
		      	reader: itsecMassnahmenGapClassReader
		    });
		    
		    itsecMassnahmenGapClassStore.load();
		    
		    return itsecMassnahmenGapClassStore;
		},
		
		createLinkedMassnahmeDetailListStore: function() {
			var itsecMassnahmeDetailRecord = Ext.data.Record.create([
		        'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'katalogId', 'massnahmeNr', 'massnahmeTitel', 'statusId', 'statusKommentar', 'gap','gapResponsible','gapMeasure','gapPriority','gapEndDate','riskAnalysisAsFreetext','expense','probOccurence','damage','mitigationPotential','expenseText','probOccurenceText','damageText','mitigationPotentialText','signee','gapClassApproved', 'currency', 'secuRelevance', 'accsRelevance', 'itopRelevance', 'refTableID', 'refPKID', 'refCiSubTypeId'
		    ]);
			
		    var itsecMassnahmeDetailReader = new Ext.data.XmlReader({
		    	record: 'itsecMassnahmeDetailDTO',
		        idProperty: 'itsecMassnahmenStatusId'
		    }, itsecMassnahmeDetailRecord); 
			
		    var itsecMassnahmeDetailStore = new Ext.data.XmlStore({
		    	autoDestroy: true,
		    	autoLoad: false,
		    	
		      	fields: [ 'itsecMassnahmenStatusId', 'massnahmeGstoolId', 'katalogId', 'massnahmeNr', 'massnahmeTitel', 'statusId', 'statusKommentar', 'gap','gapResponsible','gapMeasure','gapPriority','gapEndDate','riskAnalysisAsFreetext','expense','probOccurence','damage','mitigationPotential','expenseText','probOccurenceText','damageText','mitigationPotentialText','signee','gapClassApproved', 'currency', 'secuRelevance', 'accsRelevance', 'itopRelevance', 'refTableID', 'refPKID', 'refCiSubTypeId' ],
		      	
		      	proxy: new Ext.ux.soap.SoapProxy({
		      		url: webcontext + '/ItsecMassnahmenWSPort',
		      		loadMethod: 'getLinkedMassnahmeDetail',
		      		timeout: 120000,
		      		reader: itsecMassnahmeDetailReader
		      	}),
		    	
		      	reader: itsecMassnahmeDetailReader
		    });
		    
		    return itsecMassnahmeDetailStore;
		},
		
		createCurrencyStore: function() {
			var currencyRecord = Ext.data.Record.create([
	 	        'currencyId', 'currencyName', 'currencySymbol'
	        ]);
			
			var currencyReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'currencyId'
			}, currencyRecord); 
			
			var currencyStore = new Ext.data.XmlStore({
				storeId: 'currencyStore',
				autoLoad: false,
				
			   	proxy: new Ext.ux.soap.SoapProxy({
			   		url: webcontext +'/AIRToolsWSPort',
			   		loadMethod: 'getCurrencyList',
			   		timeout: 120000,
			   		reader: currencyReader
			   	}),
			   	
			   	fields: [ 'currencyId', 'currencyName', 'currencySymbol' ],
	
			   	reader: currencyReader
			});
			
			currencyStore.load();
			
			return currencyStore;
		},
		
		createApplicationDeleteStore: function() {
			var applicationDeleteRecord = Ext.data.Record.create([
			    {name: 'result'},
			    {name: 'displayMessage'},
			    {name: 'messages'},
			    {name: 'applicationId'}
	        ]);
	
	        var applicationDeleteReader = new Ext.data.XmlReader({
	        	record: 'return'
	        }, applicationDeleteRecord); 
	
	        var applicationDeleteStore = new Ext.data.Store({
	            autoDestroy: true,
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext + '/ApplicationWSPort',
	        		loadMethod: 'deleteApplication',
	        		timeout: 120000,
	        		reader: applicationDeleteReader
	        	}),
	        	
	        	fields: [ 'result', 'displayMessage', 'messages' ],
	        	
	
	        	reader: applicationDeleteReader
	        });
	        
	        return applicationDeleteStore;
		},
		
		createObjectAliasAllowedStore: function() {
			var objectAliasAllowedRecord = Ext.data.Record.create([
			    { name: 'countResultSet' },
			    { name: 'informationText' }
	        ]);
	
			var objectAliasAllowedReader = new Ext.data.XmlReader({
	             record: 'return'
			}, objectAliasAllowedRecord);
			
			var objectAliasAllowedStore = new Ext.data.XmlStore({
			    autoDestroy: false,
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/ApplicationWSPort',
					loadMethod: 'checkAllowedApplicationName',
					timeout: 120000,
					reader: objectAliasAllowedReader
				}),
				
				baseParams: { query: '' },
				fields: [ 'countResultSet', 'informationText' ],
				reader: objectAliasallowedReader
			});
			
			return objectAliasAllowedStore;
		},
		
		createObjectNameAllowedStore: function() {
	//		return AIR.AirStoreFactory.createObjectAliasAllowedStore();
			
			var objectNameAllowedRecord = Ext.data.Record.create([
	             { name: 'countResultSet' },
			     { name: 'informationText' }
	        ]);
	
	        var objectNameAllowedReader = new Ext.data.XmlReader({
	            record: 'return'
	        }, objectNameAllowedRecord); 
	
	        var objectNameAllowedStore = new Ext.data.XmlStore({
	            autoDestroy: false,
	            autoLoad: false,
	            
	        	proxy: new Ext.ux.soap.SoapProxy({
	        		url: webcontext +'/ApplicationWSPort',
	        		loadMethod: 'checkAllowedApplicationName',
	        		timeout: 120000,
	        		reader: objectNameAllowedReader
	        	}),
	        	
	        	baseParams: { query: '' },
	        	fields: ['countResultSet', 'informationText'],
	
	        	reader: objectNameAllowedReader
	        });
	        
	        return objectNameAllowedStore;
		},
		
		createPersonPickerStore: function() {
			var personPickerRecord = Ext.data.Record.create([{
				name: 'cwid',
				mapping: 'cwid'
			}, {
				name: 'lastname',
				mapping: 'lastname'
			}, {
				name: 'firstname',
				mapping: 'firstname'
			}]);
	
			var personPickerRecordReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'cwid'
			}, personPickerRecord);
	
			var personPickerStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'personPickerStore',
				autoLoad: false,
				
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/PersonsWSPort',
					loadMethod: 'findPersonsByCWID',
					timeout: 120000,
					reader: personPickerRecordReader
				}),
				
				fields: [ 'cwid', 'firstname', 'lastname' ],

				reader: personPickerRecordReader,
				
				baseParams: {
					cwid: '',
					primaryCWID: 'Y'
				}
			});
			
			return personPickerStore;
		},
		
		createGroupPickerStore: function() {
			var groupPickerStoreRecord = Ext.data.Record.create([
	       		{name: 'groupname', mapping: 'groupName'},
	       		{name: 'groupid', mapping: 'groupId'},
	       		{name: 'managercwid', mapping: 'managerCwid'}
	       	]);
	
			var groupPickerRecordReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'groupid'
			}, groupPickerStoreRecord); 
	
			var groupPickerStore = new Ext.data.XmlStore({
	           autoDestroy: true,
	           storeId: 'groupPickerStore',
	           autoLoad: false,
	           
		       	proxy: new Ext.ux.soap.SoapProxy({
		       		url: webcontext +'/GroupsWSPort',
		       		loadMethod: 'findGroups',
		       		timeout: 120000,
		       		reader: groupPickerRecordReader
		       	}),
	       	
		       	fields: [ 'groupname', 'groupid', 'managercwid' ],
	
		       	reader: groupPickerRecordReader
			});
			
			return groupPickerStore;
		},
		
		createRemovePickerStore: function() {
			var removePickerStore = new Ext.data.ArrayStore({
				idIndex: 0,
				storeId: 'removePickerStore',
				fields: [ 'id', 'hidden', 'value' ]
			});
			
			return removePickerStore;
		},
		
		createRecordPickerStore: function() {
			var recordPickerRecord = Ext.data.Record.create([
				{name: 'id'},
			    {name: 'type'}, 
			    {name: 'name'}, 
			    {name: 'alias'},
			    {name: 'responsible'},
			    {name: 'subResponsible'},
			    {name: 'category'}, 
			    {name: 'tableId'},
			    {name: 'ciId'},
			    {name: 'direction'},
			    {name: 'groupsort'}
			]);
	
			var recordPickerRecordReader = new Ext.data.XmlReader({
			    record: 'viewdataDTO',
			    idProperty: 'id'
			}, recordPickerRecord); 
	
			var recordPickerStore = new Ext.data.XmlStore({
			    autoDestroy: true,
			    storeId: 'recordPickerStore',
			    autoLoad: false,
			    
				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext +'/CiEntityWSPort',
					loadMethod: 'findCiEntities',
					timeout: 120000,
					reader: recordPickerRecordReader
				}),
				
				fields: [ 'id','type','name','alias','responsible','subResponsible','category','tableId','ciId' ],

				reader: recordPickerRecordReader,
				baseParams: {query:''}
			});
			
			return recordPickerStore;
		},
		
		createRecordTypeStore: function() {
			var recordTypeStore = new Ext.data.ArrayStore({
				idIndex: 0,
		        fields: [ 'type', 'displayText' ],
		        
		        data: [
		            ['Process', 'Process']//['Process', 'Business Process']
//		            ['Application', 'Application'],
//		            ['Application Platform', 'Application Platform'],
//		            ['Common Service', 'Common Service'],
//		            ['Middleware', 'Middleware']
		        ]
			});
			
			return recordTypeStore;
		},
		
		getObjectAliasAllowedStore: function() {
			var objectAliasAllowedStore = AIR.AirStoreManager.getStoreByName('objectAliasAllowedStore');
			
			if(!objectAliasAllowedStore) {
				objectAliasAllowedStore = this.createObjectAliasAllowedStore();
				AIR.AirStoreManager.addStore(objectAliasAllowedStore.storeId, objectAliasAllowedStore);
			}
		     
		    return objectAliasAllowedStore;
		},
		
		createObjectAliasAllowedStore: function() {
			var objectAliasAllowedRecord = Ext.data.Record.create([
				  {name: 'countResultSet'},
				  {name: 'informationText'}
			 ]);
		
			 var objectAliasAllowedReader = new Ext.data.XmlReader({
				 record: 'return'
			 }, objectAliasAllowedRecord); 
		
			 objectAliasAllowedStore = new Ext.data.XmlStore({
				 autoDestroy: false,
				 storeId: 'objectAliasAllowedStore',
				 autoLoad: false,
				 
				 proxy: new Ext.ux.soap.SoapProxy({
					 url: webcontext +'/ApplicationWSPort',
					 loadMethod: 'checkAllowedApplicationName',
					 timeout: 120000,
					 reader: objectAliasAllowedReader
				}),
				
				baseParams: {query: ''},
				fields: ['countResultSet', 'informationText'],

				reader : objectAliasAllowedReader
			 });
			 
			return objectAliasAllowedStore;
		},
	
		getObjectNameAllowedStore: function() {
			var objectNameAllowedStore = AIR.AirStoreManager.getStoreByName('objectNameAllowedStore');
			
			if(!objectNameAllowedStore) {
				objectNameAllowedStore = this.createObjectNameAllowedStore();
			    AIR.AirStoreManager.addStore(objectNameAllowedStore.storeId, objectNameAllowedStore);
			}
		     
		    return objectNameAllowedStore;
		},
		
		createObjectNameAllowedStore: function() {
			 var objectNameAllowedRecord = Ext.data.Record.create([
				 {name: 'countResultSet'},
				 {name: 'informationText'}
			 ]);
		
			 var objectNameAllowedReader = new Ext.data.XmlReader({
				 record: 'return'
			 }, objectNameAllowedRecord); 
		
			 objectNameAllowedStore = new Ext.data.XmlStore({
				 autoDestroy: false,
				 storeId: 'objectNameAllowedStore',
				 autoLoad: false,
				 
				 proxy: new Ext.ux.soap.SoapProxy({
					 url: webcontext +'/ApplicationWSPort',
					 loadMethod: 'checkAllowedApplicationName',
					 timeout: 120000,
					 reader: objectNameAllowedReader
				}),
				
				baseParams: {query: ''},
				fields: ['countResultSet', 'informationText'],

				reader: objectNameAllowedReader
			 });
			 
			 return objectNameAllowedStore;
		},		
		
		createCheckAuthStore: function(cwid, token) {//cwid, token
			var checkAuthRecord = Ext.data.Record.create([{
				name: 'result'
			}, {
				name: 'displayMessage'
			}, {
				name: 'messages'
			}]);

			var checkAuthReader = new Ext.data.XmlReader({
				record: 'return'
			}, checkAuthRecord);
			
			var checkAuthStore = new Ext.data.XmlStore({
				autoDestroy: true,
				storeId: 'checkAuthStore',
				autoLoad: false,
				
				fields : [ 'result', 'displayMessage', 'messages' ],

				proxy: new Ext.ux.soap.SoapProxy({
					url: webcontext + '/LDAPAuthWSPort',
					loadMethod: 'isStillLoggedIn',
//					timeout: 120000,
					reader: checkAuthReader
				})
				
//				baseParams: {
//				 	cwid: AIR.AirApplicationManager.getCwid(),
//				 	token: AIR.AirApplicationManager.getToken()
//				}
			});
			
			return checkAuthStore;
		},
		
		createSigneeListStore: function() {
			var signeeRecord = Ext.data.Record.create([
 	            'cwid', 'firstname', 'lastname'
	        ]);
	
			var signeeReader = new Ext.data.XmlReader({
				record: 'return',
				idProperty: 'cwid'
			}, signeeRecord); 
	
			var signeeStore = new Ext.data.XmlStore({
				autoDestroy: true,
	           	storeId: 'signeeListStore',
	           	autoLoad: false,
	           	
	       		proxy: new Ext.ux.soap.SoapProxy({
		       		url: webcontext +'/PersonsWSPort',
		       		loadMethod: 'findPersonByFunctionSignee',
		       		timeout: 120000,
		       		reader: signeeReader
		       	}),
		       	
		       	fields: [ 'cwid', 'firstname', 'lastname' ],
	
		       	reader: signeeReader
	       });
			
			return signeeStore;
		}
	};
}();