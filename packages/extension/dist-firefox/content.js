var fL=Object.create;var xm=Object.defineProperty;var dL=Object.getOwnPropertyDescriptor;var cL=Object.getOwnPropertyNames;var pL=Object.getPrototypeOf,mL=Object.prototype.hasOwnProperty;var da=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var hL=(e,t,a,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of cL(t))!mL.call(e,r)&&r!==a&&xm(e,r,{get:()=>t[r],enumerable:!(o=dL(t,r))||o.enumerable});return e};var B=(e,t,a)=>(a=e!=null?fL(pL(e)):{},hL(t||!e||!e.__esModule?xm(a,"default",{value:e,enumerable:!0}):a,e));var Gm=da(Ee=>{"use strict";function wf(e,t){var a=e.length;e.push(t);e:for(;0<a;){var o=a-1>>>1,r=e[o];if(0<vu(r,t))e[o]=t,e[a]=r,a=o;else break e}}function ca(e){return e.length===0?null:e[0]}function yu(e){if(e.length===0)return null;var t=e[0],a=e.pop();if(a!==t){e[0]=a;e:for(var o=0,r=e.length,l=r>>>1;o<l;){var n=2*(o+1)-1,u=e[n],s=n+1,i=e[s];if(0>vu(u,a))s<r&&0>vu(i,u)?(e[o]=i,e[s]=a,o=s):(e[o]=u,e[n]=a,o=n);else if(s<r&&0>vu(i,a))e[o]=i,e[s]=a,o=s;else break e}}return t}function vu(e,t){var a=e.sortIndex-t.sortIndex;return a!==0?a:e.id-t.id}Ee.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Bm=performance,Ee.unstable_now=function(){return Bm.now()}):(vf=Date,Pm=vf.now(),Ee.unstable_now=function(){return vf.now()-Pm});var Bm,vf,Pm,Ia=[],Qa=[],o0=1,zt=null,ct=3,Sf=!1,Bl=!1,Pl=!1,Lf=!1,Nm=typeof setTimeout=="function"?setTimeout:null,zm=typeof clearTimeout=="function"?clearTimeout:null,Um=typeof setImmediate<"u"?setImmediate:null;function bu(e){for(var t=ca(Qa);t!==null;){if(t.callback===null)yu(Qa);else if(t.startTime<=e)yu(Qa),t.sortIndex=t.expirationTime,wf(Ia,t);else break;t=ca(Qa)}}function Cf(e){if(Pl=!1,bu(e),!Bl)if(ca(Ia)!==null)Bl=!0,Ir||(Ir=!0,Cr());else{var t=ca(Qa);t!==null&&If(Cf,t.startTime-e)}}var Ir=!1,Ul=-1,qm=5,Fm=-1;function _m(){return Lf?!0:!(Ee.unstable_now()-Fm<qm)}function bf(){if(Lf=!1,Ir){var e=Ee.unstable_now();Fm=e;var t=!0;try{e:{Bl=!1,Pl&&(Pl=!1,zm(Ul),Ul=-1),Sf=!0;var a=ct;try{t:{for(bu(e),zt=ca(Ia);zt!==null&&!(zt.expirationTime>e&&_m());){var o=zt.callback;if(typeof o=="function"){zt.callback=null,ct=zt.priorityLevel;var r=o(zt.expirationTime<=e);if(e=Ee.unstable_now(),typeof r=="function"){zt.callback=r,bu(e),t=!0;break t}zt===ca(Ia)&&yu(Ia),bu(e)}else yu(Ia);zt=ca(Ia)}if(zt!==null)t=!0;else{var l=ca(Qa);l!==null&&If(Cf,l.startTime-e),t=!1}}break e}finally{zt=null,ct=a,Sf=!1}t=void 0}}finally{t?Cr():Ir=!1}}}var Cr;typeof Um=="function"?Cr=function(){Um(bf)}:typeof MessageChannel<"u"?(yf=new MessageChannel,Hm=yf.port2,yf.port1.onmessage=bf,Cr=function(){Hm.postMessage(null)}):Cr=function(){Nm(bf,0)};var yf,Hm;function If(e,t){Ul=Nm(function(){e(Ee.unstable_now())},t)}Ee.unstable_IdlePriority=5;Ee.unstable_ImmediatePriority=1;Ee.unstable_LowPriority=4;Ee.unstable_NormalPriority=3;Ee.unstable_Profiling=null;Ee.unstable_UserBlockingPriority=2;Ee.unstable_cancelCallback=function(e){e.callback=null};Ee.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):qm=0<e?Math.floor(1e3/e):5};Ee.unstable_getCurrentPriorityLevel=function(){return ct};Ee.unstable_next=function(e){switch(ct){case 1:case 2:case 3:var t=3;break;default:t=ct}var a=ct;ct=t;try{return e()}finally{ct=a}};Ee.unstable_requestPaint=function(){Lf=!0};Ee.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var a=ct;ct=e;try{return t()}finally{ct=a}};Ee.unstable_scheduleCallback=function(e,t,a){var o=Ee.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?o+a:o):a=o,e){case 1:var r=-1;break;case 2:r=250;break;case 5:r=1073741823;break;case 4:r=1e4;break;default:r=5e3}return r=a+r,e={id:o0++,callback:t,priorityLevel:e,startTime:a,expirationTime:r,sortIndex:-1},a>o?(e.sortIndex=a,wf(Qa,e),ca(Ia)===null&&e===ca(Qa)&&(Pl?(zm(Ul),Ul=-1):Pl=!0,If(Cf,a-o))):(e.sortIndex=r,wf(Ia,e),Bl||Sf||(Bl=!0,Ir||(Ir=!0,Cr()))),e};Ee.unstable_shouldYield=_m;Ee.unstable_wrapCallback=function(e){var t=ct;return function(){var a=ct;ct=t;try{return e.apply(this,arguments)}finally{ct=a}}}});var Xm=da((_M,Vm)=>{"use strict";Vm.exports=Gm()});var ah=da(W=>{"use strict";var Af=Symbol.for("react.transitional.element"),r0=Symbol.for("react.portal"),l0=Symbol.for("react.fragment"),n0=Symbol.for("react.strict_mode"),u0=Symbol.for("react.profiler"),s0=Symbol.for("react.consumer"),i0=Symbol.for("react.context"),f0=Symbol.for("react.forward_ref"),d0=Symbol.for("react.suspense"),c0=Symbol.for("react.memo"),Km=Symbol.for("react.lazy"),p0=Symbol.for("react.activity"),jm=Symbol.iterator;function m0(e){return e===null||typeof e!="object"?null:(e=jm&&e[jm]||e["@@iterator"],typeof e=="function"?e:null)}var Qm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Jm=Object.assign,$m={};function kr(e,t,a){this.props=e,this.context=t,this.refs=$m,this.updater=a||Qm}kr.prototype.isReactComponent={};kr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};kr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function eh(){}eh.prototype=kr.prototype;function Mf(e,t,a){this.props=e,this.context=t,this.refs=$m,this.updater=a||Qm}var Df=Mf.prototype=new eh;Df.constructor=Mf;Jm(Df,kr.prototype);Df.isPureReactComponent=!0;var Wm=Array.isArray;function kf(){}var Re={H:null,A:null,T:null,S:null},th=Object.prototype.hasOwnProperty;function Tf(e,t,a){var o=a.ref;return{$$typeof:Af,type:e,key:t,ref:o!==void 0?o:null,props:a}}function h0(e,t){return Tf(e.type,t,e.props)}function Ef(e){return typeof e=="object"&&e!==null&&e.$$typeof===Af}function x0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(a){return t[a]})}var Zm=/\/+/g;function Rf(e,t){return typeof e=="object"&&e!==null&&e.key!=null?x0(""+e.key):t.toString(36)}function g0(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(kf,kf):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Rr(e,t,a,o,r){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var n=!1;if(e===null)n=!0;else switch(l){case"bigint":case"string":case"number":n=!0;break;case"object":switch(e.$$typeof){case Af:case r0:n=!0;break;case Km:return n=e._init,Rr(n(e._payload),t,a,o,r)}}if(n)return r=r(e),n=o===""?"."+Rf(e,0):o,Wm(r)?(a="",n!=null&&(a=n.replace(Zm,"$&/")+"/"),Rr(r,t,a,"",function(i){return i})):r!=null&&(Ef(r)&&(r=h0(r,a+(r.key==null||e&&e.key===r.key?"":(""+r.key).replace(Zm,"$&/")+"/")+n)),t.push(r)),1;n=0;var u=o===""?".":o+":";if(Wm(e))for(var s=0;s<e.length;s++)o=e[s],l=u+Rf(o,s),n+=Rr(o,t,a,l,r);else if(s=m0(e),typeof s=="function")for(e=s.call(e),s=0;!(o=e.next()).done;)o=o.value,l=u+Rf(o,s++),n+=Rr(o,t,a,l,r);else if(l==="object"){if(typeof e.then=="function")return Rr(g0(e),t,a,o,r);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return n}function wu(e,t,a){if(e==null)return e;var o=[],r=0;return Rr(e,o,"","",function(l){return t.call(a,l,r++)}),o}function v0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(a){(e._status===0||e._status===-1)&&(e._status=1,e._result=a)},function(a){(e._status===0||e._status===-1)&&(e._status=2,e._result=a)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ym=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},b0={map:wu,forEach:function(e,t,a){wu(e,function(){t.apply(this,arguments)},a)},count:function(e){var t=0;return wu(e,function(){t++}),t},toArray:function(e){return wu(e,function(t){return t})||[]},only:function(e){if(!Ef(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};W.Activity=p0;W.Children=b0;W.Component=kr;W.Fragment=l0;W.Profiler=u0;W.PureComponent=Mf;W.StrictMode=n0;W.Suspense=d0;W.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Re;W.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Re.H.useMemoCache(e)}};W.cache=function(e){return function(){return e.apply(null,arguments)}};W.cacheSignal=function(){return null};W.cloneElement=function(e,t,a){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var o=Jm({},e.props),r=e.key;if(t!=null)for(l in t.key!==void 0&&(r=""+t.key),t)!th.call(t,l)||l==="key"||l==="__self"||l==="__source"||l==="ref"&&t.ref===void 0||(o[l]=t[l]);var l=arguments.length-2;if(l===1)o.children=a;else if(1<l){for(var n=Array(l),u=0;u<l;u++)n[u]=arguments[u+2];o.children=n}return Tf(e.type,r,o)};W.createContext=function(e){return e={$$typeof:i0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:s0,_context:e},e};W.createElement=function(e,t,a){var o,r={},l=null;if(t!=null)for(o in t.key!==void 0&&(l=""+t.key),t)th.call(t,o)&&o!=="key"&&o!=="__self"&&o!=="__source"&&(r[o]=t[o]);var n=arguments.length-2;if(n===1)r.children=a;else if(1<n){for(var u=Array(n),s=0;s<n;s++)u[s]=arguments[s+2];r.children=u}if(e&&e.defaultProps)for(o in n=e.defaultProps,n)r[o]===void 0&&(r[o]=n[o]);return Tf(e,l,r)};W.createRef=function(){return{current:null}};W.forwardRef=function(e){return{$$typeof:f0,render:e}};W.isValidElement=Ef;W.lazy=function(e){return{$$typeof:Km,_payload:{_status:-1,_result:e},_init:v0}};W.memo=function(e,t){return{$$typeof:c0,type:e,compare:t===void 0?null:t}};W.startTransition=function(e){var t=Re.T,a={};Re.T=a;try{var o=e(),r=Re.S;r!==null&&r(a,o),typeof o=="object"&&o!==null&&typeof o.then=="function"&&o.then(kf,Ym)}catch(l){Ym(l)}finally{t!==null&&a.types!==null&&(t.types=a.types),Re.T=t}};W.unstable_useCacheRefresh=function(){return Re.H.useCacheRefresh()};W.use=function(e){return Re.H.use(e)};W.useActionState=function(e,t,a){return Re.H.useActionState(e,t,a)};W.useCallback=function(e,t){return Re.H.useCallback(e,t)};W.useContext=function(e){return Re.H.useContext(e)};W.useDebugValue=function(){};W.useDeferredValue=function(e,t){return Re.H.useDeferredValue(e,t)};W.useEffect=function(e,t){return Re.H.useEffect(e,t)};W.useEffectEvent=function(e){return Re.H.useEffectEvent(e)};W.useId=function(){return Re.H.useId()};W.useImperativeHandle=function(e,t,a){return Re.H.useImperativeHandle(e,t,a)};W.useInsertionEffect=function(e,t){return Re.H.useInsertionEffect(e,t)};W.useLayoutEffect=function(e,t){return Re.H.useLayoutEffect(e,t)};W.useMemo=function(e,t){return Re.H.useMemo(e,t)};W.useOptimistic=function(e,t){return Re.H.useOptimistic(e,t)};W.useReducer=function(e,t,a){return Re.H.useReducer(e,t,a)};W.useRef=function(e){return Re.H.useRef(e)};W.useState=function(e){return Re.H.useState(e)};W.useSyncExternalStore=function(e,t,a){return Re.H.useSyncExternalStore(e,t,a)};W.useTransition=function(){return Re.H.useTransition()};W.version="19.2.7"});var X=da((VM,oh)=>{"use strict";oh.exports=ah()});var lh=da(xt=>{"use strict";var y0=X();function rh(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ja(){}var ht={d:{f:Ja,r:function(){throw Error(rh(522))},D:Ja,C:Ja,L:Ja,m:Ja,X:Ja,S:Ja,M:Ja},p:0,findDOMNode:null},w0=Symbol.for("react.portal");function S0(e,t,a){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:w0,key:o==null?null:""+o,children:e,containerInfo:t,implementation:a}}var Hl=y0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Su(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}xt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=ht;xt.createPortal=function(e,t){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(rh(299));return S0(e,t,null,a)};xt.flushSync=function(e){var t=Hl.T,a=ht.p;try{if(Hl.T=null,ht.p=2,e)return e()}finally{Hl.T=t,ht.p=a,ht.d.f()}};xt.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,ht.d.C(e,t))};xt.prefetchDNS=function(e){typeof e=="string"&&ht.d.D(e)};xt.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var a=t.as,o=Su(a,t.crossOrigin),r=typeof t.integrity=="string"?t.integrity:void 0,l=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;a==="style"?ht.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:o,integrity:r,fetchPriority:l}):a==="script"&&ht.d.X(e,{crossOrigin:o,integrity:r,fetchPriority:l,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};xt.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var a=Su(t.as,t.crossOrigin);ht.d.M(e,{crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&ht.d.M(e)};xt.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var a=t.as,o=Su(a,t.crossOrigin);ht.d.L(e,a,{crossOrigin:o,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};xt.preloadModule=function(e,t){if(typeof e=="string")if(t){var a=Su(t.as,t.crossOrigin);ht.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else ht.d.m(e)};xt.requestFormReset=function(e){ht.d.r(e)};xt.unstable_batchedUpdates=function(e,t){return e(t)};xt.useFormState=function(e,t,a){return Hl.H.useFormState(e,t,a)};xt.useFormStatus=function(){return Hl.H.useHostTransitionStatus()};xt.version="19.2.7"});var zo=da((jM,uh)=>{"use strict";function nh(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nh)}catch(e){console.error(e)}}nh(),uh.exports=lh()});var bb=da(Ws=>{"use strict";var Je=Xm(),Ox=X(),L0=zo();function k(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Bx(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Cn(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function Px(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ux(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function sh(e){if(Cn(e)!==e)throw Error(k(188))}function C0(e){var t=e.alternate;if(!t){if(t=Cn(e),t===null)throw Error(k(188));return t!==e?null:e}for(var a=e,o=t;;){var r=a.return;if(r===null)break;var l=r.alternate;if(l===null){if(o=r.return,o!==null){a=o;continue}break}if(r.child===l.child){for(l=r.child;l;){if(l===a)return sh(r),e;if(l===o)return sh(r),t;l=l.sibling}throw Error(k(188))}if(a.return!==o.return)a=r,o=l;else{for(var n=!1,u=r.child;u;){if(u===a){n=!0,a=r,o=l;break}if(u===o){n=!0,o=r,a=l;break}u=u.sibling}if(!n){for(u=l.child;u;){if(u===a){n=!0,a=l,o=r;break}if(u===o){n=!0,o=l,a=r;break}u=u.sibling}if(!n)throw Error(k(189))}}if(a.alternate!==o)throw Error(k(190))}if(a.tag!==3)throw Error(k(188));return a.stateNode.current===a?e:t}function Hx(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Hx(e),t!==null)return t;e=e.sibling}return null}var Me=Object.assign,I0=Symbol.for("react.element"),Lu=Symbol.for("react.transitional.element"),Xl=Symbol.for("react.portal"),Or=Symbol.for("react.fragment"),Nx=Symbol.for("react.strict_mode"),cd=Symbol.for("react.profiler"),zx=Symbol.for("react.consumer"),Oa=Symbol.for("react.context"),uc=Symbol.for("react.forward_ref"),pd=Symbol.for("react.suspense"),md=Symbol.for("react.suspense_list"),sc=Symbol.for("react.memo"),$a=Symbol.for("react.lazy");Symbol.for("react.scope");var hd=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var R0=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var ih=Symbol.iterator;function Nl(e){return e===null||typeof e!="object"?null:(e=ih&&e[ih]||e["@@iterator"],typeof e=="function"?e:null)}var k0=Symbol.for("react.client.reference");function xd(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===k0?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Or:return"Fragment";case cd:return"Profiler";case Nx:return"StrictMode";case pd:return"Suspense";case md:return"SuspenseList";case hd:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Xl:return"Portal";case Oa:return e.displayName||"Context";case zx:return(e._context.displayName||"Context")+".Consumer";case uc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case sc:return t=e.displayName||null,t!==null?t:xd(e.type)||"Memo";case $a:t=e._payload,e=e._init;try{return xd(e(t))}catch{}}return null}var jl=Array.isArray,V=Ox.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ce=L0.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Xo={pending:!1,data:null,method:null,action:null},gd=[],Br=-1;function ga(e){return{current:e}}function at(e){0>Br||(e.current=gd[Br],gd[Br]=null,Br--)}function Ce(e,t){Br++,gd[Br]=e.current,e.current=t}var xa=ga(null),fn=ga(null),fo=ga(null),as=ga(null);function os(e,t){switch(Ce(fo,t),Ce(fn,e),Ce(xa,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?xx(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=xx(t),e=lb(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}at(xa),Ce(xa,e)}function Jr(){at(xa),at(fn),at(fo)}function vd(e){e.memoizedState!==null&&Ce(as,e);var t=xa.current,a=lb(t,e.type);t!==a&&(Ce(fn,e),Ce(xa,a))}function rs(e){fn.current===e&&(at(xa),at(fn)),as.current===e&&(at(as),wn._currentValue=Xo)}var Of,fh;function Fo(e){if(Of===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Of=t&&t[1]||"",fh=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Of+e+fh}var Bf=!1;function Pf(e,t){if(!e||Bf)return"";Bf=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(h){var x=h}Reflect.construct(e,[],p)}else{try{p.call()}catch(h){x=h}e.call(p.prototype)}}else{try{throw Error()}catch(h){x=h}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(h){if(h&&x&&typeof h.stack=="string")return[h.stack,x.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var l=o.DetermineComponentFrameRoot(),n=l[0],u=l[1];if(n&&u){var s=n.split(`
`),i=u.split(`
`);for(r=o=0;o<s.length&&!s[o].includes("DetermineComponentFrameRoot");)o++;for(;r<i.length&&!i[r].includes("DetermineComponentFrameRoot");)r++;if(o===s.length||r===i.length)for(o=s.length-1,r=i.length-1;1<=o&&0<=r&&s[o]!==i[r];)r--;for(;1<=o&&0<=r;o--,r--)if(s[o]!==i[r]){if(o!==1||r!==1)do if(o--,r--,0>r||s[o]!==i[r]){var d=`
`+s[o].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=o&&0<=r);break}}}finally{Bf=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Fo(a):""}function A0(e,t){switch(e.tag){case 26:case 27:case 5:return Fo(e.type);case 16:return Fo("Lazy");case 13:return e.child!==t&&t!==null?Fo("Suspense Fallback"):Fo("Suspense");case 19:return Fo("SuspenseList");case 0:case 15:return Pf(e.type,!1);case 11:return Pf(e.type.render,!1);case 1:return Pf(e.type,!0);case 31:return Fo("Activity");default:return""}}function dh(e){try{var t="",a=null;do t+=A0(e,a),a=e,e=e.return;while(e);return t}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var bd=Object.prototype.hasOwnProperty,ic=Je.unstable_scheduleCallback,Uf=Je.unstable_cancelCallback,M0=Je.unstable_shouldYield,D0=Je.unstable_requestPaint,Ot=Je.unstable_now,T0=Je.unstable_getCurrentPriorityLevel,qx=Je.unstable_ImmediatePriority,Fx=Je.unstable_UserBlockingPriority,ls=Je.unstable_NormalPriority,E0=Je.unstable_LowPriority,_x=Je.unstable_IdlePriority,O0=Je.log,B0=Je.unstable_setDisableYieldValue,In=null,Bt=null;function lo(e){if(typeof O0=="function"&&B0(e),Bt&&typeof Bt.setStrictMode=="function")try{Bt.setStrictMode(In,e)}catch{}}var Pt=Math.clz32?Math.clz32:H0,P0=Math.log,U0=Math.LN2;function H0(e){return e>>>=0,e===0?32:31-(P0(e)/U0|0)|0}var Cu=256,Iu=262144,Ru=4194304;function _o(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ts(e,t,a){var o=e.pendingLanes;if(o===0)return 0;var r=0,l=e.suspendedLanes,n=e.pingedLanes;e=e.warmLanes;var u=o&134217727;return u!==0?(o=u&~l,o!==0?r=_o(o):(n&=u,n!==0?r=_o(n):a||(a=u&~e,a!==0&&(r=_o(a))))):(u=o&~l,u!==0?r=_o(u):n!==0?r=_o(n):a||(a=o&~e,a!==0&&(r=_o(a)))),r===0?0:t!==0&&t!==r&&!(t&l)&&(l=r&-r,a=t&-t,l>=a||l===32&&(a&4194048)!==0)?t:r}function Rn(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function N0(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Gx(){var e=Ru;return Ru<<=1,!(Ru&62914560)&&(Ru=4194304),e}function Hf(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function kn(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function z0(e,t,a,o,r,l){var n=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var u=e.entanglements,s=e.expirationTimes,i=e.hiddenUpdates;for(a=n&~a;0<a;){var d=31-Pt(a),p=1<<d;u[d]=0,s[d]=-1;var x=i[d];if(x!==null)for(i[d]=null,d=0;d<x.length;d++){var h=x[d];h!==null&&(h.lane&=-536870913)}a&=~p}o!==0&&Vx(e,o,0),l!==0&&r===0&&e.tag!==0&&(e.suspendedLanes|=l&~(n&~t))}function Vx(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var o=31-Pt(t);e.entangledLanes|=t,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Xx(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var o=31-Pt(a),r=1<<o;r&t|e[o]&t&&(e[o]|=t),a&=~r}}function jx(e,t){var a=t&-t;return a=a&42?1:fc(a),a&(e.suspendedLanes|t)?0:a}function fc(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function dc(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Wx(){var e=ce.p;return e!==0?e:(e=window.event,e===void 0?32:xb(e.type))}function ch(e,t){var a=ce.p;try{return ce.p=e,t()}finally{ce.p=a}}var Co=Math.random().toString(36).slice(2),rt="__reactFiber$"+Co,It="__reactProps$"+Co,il="__reactContainer$"+Co,yd="__reactEvents$"+Co,q0="__reactListeners$"+Co,F0="__reactHandles$"+Co,ph="__reactResources$"+Co,An="__reactMarker$"+Co;function cc(e){delete e[rt],delete e[It],delete e[yd],delete e[q0],delete e[F0]}function Pr(e){var t=e[rt];if(t)return t;for(var a=e.parentNode;a;){if(t=a[il]||a[rt]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=wx(e);e!==null;){if(a=e[rt])return a;e=wx(e)}return t}e=a,a=e.parentNode}return null}function fl(e){if(e=e[rt]||e[il]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Wl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(k(33))}function Xr(e){var t=e[ph];return t||(t=e[ph]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function tt(e){e[An]=!0}var Zx=new Set,Yx={};function tr(e,t){$r(e,t),$r(e+"Capture",t)}function $r(e,t){for(Yx[e]=t,e=0;e<t.length;e++)Zx.add(t[e])}var _0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),mh={},hh={};function G0(e){return bd.call(hh,e)?!0:bd.call(mh,e)?!1:_0.test(e)?hh[e]=!0:(mh[e]=!0,!1)}function Fu(e,t,a){if(G0(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var o=t.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function ku(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function Ra(e,t,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+o)}}function Ft(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Kx(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function V0(e,t,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var r=o.get,l=o.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(n){a=""+n,l.call(this,n)}}),Object.defineProperty(e,t,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(n){a=""+n},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function wd(e){if(!e._valueTracker){var t=Kx(e)?"checked":"value";e._valueTracker=V0(e,t,""+e[t])}}function Qx(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),o="";return e&&(o=Kx(e)?e.checked?"true":"false":e.value),e=o,e!==a?(t.setValue(e),!0):!1}function ns(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var X0=/[\n"\\]/g;function Vt(e){return e.replace(X0,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Sd(e,t,a,o,r,l,n,u){e.name="",n!=null&&typeof n!="function"&&typeof n!="symbol"&&typeof n!="boolean"?e.type=n:e.removeAttribute("type"),t!=null?n==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Ft(t)):e.value!==""+Ft(t)&&(e.value=""+Ft(t)):n!=="submit"&&n!=="reset"||e.removeAttribute("value"),t!=null?Ld(e,n,Ft(t)):a!=null?Ld(e,n,Ft(a)):o!=null&&e.removeAttribute("value"),r==null&&l!=null&&(e.defaultChecked=!!l),r!=null&&(e.checked=r&&typeof r!="function"&&typeof r!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.name=""+Ft(u):e.removeAttribute("name")}function Jx(e,t,a,o,r,l,n,u){if(l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(e.type=l),t!=null||a!=null){if(!(l!=="submit"&&l!=="reset"||t!=null)){wd(e);return}a=a!=null?""+Ft(a):"",t=t!=null?""+Ft(t):a,u||t===e.value||(e.value=t),e.defaultValue=t}o=o??r,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=u?e.checked:!!o,e.defaultChecked=!!o,n!=null&&typeof n!="function"&&typeof n!="symbol"&&typeof n!="boolean"&&(e.name=n),wd(e)}function Ld(e,t,a){t==="number"&&ns(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function jr(e,t,a,o){if(e=e.options,t){t={};for(var r=0;r<a.length;r++)t["$"+a[r]]=!0;for(a=0;a<e.length;a++)r=t.hasOwnProperty("$"+e[a].value),e[a].selected!==r&&(e[a].selected=r),r&&o&&(e[a].defaultSelected=!0)}else{for(a=""+Ft(a),t=null,r=0;r<e.length;r++){if(e[r].value===a){e[r].selected=!0,o&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function $x(e,t,a){if(t!=null&&(t=""+Ft(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+Ft(a):""}function eg(e,t,a,o){if(t==null){if(o!=null){if(a!=null)throw Error(k(92));if(jl(o)){if(1<o.length)throw Error(k(93));o=o[0]}a=o}a==null&&(a=""),t=a}a=Ft(t),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),wd(e)}function el(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var j0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function xh(e,t,a){var o=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":o?e.setProperty(t,a):typeof a!="number"||a===0||j0.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function tg(e,t,a){if(t!=null&&typeof t!="object")throw Error(k(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||t!=null&&t.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var r in t)o=t[r],t.hasOwnProperty(r)&&a[r]!==o&&xh(e,r,o)}else for(var l in t)t.hasOwnProperty(l)&&xh(e,l,t[l])}function pc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var W0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Z0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function _u(e){return Z0.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ba(){}var Cd=null;function mc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ur=null,Wr=null;function gh(e){var t=fl(e);if(t&&(e=t.stateNode)){var a=e[It]||null;e:switch(e=t.stateNode,t.type){case"input":if(Sd(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Vt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var o=a[t];if(o!==e&&o.form===e.form){var r=o[It]||null;if(!r)throw Error(k(90));Sd(o,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(t=0;t<a.length;t++)o=a[t],o.form===e.form&&Qx(o)}break e;case"textarea":$x(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&jr(e,!!a.multiple,t,!1)}}}var Nf=!1;function ag(e,t,a){if(Nf)return e(t,a);Nf=!0;try{var o=e(t);return o}finally{if(Nf=!1,(Ur!==null||Wr!==null)&&(Gs(),Ur&&(t=Ur,e=Wr,Wr=Ur=null,gh(t),e)))for(t=0;t<e.length;t++)gh(e[t])}}function dn(e,t){var a=e.stateNode;if(a===null)return null;var o=a[It]||null;if(o===null)return null;a=o[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(k(231,t,typeof a));return a}var za=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Id=!1;if(za)try{Ar={},Object.defineProperty(Ar,"passive",{get:function(){Id=!0}}),window.addEventListener("test",Ar,Ar),window.removeEventListener("test",Ar,Ar)}catch{Id=!1}var Ar,no=null,hc=null,Gu=null;function og(){if(Gu)return Gu;var e,t=hc,a=t.length,o,r="value"in no?no.value:no.textContent,l=r.length;for(e=0;e<a&&t[e]===r[e];e++);var n=a-e;for(o=1;o<=n&&t[a-o]===r[l-o];o++);return Gu=r.slice(e,1<o?1-o:void 0)}function Vu(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Au(){return!0}function vh(){return!1}function Rt(e){function t(a,o,r,l,n){this._reactName=a,this._targetInst=r,this.type=o,this.nativeEvent=l,this.target=n,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(a=e[u],this[u]=a?a(l):l[u]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Au:vh,this.isPropagationStopped=vh,this}return Me(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Au)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Au)},persist:function(){},isPersistent:Au}),t}var ar={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Es=Rt(ar),Mn=Me({},ar,{view:0,detail:0}),Y0=Rt(Mn),zf,qf,zl,Os=Me({},Mn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zl&&(zl&&e.type==="mousemove"?(zf=e.screenX-zl.screenX,qf=e.screenY-zl.screenY):qf=zf=0,zl=e),zf)},movementY:function(e){return"movementY"in e?e.movementY:qf}}),bh=Rt(Os),K0=Me({},Os,{dataTransfer:0}),Q0=Rt(K0),J0=Me({},Mn,{relatedTarget:0}),Ff=Rt(J0),$0=Me({},ar,{animationName:0,elapsedTime:0,pseudoElement:0}),eC=Rt($0),tC=Me({},ar,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),aC=Rt(tC),oC=Me({},ar,{data:0}),yh=Rt(oC),rC={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},lC={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},nC={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function uC(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=nC[e])?!!t[e]:!1}function xc(){return uC}var sC=Me({},Mn,{key:function(e){if(e.key){var t=rC[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Vu(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?lC[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xc,charCode:function(e){return e.type==="keypress"?Vu(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Vu(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),iC=Rt(sC),fC=Me({},Os,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wh=Rt(fC),dC=Me({},Mn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xc}),cC=Rt(dC),pC=Me({},ar,{propertyName:0,elapsedTime:0,pseudoElement:0}),mC=Rt(pC),hC=Me({},Os,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),xC=Rt(hC),gC=Me({},ar,{newState:0,oldState:0}),vC=Rt(gC),bC=[9,13,27,32],gc=za&&"CompositionEvent"in window,Kl=null;za&&"documentMode"in document&&(Kl=document.documentMode);var yC=za&&"TextEvent"in window&&!Kl,rg=za&&(!gc||Kl&&8<Kl&&11>=Kl),Sh=" ",Lh=!1;function lg(e,t){switch(e){case"keyup":return bC.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ng(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Hr=!1;function wC(e,t){switch(e){case"compositionend":return ng(t);case"keypress":return t.which!==32?null:(Lh=!0,Sh);case"textInput":return e=t.data,e===Sh&&Lh?null:e;default:return null}}function SC(e,t){if(Hr)return e==="compositionend"||!gc&&lg(e,t)?(e=og(),Gu=hc=no=null,Hr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return rg&&t.locale!=="ko"?null:t.data;default:return null}}var LC={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ch(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!LC[e.type]:t==="textarea"}function ug(e,t,a,o){Ur?Wr?Wr.push(o):Wr=[o]:Ur=o,t=Cs(t,"onChange"),0<t.length&&(a=new Es("onChange","change",null,a,o),e.push({event:a,listeners:t}))}var Ql=null,cn=null;function CC(e){ab(e,0)}function Bs(e){var t=Wl(e);if(Qx(t))return e}function Ih(e,t){if(e==="change")return t}var sg=!1;za&&(za?(Du="oninput"in document,Du||(_f=document.createElement("div"),_f.setAttribute("oninput","return;"),Du=typeof _f.oninput=="function"),Mu=Du):Mu=!1,sg=Mu&&(!document.documentMode||9<document.documentMode));var Mu,Du,_f;function Rh(){Ql&&(Ql.detachEvent("onpropertychange",ig),cn=Ql=null)}function ig(e){if(e.propertyName==="value"&&Bs(cn)){var t=[];ug(t,cn,e,mc(e)),ag(CC,t)}}function IC(e,t,a){e==="focusin"?(Rh(),Ql=t,cn=a,Ql.attachEvent("onpropertychange",ig)):e==="focusout"&&Rh()}function RC(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Bs(cn)}function kC(e,t){if(e==="click")return Bs(t)}function AC(e,t){if(e==="input"||e==="change")return Bs(t)}function MC(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ht=typeof Object.is=="function"?Object.is:MC;function pn(e,t){if(Ht(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),o=Object.keys(t);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var r=a[o];if(!bd.call(t,r)||!Ht(e[r],t[r]))return!1}return!0}function kh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ah(e,t){var a=kh(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=t&&o>=t)return{node:a,offset:t-e};e=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=kh(a)}}function fg(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?fg(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function dg(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ns(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=ns(e.document)}return t}function vc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var DC=za&&"documentMode"in document&&11>=document.documentMode,Nr=null,Rd=null,Jl=null,kd=!1;function Mh(e,t,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;kd||Nr==null||Nr!==ns(o)||(o=Nr,"selectionStart"in o&&vc(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Jl&&pn(Jl,o)||(Jl=o,o=Cs(Rd,"onSelect"),0<o.length&&(t=new Es("onSelect","select",null,t,a),e.push({event:t,listeners:o}),t.target=Nr)))}function qo(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var zr={animationend:qo("Animation","AnimationEnd"),animationiteration:qo("Animation","AnimationIteration"),animationstart:qo("Animation","AnimationStart"),transitionrun:qo("Transition","TransitionRun"),transitionstart:qo("Transition","TransitionStart"),transitioncancel:qo("Transition","TransitionCancel"),transitionend:qo("Transition","TransitionEnd")},Gf={},cg={};za&&(cg=document.createElement("div").style,"AnimationEvent"in window||(delete zr.animationend.animation,delete zr.animationiteration.animation,delete zr.animationstart.animation),"TransitionEvent"in window||delete zr.transitionend.transition);function or(e){if(Gf[e])return Gf[e];if(!zr[e])return e;var t=zr[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in cg)return Gf[e]=t[a];return e}var pg=or("animationend"),mg=or("animationiteration"),hg=or("animationstart"),TC=or("transitionrun"),EC=or("transitionstart"),OC=or("transitioncancel"),xg=or("transitionend"),gg=new Map,Ad="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ad.push("scrollEnd");function oa(e,t){gg.set(e,t),tr(t,[e])}var us=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},qt=[],qr=0,bc=0;function Ps(){for(var e=qr,t=bc=qr=0;t<e;){var a=qt[t];qt[t++]=null;var o=qt[t];qt[t++]=null;var r=qt[t];qt[t++]=null;var l=qt[t];if(qt[t++]=null,o!==null&&r!==null){var n=o.pending;n===null?r.next=r:(r.next=n.next,n.next=r),o.pending=r}l!==0&&vg(a,r,l)}}function Us(e,t,a,o){qt[qr++]=e,qt[qr++]=t,qt[qr++]=a,qt[qr++]=o,bc|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function yc(e,t,a,o){return Us(e,t,a,o),ss(e)}function rr(e,t){return Us(e,null,null,t),ss(e)}function vg(e,t,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var r=!1,l=e.return;l!==null;)l.childLanes|=a,o=l.alternate,o!==null&&(o.childLanes|=a),l.tag===22&&(e=l.stateNode,e===null||e._visibility&1||(r=!0)),e=l,l=l.return;return e.tag===3?(l=e.stateNode,r&&t!==null&&(r=31-Pt(a),e=l.hiddenUpdates,o=e[r],o===null?e[r]=[t]:o.push(t),t.lane=a|536870912),l):null}function ss(e){if(50<un)throw un=0,Yd=null,Error(k(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Fr={};function BC(e,t,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Tt(e,t,a,o){return new BC(e,t,a,o)}function wc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ua(e,t){var a=e.alternate;return a===null?(a=Tt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function bg(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Xu(e,t,a,o,r,l){var n=0;if(o=e,typeof e=="function")wc(e)&&(n=1);else if(typeof e=="string")n=H1(e,a,xa.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case hd:return e=Tt(31,a,t,r),e.elementType=hd,e.lanes=l,e;case Or:return jo(a.children,r,l,t);case Nx:n=8,r|=24;break;case cd:return e=Tt(12,a,t,r|2),e.elementType=cd,e.lanes=l,e;case pd:return e=Tt(13,a,t,r),e.elementType=pd,e.lanes=l,e;case md:return e=Tt(19,a,t,r),e.elementType=md,e.lanes=l,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Oa:n=10;break e;case zx:n=9;break e;case uc:n=11;break e;case sc:n=14;break e;case $a:n=16,o=null;break e}n=29,a=Error(k(130,e===null?"null":typeof e,"")),o=null}return t=Tt(n,a,t,r),t.elementType=e,t.type=o,t.lanes=l,t}function jo(e,t,a,o){return e=Tt(7,e,o,t),e.lanes=a,e}function Vf(e,t,a){return e=Tt(6,e,null,t),e.lanes=a,e}function yg(e){var t=Tt(18,null,null,0);return t.stateNode=e,t}function Xf(e,t,a){return t=Tt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Dh=new WeakMap;function Xt(e,t){if(typeof e=="object"&&e!==null){var a=Dh.get(e);return a!==void 0?a:(t={value:e,source:t,stack:dh(t)},Dh.set(e,t),t)}return{value:e,source:t,stack:dh(t)}}var _r=[],Gr=0,is=null,mn=0,_t=[],Gt=0,yo=null,pa=1,ma="";function Ta(e,t){_r[Gr++]=mn,_r[Gr++]=is,is=e,mn=t}function wg(e,t,a){_t[Gt++]=pa,_t[Gt++]=ma,_t[Gt++]=yo,yo=e;var o=pa;e=ma;var r=32-Pt(o)-1;o&=~(1<<r),a+=1;var l=32-Pt(t)+r;if(30<l){var n=r-r%5;l=(o&(1<<n)-1).toString(32),o>>=n,r-=n,pa=1<<32-Pt(t)+r|a<<r|o,ma=l+e}else pa=1<<l|a<<r|o,ma=e}function Sc(e){e.return!==null&&(Ta(e,1),wg(e,1,0))}function Lc(e){for(;e===is;)is=_r[--Gr],_r[Gr]=null,mn=_r[--Gr],_r[Gr]=null;for(;e===yo;)yo=_t[--Gt],_t[Gt]=null,ma=_t[--Gt],_t[Gt]=null,pa=_t[--Gt],_t[Gt]=null}function Sg(e,t){_t[Gt++]=pa,_t[Gt++]=ma,_t[Gt++]=yo,pa=t.id,ma=t.overflow,yo=e}var lt=null,Ae=null,re=!1,co=null,jt=!1,Md=Error(k(519));function wo(e){var t=Error(k(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw hn(Xt(t,e)),Md}function Th(e){var t=e.stateNode,a=e.type,o=e.memoizedProps;switch(t[rt]=e,t[It]=o,a){case"dialog":J("cancel",t),J("close",t);break;case"iframe":case"object":case"embed":J("load",t);break;case"video":case"audio":for(a=0;a<bn.length;a++)J(bn[a],t);break;case"source":J("error",t);break;case"img":case"image":case"link":J("error",t),J("load",t);break;case"details":J("toggle",t);break;case"input":J("invalid",t),Jx(t,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":J("invalid",t);break;case"textarea":J("invalid",t),eg(t,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||o.suppressHydrationWarning===!0||rb(t.textContent,a)?(o.popover!=null&&(J("beforetoggle",t),J("toggle",t)),o.onScroll!=null&&J("scroll",t),o.onScrollEnd!=null&&J("scrollend",t),o.onClick!=null&&(t.onclick=Ba),t=!0):t=!1,t||wo(e,!0)}function Eh(e){for(lt=e.return;lt;)switch(lt.tag){case 5:case 31:case 13:jt=!1;return;case 27:case 3:jt=!0;return;default:lt=lt.return}}function Mr(e){if(e!==lt)return!1;if(!re)return Eh(e),re=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||ec(e.type,e.memoizedProps)),a=!a),a&&Ae&&wo(e),Eh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));Ae=yx(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));Ae=yx(e)}else t===27?(t=Ae,Io(e.type)?(e=rc,rc=null,Ae=e):Ae=t):Ae=lt?Zt(e.stateNode.nextSibling):null;return!0}function Ko(){Ae=lt=null,re=!1}function jf(){var e=co;return e!==null&&(Lt===null?Lt=e:Lt.push.apply(Lt,e),co=null),e}function hn(e){co===null?co=[e]:co.push(e)}var Dd=ga(null),lr=null,Pa=null;function to(e,t,a){Ce(Dd,t._currentValue),t._currentValue=a}function Ha(e){e._currentValue=Dd.current,at(Dd)}function Td(e,t,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,o!==null&&(o.childLanes|=t)):o!==null&&(o.childLanes&t)!==t&&(o.childLanes|=t),e===a)break;e=e.return}}function Ed(e,t,a,o){var r=e.child;for(r!==null&&(r.return=e);r!==null;){var l=r.dependencies;if(l!==null){var n=r.child;l=l.firstContext;e:for(;l!==null;){var u=l;l=r;for(var s=0;s<t.length;s++)if(u.context===t[s]){l.lanes|=a,u=l.alternate,u!==null&&(u.lanes|=a),Td(l.return,a,e),o||(n=null);break e}l=u.next}}else if(r.tag===18){if(n=r.return,n===null)throw Error(k(341));n.lanes|=a,l=n.alternate,l!==null&&(l.lanes|=a),Td(n,a,e),n=null}else n=r.child;if(n!==null)n.return=r;else for(n=r;n!==null;){if(n===e){n=null;break}if(r=n.sibling,r!==null){r.return=n.return,n=r;break}n=n.return}r=n}}function dl(e,t,a,o){e=null;for(var r=t,l=!1;r!==null;){if(!l){if(r.flags&524288)l=!0;else if(r.flags&262144)break}if(r.tag===10){var n=r.alternate;if(n===null)throw Error(k(387));if(n=n.memoizedProps,n!==null){var u=r.type;Ht(r.pendingProps.value,n.value)||(e!==null?e.push(u):e=[u])}}else if(r===as.current){if(n=r.alternate,n===null)throw Error(k(387));n.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(e!==null?e.push(wn):e=[wn])}r=r.return}e!==null&&Ed(t,e,a,o),t.flags|=262144}function fs(e){for(e=e.firstContext;e!==null;){if(!Ht(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Qo(e){lr=e,Pa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function nt(e){return Lg(lr,e)}function Tu(e,t){return lr===null&&Qo(e),Lg(e,t)}function Lg(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},Pa===null){if(e===null)throw Error(k(308));Pa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Pa=Pa.next=t;return a}var PC=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},UC=Je.unstable_scheduleCallback,HC=Je.unstable_NormalPriority,je={$$typeof:Oa,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Cc(){return{controller:new PC,data:new Map,refCount:0}}function Dn(e){e.refCount--,e.refCount===0&&UC(HC,function(){e.controller.abort()})}var $l=null,Od=0,tl=0,Zr=null;function NC(e,t){if($l===null){var a=$l=[];Od=0,tl=Yc(),Zr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Od++,t.then(Oh,Oh),t}function Oh(){if(--Od===0&&$l!==null){Zr!==null&&(Zr.status="fulfilled");var e=$l;$l=null,tl=0,Zr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function zC(e,t){var a=[],o={status:"pending",value:null,reason:null,then:function(r){a.push(r)}};return e.then(function(){o.status="fulfilled",o.value=t;for(var r=0;r<a.length;r++)(0,a[r])(t)},function(r){for(o.status="rejected",o.reason=r,r=0;r<a.length;r++)(0,a[r])(void 0)}),o}var Bh=V.S;V.S=function(e,t){Hv=Ot(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&NC(e,t),Bh!==null&&Bh(e,t)};var Wo=ga(null);function Ic(){var e=Wo.current;return e!==null?e:Se.pooledCache}function ju(e,t){t===null?Ce(Wo,Wo.current):Ce(Wo,t.pool)}function Cg(){var e=Ic();return e===null?null:{parent:je._currentValue,pool:e}}var cl=Error(k(460)),Rc=Error(k(474)),Hs=Error(k(542)),ds={then:function(){}};function Ph(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Ig(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(Ba,Ba),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Hh(e),e;default:if(typeof t.status=="string")t.then(Ba,Ba);else{if(e=Se,e!==null&&100<e.shellSuspendCounter)throw Error(k(482));e=t,e.status="pending",e.then(function(o){if(t.status==="pending"){var r=t;r.status="fulfilled",r.value=o}},function(o){if(t.status==="pending"){var r=t;r.status="rejected",r.reason=o}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Hh(e),e}throw Zo=t,cl}}function Go(e){try{var t=e._init;return t(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Zo=a,cl):a}}var Zo=null;function Uh(){if(Zo===null)throw Error(k(459));var e=Zo;return Zo=null,e}function Hh(e){if(e===cl||e===Hs)throw Error(k(483))}var Yr=null,xn=0;function Eu(e){var t=xn;return xn+=1,Yr===null&&(Yr=[]),Ig(Yr,e,t)}function ql(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Ou(e,t){throw t.$$typeof===I0?Error(k(525)):(e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Rg(e){function t(c,f){if(e){var m=c.deletions;m===null?(c.deletions=[f],c.flags|=16):m.push(f)}}function a(c,f){if(!e)return null;for(;f!==null;)t(c,f),f=f.sibling;return null}function o(c){for(var f=new Map;c!==null;)c.key!==null?f.set(c.key,c):f.set(c.index,c),c=c.sibling;return f}function r(c,f){return c=Ua(c,f),c.index=0,c.sibling=null,c}function l(c,f,m){return c.index=m,e?(m=c.alternate,m!==null?(m=m.index,m<f?(c.flags|=67108866,f):m):(c.flags|=67108866,f)):(c.flags|=1048576,f)}function n(c){return e&&c.alternate===null&&(c.flags|=67108866),c}function u(c,f,m,g){return f===null||f.tag!==6?(f=Vf(m,c.mode,g),f.return=c,f):(f=r(f,m),f.return=c,f)}function s(c,f,m,g){var S=m.type;return S===Or?d(c,f,m.props.children,g,m.key):f!==null&&(f.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===$a&&Go(S)===f.type)?(f=r(f,m.props),ql(f,m),f.return=c,f):(f=Xu(m.type,m.key,m.props,null,c.mode,g),ql(f,m),f.return=c,f)}function i(c,f,m,g){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=Xf(m,c.mode,g),f.return=c,f):(f=r(f,m.children||[]),f.return=c,f)}function d(c,f,m,g,S){return f===null||f.tag!==7?(f=jo(m,c.mode,g,S),f.return=c,f):(f=r(f,m),f.return=c,f)}function p(c,f,m){if(typeof f=="string"&&f!==""||typeof f=="number"||typeof f=="bigint")return f=Vf(""+f,c.mode,m),f.return=c,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Lu:return m=Xu(f.type,f.key,f.props,null,c.mode,m),ql(m,f),m.return=c,m;case Xl:return f=Xf(f,c.mode,m),f.return=c,f;case $a:return f=Go(f),p(c,f,m)}if(jl(f)||Nl(f))return f=jo(f,c.mode,m,null),f.return=c,f;if(typeof f.then=="function")return p(c,Eu(f),m);if(f.$$typeof===Oa)return p(c,Tu(c,f),m);Ou(c,f)}return null}function x(c,f,m,g){var S=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return S!==null?null:u(c,f,""+m,g);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Lu:return m.key===S?s(c,f,m,g):null;case Xl:return m.key===S?i(c,f,m,g):null;case $a:return m=Go(m),x(c,f,m,g)}if(jl(m)||Nl(m))return S!==null?null:d(c,f,m,g,null);if(typeof m.then=="function")return x(c,f,Eu(m),g);if(m.$$typeof===Oa)return x(c,f,Tu(c,m),g);Ou(c,m)}return null}function h(c,f,m,g,S){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return c=c.get(m)||null,u(f,c,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Lu:return c=c.get(g.key===null?m:g.key)||null,s(f,c,g,S);case Xl:return c=c.get(g.key===null?m:g.key)||null,i(f,c,g,S);case $a:return g=Go(g),h(c,f,m,g,S)}if(jl(g)||Nl(g))return c=c.get(m)||null,d(f,c,g,S,null);if(typeof g.then=="function")return h(c,f,m,Eu(g),S);if(g.$$typeof===Oa)return h(c,f,m,Tu(f,g),S);Ou(f,g)}return null}function b(c,f,m,g){for(var S=null,I=null,C=f,L=f=0,R=null;C!==null&&L<m.length;L++){C.index>L?(R=C,C=null):R=C.sibling;var A=x(c,C,m[L],g);if(A===null){C===null&&(C=R);break}e&&C&&A.alternate===null&&t(c,C),f=l(A,f,L),I===null?S=A:I.sibling=A,I=A,C=R}if(L===m.length)return a(c,C),re&&Ta(c,L),S;if(C===null){for(;L<m.length;L++)C=p(c,m[L],g),C!==null&&(f=l(C,f,L),I===null?S=C:I.sibling=C,I=C);return re&&Ta(c,L),S}for(C=o(C);L<m.length;L++)R=h(C,c,L,m[L],g),R!==null&&(e&&R.alternate!==null&&C.delete(R.key===null?L:R.key),f=l(R,f,L),I===null?S=R:I.sibling=R,I=R);return e&&C.forEach(function(z){return t(c,z)}),re&&Ta(c,L),S}function v(c,f,m,g){if(m==null)throw Error(k(151));for(var S=null,I=null,C=f,L=f=0,R=null,A=m.next();C!==null&&!A.done;L++,A=m.next()){C.index>L?(R=C,C=null):R=C.sibling;var z=x(c,C,A.value,g);if(z===null){C===null&&(C=R);break}e&&C&&z.alternate===null&&t(c,C),f=l(z,f,L),I===null?S=z:I.sibling=z,I=z,C=R}if(A.done)return a(c,C),re&&Ta(c,L),S;if(C===null){for(;!A.done;L++,A=m.next())A=p(c,A.value,g),A!==null&&(f=l(A,f,L),I===null?S=A:I.sibling=A,I=A);return re&&Ta(c,L),S}for(C=o(C);!A.done;L++,A=m.next())A=h(C,c,L,A.value,g),A!==null&&(e&&A.alternate!==null&&C.delete(A.key===null?L:A.key),f=l(A,f,L),I===null?S=A:I.sibling=A,I=A);return e&&C.forEach(function(G){return t(c,G)}),re&&Ta(c,L),S}function y(c,f,m,g){if(typeof m=="object"&&m!==null&&m.type===Or&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Lu:e:{for(var S=m.key;f!==null;){if(f.key===S){if(S=m.type,S===Or){if(f.tag===7){a(c,f.sibling),g=r(f,m.props.children),g.return=c,c=g;break e}}else if(f.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===$a&&Go(S)===f.type){a(c,f.sibling),g=r(f,m.props),ql(g,m),g.return=c,c=g;break e}a(c,f);break}else t(c,f);f=f.sibling}m.type===Or?(g=jo(m.props.children,c.mode,g,m.key),g.return=c,c=g):(g=Xu(m.type,m.key,m.props,null,c.mode,g),ql(g,m),g.return=c,c=g)}return n(c);case Xl:e:{for(S=m.key;f!==null;){if(f.key===S)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){a(c,f.sibling),g=r(f,m.children||[]),g.return=c,c=g;break e}else{a(c,f);break}else t(c,f);f=f.sibling}g=Xf(m,c.mode,g),g.return=c,c=g}return n(c);case $a:return m=Go(m),y(c,f,m,g)}if(jl(m))return b(c,f,m,g);if(Nl(m)){if(S=Nl(m),typeof S!="function")throw Error(k(150));return m=S.call(m),v(c,f,m,g)}if(typeof m.then=="function")return y(c,f,Eu(m),g);if(m.$$typeof===Oa)return y(c,f,Tu(c,m),g);Ou(c,m)}return typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint"?(m=""+m,f!==null&&f.tag===6?(a(c,f.sibling),g=r(f,m),g.return=c,c=g):(a(c,f),g=Vf(m,c.mode,g),g.return=c,c=g),n(c)):a(c,f)}return function(c,f,m,g){try{xn=0;var S=y(c,f,m,g);return Yr=null,S}catch(C){if(C===cl||C===Hs)throw C;var I=Tt(29,C,null,c.mode);return I.lanes=g,I.return=c,I}finally{}}}var Jo=Rg(!0),kg=Rg(!1),eo=!1;function kc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Bd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function po(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function mo(e,t,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,de&2){var r=o.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),o.pending=t,t=ss(e),vg(e,null,a),t}return Us(e,o,t,a),ss(e)}function en(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var o=t.lanes;o&=e.pendingLanes,a|=o,t.lanes=a,Xx(e,a)}}function Wf(e,t){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var r=null,l=null;if(a=a.firstBaseUpdate,a!==null){do{var n={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};l===null?r=l=n:l=l.next=n,a=a.next}while(a!==null);l===null?r=l=t:l=l.next=t}else r=l=t;a={baseState:o.baseState,firstBaseUpdate:r,lastBaseUpdate:l,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Pd=!1;function tn(){if(Pd){var e=Zr;if(e!==null)throw e}}function an(e,t,a,o){Pd=!1;var r=e.updateQueue;eo=!1;var l=r.firstBaseUpdate,n=r.lastBaseUpdate,u=r.shared.pending;if(u!==null){r.shared.pending=null;var s=u,i=s.next;s.next=null,n===null?l=i:n.next=i,n=s;var d=e.alternate;d!==null&&(d=d.updateQueue,u=d.lastBaseUpdate,u!==n&&(u===null?d.firstBaseUpdate=i:u.next=i,d.lastBaseUpdate=s))}if(l!==null){var p=r.baseState;n=0,d=i=s=null,u=l;do{var x=u.lane&-536870913,h=x!==u.lane;if(h?(ae&x)===x:(o&x)===x){x!==0&&x===tl&&(Pd=!0),d!==null&&(d=d.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});e:{var b=e,v=u;x=t;var y=a;switch(v.tag){case 1:if(b=v.payload,typeof b=="function"){p=b.call(y,p,x);break e}p=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=v.payload,x=typeof b=="function"?b.call(y,p,x):b,x==null)break e;p=Me({},p,x);break e;case 2:eo=!0}}x=u.callback,x!==null&&(e.flags|=64,h&&(e.flags|=8192),h=r.callbacks,h===null?r.callbacks=[x]:h.push(x))}else h={lane:x,tag:u.tag,payload:u.payload,callback:u.callback,next:null},d===null?(i=d=h,s=p):d=d.next=h,n|=x;if(u=u.next,u===null){if(u=r.shared.pending,u===null)break;h=u,u=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);d===null&&(s=p),r.baseState=s,r.firstBaseUpdate=i,r.lastBaseUpdate=d,l===null&&(r.shared.lanes=0),Lo|=n,e.lanes=n,e.memoizedState=p}}function Ag(e,t){if(typeof e!="function")throw Error(k(191,e));e.call(t)}function Mg(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Ag(a[e],t)}var al=ga(null),cs=ga(0);function Nh(e,t){e=Ga,Ce(cs,e),Ce(al,t),Ga=e|t.baseLanes}function Ud(){Ce(cs,Ga),Ce(al,al.current)}function Ac(){Ga=cs.current,at(al),at(cs)}var Nt=ga(null),Wt=null;function ao(e){var t=e.alternate;Ce(_e,_e.current&1),Ce(Nt,e),Wt===null&&(t===null||al.current!==null||t.memoizedState!==null)&&(Wt=e)}function Hd(e){Ce(_e,_e.current),Ce(Nt,e),Wt===null&&(Wt=e)}function Dg(e){e.tag===22?(Ce(_e,_e.current),Ce(Nt,e),Wt===null&&(Wt=e)):oo(e)}function oo(){Ce(_e,_e.current),Ce(Nt,Nt.current)}function Dt(e){at(Nt),Wt===e&&(Wt=null),at(_e)}var _e=ga(0);function ps(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ac(a)||oc(a)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var qa=0,Y=null,ve=null,Ve=null,ms=!1,Kr=!1,$o=!1,hs=0,gn=0,Qr=null,qC=0;function ze(){throw Error(k(321))}function Mc(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!Ht(e[a],t[a]))return!1;return!0}function Dc(e,t,a,o,r,l){return qa=l,Y=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,V.H=e===null||e.memoizedState===null?uv:Fc,$o=!1,l=a(o,r),$o=!1,Kr&&(l=Eg(t,a,o,r)),Tg(e),l}function Tg(e){V.H=vn;var t=ve!==null&&ve.next!==null;if(qa=0,Ve=ve=Y=null,ms=!1,gn=0,Qr=null,t)throw Error(k(300));e===null||We||(e=e.dependencies,e!==null&&fs(e)&&(We=!0))}function Eg(e,t,a,o){Y=e;var r=0;do{if(Kr&&(Qr=null),gn=0,Kr=!1,25<=r)throw Error(k(301));if(r+=1,Ve=ve=null,e.updateQueue!=null){var l=e.updateQueue;l.lastEffect=null,l.events=null,l.stores=null,l.memoCache!=null&&(l.memoCache.index=0)}V.H=sv,l=t(a,o)}while(Kr);return l}function FC(){var e=V.H,t=e.useState()[0];return t=typeof t.then=="function"?Tn(t):t,e=e.useState()[0],(ve!==null?ve.memoizedState:null)!==e&&(Y.flags|=1024),t}function Tc(){var e=hs!==0;return hs=0,e}function Ec(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function Oc(e){if(ms){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ms=!1}qa=0,Ve=ve=Y=null,Kr=!1,gn=hs=0,Qr=null}function gt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ve===null?Y.memoizedState=Ve=e:Ve=Ve.next=e,Ve}function Ge(){if(ve===null){var e=Y.alternate;e=e!==null?e.memoizedState:null}else e=ve.next;var t=Ve===null?Y.memoizedState:Ve.next;if(t!==null)Ve=t,ve=e;else{if(e===null)throw Y.alternate===null?Error(k(467)):Error(k(310));ve=e,e={memoizedState:ve.memoizedState,baseState:ve.baseState,baseQueue:ve.baseQueue,queue:ve.queue,next:null},Ve===null?Y.memoizedState=Ve=e:Ve=Ve.next=e}return Ve}function Ns(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Tn(e){var t=gn;return gn+=1,Qr===null&&(Qr=[]),e=Ig(Qr,e,t),t=Y,(Ve===null?t.memoizedState:Ve.next)===null&&(t=t.alternate,V.H=t===null||t.memoizedState===null?uv:Fc),e}function zs(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Tn(e);if(e.$$typeof===Oa)return nt(e)}throw Error(k(438,String(e)))}function Bc(e){var t=null,a=Y.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var o=Y.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(t={data:o.data.map(function(r){return r.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=Ns(),Y.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),o=0;o<e;o++)a[o]=R0;return t.index++,a}function Fa(e,t){return typeof t=="function"?t(e):t}function Wu(e){var t=Ge();return Pc(t,ve,e)}function Pc(e,t,a){var o=e.queue;if(o===null)throw Error(k(311));o.lastRenderedReducer=a;var r=e.baseQueue,l=o.pending;if(l!==null){if(r!==null){var n=r.next;r.next=l.next,l.next=n}t.baseQueue=r=l,o.pending=null}if(l=e.baseState,r===null)e.memoizedState=l;else{t=r.next;var u=n=null,s=null,i=t,d=!1;do{var p=i.lane&-536870913;if(p!==i.lane?(ae&p)===p:(qa&p)===p){var x=i.revertLane;if(x===0)s!==null&&(s=s.next={lane:0,revertLane:0,gesture:null,action:i.action,hasEagerState:i.hasEagerState,eagerState:i.eagerState,next:null}),p===tl&&(d=!0);else if((qa&x)===x){i=i.next,x===tl&&(d=!0);continue}else p={lane:0,revertLane:i.revertLane,gesture:null,action:i.action,hasEagerState:i.hasEagerState,eagerState:i.eagerState,next:null},s===null?(u=s=p,n=l):s=s.next=p,Y.lanes|=x,Lo|=x;p=i.action,$o&&a(l,p),l=i.hasEagerState?i.eagerState:a(l,p)}else x={lane:p,revertLane:i.revertLane,gesture:i.gesture,action:i.action,hasEagerState:i.hasEagerState,eagerState:i.eagerState,next:null},s===null?(u=s=x,n=l):s=s.next=x,Y.lanes|=p,Lo|=p;i=i.next}while(i!==null&&i!==t);if(s===null?n=l:s.next=u,!Ht(l,e.memoizedState)&&(We=!0,d&&(a=Zr,a!==null)))throw a;e.memoizedState=l,e.baseState=n,e.baseQueue=s,o.lastRenderedState=l}return r===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Zf(e){var t=Ge(),a=t.queue;if(a===null)throw Error(k(311));a.lastRenderedReducer=e;var o=a.dispatch,r=a.pending,l=t.memoizedState;if(r!==null){a.pending=null;var n=r=r.next;do l=e(l,n.action),n=n.next;while(n!==r);Ht(l,t.memoizedState)||(We=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),a.lastRenderedState=l}return[l,o]}function Og(e,t,a){var o=Y,r=Ge(),l=re;if(l){if(a===void 0)throw Error(k(407));a=a()}else a=t();var n=!Ht((ve||r).memoizedState,a);if(n&&(r.memoizedState=a,We=!0),r=r.queue,Uc(Ug.bind(null,o,r,e),[e]),r.getSnapshot!==t||n||Ve!==null&&Ve.memoizedState.tag&1){if(o.flags|=2048,ol(9,{destroy:void 0},Pg.bind(null,o,r,a,t),null),Se===null)throw Error(k(349));l||qa&127||Bg(o,t,a)}return a}function Bg(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=Y.updateQueue,t===null?(t=Ns(),Y.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function Pg(e,t,a,o){t.value=a,t.getSnapshot=o,Hg(t)&&Ng(e)}function Ug(e,t,a){return a(function(){Hg(t)&&Ng(e)})}function Hg(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!Ht(e,a)}catch{return!0}}function Ng(e){var t=rr(e,2);t!==null&&Ct(t,e,2)}function Nd(e){var t=gt();if(typeof e=="function"){var a=e;if(e=a(),$o){lo(!0);try{a()}finally{lo(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fa,lastRenderedState:e},t}function zg(e,t,a,o){return e.baseState=a,Pc(e,ve,typeof o=="function"?o:Fa)}function _C(e,t,a,o,r){if(Fs(e))throw Error(k(485));if(e=t.action,e!==null){var l={payload:r,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(n){l.listeners.push(n)}};V.T!==null?a(!0):l.isTransition=!1,o(l),a=t.pending,a===null?(l.next=t.pending=l,qg(t,l)):(l.next=a.next,t.pending=a.next=l)}}function qg(e,t){var a=t.action,o=t.payload,r=e.state;if(t.isTransition){var l=V.T,n={};V.T=n;try{var u=a(r,o),s=V.S;s!==null&&s(n,u),zh(e,t,u)}catch(i){zd(e,t,i)}finally{l!==null&&n.types!==null&&(l.types=n.types),V.T=l}}else try{l=a(r,o),zh(e,t,l)}catch(i){zd(e,t,i)}}function zh(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){qh(e,t,o)},function(o){return zd(e,t,o)}):qh(e,t,a)}function qh(e,t,a){t.status="fulfilled",t.value=a,Fg(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,qg(e,a)))}function zd(e,t,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do t.status="rejected",t.reason=a,Fg(t),t=t.next;while(t!==o)}e.action=null}function Fg(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function _g(e,t){return t}function Fh(e,t){if(re){var a=Se.formState;if(a!==null){e:{var o=Y;if(re){if(Ae){t:{for(var r=Ae,l=jt;r.nodeType!==8;){if(!l){r=null;break t}if(r=Zt(r.nextSibling),r===null){r=null;break t}}l=r.data,r=l==="F!"||l==="F"?r:null}if(r){Ae=Zt(r.nextSibling),o=r.data==="F!";break e}}wo(o)}o=!1}o&&(t=a[0])}}return a=gt(),a.memoizedState=a.baseState=t,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:_g,lastRenderedState:t},a.queue=o,a=rv.bind(null,Y,o),o.dispatch=a,o=Nd(!1),l=qc.bind(null,Y,!1,o.queue),o=gt(),r={state:t,dispatch:null,action:e,pending:null},o.queue=r,a=_C.bind(null,Y,r,l,a),r.dispatch=a,o.memoizedState=e,[t,a,!1]}function _h(e){var t=Ge();return Gg(t,ve,e)}function Gg(e,t,a){if(t=Pc(e,t,_g)[0],e=Wu(Fa)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var o=Tn(t)}catch(n){throw n===cl?Hs:n}else o=t;t=Ge();var r=t.queue,l=r.dispatch;return a!==t.memoizedState&&(Y.flags|=2048,ol(9,{destroy:void 0},GC.bind(null,r,a),null)),[o,l,e]}function GC(e,t){e.action=t}function Gh(e){var t=Ge(),a=ve;if(a!==null)return Gg(t,a,e);Ge(),t=t.memoizedState,a=Ge();var o=a.queue.dispatch;return a.memoizedState=e,[t,o,!1]}function ol(e,t,a,o){return e={tag:e,create:a,deps:o,inst:t,next:null},t=Y.updateQueue,t===null&&(t=Ns(),Y.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,t.lastEffect=e),e}function Vg(){return Ge().memoizedState}function Zu(e,t,a,o){var r=gt();Y.flags|=e,r.memoizedState=ol(1|t,{destroy:void 0},a,o===void 0?null:o)}function qs(e,t,a,o){var r=Ge();o=o===void 0?null:o;var l=r.memoizedState.inst;ve!==null&&o!==null&&Mc(o,ve.memoizedState.deps)?r.memoizedState=ol(t,l,a,o):(Y.flags|=e,r.memoizedState=ol(1|t,l,a,o))}function Vh(e,t){Zu(8390656,8,e,t)}function Uc(e,t){qs(2048,8,e,t)}function VC(e){Y.flags|=4;var t=Y.updateQueue;if(t===null)t=Ns(),Y.updateQueue=t,t.events=[e];else{var a=t.events;a===null?t.events=[e]:a.push(e)}}function Xg(e){var t=Ge().memoizedState;return VC({ref:t,nextImpl:e}),function(){if(de&2)throw Error(k(440));return t.impl.apply(void 0,arguments)}}function jg(e,t){return qs(4,2,e,t)}function Wg(e,t){return qs(4,4,e,t)}function Zg(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Yg(e,t,a){a=a!=null?a.concat([e]):null,qs(4,4,Zg.bind(null,t,e),a)}function Hc(){}function Kg(e,t){var a=Ge();t=t===void 0?null:t;var o=a.memoizedState;return t!==null&&Mc(t,o[1])?o[0]:(a.memoizedState=[e,t],e)}function Qg(e,t){var a=Ge();t=t===void 0?null:t;var o=a.memoizedState;if(t!==null&&Mc(t,o[1]))return o[0];if(o=e(),$o){lo(!0);try{e()}finally{lo(!1)}}return a.memoizedState=[o,t],o}function Nc(e,t,a){return a===void 0||qa&1073741824&&!(ae&261930)?e.memoizedState=t:(e.memoizedState=a,e=zv(),Y.lanes|=e,Lo|=e,a)}function Jg(e,t,a,o){return Ht(a,t)?a:al.current!==null?(e=Nc(e,a,o),Ht(e,t)||(We=!0),e):!(qa&42)||qa&1073741824&&!(ae&261930)?(We=!0,e.memoizedState=a):(e=zv(),Y.lanes|=e,Lo|=e,t)}function $g(e,t,a,o,r){var l=ce.p;ce.p=l!==0&&8>l?l:8;var n=V.T,u={};V.T=u,qc(e,!1,t,a);try{var s=r(),i=V.S;if(i!==null&&i(u,s),s!==null&&typeof s=="object"&&typeof s.then=="function"){var d=zC(s,o);on(e,t,d,Ut(e))}else on(e,t,o,Ut(e))}catch(p){on(e,t,{then:function(){},status:"rejected",reason:p},Ut())}finally{ce.p=l,n!==null&&u.types!==null&&(n.types=u.types),V.T=n}}function XC(){}function qd(e,t,a,o){if(e.tag!==5)throw Error(k(476));var r=ev(e).queue;$g(e,r,t,Xo,a===null?XC:function(){return tv(e),a(o)})}function ev(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Xo,baseState:Xo,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fa,lastRenderedState:Xo},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fa,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function tv(e){var t=ev(e);t.next===null&&(t=e.alternate.memoizedState),on(e,t.next.queue,{},Ut())}function zc(){return nt(wn)}function av(){return Ge().memoizedState}function ov(){return Ge().memoizedState}function jC(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=Ut();e=po(a);var o=mo(t,e,a);o!==null&&(Ct(o,t,a),en(o,t,a)),t={cache:Cc()},e.payload=t;return}t=t.return}}function WC(e,t,a){var o=Ut();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Fs(e)?lv(t,a):(a=yc(e,t,a,o),a!==null&&(Ct(a,e,o),nv(a,t,o)))}function rv(e,t,a){var o=Ut();on(e,t,a,o)}function on(e,t,a,o){var r={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Fs(e))lv(t,r);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var n=t.lastRenderedState,u=l(n,a);if(r.hasEagerState=!0,r.eagerState=u,Ht(u,n))return Us(e,t,r,0),Se===null&&Ps(),!1}catch{}finally{}if(a=yc(e,t,r,o),a!==null)return Ct(a,e,o),nv(a,t,o),!0}return!1}function qc(e,t,a,o){if(o={lane:2,revertLane:Yc(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Fs(e)){if(t)throw Error(k(479))}else t=yc(e,a,o,2),t!==null&&Ct(t,e,2)}function Fs(e){var t=e.alternate;return e===Y||t!==null&&t===Y}function lv(e,t){Kr=ms=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function nv(e,t,a){if(a&4194048){var o=t.lanes;o&=e.pendingLanes,a|=o,t.lanes=a,Xx(e,a)}}var vn={readContext:nt,use:zs,useCallback:ze,useContext:ze,useEffect:ze,useImperativeHandle:ze,useLayoutEffect:ze,useInsertionEffect:ze,useMemo:ze,useReducer:ze,useRef:ze,useState:ze,useDebugValue:ze,useDeferredValue:ze,useTransition:ze,useSyncExternalStore:ze,useId:ze,useHostTransitionStatus:ze,useFormState:ze,useActionState:ze,useOptimistic:ze,useMemoCache:ze,useCacheRefresh:ze};vn.useEffectEvent=ze;var uv={readContext:nt,use:zs,useCallback:function(e,t){return gt().memoizedState=[e,t===void 0?null:t],e},useContext:nt,useEffect:Vh,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,Zu(4194308,4,Zg.bind(null,t,e),a)},useLayoutEffect:function(e,t){return Zu(4194308,4,e,t)},useInsertionEffect:function(e,t){Zu(4,2,e,t)},useMemo:function(e,t){var a=gt();t=t===void 0?null:t;var o=e();if($o){lo(!0);try{e()}finally{lo(!1)}}return a.memoizedState=[o,t],o},useReducer:function(e,t,a){var o=gt();if(a!==void 0){var r=a(t);if($o){lo(!0);try{a(t)}finally{lo(!1)}}}else r=t;return o.memoizedState=o.baseState=r,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},o.queue=e,e=e.dispatch=WC.bind(null,Y,e),[o.memoizedState,e]},useRef:function(e){var t=gt();return e={current:e},t.memoizedState=e},useState:function(e){e=Nd(e);var t=e.queue,a=rv.bind(null,Y,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:Hc,useDeferredValue:function(e,t){var a=gt();return Nc(a,e,t)},useTransition:function(){var e=Nd(!1);return e=$g.bind(null,Y,e.queue,!0,!1),gt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var o=Y,r=gt();if(re){if(a===void 0)throw Error(k(407));a=a()}else{if(a=t(),Se===null)throw Error(k(349));ae&127||Bg(o,t,a)}r.memoizedState=a;var l={value:a,getSnapshot:t};return r.queue=l,Vh(Ug.bind(null,o,l,e),[e]),o.flags|=2048,ol(9,{destroy:void 0},Pg.bind(null,o,l,a,t),null),a},useId:function(){var e=gt(),t=Se.identifierPrefix;if(re){var a=ma,o=pa;a=(o&~(1<<32-Pt(o)-1)).toString(32)+a,t="_"+t+"R_"+a,a=hs++,0<a&&(t+="H"+a.toString(32)),t+="_"}else a=qC++,t="_"+t+"r_"+a.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:zc,useFormState:Fh,useActionState:Fh,useOptimistic:function(e){var t=gt();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=qc.bind(null,Y,!0,a),a.dispatch=t,[e,t]},useMemoCache:Bc,useCacheRefresh:function(){return gt().memoizedState=jC.bind(null,Y)},useEffectEvent:function(e){var t=gt(),a={impl:e};return t.memoizedState=a,function(){if(de&2)throw Error(k(440));return a.impl.apply(void 0,arguments)}}},Fc={readContext:nt,use:zs,useCallback:Kg,useContext:nt,useEffect:Uc,useImperativeHandle:Yg,useInsertionEffect:jg,useLayoutEffect:Wg,useMemo:Qg,useReducer:Wu,useRef:Vg,useState:function(){return Wu(Fa)},useDebugValue:Hc,useDeferredValue:function(e,t){var a=Ge();return Jg(a,ve.memoizedState,e,t)},useTransition:function(){var e=Wu(Fa)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Tn(e),t]},useSyncExternalStore:Og,useId:av,useHostTransitionStatus:zc,useFormState:_h,useActionState:_h,useOptimistic:function(e,t){var a=Ge();return zg(a,ve,e,t)},useMemoCache:Bc,useCacheRefresh:ov};Fc.useEffectEvent=Xg;var sv={readContext:nt,use:zs,useCallback:Kg,useContext:nt,useEffect:Uc,useImperativeHandle:Yg,useInsertionEffect:jg,useLayoutEffect:Wg,useMemo:Qg,useReducer:Zf,useRef:Vg,useState:function(){return Zf(Fa)},useDebugValue:Hc,useDeferredValue:function(e,t){var a=Ge();return ve===null?Nc(a,e,t):Jg(a,ve.memoizedState,e,t)},useTransition:function(){var e=Zf(Fa)[0],t=Ge().memoizedState;return[typeof e=="boolean"?e:Tn(e),t]},useSyncExternalStore:Og,useId:av,useHostTransitionStatus:zc,useFormState:Gh,useActionState:Gh,useOptimistic:function(e,t){var a=Ge();return ve!==null?zg(a,ve,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Bc,useCacheRefresh:ov};sv.useEffectEvent=Xg;function Yf(e,t,a,o){t=e.memoizedState,a=a(o,t),a=a==null?t:Me({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Fd={enqueueSetState:function(e,t,a){e=e._reactInternals;var o=Ut(),r=po(o);r.payload=t,a!=null&&(r.callback=a),t=mo(e,r,o),t!==null&&(Ct(t,e,o),en(t,e,o))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var o=Ut(),r=po(o);r.tag=1,r.payload=t,a!=null&&(r.callback=a),t=mo(e,r,o),t!==null&&(Ct(t,e,o),en(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=Ut(),o=po(a);o.tag=2,t!=null&&(o.callback=t),t=mo(e,o,a),t!==null&&(Ct(t,e,a),en(t,e,a))}};function Xh(e,t,a,o,r,l,n){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,l,n):t.prototype&&t.prototype.isPureReactComponent?!pn(a,o)||!pn(r,l):!0}function jh(e,t,a,o){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,o),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,o),t.state!==e&&Fd.enqueueReplaceState(t,t.state,null)}function er(e,t){var a=t;if("ref"in t){a={};for(var o in t)o!=="ref"&&(a[o]=t[o])}if(e=e.defaultProps){a===t&&(a=Me({},a));for(var r in e)a[r]===void 0&&(a[r]=e[r])}return a}function iv(e){us(e)}function fv(e){console.error(e)}function dv(e){us(e)}function xs(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(o){setTimeout(function(){throw o})}}function Wh(e,t,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function _d(e,t,a){return a=po(a),a.tag=3,a.payload={element:null},a.callback=function(){xs(e,t)},a}function cv(e){return e=po(e),e.tag=3,e}function pv(e,t,a,o){var r=a.type.getDerivedStateFromError;if(typeof r=="function"){var l=o.value;e.payload=function(){return r(l)},e.callback=function(){Wh(t,a,o)}}var n=a.stateNode;n!==null&&typeof n.componentDidCatch=="function"&&(e.callback=function(){Wh(t,a,o),typeof r!="function"&&(ho===null?ho=new Set([this]):ho.add(this));var u=o.stack;this.componentDidCatch(o.value,{componentStack:u!==null?u:""})})}function ZC(e,t,a,o,r){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(t=a.alternate,t!==null&&dl(t,a,r,!0),a=Nt.current,a!==null){switch(a.tag){case 31:case 13:return Wt===null?ws():a.alternate===null&&qe===0&&(qe=3),a.flags&=-257,a.flags|=65536,a.lanes=r,o===ds?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([o]):t.add(o),nd(e,o,r)),!1;case 22:return a.flags|=65536,o===ds?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([o]):a.add(o)),nd(e,o,r)),!1}throw Error(k(435,a.tag))}return nd(e,o,r),ws(),!1}if(re)return t=Nt.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=r,o!==Md&&(e=Error(k(422),{cause:o}),hn(Xt(e,a)))):(o!==Md&&(t=Error(k(423),{cause:o}),hn(Xt(t,a))),e=e.current.alternate,e.flags|=65536,r&=-r,e.lanes|=r,o=Xt(o,a),r=_d(e.stateNode,o,r),Wf(e,r),qe!==4&&(qe=2)),!1;var l=Error(k(520),{cause:o});if(l=Xt(l,a),nn===null?nn=[l]:nn.push(l),qe!==4&&(qe=2),t===null)return!0;o=Xt(o,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=r&-r,a.lanes|=e,e=_d(a.stateNode,o,e),Wf(a,e),!1;case 1:if(t=a.type,l=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||l!==null&&typeof l.componentDidCatch=="function"&&(ho===null||!ho.has(l))))return a.flags|=65536,r&=-r,a.lanes|=r,r=cv(r),pv(r,e,a,o),Wf(a,r),!1}a=a.return}while(a!==null);return!1}var _c=Error(k(461)),We=!1;function ot(e,t,a,o){t.child=e===null?kg(t,null,a,o):Jo(t,e.child,a,o)}function Zh(e,t,a,o,r){a=a.render;var l=t.ref;if("ref"in o){var n={};for(var u in o)u!=="ref"&&(n[u]=o[u])}else n=o;return Qo(t),o=Dc(e,t,a,n,l,r),u=Tc(),e!==null&&!We?(Ec(e,t,r),_a(e,t,r)):(re&&u&&Sc(t),t.flags|=1,ot(e,t,o,r),t.child)}function Yh(e,t,a,o,r){if(e===null){var l=a.type;return typeof l=="function"&&!wc(l)&&l.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=l,mv(e,t,l,o,r)):(e=Xu(a.type,null,o,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!Gc(e,r)){var n=l.memoizedProps;if(a=a.compare,a=a!==null?a:pn,a(n,o)&&e.ref===t.ref)return _a(e,t,r)}return t.flags|=1,e=Ua(l,o),e.ref=t.ref,e.return=t,t.child=e}function mv(e,t,a,o,r){if(e!==null){var l=e.memoizedProps;if(pn(l,o)&&e.ref===t.ref)if(We=!1,t.pendingProps=o=l,Gc(e,r))e.flags&131072&&(We=!0);else return t.lanes=e.lanes,_a(e,t,r)}return Gd(e,t,a,o,r)}function hv(e,t,a,o){var r=o.children,l=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if(t.flags&128){if(l=l!==null?l.baseLanes|a:a,e!==null){for(o=t.child=e.child,r=0;o!==null;)r=r|o.lanes|o.childLanes,o=o.sibling;o=r&~l}else o=0,t.child=null;return Kh(e,t,l,a,o)}if(a&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ju(t,l!==null?l.cachePool:null),l!==null?Nh(t,l):Ud(),Dg(t);else return o=t.lanes=536870912,Kh(e,t,l!==null?l.baseLanes|a:a,a,o)}else l!==null?(ju(t,l.cachePool),Nh(t,l),oo(t),t.memoizedState=null):(e!==null&&ju(t,null),Ud(),oo(t));return ot(e,t,r,a),t.child}function Zl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Kh(e,t,a,o,r){var l=Ic();return l=l===null?null:{parent:je._currentValue,pool:l},t.memoizedState={baseLanes:a,cachePool:l},e!==null&&ju(t,null),Ud(),Dg(t),e!==null&&dl(e,t,o,!0),t.childLanes=r,null}function Yu(e,t){return t=gs({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Qh(e,t,a){return Jo(t,e.child,null,a),e=Yu(t,t.pendingProps),e.flags|=2,Dt(t),t.memoizedState=null,e}function YC(e,t,a){var o=t.pendingProps,r=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(re){if(o.mode==="hidden")return e=Yu(t,o),t.lanes=536870912,Zl(null,e);if(Hd(t),(e=Ae)?(e=ub(e,jt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:yo!==null?{id:pa,overflow:ma}:null,retryLane:536870912,hydrationErrors:null},a=yg(e),a.return=t,t.child=a,lt=t,Ae=null)):e=null,e===null)throw wo(t);return t.lanes=536870912,null}return Yu(t,o)}var l=e.memoizedState;if(l!==null){var n=l.dehydrated;if(Hd(t),r)if(t.flags&256)t.flags&=-257,t=Qh(e,t,a);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(k(558));else if(We||dl(e,t,a,!1),r=(a&e.childLanes)!==0,We||r){if(o=Se,o!==null&&(n=jx(o,a),n!==0&&n!==l.retryLane))throw l.retryLane=n,rr(e,n),Ct(o,e,n),_c;ws(),t=Qh(e,t,a)}else e=l.treeContext,Ae=Zt(n.nextSibling),lt=t,re=!0,co=null,jt=!1,e!==null&&Sg(t,e),t=Yu(t,o),t.flags|=4096;return t}return e=Ua(e.child,{mode:o.mode,children:o.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ku(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(k(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Gd(e,t,a,o,r){return Qo(t),a=Dc(e,t,a,o,void 0,r),o=Tc(),e!==null&&!We?(Ec(e,t,r),_a(e,t,r)):(re&&o&&Sc(t),t.flags|=1,ot(e,t,a,r),t.child)}function Jh(e,t,a,o,r,l){return Qo(t),t.updateQueue=null,a=Eg(t,o,a,r),Tg(e),o=Tc(),e!==null&&!We?(Ec(e,t,l),_a(e,t,l)):(re&&o&&Sc(t),t.flags|=1,ot(e,t,a,l),t.child)}function $h(e,t,a,o,r){if(Qo(t),t.stateNode===null){var l=Fr,n=a.contextType;typeof n=="object"&&n!==null&&(l=nt(n)),l=new a(o,l),t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=Fd,t.stateNode=l,l._reactInternals=t,l=t.stateNode,l.props=o,l.state=t.memoizedState,l.refs={},kc(t),n=a.contextType,l.context=typeof n=="object"&&n!==null?nt(n):Fr,l.state=t.memoizedState,n=a.getDerivedStateFromProps,typeof n=="function"&&(Yf(t,a,n,o),l.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(n=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),n!==l.state&&Fd.enqueueReplaceState(l,l.state,null),an(t,o,l,r),tn(),l.state=t.memoizedState),typeof l.componentDidMount=="function"&&(t.flags|=4194308),o=!0}else if(e===null){l=t.stateNode;var u=t.memoizedProps,s=er(a,u);l.props=s;var i=l.context,d=a.contextType;n=Fr,typeof d=="object"&&d!==null&&(n=nt(d));var p=a.getDerivedStateFromProps;d=typeof p=="function"||typeof l.getSnapshotBeforeUpdate=="function",u=t.pendingProps!==u,d||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(u||i!==n)&&jh(t,l,o,n),eo=!1;var x=t.memoizedState;l.state=x,an(t,o,l,r),tn(),i=t.memoizedState,u||x!==i||eo?(typeof p=="function"&&(Yf(t,a,p,o),i=t.memoizedState),(s=eo||Xh(t,a,s,o,x,i,n))?(d||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=o,t.memoizedState=i),l.props=o,l.state=i,l.context=n,o=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),o=!1)}else{l=t.stateNode,Bd(e,t),n=t.memoizedProps,d=er(a,n),l.props=d,p=t.pendingProps,x=l.context,i=a.contextType,s=Fr,typeof i=="object"&&i!==null&&(s=nt(i)),u=a.getDerivedStateFromProps,(i=typeof u=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(n!==p||x!==s)&&jh(t,l,o,s),eo=!1,x=t.memoizedState,l.state=x,an(t,o,l,r),tn();var h=t.memoizedState;n!==p||x!==h||eo||e!==null&&e.dependencies!==null&&fs(e.dependencies)?(typeof u=="function"&&(Yf(t,a,u,o),h=t.memoizedState),(d=eo||Xh(t,a,d,o,x,h,s)||e!==null&&e.dependencies!==null&&fs(e.dependencies))?(i||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(o,h,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(o,h,s)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||n===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||n===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),t.memoizedProps=o,t.memoizedState=h),l.props=o,l.state=h,l.context=s,o=d):(typeof l.componentDidUpdate!="function"||n===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||n===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),o=!1)}return l=o,Ku(e,t),o=(t.flags&128)!==0,l||o?(l=t.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:l.render(),t.flags|=1,e!==null&&o?(t.child=Jo(t,e.child,null,r),t.child=Jo(t,null,a,r)):ot(e,t,a,r),t.memoizedState=l.state,e=t.child):e=_a(e,t,r),e}function ex(e,t,a,o){return Ko(),t.flags|=256,ot(e,t,a,o),t.child}var Kf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qf(e){return{baseLanes:e,cachePool:Cg()}}function Jf(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=Et),e}function xv(e,t,a){var o=t.pendingProps,r=!1,l=(t.flags&128)!==0,n;if((n=l)||(n=e!==null&&e.memoizedState===null?!1:(_e.current&2)!==0),n&&(r=!0,t.flags&=-129),n=(t.flags&32)!==0,t.flags&=-33,e===null){if(re){if(r?ao(t):oo(t),(e=Ae)?(e=ub(e,jt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:yo!==null?{id:pa,overflow:ma}:null,retryLane:536870912,hydrationErrors:null},a=yg(e),a.return=t,t.child=a,lt=t,Ae=null)):e=null,e===null)throw wo(t);return oc(e)?t.lanes=32:t.lanes=536870912,null}var u=o.children;return o=o.fallback,r?(oo(t),r=t.mode,u=gs({mode:"hidden",children:u},r),o=jo(o,r,a,null),u.return=t,o.return=t,u.sibling=o,t.child=u,o=t.child,o.memoizedState=Qf(a),o.childLanes=Jf(e,n,a),t.memoizedState=Kf,Zl(null,o)):(ao(t),Vd(t,u))}var s=e.memoizedState;if(s!==null&&(u=s.dehydrated,u!==null)){if(l)t.flags&256?(ao(t),t.flags&=-257,t=$f(e,t,a)):t.memoizedState!==null?(oo(t),t.child=e.child,t.flags|=128,t=null):(oo(t),u=o.fallback,r=t.mode,o=gs({mode:"visible",children:o.children},r),u=jo(u,r,a,null),u.flags|=2,o.return=t,u.return=t,o.sibling=u,t.child=o,Jo(t,e.child,null,a),o=t.child,o.memoizedState=Qf(a),o.childLanes=Jf(e,n,a),t.memoizedState=Kf,t=Zl(null,o));else if(ao(t),oc(u)){if(n=u.nextSibling&&u.nextSibling.dataset,n)var i=n.dgst;n=i,o=Error(k(419)),o.stack="",o.digest=n,hn({value:o,source:null,stack:null}),t=$f(e,t,a)}else if(We||dl(e,t,a,!1),n=(a&e.childLanes)!==0,We||n){if(n=Se,n!==null&&(o=jx(n,a),o!==0&&o!==s.retryLane))throw s.retryLane=o,rr(e,o),Ct(n,e,o),_c;ac(u)||ws(),t=$f(e,t,a)}else ac(u)?(t.flags|=192,t.child=e.child,t=null):(e=s.treeContext,Ae=Zt(u.nextSibling),lt=t,re=!0,co=null,jt=!1,e!==null&&Sg(t,e),t=Vd(t,o.children),t.flags|=4096);return t}return r?(oo(t),u=o.fallback,r=t.mode,s=e.child,i=s.sibling,o=Ua(s,{mode:"hidden",children:o.children}),o.subtreeFlags=s.subtreeFlags&65011712,i!==null?u=Ua(i,u):(u=jo(u,r,a,null),u.flags|=2),u.return=t,o.return=t,o.sibling=u,t.child=o,Zl(null,o),o=t.child,u=e.child.memoizedState,u===null?u=Qf(a):(r=u.cachePool,r!==null?(s=je._currentValue,r=r.parent!==s?{parent:s,pool:s}:r):r=Cg(),u={baseLanes:u.baseLanes|a,cachePool:r}),o.memoizedState=u,o.childLanes=Jf(e,n,a),t.memoizedState=Kf,Zl(e.child,o)):(ao(t),a=e.child,e=a.sibling,a=Ua(a,{mode:"visible",children:o.children}),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a)}function Vd(e,t){return t=gs({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function gs(e,t){return e=Tt(22,e,null,t),e.lanes=0,e}function $f(e,t,a){return Jo(t,e.child,null,a),e=Vd(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function tx(e,t,a){e.lanes|=t;var o=e.alternate;o!==null&&(o.lanes|=t),Td(e.return,t,a)}function ed(e,t,a,o,r,l){var n=e.memoizedState;n===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:r,treeForkCount:l}:(n.isBackwards=t,n.rendering=null,n.renderingStartTime=0,n.last=o,n.tail=a,n.tailMode=r,n.treeForkCount=l)}function gv(e,t,a){var o=t.pendingProps,r=o.revealOrder,l=o.tail;o=o.children;var n=_e.current,u=(n&2)!==0;if(u?(n=n&1|2,t.flags|=128):n&=1,Ce(_e,n),ot(e,t,o,a),o=re?mn:0,!u&&e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&tx(e,a,t);else if(e.tag===19)tx(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(r){case"forwards":for(a=t.child,r=null;a!==null;)e=a.alternate,e!==null&&ps(e)===null&&(r=a),a=a.sibling;a=r,a===null?(r=t.child,t.child=null):(r=a.sibling,a.sibling=null),ed(t,!1,r,a,l,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&ps(e)===null){t.child=r;break}e=r.sibling,r.sibling=a,a=r,r=e}ed(t,!0,a,null,l,o);break;case"together":ed(t,!1,null,null,void 0,o);break;default:t.memoizedState=null}return t.child}function _a(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),Lo|=t.lanes,!(a&t.childLanes))if(e!==null){if(dl(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,a=Ua(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Ua(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Gc(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&fs(e)))}function KC(e,t,a){switch(t.tag){case 3:os(t,t.stateNode.containerInfo),to(t,je,e.memoizedState.cache),Ko();break;case 27:case 5:vd(t);break;case 4:os(t,t.stateNode.containerInfo);break;case 10:to(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Hd(t),null;break;case 13:var o=t.memoizedState;if(o!==null)return o.dehydrated!==null?(ao(t),t.flags|=128,null):a&t.child.childLanes?xv(e,t,a):(ao(t),e=_a(e,t,a),e!==null?e.sibling:null);ao(t);break;case 19:var r=(e.flags&128)!==0;if(o=(a&t.childLanes)!==0,o||(dl(e,t,a,!1),o=(a&t.childLanes)!==0),r){if(o)return gv(e,t,a);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),Ce(_e,_e.current),o)break;return null;case 22:return t.lanes=0,hv(e,t,a,t.pendingProps);case 24:to(t,je,e.memoizedState.cache)}return _a(e,t,a)}function vv(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)We=!0;else{if(!Gc(e,a)&&!(t.flags&128))return We=!1,KC(e,t,a);We=!!(e.flags&131072)}else We=!1,re&&t.flags&1048576&&wg(t,mn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var o=t.pendingProps;if(e=Go(t.elementType),t.type=e,typeof e=="function")wc(e)?(o=er(e,o),t.tag=1,t=$h(null,t,e,o,a)):(t.tag=0,t=Gd(null,t,e,o,a));else{if(e!=null){var r=e.$$typeof;if(r===uc){t.tag=11,t=Zh(null,t,e,o,a);break e}else if(r===sc){t.tag=14,t=Yh(null,t,e,o,a);break e}}throw t=xd(e)||e,Error(k(306,t,""))}}return t;case 0:return Gd(e,t,t.type,t.pendingProps,a);case 1:return o=t.type,r=er(o,t.pendingProps),$h(e,t,o,r,a);case 3:e:{if(os(t,t.stateNode.containerInfo),e===null)throw Error(k(387));o=t.pendingProps;var l=t.memoizedState;r=l.element,Bd(e,t),an(t,o,null,a);var n=t.memoizedState;if(o=n.cache,to(t,je,o),o!==l.cache&&Ed(t,[je],a,!0),tn(),o=n.element,l.isDehydrated)if(l={element:o,isDehydrated:!1,cache:n.cache},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){t=ex(e,t,o,a);break e}else if(o!==r){r=Xt(Error(k(424)),t),hn(r),t=ex(e,t,o,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ae=Zt(e.firstChild),lt=t,re=!0,co=null,jt=!0,a=kg(t,null,o,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Ko(),o===r){t=_a(e,t,a);break e}ot(e,t,o,a)}t=t.child}return t;case 26:return Ku(e,t),e===null?(a=Lx(t.type,null,t.pendingProps,null))?t.memoizedState=a:re||(a=t.type,e=t.pendingProps,o=Is(fo.current).createElement(a),o[rt]=t,o[It]=e,ut(o,a,e),tt(o),t.stateNode=o):t.memoizedState=Lx(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return vd(t),e===null&&re&&(o=t.stateNode=sb(t.type,t.pendingProps,fo.current),lt=t,jt=!0,r=Ae,Io(t.type)?(rc=r,Ae=Zt(o.firstChild)):Ae=r),ot(e,t,t.pendingProps.children,a),Ku(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&re&&((r=o=Ae)&&(o=C1(o,t.type,t.pendingProps,jt),o!==null?(t.stateNode=o,lt=t,Ae=Zt(o.firstChild),jt=!1,r=!0):r=!1),r||wo(t)),vd(t),r=t.type,l=t.pendingProps,n=e!==null?e.memoizedProps:null,o=l.children,ec(r,l)?o=null:n!==null&&ec(r,n)&&(t.flags|=32),t.memoizedState!==null&&(r=Dc(e,t,FC,null,null,a),wn._currentValue=r),Ku(e,t),ot(e,t,o,a),t.child;case 6:return e===null&&re&&((e=a=Ae)&&(a=I1(a,t.pendingProps,jt),a!==null?(t.stateNode=a,lt=t,Ae=null,e=!0):e=!1),e||wo(t)),null;case 13:return xv(e,t,a);case 4:return os(t,t.stateNode.containerInfo),o=t.pendingProps,e===null?t.child=Jo(t,null,o,a):ot(e,t,o,a),t.child;case 11:return Zh(e,t,t.type,t.pendingProps,a);case 7:return ot(e,t,t.pendingProps,a),t.child;case 8:return ot(e,t,t.pendingProps.children,a),t.child;case 12:return ot(e,t,t.pendingProps.children,a),t.child;case 10:return o=t.pendingProps,to(t,t.type,o.value),ot(e,t,o.children,a),t.child;case 9:return r=t.type._context,o=t.pendingProps.children,Qo(t),r=nt(r),o=o(r),t.flags|=1,ot(e,t,o,a),t.child;case 14:return Yh(e,t,t.type,t.pendingProps,a);case 15:return mv(e,t,t.type,t.pendingProps,a);case 19:return gv(e,t,a);case 31:return YC(e,t,a);case 22:return hv(e,t,a,t.pendingProps);case 24:return Qo(t),o=nt(je),e===null?(r=Ic(),r===null&&(r=Se,l=Cc(),r.pooledCache=l,l.refCount++,l!==null&&(r.pooledCacheLanes|=a),r=l),t.memoizedState={parent:o,cache:r},kc(t),to(t,je,r)):(e.lanes&a&&(Bd(e,t),an(t,null,null,a),tn()),r=e.memoizedState,l=t.memoizedState,r.parent!==o?(r={parent:o,cache:o},t.memoizedState=r,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=r),to(t,je,o)):(o=l.cache,to(t,je,o),o!==r.cache&&Ed(t,[je],a,!0))),ot(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(k(156,t.tag))}function ka(e){e.flags|=4}function td(e,t,a,o,r){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(r&335544128)===r)if(e.stateNode.complete)e.flags|=8192;else if(_v())e.flags|=8192;else throw Zo=ds,Rc}else e.flags&=-16777217}function ax(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!db(t))if(_v())e.flags|=8192;else throw Zo=ds,Rc}function Bu(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Gx():536870912,e.lanes|=t,rl|=t)}function Fl(e,t){if(!re)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function ke(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(t)for(var r=e.child;r!==null;)a|=r.lanes|r.childLanes,o|=r.subtreeFlags&65011712,o|=r.flags&65011712,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)a|=r.lanes|r.childLanes,o|=r.subtreeFlags,o|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=o,e.childLanes=a,t}function QC(e,t,a){var o=t.pendingProps;switch(Lc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ke(t),null;case 1:return ke(t),null;case 3:return a=t.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),t.memoizedState.cache!==o&&(t.flags|=2048),Ha(je),Jr(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Mr(t)?ka(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,jf())),ke(t),null;case 26:var r=t.type,l=t.memoizedState;return e===null?(ka(t),l!==null?(ke(t),ax(t,l)):(ke(t),td(t,r,null,o,a))):l?l!==e.memoizedState?(ka(t),ke(t),ax(t,l)):(ke(t),t.flags&=-16777217):(e=e.memoizedProps,e!==o&&ka(t),ke(t),td(t,r,e,o,a)),null;case 27:if(rs(t),a=fo.current,r=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==o&&ka(t);else{if(!o){if(t.stateNode===null)throw Error(k(166));return ke(t),null}e=xa.current,Mr(t)?Th(t,e):(e=sb(r,o,a),t.stateNode=e,ka(t))}return ke(t),null;case 5:if(rs(t),r=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==o&&ka(t);else{if(!o){if(t.stateNode===null)throw Error(k(166));return ke(t),null}if(l=xa.current,Mr(t))Th(t,l);else{var n=Is(fo.current);switch(l){case 1:l=n.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:l=n.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":l=n.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":l=n.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":l=n.createElement("div"),l.innerHTML="<script><\/script>",l=l.removeChild(l.firstChild);break;case"select":l=typeof o.is=="string"?n.createElement("select",{is:o.is}):n.createElement("select"),o.multiple?l.multiple=!0:o.size&&(l.size=o.size);break;default:l=typeof o.is=="string"?n.createElement(r,{is:o.is}):n.createElement(r)}}l[rt]=t,l[It]=o;e:for(n=t.child;n!==null;){if(n.tag===5||n.tag===6)l.appendChild(n.stateNode);else if(n.tag!==4&&n.tag!==27&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}t.stateNode=l;e:switch(ut(l,r,o),r){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&ka(t)}}return ke(t),td(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,a),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==o&&ka(t);else{if(typeof o!="string"&&t.stateNode===null)throw Error(k(166));if(e=fo.current,Mr(t)){if(e=t.stateNode,a=t.memoizedProps,o=null,r=lt,r!==null)switch(r.tag){case 27:case 5:o=r.memoizedProps}e[rt]=t,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||rb(e.nodeValue,a)),e||wo(t,!0)}else e=Is(e).createTextNode(o),e[rt]=t,t.stateNode=e}return ke(t),null;case 31:if(a=t.memoizedState,e===null||e.memoizedState!==null){if(o=Mr(t),a!==null){if(e===null){if(!o)throw Error(k(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(557));e[rt]=t}else Ko(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ke(t),e=!1}else a=jf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return t.flags&256?(Dt(t),t):(Dt(t),null);if(t.flags&128)throw Error(k(558))}return ke(t),null;case 13:if(o=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(r=Mr(t),o!==null&&o.dehydrated!==null){if(e===null){if(!r)throw Error(k(318));if(r=t.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(k(317));r[rt]=t}else Ko(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ke(t),r=!1}else r=jf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),r=!0;if(!r)return t.flags&256?(Dt(t),t):(Dt(t),null)}return Dt(t),t.flags&128?(t.lanes=a,t):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=t.child,r=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(r=o.alternate.memoizedState.cachePool.pool),l=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(l=o.memoizedState.cachePool.pool),l!==r&&(o.flags|=2048)),a!==e&&a&&(t.child.flags|=8192),Bu(t,t.updateQueue),ke(t),null);case 4:return Jr(),e===null&&Kc(t.stateNode.containerInfo),ke(t),null;case 10:return Ha(t.type),ke(t),null;case 19:if(at(_e),o=t.memoizedState,o===null)return ke(t),null;if(r=(t.flags&128)!==0,l=o.rendering,l===null)if(r)Fl(o,!1);else{if(qe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=ps(e),l!==null){for(t.flags|=128,Fl(o,!1),e=l.updateQueue,t.updateQueue=e,Bu(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)bg(a,e),a=a.sibling;return Ce(_e,_e.current&1|2),re&&Ta(t,o.treeForkCount),t.child}e=e.sibling}o.tail!==null&&Ot()>bs&&(t.flags|=128,r=!0,Fl(o,!1),t.lanes=4194304)}else{if(!r)if(e=ps(l),e!==null){if(t.flags|=128,r=!0,e=e.updateQueue,t.updateQueue=e,Bu(t,e),Fl(o,!0),o.tail===null&&o.tailMode==="hidden"&&!l.alternate&&!re)return ke(t),null}else 2*Ot()-o.renderingStartTime>bs&&a!==536870912&&(t.flags|=128,r=!0,Fl(o,!1),t.lanes=4194304);o.isBackwards?(l.sibling=t.child,t.child=l):(e=o.last,e!==null?e.sibling=l:t.child=l,o.last=l)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Ot(),e.sibling=null,a=_e.current,Ce(_e,r?a&1|2:a&1),re&&Ta(t,o.treeForkCount),e):(ke(t),null);case 22:case 23:return Dt(t),Ac(),o=t.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(t.flags|=8192):o&&(t.flags|=8192),o?a&536870912&&!(t.flags&128)&&(ke(t),t.subtreeFlags&6&&(t.flags|=8192)):ke(t),a=t.updateQueue,a!==null&&Bu(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(o=t.memoizedState.cachePool.pool),o!==a&&(t.flags|=2048),e!==null&&at(Wo),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Ha(je),ke(t),null;case 25:return null;case 30:return null}throw Error(k(156,t.tag))}function JC(e,t){switch(Lc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ha(je),Jr(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return rs(t),null;case 31:if(t.memoizedState!==null){if(Dt(t),t.alternate===null)throw Error(k(340));Ko()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Dt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));Ko()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return at(_e),null;case 4:return Jr(),null;case 10:return Ha(t.type),null;case 22:case 23:return Dt(t),Ac(),e!==null&&at(Wo),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ha(je),null;case 25:return null;default:return null}}function bv(e,t){switch(Lc(t),t.tag){case 3:Ha(je),Jr();break;case 26:case 27:case 5:rs(t);break;case 4:Jr();break;case 31:t.memoizedState!==null&&Dt(t);break;case 13:Dt(t);break;case 19:at(_e);break;case 10:Ha(t.type);break;case 22:case 23:Dt(t),Ac(),e!==null&&at(Wo);break;case 24:Ha(je)}}function En(e,t){try{var a=t.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var r=o.next;a=r;do{if((a.tag&e)===e){o=void 0;var l=a.create,n=a.inst;o=l(),n.destroy=o}a=a.next}while(a!==r)}}catch(u){me(t,t.return,u)}}function So(e,t,a){try{var o=t.updateQueue,r=o!==null?o.lastEffect:null;if(r!==null){var l=r.next;o=l;do{if((o.tag&e)===e){var n=o.inst,u=n.destroy;if(u!==void 0){n.destroy=void 0,r=t;var s=a,i=u;try{i()}catch(d){me(r,s,d)}}}o=o.next}while(o!==l)}}catch(d){me(t,t.return,d)}}function yv(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{Mg(t,a)}catch(o){me(e,e.return,o)}}}function wv(e,t,a){a.props=er(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){me(e,t,o)}}function rn(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(r){me(e,t,r)}}function ha(e,t){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(r){me(e,t,r)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(r){me(e,t,r)}else a.current=null}function Sv(e){var t=e.type,a=e.memoizedProps,o=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(r){me(e,e.return,r)}}function ad(e,t,a){try{var o=e.stateNode;v1(o,e.type,a,t),o[It]=t}catch(r){me(e,e.return,r)}}function Lv(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Io(e.type)||e.tag===4}function od(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Lv(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Io(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xd(e,t,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Ba));else if(o!==4&&(o===27&&Io(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(Xd(e,t,a),e=e.sibling;e!==null;)Xd(e,t,a),e=e.sibling}function vs(e,t,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(o!==4&&(o===27&&Io(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(vs(e,t,a),e=e.sibling;e!==null;)vs(e,t,a),e=e.sibling}function Cv(e){var t=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,r=t.attributes;r.length;)t.removeAttributeNode(r[0]);ut(t,o,a),t[rt]=e,t[It]=a}catch(l){me(e,e.return,l)}}var Ea=!1,Xe=!1,rd=!1,ox=typeof WeakSet=="function"?WeakSet:Set,et=null;function $C(e,t){if(e=e.containerInfo,Jd=Ms,e=dg(e),vc(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var r=o.anchorOffset,l=o.focusNode;o=o.focusOffset;try{a.nodeType,l.nodeType}catch{a=null;break e}var n=0,u=-1,s=-1,i=0,d=0,p=e,x=null;t:for(;;){for(var h;p!==a||r!==0&&p.nodeType!==3||(u=n+r),p!==l||o!==0&&p.nodeType!==3||(s=n+o),p.nodeType===3&&(n+=p.nodeValue.length),(h=p.firstChild)!==null;)x=p,p=h;for(;;){if(p===e)break t;if(x===a&&++i===r&&(u=n),x===l&&++d===o&&(s=n),(h=p.nextSibling)!==null)break;p=x,x=p.parentNode}p=h}a=u===-1||s===-1?null:{start:u,end:s}}else a=null}a=a||{start:0,end:0}}else a=null;for($d={focusedElem:e,selectionRange:a},Ms=!1,et=t;et!==null;)if(t=et,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,et=e;else for(;et!==null;){switch(t=et,l=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)r=e[a],r.ref.impl=r.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&l!==null){e=void 0,a=t,r=l.memoizedProps,l=l.memoizedState,o=a.stateNode;try{var b=er(a.type,r);e=o.getSnapshotBeforeUpdate(b,l),o.__reactInternalSnapshotBeforeUpdate=e}catch(v){me(a,a.return,v)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)tc(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":tc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(k(163))}if(e=t.sibling,e!==null){e.return=t.return,et=e;break}et=t.return}}function Iv(e,t,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Ma(e,a),o&4&&En(5,a);break;case 1:if(Ma(e,a),o&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(n){me(a,a.return,n)}else{var r=er(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(r,t,e.__reactInternalSnapshotBeforeUpdate)}catch(n){me(a,a.return,n)}}o&64&&yv(a),o&512&&rn(a,a.return);break;case 3:if(Ma(e,a),o&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Mg(e,t)}catch(n){me(a,a.return,n)}}break;case 27:t===null&&o&4&&Cv(a);case 26:case 5:Ma(e,a),t===null&&o&4&&Sv(a),o&512&&rn(a,a.return);break;case 12:Ma(e,a);break;case 31:Ma(e,a),o&4&&Av(e,a);break;case 13:Ma(e,a),o&4&&Mv(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=s1.bind(null,a),R1(e,a))));break;case 22:if(o=a.memoizedState!==null||Ea,!o){t=t!==null&&t.memoizedState!==null||Xe,r=Ea;var l=Xe;Ea=o,(Xe=t)&&!l?Da(e,a,(a.subtreeFlags&8772)!==0):Ma(e,a),Ea=r,Xe=l}break;case 30:break;default:Ma(e,a)}}function Rv(e){var t=e.alternate;t!==null&&(e.alternate=null,Rv(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&cc(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Oe=null,St=!1;function Aa(e,t,a){for(a=a.child;a!==null;)kv(e,t,a),a=a.sibling}function kv(e,t,a){if(Bt&&typeof Bt.onCommitFiberUnmount=="function")try{Bt.onCommitFiberUnmount(In,a)}catch{}switch(a.tag){case 26:Xe||ha(a,t),Aa(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Xe||ha(a,t);var o=Oe,r=St;Io(a.type)&&(Oe=a.stateNode,St=!1),Aa(e,t,a),sn(a.stateNode),Oe=o,St=r;break;case 5:Xe||ha(a,t);case 6:if(o=Oe,r=St,Oe=null,Aa(e,t,a),Oe=o,St=r,Oe!==null)if(St)try{(Oe.nodeType===9?Oe.body:Oe.nodeName==="HTML"?Oe.ownerDocument.body:Oe).removeChild(a.stateNode)}catch(l){me(a,t,l)}else try{Oe.removeChild(a.stateNode)}catch(l){me(a,t,l)}break;case 18:Oe!==null&&(St?(e=Oe,vx(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),sl(e)):vx(Oe,a.stateNode));break;case 4:o=Oe,r=St,Oe=a.stateNode.containerInfo,St=!0,Aa(e,t,a),Oe=o,St=r;break;case 0:case 11:case 14:case 15:So(2,a,t),Xe||So(4,a,t),Aa(e,t,a);break;case 1:Xe||(ha(a,t),o=a.stateNode,typeof o.componentWillUnmount=="function"&&wv(a,t,o)),Aa(e,t,a);break;case 21:Aa(e,t,a);break;case 22:Xe=(o=Xe)||a.memoizedState!==null,Aa(e,t,a),Xe=o;break;default:Aa(e,t,a)}}function Av(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{sl(e)}catch(a){me(t,t.return,a)}}}function Mv(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{sl(e)}catch(a){me(t,t.return,a)}}function e1(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ox),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ox),t;default:throw Error(k(435,e.tag))}}function Pu(e,t){var a=e1(e);t.forEach(function(o){if(!a.has(o)){a.add(o);var r=i1.bind(null,e,o);o.then(r,r)}})}function yt(e,t){var a=t.deletions;if(a!==null)for(var o=0;o<a.length;o++){var r=a[o],l=e,n=t,u=n;e:for(;u!==null;){switch(u.tag){case 27:if(Io(u.type)){Oe=u.stateNode,St=!1;break e}break;case 5:Oe=u.stateNode,St=!1;break e;case 3:case 4:Oe=u.stateNode.containerInfo,St=!0;break e}u=u.return}if(Oe===null)throw Error(k(160));kv(l,n,r),Oe=null,St=!1,l=r.alternate,l!==null&&(l.return=null),r.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Dv(t,e),t=t.sibling}var aa=null;function Dv(e,t){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:yt(t,e),wt(e),o&4&&(So(3,e,e.return),En(3,e),So(5,e,e.return));break;case 1:yt(t,e),wt(e),o&512&&(Xe||a===null||ha(a,a.return)),o&64&&Ea&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var r=aa;if(yt(t,e),wt(e),o&512&&(Xe||a===null||ha(a,a.return)),o&4){var l=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){e:{o=e.type,a=e.memoizedProps,r=r.ownerDocument||r;t:switch(o){case"title":l=r.getElementsByTagName("title")[0],(!l||l[An]||l[rt]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=r.createElement(o),r.head.insertBefore(l,r.querySelector("head > title"))),ut(l,o,a),l[rt]=e,tt(l),o=l;break e;case"link":var n=Ix("link","href",r).get(o+(a.href||""));if(n){for(var u=0;u<n.length;u++)if(l=n[u],l.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&l.getAttribute("rel")===(a.rel==null?null:a.rel)&&l.getAttribute("title")===(a.title==null?null:a.title)&&l.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){n.splice(u,1);break t}}l=r.createElement(o),ut(l,o,a),r.head.appendChild(l);break;case"meta":if(n=Ix("meta","content",r).get(o+(a.content||""))){for(u=0;u<n.length;u++)if(l=n[u],l.getAttribute("content")===(a.content==null?null:""+a.content)&&l.getAttribute("name")===(a.name==null?null:a.name)&&l.getAttribute("property")===(a.property==null?null:a.property)&&l.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&l.getAttribute("charset")===(a.charSet==null?null:a.charSet)){n.splice(u,1);break t}}l=r.createElement(o),ut(l,o,a),r.head.appendChild(l);break;default:throw Error(k(468,o))}l[rt]=e,tt(l),o=l}e.stateNode=o}else Rx(r,e.type,e.stateNode);else e.stateNode=Cx(r,o,e.memoizedProps);else l!==o?(l===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):l.count--,o===null?Rx(r,e.type,e.stateNode):Cx(r,o,e.memoizedProps)):o===null&&e.stateNode!==null&&ad(e,e.memoizedProps,a.memoizedProps)}break;case 27:yt(t,e),wt(e),o&512&&(Xe||a===null||ha(a,a.return)),a!==null&&o&4&&ad(e,e.memoizedProps,a.memoizedProps);break;case 5:if(yt(t,e),wt(e),o&512&&(Xe||a===null||ha(a,a.return)),e.flags&32){r=e.stateNode;try{el(r,"")}catch(b){me(e,e.return,b)}}o&4&&e.stateNode!=null&&(r=e.memoizedProps,ad(e,r,a!==null?a.memoizedProps:r)),o&1024&&(rd=!0);break;case 6:if(yt(t,e),wt(e),o&4){if(e.stateNode===null)throw Error(k(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(b){me(e,e.return,b)}}break;case 3:if($u=null,r=aa,aa=Rs(t.containerInfo),yt(t,e),aa=r,wt(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{sl(t.containerInfo)}catch(b){me(e,e.return,b)}rd&&(rd=!1,Tv(e));break;case 4:o=aa,aa=Rs(e.stateNode.containerInfo),yt(t,e),wt(e),aa=o;break;case 12:yt(t,e),wt(e);break;case 31:yt(t,e),wt(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Pu(e,o)));break;case 13:yt(t,e),wt(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(_s=Ot()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Pu(e,o)));break;case 22:r=e.memoizedState!==null;var s=a!==null&&a.memoizedState!==null,i=Ea,d=Xe;if(Ea=i||r,Xe=d||s,yt(t,e),Xe=d,Ea=i,wt(e),o&8192)e:for(t=e.stateNode,t._visibility=r?t._visibility&-2:t._visibility|1,r&&(a===null||s||Ea||Xe||Vo(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){s=a=t;try{if(l=s.stateNode,r)n=l.style,typeof n.setProperty=="function"?n.setProperty("display","none","important"):n.display="none";else{u=s.stateNode;var p=s.memoizedProps.style,x=p!=null&&p.hasOwnProperty("display")?p.display:null;u.style.display=x==null||typeof x=="boolean"?"":(""+x).trim()}}catch(b){me(s,s.return,b)}}}else if(t.tag===6){if(a===null){s=t;try{s.stateNode.nodeValue=r?"":s.memoizedProps}catch(b){me(s,s.return,b)}}}else if(t.tag===18){if(a===null){s=t;try{var h=s.stateNode;r?bx(h,!0):bx(s.stateNode,!1)}catch(b){me(s,s.return,b)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Pu(e,a))));break;case 19:yt(t,e),wt(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Pu(e,o)));break;case 30:break;case 21:break;default:yt(t,e),wt(e)}}function wt(e){var t=e.flags;if(t&2){try{for(var a,o=e.return;o!==null;){if(Lv(o)){a=o;break}o=o.return}if(a==null)throw Error(k(160));switch(a.tag){case 27:var r=a.stateNode,l=od(e);vs(e,l,r);break;case 5:var n=a.stateNode;a.flags&32&&(el(n,""),a.flags&=-33);var u=od(e);vs(e,u,n);break;case 3:case 4:var s=a.stateNode.containerInfo,i=od(e);Xd(e,i,s);break;default:throw Error(k(161))}}catch(d){me(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Tv(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Tv(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Ma(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Iv(e,t.alternate,t),t=t.sibling}function Vo(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:So(4,t,t.return),Vo(t);break;case 1:ha(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&wv(t,t.return,a),Vo(t);break;case 27:sn(t.stateNode);case 26:case 5:ha(t,t.return),Vo(t);break;case 22:t.memoizedState===null&&Vo(t);break;case 30:Vo(t);break;default:Vo(t)}e=e.sibling}}function Da(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var o=t.alternate,r=e,l=t,n=l.flags;switch(l.tag){case 0:case 11:case 15:Da(r,l,a),En(4,l);break;case 1:if(Da(r,l,a),o=l,r=o.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(i){me(o,o.return,i)}if(o=l,r=o.updateQueue,r!==null){var u=o.stateNode;try{var s=r.shared.hiddenCallbacks;if(s!==null)for(r.shared.hiddenCallbacks=null,r=0;r<s.length;r++)Ag(s[r],u)}catch(i){me(o,o.return,i)}}a&&n&64&&yv(l),rn(l,l.return);break;case 27:Cv(l);case 26:case 5:Da(r,l,a),a&&o===null&&n&4&&Sv(l),rn(l,l.return);break;case 12:Da(r,l,a);break;case 31:Da(r,l,a),a&&n&4&&Av(r,l);break;case 13:Da(r,l,a),a&&n&4&&Mv(r,l);break;case 22:l.memoizedState===null&&Da(r,l,a),rn(l,l.return);break;case 30:break;default:Da(r,l,a)}t=t.sibling}}function Vc(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Dn(a))}function Xc(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Dn(e))}function ta(e,t,a,o){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ev(e,t,a,o),t=t.sibling}function Ev(e,t,a,o){var r=t.flags;switch(t.tag){case 0:case 11:case 15:ta(e,t,a,o),r&2048&&En(9,t);break;case 1:ta(e,t,a,o);break;case 3:ta(e,t,a,o),r&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Dn(e)));break;case 12:if(r&2048){ta(e,t,a,o),e=t.stateNode;try{var l=t.memoizedProps,n=l.id,u=l.onPostCommit;typeof u=="function"&&u(n,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(s){me(t,t.return,s)}}else ta(e,t,a,o);break;case 31:ta(e,t,a,o);break;case 13:ta(e,t,a,o);break;case 23:break;case 22:l=t.stateNode,n=t.alternate,t.memoizedState!==null?l._visibility&2?ta(e,t,a,o):ln(e,t):l._visibility&2?ta(e,t,a,o):(l._visibility|=2,Tr(e,t,a,o,(t.subtreeFlags&10256)!==0||!1)),r&2048&&Vc(n,t);break;case 24:ta(e,t,a,o),r&2048&&Xc(t.alternate,t);break;default:ta(e,t,a,o)}}function Tr(e,t,a,o,r){for(r=r&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var l=e,n=t,u=a,s=o,i=n.flags;switch(n.tag){case 0:case 11:case 15:Tr(l,n,u,s,r),En(8,n);break;case 23:break;case 22:var d=n.stateNode;n.memoizedState!==null?d._visibility&2?Tr(l,n,u,s,r):ln(l,n):(d._visibility|=2,Tr(l,n,u,s,r)),r&&i&2048&&Vc(n.alternate,n);break;case 24:Tr(l,n,u,s,r),r&&i&2048&&Xc(n.alternate,n);break;default:Tr(l,n,u,s,r)}t=t.sibling}}function ln(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,o=t,r=o.flags;switch(o.tag){case 22:ln(a,o),r&2048&&Vc(o.alternate,o);break;case 24:ln(a,o),r&2048&&Xc(o.alternate,o);break;default:ln(a,o)}t=t.sibling}}var Yl=8192;function Dr(e,t,a){if(e.subtreeFlags&Yl)for(e=e.child;e!==null;)Ov(e,t,a),e=e.sibling}function Ov(e,t,a){switch(e.tag){case 26:Dr(e,t,a),e.flags&Yl&&e.memoizedState!==null&&N1(a,aa,e.memoizedState,e.memoizedProps);break;case 5:Dr(e,t,a);break;case 3:case 4:var o=aa;aa=Rs(e.stateNode.containerInfo),Dr(e,t,a),aa=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Yl,Yl=16777216,Dr(e,t,a),Yl=o):Dr(e,t,a));break;default:Dr(e,t,a)}}function Bv(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function _l(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var a=0;a<t.length;a++){var o=t[a];et=o,Uv(o,e)}Bv(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pv(e),e=e.sibling}function Pv(e){switch(e.tag){case 0:case 11:case 15:_l(e),e.flags&2048&&So(9,e,e.return);break;case 3:_l(e);break;case 12:_l(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Qu(e)):_l(e);break;default:_l(e)}}function Qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var a=0;a<t.length;a++){var o=t[a];et=o,Uv(o,e)}Bv(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:So(8,t,t.return),Qu(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,Qu(t));break;default:Qu(t)}e=e.sibling}}function Uv(e,t){for(;et!==null;){var a=et;switch(a.tag){case 0:case 11:case 15:So(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Dn(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,et=o;else e:for(a=e;et!==null;){o=et;var r=o.sibling,l=o.return;if(Rv(o),o===a){et=null;break e}if(r!==null){r.return=l,et=r;break e}et=l}}}var t1={getCacheForType:function(e){var t=nt(je),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a},cacheSignal:function(){return nt(je).controller.signal}},a1=typeof WeakMap=="function"?WeakMap:Map,de=0,Se=null,$=null,ae=0,pe=0,Mt=null,uo=!1,pl=!1,jc=!1,Ga=0,qe=0,Lo=0,Yo=0,Wc=0,Et=0,rl=0,nn=null,Lt=null,jd=!1,_s=0,Hv=0,bs=1/0,ys=null,ho=null,Qe=0,xo=null,ll=null,Na=0,Wd=0,Zd=null,Nv=null,un=0,Yd=null;function Ut(){return de&2&&ae!==0?ae&-ae:V.T!==null?Yc():Wx()}function zv(){if(Et===0)if(!(ae&536870912)||re){var e=Iu;Iu<<=1,!(Iu&3932160)&&(Iu=262144),Et=e}else Et=536870912;return e=Nt.current,e!==null&&(e.flags|=32),Et}function Ct(e,t,a){(e===Se&&(pe===2||pe===9)||e.cancelPendingCommit!==null)&&(nl(e,0),so(e,ae,Et,!1)),kn(e,a),(!(de&2)||e!==Se)&&(e===Se&&(!(de&2)&&(Yo|=a),qe===4&&so(e,ae,Et,!1)),va(e))}function qv(e,t,a){if(de&6)throw Error(k(327));var o=!a&&(t&127)===0&&(t&e.expiredLanes)===0||Rn(e,t),r=o?l1(e,t):ld(e,t,!0),l=o;do{if(r===0){pl&&!o&&so(e,t,0,!1);break}else{if(a=e.current.alternate,l&&!o1(a)){r=ld(e,t,!1),l=!1;continue}if(r===2){if(l=t,e.errorRecoveryDisabledLanes&l)var n=0;else n=e.pendingLanes&-536870913,n=n!==0?n:n&536870912?536870912:0;if(n!==0){t=n;e:{var u=e;r=nn;var s=u.current.memoizedState.isDehydrated;if(s&&(nl(u,n).flags|=256),n=ld(u,n,!1),n!==2){if(jc&&!s){u.errorRecoveryDisabledLanes|=l,Yo|=l,r=4;break e}l=Lt,Lt=r,l!==null&&(Lt===null?Lt=l:Lt.push.apply(Lt,l))}r=n}if(l=!1,r!==2)continue}}if(r===1){nl(e,0),so(e,t,0,!0);break}e:{switch(o=e,l=r,l){case 0:case 1:throw Error(k(345));case 4:if((t&4194048)!==t)break;case 6:so(o,t,Et,!uo);break e;case 2:Lt=null;break;case 3:case 5:break;default:throw Error(k(329))}if((t&62914560)===t&&(r=_s+300-Ot(),10<r)){if(so(o,t,Et,!uo),Ts(o,0,!0)!==0)break e;Na=t,o.timeoutHandle=nb(rx.bind(null,o,a,Lt,ys,jd,t,Et,Yo,rl,uo,l,"Throttled",-0,0),r);break e}rx(o,a,Lt,ys,jd,t,Et,Yo,rl,uo,l,null,-0,0)}}break}while(!0);va(e)}function rx(e,t,a,o,r,l,n,u,s,i,d,p,x,h){if(e.timeoutHandle=-1,p=t.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ba},Ov(t,l,p);var b=(l&62914560)===l?_s-Ot():(l&4194048)===l?Hv-Ot():0;if(b=z1(p,b),b!==null){Na=l,e.cancelPendingCommit=b(nx.bind(null,e,t,l,a,o,r,n,u,s,d,p,null,x,h)),so(e,l,n,!i);return}}nx(e,t,l,a,o,r,n,u,s)}function o1(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var r=a[o],l=r.getSnapshot;r=r.value;try{if(!Ht(l(),r))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function so(e,t,a,o){t&=~Wc,t&=~Yo,e.suspendedLanes|=t,e.pingedLanes&=~t,o&&(e.warmLanes|=t),o=e.expirationTimes;for(var r=t;0<r;){var l=31-Pt(r),n=1<<l;o[l]=-1,r&=~n}a!==0&&Vx(e,a,t)}function Gs(){return de&6?!0:(On(0,!1),!1)}function Zc(){if($!==null){if(pe===0)var e=$.return;else e=$,Pa=lr=null,Oc(e),Yr=null,xn=0,e=$;for(;e!==null;)bv(e.alternate,e),e=e.return;$=null}}function nl(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,w1(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),Na=0,Zc(),Se=e,$=a=Ua(e.current,null),ae=t,pe=0,Mt=null,uo=!1,pl=Rn(e,t),jc=!1,rl=Et=Wc=Yo=Lo=qe=0,Lt=nn=null,jd=!1,t&8&&(t|=t&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=t;0<o;){var r=31-Pt(o),l=1<<r;t|=e[r],o&=~l}return Ga=t,Ps(),a}function Fv(e,t){Y=null,V.H=vn,t===cl||t===Hs?(t=Uh(),pe=3):t===Rc?(t=Uh(),pe=4):pe=t===_c?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Mt=t,$===null&&(qe=1,xs(e,Xt(t,e.current)))}function _v(){var e=Nt.current;return e===null?!0:(ae&4194048)===ae?Wt===null:(ae&62914560)===ae||ae&536870912?e===Wt:!1}function Gv(){var e=V.H;return V.H=vn,e===null?vn:e}function Vv(){var e=V.A;return V.A=t1,e}function ws(){qe=4,uo||(ae&4194048)!==ae&&Nt.current!==null||(pl=!0),!(Lo&134217727)&&!(Yo&134217727)||Se===null||so(Se,ae,Et,!1)}function ld(e,t,a){var o=de;de|=2;var r=Gv(),l=Vv();(Se!==e||ae!==t)&&(ys=null,nl(e,t)),t=!1;var n=qe;e:do try{if(pe!==0&&$!==null){var u=$,s=Mt;switch(pe){case 8:Zc(),n=6;break e;case 3:case 2:case 9:case 6:Nt.current===null&&(t=!0);var i=pe;if(pe=0,Mt=null,Vr(e,u,s,i),a&&pl){n=0;break e}break;default:i=pe,pe=0,Mt=null,Vr(e,u,s,i)}}r1(),n=qe;break}catch(d){Fv(e,d)}while(!0);return t&&e.shellSuspendCounter++,Pa=lr=null,de=o,V.H=r,V.A=l,$===null&&(Se=null,ae=0,Ps()),n}function r1(){for(;$!==null;)Xv($)}function l1(e,t){var a=de;de|=2;var o=Gv(),r=Vv();Se!==e||ae!==t?(ys=null,bs=Ot()+500,nl(e,t)):pl=Rn(e,t);e:do try{if(pe!==0&&$!==null){t=$;var l=Mt;t:switch(pe){case 1:pe=0,Mt=null,Vr(e,t,l,1);break;case 2:case 9:if(Ph(l)){pe=0,Mt=null,lx(t);break}t=function(){pe!==2&&pe!==9||Se!==e||(pe=7),va(e)},l.then(t,t);break e;case 3:pe=7;break e;case 4:pe=5;break e;case 7:Ph(l)?(pe=0,Mt=null,lx(t)):(pe=0,Mt=null,Vr(e,t,l,7));break;case 5:var n=null;switch($.tag){case 26:n=$.memoizedState;case 5:case 27:var u=$;if(n?db(n):u.stateNode.complete){pe=0,Mt=null;var s=u.sibling;if(s!==null)$=s;else{var i=u.return;i!==null?($=i,Vs(i)):$=null}break t}}pe=0,Mt=null,Vr(e,t,l,5);break;case 6:pe=0,Mt=null,Vr(e,t,l,6);break;case 8:Zc(),qe=6;break e;default:throw Error(k(462))}}n1();break}catch(d){Fv(e,d)}while(!0);return Pa=lr=null,V.H=o,V.A=r,de=a,$!==null?0:(Se=null,ae=0,Ps(),qe)}function n1(){for(;$!==null&&!M0();)Xv($)}function Xv(e){var t=vv(e.alternate,e,Ga);e.memoizedProps=e.pendingProps,t===null?Vs(e):$=t}function lx(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=Jh(a,t,t.pendingProps,t.type,void 0,ae);break;case 11:t=Jh(a,t,t.pendingProps,t.type.render,t.ref,ae);break;case 5:Oc(t);default:bv(a,t),t=$=bg(t,Ga),t=vv(a,t,Ga)}e.memoizedProps=e.pendingProps,t===null?Vs(e):$=t}function Vr(e,t,a,o){Pa=lr=null,Oc(t),Yr=null,xn=0;var r=t.return;try{if(ZC(e,r,t,a,ae)){qe=1,xs(e,Xt(a,e.current)),$=null;return}}catch(l){if(r!==null)throw $=r,l;qe=1,xs(e,Xt(a,e.current)),$=null;return}t.flags&32768?(re||o===1?e=!0:pl||ae&536870912?e=!1:(uo=e=!0,(o===2||o===9||o===3||o===6)&&(o=Nt.current,o!==null&&o.tag===13&&(o.flags|=16384))),jv(t,e)):Vs(t)}function Vs(e){var t=e;do{if(t.flags&32768){jv(t,uo);return}e=t.return;var a=QC(t.alternate,t,Ga);if(a!==null){$=a;return}if(t=t.sibling,t!==null){$=t;return}$=t=e}while(t!==null);qe===0&&(qe=5)}function jv(e,t){do{var a=JC(e.alternate,e);if(a!==null){a.flags&=32767,$=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){$=e;return}$=e=a}while(e!==null);qe=6,$=null}function nx(e,t,a,o,r,l,n,u,s){e.cancelPendingCommit=null;do Xs();while(Qe!==0);if(de&6)throw Error(k(327));if(t!==null){if(t===e.current)throw Error(k(177));if(l=t.lanes|t.childLanes,l|=bc,z0(e,a,l,n,u,s),e===Se&&($=Se=null,ae=0),ll=t,xo=e,Na=a,Wd=l,Zd=r,Nv=o,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,f1(ls,function(){return Qv(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(t.flags&13878)!==0,t.subtreeFlags&13878||o){o=V.T,V.T=null,r=ce.p,ce.p=2,n=de,de|=4;try{$C(e,t,a)}finally{de=n,ce.p=r,V.T=o}}Qe=1,Wv(),Zv(),Yv()}}function Wv(){if(Qe===1){Qe=0;var e=xo,t=ll,a=(t.flags&13878)!==0;if(t.subtreeFlags&13878||a){a=V.T,V.T=null;var o=ce.p;ce.p=2;var r=de;de|=4;try{Dv(t,e);var l=$d,n=dg(e.containerInfo),u=l.focusedElem,s=l.selectionRange;if(n!==u&&u&&u.ownerDocument&&fg(u.ownerDocument.documentElement,u)){if(s!==null&&vc(u)){var i=s.start,d=s.end;if(d===void 0&&(d=i),"selectionStart"in u)u.selectionStart=i,u.selectionEnd=Math.min(d,u.value.length);else{var p=u.ownerDocument||document,x=p&&p.defaultView||window;if(x.getSelection){var h=x.getSelection(),b=u.textContent.length,v=Math.min(s.start,b),y=s.end===void 0?v:Math.min(s.end,b);!h.extend&&v>y&&(n=y,y=v,v=n);var c=Ah(u,v),f=Ah(u,y);if(c&&f&&(h.rangeCount!==1||h.anchorNode!==c.node||h.anchorOffset!==c.offset||h.focusNode!==f.node||h.focusOffset!==f.offset)){var m=p.createRange();m.setStart(c.node,c.offset),h.removeAllRanges(),v>y?(h.addRange(m),h.extend(f.node,f.offset)):(m.setEnd(f.node,f.offset),h.addRange(m))}}}}for(p=[],h=u;h=h.parentNode;)h.nodeType===1&&p.push({element:h,left:h.scrollLeft,top:h.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<p.length;u++){var g=p[u];g.element.scrollLeft=g.left,g.element.scrollTop=g.top}}Ms=!!Jd,$d=Jd=null}finally{de=r,ce.p=o,V.T=a}}e.current=t,Qe=2}}function Zv(){if(Qe===2){Qe=0;var e=xo,t=ll,a=(t.flags&8772)!==0;if(t.subtreeFlags&8772||a){a=V.T,V.T=null;var o=ce.p;ce.p=2;var r=de;de|=4;try{Iv(e,t.alternate,t)}finally{de=r,ce.p=o,V.T=a}}Qe=3}}function Yv(){if(Qe===4||Qe===3){Qe=0,D0();var e=xo,t=ll,a=Na,o=Nv;t.subtreeFlags&10256||t.flags&10256?Qe=5:(Qe=0,ll=xo=null,Kv(e,e.pendingLanes));var r=e.pendingLanes;if(r===0&&(ho=null),dc(a),t=t.stateNode,Bt&&typeof Bt.onCommitFiberRoot=="function")try{Bt.onCommitFiberRoot(In,t,void 0,(t.current.flags&128)===128)}catch{}if(o!==null){t=V.T,r=ce.p,ce.p=2,V.T=null;try{for(var l=e.onRecoverableError,n=0;n<o.length;n++){var u=o[n];l(u.value,{componentStack:u.stack})}}finally{V.T=t,ce.p=r}}Na&3&&Xs(),va(e),r=e.pendingLanes,a&261930&&r&42?e===Yd?un++:(un=0,Yd=e):un=0,On(0,!1)}}function Kv(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Dn(t)))}function Xs(){return Wv(),Zv(),Yv(),Qv()}function Qv(){if(Qe!==5)return!1;var e=xo,t=Wd;Wd=0;var a=dc(Na),o=V.T,r=ce.p;try{ce.p=32>a?32:a,V.T=null,a=Zd,Zd=null;var l=xo,n=Na;if(Qe=0,ll=xo=null,Na=0,de&6)throw Error(k(331));var u=de;if(de|=4,Pv(l.current),Ev(l,l.current,n,a),de=u,On(0,!1),Bt&&typeof Bt.onPostCommitFiberRoot=="function")try{Bt.onPostCommitFiberRoot(In,l)}catch{}return!0}finally{ce.p=r,V.T=o,Kv(e,t)}}function ux(e,t,a){t=Xt(a,t),t=_d(e.stateNode,t,2),e=mo(e,t,2),e!==null&&(kn(e,2),va(e))}function me(e,t,a){if(e.tag===3)ux(e,e,a);else for(;t!==null;){if(t.tag===3){ux(t,e,a);break}else if(t.tag===1){var o=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(ho===null||!ho.has(o))){e=Xt(a,e),a=cv(2),o=mo(t,a,2),o!==null&&(pv(a,o,t,e),kn(o,2),va(o));break}}t=t.return}}function nd(e,t,a){var o=e.pingCache;if(o===null){o=e.pingCache=new a1;var r=new Set;o.set(t,r)}else r=o.get(t),r===void 0&&(r=new Set,o.set(t,r));r.has(a)||(jc=!0,r.add(a),e=u1.bind(null,e,t,a),t.then(e,e))}function u1(e,t,a){var o=e.pingCache;o!==null&&o.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Se===e&&(ae&a)===a&&(qe===4||qe===3&&(ae&62914560)===ae&&300>Ot()-_s?!(de&2)&&nl(e,0):Wc|=a,rl===ae&&(rl=0)),va(e)}function Jv(e,t){t===0&&(t=Gx()),e=rr(e,t),e!==null&&(kn(e,t),va(e))}function s1(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Jv(e,a)}function i1(e,t){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,r=e.memoizedState;r!==null&&(a=r.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(k(314))}o!==null&&o.delete(t),Jv(e,a)}function f1(e,t){return ic(e,t)}var Ss=null,Er=null,Kd=!1,Ls=!1,ud=!1,io=0;function va(e){e!==Er&&e.next===null&&(Er===null?Ss=Er=e:Er=Er.next=e),Ls=!0,Kd||(Kd=!0,c1())}function On(e,t){if(!ud&&Ls){ud=!0;do for(var a=!1,o=Ss;o!==null;){if(!t)if(e!==0){var r=o.pendingLanes;if(r===0)var l=0;else{var n=o.suspendedLanes,u=o.pingedLanes;l=(1<<31-Pt(42|e)+1)-1,l&=r&~(n&~u),l=l&201326741?l&201326741|1:l?l|2:0}l!==0&&(a=!0,sx(o,l))}else l=ae,l=Ts(o,o===Se?l:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),!(l&3)||Rn(o,l)||(a=!0,sx(o,l));o=o.next}while(a);ud=!1}}function d1(){$v()}function $v(){Ls=Kd=!1;var e=0;io!==0&&y1()&&(e=io);for(var t=Ot(),a=null,o=Ss;o!==null;){var r=o.next,l=eb(o,t);l===0?(o.next=null,a===null?Ss=r:a.next=r,r===null&&(Er=a)):(a=o,(e!==0||l&3)&&(Ls=!0)),o=r}Qe!==0&&Qe!==5||On(e,!1),io!==0&&(io=0)}function eb(e,t){for(var a=e.suspendedLanes,o=e.pingedLanes,r=e.expirationTimes,l=e.pendingLanes&-62914561;0<l;){var n=31-Pt(l),u=1<<n,s=r[n];s===-1?(!(u&a)||u&o)&&(r[n]=N0(u,t)):s<=t&&(e.expiredLanes|=u),l&=~u}if(t=Se,a=ae,a=Ts(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===t&&(pe===2||pe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&Uf(o),e.callbackNode=null,e.callbackPriority=0;if(!(a&3)||Rn(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(o!==null&&Uf(o),dc(a)){case 2:case 8:a=Fx;break;case 32:a=ls;break;case 268435456:a=_x;break;default:a=ls}return o=tb.bind(null,e),a=ic(a,o),e.callbackPriority=t,e.callbackNode=a,t}return o!==null&&o!==null&&Uf(o),e.callbackPriority=2,e.callbackNode=null,2}function tb(e,t){if(Qe!==0&&Qe!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Xs()&&e.callbackNode!==a)return null;var o=ae;return o=Ts(e,e===Se?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(qv(e,o,t),eb(e,Ot()),e.callbackNode!=null&&e.callbackNode===a?tb.bind(null,e):null)}function sx(e,t){if(Xs())return null;qv(e,t,!0)}function c1(){S1(function(){de&6?ic(qx,d1):$v()})}function Yc(){if(io===0){var e=tl;e===0&&(e=Cu,Cu<<=1,!(Cu&261888)&&(Cu=256)),io=e}return io}function ix(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:_u(""+e)}function fx(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function p1(e,t,a,o,r){if(t==="submit"&&a&&a.stateNode===r){var l=ix((r[It]||null).action),n=o.submitter;n&&(t=(t=n[It]||null)?ix(t.formAction):n.getAttribute("formAction"),t!==null&&(l=t,n=null));var u=new Es("action","action",null,o,r);e.push({event:u,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(io!==0){var s=n?fx(r,n):new FormData(r);qd(a,{pending:!0,data:s,method:r.method,action:l},null,s)}}else typeof l=="function"&&(u.preventDefault(),s=n?fx(r,n):new FormData(r),qd(a,{pending:!0,data:s,method:r.method,action:l},l,s))},currentTarget:r}]})}}for(Uu=0;Uu<Ad.length;Uu++)Hu=Ad[Uu],dx=Hu.toLowerCase(),cx=Hu[0].toUpperCase()+Hu.slice(1),oa(dx,"on"+cx);var Hu,dx,cx,Uu;oa(pg,"onAnimationEnd");oa(mg,"onAnimationIteration");oa(hg,"onAnimationStart");oa("dblclick","onDoubleClick");oa("focusin","onFocus");oa("focusout","onBlur");oa(TC,"onTransitionRun");oa(EC,"onTransitionStart");oa(OC,"onTransitionCancel");oa(xg,"onTransitionEnd");$r("onMouseEnter",["mouseout","mouseover"]);$r("onMouseLeave",["mouseout","mouseover"]);$r("onPointerEnter",["pointerout","pointerover"]);$r("onPointerLeave",["pointerout","pointerover"]);tr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));tr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));tr("onBeforeInput",["compositionend","keypress","textInput","paste"]);tr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));tr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));tr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),m1=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bn));function ab(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],r=o.event;o=o.listeners;e:{var l=void 0;if(t)for(var n=o.length-1;0<=n;n--){var u=o[n],s=u.instance,i=u.currentTarget;if(u=u.listener,s!==l&&r.isPropagationStopped())break e;l=u,r.currentTarget=i;try{l(r)}catch(d){us(d)}r.currentTarget=null,l=s}else for(n=0;n<o.length;n++){if(u=o[n],s=u.instance,i=u.currentTarget,u=u.listener,s!==l&&r.isPropagationStopped())break e;l=u,r.currentTarget=i;try{l(r)}catch(d){us(d)}r.currentTarget=null,l=s}}}}function J(e,t){var a=t[yd];a===void 0&&(a=t[yd]=new Set);var o=e+"__bubble";a.has(o)||(ob(t,e,2,!1),a.add(o))}function sd(e,t,a){var o=0;t&&(o|=4),ob(a,e,o,t)}var Nu="_reactListening"+Math.random().toString(36).slice(2);function Kc(e){if(!e[Nu]){e[Nu]=!0,Zx.forEach(function(a){a!=="selectionchange"&&(m1.has(a)||sd(a,!1,e),sd(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Nu]||(t[Nu]=!0,sd("selectionchange",!1,t))}}function ob(e,t,a,o){switch(xb(t)){case 2:var r=_1;break;case 8:r=G1;break;default:r=ep}a=r.bind(null,t,a,e),r=void 0,!Id||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),o?r!==void 0?e.addEventListener(t,a,{capture:!0,passive:r}):e.addEventListener(t,a,!0):r!==void 0?e.addEventListener(t,a,{passive:r}):e.addEventListener(t,a,!1)}function id(e,t,a,o,r){var l=o;if(!(t&1)&&!(t&2)&&o!==null)e:for(;;){if(o===null)return;var n=o.tag;if(n===3||n===4){var u=o.stateNode.containerInfo;if(u===r)break;if(n===4)for(n=o.return;n!==null;){var s=n.tag;if((s===3||s===4)&&n.stateNode.containerInfo===r)return;n=n.return}for(;u!==null;){if(n=Pr(u),n===null)return;if(s=n.tag,s===5||s===6||s===26||s===27){o=l=n;continue e}u=u.parentNode}}o=o.return}ag(function(){var i=l,d=mc(a),p=[];e:{var x=gg.get(e);if(x!==void 0){var h=Es,b=e;switch(e){case"keypress":if(Vu(a)===0)break e;case"keydown":case"keyup":h=iC;break;case"focusin":b="focus",h=Ff;break;case"focusout":b="blur",h=Ff;break;case"beforeblur":case"afterblur":h=Ff;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=bh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=Q0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=cC;break;case pg:case mg:case hg:h=eC;break;case xg:h=mC;break;case"scroll":case"scrollend":h=Y0;break;case"wheel":h=xC;break;case"copy":case"cut":case"paste":h=aC;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=wh;break;case"toggle":case"beforetoggle":h=vC}var v=(t&4)!==0,y=!v&&(e==="scroll"||e==="scrollend"),c=v?x!==null?x+"Capture":null:x;v=[];for(var f=i,m;f!==null;){var g=f;if(m=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||m===null||c===null||(g=dn(f,c),g!=null&&v.push(yn(f,g,m))),y)break;f=f.return}0<v.length&&(x=new h(x,b,null,a,d),p.push({event:x,listeners:v}))}}if(!(t&7)){e:{if(x=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",x&&a!==Cd&&(b=a.relatedTarget||a.fromElement)&&(Pr(b)||b[il]))break e;if((h||x)&&(x=d.window===d?d:(x=d.ownerDocument)?x.defaultView||x.parentWindow:window,h?(b=a.relatedTarget||a.toElement,h=i,b=b?Pr(b):null,b!==null&&(y=Cn(b),v=b.tag,b!==y||v!==5&&v!==27&&v!==6)&&(b=null)):(h=null,b=i),h!==b)){if(v=bh,g="onMouseLeave",c="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(v=wh,g="onPointerLeave",c="onPointerEnter",f="pointer"),y=h==null?x:Wl(h),m=b==null?x:Wl(b),x=new v(g,f+"leave",h,a,d),x.target=y,x.relatedTarget=m,g=null,Pr(d)===i&&(v=new v(c,f+"enter",b,a,d),v.target=m,v.relatedTarget=y,g=v),y=g,h&&b)t:{for(v=h1,c=h,f=b,m=0,g=c;g;g=v(g))m++;g=0;for(var S=f;S;S=v(S))g++;for(;0<m-g;)c=v(c),m--;for(;0<g-m;)f=v(f),g--;for(;m--;){if(c===f||f!==null&&c===f.alternate){v=c;break t}c=v(c),f=v(f)}v=null}else v=null;h!==null&&px(p,x,h,v,!1),b!==null&&y!==null&&px(p,y,b,v,!0)}}e:{if(x=i?Wl(i):window,h=x.nodeName&&x.nodeName.toLowerCase(),h==="select"||h==="input"&&x.type==="file")var I=Ih;else if(Ch(x))if(sg)I=AC;else{I=RC;var C=IC}else h=x.nodeName,!h||h.toLowerCase()!=="input"||x.type!=="checkbox"&&x.type!=="radio"?i&&pc(i.elementType)&&(I=Ih):I=kC;if(I&&(I=I(e,i))){ug(p,I,a,d);break e}C&&C(e,x,i),e==="focusout"&&i&&x.type==="number"&&i.memoizedProps.value!=null&&Ld(x,"number",x.value)}switch(C=i?Wl(i):window,e){case"focusin":(Ch(C)||C.contentEditable==="true")&&(Nr=C,Rd=i,Jl=null);break;case"focusout":Jl=Rd=Nr=null;break;case"mousedown":kd=!0;break;case"contextmenu":case"mouseup":case"dragend":kd=!1,Mh(p,a,d);break;case"selectionchange":if(DC)break;case"keydown":case"keyup":Mh(p,a,d)}var L;if(gc)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Hr?lg(e,a)&&(R="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(R="onCompositionStart");R&&(rg&&a.locale!=="ko"&&(Hr||R!=="onCompositionStart"?R==="onCompositionEnd"&&Hr&&(L=og()):(no=d,hc="value"in no?no.value:no.textContent,Hr=!0)),C=Cs(i,R),0<C.length&&(R=new yh(R,e,null,a,d),p.push({event:R,listeners:C}),L?R.data=L:(L=ng(a),L!==null&&(R.data=L)))),(L=yC?wC(e,a):SC(e,a))&&(R=Cs(i,"onBeforeInput"),0<R.length&&(C=new yh("onBeforeInput","beforeinput",null,a,d),p.push({event:C,listeners:R}),C.data=L)),p1(p,e,i,a,d)}ab(p,t)})}function yn(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Cs(e,t){for(var a=t+"Capture",o=[];e!==null;){var r=e,l=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||l===null||(r=dn(e,a),r!=null&&o.unshift(yn(e,r,l)),r=dn(e,t),r!=null&&o.push(yn(e,r,l))),e.tag===3)return o;e=e.return}return[]}function h1(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function px(e,t,a,o,r){for(var l=t._reactName,n=[];a!==null&&a!==o;){var u=a,s=u.alternate,i=u.stateNode;if(u=u.tag,s!==null&&s===o)break;u!==5&&u!==26&&u!==27||i===null||(s=i,r?(i=dn(a,l),i!=null&&n.unshift(yn(a,i,s))):r||(i=dn(a,l),i!=null&&n.push(yn(a,i,s)))),a=a.return}n.length!==0&&e.push({event:t,listeners:n})}var x1=/\r\n?/g,g1=/\u0000|\uFFFD/g;function mx(e){return(typeof e=="string"?e:""+e).replace(x1,`
`).replace(g1,"")}function rb(e,t){return t=mx(t),mx(e)===t}function ge(e,t,a,o,r,l){switch(a){case"children":typeof o=="string"?t==="body"||t==="textarea"&&o===""||el(e,o):(typeof o=="number"||typeof o=="bigint")&&t!=="body"&&el(e,""+o);break;case"className":ku(e,"class",o);break;case"tabIndex":ku(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":ku(e,a,o);break;case"style":tg(e,o,l);break;case"data":if(t!=="object"){ku(e,"data",o);break}case"src":case"href":if(o===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=_u(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof l=="function"&&(a==="formAction"?(t!=="input"&&ge(e,t,"name",r.name,r,null),ge(e,t,"formEncType",r.formEncType,r,null),ge(e,t,"formMethod",r.formMethod,r,null),ge(e,t,"formTarget",r.formTarget,r,null)):(ge(e,t,"encType",r.encType,r,null),ge(e,t,"method",r.method,r,null),ge(e,t,"target",r.target,r,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=_u(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Ba);break;case"onScroll":o!=null&&J("scroll",e);break;case"onScrollEnd":o!=null&&J("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(k(61));if(a=o.__html,a!=null){if(r.children!=null)throw Error(k(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=_u(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":J("beforetoggle",e),J("toggle",e),Fu(e,"popover",o);break;case"xlinkActuate":Ra(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ra(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ra(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ra(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ra(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ra(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ra(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ra(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ra(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Fu(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=W0.get(a)||a,Fu(e,a,o))}}function Qd(e,t,a,o,r,l){switch(a){case"style":tg(e,o,l);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(k(61));if(a=o.__html,a!=null){if(r.children!=null)throw Error(k(60));e.innerHTML=a}}break;case"children":typeof o=="string"?el(e,o):(typeof o=="number"||typeof o=="bigint")&&el(e,""+o);break;case"onScroll":o!=null&&J("scroll",e);break;case"onScrollEnd":o!=null&&J("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Ba);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Yx.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(r=a.endsWith("Capture"),t=a.slice(2,r?a.length-7:void 0),l=e[It]||null,l=l!=null?l[a]:null,typeof l=="function"&&e.removeEventListener(t,l,r),typeof o=="function")){typeof l!="function"&&l!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,o,r);break e}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Fu(e,a,o)}}}function ut(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":J("error",e),J("load",e);var o=!1,r=!1,l;for(l in a)if(a.hasOwnProperty(l)){var n=a[l];if(n!=null)switch(l){case"src":o=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(k(137,t));default:ge(e,t,l,n,a,null)}}r&&ge(e,t,"srcSet",a.srcSet,a,null),o&&ge(e,t,"src",a.src,a,null);return;case"input":J("invalid",e);var u=l=n=r=null,s=null,i=null;for(o in a)if(a.hasOwnProperty(o)){var d=a[o];if(d!=null)switch(o){case"name":r=d;break;case"type":n=d;break;case"checked":s=d;break;case"defaultChecked":i=d;break;case"value":l=d;break;case"defaultValue":u=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(k(137,t));break;default:ge(e,t,o,d,a,null)}}Jx(e,l,u,s,i,n,r,!1);return;case"select":J("invalid",e),o=n=l=null;for(r in a)if(a.hasOwnProperty(r)&&(u=a[r],u!=null))switch(r){case"value":l=u;break;case"defaultValue":n=u;break;case"multiple":o=u;default:ge(e,t,r,u,a,null)}t=l,a=n,e.multiple=!!o,t!=null?jr(e,!!o,t,!1):a!=null&&jr(e,!!o,a,!0);return;case"textarea":J("invalid",e),l=r=o=null;for(n in a)if(a.hasOwnProperty(n)&&(u=a[n],u!=null))switch(n){case"value":o=u;break;case"defaultValue":r=u;break;case"children":l=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(k(91));break;default:ge(e,t,n,u,a,null)}eg(e,o,r,l);return;case"option":for(s in a)if(a.hasOwnProperty(s)&&(o=a[s],o!=null))switch(s){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:ge(e,t,s,o,a,null)}return;case"dialog":J("beforetoggle",e),J("toggle",e),J("cancel",e),J("close",e);break;case"iframe":case"object":J("load",e);break;case"video":case"audio":for(o=0;o<bn.length;o++)J(bn[o],e);break;case"image":J("error",e),J("load",e);break;case"details":J("toggle",e);break;case"embed":case"source":case"link":J("error",e),J("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(i in a)if(a.hasOwnProperty(i)&&(o=a[i],o!=null))switch(i){case"children":case"dangerouslySetInnerHTML":throw Error(k(137,t));default:ge(e,t,i,o,a,null)}return;default:if(pc(t)){for(d in a)a.hasOwnProperty(d)&&(o=a[d],o!==void 0&&Qd(e,t,d,o,a,void 0));return}}for(u in a)a.hasOwnProperty(u)&&(o=a[u],o!=null&&ge(e,t,u,o,a,null))}function v1(e,t,a,o){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,l=null,n=null,u=null,s=null,i=null,d=null;for(h in a){var p=a[h];if(a.hasOwnProperty(h)&&p!=null)switch(h){case"checked":break;case"value":break;case"defaultValue":s=p;default:o.hasOwnProperty(h)||ge(e,t,h,null,o,p)}}for(var x in o){var h=o[x];if(p=a[x],o.hasOwnProperty(x)&&(h!=null||p!=null))switch(x){case"type":l=h;break;case"name":r=h;break;case"checked":i=h;break;case"defaultChecked":d=h;break;case"value":n=h;break;case"defaultValue":u=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(k(137,t));break;default:h!==p&&ge(e,t,x,h,o,p)}}Sd(e,n,u,s,i,d,l,r);return;case"select":h=n=u=x=null;for(l in a)if(s=a[l],a.hasOwnProperty(l)&&s!=null)switch(l){case"value":break;case"multiple":h=s;default:o.hasOwnProperty(l)||ge(e,t,l,null,o,s)}for(r in o)if(l=o[r],s=a[r],o.hasOwnProperty(r)&&(l!=null||s!=null))switch(r){case"value":x=l;break;case"defaultValue":u=l;break;case"multiple":n=l;default:l!==s&&ge(e,t,r,l,o,s)}t=u,a=n,o=h,x!=null?jr(e,!!a,x,!1):!!o!=!!a&&(t!=null?jr(e,!!a,t,!0):jr(e,!!a,a?[]:"",!1));return;case"textarea":h=x=null;for(u in a)if(r=a[u],a.hasOwnProperty(u)&&r!=null&&!o.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:ge(e,t,u,null,o,r)}for(n in o)if(r=o[n],l=a[n],o.hasOwnProperty(n)&&(r!=null||l!=null))switch(n){case"value":x=r;break;case"defaultValue":h=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(k(91));break;default:r!==l&&ge(e,t,n,r,o,l)}$x(e,x,h);return;case"option":for(var b in a)if(x=a[b],a.hasOwnProperty(b)&&x!=null&&!o.hasOwnProperty(b))switch(b){case"selected":e.selected=!1;break;default:ge(e,t,b,null,o,x)}for(s in o)if(x=o[s],h=a[s],o.hasOwnProperty(s)&&x!==h&&(x!=null||h!=null))switch(s){case"selected":e.selected=x&&typeof x!="function"&&typeof x!="symbol";break;default:ge(e,t,s,x,o,h)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var v in a)x=a[v],a.hasOwnProperty(v)&&x!=null&&!o.hasOwnProperty(v)&&ge(e,t,v,null,o,x);for(i in o)if(x=o[i],h=a[i],o.hasOwnProperty(i)&&x!==h&&(x!=null||h!=null))switch(i){case"children":case"dangerouslySetInnerHTML":if(x!=null)throw Error(k(137,t));break;default:ge(e,t,i,x,o,h)}return;default:if(pc(t)){for(var y in a)x=a[y],a.hasOwnProperty(y)&&x!==void 0&&!o.hasOwnProperty(y)&&Qd(e,t,y,void 0,o,x);for(d in o)x=o[d],h=a[d],!o.hasOwnProperty(d)||x===h||x===void 0&&h===void 0||Qd(e,t,d,x,o,h);return}}for(var c in a)x=a[c],a.hasOwnProperty(c)&&x!=null&&!o.hasOwnProperty(c)&&ge(e,t,c,null,o,x);for(p in o)x=o[p],h=a[p],!o.hasOwnProperty(p)||x===h||x==null&&h==null||ge(e,t,p,x,o,h)}function hx(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function b1(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var r=a[o],l=r.transferSize,n=r.initiatorType,u=r.duration;if(l&&u&&hx(n)){for(n=0,u=r.responseEnd,o+=1;o<a.length;o++){var s=a[o],i=s.startTime;if(i>u)break;var d=s.transferSize,p=s.initiatorType;d&&hx(p)&&(s=s.responseEnd,n+=d*(s<u?1:(u-i)/(s-i)))}if(--o,t+=8*(l+n)/(r.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Jd=null,$d=null;function Is(e){return e.nodeType===9?e:e.ownerDocument}function xx(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function lb(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function ec(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var fd=null;function y1(){var e=window.event;return e&&e.type==="popstate"?e===fd?!1:(fd=e,!0):(fd=null,!1)}var nb=typeof setTimeout=="function"?setTimeout:void 0,w1=typeof clearTimeout=="function"?clearTimeout:void 0,gx=typeof Promise=="function"?Promise:void 0,S1=typeof queueMicrotask=="function"?queueMicrotask:typeof gx<"u"?function(e){return gx.resolve(null).then(e).catch(L1)}:nb;function L1(e){setTimeout(function(){throw e})}function Io(e){return e==="head"}function vx(e,t){var a=t,o=0;do{var r=a.nextSibling;if(e.removeChild(a),r&&r.nodeType===8)if(a=r.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(r),sl(t);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")sn(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,sn(a);for(var l=a.firstChild;l;){var n=l.nextSibling,u=l.nodeName;l[An]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&l.rel.toLowerCase()==="stylesheet"||a.removeChild(l),l=n}}else a==="body"&&sn(e.ownerDocument.body);a=r}while(a);sl(t)}function bx(e,t){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?t?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(t?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function tc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":tc(a),cc(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function C1(e,t,a,o){for(;e.nodeType===1;){var r=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[An])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(l=e.getAttribute("rel"),l==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(l!==r.rel||e.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||e.getAttribute("title")!==(r.title==null?null:r.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(l=e.getAttribute("src"),(l!==(r.src==null?null:r.src)||e.getAttribute("type")!==(r.type==null?null:r.type)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&l&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var l=r.name==null?null:""+r.name;if(r.type==="hidden"&&e.getAttribute("name")===l)return e}else return e;if(e=Zt(e.nextSibling),e===null)break}return null}function I1(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=Zt(e.nextSibling),e===null))return null;return e}function ub(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Zt(e.nextSibling),e===null))return null;return e}function ac(e){return e.data==="$?"||e.data==="$~"}function oc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function R1(e,t){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||a.readyState!=="loading")t();else{var o=function(){t(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function Zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var rc=null;function yx(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(t===0)return Zt(e.nextSibling);t--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||t++}e=e.nextSibling}return null}function wx(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(t===0)return e;t--}else a!=="/$"&&a!=="/&"||t++}e=e.previousSibling}return null}function sb(e,t,a){switch(t=Is(a),e){case"html":if(e=t.documentElement,!e)throw Error(k(452));return e;case"head":if(e=t.head,!e)throw Error(k(453));return e;case"body":if(e=t.body,!e)throw Error(k(454));return e;default:throw Error(k(451))}}function sn(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);cc(e)}var Yt=new Map,Sx=new Set;function Rs(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Va=ce.d;ce.d={f:k1,r:A1,D:M1,C:D1,L:T1,m:E1,X:B1,S:O1,M:P1};function k1(){var e=Va.f(),t=Gs();return e||t}function A1(e){var t=fl(e);t!==null&&t.tag===5&&t.type==="form"?tv(t):Va.r(e)}var ml=typeof document>"u"?null:document;function ib(e,t,a){var o=ml;if(o&&typeof t=="string"&&t){var r=Vt(t);r='link[rel="'+e+'"][href="'+r+'"]',typeof a=="string"&&(r+='[crossorigin="'+a+'"]'),Sx.has(r)||(Sx.add(r),e={rel:e,crossOrigin:a,href:t},o.querySelector(r)===null&&(t=o.createElement("link"),ut(t,"link",e),tt(t),o.head.appendChild(t)))}}function M1(e){Va.D(e),ib("dns-prefetch",e,null)}function D1(e,t){Va.C(e,t),ib("preconnect",e,t)}function T1(e,t,a){Va.L(e,t,a);var o=ml;if(o&&e&&t){var r='link[rel="preload"][as="'+Vt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(r+='[imagesrcset="'+Vt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(r+='[imagesizes="'+Vt(a.imageSizes)+'"]')):r+='[href="'+Vt(e)+'"]';var l=r;switch(t){case"style":l=ul(e);break;case"script":l=hl(e)}Yt.has(l)||(e=Me({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),Yt.set(l,e),o.querySelector(r)!==null||t==="style"&&o.querySelector(Bn(l))||t==="script"&&o.querySelector(Pn(l))||(t=o.createElement("link"),ut(t,"link",e),tt(t),o.head.appendChild(t)))}}function E1(e,t){Va.m(e,t);var a=ml;if(a&&e){var o=t&&typeof t.as=="string"?t.as:"script",r='link[rel="modulepreload"][as="'+Vt(o)+'"][href="'+Vt(e)+'"]',l=r;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":l=hl(e)}if(!Yt.has(l)&&(e=Me({rel:"modulepreload",href:e},t),Yt.set(l,e),a.querySelector(r)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Pn(l)))return}o=a.createElement("link"),ut(o,"link",e),tt(o),a.head.appendChild(o)}}}function O1(e,t,a){Va.S(e,t,a);var o=ml;if(o&&e){var r=Xr(o).hoistableStyles,l=ul(e);t=t||"default";var n=r.get(l);if(!n){var u={loading:0,preload:null};if(n=o.querySelector(Bn(l)))u.loading=5;else{e=Me({rel:"stylesheet",href:e,"data-precedence":t},a),(a=Yt.get(l))&&Qc(e,a);var s=n=o.createElement("link");tt(s),ut(s,"link",e),s._p=new Promise(function(i,d){s.onload=i,s.onerror=d}),s.addEventListener("load",function(){u.loading|=1}),s.addEventListener("error",function(){u.loading|=2}),u.loading|=4,Ju(n,t,o)}n={type:"stylesheet",instance:n,count:1,state:u},r.set(l,n)}}}function B1(e,t){Va.X(e,t);var a=ml;if(a&&e){var o=Xr(a).hoistableScripts,r=hl(e),l=o.get(r);l||(l=a.querySelector(Pn(r)),l||(e=Me({src:e,async:!0},t),(t=Yt.get(r))&&Jc(e,t),l=a.createElement("script"),tt(l),ut(l,"link",e),a.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},o.set(r,l))}}function P1(e,t){Va.M(e,t);var a=ml;if(a&&e){var o=Xr(a).hoistableScripts,r=hl(e),l=o.get(r);l||(l=a.querySelector(Pn(r)),l||(e=Me({src:e,async:!0,type:"module"},t),(t=Yt.get(r))&&Jc(e,t),l=a.createElement("script"),tt(l),ut(l,"link",e),a.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},o.set(r,l))}}function Lx(e,t,a,o){var r=(r=fo.current)?Rs(r):null;if(!r)throw Error(k(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=ul(a.href),a=Xr(r).hoistableStyles,o=a.get(t),o||(o={type:"style",instance:null,count:0,state:null},a.set(t,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=ul(a.href);var l=Xr(r).hoistableStyles,n=l.get(e);if(n||(r=r.ownerDocument||r,n={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},l.set(e,n),(l=r.querySelector(Bn(e)))&&!l._p&&(n.instance=l,n.state.loading=5),Yt.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Yt.set(e,a),l||U1(r,e,a,n.state))),t&&o===null)throw Error(k(528,""));return n}if(t&&o!==null)throw Error(k(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=hl(a),a=Xr(r).hoistableScripts,o=a.get(t),o||(o={type:"script",instance:null,count:0,state:null},a.set(t,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(k(444,e))}}function ul(e){return'href="'+Vt(e)+'"'}function Bn(e){return'link[rel="stylesheet"]['+e+"]"}function fb(e){return Me({},e,{"data-precedence":e.precedence,precedence:null})}function U1(e,t,a,o){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?o.loading=1:(t=e.createElement("link"),o.preload=t,t.addEventListener("load",function(){return o.loading|=1}),t.addEventListener("error",function(){return o.loading|=2}),ut(t,"link",a),tt(t),e.head.appendChild(t))}function hl(e){return'[src="'+Vt(e)+'"]'}function Pn(e){return"script[async]"+e}function Cx(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var o=e.querySelector('style[data-href~="'+Vt(a.href)+'"]');if(o)return t.instance=o,tt(o),o;var r=Me({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),tt(o),ut(o,"style",r),Ju(o,a.precedence,e),t.instance=o;case"stylesheet":r=ul(a.href);var l=e.querySelector(Bn(r));if(l)return t.state.loading|=4,t.instance=l,tt(l),l;o=fb(a),(r=Yt.get(r))&&Qc(o,r),l=(e.ownerDocument||e).createElement("link"),tt(l);var n=l;return n._p=new Promise(function(u,s){n.onload=u,n.onerror=s}),ut(l,"link",o),t.state.loading|=4,Ju(l,a.precedence,e),t.instance=l;case"script":return l=hl(a.src),(r=e.querySelector(Pn(l)))?(t.instance=r,tt(r),r):(o=a,(r=Yt.get(l))&&(o=Me({},a),Jc(o,r)),e=e.ownerDocument||e,r=e.createElement("script"),tt(r),ut(r,"link",o),e.head.appendChild(r),t.instance=r);case"void":return null;default:throw Error(k(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(o=t.instance,t.state.loading|=4,Ju(o,a.precedence,e));return t.instance}function Ju(e,t,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),r=o.length?o[o.length-1]:null,l=r,n=0;n<o.length;n++){var u=o[n];if(u.dataset.precedence===t)l=u;else if(l!==r)break}l?l.parentNode.insertBefore(e,l.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function Qc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Jc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var $u=null;function Ix(e,t,a){if($u===null){var o=new Map,r=$u=new Map;r.set(a,o)}else r=$u,o=r.get(a),o||(o=new Map,r.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),r=0;r<a.length;r++){var l=a[r];if(!(l[An]||l[rt]||e==="link"&&l.getAttribute("rel")==="stylesheet")&&l.namespaceURI!=="http://www.w3.org/2000/svg"){var n=l.getAttribute(t)||"";n=e+n;var u=o.get(n);u?u.push(l):o.set(n,[l])}}return o}function Rx(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function H1(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function db(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function N1(e,t,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&!(a.state.loading&4)){if(a.instance===null){var r=ul(o.href),l=t.querySelector(Bn(r));if(l){t=l._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=ks.bind(e),t.then(e,e)),a.state.loading|=4,a.instance=l,tt(l);return}l=t.ownerDocument||t,o=fb(o),(r=Yt.get(r))&&Qc(o,r),l=l.createElement("link"),tt(l);var n=l;n._p=new Promise(function(u,s){n.onload=u,n.onerror=s}),ut(l,"link",o),a.instance=l}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,t),(t=a.state.preload)&&!(a.state.loading&3)&&(e.count++,a=ks.bind(e),t.addEventListener("load",a),t.addEventListener("error",a))}}var dd=0;function z1(e,t){return e.stylesheets&&e.count===0&&es(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&es(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4+t);0<e.imgBytes&&dd===0&&(dd=62500*b1());var r=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&es(e,e.stylesheets),e.unsuspend)){var l=e.unsuspend;e.unsuspend=null,l()}},(e.imgBytes>dd?50:800)+t);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(r)}}:null}function ks(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)es(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var As=null;function es(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,As=new Map,t.forEach(q1,e),As=null,ks.call(e))}function q1(e,t){if(!(t.state.loading&4)){var a=As.get(e);if(a)var o=a.get(null);else{a=new Map,As.set(e,a);for(var r=e.querySelectorAll("link[data-precedence],style[data-precedence]"),l=0;l<r.length;l++){var n=r[l];(n.nodeName==="LINK"||n.getAttribute("media")!=="not all")&&(a.set(n.dataset.precedence,n),o=n)}o&&a.set(null,o)}r=t.instance,n=r.getAttribute("data-precedence"),l=a.get(n)||o,l===o&&a.set(null,r),a.set(n,r),this.count++,o=ks.bind(this),r.addEventListener("load",o),r.addEventListener("error",o),l?l.parentNode.insertBefore(r,l.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(r,e.firstChild)),t.state.loading|=4}}var wn={$$typeof:Oa,Provider:null,Consumer:null,_currentValue:Xo,_currentValue2:Xo,_threadCount:0};function F1(e,t,a,o,r,l,n,u,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Hf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Hf(0),this.hiddenUpdates=Hf(null),this.identifierPrefix=o,this.onUncaughtError=r,this.onCaughtError=l,this.onRecoverableError=n,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function cb(e,t,a,o,r,l,n,u,s,i,d,p){return e=new F1(e,t,a,n,s,i,d,p,u),t=1,l===!0&&(t|=24),l=Tt(3,null,null,t),e.current=l,l.stateNode=e,t=Cc(),t.refCount++,e.pooledCache=t,t.refCount++,l.memoizedState={element:o,isDehydrated:a,cache:t},kc(l),e}function pb(e){return e?(e=Fr,e):Fr}function mb(e,t,a,o,r,l){r=pb(r),o.context===null?o.context=r:o.pendingContext=r,o=po(t),o.payload={element:a},l=l===void 0?null:l,l!==null&&(o.callback=l),a=mo(e,o,t),a!==null&&(Ct(a,e,t),en(a,e,t))}function kx(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function $c(e,t){kx(e,t),(e=e.alternate)&&kx(e,t)}function hb(e){if(e.tag===13||e.tag===31){var t=rr(e,67108864);t!==null&&Ct(t,e,67108864),$c(e,67108864)}}function Ax(e){if(e.tag===13||e.tag===31){var t=Ut();t=fc(t);var a=rr(e,t);a!==null&&Ct(a,e,t),$c(e,t)}}var Ms=!0;function _1(e,t,a,o){var r=V.T;V.T=null;var l=ce.p;try{ce.p=2,ep(e,t,a,o)}finally{ce.p=l,V.T=r}}function G1(e,t,a,o){var r=V.T;V.T=null;var l=ce.p;try{ce.p=8,ep(e,t,a,o)}finally{ce.p=l,V.T=r}}function ep(e,t,a,o){if(Ms){var r=lc(o);if(r===null)id(e,t,o,Ds,a),Mx(e,o);else if(X1(r,e,t,a,o))o.stopPropagation();else if(Mx(e,o),t&4&&-1<V1.indexOf(e)){for(;r!==null;){var l=fl(r);if(l!==null)switch(l.tag){case 3:if(l=l.stateNode,l.current.memoizedState.isDehydrated){var n=_o(l.pendingLanes);if(n!==0){var u=l;for(u.pendingLanes|=2,u.entangledLanes|=2;n;){var s=1<<31-Pt(n);u.entanglements[1]|=s,n&=~s}va(l),!(de&6)&&(bs=Ot()+500,On(0,!1))}}break;case 31:case 13:u=rr(l,2),u!==null&&Ct(u,l,2),Gs(),$c(l,2)}if(l=lc(o),l===null&&id(e,t,o,Ds,a),l===r)break;r=l}r!==null&&o.stopPropagation()}else id(e,t,o,null,a)}}function lc(e){return e=mc(e),tp(e)}var Ds=null;function tp(e){if(Ds=null,e=Pr(e),e!==null){var t=Cn(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=Px(t),e!==null)return e;e=null}else if(a===31){if(e=Ux(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ds=e,null}function xb(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(T0()){case qx:return 2;case Fx:return 8;case ls:case E0:return 32;case _x:return 268435456;default:return 32}default:return 32}}var nc=!1,go=null,vo=null,bo=null,Sn=new Map,Ln=new Map,ro=[],V1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Mx(e,t){switch(e){case"focusin":case"focusout":go=null;break;case"dragenter":case"dragleave":vo=null;break;case"mouseover":case"mouseout":bo=null;break;case"pointerover":case"pointerout":Sn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ln.delete(t.pointerId)}}function Gl(e,t,a,o,r,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:a,eventSystemFlags:o,nativeEvent:l,targetContainers:[r]},t!==null&&(t=fl(t),t!==null&&hb(t)),e):(e.eventSystemFlags|=o,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function X1(e,t,a,o,r){switch(t){case"focusin":return go=Gl(go,e,t,a,o,r),!0;case"dragenter":return vo=Gl(vo,e,t,a,o,r),!0;case"mouseover":return bo=Gl(bo,e,t,a,o,r),!0;case"pointerover":var l=r.pointerId;return Sn.set(l,Gl(Sn.get(l)||null,e,t,a,o,r)),!0;case"gotpointercapture":return l=r.pointerId,Ln.set(l,Gl(Ln.get(l)||null,e,t,a,o,r)),!0}return!1}function gb(e){var t=Pr(e.target);if(t!==null){var a=Cn(t);if(a!==null){if(t=a.tag,t===13){if(t=Px(a),t!==null){e.blockedOn=t,ch(e.priority,function(){Ax(a)});return}}else if(t===31){if(t=Ux(a),t!==null){e.blockedOn=t,ch(e.priority,function(){Ax(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ts(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=lc(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);Cd=o,a.target.dispatchEvent(o),Cd=null}else return t=fl(a),t!==null&&hb(t),e.blockedOn=a,!1;t.shift()}return!0}function Dx(e,t,a){ts(e)&&a.delete(t)}function j1(){nc=!1,go!==null&&ts(go)&&(go=null),vo!==null&&ts(vo)&&(vo=null),bo!==null&&ts(bo)&&(bo=null),Sn.forEach(Dx),Ln.forEach(Dx)}function zu(e,t){e.blockedOn===t&&(e.blockedOn=null,nc||(nc=!0,Je.unstable_scheduleCallback(Je.unstable_NormalPriority,j1)))}var qu=null;function Tx(e){qu!==e&&(qu=e,Je.unstable_scheduleCallback(Je.unstable_NormalPriority,function(){qu===e&&(qu=null);for(var t=0;t<e.length;t+=3){var a=e[t],o=e[t+1],r=e[t+2];if(typeof o!="function"){if(tp(o||a)===null)continue;break}var l=fl(a);l!==null&&(e.splice(t,3),t-=3,qd(l,{pending:!0,data:r,method:a.method,action:o},o,r))}}))}function sl(e){function t(s){return zu(s,e)}go!==null&&zu(go,e),vo!==null&&zu(vo,e),bo!==null&&zu(bo,e),Sn.forEach(t),Ln.forEach(t);for(var a=0;a<ro.length;a++){var o=ro[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<ro.length&&(a=ro[0],a.blockedOn===null);)gb(a),a.blockedOn===null&&ro.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var r=a[o],l=a[o+1],n=r[It]||null;if(typeof l=="function")n||Tx(a);else if(n){var u=null;if(l&&l.hasAttribute("formAction")){if(r=l,n=l[It]||null)u=n.formAction;else if(tp(r)!==null)continue}else u=n.action;typeof u=="function"?a[o+1]=u:(a.splice(o,3),o-=3),Tx(a)}}}function vb(){function e(l){l.canIntercept&&l.info==="react-transition"&&l.intercept({handler:function(){return new Promise(function(n){return r=n})},focusReset:"manual",scroll:"manual"})}function t(){r!==null&&(r(),r=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var l=navigation.currentEntry;l&&l.url!=null&&navigation.navigate(l.url,{state:l.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,r=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),r!==null&&(r(),r=null)}}}function ap(e){this._internalRoot=e}js.prototype.render=ap.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));var a=t.current,o=Ut();mb(a,o,e,t,null,null)};js.prototype.unmount=ap.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;mb(e.current,2,null,e,null,null),Gs(),t[il]=null}};function js(e){this._internalRoot=e}js.prototype.unstable_scheduleHydration=function(e){if(e){var t=Wx();e={blockedOn:null,target:e,priority:t};for(var a=0;a<ro.length&&t!==0&&t<ro[a].priority;a++);ro.splice(a,0,e),a===0&&gb(e)}};var Ex=Ox.version;if(Ex!=="19.2.7")throw Error(k(527,Ex,"19.2.7"));ce.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=C0(t),e=e!==null?Hx(e):null,e=e===null?null:e.stateNode,e};var W1={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:V,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Vl=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Vl.isDisabled&&Vl.supportsFiber))try{In=Vl.inject(W1),Bt=Vl}catch{}var Vl;Ws.createRoot=function(e,t){if(!Bx(e))throw Error(k(299));var a=!1,o="",r=iv,l=fv,n=dv;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onUncaughtError!==void 0&&(r=t.onUncaughtError),t.onCaughtError!==void 0&&(l=t.onCaughtError),t.onRecoverableError!==void 0&&(n=t.onRecoverableError)),t=cb(e,1,!1,null,null,a,o,null,r,l,n,vb),e[il]=t.current,Kc(e),new ap(t)};Ws.hydrateRoot=function(e,t,a){if(!Bx(e))throw Error(k(299));var o=!1,r="",l=iv,n=fv,u=dv,s=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(r=a.identifierPrefix),a.onUncaughtError!==void 0&&(l=a.onUncaughtError),a.onCaughtError!==void 0&&(n=a.onCaughtError),a.onRecoverableError!==void 0&&(u=a.onRecoverableError),a.formState!==void 0&&(s=a.formState)),t=cb(e,1,!0,t,a??null,o,r,s,l,n,u,vb),t.context=pb(null),a=t.current,o=Ut(),o=fc(o),r=po(o),r.callback=null,mo(a,r,o),a=o,t.current.lanes=a,kn(t,a),va(t),e[il]=t.current,Kc(e),new js(t)};Ws.version="19.2.7"});var Sb=da((ZM,wb)=>{"use strict";function yb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yb)}catch(e){console.error(e)}}yb(),wb.exports=bb()});var Tb=da(Qs=>{"use strict";var m2=Symbol.for("react.transitional.element"),h2=Symbol.for("react.fragment");function Db(e,t,a){var o=null;if(a!==void 0&&(o=""+a),t.key!==void 0&&(o=""+t.key),"key"in t){a={};for(var r in t)r!=="key"&&(a[r]=t[r])}else a=t;return t=a.ref,{$$typeof:m2,type:e,key:o,ref:t!==void 0?t:null,props:a}}Qs.Fragment=h2;Qs.jsx=Db;Qs.jsxs=Db});var Ze=da((vT,Eb)=>{"use strict";Eb.exports=Tb()});var gm={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var vm=([e,t,a])=>{let o=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(r=>{o.setAttribute(r,String(t[r]))}),a?.length&&a.forEach(r=>{let l=vm(r);o.appendChild(l)}),o},Qi=(e,t={})=>{let a="svg",o={...gm,...t};return vm([a,o,e])};var Ji=[["rect",{width:"6",height:"10",x:"9",y:"7",rx:"2"}],["path",{d:"M4 22V2"}],["path",{d:"M20 22V2"}]];var du=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"M10 12h4"}]];var $i=[["path",{d:"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"}],["path",{d:"M22 9v7"}],["path",{d:"M3.304 13h6.392"}],["circle",{cx:"18.5",cy:"12.5",r:"3.5"}]];var ef=[["path",{d:"M20 6 9 17l-5-5"}]];var tf=[["path",{d:"m6 9 6 6 6-6"}]];var af=[["path",{d:"m9 18 6-6-6-6"}]];var of=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 18a6 6 0 0 0 0-12v12z"}]];var rf=[["path",{d:"m16 6 4 14"}],["path",{d:"M12 6v14"}],["path",{d:"M8 8v12"}],["path",{d:"M4 4v16"}]];var lf=[["path",{d:"M15 3h6v6"}],["path",{d:"m21 3-7 7"}],["path",{d:"m3 21 7-7"}],["path",{d:"M9 21H3v-6"}]];var nf=[["path",{d:"M12 2v20"}],["path",{d:"m15 19-3 3-3-3"}],["path",{d:"m19 9 3 3-3 3"}],["path",{d:"M2 12h20"}],["path",{d:"m5 9-3 3 3 3"}],["path",{d:"m9 5 3-3 3 3"}]];var uf=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var cu=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M21 9H3"}],["path",{d:"M21 15H3"}]];var sf=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var ff=[["path",{d:"M21 11a8 8 0 0 0-8-8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]];var df=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];function pf(e,t=8){let a=xL(e,t);return a?.length?a:gL(e,t)??[]}function xL(e,t){let a=bm(e,vL);if(!a)return null;let o=[],r=a,l;for(;r&&o.length<t;){if(r.tag!==5){let n=cf(r.type)??cf(r.elementType);n&&n!==l&&!wm(n,"react")&&(o.push({name:n,framework:"react"}),l=n)}r=r.return}return o}function gL(e,t){let a=bm(e,bL);if(!a)return null;let o=[],r=a,l;for(;r&&o.length<t;){let n=yL(r);n&&n!==l&&!wm(n,"vue")&&(o.push({name:n,framework:"vue"}),l=n),r=ym(r)?r.parent??null:r.$parent??null}return o}function bm(e,t){for(let a=e;a;a=a.parentElement){let o=t(a);if(o)return o}}function vL(e){let t=Object.getOwnPropertyNames(e).find(a=>a.startsWith("__reactFiber$")||a.startsWith("__reactInternalInstance$"));if(t)return e[t]}function bL(e){let t=e;return t.__vueParentComponent??t.__vue__??t.__vue_app__?._instance??void 0}function cf(e){if(typeof e=="function"){let t=e;return Ho(t.displayName||t.name)}if(e&&typeof e=="object"){let t=e;return Ho(t.displayName)??Ho(t.render?.displayName||t.render?.name)??(t.type?cf(t.type):void 0)}}function yL(e){let t=ym(e)?e.type:e.$options;return Ho(t?.displayName)??Ho(t?.name)??Ho(t?.__name)??wL(t?.__file)}function ym(e){return"type"in e||"parent"in e}function wL(e){if(!e)return;let t=e.split(/[\\/]/).pop()?.replace(/\.(vue|tsx?|jsx?)$/i,"");return Ho(t)}function Ho(e){let t=e?.trim();if(!(!t||t==="Anonymous"||t==="anonymous"))return t}function wm(e,t){return t==="react"?e==="Provider"||e==="Context"||e==="Fragment"||e.startsWith("_")||e.endsWith(".Provider")||e.endsWith(".Consumer"):e==="Transition"||e==="KeepAlive"||e==="Teleport"||e==="Suspense"}function SL(e){let t={};for(let a of Array.from(e.attributes))a.name.startsWith("data-")&&(t[a.name]=a.value);return t}function Sm(e){if(e.id)return`#${CSS.escape(e.id)}`;let t=e.getAttribute("data-testid");if(t)return`[data-testid="${LL(t)}"]`;let a=[],o=e,r=0;for(;o&&o.nodeType===1&&r<4&&o!==document.body;){let l=o.tagName.toLowerCase(),n=o.parentElement;if(n){let u=Array.from(n.children).filter(s=>s.tagName===o.tagName);u.length>1&&(l+=`:nth-of-type(${u.indexOf(o)+1})`)}a.unshift(l),o=o.parentElement,r++}return a.join(" > ")}function LL(e){return e.replace(/["\\]/g,"\\$&")}function Dl(e){let t=e.getBoundingClientRect();return{x:t.x,y:t.y,width:t.width,height:t.height}}function pu(e,t=document){let a=Array.from(t.querySelectorAll("*")),o=Math.max(1,e.width*e.height),r=null;for(let l of a){if(kL(l)||ML(l))continue;let n=l.getBoundingClientRect();if(n.width===0||n.height===0)continue;let u=DL(e,n);if(u<=0)continue;let s=n.width*n.height,i=u/s,d=u/o;if(i<.45&&d<.35)continue;let p=Math.min(s,o)/Math.max(s,o),x=d*140+i*45+p*25;d<.08&&(x-=30),(l.hasAttribute("data-slot")||l.hasAttribute("data-testid"))&&(x+=8),(IL(l.tagName)||RL(l.getAttribute("role")))&&(x+=8),CL(l.tagName)&&d>.2&&(x+=4),x+=Math.min(20,AL(l))*.1,(!r||x>r.score)&&(r={el:l,score:x})}return r?.el??null}function CL(e){return["BUTTON","A","INPUT","SELECT","TEXTAREA","LABEL","IMG","SVG"].includes(e)}function IL(e){return["ARTICLE","ASIDE","DIALOG","FIELDSET","FORM","HEADER","MAIN","NAV","SECTION"].includes(e)}function RL(e){return e!==null&&["dialog","form","main","menu","navigation","region","tabpanel"].includes(e)}function kL(e){return e===document.documentElement||e===document.body}function AL(e){let t=0;for(let a=e.parentElement;a;a=a.parentElement)t++;return t}function ML(e){return e.closest("[data-loupe-overlay]")!==null}function DL(e,t){let a=Math.max(0,Math.min(e.x+e.width,t.x+t.width)-Math.max(e.x,t.x)),o=Math.max(0,Math.min(e.y+e.height,t.y+t.height)-Math.max(e.y,t.y));return a*o}function Tl(e){let t=(e.textContent??"").replace(/\s+/g," ").trim().slice(0,200);return{tag:e.tagName.toLowerCase(),selector:Sm(e),text:t,dataAttributes:SL(e),className:typeof e.className=="string"?e.className:"",componentChain:pf(e)}}function El(e){let t=getComputedStyle(e),a=[],o=["paddingTop","paddingRight","paddingBottom","paddingLeft"].map(i=>parseFloat(t[i])||0);o.some(i=>i>0&&i%4!==0)?a.push({kind:"padding",label:"fix padding",detail:`padding ${o.map(i=>`${i}px`).join(" ")} isn't on the 4px grid`}):(Lm(o[0],o[2])||Lm(o[1],o[3]))&&a.push({kind:"padding",label:"fix padding",detail:`padding looks asymmetric (${o.map(i=>`${i}px`).join(" ")})`});let r=parseFloat(t.gap)||0;r>0&&r%4!==0&&a.push({kind:"spacing",label:"fix spacing",detail:`gap ${r}px isn't on the 4px grid`});let l=parseFloat(t.fontSize)||0,n=parseFloat(t.lineHeight)||0;if(l>0&&l%1!==0)a.push({kind:"typography",label:"fix typography",detail:`font-size ${l}px is fractional`});else if(n>0&&l>0){let i=n/l;(i<1.1||i>2)&&a.push({kind:"typography",label:"fix typography",detail:`line-height ratio ${i.toFixed(2)} looks off for ${l}px text`})}let u=parseFloat(t.borderTopLeftRadius)||0;u>0&&u%2!==0&&u!==9999&&a.push({kind:"radius",label:"fix radius",detail:`border-radius ${u}px is unusual`});let s=OL(t.color,EL(e));return s!==null&&s<4.5&&a.push({kind:"contrast",label:"fix contrast",detail:`text/background contrast ~${s.toFixed(1)}:1 (below 4.5:1)`}),a.push({kind:"alignment",label:"fix alignment",detail:"alignment within the layout looks off"}),a.push({kind:"size",label:"fix size",detail:"the element's size/proportions look off"}),TL(a)}function Lm(e,t){return Math.abs(e-t)>1&&(e>0||t>0)}function TL(e){let t=new Set;return e.filter(a=>t.has(a.kind)?!1:(t.add(a.kind),!0))}function EL(e){let t=e;for(;t;){let a=getComputedStyle(t).backgroundColor,o=mf(a);if(o&&o.a>0)return a;t=t.parentElement}return"rgb(255, 255, 255)"}function mf(e){let t=e.match(/rgba?\(([^)]+)\)/);if(!t)return null;let a=t[1].split(",").map(o=>parseFloat(o.trim()));return{r:a[0]??0,g:a[1]??0,b:a[2]??0,a:a[3]??1}}function Cm({r:e,g:t,b:a}){let o=r=>{let l=r/255;return l<=.03928?l/12.92:Math.pow((l+.055)/1.055,2.4)};return .2126*o(e)+.7152*o(t)+.0722*o(a)}function OL(e,t){let a=mf(e),o=mf(t);if(!a||!o)return null;let r=Cm(a),l=Cm(o),[n,u]=r>l?[r,l]:[l,r];return(n+.05)/(u+.05)}var BL='<svg xmlns="http://www.w3.org/2000/svg" width="256" height="257" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/></svg>',PL='<svg xmlns="http://www.w3.org/2000/svg" width="256" height="260" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="#fff" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>',UL="#d97757",HL="https://github.com/woddlepad/loupe",NL='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>',zL=":host{all:initial;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif}",H={layer:"fixed inset-0 z-[2147483646] cursor-crosshair",dim:"fixed inset-0 bg-black/25 loupe-animate-fade",marquee:"fixed rounded-[4px] border border-loupe-accent/80 bg-loupe-accent/10 shadow-[0_0_0_1px_rgba(0,0,0,0.35)] pointer-events-none",inspectBox:"fixed rounded-[4px] border border-loupe-accent/90 bg-loupe-accent/10 shadow-[0_0_0_1px_rgba(0,0,0,0.35)] pointer-events-none",inspectLabel:"fixed max-w-[min(360px,calc(100vw-24px))] truncate rounded-md bg-loupe-fg px-2 py-1 text-[11px] font-semibold leading-none text-loupe-bg shadow-lg shadow-black/30 ring-1 ring-black/20 pointer-events-none",hint:"fixed left-1/2 top-3 -translate-x-1/2 rounded-loupe bg-loupe-bg/95 border border-loupe-line text-loupe-fg text-[12px] px-3 py-1.5 shadow-2xl shadow-black/50",panel:"fixed w-[340px] rounded-loupe bg-loupe-panel/95 border border-loupe-line text-loupe-fg shadow-2xl shadow-black/50 p-3 text-[13px] loupe-animate-panel",close:"absolute right-2 top-2 w-7 h-7 grid place-items-center rounded-md text-loupe-muted hover:text-loupe-fg hover:bg-white/5 cursor-pointer transition-colors",title:"text-[13px] font-semibold leading-tight",crumbs:"text-[11px] text-loupe-muted mt-1 break-words leading-snug",chips:"flex flex-wrap gap-1.5 mt-2.5",chip:"inline-flex items-center gap-1.5 rounded-full border border-loupe-line bg-loupe-elev/50 text-loupe-muted text-[12px] px-2.5 py-1 cursor-pointer select-none transition-colors hover:bg-loupe-elev data-[on=true]:bg-loupe-accent/15 data-[on=true]:border-loupe-accent/40 data-[on=true]:text-loupe-fg",textarea:"mt-2.5 w-full box-border min-h-[64px] resize-y rounded-lg bg-loupe-bg/80 border border-loupe-line text-loupe-fg text-[13px] p-2 outline-none transition-colors focus:border-loupe-accent/60 placeholder:text-loupe-faint",groupCombo:"relative mt-2",groupComboButton:"flex h-8 w-full box-border items-center justify-between gap-2 rounded-lg bg-loupe-bg/80 border border-loupe-line px-2 text-left text-[12px] text-loupe-fg transition-colors hover:bg-loupe-elev focus:outline-none focus:border-loupe-accent/60 cursor-pointer",groupComboPlaceholder:"text-loupe-faint",groupComboPopover:"absolute left-0 right-0 top-[calc(100%+4px)] z-[1] overflow-hidden rounded-lg border border-loupe-line bg-loupe-panel shadow-2xl shadow-black/50",groupComboSearchWrap:"p-1.5 border-b border-loupe-line",groupComboSearch:"w-full box-border rounded-md bg-loupe-bg/80 border border-loupe-line text-loupe-fg text-[12px] px-2 py-1.5 outline-none transition-colors focus:border-loupe-accent/60 placeholder:text-loupe-faint",groupComboMenu:"max-h-40 overflow-y-auto p-1",groupComboItem:"w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] text-loupe-muted hover:bg-white/5 hover:text-loupe-fg cursor-pointer",groupComboCheck:"ml-auto text-loupe-fg opacity-0",groupComboCheckSelected:"ml-auto text-loupe-fg opacity-100",groupComboCreate:"w-full rounded-md border-t border-loupe-line px-2 py-1.5 text-left text-[12px] text-loupe-fg hover:bg-white/5 cursor-pointer",refsRow:"flex items-center gap-1.5 mt-2 flex-wrap",refThumb:"relative w-12 h-12 rounded-md border border-loupe-line overflow-hidden group/ref bg-loupe-bg",refImg:"w-full h-full object-cover",refRemove:"absolute top-0.5 right-0.5 w-4 h-4 grid place-items-center rounded bg-black/70 text-white text-[10px] leading-none opacity-0 group-hover/ref:opacity-100 cursor-pointer",addRef:"w-12 h-12 rounded-md border border-dashed border-loupe-line-strong text-loupe-faint hover:text-loupe-fg hover:border-loupe-accent/50 grid place-items-center text-[18px] cursor-pointer transition-colors",libBtn:"h-12 px-2.5 inline-flex items-center gap-1.5 rounded-md border border-dashed border-loupe-line-strong text-loupe-faint hover:text-loupe-fg hover:border-loupe-accent/50 text-[11px] cursor-pointer transition-colors",pickerWrap:"basis-full relative mt-1",picker:"rounded-lg bg-loupe-panel border border-loupe-line max-h-72 overflow-hidden shadow-2xl shadow-black/50",pickerSearch:"w-full box-border rounded-md bg-loupe-bg/80 border border-loupe-line text-loupe-fg text-[12px] px-2 py-1.5 outline-none transition-colors focus:border-loupe-accent/60 placeholder:text-loupe-faint",pickerList:"max-h-56 overflow-y-auto p-2 space-y-2",pickerGroupButton:"w-full flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11px] font-medium text-loupe-muted hover:bg-white/5 hover:text-loupe-fg cursor-pointer",pickerGroupCount:"ml-auto text-loupe-faint",pickerGrid:"grid grid-cols-2 gap-2 pt-1",pickCell:"overflow-hidden rounded-lg border border-loupe-line bg-loupe-bg/70 text-left hover:border-loupe-accent/50 cursor-pointer p-0 transition-colors",pickImgWrap:"aspect-[16/9] border-b border-loupe-line bg-black/40",pickText:"p-2 text-[11px] text-loupe-fg leading-snug line-clamp-2",actions:"flex flex-col gap-1.5 mt-2.5",error:"hidden mt-2.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-2 text-[12px] leading-snug text-loupe-fg whitespace-pre-line",primary:"w-full inline-flex items-center justify-center gap-2 rounded-lg bg-loupe-fg hover:bg-white text-loupe-bg font-semibold text-[13px] px-3 py-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-default",secondary:"w-full inline-flex items-center justify-center gap-2 rounded-lg bg-loupe-bg hover:bg-loupe-elev border border-loupe-line text-loupe-fg text-[13px] px-3 py-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-default",footer:"flex items-center mt-2",cancel:"text-loupe-muted hover:text-loupe-fg text-[12px] px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer transition-colors",brandViewport:"fixed bottom-3 left-1/2 z-[2147483647] flex -translate-x-1/2 items-center gap-3 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] pointer-events-auto",brandPanel:"mt-3 flex items-center justify-between gap-3 border-t border-loupe-line pt-2.5 text-loupe-muted",brandText:"inline-flex items-center gap-1.5 text-[11px] font-medium",brandMark:"grid h-5 w-5 place-items-center rounded-full border border-current text-current",github:"inline-flex h-7 items-center gap-1.5 rounded-md border border-current bg-transparent px-2 text-[11px] font-semibold text-current transition-colors hover:text-loupe-fg focus:outline-none focus:ring-1 focus:ring-loupe-accent/70 cursor-pointer",code:"text-loupe-fg/90 font-mono"},Lr=class{opts;host=null;root=null;phase="off";start={x:0,y:0};current={x:0,y:0,width:0,height:0};accepted=new Set;offered=[];refs=[];currentRefsRow=null;currentFileAnchor=null;renderNonce=0;hoveredEl=null;mouseDownEl=null;hoverCaptureNonce=0;draft;suppressNextClick=!1;cursorStyle=null;constructor(t){this.opts={actions:[{id:"save",label:"Save to repo"}],groups:[],defaultGroup:"",createGroup:async()=>{},stylesheet:"",mode:"annotate",library:[],resolveLibraryImage:async()=>null,generateId:QL,captureTarget:Tl,draft:null,onDraftChange:()=>{},...t},this.draft=this.opts.draft,(!this.opts.actions||this.opts.actions.length===0)&&(this.opts.actions=[{id:"save",label:"Save to repo"}])}get active(){return this.phase!=="off"}setChromeVisible(t){this.host&&(this.host.style.display=t?"":"none")}get selection(){return{rect:{...this.current},devicePixelRatio:window.devicePixelRatio||1}}toggle(){this.active?this.disable():this.enable()}enable(){this.active||(this.mount(),this.bindKeys(),!this.tryRestoreDraft()&&this.arm())}disable(){this.phase="off",this.renderNonce++,this.accepted.clear(),this.offered=[],this.currentRefsRow=null,this.currentFileAnchor=null,this.hoveredEl=null,this.mouseDownEl=null,this.hoverCaptureNonce++,this.draft=null,this.opts.onDraftChange(null),this.setInspectCursor(!1),this.unbindKeys(),this.unmount()}destroy(){this.disable()}mount(){if(this.host)return;let t=document.createElement("div");t.setAttribute("data-loupe-overlay","");let a=t.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=zL+`
`+this.opts.stylesheet,a.append(o),JL(t),document.body.append(t),this.host=t,this.root=a}unmount(){this.host?.remove(),this.host=null,this.root=null}clearLayer(){if(this.currentRefsRow=null,this.currentFileAnchor=null,!!this.root)for(let t of Array.from(this.root.children))t.tagName!=="STYLE"&&t.remove()}arm(){this.phase="armed",this.setInspectCursor(!0),this.renderArmed()}renderArmed(){if(this.clearLayer(),!this.root)return;let t=P("div",{class:H.layer});t.style.pointerEvents="none";let a=P("div",{class:H.inspectBox,"data-loupe-inspect-box":""}),o=P("div",{class:H.inspectLabel,"data-loupe-inspect-label":""});a.style.display="none",o.style.display="none";let r=P("div",{class:H.hint}),l=P("b",{class:"text-loupe-fg font-semibold"},"Esc");r.append("click an element or drag a region \xB7 ",l," to cancel"),t.append(a,o,r,hf("viewport")),t.addEventListener("mousemove",this.onArmedMouseMove),t.addEventListener("mousedown",this.onMouseDown),this.root.append(t)}onArmedMouseDown=t=>{this.phase!=="armed"||this.eventInOverlay(t)||this.onMouseDown(t)};onArmedMouseMoveMaster=t=>{this.phase!=="armed"||this.eventInOverlay(t)||this.onArmedMouseMove(t)};onMouseDown=t=>{t.button===0&&(t.preventDefault(),t.stopImmediatePropagation(),this.mouseDownEl=this.elementAt(t.clientX,t.clientY)??this.hoveredEl,this.phase="dragging",this.setInspectCursor(!0),this.start={x:t.clientX,y:t.clientY},this.current={x:t.clientX,y:t.clientY,width:0,height:0},window.addEventListener("mousemove",this.onMouseMove,!0),window.addEventListener("mouseup",this.onMouseUp,!0),this.renderDragging())};onMouseMove=t=>{t.preventDefault(),t.stopImmediatePropagation();let a=Math.min(this.start.x,t.clientX),o=Math.min(this.start.y,t.clientY);this.current={x:a,y:o,width:Math.abs(t.clientX-this.start.x),height:Math.abs(t.clientY-this.start.y)},this.updateMarquee()};onMouseUp=t=>{if(t.preventDefault(),t.stopImmediatePropagation(),window.removeEventListener("mousemove",this.onMouseMove,!0),window.removeEventListener("mouseup",this.onMouseUp,!0),this.current.width<6||this.current.height<6){let a=this.elementAt(t.clientX,t.clientY)??this.mouseDownEl;if(this.mouseDownEl=null,a){this.current=Dl(a),this.suppressNextClick=!0,window.addEventListener("click",this.onSuppressClick,!0),this.enterEditingForElement(a);return}this.phase="armed",this.renderArmed();return}this.mouseDownEl=null,this.suppressNextClick=!0,window.addEventListener("click",this.onSuppressClick,!0),this.enterEditing()};onSuppressClick=t=>{this.suppressNextClick&&(this.suppressNextClick=!1,window.removeEventListener("click",this.onSuppressClick,!0),t.preventDefault(),t.stopImmediatePropagation())};onArmedMouseMove=t=>{if(this.phase!=="armed")return;let a=this.elementAt(t.clientX,t.clientY);if(a===this.hoveredEl)return;this.hoveredEl=a;let o=++this.hoverCaptureNonce,r=this.root?.querySelector("[data-loupe-inspect-box]"),l=this.root?.querySelector("[data-loupe-inspect-label]");if(!a||!r||!l){this.updateInspectHighlight(null);return}this.updateInspectHighlight({rect:Dl(a),label:this.elementLabel(a)}),Promise.resolve(this.opts.captureTarget(a)).then(n=>{o!==this.hoverCaptureNonce||this.phase!=="armed"||this.hoveredEl!==a||this.updateInspectHighlight({rect:Dl(a),label:YL(n)})}).catch(()=>{})};elementAt(t,a){return this.withHostHidden(()=>{let o=document.elementFromPoint(t,a);return!o||o===document.documentElement||o===document.body||o.closest("[data-loupe-overlay]")?null:o})}elementLabel(t){let a=t.tagName.toLowerCase();return a?`<${a}>`:"element"}updateInspectHighlight(t){let a=this.root?.querySelector("[data-loupe-inspect-box]"),o=this.root?.querySelector("[data-loupe-inspect-label]");if(!a||!o)return;if(!t||t.rect.width<=0||t.rect.height<=0){a.style.display="none",o.style.display="none";return}let{rect:r}=t;Object.assign(a.style,{display:"",left:`${r.x}px`,top:`${r.y}px`,width:`${r.width}px`,height:`${r.height}px`}),o.textContent=t.label,o.style.display="",o.style.left=`${Math.max(8,r.x)}px`,o.style.top=`${ZL(r)}px`;let l=o.getBoundingClientRect().width;o.style.left=`${Math.min(Math.max(8,r.x),window.innerWidth-l-8)}px`}renderDragging(){if(this.clearLayer(),!this.root)return;let t=P("div",{class:H.layer});t.style.pointerEvents="none",t.append(P("div",{class:H.dim})),t.append(P("div",{class:H.marquee,"data-marquee":""})),t.append(hf("viewport")),this.root.append(t),this.updateMarquee()}updateMarquee(){let t=this.root?.querySelector("[data-marquee]");t&&(t.style.left=`${this.current.x}px`,t.style.top=`${this.current.y}px`,t.style.width=`${this.current.width}px`,t.style.height=`${this.current.height}px`)}enterEditing(){this.phase="editing",this.setInspectCursor(!1);let t=this.withHostHidden(()=>pu(this.current));if(!t){this.phase="armed",this.renderArmed();return}this.accepted.clear(),this.refs=[],this.offered=this.withHostHidden(()=>El(t)),this.reportDraft(),this.renderEditing(t,++this.renderNonce)}enterEditingForElement(t){this.phase="editing",this.setInspectCursor(!1),this.hoveredEl=null,this.hoverCaptureNonce++,this.accepted.clear(),this.refs=[],this.offered=this.withHostHidden(()=>El(t)),this.reportDraft(),this.renderEditing(t,++this.renderNonce)}tryRestoreDraft(){if(!this.draft||this.draft.mode!==this.opts.mode)return!1;this.phase="editing",this.current={...this.draft.rect},this.accepted=new Set(this.draft.acceptedKinds),this.refs=this.draft.references.map(a=>({dataUrl:a.dataUrl}));let t=this.withHostHidden(()=>pu(this.current));return t?(this.offered=this.withHostHidden(()=>El(t)),this.renderEditing(t,++this.renderNonce),!0):(this.arm(),!0)}withHostHidden(t){let a=this.host?.style.display??"";this.host&&(this.host.style.display="none");try{return t()}finally{this.host&&(this.host.style.display=a)}}setInspectCursor(t){if(!t){this.cursorStyle?.remove(),this.cursorStyle=null,document.documentElement.removeAttribute("data-loupe-inspecting");return}if(this.cursorStyle)return;let a=document.createElement("style");a.setAttribute("data-loupe-cursor",""),a.textContent="html[data-loupe-inspecting], html[data-loupe-inspecting] * { cursor: crosshair !important; }",document.documentElement.setAttribute("data-loupe-inspecting",""),document.head.append(a),this.cursorStyle=a}async renderEditing(t,a){let o=await this.opts.captureTarget(t);if(a!==this.renderNonce||this.phase!=="editing"||(this.clearLayer(),!this.root))return;let r=P("div",{class:H.layer});r.style.cursor="default",r.append(P("div",{class:H.dim}));let l=P("div",{class:H.marquee});Object.assign(l.style,{left:`${this.current.x}px`,top:`${this.current.y}px`,width:`${this.current.width}px`,height:`${this.current.height}px`}),r.append(l);let n=this.opts.mode==="reference",u=P("div",{class:H.panel});Am(u,this.current);let s=P("button",{class:H.close,type:"button",title:"cancel"});Ol(s,df,"",15),s.addEventListener("click",()=>{this.draft=null,this.opts.onDraftChange(null),this.arm()}),u.append(s);let i=P("div",{class:H.title});i.textContent=n?document.title||location.host:Tm(o.componentChain.map(m=>m.name),o.tag),u.append(i);let d=P("div",{class:H.crumbs});if(n?d.textContent=`reference \xB7 ${location.host}`:KL(d,o),u.append(d),!n){let m=P("div",{class:H.chips});for(let g of this.offered){let S=P("button",{class:H.chip,type:"button","data-on":this.accepted.has(g.kind)?"true":"false"});Ol(S,qL(g.kind),g.label,12),S.title=g.detail,S.addEventListener("click",()=>{let I=S.getAttribute("data-on")==="true";S.setAttribute("data-on",I?"false":"true"),I?this.accepted.delete(g.kind):this.accepted.add(g.kind),this.reportDraft()}),m.append(S)}u.append(m)}let p=P("textarea",{class:H.textarea});p.placeholder=n?"what this shows / what to match\u2026":"what's wrong / what to change\u2026",p.value=this.draft?.note??"",p.addEventListener("input",()=>this.reportDraft()),u.append(p);let x=P("div",{class:H.refsRow});if(!n){u.append(this.renderGroupCombobox());let m=P("input",{type:"file",accept:"image/*"});m.style.display="none",m.multiple=!0,m.addEventListener("change",async()=>{for(let S of Array.from(m.files??[]))await this.addRef(S,x,m);m.value=""});let g=P("button",{class:H.addRef,type:"button",title:"add reference image (or paste)"});Ol(g,uf,"",16),g.addEventListener("click",()=>m.click()),x.append(g,m);for(let S of this.refs)this.renderRefThumb(S,x,m);if(this.opts.library.length>0){let S=P("button",{class:H.libBtn,type:"button"});Ol(S,rf,"from library",13),S.addEventListener("click",()=>this.openLibraryPicker(x,m)),x.append(S)}u.append(x),this.currentRefsRow=x,this.currentFileAnchor=m}let h=P("div",{class:H.error,"data-loupe-error":""}),b=async(m,g)=>{if(g.disabled)return;let S=Array.from(u.querySelectorAll("button"));S.forEach(L=>L.disabled=!0),h.textContent="",h.classList.add("hidden");let I=g.dataset.loupeLabel??g.textContent??"";Rm(g,"sending\u2026");let C=this.buildAnnotation(o);try{await this.opts.onSubmit(C,[m]),this.disable()}catch(L){S.forEach(R=>R.disabled=!1),Rm(g,I||"retry"),h.textContent=L instanceof Error?L.message:String(L),h.classList.remove("hidden"),console.error("[loupe] action failed",L)}},v=n?[{id:"reference",label:"Save to library",hint:"save this capture as a reference"}]:jL(this.opts.actions,"save"),y=P("div",{class:H.actions}),c=null,f=n?"reference":"save";v.forEach((m,g)=>{let S=P("button",{class:m.id===f?H.primary:H.secondary,type:"button"});Ol(S,VL(m),XL(m),14),m.hint&&(S.title=m.hint),S.addEventListener("click",()=>void b(m.id,S)),m.id===f&&(c=S),y.append(S)}),u.append(h),u.append(y),u.append(hf("panel")),u.addEventListener("keydown",m=>{m.key!=="Enter"||m.shiftKey||m.metaKey||m.ctrlKey||m.altKey||m.isComposing||!(m.target instanceof HTMLTextAreaElement||m.target instanceof HTMLInputElement)||c&&(m.preventDefault(),b(f,c))}),r.append(u),this.root.append(r),Am(u,this.current),this.reportDraft(),setTimeout(()=>p.focus(),0)}async addRef(t,a,o){t.type.startsWith("image/")&&this.addRefDataUrl(await $L(t),a,o)}addRefDataUrl(t,a,o){let r={dataUrl:t};this.refs.push(r),this.renderRefThumb(r,a,o),this.reportDraft()}renderRefThumb(t,a,o){let r=P("div",{class:H.refThumb}),l=P("img",{class:H.refImg,src:t.dataUrl}),n=P("button",{class:H.refRemove,type:"button"},"\u2715");n.addEventListener("click",()=>{this.refs=this.refs.filter(u=>u!==t),r.remove(),this.reportDraft()}),r.append(l,n),a.insertBefore(r,o)}renderGroupCombobox(){let t=P("div",{class:H.groupCombo}),a=P("input",{id:"loupe-group",type:"hidden"});a.value=this.draft?.group??this.opts.defaultGroup;let o=P("button",{class:H.groupComboButton,type:"button",role:"combobox","aria-expanded":"false","aria-haspopup":"listbox","aria-controls":"loupe-group-listbox",title:"Select group"}),r=P("span",{"data-loupe-combo-label":""}),l=()=>{let y=a.value.trim();r.textContent=y||"Select a group",r.className=y?"":H.groupComboPlaceholder};o.append(r,No(tf,14));let n=P("div",{class:H.groupComboPopover});n.style.display="none";let u=P("div",{class:H.groupComboSearchWrap}),s=P("input",{class:H.groupComboSearch,type:"search",placeholder:"Search groups",autocomplete:"off"}),i=P("div",{class:H.groupComboMenu,id:"loupe-group-listbox",role:"listbox"});u.append(s),n.append(u,i);let d=()=>[...new Set(this.opts.groups.map(y=>y.trim()).filter(Boolean))].sort((y,c)=>y.localeCompare(c)),p=()=>{n.style.display="none",o.setAttribute("aria-expanded","false")},x=()=>{s.value="",v(),n.style.display="",o.setAttribute("aria-expanded","true"),s.focus()},h=y=>{a.value=y,l(),p(),this.reportDraft(),o.focus()},b=async()=>{let y=s.value.trim();y&&(d().some(c=>c.toLowerCase()===y.toLowerCase())||(await this.opts.createGroup(y),this.opts.groups=[...d(),y]),h(y))},v=()=>{let y=s.value.toLowerCase().trim(),c=a.value.trim(),f=d().filter(g=>g.toLowerCase().includes(y));i.replaceChildren();for(let g of f){let S=P("button",{class:H.groupComboItem,type:"button",role:"option","aria-selected":g===c?"true":"false"}),I=No(ef,13);I.setAttribute("class",g===c?H.groupComboCheckSelected:H.groupComboCheck),S.append(P("span",{},g),I),S.addEventListener("mousedown",C=>C.preventDefault()),S.addEventListener("click",()=>h(g)),i.append(S)}let m=d().some(g=>g.toLowerCase()===s.value.trim().toLowerCase());if(s.value.trim()&&!m){let g=P("button",{class:H.groupComboCreate,type:"button"},`Create "${s.value.trim()}"`);g.addEventListener("mousedown",S=>S.preventDefault()),g.addEventListener("click",()=>void b()),i.append(g)}i.childNodes.length===0&&i.append(P("div",{class:"px-2 py-1.5 text-[12px] text-loupe-faint"},"No groups"))};return o.addEventListener("click",()=>{n.style.display==="none"?x():p()}),s.addEventListener("input",v),s.addEventListener("keydown",y=>{y.key==="Enter"&&(y.preventDefault(),y.stopPropagation(),b()),y.key==="Escape"&&(y.preventDefault(),y.stopPropagation(),p(),o.focus())}),s.addEventListener("blur",()=>setTimeout(p,120)),n.addEventListener("mousedown",y=>y.preventDefault()),l(),o.addEventListener("keydown",y=>{y.key!=="ArrowDown"&&y.key!=="Enter"&&y.key!==" "||(y.preventDefault(),x())}),t.append(a,o,n),t}openLibraryPicker(t,a){let o=this.root?.querySelector("[data-loupe-picker]");if(o){o.remove();return}let r=P("div",{class:H.pickerWrap,"data-loupe-picker":""}),l=P("div",{class:H.picker}),n=P("div",{class:"p-2 border-b border-loupe-line"}),u=P("input",{class:H.pickerSearch,type:"search",placeholder:"Search library"});n.append(u);let s=P("div",{class:H.pickerList}),i=new Set,d=()=>{s.replaceChildren();let p=FL(this.opts.library,u.value);if(this.opts.library.length===0){s.append(P("div",{class:"p-3 text-loupe-faint text-[12px] text-center"},"no references in the library yet"));return}if(p.length===0){s.append(P("div",{class:"p-3 text-loupe-faint text-[12px] text-center"},"no matches"));return}for(let[x,h]of p){let b=P("section"),v=P("button",{class:H.pickerGroupButton,type:"button"}),y=No(af,13),c=i.has(x);if(y.style.transform=c?"":"rotate(90deg)",y.style.transition="transform 150ms ease",v.append(y,P("span",{},x),P("span",{class:H.pickerGroupCount},String(h.length))),v.addEventListener("click",()=>{i.has(x)?i.delete(x):i.add(x),d()}),b.append(v),!c){let f=P("div",{class:H.pickerGrid});for(let m of h){let g=P("button",{class:H.pickCell,type:"button",title:m.caption}),S=P("div",{class:H.pickImgWrap});S.append(P("img",{class:H.refImg,src:m.thumbUrl,alt:""})),g.append(S,P("div",{class:H.pickText},m.caption||m.url||m.id)),g.addEventListener("click",async()=>{r.remove();let I=await this.opts.resolveLibraryImage(m.id);I&&this.addRefDataUrl(I,t,a)}),f.append(g)}b.append(f)}s.append(b)}};u.addEventListener("input",d),l.append(n,s),r.append(l),t.append(r),d(),u.focus()}buildAnnotation(t){let a=this.root?.querySelector("#loupe-group")?.value.trim()??"";return{id:this.opts.generateId(),url:location.href,title:document.title,rect:{...this.current},devicePixelRatio:window.devicePixelRatio||1,scroll:{x:window.scrollX,y:window.scrollY},target:t,acceptedSuggestions:this.offered.filter(o=>this.accepted.has(o.kind)),note:this.root?.querySelector("textarea")?.value.trim()??"",references:this.refs.map(o=>({dataUrl:o.dataUrl})),createdAt:Mm(),group:a||void 0,status:"open"}}reportDraft(){if(this.phase!=="editing")return;let t=this.root?.querySelector("textarea")?.value.trim()??this.draft?.note??"",a=this.root?.querySelector("#loupe-group")?.value.trim()??this.draft?.group??"";this.draft={mode:this.opts.mode,url:location.href,title:document.title,rect:{...this.current},devicePixelRatio:window.devicePixelRatio||1,scroll:{x:window.scrollX,y:window.scrollY},note:t,group:a||void 0,acceptedKinds:[...this.accepted],references:this.refs.map(o=>({dataUrl:o.dataUrl})),updatedAt:Mm()},this.opts.onDraftChange(this.draft)}bindKeys(){window.addEventListener("keydown",this.onKeyMaster,!0),window.addEventListener("mousemove",this.onArmedMouseMoveMaster,!0),window.addEventListener("mousedown",this.onArmedMouseDown,!0);for(let t of Im)window.addEventListener(t,this.onEventMaster,!0)}unbindKeys(){window.removeEventListener("keydown",this.onKeyMaster,!0),window.removeEventListener("mousemove",this.onArmedMouseMoveMaster,!0),window.removeEventListener("mousedown",this.onArmedMouseDown,!0),window.removeEventListener("mousemove",this.onMouseMove,!0),window.removeEventListener("mouseup",this.onMouseUp,!0),window.removeEventListener("click",this.onSuppressClick,!0);for(let t of Im)window.removeEventListener(t,this.onEventMaster,!0)}eventInOverlay(t){return this.host!==null&&t.composedPath().includes(this.host)}onKeyMaster=t=>{if(t.key==="Escape"&&this.active){t.preventDefault(),t.stopImmediatePropagation(),this.disable();return}this.eventInOverlay(t)&&t.stopImmediatePropagation()};onEventMaster=t=>{this.eventInOverlay(t)&&(t.stopImmediatePropagation(),t.type==="paste"&&this.handlePaste(t))};handlePaste(t){let a=Array.from(t.clipboardData?.items??[]).filter(o=>o.type.startsWith("image/"));if(!(a.length===0||!this.currentRefsRow||!this.currentFileAnchor)){t.preventDefault();for(let o of a){let r=o.getAsFile();r&&this.addRef(r,this.currentRefsRow,this.currentFileAnchor)}}}},Im=["keyup","keypress","paste","copy","cut"];function P(e,t={},a){let o=document.createElement(e);for(let[r,l]of Object.entries(t))o.setAttribute(r,l);return a!==void 0&&(o.textContent=a),o}function hf(e){let t=P("div",{class:e==="viewport"?H.brandViewport:H.brandPanel}),a=P("div",{class:H.brandText}),o=P("span",{class:H.brandMark});o.append(No(sf,12)),a.append(o,P("span",{},"Powered by Loupe"));let r=P("button",{class:H.github,type:"button",title:"Open Loupe on GitHub"});return r.append(Dm(NL,14),P("span",{},"GitHub")),r.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),window.open(HL,"_blank","noopener,noreferrer")}),t.append(a,r),t}function Ol(e,t,a,o=14){e.dataset.loupeLabel=a;let r=[];if(t&&r.push(Array.isArray(t)?No(t,o):t),a){let l=P("span",{"data-loupe-label":""},a);r.push(l)}e.replaceChildren(...r)}function Rm(e,t){e.dataset.loupeLabel=t;let a=e.querySelector("[data-loupe-label]");a?a.textContent=t:e.textContent=t}function No(e,t){let a=Qi(e,{width:String(t),height:String(t),"aria-hidden":"true",focusable:"false","stroke-width":"2.2"});return a.style.flexShrink="0",a}function qL(e){switch(e){case"padding":return cu;case"spacing":return Ji;case"typography":return $i;case"alignment":return nf;case"contrast":return of;case"radius":return ff;case"size":return lf}}function FL(e,t){let a=xf(t),o=new Map;for(let r of e){let l=GL(r),n=xf(l).includes(a),u=_L(r,a);a&&!n&&!u||(o.get(l)??o.set(l,[]).get(l)).push(r)}return[...o.entries()].sort(([r],[l])=>r.localeCompare(l))}function _L(e,t){return t?[e.caption,e.url,e.id].some(a=>xf(a).includes(t)):!0}function GL(e){if(!e.url)return"Unknown";try{return new URL(e.url).hostname.replace(/^www\./,"")||"Unknown"}catch{return"Unknown"}}function xf(e){return(e??"").toLowerCase().trim()}function km(e,t){return Dm(e,t)??No(du,t)}function Dm(e,t){let o=new DOMParser().parseFromString(e.trim(),"image/svg+xml").documentElement;return o?(o.setAttribute("width",String(t)),o.setAttribute("height",String(t)),o.setAttribute("aria-hidden","true"),o.setAttribute("focusable","false"),o.style.flexShrink="0",o):No(du,t)}function VL(e){let t=e.id.toLowerCase(),a=e.label.toLowerCase();if(t==="save"||t==="reference"||a.includes("save"))return null;if(t.includes("claude")||a.includes("claude")){let o=km(BL,15);return o.style.color=UL,o}return t.includes("openai")||t.includes("codex")||a.includes("openai")||a.includes("codex")?km(PL,15):null}function XL(e){let t=e.label.replace(/^\s*(?:→|->|➜|›|»)\s*/,"").trim();return WL(t||e.id)}function jL(e,t){let a=e.find(r=>r.id===t),o=e.filter(r=>r.id!==t);return a?[...o,a]:o}function WL(e){let t=e.search(/[A-Za-z]/);return t<0?e:e.slice(0,t)+e[t].toUpperCase()+e.slice(t+1)}function Am(e,t){let r=Math.max(160,window.innerHeight-24);e.style.maxHeight=`${r}px`,e.style.overflowY="auto";let l=t.x+t.width+12;l+340>window.innerWidth&&(l=Math.max(12,t.x-340-12));let n=t.y,u=e.offsetHeight||300;n+u+12>window.innerHeight&&(n=Math.max(12,window.innerHeight-u-12)),e.style.left=`${l}px`,e.style.top=`${n}px`}function ZL(e){return e.y>=30?e.y-22-4:Math.min(window.innerHeight-22-8,e.y+e.height+4)}function YL(e){return Tm(e.componentChain.map(t=>t.name),e.tag)}function Tm(e,t){return e.length===0?`<${t}>`:e.slice(0,2).reverse().join(" \u203A ")}function KL(e,t){let a=!1,o=()=>{a&&e.append(" \xB7 "),a=!0};t.componentChain.length&&(o(),t.componentChain.forEach((l,n)=>{n>0&&e.append(" \u203A "),e.append(P("code",{class:H.code},l.name))}));let r=t.dataAttributes["data-slot"];r&&(o(),e.append("data-slot=",P("code",{class:H.code},r))),t.text&&(o(),e.append(`"${t.text.slice(0,48)}"`)),a||e.append(P("code",{class:H.code},t.selector))}function QL(){return Math.floor(Math.random()*1048575).toString(16).padStart(5,"0")}function Mm(){return new Date().toISOString()}function JL(e){let t=a=>a.stopPropagation();for(let a of["input","beforeinput"])e.addEventListener(a,t)}function $L(e){return new Promise((t,a)=>{let o=new FileReader;o.onload=()=>t(o.result),o.onerror=()=>a(o.error),o.readAsDataURL(e)})}var mu=`/*! tailwindcss v4.3.1 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-red-100: oklch(93.6% 0.032 17.717);
    --color-red-200: oklch(88.5% 0.062 18.334);
    --color-red-400: oklch(70.4% 0.191 22.216);
    --color-red-500: oklch(63.7% 0.237 25.331);
    --color-amber-200: oklch(92.4% 0.12 95.746);
    --color-amber-300: oklch(87.9% 0.169 91.605);
    --color-amber-400: oklch(82.8% 0.189 84.429);
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --blur-sm: 8px;
    --blur-xl: 24px;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
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
  .\\@container {
    container-type: inline-size;
  }
  .pointer-events-auto {
    pointer-events: auto;
  }
  .pointer-events-none {
    pointer-events: none;
  }
  .collapse {
    visibility: collapse;
  }
  .invisible {
    visibility: hidden;
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
  .not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip-path: none;
    white-space: normal;
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
  .static {
    position: static;
  }
  .sticky {
    position: sticky;
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
  .top-1 {
    top: var(--spacing);
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
  .bottom-3 {
    bottom: calc(var(--spacing) * 3);
  }
  .left-0 {
    left: 0;
  }
  .left-1 {
    left: var(--spacing);
  }
  .left-1\\/2 {
    left: calc(1 / 2 * 100%);
  }
  .left-2 {
    left: calc(var(--spacing) * 2);
  }
  .isolate {
    isolation: isolate;
  }
  .isolation-auto {
    isolation: auto;
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
  .mx-2 {
    margin-inline: calc(var(--spacing) * 2);
  }
  .mx-5 {
    margin-inline: calc(var(--spacing) * 5);
  }
  .mx-auto {
    margin-inline: auto;
  }
  .my-1 {
    margin-block: var(--spacing);
  }
  .mt-0 {
    margin-top: 0;
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
  .mb-0 {
    margin-bottom: 0;
  }
  .mb-0\\.5 {
    margin-bottom: calc(var(--spacing) * 0.5);
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
  .contents {
    display: contents;
  }
  .flex {
    display: flex;
  }
  .flow-root {
    display: flow-root;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .inline-grid {
    display: inline-grid;
  }
  .inline-table {
    display: inline-table;
  }
  .list-item {
    display: list-item;
  }
  .table {
    display: table;
  }
  .table-caption {
    display: table-caption;
  }
  .table-cell {
    display: table-cell;
  }
  .table-column {
    display: table-column;
  }
  .table-column-group {
    display: table-column-group;
  }
  .table-footer-group {
    display: table-footer-group;
  }
  .table-header-group {
    display: table-header-group;
  }
  .table-row {
    display: table-row;
  }
  .table-row-group {
    display: table-row-group;
  }
  .aspect-\\[16\\/9\\] {
    aspect-ratio: 16/9;
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
  .max-h-40 {
    max-height: calc(var(--spacing) * 40);
  }
  .max-h-56 {
    max-height: calc(var(--spacing) * 56);
  }
  .max-h-64 {
    max-height: calc(var(--spacing) * 64);
  }
  .max-h-72 {
    max-height: calc(var(--spacing) * 72);
  }
  .max-h-\\[86vh\\] {
    max-height: 86vh;
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
  .min-h-\\[64px\\] {
    min-height: 64px;
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
  .w-8 {
    width: calc(var(--spacing) * 8);
  }
  .w-12 {
    width: calc(var(--spacing) * 12);
  }
  .w-14 {
    width: calc(var(--spacing) * 14);
  }
  .w-20 {
    width: calc(var(--spacing) * 20);
  }
  .w-48 {
    width: calc(var(--spacing) * 48);
  }
  .w-\\[15px\\] {
    width: 15px;
  }
  .w-\\[240px\\] {
    width: 240px;
  }
  .w-\\[340px\\] {
    width: 340px;
  }
  .w-\\[420px\\] {
    width: 420px;
  }
  .w-\\[min\\(92vw\\,380px\\)\\] {
    width: min(92vw, 380px);
  }
  .w-\\[min\\(92vw\\,400px\\)\\] {
    width: min(92vw, 400px);
  }
  .w-\\[min\\(92vw\\,560px\\)\\] {
    width: min(92vw, 560px);
  }
  .w-\\[min\\(920px\\,calc\\(100vw-2rem\\)\\)\\] {
    width: min(920px, calc(100vw - 2rem));
  }
  .w-auto {
    width: auto;
  }
  .w-full {
    width: 100%;
  }
  .max-w-\\[460px\\] {
    max-width: 460px;
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
  .min-w-20 {
    min-width: calc(var(--spacing) * 20);
  }
  .min-w-\\[132px\\] {
    min-width: 132px;
  }
  .min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
    min-width: var(--radix-select-trigger-width);
  }
  .flex-1 {
    flex: 1;
  }
  .flex-shrink {
    flex-shrink: 1;
  }
  .shrink {
    flex-shrink: 1;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .grow {
    flex-grow: 1;
  }
  .basis-full {
    flex-basis: 100%;
  }
  .border-collapse {
    border-collapse: collapse;
  }
  .-translate-x-1 {
    --tw-translate-x: calc(var(--spacing) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-x-1\\/2 {
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-1 {
    --tw-translate-y: calc(var(--spacing) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-1\\/2 {
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-none {
    translate: none;
  }
  .scale-3d {
    scale: var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z);
  }
  .rotate-90 {
    rotate: 90deg;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .cursor-crosshair {
    cursor: crosshair;
  }
  .cursor-grab {
    cursor: grab;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .touch-pinch-zoom {
    --tw-pinch-zoom: pinch-zoom;
    touch-action: var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,);
  }
  .resize {
    resize: both;
  }
  .resize-y {
    resize: vertical;
  }
  .appearance-none {
    appearance: none;
  }
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .flex-col {
    flex-direction: column;
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
  .space-y-4 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-reverse {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 1;
    }
  }
  .space-x-reverse {
    :where(& > :not(:last-child)) {
      --tw-space-x-reverse: 1;
    }
  }
  .divide-x {
    :where(& > :not(:last-child)) {
      --tw-divide-x-reverse: 0;
      border-inline-style: var(--tw-border-style);
      border-inline-start-width: calc(1px * var(--tw-divide-x-reverse));
      border-inline-end-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
    }
  }
  .divide-y {
    :where(& > :not(:last-child)) {
      --tw-divide-y-reverse: 0;
      border-bottom-style: var(--tw-border-style);
      border-top-style: var(--tw-border-style);
      border-top-width: calc(1px * var(--tw-divide-y-reverse));
      border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
    }
  }
  .divide-y-reverse {
    :where(& > :not(:last-child)) {
      --tw-divide-y-reverse: 1;
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
  .overflow-y-auto {
    overflow-y: auto;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .rounded-2xl {
    border-radius: var(--radius-2xl);
  }
  .rounded-\\[4px\\] {
    border-radius: 4px;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .rounded-loupe {
    border-radius: var(--radius-loupe);
  }
  .rounded-md {
    border-radius: var(--radius-md);
  }
  .rounded-xl {
    border-radius: var(--radius-xl);
  }
  .rounded-s {
    border-start-start-radius: 0.25rem;
    border-end-start-radius: 0.25rem;
  }
  .rounded-ss {
    border-start-start-radius: 0.25rem;
  }
  .rounded-e {
    border-start-end-radius: 0.25rem;
    border-end-end-radius: 0.25rem;
  }
  .rounded-se {
    border-start-end-radius: 0.25rem;
  }
  .rounded-ee {
    border-end-end-radius: 0.25rem;
  }
  .rounded-es {
    border-end-start-radius: 0.25rem;
  }
  .rounded-t {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
  .rounded-l {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
  .rounded-tl {
    border-top-left-radius: 0.25rem;
  }
  .rounded-r {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  .rounded-tr {
    border-top-right-radius: 0.25rem;
  }
  .rounded-b {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
  .rounded-br {
    border-bottom-right-radius: 0.25rem;
  }
  .rounded-bl {
    border-bottom-left-radius: 0.25rem;
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-x {
    border-inline-style: var(--tw-border-style);
    border-inline-width: 1px;
  }
  .border-y {
    border-block-style: var(--tw-border-style);
    border-block-width: 1px;
  }
  .border-s {
    border-inline-start-style: var(--tw-border-style);
    border-inline-start-width: 1px;
  }
  .border-e {
    border-inline-end-style: var(--tw-border-style);
    border-inline-end-width: 1px;
  }
  .border-bs {
    border-block-start-style: var(--tw-border-style);
    border-block-start-width: 1px;
  }
  .border-be {
    border-block-end-style: var(--tw-border-style);
    border-block-end-width: 1px;
  }
  .border-t {
    border-top-style: var(--tw-border-style);
    border-top-width: 1px;
  }
  .border-r {
    border-right-style: var(--tw-border-style);
    border-right-width: 1px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .border-l {
    border-left-style: var(--tw-border-style);
    border-left-width: 1px;
  }
  .border-dashed {
    --tw-border-style: dashed;
    border-style: dashed;
  }
  .border-amber-200 {
    border-color: var(--color-amber-200);
  }
  .border-amber-200\\/80 {
    border-color: color-mix(in srgb, oklch(92.4% 0.12 95.746) 80%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-amber-200) 80%, transparent);
    }
  }
  .border-amber-300 {
    border-color: var(--color-amber-300);
  }
  .border-amber-300\\/90 {
    border-color: color-mix(in srgb, oklch(87.9% 0.169 91.605) 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-amber-300) 90%, transparent);
    }
  }
  .border-current {
    border-color: currentcolor;
  }
  .border-loupe-accent {
    border-color: var(--color-loupe-accent);
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
  .border-red-400 {
    border-color: var(--color-red-400);
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
  .border-white {
    border-color: var(--color-white);
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
  .bg-black {
    background-color: var(--color-black);
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
  .bg-black\\/65 {
    background-color: color-mix(in srgb, #000 65%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 65%, transparent);
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
  .bg-loupe-elev {
    background-color: var(--color-loupe-elev);
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
  .bg-loupe-line {
    background-color: var(--color-loupe-line);
  }
  .bg-loupe-line\\/80 {
    background-color: color-mix(in srgb, rgba(255, 255, 255, 0.08) 80%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-loupe-line) 80%, transparent);
    }
  }
  .bg-loupe-panel {
    background-color: var(--color-loupe-panel);
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
  .bg-red-500 {
    background-color: var(--color-red-500);
  }
  .bg-red-500\\/10 {
    background-color: color-mix(in srgb, oklch(63.7% 0.237 25.331) 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-red-500) 10%, transparent);
    }
  }
  .bg-transparent {
    background-color: transparent;
  }
  .bg-white {
    background-color: var(--color-white);
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
  .bg-repeat {
    background-repeat: repeat;
  }
  .mask-no-clip {
    mask-clip: no-clip;
  }
  .mask-repeat {
    mask-repeat: repeat;
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
  .px-5 {
    padding-inline: calc(var(--spacing) * 5);
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .py-0 {
    padding-block: 0;
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
  .pt-5 {
    padding-top: calc(var(--spacing) * 5);
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
  .pl-7 {
    padding-left: calc(var(--spacing) * 7);
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .font-mono {
    font-family: var(--font-mono);
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
  .text-\\[15px\\] {
    font-size: 15px;
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
  .text-wrap {
    text-wrap: wrap;
  }
  .break-words {
    overflow-wrap: break-word;
  }
  .break-all {
    word-break: break-all;
  }
  .text-clip {
    text-overflow: clip;
  }
  .text-ellipsis {
    text-overflow: ellipsis;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre-line {
    white-space: pre-line;
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }
  .text-\\[\\#d97757\\] {
    color: #d97757;
  }
  .text-black {
    color: var(--color-black);
  }
  .text-current {
    color: currentcolor;
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
  .text-red-100 {
    color: var(--color-red-100);
  }
  .text-white {
    color: var(--color-white);
  }
  .capitalize {
    text-transform: capitalize;
  }
  .lowercase {
    text-transform: lowercase;
  }
  .normal-case {
    text-transform: none;
  }
  .uppercase {
    text-transform: uppercase;
  }
  .italic {
    font-style: italic;
  }
  .not-italic {
    font-style: normal;
  }
  .diagonal-fractions {
    --tw-numeric-fraction: diagonal-fractions;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .lining-nums {
    --tw-numeric-figure: lining-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .oldstyle-nums {
    --tw-numeric-figure: oldstyle-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .ordinal {
    --tw-ordinal: ordinal;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .proportional-nums {
    --tw-numeric-spacing: proportional-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .slashed-zero {
    --tw-slashed-zero: slashed-zero;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .stacked-fractions {
    --tw-numeric-fraction: stacked-fractions;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .normal-nums {
    font-variant-numeric: normal;
  }
  .line-through {
    text-decoration-line: line-through;
  }
  .no-underline {
    text-decoration-line: none;
  }
  .overline {
    text-decoration-line: overline;
  }
  .underline {
    text-decoration-line: underline;
  }
  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .subpixel-antialiased {
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
  }
  .opacity-0 {
    opacity: 0%;
  }
  .opacity-70 {
    opacity: 70%;
  }
  .opacity-100 {
    opacity: 100%;
  }
  .mix-blend-screen {
    mix-blend-mode: screen;
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
  .shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-xl {
    --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
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
  .inset-ring {
    --tw-inset-ring-shadow: inset 0 0 0 1px var(--tw-inset-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-black {
    --tw-shadow-color: #000;
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, var(--color-black) var(--tw-shadow-alpha), transparent);
    }
  }
  .shadow-black\\/20 {
    --tw-shadow-color: color-mix(in srgb, #000 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-black) 20%, transparent) var(--tw-shadow-alpha), transparent);
    }
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
  .ring-amber-400 {
    --tw-ring-color: var(--color-amber-400);
  }
  .ring-amber-400\\/35 {
    --tw-ring-color: color-mix(in srgb, oklch(82.8% 0.189 84.429) 35%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-amber-400) 35%, transparent);
    }
  }
  .ring-black {
    --tw-ring-color: var(--color-black);
  }
  .ring-black\\/20 {
    --tw-ring-color: color-mix(in srgb, #000 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-black) 20%, transparent);
    }
  }
  .ring-white {
    --tw-ring-color: var(--color-white);
  }
  .ring-white\\/35 {
    --tw-ring-color: color-mix(in srgb, #fff 35%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-white) 35%, transparent);
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
  .drop-shadow {
    --tw-drop-shadow-size: drop-shadow(0 1px 2px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.1))) drop-shadow(0 1px 1px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.06)));
    --tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow( 0 1px 1px rgb(0 0 0 / 0.06));
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
  .backdrop-blur {
    --tw-backdrop-blur: blur(8px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-blur-sm {
    --tw-backdrop-blur: blur(var(--blur-sm));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-blur-xl {
    --tw-backdrop-blur: blur(var(--blur-xl));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-grayscale {
    --tw-backdrop-grayscale: grayscale(100%);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-invert {
    --tw-backdrop-invert: invert(100%);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-sepia {
    --tw-backdrop-sepia: sepia(100%);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-filter {
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
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
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .duration-150 {
    --tw-duration: 150ms;
    transition-duration: 150ms;
  }
  .ease-out {
    --tw-ease: var(--ease-out);
    transition-timing-function: var(--ease-out);
  }
  .outline-none {
    --tw-outline-style: none;
    outline-style: none;
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  .divide-x-reverse {
    :where(& > :not(:last-child)) {
      --tw-divide-x-reverse: 1;
    }
  }
  .ring-inset {
    --tw-ring-inset: inset;
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
  .placeholder\\:text-loupe-faint {
    &::placeholder {
      color: var(--color-loupe-faint);
    }
  }
  .empty\\:hidden {
    &:empty {
      display: none;
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
  .hover\\:border-white\\/35 {
    &:hover {
      @media (hover: hover) {
        border-color: color-mix(in srgb, #fff 35%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          border-color: color-mix(in oklab, var(--color-white) 35%, transparent);
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
  .hover\\:bg-red-500\\/10 {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in srgb, oklch(63.7% 0.237 25.331) 10%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-red-500) 10%, transparent);
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
  .hover\\:text-red-200 {
    &:hover {
      @media (hover: hover) {
        color: var(--color-red-200);
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
  .focus-visible\\:bg-loupe-elev {
    &:focus-visible {
      background-color: var(--color-loupe-elev);
    }
  }
  .focus-visible\\:bg-red-500\\/10 {
    &:focus-visible {
      background-color: color-mix(in srgb, oklch(63.7% 0.237 25.331) 10%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--color-red-500) 10%, transparent);
      }
    }
  }
  .focus-visible\\:text-loupe-fg {
    &:focus-visible {
      color: var(--color-loupe-fg);
    }
  }
  .focus-visible\\:text-red-200 {
    &:focus-visible {
      color: var(--color-red-200);
    }
  }
  .focus-visible\\:opacity-100 {
    &:focus-visible {
      opacity: 100%;
    }
  }
  .focus-visible\\:ring-1 {
    &:focus-visible {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus-visible\\:ring-loupe-accent\\/70 {
    &:focus-visible {
      --tw-ring-color: color-mix(in srgb, #f8f8f8 70%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--color-loupe-accent) 70%, transparent);
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
  .disabled\\:opacity-45 {
    &:disabled {
      opacity: 45%;
    }
  }
  .disabled\\:opacity-50 {
    &:disabled {
      opacity: 50%;
    }
  }
  .disabled\\:active\\:scale-100 {
    &:disabled {
      &:active {
        --tw-scale-x: 100%;
        --tw-scale-y: 100%;
        --tw-scale-z: 100%;
        scale: var(--tw-scale-x) var(--tw-scale-y);
      }
    }
  }
  .data-\\[disabled\\]\\:pointer-events-none {
    &[data-disabled] {
      pointer-events: none;
    }
  }
  .data-\\[disabled\\]\\:opacity-50 {
    &[data-disabled] {
      opacity: 50%;
    }
  }
  .data-\\[highlighted\\]\\:bg-loupe-elev {
    &[data-highlighted] {
      background-color: var(--color-loupe-elev);
    }
  }
  .data-\\[highlighted\\]\\:text-loupe-fg {
    &[data-highlighted] {
      color: var(--color-loupe-fg);
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
  .data-\\[side\\=bottom\\]\\:translate-y-1 {
    &[data-side="bottom"] {
      --tw-translate-y: var(--spacing);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  .data-\\[side\\=top\\]\\:-translate-y-1 {
    &[data-side="top"] {
      --tw-translate-y: calc(var(--spacing) * -1);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  .sm\\:grid-cols-2 {
    @media (width >= 40rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .\\[\\&\\>svg\\]\\:block {
    &>svg {
      display: block;
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
:host {
  all: initial;
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
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
@property --tw-pan-x {
  syntax: "*";
  inherits: false;
}
@property --tw-pan-y {
  syntax: "*";
  inherits: false;
}
@property --tw-pinch-zoom {
  syntax: "*";
  inherits: false;
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-space-x-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-divide-x-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-divide-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-ordinal {
  syntax: "*";
  inherits: false;
}
@property --tw-slashed-zero {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-figure {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-spacing {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-fraction {
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
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-pan-x: initial;
      --tw-pan-y: initial;
      --tw-pinch-zoom: initial;
      --tw-space-y-reverse: 0;
      --tw-space-x-reverse: 0;
      --tw-divide-x-reverse: 0;
      --tw-border-style: solid;
      --tw-divide-y-reverse: 0;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
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
      --tw-backdrop-blur: initial;
      --tw-backdrop-brightness: initial;
      --tw-backdrop-contrast: initial;
      --tw-backdrop-grayscale: initial;
      --tw-backdrop-hue-rotate: initial;
      --tw-backdrop-invert: initial;
      --tw-backdrop-opacity: initial;
      --tw-backdrop-saturate: initial;
      --tw-backdrop-sepia: initial;
      --tw-duration: initial;
      --tw-ease: initial;
    }
  }
}
`;var Em=["localhost","127.0.0.1","*.localhost","*.local"];function hu(e,t){let a,o;try{let r=new URL(e);a=r.hostname.toLowerCase(),o=r.port?`${a}:${r.port}`:a}catch{return!1}return t.some(r=>{let l=r.trim().toLowerCase();return t0(l.includes(":")?o:a,l)})}function t0(e,t){if(!t)return!1;if(t===e)return!0;if(t.startsWith("*.")){let a=t.slice(2);return e===a||e.endsWith("."+a)}return t.includes("*")?new RegExp("^"+t.split("*").map(a0).join(".*")+"$").test(e):!1}function a0(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var gf={bridgeUrl:"http://localhost:7337",author:"me",projectOrigins:Em,bridgeRoutes:[]};async function xu(){let e=await chrome.storage.sync.get(gf);return{...gf,...e}}function gu(e,t){if(t){let a=e.bridgeRoutes.find(o=>hu(t,o.origins));if(a?.bridgeUrl)return Om(a.bridgeUrl)}return Om(e.bridgeUrl)}function Om(e){return(e||gf.bridgeUrl).trim().replace(/\/$/,"")}var JS=B(Sb(),1);var M=B(X(),1),jS=B(zo(),1);var Ks=B(X(),1);var Zs=(...e)=>e.filter((t,a,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===a).join(" ").trim();var Lb=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();var Cb=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,o)=>o?o.toUpperCase():a.toLowerCase());var op=e=>{let t=Cb(e);return t.charAt(0).toUpperCase()+t.slice(1)};var Un=B(X(),1);var Ys={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var Ib=e=>{for(let t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};var xl=B(X(),1);var Z1=(0,xl.createContext)({});var Rb=()=>(0,xl.useContext)(Z1);var kb=(0,Un.forwardRef)(({color:e,size:t,strokeWidth:a,absoluteStrokeWidth:o,className:r="",children:l,iconNode:n,...u},s)=>{let{size:i=24,strokeWidth:d=2,absoluteStrokeWidth:p=!1,color:x="currentColor",className:h=""}=Rb()??{},b=o??p?Number(a??d)*24/Number(t??i):a??d;return(0,Un.createElement)("svg",{ref:s,...Ys,width:t??i??Ys.width,height:t??i??Ys.height,stroke:e??x,strokeWidth:b,className:Zs("lucide",h,r),...!l&&!Ib(u)&&{"aria-hidden":"true"},...u},[...n.map(([v,y])=>(0,Un.createElement)(v,y)),...Array.isArray(l)?l:[l]])});var oe=(e,t)=>{let a=(0,Ks.forwardRef)(({className:o,...r},l)=>(0,Ks.createElement)(kb,{ref:l,iconNode:t,className:Zs(`lucide-${Lb(op(e))}`,`lucide-${e}`,o),...r}));return a.displayName=op(e),a};var Y1=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],gl=oe("arrow-up",Y1);var K1=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Hn=oe("check",K1);var Q1=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Nn=oe("chevron-down",Q1);var J1=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],vl=oe("chevron-right",J1);var $1=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],Ro=oe("ellipsis",$1);var e2=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],zn=oe("external-link",e2);var t2=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],bl=oe("eye-off",t2);var a2=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],nr=oe("eye",a2);var o2=[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]],qn=oe("grip-vertical",o2);var r2=[["path",{d:"M16 5h6",key:"1vod17"}],["path",{d:"M19 2v6",key:"4bpg5p"}],["path",{d:"M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",key:"1ue2ih"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}]],Fn=oe("image-plus",r2);var l2=[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]],_n=oe("library",l2);var n2=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],Gn=oe("message-square",n2);var u2=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m8 9 3 3-3 3",key:"12hl5m"}]],Vn=oe("panel-right-close",u2);var s2=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],Xn=oe("pencil",s2);var i2=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],jn=oe("plus",i2);var f2=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],yl=oe("search",f2);var d2=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],ur=oe("trash-2",d2);var c2=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Xa=oe("x",c2);var Ka=B(X(),1);var Ue=B(X(),1);var mT=!!(typeof window<"u"&&window.document&&window.document.createElement);function be(e,t,{checkForDefaultPrevented:a=!0}={}){return function(r){if(e?.(r),a===!1||!r.defaultPrevented)return t?.(r)}}var Mb=B(X(),1);function Ab(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function p2(...e){return t=>{let a=!1,o=e.map(r=>{let l=Ab(r,t);return!a&&typeof l=="function"&&(a=!0),l});if(a)return()=>{for(let r=0;r<o.length;r++){let l=o[r];typeof l=="function"?l():Ab(e[r],null)}}}}function ye(...e){return Mb.useCallback(p2(...e),e)}var ja=B(X(),1),Ob=B(Ze(),1);function ko(e,t=[]){let a=[];function o(l,n){let u=ja.createContext(n);u.displayName=l+"Context";let s=a.length;a=[...a,n];let i=p=>{let{scope:x,children:h,...b}=p,v=x?.[e]?.[s]||u,y=ja.useMemo(()=>b,Object.values(b));return(0,Ob.jsx)(v.Provider,{value:y,children:h})};i.displayName=l+"Provider";function d(p,x){let h=x?.[e]?.[s]||u,b=ja.useContext(h);if(b)return b;if(n!==void 0)return n;throw new Error(`\`${p}\` must be used within \`${l}\``)}return[i,d]}let r=()=>{let l=a.map(n=>ja.createContext(n));return function(u){let s=u?.[e]||l;return ja.useMemo(()=>({[`__scope${e}`]:{...u,[e]:s}}),[u,s])}};return r.scopeName=e,[o,x2(r,...t)]}function x2(...e){let t=e[0];if(e.length===1)return t;let a=()=>{let o=e.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(l){let n=o.reduce((u,{useScope:s,scopeName:i})=>{let p=s(l)[`__scope${i}`];return{...u,...p}},{});return ja.useMemo(()=>({[`__scope${t.scopeName}`]:n}),[n])}};return a.scopeName=t.scopeName,a}var rp=B(X(),1);var Bb=B(X(),1),Be=globalThis?.document?Bb.useLayoutEffect:()=>{};var g2=rp[" useId ".trim().toString()]||(()=>{}),v2=0;function Ao(e){let[t,a]=rp.useState(g2());return Be(()=>{e||a(o=>o??String(v2++))},[e]),e||(t?`radix-${t}`:"")}var Kt=B(X(),1);var Js=B(X(),1);var b2=Kt[" useInsertionEffect ".trim().toString()]||Be;function Wn({prop:e,defaultProp:t,onChange:a=()=>{},caller:o}){let[r,l,n]=y2({defaultProp:t,onChange:a}),u=e!==void 0,s=u?e:r;{let d=Kt.useRef(e!==void 0);Kt.useEffect(()=>{let p=d.current;p!==u&&console.warn(`${o} is changing from ${p?"controlled":"uncontrolled"} to ${u?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=u},[u,o])}let i=Kt.useCallback(d=>{if(u){let p=w2(d)?d(e):d;p!==e&&n.current?.(p)}else l(d)},[u,e,l,n]);return[s,i]}function y2({defaultProp:e,onChange:t}){let[a,o]=Kt.useState(e),r=Kt.useRef(a),l=Kt.useRef(t);return b2(()=>{l.current=t},[t]),Kt.useEffect(()=>{r.current!==a&&(l.current?.(a),r.current=a)},[a,r]),[a,o,l]}function w2(e){return typeof e=="function"}var CT=Symbol("RADIX:SYNC_STATE");var he=B(X(),1);var Ub=B(X(),1),Hb=B(zo(),1);var st=B(X(),1);function Wa(e){let t=st.forwardRef((a,o)=>{let{children:r,...l}=a,n=null,u=!1,s=[];Pb(r)&&typeof $s=="function"&&(r=$s(r._payload)),st.Children.forEach(r,x=>{if(R2(x)){u=!0;let h=x,b="child"in h.props?h.props.child:h.props.children;Pb(b)&&typeof $s=="function"&&(b=$s(b._payload)),n=L2(h,b),s.push(n?.props?.children)}else s.push(x)}),n?n=st.cloneElement(n,void 0,s):!u&&st.Children.count(r)===1&&st.isValidElement(r)&&(n=r);let i=n?I2(n):void 0,d=ye(o,i);if(!n){if(r||r===0)throw new Error(u?D2(e):M2(e));return r}let p=C2(l,n.props??{});return n.type!==st.Fragment&&(p.ref=o?d:i),st.cloneElement(n,p)});return t.displayName=`${e}.Slot`,t}var S2=Symbol.for("radix.slottable");var L2=(e,t)=>{if("child"in e.props){let a=e.props.child;return st.isValidElement(a)?st.cloneElement(a,void 0,e.props.children(a.props.children)):null}return st.isValidElement(t)?t:null};function C2(e,t){let a={...t};for(let o in t){let r=e[o],l=t[o];/^on[A-Z]/.test(o)?r&&l?a[o]=(...u)=>{let s=l(...u);return r(...u),s}:r&&(a[o]=r):o==="style"?a[o]={...r,...l}:o==="className"&&(a[o]=[r,l].filter(Boolean).join(" "))}return{...e,...a}}function I2(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning;return a?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning,a?e.props.ref:e.props.ref||e.ref)}function R2(e){return st.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===S2}var k2=Symbol.for("react.lazy");function Pb(e){return e!=null&&typeof e=="object"&&"$$typeof"in e&&e.$$typeof===k2&&"_payload"in e&&A2(e._payload)}function A2(e){return typeof e=="object"&&e!==null&&"then"in e}var M2=e=>`${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,D2=e=>`${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,$s=st[" use ".trim().toString()];var Nb=B(Ze(),1),T2=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],ne=T2.reduce((e,t)=>{let a=Wa(`Primitive.${t}`),o=Ub.forwardRef((r,l)=>{let{asChild:n,...u}=r,s=n?a:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),(0,Nb.jsx)(s,{...u,ref:l})});return o.displayName=`Primitive.${t}`,{...e,[t]:o}},{});function zb(e,t){e&&Hb.flushSync(()=>e.dispatchEvent(t))}var wl=B(X(),1);function Qt(e){let t=wl.useRef(e);return wl.useEffect(()=>{t.current=e}),wl.useMemo(()=>(...a)=>t.current?.(...a),[])}var qb=B(X(),1);function Fb(e,t=globalThis?.document){let a=Qt(e);qb.useEffect(()=>{let o=r=>{r.key==="Escape"&&a(r)};return t.addEventListener("keydown",o,{capture:!0}),()=>t.removeEventListener("keydown",o,{capture:!0})},[a,t])}var np=B(Ze(),1),E2="DismissableLayer",lp="dismissableLayer.update",O2="dismissableLayer.pointerDownOutside",B2="dismissableLayer.focusOutside",_b,up=he.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),Zn=he.forwardRef((e,t)=>{let{disableOutsidePointerEvents:a=!1,deferPointerDownOutside:o=!1,onEscapeKeyDown:r,onPointerDownOutside:l,onFocusOutside:n,onInteractOutside:u,onDismiss:s,...i}=e,d=he.useContext(up),[p,x]=he.useState(null),h=p?.ownerDocument??globalThis?.document,[,b]=he.useState({}),v=ye(t,R=>x(R)),y=Array.from(d.layers),[c]=[...d.layersWithOutsidePointerEventsDisabled].slice(-1),f=y.indexOf(c),m=p?y.indexOf(p):-1,g=d.layersWithOutsidePointerEventsDisabled.size>0,S=m>=f,I=he.useRef(!1),C=H2(R=>{let A=R.target;if(!(A instanceof Node))return;let z=[...d.branches].some(G=>G.contains(A));!S||z||(l?.(R),u?.(R),R.defaultPrevented||s?.())},{ownerDocument:h,deferPointerDownOutside:o,isDeferredPointerDownOutsideRef:I,dismissableSurfaces:d.dismissableSurfaces}),L=N2(R=>{if(o&&I.current)return;let A=R.target;[...d.branches].some(G=>G.contains(A))||(n?.(R),u?.(R),R.defaultPrevented||s?.())},h);return Fb(R=>{m===d.layers.size-1&&(r?.(R),!R.defaultPrevented&&s&&(R.preventDefault(),s()))},h),he.useEffect(()=>{if(p)return a&&(d.layersWithOutsidePointerEventsDisabled.size===0&&(_b=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),d.layersWithOutsidePointerEventsDisabled.add(p)),d.layers.add(p),Gb(),()=>{a&&(d.layersWithOutsidePointerEventsDisabled.delete(p),d.layersWithOutsidePointerEventsDisabled.size===0&&(h.body.style.pointerEvents=_b))}},[p,h,a,d]),he.useEffect(()=>()=>{p&&(d.layers.delete(p),d.layersWithOutsidePointerEventsDisabled.delete(p),Gb())},[p,d]),he.useEffect(()=>{let R=()=>b({});return document.addEventListener(lp,R),()=>document.removeEventListener(lp,R)},[]),(0,np.jsx)(ne.div,{...i,ref:v,style:{pointerEvents:g?S?"auto":"none":void 0,...e.style},onFocusCapture:be(e.onFocusCapture,L.onFocusCapture),onBlurCapture:be(e.onBlurCapture,L.onBlurCapture),onPointerDownCapture:be(e.onPointerDownCapture,C.onPointerDownCapture)})});Zn.displayName=E2;var P2="DismissableLayerBranch",U2=he.forwardRef((e,t)=>{let a=he.useContext(up),o=he.useRef(null),r=ye(t,o);return he.useEffect(()=>{let l=o.current;if(l)return a.branches.add(l),()=>{a.branches.delete(l)}},[a.branches]),(0,np.jsx)(ne.div,{...e,ref:r})});U2.displayName=P2;function Vb(){let e=he.useContext(up),[t,a]=he.useState(null);return he.useEffect(()=>{if(t)return e.dismissableSurfaces.add(t),()=>{e.dismissableSurfaces.delete(t)}},[t,e.dismissableSurfaces]),a}function H2(e,t){let{ownerDocument:a=globalThis?.document,deferPointerDownOutside:o=!1,isDeferredPointerDownOutsideRef:r,dismissableSurfaces:l}=t,n=Qt(e),u=he.useRef(!1),s=he.useRef(!1),i=he.useRef(new Map),d=he.useRef(()=>{});return he.useEffect(()=>{function p(){s.current=!1,r.current=!1,i.current.clear()}function x(){return Array.from(i.current.values()).some(Boolean)}function h(f){if(!s.current)return;let m=f.target;m instanceof Node&&[...l].some(S=>S.contains(m))||i.current.set(f.type,!0),f.type==="click"&&window.setTimeout(()=>{s.current&&d.current()},0)}function b(f){s.current&&i.current.set(f.type,!1)}let v=f=>{if(f.target&&!u.current){let g=function(){a.removeEventListener("click",d.current);let I=x();p(),I||Xb(O2,n,S,{discrete:!0})};var m=g;let S={originalEvent:f};s.current=!0,r.current=o&&f.button===0,i.current.clear(),!o||f.button!==0?g():(a.removeEventListener("click",d.current),d.current=g,a.addEventListener("click",d.current,{once:!0}))}else a.removeEventListener("click",d.current),p();u.current=!1},y=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(let f of y)a.addEventListener(f,h,!0),a.addEventListener(f,b);let c=window.setTimeout(()=>{a.addEventListener("pointerdown",v)},0);return()=>{window.clearTimeout(c),a.removeEventListener("pointerdown",v),a.removeEventListener("click",d.current);for(let f of y)a.removeEventListener(f,h,!0),a.removeEventListener(f,b)}},[a,n,o,r,l]),{onPointerDownCapture:()=>u.current=!0}}function N2(e,t=globalThis?.document){let a=Qt(e),o=he.useRef(!1);return he.useEffect(()=>{let r=l=>{l.target&&!o.current&&Xb(B2,a,{originalEvent:l},{discrete:!1})};return t.addEventListener("focusin",r),()=>t.removeEventListener("focusin",r)},[t,a]),{onFocusCapture:()=>o.current=!0,onBlurCapture:()=>o.current=!1}}function Gb(){let e=new CustomEvent(lp);document.dispatchEvent(e)}function Xb(e,t,a,{discrete:o}){let r=a.originalEvent.target,l=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:a});t&&r.addEventListener(e,t,{once:!0}),o?zb(r,l):r.dispatchEvent(l)}var Jt=B(X(),1);var Kb=B(Ze(),1),sp="focusScope.autoFocusOnMount",ip="focusScope.autoFocusOnUnmount",jb={bubbles:!1,cancelable:!0},z2="FocusScope",Yn=Jt.forwardRef((e,t)=>{let{loop:a=!1,trapped:o=!1,onMountAutoFocus:r,onUnmountAutoFocus:l,...n}=e,[u,s]=Jt.useState(null),i=Qt(r),d=Qt(l),p=Jt.useRef(null),x=ye(t,v=>s(v)),h=Jt.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;Jt.useEffect(()=>{if(o){let f=function(I){if(h.paused||!u)return;let C=I.target;u.contains(C)?p.current=C:Mo(p.current,{select:!0})},m=function(I){if(h.paused||!u)return;let C=I.relatedTarget;C!==null&&(u.contains(C)||Mo(p.current,{select:!0}))},g=function(I){if(document.activeElement===document.body)for(let L of I)L.removedNodes.length>0&&Mo(u)};var v=f,y=m,c=g;document.addEventListener("focusin",f),document.addEventListener("focusout",m);let S=new MutationObserver(g);return u&&S.observe(u,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",f),document.removeEventListener("focusout",m),S.disconnect()}}},[o,u,h.paused]),Jt.useEffect(()=>{if(u){Zb.add(h);let v=document.activeElement;if(!u.contains(v)){let c=new CustomEvent(sp,jb);u.addEventListener(sp,i),u.dispatchEvent(c),c.defaultPrevented||(q2(X2(Qb(u)),{select:!0}),document.activeElement===v&&Mo(u))}return()=>{u.removeEventListener(sp,i),setTimeout(()=>{let c=new CustomEvent(ip,jb);u.addEventListener(ip,d),u.dispatchEvent(c),c.defaultPrevented||Mo(v??document.body,{select:!0}),u.removeEventListener(ip,d),Zb.remove(h)},0)}}},[u,i,d,h]);let b=Jt.useCallback(v=>{if(!a&&!o||h.paused)return;let y=v.key==="Tab"&&!v.altKey&&!v.ctrlKey&&!v.metaKey,c=document.activeElement;if(y&&c){let f=v.currentTarget,[m,g]=F2(f);m&&g?!v.shiftKey&&c===g?(v.preventDefault(),a&&Mo(m,{select:!0})):v.shiftKey&&c===m&&(v.preventDefault(),a&&Mo(g,{select:!0})):c===f&&v.preventDefault()}},[a,o,h.paused]);return(0,Kb.jsx)(ne.div,{tabIndex:-1,...n,ref:x,onKeyDown:b})});Yn.displayName=z2;function q2(e,{select:t=!1}={}){let a=document.activeElement;for(let o of e)if(Mo(o,{select:t}),document.activeElement!==a)return}function F2(e){let t=Qb(e),a=Wb(t,e),o=Wb(t.reverse(),e);return[a,o]}function Qb(e){let t=[],a=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:o=>{let r=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||r?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;a.nextNode();)t.push(a.currentNode);return t}function Wb(e,t){for(let a of e)if(!_2(a,{upTo:t}))return a}function _2(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function G2(e){return e instanceof HTMLInputElement&&"select"in e}function Mo(e,{select:t=!1}={}){if(e&&e.focus){let a=document.activeElement;e.focus({preventScroll:!0}),e!==a&&G2(e)&&t&&e.select()}}var Zb=V2();function V2(){let e=[];return{add(t){let a=e[0];t!==a&&a?.pause(),e=Yb(e,t),e.unshift(t)},remove(t){e=Yb(e,t),e[0]?.resume()}}}function Yb(e,t){let a=[...e],o=a.indexOf(t);return o!==-1&&a.splice(o,1),a}function X2(e){return e.filter(t=>t.tagName!=="A")}var ei=B(X(),1),Jb=B(zo(),1);var $b=B(Ze(),1),j2="Portal",Kn=ei.forwardRef((e,t)=>{let{container:a,...o}=e,[r,l]=ei.useState(!1);Be(()=>l(!0),[]);let n=a||r&&globalThis?.document?.body;return n?Jb.createPortal((0,$b.jsx)(ne.div,{...o,ref:t}),n):null});Kn.displayName=j2;var pt=B(X(),1);var ty=B(X(),1);function W2(e,t){return ty.useReducer((a,o)=>t[a][o]??a,e)}var sr=e=>{let{present:t,children:a}=e,o=Z2(t),r=typeof a=="function"?a({present:o.isPresent}):pt.Children.only(a),l=Y2(o.ref,K2(r));return typeof a=="function"||o.isPresent?pt.cloneElement(r,{ref:l}):null};sr.displayName="Presence";function Z2(e){let[t,a]=pt.useState(),o=pt.useRef(null),r=pt.useRef(e),l=pt.useRef("none"),n=e?"mounted":"unmounted",[u,s]=W2(n,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return pt.useEffect(()=>{let i=ti(o.current);l.current=u==="mounted"?i:"none"},[u]),Be(()=>{let i=o.current,d=r.current;if(d!==e){let x=l.current,h=ti(i);e?s("MOUNT"):h==="none"||i?.display==="none"?s("UNMOUNT"):s(d&&x!==h?"ANIMATION_OUT":"UNMOUNT"),r.current=e}},[e,s]),Be(()=>{if(t){let i,d=t.ownerDocument.defaultView??window,p=h=>{let v=ti(o.current).includes(CSS.escape(h.animationName));if(h.target===t&&v&&(s("ANIMATION_END"),!r.current)){let y=t.style.animationFillMode;t.style.animationFillMode="forwards",i=d.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=y)})}},x=h=>{h.target===t&&(l.current=ti(o.current))};return t.addEventListener("animationstart",x),t.addEventListener("animationcancel",p),t.addEventListener("animationend",p),()=>{d.clearTimeout(i),t.removeEventListener("animationstart",x),t.removeEventListener("animationcancel",p),t.removeEventListener("animationend",p)}}else s("ANIMATION_END")},[t,s]),{isPresent:["mounted","unmountSuspended"].includes(u),ref:pt.useCallback(i=>{o.current=i?getComputedStyle(i):null,a(i)},[])}}function ey(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function Y2(...e){let t=pt.useRef(e);return t.current=e,pt.useCallback(a=>{let o=t.current,r=!1,l=o.map(n=>{let u=ey(n,a);return!r&&typeof u=="function"&&(r=!0),u});if(r)return()=>{for(let n=0;n<l.length;n++){let u=l[n];typeof u=="function"?u():ey(o[n],null)}}},[])}function ti(e){return e?.animationName||"none"}function K2(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning;return a?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,a=t&&"isReactWarning"in t&&t.isReactWarning,a?e.props.ref:e.props.ref||e.ref)}var oy=B(X(),1),ai=0,Sl=null;function oi(){oy.useEffect(()=>{Sl||(Sl={start:ay(),end:ay()});let{start:e,end:t}=Sl;return document.body.firstElementChild!==e&&document.body.insertAdjacentElement("afterbegin",e),document.body.lastElementChild!==t&&document.body.insertAdjacentElement("beforeend",t),ai++,()=>{ai===1&&(Sl?.start.remove(),Sl?.end.remove(),Sl=null),ai=Math.max(0,ai-1)}},[])}function ay(){let e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var kt=function(){return kt=Object.assign||function(t){for(var a,o=1,r=arguments.length;o<r;o++){a=arguments[o];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(t[l]=a[l])}return t},kt.apply(this,arguments)};function ri(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]]);return a}function ry(e,t,a){if(a||arguments.length===2)for(var o=0,r=t.length,l;o<r;o++)(l||!(o in t))&&(l||(l=Array.prototype.slice.call(t,0,o)),l[o]=t[o]);return e.concat(l||Array.prototype.slice.call(t))}var ii=B(X());var mt=B(X());var ir="right-scroll-bar-position",fr="width-before-scroll-bar",fp="with-scroll-bars-hidden",dp="--removed-body-scroll-bar-size";function li(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}var ly=B(X());function ny(e,t){var a=(0,ly.useState)(function(){return{value:e,callback:t,facade:{get current(){return a.value},set current(o){var r=a.value;r!==o&&(a.value=o,a.callback(o,r))}}}})[0];return a.callback=t,a.facade}var ni=B(X());var Q2=typeof window<"u"?ni.useLayoutEffect:ni.useEffect,uy=new WeakMap;function cp(e,t){var a=ny(t||null,function(o){return e.forEach(function(r){return li(r,o)})});return Q2(function(){var o=uy.get(a);if(o){var r=new Set(o),l=new Set(e),n=a.current;r.forEach(function(u){l.has(u)||li(u,null)}),l.forEach(function(u){r.has(u)||li(u,n)})}uy.set(a,e)},[e]),a}function J2(e){return e}function $2(e,t){t===void 0&&(t=J2);var a=[],o=!1,r={read:function(){if(o)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return a.length?a[a.length-1]:e},useMedium:function(l){var n=t(l,o);return a.push(n),function(){a=a.filter(function(u){return u!==n})}},assignSyncMedium:function(l){for(o=!0;a.length;){var n=a;a=[],n.forEach(l)}a={push:function(u){return l(u)},filter:function(){return a}}},assignMedium:function(l){o=!0;var n=[];if(a.length){var u=a;a=[],u.forEach(l),n=a}var s=function(){var d=n;n=[],d.forEach(l)},i=function(){return Promise.resolve().then(s)};i(),a={push:function(d){n.push(d),i()},filter:function(d){return n=n.filter(d),a}}}};return r}function pp(e){e===void 0&&(e={});var t=$2(null);return t.options=kt({async:!0,ssr:!1},e),t}var sy=B(X()),iy=function(e){var t=e.sideCar,a=ri(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=t.read();if(!o)throw new Error("Sidecar medium not found");return sy.createElement(o,kt({},a))};iy.isSideCarExport=!0;function mp(e,t){return e.useMedium(t),iy}var ui=pp();var hp=function(){},Qn=mt.forwardRef(function(e,t){var a=mt.useRef(null),o=mt.useState({onScrollCapture:hp,onWheelCapture:hp,onTouchMoveCapture:hp}),r=o[0],l=o[1],n=e.forwardProps,u=e.children,s=e.className,i=e.removeScrollBar,d=e.enabled,p=e.shards,x=e.sideCar,h=e.noRelative,b=e.noIsolation,v=e.inert,y=e.allowPinchZoom,c=e.as,f=c===void 0?"div":c,m=e.gapMode,g=ri(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),S=x,I=cp([a,t]),C=kt(kt({},g),r);return mt.createElement(mt.Fragment,null,d&&mt.createElement(S,{sideCar:ui,removeScrollBar:i,shards:p,noRelative:h,noIsolation:b,inert:v,setCallbacks:l,allowPinchZoom:!!y,lockRef:a,gapMode:m}),n?mt.cloneElement(mt.Children.only(u),kt(kt({},C),{ref:I})):mt.createElement(f,kt({},C,{className:s,ref:I}),u))});Qn.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Qn.classNames={fullWidth:fr,zeroRight:ir};var De=B(X());var Cl=B(X());var cy=B(X());var fy;var dy=function(){if(fy)return fy;if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function eI(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=dy();return t&&e.setAttribute("nonce",t),e}function tI(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function aI(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var xp=function(){var e=0,t=null;return{add:function(a){e==0&&(t=eI())&&(tI(t,a),aI(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}};var gp=function(){var e=xp();return function(t,a){cy.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&a])}};var Jn=function(){var e=gp(),t=function(a){var o=a.styles,r=a.dynamic;return e(o,r),null};return t};var oI={left:0,top:0,right:0,gap:0},vp=function(e){return parseInt(e||"",10)||0},rI=function(e){var t=window.getComputedStyle(document.body),a=t[e==="padding"?"paddingLeft":"marginLeft"],o=t[e==="padding"?"paddingTop":"marginTop"],r=t[e==="padding"?"paddingRight":"marginRight"];return[vp(a),vp(o),vp(r)]},bp=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return oI;var t=rI(e),a=document.documentElement.clientWidth,o=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,o-a+t[2]-t[0])}};var lI=Jn(),Ll="data-scroll-locked",nI=function(e,t,a,o){var r=e.left,l=e.top,n=e.right,u=e.gap;return a===void 0&&(a="margin"),`
  .`.concat(fp,` {
   overflow: hidden `).concat(o,`;
   padding-right: `).concat(u,"px ").concat(o,`;
  }
  body[`).concat(Ll,`] {
    overflow: hidden `).concat(o,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(o,";"),a==="margin"&&`
    padding-left: `.concat(r,`px;
    padding-top: `).concat(l,`px;
    padding-right: `).concat(n,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(u,"px ").concat(o,`;
    `),a==="padding"&&"padding-right: ".concat(u,"px ").concat(o,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(ir,` {
    right: `).concat(u,"px ").concat(o,`;
  }
  
  .`).concat(fr,` {
    margin-right: `).concat(u,"px ").concat(o,`;
  }
  
  .`).concat(ir," .").concat(ir,` {
    right: 0 `).concat(o,`;
  }
  
  .`).concat(fr," .").concat(fr,` {
    margin-right: 0 `).concat(o,`;
  }
  
  body[`).concat(Ll,`] {
    `).concat(dp,": ").concat(u,`px;
  }
`)},py=function(){var e=parseInt(document.body.getAttribute(Ll)||"0",10);return isFinite(e)?e:0},uI=function(){Cl.useEffect(function(){return document.body.setAttribute(Ll,(py()+1).toString()),function(){var e=py()-1;e<=0?document.body.removeAttribute(Ll):document.body.setAttribute(Ll,e.toString())}},[])},yp=function(e){var t=e.noRelative,a=e.noImportant,o=e.gapMode,r=o===void 0?"margin":o;uI();var l=Cl.useMemo(function(){return bp(r)},[r]);return Cl.createElement(lI,{styles:nI(l,!t,r,a?"":"!important")})};var wp=!1;if(typeof window<"u")try{$n=Object.defineProperty({},"passive",{get:function(){return wp=!0,!0}}),window.addEventListener("test",$n,$n),window.removeEventListener("test",$n,$n)}catch{wp=!1}var $n,dr=wp?{passive:!1}:!1;var sI=function(e){return e.tagName==="TEXTAREA"},my=function(e,t){if(!(e instanceof Element))return!1;var a=window.getComputedStyle(e);return a[t]!=="hidden"&&!(a.overflowY===a.overflowX&&!sI(e)&&a[t]==="visible")},iI=function(e){return my(e,"overflowY")},fI=function(e){return my(e,"overflowX")},Sp=function(e,t){var a=t.ownerDocument,o=t;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var r=hy(e,o);if(r){var l=xy(e,o),n=l[1],u=l[2];if(n>u)return!0}o=o.parentNode}while(o&&o!==a.body);return!1},dI=function(e){var t=e.scrollTop,a=e.scrollHeight,o=e.clientHeight;return[t,a,o]},cI=function(e){var t=e.scrollLeft,a=e.scrollWidth,o=e.clientWidth;return[t,a,o]},hy=function(e,t){return e==="v"?iI(t):fI(t)},xy=function(e,t){return e==="v"?dI(t):cI(t)},pI=function(e,t){return e==="h"&&t==="rtl"?-1:1},gy=function(e,t,a,o,r){var l=pI(e,window.getComputedStyle(t).direction),n=l*o,u=a.target,s=t.contains(u),i=!1,d=n>0,p=0,x=0;do{if(!u)break;var h=xy(e,u),b=h[0],v=h[1],y=h[2],c=v-y-l*b;(b||c)&&hy(e,u)&&(p+=c,x+=b);var f=u.parentNode;u=f&&f.nodeType===Node.DOCUMENT_FRAGMENT_NODE?f.host:f}while(!s&&u!==document.body||s&&(t.contains(u)||t===u));return(d&&(r&&Math.abs(p)<1||!r&&n>p)||!d&&(r&&Math.abs(x)<1||!r&&-n>x))&&(i=!0),i};var si=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},vy=function(e){return[e.deltaX,e.deltaY]},by=function(e){return e&&"current"in e?e.current:e},mI=function(e,t){return e[0]===t[0]&&e[1]===t[1]},hI=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},xI=0,Il=[];function yy(e){var t=De.useRef([]),a=De.useRef([0,0]),o=De.useRef(),r=De.useState(xI++)[0],l=De.useState(Jn)[0],n=De.useRef(e);De.useEffect(function(){n.current=e},[e]),De.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(r));var v=ry([e.lockRef.current],(e.shards||[]).map(by),!0).filter(Boolean);return v.forEach(function(y){return y.classList.add("allow-interactivity-".concat(r))}),function(){document.body.classList.remove("block-interactivity-".concat(r)),v.forEach(function(y){return y.classList.remove("allow-interactivity-".concat(r))})}}},[e.inert,e.lockRef.current,e.shards]);var u=De.useCallback(function(v,y){if("touches"in v&&v.touches.length===2||v.type==="wheel"&&v.ctrlKey)return!n.current.allowPinchZoom;var c=si(v),f=a.current,m="deltaX"in v?v.deltaX:f[0]-c[0],g="deltaY"in v?v.deltaY:f[1]-c[1],S,I=v.target,C=Math.abs(m)>Math.abs(g)?"h":"v";if("touches"in v&&C==="h"&&I.type==="range")return!1;var L=window.getSelection(),R=L&&L.anchorNode,A=R?R===I||R.contains(I):!1;if(A)return!1;var z=Sp(C,I);if(!z)return!0;if(z?S=C:(S=C==="v"?"h":"v",z=Sp(C,I)),!z)return!1;if(!o.current&&"changedTouches"in v&&(m||g)&&(o.current=S),!S)return!0;var G=o.current||S;return gy(G,y,v,G==="h"?m:g,!0)},[]),s=De.useCallback(function(v){var y=v;if(!(!Il.length||Il[Il.length-1]!==l)){var c="deltaY"in y?vy(y):si(y),f=t.current.filter(function(S){return S.name===y.type&&(S.target===y.target||y.target===S.shadowParent)&&mI(S.delta,c)})[0];if(f&&f.should){y.cancelable&&y.preventDefault();return}if(!f){var m=(n.current.shards||[]).map(by).filter(Boolean).filter(function(S){return S.contains(y.target)}),g=m.length>0?u(y,m[0]):!n.current.noIsolation;g&&y.cancelable&&y.preventDefault()}}},[]),i=De.useCallback(function(v,y,c,f){var m={name:v,delta:y,target:c,should:f,shadowParent:gI(c)};t.current.push(m),setTimeout(function(){t.current=t.current.filter(function(g){return g!==m})},1)},[]),d=De.useCallback(function(v){a.current=si(v),o.current=void 0},[]),p=De.useCallback(function(v){i(v.type,vy(v),v.target,u(v,e.lockRef.current))},[]),x=De.useCallback(function(v){i(v.type,si(v),v.target,u(v,e.lockRef.current))},[]);De.useEffect(function(){return Il.push(l),e.setCallbacks({onScrollCapture:p,onWheelCapture:p,onTouchMoveCapture:x}),document.addEventListener("wheel",s,dr),document.addEventListener("touchmove",s,dr),document.addEventListener("touchstart",d,dr),function(){Il=Il.filter(function(v){return v!==l}),document.removeEventListener("wheel",s,dr),document.removeEventListener("touchmove",s,dr),document.removeEventListener("touchstart",d,dr)}},[]);var h=e.removeScrollBar,b=e.inert;return De.createElement(De.Fragment,null,b?De.createElement(l,{styles:hI(r)}):null,h?De.createElement(yp,{noRelative:e.noRelative,gapMode:e.gapMode}):null)}function gI(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}var wy=mp(ui,yy);var Sy=ii.forwardRef(function(e,t){return ii.createElement(Qn,kt({},e,{ref:t,sideCar:wy}))});Sy.classNames=Qn.classNames;var eu=Sy;var vI=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},Rl=new WeakMap,fi=new WeakMap,di={},Lp=0,Ly=function(e){return e&&(e.host||Ly(e.parentNode))},bI=function(e,t){return t.map(function(a){if(e.contains(a))return a;var o=Ly(a);return o&&e.contains(o)?o:(console.error("aria-hidden",a,"in not contained inside",e,". Doing nothing"),null)}).filter(function(a){return!!a})},yI=function(e,t,a,o){var r=bI(t,Array.isArray(e)?e:[e]);di[a]||(di[a]=new WeakMap);var l=di[a],n=[],u=new Set,s=new Set(r),i=function(p){!p||u.has(p)||(u.add(p),i(p.parentNode))};r.forEach(i);var d=function(p){!p||s.has(p)||Array.prototype.forEach.call(p.children,function(x){if(u.has(x))d(x);else try{var h=x.getAttribute(o),b=h!==null&&h!=="false",v=(Rl.get(x)||0)+1,y=(l.get(x)||0)+1;Rl.set(x,v),l.set(x,y),n.push(x),v===1&&b&&fi.set(x,!0),y===1&&x.setAttribute(a,"true"),b||x.setAttribute(o,"true")}catch(c){console.error("aria-hidden: cannot operate on ",x,c)}})};return d(t),u.clear(),Lp++,function(){n.forEach(function(p){var x=Rl.get(p)-1,h=l.get(p)-1;Rl.set(p,x),l.set(p,h),x||(fi.has(p)||p.removeAttribute(o),fi.delete(p)),h||p.removeAttribute(a)}),Lp--,Lp||(Rl=new WeakMap,Rl=new WeakMap,fi=new WeakMap,di={})}},ci=function(e,t,a){a===void 0&&(a="data-aria-hidden");var o=Array.from(Array.isArray(e)?e:[e]),r=t||vI(e);return r?(o.push.apply(o,Array.from(r.querySelectorAll("[aria-live], script"))),yI(o,r,a,"aria-hidden")):function(){return null}};var Pe=B(Ze(),1),mi="Dialog",[Cy,v3]=ko(mi),[wI,ra]=Cy(mi),Cp=e=>{let{__scopeDialog:t,children:a,open:o,defaultOpen:r,onOpenChange:l,modal:n=!0}=e,u=Ue.useRef(null),s=Ue.useRef(null),[i,d]=Wn({prop:o,defaultProp:r??!1,onChange:l,caller:mi});return(0,Pe.jsx)(wI,{scope:t,triggerRef:u,contentRef:s,contentId:Ao(),titleId:Ao(),descriptionId:Ao(),open:i,onOpenChange:d,onOpenToggle:Ue.useCallback(()=>d(p=>!p),[d]),modal:n,children:a})};Cp.displayName=mi;var Iy="DialogTrigger",Ry=Ue.forwardRef((e,t)=>{let{__scopeDialog:a,...o}=e,r=ra(Iy,a),l=ye(t,r.triggerRef);return(0,Pe.jsx)(ne.button,{type:"button","aria-haspopup":"dialog","aria-expanded":r.open,"aria-controls":r.open?r.contentId:void 0,"data-state":Dp(r.open),...o,ref:l,onClick:be(e.onClick,r.onOpenToggle)})});Ry.displayName=Iy;var Ip="DialogPortal",[SI,ky]=Cy(Ip,{forceMount:void 0}),LI=e=>{let{__scopeDialog:t,forceMount:a,children:o,container:r}=e,l=ra(Ip,t);return(0,Pe.jsx)(SI,{scope:t,forceMount:a,children:Ue.Children.map(o,n=>(0,Pe.jsx)(sr,{present:a||l.open,children:(0,Pe.jsx)(Kn,{asChild:!0,container:r,children:n})}))})};LI.displayName=Ip;var pi="DialogOverlay",Rp=Ue.forwardRef((e,t)=>{let a=ky(pi,e.__scopeDialog),{forceMount:o=a.forceMount,...r}=e,l=ra(pi,e.__scopeDialog);return l.modal?(0,Pe.jsx)(sr,{present:o||l.open,children:(0,Pe.jsx)(II,{...r,ref:t})}):null});Rp.displayName=pi;var CI=Wa("DialogOverlay.RemoveScroll"),II=Ue.forwardRef((e,t)=>{let{__scopeDialog:a,...o}=e,r=ra(pi,a),l=Vb(),n=ye(t,l);return(0,Pe.jsx)(eu,{as:CI,allowPinchZoom:!0,shards:[r.contentRef],children:(0,Pe.jsx)(ne.div,{"data-state":Dp(r.open),...o,ref:n,style:{pointerEvents:"auto",...o.style}})})}),kl="DialogContent",kp=Ue.forwardRef((e,t)=>{let a=ky(kl,e.__scopeDialog),{forceMount:o=a.forceMount,...r}=e,l=ra(kl,e.__scopeDialog);return(0,Pe.jsx)(sr,{present:o||l.open,children:l.modal?(0,Pe.jsx)(RI,{...r,ref:t}):(0,Pe.jsx)(kI,{...r,ref:t})})});kp.displayName=kl;var RI=Ue.forwardRef((e,t)=>{let a=ra(kl,e.__scopeDialog),o=Ue.useRef(null),r=ye(t,a.contentRef,o);return Ue.useEffect(()=>{let l=o.current;if(l)return ci(l)},[]),(0,Pe.jsx)(Ay,{...e,ref:r,trapFocus:a.open,disableOutsidePointerEvents:a.open,onCloseAutoFocus:be(e.onCloseAutoFocus,l=>{l.preventDefault(),a.triggerRef.current?.focus()}),onPointerDownOutside:be(e.onPointerDownOutside,l=>{let n=l.detail.originalEvent,u=n.button===0&&n.ctrlKey===!0;(n.button===2||u)&&l.preventDefault()}),onFocusOutside:be(e.onFocusOutside,l=>l.preventDefault())})}),kI=Ue.forwardRef((e,t)=>{let a=ra(kl,e.__scopeDialog),o=Ue.useRef(!1),r=Ue.useRef(!1);return(0,Pe.jsx)(Ay,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:l=>{e.onCloseAutoFocus?.(l),l.defaultPrevented||(o.current||a.triggerRef.current?.focus(),l.preventDefault()),o.current=!1,r.current=!1},onInteractOutside:l=>{e.onInteractOutside?.(l),l.defaultPrevented||(o.current=!0,l.detail.originalEvent.type==="pointerdown"&&(r.current=!0));let n=l.target;a.triggerRef.current?.contains(n)&&l.preventDefault(),l.detail.originalEvent.type==="focusin"&&r.current&&l.preventDefault()}})}),Ay=Ue.forwardRef((e,t)=>{let{__scopeDialog:a,trapFocus:o,onOpenAutoFocus:r,onCloseAutoFocus:l,...n}=e,u=ra(kl,a);return oi(),(0,Pe.jsx)(Pe.Fragment,{children:(0,Pe.jsx)(Yn,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:r,onUnmountAutoFocus:l,children:(0,Pe.jsx)(Zn,{role:"dialog",id:u.contentId,"aria-describedby":u.descriptionId,"aria-labelledby":u.titleId,"data-state":Dp(u.open),...n,ref:t,deferPointerDownOutside:!0,onDismiss:()=>u.onOpenChange(!1)})})})}),My="DialogTitle",Ap=Ue.forwardRef((e,t)=>{let{__scopeDialog:a,...o}=e,r=ra(My,a);return(0,Pe.jsx)(ne.h2,{id:r.titleId,...o,ref:t})});Ap.displayName=My;var Dy="DialogDescription",Mp=Ue.forwardRef((e,t)=>{let{__scopeDialog:a,...o}=e,r=ra(Dy,a);return(0,Pe.jsx)(ne.p,{id:r.descriptionId,...o,ref:t})});Mp.displayName=Dy;var Ty="DialogClose",hi=Ue.forwardRef((e,t)=>{let{__scopeDialog:a,...o}=e,r=ra(Ty,a);return(0,Pe.jsx)(ne.button,{type:"button",...o,ref:t,onClick:be(e.onClick,()=>r.onOpenChange(!1))})});hi.displayName=Ty;function Dp(e){return e?"open":"closed"}var E=B(X(),1),Kp=B(zo(),1);function Tp(e,[t,a]){return Math.min(a,Math.max(t,e))}var la=B(X(),1);var xi=B(Ze(),1),gi=B(X(),1);var MI=B(Ze(),1);function Ey(e){let t=e+"CollectionProvider",[a,o]=ko(t),[r,l]=a(t,{collectionRef:{current:null},itemMap:new Map}),n=v=>{let{scope:y,children:c}=v,f=la.useRef(null),m=la.useRef(new Map).current;return(0,xi.jsx)(r,{scope:y,itemMap:m,collectionRef:f,children:c})};n.displayName=t;let u=e+"CollectionSlot",s=Wa(u),i=la.forwardRef((v,y)=>{let{scope:c,children:f}=v,m=l(u,c),g=ye(y,m.collectionRef);return(0,xi.jsx)(s,{ref:g,children:f})});i.displayName=u;let d=e+"CollectionItemSlot",p="data-radix-collection-item",x=Wa(d),h=la.forwardRef((v,y)=>{let{scope:c,children:f,...m}=v,g=la.useRef(null),S=ye(y,g),I=l(d,c);return la.useEffect(()=>(I.itemMap.set(g,{ref:g,...m}),()=>void I.itemMap.delete(g))),(0,xi.jsx)(x,{[p]:"",ref:S,children:f})});h.displayName=d;function b(v){let y=l(e+"CollectionConsumer",v);return la.useCallback(()=>{let f=y.collectionRef.current;if(!f)return[];let m=Array.from(f.querySelectorAll(`[${p}]`));return Array.from(y.itemMap.values()).sort((I,C)=>m.indexOf(I.ref.current)-m.indexOf(C.ref.current))},[y.collectionRef,y.itemMap])}return[{Provider:n,Slot:i,ItemSlot:h},b,o]}var vi=B(X(),1),DI=B(Ze(),1),TI=vi.createContext(void 0);function Oy(e){let t=vi.useContext(TI);return e||t||"ltr"}var it=B(X(),1);var Uy=["top","right","bottom","left"];var ba=Math.min,vt=Math.max,au=Math.round,ou=Math.floor,na=e=>({x:e,y:e}),EI={left:"right",right:"left",bottom:"top",top:"bottom"};function yi(e,t,a){return vt(e,ba(t,a))}function ya(e,t){return typeof e=="function"?e(t):e}function wa(e){return e.split("-")[0]}function cr(e){return e.split("-")[1]}function wi(e){return e==="x"?"y":"x"}function Si(e){return e==="y"?"height":"width"}function ua(e){let t=e[0];return t==="t"||t==="b"?"y":"x"}function Li(e){return wi(ua(e))}function Hy(e,t,a){a===void 0&&(a=!1);let o=cr(e),r=Li(e),l=Si(r),n=r==="x"?o===(a?"end":"start")?"right":"left":o==="start"?"bottom":"top";return t.reference[l]>t.floating[l]&&(n=tu(n)),[n,tu(n)]}function Ny(e){let t=tu(e);return[bi(e),t,bi(t)]}function bi(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}var By=["left","right"],Py=["right","left"],OI=["top","bottom"],BI=["bottom","top"];function PI(e,t,a){switch(e){case"top":case"bottom":return a?t?Py:By:t?By:Py;case"left":case"right":return t?OI:BI;default:return[]}}function zy(e,t,a,o){let r=cr(e),l=PI(wa(e),a==="start",o);return r&&(l=l.map(n=>n+"-"+r),t&&(l=l.concat(l.map(bi)))),l}function tu(e){let t=wa(e);return EI[t]+e.slice(t.length)}function UI(e){return{top:0,right:0,bottom:0,left:0,...e}}function Ep(e){return typeof e!="number"?UI(e):{top:e,right:e,bottom:e,left:e}}function pr(e){let{x:t,y:a,width:o,height:r}=e;return{width:o,height:r,top:a,left:t,right:t+o,bottom:a+r,x:t,y:a}}function qy(e,t,a){let{reference:o,floating:r}=e,l=ua(t),n=Li(t),u=Si(n),s=wa(t),i=l==="y",d=o.x+o.width/2-r.width/2,p=o.y+o.height/2-r.height/2,x=o[u]/2-r[u]/2,h;switch(s){case"top":h={x:d,y:o.y-r.height};break;case"bottom":h={x:d,y:o.y+o.height};break;case"right":h={x:o.x+o.width,y:p};break;case"left":h={x:o.x-r.width,y:p};break;default:h={x:o.x,y:o.y}}switch(cr(t)){case"start":h[n]-=x*(a&&i?-1:1);break;case"end":h[n]+=x*(a&&i?-1:1);break}return h}async function Gy(e,t){var a;t===void 0&&(t={});let{x:o,y:r,platform:l,rects:n,elements:u,strategy:s}=e,{boundary:i="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:x=!1,padding:h=0}=ya(t,e),b=Ep(h),y=u[x?p==="floating"?"reference":"floating":p],c=pr(await l.getClippingRect({element:(a=await(l.isElement==null?void 0:l.isElement(y)))==null||a?y:y.contextElement||await(l.getDocumentElement==null?void 0:l.getDocumentElement(u.floating)),boundary:i,rootBoundary:d,strategy:s})),f=p==="floating"?{x:o,y:r,width:n.floating.width,height:n.floating.height}:n.reference,m=await(l.getOffsetParent==null?void 0:l.getOffsetParent(u.floating)),g=await(l.isElement==null?void 0:l.isElement(m))?await(l.getScale==null?void 0:l.getScale(m))||{x:1,y:1}:{x:1,y:1},S=pr(l.convertOffsetParentRelativeRectToViewportRelativeRect?await l.convertOffsetParentRelativeRectToViewportRelativeRect({elements:u,rect:f,offsetParent:m,strategy:s}):f);return{top:(c.top-S.top+b.top)/g.y,bottom:(S.bottom-c.bottom+b.bottom)/g.y,left:(c.left-S.left+b.left)/g.x,right:(S.right-c.right+b.right)/g.x}}var HI=50,Vy=async(e,t,a)=>{let{placement:o="bottom",strategy:r="absolute",middleware:l=[],platform:n}=a,u=n.detectOverflow?n:{...n,detectOverflow:Gy},s=await(n.isRTL==null?void 0:n.isRTL(t)),i=await n.getElementRects({reference:e,floating:t,strategy:r}),{x:d,y:p}=qy(i,o,s),x=o,h=0,b={};for(let v=0;v<l.length;v++){let y=l[v];if(!y)continue;let{name:c,fn:f}=y,{x:m,y:g,data:S,reset:I}=await f({x:d,y:p,initialPlacement:o,placement:x,strategy:r,middlewareData:b,rects:i,platform:u,elements:{reference:e,floating:t}});d=m??d,p=g??p,b[c]={...b[c],...S},I&&h<HI&&(h++,typeof I=="object"&&(I.placement&&(x=I.placement),I.rects&&(i=I.rects===!0?await n.getElementRects({reference:e,floating:t,strategy:r}):I.rects),{x:d,y:p}=qy(i,x,s)),v=-1)}return{x:d,y:p,placement:x,strategy:r,middlewareData:b}},Xy=e=>({name:"arrow",options:e,async fn(t){let{x:a,y:o,placement:r,rects:l,platform:n,elements:u,middlewareData:s}=t,{element:i,padding:d=0}=ya(e,t)||{};if(i==null)return{};let p=Ep(d),x={x:a,y:o},h=Li(r),b=Si(h),v=await n.getDimensions(i),y=h==="y",c=y?"top":"left",f=y?"bottom":"right",m=y?"clientHeight":"clientWidth",g=l.reference[b]+l.reference[h]-x[h]-l.floating[b],S=x[h]-l.reference[h],I=await(n.getOffsetParent==null?void 0:n.getOffsetParent(i)),C=I?I[m]:0;(!C||!await(n.isElement==null?void 0:n.isElement(I)))&&(C=u.floating[m]||l.floating[b]);let L=g/2-S/2,R=C/2-v[b]/2-1,A=ba(p[c],R),z=ba(p[f],R),G=A,ee=C-v[b]-z,Z=C/2-v[b]/2+L,te=yi(G,Z,ee),F=!s.arrow&&cr(r)!=null&&Z!==te&&l.reference[b]/2-(Z<G?A:z)-v[b]/2<0,j=F?Z<G?Z-G:Z-ee:0;return{[h]:x[h]+j,data:{[h]:te,centerOffset:Z-te-j,...F&&{alignmentOffset:j}},reset:F}}});var jy=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var a,o;let{placement:r,middlewareData:l,rects:n,initialPlacement:u,platform:s,elements:i}=t,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:x,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:v=!0,...y}=ya(e,t);if((a=l.arrow)!=null&&a.alignmentOffset)return{};let c=wa(r),f=ua(u),m=wa(u)===u,g=await(s.isRTL==null?void 0:s.isRTL(i.floating)),S=x||(m||!v?[tu(u)]:Ny(u)),I=b!=="none";!x&&I&&S.push(...zy(u,v,b,g));let C=[u,...S],L=await s.detectOverflow(t,y),R=[],A=((o=l.flip)==null?void 0:o.overflows)||[];if(d&&R.push(L[c]),p){let Z=Hy(r,n,g);R.push(L[Z[0]],L[Z[1]])}if(A=[...A,{placement:r,overflows:R}],!R.every(Z=>Z<=0)){var z,G;let Z=(((z=l.flip)==null?void 0:z.index)||0)+1,te=C[Z];if(te&&(!(p==="alignment"?f!==ua(te):!1)||A.every(q=>ua(q.placement)===f?q.overflows[0]>0:!0)))return{data:{index:Z,overflows:A},reset:{placement:te}};let F=(G=A.filter(j=>j.overflows[0]<=0).sort((j,q)=>j.overflows[1]-q.overflows[1])[0])==null?void 0:G.placement;if(!F)switch(h){case"bestFit":{var ee;let j=(ee=A.filter(q=>{if(I){let le=ua(q.placement);return le===f||le==="y"}return!0}).map(q=>[q.placement,q.overflows.filter(le=>le>0).reduce((le,D)=>le+D,0)]).sort((q,le)=>q[1]-le[1])[0])==null?void 0:ee[0];j&&(F=j);break}case"initialPlacement":F=u;break}if(r!==F)return{reset:{placement:F}}}return{}}}};function Fy(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function _y(e){return Uy.some(t=>e[t]>=0)}var Wy=function(e){return e===void 0&&(e={}),{name:"hide",options:e,async fn(t){let{rects:a,platform:o}=t,{strategy:r="referenceHidden",...l}=ya(e,t);switch(r){case"referenceHidden":{let n=await o.detectOverflow(t,{...l,elementContext:"reference"}),u=Fy(n,a.reference);return{data:{referenceHiddenOffsets:u,referenceHidden:_y(u)}}}case"escaped":{let n=await o.detectOverflow(t,{...l,altBoundary:!0}),u=Fy(n,a.floating);return{data:{escapedOffsets:u,escaped:_y(u)}}}default:return{}}}}};var Zy=new Set(["left","top"]);async function NI(e,t){let{placement:a,platform:o,elements:r}=e,l=await(o.isRTL==null?void 0:o.isRTL(r.floating)),n=wa(a),u=cr(a),s=ua(a)==="y",i=Zy.has(n)?-1:1,d=l&&s?-1:1,p=ya(t,e),{mainAxis:x,crossAxis:h,alignmentAxis:b}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return u&&typeof b=="number"&&(h=u==="end"?b*-1:b),s?{x:h*d,y:x*i}:{x:x*i,y:h*d}}var Yy=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var a,o;let{x:r,y:l,placement:n,middlewareData:u}=t,s=await NI(t,e);return n===((a=u.offset)==null?void 0:a.placement)&&(o=u.arrow)!=null&&o.alignmentOffset?{}:{x:r+s.x,y:l+s.y,data:{...s,placement:n}}}}},Ky=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:a,y:o,placement:r,platform:l}=t,{mainAxis:n=!0,crossAxis:u=!1,limiter:s={fn:c=>{let{x:f,y:m}=c;return{x:f,y:m}}},...i}=ya(e,t),d={x:a,y:o},p=await l.detectOverflow(t,i),x=ua(wa(r)),h=wi(x),b=d[h],v=d[x];if(n){let c=h==="y"?"top":"left",f=h==="y"?"bottom":"right",m=b+p[c],g=b-p[f];b=yi(m,b,g)}if(u){let c=x==="y"?"top":"left",f=x==="y"?"bottom":"right",m=v+p[c],g=v-p[f];v=yi(m,v,g)}let y=s.fn({...t,[h]:b,[x]:v});return{...y,data:{x:y.x-a,y:y.y-o,enabled:{[h]:n,[x]:u}}}}}},Qy=function(e){return e===void 0&&(e={}),{options:e,fn(t){let{x:a,y:o,placement:r,rects:l,middlewareData:n}=t,{offset:u=0,mainAxis:s=!0,crossAxis:i=!0}=ya(e,t),d={x:a,y:o},p=ua(r),x=wi(p),h=d[x],b=d[p],v=ya(u,t),y=typeof v=="number"?{mainAxis:v,crossAxis:0}:{mainAxis:0,crossAxis:0,...v};if(s){let m=x==="y"?"height":"width",g=l.reference[x]-l.floating[m]+y.mainAxis,S=l.reference[x]+l.reference[m]-y.mainAxis;h<g?h=g:h>S&&(h=S)}if(i){var c,f;let m=x==="y"?"width":"height",g=Zy.has(wa(r)),S=l.reference[p]-l.floating[m]+(g&&((c=n.offset)==null?void 0:c[p])||0)+(g?0:y.crossAxis),I=l.reference[p]+l.reference[m]+(g?0:((f=n.offset)==null?void 0:f[p])||0)-(g?y.crossAxis:0);b<S?b=S:b>I&&(b=I)}return{[x]:h,[p]:b}}}},Jy=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var a,o;let{placement:r,rects:l,platform:n,elements:u}=t,{apply:s=()=>{},...i}=ya(e,t),d=await n.detectOverflow(t,i),p=wa(r),x=cr(r),h=ua(r)==="y",{width:b,height:v}=l.floating,y,c;p==="top"||p==="bottom"?(y=p,c=x===(await(n.isRTL==null?void 0:n.isRTL(u.floating))?"start":"end")?"left":"right"):(c=p,y=x==="end"?"top":"bottom");let f=v-d.top-d.bottom,m=b-d.left-d.right,g=ba(v-d[y],f),S=ba(b-d[c],m),I=!t.middlewareData.shift,C=g,L=S;if((a=t.middlewareData.shift)!=null&&a.enabled.x&&(L=m),(o=t.middlewareData.shift)!=null&&o.enabled.y&&(C=f),I&&!x){let A=vt(d.left,0),z=vt(d.right,0),G=vt(d.top,0),ee=vt(d.bottom,0);h?L=b-2*(A!==0||z!==0?A+z:vt(d.left,d.right)):C=v-2*(G!==0||ee!==0?G+ee:vt(d.top,d.bottom))}await s({...t,availableWidth:L,availableHeight:C});let R=await n.getDimensions(u.floating);return b!==R.width||v!==R.height?{reset:{rects:!0}}:{}}}};function Ci(){return typeof window<"u"}function xr(e){return ew(e)?(e.nodeName||"").toLowerCase():"#document"}function At(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function sa(e){var t;return(t=(ew(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function ew(e){return Ci()?e instanceof Node||e instanceof At(e).Node:!1}function $t(e){return Ci()?e instanceof Element||e instanceof At(e).Element:!1}function Sa(e){return Ci()?e instanceof HTMLElement||e instanceof At(e).HTMLElement:!1}function $y(e){return!Ci()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof At(e).ShadowRoot}function Al(e){let{overflow:t,overflowX:a,overflowY:o,display:r}=ea(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+a)&&r!=="inline"&&r!=="contents"}function tw(e){return/^(table|td|th)$/.test(xr(e))}function ru(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}var zI=/transform|translate|scale|rotate|perspective|filter/,qI=/paint|layout|strict|content/,mr=e=>!!e&&e!=="none",Op;function Ii(e){let t=$t(e)?ea(e):e;return mr(t.transform)||mr(t.translate)||mr(t.scale)||mr(t.rotate)||mr(t.perspective)||!Ri()&&(mr(t.backdropFilter)||mr(t.filter))||zI.test(t.willChange||"")||qI.test(t.contain||"")}function aw(e){let t=Za(e);for(;Sa(t)&&!gr(t);){if(Ii(t))return t;if(ru(t))return null;t=Za(t)}return null}function Ri(){return Op==null&&(Op=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),Op}function gr(e){return/^(html|body|#document)$/.test(xr(e))}function ea(e){return At(e).getComputedStyle(e)}function lu(e){return $t(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Za(e){if(xr(e)==="html")return e;let t=e.assignedSlot||e.parentNode||$y(e)&&e.host||sa(e);return $y(t)?t.host:t}function ow(e){let t=Za(e);return gr(t)?e.ownerDocument?e.ownerDocument.body:e.body:Sa(t)&&Al(t)?t:ow(t)}function hr(e,t,a){var o;t===void 0&&(t=[]),a===void 0&&(a=!0);let r=ow(e),l=r===((o=e.ownerDocument)==null?void 0:o.body),n=At(r);if(l){let u=ki(n);return t.concat(n,n.visualViewport||[],Al(r)?r:[],u&&a?hr(u):[])}else return t.concat(r,hr(r,[],a))}function ki(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function uw(e){let t=ea(e),a=parseFloat(t.width)||0,o=parseFloat(t.height)||0,r=Sa(e),l=r?e.offsetWidth:a,n=r?e.offsetHeight:o,u=au(a)!==l||au(o)!==n;return u&&(a=l,o=n),{width:a,height:o,$:u}}function Pp(e){return $t(e)?e:e.contextElement}function Ml(e){let t=Pp(e);if(!Sa(t))return na(1);let a=t.getBoundingClientRect(),{width:o,height:r,$:l}=uw(t),n=(l?au(a.width):a.width)/o,u=(l?au(a.height):a.height)/r;return(!n||!Number.isFinite(n))&&(n=1),(!u||!Number.isFinite(u))&&(u=1),{x:n,y:u}}var FI=na(0);function sw(e){let t=At(e);return!Ri()||!t.visualViewport?FI:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function _I(e,t,a){return t===void 0&&(t=!1),!a||t&&a!==At(e)?!1:t}function vr(e,t,a,o){t===void 0&&(t=!1),a===void 0&&(a=!1);let r=e.getBoundingClientRect(),l=Pp(e),n=na(1);t&&(o?$t(o)&&(n=Ml(o)):n=Ml(e));let u=_I(l,a,o)?sw(l):na(0),s=(r.left+u.x)/n.x,i=(r.top+u.y)/n.y,d=r.width/n.x,p=r.height/n.y;if(l){let x=At(l),h=o&&$t(o)?At(o):o,b=x,v=ki(b);for(;v&&o&&h!==b;){let y=Ml(v),c=v.getBoundingClientRect(),f=ea(v),m=c.left+(v.clientLeft+parseFloat(f.paddingLeft))*y.x,g=c.top+(v.clientTop+parseFloat(f.paddingTop))*y.y;s*=y.x,i*=y.y,d*=y.x,p*=y.y,s+=m,i+=g,b=At(v),v=ki(b)}}return pr({width:d,height:p,x:s,y:i})}function Ai(e,t){let a=lu(e).scrollLeft;return t?t.left+a:vr(sa(e)).left+a}function iw(e,t){let a=e.getBoundingClientRect(),o=a.left+t.scrollLeft-Ai(e,a),r=a.top+t.scrollTop;return{x:o,y:r}}function GI(e){let{elements:t,rect:a,offsetParent:o,strategy:r}=e,l=r==="fixed",n=sa(o),u=t?ru(t.floating):!1;if(o===n||u&&l)return a;let s={scrollLeft:0,scrollTop:0},i=na(1),d=na(0),p=Sa(o);if((p||!p&&!l)&&((xr(o)!=="body"||Al(n))&&(s=lu(o)),p)){let h=vr(o);i=Ml(o),d.x=h.x+o.clientLeft,d.y=h.y+o.clientTop}let x=n&&!p&&!l?iw(n,s):na(0);return{width:a.width*i.x,height:a.height*i.y,x:a.x*i.x-s.scrollLeft*i.x+d.x+x.x,y:a.y*i.y-s.scrollTop*i.y+d.y+x.y}}function VI(e){return Array.from(e.getClientRects())}function XI(e){let t=sa(e),a=lu(e),o=e.ownerDocument.body,r=vt(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth),l=vt(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight),n=-a.scrollLeft+Ai(e),u=-a.scrollTop;return ea(o).direction==="rtl"&&(n+=vt(t.clientWidth,o.clientWidth)-r),{width:r,height:l,x:n,y:u}}var rw=25;function jI(e,t){let a=At(e),o=sa(e),r=a.visualViewport,l=o.clientWidth,n=o.clientHeight,u=0,s=0;if(r){l=r.width,n=r.height;let d=Ri();(!d||d&&t==="fixed")&&(u=r.offsetLeft,s=r.offsetTop)}let i=Ai(o);if(i<=0){let d=o.ownerDocument,p=d.body,x=getComputedStyle(p),h=d.compatMode==="CSS1Compat"&&parseFloat(x.marginLeft)+parseFloat(x.marginRight)||0,b=Math.abs(o.clientWidth-p.clientWidth-h);b<=rw&&(l-=b)}else i<=rw&&(l+=i);return{width:l,height:n,x:u,y:s}}function WI(e,t){let a=vr(e,!0,t==="fixed"),o=a.top+e.clientTop,r=a.left+e.clientLeft,l=Sa(e)?Ml(e):na(1),n=e.clientWidth*l.x,u=e.clientHeight*l.y,s=r*l.x,i=o*l.y;return{width:n,height:u,x:s,y:i}}function lw(e,t,a){let o;if(t==="viewport")o=jI(e,a);else if(t==="document")o=XI(sa(e));else if($t(t))o=WI(t,a);else{let r=sw(e);o={x:t.x-r.x,y:t.y-r.y,width:t.width,height:t.height}}return pr(o)}function fw(e,t){let a=Za(e);return a===t||!$t(a)||gr(a)?!1:ea(a).position==="fixed"||fw(a,t)}function ZI(e,t){let a=t.get(e);if(a)return a;let o=hr(e,[],!1).filter(u=>$t(u)&&xr(u)!=="body"),r=null,l=ea(e).position==="fixed",n=l?Za(e):e;for(;$t(n)&&!gr(n);){let u=ea(n),s=Ii(n);!s&&u.position==="fixed"&&(r=null),(l?!s&&!r:!s&&u.position==="static"&&!!r&&(r.position==="absolute"||r.position==="fixed")||Al(n)&&!s&&fw(e,n))?o=o.filter(d=>d!==n):r=u,n=Za(n)}return t.set(e,o),o}function YI(e){let{element:t,boundary:a,rootBoundary:o,strategy:r}=e,n=[...a==="clippingAncestors"?ru(t)?[]:ZI(t,this._c):[].concat(a),o],u=lw(t,n[0],r),s=u.top,i=u.right,d=u.bottom,p=u.left;for(let x=1;x<n.length;x++){let h=lw(t,n[x],r);s=vt(h.top,s),i=ba(h.right,i),d=ba(h.bottom,d),p=vt(h.left,p)}return{width:i-p,height:d-s,x:p,y:s}}function KI(e){let{width:t,height:a}=uw(e);return{width:t,height:a}}function QI(e,t,a){let o=Sa(t),r=sa(t),l=a==="fixed",n=vr(e,!0,l,t),u={scrollLeft:0,scrollTop:0},s=na(0);function i(){s.x=Ai(r)}if(o||!o&&!l)if((xr(t)!=="body"||Al(r))&&(u=lu(t)),o){let h=vr(t,!0,l,t);s.x=h.x+t.clientLeft,s.y=h.y+t.clientTop}else r&&i();l&&!o&&r&&i();let d=r&&!o&&!l?iw(r,u):na(0),p=n.left+u.scrollLeft-s.x-d.x,x=n.top+u.scrollTop-s.y-d.y;return{x:p,y:x,width:n.width,height:n.height}}function Bp(e){return ea(e).position==="static"}function nw(e,t){if(!Sa(e)||ea(e).position==="fixed")return null;if(t)return t(e);let a=e.offsetParent;return sa(e)===a&&(a=a.ownerDocument.body),a}function dw(e,t){let a=At(e);if(ru(e))return a;if(!Sa(e)){let r=Za(e);for(;r&&!gr(r);){if($t(r)&&!Bp(r))return r;r=Za(r)}return a}let o=nw(e,t);for(;o&&tw(o)&&Bp(o);)o=nw(o,t);return o&&gr(o)&&Bp(o)&&!Ii(o)?a:o||aw(e)||a}var JI=async function(e){let t=this.getOffsetParent||dw,a=this.getDimensions,o=await a(e.floating);return{reference:QI(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function $I(e){return ea(e).direction==="rtl"}var cw={convertOffsetParentRelativeRectToViewportRelativeRect:GI,getDocumentElement:sa,getClippingRect:YI,getOffsetParent:dw,getElementRects:JI,getClientRects:VI,getDimensions:KI,getScale:Ml,isElement:$t,isRTL:$I};function pw(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function eR(e,t){let a=null,o,r=sa(e);function l(){var u;clearTimeout(o),(u=a)==null||u.disconnect(),a=null}function n(u,s){u===void 0&&(u=!1),s===void 0&&(s=1),l();let i=e.getBoundingClientRect(),{left:d,top:p,width:x,height:h}=i;if(u||t(),!x||!h)return;let b=ou(p),v=ou(r.clientWidth-(d+x)),y=ou(r.clientHeight-(p+h)),c=ou(d),m={rootMargin:-b+"px "+-v+"px "+-y+"px "+-c+"px",threshold:vt(0,ba(1,s))||1},g=!0;function S(I){let C=I[0].intersectionRatio;if(C!==s){if(!g)return n();C?n(!1,C):o=setTimeout(()=>{n(!1,1e-7)},1e3)}C===1&&!pw(i,e.getBoundingClientRect())&&n(),g=!1}try{a=new IntersectionObserver(S,{...m,root:r.ownerDocument})}catch{a=new IntersectionObserver(S,m)}a.observe(e)}return n(!0),l}function Up(e,t,a,o){o===void 0&&(o={});let{ancestorScroll:r=!0,ancestorResize:l=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:u=typeof IntersectionObserver=="function",animationFrame:s=!1}=o,i=Pp(e),d=r||l?[...i?hr(i):[],...t?hr(t):[]]:[];d.forEach(c=>{r&&c.addEventListener("scroll",a,{passive:!0}),l&&c.addEventListener("resize",a)});let p=i&&u?eR(i,a):null,x=-1,h=null;n&&(h=new ResizeObserver(c=>{let[f]=c;f&&f.target===i&&h&&t&&(h.unobserve(t),cancelAnimationFrame(x),x=requestAnimationFrame(()=>{var m;(m=h)==null||m.observe(t)})),a()}),i&&!s&&h.observe(i),t&&h.observe(t));let b,v=s?vr(e):null;s&&y();function y(){let c=vr(e);v&&!pw(v,c)&&a(),v=c,b=requestAnimationFrame(y)}return a(),()=>{var c;d.forEach(f=>{r&&f.removeEventListener("scroll",a),l&&f.removeEventListener("resize",a)}),p?.(),(c=h)==null||c.disconnect(),h=null,s&&cancelAnimationFrame(b)}}var mw=Yy;var hw=Ky,xw=jy,gw=Jy,vw=Wy,Hp=Xy;var bw=Qy,Np=(e,t,a)=>{let o=new Map,r={platform:cw,...a},l={...r.platform,_c:o};return Vy(e,t,{...r,platform:l})};var Ye=B(X(),1),ww=B(X(),1),Sw=B(zo(),1),tR=typeof document<"u",aR=function(){},Mi=tR?ww.useLayoutEffect:aR;function Di(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let a,o,r;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(a=e.length,a!==t.length)return!1;for(o=a;o--!==0;)if(!Di(e[o],t[o]))return!1;return!0}if(r=Object.keys(e),a=r.length,a!==Object.keys(t).length)return!1;for(o=a;o--!==0;)if(!{}.hasOwnProperty.call(t,r[o]))return!1;for(o=a;o--!==0;){let l=r[o];if(!(l==="_owner"&&e.$$typeof)&&!Di(e[l],t[l]))return!1}return!0}return e!==e&&t!==t}function Lw(e){return typeof window>"u"?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function yw(e,t){let a=Lw(e);return Math.round(t*a)/a}function zp(e){let t=Ye.useRef(e);return Mi(()=>{t.current=e}),t}function Cw(e){e===void 0&&(e={});let{placement:t="bottom",strategy:a="absolute",middleware:o=[],platform:r,elements:{reference:l,floating:n}={},transform:u=!0,whileElementsMounted:s,open:i}=e,[d,p]=Ye.useState({x:0,y:0,strategy:a,placement:t,middlewareData:{},isPositioned:!1}),[x,h]=Ye.useState(o);Di(x,o)||h(o);let[b,v]=Ye.useState(null),[y,c]=Ye.useState(null),f=Ye.useCallback(q=>{q!==I.current&&(I.current=q,v(q))},[]),m=Ye.useCallback(q=>{q!==C.current&&(C.current=q,c(q))},[]),g=l||b,S=n||y,I=Ye.useRef(null),C=Ye.useRef(null),L=Ye.useRef(d),R=s!=null,A=zp(s),z=zp(r),G=zp(i),ee=Ye.useCallback(()=>{if(!I.current||!C.current)return;let q={placement:t,strategy:a,middleware:x};z.current&&(q.platform=z.current),Np(I.current,C.current,q).then(le=>{let D={...le,isPositioned:G.current!==!1};Z.current&&!Di(L.current,D)&&(L.current=D,Sw.flushSync(()=>{p(D)}))})},[x,t,a,z,G]);Mi(()=>{i===!1&&L.current.isPositioned&&(L.current.isPositioned=!1,p(q=>({...q,isPositioned:!1})))},[i]);let Z=Ye.useRef(!1);Mi(()=>(Z.current=!0,()=>{Z.current=!1}),[]),Mi(()=>{if(g&&(I.current=g),S&&(C.current=S),g&&S){if(A.current)return A.current(g,S,ee);ee()}},[g,S,ee,A,R]);let te=Ye.useMemo(()=>({reference:I,floating:C,setReference:f,setFloating:m}),[f,m]),F=Ye.useMemo(()=>({reference:g,floating:S}),[g,S]),j=Ye.useMemo(()=>{let q={position:a,left:0,top:0};if(!F.floating)return q;let le=yw(F.floating,d.x),D=yw(F.floating,d.y);return u?{...q,transform:"translate("+le+"px, "+D+"px)",...Lw(F.floating)>=1.5&&{willChange:"transform"}}:{position:a,left:le,top:D}},[a,u,F.floating,d.x,d.y]);return Ye.useMemo(()=>({...d,update:ee,refs:te,elements:F,floatingStyles:j}),[d,ee,te,F,j])}var oR=e=>{function t(a){return{}.hasOwnProperty.call(a,"current")}return{name:"arrow",options:e,fn(a){let{element:o,padding:r}=typeof e=="function"?e(a):e;return o&&t(o)?o.current!=null?Hp({element:o.current,padding:r}).fn(a):{}:o?Hp({element:o,padding:r}).fn(a):{}}}},Iw=(e,t)=>{let a=mw(e);return{name:a.name,fn:a.fn,options:[e,t]}},Rw=(e,t)=>{let a=hw(e);return{name:a.name,fn:a.fn,options:[e,t]}},kw=(e,t)=>({fn:bw(e).fn,options:[e,t]}),Aw=(e,t)=>{let a=xw(e);return{name:a.name,fn:a.fn,options:[e,t]}},Mw=(e,t)=>{let a=gw(e);return{name:a.name,fn:a.fn,options:[e,t]}};var Dw=(e,t)=>{let a=vw(e);return{name:a.name,fn:a.fn,options:[e,t]}};var Tw=(e,t)=>{let a=oR(e);return{name:a.name,fn:a.fn,options:[e,t]}};var Ew=B(X(),1);var qp=B(Ze(),1),rR="Arrow",Ow=Ew.forwardRef((e,t)=>{let{children:a,width:o=10,height:r=5,...l}=e;return(0,qp.jsx)(ne.svg,{...l,ref:t,width:o,height:r,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?a:(0,qp.jsx)("polygon",{points:"0,0 30,0 15,10"})})});Ow.displayName=rR;var Bw=Ow;var Pw=B(X(),1);function Uw(e){let[t,a]=Pw.useState(void 0);return Be(()=>{if(e){a({width:e.offsetWidth,height:e.offsetHeight});let o=new ResizeObserver(r=>{if(!Array.isArray(r)||!r.length)return;let l=r[0],n,u;if("borderBoxSize"in l){let s=l.borderBoxSize,i=Array.isArray(s)?s[0]:s;n=i.inlineSize,u=i.blockSize}else n=e.offsetWidth,u=e.offsetHeight;a({width:n,height:u})});return o.observe(e,{box:"border-box"}),()=>o.unobserve(e)}else a(void 0)},[e]),t}var Do=B(Ze(),1);var Fp="Popper",[Hw,_p]=ko(Fp),[nR,Nw]=Hw(Fp),zw=e=>{let{__scopePopper:t,children:a}=e,[o,r]=it.useState(null),[l,n]=it.useState(void 0);return(0,Do.jsx)(nR,{scope:t,anchor:o,onAnchorChange:r,placementState:l,setPlacementState:n,children:a})};zw.displayName=Fp;var qw="PopperAnchor",Fw=it.forwardRef((e,t)=>{let{__scopePopper:a,virtualRef:o,...r}=e,l=Nw(qw,a),n=it.useRef(null),u=l.onAnchorChange,s=it.useCallback(b=>{n.current=b,b&&u(b)},[u]),i=ye(t,s),d=it.useRef(null);it.useEffect(()=>{if(!o)return;let b=d.current;d.current=o.current,b!==d.current&&u(d.current)});let p=l.placementState&&Vp(l.placementState),x=p?.[0],h=p?.[1];return o?null:(0,Do.jsx)(ne.div,{"data-radix-popper-side":x,"data-radix-popper-align":h,...r,ref:i})});Fw.displayName=qw;var Gp="PopperContent",[uR,sR]=Hw(Gp),_w=it.forwardRef((e,t)=>{let{__scopePopper:a,side:o="bottom",sideOffset:r=0,align:l="center",alignOffset:n=0,arrowPadding:u=0,avoidCollisions:s=!0,collisionBoundary:i=[],collisionPadding:d=0,sticky:p="partial",hideWhenDetached:x=!1,updatePositionStrategy:h="optimized",onPlaced:b,...v}=e,y=Nw(Gp,a),[c,f]=it.useState(null),m=ye(t,ue=>f(ue)),[g,S]=it.useState(null),I=Uw(g),C=I?.width??0,L=I?.height??0,R=o+(l!=="center"?"-"+l:""),A=typeof d=="number"?d:{top:0,right:0,bottom:0,left:0,...d},z=Array.isArray(i)?i:[i],G=z.length>0,ee={padding:A,boundary:z.filter(fR),altBoundary:G},{refs:Z,floatingStyles:te,placement:F,isPositioned:j,middlewareData:q}=Cw({strategy:"fixed",placement:R,whileElementsMounted:(...ue)=>Up(...ue,{animationFrame:h==="always"}),elements:{reference:y.anchor},middleware:[Iw({mainAxis:r+L,alignmentAxis:n}),s&&Rw({mainAxis:!0,crossAxis:!1,limiter:p==="partial"?kw():void 0,...ee}),s&&Aw({...ee}),Mw({...ee,apply:({elements:ue,rects:K,availableWidth:se,availableHeight:fe})=>{let{width:xe,height:dt}=K.reference,T=ue.floating.style;T.setProperty("--radix-popper-available-width",`${se}px`),T.setProperty("--radix-popper-available-height",`${fe}px`),T.setProperty("--radix-popper-anchor-width",`${xe}px`),T.setProperty("--radix-popper-anchor-height",`${dt}px`)}}),g&&Tw({element:g,padding:u}),dR({arrowWidth:C,arrowHeight:L}),x&&Dw({strategy:"referenceHidden",...ee,boundary:G?ee.boundary:void 0})]}),le=y.setPlacementState;Be(()=>(le(F),()=>{le(void 0)}),[F,le]);let[D,Ne]=Vp(F),Ke=Qt(b);Be(()=>{j&&Ke?.()},[j,Ke]);let ft=q.arrow?.x,bt=q.arrow?.y,Te=q.arrow?.centerOffset!==0,[Le,_]=it.useState();return Be(()=>{c&&_(window.getComputedStyle(c).zIndex)},[c]),(0,Do.jsx)("div",{ref:Z.setFloating,"data-radix-popper-content-wrapper":"",style:{...te,transform:j?te.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:Le,"--radix-popper-transform-origin":[q.transformOrigin?.x,q.transformOrigin?.y].join(" "),...q.hide?.referenceHidden&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:(0,Do.jsx)(uR,{scope:a,placedSide:D,placedAlign:Ne,onArrowChange:S,arrowX:ft,arrowY:bt,shouldHideArrow:Te,children:(0,Do.jsx)(ne.div,{"data-side":D,"data-align":Ne,...v,ref:m,style:{...v.style,animation:j?void 0:"none"}})})})});_w.displayName=Gp;var Gw="PopperArrow",iR={top:"bottom",right:"left",bottom:"top",left:"right"},Vw=it.forwardRef(function(t,a){let{__scopePopper:o,...r}=t,l=sR(Gw,o),n=iR[l.placedSide];return(0,Do.jsx)("span",{ref:l.onArrowChange,style:{position:"absolute",left:l.arrowX,top:l.arrowY,[n]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[l.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[l.placedSide],visibility:l.shouldHideArrow?"hidden":void 0},children:(0,Do.jsx)(Bw,{...r,ref:a,style:{...r.style,display:"block"}})})});Vw.displayName=Gw;function fR(e){return e!==null}var dR=e=>({name:"transformOrigin",options:e,fn(t){let{placement:a,rects:o,middlewareData:r}=t,n=r.arrow?.centerOffset!==0,u=n?0:e.arrowWidth,s=n?0:e.arrowHeight,[i,d]=Vp(a),p={start:"0%",center:"50%",end:"100%"}[d],x=(r.arrow?.x??0)+u/2,h=(r.arrow?.y??0)+s/2,b="",v="";return i==="bottom"?(b=n?p:`${x}px`,v=`${-s}px`):i==="top"?(b=n?p:`${x}px`,v=`${o.floating.height+s}px`):i==="right"?(b=`${-s}px`,v=n?p:`${h}px`):i==="left"&&(b=`${o.floating.width+s}px`,v=n?p:`${h}px`),{data:{x:b,y:v}}}});function Vp(e){let[t,a="center"]=e.split("-");return[t,a]}var Xw=zw,jw=Fw,Ww=_w,Zw=Vw;var Ti=B(X(),1);function Yw(e){let t=Ti.useRef({value:e,previous:e});return Ti.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}var Kw=B(X(),1);var Qw=B(Ze(),1),Xp=Object.freeze({position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal"}),pR="VisuallyHidden",mR=Kw.forwardRef((e,t)=>(0,Qw.jsx)(ne.span,{...e,ref:t,style:{...Xp,...e.style}}));mR.displayName=pR;var N=B(Ze(),1),hR=[" ","Enter","ArrowUp","ArrowDown"],xR=[" ","Enter"],br="Select",[Oi,Bi,gR]=Ey(br),[yr,C5]=ko(br,[gR,_p]),Pi=_p(),[vR,Eo]=yr(br),[bR,yR]=yr(br),wR="SelectProvider";function Jw(e){let{__scopeSelect:t,children:a,open:o,defaultOpen:r,onOpenChange:l,value:n,defaultValue:u,onValueChange:s,dir:i,name:d,autoComplete:p,disabled:x,required:h,form:b,internal_do_not_use_render:v}=e,y=Pi(t),[c,f]=E.useState(null),[m,g]=E.useState(null),[S,I]=E.useState(!1),C=Oy(i),[L,R]=Wn({prop:o,defaultProp:r??!1,onChange:l,caller:br}),[A,z]=Wn({prop:n,defaultProp:u,onChange:s,caller:br}),G=E.useRef(null),ee=c?!!b||!!c.closest("form"):!0,[Z,te]=E.useState(new Set),F=Ao(),j=Array.from(Z).map(Ne=>Ne.props.value).join(";"),q=E.useCallback(Ne=>{te(Ke=>new Set(Ke).add(Ne))},[]),le=E.useCallback(Ne=>{te(Ke=>{let ft=new Set(Ke);return ft.delete(Ne),ft})},[]),D={required:h,trigger:c,onTriggerChange:f,valueNode:m,onValueNodeChange:g,valueNodeHasChildren:S,onValueNodeHasChildrenChange:I,contentId:F,value:A,onValueChange:z,open:L,onOpenChange:R,dir:C,triggerPointerDownPosRef:G,disabled:x,name:d,autoComplete:p,form:b,nativeOptions:Z,nativeSelectKey:j,isFormControl:ee};return(0,N.jsx)(Xw,{...y,children:(0,N.jsx)(vR,{scope:t,...D,children:(0,N.jsx)(Oi.Provider,{scope:t,children:(0,N.jsx)(bR,{scope:t,onNativeOptionAdd:q,onNativeOptionRemove:le,children:qR(v)?v(D):a})})})})}Jw.displayName=wR;var $w=e=>{let{__scopeSelect:t,children:a,...o}=e;return(0,N.jsx)(Jw,{__scopeSelect:t,...o,internal_do_not_use_render:({isFormControl:r})=>(0,N.jsxs)(N.Fragment,{children:[a,r?(0,N.jsx)(xS,{__scopeSelect:t}):null]})})};$w.displayName=br;var eS="SelectTrigger",Qp=E.forwardRef((e,t)=>{let{__scopeSelect:a,disabled:o=!1,...r}=e,l=Pi(a),n=Eo(eS,a),u=n.disabled||o,s=ye(t,n.onTriggerChange),i=Bi(a),d=E.useRef("touch"),[p,x,h]=gS(v=>{let y=i().filter(m=>!m.disabled),c=y.find(m=>m.value===n.value),f=vS(y,v,c);f!==void 0&&n.onValueChange(f.value)}),b=v=>{u||(n.onOpenChange(!0),h()),v&&(n.triggerPointerDownPosRef.current={x:Math.round(v.pageX),y:Math.round(v.pageY)})};return(0,N.jsx)(jw,{asChild:!0,...l,children:(0,N.jsx)(ne.button,{type:"button",role:"combobox","aria-controls":n.open?n.contentId:void 0,"aria-expanded":n.open,"aria-required":n.required,"aria-autocomplete":"none",dir:n.dir,"data-state":n.open?"open":"closed",disabled:u,"data-disabled":u?"":void 0,"data-placeholder":Ui(n.value)?"":void 0,...r,ref:s,onClick:be(r.onClick,v=>{v.currentTarget.focus(),d.current!=="mouse"&&b(v)}),onPointerDown:be(r.onPointerDown,v=>{d.current=v.pointerType;let y=v.target;y.hasPointerCapture(v.pointerId)&&y.releasePointerCapture(v.pointerId),v.button===0&&v.ctrlKey===!1&&v.pointerType==="mouse"&&(b(v),v.preventDefault())}),onKeyDown:be(r.onKeyDown,v=>{let y=p.current!=="";!(v.ctrlKey||v.altKey||v.metaKey)&&v.key.length===1&&x(v.key),!(y&&v.key===" ")&&hR.includes(v.key)&&(b(),v.preventDefault())})})})});Qp.displayName=eS;var tS="SelectValue",aS=E.forwardRef((e,t)=>{let{__scopeSelect:a,className:o,style:r,children:l,placeholder:n="",...u}=e,s=Eo(tS,a),{onValueNodeHasChildrenChange:i}=s,d=l!==void 0,p=ye(t,s.onValueNodeChange);Be(()=>{i(d)},[i,d]);let x=Ui(s.value);return(0,N.jsx)(ne.span,{...u,asChild:x?!1:u.asChild,ref:p,style:{pointerEvents:"none"},children:(0,N.jsx)(E.Fragment,{children:x?n:l},x?"placeholder":"value")})});aS.displayName=tS;var SR="SelectIcon",Jp=E.forwardRef((e,t)=>{let{__scopeSelect:a,children:o,...r}=e;return(0,N.jsx)(ne.span,{"aria-hidden":!0,...r,ref:t,children:o||"\u25BC"})});Jp.displayName=SR;var oS="SelectPortal",[LR,CR]=yr(oS,{forceMount:void 0}),IR=e=>{let{__scopeSelect:t,forceMount:a,...o}=e;return(0,N.jsx)(LR,{scope:e.__scopeSelect,forceMount:a,children:(0,N.jsx)(Kn,{asChild:!0,...o})})};IR.displayName=oS;var To="SelectContent",$p=E.forwardRef((e,t)=>{let a=CR(To,e.__scopeSelect),{forceMount:o=a.forceMount,...r}=e,l=Eo(To,e.__scopeSelect),[n,u]=E.useState();return Be(()=>{u(new DocumentFragment)},[]),(0,N.jsx)(sr,{present:o||l.open,children:({present:s})=>s?(0,N.jsx)(nS,{...r,ref:t}):(0,N.jsx)(rS,{...r,fragment:n})})});$p.displayName=To;var rS=E.forwardRef((e,t)=>{let{__scopeSelect:a,children:o,fragment:r}=e;return r?Kp.createPortal((0,N.jsx)(lS,{scope:a,children:(0,N.jsx)(Oi.Slot,{scope:a,children:(0,N.jsx)("div",{ref:t,children:o})})}),r):null});rS.displayName="SelectContentFragment";var ia=10,[lS,Oo]=yr(To),RR="SelectContentImpl",kR=Wa("SelectContent.RemoveScroll"),nS=E.forwardRef((e,t)=>{let{__scopeSelect:a}=e,{position:o="item-aligned",onCloseAutoFocus:r,onEscapeKeyDown:l,onPointerDownOutside:n,side:u,sideOffset:s,align:i,alignOffset:d,arrowPadding:p,collisionBoundary:x,collisionPadding:h,sticky:b,hideWhenDetached:v,avoidCollisions:y,...c}=e,f=Eo(To,a),[m,g]=E.useState(null),[S,I]=E.useState(null),C=ye(t,_=>g(_)),[L,R]=E.useState(null),[A,z]=E.useState(null),G=Bi(a),[ee,Z]=E.useState(!1),te=E.useRef(!1);E.useEffect(()=>{if(m)return ci(m)},[m]),oi();let F=E.useCallback(_=>{let[ue,...K]=G().map(xe=>xe.ref.current),[se]=K.slice(-1),fe=document.activeElement;for(let xe of _)if(xe===fe||(xe?.scrollIntoView({block:"nearest"}),xe===ue&&S&&(S.scrollTop=0),xe===se&&S&&(S.scrollTop=S.scrollHeight),xe?.focus(),document.activeElement!==fe))return},[G,S]),j=E.useCallback(()=>F([L,m]),[F,L,m]);E.useEffect(()=>{ee&&j()},[ee,j]);let{onOpenChange:q,triggerPointerDownPosRef:le}=f;E.useEffect(()=>{if(m){let _={x:0,y:0},ue=se=>{_={x:Math.abs(Math.round(se.pageX)-(le.current?.x??0)),y:Math.abs(Math.round(se.pageY)-(le.current?.y??0))}},K=se=>{_.x<=10&&_.y<=10?se.preventDefault():se.composedPath().includes(m)||q(!1),document.removeEventListener("pointermove",ue),le.current=null};return le.current!==null&&(document.addEventListener("pointermove",ue),document.addEventListener("pointerup",K,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",ue),document.removeEventListener("pointerup",K,{capture:!0})}}},[m,q,le]),E.useEffect(()=>{let _=()=>q(!1);return window.addEventListener("blur",_),window.addEventListener("resize",_),()=>{window.removeEventListener("blur",_),window.removeEventListener("resize",_)}},[q]);let[D,Ne]=gS(_=>{let ue=G().filter(fe=>!fe.disabled),K=ue.find(fe=>fe.ref.current===document.activeElement),se=vS(ue,_,K);se&&setTimeout(()=>se.ref.current?.focus())}),Ke=E.useCallback((_,ue,K)=>{let se=!te.current&&!K;(f.value!==void 0&&f.value===ue||se)&&(R(_),se&&(te.current=!0))},[f.value]),ft=E.useCallback(()=>m?.focus(),[m]),bt=E.useCallback((_,ue,K)=>{let se=!te.current&&!K;(f.value!==void 0&&f.value===ue||se)&&z(_)},[f.value]),Te=o==="popper"?jp:uS,Le=Te===jp?{side:u,sideOffset:s,align:i,alignOffset:d,arrowPadding:p,collisionBoundary:x,collisionPadding:h,sticky:b,hideWhenDetached:v,avoidCollisions:y}:{};return(0,N.jsx)(lS,{scope:a,content:m,viewport:S,onViewportChange:I,itemRefCallback:Ke,selectedItem:L,onItemLeave:ft,itemTextRefCallback:bt,focusSelectedItem:j,selectedItemText:A,position:o,isPositioned:ee,searchRef:D,children:(0,N.jsx)(eu,{as:kR,allowPinchZoom:!0,children:(0,N.jsx)(Yn,{asChild:!0,trapped:f.open,onMountAutoFocus:_=>{_.preventDefault()},onUnmountAutoFocus:be(r,_=>{f.trigger?.focus({preventScroll:!0}),_.preventDefault()}),children:(0,N.jsx)(Zn,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:l,onPointerDownOutside:n,onFocusOutside:_=>_.preventDefault(),onDismiss:()=>f.onOpenChange(!1),children:(0,N.jsx)(Te,{role:"listbox",id:f.contentId,"data-state":f.open?"open":"closed",dir:f.dir,onContextMenu:_=>_.preventDefault(),...c,...Le,onPlaced:()=>Z(!0),ref:C,style:{display:"flex",flexDirection:"column",outline:"none",...c.style},onKeyDown:be(c.onKeyDown,_=>{let ue=_.ctrlKey||_.altKey||_.metaKey;if(_.key==="Tab"&&_.preventDefault(),!ue&&_.key.length===1&&Ne(_.key),["ArrowUp","ArrowDown","Home","End"].includes(_.key)){let se=G().filter(fe=>!fe.disabled).map(fe=>fe.ref.current);if(["ArrowUp","End"].includes(_.key)&&(se=se.slice().reverse()),["ArrowUp","ArrowDown"].includes(_.key)){let fe=_.target,xe=se.indexOf(fe);se=se.slice(xe+1)}setTimeout(()=>F(se)),_.preventDefault()}})})})})})})});nS.displayName=RR;var AR="SelectItemAlignedPosition",uS=E.forwardRef((e,t)=>{let{__scopeSelect:a,onPlaced:o,...r}=e,l=Eo(To,a),n=Oo(To,a),[u,s]=E.useState(null),[i,d]=E.useState(null),p=ye(t,C=>d(C)),x=Bi(a),h=E.useRef(!1),b=E.useRef(!0),{viewport:v,selectedItem:y,selectedItemText:c,focusSelectedItem:f}=n,m=E.useCallback(()=>{if(l.trigger&&l.valueNode&&u&&i&&v&&y&&c){let C=l.trigger.getBoundingClientRect(),L=i.getBoundingClientRect(),R=l.valueNode.getBoundingClientRect(),A=c.getBoundingClientRect();if(l.dir!=="rtl"){let fe=A.left-L.left,xe=R.left-fe,dt=C.left-xe,T=C.width+dt,ie=Math.max(T,L.width),Fe=window.innerWidth-ia,fa=Tp(xe,[ia,Math.max(ia,Fe-ie)]);u.style.minWidth=T+"px",u.style.left=fa+"px"}else{let fe=L.right-A.right,xe=window.innerWidth-R.right-fe,dt=window.innerWidth-C.right-xe,T=C.width+dt,ie=Math.max(T,L.width),Fe=window.innerWidth-ia,fa=Tp(xe,[ia,Math.max(ia,Fe-ie)]);u.style.minWidth=T+"px",u.style.right=fa+"px"}let z=x(),G=window.innerHeight-ia*2,ee=v.scrollHeight,Z=window.getComputedStyle(i),te=parseInt(Z.borderTopWidth,10),F=parseInt(Z.paddingTop,10),j=parseInt(Z.borderBottomWidth,10),q=parseInt(Z.paddingBottom,10),le=te+F+ee+q+j,D=Math.min(y.offsetHeight*5,le),Ne=window.getComputedStyle(v),Ke=parseInt(Ne.paddingTop,10),ft=parseInt(Ne.paddingBottom,10),bt=C.top+C.height/2-ia,Te=G-bt,Le=y.offsetHeight/2,_=y.offsetTop+Le,ue=te+F+_,K=le-ue;if(ue<=bt){let fe=z.length>0&&y===z[z.length-1].ref.current;u.style.bottom="0px";let xe=i.clientHeight-v.offsetTop-v.offsetHeight,dt=Math.max(Te,Le+(fe?ft:0)+xe+j),T=ue+dt;u.style.height=T+"px"}else{let fe=z.length>0&&y===z[0].ref.current;u.style.top="0px";let dt=Math.max(bt,te+v.offsetTop+(fe?Ke:0)+Le)+K;u.style.height=dt+"px",v.scrollTop=ue-bt+v.offsetTop}u.style.margin=`${ia}px 0`,u.style.minHeight=D+"px",u.style.maxHeight=G+"px",o?.(),requestAnimationFrame(()=>h.current=!0)}},[x,l.trigger,l.valueNode,u,i,v,y,c,l.dir,o]);Be(()=>m(),[m]);let[g,S]=E.useState();Be(()=>{i&&S(window.getComputedStyle(i).zIndex)},[i]);let I=E.useCallback(C=>{C&&b.current===!0&&(m(),f?.(),b.current=!1)},[m,f]);return(0,N.jsx)(DR,{scope:a,contentWrapper:u,shouldExpandOnScrollRef:h,onScrollButtonChange:I,children:(0,N.jsx)("div",{ref:s,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:g},children:(0,N.jsx)(ne.div,{...r,ref:p,style:{boxSizing:"border-box",maxHeight:"100%",...r.style}})})})});uS.displayName=AR;var MR="SelectPopperPosition",jp=E.forwardRef((e,t)=>{let{__scopeSelect:a,align:o="start",collisionPadding:r=ia,...l}=e,n=Pi(a);return(0,N.jsx)(Ww,{...n,...l,ref:t,align:o,collisionPadding:r,style:{boxSizing:"border-box",...l.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});jp.displayName=MR;var[DR,em]=yr(To,{}),Wp="SelectViewport",tm=E.forwardRef((e,t)=>{let{__scopeSelect:a,nonce:o,...r}=e,l=Oo(Wp,a),n=em(Wp,a),u=ye(t,l.onViewportChange),s=E.useRef(0);return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:o}),(0,N.jsx)(Oi.Slot,{scope:a,children:(0,N.jsx)(ne.div,{"data-radix-select-viewport":"",role:"presentation",...r,ref:u,style:{position:"relative",flex:1,overflow:"hidden auto",...r.style},onScroll:be(r.onScroll,i=>{let d=i.currentTarget,{contentWrapper:p,shouldExpandOnScrollRef:x}=n;if(x?.current&&p){let h=Math.abs(s.current-d.scrollTop);if(h>0){let b=window.innerHeight-ia*2,v=parseFloat(p.style.minHeight),y=parseFloat(p.style.height),c=Math.max(v,y);if(c<b){let f=c+h,m=Math.min(b,f),g=f-m;p.style.height=m+"px",p.style.bottom==="0px"&&(d.scrollTop=g>0?g:0,p.style.justifyContent="flex-end")}}}s.current=d.scrollTop})})})]})});tm.displayName=Wp;var sS="SelectGroup",[TR,ER]=yr(sS),iS=E.forwardRef((e,t)=>{let{__scopeSelect:a,...o}=e,r=Ao();return(0,N.jsx)(TR,{scope:a,id:r,children:(0,N.jsx)(ne.div,{role:"group","aria-labelledby":r,...o,ref:t})})});iS.displayName=sS;var fS="SelectLabel",OR=E.forwardRef((e,t)=>{let{__scopeSelect:a,...o}=e,r=ER(fS,a);return(0,N.jsx)(ne.div,{id:r.id,...o,ref:t})});OR.displayName=fS;var Ei="SelectItem",[BR,dS]=yr(Ei),am=E.forwardRef((e,t)=>{let{__scopeSelect:a,value:o,disabled:r=!1,textValue:l,...n}=e,u=Eo(Ei,a),s=Oo(Ei,a),i=u.value===o,[d,p]=E.useState(l??""),[x,h]=E.useState(!1),b=ye(t,f=>s.itemRefCallback?.(f,o,r)),v=Ao(),y=E.useRef("touch"),c=()=>{r||(u.onValueChange(o),u.onOpenChange(!1))};return(0,N.jsx)(BR,{scope:a,value:o,disabled:r,textId:v,isSelected:i,onItemTextChange:E.useCallback(f=>{p(m=>m||(f?.textContent??"").trim())},[]),children:(0,N.jsx)(Oi.ItemSlot,{scope:a,value:o,disabled:r,textValue:d,children:(0,N.jsx)(ne.div,{role:"option","aria-labelledby":v,"data-highlighted":x?"":void 0,"aria-selected":i&&x,"data-state":i?"checked":"unchecked","aria-disabled":r||void 0,"data-disabled":r?"":void 0,tabIndex:r?void 0:-1,...n,ref:b,onFocus:be(n.onFocus,()=>h(!0)),onBlur:be(n.onBlur,()=>h(!1)),onClick:be(n.onClick,()=>{y.current!=="mouse"&&c()}),onPointerUp:be(n.onPointerUp,()=>{y.current==="mouse"&&c()}),onPointerDown:be(n.onPointerDown,f=>{y.current=f.pointerType}),onPointerMove:be(n.onPointerMove,f=>{y.current=f.pointerType,r?s.onItemLeave?.():y.current==="mouse"&&f.currentTarget.focus({preventScroll:!0})}),onPointerLeave:be(n.onPointerLeave,f=>{f.currentTarget===document.activeElement&&s.onItemLeave?.()}),onKeyDown:be(n.onKeyDown,f=>{s.searchRef?.current!==""&&f.key===" "||(xR.includes(f.key)&&c(),f.key===" "&&f.preventDefault())})})})})});am.displayName=Ei;var nu="SelectItemText",om=E.forwardRef((e,t)=>{let{__scopeSelect:a,className:o,style:r,...l}=e,n=Eo(nu,a),u=Oo(nu,a),s=dS(nu,a),i=yR(nu,a),[d,p]=E.useState(null),x=ye(t,c=>p(c),s.onItemTextChange,c=>u.itemTextRefCallback?.(c,s.value,s.disabled)),h=d?.textContent,b=E.useMemo(()=>(0,N.jsx)("option",{value:s.value,disabled:s.disabled,children:h},s.value),[s.disabled,s.value,h]),{onNativeOptionAdd:v,onNativeOptionRemove:y}=i;return Be(()=>(v(b),()=>y(b)),[v,y,b]),(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(ne.span,{id:s.textId,...l,ref:x}),s.isSelected&&n.valueNode&&!n.valueNodeHasChildren&&!Ui(n.value)?Kp.createPortal(l.children,n.valueNode):null]})});om.displayName=nu;var cS="SelectItemIndicator",rm=E.forwardRef((e,t)=>{let{__scopeSelect:a,...o}=e;return dS(cS,a).isSelected?(0,N.jsx)(ne.span,{"aria-hidden":!0,...o,ref:t}):null});rm.displayName=cS;var Zp="SelectScrollUpButton",PR=E.forwardRef((e,t)=>{let a=Oo(Zp,e.__scopeSelect),o=em(Zp,e.__scopeSelect),[r,l]=E.useState(!1),n=ye(t,o.onScrollButtonChange);return Be(()=>{if(a.viewport&&a.isPositioned){let s=function(){let d=i.scrollTop>0;l(d)};var u=s;let i=a.viewport;return s(),i.addEventListener("scroll",s),()=>i.removeEventListener("scroll",s)}},[a.viewport,a.isPositioned]),r?(0,N.jsx)(pS,{...e,ref:n,onAutoScroll:()=>{let{viewport:u,selectedItem:s}=a;u&&s&&(u.scrollTop=u.scrollTop-s.offsetHeight)}}):null});PR.displayName=Zp;var Yp="SelectScrollDownButton",UR=E.forwardRef((e,t)=>{let a=Oo(Yp,e.__scopeSelect),o=em(Yp,e.__scopeSelect),[r,l]=E.useState(!1),n=ye(t,o.onScrollButtonChange);return Be(()=>{if(a.viewport&&a.isPositioned){let s=function(){let d=i.scrollHeight-i.clientHeight,p=Math.ceil(i.scrollTop)<d;l(p)};var u=s;let i=a.viewport;return s(),i.addEventListener("scroll",s),()=>i.removeEventListener("scroll",s)}},[a.viewport,a.isPositioned]),r?(0,N.jsx)(pS,{...e,ref:n,onAutoScroll:()=>{let{viewport:u,selectedItem:s}=a;u&&s&&(u.scrollTop=u.scrollTop+s.offsetHeight)}}):null});UR.displayName=Yp;var pS=E.forwardRef((e,t)=>{let{__scopeSelect:a,onAutoScroll:o,...r}=e,l=Oo("SelectScrollButton",a),n=E.useRef(null),u=Bi(a),s=E.useCallback(()=>{n.current!==null&&(window.clearInterval(n.current),n.current=null)},[]);return E.useEffect(()=>()=>s(),[s]),Be(()=>{u().find(d=>d.ref.current===document.activeElement)?.ref.current?.scrollIntoView({block:"nearest"})},[u]),(0,N.jsx)(ne.div,{"aria-hidden":!0,...r,ref:t,style:{flexShrink:0,...r.style},onPointerDown:be(r.onPointerDown,()=>{n.current===null&&(n.current=window.setInterval(o,50))}),onPointerMove:be(r.onPointerMove,()=>{l.onItemLeave?.(),n.current===null&&(n.current=window.setInterval(o,50))}),onPointerLeave:be(r.onPointerLeave,()=>{s()})})}),HR="SelectSeparator",NR=E.forwardRef((e,t)=>{let{__scopeSelect:a,...o}=e;return(0,N.jsx)(ne.div,{"aria-hidden":!0,...o,ref:t})});NR.displayName=HR;var mS="SelectArrow",zR=E.forwardRef((e,t)=>{let{__scopeSelect:a,...o}=e,r=Pi(a);return Oo(mS,a).position==="popper"?(0,N.jsx)(Zw,{...r,...o,ref:t}):null});zR.displayName=mS;var hS="SelectBubbleInput",xS=E.forwardRef(({__scopeSelect:e,...t},a)=>{let o=Eo(hS,e),{value:r,onValueChange:l,required:n,disabled:u,name:s,autoComplete:i,form:d}=o,{nativeOptions:p,nativeSelectKey:x}=o,h=E.useRef(null),b=ye(a,h),v=r??"",y=Yw(v),c=Array.from(p).some(f=>(f.props.value??"")==="");return E.useEffect(()=>{let f=h.current;if(!f)return;let m=window.HTMLSelectElement.prototype,S=Object.getOwnPropertyDescriptor(m,"value").set;if(y!==v&&S){let I=new Event("change",{bubbles:!0});S.call(f,v),f.dispatchEvent(I)}},[y,v]),(0,N.jsxs)(ne.select,{"aria-hidden":!0,required:n,tabIndex:-1,name:s,autoComplete:i,disabled:u,form:d,onChange:f=>l(f.target.value),...t,style:{...Xp,...t.style},ref:b,defaultValue:v,children:[Ui(r)&&!c?(0,N.jsx)("option",{value:""}):null,Array.from(p)]},x)});xS.displayName=hS;function qR(e){return typeof e=="function"}function Ui(e){return e===""||e===void 0}function gS(e){let t=Qt(e),a=E.useRef(""),o=E.useRef(0),r=E.useCallback(n=>{let u=a.current+n;t(u),function s(i){a.current=i,window.clearTimeout(o.current),i!==""&&(o.current=window.setTimeout(()=>s(""),1e3))}(u)},[t]),l=E.useCallback(()=>{a.current="",window.clearTimeout(o.current)},[]);return E.useEffect(()=>()=>window.clearTimeout(o.current),[]),[a,r,l]}function vS(e,t,a){let r=t.length>1&&Array.from(t).every(i=>i===t[0])?t[0]:t,l=a?e.indexOf(a):-1,n=FR(e,Math.max(l,0));r.length===1&&(n=n.filter(i=>i!==a));let s=n.find(i=>i.textValue.toLowerCase().startsWith(r.toLowerCase()));return s!==a?s:void 0}function FR(e,t){return e.map((a,o)=>e[(t+o)%e.length])}function bS(e){var t,a,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var r=e.length;for(t=0;t<r;t++)e[t]&&(a=bS(e[t]))&&(o&&(o+=" "),o+=a)}else for(a in e)e[a]&&(o&&(o+=" "),o+=a);return o}function yS(){for(var e,t,a=0,o="",r=arguments.length;a<r;a++)(e=arguments[a])&&(t=bS(e))&&(o&&(o+=" "),o+=t);return o}var GR=(e,t)=>{let a=new Array(e.length+t.length);for(let o=0;o<e.length;o++)a[o]=e[o];for(let o=0;o<t.length;o++)a[e.length+o]=t[o];return a},VR=(e,t)=>({classGroupId:e,validator:t}),kS=(e=new Map,t=null,a)=>({nextPart:e,validators:t,classGroupId:a}),zi="-",wS=[],XR="arbitrary..",jR=e=>{let t=ZR(e),{conflictingClassGroups:a,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:n=>{if(n.startsWith("[")&&n.endsWith("]"))return WR(n);let u=n.split(zi),s=u[0]===""&&u.length>1?1:0;return AS(u,s,t)},getConflictingClassGroupIds:(n,u)=>{if(u){let s=o[n],i=a[n];return s?i?GR(i,s):s:i||wS}return a[n]||wS}}},AS=(e,t,a)=>{if(e.length-t===0)return a.classGroupId;let r=e[t],l=a.nextPart.get(r);if(l){let i=AS(e,t+1,l);if(i)return i}let n=a.validators;if(n===null)return;let u=t===0?e.join(zi):e.slice(t).join(zi),s=n.length;for(let i=0;i<s;i++){let d=n[i];if(d.validator(u))return d.classGroupId}},WR=e=>e.slice(1,-1).indexOf(":")===-1?void 0:(()=>{let t=e.slice(1,-1),a=t.indexOf(":"),o=t.slice(0,a);return o?XR+o:void 0})(),ZR=e=>{let{theme:t,classGroups:a}=e;return YR(a,t)},YR=(e,t)=>{let a=kS();for(let o in e){let r=e[o];um(r,a,o,t)}return a},um=(e,t,a,o)=>{let r=e.length;for(let l=0;l<r;l++){let n=e[l];KR(n,t,a,o)}},KR=(e,t,a,o)=>{if(typeof e=="string"){QR(e,t,a);return}if(typeof e=="function"){JR(e,t,a,o);return}$R(e,t,a,o)},QR=(e,t,a)=>{let o=e===""?t:MS(t,e);o.classGroupId=a},JR=(e,t,a,o)=>{if(ek(e)){um(e(o),t,a,o);return}t.validators===null&&(t.validators=[]),t.validators.push(VR(a,e))},$R=(e,t,a,o)=>{let r=Object.entries(e),l=r.length;for(let n=0;n<l;n++){let[u,s]=r[n];um(s,MS(t,u),a,o)}},MS=(e,t)=>{let a=e,o=t.split(zi),r=o.length;for(let l=0;l<r;l++){let n=o[l],u=a.nextPart.get(n);u||(u=kS(),a.nextPart.set(n,u)),a=u}return a},ek=e=>"isThemeGetter"in e&&e.isThemeGetter===!0,tk=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,a=Object.create(null),o=Object.create(null),r=(l,n)=>{a[l]=n,t++,t>e&&(t=0,o=a,a=Object.create(null))};return{get(l){let n=a[l];if(n!==void 0)return n;if((n=o[l])!==void 0)return r(l,n),n},set(l,n){l in a?a[l]=n:r(l,n)}}},nm="!",SS=":",ak=[],LS=(e,t,a,o,r)=>({modifiers:e,hasImportantModifier:t,baseClassName:a,maybePostfixModifierPosition:o,isExternal:r}),ok=e=>{let{prefix:t,experimentalParseClassName:a}=e,o=r=>{let l=[],n=0,u=0,s=0,i,d=r.length;for(let v=0;v<d;v++){let y=r[v];if(n===0&&u===0){if(y===SS){l.push(r.slice(s,v)),s=v+1;continue}if(y==="/"){i=v;continue}}y==="["?n++:y==="]"?n--:y==="("?u++:y===")"&&u--}let p=l.length===0?r:r.slice(s),x=p,h=!1;p.endsWith(nm)?(x=p.slice(0,-1),h=!0):p.startsWith(nm)&&(x=p.slice(1),h=!0);let b=i&&i>s?i-s:void 0;return LS(l,h,x,b)};if(t){let r=t+SS,l=o;o=n=>n.startsWith(r)?l(n.slice(r.length)):LS(ak,!1,n,void 0,!0)}if(a){let r=o;o=l=>a({className:l,parseClassName:r})}return o},rk=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((a,o)=>{t.set(a,1e6+o)}),a=>{let o=[],r=[];for(let l=0;l<a.length;l++){let n=a[l],u=n[0]==="[",s=t.has(n);u||s?(r.length>0&&(r.sort(),o.push(...r),r=[]),o.push(n)):r.push(n)}return r.length>0&&(r.sort(),o.push(...r)),o}},lk=e=>({cache:tk(e.cacheSize),parseClassName:ok(e),sortModifiers:rk(e),postfixLookupClassGroupIds:nk(e),...jR(e)}),nk=e=>{let t=Object.create(null),a=e.postfixLookupClassGroups;if(a)for(let o=0;o<a.length;o++)t[a[o]]=!0;return t},uk=/\s+/,sk=(e,t)=>{let{parseClassName:a,getClassGroupId:o,getConflictingClassGroupIds:r,sortModifiers:l,postfixLookupClassGroupIds:n}=t,u=[],s=e.trim().split(uk),i="";for(let d=s.length-1;d>=0;d-=1){let p=s[d],{isExternal:x,modifiers:h,hasImportantModifier:b,baseClassName:v,maybePostfixModifierPosition:y}=a(p);if(x){i=p+(i.length>0?" "+i:i);continue}let c=!!y,f;if(c){let C=v.substring(0,y);f=o(C);let L=f&&n[f]?o(v):void 0;L&&L!==f&&(f=L,c=!1)}else f=o(v);if(!f){if(!c){i=p+(i.length>0?" "+i:i);continue}if(f=o(v),!f){i=p+(i.length>0?" "+i:i);continue}c=!1}let m=h.length===0?"":h.length===1?h[0]:l(h).join(":"),g=b?m+nm:m,S=g+f;if(u.indexOf(S)>-1)continue;u.push(S);let I=r(f,c);for(let C=0;C<I.length;++C){let L=I[C];u.push(g+L)}i=p+(i.length>0?" "+i:i)}return i},ik=(...e)=>{let t=0,a,o,r="";for(;t<e.length;)(a=e[t++])&&(o=DS(a))&&(r&&(r+=" "),r+=o);return r},DS=e=>{if(typeof e=="string")return e;let t,a="";for(let o=0;o<e.length;o++)e[o]&&(t=DS(e[o]))&&(a&&(a+=" "),a+=t);return a},fk=(e,...t)=>{let a,o,r,l,n=s=>{let i=t.reduce((d,p)=>p(d),e());return a=lk(i),o=a.cache.get,r=a.cache.set,l=u,u(s)},u=s=>{let i=o(s);if(i)return i;let d=sk(s,a);return r(s,d),d};return l=n,(...s)=>l(ik(...s))},dk=[],$e=e=>{let t=a=>a[e]||dk;return t.isThemeGetter=!0,t},TS=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,ES=/^\((?:(\w[\w-]*):)?(.+)\)$/i,ck=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,pk=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,mk=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,hk=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,xk=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,gk=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Bo=e=>ck.test(e),Q=e=>!!e&&!Number.isNaN(Number(e)),La=e=>!!e&&Number.isInteger(Number(e)),lm=e=>e.endsWith("%")&&Q(e.slice(0,-1)),Ya=e=>pk.test(e),OS=()=>!0,vk=e=>mk.test(e)&&!hk.test(e),sm=()=>!1,bk=e=>xk.test(e),yk=e=>gk.test(e),wk=e=>!O(e)&&!U(e),Sk=e=>e.startsWith("@container")&&(e[10]==="/"&&e[11]!==void 0||e[11]==="s"&&e[16]!==void 0&&e.startsWith("-size/",10)||e[11]==="n"&&e[18]!==void 0&&e.startsWith("-normal/",10)),Lk=e=>Po(e,US,sm),O=e=>TS.test(e),wr=e=>Po(e,HS,vk),CS=e=>Po(e,Tk,Q),Ck=e=>Po(e,zS,OS),Ik=e=>Po(e,NS,sm),IS=e=>Po(e,BS,sm),Rk=e=>Po(e,PS,yk),Hi=e=>Po(e,qS,bk),U=e=>ES.test(e),uu=e=>Sr(e,HS),kk=e=>Sr(e,NS),RS=e=>Sr(e,BS),Ak=e=>Sr(e,US),Mk=e=>Sr(e,PS),Ni=e=>Sr(e,qS,!0),Dk=e=>Sr(e,zS,!0),Po=(e,t,a)=>{let o=TS.exec(e);return o?o[1]?t(o[1]):a(o[2]):!1},Sr=(e,t,a=!1)=>{let o=ES.exec(e);return o?o[1]?t(o[1]):a:!1},BS=e=>e==="position"||e==="percentage",PS=e=>e==="image"||e==="url",US=e=>e==="length"||e==="size"||e==="bg-size",HS=e=>e==="length",Tk=e=>e==="number",NS=e=>e==="family-name",zS=e=>e==="number"||e==="weight",qS=e=>e==="shadow";var Ek=()=>{let e=$e("color"),t=$e("font"),a=$e("text"),o=$e("font-weight"),r=$e("tracking"),l=$e("leading"),n=$e("breakpoint"),u=$e("container"),s=$e("spacing"),i=$e("radius"),d=$e("shadow"),p=$e("inset-shadow"),x=$e("text-shadow"),h=$e("drop-shadow"),b=$e("blur"),v=$e("perspective"),y=$e("aspect"),c=$e("ease"),f=$e("animate"),m=()=>["auto","avoid","all","avoid-page","page","left","right","column"],g=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],S=()=>[...g(),U,O],I=()=>["auto","hidden","clip","visible","scroll"],C=()=>["auto","contain","none"],L=()=>[U,O,s],R=()=>[Bo,"full","auto",...L()],A=()=>[La,"none","subgrid",U,O],z=()=>["auto",{span:["full",La,U,O]},La,U,O],G=()=>[La,"auto",U,O],ee=()=>["auto","min","max","fr",U,O],Z=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],te=()=>["start","end","center","stretch","center-safe","end-safe"],F=()=>["auto",...L()],j=()=>[Bo,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...L()],q=()=>[Bo,"screen","full","dvw","lvw","svw","min","max","fit",...L()],le=()=>[Bo,"screen","full","lh","dvh","lvh","svh","min","max","fit",...L()],D=()=>[e,U,O],Ne=()=>[...g(),RS,IS,{position:[U,O]}],Ke=()=>["no-repeat",{repeat:["","x","y","space","round"]}],ft=()=>["auto","cover","contain",Ak,Lk,{size:[U,O]}],bt=()=>[lm,uu,wr],Te=()=>["","none","full",i,U,O],Le=()=>["",Q,uu,wr],_=()=>["solid","dashed","dotted","double"],ue=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],K=()=>[Q,lm,RS,IS],se=()=>["","none",b,U,O],fe=()=>["none",Q,U,O],xe=()=>["none",Q,U,O],dt=()=>[Q,U,O],T=()=>[Bo,"full",...L()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Ya],breakpoint:[Ya],color:[OS],container:[Ya],"drop-shadow":[Ya],ease:["in","out","in-out"],font:[wk],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Ya],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Ya],shadow:[Ya],spacing:["px",Q],text:[Ya],"text-shadow":[Ya],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",Bo,O,U,y]}],container:["container"],"container-type":[{"@container":["","normal","size",U,O]}],"container-named":[Sk],columns:[{columns:[Q,O,U,u]}],"break-after":[{"break-after":m()}],"break-before":[{"break-before":m()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:S()}],overflow:[{overflow:I()}],"overflow-x":[{"overflow-x":I()}],"overflow-y":[{"overflow-y":I()}],overscroll:[{overscroll:C()}],"overscroll-x":[{"overscroll-x":C()}],"overscroll-y":[{"overscroll-y":C()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:R()}],"inset-x":[{"inset-x":R()}],"inset-y":[{"inset-y":R()}],start:[{"inset-s":R(),start:R()}],end:[{"inset-e":R(),end:R()}],"inset-bs":[{"inset-bs":R()}],"inset-be":[{"inset-be":R()}],top:[{top:R()}],right:[{right:R()}],bottom:[{bottom:R()}],left:[{left:R()}],visibility:["visible","invisible","collapse"],z:[{z:[La,"auto",U,O]}],basis:[{basis:[Bo,"full","auto",u,...L()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[Q,Bo,"auto","initial","none",O]}],grow:[{grow:["",Q,U,O]}],shrink:[{shrink:["",Q,U,O]}],order:[{order:[La,"first","last","none",U,O]}],"grid-cols":[{"grid-cols":A()}],"col-start-end":[{col:z()}],"col-start":[{"col-start":G()}],"col-end":[{"col-end":G()}],"grid-rows":[{"grid-rows":A()}],"row-start-end":[{row:z()}],"row-start":[{"row-start":G()}],"row-end":[{"row-end":G()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":ee()}],"auto-rows":[{"auto-rows":ee()}],gap:[{gap:L()}],"gap-x":[{"gap-x":L()}],"gap-y":[{"gap-y":L()}],"justify-content":[{justify:[...Z(),"normal"]}],"justify-items":[{"justify-items":[...te(),"normal"]}],"justify-self":[{"justify-self":["auto",...te()]}],"align-content":[{content:["normal",...Z()]}],"align-items":[{items:[...te(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...te(),{baseline:["","last"]}]}],"place-content":[{"place-content":Z()}],"place-items":[{"place-items":[...te(),"baseline"]}],"place-self":[{"place-self":["auto",...te()]}],p:[{p:L()}],px:[{px:L()}],py:[{py:L()}],ps:[{ps:L()}],pe:[{pe:L()}],pbs:[{pbs:L()}],pbe:[{pbe:L()}],pt:[{pt:L()}],pr:[{pr:L()}],pb:[{pb:L()}],pl:[{pl:L()}],m:[{m:F()}],mx:[{mx:F()}],my:[{my:F()}],ms:[{ms:F()}],me:[{me:F()}],mbs:[{mbs:F()}],mbe:[{mbe:F()}],mt:[{mt:F()}],mr:[{mr:F()}],mb:[{mb:F()}],ml:[{ml:F()}],"space-x":[{"space-x":L()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":L()}],"space-y-reverse":["space-y-reverse"],size:[{size:j()}],"inline-size":[{inline:["auto",...q()]}],"min-inline-size":[{"min-inline":["auto",...q()]}],"max-inline-size":[{"max-inline":["none",...q()]}],"block-size":[{block:["auto",...le()]}],"min-block-size":[{"min-block":["auto",...le()]}],"max-block-size":[{"max-block":["none",...le()]}],w:[{w:[u,"screen",...j()]}],"min-w":[{"min-w":[u,"screen","none",...j()]}],"max-w":[{"max-w":[u,"screen","none","prose",{screen:[n]},...j()]}],h:[{h:["screen","lh",...j()]}],"min-h":[{"min-h":["screen","lh","none",...j()]}],"max-h":[{"max-h":["screen","lh",...j()]}],"font-size":[{text:["base",a,uu,wr]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[o,Dk,Ck]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",lm,O]}],"font-family":[{font:[kk,Ik,t]}],"font-features":[{"font-features":[O]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[r,U,O]}],"line-clamp":[{"line-clamp":[Q,"none",U,CS]}],leading:[{leading:[l,...L()]}],"list-image":[{"list-image":["none",U,O]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",U,O]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:D()}],"text-color":[{text:D()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[..._(),"wavy"]}],"text-decoration-thickness":[{decoration:[Q,"from-font","auto",U,wr]}],"text-decoration-color":[{decoration:D()}],"underline-offset":[{"underline-offset":[Q,"auto",U,O]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:L()}],"tab-size":[{tab:[La,U,O]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",U,O]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",U,O]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:Ne()}],"bg-repeat":[{bg:Ke()}],"bg-size":[{bg:ft()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},La,U,O],radial:["",U,O],conic:[La,U,O]},Mk,Rk]}],"bg-color":[{bg:D()}],"gradient-from-pos":[{from:bt()}],"gradient-via-pos":[{via:bt()}],"gradient-to-pos":[{to:bt()}],"gradient-from":[{from:D()}],"gradient-via":[{via:D()}],"gradient-to":[{to:D()}],rounded:[{rounded:Te()}],"rounded-s":[{"rounded-s":Te()}],"rounded-e":[{"rounded-e":Te()}],"rounded-t":[{"rounded-t":Te()}],"rounded-r":[{"rounded-r":Te()}],"rounded-b":[{"rounded-b":Te()}],"rounded-l":[{"rounded-l":Te()}],"rounded-ss":[{"rounded-ss":Te()}],"rounded-se":[{"rounded-se":Te()}],"rounded-ee":[{"rounded-ee":Te()}],"rounded-es":[{"rounded-es":Te()}],"rounded-tl":[{"rounded-tl":Te()}],"rounded-tr":[{"rounded-tr":Te()}],"rounded-br":[{"rounded-br":Te()}],"rounded-bl":[{"rounded-bl":Te()}],"border-w":[{border:Le()}],"border-w-x":[{"border-x":Le()}],"border-w-y":[{"border-y":Le()}],"border-w-s":[{"border-s":Le()}],"border-w-e":[{"border-e":Le()}],"border-w-bs":[{"border-bs":Le()}],"border-w-be":[{"border-be":Le()}],"border-w-t":[{"border-t":Le()}],"border-w-r":[{"border-r":Le()}],"border-w-b":[{"border-b":Le()}],"border-w-l":[{"border-l":Le()}],"divide-x":[{"divide-x":Le()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":Le()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[..._(),"hidden","none"]}],"divide-style":[{divide:[..._(),"hidden","none"]}],"border-color":[{border:D()}],"border-color-x":[{"border-x":D()}],"border-color-y":[{"border-y":D()}],"border-color-s":[{"border-s":D()}],"border-color-e":[{"border-e":D()}],"border-color-bs":[{"border-bs":D()}],"border-color-be":[{"border-be":D()}],"border-color-t":[{"border-t":D()}],"border-color-r":[{"border-r":D()}],"border-color-b":[{"border-b":D()}],"border-color-l":[{"border-l":D()}],"divide-color":[{divide:D()}],"outline-style":[{outline:[..._(),"none","hidden"]}],"outline-offset":[{"outline-offset":[Q,U,O]}],"outline-w":[{outline:["",Q,uu,wr]}],"outline-color":[{outline:D()}],shadow:[{shadow:["","none",d,Ni,Hi]}],"shadow-color":[{shadow:D()}],"inset-shadow":[{"inset-shadow":["none",p,Ni,Hi]}],"inset-shadow-color":[{"inset-shadow":D()}],"ring-w":[{ring:Le()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:D()}],"ring-offset-w":[{"ring-offset":[Q,wr]}],"ring-offset-color":[{"ring-offset":D()}],"inset-ring-w":[{"inset-ring":Le()}],"inset-ring-color":[{"inset-ring":D()}],"text-shadow":[{"text-shadow":["none",x,Ni,Hi]}],"text-shadow-color":[{"text-shadow":D()}],opacity:[{opacity:[Q,U,O]}],"mix-blend":[{"mix-blend":[...ue(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ue()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[Q]}],"mask-image-linear-from-pos":[{"mask-linear-from":K()}],"mask-image-linear-to-pos":[{"mask-linear-to":K()}],"mask-image-linear-from-color":[{"mask-linear-from":D()}],"mask-image-linear-to-color":[{"mask-linear-to":D()}],"mask-image-t-from-pos":[{"mask-t-from":K()}],"mask-image-t-to-pos":[{"mask-t-to":K()}],"mask-image-t-from-color":[{"mask-t-from":D()}],"mask-image-t-to-color":[{"mask-t-to":D()}],"mask-image-r-from-pos":[{"mask-r-from":K()}],"mask-image-r-to-pos":[{"mask-r-to":K()}],"mask-image-r-from-color":[{"mask-r-from":D()}],"mask-image-r-to-color":[{"mask-r-to":D()}],"mask-image-b-from-pos":[{"mask-b-from":K()}],"mask-image-b-to-pos":[{"mask-b-to":K()}],"mask-image-b-from-color":[{"mask-b-from":D()}],"mask-image-b-to-color":[{"mask-b-to":D()}],"mask-image-l-from-pos":[{"mask-l-from":K()}],"mask-image-l-to-pos":[{"mask-l-to":K()}],"mask-image-l-from-color":[{"mask-l-from":D()}],"mask-image-l-to-color":[{"mask-l-to":D()}],"mask-image-x-from-pos":[{"mask-x-from":K()}],"mask-image-x-to-pos":[{"mask-x-to":K()}],"mask-image-x-from-color":[{"mask-x-from":D()}],"mask-image-x-to-color":[{"mask-x-to":D()}],"mask-image-y-from-pos":[{"mask-y-from":K()}],"mask-image-y-to-pos":[{"mask-y-to":K()}],"mask-image-y-from-color":[{"mask-y-from":D()}],"mask-image-y-to-color":[{"mask-y-to":D()}],"mask-image-radial":[{"mask-radial":[U,O]}],"mask-image-radial-from-pos":[{"mask-radial-from":K()}],"mask-image-radial-to-pos":[{"mask-radial-to":K()}],"mask-image-radial-from-color":[{"mask-radial-from":D()}],"mask-image-radial-to-color":[{"mask-radial-to":D()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":g()}],"mask-image-conic-pos":[{"mask-conic":[Q]}],"mask-image-conic-from-pos":[{"mask-conic-from":K()}],"mask-image-conic-to-pos":[{"mask-conic-to":K()}],"mask-image-conic-from-color":[{"mask-conic-from":D()}],"mask-image-conic-to-color":[{"mask-conic-to":D()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:Ne()}],"mask-repeat":[{mask:Ke()}],"mask-size":[{mask:ft()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",U,O]}],filter:[{filter:["","none",U,O]}],blur:[{blur:se()}],brightness:[{brightness:[Q,U,O]}],contrast:[{contrast:[Q,U,O]}],"drop-shadow":[{"drop-shadow":["","none",h,Ni,Hi]}],"drop-shadow-color":[{"drop-shadow":D()}],grayscale:[{grayscale:["",Q,U,O]}],"hue-rotate":[{"hue-rotate":[Q,U,O]}],invert:[{invert:["",Q,U,O]}],saturate:[{saturate:[Q,U,O]}],sepia:[{sepia:["",Q,U,O]}],"backdrop-filter":[{"backdrop-filter":["","none",U,O]}],"backdrop-blur":[{"backdrop-blur":se()}],"backdrop-brightness":[{"backdrop-brightness":[Q,U,O]}],"backdrop-contrast":[{"backdrop-contrast":[Q,U,O]}],"backdrop-grayscale":[{"backdrop-grayscale":["",Q,U,O]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[Q,U,O]}],"backdrop-invert":[{"backdrop-invert":["",Q,U,O]}],"backdrop-opacity":[{"backdrop-opacity":[Q,U,O]}],"backdrop-saturate":[{"backdrop-saturate":[Q,U,O]}],"backdrop-sepia":[{"backdrop-sepia":["",Q,U,O]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":L()}],"border-spacing-x":[{"border-spacing-x":L()}],"border-spacing-y":[{"border-spacing-y":L()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",U,O]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[Q,"initial",U,O]}],ease:[{ease:["linear","initial",c,U,O]}],delay:[{delay:[Q,U,O]}],animate:[{animate:["none",f,U,O]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[v,U,O]}],"perspective-origin":[{"perspective-origin":S()}],rotate:[{rotate:fe()}],"rotate-x":[{"rotate-x":fe()}],"rotate-y":[{"rotate-y":fe()}],"rotate-z":[{"rotate-z":fe()}],scale:[{scale:xe()}],"scale-x":[{"scale-x":xe()}],"scale-y":[{"scale-y":xe()}],"scale-z":[{"scale-z":xe()}],"scale-3d":["scale-3d"],skew:[{skew:dt()}],"skew-x":[{"skew-x":dt()}],"skew-y":[{"skew-y":dt()}],transform:[{transform:[U,O,"","none","gpu","cpu"]}],"transform-origin":[{origin:S()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:T()}],"translate-x":[{"translate-x":T()}],"translate-y":[{"translate-y":T()}],"translate-z":[{"translate-z":T()}],"translate-none":["translate-none"],zoom:[{zoom:[La,U,O]}],accent:[{accent:D()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:D()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",U,O]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scrollbar-thumb-color":[{"scrollbar-thumb":D()}],"scrollbar-track-color":[{"scrollbar-track":D()}],"scrollbar-gutter":[{"scrollbar-gutter":["auto","stable","both"]}],"scrollbar-w":[{scrollbar:["auto","thin","none"]}],"scroll-m":[{"scroll-m":L()}],"scroll-mx":[{"scroll-mx":L()}],"scroll-my":[{"scroll-my":L()}],"scroll-ms":[{"scroll-ms":L()}],"scroll-me":[{"scroll-me":L()}],"scroll-mbs":[{"scroll-mbs":L()}],"scroll-mbe":[{"scroll-mbe":L()}],"scroll-mt":[{"scroll-mt":L()}],"scroll-mr":[{"scroll-mr":L()}],"scroll-mb":[{"scroll-mb":L()}],"scroll-ml":[{"scroll-ml":L()}],"scroll-p":[{"scroll-p":L()}],"scroll-px":[{"scroll-px":L()}],"scroll-py":[{"scroll-py":L()}],"scroll-ps":[{"scroll-ps":L()}],"scroll-pe":[{"scroll-pe":L()}],"scroll-pbs":[{"scroll-pbs":L()}],"scroll-pbe":[{"scroll-pbe":L()}],"scroll-pt":[{"scroll-pt":L()}],"scroll-pr":[{"scroll-pr":L()}],"scroll-pb":[{"scroll-pb":L()}],"scroll-pl":[{"scroll-pl":L()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",U,O]}],fill:[{fill:["none",...D()]}],"stroke-w":[{stroke:[Q,uu,wr,CS]}],stroke:[{stroke:["none",...D()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{"container-named":["container-type"],overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","inset-bs","inset-be","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pbs","pbe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mbs","mbe","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-bs","border-w-be","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-bs","border-color-be","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mbs","scroll-mbe","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pbs","scroll-pbe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},postfixLookupClassGroups:["container-type"],orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}};var FS=fk(Ek);function Ie(...e){return FS(yS(e))}var we=B(Ze(),1),He=Ka.forwardRef(function({className:t,style:a,variant:o="secondary",size:r="sm",...l},n){return(0,we.jsx)("button",{ref:n,style:{...r==="xs"?{height:28,minHeight:28,maxHeight:28,paddingTop:0,paddingBottom:0,lineHeight:1}:r==="sm"?{height:36,minHeight:36,maxHeight:36,paddingTop:0,paddingBottom:0,lineHeight:1}:{height:32,minHeight:32,maxHeight:32,padding:0,lineHeight:1},...a},className:Ie("box-border inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-[12px] font-medium outline-none appearance-none","transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100","focus-visible:ring-1 focus-visible:ring-loupe-accent/70",o==="primary"&&"bg-loupe-fg text-loupe-bg shadow-sm shadow-black/20 hover:bg-white",o==="secondary"&&"border border-loupe-line bg-loupe-bg/70 text-loupe-muted hover:border-loupe-line-strong hover:text-loupe-fg",o==="ghost"&&"text-loupe-muted hover:bg-white/5 hover:text-loupe-fg",o==="danger"&&"border border-loupe-line bg-loupe-bg/70 text-loupe-muted hover:border-white/35 hover:text-loupe-fg",r==="xs"&&"h-7 px-2.5",r==="sm"&&"h-9 px-3",r==="icon"&&"h-8 w-8 p-0",t),...l})});function qi({className:e,tone:t="muted",...a}){return(0,we.jsx)("span",{className:Ie("inline-flex h-5 items-center gap-1 rounded-md border px-1.5 text-[10.5px] leading-none",t==="muted"&&"border-loupe-line bg-loupe-bg/70 text-loupe-faint",t==="open"&&"border-loupe-accent/25 bg-loupe-accent/10 text-loupe-muted",t==="resolved"&&"border-white/20 bg-white/10 text-loupe-muted",e),...a})}var su=Ka.forwardRef(function({className:t,...a},o){return(0,we.jsx)("input",{ref:o,className:Ie("h-9 w-full rounded-lg border border-loupe-line bg-loupe-bg/80 px-2.5 text-[12px] text-loupe-fg outline-none","transition-colors placeholder:text-loupe-faint focus:border-loupe-accent/60",t),...a})}),_S=Ka.forwardRef(function({className:t,...a},o){return(0,we.jsx)("textarea",{ref:o,className:Ie("min-h-16 w-full resize-y rounded-lg border border-loupe-line bg-loupe-bg/80 px-2.5 py-2 text-[12px] text-loupe-fg outline-none","transition-colors placeholder:text-loupe-faint focus:border-loupe-accent/60",t),...a})});var E5=Ka.forwardRef(function({className:t,children:a,...o},r){return(0,we.jsxs)(Qp,{ref:r,className:Ie("flex h-9 min-w-0 items-center justify-between gap-2 rounded-lg border border-loupe-line bg-loupe-bg/80 px-2.5 text-[12px] text-loupe-muted outline-none","transition-all duration-150 active:scale-[0.99] hover:border-loupe-line-strong hover:text-loupe-fg focus:border-loupe-accent/60 disabled:pointer-events-none disabled:opacity-50",t),...o,children:[a,(0,we.jsx)(Jp,{asChild:!0,children:(0,we.jsx)(Nn,{className:"h-3.5 w-3.5 opacity-70"})})]})}),O5=Ka.forwardRef(function({className:t,children:a,position:o="popper",...r},l){return(0,we.jsx)($p,{ref:l,position:o,className:Ie("z-[2147483647] max-h-64 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-loupe-line bg-loupe-panel text-loupe-fg shadow-xl shadow-black/40","data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",t),...r,children:(0,we.jsx)(tm,{className:"p-1",children:a})})}),B5=Ka.forwardRef(function({className:t,children:a,...o},r){return(0,we.jsxs)(am,{ref:r,className:Ie("relative flex h-8 cursor-pointer select-none items-center rounded-lg px-2 pl-7 text-[12px] text-loupe-muted outline-none","data-[highlighted]:bg-loupe-elev data-[highlighted]:text-loupe-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...o,children:[(0,we.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,we.jsx)(rm,{children:(0,we.jsx)(Hn,{className:"h-3.5 w-3.5"})})}),(0,we.jsx)(om,{children:a})]})}),Fi=Cp;var _i=hi;function Gi({className:e,children:t,showClose:a=!0,...o}){return(0,we.jsxs)(we.Fragment,{children:[(0,we.jsx)(Rp,{className:"fixed inset-0 z-[2147483647] bg-black/65 data-[state=open]:animate-in data-[state=closed]:animate-out"}),(0,we.jsxs)(kp,{className:Ie("fixed left-1/2 top-1/2 z-[2147483647] grid w-[min(92vw,560px)] max-h-[86vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-loupe-line bg-loupe-panel text-loupe-fg shadow-2xl shadow-black/50 outline-none","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",e),...o,children:[t,a?(0,we.jsxs)(hi,{className:"absolute right-3 top-3 rounded-lg p-1.5 text-loupe-muted transition-colors hover:bg-white/5 hover:text-loupe-fg focus:outline-none focus:ring-1 focus:ring-loupe-accent/70",children:[(0,we.jsx)(Xa,{className:"h-4 w-4"}),(0,we.jsx)("span",{className:"sr-only",children:"Close"})]}):null]})]})}function Vi({className:e,...t}){return(0,we.jsx)("div",{className:Ie("space-y-1.5 px-5 pt-5",e),...t})}function Xi({className:e,...t}){return(0,we.jsx)("div",{className:Ie("flex items-center justify-end gap-2 border-t border-loupe-line px-5 py-3",e),...t})}var ji=Ka.forwardRef(function({className:t,...a},o){return(0,we.jsx)(Ap,{ref:o,className:Ie("text-[15px] font-semibold leading-none",t),...a})}),Wi=Ka.forwardRef(function({className:t,...a},o){return(0,we.jsx)(Mp,{ref:o,className:Ie("text-[12px] text-loupe-muted",t),...a})});var w=B(Ze(),1),Ok='<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 257"><path fill="currentColor" d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z"/></svg>',Bk='<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260"><path fill="currentColor" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>',Pk="https://github.com/woddlepad/loupe",Uk='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>';function WS({onClose:e}){let[t,a]=M.useState([]),[o,r]=M.useState([]),[l,n]=M.useState([]),[u,s]=M.useState("me"),[i,d]=M.useState("http://localhost:7337"),[p,x]=M.useState(void 0),[h,b]=M.useState("page"),[v,y]=M.useState(!1),[c,f]=M.useState(null),[m,g]=M.useState(!1),[S,I]=M.useState(()=>new Set),[C,L]=M.useState(()=>new Set),[R,A]=M.useState(null),[z,G]=M.useState(null),[ee,Z]=M.useState(null),[te,F]=M.useState(null),[j,q]=M.useState(null),[,le]=M.useReducer(T=>T+1,0),D=M.useCallback(async()=>{let[T,ie,Fe,fa]=await Promise.all([chrome.runtime.sendMessage({type:"list"}),oA(),rA(),xu()]);a(T.ok?T.annotations:[]),r(ie),n(Fe),s(fa.author),d(gu(fa,location.href)),x(fa.activeRepoRoot)},[]);M.useEffect(()=>{D()},[D]),M.useEffect(()=>{let T=()=>le();return window.addEventListener("scroll",T,!0),window.addEventListener("resize",T,!0),()=>{window.removeEventListener("scroll",T,!0),window.removeEventListener("resize",T,!0)}},[]),M.useEffect(()=>{let T=ie=>{ie.key==="Escape"&&(fA(ie,"data-loupe-library-popover")||(ie.preventDefault(),ie.stopImmediatePropagation(),j?q(null):e()))};return window.addEventListener("keydown",T,!0),()=>window.removeEventListener("keydown",T,!0)},[j,e]);let Ne=M.useMemo(()=>{let T=Ca(location.href);return t.filter(ie=>Ca(ie.url)===T)},[t]),Ke=M.useMemo(()=>h==="all"?t:Ne,[t,h,Ne]),ft=M.useMemo(()=>(v?Ke:Ke.filter(ie=>ie.status!=="resolved")).filter(ie=>{let Fe=ie.groupSlug||YS(ie.group);return C.has(Fe)?!1:!R||Fe===R}),[R,C,Ke,v]),bt=M.useMemo(()=>v?Ne.length:Ne.filter(T=>T.status!=="resolved").length,[Ne,v]),Te=M.useMemo(()=>v?t.length:t.filter(T=>T.status!=="resolved").length,[t,v]),Le=t.filter(T=>T.status==="resolved").length,_=Ke.filter(T=>T.status==="resolved").length,ue=c?t.find(T=>T.id===c):void 0,K=M.useMemo(()=>lA(ft,l).filter(T=>!C.has(T.slug)&&(!R||T.slug===R)),[R,C,ft,l]),se=M.useMemo(()=>nA(K,te),[K,te]),fe=R!==null||C.size>0,xe=M.useRef(null);tA(xe,se.map(T=>T.slug).join(`
`));let dt={annotations:t,actions:o,author:u,bridgeUrl:i,repoRoot:p,expanded:c,collapsedGroups:S,dragOverGroup:z,draggingGroupSlug:ee,focusedGroup:R,groupOrder:se.map(T=>T.slug),showResolved:v,clearGroupVisibility:()=>{L(new Set),A(null)},focusGroup:T=>{L(new Set),A(T),ue&&ue.groupSlug!==T&&f(null)},hideGroup:T=>{L(ie=>{let Fe=new Set(ie);return Fe.add(T),Fe}),A(ie=>ie===T?null:ie),ue?.groupSlug===T&&f(null)},setExpanded:f,setFilter:b,setCollapsed:g,setDragOverGroup:G,startGroupDrag:T=>{Z(T),F(K.map(ie=>ie.slug))},previewGroupReorder:(T,ie,Fe)=>{T!==ie&&(F(fa=>{let mm=fa??K.map(iL=>iL.slug),hm=ZS(mm,T,ie,Fe);return XS(mm,hm)?fa:hm}),G(ie))},cancelGroupReorder:()=>{Z(null),F(null),G(null)},toggleGroup:T=>I(ie=>{let Fe=new Set(ie);return Fe.has(T)?Fe.delete(T):Fe.add(T),Fe}),setLightbox:q,moveAnnotation:async(T,ie)=>{(await chrome.runtime.sendMessage({type:"move-annotation",id:T,group:ie})).ok&&await D()},commitGroupReorder:async T=>{if(Z(null),F(null),G(null),XS(T,K.map(Fe=>Fe.slug)))return;(await chrome.runtime.sendMessage({type:"reorder-groups",slugs:T})).ok&&await D()},reload:D};return(0,w.jsxs)(w.Fragment,{children:[m?(0,w.jsxs)("button",{type:"button",className:"fixed right-3 top-3 z-[2147483646] flex h-12 items-center gap-2 rounded-xl border border-loupe-line bg-loupe-panel/95 px-2 text-loupe-fg shadow-2xl shadow-black/50 transition-all hover:border-loupe-line-strong active:scale-[0.98]",onClick:()=>g(!1),title:"Show annotations",children:[(0,w.jsx)($k,{}),(0,w.jsx)("span",{className:"grid h-5 min-w-5 place-items-center rounded-full bg-loupe-accent px-1.5 text-[11px] font-semibold text-loupe-bg",children:ft.length})]}):(0,w.jsxs)("section",{className:"fixed bottom-3 right-3 top-3 z-[2147483646] flex w-[420px] flex-col overflow-hidden rounded-2xl border border-loupe-line bg-loupe-panel/95 text-[13px] text-loupe-fg shadow-2xl shadow-black/50",children:[(0,w.jsxs)("header",{className:"flex min-h-12 shrink-0 items-center gap-2 border-b border-loupe-line px-3 py-2",children:[(0,w.jsxs)("div",{className:"flex items-center gap-1 rounded-xl border border-loupe-line bg-loupe-bg/60 p-1",children:[(0,w.jsx)(GS,{active:h==="page",count:bt,onClick:()=>b("page"),children:"This page"}),(0,w.jsx)(GS,{active:h==="all",count:Te,onClick:()=>b("all"),children:"All pages"})]}),(0,w.jsx)("div",{className:"ml-auto"}),(0,w.jsx)(He,{variant:"ghost",size:"icon",title:"Collapse annotations",onClick:()=>g(!0),children:(0,w.jsx)(Vn,{className:"h-4 w-4"})}),(0,w.jsx)(He,{variant:"ghost",size:"icon",title:"Close annotations",onClick:e,children:(0,w.jsx)(Xa,{className:"h-4 w-4"})})]}),(0,w.jsxs)("div",{className:"flex shrink-0 items-center gap-2 border-b border-loupe-line/70 px-3 py-2.5",children:[(0,w.jsxs)(He,{variant:"secondary",size:"xs",onClick:()=>{y(T=>!T),v&&ue?.status==="resolved"&&f(null)},children:[v?(0,w.jsx)(bl,{className:"h-3.5 w-3.5"}):(0,w.jsx)(nr,{className:"h-3.5 w-3.5"}),v?"Hide resolved":"Show resolved"]}),Le>0?(0,w.jsx)(Yk,{count:Le,onDone:async()=>{f(null),await D()}}):null,fe?(0,w.jsxs)(He,{variant:"secondary",size:"xs",onClick:dt.clearGroupVisibility,children:[(0,w.jsx)(nr,{className:"h-3.5 w-3.5"}),"Show all groups"]}):null,(0,w.jsxs)("span",{className:"ml-auto text-[11px] text-loupe-faint",children:[ft.length,"/",Ke.length]})]}),(0,w.jsxs)("div",{ref:xe,className:"flex-1 overflow-y-auto py-2",children:[se.length===0?(0,w.jsx)("div",{className:"px-6 py-12 text-center text-[12px] text-loupe-faint",children:_>0&&!v?"Only resolved annotations here":h==="page"?"No annotations on this page yet":"No annotations yet"}):se.map(T=>(0,w.jsx)(Hk,{group:T.group,slug:T.slug,items:T.items,ctx:dt},T.slug)),(0,w.jsx)(Nk,{onDone:D})]}),(0,w.jsx)(eA,{})]}),(0,w.jsx)(Kk,{annotations:t,showResolved:v,expanded:c,setExpanded:f,setFilter:b,setCollapsed:g}),j?(0,w.jsx)(Jk,{src:j,onClose:()=>q(null)}):null]})}function Hk({group:e,slug:t,items:a,ctx:o}){let r=a.filter(c=>c.status!=="resolved").length,l=o.collapsedGroups.has(t),n=o.actions.filter(c=>c.id!=="save"),[u,s]=M.useState(!1),[i,d]=M.useState(!1),[p,x]=M.useState(null),[h,b]=M.useState(null),v=M.useRef(null);async function y(c){if(!c||a.length===0)return;x(c),b(null);let f=await chrome.runtime.sendMessage({type:"group-run",slug:t,action:c});x(null),f.ok&&b(c)}return(0,w.jsxs)("div",{className:Ie("pb-1 transition-colors",o.dragOverGroup===t&&"bg-loupe-accent/5"),onDragOver:c=>{if(!uA(c))return;c.preventDefault(),c.dataTransfer.dropEffect="move";let f=o.draggingGroupSlug||c.dataTransfer.getData("application/x-loupe-group-slug");f?o.previewGroupReorder(f,t,VS(c)):o.setDragOverGroup(t)},onDragLeave:c=>{let f=c.relatedTarget;(!(f instanceof Node)||!c.currentTarget.contains(f))&&o.setDragOverGroup(null)},onDrop:c=>{c.preventDefault();let f=c.dataTransfer.getData("application/x-loupe-annotation-id"),m=c.dataTransfer.getData("application/x-loupe-group-slug");if(o.setDragOverGroup(null),f)o.moveAnnotation(f,e);else if(m){let g=ZS(o.groupOrder,m,t,VS(c));o.commitGroupReorder(g)}},"data-loupe-group-slug":t,children:[(0,w.jsxs)("div",{ref:v,className:"group flex items-center gap-2 px-3.5 pb-1.5 pt-3 text-[11px] text-loupe-faint",children:[(0,w.jsx)("button",{type:"button",draggable:!0,className:"grid h-6 w-5 shrink-0 cursor-grab place-items-center rounded-md text-loupe-faint opacity-0 transition-all hover:bg-white/5 hover:text-loupe-muted focus-visible:opacity-100 group-hover:opacity-100 active:cursor-grabbing",title:"Drag to reorder group",onDragStart:c=>{c.dataTransfer.effectAllowed="move",c.dataTransfer.setData("application/x-loupe-group-slug",t);let f=v.current;if(f){let m=f.getBoundingClientRect();c.dataTransfer.setDragImage(f,c.clientX-m.left,c.clientY-m.top)}o.startGroupDrag(t)},onDragEnd:()=>o.cancelGroupReorder(),children:(0,w.jsx)(qn,{className:"h-3.5 w-3.5"})}),(0,w.jsxs)("button",{type:"button",className:"flex min-w-0 items-center gap-1.5 rounded-lg px-1 py-1 text-left transition-colors hover:bg-white/5",onClick:()=>o.toggleGroup(t),children:[(0,w.jsx)(vl,{className:Ie("h-3.5 w-3.5 shrink-0 transition-transform",!l&&"rotate-90")}),(0,w.jsx)("span",{className:"truncate text-[12px] font-medium text-loupe-muted",children:e}),(0,w.jsxs)("span",{className:"shrink-0",children:[r,"/",a.length]})]}),(0,w.jsx)(Fk,{className:"ml-auto",actions:n,disabled:p!==null,itemCount:a.length,focused:o.focusedGroup===t,sentAction:h,sendingAction:p,onClearFocus:o.clearGroupVisibility,onDelete:()=>d(!0),onFocus:()=>o.focusGroup(t),onHide:()=>o.hideGroup(t),onRename:()=>s(!0),onSend:c=>void y(c)})]}),(0,w.jsx)(zk,{open:u,onOpenChange:s,slug:t,group:e,onDone:o.reload}),(0,w.jsx)(qk,{open:i,onOpenChange:d,slug:t,group:e,count:a.length,onDone:async()=>{o.clearGroupVisibility(),o.setExpanded(null),await o.reload()}}),l?null:(0,w.jsxs)("div",{className:"space-y-1 px-2",children:[a.map(c=>(0,w.jsx)(Xk,{annotation:c,ctx:o},c.id)),a.length===0?(0,w.jsx)("div",{className:"rounded-xl border border-dashed border-loupe-line px-3 py-4 text-center text-[11px] text-loupe-faint",children:"Drop annotations here"}):null]})]})}function Nk({onDone:e}){let[t,a]=M.useState(!1),[o,r]=M.useState(""),[l,n]=M.useState(!1);M.useEffect(()=>{t&&r("")},[t]);async function u(){let s=o.trim();if(!s)return;n(!0);let i=await chrome.runtime.sendMessage({type:"create-group",group:s});n(!1),i.ok&&(r(""),a(!1),await e())}return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("div",{className:"mx-2 mt-3 border-t border-loupe-line/70 pt-2",children:(0,w.jsxs)(He,{type:"button",variant:"secondary",size:"xs",className:"w-full",onClick:()=>a(!0),children:[(0,w.jsx)(jn,{className:"h-3.5 w-3.5"}),"Add group"]})}),(0,w.jsx)(Fi,{open:t,onOpenChange:a,children:(0,w.jsx)(Gi,{className:"w-[min(92vw,380px)]",children:(0,w.jsxs)("form",{onSubmit:s=>{s.preventDefault(),u()},children:[(0,w.jsxs)(Vi,{children:[(0,w.jsx)(ji,{children:"New group"}),(0,w.jsx)(Wi,{children:"Create an empty group for annotations."})]}),(0,w.jsx)("div",{className:"px-5 py-4",children:(0,w.jsx)(su,{autoFocus:!0,value:o,onChange:s=>r(s.target.value),placeholder:"Group name"})}),(0,w.jsxs)(Xi,{children:[(0,w.jsx)(_i,{asChild:!0,children:(0,w.jsx)(He,{type:"button",variant:"secondary",size:"xs",className:"min-w-20",children:"Cancel"})}),(0,w.jsx)(He,{type:"submit",variant:"primary",size:"xs",className:"min-w-20",disabled:l||!o.trim(),children:l?"Adding...":"OK"})]})]})})})]})}function zk({group:e,onDone:t,onOpenChange:a,open:o,slug:r}){let[l,n]=M.useState(e),[u,s]=M.useState(!1);M.useEffect(()=>{o&&n(e)},[e,o]);async function i(){let d=l.trim();if(!d||d===e){a(!1);return}s(!0);let p=await chrome.runtime.sendMessage({type:"rename-group",slug:r,group:d});s(!1),p.ok&&(a(!1),await t())}return(0,w.jsx)(Fi,{open:o,onOpenChange:a,children:(0,w.jsx)(Gi,{className:"w-[min(92vw,380px)]",children:(0,w.jsxs)("form",{onSubmit:d=>{d.preventDefault(),i()},children:[(0,w.jsxs)(Vi,{children:[(0,w.jsx)(ji,{children:"Rename group"}),(0,w.jsx)(Wi,{children:"Update the group label and its Loupe folder slug."})]}),(0,w.jsx)("div",{className:"px-5 py-4",children:(0,w.jsx)(su,{autoFocus:!0,value:l,onChange:d=>n(d.target.value),placeholder:"Group name"})}),(0,w.jsxs)(Xi,{children:[(0,w.jsx)(_i,{asChild:!0,children:(0,w.jsx)(He,{type:"button",variant:"secondary",size:"xs",className:"min-w-20",children:"Cancel"})}),(0,w.jsx)(He,{type:"submit",variant:"primary",size:"xs",className:"min-w-20",disabled:u||!l.trim(),children:u?"Saving...":"Save"})]})]})})})}function qk({count:e,group:t,onDone:a,onOpenChange:o,open:r,slug:l}){let[n,u]=M.useState(!1),[s,i]=M.useState(null);M.useEffect(()=>{r&&i(null)},[r]);async function d(){if(!n){i(null),u(!0);try{let p=await chrome.runtime.sendMessage({type:"delete-group",slug:l});if(!p.ok){i(p.error||"Could not delete this group.");return}o(!1),await a()}catch(p){i(String(p))}finally{u(!1)}}}return(0,w.jsx)(Fi,{open:r,onOpenChange:o,children:(0,w.jsxs)(Gi,{className:"w-[min(92vw,400px)]",children:[(0,w.jsxs)(Vi,{children:[(0,w.jsx)(ji,{children:"Delete group"}),(0,w.jsx)(Wi,{children:e>0?`Delete "${t}" and its ${e} annotation${e===1?"":"s"}.`:`Delete the empty "${t}" group.`})]}),s?(0,w.jsx)("div",{className:"mx-5 mt-4 rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-2 text-[12px] text-red-100",children:s}):null,(0,w.jsxs)(Xi,{children:[(0,w.jsx)(_i,{asChild:!0,children:(0,w.jsx)(He,{type:"button",variant:"secondary",size:"xs",className:"min-w-20",children:"Cancel"})}),(0,w.jsx)(He,{type:"button",variant:"danger",size:"xs",className:"min-w-20",disabled:n,onClick:()=>void d(),children:n?"Deleting...":"Delete"})]})]})})}function Fk({actions:e,className:t,disabled:a,focused:o,itemCount:r,sentAction:l,sendingAction:n,onClearFocus:u,onDelete:s,onFocus:i,onHide:d,onRename:p,onSend:x}){let[h,b]=M.useState(!1),[v,y]=M.useState(null),c=M.useRef(null),f=M.useRef(null),m=M.useCallback(()=>{let L=c.current;if(!L)return;let R=L.getBoundingClientRect(),A=f.current?.getBoundingClientRect(),z=8,G=6,ee=A?.width||192,Z=A?.height||224,te=Math.min(Math.max(z,R.right-ee),window.innerWidth-ee-z),F=R.bottom+G,j=F+Z<=window.innerHeight-z?F:Math.max(z,R.top-Z-G);y({left:te,top:j})},[]);M.useLayoutEffect(()=>{if(!h){y(null);return}return m(),window.addEventListener("resize",m,!0),window.addEventListener("scroll",m,!0),()=>{window.removeEventListener("resize",m,!0),window.removeEventListener("scroll",m,!0)}},[h,m]),M.useEffect(()=>{if(!h)return;let L=A=>{let z=A.composedPath();f.current&&z.includes(f.current)||c.current&&z.includes(c.current)||b(!1)},R=A=>{A.key==="Escape"&&b(!1)};return window.addEventListener("pointerdown",L,!0),window.addEventListener("keydown",R,!0),()=>{window.removeEventListener("pointerdown",L,!0),window.removeEventListener("keydown",R,!0)}},[h]);function g(L){b(!1),L()}let S=c.current?.getRootNode(),I=S instanceof ShadowRoot?S:null,C=h?(0,w.jsxs)("div",{ref:f,role:"menu",className:"fixed z-[2147483647] w-48 overflow-hidden rounded-lg border border-loupe-line bg-loupe-panel p-1 text-loupe-fg shadow-2xl shadow-black/50",style:v||{visibility:"hidden"},onClick:L=>L.stopPropagation(),children:[(0,w.jsx)(iu,{onSelect:()=>g(d),icon:(0,w.jsx)(bl,{className:"h-3.5 w-3.5"}),children:"Hide on this page"}),(0,w.jsx)(iu,{onSelect:()=>g(o?u:i),icon:(0,w.jsx)(nr,{className:"h-3.5 w-3.5"}),children:o?"Show all groups":"Focus this group"}),(0,w.jsx)("div",{className:"my-1 h-px bg-loupe-line/80"}),(0,w.jsx)(iu,{onSelect:()=>g(p),icon:(0,w.jsx)(Xn,{className:"h-3.5 w-3.5"}),children:"Rename"}),(0,w.jsx)(iu,{onSelect:()=>g(s),icon:(0,w.jsx)(ur,{className:"h-3.5 w-3.5"}),tone:"danger",children:"Delete"}),e.length>0?(0,w.jsx)("div",{className:"my-1 h-px bg-loupe-line/80"}):null,e.map(L=>{let R=n===L.id,A=l===L.id;return(0,w.jsx)(iu,{disabled:a||r===0,icon:(0,w.jsx)(_k,{action:L,colored:!0}),onSelect:()=>g(()=>x(L.id)),children:R?`Sending to ${fm(L)}...`:A?`Sent to ${fm(L)}`:`Send to ${fm(L)}`},L.id)})]}):null;return(0,w.jsxs)("div",{className:Ie("relative",t),onClick:L=>L.stopPropagation(),children:[(0,w.jsx)(He,{ref:c,type:"button",size:"icon",variant:"ghost",className:Ie("h-7 w-7 opacity-0 transition-all focus-visible:opacity-100 group-hover:opacity-100",h&&"opacity-100"),title:"More group actions","aria-haspopup":"menu","aria-expanded":h,onClick:()=>b(L=>!L),children:(0,w.jsx)(Ro,{className:"h-4 w-4"})}),C&&I?(0,jS.createPortal)(C,I):null]})}function iu({children:e,disabled:t,icon:a,onSelect:o,tone:r="normal"}){return(0,w.jsxs)("button",{type:"button",role:"menuitem",disabled:t,className:Ie("flex h-8 w-full items-center gap-2 rounded-lg px-2 text-left text-[12px] outline-none transition-colors","disabled:pointer-events-none disabled:opacity-45",r==="normal"&&"text-loupe-muted hover:bg-loupe-elev hover:text-loupe-fg focus-visible:bg-loupe-elev focus-visible:text-loupe-fg",r==="danger"&&"text-loupe-muted hover:bg-red-500/10 hover:text-red-200 focus-visible:bg-red-500/10 focus-visible:text-red-200"),onClick:o,children:[(0,w.jsx)("span",{className:"grid h-4 w-4 shrink-0 place-items-center",children:a}),(0,w.jsx)("span",{className:"min-w-0 truncate",children:e})]})}function _k({action:e,colored:t=!1}){let a=Gk(e);return a?(0,w.jsx)("span",{"aria-hidden":"true",className:Ie("inline-flex h-[15px] w-[15px] shrink-0 items-center justify-center [&>svg]:block [&>svg]:h-[15px] [&>svg]:w-[15px]",t&&Vk(e)),dangerouslySetInnerHTML:{__html:a}}):(0,w.jsx)(gl,{className:"h-3.5 w-3.5 shrink-0"})}function Gk(e){let t=`${e?.id??""} ${e?.label??""}`.toLowerCase();return t.includes("claude")?Ok:t.includes("codex")||t.includes("openai")?Bk:null}function Vk(e){let t=`${e?.id??""} ${e?.label??""}`.toLowerCase();return t.includes("claude")?"text-[#d97757]":t.includes("codex")||t.includes("openai")?"text-loupe-fg":"text-loupe-muted"}function Xk({annotation:e,ctx:t}){let a=t.expanded===e.id,o=e.status==="resolved",r=e.comments?.length??0,l=Zi(t.bridgeUrl,e.dir,"shot.png",{pageUrl:location.href,repoRoot:t.repoRoot}),n=Ca(e.url)!==Ca(location.href);return(0,w.jsxs)("article",{draggable:!0,className:Ie("rounded-xl border border-transparent bg-transparent transition-colors hover:bg-white/[0.04]",a&&"border-loupe-line bg-white/[0.04]"),onDragStart:u=>{u.dataTransfer.effectAllowed="move",u.dataTransfer.setData("application/x-loupe-annotation-id",e.id)},onDragEnd:()=>t.setDragOverGroup(null),children:[(0,w.jsxs)("button",{type:"button",className:"flex w-full items-start gap-2 p-2 text-left",onClick:()=>t.setExpanded(a?null:e.id),children:[(0,w.jsx)("img",{src:l,alt:"",className:"h-11 w-14 shrink-0 rounded-lg border border-loupe-line bg-loupe-bg object-cover",onError:u=>u.currentTarget.remove()}),(0,w.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,w.jsx)("div",{className:"truncate text-[12.5px] font-medium text-loupe-fg",children:iA(e)}),e.note?(0,w.jsx)("div",{className:"mt-0.5 line-clamp-2 text-[12px] leading-snug text-loupe-muted",children:e.note}):null,(0,w.jsxs)("div",{className:"mt-1 flex flex-wrap items-center gap-1.5",children:[(0,w.jsx)(qi,{tone:o?"resolved":"open",children:o?"Resolved":"Open"}),(0,w.jsxs)(qi,{children:[(0,w.jsx)(Gn,{className:"h-3 w-3"}),r]}),n?(0,w.jsx)(qi,{children:KS(e.url)}):null]})]}),(0,w.jsx)(He,{variant:"secondary",size:"icon",title:n?"Open annotation page":"Jump to annotation",onClick:u=>{u.stopPropagation(),aA(e,t)},children:(0,w.jsx)(zn,{className:"h-3.5 w-3.5"})})]}),a?(0,w.jsx)(jk,{annotation:e,ctx:t}):null]})}function jk({annotation:e,ctx:t}){let[a,o]=M.useState(e.note??""),[r,l]=M.useState(""),[n,u]=M.useState(!1),[s,i]=M.useState(!1),[d,p]=M.useState([]),[x,h]=M.useState(null),b=M.useRef(null),v=e;M.useEffect(()=>{let g=!0;return chrome.runtime.sendMessage({type:"references"}).then(S=>{g&&S.ok&&p(S.references)}),()=>{g=!1}},[]);async function y(){u(!0);let g=await chrome.runtime.sendMessage({type:"update-annotation",id:e.id,patch:{note:a}});u(!1),g.ok&&await t.reload()}async function c(g,S){if(!g)return;i(!0);let I=await chrome.runtime.sendMessage({type:"comment",id:e.id,comment:{author:t.author,body:g,createdAt:new Date().toISOString(),...S?{status:S}:{}}});i(!1),I.ok&&(l(""),await t.reload())}async function f(g,S){h({tone:"muted",text:"Attaching reference..."});let I=await chrome.runtime.sendMessage({type:"add-reference",id:e.id,reference:{caption:S,dataUrl:g}});if(!I.ok){let C=I.error||"couldn't attach reference";throw h({tone:"error",text:C}),new Error(C)}await t.reload(),h({tone:"ok",text:"Reference attached"})}let m=(e.references??[]).map(g=>g.file).filter(g=>!!g);return(0,w.jsxs)("div",{className:"border-t border-loupe-line px-2 pb-2 pt-2",children:[m.length>0?(0,w.jsx)("div",{className:"mb-2 flex flex-wrap gap-1.5",children:m.map(g=>{let S=Zi(t.bridgeUrl,e.dir,g,{pageUrl:location.href,repoRoot:t.repoRoot});return(0,w.jsx)("button",{type:"button",className:"h-16 overflow-hidden rounded-lg border border-loupe-line bg-loupe-bg",onClick:()=>t.setLightbox(S),children:(0,w.jsx)("img",{src:S,alt:"",className:"h-full w-auto object-cover"})},g)})}):null,v.resolution?.primary?(0,w.jsx)("div",{className:"mb-2 break-all font-mono text-[11px] text-loupe-faint",children:v.resolution.primary}):null,(0,w.jsx)(_S,{value:a,onChange:g=>o(g.target.value),placeholder:"Annotation note..."}),(0,w.jsxs)("div",{className:"mt-2 flex items-center gap-1.5",children:[(0,w.jsx)("input",{ref:b,type:"file",accept:"image/*",className:"hidden",onChange:async g=>{let S=g.currentTarget.files?.[0];if(S)try{await f(await QS(S),S.name),g.currentTarget.value=""}catch{}}}),(0,w.jsxs)(He,{variant:"secondary",size:"xs",onClick:()=>b.current?.click(),children:[(0,w.jsx)(Fn,{className:"h-3.5 w-3.5"}),"Add ref"]}),(0,w.jsx)(Wk,{bridgeUrl:t.bridgeUrl,repoRoot:t.repoRoot,refs:d,onAttach:async g=>{await f(await cA(Zi(t.bridgeUrl,g.dir,"shot.png",{pageUrl:location.href,repoRoot:t.repoRoot})),g.note||g.title||"library reference")}})]}),x?(0,w.jsx)("div",{className:Ie("mt-1.5 rounded-md border px-2 py-1 text-[11px]",x.tone==="ok"&&"border-loupe-accent/25 bg-loupe-accent/10 text-loupe-muted",x.tone==="error"&&"border-white/25 bg-white/10 text-loupe-fg",x.tone==="muted"&&"border-loupe-line bg-loupe-bg/60 text-loupe-faint"),children:x.text}):null,(0,w.jsx)("div",{className:"mt-2 space-y-1.5",children:(e.comments??[]).map((g,S)=>(0,w.jsxs)("div",{className:"rounded-xl border border-loupe-line bg-loupe-bg/60 px-2.5 py-1.5",children:[(0,w.jsxs)("div",{className:"mb-0.5 text-[10.5px] text-loupe-faint",children:[g.author," \xB7 ",dA(g.createdAt),g.status?` \xB7 ${g.status}`:""]}),(0,w.jsx)("div",{className:"whitespace-pre-wrap text-[12px] leading-snug text-loupe-fg/90",children:g.body})]},`${g.createdAt}-${S}`))}),(0,w.jsxs)("div",{className:"mt-2 flex items-center gap-1.5",children:[(0,w.jsx)(su,{value:r,onChange:g=>l(g.target.value),placeholder:"comment...",onKeyDown:g=>{g.key==="Enter"&&c(r)}}),(0,w.jsx)(He,{variant:"secondary",size:"icon",className:"shrink-0",disabled:s||!r.trim(),onClick:()=>void c(r),"aria-label":s?"Sending comment":"Comment",title:"Comment",children:(0,w.jsx)(gl,{className:"h-3.5 w-3.5"})})]}),(0,w.jsxs)("div",{className:"mt-2 flex items-center gap-1.5",children:[(0,w.jsx)(He,{className:"w-20",variant:"primary",size:"xs",disabled:n,onClick:()=>void y(),children:n?"Saving...":"Save"}),(0,w.jsx)(He,{className:"w-20",variant:"secondary",size:"xs",onClick:()=>void c(e.status==="resolved"?"reopened":"resolved",e.status==="resolved"?"open":"resolved"),children:e.status==="resolved"?"Reopen":"Resolve"}),(0,w.jsx)(Zk,{annotation:e,onDone:async()=>{t.setExpanded(null),await t.reload()}})]})]})}function Wk({bridgeUrl:e,repoRoot:t,refs:a,onAttach:o}){let[r,l]=M.useState(!1),[n,u]=M.useState(""),[s,i]=M.useState(()=>new Set),[d,p]=M.useState(null),[x,h]=M.useState(null),b=M.useRef(null),v=M.useMemo(()=>sA(a,n),[a,n]);M.useEffect(()=>{if(!r)return;let f=g=>{b.current&&(g.composedPath().includes(b.current)||l(!1))},m=g=>{g.key==="Escape"&&(g.preventDefault(),l(!1))};return window.addEventListener("pointerdown",f,!0),window.addEventListener("keydown",m,!0),()=>{window.removeEventListener("pointerdown",f,!0),window.removeEventListener("keydown",m,!0)}},[r]);async function y(f){p(f.id),h(null);try{await o(f),l(!1)}catch(m){h(m instanceof Error?m.message:String(m))}finally{p(null)}}function c(f){i(m=>{let g=new Set(m);return g.has(f)?g.delete(f):g.add(f),g})}return(0,w.jsxs)("div",{ref:b,className:"relative","data-loupe-library-popover":r?"":void 0,children:[(0,w.jsxs)(He,{type:"button",variant:"secondary",size:"xs","aria-expanded":r,onClick:()=>l(f=>!f),children:[(0,w.jsx)(_n,{className:"h-3.5 w-3.5"}),"From library"]}),r?(0,w.jsx)("div",{className:"fixed inset-0 z-[2147483647] grid place-items-center bg-black/70 p-4 text-loupe-fg",onMouseDown:f=>{f.target===f.currentTarget&&l(!1)},children:(0,w.jsxs)("div",{className:"flex max-h-[min(760px,calc(100vh-2rem))] w-[min(920px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-loupe-line bg-loupe-panel shadow-2xl shadow-black/60",children:[(0,w.jsxs)("div",{className:"flex items-start gap-3 border-b border-loupe-line px-4 py-3",children:[(0,w.jsxs)("div",{className:"min-w-0",children:[(0,w.jsx)("div",{className:"text-[13px] font-semibold leading-none",children:"Reference library"}),(0,w.jsx)("div",{className:"mt-1 text-[11px] text-loupe-muted",children:"Choose a capture to attach."})]}),(0,w.jsx)(He,{variant:"ghost",size:"icon",className:"ml-auto h-7 w-7",title:"Close library",onClick:()=>l(!1),children:(0,w.jsx)(Xa,{className:"h-3.5 w-3.5"})})]}),(0,w.jsx)("div",{className:"border-b border-loupe-line p-3",children:(0,w.jsx)(su,{className:"h-8",type:"search",value:n,onChange:f=>u(f.target.value),placeholder:"Search library"})}),(0,w.jsxs)("div",{className:"flex-1 overflow-y-auto p-3",children:[x?(0,w.jsx)("div",{className:"mb-3 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[12px] text-loupe-fg",children:x}):null,a.length===0?(0,w.jsx)("div",{className:"rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint",children:"No saved references yet"}):v.length===0?(0,w.jsx)("div",{className:"rounded-lg border border-loupe-line bg-loupe-bg/50 px-4 py-8 text-center text-[12px] text-loupe-faint",children:"No matches"}):(0,w.jsx)("div",{className:"space-y-4",children:v.map(([f,m])=>(0,w.jsxs)("section",{className:"space-y-2",children:[(0,w.jsxs)("button",{type:"button",className:"flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[11px] font-medium text-loupe-muted transition-colors hover:bg-white/5 hover:text-loupe-fg",onClick:()=>c(f),children:[(0,w.jsx)(vl,{className:Ie("h-3.5 w-3.5 shrink-0 transition-transform",(n.trim()||!s.has(f))&&"rotate-90")}),(0,w.jsx)("span",{children:f}),(0,w.jsx)("span",{className:"ml-auto text-loupe-faint",children:m.length})]}),n.trim()||!s.has(f)?(0,w.jsx)("div",{className:"grid grid-cols-1 gap-2 sm:grid-cols-2",children:m.map(g=>{let S=Zi(e,g.dir,"shot.png",{pageUrl:location.href,repoRoot:t});return(0,w.jsxs)("button",{type:"button",className:"group overflow-hidden rounded-xl border border-loupe-line bg-loupe-bg/70 text-left transition-all hover:border-loupe-line-strong hover:bg-white/[0.04] active:scale-[0.99]",onClick:()=>void y(g),disabled:d!==null,children:[(0,w.jsx)("div",{className:"aspect-[16/9] border-b border-loupe-line bg-black/40",children:(0,w.jsx)("img",{src:S,alt:"",className:"h-full w-full object-cover"})}),(0,w.jsxs)("div",{className:"space-y-1 p-2.5",children:[(0,w.jsx)("div",{className:"line-clamp-1 text-[12px] font-medium text-loupe-fg",children:g.note||g.title||"Untitled reference"}),(0,w.jsx)("div",{className:"line-clamp-1 text-[10.5px] text-loupe-faint",children:g.url||g.id}),(0,w.jsx)("div",{className:"pt-1 text-[11px] font-medium text-loupe-muted group-hover:text-loupe-fg",children:d===g.id?"Attaching...":"Attach"})]})]},g.id)})}):null]},f))})]})]})}):null]})}function Zk({annotation:e,onDone:t}){let[a,o]=M.useState(!1);return(0,w.jsxs)(He,{className:"ml-auto min-w-20",variant:"danger",size:"xs",disabled:a,onClick:async()=>{if(!window.confirm("Delete this annotation?"))return;o(!0);let r=await chrome.runtime.sendMessage({type:"delete-annotation",id:e.id});o(!1),r.ok&&await t()},children:[(0,w.jsx)(ur,{className:"h-3.5 w-3.5"}),a?"Deleting...":"Delete"]})}function Yk({count:e,onDone:t}){let[a,o]=M.useState(!1);return(0,w.jsxs)(He,{variant:"danger",size:"xs",disabled:a,onClick:async()=>{if(!window.confirm(`Delete ${e} resolved annotation${e===1?"":"s"}?`))return;o(!0);let r=await chrome.runtime.sendMessage({type:"delete-resolved"});o(!1),r.ok&&await t()},children:[(0,w.jsx)(ur,{className:"h-3.5 w-3.5"}),a?"Deleting...":"Delete resolved"]})}function Kk({annotations:e,showResolved:t,expanded:a,setExpanded:o,setFilter:r,setCollapsed:l}){let n=Ca(location.href),u=e.filter(s=>Ca(s.url)===n&&(t||s.status!=="resolved"));return(0,w.jsxs)(w.Fragment,{children:[u.map((s,i)=>{let d=s.rect.x+(s.scroll?.x??0),p=s.rect.y+(s.scroll?.y??0);return(0,w.jsx)("button",{type:"button",className:Ie("fixed z-[2147483645] grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[11px] font-semibold shadow-lg shadow-black/45 ring-2 transition-colors",a===s.id?"border-amber-200/80 bg-amber-300 text-black ring-amber-400/35":"border-white/35 bg-loupe-bg/95 text-loupe-fg ring-white/35"),style:{left:d-window.scrollX,top:p-window.scrollY},onClick:()=>{o(s.id),r("page"),l(!1)},children:i+1},s.id)}),a?(0,w.jsx)(Qk,{annotation:e.find(s=>s.id===a)}):null]})}function Qk({annotation:e}){if(!e||Ca(e.url)!==Ca(location.href))return null;let t=e.rect.x+(e.scroll?.x??0),a=e.rect.y+(e.scroll?.y??0);return(0,w.jsx)("div",{className:"pointer-events-none fixed z-[2147483644] rounded border border-amber-300/90 bg-amber-300/15 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_0_0_4px_rgba(251,191,36,0.12)]",style:{left:t-window.scrollX,top:a-window.scrollY,width:e.rect.width,height:e.rect.height}})}function Jk({src:e,onClose:t}){return(0,w.jsxs)("div",{className:"fixed inset-0 z-[2147483647] grid place-items-center bg-black/80 p-6",onClick:t,children:[(0,w.jsx)(He,{className:"fixed right-4 top-4 bg-white/10",variant:"ghost",size:"icon",onClick:t,children:(0,w.jsx)(Xa,{className:"h-4 w-4"})}),(0,w.jsx)("img",{src:e,alt:"annotation screenshot",className:"max-h-full max-w-full rounded-lg border border-loupe-line bg-loupe-bg object-contain shadow-2xl shadow-black/50",onClick:a=>a.stopPropagation()})]})}function GS({active:e,children:t,count:a,onClick:o}){return(0,w.jsxs)("button",{type:"button",className:Ie("flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-[11px] text-loupe-muted transition-all hover:text-loupe-fg active:scale-[0.98]",e&&"bg-loupe-elev text-loupe-fg"),onClick:o,children:[(0,w.jsx)("span",{children:t}),(0,w.jsx)("span",{className:Ie("grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none",e?"bg-loupe-fg text-loupe-bg":"border border-loupe-line-strong bg-white/10 text-loupe-muted"),children:a})]})}function $k(){return(0,w.jsx)("span",{className:"grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-lg border border-loupe-line bg-loupe-elev/85",children:(0,w.jsx)(yl,{className:"h-4 w-4 text-loupe-muted"})})}function eA(){return(0,w.jsxs)("footer",{className:"flex shrink-0 items-center justify-between gap-3 border-t border-loupe-line px-3 py-2 text-loupe-muted",children:[(0,w.jsxs)("span",{className:"inline-flex items-center gap-1.5 text-[11px] font-medium",children:[(0,w.jsx)("span",{className:"grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-full border border-loupe-line bg-loupe-elev/85",children:(0,w.jsx)(yl,{className:"h-3 w-3"})}),"Powered by Loupe"]}),(0,w.jsxs)("button",{type:"button",title:"Open Loupe on GitHub",className:"inline-flex h-7 items-center gap-1.5 rounded-md border border-loupe-line bg-transparent px-2 text-[11px] font-semibold text-loupe-muted transition-colors hover:border-loupe-line-strong hover:text-loupe-fg",onClick:()=>window.open(Pk,"_blank","noopener,noreferrer"),children:[(0,w.jsx)("span",{className:"grid h-3.5 w-3.5 place-items-center",dangerouslySetInnerHTML:{__html:Uk}}),"GitHub"]})]})}function tA(e,t){let a=M.useRef(new Map);M.useLayoutEffect(()=>{let o=e.current;if(!o||typeof window<"u"&&window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)return;let r=Array.from(o.querySelectorAll(":scope > [data-loupe-group-slug]")),l=new Map;for(let n of r){let u=n.getAttribute("data-loupe-group-slug");if(!u)continue;let s=n.getBoundingClientRect().top;l.set(u,s);let i=a.current.get(u);if(i===void 0||i===s)continue;let d=i-s;n.style.transition="none",n.style.transform=`translateY(${d}px)`,requestAnimationFrame(()=>{n.style.transition="transform 200ms cubic-bezier(0.2, 0, 0, 1)",n.style.transform=""})}a.current=l},[e,t])}function aA(e,t){if(Ca(e.url)!==Ca(location.href)){location.href=e.url;return}t.setFilter("page"),t.setExpanded(e.id),t.setCollapsed(!1),window.scrollTo({top:Math.max(0,e.rect.y+(e.scroll?.y??0)-96),behavior:"smooth"})}async function oA(){let e=await chrome.runtime.sendMessage({type:"actions"});return e.ok?e.actions:[]}async function rA(){let e=await chrome.runtime.sendMessage({type:"groups"});return e.ok?e.groups:[]}function lA(e,t){let a=new Map;for(let o of t)a.set(o.slug,{group:o.group,slug:o.slug,items:[]});for(let o of e){let r=o.groupSlug||YS(o.group),l=a.get(r);l?l.items.push(o):a.set(r,{group:o.group||r,slug:r,items:[o]})}return[...a.values()]}function nA(e,t){if(!t)return e;let a=new Map(e.map(l=>[l.slug,l])),o=t.map(l=>a.get(l)).filter(l=>!!l),r=e.filter(l=>!t.includes(l.slug));return[...o,...r]}function ZS(e,t,a,o){if(t===a||!e.includes(t)||!e.includes(a))return e;let r=e.filter(u=>u!==t),l=r.indexOf(a);if(l<0)return e;let n=o==="after"?l+1:l;return[...r.slice(0,n),t,...r.slice(n)]}function VS(e){let t=e.currentTarget.getBoundingClientRect();return e.clientY>t.top+t.height/2?"after":"before"}function XS(e,t){return e.length===t.length&&e.every((a,o)=>a===t[o])}function YS(e){return(e??"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"inbox"}function uA(e){let t=Array.from(e.dataTransfer.types);return t.includes("application/x-loupe-annotation-id")||t.includes("application/x-loupe-group-slug")}function sA(e,t){let a=im(t),o=new Map;for(let r of e){let l=KS(r.url),n=im(l).includes(a),u=[r.note,r.title,r.url,r.id].some(s=>im(s).includes(a));a&&!n&&!u||(o.get(l)??o.set(l,[]).get(l)).push(r)}return[...o.entries()].sort(([r],[l])=>r.localeCompare(l))}function im(e){return(e??"").toLowerCase().trim()}function iA(e){return e.target.componentChain.map(t=>t.name).join(" \u203A ")||e.target.tag}function Zi(e,t,a,o={}){let r=new URL("/file",e.endsWith("/")?e:`${e}/`);return r.searchParams.set("path",`${t}/${a}`),o.pageUrl&&r.searchParams.set("pageUrl",o.pageUrl),o.repoRoot&&r.searchParams.set("repoRoot",o.repoRoot),r.toString()}function Ca(e){return(e??"").split("#")[0]??""}function fm(e){let t=e.label.replace(/^\s*(?:→|->|➜|›|»)\s*/,"").trim()||e.id,a=t.search(/[A-Za-z]/);return a<0?t:t.slice(0,a)+t[a].toUpperCase()+t.slice(a+1)}function fA(e,t){return e.composedPath().some(a=>a instanceof HTMLElement&&a.hasAttribute(t))}function KS(e){try{return new URL(e??"").host}catch{return"other page"}}function dA(e){let t=new Date(e).getTime();if(Number.isNaN(t))return"";let a=Math.max(0,(Date.now()-t)/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)}m ago`:a<86400?`${Math.floor(a/3600)}h ago`:`${Math.floor(a/86400)}d ago`}function QS(e){return new Promise((t,a)=>{let o=new FileReader;o.onload=()=>t(o.result),o.onerror=()=>a(o.error),o.readAsDataURL(e)})}async function cA(e){let t=await fetch(e);if(!t.ok)throw new Error(`reference image responded ${t.status}`);return QS(new File([await t.blob()],"reference.png"))}var $S=B(Ze(),1),pA=":host{all:initial;font-family:ui-sans-serif,-apple-system,system-ui,sans-serif}",Yi=class{constructor(t){this.stylesheet=t}host=null;root=null;reactRoot=null;get active(){return this.host!==null}toggle(){this.active?this.close():this.open()}async open(){if(this.active)return;let t=document.createElement("div");t.setAttribute("data-loupe-overlay","");let a=t.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=pA+`
`+this.stylesheet;let r=document.createElement("div");a.append(o,r),document.body.append(t),this.host=t,this.root=a,this.reactRoot=(0,JS.createRoot)(r),this.reactRoot.render((0,$S.jsx)(WS,{onClose:()=>this.close()})),window.addEventListener("keydown",this.onKey,!0);for(let l of["keyup","keypress","paste","copy","cut"])window.addEventListener(l,this.onContain,!0);for(let l of["input","beforeinput"])t.addEventListener(l,this.stopBubble)}close(){window.removeEventListener("keydown",this.onKey,!0);for(let t of["keyup","keypress","paste","copy","cut"])window.removeEventListener(t,this.onContain,!0);this.reactRoot?.unmount(),this.host?.remove(),this.reactRoot=null,this.host=null,this.root=null}stopBubble=t=>{t.stopPropagation()};onContain=t=>{this.host&&t.composedPath().includes(this.host)&&t.stopImmediatePropagation()};onKey=t=>{this.active&&this.host&&t.composedPath().includes(this.host)&&t.stopImmediatePropagation()}};var Uo=null,cm=null,fu="annotate",uL="http://localhost:7337",pm="",mA="loupeDraft:",hA=24*60*60*1e3;async function xA(){if(cm?.close(),Uo?.active){Uo.disable();return}await gA(await RA())}async function gA(e=null){let t=await xu();uL=gu(t,location.href),pm=t.activeRepoRoot??"";let a=t.bridgeRoutes.flatMap(r=>r.origins);fu=hu(location.href,[...t.projectOrigins,...a])?"annotate":"reference";let o=e?.mode===fu?e:null;if(fu==="reference")Uo=new Lr({mode:"reference",stylesheet:mu,generateId:oL,draft:o,onDraftChange:aL,onSubmit:eL});else{let[r,l,n,u]=await Promise.all([yA(),wA(),IA(),LA()]);Uo=new Lr({actions:r,groups:l,defaultGroup:n,createGroup:SA,library:u,resolveLibraryImage:CA,stylesheet:mu,generateId:oL,captureTarget:MA,draft:o,onDraftChange:aL,onSubmit:eL})}Uo.enable()}function vA(){Uo?.disable(),cm??=new Yi(mu),cm.toggle()}async function eL(e,t){Uo?.setChromeVisible(!1),await lL(),await lL();let a=await chrome.runtime.sendMessage({type:"capture",rect:e.rect,devicePixelRatio:e.devicePixelRatio});if(Uo?.setChromeVisible(!0),!a.ok)throw new Error(`screenshot failed: ${a.error}`);e.screenshotDataUrl=a.dataUrl;let o=await BA(e);if(fu==="reference"){let n=await chrome.runtime.sendMessage({type:"save-reference",annotation:e});if(!n.ok)throw new Error(n.error);nL(`saved to library \u2192 ${n.detail??""}
pull it into an annotation from your app${o?`
${o}`:""}`);return}await chrome.storage.local.set({lastGroup:e.group??""});let r=await chrome.runtime.sendMessage({type:"annotate",payload:{annotation:e,actions:bA(t)}});if(!r.ok)throw new Error(r.error);let l=Object.entries(r.results).map(([n,u])=>`${n} ${u.ok?"\u2713":"\u2717"}${u.detail?` (${u.detail})`:""}`).join("  \xB7  ");nL(`${e.group?`[${e.group}] `:""}saved \u2192 ${r.dir}${l?`
${l}`:""}${o?`
${o}`:""}`)}function bA(e){return e.length===0||e.includes("save")?tL(e):["save",...tL(e)]}function tL(e){return[...new Set(e)]}async function yA(){let e=await chrome.runtime.sendMessage({type:"actions"});return e.ok?e.actions:[{id:"save",label:"Save to repo"},{id:"claude",label:"Claude"}]}async function wA(){let e=await chrome.runtime.sendMessage({type:"groups"});return e.ok?e.groups.map(t=>t.group):[]}async function SA(e){let t=await chrome.runtime.sendMessage({type:"create-group",group:e});if(!t.ok)throw new Error(t.error)}async function LA(){let e=await chrome.runtime.sendMessage({type:"references"});return e.ok?e.references.map(t=>({id:t.id,caption:t.title||t.note||t.url||t.id,url:t.url,thumbUrl:sL(t.dir)})):[]}async function CA(e){let t=await chrome.runtime.sendMessage({type:"references"});if(!t.ok)return null;let a=t.references.find(o=>o.id===e);if(!a)return null;try{let o=await(await fetch(sL(a.dir))).blob();return await EA(o)}catch{return null}}function sL(e){let t=new URL("/file",uL);return t.searchParams.set("path",`${e}/shot.png`),t.searchParams.set("pageUrl",location.href),pm&&t.searchParams.set("repoRoot",pm),t.toString()}async function IA(){let{lastGroup:e}=await chrome.storage.local.get({lastGroup:""});return e}async function RA(){let e=Ki(location.href);try{let a=(await chrome.storage.session.get(e))[e];return kA(a)?a:(await chrome.storage.session.remove(e),null)}catch(t){return console.warn("[loupe] draft load failed",t),null}}async function aL(e){let t=Ki(e?.url??location.href);try{if(!e){await chrome.storage.session.remove(t);return}await chrome.storage.session.set({[t]:e})}catch(a){console.warn("[loupe] draft save failed",a)}}function Ki(e){return`${mA}${AA(e)}`}function kA(e){if(!e||typeof e!="object")return!1;let t=e;if(Ki(t.url??"")!==Ki(location.href)||t.mode!=="annotate"&&t.mode!=="reference"||!t.rect||!Array.isArray(t.references)||!Array.isArray(t.acceptedKinds))return!1;let a=Date.parse(t.updatedAt??"");return Number.isFinite(a)&&Date.now()-a<hA}function AA(e){try{let t=new URL(e);return t.hash="",t.href}catch{return e}}function oL(){return crypto.randomUUID().slice(0,8)}async function MA(e){let t=Tl(e);if(t.componentChain.length>0)return t;let a=await TA(e);return a.length>0?{...t,componentChain:a}:t}var dm="data-loupe-inspect-id",DA="loupe:inspect-framework-request",rL="loupe:inspect-framework-response";function TA(e){let t=`loupe-${crypto.randomUUID()}`;return e.setAttribute(dm,t),new Promise(a=>{let o=window.setTimeout(l,200,[]);function r(n){let u=n.detail;u?.id===t&&l(Array.isArray(u.componentChain)?u.componentChain:[])}function l(n){window.clearTimeout(o),window.removeEventListener(rL,r),e.getAttribute(dm)===t&&e.removeAttribute(dm),a(n.filter(u=>typeof u.name=="string"&&u.name.length>0))}window.addEventListener(rL,r),window.dispatchEvent(new CustomEvent(DA,{detail:{id:t}}))})}chrome.runtime.onMessage.addListener(e=>{e.type==="toggle"&&xA(),e.type==="toggle-view"&&vA()});function lL(){return new Promise(e=>requestAnimationFrame(()=>e()))}function EA(e){return new Promise((t,a)=>{let o=new FileReader;o.onload=()=>t(o.result),o.onerror=()=>a(o.error),o.readAsDataURL(e)})}async function OA(e){let t=await PA(e);if(!navigator.clipboard?.writeText)throw new Error("clipboard unavailable");return await navigator.clipboard.writeText(UA(e,t)),"copied agent prompt"}async function BA(e){try{return await OA(e)}catch(t){return console.warn("[loupe] automatic clipboard copy failed",t),null}}async function PA(e){if(fu!=="annotate")return null;try{let t=await chrome.runtime.sendMessage({type:"resolve-target",target:e.target});return t.ok?{source:t.source,candidates:t.candidates,method:t.method}:null}catch{return null}}function UA(e,t){let a=e.target.componentChain.map(r=>r.name).join(" > ")||e.target.tag,o=["Implement this Loupe UI annotation.","",`Annotation id: ${e.id}`,e.group?`Group: ${e.group}`:"",`Component: ${a}`].filter(Boolean);return e.target.dataAttributes["data-slot"]&&o.push(`Slot: ${e.target.dataAttributes["data-slot"]}`),e.target.dataAttributes["data-testid"]&&o.push(`Test id: ${e.target.dataAttributes["data-testid"]}`),o.push(`Selector: ${e.target.selector}`),e.target.className&&o.push(`Class: ${e.target.className}`),t?.source?o.push(`Source: ${t.source}`):t?.candidates.length?o.push(`Possible sources: ${t.candidates.join(", ")}`):o.push("Source: unresolved"),o.push(`Page: ${e.title}`,`URL: ${e.url}`),e.note&&o.push("","Requested change:",e.note),e.target.text&&o.push("",`Selected text: ${e.target.text}`),o.push("","Use the Loupe screenshot/reference bundle if this was saved to the repo."),o.join(`
`)}function nL(e){let t=document.createElement("div");t.setAttribute("data-loupe-overlay","");let a=t.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=`
    .t { position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
         background: #101010; color: #f8f8f8; padding: 9px 14px; border-radius: 12px;
         font: 13px ui-sans-serif, system-ui, sans-serif; z-index: 2147483647; white-space: pre-line;
         box-shadow: 0 12px 40px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08); max-width: 440px; }`;let r=document.createElement("div");r.className="t",r.textContent=e,a.append(o,r),document.body.append(t),setTimeout(()=>t.remove(),4200)}
