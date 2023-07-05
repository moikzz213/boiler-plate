import{u as oe,k as ne,z as ie,K as ce,r as c,L as ue,N as re,c as p,w as a,V as de,o as r,a as s,f as o,R as K,G as ve,S as M,d as E,T as R,b as V,n as $,F as z,U as I,C as g,H as Y,A as v,e as P,i as A,g as pe,h as me,W as F,X as he}from"./app-fc232221.js";import{c as m}from"./clientApi-9cd075be.js";import{m as fe,a as _e}from"./mdi-6c0c9690.js";import{_ as ge}from"./KpiContent-8c8475fa.js";import{_ as ye}from"./EmployeeCard-6f850de2.js";import{_ as xe}from"./ConfirmDialog-50f75ddc.js";import{_ as ke}from"./SnackBar-1fd8bd8c.js";import{u as we}from"./industry-bfe78a26.js";import"./vue-datepicker-8eea4ac3.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./printInitials-a54a9c4a.js";const Ce={class:"v-col-12 v-col-md-3 pb-0"},be=o("div",{class:"text-caption px-3 text-grey-darken-1 pt-1"}," Enter ecode, name, or email ",-1),Se={key:0,class:"v-col-12 v-col-md-3 text-right pb-0"},Ee=o("div",{class:"text-caption px-3 text-grey-darken-1 pt-1"},"Employee Status",-1),Ve={class:"v-col-12"},Te={class:"v-col-12 v-col-md-3 d-flex align-center"},Re={class:"v-col-12 v-col-md-2 d-flex flex-column"},Ie=o("div",{class:"text-caption text-grey"},"Reporting To",-1),Pe={class:"text-body-2"},Ae={class:"v-col-12 v-col-md-2 d-flex flex-column"},Le=o("div",{class:"text-caption text-grey"},"Business Unit",-1),Be={class:"text-body-2"},Ne={class:"v-col-12 v-col-md-2 d-flex flex-column"},Ue=o("div",{class:"text-caption text-grey"},"KPI's Target Year",-1),Ke={class:"text-body-2"},Me={class:"v-col-12 v-col-md-1 d-flex flex-column"},$e=o("div",{class:"text-caption text-grey"},"Total KPI",-1),ze={class:"text-body-2"},Ye={key:0,class:"v-col-12 v-col-md-2 d-flex align-center"},at={__name:"SingleEmployee",setup(Fe){const y=we(),u=oe(),O=ne(),W=ie(),j=ce(),h=c({}),x=c("Active"),L=c(""),D=c([{title:"Active",color:"success"},{title:"Inactive",color:"error"}]),f=c([]),G=async()=>{y.industries.length==0?y.getIndustries(u.authToken).then(()=>{f.value=y.industries}):f.value=y.industries},B=c([]),H=async()=>{await m(u.authToken).get("/api/fetch/measures/non-paginated").then(e=>{B.value=e.data}).catch(e=>{})},k=c([]),N=c([]),X=async()=>{await m(u.authToken).get("/api/fetch/master-kpi/non-paginate").then(e=>{f.value&&f.value.length>0&&e.data&&e.data.length>0&&f.value.map((l,i)=>{k.value[i]=l,k.value[i].kpis=[];let d=0,U=0;e.data.map((S,Oe)=>{l.id==S.industry_id?(k.value[i].kpis[d]=S,d++):S.type=="ecd"&&(N.value[U]=S,U++)})})})},q=e=>{let l=0;return e.reviews&&e.reviews.length>0&&e.reviews[0].key_review&&e.reviews[0].key_review.map((i,d)=>{l+=i.weightage}),l},t=c({}),T=async()=>{await m(u.authToken).get("/api/hr/employee/ecode/"+j.params.ecode).then(e=>{t.value=e.data,x.value=e.data.status}).catch(e=>{console.log("getEmployee",e)})},J=ue(()=>O.filteredSetting(t.value.company_id));T(),G(),X(),H();const Q=e=>{L.value=e.title,n.value={dialog:!0,title:"Confirm Status Update",text:"Please confirm that you want to update the status of "+t.value.display_name+" into "+e.title+".",btnColor:e.title=="Active"?"success":"error",btnTitle:"Confirm"}},Z=async()=>{let e={ecode:t.value.ecode,status:L.value};n.value={...n.value,loading:!0},await m(u.authToken).post("/api/hr/employee/status/update",e).then(l=>{T().then(()=>{n.value={...n.value,loading:!1,dialog:!1},h.value={status:!0,type:"success",text:l.data.message}})}).catch(l=>{console.log("getEmployee",l),n.value={...n.value,loading:!1},h.value={status:!0,type:"error",text:"Error while updating employee"}})},w=c(""),C=c(!1),b=c([]),ee=async e=>{C.value=!0,await m(u.authToken).get("/api/hr/search/employee?&filter[search]="+e).then(l=>{C.value=!1,b.value=l.data,console.log("results.value",b.value)}).catch(l=>{C.value=!1,console.log("getEmployee",l)})},te=e=>{t.value=e,x.value=e.status,W.push({name:"SingleEmployee",params:{ecode:e.ecode}}).catch(l=>{})};re(w,(e,l)=>{e!=l&&e.length>3&&ee(w.value)});const _=c({data:{},loading:!1}),ae=()=>{n.value={dialog:!0,title:"Confirm Reopen",text:"Please confirm that you want to reopen the KPI for "+u.authProfile.email+".",btnColor:"primary",btnTitle:"Confirm"}},le=async()=>{_.value.data={ecode:t.value.ecode},n.value={...n.value,loading:!0},await m(u.authToken).post("/api/hr/employee/reopen",_.value.data).then(e=>{n.value={...n.value,loading:!1,dialog:!1},_.value.loading=!0,T().then(()=>{_.value.loading=!1,h.value={status:!0,type:"success",text:e.data.message}})}).catch(e=>{n.value={...n.value,loading:!1},h.value={status:!0,type:"error",text:"Error while updating employee"},console.log("getEmployee",e)})},n=c(),se=e=>{n.value.title=="Confirm Status Update"?Z():n.value.title=="Confirm Reopen"&&le()};return(e,l)=>(r(),p(de,{class:"pb-16"},{default:a(()=>[s(A,{class:"mt-5 justify-space-between"},{default:a(()=>[o("div",Ce,[s(K,null,{activator:a(({props:i})=>[s(ve,M(i,{modelValue:w.value,"onUpdate:modelValue":l[0]||(l[0]=d=>w.value=d),loading:C.value,variant:"outlined",density:"compact",class:"bg-white",label:"Search Employee","hide-details":"","append-inner-icon":E(fe)}),null,16,["modelValue","loading","append-inner-icon"])]),default:a(()=>[b.value.length>0?(r(),p(R,{key:0,density:"compact",style:{"max-height":"300px"}},{default:a(()=>[(r(!0),V(z,null,$(b.value,(i,d)=>(r(),p(I,{key:d,onClick:()=>te(i)},{default:a(()=>[s(F,null,{default:a(()=>[g(v(i.display_name+" - "+i.ecode),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})):(r(),p(R,{key:1,density:"compact"},{default:a(()=>[s(I,null,{default:a(()=>[g(" No results found ")]),_:1})]),_:1}))]),_:1}),be]),["hr_admin","app_admin"].includes(E(u).authProfile.role)?(r(),V("div",Se,[o("div",null,[s(K,null,{activator:a(({props:i})=>[s(Y,M(i,{color:`${x.value=="Active"?"success":"error"}`,width:"120"}),{default:a(()=>[g(v(x.value),1)]),_:2},1040,["color"])]),default:a(()=>[s(R,{density:"compact"},{default:a(()=>[(r(!0),V(z,null,$(D.value,(i,d)=>(r(),p(I,{key:d,onClick:()=>Q(i)},{default:a(()=>[s(F,null,{default:a(()=>[s(he,{size:"16",color:i.color,icon:E(_e)},null,8,["color","icon"]),g(" "+v(i.title),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),Ee])):P("",!0)]),_:1}),s(A,null,{default:a(()=>[o("div",Ve,[s(pe,{class:"elevation-0"},{default:a(()=>[s(me,null,{default:a(()=>[s(A,null,{default:a(()=>[o("div",Te,[s(ye,{profile:t.value},null,8,["profile"])]),o("div",Re,[Ie,o("div",Pe,v(t.value.managed_by&&t.value.managed_by.display_name?t.value.managed_by.display_name:""),1)]),o("div",Ae,[Le,o("div",Be,v(t.value&&t.value.company?t.value.company.title:""),1)]),o("div",Ne,[Ue,o("div",Ke,v(J.value.year),1)]),o("div",Me,[$e,o("div",ze,v(q(t.value))+"/100",1)]),["hr_admin","app_admin"].includes(E(u).authProfile.role)?(r(),V("div",Ye,[t.value.reviews&&(t.value.reviews.length>0&&(t.value.reviews[0].status=="closed"||t.value.reviews[0].status=="locked"||t.value.reviews[0].status=="submitted")||t.value.reviews.length==0)?(r(),p(Y,{key:0,loading:_.value.loading,onClick:ae,block:"",size:"large",color:"secondary",class:"text-capitalize rounded-lg"},{default:a(()=>[g("Reopen")]),_:1},8,["loading"])):P("",!0)])):P("",!0)]),_:1})]),_:1})]),_:1})])]),_:1}),s(ge,{"selected-employee":t.value,"measures-list":B.value,"industry-list":k.value,"ecd-list":N.value,onErrorcheck:e.errorCheck,onYearchange:e.selectedYearResponse,"is-manager":!0},null,8,["selected-employee","measures-list","industry-list","ecd-list","onErrorcheck","onYearchange"]),s(xe,{options:n.value,onConfirm:se},null,8,["options"]),s(ke,{options:h.value},null,8,["options"])]),_:1}))}};export{at as default};
