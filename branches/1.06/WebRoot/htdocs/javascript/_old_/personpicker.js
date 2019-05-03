var personpickerTip;
var personpickercomponent;

var pickerConfig;

var ppQueryTask = new Ext.util.DelayedTask(function() {
	var field = Ext.getCmp('ppQueryField');
	if (field.getValue().length >= 2) {
		ppStore.baseParams = {};
		switch (Ext.getCmp('ppQuerySelectorGroup').getValue().inputValue) {
			case "Name":
				ppStore.setBaseParam('queryMethod', 'Name');
				break;
			case "CWID":
				ppStore.setBaseParam('queryMethod', 'CWID');
				break;
		}
		
		ppStore.setBaseParam('query', field.getValue());
		ppStore.setBaseParam('primaryCWID', 'Y');
		ppStore.setBaseParam('secondaryCWID', 'N');
		ppStore.setBaseParam('machineCWID', 'N');
		
		if (pickerConfig && pickerConfig.functionCWID) {
			ppStore.setBaseParam('functionCWID', pickerConfig.functionCWID);
		}
		ppStore.load();
	} else {
		ppStore.removeAll();
	}
});

var ppstoreRecordDef = Ext.data.Record.create([ {
	name : 'cwid',
	mapping : 'cwid'
}, {
	name : 'lastname',
	mapping : 'lastname'
}, {
	name : 'firstname',
	mapping : 'firstname'
} ]);

var ppstoreReader = new Ext.data.XmlReader({
	record : "return",
	idProperty : 'cwid'
}, ppstoreRecordDef);

var ppStore = new Ext.data.XmlStore({
	// store configs
	autoDestroy : true,
	storeId : 'ppStore',
	autoLoad : false,
	proxy : new Ext.ux.soap.SoapProxy({
		url : webcontext + '/PersonsWSPort',
		loadMethod : 'findPersonsByCWID',
		timeout : 120000,
		reader : ppstoreReader
	}),
	fields : [ 'cwid', 'firstname', 'lastname' ],
	// reader configs
	reader : ppstoreReader,
	baseParams : {
		cwid : '',
		primaryCWID : 'Y'
	}
});

function ppHandleToolClick(e, t, p, tc) {
	// if (tc.id === 'close' || tc.id === 'ppClose') {
	Ext.getCmp('ppQueryField').setValue('');
	ppStore.removeAll();
	Ext.getCmp('personpickertip').hide();
//	viewport.doLayout();
	// }
}

function addCWID2Field(record, comp, pickerConfig) {
	var element = Ext.getCmp(comp);
	var hiddenElement = Ext.getCmp(comp + 'Hidden');
	var contains = false;
	if (element !== undefined) {
		if (element.maxContacts !== undefined && element.maxContacts > 1) {
			if (element.getValue().length == 0) {
				element.setValue(record.get('firstname') + ' ' + record.get('lastname') + ' (' + record.get('cwid') + ')');
			} else if (element.getValue().indexOf(record.get('firstname') + ' ' + record.get('lastname') + ' (' + record.get('cwid') + ')') === -1) {
				element.setValue(element.getValue() + '\n' + record.get('firstname') + ' ' + record.get('lastname')	+ ' (' + record.get('cwid') + ')');
			} else {
				contains = true; // CWID is in List
			}
		} else {
			if(pickerConfig && pickerConfig.cwidOnly) {
				element.setValue(record.get('cwid'));
			} else {
				element.setValue(record.get('firstname') + ' ' + record.get('lastname') + ' (' + record.get('cwid') + ')');
			}
			
			if(pickerConfig && pickerConfig.callback)
				pickerConfig.callback();
		}
	}
	if (hiddenElement !== undefined) {
		if (element.maxContacts !== undefined && element.maxContacts > 1) {
			if (!contains) {
				hiddenElement.setValue(hiddenElement.getValue() + ',' + record.get('cwid'));
			}
		} else {
			hiddenElement.setValue(record.get('cwid'));
		}
	}
	
	//refac using pickerConfig or create full class including all functions such as save/cancel button handling
//	var layout = Ext.getCmp('workpanel').layout;
	var activeItemId = '';//layout.activeItem.getId();
	
//	if (Ext.getCmp('workpanel').layout.acitveItem === 'editPanel') {
//	if (activeItemId === 'editPanel' && !pickerConfig)
	if(!pickerConfig)// && pickerConfig.noAction
		activateButtonSaveApplication();
	
	ppHandleToolClick(null, null, null, null);
}

function createPersonPickerTip(evt, comp, pc) {
	pickerConfig = pc;
	
	personpickercomponent = comp;
	if (Ext.get('personpickertip') !== null && Ext.get('personpickertip') !== undefined) {
		ppHandleToolClick(null, null, null, null);
	}
	if (Ext.get('grouppickertip') !== null && Ext.get('grouppickertip') !== undefined) {
		gpHandleToolClick(null, null, null, null);
	}
//	viewport.doLayout();
	if (Ext.getCmp('personpickertip') === undefined) {
		personpickerTip = new Ext.Tip({
			title : 'Add CWID<br/><hr>',
			id : 'personpickertip',
			hidden : true,
			autoHeight : true,
			minWidth : 300,
			maxWidth : 400,
			autoDestroy : true,
			draggable : true,
			layout : 'form',
			labelWidth : 5,
			cls : 'filter',
			tools : [ {
				id : 'close',
				qtip : 'Cancel',
				handler : function(event, toolEl, panel, object) {
					ppHandleToolClick(event, toolEl, panel, object);
				}
			} ],
			items : [ {
				xtype : 'compositefield',
				fieldLabel : '',
				items : [ {
					xtype : 'textfield',
					id : 'ppQueryField',
					hidden : false,
					enableKeyEvents : true,
					maskRe : /[\w\xc0-\xd6\xd8-\xf6\xf8-\xff\d\-, ]/,
					listeners : {
						keyup : {
							fn : function(field) {
								ppQueryTask.delay(500);
							}
						}
					}
				}, {
					id : 'ppQuerySelectorGroup',
					xtype : 'radiogroup',
					itemCls : 'x-check-group-alt',
					// Put all controls in a single column with width 100%
					columns : [ 55, 55 ],
					items : [ {
						boxLabel : '<span style="font-size: 10px;">Name</span>',
						id : 'ppQuerySelectorName',
						name : 'ppQuerySelector',
						inputValue : 'Name',
						checked : true
					}, {
						boxLabel : '<span style="font-size: 10px;">CWID</span>',
						id : 'ppQuerySelectorCWID',
						name : 'ppQuerySelector',
						inputValue : 'CWID'
					}],
					listeners : {
						change : function(rg, radio) {
							Ext.getCmp('ppQueryField').setValue('');
						}
					}
				} ]
			}, {
				xtype : 'listview',
				store : 'ppStore',
				singleSelect : false,
				emptyText : '',
				autoScroll : true,
				height : 75,
				loadingText : '&nbsp;',
				emptyText : 'No person(s) found.',
				columns : [ {
					tpl : '<img src="' + img_AddSelectedPerson + '">',
					width : 0.10
				}, {
					header : 'CWID',
					dataIndex : 'cwid'
				}, {
					header : 'Last name',
					dataIndex : 'lastname'
				}, {
					header : 'First name',
					dataIndex : 'firstname'
				}],
				listeners: {
					click: function(dv, index, node, evt) {
						addCWID2Field(dv.getRecord(node), personpickercomponent, pickerConfig);
					}
				}
			}],
			bbar: [ '->', {
				xtype: 'button',
				id: 'ppClose',
				text: 'Close',
				handler: function(button, event) {
					ppHandleToolClick(event, null, null, button);
				}
			}]
		});
	}
	
	var xpos = evt.clientX || evt.xy[0];
	var ypos = evt.clientY || evt.xy[1];

//	if(Ext.getCmp('workpanel').lastSize.width - 300 < xpos)
//		xpos = xpos - 300;
//	
//	if(Ext.getCmp('workpanel').lastSize.height - 150 < ypos)
//		ypos = ypos - 150;
	
	
	var uiComp = Ext.getCmp(comp);
	var beginTitle = uiComp.getValue().length == 0 ? 'Add' : 'Replace';
	var title = beginTitle + ' CWID to ' + Ext.get('label' + personpickercomponent).dom.innerHTML + '<br><hr>';
	
//	var title = 'Add CWID to ' + Ext.get('label' + personpickercomponent).dom.innerHTML + '<br><hr>';
	
	personpickerTip.setTitle(title);
	personpickerTip.showAt([ xpos, ypos ]);
	Ext.getCmp('ppQuerySelectorGroup').setValue('ppQuerySelectorName', true);
	Ext.getCmp('ppQueryField').focus(false, 100);
}