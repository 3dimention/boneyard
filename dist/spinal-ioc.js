//	SpinalJS Ioc@0.1.0 (c) 2015 Patricio Ferreira <3dimentionar@gmail.com>, 3dimention.com
//	SpinalJS may be freely distributed under the MIT license.
//	For all details and documentation: http://3dimention.github.io/spinal
define("ioc/engine/helpers/dependency",["util/exception/ioc/dependency","util/object"],function(e,t){var n=Spinal.namespace("com.spinal.ioc.engine.helpers.Dependency",Spinal.SpinalClass.inherit({initialize:function(e){return e||(e={}),this.valid(e),n.__super__.initialize.apply(this,arguments),_.extend(this,e,{resolved:!1})},valid:function(n){if(!_.defined(n.target)||!t.isRealObject(n.target)&&!_.isArray(n.target))throw new e("TargetRequired");if(!_.defined(n.property))throw new e("PropertyRequired");if(!n.target[n.property])throw new e("UndefinedTargetProperty");if(!n.bone)throw new e("UndefinedBoneReference")},getEngine:function(){return this.bone.getEngine()},resolve:function(e){return this.isResolved()?this:this.canResolve()?e.inject(this):e.hold(this)},canResolve:function(){var e=this.getCompound();if(_.isObject(e))return!0;var t=this.getEngine().bone(e);return _.defined(t)&&(!t.isModule()||t.isCreated())},get:function(){if(!(m=this.getCompound()))return null;var e=this.getEngine().
bone(_.isObject(m)?m.id:m);return e&&_.isObject(m)?e.bone()[m.method]:e.bone()},getId:function(){var e=this.getExpression(),t=this.bone.getBoneExpression(),n=e.indexOf(t);return n===0?e.substring(n+t.length,e.length):null},getCompound:function(){if(!(id=this.getId()))return null;var e=id.split(".");return e.length===2?{id:e[0],method:e[1]}:id},getExpression:function(){return this.expression},getTarget:function(){return this.target},getProperty:function(){return this.property},isResolved:function(){return this.resolved}},{NAME:"Dependency"}));return n}),define("ioc/engine/helpers/injector",["ioc/engine/helpers/dependency","util/adt/collection"],function(e,t){var n=Spinal.namespace("com.spinal.ioc.engine.helpers.Injector",Spinal.SpinalClass.inherit({initialize:function(r){return r.proxify(this,"get"),this.dependencies=new t(this.get().retrieve(),{"interface":e}),n.__super__.initialize.apply(this,arguments)},getFactory:function(){return this.get().getEngine().getFactory()},getDependencies:
function(){return this.dependencies},create:function(e,t){var n=this.get();return n.isModule()&&(n._$created=this.getFactory().create(e,t)),this},resolve:function(){return this.getDependencies().invoke("resolve",this)},inject:function(e){return e.getTarget()[e.getProperty()]=e.get(),this.resolved(e)},hold:function(e){return e.hold=_.bind(this.inject,this,e),e},resolved:function(e){return _.defined(e.hold)&&delete e.hold,e.resolved=!0,e}},{NAME:"Injector"}));return n}),define("ioc/engine/annotation/annotation",["ioc/engine/helpers/injector","util/object"],function(e,t){var n=Spinal.namespace("com.spinal.ioc.engine.annotation.Annotation",Spinal.SpinalClass.inherit({initialize:function(t){return this.valid(t),_.extend(this,{_id:_.keys(t)[0],_value:_.values(t)[0]}),this.injector=new e(this),n.__super__.initialize.apply(this,arguments)},getEngine:function(){return n.engine?n.engine:n.engine=require("ioc/context").engine},get:function(){return this},getId:function(){return this._id},getValue:
function(){return this._value},getInjector:function(){return this.injector},getDependencies:function(){return this.getInjector().getDependencies()},hasDependencies:function(){return!this.getDependencies().isEmpty()},valid:function(e){if(!_.defined(e))throw new Error("Annotation cannot be undefined");if(!_.isObject(e))throw new Error("Annotation type must be an object")},getBoneExpression:function(){return n.PREFIX+n.TYPE+n.DELIMITER},isBone:function(e){return e.indexOf(this.getBoneExpression())===0},createDependency:function(e,t,r){return!n.isExpressionValid(e)||!this.isBone(e)||!r?null:{expression:e,target:r,property:t,bone:this}},retrieve:function(e){return e=e?e:this.getValue(),_.compact(_.flatten(_.map(e,function(e,n,r){return(t.isRealObject(e)||_.isArray(e))&&!t.isBackbone(e)?this.retrieve(e):this.createDependency.apply(this,arguments)},this)))}},{NAME:"Annotation",PREFIX:"$",TYPE:"bone",DELIMITER:"!",isExpressionValid:function(e){return _.defined(e)&&_.isString(e)&&e.indexOf(n.PREFIX
)===0}}));return n}),define("ioc/engine/annotation/bone",["ioc/engine/annotation/annotation","util/object"],function(e,t){var n=Spinal.namespace("com.spinal.ioc.engine.annotation.Bone",e.inherit({initialize:function(e){return n.__super__.initialize.apply(this,arguments)},getPath:function(){return this.isModule()?this.getValue().$module:null},getParams:function(){return t.isRealObject(this.getValue())?this.getValue().$params:this.getValue()},bone:function(){return this.isModule()&&this.isCreated()?this._$created:this.getValue()},retrieve:function(e){return n.__super__.retrieve.call(this,_.defined(e)?e:this.getParams())},isModule:function(){return!t.isBackbone(this.getValue())&&_.defined(this.getValue().$module)},isCreated:function(){return _.defined(this._$created)}},{NAME:"Bone",only:function(t){return _.pick(t,function(t,n){return n.indexOf(e.PREFIX)===-1})}}));return n}),define("ioc/engine/annotation/action",["ioc/engine/annotation/annotation","ioc/engine/helpers/dependency"],function(
e,t){var n=Spinal.namespace("com.spinal.ioc.engine.annotation.Action",e.inherit({_target:null,_context:null,initialize:function(e){return n.__super__.initialize.apply(this,arguments),this._target=new t({expression:this.getId(),target:this,property:"_id",bone:this}),this},getTarget:function(){return this._target},getContext:function(){return this._context},resolve:function(){return this._context=this.getEngine().bone(this.getTarget().getCompound().id).bone(),this.getInjector().inject(this.getTarget()),this},parameters:function(){return this.getInjector().resolve(),this.getValue()},execute:function(){return this.getContext()&&this.getId().apply(this.getContext(),this.parameters()),this.executed=!0,this},isExecuted:function(){return _.defined(this.executed)&&this.executed}},{NAME:"Action",only:function(e){return _.pick(e,"$actions")}}));return n}),define("ioc/engine/helpers/spec",["ioc/engine/annotation/bone","ioc/engine/annotation/action","util/adt/collection","util/string","util/object"]
,function(e,t,n,r,i){var s=Spinal.namespace("com.spinal.ioc.engine.annotation.Spec",Spinal.SpinalClass.inherit({bones:null,actions:null,initialize:function(i){return s.__super__.initialize.apply(this,arguments),this.valid(i),_.extend(this,r.toPrivate(s.only(i))),this.bones=new n(null,{"interface":e}),this.actions=new n(null,{"interface":t}),this.parse(i)},valid:function(e){if(!_.defined(e))throw new Error("Spec attributes cannot be null or undefined");if(!_.defined(e.$id)||e.$id==="")throw new Error("Spec Annotation $id cannot be null or empty");if(_.defined(e.$specs)&&!_.isArray(e.$specs))throw new Error("Spec $specs annotation must be an array")},getId:function(){return this._$id},getSpecs:function(){return this._$specs},parse:function(n){return this.bones.set(i.objToArr(e.only(n)),{silent:!0}),this.actions.set(t.only(n).$actions,{silent:!0}),this},getBone:function(e){var t=this.bones.find(function(t){return t.getId()===e});return t?t.get():null},getBonesBy:function(e){return this.bones
.findBy(function(t){return e(t.get())})},getBonesByClass:function(e){return this.getBonesBy(function(t){return t.bone()instanceof e})},getBonesByType:function(e){return this.getBonesBy(function(t){return Object.prototype.toString.call(t.bone()).indexOf(e)!==-1})},hasSpecs:function(){return this.getSpecs()&&this.getSpecs().length>0}},{NAME:"Spec",only:function(e){return _.pick(e,"$id","$specs")}}));return s}),define("ioc/engine/annotation/plugin",["ioc/engine/annotation/annotation"],function(e){var t=Spinal.namespace("com.spinal.ioc.engine.annotation.Plugin",e.inherit({initialize:function(e){return t.__super__.initialize.apply(this,arguments)},create:function(e){return this.getInjector().create(e,{engine:this.getEngine(),config:this.getValue()}),this},resolve:function(){return this.getInjector().resolve(),this},run:function(){return this.isCreated()&&this._$created.run(),this},isModule:function(){return!0},isCreated:function(){return _.defined(this._$created)}},{NAME:"Plugin",only:function(
e){return e.$plugins?e.$plugins:{}}}));return t}),define("ioc/engine/engine",["ioc/engine/helpers/spec","ioc/engine/annotation/plugin","util/adt/collection","util/factories/async-factory","util/adt/iterator","util/object"],function(e,t,n,r,i,s){var o=Spinal.namespace("com.spinal.ioc.engine.Engine",Spinal.SpinalClass.inherit({specs:new n(null,{"interface":e}),plugins:new n(null,{"interface":t}),factory:null,processors:null,initialize:function(){return this.factory=new r,this.processors=new i,this.wire=_.wrap(this.wire,this.setup),this.unwire=_.wrap(this.unwire,this.setup),o.__super__.initialize.apply(this,arguments)},getFactory:function(){return this.factory},setup:function(e,t,n,r){return this.processors.isEmpty()?(this.getFactory().set(o.PROCESSORS).load(_.bind(this.ready,this,e,t,n,r)),this):(e.call(this,t,n,r),this)},ready:function(e,t,n,r){return this.processors.set(o.PROCESSORS),this.trigger(o.EVENTS.ready,this),t?e.call(this,t,n,r):this.done(n,r),this},execute:function(e,t,n){if(!
this.processors.hasNext())return this.done(e,t,n);var r=this.getFactory().create(this.processors.next().path,this);return r.once(r.constructor.EVENTS.done,_.bind(this.execute,this,e,t,n)).execute(),this},wire:function(e,t,n){return this.addSpec(e),this.execute(t,n,o.EVENTS.wire)},unwire:function(e,t,n){return this.trigger(o.EVENTS.unwire,this.removeSpec(e))},done:function(e,t,n){return this.processors.rewind(),e&&_.isFunction(e)&&e(t),this.trigger(n,this.specs)},extractPlugins:function(e){var n=s.objToArr(t.only(e));return n.length>0&&this.plugins.set(n),e},exists:function(e,t){return e.$id===t._$id},addSpec:function(e,t){if(this.specs.containsBy(this.exists,e))return[];var n=this.specs.add(this.extractPlugins(e),{silent:!0}),t=t?t:[];return t.push(n),n.hasSpecs()&&_.flatten(_.map(n.getSpecs(),function(e){return this.addSpec(e,t)},this)),t},removeSpec:function(e,t){if(!this.specs.containsBy(this.exists,e))return[];var n=this.specs.removeBy(_.bind(this.exists,this,e),{silent:!0})[0],t=t?
t:[];return t.push(n),n.hasSpecs()&&_.flatten(_.map(n.getSpecs(),function(e){return this.removeSpec(e,t)},this)),t},spec:function(e){return this.specs.find(function(t){return t.getId()===e})},allSpecs:function(){return this.specs.collection},allBones:function(){return _.flatten(_.map(_.pluck(this.allSpecs(),"bones"),function(e){return e.collection}))},allActions:function(){return _.flatten(_.map(_.pluck(this.allSpecs(),"actions"),function(e){return e.collection}))},bone:function(e){var t=_.find(this.allBones(),function(t){return t.getId()===e},this);return t?t:null},bonesByType:function(e){return _.flatten(_.map(this.allSpecs(),function(t){return t.getBonesByType(e)}))},bonesByClass:function(e){return _.flatten(_.map(this.allSpecs(),function(t){return t.getBonesByClass(e)}))}},{NAME:"Engine",EVENTS:{wire:"com:spinal:ioc:engine:spec:wire",unwire:"com:spinal:ioc:engine:spec:unwire",plugin:"com:spinal:ioc:engine:plugin",action:"com:spinal:ioc:engine:action"},PROCESSORS:[{path:"ioc/processor/create"
},{path:"ioc/processor/action"},{path:"ioc/processor/plugin"}]}));return o}),define("ioc/context",["ioc/engine/engine"],function(e){var t=Spinal.namespace("com.spinal.ioc.Context",Spinal.SpinalClass.inherit({initialize:function(){return this.api(),this.listenTo(this.getEngine(),e.EVENTS.ready,this.onStart),this.listenTo(this.getEngine(),e.EVENTS.wire,this.onWire),this.listenTo(this.getEngine(),e.EVENTS.unwire,this.onUnwire),this.listenTo(this.getEngine(),e.EVENTS.plugin,this.onPlugin),t.__super__.initialize.apply(this,arguments)},api:function(){return this.getEngine().proxify(this,"spec","allSpecs","allBones","allActions","bone","bonesByType","bonesByClass"),this},getEngine:function(){return t.engine},wire:function(e,t){return this.getEngine().wire(e,t,this),this},unwire:function(e,t){return this.getEngine().unwire(e,t,this),this},onStart:function(e){return this.trigger(t.EVENTS.start,this)},onWire:function(n){return this.trigger(t.EVENTS.complete,this,e.EVENTS.wire,n)},onUnwire:function(
n){return this.trigger(t.EVENTS.complete,this,e.EVENTS.unwire,n)},onPlugin:function(){var e=_.toArray(arguments);return e.unshift(t.EVENTS.plugin,this),this.trigger.apply(this,e)}},{NAME:"Context",EVENTS:{start:"com:spinal:ioc:context:start",complete:"com:spinal:ioc:context:complete",plugin:"com:spinal:ioc:context:plugin"},LazyLoad:function(e){var n=$("script[data-spec]").data("spec");return n&&require([n],function(n){Spinal.app=(new t).wire(n,e)}),t}}));return t.engine=new e,t}),define("ioc/engine/helpers/tsort",["core/spinal"],function(e){var t=e.namespace("com.spinal.ioc.engine.helpers.TSort",e.SpinalClass.inherit({nodes:null,initialize:function(){return this.reset(),t.__super__.initialize.apply(this,arguments)},reset:function(){return this.nodes={},this},onAdd:function(e){e.forEach(function(e){if(!this.nodes[e])return this.nodes[e]=[]},this)},add:function(e){this.onAdd(e);for(var t=1;t<e.length;t++)this.nodes[e[t]].push(e[t-1]);return this},sort:function(){var e=[],t={};return _.each
(this.nodes,function(n,r){t[r]||this.visit(e,t,r)},this),e.reverse()},visit:function(e,n,r){if(n[r]===t.TYPE.VOLATILE)throw new Error("Circular dependency detected. It's not possible to derive a topological sort.");if(n[r])return;return n[r]=t.TYPE.VOLATILE,this.nodes[r].forEach(_.bind(this.visit,this,e,n)),n[r]=t.TYPE.PERMANENT,e.push(r)}},{NAME:"TSort",TYPE:{VOLATILE:"volatile",PERMANENT:"permanent"}}));return t}),define("ioc/processor/processor",["ioc/engine/engine","util/exception/ioc/processor"],function(e,t){var n=Spinal.namespace("com.spinal.ioc.processor.Processor",Spinal.SpinalClass.inherit({initialize:function(r){if(!!r&&r instanceof e)return this.engine=r,n.__super__.initialize.apply(this,arguments);throw new t("EngineRequired")},getEngine:function(){return this.engine},getFactory:function(){return this.getEngine().getFactory()},getSpecs:function(){return this.getEngine().specs},execute:function(e,t){return!t||!_.isFunction(t)?e:_.map(e,function(e){return t.call(this,e)},this
)},done:function(e){return this.trigger(n.EVENTS.done,e)}},{NAME:"Processor",EVENTS:{done:"com:spinal:ioc:processor:done"}}));return n}),define("ioc/processor/plugin",["ioc/processor/processor"],function(e){var t=Spinal.namespace("com.spinal.ioc.processor.PluginProcessor",e.inherit({defaultPath:"ioc/plugins/",initialize:function(){return t.__super__.initialize.apply(this,arguments)},enqueue:function(e){return this.getFactory().push({path:this.defaultPath+e.getId(),callback:_.bind(this.onLoad,this,e)}),this},onLoad:function(e,t){return e.create(t).run(),this},process:function(e){return this.enqueue(e.resolve())},execute:function(){return t.__super__.execute.call(this,this.getEngine().plugins.collection,this.process),this.getFactory().load(_.bind(this.done,this,t.NAME)),this},done:function(e){return t.__super__.done.call(this,e)}},{NAME:"PluginProcessor"}));return t}),define("ioc/processor/create",["ioc/processor/processor","ioc/engine/helpers/tsort"],function(e,t){var n=Spinal.namespace("com.spinal.ioc.processor.CreateProcessor"
,e.inherit({graph:null,initialize:function(){return this.graph=new t,n.__super__.initialize.apply(this,arguments)},enqueue:function(e){return this.getFactory().push({path:e.getPath(),callback:_.bind(this.onLoad,this,e)}),this},onLoad:function(e){return e.getInjector().resolve(),this},tsort:function(){return this.graph.reset(),this.bones().forEach(_.bind(this.dependencies,this)),this.graph.sort()},dependencies:function(e){return this.graph.add([e.getId()].concat(e.getDependencies().invoke("getId")))},process:function(e){return e.isModule()?this.enqueue(e):e.getInjector().resolve(),this},bones:function(){return _.filter(this.getEngine().allBones(),function(e){return!e.isCreated()})},execute:function(){return n.__super__.execute.call(this,this.bones(),this.process),this.getFactory().load(_.bind(this.done,this,n.NAME)),this},resolve:function(){return this.tsort().forEach(_.bind(function(e){var t=this.getEngine().bone(e),n=t.getInjector();n.resolve(this.getFactory()),n.create(t.getPath(),t.getParams
())},this)),this},done:function(e){return this.resolve(),n.__super__.done.apply(this,arguments)}},{NAME:"CreateProcessor"}));return n}),define("ioc/processor/action",["ioc/processor/processor"],function(e){var t=Spinal.namespace("com.spinal.ioc.processor.ActionProcessor",e.inherit({initialize:function(){return t.__super__.initialize.apply(this,arguments)},sort:function(e,t){return e.getId().indexOf("listenTo")!==-1||t.getId().indexOf("listenTo")!==-1?-1:0},process:function(e){return e.resolve().execute()},actions:function(){return _.filter(this.getEngine().allActions(),function(e){return!e.isExecuted()})},execute:function(){var e=this.actions().sort(this.sort);return t.__super__.execute.call(this,e,this.process),t.__super__.done.apply(this,[t.NAME])}},{NAME:"ActionProcessor"}));return t}),define("ioc/plugins/plugin",["core/spinal","ioc/engine/engine","util/object","util/string"],function(e,t,n,r){var i=e.namespace("com.spinal.ioc.plugins.IoCPlugin",e.SpinalClass.inherit({_engine:null,_config
:null,initialize:function(e){return e||(e={}),this.valid(e),this._engine=e.engine,this._config=n.search("config.config",e),this.parse(_.omit(e.config,"config")),i.__super__.initialize.apply(this,arguments)},getEngine:function(){return this._engine},getConfig:function(){return this._config},getFactory:function(){return this.getEngine().getFactory()},valid:function(e){if(!!e.engine&&e.engine instanceof t)return!0;throw new Error("IoCPlugin requires an instance of a com.spinal.ioc.engine.Engine in order to work.")},resolveURI:function(e){var t=_.compact(this.getConfig().basePath.split("/").concat(e.split("/"))).join("/");return t.indexOf("!")!==-1?(t=t.split("!"),t[0]+"!"+requirejs.toUrl(t[1])):requirejs.toUrl(t)},parse:function(e){return this},run:function(){return this},proxifyToCore:function(){var t=_.toArray(arguments);return t.unshift(e),this.proxify.apply(this,t)}},{NAME:"IoCPlugin"}));return i}),define("ioc/plugins/html",["ioc/plugins/plugin","ioc/engine/engine","util/adt/collection"
,"util/object"],function(e,t,n,r){var i=Spinal.namespace("com.spinal.ioc.plugins.HTMLPlugin",e.inherit({packages:null,initialize:function(){return this.packages=new n,i.__super__.initialize.apply(this,arguments)},parse:function(e){return this.packages.set(_.map(e,function(e,t){return _.extend(e,{name:t})}),{silent:!0}),i.__super__.parse.apply(this,arguments)},validate:function(e){if(!_.defined(e)||!_.isArray(e)||!_.every(e))return!1;var t=_.every(e,function(e){var t=this.getPackage(e);return _.defined(t)?this.isRegistered(t)?!1:!0:!1},this);return t},getPackage:function(e){return this.packages.find(function(t){return t.name===e},this)},isRegistered:function(e){return this.getFactory().isRegistered(this.getConfig().basePath+e.path)},getLazyPackages:function(){return _.compact(this.packages.map(function(e){return e.lazyload?e.name:null}))},getPackageFullPath:function(e){return this.resolveURI(e.path)},parsePackage:function(e){var t=this.getPackage(e);return{path:this.getPackageFullPath(t)
,callback:_.bind(this.onLoad,this,t)}},lazy:function(){return this.load(this.getLazyPackages())},load:function(e,t){return this.validate(e)?(this.getFactory().set(_.map(e,this.parsePackage,this)).load(_.bind(this.onLoadComplete,this,t,e)),this):this},onLoad:function(e,t,n){return Spinal.namespace("__html__."+e.name,JSON.parse(n)),this},onLoadComplete:function(e,n){return e&&_.isFunction(e)&&e(n),this.getEngine().trigger(t.EVENTS.plugin,i.EVENTS.load,n),this},query:function(e){return!e||e===""?null:r.search(e,Spinal.__html__)},html:function(e,t){return t||(t={}),(tpl=this.query(e))?_.template(tpl)(t).replace(/\n+/g,"").replace(/\t+/g,""):""},run:function(){return this.proxifyToCore("load","html").lazy(),i.__super__.run.apply(this,arguments)}},{NAME:"HTMLPlugin",EVENTS:{load:"com:spinal:ioc:engine:plugin:html:load"}}));return Spinal.namespace("__html__.tag",'<<%= obj.tagName %><%= (obj.id) ? " id=\\"" + obj.id + "\\"" : "" %><%= (obj.cls) ? " class=\\"" + obj.cls + "\\"" : "" %><% if(obj.attrs) { for(var p in obj.attrs) { %><%= (" " + p + "=\\"" + obj.attrs[p] + "\\"") %><% } } %>><%= (obj.content) ? obj.content : "" %></<%= obj.tagName %>>'
),i}),define("ioc/plugins/theme",["ioc/plugins/plugin","util/adt/collection"],function(e,t){var n=Spinal.namespace("com.spinal.ioc.plugins.ThemePlugin",e.inherit({themes:null,theme:null,$header:null,bootstrap:{core:{name:"bootstrap-core",path:"bootstrap/css/bootstrap.min.css"},theme:{name:"bootstrap-theme",path:"bootstrap/css/bootstrap-theme.min.css"}},initialize:function(){return this.themes=new t,this.$header=$("head"),n.__super__.initialize.apply(this,arguments)},parse:function(e){return this.themes.set(_.map(e,function(e,t){return _.extend(e,{name:t})}),{silent:!0}),n.__super__.parse.apply(this,arguments)},currentTheme:function(){return this.theme},useBootstrap:function(){return this.getConfig().bootstrap&&this.applyTheme(this.bootstrap.core),this.getConfig().bootstrap&&this.getConfig().defaultTheme&&this.applyTheme(this.bootstrap.theme),this},useDefault:function(){var e=this.themes.find(function(e){return e.default});return this.changeTheme(e.name)},validate:function(e){return _.isString
(e)?this.getTheme(e)?this.theme&&this.theme.name===e?!1:!0:!1:!1},applyTheme:function(e){return this.$header.append(n.LINK({theme:e.name,href:this.resolveURI(e.path)})),this},removeTheme:function(){return this.$header.children('link[theme][theme!="bootstrap-core"][theme!="bootstrap-theme"]').remove(),this},getTheme:function(e){return this.themes.find(function(t){return t.name===e})},changeTheme:function(e){return e||(e=""),this.validate(e)?(this.theme=this.getTheme(e),this.removeTheme().applyTheme(this.theme),this):this},run:function(){return this.proxifyToCore("changeTheme","removeTheme","currentTheme").useBootstrap().useDefault(),n.__super__.run.apply(this,arguments)}},{NAME:"ThemePlugin",LINK:_.template('<link rel="stylesheet" href="<%= href %>" theme="<%= theme %>" />')}));return n}),define("spinal-ioc",["ioc/context","ioc/engine/engine","ioc/engine/helpers/injector","ioc/engine/helpers/dependency","ioc/engine/helpers/spec","ioc/engine/helpers/tsort","ioc/engine/annotation/annotation"
,"ioc/engine/annotation/bone","ioc/engine/annotation/action","ioc/engine/annotation/plugin","ioc/processor/processor","ioc/processor/plugin","ioc/processor/create","ioc/processor/action","ioc/plugins/html","ioc/plugins/theme"],function(){});