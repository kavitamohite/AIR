var languagecheck = new Ext.Window({
	closeAction: 'hide',
	layout: 'vBox',
	hidden: true,
	autoScroll: true,
	height: 400,
	title: 'Languagitems with no corresponding Ext.Component',
	items: [{
		xtype: 'container',
		id: 'languagecheckeroutput',
		autoScroll: true,
		html: ''
	}],
	listeners: {
		beforeshow: function (cmp) {
			outtext = '';
			i = 0;
			for (var key in languagestore.data.items[0].data) {
				if (Ext.getCmp(key)===undefined) {
					outtext += key + '<br/>';
					++i;
				}
			};
			Ext.getCmp('languagecheckeroutput').el.dom.innerHTML = outtext;
			Ext.getCmp('languagecheckeroutput').setHeight(i*10);
			Ext.getCmp('languagecheckeroutput').doLayout();
			languagecheck.doLayout();
		}
	}
});