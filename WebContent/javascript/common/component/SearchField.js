Ext.ns('Ext.ux.form');

Ext.ux.form.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    initComponent : function() {
        Ext.ux.form.SearchField.superclass.initComponent.call(this);

        this.addEvents('search','clear');
    },

	/*
    validationEvent:false,
    validateOnBlur:false,*/
	
    trigger1Class: 'x-form-clear-trigger',
    trigger2Class: 'x-form-search-trigger',//ohne: normales combo dropdown icon
	hideTrigger1: true,
    
    onTrigger1Click : function(event) {
		this.fireEvent('clear', this, event);
    },

    onTrigger2Click : function(event) {
		this.fireEvent('search', this, event);
    }
});
Ext.reg('searchfield', Ext.ux.form.SearchField);