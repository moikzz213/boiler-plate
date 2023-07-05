import{k as P,z as U,K as R,r as _,u as D,N as E,o as A,b as C,a as o,w as n,f as a,M as F,d as y,O as T,P as N,A as B,i as m,$ as g,G as i,C as M,H as z}from"./app-a9279d98.js";import{c as w}from"./clientApi-206fdc8a.js";import{u as K}from"./company-38552c8d.js";import{e as O}from"./vue-datepicker-087ecd39.js";import{_ as j}from"./SnackBar-3ffb6197.js";const I={class:"v-col-12 v-col-md-6"},$={class:"v-col-12 v-col-md-6"},G={class:"v-col-12 d-flex align-center"},H=a("div",{class:"mr-3 text-subtitle-1",style:{"min-width":"150px"}},"Regular Employee",-1),L={class:"v-col-12 py-0"},Y=a("div",{class:"v-col-12 pt-0"},[a("div",{class:"text-caption"},"Annual KPI Setting")],-1),q={class:"v-col-12 v-col-md-6 py-0"},J={class:"v-col-12 v-col-md-6 py-0"},Q=a("div",{class:"v-col-12 pt-0"},[a("div",{class:"text-caption"},"Mid-year Review")],-1),W={class:"v-col-12 v-col-md-6 py-0"},X={class:"v-col-12 v-col-md-6 py-0"},Z=a("div",{class:"v-col-12 pt-0"},[a("div",{class:"text-caption"},"End-year Review")],-1),ee={class:"v-col-12 v-col-md-6 py-0"},ae={class:"v-col-12 v-col-md-6 py-0"},te={class:"v-col-12 d-flex align-center"},le=a("div",{class:"mr-3 text-subtitle-1",style:{"min-width":"150px"}}," Probation Employee ",-1),oe={class:"v-col-12 py-0"},se=a("div",{class:"v-col-12 pt-0"},[a("div",{class:"text-caption"},"First Review")],-1),ie={class:"v-col-12 v-col-md-6 py-0"},de={class:"v-col-12 v-col-md-6 py-0"},ne=a("div",{class:"v-col-12 pt-0"},[a("div",{class:"text-caption"},"Final Review")],-1),re={class:"v-col-12 v-col-md-6 py-0"},ue={class:"v-col-12 v-col-md-6 py-0"},ve={class:"d-flex justify-end mt-5"},ge={__name:"PmsForm",props:{pms:{type:Object,default:{}}},setup(b){const f=b,V=P(),h=U(),x=R(),v=_({}),d=D(),e=_({title:"Add PMS Setting",dialog:!0,data:{year:new Date().getFullYear(),company_id:null,employee_review_allowed_days:"",probation_final_review_end:"",probation_final_review_start:"",probation_first_review_end:"",probation_first_review_start:"",probation_kpi_setting:"",annual_kpi_setting_start:"",annual_kpi_setting_end:"",mid_year_review_start:"",mid_year_review_end:"",end_year_review_start:"",end_year_review_end:""},loading:!1});E(()=>f.pms,s=>{c(),e.value={...e.value,data:s}});const S=async()=>{e.value.loading=!0,await w(d.authToken).get("/hr/employees/paginated").then(s=>{e.value.loading=!1}).catch(s=>{e.value.loading=!1,console.log("getEmployees",s)})},k=async()=>{e.value.loading=!0,e.value.data.profile_ecode=d.authProfile.ecode,e.value.data.profile_id=d.authProfile.id,await w(d.authToken).post("/api/hr/pms-settings/save",e.value.data).then(s=>{e.value.loading=!1,v.value={status:!0,type:"success",text:s.data.message},V.setPmsSettings(s.data.result),s.data.profile&&s.data.profile.length>0&&d.setProfile(s.data.profile),setTimeout(()=>{x.name=="NewPms"&&h.push({name:"Pms"}).catch(t=>{})},1e3)}).catch(s=>{e.value.loading=!1,s.response.status==422&&(v.value={status:!0,type:"error",text:s.response.data.message}),console.log("err",s)})};S();const p=K(),r=_(!1),c=()=>{p.companies.length==0&&(r.value=!0,p.getCompanies(d.authToken).then(()=>{r.value=!1}))};return(s,t)=>(A(),C("div",null,[o(m,null,{default:n(()=>[a("div",I,[o(F,{modelValue:e.value.data.company_id,"onUpdate:modelValue":t[0]||(t[0]=l=>e.value.data.company_id=l),items:y(p).active_companies,"item-title":"title","item-value":"id",variant:"outlined",density:"compact",class:"bg-white",label:r.value?"Loading...":"Select Company","hide-details":"",loading:r.value,onFocus:c},{selection:n(({props:l,item:u})=>[a("span",T(N(l)),B(u.raw.title&&u.raw.title.length>30?u.raw.title.substring(0,30)+"...":u.raw.title)+" ",17)]),_:1},8,["modelValue","items","label","loading"])]),a("div",$,[o(y(O),{modelValue:e.value.data.year,"onUpdate:modelValue":t[1]||(t[1]=l=>e.value.data.year=l),"year-picker":"",class:"pms-date-picker"},null,8,["modelValue"])])]),_:1}),o(m,{class:"mt-6"},{default:n(()=>[a("div",G,[H,o(g)]),a("div",L,[o(i,{modelValue:e.value.data.employee_review_allowed_days,"onUpdate:modelValue":t[2]||(t[2]=l=>e.value.data.employee_review_allowed_days=l),variant:"outlined",density:"compact",class:"bg-white",label:"Employee Review Allowed (days)",type:"number"},null,8,["modelValue"])]),Y,a("div",q,[o(i,{type:"date",label:"Start Date",modelValue:e.value.data.annual_kpi_setting_start,"onUpdate:modelValue":t[3]||(t[3]=l=>e.value.data.annual_kpi_setting_start=l),variant:"outlined",density:"compact",class:"bg-white"},null,8,["modelValue"])]),a("div",J,[o(i,{type:"date",label:"End Date",modelValue:e.value.data.annual_kpi_setting_end,"onUpdate:modelValue":t[4]||(t[4]=l=>e.value.data.annual_kpi_setting_end=l),variant:"outlined",density:"compact",class:"bg-white"},null,8,["modelValue"])]),Q,a("div",W,[o(i,{type:"date",label:"Start Date",modelValue:e.value.data.mid_year_review_start,"onUpdate:modelValue":t[5]||(t[5]=l=>e.value.data.mid_year_review_start=l),variant:"outlined",density:"compact",class:"bg-white"},null,8,["modelValue"])]),a("div",X,[o(i,{type:"date",label:"End Date",modelValue:e.value.data.mid_year_review_end,"onUpdate:modelValue":t[6]||(t[6]=l=>e.value.data.mid_year_review_end=l),variant:"outlined",density:"compact",class:"bg-white"},null,8,["modelValue"])]),Z,a("div",ee,[o(i,{type:"date",label:"Start Date",modelValue:e.value.data.end_year_review_start,"onUpdate:modelValue":t[7]||(t[7]=l=>e.value.data.end_year_review_start=l),variant:"outlined",density:"compact",class:"bg-white"},null,8,["modelValue"])]),a("div",ae,[o(i,{type:"date",label:"End Date",modelValue:e.value.data.end_year_review_end,"onUpdate:modelValue":t[8]||(t[8]=l=>e.value.data.end_year_review_end=l),variant:"outlined",density:"compact",class:"bg-white"},null,8,["modelValue"])])]),_:1}),o(m,{class:"mt-6"},{default:n(()=>[a("div",te,[le,o(g)]),a("div",oe,[o(i,{modelValue:e.value.data.probation_kpi_setting,"onUpdate:modelValue":t[9]||(t[9]=l=>e.value.data.probation_kpi_setting=l),variant:"outlined",density:"compact",class:"bg-white",label:"Probation KPI Setting Max Allowed (days)",type:"number"},null,8,["modelValue"])]),se,a("div",ie,[o(i,{modelValue:e.value.data.probation_first_review_start,"onUpdate:modelValue":t[10]||(t[10]=l=>e.value.data.probation_first_review_start=l),variant:"outlined",density:"compact",class:"bg-white",label:"From (in days)",type:"number"},null,8,["modelValue"])]),a("div",de,[o(i,{modelValue:e.value.data.probation_first_review_end,"onUpdate:modelValue":t[11]||(t[11]=l=>e.value.data.probation_first_review_end=l),variant:"outlined",density:"compact",class:"bg-white",label:"Up to (in days)",type:"number"},null,8,["modelValue"])]),ne,a("div",re,[o(i,{modelValue:e.value.data.probation_final_review_start,"onUpdate:modelValue":t[12]||(t[12]=l=>e.value.data.probation_final_review_start=l),variant:"outlined",density:"compact",class:"bg-white",label:"From (in days)",type:"number"},null,8,["modelValue"])]),a("div",ue,[o(i,{modelValue:e.value.data.probation_final_review_end,"onUpdate:modelValue":t[13]||(t[13]=l=>e.value.data.probation_final_review_end=l),variant:"outlined",density:"compact",class:"bg-white",label:"Up to (in days)",type:"number"},null,8,["modelValue"])])]),_:1}),a("div",ve,[o(z,{size:"x-large",color:"primary",loading:e.value.loading,class:"px-10",onClick:k},{default:n(()=>[M("save")]),_:1},8,["loading"])]),o(j,{options:v.value},null,8,["options"])]))}};export{ge as _};
