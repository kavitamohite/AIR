/*
 * Reader class extends JsonReader reads data from an XML-SOAP document
 * It uses the superclass readRecords method
 */
Ext.namespace("Ext.ux.soap");

/*
 * Constructor defines recordType (id field is skipped... who don't use a non-id field??)
 */
Ext.ux.soap.SoapReader = function(recordType) {
    var meta = {id:"id"};
    Ext.ux.soap.SoapReader.superclass.constructor.call(this, meta, recordType || meta.fields);
};

Ext.extend(Ext.ux.soap.SoapReader, Ext.data.JsonReader, {
	/*
	 * Proxy-invocated method that parse request and call superclass readRecords method 
	 */ 
	read: function(request, url, method) {
		this.wsdl = Ext.ux.data.soap.WsdlContainer.cachedWsdl[url];
		this.method = method;
		var result = this.parseSoapRequest(request);		
		for (i in result) {
			result = result[i]; //get first child from a map
    	}
		return this.readRecords(result);
	},
	
	/*
	 * Private method parses the request
	 */
	parseSoapRequest: function(req) {
		var o = null;
		var nd = this.getElementsByTagName(req.responseXML, this.method + "Response");
		if(nd.length == 0) {
			if(req.responseXML.getElementsByTagName("faultcode").length > 0) {
		        return new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
			}
		} else {
			o = this.node2object(nd[0]);
		}
		return o;
	},
	
	/*
	 * Private and recursive method parses node from XML-SOAP document
	 */
	node2object: function(node) {
		wsdlTypes = this.wsdl.types; //get wsdl props by static object
		// null node
		if (node == null) {
			return null;
		}
		// text node
		if(node.nodeType == 3 || node.nodeType == 4) {
			return this.extractValue(node);
		}
		// leaf node
		if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4)) {
			return this.node2object(node.childNodes[0]);
		}
		var isarray = this.getTypeFromWsdl(node.nodeName.substring(node.nodeName.indexOf(":")+1)).toLowerCase().indexOf("arrayof") != -1;
		// object node
		if (!isarray) {
			var obj = null;
			if (node.hasChildNodes()) {
				obj = new Object();
			}
			for (var i = 0; i < node.childNodes.length; i++)	{
				var p = this.node2object(node.childNodes[i]);
				obj[node.childNodes[i].nodeName.substring(node.childNodes[i].nodeName.indexOf(":")+1)] = p;
			}
			return obj;
		} else { 	// list node
			// create node ref
			var l = new Array();
			for (var i = 0; i < node.childNodes.length; i++) {
				l.push(this.node2object(node.childNodes[i]));
			}
			return l;
		}
		//return null; // unreachable Code
	},
	
	/*
	 * Private method "casts" object in correct way thanks to WSDL
	 */
	extractValue: function(node) {
		var wsdlTypes = this.wsdlTypes;
		var value = node.nodeValue;
		switch (this.getTypeFromWsdl(node.nodeName.substring(node.nodeName.indexOf(":")+1)).toLowerCase()) {
			default:
			case "xs:string":			
				return (value != null) ? value + "" : "";
			case "xs:boolean":
				return value + "" == "true";
			case "xs:int":
			case "xs:long":
				return (value != null) ? parseInt(value + "", 10) : 0;
			case "xs:double":
				return (value != null) ? parseFloat(value + "") : 0;
			case "xs:datetime":
				if(value == null) {
					return null;
				} else {
					value = value + "";
					value = value.substring(0, (value.lastIndexOf(".") == -1 ? value.length : value.lastIndexOf(".")));
					value = value.replace(/T/gi," ");
					value = value.replace(/-/gi,"/");
					var d = new Date();
					d.setTime(Date.parse(value));										
					return d;				
				}
		}
	},
	
	/* 
	 * Utility method to get type from element name
	 */
	getTypeFromWsdl: function(elementname) {
        var wsdlTypes = this.wsdl.types;
	    var type = wsdlTypes[elementname] + "";   
	    return (type == "undefined") ? "" : type;
	},

	/*
	 * Bad method to get the body of the soap envelope... Problem with IE and namespace
	 */
	getElementsByTagName :function(doc, tagName) {
	    return [doc.firstChild.firstChild.firstChild];  //to really improve
	}
});
