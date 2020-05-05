Ext.namespace('AIR');

AIR.AirView = Ext.extend(Ext.Panel, {
	
	setFieldLabel: function(field, labelText) {
		if(Ext.isIE) {
			field.el.up('.x-form-item', 10, true).child('.x-form-item-label').update(labelText);
		} else {
			field.label.dom.innerHTML = labelText;//innerHTML textContent
		}
	},
	
	setBoxLabel: function(box, labelText) {
//		box.label.dom.nextElementSibling.children[0].children[1].textContent = labelText;//textContent innerHTML
		//box.el.dom.nextSibling.childNodes[0].nodeValue = labelText;
		if (box != undefined)
			box.wrap.child('.x-form-cb-label').update(labelText);
		//box.el.dom.nextSibling.firstChild.data = labelText;
//		box.el.dom.nextSibling.childNodes[0].update(labelText);
	},
	
	//see also common.Util.js
	isComboValueValid: function(combo, newValue, oldValue) {
		//wenn blur listener auf combo kann newValue und oldValue undefined sein
		
		if (newValue != undefined && newValue != "") {
			var index = combo.getStore().indexOf(combo.getStore().getById(newValue));
			if (index !== -1)
				return true;
		}
		
		var nValue = parseInt(newValue);
		
		//parseInt Bugfix: if newValue is i.e. '111Bayer Group' nValue would successfully converted to int, namely 111. This must must not happen
		var nValueString = newValue.toString();
		var isReallyNoInt = (nValueString.length !== newValue.length) || nValueString === 'NaN';
		//parseInt Bugfix: if newValue is i.e. '111Bayer Group' nValue would successfully converted to int, namely 111. This must must not happen
		
		
		//wenn die combo einen Filter hat, muss immer gefiltert werden, bevor der letzte gültige Wert zurückgesetzt wird,
		//sonst verschwindet der Filter, bzw. combo.data array ist leer (wodurch?).
		if(combo.lastQuery)
			combo.filterByData();
		
    	if(isReallyNoInt && isNaN(isReallyNoInt ? newValue : nValue) && newValue.length > 0) {//nValue nValueString
    		index = combo.getStore().findExact('name', nValue);
    		if(index === -1)
    			this.restorePreviousValue(combo, oldValue);
	    	
	    	return false;
    	} else {//if numbers or other nonsense is directly entered in the combo
    		var index = combo.getStore().findExact('name', newValue);
    		//if(index === -1)
    			//index = combo.getStore().findExact('id', newValue);
    			//index = combo.getStore().indexOf(combo.getStore().getById(newValue));
    			//if item is selected it must be searched for the id, otherwise valid values would be treated as invalid
    		
    		if(newValue.length > 0 && index === -1) {
    			this.restorePreviousValue(combo, oldValue);
    			return false;
    		}
    		
    		return true;
    	}
    	
	},
	
	restorePreviousValue: function(combo, oldValue) {
		//combo.getStore().clearFilter();
		combo.setValue(oldValue);
	},
	
	updateToolTips: function(toolTips) {
	},
	
	setTooltipData: function(targetId, tooltipTitle, tooltipText) {
		var itsecUserOptionListStore = AIR.AirStoreManager.getStoreByName('itsecUserOptionListStore');
		var index = itsecUserOptionListStore.findExact('itsecUserOptionName', AC.USER_OPTION_TOOLTIP);
		//wenn noch keine itsecUserOption Einträge in itsec_user_option vorhanden, benutze isDisableTooltip = false
		var isDisableTooltip = index > -1 ? itsecUserOptionListStore.getAt(index).data.itsecUserOptionValue === 'YES' : false;//itsecUserOptionListStore.data.items[5].data.itsecUserOptionValue === 'YES';
		
		if(isDisableTooltip) {//use itsecUserOptionListStore...
			Ext.QuickTips.unregister(targetId);
		} else {
			Ext.QuickTips.register({
			    target: targetId,
			    title: tooltipTitle,
			    text: tooltipText,
			    width: 200,
			    dismissDelay: 99000 // Hide after 99 seconds hover
			});
		}
	}

});