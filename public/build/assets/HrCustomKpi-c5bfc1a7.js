<<<<<<<< HEAD:public/build/assets/HrCustomKpi-c5bfc1a7.js
import{u as I,r as i,z as A,L as R,O as B,c as y,w as u,V as L,o as p,a as l,f as e,g as C,B as N,a2 as O,b as k,n as $,F as E,h as S,C as j,e as V,R as F,i as H,A as g,Y as D,d as U}from"./app-97ea0592.js";import{c as x}from"./clientApi-749dd067.js";import{f as Y}from"./mdi-7fd0807e.js";import{_ as q}from"./PageHeader-51e993a6.js";import{_ as G}from"./CustomKpiDialog-707aff03.js";import{_ as J}from"./ConfirmDialog-c0b3cd58.js";import{_ as M}from"./SnackBar-adcfcc56.js";import"./industry-a63765f4.js";const Q=e("div",{class:"v-col-12"},[e("div",{class:"text-h6"},"Custom KPI")],-1),W={class:"v-col-12"},X=e("div",{class:"text-primary text-capitalize"},"KPI List",-1),Z=e("thead",null,[e("tr",null,[e("th",{class:"text-left text-capitalize"},"Title"),e("th",{class:"text-left text-capitalize"},"Type"),e("th",{class:"text-left text-capitalize"},"Industry"),e("th",{class:"text-left text-capitalize"},"Author"),e("th",{class:"text-right text-capitalize"},"Actions")])],-1),ee={class:"d-flex align-center justify-end"},ce={__name:"HrCustomKpi",setup(te){const d=I(),c=i({}),K=A(),h=R(),n=i({title:"",dialog:!1,data:{},type:"",action:"",is_review:!1}),v=i([]),f=i(!1),_=i(0),o=i(h.params&&h.params.page?h.params.page:1),m=async s=>{f.value=!0,await x(d.authToken).get("/api/hr/kpi/list/pending/?page="+s).then(t=>{_.value=t.data.last_page,o.value=t.data.current_page,v.value=t.data.data,f.value=!1}).catch(t=>{console.log("getCustomKpi",t.response),f.value=!1})};m(o.value);const P=s=>{n.value={...n.value,title:"Approve KPI ",data:Object.assign({},s),loading:!1,dialog:!0,type:s.type,action:"approve",is_review:!1}},w=async s=>{let t={profile_id:d.authProfile.id,id:s.id};await x(d.authToken).post("/api/hr/custom-kpi/approve",t).then(a=>{m(o.value).then(()=>{c.value={status:!0,type:"success",text:a.data.message},n.value={...n.value,dialog:!1,loading:!1}})}).catch(a=>{c.value={status:!0,type:"error",text:"Error while trying to approve Custom KPI"},n.value={...n.value,loading:!1}})};B(o,(s,t)=>{s!=t&&(K.push({name:"PaginatedHrCustomKpi",params:{page:o.value}}).catch(a=>{}),m(o.value))});const r=i({}),b=i({}),T=async()=>{await x(d.authToken).post("/api/hr/kpi/remove/"+b.value.id).then(s=>{m(o.value).then(()=>{c.value={status:!0,type:"success",text:s.data.message}})}).catch(s=>{c.value={status:!0,type:"error",text:"Error while removing data"}})},z=s=>{r.value={...r.value,loading:!0},T().then(t=>{r.value={...r.value,dialog:!1,loading:!1}}).catch(t=>{r.value={...r.value,loading:!1}})};return(s,t)=>(p(),y(L,{class:"pb-16"},{default:u(()=>[l(q,{title:"Custom KPI"}),l(H,{class:"my-5"},{default:u(()=>[Q,e("div",W,[l(C,{class:"mb-3 rounded-lg",loading:f.value},{default:u(()=>[l(N,{class:"d-flex align-center"},{default:u(()=>[X]),_:1}),l(O,null,{default:u(()=>[Z,e("tbody",null,[(p(!0),k(E,null,$(v.value,a=>(p(),k("tr",{key:a.id},[e("td",null,g(a.title),1),e("td",null,g(a.type),1),e("td",null,g(a.industry&&a.industry.title),1),e("td",null,g(a.profile&&a.profile.display_name),1),e("td",null,[e("div",ee,[l(D,{size:"small",onClick:()=>P(a),icon:U(Y),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])]),_:1}),v.value&&v.value.length==0?(p(),y(C,{key:0},{default:u(()=>[l(S,{class:"text-center"},{default:u(()=>[j(" No records found ")]),_:1})]),_:1})):V("",!0)]),_:1},8,["loading"]),_.value>1?(p(),y(F,{key:0,modelValue:o.value,"onUpdate:modelValue":t[0]||(t[0]=a=>o.value=a),class:"my-4",length:_.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):V("",!0)])]),_:1}),l(G,{"kpi-options":n.value,onApprove:w},null,8,["kpi-options"]),l(J,{options:r.value,onConfirm:z},null,8,["options"]),l(M,{options:c.value},null,8,["options"])]),_:1}))}};export{ce as default};
========
import{u as I,r as i,z as A,K as N,N as R,c as y,w as u,V as B,o as p,a as l,f as e,g as C,B as L,a2 as O,b as k,n as $,F as E,h as S,C as j,e as V,Q as F,i as H,A as g,X as D,d as Q}from"./app-30c9ca38.js";import{c as x}from"./clientApi-2707673d.js";import{f as U}from"./mdi-7fd0807e.js";import{_ as X}from"./PageHeader-c6a4671c.js";import{_ as q}from"./CustomKpiDialog-48675474.js";import{_ as G}from"./ConfirmDialog-bcc66308.js";import{_ as J}from"./SnackBar-4e630a39.js";import"./industry-b0c5961e.js";const M=e("div",{class:"v-col-12"},[e("div",{class:"text-h6"},"Custom KPI")],-1),W={class:"v-col-12"},Y=e("div",{class:"text-primary text-capitalize"},"KPI List",-1),Z=e("thead",null,[e("tr",null,[e("th",{class:"text-left text-capitalize"},"Title"),e("th",{class:"text-left text-capitalize"},"Type"),e("th",{class:"text-left text-capitalize"},"Industry"),e("th",{class:"text-left text-capitalize"},"Author"),e("th",{class:"text-right text-capitalize"},"Actions")])],-1),ee={class:"d-flex align-center justify-end"},ce={__name:"HrCustomKpi",setup(te){const d=I(),c=i({}),K=A(),h=N(),n=i({title:"",dialog:!1,data:{},type:"",action:"",is_review:!1}),v=i([]),f=i(!1),_=i(0),o=i(h.params&&h.params.page?h.params.page:1),m=async s=>{f.value=!0,await x(d.authToken).get("/api/hr/kpi/list/pending/?page="+s).then(t=>{_.value=t.data.last_page,o.value=t.data.current_page,v.value=t.data.data,f.value=!1}).catch(t=>{console.log("getCustomKpi",t.response),f.value=!1})};m(o.value);const P=s=>{n.value={...n.value,title:"Approve KPI ",data:Object.assign({},s),loading:!1,dialog:!0,type:s.type,action:"approve",is_review:!1}},w=async s=>{let t={profile_id:d.authProfile.id,id:s.id};await x(d.authToken).post("/api/hr/custom-kpi/approve",t).then(a=>{m(o.value).then(()=>{c.value={status:!0,type:"success",text:a.data.message},n.value={...n.value,dialog:!1,loading:!1}})}).catch(a=>{c.value={status:!0,type:"error",text:"Error while trying to approve Custom KPI"},n.value={...n.value,loading:!1}})};R(o,(s,t)=>{s!=t&&(K.push({name:"PaginatedHrCustomKpi",params:{page:o.value}}).catch(a=>{}),m(o.value))});const r=i({}),b=i({}),T=async()=>{await x(d.authToken).post("/api/hr/kpi/remove/"+b.value.id).then(s=>{m(o.value).then(()=>{c.value={status:!0,type:"success",text:s.data.message}})}).catch(s=>{c.value={status:!0,type:"error",text:"Error while removing data"}})},z=s=>{r.value={...r.value,loading:!0},T().then(t=>{r.value={...r.value,dialog:!1,loading:!1}}).catch(t=>{r.value={...r.value,loading:!1}})};return(s,t)=>(p(),y(B,{class:"pb-16"},{default:u(()=>[l(X,{title:"Custom KPI"}),l(H,{class:"my-5"},{default:u(()=>[M,e("div",W,[l(C,{class:"mb-3 rounded-lg",loading:f.value},{default:u(()=>[l(L,{class:"d-flex align-center"},{default:u(()=>[Y]),_:1}),l(O,null,{default:u(()=>[Z,e("tbody",null,[(p(!0),k(E,null,$(v.value,a=>(p(),k("tr",{key:a.id},[e("td",null,g(a.title),1),e("td",null,g(a.type),1),e("td",null,g(a.industry&&a.industry.title),1),e("td",null,g(a.profile&&a.profile.display_name),1),e("td",null,[e("div",ee,[l(D,{size:"small",onClick:()=>P(a),icon:Q(U),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])]),_:1}),v.value&&v.value.length==0?(p(),y(C,{key:0},{default:u(()=>[l(S,{class:"text-center"},{default:u(()=>[j(" No records found ")]),_:1})]),_:1})):V("",!0)]),_:1},8,["loading"]),_.value>1?(p(),y(F,{key:0,modelValue:o.value,"onUpdate:modelValue":t[0]||(t[0]=a=>o.value=a),class:"my-4",length:_.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):V("",!0)])]),_:1}),l(q,{"kpi-options":n.value,onApprove:w},null,8,["kpi-options"]),l(G,{options:r.value,onConfirm:z},null,8,["options"]),l(J,{options:c.value},null,8,["options"])]),_:1}))}};export{ce as default};
>>>>>>>> phase-1:public/build/assets/HrCustomKpi-2a7a01b2.js
