import{r as n,u as _,c as g,w as l,V as w,o as h,a,f as i,H as c,C as u,q as d,v as p,i as x}from"./app-5f1a8830.js";import{_ as y,a as C,b as V}from"./ChangePassword-38417d20.js";import{_ as $}from"./SnackBar-98b82411.js";import"./_commonjsHelpers-042e6b4d.js";const b={class:"v-col-12 v-col-md-8"},k={class:"d-flex flex-wrap"},S={class:"v-col-12 v-col-md-8"},O={__name:"Account",setup(B){const v=n({status:!1,type:"primary",text:null}),m=_(),e=n({loading:!1,data:Object.assign({},m.authProfile)}),s=n("profile"),r=async t=>{s.value=t},f=t=>{v.value={status:!0,type:"success",text:t}};return(t,o)=>(h(),g(w,{class:"pb-16"},{default:l(()=>[a(x,{class:"mt-10 mb-5"},{default:l(()=>[i("div",b,[i("div",k,[a(c,{color:`${s.value=="profile"?"primary":"white"} `,size:"large",class:"mr-3",loading:e.value.loading,onClick:o[0]||(o[0]=()=>r("profile"))},{default:l(()=>[u("profile")]),_:1},8,["color","loading"]),a(c,{color:`${s.value=="account"?"primary":"white"} `,size:"large",class:"mr-3",loading:e.value.loading,onClick:o[1]||(o[1]=()=>r("account"))},{default:l(()=>[u("Account")]),_:1},8,["color","loading"]),a(c,{color:`${s.value=="change_password"?"primary":"white"} `,size:"large",class:"mr-3",loading:e.value.loading,onClick:o[2]||(o[2]=()=>r("change_password"))},{default:l(()=>[u("Change Password")]),_:1},8,["color","loading"])])]),i("div",S,[d(a(y,{user:e.value.data,onSaved:f},null,8,["user"]),[[p,s.value=="account"]]),d(a(C,{user:e.value.data,onSaved:f},null,8,["user"]),[[p,s.value=="profile"]]),d(a(V,{user:e.value.data},null,8,["user"]),[[p,s.value=="change_password"]])])]),_:1}),a($,{options:v.value},null,8,["options"])]),_:1}))}};export{O as default};
