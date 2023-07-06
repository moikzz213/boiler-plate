import{u as z,r as i,c as I,w as o,V as K,o as U,a,f as l,G as O,H as m,C as v,$ as n,a0 as u,i as R}from"./app-50758a75.js";import{_ as N}from"./PageHeader-999a0d31.js";import{c as h}from"./clientApi-8525b7be.js";import{_ as F}from"./SnackBar-ae7b3790.js";const Y=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"Days interval reminder",-1),E={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},M={class:"btn-parent my-auto"},T=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"KPI Setting: Open",-1),B={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},D={class:"btn-parent my-auto"},A=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"KPI Setting: Review",-1),G={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},H={class:"btn-parent my-auto"},j=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"KPI Setting: Submit",-1),q={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},J={class:"btn-parent my-auto"},L=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"KPI Mid Year: Open",-1),Q={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},W={class:"btn-parent my-auto"},X=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"KPI Mid Year: Submit",-1),Z={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},ee={class:"btn-parent my-auto"},ae=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"KPI Year End: Open",-1),le={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},te={class:"btn-parent my-auto"},se=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"KPI Year End: Submit",-1),oe={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},ie={class:"btn-parent my-auto"},ne=l("div",{class:"mx-auto my-2 text-uppercase"}," Probation Notification Message",-1),de=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"Probation Setting: Open",-1),me={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},ve={class:"btn-parent my-auto"},ue=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"Probation Setting: Submit",-1),ce={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},re={class:"btn-parent my-auto"},pe=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"Probation First Review: Open",-1),_e={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},be={class:"btn-parent my-auto"},ye=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"Probation First Review: Submit",-1),fe={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},Ve={class:"btn-parent my-auto"},Se=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"Probation Final Review: Open",-1),ke={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},we={class:"btn-parent my-auto"},Pe=l("div",{class:"v-col-md-3 v-col-sm-12 my-0"},"Probation Final Review: Submit",-1),ge={class:"v-col-md-9 v-col-sm-12 d-flex parent-div"},xe={class:"btn-parent my-auto"},$e=l("div",{class:"v-col-md-12 mb-5"},null,-1),Oe={__name:"Notifications",setup(Ce){const $=z(),c=i(3),r=i(""),p=i(""),_=i(""),b=i(""),y=i(""),f=i(""),V=i(""),S=i(""),k=i(""),w=i(""),P=i(""),g=i(""),x=i(""),C=i({}),d=(s,e)=>{h($.authToken).post("/api/save/setting/notifications",{meta_key:s,meta_value:e}).then(t=>{C.value={status:!0,type:"success",text:"Data has been updated."}})};return(async()=>{h($.authToken).get("/api/fetch/setting/notifications").then(s=>{s.data&&s.data.length>12&&(c.value=s.data[13].meta_value,r.value=s.data[0].meta_value,p.value=s.data[1].meta_value,_.value=s.data[2].meta_value,b.value=s.data[3].meta_value,y.value=s.data[4].meta_value,f.value=s.data[5].meta_value,V.value=s.data[6].meta_value,S.value=s.data[7].meta_value,k.value=s.data[8].meta_value,w.value=s.data[9].meta_value,P.value=s.data[10].meta_value,g.value=s.data[11].meta_value,x.value=s.data[12].meta_value)}).catch(s=>{})})(),(s,e)=>(U(),I(K,null,{default:o(()=>[a(N,{title:"Setup Employee Email Notifications - Regular - Probation"}),a(R,{class:"mt-2"},{default:o(()=>[Y,l("div",E,[a(O,{"hide-details":"",class:"ma-0",modelValue:c.value,"onUpdate:modelValue":e[0]||(e[0]=t=>c.value=t),variant:"outlined",density:"compact",label:`Reminder Every ${c.value} days`},null,8,["modelValue","label"]),l("div",M,[a(m,{size:"small",onClick:e[1]||(e[1]=t=>d("default_reminder_days",c.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),T,l("div",B,[a(u,{"hide-details":"",class:"ma-0",modelValue:r.value,"onUpdate:modelValue":e[2]||(e[2]=t=>r.value=t),rows:"3",variant:"outlined",density:"compact",label:"KPI Setting: Open"},null,8,["modelValue"]),l("div",D,[a(m,{size:"small",onClick:e[3]||(e[3]=t=>d("kpi_setting_open",r.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),A,l("div",G,[a(u,{"hide-details":"",class:"ma-0",modelValue:p.value,"onUpdate:modelValue":e[4]||(e[4]=t=>p.value=t),rows:"3",variant:"outlined",density:"compact",label:"KPI Setting: Review"},null,8,["modelValue"]),l("div",H,[a(m,{size:"small",onClick:e[5]||(e[5]=t=>d("kpi_setting_review",p.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),j,l("div",q,[a(u,{"hide-details":"",class:"ma-0",modelValue:_.value,"onUpdate:modelValue":e[6]||(e[6]=t=>_.value=t),rows:"3",variant:"outlined",density:"compact",label:"KPI Setting: Submit"},null,8,["modelValue"]),l("div",J,[a(m,{size:"small",onClick:e[7]||(e[7]=t=>d("kpi_setting_submit",_.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),L,l("div",Q,[a(u,{"hide-details":"",class:"ma-0",modelValue:b.value,"onUpdate:modelValue":e[8]||(e[8]=t=>b.value=t),rows:"3",variant:"outlined",density:"compact",label:"KPI Mid Year: Open"},null,8,["modelValue"]),l("div",W,[a(m,{size:"small",onClick:e[9]||(e[9]=t=>d("kpi_mid_open",b.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),X,l("div",Z,[a(u,{"hide-details":"",class:"ma-0",modelValue:y.value,"onUpdate:modelValue":e[10]||(e[10]=t=>y.value=t),rows:"3",variant:"outlined",density:"compact",label:"KPI Mid Year: Submit"},null,8,["modelValue"]),l("div",ee,[a(m,{size:"small",onClick:e[11]||(e[11]=t=>d("kpi_mid_submit",y.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),ae,l("div",le,[a(u,{"hide-details":"",class:"ma-0",modelValue:f.value,"onUpdate:modelValue":e[12]||(e[12]=t=>f.value=t),rows:"3",variant:"outlined",density:"compact",label:"KPI Year End: Open"},null,8,["modelValue"]),l("div",te,[a(m,{size:"small",onClick:e[13]||(e[13]=t=>d("kpi_final_open",f.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),se,l("div",oe,[a(u,{"hide-details":"",class:"ma-0",modelValue:V.value,"onUpdate:modelValue":e[14]||(e[14]=t=>V.value=t),rows:"3",variant:"outlined",density:"compact",label:"KPI Year End: Submit"},null,8,["modelValue"]),l("div",ie,[a(m,{size:"small",onClick:e[15]||(e[15]=t=>d("kpi_final_submit",V.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n,{class:"mt-3"}),ne,a(n,{class:"mb-3"}),de,l("div",me,[a(u,{"hide-details":"",class:"ma-0",modelValue:S.value,"onUpdate:modelValue":e[16]||(e[16]=t=>S.value=t),rows:"3",variant:"outlined",density:"compact",label:"Probation Setting: Open"},null,8,["modelValue"]),l("div",ve,[a(m,{size:"small",onClick:e[17]||(e[17]=t=>d("probation_setting_open",S.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),ue,l("div",ce,[a(u,{"hide-details":"",class:"ma-0",modelValue:k.value,"onUpdate:modelValue":e[18]||(e[18]=t=>k.value=t),rows:"3",variant:"outlined",density:"compact",label:"Probation Setting: Submit"},null,8,["modelValue"]),l("div",re,[a(m,{size:"small",onClick:e[19]||(e[19]=t=>d("probation_setting_submitted",k.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),pe,l("div",_e,[a(u,{"hide-details":"",class:"ma-0",modelValue:w.value,"onUpdate:modelValue":e[20]||(e[20]=t=>w.value=t),rows:"3",variant:"outlined",density:"compact",label:"Probation First Review: Open"},null,8,["modelValue"]),l("div",be,[a(m,{size:"small",onClick:e[21]||(e[21]=t=>d("probation_mid_open",w.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),ye,l("div",fe,[a(u,{"hide-details":"",class:"ma-0",modelValue:P.value,"onUpdate:modelValue":e[22]||(e[22]=t=>P.value=t),rows:"3",variant:"outlined",density:"compact",label:"Probation First Review: Submit"},null,8,["modelValue"]),l("div",Ve,[a(m,{size:"small",onClick:e[23]||(e[23]=t=>d("probation_mid_submit",P.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),Se,l("div",ke,[a(u,{"hide-details":"",class:"ma-0",modelValue:g.value,"onUpdate:modelValue":e[24]||(e[24]=t=>g.value=t),rows:"3",variant:"outlined",density:"compact",label:"Probation Final Review: Open"},null,8,["modelValue"]),l("div",we,[a(m,{size:"small",onClick:e[25]||(e[25]=t=>d("probation_final_open",g.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),Pe,l("div",ge,[a(u,{"hide-details":"",class:"ma-0",modelValue:x.value,"onUpdate:modelValue":e[26]||(e[26]=t=>x.value=t),rows:"3",variant:"outlined",density:"compact",label:"Probation Final Review: Submit"},null,8,["modelValue"]),l("div",xe,[a(m,{size:"small",onClick:e[27]||(e[27]=t=>d("probation_final_submit",x.value)),class:"ml-2 save-btn",color:"primary"},{default:o(()=>[v("Save")]),_:1})])]),a(n),$e]),_:1}),a(F,{options:C.value},null,8,["options"])]),_:1}))}};export{Oe as default};
