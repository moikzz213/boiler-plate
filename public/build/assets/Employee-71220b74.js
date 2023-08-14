import{l as G,u as z,k as D,r as _,o as l,c as v,w as a,a as e,v as E,y as H,n as N,t as m,d as o,g as q,f as t,a2 as W,a0 as A,U as M,W as S,T as X,x as Z,aA as J,P as Q,A as Y,b as w,E as ee,G as te,F as B,C as K,aB as ae,Z as se,e as V,aC as oe,aD as F,X as O,ak as R,D as le,aE as ne,az as ie}from"./app-005d3ef0.js";import{l as re,n as de,o as ue,p as T,q as ce,r as pe,s as me,t as he,u as _e,v as ve,w as ge,x as fe,y as ye,z as xe,A as ke,B as Ce,C as Pe}from"./mdi-5e26928d.js";import{p as $}from"./printInitials-a54a9c4a.js";import{a as we,b as Se}from"./sacntumApi-89d40c59.js";import{_ as Ve}from"./_plugin-vue_export-helper-c27b6911.js";const be={class:"d-flex align-center pa-3"},Le={class:"text-body-2"},Ae={class:"text-body-1"},Ie={class:"text-caption"},Be={class:"pa-3"},U={__name:"IconMenuAccount",props:{color:{type:String,default:"grey-darken-3"}},setup(I){const y=I,i=G(),u=z(),c=D(),p=_(!1),x=h=>{p.value=!1,c.push({path:h}).catch(d=>{})},g=_(!1),b=async()=>{let h={key:u.token};await axios.post("/client/removekey",h).then(()=>{u.logout().then(()=>{g.value=!1,c.push({path:"/login"}),localStorage.removeItem("authClient")})})},L=async()=>{let h={username:u.profile.ecode};return await we.post("/api/sanctumlogout",h)},k=async()=>{g.value=!0,L().then(()=>{i.setPageLoading(!0,"logging out"),b().then(()=>{i.setPageLoading(!1,"logging out")})}).catch(h=>{g.value=!1,i.setPageLoading(!1,"logging out"),console.log("error while trying to logout to server",h)})};return(h,d)=>(l(),v(X,{modelValue:p.value,"onUpdate:modelValue":d[1]||(d[1]=n=>p.value=n),"close-on-content-click":!1,location:"bottom"},{activator:a(({props:n})=>[e(E,H(n,{size:"36",icon:"",variant:"flat",color:y.color}),{default:a(()=>[N(m(o($)(o(u).authProfile.display_name)),1)]),_:2},1040,["color"])]),default:a(()=>[e(q,{"min-width":"300",class:"rounded-lg mt-1"},{default:a(()=>[t("div",be,[e(W,{color:"grey-lighten-3",size:36,class:"d-flex align-center justify-center mr-3",style:{cursor:"pointer"}},{default:a(()=>[t("div",Le,m(o($)(o(u).authProfile.display_name)),1)]),_:1}),t("div",null,[t("div",Ae,m(o(u).authProfile.display_name),1),t("div",Ie,m(o(u).authProfile.email),1)])]),e(A),e(M,{nav:"",density:"compact",class:"d-flex flex-column"},{default:a(()=>[e(S,{"prepend-icon":o(re),title:"Account Settings",onClick:d[0]||(d[0]=()=>x("/account"))},null,8,["prepend-icon"])]),_:1}),e(A),t("div",Be,[e(E,{loading:g.value,onClick:k,width:"100%",color:"primary"},{default:a(()=>[N(" Logout ")]),_:1},8,["loading"])])]),_:1})]),_:1},8,["modelValue"]))}};const Me={class:"d-flex flex-column h-100"},$e=["value"],ze={key:0},De={class:"bg-grey-darken-4",style:{"border-radius":"4px"}},Ee={style:{"font-size":"12px"}},Ne={class:"d-flex align-start py-3 px-3 w-100 h-100"},Ke={class:"d-flex",style:{position:"relative"}},Fe={class:"pms-avatar-wrapper"},Oe={class:"d-flex align-start"},Re={class:"text-h4 text-primary"},Te={class:"pl-3 pt-2",style:{height:"56px",overflow:"hidden","min-width":"600px","max-width":"600px",width:"100%"}},Ue={class:"text-body-2 text-capitalize"},Ge={class:"text-caption"},He={class:"d-flex"},We={class:"d-flex align-center"},je={class:"ml-1 text-body-1 text-primary"},qe={__name:"LoggedInLayout",setup(I){const y=_("Performance Management System"),i=_("https://pms.gagroup.net/assets/images/fav.png"),u=_(["Home","Dashboard","Account","Teams","ManagerCustomKPI","PaginatedManagerCustomKPI","Employees","PaginatedEmployees","SingleEmployee"]),c=z(),p=D(),x=Z(),g=_([{title:"Dashboard",icon:de,roles:["app_admin","normal","manager","hr_admin","hrbp"],path:"/dashboard"},{title:"Teams",icon:ue,roles:["app_admin","manager"],path:"/manager/teams"},{title:"My Custom KPI",icon:T,roles:["app_admin","manager"],path:"/manager/custom/kpi"},{title:"Employees",icon:ce,roles:["app_admin","hr_admin","hrbp"],path:"/hr/employees"},{title:"Reports",icon:pe,roles:["app_admin","hr_admin","hrbp"],path:"/hr/reports"},{title:"Settings",icon:me,roles:["app_admin","hr_admin","hrbp"],path:"",subs:[{title:"PMS Settings",icon:he,path:"/hr/settings/pms",roles:["app_admin","hr_admin","hrbp"]},{title:"Custom KPIs",icon:T,path:"/hr/custom/kpi",roles:["app_admin","hr_admin"]},{title:"KPIs",icon:_e,path:"/hr/master/kpi",roles:["app_admin","hr_admin"]},{title:"Industries",icon:ve,path:"/hr/industries",roles:["app_admin","hr_admin"]},{title:"Companies",icon:ge,path:"/hr/companies",roles:["app_admin","hr_admin"]},{title:"Notifications",icon:fe,path:"/admin/notifications",roles:["app_admin","hr_admin"]},{title:"Measures",icon:ye,path:"/hr/measures",roles:["app_admin","hr_admin"]},{title:"Weightage",icon:xe,path:"/hr/weightages",roles:["app_admin","hr_admin"]}]},{title:"User Settings",icon:ke,path:"/admin/users",roles:["app_admin"]}]),b=P=>{let r=[];return r=P.filter(s=>c.authRole.includes(s)),r.length>0},L=P=>{h.value=!1,p.push({path:P}).catch(r=>{})},{mobile:k}=J(),h=_(!1),d=_(!1),n=_(!0),C=_(!1);return Q(k,async(P,r)=>{P==!0?(n.value=!1,C.value=!0):(n.value=!0,C.value=!1)}),Y(()=>{k.value==!0?(n.value=!1,C.value=!0):(n.value=!0,C.value=!1)}),(P,r)=>(l(),w("div",null,[e(oe,{rail:C.value==!0?!1:d.value,modelValue:n.value,"onUpdate:modelValue":r[1]||(r[1]=s=>n.value=s),temporary:C.value,permanent:!C.value,class:"pt-4",color:"primary"},{default:a(()=>[t("div",Me,[e(S,{nav:"","prepend-avatar":i.value,class:"mb-3"},{default:a(()=>[ee(t("div",{class:"text-body-2",style:{width:"180px"}},m(y.value),513),[[te,!d.value]])]),_:1},8,["prepend-avatar"]),e(A),e(M,{nav:""},{default:a(()=>[(l(!0),w(B,null,K(g.value,s=>(l(),w("div",{key:s.title,value:s.title},[b(s.roles)==!0?(l(),w("div",ze,[s.subs?(l(),v(ae,{key:0,value:s.title},{activator:a(({props:f})=>[e(S,H({nav:""},f,{"prepend-icon":s.icon,title:s.title}),null,16,["prepend-icon","title"])]),default:a(()=>[t("div",De,[(l(!0),w(B,null,K(s.subs,(f,j)=>(l(),w(B,{key:j},[b(f.roles)==!0?(l(),v(S,{key:0,density:"compact",style:{"padding-left":"12px !important"},title:f.title,value:f.title,onClick:()=>L(f.path)},{title:a(()=>[t("div",Ee,m(f.title),1)]),prepend:a(()=>[e(se,{size:"16",icon:f.icon},null,8,["icon"])]),_:2},1032,["title","value","onClick"])):V("",!0)],64))),128))])]),_:2},1032,["value"])):(l(),v(S,{key:1,"prepend-icon":s.icon,title:s.title,value:s.title,onClick:()=>L(s.path)},null,8,["prepend-icon","title","value","onClick"]))])):V("",!0)],8,$e))),128))]),_:1}),e(A),o(k)?V("",!0):(l(),v(M,{key:0,nav:"",class:"mt-auto"},{default:a(()=>[e(S,{"prepend-icon":d.value==!1?o(Ce):o(Pe),title:"Collapse",onClick:r[0]||(r[0]=s=>d.value=!d.value)},null,8,["prepend-icon"])]),_:1}))])]),_:1},8,["rail","modelValue","temporary","permanent"]),u.value.includes(o(x).name)?(l(),v(R,{key:0,height:"100",color:"black",elevation:"0",style:{overflow:"visible"}},{default:a(()=>[t("div",Ne,[t("div",Ke,[o(k)==!0?(l(),v(F,{key:0,onClick:r[2]||(r[2]=s=>n.value=!n.value),size:"small"})):V("",!0),t("div",Fe,[t("div",Oe,[e(W,{color:"grey-lighten-1",size:"90"},{default:a(()=>[t("div",Re,m(o($)(o(c).authProfile.display_name)),1)]),_:1}),t("div",Te,[t("div",Ue,m(o(c).authProfile.display_name)+" "+m(o(c).authProfile.ecode?" - "+o(c).authProfile.ecode:""),1),t("div",Ge,m(o(c).authProfile.email),1)])])])]),e(O),t("div",He,[e(U)])])]),_:1})):(l(),v(R,{key:1,density:"compact",color:"white",elevation:"0"},{prepend:a(()=>[t("div",We,[o(k)==!0?(l(),v(F,{key:0,onClick:r[3]||(r[3]=s=>n.value=!n.value),size:"small"})):V("",!0),t("div",je,m(y.value),1)])]),default:a(()=>[e(O),e(U,{color:"grey-lighten-3"})]),_:1})),e(ne,null,{default:a(()=>[le(P.$slots,"default",{},void 0,!0)]),_:3})]))}},Xe=Ve(qe,[["__scopeId","data-v-bd912886"]]),tt={__name:"Employee",setup(I){const y=z(),i=G(),u=D(),c=async()=>{i.setPageLoading(!0),await Se(y.authToken).get("/api/checkuser").then(p=>{y.saveClientKey(p.data).then(x=>{i.setPageLoading(!1),i.setIsFromLogin(!1),i.setPmsSettings(x.data.pms_settings),i.setAllSettings(x.data.all_settings)})}).catch(p=>{console.log("error",p.response.status),p.response.status==401&&(localStorage.removeItem("authClient"),u.push({path:"/login"})),i.setPageLoading(!1)})};return i.isFromLogin==!1&&c(),(p,x)=>{const g=ie("router-view");return l(),w("div",null,[e(Xe,null,{default:a(()=>[e(g)]),_:1})])}}};export{tt as default};