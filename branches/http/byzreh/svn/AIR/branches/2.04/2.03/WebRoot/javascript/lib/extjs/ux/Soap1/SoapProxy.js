Ext.namespace("Ext.ux.soap");

/* 
 * Constructor from an object parameter
 */ 
Ext.ux.soap.SoapProxy = function (o) {
    Ext.ux.soap.SoapProxy.superclass.constructor.call(this, o);
    this.conn = Ext.Ajax;
    Ext.apply(this, o);
};

Ext.extend(Ext.ux.soap.SoapProxy, Ext.data.DataProxy, {

	/*
	 * Method called by store that loads WSDL using Ext.ux.data.soap.WsdlContainer
	 * It uses Ext.ux.soap.SoapProxy.loadWsdl as callback
	 */
	load : function(params, reader, callback, scope, arg) {
    	if (this.fireEvent("beforeload", this, params) !== false) {
    		this.loadParams = params;
    		//this.reader = reader;
    		this.loadCallback = callback;
    		this.loadScope = scope;
    		this.loadArg = arg || null;
    		var wsdlOption = {
    			url: this.url,
    			callback: this.loadWsdl,
    			scope: this
    		};
        	Ext.ux.data.soap.WsdlContainer.loadWsdl(wsdlOption);
        	
        } else {
            this.callback.call (this.scope, this.arg, false);
        }
    },
    
    /*
     * Temporary callback called after WSDL document is loaded (download of from the cache is not a proxy problem...)
     * It send xmlData (obtained with Ext.ux.soap.SoapProxy.getXmlEnvelope) to the server and uses getXmlEnvelope.loadResponse as callback     
     */
    loadWsdl : function(success, options) {
    	var url = options.url;
    	var wsdl = Ext.ux.data.soap.WsdlContainer.cachedWsdl[url]; //get wsdl props by static object
    	var xml = this.getXmlEnvelope(this.loadMethod, this.loadParams, wsdl.namespaces);
    	this.conn.request ({
    		url: url,
    		callback : this.loadResponse,
    		scope: this,
    		xmlData : xml,
    		method: "POST",
    		disableCaching: false
    	});
    },
    
    /*
     * Private method that uses SoapReader to create Js object and calls user-defined callback with correct parameters
     */
    loadResponse : function(options, success, response) {
        delete this.activeRequest;
        if (!success) {
            this.fireEvent("loadexception", this, options, response);
            this.loadCallback.call(this.scope, null, this.loadArg, false);
            return;
        }
        var result;
        try {
            result = this.reader.read(response, this.url, this.loadMethod);  //reader needs also url and methodName
        	//result = applicationListReader.read(response, this.url, this.loadMethod);  //reader needs also url and methodName
        } catch(e) {
            alert(e.message);
            this.fireEvent("loadexception", this, options, response, e);
            this.loadCallback.call(this.scope, null, this.loadArg, false);
            return;
        }
        this.fireEvent("load", this, options, this.loadArg);
        this.loadCallback.call(this.loadScope, result, this.loadArg, true); //user-defined callback
    },
    
    /*
     * Working-in-progress method... skip it!
     */
    save: function(params, callback, scope) {
    	this.saveCallback = callback;
    	this.saveScope = scope;
    	var wsdl = Ext.ux.data.soap.WsdlContainer.cachedWsdl[this.url]; //get wsdl props by static object
    	var xml = this.getXmlEnvelope(this.saveMethod, params, wsdl.namespaces);
    	this.conn.request ({
    		url: this.url,
    		callback : this.saveResponse,
    		scope: this,
    		xmlData : xml
    	});    	
    },
    
    saveResponse: function() {
    	Ext.emptyFn();
    },
    
    /*
     * Private method thats builds an XML envelope
     */
    getXmlEnvelope : function(method, params, namespaces) {
    	var sr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
				 "<soapenv:Envelope " +
				 "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
				 "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
				 "xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
				 "xmlns:ser=\"http://service.applrepos.bayerbbs.com/\">" +
				 "<soapenv:Body>" +
				 //"<ns1:" + method + " xmlns:ns1=\"" + namespaces[0] + "\">";
				 "<ser:" + method +  "><arg0>";
		if(params) sr += this.formatParameters(params, namespaces[1]);
		//sr += "</ns1:" + method + "></soapenv:Body></soapenv:Envelope>";
		sr += "</arg0></ser:" + method + "></soapenv:Body></soapenv:Envelope>";
		return sr;    
    },

    /*
     * Private and recursive method that formats parameters in the correct way  
     * to improve because of the 2-limit of namespaces     
     */
    formatParameters : function(o, namespace) {
   		var s = "";
   		var p = new Array();
    	switch(typeof(o)) {
	        case "string":
	            s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); break;
	        case "number":
	        case "boolean":
	            s += o.toString(); break;
			case "object":
	            // Date
	            if(o.constructor.toString().indexOf("function Date()") > -1) {
	                var year = o.getFullYear().toString();
	                var month = (o.getMonth() + 1).toString(); month = (month.length == 1) ? "0" + month : month;
	                var date = o.getDate().toString(); date = (date.length == 1) ? "0" + date : date;
	                var hours = o.getHours().toString(); hours = (hours.length == 1) ? "0" + hours : hours;
	                var minutes = o.getMinutes().toString(); minutes = (minutes.length == 1) ? "0" + minutes : minutes;
	                var seconds = o.getSeconds().toString(); seconds = (seconds.length == 1) ? "0" + seconds : seconds;
	                var milliseconds = o.getMilliseconds().toString();
	                var tzminutes = Math.abs(o.getTimezoneOffset());
	                var tzhours = 0;
	                while(tzminutes >= 60) {
	                    tzhours++;
	                    tzminutes -= 60;
	                }
	                tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
	                tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
	                var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
	                s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
	            }
	            // Array
	            else if(o.constructor.toString().indexOf("function Array()") > -1) {
	                for (p in o) {
	                    if (!isNaN(p)) {  // linear array
	                        (/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
	                        var type = RegExp.$1;
	                        switch (type) {
	                            case "":
	                                type = typeof(o[p]);
	                            case "String":
	                                type = "string"; break;
	                            case "Number":
	                                type = "int"; break;
	                            case "Boolean":
	                                type = "bool"; break;
	                            case "Date":
	                                type = "DateTime"; break;
	                        }
	                        //s += "<ns2:" + type + " xmlns:ns2=\""+namespace+"\">" + this.formatParameters(o[p]) + "</ns2:" + type + ">"  //bad namespace
	                        s += "<" + type + ">" + this.formatParameters(o[p]) + "</" + type + ">";
	                    }
	                    else  {  // associative array
	                        //s += "<ns2:" + p + " xmlns:ns2=\""+namespace+"\">" + this.formatParameters(o[p]) + "</ns2:" + p + ">"  //bad namespace
	                    	s += "<" + p + ">" + this.formatParameters(o[p]) + "</" + p + ">";
	                    }
	                }
	            }
	            // Object or custom function
	            else {
	                for (p in o) {
	                    //s += "<ns2:" + p + " xmlns:ns2=\""+namespace+"\">" + this.formatParameters(o[p]) + "</ns2:" + p + ">";   //bad namespace
	                    s += "<" + p + ">" + this.formatParameters(o[p]) + "</" + p + ">";   
	                }
	            }
	            break;
	        default:
	            break; // throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
	    }
	    return s;    
    }

});
