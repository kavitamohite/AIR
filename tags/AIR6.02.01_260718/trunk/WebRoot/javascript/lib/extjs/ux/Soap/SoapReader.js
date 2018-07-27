Ext.data.SoapReader = function(meta, recordType){
    meta = meta || {};
    Ext.data.SoapReader.superclass.constructor.call(this, meta, recordType || meta.fields);
};

Ext.extend(Ext.data.SoapReader, Ext.data.DataReader, {
	read: function(request) {
		var recordType = this.recordType, fields = recordType.prototype.fields;
		for(i in request) request = request[i];
		for(i in request) {
			var id = request[i][this.meta.id];
			request[i] = new recordType(request[i], id);
		}
		return {
	        success : true,
	        records : request,
	        totalRecords : request.length
	    };
	}
});