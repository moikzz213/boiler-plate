import{u as R,z as L,K as M,r as c,N as U,c as V,w as o,V as D,o as u,a as l,f as a,M as E,d as v,O as Y,P as j,A as x,H as b,C as S,g as w,B as H,X as z,a2 as I,b as C,F as K,n as O,e as P,h as Q,Q as X,i as $}from"./app-a9279d98.js";import{c as q,e as G}from"./mdi-a0a77bee.js";import{c as J}from"./clientApi-206fdc8a.js";import{u as W}from"./company-38552c8d.js";import{e as Z}from"./vue-datepicker-087ecd39.js";import{_ as ee}from"./PageHeader-0974e296.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";const ae={class:"v-col-12 v-col-md-4"},te={class:"v-col-12 v-col-md-3"},le={class:"v-col-12 v-col-md-2"},se={class:"v-col-12"},oe=a("div",{class:"text-primary text-capitalize"},"PMS Settings",-1),ne=a("thead",null,[a("tr",null,[a("th",{class:"text-left text-capitalize"},"Company"),a("th",{class:"text-left text-capitalize"},"Year"),a("th",{class:"text-right text-capitalize"},"Actions")])],-1),ie={key:0},ce={class:"d-flex align-center justify-end"},he={__name:"Pms",setup(re){const k=R(),g=L(),f=M(),s=c({loading:!1,company_id:null,year:new Date().getFullYear()}),d=c(!1),r=c([]),_=c(0),N=c(0),i=c(f.params&&f.params.page?f.params.page:1),h=async n=>{d.value=!0;let t="/api/hr/pms-settings/pms?filter[company]="+s.value.company_id+"&filter[year]="+s.value.year;t+="&page="+n,await J(k.authToken).get(t).then(e=>{_.value=e.data.last_page,i.value=e.data.current_page,N.value=e.data.total,r.value=e.data.data,d.value=!1}).catch(e=>{d.value=!1,console.log("getEmployees",e)})};U(i,(n,t)=>{n!=t&&(g.push({name:"PaginatedPms",params:{page:i.value}}).catch(e=>{}),h(i.value))}),h(i.value);const B=()=>{g.push({name:"NewPms"}).catch(n=>{})},F=n=>{g.push({name:"SinglePms",params:{id:n}}).catch(t=>{})},T=()=>{s.value.loading=!0,h(1).then(()=>{s.value.loading=!1}).catch(n=>{s.value.loading=!1})},y=W(),m=c(!1),A=()=>{y.companies.length==0&&(m.value=!0,y.getCompanies(k.authToken).then(()=>{m.value=!1}))};return(n,t)=>(u(),V(D,{class:"pb-16"},{default:o(()=>[l(ee,{title:"PMS Settings"}),l($,{class:"my-5"},{default:o(()=>[a("div",ae,[l(E,{modelValue:s.value.company_id,"onUpdate:modelValue":t[0]||(t[0]=e=>s.value.company_id=e),items:v(y).active_companies,"item-title":"title","item-value":"id",variant:"outlined",density:"compact",class:"bg-white",clearable:"","hide-details":"",label:m.value?"Loading...":"Select Company",loading:m.value,onFocus:A},{selection:o(({props:e,item:p})=>[a("span",Y(j(e)),x(p.raw.title&&p.raw.title.length>30?p.raw.title.substring(0,30)+"...":p.raw.title),17)]),_:1},8,["modelValue","items","label","loading"])]),a("div",te,[l(v(Z),{modelValue:s.value.year,"onUpdate:modelValue":t[1]||(t[1]=e=>s.value.year=e),"year-picker":"",class:"pms-date-picker"},null,8,["modelValue"])]),a("div",le,[l(b,{block:"",loading:s.value.loading,onClick:T,height:"40px",color:"primary",class:"text-capitalize"},{default:o(()=>[S("Filter")]),_:1},8,["loading"])]),a("div",se,[l(w,{class:"mb-3 rounded-lg",loading:d.value},{default:o(()=>[l(H,{class:"d-flex align-center py-3"},{default:o(()=>[l(b,{onClick:B,size:"35",class:"rounded-xl elevation-2 mr-2"},{default:o(()=>[l(z,{size:"small",icon:v(q)},null,8,["icon"])]),_:1}),oe]),_:1}),l(I,null,{default:o(()=>[ne,r.value&&r.value.length>0?(u(),C("tbody",ie,[(u(!0),C(K,null,O(r.value,e=>(u(),C("tr",{key:e.id},[a("td",null,x(e.company.title),1),a("td",null,x(e.year),1),a("td",null,[a("div",ce,[l(z,{size:"small",onClick:()=>F(e.id),icon:v(G),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])):P("",!0)]),_:1}),r.value&&r.value.length==0?(u(),V(w,{key:0,class:"elevation-0"},{default:o(()=>[l(Q,{class:"text-center"},{default:o(()=>[S(" No records found ")]),_:1})]),_:1})):P("",!0)]),_:1},8,["loading"]),_.value>1?(u(),V(X,{key:0,modelValue:i.value,"onUpdate:modelValue":t[2]||(t[2]=e=>i.value=e),class:"my-4",length:_.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):P("",!0)])]),_:1})]),_:1}))}};export{he as default};
