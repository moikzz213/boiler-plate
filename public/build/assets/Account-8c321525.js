import{r as c,u as g,c as r,w as s,V as w,o as n,a as t,f as i,v as d,n as p,e as m,i as y}from"./app-cd5d535f.js";import{_ as h,a as k,b as x}from"./ChangePassword-ee3a0917.js";import{_ as V}from"./SnackBar-1113efc5.js";import"./index.esm-ad92a975.js";import"./_commonjsHelpers-042e6b4d.js";import"./clientApi-8a9bbd48.js";const C={class:"v-col-12 v-col-md-8"},$={class:"d-flex flex-wrap"},b={class:"v-col-12 v-col-md-8"},P={__name:"Account",setup(B){const f=c({status:!1,type:"primary",text:null}),_=g(),e=c({loading:!1,data:Object.assign({},_.authProfile)}),a=c("profile"),u=async l=>{a.value=l},v=l=>{f.value={status:!0,type:"success",text:l}};return(l,o)=>(n(),r(w,{class:"pb-16"},{default:s(()=>[t(y,{class:"mt-10 mb-5"},{default:s(()=>[i("div",C,[i("div",$,[t(d,{color:`${a.value=="profile"?"primary":"white"} `,size:"large",class:"mr-3",loading:e.value.loading,onClick:o[0]||(o[0]=()=>u("profile"))},{default:s(()=>[p("profile")]),_:1},8,["color","loading"]),t(d,{color:`${a.value=="account"?"primary":"white"} `,size:"large",class:"mr-3",loading:e.value.loading,onClick:o[1]||(o[1]=()=>u("account"))},{default:s(()=>[p("Account")]),_:1},8,["color","loading"]),t(d,{color:`${a.value=="change_password"?"primary":"white"} `,size:"large",class:"mr-3",loading:e.value.loading,onClick:o[2]||(o[2]=()=>u("change_password"))},{default:s(()=>[p("Change Password")]),_:1},8,["color","loading"])])]),i("div",b,[a.value==="account"?(n(),r(h,{key:0,user:e.value.data,onSaved:v},null,8,["user"])):m("",!0),a.value=="profile"?(n(),r(k,{key:1,user:e.value.data,onSaved:v},null,8,["user"])):m("",!0),a.value=="change_password"?(n(),r(x,{key:2,user:e.value.data},null,8,["user"])):m("",!0)])]),_:1}),t(V,{options:f.value},null,8,["options"])]),_:1}))}};export{P as default};
