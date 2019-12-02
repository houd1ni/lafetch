"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var ramda=require("ramda"),extendStatics=function(r,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])})(r,e)};function __extends(r,e){function t(){this.constructor=r}extendStatics(r,e),r.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}var __assign=function(){return(__assign=Object.assign||function(r){for(var e,t=1,n=arguments.length;t<n;t++)for(var a in e=arguments[t])Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a]);return r}).apply(this,arguments)};function __awaiter(r,e,t,n){return new(t||(t=Promise))((function(a,o){function i(r){try{s(n.next(r))}catch(r){o(r)}}function c(r){try{s(n.throw(r))}catch(r){o(r)}}function s(r){r.done?a(r.value):new t((function(e){e(r.value)})).then(i,c)}s((n=n.apply(r,e||[])).next())}))}function __generator(r,e){var t,n,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;i;)try{if(t=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=e.call(r,i)}catch(r){o=[6,r],n=0}finally{t=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}}var _this=null,addHeaders=ramda.curry((function(r,e){return __assign({},e,{headers:Object.assign({},e.headers,r)})})),forEach=function(){var r=function(e,t,n){return __awaiter(_this,void 0,void 0,(function(){return __generator(this,(function(a){switch(a.label){case 0:return n<t.length?[4,e(t[n])]:[3,3];case 1:return a.sent(),[4,r(e,t,++n)];case 2:a.sent(),a.label=3;case 3:return[2]}}))}))};return ramda.curry((function(e,t){return r(e,t,0)}))}(),forEachAsync=ramda.curry((function(r,e){return Promise.all(e.map(r))})),waitAll=function(r){return Promise.all(r)},explore=ramda.tap(ramda.bind(console.log,console)),clearEmpty=ramda.pickBy(ramda.unary(ramda.complement(ramda.isEmpty))),bind=function(r,e){return ramda.curry(r[e].bind(r))},mapKeys=ramda.curry((function(r,e){return ramda.compose(ramda.fromPairs,ramda.filter(ramda.complement(ramda.isNil)),ramda.map((function(e){var t=e[0],n=e[1];return null===r[t]?null:[r[t]||t,n]})),ramda.toPairs)(e)})),asyncpipe=function(){var r=function(e,t,n){return __awaiter(_this,void 0,Promise,(function(){var a,o,i;return __generator(this,(function(c){switch(c.label){case 0:return~n?(o=r,i=[e],[4,e[n](t)]):[3,3];case 1:return[4,o.apply(void 0,i.concat([c.sent(),--n]))];case 2:return a=c.sent(),[3,4];case 3:a=t,c.label=4;case 4:return[2,a]}}))}))};return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return r(e,t,e.length-1)}}}(),trim=ramda.curry((function(r,e){for(var t,n=null,a=null,o=0;o<e.length;o++)t=e[o],r.includes(t)?n&&(a=o):(null==n&&(n=o),a=null);return e.slice(n||0,a||e.length)})),unshield=ramda.compose(ramda.replace(/&/g,"\\&"),String),stringifyPair=function(r,e,t){switch(ramda.type(t)){case"Array":switch(r){case"[]":return ramda.compose(ramda.join("&"),ramda.reduce((function(t,n){return ramda.append(stringifyPair(r,e+"[]",n),t)}),[]))(t);case",":return e+"="+ramda.compose(ramda.join(","),ramda.reduce((function(r,e){return ramda.append(unshield(e),r)}),[]))(t)}default:return e+"="+unshield(t)}},formURI=function(r){var e=[];if(r.params){var t=[];Object.entries(r.params).forEach((function(e){var n=e[0],a=e[1];null!=a&&t.push(stringifyPair(r.handleArrays||"[]",n,a))})),t.length&&e.push("?"+t.join("&"))}return encodeURI((r.url||"")+e.map(trim("-")).join("/"))},trimSlash=trim("/"),addBase=function(r,e){return e.includes("://")||e.startsWith(r)?e:trimSlash(r)+"/"+trimSlash(e)},hole=function(r){return r},removeAllProps=function(r){for(var e in r)delete r[e];return r},_this$1=null,default_config={base:"/",json:!0,headers:{},timeout:1e4,adapter:function(r,e){return fetch(r,e)},throwCodes:/\n/,credentials:"same-origin",handleArrays:"[]",middleware:{in:[],out:[]}},finalTransform=function(r){return"out"==r?hole:function(r){var e=r.query,t=r.response;return __awaiter(_this$1,void 0,void 0,(function(){var r;return __generator(this,(function(n){switch(n.label){case 0:return e.json?[4,t.json()]:[3,2];case 1:return r=n.sent(),[3,3];case 2:r=t,n.label=3;case 3:return[2,r]}}))}))}},Fetch=function(){function r(r){var e=this;void 0===r&&(r={}),this.middleware={in:[],out:[function(r){return __awaiter(e,void 0,void 0,(function(){return __generator(this,(function(e){return r.url=formURI(r),[2,r]}))}))},function(r){return __awaiter(e,void 0,void 0,(function(){return __generator(this,(function(e){return r.url=addBase(this.config.base,r.url),[2,r]}))}))},function(r){return __awaiter(e,void 0,void 0,(function(){return __generator(this,(function(e){return"Object"==ramda.type(r.body)&&((r=addHeaders({"Content-Type":"application/json"},r)).body=JSON.stringify(r.body)),[2,r]}))}))},function(r){return __awaiter(e,void 0,void 0,(function(){var e;return __generator(this,(function(t){for(e in r.headers)"Null"==ramda.type(r.headers[e])&&delete r.headers[e];return[2,r]}))}))}]},this.config=ramda.mergeDeepRight(default_config,r),this.basic_query={url:"",method:"get",headers:{},params:{},result:null,body:null,json:this.config.json,timeout:this.config.timeout,credentials:this.config.credentials,throwCodes:this.config.throwCodes,handleArrays:this.config.handleArrays,misc:{}};for(var t={},n=0,a=["in","out"];n<a.length;n++){var o=a[n];t[o]=asyncpipe.apply(void 0,[finalTransform(o)].concat(this.middleware[o],this.config.middleware[o]))}this.applyMiddleware=t}return r.prototype.query=function(r){return __awaiter(this,void 0,Promise,(function(){var e,t=this;return __generator(this,(function(n){switch(n.label){case 0:return[4,this.applyMiddleware.out(ramda.mergeDeepRight(this.basic_query,r))];case 1:return(r=n.sent()).result?[2,r.result]:(e={method:r.method,headers:r.headers,credentials:r.credentials},r.body&&(e.body=r.body),[2,new Promise((function(n,a){return __awaiter(t,void 0,void 0,(function(){var t,o,i,c,s;return __generator(this,(function(u){switch(u.label){case 0:t=!1,o=setTimeout((function(){t=!0,a("timeout")}),r.timeout),u.label=1;case 1:return u.trys.push([1,6,,7]),[4,this.config.adapter(r.url,e)];case 2:return i=u.sent(),t?[3,5]:(clearTimeout(o),r.throwCodes.test(String(i.status))?(a(i.status),[3,5]):[3,3]);case 3:return c=n,[4,this.applyMiddleware.in({query:r,response:i})];case 4:c.apply(void 0,[u.sent()]),u.label=5;case 5:return[3,7];case 6:return s=u.sent(),clearTimeout(o),a(s),[3,7];case 7:return[2]}}))}))}))])}}))}))},r}(),Cached=function(){function r(){this.cache={},this.proceccing={}}return r.prototype.tryCacheWhen=function(r,e,t){var n=this;return new Promise((function(a,o){n.cache[r]?a(n.cache[r]):n.proceccing[r]?n.proceccing[r].push({ff:a,rj:o}):(n.proceccing[r]=[{ff:a,rj:o}],t().then((function(t){e(t)&&(n.cache[r]=t),n.proceccing[r].forEach((function(r){return(0,r.ff)(t)})),delete n.proceccing[r]})).catch((function(e){n.proceccing[r].forEach((function(r){return(0,r.rj)(e)}))})))}))},r.prototype.tryCache=function(r,e){return this.tryCacheWhen(r,ramda.T,e)},r.prototype.dropCache=function(r){void 0===r&&(r=""),r?delete this.cache[r]:removeAllProps(this.cache)},r}(),FetchError=function(){function r(r){this.pattern=/never/,this.name="Fetch",this.response=r}return Object.defineProperty(r.prototype,"type",{get:function(){return this.name.toLowerCase()},enumerable:!0,configurable:!0}),r.prototype.is=function(r){return this.pattern.test(String(r))},r.prototype.try=function(){var r=this.response;if(this.is(r.status))throw new Error("HTTP "+this.name+" error: status is "+r.status)},r}(),AccessError=function(r){function e(e){var t=r.call(this,e)||this;return t.pattern=/4\d[13]/,t.name="Access",t.try(),t}return __extends(e,r),e}(FetchError),ServerError=function(r){function e(e){var t=r.call(this,e)||this;return t.pattern=/5\d\d/,t.name="Server",t.try(),t}return __extends(e,r),e}(FetchError);exports.AccessError=AccessError,exports.Cached=Cached,exports.Fetch=Fetch,exports.ServerError=ServerError,exports.addHeaders=addHeaders,exports.asyncpipe=asyncpipe,exports.bind=bind,exports.clearEmpty=clearEmpty,exports.explore=explore,exports.forEach=forEach,exports.forEachAsync=forEachAsync,exports.formURI=formURI,exports.mapKeys=mapKeys,exports.waitAll=waitAll;
