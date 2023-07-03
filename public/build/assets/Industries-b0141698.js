import{u as E,z as D,K as S,r,N as U,l as G,c as h,w as s,V as H,o as v,a as t,f as o,g as y,B as J,H as x,X as V,d as C,a2 as K,b as k,F as L,n as M,e as b,h as Q,C as w,Q as X,i as T,A as I,G as Y,J as q,Y as W}from"./app-b1ca44b3.js";import{c as Z,e as ee,f as ae}from"./mdi-a0a77bee.js";import{c as z}from"./clientApi-d5d9c19b.js";import{_ as te}from"./PageHeader-69a7fde8.js";import{_ as le}from"./ConfirmDialog-40523d9a.js";import{_ as se}from"./SnackBar-8eb48fe0.js";import{_ as oe}from"./ImportData-668440bc.js";import"./_commonjsHelpers-042e6b4d.js";import"./industry-5bc8933d.js";const ne={class:"v-col-12"},ie=o("div",{class:"text-primary text-capitalize"},"Industries",-1),ue=o("thead",null,[o("tr",null,[o("th",{class:"text-left text-capitalize"},"Title"),o("th",{class:"text-right text-capitalize"},"Actions")])],-1),re={key:0},de={class:"d-flex align-center justify-end"},ce={class:W("v-col-12 px-4")},ve={class:"v-col-12"},me={class:"v-col-12 py-0"},pe={class:"v-col-12 d-flex justify-end"},we={__name:"Industries",setup(fe){const p=E(),P=D(),f=S(),d=r({}),g=r({cardTitle:"Import Industries",endpoint:"/api/import/industries",templateFile:"import-template-industries.csv"}),B=a=>{a.status==!0?m(1).then(()=>{d.value={status:!0,type:"success",text:a.message},g.value={...g.value,loading:!1,dialog:!1}}):d.value={status:!0,type:"error",text:a.message}},c=r([]),l=r({title:"",data:{},loading:!1,dialog:!1,action:"add"}),_=r(0),i=r(f.params&&f.params.page?f.params.page:1),m=async a=>{await z(p.authToken).get("/api/hr/industries?page="+a).then(e=>{_.value=e.data.last_page,i.value=e.data.current_page,c.value=e.data.data}).catch(e=>{console.log("industries",e)})},N=async()=>{let a={id:l.value.action=="edit"?l.value.data.id:null,title:l.value.data.title};l.value.loading=!0,await z(p.authToken).post("/api/hr/industry/save",a).then(e=>{m(i.value).then(()=>{l.value.loading=!1,l.value.dialog=!1,d.value={status:!0,type:"success",text:e.data.message}})}).catch(e=>{l.value.loading=!1,console.log("industries",e),d.value={status:!0,type:"error",text:"Error while saving company"}})},A=()=>{l.value={...l.value,title:"Add Industry",data:{},dialog:!0,action:"add"}},F=a=>{l.value={...l.value,title:"Edit "+a.title,data:Object.assign({},a),dialog:!0,action:"edit"}};U(i,(a,e)=>{a!=e&&(P.push({name:"PaginatedIndustries",params:{page:i.value}}).catch(n=>{}),m(i.value))}),G(()=>{m(i.value)});const u=r({}),R=r({}),O=a=>{R.value=Object.assign({},a),u.value={dialog:!0,title:"Confirm Remove",text:"Please confirm that you want to remove "+a.title+".",btnColor:"error",btnTitle:"Confirm"}},$=async()=>{await z(p.authToken).post("/api/hr/industry/remove/"+R.value.id).then(a=>{m(i.value).then(()=>{d.value={status:!0,type:"success",text:a.data.message}})}).catch(a=>{d.value={status:!0,type:"error",text:"Error while removing data"}})},j=a=>{u.value={...u.value,loading:!0},$().then(e=>{u.value={...u.value,dialog:!1,loading:!1}}).catch(e=>{u.value={...u.value,loading:!1}})};return(a,e)=>(v(),h(H,{class:"pb-16"},{default:s(()=>[t(te,{title:"Industries"}),t(T,{class:"my-5"},{default:s(()=>[o("div",ne,[t(oe,{options:g.value,onImported:B,class:"mb-3"},null,8,["options"]),t(y,{class:"rounded-lg"},{default:s(()=>[t(J,{class:"d-flex align-center"},{default:s(()=>[t(x,{onClick:A,density:"compact",size:"35",class:"rounded-xl elevation-2 mr-2"},{default:s(()=>[t(V,{size:"small",icon:C(Z)},null,8,["icon"])]),_:1}),ie]),_:1}),t(K,null,{default:s(()=>[ue,c.value&&c.value.length>0?(v(),k("tbody",re,[(v(!0),k(L,null,M(c.value,n=>(v(),k("tr",{key:n.id},[o("td",null,I(n.title),1),o("td",null,[o("div",de,[t(V,{size:"small",onClick:()=>F(n),icon:C(ee),class:"mx-1"},null,8,["onClick","icon"]),t(V,{size:"small",onClick:()=>O(n),icon:C(ae),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])):b("",!0)]),_:1}),c.value&&c.value.length==0?(v(),h(y,{key:0},{default:s(()=>[t(Q,{class:"text-center"},{default:s(()=>[w(" No records found ")]),_:1})]),_:1})):b("",!0)]),_:1}),_.value>1?(v(),h(X,{key:0,modelValue:i.value,"onUpdate:modelValue":e[0]||(e[0]=n=>i.value=n),class:"my-4",length:_.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):b("",!0)])]),_:1}),t(q,{modelValue:l.value.dialog,"onUpdate:modelValue":e[3]||(e[3]=n=>l.value.dialog=n),width:"100%","max-width":"480px",persistent:""},{default:s(()=>[t(y,{class:"rounded-lg"},{default:s(()=>[t(T,{class:"ma-0 pa-0"},{default:s(()=>[o("div",ce,[t(T,null,{default:s(()=>[o("div",ve,I(l.value.title)+" "+I(),1),o("div",me,[t(Y,{modelValue:l.value.data.title,"onUpdate:modelValue":e[1]||(e[1]=n=>l.value.data.title=n),label:"Industry*",variant:"outlined",density:"compact"},null,8,["modelValue"])]),o("div",pe,[t(x,{onClick:e[2]||(e[2]=n=>l.value.dialog=!1),color:"primary",variant:"text"},{default:s(()=>[w("Cancel")]),_:1}),t(x,{color:"primary",loading:l.value.loading,class:"ml-2 px-8",onClick:N},{default:s(()=>[w("save")]),_:1},8,["loading"])])]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(le,{options:u.value,onConfirm:j},null,8,["options"]),t(se,{options:d.value},null,8,["options"])]),_:1}))}};export{we as default};