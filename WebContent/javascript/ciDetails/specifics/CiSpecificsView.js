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
		    	id: 'clCiSpecificsLocationItem',
		        xtype: 'AIR.CiSpecificsLocationItemView'
			},{
		    	id: 'clCiSpecificsItItem,
		        xtype: 'AIR.CiSpecificsItItemView'
			}*/]
		});
		
		AIR.CiSpecificsView.superclass.initComponent.call(this);
		
		this.addEvents('viewInitialized');
	},
	

	ciChange: function(event, view, item, values) {
		this.fireEvent(event, this, item, values);
	},

	//ORIG
//	update: function(data) {
//		var specificsView = this.getSpecificsViewByTableId(parseInt(data.tableId));//parseInt(
//		specificsView.update(data);
//		
//		this.getLayout().setActiveItem(specificsView.getId());
//	},
	
	clear: function(data) {
		this.update(data);
		
//		this.isCiCreate = true;
//		var specificsView = this.getSpecificsViewByTableId(data.tableId);
//		
//		if(specificsView.rendered) {
//			specificsView.clear(data);
//			
//			this.getLayout().setActiveItem(specificsView.getId());
//		} else {
//			
//			
//			this.add(specificsView);
//		}
	},

	update: function(data) {//ADEFFMS0402
		this.isCiCreate = data.isCiCreate;
		
		var specificsView = this.getSpecificsViewByTableId(parseInt(data.tableId));
		if(specificsView.rendered) {
//			specificsView.update(data);
			
			//! Sonst springt er wieder zur Maske des vorherig ausgew�hlten CI Typs. Grund: setActiveItem l�st
			//intern nochmal ein afterlayout aus. Dadurch wird in this.onViewAdded() wieder setActiveItem aufgerufen
			//und so wieder zur Maske des vorherig ausgew�hlten CI Typs zur�ckgeschaltet.
			this.un('add', this.onViewAdded, this);//afterlayout
			this.getLayout().setActiveItem(specificsView.getId());
			
			specificsView.update(data);

			
//			var h = specificsView.getHeight();
			this.updateHeight(specificsView);
		} else {
//			this.data = data;
			this.on('add', this.onViewAdded, this);//afterlayout
			this.add(specificsView);
		}
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
				
				//NEW TEST
				if(!specificsView)
					specificsView = new AIR.CiSpecificsAnwendungView({ id: 'clCiSpecificsAnwendung', height: 400 });//800
				//NEW TEST
				break;
			case AC.TABLE_ID_POSITION:
			case AC.TABLE_ID_ROOM:
			case AC.TABLE_ID_BUILDING:
			case AC.TABLE_ID_BUILDING_AREA:
			case AC.TABLE_ID_TERRAIN:
			case AC.TABLE_ID_SITE:
			case AC.TABLE_ID_PATHWAY:
			
				
			case AC.TABLE_ID_FUNCTION:
				specificsView = this.getComponent('clCiSpecificsLocationItem');
				
				//NEW TEST
				if(!specificsView)
					specificsView = new AIR.CiSpecificsLocationItemView({ id: 'clCiSpecificsLocationItem', height: 310 });
				//NEW TEST
				break;
			case AC.TABLE_ID_IT_SYSTEM://ADEFFMS0446 ADEFFMS0402
				specificsView = this.getComponent('clCiSpecificsItItem');
				
				//NEW TEST
				if(!specificsView)
					specificsView = new AIR.CiSpecificsItItemView({ id: 'clCiSpecificsItItem', height: 460 });//400
				//NEW TEST
				
				break;
			case AC.TABLE_ID_SERVICE:
				specificsView = this.getComponent('clCiSpecificsService');
				if(!specificsView)
					specificsView = new AIR.CiSpecificsServiceView({id: 'clCiSpecificsService', height: 460});
				break;
			case AC.TABLE_ID_BUSINESS_APPLICATION:
				specificsView = this.getComponent('clCiSpecificsBusinessApplication');
				
				if(!specificsView)
					specificsView = new AIR.CiSpecificsBusinessApplication({ id: 'clCiSpecificsBusinessApplication', height: 500 });//800
			
				/*specificsView = this.getComponent('clCiSpecificsService');
				if(!specificsView)
					specificsView = new AIR.CiSpecificsServiceView({id: 'clCiSpecificsService', height: 460});
				break;*/
				break;
		}
		
		return specificsView;
	},
	
	onViewAdded: function(parentCt, layout) {//wird 2 vom framework mal aufgerufen. warum?
		var data = AAM.getAppDetail();
		var specificsView = this.getSpecificsViewByTableId(parseInt(data.tableId));//parseInt(
//		specificsView.update(data);
		
		this.getLayout().setActiveItem(specificsView.getId());
		specificsView.updateLabels(AAM.getLabels());
		specificsView.init();
		
		this.updateHeight(specificsView);
		
//		this.ownerCt.disableButtons();
	},
	
//	onViewInitialized: function(childView) {
//		this.fireEvent('viewInitialized', this, childView);
//	},
	
	//damit die H�hen�nderung auch f�r clCiSpecificsLocationItem mit 250 sichtbar ist, muss auch die H�he
	//430 von ciEditTabView ge�ndert werden.
	updateHeight: function(specificsView) {
		var h;
		switch(specificsView.getId()) {
			case 'clCiSpecificsAnwendung':
				h = 400;//650
				break;
			case 'clCiSpecificsLocationItem':
				h = 310;//300
				break;
			case 'clCiSpecificsItItem':
				h = 460;//400 450
				break;
			case 'clCiSpecificsBusinessApplication':
				h = 500;
			
		}
		
//		h = specificsView.getHeight();
		
		this.setHeight(h);
	}
});
Ext.reg('AIR.CiSpecificsView', AIR.CiSpecificsView);