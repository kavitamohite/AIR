
/*var pagingBar = new Ext.PagingToolbar(
{
	store : applicationListStore,
	pageSize : 20,
	displayInfo : true,
	displayMsg : 'Displaying records {0} - {1} of {2}',
	emptyMsg : "No records to display",
	items : [
		'&nbsp;&nbsp;&nbsp;&nbsp;',
		{
			xtype : 'label',
			text : 'Number of items per page:',
			anchor : '95%'
		},
		' ',
		{
			xtype : 'radiogroup',
			name : 'num_rows',
			id : 'num',
			vertical : true,
			width : 200,
			items : [ {
				boxLabel : '10',
				name : 'limit1',
				inputValue : '10'
			}, {
				boxLabel : '20',
				name : 'limit1',
				inputValue : '20',
				checked : true
			}, {
				boxLabel : '50',
				name : 'limit1',
				inputValue : '50'
			}, {
				boxLabel : '100',
				name : 'limit1',
				inputValue : '100'
			} ],
			listeners : {
				change : {
					fn : function (group, radio) {
						if (null != radio) {
							applicationListStore.baseParams.limit = parseInt(radio.inputValue, 10);
							pagingBar.pageSize = parseInt(radio.inputValue, 10);
						}
						applicationListStore.load();
					}
				}
			}
		} 
	]
});


var pagingBarEins = new Ext.PagingToolbar(
{
	store : applicationListStore,
	pageSize : 20,
	displayInfo : true,
	displayMsg : 'Displaying records {0} - {1} of {2}',
	emptyMsg : "No records to display",
	items : [
		'&nbsp;&nbsp;&nbsp;&nbsp;',
		{
			xtype : 'label',
			text : 'Number of items per page:',
			anchor : '95%'
		},
		' ',
		{
			xtype : 'radiogroup',
			id : 'num1',
			name : 'num_rows1',
			vertical : true,
			width : 200,
			items : [ {
				boxLabel : '10',
				name : 'limit2',
				inputValue : '10'
			}, {
				boxLabel : '20',
				name : 'limit2',
				inputValue : '20',
				checked : true
			}, {
				boxLabel : '50',
				name : 'limit2',
				inputValue : '50'
			}, {
				boxLabel : '100',
				name : 'limit2',
				inputValue : '100'
			} ],
			listeners : {
				change : {
					fn : function (group, radio) {
						if (null != radio) {
							applicationListStore.baseParams.limit = parseInt(radio.inputValue, 10);
							pagingBar.pageSize = parseInt(radio.inputValue, 10);
						}
						applicationListStore.load();
					}
				}
			}
		} 
	]
});


var pagingBarZwei = new Ext.PagingToolbar(
{
	store : applicationListStore,
	pageSize : 20,
	displayInfo : true,
	displayMsg : 'Displaying records {0} - {1} of {2}',
	emptyMsg : "No records to display",
	items : [
		'&nbsp;&nbsp;&nbsp;&nbsp;',
		{
			xtype : 'label',
			text : 'Number of items per page:',
			anchor : '95%'
		},
		' ',
		{
			xtype : 'radiogroup',
			id : 'num2',
			name : 'num_rows2',
			vertical : true,
			width : 200,
			items : [ {
				boxLabel : '10',
				name : 'limit',
				inputValue : '10'
			}, {
				boxLabel : '20',
				name : 'limit',
				inputValue : '20',
				checked : true
			}, {
				boxLabel : '50',
				name : 'limit',
				inputValue : '50'
			}, {
				boxLabel : '100',
				name : 'limit',
				inputValue : '100'
			} ],
			listeners : {
				change : {
					fn : function (group, radio) {
						if (null != radio) {
							applicationListStore.baseParams.limit = parseInt(radio.inputValue, 10);
							pagingBar.pageSize = parseInt(radio.inputValue, 10);
						}
						applicationListStore.load();
					}
				}
			}
		} 
	]
});*/