import{u as ce,k as ue,z as re,K as de,r as c,L as ve,N as pe,c as v,w as l,V as me,o as r,a as s,f as o,R as $,G as he,S as F,d as E,T as I,b as T,n as Y,F as W,U as A,C as h,H as R,A as p,e as K,i as L,g as fe,h as ge,W as D,X as _e}from"./app-cea6a6af.js";import{c as m}from"./clientApi-3e8f6d97.js";import{m as ye,a as xe}from"./mdi-7fd0807e.js";import{_ as ke}from"./KpiContent-5a529676.js";import{_ as we}from"./EmployeeCard-59ab5871.js";import{_ as be}from"./ConfirmDialog-f54b6071.js";import{_ as Ce}from"./SnackBar-fe012f79.js";import{u as Se}from"./industry-dc1a95b2.js";import"./vue-datepicker-03a1eaa8.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./printInitials-a54a9c4a.js";const Ee={class:"v-col-12 v-col-md-3 pb-0"},Te=o("div",{class:"text-caption px-3 text-grey-darken-1 pt-1"}," Enter ecode, name, or email ",-1),Ve={key:0,class:"v-col-12 v-col-md-3 text-right pb-0"},Pe=o("div",{class:"text-caption px-3 text-grey-darken-1 pt-1"},"Employee Status",-1),Ie={class:"v-col-12"},Ae={class:"v-col-12 v-col-md-3 d-flex align-center"},Re={class:"v-col-12 v-col-md-2 d-flex flex-column"},Ke=o("div",{class:"text-caption text-grey"},"Reporting To",-1),Le={class:"text-body-2"},ze={class:"v-col-12 v-col-md-2 d-flex flex-column"},Be=o("div",{class:"text-caption text-grey"},"Business Unit",-1),Ne={class:"text-body-2"},Oe={class:"v-col-12 v-col-md-2 d-flex flex-column"},Ue=o("div",{class:"text-caption text-grey"},"KPI's Target Year",-1),Me={class:"text-body-2"},$e={class:"v-col-12 v-col-md-1 d-flex flex-column"},Fe=o("div",{class:"text-caption text-grey"},"Total KPI",-1),Ye={class:"text-body-2"},We={key:0,class:"v-col-12 v-col-md-2 d-flex align-center"},ot={__name:"SingleEmployee",setup(De){const _=Se(),u=ce(),j=ue(),G=re(),H=de(),f=c({}),y=c("Active"),z=c(""),X=c([{title:"Active",color:"success"},{title:"Inactive",color:"error"}]),g=c([]),q=async()=>{_.industries.length==0?_.getIndustries(u.authToken).then(()=>{g.value=_.industries}):g.value=_.industries},B=c([]),J=async()=>{await m(u.authToken).get("/api/fetch/measures/non-paginated").then(e=>{B.value=e.data}).catch(e=>{})},x=c([]),N=c([]),O=c(new Date().getFullYear()),Q=e=>{O.value=e,Z(e)},Z=async e=>{await m(u.authToken).get("/api/dashboard/my-kpi/"+t.value.id+"/"+e).then(a=>{a.data.result==null?t.value={...t.value,reviews:[]}:t.value={...t.value,reviews:[a.data.result]}}).catch(a=>{})},ee=async()=>{await m(u.authToken).get("/api/fetch/master-kpi/non-paginate").then(e=>{g.value&&g.value.length>0&&e.data&&e.data.length>0&&g.value.map((a,i)=>{x.value[i]=a,x.value[i].kpis=[];let d=0,M=0;e.data.map((S,je)=>{a.id==S.industry_id?(x.value[i].kpis[d]=S,d++):S.type=="ecd"&&(N.value[M]=S,M++)})})})},te=e=>{let a=0;return e.reviews&&e.reviews.length>0&&e.reviews[0].key_review&&e.reviews[0].key_review.map((i,d)=>{a+=i.weightage}),a},t=c({}),V=async()=>{await m(u.authToken).get("/api/hr/employee/ecode/"+H.params.ecode).then(e=>{t.value=e.data,y.value=e.data.status}).catch(e=>{console.log("getEmployee",e)})},P=ve(()=>j.filteredSetting(t.value.company_id));V(),q(),ee(),J();const ae=e=>{z.value=e.title,n.value={dialog:!0,title:"Confirm Status Update",text:"Please confirm that you want to update the status of "+t.value.display_name+" into "+e.title+".",btnColor:e.title=="Active"?"success":"error",btnTitle:"Confirm"}},le=async()=>{let e={profile_id:u.authProfile.id,ecode:t.value.ecode,status:z.value};n.value={...n.value,loading:!0},await m(u.authToken).post("/api/hr/employee/status/update",e).then(a=>{V().then(()=>{n.value={...n.value,loading:!1,dialog:!1},f.value={status:!0,type:"success",text:a.data.message}})}).catch(a=>{console.log("getEmployee",a),n.value={...n.value,loading:!1},f.value={status:!0,type:"error",text:"Error while updating employee"}})},k=c(""),w=c(!1),b=c([]),se=async e=>{w.value=!0,await m(u.authToken).get("/api/hr/search/employee?&filter[search]="+e).then(a=>{w.value=!1,b.value=a.data,console.log("results.value",b.value)}).catch(a=>{w.value=!1,console.log("getEmployee",a)})},oe=e=>{t.value=e,y.value=e.status,G.push({name:"SingleEmployee",params:{ecode:e.ecode}}).catch(a=>{})};pe(k,(e,a)=>{e!=a&&e.length>3&&se(k.value)});const C=c({data:{},loading:!1}),U=()=>{n.value={dialog:!0,title:"Confirm to Open KPI",text:"Please confirm that you want to open the KPI for "+u.authProfile.email+".",btnColor:"secondary",btnTitle:"Confirm"}},ne=async()=>{n.value={...n.value,loading:!0};let e={profile_id:u.authProfile.id,ecode:t.value.ecode,year:O.value};await m(u.authToken).post("/api/hr/employee/reopen",e).then(a=>{n.value={...n.value,loading:!1,dialog:!1},C.value.loading=!0,V().then(()=>{C.value.loading=!1,f.value={status:!0,type:"success",text:a.data.message}})}).catch(a=>{n.value={...n.value,loading:!1},f.value={status:!0,type:"error",text:"Error while updating employee"},console.log("getEmployee",a)})},n=c(),ie=e=>{n.value.title=="Confirm Status Update"?le():n.value.title=="Confirm to Open KPI"&&ne()};return(e,a)=>(r(),v(me,{class:"pb-16"},{default:l(()=>[s(L,{class:"mt-5 justify-space-between"},{default:l(()=>[o("div",Ee,[s($,null,{activator:l(({props:i})=>[s(he,F(i,{modelValue:k.value,"onUpdate:modelValue":a[0]||(a[0]=d=>k.value=d),loading:w.value,variant:"outlined",density:"compact",class:"bg-white",label:"Search Employee","hide-details":"","append-inner-icon":E(ye)}),null,16,["modelValue","loading","append-inner-icon"])]),default:l(()=>[b.value.length>0?(r(),v(I,{key:0,density:"compact",style:{"max-height":"300px"}},{default:l(()=>[(r(!0),T(W,null,Y(b.value,(i,d)=>(r(),v(A,{key:d,onClick:()=>oe(i)},{default:l(()=>[s(D,null,{default:l(()=>[h(p(i.display_name+" - "+i.ecode),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})):(r(),v(I,{key:1,density:"compact"},{default:l(()=>[s(A,null,{default:l(()=>[h(" No results found ")]),_:1})]),_:1}))]),_:1}),Te]),["hr_admin","app_admin"].includes(E(u).authProfile.role)?(r(),T("div",Ve,[o("div",null,[s($,null,{activator:l(({props:i})=>[s(R,F(i,{color:`${y.value=="Active"?"success":"error"}`,width:"120"}),{default:l(()=>[h(p(y.value),1)]),_:2},1040,["color"])]),default:l(()=>[s(I,{density:"compact"},{default:l(()=>[(r(!0),T(W,null,Y(X.value,(i,d)=>(r(),v(A,{key:d,onClick:()=>ae(i)},{default:l(()=>[s(D,null,{default:l(()=>[s(_e,{size:"16",color:i.color,icon:E(xe)},null,8,["color","icon"]),h(" "+p(i.title),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),Pe])):K("",!0)]),_:1}),s(L,null,{default:l(()=>[o("div",Ie,[s(fe,{class:"elevation-0"},{default:l(()=>[s(ge,null,{default:l(()=>[s(L,null,{default:l(()=>[o("div",Ae,[s(we,{profile:t.value},null,8,["profile"])]),o("div",Re,[Ke,o("div",Le,p(t.value.managed_by&&t.value.managed_by.display_name?t.value.managed_by.display_name:""),1)]),o("div",ze,[Be,o("div",Ne,p(t.value&&t.value.company?t.value.company.title:""),1)]),o("div",Oe,[Ue,o("div",Me,p(P.value.year),1)]),o("div",$e,[Fe,o("div",Ye,p(te(t.value))+"/100",1)]),["hr_admin","app_admin"].includes(E(u).authProfile.role)?(r(),T("div",We,[t.value.status=="Active"&&t.value.reviews&&(t.value.reviews.length>0&&(t.value.reviews[0].status=="closed"||t.value.reviews[0].status=="locked"||t.value.reviews[0].status=="submitted")||t.value.reviews.length==0&&(P.value.status=="closed"||P.value.status=="locked"))?(r(),v(R,{key:0,loading:C.value.loading,onClick:U,block:"",size:"large",color:"secondary",class:"text-capitalize rounded-lg"},{default:l(()=>[h("Reopen")]),_:1},8,["loading"])):t.value.status=="Active"&&t.value.reviews.length==0&&t.value.is_regular==0?(r(),v(R,{key:1,loading:C.value.loading,onClick:U,block:"",size:"large",color:"secondary",class:"text-capitalize rounded-lg"},{default:l(()=>[h("Open")]),_:1},8,["loading"])):K("",!0)])):K("",!0)]),_:1})]),_:1})]),_:1})])]),_:1}),s(ke,{"selected-employee":t.value,"measures-list":B.value,"industry-list":x.value,"ecd-list":N.value,onErrorcheck:e.errorCheck,onYearchange:Q,"is-manager":!0},null,8,["selected-employee","measures-list","industry-list","ecd-list","onErrorcheck"]),s(be,{options:n.value,onConfirm:ie},null,8,["options"]),s(Ce,{options:f.value},null,8,["options"])]),_:1}))}};export{ot as default};