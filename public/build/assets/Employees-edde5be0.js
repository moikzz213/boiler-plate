import{u as A,k as D,x as M,r as c,Q as Y,c as v,w as i,V as q,o as d,a as s,f as o,t as C,s as Q,q as W,P as G,d as H,R as J,S as X,M as Z,v as y,n as p,e as g,b as h,i as P,F as ee,C as ae,T as te,g as B,h as I}from"./app-4113f54e.js";import{c as R}from"./clientApi-7c605ab8.js";import{u as le}from"./company-5bbdf0ec.js";import oe from"./KpiProgress-c9c7dea1.js";import{_ as se}from"./EmployeeCard-d16d2028.js";import{_ as ie}from"./SnackBar-ef6d653a.js";import"./printInitials-a54a9c4a.js";import"./mdi-5e26928d.js";const ne={class:"v-col-12"},ce={class:"text-h6"},de={class:"v-col-12 v-col-md-3"},re={class:"v-col-12 v-col-md-4"},ue={class:"v-col-12 v-col-md-2"},me={class:"v-col-12 v-col-md-3"},ve={class:"d-flex justify-space-between"},pe=o("div",{class:"v-col-4"},null,-1),ge={class:"v-col-4 text-center"},he={key:1,class:"text-caption text-center"},_e={class:"v-col-4 text-right"},ye={key:1,class:"text-caption text-center"},fe={key:0,class:"v-col-12"},be={class:"v-col-12 v-col-md-3"},we={class:"v-col-12 v-col-md-8"},Ve={class:"v-col-12 v-col-md-1 d-flex justify-end align-center"},ke=o("div",{class:"text-caption text-grey"},"Total KPI",-1),xe={key:1,class:"v-col-12"},Ie={__name:"Employees",setup(Ce){const n=A(),S=D(),f=M(),z=(t,e=null)=>{let a=e?Object.assign({},e):!1;S.push({name:t,params:a}).catch(u=>{})},N=t=>{let e=0;return t.reviews&&t.reviews.length>0&&t.reviews[0].key_review&&t.reviews[0].key_review.map((a,u)=>{e+=a.weightage}),e},b=le(),_=c(!1),O=()=>{b.companies.length==0&&(_.value=!0,b.getCompanies(n.authToken).then(()=>{_.value=!1}))},w=c(!1),V=c(!1),$=()=>{let t={auth:n.authProfile.role,hrbp:n.authProfile.hrbp_email};R(n.authToken).post("/api/check-reviews/acount-validation",t).then(e=>{w.value=e.data.first_button,V.value=e.data.second_button,console.log(e.data)}).catch(e=>{console.log("getEmployee",e)})},F=c({}),E=t=>{let e={state:t,auth:n.authProfile.role,profile_id:n.authProfile.profile_id,hrbp:n.authProfile.hrbp_email};R(n.authToken).post("/api/hr-change/multitple-state",e).then(a=>{m(r.value),F.value={status:!0,type:"success",text:a.data.message}}).catch(a=>{console.log("getEmployee",a)})},L=c([{value:1,title:"Regular"},{value:0,title:"Probation"}]),l=c({loadingReset:!1,loadingFilter:!1,data:{employee:null,company_id:null,is_regular:1}}),T=async()=>{l.value.loadingFilter=!0,m(1).then(()=>{l.value.loadingFilter=!1}).catch(t=>{l.value.loadingFilter=!1})},U=async()=>{l.value.data={employee:null,company_id:null,is_regular:1},l.value.loadingReset=!0,m(1).then(()=>{l.value.loadingReset=!1}).catch(t=>{l.value.loadingReset=!1})},k=c([]),x=c(0),K=c(0),r=c(f.params&&f.params.page?f.params.page:1),m=async t=>{let e="/api/hr/employees?&filter[is_regular]="+l.value.data.is_regular+"&filter[hrbp_email]="+n.authProfile.email;l.value.data.company_id!==null&&(e+="&filter[company_id]="+l.value.data.company_id),e+="&filter[employee]="+l.value.data.employee,e+="&page="+t,await R(n.authToken).get(e).then(a=>{x.value=a.data.last_page,r.value=a.data.current_page,K.value=a.data.total,k.value=a.data.data}).catch(a=>{console.log("getEmployees",a)}),$()};Y(r,(t,e)=>{t!=e&&(S.push({name:"PaginatedEmployees",params:{page:r.value}}).catch(a=>{}),m(r.value))}),n.authToken&&m(r.value);const j=t=>{console.log("profile",t),z("SingleEmployee",{ecode:t.ecode})};return(t,e)=>(d(),v(q,{class:"pb-16"},{default:i(()=>[s(P,{class:"mt-5"},{default:i(()=>[o("div",ne,[o("div",ce,"Employee List "+C("("+K.value+")"),1)]),o("div",de,[s(Q,{modelValue:l.value.data.employee,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value.data.employee=a),variant:"outlined",density:"compact",class:"bg-white","hide-details":"",label:"Input Employee",onKeydown:W(T,["enter"])},null,8,["modelValue","onKeydown"])]),o("div",re,[s(G,{modelValue:l.value.data.company_id,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.data.company_id=a),items:H(b).active_companies,"item-title":"title","item-value":"id",variant:"outlined",density:"compact",class:"bg-white","hide-details":"",label:_.value?"Loading...":"Select Company",loading:_.value,clearable:"",onFocus:O},{selection:i(({props:a,item:u})=>[o("span",J(X(a)),C(u.raw.title&&u.raw.title.length>20?u.raw.title.substring(0,20)+"...":u.raw.title),17)]),_:1},8,["modelValue","items","label","loading"])]),o("div",ue,[s(Z,{modelValue:l.value.data.is_regular,"onUpdate:modelValue":e[2]||(e[2]=a=>l.value.data.is_regular=a),items:L.value,"item-title":"title","item-value":"value",variant:"outlined",density:"compact",class:"bg-white","hide-details":"",label:"Select Employee Type"},null,8,["modelValue","items"])]),o("div",me,[o("div",ve,[s(y,{onClick:U,height:"40px",variant:"text",color:"primary",class:"bg-grey-lighten-2 text-capitalize",loading:l.value.loadingReset,style:{width:"48%"}},{default:i(()=>[p("Reset")]),_:1},8,["loading"]),s(y,{onClick:T,height:"40px",color:"secondary",class:"text-capitalize",loading:l.value.loadingFilter,style:{width:"48%"}},{default:i(()=>[p("Search")]),_:1},8,["loading"])])]),pe,o("div",ge,[w.value?(d(),v(y,{key:0,color:"primary",size:"small",onClick:e[3]||(e[3]=a=>E("midyear"))},{default:i(()=>[p("Change KPI`s to Mid Year/ First Review")]),_:1})):g("",!0),w.value?(d(),h("div",he,"(Only Submitted KPIs - Regular / Probation)")):g("",!0)]),o("div",_e,[V.value?(d(),v(y,{key:0,color:"primary",size:"small",onClick:e[4]||(e[4]=a=>E("yearend"))},{default:i(()=>[p("Change KPI`s to Year End/ Final Review")]),_:1})):g("",!0),V.value?(d(),h("div",ye,"(Only Submitted KPIs - Regular / Probation)")):g("",!0)])]),_:1}),s(P,null,{default:i(()=>[k.value.length>0?(d(),h("div",fe,[(d(!0),h(ee,null,ae(k.value,a=>(d(),v(B,{key:a.id,class:"mb-3 elevation-0",onClick:()=>j(a)},{default:i(()=>[s(I,null,{default:i(()=>[s(P,null,{default:i(()=>[o("div",be,[s(se,{profile:a},null,8,["profile"])]),o("div",we,[s(oe,{density:"compact","selected-employee":a},null,8,["selected-employee"])]),o("div",Ve,[o("div",null,[o("div",null,C(N(a))+" /100",1),ke])])]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"]))),128)),x.value>1?(d(),v(te,{key:0,modelValue:r.value,"onUpdate:modelValue":e[5]||(e[5]=a=>r.value=a),class:"my-4",length:x.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):g("",!0)])):(d(),h("div",xe,[s(B,null,{default:i(()=>[s(I,{class:"text-center"},{default:i(()=>[p(" No records found ")]),_:1})]),_:1})]))]),_:1}),s(ie,{options:F.value},null,8,["options"])]),_:1}))}};export{Ie as default};
