import{r as p,N as g,o as v,c as x,w as e,a as t,g as C,B as _,C as o,A as s,h as V,f as r,H as d,J as b}from"./app-6bac03f7.js";const y={class:"pb-3 text-grey"},h={class:"d-flex justify-end mt-5"},B={__name:"ConfirmDialog",props:{options:{type:Object,default:null}},emits:["confirm"],setup(c,{emit:u}){const f=c,a=p({dialog:!1,title:"Confirm",text:"Please confirm <action>",btnColor:"primary",btnTitle:"Confirm",loading:!1}),m=()=>{u("confirm",!0)};return g(()=>f.options,i=>{a.value=Object.assign({},i)}),(i,l)=>(v(),x(b,{modelValue:a.value.dialog,"onUpdate:modelValue":l[1]||(l[1]=n=>a.value.dialog=n),width:"100%","max-width":"480",persistent:""},{default:e(()=>[t(C,{class:"rounded-lg"},{default:e(()=>[t(_,{class:"pa-3 pb-0"},{default:e(()=>[o(s(a.value.title),1)]),_:1}),t(V,{class:"px-3"},{default:e(()=>[r("div",y,s(a.value.text),1),r("div",h,[t(d,{class:"bg-grey-lighten-2 text-primary",variant:"text",onClick:l[0]||(l[0]=n=>a.value.dialog=!1)},{default:e(()=>[o("Cancel")]),_:1}),t(d,{color:a.value.btnColor,class:"ml-2",loading:a.value.loading,onClick:m},{default:e(()=>[o(s(a.value.btnTitle),1)]),_:1},8,["color","loading"])])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}};export{B as _};
