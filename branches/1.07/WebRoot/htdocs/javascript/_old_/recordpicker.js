var recordpickerTip;
var recordpickercomponent;
var recordpickerObjectType;

var rpQueryTask = new Ext.util.DelayedTask(function(){
	var field = Ext.getCmp('rpQueryField');
	if (field.getValue().length>=2) {
		rpStore.baseParams = {};
    	rpStore.setBaseParam('query', field.getValue());
    	if (recordpickerObjectType===null) {
    		rpStore.setBaseParam('type', Ext.getCmp('rpQuerySelectorRecord').getValue());
    	} else {
    		rpStore.setBaseParam('type', recordpickerObjectType);
    	}
	    rpStore.load();
   } else {
	   	rpStore.removeAll();
   }
});


var rpstoreRecordDef = Ext.data.Record.create([
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

var rpstoreReader = new Ext.data.XmlReader({
    record: "viewdataDTO",
    idProperty: 'id'
}, rpstoreRecordDef); 

var rpStore = new Ext.data.XmlStore({
    // store configs
    autoDestroy: true,
    storeId: 'rpStore',
    autoLoad : false,
	proxy : new Ext.ux.soap.SoapProxy({
		url : webcontext +'/CiEntityWSPort',
		loadMethod: 'findCiEntities',
		timeout : 120000,
		reader : rpstoreReader
	}),
	fields: [ 	'id',
	          	'type',
	          	'name',
	          	'alias',
	          	'responsible',
	          	'subResponsible',
	          	'category',
	          	'tableId',
	          	'ciId'
	          ],
    // reader configs
	reader : rpstoreReader,
	baseParams: {query:''}
});



function rpHandleToolClick(e, t, p, tc) {
	//if (tc.id === 'gpClose') {
		Ext.getCmp('rpQueryField').setValue('');
		rpStore.removeAll();
		Ext.getCmp('recordpickertip').hide();
//		viewport.doLayout();
	//}
}

function addRecord2ConnectionGrid (record, comp) {
	var element = Ext.getCmp(comp);
	if (element.getXType()==='grid') {
		var connectionRecord = new ciConnectionRecordDef({
				id: -1,
				type: record.get('type'), 
			    name: record.get('name'), 
			    alias: record.get('alias'), 
			    responsible: record.get('responsible'), 
			    subResponsible: record.get('subResponsible'),
			    category: record.get('category'), 
			    tableId: record.get('tableId'),
			    ciId: record.get('ciId'), 
			    direction: record.get('direction'),
			    groupsort: 'L::' + record.get('type'),
			    status: 'I'
				});
		element.store.addSorted(connectionRecord);
	} else {
		var hiddenElement = Ext.getCmp(comp + 'Hidden');
		var contains = false;
		maxWidth = 25;
		if (element !== undefined) {
			if (element.getXType() === 'textarea') {
				if (maxWidth<record.get('name').length) {
					maxWidth = (record.get('name').length>50?50:record.get('name').length);
				}
				if (element.getValue().length == 0) {
					element.setWidth(maxWidth*7);
					element.setValue(record.get('name'));
				} else if (element.getValue().indexOf(record.get('name')) === -1) {
					element.setWidth(maxWidth*8);
					element.setValue(element.getValue() + '\n' + record.get('name'));
				} else {
					contains = true; // Name is in List
				}
			} else {
				element.setValue(record.get('name'));
			}
		}
		if (hiddenElement !== undefined) {
			if (element.getXType() === 'textarea' && hiddenElement.getValue().length > 0) {
				if (!contains) {
					hiddenElement.setValue(hiddenElement.getValue() + ',' + record.get('ciId'));
				}
			} else {
				hiddenElement.setValue(record.get('ciId'));
			}
		}
	}
	
	
	//refac using pickerConfig or create full class including all functions such as save/cancel button handling
//	var layout = Ext.getCmp('workpanel').layout;
	var activeItemId = 'editPanel';//layout.activeItem.getId();
	
//	if (Ext.getCmp('workpanel').layout.acitveItem === 'editPanel') {
	if (activeItemId === 'editPanel')
		activateButtonSaveApplication();
	
	rpHandleToolClick(null, null, null, null);
	//element.getView().refresh();
}

function createRecordPickerTip(evt, comp, objectType) {
	recordpickercomponent = comp;
	if (Ext.get('recordpickertip') !== null && Ext.get('recordpickertip') !== undefined) {
		rpHandleToolClick(null, null, null, null);
	}
//	viewport.doLayout();
	if (Ext.getCmp('recordpickertip')===undefined) {
		recordpickerTip = new Ext.Tip({
			title : 'Add Connection<br/><hr>',
			id : 'recordpickertip',
			hidden: true,
			autoHeight : true,
			minWidth: 475,
			maxWidth: 550,
			autoDestroy: true,
			draggable: true,
			layout: 'form',
			labelWidth : 5,
			cls: 'filter',
			tools: [{
				id: 'close',
				qtip: 'Cancel',
				handler: function (event, toolEl, panel, object) {
					rpHandleToolClick(event, toolEl, panel, object);
				}
			}],
			
			items: [{
				xtype: 'container',
				layout: 'toolbar',
				
				items: [{ 
					xtype: 'textfield', 
					id: 'rpQueryField',
					hidden: false,
					enableKeyEvents: true,
					maskRe: /[\w\d\-+\/ ,&]/,
					listeners: {
						keyup: {
							fn: function (field) {
								rpQueryTask.delay(500);
							}
						}
					}
				},{
					id:'rpQuerySelectorRecord',
				    xtype: 'combo',
				    mode: 'local',
				    forceSelection: true,
				    autoSelect: true,
				    store: new Ext.data.ArrayStore({
				        id: 0,
				        fields: [
				            'type',
				            'displayText'
				        ],
				        data: [
				            ['Process', 'Business Process']
//						        , 
//						               ['Application', 'Application'],
//						               ['Application Platform', 'Application Platform'],
//						               ['Common Service', 'Common Service'],
//						               ['Middleware', 'Middleware']
				        ]
				    }),
				    valueField: 'type',
				    displayField: 'displayText',
				    listeners: {
				    	change: function (rg, radio) {
				    		Ext.getCmp('rpQueryField').setValue('');
				    	}
				    }
				}]
			}, {
				xtype: 'listview',
				store: 'rpStore',
				singleSelect: false,
				emptyText: '',
				autoScroll: true,
				height: 95,
				loadingText: '&nbsp;',
				emptyText: 'No records found.',
				columns: [{
					tpl: '<img src="' + img_AddSelectedConnection + '">',
					width: .05
				}, {
					header: 'Name',
					dataIndex: 'name'
				}, {
					header: 'Owner',
					dataIndex: 'responsible',
					width: .20
				}],
				listeners: {
					click: function(dv, index, node, evt) {
						addRecord2ConnectionGrid(dv.getRecord(node), recordpickercomponent);
					}
				}
			}],
			bbar: ['->', {
	    	    xtype: 'button',
	    	    id: 'rpClose',
	            text: 'Close',
	            handler: function (button, event) {
		            rpHandleToolClick(event, null, null, button);
		        }
	        }]
		});

//		viewport.add(recordpickerTip);
	}
	
	var xpos = evt.clientX;
	var ypos = evt.clientY;

//	if(Ext.getCmp('workpanel').lastSize.width - 475 < xpos)
//		xpos = xpos - 475;
//	
//	if(Ext.getCmp('workpanel').lastSize.height - 200 < ypos)
//		ypos = ypos - 200;
	
	if (undefined===objectType) {
		Ext.getCmp('rpQuerySelectorRecord').show();
		recordpickerObjectType = null;
	} else {
		Ext.getCmp('rpQuerySelectorRecord').hide(); 
		recordpickerObjectType = objectType;
	}
	
	gpStore.baseParams = {};
	
	if (undefined!==Ext.getCmp('label' + recordpickercomponent)) {
		label = Ext.get('label' + recordpickercomponent).dom.innerHTML;
	} else {
		label = 'connections';
	}
	
	recordpickerTip.setTitle('Add record to ' + label + '<br><hr>');
	recordpickerTip.showAt([xpos, ypos]);
	//Ext.getCmp('rpQuerySelectorRecord').setValue('Process');
	Ext.getCmp('rpQueryField').focus(false, 100);
}