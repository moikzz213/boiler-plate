import{x as _,u as f,r as i,c as g,w as a,V as h,o as S,a as t,f as l,g as V,m as v,n as x,t as c,h as y,i as C}from"./app-07292aad.js";import{c as w}from"./clientApi-86b20a3c.js";import{_ as A}from"./PageHeader-ca36ddcf.js";import{_ as N}from"./PmsForm-cb39ae20.js";import"./company-0b22f1bf.js";import"./vue-datepicker-42153220.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./SnackBar-505cf931.js";const R={class:"v-col-12"},T={class:"text-secondary"},F={__name:"SinglePms",setup(b){const u=_(),m=f(),s=i({}),r=i(!1),p=async()=>{r.value=!0,await w(m.authToken).get("/api/hr/pms-setting/"+u.params.id).then(e=>{s.value=Object.assign({},e.data),r.value=!1}).catch(e=>{r.value=!1})},d=e=>e=="midyear"?"MID-YEAR":e=="yearend"?"YEAR-END":e;return p(),(e,k)=>(S(),g(h,{class:"pb-16"},{default:a(()=>[t(A,{title:"PMS Setup"}),t(C,{class:"my-5"},{default:a(()=>[l("div",R,[t(V,{loading:r.value,class:"rounded-lg"},{default:a(()=>[t(v,{class:"text-primary mb-3"},{default:a(()=>{var o,n;return[x(" Updated Performance Setting - "),l("span",T,c(d(s.value.state))+" ( "+c((n=(o=s.value)==null?void 0:o.status)==null?void 0:n.toUpperCase())+" )",1)]}),_:1}),t(y,null,{default:a(()=>[t(N,{pms:s.value},null,8,["pms"])]),_:1})]),_:1},8,["loading"])])]),_:1})]),_:1}))}};export{F as default};