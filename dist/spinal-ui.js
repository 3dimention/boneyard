//	SpinalJS Ui@0.0.1 (c) 2014 Patricio Ferreira <3dimentionar@gmail.com>, 3dimention.com
//	SpinalJS may be freely distributed under the MIT license.
//	For all details and documentation: http://3dimention.github.io/spinal
define("ui/view",["core/spinal","util/string","util/exception/ui","templates/spinal","libs/bootstrap"],function(e,t,n){var r=e.namespace("com.spinal.ui.View",Backbone.View.inherit({id:null,events:{},className:"ui-view",method:"append",_parent:null,_theme:null,_tpl:null,constructor:function(e){e||(e={}),Backbone.View.apply(this,arguments),this.id=e.id?e.id:this.$el.attr("id")?this.$el.attr("id"):null,e.autoId&&(this.id=t.uuid()),this.$el.attr("id",this.id)},initialize:function(e){return e||(e={}),this._valid(e),e.el&&this.$el.addClass(this.className),e.theme&&(this._theme=e.theme,this.$el.addClass(this._theme)),e.method&&(this.method=e.method),e.template&&(this._tpl=this._compile(e.template)),this},_valid:function(e){e||(e={});if(e.id&&!_.isString(e.id))throw new n("InvalidIDType");if(!e.model||e.model instanceof Backbone.Model){if(e.method&&!r.RENDER[e.method])throw new n("UnsupportedRenderMethod",{method:"non-existent-method"});return!0}throw new n("InvalidModelType")},_beforeRender:function(
t){if(!this._parent)throw new n("SuccessorNotSpecified");if(this._parent instanceof e.com.spinal.ui.Container){if(this.id&&!this._parent.findById(this.id))throw new n("UIStackViolation",{viewId:"view-error",succesorId:"container-declared-inline"});return this}throw new n("InvalidSuccessorType")},_compile:function(e){return!e||!_.isString(e)&&!_.isFunction(e)?null:_.isString(e)?_.template(e):e},data:function(e){return e||(e={}),this.model?this.model.toJSON():this._parent&&this._parent.model?this._parent.model.toJSON():e},template:function(e,t){return _.isObject(e)&&(t=e,e=null),e=e?this._compile(e):this._tpl,e?this.$el.html(e(this.data(t))):this.$el},render:function(e){e||(e={}),this._beforeRender(arguments).detach();var t=e.method&&r.RENDER[e.method]?e.method:this.method;return this._parent._targetEl()[t](this.template(this._tpl)),e.silent||this.trigger(r.EVENTS.render,{view:this}),this.delegateEvents()},update:function(e){return(!e||!e.silent)&&this.trigger(r.EVENTS.update,{view:this})
,this},theme:function(e){return!e||!_.isString(e)?this:(this.$el.removeClass(this._theme).addClass(e),this._theme=e,this)},lookup:function(e){return e?this._next(e):null},addClass:function(e){return e?(this.$el.addClass(e),this):this},removeClass:function(e){return e?(this.$el.removeClass(e),this):this},show:function(e){return this.$el.show(),(!e||!e.silent)&&this.trigger(r.EVENTS.show,{view:this}),this},hide:function(e){return this.$el.hide(),(!e||!e.silent)&&this.trigger(r.EVENTS.hide,{view:this}),this},enable:function(e){return this.$el.removeAttr("disabled"),(!e||!e.silent)&&this.trigger(r.EVENTS.enable,{view:this}),this},disable:function(e){return this.$el.attr("disabled","true"),(!e||!e.silent)&&this.trigger(r.EVENTS.disable,{view:this}),this},detach:function(e){return r.__super__.remove.apply(this,arguments),(!e||!e.silent)&&this.trigger(r.EVENTS.detach,{view:this}),this},_next:function(e){return this.id&&this.id===e?this:this._parent?this._parent.lookup(e):null},toString:function(
){return"[object View]"}},{NAME:"View",RENDER:{append:"append",prepend:"prepend",appendTo:"appendTo",prependTo:"prependTo",html:"html"},EVENTS:{click:"com:spinal:ui:view:click",show:"com:spinal:ui:view:show",hide:"com:spinal:ui:view:hide",enable:"com:spinal:ui:view:enable",disable:"com:spinal:ui:view:disable",render:"com:spinal:ui:view:rendere",update:"com:spinal:ui:view:update",detach:"com:spinal:ui:view:detach"}}));return r}),define("ui/container",["core/spinal","ui/view","util/adt/collection","util/exception/ui"],function(e,t,n,r){var i=e.namespace("com.spinal.ui.Container",t.inherit({className:"ui-container container",views:null,constructor:function(){t.apply(this,arguments)},initialize:function(e){return e||(e={}),i.__super__.initialize.apply(this,arguments),this.views=new n([],e.interface?{"interface":e.interface}:{}),e.views&&this.addAll(e.views,{silent:!0}),this},_valid:function(e){e||(e={}),i.__super__._valid.apply(this,arguments);if(!e.interface||new e.interface instanceof Backbone
.View)return!0;throw new r("InvalidInterfaceType")},_resolveSuccesor:function(){if(!this._parent){var e=this.$el.parent().length>0?this.$el.parent()[0].nodeName.toLowerCase():"body";this._parent=new i({el:e}),this._parent.add(this,{silent:!0})}return this},_targetEl:function(){return this.$el},theme:function(e){return this.views.isEmpty()||this.invoke("theme",arguments),i.__super__.theme.apply(this,arguments),this},render:function(){return this._resolveSuccesor(),i.__super__.render.apply(this,arguments),this.invoke("render",arguments),this},update:function(e){return e||(e={}),i.__super__.update.apply(this,arguments),this.invoke("update",arguments),this},add:function(e,t){t||(t={});var n=e.id?this.findById(e.id):this.findByCID(e.cid);return n||(e=this.views.add(e),e._parent=this,t.renderOnAdd&&e.render(t),t.silent||this.trigger(i.EVENTS.add,{added:e,view:this})),e},addAll:function(e,t){return t||(t={}),_.map(e,function(e){return this.add(e,t)},this)},remove:function(e,t){t||(t={});var n=
this.getPos(e);return _.isNull(n)||(this.views.remove(n),e._parent=null,t.detachOnRemove&&e.detach(),t.silent||this.trigger(i.EVENTS.remove,{removed:e,view:this})),this},removeAll:function(e){return e||(e={}),this.views.isEmpty()||this.invoke("detach",arguments),this.views.reset(),e.silent||this.trigger(i.EVENTS.removeAll,{view:this}),this},get:function(e){return this.views.get(e)},getPos:function(e){return this.views.findPosBy(function(t){return t.cid&&t.cid===e.cid})},findByCID:function(e){return e?this.views.find(function(t){return t.cid&&t.cid===e}):null},findById:function(e){return e?this.views.find(function(t){return t.id&&t.id===e}):null},filter:function(e){return this.views.findBy(e)},invoke:function(e){if(this.views.size()===0)return[];var t=Array.prototype.slice.call(arguments,1);return this.views.invoke(e,t)},show:function(){return i.__super__.show.apply(this,arguments),this.invoke("show",arguments),this},hide:function(){return i.__super__.hide.apply(this,arguments),this.invoke
("hide",arguments),this},enable:function(){return i.__super__.enable.apply(this,arguments),this.invoke("enable",arguments),this},disable:function(){return i.__super__.disable.apply(this,arguments),this.invoke("disable",arguments),this},detach:function(){return this.views.isEmpty()||this.invoke("detach",arguments),i.__super__.detach.apply(this,arguments),this},toString:function(){return"[object Container]"}},{NAME:"Container",EVENTS:{add:"com:spinal:ui:container:add",remove:"com:spinal:ui:container:remove",removeAll:"com:spinal:ui:container:removeAll"}}));return i}),define("ui/basic/paragraph",["ui/view","util/string"],function(e,t){var n=Spinal.namespace("com.spinal.ui.basic.Paragraph",e.inherit({className:"ui-paragrah",tagName:"p",_content:"",initialize:function(e){return e||(e={}),e.content&&(this._content=e.content),n.__super__.initialize.apply(this,arguments),this},render:function(e){return n.__super__.render.apply(this,arguments),this.content(this._content),this},content:function(e
){return t.defined(e)?(this.$el.html(this._content=e),this):this._content}},{NAME:"Paragraph"}));return n}),define("ui/basic/link",["ui/basic/paragraph","util/string"],function(e,t){var n=Spinal.namespace("com.spinal.ui.basic.Link",e.inherit({className:"ui-link",tagName:"a",_href:"",initialize:function(e){return e||(e={}),e.href&&(this._href=e.href),n.__super__.initialize.apply(this,arguments),this},render:function(e){return n.__super__.render.apply(this,arguments),this.href(this._href),this},href:function(e){return t.defined(e)?(this.$el.attr("href",this._href=e),this):this._href}},{NAME:"Link"}));return n}),define("ui/basic/header",["ui/basic/paragraph"],function(e){var t=Spinal.namespace("com.spinal.ui.basic.Header",e.inherit({className:"ui-header",tagName:"h",_heading:"1",constructor:function(e){e||(e={}),e.heading&&(this._heading=e.heading),this.tagName=this.tagName+this._heading,t.__super__.constructor.apply(this,arguments)},initialize:function(e){return e||(e={}),t.__super__.initialize
.apply(this,arguments),this}},{NAME:"Header"}));return t}),define("ui/basic/label",["ui/basic/paragraph","util/string"],function(e,t){var n=Spinal.namespace("com.spinal.ui.basic.Label",e.inherit({className:"ui-label",tagName:"label",_afor:null,initialize:function(e){return e||(e={}),e.afor&&(this._afor=e.afor),n.__super__.initialize.apply(this,arguments),this},render:function(e){return n.__super__.render.apply(this,arguments),this.afor(this._afor),this},afor:function(e){return t.defined(e)?(this.$el.attr("for",this._afor=e),this):this._afor}},{NAME:"Label"}));return n}),define("ui/basic/span",["ui/basic/paragraph"],function(e){var t=Spinal.namespace("com.spinal.ui.basic.Span",e.inherit({className:"ui-span",tagName:"span",initialize:function(e){return e||(e={}),t.__super__.initialize.apply(this,arguments),this}},{NAME:"Span"}));return t}),define("ui/basic/image",["ui/view","util/string"],function(e,t){var n=Spinal.namespace("com.spinal.ui.basic.Image",e.inherit({className:"ui-image",tagName
:"img",_src:null,_alt:"",initialize:function(e){return e||(e={}),e.src&&(this._src=e.src),e.alt&&(this._alt=e.alt),n.__super__.initialize.apply(this,arguments),this},render:function(e){return n.__super__.render.apply(this,arguments),this.src(this._src),this.alt(this._alt),this},src:function(e){return t.defined(e)?(this.$el.attr("src",this._src=e),this):this._src},alt:function(e){return t.defined(e)?(this.$el.attr("alt",this._alt=e),this):this._alt}},{NAME:"Image"}));return n}),define("ui/misc/panel",["ui/container","util/string"],function(e,t){var n=Spinal.namespace("com.spinal.ui.misc.Panel",e.inherit({className:"ui-panel panel",tagName:"div",_title:"Default Title",_type:null,initialize:function(e){return e||(e={}),e.title&&(this._title=e.title),this._type=e.type?e.type:n.TYPES.standard,e.template=Spinal.tpl("spinal.basic.panel",{}),n.__super__.initialize.apply(this,arguments),this},_targetEl:function(){return this.$el.children(".panel-body")},render:function(e){return n.__super__.render
.apply(this,arguments),this.title(this._title),this.type(this._type),this},title:function(e){return t.defined(e)?(this.$el.children(".panel-heading").html(this._title=e),this):this._title},type:function(e){return t.defined(e)?(this.$el.removeClass(this._type).addClass(this._type=e),this):this._type}},{NAME:"Panel",TYPES:{standard:"panel-default",primary:"panel-primary",success:"panel-success",info:"panel-info",warning:"panel-warning",danger:"panel-danger"}}));return n}),define("ui/list/list-item",["ui/container"],function(e){var t=Spinal.namespace("com.spinal.ui.list.ListItem",e.inherit({className:"ui-list-item list-group-item",tagName:"li",initialize:function(e){return e||(e={}),t.__super__.initialize.apply(this,arguments),this}},{NAME:"ListItem"}));return t}),define("ui/list/list",["ui/container","ui/list/list-item"],function(e,t){var n=Spinal.namespace("com.spinal.ui.list.List",e.inherit({className:"ui-list list-group",tagName:"ul",initialize:function(e){return e||(e={}),e.interface=
t,n.__super__.initialize.apply(this,arguments),this._list(e.items,{silent:!0})},_list:function(e,t){return _.each(e,function(e){this.add(this.onItem(_.omit(e,"el")),t)},this),this},onItem:function(e){return{template:e.item}}},{NAME:"List"}));return n}),define("ui/table/table-element",["ui/container"],function(e){var t=Spinal.namespace("com.spinal.ui.table.TableElement",e.inherit({className:"ui-table-",tagName:"",_t:"",constructor:function(e){e||(e={}),e.el||(this._t=e.t?e.t:t.TYPES.row,this.tagName=this._t),this.className=e.el?"":this.className+this._t,t.__super__.constructor.apply(this,arguments)},initialize:function(e){return e||(e={}),t.__super__.initialize.apply(this,arguments),this}},{NAME:"TableElement",TYPES:{head:"th",row:"td",column:"tr"}}));return t}),define("ui/table/table",["ui/container","ui/table/table-element","util/string"],function(e,t,n){var r=Spinal.namespace("com.spinal.ui.table.Table",e.inherit({className:"ui-table table",tagName:"table",header:null,footer:null,_thead
:null,_tbody:null,_tfoot:null,initialize:function(e){return e||(e={}),e.interface=t,_.extend(this,n.toPrivate(_.pick(e,"thead","tbody","tfoot"))),r.__super__.initialize.apply(this,arguments),this._head()._body()._foot()},_create:function(e){return Spinal.tpl("spinal.table.t",{_$:{t:e,cls:"ui-table-"+e}})},_head:function(){if(!this._thead||this._thead.length===0)return"";var e=this.add({t:r.SECTIONS.head,"interface":t},{silent:!0});return this._content(this._thead,e,t.TYPES.head,"_col")},_body:function(){if(!this._tbody||this._tbody.length===0)return"";var e=this.add({t:r.SECTIONS.body,"interface":t},{silent:!0});return this._content(this._tbody,e,t.TYPES.row,"_col")},_foot:function(){if(!this._tfoot||this._tfoot.length===0)return"";var e=this.add({t:r.SECTIONS.foot,"interface":t},{silent:!0});return this._content(this._tfoot,e,t.TYPES.row,"_col")},_content:function(e,t,n,r){return _.each(e,_.bind(this[r],this,n,t,{silent:!0})),this},_col:function(e,n,r,i){var s=_.omit(i,"rows","el","t")
,o=this._create(t.TYPES.column),u=n.add(_.extend({el:$(o),"interface":t},this.onColumn(s)),r);this._content(i.rows,u,e,"_row")},_row:function(e,n,r,i){var s=this._create(e);n.add(_.extend({el:$(s),"interface":t},this.onRow(i)),r)},onColumn:function(e){return e},onRow:function(e){return{template:e}}},{NAME:"Table",SECTIONS:{head:"thead",body:"tbody",foot:"tfoot"}}));return r}),define("ui/form/form",["ui/container"],function(e){var t=Spinal.namespace("com.spinal.ui.form.Form",View.inherit({className:"ui-form",tagName:"form",_action:"#",_method:"",_enctype:"",_validator:null,initialize:function(e){return e||(e={}),_.extend(this,StringUtil.toPrivate(_.pick(e,"action","method","enctype","validator"))),t.__super__.initialize.apply(this,arguments),this},validate:function(){return this._validator?this._validator.validate():!0},render:function(e){return t.__super__.render.apply(this,arguments),this}},{NAME:"UIForm",EVENTS:{validate:"com:spinal:ui:form:validate"}}));return t}),define("ui/form/controls/fieldset"
,["ui/container"],function(e){var t=Spinal.namespace("com.spinal.ui.form.controls.Fieldset",e.inherit({className:"ui-fieldset",tagName:"fieldset",initialize:function(e){return e||(e={}),t.__super__.initialize.apply(this,arguments),this}},{NAME:"UIFieldset"}));return t}),define("ui/form/controls/button",["ui/view","util/string"],function(e,t){var n=Spinal.namespace("com.spinal.ui.form.controls.Button",e.inherit({events:{click:"_onClick"},className:"ui-button btn",tagName:"button",_text:"default",_type:null,initialize:function(e){return e||(e={}),e.text&&(this._text=e.text),this._type=e.type?e.type:n.TYPES.standard,n.__super__.initialize.apply(this,arguments),this},render:function(e){return n.__super__.render.apply(this,arguments),this.text(this._text),this.type(this._type),this},text:function(e){return t.defined(e)?(this.$el.html(this._text=e),this):this._text},type:function(e){return t.defined(e)?(this.$el.removeClass(this._type).addClass(this._type=e),this):this._type},_onClick:function(
e){this.trigger(n.EVENTS.clicked,this)}},{NAME:"UIButton",EVENTS:{clicked:"com:spinal:ui:view:form:controls:button:clicked"},TYPES:{standard:"btn-default",primary:"btn-primary",success:"btn-success",info:"btn-info",warning:"btn-warning",danger:"btn-danger",link:"btn-link"}}));return n}),define("ui/form/controls/input",["ui/view","util/string"],function(e,t){var n=Spinal.namespace("com.spinal.ui.form.controls.Input",e.inherit({className:"ui-input form-control",tagName:"input",_value:"",_type:"text",_name:null,_placeholder:null,initialize:function(e){return e||(e={}),this._type&&this.$el.attr("type",this._type),_.extend(this,t.toPrivate(_.pick(e,"name","value","placeholder"))),n.__super__.initialize.apply(this,arguments),this},render:function(e){return n.__super__.render.apply(this,arguments),this.name(this._name),this.placeholder(this._placeholder),this.value(this._value),this},name:function(e){return t.defined(e)?(this.$el.attr("name",this._name=e),this):this._name},value:function(e){return t
.defined(e)?(this.$el.val(this._value=e),this):this._value},placeholder:function(e){return t.defined(e)?(this.$el.attr("placeholder",this._placeholder=e),this):this._placeholder}},{NAME:"UIInput",EVENTS:{keyup:"com:spinal:ui:view:keyup",keydown:"com:spinal:ui:view:keydown",focus:"com:spinal:ui:view:focus",blur:"com:spinal:ui:view:blur"},TYPES:{text:"text",radio:"radio",checkbox:"checkbox",password:"password",hidden:"hidden",number:"number",date:"date"}}));return n}),define("ui/form/controls/checkbox",["ui/form/controls/input","util/string"],function(e,t){var n=Spinal.namespace("com.spinal.ui.form.controls.Checkbox",e.inherit({className:"ui-checkbox",_type:e.TYPES.checkbox,_value:!1,initialize:function(e){return e||(e={}),delete e.placeholder,n.__super__.initialize.apply(this,arguments),this},render:function(e){return n.__super__.render.apply(this,arguments),this.value(this._value),this},value:function(e){return t.defined(e)?(this.$el.prop("checked",this._value=e),this):this._value}},{NAME
:"UICheckbox"}));return n}),define("ui/form/controls/textarea",["ui/form/controls/input"],function(e){var t=Spinal.namespace("com.spinal.ui.form.controls.Textarea",e.inherit({className:"ui-textarea",tagName:"textarea",initialize:function(e){return delete this._type,t.__super__.initialize.apply(this,arguments),this},render:function(e){return t.__super__.render.apply(this,arguments),this}},{NAME:"UITextarea"}));return t}),define("ui/form/controls/option",["ui/view","util/string"],function(e,t){var n=Spinal.namespace("com.spinal.ui.form.controls.Option",e.inherit({className:"ui-option",tagName:"option",_value:"",_text:null,initialize:function(e){return e||(e={}),e.value&&(this._value=e.value),e.text&&(this._text=e.text),n.__super__.initialize.apply(this,arguments),this},render:function(e){return n.__super__.render.apply(this,arguments),this.value(this._value),this.text(this._text),this},text:function(e){return t.defined(e)?(this.$el.html(this._text=e),this):this._text},value:function(e){return t
.defined(e)?(this.$el.val(this._value=e),this):this._value},toString:function(){return"[object Option]"}},{NAME:"UIOption"}));return n}),define("ui/form/controls/select",["ui/container","ui/form/controls/option","util/string"],function(e,t,n){var r=Spinal.namespace("com.spinal.ui.form.controls.Select",e.inherit({className:"ui-select",tagName:"select",_name:null,initialize:function(e){return e||(e={}),e.interface=t,e.options&&e.options.length>0&&(e.views=e.options,delete e.options),r.__super__.initialize.apply(this,arguments),this},render:function(e){return r.__super__.render.apply(this,arguments),this.name(this._name),this},name:function(e){return n.defined(e)?(this.$el.attr("name",this._name=e),this):this._name}},{NAME:"UISelect",EVENTS:{changed:"com:spinal:ui:view:form:controls:select:changed"}}));return r}),define("spinal-ui",["ui/view","ui/container","ui/basic/paragraph","ui/basic/link","ui/basic/header","ui/basic/label","ui/basic/span","ui/basic/image","ui/misc/panel","ui/list/list"
,"ui/list/list-item","ui/table/table","ui/table/table-element","ui/form/form","ui/form/controls/fieldset","ui/form/controls/button","ui/form/controls/input","ui/form/controls/checkbox","ui/form/controls/textarea","ui/form/controls/select","ui/form/controls/option"],function(){});