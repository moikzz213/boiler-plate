import{z as G,K as J,r as o,u as Q,k as X,L as Z,l as ee,c as I,w as m,V as te,o as M,a as u,f as i,M as ae,g as se,h as le,i as E,A as h,d as ie,H as oe,C as ne,e as re}from"./app-15e19d82.js";import{_ as ue}from"./KpiContent-093d411e.js";import{_ as ce}from"./EmployeeCard-955064e3.js";import{c}from"./clientApi-bc787956.js";import{u as de}from"./industry-b4c83e9a.js";import{_ as ve}from"./SnackBar-75b404a7.js";import"./mdi-a0a77bee.js";import"./vue-datepicker-0da73da1.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./printInitials-a54a9c4a.js";const me={class:"v-col-12 v-col-md-3"},pe={class:"v-col-12"},_e={class:"v-col-12 v-col-md-3 d-flex align-center"},he={class:"v-col-12 v-col-md-2 d-flex flex-column"},fe=i("div",{class:"text-caption text-grey"}," Reporting To ",-1),ge={class:"text-body-2"},ye={class:"v-col-12 v-col-md-2 d-flex flex-column"},we=i("div",{class:"text-caption text-grey"}," Business Unit ",-1),ke={class:"text-body-2"},be={class:"v-col-12 v-col-md-2 d-flex flex-column"},xe=i("div",{class:"text-caption text-grey"}," KPI's Target Year ",-1),Se={class:"text-body-2"},Pe={class:"v-col-12 v-col-md-1 d-flex flex-column"},Te=i("div",{class:"text-caption text-grey"}," Total KPI ",-1),Ve={class:"text-body-2"},De={class:"v-col-12 v-col-md-2 d-flex align-center"},We={__name:"SingleTeamMember",props:{manager:{type:String,default:null}},setup(Ie){const R=G(),C=J(),b=o(C.params.id),l=Q(),K=X(),f=de(),p=o({}),B=l.authProfile.display_name,d=o([]),g=o(b.value),t=o({}),N=()=>{t.value=g.value,R.push({name:"SingleTeamMember",params:{id:g.value.ecode}}).catch(e=>{})},x=o(0),A=e=>{let a=0;return e.reviews&&e.reviews.length>0&&e.reviews[0].key_review&&e.reviews[0].key_review.map((s,n)=>{a+=s.weightage}),x.value=a,a},r=o([]),L=async()=>{f.industries.length==0?f.getIndustries(l.authToken).then(()=>{r.value=f.industries}):r.value=f.industries},v=o([]),S=o([]),O=async()=>{await c(l.authToken).get("/api/fetch/master-kpi/non-paginate").then(e=>{r.value&&r.value.length>0&&e.data&&e.data.length>0&&r.value.map((a,s)=>{v.value[s]=a,v.value[s].kpis=[];let n=0,D=0;e.data.map((w,Me)=>{a.id==w.industry_id?(v.value[s].kpis[n]=w,n++):w.type=="ecd"&&(S.value[D]=w,D++)})})})},j=async()=>{await c(l.authToken).get("/api/fetch/master-custom-kpi/non-paginate/"+l.authProfile.ecode).then(e=>{r.value&&r.value.length>0&&e.data&&e.data.length>0&&r.value.map((a,s)=>{e.data.map(n=>{a.id==n.industry_id&&(v.value[s].kpis[v.value[s].kpis.length]=n)})})})},k=o(!1),P=o(!1),z=()=>{k.value=!0;let e="inprogress",a=t.value.reviews[0].id;if(!a)return p.value={status:!0,type:"error",text:"Error: kindly refresh page and submit again."},!1;t.value.reviews[0].state=="setting"?t.value.is_regular&&(t.value.reviews[0].status=="open"||t.value.reviews[0].status=="inprogress")?e="inreview":e="submitted":(t.value.reviews[0].status=="open"||t.value.reviews[0].status=="inprogress")&&(e="submitted");let s={reviewID:a,newStatus:e,user_ecode:l.authProfile.ecode,managerEmail:l.authProfile.email,managerName:l.authProfile.display_name,allowedDays:t.value.is_regular?_.value.employee_review_allowed_days:probation_kpi_setting,closingDateSetting:t.value.is_regular?_.value.annual_kpi_setting_end:probation_kpi_setting,closingDateMid:t.value.is_regular?_.value.mid_year_review_end:probation_first_review_end,closingDateFinal:t.value.is_regular?_.value.end_year_review_end:probation_final_review_end};c(l.authToken).post("/api/manager/employee-kpi/submit",s).then(n=>{p.value={status:!0,type:"success",text:n.data.message},d.value=n.data.profile.teams,l.setProfile(n.data.profile).then(()=>{y(),setTimeout(()=>{k.value=!1,P.value=!0},2e3)})}).catch(n=>{})},T=o(!1),W=e=>{T.value=e.hasError},Y=e=>{let a={id:e.id,user_ecode:l.authProfile.ecode};c(l.authToken).post("/api/delete/employee-kpi-year",a).then(s=>{d.value=s.data.profile.teams,l.setProfile(s.data.profile).then(()=>{y(),p.value={status:!0,type:"success",text:s.data.message}})}).catch(s=>{})},$=e=>{let a={action:e.action,reviewID:e.reviewID,data:e.data,type:e.type,user_ecode:l.authProfile.ecode};c(l.authToken).post("/api/create/employee-kpi-year",a).then(s=>{p.value={status:!0,type:"success",text:s.data.message},d.value=s.data.profile.teams,l.setProfile(s.data.profile).then(()=>{y()})}).catch(s=>{})},F=e=>{U(e)},U=async e=>{await c(l.authToken).get("/api/dashboard/my-kpi/"+t.value.id+"/"+e).then(a=>{a.data.result==null?t.value={...t.value,reviews:[]}:t.value={...t.value,reviews:[a.data.result]}}).catch(a=>{})},V=o([]),H=async()=>{await c(l.authToken).get("/api/fetch/measures/non-paginated").then(e=>{V.value=e.data}).catch(e=>{})},y=()=>{t.value={};let e=d.value.filter(a=>a.username==b.value);t.value=Object.assign({},e[0])},_=Z(()=>K.filteredSetting(t.value.company_id)),q=async()=>{await c(l.authToken).get("/api/fetch/team-members/"+l.authProfile.ecode).then(e=>{d.value=e.data}).catch(e=>{})};return ee(()=>{q().then(()=>{y(),L().then(()=>{O().then(()=>{j().then(()=>{H()})})})})}),(e,a)=>(M(),I(te,{class:"pb-16"},{default:m(()=>[u(E,{class:"my-5"},{default:m(()=>[i("div",me,[u(ae,{modelValue:g.value,"onUpdate:modelValue":[a[0]||(a[0]=s=>g.value=s),N],items:d.value,"item-title":"username","item-value":"id",variant:"outlined",density:"compact",class:"bg-white","return-object":"","hide-details":"",label:"Select Employee"},null,8,["modelValue","items"])]),i("div",pe,[u(se,{class:"mb-3 elevation-0"},{default:m(()=>[u(le,null,{default:m(()=>[u(E,null,{default:m(()=>[i("div",_e,[u(ce,{profile:t.value},null,8,["profile"])]),i("div",he,[fe,i("div",ge,h(ie(B)),1)]),i("div",ye,[we,i("div",ke,h(t.value.company&&t.value.company.title),1)]),i("div",be,[xe,i("div",Se,h(_.value.year),1)]),i("div",Pe,[Te,i("div",Ve,h(A(t.value))+"/100 ",1)]),i("div",De,[!T.value&&x.value==100&&t.value.reviews&&t.value.reviews.length>0&&(t.value.reviews[0].status=="inprogress"||t.value.reviews[0].status=="inreview"||t.value.reviews[0].status=="open")?(M(),I(oe,{key:0,size:"large",onClick:z,loading:k.value,block:"",disabled:P.value,color:"secondary",class:"text-capitalize rounded-lg"},{default:m(()=>[ne(h(t.value.is_regular&&t.value.reviews[0].state=="setting"&&t.value.reviews[0].status=="inprogress"?"Submit for Review":"Submit"),1)]),_:1},8,["loading","disabled"])):re("",!0)])]),_:1})]),_:1})]),_:1})])]),_:1}),u(ue,{"measures-list":V.value,"selected-employee":t.value,"industry-list":v.value,"ecd-list":S.value,onSavedResponse:$,onErrorcheck:W,onYearchange:F,onRemoveKPI:Y,"is-manager":!0},null,8,["measures-list","selected-employee","industry-list","ecd-list"]),u(ve,{options:p.value},null,8,["options"])]),_:1}))}};export{We as default};
