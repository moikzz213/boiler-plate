import{r as u,J as p,o as c,c as i,w as e,d,k as f,f as l,t as v,aa as m}from"./app-47bd7f18.js";const x={__name:"SnackBar",props:{options:{type:Object,default:null}},setup(r){const n=r,a=u({status:!1,type:"primary",text:"Default Message"});return p(()=>n.options,s=>{a.value={...a.value,...s}}),(s,t)=>(c(),i(m,{modelValue:a.value.status,"onUpdate:modelValue":t[1]||(t[1]=o=>a.value.status=o),color:a.value.type},{actions:e(()=>[d(f,{color:"white",variant:"text",onClick:t[0]||(t[0]=o=>a.value=!1)},{default:e(()=>[l(" Close ")]),_:1})]),default:e(()=>[l(v(a.value.text)+" ",1)]),_:1},8,["modelValue","color"]))}};export{x as _};
