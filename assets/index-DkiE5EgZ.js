import{_ as Ie}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{p as b,a as g,e as k,g as y,K as Pe,q as C,r as n,L as P,M as x,n as A,N as F,O as je,P as xe,Q as V,R as N,d as G,S as Ne,f as U,T as K,h as q,U as W,W as Z,k as H,X as Be,Y as B,V as j,Z as I,_ as J,F as $,m as we,$ as Le,b as Te,a0 as Re,a1 as $e,a2 as ze,a3 as Ee,a4 as Oe,i as De,a5 as Me,j as Fe,a6 as Ge,a7 as Ue,a8 as Ke,a9 as qe,aa as We,ab as Ze,ac as He,w as Y,x as Q,y as i,J as Je,B as m,ad as _,C as f,ae as Ye}from"./index-D7vaofK9.js";const Qe=b({fluid:{type:Boolean,default:!1},...g(),...k()},"VContainer"),z=y()({name:"VContainer",props:Qe(),setup(e,l){let{slots:t}=l;const{rtlClasses:a}=Pe();return C(()=>n(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},a.value,e.class],style:e.style},t)),{}}}),X=P.reduce((e,l)=>(e[l]={type:[Boolean,String,Number],default:!1},e),{}),ee=P.reduce((e,l)=>{const t="offset"+x(l);return e[t]={type:[String,Number],default:null},e},{}),te=P.reduce((e,l)=>{const t="order"+x(l);return e[t]={type:[String,Number],default:null},e},{}),E={col:Object.keys(X),offset:Object.keys(ee),order:Object.keys(te)};function Xe(e,l,t){let a=e;if(!(t==null||t===!1)){if(l){const s=l.replace(e,"");a+=`-${s}`}return e==="col"&&(a="v-"+a),e==="col"&&(t===""||t===!0)||(a+=`-${t}`),a.toLowerCase()}}const et=["auto","start","end","center","baseline","stretch"],tt=b({cols:{type:[Boolean,String,Number],default:!1},...X,offset:{type:[String,Number],default:null},...ee,order:{type:[String,Number],default:null},...te,alignSelf:{type:String,default:null,validator:e=>et.includes(e)},...g(),...k()},"VCol"),p=y()({name:"VCol",props:tt(),setup(e,l){let{slots:t}=l;const a=A(()=>{const s=[];let d;for(d in E)E[d].forEach(c=>{const o=e[c],u=Xe(d,c,o);u&&s.push(u)});const r=s.some(c=>c.startsWith("v-col-"));return s.push({"v-col":!r||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),s});return()=>{var s;return F(e.tag,{class:[a.value,e.class],style:e.style},(s=t.default)==null?void 0:s.call(t))}}}),w=["start","end","center"],ae=["space-between","space-around","space-evenly"];function L(e,l){return P.reduce((t,a)=>{const s=e+x(a);return t[s]=l(),t},{})}const at=[...w,"baseline","stretch"],ne=e=>at.includes(e),le=L("align",()=>({type:String,default:null,validator:ne})),nt=[...w,...ae],se=e=>nt.includes(e),ie=L("justify",()=>({type:String,default:null,validator:se})),lt=[...w,...ae,"stretch"],de=e=>lt.includes(e),ce=L("alignContent",()=>({type:String,default:null,validator:de})),O={align:Object.keys(le),justify:Object.keys(ie),alignContent:Object.keys(ce)},st={align:"align",justify:"justify",alignContent:"align-content"};function it(e,l,t){let a=st[e];if(t!=null){if(l){const s=l.replace(e,"");a+=`-${s}`}return a+=`-${t}`,a.toLowerCase()}}const dt=b({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:ne},...le,justify:{type:String,default:null,validator:se},...ie,alignContent:{type:String,default:null,validator:de},...ce,...g(),...k()},"VRow"),D=y()({name:"VRow",props:dt(),setup(e,l){let{slots:t}=l;const a=A(()=>{const s=[];let d;for(d in O)O[d].forEach(r=>{const c=e[r],o=it(d,r,c);o&&s.push(o)});return s.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),s});return()=>{var s;return F(e.tag,{class:["v-row",a.value,e.class],style:e.style},(s=t.default)==null?void 0:s.call(t))}}}),ct="/bubbletip/assets/anne-was-hier-CCgNtc0E.png",re=y()({name:"VCardActions",props:g(),setup(e,l){let{slots:t}=l;return je({VBtn:{slim:!0,variant:"text"}}),C(()=>{var a;return n("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),rt=b({opacity:[Number,String],...g(),...k()},"VCardSubtitle"),ot=y()({name:"VCardSubtitle",props:rt(),setup(e,l){let{slots:t}=l;return C(()=>n(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},t)),{}}}),ut=xe("v-card-title"),vt=b({start:Boolean,end:Boolean,icon:V,image:String,text:String,...g(),...N(),...G(),...Ne(),...k(),...U(),...K({variant:"flat"})},"VAvatar"),M=y()({name:"VAvatar",props:vt(),setup(e,l){let{slots:t}=l;const{themeClasses:a}=q(e),{colorClasses:s,colorStyles:d,variantClasses:r}=W(e),{densityClasses:c}=Z(e),{roundedClasses:o}=H(e),{sizeClasses:u,sizeStyles:v}=Be(e);return C(()=>n(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},a.value,s.value,c.value,o.value,u.value,r.value,e.class],style:[d.value,v.value,e.style]},{default:()=>[t.default?n(I,{key:"content-defaults",defaults:{VImg:{cover:!0,image:e.image},VIcon:{icon:e.icon}}},{default:()=>[t.default()]}):e.image?n(B,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?n(j,{key:"icon",icon:e.icon},null):e.text,J(!1,"v-avatar")]})),{}}}),ft=b({appendAvatar:String,appendIcon:V,prependAvatar:String,prependIcon:V,subtitle:[String,Number],title:[String,Number],...g(),...N()},"VCardItem"),oe=y()({name:"VCardItem",props:ft(),setup(e,l){let{slots:t}=l;return C(()=>{var u;const a=!!(e.prependAvatar||e.prependIcon),s=!!(a||t.prepend),d=!!(e.appendAvatar||e.appendIcon),r=!!(d||t.append),c=!!(e.title!=null||t.title),o=!!(e.subtitle!=null||t.subtitle);return n("div",{class:["v-card-item",e.class],style:e.style},[s&&n("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?n(I,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},t.prepend):n($,null,[e.prependAvatar&&n(M,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&n(j,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),n("div",{class:"v-card-item__content"},[c&&n(ut,{key:"title"},{default:()=>{var v;return[((v=t.title)==null?void 0:v.call(t))??e.title]}}),o&&n(ot,{key:"subtitle"},{default:()=>{var v;return[((v=t.subtitle)==null?void 0:v.call(t))??e.subtitle]}}),(u=t.default)==null?void 0:u.call(t)]),r&&n("div",{key:"append",class:"v-card-item__append"},[t.append?n(I,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},t.append):n($,null,[e.appendIcon&&n(j,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&n(M,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),mt=b({opacity:[Number,String],...g(),...k()},"VCardText"),gt=y()({name:"VCardText",props:mt(),setup(e,l){let{slots:t}=l;return C(()=>n(e.tag,{class:["v-card-text",e.class],style:[{"--v-card-text-opacity":e.opacity},e.style]},t)),{}}}),yt=b({appendAvatar:String,appendIcon:V,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:V,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...we(),...g(),...N(),...Le(),...Te(),...Re(),...$e(),...ze(),...G(),...Ee(),...k(),...U(),...K({variant:"elevated"})},"VCard"),bt=y()({name:"VCard",directives:{Ripple:Oe},props:yt(),setup(e,l){let{attrs:t,slots:a}=l;const{themeClasses:s}=q(e),{borderClasses:d}=De(e),{colorClasses:r,colorStyles:c,variantClasses:o}=W(e),{densityClasses:u}=Z(e),{dimensionStyles:v}=Me(e),{elevationClasses:ue}=Fe(e),{loaderClasses:ve}=Ge(e),{locationStyles:fe}=Ue(e),{positionClasses:me}=Ke(e),{roundedClasses:ge}=H(e),h=qe(e,t),ye=A(()=>e.link!==!1&&h.isLink.value),S=A(()=>!e.disabled&&e.link!==!1&&(e.link||h.isClickable.value));return C(()=>{const be=ye.value?"a":e.tag,ke=!!(a.title||e.title!=null),Ce=!!(a.subtitle||e.subtitle!=null),_e=ke||Ce,Ve=!!(a.append||e.appendAvatar||e.appendIcon),he=!!(a.prepend||e.prependAvatar||e.prependIcon),Se=!!(a.image||e.image),pe=_e||he||Ve,Ae=!!(a.text||e.text!=null);return We(n(be,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":S.value},s.value,d.value,r.value,u.value,ue.value,ve.value,me.value,ge.value,o.value,e.class],style:[c.value,v.value,fe.value,e.style],href:h.href.value,onClick:S.value&&h.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var T;return[Se&&n("div",{key:"image",class:"v-card__image"},[a.image?n(I,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):n(B,{key:"image-img",cover:!0,src:e.image},null)]),n(He,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),pe&&n(oe,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),Ae&&n(gt,{key:"text"},{default:()=>{var R;return[((R=a.text)==null?void 0:R.call(a))??e.text]}}),(T=a.default)==null?void 0:T.call(a),a.actions&&n(re,null,{default:a.actions}),J(S.value,"v-card")]}}),[[Ze("ripple"),S.value&&e.ripple]])}),{}}}),kt={},Ct=m("h1",null,"Anne Was Hier!!",-1),_t=m("p",null,[f("Deze applicatie is voor het verzamelen en beschikbaar stellen van tips. Tips voor plaatsen om te verblijven, restaurants om te eten en activiteiten om te doen. Tips gebaseerd op eigen, positieve ervaringen. Met adresgegevens, website, beschrijving van de eigen ervaring. "),m("br"),m("br"),f(' Als je zelf ook een ervaring hebt met een getipte plaats, dan kan je een "IkOokje" toevoegen waarin je jouw ervaring kan delen. '),m("br"),m("br"),f(" De tips in deze applicatie zijn alleen beschikbaar voor de persoonlijk uitgenodigde leden van de tip-bubbel. ")],-1),Vt=m("div",{class:"text-h6 mb-1"}," Routekaart ",-1),ht={class:"text-caption"};function St(e,l){return Y(),Q(Ye,null,{default:i(()=>[n(z,{fluid:"",tag:"section","aria-labelledby":"title"},{default:i(()=>[n(Je,null,{default:i(()=>[n(D,null,{default:i(()=>[n(p,{cols:"6",offset:"1"},{default:i(()=>[Ct,n(z,{fluid:""},{default:i(()=>[n(D,null,{default:i(()=>[n(p,{cols:"6"},{default:i(()=>[_t]),_:1}),n(p,{cols:"6"},{default:i(()=>[n(B,{src:ct})]),_:1})]),_:1})]),_:1})]),_:1}),n(p,{cols:"2",offset:"0"},{default:i(()=>[n(bt,{class:"mx-auto","max-width":"344",variant:"outlined"},{default:i(()=>[n(oe,null,{default:i(()=>[m("div",null,[Vt,m("div",ht,[n(_,{"prepend-icon":"mdi-star-plus-outline",title:"Voeg een tip toe",class:"mb-2",to:"/newtip"},{default:i(()=>[f("Nieuwe Tip")]),_:1}),n(_,{"prepend-icon":"mdi-map-search",title:"Bekijk tips op de kaart",class:"mb-2",to:"/map"},{default:i(()=>[f("Bekijk Kaart")]),_:1}),n(_,{"prepend-icon":"mdi-book-search-outline",title:"Zoek en Blader door tips",to:"/browse",class:"mb-2"},{default:i(()=>[f("Zoek en Blader")]),_:1}),n(_,{"prepend-icon":"mdi-clock-fast",title:"Bekijk de meest recente wijzigingen in tips, nieuwe IkOokjes en tipverzoeken",class:"mb-2",to:"/recent"},{default:i(()=>[f("Recente Wijzigingen")]),_:1}),n(_,{"prepend-icon":"mdi-frequently-asked-questions",title:"Vraag om een tip",class:"mb-2",to:"/request"},{default:i(()=>[f("Vraag om Tip")]),_:1}),n(_,{"prepend-icon":"mdi-human-male-female",title:"Leden van de Tip Bubbel",class:"mb-2",to:"/members"},{default:i(()=>[f("Tippers")]),_:1})])])]),_:1}),n(re)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const pt=Ie(kt,[["render",St]]),Pt={__name:"index",setup(e){return(l,t)=>{const a=pt;return Y(),Q(a)}}};export{Pt as default};
