Ext.namespace('AIR');

AIR.AirGroupPicker = Ext.extend(Ext.Window, {//Ext.Tip
	constructor: function(event, pc) {//comp, 
//		this.comp = comp;
		this.event = event;
		this.pickerConfig = pc;
		this.isSearchComplete = true;
		
		this.limit = 100;
		this.page = 0;
//		var beginTitle = comp.getValue().length == 0 ? 'Add' : 'Replace';
//		this.title = beginTitle + ' Group to '+ Ext.get('label'+ comp.getId()).dom.innerHTML +'<br><hr>';
		
		AIR.AirGroupPicker.superclass.constructor.call(this);
	},

	initComponent: function() {
		Ext.apply(this, {
			id: 'grouppickertip',
			layout: 'form',//fit form
			title: this.title,//'Add CWID<br/><hr>',
			
//			autoHeight: true,
//			minWidth: 600,//560 400 450
//			maxWidth: 950,//450 500
			
			width: 600,
			resizable: false,
			draggable: true,
			hidden: true,

//			autoDestroy: true,
//			resizeable: true,
			
//			labelWidth: 5,
//			cls: 'filter',
			
//			tools: [{
//				id: 'close',
//				qtip: 'Cancel',
//				handler: function (event, toolEl, panel, object) {
//	        	   this.close();
//				}.createDelegate(this)
//			}],
	        
			items: [{
				id: 'cfGroupSearch',

//				xtype: 'compositefield',
//				fieldLabel: '',
				
				xtype: 'panel',
				layout: 'column',//column hbox
				border: false,
//				height: 25,
				
				bodyStyle: {
					background: 'transparent'
				},
				
				items: [{
					xtype: 'searchfield',//textfield
					id: 'gpQueryField',

					enableKeyEvents: true,
					maskRe: /[\w\d\-+\/ ,&]/
					
//					listeners: {
//						keyup: function() {
////							gpQueryTask.delay(500);
//							this.search();
//						}.createDelegate(this)
//					}
				},{
			    	id: 'gpQuerySelectorGroup',
				    xtype: 'radiogroup',
				    itemCls: 'x-check-group-alt',
				    
					style: {
						marginLeft: 10
					},

				    width: 200,//210
				    columns: 2,//[85, 105],
				    
				    /*{boxLabel: 'Starts with', name: 'gpQuerySelector', inputValue: 'Normal', checked: true},*/
				    items: [{
				    	boxLabel: '<span style="font-size: 10px;">Groupname</span>',//style config param instead of this
//				    	id: 'gpQuerySelectorName',
				    	name: 'gpQuerySelector',
				    	inputValue: 'Full',
				    	checked: true
				    },{
				    	boxLabel: '<span style="font-size: 10px;">Manager&nbsp;(CWID)</span>',//style config param instead of this
//				    	id: 'gpQuerySelectorManager',
				    	name: 'gpQuerySelector',
				    	inputValue: 'CWID'
				    }]
				},{
					xtype: 'label',
					id: 'lGroupPickerOr',
					text: AAM.getLabels().OR,
					
					style: {
						fontSize: 12,
						marginTop: 5,
						marginLeft: 10,
						fontWeight: 'bold'
					}
				},{
					xtype: 'button',
					id: 'bGroupPickerFindAll',
					
					text: '',
					
					style: {
						marginLeft: 15
					}
				},{
					xtype: 'button',
					id: 'bGroupPickerBackward',
					
		        	cls: 'x-btn-text-icon',
		        	icon: 'images/resultset_previous_16x16.png',
		        	
					style: {
						marginLeft: 2
					}
				},{
					xtype: 'button',
					id: 'bGroupPickerForward',
					
		        	cls: 'x-btn-text-icon',
		        	icon: 'images/resultset_next_16x16.png',
		        	
					style: {
						marginLeft: 2
					}
				}]
			},{
				xtype: 'listview',
				id: 'lvGroups',
				
				store: AIR.AirStoreFactory.createGroupPickerStore(),
//				layout: 'fit',
				
				height: 260,//95

				singleSelect: false,
				autoScroll: true,
				
				loadingText: '&nbsp;',
				emptyText: 'No groups found.',
				
				columns: [{
					tpl: '<img src="' + img_AddSelectedGroup + '">',
					width: .10
				}, {
					header: 'Group',
					dataIndex: 'groupname'
				}, {
					header: 'Manager (CWID)',
					dataIndex: 'managercwid',
					width: .25
				}],
				
				listeners: {
					click: function(dv, index, node, event) {
						this.updateField(dv.getRecord(node), this.comp, this.pickerConfig);
					}.createDelegate(this)
				}
			}],
			bbar: ['->', {
	    	    xtype: 'button',
	    	    id: 'gpClose',
	            text: 'Close',
	            handler: function(button, event) {
	            	this.close();
		        }.createDelegate(this)
	        }]
		});
		
	    AIR.AirGroupPicker.superclass.initComponent.call(this);
	    
	    this.addEvents('groupAdd');
	    
	    var field = this.getComponent('cfGroupSearch').getComponent('gpQueryField');//this.getComponent('cfGroupSearch').items.items[0];
	    field.on('search', this.onSearch, this);
	    field.on('specialkey', this.onEnter, this);
	    
	    var bGroupPickerFindAll = this.getComponent('cfGroupSearch').getComponent('bGroupPickerFindAll');//this.getComponent('cfGroupSearch').items.items[1]
	    bGroupPickerFindAll.on('click', this.onFindAll, this);
	    
	    var bGroupPickerBackward = this.getComponent('cfGroupSearch').getComponent('bGroupPickerBackward');//this.getComponent('cfGroupSearch').items.items[1]
	    bGroupPickerBackward.on('click', this.onFindAll, this);
	    
	    var bGroupPickerForward = this.getComponent('cfGroupSearch').getComponent('bGroupPickerForward');//this.getComponent('cfGroupSearch').items.items[1]
	    bGroupPickerForward.on('click', this.onFindAll, this);
	},
	
	onFindAll: function(button, event) {
		switch(button.getId()) {
			case 'bGroupPickerFindAll':
				this.page = 0;
				break;
			case 'bGroupPickerBackward':
				this.page--;
				break;
			case 'bGroupPickerForward':
				this.page++;
				break;
			default:
				break;
		}
		
		if(this.page === 0) {
			this.getComponent('cfGroupSearch').getComponent('bGroupPickerBackward').hide();
			this.getComponent('cfGroupSearch').getComponent('bGroupPickerForward').show();
		} else {
			this.getComponent('cfGroupSearch').getComponent('bGroupPickerBackward').show();
		}
		this.doLayout();//.getComponent('cfGroupSearch')
		
		this.onSearch();
	},
	
	onEnter: function(field, e){
        if(e.getKey() === e.ENTER)
        	this.onSearch(field);
	},
	
	
	updateField: function(record, comp) {//, pickerConfig
		var element = comp;//Ext.getCmp(comp);
		var hiddenElement = Ext.getCmp(comp.getId() + 'Hidden');
		var contains = false;
		
		if(element) {
			if (element.maxContacts !== undefined && element.maxContacts > 1) {
				if (element.getValue().length == 0) {
					element.setValue(record.get('groupname'));
				} else if(hiddenElement.getValue().indexOf(record.get('groupid')) === -1) {
					element.setValue(element.getValue() + '\n' + record.get('groupname'));
				} else {
					contains = true; // GroupId is in List
				}
			} else {
				element.setValue(record.get('groupname'));
			}
		}
		
		if(hiddenElement) {
			if(element.maxContacts !== undefined && element.maxContacts > 1) {
				if(!contains)
					hiddenElement.setValue(hiddenElement.getValue() + ',' + record.get('groupid'));
				
			} else {
				hiddenElement.setValue(record.get('groupid'));
			}
			
			this.fireEvent('groupAdd', record, element, hiddenElement);
		}
		
		this.close();	
	},
	
	onSearch: function(field) {
		var store = this.getComponent('lvGroups').getStore();
				store.removeAll();
		
		if(field) {
			if(field.getValue().length > 2 && this.isSearchComplete) {
				this.isSearchComplete = false;
				
				var searchType = this.getComponent('cfGroupSearch').getComponent('gpQuerySelectorGroup').getValue().inputValue;//this.getComponent('cfGroupSearch').items.items[1].getValue().inputValue;//1
				
	//				var params = {
	//					groupName: field.getValue()
	//				};
	//				params[this.groupType] = 'Y';
				
				var params = {};
				params[this.groupType] = 'Y';
				
				switch(searchType) {
					case 'Normal':
						params.fullLikeSearch = 'N';
						params.groupName = field.getValue();
				    	break;
					case 'Full':
						params.fullLikeSearch = 'Y';
						params.groupName = field.getValue();
			    		break;
					case 'CWID':
						params.managerCWID = field.getValue();
				    	break;
				};
								
				store.load({
					params: params,
					callback: function() {
						this.isSearchComplete = true;
					}.createDelegate(this)
				});
			}
		} else {
//			store.removeAll();
			var field = this.getComponent('cfGroupSearch').getComponent('gpQueryField');
			field.reset();
			
			var params = {
				start: this.page * this.limit,
				limit: this.limit
			};
			
			params[this.groupType] = 'Y';
			
			store.load({
				params: params,
				callback: function() {
					this.isSearchComplete = true;
				}.createDelegate(this)
			});
	   	}
	},
	
	update: function(comp, groupType) {
		this.comp = comp;
		this.groupType = groupType;
		
		var tfSearch = this.getComponent('cfGroupSearch').getComponent('gpQueryField');//this.getComponent('cfGroupSearch').items.items[0];
		tfSearch.reset();
		tfSearch.focus(true, 500);
		
//		this.getComponent('cfGroupSearch').items.items[1].setValue('Full');//funktioniert erst nach dem Rendern! Ext.getCmp('ppQuerySelectorGroup').setValue('ppQuerySelectorName', true);
		
		var beginTitle = this.comp.getValue().length == 0 ? 'Add' : 'Replace';
		var title = beginTitle + ' Group to '+ Ext.get('label'+ this.comp.getId()).dom.innerHTML +'<br><hr>';
		
		this.setTitle(title);
		
		var bGroupPickerFindAll = this.getComponent('cfGroupSearch').getComponent('bGroupPickerFindAll');//this.getComponent('cfGroupSearch').items.items[1]
		bGroupPickerFindAll.setText(AAM.getLabels().findAll + ' ' + this.limit);
		
		var bGroupPickerBackward = this.getComponent('cfGroupSearch').getComponent('bGroupPickerBackward');
		var bGroupPickerForward = this.getComponent('cfGroupSearch').getComponent('bGroupPickerForward');
		
		bGroupPickerBackward.setText(AAM.getLabels().button_general_back);
		bGroupPickerForward.setText(AAM.getLabels().button_general_next);
		
		bGroupPickerBackward.hide();
		bGroupPickerForward.hide();
		
//		if(this.page === 0) {
//			bGroupPickerBackward.hide();
//		}
		/* else {
			this.getComponent('cfGroupSearch').getComponent('bGroupPickerBackward').show();
		}*/
		
		lGroupPickerOr = this.getComponent('cfGroupSearch').getComponent('lGroupPickerOr');
		lGroupPickerOr.setText(AAM.getLabels().OR);
		
		this.getComponent('cfGroupSearch').doLayout();
	},
	
	close: function() {
		var lvPersons = this.getComponent('lvGroups');
		lvPersons.getStore().removeAll();
		
//		this.destroy();
		this.hide();
	}
});