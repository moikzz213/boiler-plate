import{u as w,m as R,a as N,r as d,J as x,c as h,w as o,V as A,o as i,d as s,b as e,l as P,e as T,I as V,t as p,j as B,n as y,K as E,x as C,y as F,F as I,L,f as k,H as U,M as j,N as H,O as $}from"./app-47bd7f18.js";import{m as D,a as J}from"./mdi-ef0a081c.js";import{c as K}from"./clientApi-4854dc50.js";import{_ as M}from"./pageHeader-5a0ce524.js";const O={class:"v-col-12"},q={class:"v-col-12 v-col-md-6 text-primary text-capitalize"},G={class:"v-col-12 v-col-md-6"},Q=e("thead",null,[e("tr",null,[e("th",{class:"text-left text-capitalize"},"Username"),e("th",{class:"text-left text-capitalize"},"Email"),e("th",{class:"text-left text-capitalize"},"Role"),e("th",{class:"text-left text-capitalize"},"Status"),e("th",{class:"text-right text-capitalize"},"Actions")])],-1),W={class:"d-flex align-center justify-end"},ta={__name:"Users",setup(X){const _=w(),v=R(),z=N(),n=d({loading:!1,data:[]}),f=d(0),g=d(0),r=d(v.params&&v.params.page?v.params.page:1),m=async(l,t)=>{let a="/api/admin/user/all?&filter[employee]="+l;a+="&page="+t,n.value.loading=!0,await K(z.authToken).get(a).then(c=>{f.value=c.data.last_page,r.value=c.data.current_page,g.value=c.data.total,n.value.data=c.data.data,n.value.loading=!1}).catch(c=>{n.value.loading=!1,console.log(c)})};x(r,(l,t)=>{l!=t&&(_.push({name:"PaginatedUsers",params:{page:r.value}}).catch(a=>{}),m(u.value,r.value))}),m(null,r.value);const u=d("");x(u,(l,t)=>{l!=t&&l.length>3&&m(u.value,1)});const S=()=>{m(null,1).then(()=>{u.value=""})},b=l=>{_.push({name:"EditUser",params:{ecode:l}}).catch(()=>{})};return(l,t)=>(i(),h(A,null,{default:o(()=>[s(M,{title:"Users"}),s(V,{class:"mb-3"},{default:o(()=>[e("div",O,[s(P,{loading:n.value.loading},{default:o(()=>[s(T,{class:"pt-3"},{default:o(()=>[s(V,{class:"pa-0"},{default:o(()=>[e("div",q," Users "+p("("+g.value+")"),1),e("div",G,[s(B,{modelValue:u.value,"onUpdate:modelValue":t[0]||(t[0]=a=>u.value=a),label:"Search",variant:"outlined",density:"compact","hide-details":"","append-inner-icon":u.value!==""?y(D):null,"onClick:appendInner":S},null,8,["modelValue","append-inner-icon"])])]),_:1})]),_:1}),s(E,null,{default:o(()=>[Q,e("tbody",null,[(i(!0),C(I,null,F(n.value.data,a=>(i(),C("tr",{key:a.id},[e("td",null,p(a.username),1),e("td",null,p(a.email),1),e("td",null,p(a.role=="app_admin"?"Super admin":a.role=="hr_admin"?"HR Admin":a.role),1),e("td",null,[s(H,{class:"text-uppercase",size:"small",color:`${a.status.toLowerCase()=="active"?"success":"error"}`},{default:o(()=>[k(p(a.status),1)]),_:2},1032,["color"])]),e("td",null,[e("div",W,[s($,{size:"small",onClick:()=>b(a.ecode),icon:y(J),class:"mx-1"},null,8,["onClick","icon"])])])]))),128))])]),_:1}),n.value.data.length==0?(i(),h(L,{key:0,class:"pa-3 text-center w-100"},{default:o(()=>[k("No records found")]),_:1})):U("",!0)]),_:1},8,["loading"]),f.value>1?(i(),h(j,{key:0,modelValue:r.value,"onUpdate:modelValue":t[1]||(t[1]=a=>r.value=a),class:"my-4",length:f.value,"total-visible":8,variant:"elevated","active-color":"primary",density:"comfortable"},null,8,["modelValue","length"])):U("",!0)])]),_:1})]),_:1}))}};export{ta as default};
