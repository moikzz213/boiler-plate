import{r as e,c as x,w as s,o as h,f as i,a,t as c,m as _,n as m,h as g,s as w,v as V,g as y}from"./app-8fe9e63b.js";import{a as C}from"./clientApi-d2428626.js";import{G as b,W as B}from"./WhiteLogo-91dc91b1.js";import"./_plugin-vue_export-helper-c27b6911.js";const E={class:"mx-auto px-3 text-center",style:{"z-index":"1","max-width":"400px",width:"100%","margin-top":"100px"}},P={class:"text-subtitle-1 text-white"},k={class:"text-info mt-4 text-center"},A={__name:"ResetPasswordMail",setup(G){const p=e("GAG - Performance Management System"),o=e(!1),t=e({ecode:""}),l=e(!1),r=e(""),n=e(!1),v=()=>{if(l.value=!1,t.value.ecode.length==0){r.value="Enter Employee Code.",l.value=!0;return}n.value=!0,o.value=!0,C.post("/api/send-mail-reset-password",{ecode:t.value.ecode}).then(d=>{o.value=!1,r.value=d.data.message,t.value.ecode=""}).catch(d=>{})};return(d,u)=>(h(),x(b,null,{default:s(()=>[i("div",E,[a(B,{width:"100%"}),i("div",P,c(p.value),1)]),a(y,{class:"mt-8 pa-3 rounded-lg elevation-3",width:"90%","max-width":"450"},{default:s(()=>[a(_,{class:"px-5 pb-0 primary--text"},{default:s(()=>[m("Reset Password")]),_:1}),a(g,{class:"py-4"},{default:s(()=>[a(w,{modelValue:t.value.ecode,"onUpdate:modelValue":u[0]||(u[0]=f=>t.value.ecode=f),variant:"outlined",class:"border-radius",autocomplete:"off",label:"Enter Employee Code",error:l.value},null,8,["modelValue","error"]),a(V,{onClick:v,width:"100%",color:"primary",height:"55",large:"",disabled:n.value,loading:o.value},{default:s(()=>[m("Send Password reset link")]),_:1},8,["disabled","loading"]),i("div",k,c(r.value),1)]),_:1})]),_:1})]),_:1}))}};export{A as default};
