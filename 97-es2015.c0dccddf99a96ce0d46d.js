(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{W3OI:function(l,n,t){"use strict";t.r(n);var u=t("8Y7J");class o{}var e=t("pMnS"),i=t("MKJQ"),r=t("sZkV"),a=t("lawv"),c=t("SVse"),s=t("mrSG"),b=t("Z54v");class d{constructor(l,n,t,u,o,e){this.toastCtrl=l,this.actionCtrl=n,this.store=t,this.activeRoute=u,this.platform=o,this.router=e,this.header=[],this.dateNow=new Date(Date.now())}ngOnInit(){return s.a(this,void 0,void 0,(function*(){this.index=parseInt(this.activeRoute.snapshot.paramMap.get("id")),yield this.store.select("user_state").subscribe(l=>{let n=Object.assign({},l);this.draw=n.archived[this.index]}),["PRIMERO","SEGUNDO","TERCERO","QUARTO","QUINTO","SEXTO","L.MAS","S.L.MAS"].map((l,n)=>{n<this.draw.ballsqty&&this.header.push(l)}),this.dateExp=this.draw.expiryDate}))}get matdesign(){return!(!this.platform.is("android")&&!this.platform.is("desktop"))}openActions(){return s.a(this,void 0,void 0,(function*(){const l=yield this.actionCtrl.create(this.normalOptions(this.index));yield l.present()}))}normalOptions(l){let n={header:"Acciones",translucent:!0,buttons:[{text:"favorito",icon:"heart",handler:()=>{this.store.dispatch(Object(b.f)({index:l})),this.router.navigate(["folder","Archivadas"])}},{text:"reciclar",icon:"trash",cssClass:"delete",role:"destructive",handler:()=>{this.store.dispatch(Object(b.g)({index:l})),this.showToast("Enviado a la papelera de reciclaje"),this.router.navigate(["folder","Archivadas"])}},{text:"cancelar",icon:"close",role:"cancel"}]};return this.draw.favorite&&(n.buttons[0].icon="heart-dislike"),n}showToast(l){return s.a(this,void 0,void 0,(function*(){const n=yield this.toastCtrl.create({position:"top",buttons:[{icon:"close",side:"end",role:"cancel"}],message:l,animated:!0,translucent:!0,duration:4e3});n.position=this.matdesign?"bottom":"top",yield n.present()}))}}var p=t("DQLy"),h=t("iInd"),f=u.nb({encapsulation:0,styles:[[".t-container[_ngcontent-%COMP%]{width:72vw}.table[_ngcontent-%COMP%]{width:100%;align-content:center}h4[_ngcontent-%COMP%]{margin:0;padding:.3em;width:100%;background-color:#000;color:#fff;text-align:center}.thead[_ngcontent-%COMP%]{background-color:#000;color:#fff}.normal[_ngcontent-%COMP%]{border-top:1px solid #fff;border-right:1px solid #fff}.lmas[_ngcontent-%COMP%]{background-color:red;color:#fff;border-top:1px solid #fff;border-right:1px solid #fff}.slmas[_ngcontent-%COMP%]{background-color:#00f;color:#fff;border-top:1px solid #fff;border-right:1px solid #fff}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{padding:.8em;width:auto}tr[_ngcontent-%COMP%]:nth-child(even){background-color:#f2f2f2}.tbody[_ngcontent-%COMP%]{text-align:center}.d-none[_ngcontent-%COMP%]{display:none}.truncate-text[_ngcontent-%COMP%]{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media only screen and (max-width:992px){.t-container[_ngcontent-%COMP%]{width:100vw;overflow-x:auto;-webkit-overflow-scrolling:touch}}@media only screen and (width:1024px){.t-container[_ngcontent-%COMP%]{width:72vw;overflow-x:auto;-webkit-overflow-scrolling:touch}}"]],data:{}});function g(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,13,"ion-label",[],null,null,null,i.eb,i.u)),u.ob(1,49152,null,0,r.O,[u.h,u.k,u.x],null,null),(l()(),u.pb(2,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),u.Ib(3,null,["",""])),(l()(),u.pb(4,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),u.Ib(5,null,["Creada: ",""])),u.Eb(6,2),u.Db(131072,a.d,[u.h,u.x]),(l()(),u.pb(8,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),u.Ib(9,null,["",": ",""])),u.Eb(10,2),u.Db(131072,a.d,[u.h,u.x]),(l()(),u.pb(12,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Ib(13,null,["id: ",""]))],null,(function(l,n){var t=n.component;l(n,3,0,t.draw?t.draw.lottery+" "+t.draw.draw:"");var o=u.Jb(n,5,0,u.Bb(n,7).transform(u.Jb(n,5,0,l(n,6,0,u.Bb(n.parent,0),t.draw.emitDate,"es-do"))));l(n,5,0,o);var e=t.dateNow>t.dateExp?"Venci\xf3":"Vence",i=u.Jb(n,9,1,u.Bb(n,11).transform(u.Jb(n,9,1,l(n,10,0,u.Bb(n.parent,0),t.draw.expiryDate,"es-do"))));l(n,9,0,e,i),l(n,13,0,t.draw._id)}))}function m(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"th",[],[[8,"className",0]],null,null,null,null)),(l()(),u.Ib(1,null,[" "," "]))],null,(function(l,n){l(n,0,0,u.tb(1,"","L.MAS"==n.context.$implicit?"lmas":"S.L.MAS"==n.context.$implicit?"slmas":"normal","")),l(n,1,0,n.context.$implicit)}))}function v(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),u.Ib(1,null,[" "," "]))],null,(function(l,n){l(n,1,0,n.context.$implicit)}))}function x(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),u.pb(1,0,null,null,1,"td",[["style","background-color: blanchedalmond;"]],null,null,null,null,null)),(l()(),u.Ib(2,null,["",""])),(l()(),u.eb(16777216,null,null,1,null,v)),u.ob(4,278528,null,0,c.k,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null),(l()(),u.pb(5,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["-"]))],(function(l,n){l(n,4,0,n.context.$implicit)}),(function(l,n){l(n,2,0,n.context.index+1+".-")}))}function w(l){return u.Kb(0,[u.Db(0,a.a,[]),(l()(),u.pb(1,0,null,null,17,"ion-header",[],null,null,null,i.ab,i.q)),u.ob(2,49152,null,0,r.C,[u.h,u.k,u.x],{translucent:[0,"translucent"]},null),(l()(),u.pb(3,0,null,0,15,"ion-toolbar",[["color","tertiary"]],null,null,null,i.tb,i.J)),u.ob(4,49152,null,0,r.Ab,[u.h,u.k,u.x],{color:[0,"color"]},null),(l()(),u.pb(5,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,i.O,i.e)),u.ob(6,49152,null,0,r.m,[u.h,u.k,u.x],null,null),(l()(),u.pb(7,0,null,0,2,"ion-back-button",[],null,[[null,"click"]],(function(l,n,t){var o=!0;return"click"===n&&(o=!1!==u.Bb(l,9).onClick(t)&&o),o}),i.M,i.c)),u.ob(8,49152,null,0,r.h,[u.h,u.k,u.x],null,null),u.ob(9,16384,null,0,r.i,[[2,r.gb],r.Fb],null,null),(l()(),u.pb(10,0,null,0,2,"ion-title",[],null,null,null,i.rb,i.H)),u.ob(11,49152,null,0,r.yb,[u.h,u.k,u.x],null,null),(l()(),u.Ib(-1,0,["Archivo"])),(l()(),u.pb(13,0,null,0,5,"ion-buttons",[["slot","end"]],null,null,null,i.O,i.e)),u.ob(14,49152,null,0,r.m,[u.h,u.k,u.x],null,null),(l()(),u.pb(15,0,null,0,3,"ion-button",[],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.openActions()&&u),u}),i.N,i.d)),u.ob(16,49152,null,0,r.l,[u.h,u.k,u.x],null,null),(l()(),u.pb(17,0,null,0,1,"ion-icon",[],null,null,null,i.bb,i.r)),u.ob(18,49152,null,0,r.D,[u.h,u.k,u.x],{ios:[0,"ios"],md:[1,"md"]},null),(l()(),u.pb(19,0,null,null,24,"ion-content",[],null,null,null,i.U,i.k)),u.ob(20,49152,null,0,r.v,[u.h,u.k,u.x],null,null),(l()(),u.pb(21,0,null,0,7,"ion-item",[["lines","none"]],null,null,null,i.db,i.t)),u.ob(22,49152,null,0,r.I,[u.h,u.k,u.x],{lines:[0,"lines"]},null),(l()(),u.pb(23,0,null,0,3,"ion-avatar",[],null,null,null,i.L,i.b)),u.ob(24,49152,null,0,r.g,[u.h,u.k,u.x],null,null),(l()(),u.pb(25,0,null,0,1,"ion-icon",[["color","danger"],["size","large"]],null,null,null,i.bb,i.r)),u.ob(26,49152,null,0,r.D,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null),(l()(),u.eb(16777216,null,0,1,null,g)),u.ob(28,16384,null,0,c.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.pb(29,0,null,0,14,"div",[["class","t-container"]],null,null,null,null,null)),(l()(),u.pb(30,0,null,null,13,"table",[["class","table"]],null,null,null,null,null)),(l()(),u.pb(31,0,null,null,9,"thead",[["class","thead"]],null,null,null,null,null)),(l()(),u.pb(32,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),u.pb(33,0,null,null,1,"th",[["class","normal"]],null,null,null,null,null)),(l()(),u.Ib(-1,null,[" #No "])),(l()(),u.eb(16777216,null,null,1,null,m)),u.ob(36,278528,null,0,c.k,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null),(l()(),u.pb(37,0,null,null,1,"th",[["class","normal"]],null,null,null,null,null)),(l()(),u.Ib(-1,null,[" Modo "])),(l()(),u.pb(39,0,null,null,1,"th",[["class","normal"]],null,null,null,null,null)),(l()(),u.Ib(-1,null,[" Cr\xe9ditos "])),(l()(),u.pb(41,0,null,null,2,"tbody",[["class","tbody"]],null,null,null,null,null)),(l()(),u.eb(16777216,null,null,1,null,x)),u.ob(43,278528,null,0,c.k,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var t=n.component;l(n,2,0,!0),l(n,4,0,"tertiary"),l(n,18,0,"ellipsis-vertical-circle-sharp","ellipsis-vertical-sharp"),l(n,22,0,"none"),l(n,26,0,"danger","document-outline","document-sharp","large"),l(n,28,0,null!=t.draw),l(n,36,0,t.header),l(n,43,0,t.draw.Data)}),null)}function k(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"app-file-viewer",[],null,null,null,w,f)),u.ob(1,114688,null,0,d,[r.Mb,r.a,p.m,h.a,r.Hb,h.m],null,null)],(function(l,n){l(n,1,0)}),null)}var O=u.lb("app-file-viewer",d,k,{},{},[]),M=t("s7LF");class C{}t.d(n,"FileViewerPageModuleNgFactory",(function(){return y}));var y=u.mb(o,[],(function(l){return u.yb([u.zb(512,u.j,u.X,[[8,[e.a,O]],[3,u.j],u.v]),u.zb(4608,c.n,c.m,[u.s,[2,c.v]]),u.zb(4608,M.o,M.o,[]),u.zb(4608,r.c,r.c,[u.x,u.g]),u.zb(4608,r.Eb,r.Eb,[r.c,u.j,u.p]),u.zb(4608,r.Ib,r.Ib,[r.c,u.j,u.p]),u.zb(1073742336,c.c,c.c,[]),u.zb(1073742336,M.n,M.n,[]),u.zb(1073742336,M.e,M.e,[]),u.zb(1073742336,r.Cb,r.Cb,[]),u.zb(1073742336,a.b,a.b,[]),u.zb(1073742336,h.q,h.q,[[2,h.v],[2,h.m]]),u.zb(1073742336,C,C,[]),u.zb(1073742336,o,o,[]),u.zb(1024,h.k,(function(){return[[{path:"",component:d}]]}),[])])}))}}]);