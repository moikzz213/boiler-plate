import{u as h,r as f,c as v,w as o,V as y,o as c,a,b as V,d as r,e as P,f as d,g as b,h as w,i as k,j as i,_ as n}from"./app-00536877.js";import{_ as x}from"./KpiContent-e65c5103.js";import{c as C}from"./clientApi-b8f92d4f.js";import"./mdi-5e26928d.js";import"./vue-datepicker-1412a14f.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./SnackBar-124f1193.js";const g={key:0,class:"v-col-12"},A={class:"v-col-12"},E=d("div",{class:"text-h6 mb-3"},"My KPI",-1),S={__name:"Dashboard",setup(B){const u=i(()=>n(()=>import("./KpiProgress-d4977032.js"),["assets/KpiProgress-d4977032.js","assets/app-00536877.js","assets/app-e2679139.css"])),_=i(()=>n(()=>import("./Graph-586117c7.js"),["assets/Graph-586117c7.js","assets/app-00536877.js","assets/app-e2679139.css","assets/clientApi-b8f92d4f.js"])),l=h(),e=f(l.authProfile),m=t=>{p(t)},p=async t=>{await C(l.authToken).get("/api/dashboard/my-kpi/"+e.value.id+"/"+t).then(s=>{s.data.result==null?e.value={...e.value,reviews:[]}:e.value={...e.value,reviews:[s.data.result]}}).catch(s=>{})};return(t,s)=>(c(),v(y,{class:"pb-16"},{default:o(()=>[a(k,{class:"my-5"},{default:o(()=>[e.value&&(e.value.role=="hr_admin"||e.value.role=="app_admin")?(c(),V("div",g,[a(r(_))])):P("",!0),d("div",A,[E,a(b,{"max-width":"1200"},{default:o(()=>[a(w,null,{default:o(()=>[a(r(u),{"selected-employee":r(l).authProfile},null,8,["selected-employee"])]),_:1})]),_:1})])]),_:1}),a(x,{"selected-employee":e.value,onYearchange:m,"submit-button":!1},null,8,["selected-employee"])]),_:1}))}};export{S as default};