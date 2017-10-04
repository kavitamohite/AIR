Ext.namespace('Ext.ux');

Ext.ux.AppLabelTag = Ext.extend(Ext.BoxComponent, {

//    cls: '',

    renderTpl:
//		'<table>'+
//			'<tr class="AppLabelTag-name"><td>{shortName}</td><td>&nbsp;-&nbsp;{longName}</td></tr>'+
//			'<tr class="AppLabelTag-version"><td colspan="2">{version}&nbsp;{database}</td></tr>'+
//		'</table>',
    	
//		'<div>'+
//			'<div class="AppLabelTag-name">{shortName}&nbsp;-&nbsp;{longName}</div>'+
//			'<div class="AppLabelTag-version">{version}&nbsp;{database}</div>'+
//		'</div>',
		
		'<div>'+
			'<div class="AppLabelTag-name">{shortName}&nbsp;-&nbsp;{longName}</div>'+
			'<div class="AppLabelTag-container"><div class="AppLabelTag-version">{version}&nbsp;{database}</div><div class="AppLabelTag-browserOptimization">{browserOptimization}</div></div>'+
		'</div>',
		
		renderTplQ:
			
			'<div>'+
				'<div class="AppLabelTag-name-Q">{shortName}&nbsp;-&nbsp;{longName}</div>'+
				'<div class="AppLabelTag-container"><div class="AppLabelTag-version-Q">{version}&nbsp;{database}</div><div class="AppLabelTag-browserOptimization">{browserOptimization}</div></div>'+
			'</div>',
			
    onRender: function(ct, position) {
        //if(!this.text && !this.img)
        //    throw new Error('commandlink requires text or img or both attributes');
    	var hostName=window.location.hostname;
		if(hostName==AC.SERVERNAME_QA) {
			
        this.template = new Ext.Template(this.renderTplQ);
		}
		else{
			this.template = new Ext.Template(this.renderTpl);	
		}
        this.template.compile();
        
        var targs = {
            shortName: this.shortName,
            longName: this.longName,
			version: this.version,
			database: this.database,
			browserOptimization: this.browserOptimization
		};
        

        if(position) {
            this.el = this.template.insertBefore(position, targs, true);
        } else {
            this.el = this.template.append(ct, targs, true);
        }
        
        //this.mon(this.el, this.clickEvent, this.onClick, this);
    },
    
    setIeMessage: function() {
    	var el = this.getEl();
    	var browserMessage = el.dom.children[1].children[1];
    	
    	if(Ext.isIE) {
    		browserMessage.style.visibility = 'visible';
    	} else {
    		browserMessage.style.visibility = 'hidden';
    	}
    },
    
	/*
    onClick: function(e) {
        this.fireEvent('click', this, e);
        if(this.handler)
            this.handler.call(this, this, e);
    },*/
    
//    setHandler: function(handler, scope) {
//        this.handler = handler;
//        this.scope = scope;
//        return this;
//    }
    
    setData: function(data) {
    	this.shortName = data.shortName;
		this.longName = data.longName;
		this.version = data.version;
		this.database = data.database;
		this.browserOptimization = data.browserOptimization;
    },

    updateShortName: function(shortName) {
        var tplData = {
    		shortName: shortName,
    		longName: this.longName,
    		version: this.version,
    		database: this.database,
    		browserOptimization: this.browserOptimization
        };
        
        this.update(tplData);
    },
    
    updateLongName: function(longName) {
        var tplData = {
    		shortName: this.shortName,
    		longName: longName,
    		version: this.version,
    		database: this.database,
    		browserOptimization: this.browserOptimization
        };
        
        this.update(tplData);
    },
    
    updateVersion: function(version) {
        var tplData = {
    		shortName: this.shortName,
    		longName: this.longName,
    		version: version,
    		database: this.database,
    		browserOptimization: this.browserOptimization
        };
        
        this.update(tplData);
    },
    
    updateDatabase: function(database) {
        var tplData = {
    		shortName: this.shortName,
    		longName: this.longName,
    		version: this.version,
    		database: database,
    		browserOptimization: this.browserOptimization
        };
        
        this.update(tplData);
    },
    
    updateBrowserOptimization: function(browserOptimization) {
        var tplData = {
    		shortName: this.shortName,
    		longName: this.longName,
    		version: this.version,
    		database: this.database,
    		browserOptimization: browserOptimization
        };
        
        this.update(tplData);
    },
    
    updateAll: function(tplData) {
        this.update(tplData);
    },
    
    //private
    update: function(tplData) {
        this.template.overwrite(this.el, tplData);//fire render event if(!template) instead of this.template.overwrite?
    }
});
Ext.reg('applabeltag', Ext.ux.AppLabelTag);