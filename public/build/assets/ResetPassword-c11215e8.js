import{r,x as z,k as B,c as L,w as t,o as F,f as d,a as s,t as x,m as T,n as y,h as $,d as n,s as w,y as f,v as q,z as E,g as S}from"./app-8d3d619d.js";import{G,W}from"./WhiteLogo-c37cc4bd.js";import{c as D,a as _,b as M,F as O,d as V}from"./index.esm-bcdd8243.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./_commonjsHelpers-042e6b4d.js";const j={class:"mx-auto px-3 text-center",style:{"z-index":"1","max-width":"400px",width:"100%","margin-top":"100px"}},A={class:"text-subtitle-1 text-white"},H={class:"align-center"},Z={__name:"ResetPassword",setup(I){var g;const h=r("Performance Management System"),b=r("https://users.moikzz.tech"),P=r("performance-management-system"),m=r(!1),e=r({username:"",password_confirmation:"",password:"",url:P.value}),p=r(!1),u=r(""),C=z(),k=B(),c=r(!0);e.value.username=(g=C.query)==null?void 0:g.ecode,e.value.username&&(c.value=!1);const R=()=>{k.push({path:"/login"})},U=D({password:_().min(5).required(),password_confirmation:_().required().oneOf([M("password")],"Passwords do not match")}),N=async()=>{if(p.value=!1,u.value="",e.value.password==0){u.value="Enter Password",p.value=!0;return}m.value=!0,await axios.post(b.value+"/api/application/reset-password",e.value).then(v=>{e.value={password:"11111111111111111111111",password_confirmation:"11111111111111111111111"},c.value=!0,m.value=!1,u.value=v.data.msg}).catch(v=>{})};return(v,a)=>(F(),L(G,null,{default:t(()=>[d("div",j,[s(W,{width:"100%"}),d("div",A,x(h.value),1)]),s(S,{class:"mt-8 pa-3 rounded-lg elevation-3",width:"90%","max-width":"450"},{default:t(()=>[s(T,{class:"px-5 pb-0 primary--text"},{default:t(()=>[y("Reset Password")]),_:1}),s($,{class:"py-4"},{default:t(()=>[s(n(O),{as:"v-form","validation-schema":n(U)},{default:t(()=>[s(n(V),{name:"username",modelValue:e.value.username,"onUpdate:modelValue":a[1]||(a[1]=o=>e.value.username=o)},{default:t(({field:o,errors:i})=>[s(w,f({modelValue:e.value.username,"onUpdate:modelValue":a[0]||(a[0]=l=>e.value.username=l)},o,{label:"Employee Code",variant:"outlined",density:"compact",disabled:"disabled"}),null,16,["modelValue"])]),_:1},8,["modelValue"]),s(n(V),{name:"password",modelValue:e.value.password,"onUpdate:modelValue":a[3]||(a[3]=o=>e.value.password=o)},{default:t(({field:o,errors:i})=>[s(w,f({modelValue:e.value.password,"onUpdate:modelValue":a[2]||(a[2]=l=>e.value.password=l)},o,{label:"Set New Password",type:"password",variant:"outlined",density:"compact","error-messages":i}),null,16,["modelValue","error-messages"])]),_:1},8,["modelValue"]),s(n(V),{name:"password_confirmation",modelValue:e.value.password_confirmation,"onUpdate:modelValue":a[5]||(a[5]=o=>e.value.password_confirmation=o)},{default:t(({field:o,errors:i})=>[s(w,f({modelValue:e.value.password_confirmation,"onUpdate:modelValue":a[4]||(a[4]=l=>e.value.password_confirmation=l)},o,{label:"Confirm New Password",type:"password",variant:"outlined",density:"compact","error-messages":i}),null,16,["modelValue","error-messages"])]),_:1},8,["modelValue"]),d("div",H,[s(q,{onClick:N,width:"100%",color:"primary",height:"55",large:"",disabled:c.value,loading:m.value},{default:t(()=>[y("Reset Password")]),_:1},8,["disabled","loading"]),d("div",{class:"mt-5",style:{cursor:"pointer"},onClick:R},"back to Login")])]),_:1},8,["validation-schema"]),d("div",{class:E(`${p.value?"text-error":"text-success"}  mt-4 text-center`)},x(u.value),3)]),_:1})]),_:1})]),_:1}))}};export{Z as default};
