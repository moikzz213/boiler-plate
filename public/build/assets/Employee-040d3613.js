import{k as H,u as z,z as M,r as v,o as l,c as g,w as a,a as e,H as N,S as U,C as D,A as m,d as o,g as j,f as t,a1 as q,$ as b,T as B,U as w,R as X,K as J,ay as Q,N as Y,l as Z,b as S,q as ee,v as te,F as E,n as K,az as ae,X as se,e as L,aA as oe,aB as R,ar as F,as as O,p as le,aC as ne,ax as ie}from"./app-2f73b29a.js";import{l as re,n as ue,o as ce,p as T,q as de,r as pe,s as me,t as he,u as ve,v as ge,w as _e,x as fe,y as ye,z as xe,A as ke,B as Ce}from"./mdi-1daeeafa.js";import{p as $}from"./printInitials-a54a9c4a.js";import{a as Pe,b as we}from"./sacntumApi-56c0fc63.js";import{_ as Se}from"./_plugin-vue_export-helper-c27b6911.js";const Ve={class:"d-flex align-center pa-3"},Le={class:"text-body-2"},be={class:"text-body-1"},Ae={class:"text-caption"},Ie={class:"pa-3"},G={__name:"IconMenuAccount",props:{color:{type:String,default:"grey-darken-3"}},setup(A){const f=A,r=H(),c=z(),d=M(),p=v(!1),P=h=>{p.value=!1,d.push({path:h}).catch(u=>{})},_=v(!1),I=async()=>{let h={key:c.token};await axios.post("/client/removekey",h).then(()=>{c.logout().then(()=>{_.value=!1,d.push({path:"/login"}),localStorage.removeItem("authClient")})})},V=async()=>{let h={username:c.profile.ecode};return await Pe.post("/api/sanctumlogout",h)},y=async()=>{_.value=!0,V().then(()=>{r.setPageLoading(!0,"logging out"),I().then(()=>{r.setPageLoading(!1,"logging out")})}).catch(h=>{_.value=!1,r.setPageLoading(!1,"logging out"),console.log("error while trying to logout to server",h)})};return(h,u)=>(l(),g(X,{modelValue:p.value,"onUpdate:modelValue":u[1]||(u[1]=n=>p.value=n),"close-on-content-click":!1,location:"bottom"},{activator:a(({props:n})=>[e(N,U(n,{size:"36",icon:"",variant:"flat",color:f.color}),{default:a(()=>[D(m(o($)(o(c).authProfile.display_name)),1)]),_:2},1040,["color"])]),default:a(()=>[e(j,{"min-width":"300",class:"rounded-lg mt-1"},{default:a(()=>[t("div",Ve,[e(q,{color:"grey-lighten-3",size:36,class:"d-flex align-center justify-center mr-3",style:{cursor:"pointer"}},{default:a(()=>[t("div",Le,m(o($)(o(c).authProfile.display_name)),1)]),_:1}),t("div",null,[t("div",be,m(o(c).authProfile.display_name),1),t("div",Ae,m(o(c).authProfile.email),1)])]),e(b),e(B,{nav:"",density:"compact",class:"d-flex flex-column"},{default:a(()=>[e(w,{"prepend-icon":o(re),title:"Account Settings",onClick:u[0]||(u[0]=()=>P("/account"))},null,8,["prepend-icon"])]),_:1}),e(b),t("div",Ie,[e(N,{loading:_.value,onClick:y,width:"100%",color:"primary"},{default:a(()=>[D(" Logout ")]),_:1},8,["loading"])])]),_:1})]),_:1},8,["modelValue"]))}};const Be={class:"d-flex flex-column h-100"},$e=["value"],ze={key:0},Me={class:"bg-grey-darken-4",style:{"border-radius":"4px"}},Ne={style:{"font-size":"12px"}},De={class:"d-flex align-start py-3 px-3 w-100 h-100"},Ee={class:"d-flex",style:{position:"relative"}},Ke={class:"pms-avatar-wrapper"},Re={class:"d-flex align-start"},Fe={class:"text-h4 text-primary"},Oe={class:"pl-3 pt-2",style:{height:"56px",overflow:"hidden","min-width":"600px","max-width":"600px",width:"100%"}},Te={class:"text-body-2 text-capitalize"},Ge={class:"text-caption"},He={class:"d-flex"},Ue={class:"d-flex align-center"},qe={class:"ml-1 text-body-1 text-primary"},We={__name:"LoggedInLayout",setup(A){const f=v("GAG - Performance Management System"),r=v("https://pms.gagroup.net/assets/images/fav.png"),c=v(["Home","Dashboard","Account","Teams","ManagerCustomKPI","PaginatedManagerCustomKPI","Employees","PaginatedEmployees","SingleEmployee"]),d=z(),p=M(),P=J(),_=v([{title:"Dashboard",icon:ue,roles:["app_admin","normal","manager","hr_admin","hrbp"],path:"/dashboard"},{title:"Teams",icon:ce,roles:["app_admin","manager"],path:"/manager/teams"},{title:"My Custom KPI",icon:T,roles:["app_admin","manager"],path:"/manager/custom/kpi"},{title:"Employees",icon:de,roles:["app_admin","hr_admin","hrbp"],path:"/hr/employees"},{title:"Settings",icon:pe,roles:["app_admin","hr_admin"],path:"",subs:[{title:"PMS Settings",icon:me,path:"/hr/settings/pms"},{title:"Custom KPIs",icon:T,path:"/hr/custom/kpi"},{title:"KPIs",icon:he,path:"/hr/master/kpi"},{title:"Industries",icon:ve,path:"/hr/industries"},{title:"Companies",icon:ge,path:"/hr/companies"},{title:"Notifications",icon:_e,path:"/admin/notifications"},{title:"Measures",icon:fe,path:"/hr/measures"},{title:"Weightage",icon:ye,path:"/hr/weightages"}]},{title:"User Settings",icon:xe,path:"/admin/users",roles:["app_admin"]}]),I=k=>{let i=[];return i=k.filter(s=>d.authRole.includes(s)),i.length>0},V=k=>{h.value=!1,p.push({path:k}).catch(i=>{})},{mobile:y}=Q(),h=v(!1),u=v(!1),n=v(!0),x=v(!1);return Y(y,async(k,i)=>{k==!0?(n.value=!1,x.value=!0):(n.value=!0,x.value=!1)}),Z(()=>{y.value==!0?(n.value=!1,x.value=!0):(n.value=!0,x.value=!1)}),(k,i)=>(l(),S("div",null,[e(oe,{rail:x.value==!0?!1:u.value,modelValue:n.value,"onUpdate:modelValue":i[1]||(i[1]=s=>n.value=s),temporary:x.value,permanent:!x.value,class:"pt-4",color:"primary"},{default:a(()=>[t("div",Be,[e(w,{nav:"","prepend-avatar":r.value,class:"mb-3"},{default:a(()=>[ee(t("div",{class:"text-body-2",style:{width:"180px"}},m(f.value),513),[[te,!u.value]])]),_:1},8,["prepend-avatar"]),e(b),e(B,{nav:""},{default:a(()=>[(l(!0),S(E,null,K(_.value,s=>(l(),S("div",{key:s.title,value:s.title},[I(s.roles)==!0?(l(),S("div",ze,[s.subs?(l(),g(ae,{key:0,value:s.title},{activator:a(({props:C})=>[e(w,U({nav:""},C,{"prepend-icon":s.icon,title:s.title}),null,16,["prepend-icon","title"])]),default:a(()=>[t("div",Me,[(l(!0),S(E,null,K(s.subs,(C,W)=>(l(),g(w,{density:"compact",style:{"padding-left":"12px !important"},key:W,title:C.title,value:C.title,onClick:()=>V(C.path)},{title:a(()=>[t("div",Ne,m(C.title),1)]),prepend:a(()=>[e(se,{size:"16",icon:C.icon},null,8,["icon"])]),_:2},1032,["title","value","onClick"]))),128))])]),_:2},1032,["value"])):(l(),g(w,{key:1,"prepend-icon":s.icon,title:s.title,value:s.title,onClick:()=>V(s.path)},null,8,["prepend-icon","title","value","onClick"]))])):L("",!0)],8,$e))),128))]),_:1}),e(b),o(y)?L("",!0):(l(),g(B,{key:0,nav:"",class:"mt-auto"},{default:a(()=>[e(w,{"prepend-icon":u.value==!1?o(ke):o(Ce),title:"Collapse",onClick:i[0]||(i[0]=s=>u.value=!u.value)},null,8,["prepend-icon"])]),_:1}))])]),_:1},8,["rail","modelValue","temporary","permanent"]),c.value.includes(o(P).name)?(l(),g(O,{key:0,height:"100",color:"black",elevation:"0",style:{overflow:"visible"}},{default:a(()=>[t("div",De,[t("div",Ee,[o(y)==!0?(l(),g(R,{key:0,onClick:i[2]||(i[2]=s=>n.value=!n.value),size:"small"})):L("",!0),t("div",Ke,[t("div",Re,[e(q,{color:"grey-lighten-1",size:"90"},{default:a(()=>[t("div",Fe,m(o($)(o(d).authProfile.display_name)),1)]),_:1}),t("div",Oe,[t("div",Te,m(o(d).authProfile.display_name)+" "+m(o(d).authProfile.ecode?" - "+o(d).authProfile.ecode:""),1),t("div",Ge,m(o(d).authProfile.email),1)])])])]),e(F),t("div",He,[e(G)])])]),_:1})):(l(),g(O,{key:1,density:"compact",color:"white",elevation:"0"},{prepend:a(()=>[t("div",Ue,[o(y)==!0?(l(),g(R,{key:0,onClick:i[3]||(i[3]=s=>n.value=!n.value),size:"small"})):L("",!0),t("div",qe,m(f.value),1)])]),default:a(()=>[e(F),e(G,{color:"grey-lighten-3"})]),_:1})),e(ne,null,{default:a(()=>[le(k.$slots,"default",{},void 0,!0)]),_:3})]))}},je=Se(We,[["__scopeId","data-v-87bd8510"]]),et={__name:"Employee",setup(A){const f=z(),r=H(),c=M(),d=async()=>{r.setPageLoading(!0),await we(f.authToken).get("/api/checkuser").then(p=>{f.saveClientKey(p.data).then(P=>{r.setPageLoading(!1),r.setIsFromLogin(!1),r.setPmsSettings(P.data.pms_settings)})}).catch(p=>{console.log("error",p.response.status),p.response.status==401&&(localStorage.removeItem("authClient"),c.push({path:"/login"})),r.setPageLoading(!1)})};return r.isFromLogin==!1&&d(),(p,P)=>{const _=ie("router-view");return l(),S("div",null,[e(je,null,{default:a(()=>[e(_)]),_:1})])}}};export{et as default};
