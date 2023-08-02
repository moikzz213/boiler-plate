import{u as E,z as F,L as S,r as d,O as $,l as D,c as V,w as s,V as U,o as v,a,f as o,g as C,B as I,H as _,Y as T,d as P,a2 as L,b as k,F as G,n as H,e as w,h as K,C as g,R as Y,i as b,A as h,G as q,K as J,I as Q}from"./app-a896bdf4.js";import{c as W,f as X}from"./mdi-5e26928d.js";import{c as z}from"./clientApi-9386cc27.js";import{_ as Z}from"./PageHeader-73e01ca8.js";import{_ as ee}from"./ConfirmDialog-18343b3a.js";import{_ as ae}from"./SnackBar-4d027b18.js";const te={class:"v-col-12"},le=o("div",{class:"text-primary text-capitalize"},"Measures",-1),se=o("thead",null,[o("tr",null,[o("th",{class:"text-left text-capitalize"},"Title"),o("th",{class:"text-center text-capitalize"},"Status"),o("th",{class:"text-right text-capitalize"},"Actions")])],-1),oe={key:0},ue={class:"text-center"},ne={class:"d-flex align-center justify-end"},ie={class:Q("v-col-12 px-4")},re={class:"v-col-12"},de={class:"v-col-12 py-0"},ce={class:"v-col-12 d-flex justify-end"},xe={__name:"Measures",setup(ve){const m=E(),M=F(),x=S(),p=d({}),c=d([]),t=d({title:"",data:{},loading:!1,dialog:!1,action:"add"}),y=d(0),n=d(x.params&&x.params.page?x.params.page:1),f=async l=>{await z(m.authToken).get("/api/hr/measures?page="+l).then(e=>{y.value=e.data.last_page,n.value=e.data.current_page,c.value=e.data.data}).catch(e=>{console.log("measures",e)})},R=async()=>{let l={profile_id:m.authProfile.id,id:t.value.action=="edit"?t.value.data.id:null,title:t.value.data.title};t.value.loading=!0,await z(m.authToken).post("/api/hr/measure/save",l).then(e=>{f(n.value).then(()=>{t.value.loading=!1,t.value.dialog=!1,p.value={status:!0,type:"success",text:e.data.message}})}).catch(e=>{t.value.loading=!1,console.log("measures",e),p.value={status:!0,type:"error",text:"Error while saving measure"}})},B=()=>{t.value={...t.value,title:"Add Measure",data:{},dialog:!0,action:"add"}},A=l=>{t.value={...t.value,title:"Edit "+l.title,data:Object.assign({},l),dialog:!0,action:"edit"}};$(n,(l,e)=>{l!=e&&(M.push({name:"PaginatedMeasures",params:{page:n.value}}).catch(u=>{}),f(n.value))}),D(()=>{f(n.value)});const i=d({}),r=d({}),N=l=>{r.value=Object.assign({},l),r.value.new_status=r.value.status=="active"?"inactive":"active",i.value={dialog:!0,title:"Confirm",text:"Please confirm that you want to update the status of "+l.title+" to "+r.value.new_status+".",btnColor:r.value.new_status=="active"?"success":"error",btnTitle:r.value.new_status}},O=async()=>{let l={status:r.value.new_status,profile_id:m.authProfile.id};await z(m.authToken).post("/api/hr/measure/update-status/"+r.value.id,l).then(e=>{f(n.value).then(()=>{p.value={status:!0,type:"success",text:e.data.message}})}).catch(e=>{p.value={status:!0,type:"error",text:"Error while removing data"}})},j=l=>{i.value={...i.value,loading:!0},O().then(e=>{i.value={...i.value,dialog:!1,loading:!1}}).catch(e=>{i.value={...i.value,loading:!1}})};return(l,e)=>(v(),V(U,{class:"pb-16"},{default:s(()=>[a(Z,{title:"Measures"}),a(b,{class:"my-5"},{default:s(()=>[o("div",te,[a(C,{class:"rounded-lg"},{default:s(()=>[a(I,{class:"d-flex align-center"},{default:s(()=>[a(_,{onClick:B,density:"compact",size:"35",class:"rounded-xl elevation-2 mr-2"},{default:s(()=>[a(T,{size:"small",icon:P(W)},null,8,["icon"])]),_:1}),le]),_:1}),a(L,null,{default:s(()=>[se,c.value&&c.value.length>0?(v(),k("tbody",oe,[(v(!0),k(G,null,H(c.value,u=>(v(),k("tr",{key:u.id},[o("td",null,h(u.title),1),o("td",ue,[a(_,{size:"small",onClick:()=>N(u),color:u.status=="active"?"success":"error",class:"mx-1 rounded-xl"},{default:s(()=>[g(h(u.status),1)]),_:2},1032,["onClick","color"])]),o("td",null,[o("div",ne,[a(T,{size:"small",onClick:()=>A(u),icon:P(X),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])):w("",!0)]),_:1}),c.value&&c.value.length==0?(v(),V(C,{key:0},{default:s(()=>[a(K,{class:"text-center"},{default:s(()=>[g(" No records found ")]),_:1})]),_:1})):w("",!0)]),_:1}),y.value>1?(v(),V(Y,{key:0,modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=u=>n.value=u),class:"my-4",length:y.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):w("",!0)])]),_:1}),a(J,{modelValue:t.value.dialog,"onUpdate:modelValue":e[3]||(e[3]=u=>t.value.dialog=u),width:"100%","max-width":"480px",persistent:""},{default:s(()=>[a(C,{class:"rounded-lg"},{default:s(()=>[a(b,{class:"ma-0 pa-0"},{default:s(()=>[o("div",ie,[a(b,null,{default:s(()=>[o("div",re,h(t.value.title)+" "+h(),1),o("div",de,[a(q,{modelValue:t.value.data.title,"onUpdate:modelValue":e[1]||(e[1]=u=>t.value.data.title=u),label:"Measure*",variant:"outlined",density:"compact"},null,8,["modelValue"])]),o("div",ce,[a(_,{color:"primary",variant:"text",onClick:e[2]||(e[2]=u=>t.value.dialog=!1)},{default:s(()=>[g("Cancel")]),_:1}),a(_,{color:"primary",loading:t.value.loading,class:"ml-2 px-8",onClick:R},{default:s(()=>[g("save")]),_:1},8,["loading"])])]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(ee,{options:i.value,onConfirm:j},null,8,["options"]),a(ae,{options:p.value},null,8,["options"])]),_:1}))}};export{xe as default};