var grouppickerTip;
var grouppickercomponent;
var currentGroupType;

var pickerConfig;

var gpQueryTask = new Ext.util.DelayedTask(function(){
	var field = Ext.getCmp('gpQueryField');
	if (field.getValue().length>=3) {
		gpStore.baseParams = {};
		switch (Ext.getCmp('gpQuerySelectorGroup').getValue().inputValue) {
		case "Normal" :
			gpStore.setBaseParam(currentGroupType, 'Y');
	    	gpStore.setBaseParam('groupName', field.getValue());
	    	gpStore.setBaseParam('fullLikeSearch', 'N');
	    	break;
		case "Full" :
			gpStore.setBaseParam(currentGroupType, 'Y');
	    	gpStore.setBaseParam('groupName', field.getValue());
	    	gpStore.setBaseParam('fullLikeSearch', 'Y');
    		break;
		case "CWID" :
			gpStore.setBaseParam(currentGroupType, 'Y');
	    	gpStore.setBaseParam('managerCWID', field.getValue());
	    	break;
		};
	    gpStore.load();
   } else {
	   	gpStore.removeAll();
   }
});


var gpstoreRecordDef = Ext.data.Record.create([
		{name: 'groupname', mapping: 'groupName'},
		{name: 'groupid', mapping: 'groupId'},
		{name: 'managercwid', mapping: 'managerCwid'}
	]);

var gpstoreReader = new Ext.data.XmlReader({
    record: "return",
    idProperty: 'groupid'
}, gpstoreRecordDef); 

var gpStore = new Ext.data.XmlStore({
    // store configs
    autoDestroy: true,
    storeId: 'gpStore',
    autoLoad : false,
	proxy : new Ext.ux.soap.SoapProxy({
		url : webcontext +'/GroupsWSPort',
		loadMethod: 'findGroups',
		timeout : 120000,
		reader : gpstoreReader
	}),
	fields: [ 	'groupname',
				'groupid',
				'managercwid'
	          ],
    // reader configs
	reader : gpstoreReader,
	baseParams: {groupName:''}
});



function gpHandleToolClick(e, t, p, tc) {
	//if (tc.id === 'gpClose') {
		Ext.getCmp('gpQueryField').setValue('');
		gpStore.removeAll();
		Ext.getCmp('grouppickertip').hide();
//		viewport.doLayout();
	//}
}

function addGroup2Field(record, comp, pickerConfig) {
	var element = Ext.getCmp(comp);
	var hiddenElement = Ext.getCmp(comp + 'Hidden');
	var contains = false;
	if (element!==undefined) {
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
	if (hiddenElement!==undefined) {
		if (element.maxContacts !== undefined && element.maxContacts > 1) {
			if (!contains) {
				hiddenElement.setValue(hiddenElement.getValue() + ',' + record.get('groupid'));
			}
		} else {
			hiddenElement.setValue(record.get('groupid'));
		}
		
	}
	
	
//	var layout = Ext.getCmp('workpanel').layout;
	var activeItemId = this.pickerConfig && this.pickerConfig.parentCt ? this.pickerConfig.parentCt : '';//'editPanel';//layout.activeItem.getId();
	
//	if (Ext.getCmp('workpanel').layout.acitveItem === 'editPanel') {
//	if(activeItemId === 'editPanel')
	if(!pickerConfig)// && pickerConfig.noAction
		activateButtonSaveApplication();
	
	gpHandleToolClick(null, null, null, null);
}

function createGroupPickerTip(evt, comp, grouptype, pickerConfig) {
	this.pickerConfig = pickerConfig;
	
	grouppickercomponent = comp;
	if (Ext.get('personpickertip') !== null && Ext.get('personpickertip') !== undefined) {
		ppHandleToolClick(null, null, null, null);
	}
	if (Ext.get('grouppickertip') !== null && Ext.get('grouppickertip') !== undefined) {
		gpHandleToolClick(null, null, null, null);
	}

	if (Ext.getCmp('grouppickertip')===undefined) {
		grouppickerTip = new Ext.Tip({
			title : 'Add Group<br/><hr>',
			id : 'grouppickertip',
			hidden: true,
			autoHeight : true,
			minWidth: 400,
			maxWidth: 450,
			autoDestroy: true,
			draggable: true,
			resizeable: true,
			layout: 'form',
			labelWidth : 5,
			cls: 'filter',
			tools : [
		      { id: 'close',
	               qtip: 'Cancel',
		           handler: function (event, toolEl, panel, object) {
		        	   gpHandleToolClick(event, toolEl, panel, object);
		           }
		      }
	        ],
			items : [{
				xtype: 'compositefield',
				fieldLabel: '',
				items: [{ xtype: 'textfield', 
					      id: 'gpQueryField',
					      hidden: false,
					      enableKeyEvents: true,
					      maskRe: /[\w\d\-+\/ ,&]/,
					      listeners: {
			                  keyup: {
			                	  fn : function (field) {
			                		  gpQueryTask.delay(500);
			                	  }
			                  }
					      }
						},
						{
						    id:'gpQuerySelectorGroup',
						    xtype: 'radiogroup',
						    itemCls: 'x-check-group-alt',
						    // Put all controls in a single column with width 100%
						    columns: [85, 105],
						    items: [
						        /*{boxLabel: 'Starts with', name: 'gpQuerySelector', inputValue: 'Normal', checked: true},*/
						        {boxLabel: '<span style="font-size: 10px;">Groupname</span>', id: 'gpQuerySelectorName', name: 'gpQuerySelector', inputValue: 'Full', checked: true},
						        {boxLabel: '<span style="font-size: 10px;">Manager&nbsp;(CWID)</span>', id: 'gpQuerySelectorManager', name: 'gpQuerySelector', inputValue: 'CWID'}
						    ],
						    listeners: {
						    	change: function (rg, radio) {
						    		Ext.getCmp('gpQueryField').setValue('');
						    	}
						    }
						}]
				}, 
				{
					xtype: 'listview',
					store: 'gpStore',
					singleSelect: false,
					emptyText: '',
					autoScroll: true,
					height: 95,
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
						click: function(dv, index, node, evt) {
							addGroup2Field(dv.getRecord(node), grouppickercomponent, pickerConfig);
						}
					}
				}
			],
			bbar: [
		        '->', {
		    	    xtype: 'button',
		    	    id: 'gpClose',
		            text: 'Close',
		            handler: function (button, event) {
			            gpHandleToolClick(event, null, null, button);
			        }
		        }
		    ]
		});
//		grouppickerTip.addEvents('onblur');
//		grouppickerTip.addListener('onblur', gpHandleToolClick(null, null, null, null));
//		viewport.add(grouppickerTip);
	}
	var xpos = evt.clientX || evt.xy[0];
	var ypos = evt.clientY || evt.xy[1];

//	if(Ext.getCmp('workpanel').lastSize.width - 400 < xpos)
//		xpos = xpos - 400;
//	
//	if(Ext.getCmp('workpanel').lastSize.height - 150 < ypos)
//		ypos = ypos - 150;
	
	gpStore.baseParams = {};
	if (grouptype!==undefined) {
		currentGroupType = grouptype;
	} else {
		currentGroupType = "";
	}
	grouppickerTip.setTitle('Add Group to '+ Ext.get('label'+grouppickercomponent).dom.innerHTML +'<br><hr>');
	grouppickerTip.showAt([xpos, ypos]);
	Ext.getCmp('gpQuerySelectorGroup').setValue('gpQuerySelectorName', true);
	Ext.getCmp('gpQueryField').focus(false, 100);
}