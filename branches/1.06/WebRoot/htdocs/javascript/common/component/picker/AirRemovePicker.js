Ext.namespace('AIR');

AIR.AirRemovePicker = Ext.extend(Ext.Tip, {
	constructor: function(event, pc) {
		this.event = event;
		this.pickerConfig = pc;		
		
		AIR.AirRemovePicker.superclass.constructor.call(this);
	},

	initComponent: function() {
		Ext.apply(this, {
			title: 'Remove<br/><hr>',
			id: 'recordremovertip',
			hidden: true,
			autoHeight: true,
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
		        	this.close();
		        }.createDelegate(this)
		    }],
		    
			items: [{
				xtype: 'listview',
				id: 'lvRemoveRecords',
				
				store: AIR.AirStoreFactory.createRemovePickerStore(),
				
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
					click: function(dv, index, node, event) {
						this.updateField(dv.getRecord(node), this.comp, this.pickerConfig);
					}.createDelegate(this)
				}
			}],
			bbar: ['->', {
	    	    xtype: 'button',
	    	    id: 'bRrClose',
	            text: 'Close',
	            handler: function (button, event) {
		           this.close();
		        }.createDelegate(this)
	        }]
		});
		
	    AIR.AirRemovePicker.superclass.initComponent.call(this);
	    
	    this.addEvents('recordRemove');
	},
	
	
	updateField: function(record, comp, pickerConfig) {//, pickerConfig
		var element = Ext.getCmp(this.comp.getId());
		var hiddenElement = Ext.getCmp(this.comp.getId() + 'Hidden');
		
		var values = '';
		var hiddenValues = '';
		var i = 0;
		
		var isNewLine = false;
		
		var store = this.getComponent('lvRemoveRecords').getStore();
		store.each(function(rec) {
			if(rec.get('hidden') !== record.get('hidden')) {
				if (i===0) {
					values = rec.get('value');
					hiddenValues = rec.get('hidden');
				} else {
					values += '\n' + rec.get('value');
					hiddenValues += ',' + rec.get('hidden');
				}
				++i;
			}
		});
		
		element.setValue(values);
		hiddenElement.setValue(hiddenValues);
		
		if(pickerConfig) 
			if(pickerConfig.callback)
				pickerConfig.callback();
		
		
		this.fireEvent('recordRemove', this, element, hiddenElement);
		
		this.close();
	},
	
	
	
	update: function(comp) {
		this.comp = comp;
		var store = this.getComponent('lvRemoveRecords').getStore();
		
		store.removeAll();
		var element = Ext.getCmp(comp.getId());
		var hiddenElement = Ext.getCmp(comp.getId() + 'Hidden');
		
		if (element && hiddenElement ) {
			values = element.getValue().split('\n');
			hiddenValues = hiddenElement.getValue().split(',');
			if(values.length > 0 && values[0].length > 0) {
				rec = [];
				
				for(i = 0; i < values.length; ++i)
					rec[i] = [i, hiddenValues[i], values[i]];
				
				store.loadData(rec);
			}
		}

		this.setTitle('Remove Records from '+ Ext.get('label'+comp.getId()).dom.innerHTML +'<br><hr>');
	},
	
	close: function() {
		var lvRemoveRecords = this.getComponent('lvRemoveRecords');
		lvRemoveRecords.getStore().removeAll();
		
//		this.destroy();
		this.hide();
	}
});