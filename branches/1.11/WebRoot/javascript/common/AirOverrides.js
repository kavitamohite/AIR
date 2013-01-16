/**
 * http://www.ashlux.com/wordpress/2009/09/04/handling-empty-options-with-ext-js-combo-box/
 * :: Handling empty options with Ext JS combo box
 * http://snipplr.com/view/9122/
 * :: [ExtJS] Display empty string in Ext.form.ComboBox dropdown list; gewählte Lösung!
 */
Ext.override(Ext.form.ComboBox, {
	initList: (function() {
		if(!this.tpl) {
			this.tpl = new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item">{', this.displayField , ':this.blank}</div></tpl>', {
				blank: function(value) {
					return value === '' ? '&nbsp' : value;
				}
			});
		}
	}).createSequence(Ext.form.ComboBox.prototype.initList)
});

Ext.override(Ext.form.DateField, {
	onBlur : function(){
	    this.beforeBlur();
	    if(this.focusClass){
	        this.el.removeClass(this.focusClass);
	    }
	    this.hasFocus = false;
	    if(this.validationEvent !== false && (this.validateOnBlur || this.validationEvent == 'blur')){
	        this.validate();
	    }
	    var v = this.getValue();
	    //auskommentiert um ungültige Werte zu löschen, NACHDEM ein gültiges Datum gelöscht wurde, und nichts im datefield steht
	    //if(String(v) !== String(this.startValue)){
	        this.fireEvent('change', this, v, this.startValue);
	    //}
	    this.fireEvent('blur', this);
	    this.postBlur();
	}
});

Ext.override(Ext.History, {
    handleStateChange : function(token) {
        currentToken = token;
        Ext.History.fireEvent('change', token);
    }
});


//Ext.override(Ext.form.TextField, {
//	setValue: function() {
//        if(this.emptyText && this.el && !Ext.isEmpty(v)){
//            this.el.removeClass(this.emptyClass);
//        }
//        Ext.form.TextField.superclass.setValue.apply(this, arguments);
//        this.applyEmptyText();
//        this.autoSize();
//        
//        this.fireEvent('change', this);
//        
//        return this;
//	}
//});