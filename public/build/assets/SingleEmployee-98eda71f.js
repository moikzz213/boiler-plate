import{u as fe,k as ye,z as _e,L as ke,r as c,M as xe,O as J,c as v,w as s,V as we,o as d,a as o,f as u,S as z,G as Q,T as B,d as C,U as S,b as _,n as N,F as $,W as E,C as p,X as be,H as L,A as m,e as R,i as D,g as Ce,h as Se,Y as F,Z as Ee}from"./app-21ef9626.js";import{c as h}from"./clientApi-821b8189.js";import{m as ee,a as Te}from"./mdi-5e26928d.js";import{_ as Ve}from"./KpiContent-acd052b3.js";import{_ as Pe}from"./EmployeeCard-58066a00.js";import{_ as Ie}from"./ConfirmDialog-431a1092.js";import{_ as Ae}from"./SnackBar-acb9d805.js";import{u as Me}from"./industry-24eaa574.js";import"./vue-datepicker-9ca2735d.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./printInitials-a54a9c4a.js";const Le={class:"v-col-12 v-col-md-3 pb-0"},Re=u("div",{class:"text-caption px-3 text-grey-darken-1 pt-1"}," Enter ecode, name, or email ",-1),Ye={key:0,class:"v-col-12 v-col-md-3 text-right pb-0"},Ke={class:"v-col-12 v-col-md-3 pb-0"},Oe=u("div",{class:"text-caption px-3 text-grey-darken-1 pt-1"}," Enter ecode, name, or email ",-1),Ue={key:1,class:"v-col-12 v-col-md-2 text-right pb-0"},ze=u("div",{class:"text-caption px-3 text-grey-darken-1 pt-1"},"Employee Status",-1),Be={class:"v-col-12"},Ne={class:"v-col-12 v-col-md-3 d-flex align-center"},$e={class:"v-col-12 v-col-md-2 d-flex flex-column"},De=u("div",{class:"text-caption text-grey"},"Reporting To",-1),Fe={class:"text-body-2"},We={class:"v-col-12 v-col-md-2 d-flex flex-column"},je=u("div",{class:"text-caption text-grey"},"Business Unit",-1),Ge={class:"text-body-2"},He={class:"v-col-12 v-col-md-2 d-flex flex-column"},Xe=u("div",{class:"text-caption text-grey"},"KPI's Target Year",-1),Ze={class:"text-body-2"},qe={class:"v-col-12 v-col-md-1 d-flex flex-column"},Je=u("div",{class:"text-caption text-grey"},"Total KPI",-1),Qe={class:"text-body-2"},et={key:0,class:"v-col-12 v-col-md-2 d-flex align-center"},ht={__name:"SingleEmployee",setup(tt){const T=Me(),r=fe(),te=ye(),ae=_e(),le=ke(),g=c({}),V=c("Mid Year"),P=c("Active"),W=c(""),se=c([{title:"Active",color:"success"},{title:"Inactive",color:"error"}]),k=c([]),oe=async()=>{T.industries.length==0?T.getIndustries(r.authToken).then(()=>{k.value=T.industries}):k.value=T.industries},j=c([]),ne=async()=>{await h(r.authToken).get("/api/fetch/measures/non-paginated").then(e=>{j.value=e.data}).catch(e=>{})},I=c([]),G=c([]),H=c(new Date().getFullYear()),ie=e=>{H.value=e,ue(e)},ue=async e=>{await h(r.authToken).get("/api/dashboard/my-kpi/"+a.value.id+"/"+e).then(t=>{t.data.result==null?a.value={...a.value,reviews:[]}:a.value={...a.value,reviews:[t.data.result]}}).catch(t=>{})},ce=async()=>{await h(r.authToken).get("/api/fetch/master-kpi/non-paginate").then(e=>{k.value&&k.value.length>0&&e.data&&e.data.length>0&&k.value.map((t,l)=>{I.value[l]=t,I.value[l].kpis=[];let i=0,y=0;e.data.map((M,at)=>{t.id==M.industry_id?(I.value[l].kpis[i]=M,i++):M.type=="ecd"&&(G.value[y]=M,y++)})})})},re=e=>{let t=0;return e.reviews&&e.reviews.length>0&&e.reviews[0].key_review&&e.reviews[0].key_review.map((l,i)=>{t+=l.weightage}),t},Y=c(!1),de=()=>{var l,i;let e=(i=(l=a.value)==null?void 0:l.reviews[0])==null?void 0:i.id;Y.value=!0;let t={reviewID:e,state:V.value=="Mid Year"?"midyear":"yearend",title:V.value,profile_id:r.authProfile.id};h(r.authToken).post("/api/hr-change/state",t).then(y=>{g.value={status:!0,type:"success",text:y.data.message},x()}).catch(y=>{console.log("getEmployee",y)})},a=c({}),x=async()=>{await h(r.authToken).get("/api/hr/employee/ecode/"+le.params.ecode).then(e=>{var t,l;a.value=e.data,((l=(t=e.data)==null?void 0:t.reviews[0])==null?void 0:l.state)=="midyear"&&(V.value="Year End"),Y.value=!1,P.value=e.data.status,f.value=e.data.slave_ecode}).catch(e=>{console.log("getEmployee",e)})},K=xe(()=>te.filteredSetting(a.value.company_id));r.authToken&&(x(),oe(),ce(),ne());const ve=e=>{W.value=e.title,n.value={dialog:!0,title:"Confirm Status Update",text:"Please confirm that you want to update the status of "+a.value.display_name+" into "+e.title+".",btnColor:e.title=="Active"?"success":"error",btnTitle:"Confirm"}},pe=async()=>{let e={profile_id:r.authProfile.id,ecode:a.value.ecode,status:W.value};n.value={...n.value,loading:!0},await h(r.authToken).post("/api/hr/employee/status/update",e).then(t=>{x().then(()=>{n.value={...n.value,loading:!1,dialog:!1},g.value={status:!0,type:"success",text:t.data.message}})}).catch(t=>{console.log("getEmployee",t),n.value={...n.value,loading:!1},g.value={status:!0,type:"error",text:"Error while updating employee"}})},w=c(""),f=c(""),b=c(!1),O=c([]),U=c({}),X=async e=>{b.value=!0,await h(r.authToken).get("/api/hr/search/employee?&filter[search]="+e).then(t=>{b.value=!1,f.value?U.value=t.data:w.value&&(O.value=t.data)}).catch(t=>{b.value=!1,console.log("getEmployee",t)})},Z=async(e,t)=>{let l={profile_id:r.authProfile.id,slave_ecode:t?"":e.ecode,ecode:a.value.ecode};n.value={...n.value,loading:!0},f.value=e==null?void 0:e.ecode,await h(r.authToken).post("/api/employee/secondary-manager/update",l).then(i=>{x().then(()=>{n.value={...n.value,loading:!1,dialog:!1},g.value={status:!0,type:"success",text:i.data.message}})}).catch(i=>{n.value={...n.value,loading:!1},g.value={status:!0,type:"error",text:"Error while updating employee"}})},me=e=>{a.value=e,P.value=e.status,ae.push({name:"SingleEmployee",params:{ecode:e.ecode}}).catch(t=>{})};J(w,(e,t)=>{e&&e!=t&&e.length>3&&X(w.value)}),J(f,(e,t)=>{e&&e!=t&&e.length>3&&X(f.value)});const A=c({data:{},loading:!1}),q=()=>{n.value={dialog:!0,title:"Confirm to Open KPI",text:"Please confirm that you want to open the KPI for "+a.value.display_name+".",btnColor:"secondary",btnTitle:"Confirm"}},he=async()=>{n.value={...n.value,loading:!0};let e={profile_id:r.authProfile.id,name:r.authProfile.display_name,ecode:a.value.ecode,year:H.value};await h(r.authToken).post("/api/hr/employee/reopen",e).then(t=>{n.value={...n.value,loading:!1,dialog:!1},A.value.loading=!0,x().then(()=>{A.value.loading=!1,g.value={status:!0,type:"success",text:t.data.message}})}).catch(t=>{n.value={...n.value,loading:!1},g.value={status:!0,type:"error",text:"Error while updating employee"}})},n=c(),ge=e=>{n.value.title=="Confirm Status Update"?pe():n.value.title=="Confirm to Open KPI"&&he()};return(e,t)=>(d(),v(we,{class:"pb-16"},{default:s(()=>[o(D,{class:"mt-5 justify-space-between"},{default:s(()=>[u("div",Le,[o(z,null,{activator:s(({props:l})=>[o(Q,B(l,{modelValue:w.value,"onUpdate:modelValue":t[0]||(t[0]=i=>w.value=i),loading:b.value,variant:"outlined",density:"compact",class:"bg-white",label:"Search Employee","hide-details":"","append-inner-icon":C(ee)}),null,16,["modelValue","loading","append-inner-icon"])]),default:s(()=>[O.value.length>0?(d(),v(S,{key:0,density:"compact",style:{"max-height":"300px"}},{default:s(()=>[(d(!0),_($,null,N(O.value,(l,i)=>(d(),v(E,{key:i,onClick:()=>me(l)},{default:s(()=>[o(F,null,{default:s(()=>[p(m(l.display_name+" - "+l.ecode),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})):(d(),v(S,{key:1,density:"compact"},{default:s(()=>[o(E,null,{default:s(()=>[p(" No results found ")]),_:1})]),_:1}))]),_:1}),Re]),o(be),a.value.status=="Active"&&a.value.reviews&&a.value.reviews.length>0&&a.value.reviews[0].status=="submitted"?(d(),_("div",Ye,[o(L,{color:"secondary",loading:Y.value,onClick:de},{default:s(()=>[p("Change to "+m(V.value),1)]),_:1},8,["loading"])])):R("",!0),u("div",Ke,[o(z,null,{activator:s(({props:l})=>[o(Q,B(l,{modelValue:f.value,"onUpdate:modelValue":t[1]||(t[1]=i=>f.value=i),loading:b.value,variant:"outlined",density:"compact",class:"bg-white",label:"Secondary Manager","hide-details":"","onClick:clear":t[2]||(t[2]=i=>Z(e.item,"clear")),clearable:"","append-inner-icon":C(ee)}),null,16,["modelValue","loading","append-inner-icon"])]),default:s(()=>[U.value.length>0?(d(),v(S,{key:0,density:"compact",style:{"max-height":"300px"}},{default:s(()=>[(d(!0),_($,null,N(U.value,(l,i)=>(d(),v(E,{key:i,onClick:()=>Z(l)},{default:s(()=>[o(F,null,{default:s(()=>[p(m(l.display_name+" - "+l.ecode),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})):(d(),v(S,{key:1,density:"compact"},{default:s(()=>[o(E,null,{default:s(()=>[p(" No results found ")]),_:1})]),_:1}))]),_:1}),Oe]),["hr_admin","app_admin","hrbp"].includes(C(r).authProfile.role)?(d(),_("div",Ue,[u("div",null,[o(z,null,{activator:s(({props:l})=>[o(L,B(l,{color:`${P.value=="Active"?"success":"error"}`,width:"120"}),{default:s(()=>[p(m(P.value),1)]),_:2},1040,["color"])]),default:s(()=>[o(S,{density:"compact"},{default:s(()=>[(d(!0),_($,null,N(se.value,(l,i)=>(d(),v(E,{key:i,onClick:()=>ve(l)},{default:s(()=>[o(F,null,{default:s(()=>[o(Ee,{size:"16",color:l.color,icon:C(Te)},null,8,["color","icon"]),p(" "+m(l.title),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),ze])):R("",!0)]),_:1}),o(D,null,{default:s(()=>[u("div",Be,[o(Ce,{class:"elevation-0"},{default:s(()=>[o(Se,null,{default:s(()=>[o(D,null,{default:s(()=>[u("div",Ne,[o(Pe,{profile:a.value},null,8,["profile"])]),u("div",$e,[De,u("div",Fe,m(a.value.managed_by&&a.value.managed_by.display_name?a.value.managed_by.display_name:""),1)]),u("div",We,[je,u("div",Ge,m(a.value&&a.value.company?a.value.company.title:""),1)]),u("div",He,[Xe,u("div",Ze,m(K.value.year),1)]),u("div",qe,[Je,u("div",Qe,m(re(a.value))+"/100",1)]),["hr_admin","app_admin","hrbp"].includes(C(r).authProfile.role)?(d(),_("div",et,[a.value.status=="Active"&&a.value.reviews&&(a.value.reviews.length>0&&(a.value.reviews[0].status=="closed"||a.value.reviews[0].status=="locked"||a.value.reviews[0].status=="submitted")||a.value.reviews.length==0&&(K.value.status=="closed"||K.value.status=="locked"))?(d(),v(L,{key:0,loading:A.value.loading,onClick:q,block:"",size:"large",color:"secondary",class:"text-capitalize rounded-lg"},{default:s(()=>[p("Reopen")]),_:1},8,["loading"])):a.value.status=="Active"&&a.value.reviews.length==0&&a.value.is_regular==0?(d(),v(L,{key:1,loading:A.value.loading,onClick:q,block:"",size:"large",color:"secondary",class:"text-capitalize rounded-lg"},{default:s(()=>[p("Open")]),_:1},8,["loading"])):R("",!0)])):R("",!0)]),_:1})]),_:1})]),_:1})])]),_:1}),o(Ve,{"selected-employee":a.value,"measures-list":j.value,"industry-list":I.value,"ecd-list":G.value,onErrorcheck:e.errorCheck,onYearchange:ie,"is-manager":!0},null,8,["selected-employee","measures-list","industry-list","ecd-list","onErrorcheck"]),o(Ie,{options:n.value,onConfirm:ge},null,8,["options"]),o(Ae,{options:g.value},null,8,["options"])]),_:1}))}};export{ht as default};
