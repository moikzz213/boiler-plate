import{r as m,N as E,o as d,b as R,a as i,w as u,g as Y,i as I,f as t,Y as G,A as y,c as p,M as ye,G as U,O as Ce,P as $e,I as ne,Z as Ie,$ as fe,a0 as ie,H as w,C as _,e as g,J as _e,F as ae,U as Re,S as Te,z as Fe,K as De,u as Se,k as Pe,L as ee,d as O,X as K,B as xe,h as le,q as we,n as ve,v as ke}from"./app-7250f283.js";import{b as Oe,c as ce,d as je,e as me,f as pe,g as ge}from"./mdi-7fd0807e.js";import{e as Ke}from"./vue-datepicker-1afa06fe.js";import{_ as he}from"./SnackBar-ec85d16e.js";const Ue={class:"v-col-12"},Ee={class:"v-col-12 v-col-md-6 py-0"},Be={class:"v-col-12 v-col-md-6 py-0"},Ae={class:"v-col-12 v-col-md-3 py-0 mb-2"},Le={class:"v-col-12 v-col-md-3 py-0 mb-2"},Me={class:"v-col-12 v-col-md-3 py-0 mb-2"},We={class:"v-col-12 v-col-md-3 py-0 mb-2"},ze={class:"v-col-12 py-0"},Ne={class:"v-col-12 pt-0"},Ye={class:"v-col-12 py-0"},Ge={class:"v-col-12 py-0"},He={class:"v-col-12 py-0"},qe={class:"v-col-12 py-0 hidden hide",hidden:""},Je={class:"v-col-12 py-0"},Xe={key:0,class:"v-col-12 d-flex justify-end"},Ze={key:0,class:"v-col-12 v-col-md-4 bg-grey-lighten-4"},Qe=t("div",{class:"v-col-12 px-1"},y("Review"),-1),et={class:"v-col-12 py-0 px-1 mt-3 mb-3 text-body-2"},tt={class:"v-col-12 v-col-md-12 py-0 px-1"},lt={class:"v-col-12 v-col-md-6 py-0 px-1"},at={class:"v-col-12 v-col-md-6 py-0 px-1 mb-3"},st={class:"v-col-12 v-col-md-12 py-0 px-1"},it={class:"v-col-12 py-0 px-1 mt-3 mb-3 text-body-2"},nt={class:"v-col-12 v-col-md-12 py-0 px-1"},ut={class:"v-col-12 py-0 px-1"},ot={class:"v-col-12 py-0 px-1 text-center mb-3"},dt={class:"v-col-12 d-flex justify-end"},rt={__name:"KpiDialog",props:{kpiOptions:{type:Object,default:null},submitButton:{type:Boolean,default:!0},industryList:{type:Object,default:null},remainWeightage:{type:Number,default:70},measuresList:{type:Object,default:null},finalReview:{type:Boolean,default:!1}},emits:["savedResponse"],setup(V,{emit:M}){const k=V,W=m({}),C=m(["min","max"]),q=m([]),b=m(["5%","10%","15%","20%","25%","30%"]),L=m(null),e=m({}),s=m({measures:null}),F=m([]),X=m([]),B=m(""),f=m(""),$=m(""),h=m(""),c=m(""),T=m(""),A=m(!1),S=m(!0),P=m([]),x=()=>{A.value=!0,e.value.data=s.value,e.value.industryTitle=T.value,setTimeout(()=>{A.value=!1,e.value.dialog=!1,M("savedResponse",e.value)},1200),B.value=k.kpiOptions.data.industry},se=()=>{e.value.dialog=!1,(e.value.action=="edit"||e.value.action=="review")&&(B.value=k.kpiOptions.data.industry,f.value=k.kpiOptions.data.title)},Z=()=>{k.finalReview.isFinal?e.value.state="final":e.value.state="mid",x()},D=r=>{h.value="",$.value="";let l=s.value.target/2;r.data.achievement_midyear&&(s.value.target_type=="max"?$.value=(l-r.data.achievement_midyear).toFixed(2):$.value=(r.data.achievement_midyear-l).toFixed(2),s.value.measures!="%"?h.value=s.value.target-r.data.achievement_midyear:h.value=s.value.target)},j=r=>{let l=r.data.target;r.data.revised_annual_target&&(l=r.data.revised_annual_target);let a=0;r.data.achievement_yearend&&(s.value.target_type=="max"?a=parseFloat(l/r.data.achievement_yearend).toFixed(2):a=parseFloat(r.data.achievement_yearend/l).toFixed(2),a>=100?c.value="Extremely Excellent":a>=90&&a<=99.99?c.value="Excellent":a>=70&&a<=89.99?c.value="Very Good":a>=50&&a<=69.99?c.value="Good":a>=35&&a<=49.99?c.value="Satisfactory":c.value="Poor")};E(()=>k.kpiOptions,r=>{A.value=!1,X.value=k.industryList,s.value=Object.assign({},r.data),e.value=Object.assign({},r),D(r),j(r),e.value.action=="edit"||e.value.action=="review"||e.value.action=="readonly"?(B.value=r.data.industry,f.value=r.data.title,L.value=r.data.weightage,S.value=!1):(B.value=null,f.value=null,L.value=null,S.value=!0)}),E(()=>s.value.achievement_midyear,r=>{h.value="",$.value="";let l=s.value.target/2,a="";s.value.measures=="%"&&(a="%"),r&&(s.value.target_type=="max"?$.value=(l-r).toFixed(2)+a:$.value=(r-l).toFixed(2)+a,s.value.measures!="%"?h.value=s.value.target-r:h.value=s.value.target)}),E(()=>s.value.achievement_yearend,r=>{c.value="";let l=s.value.target;s.value.revised_annual_target&&(l=s.value.revised_annual_target);let a=0;r&&(s.value.target_type=="max"?a=(l/r*100).toFixed(2):a=(r/l*100).toFixed(2),a>=100?c.value="Extremely Excellent":a>=90&&a<=99.99?c.value="Excellent":a>=70&&a<=89.99?c.value="Very Good":a>=50&&a<=69.99?c.value="Good":a>=35&&a<=49.99?c.value="Satisfactory":c.value="Poor")}),E(()=>B.value,r=>{F.value=[],q.value=k.measuresList,e.value.action=="add"?(S.value=!0,s.value={},f.value=null,r&&(P.value.push("industry"),z(),T.value=r.title,X.value.map(l=>{l.id==r.id&&(F.value=l.kpis)}))):(P.value.push("industry"),S.value=!1)}),E(()=>f.value,r=>{if(e.value.action=="add"){s.value={};let l=F.value.filter(a=>a.id==r);l&&l.length>0&&(s.value=l[0],S.value=!1,P.value.push("kpi"),z())}else P.value.push("kpi")}),E(()=>s.value.weightage,r=>{let l=!1;if(!isNaN(r)||r==null||r==null)l=!1;else if(e.value.action=="add")parseInt(r)>k.remainWeightage?(l=!1,W.value={status:!0,type:"error",text:"Weightage is over the limit!"}):l=!0;else{let a=parseInt(k.remainWeightage)+parseInt(L.value)-parseInt(r);parseInt(a)<0?(l=!1,W.value={status:!0,type:"error",text:"Weightage is over the limit!"}):L.value>parseInt(r)||parseInt(a)>=0?l=!0:l=!1}l?(P.value.push("weightage"),z()):N("weightage")});const z=()=>{P.value=P.value.filter((r,l)=>P.value.indexOf(r)===l)},N=r=>{const l=P.value.indexOf(r);l>-1&&P.value.splice(l,1)};return E(()=>s.value.target,r=>{r?(P.value.push("target"),z()):N("target")}),E(()=>s.value.measures,r=>{r?(P.value.push("measures"),z()):N("measures")}),E(()=>s.value.target_type,r=>{P.value.push("target_type"),z(),r=="min"?s.value.evaluation_pattern='<span style="color:green">Positive Ranking = Exceeding the Target</span> <br/><span style="color:red">Negative Ranking = Falling short of the Target</span>':r=="max"?s.value.evaluation_pattern='<span style="color:green">Positive Ranking = Falling short of the Target</span> <br/><span style="color:red">Negative Ranking = Exceeding the Target</span>':(N("target_type"),s.value.evaluation_pattern="")}),(r,l)=>(d(),R(ae,null,[i(_e,{modelValue:e.value.dialog,"onUpdate:modelValue":l[22]||(l[22]=a=>e.value.dialog=a),width:"100%","max-width":`${e.value.is_review==!0?"1240":"900"} `,persistent:""},{default:u(()=>[i(Y,{class:"rounded-lg"},{default:u(()=>[i(I,{class:"ma-0 pa-0"},{default:u(()=>[t("div",{class:G(`v-col-12 ${e.value.is_review==!0?"v-col-md-8":""} px-4`)},[i(I,null,{default:u(()=>[t("div",Ue,y(e.value.title),1),t("div",Ee,[e.value.action=="add"?(d(),p(ye,{key:0,modelValue:B.value,"onUpdate:modelValue":l[0]||(l[0]=a=>B.value=a),items:V.industryList,"item-title":"title","item-value":"title","hide-details":"","return-object":"",variant:"outlined",density:"compact",label:"Select Industry*"},null,8,["modelValue","items"])):(d(),p(U,{key:1,modelValue:B.value,"onUpdate:modelValue":l[1]||(l[1]=a=>B.value=a),"hide-details":"",variant:"outlined",density:"compact",label:"Select Industry*",class:"bg-grey-lighten-4 mb-3"},null,8,["modelValue"]))]),t("div",Be,[e.value.action=="add"?(d(),p(ye,{key:0,modelValue:f.value,"onUpdate:modelValue":l[2]||(l[2]=a=>f.value=a),items:F.value,"item-title":"title","item-value":"id",variant:"outlined",density:"compact",label:"Select KPI*"},{selection:u(({props:a,item:Q})=>[t("span",Ce($e(a)),y((Q==null?void 0:Q.title.substring(0,35))+"..."),17)]),_:1},8,["modelValue","items"])):(d(),p(U,{key:1,modelValue:f.value,"onUpdate:modelValue":l[3]||(l[3]=a=>f.value=a),"hide-details":"",variant:"outlined",density:"compact",label:"Select KPI*",class:"bg-grey-lighten-4 mb-3"},null,8,["modelValue"]))]),t("div",Ae,[!S.value&&!e.value.is_review?(d(),p(ne,{key:0,modelValue:s.value.target_type,"onUpdate:modelValue":l[4]||(l[4]=a=>s.value.target_type=a),items:C.value,label:"Target Type*",variant:"outlined",density:"compact"},null,8,["modelValue","items"])):(d(),p(U,{key:1,modelValue:s.value.target_type,"onUpdate:modelValue":l[5]||(l[5]=a=>s.value.target_type=a),"hide-details":"",variant:"outlined",density:"compact",label:"Target Type*",class:"bg-grey-lighten-4 mb-3"},null,8,["modelValue"]))]),t("div",Le,[i(U,{readonly:S.value||e.value.is_review,class:G(`${S.value||e.value.is_review?"bg-grey-lighten-4 mb-3":""}`),"hide-details":"",type:"number",modelValue:s.value.target,"onUpdate:modelValue":l[6]||(l[6]=a=>s.value.target=a),label:"Target*",variant:"outlined",density:"compact","persistent-hint":""},null,8,["readonly","class","modelValue"])]),t("div",Me,[!S.value&&!e.value.is_review?(d(),p(ne,{key:0,modelValue:s.value.measures,"onUpdate:modelValue":l[7]||(l[7]=a=>s.value.measures=a),items:q.value,label:"Measures*",variant:"outlined",density:"compact"},null,8,["modelValue","items"])):(d(),p(U,{key:1,modelValue:s.value.measures,"onUpdate:modelValue":l[8]||(l[8]=a=>s.value.measures=a),"hide-details":"",variant:"outlined",density:"compact",label:"Measures*",class:"bg-grey-lighten-4 mb-3"},null,8,["modelValue"]))]),t("div",We,[!S.value&&!e.value.is_review?(d(),p(ne,{key:0,modelValue:s.value.weightage,"onUpdate:modelValue":l[9]||(l[9]=a=>s.value.weightage=a),items:b.value,label:"KPI's Weightage (%)*",variant:"outlined",density:"compact"},null,8,["modelValue","items"])):(d(),p(U,{key:1,modelValue:s.value.weightage,"onUpdate:modelValue":l[10]||(l[10]=a=>s.value.weightage=a),"hide-details":"",variant:"outlined",density:"compact",label:"KPI's Weightage (%)*",class:"bg-grey-lighten-4 mb-3"},null,8,["modelValue"]))]),t("div",ze,[i(I,{class:"mx-0 mb-3"},{default:u(()=>[i(Ie,{class:"pa-3 bg-grey-lighten-4",style:{border:"1px solid #b1b1b1","border-radius":"5px","min-height":"70px"},innerHTML:s.value.evaluation_pattern},null,8,["innerHTML"])]),_:1})]),t("div",Ne,[i(fe,{class:"mx-auto"})]),t("div",Ye,[i(ie,{"auto-grow":"",modelValue:s.value.definition,"onUpdate:modelValue":l[11]||(l[11]=a=>s.value.definition=a),readonly:S.value||e.value.action=="edit"||e.value.is_review,label:"KPI Definition*",variant:"outlined",rows:"2"},null,8,["modelValue","readonly"])]),t("div",Ge,[i(ie,{"auto-grow":"",modelValue:s.value.formula,"onUpdate:modelValue":l[12]||(l[12]=a=>s.value.formula=a),class:"bg-grey-lighten-4 mb-4","hide-details":"",readonly:"",label:"Calculation Formula*",variant:"outlined",rows:"2"},null,8,["modelValue"])]),t("div",He,[i(ie,{"auto-grow":"",modelValue:s.value.subordinate_measures,"onUpdate:modelValue":l[13]||(l[13]=a=>s.value.subordinate_measures=a),class:"bg-grey-lighten-4 mb-4","hide-details":"",readonly:"",label:"Subordinate Measures*",variant:"outlined",rows:"2"},null,8,["modelValue"])]),t("div",qe,[i(ie,{"auto-grow":"",modelValue:s.value.calculation_example,"onUpdate:modelValue":l[14]||(l[14]=a=>s.value.calculation_example=a),class:"bg-grey-lighten-4 mb-4","hide-details":"",readonly:"",label:"KPI Calculation Example*",variant:"outlined",rows:"2"},null,8,["modelValue"])]),t("div",Je,[i(fe,{class:"mx-auto"})]),e.value.is_review?g("",!0):(d(),R("div",Xe,[i(w,{color:"primary",variant:"text",onClick:se},{default:u(()=>[_("Cancel")]),_:1}),i(w,{loading:A.value,disabled:P.value.length<6,color:"secondary",class:"ml-2 px-8",onClick:x},{default:u(()=>[_("save")]),_:1},8,["loading","disabled"])]))]),_:1})],2),e.value.is_review?(d(),R("div",Ze,[V.finalReview.isFinal?g("",!0):(d(),p(I,{key:0,class:"px-3"},{default:u(()=>[Qe,t("div",et,y(e.value.is_regular?"Mid-year Achievement":"First Review Achievement"),1),t("div",tt,[i(U,{type:"number",readonly:V.finalReview.isFinal||e.value.action=="readonly","hide-details":"",class:G(`${V.finalReview.isFinal||e.value.action=="readonly"?"bg-grey-lighten-2":""} mb-4`),modelValue:s.value.achievement_midyear,"onUpdate:modelValue":l[15]||(l[15]=a=>s.value.achievement_midyear=a),label:"Achievement*",variant:"outlined",density:"compact","persistent-hint":""},null,8,["readonly","class","modelValue"])]),t("div",lt,[i(U,{readonly:"",modelValue:$.value,"onUpdate:modelValue":l[16]||(l[16]=a=>$.value=a),label:"Target Variation",class:G(`${$.value&&$.value>=0?"text-success":"text-red"} bg-grey-lighten-2`),"hide-details":"",variant:"outlined",density:"compact","persistent-hint":""},null,8,["modelValue","class"])]),t("div",at,[i(U,{readonly:"",modelValue:h.value,"onUpdate:modelValue":l[17]||(l[17]=a=>h.value=a),label:"Remainder Annual Target",class:"bg-grey-lighten-2","hide-details":"",variant:"outlined",density:"compact","persistent-hint":""},null,8,["modelValue"])]),t("div",st,[e.value.is_regular?(d(),p(U,{key:0,type:"number",readonly:V.finalReview.isFinal||e.value.action=="readonly","hide-details":"",class:G(`${V.finalReview.isFinal||e.value.action=="readonly"?"bg-grey-lighten-2":""} mb-4`),modelValue:s.value.revised_annual_target,"onUpdate:modelValue":l[18]||(l[18]=a=>s.value.revised_annual_target=a),label:"Revised Annual Target",variant:"outlined",density:"compact","persistent-hint":""},null,8,["readonly","class","modelValue"])):g("",!0)])]),_:1})),V.finalReview.isFinal?(d(),p(I,{key:1,class:"px-3"},{default:u(()=>[t("div",it,y(e.value.is_regular?"Year-End Achievement":"Final Review Achievement"),1),t("div",nt,[e.value.is_regular?(d(),p(U,{key:0,type:"number",readonly:"","hide-details":"",class:"bg-grey-lighten-2 mb-4",modelValue:s.value.revised_annual_target,"onUpdate:modelValue":l[19]||(l[19]=a=>s.value.revised_annual_target=a),label:"Revised Annual Target",variant:"outlined",density:"compact","persistent-hint":""},null,8,["modelValue"])):g("",!0)]),t("div",ut,[i(U,{modelValue:s.value.achievement_yearend,"onUpdate:modelValue":l[20]||(l[20]=a=>s.value.achievement_yearend=a),readonly:e.value.action=="readonly","hide-details":"",class:G(`${e.value.action=="readonly"?"bg-grey-lighten-2":""} mb-4`),label:"Total Achievement*",variant:"outlined",density:"compact","persistent-hint":""},null,8,["modelValue","readonly","class"])]),t("div",ot,[t("h3",{class:G(`${c.value&&c.value=="Poor"?"text-red":"text-success"}`)},y(c.value),3)])]),_:1})):g("",!0),i(I,null,{default:u(()=>[t("div",dt,[i(w,{class:"bg-grey-lighten-2 text-primary",variant:"text",onClick:l[21]||(l[21]=a=>e.value.dialog=!1)},{default:u(()=>[_("Cancel")]),_:1}),e.value.action!="readonly"&&k.submitButton&&V.finalReview.saveBtn?(d(),p(w,{key:0,loading:A.value,color:"secondary",class:"ml-2",onClick:Z},{default:u(()=>[_("Save")]),_:1},8,["loading"])):g("",!0)])]),_:1})])):g("",!0)]),_:1})]),_:1})]),_:1},8,["modelValue","max-width"]),i(he,{options:W.value},null,8,["options"])],64))}},vt={class:"v-col-12"},ct={class:"v-col-12 py-0"},mt={class:"v-col-12 py-0"},pt={class:"v-col-12 py-0"},gt={key:0,class:"v-col-12 d-flex justify-end"},yt={key:0,class:"v-col-12 v-col-md-4 bg-grey-lighten-4"},ft=t("div",{class:"v-col-12 px-1"},y("Review"),-1),_t={class:"v-col-12 py-0 px-1 mt-3 mb-3 text-body-2"},ht={class:"v-col-12 v-col-md-12 py-0 px-1"},bt={class:"v-col-12 py-0 px-1 mt-3 mb-3 text-body-2"},xt={class:"v-col-12 py-0 px-1"},wt={class:"v-col-12 d-flex justify-end"},kt={__name:"EcdDialog",props:{ecdOptions:{type:Object,default:null},ecdList:{type:Object,default:null},remainWeightage:{type:Number,default:30},submitButton:{type:Boolean,default:!0},finalReview:{type:Boolean,default:!1}},emits:["savedResponse"],setup(V,{emit:M}){const k=V,W=m(null),C=m({}),q=m([]),b=m({}),L=m(null),e=m(null),s=m(!1),F=m(["5%","10%","15%","20%"]),X=()=>{s.value=!0,C.value.weightage=e.value,C.value.ecd_type=k.ecdOptions.ecdType,b.value.data=C.value,setTimeout(()=>{s.value=!1,b.value.dialog=!1,M("savedResponse",b.value)},1200)};E(()=>k.ecdOptions,h=>{C.value=Object.assign({},h.data),q.value=k.ecdList.filter(c=>c.ecd_type==h.ecdType||c.ecd_type=="both"),b.value=Object.assign({},h),b.value.action=="edit"||b.value.action=="review"||b.value.action=="readonly"?(W.value=h.data.weightage,L.value=h.data.title,e.value=h.data.weightage):(W.value=null,L.value=null,e.value=null)});const B=()=>{k.finalReview.isFinal?b.value.state="final":b.value.state="mid",X()};E(()=>L.value,h=>{b.value.action=="add"&&(C.value={},C.value=h)});const f=m({}),$=m(!1);return E(()=>e.value,h=>{if(!isNaN(h)||h==null||h==null)$.value=!1;else if(b.value.action=="add")parseInt(h)>k.remainWeightage?($.value=!1,f.value={status:!0,type:"error",text:"Weightage is over the limit!"}):$.value=!0;else{let c=parseInt(k.remainWeightage)+parseInt(W.value)-parseInt(h);parseInt(c)<0?($.value=!1,f.value={status:!0,type:"error",text:"Weightage is over the limit!"}):W.value>parseInt(h)||parseInt(c)>=0?$.value=!0:$.value=!1}}),(h,c)=>(d(),R(ae,null,[i(_e,{modelValue:b.value.dialog,"onUpdate:modelValue":c[6]||(c[6]=T=>b.value.dialog=T),width:"100%","max-width":`${V.ecdOptions.is_review==!0?"1240":"700"} `,persistent:""},{default:u(()=>[i(Y,{class:"rounded-lg",minHeight:"300"},{default:u(()=>[i(I,{class:"ma-0 pa-0"},{default:u(()=>[t("div",{class:G(`v-col-12 ${V.ecdOptions.is_review==!0?"v-col-md-8":""} px-4`)},[i(I,null,{default:u(()=>[t("div",vt,y(b.value.title),1),t("div",ct,[i(ye,{modelValue:L.value,"onUpdate:modelValue":c[0]||(c[0]=T=>L.value=T),items:q.value,"item-title":"title","item-value":"id","return-object":"",variant:"outlined",density:"compact",label:"Select *"},{item:u(({props:T,item:A})=>{var S;return[i(Re,Te({style:`${A.raw.profile_ecode?"background-color:#f1f1f1":""} `},T,{title:(S=A==null?void 0:A.raw)==null?void 0:S.title}),null,16,["style","title"])]}),_:1},8,["modelValue","items"])]),t("div",mt,[i(ne,{modelValue:e.value,"onUpdate:modelValue":c[1]||(c[1]=T=>e.value=T),items:F.value,label:"Development Weightage (%)*",variant:"outlined",density:"compact"},null,8,["modelValue","items"])]),t("div",pt,[i(fe,{class:"mx-auto"})]),b.value.is_review?g("",!0):(d(),R("div",gt,[i(w,{color:"primary",variant:"text",onClick:c[2]||(c[2]=T=>b.value.dialog=!1)},{default:u(()=>[_("Cancel")]),_:1}),i(w,{disabled:!$.value,loading:s.value,color:"secondary",class:"ml-2 px-8",onClick:X},{default:u(()=>[_("save")]),_:1},8,["disabled","loading"])]))]),_:1})],2),b.value.is_review?(d(),R("div",yt,[V.finalReview.isFinal?g("",!0):(d(),p(I,{key:0,class:"px-3"},{default:u(()=>[ft,t("div",_t,y(b.value.is_regular?"Mid-Year Achievement":"First Review Achievement"),1),t("div",ht,[i(U,{modelValue:C.value.mid_year_achievement,"onUpdate:modelValue":c[3]||(c[3]=T=>C.value.mid_year_achievement=T),label:"Achievement*",variant:"outlined",density:"compact","persistent-hint":""},null,8,["modelValue"])])]),_:1})),V.finalReview.isFinal?g("",!0):(d(),p(I,{key:1,class:"px-3"},{default:u(()=>[t("div",bt,y(b.value.is_regular?"Year-End Achievement":"Final Review Achievement"),1),t("div",xt,[i(U,{modelValue:C.value.year_end_achievement,"onUpdate:modelValue":c[4]||(c[4]=T=>C.value.year_end_achievement=T),label:"Achievement*",variant:"outlined",density:"compact","persistent-hint":""},null,8,["modelValue"])])]),_:1})),V.finalReview.isFinal?(d(),p(I,{key:2,class:"pb-4"},{default:u(()=>[t("div",wt,[i(w,{class:"bg-grey-lighten-2 text-primary",variant:"text",onClick:c[5]||(c[5]=T=>b.value.dialog=!1)},{default:u(()=>[_("Cancel")]),_:1}),b.value.action!="readonly"&&k.submitButton&&V.finalReview.saveBtn?(d(),p(w,{key:0,loading:s.value,color:"secondary",class:"ml-2",onClick:B},{default:u(()=>[_("Submit")]),_:1},8,["loading"])):g("",!0)])]),_:1})):g("",!0)])):g("",!0)]),_:1})]),_:1})]),_:1},8,["modelValue","max-width"]),i(he,{options:f.value},null,8,["options"])],64))}};const Vt={class:"v-col-12 v-col-md-2"},Ct={class:"v-col-12 v-col-md-2"},$t={class:"v-col-12"},It={class:"d-flex align-center px-3"},Rt={key:1,class:"ml-auto text-h6"},Tt={key:1,class:"text-uppercase text-primary"},Ft={key:2,class:"text-uppercase text-center",style:{display:"block !important",width:"100%"}},Dt={key:3,class:"text-uppercase text-center"},St={key:4,class:"ml-auto text-body-1"},Pt={class:"v-col-12 pb-0"},Ot={class:"v-col-12"},jt={class:"v-col-12 pb-0 d-flex justify-space-between"},Kt=t("div",{class:"text-grey text-caption"},"KPI",-1),Ut={class:"text-primary text-body-1"},Et={class:"v-col-3"},Bt=t("div",{class:"text-grey text-caption"},"Industry",-1),At={class:"text-primary text-body-1"},Lt={class:"v-col-3"},Mt={class:"text-grey text-caption"},Wt={class:"text-primary text-body-1"},zt={class:"v-col-3"},Nt=t("div",{class:"text-grey text-caption"},"Measure",-1),Yt={class:"text-primary text-body-1"},Gt={class:"v-col-3"},Ht={class:"text-grey text-caption"},qt={class:"text-primary text-body-1"},Jt={key:1,class:"v-col-12 pb-0 text-center"},Xt={class:"v-col-6 pb-0"},Zt={key:1},Qt={class:"v-col-6 pb-0"},el={key:1},tl={class:"v-col-6 pb-0"},ll={class:"v-col-12 pb-0 d-flex justify-space-between"},al=t("div",{class:"text-grey text-caption"},"Training",-1),sl={class:"text-primary text-body-1"},il={class:"v-col-3"},nl={class:"text-grey text-caption"},ul={class:"text-primary text-body-1"},ol={class:"v-col-3"},dl=t("div",{class:"text-grey text-caption"},"Type",-1),rl={class:"text-primary text-body-1"},vl={class:"v-col-6 pb-0"},cl={class:"v-col-12 pb-0 d-flex justify-space-between"},ml=t("div",{class:"text-grey text-caption"},"Training",-1),pl={class:"text-primary text-body-1"},gl={class:"v-col-3"},yl={class:"text-grey text-caption"},fl={class:"text-primary text-body-1"},_l={class:"v-col-3"},hl=t("div",{class:"text-grey text-caption"},"Type",-1),bl={class:"text-primary text-body-1"},xl={class:"pb-3 text-grey"},wl={class:"text-primary"},kl={class:"d-flex justify-end mt-5"},Rl={__name:"KpiContent",props:{selectedEmployee:{type:Object,default:null},industryList:{type:Object,default:null},ecdList:{type:Object,default:null},submitButton:{type:Boolean,default:!0},measuresList:{type:Object,default:null}},emits:["yearchange","savedResponse","errorcheck"],setup(V,{emit:M}){const k=V,W=Fe(),C=De(),q=Se(),b=m({}),L=Pe(),e=m(k.selectedEmployee),s=ee(()=>!e.value||e.value&&(!e.value.reviews||e.value.reviews.length==0)?[]:e.value.reviews[0].key_review.filter(n=>n.type=="kpi")),F=ee(()=>!e.value||e.value&&(!e.value.reviews||e.value.reviews.length==0)?[]:e.value.reviews[0].key_review.filter(n=>n.type=="ecd")),X=ee(()=>!e.value||e.value&&(!e.value.reviews||e.value.reviews.length==0)?[]:e.value.reviews[0].key_review.filter(n=>n.type=="ecd"&&n.ecd_type=="tech")),B=ee(()=>!e.value||e.value&&(!e.value.reviews||e.value.reviews.length==0)?[]:e.value.reviews[0].key_review.filter(n=>n.type=="ecd"&&n.ecd_type=="soft"));E(()=>k.selectedEmployee,n=>{n.length>0?e.value=Object.assign({},n[0]):e.value=Object.assign({},n),C.name=="SingleTeamMember"&&c()});const f=ee(()=>L.filteredSetting(e.value.company_id)),$=m(!1),h=m(!1),c=()=>{if(e.value&&e.value.reviews&&e.value.reviews.length>0&&(e.value.reviews[0].state=="midyear"||e.value.reviews[0].state=="first_review")){let n=e.value.reviews[0].key_review.filter(v=>v.achievement_midyear==null),o=!1;n&&n.length>0&&(o=!0),M("errorcheck",{hasError:o})}else if(e.value&&e.value.reviews&&e.value.reviews.length>0&&(e.value.reviews[0].state=="yearend"||e.value.reviews[0].state=="final_review")){let n=e.value.reviews[0].key_review.filter(v=>v.achievement_yearend==null),o=!1;n&&n.length>0&&(o=!0),M("errorcheck",{hasError:o})}else A().then(()=>{M("errorcheck",{hasError:h.value})})},T=m(""),A=async()=>{let n="",o=!1;x.value=="kpi"&&s.value.length<4&&H("kpi")==0?(n="Invalid: Minimum 4 KPI's needed, kindly update the weightage.",o=!0):(n="Invalid: Should have 1 each, technical and soft skill, kindly update the weightage.",o=S(o)),$.value=o,o&&(T.value=n),P()},S=n=>{if(H("ecd")==0&&F.value&&F.value.length>0&&F.value.length<2)n=!0;else if(F.value.length>1){let o=[];F.value.map((v,te)=>{o.push(v.ecd_type)}),o=[...new Set(o)],H("ecd")==0&&o.length<2&&(n=!0)}return n},P=async()=>{let n=!1;s.value.length<4&&H("kpi")==0&&(n=!0),n=S(n),h.value=n},x=m("kpi"),se=n=>{x.value=n,C.name=="SingleTeamMember"&&A()},Z=m(new Date),D=ee(()=>{if(e.value&&e.value.reviews&&e.value.reviews.length>0)return!!(q.authRole.includes("manager")&&C.name=="SingleTeamMember"&&e.value.reviews[0].state=="setting"&&(e.value.reviews[0].status=="open"||e.value.reviews[0].status=="inprogress"||e.value.reviews[0].status=="inreview"));if(C.name=="SingleTeamMember"&&f&&f.state=="setting"&&(f.status=="open"||f.status=="inprogress"))return!0;if(e.value&&e.value.is_regular==0&&C.name=="SingleTeamMember"){let n=new Date(e.value.doj);if(n.setDate(n.getDate()+parseInt(f.probation_kpi_setting)),n>=Z.value)return!0}return!1}),j=m({saveBtn:!1,isFinal:!1}),z=ee(()=>{if(j.value={saveBtn:!1,isFinal:!1},C.name=="SingleTeamMember"&&f&&f.state=="yearend"&&(j.value={saveBtn:!1,isFinal:!0}),C.name=="SingleTeamMember"&&f&&(f.state=="midyear"||f.state=="yearend")&&(f.status=="open"||f.status=="inprogress"))return j.value={saveBtn:!0,isFinal:!0},!0;if(e.value&&e.value.is_regular==0&&C.name=="SingleTeamMember"){if(j.value={saveBtn:!1,isFinal:!1},f){let n=new Date(e.value.doj),o=new Date(e.value.doj);if(n.setDate(n.getDate()+parseInt(f.probation_first_review_start)),o.setDate(o.getDate()+parseInt(f.probation_first_review_end)),e.value.reviews[0].state=="first_review"&&(e.value.reviews[0].status=="open"||e.value.reviews[0].status=="inprogress"))return j.value={saveBtn:!0,isFinal:!1},!0;if(n<=Z.value&&o>=Z.value)return j.value={saveBtn:!0,isFinal:!1},!0;let v=new Date(e.value.doj),te=new Date(e.value.doj);if(v.setDate(v.getDate()+parseInt(f.probation_final_review_start)),te.setDate(te.getDate()+parseInt(f.probation_final_review_end)),e.value.reviews[0].state=="final_review"&&(e.value.reviews[0].status=="open"||e.value.reviews[0].status=="inprogress"))return j.value={saveBtn:!0,isFinal:!0},!0;if(v<=Z.value&&te>=Z.value)return j.value={saveBtn:!0,isFinal:!0},!0}}else if(e.value&&e.value.reviews&&e.value.reviews.length>0)return e.value.reviews[0].status=="open"||e.value.reviews[0].status=="inprogress"?j.value.saveBtn=!0:e.value.reviews[0].state=="yearend"&&(j.value.isFinal=!0),!!(q.authRole.includes("manager")&&C.name=="SingleTeamMember"&&(e.value.reviews[0].state=="midyear"||e.value.reviews[0].state=="yearend"));return!1}),N=m(new Date().getFullYear()),r=()=>{const n=W.resolve({path:"/print/kpi/"+N.value+"/"+e.value.username,params:{year:N.value},query:{print:1}});window.open(n.href,"_blank")};E(N,async(n,o)=>{M("yearchange",n)});const l=m({title:"",dialog:!1,data:{},type:"",action:"",is_review:!1}),a=m({title:"",dialog:!1,data:{},type:"",action:"",is_review:!1}),Q=async(n,o)=>{if(H(x.value)<=0)b.value={status:!0,type:"error",text:"Denied: You've reached the weightage limit."};else if(n=="kpi")s.value.length>5?b.value={status:!0,type:"error",text:"Denied: Max of 6 KPI only. Minimum is 4 KPI"}:l.value={title:"Add KPI ",data:{},dialog:!0,type:n,action:"add",is_review:!1};else{let v="Identify Technical Skill Development";o=="soft"&&(v="Identify Behavioral Program"),a.value={...a.value,title:v,data:{},dialog:!0,type:n,ecdType:o,action:"add",is_review:!1}}},ue=async(n,o="kpi",v)=>{o=="kpi"?l.value={...l.value,title:"Edit KPI ",data:Object.assign({},n),dialog:!0,type:o,action:"edit",is_review:!1}:a.value={...a.value,title:"Edit ECD ",data:Object.assign({},n),dialog:!0,type:o,action:"edit",ecdType:v,is_review:!1}},oe=async(n,o="kpi")=>{o=="kpi"&&(l.value={...l.value,title:o.toUpperCase(),data:Object.assign({},n),dialog:!0,type:o,action:"readonly",is_review:!0,state:e.value.reviews[0].state,is_regular:e.value.is_regular}),o=="ecd"&&(a.value={...a.value,title:o.toUpperCase(),data:Object.assign({},n),dialog:!0,type:o,action:"readonly",is_review:!0,is_regular:e.value.is_regular})},de=async(n,o="kpi")=>{o=="kpi"&&(l.value={...l.value,title:o.toUpperCase(),data:Object.assign({},n),dialog:!0,type:o,action:"review",is_review:!0,state:e.value.reviews[0].state,is_regular:e.value.is_regular}),o=="ecd"&&(a.value={...a.value,title:o.toUpperCase(),data:Object.assign({},n),dialog:!0,type:o,action:"review",is_review:!0,is_regular:e.value.is_regular})},be=n=>{let o={reviewID:e.value.reviews[0].id,data:n,industryTitle:n.industryTitle,state:n.state};c(),M("savedResponse",o)},J=m({data:{},dialog:!1,loading:!1}),re=async n=>{J.value={...J.value,data:Object.assign({},n),dialog:!0}},Ve=async()=>{let n=J.value.data;J.value.dialog=!1,M("removeKPI",n)},H=n=>{let o=70;return e.value&&e.value.is_regular==0&&(o=100),n=="ecd"?(o=30,F.value&&F.value.length>0&&F.value.map((v,te)=>{o-=v.weightage})):s.value&&s.value.length>0&&s.value.map((v,te)=>{o-=v.weightage}),o};return(n,o)=>(d(),p(I,null,{default:u(()=>[t("div",Vt,[i(O(Ke),{modelValue:N.value,"onUpdate:modelValue":o[0]||(o[0]=v=>N.value=v),"year-picker":"",class:"pms-date-picker"},null,8,["modelValue"])]),t("div",Ct,[e.value&&e.value.reviews&&e.value.reviews.length>0?(d(),p(w,{key:0,onClick:r,color:"white",class:"text-capitalize text-md-caption text-lg-body-2"},{default:u(()=>[_("View/Print"),i(K,{icon:O(Oe),class:"ml-1"},null,8,["icon"])]),_:1})):g("",!0)]),t("div",$t,[t("div",It,[i(Y,{onClick:o[1]||(o[1]=()=>se("kpi")),flat:"",class:G(`
          ${x.value=="kpi"?"":"bg-grey-darken-3 text-white"}
          d-flex align-center justify-center px-3 text-center pms-tab`)},{default:u(()=>[_(" KPI "+y(s.value?"("+s.value.length+")":"(0)"),1)]),_:1},8,["class"]),e.value&&e.value.is_regular?(d(),p(Y,{key:0,onClick:o[2]||(o[2]=()=>se("ecd")),flat:"",class:G(`${x.value=="ecd"?"":"bg-grey-darken-3 text-white"} d-flex align-center justify-center px-3 text-caption text-center pms-tab`)},{default:u(()=>[_(" Employee Capability Development "+y("("+F.value.length+")"),1)]),_:1},8,["class"])):g("",!0),e.value&&e.value.reviews&&e.value.reviews.length>0&&e.value.reviews[0].state=="yearend"&&e.value.reviews[0].status=="submitted"?(d(),R("div",Rt,"Rate: Coming Soon")):g("",!0)]),i(Y,{flat:""},{default:u(()=>[i(xe,{class:"px-5 py-5 d-flex align-center"},{default:u(()=>[D.value&&x.value=="kpi"?(d(),p(w,{key:0,onClick:o[3]||(o[3]=()=>Q(x.value)),density:"compact",size:"35",class:"rounded-xl elevation-2 mr-2"},{default:u(()=>[i(K,{size:"small",icon:O(ce)},null,8,["icon"])]),_:1})):g("",!0),x.value=="kpi"&&s.value&&s.value.length>0||x.value=="ecd"&&F.value&&F.value.length>0?(d(),R("div",Tt,y(x.value=="ecd"?"Employee Capability Development":x.value)+" List ",1)):D.value?(d(),R("div",Dt,y(x.value=="ecd"?"Employee Capability Development":e.value.is_regular?x.value:"Probation KPI")+" List ",1)):(d(),R("div",Ft,y(x.value)+" not set ",1)),D.value&&H(x.value)>0?(d(),R("div",St,"Remaining "+y(x.value.toUpperCase())+" weightage: "+y(H(x.value))+"%",1)):g("",!0)]),_:1}),i(le,{class:"px-5 pb-10"},{default:u(()=>[$.value?(d(),p(I,{key:0,class:"mb-2"},{default:u(()=>[t("div",Pt,[i(Y,{class:"rounded-lg",style:{border:"2px solid red"}},{default:u(()=>[i(le,null,{default:u(()=>[i(I,null,{default:u(()=>[t("div",Ot,[i(K,{size:"large",color:"red",class:"mr-1",icon:O(je)},null,8,["icon"]),_(" "+y(T.value),1)])]),_:1})]),_:1})]),_:1})])]),_:1})):g("",!0),we(i(I,{class:"mt-3"},{default:u(()=>[s.value&&s.value.length>0?(d(!0),R(ae,{key:0},ve(s.value,v=>(d(),R("div",{class:"v-col-12 pb-0",key:v.id},[i(Y,{class:"rounded-lg content-card"},{default:u(()=>[i(le,null,{default:u(()=>[i(I,null,{default:u(()=>[t("div",jt,[t("div",null,[Kt,t("div",Ut,y(v.title),1)]),t("div",null,[D.value?(d(),p(w,{key:0,onClick:()=>oe(v,"kpi"),density:"compact",color:"primary",class:"rounded-xl elevation-2 ml-1 text-caption"},{default:u(()=>[_(" View"),i(K,{size:"small",icon:O(me),class:"ml-1"},null,8,["icon"])]),_:2},1032,["onClick"])):g("",!0),z.value?(d(),p(w,{key:1,color:"secondary",class:"rounded-xl px-5",size:"small",onClick:()=>de(v,"kpi")},{default:u(()=>[_("review")]),_:2},1032,["onClick"])):g("",!0),D.value?(d(),p(w,{key:2,onClick:()=>ue(v,"kpi"),density:"compact",color:"teal",class:"rounded-xl elevation-2 ml-1 text-caption"},{default:u(()=>[_("Edit"),i(K,{size:"small",class:"ml-1",icon:O(pe)},null,8,["icon"])]),_:2},1032,["onClick"])):g("",!0),D.value?(d(),p(w,{key:3,onClick:()=>re(v),density:"compact",color:"error",class:"rounded-xl elevation-2 ml-1 text-caption"},{default:u(()=>[_("Delete"),i(K,{size:"small",class:"ml-1",icon:O(ge)},null,8,["icon"])]),_:2},1032,["onClick"])):g("",!0)])]),t("div",Et,[Bt,t("div",At,y(v.industry),1)]),t("div",Lt,[t("div",Mt,"Target ("+y(v.target_type)+")",1),t("div",Wt,y(v.target),1)]),t("div",zt,[Nt,t("div",Yt,y(v.measures),1)]),t("div",Gt,[t("div",Ht,y("KPI's Weightage(%)"),1),t("div",qt,y(v.weightage)+"%",1)])]),_:2},1024)]),_:2},1024)]),_:2},1024)]))),128)):(d(),R("div",Jt," No records yet. "))]),_:1},512),[[ke,x.value=="kpi"]]),we(i(I,{class:"mt-n3"},{default:u(()=>[t("div",Xt,[D.value?(d(),p(w,{key:0,onClick:o[4]||(o[4]=()=>Q(x.value,"tech")),density:"compact",size:"35",class:"rounded-xl elevation-2 mr-2"},{default:u(()=>[i(K,{size:"small",icon:O(ce)},null,8,["icon"])]),_:1})):g("",!0),D.value?(d(),R("span",Zt,"Technical Skill")):g("",!0)]),t("div",Qt,[D.value?(d(),p(w,{key:0,onClick:o[5]||(o[5]=()=>Q(x.value,"soft")),density:"compact",size:"35",class:"rounded-xl elevation-2 mr-2"},{default:u(()=>[i(K,{size:"small",icon:O(ce)},null,8,["icon"])]),_:1})):g("",!0),_(),D.value?(d(),R("span",el,"Soft Skill")):g("",!0)]),t("div",tl,[i(I,null,{default:u(()=>[(d(!0),R(ae,null,ve(X.value,v=>(d(),R("div",{class:"v-col-12 pb-0",key:v.id},[i(Y,{class:"rounded-lg"},{default:u(()=>[i(le,null,{default:u(()=>[i(I,null,{default:u(()=>[t("div",ll,[t("div",null,[al,t("div",sl,y(v.title),1)]),t("div",null,[D.value?(d(),p(w,{key:0,onClick:()=>oe(v,"ecd"),density:"compact",color:"primary",class:"rounded-xl elevation-2 ml-1 text-caption"},{default:u(()=>[_(" View"),i(K,{size:"small",icon:O(me),class:"ml-1"},null,8,["icon"])]),_:2},1032,["onClick"])):g("",!0),z.value?(d(),p(w,{key:1,color:"secondary",class:"rounded-xl px-5",size:"small",onClick:()=>de(v,"ecd")},{default:u(()=>[_("review")]),_:2},1032,["onClick"])):g("",!0),D.value?(d(),p(w,{key:2,onClick:()=>ue(v,"ecd","tech"),density:"compact",color:"teal",class:"rounded-xl elevation-2 ml-1 text-caption"},{default:u(()=>[_("Edit"),i(K,{size:"small",class:"ml-1",icon:O(pe)},null,8,["icon"])]),_:2},1032,["onClick"])):g("",!0),D.value?(d(),p(w,{key:3,onClick:()=>re(v),density:"compact",color:"error",class:"rounded-xl elevation-2 ml-1 text-caption"},{default:u(()=>[_("Delete"),i(K,{size:"small",class:"ml-1",icon:O(ge)},null,8,["icon"])]),_:2},1032,["onClick"])):g("",!0)])]),t("div",il,[t("div",nl,y("KPI's Weightage(%)"),1),t("div",ul,y(v.weightage),1)]),t("div",ol,[dl,t("div",rl,y(v.ecd_type),1)])]),_:2},1024)]),_:2},1024)]),_:2},1024)]))),128))]),_:1})]),t("div",vl,[i(I,null,{default:u(()=>[(d(!0),R(ae,null,ve(B.value,v=>(d(),R("div",{class:"v-col-12 pb-0",key:v.id},[i(Y,{class:"rounded-lg"},{default:u(()=>[i(le,null,{default:u(()=>[i(I,null,{default:u(()=>[t("div",cl,[t("div",null,[ml,t("div",pl,y(v.title),1)]),t("div",null,[D.value?(d(),p(w,{key:0,onClick:()=>oe(v,"ecd"),density:"compact",color:"primary",class:"rounded-xl elevation-2 ml-1 text-caption"},{default:u(()=>[_(" View"),i(K,{size:"small",icon:O(me),class:"ml-1"},null,8,["icon"])]),_:2},1032,["onClick"])):g("",!0),z.value?(d(),p(w,{key:1,color:"secondary",class:"rounded-xl px-5",size:"small",onClick:()=>de(v,"ecd")},{default:u(()=>[_("review")]),_:2},1032,["onClick"])):g("",!0),D.value?(d(),p(w,{key:2,onClick:()=>ue(v,"ecd","soft"),density:"compact",color:"teal",class:"rounded-xl elevation-2 ml-1 text-caption"},{default:u(()=>[_("Edit"),i(K,{size:"small",class:"ml-1",icon:O(pe)},null,8,["icon"])]),_:2},1032,["onClick"])):g("",!0),D.value?(d(),p(w,{key:3,onClick:()=>re(v),density:"compact",color:"error",class:"rounded-xl elevation-2 ml-1 text-caption"},{default:u(()=>[_("Delete"),i(K,{size:"small",class:"ml-1",icon:O(ge)},null,8,["icon"])]),_:2},1032,["onClick"])):g("",!0)])]),t("div",gl,[t("div",yl,y("KPI's Weightage(%)"),1),t("div",fl,y(v.weightage),1)]),t("div",_l,[hl,t("div",bl,y(v.ecd_type),1)])]),_:2},1024)]),_:2},1024)]),_:2},1024)]))),128))]),_:1})])]),_:1},512),[[ke,x.value=="ecd"]])]),_:1})]),_:1})]),i(_e,{modelValue:J.value.dialog,"onUpdate:modelValue":o[7]||(o[7]=v=>J.value.dialog=v),width:"100%","max-width":"480",persistent:""},{default:u(()=>[i(Y,{class:"rounded-lg"},{default:u(()=>[i(xe,{class:"pa-3"},{default:u(()=>[_("Confirm Remove")]),_:1}),i(le,{class:"px-3"},{default:u(()=>[t("div",xl,[_(" Please confirm that you want to remove "),t("span",wl,y("'"+J.value.data.title.substring(0,35)+"...'"),1)]),t("div",kl,[i(w,{class:"bg-grey-lighten-2 text-primary",variant:"text",onClick:o[6]||(o[6]=v=>J.value.dialog=!1)},{default:u(()=>[_("Cancel")]),_:1}),i(w,{color:"primary",class:"ml-2",onClick:Ve},{default:u(()=>[_("Remove")]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),i(rt,{"final-review":j.value,"measures-list":V.measuresList,"kpi-options":l.value,"remain-weightage":H(x.value),"industry-list":V.industryList,"submit-button":k.submitButton,onSavedResponse:be},null,8,["final-review","measures-list","kpi-options","remain-weightage","industry-list","submit-button"]),i(kt,{"final-review":j.value,"ecd-options":a.value,"remain-weightage":H(x.value),"ecd-list":V.ecdList,"submit-button":k.submitButton,onSavedResponse:be},null,8,["final-review","ecd-options","remain-weightage","ecd-list","submit-button"]),i(he,{options:b.value},null,8,["options"])]),_:1}))}};export{Rl as _};
