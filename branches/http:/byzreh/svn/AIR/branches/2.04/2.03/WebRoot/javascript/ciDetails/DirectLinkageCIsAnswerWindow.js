Ext.namespace('AIR');

AIR.DirectLinkageCIsAnswerWindow = Ext.extend(Ext.Window,{
	
	constructor: function(directLinkageCIAnswersStore){
		this.directLinkageCIAnswersStore = directLinkageCIAnswersStore;
		
		AIR.DirectLinkageCIsAnswerWindow.superclass.constructor.call(this);
	},
    
    initComponent :function(){
    	var labels = AAM.getLabels();
    	Ext.apply(this,{
    		plain: true,
			modal: true,
    		flex: 1,
    		closeAction:'hide',
    		border: false,
    		title: labels.directLinkagesCIPanelTitle,
    		
    		width: 900,
    		height: 600,
    		
    		layout: 'border',
    		
    		items: [{
    			region: 'center',
    			xtype: 'panel',
    			id:    'pLayout',
    			layout: 'hbox',
    		  
        		
        		items: [{
    		    	xtype: 'grid',
    		        id: 'historyListView1',
    		        layout: 'fit',
    		        
    		        height: 600,
    		    	store: this.directLinkageCIAnswersStore,
    		        border: false,
    		        autoScroll: true,
    		        columns: [{
    		            header: '',
    		            dataIndex: 'answerCIInfo',
    		            id: 'answerCIInfo',
    					menuDisabled: true,
    					width: 900
    		        },{
    		            header: '',
    		            dataIndex: 'identAndControl',
    		            id: 'identAndControl',
    		            hidden: true,
    					menuDisabled: true
    		        }],
    		        view: new Ext.grid.GroupingView({}),
        			viewConfig: {
        				emptyText: 'No Data found.....'
        			}
        		}]
        			  

    		}]
  
    		
    	});
    	AIR.DirectLinkCITemplateWindow.superclass.initComponent.call(this);

    }

});