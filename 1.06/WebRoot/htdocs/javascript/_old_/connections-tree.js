Ext.BLANK_IMAGE_URL = sharelib + 'extjs/resources/images/default/s.gif';
//Extend timeout for all Ext.Ajax.requests to 300 seconds.
Ext.Ajax.timeout = 300000;  
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
var viewport;
var tree;
var validStatus = Ext.util.Cookies.get("valid");

function handleClick(dataView, itemIndex, node, event) {
	var record = dataView.id.split('_');
	var det = viewport.find('name', 'details'); 
	det[0].load({
	    url: 'details_center.php',
	    params: {id: record[0]}, 
	    discardUrl: false,
        autoScroll: true,
	    nocache: true,
	    text: 'Loading...',
	    timeout: 300,
	    scripts: false
	});
}

function handleDblClick(dataView, itemIndex, node, event) {
	var record = dataView.id.split('_');
	tree.loader.baseParams.id = record[0];
	tree.getRootNode().setText('Loading Tree...');
	tree.getRootNode().reload();
	tree.expandAll();
}

function handleNodeLoadException(node) {
	Ext.MessageBox.alert(
			'Fehler',
			Data.Strings.ErrorLoaderException);

}

tree = new Ext.tree.TreePanel({
	id: 'my-treepanel',
    useArrows: false,
    autoScroll: true,
    animate: false,
    lines : true,
    enableDD: false,
    containerScroll: true,
    rootVisible: true,
    border: false,
    loader: new Ext.tree.TreeLoader({
        dataUrl: 'get_nodes.php',
        timeout: 300000,
        baseParams: { id : ciId }
    }),
    root: {
        nodeType: 'async',
        text: 'Loading Tree...',
        draggable: false,
        id: 'root',
        disabled: true,
        listeners : {
   		 beforechildrenrendered: function (node) {
				node.setText('Earth');
				node.disable();
			}
		}
    },
    listeners : {
    	append : function (tree, root, node, idx) {
    		if (node.id.indexOf(tree.loader.baseParams.id) === 0) {
    			node.setText('<span style="font-weight: bold !important;">' + node.text + '</span>');  
    			//node.getUI().addClass('selel');
    		}
    	},
		click : handleClick,
		dblclick : handleDblClick,
		loadexception : handleNodeLoadException
	} 
});

// add a tree sorter in folder mode
var tsorter = new Ext.tree.TreeSorter(tree, {property: 'text'});

Ext.onReady(function () {
    
	viewport = new Ext.Viewport({
	    layout: 'border',
	    stateful: true,
	    stateId: 'myViewPort',
	    items: [
	    // create instance immediately
		    new Ext.BoxComponent({
		        region: 'north',
		        contentEl: 'north',
		        height: 75 // give north and south regions a height
		    }), {
		        region: 'west',
		        id: 'west-panel', // see Ext.getCmp() below
		        title: 'Treeview',
		        autoScroll : true,
		        text: 'Lade Daten...',
		        split: true,
		        width: 450,
		        minSize: 175,
		        maxSize: 800,
		        collapsible: false,
		        margins: '0 0 0 5',                
		        items: [ tree ]
		    },
		    //  Panel is added directly as a Container
		    new Ext.Panel({
		        region: 'center', // a center region is ALWAYS required for border layout
		        autoScroll: true,
		        name: 'details',
		        deferredRender: false,
		        collapsible: false,
		        split: true,
			    margins: '0 5 0 5',
		        items: [{ autoLoad: {url: 'details_center.php', params: 'id=' + ciId, timeout: 300000} }]
		    })
		]
	});
    
	//map  keys 
	 map = new Ext.KeyMap("my-treepanel", [
	    {
	        key: [10, 13],
	        ctrl: true,
	        fn: function () { 
	        		var record = tree.selModel.selNode.id.split('_');
	        		tree.loader.baseParams.id = record[0];
					tree.getRootNode().setText('Loading Tree...');
					tree.getRootNode().reload();
					tree.expandAll(); 
	        	}
		    }
		]);
    
    tree.getRootNode().expand(true);

});