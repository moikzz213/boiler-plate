import{a3 as o}from"./app-d2fb1262.js";import{c as e}from"./clientApi-2b4a321a.js";const n=o("company",{state:()=>({company_list:[]}),getters:{companies:t=>t.company_list},actions:{async getCompanies(t){await e(t).get("/api/companies").then(a=>{this.company_list=a.data})}}});export{n as u};
