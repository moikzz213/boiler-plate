import{u as B,z as A,K as F,r as u,N as H,o as m,b as _,a as t,w as c,B as L,H as V,X as k,d as x,a2 as U,F as q,n as Q,f as o,A as z,e as C,c as w,g as P,h as X,C as $,Q as G,V as le,q as S,v as j,i as se}from"./app-fc232221.js";import{_ as oe}from"./PageHeader-27d36fc6.js";import{c as J,f as W,g as Y}from"./mdi-6c0c9690.js";import{c as b}from"./clientApi-9cd075be.js";import{_ as Z}from"./ConfirmDialog-50f75ddc.js";import{_ as ee}from"./SnackBar-1fd8bd8c.js";import{_ as te}from"./CustomKpiDialog-553c8457.js";import{_ as ae}from"./ImportData-b86230b6.js";import"./industry-bfe78a26.js";import"./_commonjsHelpers-042e6b4d.js";const ne={class:"v-col-12"},ie=o("div",{class:"text-primary text-capitalize"},"KPI Master List",-1),re=o("thead",null,[o("tr",null,[o("th",{class:"text-left text-capitalize"},"Title"),o("th",{class:"text-left text-capitalize"},"Industry"),o("th",{class:"text-right text-capitalize"},"Actions")])],-1),ue={key:0},ce={class:"d-flex align-center justify-end"},de={__name:"KpiMaster",setup(N){const h=B(),d=A(),f=F(),n=u({}),p=u({btnTitle:"Import KPI",cardTitle:"Import KPI",endpoint:"/api/import/kpi",templateFile:"import-template-kpi.csv",conditionArray:["industry"]}),I=e=>{e.status==!0?g(1).then(()=>{n.value={status:!0,type:"success",text:e.message},p.value={...p.value,loading:!1,dialog:!1}}):n.value={status:!0,type:"error",text:e.message}},v=u([]),l=u({title:"",data:{},loading:!1,dialog:!1,type:"kpi",action:"view"}),y=u(0),s=u(1);s.value=f.params&&f.params.page?f.params.page:1;const g=async e=>{await b(h.authToken).get("/api/hr/kpi/type/kpi?page="+e).then(a=>{y.value=a.data.last_page,s.value=a.data.current_page,v.value=a.data.data}).catch(a=>{console.log("kpis",a)})};g(s.value);const K=()=>{l.value={...l.value,title:"Add KPI",data:{},dialog:!0,action:"add"}},R=e=>{l.value={...l.value,title:e.title,data:Object.assign({},e),dialog:!0,action:"edit"}};H(s,(e,a)=>{e!=a&&(d.push({name:"PaginatedHrMasterKpi",params:{page:s.value}}).catch(i=>{}),g(s.value))});const E=async()=>{l.value.data.type=f.params.type,await b(h.authToken).post("/api/hr/master-kpi/save",l.value.data).then(e=>{g(s.value).then(()=>{n.value={status:!0,type:"success",text:e.data.message},l.value={...l.value,dialog:!1,loading:!1}})}).catch(e=>{n.value={status:!0,type:"error",text:"Error while trying to save KPI"},l.value={...l.value,dialog:!1,loading:!1}})},r=u({}),T=u({}),M=e=>{T.value=Object.assign({},e),r.value={dialog:!0,title:"Confirm Remove",text:"Please confirm that you want to remove "+e.title+".",btnColor:"error",btnTitle:"Confirm"}},D=async()=>{await b(h.authToken).post("/api/hr/kpi/remove/"+T.value.id).then(e=>{g(s.value).then(()=>{n.value={status:!0,type:"success",text:e.data.message}})}).catch(e=>{n.value={status:!0,type:"error",text:"Error while removing data"}})},O=e=>{r.value={...r.value,loading:!0},D().then(a=>{r.value={...r.value,dialog:!1,loading:!1}}).catch(a=>{r.value={...r.value,loading:!1}})};return(e,a)=>(m(),_("div",ne,[t(ae,{options:p.value,onImported:I,class:"mb-3"},null,8,["options"]),t(P,{class:"rounded-lg"},{default:c(()=>[t(L,{class:"d-flex align-center"},{default:c(()=>[t(V,{onClick:K,density:"compact",size:"35",class:"rounded-xl elevation-2 mr-2"},{default:c(()=>[t(k,{size:"small",icon:x(J)},null,8,["icon"])]),_:1}),ie]),_:1}),t(U,null,{default:c(()=>[re,v.value&&v.value.length>0?(m(),_("tbody",ue,[(m(!0),_(q,null,Q(v.value,i=>(m(),_("tr",{key:i.id},[o("td",null,z(i.title),1),o("td",null,z(i.industry&&i.industry.title),1),o("td",null,[o("div",ce,[t(k,{size:"small",onClick:()=>R(i),icon:x(W),class:"mx-1"},null,8,["onClick","icon"]),t(k,{size:"small",onClick:()=>M(i),icon:x(Y),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])):C("",!0)]),_:1}),v.value&&v.value.length==0?(m(),w(P,{key:0},{default:c(()=>[t(X,{class:"text-center"},{default:c(()=>[$(" No records found ")]),_:1})]),_:1})):C("",!0)]),_:1}),y.value>1?(m(),w(G,{key:0,modelValue:s.value,"onUpdate:modelValue":a[0]||(a[0]=i=>s.value=i),class:"my-4",length:y.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):C("",!0),t(te,{"kpi-options":l.value,"is-hr":!0,onSave:E},null,8,["kpi-options"]),t(Z,{options:r.value,onConfirm:O},null,8,["options"]),t(ee,{options:n.value},null,8,["options"])]))}},pe={class:"v-col-12"},ve=o("div",{class:"text-primary text-capitalize"},"ECD Master List",-1),me=o("thead",null,[o("tr",null,[o("th",{class:"text-left text-capitalize"},"Title"),o("th",{class:"text-left text-capitalize"},"ECD Type"),o("th",{class:"text-right text-capitalize"},"Actions")])],-1),fe={key:0},ge={class:"d-flex align-center justify-end"},he={__name:"EcdMaster",setup(N){const h=B(),d=A(),f=F(),n=u({}),p=u({btnTitle:"Import ECD",cardTitle:"Import ECD",endpoint:"/api/import/ecd",templateFile:"import-template-ecd.csv"}),I=e=>{console.log("importResponse",e),e.status==!0?g(1).then(()=>{n.value={status:!0,type:"success",text:e.message},p.value={...p.value,loading:!1,dialog:!1}}):n.value={status:!0,type:"error",text:e.message}},v=u([]),l=u({title:"",data:{},loading:!1,dialog:!1,type:"ecd",action:"view"}),y=u(0),s=u(1);s.value=f.params&&f.params.page?f.params.page:1;const g=async e=>{await b(h.authToken).get("/api/hr/kpi/type/ecd?page="+e).then(a=>{y.value=a.data.last_page,s.value=a.data.current_page,v.value=a.data.data}).catch(a=>{console.log("kpis",a)})};g(s.value);const K=()=>{l.value={...l.value,title:"Add ECD",data:{},dialog:!0,action:"add"}},R=e=>{l.value={...l.value,title:e.title,data:Object.assign({},e),dialog:!0,action:"edit"}};H(s,(e,a)=>{e!=a&&(d.push({name:"PaginatedHrMasterKpi",params:{page:s.value}}).catch(i=>{}),g(s.value))});const E=async()=>{l.value.data.type=f.params.type,await b(h.authToken).post("/api/hr/master-kpi/save",l.value.data).then(e=>{g(s.value).then(()=>{n.value={status:!0,type:"success",text:e.data.message},l.value={...l.value,dialog:!1,loading:!1}})}).catch(e=>{n.value={status:!0,type:"error",text:"Error while trying to save KPI"},l.value={...l.value,dialog:!1,loading:!1}})},r=u({}),T=u({}),M=e=>{T.value=Object.assign({},e),r.value={dialog:!0,title:"Confirm Remove",text:"Please confirm that you want to remove "+e.title+".",btnColor:"error",btnTitle:"Confirm"}},D=async()=>{await b(h.authToken).post("/api/hr/kpi/remove/"+T.value.id).then(e=>{g(s.value).then(()=>{n.value={status:!0,type:"success",text:e.data.message}})}).catch(e=>{n.value={status:!0,type:"error",text:"Error while removing data"}})},O=e=>{r.value={...r.value,loading:!0},D().then(a=>{r.value={...r.value,dialog:!1,loading:!1}}).catch(a=>{r.value={...r.value,loading:!1}})};return(e,a)=>(m(),_("div",pe,[t(ae,{options:p.value,onImported:I,class:"mb-3"},null,8,["options"]),t(P,{class:"rounded-lg"},{default:c(()=>[t(L,{class:"d-flex align-center"},{default:c(()=>[t(V,{onClick:K,density:"compact",size:"35",class:"rounded-xl elevation-2 mr-2"},{default:c(()=>[t(k,{size:"small",icon:x(J)},null,8,["icon"])]),_:1}),ve]),_:1}),t(U,null,{default:c(()=>[me,v.value&&v.value.length>0?(m(),_("tbody",fe,[(m(!0),_(q,null,Q(v.value,i=>(m(),_("tr",{key:i.id},[o("td",null,z(i.title),1),o("td",null,z(i.ecd_type),1),o("td",null,[o("div",ge,[t(k,{size:"small",onClick:()=>R(i),icon:x(W),class:"mx-1"},null,8,["onClick","icon"]),t(k,{size:"small",onClick:()=>M(i),icon:x(Y),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])):C("",!0)]),_:1}),v.value&&v.value.length==0?(m(),w(P,{key:0},{default:c(()=>[t(X,{class:"text-center"},{default:c(()=>[$(" No records found ")]),_:1})]),_:1})):C("",!0)]),_:1}),y.value>1?(m(),w(G,{key:0,modelValue:s.value,"onUpdate:modelValue":a[0]||(a[0]=i=>s.value=i),class:"my-4",length:y.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):C("",!0),t(te,{"kpi-options":l.value,"is-hr":!0,onSave:E},null,8,["kpi-options"]),t(Z,{options:r.value,onConfirm:O},null,8,["options"]),t(ee,{options:n.value},null,8,["options"])]))}},_e={class:"v-col-12"},$e={__name:"HrMasterKpi",setup(N){const h=A(),d=u("kpi"),f=n=>{d.value!==n&&(d.value=n,h.push({name:"HrMasterKpi",params:{type:d.value}}).catch(p=>{}))};return(n,p)=>(m(),w(le,{class:"pb-16"},{default:c(()=>[t(oe,{title:"KPI Master List"}),t(se,{class:"my-5"},{default:c(()=>[o("div",_e,[t(V,{size:"x-large",color:`${d.value=="kpi"?"primary":""}`,readonly:`${d.value=="kpi"}`,class:"px-12 mr-3",onClick:p[0]||(p[0]=()=>f("kpi"))},{default:c(()=>[$(" KPI ")]),_:1},8,["color","readonly"]),t(V,{size:"x-large",color:`${d.value=="ecd"?"primary":""}`,readonly:`${d.value=="ecd"}`,class:"px-12",onClick:p[1]||(p[1]=()=>f("ecd"))},{default:c(()=>[$(" ECD ")]),_:1},8,["color","readonly"])]),S(t(de,null,null,512),[[j,d.value=="kpi"]]),S(t(he,null,null,512),[[j,d.value=="ecd"]])]),_:1})]),_:1}))}};export{$e as default};
