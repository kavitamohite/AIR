Ext.namespace('AIR');

AIR.DirectLinkCITemplateWindow = Ext.extend(Ext.Window,{
	
	constructor: function(directLinkCIStore){
		this.directLinkCIStore = directLinkCIStore;
		
		AIR.DirectLinkCITemplateWindow.superclass.constructor.call(this);
	},
    
    initComponent :function(){
    	var labels = AAM.getLabels();
    	Ext.apply(this,{
    		plain: true,
			modal: true,
			autoScroll: true,
    		//flex: 1,
    		closeAction:'hide',
    		border: false,
    		title: labels.directLinkCIPanelTitle,
    		
    		width: 510,
    		height: 500,
    		
    		layout: 'border',
    		
    		items: [{
    			region: 'center',
    			xtype: 'panel',
    			id:    'pLayout',
    			layout: 'hbox',
    		  
        		
        		items: new Ext.grid.GridPanel({
        	        store: this.directLinkCIStore,
        			autoScroll: true,
        			stripeRows: true,
        			viewConfig: {
        				emptyText: 'No CI (s) found.....'
        			},
        			
//ETNTX- IM0006852855
        	        columns: [
        	            {header: "NAME",width: 400, dataIndex: 'name', sortable: true,renderer: columnWrap},
        	            {header: "TYPE",width: 250,  dataIndex: 'type', sortable: true,renderer: columnWrap},
        	            {header: "Complete_Link",width: 100,dataIndex: 'completeLink', sortable: true,renderer: columnWrap}

        	        ],
        	        width: 800,
        	        height: 500
        	    })
        			  

    		}]
  
    		
    	});
    	AIR.DirectLinkCITemplateWindow.superclass.initComponent.call(this);
    	function columnWrap(val){
    	    return '<div style="white-space:normal !important;">'+ val +'</div>';
    	}
    }

});