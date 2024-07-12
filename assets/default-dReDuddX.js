import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{p as x,m as I,a as H,b as S,c as F,d as B,e as R,f as j,g as M,h as P,u as w,t as f,i as z,j as A,k as T,s as D,l as E,n as o,o as N,q as Z,r as s,v as $,w as l,x as p,y as c,z as G,F as q,A as J,B as i,V as O,C as m,D as U,E as X,G as Y,H as K,I as Q,J as W}from"./index-BQ1Oh_wj.js";const ee=x({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...I(),...H(),...S(),...F(),...B(),...R({tag:"footer"}),...j()},"VFooter"),te=M()({name:"VFooter",props:ee(),setup(e,a){let{slots:r}=a;const{themeClasses:n}=P(e),{backgroundColorClasses:t,backgroundColorStyles:C}=w(f(e,"color")),{borderClasses:v}=z(e),{elevationClasses:y}=A(e),{roundedClasses:g}=T(e),u=D(32),{resizeRef:L}=E(h=>{h.length&&(u.value=h[0].target.clientHeight)}),d=o(()=>e.height==="auto"?u.value:parseInt(e.height,10)),{layoutItemStyles:k,layoutIsReady:V}=N({id:e.name,order:o(()=>parseInt(e.order,10)),position:o(()=>"bottom"),layoutSize:d,elementSize:o(()=>e.height==="auto"?void 0:d.value),active:o(()=>e.app),absolute:f(e,"absolute")});return Z(()=>s(e.tag,{ref:L,class:["v-footer",n.value,t.value,v.value,y.value,g.value,e.class],style:[C.value,e.app?k.value:{height:$(e.height)},e.style]},r)),e.app?V:{}}}),_=e=>(X("data-v-40134937"),e=e(),Y(),e),oe=["href","title"],se={class:"text-caption text-disabled",style:{position:"absolute",right:"16px"}},ae=_(()=>i("span",{class:"d-none d-sm-inline-block"},"Vuetify, LLC",-1)),ne=_(()=>i("a",{class:"text-decoration-none on-surface",href:"https://vuetifyjs.com/about/licensing/",rel:"noopener noreferrer",target:"_blank"}," MIT License ",-1)),ie={__name:"AppFooter",setup(e){const a=[{title:"Vuetify Documentation",icon:"$vuetify",href:"https://vuetifyjs.com/"},{title:"Vuetify Support",icon:"mdi-shield-star-outline",href:"https://support.vuetifyjs.com/"},{title:"Vuetify X",icon:["M2.04875 3.00002L9.77052 13.3248L1.99998 21.7192H3.74882L10.5519 14.3697L16.0486 21.7192H22L13.8437 10.8137L21.0765 3.00002H19.3277L13.0624 9.76874L8.0001 3.00002H2.04875ZM4.62054 4.28821H7.35461L19.4278 20.4308H16.6937L4.62054 4.28821Z"],href:"https://x.com/vuetifyjs"},{title:"Vuetify GitHub",icon:"mdi-github",href:"https://github.com/vuetifyjs/vuetify"},{title:"Vuetify Discord",icon:["M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z"],href:"https://community.vuetifyjs.com/"},{title:"Vuetify Reddit",icon:"mdi-reddit",href:"https://reddit.com/r/vuetifyjs"}];return(r,n)=>(l(),p(te,{height:"40",app:""},{default:c(()=>[(l(),G(q,null,J(a,t=>i("a",{key:t.title,href:t.href,title:t.title,class:"d-inline-block mx-2 social-link",rel:"noopener noreferrer",target:"_blank"},[s(O,{icon:t.icon,size:t.icon==="$vuetify"?24:16},null,8,["icon","size"])],8,oe)),64)),i("div",se,[m(" © 2016-"+U(new Date().getFullYear())+" ",1),ae,m(" — "),ne])]),_:1}))}},re=b(ie,[["__scopeId","data-v-40134937"]]),ue={__name:"default",setup(e){return(a,r)=>{const n=K("router-view"),t=re;return l(),p(W,null,{default:c(()=>[s(Q,null,{default:c(()=>[s(n)]),_:1}),s(t)]),_:1})}}};export{ue as default};