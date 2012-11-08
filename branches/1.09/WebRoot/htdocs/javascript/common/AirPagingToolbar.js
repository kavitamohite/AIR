Ext.namespace('AIR');

AIR.AirPagingToolbar = Ext.extend(Ext.PagingToolbar, {
    pageSize: 20,//25
	
	initComponent: function() {
		var id = this.getId();
		
		var items = ['-', {
	    	xtype: 'commandlink',
	    	id: this.ownerPrefix+'_clExcelExport',
	    	img: imgcontext + 'Excel.png'
	    }, '-',
	    {
			xtype: 'label',
			text: 'Items per page:'
//			anchor: '95%'
		},'&nbsp;&nbsp;',//&nbsp;&nbsp;',
		{
	        xtype: 'radiogroup',
	        id: 'rbg' + id,
	        
	        width: 160,
	        height: 20,
	        
	        columns: 4,
	
	        items: [
	            { boxLabel: '10', name: id, inputValue: 10 },//'pageSize'
	            { boxLabel: '20', name: id, inputValue: 20, checked: true },
	            { boxLabel: '50', name: id, inputValue: 50 },
	            { boxLabel: '100', name: id, inputValue: 100 }
	        ]
	    }];
		
		
		Ext.apply(this, {
		    displayInfo: true,
		    displayMsg: 'Displaying CIs {0} - {1} of {2}',
		    emptyMsg: 'No CIs to display',
		
			items: this.complete ? items : []
		});
		
		AIR.AirPagingToolbar.superclass.initComponent.call(this);
	},
	
    doLoad : function(start){
        var o = {}, pn = this.getParams();
        o[pn.start] = start;
        o[pn.limit] = this.pageSize;
        
        // CUSTOM siehe original ext-all-debug.js 3.4.0 Z. 32715
        if(this.pagingParams)
        	for(var key in this.pagingParams)
        		if(key !== 'start' && key !== 'limit')
        			o[key] = this.pagingParams[key];
        // CUSTOM
        
        if(this.fireEvent('beforechange', this, o) !== false){
            this.store.load({params:o});
        }
    }
});
Ext.reg('AIR.AirPagingToolbar', AIR.AirPagingToolbar);