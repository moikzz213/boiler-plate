import{z as U,r as i,u as $,k as z,c as K,w as s,V as G,o as p,a as l,f as o,A as y,G as H,E as Y,I as J,H as h,C as c,i as P,b as w,F as W,n as q,g as k,h as V,J as M,d as E,e as Q}from"./app-fc232221.js";import X from"./KpiProgress-4de7668f.js";import{_ as Z}from"./EmployeeCard-6f850de2.js";import{c as b}from"./clientApi-9cd075be.js";import{_ as ee}from"./SnackBar-1fd8bd8c.js";import"./printInitials-a54a9c4a.js";import"./mdi-6c0c9690.js";const te={class:"v-col-12 pb-0"},ae={class:"text-h6"},le={class:"v-col-12 v-col-md-3"},se={class:"v-col-12 v-col-md-3"},oe={class:"v-col-12 v-col-md-2"},ie=o("div",{class:"v-col-12 v-col-md-2 ml-auto d-flex align-center justify-end"},[o("div",{class:"text-h6"},"Year: 2023")],-1),ne={key:0,class:"v-col-12"},re={class:"v-col-12 v-col-md-3"},ue={class:"v-col-12 v-col-md-8"},de={class:"v-col-12 v-col-md-1 d-flex justify-end align-center"},ce={key:0},ve=o("div",{class:"text-caption text-grey"}," Total KPI ",-1),me={key:1,class:"v-col-12"},pe={class:"pa-3 mt-3 d-flex justify-end"},fe={class:"pa-3 mt-3 d-flex justify-end"},Ce={__name:"Teams",setup(_e){const j=U(),I=(e,a=null)=>{let t=a?Object.assign({},a):!1;j.push({name:e,params:t}).catch(_=>{})},T=i({}),r=$(),f=z(),u=i([]),F=i(new Date().getFullYear()),B=i(new Date),L=i(["All","Regular","Probation"]),g=i("Employee doesn`t have a KPI review setup for this year."),n=i({data:{employee:"",employee_type:"All"}}),O=e=>{let a=0;return e.reviews&&e.reviews.length>0&&e.reviews[0].key_review&&e.reviews[0].key_review.map((t,_)=>{a+=t.weightage}),a},x=i(!1),v=i({}),m=i(!1),d=i(!1),A=()=>{n.value.data.employee="",u.value=S.value},N=()=>{x.value=!0,T.value={status:!0,type:"info",text:"Initializing KPI. Please wait..."},b(r.authToken).post("/api/create/employee-review/year",{ecode:v.value.ecode,is_regular:v.value.is_regular,setting:f.filteredSetting(v.value.company_id),year:F.value,author:r.authProfile.display_name+" "+r.authProfile.ecode}).then(e=>{setTimeout(()=>{T.value={status:!0,type:"success",text:e.data.message}},800)}),b(r.authToken).get("/api/fetch/auth-profile/kpi/"+r.authProfile.ecode).then(e=>{r.setProfile(e.data.result).then(()=>{setTimeout(()=>{x.value=!1,I("SingleTeamMember",{id:v.value.ecode})},3e3)})}).catch(e=>{})},C=i(""),R=e=>{let a="KPI review is currently closed",t=f.filteredSetting(e.company_id);if(C.value="Do you want to set KPI for ",v.value=Object.assign({},e),e.status=="Inactive")g.value="Employee is currently Inactive, kindly contact your HRBP if this is a mistake.",d.value=!0;else if(e.reviews&&e.reviews.length>0)e.is_regular==1&&e.reviews[0].status=="locked"&&e.reviews[0].state=="closed"?(g.value=a,d.value=!0):e.reviews[0].status=="open"?(m.value=!0,t.state!="setting"&&(C.value="Do you want to initialize the review for ")):I("SingleTeamMember",{id:e.ecode});else if(t.status=="open"&&t.state=="setting")m.value=!0;else if(e.is_regular==0){let _=new Date(e.doj);_.setDate(_.getDate()+parseInt(t.probation_kpi_setting)),_>=B.value?m.value=!0:d.value=!0}else t.status=="locked"&&t.state=="closed"&&(g.value=a),d.value=!0},D=()=>{let e=S.value.filter(function(a){return n.value.data.employee?a.display_name.toLowerCase().includes(n.value.data.employee.toLowerCase())?a:a.ecode==n.value.data.employee:n.value.data.employee_type=="Probation"?a.is_regular==0:n.value.data.employee_type=="Regular"?a.is_regular==1:a});u.value=e},S=i([]);return(()=>{b(r.authToken).get("/api/fetch/team-members/"+r.authProfile.ecode).then(e=>{u.value=e.data,S.value=e.data}).catch(e=>{})})(),(async()=>{await b(r.authToken).get("/api/pms-settings/all").then(e=>{f.setPmsSettings(e.data)})})(),(e,a)=>(p(),K(G,{class:"pb-16"},{default:s(()=>[l(P,{class:"mt-5"},{default:s(()=>[o("div",te,[o("div",ae," My Team "+y("("+u.value.length+")"),1)]),o("div",le,[l(H,{modelValue:n.value.data.employee,"onUpdate:modelValue":a[0]||(a[0]=t=>n.value.data.employee=t),variant:"outlined",density:"compact",class:"bg-white","hide-details":"",clearable:"",label:"Input Employee Code",onKeydown:Y(D,["enter"]),"onClick:clear":A},null,8,["modelValue","onKeydown"])]),o("div",se,[l(J,{modelValue:n.value.data.employee_type,"onUpdate:modelValue":a[1]||(a[1]=t=>n.value.data.employee_type=t),items:L.value,variant:"outlined",density:"compact",class:"bg-white","hide-details":"",label:"Select Employee Type"},null,8,["modelValue","items"])]),o("div",oe,[l(h,{onClick:D,block:"",color:"primary",class:"text-capitalize"},{default:s(()=>[c("Filter")]),_:1})]),ie]),_:1}),l(P,null,{default:s(()=>[u.value&&u.value.length>0?(p(),w("div",ne,[(p(!0),w(W,null,q(u.value,t=>(p(),K(k,{key:t.id,class:"mb-3 elevation-0",onClick:()=>R(t)},{default:s(()=>[l(V,null,{default:s(()=>[l(P,null,{default:s(()=>[o("div",re,[l(Z,{profile:t},null,8,["profile"])]),o("div",ue,[l(X,{density:"compact","selected-employee":t},null,8,["selected-employee"])]),o("div",de,[E(f).pmsSettings&&E(f).pmsSettings.state!="yearend"||t.reviews&&t.reviews.length>0&&t.reviews[0].type=="probation"&&t.reviews[0].state!="final_review"?(p(),w("div",ce,[o("div",null,y(O(t))+" / 100 ",1),ve])):Q("",!0)])]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"]))),128))])):(p(),w("div",me,[l(k,null,{default:s(()=>[l(V,{class:"text-center"},{default:s(()=>[c(" No records found ")]),_:1})]),_:1})]))]),_:1}),l(M,{modelValue:m.value,"onUpdate:modelValue":a[3]||(a[3]=t=>m.value=t),width:"450"},{default:s(()=>[l(k,{class:"rounded-lg"},{default:s(()=>[l(V,null,{default:s(()=>[c(y(C.value)+" "+y(v.value.first_name)+"? ",1)]),_:1}),o("div",pe,[l(h,{color:"primary",variant:"text",onClick:a[2]||(a[2]=t=>m.value=!1)},{default:s(()=>[c("Cancel")]),_:1}),l(h,{loading:x.value,color:"primary",class:"ml-2 px-8",onClick:N},{default:s(()=>[c("yes")]),_:1},8,["loading"])])]),_:1})]),_:1},8,["modelValue"]),l(M,{modelValue:d.value,"onUpdate:modelValue":a[5]||(a[5]=t=>d.value=t),width:"450"},{default:s(()=>[l(k,{class:"rounded-lg"},{default:s(()=>[l(V,null,{default:s(()=>[c(y(g.value),1)]),_:1}),o("div",fe,[l(h,{color:"primary",variant:"text",onClick:a[4]||(a[4]=t=>d.value=!1)},{default:s(()=>[c("Close")]),_:1})])]),_:1})]),_:1},8,["modelValue"]),l(ee,{options:T.value},null,8,["options"])]),_:1}))}};export{Ce as default};
