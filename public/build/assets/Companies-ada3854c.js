import{r as Q,J as Le,o as de,c as Ce,w as v,d as f,l as xe,e as ze,f as te,t as ce,g as Ve,b as V,k as se,a8 as Pe,a as Me,x as Re,p as Ne,O as Ae,n as we,a9 as qe,a5 as Be,H as Te,u as $e,m as Ke,s as He,V as We,K as Je,F as Qe,y as Ge,M as Ze,I as Fe,j as Ye,q as Xe}from"./app-47bd7f18.js";import{b as et,c as tt,d as at,e as it,a as rt}from"./mdi-ef0a081c.js";import{c as Ie}from"./clientApi-4854dc50.js";import{_ as nt}from"./PageHeader-83084245.js";import{_ as st}from"./SnackBar-a6fe8421.js";import{c as ot}from"./_commonjsHelpers-725317a4.js";const lt={class:"pb-3 text-grey"},ut={class:"d-flex justify-end mt-5"},dt={__name:"ConfirmDialog",props:{options:{type:Object,default:null}},emits:["confirm"],setup(ye,{emit:G}){const oe=ye,c=Q({dialog:!1,title:"Confirm",text:"Please confirm <action>",btnColor:"secondary",btnTitle:"Confirm",loading:!1}),P=()=>{G("confirm",!0)};return Le(()=>oe.options,p=>{c.value=Object.assign({},p)}),(p,W)=>(de(),Ce(Pe,{modelValue:c.value.dialog,"onUpdate:modelValue":W[1]||(W[1]=J=>c.value.dialog=J),width:"100%","max-width":"480",persistent:""},{default:v(()=>[f(xe,{class:"rounded-lg"},{default:v(()=>[f(ze,{class:"pa-3 pb-0"},{default:v(()=>[te(ce(c.value.title),1)]),_:1}),f(Ve,{class:"px-3"},{default:v(()=>[V("div",lt,ce(c.value.text),1),V("div",ut,[f(se,{class:"bg-grey-lighten-2 text-primary",variant:"text",onClick:W[0]||(W[0]=J=>c.value.dialog=!1)},{default:v(()=>[te("Cancel")]),_:1}),f(se,{color:c.value.btnColor,class:"ml-2",loading:c.value.loading,onClick:P},{default:v(()=>[te(ce(c.value.btnTitle),1)]),_:1},8,["color","loading"])])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}};var je={exports:{}};/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/(function(ye,G){(function(oe,c){ye.exports=c()})(ot,function oe(){var c=typeof self<"u"?self:typeof window<"u"?window:c!==void 0?c:{},P=!c.document&&!!c.postMessage,p=c.IS_PAPA_WORKER||!1,W={},J=0,i={parse:function(t,e){var a=(e=e||{}).dynamicTyping||!1;if(k(a)&&(e.dynamicTypingFunction=a,a={}),e.dynamicTyping=a,e.transform=!!k(e.transform)&&e.transform,e.worker&&i.WORKERS_SUPPORTED){var r=function(){if(!i.WORKERS_SUPPORTED)return!1;var d=(q=c.URL||c.webkitURL||null,I=oe.toString(),i.BLOB_URL||(i.BLOB_URL=q.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",I,")();"],{type:"text/javascript"})))),h=new c.Worker(d),q,I;return h.onmessage=De,h.id=J++,W[h.id]=h}();return r.userStep=e.step,r.userChunk=e.chunk,r.userComplete=e.complete,r.userError=e.error,e.step=k(e.step),e.chunk=k(e.chunk),e.complete=k(e.complete),e.error=k(e.error),delete e.worker,void r.postMessage({input:t,config:e,workerId:r.id})}var s=null;return i.NODE_STREAM_INPUT,typeof t=="string"?(t=function(d){return d.charCodeAt(0)===65279?d.slice(1):d}(t),s=e.download?new U(e):new fe(e)):t.readable===!0&&k(t.read)&&k(t.on)?s=new he(e):(c.File&&t instanceof File||t instanceof Object)&&(s=new N(e)),s.stream(t)},unparse:function(t,e){var a=!1,r=!0,s=",",d=`\r
`,h='"',q=h+h,I=!1,o=null,D=!1;(function(){if(typeof e=="object"){if(typeof e.delimiter!="string"||i.BAD_DELIMITERS.filter(function(n){return e.delimiter.indexOf(n)!==-1}).length||(s=e.delimiter),(typeof e.quotes=="boolean"||typeof e.quotes=="function"||Array.isArray(e.quotes))&&(a=e.quotes),typeof e.skipEmptyLines!="boolean"&&typeof e.skipEmptyLines!="string"||(I=e.skipEmptyLines),typeof e.newline=="string"&&(d=e.newline),typeof e.quoteChar=="string"&&(h=e.quoteChar),typeof e.header=="boolean"&&(r=e.header),Array.isArray(e.columns)){if(e.columns.length===0)throw new Error("Option columns is empty");o=e.columns}e.escapeChar!==void 0&&(q=e.escapeChar+h),(typeof e.escapeFormulae=="boolean"||e.escapeFormulae instanceof RegExp)&&(D=e.escapeFormulae instanceof RegExp?e.escapeFormulae:/^[=+\-@\t\r].*$/)}})();var u=new RegExp(F(h),"g");if(typeof t=="string"&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return ie(null,t,I);if(typeof t[0]=="object")return ie(o||Object.keys(t[0]),t,I)}else if(typeof t=="object")return typeof t.data=="string"&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||o),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:typeof t.data[0]=="object"?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||typeof t.data[0]=="object"||(t.data=[t.data])),ie(t.fields||[],t.data||[],I);throw new Error("Unable to serialize unrecognized input");function ie(n,x,K){var A="";typeof n=="string"&&(n=JSON.parse(n)),typeof x=="string"&&(x=JSON.parse(x));var B=Array.isArray(n)&&0<n.length,M=!Array.isArray(x[0]);if(B&&r){for(var j=0;j<n.length;j++)0<j&&(A+=s),A+=$(n[j],j);0<x.length&&(A+=d)}for(var l=0;l<x.length;l++){var _=B?n.length:x[l].length,O=!1,z=B?Object.keys(x[l]).length===0:x[l].length===0;if(K&&!B&&(O=K==="greedy"?x[l].join("").trim()==="":x[l].length===1&&x[l][0].length===0),K==="greedy"&&B){for(var b=[],H=0;H<_;H++){var S=M?n[H]:H;b.push(x[l][S])}O=b.join("").trim()===""}if(!O){for(var C=0;C<_;C++){0<C&&!z&&(A+=s);var re=B&&M?n[C]:C;A+=$(x[l][re],C)}l<x.length-1&&(!K||0<_&&!z)&&(A+=d)}}return A}function $(n,x){if(n==null)return"";if(n.constructor===Date)return JSON.stringify(n).slice(1,25);var K=!1;D&&typeof n=="string"&&D.test(n)&&(n="'"+n,K=!0);var A=n.toString().replace(u,q);return(K=K||a===!0||typeof a=="function"&&a(n,x)||Array.isArray(a)&&a[x]||function(B,M){for(var j=0;j<M.length;j++)if(-1<B.indexOf(M[j]))return!0;return!1}(A,i.BAD_DELIMITERS)||-1<A.indexOf(s)||A.charAt(0)===" "||A.charAt(A.length-1)===" ")?h+A+h:A}}};if(i.RECORD_SEP=String.fromCharCode(30),i.UNIT_SEP=String.fromCharCode(31),i.BYTE_ORDER_MARK="\uFEFF",i.BAD_DELIMITERS=["\r",`
`,'"',i.BYTE_ORDER_MARK],i.WORKERS_SUPPORTED=!P&&!!c.Worker,i.NODE_STREAM_INPUT=1,i.LocalChunkSize=10485760,i.RemoteChunkSize=5242880,i.DefaultDelimiter=",",i.Parser=be,i.ParserHandle=T,i.NetworkStreamer=U,i.FileStreamer=N,i.StringStreamer=fe,i.ReadableStreamStreamer=he,c.jQuery){var ae=c.jQuery;ae.fn.parse=function(t){var e=t.config||{},a=[];return this.each(function(d){if(!(ae(this).prop("tagName").toUpperCase()==="INPUT"&&ae(this).attr("type").toLowerCase()==="file"&&c.FileReader)||!this.files||this.files.length===0)return!0;for(var h=0;h<this.files.length;h++)a.push({file:this.files[h],inputElem:this,instanceConfig:ae.extend({},e)})}),r(),this;function r(){if(a.length!==0){var d,h,q,I,o=a[0];if(k(t.before)){var D=t.before(o.file,o.inputElem);if(typeof D=="object"){if(D.action==="abort")return d="AbortError",h=o.file,q=o.inputElem,I=D.reason,void(k(t.error)&&t.error({name:d},h,q,I));if(D.action==="skip")return void s();typeof D.config=="object"&&(o.instanceConfig=ae.extend(o.instanceConfig,D.config))}else if(D==="skip")return void s()}var u=o.instanceConfig.complete;o.instanceConfig.complete=function(ie){k(u)&&u(ie,o.file,o.inputElem),s()},i.parse(o.file,o.instanceConfig)}else k(t.complete)&&t.complete()}function s(){a.splice(0,1),r()}}}function g(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var a=m(e);a.chunkSize=parseInt(a.chunkSize),e.step||e.chunk||(a.chunkSize=null),this._handle=new T(a),(this._handle.streamer=this)._config=a}.call(this,t),this.parseChunk=function(e,a){if(this.isFirstChunk&&k(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);r!==void 0&&(e=r)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+e;this._partialLine="";var d=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var h=d.meta.cursor;this._finished||(this._partialLine=s.substring(h-this._baseIndex),this._baseIndex=h),d&&d.data&&(this._rowCount+=d.data.length);var q=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(p)c.postMessage({results:d,workerId:i.WORKER_ID,finished:q});else if(k(this._config.chunk)&&!a){if(this._config.chunk(d,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);d=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(d.data),this._completeResults.errors=this._completeResults.errors.concat(d.errors),this._completeResults.meta=d.meta),this._completed||!q||!k(this._config.complete)||d&&d.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),q||d&&d.meta.paused||this._nextChunk(),d}this._halted=!0},this._sendError=function(e){k(this._config.error)?this._config.error(e):p&&this._config.error&&c.postMessage({workerId:i.WORKER_ID,error:e,finished:!1})}}function U(t){var e;(t=t||{}).chunkSize||(t.chunkSize=i.RemoteChunkSize),g.call(this,t),this._nextChunk=P?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(a){this._input=a,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),P||(e.onload=E(this._chunkLoaded,this),e.onerror=E(this._chunkError,this)),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!P),this._config.downloadRequestHeaders){var a=this._config.downloadRequestHeaders;for(var r in a)e.setRequestHeader(r,a[r])}if(this._config.chunkSize){var s=this._start+this._config.chunkSize-1;e.setRequestHeader("Range","bytes="+this._start+"-"+s)}try{e.send(this._config.downloadRequestBody)}catch(d){this._chunkError(d.message)}P&&e.status===0&&this._chunkError()}},this._chunkLoaded=function(){e.readyState===4&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:e.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(a){var r=a.getResponseHeader("Content-Range");return r===null?-1:parseInt(r.substring(r.lastIndexOf("/")+1))}(e),this.parseChunk(e.responseText)))},this._chunkError=function(a){var r=e.statusText||a;this._sendError(new Error(r))}}function N(t){var e,a;(t=t||{}).chunkSize||(t.chunkSize=i.LocalChunkSize),g.call(this,t);var r=typeof FileReader<"u";this.stream=function(s){this._input=s,a=s.slice||s.webkitSlice||s.mozSlice,r?((e=new FileReader).onload=E(this._chunkLoaded,this),e.onerror=E(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var s=this._input;if(this._config.chunkSize){var d=Math.min(this._start+this._config.chunkSize,this._input.size);s=a.call(s,this._start,d)}var h=e.readAsText(s,this._config.encoding);r||this._chunkLoaded({target:{result:h}})},this._chunkLoaded=function(s){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(s.target.result)},this._chunkError=function(){this._sendError(e.error)}}function fe(t){var e;g.call(this,t=t||{}),this.stream=function(a){return e=a,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var a,r=this._config.chunkSize;return r?(a=e.substring(0,r),e=e.substring(r)):(a=e,e=""),this._finished=!e,this.parseChunk(a)}}}function he(t){g.call(this,t=t||{});var e=[],a=!0,r=!1;this.pause=function(){g.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){g.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(s){this._input=s,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&e.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):a=!0},this._streamData=E(function(s){try{e.push(typeof s=="string"?s:s.toString(this._config.encoding)),a&&(a=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(d){this._streamError(d)}},this),this._streamError=E(function(s){this._streamCleanUp(),this._sendError(s)},this),this._streamEnd=E(function(){this._streamCleanUp(),r=!0,this._streamData("")},this),this._streamCleanUp=E(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function T(t){var e,a,r,s=Math.pow(2,53),d=-s,h=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,q=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,I=this,o=0,D=0,u=!1,ie=!1,$=[],n={data:[],errors:[],meta:{}};if(k(t.step)){var x=t.step;t.step=function(l){if(n=l,B())A();else{if(A(),n.data.length===0)return;o+=l.data.length,t.preview&&o>t.preview?a.abort():(n.data=n.data[0],x(n,I))}}}function K(l){return t.skipEmptyLines==="greedy"?l.join("").trim()==="":l.length===1&&l[0].length===0}function A(){return n&&r&&(j("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+i.DefaultDelimiter+"'"),r=!1),t.skipEmptyLines&&(n.data=n.data.filter(function(l){return!K(l)})),B()&&function(){if(!n)return;function l(O,z){k(t.transformHeader)&&(O=t.transformHeader(O,z)),$.push(O)}if(Array.isArray(n.data[0])){for(var _=0;B()&&_<n.data.length;_++)n.data[_].forEach(l);n.data.splice(0,1)}else n.data.forEach(l)}(),function(){if(!n||!t.header&&!t.dynamicTyping&&!t.transform)return n;function l(O,z){var b,H=t.header?{}:[];for(b=0;b<O.length;b++){var S=b,C=O[b];t.header&&(S=b>=$.length?"__parsed_extra":$[b]),t.transform&&(C=t.transform(C,S)),C=M(S,C),S==="__parsed_extra"?(H[S]=H[S]||[],H[S].push(C)):H[S]=C}return t.header&&(b>$.length?j("FieldMismatch","TooManyFields","Too many fields: expected "+$.length+" fields but parsed "+b,D+z):b<$.length&&j("FieldMismatch","TooFewFields","Too few fields: expected "+$.length+" fields but parsed "+b,D+z)),H}var _=1;return!n.data.length||Array.isArray(n.data[0])?(n.data=n.data.map(l),_=n.data.length):n.data=l(n.data,0),t.header&&n.meta&&(n.meta.fields=$),D+=_,n}()}function B(){return t.header&&$.length===0}function M(l,_){return O=l,t.dynamicTypingFunction&&t.dynamicTyping[O]===void 0&&(t.dynamicTyping[O]=t.dynamicTypingFunction(O)),(t.dynamicTyping[O]||t.dynamicTyping)===!0?_==="true"||_==="TRUE"||_!=="false"&&_!=="FALSE"&&(function(z){if(h.test(z)){var b=parseFloat(z);if(d<b&&b<s)return!0}return!1}(_)?parseFloat(_):q.test(_)?new Date(_):_===""?null:_):_;var O}function j(l,_,O,z){var b={type:l,code:_,message:O};z!==void 0&&(b.row=z),n.errors.push(b)}this.parse=function(l,_,O){var z=t.quoteChar||'"';if(t.newline||(t.newline=function(S,C){S=S.substring(0,1048576);var re=new RegExp(F(C)+"([^]*?)"+F(C),"gm"),Z=(S=S.replace(re,"")).split("\r"),ne=S.split(`
`),le=1<ne.length&&ne[0].length<Z[0].length;if(Z.length===1||le)return`
`;for(var Y=0,R=0;R<Z.length;R++)Z[R][0]===`
`&&Y++;return Y>=Z.length/2?`\r
`:"\r"}(l,z)),r=!1,t.delimiter)k(t.delimiter)&&(t.delimiter=t.delimiter(l),n.meta.delimiter=t.delimiter);else{var b=function(S,C,re,Z,ne){var le,Y,R,L;ne=ne||[",","	","|",";",i.RECORD_SEP,i.UNIT_SEP];for(var ve=0;ve<ne.length;ve++){var y=ne[ve],ke=0,ue=0,_e=0;R=void 0;for(var pe=new be({comments:Z,delimiter:y,newline:C,preview:10}).parse(S),ge=0;ge<pe.data.length;ge++)if(re&&K(pe.data[ge]))_e++;else{var me=pe.data[ge].length;ue+=me,R!==void 0?0<me&&(ke+=Math.abs(me-R),R=me):R=me}0<pe.data.length&&(ue/=pe.data.length-_e),(Y===void 0||ke<=Y)&&(L===void 0||L<ue)&&1.99<ue&&(Y=ke,le=y,L=ue)}return{successful:!!(t.delimiter=le),bestDelimiter:le}}(l,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);b.successful?t.delimiter=b.bestDelimiter:(r=!0,t.delimiter=i.DefaultDelimiter),n.meta.delimiter=t.delimiter}var H=m(t);return t.preview&&t.header&&H.preview++,e=l,a=new be(H),n=a.parse(e,_,O),A(),u?{meta:{paused:!0}}:n||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,a.abort(),e=k(t.chunk)?"":e.substring(a.getCharIndex())},this.resume=function(){I.streamer._halted?(u=!1,I.streamer.parseChunk(e,!0)):setTimeout(I.resume,3)},this.aborted=function(){return ie},this.abort=function(){ie=!0,a.abort(),n.meta.aborted=!0,k(t.complete)&&t.complete(n),e=""}}function F(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function be(t){var e,a=(t=t||{}).delimiter,r=t.newline,s=t.comments,d=t.step,h=t.preview,q=t.fastMode,I=e=t.quoteChar===void 0||t.quoteChar===null?'"':t.quoteChar;if(t.escapeChar!==void 0&&(I=t.escapeChar),(typeof a!="string"||-1<i.BAD_DELIMITERS.indexOf(a))&&(a=","),s===a)throw new Error("Comment character same as delimiter");s===!0?s="#":(typeof s!="string"||-1<i.BAD_DELIMITERS.indexOf(s))&&(s=!1),r!==`
`&&r!=="\r"&&r!==`\r
`&&(r=`
`);var o=0,D=!1;this.parse=function(u,ie,$){if(typeof u!="string")throw new Error("Input must be a string");var n=u.length,x=a.length,K=r.length,A=s.length,B=k(d),M=[],j=[],l=[],_=o=0;if(!u)return X();if(t.header&&!ie){var O=u.split(r)[0].split(a),z=[],b={},H=!1;for(var S in O){var C=O[S];k(t.transformHeader)&&(C=t.transformHeader(C,S));var re=C,Z=b[C]||0;for(0<Z&&(H=!0,re=C+"_"+Z),b[C]=Z+1;z.includes(re);)re=re+"_"+Z;z.push(re)}if(H){var ne=u.split(r);ne[0]=z.join(a),u=ne.join(r)}}if(q||q!==!1&&u.indexOf(e)===-1){for(var le=u.split(r),Y=0;Y<le.length;Y++){if(l=le[Y],o+=l.length,Y!==le.length-1)o+=r.length;else if($)return X();if(!s||l.substring(0,A)!==s){if(B){if(M=[],_e(l.split(a)),Oe(),D)return X()}else _e(l.split(a));if(h&&h<=Y)return M=M.slice(0,h),X(!0)}}return X()}for(var R=u.indexOf(a,o),L=u.indexOf(r,o),ve=new RegExp(F(I)+F(e),"g"),y=u.indexOf(e,o);;)if(u[o]!==e)if(s&&l.length===0&&u.substring(o,o+A)===s){if(L===-1)return X();o=L+K,L=u.indexOf(r,o),R=u.indexOf(a,o)}else if(R!==-1&&(R<L||L===-1))l.push(u.substring(o,R)),o=R+x,R=u.indexOf(a,o);else{if(L===-1)break;if(l.push(u.substring(o,L)),me(L+K),B&&(Oe(),D))return X();if(h&&M.length>=h)return X(!0)}else for(y=o,o++;;){if((y=u.indexOf(e,y+1))===-1)return $||j.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:M.length,index:o}),ge();if(y===n-1)return ge(u.substring(o,y).replace(ve,e));if(e!==I||u[y+1]!==I){if(e===I||y===0||u[y-1]!==I){R!==-1&&R<y+1&&(R=u.indexOf(a,y+1)),L!==-1&&L<y+1&&(L=u.indexOf(r,y+1));var ke=pe(L===-1?R:Math.min(R,L));if(u.substr(y+1+ke,x)===a){l.push(u.substring(o,y).replace(ve,e)),u[o=y+1+ke+x]!==e&&(y=u.indexOf(e,o)),R=u.indexOf(a,o),L=u.indexOf(r,o);break}var ue=pe(L);if(u.substring(y+1+ue,y+1+ue+K)===r){if(l.push(u.substring(o,y).replace(ve,e)),me(y+1+ue+K),R=u.indexOf(a,o),y=u.indexOf(e,o),B&&(Oe(),D))return X();if(h&&M.length>=h)return X(!0);break}j.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:M.length,index:o}),y++}}else y++}return ge();function _e(ee){M.push(ee),_=o}function pe(ee){var Ue=0;if(ee!==-1){var Se=u.substring(y+1,ee);Se&&Se.trim()===""&&(Ue=Se.length)}return Ue}function ge(ee){return $||(ee===void 0&&(ee=u.substring(o)),l.push(ee),o=n,_e(l),B&&Oe()),X()}function me(ee){o=ee,_e(l),l=[],L=u.indexOf(r,o)}function X(ee){return{data:M,errors:j,meta:{delimiter:a,linebreak:r,aborted:D,truncated:!!ee,cursor:_+(ie||0)}}}function Oe(){d(X()),M=[],j=[]}},this.abort=function(){D=!0},this.getCharIndex=function(){return o}}function De(t){var e=t.data,a=W[e.workerId],r=!1;if(e.error)a.userError(e.error,e.file);else if(e.results&&e.results.data){var s={abort:function(){r=!0,Ee(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:w,resume:w};if(k(a.userStep)){for(var d=0;d<e.results.data.length&&(a.userStep({data:e.results.data[d],errors:e.results.errors,meta:e.results.meta},s),!r);d++);delete e.results}else k(a.userChunk)&&(a.userChunk(e.results,s,e.file),delete e.results)}e.finished&&!r&&Ee(e.workerId,e.results)}function Ee(t,e){var a=W[t];k(a.userComplete)&&a.userComplete(e),a.terminate(),delete W[t]}function w(){throw new Error("Not implemented.")}function m(t){if(typeof t!="object"||t===null)return t;var e=Array.isArray(t)?[]:{};for(var a in t)e[a]=m(t[a]);return e}function E(t,e){return function(){t.apply(e,arguments)}}function k(t){return typeof t=="function"}return p&&(c.onmessage=function(t){var e=t.data;if(i.WORKER_ID===void 0&&e&&(i.WORKER_ID=e.workerId),typeof e.input=="string")c.postMessage({workerId:i.WORKER_ID,results:i.parse(e.input,e.config),finished:!0});else if(c.File&&e.input instanceof File||e.input instanceof Object){var a=i.parse(e.input,e.config);a&&c.postMessage({workerId:i.WORKER_ID,results:a,finished:!0})}}),(U.prototype=Object.create(g.prototype)).constructor=U,(N.prototype=Object.create(g.prototype)).constructor=N,(fe.prototype=Object.create(fe.prototype)).constructor=fe,(he.prototype=Object.create(g.prototype)).constructor=he,i})})(je);var ct=je.exports;const ft=V("div",{class:"px-3 py-1 text-caption text-primary"}," Note: This import function will ignore the data that already exist. ",-1),ht={class:"pa-3 d-flex justify-space-between"},pt={__name:"ImportData",props:{options:{type:Object,default:null}},emits:["imported"],setup(ye,{emit:G}){const oe=ye,c=Q("http://127.0.0.1:8083"),P=Me(),p=Q({dialog:!1,btnTitle:"Import",btnColor:"secondary",loading:!1,cardTitle:"Import",endpoint:"",templateFile:"",conditionArray:[]});p.value={...p.value,...oe.options};const W=Q(null),J=Q([g=>!g||!g.length||g[0].size<2e6||"File size should be less than 2 MB."]),i=()=>{p.value.loading=!0,ct.parse(W.value[0],{header:!0,transformHeader:function(g){return g.replace(/\s+/g,"_").toLowerCase().trim()},complete:ae})},ae=async(g,U)=>{let N=g.data.filter(function(T){let F=Object.keys(T)[0].toString();return T!=null&&T[F]!=""});if(new Set(N.map(T=>T.title)).size<N.length)return G("imported",{status:!1,message:"Kindly remove the duplicate data from the file."}),setTimeout(()=>{p.value.loading=!1},1500),!1;let he={import_data:JSON.stringify(N)};await Ie(P.authToken).post(p.value.endpoint,he).then(T=>{G("imported",{status:!0,message:T.data.message})}).catch(T=>{console.log("import error",T);let F="";T.response.status==500?F="Import error kindly double check the csv file":F="Error while importing data",p.value.loading=!1,G("imported",{status:!1,message:F})})};return Le(()=>oe.options,g=>{p.value={...p.value,...g},console.log("importData.value",p.value)}),(g,U)=>(de(),Re("div",null,[f(Pe,{modelValue:p.value.dialog,"onUpdate:modelValue":U[2]||(U[2]=N=>p.value.dialog=N),width:"600",persistent:""},{activator:v(({props:N})=>[f(se,Ne({color:p.value.btnColor},N),{default:v(()=>[te(ce(p.value.btnTitle)+" ",1),f(Ae,{icon:we(et),class:"ml-3"},null,8,["icon"])]),_:2},1040,["color"])]),default:v(()=>[f(xe,{class:"rounded-lg",loading:p.value.loading},{default:v(()=>[f(ze,null,{default:v(()=>[te(ce(p.value.cardTitle),1)]),_:1}),f(Ve,null,{default:v(()=>[f(qe,{modelValue:W.value,"onUpdate:modelValue":U[0]||(U[0]=N=>W.value=N),rules:J.value,accept:"text/csv",variant:"outlined",density:"compact","prepend-icon":null,"append-inner-icon":we(tt),label:"Upload .csv file"},null,8,["modelValue","rules","append-inner-icon"])]),_:1}),ft,f(Be),V("div",ht,[p.value.templateFile&&p.value.templateFile!=""?(de(),Ce(se,{key:0,class:"bg-grey-lighten-3",variant:"text",color:"primary",href:`${c.value}/assets/csv/${p.value.templateFile}`,download:""},{default:v(()=>[te("Download CSV Template "),f(Ae,{size:"small",class:"ml-2",icon:we(at)},null,8,["icon"])]),_:1},8,["href"])):Te("",!0),f(se,{class:"bg-grey-lighten-3 ml-auto mr-3",variant:"text",color:"primary",onClick:U[1]||(U[1]=N=>p.value.dialog=!1)},{default:v(()=>[te("Close")]),_:1}),f(se,{color:"secondary",loading:p.value.loading,onClick:i},{default:v(()=>[te("Import")]),_:1},8,["loading"])])]),_:1},8,["loading"])]),_:1},8,["modelValue"])]))}},gt={class:"v-col-12"},mt=V("div",{class:"text-primary text-capitalize"},"Companies",-1),vt=V("thead",null,[V("tr",null,[V("th",{class:"text-left text-capitalize"},"Title"),V("th",{class:"text-center text-capitalize"},"Status"),V("th",{class:"text-right text-capitalize"},"Actions")])],-1),_t={key:0},yt={class:"text-center"},kt={class:"d-flex align-center justify-end"},bt={class:Xe("v-col-12 px-4")},Ct={class:"v-col-12"},xt={class:"v-col-12 py-0"},wt={class:"v-col-12 d-flex justify-end"},Dt={__name:"Companies",setup(ye){const G=Me(),oe=$e(),c=Ke(),P=Q({}),p=Q({cardTitle:"Import companies",endpoint:"/api/import/companies",templateFile:"import-template-companies.csv"}),W=w=>{w.status==!0?U(1).then(()=>{P.value={status:!0,type:"success",text:w.message},p.value={...p.value,loading:!1,dialog:!1}}):P.value={status:!0,type:"error",text:w.message}},J=Q([]),i=Q({title:"",data:{},loading:!1,dialog:!1,action:"add"}),ae=Q(0),g=Q(c.params&&c.params.page?c.params.page:1),U=async w=>{await Ie(G.authToken).get("/api/hr/companies?page="+w).then(m=>{ae.value=m.data.last_page,g.value=m.data.current_page,J.value=m.data.data}).catch(m=>{console.log("companies",m)})},N=async()=>{let w={profile_id:G.authProfile.id,id:i.value.action=="edit"?i.value.data.id:null,title:i.value.data.title};i.value.loading=!0,await Ie(G.authToken).post("/api/hr/company/save",w).then(m=>{U(g.value).then(()=>{i.value.loading=!1,i.value.dialog=!1,P.value={status:!0,type:"success",text:m.data.message}})}).catch(m=>{i.value.loading=!1,console.log("companies",m),m.response.data.message.includes("Duplicate entry")==!0?P.value={status:!0,type:"error",text:w.title+" already exist"}:P.value={status:!0,type:"error",text:"Error while saving company"}})},fe=()=>{i.value={...i.value,title:"Add Company",data:{},dialog:!0,action:"add"}},he=w=>{i.value={...i.value,title:"Edit "+w.title,data:Object.assign({},w),dialog:!0,action:"edit"}};Le(g,(w,m)=>{w!=m&&(oe.push({name:"PaginatedCompanies",params:{page:g.value}}).catch(E=>{}),U(g.value))}),He(()=>{U(g.value)});const T=Q({}),F=Q({}),be=w=>{F.value=Object.assign({},w),F.value.new_status=F.value.status=="active"?"inactive":"active",T.value={dialog:!0,title:"Confirm",text:"Please confirm that you want to update the status of "+w.title+" to "+F.value.new_status+".",btnColor:F.value.new_status=="active"?"success":"error",btnTitle:F.value.new_status}},De=async()=>{let w={status:F.value.new_status,profile_id:G.authProfile.id};await Ie(G.authToken).post("/api/hr/company/update-status/"+F.value.id,w).then(m=>{U(g.value).then(()=>{P.value={status:!0,type:"success",text:m.data.message}})}).catch(m=>{P.value={status:!0,type:"error",text:"Error while removing data"}})},Ee=w=>{T.value={...T.value,loading:!0},De().then(m=>{T.value={...T.value,dialog:!1,loading:!1}}).catch(m=>{T.value={...T.value,loading:!1}})};return(w,m)=>(de(),Ce(We,{class:"pb-16"},{default:v(()=>[f(nt,{title:"Companies"}),f(Fe,{class:"my-5"},{default:v(()=>[V("div",gt,[f(pt,{options:p.value,onImported:W,class:"mb-3"},null,8,["options"]),f(xe,{class:"rounded-lg"},{default:v(()=>[f(ze,{class:"d-flex align-center"},{default:v(()=>[f(se,{onClick:fe,density:"compact",size:"35",class:"rounded-xl elevation-2 mr-2"},{default:v(()=>[f(Ae,{size:"small",icon:we(it)},null,8,["icon"])]),_:1}),mt]),_:1}),f(Je,null,{default:v(()=>[vt,J.value&&J.value.length>0?(de(),Re("tbody",_t,[(de(!0),Re(Qe,null,Ge(J.value,E=>(de(),Re("tr",{key:E.id},[V("td",null,ce(E.title),1),V("td",yt,[f(se,{size:"small",onClick:()=>be(E),color:E.status=="active"?"success":"error",class:"mx-1 rounded-xl"},{default:v(()=>[te(ce(E.status),1)]),_:2},1032,["onClick","color"])]),V("td",null,[V("div",kt,[f(Ae,{size:"small",onClick:()=>he(E),icon:we(rt),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])):Te("",!0)]),_:1}),J.value&&J.value.length==0?(de(),Ce(xe,{key:0},{default:v(()=>[f(Ve,{class:"text-center"},{default:v(()=>[te(" No records found ")]),_:1})]),_:1})):Te("",!0)]),_:1}),ae.value>1?(de(),Ce(Ze,{key:0,modelValue:g.value,"onUpdate:modelValue":m[0]||(m[0]=E=>g.value=E),class:"my-4",length:ae.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):Te("",!0)])]),_:1}),f(Pe,{modelValue:i.value.dialog,"onUpdate:modelValue":m[3]||(m[3]=E=>i.value.dialog=E),width:"100%","max-width":"480px",persistent:""},{default:v(()=>[f(xe,{class:"rounded-lg"},{default:v(()=>[f(Fe,{class:"ma-0 pa-0"},{default:v(()=>[V("div",bt,[f(Fe,null,{default:v(()=>[V("div",Ct,ce(i.value.title)+" "+ce(),1),V("div",xt,[f(Ye,{modelValue:i.value.data.title,"onUpdate:modelValue":m[1]||(m[1]=E=>i.value.data.title=E),label:"Company*",variant:"outlined",density:"compact"},null,8,["modelValue"])]),V("div",wt,[f(se,{color:"primary",variant:"text",onClick:m[2]||(m[2]=E=>i.value.dialog=!1)},{default:v(()=>[te("Cancel")]),_:1}),f(se,{color:"primary",loading:i.value.loading,class:"ml-2 px-8",onClick:N},{default:v(()=>[te("save")]),_:1},8,["loading"])])]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),f(dt,{options:T.value,onConfirm:Ee},null,8,["options"]),f(st,{options:P.value},null,8,["options"])]),_:1}))}};export{Dt as default};
