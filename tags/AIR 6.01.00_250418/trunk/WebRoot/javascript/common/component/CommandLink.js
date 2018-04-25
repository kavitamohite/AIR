Ext.namespace('Ext.ux');

Ext.ux.CommandLink = Ext.extend(Ext.BoxComponent, {
//    text: '',
//    img: '',
//    cls: '',//CSS als default <a> hover, usw. als Standard
	
    clickEvent: 'click',

    renderTpl:
    //v1 OK
    /*'<a href="#">\n\
        <tpl if="img">\n\
            <img src="{img}"/>\n\
        </tpl>\n\
        <tpl if="!img">\n\
            {text}\n\
        </tpl>\n\
    </a>',*/

//    v2 OK <div>s statt table?
    '<div><table><tr>\n\ ' +
        '<tpl if="img">\n\ ' +
            '<td align="center"><img src="{img}" align="middle"></td>\n\ ' +
        '</tpl>\n\ ' +
    	'<td align="center"><label class="{cls}">{text}</label></td></tr>\n\ ' +
    '</table></div>',//<a href="#" class="{cls}">{text}</a>
    
//    '<tpl for="."><div>'+
//	    '<tpl if="img">'+
//	        '<img src="{img}" align="top">'+
//	    '</tpl>'+
//		'<a href="#" class="{cls}">{text}</a>'+
//	'</div></tpl>',//oder statt <a> <label>? <label> reagiert auch auf click events
    
	
// {cls} ersetzt style xtype: 'commandlink' Attribut
//	style: {
//	textAlign: 'left',
//	//			  	  backgroundColor: panelbgcolor,
//	color: fontColor,
//	fontFamily: fontType,
//	fontWeight: 'normal',
//	fontSize: '8pt',
//	cursor: 'pointer'
//}
//fontSize:8
    
    
   //oder renderTpl im constructor oder initComponent Methode aufbauen für
   //Fall1: nur image --> image muss in Link sein
   //Fall2: nur text --> text muss in Link sein
   //Fall3: image und text --> nur text muss in Link sein
   
    onRender: function(ct, position) {
        if(!this.text && !this.img)
            throw new Error('commandlink requires text or img or both attributes');

        this.template = new Ext.Template(this.renderTpl);
        this.template.compile();
        
        var targs = {
            text: this.text,
            img: this.img,
            cls: this.cls
        };
//        cls: this.initialConfig.cls//this.cls//warum this.cls undefined ?! Oder el.addClass(this.cls)/el.removeClass(this.cls). 
//        Siehe Ext.Button source code
       

        if(position) {
            this.el = this.template.insertBefore(position, targs, true);
        } else {
            this.el = this.template.append(ct, targs, true);
        }
        
        this.mon(this.el, this.clickEvent, this.onClick, this);
    },
    
    onClick: function(e) {
        this.fireEvent('click', this, e);
        if(this.handler)
            this.handler.call(this, this, e);
    },
    
//    setHandler: function(handler, scope) {
//        this.handler = handler;
//        this.scope = scope;
//        return this;
//    }
    
    setIcon: function(img) {
    	this.img = img;
    },

    updateIcon: function(img) {
        this.img = img;
        
        var tplData = {
            text: this.text,
            img: this.img,
            cls: this.initialConfig.cls//this.cls//warum this.cls undefined ?!
        };
        
        this.update(tplData);
    },
    
    updateText: function(text) {
        this.text = text;
        
        var tplData = {
            text: this.text,
            img: this.img,
            cls: this.initialConfig.cls//this.cls//warum this.cls undefined ?!
        };
        
        this.update(tplData);
    },
    
    updateAll: function(text, img) {
        this.text = text;
        this.img = img;
        
        var tplData = {
            text: this.text,
            img: this.img,
            cls: this.initialConfig.cls//this.cls//warum this.cls undefined ?!
        };
        
        this.update(tplData);
    },
    
    //private
    update: function(tplData) {
        this.template.overwrite(this.el, tplData);
    }
});
Ext.reg('commandlink', Ext.ux.CommandLink);