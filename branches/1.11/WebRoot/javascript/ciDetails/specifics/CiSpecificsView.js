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
		var specificsView = this.getSpecificsViewByTableId(parseInt(data.ciTableId));//parseInt(
		specificsView.update(data);
	},
	
	
	setData: function(data) {
		var specificsView = this.getSpecificsViewByTableId(parseInt(data.ciTableId));//parseInt(
		specificsView.setData(data);
	},

	
	validate: function(item) {
		/*switch(item.getId()) {
			case 'cbIsTemplate':
			
				break;
			default: break;
		}*/
	},
	

	
	updateLabels: function(labels, ciTableId) {
		this.setTitle(labels.specificsPanelTitle);

		var specificsView = this.getSpecificsViewByTableId(parseInt(ciTableId));//parseInt(
		specificsView.updateLabels(labels);
	},
	
	updateToolTips: function(toolTips, ciTableId) {
		var specificsView = this.getSpecificsViewByTableId(parseInt(ciTableId));//parseInt(
		specificsView.updateToolTips(toolTips);
	},
	

	getSpecificsViewByTableId: function(tableId) {
		var specificsView;
		
		switch(tableId) {
			case AC.TABLE_ID_APPLICATION:
				specificsView = this.getComponent('clCiSpecificsAnwendung');
				break;
			case AC.TABLE_ID_TERRAIN:
				specificsView = this.getComponent('clCiSpecificsTerrain');
				break;
		}
		
		return specificsView;
	}
});
Ext.reg('AIR.CiSpecificsView', AIR.CiSpecificsView);