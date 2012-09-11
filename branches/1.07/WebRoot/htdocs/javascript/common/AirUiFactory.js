Ext.namespace('AIR');

AIR.AirUiFactory = function() {
	return {
		createAppOwnerStewardFieldsets: function(ownerId) {
			var fsApplicationOwner = {
		        xtype: 'fieldset',
		        id: 'fsApplicationOwner',
		        title: 'Application Owner',
		        labelWidth: 200,
		        
//			        layout: 'form',//fit
		        
				items: [{
					xtype: 'panel',
					id: 'p' + ownerId + 'ApplicationOwner',
					border: false,
					
					layout: 'column',//toolbar hbox
					
					items: [{
						xtype: 'label',
						id: 'label' + ownerId + 'applicationOwner',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: ownerId + 'applicationOwner',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: ownerId + 'applicationOwnerHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: ownerId + 'applicationOwnerAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: ownerId + 'applicationOwnerRemove',
				    	img: img_RemovePerson
				    }]
				},{
					xtype: 'panel',
					id: 'p' + ownerId + 'ApplicationOwnerDelegate',
					border: false,
					
					layout: 'column',//toolbar hbox
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'label' + ownerId + 'applicationOwnerDelegate',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: ownerId + 'applicationOwnerDelegate',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: ownerId + 'applicationOwnerDelegateHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: ownerId + 'applicationOwnerDelegateAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: ownerId + 'applicationOwnerDelegateAddGroup',
				    	img: img_AddGroup
				    },{
				    	xtype: 'commandlink',
				    	id: ownerId + 'applicationOwnerDelegateRemove',
				    	img: img_RemovePerson
				    }]
				}]
			};
			
			var fsApplicationSteward = {
		        xtype: 'fieldset',
		        id: 'fsApplicationSteward',//pApplicationOwner
		        labelWidth: 200,
		        
				items: [{
					xtype: 'panel',
					id: 'p' + ownerId + 'ApplicationSteward',
					border: false,
					
					layout: 'column',//toolbar hbox
					style: {
						marginTop: 5
					},
					
					items: [{
						xtype: 'label',
						id: 'label' + ownerId + 'applicationSteward',
						
						width: 200,
						style: {
							fontSize: 12
						}
		    		},{
						xtype: 'textfield',
				        width: 230,
				        id: ownerId + 'applicationSteward',
				        readOnly: true
				    },{
						xtype: 'hidden',
				        id: ownerId + 'applicationStewardHidden'
				    },{
				    	xtype: 'commandlink',
				    	id: ownerId + 'applicationStewardAdd',
				    	img: img_AddPerson
				    },{
				    	xtype: 'commandlink',
				    	id: ownerId + 'applicationStewardRemove',
				    	img: img_RemovePerson
				    }]
				}]
			};
			
			var appOwnerStewardFieldsets = {
				fsApplicationOwner: fsApplicationOwner,
				fsApplicationSteward: fsApplicationSteward
			};
			
			return appOwnerStewardFieldsets;
		}
	};
}();
Ext.reg('AIR.AirUiFactory', AIR.AirUiFactory);