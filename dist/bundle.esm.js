import{curry as n,tap as t,bind as r,pickBy as e,unary as o,complement as u,isEmpty as i,compose as c,fromPairs as a,filter as s,isNil as l,map as f,toPairs as h,replace as p,type as d,join as y,reduce as v,append as b,T as g}from"ramda";var m=function(n,t){return(m=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r])})(n,t)};function w(n,t){function r(){this.constructor=n}m(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var j=function(){return(j=Object.assign||function(n){for(var t,r=1,e=arguments.length;r<e;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}).apply(this,arguments)};function O(n,t,r,e){return new(r||(r=Promise))(function(o,u){function i(n){try{a(e.next(n))}catch(n){u(n)}}function c(n){try{a(e.throw(n))}catch(n){u(n)}}function a(n){n.done?o(n.value):new r(function(t){t(n.value)}).then(i,c)}a((e=e.apply(n,t||[])).next())})}function P(n,t){var r,e,o,u,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function c(u){return function(c){return function(u){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,e&&(o=2&u[0]?e.return:u[0]?e.throw||((o=e.return)&&o.call(e),0):e.next)&&!(o=o.call(e,u[1])).done)return o;switch(e=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,e=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=t.call(n,i)}catch(n){u=[6,n],e=0}finally{r=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,c])}}}var C,_=n(function(n,t){return j({},t,{headers:Object.assign({},t.headers,n)})}),S=(C=function(n,t,r){return O(null,void 0,void 0,function(){return P(this,function(e){switch(e.label){case 0:return r<t.length?[4,n(t[r])]:[3,3];case 1:return e.sent(),[4,C(n,t,++r)];case 2:e.sent(),e.label=3;case 3:return[2]}})})},n(function(n,t){return C(n,t,0)})),A=n(function(n,t){return Promise.all(t.map(n))}),T=function(n){return Promise.all(n)},x=t(r(console.log,console)),q=e(o(u(i))),E=function(t,r){return n(t[r].bind(t))},k=n(function(n,t){return c(a,s(u(l)),f(function(t){var r=t[0],e=t[1];return null===n[r]?null:[n[r]||r,e]}),h)(t)}),M=function(){var n=function(t,r,e){return O(null,void 0,Promise,function(){var o,u,i;return P(this,function(c){switch(c.label){case 0:return~e?(u=n,i=[t],[4,t[e](r)]):[3,3];case 1:return[4,u.apply(void 0,i.concat([c.sent(),--e]))];case 2:return o=c.sent(),[3,4];case 3:o=r,c.label=4;case 4:return[2,o]}})})};return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return function(r){return n(t,r,t.length-1)}}}();var N=function(n){return null!=n&&"object"==typeof n&&!0===n["@@functional/placeholder"]};var W=function(n){return function t(r){return 0===arguments.length||N(r)?t:n.apply(this,arguments)}};var U=function(n){return function t(r,e){switch(arguments.length){case 0:return t;case 1:return N(r)?t:W(function(t){return n(r,t)});default:return N(r)&&N(e)?t:N(r)?W(function(t){return n(t,e)}):N(e)?W(function(t){return n(r,t)}):n(r,e)}}};var F=function(n){return function t(r,e,o){switch(arguments.length){case 0:return t;case 1:return N(r)?t:U(function(t,e){return n(r,t,e)});case 2:return N(r)&&N(e)?t:N(r)?U(function(t,r){return n(t,e,r)}):N(e)?U(function(t,e){return n(r,t,e)}):W(function(t){return n(r,e,t)});default:return N(r)&&N(e)&&N(o)?t:N(r)&&N(e)?U(function(t,r){return n(t,r,o)}):N(r)&&N(o)?U(function(t,r){return n(t,e,r)}):N(e)&&N(o)?U(function(t,e){return n(r,t,e)}):N(r)?W(function(t){return n(t,e,o)}):N(e)?W(function(t){return n(r,t,o)}):N(o)?W(function(t){return n(r,e,t)}):n(r,e,o)}}};var G=function(n){return"[object Object]"===Object.prototype.toString.call(n)};var H=function(n,t){return Object.prototype.hasOwnProperty.call(t,n)},I=F(function(n,t,r){var e,o={};for(e in t)H(e,t)&&(o[e]=H(e,r)?n(e,t[e],r[e]):t[e]);for(e in r)H(e,r)&&!H(e,o)&&(o[e]=r[e]);return o}),J=F(function n(t,r,e){return I(function(r,e,o){return G(e)&&G(o)?n(t,e,o):t(r,e,o)},r,e)}),L=U(function(n,t){return J(function(n,t,r){return r},n,t)}),R=W(function(n){return null===n?"Null":void 0===n?"Undefined":Object.prototype.toString.call(n).slice(8,-1)}),z=n(function(n,t){for(var r,e=null,o=null,u=0;u<t.length;u++)r=t[u],n.includes(r)?e&&(o=u):(null==e&&(e=u),o=null);return t.slice(e||0,o||t.length)}),B=c(p(/&/g,"\\&"),String),D=function(n,t,r){switch(d(r)){case"Array":switch(n){case"[]":return c(y("&"),v(function(r,e){return b(D(n,t+"[]",e),r)},[]))(r);case",":return t+"="+c(y(","),v(function(n,t){return b(B(t),n)},[]))(r)}default:return t+"="+B(r)}},K=function(n){var t=[];if(n.params){var r=[];Object.entries(n.params).forEach(function(t){var e=t[0],o=t[1];null!=o&&r.push(D(n.handleArrays||"[]",e,o))}),r.length&&t.push("?"+r.join("&"))}return encodeURI((n.url||"")+t.map(z("-")).join("/"))},Q=z("/"),V=function(n,t){return t.includes("://")||t.startsWith(n)?t:Q(n)+"/"+Q(t)},X=function(n){return n},Y={base:"/",json:!0,headers:{},timeout:1e4,throwCodes:/\n/,credentials:"same-origin",handleArrays:"[]",middleware:{in:[],out:[]}},Z=function(n){return"out"==n?X:function(n){var t=n.query,r=n.response;return O(null,void 0,void 0,function(){var n;return P(this,function(e){switch(e.label){case 0:return t.json?[4,r.json()]:[3,2];case 1:return n=e.sent(),[3,3];case 2:n=r,e.label=3;case 3:return[2,n]}})})}},$=function(){function n(n){var t=this;void 0===n&&(n={}),this.middleware={in:[],out:[function(n){return O(t,void 0,void 0,function(){return P(this,function(t){return n.url=K(n),[2,n]})})},function(n){return O(t,void 0,void 0,function(){return P(this,function(t){return n.url=V(this.config.base,n.url),[2,n]})})},function(n){return O(t,void 0,void 0,function(){return P(this,function(t){return"Object"==R(n.body)&&((n=_({"Content-Type":"application/json"},n)).body=JSON.stringify(n.body)),[2,n]})})},function(n){return O(t,void 0,void 0,function(){var t;return P(this,function(r){for(t in n.headers)"Null"==R(n.headers[t])&&delete n.headers[t];return[2,n]})})}]},this.config=L(Y,n),this.basic_query={url:"",method:"get",headers:{},params:{},result:null,body:null,json:this.config.json,timeout:this.config.timeout,credentials:this.config.credentials,throwCodes:this.config.throwCodes,handleArrays:this.config.handleArrays,misc:{}};for(var r={},e=0,o=["in","out"];e<o.length;e++){var u=o[e];r[u]=M.apply(void 0,[Z(u)].concat(this.middleware[u],this.config.middleware[u]))}this.applyMiddleware=r}return n.prototype.query=function(n){return O(this,void 0,Promise,function(){var t,r=this;return P(this,function(e){switch(e.label){case 0:return[4,this.applyMiddleware.out(L(this.basic_query,n))];case 1:return(n=e.sent()).result?[2,n.result]:(t={method:n.method,headers:n.headers,credentials:n.credentials},n.body&&(t.body=n.body),[2,new Promise(function(e,o){return O(r,void 0,void 0,function(){var r,u,i,c,a;return P(this,function(s){switch(s.label){case 0:r=!1,u=setTimeout(function(){r=!0,o("timeout")},n.timeout),s.label=1;case 1:return s.trys.push([1,6,,7]),[4,fetch(n.url,t)];case 2:return i=s.sent(),r?[3,5]:(clearTimeout(u),n.throwCodes.test(String(i.status))?(o(i.status),[3,5]):[3,3]);case 3:return c=e,[4,this.applyMiddleware.in({query:n,response:i})];case 4:c.apply(void 0,[s.sent()]),s.label=5;case 5:return[3,7];case 6:return a=s.sent(),clearTimeout(u),o(a),[3,7];case 7:return[2]}})})})])}})})},n}(),nn=function(){function n(){this.cache={},this.proceccing={}}return n.prototype.tryCacheWhen=function(n,t,r){var e=this;return new Promise(function(o,u){e.cache[n]?o(e.cache[n]):e.proceccing[n]?e.proceccing[n].push({ff:o,rj:u}):(e.proceccing[n]=[{ff:o,rj:u}],r().then(function(r){t(r)&&(e.cache[n]=r),e.proceccing[n].forEach(function(n){return(0,n.ff)(r)}),delete e.proceccing[n]}).catch(function(t){e.proceccing[n].forEach(function(n){return(0,n.rj)(t)})}))})},n.prototype.tryCache=function(n,t){return this.tryCacheWhen(n,g,t)},n.prototype.dropCache=function(n){void 0===n&&(n=""),n?delete this.cache[n]:function(n){for(var t in n)delete n[t]}(this.cache)},n}(),tn=function(){function n(n){this.pattern=/never/,this.name="Fetch",this.response=n}return Object.defineProperty(n.prototype,"type",{get:function(){return this.name.toLowerCase()},enumerable:!0,configurable:!0}),n.prototype.is=function(n){return this.pattern.test(String(n))},n.prototype.try=function(){var n=this.response;if(this.is(n.status))throw new Error("HTTP "+this.name+" error: status is "+n.status)},n}(),rn=function(n){function t(t){var r=n.call(this,t)||this;return r.pattern=/4\d[13]/,r.name="Access",r.try(),r}return w(t,n),t}(tn),en=function(n){function t(t){var r=n.call(this,t)||this;return r.pattern=/5\d\d/,r.name="Server",r.try(),r}return w(t,n),t}(tn);export{rn as AccessError,nn as Cached,$ as Fetch,en as ServerError,_ as addHeaders,M as asyncpipe,E as bind,q as clearEmpty,x as explore,S as forEach,A as forEachAsync,K as formURI,k as mapKeys,T as waitAll};
