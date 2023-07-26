<<<<<<<< HEAD:public/build/assets/company-470f5d33.js
import{a3 as e}from"./app-97ea0592.js";import{c as i}from"./clientApi-749dd067.js";const n=e("company",{state:()=>({company_list:[]}),getters:{companies:t=>t.company_list,active_companies:t=>t.company_list.filter(a=>a.status==="active")},actions:{async getCompanies(t){await i(t).get("/api/companies").then(a=>{this.company_list=a.data})}}});export{n as u};
========
import{a3 as e}from"./app-30c9ca38.js";import{c as i}from"./clientApi-2707673d.js";const n=e("company",{state:()=>({company_list:[]}),getters:{companies:t=>t.company_list,active_companies:t=>t.company_list.filter(a=>a.status==="active")},actions:{async getCompanies(t){await i(t).get("/api/companies").then(a=>{this.company_list=a.data})}}});export{n as u};
>>>>>>>> phase-1:public/build/assets/company-455c1dd0.js
