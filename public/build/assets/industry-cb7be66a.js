import{a4 as i}from"./app-005d3ef0.js";import{c as e}from"./clientApi-d974f54e.js";const a=i("industry",{state:()=>({industry_list:[]}),getters:{industries:t=>t.industry_list,active_industries:t=>t.industry_list.filter(s=>s.status==="active")},actions:{async getIndustries(t){await e(t).get("/api/industries").then(s=>{this.industry_list=s.data})}}});export{a as u};