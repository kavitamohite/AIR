Ext.namespace('AIR');

AIR.AirPickerManager = function() {
	return {
		init: function() {
			this.pickerMap = {};
		},
		
		openPersonPicker: function(listener, field, event, pickerConfig) {
			//a)
			var personPicker = this.pickerMap.personPicker;
			
			if(!personPicker) {
				personPicker = new AIR.AirPersonPicker(event, pickerConfig);//field,
				this.pickerMap.personPicker = personPicker;
			} else personPicker.pickerConfig = pickerConfig;
			
			if(listener)
				personPicker.on('personAdd', listener);
			
			personPicker.showAt([ event.xy[0], event.xy[1] -100 ]);
			personPicker.update(field);
		},
		
		openGroupPicker: function(listener, field, event, groupType, pickerConfig) {
			var groupPicker = this.pickerMap.groupPicker;
			
			if(!groupPicker) {
				groupPicker = new AIR.AirGroupPicker(event, pickerConfig);//field, 
				this.pickerMap.groupPicker = groupPicker;
			} else groupPicker.pickerConfig = pickerConfig;
			
			if(listener)
				groupPicker.on('groupAdd', listener);
			
			
			groupPicker.show();//showAt([ event.xy[0], event.xy[1] -100 ]); wenn Ext.Tip, sonst show wenn Ext.Window
			groupPicker.update(field, groupType);
		},
		
		openRemovePicker: function(listener, field, event, pickerConfig) {
			var removePicker = this.pickerMap.removePicker;
			
			if(!removePicker) {
				removePicker = new AIR.AirRemovePicker(event, pickerConfig);//field, 
				this.pickerMap.removePicker = removePicker;
			}
			
			if(listener)
				removePicker.on('recordRemove', listener);
			
			
			removePicker.showAt([ event.xy[0], event.xy[1] -100 ]);
			removePicker.update(field);
		},
		
		openRecordPicker: function(listener, field, event, objectType, pickerConfig) {
			var recordPicker = this.pickerMap.recordPicker;
			
			if(!recordPicker) {
				recordPicker = new AIR.AirRecordPicker(event, pickerConfig);
				this.pickerMap.recordPicker = recordPicker;
			}
			
			if(listener)
				recordPicker.on('recordAdd', listener);
			
			
			recordPicker.showAt([ event.xy[0], event.xy[1] -100 ]);
			recordPicker.update(field, objectType);
		}
    };
}();
	