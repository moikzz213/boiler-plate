import{u as h,r as v,c as f,w as o,V as y,o as c,a,b as V,d as r,e as P,f as u,g as b,h as w,i as g,j as i,_ as n}from"./app-d616b10d.js";import{_ as k}from"./KpiContent-6f549165.js";import{c as x}from"./clientApi-3454300a.js";import"./mdi-7fd0807e.js";import"./vue-datepicker-1a9ffac4.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./SnackBar-34ee491c.js";const C={key:0,class:"v-col-12"},A={class:"v-col-12"},E=u("div",{class:"text-h6 mb-3"},"My KPI",-1),S={__name:"Dashboard",setup(B){const d=i(()=>n(()=>import("./KpiProgress-5c1d00bd.js"),["assets/KpiProgress-5c1d00bd.js","assets/app-d616b10d.js","assets/app-943833fe.css"])),_=i(()=>n(()=>import("./Graph-ab24b971.js"),["assets/Graph-ab24b971.js","assets/app-d616b10d.js","assets/app-943833fe.css","assets/clientApi-3454300a.js"])),l=h(),e=v(l.authProfile);console.log(e.value);const m=t=>{p(t)},p=async t=>{await x(l.authToken).get("/api/dashboard/my-kpi/"+e.value.id+"/"+t).then(s=>{s.data.result==null?e.value={...e.value,reviews:[]}:e.value={...e.value,reviews:[s.data.result]}}).catch(s=>{})};return(t,s)=>(c(),f(y,{class:"pb-16"},{default:o(()=>[a(g,{class:"my-5"},{default:o(()=>[e.value&&(e.value.role=="hr_admin"||e.value.role=="app_admin")?(c(),V("div",C,[a(r(_))])):P("",!0),u("div",A,[E,a(b,{"max-width":"1200"},{default:o(()=>[a(w,null,{default:o(()=>[a(r(d),{"selected-employee":r(l).authProfile},null,8,["selected-employee"])]),_:1})]),_:1})])]),_:1}),a(k,{"selected-employee":e.value,onYearchange:m,"submit-button":!1},null,8,["selected-employee"])]),_:1}))}};export{S as default};