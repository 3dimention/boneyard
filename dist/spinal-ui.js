//	SpinalJS Ui@0.0.1 (c) 2014 Patricio Ferreira <3dimentionar@gmail.com>, 3dimention.com
//	SpinalJS may be freely distributed under the MIT license.
//	For all details and documentation: http://3dimention.github.io/spinal
define("ui/view",["core/spinal","util/string","util/exception/ui","templates/spinal","libs/bootstrap"],function(e,t,n){var r=e.namespace("com.spinal.ui.View",e.Backbone.View.inherit({id:t.uuid(),events:{},className:"com-spinal-ui-view",method:"append",_successor:null,constructor:function(e){Backbone.View.apply(this,arguments)},initialize:function(e){return e||(e={}),this._valid(e),e.id&&(this.id=e.id),e.method&&(this.method=e.method),e.el&&this.$el.addClass(this.className),this.template=this._compile(e.template?e.template:this.template),this},_valid:function(e){e||(e={});if(e.id&&!_.isString(e.id))throw new n("InvalidIDType");if(!e.model||e.model instanceof Backbone.Model){if(e.method&&!r.RENDER[e.method])throw new n("UnsupportedRenderMethod",{method:"non-existent-method"});return!0}throw new n("InvalidModelType")},_beforeRender:function(t){if(!this._successor)throw new n("SuccessorNotSpecified");if(this._successor instanceof e.com.spinal.ui.Container){if(!this._successor.findById(this.
id))throw new n("UIStackViolation",{viewId:"view-error",succesorId:"container-declared-inline"});return this}throw new n("InvalidSuccessorType")},_compile:function(e){return e||(e=""),_.isFunction(e)?e:_.template(e)},render:function(e){e||(e={}),this._beforeRender(arguments).detach();var t=e.method&&r.RENDER[e.method]?e.method:this.method,n=this.model?this.model.toJSON():this._successor.model?this._successor.model.toJSON():{};return this._successor.$el[t](this.$el.append(this.template(n))),e.silent||this.trigger(r.EVENTS.rendered,{view:this}),this},update:function(e){return(!e||!e.silent)&&this.trigger(r.EVENTS.updated,{view:this}),this},lookup:function(e){return e?this._next(e):null},show:function(e){return this.$el.show(),(!e||!e.silent)&&this.trigger(r.EVENTS.shown,{view:this}),this},hide:function(e){return this.$el.hide(),(!e||!e.silent)&&this.trigger(r.EVENTS.hidden,{view:this}),this},enable:function(e){return this.$el.removeAttr("disabled"),(!e||!e.silent)&&this.trigger(r.EVENTS.enabled
,{view:this}),this},disable:function(e){return this.$el.attr("disabled","true"),(!e||!e.silent)&&this.trigger(r.EVENTS.disabled,{view:this}),this},detach:function(e){return r.__super__.remove.apply(this,arguments),(!e||!e.silent)&&this.trigger(r.EVENTS.detached,{view:this}),this},_next:function(e){return this.id===e?this:this._successor?this._successor.lookup(e):null},toString:function(){return"[object View]"}},{NAME:"View",RENDER:{append:"append",prepend:"prepend",appendTo:"appendTo",prependTo:"prependTo",html:"html"},EVENTS:{shown:"com:spinal:ui:view:shown",hidden:"com:spinal:ui:view:hidden",enabled:"com:spinal:ui:view:enabled",disabled:"com:spinal:ui:view:disabled",rendered:"com:spinal:ui:view:rendered",updated:"com:spinal:ui:view:updated",detached:"com:spinal:ui:view:detached"}}));return r}),define("ui/container",["core/spinal","ui/view","util/adt/collection","util/exception/ui"],function(e,t,n,r){var i=e.namespace("com.spinal.ui.Container",t.inherit({className:"com-spinal-ui-container"
,views:null,constructor:function(){t.apply(this,arguments)},initialize:function(e){return e||(e={}),i.__super__.initialize.apply(this,arguments),this.views=new n([],e.interface?{"interface":e.interface}:{}),this},_valid:function(e){e||(e={}),i.__super__._valid.apply(this,arguments);if(!e.interface||new e.interface instanceof Backbone.View)return!0;throw new r("InvalidInterfaceType")},add:function(e,t){return t||(t={}),this.findById(e.id)||(e=this.views.add(e),e._successor=this,t.renderOnAdd&&e.render(t),t.silent||this.trigger(i.EVENTS.added,{added:e,view:this})),e},remove:function(e,t){t||(t={});var n=this.getPos(e);return _.isNull(n)||(this.views.remove(n),e._successor=null,t.detachOnRemove&&e.detach(),t.silent||this.trigger(i.EVENTS.removed,{removed:e,view:this})),this},removeAll:function(){return this.views.isEmpty()||this.invoke("detach",arguments),this.views.reset(),this},get:function(e){return this.views.get(e)},getPos:function(e){return this.views.findPosBy(function(t){return t.id&&
t.id===e.id})},render:function(){if(!this._successor){var e=this.$el.parent().length>0?this.$el.parent()[0].nodeName.toLowerCase():"body";this._successor=new i({el:e}),this._successor.add(this,{silent:!0})}return i.__super__.render.apply(this,arguments),this.invoke("render",arguments),this},update:function(e){return e||(e={}),i.__super__.update.apply(this,arguments),this.invoke("update",arguments),this},findById:function(e){return e?this.views.find(function(t){return t.id&&t.id===e}):null},filter:function(e){return this.views.findBy(e)},invoke:function(e){var t=Array.prototype.slice.call(arguments,1);return this.views.invoke(e,t)},show:function(){return i.__super__.show.apply(this,arguments),this.invoke("show",arguments),this},hide:function(){return i.__super__.hide.apply(this,arguments),this.invoke("hide",arguments),this},enable:function(){return i.__super__.enable.apply(this,arguments),this.invoke("enable",arguments),this},disable:function(){return i.__super__.disable.apply(this,arguments
),this.invoke("disable",arguments),this},detach:function(){return this.views.isEmpty()||this.invoke("detach",arguments),i.__super__.detach.apply(this,arguments),this},toString:function(){return"[object Container]"}},{NAME:"Container",EVENTS:{added:"com:spinal:ui:container:added",removed:"com:spinal:ui:container:removed"}}));return i}),define("spinal-ui",["ui/view","ui/container"],function(){});