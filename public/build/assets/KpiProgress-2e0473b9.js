import{k as j,r as b,L as v,N as D,o as d,c as m,w as y,b as f,F as w,n as _,f as h,Y as P,A as S,aj as C,C as E,i as z}from"./app-30c9ca38.js";const B={class:"d-flex justify-center"},T={__name:"KpiProgress",props:{selectedEmployee:{type:Object,default:null},density:{type:String,default:""}},setup(I){const c=I,k=j(),i=b(c.selectedEmployee),u=v(()=>{let t=[{state:"setting",title:"KPI & Annual Target Setting",status:[{status:"open",title:"Open"},{status:"inprogress",title:"In Progress"},{status:"inreview",title:"In Review"},{status:"submitted",title:"Submitted"}]},{state:"midyear",title:"Mid Year Review & Revised Target Setting",status:[{status:"open",title:"Open"},{status:"inprogress",title:"In Progress"},{status:"submitted",title:"Submitted"}]},{state:"yearend",title:"Year End Review and Submission",status:[{status:"open",title:"Open"},{status:"inprogress",title:"In Progress"},{status:"submitted",title:"Submitted"}]}],e=[{state:"setting",title:"KPI & Probation Target Setting",status:[{status:"open",title:"Open"},{status:"inprogress",title:"In Progress"},{status:"submitted",title:"Submitted"}]},{state:"first_review",title:"First Probation Review",status:[{status:"open",title:"Open"},{status:"inprogress",title:"In Progress"},{status:"submitted",title:"Submitted"}]},{state:"final_review",title:"Final Probation Review",status:[{status:"open",title:"Open"},{status:"inprogress",title:"In Progress"},{status:"submitted",title:"Submitted"}]}];return i.value&&i.value.is_regular?t:e}),x=b(new Date),O=(t,e,l)=>{let s=0;if(t&&t.reviews&&t.reviews.length>0){let r=t.reviews[0].state,o=t.reviews[0].status,n=u.value.findIndex(a=>a.state==r);if(e<n)return"bg-grey-darken-1";if(e==n){if(s=u.value[e].status.findIndex(a=>a.status==o),s==l)return"bg-secondary text-white";if(l<s)return"bg-grey-darken-1"}}else if(t&&t.length>0){let r=t[0].profile;if(r&&r.is_regular==0){let o=u.value.findIndex(a=>a.state=="setting"),n=new Date(r.doj);if(n.setDate(n.getDate()+parseInt(t[0].probation_setting_allow_days)),n>=x.value&&e==o&&(s=u.value[e].status.findIndex(a=>a.status=="open"),s==l))return"bg-secondary text-white"}else{let o=t[0].state,n=t[0].status,a=u.value.findIndex(p=>p.state==o);if(e<a)return"bg-grey-darken-1";if(e==a){if(s=u.value[e].status.findIndex(p=>p.status==n),s==l)return"bg-secondary text-white";if(l<s)return"bg-grey-darken-1"}}}return""},g=v(()=>k.filteredSetting(i.value.company_id)),R=v(()=>i.value==null||!i.value.reviews||i.value.reviews.length==0?[{state:g.value?g.value.state:null,status:g.value?g.value.status:null,probation_setting_allow_days:g.value?g.value.probation_kpi_setting:null,profile:i.value}]:i.value);return D(()=>c.selectedEmployee,t=>{i.value=Object.assign({},t)}),(t,e)=>(d(),m(z,{class:""},{default:y(()=>[(d(!0),f(w,null,_(u.value,(l,s)=>(d(),f("div",{key:l.title,class:"v-col-12 v-col-md-4"},[h("div",{class:P(`${c.density=="compact"?"text-caption":"text-body-1"} mb-1 text-center d-flex align-center justify-center`),style:{"line-height":"1.2em",height:"30px"}},S(l.title),3),h("div",B,[(d(!0),f(w,null,_(l.status,(r,o)=>(d(),m(C,{style:{margin:"0 1px","font-size":"10px"},key:r.status,size:`${c.density=="compact"?"x-small":"small"}`,class:P(`${O(R.value,s,o)}`)},{default:y(()=>[E(S(r.title),1)]),_:2},1032,["size","class"]))),128))])]))),128))]),_:1}))}};export{T as default};
