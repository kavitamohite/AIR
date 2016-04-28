Ext.namespace('AIR');

AIR.CiNetworkView = Ext.extend(AIR.AirView, {
	initComponent: function() {
		Ext.apply(this, {
			title: 'Network',
			layout: 'column',
		    border: false,
		    height: 500,
		    autoScroll: true,
		    width: 800,
		    
		    items: [
			        {
						xtype: 'fieldset',
					    id: 'dnsDetails',
					    title:'DNS Details(QIP)',
					   layout: 'column',
					   labelWidth: 200,
					   columnWidth: 1.0,
					  // anchor: '90%',
					   width:500,
					   padding: '10 10 10 10', 
					   //margins: '10 0 10 0',

		    	
		    	items: [{
					xtype: 'grid',
					id: 'dnsDetailQIPresultGrid',
					store: AIR.AirStoreFactory.createDNSDetailQIPStore(),
					multiSelect: false,
					singleSelect: true,
					border: true,
					autoScroll: true,
					
					
					height: 150,//200 230 165
			        					
					columns: [{
				        header: 'Host Name',
				        dataIndex: 'hostName',
				        width: 150,
				        menuDisabled: true
				    },{
				        header: 'AD Domain',
				        dataIndex: 'adDomain',
				        width: 180,
				        menuDisabled: true
				    },{
				        header: 'IP',
				        dataIndex: 'ipAddress',
				        width: 100,
				        menuDisabled: true
				    },{
				        header: 'VLAN',
				        dataIndex: 'vlan',
				        width: 100,
				        menuDisabled: true
				    } ]
				    
		    	}]},
		    	{
					xtype: 'fieldset',
				    id: 'networkTcpIp',
				    title:'Network(TCP/IP)',
				   layout: 'column',
				   labelWidth: 200,
				   columnWidth: 1.0,
				   width:500,
				   padding: '10 10 10 10', 
				   //margins: '10 0 10 0',
	    	
	    	items: [{
				xtype: 'grid',
				id: 'networkresultGrid',
				store:  AIR.AirStoreFactory.createNetworkTcpIpStore(),
				multiSelect: false,
				singleSelect: true,
				border: true,
				autoScroll: true,
				height: 150,//200 230 165
		        					
				columns: [{
			        header: 'Host Name',
			        dataIndex: 'hostName',//name
			        width: 180,
			        menuDisabled: true
			    },{
			        header: 'VLAN',
			        dataIndex: 'vlan',
			        width: 100,
			        menuDisabled: true
			    },{
			        header: 'IP',
			        dataIndex: 'ipAddress',
			        width: 100,
			        menuDisabled: true
			    },{
			        header: 'Netmask',
			        dataIndex: 'netMask',
			        width: 100,
			        menuDisabled: true
			    },{
			        header: 'Gateway',
			        dataIndex: 'gateWay',//type
			        width: 180,
			        menuDisabled: true
			    },{
			        header: 'MAC-Address',
			        dataIndex: 'macAdress',
			        width: 100,
			        menuDisabled: true
			    },{
			        header: 'Source',
			        dataIndex: 'source',
			        width: 100,
			        menuDisabled: true
			    } ]
			    
	    	}]
		  }]
		    
		});
		
		AIR.CiNetworkView.superclass.initComponent.call(this);
		
		

	},

	updateLabels: function(labels) {
		//this.setTitle(labels.CiNetworkViewTitle);
	},
	
	update: function(data) {
		
	    
		var params = {
		ciId: data.id,
		cwid: AIR.AirApplicationManager.getCwid(),
	    token: AIR.AirApplicationManager.getToken()				
		};
      var dnsDetailQIPresultGridStore  =this.getComponent('dnsDetails').getComponent('dnsDetailQIPresultGrid').getStore();
      var networkresultGridStore  =this.getComponent('networkTcpIp').getComponent('networkresultGrid').getStore();
		
      dnsDetailQIPresultGridStore.load({
			params: params

		});
		
      networkresultGridStore.load({
			params: params
      });
		
	}
});


Ext.reg('AIR.CiNetworkView', AIR.CiNetworkView);