import{r as fe,u as De,N as Fe,o as Ce,b as Le,a as W,w as Q,H as me,S as ze,C as pe,A as Ee,X as Ie,d as _e,g as Me,B as Ue,h as Pe,as as Ve,c as Te,M as Ne,f as xe,O as Be,P as qe,e as Ae,$ as je,J as Ke}from"./app-d2fb1262.js";import{h as He,i as We,j as $e}from"./mdi-a0a77bee.js";import{c as Je}from"./clientApi-2b4a321a.js";import{c as Qe}from"./_commonjsHelpers-042e6b4d.js";import{u as Ge}from"./industry-cdd62490.js";var Se={exports:{}};/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/(function(ve,ye){(function(ce,y){ve.exports=y()})(Qe,function ce(){var y=typeof self<"u"?self:typeof window<"u"?window:y!==void 0?y:{},Y=!y.document&&!!y.postMessage,se=y.IS_PAPA_WORKER||!1,G={},ke=0,l={parse:function(t,e){var r=(e=e||{}).dynamicTyping||!1;if(g(r)&&(e.dynamicTypingFunction=r,r={}),e.dynamicTyping=r,e.transform=!!g(e.transform)&&e.transform,e.worker&&l.WORKERS_SUPPORTED){var i=function(){if(!l.WORKERS_SUPPORTED)return!1;var d=(S=y.URL||y.webkitURL||null,w=ce.toString(),l.BLOB_URL||(l.BLOB_URL=S.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",w,")();"],{type:"text/javascript"})))),h=new y.Worker(d),S,w;return h.onmessage=$,h.id=ke++,G[h.id]=h}();return i.userStep=e.step,i.userChunk=e.chunk,i.userComplete=e.complete,i.userError=e.error,e.step=g(e.step),e.chunk=g(e.chunk),e.complete=g(e.complete),e.error=g(e.error),delete e.worker,void i.postMessage({input:t,config:e,workerId:i.id})}var s=null;return l.NODE_STREAM_INPUT,typeof t=="string"?(t=function(d){return d.charCodeAt(0)===65279?d.slice(1):d}(t),s=e.download?new le(e):new ae(e)):t.readable===!0&&g(t.read)&&g(t.on)?s=new M(e):(y.File&&t instanceof File||t instanceof Object)&&(s=new de(e)),s.stream(t)},unparse:function(t,e){var r=!1,i=!0,s=",",d=`\r
`,h='"',S=h+h,w=!1,a=null,E=!1;(function(){if(typeof e=="object"){if(typeof e.delimiter!="string"||l.BAD_DELIMITERS.filter(function(n){return e.delimiter.indexOf(n)!==-1}).length||(s=e.delimiter),(typeof e.quotes=="boolean"||typeof e.quotes=="function"||Array.isArray(e.quotes))&&(r=e.quotes),typeof e.skipEmptyLines!="boolean"&&typeof e.skipEmptyLines!="string"||(w=e.skipEmptyLines),typeof e.newline=="string"&&(d=e.newline),typeof e.quoteChar=="string"&&(h=e.quoteChar),typeof e.header=="boolean"&&(i=e.header),Array.isArray(e.columns)){if(e.columns.length===0)throw new Error("Option columns is empty");a=e.columns}e.escapeChar!==void 0&&(S=e.escapeChar+h),(typeof e.escapeFormulae=="boolean"||e.escapeFormulae instanceof RegExp)&&(E=e.escapeFormulae instanceof RegExp?e.escapeFormulae:/^[=+\-@\t\r].*$/)}})();var u=new RegExp(I(h),"g");if(typeof t=="string"&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return K(null,t,w);if(typeof t[0]=="object")return K(a||Object.keys(t[0]),t,w)}else if(typeof t=="object")return typeof t.data=="string"&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||a),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:typeof t.data[0]=="object"?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||typeof t.data[0]=="object"||(t.data=[t.data])),K(t.fields||[],t.data||[],w);throw new Error("Unable to serialize unrecognized input");function K(n,v,L){var C="";typeof n=="string"&&(n=JSON.parse(n)),typeof v=="string"&&(v=JSON.parse(v));var D=Array.isArray(n)&&0<n.length,T=!Array.isArray(v[0]);if(D&&i){for(var A=0;A<n.length;A++)0<A&&(C+=s),C+=F(n[A],A);0<v.length&&(C+=d)}for(var o=0;o<v.length;o++){var f=D?n.length:v[o].length,k=!1,O=D?Object.keys(v[o]).length===0:v[o].length===0;if(L&&!D&&(k=L==="greedy"?v[o].join("").trim()==="":v[o].length===1&&v[o][0].length===0),L==="greedy"&&D){for(var m=[],z=0;z<f;z++){var x=T?n[z]:z;m.push(v[o][x])}k=m.join("").trim()===""}if(!k){for(var _=0;_<f;_++){0<_&&!O&&(C+=s);var H=D&&T?n[_]:_;C+=F(v[o][H],_)}o<v.length-1&&(!L||0<f&&!O)&&(C+=d)}}return C}function F(n,v){if(n==null)return"";if(n.constructor===Date)return JSON.stringify(n).slice(1,25);var L=!1;E&&typeof n=="string"&&E.test(n)&&(n="'"+n,L=!0);var C=n.toString().replace(u,S);return(L=L||r===!0||typeof r=="function"&&r(n,v)||Array.isArray(r)&&r[v]||function(D,T){for(var A=0;A<T.length;A++)if(-1<D.indexOf(T[A]))return!0;return!1}(C,l.BAD_DELIMITERS)||-1<C.indexOf(s)||C.charAt(0)===" "||C.charAt(C.length-1)===" ")?h+C+h:C}}};if(l.RECORD_SEP=String.fromCharCode(30),l.UNIT_SEP=String.fromCharCode(31),l.BYTE_ORDER_MARK="\uFEFF",l.BAD_DELIMITERS=["\r",`
`,'"',l.BYTE_ORDER_MARK],l.WORKERS_SUPPORTED=!Y&&!!y.Worker,l.NODE_STREAM_INPUT=1,l.LocalChunkSize=10485760,l.RemoteChunkSize=5242880,l.DefaultDelimiter=",",l.Parser=j,l.ParserHandle=P,l.NetworkStreamer=le,l.FileStreamer=de,l.StringStreamer=ae,l.ReadableStreamStreamer=M,y.jQuery){var c=y.jQuery;c.fn.parse=function(t){var e=t.config||{},r=[];return this.each(function(d){if(!(c(this).prop("tagName").toUpperCase()==="INPUT"&&c(this).attr("type").toLowerCase()==="file"&&y.FileReader)||!this.files||this.files.length===0)return!0;for(var h=0;h<this.files.length;h++)r.push({file:this.files[h],inputElem:this,instanceConfig:c.extend({},e)})}),i(),this;function i(){if(r.length!==0){var d,h,S,w,a=r[0];if(g(t.before)){var E=t.before(a.file,a.inputElem);if(typeof E=="object"){if(E.action==="abort")return d="AbortError",h=a.file,S=a.inputElem,w=E.reason,void(g(t.error)&&t.error({name:d},h,S,w));if(E.action==="skip")return void s();typeof E.config=="object"&&(a.instanceConfig=c.extend(a.instanceConfig,E.config))}else if(E==="skip")return void s()}var u=a.instanceConfig.complete;a.instanceConfig.complete=function(K){g(u)&&u(K,a.file,a.inputElem),s()},l.parse(a.file,a.instanceConfig)}else g(t.complete)&&t.complete()}function s(){r.splice(0,1),i()}}}function U(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var r=be(e);r.chunkSize=parseInt(r.chunkSize),e.step||e.chunk||(r.chunkSize=null),this._handle=new P(r),(this._handle.streamer=this)._config=r}.call(this,t),this.parseChunk=function(e,r){if(this.isFirstChunk&&g(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);i!==void 0&&(e=i)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+e;this._partialLine="";var d=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var h=d.meta.cursor;this._finished||(this._partialLine=s.substring(h-this._baseIndex),this._baseIndex=h),d&&d.data&&(this._rowCount+=d.data.length);var S=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(se)y.postMessage({results:d,workerId:l.WORKER_ID,finished:S});else if(g(this._config.chunk)&&!r){if(this._config.chunk(d,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);d=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(d.data),this._completeResults.errors=this._completeResults.errors.concat(d.errors),this._completeResults.meta=d.meta),this._completed||!S||!g(this._config.complete)||d&&d.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),S||d&&d.meta.paused||this._nextChunk(),d}this._halted=!0},this._sendError=function(e){g(this._config.error)?this._config.error(e):se&&this._config.error&&y.postMessage({workerId:l.WORKER_ID,error:e,finished:!1})}}function le(t){var e;(t=t||{}).chunkSize||(t.chunkSize=l.RemoteChunkSize),U.call(this,t),this._nextChunk=Y?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(r){this._input=r,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),Y||(e.onload=te(this._chunkLoaded,this),e.onerror=te(this._chunkError,this)),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!Y),this._config.downloadRequestHeaders){var r=this._config.downloadRequestHeaders;for(var i in r)e.setRequestHeader(i,r[i])}if(this._config.chunkSize){var s=this._start+this._config.chunkSize-1;e.setRequestHeader("Range","bytes="+this._start+"-"+s)}try{e.send(this._config.downloadRequestBody)}catch(d){this._chunkError(d.message)}Y&&e.status===0&&this._chunkError()}},this._chunkLoaded=function(){e.readyState===4&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:e.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(r){var i=r.getResponseHeader("Content-Range");return i===null?-1:parseInt(i.substring(i.lastIndexOf("/")+1))}(e),this.parseChunk(e.responseText)))},this._chunkError=function(r){var i=e.statusText||r;this._sendError(new Error(i))}}function de(t){var e,r;(t=t||{}).chunkSize||(t.chunkSize=l.LocalChunkSize),U.call(this,t);var i=typeof FileReader<"u";this.stream=function(s){this._input=s,r=s.slice||s.webkitSlice||s.mozSlice,i?((e=new FileReader).onload=te(this._chunkLoaded,this),e.onerror=te(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var s=this._input;if(this._config.chunkSize){var d=Math.min(this._start+this._config.chunkSize,this._input.size);s=r.call(s,this._start,d)}var h=e.readAsText(s,this._config.encoding);i||this._chunkLoaded({target:{result:h}})},this._chunkLoaded=function(s){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(s.target.result)},this._chunkError=function(){this._sendError(e.error)}}function ae(t){var e;U.call(this,t=t||{}),this.stream=function(r){return e=r,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var r,i=this._config.chunkSize;return i?(r=e.substring(0,i),e=e.substring(i)):(r=e,e=""),this._finished=!e,this.parseChunk(r)}}}function M(t){U.call(this,t=t||{});var e=[],r=!0,i=!1;this.pause=function(){U.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){U.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(s){this._input=s,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&e.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):r=!0},this._streamData=te(function(s){try{e.push(typeof s=="string"?s:s.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(d){this._streamError(d)}},this),this._streamError=te(function(s){this._streamCleanUp(),this._sendError(s)},this),this._streamEnd=te(function(){this._streamCleanUp(),i=!0,this._streamData("")},this),this._streamCleanUp=te(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function P(t){var e,r,i,s=Math.pow(2,53),d=-s,h=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,S=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,w=this,a=0,E=0,u=!1,K=!1,F=[],n={data:[],errors:[],meta:{}};if(g(t.step)){var v=t.step;t.step=function(o){if(n=o,D())C();else{if(C(),n.data.length===0)return;a+=o.data.length,t.preview&&a>t.preview?r.abort():(n.data=n.data[0],v(n,w))}}}function L(o){return t.skipEmptyLines==="greedy"?o.join("").trim()==="":o.length===1&&o[0].length===0}function C(){return n&&i&&(A("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+l.DefaultDelimiter+"'"),i=!1),t.skipEmptyLines&&(n.data=n.data.filter(function(o){return!L(o)})),D()&&function(){if(!n)return;function o(k,O){g(t.transformHeader)&&(k=t.transformHeader(k,O)),F.push(k)}if(Array.isArray(n.data[0])){for(var f=0;D()&&f<n.data.length;f++)n.data[f].forEach(o);n.data.splice(0,1)}else n.data.forEach(o)}(),function(){if(!n||!t.header&&!t.dynamicTyping&&!t.transform)return n;function o(k,O){var m,z=t.header?{}:[];for(m=0;m<k.length;m++){var x=m,_=k[m];t.header&&(x=m>=F.length?"__parsed_extra":F[m]),t.transform&&(_=t.transform(_,x)),_=T(x,_),x==="__parsed_extra"?(z[x]=z[x]||[],z[x].push(_)):z[x]=_}return t.header&&(m>F.length?A("FieldMismatch","TooManyFields","Too many fields: expected "+F.length+" fields but parsed "+m,E+O):m<F.length&&A("FieldMismatch","TooFewFields","Too few fields: expected "+F.length+" fields but parsed "+m,E+O)),z}var f=1;return!n.data.length||Array.isArray(n.data[0])?(n.data=n.data.map(o),f=n.data.length):n.data=o(n.data,0),t.header&&n.meta&&(n.meta.fields=F),E+=f,n}()}function D(){return t.header&&F.length===0}function T(o,f){return k=o,t.dynamicTypingFunction&&t.dynamicTyping[k]===void 0&&(t.dynamicTyping[k]=t.dynamicTypingFunction(k)),(t.dynamicTyping[k]||t.dynamicTyping)===!0?f==="true"||f==="TRUE"||f!=="false"&&f!=="FALSE"&&(function(O){if(h.test(O)){var m=parseFloat(O);if(d<m&&m<s)return!0}return!1}(f)?parseFloat(f):S.test(f)?new Date(f):f===""?null:f):f;var k}function A(o,f,k,O){var m={type:o,code:f,message:k};O!==void 0&&(m.row=O),n.errors.push(m)}this.parse=function(o,f,k){var O=t.quoteChar||'"';if(t.newline||(t.newline=function(x,_){x=x.substring(0,1048576);var H=new RegExp(I(_)+"([^]*?)"+I(_),"gm"),V=(x=x.replace(H,"")).split("\r"),J=x.split(`
`),Z=1<J.length&&J[0].length<V[0].length;if(V.length===1||Z)return`
`;for(var N=0,b=0;b<V.length;b++)V[b][0]===`
`&&N++;return N>=V.length/2?`\r
`:"\r"}(o,O)),i=!1,t.delimiter)g(t.delimiter)&&(t.delimiter=t.delimiter(o),n.meta.delimiter=t.delimiter);else{var m=function(x,_,H,V,J){var Z,N,b,R;J=J||[",","	","|",";",l.RECORD_SEP,l.UNIT_SEP];for(var oe=0;oe<J.length;oe++){var p=J[oe],he=0,X=0,ue=0;b=void 0;for(var re=new j({comments:V,delimiter:p,newline:_,preview:10}).parse(x),ie=0;ie<re.data.length;ie++)if(H&&L(re.data[ie]))ue++;else{var ne=re.data[ie].length;X+=ne,b!==void 0?0<ne&&(he+=Math.abs(ne-b),b=ne):b=ne}0<re.data.length&&(X/=re.data.length-ue),(N===void 0||he<=N)&&(R===void 0||R<X)&&1.99<X&&(N=he,Z=p,R=X)}return{successful:!!(t.delimiter=Z),bestDelimiter:Z}}(o,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);m.successful?t.delimiter=m.bestDelimiter:(i=!0,t.delimiter=l.DefaultDelimiter),n.meta.delimiter=t.delimiter}var z=be(t);return t.preview&&t.header&&z.preview++,e=o,r=new j(z),n=r.parse(e,f,k),C(),u?{meta:{paused:!0}}:n||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,r.abort(),e=g(t.chunk)?"":e.substring(r.getCharIndex())},this.resume=function(){w.streamer._halted?(u=!1,w.streamer.parseChunk(e,!0)):setTimeout(w.resume,3)},this.aborted=function(){return K},this.abort=function(){K=!0,r.abort(),n.meta.aborted=!0,g(t.complete)&&t.complete(n),e=""}}function I(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function j(t){var e,r=(t=t||{}).delimiter,i=t.newline,s=t.comments,d=t.step,h=t.preview,S=t.fastMode,w=e=t.quoteChar===void 0||t.quoteChar===null?'"':t.quoteChar;if(t.escapeChar!==void 0&&(w=t.escapeChar),(typeof r!="string"||-1<l.BAD_DELIMITERS.indexOf(r))&&(r=","),s===r)throw new Error("Comment character same as delimiter");s===!0?s="#":(typeof s!="string"||-1<l.BAD_DELIMITERS.indexOf(s))&&(s=!1),i!==`
`&&i!=="\r"&&i!==`\r
`&&(i=`
`);var a=0,E=!1;this.parse=function(u,K,F){if(typeof u!="string")throw new Error("Input must be a string");var n=u.length,v=r.length,L=i.length,C=s.length,D=g(d),T=[],A=[],o=[],f=a=0;if(!u)return B();if(t.header&&!K){var k=u.split(i)[0].split(r),O=[],m={},z=!1;for(var x in k){var _=k[x];g(t.transformHeader)&&(_=t.transformHeader(_,x));var H=_,V=m[_]||0;for(0<V&&(z=!0,H=_+"_"+V),m[_]=V+1;O.includes(H);)H=H+"_"+V;O.push(H)}if(z){var J=u.split(i);J[0]=O.join(r),u=J.join(i)}}if(S||S!==!1&&u.indexOf(e)===-1){for(var Z=u.split(i),N=0;N<Z.length;N++){if(o=Z[N],a+=o.length,N!==Z.length-1)a+=i.length;else if(F)return B();if(!s||o.substring(0,C)!==s){if(D){if(T=[],ue(o.split(r)),ge(),E)return B()}else ue(o.split(r));if(h&&h<=N)return T=T.slice(0,h),B(!0)}}return B()}for(var b=u.indexOf(r,a),R=u.indexOf(i,a),oe=new RegExp(I(w)+I(e),"g"),p=u.indexOf(e,a);;)if(u[a]!==e)if(s&&o.length===0&&u.substring(a,a+C)===s){if(R===-1)return B();a=R+L,R=u.indexOf(i,a),b=u.indexOf(r,a)}else if(b!==-1&&(b<R||R===-1))o.push(u.substring(a,b)),a=b+v,b=u.indexOf(r,a);else{if(R===-1)break;if(o.push(u.substring(a,R)),ne(R+L),D&&(ge(),E))return B();if(h&&T.length>=h)return B(!0)}else for(p=a,a++;;){if((p=u.indexOf(e,p+1))===-1)return F||A.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:T.length,index:a}),ie();if(p===n-1)return ie(u.substring(a,p).replace(oe,e));if(e!==w||u[p+1]!==w){if(e===w||p===0||u[p-1]!==w){b!==-1&&b<p+1&&(b=u.indexOf(r,p+1)),R!==-1&&R<p+1&&(R=u.indexOf(i,p+1));var he=re(R===-1?b:Math.min(b,R));if(u.substr(p+1+he,v)===r){o.push(u.substring(a,p).replace(oe,e)),u[a=p+1+he+v]!==e&&(p=u.indexOf(e,a)),b=u.indexOf(r,a),R=u.indexOf(i,a);break}var X=re(R);if(u.substring(p+1+X,p+1+X+L)===i){if(o.push(u.substring(a,p).replace(oe,e)),ne(p+1+X+L),b=u.indexOf(r,a),p=u.indexOf(e,a),D&&(ge(),E))return B();if(h&&T.length>=h)return B(!0);break}A.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:T.length,index:a}),p++}}else p++}return ie();function ue(q){T.push(q),f=a}function re(q){var Oe=0;if(q!==-1){var we=u.substring(p+1,q);we&&we.trim()===""&&(Oe=we.length)}return Oe}function ie(q){return F||(q===void 0&&(q=u.substring(a)),o.push(q),a=n,ue(o),D&&ge()),B()}function ne(q){a=q,ue(o),o=[],R=u.indexOf(i,a)}function B(q){return{data:T,errors:A,meta:{delimiter:r,linebreak:i,aborted:E,truncated:!!q,cursor:f+(K||0)}}}function ge(){d(B()),T=[],A=[]}},this.abort=function(){E=!0},this.getCharIndex=function(){return a}}function $(t){var e=t.data,r=G[e.workerId],i=!1;if(e.error)r.userError(e.error,e.file);else if(e.results&&e.results.data){var s={abort:function(){i=!0,ee(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:Re,resume:Re};if(g(r.userStep)){for(var d=0;d<e.results.data.length&&(r.userStep({data:e.results.data[d],errors:e.results.errors,meta:e.results.meta},s),!i);d++);delete e.results}else g(r.userChunk)&&(r.userChunk(e.results,s,e.file),delete e.results)}e.finished&&!i&&ee(e.workerId,e.results)}function ee(t,e){var r=G[t];g(r.userComplete)&&r.userComplete(e),r.terminate(),delete G[t]}function Re(){throw new Error("Not implemented.")}function be(t){if(typeof t!="object"||t===null)return t;var e=Array.isArray(t)?[]:{};for(var r in t)e[r]=be(t[r]);return e}function te(t,e){return function(){t.apply(e,arguments)}}function g(t){return typeof t=="function"}return se&&(y.onmessage=function(t){var e=t.data;if(l.WORKER_ID===void 0&&e&&(l.WORKER_ID=e.workerId),typeof e.input=="string")y.postMessage({workerId:l.WORKER_ID,results:l.parse(e.input,e.config),finished:!0});else if(y.File&&e.input instanceof File||e.input instanceof Object){var r=l.parse(e.input,e.config);r&&y.postMessage({workerId:l.WORKER_ID,results:r,finished:!0})}}),(le.prototype=Object.create(U.prototype)).constructor=le,(de.prototype=Object.create(U.prototype)).constructor=de,(ae.prototype=Object.create(ae.prototype)).constructor=ae,(M.prototype=Object.create(U.prototype)).constructor=M,l})})(Se);var Ze=Se.exports;const Xe=xe("div",{class:"px-3 py-1 text-caption text-primary"}," Note: This import function will ignore the data that already exist. ",-1),Ye={class:"pa-3 d-flex justify-space-between"},st={__name:"ImportData",props:{options:{type:Object,default:null}},emits:["imported"],setup(ve,{emit:ye}){const ce=ve,y=fe("http://127.0.0.1:8000"),Y=De(),se=Ge(),G=fe(!1),ke=()=>{se.industries.length==0&&(G.value=!0,se.getIndustries(Y.authToken).then(()=>{G.value=!1}))},l=fe({industry_id:null}),c=fe({dialog:!1,btnTitle:"Import",btnColor:"primary",loading:!1,cardTitle:"Import",endpoint:"",templateFile:"",conditionArray:[]});c.value={...c.value,...ce.options};const U=fe(null),le=fe([M=>!M||!M.length||M[0].size<2e6||"File size should be less than 2 MB."]),de=()=>{c.value.loading=!0,Ze.parse(U.value[0],{header:!0,transformHeader:function(M){return M.replace(/\s+/g,"_").toLowerCase().trim()},complete:ae})},ae=async(M,P)=>{let I=M.data.filter(function($){let ee=Object.keys($)[0].toString();return $!=null&&$[ee]!=""}),j={import_data:JSON.stringify(I)};c.value.conditionArray.includes("industry")==!0&&(j.industry_id=l.value.industry_id),await Je(Y.authToken).post(c.value.endpoint,j).then($=>{ye("imported",{status:!0,message:$.data.message})}).catch($=>{console.log("import error",$);let ee="";$.response.status==500?ee="Import error kindly double check the csv file":ee="Error while importing data",c.value.loading=!1,ye("imported",{status:!1,message:ee})})};return Fe(()=>ce.options,M=>{c.value={...c.value,...M},console.log("importData.value",c.value)}),(M,P)=>(Ce(),Le("div",null,[W(Ke,{modelValue:c.value.dialog,"onUpdate:modelValue":P[3]||(P[3]=I=>c.value.dialog=I),width:"600",persistent:""},{activator:Q(({props:I})=>[W(me,ze({color:c.value.btnColor},I),{default:Q(()=>[pe(Ee(c.value.btnTitle)+" ",1),W(Ie,{icon:_e(He),class:"ml-3"},null,8,["icon"])]),_:2},1040,["color"])]),default:Q(()=>[W(Me,{class:"rounded-lg",loading:c.value.loading},{default:Q(()=>[W(Ue,null,{default:Q(()=>[pe(Ee(c.value.cardTitle),1)]),_:1}),W(Pe,null,{default:Q(()=>[W(Ve,{modelValue:U.value,"onUpdate:modelValue":P[0]||(P[0]=I=>U.value=I),rules:le.value,accept:"text/csv",variant:"outlined",density:"compact","prepend-icon":null,"append-inner-icon":_e(We),label:"Upload .csv file"},null,8,["modelValue","rules","append-inner-icon"]),c.value.conditionArray.includes("industry")==!0?(Ce(),Te(Ne,{key:0,modelValue:l.value.industry_id,"onUpdate:modelValue":P[1]||(P[1]=I=>l.value.industry_id=I),items:_e(se).industries,"item-title":"title","item-value":"id",variant:"outlined",density:"compact",class:"bg-white","hide-details":"",label:G.value?"Loading...":"Select Industry",loading:G.value,onFocus:ke},{selection:Q(({props:I,item:j})=>[xe("span",Be(qe(I)),Ee(j.raw.title&&j.raw.title.length>30?j.raw.title.substring(0,30)+"...":j.raw.title),17)]),_:1},8,["modelValue","items","label","loading"])):Ae("",!0)]),_:1}),Xe,W(je),xe("div",Ye,[c.value.templateFile&&c.value.templateFile!=""?(Ce(),Te(me,{key:0,class:"bg-grey-lighten-3",variant:"text",color:"primary",href:`${y.value}/assets/csv/${c.value.templateFile}`,download:""},{default:Q(()=>[pe("Download CSV Template "),W(Ie,{size:"small",class:"ml-2",icon:_e($e)},null,8,["icon"])]),_:1},8,["href"])):Ae("",!0),W(me,{class:"bg-grey-lighten-3 ml-auto mr-3",variant:"text",color:"primary",onClick:P[2]||(P[2]=I=>c.value.dialog=!1)},{default:Q(()=>[pe("Close")]),_:1}),W(me,{color:"primary",loading:c.value.loading,onClick:de},{default:Q(()=>[pe("Import")]),_:1},8,["loading"])])]),_:1},8,["loading"])]),_:1},8,["modelValue"])]))}};export{st as _};
