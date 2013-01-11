/* Costruttore */
Ext.data.SoapProxy = function(config){
    Ext.data.SoapProxy.superclass.constructor.call(this);
    this.conn = new Ext.data.SoapConnection(config);
};

Ext.extend(Ext.data.SoapProxy, Ext.data.DataProxy, {
    getConnection : function(){
        return this.conn;
    },

    load : function(params, reader, callback, scope, arg){
        if(this.fireEvent("beforeload", this, params) !== false){
        	params.callback = this.loadResponse;
        	params.scope = this;
        	params.request = {};
    		params.request.callback = callback;
    		params.request.reader = reader;
    		params.request.scope = scope || this;
    		params.request.arg = arg || null;
            this.conn.request(params);
        }else{
            callback.call(scope||this, null, arg, false);
        }
    },

    // private
    loadResponse : function(o, success, response){
        delete this.activeRequest;
        if(!success){
            this.fireEvent("loadexception", this, o, response);
            o.request.callback.call(o.request.scope, null, o.request.arg, false);
            return;
        }
        var result;
        try {
            result = o.request.reader.read(response);
        }catch(e){
            this.fireEvent("loadexception", this, o, response, e);
            o.request.callback.call(o.request.scope, null, o.request.arg, false);
            return;
        }
        this.fireEvent("load", this, o, o.request.arg);
        o.request.callback.call(o.request.scope, result, o.request.arg, true);
    },
    
    // private
    update : function(dataSet){
        
    },
    
    // private
    updateResponse : function(dataSet){
        
    }
});