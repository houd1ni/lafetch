"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var ramda=require("ramda"),extendStatics=function(r,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])})(r,e)};function __extends(r,e){function t(){this.constructor=r}extendStatics(r,e),r.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}var __assign=function(){return(__assign=Object.assign||function(r){for(var e,t=1,n=arguments.length;t<n;t++)for(var o in e=arguments[t])Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r}).apply(this,arguments)};function __awaiter(r,e,t,n){return new(t||(t=Promise))(function(o,i){function c(r){try{u(n.next(r))}catch(r){i(r)}}function a(r){try{u(n.throw(r))}catch(r){i(r)}}function u(r){r.done?o(r.value):new t(function(e){e(r.value)}).then(c,a)}u((n=n.apply(r,e||[])).next())})}function __generator(r,e){var t,n,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;c;)try{if(t=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,n=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=e.call(r,c)}catch(r){i=[6,r],n=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}var _this=void 0,addHeaders=ramda.curry(function(r,e){return __assign({},e,{headers:Object.assign({},e.headers,r)})}),forEach=function(){var r=function(e,t,n){return __awaiter(_this,void 0,void 0,function(){return __generator(this,function(o){switch(o.label){case 0:return n<t.length?[4,e(t[n])]:[3,3];case 1:return o.sent(),[4,r(e,t,++n)];case 2:o.sent(),o.label=3;case 3:return[2]}})})};return ramda.curry(function(e,t){return r(e,t,0)})}(),forEachAsync=ramda.curry(function(r,e){return Promise.all(e.map(r))}),waitAll=function(r){return Promise.all(r)},explore=ramda.tap(ramda.bind(console.log,console)),clearEmpty=ramda.pickBy(ramda.unary(ramda.complement(ramda.isEmpty))),bind=function(r,e){return ramda.curry(r[e].bind(r))},mapKeys=ramda.curry(function(r,e){return ramda.compose(ramda.fromPairs,ramda.filter(ramda.complement(ramda.isNil)),ramda.map(function(e){var t=e[0],n=e[1];return null===r[t]?null:[r[t]||t,n]}),ramda.toPairs)(e)}),asyncpipe=function(){var r=function(e,t,n){return __awaiter(_this,void 0,void 0,function(){var o,i,c,a;return __generator(this,function(u){switch(u.label){case 0:return~n?(o=e[n](t),i=r,c=[e],o instanceof Promise?[4,o]:[3,2]):[3,5];case 1:return a=u.sent(),[3,3];case 2:a=o,u.label=3;case 3:return[4,i.apply(void 0,c.concat([a,--n]))];case 4:return[2,u.sent()];case 5:return[2,t]}})})};return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return r(e,t,e.length-1)}}}();function _isPlaceholder(r){return null!=r&&"object"==typeof r&&!0===r["@@functional/placeholder"]}var _isPlaceholder_1=_isPlaceholder;function _curry1(r){return function e(t){return 0===arguments.length||_isPlaceholder_1(t)?e:r.apply(this,arguments)}}var _curry1_1=_curry1;function _curry2(r){return function e(t,n){switch(arguments.length){case 0:return e;case 1:return _isPlaceholder_1(t)?e:_curry1_1(function(e){return r(t,e)});default:return _isPlaceholder_1(t)&&_isPlaceholder_1(n)?e:_isPlaceholder_1(t)?_curry1_1(function(e){return r(e,n)}):_isPlaceholder_1(n)?_curry1_1(function(e){return r(t,e)}):r(t,n)}}}var _curry2_1=_curry2;function _curry3(r){return function e(t,n,o){switch(arguments.length){case 0:return e;case 1:return _isPlaceholder_1(t)?e:_curry2_1(function(e,n){return r(t,e,n)});case 2:return _isPlaceholder_1(t)&&_isPlaceholder_1(n)?e:_isPlaceholder_1(t)?_curry2_1(function(e,t){return r(e,n,t)}):_isPlaceholder_1(n)?_curry2_1(function(e,n){return r(t,e,n)}):_curry1_1(function(e){return r(t,n,e)});default:return _isPlaceholder_1(t)&&_isPlaceholder_1(n)&&_isPlaceholder_1(o)?e:_isPlaceholder_1(t)&&_isPlaceholder_1(n)?_curry2_1(function(e,t){return r(e,t,o)}):_isPlaceholder_1(t)&&_isPlaceholder_1(o)?_curry2_1(function(e,t){return r(e,n,t)}):_isPlaceholder_1(n)&&_isPlaceholder_1(o)?_curry2_1(function(e,n){return r(t,e,n)}):_isPlaceholder_1(t)?_curry1_1(function(e){return r(e,n,o)}):_isPlaceholder_1(n)?_curry1_1(function(e){return r(t,e,o)}):_isPlaceholder_1(o)?_curry1_1(function(e){return r(t,n,e)}):r(t,n,o)}}}var _curry3_1=_curry3;function _isObject(r){return"[object Object]"===Object.prototype.toString.call(r)}var _isObject_1=_isObject;function _has(r,e){return Object.prototype.hasOwnProperty.call(e,r)}var _has_1=_has,mergeWithKey=_curry3_1(function(r,e,t){var n,o={};for(n in e)_has_1(n,e)&&(o[n]=_has_1(n,t)?r(n,e[n],t[n]):e[n]);for(n in t)_has_1(n,t)&&!_has_1(n,o)&&(o[n]=t[n]);return o}),mergeWithKey_1=mergeWithKey,mergeDeepWithKey=_curry3_1(function r(e,t,n){return mergeWithKey_1(function(t,n,o){return _isObject_1(n)&&_isObject_1(o)?r(e,n,o):e(t,n,o)},t,n)}),mergeDeepWithKey_1=mergeDeepWithKey,mergeDeepRight=_curry2_1(function(r,e){return mergeDeepWithKey_1(function(r,e,t){return t},r,e)}),mergeDeepRight_1=mergeDeepRight,type=_curry1_1(function(r){return null===r?"Null":void 0===r?"Undefined":Object.prototype.toString.call(r).slice(8,-1)}),type_1=type,trim=ramda.curry(function(r,e){for(var t,n=null,o=null,i=0;i<e.length;i++)t=e[i],r.includes(t)?n&&(o=i):(null==n&&(n=i),o=null);return e.slice(n||0,o||e.length)}),formURI=function(r){var e=[];if(r.params){var t=[];Object.entries(r.params).forEach(function(r){var e=r[0],n=r[1];null!=n&&t.push(e+"="+String(n).replace(/&/g,"\\&"))}),t.length&&e.push("?"+t.join("&"))}return encodeURI((r.url||"")+e.map(trim("-")).join("/"))},trimSlash=trim("/"),addBase=function(r,e){return e.includes("://")||e.startsWith(r)?e:trimSlash(r)+"/"+trimSlash(e)},hole=function(r){return r},_this$1=void 0,default_config={base:"/",json:!0,headers:{},timeout:1e4,middleware:{in:[],out:[]}},finalTransform=function(r){return"out"==r?hole:function(r){var e=r.query,t=r.response;return __awaiter(_this$1,void 0,void 0,function(){var r;return __generator(this,function(n){switch(n.label){case 0:return e.json?[4,t.json()]:[3,2];case 1:return r=n.sent(),[3,3];case 2:r=t,n.label=3;case 3:return[2,r]}})})}},Fetch=function(){function r(r){var e=this;void 0===r&&(r={}),this.middleware={in:[],out:[function(r){return __awaiter(e,void 0,void 0,function(){return __generator(this,function(e){return r.url=formURI(r),[2,r]})})},function(r){return __awaiter(e,void 0,void 0,function(){return __generator(this,function(e){return r.url=addBase(this.config.base,r.url),[2,r]})})},function(r){return __awaiter(e,void 0,void 0,function(){return __generator(this,function(e){return"Object"==type_1(r.body)&&((r=addHeaders({"Content-Type":"application/json"},r)).body=JSON.stringify(r.body)),[2,r]})})},function(r){return __awaiter(e,void 0,void 0,function(){var e;return __generator(this,function(t){for(e in r.headers)"Null"==type_1(r.headers[e])&&delete r.headers[e];return[2,r]})})}]},this.config=mergeDeepRight_1(default_config,r),this.basic_query={url:"",method:"get",headers:{},params:{},result:null,body:null,json:this.config.json,timeout:this.config.timeout,misc:{}};for(var t={},n=0,o=["in","out"];n<o.length;n++){var i=o[n];t[i]=asyncpipe.apply(void 0,[finalTransform(i)].concat(this.middleware[i],this.config.middleware[i]))}this.applyMiddleware=t}return r.prototype.query=function(r){return __awaiter(this,void 0,void 0,function(){var e,t=this;return __generator(this,function(n){switch(n.label){case 0:return[4,this.applyMiddleware.out(mergeDeepRight_1(this.basic_query,r))];case 1:return(r=n.sent()).result?[2,r.result]:(e={method:r.method,headers:r.headers},r.body&&(e.body=r.body),[2,new Promise(function(n,o){return __awaiter(t,void 0,void 0,function(){var t,i,c,a,u;return __generator(this,function(s){switch(s.label){case 0:t=!1,i=setTimeout(function(){t=!0,o("timeout")},r.timeout),s.label=1;case 1:return s.trys.push([1,5,,6]),[4,fetch(r.url,e)];case 2:return c=s.sent(),t?[3,4]:(clearTimeout(i),a=n,[4,this.applyMiddleware.in({query:r,response:c})]);case 3:a.apply(void 0,[s.sent()]),s.label=4;case 4:return[3,6];case 5:return u=s.sent(),clearTimeout(i),o(u),[3,6];case 6:return[2]}})})})])}})})},r}(),Cached=function(){function r(){this.cache={},this.proceccing={}}return r.prototype.tryCache=function(r,e){return __awaiter(this,void 0,void 0,function(){var t=this;return __generator(this,function(n){switch(n.label){case 0:return[4,new Promise(function(n,o){t.cache[r]?n(t.cache[r]):t.proceccing[r]?t.proceccing[r].push({ff:n,rj:o}):(t.proceccing[r]=[{ff:n,rj:o}],e().then(function(e){t.cache[r]=e,t.proceccing[r].forEach(function(r){return(0,r.ff)(e)}),delete t.proceccing[r]}).catch(function(e){t.proceccing[r].forEach(function(r){return(0,r.rj)(e)})}))})];case 1:return[2,n.sent()]}})})},r}(),FetchError=function(){function r(r){this.pattern=/never/,this.name="Fetch",this.response=r}return Object.defineProperty(r.prototype,"type",{get:function(){return this.name.toLowerCase()},enumerable:!0,configurable:!0}),r.prototype.is=function(r){return this.pattern.test(String(r))},r.prototype.try=function(){var r=this.response;if(this.is(r.status))throw new Error("HTTP "+this.name+" error: status is "+r.status)},r}(),AccessError=function(r){function e(e){var t=r.call(this,e)||this;return t.pattern=/4\d[13]/,t.name="Access",t.try(),t}return __extends(e,r),e}(FetchError),ServerError=function(r){function e(e){var t=r.call(this,e)||this;return t.pattern=/5\d\d/,t.name="Server",t.try(),t}return __extends(e,r),e}(FetchError);exports.AccessError=AccessError,exports.Cached=Cached,exports.Fetch=Fetch,exports.ServerError=ServerError,exports.addHeaders=addHeaders,exports.asyncpipe=asyncpipe,exports.bind=bind,exports.clearEmpty=clearEmpty,exports.explore=explore,exports.forEach=forEach,exports.forEachAsync=forEachAsync,exports.formURI=formURI,exports.mapKeys=mapKeys,exports.waitAll=waitAll;
