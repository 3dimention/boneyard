//	SpinalJS Core@0.1.0 (c) 2015 Patricio Ferreira <3dimentionar@gmail.com>, 3dimention.com
//	SpinalJS may be freely distributed under the MIT license.
//	For all details and documentation: http://3dimention.github.io/spinal
var requirejs,require,define;(function(global){function isFunction(e){return ostring.call(e)==="[object Function]"}function isArray(e){return ostring.call(e)==="[object Array]"}function each(e,t){if(e){var n;for(n=0;n<e.length;n+=1)if(e[n]&&t(e[n],n,e))break}}function eachReverse(e,t){if(e){var n;for(n=e.length-1;n>-1;n-=1)if(e[n]&&t(e[n],n,e))break}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var n;for(n in e)if(hasProp(e,n)&&t(e[n],n))break}function mixin(e,t,n,r){return t&&eachProp(t,function(t,i){if(n||!hasProp(e,i))r&&typeof t=="object"&&t&&!isArray(t)&&!isFunction(t)&&!(t instanceof RegExp)?(e[i]||(e[i]={}),mixin(e[i],t,n,r)):e[i]=t}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError
(e,t,n,r){var i=new Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return i.requireType=e,i.requireModules=r,n&&(i.originalError=n),i}function newContext(e){function t(e){var t,n,r=e.length;for(t=0;t<r;t++){n=e[t];if(n===".")e.splice(t,1),t-=1;else if(n===".."){if(t===1&&(e[2]===".."||e[0]===".."))break;t>0&&(e.splice(t-1,2),t-=2)}}}function n(e,n,r){var i,s,o,u,a,f,l,c,h,p,d,v=n&&n.split("/"),m=v,g=x.map,y=g&&g["*"];e&&e.charAt(0)==="."&&(n?(m=v.slice(0,v.length-1),e=e.split("/"),l=e.length-1,x.nodeIdCompat&&jsSuffixRegExp.test(e[l])&&(e[l]=e[l].replace(jsSuffixRegExp,"")),e=m.concat(e),t(e),e=e.join("/")):e.indexOf("./")===0&&(e=e.substring(2)));if(r&&g&&(v||y)){o=e.split("/");e:for(u=o.length;u>0;u-=1){f=o.slice(0,u).join("/");if(v)for(a=v.length;a>0;a-=1){s=getOwn(g,v.slice(0,a).join("/"));if(s){s=getOwn(s,f);if(s){c=s,h=u;break e}}}!p&&y&&getOwn(y,f)&&(p=getOwn(y,f),d=u)}!c&&p&&(c=p,h=d),c&&(o.splice(0,h,c),e=o.join("/"))}return i=getOwn(x.pkgs,e),i?i:e}function r(e){isBrowser&&
each(scripts(),function(t){if(t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===w.contextName)return t.parentNode.removeChild(t),!0})}function i(e){var t=getOwn(x.paths,e);if(t&&isArray(t)&&t.length>1)return t.shift(),w.require.undef(e),w.require([e]),!0}function s(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function o(e,t,r,i){var o,u,a,f,l=null,c=t?t.name:null,h=e,p=!0,d="";return e||(p=!1,e="_@r"+(M+=1)),f=s(e),l=f[0],e=f[1],l&&(l=n(l,c,i),u=getOwn(L,l)),e&&(l?u&&u.normalize?d=u.normalize(e,function(e){return n(e,c,i)}):d=n(e,c,i):(d=n(e,c,i),f=s(d),l=f[0],d=f[1],r=!0,o=w.nameToUrl(d))),a=l&&!u&&!r?"_unnormalized"+(_+=1):"",{prefix:l,name:d,parentMap:t,unnormalized:!!a,url:o,originalName:h,isDefine:p,id:(l?l+"!"+d:d)+a}}function u(e){var t=e.id,n=getOwn(T,t);return n||(n=T[t]=new w.Module(e)),n}function a(e,t,n){var r=e.id,i=getOwn(T,r);hasProp(L,r)&&(!i||i.defineEmitComplete)?t==="defined"&&n(L[r]
):(i=u(e),i.error&&t==="error"?n(i.error):i.on(t,n))}function f(e,t){var n=e.requireModules,r=!1;t?t(e):(each(n,function(t){var n=getOwn(T,t);n&&(n.error=e,n.events.error&&(r=!0,n.emit("error",e)))}),r||req.onError(e))}function l(){globalDefQueue.length&&(apsp.apply(k,[k.length,0].concat(globalDefQueue)),globalDefQueue=[])}function c(e){delete T[e],delete N[e]}function h(e,t,n){var r=e.map.id;e.error?e.emit("error",e.error):(t[r]=!0,each(e.depMaps,function(r,i){var s=r.id,o=getOwn(T,s);o&&!e.depMatched[i]&&!n[s]&&(getOwn(t,s)?(e.defineDep(i,L[s]),e.check()):h(o,t,n))}),n[r]=!0)}function p(){var e,t,n=x.waitSeconds*1e3,s=n&&w.startTime+n<(new Date).getTime(),o=[],u=[],a=!1,l=!0;if(y)return;y=!0,eachProp(N,function(e){var n=e.map,f=n.id;if(!e.enabled)return;n.isDefine||u.push(e);if(!e.error)if(!e.inited&&s)i(f)?(t=!0,a=!0):(o.push(f),r(f));else if(!e.inited&&e.fetched&&n.isDefine){a=!0;if(!n.prefix)return l=!1}});if(s&&o.length)return e=makeError("timeout","Load timeout for modules: "+o,null
,o),e.contextName=w.contextName,f(e);l&&each(u,function(e){h(e,{},{})}),(!s||t)&&a&&(isBrowser||isWebWorker)&&!S&&(S=setTimeout(function(){S=0,p()},50)),y=!1}function d(e){hasProp(L,e[0])||u(o(e[0],null,!0)).init(e[1],e[2])}function v(e,t,n,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(n,t,!1)}function m(e){var t=e.currentTarget||e.srcElement;return v(t,w.onScriptLoad,"load","onreadystatechange"),v(t,w.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function g(){var e;l();while(k.length){e=k.shift();if(e[0]===null)return f(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));d(e)}}var y,b,w,E,S,x={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},T={},N={},C={},k=[],L={},A={},O={},M=1,_=1;return E={require:function(e){return e.require?e.require:e.require=w.makeRequire(e.map)},exports:function(e){e.usingExports=!0;if(e.map.isDefine)return e.exports?L[e.map.id]=e.exports:e.exports=L[e.map.
id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(x.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},b=function(e){this.events=getOwn(C,e.id)||{},this.map=e,this.shim=getOwn(x.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(e,t,n,r){r=r||{};if(this.inited)return;this.factory=t,n?this.on("error",n):this.events.error&&(n=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=n,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check()},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(this.fetched)return;this.fetched=!0,w.startTime=(new Date).getTime();var e=this.map;if(!this.shim)return e.prefix?this.callPlugin():this.load();w.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(
this,function(){return e.prefix?this.callPlugin():this.load()}))},load:function(){var e=this.map.url;A[e]||(A[e]=!0,w.load(this.map.id,e))},check:function(){if(!this.enabled||this.enabling)return;var e,t,n=this.map.id,r=this.depExports,i=this.exports,s=this.factory;if(!this.inited)this.fetch();else if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0;if(this.depCount<1&&!this.defined){if(isFunction(s)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{i=w.execCb(n,s,r,i)}catch(o){e=o}else i=w.execCb(n,s,r,i);this.map.isDefine&&i===undefined&&(t=this.module,t?i=t.exports:this.usingExports&&(i=this.exports));if(e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",f(this.error=e)}else i=s;this.exports=i,this.map.isDefine&&!this.ignore&&(L[n]=i,req.onResourceLoad&&req.onResourceLoad(w,this.map,this.depMaps)),c(n),this.defined=!0}this.defining=!1,this.defined&&!
this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}},callPlugin:function(){var e=this.map,t=e.id,r=o(e.prefix);this.depMaps.push(r),a(r,"defined",bind(this,function(r){var i,s,l,h=getOwn(O,this.map.id),p=this.map.name,d=this.map.parentMap?this.map.parentMap.name:null,v=w.makeRequire(e.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){r.normalize&&(p=r.normalize(p,function(e){return n(e,d,!0)})||""),s=o(e.prefix+"!"+p,this.map.parentMap),a(s,"defined",bind(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),l=getOwn(T,s.id),l&&(this.depMaps.push(s),this.events.error&&l.on("error",bind(this,function(e){this.emit("error",e)})),l.enable());return}if(h){this.map.url=w.nameToUrl(h),this.load();return}i=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),i.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(T,function(e){e.map.id.indexOf(t+"_unnormalized"
)===0&&c(e.map.id)}),f(e)}),i.fromText=bind(this,function(n,r){var s=e.name,a=o(s),l=useInteractive;r&&(n=r),l&&(useInteractive=!1),u(a),hasProp(x.config,t)&&(x.config[s]=x.config[t]);try{req.exec(n)}catch(c){return f(makeError("fromtexteval","fromText eval for "+t+" failed: "+c,c,[t]))}l&&(useInteractive=!0),this.depMaps.push(a),w.completeLoad(s),v([s],i)}),r.load(e.name,v,i,x)})),w.enable(r,this),this.pluginMaps[r.id]=r},enable:function(){N[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var n,r,i;if(typeof e=="string"){e=o(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,i=getOwn(E,e.id);if(i){this.depExports[t]=i(this);return}this.depCount+=1,a(e,"defined",bind(this,function(e){this.defineDep(t,e),this.check()})),this.errback&&a(e,"error",bind(this,this.errback))}n=e.id,r=T[n],!hasProp(E,n)&&r&&!r.enabled&&w.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(T,e.id);t&&!t.enabled&&
w.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var n=this.events[e];n||(n=this.events[e]=[]),n.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),e==="error"&&delete this.events[e]}},w={config:x,contextName:e,registry:T,defined:L,urlFetched:A,defQueue:k,Module:b,makeModuleMap:o,nextTick:req.nextTick,onError:f,configure:function(e){e.baseUrl&&e.baseUrl.charAt(e.baseUrl.length-1)!=="/"&&(e.baseUrl+="/");var t=x.shim,n={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){n[t]?(x[t]||(x[t]={}),mixin(x[t],e,!0,!0)):x[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(O[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,n){isArray(e)&&(e={deps:e}),(e.exports||e.init)&&!e.exportsFn&&(e.exportsFn=w.makeShimExports(e)),t[n]=e}),x.shim=t),e.packages&&each(e.packages,function(e){var t,n;e=typeof e=="string"?{name:e}:e,n=e.name,t=e.location,t&&(x.paths[n]=e.location),x.pkgs[n]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"")
.replace(jsSuffixRegExp,"")}),eachProp(T,function(e,t){!e.inited&&!e.map.unnormalized&&(e.map=o(t))}),(e.deps||e.callback)&&w.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,i){function s(n,r,a){var l,c,h;return i.enableBuildCallback&&r&&isFunction(r)&&(r.__requireJsBuild=!0),typeof n=="string"?isFunction(r)?f(makeError("requireargs","Invalid require call"),a):t&&hasProp(E,n)?E[n](T[t.id]):req.get?req.get(w,n,t,s):(c=o(n,t,!1,!0),l=c.id,hasProp(L,l)?L[l]:f(makeError("notloaded",'Module name "'+l+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(g(),w.nextTick(function(){g(),h=u(o(null,t)),h.skipMap=i.skipMap,h.init(n,r,a,{enabled:!0}),p()}),s)}return i=i||{},mixin(s,{isBrowser:isBrowser,toUrl:function(e){var r,i=e.lastIndexOf("."),s=e.split("/")[0],o=s==="."||s==="..";return i!==-1&&(!o||i>1)&&(r=e.substring(i,e.length
),e=e.substring(0,i)),w.nameToUrl(n(e,t&&t.id,!0),r,!0)},defined:function(e){return hasProp(L,o(e,t,!1,!0).id)},specified:function(e){return e=o(e,t,!1,!0).id,hasProp(L,e)||hasProp(T,e)}}),t||(s.undef=function(e){l();var n=o(e,t,!0),i=getOwn(T,e);r(e),delete L[e],delete A[n.url],delete C[e],eachReverse(k,function(t,n){t[0]===e&&k.splice(n,1)}),i&&(i.events.defined&&(C[e]=i.events),c(e))}),s},enable:function(e){var t=getOwn(T,e.id);t&&u(e).enable()},completeLoad:function(e){var t,n,r,s=getOwn(x.shim,e)||{},o=s.exports;l();while(k.length){n=k.shift();if(n[0]===null){n[0]=e;if(t)break;t=!0}else n[0]===e&&(t=!0);d(n)}r=getOwn(T,e);if(!t&&!hasProp(L,e)&&r&&!r.inited){if(x.enforceDefine&&(!o||!getGlobal(o))){if(i(e))return;return f(makeError("nodefine","No define call for "+e,null,[e]))}d([e,s.deps||[],s.exportsFn])}p()},nameToUrl:function(e,t,n){var r,i,s,o,u,a,f,l=getOwn(x.pkgs,e);l&&(e=l),f=getOwn(O,e);if(f)return w.nameToUrl(f,t,n);if(req.jsExtRegExp.test(e))u=e+(t||"");else{r=x.paths,i=e
.split("/");for(s=i.length;s>0;s-=1){o=i.slice(0,s).join("/"),a=getOwn(r,o);if(a){isArray(a)&&(a=a[0]),i.splice(0,s,a);break}}u=i.join("/"),u+=t||(/^data\:|\?/.test(u)||n?"":".js"),u=(u.charAt(0)==="/"||u.match(/^[\w\+\.\-]+:/)?"":x.baseUrl)+u}return x.urlArgs?u+((u.indexOf("?")===-1?"?":"&")+x.urlArgs):u},load:function(e,t){req.load(w,e,t)},execCb:function(e,t,n,r){return t.apply(r,n)},onScriptLoad:function(e){if(e.type==="load"||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=m(e);w.completeLoad(t.id)}},onScriptError:function(e){var t=m(e);if(!i(t.id))return f(makeError("scripterror","Script error for: "+t.id,e,[t.id]))}},w.require=w.makeRequire(),w}function getInteractiveScript(){return interactiveScript&&interactiveScript.readyState==="interactive"?interactiveScript:(eachReverse(scripts(),function(e){if(e.readyState==="interactive")return interactiveScript=e}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript
,mainScript,subPath,version="2.1.11",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=typeof window!="undefined"&&typeof navigator!="undefined"&&!!window.document,isWebWorker=!isBrowser&&typeof importScripts!="undefined",readyRegExp=isBrowser&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera=typeof opera!="undefined"&&opera.toString()==="[object Opera]",contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(typeof define!="undefined")return;if(typeof requirejs!="undefined"){if(isFunction(requirejs))return;cfg=requirejs,requirejs=undefined}typeof require!="undefined"&&!isFunction(require)&&(cfg=require,require=undefined),req=requirejs=function(e,t,n,r){var i,s,o=defContextName;return!isArray(e)&&typeof e!="string"&&
(s=e,isArray(t)?(e=t,t=n,n=r):e=[]),s&&s.context&&(o=s.context),i=getOwn(contexts,o),i||(i=contexts[o]=req.s.newContext(o)),s&&i.configure(s),i.require(e,t,n)},req.config=function(e){return req(e)},req.nextTick=typeof setTimeout!="undefined"?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e,t,n){var r=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return r.type=e.scriptType||"text/javascript",r.charset="utf-8"
,r.async=!0,r},req.load=function(e,t,n){var r=e&&e.config||{},i;if(isBrowser)return i=req.createNode(r,t,n),i.setAttribute("data-requirecontext",e.contextName),i.setAttribute("data-requiremodule",t),i.attachEvent&&!(i.attachEvent.toString&&i.attachEvent.toString().indexOf("[native code")<0)&&!isOpera?(useInteractive=!0,i.attachEvent("onreadystatechange",e.onScriptLoad)):(i.addEventListener("load",e.onScriptLoad,!1),i.addEventListener("error",e.onScriptError,!1)),i.src=n,currentlyAddingScript=i,baseElement?head.insertBefore(i,baseElement):head.appendChild(i),currentlyAddingScript=null,i;if(isWebWorker)try{importScripts(n),e.completeLoad(t)}catch(s){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+n,s,[t]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){head||(head=e.parentNode),dataMain=e.getAttribute("data-main");if(dataMain)return mainScript=dataMain,cfg.baseUrl||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/"
:"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),define=function(e,t,n){var r,i;typeof e!="string"&&(n=t,t=e,e=null),isArray(t)||(n=t,t=null),!t&&isFunction(n)&&(t=[],n.length&&(n.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(e,n){t.push(n)}),t=(n.length===1?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript(),r&&(e||(e=r.getAttribute("data-requiremodule")),i=contexts[r.getAttribute("data-requirecontext")])),(i?i.defQueue:globalDefQueue).push([e,t,n])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)})(this),define("libs/require",function(){}),requirejs.config({bundles:{libs:["libs/backbone","libs/bootstrap","libs/jquery","libs/modernizr","libs/require","libs/underscore"],"spinal-core":["core/spinal"],"spinal-ioc":["ioc/context"
,"ioc/engine","ioc/plugins/html","ioc/plugins/theme","ioc/processor/bone","ioc/processor/create","ioc/processor/plugin","ioc/processor/ready"],"spinal-ui":["ui/basic/header","ui/basic/image","ui/basic/label","ui/basic/link","ui/basic/paragraph","ui/basic/span","ui/container","ui/form/controls/button","ui/form/controls/checkbox","ui/form/controls/fieldset","ui/form/controls/hidden","ui/form/controls/input","ui/form/controls/option","ui/form/controls/password","ui/form/controls/radio","ui/form/controls/select","ui/form/controls/textarea","ui/form/form","ui/list/list-item","ui/list/list","ui/misc/affix","ui/misc/autocomplete","ui/misc/dialog","ui/misc/dropdown","ui/misc/panel","ui/table/table-element","ui/table/table","ui/view"],"spinal-util":["util/adt/collection","util/adt/iterator","util/adt/queue","util/adt/stack","util/exception/context","util/exception/exception","util/exception/factory","util/exception/plugin","util/exception/processor","util/exception/ui","util/factories/async-factory"
,"util/factories/factory","util/http/ajax-http","util/schema","util/string"]}}),define("core/spinal",["libs/backbone"],function(){return function(e){var t=e.Spinal={};t.__VERSION__="0.1.0";var n=t.namespace=function(e,n){if(!e||!_.isString(e)||!n)throw new Error("Spinal.namespace requires a namespace (in dot notation) and a function (or object)");var r=e.split("."),i=t,s,o,u=r.length;for(var a=0;a<u;a++)s=i,o=r[a],i=i[o]?i[o]:i[o]={};return n?s[o]=n:i},r=function(e){return e&&e.document&&e.location&&e.alert&&e.setInterval},i=function(){function e(){}return typeof Object.create=="function"?Object.create:function(t){return e.prototype=t,new e}}(),s=function(e,t,n){if(r(e))throw new Error("Making copies of Window or Scope instances is not supported.");if(!t)t=e,e&&(_.isArray(e)?t=s(e,[]):_.isDate(e)?t=new Date(e.getTime()):_.isRegExp(e)?t=new RegExp(e.source):_.isObject(e)&&!_.isFunction(e)&&(n?(e=_.omit(e,_.keys(n)),t=_.extend(n,s(e,i(Object.getPrototypeOf(e))))):t=s(e,i(Object
.getPrototypeOf(e)))));else{if(e===t)throw new Error("Can't copy! Source and destination are identical.");if(_.isArray(e)){t.length=0;for(var o=0;o<e.length;o++)t.push(s(e[o]))}else for(var u in e)t.hasOwnProperty(u)?_.isObject(e[u])&&!_.isDate(e[u])&&!_.isRegExp(e[u])&&!_.isFunction(e[u])&&!_.isArray(e[u])&&(t[u]=s(e[u],null,t[u])):t[u]=s(e[u])}return t},o=t.extend=function(e){var t=Array.prototype.slice.call(arguments,1);for(var n=0;n<t.length;n++)t[n]&&s(t[n],e);return e},u=t._inherit=function(e,t){t||(t={});var n=this;Child=e&&_.has(e,"constructor")?e.constructor:function(){return n.apply(this,arguments)};var r=function(){this.constructor=Child};return r.prototype=n.prototype,Child.prototype=new r,e&&(o(Child.prototype,e),o(Child,t,_.omit(n,"inherit","__super__"))),Child.inherit=u,Child.__super__=n.prototype,Child};Backbone&&(Backbone.View.inherit=Backbone.Collection.inherit=Backbone.Model.inherit=Backbone.Router.inherit=u);var a=t.SpinalClass=n("com.spinal.core.SpinalClass",function(
){this.initialize.apply(this,arguments)});return o(a.prototype,Backbone.Events,{initialize:function(){return this},invoke:function(e,t){return!e||!t||!_.isString(e)||!_.isArray(t)?[]:_.map(t,function(t){return this[e]?this[e](t):null},this)},proxify:function(e){if(!e)return this;var t=Array.prototype.slice.call(arguments,1);return _.each(t,function(t){e[t]=_.isFunction(this[t])?_.bind(this[t],this):this[t]},this),this},toJSON:function(){return JSON.parse(JSON.stringify(_.omit(this,_.functions(this))))},toString:function(){return"[object "+(this.constructor.NAME?this.constructor.NAME:"SpinalClass")+"]"}}),a.inherit=u,a.NAME="SpinalClass",_.mixin({defined:function(e){return!_.isNull(e)&&!_.isUndefined(e)}}),t}(window)}),define("spinal-core",["libs/require","core/spinal"],function(){});