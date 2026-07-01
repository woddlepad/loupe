var M1=Object.create;var Qd=Object.defineProperty;var E1=Object.getOwnPropertyDescriptor;var D1=Object.getOwnPropertyNames;var T1=Object.getPrototypeOf,P1=Object.prototype.hasOwnProperty;var ga=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ph=(e,t)=>{for(var a in t)Qd(e,a,{get:t[a],enumerable:!0})},O1=(e,t,a,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of D1(t))!P1.call(e,r)&&r!==a&&Qd(e,r,{get:()=>t[r],enumerable:!(o=E1(t,r))||o.enumerable});return e};var A=(e,t,a)=>(a=e!=null?M1(T1(e)):{},O1(t||!e||!e.__esModule?Qd(a,"default",{value:e,enumerable:!0}):a,e));var Xh=ga(De=>{"use strict";function rf(e,t){var a=e.length;e.push(t);e:for(;0<a;){var o=a-1>>>1,r=e[o];if(0<is(r,t))e[o]=t,e[a]=r,a=o;else break e}}function xa(e){return e.length===0?null:e[0]}function us(e){if(e.length===0)return null;var t=e[0],a=e.pop();if(a!==t){e[0]=a;e:for(var o=0,r=e.length,l=r>>>1;o<l;){var n=2*(o+1)-1,i=e[n],s=n+1,u=e[s];if(0>is(i,a))s<r&&0>is(u,i)?(e[o]=u,e[s]=a,o=s):(e[o]=i,e[n]=a,o=n);else if(s<r&&0>is(u,a))e[o]=u,e[s]=a,o=s;else break e}}return t}function is(e,t){var a=e.sortIndex-t.sortIndex;return a!==0?a:e.id-t.id}De.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Nh=performance,De.unstable_now=function(){return Nh.now()}):(tf=Date,Uh=tf.now(),De.unstable_now=function(){return tf.now()-Uh});var Nh,tf,Uh,Oa=[],fo=[],B1=1,Gt=null,dt=3,lf=!1,un=!1,dn=!1,nf=!1,_h=typeof setTimeout=="function"?setTimeout:null,Hh=typeof clearTimeout=="function"?clearTimeout:null,zh=typeof setImmediate<"u"?setImmediate:null;function ss(e){for(var t=xa(fo);t!==null;){if(t.callback===null)us(fo);else if(t.startTime<=e)us(fo),t.sortIndex=t.expirationTime,rf(Oa,t);else break;t=xa(fo)}}function sf(e){if(dn=!1,ss(e),!un)if(xa(Oa)!==null)un=!0,Gr||(Gr=!0,qr());else{var t=xa(fo);t!==null&&uf(sf,t.startTime-e)}}var Gr=!1,fn=-1,qh=5,Gh=-1;function Vh(){return nf?!0:!(De.unstable_now()-Gh<qh)}function af(){if(nf=!1,Gr){var e=De.unstable_now();Gh=e;var t=!0;try{e:{un=!1,dn&&(dn=!1,Hh(fn),fn=-1),lf=!0;var a=dt;try{t:{for(ss(e),Gt=xa(Oa);Gt!==null&&!(Gt.expirationTime>e&&Vh());){var o=Gt.callback;if(typeof o=="function"){Gt.callback=null,dt=Gt.priorityLevel;var r=o(Gt.expirationTime<=e);if(e=De.unstable_now(),typeof r=="function"){Gt.callback=r,ss(e),t=!0;break t}Gt===xa(Oa)&&us(Oa),ss(e)}else us(Oa);Gt=xa(Oa)}if(Gt!==null)t=!0;else{var l=xa(fo);l!==null&&uf(sf,l.startTime-e),t=!1}}break e}finally{Gt=null,dt=a,lf=!1}t=void 0}}finally{t?qr():Gr=!1}}}var qr;typeof zh=="function"?qr=function(){zh(af)}:typeof MessageChannel<"u"?(of=new MessageChannel,Fh=of.port2,of.port1.onmessage=af,qr=function(){Fh.postMessage(null)}):qr=function(){_h(af,0)};var of,Fh;function uf(e,t){fn=_h(function(){e(De.unstable_now())},t)}De.unstable_IdlePriority=5;De.unstable_ImmediatePriority=1;De.unstable_LowPriority=4;De.unstable_NormalPriority=3;De.unstable_Profiling=null;De.unstable_UserBlockingPriority=2;De.unstable_cancelCallback=function(e){e.callback=null};De.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):qh=0<e?Math.floor(1e3/e):5};De.unstable_getCurrentPriorityLevel=function(){return dt};De.unstable_next=function(e){switch(dt){case 1:case 2:case 3:var t=3;break;default:t=dt}var a=dt;dt=t;try{return e()}finally{dt=a}};De.unstable_requestPaint=function(){nf=!0};De.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var a=dt;dt=e;try{return t()}finally{dt=a}};De.unstable_scheduleCallback=function(e,t,a){var o=De.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?o+a:o):a=o,e){case 1:var r=-1;break;case 2:r=250;break;case 5:r=1073741823;break;case 4:r=1e4;break;default:r=5e3}return r=a+r,e={id:B1++,callback:t,priorityLevel:e,startTime:a,expirationTime:r,sortIndex:-1},a>o?(e.sortIndex=a,rf(fo,e),xa(Oa)===null&&e===xa(fo)&&(dn?(Hh(fn),fn=-1):dn=!0,uf(sf,a-o))):(e.sortIndex=r,rf(Oa,e),un||lf||(un=!0,Gr||(Gr=!0,qr()))),e};De.unstable_shouldYield=Vh;De.unstable_wrapCallback=function(e){var t=dt;return function(){var a=dt;dt=t;try{return e.apply(this,arguments)}finally{dt=a}}}});var Kh=ga((h5,jh)=>{"use strict";jh.exports=Xh()});var rg=ga(Z=>{"use strict";var cf=Symbol.for("react.transitional.element"),N1=Symbol.for("react.portal"),U1=Symbol.for("react.fragment"),z1=Symbol.for("react.strict_mode"),F1=Symbol.for("react.profiler"),_1=Symbol.for("react.consumer"),H1=Symbol.for("react.context"),q1=Symbol.for("react.forward_ref"),G1=Symbol.for("react.suspense"),V1=Symbol.for("react.memo"),Jh=Symbol.for("react.lazy"),X1=Symbol.for("react.activity"),Wh=Symbol.iterator;function j1(e){return e===null||typeof e!="object"?null:(e=Wh&&e[Wh]||e["@@iterator"],typeof e=="function"?e:null)}var $h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},eg=Object.assign,tg={};function Xr(e,t,a){this.props=e,this.context=t,this.refs=tg,this.updater=a||$h}Xr.prototype.isReactComponent={};Xr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Xr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ag(){}ag.prototype=Xr.prototype;function pf(e,t,a){this.props=e,this.context=t,this.refs=tg,this.updater=a||$h}var mf=pf.prototype=new ag;mf.constructor=pf;eg(mf,Xr.prototype);mf.isPureReactComponent=!0;var Zh=Array.isArray;function ff(){}var Re={H:null,A:null,T:null,S:null},og=Object.prototype.hasOwnProperty;function hf(e,t,a){var o=a.ref;return{$$typeof:cf,type:e,key:t,ref:o!==void 0?o:null,props:a}}function K1(e,t){return hf(e.type,t,e.props)}function gf(e){return typeof e=="object"&&e!==null&&e.$$typeof===cf}function W1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(a){return t[a]})}var Yh=/\/+/g;function df(e,t){return typeof e=="object"&&e!==null&&e.key!=null?W1(""+e.key):t.toString(36)}function Z1(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(ff,ff):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Vr(e,t,a,o,r){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var n=!1;if(e===null)n=!0;else switch(l){case"bigint":case"string":case"number":n=!0;break;case"object":switch(e.$$typeof){case cf:case N1:n=!0;break;case Jh:return n=e._init,Vr(n(e._payload),t,a,o,r)}}if(n)return r=r(e),n=o===""?"."+df(e,0):o,Zh(r)?(a="",n!=null&&(a=n.replace(Yh,"$&/")+"/"),Vr(r,t,a,"",function(u){return u})):r!=null&&(gf(r)&&(r=K1(r,a+(r.key==null||e&&e.key===r.key?"":(""+r.key).replace(Yh,"$&/")+"/")+n)),t.push(r)),1;n=0;var i=o===""?".":o+":";if(Zh(e))for(var s=0;s<e.length;s++)o=e[s],l=i+df(o,s),n+=Vr(o,t,a,l,r);else if(s=j1(e),typeof s=="function")for(e=s.call(e),s=0;!(o=e.next()).done;)o=o.value,l=i+df(o,s++),n+=Vr(o,t,a,l,r);else if(l==="object"){if(typeof e.then=="function")return Vr(Z1(e),t,a,o,r);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return n}function ds(e,t,a){if(e==null)return e;var o=[],r=0;return Vr(e,o,"","",function(l){return t.call(a,l,r++)}),o}function Y1(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(a){(e._status===0||e._status===-1)&&(e._status=1,e._result=a)},function(a){(e._status===0||e._status===-1)&&(e._status=2,e._result=a)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Qh=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Q1={map:ds,forEach:function(e,t,a){ds(e,function(){t.apply(this,arguments)},a)},count:function(e){var t=0;return ds(e,function(){t++}),t},toArray:function(e){return ds(e,function(t){return t})||[]},only:function(e){if(!gf(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Z.Activity=X1;Z.Children=Q1;Z.Component=Xr;Z.Fragment=U1;Z.Profiler=F1;Z.PureComponent=pf;Z.StrictMode=z1;Z.Suspense=G1;Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Re;Z.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Re.H.useMemoCache(e)}};Z.cache=function(e){return function(){return e.apply(null,arguments)}};Z.cacheSignal=function(){return null};Z.cloneElement=function(e,t,a){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var o=eg({},e.props),r=e.key;if(t!=null)for(l in t.key!==void 0&&(r=""+t.key),t)!og.call(t,l)||l==="key"||l==="__self"||l==="__source"||l==="ref"&&t.ref===void 0||(o[l]=t[l]);var l=arguments.length-2;if(l===1)o.children=a;else if(1<l){for(var n=Array(l),i=0;i<l;i++)n[i]=arguments[i+2];o.children=n}return hf(e.type,r,o)};Z.createContext=function(e){return e={$$typeof:H1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:_1,_context:e},e};Z.createElement=function(e,t,a){var o,r={},l=null;if(t!=null)for(o in t.key!==void 0&&(l=""+t.key),t)og.call(t,o)&&o!=="key"&&o!=="__self"&&o!=="__source"&&(r[o]=t[o]);var n=arguments.length-2;if(n===1)r.children=a;else if(1<n){for(var i=Array(n),s=0;s<n;s++)i[s]=arguments[s+2];r.children=i}if(e&&e.defaultProps)for(o in n=e.defaultProps,n)r[o]===void 0&&(r[o]=n[o]);return hf(e,l,r)};Z.createRef=function(){return{current:null}};Z.forwardRef=function(e){return{$$typeof:q1,render:e}};Z.isValidElement=gf;Z.lazy=function(e){return{$$typeof:Jh,_payload:{_status:-1,_result:e},_init:Y1}};Z.memo=function(e,t){return{$$typeof:V1,type:e,compare:t===void 0?null:t}};Z.startTransition=function(e){var t=Re.T,a={};Re.T=a;try{var o=e(),r=Re.S;r!==null&&r(a,o),typeof o=="object"&&o!==null&&typeof o.then=="function"&&o.then(ff,Qh)}catch(l){Qh(l)}finally{t!==null&&a.types!==null&&(t.types=a.types),Re.T=t}};Z.unstable_useCacheRefresh=function(){return Re.H.useCacheRefresh()};Z.use=function(e){return Re.H.use(e)};Z.useActionState=function(e,t,a){return Re.H.useActionState(e,t,a)};Z.useCallback=function(e,t){return Re.H.useCallback(e,t)};Z.useContext=function(e){return Re.H.useContext(e)};Z.useDebugValue=function(){};Z.useDeferredValue=function(e,t){return Re.H.useDeferredValue(e,t)};Z.useEffect=function(e,t){return Re.H.useEffect(e,t)};Z.useEffectEvent=function(e){return Re.H.useEffectEvent(e)};Z.useId=function(){return Re.H.useId()};Z.useImperativeHandle=function(e,t,a){return Re.H.useImperativeHandle(e,t,a)};Z.useInsertionEffect=function(e,t){return Re.H.useInsertionEffect(e,t)};Z.useLayoutEffect=function(e,t){return Re.H.useLayoutEffect(e,t)};Z.useMemo=function(e,t){return Re.H.useMemo(e,t)};Z.useOptimistic=function(e,t){return Re.H.useOptimistic(e,t)};Z.useReducer=function(e,t,a){return Re.H.useReducer(e,t,a)};Z.useRef=function(e){return Re.H.useRef(e)};Z.useState=function(e){return Re.H.useState(e)};Z.useSyncExternalStore=function(e,t,a){return Re.H.useSyncExternalStore(e,t,a)};Z.useTransition=function(){return Re.H.useTransition()};Z.version="19.2.7"});var q=ga((x5,lg)=>{"use strict";lg.exports=rg()});var ig=ga(ht=>{"use strict";var J1=q();function ng(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function co(){}var mt={d:{f:co,r:function(){throw Error(ng(522))},D:co,C:co,L:co,m:co,X:co,S:co,M:co},p:0,findDOMNode:null},$1=Symbol.for("react.portal");function eL(e,t,a){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:$1,key:o==null?null:""+o,children:e,containerInfo:t,implementation:a}}var cn=J1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function fs(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}ht.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=mt;ht.createPortal=function(e,t){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(ng(299));return eL(e,t,null,a)};ht.flushSync=function(e){var t=cn.T,a=mt.p;try{if(cn.T=null,mt.p=2,e)return e()}finally{cn.T=t,mt.p=a,mt.d.f()}};ht.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,mt.d.C(e,t))};ht.prefetchDNS=function(e){typeof e=="string"&&mt.d.D(e)};ht.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var a=t.as,o=fs(a,t.crossOrigin),r=typeof t.integrity=="string"?t.integrity:void 0,l=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;a==="style"?mt.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:o,integrity:r,fetchPriority:l}):a==="script"&&mt.d.X(e,{crossOrigin:o,integrity:r,fetchPriority:l,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};ht.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var a=fs(t.as,t.crossOrigin);mt.d.M(e,{crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&mt.d.M(e)};ht.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var a=t.as,o=fs(a,t.crossOrigin);mt.d.L(e,a,{crossOrigin:o,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};ht.preloadModule=function(e,t){if(typeof e=="string")if(t){var a=fs(t.as,t.crossOrigin);mt.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else mt.d.m(e)};ht.requestFormReset=function(e){mt.d.r(e)};ht.unstable_batchedUpdates=function(e,t){return e(t)};ht.useFormState=function(e,t,a){return cn.H.useFormState(e,t,a)};ht.useFormStatus=function(){return cn.H.useHostTransitionStatus()};ht.version="19.2.7"});var jr=ga((b5,ug)=>{"use strict";function sg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sg)}catch(e){console.error(e)}}sg(),ug.exports=ig()});var w0=ga(Nu=>{"use strict";var je=Kh(),Bx=q(),tL=jr();function R(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Nx(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Jn(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function Ux(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function zx(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function dg(e){if(Jn(e)!==e)throw Error(R(188))}function aL(e){var t=e.alternate;if(!t){if(t=Jn(e),t===null)throw Error(R(188));return t!==e?null:e}for(var a=e,o=t;;){var r=a.return;if(r===null)break;var l=r.alternate;if(l===null){if(o=r.return,o!==null){a=o;continue}break}if(r.child===l.child){for(l=r.child;l;){if(l===a)return dg(r),e;if(l===o)return dg(r),t;l=l.sibling}throw Error(R(188))}if(a.return!==o.return)a=r,o=l;else{for(var n=!1,i=r.child;i;){if(i===a){n=!0,a=r,o=l;break}if(i===o){n=!0,o=r,a=l;break}i=i.sibling}if(!n){for(i=l.child;i;){if(i===a){n=!0,a=l,o=r;break}if(i===o){n=!0,o=l,a=r;break}i=i.sibling}if(!n)throw Error(R(189))}}if(a.alternate!==o)throw Error(R(190))}if(a.tag!==3)throw Error(R(188));return a.stateNode.current===a?e:t}function Fx(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Fx(e),t!==null)return t;e=e.sibling}return null}var Ae=Object.assign,oL=Symbol.for("react.element"),cs=Symbol.for("react.transitional.element"),yn=Symbol.for("react.portal"),Jr=Symbol.for("react.fragment"),_x=Symbol.for("react.strict_mode"),Yf=Symbol.for("react.profiler"),Hx=Symbol.for("react.consumer"),qa=Symbol.for("react.context"),Xc=Symbol.for("react.forward_ref"),Qf=Symbol.for("react.suspense"),Jf=Symbol.for("react.suspense_list"),jc=Symbol.for("react.memo"),po=Symbol.for("react.lazy");Symbol.for("react.scope");var $f=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var rL=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var fg=Symbol.iterator;function pn(e){return e===null||typeof e!="object"?null:(e=fg&&e[fg]||e["@@iterator"],typeof e=="function"?e:null)}var lL=Symbol.for("react.client.reference");function ec(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===lL?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Jr:return"Fragment";case Yf:return"Profiler";case _x:return"StrictMode";case Qf:return"Suspense";case Jf:return"SuspenseList";case $f:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case yn:return"Portal";case qa:return e.displayName||"Context";case Hx:return(e._context.displayName||"Context")+".Consumer";case Xc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case jc:return t=e.displayName||null,t!==null?t:ec(e.type)||"Memo";case po:t=e._payload,e=e._init;try{return ec(e(t))}catch{}}return null}var wn=Array.isArray,X=Bx.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ce=tL.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,lr={pending:!1,data:null,method:null,action:null},tc=[],$r=-1;function Ca(e){return{current:e}}function $e(e){0>$r||(e.current=tc[$r],tc[$r]=null,$r--)}function we(e,t){$r++,tc[$r]=e.current,e.current=t}var wa=Ca(null),zn=Ca(null),Lo=Ca(null),Xs=Ca(null);function js(e,t){switch(we(Lo,t),we(zn,e),we(wa,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?vx(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=vx(t),e=i0(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}$e(wa),we(wa,e)}function xl(){$e(wa),$e(zn),$e(Lo)}function ac(e){e.memoizedState!==null&&we(Xs,e);var t=wa.current,a=i0(t,e.type);t!==a&&(we(zn,e),we(wa,a))}function Ks(e){zn.current===e&&($e(wa),$e(zn)),Xs.current===e&&($e(Xs),Zn._currentValue=lr)}var xf,cg;function tr(e){if(xf===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);xf=t&&t[1]||"",cg=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+xf+e+cg}var vf=!1;function bf(e,t){if(!e||vf)return"";vf=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(t){var f=function(){throw Error()};if(Object.defineProperty(f.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(f,[])}catch(m){var c=m}Reflect.construct(e,[],f)}else{try{f.call()}catch(m){c=m}e.call(f.prototype)}}else{try{throw Error()}catch(m){c=m}(f=e())&&typeof f.catch=="function"&&f.catch(function(){})}}catch(m){if(m&&c&&typeof m.stack=="string")return[m.stack,c.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var l=o.DetermineComponentFrameRoot(),n=l[0],i=l[1];if(n&&i){var s=n.split(`
`),u=i.split(`
`);for(r=o=0;o<s.length&&!s[o].includes("DetermineComponentFrameRoot");)o++;for(;r<u.length&&!u[r].includes("DetermineComponentFrameRoot");)r++;if(o===s.length||r===u.length)for(o=s.length-1,r=u.length-1;1<=o&&0<=r&&s[o]!==u[r];)r--;for(;1<=o&&0<=r;o--,r--)if(s[o]!==u[r]){if(o!==1||r!==1)do if(o--,r--,0>r||s[o]!==u[r]){var d=`
`+s[o].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=o&&0<=r);break}}}finally{vf=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?tr(a):""}function nL(e,t){switch(e.tag){case 26:case 27:case 5:return tr(e.type);case 16:return tr("Lazy");case 13:return e.child!==t&&t!==null?tr("Suspense Fallback"):tr("Suspense");case 19:return tr("SuspenseList");case 0:case 15:return bf(e.type,!1);case 11:return bf(e.type.render,!1);case 1:return bf(e.type,!0);case 31:return tr("Activity");default:return""}}function pg(e){try{var t="",a=null;do t+=nL(e,a),a=e,e=e.return;while(e);return t}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var oc=Object.prototype.hasOwnProperty,Kc=je.unstable_scheduleCallback,yf=je.unstable_cancelCallback,iL=je.unstable_shouldYield,sL=je.unstable_requestPaint,Bt=je.unstable_now,uL=je.unstable_getCurrentPriorityLevel,qx=je.unstable_ImmediatePriority,Gx=je.unstable_UserBlockingPriority,Ws=je.unstable_NormalPriority,dL=je.unstable_LowPriority,Vx=je.unstable_IdlePriority,fL=je.log,cL=je.unstable_setDisableYieldValue,$n=null,Nt=null;function bo(e){if(typeof fL=="function"&&cL(e),Nt&&typeof Nt.setStrictMode=="function")try{Nt.setStrictMode($n,e)}catch{}}var Ut=Math.clz32?Math.clz32:hL,pL=Math.log,mL=Math.LN2;function hL(e){return e>>>=0,e===0?32:31-(pL(e)/mL|0)|0}var ps=256,ms=262144,hs=4194304;function ar(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function yu(e,t,a){var o=e.pendingLanes;if(o===0)return 0;var r=0,l=e.suspendedLanes,n=e.pingedLanes;e=e.warmLanes;var i=o&134217727;return i!==0?(o=i&~l,o!==0?r=ar(o):(n&=i,n!==0?r=ar(n):a||(a=i&~e,a!==0&&(r=ar(a))))):(i=o&~l,i!==0?r=ar(i):n!==0?r=ar(n):a||(a=o&~e,a!==0&&(r=ar(a)))),r===0?0:t!==0&&t!==r&&!(t&l)&&(l=r&-r,a=t&-t,l>=a||l===32&&(a&4194048)!==0)?t:r}function ei(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function gL(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xx(){var e=hs;return hs<<=1,!(hs&62914560)&&(hs=4194304),e}function wf(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function ti(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function xL(e,t,a,o,r,l){var n=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var i=e.entanglements,s=e.expirationTimes,u=e.hiddenUpdates;for(a=n&~a;0<a;){var d=31-Ut(a),f=1<<d;i[d]=0,s[d]=-1;var c=u[d];if(c!==null)for(u[d]=null,d=0;d<c.length;d++){var m=c[d];m!==null&&(m.lane&=-536870913)}a&=~f}o!==0&&jx(e,o,0),l!==0&&r===0&&e.tag!==0&&(e.suspendedLanes|=l&~(n&~t))}function jx(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var o=31-Ut(t);e.entangledLanes|=t,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Kx(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var o=31-Ut(a),r=1<<o;r&t|e[o]&t&&(e[o]|=t),a&=~r}}function Wx(e,t){var a=t&-t;return a=a&42?1:Wc(a),a&(e.suspendedLanes|t)?0:a}function Wc(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Zc(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Zx(){var e=ce.p;return e!==0?e:(e=window.event,e===void 0?32:v0(e.type))}function mg(e,t){var a=ce.p;try{return ce.p=e,t()}finally{ce.p=a}}var Uo=Math.random().toString(36).slice(2),at="__reactFiber$"+Uo,St="__reactProps$"+Uo,Al="__reactContainer$"+Uo,rc="__reactEvents$"+Uo,vL="__reactListeners$"+Uo,bL="__reactHandles$"+Uo,hg="__reactResources$"+Uo,ai="__reactMarker$"+Uo;function Yc(e){delete e[at],delete e[St],delete e[rc],delete e[vL],delete e[bL]}function el(e){var t=e[at];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Al]||a[at]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Sx(e);e!==null;){if(a=e[at])return a;e=Sx(e)}return t}e=a,a=e.parentNode}return null}function Ml(e){if(e=e[at]||e[Al]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Cn(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(R(33))}function dl(e){var t=e[hg];return t||(t=e[hg]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Je(e){e[ai]=!0}var Yx=new Set,Qx={};function hr(e,t){vl(e,t),vl(e+"Capture",t)}function vl(e,t){for(Qx[e]=t,e=0;e<t.length;e++)Yx.add(t[e])}var yL=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),gg={},xg={};function wL(e){return oc.call(xg,e)?!0:oc.call(gg,e)?!1:yL.test(e)?xg[e]=!0:(gg[e]=!0,!1)}function Es(e,t,a){if(wL(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var o=t.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function gs(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Ba(e,t,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+o)}}function Xt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Jx(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function CL(e,t,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var r=o.get,l=o.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(n){a=""+n,l.call(this,n)}}),Object.defineProperty(e,t,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(n){a=""+n},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function lc(e){if(!e._valueTracker){var t=Jx(e)?"checked":"value";e._valueTracker=CL(e,t,""+e[t])}}function $x(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),o="";return e&&(o=Jx(e)?e.checked?"true":"false":e.value),e=o,e!==a?(t.setValue(e),!0):!1}function Zs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var SL=/[\n"\\]/g;function Wt(e){return e.replace(SL,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function nc(e,t,a,o,r,l,n,i){e.name="",n!=null&&typeof n!="function"&&typeof n!="symbol"&&typeof n!="boolean"?e.type=n:e.removeAttribute("type"),t!=null?n==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Xt(t)):e.value!==""+Xt(t)&&(e.value=""+Xt(t)):n!=="submit"&&n!=="reset"||e.removeAttribute("value"),t!=null?ic(e,n,Xt(t)):a!=null?ic(e,n,Xt(a)):o!=null&&e.removeAttribute("value"),r==null&&l!=null&&(e.defaultChecked=!!l),r!=null&&(e.checked=r&&typeof r!="function"&&typeof r!="symbol"),i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"?e.name=""+Xt(i):e.removeAttribute("name")}function ev(e,t,a,o,r,l,n,i){if(l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(e.type=l),t!=null||a!=null){if(!(l!=="submit"&&l!=="reset"||t!=null)){lc(e);return}a=a!=null?""+Xt(a):"",t=t!=null?""+Xt(t):a,i||t===e.value||(e.value=t),e.defaultValue=t}o=o??r,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=i?e.checked:!!o,e.defaultChecked=!!o,n!=null&&typeof n!="function"&&typeof n!="symbol"&&typeof n!="boolean"&&(e.name=n),lc(e)}function ic(e,t,a){t==="number"&&Zs(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function fl(e,t,a,o){if(e=e.options,t){t={};for(var r=0;r<a.length;r++)t["$"+a[r]]=!0;for(a=0;a<e.length;a++)r=t.hasOwnProperty("$"+e[a].value),e[a].selected!==r&&(e[a].selected=r),r&&o&&(e[a].defaultSelected=!0)}else{for(a=""+Xt(a),t=null,r=0;r<e.length;r++){if(e[r].value===a){e[r].selected=!0,o&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function tv(e,t,a){if(t!=null&&(t=""+Xt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+Xt(a):""}function av(e,t,a,o){if(t==null){if(o!=null){if(a!=null)throw Error(R(92));if(wn(o)){if(1<o.length)throw Error(R(93));o=o[0]}a=o}a==null&&(a=""),t=a}a=Xt(t),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),lc(e)}function bl(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var LL=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function vg(e,t,a){var o=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":o?e.setProperty(t,a):typeof a!="number"||a===0||LL.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function ov(e,t,a){if(t!=null&&typeof t!="object")throw Error(R(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||t!=null&&t.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var r in t)o=t[r],t.hasOwnProperty(r)&&a[r]!==o&&vg(e,r,o)}else for(var l in t)t.hasOwnProperty(l)&&vg(e,l,t[l])}function Qc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var RL=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),IL=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ds(e){return IL.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ga(){}var sc=null;function Jc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var tl=null,cl=null;function bg(e){var t=Ml(e);if(t&&(e=t.stateNode)){var a=e[St]||null;e:switch(e=t.stateNode,t.type){case"input":if(nc(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Wt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var o=a[t];if(o!==e&&o.form===e.form){var r=o[St]||null;if(!r)throw Error(R(90));nc(o,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(t=0;t<a.length;t++)o=a[t],o.form===e.form&&$x(o)}break e;case"textarea":tv(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&fl(e,!!a.multiple,t,!1)}}}var Cf=!1;function rv(e,t,a){if(Cf)return e(t,a);Cf=!0;try{var o=e(t);return o}finally{if(Cf=!1,(tl!==null||cl!==null)&&(Tu(),tl&&(t=tl,e=cl,cl=tl=null,bg(t),e)))for(t=0;t<e.length;t++)bg(e[t])}}function Fn(e,t){var a=e.stateNode;if(a===null)return null;var o=a[St]||null;if(o===null)return null;a=o[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(R(231,t,typeof a));return a}var Wa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),uc=!1;if(Wa)try{Kr={},Object.defineProperty(Kr,"passive",{get:function(){uc=!0}}),window.addEventListener("test",Kr,Kr),window.removeEventListener("test",Kr,Kr)}catch{uc=!1}var Kr,yo=null,$c=null,Ts=null;function lv(){if(Ts)return Ts;var e,t=$c,a=t.length,o,r="value"in yo?yo.value:yo.textContent,l=r.length;for(e=0;e<a&&t[e]===r[e];e++);var n=a-e;for(o=1;o<=n&&t[a-o]===r[l-o];o++);return Ts=r.slice(e,1<o?1-o:void 0)}function Ps(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xs(){return!0}function yg(){return!1}function Lt(e){function t(a,o,r,l,n){this._reactName=a,this._targetInst=r,this.type=o,this.nativeEvent=l,this.target=n,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(a=e[i],this[i]=a?a(l):l[i]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?xs:yg,this.isPropagationStopped=yg,this}return Ae(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=xs)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=xs)},persist:function(){},isPersistent:xs}),t}var gr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},wu=Lt(gr),oi=Ae({},gr,{view:0,detail:0}),kL=Lt(oi),Sf,Lf,mn,Cu=Ae({},oi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ep,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==mn&&(mn&&e.type==="mousemove"?(Sf=e.screenX-mn.screenX,Lf=e.screenY-mn.screenY):Lf=Sf=0,mn=e),Sf)},movementY:function(e){return"movementY"in e?e.movementY:Lf}}),wg=Lt(Cu),AL=Ae({},Cu,{dataTransfer:0}),ML=Lt(AL),EL=Ae({},oi,{relatedTarget:0}),Rf=Lt(EL),DL=Ae({},gr,{animationName:0,elapsedTime:0,pseudoElement:0}),TL=Lt(DL),PL=Ae({},gr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),OL=Lt(PL),BL=Ae({},gr,{data:0}),Cg=Lt(BL),NL={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},UL={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},zL={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function FL(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=zL[e])?!!t[e]:!1}function ep(){return FL}var _L=Ae({},oi,{key:function(e){if(e.key){var t=NL[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ps(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?UL[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ep,charCode:function(e){return e.type==="keypress"?Ps(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ps(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),HL=Lt(_L),qL=Ae({},Cu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Sg=Lt(qL),GL=Ae({},oi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ep}),VL=Lt(GL),XL=Ae({},gr,{propertyName:0,elapsedTime:0,pseudoElement:0}),jL=Lt(XL),KL=Ae({},Cu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),WL=Lt(KL),ZL=Ae({},gr,{newState:0,oldState:0}),YL=Lt(ZL),QL=[9,13,27,32],tp=Wa&&"CompositionEvent"in window,Rn=null;Wa&&"documentMode"in document&&(Rn=document.documentMode);var JL=Wa&&"TextEvent"in window&&!Rn,nv=Wa&&(!tp||Rn&&8<Rn&&11>=Rn),Lg=" ",Rg=!1;function iv(e,t){switch(e){case"keyup":return QL.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sv(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var al=!1;function $L(e,t){switch(e){case"compositionend":return sv(t);case"keypress":return t.which!==32?null:(Rg=!0,Lg);case"textInput":return e=t.data,e===Lg&&Rg?null:e;default:return null}}function e2(e,t){if(al)return e==="compositionend"||!tp&&iv(e,t)?(e=lv(),Ts=$c=yo=null,al=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return nv&&t.locale!=="ko"?null:t.data;default:return null}}var t2={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ig(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!t2[e.type]:t==="textarea"}function uv(e,t,a,o){tl?cl?cl.push(o):cl=[o]:tl=o,t=pu(t,"onChange"),0<t.length&&(a=new wu("onChange","change",null,a,o),e.push({event:a,listeners:t}))}var In=null,_n=null;function a2(e){r0(e,0)}function Su(e){var t=Cn(e);if($x(t))return e}function kg(e,t){if(e==="change")return t}var dv=!1;Wa&&(Wa?(bs="oninput"in document,bs||(If=document.createElement("div"),If.setAttribute("oninput","return;"),bs=typeof If.oninput=="function"),vs=bs):vs=!1,dv=vs&&(!document.documentMode||9<document.documentMode));var vs,bs,If;function Ag(){In&&(In.detachEvent("onpropertychange",fv),_n=In=null)}function fv(e){if(e.propertyName==="value"&&Su(_n)){var t=[];uv(t,_n,e,Jc(e)),rv(a2,t)}}function o2(e,t,a){e==="focusin"?(Ag(),In=t,_n=a,In.attachEvent("onpropertychange",fv)):e==="focusout"&&Ag()}function r2(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Su(_n)}function l2(e,t){if(e==="click")return Su(t)}function n2(e,t){if(e==="input"||e==="change")return Su(t)}function i2(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ft=typeof Object.is=="function"?Object.is:i2;function Hn(e,t){if(Ft(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),o=Object.keys(t);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var r=a[o];if(!oc.call(t,r)||!Ft(e[r],t[r]))return!1}return!0}function Mg(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Eg(e,t){var a=Mg(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=t&&o>=t)return{node:a,offset:t-e};e=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Mg(a)}}function cv(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?cv(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function pv(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Zs(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Zs(e.document)}return t}function ap(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var s2=Wa&&"documentMode"in document&&11>=document.documentMode,ol=null,dc=null,kn=null,fc=!1;function Dg(e,t,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;fc||ol==null||ol!==Zs(o)||(o=ol,"selectionStart"in o&&ap(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),kn&&Hn(kn,o)||(kn=o,o=pu(dc,"onSelect"),0<o.length&&(t=new wu("onSelect","select",null,t,a),e.push({event:t,listeners:o}),t.target=ol)))}function er(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var rl={animationend:er("Animation","AnimationEnd"),animationiteration:er("Animation","AnimationIteration"),animationstart:er("Animation","AnimationStart"),transitionrun:er("Transition","TransitionRun"),transitionstart:er("Transition","TransitionStart"),transitioncancel:er("Transition","TransitionCancel"),transitionend:er("Transition","TransitionEnd")},kf={},mv={};Wa&&(mv=document.createElement("div").style,"AnimationEvent"in window||(delete rl.animationend.animation,delete rl.animationiteration.animation,delete rl.animationstart.animation),"TransitionEvent"in window||delete rl.transitionend.transition);function xr(e){if(kf[e])return kf[e];if(!rl[e])return e;var t=rl[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in mv)return kf[e]=t[a];return e}var hv=xr("animationend"),gv=xr("animationiteration"),xv=xr("animationstart"),u2=xr("transitionrun"),d2=xr("transitionstart"),f2=xr("transitioncancel"),vv=xr("transitionend"),bv=new Map,cc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");cc.push("scrollEnd");function sa(e,t){bv.set(e,t),hr(t,[e])}var Ys=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Vt=[],ll=0,op=0;function Lu(){for(var e=ll,t=op=ll=0;t<e;){var a=Vt[t];Vt[t++]=null;var o=Vt[t];Vt[t++]=null;var r=Vt[t];Vt[t++]=null;var l=Vt[t];if(Vt[t++]=null,o!==null&&r!==null){var n=o.pending;n===null?r.next=r:(r.next=n.next,n.next=r),o.pending=r}l!==0&&yv(a,r,l)}}function Ru(e,t,a,o){Vt[ll++]=e,Vt[ll++]=t,Vt[ll++]=a,Vt[ll++]=o,op|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function rp(e,t,a,o){return Ru(e,t,a,o),Qs(e)}function vr(e,t){return Ru(e,null,null,t),Qs(e)}function yv(e,t,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var r=!1,l=e.return;l!==null;)l.childLanes|=a,o=l.alternate,o!==null&&(o.childLanes|=a),l.tag===22&&(e=l.stateNode,e===null||e._visibility&1||(r=!0)),e=l,l=l.return;return e.tag===3?(l=e.stateNode,r&&t!==null&&(r=31-Ut(a),e=l.hiddenUpdates,o=e[r],o===null?e[r]=[t]:o.push(t),t.lane=a|536870912),l):null}function Qs(e){if(50<Nn)throw Nn=0,Pc=null,Error(R(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var nl={};function c2(e,t,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pt(e,t,a,o){return new c2(e,t,a,o)}function lp(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Xa(e,t){var a=e.alternate;return a===null?(a=Pt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function wv(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Os(e,t,a,o,r,l){var n=0;if(o=e,typeof e=="function")lp(e)&&(n=1);else if(typeof e=="string")n=hR(e,a,wa.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case $f:return e=Pt(31,a,t,r),e.elementType=$f,e.lanes=l,e;case Jr:return nr(a.children,r,l,t);case _x:n=8,r|=24;break;case Yf:return e=Pt(12,a,t,r|2),e.elementType=Yf,e.lanes=l,e;case Qf:return e=Pt(13,a,t,r),e.elementType=Qf,e.lanes=l,e;case Jf:return e=Pt(19,a,t,r),e.elementType=Jf,e.lanes=l,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case qa:n=10;break e;case Hx:n=9;break e;case Xc:n=11;break e;case jc:n=14;break e;case po:n=16,o=null;break e}n=29,a=Error(R(130,e===null?"null":typeof e,"")),o=null}return t=Pt(n,a,t,r),t.elementType=e,t.type=o,t.lanes=l,t}function nr(e,t,a,o){return e=Pt(7,e,o,t),e.lanes=a,e}function Af(e,t,a){return e=Pt(6,e,null,t),e.lanes=a,e}function Cv(e){var t=Pt(18,null,null,0);return t.stateNode=e,t}function Mf(e,t,a){return t=Pt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Tg=new WeakMap;function Zt(e,t){if(typeof e=="object"&&e!==null){var a=Tg.get(e);return a!==void 0?a:(t={value:e,source:t,stack:pg(t)},Tg.set(e,t),t)}return{value:e,source:t,stack:pg(t)}}var il=[],sl=0,Js=null,qn=0,jt=[],Kt=0,Po=null,va=1,ba="";function _a(e,t){il[sl++]=qn,il[sl++]=Js,Js=e,qn=t}function Sv(e,t,a){jt[Kt++]=va,jt[Kt++]=ba,jt[Kt++]=Po,Po=e;var o=va;e=ba;var r=32-Ut(o)-1;o&=~(1<<r),a+=1;var l=32-Ut(t)+r;if(30<l){var n=r-r%5;l=(o&(1<<n)-1).toString(32),o>>=n,r-=n,va=1<<32-Ut(t)+r|a<<r|o,ba=l+e}else va=1<<l|a<<r|o,ba=e}function np(e){e.return!==null&&(_a(e,1),Sv(e,1,0))}function ip(e){for(;e===Js;)Js=il[--sl],il[sl]=null,qn=il[--sl],il[sl]=null;for(;e===Po;)Po=jt[--Kt],jt[Kt]=null,ba=jt[--Kt],jt[Kt]=null,va=jt[--Kt],jt[Kt]=null}function Lv(e,t){jt[Kt++]=va,jt[Kt++]=ba,jt[Kt++]=Po,va=t.id,ba=t.overflow,Po=e}var ot=null,ke=null,ie=!1,Ro=null,Yt=!1,pc=Error(R(519));function Oo(e){var t=Error(R(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Gn(Zt(t,e)),pc}function Pg(e){var t=e.stateNode,a=e.type,o=e.memoizedProps;switch(t[at]=e,t[St]=o,a){case"dialog":oe("cancel",t),oe("close",t);break;case"iframe":case"object":case"embed":oe("load",t);break;case"video":case"audio":for(a=0;a<Kn.length;a++)oe(Kn[a],t);break;case"source":oe("error",t);break;case"img":case"image":case"link":oe("error",t),oe("load",t);break;case"details":oe("toggle",t);break;case"input":oe("invalid",t),ev(t,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":oe("invalid",t);break;case"textarea":oe("invalid",t),av(t,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||o.suppressHydrationWarning===!0||n0(t.textContent,a)?(o.popover!=null&&(oe("beforetoggle",t),oe("toggle",t)),o.onScroll!=null&&oe("scroll",t),o.onScrollEnd!=null&&oe("scrollend",t),o.onClick!=null&&(t.onclick=Ga),t=!0):t=!1,t||Oo(e,!0)}function Og(e){for(ot=e.return;ot;)switch(ot.tag){case 5:case 31:case 13:Yt=!1;return;case 27:case 3:Yt=!0;return;default:ot=ot.return}}function Wr(e){if(e!==ot)return!1;if(!ie)return Og(e),ie=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||zc(e.type,e.memoizedProps)),a=!a),a&&ke&&Oo(e),Og(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));ke=Cx(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));ke=Cx(e)}else t===27?(t=ke,zo(e.type)?(e=qc,qc=null,ke=e):ke=t):ke=ot?Jt(e.stateNode.nextSibling):null;return!0}function dr(){ke=ot=null,ie=!1}function Ef(){var e=Ro;return e!==null&&(wt===null?wt=e:wt.push.apply(wt,e),Ro=null),e}function Gn(e){Ro===null?Ro=[e]:Ro.push(e)}var mc=Ca(null),br=null,Va=null;function ho(e,t,a){we(mc,t._currentValue),t._currentValue=a}function ja(e){e._currentValue=mc.current,$e(mc)}function hc(e,t,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,o!==null&&(o.childLanes|=t)):o!==null&&(o.childLanes&t)!==t&&(o.childLanes|=t),e===a)break;e=e.return}}function gc(e,t,a,o){var r=e.child;for(r!==null&&(r.return=e);r!==null;){var l=r.dependencies;if(l!==null){var n=r.child;l=l.firstContext;e:for(;l!==null;){var i=l;l=r;for(var s=0;s<t.length;s++)if(i.context===t[s]){l.lanes|=a,i=l.alternate,i!==null&&(i.lanes|=a),hc(l.return,a,e),o||(n=null);break e}l=i.next}}else if(r.tag===18){if(n=r.return,n===null)throw Error(R(341));n.lanes|=a,l=n.alternate,l!==null&&(l.lanes|=a),hc(n,a,e),n=null}else n=r.child;if(n!==null)n.return=r;else for(n=r;n!==null;){if(n===e){n=null;break}if(r=n.sibling,r!==null){r.return=n.return,n=r;break}n=n.return}r=n}}function El(e,t,a,o){e=null;for(var r=t,l=!1;r!==null;){if(!l){if(r.flags&524288)l=!0;else if(r.flags&262144)break}if(r.tag===10){var n=r.alternate;if(n===null)throw Error(R(387));if(n=n.memoizedProps,n!==null){var i=r.type;Ft(r.pendingProps.value,n.value)||(e!==null?e.push(i):e=[i])}}else if(r===Xs.current){if(n=r.alternate,n===null)throw Error(R(387));n.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(e!==null?e.push(Zn):e=[Zn])}r=r.return}e!==null&&gc(t,e,a,o),t.flags|=262144}function $s(e){for(e=e.firstContext;e!==null;){if(!Ft(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function fr(e){br=e,Va=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function rt(e){return Rv(br,e)}function ys(e,t){return br===null&&fr(e),Rv(e,t)}function Rv(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Va===null){if(e===null)throw Error(R(308));Va=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Va=Va.next=t;return a}var p2=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},m2=je.unstable_scheduleCallback,h2=je.unstable_NormalPriority,qe={$$typeof:qa,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function sp(){return{controller:new p2,data:new Map,refCount:0}}function ri(e){e.refCount--,e.refCount===0&&m2(h2,function(){e.controller.abort()})}var An=null,xc=0,yl=0,pl=null;function g2(e,t){if(An===null){var a=An=[];xc=0,yl=Pp(),pl={status:"pending",value:void 0,then:function(o){a.push(o)}}}return xc++,t.then(Bg,Bg),t}function Bg(){if(--xc===0&&An!==null){pl!==null&&(pl.status="fulfilled");var e=An;An=null,yl=0,pl=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function x2(e,t){var a=[],o={status:"pending",value:null,reason:null,then:function(r){a.push(r)}};return e.then(function(){o.status="fulfilled",o.value=t;for(var r=0;r<a.length;r++)(0,a[r])(t)},function(r){for(o.status="rejected",o.reason=r,r=0;r<a.length;r++)(0,a[r])(void 0)}),o}var Ng=X.S;X.S=function(e,t){Fb=Bt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&g2(e,t),Ng!==null&&Ng(e,t)};var ir=Ca(null);function up(){var e=ir.current;return e!==null?e:be.pooledCache}function Bs(e,t){t===null?we(ir,ir.current):we(ir,t.pool)}function Iv(){var e=up();return e===null?null:{parent:qe._currentValue,pool:e}}var Dl=Error(R(460)),dp=Error(R(474)),Iu=Error(R(542)),eu={then:function(){}};function Ug(e){return e=e.status,e==="fulfilled"||e==="rejected"}function kv(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(Ga,Ga),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Fg(e),e;default:if(typeof t.status=="string")t.then(Ga,Ga);else{if(e=be,e!==null&&100<e.shellSuspendCounter)throw Error(R(482));e=t,e.status="pending",e.then(function(o){if(t.status==="pending"){var r=t;r.status="fulfilled",r.value=o}},function(o){if(t.status==="pending"){var r=t;r.status="rejected",r.reason=o}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Fg(e),e}throw sr=t,Dl}}function or(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(sr=a,Dl):a}}var sr=null;function zg(){if(sr===null)throw Error(R(459));var e=sr;return sr=null,e}function Fg(e){if(e===Dl||e===Iu)throw Error(R(483))}var ml=null,Vn=0;function ws(e){var t=Vn;return Vn+=1,ml===null&&(ml=[]),kv(ml,e,t)}function hn(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Cs(e,t){throw t.$$typeof===oL?Error(R(525)):(e=Object.prototype.toString.call(t),Error(R(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Av(e){function t(h,p){if(e){var g=h.deletions;g===null?(h.deletions=[p],h.flags|=16):g.push(p)}}function a(h,p){if(!e)return null;for(;p!==null;)t(h,p),p=p.sibling;return null}function o(h){for(var p=new Map;h!==null;)h.key!==null?p.set(h.key,h):p.set(h.index,h),h=h.sibling;return p}function r(h,p){return h=Xa(h,p),h.index=0,h.sibling=null,h}function l(h,p,g){return h.index=g,e?(g=h.alternate,g!==null?(g=g.index,g<p?(h.flags|=67108866,p):g):(h.flags|=67108866,p)):(h.flags|=1048576,p)}function n(h){return e&&h.alternate===null&&(h.flags|=67108866),h}function i(h,p,g,y){return p===null||p.tag!==6?(p=Af(g,h.mode,y),p.return=h,p):(p=r(p,g),p.return=h,p)}function s(h,p,g,y){var S=g.type;return S===Jr?d(h,p,g.props.children,y,g.key):p!==null&&(p.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===po&&or(S)===p.type)?(p=r(p,g.props),hn(p,g),p.return=h,p):(p=Os(g.type,g.key,g.props,null,h.mode,y),hn(p,g),p.return=h,p)}function u(h,p,g,y){return p===null||p.tag!==4||p.stateNode.containerInfo!==g.containerInfo||p.stateNode.implementation!==g.implementation?(p=Mf(g,h.mode,y),p.return=h,p):(p=r(p,g.children||[]),p.return=h,p)}function d(h,p,g,y,S){return p===null||p.tag!==7?(p=nr(g,h.mode,y,S),p.return=h,p):(p=r(p,g),p.return=h,p)}function f(h,p,g){if(typeof p=="string"&&p!==""||typeof p=="number"||typeof p=="bigint")return p=Af(""+p,h.mode,g),p.return=h,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case cs:return g=Os(p.type,p.key,p.props,null,h.mode,g),hn(g,p),g.return=h,g;case yn:return p=Mf(p,h.mode,g),p.return=h,p;case po:return p=or(p),f(h,p,g)}if(wn(p)||pn(p))return p=nr(p,h.mode,g,null),p.return=h,p;if(typeof p.then=="function")return f(h,ws(p),g);if(p.$$typeof===qa)return f(h,ys(h,p),g);Cs(h,p)}return null}function c(h,p,g,y){var S=p!==null?p.key:null;if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return S!==null?null:i(h,p,""+g,y);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case cs:return g.key===S?s(h,p,g,y):null;case yn:return g.key===S?u(h,p,g,y):null;case po:return g=or(g),c(h,p,g,y)}if(wn(g)||pn(g))return S!==null?null:d(h,p,g,y,null);if(typeof g.then=="function")return c(h,p,ws(g),y);if(g.$$typeof===qa)return c(h,p,ys(h,g),y);Cs(h,g)}return null}function m(h,p,g,y,S){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return h=h.get(g)||null,i(p,h,""+y,S);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case cs:return h=h.get(y.key===null?g:y.key)||null,s(p,h,y,S);case yn:return h=h.get(y.key===null?g:y.key)||null,u(p,h,y,S);case po:return y=or(y),m(h,p,g,y,S)}if(wn(y)||pn(y))return h=h.get(g)||null,d(p,h,y,S,null);if(typeof y.then=="function")return m(h,p,g,ws(y),S);if(y.$$typeof===qa)return m(h,p,g,ys(p,y),S);Cs(p,y)}return null}function b(h,p,g,y){for(var S=null,k=null,L=p,C=p=0,E=null;L!==null&&C<g.length;C++){L.index>C?(E=L,L=null):E=L.sibling;var T=c(h,L,g[C],y);if(T===null){L===null&&(L=E);break}e&&L&&T.alternate===null&&t(h,L),p=l(T,p,C),k===null?S=T:k.sibling=T,k=T,L=E}if(C===g.length)return a(h,L),ie&&_a(h,C),S;if(L===null){for(;C<g.length;C++)L=f(h,g[C],y),L!==null&&(p=l(L,p,C),k===null?S=L:k.sibling=L,k=L);return ie&&_a(h,C),S}for(L=o(L);C<g.length;C++)E=m(L,h,C,g[C],y),E!==null&&(e&&E.alternate!==null&&L.delete(E.key===null?C:E.key),p=l(E,p,C),k===null?S=E:k.sibling=E,k=E);return e&&L.forEach(function(z){return t(h,z)}),ie&&_a(h,C),S}function v(h,p,g,y){if(g==null)throw Error(R(151));for(var S=null,k=null,L=p,C=p=0,E=null,T=g.next();L!==null&&!T.done;C++,T=g.next()){L.index>C?(E=L,L=null):E=L.sibling;var z=c(h,L,T.value,y);if(z===null){L===null&&(L=E);break}e&&L&&z.alternate===null&&t(h,L),p=l(z,p,C),k===null?S=z:k.sibling=z,k=z,L=E}if(T.done)return a(h,L),ie&&_a(h,C),S;if(L===null){for(;!T.done;C++,T=g.next())T=f(h,T.value,y),T!==null&&(p=l(T,p,C),k===null?S=T:k.sibling=T,k=T);return ie&&_a(h,C),S}for(L=o(L);!T.done;C++,T=g.next())T=m(L,h,C,T.value,y),T!==null&&(e&&T.alternate!==null&&L.delete(T.key===null?C:T.key),p=l(T,p,C),k===null?S=T:k.sibling=T,k=T);return e&&L.forEach(function(K){return t(h,K)}),ie&&_a(h,C),S}function w(h,p,g,y){if(typeof g=="object"&&g!==null&&g.type===Jr&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case cs:e:{for(var S=g.key;p!==null;){if(p.key===S){if(S=g.type,S===Jr){if(p.tag===7){a(h,p.sibling),y=r(p,g.props.children),y.return=h,h=y;break e}}else if(p.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===po&&or(S)===p.type){a(h,p.sibling),y=r(p,g.props),hn(y,g),y.return=h,h=y;break e}a(h,p);break}else t(h,p);p=p.sibling}g.type===Jr?(y=nr(g.props.children,h.mode,y,g.key),y.return=h,h=y):(y=Os(g.type,g.key,g.props,null,h.mode,y),hn(y,g),y.return=h,h=y)}return n(h);case yn:e:{for(S=g.key;p!==null;){if(p.key===S)if(p.tag===4&&p.stateNode.containerInfo===g.containerInfo&&p.stateNode.implementation===g.implementation){a(h,p.sibling),y=r(p,g.children||[]),y.return=h,h=y;break e}else{a(h,p);break}else t(h,p);p=p.sibling}y=Mf(g,h.mode,y),y.return=h,h=y}return n(h);case po:return g=or(g),w(h,p,g,y)}if(wn(g))return b(h,p,g,y);if(pn(g)){if(S=pn(g),typeof S!="function")throw Error(R(150));return g=S.call(g),v(h,p,g,y)}if(typeof g.then=="function")return w(h,p,ws(g),y);if(g.$$typeof===qa)return w(h,p,ys(h,g),y);Cs(h,g)}return typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint"?(g=""+g,p!==null&&p.tag===6?(a(h,p.sibling),y=r(p,g),y.return=h,h=y):(a(h,p),y=Af(g,h.mode,y),y.return=h,h=y),n(h)):a(h,p)}return function(h,p,g,y){try{Vn=0;var S=w(h,p,g,y);return ml=null,S}catch(L){if(L===Dl||L===Iu)throw L;var k=Pt(29,L,null,h.mode);return k.lanes=y,k.return=h,k}finally{}}}var cr=Av(!0),Mv=Av(!1),mo=!1;function fp(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function vc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Io(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ko(e,t,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,fe&2){var r=o.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),o.pending=t,t=Qs(e),yv(e,null,a),t}return Ru(e,o,t,a),Qs(e)}function Mn(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var o=t.lanes;o&=e.pendingLanes,a|=o,t.lanes=a,Kx(e,a)}}function Df(e,t){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var r=null,l=null;if(a=a.firstBaseUpdate,a!==null){do{var n={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};l===null?r=l=n:l=l.next=n,a=a.next}while(a!==null);l===null?r=l=t:l=l.next=t}else r=l=t;a={baseState:o.baseState,firstBaseUpdate:r,lastBaseUpdate:l,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var bc=!1;function En(){if(bc){var e=pl;if(e!==null)throw e}}function Dn(e,t,a,o){bc=!1;var r=e.updateQueue;mo=!1;var l=r.firstBaseUpdate,n=r.lastBaseUpdate,i=r.shared.pending;if(i!==null){r.shared.pending=null;var s=i,u=s.next;s.next=null,n===null?l=u:n.next=u,n=s;var d=e.alternate;d!==null&&(d=d.updateQueue,i=d.lastBaseUpdate,i!==n&&(i===null?d.firstBaseUpdate=u:i.next=u,d.lastBaseUpdate=s))}if(l!==null){var f=r.baseState;n=0,d=u=s=null,i=l;do{var c=i.lane&-536870913,m=c!==i.lane;if(m?(le&c)===c:(o&c)===c){c!==0&&c===yl&&(bc=!0),d!==null&&(d=d.next={lane:0,tag:i.tag,payload:i.payload,callback:null,next:null});e:{var b=e,v=i;c=t;var w=a;switch(v.tag){case 1:if(b=v.payload,typeof b=="function"){f=b.call(w,f,c);break e}f=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=v.payload,c=typeof b=="function"?b.call(w,f,c):b,c==null)break e;f=Ae({},f,c);break e;case 2:mo=!0}}c=i.callback,c!==null&&(e.flags|=64,m&&(e.flags|=8192),m=r.callbacks,m===null?r.callbacks=[c]:m.push(c))}else m={lane:c,tag:i.tag,payload:i.payload,callback:i.callback,next:null},d===null?(u=d=m,s=f):d=d.next=m,n|=c;if(i=i.next,i===null){if(i=r.shared.pending,i===null)break;m=i,i=m.next,m.next=null,r.lastBaseUpdate=m,r.shared.pending=null}}while(!0);d===null&&(s=f),r.baseState=s,r.firstBaseUpdate=u,r.lastBaseUpdate=d,l===null&&(r.shared.lanes=0),No|=n,e.lanes=n,e.memoizedState=f}}function Ev(e,t){if(typeof e!="function")throw Error(R(191,e));e.call(t)}function Dv(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Ev(a[e],t)}var wl=Ca(null),tu=Ca(0);function _g(e,t){e=Ja,we(tu,e),we(wl,t),Ja=e|t.baseLanes}function yc(){we(tu,Ja),we(wl,wl.current)}function cp(){Ja=tu.current,$e(wl),$e(tu)}var _t=Ca(null),Qt=null;function go(e){var t=e.alternate;we(ze,ze.current&1),we(_t,e),Qt===null&&(t===null||wl.current!==null||t.memoizedState!==null)&&(Qt=e)}function wc(e){we(ze,ze.current),we(_t,e),Qt===null&&(Qt=e)}function Tv(e){e.tag===22?(we(ze,ze.current),we(_t,e),Qt===null&&(Qt=e)):xo(e)}function xo(){we(ze,ze.current),we(_t,_t.current)}function Tt(e){$e(_t),Qt===e&&(Qt=null),$e(ze)}var ze=Ca(0);function au(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||_c(a)||Hc(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Za=0,Y=null,xe=null,_e=null,ou=!1,hl=!1,pr=!1,ru=0,Xn=0,gl=null,v2=0;function Be(){throw Error(R(321))}function pp(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!Ft(e[a],t[a]))return!1;return!0}function mp(e,t,a,o,r,l){return Za=l,Y=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,X.H=e===null||e.memoizedState===null?ub:Rp,pr=!1,l=a(o,r),pr=!1,hl&&(l=Ov(t,a,o,r)),Pv(e),l}function Pv(e){X.H=jn;var t=xe!==null&&xe.next!==null;if(Za=0,_e=xe=Y=null,ou=!1,Xn=0,gl=null,t)throw Error(R(300));e===null||Ge||(e=e.dependencies,e!==null&&$s(e)&&(Ge=!0))}function Ov(e,t,a,o){Y=e;var r=0;do{if(hl&&(gl=null),Xn=0,hl=!1,25<=r)throw Error(R(301));if(r+=1,_e=xe=null,e.updateQueue!=null){var l=e.updateQueue;l.lastEffect=null,l.events=null,l.stores=null,l.memoCache!=null&&(l.memoCache.index=0)}X.H=db,l=t(a,o)}while(hl);return l}function b2(){var e=X.H,t=e.useState()[0];return t=typeof t.then=="function"?li(t):t,e=e.useState()[0],(xe!==null?xe.memoizedState:null)!==e&&(Y.flags|=1024),t}function hp(){var e=ru!==0;return ru=0,e}function gp(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function xp(e){if(ou){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ou=!1}Za=0,_e=xe=Y=null,hl=!1,Xn=ru=0,gl=null}function gt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _e===null?Y.memoizedState=_e=e:_e=_e.next=e,_e}function Fe(){if(xe===null){var e=Y.alternate;e=e!==null?e.memoizedState:null}else e=xe.next;var t=_e===null?Y.memoizedState:_e.next;if(t!==null)_e=t,xe=e;else{if(e===null)throw Y.alternate===null?Error(R(467)):Error(R(310));xe=e,e={memoizedState:xe.memoizedState,baseState:xe.baseState,baseQueue:xe.baseQueue,queue:xe.queue,next:null},_e===null?Y.memoizedState=_e=e:_e=_e.next=e}return _e}function ku(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function li(e){var t=Xn;return Xn+=1,gl===null&&(gl=[]),e=kv(gl,e,t),t=Y,(_e===null?t.memoizedState:_e.next)===null&&(t=t.alternate,X.H=t===null||t.memoizedState===null?ub:Rp),e}function Au(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return li(e);if(e.$$typeof===qa)return rt(e)}throw Error(R(438,String(e)))}function vp(e){var t=null,a=Y.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var o=Y.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(t={data:o.data.map(function(r){return r.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=ku(),Y.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),o=0;o<e;o++)a[o]=rL;return t.index++,a}function Ya(e,t){return typeof t=="function"?t(e):t}function Ns(e){var t=Fe();return bp(t,xe,e)}function bp(e,t,a){var o=e.queue;if(o===null)throw Error(R(311));o.lastRenderedReducer=a;var r=e.baseQueue,l=o.pending;if(l!==null){if(r!==null){var n=r.next;r.next=l.next,l.next=n}t.baseQueue=r=l,o.pending=null}if(l=e.baseState,r===null)e.memoizedState=l;else{t=r.next;var i=n=null,s=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f!==u.lane?(le&f)===f:(Za&f)===f){var c=u.revertLane;if(c===0)s!==null&&(s=s.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===yl&&(d=!0);else if((Za&c)===c){u=u.next,c===yl&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},s===null?(i=s=f,n=l):s=s.next=f,Y.lanes|=c,No|=c;f=u.action,pr&&a(l,f),l=u.hasEagerState?u.eagerState:a(l,f)}else c={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},s===null?(i=s=c,n=l):s=s.next=c,Y.lanes|=f,No|=f;u=u.next}while(u!==null&&u!==t);if(s===null?n=l:s.next=i,!Ft(l,e.memoizedState)&&(Ge=!0,d&&(a=pl,a!==null)))throw a;e.memoizedState=l,e.baseState=n,e.baseQueue=s,o.lastRenderedState=l}return r===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Tf(e){var t=Fe(),a=t.queue;if(a===null)throw Error(R(311));a.lastRenderedReducer=e;var o=a.dispatch,r=a.pending,l=t.memoizedState;if(r!==null){a.pending=null;var n=r=r.next;do l=e(l,n.action),n=n.next;while(n!==r);Ft(l,t.memoizedState)||(Ge=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),a.lastRenderedState=l}return[l,o]}function Bv(e,t,a){var o=Y,r=Fe(),l=ie;if(l){if(a===void 0)throw Error(R(407));a=a()}else a=t();var n=!Ft((xe||r).memoizedState,a);if(n&&(r.memoizedState=a,Ge=!0),r=r.queue,yp(zv.bind(null,o,r,e),[e]),r.getSnapshot!==t||n||_e!==null&&_e.memoizedState.tag&1){if(o.flags|=2048,Cl(9,{destroy:void 0},Uv.bind(null,o,r,a,t),null),be===null)throw Error(R(349));l||Za&127||Nv(o,t,a)}return a}function Nv(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=Y.updateQueue,t===null?(t=ku(),Y.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Uv(e,t,a,o){t.value=a,t.getSnapshot=o,Fv(t)&&_v(e)}function zv(e,t,a){return a(function(){Fv(t)&&_v(e)})}function Fv(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!Ft(e,a)}catch{return!0}}function _v(e){var t=vr(e,2);t!==null&&Ct(t,e,2)}function Cc(e){var t=gt();if(typeof e=="function"){var a=e;if(e=a(),pr){bo(!0);try{a()}finally{bo(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ya,lastRenderedState:e},t}function Hv(e,t,a,o){return e.baseState=a,bp(e,xe,typeof o=="function"?o:Ya)}function y2(e,t,a,o,r){if(Eu(e))throw Error(R(485));if(e=t.action,e!==null){var l={payload:r,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(n){l.listeners.push(n)}};X.T!==null?a(!0):l.isTransition=!1,o(l),a=t.pending,a===null?(l.next=t.pending=l,qv(t,l)):(l.next=a.next,t.pending=a.next=l)}}function qv(e,t){var a=t.action,o=t.payload,r=e.state;if(t.isTransition){var l=X.T,n={};X.T=n;try{var i=a(r,o),s=X.S;s!==null&&s(n,i),Hg(e,t,i)}catch(u){Sc(e,t,u)}finally{l!==null&&n.types!==null&&(l.types=n.types),X.T=l}}else try{l=a(r,o),Hg(e,t,l)}catch(u){Sc(e,t,u)}}function Hg(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){qg(e,t,o)},function(o){return Sc(e,t,o)}):qg(e,t,a)}function qg(e,t,a){t.status="fulfilled",t.value=a,Gv(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,qv(e,a)))}function Sc(e,t,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do t.status="rejected",t.reason=a,Gv(t),t=t.next;while(t!==o)}e.action=null}function Gv(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Vv(e,t){return t}function Gg(e,t){if(ie){var a=be.formState;if(a!==null){e:{var o=Y;if(ie){if(ke){t:{for(var r=ke,l=Yt;r.nodeType!==8;){if(!l){r=null;break t}if(r=Jt(r.nextSibling),r===null){r=null;break t}}l=r.data,r=l==="F!"||l==="F"?r:null}if(r){ke=Jt(r.nextSibling),o=r.data==="F!";break e}}Oo(o)}o=!1}o&&(t=a[0])}}return a=gt(),a.memoizedState=a.baseState=t,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vv,lastRenderedState:t},a.queue=o,a=nb.bind(null,Y,o),o.dispatch=a,o=Cc(!1),l=Lp.bind(null,Y,!1,o.queue),o=gt(),r={state:t,dispatch:null,action:e,pending:null},o.queue=r,a=y2.bind(null,Y,r,l,a),r.dispatch=a,o.memoizedState=e,[t,a,!1]}function Vg(e){var t=Fe();return Xv(t,xe,e)}function Xv(e,t,a){if(t=bp(e,t,Vv)[0],e=Ns(Ya)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var o=li(t)}catch(n){throw n===Dl?Iu:n}else o=t;t=Fe();var r=t.queue,l=r.dispatch;return a!==t.memoizedState&&(Y.flags|=2048,Cl(9,{destroy:void 0},w2.bind(null,r,a),null)),[o,l,e]}function w2(e,t){e.action=t}function Xg(e){var t=Fe(),a=xe;if(a!==null)return Xv(t,a,e);Fe(),t=t.memoizedState,a=Fe();var o=a.queue.dispatch;return a.memoizedState=e,[t,o,!1]}function Cl(e,t,a,o){return e={tag:e,create:a,deps:o,inst:t,next:null},t=Y.updateQueue,t===null&&(t=ku(),Y.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,t.lastEffect=e),e}function jv(){return Fe().memoizedState}function Us(e,t,a,o){var r=gt();Y.flags|=e,r.memoizedState=Cl(1|t,{destroy:void 0},a,o===void 0?null:o)}function Mu(e,t,a,o){var r=Fe();o=o===void 0?null:o;var l=r.memoizedState.inst;xe!==null&&o!==null&&pp(o,xe.memoizedState.deps)?r.memoizedState=Cl(t,l,a,o):(Y.flags|=e,r.memoizedState=Cl(1|t,l,a,o))}function jg(e,t){Us(8390656,8,e,t)}function yp(e,t){Mu(2048,8,e,t)}function C2(e){Y.flags|=4;var t=Y.updateQueue;if(t===null)t=ku(),Y.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function Kv(e){var t=Fe().memoizedState;return C2({ref:t,nextImpl:e}),function(){if(fe&2)throw Error(R(440));return t.impl.apply(void 0,arguments)}}function Wv(e,t){return Mu(4,2,e,t)}function Zv(e,t){return Mu(4,4,e,t)}function Yv(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Qv(e,t,a){a=a!=null?a.concat([e]):null,Mu(4,4,Yv.bind(null,t,e),a)}function wp(){}function Jv(e,t){var a=Fe();t=t===void 0?null:t;var o=a.memoizedState;return t!==null&&pp(t,o[1])?o[0]:(a.memoizedState=[e,t],e)}function $v(e,t){var a=Fe();t=t===void 0?null:t;var o=a.memoizedState;if(t!==null&&pp(t,o[1]))return o[0];if(o=e(),pr){bo(!0);try{e()}finally{bo(!1)}}return a.memoizedState=[o,t],o}function Cp(e,t,a){return a===void 0||Za&1073741824&&!(le&261930)?e.memoizedState=t:(e.memoizedState=a,e=Hb(),Y.lanes|=e,No|=e,a)}function eb(e,t,a,o){return Ft(a,t)?a:wl.current!==null?(e=Cp(e,a,o),Ft(e,t)||(Ge=!0),e):!(Za&42)||Za&1073741824&&!(le&261930)?(Ge=!0,e.memoizedState=a):(e=Hb(),Y.lanes|=e,No|=e,t)}function tb(e,t,a,o,r){var l=ce.p;ce.p=l!==0&&8>l?l:8;var n=X.T,i={};X.T=i,Lp(e,!1,t,a);try{var s=r(),u=X.S;if(u!==null&&u(i,s),s!==null&&typeof s=="object"&&typeof s.then=="function"){var d=x2(s,o);Tn(e,t,d,zt(e))}else Tn(e,t,o,zt(e))}catch(f){Tn(e,t,{then:function(){},status:"rejected",reason:f},zt())}finally{ce.p=l,n!==null&&i.types!==null&&(n.types=i.types),X.T=n}}function S2(){}function Lc(e,t,a,o){if(e.tag!==5)throw Error(R(476));var r=ab(e).queue;tb(e,r,t,lr,a===null?S2:function(){return ob(e),a(o)})}function ab(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:lr,baseState:lr,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ya,lastRenderedState:lr},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ya,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ob(e){var t=ab(e);t.next===null&&(t=e.alternate.memoizedState),Tn(e,t.next.queue,{},zt())}function Sp(){return rt(Zn)}function rb(){return Fe().memoizedState}function lb(){return Fe().memoizedState}function L2(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=zt();e=Io(a);var o=ko(t,e,a);o!==null&&(Ct(o,t,a),Mn(o,t,a)),t={cache:sp()},e.payload=t;return}t=t.return}}function R2(e,t,a){var o=zt();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Eu(e)?ib(t,a):(a=rp(e,t,a,o),a!==null&&(Ct(a,e,o),sb(a,t,o)))}function nb(e,t,a){var o=zt();Tn(e,t,a,o)}function Tn(e,t,a,o){var r={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Eu(e))ib(t,r);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var n=t.lastRenderedState,i=l(n,a);if(r.hasEagerState=!0,r.eagerState=i,Ft(i,n))return Ru(e,t,r,0),be===null&&Lu(),!1}catch{}finally{}if(a=rp(e,t,r,o),a!==null)return Ct(a,e,o),sb(a,t,o),!0}return!1}function Lp(e,t,a,o){if(o={lane:2,revertLane:Pp(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Eu(e)){if(t)throw Error(R(479))}else t=rp(e,a,o,2),t!==null&&Ct(t,e,2)}function Eu(e){var t=e.alternate;return e===Y||t!==null&&t===Y}function ib(e,t){hl=ou=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function sb(e,t,a){if(a&4194048){var o=t.lanes;o&=e.pendingLanes,a|=o,t.lanes=a,Kx(e,a)}}var jn={readContext:rt,use:Au,useCallback:Be,useContext:Be,useEffect:Be,useImperativeHandle:Be,useLayoutEffect:Be,useInsertionEffect:Be,useMemo:Be,useReducer:Be,useRef:Be,useState:Be,useDebugValue:Be,useDeferredValue:Be,useTransition:Be,useSyncExternalStore:Be,useId:Be,useHostTransitionStatus:Be,useFormState:Be,useActionState:Be,useOptimistic:Be,useMemoCache:Be,useCacheRefresh:Be};jn.useEffectEvent=Be;var ub={readContext:rt,use:Au,useCallback:function(e,t){return gt().memoizedState=[e,t===void 0?null:t],e},useContext:rt,useEffect:jg,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,Us(4194308,4,Yv.bind(null,t,e),a)},useLayoutEffect:function(e,t){return Us(4194308,4,e,t)},useInsertionEffect:function(e,t){Us(4,2,e,t)},useMemo:function(e,t){var a=gt();t=t===void 0?null:t;var o=e();if(pr){bo(!0);try{e()}finally{bo(!1)}}return a.memoizedState=[o,t],o},useReducer:function(e,t,a){var o=gt();if(a!==void 0){var r=a(t);if(pr){bo(!0);try{a(t)}finally{bo(!1)}}}else r=t;return o.memoizedState=o.baseState=r,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},o.queue=e,e=e.dispatch=R2.bind(null,Y,e),[o.memoizedState,e]},useRef:function(e){var t=gt();return e={current:e},t.memoizedState=e},useState:function(e){e=Cc(e);var t=e.queue,a=nb.bind(null,Y,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:wp,useDeferredValue:function(e,t){var a=gt();return Cp(a,e,t)},useTransition:function(){var e=Cc(!1);return e=tb.bind(null,Y,e.queue,!0,!1),gt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var o=Y,r=gt();if(ie){if(a===void 0)throw Error(R(407));a=a()}else{if(a=t(),be===null)throw Error(R(349));le&127||Nv(o,t,a)}r.memoizedState=a;var l={value:a,getSnapshot:t};return r.queue=l,jg(zv.bind(null,o,l,e),[e]),o.flags|=2048,Cl(9,{destroy:void 0},Uv.bind(null,o,l,a,t),null),a},useId:function(){var e=gt(),t=be.identifierPrefix;if(ie){var a=ba,o=va;a=(o&~(1<<32-Ut(o)-1)).toString(32)+a,t="_"+t+"R_"+a,a=ru++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=v2++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Sp,useFormState:Gg,useActionState:Gg,useOptimistic:function(e){var t=gt();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=Lp.bind(null,Y,!0,a),a.dispatch=t,[e,t]},useMemoCache:vp,useCacheRefresh:function(){return gt().memoizedState=L2.bind(null,Y)},useEffectEvent:function(e){var t=gt(),a={impl:e};return t.memoizedState=a,function(){if(fe&2)throw Error(R(440));return a.impl.apply(void 0,arguments)}}},Rp={readContext:rt,use:Au,useCallback:Jv,useContext:rt,useEffect:yp,useImperativeHandle:Qv,useInsertionEffect:Wv,useLayoutEffect:Zv,useMemo:$v,useReducer:Ns,useRef:jv,useState:function(){return Ns(Ya)},useDebugValue:wp,useDeferredValue:function(e,t){var a=Fe();return eb(a,xe.memoizedState,e,t)},useTransition:function(){var e=Ns(Ya)[0],t=Fe().memoizedState;return[typeof e=="boolean"?e:li(e),t]},useSyncExternalStore:Bv,useId:rb,useHostTransitionStatus:Sp,useFormState:Vg,useActionState:Vg,useOptimistic:function(e,t){var a=Fe();return Hv(a,xe,e,t)},useMemoCache:vp,useCacheRefresh:lb};Rp.useEffectEvent=Kv;var db={readContext:rt,use:Au,useCallback:Jv,useContext:rt,useEffect:yp,useImperativeHandle:Qv,useInsertionEffect:Wv,useLayoutEffect:Zv,useMemo:$v,useReducer:Tf,useRef:jv,useState:function(){return Tf(Ya)},useDebugValue:wp,useDeferredValue:function(e,t){var a=Fe();return xe===null?Cp(a,e,t):eb(a,xe.memoizedState,e,t)},useTransition:function(){var e=Tf(Ya)[0],t=Fe().memoizedState;return[typeof e=="boolean"?e:li(e),t]},useSyncExternalStore:Bv,useId:rb,useHostTransitionStatus:Sp,useFormState:Xg,useActionState:Xg,useOptimistic:function(e,t){var a=Fe();return xe!==null?Hv(a,xe,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:vp,useCacheRefresh:lb};db.useEffectEvent=Kv;function Pf(e,t,a,o){t=e.memoizedState,a=a(o,t),a=a==null?t:Ae({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Rc={enqueueSetState:function(e,t,a){e=e._reactInternals;var o=zt(),r=Io(o);r.payload=t,a!=null&&(r.callback=a),t=ko(e,r,o),t!==null&&(Ct(t,e,o),Mn(t,e,o))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var o=zt(),r=Io(o);r.tag=1,r.payload=t,a!=null&&(r.callback=a),t=ko(e,r,o),t!==null&&(Ct(t,e,o),Mn(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=zt(),o=Io(a);o.tag=2,t!=null&&(o.callback=t),t=ko(e,o,a),t!==null&&(Ct(t,e,a),Mn(t,e,a))}};function Kg(e,t,a,o,r,l,n){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,l,n):t.prototype&&t.prototype.isPureReactComponent?!Hn(a,o)||!Hn(r,l):!0}function Wg(e,t,a,o){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,o),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,o),t.state!==e&&Rc.enqueueReplaceState(t,t.state,null)}function mr(e,t){var a=t;if("ref"in t){a={};for(var o in t)o!=="ref"&&(a[o]=t[o])}if(e=e.defaultProps){a===t&&(a=Ae({},a));for(var r in e)a[r]===void 0&&(a[r]=e[r])}return a}function fb(e){Ys(e)}function cb(e){console.error(e)}function pb(e){Ys(e)}function lu(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(o){setTimeout(function(){throw o})}}function Zg(e,t,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function Ic(e,t,a){return a=Io(a),a.tag=3,a.payload={element:null},a.callback=function(){lu(e,t)},a}function mb(e){return e=Io(e),e.tag=3,e}function hb(e,t,a,o){var r=a.type.getDerivedStateFromError;if(typeof r=="function"){var l=o.value;e.payload=function(){return r(l)},e.callback=function(){Zg(t,a,o)}}var n=a.stateNode;n!==null&&typeof n.componentDidCatch=="function"&&(e.callback=function(){Zg(t,a,o),typeof r!="function"&&(Ao===null?Ao=new Set([this]):Ao.add(this));var i=o.stack;this.componentDidCatch(o.value,{componentStack:i!==null?i:""})})}function I2(e,t,a,o,r){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(t=a.alternate,t!==null&&El(t,a,r,!0),a=_t.current,a!==null){switch(a.tag){case 31:case 13:return Qt===null?du():a.alternate===null&&Ne===0&&(Ne=3),a.flags&=-257,a.flags|=65536,a.lanes=r,o===eu?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([o]):t.add(o),Vf(e,o,r)),!1;case 22:return a.flags|=65536,o===eu?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([o]):a.add(o)),Vf(e,o,r)),!1}throw Error(R(435,a.tag))}return Vf(e,o,r),du(),!1}if(ie)return t=_t.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=r,o!==pc&&(e=Error(R(422),{cause:o}),Gn(Zt(e,a)))):(o!==pc&&(t=Error(R(423),{cause:o}),Gn(Zt(t,a))),e=e.current.alternate,e.flags|=65536,r&=-r,e.lanes|=r,o=Zt(o,a),r=Ic(e.stateNode,o,r),Df(e,r),Ne!==4&&(Ne=2)),!1;var l=Error(R(520),{cause:o});if(l=Zt(l,a),Bn===null?Bn=[l]:Bn.push(l),Ne!==4&&(Ne=2),t===null)return!0;o=Zt(o,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=r&-r,a.lanes|=e,e=Ic(a.stateNode,o,e),Df(a,e),!1;case 1:if(t=a.type,l=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||l!==null&&typeof l.componentDidCatch=="function"&&(Ao===null||!Ao.has(l))))return a.flags|=65536,r&=-r,a.lanes|=r,r=mb(r),hb(r,e,a,o),Df(a,r),!1}a=a.return}while(a!==null);return!1}var Ip=Error(R(461)),Ge=!1;function tt(e,t,a,o){t.child=e===null?Mv(t,null,a,o):cr(t,e.child,a,o)}function Yg(e,t,a,o,r){a=a.render;var l=t.ref;if("ref"in o){var n={};for(var i in o)i!=="ref"&&(n[i]=o[i])}else n=o;return fr(t),o=mp(e,t,a,n,l,r),i=hp(),e!==null&&!Ge?(gp(e,t,r),Qa(e,t,r)):(ie&&i&&np(t),t.flags|=1,tt(e,t,o,r),t.child)}function Qg(e,t,a,o,r){if(e===null){var l=a.type;return typeof l=="function"&&!lp(l)&&l.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=l,gb(e,t,l,o,r)):(e=Os(a.type,null,o,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!kp(e,r)){var n=l.memoizedProps;if(a=a.compare,a=a!==null?a:Hn,a(n,o)&&e.ref===t.ref)return Qa(e,t,r)}return t.flags|=1,e=Xa(l,o),e.ref=t.ref,e.return=t,t.child=e}function gb(e,t,a,o,r){if(e!==null){var l=e.memoizedProps;if(Hn(l,o)&&e.ref===t.ref)if(Ge=!1,t.pendingProps=o=l,kp(e,r))e.flags&131072&&(Ge=!0);else return t.lanes=e.lanes,Qa(e,t,r)}return kc(e,t,a,o,r)}function xb(e,t,a,o){var r=o.children,l=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if(t.flags&128){if(l=l!==null?l.baseLanes|a:a,e!==null){for(o=t.child=e.child,r=0;o!==null;)r=r|o.lanes|o.childLanes,o=o.sibling;o=r&~l}else o=0,t.child=null;return Jg(e,t,l,a,o)}if(a&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Bs(t,l!==null?l.cachePool:null),l!==null?_g(t,l):yc(),Tv(t);else return o=t.lanes=536870912,Jg(e,t,l!==null?l.baseLanes|a:a,a,o)}else l!==null?(Bs(t,l.cachePool),_g(t,l),xo(t),t.memoizedState=null):(e!==null&&Bs(t,null),yc(),xo(t));return tt(e,t,r,a),t.child}function Sn(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Jg(e,t,a,o,r){var l=up();return l=l===null?null:{parent:qe._currentValue,pool:l},t.memoizedState={baseLanes:a,cachePool:l},e!==null&&Bs(t,null),yc(),Tv(t),e!==null&&El(e,t,o,!0),t.childLanes=r,null}function zs(e,t){return t=nu({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function $g(e,t,a){return cr(t,e.child,null,a),e=zs(t,t.pendingProps),e.flags|=2,Tt(t),t.memoizedState=null,e}function k2(e,t,a){var o=t.pendingProps,r=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ie){if(o.mode==="hidden")return e=zs(t,o),t.lanes=536870912,Sn(null,e);if(wc(t),(e=ke)?(e=u0(e,Yt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Po!==null?{id:va,overflow:ba}:null,retryLane:536870912,hydrationErrors:null},a=Cv(e),a.return=t,t.child=a,ot=t,ke=null)):e=null,e===null)throw Oo(t);return t.lanes=536870912,null}return zs(t,o)}var l=e.memoizedState;if(l!==null){var n=l.dehydrated;if(wc(t),r)if(t.flags&256)t.flags&=-257,t=$g(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(R(558));else if(Ge||El(e,t,a,!1),r=(a&e.childLanes)!==0,Ge||r){if(o=be,o!==null&&(n=Wx(o,a),n!==0&&n!==l.retryLane))throw l.retryLane=n,vr(e,n),Ct(o,e,n),Ip;du(),t=$g(e,t,a)}else e=l.treeContext,ke=Jt(n.nextSibling),ot=t,ie=!0,Ro=null,Yt=!1,e!==null&&Lv(t,e),t=zs(t,o),t.flags|=4096;return t}return e=Xa(e.child,{mode:o.mode,children:o.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Fs(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(R(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function kc(e,t,a,o,r){return fr(t),a=mp(e,t,a,o,void 0,r),o=hp(),e!==null&&!Ge?(gp(e,t,r),Qa(e,t,r)):(ie&&o&&np(t),t.flags|=1,tt(e,t,a,r),t.child)}function ex(e,t,a,o,r,l){return fr(t),t.updateQueue=null,a=Ov(t,o,a,r),Pv(e),o=hp(),e!==null&&!Ge?(gp(e,t,l),Qa(e,t,l)):(ie&&o&&np(t),t.flags|=1,tt(e,t,a,l),t.child)}function tx(e,t,a,o,r){if(fr(t),t.stateNode===null){var l=nl,n=a.contextType;typeof n=="object"&&n!==null&&(l=rt(n)),l=new a(o,l),t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=Rc,t.stateNode=l,l._reactInternals=t,l=t.stateNode,l.props=o,l.state=t.memoizedState,l.refs={},fp(t),n=a.contextType,l.context=typeof n=="object"&&n!==null?rt(n):nl,l.state=t.memoizedState,n=a.getDerivedStateFromProps,typeof n=="function"&&(Pf(t,a,n,o),l.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(n=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),n!==l.state&&Rc.enqueueReplaceState(l,l.state,null),Dn(t,o,l,r),En(),l.state=t.memoizedState),typeof l.componentDidMount=="function"&&(t.flags|=4194308),o=!0}else if(e===null){l=t.stateNode;var i=t.memoizedProps,s=mr(a,i);l.props=s;var u=l.context,d=a.contextType;n=nl,typeof d=="object"&&d!==null&&(n=rt(d));var f=a.getDerivedStateFromProps;d=typeof f=="function"||typeof l.getSnapshotBeforeUpdate=="function",i=t.pendingProps!==i,d||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i||u!==n)&&Wg(t,l,o,n),mo=!1;var c=t.memoizedState;l.state=c,Dn(t,o,l,r),En(),u=t.memoizedState,i||c!==u||mo?(typeof f=="function"&&(Pf(t,a,f,o),u=t.memoizedState),(s=mo||Kg(t,a,s,o,c,u,n))?(d||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=o,t.memoizedState=u),l.props=o,l.state=u,l.context=n,o=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),o=!1)}else{l=t.stateNode,vc(e,t),n=t.memoizedProps,d=mr(a,n),l.props=d,f=t.pendingProps,c=l.context,u=a.contextType,s=nl,typeof u=="object"&&u!==null&&(s=rt(u)),i=a.getDerivedStateFromProps,(u=typeof i=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(n!==f||c!==s)&&Wg(t,l,o,s),mo=!1,c=t.memoizedState,l.state=c,Dn(t,o,l,r),En();var m=t.memoizedState;n!==f||c!==m||mo||e!==null&&e.dependencies!==null&&$s(e.dependencies)?(typeof i=="function"&&(Pf(t,a,i,o),m=t.memoizedState),(d=mo||Kg(t,a,d,o,c,m,s)||e!==null&&e.dependencies!==null&&$s(e.dependencies))?(u||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(o,m,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(o,m,s)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||n===e.memoizedProps&&c===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||n===e.memoizedProps&&c===e.memoizedState||(t.flags|=1024),t.memoizedProps=o,t.memoizedState=m),l.props=o,l.state=m,l.context=s,o=d):(typeof l.componentDidUpdate!="function"||n===e.memoizedProps&&c===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||n===e.memoizedProps&&c===e.memoizedState||(t.flags|=1024),o=!1)}return l=o,Fs(e,t),o=(t.flags&128)!==0,l||o?(l=t.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:l.render(),t.flags|=1,e!==null&&o?(t.child=cr(t,e.child,null,r),t.child=cr(t,null,a,r)):tt(e,t,a,r),t.memoizedState=l.state,e=t.child):e=Qa(e,t,r),e}function ax(e,t,a,o){return dr(),t.flags|=256,tt(e,t,a,o),t.child}var Of={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Bf(e){return{baseLanes:e,cachePool:Iv()}}function Nf(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=Ot),e}function vb(e,t,a){var o=t.pendingProps,r=!1,l=(t.flags&128)!==0,n;if((n=l)||(n=e!==null&&e.memoizedState===null?!1:(ze.current&2)!==0),n&&(r=!0,t.flags&=-129),n=(t.flags&32)!==0,t.flags&=-33,e===null){if(ie){if(r?go(t):xo(t),(e=ke)?(e=u0(e,Yt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Po!==null?{id:va,overflow:ba}:null,retryLane:536870912,hydrationErrors:null},a=Cv(e),a.return=t,t.child=a,ot=t,ke=null)):e=null,e===null)throw Oo(t);return Hc(e)?t.lanes=32:t.lanes=536870912,null}var i=o.children;return o=o.fallback,r?(xo(t),r=t.mode,i=nu({mode:"hidden",children:i},r),o=nr(o,r,a,null),i.return=t,o.return=t,i.sibling=o,t.child=i,o=t.child,o.memoizedState=Bf(a),o.childLanes=Nf(e,n,a),t.memoizedState=Of,Sn(null,o)):(go(t),Ac(t,i))}var s=e.memoizedState;if(s!==null&&(i=s.dehydrated,i!==null)){if(l)t.flags&256?(go(t),t.flags&=-257,t=Uf(e,t,a)):t.memoizedState!==null?(xo(t),t.child=e.child,t.flags|=128,t=null):(xo(t),i=o.fallback,r=t.mode,o=nu({mode:"visible",children:o.children},r),i=nr(i,r,a,null),i.flags|=2,o.return=t,i.return=t,o.sibling=i,t.child=o,cr(t,e.child,null,a),o=t.child,o.memoizedState=Bf(a),o.childLanes=Nf(e,n,a),t.memoizedState=Of,t=Sn(null,o));else if(go(t),Hc(i)){if(n=i.nextSibling&&i.nextSibling.dataset,n)var u=n.dgst;n=u,o=Error(R(419)),o.stack="",o.digest=n,Gn({value:o,source:null,stack:null}),t=Uf(e,t,a)}else if(Ge||El(e,t,a,!1),n=(a&e.childLanes)!==0,Ge||n){if(n=be,n!==null&&(o=Wx(n,a),o!==0&&o!==s.retryLane))throw s.retryLane=o,vr(e,o),Ct(n,e,o),Ip;_c(i)||du(),t=Uf(e,t,a)}else _c(i)?(t.flags|=192,t.child=e.child,t=null):(e=s.treeContext,ke=Jt(i.nextSibling),ot=t,ie=!0,Ro=null,Yt=!1,e!==null&&Lv(t,e),t=Ac(t,o.children),t.flags|=4096);return t}return r?(xo(t),i=o.fallback,r=t.mode,s=e.child,u=s.sibling,o=Xa(s,{mode:"hidden",children:o.children}),o.subtreeFlags=s.subtreeFlags&65011712,u!==null?i=Xa(u,i):(i=nr(i,r,a,null),i.flags|=2),i.return=t,o.return=t,o.sibling=i,t.child=o,Sn(null,o),o=t.child,i=e.child.memoizedState,i===null?i=Bf(a):(r=i.cachePool,r!==null?(s=qe._currentValue,r=r.parent!==s?{parent:s,pool:s}:r):r=Iv(),i={baseLanes:i.baseLanes|a,cachePool:r}),o.memoizedState=i,o.childLanes=Nf(e,n,a),t.memoizedState=Of,Sn(e.child,o)):(go(t),a=e.child,e=a.sibling,a=Xa(a,{mode:"visible",children:o.children}),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a)}function Ac(e,t){return t=nu({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function nu(e,t){return e=Pt(22,e,null,t),e.lanes=0,e}function Uf(e,t,a){return cr(t,e.child,null,a),e=Ac(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ox(e,t,a){e.lanes|=t;var o=e.alternate;o!==null&&(o.lanes|=t),hc(e.return,t,a)}function zf(e,t,a,o,r,l){var n=e.memoizedState;n===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:r,treeForkCount:l}:(n.isBackwards=t,n.rendering=null,n.renderingStartTime=0,n.last=o,n.tail=a,n.tailMode=r,n.treeForkCount=l)}function bb(e,t,a){var o=t.pendingProps,r=o.revealOrder,l=o.tail;o=o.children;var n=ze.current,i=(n&2)!==0;if(i?(n=n&1|2,t.flags|=128):n&=1,we(ze,n),tt(e,t,o,a),o=ie?qn:0,!i&&e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ox(e,a,t);else if(e.tag===19)ox(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(r){case"forwards":for(a=t.child,r=null;a!==null;)e=a.alternate,e!==null&&au(e)===null&&(r=a),a=a.sibling;a=r,a===null?(r=t.child,t.child=null):(r=a.sibling,a.sibling=null),zf(t,!1,r,a,l,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&au(e)===null){t.child=r;break}e=r.sibling,r.sibling=a,a=r,r=e}zf(t,!0,a,null,l,o);break;case"together":zf(t,!1,null,null,void 0,o);break;default:t.memoizedState=null}return t.child}function Qa(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),No|=t.lanes,!(a&t.childLanes))if(e!==null){if(El(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(R(153));if(t.child!==null){for(e=t.child,a=Xa(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Xa(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function kp(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&$s(e)))}function A2(e,t,a){switch(t.tag){case 3:js(t,t.stateNode.containerInfo),ho(t,qe,e.memoizedState.cache),dr();break;case 27:case 5:ac(t);break;case 4:js(t,t.stateNode.containerInfo);break;case 10:ho(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,wc(t),null;break;case 13:var o=t.memoizedState;if(o!==null)return o.dehydrated!==null?(go(t),t.flags|=128,null):a&t.child.childLanes?vb(e,t,a):(go(t),e=Qa(e,t,a),e!==null?e.sibling:null);go(t);break;case 19:var r=(e.flags&128)!==0;if(o=(a&t.childLanes)!==0,o||(El(e,t,a,!1),o=(a&t.childLanes)!==0),r){if(o)return bb(e,t,a);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),we(ze,ze.current),o)break;return null;case 22:return t.lanes=0,xb(e,t,a,t.pendingProps);case 24:ho(t,qe,e.memoizedState.cache)}return Qa(e,t,a)}function yb(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ge=!0;else{if(!kp(e,a)&&!(t.flags&128))return Ge=!1,A2(e,t,a);Ge=!!(e.flags&131072)}else Ge=!1,ie&&t.flags&1048576&&Sv(t,qn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var o=t.pendingProps;if(e=or(t.elementType),t.type=e,typeof e=="function")lp(e)?(o=mr(e,o),t.tag=1,t=tx(null,t,e,o,a)):(t.tag=0,t=kc(null,t,e,o,a));else{if(e!=null){var r=e.$$typeof;if(r===Xc){t.tag=11,t=Yg(null,t,e,o,a);break e}else if(r===jc){t.tag=14,t=Qg(null,t,e,o,a);break e}}throw t=ec(e)||e,Error(R(306,t,""))}}return t;case 0:return kc(e,t,t.type,t.pendingProps,a);case 1:return o=t.type,r=mr(o,t.pendingProps),tx(e,t,o,r,a);case 3:e:{if(js(t,t.stateNode.containerInfo),e===null)throw Error(R(387));o=t.pendingProps;var l=t.memoizedState;r=l.element,vc(e,t),Dn(t,o,null,a);var n=t.memoizedState;if(o=n.cache,ho(t,qe,o),o!==l.cache&&gc(t,[qe],a,!0),En(),o=n.element,l.isDehydrated)if(l={element:o,isDehydrated:!1,cache:n.cache},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){t=ax(e,t,o,a);break e}else if(o!==r){r=Zt(Error(R(424)),t),Gn(r),t=ax(e,t,o,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(ke=Jt(e.firstChild),ot=t,ie=!0,Ro=null,Yt=!0,a=Mv(t,null,o,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(dr(),o===r){t=Qa(e,t,a);break e}tt(e,t,o,a)}t=t.child}return t;case 26:return Fs(e,t),e===null?(a=Rx(t.type,null,t.pendingProps,null))?t.memoizedState=a:ie||(a=t.type,e=t.pendingProps,o=mu(Lo.current).createElement(a),o[at]=t,o[St]=e,lt(o,a,e),Je(o),t.stateNode=o):t.memoizedState=Rx(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ac(t),e===null&&ie&&(o=t.stateNode=d0(t.type,t.pendingProps,Lo.current),ot=t,Yt=!0,r=ke,zo(t.type)?(qc=r,ke=Jt(o.firstChild)):ke=r),tt(e,t,t.pendingProps.children,a),Fs(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ie&&((r=o=ke)&&(o=aR(o,t.type,t.pendingProps,Yt),o!==null?(t.stateNode=o,ot=t,ke=Jt(o.firstChild),Yt=!1,r=!0):r=!1),r||Oo(t)),ac(t),r=t.type,l=t.pendingProps,n=e!==null?e.memoizedProps:null,o=l.children,zc(r,l)?o=null:n!==null&&zc(r,n)&&(t.flags|=32),t.memoizedState!==null&&(r=mp(e,t,b2,null,null,a),Zn._currentValue=r),Fs(e,t),tt(e,t,o,a),t.child;case 6:return e===null&&ie&&((e=a=ke)&&(a=oR(a,t.pendingProps,Yt),a!==null?(t.stateNode=a,ot=t,ke=null,e=!0):e=!1),e||Oo(t)),null;case 13:return vb(e,t,a);case 4:return js(t,t.stateNode.containerInfo),o=t.pendingProps,e===null?t.child=cr(t,null,o,a):tt(e,t,o,a),t.child;case 11:return Yg(e,t,t.type,t.pendingProps,a);case 7:return tt(e,t,t.pendingProps,a),t.child;case 8:return tt(e,t,t.pendingProps.children,a),t.child;case 12:return tt(e,t,t.pendingProps.children,a),t.child;case 10:return o=t.pendingProps,ho(t,t.type,o.value),tt(e,t,o.children,a),t.child;case 9:return r=t.type._context,o=t.pendingProps.children,fr(t),r=rt(r),o=o(r),t.flags|=1,tt(e,t,o,a),t.child;case 14:return Qg(e,t,t.type,t.pendingProps,a);case 15:return gb(e,t,t.type,t.pendingProps,a);case 19:return bb(e,t,a);case 31:return k2(e,t,a);case 22:return xb(e,t,a,t.pendingProps);case 24:return fr(t),o=rt(qe),e===null?(r=up(),r===null&&(r=be,l=sp(),r.pooledCache=l,l.refCount++,l!==null&&(r.pooledCacheLanes|=a),r=l),t.memoizedState={parent:o,cache:r},fp(t),ho(t,qe,r)):(e.lanes&a&&(vc(e,t),Dn(t,null,null,a),En()),r=e.memoizedState,l=t.memoizedState,r.parent!==o?(r={parent:o,cache:o},t.memoizedState=r,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=r),ho(t,qe,o)):(o=l.cache,ho(t,qe,o),o!==r.cache&&gc(t,[qe],a,!0))),tt(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(R(156,t.tag))}function Na(e){e.flags|=4}function Ff(e,t,a,o,r){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(r&335544128)===r)if(e.stateNode.complete)e.flags|=8192;else if(Vb())e.flags|=8192;else throw sr=eu,dp}else e.flags&=-16777217}function rx(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!p0(t))if(Vb())e.flags|=8192;else throw sr=eu,dp}function Ss(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Xx():536870912,e.lanes|=t,Sl|=t)}function gn(e,t){if(!ie)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ie(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(t)for(var r=e.child;r!==null;)a|=r.lanes|r.childLanes,o|=r.subtreeFlags&65011712,o|=r.flags&65011712,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)a|=r.lanes|r.childLanes,o|=r.subtreeFlags,o|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=o,e.childLanes=a,t}function M2(e,t,a){var o=t.pendingProps;switch(ip(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ie(t),null;case 1:return Ie(t),null;case 3:return a=t.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),t.memoizedState.cache!==o&&(t.flags|=2048),ja(qe),xl(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Wr(t)?Na(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ef())),Ie(t),null;case 26:var r=t.type,l=t.memoizedState;return e===null?(Na(t),l!==null?(Ie(t),rx(t,l)):(Ie(t),Ff(t,r,null,o,a))):l?l!==e.memoizedState?(Na(t),Ie(t),rx(t,l)):(Ie(t),t.flags&=-16777217):(e=e.memoizedProps,e!==o&&Na(t),Ie(t),Ff(t,r,e,o,a)),null;case 27:if(Ks(t),a=Lo.current,r=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==o&&Na(t);else{if(!o){if(t.stateNode===null)throw Error(R(166));return Ie(t),null}e=wa.current,Wr(t)?Pg(t,e):(e=d0(r,o,a),t.stateNode=e,Na(t))}return Ie(t),null;case 5:if(Ks(t),r=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==o&&Na(t);else{if(!o){if(t.stateNode===null)throw Error(R(166));return Ie(t),null}if(l=wa.current,Wr(t))Pg(t,l);else{var n=mu(Lo.current);switch(l){case 1:l=n.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:l=n.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":l=n.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":l=n.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":l=n.createElement("div"),l.innerHTML="<script><\/script>",l=l.removeChild(l.firstChild);break;case"select":l=typeof o.is=="string"?n.createElement("select",{is:o.is}):n.createElement("select"),o.multiple?l.multiple=!0:o.size&&(l.size=o.size);break;default:l=typeof o.is=="string"?n.createElement(r,{is:o.is}):n.createElement(r)}}l[at]=t,l[St]=o;e:for(n=t.child;n!==null;){if(n.tag===5||n.tag===6)l.appendChild(n.stateNode);else if(n.tag!==4&&n.tag!==27&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}t.stateNode=l;e:switch(lt(l,r,o),r){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&Na(t)}}return Ie(t),Ff(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==o&&Na(t);else{if(typeof o!="string"&&t.stateNode===null)throw Error(R(166));if(e=Lo.current,Wr(t)){if(e=t.stateNode,a=t.memoizedProps,o=null,r=ot,r!==null)switch(r.tag){case 27:case 5:o=r.memoizedProps}e[at]=t,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||n0(e.nodeValue,a)),e||Oo(t,!0)}else e=mu(e).createTextNode(o),e[at]=t,t.stateNode=e}return Ie(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(o=Wr(t),a!==null){if(e===null){if(!o)throw Error(R(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(557));e[at]=t}else dr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ie(t),e=!1}else a=Ef(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(Tt(t),t):(Tt(t),null);if(t.flags&128)throw Error(R(558))}return Ie(t),null;case 13:if(o=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(r=Wr(t),o!==null&&o.dehydrated!==null){if(e===null){if(!r)throw Error(R(318));if(r=t.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(R(317));r[at]=t}else dr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ie(t),r=!1}else r=Ef(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),r=!0;if(!r)return t.flags&256?(Tt(t),t):(Tt(t),null)}return Tt(t),t.flags&128?(t.lanes=a,t):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=t.child,r=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(r=o.alternate.memoizedState.cachePool.pool),l=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(l=o.memoizedState.cachePool.pool),l!==r&&(o.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),Ss(t,t.updateQueue),Ie(t),null);case 4:return xl(),e===null&&Op(t.stateNode.containerInfo),Ie(t),null;case 10:return ja(t.type),Ie(t),null;case 19:if($e(ze),o=t.memoizedState,o===null)return Ie(t),null;if(r=(t.flags&128)!==0,l=o.rendering,l===null)if(r)gn(o,!1);else{if(Ne!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=au(e),l!==null){for(t.flags|=128,gn(o,!1),e=l.updateQueue,t.updateQueue=e,Ss(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)wv(a,e),a=a.sibling;return we(ze,ze.current&1|2),ie&&_a(t,o.treeForkCount),t.child}e=e.sibling}o.tail!==null&&Bt()>su&&(t.flags|=128,r=!0,gn(o,!1),t.lanes=4194304)}else{if(!r)if(e=au(l),e!==null){if(t.flags|=128,r=!0,e=e.updateQueue,t.updateQueue=e,Ss(t,e),gn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!l.alternate&&!ie)return Ie(t),null}else 2*Bt()-o.renderingStartTime>su&&a!==536870912&&(t.flags|=128,r=!0,gn(o,!1),t.lanes=4194304);o.isBackwards?(l.sibling=t.child,t.child=l):(e=o.last,e!==null?e.sibling=l:t.child=l,o.last=l)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Bt(),e.sibling=null,a=ze.current,we(ze,r?a&1|2:a&1),ie&&_a(t,o.treeForkCount),e):(Ie(t),null);case 22:case 23:return Tt(t),cp(),o=t.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(t.flags|=8192):o&&(t.flags|=8192),o?a&536870912&&!(t.flags&128)&&(Ie(t),t.subtreeFlags&6&&(t.flags|=8192)):Ie(t),a=t.updateQueue,a!==null&&Ss(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(o=t.memoizedState.cachePool.pool),o!==a&&(t.flags|=2048),e!==null&&$e(ir),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),ja(qe),Ie(t),null;case 25:return null;case 30:return null}throw Error(R(156,t.tag))}function E2(e,t){switch(ip(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ja(qe),xl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ks(t),null;case 31:if(t.memoizedState!==null){if(Tt(t),t.alternate===null)throw Error(R(340));dr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Tt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(R(340));dr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return $e(ze),null;case 4:return xl(),null;case 10:return ja(t.type),null;case 22:case 23:return Tt(t),cp(),e!==null&&$e(ir),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ja(qe),null;case 25:return null;default:return null}}function wb(e,t){switch(ip(t),t.tag){case 3:ja(qe),xl();break;case 26:case 27:case 5:Ks(t);break;case 4:xl();break;case 31:t.memoizedState!==null&&Tt(t);break;case 13:Tt(t);break;case 19:$e(ze);break;case 10:ja(t.type);break;case 22:case 23:Tt(t),cp(),e!==null&&$e(ir);break;case 24:ja(qe)}}function ni(e,t){try{var a=t.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var r=o.next;a=r;do{if((a.tag&e)===e){o=void 0;var l=a.create,n=a.inst;o=l(),n.destroy=o}a=a.next}while(a!==r)}}catch(i){he(t,t.return,i)}}function Bo(e,t,a){try{var o=t.updateQueue,r=o!==null?o.lastEffect:null;if(r!==null){var l=r.next;o=l;do{if((o.tag&e)===e){var n=o.inst,i=n.destroy;if(i!==void 0){n.destroy=void 0,r=t;var s=a,u=i;try{u()}catch(d){he(r,s,d)}}}o=o.next}while(o!==l)}}catch(d){he(t,t.return,d)}}function Cb(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Dv(t,a)}catch(o){he(e,e.return,o)}}}function Sb(e,t,a){a.props=mr(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){he(e,t,o)}}function Pn(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(r){he(e,t,r)}}function ya(e,t){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(r){he(e,t,r)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(r){he(e,t,r)}else a.current=null}function Lb(e){var t=e.type,a=e.memoizedProps,o=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(r){he(e,e.return,r)}}function _f(e,t,a){try{var o=e.stateNode;Y2(o,e.type,a,t),o[St]=t}catch(r){he(e,e.return,r)}}function Rb(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&zo(e.type)||e.tag===4}function Hf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Rb(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&zo(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Mc(e,t,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Ga));else if(o!==4&&(o===27&&zo(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Mc(e,t,a),e=e.sibling;e!==null;)Mc(e,t,a),e=e.sibling}function iu(e,t,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(o!==4&&(o===27&&zo(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(iu(e,t,a),e=e.sibling;e!==null;)iu(e,t,a),e=e.sibling}function Ib(e){var t=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,r=t.attributes;r.length;)t.removeAttributeNode(r[0]);lt(t,o,a),t[at]=e,t[St]=a}catch(l){he(e,e.return,l)}}var Ha=!1,He=!1,qf=!1,lx=typeof WeakSet=="function"?WeakSet:Set,Qe=null;function D2(e,t){if(e=e.containerInfo,Nc=vu,e=pv(e),ap(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var r=o.anchorOffset,l=o.focusNode;o=o.focusOffset;try{a.nodeType,l.nodeType}catch{a=null;break e}var n=0,i=-1,s=-1,u=0,d=0,f=e,c=null;t:for(;;){for(var m;f!==a||r!==0&&f.nodeType!==3||(i=n+r),f!==l||o!==0&&f.nodeType!==3||(s=n+o),f.nodeType===3&&(n+=f.nodeValue.length),(m=f.firstChild)!==null;)c=f,f=m;for(;;){if(f===e)break t;if(c===a&&++u===r&&(i=n),c===l&&++d===o&&(s=n),(m=f.nextSibling)!==null)break;f=c,c=f.parentNode}f=m}a=i===-1||s===-1?null:{start:i,end:s}}else a=null}a=a||{start:0,end:0}}else a=null;for(Uc={focusedElem:e,selectionRange:a},vu=!1,Qe=t;Qe!==null;)if(t=Qe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Qe=e;else for(;Qe!==null;){switch(t=Qe,l=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)r=e[a],r.ref.impl=r.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&l!==null){e=void 0,a=t,r=l.memoizedProps,l=l.memoizedState,o=a.stateNode;try{var b=mr(a.type,r);e=o.getSnapshotBeforeUpdate(b,l),o.__reactInternalSnapshotBeforeUpdate=e}catch(v){he(a,a.return,v)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)Fc(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Fc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(R(163))}if(e=t.sibling,e!==null){e.return=t.return,Qe=e;break}Qe=t.return}}function kb(e,t,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:za(e,a),o&4&&ni(5,a);break;case 1:if(za(e,a),o&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(n){he(a,a.return,n)}else{var r=mr(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(r,t,e.__reactInternalSnapshotBeforeUpdate)}catch(n){he(a,a.return,n)}}o&64&&Cb(a),o&512&&Pn(a,a.return);break;case 3:if(za(e,a),o&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Dv(e,t)}catch(n){he(a,a.return,n)}}break;case 27:t===null&&o&4&&Ib(a);case 26:case 5:za(e,a),t===null&&o&4&&Lb(a),o&512&&Pn(a,a.return);break;case 12:za(e,a);break;case 31:za(e,a),o&4&&Eb(e,a);break;case 13:za(e,a),o&4&&Db(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=_2.bind(null,a),rR(e,a))));break;case 22:if(o=a.memoizedState!==null||Ha,!o){t=t!==null&&t.memoizedState!==null||He,r=Ha;var l=He;Ha=o,(He=t)&&!l?Fa(e,a,(a.subtreeFlags&8772)!==0):za(e,a),Ha=r,He=l}break;case 30:break;default:za(e,a)}}function Ab(e){var t=e.alternate;t!==null&&(e.alternate=null,Ab(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Yc(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Te=null,yt=!1;function Ua(e,t,a){for(a=a.child;a!==null;)Mb(e,t,a),a=a.sibling}function Mb(e,t,a){if(Nt&&typeof Nt.onCommitFiberUnmount=="function")try{Nt.onCommitFiberUnmount($n,a)}catch{}switch(a.tag){case 26:He||ya(a,t),Ua(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:He||ya(a,t);var o=Te,r=yt;zo(a.type)&&(Te=a.stateNode,yt=!1),Ua(e,t,a),Un(a.stateNode),Te=o,yt=r;break;case 5:He||ya(a,t);case 6:if(o=Te,r=yt,Te=null,Ua(e,t,a),Te=o,yt=r,Te!==null)if(yt)try{(Te.nodeType===9?Te.body:Te.nodeName==="HTML"?Te.ownerDocument.body:Te).removeChild(a.stateNode)}catch(l){he(a,t,l)}else try{Te.removeChild(a.stateNode)}catch(l){he(a,t,l)}break;case 18:Te!==null&&(yt?(e=Te,yx(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),kl(e)):yx(Te,a.stateNode));break;case 4:o=Te,r=yt,Te=a.stateNode.containerInfo,yt=!0,Ua(e,t,a),Te=o,yt=r;break;case 0:case 11:case 14:case 15:Bo(2,a,t),He||Bo(4,a,t),Ua(e,t,a);break;case 1:He||(ya(a,t),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Sb(a,t,o)),Ua(e,t,a);break;case 21:Ua(e,t,a);break;case 22:He=(o=He)||a.memoizedState!==null,Ua(e,t,a),He=o;break;default:Ua(e,t,a)}}function Eb(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{kl(e)}catch(a){he(t,t.return,a)}}}function Db(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{kl(e)}catch(a){he(t,t.return,a)}}function T2(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new lx),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new lx),t;default:throw Error(R(435,e.tag))}}function Ls(e,t){var a=T2(e);t.forEach(function(o){if(!a.has(o)){a.add(o);var r=H2.bind(null,e,o);o.then(r,r)}})}function vt(e,t){var a=t.deletions;if(a!==null)for(var o=0;o<a.length;o++){var r=a[o],l=e,n=t,i=n;e:for(;i!==null;){switch(i.tag){case 27:if(zo(i.type)){Te=i.stateNode,yt=!1;break e}break;case 5:Te=i.stateNode,yt=!1;break e;case 3:case 4:Te=i.stateNode.containerInfo,yt=!0;break e}i=i.return}if(Te===null)throw Error(R(160));Mb(l,n,r),Te=null,yt=!1,l=r.alternate,l!==null&&(l.return=null),r.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Tb(t,e),t=t.sibling}var ia=null;function Tb(e,t){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:vt(t,e),bt(e),o&4&&(Bo(3,e,e.return),ni(3,e),Bo(5,e,e.return));break;case 1:vt(t,e),bt(e),o&512&&(He||a===null||ya(a,a.return)),o&64&&Ha&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var r=ia;if(vt(t,e),bt(e),o&512&&(He||a===null||ya(a,a.return)),o&4){var l=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){e:{o=e.type,a=e.memoizedProps,r=r.ownerDocument||r;t:switch(o){case"title":l=r.getElementsByTagName("title")[0],(!l||l[ai]||l[at]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=r.createElement(o),r.head.insertBefore(l,r.querySelector("head > title"))),lt(l,o,a),l[at]=e,Je(l),o=l;break e;case"link":var n=kx("link","href",r).get(o+(a.href||""));if(n){for(var i=0;i<n.length;i++)if(l=n[i],l.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&l.getAttribute("rel")===(a.rel==null?null:a.rel)&&l.getAttribute("title")===(a.title==null?null:a.title)&&l.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){n.splice(i,1);break t}}l=r.createElement(o),lt(l,o,a),r.head.appendChild(l);break;case"meta":if(n=kx("meta","content",r).get(o+(a.content||""))){for(i=0;i<n.length;i++)if(l=n[i],l.getAttribute("content")===(a.content==null?null:""+a.content)&&l.getAttribute("name")===(a.name==null?null:a.name)&&l.getAttribute("property")===(a.property==null?null:a.property)&&l.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&l.getAttribute("charset")===(a.charSet==null?null:a.charSet)){n.splice(i,1);break t}}l=r.createElement(o),lt(l,o,a),r.head.appendChild(l);break;default:throw Error(R(468,o))}l[at]=e,Je(l),o=l}e.stateNode=o}else Ax(r,e.type,e.stateNode);else e.stateNode=Ix(r,o,e.memoizedProps);else l!==o?(l===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):l.count--,o===null?Ax(r,e.type,e.stateNode):Ix(r,o,e.memoizedProps)):o===null&&e.stateNode!==null&&_f(e,e.memoizedProps,a.memoizedProps)}break;case 27:vt(t,e),bt(e),o&512&&(He||a===null||ya(a,a.return)),a!==null&&o&4&&_f(e,e.memoizedProps,a.memoizedProps);break;case 5:if(vt(t,e),bt(e),o&512&&(He||a===null||ya(a,a.return)),e.flags&32){r=e.stateNode;try{bl(r,"")}catch(b){he(e,e.return,b)}}o&4&&e.stateNode!=null&&(r=e.memoizedProps,_f(e,r,a!==null?a.memoizedProps:r)),o&1024&&(qf=!0);break;case 6:if(vt(t,e),bt(e),o&4){if(e.stateNode===null)throw Error(R(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(b){he(e,e.return,b)}}break;case 3:if(qs=null,r=ia,ia=hu(t.containerInfo),vt(t,e),ia=r,bt(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{kl(t.containerInfo)}catch(b){he(e,e.return,b)}qf&&(qf=!1,Pb(e));break;case 4:o=ia,ia=hu(e.stateNode.containerInfo),vt(t,e),bt(e),ia=o;break;case 12:vt(t,e),bt(e);break;case 31:vt(t,e),bt(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ls(e,o)));break;case 13:vt(t,e),bt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Du=Bt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ls(e,o)));break;case 22:r=e.memoizedState!==null;var s=a!==null&&a.memoizedState!==null,u=Ha,d=He;if(Ha=u||r,He=d||s,vt(t,e),He=d,Ha=u,bt(e),o&8192)e:for(t=e.stateNode,t._visibility=r?t._visibility&-2:t._visibility|1,r&&(a===null||s||Ha||He||rr(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){s=a=t;try{if(l=s.stateNode,r)n=l.style,typeof n.setProperty=="function"?n.setProperty("display","none","important"):n.display="none";else{i=s.stateNode;var f=s.memoizedProps.style,c=f!=null&&f.hasOwnProperty("display")?f.display:null;i.style.display=c==null||typeof c=="boolean"?"":(""+c).trim()}}catch(b){he(s,s.return,b)}}}else if(t.tag===6){if(a===null){s=t;try{s.stateNode.nodeValue=r?"":s.memoizedProps}catch(b){he(s,s.return,b)}}}else if(t.tag===18){if(a===null){s=t;try{var m=s.stateNode;r?wx(m,!0):wx(s.stateNode,!1)}catch(b){he(s,s.return,b)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Ls(e,a))));break;case 19:vt(t,e),bt(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Ls(e,o)));break;case 30:break;case 21:break;default:vt(t,e),bt(e)}}function bt(e){var t=e.flags;if(t&2){try{for(var a,o=e.return;o!==null;){if(Rb(o)){a=o;break}o=o.return}if(a==null)throw Error(R(160));switch(a.tag){case 27:var r=a.stateNode,l=Hf(e);iu(e,l,r);break;case 5:var n=a.stateNode;a.flags&32&&(bl(n,""),a.flags&=-33);var i=Hf(e);iu(e,i,n);break;case 3:case 4:var s=a.stateNode.containerInfo,u=Hf(e);Mc(e,u,s);break;default:throw Error(R(161))}}catch(d){he(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Pb(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Pb(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function za(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)kb(e,t.alternate,t),t=t.sibling}function rr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Bo(4,t,t.return),rr(t);break;case 1:ya(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&Sb(t,t.return,a),rr(t);break;case 27:Un(t.stateNode);case 26:case 5:ya(t,t.return),rr(t);break;case 22:t.memoizedState===null&&rr(t);break;case 30:rr(t);break;default:rr(t)}e=e.sibling}}function Fa(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var o=t.alternate,r=e,l=t,n=l.flags;switch(l.tag){case 0:case 11:case 15:Fa(r,l,a),ni(4,l);break;case 1:if(Fa(r,l,a),o=l,r=o.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(u){he(o,o.return,u)}if(o=l,r=o.updateQueue,r!==null){var i=o.stateNode;try{var s=r.shared.hiddenCallbacks;if(s!==null)for(r.shared.hiddenCallbacks=null,r=0;r<s.length;r++)Ev(s[r],i)}catch(u){he(o,o.return,u)}}a&&n&64&&Cb(l),Pn(l,l.return);break;case 27:Ib(l);case 26:case 5:Fa(r,l,a),a&&o===null&&n&4&&Lb(l),Pn(l,l.return);break;case 12:Fa(r,l,a);break;case 31:Fa(r,l,a),a&&n&4&&Eb(r,l);break;case 13:Fa(r,l,a),a&&n&4&&Db(r,l);break;case 22:l.memoizedState===null&&Fa(r,l,a),Pn(l,l.return);break;case 30:break;default:Fa(r,l,a)}t=t.sibling}}function Ap(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&ri(a))}function Mp(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ri(e))}function na(e,t,a,o){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ob(e,t,a,o),t=t.sibling}function Ob(e,t,a,o){var r=t.flags;switch(t.tag){case 0:case 11:case 15:na(e,t,a,o),r&2048&&ni(9,t);break;case 1:na(e,t,a,o);break;case 3:na(e,t,a,o),r&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ri(e)));break;case 12:if(r&2048){na(e,t,a,o),e=t.stateNode;try{var l=t.memoizedProps,n=l.id,i=l.onPostCommit;typeof i=="function"&&i(n,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(s){he(t,t.return,s)}}else na(e,t,a,o);break;case 31:na(e,t,a,o);break;case 13:na(e,t,a,o);break;case 23:break;case 22:l=t.stateNode,n=t.alternate,t.memoizedState!==null?l._visibility&2?na(e,t,a,o):On(e,t):l._visibility&2?na(e,t,a,o):(l._visibility|=2,Yr(e,t,a,o,(t.subtreeFlags&10256)!==0||!1)),r&2048&&Ap(n,t);break;case 24:na(e,t,a,o),r&2048&&Mp(t.alternate,t);break;default:na(e,t,a,o)}}function Yr(e,t,a,o,r){for(r=r&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var l=e,n=t,i=a,s=o,u=n.flags;switch(n.tag){case 0:case 11:case 15:Yr(l,n,i,s,r),ni(8,n);break;case 23:break;case 22:var d=n.stateNode;n.memoizedState!==null?d._visibility&2?Yr(l,n,i,s,r):On(l,n):(d._visibility|=2,Yr(l,n,i,s,r)),r&&u&2048&&Ap(n.alternate,n);break;case 24:Yr(l,n,i,s,r),r&&u&2048&&Mp(n.alternate,n);break;default:Yr(l,n,i,s,r)}t=t.sibling}}function On(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,o=t,r=o.flags;switch(o.tag){case 22:On(a,o),r&2048&&Ap(o.alternate,o);break;case 24:On(a,o),r&2048&&Mp(o.alternate,o);break;default:On(a,o)}t=t.sibling}}var Ln=8192;function Zr(e,t,a){if(e.subtreeFlags&Ln)for(e=e.child;e!==null;)Bb(e,t,a),e=e.sibling}function Bb(e,t,a){switch(e.tag){case 26:Zr(e,t,a),e.flags&Ln&&e.memoizedState!==null&&gR(a,ia,e.memoizedState,e.memoizedProps);break;case 5:Zr(e,t,a);break;case 3:case 4:var o=ia;ia=hu(e.stateNode.containerInfo),Zr(e,t,a),ia=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Ln,Ln=16777216,Zr(e,t,a),Ln=o):Zr(e,t,a));break;default:Zr(e,t,a)}}function Nb(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function xn(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var a=0;a<t.length;a++){var o=t[a];Qe=o,zb(o,e)}Nb(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ub(e),e=e.sibling}function Ub(e){switch(e.tag){case 0:case 11:case 15:xn(e),e.flags&2048&&Bo(9,e,e.return);break;case 3:xn(e);break;case 12:xn(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,_s(e)):xn(e);break;default:xn(e)}}function _s(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var a=0;a<t.length;a++){var o=t[a];Qe=o,zb(o,e)}Nb(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Bo(8,t,t.return),_s(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,_s(t));break;default:_s(t)}e=e.sibling}}function zb(e,t){for(;Qe!==null;){var a=Qe;switch(a.tag){case 0:case 11:case 15:Bo(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:ri(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Qe=o;else e:for(a=e;Qe!==null;){o=Qe;var r=o.sibling,l=o.return;if(Ab(o),o===a){Qe=null;break e}if(r!==null){r.return=l,Qe=r;break e}Qe=l}}}var P2={getCacheForType:function(e){var t=rt(qe),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return rt(qe).controller.signal}},O2=typeof WeakMap=="function"?WeakMap:Map,fe=0,be=null,re=null,le=0,me=0,Dt=null,wo=!1,Tl=!1,Ep=!1,Ja=0,Ne=0,No=0,ur=0,Dp=0,Ot=0,Sl=0,Bn=null,wt=null,Ec=!1,Du=0,Fb=0,su=1/0,uu=null,Ao=null,Xe=0,Mo=null,Ll=null,Ka=0,Dc=0,Tc=null,_b=null,Nn=0,Pc=null;function zt(){return fe&2&&le!==0?le&-le:X.T!==null?Pp():Zx()}function Hb(){if(Ot===0)if(!(le&536870912)||ie){var e=ms;ms<<=1,!(ms&3932160)&&(ms=262144),Ot=e}else Ot=536870912;return e=_t.current,e!==null&&(e.flags|=32),Ot}function Ct(e,t,a){(e===be&&(me===2||me===9)||e.cancelPendingCommit!==null)&&(Rl(e,0),Co(e,le,Ot,!1)),ti(e,a),(!(fe&2)||e!==be)&&(e===be&&(!(fe&2)&&(ur|=a),Ne===4&&Co(e,le,Ot,!1)),Sa(e))}function qb(e,t,a){if(fe&6)throw Error(R(327));var o=!a&&(t&127)===0&&(t&e.expiredLanes)===0||ei(e,t),r=o?U2(e,t):Gf(e,t,!0),l=o;do{if(r===0){Tl&&!o&&Co(e,t,0,!1);break}else{if(a=e.current.alternate,l&&!B2(a)){r=Gf(e,t,!1),l=!1;continue}if(r===2){if(l=t,e.errorRecoveryDisabledLanes&l)var n=0;else n=e.pendingLanes&-536870913,n=n!==0?n:n&536870912?536870912:0;if(n!==0){t=n;e:{var i=e;r=Bn;var s=i.current.memoizedState.isDehydrated;if(s&&(Rl(i,n).flags|=256),n=Gf(i,n,!1),n!==2){if(Ep&&!s){i.errorRecoveryDisabledLanes|=l,ur|=l,r=4;break e}l=wt,wt=r,l!==null&&(wt===null?wt=l:wt.push.apply(wt,l))}r=n}if(l=!1,r!==2)continue}}if(r===1){Rl(e,0),Co(e,t,0,!0);break}e:{switch(o=e,l=r,l){case 0:case 1:throw Error(R(345));case 4:if((t&4194048)!==t)break;case 6:Co(o,t,Ot,!wo);break e;case 2:wt=null;break;case 3:case 5:break;default:throw Error(R(329))}if((t&62914560)===t&&(r=Du+300-Bt(),10<r)){if(Co(o,t,Ot,!wo),yu(o,0,!0)!==0)break e;Ka=t,o.timeoutHandle=s0(nx.bind(null,o,a,wt,uu,Ec,t,Ot,ur,Sl,wo,l,"Throttled",-0,0),r);break e}nx(o,a,wt,uu,Ec,t,Ot,ur,Sl,wo,l,null,-0,0)}}break}while(!0);Sa(e)}function nx(e,t,a,o,r,l,n,i,s,u,d,f,c,m){if(e.timeoutHandle=-1,f=t.subtreeFlags,f&8192||(f&16785408)===16785408){f={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ga},Bb(t,l,f);var b=(l&62914560)===l?Du-Bt():(l&4194048)===l?Fb-Bt():0;if(b=xR(f,b),b!==null){Ka=l,e.cancelPendingCommit=b(sx.bind(null,e,t,l,a,o,r,n,i,s,d,f,null,c,m)),Co(e,l,n,!u);return}}sx(e,t,l,a,o,r,n,i,s)}function B2(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var r=a[o],l=r.getSnapshot;r=r.value;try{if(!Ft(l(),r))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Co(e,t,a,o){t&=~Dp,t&=~ur,e.suspendedLanes|=t,e.pingedLanes&=~t,o&&(e.warmLanes|=t),o=e.expirationTimes;for(var r=t;0<r;){var l=31-Ut(r),n=1<<l;o[l]=-1,r&=~n}a!==0&&jx(e,a,t)}function Tu(){return fe&6?!0:(ii(0,!1),!1)}function Tp(){if(re!==null){if(me===0)var e=re.return;else e=re,Va=br=null,xp(e),ml=null,Vn=0,e=re;for(;e!==null;)wb(e.alternate,e),e=e.return;re=null}}function Rl(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,$2(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Ka=0,Tp(),be=e,re=a=Xa(e.current,null),le=t,me=0,Dt=null,wo=!1,Tl=ei(e,t),Ep=!1,Sl=Ot=Dp=ur=No=Ne=0,wt=Bn=null,Ec=!1,t&8&&(t|=t&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=t;0<o;){var r=31-Ut(o),l=1<<r;t|=e[r],o&=~l}return Ja=t,Lu(),a}function Gb(e,t){Y=null,X.H=jn,t===Dl||t===Iu?(t=zg(),me=3):t===dp?(t=zg(),me=4):me=t===Ip?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Dt=t,re===null&&(Ne=1,lu(e,Zt(t,e.current)))}function Vb(){var e=_t.current;return e===null?!0:(le&4194048)===le?Qt===null:(le&62914560)===le||le&536870912?e===Qt:!1}function Xb(){var e=X.H;return X.H=jn,e===null?jn:e}function jb(){var e=X.A;return X.A=P2,e}function du(){Ne=4,wo||(le&4194048)!==le&&_t.current!==null||(Tl=!0),!(No&134217727)&&!(ur&134217727)||be===null||Co(be,le,Ot,!1)}function Gf(e,t,a){var o=fe;fe|=2;var r=Xb(),l=jb();(be!==e||le!==t)&&(uu=null,Rl(e,t)),t=!1;var n=Ne;e:do try{if(me!==0&&re!==null){var i=re,s=Dt;switch(me){case 8:Tp(),n=6;break e;case 3:case 2:case 9:case 6:_t.current===null&&(t=!0);var u=me;if(me=0,Dt=null,ul(e,i,s,u),a&&Tl){n=0;break e}break;default:u=me,me=0,Dt=null,ul(e,i,s,u)}}N2(),n=Ne;break}catch(d){Gb(e,d)}while(!0);return t&&e.shellSuspendCounter++,Va=br=null,fe=o,X.H=r,X.A=l,re===null&&(be=null,le=0,Lu()),n}function N2(){for(;re!==null;)Kb(re)}function U2(e,t){var a=fe;fe|=2;var o=Xb(),r=jb();be!==e||le!==t?(uu=null,su=Bt()+500,Rl(e,t)):Tl=ei(e,t);e:do try{if(me!==0&&re!==null){t=re;var l=Dt;t:switch(me){case 1:me=0,Dt=null,ul(e,t,l,1);break;case 2:case 9:if(Ug(l)){me=0,Dt=null,ix(t);break}t=function(){me!==2&&me!==9||be!==e||(me=7),Sa(e)},l.then(t,t);break e;case 3:me=7;break e;case 4:me=5;break e;case 7:Ug(l)?(me=0,Dt=null,ix(t)):(me=0,Dt=null,ul(e,t,l,7));break;case 5:var n=null;switch(re.tag){case 26:n=re.memoizedState;case 5:case 27:var i=re;if(n?p0(n):i.stateNode.complete){me=0,Dt=null;var s=i.sibling;if(s!==null)re=s;else{var u=i.return;u!==null?(re=u,Pu(u)):re=null}break t}}me=0,Dt=null,ul(e,t,l,5);break;case 6:me=0,Dt=null,ul(e,t,l,6);break;case 8:Tp(),Ne=6;break e;default:throw Error(R(462))}}z2();break}catch(d){Gb(e,d)}while(!0);return Va=br=null,X.H=o,X.A=r,fe=a,re!==null?0:(be=null,le=0,Lu(),Ne)}function z2(){for(;re!==null&&!iL();)Kb(re)}function Kb(e){var t=yb(e.alternate,e,Ja);e.memoizedProps=e.pendingProps,t===null?Pu(e):re=t}function ix(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=ex(a,t,t.pendingProps,t.type,void 0,le);break;case 11:t=ex(a,t,t.pendingProps,t.type.render,t.ref,le);break;case 5:xp(t);default:wb(a,t),t=re=wv(t,Ja),t=yb(a,t,Ja)}e.memoizedProps=e.pendingProps,t===null?Pu(e):re=t}function ul(e,t,a,o){Va=br=null,xp(t),ml=null,Vn=0;var r=t.return;try{if(I2(e,r,t,a,le)){Ne=1,lu(e,Zt(a,e.current)),re=null;return}}catch(l){if(r!==null)throw re=r,l;Ne=1,lu(e,Zt(a,e.current)),re=null;return}t.flags&32768?(ie||o===1?e=!0:Tl||le&536870912?e=!1:(wo=e=!0,(o===2||o===9||o===3||o===6)&&(o=_t.current,o!==null&&o.tag===13&&(o.flags|=16384))),Wb(t,e)):Pu(t)}function Pu(e){var t=e;do{if(t.flags&32768){Wb(t,wo);return}e=t.return;var a=M2(t.alternate,t,Ja);if(a!==null){re=a;return}if(t=t.sibling,t!==null){re=t;return}re=t=e}while(t!==null);Ne===0&&(Ne=5)}function Wb(e,t){do{var a=E2(e.alternate,e);if(a!==null){a.flags&=32767,re=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){re=e;return}re=e=a}while(e!==null);Ne=6,re=null}function sx(e,t,a,o,r,l,n,i,s){e.cancelPendingCommit=null;do Ou();while(Xe!==0);if(fe&6)throw Error(R(327));if(t!==null){if(t===e.current)throw Error(R(177));if(l=t.lanes|t.childLanes,l|=op,xL(e,a,l,n,i,s),e===be&&(re=be=null,le=0),Ll=t,Mo=e,Ka=a,Dc=l,Tc=r,_b=o,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,q2(Ws,function(){return $b(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(t.flags&13878)!==0,t.subtreeFlags&13878||o){o=X.T,X.T=null,r=ce.p,ce.p=2,n=fe,fe|=4;try{D2(e,t,a)}finally{fe=n,ce.p=r,X.T=o}}Xe=1,Zb(),Yb(),Qb()}}function Zb(){if(Xe===1){Xe=0;var e=Mo,t=Ll,a=(t.flags&13878)!==0;if(t.subtreeFlags&13878||a){a=X.T,X.T=null;var o=ce.p;ce.p=2;var r=fe;fe|=4;try{Tb(t,e);var l=Uc,n=pv(e.containerInfo),i=l.focusedElem,s=l.selectionRange;if(n!==i&&i&&i.ownerDocument&&cv(i.ownerDocument.documentElement,i)){if(s!==null&&ap(i)){var u=s.start,d=s.end;if(d===void 0&&(d=u),"selectionStart"in i)i.selectionStart=u,i.selectionEnd=Math.min(d,i.value.length);else{var f=i.ownerDocument||document,c=f&&f.defaultView||window;if(c.getSelection){var m=c.getSelection(),b=i.textContent.length,v=Math.min(s.start,b),w=s.end===void 0?v:Math.min(s.end,b);!m.extend&&v>w&&(n=w,w=v,v=n);var h=Eg(i,v),p=Eg(i,w);if(h&&p&&(m.rangeCount!==1||m.anchorNode!==h.node||m.anchorOffset!==h.offset||m.focusNode!==p.node||m.focusOffset!==p.offset)){var g=f.createRange();g.setStart(h.node,h.offset),m.removeAllRanges(),v>w?(m.addRange(g),m.extend(p.node,p.offset)):(g.setEnd(p.node,p.offset),m.addRange(g))}}}}for(f=[],m=i;m=m.parentNode;)m.nodeType===1&&f.push({element:m,left:m.scrollLeft,top:m.scrollTop});for(typeof i.focus=="function"&&i.focus(),i=0;i<f.length;i++){var y=f[i];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}vu=!!Nc,Uc=Nc=null}finally{fe=r,ce.p=o,X.T=a}}e.current=t,Xe=2}}function Yb(){if(Xe===2){Xe=0;var e=Mo,t=Ll,a=(t.flags&8772)!==0;if(t.subtreeFlags&8772||a){a=X.T,X.T=null;var o=ce.p;ce.p=2;var r=fe;fe|=4;try{kb(e,t.alternate,t)}finally{fe=r,ce.p=o,X.T=a}}Xe=3}}function Qb(){if(Xe===4||Xe===3){Xe=0,sL();var e=Mo,t=Ll,a=Ka,o=_b;t.subtreeFlags&10256||t.flags&10256?Xe=5:(Xe=0,Ll=Mo=null,Jb(e,e.pendingLanes));var r=e.pendingLanes;if(r===0&&(Ao=null),Zc(a),t=t.stateNode,Nt&&typeof Nt.onCommitFiberRoot=="function")try{Nt.onCommitFiberRoot($n,t,void 0,(t.current.flags&128)===128)}catch{}if(o!==null){t=X.T,r=ce.p,ce.p=2,X.T=null;try{for(var l=e.onRecoverableError,n=0;n<o.length;n++){var i=o[n];l(i.value,{componentStack:i.stack})}}finally{X.T=t,ce.p=r}}Ka&3&&Ou(),Sa(e),r=e.pendingLanes,a&261930&&r&42?e===Pc?Nn++:(Nn=0,Pc=e):Nn=0,ii(0,!1)}}function Jb(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ri(t)))}function Ou(){return Zb(),Yb(),Qb(),$b()}function $b(){if(Xe!==5)return!1;var e=Mo,t=Dc;Dc=0;var a=Zc(Ka),o=X.T,r=ce.p;try{ce.p=32>a?32:a,X.T=null,a=Tc,Tc=null;var l=Mo,n=Ka;if(Xe=0,Ll=Mo=null,Ka=0,fe&6)throw Error(R(331));var i=fe;if(fe|=4,Ub(l.current),Ob(l,l.current,n,a),fe=i,ii(0,!1),Nt&&typeof Nt.onPostCommitFiberRoot=="function")try{Nt.onPostCommitFiberRoot($n,l)}catch{}return!0}finally{ce.p=r,X.T=o,Jb(e,t)}}function ux(e,t,a){t=Zt(a,t),t=Ic(e.stateNode,t,2),e=ko(e,t,2),e!==null&&(ti(e,2),Sa(e))}function he(e,t,a){if(e.tag===3)ux(e,e,a);else for(;t!==null;){if(t.tag===3){ux(t,e,a);break}else if(t.tag===1){var o=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ao===null||!Ao.has(o))){e=Zt(a,e),a=mb(2),o=ko(t,a,2),o!==null&&(hb(a,o,t,e),ti(o,2),Sa(o));break}}t=t.return}}function Vf(e,t,a){var o=e.pingCache;if(o===null){o=e.pingCache=new O2;var r=new Set;o.set(t,r)}else r=o.get(t),r===void 0&&(r=new Set,o.set(t,r));r.has(a)||(Ep=!0,r.add(a),e=F2.bind(null,e,t,a),t.then(e,e))}function F2(e,t,a){var o=e.pingCache;o!==null&&o.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,be===e&&(le&a)===a&&(Ne===4||Ne===3&&(le&62914560)===le&&300>Bt()-Du?!(fe&2)&&Rl(e,0):Dp|=a,Sl===le&&(Sl=0)),Sa(e)}function e0(e,t){t===0&&(t=Xx()),e=vr(e,t),e!==null&&(ti(e,t),Sa(e))}function _2(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),e0(e,a)}function H2(e,t){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,r=e.memoizedState;r!==null&&(a=r.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(R(314))}o!==null&&o.delete(t),e0(e,a)}function q2(e,t){return Kc(e,t)}var fu=null,Qr=null,Oc=!1,cu=!1,Xf=!1,So=0;function Sa(e){e!==Qr&&e.next===null&&(Qr===null?fu=Qr=e:Qr=Qr.next=e),cu=!0,Oc||(Oc=!0,V2())}function ii(e,t){if(!Xf&&cu){Xf=!0;do for(var a=!1,o=fu;o!==null;){if(!t)if(e!==0){var r=o.pendingLanes;if(r===0)var l=0;else{var n=o.suspendedLanes,i=o.pingedLanes;l=(1<<31-Ut(42|e)+1)-1,l&=r&~(n&~i),l=l&201326741?l&201326741|1:l?l|2:0}l!==0&&(a=!0,dx(o,l))}else l=le,l=yu(o,o===be?l:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),!(l&3)||ei(o,l)||(a=!0,dx(o,l));o=o.next}while(a);Xf=!1}}function G2(){t0()}function t0(){cu=Oc=!1;var e=0;So!==0&&J2()&&(e=So);for(var t=Bt(),a=null,o=fu;o!==null;){var r=o.next,l=a0(o,t);l===0?(o.next=null,a===null?fu=r:a.next=r,r===null&&(Qr=a)):(a=o,(e!==0||l&3)&&(cu=!0)),o=r}Xe!==0&&Xe!==5||ii(e,!1),So!==0&&(So=0)}function a0(e,t){for(var a=e.suspendedLanes,o=e.pingedLanes,r=e.expirationTimes,l=e.pendingLanes&-62914561;0<l;){var n=31-Ut(l),i=1<<n,s=r[n];s===-1?(!(i&a)||i&o)&&(r[n]=gL(i,t)):s<=t&&(e.expiredLanes|=i),l&=~i}if(t=be,a=le,a=yu(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===t&&(me===2||me===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&yf(o),e.callbackNode=null,e.callbackPriority=0;if(!(a&3)||ei(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(o!==null&&yf(o),Zc(a)){case 2:case 8:a=Gx;break;case 32:a=Ws;break;case 268435456:a=Vx;break;default:a=Ws}return o=o0.bind(null,e),a=Kc(a,o),e.callbackPriority=t,e.callbackNode=a,t}return o!==null&&o!==null&&yf(o),e.callbackPriority=2,e.callbackNode=null,2}function o0(e,t){if(Xe!==0&&Xe!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Ou()&&e.callbackNode!==a)return null;var o=le;return o=yu(e,e===be?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(qb(e,o,t),a0(e,Bt()),e.callbackNode!=null&&e.callbackNode===a?o0.bind(null,e):null)}function dx(e,t){if(Ou())return null;qb(e,t,!0)}function V2(){eR(function(){fe&6?Kc(qx,G2):t0()})}function Pp(){if(So===0){var e=yl;e===0&&(e=ps,ps<<=1,!(ps&261888)&&(ps=256)),So=e}return So}function fx(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ds(""+e)}function cx(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function X2(e,t,a,o,r){if(t==="submit"&&a&&a.stateNode===r){var l=fx((r[St]||null).action),n=o.submitter;n&&(t=(t=n[St]||null)?fx(t.formAction):n.getAttribute("formAction"),t!==null&&(l=t,n=null));var i=new wu("action","action",null,o,r);e.push({event:i,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(So!==0){var s=n?cx(r,n):new FormData(r);Lc(a,{pending:!0,data:s,method:r.method,action:l},null,s)}}else typeof l=="function"&&(i.preventDefault(),s=n?cx(r,n):new FormData(r),Lc(a,{pending:!0,data:s,method:r.method,action:l},l,s))},currentTarget:r}]})}}for(Rs=0;Rs<cc.length;Rs++)Is=cc[Rs],px=Is.toLowerCase(),mx=Is[0].toUpperCase()+Is.slice(1),sa(px,"on"+mx);var Is,px,mx,Rs;sa(hv,"onAnimationEnd");sa(gv,"onAnimationIteration");sa(xv,"onAnimationStart");sa("dblclick","onDoubleClick");sa("focusin","onFocus");sa("focusout","onBlur");sa(u2,"onTransitionRun");sa(d2,"onTransitionStart");sa(f2,"onTransitionCancel");sa(vv,"onTransitionEnd");vl("onMouseEnter",["mouseout","mouseover"]);vl("onMouseLeave",["mouseout","mouseover"]);vl("onPointerEnter",["pointerout","pointerover"]);vl("onPointerLeave",["pointerout","pointerover"]);hr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));hr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));hr("onBeforeInput",["compositionend","keypress","textInput","paste"]);hr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));hr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));hr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Kn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),j2=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Kn));function r0(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],r=o.event;o=o.listeners;e:{var l=void 0;if(t)for(var n=o.length-1;0<=n;n--){var i=o[n],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==l&&r.isPropagationStopped())break e;l=i,r.currentTarget=u;try{l(r)}catch(d){Ys(d)}r.currentTarget=null,l=s}else for(n=0;n<o.length;n++){if(i=o[n],s=i.instance,u=i.currentTarget,i=i.listener,s!==l&&r.isPropagationStopped())break e;l=i,r.currentTarget=u;try{l(r)}catch(d){Ys(d)}r.currentTarget=null,l=s}}}}function oe(e,t){var a=t[rc];a===void 0&&(a=t[rc]=new Set);var o=e+"__bubble";a.has(o)||(l0(t,e,2,!1),a.add(o))}function jf(e,t,a){var o=0;t&&(o|=4),l0(a,e,o,t)}var ks="_reactListening"+Math.random().toString(36).slice(2);function Op(e){if(!e[ks]){e[ks]=!0,Yx.forEach(function(a){a!=="selectionchange"&&(j2.has(a)||jf(a,!1,e),jf(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ks]||(t[ks]=!0,jf("selectionchange",!1,t))}}function l0(e,t,a,o){switch(v0(t)){case 2:var r=yR;break;case 8:r=wR;break;default:r=zp}a=r.bind(null,t,a,e),r=void 0,!uc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),o?r!==void 0?e.addEventListener(t,a,{capture:!0,passive:r}):e.addEventListener(t,a,!0):r!==void 0?e.addEventListener(t,a,{passive:r}):e.addEventListener(t,a,!1)}function Kf(e,t,a,o,r){var l=o;if(!(t&1)&&!(t&2)&&o!==null)e:for(;;){if(o===null)return;var n=o.tag;if(n===3||n===4){var i=o.stateNode.containerInfo;if(i===r)break;if(n===4)for(n=o.return;n!==null;){var s=n.tag;if((s===3||s===4)&&n.stateNode.containerInfo===r)return;n=n.return}for(;i!==null;){if(n=el(i),n===null)return;if(s=n.tag,s===5||s===6||s===26||s===27){o=l=n;continue e}i=i.parentNode}}o=o.return}rv(function(){var u=l,d=Jc(a),f=[];e:{var c=bv.get(e);if(c!==void 0){var m=wu,b=e;switch(e){case"keypress":if(Ps(a)===0)break e;case"keydown":case"keyup":m=HL;break;case"focusin":b="focus",m=Rf;break;case"focusout":b="blur",m=Rf;break;case"beforeblur":case"afterblur":m=Rf;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=wg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=ML;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=VL;break;case hv:case gv:case xv:m=TL;break;case vv:m=jL;break;case"scroll":case"scrollend":m=kL;break;case"wheel":m=WL;break;case"copy":case"cut":case"paste":m=OL;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Sg;break;case"toggle":case"beforetoggle":m=YL}var v=(t&4)!==0,w=!v&&(e==="scroll"||e==="scrollend"),h=v?c!==null?c+"Capture":null:c;v=[];for(var p=u,g;p!==null;){var y=p;if(g=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||g===null||h===null||(y=Fn(p,h),y!=null&&v.push(Wn(p,y,g))),w)break;p=p.return}0<v.length&&(c=new m(c,b,null,a,d),f.push({event:c,listeners:v}))}}if(!(t&7)){e:{if(c=e==="mouseover"||e==="pointerover",m=e==="mouseout"||e==="pointerout",c&&a!==sc&&(b=a.relatedTarget||a.fromElement)&&(el(b)||b[Al]))break e;if((m||c)&&(c=d.window===d?d:(c=d.ownerDocument)?c.defaultView||c.parentWindow:window,m?(b=a.relatedTarget||a.toElement,m=u,b=b?el(b):null,b!==null&&(w=Jn(b),v=b.tag,b!==w||v!==5&&v!==27&&v!==6)&&(b=null)):(m=null,b=u),m!==b)){if(v=wg,y="onMouseLeave",h="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(v=Sg,y="onPointerLeave",h="onPointerEnter",p="pointer"),w=m==null?c:Cn(m),g=b==null?c:Cn(b),c=new v(y,p+"leave",m,a,d),c.target=w,c.relatedTarget=g,y=null,el(d)===u&&(v=new v(h,p+"enter",b,a,d),v.target=g,v.relatedTarget=w,y=v),w=y,m&&b)t:{for(v=K2,h=m,p=b,g=0,y=h;y;y=v(y))g++;y=0;for(var S=p;S;S=v(S))y++;for(;0<g-y;)h=v(h),g--;for(;0<y-g;)p=v(p),y--;for(;g--;){if(h===p||p!==null&&h===p.alternate){v=h;break t}h=v(h),p=v(p)}v=null}else v=null;m!==null&&hx(f,c,m,v,!1),b!==null&&w!==null&&hx(f,w,b,v,!0)}}e:{if(c=u?Cn(u):window,m=c.nodeName&&c.nodeName.toLowerCase(),m==="select"||m==="input"&&c.type==="file")var k=kg;else if(Ig(c))if(dv)k=n2;else{k=r2;var L=o2}else m=c.nodeName,!m||m.toLowerCase()!=="input"||c.type!=="checkbox"&&c.type!=="radio"?u&&Qc(u.elementType)&&(k=kg):k=l2;if(k&&(k=k(e,u))){uv(f,k,a,d);break e}L&&L(e,c,u),e==="focusout"&&u&&c.type==="number"&&u.memoizedProps.value!=null&&ic(c,"number",c.value)}switch(L=u?Cn(u):window,e){case"focusin":(Ig(L)||L.contentEditable==="true")&&(ol=L,dc=u,kn=null);break;case"focusout":kn=dc=ol=null;break;case"mousedown":fc=!0;break;case"contextmenu":case"mouseup":case"dragend":fc=!1,Dg(f,a,d);break;case"selectionchange":if(s2)break;case"keydown":case"keyup":Dg(f,a,d)}var C;if(tp)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else al?iv(e,a)&&(E="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(E="onCompositionStart");E&&(nv&&a.locale!=="ko"&&(al||E!=="onCompositionStart"?E==="onCompositionEnd"&&al&&(C=lv()):(yo=d,$c="value"in yo?yo.value:yo.textContent,al=!0)),L=pu(u,E),0<L.length&&(E=new Cg(E,e,null,a,d),f.push({event:E,listeners:L}),C?E.data=C:(C=sv(a),C!==null&&(E.data=C)))),(C=JL?$L(e,a):e2(e,a))&&(E=pu(u,"onBeforeInput"),0<E.length&&(L=new Cg("onBeforeInput","beforeinput",null,a,d),f.push({event:L,listeners:E}),L.data=C)),X2(f,e,u,a,d)}r0(f,t)})}function Wn(e,t,a){return{instance:e,listener:t,currentTarget:a}}function pu(e,t){for(var a=t+"Capture",o=[];e!==null;){var r=e,l=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||l===null||(r=Fn(e,a),r!=null&&o.unshift(Wn(e,r,l)),r=Fn(e,t),r!=null&&o.push(Wn(e,r,l))),e.tag===3)return o;e=e.return}return[]}function K2(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function hx(e,t,a,o,r){for(var l=t._reactName,n=[];a!==null&&a!==o;){var i=a,s=i.alternate,u=i.stateNode;if(i=i.tag,s!==null&&s===o)break;i!==5&&i!==26&&i!==27||u===null||(s=u,r?(u=Fn(a,l),u!=null&&n.unshift(Wn(a,u,s))):r||(u=Fn(a,l),u!=null&&n.push(Wn(a,u,s)))),a=a.return}n.length!==0&&e.push({event:t,listeners:n})}var W2=/\r\n?/g,Z2=/\u0000|\uFFFD/g;function gx(e){return(typeof e=="string"?e:""+e).replace(W2,`
`).replace(Z2,"")}function n0(e,t){return t=gx(t),gx(e)===t}function ge(e,t,a,o,r,l){switch(a){case"children":typeof o=="string"?t==="body"||t==="textarea"&&o===""||bl(e,o):(typeof o=="number"||typeof o=="bigint")&&t!=="body"&&bl(e,""+o);break;case"className":gs(e,"class",o);break;case"tabIndex":gs(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":gs(e,a,o);break;case"style":ov(e,o,l);break;case"data":if(t!=="object"){gs(e,"data",o);break}case"src":case"href":if(o===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Ds(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof l=="function"&&(a==="formAction"?(t!=="input"&&ge(e,t,"name",r.name,r,null),ge(e,t,"formEncType",r.formEncType,r,null),ge(e,t,"formMethod",r.formMethod,r,null),ge(e,t,"formTarget",r.formTarget,r,null)):(ge(e,t,"encType",r.encType,r,null),ge(e,t,"method",r.method,r,null),ge(e,t,"target",r.target,r,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=Ds(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Ga);break;case"onScroll":o!=null&&oe("scroll",e);break;case"onScrollEnd":o!=null&&oe("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(R(61));if(a=o.__html,a!=null){if(r.children!=null)throw Error(R(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=Ds(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":oe("beforetoggle",e),oe("toggle",e),Es(e,"popover",o);break;case"xlinkActuate":Ba(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ba(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ba(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ba(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ba(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ba(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ba(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ba(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ba(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Es(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=RL.get(a)||a,Es(e,a,o))}}function Bc(e,t,a,o,r,l){switch(a){case"style":ov(e,o,l);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(R(61));if(a=o.__html,a!=null){if(r.children!=null)throw Error(R(60));e.innerHTML=a}}break;case"children":typeof o=="string"?bl(e,o):(typeof o=="number"||typeof o=="bigint")&&bl(e,""+o);break;case"onScroll":o!=null&&oe("scroll",e);break;case"onScrollEnd":o!=null&&oe("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Ga);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Qx.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(r=a.endsWith("Capture"),t=a.slice(2,r?a.length-7:void 0),l=e[St]||null,l=l!=null?l[a]:null,typeof l=="function"&&e.removeEventListener(t,l,r),typeof o=="function")){typeof l!="function"&&l!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,o,r);break e}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Es(e,a,o)}}}function lt(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":oe("error",e),oe("load",e);var o=!1,r=!1,l;for(l in a)if(a.hasOwnProperty(l)){var n=a[l];if(n!=null)switch(l){case"src":o=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(R(137,t));default:ge(e,t,l,n,a,null)}}r&&ge(e,t,"srcSet",a.srcSet,a,null),o&&ge(e,t,"src",a.src,a,null);return;case"input":oe("invalid",e);var i=l=n=r=null,s=null,u=null;for(o in a)if(a.hasOwnProperty(o)){var d=a[o];if(d!=null)switch(o){case"name":r=d;break;case"type":n=d;break;case"checked":s=d;break;case"defaultChecked":u=d;break;case"value":l=d;break;case"defaultValue":i=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(R(137,t));break;default:ge(e,t,o,d,a,null)}}ev(e,l,i,s,u,n,r,!1);return;case"select":oe("invalid",e),o=n=l=null;for(r in a)if(a.hasOwnProperty(r)&&(i=a[r],i!=null))switch(r){case"value":l=i;break;case"defaultValue":n=i;break;case"multiple":o=i;default:ge(e,t,r,i,a,null)}t=l,a=n,e.multiple=!!o,t!=null?fl(e,!!o,t,!1):a!=null&&fl(e,!!o,a,!0);return;case"textarea":oe("invalid",e),l=r=o=null;for(n in a)if(a.hasOwnProperty(n)&&(i=a[n],i!=null))switch(n){case"value":o=i;break;case"defaultValue":r=i;break;case"children":l=i;break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(R(91));break;default:ge(e,t,n,i,a,null)}av(e,o,r,l);return;case"option":for(s in a)if(a.hasOwnProperty(s)&&(o=a[s],o!=null))switch(s){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:ge(e,t,s,o,a,null)}return;case"dialog":oe("beforetoggle",e),oe("toggle",e),oe("cancel",e),oe("close",e);break;case"iframe":case"object":oe("load",e);break;case"video":case"audio":for(o=0;o<Kn.length;o++)oe(Kn[o],e);break;case"image":oe("error",e),oe("load",e);break;case"details":oe("toggle",e);break;case"embed":case"source":case"link":oe("error",e),oe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(u in a)if(a.hasOwnProperty(u)&&(o=a[u],o!=null))switch(u){case"children":case"dangerouslySetInnerHTML":throw Error(R(137,t));default:ge(e,t,u,o,a,null)}return;default:if(Qc(t)){for(d in a)a.hasOwnProperty(d)&&(o=a[d],o!==void 0&&Bc(e,t,d,o,a,void 0));return}}for(i in a)a.hasOwnProperty(i)&&(o=a[i],o!=null&&ge(e,t,i,o,a,null))}function Y2(e,t,a,o){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,l=null,n=null,i=null,s=null,u=null,d=null;for(m in a){var f=a[m];if(a.hasOwnProperty(m)&&f!=null)switch(m){case"checked":break;case"value":break;case"defaultValue":s=f;default:o.hasOwnProperty(m)||ge(e,t,m,null,o,f)}}for(var c in o){var m=o[c];if(f=a[c],o.hasOwnProperty(c)&&(m!=null||f!=null))switch(c){case"type":l=m;break;case"name":r=m;break;case"checked":u=m;break;case"defaultChecked":d=m;break;case"value":n=m;break;case"defaultValue":i=m;break;case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(R(137,t));break;default:m!==f&&ge(e,t,c,m,o,f)}}nc(e,n,i,s,u,d,l,r);return;case"select":m=n=i=c=null;for(l in a)if(s=a[l],a.hasOwnProperty(l)&&s!=null)switch(l){case"value":break;case"multiple":m=s;default:o.hasOwnProperty(l)||ge(e,t,l,null,o,s)}for(r in o)if(l=o[r],s=a[r],o.hasOwnProperty(r)&&(l!=null||s!=null))switch(r){case"value":c=l;break;case"defaultValue":i=l;break;case"multiple":n=l;default:l!==s&&ge(e,t,r,l,o,s)}t=i,a=n,o=m,c!=null?fl(e,!!a,c,!1):!!o!=!!a&&(t!=null?fl(e,!!a,t,!0):fl(e,!!a,a?[]:"",!1));return;case"textarea":m=c=null;for(i in a)if(r=a[i],a.hasOwnProperty(i)&&r!=null&&!o.hasOwnProperty(i))switch(i){case"value":break;case"children":break;default:ge(e,t,i,null,o,r)}for(n in o)if(r=o[n],l=a[n],o.hasOwnProperty(n)&&(r!=null||l!=null))switch(n){case"value":c=r;break;case"defaultValue":m=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(R(91));break;default:r!==l&&ge(e,t,n,r,o,l)}tv(e,c,m);return;case"option":for(var b in a)if(c=a[b],a.hasOwnProperty(b)&&c!=null&&!o.hasOwnProperty(b))switch(b){case"selected":e.selected=!1;break;default:ge(e,t,b,null,o,c)}for(s in o)if(c=o[s],m=a[s],o.hasOwnProperty(s)&&c!==m&&(c!=null||m!=null))switch(s){case"selected":e.selected=c&&typeof c!="function"&&typeof c!="symbol";break;default:ge(e,t,s,c,o,m)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var v in a)c=a[v],a.hasOwnProperty(v)&&c!=null&&!o.hasOwnProperty(v)&&ge(e,t,v,null,o,c);for(u in o)if(c=o[u],m=a[u],o.hasOwnProperty(u)&&c!==m&&(c!=null||m!=null))switch(u){case"children":case"dangerouslySetInnerHTML":if(c!=null)throw Error(R(137,t));break;default:ge(e,t,u,c,o,m)}return;default:if(Qc(t)){for(var w in a)c=a[w],a.hasOwnProperty(w)&&c!==void 0&&!o.hasOwnProperty(w)&&Bc(e,t,w,void 0,o,c);for(d in o)c=o[d],m=a[d],!o.hasOwnProperty(d)||c===m||c===void 0&&m===void 0||Bc(e,t,d,c,o,m);return}}for(var h in a)c=a[h],a.hasOwnProperty(h)&&c!=null&&!o.hasOwnProperty(h)&&ge(e,t,h,null,o,c);for(f in o)c=o[f],m=a[f],!o.hasOwnProperty(f)||c===m||c==null&&m==null||ge(e,t,f,c,o,m)}function xx(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Q2(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var r=a[o],l=r.transferSize,n=r.initiatorType,i=r.duration;if(l&&i&&xx(n)){for(n=0,i=r.responseEnd,o+=1;o<a.length;o++){var s=a[o],u=s.startTime;if(u>i)break;var d=s.transferSize,f=s.initiatorType;d&&xx(f)&&(s=s.responseEnd,n+=d*(s<i?1:(i-u)/(s-u)))}if(--o,t+=8*(l+n)/(r.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Nc=null,Uc=null;function mu(e){return e.nodeType===9?e:e.ownerDocument}function vx(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function i0(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function zc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wf=null;function J2(){var e=window.event;return e&&e.type==="popstate"?e===Wf?!1:(Wf=e,!0):(Wf=null,!1)}var s0=typeof setTimeout=="function"?setTimeout:void 0,$2=typeof clearTimeout=="function"?clearTimeout:void 0,bx=typeof Promise=="function"?Promise:void 0,eR=typeof queueMicrotask=="function"?queueMicrotask:typeof bx<"u"?function(e){return bx.resolve(null).then(e).catch(tR)}:s0;function tR(e){setTimeout(function(){throw e})}function zo(e){return e==="head"}function yx(e,t){var a=t,o=0;do{var r=a.nextSibling;if(e.removeChild(a),r&&r.nodeType===8)if(a=r.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(r),kl(t);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Un(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Un(a);for(var l=a.firstChild;l;){var n=l.nextSibling,i=l.nodeName;l[ai]||i==="SCRIPT"||i==="STYLE"||i==="LINK"&&l.rel.toLowerCase()==="stylesheet"||a.removeChild(l),l=n}}else a==="body"&&Un(e.ownerDocument.body);a=r}while(a);kl(t)}function wx(e,t){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function Fc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Fc(a),Yc(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function aR(e,t,a,o){for(;e.nodeType===1;){var r=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[ai])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(l=e.getAttribute("rel"),l==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(l!==r.rel||e.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||e.getAttribute("title")!==(r.title==null?null:r.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(l=e.getAttribute("src"),(l!==(r.src==null?null:r.src)||e.getAttribute("type")!==(r.type==null?null:r.type)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&l&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var l=r.name==null?null:""+r.name;if(r.type==="hidden"&&e.getAttribute("name")===l)return e}else return e;if(e=Jt(e.nextSibling),e===null)break}return null}function oR(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Jt(e.nextSibling),e===null))return null;return e}function u0(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Jt(e.nextSibling),e===null))return null;return e}function _c(e){return e.data==="$?"||e.data==="$~"}function Hc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function rR(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var o=function(){t(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Jt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var qc=null;function Cx(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Jt(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function Sx(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function d0(e,t,a){switch(t=mu(a),e){case"html":if(e=t.documentElement,!e)throw Error(R(452));return e;case"head":if(e=t.head,!e)throw Error(R(453));return e;case"body":if(e=t.body,!e)throw Error(R(454));return e;default:throw Error(R(451))}}function Un(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Yc(e)}var $t=new Map,Lx=new Set;function hu(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var $a=ce.d;ce.d={f:lR,r:nR,D:iR,C:sR,L:uR,m:dR,X:cR,S:fR,M:pR};function lR(){var e=$a.f(),t=Tu();return e||t}function nR(e){var t=Ml(e);t!==null&&t.tag===5&&t.type==="form"?ob(t):$a.r(e)}var Pl=typeof document>"u"?null:document;function f0(e,t,a){var o=Pl;if(o&&typeof t=="string"&&t){var r=Wt(t);r='link[rel="'+e+'"][href="'+r+'"]',typeof a=="string"&&(r+='[crossorigin="'+a+'"]'),Lx.has(r)||(Lx.add(r),e={rel:e,crossOrigin:a,href:t},o.querySelector(r)===null&&(t=o.createElement("link"),lt(t,"link",e),Je(t),o.head.appendChild(t)))}}function iR(e){$a.D(e),f0("dns-prefetch",e,null)}function sR(e,t){$a.C(e,t),f0("preconnect",e,t)}function uR(e,t,a){$a.L(e,t,a);var o=Pl;if(o&&e&&t){var r='link[rel="preload"][as="'+Wt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(r+='[imagesrcset="'+Wt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(r+='[imagesizes="'+Wt(a.imageSizes)+'"]')):r+='[href="'+Wt(e)+'"]';var l=r;switch(t){case"style":l=Il(e);break;case"script":l=Ol(e)}$t.has(l)||(e=Ae({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),$t.set(l,e),o.querySelector(r)!==null||t==="style"&&o.querySelector(si(l))||t==="script"&&o.querySelector(ui(l))||(t=o.createElement("link"),lt(t,"link",e),Je(t),o.head.appendChild(t)))}}function dR(e,t){$a.m(e,t);var a=Pl;if(a&&e){var o=t&&typeof t.as=="string"?t.as:"script",r='link[rel="modulepreload"][as="'+Wt(o)+'"][href="'+Wt(e)+'"]',l=r;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":l=Ol(e)}if(!$t.has(l)&&(e=Ae({rel:"modulepreload",href:e},t),$t.set(l,e),a.querySelector(r)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(ui(l)))return}o=a.createElement("link"),lt(o,"link",e),Je(o),a.head.appendChild(o)}}}function fR(e,t,a){$a.S(e,t,a);var o=Pl;if(o&&e){var r=dl(o).hoistableStyles,l=Il(e);t=t||"default";var n=r.get(l);if(!n){var i={loading:0,preload:null};if(n=o.querySelector(si(l)))i.loading=5;else{e=Ae({rel:"stylesheet",href:e,"data-precedence":t},a),(a=$t.get(l))&&Bp(e,a);var s=n=o.createElement("link");Je(s),lt(s,"link",e),s._p=new Promise(function(u,d){s.onload=u,s.onerror=d}),s.addEventListener("load",function(){i.loading|=1}),s.addEventListener("error",function(){i.loading|=2}),i.loading|=4,Hs(n,t,o)}n={type:"stylesheet",instance:n,count:1,state:i},r.set(l,n)}}}function cR(e,t){$a.X(e,t);var a=Pl;if(a&&e){var o=dl(a).hoistableScripts,r=Ol(e),l=o.get(r);l||(l=a.querySelector(ui(r)),l||(e=Ae({src:e,async:!0},t),(t=$t.get(r))&&Np(e,t),l=a.createElement("script"),Je(l),lt(l,"link",e),a.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},o.set(r,l))}}function pR(e,t){$a.M(e,t);var a=Pl;if(a&&e){var o=dl(a).hoistableScripts,r=Ol(e),l=o.get(r);l||(l=a.querySelector(ui(r)),l||(e=Ae({src:e,async:!0,type:"module"},t),(t=$t.get(r))&&Np(e,t),l=a.createElement("script"),Je(l),lt(l,"link",e),a.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},o.set(r,l))}}function Rx(e,t,a,o){var r=(r=Lo.current)?hu(r):null;if(!r)throw Error(R(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Il(a.href),a=dl(r).hoistableStyles,o=a.get(t),o||(o={type:"style",instance:null,count:0,state:null},a.set(t,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Il(a.href);var l=dl(r).hoistableStyles,n=l.get(e);if(n||(r=r.ownerDocument||r,n={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},l.set(e,n),(l=r.querySelector(si(e)))&&!l._p&&(n.instance=l,n.state.loading=5),$t.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},$t.set(e,a),l||mR(r,e,a,n.state))),t&&o===null)throw Error(R(528,""));return n}if(t&&o!==null)throw Error(R(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ol(a),a=dl(r).hoistableScripts,o=a.get(t),o||(o={type:"script",instance:null,count:0,state:null},a.set(t,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(R(444,e))}}function Il(e){return'href="'+Wt(e)+'"'}function si(e){return'link[rel="stylesheet"]['+e+"]"}function c0(e){return Ae({},e,{"data-precedence":e.precedence,precedence:null})}function mR(e,t,a,o){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?o.loading=1:(t=e.createElement("link"),o.preload=t,t.addEventListener("load",function(){return o.loading|=1}),t.addEventListener("error",function(){return o.loading|=2}),lt(t,"link",a),Je(t),e.head.appendChild(t))}function Ol(e){return'[src="'+Wt(e)+'"]'}function ui(e){return"script[async]"+e}function Ix(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var o=e.querySelector('style[data-href~="'+Wt(a.href)+'"]');if(o)return t.instance=o,Je(o),o;var r=Ae({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Je(o),lt(o,"style",r),Hs(o,a.precedence,e),t.instance=o;case"stylesheet":r=Il(a.href);var l=e.querySelector(si(r));if(l)return t.state.loading|=4,t.instance=l,Je(l),l;o=c0(a),(r=$t.get(r))&&Bp(o,r),l=(e.ownerDocument||e).createElement("link"),Je(l);var n=l;return n._p=new Promise(function(i,s){n.onload=i,n.onerror=s}),lt(l,"link",o),t.state.loading|=4,Hs(l,a.precedence,e),t.instance=l;case"script":return l=Ol(a.src),(r=e.querySelector(ui(l)))?(t.instance=r,Je(r),r):(o=a,(r=$t.get(l))&&(o=Ae({},a),Np(o,r)),e=e.ownerDocument||e,r=e.createElement("script"),Je(r),lt(r,"link",o),e.head.appendChild(r),t.instance=r);case"void":return null;default:throw Error(R(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(o=t.instance,t.state.loading|=4,Hs(o,a.precedence,e));return t.instance}function Hs(e,t,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),r=o.length?o[o.length-1]:null,l=r,n=0;n<o.length;n++){var i=o[n];if(i.dataset.precedence===t)l=i;else if(l!==r)break}l?l.parentNode.insertBefore(e,l.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function Bp(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Np(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var qs=null;function kx(e,t,a){if(qs===null){var o=new Map,r=qs=new Map;r.set(a,o)}else r=qs,o=r.get(a),o||(o=new Map,r.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),r=0;r<a.length;r++){var l=a[r];if(!(l[ai]||l[at]||e==="link"&&l.getAttribute("rel")==="stylesheet")&&l.namespaceURI!=="http://www.w3.org/2000/svg"){var n=l.getAttribute(t)||"";n=e+n;var i=o.get(n);i?i.push(l):o.set(n,[l])}}return o}function Ax(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function hR(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function p0(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function gR(e,t,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&!(a.state.loading&4)){if(a.instance===null){var r=Il(o.href),l=t.querySelector(si(r));if(l){t=l._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=gu.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=l,Je(l);return}l=t.ownerDocument||t,o=c0(o),(r=$t.get(r))&&Bp(o,r),l=l.createElement("link"),Je(l);var n=l;n._p=new Promise(function(i,s){n.onload=i,n.onerror=s}),lt(l,"link",o),a.instance=l}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&!(a.state.loading&3)&&(e.count++,a=gu.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var Zf=0;function xR(e,t){return e.stylesheets&&e.count===0&&Gs(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&Gs(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4+t);0<e.imgBytes&&Zf===0&&(Zf=62500*Q2());var r=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Gs(e,e.stylesheets),e.unsuspend)){var l=e.unsuspend;e.unsuspend=null,l()}},(e.imgBytes>Zf?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(r)}}:null}function gu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Gs(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var xu=null;function Gs(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,xu=new Map,t.forEach(vR,e),xu=null,gu.call(e))}function vR(e,t){if(!(t.state.loading&4)){var a=xu.get(e);if(a)var o=a.get(null);else{a=new Map,xu.set(e,a);for(var r=e.querySelectorAll("link[data-precedence],style[data-precedence]"),l=0;l<r.length;l++){var n=r[l];(n.nodeName==="LINK"||n.getAttribute("media")!=="not all")&&(a.set(n.dataset.precedence,n),o=n)}o&&a.set(null,o)}r=t.instance,n=r.getAttribute("data-precedence"),l=a.get(n)||o,l===o&&a.set(null,r),a.set(n,r),this.count++,o=gu.bind(this),r.addEventListener("load",o),r.addEventListener("error",o),l?l.parentNode.insertBefore(r,l.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(r,e.firstChild)),t.state.loading|=4}}var Zn={$$typeof:qa,Provider:null,Consumer:null,_currentValue:lr,_currentValue2:lr,_threadCount:0};function bR(e,t,a,o,r,l,n,i,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=wf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=wf(0),this.hiddenUpdates=wf(null),this.identifierPrefix=o,this.onUncaughtError=r,this.onCaughtError=l,this.onRecoverableError=n,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function m0(e,t,a,o,r,l,n,i,s,u,d,f){return e=new bR(e,t,a,n,s,u,d,f,i),t=1,l===!0&&(t|=24),l=Pt(3,null,null,t),e.current=l,l.stateNode=e,t=sp(),t.refCount++,e.pooledCache=t,t.refCount++,l.memoizedState={element:o,isDehydrated:a,cache:t},fp(l),e}function h0(e){return e?(e=nl,e):nl}function g0(e,t,a,o,r,l){r=h0(r),o.context===null?o.context=r:o.pendingContext=r,o=Io(t),o.payload={element:a},l=l===void 0?null:l,l!==null&&(o.callback=l),a=ko(e,o,t),a!==null&&(Ct(a,e,t),Mn(a,e,t))}function Mx(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Up(e,t){Mx(e,t),(e=e.alternate)&&Mx(e,t)}function x0(e){if(e.tag===13||e.tag===31){var t=vr(e,67108864);t!==null&&Ct(t,e,67108864),Up(e,67108864)}}function Ex(e){if(e.tag===13||e.tag===31){var t=zt();t=Wc(t);var a=vr(e,t);a!==null&&Ct(a,e,t),Up(e,t)}}var vu=!0;function yR(e,t,a,o){var r=X.T;X.T=null;var l=ce.p;try{ce.p=2,zp(e,t,a,o)}finally{ce.p=l,X.T=r}}function wR(e,t,a,o){var r=X.T;X.T=null;var l=ce.p;try{ce.p=8,zp(e,t,a,o)}finally{ce.p=l,X.T=r}}function zp(e,t,a,o){if(vu){var r=Gc(o);if(r===null)Kf(e,t,o,bu,a),Dx(e,o);else if(SR(r,e,t,a,o))o.stopPropagation();else if(Dx(e,o),t&4&&-1<CR.indexOf(e)){for(;r!==null;){var l=Ml(r);if(l!==null)switch(l.tag){case 3:if(l=l.stateNode,l.current.memoizedState.isDehydrated){var n=ar(l.pendingLanes);if(n!==0){var i=l;for(i.pendingLanes|=2,i.entangledLanes|=2;n;){var s=1<<31-Ut(n);i.entanglements[1]|=s,n&=~s}Sa(l),!(fe&6)&&(su=Bt()+500,ii(0,!1))}}break;case 31:case 13:i=vr(l,2),i!==null&&Ct(i,l,2),Tu(),Up(l,2)}if(l=Gc(o),l===null&&Kf(e,t,o,bu,a),l===r)break;r=l}r!==null&&o.stopPropagation()}else Kf(e,t,o,null,a)}}function Gc(e){return e=Jc(e),Fp(e)}var bu=null;function Fp(e){if(bu=null,e=el(e),e!==null){var t=Jn(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=Ux(t),e!==null)return e;e=null}else if(a===31){if(e=zx(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return bu=e,null}function v0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(uL()){case qx:return 2;case Gx:return 8;case Ws:case dL:return 32;case Vx:return 268435456;default:return 32}default:return 32}}var Vc=!1,Eo=null,Do=null,To=null,Yn=new Map,Qn=new Map,vo=[],CR="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Dx(e,t){switch(e){case"focusin":case"focusout":Eo=null;break;case"dragenter":case"dragleave":Do=null;break;case"mouseover":case"mouseout":To=null;break;case"pointerover":case"pointerout":Yn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Qn.delete(t.pointerId)}}function vn(e,t,a,o,r,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:a,eventSystemFlags:o,nativeEvent:l,targetContainers:[r]},t!==null&&(t=Ml(t),t!==null&&x0(t)),e):(e.eventSystemFlags|=o,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function SR(e,t,a,o,r){switch(t){case"focusin":return Eo=vn(Eo,e,t,a,o,r),!0;case"dragenter":return Do=vn(Do,e,t,a,o,r),!0;case"mouseover":return To=vn(To,e,t,a,o,r),!0;case"pointerover":var l=r.pointerId;return Yn.set(l,vn(Yn.get(l)||null,e,t,a,o,r)),!0;case"gotpointercapture":return l=r.pointerId,Qn.set(l,vn(Qn.get(l)||null,e,t,a,o,r)),!0}return!1}function b0(e){var t=el(e.target);if(t!==null){var a=Jn(t);if(a!==null){if(t=a.tag,t===13){if(t=Ux(a),t!==null){e.blockedOn=t,mg(e.priority,function(){Ex(a)});return}}else if(t===31){if(t=zx(a),t!==null){e.blockedOn=t,mg(e.priority,function(){Ex(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Vs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=Gc(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);sc=o,a.target.dispatchEvent(o),sc=null}else return t=Ml(a),t!==null&&x0(t),e.blockedOn=a,!1;t.shift()}return!0}function Tx(e,t,a){Vs(e)&&a.delete(t)}function LR(){Vc=!1,Eo!==null&&Vs(Eo)&&(Eo=null),Do!==null&&Vs(Do)&&(Do=null),To!==null&&Vs(To)&&(To=null),Yn.forEach(Tx),Qn.forEach(Tx)}function As(e,t){e.blockedOn===t&&(e.blockedOn=null,Vc||(Vc=!0,je.unstable_scheduleCallback(je.unstable_NormalPriority,LR)))}var Ms=null;function Px(e){Ms!==e&&(Ms=e,je.unstable_scheduleCallback(je.unstable_NormalPriority,function(){Ms===e&&(Ms=null);for(var t=0;t<e.length;t+=3){var a=e[t],o=e[t+1],r=e[t+2];if(typeof o!="function"){if(Fp(o||a)===null)continue;break}var l=Ml(a);l!==null&&(e.splice(t,3),t-=3,Lc(l,{pending:!0,data:r,method:a.method,action:o},o,r))}}))}function kl(e){function t(s){return As(s,e)}Eo!==null&&As(Eo,e),Do!==null&&As(Do,e),To!==null&&As(To,e),Yn.forEach(t),Qn.forEach(t);for(var a=0;a<vo.length;a++){var o=vo[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<vo.length&&(a=vo[0],a.blockedOn===null);)b0(a),a.blockedOn===null&&vo.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var r=a[o],l=a[o+1],n=r[St]||null;if(typeof l=="function")n||Px(a);else if(n){var i=null;if(l&&l.hasAttribute("formAction")){if(r=l,n=l[St]||null)i=n.formAction;else if(Fp(r)!==null)continue}else i=n.action;typeof i=="function"?a[o+1]=i:(a.splice(o,3),o-=3),Px(a)}}}function y0(){function e(l){l.canIntercept&&l.info==="react-transition"&&l.intercept({handler:function(){return new Promise(function(n){return r=n})},focusReset:"manual",scroll:"manual"})}function t(){r!==null&&(r(),r=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var l=navigation.currentEntry;l&&l.url!=null&&navigation.navigate(l.url,{state:l.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,r=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),r!==null&&(r(),r=null)}}}function _p(e){this._internalRoot=e}Bu.prototype.render=_p.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(R(409));var a=t.current,o=zt();g0(a,o,e,t,null,null)};Bu.prototype.unmount=_p.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;g0(e.current,2,null,e,null,null),Tu(),t[Al]=null}};function Bu(e){this._internalRoot=e}Bu.prototype.unstable_scheduleHydration=function(e){if(e){var t=Zx();e={blockedOn:null,target:e,priority:t};for(var a=0;a<vo.length&&t!==0&&t<vo[a].priority;a++);vo.splice(a,0,e),a===0&&b0(e)}};var Ox=Bx.version;if(Ox!=="19.2.7")throw Error(R(527,Ox,"19.2.7"));ce.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(R(188)):(e=Object.keys(e).join(","),Error(R(268,e)));return e=aL(t),e=e!==null?Fx(e):null,e=e===null?null:e.stateNode,e};var RR={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:X,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(bn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!bn.isDisabled&&bn.supportsFiber))try{$n=bn.inject(RR),Nt=bn}catch{}var bn;Nu.createRoot=function(e,t){if(!Nx(e))throw Error(R(299));var a=!1,o="",r=fb,l=cb,n=pb;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onUncaughtError!==void 0&&(r=t.onUncaughtError),t.onCaughtError!==void 0&&(l=t.onCaughtError),t.onRecoverableError!==void 0&&(n=t.onRecoverableError)),t=m0(e,1,!1,null,null,a,o,null,r,l,n,y0),e[Al]=t.current,Op(e),new _p(t)};Nu.hydrateRoot=function(e,t,a){if(!Nx(e))throw Error(R(299));var o=!1,r="",l=fb,n=cb,i=pb,s=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(r=a.identifierPrefix),a.onUncaughtError!==void 0&&(l=a.onUncaughtError),a.onCaughtError!==void 0&&(n=a.onCaughtError),a.onRecoverableError!==void 0&&(i=a.onRecoverableError),a.formState!==void 0&&(s=a.formState)),t=m0(e,1,!0,t,a??null,o,r,s,l,n,i,y0),t.context=h0(null),a=t.current,o=zt(),o=Wc(o),r=Io(o),r.callback=null,ko(a,r,o),a=o,t.current.lanes=a,ti(t,a),Sa(t),e[Al]=t.current,Op(e),new Bu(t)};Nu.version="19.2.7"});var Hp=ga((w5,S0)=>{"use strict";function C0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(C0)}catch(e){console.error(e)}}C0(),S0.exports=w0()});var q0=ga(Vu=>{"use strict";var MI=Symbol.for("react.transitional.element"),EI=Symbol.for("react.fragment");function H0(e,t,a){var o=null;if(a!==void 0&&(o=""+a),t.key!==void 0&&(o=""+t.key),"key"in t){a={};for(var r in t)r!=="key"&&(a[r]=t[r])}else a=t;return t=a.ref,{$$typeof:MI,type:e,key:o,ref:t!==void 0?t:null,props:a}}Vu.Fragment=EI;Vu.jsx=H0;Vu.jsxs=H0});var J=ga((M4,G0)=>{"use strict";G0.exports=q0()});var Oh={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Bh=([e,t,a])=>{let o=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(r=>{o.setAttribute(r,String(t[r]))}),a?.length&&a.forEach(r=>{let l=Bh(r);o.appendChild(l)}),o},Jd=(e,t={})=>{let a="svg",o={...Oh,...t};return Bh([a,o,e])};var $d=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"M10 12h4"}]];var ef=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var fh=A(Hp(),1);function Gp(e,t=8){let a=IR(e,t);return a?.length?a:kR(e,t)??[]}function IR(e,t){let a=L0(e,AR);if(!a)return null;let o=[],r=a,l;for(;r&&o.length<t;){if(r.tag!==5){let n=qp(r.type)??qp(r.elementType);n&&n!==l&&!I0(n,"react")&&(o.push({name:n,framework:"react"}),l=n)}r=r.return}return o}function kR(e,t){let a=L0(e,MR);if(!a)return null;let o=[],r=a,l;for(;r&&o.length<t;){let n=ER(r);n&&n!==l&&!I0(n,"vue")&&(o.push({name:n,framework:"vue"}),l=n),r=R0(r)?r.parent??null:r.$parent??null}return o}function L0(e,t){for(let a=e;a;a=a.parentElement){let o=t(a);if(o)return o}}function AR(e){let t=Object.getOwnPropertyNames(e).find(a=>a.startsWith("__reactFiber$")||a.startsWith("__reactInternalInstance$"));if(t)return e[t]}function MR(e){let t=e;return t.__vueParentComponent??t.__vue__??t.__vue_app__?._instance??void 0}function qp(e){if(typeof e=="function"){let t=e;return yr(t.displayName||t.name)}if(e&&typeof e=="object"){let t=e;return yr(t.displayName)??yr(t.render?.displayName||t.render?.name)??(t.type?qp(t.type):void 0)}}function ER(e){let t=R0(e)?e.type:e.$options;return yr(t?.displayName)??yr(t?.name)??yr(t?.__name)??DR(t?.__file)}function R0(e){return"type"in e||"parent"in e}function DR(e){if(!e)return;let t=e.split(/[\\/]/).pop()?.replace(/\.(vue|tsx?|jsx?)$/i,"");return yr(t)}function yr(e){let t=e?.trim();if(!(!t||t==="Anonymous"||t==="anonymous"))return t}var TR=new Set(["VApp","VMain","VLayout","VContainer","VRow","VCol","VSpacer"]);function I0(e,t){return t==="react"?e==="Provider"||e==="Context"||e==="Fragment"||e.startsWith("_")||e.endsWith(".Provider")||e.endsWith(".Consumer"):e==="Transition"||e==="KeepAlive"||e==="Teleport"||e==="Suspense"||TR.has(e)}function PR(e){let t={};for(let a of Array.from(e.attributes))a.name.startsWith("data-")&&(t[a.name]=a.value);return t}function k0(e){if(e.id)return`#${CSS.escape(e.id)}`;let t=e.getAttribute("data-testid");if(t)return`[data-testid="${OR(t)}"]`;let a=[],o=e,r=0;for(;o&&o.nodeType===1&&r<4&&o!==document.body;){let l=o.tagName.toLowerCase(),n=o.parentElement;if(n){let i=Array.from(n.children).filter(s=>s.tagName===o.tagName);i.length>1&&(l+=`:nth-of-type(${i.indexOf(o)+1})`)}a.unshift(l),o=o.parentElement,r++}return a.join(" > ")}function OR(e){return e.replace(/["\\]/g,"\\$&")}function Fo(e){let t=e.getBoundingClientRect();return{x:t.x,y:t.y,width:t.width,height:t.height}}function Uu(e,t=document){let a=Array.from(t.querySelectorAll("*")),o=Math.max(1,e.width*e.height),r=null;for(let l of a){if(zR(l)||_R(l))continue;let n=l.getBoundingClientRect();if(n.width===0||n.height===0)continue;let i=HR(e,n);if(i<=0)continue;let s=n.width*n.height,u=i/s,d=i/o;if(u<.45&&d<.35)continue;let f=Math.min(s,o)/Math.max(s,o),c=d*140+u*45+f*25;d<.08&&(c-=30),(l.hasAttribute("data-slot")||l.hasAttribute("data-testid"))&&(c+=8),(NR(l.tagName)||UR(l.getAttribute("role")))&&(c+=8),BR(l.tagName)&&d>.2&&(c+=4),c+=Math.min(20,FR(l))*.1,(!r||c>r.score)&&(r={el:l,score:c})}return r?.el??null}function BR(e){return["BUTTON","A","INPUT","SELECT","TEXTAREA","LABEL","IMG","SVG"].includes(e)}function NR(e){return["ARTICLE","ASIDE","DIALOG","FIELDSET","FORM","HEADER","MAIN","NAV","SECTION"].includes(e)}function UR(e){return e!==null&&["dialog","form","main","menu","navigation","region","tabpanel"].includes(e)}function zR(e){return e===document.documentElement||e===document.body}function FR(e){let t=0;for(let a=e.parentElement;a;a=a.parentElement)t++;return t}function _R(e){return e.closest("[data-loupe-overlay]")!==null}function HR(e,t){let a=Math.max(0,Math.min(e.x+e.width,t.x+t.width)-Math.max(e.x,t.x)),o=Math.max(0,Math.min(e.y+e.height,t.y+t.height)-Math.max(e.y,t.y));return a*o}function di(e){let t=(e.textContent??"").replace(/\s+/g," ").trim().slice(0,200);return{tag:e.tagName.toLowerCase(),selector:k0(e),text:t,dataAttributes:PR(e),className:typeof e.className=="string"?e.className:"",componentChain:Gp(e),elementRect:Fo(e)}}var ut=A(q(),1);var _u=A(q(),1);var zu=(...e)=>e.filter((t,a,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===a).join(" ").trim();var A0=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();var M0=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,o)=>o?o.toUpperCase():a.toLowerCase());var Vp=e=>{let t=M0(e);return t.charAt(0).toUpperCase()+t.slice(1)};var fi=A(q(),1);var Fu={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var E0=e=>{for(let t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};var Bl=A(q(),1);var qR=(0,Bl.createContext)({});var D0=()=>(0,Bl.useContext)(qR);var T0=(0,fi.forwardRef)(({color:e,size:t,strokeWidth:a,absoluteStrokeWidth:o,className:r="",children:l,iconNode:n,...i},s)=>{let{size:u=24,strokeWidth:d=2,absoluteStrokeWidth:f=!1,color:c="currentColor",className:m=""}=D0()??{},b=o??f?Number(a??d)*24/Number(t??u):a??d;return(0,fi.createElement)("svg",{ref:s,...Fu,width:t??u??Fu.width,height:t??u??Fu.height,stroke:e??c,strokeWidth:b,className:zu("lucide",m,r),...!l&&!E0(i)&&{"aria-hidden":"true"},...i},[...n.map(([v,w])=>(0,fi.createElement)(v,w)),...Array.isArray(l)?l:[l]])});var _=(e,t)=>{let a=(0,_u.forwardRef)(({className:o,...r},l)=>(0,_u.createElement)(T0,{ref:l,iconNode:t,className:zu(`lucide-${A0(Vp(e))}`,`lucide-${e}`,o),...r}));return a.displayName=Vp(e),a};var GR=[["rect",{width:"6",height:"10",x:"9",y:"7",rx:"2",key:"yn7j0q"}],["path",{d:"M4 22V2",key:"tsjzd3"}],["path",{d:"M20 22V2",key:"1bnhr8"}]],ci=_("align-horizontal-space-around",GR);var VR=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],pi=_("arrow-left",VR);var XR=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],mi=_("arrow-up",XR);var jR=[["path",{d:"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",key:"d5nyq2"}],["path",{d:"M22 9v7",key:"pvm9v3"}],["path",{d:"M3.304 13h6.392",key:"1q3zxz"}],["circle",{cx:"18.5",cy:"12.5",r:"3.5",key:"z97x68"}]],hi=_("case-sensitive",jR);var KR=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],gi=_("check",KR);var WR=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],wr=_("chevron-down",WR);var ZR=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],eo=_("chevron-right",ZR);var YR=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],_o=_("circle-alert",YR);var QR=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Ho=_("circle-check",QR);var JR=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 18a6 6 0 0 0 0-12v12z",key:"j4l70d"}]],xi=_("contrast",JR);var $R=[["path",{d:"M6 2v14a2 2 0 0 0 2 2h14",key:"ron5a4"}],["path",{d:"M18 22V8a2 2 0 0 0-2-2H2",key:"7s9ehn"}]],vi=_("crop",$R);var eI=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],to=_("ellipsis",eI);var tI=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],Nl=_("external-link",tI);var aI=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],Ul=_("eye-off",aI);var oI=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],Cr=_("eye",oI);var rI=[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]],bi=_("grip-vertical",rI);var lI=[["path",{d:"M16 5h6",key:"1vod17"}],["path",{d:"M19 2v6",key:"4bpg5p"}],["path",{d:"M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",key:"1ue2ih"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}]],yi=_("image-plus",lI);var nI=[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]],Sr=_("library",nI);var iI=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],wi=_("maximize-2",iI);var sI=[["path",{d:"M5 12h14",key:"1ays0h"}]],Ci=_("minus",sI);var uI=[["path",{d:"M12.586 12.586 19 19",key:"ea5xo7"}],["path",{d:"M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",key:"277e5u"}]],Si=_("mouse-pointer",uI);var dI=[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"m15 19-3 3-3-3",key:"11eu04"}],["path",{d:"m19 9 3 3-3 3",key:"1mg7y2"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m5 9-3 3 3 3",key:"j64kie"}],["path",{d:"m9 5 3-3 3 3",key:"l8vdw6"}]],Li=_("move",dI);var fI=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],Ri=_("pencil",fI);var cI=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Lr=_("plus",cI);var pI=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]],qo=_("rows-3",pI);var mI=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],ao=_("search",mI);var hI=[["path",{d:"M21 11a8 8 0 0 0-8-8",key:"1lxwo5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1dv2y5"}]],Ii=_("square-round-corner",hI);var gI=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],oo=_("trash-2",gI);var xI=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],La=_("x",xI);var PB=A(q(),1);function P0(e){var t,a,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var r=e.length;for(t=0;t<r;t++)e[t]&&(a=P0(e[t]))&&(o&&(o+=" "),o+=a)}else for(a in e)e[a]&&(o&&(o+=" "),o+=a);return o}function Hu(){for(var e,t,a=0,o="",r=arguments.length;a<r;a++)(e=arguments[a])&&(t=P0(e))&&(o&&(o+=" "),o+=t);return o}var O0=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,B0=Hu,qu=(e,t)=>a=>{var o;if(t?.variants==null)return B0(e,a?.class,a?.className);let{variants:r,defaultVariants:l}=t,n=Object.keys(r).map(u=>{let d=a?.[u],f=l?.[u];if(d===null)return null;let c=O0(d)||O0(f);return r[u][c]}),i=a&&Object.entries(a).reduce((u,d)=>{let[f,c]=d;return c===void 0||(u[f]=c),u},{}),s=t==null||(o=t.compoundVariants)===null||o===void 0?void 0:o.reduce((u,d)=>{let{class:f,className:c,...m}=d;return Object.entries(m).every(b=>{let[v,w]=b;return Array.isArray(w)?w.includes({...l,...i}[v]):{...l,...i}[v]===w})?[...u,f,c]:u},[]);return B0(e,n,s,a?.class,a?.className)};var V0=A(q(),1),X0=A(jr(),1);var zl={};Ph(zl,{Root:()=>bI,Slot:()=>bI,Slottable:()=>yI,createSlot:()=>ro,createSlottable:()=>_0});var nt=A(q(),1);var U0=A(q(),1);function N0(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function vI(...e){return t=>{let a=!1,o=e.map(r=>{let l=N0(r,t);return!a&&typeof l=="function"&&(a=!0),l});if(a)return()=>{for(let r=0;r<o.length;r++){let l=o[r];typeof l=="function"?l():N0(e[r],null)}}}}function Pe(...e){return U0.useCallback(vI(...e),e)}function ro(e){let t=nt.forwardRef((a,o)=>{let{children:r,...l}=a,n=null,i=!1,s=[];z0(r)&&typeof Gu=="function"&&(r=Gu(r._payload)),nt.Children.forEach(r,c=>{if(LI(c)){i=!0;let m=c,b="child"in m.props?m.props.child:m.props.children;z0(b)&&typeof Gu=="function"&&(b=Gu(b._payload)),n=wI(m,b),s.push(n?.props?.children)}else s.push(c)}),n?n=nt.cloneElement(n,void 0,s):!i&&nt.Children.count(r)===1&&nt.isValidElement(r)&&(n=r);let u=n?SI(n):void 0,d=Pe(o,u);if(!n){if(r||r===0)throw new Error(i?AI(e):kI(e));return r}let f=CI(l,n.props??{});return n.type!==nt.Fragment&&(f.ref=o?d:u),nt.cloneElement(n,f)});return t.displayName=`${e}.Slot`,t}var bI=ro("Slot"),F0=Symbol.for("radix.slottable");function _0(e){let t=a=>"child"in a?a.children(a.child):a.children;return t.displayName=`${e}.Slottable`,t.__radixId=F0,t}var yI=_0("Slottable"),wI=(e,t)=>{if("child"in e.props){let a=e.props.child;return nt.isValidElement(a)?nt.cloneElement(a,void 0,e.props.children(a.props.children)):null}return nt.isValidElement(t)?t:null};function CI(e,t){let a={...t};for(let o in t){let r=e[o],l=t[o];/^on[A-Z]/.test(o)?r&&l?a[o]=(...i)=>{let s=l(...i);return r(...i),s}:r&&(a[o]=r):o==="style"?a[o]={...r,...l}:o==="className"&&(a[o]=[r,l].filter(Boolean).join(" "))}return{...e,...a}}function SI(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning;return a?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning,a?e.props.ref:e.props.ref||e.ref)}function LI(e){return nt.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===F0}var RI=Symbol.for("react.lazy");function z0(e){return e!=null&&typeof e=="object"&&"$$typeof"in e&&e.$$typeof===RI&&"_payload"in e&&II(e._payload)}function II(e){return typeof e=="object"&&e!==null&&"then"in e}var kI=e=>`${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,AI=e=>`${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,Gu=nt[" use ".trim().toString()];var j0=A(J(),1),DI=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Oe=DI.reduce((e,t)=>{let a=ro(`Primitive.${t}`),o=V0.forwardRef((r,l)=>{let{asChild:n,...i}=r,s=n?a:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),(0,j0.jsx)(s,{...i,ref:l})});return o.displayName=`Primitive.${t}`,{...e,[t]:o}},{});function Xu(e,t){e&&X0.flushSync(()=>e.dispatchEvent(t))}var lo=A(q(),1),K0=A(J(),1);function Ra(e,t=[]){let a=[];function o(l,n){let i=lo.createContext(n);i.displayName=l+"Context";let s=a.length;a=[...a,n];let u=f=>{let{scope:c,children:m,...b}=f,v=c?.[e]?.[s]||i,w=lo.useMemo(()=>b,Object.values(b));return(0,K0.jsx)(v.Provider,{value:w,children:m})};u.displayName=l+"Provider";function d(f,c){let m=c?.[e]?.[s]||i,b=lo.useContext(m);if(b)return b;if(n!==void 0)return n;throw new Error(`\`${f}\` must be used within \`${l}\``)}return[u,d]}let r=()=>{let l=a.map(n=>lo.createContext(n));return function(i){let s=i?.[e]||l;return lo.useMemo(()=>({[`__scope${e}`]:{...i,[e]:s}}),[i,s])}};return r.scopeName=e,[o,TI(r,...t)]}function TI(...e){let t=e[0];if(e.length===1)return t;let a=()=>{let o=e.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(l){let n=o.reduce((i,{useScope:s,scopeName:u})=>{let f=s(l)[`__scope${u}`];return{...i,...f}},{});return lo.useMemo(()=>({[`__scope${t.scopeName}`]:n}),[n])}};return a.scopeName=t.scopeName,a}var ua=A(q(),1);var ju=A(J(),1),Wu=A(q(),1);var PI=A(J(),1);function Ku(e){let t=e+"CollectionProvider",[a,o]=Ra(t),[r,l]=a(t,{collectionRef:{current:null},itemMap:new Map}),n=v=>{let{scope:w,children:h}=v,p=ua.useRef(null),g=ua.useRef(new Map).current;return(0,ju.jsx)(r,{scope:w,itemMap:g,collectionRef:p,children:h})};n.displayName=t;let i=e+"CollectionSlot",s=ro(i),u=ua.forwardRef((v,w)=>{let{scope:h,children:p}=v,g=l(i,h),y=Pe(w,g.collectionRef);return(0,ju.jsx)(s,{ref:y,children:p})});u.displayName=i;let d=e+"CollectionItemSlot",f="data-radix-collection-item",c=ro(d),m=ua.forwardRef((v,w)=>{let{scope:h,children:p,...g}=v,y=ua.useRef(null),S=Pe(w,y),k=l(d,h);return ua.useEffect(()=>(k.itemMap.set(y,{ref:y,...g}),()=>void k.itemMap.delete(y))),(0,ju.jsx)(c,{[f]:"",ref:S,children:p})});m.displayName=d;function b(v){let w=l(e+"CollectionConsumer",v);return ua.useCallback(()=>{let p=w.collectionRef.current;if(!p)return[];let g=Array.from(p.querySelectorAll(`[${f}]`));return Array.from(w.itemMap.values()).sort((k,L)=>g.indexOf(k.ref.current)-g.indexOf(L.ref.current))},[w.collectionRef,w.itemMap])}return[{Provider:n,Slot:u,ItemSlot:m},b,o]}var U4=!!(typeof window<"u"&&window.document&&window.document.createElement);function te(e,t,{checkForDefaultPrevented:a=!0}={}){return function(r){if(e?.(r),a===!1||!r.defaultPrevented)return t?.(r)}}var ea=A(q(),1);var W0=A(q(),1),it=globalThis?.document?W0.useLayoutEffect:()=>{};var Zu=A(q(),1);var Fl=A(q(),1),Z0=Fl[" useEffectEvent ".trim().toString()],Y0=Fl[" useInsertionEffect ".trim().toString()];function Q0(e){if(typeof Z0=="function")return Z0(e);let t=Fl.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof Y0=="function"?Y0(()=>{t.current=e}):it(()=>{t.current=e}),Fl.useMemo(()=>(...a)=>t.current?.(...a),[])}var OI=ea[" useInsertionEffect ".trim().toString()]||it;function ki({prop:e,defaultProp:t,onChange:a=()=>{},caller:o}){let[r,l,n]=BI({defaultProp:t,onChange:a}),i=e!==void 0,s=i?e:r;{let d=ea.useRef(e!==void 0);ea.useEffect(()=>{let f=d.current;f!==i&&console.warn(`${o} is changing from ${f?"controlled":"uncontrolled"} to ${i?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=i},[i,o])}let u=ea.useCallback(d=>{if(i){let f=NI(d)?d(e):d;f!==e&&n.current?.(f)}else l(d)},[i,e,l,n]);return[s,u]}function BI({defaultProp:e,onChange:t}){let[a,o]=ea.useState(e),r=ea.useRef(a),l=ea.useRef(t);return OI(()=>{l.current=t},[t]),ea.useEffect(()=>{r.current!==a&&(l.current?.(a),r.current=a)},[a,r]),[a,o,l]}function NI(e){return typeof e=="function"}var G4=Symbol("RADIX:SYNC_STATE");var ft=A(q(),1);var $0=A(q(),1);function UI(e,t){return $0.useReducer((a,o)=>t[a][o]??a,e)}var _l=e=>{let{present:t,children:a}=e,o=zI(t),r=typeof a=="function"?a({present:o.isPresent}):ft.Children.only(a),l=FI(o.ref,_I(r));return typeof a=="function"||o.isPresent?ft.cloneElement(r,{ref:l}):null};_l.displayName="Presence";function zI(e){let[t,a]=ft.useState(),o=ft.useRef(null),r=ft.useRef(e),l=ft.useRef("none"),n=e?"mounted":"unmounted",[i,s]=UI(n,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return ft.useEffect(()=>{let u=Yu(o.current);l.current=i==="mounted"?u:"none"},[i]),it(()=>{let u=o.current,d=r.current;if(d!==e){let c=l.current,m=Yu(u);e?s("MOUNT"):m==="none"||u?.display==="none"?s("UNMOUNT"):s(d&&c!==m?"ANIMATION_OUT":"UNMOUNT"),r.current=e}},[e,s]),it(()=>{if(t){let u,d=t.ownerDocument.defaultView??window,f=m=>{let v=Yu(o.current).includes(CSS.escape(m.animationName));if(m.target===t&&v&&(s("ANIMATION_END"),!r.current)){let w=t.style.animationFillMode;t.style.animationFillMode="forwards",u=d.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=w)})}},c=m=>{m.target===t&&(l.current=Yu(o.current))};return t.addEventListener("animationstart",c),t.addEventListener("animationcancel",f),t.addEventListener("animationend",f),()=>{d.clearTimeout(u),t.removeEventListener("animationstart",c),t.removeEventListener("animationcancel",f),t.removeEventListener("animationend",f)}}else s("ANIMATION_END")},[t,s]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:ft.useCallback(u=>{o.current=u?getComputedStyle(u):null,a(u)},[])}}function J0(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function FI(...e){let t=ft.useRef(e);return t.current=e,ft.useCallback(a=>{let o=t.current,r=!1,l=o.map(n=>{let i=J0(n,a);return!r&&typeof i=="function"&&(r=!0),i});if(r)return()=>{for(let n=0;n<l.length;n++){let i=l[n];typeof i=="function"?i():J0(o[n],null)}}},[])}function Yu(e){return e?.animationName||"none"}function _I(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning;return a?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning,a?e.props.ref:e.props.ref||e.ref)}var Xp=A(q(),1);var HI=Xp[" useId ".trim().toString()]||(()=>{}),qI=0;function Go(e){let[t,a]=Xp.useState(HI());return it(()=>{e||a(o=>o??String(qI++))},[e]),e||(t?`radix-${t}`:"")}var Qu=A(q(),1),GI=A(J(),1),VI=Qu.createContext(void 0);function Ju(e){let t=Qu.useContext(VI);return e||t||"ltr"}var ye=A(q(),1);var Hl=A(q(),1);function Rt(e){let t=Hl.useRef(e);return Hl.useEffect(()=>{t.current=e}),Hl.useMemo(()=>(...a)=>t.current?.(...a),[])}var Kp=A(J(),1),XI="DismissableLayer",jp="dismissableLayer.update",jI="dismissableLayer.pointerDownOutside",KI="dismissableLayer.focusOutside",ey,ay=ye.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),Wp=ye.forwardRef((e,t)=>{let{disableOutsidePointerEvents:a=!1,deferPointerDownOutside:o=!1,onEscapeKeyDown:r,onPointerDownOutside:l,onFocusOutside:n,onInteractOutside:i,onDismiss:s,...u}=e,d=ye.useContext(ay),[f,c]=ye.useState(null),m=f?.ownerDocument??globalThis?.document,[,b]=ye.useState({}),v=Pe(t,c),w=Array.from(d.layers),[h]=[...d.layersWithOutsidePointerEventsDisabled].slice(-1),p=w.indexOf(h),g=f?w.indexOf(f):-1,y=d.layersWithOutsidePointerEventsDisabled.size>0,S=g>=p,k=ye.useRef(!1),L=YI(z=>{let K=z.target;if(!(K instanceof Node))return;let $=[...d.branches].some(G=>G.contains(K));!S||$||(l?.(z),i?.(z),z.defaultPrevented||s?.())},{ownerDocument:m,deferPointerDownOutside:o,isDeferredPointerDownOutsideRef:k,dismissableSurfaces:d.dismissableSurfaces}),C=QI(z=>{if(o&&k.current)return;let K=z.target;[...d.branches].some(G=>G.contains(K))||(n?.(z),i?.(z),z.defaultPrevented||s?.())},m),E=f?g===w.length-1:!1,T=Q0(z=>{z.key==="Escape"&&(r?.(z),!z.defaultPrevented&&s&&(z.preventDefault(),s()))});return ye.useEffect(()=>{if(E)return m.addEventListener("keydown",T,{capture:!0}),()=>m.removeEventListener("keydown",T,{capture:!0})},[m,E]),ye.useEffect(()=>{if(f)return a&&(d.layersWithOutsidePointerEventsDisabled.size===0&&(ey=m.body.style.pointerEvents,m.body.style.pointerEvents="none"),d.layersWithOutsidePointerEventsDisabled.add(f)),d.layers.add(f),ty(),()=>{a&&(d.layersWithOutsidePointerEventsDisabled.delete(f),d.layersWithOutsidePointerEventsDisabled.size===0&&(m.body.style.pointerEvents=ey))}},[f,m,a,d]),ye.useEffect(()=>()=>{f&&(d.layers.delete(f),d.layersWithOutsidePointerEventsDisabled.delete(f),ty())},[f,d]),ye.useEffect(()=>{let z=()=>b({});return document.addEventListener(jp,z),()=>document.removeEventListener(jp,z)},[]),(0,Kp.jsx)(Oe.div,{...u,ref:v,style:{pointerEvents:y?S?"auto":"none":void 0,...e.style},onFocusCapture:te(e.onFocusCapture,C.onFocusCapture),onBlurCapture:te(e.onBlurCapture,C.onBlurCapture),onPointerDownCapture:te(e.onPointerDownCapture,L.onPointerDownCapture)})});Wp.displayName=XI;var WI="DismissableLayerBranch",ZI=ye.forwardRef((e,t)=>{let a=ye.useContext(ay),o=ye.useRef(null),r=Pe(t,o);return ye.useEffect(()=>{let l=o.current;if(l)return a.branches.add(l),()=>{a.branches.delete(l)}},[a.branches]),(0,Kp.jsx)(Oe.div,{...e,ref:r})});ZI.displayName=WI;function YI(e,t){let{ownerDocument:a=globalThis?.document,deferPointerDownOutside:o=!1,isDeferredPointerDownOutsideRef:r,dismissableSurfaces:l}=t,n=Rt(e),i=ye.useRef(!1),s=ye.useRef(!1),u=ye.useRef(new Map),d=ye.useRef(()=>{});return ye.useEffect(()=>{function f(){s.current=!1,r.current=!1,u.current.clear()}function c(){return Array.from(u.current.values()).some(Boolean)}function m(p){if(!s.current)return;let g=p.target;g instanceof Node&&[...l].some(S=>S.contains(g))||u.current.set(p.type,!0),p.type==="click"&&window.setTimeout(()=>{s.current&&d.current()},0)}function b(p){s.current&&u.current.set(p.type,!1)}let v=p=>{if(p.target&&!i.current){let y=function(){a.removeEventListener("click",d.current);let k=c();f(),k||oy(jI,n,S,{discrete:!0})};var g=y;let S={originalEvent:p};s.current=!0,r.current=o&&p.button===0,u.current.clear(),!o||p.button!==0?y():(a.removeEventListener("click",d.current),d.current=y,a.addEventListener("click",d.current,{once:!0}))}else a.removeEventListener("click",d.current),f();i.current=!1},w=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(let p of w)a.addEventListener(p,m,!0),a.addEventListener(p,b);let h=window.setTimeout(()=>{a.addEventListener("pointerdown",v)},0);return()=>{window.clearTimeout(h),a.removeEventListener("pointerdown",v),a.removeEventListener("click",d.current);for(let p of w)a.removeEventListener(p,m,!0),a.removeEventListener(p,b)}},[a,n,o,r,l]),{onPointerDownCapture:()=>i.current=!0}}function QI(e,t=globalThis?.document){let a=Rt(e),o=ye.useRef(!1);return ye.useEffect(()=>{let r=l=>{l.target&&!o.current&&oy(KI,a,{originalEvent:l},{discrete:!1})};return t.addEventListener("focusin",r),()=>t.removeEventListener("focusin",r)},[t,a]),{onFocusCapture:()=>o.current=!0,onBlurCapture:()=>o.current=!1}}function ty(){let e=new CustomEvent(jp);document.dispatchEvent(e)}function oy(e,t,a,{discrete:o}){let r=a.originalEvent.target,l=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:a});t&&r.addEventListener(e,t,{once:!0}),o?Xu(r,l):r.dispatchEvent(l)}var ta=A(q(),1);var sy=A(J(),1),Zp="focusScope.autoFocusOnMount",Yp="focusScope.autoFocusOnUnmount",ry={bubbles:!1,cancelable:!0},JI="FocusScope",Qp=ta.forwardRef((e,t)=>{let{loop:a=!1,trapped:o=!1,onMountAutoFocus:r,onUnmountAutoFocus:l,...n}=e,[i,s]=ta.useState(null),u=Rt(r),d=Rt(l),f=ta.useRef(null),c=Pe(t,s),m=ta.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;ta.useEffect(()=>{if(o){let p=function(k){if(m.paused||!i)return;let L=k.target;i.contains(L)?f.current=L:Vo(f.current,{select:!0})},g=function(k){if(m.paused||!i)return;let L=k.relatedTarget;L!==null&&(i.contains(L)||Vo(f.current,{select:!0}))},y=function(k){if(document.activeElement===document.body)for(let C of k)C.removedNodes.length>0&&Vo(i)};var v=p,w=g,h=y;document.addEventListener("focusin",p),document.addEventListener("focusout",g);let S=new MutationObserver(y);return i&&S.observe(i,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",p),document.removeEventListener("focusout",g),S.disconnect()}}},[o,i,m.paused]),ta.useEffect(()=>{if(i){ny.add(m);let v=document.activeElement;if(!i.contains(v)){let h=new CustomEvent(Zp,ry);i.addEventListener(Zp,u),i.dispatchEvent(h),h.defaultPrevented||($I(rk(uy(i)),{select:!0}),document.activeElement===v&&Vo(i))}return()=>{i.removeEventListener(Zp,u),setTimeout(()=>{let h=new CustomEvent(Yp,ry);i.addEventListener(Yp,d),i.dispatchEvent(h),h.defaultPrevented||Vo(v??document.body,{select:!0}),i.removeEventListener(Yp,d),ny.remove(m)},0)}}},[i,u,d,m]);let b=ta.useCallback(v=>{if(!a&&!o||m.paused)return;let w=v.key==="Tab"&&!v.altKey&&!v.ctrlKey&&!v.metaKey,h=document.activeElement;if(w&&h){let p=v.currentTarget,[g,y]=ek(p);g&&y?!v.shiftKey&&h===y?(v.preventDefault(),a&&Vo(g,{select:!0})):v.shiftKey&&h===g&&(v.preventDefault(),a&&Vo(y,{select:!0})):h===p&&v.preventDefault()}},[a,o,m.paused]);return(0,sy.jsx)(Oe.div,{tabIndex:-1,...n,ref:c,onKeyDown:b})});Qp.displayName=JI;function $I(e,{select:t=!1}={}){let a=document.activeElement;for(let o of e)if(Vo(o,{select:t}),document.activeElement!==a)return}function ek(e){let t=uy(e),a=ly(t,e),o=ly(t.reverse(),e);return[a,o]}function uy(e){let t=[],a=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:o=>{let r=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||r?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;a.nextNode();)t.push(a.currentNode);return t}function ly(e,t){for(let a of e)if(!tk(a,{upTo:t}))return a}function tk(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function ak(e){return e instanceof HTMLInputElement&&"select"in e}function Vo(e,{select:t=!1}={}){if(e&&e.focus){let a=document.activeElement;e.focus({preventScroll:!0}),e!==a&&ak(e)&&t&&e.select()}}var ny=ok();function ok(){let e=[];return{add(t){let a=e[0];t!==a&&a?.pause(),e=iy(e,t),e.unshift(t)},remove(t){e=iy(e,t),e[0]?.resume()}}}function iy(e,t){let a=[...e],o=a.indexOf(t);return o!==-1&&a.splice(o,1),a}function rk(e){return e.filter(t=>t.tagName!=="A")}var $u=A(q(),1),dy=A(jr(),1);var fy=A(J(),1),lk="Portal",Jp=$u.forwardRef((e,t)=>{let{container:a,...o}=e,[r,l]=$u.useState(!1);it(()=>l(!0),[]);let n=a||r&&globalThis?.document?.body;return n?dy.createPortal((0,fy.jsx)(Oe.div,{...o,ref:t}),n):null});Jp.displayName=lk;var py=A(q(),1),ed=0,ql=null;function my(){py.useEffect(()=>{ql||(ql={start:cy(),end:cy()});let{start:e,end:t}=ql;return document.body.firstElementChild!==e&&document.body.insertAdjacentElement("afterbegin",e),document.body.lastElementChild!==t&&document.body.insertAdjacentElement("beforeend",t),ed++,()=>{ed===1&&(ql?.start.remove(),ql?.end.remove(),ql=null),ed=Math.max(0,ed-1)}},[])}function cy(){let e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var It=function(){return It=Object.assign||function(t){for(var a,o=1,r=arguments.length;o<r;o++){a=arguments[o];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(t[l]=a[l])}return t},It.apply(this,arguments)};function td(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]]);return a}function hy(e,t,a){if(a||arguments.length===2)for(var o=0,r=t.length,l;o<r;o++)(l||!(o in t))&&(l||(l=Array.prototype.slice.call(t,0,o)),l[o]=t[o]);return e.concat(l||Array.prototype.slice.call(t))}var nd=A(q());var ct=A(q());var Rr="right-scroll-bar-position",Ir="width-before-scroll-bar",$p="with-scroll-bars-hidden",em="--removed-body-scroll-bar-size";function ad(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}var gy=A(q());function xy(e,t){var a=(0,gy.useState)(function(){return{value:e,callback:t,facade:{get current(){return a.value},set current(o){var r=a.value;r!==o&&(a.value=o,a.callback(o,r))}}}})[0];return a.callback=t,a.facade}var od=A(q());var nk=typeof window<"u"?od.useLayoutEffect:od.useEffect,vy=new WeakMap;function tm(e,t){var a=xy(t||null,function(o){return e.forEach(function(r){return ad(r,o)})});return nk(function(){var o=vy.get(a);if(o){var r=new Set(o),l=new Set(e),n=a.current;r.forEach(function(i){l.has(i)||ad(i,null)}),l.forEach(function(i){r.has(i)||ad(i,n)})}vy.set(a,e)},[e]),a}function ik(e){return e}function sk(e,t){t===void 0&&(t=ik);var a=[],o=!1,r={read:function(){if(o)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return a.length?a[a.length-1]:e},useMedium:function(l){var n=t(l,o);return a.push(n),function(){a=a.filter(function(i){return i!==n})}},assignSyncMedium:function(l){for(o=!0;a.length;){var n=a;a=[],n.forEach(l)}a={push:function(i){return l(i)},filter:function(){return a}}},assignMedium:function(l){o=!0;var n=[];if(a.length){var i=a;a=[],i.forEach(l),n=a}var s=function(){var d=n;n=[],d.forEach(l)},u=function(){return Promise.resolve().then(s)};u(),a={push:function(d){n.push(d),u()},filter:function(d){return n=n.filter(d),a}}}};return r}function am(e){e===void 0&&(e={});var t=sk(null);return t.options=It({async:!0,ssr:!1},e),t}var by=A(q()),yy=function(e){var t=e.sideCar,a=td(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=t.read();if(!o)throw new Error("Sidecar medium not found");return by.createElement(o,It({},a))};yy.isSideCarExport=!0;function om(e,t){return e.useMedium(t),yy}var rd=am();var rm=function(){},Ai=ct.forwardRef(function(e,t){var a=ct.useRef(null),o=ct.useState({onScrollCapture:rm,onWheelCapture:rm,onTouchMoveCapture:rm}),r=o[0],l=o[1],n=e.forwardProps,i=e.children,s=e.className,u=e.removeScrollBar,d=e.enabled,f=e.shards,c=e.sideCar,m=e.noRelative,b=e.noIsolation,v=e.inert,w=e.allowPinchZoom,h=e.as,p=h===void 0?"div":h,g=e.gapMode,y=td(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),S=c,k=tm([a,t]),L=It(It({},y),r);return ct.createElement(ct.Fragment,null,d&&ct.createElement(S,{sideCar:rd,removeScrollBar:u,shards:f,noRelative:m,noIsolation:b,inert:v,setCallbacks:l,allowPinchZoom:!!w,lockRef:a,gapMode:g}),n?ct.cloneElement(ct.Children.only(i),It(It({},L),{ref:k})):ct.createElement(p,It({},L,{className:s,ref:k}),i))});Ai.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Ai.classNames={fullWidth:Ir,zeroRight:Rr};var Me=A(q());var Vl=A(q());var Sy=A(q());var wy;var Cy=function(){if(wy)return wy;if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function uk(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=Cy();return t&&e.setAttribute("nonce",t),e}function dk(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function fk(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var lm=function(){var e=0,t=null;return{add:function(a){e==0&&(t=uk())&&(dk(t,a),fk(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}};var nm=function(){var e=lm();return function(t,a){Sy.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&a])}};var Mi=function(){var e=nm(),t=function(a){var o=a.styles,r=a.dynamic;return e(o,r),null};return t};var ck={left:0,top:0,right:0,gap:0},im=function(e){return parseInt(e||"",10)||0},pk=function(e){var t=window.getComputedStyle(document.body),a=t[e==="padding"?"paddingLeft":"marginLeft"],o=t[e==="padding"?"paddingTop":"marginTop"],r=t[e==="padding"?"paddingRight":"marginRight"];return[im(a),im(o),im(r)]},sm=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return ck;var t=pk(e),a=document.documentElement.clientWidth,o=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,o-a+t[2]-t[0])}};var mk=Mi(),Gl="data-scroll-locked",hk=function(e,t,a,o){var r=e.left,l=e.top,n=e.right,i=e.gap;return a===void 0&&(a="margin"),`
  .`.concat($p,` {
   overflow: hidden `).concat(o,`;
   padding-right: `).concat(i,"px ").concat(o,`;
  }
  body[`).concat(Gl,`] {
    overflow: hidden `).concat(o,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(o,";"),a==="margin"&&`
    padding-left: `.concat(r,`px;
    padding-top: `).concat(l,`px;
    padding-right: `).concat(n,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(o,`;
    `),a==="padding"&&"padding-right: ".concat(i,"px ").concat(o,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(Rr,` {
    right: `).concat(i,"px ").concat(o,`;
  }
  
  .`).concat(Ir,` {
    margin-right: `).concat(i,"px ").concat(o,`;
  }
  
  .`).concat(Rr," .").concat(Rr,` {
    right: 0 `).concat(o,`;
  }
  
  .`).concat(Ir," .").concat(Ir,` {
    margin-right: 0 `).concat(o,`;
  }
  
  body[`).concat(Gl,`] {
    `).concat(em,": ").concat(i,`px;
  }
`)},Ly=function(){var e=parseInt(document.body.getAttribute(Gl)||"0",10);return isFinite(e)?e:0},gk=function(){Vl.useEffect(function(){return document.body.setAttribute(Gl,(Ly()+1).toString()),function(){var e=Ly()-1;e<=0?document.body.removeAttribute(Gl):document.body.setAttribute(Gl,e.toString())}},[])},um=function(e){var t=e.noRelative,a=e.noImportant,o=e.gapMode,r=o===void 0?"margin":o;gk();var l=Vl.useMemo(function(){return sm(r)},[r]);return Vl.createElement(mk,{styles:hk(l,!t,r,a?"":"!important")})};var dm=!1;if(typeof window<"u")try{Ei=Object.defineProperty({},"passive",{get:function(){return dm=!0,!0}}),window.addEventListener("test",Ei,Ei),window.removeEventListener("test",Ei,Ei)}catch{dm=!1}var Ei,kr=dm?{passive:!1}:!1;var xk=function(e){return e.tagName==="TEXTAREA"},Ry=function(e,t){if(!(e instanceof Element))return!1;var a=window.getComputedStyle(e);return a[t]!=="hidden"&&!(a.overflowY===a.overflowX&&!xk(e)&&a[t]==="visible")},vk=function(e){return Ry(e,"overflowY")},bk=function(e){return Ry(e,"overflowX")},fm=function(e,t){var a=t.ownerDocument,o=t;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var r=Iy(e,o);if(r){var l=ky(e,o),n=l[1],i=l[2];if(n>i)return!0}o=o.parentNode}while(o&&o!==a.body);return!1},yk=function(e){var t=e.scrollTop,a=e.scrollHeight,o=e.clientHeight;return[t,a,o]},wk=function(e){var t=e.scrollLeft,a=e.scrollWidth,o=e.clientWidth;return[t,a,o]},Iy=function(e,t){return e==="v"?vk(t):bk(t)},ky=function(e,t){return e==="v"?yk(t):wk(t)},Ck=function(e,t){return e==="h"&&t==="rtl"?-1:1},Ay=function(e,t,a,o,r){var l=Ck(e,window.getComputedStyle(t).direction),n=l*o,i=a.target,s=t.contains(i),u=!1,d=n>0,f=0,c=0;do{if(!i)break;var m=ky(e,i),b=m[0],v=m[1],w=m[2],h=v-w-l*b;(b||h)&&Iy(e,i)&&(f+=h,c+=b);var p=i.parentNode;i=p&&p.nodeType===Node.DOCUMENT_FRAGMENT_NODE?p.host:p}while(!s&&i!==document.body||s&&(t.contains(i)||t===i));return(d&&(r&&Math.abs(f)<1||!r&&n>f)||!d&&(r&&Math.abs(c)<1||!r&&-n>c))&&(u=!0),u};var ld=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},My=function(e){return[e.deltaX,e.deltaY]},Ey=function(e){return e&&"current"in e?e.current:e},Sk=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Lk=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Rk=0,Xl=[];function Dy(e){var t=Me.useRef([]),a=Me.useRef([0,0]),o=Me.useRef(),r=Me.useState(Rk++)[0],l=Me.useState(Mi)[0],n=Me.useRef(e);Me.useEffect(function(){n.current=e},[e]),Me.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(r));var v=hy([e.lockRef.current],(e.shards||[]).map(Ey),!0).filter(Boolean);return v.forEach(function(w){return w.classList.add("allow-interactivity-".concat(r))}),function(){document.body.classList.remove("block-interactivity-".concat(r)),v.forEach(function(w){return w.classList.remove("allow-interactivity-".concat(r))})}}},[e.inert,e.lockRef.current,e.shards]);var i=Me.useCallback(function(v,w){if("touches"in v&&v.touches.length===2||v.type==="wheel"&&v.ctrlKey)return!n.current.allowPinchZoom;var h=ld(v),p=a.current,g="deltaX"in v?v.deltaX:p[0]-h[0],y="deltaY"in v?v.deltaY:p[1]-h[1],S,k=v.target,L=Math.abs(g)>Math.abs(y)?"h":"v";if("touches"in v&&L==="h"&&k.type==="range")return!1;var C=window.getSelection(),E=C&&C.anchorNode,T=E?E===k||E.contains(k):!1;if(T)return!1;var z=fm(L,k);if(!z)return!0;if(z?S=L:(S=L==="v"?"h":"v",z=fm(L,k)),!z)return!1;if(!o.current&&"changedTouches"in v&&(g||y)&&(o.current=S),!S)return!0;var K=o.current||S;return Ay(K,w,v,K==="h"?g:y,!0)},[]),s=Me.useCallback(function(v){var w=v;if(!(!Xl.length||Xl[Xl.length-1]!==l)){var h="deltaY"in w?My(w):ld(w),p=t.current.filter(function(S){return S.name===w.type&&(S.target===w.target||w.target===S.shadowParent)&&Sk(S.delta,h)})[0];if(p&&p.should){w.cancelable&&w.preventDefault();return}if(!p){var g=(n.current.shards||[]).map(Ey).filter(Boolean).filter(function(S){return S.contains(w.target)}),y=g.length>0?i(w,g[0]):!n.current.noIsolation;y&&w.cancelable&&w.preventDefault()}}},[]),u=Me.useCallback(function(v,w,h,p){var g={name:v,delta:w,target:h,should:p,shadowParent:Ik(h)};t.current.push(g),setTimeout(function(){t.current=t.current.filter(function(y){return y!==g})},1)},[]),d=Me.useCallback(function(v){a.current=ld(v),o.current=void 0},[]),f=Me.useCallback(function(v){u(v.type,My(v),v.target,i(v,e.lockRef.current))},[]),c=Me.useCallback(function(v){u(v.type,ld(v),v.target,i(v,e.lockRef.current))},[]);Me.useEffect(function(){return Xl.push(l),e.setCallbacks({onScrollCapture:f,onWheelCapture:f,onTouchMoveCapture:c}),document.addEventListener("wheel",s,kr),document.addEventListener("touchmove",s,kr),document.addEventListener("touchstart",d,kr),function(){Xl=Xl.filter(function(v){return v!==l}),document.removeEventListener("wheel",s,kr),document.removeEventListener("touchmove",s,kr),document.removeEventListener("touchstart",d,kr)}},[]);var m=e.removeScrollBar,b=e.inert;return Me.createElement(Me.Fragment,null,b?Me.createElement(l,{styles:Lk(r)}):null,m?Me.createElement(um,{noRelative:e.noRelative,gapMode:e.gapMode}):null)}function Ik(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}var Ty=om(rd,Dy);var Py=nd.forwardRef(function(e,t){return nd.createElement(Ai,It({},e,{ref:t,sideCar:Ty}))});Py.classNames=Ai.classNames;var cm=Py;var kk=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},jl=new WeakMap,id=new WeakMap,sd={},pm=0,Oy=function(e){return e&&(e.host||Oy(e.parentNode))},Ak=function(e,t){return t.map(function(a){if(e.contains(a))return a;var o=Oy(a);return o&&e.contains(o)?o:(console.error("aria-hidden",a,"in not contained inside",e,". Doing nothing"),null)}).filter(function(a){return!!a})},Mk=function(e,t,a,o){var r=Ak(t,Array.isArray(e)?e:[e]);sd[a]||(sd[a]=new WeakMap);var l=sd[a],n=[],i=new Set,s=new Set(r),u=function(f){!f||i.has(f)||(i.add(f),u(f.parentNode))};r.forEach(u);var d=function(f){!f||s.has(f)||Array.prototype.forEach.call(f.children,function(c){if(i.has(c))d(c);else try{var m=c.getAttribute(o),b=m!==null&&m!=="false",v=(jl.get(c)||0)+1,w=(l.get(c)||0)+1;jl.set(c,v),l.set(c,w),n.push(c),v===1&&b&&id.set(c,!0),w===1&&c.setAttribute(a,"true"),b||c.setAttribute(o,"true")}catch(h){console.error("aria-hidden: cannot operate on ",c,h)}})};return d(t),i.clear(),pm++,function(){n.forEach(function(f){var c=jl.get(f)-1,m=l.get(f)-1;jl.set(f,c),l.set(f,m),c||(id.has(f)||f.removeAttribute(o),id.delete(f)),m||f.removeAttribute(a)}),pm--,pm||(jl=new WeakMap,jl=new WeakMap,id=new WeakMap,sd={})}},By=function(e,t,a){a===void 0&&(a="data-aria-hidden");var o=Array.from(Array.isArray(e)?e:[e]),r=t||kk(e);return r?(o.push.apply(o,Array.from(r.querySelectorAll("[aria-live], script"))),Mk(o,r,a,"aria-hidden")):function(){return null}};var Ny=A(q(),1);function Uy(e){let[t,a]=Ny.useState(void 0);return it(()=>{if(e){a({width:e.offsetWidth,height:e.offsetHeight});let o=new ResizeObserver(r=>{if(!Array.isArray(r)||!r.length)return;let l=r[0],n,i;if("borderBoxSize"in l){let s=l.borderBoxSize,u=Array.isArray(s)?s[0]:s;n=u.inlineSize,i=u.blockSize}else n=e.offsetWidth,i=e.offsetHeight;a({width:n,height:i})});return o.observe(e,{box:"border-box"}),()=>o.unobserve(e)}else a(void 0)},[e]),t}var F=A(q(),1);var st=A(q(),1);var _y=["top","right","bottom","left"];var Ia=Math.min,xt=Math.max,Ti=Math.round,Pi=Math.floor,da=e=>({x:e,y:e}),Ek={left:"right",right:"left",bottom:"top",top:"bottom"};function dd(e,t,a){return xt(e,Ia(t,a))}function ka(e,t){return typeof e=="function"?e(t):e}function Aa(e){return e.split("-")[0]}function Ar(e){return e.split("-")[1]}function fd(e){return e==="x"?"y":"x"}function cd(e){return e==="y"?"height":"width"}function fa(e){let t=e[0];return t==="t"||t==="b"?"y":"x"}function pd(e){return fd(fa(e))}function Hy(e,t,a){a===void 0&&(a=!1);let o=Ar(e),r=pd(e),l=cd(r),n=r==="x"?o===(a?"end":"start")?"right":"left":o==="start"?"bottom":"top";return t.reference[l]>t.floating[l]&&(n=Di(n)),[n,Di(n)]}function qy(e){let t=Di(e);return[ud(e),t,ud(t)]}function ud(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}var zy=["left","right"],Fy=["right","left"],Dk=["top","bottom"],Tk=["bottom","top"];function Pk(e,t,a){switch(e){case"top":case"bottom":return a?t?Fy:zy:t?zy:Fy;case"left":case"right":return t?Dk:Tk;default:return[]}}function Gy(e,t,a,o){let r=Ar(e),l=Pk(Aa(e),a==="start",o);return r&&(l=l.map(n=>n+"-"+r),t&&(l=l.concat(l.map(ud)))),l}function Di(e){let t=Aa(e);return Ek[t]+e.slice(t.length)}function Ok(e){return{top:0,right:0,bottom:0,left:0,...e}}function mm(e){return typeof e!="number"?Ok(e):{top:e,right:e,bottom:e,left:e}}function Mr(e){let{x:t,y:a,width:o,height:r}=e;return{width:o,height:r,top:a,left:t,right:t+o,bottom:a+r,x:t,y:a}}function Vy(e,t,a){let{reference:o,floating:r}=e,l=fa(t),n=pd(t),i=cd(n),s=Aa(t),u=l==="y",d=o.x+o.width/2-r.width/2,f=o.y+o.height/2-r.height/2,c=o[i]/2-r[i]/2,m;switch(s){case"top":m={x:d,y:o.y-r.height};break;case"bottom":m={x:d,y:o.y+o.height};break;case"right":m={x:o.x+o.width,y:f};break;case"left":m={x:o.x-r.width,y:f};break;default:m={x:o.x,y:o.y}}switch(Ar(t)){case"start":m[n]-=c*(a&&u?-1:1);break;case"end":m[n]+=c*(a&&u?-1:1);break}return m}async function Ky(e,t){var a;t===void 0&&(t={});let{x:o,y:r,platform:l,rects:n,elements:i,strategy:s}=e,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:f="floating",altBoundary:c=!1,padding:m=0}=ka(t,e),b=mm(m),w=i[c?f==="floating"?"reference":"floating":f],h=Mr(await l.getClippingRect({element:(a=await(l.isElement==null?void 0:l.isElement(w)))==null||a?w:w.contextElement||await(l.getDocumentElement==null?void 0:l.getDocumentElement(i.floating)),boundary:u,rootBoundary:d,strategy:s})),p=f==="floating"?{x:o,y:r,width:n.floating.width,height:n.floating.height}:n.reference,g=await(l.getOffsetParent==null?void 0:l.getOffsetParent(i.floating)),y=await(l.isElement==null?void 0:l.isElement(g))?await(l.getScale==null?void 0:l.getScale(g))||{x:1,y:1}:{x:1,y:1},S=Mr(l.convertOffsetParentRelativeRectToViewportRelativeRect?await l.convertOffsetParentRelativeRectToViewportRelativeRect({elements:i,rect:p,offsetParent:g,strategy:s}):p);return{top:(h.top-S.top+b.top)/y.y,bottom:(S.bottom-h.bottom+b.bottom)/y.y,left:(h.left-S.left+b.left)/y.x,right:(S.right-h.right+b.right)/y.x}}var Bk=50,Wy=async(e,t,a)=>{let{placement:o="bottom",strategy:r="absolute",middleware:l=[],platform:n}=a,i=n.detectOverflow?n:{...n,detectOverflow:Ky},s=await(n.isRTL==null?void 0:n.isRTL(t)),u=await n.getElementRects({reference:e,floating:t,strategy:r}),{x:d,y:f}=Vy(u,o,s),c=o,m=0,b={};for(let v=0;v<l.length;v++){let w=l[v];if(!w)continue;let{name:h,fn:p}=w,{x:g,y,data:S,reset:k}=await p({x:d,y:f,initialPlacement:o,placement:c,strategy:r,middlewareData:b,rects:u,platform:i,elements:{reference:e,floating:t}});d=g??d,f=y??f,b[h]={...b[h],...S},k&&m<Bk&&(m++,typeof k=="object"&&(k.placement&&(c=k.placement),k.rects&&(u=k.rects===!0?await n.getElementRects({reference:e,floating:t,strategy:r}):k.rects),{x:d,y:f}=Vy(u,c,s)),v=-1)}return{x:d,y:f,placement:c,strategy:r,middlewareData:b}},Zy=e=>({name:"arrow",options:e,async fn(t){let{x:a,y:o,placement:r,rects:l,platform:n,elements:i,middlewareData:s}=t,{element:u,padding:d=0}=ka(e,t)||{};if(u==null)return{};let f=mm(d),c={x:a,y:o},m=pd(r),b=cd(m),v=await n.getDimensions(u),w=m==="y",h=w?"top":"left",p=w?"bottom":"right",g=w?"clientHeight":"clientWidth",y=l.reference[b]+l.reference[m]-c[m]-l.floating[b],S=c[m]-l.reference[m],k=await(n.getOffsetParent==null?void 0:n.getOffsetParent(u)),L=k?k[g]:0;(!L||!await(n.isElement==null?void 0:n.isElement(k)))&&(L=i.floating[g]||l.floating[b]);let C=y/2-S/2,E=L/2-v[b]/2-1,T=Ia(f[h],E),z=Ia(f[p],E),K=T,$=L-v[b]-z,G=L/2-v[b]/2+C,pe=dd(K,G,$),V=!s.arrow&&Ar(r)!=null&&G!==pe&&l.reference[b]/2-(G<K?T:z)-v[b]/2<0,Q=V?G<K?G-K:G-$:0;return{[m]:c[m]+Q,data:{[m]:pe,centerOffset:G-pe-Q,...V&&{alignmentOffset:Q}},reset:V}}});var Yy=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var a,o;let{placement:r,middlewareData:l,rects:n,initialPlacement:i,platform:s,elements:u}=t,{mainAxis:d=!0,crossAxis:f=!0,fallbackPlacements:c,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:v=!0,...w}=ka(e,t);if((a=l.arrow)!=null&&a.alignmentOffset)return{};let h=Aa(r),p=fa(i),g=Aa(i)===i,y=await(s.isRTL==null?void 0:s.isRTL(u.floating)),S=c||(g||!v?[Di(i)]:qy(i)),k=b!=="none";!c&&k&&S.push(...Gy(i,v,b,y));let L=[i,...S],C=await s.detectOverflow(t,w),E=[],T=((o=l.flip)==null?void 0:o.overflows)||[];if(d&&E.push(C[h]),f){let G=Hy(r,n,y);E.push(C[G[0]],C[G[1]])}if(T=[...T,{placement:r,overflows:E}],!E.every(G=>G<=0)){var z,K;let G=(((z=l.flip)==null?void 0:z.index)||0)+1,pe=L[G];if(pe&&(!(f==="alignment"?p!==fa(pe):!1)||T.every(H=>fa(H.placement)===p?H.overflows[0]>0:!0)))return{data:{index:G,overflows:T},reset:{placement:pe}};let V=(K=T.filter(Q=>Q.overflows[0]<=0).sort((Q,H)=>Q.overflows[1]-H.overflows[1])[0])==null?void 0:K.placement;if(!V)switch(m){case"bestFit":{var $;let Q=($=T.filter(H=>{if(k){let B=fa(H.placement);return B===p||B==="y"}return!0}).map(H=>[H.placement,H.overflows.filter(B=>B>0).reduce((B,P)=>B+P,0)]).sort((H,B)=>H[1]-B[1])[0])==null?void 0:$[0];Q&&(V=Q);break}case"initialPlacement":V=i;break}if(r!==V)return{reset:{placement:V}}}return{}}}};function Xy(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function jy(e){return _y.some(t=>e[t]>=0)}var Qy=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(t){let{rects:a,platform:o}=t,{strategy:r="referenceHidden",...l}=ka(e,t);switch(r){case"referenceHidden":{let n=await o.detectOverflow(t,{...l,elementContext:"reference"}),i=Xy(n,a.reference);return{data:{referenceHiddenOffsets:i,referenceHidden:jy(i)}}}case"escaped":{let n=await o.detectOverflow(t,{...l,altBoundary:!0}),i=Xy(n,a.floating);return{data:{escapedOffsets:i,escaped:jy(i)}}}default:return{}}}}};var Jy=new Set(["left","top"]);async function Nk(e,t){let{placement:a,platform:o,elements:r}=e,l=await(o.isRTL==null?void 0:o.isRTL(r.floating)),n=Aa(a),i=Ar(a),s=fa(a)==="y",u=Jy.has(n)?-1:1,d=l&&s?-1:1,f=ka(t,e),{mainAxis:c,crossAxis:m,alignmentAxis:b}=typeof f=="number"?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:f.mainAxis||0,crossAxis:f.crossAxis||0,alignmentAxis:f.alignmentAxis};return i&&typeof b=="number"&&(m=i==="end"?b*-1:b),s?{x:m*d,y:c*u}:{x:c*u,y:m*d}}var $y=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var a,o;let{x:r,y:l,placement:n,middlewareData:i}=t,s=await Nk(t,e);return n===((a=i.offset)==null?void 0:a.placement)&&(o=i.arrow)!=null&&o.alignmentOffset?{}:{x:r+s.x,y:l+s.y,data:{...s,placement:n}}}}},ew=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:a,y:o,placement:r,platform:l}=t,{mainAxis:n=!0,crossAxis:i=!1,limiter:s={fn:h=>{let{x:p,y:g}=h;return{x:p,y:g}}},...u}=ka(e,t),d={x:a,y:o},f=await l.detectOverflow(t,u),c=fa(Aa(r)),m=fd(c),b=d[m],v=d[c];if(n){let h=m==="y"?"top":"left",p=m==="y"?"bottom":"right",g=b+f[h],y=b-f[p];b=dd(g,b,y)}if(i){let h=c==="y"?"top":"left",p=c==="y"?"bottom":"right",g=v+f[h],y=v-f[p];v=dd(g,v,y)}let w=s.fn({...t,[m]:b,[c]:v});return{...w,data:{x:w.x-a,y:w.y-o,enabled:{[m]:n,[c]:i}}}}}},tw=function(e){return e===void 0&&(e={}),{options:e,fn(t){let{x:a,y:o,placement:r,rects:l,middlewareData:n}=t,{offset:i=0,mainAxis:s=!0,crossAxis:u=!0}=ka(e,t),d={x:a,y:o},f=fa(r),c=fd(f),m=d[c],b=d[f],v=ka(i,t),w=typeof v=="number"?{mainAxis:v,crossAxis:0}:{mainAxis:0,crossAxis:0,...v};if(s){let g=c==="y"?"height":"width",y=l.reference[c]-l.floating[g]+w.mainAxis,S=l.reference[c]+l.reference[g]-w.mainAxis;m<y?m=y:m>S&&(m=S)}if(u){var h,p;let g=c==="y"?"width":"height",y=Jy.has(Aa(r)),S=l.reference[f]-l.floating[g]+(y&&((h=n.offset)==null?void 0:h[f])||0)+(y?0:w.crossAxis),k=l.reference[f]+l.reference[g]+(y?0:((p=n.offset)==null?void 0:p[f])||0)-(y?w.crossAxis:0);b<S?b=S:b>k&&(b=k)}return{[c]:m,[f]:b}}}},aw=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var a,o;let{placement:r,rects:l,platform:n,elements:i}=t,{apply:s=()=>{},...u}=ka(e,t),d=await n.detectOverflow(t,u),f=Aa(r),c=Ar(r),m=fa(r)==="y",{width:b,height:v}=l.floating,w,h;f==="top"||f==="bottom"?(w=f,h=c===(await(n.isRTL==null?void 0:n.isRTL(i.floating))?"start":"end")?"left":"right"):(h=f,w=c==="end"?"top":"bottom");let p=v-d.top-d.bottom,g=b-d.left-d.right,y=Ia(v-d[w],p),S=Ia(b-d[h],g),k=!t.middlewareData.shift,L=y,C=S;if((a=t.middlewareData.shift)!=null&&a.enabled.x&&(C=g),(o=t.middlewareData.shift)!=null&&o.enabled.y&&(L=p),k&&!c){let T=xt(d.left,0),z=xt(d.right,0),K=xt(d.top,0),$=xt(d.bottom,0);m?C=b-2*(T!==0||z!==0?T+z:xt(d.left,d.right)):L=v-2*(K!==0||$!==0?K+$:xt(d.top,d.bottom))}await s({...t,availableWidth:C,availableHeight:L});let E=await n.getDimensions(i.floating);return b!==E.width||v!==E.height?{reset:{rects:!0}}:{}}}};function md(){return typeof window<"u"}function Tr(e){return rw(e)?(e.nodeName||"").toLowerCase():"#document"}function kt(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function ca(e){var t;return(t=(rw(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function rw(e){return md()?e instanceof Node||e instanceof kt(e).Node:!1}function aa(e){return md()?e instanceof Element||e instanceof kt(e).Element:!1}function Ma(e){return md()?e instanceof HTMLElement||e instanceof kt(e).HTMLElement:!1}function ow(e){return!md()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof kt(e).ShadowRoot}function Kl(e){let{overflow:t,overflowX:a,overflowY:o,display:r}=oa(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+a)&&r!=="inline"&&r!=="contents"}function lw(e){return/^(table|td|th)$/.test(Tr(e))}function Oi(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}var Uk=/transform|translate|scale|rotate|perspective|filter/,zk=/paint|layout|strict|content/,Er=e=>!!e&&e!=="none",hm;function hd(e){let t=aa(e)?oa(e):e;return Er(t.transform)||Er(t.translate)||Er(t.scale)||Er(t.rotate)||Er(t.perspective)||!gd()&&(Er(t.backdropFilter)||Er(t.filter))||Uk.test(t.willChange||"")||zk.test(t.contain||"")}function nw(e){let t=no(e);for(;Ma(t)&&!Pr(t);){if(hd(t))return t;if(Oi(t))return null;t=no(t)}return null}function gd(){return hm==null&&(hm=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),hm}function Pr(e){return/^(html|body|#document)$/.test(Tr(e))}function oa(e){return kt(e).getComputedStyle(e)}function Bi(e){return aa(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function no(e){if(Tr(e)==="html")return e;let t=e.assignedSlot||e.parentNode||ow(e)&&e.host||ca(e);return ow(t)?t.host:t}function iw(e){let t=no(e);return Pr(t)?e.ownerDocument?e.ownerDocument.body:e.body:Ma(t)&&Kl(t)?t:iw(t)}function Dr(e,t,a){var o;t===void 0&&(t=[]),a===void 0&&(a=!0);let r=iw(e),l=r===((o=e.ownerDocument)==null?void 0:o.body),n=kt(r);if(l){let i=xd(n);return t.concat(n,n.visualViewport||[],Kl(r)?r:[],i&&a?Dr(i):[])}else return t.concat(r,Dr(r,[],a))}function xd(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function fw(e){let t=oa(e),a=parseFloat(t.width)||0,o=parseFloat(t.height)||0,r=Ma(e),l=r?e.offsetWidth:a,n=r?e.offsetHeight:o,i=Ti(a)!==l||Ti(o)!==n;return i&&(a=l,o=n),{width:a,height:o,$:i}}function xm(e){return aa(e)?e:e.contextElement}function Wl(e){let t=xm(e);if(!Ma(t))return da(1);let a=t.getBoundingClientRect(),{width:o,height:r,$:l}=fw(t),n=(l?Ti(a.width):a.width)/o,i=(l?Ti(a.height):a.height)/r;return(!n||!Number.isFinite(n))&&(n=1),(!i||!Number.isFinite(i))&&(i=1),{x:n,y:i}}var Fk=da(0);function cw(e){let t=kt(e);return!gd()||!t.visualViewport?Fk:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function _k(e,t,a){return t===void 0&&(t=!1),!a||t&&a!==kt(e)?!1:t}function Or(e,t,a,o){t===void 0&&(t=!1),a===void 0&&(a=!1);let r=e.getBoundingClientRect(),l=xm(e),n=da(1);t&&(o?aa(o)&&(n=Wl(o)):n=Wl(e));let i=_k(l,a,o)?cw(l):da(0),s=(r.left+i.x)/n.x,u=(r.top+i.y)/n.y,d=r.width/n.x,f=r.height/n.y;if(l){let c=kt(l),m=o&&aa(o)?kt(o):o,b=c,v=xd(b);for(;v&&o&&m!==b;){let w=Wl(v),h=v.getBoundingClientRect(),p=oa(v),g=h.left+(v.clientLeft+parseFloat(p.paddingLeft))*w.x,y=h.top+(v.clientTop+parseFloat(p.paddingTop))*w.y;s*=w.x,u*=w.y,d*=w.x,f*=w.y,s+=g,u+=y,b=kt(v),v=xd(b)}}return Mr({width:d,height:f,x:s,y:u})}function vd(e,t){let a=Bi(e).scrollLeft;return t?t.left+a:Or(ca(e)).left+a}function pw(e,t){let a=e.getBoundingClientRect(),o=a.left+t.scrollLeft-vd(e,a),r=a.top+t.scrollTop;return{x:o,y:r}}function Hk(e){let{elements:t,rect:a,offsetParent:o,strategy:r}=e,l=r==="fixed",n=ca(o),i=t?Oi(t.floating):!1;if(o===n||i&&l)return a;let s={scrollLeft:0,scrollTop:0},u=da(1),d=da(0),f=Ma(o);if((f||!f&&!l)&&((Tr(o)!=="body"||Kl(n))&&(s=Bi(o)),f)){let m=Or(o);u=Wl(o),d.x=m.x+o.clientLeft,d.y=m.y+o.clientTop}let c=n&&!f&&!l?pw(n,s):da(0);return{width:a.width*u.x,height:a.height*u.y,x:a.x*u.x-s.scrollLeft*u.x+d.x+c.x,y:a.y*u.y-s.scrollTop*u.y+d.y+c.y}}function qk(e){return Array.from(e.getClientRects())}function Gk(e){let t=ca(e),a=Bi(e),o=e.ownerDocument.body,r=xt(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth),l=xt(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight),n=-a.scrollLeft+vd(e),i=-a.scrollTop;return oa(o).direction==="rtl"&&(n+=xt(t.clientWidth,o.clientWidth)-r),{width:r,height:l,x:n,y:i}}var sw=25;function Vk(e,t){let a=kt(e),o=ca(e),r=a.visualViewport,l=o.clientWidth,n=o.clientHeight,i=0,s=0;if(r){l=r.width,n=r.height;let d=gd();(!d||d&&t==="fixed")&&(i=r.offsetLeft,s=r.offsetTop)}let u=vd(o);if(u<=0){let d=o.ownerDocument,f=d.body,c=getComputedStyle(f),m=d.compatMode==="CSS1Compat"&&parseFloat(c.marginLeft)+parseFloat(c.marginRight)||0,b=Math.abs(o.clientWidth-f.clientWidth-m);b<=sw&&(l-=b)}else u<=sw&&(l+=u);return{width:l,height:n,x:i,y:s}}function Xk(e,t){let a=Or(e,!0,t==="fixed"),o=a.top+e.clientTop,r=a.left+e.clientLeft,l=Ma(e)?Wl(e):da(1),n=e.clientWidth*l.x,i=e.clientHeight*l.y,s=r*l.x,u=o*l.y;return{width:n,height:i,x:s,y:u}}function uw(e,t,a){let o;if(t==="viewport")o=Vk(e,a);else if(t==="document")o=Gk(ca(e));else if(aa(t))o=Xk(t,a);else{let r=cw(e);o={x:t.x-r.x,y:t.y-r.y,width:t.width,height:t.height}}return Mr(o)}function mw(e,t){let a=no(e);return a===t||!aa(a)||Pr(a)?!1:oa(a).position==="fixed"||mw(a,t)}function jk(e,t){let a=t.get(e);if(a)return a;let o=Dr(e,[],!1).filter(i=>aa(i)&&Tr(i)!=="body"),r=null,l=oa(e).position==="fixed",n=l?no(e):e;for(;aa(n)&&!Pr(n);){let i=oa(n),s=hd(n);!s&&i.position==="fixed"&&(r=null),(l?!s&&!r:!s&&i.position==="static"&&!!r&&(r.position==="absolute"||r.position==="fixed")||Kl(n)&&!s&&mw(e,n))?o=o.filter(d=>d!==n):r=i,n=no(n)}return t.set(e,o),o}function Kk(e){let{element:t,boundary:a,rootBoundary:o,strategy:r}=e,n=[...a==="clippingAncestors"?Oi(t)?[]:jk(t,this._c):[].concat(a),o],i=uw(t,n[0],r),s=i.top,u=i.right,d=i.bottom,f=i.left;for(let c=1;c<n.length;c++){let m=uw(t,n[c],r);s=xt(m.top,s),u=Ia(m.right,u),d=Ia(m.bottom,d),f=xt(m.left,f)}return{width:u-f,height:d-s,x:f,y:s}}function Wk(e){let{width:t,height:a}=fw(e);return{width:t,height:a}}function Zk(e,t,a){let o=Ma(t),r=ca(t),l=a==="fixed",n=Or(e,!0,l,t),i={scrollLeft:0,scrollTop:0},s=da(0);function u(){s.x=vd(r)}if(o||!o&&!l)if((Tr(t)!=="body"||Kl(r))&&(i=Bi(t)),o){let m=Or(t,!0,l,t);s.x=m.x+t.clientLeft,s.y=m.y+t.clientTop}else r&&u();l&&!o&&r&&u();let d=r&&!o&&!l?pw(r,i):da(0),f=n.left+i.scrollLeft-s.x-d.x,c=n.top+i.scrollTop-s.y-d.y;return{x:f,y:c,width:n.width,height:n.height}}function gm(e){return oa(e).position==="static"}function dw(e,t){if(!Ma(e)||oa(e).position==="fixed")return null;if(t)return t(e);let a=e.offsetParent;return ca(e)===a&&(a=a.ownerDocument.body),a}function hw(e,t){let a=kt(e);if(Oi(e))return a;if(!Ma(e)){let r=no(e);for(;r&&!Pr(r);){if(aa(r)&&!gm(r))return r;r=no(r)}return a}let o=dw(e,t);for(;o&&lw(o)&&gm(o);)o=dw(o,t);return o&&Pr(o)&&gm(o)&&!hd(o)?a:o||nw(e)||a}var Yk=async function(e){let t=this.getOffsetParent||hw,a=this.getDimensions,o=await a(e.floating);return{reference:Zk(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Qk(e){return oa(e).direction==="rtl"}var gw={convertOffsetParentRelativeRectToViewportRelativeRect:Hk,getDocumentElement:ca,getClippingRect:Kk,getOffsetParent:hw,getElementRects:Yk,getClientRects:qk,getDimensions:Wk,getScale:Wl,isElement:aa,isRTL:Qk};function xw(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Jk(e,t){let a=null,o,r=ca(e);function l(){var i;clearTimeout(o),(i=a)==null||i.disconnect(),a=null}function n(i,s){i===void 0&&(i=!1),s===void 0&&(s=1),l();let u=e.getBoundingClientRect(),{left:d,top:f,width:c,height:m}=u;if(i||t(),!c||!m)return;let b=Pi(f),v=Pi(r.clientWidth-(d+c)),w=Pi(r.clientHeight-(f+m)),h=Pi(d),g={rootMargin:-b+"px "+-v+"px "+-w+"px "+-h+"px",threshold:xt(0,Ia(1,s))||1},y=!0;function S(k){let L=k[0].intersectionRatio;if(L!==s){if(!y)return n();L?n(!1,L):o=setTimeout(()=>{n(!1,1e-7)},1e3)}L===1&&!xw(u,e.getBoundingClientRect())&&n(),y=!1}try{a=new IntersectionObserver(S,{...g,root:r.ownerDocument})}catch{a=new IntersectionObserver(S,g)}a.observe(e)}return n(!0),l}function vm(e,t,a,o){o===void 0&&(o={});let{ancestorScroll:r=!0,ancestorResize:l=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:i=typeof IntersectionObserver=="function",animationFrame:s=!1}=o,u=xm(e),d=r||l?[...u?Dr(u):[],...t?Dr(t):[]]:[];d.forEach(h=>{r&&h.addEventListener("scroll",a,{passive:!0}),l&&h.addEventListener("resize",a)});let f=u&&i?Jk(u,a):null,c=-1,m=null;n&&(m=new ResizeObserver(h=>{let[p]=h;p&&p.target===u&&m&&t&&(m.unobserve(t),cancelAnimationFrame(c),c=requestAnimationFrame(()=>{var g;(g=m)==null||g.observe(t)})),a()}),u&&!s&&m.observe(u),t&&m.observe(t));let b,v=s?Or(e):null;s&&w();function w(){let h=Or(e);v&&!xw(v,h)&&a(),v=h,b=requestAnimationFrame(w)}return a(),()=>{var h;d.forEach(p=>{r&&p.removeEventListener("scroll",a),l&&p.removeEventListener("resize",a)}),f?.(),(h=m)==null||h.disconnect(),m=null,s&&cancelAnimationFrame(b)}}var vw=$y;var bw=ew,yw=Yy,ww=aw,Cw=Qy,bm=Zy;var Sw=tw,ym=(e,t,a)=>{let o=new Map,r={platform:gw,...a},l={...r.platform,_c:o};return Wy(e,t,{...r,platform:l})};var Ve=A(q(),1),Rw=A(q(),1),Iw=A(jr(),1),$k=typeof document<"u",eA=function(){},bd=$k?Rw.useLayoutEffect:eA;function yd(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let a,o,r;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(a=e.length,a!==t.length)return!1;for(o=a;o--!==0;)if(!yd(e[o],t[o]))return!1;return!0}if(r=Object.keys(e),a=r.length,a!==Object.keys(t).length)return!1;for(o=a;o--!==0;)if(!{}.hasOwnProperty.call(t,r[o]))return!1;for(o=a;o--!==0;){let l=r[o];if(!(l==="_owner"&&e.$$typeof)&&!yd(e[l],t[l]))return!1}return!0}return e!==e&&t!==t}function kw(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function Lw(e,t){let a=kw(e);return Math.round(t*a)/a}function wm(e){let t=Ve.useRef(e);return bd(()=>{t.current=e}),t}function Aw(e){e===void 0&&(e={});let{placement:t="bottom",strategy:a="absolute",middleware:o=[],platform:r,elements:{reference:l,floating:n}={},transform:i=!0,whileElementsMounted:s,open:u}=e,[d,f]=Ve.useState({x:0,y:0,strategy:a,placement:t,middlewareData:{},isPositioned:!1}),[c,m]=Ve.useState(o);yd(c,o)||m(o);let[b,v]=Ve.useState(null),[w,h]=Ve.useState(null),p=Ve.useCallback(H=>{H!==k.current&&(k.current=H,v(H))},[]),g=Ve.useCallback(H=>{H!==L.current&&(L.current=H,h(H))},[]),y=l||b,S=n||w,k=Ve.useRef(null),L=Ve.useRef(null),C=Ve.useRef(d),E=s!=null,T=wm(s),z=wm(r),K=wm(u),$=Ve.useCallback(()=>{if(!k.current||!L.current)return;let H={placement:t,strategy:a,middleware:c};z.current&&(H.platform=z.current),ym(k.current,L.current,H).then(B=>{let P={...B,isPositioned:K.current!==!1};G.current&&!yd(C.current,P)&&(C.current=P,Iw.flushSync(()=>{f(P)}))})},[c,t,a,z,K]);bd(()=>{u===!1&&C.current.isPositioned&&(C.current.isPositioned=!1,f(H=>({...H,isPositioned:!1})))},[u]);let G=Ve.useRef(!1);bd(()=>(G.current=!0,()=>{G.current=!1}),[]),bd(()=>{if(y&&(k.current=y),S&&(L.current=S),y&&S){if(T.current)return T.current(y,S,$);$()}},[y,S,$,T,E]);let pe=Ve.useMemo(()=>({reference:k,floating:L,setReference:p,setFloating:g}),[p,g]),V=Ve.useMemo(()=>({reference:y,floating:S}),[y,S]),Q=Ve.useMemo(()=>{let H={position:a,left:0,top:0};if(!V.floating)return H;let B=Lw(V.floating,d.x),P=Lw(V.floating,d.y);return i?{...H,transform:"translate("+B+"px, "+P+"px)",...kw(V.floating)>=1.5&&{willChange:"transform"}}:{position:a,left:B,top:P}},[a,i,V.floating,d.x,d.y]);return Ve.useMemo(()=>({...d,update:$,refs:pe,elements:V,floatingStyles:Q}),[d,$,pe,V,Q])}var tA=e=>{function t(a){return{}.hasOwnProperty.call(a,"current")}return{name:"arrow",options:e,fn(a){let{element:o,padding:r}=typeof e=="function"?e(a):e;return o&&t(o)?o.current!=null?bm({element:o.current,padding:r}).fn(a):{}:o?bm({element:o,padding:r}).fn(a):{}}}},Mw=(e,t)=>{let a=vw(e);return{name:a.name,fn:a.fn,options:[e,t]}},Ew=(e,t)=>{let a=bw(e);return{name:a.name,fn:a.fn,options:[e,t]}},Dw=(e,t)=>({fn:Sw(e).fn,options:[e,t]}),Tw=(e,t)=>{let a=yw(e);return{name:a.name,fn:a.fn,options:[e,t]}},Pw=(e,t)=>{let a=ww(e);return{name:a.name,fn:a.fn,options:[e,t]}};var Ow=(e,t)=>{let a=Cw(e);return{name:a.name,fn:a.fn,options:[e,t]}};var Bw=(e,t)=>{let a=tA(e);return{name:a.name,fn:a.fn,options:[e,t]}};var Nw=A(q(),1);var Cm=A(J(),1),aA="Arrow",Uw=Nw.forwardRef((e,t)=>{let{children:a,width:o=10,height:r=5,...l}=e;return(0,Cm.jsx)(Oe.svg,{...l,ref:t,width:o,height:r,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?a:(0,Cm.jsx)("polygon",{points:"0,0 30,0 15,10"})})});Uw.displayName=aA;var zw=Uw;var Xo=A(J(),1);var Sm="Popper",[Fw,Lm]=Ra(Sm),[rA,_w]=Fw(Sm),Hw=e=>{let{__scopePopper:t,children:a}=e,[o,r]=st.useState(null),[l,n]=st.useState(void 0);return(0,Xo.jsx)(rA,{scope:t,anchor:o,onAnchorChange:r,placementState:l,setPlacementState:n,children:a})};Hw.displayName=Sm;var qw="PopperAnchor",Gw=st.forwardRef((e,t)=>{let{__scopePopper:a,virtualRef:o,...r}=e,l=_w(qw,a),n=st.useRef(null),i=l.onAnchorChange,s=st.useCallback(b=>{n.current=b,b&&i(b)},[i]),u=Pe(t,s),d=st.useRef(null);st.useEffect(()=>{if(!o)return;let b=d.current;d.current=o.current,b!==d.current&&i(d.current)});let f=l.placementState&&Im(l.placementState),c=f?.[0],m=f?.[1];return o?null:(0,Xo.jsx)(Oe.div,{"data-radix-popper-side":c,"data-radix-popper-align":m,...r,ref:u})});Gw.displayName=qw;var Rm="PopperContent",[lA,nA]=Fw(Rm),Vw=st.forwardRef((e,t)=>{let{__scopePopper:a,side:o="bottom",sideOffset:r=0,align:l="center",alignOffset:n=0,arrowPadding:i=0,avoidCollisions:s=!0,collisionBoundary:u=[],collisionPadding:d=0,sticky:f="partial",hideWhenDetached:c=!1,updatePositionStrategy:m="optimized",onPlaced:b,...v}=e,w=_w(Rm,a),[h,p]=st.useState(null),g=Pe(t,p),[y,S]=st.useState(null),k=Uy(y),L=k?.width??0,C=k?.height??0,E=o+(l!=="center"?"-"+l:""),T=typeof d=="number"?d:{top:0,right:0,bottom:0,left:0,...d},z=Array.isArray(u)?u:[u],K=z.length>0,$={padding:T,boundary:z.filter(sA),altBoundary:K},{refs:G,floatingStyles:pe,placement:V,isPositioned:Q,middlewareData:H}=Aw({strategy:"fixed",placement:E,whileElementsMounted:(...la)=>vm(...la,{animationFrame:m==="always"}),elements:{reference:w.anchor},middleware:[Mw({mainAxis:r+C,alignmentAxis:n}),s&&Ew({mainAxis:!0,crossAxis:!1,limiter:f==="partial"?Dw():void 0,...$}),s&&Tw({...$}),Pw({...$,apply:({elements:la,rects:Le,availableWidth:Qo,availableHeight:Mt})=>{let{width:ma,height:qt}=Le.reference,Et=la.floating.style;Et.setProperty("--radix-popper-available-width",`${Qo}px`),Et.setProperty("--radix-popper-available-height",`${Mt}px`),Et.setProperty("--radix-popper-anchor-width",`${ma}px`),Et.setProperty("--radix-popper-anchor-height",`${qt}px`)}}),y&&Bw({element:y,padding:i}),uA({arrowWidth:L,arrowHeight:C}),c&&Ow({strategy:"referenceHidden",...$,boundary:K?$.boundary:void 0})]}),B=w.setPlacementState;it(()=>(B(V),()=>{B(void 0)}),[V,B]);let[P,W]=Im(V),Ue=Rt(b);it(()=>{Q&&Ue?.()},[Q,Ue]);let Ht=H.arrow?.x,Ye=H.arrow?.y,Ee=H.arrow?.centerOffset!==0,[Ce,Se]=st.useState();return it(()=>{h&&Se(window.getComputedStyle(h).zIndex)},[h]),(0,Xo.jsx)("div",{ref:G.setFloating,"data-radix-popper-content-wrapper":"",style:{...pe,transform:Q?pe.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:Ce,"--radix-popper-transform-origin":[H.transformOrigin?.x,H.transformOrigin?.y].join(" "),...H.hide?.referenceHidden&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:(0,Xo.jsx)(lA,{scope:a,placedSide:P,placedAlign:W,onArrowChange:S,arrowX:Ht,arrowY:Ye,shouldHideArrow:Ee,children:(0,Xo.jsx)(Oe.div,{"data-side":P,"data-align":W,...v,ref:g,style:{...v.style,animation:Q?void 0:"none"}})})})});Vw.displayName=Rm;var Xw="PopperArrow",iA={top:"bottom",right:"left",bottom:"top",left:"right"},jw=st.forwardRef(function(t,a){let{__scopePopper:o,...r}=t,l=nA(Xw,o),n=iA[l.placedSide];return(0,Xo.jsx)("span",{ref:l.onArrowChange,style:{position:"absolute",left:l.arrowX,top:l.arrowY,[n]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[l.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[l.placedSide],visibility:l.shouldHideArrow?"hidden":void 0},children:(0,Xo.jsx)(zw,{...r,ref:a,style:{...r.style,display:"block"}})})});jw.displayName=Xw;function sA(e){return e!==null}var uA=e=>({name:"transformOrigin",options:e,fn(t){let{placement:a,rects:o,middlewareData:r}=t,n=r.arrow?.centerOffset!==0,i=n?0:e.arrowWidth,s=n?0:e.arrowHeight,[u,d]=Im(a),f={start:"0%",center:"50%",end:"100%"}[d],c=(r.arrow?.x??0)+i/2,m=(r.arrow?.y??0)+s/2,b="",v="";return u==="bottom"?(b=n?f:`${c}px`,v=`${-s}px`):u==="top"?(b=n?f:`${c}px`,v=`${o.floating.height+s}px`):u==="right"?(b=`${-s}px`,v=n?f:`${m}px`):u==="left"&&(b=`${o.floating.width+s}px`,v=n?f:`${m}px`),{data:{x:b,y:v}}}});function Im(e){let[t,a="center"]=e.split("-");return[t,a]}var km=Hw,Kw=Gw,Ww=Vw,Zw=jw;var et=A(q(),1);var jo=A(J(),1),Am="rovingFocusGroup.onEntryFocus",fA={bubbles:!1,cancelable:!0},Ni="RovingFocusGroup",[Mm,Yw,cA]=Ku(Ni),[pA,Em]=Ra(Ni,[cA]),[mA,hA]=pA(Ni),Qw=et.forwardRef((e,t)=>(0,jo.jsx)(Mm.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,jo.jsx)(Mm.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,jo.jsx)(gA,{...e,ref:t})})}));Qw.displayName=Ni;var gA=et.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:a,orientation:o,loop:r=!1,dir:l,currentTabStopId:n,defaultCurrentTabStopId:i,onCurrentTabStopIdChange:s,onEntryFocus:u,preventScrollOnEntryFocus:d=!1,...f}=e,c=et.useRef(null),m=Pe(t,c),b=Ju(l),[v,w]=ki({prop:n,defaultProp:i??null,onChange:s,caller:Ni}),[h,p]=et.useState(!1),g=Rt(u),y=Yw(a),S=et.useRef(!1),[k,L]=et.useState(0);return et.useEffect(()=>{let C=c.current;if(C)return C.addEventListener(Am,g),()=>C.removeEventListener(Am,g)},[g]),(0,jo.jsx)(mA,{scope:a,orientation:o,dir:b,loop:r,currentTabStopId:v,onItemFocus:et.useCallback(C=>w(C),[w]),onItemShiftTab:et.useCallback(()=>p(!0),[]),onFocusableItemAdd:et.useCallback(()=>L(C=>C+1),[]),onFocusableItemRemove:et.useCallback(()=>L(C=>C-1),[]),children:(0,jo.jsx)(Oe.div,{tabIndex:h||k===0?-1:0,"data-orientation":o,...f,ref:m,style:{outline:"none",...e.style},onMouseDown:te(e.onMouseDown,()=>{S.current=!0}),onFocus:te(e.onFocus,C=>{let E=!S.current;if(C.target===C.currentTarget&&E&&!h){let T=new CustomEvent(Am,fA);if(C.currentTarget.dispatchEvent(T),!T.defaultPrevented){let z=y().filter(V=>V.focusable),K=z.find(V=>V.active),$=z.find(V=>V.id===v),pe=[K,$,...z].filter(Boolean).map(V=>V.ref.current);eC(pe,d)}}S.current=!1}),onBlur:te(e.onBlur,()=>p(!1))})})}),Jw="RovingFocusGroupItem",$w=et.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:a,focusable:o=!0,active:r=!1,tabStopId:l,children:n,...i}=e,s=Go(),u=l||s,d=hA(Jw,a),f=d.currentTabStopId===u,c=Yw(a),{onFocusableItemAdd:m,onFocusableItemRemove:b,currentTabStopId:v}=d;return et.useEffect(()=>{if(o)return m(),()=>b()},[o,m,b]),(0,jo.jsx)(Mm.ItemSlot,{scope:a,id:u,focusable:o,active:r,children:(0,jo.jsx)(Oe.span,{tabIndex:f?0:-1,"data-orientation":d.orientation,...i,ref:t,onMouseDown:te(e.onMouseDown,w=>{o?d.onItemFocus(u):w.preventDefault()}),onFocus:te(e.onFocus,()=>d.onItemFocus(u)),onKeyDown:te(e.onKeyDown,w=>{if(w.key==="Tab"&&w.shiftKey){d.onItemShiftTab();return}if(w.target!==w.currentTarget)return;let h=bA(w,d.orientation,d.dir);if(h!==void 0){if(w.metaKey||w.ctrlKey||w.altKey||w.shiftKey)return;w.preventDefault();let g=c().filter(y=>y.focusable).map(y=>y.ref.current);if(h==="last")g.reverse();else if(h==="prev"||h==="next"){h==="prev"&&g.reverse();let y=g.indexOf(w.currentTarget);g=d.loop?yA(g,y+1):g.slice(y+1)}setTimeout(()=>eC(g))}}),children:typeof n=="function"?n({isCurrentTabStop:f,hasTabStop:v!=null}):n})})});$w.displayName=Jw;var xA={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function vA(e,t){return t!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function bA(e,t,a){let o=vA(e.key,a);if(!(t==="vertical"&&["ArrowLeft","ArrowRight"].includes(o))&&!(t==="horizontal"&&["ArrowUp","ArrowDown"].includes(o)))return xA[o]}function eC(e,t=!1){let a=document.activeElement;for(let o of e)if(o===a||(o.focus({preventScroll:t}),document.activeElement!==a))return}function yA(e,t){return e.map((a,o)=>e[(t+o)%e.length])}var tC=Qw,aC=$w;var j=A(J(),1),Dm=["Enter"," "],CA=["ArrowDown","PageUp","Home"],rC=["ArrowUp","PageDown","End"],SA=[...CA,...rC],LA={ltr:[...Dm,"ArrowRight"],rtl:[...Dm,"ArrowLeft"]},RA={ltr:["ArrowLeft"],rtl:["ArrowRight"]},_i="Menu",[zi,IA,kA]=Ku(_i),[Br,Tm]=Ra(_i,[kA,Lm,Em]),Hi=Lm(),lC=Em(),[nC,Ko]=Br(_i),[AA,qi]=Br(_i),iC=e=>{let{__scopeMenu:t,open:a=!1,children:o,dir:r,onOpenChange:l,modal:n=!0}=e,i=Hi(t),[s,u]=F.useState(null),d=F.useRef(!1),f=Rt(l),c=Ju(r);return F.useEffect(()=>{let m=()=>{d.current=!0,document.addEventListener("pointerdown",b,{capture:!0,once:!0}),document.addEventListener("pointermove",b,{capture:!0,once:!0})},b=()=>d.current=!1;return document.addEventListener("keydown",m,{capture:!0}),()=>{document.removeEventListener("keydown",m,{capture:!0}),document.removeEventListener("pointerdown",b,{capture:!0}),document.removeEventListener("pointermove",b,{capture:!0})}},[]),F.useEffect(()=>{if(!a)return;let m=()=>f(!1);return window.addEventListener("blur",m),()=>window.removeEventListener("blur",m)},[a,f]),(0,j.jsx)(km,{...i,children:(0,j.jsx)(nC,{scope:t,open:a,onOpenChange:f,content:s,onContentChange:u,children:(0,j.jsx)(AA,{scope:t,onClose:F.useCallback(()=>f(!1),[f]),isUsingKeyboardRef:d,dir:c,modal:n,children:o})})})};iC.displayName=_i;var MA="MenuAnchor",Pm=F.forwardRef((e,t)=>{let{__scopeMenu:a,...o}=e,r=Hi(a);return(0,j.jsx)(Kw,{...r,...o,ref:t})});Pm.displayName=MA;var Om="MenuPortal",[EA,sC]=Br(Om,{forceMount:void 0}),uC=e=>{let{__scopeMenu:t,forceMount:a,children:o,container:r}=e,l=Ko(Om,t);return(0,j.jsx)(EA,{scope:t,forceMount:a,children:(0,j.jsx)(_l,{present:a||l.open,children:(0,j.jsx)(Jp,{asChild:!0,container:r,children:o})})})};uC.displayName=Om;var ra="MenuContent",[DA,Bm]=Br(ra),dC=F.forwardRef((e,t)=>{let a=sC(ra,e.__scopeMenu),{forceMount:o=a.forceMount,...r}=e,l=Ko(ra,e.__scopeMenu),n=qi(ra,e.__scopeMenu);return(0,j.jsx)(zi.Provider,{scope:e.__scopeMenu,children:(0,j.jsx)(_l,{present:o||l.open,children:(0,j.jsx)(zi.Slot,{scope:e.__scopeMenu,children:n.modal?(0,j.jsx)(TA,{...r,ref:t}):(0,j.jsx)(PA,{...r,ref:t})})})})}),TA=F.forwardRef((e,t)=>{let a=Ko(ra,e.__scopeMenu),o=F.useRef(null),r=Pe(t,o);return F.useEffect(()=>{let l=o.current;if(l)return By(l)},[]),(0,j.jsx)(Nm,{...e,ref:r,trapFocus:a.open,disableOutsidePointerEvents:a.open,disableOutsideScroll:!0,onFocusOutside:te(e.onFocusOutside,l=>l.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>a.onOpenChange(!1)})}),PA=F.forwardRef((e,t)=>{let a=Ko(ra,e.__scopeMenu);return(0,j.jsx)(Nm,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>a.onOpenChange(!1)})}),OA=ro("MenuContent.ScrollLock"),Nm=F.forwardRef((e,t)=>{let{__scopeMenu:a,loop:o=!1,trapFocus:r,onOpenAutoFocus:l,onCloseAutoFocus:n,disableOutsidePointerEvents:i,onEntryFocus:s,onEscapeKeyDown:u,onPointerDownOutside:d,onFocusOutside:f,onInteractOutside:c,onDismiss:m,disableOutsideScroll:b,...v}=e,w=Ko(ra,a),h=qi(ra,a),p=Hi(a),g=lC(a),y=IA(a),[S,k]=F.useState(null),L=F.useRef(null),C=Pe(t,L,w.onContentChange),E=F.useRef(0),T=F.useRef(""),z=F.useRef(0),K=F.useRef(null),$=F.useRef("right"),G=F.useRef(0),pe=b?cm:F.Fragment,V=b?{as:OA,allowPinchZoom:!0}:void 0,Q=B=>{let P=T.current+B,W=y().filter(Se=>!Se.disabled),Ue=document.activeElement,Ht=W.find(Se=>Se.ref.current===Ue)?.textValue,Ye=W.map(Se=>Se.textValue),Ee=jA(Ye,P,Ht),Ce=W.find(Se=>Se.textValue===Ee)?.ref.current;(function Se(la){T.current=la,window.clearTimeout(E.current),la!==""&&(E.current=window.setTimeout(()=>Se(""),1e3))})(P),Ce&&setTimeout(()=>Ce.focus())};F.useEffect(()=>()=>window.clearTimeout(E.current),[]),my();let H=F.useCallback(B=>$.current===K.current?.side&&WA(B,K.current?.area),[]);return(0,j.jsx)(DA,{scope:a,searchRef:T,onItemEnter:F.useCallback(B=>{H(B)&&B.preventDefault()},[H]),onItemLeave:F.useCallback(B=>{H(B)||(L.current?.focus(),k(null))},[H]),onTriggerLeave:F.useCallback(B=>{H(B)&&B.preventDefault()},[H]),pointerGraceTimerRef:z,onPointerGraceIntentChange:F.useCallback(B=>{K.current=B},[]),children:(0,j.jsx)(pe,{...V,children:(0,j.jsx)(Qp,{asChild:!0,trapped:r,onMountAutoFocus:te(l,B=>{B.preventDefault(),L.current?.focus({preventScroll:!0})}),onUnmountAutoFocus:n,children:(0,j.jsx)(Wp,{asChild:!0,disableOutsidePointerEvents:i,onEscapeKeyDown:u,onPointerDownOutside:d,onFocusOutside:f,onInteractOutside:c,onDismiss:m,children:(0,j.jsx)(tC,{asChild:!0,...g,dir:h.dir,orientation:"vertical",loop:o,currentTabStopId:S,onCurrentTabStopIdChange:k,onEntryFocus:te(s,B=>{h.isUsingKeyboardRef.current||B.preventDefault()}),preventScrollOnEntryFocus:!0,children:(0,j.jsx)(Ww,{role:"menu","aria-orientation":"vertical","data-state":kC(w.open),"data-radix-menu-content":"",dir:h.dir,...p,...v,ref:C,style:{outline:"none",...v.style},onKeyDown:te(v.onKeyDown,B=>{let W=B.target.closest("[data-radix-menu-content]")===B.currentTarget,Ue=B.ctrlKey||B.altKey||B.metaKey,Ht=B.key.length===1;W&&(B.key==="Tab"&&B.preventDefault(),!Ue&&Ht&&Q(B.key));let Ye=L.current;if(B.target!==Ye||!SA.includes(B.key))return;B.preventDefault();let Ce=y().filter(Se=>!Se.disabled).map(Se=>Se.ref.current);rC.includes(B.key)&&Ce.reverse(),VA(Ce)}),onBlur:te(e.onBlur,B=>{B.currentTarget.contains(B.target)||(window.clearTimeout(E.current),T.current="")}),onPointerMove:te(e.onPointerMove,Fi(B=>{let P=B.target,W=G.current!==B.clientX;if(B.currentTarget.contains(P)&&W){let Ue=B.clientX>G.current?"right":"left";$.current=Ue,G.current=B.clientX}}))})})})})})})});dC.displayName=ra;var BA="MenuGroup",Um=F.forwardRef((e,t)=>{let{__scopeMenu:a,...o}=e;return(0,j.jsx)(Oe.div,{role:"group",...o,ref:t})});Um.displayName=BA;var NA="MenuLabel",fC=F.forwardRef((e,t)=>{let{__scopeMenu:a,...o}=e;return(0,j.jsx)(Oe.div,{...o,ref:t})});fC.displayName=NA;var wd="MenuItem",oC="menu.itemSelect",Sd=F.forwardRef((e,t)=>{let{disabled:a=!1,onSelect:o,...r}=e,l=F.useRef(null),n=qi(wd,e.__scopeMenu),i=Bm(wd,e.__scopeMenu),s=Pe(t,l),u=F.useRef(!1),d=()=>{let f=l.current;if(!a&&f){let c=new CustomEvent(oC,{bubbles:!0,cancelable:!0});f.addEventListener(oC,m=>o?.(m),{once:!0}),Xu(f,c),c.defaultPrevented?u.current=!1:n.onClose()}};return(0,j.jsx)(cC,{...r,ref:s,disabled:a,onClick:te(e.onClick,d),onPointerDown:f=>{e.onPointerDown?.(f),u.current=!0},onPointerUp:te(e.onPointerUp,f=>{u.current||f.currentTarget?.click()}),onKeyDown:te(e.onKeyDown,f=>{let c=i.searchRef.current!=="";a||c&&f.key===" "||Dm.includes(f.key)&&(f.currentTarget.click(),f.preventDefault())})})});Sd.displayName=wd;var cC=F.forwardRef((e,t)=>{let{__scopeMenu:a,disabled:o=!1,textValue:r,...l}=e,n=Bm(wd,a),i=lC(a),s=F.useRef(null),u=Pe(t,s),[d,f]=F.useState(!1),[c,m]=F.useState("");return F.useEffect(()=>{let b=s.current;b&&m((b.textContent??"").trim())},[l.children]),(0,j.jsx)(zi.ItemSlot,{scope:a,disabled:o,textValue:r??c,children:(0,j.jsx)(aC,{asChild:!0,...i,focusable:!o,children:(0,j.jsx)(Oe.div,{role:"menuitem","data-highlighted":d?"":void 0,"aria-disabled":o||void 0,"data-disabled":o?"":void 0,...l,ref:u,onPointerMove:te(e.onPointerMove,Fi(b=>{o?n.onItemLeave(b):(n.onItemEnter(b),b.defaultPrevented||b.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:te(e.onPointerLeave,Fi(b=>n.onItemLeave(b))),onFocus:te(e.onFocus,()=>f(!0)),onBlur:te(e.onBlur,()=>f(!1))})})})}),UA="MenuCheckboxItem",pC=F.forwardRef((e,t)=>{let{checked:a=!1,onCheckedChange:o,...r}=e;return(0,j.jsx)(vC,{scope:e.__scopeMenu,checked:a,children:(0,j.jsx)(Sd,{role:"menuitemcheckbox","aria-checked":Cd(a)?"mixed":a,...r,ref:t,"data-state":_m(a),onSelect:te(r.onSelect,()=>o?.(Cd(a)?!0:!a),{checkForDefaultPrevented:!1})})})});pC.displayName=UA;var mC="MenuRadioGroup",[zA,FA]=Br(mC,{value:void 0,onValueChange:()=>{}}),hC=F.forwardRef((e,t)=>{let{value:a,onValueChange:o,...r}=e,l=Rt(o);return(0,j.jsx)(zA,{scope:e.__scopeMenu,value:a,onValueChange:l,children:(0,j.jsx)(Um,{...r,ref:t})})});hC.displayName=mC;var gC="MenuRadioItem",xC=F.forwardRef((e,t)=>{let{value:a,...o}=e,r=FA(gC,e.__scopeMenu),l=a===r.value;return(0,j.jsx)(vC,{scope:e.__scopeMenu,checked:l,children:(0,j.jsx)(Sd,{role:"menuitemradio","aria-checked":l,...o,ref:t,"data-state":_m(l),onSelect:te(o.onSelect,()=>r.onValueChange?.(a),{checkForDefaultPrevented:!1})})})});xC.displayName=gC;var zm="MenuItemIndicator",[vC,_A]=Br(zm,{checked:!1}),bC=F.forwardRef((e,t)=>{let{__scopeMenu:a,forceMount:o,...r}=e,l=_A(zm,a);return(0,j.jsx)(_l,{present:o||Cd(l.checked)||l.checked===!0,children:(0,j.jsx)(Oe.span,{...r,ref:t,"data-state":_m(l.checked)})})});bC.displayName=zm;var HA="MenuSeparator",yC=F.forwardRef((e,t)=>{let{__scopeMenu:a,...o}=e;return(0,j.jsx)(Oe.div,{role:"separator","aria-orientation":"horizontal",...o,ref:t})});yC.displayName=HA;var qA="MenuArrow",wC=F.forwardRef((e,t)=>{let{__scopeMenu:a,...o}=e,r=Hi(a);return(0,j.jsx)(Zw,{...r,...o,ref:t})});wC.displayName=qA;var Fm="MenuSub",[GA,CC]=Br(Fm),SC=e=>{let{__scopeMenu:t,children:a,open:o=!1,onOpenChange:r}=e,l=Ko(Fm,t),n=Hi(t),[i,s]=F.useState(null),[u,d]=F.useState(null),f=Rt(r);return F.useEffect(()=>(l.open===!1&&f(!1),()=>f(!1)),[l.open,f]),(0,j.jsx)(km,{...n,children:(0,j.jsx)(nC,{scope:t,open:o,onOpenChange:f,content:u,onContentChange:d,children:(0,j.jsx)(GA,{scope:t,contentId:Go(),triggerId:Go(),trigger:i,onTriggerChange:s,children:a})})})};SC.displayName=Fm;var Ui="MenuSubTrigger",LC=F.forwardRef((e,t)=>{let a=Ko(Ui,e.__scopeMenu),o=qi(Ui,e.__scopeMenu),r=CC(Ui,e.__scopeMenu),l=Bm(Ui,e.__scopeMenu),n=F.useRef(null),{pointerGraceTimerRef:i,onPointerGraceIntentChange:s}=l,u={__scopeMenu:e.__scopeMenu},d=F.useCallback(()=>{n.current&&window.clearTimeout(n.current),n.current=null},[]);F.useEffect(()=>d,[d]),F.useEffect(()=>{let c=i.current;return()=>{window.clearTimeout(c),s(null)}},[i,s]);let f=Pe(t,r.onTriggerChange);return(0,j.jsx)(Pm,{asChild:!0,...u,children:(0,j.jsx)(cC,{id:r.triggerId,"aria-haspopup":"menu","aria-expanded":a.open,"aria-controls":a.open?r.contentId:void 0,"data-state":kC(a.open),...e,ref:f,onClick:c=>{e.onClick?.(c),!(e.disabled||c.defaultPrevented)&&(c.currentTarget.focus(),a.open||a.onOpenChange(!0))},onPointerMove:te(e.onPointerMove,Fi(c=>{l.onItemEnter(c),!c.defaultPrevented&&!e.disabled&&!a.open&&!n.current&&(l.onPointerGraceIntentChange(null),n.current=window.setTimeout(()=>{a.onOpenChange(!0),d()},100))})),onPointerLeave:te(e.onPointerLeave,Fi(c=>{d();let m=a.content?.getBoundingClientRect();if(m){let b=a.content?.dataset.side,v=b==="right",w=v?-5:5,h=m[v?"left":"right"],p=m[v?"right":"left"];l.onPointerGraceIntentChange({area:[{x:c.clientX+w,y:c.clientY},{x:h,y:m.top},{x:p,y:m.top},{x:p,y:m.bottom},{x:h,y:m.bottom}],side:b}),window.clearTimeout(i.current),i.current=window.setTimeout(()=>l.onPointerGraceIntentChange(null),300)}else{if(l.onTriggerLeave(c),c.defaultPrevented)return;l.onPointerGraceIntentChange(null)}})),onKeyDown:te(e.onKeyDown,c=>{let m=l.searchRef.current!=="";e.disabled||m&&c.key===" "||LA[o.dir].includes(c.key)&&(a.onOpenChange(!0),a.content?.focus(),c.preventDefault())})})})});LC.displayName=Ui;var RC="MenuSubContent",IC=F.forwardRef((e,t)=>{let a=sC(ra,e.__scopeMenu),{forceMount:o=a.forceMount,align:r="start",...l}=e,n=Ko(ra,e.__scopeMenu),i=qi(ra,e.__scopeMenu),s=CC(RC,e.__scopeMenu),u=F.useRef(null),d=Pe(t,u);return(0,j.jsx)(zi.Provider,{scope:e.__scopeMenu,children:(0,j.jsx)(_l,{present:o||n.open,children:(0,j.jsx)(zi.Slot,{scope:e.__scopeMenu,children:(0,j.jsx)(Nm,{id:s.contentId,"aria-labelledby":s.triggerId,...l,ref:d,align:r,side:i.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:f=>{i.isUsingKeyboardRef.current&&u.current?.focus(),f.preventDefault()},onCloseAutoFocus:f=>f.preventDefault(),onFocusOutside:te(e.onFocusOutside,f=>{f.target!==s.trigger&&n.onOpenChange(!1)}),onEscapeKeyDown:te(e.onEscapeKeyDown,f=>{i.onClose(),f.preventDefault()}),onKeyDown:te(e.onKeyDown,f=>{let c=f.currentTarget.contains(f.target),m=RA[i.dir].includes(f.key);c&&m&&(n.onOpenChange(!1),s.trigger?.focus(),f.preventDefault())})})})})})});IC.displayName=RC;function kC(e){return e?"open":"closed"}function Cd(e){return e==="indeterminate"}function _m(e){return Cd(e)?"indeterminate":e?"checked":"unchecked"}function VA(e){let t=document.activeElement;for(let a of e)if(a===t||(a.focus(),document.activeElement!==t))return}function XA(e,t){return e.map((a,o)=>e[(t+o)%e.length])}function jA(e,t,a){let r=t.length>1&&Array.from(t).every(u=>u===t[0])?t[0]:t,l=a?e.indexOf(a):-1,n=XA(e,Math.max(l,0));r.length===1&&(n=n.filter(u=>u!==a));let s=n.find(u=>u.toLowerCase().startsWith(r.toLowerCase()));return s!==a?s:void 0}function KA(e,t){let{x:a,y:o}=e,r=!1;for(let l=0,n=t.length-1;l<t.length;n=l++){let i=t[l],s=t[n],u=i.x,d=i.y,f=s.x,c=s.y;d>o!=c>o&&a<(f-u)*(o-d)/(c-d)+u&&(r=!r)}return r}function WA(e,t){if(!t)return!1;let a={x:e.clientX,y:e.clientY};return KA(a,t)}function Fi(e){return t=>t.pointerType==="mouse"?e(t):void 0}var AC=iC,MC=Pm,EC=uC,DC=dC,TC=Um,PC=fC,OC=Sd,BC=pC,NC=hC,UC=xC,zC=bC,FC=yC,_C=wC,HC=SC,qC=LC,GC=IC;var io={};Ph(io,{Arrow:()=>SM,CheckboxItem:()=>vM,Content:()=>mM,DropdownMenu:()=>Hm,DropdownMenuArrow:()=>$m,DropdownMenuCheckboxItem:()=>Wm,DropdownMenuContent:()=>Vm,DropdownMenuGroup:()=>Xm,DropdownMenuItem:()=>Km,DropdownMenuItemIndicator:()=>Qm,DropdownMenuLabel:()=>jm,DropdownMenuPortal:()=>Gm,DropdownMenuRadioGroup:()=>Zm,DropdownMenuRadioItem:()=>Ym,DropdownMenuSeparator:()=>Jm,DropdownMenuSub:()=>KC,DropdownMenuSubContent:()=>th,DropdownMenuSubTrigger:()=>eh,DropdownMenuTrigger:()=>qm,Group:()=>hM,Item:()=>xM,ItemIndicator:()=>wM,Label:()=>gM,Portal:()=>pM,RadioGroup:()=>bM,RadioItem:()=>yM,Root:()=>fM,Separator:()=>CM,Sub:()=>LM,SubContent:()=>IM,SubTrigger:()=>RM,Trigger:()=>cM,createDropdownMenuScope:()=>QA});var We=A(q(),1);var Ke=A(J(),1),Ld="DropdownMenu",[YA,QA]=Ra(Ld,[Tm]),pt=Tm(),[JA,VC]=YA(Ld),Hm=e=>{let{__scopeDropdownMenu:t,children:a,dir:o,open:r,defaultOpen:l,onOpenChange:n,modal:i=!0}=e,s=pt(t),u=We.useRef(null),[d,f]=ki({prop:r,defaultProp:l??!1,onChange:n,caller:Ld});return(0,Ke.jsx)(JA,{scope:t,triggerId:Go(),triggerRef:u,contentId:Go(),open:d,onOpenChange:f,onOpenToggle:We.useCallback(()=>f(c=>!c),[f]),modal:i,children:(0,Ke.jsx)(AC,{...s,open:d,onOpenChange:f,dir:o,modal:i,children:a})})};Hm.displayName=Ld;var XC="DropdownMenuTrigger",qm=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,disabled:o=!1,...r}=e,l=VC(XC,a),n=pt(a),i=Pe(t,l.triggerRef);return(0,Ke.jsx)(MC,{asChild:!0,...n,children:(0,Ke.jsx)(Oe.button,{type:"button",id:l.triggerId,"aria-haspopup":"menu","aria-expanded":l.open,"aria-controls":l.open?l.contentId:void 0,"data-state":l.open?"open":"closed","data-disabled":o?"":void 0,disabled:o,...r,ref:i,onPointerDown:te(e.onPointerDown,s=>{!o&&s.button===0&&s.ctrlKey===!1&&(l.onOpenToggle(),l.open||s.preventDefault())}),onKeyDown:te(e.onKeyDown,s=>{o||(["Enter"," "].includes(s.key)&&l.onOpenToggle(),s.key==="ArrowDown"&&l.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(s.key)&&s.preventDefault())})})})});qm.displayName=XC;var $A="DropdownMenuPortal",Gm=e=>{let{__scopeDropdownMenu:t,...a}=e,o=pt(t);return(0,Ke.jsx)(EC,{...o,...a})};Gm.displayName=$A;var jC="DropdownMenuContent",Vm=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=VC(jC,a),l=pt(a),n=We.useRef(!1);return(0,Ke.jsx)(DC,{id:r.contentId,"aria-labelledby":r.triggerId,...l,...o,ref:t,onCloseAutoFocus:te(e.onCloseAutoFocus,i=>{n.current||r.triggerRef.current?.focus(),n.current=!1,i.preventDefault()}),onInteractOutside:te(e.onInteractOutside,i=>{let s=i.detail.originalEvent,u=s.button===0&&s.ctrlKey===!0,d=s.button===2||u;(!r.modal||d)&&(n.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Vm.displayName=jC;var eM="DropdownMenuGroup",Xm=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(TC,{...r,...o,ref:t})});Xm.displayName=eM;var tM="DropdownMenuLabel",jm=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(PC,{...r,...o,ref:t})});jm.displayName=tM;var aM="DropdownMenuItem",Km=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(OC,{...r,...o,ref:t})});Km.displayName=aM;var oM="DropdownMenuCheckboxItem",Wm=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(BC,{...r,...o,ref:t})});Wm.displayName=oM;var rM="DropdownMenuRadioGroup",Zm=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(NC,{...r,...o,ref:t})});Zm.displayName=rM;var lM="DropdownMenuRadioItem",Ym=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(UC,{...r,...o,ref:t})});Ym.displayName=lM;var nM="DropdownMenuItemIndicator",Qm=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(zC,{...r,...o,ref:t})});Qm.displayName=nM;var iM="DropdownMenuSeparator",Jm=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(FC,{...r,...o,ref:t})});Jm.displayName=iM;var sM="DropdownMenuArrow",$m=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(_C,{...r,...o,ref:t})});$m.displayName=sM;var KC=e=>{let{__scopeDropdownMenu:t,children:a,open:o,onOpenChange:r,defaultOpen:l}=e,n=pt(t),[i,s]=ki({prop:o,defaultProp:l??!1,onChange:r,caller:"DropdownMenuSub"});return(0,Ke.jsx)(HC,{...n,open:i,onOpenChange:s,children:a})},uM="DropdownMenuSubTrigger",eh=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(qC,{...r,...o,ref:t})});eh.displayName=uM;var dM="DropdownMenuSubContent",th=We.forwardRef((e,t)=>{let{__scopeDropdownMenu:a,...o}=e,r=pt(a);return(0,Ke.jsx)(GC,{...r,...o,ref:t,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});th.displayName=dM;var fM=Hm,cM=qm,pM=Gm,mM=Vm,hM=Xm,gM=jm,xM=Km,vM=Wm,bM=Zm,yM=Ym,wM=Qm,CM=Jm,SM=$m,LM=KC,RM=eh,IM=th;var kM=(e,t)=>{let a=new Array(e.length+t.length);for(let o=0;o<e.length;o++)a[o]=e[o];for(let o=0;o<t.length;o++)a[e.length+o]=t[o];return a},AM=(e,t)=>({classGroupId:e,validator:t}),eS=(e=new Map,t=null,a)=>({nextPart:e,validators:t,classGroupId:a}),kd="-",WC=[],MM="arbitrary..",EM=e=>{let t=TM(e),{conflictingClassGroups:a,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:n=>{if(n.startsWith("[")&&n.endsWith("]"))return DM(n);let i=n.split(kd),s=i[0]===""&&i.length>1?1:0;return tS(i,s,t)},getConflictingClassGroupIds:(n,i)=>{if(i){let s=o[n],u=a[n];return s?u?kM(u,s):s:u||WC}return a[n]||WC}}},tS=(e,t,a)=>{if(e.length-t===0)return a.classGroupId;let r=e[t],l=a.nextPart.get(r);if(l){let u=tS(e,t+1,l);if(u)return u}let n=a.validators;if(n===null)return;let i=t===0?e.join(kd):e.slice(t).join(kd),s=n.length;for(let u=0;u<s;u++){let d=n[u];if(d.validator(i))return d.classGroupId}},DM=e=>e.slice(1,-1).indexOf(":")===-1?void 0:(()=>{let t=e.slice(1,-1),a=t.indexOf(":"),o=t.slice(0,a);return o?MM+o:void 0})(),TM=e=>{let{theme:t,classGroups:a}=e;return PM(a,t)},PM=(e,t)=>{let a=eS();for(let o in e){let r=e[o];rh(r,a,o,t)}return a},rh=(e,t,a,o)=>{let r=e.length;for(let l=0;l<r;l++){let n=e[l];OM(n,t,a,o)}},OM=(e,t,a,o)=>{if(typeof e=="string"){BM(e,t,a);return}if(typeof e=="function"){NM(e,t,a,o);return}UM(e,t,a,o)},BM=(e,t,a)=>{let o=e===""?t:aS(t,e);o.classGroupId=a},NM=(e,t,a,o)=>{if(zM(e)){rh(e(o),t,a,o);return}t.validators===null&&(t.validators=[]),t.validators.push(AM(a,e))},UM=(e,t,a,o)=>{let r=Object.entries(e),l=r.length;for(let n=0;n<l;n++){let[i,s]=r[n];rh(s,aS(t,i),a,o)}},aS=(e,t)=>{let a=e,o=t.split(kd),r=o.length;for(let l=0;l<r;l++){let n=o[l],i=a.nextPart.get(n);i||(i=eS(),a.nextPart.set(n,i)),a=i}return a},zM=e=>"isThemeGetter"in e&&e.isThemeGetter===!0,FM=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,a=Object.create(null),o=Object.create(null),r=(l,n)=>{a[l]=n,t++,t>e&&(t=0,o=a,a=Object.create(null))};return{get(l){let n=a[l];if(n!==void 0)return n;if((n=o[l])!==void 0)return r(l,n),n},set(l,n){l in a?a[l]=n:r(l,n)}}},oh="!",ZC=":",_M=[],YC=(e,t,a,o,r)=>({modifiers:e,hasImportantModifier:t,baseClassName:a,maybePostfixModifierPosition:o,isExternal:r}),HM=e=>{let{prefix:t,experimentalParseClassName:a}=e,o=r=>{let l=[],n=0,i=0,s=0,u,d=r.length;for(let v=0;v<d;v++){let w=r[v];if(n===0&&i===0){if(w===ZC){l.push(r.slice(s,v)),s=v+1;continue}if(w==="/"){u=v;continue}}w==="["?n++:w==="]"?n--:w==="("?i++:w===")"&&i--}let f=l.length===0?r:r.slice(s),c=f,m=!1;f.endsWith(oh)?(c=f.slice(0,-1),m=!0):f.startsWith(oh)&&(c=f.slice(1),m=!0);let b=u&&u>s?u-s:void 0;return YC(l,m,c,b)};if(t){let r=t+ZC,l=o;o=n=>n.startsWith(r)?l(n.slice(r.length)):YC(_M,!1,n,void 0,!0)}if(a){let r=o;o=l=>a({className:l,parseClassName:r})}return o},qM=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((a,o)=>{t.set(a,1e6+o)}),a=>{let o=[],r=[];for(let l=0;l<a.length;l++){let n=a[l],i=n[0]==="[",s=t.has(n);i||s?(r.length>0&&(r.sort(),o.push(...r),r=[]),o.push(n)):r.push(n)}return r.length>0&&(r.sort(),o.push(...r)),o}},GM=e=>({cache:FM(e.cacheSize),parseClassName:HM(e),sortModifiers:qM(e),postfixLookupClassGroupIds:VM(e),...EM(e)}),VM=e=>{let t=Object.create(null),a=e.postfixLookupClassGroups;if(a)for(let o=0;o<a.length;o++)t[a[o]]=!0;return t},XM=/\s+/,jM=(e,t)=>{let{parseClassName:a,getClassGroupId:o,getConflictingClassGroupIds:r,sortModifiers:l,postfixLookupClassGroupIds:n}=t,i=[],s=e.trim().split(XM),u="";for(let d=s.length-1;d>=0;d-=1){let f=s[d],{isExternal:c,modifiers:m,hasImportantModifier:b,baseClassName:v,maybePostfixModifierPosition:w}=a(f);if(c){u=f+(u.length>0?" "+u:u);continue}let h=!!w,p;if(h){let L=v.substring(0,w);p=o(L);let C=p&&n[p]?o(v):void 0;C&&C!==p&&(p=C,h=!1)}else p=o(v);if(!p){if(!h){u=f+(u.length>0?" "+u:u);continue}if(p=o(v),!p){u=f+(u.length>0?" "+u:u);continue}h=!1}let g=m.length===0?"":m.length===1?m[0]:l(m).join(":"),y=b?g+oh:g,S=y+p;if(i.indexOf(S)>-1)continue;i.push(S);let k=r(p,h);for(let L=0;L<k.length;++L){let C=k[L];i.push(y+C)}u=f+(u.length>0?" "+u:u)}return u},KM=(...e)=>{let t=0,a,o,r="";for(;t<e.length;)(a=e[t++])&&(o=oS(a))&&(r&&(r+=" "),r+=o);return r},oS=e=>{if(typeof e=="string")return e;let t,a="";for(let o=0;o<e.length;o++)e[o]&&(t=oS(e[o]))&&(a&&(a+=" "),a+=t);return a},WM=(e,...t)=>{let a,o,r,l,n=s=>{let u=t.reduce((d,f)=>f(d),e());return a=GM(u),o=a.cache.get,r=a.cache.set,l=i,i(s)},i=s=>{let u=o(s);if(u)return u;let d=jM(s,a);return r(s,d),d};return l=n,(...s)=>l(KM(...s))},ZM=[],Ze=e=>{let t=a=>a[e]||ZM;return t.isThemeGetter=!0,t},rS=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,lS=/^\((?:(\w[\w-]*):)?(.+)\)$/i,YM=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,QM=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,JM=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,$M=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,eE=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,tE=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Wo=e=>YM.test(e),ee=e=>!!e&&!Number.isNaN(Number(e)),Ea=e=>!!e&&Number.isInteger(Number(e)),ah=e=>e.endsWith("%")&&ee(e.slice(0,-1)),so=e=>QM.test(e),nS=()=>!0,aE=e=>JM.test(e)&&!$M.test(e),lh=()=>!1,oE=e=>eE.test(e),rE=e=>tE.test(e),lE=e=>!O(e)&&!N(e),nE=e=>e.startsWith("@container")&&(e[10]==="/"&&e[11]!==void 0||e[11]==="s"&&e[16]!==void 0&&e.startsWith("-size/",10)||e[11]==="n"&&e[18]!==void 0&&e.startsWith("-normal/",10)),iE=e=>Zo(e,uS,lh),O=e=>rS.test(e),Nr=e=>Zo(e,dS,aE),QC=e=>Zo(e,hE,ee),sE=e=>Zo(e,cS,nS),uE=e=>Zo(e,fS,lh),JC=e=>Zo(e,iS,lh),dE=e=>Zo(e,sS,rE),Rd=e=>Zo(e,pS,oE),N=e=>lS.test(e),Gi=e=>Ur(e,dS),fE=e=>Ur(e,fS),$C=e=>Ur(e,iS),cE=e=>Ur(e,uS),pE=e=>Ur(e,sS),Id=e=>Ur(e,pS,!0),mE=e=>Ur(e,cS,!0),Zo=(e,t,a)=>{let o=rS.exec(e);return o?o[1]?t(o[1]):a(o[2]):!1},Ur=(e,t,a=!1)=>{let o=lS.exec(e);return o?o[1]?t(o[1]):a:!1},iS=e=>e==="position"||e==="percentage",sS=e=>e==="image"||e==="url",uS=e=>e==="length"||e==="size"||e==="bg-size",dS=e=>e==="length",hE=e=>e==="number",fS=e=>e==="family-name",cS=e=>e==="number"||e==="weight",pS=e=>e==="shadow";var gE=()=>{let e=Ze("color"),t=Ze("font"),a=Ze("text"),o=Ze("font-weight"),r=Ze("tracking"),l=Ze("leading"),n=Ze("breakpoint"),i=Ze("container"),s=Ze("spacing"),u=Ze("radius"),d=Ze("shadow"),f=Ze("inset-shadow"),c=Ze("text-shadow"),m=Ze("drop-shadow"),b=Ze("blur"),v=Ze("perspective"),w=Ze("aspect"),h=Ze("ease"),p=Ze("animate"),g=()=>["auto","avoid","all","avoid-page","page","left","right","column"],y=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],S=()=>[...y(),N,O],k=()=>["auto","hidden","clip","visible","scroll"],L=()=>["auto","contain","none"],C=()=>[N,O,s],E=()=>[Wo,"full","auto",...C()],T=()=>[Ea,"none","subgrid",N,O],z=()=>["auto",{span:["full",Ea,N,O]},Ea,N,O],K=()=>[Ea,"auto",N,O],$=()=>["auto","min","max","fr",N,O],G=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],pe=()=>["start","end","center","stretch","center-safe","end-safe"],V=()=>["auto",...C()],Q=()=>[Wo,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...C()],H=()=>[Wo,"screen","full","dvw","lvw","svw","min","max","fit",...C()],B=()=>[Wo,"screen","full","lh","dvh","lvh","svh","min","max","fit",...C()],P=()=>[e,N,O],W=()=>[...y(),$C,JC,{position:[N,O]}],Ue=()=>["no-repeat",{repeat:["","x","y","space","round"]}],Ht=()=>["auto","cover","contain",cE,iE,{size:[N,O]}],Ye=()=>[ah,Gi,Nr],Ee=()=>["","none","full",u,N,O],Ce=()=>["",ee,Gi,Nr],Se=()=>["solid","dashed","dotted","double"],la=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],Le=()=>[ee,ah,$C,JC],Qo=()=>["","none",b,N,O],Mt=()=>["none",ee,N,O],ma=()=>["none",ee,N,O],qt=()=>[ee,N,O],Et=()=>[Wo,"full",...C()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[so],breakpoint:[so],color:[nS],container:[so],"drop-shadow":[so],ease:["in","out","in-out"],font:[lE],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[so],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[so],shadow:[so],spacing:["px",ee],text:[so],"text-shadow":[so],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",Wo,O,N,w]}],container:["container"],"container-type":[{"@container":["","normal","size",N,O]}],"container-named":[nE],columns:[{columns:[ee,O,N,i]}],"break-after":[{"break-after":g()}],"break-before":[{"break-before":g()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:S()}],overflow:[{overflow:k()}],"overflow-x":[{"overflow-x":k()}],"overflow-y":[{"overflow-y":k()}],overscroll:[{overscroll:L()}],"overscroll-x":[{"overscroll-x":L()}],"overscroll-y":[{"overscroll-y":L()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:E()}],"inset-x":[{"inset-x":E()}],"inset-y":[{"inset-y":E()}],start:[{"inset-s":E(),start:E()}],end:[{"inset-e":E(),end:E()}],"inset-bs":[{"inset-bs":E()}],"inset-be":[{"inset-be":E()}],top:[{top:E()}],right:[{right:E()}],bottom:[{bottom:E()}],left:[{left:E()}],visibility:["visible","invisible","collapse"],z:[{z:[Ea,"auto",N,O]}],basis:[{basis:[Wo,"full","auto",i,...C()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[ee,Wo,"auto","initial","none",O]}],grow:[{grow:["",ee,N,O]}],shrink:[{shrink:["",ee,N,O]}],order:[{order:[Ea,"first","last","none",N,O]}],"grid-cols":[{"grid-cols":T()}],"col-start-end":[{col:z()}],"col-start":[{"col-start":K()}],"col-end":[{"col-end":K()}],"grid-rows":[{"grid-rows":T()}],"row-start-end":[{row:z()}],"row-start":[{"row-start":K()}],"row-end":[{"row-end":K()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":$()}],"auto-rows":[{"auto-rows":$()}],gap:[{gap:C()}],"gap-x":[{"gap-x":C()}],"gap-y":[{"gap-y":C()}],"justify-content":[{justify:[...G(),"normal"]}],"justify-items":[{"justify-items":[...pe(),"normal"]}],"justify-self":[{"justify-self":["auto",...pe()]}],"align-content":[{content:["normal",...G()]}],"align-items":[{items:[...pe(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...pe(),{baseline:["","last"]}]}],"place-content":[{"place-content":G()}],"place-items":[{"place-items":[...pe(),"baseline"]}],"place-self":[{"place-self":["auto",...pe()]}],p:[{p:C()}],px:[{px:C()}],py:[{py:C()}],ps:[{ps:C()}],pe:[{pe:C()}],pbs:[{pbs:C()}],pbe:[{pbe:C()}],pt:[{pt:C()}],pr:[{pr:C()}],pb:[{pb:C()}],pl:[{pl:C()}],m:[{m:V()}],mx:[{mx:V()}],my:[{my:V()}],ms:[{ms:V()}],me:[{me:V()}],mbs:[{mbs:V()}],mbe:[{mbe:V()}],mt:[{mt:V()}],mr:[{mr:V()}],mb:[{mb:V()}],ml:[{ml:V()}],"space-x":[{"space-x":C()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":C()}],"space-y-reverse":["space-y-reverse"],size:[{size:Q()}],"inline-size":[{inline:["auto",...H()]}],"min-inline-size":[{"min-inline":["auto",...H()]}],"max-inline-size":[{"max-inline":["none",...H()]}],"block-size":[{block:["auto",...B()]}],"min-block-size":[{"min-block":["auto",...B()]}],"max-block-size":[{"max-block":["none",...B()]}],w:[{w:[i,"screen",...Q()]}],"min-w":[{"min-w":[i,"screen","none",...Q()]}],"max-w":[{"max-w":[i,"screen","none","prose",{screen:[n]},...Q()]}],h:[{h:["screen","lh",...Q()]}],"min-h":[{"min-h":["screen","lh","none",...Q()]}],"max-h":[{"max-h":["screen","lh",...Q()]}],"font-size":[{text:["base",a,Gi,Nr]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[o,mE,sE]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",ah,O]}],"font-family":[{font:[fE,uE,t]}],"font-features":[{"font-features":[O]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[r,N,O]}],"line-clamp":[{"line-clamp":[ee,"none",N,QC]}],leading:[{leading:[l,...C()]}],"list-image":[{"list-image":["none",N,O]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",N,O]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:P()}],"text-color":[{text:P()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Se(),"wavy"]}],"text-decoration-thickness":[{decoration:[ee,"from-font","auto",N,Nr]}],"text-decoration-color":[{decoration:P()}],"underline-offset":[{"underline-offset":[ee,"auto",N,O]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:C()}],"tab-size":[{tab:[Ea,N,O]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",N,O]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",N,O]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:W()}],"bg-repeat":[{bg:Ue()}],"bg-size":[{bg:Ht()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},Ea,N,O],radial:["",N,O],conic:[Ea,N,O]},pE,dE]}],"bg-color":[{bg:P()}],"gradient-from-pos":[{from:Ye()}],"gradient-via-pos":[{via:Ye()}],"gradient-to-pos":[{to:Ye()}],"gradient-from":[{from:P()}],"gradient-via":[{via:P()}],"gradient-to":[{to:P()}],rounded:[{rounded:Ee()}],"rounded-s":[{"rounded-s":Ee()}],"rounded-e":[{"rounded-e":Ee()}],"rounded-t":[{"rounded-t":Ee()}],"rounded-r":[{"rounded-r":Ee()}],"rounded-b":[{"rounded-b":Ee()}],"rounded-l":[{"rounded-l":Ee()}],"rounded-ss":[{"rounded-ss":Ee()}],"rounded-se":[{"rounded-se":Ee()}],"rounded-ee":[{"rounded-ee":Ee()}],"rounded-es":[{"rounded-es":Ee()}],"rounded-tl":[{"rounded-tl":Ee()}],"rounded-tr":[{"rounded-tr":Ee()}],"rounded-br":[{"rounded-br":Ee()}],"rounded-bl":[{"rounded-bl":Ee()}],"border-w":[{border:Ce()}],"border-w-x":[{"border-x":Ce()}],"border-w-y":[{"border-y":Ce()}],"border-w-s":[{"border-s":Ce()}],"border-w-e":[{"border-e":Ce()}],"border-w-bs":[{"border-bs":Ce()}],"border-w-be":[{"border-be":Ce()}],"border-w-t":[{"border-t":Ce()}],"border-w-r":[{"border-r":Ce()}],"border-w-b":[{"border-b":Ce()}],"border-w-l":[{"border-l":Ce()}],"divide-x":[{"divide-x":Ce()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":Ce()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...Se(),"hidden","none"]}],"divide-style":[{divide:[...Se(),"hidden","none"]}],"border-color":[{border:P()}],"border-color-x":[{"border-x":P()}],"border-color-y":[{"border-y":P()}],"border-color-s":[{"border-s":P()}],"border-color-e":[{"border-e":P()}],"border-color-bs":[{"border-bs":P()}],"border-color-be":[{"border-be":P()}],"border-color-t":[{"border-t":P()}],"border-color-r":[{"border-r":P()}],"border-color-b":[{"border-b":P()}],"border-color-l":[{"border-l":P()}],"divide-color":[{divide:P()}],"outline-style":[{outline:[...Se(),"none","hidden"]}],"outline-offset":[{"outline-offset":[ee,N,O]}],"outline-w":[{outline:["",ee,Gi,Nr]}],"outline-color":[{outline:P()}],shadow:[{shadow:["","none",d,Id,Rd]}],"shadow-color":[{shadow:P()}],"inset-shadow":[{"inset-shadow":["none",f,Id,Rd]}],"inset-shadow-color":[{"inset-shadow":P()}],"ring-w":[{ring:Ce()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:P()}],"ring-offset-w":[{"ring-offset":[ee,Nr]}],"ring-offset-color":[{"ring-offset":P()}],"inset-ring-w":[{"inset-ring":Ce()}],"inset-ring-color":[{"inset-ring":P()}],"text-shadow":[{"text-shadow":["none",c,Id,Rd]}],"text-shadow-color":[{"text-shadow":P()}],opacity:[{opacity:[ee,N,O]}],"mix-blend":[{"mix-blend":[...la(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":la()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[ee]}],"mask-image-linear-from-pos":[{"mask-linear-from":Le()}],"mask-image-linear-to-pos":[{"mask-linear-to":Le()}],"mask-image-linear-from-color":[{"mask-linear-from":P()}],"mask-image-linear-to-color":[{"mask-linear-to":P()}],"mask-image-t-from-pos":[{"mask-t-from":Le()}],"mask-image-t-to-pos":[{"mask-t-to":Le()}],"mask-image-t-from-color":[{"mask-t-from":P()}],"mask-image-t-to-color":[{"mask-t-to":P()}],"mask-image-r-from-pos":[{"mask-r-from":Le()}],"mask-image-r-to-pos":[{"mask-r-to":Le()}],"mask-image-r-from-color":[{"mask-r-from":P()}],"mask-image-r-to-color":[{"mask-r-to":P()}],"mask-image-b-from-pos":[{"mask-b-from":Le()}],"mask-image-b-to-pos":[{"mask-b-to":Le()}],"mask-image-b-from-color":[{"mask-b-from":P()}],"mask-image-b-to-color":[{"mask-b-to":P()}],"mask-image-l-from-pos":[{"mask-l-from":Le()}],"mask-image-l-to-pos":[{"mask-l-to":Le()}],"mask-image-l-from-color":[{"mask-l-from":P()}],"mask-image-l-to-color":[{"mask-l-to":P()}],"mask-image-x-from-pos":[{"mask-x-from":Le()}],"mask-image-x-to-pos":[{"mask-x-to":Le()}],"mask-image-x-from-color":[{"mask-x-from":P()}],"mask-image-x-to-color":[{"mask-x-to":P()}],"mask-image-y-from-pos":[{"mask-y-from":Le()}],"mask-image-y-to-pos":[{"mask-y-to":Le()}],"mask-image-y-from-color":[{"mask-y-from":P()}],"mask-image-y-to-color":[{"mask-y-to":P()}],"mask-image-radial":[{"mask-radial":[N,O]}],"mask-image-radial-from-pos":[{"mask-radial-from":Le()}],"mask-image-radial-to-pos":[{"mask-radial-to":Le()}],"mask-image-radial-from-color":[{"mask-radial-from":P()}],"mask-image-radial-to-color":[{"mask-radial-to":P()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":y()}],"mask-image-conic-pos":[{"mask-conic":[ee]}],"mask-image-conic-from-pos":[{"mask-conic-from":Le()}],"mask-image-conic-to-pos":[{"mask-conic-to":Le()}],"mask-image-conic-from-color":[{"mask-conic-from":P()}],"mask-image-conic-to-color":[{"mask-conic-to":P()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:W()}],"mask-repeat":[{mask:Ue()}],"mask-size":[{mask:Ht()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",N,O]}],filter:[{filter:["","none",N,O]}],blur:[{blur:Qo()}],brightness:[{brightness:[ee,N,O]}],contrast:[{contrast:[ee,N,O]}],"drop-shadow":[{"drop-shadow":["","none",m,Id,Rd]}],"drop-shadow-color":[{"drop-shadow":P()}],grayscale:[{grayscale:["",ee,N,O]}],"hue-rotate":[{"hue-rotate":[ee,N,O]}],invert:[{invert:["",ee,N,O]}],saturate:[{saturate:[ee,N,O]}],sepia:[{sepia:["",ee,N,O]}],"backdrop-filter":[{"backdrop-filter":["","none",N,O]}],"backdrop-blur":[{"backdrop-blur":Qo()}],"backdrop-brightness":[{"backdrop-brightness":[ee,N,O]}],"backdrop-contrast":[{"backdrop-contrast":[ee,N,O]}],"backdrop-grayscale":[{"backdrop-grayscale":["",ee,N,O]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[ee,N,O]}],"backdrop-invert":[{"backdrop-invert":["",ee,N,O]}],"backdrop-opacity":[{"backdrop-opacity":[ee,N,O]}],"backdrop-saturate":[{"backdrop-saturate":[ee,N,O]}],"backdrop-sepia":[{"backdrop-sepia":["",ee,N,O]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":C()}],"border-spacing-x":[{"border-spacing-x":C()}],"border-spacing-y":[{"border-spacing-y":C()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",N,O]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[ee,"initial",N,O]}],ease:[{ease:["linear","initial",h,N,O]}],delay:[{delay:[ee,N,O]}],animate:[{animate:["none",p,N,O]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[v,N,O]}],"perspective-origin":[{"perspective-origin":S()}],rotate:[{rotate:Mt()}],"rotate-x":[{"rotate-x":Mt()}],"rotate-y":[{"rotate-y":Mt()}],"rotate-z":[{"rotate-z":Mt()}],scale:[{scale:ma()}],"scale-x":[{"scale-x":ma()}],"scale-y":[{"scale-y":ma()}],"scale-z":[{"scale-z":ma()}],"scale-3d":["scale-3d"],skew:[{skew:qt()}],"skew-x":[{"skew-x":qt()}],"skew-y":[{"skew-y":qt()}],transform:[{transform:[N,O,"","none","gpu","cpu"]}],"transform-origin":[{origin:S()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:Et()}],"translate-x":[{"translate-x":Et()}],"translate-y":[{"translate-y":Et()}],"translate-z":[{"translate-z":Et()}],"translate-none":["translate-none"],zoom:[{zoom:[Ea,N,O]}],accent:[{accent:P()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:P()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",N,O]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scrollbar-thumb-color":[{"scrollbar-thumb":P()}],"scrollbar-track-color":[{"scrollbar-track":P()}],"scrollbar-gutter":[{"scrollbar-gutter":["auto","stable","both"]}],"scrollbar-w":[{scrollbar:["auto","thin","none"]}],"scroll-m":[{"scroll-m":C()}],"scroll-mx":[{"scroll-mx":C()}],"scroll-my":[{"scroll-my":C()}],"scroll-ms":[{"scroll-ms":C()}],"scroll-me":[{"scroll-me":C()}],"scroll-mbs":[{"scroll-mbs":C()}],"scroll-mbe":[{"scroll-mbe":C()}],"scroll-mt":[{"scroll-mt":C()}],"scroll-mr":[{"scroll-mr":C()}],"scroll-mb":[{"scroll-mb":C()}],"scroll-ml":[{"scroll-ml":C()}],"scroll-p":[{"scroll-p":C()}],"scroll-px":[{"scroll-px":C()}],"scroll-py":[{"scroll-py":C()}],"scroll-ps":[{"scroll-ps":C()}],"scroll-pe":[{"scroll-pe":C()}],"scroll-pbs":[{"scroll-pbs":C()}],"scroll-pbe":[{"scroll-pbe":C()}],"scroll-pt":[{"scroll-pt":C()}],"scroll-pr":[{"scroll-pr":C()}],"scroll-pb":[{"scroll-pb":C()}],"scroll-pl":[{"scroll-pl":C()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",N,O]}],fill:[{fill:["none",...P()]}],"stroke-w":[{stroke:[ee,Gi,Nr,QC]}],stroke:[{stroke:["none",...P()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{"container-named":["container-type"],overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","inset-bs","inset-be","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pbs","pbe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mbs","mbe","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-bs","border-w-be","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-bs","border-color-be","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mbs","scroll-mbe","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pbs","scroll-pbe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},postfixLookupClassGroups:["container-type"],orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}};var mS=WM(gE);function se(...e){return mS(Hu(e))}var hS=A(J(),1),xE=qu("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",{variants:{variant:{default:"bg-primary text-primary-foreground [a]:hover:bg-primary/80",secondary:"bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",destructive:"bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",outline:"border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",ghost:"hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",link:"text-primary underline-offset-4 hover:underline"}},defaultVariants:{variant:"default"}});function Da({className:e,variant:t="default",asChild:a=!1,...o}){let r=a?zl.Root:"span";return(0,hS.jsx)(r,{"data-slot":"badge","data-variant":t,className:se(xE({variant:t}),e),...o})}var HB=A(q(),1);var zB=A(q(),1);var gS=A(J(),1);function Zl({className:e,label:t="Loading",...a}){return(0,gS.jsx)("span",{role:"status","aria-label":t,className:se("loupe-spin inline-block leading-none",e),...a})}var Ad=A(J(),1),vE=qu("group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/80",outline:"border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",secondary:"bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",ghost:"hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",destructive:"bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",xs:"h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",sm:"h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",lg:"h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",icon:"size-9","icon-xs":"size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3","icon-sm":"size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md","icon-lg":"size-10"}},defaultVariants:{variant:"default",size:"default"}});function ne({className:e,variant:t="default",size:a="default",asChild:o=!1,loading:r=!1,disabled:l,children:n,...i}){let s=o?zl.Root:"button";return(0,Ad.jsxs)(s,{"data-slot":"button","data-variant":t,"data-size":a,"data-loading":r||void 0,"aria-busy":r||void 0,disabled:l||r&&!o,className:se(vE({variant:t,size:a,className:e})),...i,children:[r&&!o?(0,Ad.jsx)(Zl,{"aria-hidden":!0,className:"-ml-0.5",label:""}):null,n]})}var KB=A(q(),1);var bE=A(J(),1);var QB=A(q(),1);var Md=A(q(),1),vS=A(J(),1),xS=Md.createContext(null);function Vi({value:e,children:t}){return(0,vS.jsx)(xS.Provider,{value:e,children:t})}function Xi(){return Md.useContext(xS)}var bS=A(J(),1);var a8=A(q(),1);var Yo=A(J(),1);function Ed({...e}){return(0,Yo.jsx)(io.Root,{"data-slot":"dropdown-menu",...e})}function Dd({...e}){return(0,Yo.jsx)(io.Trigger,{"data-slot":"dropdown-menu-trigger",...e})}function Td({className:e,sideOffset:t=4,...a}){let o=Xi();return(0,Yo.jsx)(io.Portal,{container:o??void 0,children:(0,Yo.jsx)(io.Content,{"data-slot":"dropdown-menu-content",sideOffset:t,className:se("z-[2147483647] max-h-(--radix-dropdown-menu-content-available-height) min-w-40 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",e),...a})})}function nh({className:e,variant:t="default",...a}){return(0,Yo.jsx)(io.Item,{"data-slot":"dropdown-menu-item","data-variant":t,className:se("relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-foreground/10 data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",e),...a})}function ih({className:e,...t}){return(0,Yo.jsx)(io.Separator,{"data-slot":"dropdown-menu-separator",className:se("-mx-1 my-1 h-px bg-border",e),...t})}var i8=A(q(),1);var yS=A(J(),1);function Yl({className:e,type:t,...a}){return(0,yS.jsx)("input",{type:t,"data-slot":"input",className:se("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",e),...a})}var d8=A(q(),1);var wS=A(J(),1);var m8=A(q(),1);var CS=A(J(),1);function ji({className:e,...t}){return(0,CS.jsx)("textarea",{"data-slot":"textarea",className:se("flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",e),...t})}var Pd="https://github.com/woddlepad/loupe",Od='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>',U={layer:"fixed inset-0 z-[2147483646] cursor-crosshair",dim:"fixed inset-0 bg-black/25 loupe-animate-fade",marquee:"fixed rounded-[4px] border border-loupe-accent/80 bg-loupe-accent/10 shadow-[0_0_0_1px_rgba(0,0,0,0.35)] pointer-events-none",inspectBox:"fixed rounded-[4px] border border-loupe-accent/90 bg-loupe-accent/10 shadow-[0_0_0_1px_rgba(0,0,0,0.35)] pointer-events-none",inspectLabel:"fixed max-w-[min(360px,calc(100vw-24px))] truncate rounded-md bg-loupe-fg px-2 py-1 text-[11px] font-semibold leading-none text-loupe-bg shadow-lg shadow-black/30 ring-1 ring-black/20 pointer-events-none",hint:"fixed left-1/2 top-3 -translate-x-1/2 rounded-loupe bg-loupe-bg/95 border border-loupe-line text-loupe-fg text-[12px] px-3 py-1.5 shadow-2xl shadow-black/50",panel:"fixed box-border w-[min(340px,calc(100vw-24px))] rounded-loupe bg-loupe-panel/95 border border-loupe-line text-loupe-fg shadow-2xl shadow-black/50 p-3 text-[13px] loupe-animate-panel",close:"absolute right-2 top-2 w-7 h-7 grid place-items-center rounded-md text-loupe-muted hover:text-loupe-fg hover:bg-white/5 cursor-pointer transition-colors",title:"text-[13px] font-semibold leading-tight",crumbs:"text-[11px] text-loupe-muted mt-1 break-words leading-snug",chips:"flex flex-wrap gap-1.5 mt-2.5",chip:"inline-flex items-center gap-1.5 rounded-full border border-loupe-line bg-loupe-elev/50 text-loupe-muted text-[12px] px-2.5 py-1 cursor-pointer select-none transition-colors hover:bg-loupe-elev data-[on=true]:bg-loupe-accent/15 data-[on=true]:border-loupe-accent/40 data-[on=true]:text-loupe-fg",textarea:"mt-2.5 w-full box-border min-h-[64px] resize-y rounded-lg bg-loupe-bg/80 border border-loupe-line text-loupe-fg text-[13px] p-2 outline-none transition-colors focus:border-loupe-accent/60 placeholder:text-loupe-faint",groupCombo:"relative mt-2",groupComboButton:"flex h-8 w-full box-border items-center justify-between gap-2 rounded-lg bg-loupe-bg/80 border border-loupe-line px-2 text-left text-[12px] text-loupe-fg transition-colors hover:bg-loupe-elev focus:outline-none focus:border-loupe-accent/60 cursor-pointer",groupComboPlaceholder:"text-loupe-faint",groupComboPopover:"absolute left-0 right-0 top-[calc(100%+4px)] z-[1] overflow-hidden rounded-lg border border-loupe-line bg-loupe-panel shadow-2xl shadow-black/50",groupComboSearchWrap:"p-1.5 border-b border-loupe-line",groupComboSearch:"w-full box-border rounded-md bg-loupe-bg/80 border border-loupe-line text-loupe-fg text-[12px] px-2 py-1.5 outline-none transition-colors focus:border-loupe-accent/60 placeholder:text-loupe-faint",groupComboMenu:"max-h-40 overflow-y-auto p-1",groupComboItem:"w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] text-loupe-muted hover:bg-white/5 hover:text-loupe-fg cursor-pointer",groupComboCheck:"ml-auto text-loupe-fg opacity-0",groupComboCheckSelected:"ml-auto text-loupe-fg opacity-100",groupComboCreate:"w-full rounded-md border-t border-loupe-line px-2 py-1.5 text-left text-[12px] text-loupe-fg hover:bg-white/5 cursor-pointer",refsRow:"flex items-center gap-1.5 mt-2 flex-wrap",refThumb:"relative w-12 h-12 rounded-md border border-loupe-line overflow-hidden group/ref bg-loupe-bg",refImg:"w-full h-full object-cover",refRemove:"absolute top-0.5 right-0.5 w-4 h-4 grid place-items-center rounded bg-black/70 text-white text-[10px] leading-none opacity-0 group-hover/ref:opacity-100 cursor-pointer",addRef:"w-12 h-12 rounded-md border border-dashed border-loupe-line-strong text-loupe-faint hover:text-loupe-fg hover:border-loupe-accent/50 grid place-items-center text-[18px] cursor-pointer transition-colors",libBtn:"h-12 px-2.5 inline-flex items-center gap-1.5 rounded-md border border-loupe-line bg-loupe-bg/70 text-loupe-muted hover:text-loupe-fg hover:border-loupe-line-strong text-[11px] cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50",pickerWrap:"fixed inset-0 z-[2147483647] grid place-items-center bg-black/70 p-4 text-loupe-fg",picker:"flex max-h-[min(760px,calc(100vh-2rem))] w-[min(920px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl bg-loupe-panel border border-loupe-line shadow-2xl shadow-black/60",pickerHeader:"flex items-start gap-3 border-b border-loupe-line px-4 py-3",pickerTitle:"text-[13px] font-semibold leading-none",pickerDescription:"mt-1 text-[11px] text-loupe-muted",pickerClose:"ml-auto h-7 w-7 grid place-items-center rounded-lg text-loupe-muted hover:bg-white/5 hover:text-loupe-fg cursor-pointer transition-colors",pickerSearch:"w-full box-border rounded-md bg-loupe-bg/80 border border-loupe-line text-loupe-fg text-[12px] px-2 py-1.5 outline-none transition-colors focus:border-loupe-accent/60 placeholder:text-loupe-faint",pickerList:"flex-1 overflow-y-auto p-3 space-y-4",pickerGroupButton:"w-full flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11px] font-medium text-loupe-muted hover:bg-white/5 hover:text-loupe-fg cursor-pointer",pickerGroupCount:"ml-auto text-loupe-faint",pickerGrid:"grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2",pickCell:"overflow-hidden rounded-xl border border-loupe-line bg-loupe-bg/70 text-left hover:border-loupe-line-strong hover:bg-white/[0.04] cursor-pointer p-0 transition-all active:scale-[0.99] disabled:opacity-50",pickImgWrap:"aspect-[16/9] border-b border-loupe-line bg-black/40",pickText:"p-2.5 text-[12px] font-medium text-loupe-fg leading-snug line-clamp-1",pickMeta:"px-2.5 pb-2.5 text-[10.5px] text-loupe-faint leading-snug line-clamp-1",actions:"flex flex-col gap-1.5 mt-2.5",error:"hidden mt-2.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-2 text-[12px] leading-snug text-loupe-fg whitespace-pre-line",primary:"w-full inline-flex items-center justify-center gap-2 rounded-lg bg-loupe-fg hover:bg-white text-loupe-bg font-semibold text-[13px] px-3 py-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-default",secondary:"w-full inline-flex items-center justify-center gap-2 rounded-lg bg-loupe-bg hover:bg-loupe-elev border border-loupe-line text-loupe-fg text-[13px] px-3 py-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-default",footer:"flex items-center mt-2",cancel:"text-loupe-muted hover:text-loupe-fg text-[12px] px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer transition-colors",brandViewport:"fixed bottom-3 left-1/2 z-[2147483647] flex -translate-x-1/2 items-center gap-3 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] pointer-events-auto",brandPanel:"mt-3 flex items-center justify-between gap-3 border-t border-loupe-line pt-2.5 text-loupe-muted",brandText:"inline-flex items-center gap-1.5 text-[11px] font-medium",brandMark:"grid h-5 w-5 place-items-center rounded-full border border-current text-current",github:"inline-flex h-7 items-center gap-1.5 rounded-md border border-current bg-transparent px-2 text-[11px] font-semibold text-current transition-colors hover:text-loupe-fg focus:outline-none focus:ring-1 focus:ring-loupe-accent/70 cursor-pointer",code:"text-loupe-fg/90 font-mono"};var I=A(J(),1),yE='<svg xmlns="http://www.w3.org/2000/svg" width="256" height="257" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/></svg>',wE='<svg xmlns="http://www.w3.org/2000/svg" width="256" height="260" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="#fff" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>',CE='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6h16v2h-3v10h-2V8H9v10H7V8H4z"/></svg>',SE='<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 208"><path fill="currentColor" d="M205.3 31.4c14 14.8 20 35.2 22.5 63.6 6.6 0 12.8 1.5 17 7.2l7.8 10.6c2.2 3 3.4 6.6 3.4 10.4v28.7a12 12 0 0 1-4.8 9.5C215.9 187.2 172.3 208 128 208c-49 0-98.2-28.3-123.2-46.6a12 12 0 0 1-4.8-9.5v-28.7c0-3.8 1.2-7.4 3.4-10.5l7.8-10.5c4.2-5.7 10.4-7.2 17-7.2 2.5-28.4 8.4-48.8 22.5-63.6C77.3 3.2 112.6 0 127.6 0h.4c14.7 0 50.4 2.9 77.3 31.4ZM128 78.7c-3 0-6.5.2-10.3.6a27.1 27.1 0 0 1-6 12.1 45 45 0 0 1-32 13c-6.8 0-13.9-1.5-19.7-5.2-5.5 1.9-10.8 4.5-11.2 11-.5 12.2-.6 24.5-.6 36.8 0 6.1 0 12.3-.2 18.5 0 3.6 2.2 6.9 5.5 8.4C79.9 185.9 105 192 128 192s48-6 74.5-18.1a9.4 9.4 0 0 0 5.5-8.4c.3-18.4 0-37-.8-55.3-.4-6.6-5.7-9.1-11.2-11-5.8 3.7-13 5.1-19.7 5.1a45 45 0 0 1-32-12.9 27.1 27.1 0 0 1-6-12.1c-3.4-.4-6.9-.5-10.3-.6Zm-27 44c5.8 0 10.5 4.6 10.5 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.6-10.4 10.4-10.4Zm53.4 0c5.8 0 10.4 4.6 10.4 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.7-10.4 10.4-10.4Zm-73-94.4c-11.2 1.1-20.6 4.8-25.4 10-10.4 11.3-8.2 40.1-2.2 46.2A31.2 31.2 0 0 0 75 91.7c6.8 0 19.6-1.5 30.1-12.2 4.7-4.5 7.5-15.7 7.2-27-.3-9.1-2.9-16.7-6.7-19.9-4.2-3.6-13.6-5.2-24.2-4.3Zm69 4.3c-3.8 3.2-6.4 10.8-6.7 19.9-.3 11.3 2.5 22.5 7.2 27a41.7 41.7 0 0 0 30 12.2c8.9 0 17-2.9 21.3-7.2 6-6.1 8.2-34.9-2.2-46.3-4.8-5-14.2-8.8-25.4-9.9-10.6-1-20 .7-24.2 4.3ZM128 56c-2.6 0-5.6.2-9 .5.4 1.7.5 3.7.7 5.7 0 1.5 0 3-.2 4.5 3.2-.3 6-.3 8.5-.3 2.6 0 5.3 0 8.5.3-.2-1.6-.2-3-.2-4.5.2-2 .3-4 .7-5.7-3.4-.3-6.4-.5-9-.5Z"/></svg>',LE="#d97757";function SS(e){return(0,I.jsx)(Vi,{value:e.portalContainer,children:(0,I.jsx)(RE,{...e})})}function RE(e){let{variant:t,title:a,target:o,crumbsText:r,placeholder:l,panelWidth:n,marquee:i,screenshotUrl:s,videoUrl:u,note:d,onNoteChange:f,showGroup:c,groups:m,group:b,onGroupChange:v,onCreateGroup:w,suggestions:h,acceptedKinds:p,onToggleSuggestion:g,showRefs:y,refs:S,onAddFiles:k,onRemoveRef:L,library:C,resolveLibraryImage:E,onAttachLibraryImage:T,actions:z,defaultActionId:K,submittingActionId:$,onSubmit:G,error:pe,onClose:V,panelRef:Q}=e,H=$!=null,B=z.some(W=>W.id===K),P=W=>{W.key!=="Enter"||W.shiftKey||W.metaKey||W.ctrlKey||W.altKey||W.nativeEvent.isComposing||!(W.target instanceof HTMLTextAreaElement||W.target instanceof HTMLInputElement)||!B||H||(W.preventDefault(),G(K))};return(0,I.jsxs)("div",{className:U.layer,style:{cursor:"default"},children:[(0,I.jsx)("div",{className:U.dim}),i?(0,I.jsx)("div",{className:U.marquee,style:{left:i.x,top:i.y,width:i.width,height:i.height}}):null,(0,I.jsxs)("div",{ref:Q,className:U.panel,style:n?{width:n}:void 0,onKeyDown:P,children:[(0,I.jsx)("button",{type:"button",className:U.close,title:t==="recording"?"discard recording":"cancel",onClick:V,children:(0,I.jsx)(La,{width:15,height:15,"aria-hidden":!0})}),(0,I.jsx)("div",{className:U.title,children:a}),(0,I.jsx)("div",{className:U.crumbs,children:o?(0,I.jsx)(IE,{target:o}):r}),u?(0,I.jsx)("video",{src:u,controls:!0,playsInline:!0,muted:!0,style:{marginTop:10,width:"100%",borderRadius:8,background:"#000",maxHeight:200}}):null,s?(0,I.jsx)("img",{src:s,alt:"",style:{marginTop:10,width:"100%",borderRadius:8,background:"#000",maxHeight:200,objectFit:"contain"}}):null,h&&h.length>0?(0,I.jsx)("div",{className:U.chips,children:h.map(W=>{let Ue=p?.includes(W.kind)??!1;return(0,I.jsxs)("button",{type:"button",className:U.chip,"data-on":Ue?"true":"false",title:W.detail,onClick:()=>g?.(W.kind),children:[(0,I.jsx)(DE,{kind:W.kind}),(0,I.jsx)("span",{children:W.label})]},W.kind)})}):null,(0,I.jsx)(ji,{className:"mt-2.5 resize-y text-[13px]",placeholder:l,value:d,autoFocus:!0,onChange:W=>f(W.target.value)}),c?(0,I.jsx)(kE,{groups:m,value:b,onChange:v,onCreate:w}):null,y?(0,I.jsx)(AE,{refs:S??[],onAddFiles:k,onRemoveRef:L,library:C??[],resolveLibraryImage:E,onAttach:T}):null,pe?(0,I.jsx)("div",{className:"mt-2.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-2 text-[12px] leading-snug text-loupe-fg whitespace-pre-line",children:pe}):null,(0,I.jsx)("div",{className:U.actions,children:z.map(W=>{let Ue=W.id===K;return(0,I.jsxs)(ne,{type:"button",variant:Ue?"default":"secondary",className:"w-full",loading:$===W.id,disabled:H&&$!==W.id,title:W.hint,onClick:()=>void G(W.id),children:[(0,I.jsx)(TE,{action:W}),(0,I.jsx)("span",{children:OE(W)})]},W.id)})}),(0,I.jsx)(EE,{})]})]})}function IE({target:e}){let t=[],a=!1,o=()=>{a&&t.push((0,I.jsx)("span",{children:" \xB7 "},`sep-${t.length}`)),a=!0};e.componentChain.length&&(o(),e.componentChain.forEach((l,n)=>{n>0&&t.push((0,I.jsx)("span",{children:" \u203A "},`arrow-${n}`)),t.push((0,I.jsx)("code",{className:U.code,children:l.name},`comp-${n}`))}));let r=e.dataAttributes["data-slot"];return r&&(o(),t.push((0,I.jsxs)("span",{children:["data-slot=",(0,I.jsx)("code",{className:U.code,children:r})]},"slot"))),e.text&&(o(),t.push((0,I.jsx)("span",{children:`"${e.text.slice(0,48)}"`},"text"))),a||t.push((0,I.jsx)("code",{className:U.code,children:e.selector},"selector")),(0,I.jsx)(I.Fragment,{children:t})}function kE({groups:e,value:t,onChange:a,onCreate:o}){let[r,l]=(0,ut.useState)(!1),[n,i]=(0,ut.useState)(""),s=(0,ut.useRef)(null),u=(0,ut.useRef)(null),d=(0,ut.useMemo)(()=>[...new Set(e.map(g=>g.trim()).filter(Boolean))].sort((g,y)=>g.localeCompare(y)),[e]);(0,ut.useEffect)(()=>{r&&s.current?.focus()},[r]);let f=t.trim(),c=()=>l(!1),m=()=>{i(""),l(!0)},b=g=>{a(g),c(),u.current?.focus()},v=n.trim(),w=d.filter(g=>g.toLowerCase().includes(v.toLowerCase())),h=d.some(g=>g.toLowerCase()===v.toLowerCase()),p=async()=>{v&&(h||await o(v),b(v))};return(0,I.jsxs)("div",{className:U.groupCombo,children:[(0,I.jsxs)("button",{ref:u,type:"button",className:U.groupComboButton,role:"combobox","aria-expanded":r,"aria-haspopup":"listbox",title:"Select group",onClick:()=>r?c():m(),onKeyDown:g=>{g.key!=="ArrowDown"&&g.key!=="Enter"&&g.key!==" "||(g.preventDefault(),m())},children:[(0,I.jsx)("span",{className:f?"":U.groupComboPlaceholder,children:f||"Select a group"}),(0,I.jsx)(wr,{width:14,height:14,style:{flexShrink:0},"aria-hidden":!0})]}),r?(0,I.jsxs)("div",{className:U.groupComboPopover,onMouseDown:g=>g.preventDefault(),children:[(0,I.jsx)("div",{className:U.groupComboSearchWrap,children:(0,I.jsx)("input",{ref:s,className:U.groupComboSearch,type:"search",placeholder:"Search groups",autoComplete:"off",value:n,onChange:g=>i(g.target.value),onBlur:()=>setTimeout(c,120),onKeyDown:g=>{g.key==="Enter"&&(g.preventDefault(),g.stopPropagation(),p()),g.key==="Escape"&&(g.preventDefault(),g.stopPropagation(),c(),u.current?.focus())}})}),(0,I.jsxs)("div",{className:U.groupComboMenu,role:"listbox",children:[w.map(g=>(0,I.jsxs)("button",{type:"button",role:"option","aria-selected":g===f,className:U.groupComboItem,onMouseDown:y=>y.preventDefault(),onClick:()=>b(g),children:[(0,I.jsx)("span",{children:g}),(0,I.jsx)(gi,{width:13,height:13,className:g===f?U.groupComboCheckSelected:U.groupComboCheck,"aria-hidden":!0})]},g)),v&&!h?(0,I.jsx)("button",{type:"button",className:U.groupComboCreate,onMouseDown:g=>g.preventDefault(),onClick:()=>void p(),children:`Create "${v}"`}):null,w.length===0&&!(v&&!h)?(0,I.jsx)("div",{className:"px-2 py-1.5 text-[12px] text-loupe-faint",children:"No groups"}):null]})]}):null]})}function AE({refs:e,onAddFiles:t,onRemoveRef:a,library:o,resolveLibraryImage:r,onAttach:l}){let[n,i]=(0,ut.useState)(!1),s=(0,ut.useRef)(null);return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)("div",{className:U.refsRow,children:[(0,I.jsx)("button",{type:"button",className:U.addRef,title:"add reference image (or paste)",onClick:()=>s.current?.click(),children:(0,I.jsx)(Lr,{width:16,height:16,"aria-hidden":!0})}),(0,I.jsx)("input",{ref:s,type:"file",accept:"image/*",multiple:!0,style:{display:"none"},onChange:u=>{let d=Array.from(u.target.files??[]);d.length&&t?.(d),u.target.value=""}}),e.map((u,d)=>(0,I.jsxs)("div",{className:U.refThumb,children:[(0,I.jsx)("img",{className:U.refImg,src:u.dataUrl,alt:""}),(0,I.jsx)("button",{type:"button",className:U.refRemove,onClick:()=>a?.(d),children:"\u2715"})]},d)),o.length>0?(0,I.jsxs)("button",{type:"button",className:U.libBtn,onClick:()=>i(!0),children:[(0,I.jsx)(Sr,{width:13,height:13,"aria-hidden":!0}),(0,I.jsx)("span",{children:"from library"})]}):null]}),n&&r?(0,I.jsx)(ME,{library:o,resolveLibraryImage:r,onAttach:u=>l?.(u),onClose:()=>i(!1)}):null]})}function ME({library:e,resolveLibraryImage:t,onAttach:a,onClose:o}){let[r,l]=(0,ut.useState)(""),[n,i]=(0,ut.useState)(new Set),[s,u]=(0,ut.useState)(null),[d,f]=(0,ut.useState)(null),c=(0,ut.useMemo)(()=>NE(e,r),[e,r]),m=v=>{i(w=>{let h=new Set(w);return h.has(v)?h.delete(v):h.add(v),h})},b=async v=>{if(s)return;u(v.id),f(null);let w=await t(v.id);if(w){a(w),o();return}u(null),f("Could not load this reference image.")};return(0,I.jsx)("div",{className:U.pickerWrap,onMouseDown:v=>{v.target===v.currentTarget&&o()},children:(0,I.jsxs)("div",{className:U.picker,onMouseDown:v=>v.stopPropagation(),children:[(0,I.jsxs)("div",{className:U.pickerHeader,children:[(0,I.jsxs)("div",{children:[(0,I.jsx)("div",{className:U.pickerTitle,children:"Reference library"}),(0,I.jsx)("div",{className:U.pickerDescription,children:"Choose a capture to attach."})]}),(0,I.jsx)("button",{type:"button",className:U.pickerClose,title:"Close library",onClick:o,children:(0,I.jsx)(La,{width:14,height:14,"aria-hidden":!0})})]}),(0,I.jsx)("div",{className:"border-b border-loupe-line p-3",children:(0,I.jsx)("input",{className:U.pickerSearch,type:"search",placeholder:"Search library",value:r,autoFocus:!0,onChange:v=>l(v.target.value),onKeyDown:v=>{v.key==="Enter"?(v.preventDefault(),v.stopPropagation()):v.key==="Escape"&&(v.preventDefault(),v.stopPropagation(),o())}})}),d?(0,I.jsx)("div",{className:"rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-loupe-fg",children:d}):null,(0,I.jsx)("div",{className:U.pickerList,children:e.length===0?(0,I.jsx)("div",{className:"rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint",children:"No saved references yet"}):c.length===0?(0,I.jsx)("div",{className:"rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint",children:"No matches"}):c.map(([v,w])=>{let h=n.has(v);return(0,I.jsxs)("section",{children:[(0,I.jsxs)("button",{type:"button",className:U.pickerGroupButton,onClick:()=>m(v),children:[(0,I.jsx)(eo,{width:13,height:13,style:{transform:h?"":"rotate(90deg)",transition:"transform 150ms ease"},"aria-hidden":!0}),(0,I.jsx)("span",{children:v}),(0,I.jsx)("span",{className:U.pickerGroupCount,children:w.length})]}),h?null:(0,I.jsx)("div",{className:U.pickerGrid,children:w.map(p=>(0,I.jsxs)("button",{type:"button",className:U.pickCell,title:p.caption,disabled:s!==null,onClick:()=>void b(p),children:[(0,I.jsx)("div",{className:U.pickImgWrap,children:(0,I.jsx)("img",{className:U.refImg,src:p.thumbUrl,alt:""})}),(0,I.jsx)("div",{className:U.pickText,children:p.caption||p.url||p.id}),(0,I.jsx)("div",{className:U.pickMeta,children:s===p.id?"Attaching...":p.createdAt?FE(p.createdAt):p.url||p.id})]},p.id))})]},v)})})]})})}function EE(){return(0,I.jsxs)("div",{className:U.brandPanel,children:[(0,I.jsxs)("div",{className:U.brandText,children:[(0,I.jsx)("span",{className:U.brandMark,children:(0,I.jsx)(ao,{width:12,height:12,"aria-hidden":!0})}),(0,I.jsx)("span",{children:"Powered by Loupe"})]}),(0,I.jsxs)("button",{type:"button",className:U.github,title:"Open Loupe on GitHub",onClick:e=>{e.preventDefault(),e.stopPropagation(),window.open(Pd,"_blank","noopener,noreferrer")},children:[(0,I.jsx)(Ki,{svg:Od,size:14}),(0,I.jsx)("span",{children:"GitHub"})]})]})}function DE({kind:e}){let t={width:12,height:12,"aria-hidden":!0,style:{flexShrink:0}};switch(e){case"padding":return(0,I.jsx)(qo,{...t});case"spacing":return(0,I.jsx)(ci,{...t});case"typography":return(0,I.jsx)(hi,{...t});case"alignment":return(0,I.jsx)(Li,{...t});case"contrast":return(0,I.jsx)(xi,{...t});case"radius":return(0,I.jsx)(Ii,{...t});case"size":return(0,I.jsx)(wi,{...t})}}function TE({action:e}){let t=e.id.toLowerCase(),a=e.label.toLowerCase();return t==="save"||t==="reference"||a.includes("save")?null:t.includes("claude")||a.includes("claude")?(0,I.jsx)(Ki,{svg:yE,size:15,color:LE}):t.includes("openai")||t.includes("codex")||a.includes("openai")||a.includes("codex")?(0,I.jsx)(Ki,{svg:wE,size:15}):t.includes("copilot")||a.includes("copilot")?(0,I.jsx)(Ki,{svg:SE,size:15}):t==="pi"||a==="pi"?(0,I.jsx)(Ki,{svg:CE,size:15}):null}function Ki({svg:e,size:t,color:a}){return(0,I.jsx)("span",{"aria-hidden":!0,style:{display:"inline-flex",flexShrink:0,color:a,width:t,height:t},dangerouslySetInnerHTML:{__html:PE(e,t)}})}function PE(e,t){return e.replace(/\swidth="[^"]*"/,` width="${t}"`).replace(/\sheight="[^"]*"/,` height="${t}"`)}function OE(e){let t=e.label.replace(/^\s*(?:→|->|➜|›|»)\s*/,"").trim();return BE(t||e.id)}function BE(e){let t=e.search(/[A-Za-z]/);return t<0?e:e.slice(0,t)+e[t].toUpperCase()+e.slice(t+1)}function NE(e,t){let a=sh(t),o=new Map;for(let r of e){let l=zE(r),n=sh(l).includes(a),i=UE(r,a);a&&!n&&!i||(o.get(l)??o.set(l,[]).get(l)).push(r)}return[...o.entries()].map(([r,l])=>[r,[...l].sort((n,i)=>Bd(i)-Bd(n))]).sort(([,r],[,l])=>Bd(l[0])-Bd(r[0]))}function UE(e,t){return t?[e.caption,e.url,e.id].some(a=>sh(a).includes(t)):!0}function zE(e){if(!e.url)return"Unknown";try{return new URL(e.url).hostname.replace(/^www\./,"")||"Unknown"}catch{return"Unknown"}}function sh(e){return(e??"").toLowerCase().trim()}function Bd(e){let t=Date.parse(e?.createdAt??"");return Number.isNaN(t)?0:t}function FE(e){let t=new Date(e);return Number.isNaN(t.getTime())?"":`Captured ${t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}`}function Wi(e){let t=getComputedStyle(e),a=[],o=["paddingTop","paddingRight","paddingBottom","paddingLeft"].map(u=>parseFloat(t[u])||0);o.some(u=>u>0&&u%4!==0)?a.push({kind:"padding",label:"fix padding",detail:`padding ${o.map(u=>`${u}px`).join(" ")} isn't on the 4px grid`}):(LS(o[0],o[2])||LS(o[1],o[3]))&&a.push({kind:"padding",label:"fix padding",detail:`padding looks asymmetric (${o.map(u=>`${u}px`).join(" ")})`});let r=parseFloat(t.gap)||0;r>0&&r%4!==0&&a.push({kind:"spacing",label:"fix spacing",detail:`gap ${r}px isn't on the 4px grid`});let l=parseFloat(t.fontSize)||0,n=parseFloat(t.lineHeight)||0;if(l>0&&l%1!==0)a.push({kind:"typography",label:"fix typography",detail:`font-size ${l}px is fractional`});else if(n>0&&l>0){let u=n/l;(u<1.1||u>2)&&a.push({kind:"typography",label:"fix typography",detail:`line-height ratio ${u.toFixed(2)} looks off for ${l}px text`})}let i=parseFloat(t.borderTopLeftRadius)||0;i>0&&i%2!==0&&i!==9999&&a.push({kind:"radius",label:"fix radius",detail:`border-radius ${i}px is unusual`});let s=qE(t.color,HE(e));return s!==null&&s<4.5&&a.push({kind:"contrast",label:"fix contrast",detail:`text/background contrast ~${s.toFixed(1)}:1 (below 4.5:1)`}),a.push({kind:"alignment",label:"fix alignment",detail:"alignment within the layout looks off"}),a.push({kind:"size",label:"fix size",detail:"the element's size/proportions look off"}),_E(a)}function LS(e,t){return Math.abs(e-t)>1&&(e>0||t>0)}function _E(e){let t=new Set;return e.filter(a=>t.has(a.kind)?!1:(t.add(a.kind),!0))}function HE(e){let t=e;for(;t;){let a=getComputedStyle(t).backgroundColor,o=uh(a);if(o&&o.a>0)return a;t=t.parentElement}return"rgb(255, 255, 255)"}function uh(e){let t=e.match(/rgba?\(([^)]+)\)/);if(!t)return null;let a=t[1].split(",").map(o=>parseFloat(o.trim()));return{r:a[0]??0,g:a[1]??0,b:a[2]??0,a:a[3]??1}}function RS({r:e,g:t,b:a}){let o=r=>{let l=r/255;return l<=.03928?l/12.92:Math.pow((l+.055)/1.055,2.4)};return .2126*o(e)+.7152*o(t)+.0722*o(a)}function qE(e,t){let a=uh(e),o=uh(t);if(!a||!o)return null;let r=RS(a),l=RS(o),[n,i]=r>l?[r,l]:[l,r];return(n+.05)/(i+.05)}var GE=":host{all:initial;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif}",VE="html,body{margin:0!important;width:100%!important;height:100%!important;background:transparent!important;background-color:transparent!important;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif!important;color-scheme:dark}",Ql=class{opts;host=null;root=null;phase="off";start={x:0,y:0};current={x:0,y:0,width:0,height:0};accepted=new Set;offered=[];refs=[];renderNonce=0;hoveredEl=null;mouseDownEl=null;hoverCaptureNonce=0;draft;suppressNextClick=!1;cursorStyle=null;editingDocument=null;panelResizeObserver=null;recording=null;recordStartedAt=0;recordTimer=null;editRoot=null;editPanelEl=null;editNote="";editGroup="";editError=null;editSubmitting=null;editRefsEnabled=!1;editConfig=null;constructor(t){this.opts={actions:[{id:"save",label:"Save to repo"}],groups:[],defaultGroup:"",createGroup:async()=>{},stylesheet:"",mode:"annotate",library:[],resolveLibraryImage:async()=>null,generateId:QE,captureTarget:di,draft:null,onDraftChange:()=>{},onDisable:()=>{},onSelectionCapture:async()=>{},recorder:null,...t},this.draft=this.opts.draft,(!this.opts.actions||this.opts.actions.length===0)&&(this.opts.actions=[{id:"save",label:"Save to repo"}])}get active(){return this.phase!=="off"}setChromeVisible(t){this.host&&(this.host.style.display=t?"":"none")}get selection(){return{rect:{...this.current},devicePixelRatio:window.devicePixelRatio||1}}toggle(){this.active?this.disable():this.enable()}enable(){this.active||(this.mount(),this.bindKeys(),!this.tryRestoreDraft()&&this.arm())}disable(){let t=this.phase!=="off";if(this.phase==="recording")try{this.opts.recorder?.cancel()}catch(a){console.warn("[loupe] recorder cancel failed",a)}this.stopRecordTimer(),this.recording=null,this.phase="off",this.renderNonce++,this.accepted.clear(),this.offered=[],this.editRefsEnabled=!1,this.hoveredEl=null,this.mouseDownEl=null,this.hoverCaptureNonce++,this.draft=null,this.opts.onDraftChange(null),this.setInspectCursor(!1),this.unbindKeys(),this.unmount(),t&&this.opts.onDisable?.()}destroy(){this.disable()}mount(){if(this.host)return;let t=document.createElement("div");t.setAttribute("data-loupe-overlay","");let a=t.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=GE+`
`+this.opts.stylesheet,a.append(o),e3(t),document.body.append(t),this.host=t,this.root=a}unmount(){this.panelResizeObserver?.disconnect(),this.panelResizeObserver=null,this.teardownEditPanel(),this.editingDocument=null,this.host?.remove(),this.host=null,this.root=null}clearLayer(){if(this.panelResizeObserver?.disconnect(),this.panelResizeObserver=null,this.teardownEditPanel(),this.editingDocument=null,!!this.root)for(let t of Array.from(this.root.children))t.tagName!=="STYLE"&&t.remove()}teardownEditPanel(){this.editRoot?.unmount(),this.editRoot=null,this.editPanelEl=null,this.editConfig=null,this.editError=null,this.editSubmitting=null,this.editRefsEnabled=!1}arm(){this.phase="armed",this.setInspectCursor(!0),this.renderArmed()}renderArmed(){if(this.moveHostTo(document.body),this.clearLayer(),!this.root)return;let t=ve("div",{class:U.layer});t.style.pointerEvents="none";let a=ve("div",{class:U.inspectBox,"data-loupe-inspect-box":""}),o=ve("div",{class:U.inspectLabel,"data-loupe-inspect-label":""});a.style.display="none",o.style.display="none";let r=ve("div",{class:U.hint}),l=ve("b",{class:"text-loupe-fg font-semibold"},"Esc");if(this.opts.recorder){let n=ve("b",{class:"text-loupe-fg font-semibold"},"R");r.append("click or drag a region \xB7 press ",n," to record a flow \xB7 ",l," to cancel")}else r.append("click an element or drag a region \xB7 ",l," to cancel");t.append(a,o,r,kS("viewport")),t.addEventListener("mousemove",this.onArmedMouseMove),t.addEventListener("mousedown",this.onMouseDown),this.root.append(t)}onArmedMouseDown=t=>{if(this.eventInOverlay(t)){t.stopImmediatePropagation();return}if(this.active&&this.phase!=="recording"){if(this.phase!=="armed"){t.preventDefault(),t.stopImmediatePropagation();return}this.onMouseDown(t)}};onArmedMouseMoveMaster=t=>{this.phase!=="armed"||this.eventInOverlay(t)||this.onArmedMouseMove(t)};onMouseDown=t=>{t.button===0&&(t.preventDefault(),t.stopImmediatePropagation(),this.mouseDownEl=this.elementAt(t.clientX,t.clientY)??this.hoveredEl,this.phase="dragging",this.setInspectCursor(!0),this.start={x:t.clientX,y:t.clientY},this.current={x:t.clientX,y:t.clientY,width:0,height:0},window.addEventListener("pointermove",this.onMouseMove,!0),window.addEventListener("pointerup",this.onMouseUp,!0),window.addEventListener("mousemove",this.onMouseMove,!0),window.addEventListener("mouseup",this.onMouseUp,!0),this.renderDragging())};onMouseMove=t=>{t.preventDefault(),t.stopImmediatePropagation();let a=Math.min(this.start.x,t.clientX),o=Math.min(this.start.y,t.clientY);this.current={x:a,y:o,width:Math.abs(t.clientX-this.start.x),height:Math.abs(t.clientY-this.start.y)},this.updateMarquee()};onMouseUp=t=>{if(t.preventDefault(),t.stopImmediatePropagation(),window.removeEventListener("pointermove",this.onMouseMove,!0),window.removeEventListener("pointerup",this.onMouseUp,!0),window.removeEventListener("mousemove",this.onMouseMove,!0),window.removeEventListener("mouseup",this.onMouseUp,!0),this.current.width<6||this.current.height<6){let a=this.elementAt(t.clientX,t.clientY)??this.mouseDownEl;if(this.mouseDownEl=null,a){this.current=Fo(a),this.suppressNextClick=!0,window.addEventListener("click",this.onSuppressClick,!0),this.enterEditingForElement(a);return}this.phase="armed",this.renderArmed();return}this.mouseDownEl=null,this.suppressNextClick=!0,window.addEventListener("click",this.onSuppressClick,!0),this.enterEditing()};onSuppressClick=t=>{this.suppressNextClick&&(this.suppressNextClick=!1,window.removeEventListener("click",this.onSuppressClick,!0),t.preventDefault(),t.stopImmediatePropagation())};onArmedMouseMove=t=>{if(this.phase!=="armed")return;let a=this.elementAt(t.clientX,t.clientY);if(a===this.hoveredEl)return;this.hoveredEl=a;let o=++this.hoverCaptureNonce,r=this.root?.querySelector("[data-loupe-inspect-box]"),l=this.root?.querySelector("[data-loupe-inspect-label]");if(!a||!r||!l){this.updateInspectHighlight(null);return}this.updateInspectHighlight({rect:Fo(a),label:this.elementLabel(a)}),Promise.resolve(this.opts.captureTarget(a)).then(n=>{o!==this.hoverCaptureNonce||this.phase!=="armed"||this.hoveredEl!==a||this.updateInspectHighlight({rect:Fo(a),label:YE(n)})}).catch(()=>{})};elementAt(t,a){return this.withHostHidden(()=>{let o=document.elementFromPoint(t,a);return!o||o===document.documentElement||o===document.body||o.closest("[data-loupe-overlay]")?null:o})}elementLabel(t){let a=t.tagName.toLowerCase();return a?`<${a}>`:"element"}updateInspectHighlight(t){let a=this.root?.querySelector("[data-loupe-inspect-box]"),o=this.root?.querySelector("[data-loupe-inspect-label]");if(!a||!o)return;if(!t||t.rect.width<=0||t.rect.height<=0){a.style.display="none",o.style.display="none";return}let{rect:r}=t;Object.assign(a.style,{display:"",left:`${r.x}px`,top:`${r.y}px`,width:`${r.width}px`,height:`${r.height}px`}),o.textContent=t.label,o.style.display="",o.style.left=`${Math.max(8,r.x)}px`,o.style.top=`${ZE(r)}px`;let l=o.getBoundingClientRect().width;o.style.left=`${Math.min(Math.max(8,r.x),window.innerWidth-l-8)}px`}renderDragging(){if(this.clearLayer(),!this.root)return;let t=ve("div",{class:U.layer});t.style.pointerEvents="none",t.append(ve("div",{class:U.dim})),t.append(ve("div",{class:U.marquee,"data-marquee":""})),t.append(kS("viewport")),this.root.append(t),this.updateMarquee()}updateMarquee(){let t=this.root?.querySelector("[data-marquee]");t&&(t.style.left=`${this.current.x}px`,t.style.top=`${this.current.y}px`,t.style.width=`${this.current.width}px`,t.style.height=`${this.current.height}px`)}enterEditing(){this.phase="editing",this.setInspectCursor(!1);let t=this.withHostHidden(()=>Uu(this.current));if(!t){this.phase="armed",this.renderArmed();return}this.accepted.clear(),this.refs=[],this.editNote="",this.editGroup=this.opts.defaultGroup,this.offered=this.withHostHidden(()=>Wi(t)),this.reportDraft(),this.opts.onSelectionCapture(this.selection),this.renderEditing(t,++this.renderNonce)}enterEditingForElement(t){this.phase="editing",this.setInspectCursor(!1),this.hoveredEl=null,this.hoverCaptureNonce++,this.accepted.clear(),this.refs=[],this.editNote="",this.editGroup=this.opts.defaultGroup,this.offered=this.withHostHidden(()=>Wi(t)),this.reportDraft(),this.opts.onSelectionCapture(this.selection),this.renderEditing(t,++this.renderNonce)}async startRecording(){let t=this.opts.recorder;if(!(!t||this.phase!=="armed")){this.phase="recording",this.hoveredEl=null,this.hoverCaptureNonce++,this.setInspectCursor(!1),this.recording=null,this.recordStartedAt=Date.now(),this.renderRecording("starting");try{await t.start()}catch(a){console.error("[loupe] recording failed to start",a),this.phase==="recording"&&this.renderRecording("error",a instanceof Error?a.message:String(a));return}this.phase==="recording"&&(this.recordStartedAt=Date.now(),this.renderRecording("active"),this.startRecordTimer())}}async stopRecording(){let t=this.opts.recorder;if(!t||this.phase!=="recording")return;this.stopRecordTimer(),this.renderRecording("processing");let a;try{a=await t.stop()}catch(o){console.error("[loupe] recording failed to stop",o),this.phase==="recording"&&this.renderRecording("error",o instanceof Error?o.message:String(o));return}this.phase==="recording"&&(this.recording=a,this.enterRecordingEditing())}startRecordTimer(){this.stopRecordTimer(),this.recordTimer=window.setInterval(()=>this.updateRecordTime(),250)}stopRecordTimer(){this.recordTimer!==null&&(window.clearInterval(this.recordTimer),this.recordTimer=null)}updateRecordTime(){let t=this.root?.querySelector("[data-loupe-rec-time]");t&&(t.textContent=PS(Date.now()-this.recordStartedAt))}renderRecording(t,a){if(this.moveHostTo(document.body),this.clearLayer(),!this.root)return;let o=ve("div",{class:U.layer});o.style.pointerEvents="none",o.style.cursor="default";let r=ve("style");r.textContent="@keyframes loupe-rec-pulse{0%,100%{opacity:1}50%{opacity:0.3}}",o.append(r);let l=ve("div");l.style.cssText=JE;let n=ve("span");if(n.style.cssText="width:10px;height:10px;border-radius:9999px;background:#ff5c5c;flex-shrink:0",t==="error"){n.style.background="#ffb020",l.append(n,ve("span",{},a?`recording failed: ${a}`:"recording failed"));let i=MS("Dismiss");i.addEventListener("click",()=>this.disable()),l.append(i)}else if(t==="processing"){let i=ve("span",{class:"loupe-spin"});i.style.cssText="flex-shrink:0",l.append(i,ve("span",{},"processing recording\u2026"))}else if(t==="starting"){let i=ve("span",{class:"loupe-spin"});i.style.cssText="flex-shrink:0",l.append(i,ve("span",{},"starting recording\u2026"))}else{n.style.animation="loupe-rec-pulse 1.2s ease-in-out infinite",l.append(n,ve("span",{"data-loupe-rec-time":""},"0:00"));let i=ve("span",{},"recording this tab");i.style.color="rgba(248,248,248,0.55)",l.append(i);let s=MS("Stop");s.addEventListener("click",()=>void this.stopRecording()),l.append(s);let u=ve("span",{},"R / Esc");u.style.cssText="color:rgba(248,248,248,0.4);font-size:11px",l.append(u)}o.append(l),this.root.append(o)}enterRecordingEditing(){this.phase="editing",this.accepted.clear(),this.refs=[],this.offered=[],this.editNote="",this.editGroup=this.opts.defaultGroup,this.renderRecordingEditing(++this.renderNonce)}renderRecordingEditing(t){if(t!==this.renderNonce||this.phase!=="editing"||(this.moveHostTo(document.body),this.clearLayer(),!this.root))return;let a=this.mountEditingFrame();a&&(this.editRefsEnabled=!1,this.editError=null,this.editSubmitting=null,this.editConfig={variant:"recording",title:"Flow recording",target:null,crumbsText:$E(this.recording),placeholder:"what happens in this flow / what's wrong\u2026",panelWidth:"min(360px, calc(100vw - 24px))",marquee:null,videoUrl:this.recording?.videoDataUrl??null,suggestions:[],showGroup:!0,showRefs:!1,actions:AS(this.opts.actions,"save"),defaultActionId:"save",placement:"centered",onClose:()=>this.disable(),buildAnnotation:()=>this.buildRecordingAnnotation()},this.editRoot=(0,fh.createRoot)(a.body),this.renderEditPanel())}buildRecordingAnnotation(){let t=this.editGroup.trim();return{id:this.opts.generateId(),url:location.href,title:document.title,rect:{x:0,y:0,width:window.innerWidth,height:window.innerHeight},devicePixelRatio:window.devicePixelRatio||1,scroll:{x:window.scrollX,y:window.scrollY},target:{tag:"body",selector:"body",text:"",dataAttributes:{},className:"",componentChain:[]},acceptedSuggestions:[],note:this.editNote.trim(),references:[],createdAt:dh(),group:t||void 0,status:"open",kind:"recording",...this.recording?{recording:this.recording}:{}}}tryRestoreDraft(){if(!this.draft||this.draft.mode!==this.opts.mode)return!1;this.phase="editing",this.current={...this.draft.rect},this.accepted=new Set(this.draft.acceptedKinds),this.refs=this.draft.references.map(a=>({dataUrl:a.dataUrl})),this.editNote=this.draft.note,this.editGroup=this.draft.group??this.opts.defaultGroup;let t=this.withHostHidden(()=>Uu(this.current));return t?(this.offered=this.withHostHidden(()=>Wi(t)),this.renderEditing(t,++this.renderNonce),!0):(this.arm(),!0)}withHostHidden(t){let a=this.host?.style.display??"";this.host&&(this.host.style.display="none");try{return t()}finally{this.host&&(this.host.style.display=a)}}setInspectCursor(t){if(!t){this.cursorStyle?.remove(),this.cursorStyle=null,document.documentElement.removeAttribute("data-loupe-inspecting");return}if(this.cursorStyle)return;let a=document.createElement("style");a.setAttribute("data-loupe-cursor",""),a.textContent="html[data-loupe-inspecting], html[data-loupe-inspecting] * { cursor: crosshair !important; }",document.documentElement.setAttribute("data-loupe-inspecting",""),document.head.append(a),this.cursorStyle=a}async renderEditing(t,a){let o=await this.opts.captureTarget(t);if(a!==this.renderNonce||this.phase!=="editing"||(this.moveHostTo(document.body),this.clearLayer(),!this.root))return;let r=this.mountEditingFrame();if(!r)return;let l=this.opts.mode==="reference";this.editRefsEnabled=!l,this.editError=null,this.editSubmitting=null,this.editConfig={variant:l?"reference":"annotate",title:l?document.title||location.host:TS(o.componentChain.map(n=>n.name),o.tag),target:l?null:o,crumbsText:l?`reference \xB7 ${location.host}`:void 0,placeholder:l?"what this shows / what to match\u2026":"what's wrong / what to change\u2026",marquee:{...this.current},suggestions:l?[]:this.offered,showGroup:!l,showRefs:!l,actions:l?[{id:"reference",label:"Save to library",hint:"save this capture as a reference"}]:AS(this.opts.actions,"save"),defaultActionId:l?"reference":"save",placement:"anchored",onClose:()=>{this.draft=null,this.opts.onDraftChange(null),this.arm()},buildAnnotation:()=>this.buildAnnotation(o)},this.editRoot=(0,fh.createRoot)(r.body),this.renderEditPanel(),this.reportDraft()}renderEditPanel(){if(!this.editRoot||!this.editConfig||!this.editingDocument)return;let t=this.editConfig,a={variant:t.variant,title:t.title,target:t.target,crumbsText:t.crumbsText,placeholder:t.placeholder,panelWidth:t.panelWidth,marquee:t.marquee,videoUrl:t.videoUrl,screenshotUrl:t.screenshotUrl,note:this.editNote,onNoteChange:o=>{this.editNote=o,this.reportDraft(),this.renderEditPanel()},showGroup:t.showGroup,groups:this.opts.groups,group:this.editGroup,onGroupChange:o=>{this.editGroup=o,this.reportDraft(),this.renderEditPanel()},onCreateGroup:async o=>{this.opts.groups.some(l=>l.trim().toLowerCase()===o.toLowerCase())||(await this.opts.createGroup(o),this.opts.groups=[...this.opts.groups,o])},suggestions:t.suggestions,acceptedKinds:[...this.accepted],onToggleSuggestion:o=>{this.accepted.has(o)?this.accepted.delete(o):this.accepted.add(o),this.reportDraft(),this.renderEditPanel()},showRefs:t.showRefs,refs:this.refs.map(o=>({dataUrl:o.dataUrl})),onAddFiles:o=>{for(let r of o)this.addRef(r)},onRemoveRef:o=>{this.refs.splice(o,1),this.reportDraft(),this.renderEditPanel()},library:this.opts.library,resolveLibraryImage:this.opts.resolveLibraryImage,onAttachLibraryImage:o=>this.addRefDataUrl(o),actions:t.actions,defaultActionId:t.defaultActionId,submittingActionId:this.editSubmitting,onSubmit:o=>this.editSubmitAction(o),error:this.editError,onClose:t.onClose,panelRef:this.handlePanelRef,portalContainer:this.editingDocument.body};this.editRoot.render(SS(a))}handlePanelRef=t=>{this.editPanelEl=t,!(!t||!this.editConfig)&&(this.editConfig.placement==="centered"?this.trackCenteredPanelPlacement(t):this.trackPanelPlacement(t))};async editSubmitAction(t){if(this.editSubmitting||!this.editConfig)return;this.editSubmitting=t,this.editError=null,this.renderEditPanel();let a=this.editConfig.buildAnnotation(),o=this.editConfig.variant==="recording";try{await this.opts.onSubmit(a,[t]),this.disable()}catch(r){this.editSubmitting=null,this.editError=r instanceof Error?r.message:String(r),this.renderEditPanel(),console.error(o?"[loupe] recording action failed":"[loupe] action failed",r)}}trackPanelPlacement(t){this.panelResizeObserver?.disconnect();let a=()=>{!t.isConnected||this.phase!=="editing"||KE(t,this.current)};a(),requestAnimationFrame(a),this.panelResizeObserver=new ResizeObserver(a),this.panelResizeObserver.observe(t)}trackCenteredPanelPlacement(t){this.panelResizeObserver?.disconnect();let a=()=>{!t.isConnected||this.phase!=="editing"||WE(t)};a(),requestAnimationFrame(a),this.panelResizeObserver=new ResizeObserver(a),this.panelResizeObserver.observe(t)}async addRef(t){t.type.startsWith("image/")&&this.addRefDataUrl(await l3(t))}addRefDataUrl(t){this.refs.push({dataUrl:t}),this.reportDraft(),this.renderEditPanel()}buildAnnotation(t){let a=this.editGroup.trim();return{id:this.opts.generateId(),url:location.href,title:document.title,rect:{...this.current},devicePixelRatio:window.devicePixelRatio||1,scroll:{x:window.scrollX,y:window.scrollY},target:t,acceptedSuggestions:this.offered.filter(o=>this.accepted.has(o.kind)),note:this.editNote.trim(),references:this.refs.map(o=>({dataUrl:o.dataUrl})),createdAt:dh(),group:a||void 0,status:"open"}}reportDraft(){if(this.phase!=="editing")return;let t=this.editNote.trim(),a=this.editGroup.trim();this.draft={mode:this.opts.mode,url:location.href,title:document.title,rect:{...this.current},devicePixelRatio:window.devicePixelRatio||1,scroll:{x:window.scrollX,y:window.scrollY},note:t,group:a||void 0,acceptedKinds:[...this.accepted],references:this.refs.map(o=>({dataUrl:o.dataUrl})),updatedAt:dh()},this.opts.onDraftChange(this.draft)}bindKeys(){window.addEventListener("keydown",this.onKeyMaster,!0),window.addEventListener("mousemove",this.onArmedMouseMoveMaster,!0),window.addEventListener("mousedown",this.onArmedMouseDown,!0),window.addEventListener("pointerdown",this.onOverlayPointerStartMaster,!0),window.addEventListener("touchstart",this.onOverlayPointerStartMaster,!0),window.addEventListener("click",this.onOverlayClickMaster,!0);for(let t of IS)window.addEventListener(t,this.onEventMaster,!0)}unbindKeys(){window.removeEventListener("keydown",this.onKeyMaster,!0),window.removeEventListener("mousemove",this.onArmedMouseMoveMaster,!0),window.removeEventListener("mousedown",this.onArmedMouseDown,!0),window.removeEventListener("pointerdown",this.onOverlayPointerStartMaster,!0),window.removeEventListener("touchstart",this.onOverlayPointerStartMaster,!0),window.removeEventListener("click",this.onOverlayClickMaster,!0),window.removeEventListener("pointermove",this.onMouseMove,!0),window.removeEventListener("pointerup",this.onMouseUp,!0),window.removeEventListener("mousemove",this.onMouseMove,!0),window.removeEventListener("mouseup",this.onMouseUp,!0),window.removeEventListener("click",this.onSuppressClick,!0);for(let t of IS)window.removeEventListener(t,this.onEventMaster,!0)}eventInOverlay(t){return this.host!==null&&t.composedPath().includes(this.host)}onKeyMaster=t=>{if(t.key==="Escape"&&this.active){t.preventDefault(),t.stopImmediatePropagation(),this.disable();return}if((t.key==="r"||t.key==="R")&&this.opts.recorder&&!t.metaKey&&!t.ctrlKey&&!t.altKey&&!ES(t)){if(this.phase==="armed"){t.preventDefault(),t.stopImmediatePropagation(),this.startRecording();return}if(this.phase==="recording"){t.preventDefault(),t.stopImmediatePropagation(),this.stopRecording();return}}this.eventInOverlay(t)&&t.stopImmediatePropagation()};moveHostTo(t){!this.host||this.host.parentElement===t||t.append(this.host)}mountEditingFrame(){if(!this.root)return null;let t=document.createElement("iframe");t.setAttribute("title","Loupe annotation editor"),t.setAttribute("aria-label","Loupe annotation editor"),t.setAttribute("allowtransparency","true"),t.style.cssText=["position:fixed","inset:0","width:100vw","height:100vh","border:0","background:transparent!important","background-color:transparent!important","z-index:2147483647","color-scheme:dark"].join(";"),this.root.append(t);let a=t.contentDocument;if(!a)return null;a.open(),a.write("<!doctype html><html><head><title>Loupe editor</title></head><body></body></html>"),a.close(),a.documentElement.classList.add("dark");let o=a.createElement("style");return o.textContent=`${this.opts.stylesheet}
${VE}`,a.head.append(o),a.documentElement.style.setProperty("background","transparent","important"),a.body.style.setProperty("background","transparent","important"),a.defaultView?.addEventListener("keydown",this.onFrameKeyDown,!0),a.defaultView?.addEventListener("paste",this.onFramePaste,!0),this.editingDocument=a,a}onFrameKeyDown=t=>{t.key!=="Escape"||!this.active||(t.preventDefault(),t.stopImmediatePropagation(),this.disable())};onFramePaste=t=>{this.handlePaste(t)};onEventMaster=t=>{this.eventInOverlay(t)&&((t.type.startsWith("focus")||t.type==="blur")&&this.debugEvent(`window:${t.type}`,t),t.stopImmediatePropagation(),t.type==="paste"&&this.handlePaste(t))};onOverlayPointerStartMaster=t=>{if(this.active){if(this.eventInOverlay(t)){t.stopImmediatePropagation(),t3(t);return}this.phase!=="recording"&&(t.preventDefault(),t.stopImmediatePropagation(),!(this.phase!=="armed"||typeof PointerEvent>"u"||!(t instanceof PointerEvent)||t.button!==0)&&this.onMouseDown(t))}};onOverlayClickMaster=t=>{!this.active||!this.eventInOverlay(t)||(t.stopImmediatePropagation(),a3(t))};handlePaste(t){let a=Array.from(t.clipboardData?.items??[]).filter(o=>o.type.startsWith("image/"));if(!(a.length===0||!this.editRefsEnabled)){t.preventDefault();for(let o of a){let r=o.getAsFile();r&&this.addRef(r)}}}debugEvent(t,a){if(!r3())return;let o=a.composedPath(),r=o[0];console.info("[loupe:event]",t,{type:a.type,eventPhase:a.eventPhase,defaultPrevented:a.defaultPrevented,target:Zi(r),retargetedTarget:Zi(a.target),path:o.slice(0,8).map(Zi),documentActive:Zi(document.activeElement),shadowActive:Zi(this.root?.activeElement??null),isTextEntry:ES(a)})}},IS=["keyup","keypress","paste","copy","cut","focusin","focusout","blur"],XE=["pointerdown","pointerup","mousedown","mouseup","click","dblclick","touchstart","touchend","focusin","focusout","blur"];function ve(e,t={},a){let o=document.createElement(e);for(let[r,l]of Object.entries(t))o.setAttribute(r,l);return a!==void 0&&(o.textContent=a),o}function kS(e){let t=ve("div",{class:e==="viewport"?U.brandViewport:U.brandPanel}),a=ve("div",{class:U.brandText}),o=ve("span",{class:U.brandMark});o.append(DS(ef,12)),a.append(o,ve("span",{},"Powered by Loupe"));let r=ve("button",{class:U.github,type:"button",title:"Open Loupe on GitHub"});return r.append(jE(Od,14),ve("span",{},"GitHub")),r.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),window.open(Pd,"_blank","noopener,noreferrer")}),t.append(a,r),t}function DS(e,t){let a=Jd(e,{width:String(t),height:String(t),"aria-hidden":"true",focusable:"false","stroke-width":"2.2"});return a.style.flexShrink="0",a}function jE(e,t){let o=new DOMParser().parseFromString(e.trim(),"image/svg+xml").documentElement;return o?(o.setAttribute("width",String(t)),o.setAttribute("height",String(t)),o.setAttribute("aria-hidden","true"),o.setAttribute("focusable","false"),o.style.flexShrink="0",o):DS($d,t)}function AS(e,t){let a=e.find(r=>r.id===t),o=e.filter(r=>r.id!==t);return a?[...o,a]:o}function KE(e,t){let o=e.ownerDocument.defaultView,r=o?.innerWidth||window.innerWidth,l=o?.innerHeight||window.innerHeight,n=e.offsetWidth||340,i=Math.max(160,l-12*2),s=t.x+t.width+12;if(s+n+12>r){let v=t.x-n-12;s=v>=12?v:Nd(t.x,12,r-n-12)}let u=e.scrollHeight||e.offsetHeight||300,d=Math.min(u,i),f=t.y+d+12<=l,c=t.y;if(!f){let v=t.y-d-12;c=v>=12?v:Nd(t.y+t.height-d,12,l-d-12)}u>d?(e.style.maxHeight=`${d}px`,e.style.overflowY="auto"):(e.style.maxHeight="",e.style.overflowY="visible"),e.style.left=`${s}px`,e.style.top=`${c}px`;let m=e.offsetWidth||n,b=e.offsetHeight||d;c+b+12>l&&(e.style.top=`${Nd(l-b-12,12,l-b-12)}px`),s+m+12>r&&(e.style.left=`${Nd(r-m-12,12,r-m-12)}px`)}function WE(e){let a=e.ownerDocument.defaultView,o=a?.innerWidth||window.innerWidth,r=a?.innerHeight||window.innerHeight,l=Math.max(180,r-12*2),n=e.scrollHeight||e.offsetHeight||300,i=Math.min(n,l),s=e.offsetWidth||360;e.style.position="fixed",e.style.left=`${Math.round(Math.max(12,(o-s)/2))}px`,e.style.top=`${Math.round(Math.max(12,(r-i)/2))}px`,e.style.transform="none",e.style.maxHeight=`${i}px`,e.style.overflowY=n>i?"auto":"visible"}function Nd(e,t,a){return Math.min(Math.max(e,t),Math.max(t,a))}function ZE(e){return e.y>=30?e.y-22-4:Math.min(window.innerHeight-22-8,e.y+e.height+4)}function YE(e){return TS(e.componentChain.map(t=>t.name),e.tag)}function TS(e,t){return e.length===0?`<${t}>`:e.slice(0,2).reverse().join(" \u203A ")}function QE(){return Math.floor(Math.random()*1048575).toString(16).padStart(5,"0")}function dh(){return new Date().toISOString()}var JE=["position:fixed","bottom:18px","left:50%","transform:translateX(-50%)","display:flex","align-items:center","gap:10px","max-width:calc(100vw - 24px)","box-sizing:border-box","flex-wrap:wrap","justify-content:center","padding:8px 14px","border-radius:9999px","background:#101010","color:#f8f8f8","font:13px ui-sans-serif,system-ui,sans-serif","box-shadow:0 12px 40px rgba(0,0,0,0.5)","border:1px solid rgba(255,255,255,0.1)","pointer-events:auto","z-index:2147483647"].join(";");function MS(e){let t=ve("button",{type:"button"},e);return t.style.cssText=["appearance:none","border:0","border-radius:9999px","padding:4px 12px","background:#f8f8f8","color:#101010","font:600 12px ui-sans-serif,system-ui,sans-serif","cursor:pointer"].join(";"),t}function PS(e){let t=Math.max(0,Math.floor(e/1e3)),a=Math.floor(t/60),o=t%60;return`${a}:${o.toString().padStart(2,"0")}`}function $E(e){if(!e)return"flow recording";let t=e.errors.length+e.network.filter(o=>o.error||(o.status??0)>=400).length,a=[PS(e.durationMs),`${e.console.length} console`,`${e.network.length} request${e.network.length===1?"":"s"}`];return t>0&&a.push(`${t} error${t===1?"":"s"}`),a.join(" \xB7 ")}function e3(e){let t=a=>a.stopPropagation();for(let a of["input","beforeinput",...XE,"auxclick","contextmenu"])e.addEventListener(a,t)}function t3(e){e.composedPath().find(a=>a instanceof HTMLElement?a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a instanceof HTMLSelectElement||a.isContentEditable?!0:a.tabIndex>=0:!1)?.focus({preventScroll:!0})}function a3(e){e.composedPath().find(a=>a instanceof HTMLElement?a instanceof HTMLButtonElement||a instanceof HTMLAnchorElement?!0:a instanceof HTMLInputElement?["button","checkbox","radio","file","submit"].includes(a.type):!1:!1)?.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!1,button:e.button,clientX:e.clientX,clientY:e.clientY}))}function ES(e){return o3(e)!==null}function o3(e){let t=e.composedPath()[0];return t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement&&!["button","checkbox","color","file","hidden","image","radio","range","reset","submit"].includes(t.type)||t instanceof HTMLElement&&t.isContentEditable?t:null}function r3(){try{return localStorage.getItem("loupe:debug")!=="0"}catch{return!0}}function Zi(e){if(!e)return"null";if(e===window)return"window";if(e instanceof ShadowRoot)return"#shadow-root";if(!(e instanceof Element))return e.constructor?.name??String(e);let t=[e.tagName.toLowerCase()];return e.id&&t.push(`#${e.id}`),e.getAttribute("data-loupe-overlay")!==null&&t.push("[data-loupe-overlay]"),e instanceof HTMLTextAreaElement&&t.push("textarea"),e instanceof HTMLInputElement&&t.push(`input:${e.type}`),t.join("")}function l3(e){return new Promise((t,a)=>{let o=new FileReader;o.onload=()=>t(o.result),o.onerror=()=>a(o.error),o.readAsDataURL(e)})}function Yi(e){let t=BS(e.target),a=e.target.elementRect;if(t&&a){let l=Fo(t);return{x:l.x+(e.rect.x-a.x),y:l.y+(e.rect.y-a.y),width:e.rect.width,height:e.rect.height,anchored:!0}}let o=e.rect.x+(e.scroll?.x??0),r=e.rect.y+(e.scroll?.y??0);return{x:o-window.scrollX,y:r-window.scrollY,width:e.rect.width,height:e.rect.height,anchored:!1}}function BS(e){let t=OS(e.selector);if(t.length===1)return t[0];if(t.length>1)return s3(t,e);if(!e.tag)return null;let a=OS(e.tag).slice(0,n3);if(a.length===0)return null;let o=a.map(r=>({el:r,score:NS(r,e)})).sort((r,l)=>l.score-r.score)[0];return o.score>=i3?o.el:null}var n3=400,i3=2;function OS(e){if(!e)return[];let t;try{t=document.querySelectorAll(e)}catch{return[]}let a=[];for(let o of t)o===document.documentElement||o===document.body||o.closest("[data-loupe-overlay]")||a.push(o);return a}function s3(e,t){return e.map(a=>({el:a,score:NS(a,t)})).sort((a,o)=>o.score-a.score)[0].el}function NS(e,t){let a=0;if(e.tagName.toLowerCase()===t.tag&&(a+=1),t.text){let o=(e.textContent??"").replace(/\s+/g," ").trim().slice(0,200);o===t.text?a+=3:o&&(o.includes(t.text)||t.text.includes(o))&&(a+=1)}for(let[o,r]of Object.entries(t.dataAttributes))e.getAttribute(o)===r&&(a+=2);if(t.className&&typeof e.className=="string"){let o=new Set(t.className.split(/\s+/).filter(Boolean)),r=new Set(e.className.split(/\s+/).filter(Boolean)),l=0;for(let n of o)r.has(n)&&l++;o.size>0&&(a+=l/o.size*2)}return a}var US=`/*! tailwindcss v4.3.1 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: "Geist Variable", ui-sans-serif, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
    --color-red-100: oklch(93.6% 0.032 17.717);
    --color-red-400: oklch(70.4% 0.191 22.216);
    --color-red-500: oklch(63.7% 0.237 25.331);
    --color-amber-200: oklch(92.4% 0.12 95.746);
    --color-amber-300: oklch(87.9% 0.169 91.605);
    --color-amber-400: oklch(82.8% 0.189 84.429);
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-md: 28rem;
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-base: 1rem;
    --text-base--line-height: calc(1.5 / 1);
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --radius-md: calc(var(--radius) * 0.8);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --blur-xs: 4px;
    --blur-2xl: 40px;
    --aspect-video: 16 / 9;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: "Geist Variable", ui-sans-serif, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
    --default-mono-font-family: "Geist Mono Variable", ui-monospace, SFMono-Regular, monospace;
    --color-foreground: var(--foreground);
    --color-background: var(--background);
    --color-loupe-bg: #050505;
    --color-loupe-panel: #101010;
    --color-loupe-elev: #1a1a1a;
    --color-loupe-line: rgba(255, 255, 255, 0.08);
    --color-loupe-line-strong: rgba(255, 255, 255, 0.14);
    --color-loupe-fg: #f8f8f8;
    --color-loupe-muted: #b5b5b5;
    --color-loupe-faint: #777777;
    --color-loupe-accent: #f8f8f8;
    --radius-loupe: 12px;
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .pointer-events-auto {
    pointer-events: auto;
  }
  .pointer-events-none {
    pointer-events: none;
  }
  .visible {
    visibility: visible;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border-width: 0;
  }
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .relative {
    position: relative;
  }
  .inset-0 {
    inset: 0;
  }
  .top-0 {
    top: 0;
  }
  .top-0\\.5 {
    top: calc(var(--spacing) * 0.5);
  }
  .top-1\\/2 {
    top: calc(1 / 2 * 100%);
  }
  .top-2 {
    top: calc(var(--spacing) * 2);
  }
  .top-3 {
    top: calc(var(--spacing) * 3);
  }
  .top-4 {
    top: calc(var(--spacing) * 4);
  }
  .top-\\[calc\\(100\\%\\+4px\\)\\] {
    top: calc(100% + 4px);
  }
  .right-0 {
    right: 0;
  }
  .right-0\\.5 {
    right: calc(var(--spacing) * 0.5);
  }
  .right-2 {
    right: calc(var(--spacing) * 2);
  }
  .right-3 {
    right: calc(var(--spacing) * 3);
  }
  .right-4 {
    right: calc(var(--spacing) * 4);
  }
  .bottom-0 {
    bottom: 0;
  }
  .bottom-3 {
    bottom: calc(var(--spacing) * 3);
  }
  .left-0 {
    left: 0;
  }
  .left-1\\/2 {
    left: calc(1 / 2 * 100%);
  }
  .left-2 {
    left: calc(var(--spacing) * 2);
  }
  .left-2\\.5 {
    left: calc(var(--spacing) * 2.5);
  }
  .left-3 {
    left: calc(var(--spacing) * 3);
  }
  .isolate {
    isolation: isolate;
  }
  .z-10 {
    z-index: 10;
  }
  .z-50 {
    z-index: 50;
  }
  .z-\\[1\\] {
    z-index: 1;
  }
  .z-\\[2147483644\\] {
    z-index: 2147483644;
  }
  .z-\\[2147483645\\] {
    z-index: 2147483645;
  }
  .z-\\[2147483646\\] {
    z-index: 2147483646;
  }
  .z-\\[2147483647\\] {
    z-index: 2147483647;
  }
  .container {
    width: 100%;
    @media (width >= 40rem) {
      max-width: 40rem;
    }
    @media (width >= 48rem) {
      max-width: 48rem;
    }
    @media (width >= 64rem) {
      max-width: 64rem;
    }
    @media (width >= 80rem) {
      max-width: 80rem;
    }
    @media (width >= 96rem) {
      max-width: 96rem;
    }
  }
  .-mx-1 {
    margin-inline: calc(var(--spacing) * -1);
  }
  .mx-2 {
    margin-inline: calc(var(--spacing) * 2);
  }
  .mx-auto {
    margin-inline: auto;
  }
  .my-1 {
    margin-block: var(--spacing);
  }
  .mt-0\\.5 {
    margin-top: calc(var(--spacing) * 0.5);
  }
  .mt-1 {
    margin-top: var(--spacing);
  }
  .mt-1\\.5 {
    margin-top: calc(var(--spacing) * 1.5);
  }
  .mt-2 {
    margin-top: calc(var(--spacing) * 2);
  }
  .mt-2\\.5 {
    margin-top: calc(var(--spacing) * 2.5);
  }
  .mt-3 {
    margin-top: calc(var(--spacing) * 3);
  }
  .mt-4 {
    margin-top: calc(var(--spacing) * 4);
  }
  .mt-6 {
    margin-top: calc(var(--spacing) * 6);
  }
  .mb-1 {
    margin-bottom: var(--spacing);
  }
  .mb-1\\.5 {
    margin-bottom: calc(var(--spacing) * 1.5);
  }
  .mb-2 {
    margin-bottom: calc(var(--spacing) * 2);
  }
  .mb-3 {
    margin-bottom: calc(var(--spacing) * 3);
  }
  .mb-5 {
    margin-bottom: calc(var(--spacing) * 5);
  }
  .-ml-0\\.5 {
    margin-left: calc(var(--spacing) * -0.5);
  }
  .ml-auto {
    margin-left: auto;
  }
  .box-border {
    box-sizing: border-box;
  }
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .field-sizing-content {
    field-sizing: content;
  }
  .aspect-\\[16\\/9\\] {
    aspect-ratio: 16/9;
  }
  .aspect-video {
    aspect-ratio: var(--aspect-video);
  }
  .size-3\\.5 {
    width: calc(var(--spacing) * 3.5);
    height: calc(var(--spacing) * 3.5);
  }
  .size-4 {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
  .size-6 {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
  }
  .size-8 {
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
  }
  .size-9 {
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
  }
  .size-10 {
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 10);
  }
  .h-1\\.5 {
    height: calc(var(--spacing) * 1.5);
  }
  .h-3 {
    height: calc(var(--spacing) * 3);
  }
  .h-3\\.5 {
    height: calc(var(--spacing) * 3.5);
  }
  .h-4 {
    height: calc(var(--spacing) * 4);
  }
  .h-5 {
    height: calc(var(--spacing) * 5);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
  }
  .h-7 {
    height: calc(var(--spacing) * 7);
  }
  .h-8 {
    height: calc(var(--spacing) * 8);
  }
  .h-9 {
    height: calc(var(--spacing) * 9);
  }
  .h-10 {
    height: calc(var(--spacing) * 10);
  }
  .h-11 {
    height: calc(var(--spacing) * 11);
  }
  .h-12 {
    height: calc(var(--spacing) * 12);
  }
  .h-16 {
    height: calc(var(--spacing) * 16);
  }
  .h-\\[15px\\] {
    height: 15px;
  }
  .h-full {
    height: 100%;
  }
  .h-px {
    height: 1px;
  }
  .max-h-\\(--radix-dropdown-menu-content-available-height\\) {
    max-height: var(--radix-dropdown-menu-content-available-height);
  }
  .max-h-\\(--radix-select-content-available-height\\) {
    max-height: var(--radix-select-content-available-height);
  }
  .max-h-40 {
    max-height: calc(var(--spacing) * 40);
  }
  .max-h-72 {
    max-height: calc(var(--spacing) * 72);
  }
  .max-h-96 {
    max-height: calc(var(--spacing) * 96);
  }
  .max-h-\\[min\\(760px\\,calc\\(100vh-2rem\\)\\)\\] {
    max-height: min(760px, calc(100vh - 2rem));
  }
  .max-h-full {
    max-height: 100%;
  }
  .min-h-12 {
    min-height: calc(var(--spacing) * 12);
  }
  .min-h-16 {
    min-height: calc(var(--spacing) * 16);
  }
  .min-h-28 {
    min-height: calc(var(--spacing) * 28);
  }
  .min-h-\\[64px\\] {
    min-height: 64px;
  }
  .w-1\\.5 {
    width: calc(var(--spacing) * 1.5);
  }
  .w-3 {
    width: calc(var(--spacing) * 3);
  }
  .w-3\\.5 {
    width: calc(var(--spacing) * 3.5);
  }
  .w-4 {
    width: calc(var(--spacing) * 4);
  }
  .w-5 {
    width: calc(var(--spacing) * 5);
  }
  .w-6 {
    width: calc(var(--spacing) * 6);
  }
  .w-7 {
    width: calc(var(--spacing) * 7);
  }
  .w-12 {
    width: calc(var(--spacing) * 12);
  }
  .w-14 {
    width: calc(var(--spacing) * 14);
  }
  .w-48 {
    width: calc(var(--spacing) * 48);
  }
  .w-52 {
    width: calc(var(--spacing) * 52);
  }
  .w-\\[15px\\] {
    width: 15px;
  }
  .w-\\[190px\\] {
    width: 190px;
  }
  .w-\\[220px\\] {
    width: 220px;
  }
  .w-\\[240px\\] {
    width: 240px;
  }
  .w-\\[420px\\] {
    width: 420px;
  }
  .w-\\[min\\(340px\\,calc\\(100vw-24px\\)\\)\\] {
    width: min(340px, calc(100vw - 24px));
  }
  .w-\\[min\\(920px\\,calc\\(100vw-2rem\\)\\)\\] {
    width: min(920px, calc(100vw - 2rem));
  }
  .w-auto {
    width: auto;
  }
  .w-fit {
    width: fit-content;
  }
  .w-full {
    width: 100%;
  }
  .max-w-\\[460px\\] {
    max-width: 460px;
  }
  .max-w-\\[calc\\(100\\%-2rem\\)\\] {
    max-width: calc(100% - 2rem);
  }
  .max-w-\\[min\\(360px\\,calc\\(100vw-24px\\)\\)\\] {
    max-width: min(360px, calc(100vw - 24px));
  }
  .max-w-full {
    max-width: 100%;
  }
  .min-w-0 {
    min-width: 0;
  }
  .min-w-4 {
    min-width: calc(var(--spacing) * 4);
  }
  .min-w-5 {
    min-width: calc(var(--spacing) * 5);
  }
  .min-w-6 {
    min-width: calc(var(--spacing) * 6);
  }
  .min-w-36 {
    min-width: calc(var(--spacing) * 36);
  }
  .min-w-40 {
    min-width: calc(var(--spacing) * 40);
  }
  .min-w-\\[132px\\] {
    min-width: 132px;
  }
  .flex-1 {
    flex: 1;
  }
  .shrink {
    flex-shrink: 1;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .grow {
    flex-grow: 1;
  }
  .basis-full {
    flex-basis: 100%;
  }
  .origin-\\(--radix-dropdown-menu-content-transform-origin\\) {
    transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  }
  .origin-\\(--radix-select-content-transform-origin\\) {
    transform-origin: var(--radix-select-content-transform-origin);
  }
  .-translate-x-1\\/2 {
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-1\\/2 {
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .rotate-90 {
    rotate: 90deg;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .animate-none\\! {
    animation: none !important;
  }
  .cursor-crosshair {
    cursor: crosshair;
  }
  .cursor-default {
    cursor: default;
  }
  .cursor-ew-resize {
    cursor: ew-resize;
  }
  .cursor-grab {
    cursor: grab;
  }
  .cursor-nesw-resize {
    cursor: nesw-resize;
  }
  .cursor-ns-resize {
    cursor: ns-resize;
  }
  .cursor-nwse-resize {
    cursor: nwse-resize;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .resize {
    resize: both;
  }
  .resize-y {
    resize: vertical;
  }
  .scroll-my-1 {
    scroll-margin-block: var(--spacing);
  }
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .place-items-center {
    place-items: center;
  }
  .items-center {
    align-items: center;
  }
  .items-start {
    align-items: flex-start;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .gap-0\\.5 {
    gap: calc(var(--spacing) * 0.5);
  }
  .gap-1 {
    gap: var(--spacing);
  }
  .gap-1\\.5 {
    gap: calc(var(--spacing) * 1.5);
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3);
  }
  .gap-6 {
    gap: calc(var(--spacing) * 6);
  }
  .space-y-1 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(var(--spacing) * var(--tw-space-y-reverse));
      margin-block-end: calc(var(--spacing) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-1\\.5 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-2 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-3 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-4 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-x-hidden {
    overflow-x: hidden;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .rounded-2xl {
    border-radius: calc(var(--radius) * 1.8);
  }
  .rounded-4xl {
    border-radius: calc(var(--radius) * 2.6);
  }
  .rounded-\\[4px\\] {
    border-radius: 4px;
  }
  .rounded-\\[min\\(var\\(--radius-md\\)\\,8px\\)\\] {
    border-radius: min(var(--radius-md), 8px);
  }
  .rounded-\\[min\\(var\\(--radius-md\\)\\,10px\\)\\] {
    border-radius: min(var(--radius-md), 10px);
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius);
  }
  .rounded-loupe {
    border-radius: var(--radius-loupe);
  }
  .rounded-md {
    border-radius: calc(var(--radius) * 0.8);
  }
  .rounded-sm {
    border-radius: calc(var(--radius) * 0.6);
  }
  .rounded-xl {
    border-radius: calc(var(--radius) * 1.4);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-t {
    border-top-style: var(--tw-border-style);
    border-top-width: 1px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .border-dashed {
    --tw-border-style: dashed;
    border-style: dashed;
  }
  .border-amber-200\\/80 {
    border-color: color-mix(in srgb, oklch(92.4% 0.12 95.746) 80%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-amber-200) 80%, transparent);
    }
  }
  .border-amber-300\\/90 {
    border-color: color-mix(in srgb, oklch(87.9% 0.169 91.605) 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-amber-300) 90%, transparent);
    }
  }
  .border-border {
    border-color: var(--border);
  }
  .border-current {
    border-color: currentcolor;
  }
  .border-input {
    border-color: var(--input);
  }
  .border-loupe-accent\\/25 {
    border-color: color-mix(in srgb, #f8f8f8 25%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-loupe-accent) 25%, transparent);
    }
  }
  .border-loupe-accent\\/80 {
    border-color: color-mix(in srgb, #f8f8f8 80%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-loupe-accent) 80%, transparent);
    }
  }
  .border-loupe-accent\\/90 {
    border-color: color-mix(in srgb, #f8f8f8 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-loupe-accent) 90%, transparent);
    }
  }
  .border-loupe-line {
    border-color: var(--color-loupe-line);
  }
  .border-loupe-line-strong {
    border-color: var(--color-loupe-line-strong);
  }
  .border-loupe-line\\/70 {
    border-color: color-mix(in srgb, rgba(255, 255, 255, 0.08) 70%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-loupe-line) 70%, transparent);
    }
  }
  .border-red-400\\/25 {
    border-color: color-mix(in srgb, oklch(70.4% 0.191 22.216) 25%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-red-400) 25%, transparent);
    }
  }
  .border-transparent {
    border-color: transparent;
  }
  .border-white\\/15 {
    border-color: color-mix(in srgb, #fff 15%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-white) 15%, transparent);
    }
  }
  .border-white\\/20 {
    border-color: color-mix(in srgb, #fff 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-white) 20%, transparent);
    }
  }
  .border-white\\/25 {
    border-color: color-mix(in srgb, #fff 25%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-white) 25%, transparent);
    }
  }
  .border-white\\/35 {
    border-color: color-mix(in srgb, #fff 35%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-white) 35%, transparent);
    }
  }
  .bg-amber-300 {
    background-color: var(--color-amber-300);
  }
  .bg-amber-300\\/15 {
    background-color: color-mix(in srgb, oklch(87.9% 0.169 91.605) 15%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-amber-300) 15%, transparent);
    }
  }
  .bg-background {
    background-color: var(--background);
  }
  .bg-black {
    background-color: var(--color-black);
  }
  .bg-black\\/10 {
    background-color: color-mix(in srgb, #000 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 10%, transparent);
    }
  }
  .bg-black\\/25 {
    background-color: color-mix(in srgb, #000 25%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 25%, transparent);
    }
  }
  .bg-black\\/40 {
    background-color: color-mix(in srgb, #000 40%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 40%, transparent);
    }
  }
  .bg-black\\/70 {
    background-color: color-mix(in srgb, #000 70%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 70%, transparent);
    }
  }
  .bg-black\\/80 {
    background-color: color-mix(in srgb, #000 80%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 80%, transparent);
    }
  }
  .bg-border {
    background-color: var(--border);
  }
  .bg-destructive\\/10 {
    background-color: var(--destructive);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--destructive) 10%, transparent);
    }
  }
  .bg-foreground\\/5 {
    background-color: var(--foreground);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--foreground) 5%, transparent);
    }
  }
  .bg-loupe-accent {
    background-color: var(--color-loupe-accent);
  }
  .bg-loupe-accent\\/5 {
    background-color: color-mix(in srgb, #f8f8f8 5%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-accent) 5%, transparent);
    }
  }
  .bg-loupe-accent\\/10 {
    background-color: color-mix(in srgb, #f8f8f8 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-accent) 10%, transparent);
    }
  }
  .bg-loupe-bg {
    background-color: var(--color-loupe-bg);
  }
  .bg-loupe-bg\\/35 {
    background-color: color-mix(in srgb, #050505 35%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-bg) 35%, transparent);
    }
  }
  .bg-loupe-bg\\/50 {
    background-color: color-mix(in srgb, #050505 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-bg) 50%, transparent);
    }
  }
  .bg-loupe-bg\\/60 {
    background-color: color-mix(in srgb, #050505 60%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-bg) 60%, transparent);
    }
  }
  .bg-loupe-bg\\/70 {
    background-color: color-mix(in srgb, #050505 70%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-bg) 70%, transparent);
    }
  }
  .bg-loupe-bg\\/80 {
    background-color: color-mix(in srgb, #050505 80%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-bg) 80%, transparent);
    }
  }
  .bg-loupe-bg\\/95 {
    background-color: color-mix(in srgb, #050505 95%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-bg) 95%, transparent);
    }
  }
  .bg-loupe-elev\\/50 {
    background-color: color-mix(in srgb, #1a1a1a 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-elev) 50%, transparent);
    }
  }
  .bg-loupe-elev\\/80 {
    background-color: color-mix(in srgb, #1a1a1a 80%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-elev) 80%, transparent);
    }
  }
  .bg-loupe-elev\\/85 {
    background-color: color-mix(in srgb, #1a1a1a 85%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-elev) 85%, transparent);
    }
  }
  .bg-loupe-fg {
    background-color: var(--color-loupe-fg);
  }
  .bg-loupe-panel {
    background-color: var(--color-loupe-panel);
  }
  .bg-loupe-panel\\/55 {
    background-color: color-mix(in srgb, #101010 55%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-panel) 55%, transparent);
    }
  }
  .bg-loupe-panel\\/60 {
    background-color: color-mix(in srgb, #101010 60%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-panel) 60%, transparent);
    }
  }
  .bg-loupe-panel\\/70 {
    background-color: color-mix(in srgb, #101010 70%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-panel) 70%, transparent);
    }
  }
  .bg-loupe-panel\\/95 {
    background-color: color-mix(in srgb, #101010 95%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-panel) 95%, transparent);
    }
  }
  .bg-popover {
    background-color: var(--popover);
  }
  .bg-popover\\/70 {
    background-color: var(--popover);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--popover) 70%, transparent);
    }
  }
  .bg-primary {
    background-color: var(--primary);
  }
  .bg-red-500\\/10 {
    background-color: color-mix(in srgb, oklch(63.7% 0.237 25.331) 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-red-500) 10%, transparent);
    }
  }
  .bg-secondary {
    background-color: var(--secondary);
  }
  .bg-transparent {
    background-color: transparent;
  }
  .bg-white\\/5 {
    background-color: color-mix(in srgb, #fff 5%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 5%, transparent);
    }
  }
  .bg-white\\/10 {
    background-color: color-mix(in srgb, #fff 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 10%, transparent);
    }
  }
  .bg-white\\/\\[0\\.04\\] {
    background-color: color-mix(in srgb, #fff 4%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 4%, transparent);
    }
  }
  .bg-clip-padding {
    background-clip: padding-box;
  }
  .object-contain {
    object-fit: contain;
  }
  .object-cover {
    object-fit: cover;
  }
  .p-0 {
    padding: 0;
  }
  .p-0\\.5 {
    padding: calc(var(--spacing) * 0.5);
  }
  .p-1 {
    padding: var(--spacing);
  }
  .p-1\\.5 {
    padding: calc(var(--spacing) * 1.5);
  }
  .p-2 {
    padding: calc(var(--spacing) * 2);
  }
  .p-2\\.5 {
    padding: calc(var(--spacing) * 2.5);
  }
  .p-3 {
    padding: calc(var(--spacing) * 3);
  }
  .p-3\\.5 {
    padding: calc(var(--spacing) * 3.5);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .p-6 {
    padding: calc(var(--spacing) * 6);
  }
  .p-8 {
    padding: calc(var(--spacing) * 8);
  }
  .px-1 {
    padding-inline: var(--spacing);
  }
  .px-1\\.5 {
    padding-inline: calc(var(--spacing) * 1.5);
  }
  .px-2 {
    padding-inline: calc(var(--spacing) * 2);
  }
  .px-2\\.5 {
    padding-inline: calc(var(--spacing) * 2.5);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-3\\.5 {
    padding-inline: calc(var(--spacing) * 3.5);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .py-0\\.5 {
    padding-block: calc(var(--spacing) * 0.5);
  }
  .py-1 {
    padding-block: var(--spacing);
  }
  .py-1\\.5 {
    padding-block: calc(var(--spacing) * 1.5);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .py-2\\.5 {
    padding-block: calc(var(--spacing) * 2.5);
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3);
  }
  .py-4 {
    padding-block: calc(var(--spacing) * 4);
  }
  .py-8 {
    padding-block: calc(var(--spacing) * 8);
  }
  .py-12 {
    padding-block: calc(var(--spacing) * 12);
  }
  .pt-1 {
    padding-top: var(--spacing);
  }
  .pt-2 {
    padding-top: calc(var(--spacing) * 2);
  }
  .pt-2\\.5 {
    padding-top: calc(var(--spacing) * 2.5);
  }
  .pt-3 {
    padding-top: calc(var(--spacing) * 3);
  }
  .pr-2 {
    padding-right: calc(var(--spacing) * 2);
  }
  .pr-8 {
    padding-right: calc(var(--spacing) * 8);
  }
  .pb-1 {
    padding-bottom: var(--spacing);
  }
  .pb-1\\.5 {
    padding-bottom: calc(var(--spacing) * 1.5);
  }
  .pb-2 {
    padding-bottom: calc(var(--spacing) * 2);
  }
  .pb-2\\.5 {
    padding-bottom: calc(var(--spacing) * 2.5);
  }
  .pb-3 {
    padding-bottom: calc(var(--spacing) * 3);
  }
  .pl-2 {
    padding-left: calc(var(--spacing) * 2);
  }
  .pl-2\\.5 {
    padding-left: calc(var(--spacing) * 2.5);
  }
  .pl-7 {
    padding-left: calc(var(--spacing) * 7);
  }
  .pl-8 {
    padding-left: calc(var(--spacing) * 8);
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .font-heading {
    font-family: "Geist Mono Variable", ui-monospace, SFMono-Regular, monospace;
  }
  .font-mono {
    font-family: "Geist Mono Variable", ui-monospace, SFMono-Regular, monospace;
  }
  .text-base {
    font-size: var(--text-base);
    line-height: var(--tw-leading, var(--text-base--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .text-\\[10\\.5px\\] {
    font-size: 10.5px;
  }
  .text-\\[10px\\] {
    font-size: 10px;
  }
  .text-\\[11px\\] {
    font-size: 11px;
  }
  .text-\\[12\\.5px\\] {
    font-size: 12.5px;
  }
  .text-\\[12px\\] {
    font-size: 12px;
  }
  .text-\\[13px\\] {
    font-size: 13px;
  }
  .text-\\[14px\\] {
    font-size: 14px;
  }
  .text-\\[18px\\] {
    font-size: 18px;
  }
  .leading-none {
    --tw-leading: 1;
    line-height: 1;
  }
  .leading-snug {
    --tw-leading: var(--leading-snug);
    line-height: var(--leading-snug);
  }
  .leading-tight {
    --tw-leading: var(--leading-tight);
    line-height: var(--leading-tight);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .break-words {
    overflow-wrap: break-word;
  }
  .break-all {
    word-break: break-all;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre-line {
    white-space: pre-line;
  }
  .text-\\[\\#d97757\\] {
    color: #d97757;
  }
  .text-amber-300 {
    color: var(--color-amber-300);
  }
  .text-black {
    color: var(--color-black);
  }
  .text-current {
    color: currentcolor;
  }
  .text-destructive {
    color: var(--destructive);
  }
  .text-foreground {
    color: var(--foreground);
  }
  .text-loupe-accent {
    color: var(--color-loupe-accent);
  }
  .text-loupe-bg {
    color: var(--color-loupe-bg);
  }
  .text-loupe-faint {
    color: var(--color-loupe-faint);
  }
  .text-loupe-fg {
    color: var(--color-loupe-fg);
  }
  .text-loupe-fg\\/90 {
    color: color-mix(in srgb, #f8f8f8 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      color: color-mix(in oklab, var(--color-loupe-fg) 90%, transparent);
    }
  }
  .text-loupe-muted {
    color: var(--color-loupe-muted);
  }
  .text-muted-foreground {
    color: var(--muted-foreground);
  }
  .text-popover-foreground {
    color: var(--popover-foreground);
  }
  .text-primary {
    color: var(--primary);
  }
  .text-primary-foreground {
    color: var(--primary-foreground);
  }
  .text-red-100 {
    color: var(--color-red-100);
  }
  .text-secondary-foreground {
    color: var(--secondary-foreground);
  }
  .text-white {
    color: var(--color-white);
  }
  .underline-offset-4 {
    text-underline-offset: 4px;
  }
  .opacity-0 {
    opacity: 0%;
  }
  .opacity-60 {
    opacity: 60%;
  }
  .opacity-70 {
    opacity: 70%;
  }
  .opacity-100 {
    opacity: 100%;
  }
  .shadow {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-2xl {
    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-\\[0_0_0_1px_rgba\\(0\\,0\\,0\\,0\\.35\\)\\,0_0_0_4px_rgba\\(251\\,191\\,36\\,0\\.12\\)\\] {
    --tw-shadow: 0 0 0 1px var(--tw-shadow-color, rgba(0,0,0,0.35)), 0 0 0 4px var(--tw-shadow-color, rgba(251,191,36,0.12));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-\\[0_0_0_1px_rgba\\(0\\,0\\,0\\,0\\.35\\)\\] {
    --tw-shadow: 0 0 0 1px var(--tw-shadow-color, rgba(0,0,0,0.35));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-lg {
    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-md {
    --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-xl {
    --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-xs {
    --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-1 {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-2 {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-black\\/30 {
    --tw-shadow-color: color-mix(in srgb, #000 30%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-black) 30%, transparent) var(--tw-shadow-alpha), transparent);
    }
  }
  .shadow-black\\/40 {
    --tw-shadow-color: color-mix(in srgb, #000 40%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-black) 40%, transparent) var(--tw-shadow-alpha), transparent);
    }
  }
  .shadow-black\\/45 {
    --tw-shadow-color: color-mix(in srgb, #000 45%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-black) 45%, transparent) var(--tw-shadow-alpha), transparent);
    }
  }
  .shadow-black\\/50 {
    --tw-shadow-color: color-mix(in srgb, #000 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-black) 50%, transparent) var(--tw-shadow-alpha), transparent);
    }
  }
  .shadow-black\\/60 {
    --tw-shadow-color: color-mix(in srgb, #000 60%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-black) 60%, transparent) var(--tw-shadow-alpha), transparent);
    }
  }
  .ring-amber-400\\/35 {
    --tw-ring-color: color-mix(in srgb, oklch(82.8% 0.189 84.429) 35%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-amber-400) 35%, transparent);
    }
  }
  .ring-black\\/20 {
    --tw-ring-color: color-mix(in srgb, #000 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-black) 20%, transparent);
    }
  }
  .ring-foreground\\/10 {
    --tw-ring-color: var(--foreground);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--foreground) 10%, transparent);
    }
  }
  .ring-white\\/35 {
    --tw-ring-color: color-mix(in srgb, #fff 35%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-white) 35%, transparent);
    }
  }
  .outline-hidden {
    --tw-outline-style: none;
    outline-style: none;
    @media (forced-colors: active) {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
  }
  .outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  .blur {
    --tw-blur: blur(8px);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .drop-shadow-\\[0_1px_3px_rgba\\(0\\,0\\,0\\,0\\.9\\)\\] {
    --tw-drop-shadow-size: drop-shadow(0 1px 3px var(--tw-drop-shadow-color, rgba(0,0,0,0.9)));
    --tw-drop-shadow: var(--tw-drop-shadow-size);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .invert {
    --tw-invert: invert(100%);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .filter {
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[color\\,box-shadow\\] {
    transition-property: color,box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-shadow {
    transition-property: box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-none {
    transition-property: none;
  }
  .duration-100 {
    --tw-duration: 100ms;
    transition-duration: 100ms;
  }
  .ease-in-out {
    --tw-ease: var(--ease-in-out);
    transition-timing-function: var(--ease-in-out);
  }
  .outline-none {
    --tw-outline-style: none;
    outline-style: none;
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  .\\[loupe\\:event\\] {
    loupe: event;
  }
  .running {
    animation-play-state: running;
  }
  .group-hover\\:text-loupe-fg {
    &:is(:where(.group):hover *) {
      @media (hover: hover) {
        color: var(--color-loupe-fg);
      }
    }
  }
  .group-hover\\:opacity-100 {
    &:is(:where(.group):hover *) {
      @media (hover: hover) {
        opacity: 100%;
      }
    }
  }
  .group-hover\\/ref\\:opacity-100 {
    &:is(:where(.group\\/ref):hover *) {
      @media (hover: hover) {
        opacity: 100%;
      }
    }
  }
  .file\\:inline-flex {
    &::file-selector-button {
      display: inline-flex;
    }
  }
  .file\\:h-7 {
    &::file-selector-button {
      height: calc(var(--spacing) * 7);
    }
  }
  .file\\:border-0 {
    &::file-selector-button {
      border-style: var(--tw-border-style);
      border-width: 0px;
    }
  }
  .file\\:bg-transparent {
    &::file-selector-button {
      background-color: transparent;
    }
  }
  .file\\:text-sm {
    &::file-selector-button {
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
    }
  }
  .file\\:font-medium {
    &::file-selector-button {
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
    }
  }
  .file\\:text-foreground {
    &::file-selector-button {
      color: var(--foreground);
    }
  }
  .placeholder\\:text-loupe-faint {
    &::placeholder {
      color: var(--color-loupe-faint);
    }
  }
  .placeholder\\:text-muted-foreground {
    &::placeholder {
      color: var(--muted-foreground);
    }
  }
  .before\\:pointer-events-none {
    &::before {
      content: var(--tw-content);
      pointer-events: none;
    }
  }
  .before\\:absolute {
    &::before {
      content: var(--tw-content);
      position: absolute;
    }
  }
  .before\\:inset-0 {
    &::before {
      content: var(--tw-content);
      inset: 0;
    }
  }
  .before\\:-z-1 {
    &::before {
      content: var(--tw-content);
      z-index: calc(1 * -1);
    }
  }
  .before\\:rounded-\\[inherit\\] {
    &::before {
      content: var(--tw-content);
      border-radius: inherit;
    }
  }
  .before\\:backdrop-blur-2xl {
    &::before {
      content: var(--tw-content);
      --tw-backdrop-blur: blur(var(--blur-2xl));
      -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
      backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    }
  }
  .before\\:backdrop-saturate-150 {
    &::before {
      content: var(--tw-content);
      --tw-backdrop-saturate: saturate(150%);
      -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
      backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    }
  }
  .hover\\:border-loupe-accent\\/50 {
    &:hover {
      @media (hover: hover) {
        border-color: color-mix(in srgb, #f8f8f8 50%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          border-color: color-mix(in oklab, var(--color-loupe-accent) 50%, transparent);
        }
      }
    }
  }
  .hover\\:border-loupe-line-strong {
    &:hover {
      @media (hover: hover) {
        border-color: var(--color-loupe-line-strong);
      }
    }
  }
  .hover\\:bg-\\[color-mix\\(in_oklch\\,var\\(--secondary\\)\\,var\\(--foreground\\)_5\\%\\)\\] {
    &:hover {
      @media (hover: hover) {
        background-color: var(--secondary);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklch,var(--secondary),var(--foreground) 5%);
        }
      }
    }
  }
  .hover\\:bg-destructive\\/20 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--destructive) 20%, transparent);
        }
      }
    }
  }
  .hover\\:bg-loupe-elev {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-loupe-elev);
      }
    }
  }
  .hover\\:bg-muted {
    &:hover {
      @media (hover: hover) {
        background-color: var(--muted);
      }
    }
  }
  .hover\\:bg-primary\\/80 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--primary);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--primary) 80%, transparent);
        }
      }
    }
  }
  .hover\\:bg-white {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-white);
      }
    }
  }
  .hover\\:bg-white\\/5 {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in srgb, #fff 5%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-white) 5%, transparent);
        }
      }
    }
  }
  .hover\\:bg-white\\/\\[0\\.03\\] {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in srgb, #fff 3%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-white) 3%, transparent);
        }
      }
    }
  }
  .hover\\:bg-white\\/\\[0\\.04\\] {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in srgb, #fff 4%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-white) 4%, transparent);
        }
      }
    }
  }
  .hover\\:text-foreground {
    &:hover {
      @media (hover: hover) {
        color: var(--foreground);
      }
    }
  }
  .hover\\:text-loupe-fg {
    &:hover {
      @media (hover: hover) {
        color: var(--color-loupe-fg);
      }
    }
  }
  .hover\\:text-loupe-muted {
    &:hover {
      @media (hover: hover) {
        color: var(--color-loupe-muted);
      }
    }
  }
  .hover\\:text-muted-foreground {
    &:hover {
      @media (hover: hover) {
        color: var(--muted-foreground);
      }
    }
  }
  .hover\\:underline {
    &:hover {
      @media (hover: hover) {
        text-decoration-line: underline;
      }
    }
  }
  .hover\\:opacity-100 {
    &:hover {
      @media (hover: hover) {
        opacity: 100%;
      }
    }
  }
  .focus\\:border-loupe-accent\\/60 {
    &:focus {
      border-color: color-mix(in srgb, #f8f8f8 60%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-loupe-accent) 60%, transparent);
      }
    }
  }
  .focus\\:bg-accent {
    &:focus {
      background-color: var(--accent);
    }
  }
  .focus\\:text-accent-foreground {
    &:focus {
      color: var(--accent-foreground);
    }
  }
  .focus\\:ring-1 {
    &:focus {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus\\:ring-loupe-accent\\/70 {
    &:focus {
      --tw-ring-color: color-mix(in srgb, #f8f8f8 70%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--color-loupe-accent) 70%, transparent);
      }
    }
  }
  .focus\\:outline-none {
    &:focus {
      --tw-outline-style: none;
      outline-style: none;
    }
  }
  .not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground {
    &:not(*[data-variant="destructive"]) {
      &:focus {
        :is(& *) {
          color: var(--accent-foreground);
        }
      }
    }
  }
  .focus-visible\\:border-destructive\\/40 {
    &:focus-visible {
      border-color: var(--destructive);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--destructive) 40%, transparent);
      }
    }
  }
  .focus-visible\\:border-ring {
    &:focus-visible {
      border-color: var(--ring);
    }
  }
  .focus-visible\\:opacity-100 {
    &:focus-visible {
      opacity: 100%;
    }
  }
  .focus-visible\\:ring-3 {
    &:focus-visible {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus-visible\\:ring-\\[3px\\] {
    &:focus-visible {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus-visible\\:ring-destructive\\/20 {
    &:focus-visible {
      --tw-ring-color: var(--destructive);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--destructive) 20%, transparent);
      }
    }
  }
  .focus-visible\\:ring-ring\\/50 {
    &:focus-visible {
      --tw-ring-color: var(--ring);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--ring) 50%, transparent);
      }
    }
  }
  .active\\:scale-\\[0\\.98\\] {
    &:active {
      scale: 0.98;
    }
  }
  .active\\:scale-\\[0\\.99\\] {
    &:active {
      scale: 0.99;
    }
  }
  .active\\:cursor-grabbing {
    &:active {
      cursor: grabbing;
    }
  }
  .active\\:not-aria-\\[haspopup\\]\\:translate-y-px {
    &:active {
      &:not(*[aria-haspopup]) {
        --tw-translate-y: 1px;
        translate: var(--tw-translate-x) var(--tw-translate-y);
      }
    }
  }
  .disabled\\:pointer-events-none {
    &:disabled {
      pointer-events: none;
    }
  }
  .disabled\\:cursor-default {
    &:disabled {
      cursor: default;
    }
  }
  .disabled\\:cursor-not-allowed {
    &:disabled {
      cursor: not-allowed;
    }
  }
  .disabled\\:opacity-50 {
    &:disabled {
      opacity: 50%;
    }
  }
  .in-data-\\[slot\\=button-group\\]\\:rounded-md {
    :where(*[data-slot="button-group"]) & {
      border-radius: calc(var(--radius) * 0.8);
    }
  }
  .has-data-\\[icon\\=inline-end\\]\\:pr-1\\.5 {
    &:has(*[data-icon="inline-end"]) {
      padding-right: calc(var(--spacing) * 1.5);
    }
  }
  .has-data-\\[icon\\=inline-end\\]\\:pr-2 {
    &:has(*[data-icon="inline-end"]) {
      padding-right: calc(var(--spacing) * 2);
    }
  }
  .has-data-\\[icon\\=inline-start\\]\\:pl-1\\.5 {
    &:has(*[data-icon="inline-start"]) {
      padding-left: calc(var(--spacing) * 1.5);
    }
  }
  .has-data-\\[icon\\=inline-start\\]\\:pl-2 {
    &:has(*[data-icon="inline-start"]) {
      padding-left: calc(var(--spacing) * 2);
    }
  }
  .aria-expanded\\:bg-muted {
    &[aria-expanded="true"] {
      background-color: var(--muted);
    }
  }
  .aria-expanded\\:bg-secondary {
    &[aria-expanded="true"] {
      background-color: var(--secondary);
    }
  }
  .aria-expanded\\:text-foreground {
    &[aria-expanded="true"] {
      color: var(--foreground);
    }
  }
  .aria-expanded\\:text-secondary-foreground {
    &[aria-expanded="true"] {
      color: var(--secondary-foreground);
    }
  }
  .aria-invalid\\:border-destructive {
    &[aria-invalid="true"] {
      border-color: var(--destructive);
    }
  }
  .aria-invalid\\:ring-3 {
    &[aria-invalid="true"] {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .aria-invalid\\:ring-destructive\\/20 {
    &[aria-invalid="true"] {
      --tw-ring-color: var(--destructive);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--destructive) 20%, transparent);
      }
    }
  }
  .data-highlighted\\:bg-foreground\\/10 {
    &[data-highlighted] {
      background-color: var(--foreground);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--foreground) 10%, transparent);
      }
    }
  }
  .data-highlighted\\:text-foreground {
    &[data-highlighted] {
      color: var(--foreground);
    }
  }
  .data-placeholder\\:text-muted-foreground {
    &[data-placeholder] {
      color: var(--muted-foreground);
    }
  }
  .data-\\[align-trigger\\=true\\]\\:animate-none {
    &[data-align-trigger="true"] {
      animation: none;
    }
  }
  .data-\\[on\\=true\\]\\:border-loupe-accent\\/40 {
    &[data-on="true"] {
      border-color: color-mix(in srgb, #f8f8f8 40%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-loupe-accent) 40%, transparent);
      }
    }
  }
  .data-\\[on\\=true\\]\\:bg-loupe-accent\\/15 {
    &[data-on="true"] {
      background-color: color-mix(in srgb, #f8f8f8 15%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--color-loupe-accent) 15%, transparent);
      }
    }
  }
  .data-\\[on\\=true\\]\\:text-loupe-fg {
    &[data-on="true"] {
      color: var(--color-loupe-fg);
    }
  }
  .data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\) {
    &[data-position="popper"] {
      height: var(--radix-select-trigger-height);
    }
  }
  .data-\\[position\\=popper\\]\\:w-full {
    &[data-position="popper"] {
      width: 100%;
    }
  }
  .data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\) {
    &[data-position="popper"] {
      min-width: var(--radix-select-trigger-width);
    }
  }
  .data-\\[side\\=bottom\\]\\:translate-y-1 {
    &[data-side="bottom"] {
      --tw-translate-y: var(--spacing);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  .data-\\[side\\=bottom\\]\\:slide-in-from-top-2 {
    &[data-side="bottom"] {
      --tw-enter-translate-y: calc(2*var(--spacing)*-1);
    }
  }
  .data-\\[side\\=left\\]\\:-translate-x-1 {
    &[data-side="left"] {
      --tw-translate-x: calc(var(--spacing) * -1);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  .data-\\[side\\=left\\]\\:slide-in-from-right-2 {
    &[data-side="left"] {
      --tw-enter-translate-x: calc(2*var(--spacing));
    }
  }
  .data-\\[side\\=right\\]\\:translate-x-1 {
    &[data-side="right"] {
      --tw-translate-x: var(--spacing);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  .data-\\[side\\=right\\]\\:slide-in-from-left-2 {
    &[data-side="right"] {
      --tw-enter-translate-x: calc(2*var(--spacing)*-1);
    }
  }
  .data-\\[side\\=top\\]\\:-translate-y-1 {
    &[data-side="top"] {
      --tw-translate-y: calc(var(--spacing) * -1);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  .data-\\[side\\=top\\]\\:slide-in-from-bottom-2 {
    &[data-side="top"] {
      --tw-enter-translate-y: calc(2*var(--spacing));
    }
  }
  .data-\\[size\\=default\\]\\:h-9 {
    &[data-size="default"] {
      height: calc(var(--spacing) * 9);
    }
  }
  .data-\\[size\\=sm\\]\\:h-8 {
    &[data-size="sm"] {
      height: calc(var(--spacing) * 8);
    }
  }
  .\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 {
    :is(& *) {
      &[data-slot$="-item"] {
        &:focus {
          background-color: var(--foreground);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--foreground) 10%, transparent);
          }
        }
      }
    }
  }
  .\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 {
    :is(& *) {
      &[data-slot$="-item"] {
        &[data-highlighted] {
          background-color: var(--foreground);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--foreground) 10%, transparent);
          }
        }
      }
    }
  }
  .\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 {
    :is(& *) {
      &[data-slot$="-separator"] {
        background-color: var(--foreground);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--foreground) 5%, transparent);
        }
      }
    }
  }
  .\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 {
    :is(& *) {
      &[data-slot$="-trigger"] {
        &:focus {
          background-color: var(--foreground);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--foreground) 10%, transparent);
          }
        }
      }
    }
  }
  .\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! {
    :is(& *) {
      &[data-slot$="-trigger"] {
        &[aria-expanded="true"] {
          background-color: var(--foreground) !important;
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--foreground) 10%, transparent) !important;
          }
        }
      }
    }
  }
  .\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1 {
    :is(& > *) {
      &[data-slot="select-value"] {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
  }
  .\\*\\:data-\\[slot\\=select-value\\]\\:flex {
    :is(& > *) {
      &[data-slot="select-value"] {
        display: flex;
      }
    }
  }
  .\\*\\:data-\\[slot\\=select-value\\]\\:items-center {
    :is(& > *) {
      &[data-slot="select-value"] {
        align-items: center;
      }
    }
  }
  .\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5 {
    :is(& > *) {
      &[data-slot="select-value"] {
        gap: calc(var(--spacing) * 1.5);
      }
    }
  }
  .data-\\[state\\=checked\\]\\:border-primary {
    &[data-state="checked"] {
      border-color: var(--primary);
    }
  }
  .data-\\[state\\=checked\\]\\:bg-primary {
    &[data-state="checked"] {
      background-color: var(--primary);
    }
  }
  .data-\\[state\\=checked\\]\\:text-primary-foreground {
    &[data-state="checked"] {
      color: var(--primary-foreground);
    }
  }
  .data-\\[variant\\=destructive\\]\\:text-destructive {
    &[data-variant="destructive"] {
      color: var(--destructive);
    }
  }
  .\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! {
    :is(& *) {
      &[data-variant="destructive"] {
        :is(& *) {
          color: var(--accent-foreground) !important;
        }
      }
    }
  }
  .\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! {
    :is(& *) {
      &[data-variant="destructive"] {
        color: var(--accent-foreground) !important;
      }
    }
  }
  .\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! {
    :is(& *) {
      &[data-variant="destructive"] {
        &:focus {
          background-color: var(--foreground) !important;
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--foreground) 10%, transparent) !important;
          }
        }
      }
    }
  }
  .data-\\[variant\\=destructive\\]\\:data-highlighted\\:bg-destructive\\/10 {
    &[data-variant="destructive"] {
      &[data-highlighted] {
        background-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--destructive) 10%, transparent);
        }
      }
    }
  }
  .supports-backdrop-filter\\:backdrop-blur-xs {
    @supports (backdrop-filter: var(--tw)) {
      --tw-backdrop-blur: blur(var(--blur-xs));
      -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
      backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    }
  }
  .sm\\:max-w-md {
    @media (width >= 40rem) {
      max-width: var(--container-md);
    }
  }
  .sm\\:grid-cols-2 {
    @media (width >= 40rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .sm\\:flex-row {
    @media (width >= 40rem) {
      flex-direction: row;
    }
  }
  .sm\\:justify-end {
    @media (width >= 40rem) {
      justify-content: flex-end;
    }
  }
  .md\\:text-sm {
    @media (width >= 48rem) {
      font-size: var(--text-sm);
      line-height: var(--tw-leading, var(--text-sm--line-height));
    }
  }
  .dark\\:border-input {
    &:is(.dark *) {
      border-color: var(--input);
    }
  }
  .dark\\:bg-destructive\\/20 {
    &:is(.dark *) {
      background-color: var(--destructive);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--destructive) 20%, transparent);
      }
    }
  }
  .dark\\:bg-input\\/30 {
    &:is(.dark *) {
      background-color: var(--input);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--input) 30%, transparent);
      }
    }
  }
  .dark\\:hover\\:bg-destructive\\/30 {
    &:is(.dark *) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--destructive);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--destructive) 30%, transparent);
          }
        }
      }
    }
  }
  .dark\\:hover\\:bg-input\\/50 {
    &:is(.dark *) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--input);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--input) 50%, transparent);
          }
        }
      }
    }
  }
  .dark\\:hover\\:bg-muted\\/50 {
    &:is(.dark *) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--muted);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--muted) 50%, transparent);
          }
        }
      }
    }
  }
  .dark\\:focus-visible\\:ring-destructive\\/40 {
    &:is(.dark *) {
      &:focus-visible {
        --tw-ring-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          --tw-ring-color: color-mix(in oklab, var(--destructive) 40%, transparent);
        }
      }
    }
  }
  .dark\\:aria-invalid\\:border-destructive\\/50 {
    &:is(.dark *) {
      &[aria-invalid="true"] {
        border-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          border-color: color-mix(in oklab, var(--destructive) 50%, transparent);
        }
      }
    }
  }
  .dark\\:aria-invalid\\:ring-destructive\\/40 {
    &:is(.dark *) {
      &[aria-invalid="true"] {
        --tw-ring-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          --tw-ring-color: color-mix(in oklab, var(--destructive) 40%, transparent);
        }
      }
    }
  }
  .data-open\\:animate-in {
    &:where([data-state="open"]), &:where([data-open]:not([data-open="false"])) {
      animation: enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none);
    }
  }
  .data-open\\:fade-in-0 {
    &:where([data-state="open"]), &:where([data-open]:not([data-open="false"])) {
      --tw-enter-opacity: calc(0/100);
      --tw-enter-opacity: 0;
    }
  }
  .data-open\\:zoom-in-95 {
    &:where([data-state="open"]), &:where([data-open]:not([data-open="false"])) {
      --tw-enter-scale: calc(95*1%);
      --tw-enter-scale: .95;
    }
  }
  .data-closed\\:animate-out {
    &:where([data-state="closed"]), &:where([data-closed]:not([data-closed="false"])) {
      animation: exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none);
    }
  }
  .data-closed\\:fade-out-0 {
    &:where([data-state="closed"]), &:where([data-closed]:not([data-closed="false"])) {
      --tw-exit-opacity: calc(0/100);
      --tw-exit-opacity: 0;
    }
  }
  .data-closed\\:zoom-out-95 {
    &:where([data-state="closed"]), &:where([data-closed]:not([data-closed="false"])) {
      --tw-exit-scale: calc(95*1%);
      --tw-exit-scale: .95;
    }
  }
  .data-disabled\\:pointer-events-none {
    &:where([data-disabled="true"]), &:where([data-disabled]:not([data-disabled="false"])) {
      pointer-events: none;
    }
  }
  .data-disabled\\:opacity-50 {
    &:where([data-disabled="true"]), &:where([data-disabled]:not([data-disabled="false"])) {
      opacity: 50%;
    }
  }
  .\\[\\&_svg\\]\\:pointer-events-none {
    & svg {
      pointer-events: none;
    }
  }
  .\\[\\&_svg\\]\\:shrink-0 {
    & svg {
      flex-shrink: 0;
    }
  }
  .\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-3 {
    & svg:not([class*='size-']) {
      width: calc(var(--spacing) * 3);
      height: calc(var(--spacing) * 3);
    }
  }
  .\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4 {
    & svg:not([class*='size-']) {
      width: calc(var(--spacing) * 4);
      height: calc(var(--spacing) * 4);
    }
  }
  .\\*\\:\\[a\\]\\:underline {
    :is(& > *) {
      &:is(a) {
        text-decoration-line: underline;
      }
    }
  }
  .\\*\\:\\[a\\]\\:underline-offset-3 {
    :is(& > *) {
      &:is(a) {
        text-underline-offset: 3px;
      }
    }
  }
  .\\[a\\]\\:hover\\:bg-destructive\\/20 {
    &:is(a) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--destructive);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--destructive) 20%, transparent);
          }
        }
      }
    }
  }
  .\\[a\\]\\:hover\\:bg-muted {
    &:is(a) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--muted);
        }
      }
    }
  }
  .\\[a\\]\\:hover\\:bg-primary\\/80 {
    &:is(a) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--primary);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--primary) 80%, transparent);
          }
        }
      }
    }
  }
  .\\[a\\]\\:hover\\:bg-secondary\\/80 {
    &:is(a) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--secondary);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--secondary) 80%, transparent);
          }
        }
      }
    }
  }
  .\\[a\\]\\:hover\\:text-muted-foreground {
    &:is(a) {
      &:hover {
        @media (hover: hover) {
          color: var(--muted-foreground);
        }
      }
    }
  }
  .\\*\\:\\[a\\]\\:hover\\:text-foreground {
    :is(& > *) {
      &:is(a) {
        &:hover {
          @media (hover: hover) {
            color: var(--foreground);
          }
        }
      }
    }
  }
  .\\*\\:\\[span\\]\\:last\\:flex {
    :is(& > *) {
      &:is(span) {
        &:last-child {
          display: flex;
        }
      }
    }
  }
  .\\*\\:\\[span\\]\\:last\\:items-center {
    :is(& > *) {
      &:is(span) {
        &:last-child {
          align-items: center;
        }
      }
    }
  }
  .\\*\\:\\[span\\]\\:last\\:gap-2 {
    :is(& > *) {
      &:is(span) {
        &:last-child {
          gap: calc(var(--spacing) * 2);
        }
      }
    }
  }
  .\\[\\&\\>svg\\]\\:pointer-events-none {
    &>svg {
      pointer-events: none;
    }
  }
  .\\[\\&\\>svg\\]\\:block {
    &>svg {
      display: block;
    }
  }
  .\\[\\&\\>svg\\]\\:size-3\\! {
    &>svg {
      width: calc(var(--spacing) * 3) !important;
      height: calc(var(--spacing) * 3) !important;
    }
  }
  .\\[\\&\\>svg\\]\\:h-\\[15px\\] {
    &>svg {
      height: 15px;
    }
  }
  .\\[\\&\\>svg\\]\\:w-\\[15px\\] {
    &>svg {
      width: 15px;
    }
  }
}
@property --tw-animation-delay {
  syntax: "*";
  inherits: false;
  initial-value: 0s;
}
@property --tw-animation-direction {
  syntax: "*";
  inherits: false;
  initial-value: normal;
}
@property --tw-animation-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-animation-fill-mode {
  syntax: "*";
  inherits: false;
  initial-value: none;
}
@property --tw-animation-iteration-count {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-enter-blur {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-enter-opacity {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-enter-rotate {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-enter-scale {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-enter-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-enter-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-exit-blur {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-exit-opacity {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-exit-rotate {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-exit-scale {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-exit-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-exit-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --scroll-fade-t {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-b {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-s {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-e {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0px;
}
@property --scroll-fade-mask {
  syntax: "*";
  inherits: false;
}
@property --shimmer-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 20deg;
}
@property --shimmer-image {
  syntax: "*";
  inherits: false;
}
@property --shimmer-text-fill {
  syntax: "*";
  inherits: false;
}
@media (prefers-reduced-motion: reduce) {
  .shimmer {
    animation: none;
    background-image: none;
    -webkit-text-fill-color: currentColor;
  }
}
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.852 0.199 91.936);
  --primary-foreground: oklch(0.421 0.095 57.708);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.823 0.12 346.018);
  --chart-2: oklch(0.656 0.241 354.308);
  --chart-3: oklch(0.592 0.249 0.584);
  --chart-4: oklch(0.525 0.223 3.958);
  --chart-5: oklch(0.459 0.187 3.815);
  --radius: 0.875rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.681 0.162 75.834);
  --sidebar-primary-foreground: oklch(0.987 0.026 102.212);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.795 0.184 86.047);
  --primary-foreground: oklch(0.421 0.095 57.708);
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.823 0.12 346.018);
  --chart-2: oklch(0.656 0.241 354.308);
  --chart-3: oklch(0.592 0.249 0.584);
  --chart-4: oklch(0.525 0.223 3.958);
  --chart-5: oklch(0.459 0.187 3.815);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.795 0.184 86.047);
  --sidebar-primary-foreground: oklch(0.987 0.026 102.212);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}
@layer base {
  * {
    border-color: var(--border);
    outline-color: var(--ring);
    @supports (color: color-mix(in lab, red, red)) {
      outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
    }
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
  html {
    font-family: "Geist Variable", ui-sans-serif, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  }
}
@keyframes loupe-braille {
  0% {
    content: "\\2807";
  }
  10% {
    content: "\\280B";
  }
  20% {
    content: "\\2819";
  }
  30% {
    content: "\\2838";
  }
  40% {
    content: "\\2834";
  }
  50% {
    content: "\\2826";
  }
  60% {
    content: "\\2827";
  }
  70% {
    content: "\\280F";
  }
  80% {
    content: "\\2807";
  }
  90% {
    content: "\\280B";
  }
  100% {
    content: "\\2807";
  }
}
.loupe-spin::after {
  content: "\\280B";
  display: inline-block;
  animation: loupe-braille 0.9s steps(1, end) infinite;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
@media (prefers-reduced-motion: reduce) {
  .loupe-spin::after {
    animation: none;
  }
}
@font-face {
  font-family: "Geist Variable";
  font-style: normal;
  font-display: swap;
  font-weight: 100 900;
  src: url("__LOUPE_ASSET__fonts/geist-latin.woff2") format("woff2-variations");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Geist Variable";
  font-style: normal;
  font-display: swap;
  font-weight: 100 900;
  src: url("__LOUPE_ASSET__fonts/geist-latin-ext.woff2") format("woff2-variations");
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: "Geist Mono Variable";
  font-style: normal;
  font-display: swap;
  font-weight: 100 900;
  src: url("__LOUPE_ASSET__fonts/geist-mono-latin.woff2") format("woff2-variations");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Geist Mono Variable";
  font-style: normal;
  font-display: swap;
  font-weight: 100 900;
  src: url("__LOUPE_ASSET__fonts/geist-mono-latin-ext.woff2") format("woff2-variations");
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
:host {
  all: initial;
  font-family: var(--font-sans);
}
@keyframes loupe-panel-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes loupe-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.loupe-animate-panel {
  animation: loupe-panel-in 180ms cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-origin: top center;
}
.loupe-animate-fade {
  animation: loupe-fade-in 220ms ease-out both;
}
@media (prefers-reduced-motion: reduce) {
  .loupe-animate-panel, .loupe-animate-fade {
    animation: none;
  }
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@property --tw-content {
  syntax: "*";
  initial-value: "";
  inherits: false;
}
@property --tw-backdrop-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-sepia {
  syntax: "*";
  inherits: false;
}
@keyframes enter {
  from {
    opacity: var(--tw-enter-opacity,1);
    transform: translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));
    filter: blur(var(--tw-enter-blur,0));
  }
}
@keyframes exit {
  to {
    opacity: var(--tw-exit-opacity,1);
    transform: translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));
    filter: blur(var(--tw-exit-blur,0));
  }
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    :root, :host {
      --shimmer-angle: 20deg;
    }
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-space-y-reverse: 0;
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-duration: initial;
      --tw-ease: initial;
      --tw-content: "";
      --tw-backdrop-blur: initial;
      --tw-backdrop-brightness: initial;
      --tw-backdrop-contrast: initial;
      --tw-backdrop-grayscale: initial;
      --tw-backdrop-hue-rotate: initial;
      --tw-backdrop-invert: initial;
      --tw-backdrop-opacity: initial;
      --tw-backdrop-saturate: initial;
      --tw-backdrop-sepia: initial;
      --tw-animation-delay: 0s;
      --tw-animation-direction: normal;
      --tw-animation-duration: initial;
      --tw-animation-fill-mode: none;
      --tw-animation-iteration-count: 1;
      --tw-enter-blur: 0;
      --tw-enter-opacity: 1;
      --tw-enter-rotate: 0;
      --tw-enter-scale: 1;
      --tw-enter-translate-x: 0;
      --tw-enter-translate-y: 0;
      --tw-exit-blur: 0;
      --tw-exit-opacity: 1;
      --tw-exit-rotate: 0;
      --tw-exit-scale: 1;
      --tw-exit-translate-x: 0;
      --tw-exit-translate-y: 0;
      --scroll-fade-t: 0px;
      --scroll-fade-b: 0px;
      --scroll-fade-s: 0px;
      --scroll-fade-e: 0px;
      --scroll-fade-mask: initial;
      --shimmer-image: initial;
      --shimmer-text-fill: initial;
    }
  }
}
`;var zS=["localhost","127.0.0.1","*.localhost","*.local"];function Ud(e,t){let a,o;try{let r=new URL(e);a=r.hostname.toLowerCase(),o=r.port?`${a}:${r.port}`:a}catch{return!1}return t.some(r=>{let l=r.trim().toLowerCase();return d3(l.includes(":")?o:a,l)})}function d3(e,t){if(!t)return!1;if(t===e)return!0;if(t.startsWith("*.")){let a=t.slice(2);return e===a||e.endsWith("."+a)}return t.includes("*")?new RegExp("^"+t.split("*").map(f3).join(".*")+"$").test(e):!1}function f3(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var ch={bridgeUrl:"http://localhost:7337",author:"me",projectOrigins:zS,bridgeRoutes:[],codexLaunchMode:"background",disabledProviders:[]};function zd(e,t){let a=new Set(t.disabledProviders);return e.filter(o=>o.id==="save"||!a.has(o.id))}async function Fd(){let e=await chrome.storage.sync.get(ch);return{...ch,...e}}function _d(e,t){if(t){let a=e.bridgeRoutes.find(o=>Ud(t,o.origins));if(a?.bridgeUrl)return FS(a.bridgeUrl)}return FS(e.bridgeUrl)}function FS(e){return(e||ch.bridgeUrl).trim().replace(/\/$/,"")}var t1=A(Hp(),1);var M=A(q(),1),GS=A(jr(),1);var x=A(J(),1),c3='<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/></svg>',p3='<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="currentColor" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>',m3="https://github.com/woddlepad/loupe",h3='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>',g3='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6h16v2h-3v10h-2V8H9v10H7V8H4z"/></svg>',x3='<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 208"><path fill="currentColor" d="M205.3 31.4c14 14.8 20 35.2 22.5 63.6 6.6 0 12.8 1.5 17 7.2l7.8 10.6c2.2 3 3.4 6.6 3.4 10.4v28.7a12 12 0 0 1-4.8 9.5C215.9 187.2 172.3 208 128 208c-49 0-98.2-28.3-123.2-46.6a12 12 0 0 1-4.8-9.5v-28.7c0-3.8 1.2-7.4 3.4-10.5l7.8-10.5c4.2-5.7 10.4-7.2 17-7.2 2.5-28.4 8.4-48.8 22.5-63.6C77.3 3.2 112.6 0 127.6 0h.4c14.7 0 50.4 2.9 77.3 31.4ZM128 78.7c-3 0-6.5.2-10.3.6a27.1 27.1 0 0 1-6 12.1 45 45 0 0 1-32 13c-6.8 0-13.9-1.5-19.7-5.2-5.5 1.9-10.8 4.5-11.2 11-.5 12.2-.6 24.5-.6 36.8 0 6.1 0 12.3-.2 18.5 0 3.6 2.2 6.9 5.5 8.4C79.9 185.9 105 192 128 192s48-6 74.5-18.1a9.4 9.4 0 0 0 5.5-8.4c.3-18.4 0-37-.8-55.3-.4-6.6-5.7-9.1-11.2-11-5.8 3.7-13 5.1-19.7 5.1a45 45 0 0 1-32-12.9 27.1 27.1 0 0 1-6-12.1c-3.4-.4-6.9-.5-10.3-.6Zm-27 44c5.8 0 10.5 4.6 10.5 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.6-10.4 10.4-10.4Zm53.4 0c5.8 0 10.4 4.6 10.4 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.7-10.4 10.4-10.4Zm-73-94.4c-11.2 1.1-20.6 4.8-25.4 10-10.4 11.3-8.2 40.1-2.2 46.2A31.2 31.2 0 0 0 75 91.7c6.8 0 19.6-1.5 30.1-12.2 4.7-4.5 7.5-15.7 7.2-27-.3-9.1-2.9-16.7-6.7-19.9-4.2-3.6-13.6-5.2-24.2-4.3Zm69 4.3c-3.8 3.2-6.4 10.8-6.7 19.9-.3 11.3 2.5 22.5 7.2 27a41.7 41.7 0 0 0 30 12.2c8.9 0 17-2.9 21.3-7.2 6-6.1 8.2-34.9-2.2-46.3-4.8-5-14.2-8.8-25.4-9.9-10.6-1-20 .7-24.2 4.3ZM128 56c-2.6 0-5.6.2-9 .5.4 1.7.5 3.7.7 5.7 0 1.5 0 3-.2 4.5 3.2-.3 6-.3 8.5-.3 2.6 0 5.3 0 8.5.3-.2-1.6-.2-3-.2-4.5.2-2 .3-4 .7-5.7-3.4-.3-6.4-.5-9-.5Z"/></svg>',v3={n:"review",p:"page",a:"all",r:"recordings",l:"library"};function _S({mode:e,onModeChange:t,compact:a=!1}){return(0,x.jsxs)("div",{"data-loupe-panel-no-drag":"",className:"inline-flex items-center gap-0.5 rounded-lg border border-loupe-line bg-loupe-bg/60 p-0.5",children:[(0,x.jsxs)(ne,{size:"xs",variant:e==="select"?"default":"ghost",title:"Select mode \u2014 interact with the page",onClick:()=>t("select"),children:[(0,x.jsx)(Si,{className:"h-3.5 w-3.5"}),a?null:"Select"]}),(0,x.jsxs)(ne,{size:"xs",variant:e==="annotate"?"default":"ghost",title:"Annotation mode \u2014 drag to add annotations",onClick:()=>t("annotate"),children:[(0,x.jsx)(vi,{className:"h-3.5 w-3.5"}),a?null:"Annotate"]})]})}function VS({onClose:e,panelRoot:t=null,panelEmbedded:a=!1,onCollapsedChange:o,onModeChange:r,onReady:l}){let[n,i]=M.useState("select"),[s,u]=M.useState([]),[d,f]=M.useState([]),[c,m]=M.useState([]),[b,v]=M.useState([]),[w,h]=M.useState([]),[p,g]=M.useState("me"),[y,S]=M.useState("http://localhost:7337"),[k,L]=M.useState(void 0),[C,E]=M.useState("review"),[T,z]=M.useState(""),[K,$]=M.useState(!1),[G,pe]=M.useState(!1),[V,Q]=M.useState(null),[H,B]=M.useState(!1),[P,W]=M.useState(()=>new Set),[Ue,Ht]=M.useState(()=>new Set),[Ye,Ee]=M.useState(null),[Ce,Se]=M.useState(null),[la,Le]=M.useState(null),[Qo,Mt]=M.useState(null),ma=M.useRef(!1),[qt,Et]=M.useState(null),[,L1]=M.useReducer(D=>D+1,0);M.useEffect(()=>{o?.(H)},[H,o]);let Hr=M.useCallback(D=>{B(de=>{let ae=typeof D=="function"?D(de):D;return o?.(ae),ae})},[o]),os=M.useCallback(D=>{i(D),r?.(D),D==="annotate"&&Hr(!0)},[r,Hr]);M.useEffect(()=>{l?.({setMode:D=>i(D)})},[l]);let Jo=M.useCallback(async()=>{let[D,de,ae,ha,ns,$o]=await Promise.all([chrome.runtime.sendMessage({type:"list"}),chrome.runtime.sendMessage({type:"recordings"}),chrome.runtime.sendMessage({type:"references"}),J3(),$3(),Fd()]);u(D.ok?D.annotations:[]),f(de.ok?de.recordings:[]),m(ae.ok?ae.references:[]),v(zd(ha,$o)),h(ns),g($o.author),S(_d($o,location.href)),L($o.activeRepoRoot)},[]);M.useEffect(()=>{Jo()},[Jo]),M.useEffect(()=>{let D=()=>L1();return window.addEventListener("scroll",D,!0),window.addEventListener("resize",D,!0),()=>{window.removeEventListener("scroll",D,!0),window.removeEventListener("resize",D,!0)}},[]),M.useEffect(()=>{let D=de=>{de.key==="Escape"&&(nD(de,"data-loupe-library-popover")||(de.preventDefault(),de.stopImmediatePropagation(),K?$(!1):qt?Et(null):n==="annotate"?os("select"):e()))};return window.addEventListener("keydown",D,!0),()=>window.removeEventListener("keydown",D,!0)},[qt,e,K,n,os]),M.useEffect(()=>{let D=uD([window,t?.ownerDocument.defaultView??null]),de=ae=>{if(ae.defaultPrevented||H||qt||ae.metaKey||ae.ctrlKey||ae.altKey||ae.shiftKey||ae.isComposing||iD(ae.target))return;let ha=v3[ae.key.toLowerCase()];ha&&(ae.preventDefault(),ae.stopImmediatePropagation(),E(ha),Q(null),$(!1))};return D.forEach(ae=>ae.addEventListener("keydown",de,!0)),()=>D.forEach(ae=>ae.removeEventListener("keydown",de,!0))},[H,qt,t]);let rn=M.useMemo(()=>{let D=Pa(location.href);return s.filter(de=>Pa(de.url)===D)},[s]),Wd=M.useMemo(()=>s.filter(D=>D.status==="needs_review"),[s]),ln=M.useMemo(()=>C==="library"?[]:C==="review"?Wd:C==="all"?s:rn,[s,C,rn,Wd]),rs=M.useMemo(()=>{let D=Ta(T);return(G?ln:ln.filter(ae=>ae.status!=="resolved")).filter(ae=>{let ha=ae.groupSlug||ZS(ae.group);return Ue.has(ha)||Ye&&ha!==Ye?!1:!D||lD(ae,D)})},[Ye,Ue,T,ln,G]),Rh=M.useMemo(()=>G?rn.length:rn.filter(D=>D.status!=="resolved").length,[rn,G]),Ih=Wd.length,kh=M.useMemo(()=>G?s.length:s.filter(D=>D.status!=="resolved").length,[s,G]),Ah=c.length,Zd=d.length,Mh=s.filter(D=>D.status==="resolved").length,R1=ln.filter(D=>D.status==="resolved").length,Yd=M.useMemo(()=>[{value:"review",label:"Needs review",count:Ih,shortcut:"N"},{value:"page",label:"This page",count:Rh,shortcut:"P"},{value:"all",label:"All pages",count:kh,shortcut:"A"},{value:"recordings",label:"Recordings",count:Zd,shortcut:"R"},{value:"library",label:"Library",count:Ah,shortcut:"L"}],[kh,Ah,Rh,Zd,Ih]),I1=Yd.find(D=>D.value===C)??Yd[0],uo=V?s.find(D=>D.id===V):void 0,Eh=Ta(T).length>0,nn=M.useMemo(()=>eD(rs,w).filter(D=>!Ue.has(D.slug)&&(!Ye||D.slug===Ye)&&(!Eh||D.items.length>0)),[Ye,Ue,Eh,rs,w]),ls=M.useMemo(()=>tD(nn,Qo),[nn,Qo]),k1=Ye!==null||Ue.size>0,Dh=M.useRef(null);Y3(Dh,ls.map(D=>D.slug).join(`
`));let sn={annotations:s,references:c,actions:b,author:p,bridgeUrl:y,repoRoot:k,expanded:V,collapsedGroups:P,dragOverGroup:Ce,draggingGroupSlug:la,focusedGroup:Ye,groupOrder:ls.map(D=>D.slug),showResolved:G,clearGroupVisibility:()=>{Ht(new Set),Ee(null)},focusGroup:D=>{Ht(new Set),Ee(D),uo&&uo.groupSlug!==D&&Q(null)},hideGroup:D=>{Ht(de=>{let ae=new Set(de);return ae.add(D),ae}),Ee(de=>de===D?null:de),uo?.groupSlug===D&&Q(null)},setExpanded:Q,setFilter:E,setCollapsed:Hr,setDragOverGroup:Se,startGroupDrag:D=>{Le(D),Mt(nn.map(de=>de.slug))},previewGroupReorder:(D,de,ae)=>{D!==de&&(Mt(ha=>{let ns=ha??nn.map(A1=>A1.slug),$o=WS(ns,D,de,ae);return qS(ns,$o)?ha:$o}),Se(de))},cancelGroupReorder:()=>{ma.current||(Le(null),Mt(null),Se(null))},toggleGroup:D=>W(de=>{let ae=new Set(de);return ae.has(D)?ae.delete(D):ae.add(D),ae}),setLightbox:Et,moveAnnotation:async(D,de)=>{(await chrome.runtime.sendMessage({type:"move-annotation",id:D,group:de})).ok&&await Jo()},commitGroupReorder:async D=>{if(Le(null),Se(null),qS(D,nn.map(de=>de.slug))){Mt(null);return}ma.current=!0,Mt(D);try{(await chrome.runtime.sendMessage({type:"reorder-groups",slugs:D})).ok&&await Jo()}finally{Mt(null),ma.current=!1}},reload:Jo},Th=(0,x.jsx)(x.Fragment,{children:H?(0,x.jsxs)("div",{"data-loupe-panel-drag":"",className:se("flex h-12 items-center gap-1.5 rounded-xl border border-loupe-line bg-loupe-panel/95 px-1.5 text-loupe-fg shadow-2xl shadow-black/50",a?"w-full cursor-grab active:cursor-grabbing":"fixed right-3 top-3 z-[2147483646]"),children:[(0,x.jsxs)("button",{type:"button","data-loupe-panel-no-drag":"",className:"flex items-center gap-1.5 rounded-lg px-1 py-1 transition-colors hover:bg-white/5",onClick:()=>Hr(!1),title:"Show annotations",children:[(0,x.jsx)(K3,{}),(0,x.jsx)("span",{className:"grid h-5 min-w-5 place-items-center rounded-full bg-loupe-accent px-1.5 text-[11px] font-semibold text-loupe-bg",children:rs.length})]}),(0,x.jsx)(_S,{mode:n,onModeChange:os,compact:!0})]}):(0,x.jsxs)("section",{className:se("relative flex flex-col overflow-hidden rounded-2xl border border-loupe-line bg-loupe-panel/95 text-[13px] text-loupe-fg shadow-2xl shadow-black/50",a?"h-full w-full":"fixed bottom-3 right-3 top-3 z-[2147483646] w-[420px]"),children:[a?(0,x.jsx)(w3,{}):null,(0,x.jsxs)("header",{className:"flex min-h-12 shrink-0 cursor-grab items-center gap-2 border-b border-loupe-line px-3 py-2 active:cursor-grabbing","data-loupe-panel-drag":"",children:[(0,x.jsx)("div",{"data-loupe-panel-no-drag":"",children:(0,x.jsx)(b3,{options:Yd,selected:I1,value:C,open:K,onOpenChange:$,onValueChange:D=>{E(D),Q(null)}})}),(0,x.jsx)("div",{className:"ml-auto"}),(0,x.jsx)("div",{"data-loupe-panel-no-drag":"",children:(0,x.jsx)(_S,{mode:n,onModeChange:os,compact:!0})}),(0,x.jsx)(ne,{"data-loupe-panel-no-drag":"",variant:"ghost",size:"icon-sm",title:"Collapse annotations",onClick:()=>Hr(!0),children:(0,x.jsx)(Ci,{className:"h-4 w-4"})}),(0,x.jsx)(ne,{"data-loupe-panel-no-drag":"",variant:"ghost",size:"icon-sm",title:"Close annotations",onClick:e,children:(0,x.jsx)(La,{className:"h-4 w-4"})})]}),C==="library"?(0,x.jsxs)("div",{className:"flex shrink-0 items-center gap-2 border-b border-loupe-line/70 px-3 py-2.5",children:[(0,x.jsx)("span",{className:"text-[11px] text-loupe-muted",children:"References are sorted by capture date."}),(0,x.jsx)("span",{className:"ml-auto text-[11px] text-loupe-faint",children:c.length})]}):C==="recordings"?(0,x.jsxs)("div",{className:"flex shrink-0 items-center gap-2 border-b border-loupe-line/70 px-3 py-2.5",children:[(0,x.jsx)("span",{className:"text-[11px] text-loupe-muted",children:"Flow recordings with console + network logs."}),(0,x.jsx)("span",{className:"ml-auto text-[11px] text-loupe-faint",children:Zd})]}):(0,x.jsxs)("div",{className:"flex shrink-0 flex-col gap-2 border-b border-loupe-line/70 px-3 py-2.5",children:[uo?null:(0,x.jsxs)("div",{className:"relative",children:[(0,x.jsx)(ao,{className:"pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-loupe-faint"}),(0,x.jsx)(Yl,{className:"h-8 pl-8",type:"search",value:T,onChange:D=>z(D.target.value),placeholder:"Search annotations"})]}),(0,x.jsxs)("div",{className:"flex items-center gap-2",children:[(0,x.jsxs)(ne,{variant:"outline",size:"xs",onClick:()=>{pe(D=>!D),G&&uo?.status==="resolved"&&Q(null)},children:[G?(0,x.jsx)(Ul,{className:"h-3.5 w-3.5"}):(0,x.jsx)(Cr,{className:"h-3.5 w-3.5"}),G?"Hide resolved":"Show resolved"]}),Mh>0?(0,x.jsx)(G3,{count:Mh,onDone:async()=>{Q(null),await Jo()}}):null,k1?(0,x.jsxs)(ne,{variant:"outline",size:"xs",onClick:sn.clearGroupVisibility,children:[(0,x.jsx)(Cr,{className:"h-3.5 w-3.5"}),"Show all groups"]}):null,(0,x.jsxs)("span",{className:"ml-auto text-[11px] text-loupe-faint",children:[rs.length,"/",ln.length]})]})]}),(0,x.jsxs)("div",{ref:Dh,className:"flex-1 overflow-y-auto py-2",children:[uo&&C!=="recordings"&&C!=="library"?(0,x.jsx)(D3,{annotation:uo,ctx:sn}):C==="recordings"?(0,x.jsx)(N3,{recordings:d,ctx:sn}):C==="library"?(0,x.jsx)(H3,{refs:c,ctx:sn}):ls.length===0?(0,x.jsx)("div",{className:"px-6 py-12 text-center text-[12px] text-loupe-faint",children:R1>0&&!G?"Only resolved annotations here":C==="review"?"No annotations need review":C==="page"?"No annotations on this page yet":"No annotations yet"}):ls.map(D=>(0,x.jsx)(S3,{group:D.group,slug:D.slug,items:D.items,ctx:sn},D.slug)),!uo&&C!=="recordings"&&C!=="library"?(0,x.jsx)(L3,{onDone:Jo}):null]}),(0,x.jsx)(Z3,{})]})});return(0,x.jsxs)(x.Fragment,{children:[t?(0,GS.createPortal)((0,x.jsx)(Vi,{value:t,children:Th}),t):Th,(0,x.jsx)(V3,{annotations:s,showResolved:G,expanded:V,setExpanded:Q,setFilter:E,setCollapsed:Hr}),qt?(0,x.jsx)(j3,{src:qt,onClose:()=>Et(null)}):null]})}function b3({options:e,selected:t,value:a,open:o,onOpenChange:r,onValueChange:l}){return(0,x.jsxs)(Ed,{open:o,onOpenChange:r,children:[(0,x.jsx)(Dd,{asChild:!0,children:(0,x.jsxs)("button",{type:"button","aria-label":"Annotation view",className:"flex h-8 w-[190px] items-center justify-between gap-2 rounded-xl border border-loupe-line bg-loupe-bg/70 px-2.5 text-[12px] text-loupe-fg outline-none transition-colors hover:border-loupe-line-strong",children:[(0,x.jsx)(C3,{option:t}),(0,x.jsx)(wr,{className:"h-3.5 w-3.5 shrink-0 opacity-70"})]})}),(0,x.jsx)(Td,{align:"start",className:"w-[220px]",children:e.map(n=>(0,x.jsxs)(nh,{className:se(n.value===a&&"bg-foreground/5 text-foreground"),onSelect:()=>l(n.value),children:[(0,x.jsx)("span",{className:"grid h-5 min-w-6 place-items-center rounded-md border border-loupe-line bg-white/10 px-1.5 text-[10px] font-semibold leading-none text-loupe-muted",children:n.count}),(0,x.jsx)("span",{className:"min-w-0 flex-1 truncate",children:n.label}),(0,x.jsx)("span",{className:"ml-auto w-4 text-right text-[10px] text-loupe-faint",children:n.shortcut})]},n.value))})]})}var y3=[{dir:"n",className:"left-3 right-3 top-0 h-1.5 cursor-ns-resize"},{dir:"s",className:"left-3 right-3 bottom-0 h-1.5 cursor-ns-resize"},{dir:"e",className:"top-3 bottom-3 right-0 w-1.5 cursor-ew-resize"},{dir:"w",className:"top-3 bottom-3 left-0 w-1.5 cursor-ew-resize"},{dir:"nw",className:"top-0 left-0 h-3 w-3 cursor-nwse-resize"},{dir:"ne",className:"top-0 right-0 h-3 w-3 cursor-nesw-resize"},{dir:"sw",className:"bottom-0 left-0 h-3 w-3 cursor-nesw-resize"},{dir:"se",className:"bottom-0 right-0 h-3 w-3 cursor-nwse-resize"}];function w3(){return(0,x.jsx)(x.Fragment,{children:y3.map(e=>(0,x.jsx)("div",{"data-loupe-panel-no-drag":"","data-loupe-panel-resize":e.dir,className:se("absolute z-[2147483647]",e.className)},e.dir))})}function C3({option:e}){return(0,x.jsxs)("span",{className:"flex min-w-0 flex-1 items-center gap-2",children:[(0,x.jsx)("span",{className:"grid h-4 min-w-4 place-items-center rounded-full bg-loupe-fg px-1 text-[10px] font-semibold leading-none text-loupe-bg",children:e.count}),(0,x.jsx)("span",{className:"min-w-0 flex-1 truncate",children:e.label})]})}function S3({group:e,slug:t,items:a,ctx:o}){let r=a.filter(p=>p.status!=="resolved").length,l=o.collapsedGroups.has(t),n=o.actions.filter(p=>p.id!=="save"),[i,s]=M.useState(!1),[u,d]=M.useState(!1),[f,c]=M.useState(null),[m,b]=M.useState(null),v=M.useRef(null);async function w(p){if(!p||a.length===0)return;c(p),b(null);let g=await chrome.runtime.sendMessage({type:"group-run",slug:t,action:p});c(null),g.ok&&b(p)}async function h(){if(r===0)return;(await chrome.runtime.sendMessage({type:"resolve-group",slug:t})).ok&&(o.expanded&&a.some(g=>g.id===o.expanded)&&o.setExpanded(null),await o.reload())}return(0,x.jsxs)("div",{className:se("pb-1 transition-colors",o.dragOverGroup===t&&"bg-loupe-accent/5"),onDragOver:p=>{if(!aD(p))return;p.preventDefault(),p.dataTransfer.dropEffect="move";let g=o.draggingGroupSlug||p.dataTransfer.getData("application/x-loupe-group-slug");g?o.previewGroupReorder(g,t,HS(p)):o.setDragOverGroup(t)},onDragLeave:p=>{let g=p.relatedTarget;(!(g instanceof Node)||!p.currentTarget.contains(g))&&o.setDragOverGroup(null)},onDrop:p=>{p.preventDefault();let g=p.dataTransfer.getData("application/x-loupe-annotation-id"),y=p.dataTransfer.getData("application/x-loupe-group-slug");if(o.setDragOverGroup(null),g)o.moveAnnotation(g,e);else if(y){let S=WS(o.groupOrder,y,t,HS(p));o.commitGroupReorder(S)}},"data-loupe-group-slug":t,children:[(0,x.jsxs)("div",{ref:v,className:"group flex items-center gap-2 px-3.5 pb-1.5 pt-3 text-[11px] text-loupe-faint",children:[(0,x.jsx)("button",{type:"button",draggable:!0,className:"grid h-6 w-5 shrink-0 cursor-grab place-items-center rounded-md text-loupe-faint opacity-0 transition-all hover:bg-white/5 hover:text-loupe-muted focus-visible:opacity-100 group-hover:opacity-100 active:cursor-grabbing",title:"Drag to reorder group",onDragStart:p=>{p.dataTransfer.effectAllowed="move",p.dataTransfer.setData("application/x-loupe-group-slug",t);let g=v.current;if(g){let y=g.getBoundingClientRect();p.dataTransfer.setDragImage(g,p.clientX-y.left,p.clientY-y.top)}o.startGroupDrag(t)},onDragEnd:()=>o.cancelGroupReorder(),children:(0,x.jsx)(bi,{className:"h-3.5 w-3.5"})}),(0,x.jsxs)("button",{type:"button",className:"flex min-w-0 items-center gap-1.5 rounded-lg px-1 py-1 text-left transition-colors hover:bg-white/5",onClick:()=>o.toggleGroup(t),children:[(0,x.jsx)(eo,{className:se("h-3.5 w-3.5 shrink-0 transition-transform",!l&&"rotate-90")}),(0,x.jsx)("span",{className:"truncate text-[12px] font-medium text-loupe-muted",children:e}),(0,x.jsxs)("span",{className:"shrink-0",children:[r,"/",a.length]})]}),(0,x.jsx)(k3,{className:"ml-auto",actions:n,disabled:f!==null,itemCount:a.length,openCount:r,focused:o.focusedGroup===t,sentAction:m,sendingAction:f,onClearFocus:o.clearGroupVisibility,onDelete:()=>d(!0),onFocus:()=>o.focusGroup(t),onHide:()=>o.hideGroup(t),onRename:()=>s(!0),onResolveAll:()=>void h(),onSend:p=>void w(p)})]}),(0,x.jsx)(R3,{open:i,onOpenChange:s,slug:t,group:e,onDone:o.reload}),(0,x.jsx)(I3,{open:u,onOpenChange:d,slug:t,group:e,count:a.length,onDone:async()=>{o.clearGroupVisibility(),o.setExpanded(null),await o.reload()}}),l?null:(0,x.jsxs)("div",{className:"space-y-1 px-2",children:[a.map(p=>(0,x.jsx)(E3,{annotation:p,ctx:o},p.id)),a.length===0?(0,x.jsx)("div",{className:"rounded-xl border border-dashed border-loupe-line px-3 py-4 text-center text-[11px] text-loupe-faint",children:"Drop annotations here"}):null]})]})}function L3({onDone:e}){let[t,a]=M.useState(!1),[o,r]=M.useState(""),[l,n]=M.useState(!1);M.useEffect(()=>{t&&r("")},[t]);async function i(){let s=o.trim();if(!s)return;n(!0);let u=await chrome.runtime.sendMessage({type:"create-group",group:s});n(!1),u.ok&&(r(""),a(!1),await e())}return(0,x.jsx)("div",{className:"mx-2 mt-3 border-t border-loupe-line/70 pt-2",children:t?(0,x.jsxs)("form",{className:"rounded-xl border border-loupe-line bg-loupe-bg/50 p-2",onSubmit:s=>{s.preventDefault(),i()},children:[(0,x.jsx)(Yl,{autoFocus:!0,value:o,onChange:s=>r(s.target.value),placeholder:"Group name"}),(0,x.jsxs)("div",{className:"mt-2 flex items-center justify-end gap-1.5",children:[(0,x.jsx)(ne,{type:"button",variant:"outline",size:"xs",onClick:()=>a(!1),children:"Cancel"}),(0,x.jsx)(ne,{type:"submit",variant:"default",size:"xs",loading:l,disabled:!o.trim(),children:"OK"})]})]}):(0,x.jsxs)(ne,{type:"button",variant:"outline",size:"xs",className:"w-full",onClick:()=>a(!0),children:[(0,x.jsx)(Lr,{className:"h-3.5 w-3.5"}),"Add group"]})})}function R3({group:e,onDone:t,onOpenChange:a,open:o,slug:r}){let[l,n]=M.useState(e),[i,s]=M.useState(!1);M.useEffect(()=>{o&&n(e)},[e,o]);async function u(){let d=l.trim();if(!d||d===e){a(!1);return}s(!0);let f=await chrome.runtime.sendMessage({type:"rename-group",slug:r,group:d});s(!1),f.ok&&(a(!1),await t())}return o?(0,x.jsxs)("form",{className:"mx-2 mb-1 rounded-xl border border-loupe-line bg-loupe-bg/50 p-2",onSubmit:d=>{d.preventDefault(),u()},children:[(0,x.jsx)(Yl,{autoFocus:!0,value:l,onChange:d=>n(d.target.value),placeholder:"Group name"}),(0,x.jsxs)("div",{className:"mt-2 flex items-center justify-end gap-1.5",children:[(0,x.jsx)(ne,{type:"button",variant:"outline",size:"xs",onClick:()=>a(!1),children:"Cancel"}),(0,x.jsx)(ne,{type:"submit",variant:"default",size:"xs",loading:i,disabled:!l.trim(),children:"Save"})]})]}):null}function I3({count:e,group:t,onDone:a,onOpenChange:o,open:r,slug:l}){let[n,i]=M.useState(!1),[s,u]=M.useState(null);M.useEffect(()=>{r&&u(null)},[r]);async function d(){if(!n){u(null),i(!0);try{let f=await chrome.runtime.sendMessage({type:"delete-group",slug:l});if(!f.ok){u(f.error||"Could not delete this group.");return}o(!1),await a()}catch(f){u(String(f))}finally{i(!1)}}}return r?(0,x.jsxs)("div",{className:"mx-2 mb-1 rounded-xl border border-white/15 bg-white/5 p-2 text-[12px] text-loupe-muted",children:[(0,x.jsx)("div",{children:e>0?`Delete "${t}" and its ${e} annotation${e===1?"":"s"}?`:`Delete the empty "${t}" group?`}),s?(0,x.jsx)("div",{className:"mt-2 rounded-lg border border-red-400/25 bg-red-500/10 px-2 py-1.5 text-red-100",children:s}):null,(0,x.jsxs)("div",{className:"mt-2 flex items-center justify-end gap-1.5",children:[(0,x.jsx)(ne,{type:"button",variant:"outline",size:"xs",onClick:()=>o(!1),children:"Cancel"}),(0,x.jsx)(ne,{type:"button",variant:"destructive",size:"xs",loading:n,onClick:()=>void d(),children:"Delete"})]})]}):null}function k3({actions:e,className:t,disabled:a,focused:o,itemCount:r,openCount:l,sentAction:n,sendingAction:i,onClearFocus:s,onDelete:u,onFocus:d,onHide:f,onRename:c,onResolveAll:m,onSend:b}){let[v,w]=M.useState(!1);return(0,x.jsxs)(Ed,{open:v,onOpenChange:w,children:[(0,x.jsx)(Dd,{asChild:!0,children:(0,x.jsx)(ne,{type:"button",size:"icon-sm",variant:"ghost",className:se("opacity-70 transition-all hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100",v&&"opacity-100",t),title:"More group actions",onClick:h=>h.stopPropagation(),children:(0,x.jsx)(to,{className:"h-4 w-4"})})}),(0,x.jsxs)(Td,{align:"end",className:"w-48",children:[(0,x.jsx)(zr,{onSelect:f,icon:(0,x.jsx)(Ul,{className:"h-3.5 w-3.5"}),children:"Hide on this page"}),(0,x.jsx)(zr,{onSelect:o?s:d,icon:(0,x.jsx)(Cr,{className:"h-3.5 w-3.5"}),children:o?"Show all groups":"Focus this group"}),(0,x.jsx)(ih,{}),(0,x.jsx)(zr,{disabled:l===0,onSelect:m,icon:(0,x.jsx)(Ho,{className:"h-3.5 w-3.5"}),children:l>0?`Resolve all (${l})`:"Resolve all"}),(0,x.jsx)(zr,{onSelect:c,icon:(0,x.jsx)(Ri,{className:"h-3.5 w-3.5"}),children:"Rename"}),(0,x.jsx)(zr,{onSelect:u,icon:(0,x.jsx)(oo,{className:"h-3.5 w-3.5"}),tone:"danger",children:"Delete"}),e.length>0?(0,x.jsx)(ih,{}):null,e.map(h=>{let p=i===h.id,g=n===h.id;return(0,x.jsx)(zr,{disabled:a||r===0,icon:p?(0,x.jsx)(Zl,{className:"h-3.5 w-3.5"}):(0,x.jsx)(XS,{action:h,colored:!0}),onSelect:()=>b(h.id),children:p?`Sending to ${Jl(h)}`:g?`Sent to ${Jl(h)}`:`Send to ${Jl(h)}`},h.id)})]})]})}function zr({children:e,disabled:t,icon:a,onSelect:o,tone:r="normal"}){return(0,x.jsxs)(nh,{disabled:t,variant:r==="danger"?"destructive":"default",onSelect:()=>o(),children:[(0,x.jsx)("span",{className:"grid h-4 w-4 shrink-0 place-items-center",children:a}),(0,x.jsx)("span",{className:"min-w-0 truncate",children:e})]})}function XS({action:e,colored:t=!1}){let a=A3(e);return a?(0,x.jsx)("span",{"aria-hidden":"true",className:se("inline-flex h-[15px] w-[15px] shrink-0 items-center justify-center [&>svg]:block [&>svg]:h-[15px] [&>svg]:w-[15px]",t&&M3(e)),dangerouslySetInnerHTML:{__html:a}}):(0,x.jsx)(mi,{className:"h-3.5 w-3.5 shrink-0"})}function A3(e){let t=`${e?.id??""} ${e?.label??""}`.toLowerCase();return t.includes("claude")?c3:t.includes("codex")||t.includes("openai")?p3:t.includes("copilot")?x3:jS(e)?g3:null}function M3(e){let t=`${e?.id??""} ${e?.label??""}`.toLowerCase();return t.includes("claude")?"text-[#d97757]":t.includes("codex")||t.includes("openai")||t.includes("copilot")||jS(e)?"text-loupe-fg":"text-loupe-muted"}function jS(e){return e?.id==="pi"||e?.label?.toLowerCase()==="pi"}function E3({annotation:e,ctx:t}){let a=t.expanded===e.id,o=_r(t.bridgeUrl,e.dir,"shot.png",{pageUrl:location.href,repoRoot:t.repoRoot}),r=Pa(e.url)!==Pa(location.href);return(0,x.jsx)("article",{draggable:!0,className:se("rounded-xl border border-transparent bg-transparent transition-colors hover:bg-white/[0.04]",a&&"border-loupe-line bg-white/[0.04]"),onDragStart:l=>{l.dataTransfer.effectAllowed="move",l.dataTransfer.setData("application/x-loupe-annotation-id",e.id)},onDragEnd:()=>t.setDragOverGroup(null),children:(0,x.jsxs)("button",{type:"button",className:"flex w-full items-start gap-2 p-2 text-left",onClick:()=>t.setExpanded(e.id),children:[(0,x.jsx)("img",{src:o,alt:"",className:"h-11 w-14 shrink-0 rounded-lg border border-loupe-line bg-loupe-bg object-cover",onError:l=>l.currentTarget.remove()}),(0,x.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,x.jsx)("div",{className:"truncate text-[12.5px] font-medium text-loupe-fg",children:mh(e)}),e.note?(0,x.jsx)("div",{className:"mt-0.5 line-clamp-2 text-[12px] leading-snug text-loupe-muted",children:e.note}):null,(0,x.jsxs)("div",{className:"mt-1 flex flex-wrap items-center gap-1.5",children:[(0,x.jsx)(ph,{status:e.status}),r?(0,x.jsx)(Da,{variant:"outline",children:Fr(e.url)}):null]})]}),(0,x.jsx)(ne,{variant:"outline",size:"icon-sm",title:r?"Open annotation page":"Jump to annotation",onClick:l=>{l.stopPropagation(),Q3(e,t)},children:(0,x.jsx)(Nl,{className:"h-3.5 w-3.5"})})]})})}function D3({annotation:e,ctx:t}){let[a,o]=M.useState(null),[r,l]=M.useState(null),n=t.actions.filter(u=>u.id!=="save"),i=_r(t.bridgeUrl,e.dir,"shot.png",{pageUrl:location.href,repoRoot:t.repoRoot});async function s(u){if(!u)return;o(u),l(null);let d=await chrome.runtime.sendMessage({type:"annotation-run",id:e.id,action:u});o(null),d.ok&&l(u)}return(0,x.jsxs)("div",{className:"px-2 pb-2",children:[(0,x.jsxs)("div",{className:"mb-2 flex items-center gap-2 border-b border-loupe-line/70 px-1 pb-2",children:[(0,x.jsx)(ne,{variant:"ghost",size:"icon-sm",title:"Back to annotations",onClick:()=>t.setExpanded(null),children:(0,x.jsx)(pi,{className:"h-4 w-4"})}),(0,x.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,x.jsx)("div",{className:"truncate text-[12.5px] font-medium text-loupe-fg",children:mh(e)}),(0,x.jsxs)("div",{className:"mt-0.5 flex flex-wrap items-center gap-1.5",children:[(0,x.jsx)(ph,{status:e.status}),(0,x.jsx)(Da,{variant:"outline",children:e.group||"Inbox"})]})]}),(0,x.jsx)(P3,{actions:n,disabled:a!==null,sentAction:r,sendingAction:a,onSend:u=>void s(u)})]}),(0,x.jsx)(T3,{src:i,onOpen:()=>t.setLightbox(i)}),(0,x.jsx)(O3,{annotation:e,ctx:t})]})}function T3({src:e,onOpen:t}){let[a,o]=M.useState(!1);return(0,x.jsx)("div",{className:"mb-2 overflow-hidden rounded-xl border border-loupe-line bg-loupe-bg",children:a?(0,x.jsx)("div",{className:"grid min-h-28 place-items-center px-4 py-8 text-center text-[12px] text-loupe-faint",children:"Annotation image could not be loaded"}):(0,x.jsx)("button",{type:"button",className:"block w-full text-left transition-colors hover:bg-white/[0.03]",onClick:t,title:"Open annotation image",children:(0,x.jsx)("img",{src:e,alt:"Annotation screenshot",className:"max-h-72 w-full bg-loupe-bg object-contain",onError:()=>o(!0)})})})}function P3({actions:e,disabled:t,sentAction:a,sendingAction:o,onSend:r}){let[l,n]=M.useState(!1);return(0,x.jsxs)(Ed,{open:l,onOpenChange:n,children:[(0,x.jsx)(Dd,{asChild:!0,children:(0,x.jsx)(ne,{type:"button",size:"icon-sm",variant:"outline",title:"Send annotation",disabled:e.length===0,onClick:i=>i.stopPropagation(),children:(0,x.jsx)(to,{className:"h-4 w-4"})})}),(0,x.jsx)(Td,{align:"end",className:"w-52",children:e.map(i=>{let s=o===i.id,u=a===i.id;return(0,x.jsx)(zr,{disabled:t,icon:s?(0,x.jsx)(Zl,{className:"h-3.5 w-3.5"}):(0,x.jsx)(XS,{action:i,colored:!0}),onSelect:()=>r(i.id),children:s?`Sending to ${Jl(i)}`:u?`Sent to ${Jl(i)}`:`Send to ${Jl(i)}`},i.id)})})]})}function O3({annotation:e,ctx:t}){let[a,o]=M.useState(e.note??""),[r,l]=M.useState(!1),[n,i]=M.useState(null),s=M.useRef(null),u=e;async function d(){l(!0);let b=await chrome.runtime.sendMessage({type:"update-annotation",id:e.id,patch:{note:a}});l(!1),b.ok&&await t.reload()}async function f(b){(await chrome.runtime.sendMessage({type:"update-annotation",id:e.id,patch:{status:b}})).ok&&await t.reload()}async function c(b,v){i({tone:"muted",text:"Attaching reference..."});let w=await chrome.runtime.sendMessage({type:"add-reference",id:e.id,reference:{caption:v,dataUrl:b}});if(!w.ok){let h=w.error||"couldn't attach reference";throw i({tone:"error",text:h}),new Error(h)}await t.reload(),i({tone:"ok",text:"Reference attached"})}let m=(e.references??[]).map(b=>b.file).filter(b=>!!b);return(0,x.jsxs)("div",{className:"border-t border-loupe-line px-2 pb-2 pt-2",children:[m.length>0?(0,x.jsx)("div",{className:"mb-2 flex flex-wrap gap-1.5",children:m.map(b=>{let v=_r(t.bridgeUrl,e.dir,b,{pageUrl:location.href,repoRoot:t.repoRoot});return(0,x.jsx)("button",{type:"button",className:"h-16 overflow-hidden rounded-lg border border-loupe-line bg-loupe-bg",onClick:()=>t.setLightbox(v),children:(0,x.jsx)("img",{src:v,alt:"",className:"h-full w-auto object-cover"})},b)})}):null,u.resolution?.primary?(0,x.jsx)("div",{className:"mb-2 break-all font-mono text-[11px] text-loupe-faint",children:u.resolution.primary}):null,(0,x.jsx)(ji,{value:a,onChange:b=>o(b.target.value),placeholder:"Annotation note..."}),(0,x.jsxs)("div",{className:"mt-2 flex items-center gap-1.5",children:[(0,x.jsx)("input",{ref:s,type:"file",accept:"image/*",className:"hidden",onChange:async b=>{let v=b.currentTarget.files?.[0];if(v)try{await c(await dD(v),v.name),b.currentTarget.value=""}catch{}}}),(0,x.jsxs)(ne,{variant:"outline",size:"xs",onClick:()=>s.current?.click(),children:[(0,x.jsx)(yi,{className:"h-3.5 w-3.5"}),"Add ref"]}),(0,x.jsx)(q3,{bridgeUrl:t.bridgeUrl,repoRoot:t.repoRoot,refs:t.references,onAttach:async b=>{let v=await chrome.runtime.sendMessage({type:"reference-image",id:b.id});if(!v.ok)throw new Error(v.error);await c(v.dataUrl,b.note||b.title||"library reference")}})]}),n?(0,x.jsx)("div",{className:se("mt-1.5 rounded-md border px-2 py-1 text-[11px]",n.tone==="ok"&&"border-loupe-accent/25 bg-loupe-accent/10 text-loupe-muted",n.tone==="error"&&"border-white/25 bg-white/10 text-loupe-fg",n.tone==="muted"&&"border-loupe-line bg-loupe-bg/60 text-loupe-faint"),children:n.text}):null,(0,x.jsxs)("div",{className:"mt-2 flex items-center gap-1.5",children:[(0,x.jsx)(ne,{variant:"default",size:"xs",loading:r,onClick:()=>void d(),children:"Save"}),(0,x.jsx)(ne,{variant:"outline",size:"xs",onClick:()=>void f(e.status==="resolved"?"open":"resolved"),children:e.status==="resolved"?"Reopen":"Resolve"}),(0,x.jsx)(KS,{annotation:e,onDone:async()=>{t.setExpanded(null),await t.reload()}})]})]})}function B3(e){return e.recording??{}}function N3({recordings:e,ctx:t}){let a=t.showResolved?e:e.filter(o=>o.status!=="resolved");return e.length===0?(0,x.jsxs)("div",{className:"px-6 py-12 text-center text-[12px] text-loupe-faint",children:["No flow recordings yet \u2014 press ",(0,x.jsx)("span",{className:"font-semibold text-loupe-muted",children:"R"})," while capturing to record one."]}):a.length===0?(0,x.jsx)("div",{className:"px-6 py-12 text-center text-[12px] text-loupe-faint",children:"Only resolved recordings here"}):(0,x.jsx)("div",{className:"space-y-2 px-2",children:a.map(o=>(0,x.jsx)(U3,{recording:o,ctx:t},o.id))})}function U3({recording:e,ctx:t}){let a=t.expanded===e.id,o=B3(e),r=o.counts??{},l=r.failedRequests??0,n=r.errors??0,i=_r(t.bridgeUrl,e.dir,o.video||"recording.webm",{pageUrl:location.href,repoRoot:t.repoRoot}),s=_3(o),[u,d]=M.useState(e.note??""),[f,c]=M.useState(!1);async function m(){c(!0);let v=await chrome.runtime.sendMessage({type:"update-annotation",id:e.id,patch:{note:u}});c(!1),v.ok&&await t.reload()}async function b(v){(await chrome.runtime.sendMessage({type:"update-annotation",id:e.id,patch:{status:v}})).ok&&await t.reload()}return(0,x.jsxs)("article",{className:se("overflow-hidden rounded-xl border bg-transparent transition-colors",a?"border-loupe-line bg-white/[0.04]":"border-transparent hover:bg-white/[0.04]"),children:[(0,x.jsx)(F3,{videoSrc:i,keyframes:s,recordingDir:e.dir,ctx:t}),(0,x.jsxs)("button",{type:"button",className:"flex w-full items-start gap-2 p-2 text-left",onClick:()=>t.setExpanded(a?null:e.id),children:[(0,x.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,x.jsx)("div",{className:"truncate text-[12.5px] font-medium text-loupe-fg",children:e.title||Fr(e.url)}),e.note?(0,x.jsx)("div",{className:"mt-0.5 line-clamp-2 text-[12px] leading-snug text-loupe-muted",children:e.note}):null,(0,x.jsxs)("div",{className:"mt-1 flex flex-wrap items-center gap-1.5",children:[(0,x.jsx)(ph,{status:e.status}),o.durationMs?(0,x.jsx)(Da,{variant:"outline",children:z3(o.durationMs)}):null,(0,x.jsxs)(Da,{variant:"outline",children:[r.console??0," console"]}),(0,x.jsxs)(Da,{variant:"outline",children:[r.network??0," net"]}),n+l>0?(0,x.jsxs)(Da,{variant:"outline",className:"text-amber-300",children:[n+l," error",n+l===1?"":"s"]}):null]})]}),(0,x.jsx)(eo,{className:se("mt-1 h-4 w-4 shrink-0 text-loupe-faint transition-transform",a&&"rotate-90")})]}),a?(0,x.jsxs)("div",{className:"border-t border-loupe-line px-2 pb-2 pt-2",children:[(0,x.jsx)("div",{className:"mb-2 break-all font-mono text-[11px] text-loupe-faint",children:e.url}),(0,x.jsx)(ji,{value:u,onChange:v=>d(v.target.value),placeholder:"Recording note..."}),(0,x.jsxs)("div",{className:"mt-2 flex items-center gap-1.5",children:[(0,x.jsx)(ne,{variant:"default",size:"xs",loading:f,onClick:()=>void m(),children:"Save"}),(0,x.jsx)(ne,{variant:"outline",size:"xs",onClick:()=>void b(e.status==="resolved"?"open":"resolved"),children:e.status==="resolved"?"Reopen":"Resolve"}),(0,x.jsx)(KS,{annotation:e,onDone:async()=>{t.setExpanded(null),await t.reload()}})]})]}):null]})}function z3(e){let t=Math.max(0,Math.floor(e/1e3));return`${Math.floor(t/60)}:${(t%60).toString().padStart(2,"0")}`}function F3({ctx:e,keyframes:t,recordingDir:a,videoSrc:o}){let[r,l]=M.useState(!1),n=t[0];if(!r)return(0,x.jsx)("video",{src:o,controls:!0,preload:"metadata",className:"aspect-video w-full border-b border-loupe-line bg-black",onError:()=>l(!0)});if(n){let i=_r(e.bridgeUrl,a,n.file,{pageUrl:location.href,repoRoot:e.repoRoot});return(0,x.jsx)("button",{type:"button",className:"block aspect-video w-full border-b border-loupe-line bg-black text-left",onClick:()=>e.setLightbox(i),title:n.label||"Open recording keyframe",children:(0,x.jsx)("img",{src:i,alt:"",className:"h-full w-full object-contain"})})}return(0,x.jsx)("div",{className:"grid aspect-video w-full place-items-center border-b border-loupe-line bg-black/40 px-4 text-center text-[11px] text-loupe-faint",children:"No video or keyframes captured"})}function _3(e){let t=(e.keyframes??[]).filter(a=>!!a.file);return t.length>0?t:(e.files?.keyframes??[]).map(a=>({file:a}))}function H3({refs:e,ctx:t}){let[a,o]=M.useState(""),[r,l]=M.useState(null),[n,i]=M.useState(null),s=M.useMemo(()=>rD(e,a),[e,a]);async function u(f){if(!window.confirm("Delete this library reference?"))return;l(f.id),i(null);let c=await chrome.runtime.sendMessage({type:"delete-reference",id:f.id});if(l(null),!c.ok){i(c.error||"couldn't delete reference");return}await t.reload()}async function d(f,c){if(!window.confirm(`Delete ${c} reference${c===1?"":"s"} from this page?`))return;l(f),i(null);let m=await chrome.runtime.sendMessage({type:"delete-reference-page",url:f});if(l(null),!m.ok){i(m.error||"couldn't delete page references");return}await t.reload()}return(0,x.jsxs)("div",{className:"space-y-3 px-3 pb-3",children:[(0,x.jsx)(Yl,{value:a,onChange:f=>o(f.target.value),type:"search",placeholder:"Search library"}),n?(0,x.jsx)("div",{className:"rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-loupe-fg",children:n}):null,e.length===0?(0,x.jsx)("div",{className:"rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint",children:"No saved references yet"}):s.length===0?(0,x.jsx)("div",{className:"rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint",children:"No matches"}):s.map(f=>(0,x.jsxs)("section",{className:"overflow-hidden rounded-xl border border-loupe-line bg-loupe-bg/35",children:[(0,x.jsxs)("div",{className:"flex items-start gap-2 border-b border-loupe-line px-3 py-2",children:[(0,x.jsxs)("div",{className:"min-w-0",children:[(0,x.jsx)("div",{className:"line-clamp-1 text-[12px] font-semibold text-loupe-fg",children:f.title||Fr(f.url)}),(0,x.jsx)("div",{className:"mt-0.5 line-clamp-1 text-[10.5px] text-loupe-faint",children:f.url})]}),(0,x.jsx)(Da,{variant:"outline",className:"ml-auto shrink-0",children:f.items.length}),(0,x.jsxs)(ne,{variant:"destructive",size:"xs",className:"shrink-0",disabled:r!==null,onClick:()=>void d(f.url,f.items.length),title:"Delete page references",children:[(0,x.jsx)(oo,{className:"h-3.5 w-3.5"}),"Page"]})]}),(0,x.jsx)("div",{className:"grid grid-cols-1 gap-2 p-2 sm:grid-cols-2",children:f.items.map(c=>{let m=_r(t.bridgeUrl,c.dir,"shot.png",{pageUrl:location.href,repoRoot:t.repoRoot});return(0,x.jsxs)("article",{className:"overflow-hidden rounded-lg border border-loupe-line bg-loupe-panel/55",children:[(0,x.jsx)("button",{type:"button",className:"block aspect-[16/9] w-full border-b border-loupe-line bg-black/40",onClick:()=>t.setLightbox(m),children:(0,x.jsx)("img",{src:m,alt:"",className:"h-full w-full object-cover"})}),(0,x.jsxs)("div",{className:"space-y-1 p-2.5",children:[(0,x.jsx)("div",{className:"line-clamp-1 text-[12px] font-medium text-loupe-fg",children:c.note||c.title||"Untitled reference"}),(0,x.jsx)("div",{className:"text-[10.5px] text-loupe-faint",children:JS(c.createdAt)}),(0,x.jsxs)("div",{className:"flex items-center gap-1.5 pt-1",children:[c.url?(0,x.jsxs)(ne,{variant:"outline",size:"xs",onClick:()=>window.open(c.url,"_blank","noopener,noreferrer"),children:[(0,x.jsx)(Nl,{className:"h-3.5 w-3.5"}),"Open"]}):null,(0,x.jsxs)(ne,{className:"ml-auto",variant:"destructive",size:"xs",loading:r===c.id,disabled:r!==null,onClick:()=>void u(c),children:[r===c.id?null:(0,x.jsx)(oo,{className:"h-3.5 w-3.5"}),"Delete"]})]})]})]},c.id)})})]},f.url))]})}function q3({bridgeUrl:e,repoRoot:t,refs:a,onAttach:o}){let[r,l]=M.useState(!1),[n,i]=M.useState(""),[s,u]=M.useState(()=>new Set),[d,f]=M.useState(null),[c,m]=M.useState(null),b=M.useMemo(()=>oD(a,n),[a,n]);async function v(h){f(h.id),m(null);try{await o(h),l(!1)}catch(p){m(p instanceof Error?p.message:String(p))}finally{f(null)}}function w(h){u(p=>{let g=new Set(p);return g.has(h)?g.delete(h):g.add(h),g})}return(0,x.jsxs)("div",{className:se("relative",r&&"basis-full"),"data-loupe-library-popover":r?"":void 0,children:[(0,x.jsxs)(ne,{type:"button",variant:"outline",size:"xs","aria-expanded":r,onClick:()=>l(h=>!h),children:[(0,x.jsx)(Sr,{className:"h-3.5 w-3.5"}),"From library"]}),r?(0,x.jsxs)("div",{className:"mt-2 flex max-h-96 w-full flex-col overflow-hidden rounded-xl border border-loupe-line bg-loupe-panel text-loupe-fg shadow-xl shadow-black/40",children:[(0,x.jsxs)("div",{className:"flex items-start gap-3 border-b border-loupe-line px-3 py-2.5",children:[(0,x.jsxs)("div",{className:"min-w-0",children:[(0,x.jsx)("div",{className:"text-[13px] font-semibold leading-none",children:"Reference library"}),(0,x.jsx)("div",{className:"mt-1 text-[11px] text-loupe-muted",children:"Choose a capture to attach."})]}),(0,x.jsx)(ne,{variant:"ghost",size:"icon-sm",className:"ml-auto h-7 w-7",title:"Close library",onClick:()=>l(!1),children:(0,x.jsx)(La,{className:"h-3.5 w-3.5"})})]}),(0,x.jsx)("div",{className:"border-b border-loupe-line p-2.5",children:(0,x.jsx)(Yl,{className:"h-8",type:"search",value:n,onChange:h=>i(h.target.value),placeholder:"Search library"})}),(0,x.jsxs)("div",{className:"flex-1 overflow-y-auto p-2.5",children:[c?(0,x.jsx)("div",{className:"mb-3 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-loupe-fg",children:c}):null,a.length===0?(0,x.jsx)("div",{className:"rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint",children:"No saved references yet"}):b.length===0?(0,x.jsx)("div",{className:"rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint",children:"No matches"}):(0,x.jsx)("div",{className:"space-y-4",children:b.map(([h,p])=>(0,x.jsxs)("section",{className:"space-y-2",children:[(0,x.jsxs)("button",{type:"button",className:"flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[11px] font-medium text-loupe-muted transition-colors hover:bg-white/5 hover:text-loupe-fg",onClick:()=>w(h),children:[(0,x.jsx)(eo,{className:se("h-3.5 w-3.5 shrink-0 transition-transform",(n.trim()||!s.has(h))&&"rotate-90")}),(0,x.jsx)("span",{children:h}),(0,x.jsx)("span",{className:"ml-auto text-loupe-faint",children:p.length})]}),n.trim()||!s.has(h)?(0,x.jsx)("div",{className:"grid grid-cols-1 gap-2 sm:grid-cols-2",children:p.map(g=>{let y=_r(e,g.dir,"shot.png",{pageUrl:location.href,repoRoot:t});return(0,x.jsxs)("button",{type:"button",className:"group overflow-hidden rounded-xl border border-loupe-line bg-loupe-bg/70 text-left transition-all hover:border-loupe-line-strong hover:bg-white/[0.04] active:scale-[0.99]",onClick:()=>void v(g),disabled:d!==null,children:[(0,x.jsx)("div",{className:"aspect-[16/9] border-b border-loupe-line bg-black/40",children:(0,x.jsx)("img",{src:y,alt:"",className:"h-full w-full object-cover"})}),(0,x.jsxs)("div",{className:"space-y-1 p-2.5",children:[(0,x.jsx)("div",{className:"line-clamp-1 text-[12px] font-medium text-loupe-fg",children:g.note||g.title||"Untitled reference"}),(0,x.jsx)("div",{className:"line-clamp-1 text-[10.5px] text-loupe-faint",children:g.url||g.id}),(0,x.jsx)("div",{className:"text-[10.5px] text-loupe-faint",children:JS(g.createdAt)}),(0,x.jsx)("div",{className:"flex items-center gap-1 pt-1 text-[11px] font-medium text-loupe-muted group-hover:text-loupe-fg",children:d===g.id?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(Zl,{className:"h-3 w-3"}),"Attaching"]}):"Attach"})]})]},g.id)})}):null]},h))})]})]}):null]})}function KS({annotation:e,onDone:t}){let[a,o]=M.useState(!1),[r,l]=M.useState(!1);return(0,x.jsxs)("div",{className:"ml-auto flex items-center gap-1.5",children:[r?(0,x.jsx)(ne,{type:"button",variant:"outline",size:"xs",onClick:()=>l(!1),children:"Cancel"}):null,(0,x.jsxs)(ne,{variant:"destructive",size:"xs",loading:a,onClick:async()=>{if(!r){l(!0);return}o(!0);let n=await chrome.runtime.sendMessage({type:"delete-annotation",id:e.id});o(!1),l(!1),n.ok&&await t()},children:[a?null:(0,x.jsx)(oo,{className:"h-3.5 w-3.5"}),r?"Confirm":"Delete"]})]})}function G3({count:e,onDone:t}){let[a,o]=M.useState(!1),[r,l]=M.useState(!1);return(0,x.jsxs)("div",{className:"flex items-center gap-1.5",children:[r?(0,x.jsx)(ne,{type:"button",variant:"outline",size:"xs",onClick:()=>l(!1),children:"Cancel"}):null,(0,x.jsxs)(ne,{variant:"destructive",size:"xs",loading:a,onClick:async()=>{if(!r){l(!0);return}o(!0);let n=await chrome.runtime.sendMessage({type:"delete-resolved"});o(!1),l(!1),n.ok&&await t()},children:[a?null:(0,x.jsx)(oo,{className:"h-3.5 w-3.5"}),r?`Confirm ${e}`:"Delete resolved"]})]})}function V3({annotations:e,showResolved:t,expanded:a,setExpanded:o,setFilter:r,setCollapsed:l}){let n=Pa(location.href),i=e.filter(s=>Pa(s.url)===n&&(t||s.status!=="resolved"));return(0,x.jsxs)(x.Fragment,{children:[i.map((s,u)=>{let d=Yi(s);return(0,x.jsx)("button",{type:"button",title:d.anchored?void 0:"Couldn't locate the original element \u2014 showing its last known position",className:se("fixed z-[2147483645] grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[11px] font-semibold shadow-lg shadow-black/45 ring-2 transition-colors",a===s.id?"border-amber-200/80 bg-amber-300 text-black ring-amber-400/35":"border-white/35 bg-loupe-bg/95 text-loupe-fg ring-white/35",d.anchored?"":"border-dashed opacity-60"),style:{left:d.x,top:d.y},onClick:()=>{o(s.id),r("page"),l(!1)},children:u+1},s.id)}),a?(0,x.jsx)(X3,{annotation:e.find(s=>s.id===a)}):null]})}function X3({annotation:e}){if(!e||Pa(e.url)!==Pa(location.href))return null;let t=Yi(e);return(0,x.jsx)("div",{className:se("pointer-events-none fixed z-[2147483644] rounded border border-amber-300/90 bg-amber-300/15 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_0_0_4px_rgba(251,191,36,0.12)]",t.anchored?"":"border-dashed opacity-70"),style:{left:t.x,top:t.y,width:t.width,height:t.height}})}function j3({src:e,onClose:t}){return(0,x.jsxs)("div",{className:"fixed inset-0 z-[2147483647] grid place-items-center bg-black/80 p-6",onClick:t,children:[(0,x.jsx)(ne,{className:"fixed right-4 top-4 bg-white/10",variant:"ghost",size:"icon-sm",onClick:t,children:(0,x.jsx)(La,{className:"h-4 w-4"})}),(0,x.jsx)("img",{src:e,alt:"annotation screenshot",className:"max-h-full max-w-full rounded-lg border border-loupe-line bg-loupe-bg object-contain shadow-2xl shadow-black/50",onClick:a=>a.stopPropagation()})]})}function K3(){return(0,x.jsx)("span",{className:"grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-lg border border-loupe-line bg-loupe-elev/85",children:(0,x.jsx)(ao,{className:"h-4 w-4 text-loupe-muted"})})}function W3(e){return e==="needs_review"?"Needs review":e==="resolved"?"Resolved":"Open"}function ph({status:e}){return e==="needs_review"?(0,x.jsx)(Da,{variant:"outline",title:"Needs review",className:"text-amber-300",children:(0,x.jsx)(_o,{className:"h-3 w-3"})}):(0,x.jsx)(Da,{variant:"outline",children:W3(e)})}function Z3(){return(0,x.jsxs)("footer",{className:"flex shrink-0 items-center justify-between gap-3 border-t border-loupe-line px-3 py-2 text-loupe-muted",children:[(0,x.jsxs)("span",{className:"inline-flex items-center gap-1.5 text-[11px] font-medium",children:[(0,x.jsx)("span",{className:"grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-full border border-loupe-line bg-loupe-elev/85",children:(0,x.jsx)(ao,{className:"h-3 w-3"})}),"Powered by Loupe"]}),(0,x.jsxs)("button",{type:"button",title:"Open Loupe on GitHub",className:"inline-flex h-7 items-center gap-1.5 rounded-md border border-loupe-line bg-transparent px-2 text-[11px] font-semibold text-loupe-muted transition-colors hover:border-loupe-line-strong hover:text-loupe-fg",onClick:()=>window.open(m3,"_blank","noopener,noreferrer"),children:[(0,x.jsx)("span",{className:"grid h-3.5 w-3.5 place-items-center",dangerouslySetInnerHTML:{__html:h3}}),"GitHub"]})]})}function Y3(e,t){let a=M.useRef(new Map);M.useLayoutEffect(()=>{let o=e.current;if(!o||typeof window<"u"&&window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return;let r=Array.from(o.querySelectorAll(":scope > [data-loupe-group-slug]")),l=new Map;for(let n of r){let i=n.getAttribute("data-loupe-group-slug");if(!i)continue;let s=n.getBoundingClientRect().top;l.set(i,s);let u=a.current.get(i);if(u===void 0||u===s)continue;let d=u-s;n.style.transition="none",n.style.transform=`translateY(${d}px)`,requestAnimationFrame(()=>{n.style.transition="transform 200ms cubic-bezier(0.2, 0, 0, 1)",n.style.transform=""})}a.current=l},[e,t])}function Q3(e,t){if(Pa(e.url)!==Pa(location.href)){location.href=e.url;return}t.setFilter("page"),t.setExpanded(e.id),t.setCollapsed(!1);let a=Yi(e);window.scrollTo({top:Math.max(0,a.y+window.scrollY-96),behavior:"smooth"})}async function J3(){let e=await chrome.runtime.sendMessage({type:"actions"});return e.ok?e.actions:[]}async function $3(){let e=await chrome.runtime.sendMessage({type:"groups"});return e.ok?e.groups:[]}function eD(e,t){let a=new Map;for(let o of t)a.set(o.slug,{group:o.group,slug:o.slug,items:[]});for(let o of e){let r=o.groupSlug||ZS(o.group),l=a.get(r);l?l.items.push(o):a.set(r,{group:o.group||r,slug:r,items:[o]})}return[...a.values()]}function tD(e,t){if(!t)return e;let a=new Map(e.map(l=>[l.slug,l])),o=t.map(l=>a.get(l)).filter(l=>!!l),r=e.filter(l=>!t.includes(l.slug));return[...o,...r]}function WS(e,t,a,o){if(t===a||!e.includes(t)||!e.includes(a))return e;let r=e.filter(i=>i!==t),l=r.indexOf(a);if(l<0)return e;let n=o==="after"?l+1:l;return[...r.slice(0,n),t,...r.slice(n)]}function HS(e){let t=e.currentTarget.getBoundingClientRect();return e.clientY>t.top+t.height/2?"after":"before"}function qS(e,t){return e.length===t.length&&e.every((a,o)=>a===t[o])}function ZS(e){return(e??"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"inbox"}function aD(e){let t=Array.from(e.dataTransfer.types);return t.includes("application/x-loupe-annotation-id")||t.includes("application/x-loupe-group-slug")}function oD(e,t){let a=Ta(t),o=new Map;for(let r of e){let l=Fr(r.url),n=Ta(l).includes(a),i=QS(r,a);a&&!n&&!i||(o.get(l)??o.set(l,[]).get(l)).push(r)}return[...o.entries()].map(([r,l])=>[r,YS(l)]).sort(([,r],[,l])=>$l(l[0])-$l(r[0]))}function rD(e,t){let a=Ta(t),o=new Map;for(let r of e){let l=r.url||"Unknown source",n=Ta(l).includes(a)||Ta(r.title).includes(a)||Ta(Fr(r.url)).includes(a);if(a&&!n&&!QS(r,a))continue;let i=o.get(l)??{url:l,title:r.title||Fr(r.url),items:[]};!i.title&&r.title&&(i.title=r.title),i.items.push(r),o.set(l,i)}return[...o.values()].map(r=>({...r,items:YS(r.items)})).sort((r,l)=>$l(l.items[0])-$l(r.items[0]))}function YS(e){return[...e].sort((t,a)=>$l(a)-$l(t))}function QS(e,t){return t?[e.note,e.title,e.url,e.id,e.createdAt].some(a=>Ta(a).includes(t)):!0}function $l(e){let t=Date.parse(e?.createdAt??"");return Number.isNaN(t)?0:t}function Ta(e){return(e??"").toLowerCase().trim()}function JS(e){if(!e)return"Capture date unknown";let t=new Date(e);return Number.isNaN(t.getTime())?"Capture date unknown":t.toLocaleString(void 0,{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"})}function mh(e){return e.target.componentChain.map(t=>t.name).join(" \u203A ")||e.target.tag}function lD(e,t){return t?[e.note,mh(e),e.group,e.groupSlug,e.title,Fr(e.url),e.target.text].some(a=>Ta(a??void 0).includes(t)):!0}function _r(e,t,a,o={}){let r=new URL("/file",e.endsWith("/")?e:`${e}/`);return r.searchParams.set("path",`${t}/${a}`),o.pageUrl&&r.searchParams.set("pageUrl",o.pageUrl),o.repoRoot&&r.searchParams.set("repoRoot",o.repoRoot),r.toString()}function Pa(e){return(e??"").split("#")[0]??""}function Jl(e){let t=e.label.replace(/^\s*(?:→|->|➜|›|»)\s*/,"").trim()||e.id,a=t.search(/[A-Za-z]/);return a<0?t:t.slice(0,a)+t[a].toUpperCase()+t.slice(a+1)}function nD(e,t){return e.composedPath().some(a=>sD(a,t))}function iD(e){if(!$S(e))return!1;if(e.isContentEditable)return!0;let t=e.tagName.toLowerCase();return t==="input"||t==="textarea"||t==="select"}function sD(e,t){return $S(e)&&e.hasAttribute(t)}function $S(e){return!!e&&typeof e.tagName=="string"&&typeof e.hasAttribute=="function"}function uD(e){return[...new Set(e.filter(t=>t!==null))]}function Fr(e){try{return new URL(e??"").host}catch{return"other page"}}function dD(e){return new Promise((t,a)=>{let o=new FileReader;o.onload=()=>t(o.result),o.onerror=()=>a(o.error),o.readAsDataURL(e)})}var a1=A(J(),1),fD=":host{all:initial;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif}",cD="html,body{margin:0!important;width:100%!important;height:100%!important;overflow:hidden!important;background:transparent!important;background-color:transparent!important;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif!important;color-scheme:dark}",ue=12,Qi=320,Ji=240,pD=420,$i=230,hh=48,mD={n:"ns-resize",s:"ns-resize",e:"ew-resize",w:"ew-resize",ne:"nesw-resize",sw:"nesw-resize",nw:"nwse-resize",se:"nwse-resize"},Hd=class{constructor(t,a){this.stylesheet=t;this.onModeChange=a}host=null;root=null;reactRoot=null;panelFrame=null;geometry=null;collapsed=!1;interaction=null;geometryTouched=!1;collapsedPos=null;viewerApi=null;mode="select";setMode(t){this.mode=t,this.viewerApi?.setMode(t)}bringToFront(){this.host&&document.body.append(this.host)}get active(){return this.host!==null}toggle(){this.active?this.close():this.open()}async open(){if(this.active)return;let t=document.createElement("div");t.setAttribute("data-loupe-overlay","");let a=t.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=fD+`
`+this.stylesheet;let r=document.createElement("div");r.className="dark";let l=document.createElement("iframe");a.append(o,r,l),document.body.append(t);let n=this.mountPanelFrame(l);this.host=t,this.root=a,this.panelFrame=l,this.collapsed=!1,this.geometry=this.defaultGeometry(),this.applyGeometry(),this.loadGeometry(),this.reactRoot=(0,t1.createRoot)(r),this.reactRoot.render((0,a1.jsx)(VS,{onClose:()=>this.close(),panelRoot:n,panelEmbedded:n!==null,onCollapsedChange:this.setPanelCollapsed,onModeChange:i=>{this.mode=i,this.onModeChange?.(i)},onReady:i=>this.viewerApi=i})),window.addEventListener("keydown",this.onKey,!0),window.addEventListener("resize",this.onWindowResize,!0);for(let i of["keyup","keypress","paste","copy","cut"])window.addEventListener(i,this.onContain,!0);for(let i of e1)t.addEventListener(i,this.stopBubble)}close(){this.endInteraction(),window.removeEventListener("keydown",this.onKey,!0),window.removeEventListener("resize",this.onWindowResize,!0);for(let t of["keyup","keypress","paste","copy","cut"])window.removeEventListener(t,this.onContain,!0);if(this.host)for(let t of e1)this.host.removeEventListener(t,this.stopBubble);this.reactRoot?.unmount(),this.host?.remove(),this.reactRoot=null,this.panelFrame=null,this.host=null,this.root=null,this.geometry=null,this.collapsed=!1,this.geometryTouched=!1,this.collapsedPos=null,this.viewerApi=null,this.mode="select"}mountPanelFrame(t){t.setAttribute("title","Loupe annotations panel"),t.setAttribute("aria-label","Loupe annotations panel"),t.setAttribute("allowtransparency","true"),t.style.cssText=["position:fixed","border:0","background:transparent!important","background-color:transparent!important","z-index:2147483646","color-scheme:dark"].join(";");let a=t.contentDocument;if(!a)return null;a.open(),a.write("<!doctype html><html><head><title>Loupe annotations</title></head><body></body></html>"),a.close(),a.documentElement.classList.add("dark");let o=a.createElement("style");return o.textContent=`${this.stylesheet}
${cD}`,a.head.append(o),a.documentElement.style.setProperty("background","transparent","important"),a.body.style.setProperty("background","transparent","important"),a.defaultView?.addEventListener("keydown",this.onFrameKey,!0),a.addEventListener("pointerdown",this.onFramePointerDown,!0),a.body}defaultGeometry(){let t=Math.min(pD,Math.max(Qi,window.innerWidth-2*ue)),a=Math.max(Ji,window.innerHeight-2*ue);return{left:Math.max(ue,window.innerWidth-t-ue),top:ue,width:t,height:a}}clampGeometry(t){let a=Math.max(Qi,window.innerWidth-2*ue),o=Math.max(Ji,window.innerHeight-2*ue),r=At(t.width,Qi,a),l=At(t.height,Ji,o),n=At(t.left,ue,Math.max(ue,window.innerWidth-r-ue)),i=At(t.top,ue,Math.max(ue,window.innerHeight-l-ue));return{left:n,top:i,width:r,height:l}}applyGeometry(){if(!(!this.panelFrame||!this.geometry)){if(this.collapsed){let t=this.geometry.left+this.geometry.width-$i,a=this.collapsedPos??{left:t,top:this.geometry.top},o=At(a.left,ue,Math.max(ue,window.innerWidth-$i-ue)),r=At(a.top,ue,Math.max(ue,window.innerHeight-hh-ue));Object.assign(this.panelFrame.style,{left:`${o}px`,top:`${r}px`,right:"auto",bottom:"auto",width:`${$i}px`,height:`${hh}px`});return}Object.assign(this.panelFrame.style,{left:`${this.geometry.left}px`,top:`${this.geometry.top}px`,right:"auto",bottom:"auto",width:`${this.geometry.width}px`,height:`${this.geometry.height}px`})}}geometryStorageKey(){return`loupe:geometry:${location.origin}`}async loadGeometry(){try{let t=this.geometryStorageKey(),o=(await chrome.storage.local.get(t))?.[t];if(!this.panelFrame||this.interaction||this.geometryTouched||!o||[o.left,o.top,o.width,o.height].some(r=>typeof r!="number"))return;this.geometry=this.clampGeometry(o),this.applyGeometry()}catch{}}saveGeometry(){if(this.geometry)try{chrome.storage.local.set({[this.geometryStorageKey()]:this.geometry})}catch{}}onWindowResize=()=>{this.geometry&&(this.geometry=this.clampGeometry(this.geometry),this.applyGeometry())};setPanelCollapsed=t=>{this.panelFrame&&(this.collapsed=t,this.applyGeometry())};stopBubble=t=>{t.stopPropagation()};onContain=t=>{this.host&&t.composedPath().includes(this.host)&&t.stopImmediatePropagation()};onKey=t=>{this.active&&this.host&&t.composedPath().includes(this.host)&&t.stopImmediatePropagation()};onFrameKey=t=>{!this.active||t.key!=="Escape"||this.panelFrame?.contentDocument?.querySelector('[data-slot="dropdown-menu-content"],[data-slot="dialog-content"],[data-slot="select-content"]')||(t.preventDefault(),t.stopImmediatePropagation(),this.mode==="annotate"?this.setMode("select"):this.close())};onFramePointerDown=t=>{if(t.button!==0||!this.panelFrame||!this.geometry)return;let a=hD(t.target),o=a?.closest("[data-loupe-panel-resize]");if(o){let r=o.getAttribute("data-loupe-panel-resize")??"se";this.beginInteraction(t,"resize",r,mD[r]??"nwse-resize");return}a?.closest("[data-loupe-panel-no-drag]")||a?.closest("[data-loupe-panel-drag]")&&this.beginInteraction(t,"drag","","grabbing")};beginInteraction(t,a,o,r){if(!this.panelFrame||!this.geometry)return;t.preventDefault(),t.stopPropagation(),this.geometryTouched=!0;let l=this.panelDragPoint(t);this.interaction={type:a,dir:o,cursor:r,startX:l.x,startY:l.y,startGeom:{...this.geometry},startCollapsedPos:this.collapsedPos??{left:this.geometry.left+this.geometry.width-$i,top:this.geometry.top}},this.setPanelDragChrome(r);let n=this.panelFrame.contentWindow;window.addEventListener("pointermove",this.onPointerMove,!0),window.addEventListener("pointerup",this.onPointerUp,!0),window.addEventListener("pointercancel",this.onPointerUp,!0),n?.addEventListener("pointermove",this.onPointerMove,!0),n?.addEventListener("pointerup",this.onPointerUp,!0),n?.addEventListener("pointercancel",this.onPointerUp,!0)}onPointerMove=t=>{if(!this.panelFrame||!this.interaction)return;t.preventDefault();let a=this.panelDragPoint(t),o=a.x-this.interaction.startX,r=a.y-this.interaction.startY;if(this.collapsed&&this.interaction.type==="drag"){let l=this.interaction.startCollapsedPos;this.collapsedPos={left:At(l.left+o,ue,Math.max(ue,window.innerWidth-$i-ue)),top:At(l.top+r,ue,Math.max(ue,window.innerHeight-hh-ue))},this.applyGeometry();return}this.geometry=this.interaction.type==="drag"?this.dragGeometry(this.interaction.startGeom,o,r):this.resizeGeometry(this.interaction.startGeom,this.interaction.dir,o,r),this.applyGeometry()};dragGeometry(t,a,o){let r=At(t.left+a,ue,Math.max(ue,window.innerWidth-t.width-ue)),l=At(t.top+o,ue,Math.max(ue,window.innerHeight-t.height-ue));return{left:r,top:l,width:t.width,height:t.height}}resizeGeometry(t,a,o,r){let{left:l,top:n,width:i,height:s}=t;if(a.includes("e")&&(i=At(t.width+o,Qi,window.innerWidth-t.left-ue)),a.includes("w")){let u=t.left+t.width;i=At(t.width-o,Qi,u-ue),l=u-i}if(a.includes("s")&&(s=At(t.height+r,Ji,window.innerHeight-t.top-ue)),a.includes("n")){let u=t.top+t.height;s=At(t.height-r,Ji,u-ue),n=u-s}return{left:l,top:n,width:i,height:s}}onPointerUp=()=>{this.interaction&&this.saveGeometry(),this.endInteraction()};endInteraction(){this.setPanelDragChrome(null);let t=this.panelFrame?.contentWindow;this.interaction=null,window.removeEventListener("pointermove",this.onPointerMove,!0),window.removeEventListener("pointerup",this.onPointerUp,!0),window.removeEventListener("pointercancel",this.onPointerUp,!0),t?.removeEventListener("pointermove",this.onPointerMove,!0),t?.removeEventListener("pointerup",this.onPointerUp,!0),t?.removeEventListener("pointercancel",this.onPointerUp,!0)}panelDragPoint(t){let a=this.panelFrame?.contentWindow;if(this.panelFrame&&t.view===a){let o=this.panelFrame.getBoundingClientRect();return{x:o.left+t.clientX,y:o.top+t.clientY}}return{x:t.clientX,y:t.clientY}}setPanelDragChrome(t){document.documentElement.style.cursor=t??"",document.documentElement.style.userSelect=t?"none":"";let a=this.panelFrame?.contentDocument;a&&(a.documentElement.style.cursor=t??"",a.documentElement.style.userSelect=t?"none":"",a.body.style.cursor=t??"",a.body.style.userSelect=t?"none":"")}};function At(e,t,a){return Math.min(Math.max(e,t),a)}function hD(e){return e&&typeof e.closest=="function"?e:null}var e1=["input","beforeinput","pointerdown","pointerup","mousedown","mouseup","click","dblclick","touchstart","touchend","focusin","focusout","blur"];var vh=US.replaceAll("__LOUPE_ASSET__",chrome.runtime.getURL("")),pa=null,ts=null,es="annotate",c1="http://localhost:7337",bh="",gD="loupeDraft:",xD=24*60*60*1e3;async function vD(){if(ts?.close(),pa?.active){pa.disable();return}await p1(await w1())}function bD(e){e==="annotate"?yD():pa?.disable()}async function yD(){pa?.active||await p1(await w1()),ts?.bringToFront()}function o1(){ts?.setMode("select")}async function p1(e=null){let t=await Fd();c1=_d(t,location.href),bh=t.activeRepoRoot??"";let a=t.bridgeRoutes.flatMap(r=>r.origins);es=Ud(location.href,[...t.projectOrigins,...a])?"annotate":"reference";let o=e?.mode===es?e:null;if(es==="reference")pa=new Ql({mode:"reference",stylesheet:vh,generateId:u1,onSelectionCapture:f1,draft:o,onDraftChange:s1,onSubmit:r1,onDisable:o1});else{let[r,l,n,i]=await Promise.all([FD(),_D(),XD(),qD()]);pa=new Ql({actions:zd(r,t),groups:l,defaultGroup:n,createGroup:HD,library:i,resolveLibraryImage:GD,stylesheet:vh,generateId:u1,captureTarget:YD,onSelectionCapture:f1,draft:o,onDraftChange:s1,onSubmit:r1,onDisable:o1,recorder:navigator.userAgent.includes("Firefox")?null:MD})}pa.enable()}function wD(){pa?.disable(),ts??=new Hd(vh,bD),ts.toggle()}async function r1(e,t){if(e.kind==="recording")return CD(e,t);pa?.setChromeVisible(!1),await Kd(),await Kd();let a=await chrome.runtime.sendMessage({type:"capture",rect:e.rect,devicePixelRatio:e.devicePixelRatio});if(pa?.setChromeVisible(!0),!a.ok)throw new Error(`screenshot failed: ${a.error}`);e.screenshotDataUrl=a.dataUrl;let o=await e5(e);if(es==="reference"){let n=await chrome.runtime.sendMessage({type:"save-reference",annotation:e});if(!n.ok)throw new Error(n.error);Ch(`saved to library \u2192 ${n.detail??""}
pull it into an annotation from your app${o?`
${o}`:""}`);return}await chrome.storage.local.set({lastGroup:e.group??""});let r=await chrome.runtime.sendMessage({type:"annotate",payload:{annotation:e,actions:y1(t)}});if(!r.ok)throw new Error(r.error);let l=Object.entries(r.results).map(([n,i])=>`${n} ${i.ok?"\u2713":"\u2717"}${i.detail?` (${i.detail})`:""}`).join("  \xB7  ");Ch(`${e.group?`[${e.group}] `:""}saved \u2192 ${r.dir}${l?`
${l}`:""}${o?`
${o}`:""}`)}async function CD(e,t){let a=await chrome.runtime.sendMessage({type:"record",payload:{annotation:e,actions:y1(t)}});if(!a.ok)throw new Error(a.error);let o=Object.entries(a.results).map(([r,l])=>`${r} ${l.ok?"\u2713":"\u2717"}${l.detail?` (${l.detail})`:""}`).join("  \xB7  ");Ch(`${e.group?`[${e.group}] `:""}recording saved \u2192 ${a.dir}${o?`
${o}`:""}`)}var SD="loupe:record-ctl",LD="loupe:record-collect",l1="loupe:record-collected",RD=200,ID=32,kD=220,AD=650,MD={async start(){let e=await chrome.runtime.sendMessage({type:"start-recording"});if(!e.ok)throw new Error(e.error);wh("start"),ED()},async stop(){let e=yh(),t;try{t=await chrome.runtime.sendMessage({type:"stop-recording"})}catch(r){throw await n1(),r}let a=await n1();if(!t.ok)throw new Error(t.error);let o=await TD(t.videoDataUrl,e,t.durationMs);return{startedAt:t.startedAt,durationMs:t.durationMs,videoDataUrl:t.videoDataUrl,console:a.console,network:a.network,errors:a.errors,events:e,keyframes:o}},cancel(){yh(),wh("reset"),chrome.runtime.sendMessage({type:"cancel-recording"})}},on=!1,m1=0,tn=[],an=null,en=null;function ED(){yh(),on=!0,m1=performance.now(),tn=[],window.addEventListener("click",h1,!0),window.addEventListener("keydown",g1,!0),window.addEventListener("input",x1,!0)}function yh(){if(!on&&tn.length===0)return[];Sh(),on=!1,window.removeEventListener("click",h1,!0),window.removeEventListener("keydown",g1,!0),window.removeEventListener("input",x1,!0);let e=tn.slice();return tn=[],e}function h1(e){if(!on||Lh(e.target))return;let t=e.target instanceof Element?e.target:null;qd({kind:"click",t:Gd(),label:`click ${Vd(t)}`,x:Math.round(e.clientX),y:Math.round(e.clientY),selector:Xd(t),text:as(t)})}function g1(e){if(!on||Lh(e.target)||DD(e))return;let t=e.target instanceof Element?e.target:null;if(b1(t)){en!==e.target&&(Sh(),en=e.target,qd({kind:"typing-start",t:Gd(),label:`before typing in ${Vd(t)}`,selector:Xd(t),text:as(t)})),v1();return}qd({kind:"key",t:Gd(),label:`key ${e.key} on ${Vd(t)}`,key:e.key,selector:Xd(t),text:as(t)})}function x1(e){!on||Lh(e.target)||b1(e.target instanceof Element?e.target:null)&&v1()}function v1(){an!==null&&window.clearTimeout(an),an=window.setTimeout(Sh,AD)}function Sh(){if(an!==null&&(window.clearTimeout(an),an=null),!en)return;let e=en instanceof Element?en:null;en=null,qd({kind:"typing-settled",t:Gd(),label:`after typing in ${Vd(e)}`,selector:Xd(e),text:as(e)})}function qd(e){tn.length>=RD||tn.push(e)}function Gd(){return Math.max(0,Math.round(performance.now()-m1))}function Lh(e){return e instanceof Element&&!!e.closest("[data-loupe-overlay]")}function DD(e){return["Shift","Control","Alt","Meta","CapsLock"].includes(e.key)}function b1(e){if(!e)return!1;if(e instanceof HTMLTextAreaElement)return!0;if(e instanceof HTMLInputElement){let t=e.type.toLowerCase();return!["button","checkbox","color","file","hidden","image","radio","range","reset","submit"].includes(t)}return e instanceof HTMLElement&&e.isContentEditable}function Vd(e){if(!e)return"page";let t=as(e),a=e.getAttribute("data-testid"),o=e.getAttribute("data-slot"),r=e.getAttribute("aria-label")||e.getAttribute("name")||e.getAttribute("placeholder"),l=e.tagName.toLowerCase(),n=t||a||o||r;return n?`${l} "${n}"`:l}function as(e){if(!e)return;let t="";if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement?t=e.value||e.placeholder||e.name||"":t=e.textContent??"",t=t.replace(/\s+/g," ").trim(),!!t)return t.length<=120?t:`${t.slice(0,119)}\u2026`}function Xd(e){if(!e)return;let t=e.id?`#${gh(e.id)}`:"";if(t)return t;let a=e.getAttribute("data-testid");if(a)return`[data-testid="${gh(a)}"]`;let o=e.getAttribute("data-slot");return o?`[data-slot="${gh(o)}"]`:e.tagName.toLowerCase()}function gh(e){return typeof CSS<"u"&&CSS.escape?CSS.escape(e):e.replace(/["\\]/g,"\\$&")}async function TD(e,t,a){if(!e||t.length===0)return[];let o=PD(t,a);if(o.length===0)return[];try{return await ND(e,o)}catch(r){return console.warn("[loupe] keyframe extraction failed",r),[]}}function PD(e,t){let a=Math.max(0,t),o=[];for(let r of e){if(o.length>=ID)break;let l=r.kind==="click"||r.kind==="key"?kD:0,n=BD(r.t+l,a);o.some(i=>Math.abs(i.t-n)<180)||o.push({t:n,eventT:r.t,label:OD(r)})}return o}function OD(e){return e.kind==="click"?`after ${e.label}`:e.kind==="key"?`after ${e.label}`:e.label}function BD(e,t){return t<=0?Math.max(0,e):Math.max(0,Math.min(e,Math.max(0,t-80)))}async function ND(e,t){let a=document.createElement("video");a.preload="auto",a.muted=!0,a.playsInline=!0,a.src=e,a.style.cssText="position:fixed;left:-99999px;top:-99999px;width:1px;height:1px;opacity:0;pointer-events:none",document.body.append(a);try{await UD(a);let o=document.createElement("canvas");o.width=Math.max(1,a.videoWidth),o.height=Math.max(1,a.videoHeight);let r=o.getContext("2d");if(!r)throw new Error("no 2d context");let l=[];for(let n of t)await zD(a,n.t/1e3),r.drawImage(a,0,0,o.width,o.height),l.push({...n,dataUrl:o.toDataURL("image/png")});return l}finally{a.remove()}}function UD(e){return e.readyState>=HTMLMediaElement.HAVE_METADATA&&e.videoWidth>0?Promise.resolve():new Promise((t,a)=>{let o=window.setTimeout(()=>r(new Error("video metadata timeout")),4e3);function r(i){window.clearTimeout(o),e.removeEventListener("loadedmetadata",l),e.removeEventListener("error",n),i?a(i):t()}function l(){r()}function n(){r(new Error("video failed to load"))}e.addEventListener("loadedmetadata",l),e.addEventListener("error",n),e.load()})}function zD(e,t){return new Promise((a,o)=>{let r=window.setTimeout(()=>l(new Error("video seek timeout")),4e3);function l(s){window.clearTimeout(r),e.removeEventListener("seeked",n),e.removeEventListener("error",i),s?o(s):a()}function n(){l()}function i(){l(new Error("video seek failed"))}e.addEventListener("seeked",n),e.addEventListener("error",i),e.currentTime=t})}function wh(e){window.dispatchEvent(new CustomEvent(SD,{detail:{action:e}}))}function n1(){wh("stop");let e=crypto.randomUUID();return new Promise(t=>{let a=window.setTimeout(()=>r({console:[],network:[],errors:[]}),600);function o(l){let n=l.detail;n?.id===e&&r({console:n.console??[],network:n.network??[],errors:n.errors??[]})}function r(l){window.clearTimeout(a),window.removeEventListener(l1,o),t(l)}window.addEventListener(l1,o),window.dispatchEvent(new CustomEvent(LD,{detail:{id:e}}))})}function y1(e){return e.length===0||e.includes("save")?i1(e):["save",...i1(e)]}function i1(e){return[...new Set(e)]}async function FD(){let e=await chrome.runtime.sendMessage({type:"actions"});return e.ok?e.actions:[{id:"save",label:"Save to repo"},{id:"claude",label:"Claude"}]}async function _D(){let e=await chrome.runtime.sendMessage({type:"groups"});return e.ok?e.groups.map(t=>t.group):[]}async function HD(e){let t=await chrome.runtime.sendMessage({type:"create-group",group:e});if(!t.ok)throw new Error(t.error)}async function qD(){let e=await chrome.runtime.sendMessage({type:"references"});return e.ok?e.references.map(t=>({id:t.id,caption:t.title||t.note||t.url||t.id,url:t.url,createdAt:t.createdAt,thumbUrl:VD(t.dir)})):[]}async function GD(e){let t=await chrome.runtime.sendMessage({type:"reference-image",id:e});return t.ok?t.dataUrl:null}function VD(e){let t=new URL("/file",c1);return t.searchParams.set("path",`${e}/shot.png`),t.searchParams.set("pageUrl",location.href),bh&&t.searchParams.set("repoRoot",bh),t.toString()}async function XD(){let{lastGroup:e}=await chrome.storage.local.get({lastGroup:""});return e}async function w1(){let e=jd(location.href);try{let a=(await jD(e))[e];return WD(a)?a:(await C1(e),null)}catch(t){return console.warn("[loupe] draft load failed",t),null}}async function s1(e){let t=jd(e?.url??location.href);try{if(!e){await C1(t);return}await KD({[t]:e})}catch(a){console.warn("[loupe] draft save failed",a)}}async function jD(e){try{return await chrome.storage.session.get(e)}catch{return await chrome.storage.local.get(e)}}async function KD(e){try{await chrome.storage.session.set(e)}catch{await chrome.storage.local.set(e)}}async function C1(e){try{await chrome.storage.session.remove(e)}catch{await chrome.storage.local.remove(e)}}function jd(e){return`${gD}${ZD(e)}`}function WD(e){if(!e||typeof e!="object")return!1;let t=e;if(jd(t.url??"")!==jd(location.href)||t.mode!=="annotate"&&t.mode!=="reference"||!t.rect||!Array.isArray(t.references)||!Array.isArray(t.acceptedKinds))return!1;let a=Date.parse(t.updatedAt??"");return Number.isFinite(a)&&Date.now()-a<xD}function ZD(e){try{let t=new URL(e);return t.hash="",t.href}catch{return e}}function u1(){return crypto.randomUUID().slice(0,8)}async function YD(e){let t=di(e);if(t.componentChain.length>0)return t;let a=await JD(e);return a.length>0?{...t,componentChain:a}:t}var xh="data-loupe-inspect-id",QD="loupe:inspect-framework-request",d1="loupe:inspect-framework-response";function JD(e){let t=`loupe-${crypto.randomUUID()}`;return e.setAttribute(xh,t),new Promise(a=>{let o=window.setTimeout(l,200,[]);function r(n){let i=n.detail;i?.id===t&&l(Array.isArray(i.componentChain)?i.componentChain:[])}function l(n){window.clearTimeout(o),window.removeEventListener(d1,r),e.getAttribute(xh)===t&&e.removeAttribute(xh),a(n.filter(i=>typeof i.name=="string"&&i.name.length>0))}window.addEventListener(d1,r),window.dispatchEvent(new CustomEvent(QD,{detail:{id:t}}))})}chrome.runtime.onMessage.addListener(e=>{e.type==="toggle"&&vD(),e.type==="toggle-view"&&wD()});function Kd(){return new Promise(e=>requestAnimationFrame(()=>e()))}async function f1(e){let t=pa;try{t?.setChromeVisible(!1),await Kd(),await Kd();let a=await chrome.runtime.sendMessage({type:"capture",rect:e.rect,devicePixelRatio:e.devicePixelRatio});if(!a.ok)throw new Error(`screenshot failed: ${a.error}`);await S1(a.dataUrl)}catch(a){console.warn("[loupe] automatic screenshot clipboard copy failed",a)}finally{t?.setChromeVisible(!0)}}async function $D(e){let t=await a5(e),a=o5(e,t);if(e.screenshotDataUrl)try{return await S1(e.screenshotDataUrl,a),"copied screenshot + prompt"}catch(o){console.warn("[loupe] screenshot clipboard copy failed",o)}if(!navigator.clipboard?.writeText)throw new Error("clipboard unavailable");return await navigator.clipboard.writeText(a),"copied agent prompt"}async function e5(e){try{return await $D(e)}catch(t){return console.warn("[loupe] automatic clipboard copy failed",t),null}}async function S1(e,t){if(!navigator.clipboard?.write||typeof ClipboardItem>"u")throw new Error("image clipboard unavailable");let a=await t5(e);if(t)try{await navigator.clipboard.write([new ClipboardItem({"image/png":a,"text/plain":new Blob([t],{type:"text/plain"})})]);return}catch{}await navigator.clipboard.write([new ClipboardItem({"image/png":a})])}async function t5(e){let t=await(await fetch(e)).blob();return t.type==="image/png"?t:new Blob([await t.arrayBuffer()],{type:"image/png"})}async function a5(e){if(es!=="annotate")return null;try{let t=await chrome.runtime.sendMessage({type:"resolve-target",target:e.target});return t.ok?{source:t.source,candidates:t.candidates,method:t.method}:null}catch{return null}}function o5(e,t){let a=e.target.componentChain.map(r=>r.name).join(" > ")||e.target.tag,o=["Implement this Loupe UI annotation.","",`Annotation id: ${e.id}`,e.group?`Group: ${e.group}`:"",`Component: ${a}`].filter(Boolean);return e.target.dataAttributes["data-slot"]&&o.push(`Slot: ${e.target.dataAttributes["data-slot"]}`),e.target.dataAttributes["data-testid"]&&o.push(`Test id: ${e.target.dataAttributes["data-testid"]}`),o.push(`Selector: ${e.target.selector}`),e.target.className&&o.push(`Class: ${e.target.className}`),t?.source?o.push(`Source: ${t.source}`):t?.candidates.length?o.push(`Possible sources: ${t.candidates.join(", ")}`):o.push("Source: unresolved"),o.push(`Page: ${e.title}`,`URL: ${e.url}`),e.note&&o.push("","Requested change:",e.note),e.target.text&&o.push("",`Selected text: ${e.target.text}`),o.push("","Use the Loupe screenshot/reference bundle if this was saved to the repo."),o.join(`
`)}function Ch(e){let t=document.createElement("div");t.setAttribute("data-loupe-overlay","");let a=t.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=`
    .t { position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
         background: #101010; color: #f8f8f8; padding: 9px 14px; border-radius: 12px;
         font: 13px ui-sans-serif, system-ui, sans-serif; z-index: 2147483647; white-space: pre-line;
         box-shadow: 0 12px 40px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08);
         box-sizing: border-box; max-width: min(440px, calc(100vw - 32px)); overflow-wrap: anywhere; }`;let r=document.createElement("div");r.className="t",r.textContent=e,a.append(o,r),document.body.append(t),setTimeout(()=>t.remove(),4200)}
