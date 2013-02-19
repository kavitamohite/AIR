Ext.namespace('AIR');

AIR.CiSpecificsView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
		    border: false,
		    padding: 10,
		    
//		    title: '',
		    header: true,

		    layout: 'card',
		    activeItem: 0,
		    
		    items: [{
		    	id: 'clCiSpecificsAnwendung',
		        xtype: 'AIR.CiSpecificsAnwendungView'
			},{
		    	id: 'clCiSpecificsLocationItem',
		        xtype: 'AIR.CiSpecificsLocationItemView'
			}/*,{
		    	id: 'clCiSpecificsTerrain',
		        xtype: 'AIR.CiSpecificsTerrainView'
			}*/]
		});
		
		AIR.CiSpecificsView.superclass.initComponent.call(this);
	},
	

	ciChange: function(event, view, item, values) {
		this.fireEvent(event, this, item, values);
	},

	update: function(data) {
		var specificsView = this.getSpecificsViewByTableId(parseInt(data.tableId));//parseInt(
		specificsView.update(data);
		
		this.getLayout().setActiveItem(specificsView.getId());
	},
	
	
	setData: function(data) {
		var specificsView = this.getSpecificsViewByTableId(parseInt(data.tableId));//parseInt(
		specificsView.setData(data);
	},

	
	validate: function(item) {
		/*switch(item.getId()) {
			case 'cbIsTemplate':
			
				break;
			default: break;
		}*/
	},
	

	
	updateLabels: function(labels) {//, tableId
		this.setTitle(labels.specificsPanelTitle);

//		var specificsView = this.getSpecificsViewByTableId(parseInt(tableId));//parseInt(
//		specificsView.updateLabels(labels);
		
		for(var i = 0; i < this.items.items.length; i++)
			this.items.items[i].updateLabels(labels);
			
	},
	
	updateToolTips: function(toolTips, tableId) {
		var specificsView = this.getSpecificsViewByTableId(parseInt(tableId));//parseInt(
		specificsView.updateToolTips(toolTips);
	},
	

	getSpecificsViewByTableId: function(tableId) {
		var specificsView;
		
		switch(tableId) {
			case AC.TABLE_ID_APPLICATION:
				specificsView = this.getComponent('clCiSpecificsAnwendung');
				break;
			case AC.TABLE_ID_ROOM:
			case AC.TABLE_ID_BUILDING:
			case AC.TABLE_ID_BUILDING_AREA:
			case AC.TABLE_ID_POSITION:
			case AC.TABLE_ID_TERRAIN:
			case AC.TABLE_ID_SITE:
				specificsView = this.getComponent('clCiSpecificsLocationItem');
				break;
		}
		
		return specificsView;
	}
});
Ext.reg('AIR.CiSpecificsView', AIR.CiSpecificsView);