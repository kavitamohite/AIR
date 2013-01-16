Ext.namespace("Ext.ux.soap");
Ext.namespace("Ext.ux.soap.WsdlContainer");

Ext.ux.soap.getXML = function(response) {
  if (!response) return null;
  if (!response.responseText && response.responseXML) return response.responseXML;
  try {
    return new DOMParser().parseFromString(response.responseText || response,"text/xml");
  } catch (e) {
      var activeX = ["Msxml2.DOMDocument.4.0","MSXML2.DOMDocument.3.0", "Microsoft.XMLDOM"];
      var xmlDoc;
      for (var i = 0; i < activeX.length; ++i) {
        try {
          xmlDoc = new ActiveXObject(activeX[i]);
          xmlDoc.async = "false";
          xmlDoc.loadXML(response.responseText || response);
          return xmlDoc;
        }catch(e) {}
     }
     return null;
  }
};


/* SoapProxy */

Ext.ux.soap.SoapProxy = function(o){
    Ext.ux.soap.SoapProxy.superclass.constructor.call(this,o);
    Ext.apply(this,o);
};

Ext.extend(Ext.ux.soap.SoapProxy, Ext.data.DataProxy, {

  load : function(params, reader, callback, scope, arg){
      if(this.fireEvent("beforeload", this, params) !== false){
        this.params = params.params || this.params;
        this.url = params.url || this.url;
        this.method = params.method || this.method;
        this.reader = reader || this.reader;
        this.callback = callback || this.callback;
        this.scope = scope || this.scope || this;
        this.arg = arg || this.arg || null;
        var wsdlOption = {
          url: this.url,
          wsproxy : this.wsproxy,
          callback: this.loadWsdl,
          namespace: this.namespace,
          scope: this
        };
        Ext.ux.soap.WsdlContainer.loadWsdl(wsdlOption);
          
        }else{
            this.callback.call(this.scope, this.arg, false);
        }
    },
    
    loadWsdl : function(success, options) {
      var wsdl = Ext.ux.soap.WsdlContainer.cachedWsdl[this.url] || {namespaces:[]}; //get wsdl props by static object
      var xml = this.getXmlEnvelope(this.method, this.params, wsdl.namespaces);   
      if (this.wsproxy) {
        Ext.Ajax.request({
            url: this.wsproxy,
            params : {proxyurl : this.url},
            callback: this.loadResponse,
            xmlData : xml,
            scope: this
          });

      } else {
        Ext.Ajax.request({
            url: this.url,
            callback: this.loadResponse,
            xmlData : xml,
            scope: this
          });
      }
    },
    
    loadResponse : function(options, success, response) {  
        delete this.activeRequest;
        if(!success){
            this.fireEvent("loadexception", this, options, response);
            this.callback.call(this.scope, null, this.arg, false);
            return;
        }
        var result;
        try {
            result = this.reader.read(Ext.ux.soap.getXML(response), this.url, this.method);  //reader needs also url and methodName
        }catch(e){
            this.fireEvent("loadexception", this, options, response, e);
            this.callback.call(this.scope, null, this.arg, false);
            return;
        }
        this.fireEvent("load", this, options, this.arg);
        this.callback.call(this.scope, result, this.arg, true);
    },
    
    getXmlEnvelope : function(method, params, namespaces) {
      var nspace = namespaces[0]==namespaces[1] ? null : namespaces[1];
      var prefix1 = 'ns1';
      var prefix2 = namespaces[0]==namespaces[1] ? prefix1 : 'ns2';
      var sr = '<?xml version="1.0" encoding=\"utf-8\"?>' +
               '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
               '<soap:Header xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"></soap:Header>'+ 
               '<soapenv:Body>' + 
               '<'+ prefix1 + ':' + method + ' xmlns:' +prefix1+ '="' + namespaces[0] + '">' +
               this.formatParameters(params, nspace,prefix2)+
               '</'+prefix1+':' + method + '>'+
               '</soapenv:Body>'+
               '</soapenv:Envelope>';
    return sr;    
    },

    formatParameters : function(o, namespace,prefix) {
      var s = "";
      switch(typeof(o)) {
          case "string":
              s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); break;
          case "number":
          case "boolean":
              s += o.toString(); break;
          case "object":
              // Date
              if(o.constructor.toString().indexOf("function Date()") > -1)
              {
          
                  var year = o.getFullYear().toString();
                  var month = (o.getMonth() + 1).toString(); month = (month.length == 1) ? "0" + month : month;
                  var date = o.getDate().toString(); date = (date.length == 1) ? "0" + date : date;
                  var hours = o.getHours().toString(); hours = (hours.length == 1) ? "0" + hours : hours;
                  var minutes = o.getMinutes().toString(); minutes = (minutes.length == 1) ? "0" + minutes : minutes;
                  var seconds = o.getSeconds().toString(); seconds = (seconds.length == 1) ? "0" + seconds : seconds;
                  var milliseconds = o.getMilliseconds().toString();
                  var tzminutes = Math.abs(o.getTimezoneOffset());
                  var tzhours = 0;
                  while(tzminutes >= 60)
                  {
                      tzhours++;
                      tzminutes -= 60;
                  }
                  tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
                  tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
                  var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
                  s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
              }
              // Array
              else if(o.constructor.toString().indexOf("function Array()") > -1)
              {
                  for(var p in o)
                  {
                      if(!isNaN(p))   // linear array
                      {
                          (/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
                          var type = RegExp.$1;
                          switch(type)
                          {
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
                          s += type == 'Object' ?  this.formatParameters(o[p],null,prefix) :
                            '<' + prefix + ':' + type + (namespace ? ' xmlns:' + prefix + '="'+namespace + '"' : "") +">" + this.formatParameters(o[p],null,prefix) + '</'+prefix+':' + type + '>';
                      }
                      else if (typeof o[p]!='function')  {   // associative array
                        s += '<' + prefix + ':' + p + (namespace ? ' xmlns:' + prefix + '="'+namespace + '"' : "") +">" + this.formatParameters(o[p],null,prefix) + '</'+prefix+':' + p + '>';
                      }
                  }
              }
              // Object or custom function
              else {
                  for(var p in o) {
                      s += '<' + prefix + ':' + p + (namespace ? ' xmlns:' + prefix + '="'+namespace + '"' : "") +">" + this.formatParameters(o[p],null,prefix) + '</'+prefix+':' + p + '>';
                  }
              }
              break;
             
          default:
              break; // throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
      }
      return s;    
    }

});

Ext.ux.soap.WsdlContainer.cachedWsdl = new Array();

Ext.ux.soap.WsdlContainer.getWsdl = function(o) {
  var url = o.url;
  var callback = o.callback || function() { };
  var scope = o.scope || Ext.ux.soap.WsdlContainer;
  Ext.ux.soap.WsdlContainer.loadWsdl(url, callback, scope);
}

Ext.ux.soap.WsdlContainer.loadWsdl = function(o) {
  if(!Ext.ux.soap.WsdlContainer.cachedWsdl[o.url]) {
   if (o.wsproxy) {
      Ext.Ajax.request({
        url: o.wsproxy,
        params : 'wsdl&proxyurl=' + o.url,
        callback: Ext.ux.soap.WsdlContainer.loadWsdlCallback,
        disableCaching: false,
        method: 'GET',
        request: {callback: o.callback, scope: o.scope, options: o}
      });
   } else {
      Ext.Ajax.request({
        url: o.url,
        callback: Ext.ux.soap.WsdlContainer.loadWsdlCallback,
        params: 'wsdl',
        disableCaching: false,
        method: 'GET',
        request: {callback: o.callback, scope: o.scope, options: o}
      });
   }
  } else {
    o.callback.call(o.scope, true, o);
  }
}

/* SoapReader */
Ext.ux.soap.SoapReader = function(recordType){
    var meta = {id:"id"};
    Ext.ux.soap.SoapReader.superclass.constructor.call(this, meta, recordType);
};

Ext.extend(Ext.ux.soap.SoapReader, Ext.data.JsonReader, {
  read: function(request, url, method) {
    this.wsdl = Ext.ux.soap.WsdlContainer.cachedWsdl[url];
    this.method = method;
    var result = this.parseSoapRequest(request);
    for(i in result) result = result[i]; //get first child
    if(result.constructor.toString().indexOf("function Array()") == -1)
        result = [result]; //Create array for data root
    return this.readRecords(result);
  },
  
  parseSoapRequest: function(req) {
    var o = null;
    //TODO check if object is xml when not convert to object
    var nd = this.getElementsByTagName(req.responseXML || req, this.method + "Response");
    if(nd.length == 0) {
      if(req.responseXML.getElementsByTagName("faultcode").length > 0) {
            return new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
      }
    } else {
      o = this.node2object(nd[0]);
    }
    return o;
  },
  
  node2object: function(node) {
    wsdlTypes = this.wsdl.types; //get wsdl props by static object
    // null node
    if(node == null)
      return null;
    // text node
    if(node.nodeType == 3 || node.nodeType == 4) {
      return this.extractValue(node);
    }
    // leaf node
    if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
      return this.node2object(node.childNodes[0]);
    
    var key = node.nodeName.substring(node.nodeName.indexOf(":")+1);
    var wsdlType = this.getTypeFromWsdl(key).toLowerCase();
    var isarray = wsdlType.indexOf("arrayof") != -1;
    // object node
    if(!isarray)
    {
      var obj = null;
      var isArray = new Object();
      //Clean up unwanted nodes and see if data is a array
      for(var i=node.childNodes.length-1; i >=0; i--){
        var k = node.childNodes[i].nodeName.substring(node.childNodes[i].nodeName.indexOf(":")+1);
        if (k.substr(0,1)=='#') {
          node.removeChild(node.childNodes[i]);
        } else  {
          isArray[k] = (isArray[k] || 0)+1;   
          isarray |= isArray[k]!=1;
        }
      }
      if (node.childNodes.length >0)
        obj = isarray ? new Array() :new Object();
      for(var i = 0; i < node.childNodes.length; i++){      
        var p = this.node2object(node.childNodes[i]);
        var k = node.childNodes[i].nodeName.substring(node.childNodes[i].nodeName.indexOf(":")+1);
        if (isarray) {
          var data = new Object();
          data[k]=p;
          obj.push(data);
        } else  {
          obj[k] = p;
        }
      }
      return obj;
    }
    // list node
    else
    {
      // create node ref
      var l = new Array();
      for(var i = 0; i < node.childNodes.length; i++)
        l[l.length] = this.node2object(node.childNodes[i]);
      return l;
    }
    return null;
  },
  
  extractValue: function(node) {
    var wsdlTypes = this.wsdlTypes;
    var value = node.nodeValue;
    switch(this.getTypeFromWsdl(node.nodeName.substring(node.nodeName.indexOf(":")+1)).toLowerCase()) {
      default:
      case "s:string":      
        return (value != null) ? value + "" : "";
      case "s:boolean":
        return value + "" == "true";
      case "s:int":
      case "s:long":
        return (value != null) ? parseInt(value + "", 10) : 0;
      case "s:double":
        return (value != null) ? parseFloat(value + "") : 0;
      case "s:datetime":
        if(value == null)
          return null;
        else
        {
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
  
  getTypeFromWsdl: function(elementname) {
    var wsdlTypes = this.wsdl.types;
      var type = wsdlTypes[elementname] + "";
      return (type == "undefined") ? "" : type;
  },

  getElementsByTagName :function(document, tagName) {
    try {
      // trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
      return document.selectNodes(".//*[local-name()=\""+ tagName +"\"]");
    }
    catch (ex) {}
    // old XML parser support
    return document.getElementsByTagName(tagName);
  }
    
});

/* WsdlContainer */

Ext.ux.soap.WsdlContainer.loadWsdlCallback = function(options, success, response) {
  if (!success) {
     options.request.callback.call(options.request.scope, success, options);
     return;
  }  
  var xml = Ext.ux.soap.getXML(response);
  //getting namespace
  
  var namespaces = new Array();
  var named = (xml.documentElement.attributes["targetNamespace"] + "" == "undefined") ;
  namespaces.push(named ? xml.documentElement.attributes.getNamedItem("targetNamespace").nodeValue : xml.documentElement.attributes["targetNamespace"].value);
  namespaces.push(named ? xml.getElementsByTagName((options.namespace||"xs")+":schema")[0].attributes.getNamedItem("targetNamespace").nodeValue:xml.getElementsByTagName("schema")[0].getAttribute("targetNamespace"));
//TODO include files <xs:include schemaLocation="http://localhost?ObjectModel_v1r0"/>

  //getting types
  var types = Ext.ux.soap.WsdlContainer.getTypesFromWsdl(xml,options.elementPrefix);  
  var wsdl = {namespaces:namespaces, types: types};
  Ext.ux.soap.WsdlContainer.cachedWsdl[options.request.scope.url || options.url] = wsdl;
  options.request.callback.call(options.request.scope, success, options);
}

Ext.ux.soap.WsdlContainer.getTypesFromWsdl = function(wsdl,namespace) {
  var wsdlTypes = new Object();
  // IE
  var ell = wsdl.getElementsByTagName((namespace || "xs")+":element"); 
  var useNamedItem = true;
  // MOZ
  if(ell.length == 0) {
    ell = wsdl.getElementsByTagName("element");      
    useNamedItem = false;
  }
  for(var i = 0; i < ell.length; i++) {
    if(useNamedItem){
      if(ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null) 
        wsdlTypes[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
    }else{
      if(ell[i].attributes["name"] != null && ell[i].attributes["type"] != null) 
        wsdlTypes[ell[i].attributes["name"].value] = ell[i].attributes["type"].value;
    }
  }
  return wsdlTypes;
}
