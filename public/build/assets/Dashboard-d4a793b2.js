import{u as y,r as V,c as b,w as o,V as P,o as c,a as t,b as d,d as r,e as u,f as n,g as k,h as w,i as x,j as i,_}from"./app-04a9148d.js";import{_ as E}from"./KpiContent-f97122fa.js";import{c as A}from"./clientApi-199918e8.js";import"./mdi-5e26928d.js";import"./vue-datepicker-2381ce48.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./SnackBar-c7b69ae1.js";const C={key:0,class:"v-col-12"},R={key:1,class:"v-col-12"},g=n("div",{class:"text-h6 mb-3"},"Reports",-1),I={class:"v-col-12"},T=n("div",{class:"text-h6 mb-3"},"My KPI",-1),j={__name:"Dashboard",setup(B){const p=i(()=>_(()=>import("./KpiProgress-3704afa4.js"),["assets/KpiProgress-3704afa4.js","assets/app-04a9148d.js","assets/app-e2679139.css"])),m=i(()=>_(()=>import("./Graph-5b1b4700.js"),["assets/Graph-5b1b4700.js","assets/app-04a9148d.js","assets/app-e2679139.css","assets/clientApi-199918e8.js"])),h=i(()=>_(()=>import("./GraphHrbp-7d1d247d.js"),["assets/GraphHrbp-7d1d247d.js","assets/app-04a9148d.js","assets/app-e2679139.css","assets/clientApi-199918e8.js","assets/company-405cc321.js","assets/vue-datepicker-2381ce48.js","assets/typeof-7fd5df1e.js","assets/defineProperty-fcf2a4a8.js"])),l=y(),e=V(l.authProfile),v=a=>{f(a)},f=async a=>{await A(l.authToken).get("/api/dashboard/my-kpi/"+e.value.id+"/"+a).then(s=>{s.data.result==null?e.value={...e.value,reviews:[]}:e.value={...e.value,reviews:[s.data.result]}}).catch(s=>{location.reload()})};return(a,s)=>(c(),b(P,{class:"pb-16"},{default:o(()=>[t(x,{class:"my-5"},{default:o(()=>[e.value&&(e.value.role=="hr_admin"||e.value.role=="app_admin")?(c(),d("div",C,[t(r(m))])):u("",!0),e.value&&e.value.role=="hrbp"?(c(),d("div",R,[g,t(r(h))])):u("",!0),n("div",I,[T,t(k,{"max-width":"1200"},{default:o(()=>[t(w,null,{default:o(()=>[t(r(p),{"selected-employee":r(l).authProfile},null,8,["selected-employee"])]),_:1})]),_:1})])]),_:1}),t(E,{"selected-employee":e.value,onYearchange:v,"submit-button":!1},null,8,["selected-employee"])]),_:1}))}};export{j as default};
