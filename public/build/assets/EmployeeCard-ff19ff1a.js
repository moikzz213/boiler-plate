import{k as v,r as n,L as f,N as _,o as h,b as m,a as r,w as g,f as s,A as l,d as c,a1 as y,X as x}from"./app-6bac03f7.js";import{p as S}from"./printInitials-a54a9c4a.js";import{a as I}from"./mdi-a0a77bee.js";const k={class:"d-flex align-center"},z={class:"text-primary",style:{"font-size":"20px","line-height":"20px"}},D={class:"pl-2"},w={class:"text-capitalize mb-1",style:{"font-size":"12px","line-height":"14px"}},b={style:{"font-size":"10px","line-height":"12px"}},A={class:"d-flex align-center"},B={style:{"font-size":"10px","line-height":"12px"}},P={__name:"EmployeeCard",props:{profile:{type:Object,default:null}},setup(u){const a=u,p=v(),e=n({display_name:"Steve Ayala",designation:"Sr. Full Stack Software Developer",ecode:"100194",status:"locked"}),d=n(new Date),i=f(()=>{if(a.profile&&a.profile.length>0?e.value=a.profile[0]:e.value=a.profile,e.value&&(e.value.status=="Inactive"||e.value.status=="InActive"))return e.value.status;if(e.value&&e.value.reviews&&e.value.reviews.length>0)return e.value.reviews[0].status;{let t=p.filteredSetting(e.value.company_id);if(t&&t.id){if(e.value.is_regular==0){let o=new Date(e.value.doj);if(o.setDate(o.getDate()+parseInt(t.probation_kpi_setting)),o>=d.value)return"open"}return t.status}return"locked"}});return _(()=>a.profile,t=>{t&&t.length>0?e.value=t[0]:e.value=t}),(t,o)=>(h(),m("div",k,[r(y,{color:"grey-lighten-1",size:"55"},{default:g(()=>[s("div",z,l(c(S)(e.value.display_name)),1)]),_:1}),s("div",D,[s("div",w,l(e.value.display_name)+" "+l(e.value.ecode?" ("+e.value.ecode+")":""),1),s("div",b,l(e.value.designation),1),s("div",A,[r(x,{size:"16",color:`${i.value=="locked"||i.value=="closed"||i.value=="Inactive"?"error":"success"}`,icon:c(I)},null,8,["color","icon"]),s("div",B,l(i.value),1)])])]))}};export{P as _};
