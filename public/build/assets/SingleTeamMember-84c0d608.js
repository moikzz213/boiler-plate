import{z as q,K as G,r as o,u as J,k as Q,L as X,l as Z,c as D,w as m,V as ee,o as I,a as u,f as i,M as te,g as ae,h as se,i as M,A as h,d as le,H as ie,C as oe,e as ne}from"./app-6bac03f7.js";import{_ as re}from"./KpiContent-f2e55481.js";import{_ as ue}from"./EmployeeCard-ff19ff1a.js";import{c}from"./clientApi-7db5a976.js";import{u as ce}from"./industry-926dd76e.js";import{_ as de}from"./SnackBar-a670d79f.js";import"./mdi-a0a77bee.js";import"./vue-datepicker-d5429077.js";import"./typeof-7fd5df1e.js";import"./defineProperty-fcf2a4a8.js";import"./printInitials-a54a9c4a.js";const ve={class:"v-col-12 v-col-md-3"},me={class:"v-col-12"},pe={class:"v-col-12 v-col-md-3 d-flex align-center"},_e={class:"v-col-12 v-col-md-2 d-flex flex-column"},he=i("div",{class:"text-caption text-grey"}," Reporting To ",-1),ge={class:"text-body-2"},fe={class:"v-col-12 v-col-md-2 d-flex flex-column"},ye=i("div",{class:"text-caption text-grey"}," Business Unit ",-1),we={class:"text-body-2"},ke={class:"v-col-12 v-col-md-2 d-flex flex-column"},xe=i("div",{class:"text-caption text-grey"}," KPI's Target Year ",-1),be={class:"text-body-2"},Se={class:"v-col-12 v-col-md-1 d-flex flex-column"},Pe=i("div",{class:"text-caption text-grey"}," Total KPI ",-1),Te={class:"text-body-2"},Ve={class:"v-col-12 v-col-md-2 d-flex align-center"},ze={__name:"SingleTeamMember",props:{manager:{type:String,default:null}},setup(De){const E=q(),R=G(),x=o(R.params.id),l=J(),C=Q(),g=ce(),p=o({}),K=l.authProfile.display_name,d=o([]),f=o(x.value),t=o({}),B=()=>{t.value=f.value,E.push({name:"SingleTeamMember",params:{id:f.value.ecode}}).catch(e=>{})},b=o(0),N=e=>{let a=0;return e.reviews&&e.reviews.length>0&&e.reviews[0].key_review&&e.reviews[0].key_review.map((s,n)=>{a+=s.weightage}),b.value=a,a},r=o([]),A=async()=>{g.industries.length==0?g.getIndustries(l.authToken).then(()=>{r.value=g.industries}):r.value=g.industries},v=o([]),S=o([]),L=async()=>{await c(l.authToken).get("/api/fetch/master-kpi/non-paginate").then(e=>{r.value&&r.value.length>0&&e.data&&e.data.length>0&&r.value.map((a,s)=>{v.value[s]=a,v.value[s].kpis=[];let n=0,V=0;e.data.map((w,Ie)=>{a.id==w.industry_id?(v.value[s].kpis[n]=w,n++):w.type=="ecd"&&(S.value[V]=w,V++)})})})},O=async()=>{await c(l.authToken).get("/api/fetch/master-custom-kpi/non-paginate/"+l.authProfile.ecode).then(e=>{r.value&&r.value.length>0&&e.data&&e.data.length>0&&r.value.map((a,s)=>{e.data.map(n=>{a.id==n.industry_id&&(v.value[s].kpis[v.value[s].kpis.length]=n)})})})},k=o(!1),j=()=>{k.value=!0;let e="inprogress",a=t.value.reviews[0].id;if(!a)return p.value={status:!0,type:"error",text:"Error: kindly refresh page and submit again."},!1;t.value.reviews[0].state=="setting"?t.value.is_regular&&(t.value.reviews[0].status=="open"||t.value.reviews[0].status=="inprogress")?e="inreview":e="submitted":(t.value.reviews[0].status=="open"||t.value.reviews[0].status=="inprogress")&&(e="submitted");let s={reviewID:a,newStatus:e,user_ecode:l.authProfile.ecode,managerEmail:l.authProfile.email,managerName:l.authProfile.display_name,allowedDays:t.value.is_regular?_.value.employee_review_allowed_days:probation_kpi_setting,closingDateSetting:t.value.is_regular?_.value.annual_kpi_setting_end:probation_kpi_setting,closingDateMid:t.value.is_regular?_.value.mid_year_review_end:probation_first_review_end,closingDateFinal:t.value.is_regular?_.value.end_year_review_end:probation_final_review_end};c(l.authToken).post("/api/manager/employee-kpi/submit",s).then(n=>{p.value={status:!0,type:"success",text:n.data.message},d.value=n.data.profile.teams,l.setProfile(n.data.profile).then(()=>{y(),setTimeout(()=>{k.value=!1},1e3)})}).catch(n=>{})},P=o(!1),z=e=>{P.value=e.hasError},W=e=>{let a={id:e.id,user_ecode:l.authProfile.ecode};c(l.authToken).post("/api/delete/employee-kpi-year",a).then(s=>{d.value=s.data.profile.teams,l.setProfile(s.data.profile).then(()=>{y(),p.value={status:!0,type:"success",text:s.data.message}})}).catch(s=>{})},Y=e=>{let a={action:e.action,reviewID:e.reviewID,data:e.data,type:e.type,user_ecode:l.authProfile.ecode};c(l.authToken).post("/api/create/employee-kpi-year",a).then(s=>{p.value={status:!0,type:"success",text:s.data.message},d.value=s.data.profile.teams,l.setProfile(s.data.profile).then(()=>{y()})}).catch(s=>{})},$=e=>{F(e)},F=async e=>{await c(l.authToken).get("/api/dashboard/my-kpi/"+t.value.id+"/"+e).then(a=>{a.data.result==null?t.value={...t.value,reviews:[]}:t.value={...t.value,reviews:[a.data.result]}}).catch(a=>{})},T=o([]),U=async()=>{await c(l.authToken).get("/api/fetch/measures/non-paginated").then(e=>{T.value=e.data}).catch(e=>{})},y=()=>{t.value={};let e=d.value.filter(a=>a.username==x.value);t.value=Object.assign({},e[0])},_=X(()=>C.filteredSetting(t.value.company_id)),H=async()=>{await c(l.authToken).get("/api/fetch/team-members/"+l.authProfile.ecode).then(e=>{d.value=e.data}).catch(e=>{})};return Z(()=>{H().then(()=>{y(),A().then(()=>{L().then(()=>{O().then(()=>{U()})})})})}),(e,a)=>(I(),D(ee,{class:"pb-16"},{default:m(()=>[u(M,{class:"my-5"},{default:m(()=>[i("div",ve,[u(te,{modelValue:f.value,"onUpdate:modelValue":[a[0]||(a[0]=s=>f.value=s),B],items:d.value,"item-title":"username","item-value":"id",variant:"outlined",density:"compact",class:"bg-white","return-object":"","hide-details":"",label:"Select Employee"},null,8,["modelValue","items"])]),i("div",me,[u(ae,{class:"mb-3 elevation-0"},{default:m(()=>[u(se,null,{default:m(()=>[u(M,null,{default:m(()=>[i("div",pe,[u(ue,{profile:t.value},null,8,["profile"])]),i("div",_e,[he,i("div",ge,h(le(K)),1)]),i("div",fe,[ye,i("div",we,h(t.value.company&&t.value.company.title),1)]),i("div",ke,[xe,i("div",be,h(_.value.year),1)]),i("div",Se,[Pe,i("div",Te,h(N(t.value))+"/100 ",1)]),i("div",Ve,[!P.value&&b.value==100&&t.value.reviews&&t.value.reviews.length>0&&(t.value.reviews[0].status=="inprogress"||t.value.reviews[0].status=="inreview"||t.value.reviews[0].status=="open")?(I(),D(ie,{key:0,size:"large",onClick:j,loading:k.value,block:"",color:"secondary",class:"text-capitalize rounded-lg"},{default:m(()=>[oe(h(t.value.is_regular&&t.value.reviews[0].state=="setting"&&t.value.reviews[0].status=="inprogress"?"Submit for Review":"Submit"),1)]),_:1},8,["loading"])):ne("",!0)])]),_:1})]),_:1})]),_:1})])]),_:1}),u(re,{"measures-list":T.value,"selected-employee":t.value,"industry-list":v.value,"ecd-list":S.value,onSavedResponse:Y,onErrorcheck:z,onYearchange:$,onRemoveKPI:W,"is-manager":!0},null,8,["measures-list","selected-employee","industry-list","ecd-list"]),u(de,{options:p.value},null,8,["options"])]),_:1}))}};export{ze as default};
