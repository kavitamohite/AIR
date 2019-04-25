Ext.data.SoapConnection = function(config){
	Ext.apply(this, config);
    Ext.data.SoapConnection.superclass.constructor.call(this);
}

Ext.extend(Ext.data.SoapConnection, Ext.data.Connection, {
    
    /*
    Elenco parametri necessari:
    o.url        -> Url del webservice
    o.method     -> Operation da invocare  
    o.param      -> Oggetto/Vettore da comunicare al server
    o.callback   -> Funzione callback da invocare (sia successo che insuccesso)
    o.scope 	 -> Scope della funzione di callback
    */
    
    request : function(o){
        if(this.fireEvent("beforerequest", this, o) !== false){
        	var url = o.url || this.url;
        	var method = o.method || this.method;
        	var param = o.param || this.param;
        	var callback = o.callback || this.callback;
        	var scope = o.scope || this.scope;
			var pl = new SOAPClientParameters();			
			if(param) for(i in param) pl.add(i, param[i]);
			var client = new SoapClient(url, method, pl, true, callback, scope, o);
			client.invoke();
        }else{
            Ext.callback(o.callback, this, [o, null, null]);
        }
    }
});