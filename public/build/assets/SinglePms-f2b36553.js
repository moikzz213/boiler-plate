import{K as r,u as c,r as i,c as u,w as e,V as m,o as p,a as t,f as d,g,B as _,C as f,h as S,i as h}from"./app-fc232221.js";import{c as V}from"./clientApi-9cd075be.js";import{_ as v}from"./PageHeader-27d36fc6.js";import{_ as x}from"./PmsForm-bfbe625e.js";import"./company-a83a7dcf.js";import"./vue-datepicker-8eea4ac3.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./SnackBar-1fd8bd8c.js";const C={class:"v-col-12"},K={__name:"SinglePms",setup(w){const l=r(),n=c(),o=i({}),a=i(!1);return(async()=>{a.value=!0,await V(n.authToken).get("/api/hr/pms-setting/"+l.params.id).then(s=>{o.value=Object.assign({},s.data),a.value=!1}).catch(s=>{a.value=!1,console.log("getSingleSetting",s)})})(),(s,T)=>(p(),u(m,{class:"pb-16"},{default:e(()=>[t(v,{title:"PMS Setup"}),t(h,{class:"my-5"},{default:e(()=>[d("div",C,[t(g,{loading:a.value,class:"rounded-lg"},{default:e(()=>[t(_,{class:"text-primary mb-3"},{default:e(()=>[f(" Updated Performance Setting")]),_:1}),t(S,null,{default:e(()=>[t(x,{pms:o.value},null,8,["pms"])]),_:1})]),_:1},8,["loading"])])]),_:1})]),_:1}))}};export{K as default};