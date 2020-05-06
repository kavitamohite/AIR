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
	        
	        width: 350,
	        height: 20,
	        
	        columns: 7,
	
	        items: [
	            { boxLabel: '10', name: id, inputValue: 10 },//'pageSize'
	            { boxLabel: '20', name: id, inputValue: 20, checked: true },
	            { boxLabel: '50', name: id, inputValue: 50 },
	            { boxLabel: '100', name: id, inputValue: 100 },
	            { boxLabel: '500', name: id, inputValue: 500 },
	            { boxLabel: '1000', name: id, inputValue: 1000 },
	            { boxLabel: '10000', name: id, inputValue: 10000 }
	        ]
	    }];
		
		
		Ext.apply(this, {
		    displayInfo: true,
		    displayMsg: 'Displaying Results {0} - {1} of {2}',
		    emptyMsg: 'No result to display',
		
			items: this.complete ? items : []
		});
		
		AIR.AirPagingToolbar.superclass.initComponent.call(this);
	},
	
    doLoad : function(start){
        var o = {}, pn = this.getParams();
        o[pn.start] = start;
        o[pn.limit] = this.pageSize;
        //EUGXS 
		//IM0008125159 - Cleanup function CI BS-ITO-ITPI-APM-CPS Group head => 18-2,19-2

        if(this.pagingParams.searchAction == "myCisForDelete"){
        	o['ciNameAliasQuery'] = Ext.getCmp('tfDeleteSearch').getValue();
        }
        // CUSTOM siehe original ext-all-debug.js 3.4.0 Z. 32715
        if(this.pagingParams)
        	for(var key in this.pagingParams)
        		if(key !== 'start' && key !== 'limit')
        			o[key] = this.pagingParams[key];

//        o[pn.start] = start;
//        o[pn.limit] = this.pageSize;
        // CUSTOM
        
        if(this.fireEvent('beforechange', this, o) !== false){
            this.store.load({params:o});
        }
    }
});
Ext.reg('AIR.AirPagingToolbar', AIR.AirPagingToolbar);