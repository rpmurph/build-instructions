//>>built
define("dojox/string/BidiComplex","dojo/_base/kernel dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/sniff dojo/keys".split(" "),function(r,s,p,m,l,h){r.experimental("dojox.string.BidiComplex");var c=s.getObject("string.BidiComplex",!0,dojox),q=[];c.attachInput=function(a,b){a.alt=b;m.connect(a,"onkeydown",this,"_ceKeyDown");m.connect(a,"onkeyup",this,"_ceKeyUp");m.connect(a,"oncut",this,"_ceCutText");m.connect(a,"oncopy",this,"_ceCopyText");a.value=c.createDisplayString(a.value,a.alt)};
c.createDisplayString=function(a,b){a=c.stripSpecialCharacters(a);var k=c._parse(a,b),d="\u202a"+a,f=1;p.forEach(k,function(a){if(null!=a){var b=d.substring(0,a+f);a=d.substring(a+f,d.length);d=b+"\u200e"+a;f++}});return d};c.stripSpecialCharacters=function(a){return a.replace(/[\u200E\u200F\u202A-\u202E]/g,"")};c._ceKeyDown=function(a){q=(l("ie")?a.srcElement:a.target).value};c._ceKeyUp=function(a){var b=l("ie")?a.srcElement:a.target,k=b.value,d=a.keyCode;if(!(d==h.HOME||d==h.END||d==h.SHIFT)){var f,
e;if(a=c._getCaretPos(a,b))f=a[0],e=a[1];if(l("ie")){a=f;var g=e;if(d==h.LEFT_ARROW){"\u200e"==k.charAt(e-1)&&f==e&&c._setSelectedRange(b,f-1,e-1);return}if(d==h.RIGHT_ARROW){"\u200e"==k.charAt(e-1)&&(g=e+1,f==e&&(a=f+1));c._setSelectedRange(b,a,g);return}}else{if(d==h.LEFT_ARROW){"\u200e"==k.charAt(e-1)&&c._setSelectedRange(b,f-1,e-1);return}if(d==h.RIGHT_ARROW){"\u200e"==k.charAt(e-1)&&c._setSelectedRange(b,f+1,e+1);return}}a=c.createDisplayString(k,b.alt);k!=a&&(window.status=k+" c\x3d"+e,b.value=
a,d==h.DELETE&&"\u200e"==a.charAt(e)&&(b.value=a.substring(0,e)+a.substring(e+2,a.length)),d==h.DELETE?c._setSelectedRange(b,f,e):d==h.BACKSPACE?q.length>=e&&"\u200e"==q.charAt(e-1)?c._setSelectedRange(b,f-1,e-1):c._setSelectedRange(b,f,e):"\u200e"!=b.value.charAt(e)&&c._setSelectedRange(b,f+1,e+1))}};c._processCopy=function(a,b,k){null==b&&(b=l("ie")?document.selection.createRange().text:a.value.substring(a.selectionStart,a.selectionEnd));a=c.stripSpecialCharacters(b);l("ie")&&window.clipboardData.setData("Text",
a);return!0};c._ceCopyText=function(a){l("ie")&&(a.returnValue=!1);return c._processCopy(a,null,!1)};c._ceCutText=function(a){if(!c._processCopy(a,null,!1))return!1;if(l("ie"))document.selection.clear();else{var b=a.selectionStart;a.value=a.value.substring(0,b)+a.value.substring(a.selectionEnd);a.setSelectionRange(b,b)}return!0};c._getCaretPos=function(a,b){if(l("ie")){var c=0,d=document.selection.createRange().duplicate(),f=d.duplicate(),e=d.text.length;for("textarea"==b.type?f.moveToElementText(b):
f.expand("textedit");0<d.compareEndPoints("StartToStart",f);)d.moveStart("character",-1),++c;return[c,c+e]}return[a.target.selectionStart,a.target.selectionEnd]};c._setSelectedRange=function(a,b,c){if(l("ie")){var d=a.createTextRange();d&&("textarea"==a.type?d.moveToElementText(a):d.expand("textedit"),d.collapse(),d.moveEnd("character",c),d.moveStart("character",b),d.select())}else a.selectionStart=b,a.selectionEnd=c};var n=function(a,b,c){for(;0<b&&b!=c;){b--;var d=a.charAt(b);if("0"<=d&&"9">=d||
"\u00ff"<d)return!0;d=a.charAt(b);if("A"<=d&&"Z">=d||"a"<=d&&"z">=d)break}return!1};c._parse=function(a,b){var c=-1,d=[],f={FILE_PATH:"/\\:.",URL:"/:.?\x3d\x26#",XPATH:"/\\:.\x3c\x3e\x3d[]",EMAIL:"\x3c\x3e@.,;"}[b];switch(b){case "FILE_PATH":case "URL":case "XPATH":p.forEach(a,function(b,g){0<=f.indexOf(b)&&n(a,g,c)&&(c=g,d.push(g))});break;case "EMAIL":p.forEach(a,function(b,g){if('"'==b){n(a,g,c)&&(c=g,d.push(g));g++;var h=a.indexOf('"',g);h>=g&&(g=h);n(a,g,c)&&(c=g,d.push(g))}0<=f.indexOf(b)&&
n(a,g,c)&&(c=g,d.push(g))})}return d};return c});
//@ sourceMappingURL=BidiComplex.js.map