import{am as i}from"./app-a3b7841e.js";import{c as e}from"./clientApi-1ba22cc7.js";const a=i("industry",{state:()=>({industry_list:[]}),getters:{industries:t=>t.industry_list,active_industries:t=>t.industry_list.filter(s=>s.status==="active")},actions:{async getIndustries(t){await e(t).get("/api/industries").then(s=>{this.industry_list=s.data})}}});export{a as u};