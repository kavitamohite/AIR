var recordremoverTip;
var recordremovercomponent;

var pickerConfig;

var rrStore = new Ext.data.ArrayStore({
	idIndex: 0,
	storeId: 'rrStore',
	fields: [ 	
	    'id', 'hidden', 'value'
	]
});



function rrHandleToolClick(e, t, p, tc) {
	Ext.getCmp('recordremovertip').hide();
//	viewport.doLayout();
}

function removeRecordFromField(record, comp, pickerConfig) {
	var element = Ext.getCmp(comp);
	var hiddenElement = Ext.getCmp(comp + 'Hidden');
	var values = '';
	var hiddenValues = '';
	var i = 0;//(*1)
	
	var isNewLine = false;
	
	rrStore.each(function (rec) {
		//(*1)
		if (rec.get('hidden') !== record.get('hidden')) {
			if (i===0) {
				values = rec.get('value');
				hiddenValues = rec.get('hidden');
			} else {
				values += '\n' + rec.get('value');
				hiddenValues += ',' + rec.get('hidden');
			}
			++i;
		}
		
		
		/*
//		if(rec.data.value != record.data.value) {// && rec.data.hidden != record.data.hidden
		if (rec.get('hidden') !== record.get('hidden')) {
//			if(isNewLine) {
//				values += '\n';
//			} else isNewLine = true;
			
//			isNewLine = isNewLine ? values += '\n' : true;
			
			
			if(isNewLine) {
				values += '\n';
				hiddenValues += ',';
				
			} else {
				isNewLine = true;
			}
			
			values += rec.data.value;//rec record
			hiddenValues += record.data.hidden;//rec record
		}*/
	});
	
	
	
	
	element.setValue(values);
	hiddenElement.setValue(hiddenValues);//(*1)
	
	if(pickerConfig) {
		if(pickerConfig.callback)
			pickerConfig.callback();
	} else {
		activateButtonSaveApplication();
	}
	
	rrHandleToolClick(null, null, null, null);
}

function createRecordRemoverTip(evt, comp, pc) {
	pickerConfig = pc;
	
	recordremovercomponent = comp;
	
	if (Ext.get('personpickertip') !== null && Ext.get('personpickertip') !== undefined) {
		ppHandleToolClick(null, null, null, null);
	}
	if (Ext.get('grouppickertip') !== null && Ext.get('grouppickertip') !== undefined) {
		gpHandleToolClick(null, null, null, null);
	}
	if (Ext.get('recordremovertip') !== null && Ext.get('recordremovertip') !== undefined) {
		rrHandleToolClick(null, null, null, null);
	}
	
	
	if (Ext.getCmp('recordremovertip')===undefined) {
		recordremoverTip = new Ext.Tip({
			title : 'Remove<br/><hr>',
			id : 'recordremovertip',
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
			tools: [{
		        id: 'close',
	            qtip: 'Cancel',
		        handler: function (event, toolEl, panel, object) {
		        	rrHandleToolClick(event, toolEl, panel, object);
		        }
		    }],
			items: [{
				xtype: 'listview',
				store: 'rrStore',
				singleSelect: false,
				emptyText: '',
				autoScroll: true,
				height: 95,
				loadingText: '&nbsp;',
				
				columns: [{
					tpl: '<img src="' + img_RemovePersonGroup + '">',
					width: .10
				}, {
					header: 'hidden',
					dataIndex: 'hidden',
					hidden: true
				}, {
					header: 'Name',
					dataIndex: 'value',
					width: .90
				}],
				listeners: {
					click: function(dv, index, node, evt) {
						removeRecordFromField(dv.getRecord(node), recordremovercomponent, pickerConfig);
					}
				}
			}],
			bbar: ['->', {
	    	    xtype: 'button',
	    	    id: 'rrClose',
	            text: 'Close',
	            handler: function (button, event) {
		            rrHandleToolClick(event, null, null, button);
		        }
	        }]
		});
	}
	
	var xpos = evt.clientX || evt.xy[0];
	var ypos = evt.clientY || evt.xy[1];
//	if (viewport.get('workpanel').lastSize.width - 400 < xpos)
//		xpos = xpos - 400;
	
	
	rrStore.removeAll();
	var element = Ext.getCmp(comp);
	var hiddenElement = Ext.getCmp(comp + 'Hidden');
	
	if (undefined!==element && undefined!==hiddenElement ) {
		values = element.getValue().split("\n");
		hiddenValues = hiddenElement.getValue().split(",");
		rec = [];
		
		for(i = 0; i < values.length; ++i)
			rec[i] = [i, hiddenValues[i], values[i]];
		
		rrStore.loadData(rec);
	}

	recordremoverTip.setTitle('Remove Records from '+ Ext.get('label'+recordremovercomponent).dom.innerHTML +'<br><hr>');
	recordremoverTip.showAt([xpos, ypos]);

}