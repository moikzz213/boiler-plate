import{z as S,K as N,u as R,r as i,N as x,c as h,w as o,V as A,o as d,a as s,f as a,g as B,B as P,i as V,A as p,G as T,d as y,a2 as E,b as C,n as F,F as j,ai as I,C as k,e as U,Q as L,aj as $,X as D}from"./app-fc232221.js";import{h as G,f as K}from"./mdi-6c0c9690.js";import{c as Q}from"./clientApi-9cd075be.js";import{_ as X}from"./pageHeader-4fe45fd2.js";const q={class:"v-col-12"},H={class:"v-col-12 v-col-md-6 text-primary text-capitalize"},J={class:"v-col-12 v-col-md-6"},M=a("thead",null,[a("tr",null,[a("th",{class:"text-left text-capitalize"},"Username"),a("th",{class:"text-left text-capitalize"},"Email"),a("th",{class:"text-left text-capitalize"},"Role"),a("th",{class:"text-left text-capitalize"},"Status"),a("th",{class:"text-right text-capitalize"},"Actions")])],-1),O={class:"d-flex align-center justify-end"},ta={__name:"Users",setup(W){const g=S(),v=N(),z=R(),n=i({loading:!1,data:[]}),f=i(0),_=i(0),u=i(v.params&&v.params.page?v.params.page:1),m=async(l,t)=>{let e="/api/admin/user/all?&filter[employee]="+l;e+="&page="+t,n.value.loading=!0,await Q(z.authToken).get(e).then(r=>{f.value=r.data.last_page,u.value=r.data.current_page,_.value=r.data.total,n.value.data=r.data.data,n.value.loading=!1}).catch(r=>{n.value.loading=!1,console.log(r)})};x(u,(l,t)=>{l!=t&&(g.push({name:"PaginatedUsers",params:{page:u.value}}).catch(e=>{}),m(c.value,u.value))}),m(null,u.value);const c=i("");x(c,(l,t)=>{l!=t&&l.length>3&&m(c.value,1)});const b=()=>{m(null,1).then(()=>{c.value=""})},w=l=>{g.push({name:"EditUser",params:{ecode:l}}).catch(()=>{})};return(l,t)=>(d(),h(A,null,{default:o(()=>[s(X,{title:"Users"}),s(V,{class:"mb-3"},{default:o(()=>[a("div",q,[s(B,{loading:n.value.loading},{default:o(()=>[s(P,{class:"pt-3"},{default:o(()=>[s(V,{class:"pa-0"},{default:o(()=>[a("div",H," Users "+p("("+_.value+")"),1),a("div",J,[s(T,{modelValue:c.value,"onUpdate:modelValue":t[0]||(t[0]=e=>c.value=e),label:"Search",variant:"outlined",density:"compact","hide-details":"","append-inner-icon":c.value!==""?y(G):null,"onClick:appendInner":b},null,8,["modelValue","append-inner-icon"])])]),_:1})]),_:1}),s(E,null,{default:o(()=>[M,a("tbody",null,[(d(!0),C(j,null,F(n.value.data,e=>(d(),C("tr",{key:e.id},[a("td",null,p(e.username),1),a("td",null,p(e.email),1),a("td",null,p(e.role),1),a("td",null,[s($,{class:"text-uppercase",size:"small",color:`${e.status.toLowerCase()=="active"?"success":"error"}`},{default:o(()=>[k(p(e.status),1)]),_:2},1032,["color"])]),a("td",null,[a("div",O,[s(D,{size:"small",onClick:()=>w(e.ecode),icon:y(K),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])]),_:1}),n.value.data.length==0?(d(),h(I,{key:0,class:"pa-3 text-center w-100"},{default:o(()=>[k("No records found")]),_:1})):U("",!0)]),_:1},8,["loading"]),f.value>1?(d(),h(L,{key:0,modelValue:u.value,"onUpdate:modelValue":t[1]||(t[1]=e=>u.value=e),class:"my-4",length:f.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):U("",!0)])]),_:1})]),_:1}))}};export{ta as default};