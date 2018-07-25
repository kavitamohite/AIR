Ext.namespace('AIR');

AIR.AirPersonPicker = Ext.extend(Ext.Tip, {
	constructor: function(event, pc) {//comp, 
//		this.comp = comp;
		this.event = event;
		this.pickerConfig = pc;		
		
//		var beginTitle = comp.getValue().length == 0 ? 'Add' : 'Replace';
//		this.title = beginTitle + ' CWID to ' + Ext.get('label' + comp.getId()).dom.innerHTML + '<br><hr>';//personpickercomponent
		
		AIR.AirPersonPicker.superclass.constructor.call(this);
	},

	initComponent: function() {
		Ext.apply(this, {
			title: this.title,//'Add CWID<br/><hr>',
			id: 'personpickertip',
			autoHeight: true,
			width: 800,
			
			autoDestroy: true,
			draggable: true,
			layout: 'form',
			labelWidth: 5,
			cls: 'filter',
			
			tools: [{
				id: 'close',
				qtip: 'Cancel',
				handler: function(event, toolEl, panel, object) {
//					ppHandleToolClick(event, toolEl, panel, object);
					this.close();
				}.createDelegate(this)
			}],
			
			items: [{
				xtype: 'compositefield',
				id: 'cfSearch',
				fieldLabel: '',
				
				items: [{
					xtype: 'searchfield',//textfield
					id: 'ppQueryField',
					
					maskRe: /[\w\xc0-\xd6\xd8-\xf6\xf8-\xff\d\-, ]/,
					enableKeyEvents: true
				}, {
					id: 'ppQuerySelectorGroup',
					xtype: 'radiogroup',
					itemCls: 'x-check-group-alt',

					width: 120,
					columns: 2,//[ 55, 55 ],
					
					style: {
						marginLeft: 10
					},
					
					items: [{
						boxLabel: '<span style="font-size: 10px;">Name</span>',//style config param instead of this
//						id: 'ppQuerySelectorName',
						name: 'ppQuerySelector',
						inputValue: 'Name',
						checked: true
					}, {
						boxLabel: '<span style="font-size: 10px;">CWID</span>',//style config param instead of this
//						id: 'ppQuerySelectorCWID',
						name: 'ppQuerySelector',
						inputValue: 'CWID'
					}]
				}]
			}, {
				xtype: 'listview',
				id: 'lvPersons',
				
				store: AIR.AirStoreFactory.createPersonPickerStore(),//'ppStore',
				singleSelect: false,
				emptyText: '',
				autoScroll: true,
				height: 200,//75
				//width: 400,
				
				loadingText: '&nbsp;',
				emptyText: 'No person(s) found.',
				
				columns: [{
					tpl: '<img src="' + img_AddSelectedPerson + '">',
					width: 0.10
				}, {
					header: 'CWID',
					dataIndex: 'cwid',
					width: 0.15
				}, {
					header: 'Last name',
					dataIndex: 'lastname'
				}, {
					header: 'First name',
					dataIndex: 'firstname'
				}],
				
				listeners: {
					click: function(dv, index, node, event) {
						this.updateField(dv.getRecord(node), this.comp, this.pickerConfig);//personpickercomponent
					}.createDelegate(this)
				}
			}],
			bbar: [ '->', {
				xtype: 'button',
				id: 'ppClose',
				text: 'Close',
				handler: function(button, event) {
//					this.ppHandleToolClick(event, null, null, button);
					this.close();
				}.createDelegate(this)
			}]
		});
		
	    AIR.AirPersonPicker.superclass.initComponent.call(this);
	    
	    this.addEvents('personAdd');
	    
	    var field = this.getComponent('cfSearch').items.items[0];
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
		
		if(!hiddenElement){
			hiddenElement = comp.ownerCt.getComponent(comp.getItemId() + 'Hidden');
		}
		
		if (element) {
			if (element.maxContacts && element.maxContacts > 1) {
				if (element.getValue().length == 0) {
					element.setValue(record.get('lastname') + ', ' + record.get('firstname') + ' (' + record.get('cwid') + ')');
				} else if (element.getValue().indexOf(record.get('firstname') + ' ' + record.get('lastname') + ' (' + record.get('cwid') + ')') === -1) {
					element.setValue(element.getValue() + '\n' + record.get('lastname') + ', ' + record.get('firstname')	+ ' (' + record.get('cwid') + ')');
				} else {
					contains = true; // CWID is in List
				}
			} else {
				if(this.pickerConfig && this.pickerConfig.cwidOnly) {
					element.setValue(record.get('cwid'));
				} else {
					element.setValue(record.get('lastname') + ', ' + record.get('firstname') + ' (' + record.get('cwid') + ')');
				}
				
				if(this.pickerConfig && this.pickerConfig.callback)
					this.pickerConfig.callback();
			}
		}
		if (hiddenElement) {
			if (element.maxContacts && element.maxContacts > 1) {
				if(!contains) {
					var v = hiddenElement.getValue();
					
					if(v.length > 0)
						v += ',';
					
					v += record.get('cwid');
					
					hiddenElement.setValue(v);
				}
			} else {
				hiddenElement.setValue(record.get('cwid'));
			}
			
			this.fireEvent('personAdd', this, element, hiddenElement, record);
		}
		
		this.close();
	},
	
	onSearch: function(field) {
		var store = this.getComponent('lvPersons').getStore();
		
		if(field.getValue().length >= 2) {
			var searchType = this.getComponent('cfSearch').items.items[1].getValue().inputValue;
			
			var params = {
				queryMethod: searchType,//.getValue().inputValue,//Ext.getCmp('ppQuerySelectorGroup') //this.getComponent('cfSearch').getComponent('ppQuerySelectorGroup')
				query: field.getValue(),
				primaryCWID: 'Y',
				secondaryCWID: 'N',
				machineCWID: 'N'
			};
			
			if(this.pickerConfig && this.pickerConfig.functionCWID)
				params.functionCWID = this.pickerConfig.functionCWID;
			
			store.load({
				params: params
			});

		} else {
			store.removeAll();
		}
	},
	
	update: function(comp) {
		this.comp = comp;
		
		var tfSearch = this.getComponent('cfSearch').items.items[0];
		tfSearch.reset();
		tfSearch.focus(true, 500);
		
		this.getComponent('cfSearch').items.items[1].setValue('Name');//funktioniert erst nach dem Rendern! Ext.getCmp('ppQuerySelectorGroup').setValue('ppQuerySelectorName', true);
		
		
		var beginTitle = this.comp.getValue().length == 0 ? 'Add' : 'Replace';
		if(Ext.get('label'+this.comp.getId())){
			var title = beginTitle + ' CWID to '+ Ext.get('label'+ this.comp.getId()).dom.innerHTML +'<br>(Type "Lastname, Firstname" or "CWID")<br><hr>';
		} else {
			var title = beginTitle + ' CWID to '+ this.comp.label +'<br>(Type "Lastname, Firstname" or "CWID")<br><hr>';
		}
		
		this.setTitle(title);
	},
	
	close: function() {
		var lvPersons = this.getComponent('lvPersons');
		lvPersons.getStore().removeAll();
		
//		this.destroy();
		this.hide();
	}
});