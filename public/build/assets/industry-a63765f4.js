<<<<<<<< HEAD:public/build/assets/industry-a63765f4.js
import{a3 as i}from"./app-97ea0592.js";import{c as e}from"./clientApi-749dd067.js";const a=i("industry",{state:()=>({industry_list:[]}),getters:{industries:t=>t.industry_list,active_industries:t=>t.industry_list.filter(s=>s.status==="active")},actions:{async getIndustries(t){await e(t).get("/api/industries").then(s=>{this.industry_list=s.data})}}});export{a as u};
========
import{a3 as i}from"./app-30c9ca38.js";import{c as e}from"./clientApi-2707673d.js";const a=i("industry",{state:()=>({industry_list:[]}),getters:{industries:t=>t.industry_list,active_industries:t=>t.industry_list.filter(s=>s.status==="active")},actions:{async getIndustries(t){await e(t).get("/api/industries").then(s=>{this.industry_list=s.data})}}});export{a as u};
>>>>>>>> phase-1:public/build/assets/industry-b0c5961e.js
