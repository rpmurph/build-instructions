//>>built
define("dojox/storage/WhatWGStorageProvider",["dojo","dijit","dojox","dojo/require!dojox/storage/Provider,dojox/storage/manager"],function(d,k,g){d.provide("dojox.storage.WhatWGStorageProvider");d.require("dojox.storage.Provider");d.require("dojox.storage.manager");d.declare("dojox.storage.WhatWGStorageProvider",[g.storage.Provider],{initialized:!1,_domain:null,_available:null,_statusHandler:null,_allNamespaces:null,_storageEventListener:null,initialize:function(){!0!=d.config.disableWhatWGStorage&&
(this._domain=location.hostname,this.initialized=!0,g.storage.manager.loaded())},isAvailable:function(){return this._available=!0},put:function(a,b,c,e){if(!1==this.isValidKey(a))throw Error("Invalid key given: "+a);e=e||this.DEFAULT_NAMESPACE;a=this.getFullKey(a,e);this._statusHandler=c;b=d.isString(b)?"string:"+b:d.toJson(b);var h=d.hitch(this,function(b){window.removeEventListener("storage",h,!1);c&&c.call(null,this.SUCCESS,a,null,e)});window.addEventListener("storage",h,!1);try{globalStorage[this._domain].setItem(a,
b)}catch(f){this._statusHandler.call(null,this.FAILED,a,f.toString(),e)}},get:function(a,b){if(!1==this.isValidKey(a))throw Error("Invalid key given: "+a);b=b||this.DEFAULT_NAMESPACE;a=this.getFullKey(a,b);var c=globalStorage[this._domain].getItem(a);if(null==c||""==c)return null;c=c.value;return c=d.isString(c)&&/^string:/.test(c)?c.substring(7):d.fromJson(c)},getNamespaces:function(){for(var a=[this.DEFAULT_NAMESPACE],b={},c=globalStorage[this._domain],e=/^__([^_]*)_/,d=0;d<c.length;d++){var f=
c.key(d);!0==e.test(f)&&(f=f.match(e)[1],"undefined"==typeof b[f]&&(b[f]=!0,a.push(f)))}return a},getKeys:function(a){a=a||this.DEFAULT_NAMESPACE;if(!1==this.isValidKey(a))throw Error("Invalid namespace given: "+a);a=a==this.DEFAULT_NAMESPACE?/^([^_]{2}.*)$/:RegExp("^__"+a+"_(.*)$");for(var b=globalStorage[this._domain],c=[],e=0;e<b.length;e++){var d=b.key(e);!0==a.test(d)&&(d=d.match(a)[1],c.push(d))}return c},clear:function(a){a=a||this.DEFAULT_NAMESPACE;if(!1==this.isValidKey(a))throw Error("Invalid namespace given: "+
a);a=a==this.DEFAULT_NAMESPACE?/^[^_]{2}/:RegExp("^__"+a+"_");for(var b=globalStorage[this._domain],c=[],e=0;e<b.length;e++)!0==a.test(b.key(e))&&(c[c.length]=b.key(e));d.forEach(c,d.hitch(b,"removeItem"))},remove:function(a,b){a=this.getFullKey(a,b);globalStorage[this._domain].removeItem(a)},isPermanent:function(){return!0},getMaximumSize:function(){return this.SIZE_NO_LIMIT},hasSettingsUI:function(){return!1},showSettingsUI:function(){throw Error(this.declaredClass+" does not support a storage settings user-interface");
},hideSettingsUI:function(){throw Error(this.declaredClass+" does not support a storage settings user-interface");},getFullKey:function(a,b){b=b||this.DEFAULT_NAMESPACE;if(!1==this.isValidKey(b))throw Error("Invalid namespace given: "+b);return b==this.DEFAULT_NAMESPACE?a:"__"+b+"_"+a}});g.storage.manager.register("dojox.storage.WhatWGStorageProvider",new g.storage.WhatWGStorageProvider)});
//@ sourceMappingURL=WhatWGStorageProvider.js.map