function _defineProperties(l,n){for(var t=0;t<n.length;t++){var e=n[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(l,e.key,e)}}function _createClass(l,n,t){return n&&_defineProperties(l.prototype,n),t&&_defineProperties(l,t),l}function _classCallCheck(l,n){if(!(l instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{W3OI:function(l,n,t){"use strict";t.r(n);var e=t("8Y7J"),u=function l(){_classCallCheck(this,l)},o=t("pMnS"),r=t("MKJQ"),i=t("sZkV"),a=t("lawv"),c=t("SVse"),s=t("mrSG"),b=t("Z54v"),d=function(){function l(n,t,e,u,o,r){_classCallCheck(this,l),this.toastCtrl=n,this.actionCtrl=t,this.store=e,this.activeRoute=u,this.platform=o,this.router=r,this.header=[],this.dateNow=new Date(Date.now())}return _createClass(l,[{key:"ngOnInit",value:function(){return s.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var n=this;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return this.index=parseInt(this.activeRoute.snapshot.paramMap.get("id")),l.next=3,this.store.select("user_state").subscribe((function(l){var t=Object.assign({},l);n.draw=t.archived[n.index]}));case 3:["PRIMERO","SEGUNDO","TERCERO","QUARTO","QUINTO","SEXTO","L.MAS","S.L.MAS"].map((function(l,t){t<n.draw.ballsqty&&n.header.push(l)})),this.dateExp=this.draw.expiryDate;case 5:case"end":return l.stop()}}),l,this)})))}},{key:"openActions",value:function(){return s.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var n;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,this.actionCtrl.create(this.normalOptions(this.index));case 2:return n=l.sent,l.next=5,n.present();case 5:case"end":return l.stop()}}),l,this)})))}},{key:"normalOptions",value:function(l){var n=this,t={header:"Acciones",translucent:!0,buttons:[{text:"favorito",icon:"heart",handler:function(){n.store.dispatch(Object(b.f)({index:l})),n.router.navigate(["folder","Archivadas"])}},{text:"reciclar",icon:"trash",cssClass:"delete",role:"destructive",handler:function(){n.store.dispatch(Object(b.g)({index:l})),n.showToast("Enviado a la papelera de reciclaje"),n.router.navigate(["folder","Archivadas"])}},{text:"cancelar",icon:"close",role:"cancel"}]};return this.draw.favorite&&(t.buttons[0].icon="heart-dislike"),t}},{key:"showToast",value:function(l){return s.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.toastCtrl.create({position:"top",buttons:[{icon:"close",side:"end",role:"cancel"}],message:l,animated:!0,translucent:!0,duration:4e3});case 2:return(t=n.sent).position=this.matdesign?"bottom":"top",n.next=6,t.present();case 6:case"end":return n.stop()}}),n,this)})))}},{key:"matdesign",get:function(){return!(!this.platform.is("android")&&!this.platform.is("desktop"))}}]),l}(),p=t("DQLy"),f=t("iInd"),h=e.nb({encapsulation:0,styles:[[".t-container[_ngcontent-%COMP%]{width:72vw}.table[_ngcontent-%COMP%]{width:100%;align-content:center}h4[_ngcontent-%COMP%]{margin:0;padding:.3em;width:100%;background-color:#000;color:#fff;text-align:center}.thead[_ngcontent-%COMP%]{background-color:#000;color:#fff}.normal[_ngcontent-%COMP%]{border-top:1px solid #fff;border-right:1px solid #fff}.lmas[_ngcontent-%COMP%]{background-color:red;color:#fff;border-top:1px solid #fff;border-right:1px solid #fff}.slmas[_ngcontent-%COMP%]{background-color:#00f;color:#fff;border-top:1px solid #fff;border-right:1px solid #fff}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{padding:.8em;width:auto}tr[_ngcontent-%COMP%]:nth-child(even){background-color:#f2f2f2}.tbody[_ngcontent-%COMP%]{text-align:center}.d-none[_ngcontent-%COMP%]{display:none}.truncate-text[_ngcontent-%COMP%]{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media only screen and (max-width:992px){.t-container[_ngcontent-%COMP%]{width:100vw;overflow-x:auto;-webkit-overflow-scrolling:touch}}@media only screen and (width:1024px){.t-container[_ngcontent-%COMP%]{width:72vw;overflow-x:auto;-webkit-overflow-scrolling:touch}}"]],data:{}});function g(l){return e.Kb(0,[(l()(),e.pb(0,0,null,null,13,"ion-label",[],null,null,null,r.eb,r.u)),e.ob(1,49152,null,0,i.O,[e.h,e.k,e.x],null,null),(l()(),e.pb(2,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),e.Ib(3,null,["",""])),(l()(),e.pb(4,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),e.Ib(5,null,["Creada: ",""])),e.Eb(6,2),e.Db(131072,a.d,[e.h,e.x]),(l()(),e.pb(8,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),e.Ib(9,null,["",": ",""])),e.Eb(10,2),e.Db(131072,a.d,[e.h,e.x]),(l()(),e.pb(12,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),e.Ib(13,null,["id: ",""]))],null,(function(l,n){var t=n.component;l(n,3,0,t.draw?t.draw.lottery+" "+t.draw.draw:"");var u=e.Jb(n,5,0,e.Bb(n,7).transform(e.Jb(n,5,0,l(n,6,0,e.Bb(n.parent,0),t.draw.emitDate,"es-do"))));l(n,5,0,u);var o=t.dateNow>t.dateExp?"Venci\xf3":"Vence",r=e.Jb(n,9,1,e.Bb(n,11).transform(e.Jb(n,9,1,l(n,10,0,e.Bb(n.parent,0),t.draw.expiryDate,"es-do"))));l(n,9,0,o,r),l(n,13,0,t.draw._id)}))}function m(l){return e.Kb(0,[(l()(),e.pb(0,0,null,null,1,"th",[],[[8,"className",0]],null,null,null,null)),(l()(),e.Ib(1,null,[" "," "]))],null,(function(l,n){l(n,0,0,e.tb(1,"","L.MAS"==n.context.$implicit?"lmas":"S.L.MAS"==n.context.$implicit?"slmas":"normal","")),l(n,1,0,n.context.$implicit)}))}function v(l){return e.Kb(0,[(l()(),e.pb(0,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Ib(1,null,[" "," "]))],null,(function(l,n){l(n,1,0,n.context.$implicit)}))}function w(l){return e.Kb(0,[(l()(),e.pb(0,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),e.pb(1,0,null,null,1,"td",[["style","background-color: blanchedalmond;"]],null,null,null,null,null)),(l()(),e.Ib(2,null,["",""])),(l()(),e.eb(16777216,null,null,1,null,v)),e.ob(4,278528,null,0,c.k,[e.M,e.J,e.q],{ngForOf:[0,"ngForOf"]},null),(l()(),e.pb(5,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Ib(-1,null,["-"]))],(function(l,n){l(n,4,0,n.context.$implicit)}),(function(l,n){l(n,2,0,n.context.index+1+".-")}))}function x(l){return e.Kb(0,[e.Db(0,a.a,[]),(l()(),e.pb(1,0,null,null,17,"ion-header",[],null,null,null,r.ab,r.q)),e.ob(2,49152,null,0,i.C,[e.h,e.k,e.x],{translucent:[0,"translucent"]},null),(l()(),e.pb(3,0,null,0,15,"ion-toolbar",[["color","tertiary"]],null,null,null,r.tb,r.J)),e.ob(4,49152,null,0,i.Ab,[e.h,e.k,e.x],{color:[0,"color"]},null),(l()(),e.pb(5,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,r.O,r.e)),e.ob(6,49152,null,0,i.m,[e.h,e.k,e.x],null,null),(l()(),e.pb(7,0,null,0,2,"ion-back-button",[],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==e.Bb(l,9).onClick(t)&&u),u}),r.M,r.c)),e.ob(8,49152,null,0,i.h,[e.h,e.k,e.x],null,null),e.ob(9,16384,null,0,i.i,[[2,i.gb],i.Fb],null,null),(l()(),e.pb(10,0,null,0,2,"ion-title",[],null,null,null,r.rb,r.H)),e.ob(11,49152,null,0,i.yb,[e.h,e.k,e.x],null,null),(l()(),e.Ib(-1,0,["Archivo"])),(l()(),e.pb(13,0,null,0,5,"ion-buttons",[["slot","end"]],null,null,null,r.O,r.e)),e.ob(14,49152,null,0,i.m,[e.h,e.k,e.x],null,null),(l()(),e.pb(15,0,null,0,3,"ion-button",[],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.openActions()&&e),e}),r.N,r.d)),e.ob(16,49152,null,0,i.l,[e.h,e.k,e.x],null,null),(l()(),e.pb(17,0,null,0,1,"ion-icon",[],null,null,null,r.bb,r.r)),e.ob(18,49152,null,0,i.D,[e.h,e.k,e.x],{ios:[0,"ios"],md:[1,"md"]},null),(l()(),e.pb(19,0,null,null,24,"ion-content",[],null,null,null,r.U,r.k)),e.ob(20,49152,null,0,i.v,[e.h,e.k,e.x],null,null),(l()(),e.pb(21,0,null,0,7,"ion-item",[["lines","none"]],null,null,null,r.db,r.t)),e.ob(22,49152,null,0,i.I,[e.h,e.k,e.x],{lines:[0,"lines"]},null),(l()(),e.pb(23,0,null,0,3,"ion-avatar",[],null,null,null,r.L,r.b)),e.ob(24,49152,null,0,i.g,[e.h,e.k,e.x],null,null),(l()(),e.pb(25,0,null,0,1,"ion-icon",[["color","danger"],["size","large"]],null,null,null,r.bb,r.r)),e.ob(26,49152,null,0,i.D,[e.h,e.k,e.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null),(l()(),e.eb(16777216,null,0,1,null,g)),e.ob(28,16384,null,0,c.l,[e.M,e.J],{ngIf:[0,"ngIf"]},null),(l()(),e.pb(29,0,null,0,14,"div",[["class","t-container"]],null,null,null,null,null)),(l()(),e.pb(30,0,null,null,13,"table",[["class","table"]],null,null,null,null,null)),(l()(),e.pb(31,0,null,null,9,"thead",[["class","thead"]],null,null,null,null,null)),(l()(),e.pb(32,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),e.pb(33,0,null,null,1,"th",[["class","normal"]],null,null,null,null,null)),(l()(),e.Ib(-1,null,[" #No "])),(l()(),e.eb(16777216,null,null,1,null,m)),e.ob(36,278528,null,0,c.k,[e.M,e.J,e.q],{ngForOf:[0,"ngForOf"]},null),(l()(),e.pb(37,0,null,null,1,"th",[["class","normal"]],null,null,null,null,null)),(l()(),e.Ib(-1,null,[" Modo "])),(l()(),e.pb(39,0,null,null,1,"th",[["class","normal"]],null,null,null,null,null)),(l()(),e.Ib(-1,null,[" Cr\xe9ditos "])),(l()(),e.pb(41,0,null,null,2,"tbody",[["class","tbody"]],null,null,null,null,null)),(l()(),e.eb(16777216,null,null,1,null,w)),e.ob(43,278528,null,0,c.k,[e.M,e.J,e.q],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var t=n.component;l(n,2,0,!0),l(n,4,0,"tertiary"),l(n,18,0,"ellipsis-vertical-circle-sharp","ellipsis-vertical-sharp"),l(n,22,0,"none"),l(n,26,0,"danger","document-outline","document-sharp","large"),l(n,28,0,null!=t.draw),l(n,36,0,t.header),l(n,43,0,t.draw.Data)}),null)}var k=e.lb("app-file-viewer",d,(function(l){return e.Kb(0,[(l()(),e.pb(0,0,null,null,1,"app-file-viewer",[],null,null,null,x,h)),e.ob(1,114688,null,0,d,[i.Mb,i.a,p.m,f.a,i.Hb,f.m],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),C=t("s7LF"),O=function l(){_classCallCheck(this,l)};t.d(n,"FileViewerPageModuleNgFactory",(function(){return M}));var M=e.mb(u,[],(function(l){return e.yb([e.zb(512,e.j,e.X,[[8,[o.a,k]],[3,e.j],e.v]),e.zb(4608,c.n,c.m,[e.s,[2,c.v]]),e.zb(4608,C.o,C.o,[]),e.zb(4608,i.c,i.c,[e.x,e.g]),e.zb(4608,i.Eb,i.Eb,[i.c,e.j,e.p]),e.zb(4608,i.Ib,i.Ib,[i.c,e.j,e.p]),e.zb(1073742336,c.c,c.c,[]),e.zb(1073742336,C.n,C.n,[]),e.zb(1073742336,C.e,C.e,[]),e.zb(1073742336,i.Cb,i.Cb,[]),e.zb(1073742336,a.b,a.b,[]),e.zb(1073742336,f.q,f.q,[[2,f.v],[2,f.m]]),e.zb(1073742336,O,O,[]),e.zb(1073742336,u,u,[]),e.zb(1024,f.k,(function(){return[[{path:"",component:d}]]}),[])])}))}}]);