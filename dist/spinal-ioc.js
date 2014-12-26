//	SpinalJS Ioc@0.0.1 (c) 2014 Patricio Ferreira <3dimentionar@gmail.com>, 3dimention.com
//	SpinalJS may be freely distributed under the MIT license.
//	For all details and documentation: http://3dimention.github.io/spinal
define("ioc/engine",["ioc/context","util/adt/collection","util/exception/context"],function(e,t,n){var r=Spinal.namespace("com.spinal.ioc.Engine",Spinal.SpinalClass.inherit({root:{},specs:null,factory:null,annotations:{_id:"id",_specs:"specs",_ready:"ready",_plugins:"plugins"},initialize:function(e){if(!e)throw new n("FactoryNotDeclared",{clazz:r.NAME});return this.factory=e,this.specs=new t([]),_.each(this.annotations,function(e,t){this["__"+e]=r.PREFIX+e},this),this},_valid:function(e){if(!_.isObject(e))throw new n("InvalidSpecFormat");if(!e[this.__id])throw new n("SpecIdRequired")},_addSpec:function(e){_.extend(this.root,_.omit(e,this.__id,this.__specs,this.__ready)),this.specs.add(e[this.__id])&&e[this.__ready]&&(_.isUndefined(this.root[this.__ready])&&(this.root[this.__ready]=[]),this.root[this.__ready]=_.union(this.root[this.__ready],e[this.__ready]))},build:function(e){return this._valid(e),this.specs.contains(e[this.__id])||this._addSpec(e),e[this.__specs]&&this.invoke("build",e
[this.__specs]),this},ready:function(){return this.root.$ready&&_.isArray(this.root.$ready)&&_.every(_.pluck(this.root.$ready,"_$ready"))},plugin:function(){return this.root.$plugins},getBonesBy:function(e){return this.root?_.compact(_.map(this.root,function(t,n){return e(t,n)?this.getBone(n):null},this)):[]},getBone:function(e){return this.root&&this.root[e]?this.isCreated(this.root[e])?this.root[e]._$created:this.root[e]:null},getBonesByClass:function(e){return this.getBonesBy(_.bind(function(t,n){return this.isModule(t)&&this.isCreated(t)&&t._$created.constructor.NAME===e},this))},getBonesByType:function(e){return this.getBonesBy(_.bind(function(t,n){return this.isModule(t)&&this.isCreated(t)?this.getBone(n)instanceof e:t instanceof e},this))},isModule:function(e){return e&&e.$module},isCreated:function(e){return e&&e._$created}},{NAME:"Engine",PREFIX:"$",EVENTS:{proxified:"com:spinal:ioc:engine:proxified",plugin:"com:spinal:ioc:engine:plugin-notification"}}));return r}),define("ioc/processor/bone"
,["core/spinal","ioc/engine","util/exception/context","util/exception/processor"],function(e,t,n,r){var i=e.namespace("com.spinal.ioc.processor.BoneProcessor",e.SpinalClass.inherit({_engine:null,annotations:{_b:"bone!",_r:"bone-ref!",_d:"!"},initialize:function(e){if(!e)throw new n("EngineNotDeclared");return this._engine=e,this},_root:function(){return this._engine.root},validate:function(e){if(!e||!_.isString(e))return!1;var n=t.PREFIX+e;return n.indexOf(this.annotations._b)!==-1||n.indexOf(this.annotations._r)!==-1},isDependencyRef:function(e){return e?(t.PREFIX+e).indexOf(this.annotations._r)!==-1:!1},isModuleDependency:function(e){return!e||!_.isString(e)?!1:this._engine.isModule(this.getDependency(e).bone)},getDependencyId:function(e,t){if(!e||!_.isString(e))return null;var n=e.indexOf(t&&t!==""?t:this.annotations._d);return n>0?e.substring(n+1,e.length):null},getDependency:function(e,t){var n=this.getComplexDependency(e,t);return n?{bone:this._engine.getBone(n.id),method:n.method
}:null},getComplexDependency:function(e,t){var n=this.getDependencyId.apply(this,arguments),r=null;return n?(r=n.split(".")).length>1?{id:r[0],method:r[1]}:{id:n}:null},execute:function(e,t){if(!e||!_.isFunction(e))return!1;var n=[],r=t?t:this._root();for(var i in r){var s=e.call(this,r[i],i,t?r:null);if(!s)break;n.push(s)}return _.compact(_.flatten(n))}},{NAME:"BoneProcessor",EVENTS:{processed:"com:spinal:ioc:processor:processed"}}));return i}),define("ioc/context",["core/spinal","util/string","util/adt/iterator","util/factories/async-factory","util/exception/context","ioc/processor/bone","ioc/engine"],function(e,t,n,r,i,s,o){var u=e.namespace("com.spinal.ioc.Context",e.SpinalClass.inherit({id:t.uuid(),engine:null,factory:null,processors:new n([{id:"PluginProcessor",path:"ioc/processor/plugin"},{id:"CreateProcessor",path:"ioc/processor/create"},{id:"ReadyProcessor",path:"ioc/processor/ready"}]),initialize:function(){return this.factory=new r,this.engine=new o(this.factory),this.engine.
proxify(this,"getBone","getBonesByType","getBonesByClass"),this.listenTo(this.engine,o.EVENTS.proxified,_.bind(this.proxify,this)),this.listenTo(this.engine,o.EVENTS.plugin,_.bind(this.notify,this,o.EVENTS.plugin)),this},_loadProcessors:function(e){return this.processors.rewind(),this.factory.getFactory("CreateProcesor")?this._onProcessorsLoaded(e):this.factory.set(this.processors.collection).load(_.bind(this._onProcessorsLoaded,this,e)),this},_onProcessorsLoaded:function(e){while(this.processors.hasNext()){var t=this.processors.next();t.module=this.bonefactory("create",t.id,this.engine),t.module.once(s.EVENTS.processed,_.bind(this._next,this,t.module,e))}return this.processors.rewind()&&this._next()},_next:function(e,t){return e&&this.notify(u.EVENTS.processorCompleted,null,e),this.processors.hasNext()?this.processors.next().module.execute():this.notify(u.EVENTS.initialized,t,this)},bonefactory:function(e){if(!e)return null;var t=Array.prototype.slice.call(arguments,1);return this.factory
[e]?this.factory[e].apply(this.factory,t):null},wire:function(e,t){if(!e)return t(this),this;if(!_.isObject(e))throw new i("InvalidSpecFormat");return this.engine.build(e),this._loadProcessors(t)},notify:function(e,t){var n=Array.prototype.slice.call(arguments,2);t&&_.isFunction(t)&&t.apply(t,n),e&&_.isString(e)&&(n.unshift(e),this.trigger.apply(this,n))}},{NAME:"Context",EVENTS:{initialized:"com:spinal:ioc:context:initialized",processorCompleted:"com:spinal:ioc:context:processor:completed"},Initialize:function(e,t){return arguments.length===1&&_.isFunction(e)?(new u).wire(null,e):(new u).wire(e,t)},LazyLoad:function(e,t){require([e],t)}})),a=$("script[data-spec]").data("spec");return a&&u.LazyLoad(a,function(t){e.app=u.Initialize(t)}),u}),define("ioc/processor/plugin",["ioc/context","ioc/processor/bone","util/exception/processor"],function(e,t,n){var r=Spinal.namespace("com.spinal.ioc.processor.PluginProcessor",t.inherit({defaultPath:"ioc/plugins/",initialize:function(){return r.__super__
.initialize.apply(this,arguments)},_enqueue:function(e,t){return this._engine.factory.push({id:e,path:this.defaultPath+e,callback:t}),this},_create:function(e,t){return this._engine.factory.create(t,e?e:{},this._engine).execute()},process:function(e){return _.map(e,function(e,t){return this._enqueue(t,_.bind(_.partial(this._create,e),this)),t},this)},execute:function(){var e=this._engine.plugin()?this.process(this._engine.root[this._engine.__plugins]):[];return this._engine.factory.load(_.bind(function(){delete this._engine.root[this._engine.__plugins],this.trigger(r.EVENTS.processed,{type:r.NAME,plugins:e})},this)),this}},{NAME:"PluginProcessor"}));return r}),define("ioc/processor/create",["ioc/context","ioc/engine","ioc/processor/bone","util/exception/processor"],function(e,t,n,r){var i=Spinal.namespace("com.spinal.ioc.processor.CreateProcessor",n.inherit({initialize:function(){return i.__super__.initialize.apply(this,arguments)},_root:function(){return _.omit(this._engine.root,function(
e,n){return n.indexOf(t.PREFIX)===0})},_enqueue:function(e,t,n){if(!(module=this._engine.getBone(e)))throw new r("BoneNotFound");return this._engine.factory.push({id:e,path:module.$module,callback:t}),this._sorting(e,module,n)},_sorting:function(e,t,n){if(n.length===0)return t;var r=_.map(n,function(e){return this._engine.factory.findPosById(e.id)},this);return this._engine.factory.swap(_.bind(function(t,n,r,i){return e===r.id&&i<=t?t:i},this,_.max(r),_.min(r))),t},_create:function(e,t,n){if(!t||!n)throw new r("CreateModuleException");return e&&e.length>0&&this._inject(t.$params,e),t._$created=this._engine.factory.create(n,t.$params)},_inject:function(e,t){_.each(t,function(t){e[t.property]=this._engine.getBone(t.id)},this)},_dependencies:function(e){return _.compact(_.map(e,function(e,t,n){if(_.isArray(e))return _.flatten(this._dependencies(e));if(!this._resolve(e,n,t))return{id:this.getDependencyId(e),property:t}},this))},_resolve:function(e,t,n){if(!e||!t)return null;if(!this.validate
(e))return n;if(!this.isModuleDependency(e))return t[n]=this.getDependency(e).bone},process:function(e,t,n){if(this._engine.isModule(e)){var r=this._dependencies(e.$params);return this._enqueue(t,_.bind(_.partial(this._create,r,e),this),r)}return _.isObject(e)||_.isArray(e)?i.__super__.execute.call(this,this.process,e,t):_.isNull(n)?e:this._resolve(e,n,t)},execute:function(){var e=i.__super__.execute.call(this,this.process);return this._engine.factory.load(_.bind(function(){this.trigger(i.EVENTS.processed,{type:i.NAME,bones:e})},this)),this}},{NAME:"CreateProcessor"}));return i}),define("ioc/processor/ready",["ioc/context","ioc/processor/bone","ioc/engine","util/string"],function(e,t,n,r){var i=Spinal.namespace("com.spinal.ioc.processor.ReadyProcessor",t.inherit({initialize:function(){return i.__super__.initialize.apply(this,arguments)},_inject:function(e){return!_.isArray(e)||!_.isObject(e)?e:_.map(e,function(e,t){return _.isArray(e)?_.flatten(this._inject(e)):this.validate(e)&&(d=this
.getDependency(e))?d.method?this.isDependencyRef(e)?d.bone[d.method]:d.bone[d.method]():d.bone:e},this)},_resolve:function(e,t){return _.compact(_.map(e,function(e,n){if(this.validate(e)&&(d=this.getDependency(e)))return d.method?d.bone[d.method].apply(d.bone,this._inject(t[n])):null},this))},process:function(e){return!e||e.length===0?[]:_.compact(_.map(e,function(e){return!_.isObject(e)||e._$ready?null:this._resolve(_.keys(e),_.values(e))&&(e._$ready=!0)},this))},execute:function(){var e=this._engine.ready()?[]:this.process(this._engine.root.$ready);return this.trigger(i.EVENTS.processed,{type:i.NAME,actions:e}),this}},{NAME:"ReadyProcessor"}));return i}),define("ioc/plugins/html",["core/spinal","ioc/engine","util/string"],function(e,t,n){var r=e.namespace("com.spinal.ioc.plugins.HTMLPlugin",e.SpinalClass.inherit({_engine:null,_config:null,initialize:function(e,t){return this._engine=t,this._config=_.isEmpty(e)?{}:e,this},_query:function(t){return n.search(t,e.html)},_lazy:function(){return this
._load(_.pick(this._config,function(e){return e.lazyLoading&&!e._loaded}))},_load:function(e,t){return require(_.pluck(e,"path"),_.bind(this._onTemplatesLoaded,this,_.values(e),t)),this},_onTemplatesLoaded:function(e,n){return _.each(e,function(e){e._loaded=!0}),this._engine.trigger(t.EVENTS.plugin,n,e),this},isTemplateLoaded:function(e){return _.has(this._config,e)&&this._config[e]._loaded},loadTemplate:function(e,t){if(!e||!_.isString(e))return this;var n=_.pick(this._config,function(t,n){return n===e&&!t._loaded?t:null});return n?this._load(n,t):this},tpl:function(e,t){t||(t={});if(!e||e==="")return"";var n=(n=this._query(e))?_.isString(n)?_.template(unescape(n)):n:null;return(n?n(t):"").replace(/\n+/g,"").replace(/\t+/g,"")},execute:function(){return this.proxify(e,"loadTemplate","isTemplateLoaded","tpl"),this._lazy()}},{NAME:"HTMLPlugin"}));return e.namespace("html.tag",'<<%= _$.tagName %><%= (_$.id) ? " id=\\"" + _$.id + "\\"" : "" %><%= (_$.cls) ? " class=\\"" + _$.cls + "\\"" : "" %><% if(_$.attrs) { for(var p in _$.attrs) { %><%= (" " + p + "=\\"" + _$.attrs[p] + "\\"") %><% } } %>></<%= _$.tagName %>>'
),r}),define("ioc/plugins/theme",["ioc/engine","util/adt/collection"],function(e,t){var n=Spinal.namespace("com.spinal.ioc.plugins.ThemePlugin",Spinal.SpinalClass.inherit({themes:null,_config:null,_engine:null,_$header:null,_link:_.template('<link rel="stylesheet" href="<%= href %>" theme="<%= theme %>" />'),_bootstrap:{core:"bootstrap/css/bootstrap.min.css",theme:"bootstrap/css/bootstrap-theme.min.css"},initialize:function(e,t){if(!e||!e.config||!e.config.basePath)throw new PluginException("ConfigNotSpecified");return this.themes=_.omit(e,"config"),this._config=e.config,this._engine=t,this._$header=$("head"),this._useDefault()},_useDefault:function(){if(this._config.bootstrap){var e=this._link({theme:"bootstrap",href:this._resolveURI({path:this._bootstrap.core})})+this._link({theme:"bootstrap-theme",href:this._resolveURI({path:this._bootstrap.theme})});this._$header.append(e)}return this},_resolveURI:function(e){return e.url?e.url:requirejs.toUrl(this._config.basePath+e.path)},findTheme
:function(e){var t=_.find(this.themes,function(t,n){return!e&&t._default&&(e=n)||e===n});return t?{name:e,config:t}:this.currentTheme()},process:function(){var e=this.currentTheme();return e?(this.resetTheme(!0),this._$header.append(this._link({theme:e.name,href:this._resolveURI(e.config)})),this):this},currentTheme:function(){return this.theme},changeTheme:function(e){return this.theme=this.findTheme(e),this.process()},resetTheme:function(e){var t='link[theme][theme!="bootstrap"][theme!="bootstrap-theme"]',n=this._$header.children(t);return n.length>0&&n.remove(),e||(this.theme=null),this},execute:function(){return _.isEmpty(this.themes)||(this.changeTheme(),this.proxify(Spinal,"changeTheme","currentTheme","resetTheme")),this}},{NAME:"ThemePlugin"}));return n}),define("spinal-ioc",["ioc/context","ioc/engine","ioc/processor/bone","ioc/processor/plugin","ioc/processor/create","ioc/processor/ready","ioc/plugins/html","ioc/plugins/theme"],function(){});