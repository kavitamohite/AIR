/*
 * Static class for manage WSDL caching and parsing
 * Wsdl object have this semantic:
 * they are JavaScript object with 2 props:
 * - namespaces: list of namespaces 
 * - types: map of objectname/type (object is an arrayOfSomething or not?) 
 *
 */
Ext.namespace("Ext.ux.data.soap.WsdlContainer");

/*
 * Static map holds wsdl object already downloaded 
 */
Ext.ux.data.soap.WsdlContainer.cachedWsdl = new Array();

/*
 * Head method that have this options:
 * @ url - required 
 * @ callback
 * @ scope
 */
Ext.ux.data.soap.WsdlContainer.getWsdl = function(o) {
	var url = o.url;
	var callback = o.callback || function() { Ext.emptyFn(); };
	var scope = o.scope || Ext.ux.data.soap.WsdlContainer;
	Ext.ux.data.soap.WsdlContainer.loadWsdl(url, callback, scope);
};
/*
 * Private method that checks if wsdl is cached and eventually downloads it using Ext.ajax
 * Use Ext.ux.data.soap.WsdlContainer.loadWsdlCallback as callback of the ajax call
 * If the wsdl is cached it calls directly user-defined callback 
 */
Ext.ux.data.soap.WsdlContainer.loadWsdl = function(o) {
	if (!Ext.ux.data.soap.WsdlContainer.cachedWsdl[o.url]) {
		Ext.Ajax.request({
			url: o.url,
			callback: Ext.ux.data.soap.WsdlContainer.loadWsdlCallback,
			params: 'wsdl',
			disableCaching: false,
			method: 'GET',
			request: {callback: o.callback, scope: o.scope, options: o} //save for next step
		});
	} else {
		o.callback.call(o.scope, true, o); //user-defined callback
	}
};

/*
 * Private method used as callback of WSDL request.
 * It parses XML and save the WSDL object (look up for semantics) in the shared cache
 */
Ext.ux.data.soap.WsdlContainer.loadWsdlCallback = function(options, success, response) {
	if (success) {
		var xml = response.responseXML;
		//getting just 2 namespace (to improve...)
		var namespaces = new Array();
		namespaces.push((xml.documentElement.attributes["targetNamespace"] + "" == "undefined") ? xml.documentElement.attributes.getNamedItem("targetNamespace").nodeValue : xml.documentElement.attributes["targetNamespace"].value);
		var tagname = "";
		if (xml.getElementsByTagName("schema")[0]) {
			tagname = "schema"
		}
		else {
			tagname = "xsd:schema"
		}
		namespaces.push(xml.getElementsByTagName(tagname)[0].getAttribute("targetNamespace"));
		//getting types
		var types = Ext.ux.data.soap.WsdlContainer.getTypesFromWsdl(xml);
		var wsdl = {namespaces:namespaces, 
					types: types
					};
		Ext.ux.data.soap.WsdlContainer.cachedWsdl[options.url] = wsdl;
		options.request.callback.call(options.request.scope, success, options);
	} else {
		Ext.emptyFn();
	}
};

/*
 * Private method parses XML getting object types 
 */
Ext.ux.data.soap.WsdlContainer.getTypesFromWsdl = function(wsdl) {
	var wsdlTypes = new Array();
	// IE
	var ell = wsdl.getElementsByTagName("xsd:element");	
	var useNamedItem = true;
	// MOZ
	if (ell.length == 0)	{
		ell = wsdl.getElementsByTagName("element");	     
		useNamedItem = false;
	}
	for(var i = 0; i < ell.length; i++)	{
		if (useNamedItem) {
			if(ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null) {
				wsdlTypes[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
			}
		} else {
			if(ell[i].attributes["name"] != null && ell[i].attributes["type"] != null) {
				wsdlTypes[ell[i].attributes["name"].value] = ell[i].attributes["type"].value;
			}
		}
	}
	return wsdlTypes;
};
