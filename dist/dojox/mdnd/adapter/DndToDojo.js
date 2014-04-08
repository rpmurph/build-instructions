//>>built
define("dojox/mdnd/adapter/DndToDojo","dojo/_base/kernel dojo/_base/declare dojo/_base/connect dojo/_base/array dojo/dom-class dojo/dom-style dojo/dom-geometry dojo/topic dojo/_base/window dojox/mdnd/PureSource dojox/mdnd/LazyManager".split(" "),function(k,h,b,f,l,m,n,p,e){h=h("dojox.mdnd.adapter.DndToDojo",null,{_dojoList:null,_currentDojoArea:null,_dojoxManager:null,_dragStartHandler:null,_dropHandler:null,_moveHandler:null,_moveUpHandler:null,_draggedNode:null,constructor:function(){this._dojoList=
[];this._currentDojoArea=null;this._dojoxManager=dojox.mdnd.areaManager();this._dragStartHandler=b.subscribe("/dojox/mdnd/drag/start",this,function(a,d,c){this._draggedNode=a;this._moveHandler=b.connect(k.doc,"onmousemove",this,"onMouseMove")});this._dropHandler=b.subscribe("/dojox/mdnd/drop",this,function(a,d,c){this._currentDojoArea&&b.publish("/dojox/mdnd/adapter/dndToDojo/cancel",[this._currentDojoArea.node,this._currentDojoArea.type,this._draggedNode,this.accept]);this._currentDojoArea=this._draggedNode=
null;b.disconnect(this._moveHandler)})},_getIndexDojoArea:function(a){if(a)for(var d=0,b=this._dojoList.length;d<b;d++)if(this._dojoList[d].node===a)return d;return-1},_initCoordinates:function(a){if(a){a=n.position(a,!0);var b={};b.x=a.x;b.y=a.y;b.x1=a.x+a.w;b.y1=a.y+a.h;return b}return null},register:function(a,b,c){if(-1==this._getIndexDojoArea(a)){var g=this._initCoordinates(a);this._dojoList.push({node:a,type:b,dojo:c?c:!1,coords:g});c&&!this._lazyManager&&(this._lazyManager=new dojox.mdnd.LazyManager)}},
unregisterByNode:function(a){a=this._getIndexDojoArea(a);-1!=a&&this._dojoList.splice(a,1)},unregisterByType:function(a){if(a){var b=[];f.forEach(this._dojoList,function(c,g){c.type!=a&&b.push(c)});this._dojoList=b}},unregister:function(){this._dojoList=[]},refresh:function(){var a=this._dojoList;this.unregister();f.forEach(a,function(a){a.coords=this._initCoordinates(a.node)},this);this._dojoList=a},refreshByType:function(a){var b=this._dojoList;this.unregister();f.forEach(b,function(b){b.type==
a&&(b.coords=this._initCoordinates(b.node))},this);this._dojoList=b},_getHoverDojoArea:function(a){this._oldDojoArea=this._currentDojoArea;this._currentDojoArea=null;var b=a.x;a=a.y;for(var c=this._dojoList.length,g=0;g<c;g++){var e=this._dojoList[g],f=e.coords;if(f.x<=b&&b<=f.x1&&f.y<=a&&a<=f.y1){this._currentDojoArea=e;break}}},onMouseMove:function(a){this._getHoverDojoArea({x:a.pageX,y:a.pageY});if(this._currentDojoArea!=this._oldDojoArea)if(null==this._currentDojoArea)this.onDragExit(a);else{if(null!=
this._oldDojoArea)this.onDragExit(a);this.onDragEnter(a)}},isAccepted:function(a,b){return!0},onDragEnter:function(a){if(this._currentDojoArea.dojo){b.disconnect(this._dojoxManager._dragItem.handlers.pop());b.disconnect(this._dojoxManager._dragItem.handlers.pop());b.disconnect(this._dojoxManager._dragItem.item.events.pop());e.body().removeChild(this._dojoxManager._cover);e.body().removeChild(this._dojoxManager._cover2);var d=this._dojoxManager._dragItem.item.node;dojox.mdnd.adapter._dndFromDojo&&
dojox.mdnd.adapter._dndFromDojo.unsubscribeDnd();m.set(d,{position:"relative",top:"0",left:"0"});this._lazyManager.startDrag(a,d);var c=b.connect(this._lazyManager.manager,"overSource",this,function(){b.disconnect(c);this._lazyManager.manager.canDropFlag&&(this._dojoxManager._dropIndicator.node.style.display="none")});this.cancelHandler=b.subscribe("/dnd/cancel",this,function(){var a=this._dojoxManager._dragItem.item;a.events=[b.connect(a.handle,"onmousedown",a,"onMouseDown")];e.body().appendChild(this._dojoxManager._cover);
e.body().appendChild(this._dojoxManager._cover2);this._dojoxManager._cover.appendChild(a.node);"none"==this._dojoxManager._dropIndicator.node.style.display&&""==this._dojoxManager._dropIndicator.node.style.display;this._dojoxManager._dragItem.handlers.push(b.connect(this._dojoxManager._dragItem.item,"onDrag",this._dojoxManager,"onDrag"));this._dojoxManager._dragItem.handlers.push(b.connect(this._dojoxManager._dragItem.item,"onDragEnd",this._dojoxManager,"onDrop"));this._draggedNode.style.display=
"";this._dojoxManager.onDrop(this._draggedNode);b.unsubscribe(this.cancelHandler);b.unsubscribe(this.dropHandler);dojox.mdnd.adapter._dndFromDojo&&dojox.mdnd.adapter._dndFromDojo.subscribeDnd()});this.dropHandler=b.subscribe("/dnd/drop/before",this,function(a){b.unsubscribe(this.cancelHandler);b.unsubscribe(this.dropHandler);this.onDrop()})}else if(this.accept=this.isAccepted(this._dojoxManager._dragItem.item.node,this._currentDojoArea))b.disconnect(this._dojoxManager._dragItem.handlers.pop()),b.disconnect(this._dojoxManager._dragItem.handlers.pop()),
this._dojoxManager._dropIndicator.node.style.display="none",this._moveUpHandler||(this._moveUpHandler=b.connect(k.doc,"onmouseup",this,"onDrop"));b.publish("/dojox/mdnd/adapter/dndToDojo/over",[this._currentDojoArea.node,this._currentDojoArea.type,this._draggedNode,this.accept])},onDragExit:function(a){if(this._oldDojoArea.dojo){b.unsubscribe(this.cancelHandler);b.unsubscribe(this.dropHandler);var d=this._dojoxManager._dragItem.item;this._dojoxManager._dragItem.item.events.push(b.connect(d.node.ownerDocument,
"onmousemove",d,"onMove"));e.body().appendChild(this._dojoxManager._cover);e.body().appendChild(this._dojoxManager._cover2);this._dojoxManager._cover.appendChild(d.node);var c=d.node.style;c.position="absolute";c.left=d.offsetDrag.l+a.pageX+"px";c.top=d.offsetDrag.t+a.pageX+"px";c.display="";this._lazyManager.cancelDrag();dojox.mdnd.adapter._dndFromDojo&&dojox.mdnd.adapter._dndFromDojo.subscribeDnd();"none"==this._dojoxManager._dropIndicator.node.style.display&&(this._dojoxManager._dropIndicator.node.style.display=
"");this._dojoxManager._dragItem.handlers.push(b.connect(this._dojoxManager._dragItem.item,"onDrag",this._dojoxManager,"onDrag"));this._dojoxManager._dragItem.handlers.push(b.connect(this._dojoxManager._dragItem.item,"onDragEnd",this._dojoxManager,"onDrop"));this._dojoxManager._dragItem.item.onMove(a)}else this.accept&&(this._moveUpHandler&&(b.disconnect(this._moveUpHandler),this._moveUpHandler=null),"none"==this._dojoxManager._dropIndicator.node.style.display&&(this._dojoxManager._dropIndicator.node.style.display=
""),this._dojoxManager._dragItem.handlers.push(b.connect(this._dojoxManager._dragItem.item,"onDrag",this._dojoxManager,"onDrag")),this._dojoxManager._dragItem.handlers.push(b.connect(this._dojoxManager._dragItem.item,"onDragEnd",this._dojoxManager,"onDrop")),this._dojoxManager._dragItem.item.onMove(a));b.publish("/dojox/mdnd/adapter/dndToDojo/out",[this._oldDojoArea.node,this._oldDojoArea.type,this._draggedNode,this.accept])},onDrop:function(a){this._currentDojoArea.dojo&&dojox.mdnd.adapter._dndFromDojo&&
dojox.mdnd.adapter._dndFromDojo.subscribeDnd();"none"==this._dojoxManager._dropIndicator.node.style.display&&(this._dojoxManager._dropIndicator.node.style.display="");this._dojoxManager._cover.parentNode&&1==this._dojoxManager._cover.parentNode.nodeType&&(e.body().removeChild(this._dojoxManager._cover),e.body().removeChild(this._dojoxManager._cover2));this._draggedNode.parentNode==this._dojoxManager._cover&&this._dojoxManager._cover.removeChild(this._draggedNode);b.disconnect(this._moveHandler);b.disconnect(this._moveUpHandler);
this._moveHandler=this._moveUpHandler=null;b.publish("/dojox/mdnd/adapter/dndToDojo/drop",[this._draggedNode,this._currentDojoArea.node,this._currentDojoArea.type]);l.remove(this._draggedNode,"dragNode");a=this._draggedNode.style;a.position="relative";a.left="0";a.top="0";a.width="auto";f.forEach(this._dojoxManager._dragItem.handlers,b.disconnect);this._dojoxManager._deleteMoveableItem(this._dojoxManager._dragItem);this._currentDojoArea=this._draggedNode=null;this._dojoxManager._resetAfterDrop()}});
dojox.mdnd.adapter._dndToDojo=null;dojox.mdnd.adapter.dndToDojo=function(){dojox.mdnd.adapter._dndToDojo||(dojox.mdnd.adapter._dndToDojo=new dojox.mdnd.adapter.DndToDojo);return dojox.mdnd.adapter._dndToDojo};return h});
//@ sourceMappingURL=DndToDojo.js.map