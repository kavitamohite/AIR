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
    		flex: 1,
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
        	        columns: [
        	            {header: "NAME", width: 500, dataIndex: 'name', sortable: true,renderer: columnWrap}

        	        ],
        	        width: 500,
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