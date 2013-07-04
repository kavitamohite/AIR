Ext.namespace('AIR');

AIR.AirGroupPicker = Ext.extend(Ext.Tip, {
	constructor: function(event, pc) {//comp, 
//		this.comp = comp;
		this.event = event;
		this.pickerConfig = pc;
		this.isSearchComplete = true;

//		var beginTitle = comp.getValue().length == 0 ? 'Add' : 'Replace';
//		this.title = beginTitle + ' Group to '+ Ext.get('label'+ comp.getId()).dom.innerHTML +'<br><hr>';
		
		AIR.AirGroupPicker.superclass.constructor.call(this);
	},

	initComponent: function() {
		Ext.apply(this, {
			title: this.title,//'Add CWID<br/><hr>',
			title: 'Add Group<br/><hr>',
			id: 'grouppickertip',
			
			hidden: true,
			autoHeight: true,
			minWidth: 400,
			maxWidth: 450,
			
			//width: 450,
			
			autoDestroy: true,
			draggable: true,
			resizeable: true,
			
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
				xtype: 'compositefield',
				id: 'cfGroupSearch',
				
				fieldLabel: '',
				
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

				    width: 210,
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
				}]
			},{
				xtype: 'listview',
				id: 'lvGroups',
				
				store: AIR.AirStoreFactory.createGroupPickerStore(),
				
				singleSelect: false,
				emptyText: '',
				autoScroll: true,
				height: 200,//95
				//width: 400,
				
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
	    
	    var field = this.getComponent('cfGroupSearch').items.items[0];
	    field.on('search', this.onSearch, this);
	    field.on('specialkey', this.onEnter, this);
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
//		var queryTask = new Ext.util.DelayedTask(function() {
		
//			var field = this.getComponent('cfGroupSearch').items.items[0];//this.getComponent('cfSearch').getComponent('ppQueryField');//Ext.getCmp('ppQueryField')
		var store = this.getComponent('lvGroups').getStore();
		//			var field = Ext.getCmp('gpQueryField');
		
		if (field.getValue().length > 2 && this.isSearchComplete) {
			this.isSearchComplete = false;
			
			var searchType = this.getComponent('cfGroupSearch').items.items[1].getValue().inputValue;
			
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
			
			//if(this.isSearchComplete) {
			
				store.load({
					params: params,
					callback: function() {
						this.isSearchComplete = true;
					}.createDelegate(this)
				});
			//}
	   } else {
		   store.removeAll();
	   }
//		}.createDelegate(this));
//		
//		queryTask.delay(500);//2000
	},
	
	update: function(comp, groupType) {
		this.comp = comp;
		this.groupType = groupType;
		
		var tfSearch = this.getComponent('cfGroupSearch').items.items[0];
		tfSearch.reset();
		tfSearch.focus(true, 500);
		
		this.getComponent('cfGroupSearch').items.items[1].setValue('Full');//funktioniert erst nach dem Rendern! Ext.getCmp('ppQuerySelectorGroup').setValue('ppQuerySelectorName', true);
		
		var beginTitle = this.comp.getValue().length == 0 ? 'Add' : 'Replace';
		var title = beginTitle + ' Group to '+ Ext.get('label'+ this.comp.getId()).dom.innerHTML +'<br><hr>';
		
		this.setTitle(title);
	},
	
	close: function() {
		var lvPersons = this.getComponent('lvGroups');
		lvPersons.getStore().removeAll();
		
//		this.destroy();
		this.hide();
	}
});