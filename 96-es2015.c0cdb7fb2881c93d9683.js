(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{F6Eh:function(l,n,t){"use strict";t.r(n);var u=t("8Y7J");class e{}var o=t("pMnS"),i=t("MKJQ"),r=t("sZkV"),c=t("s7LF"),a=t("SVse"),b=t("lawv"),s=t("mrSG"),d=t("Z54v"),p=t("eWZr");class h{constructor(l,n,t,u,e,o,i){this.toastCtrl=l,this.alertCtrl=n,this.actionCtrl=t,this.platform=u,this.store=e,this.activatedRoute=o,this.router=i,this.alertSound=new Audio,this.dateNow=new Date(Date.now()),this.user={archived:[],recicle:[],name:"",password:""}}matdesign(){return!(!this.platform.is("android")&&!this.platform.is("desktop"))}ngOnInit(){this.detail=!1,this.folder=this.activatedRoute.snapshot.paramMap.get("id"),this.store.select("user_state").subscribe(l=>{this.user=Object.assign({},l),this.user.archived=[...l.archived],this.user.recicle=[...l.recicle]})}openFolder(l,n){return s.a(this,void 0,void 0,(function*(){this.indexSelected=l,this.router.navigate(["/file",l])}))}openActions(l){return s.a(this,void 0,void 0,(function*(){const n="Reciclaje"===this.folder?this.recicleOptions(l):this.normalOptions(l),t=yield this.actionCtrl.create(n);yield t.present()}))}restore(l){return s.a(this,void 0,void 0,(function*(){"user"===this.user.recicle[l].owner&&(yield this.store.dispatch(Object(d.b)({draw:this.user.recicle[l]}))),"admin"===this.user.recicle[l].owner&&(yield this.store.dispatch(Object(p.e)(this.user.recicle[l]))),yield this.store.dispatch(Object(d.c)({index:l}))}))}normalOptions(l){let n={header:"Acciones",translucent:!0,buttons:[{text:"favorito",icon:"heart",handler:()=>{this.store.dispatch(Object(d.f)({index:l})),this.detail=!this.detail}},{text:"reciclar",icon:"trash",cssClass:"delete",role:"destructive",handler:()=>{this.store.dispatch(Object(d.g)({index:l})),this.showToast("Enviado a la papelera de reciclaje"),this.detail=!this.detail}},{text:"cancelar",icon:"close",role:"cancel"}]};return"Archivadas"!=this.folder&&(n.buttons[0].icon="heart-dislike"),n}recicleOptions(l){return{header:"Acciones",translucent:!0,buttons:[{text:"restaurar",icon:"push",handler:()=>{this.restore(l)}},{text:"eliminar",icon:"close-circle",cssClass:"delete",handler:()=>{this.showAlert(!1,l)}},{text:"vaciar papelera",icon:"trash-bin",cssClass:"delete",role:"destructive",handler:()=>{this.showAlert(!0)}},{text:"cancelar",icon:"close",role:"cancel"}]}}showAlert(l,n){return s.a(this,void 0,void 0,(function*(){(yield this.alertCtrl.create({header:"Alerta!",message:"<strong>Al eliminar estos archivos no se podran recuperar</strong>",animated:!0,backdropDismiss:!1,translucent:!0,buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary"},{text:"Ok",cssClass:"primary",handler:()=>{this.store.dispatch(l?Object(d.d)():Object(d.c)({index:n}))}}]})).present().then(()=>{this.alertSound.src="assets/notify.mp3",this.alertSound.volume=1,this.alertSound.onloadeddata=()=>{this.alertSound.play()}})}))}showToast(l){return s.a(this,void 0,void 0,(function*(){const n=yield this.toastCtrl.create({message:l,duration:4e3});yield n.present()}))}}var f=t("DQLy"),m=t("iInd"),g=u.nb({encapsulation:0,styles:[[".truncate-text[_ngcontent-%COMP%]{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}ion-content[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:transparent}.selected[_ngcontent-%COMP%]{--background:rgba(var(--ion-color-medium-rgb), 0.14)}.card-hover[_ngcontent-%COMP%]:hover{cursor:pointer}ion-item[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{--background:--ion-color-light-rgb}ion-item[_ngcontent-%COMP%]{--padding-start:10px;--padding-end:10px;border-radius:4px}ion-item.selected[_ngcontent-%COMP%]{--background:rgba(var(--ion-color-primary-rgb), 0.14)}ion-item.selected[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:var(--ion-color-primary)}ion-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:#616e7e}ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-weight:500}"]],data:{}});function x(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,4,"ion-button",[],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.showAlert(!0)&&u),u}),i.M,i.d)),u.ob(1,49152,null,0,r.k,[u.h,u.k,u.x],{disabled:[0,"disabled"]},null),(l()(),u.Ib(-1,0,[" Vaciar "])),(l()(),u.pb(3,0,null,0,1,"ion-icon",[["color","danger"]],null,null,null,i.ab,i.r)),u.ob(4,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"]},null)],(function(l,n){l(n,1,0,u.tb(1,"",0===n.component.user.recicle.length,"")),l(n,4,0,"danger","trash-bin-outline","trash-bin-sharp")}),null)}function k(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,3,"ion-searchbar",[["animated",""]],null,[[null,"ionBlur"],[null,"ionChange"]],(function(l,n,t){var e=!0;return"ionBlur"===n&&(e=!1!==u.Bb(l,3)._handleBlurEvent(t.target)&&e),"ionChange"===n&&(e=!1!==u.Bb(l,3)._handleInputEvent(t.target)&&e),e}),i.lb,i.C)),u.Fb(5120,null,c.g,(function(l){return[l]}),[r.Kb]),u.ob(2,49152,null,0,r.hb,[u.h,u.k,u.x],{animated:[0,"animated"]},null),u.ob(3,16384,null,0,r.Kb,[u.k],null,null)],(function(l,n){l(n,2,0,"")}),null)}function v(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"ion-icon",[["color","warning"],["size","large"]],null,null,null,i.ab,i.r)),u.ob(1,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(l,n){l(n,1,0,"warning","folder-open-outline","folder-open-sharp","large")}),null)}function I(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"ion-icon",[["color","primary"],["size","large"]],null,null,null,i.ab,i.r)),u.ob(1,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(l,n){l(n,1,0,"primary","folder-outline","folder-sharp","large")}),null)}function C(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,16,"ion-item",[["button",""]],[[2,"selected",null]],null,null,i.cb,i.t)),u.ob(1,49152,null,0,r.H,[u.h,u.k,u.x],{button:[0,"button"]},null),(l()(),u.pb(2,0,null,0,4,"ion-avatar",[["slot","start"]],null,null,null,i.K,i.b)),u.ob(3,49152,null,0,r.f,[u.h,u.k,u.x],null,null),(l()(),u.eb(16777216,null,0,1,null,v)),u.ob(5,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(l()(),u.eb(0,[["closeBlock",2]],0,0,null,I)),(l()(),u.pb(7,0,null,0,9,"ion-label",[],null,null,null,i.db,i.u)),u.ob(8,49152,null,0,r.N,[u.h,u.k,u.x],null,null),(l()(),u.pb(9,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),u.Ib(10,null,["Loter\xeda: ",""])),(l()(),u.pb(11,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),u.Ib(12,null,["Creada: ",""])),u.Eb(13,2),u.Db(131072,b.d,[u.h,u.x]),(l()(),u.pb(15,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Ib(16,null,["activa: ",""]))],(function(l,n){var t=n.component;l(n,1,0,""),l(n,5,0,t.indexSelected===n.parent.parent.context.index&&t.detail,u.Bb(n,6))}),(function(l,n){l(n,0,0,n.component.indexSelected==n.parent.parent.context.index),l(n,10,0,n.parent.parent.context.$implicit.lottery+" "+n.parent.parent.context.$implicit.draw);var t=u.Jb(n,12,0,u.Bb(n,14).transform(u.Jb(n,12,0,l(n,13,0,u.Bb(n.parent.parent.parent,0),n.parent.parent.context.$implicit.emitDate,"es-do"))));l(n,12,0,t),l(n,16,0,n.parent.parent.context.$implicit.active?"Si":"No")}))}function z(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),u.eb(16777216,null,null,1,null,C)),u.ob(2,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,2,0,!n.parent.context.$implicit.favorite)}),null)}function w(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"ion-icon",[["color","warning"],["size","large"]],null,null,null,i.ab,i.r)),u.ob(1,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(l,n){l(n,1,0,"warning","folder-open-outline","folder-open-sharp","large")}),null)}function M(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"ion-icon",[["color","tertiary"],["size","large"]],null,null,null,i.ab,i.r)),u.ob(1,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(l,n){l(n,1,0,"tertiary","folder-outline","folder-sharp","large")}),null)}function O(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,18,"ion-item",[["button",""]],[[2,"selected",null]],null,null,i.cb,i.t)),u.ob(1,49152,null,0,r.H,[u.h,u.k,u.x],{button:[0,"button"]},null),(l()(),u.pb(2,0,null,0,4,"ion-avatar",[["slot","start"]],null,null,null,i.K,i.b)),u.ob(3,49152,null,0,r.f,[u.h,u.k,u.x],null,null),(l()(),u.eb(16777216,null,0,1,null,w)),u.ob(5,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(l()(),u.eb(0,[["closeBlock",2]],0,0,null,M)),(l()(),u.pb(7,0,null,0,9,"ion-label",[],null,null,null,i.db,i.u)),u.ob(8,49152,null,0,r.N,[u.h,u.k,u.x],null,null),(l()(),u.pb(9,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),u.Ib(10,null,["Loter\xeda: ",""])),(l()(),u.pb(11,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),u.Ib(12,null,["Creada: ",""])),u.Eb(13,2),u.Db(131072,b.d,[u.h,u.x]),(l()(),u.pb(15,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Ib(16,null,["activa: ",""])),(l()(),u.pb(17,0,null,0,1,"ion-icon",[["color","danger"],["slot","end"]],null,null,null,i.ab,i.r)),u.ob(18,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"]},null)],(function(l,n){var t=n.component;l(n,1,0,""),l(n,5,0,t.indexSelected===n.parent.parent.context.index&&t.detail,u.Bb(n,6)),l(n,18,0,"danger","heart-outline","heart-sharp")}),(function(l,n){l(n,0,0,n.component.indexSelected==n.parent.parent.context.index),l(n,10,0,n.parent.parent.context.$implicit.lottery+" "+n.parent.parent.context.$implicit.draw);var t=u.Jb(n,12,0,u.Bb(n,14).transform(u.Jb(n,12,0,l(n,13,0,u.Bb(n.parent.parent.parent,0),n.parent.parent.context.$implicit.emitDate,"es-do"))));l(n,12,0,t),l(n,16,0,n.parent.parent.context.$implicit.active?"Si":"No")}))}function y(l){return u.Kb(0,[(l()(),u.eb(16777216,null,null,1,null,O)),u.ob(1,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(0,null,null,0))],(function(l,n){l(n,1,0,n.parent.context.$implicit.favorite&&"Favoritas"===n.component.folder)}),null)}function J(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,3,"div",[["style","padding: 0; margin: 0;"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.openFolder(l.context.index,l.context.$implicit)&&u),u}),null,null)),(l()(),u.eb(16777216,null,null,1,null,z)),u.ob(2,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(l()(),u.eb(0,[["elseBlock",2]],null,0,null,y))],(function(l,n){l(n,2,0,"Archivadas"===n.component.folder,u.Bb(n,3))}),null)}function K(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"ion-icon",[["color","danger"],["size","large"]],null,null,null,i.ab,i.r)),u.ob(1,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(l,n){l(n,1,0,"danger","folder-outline","folder-sharp","large")}),null)}function _(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"ion-icon",[["color","danger"],["size","large"]],null,null,null,i.ab,i.r)),u.ob(1,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(l,n){l(n,1,0,"danger","document-outline","document-sharp","large")}),null)}function B(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,19,"ion-item",[["button",""],["detail","true"]],[[2,"selected",null]],null,null,i.cb,i.t)),u.ob(1,49152,null,0,r.H,[u.h,u.k,u.x],{button:[0,"button"],detail:[1,"detail"]},null),(l()(),u.pb(2,0,null,0,5,"ion-avatar",[["slot","start"]],null,null,null,i.K,i.b)),u.ob(3,49152,null,0,r.f,[u.h,u.k,u.x],null,null),(l()(),u.eb(16777216,null,0,1,null,K)),u.ob(5,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,0,1,null,_)),u.ob(7,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.pb(8,0,null,0,11,"ion-label",[],null,null,null,i.db,i.u)),u.ob(9,49152,null,0,r.N,[u.h,u.k,u.x],null,null),(l()(),u.pb(10,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),u.Ib(11,null,["Loter\xeda: ",""])),(l()(),u.pb(12,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),u.Ib(13,null,["Creada: ",""])),u.Eb(14,2),u.Db(131072,b.d,[u.h,u.x]),(l()(),u.pb(16,0,null,0,1,"h4",[],null,null,null,null,null)),(l()(),u.Ib(17,null,["type: ",""])),(l()(),u.pb(18,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Ib(19,null,["id: ",""]))],(function(l,n){l(n,1,0,"","true"),l(n,5,0,"user"===n.parent.context.$implicit.owner),l(n,7,0,"admin"===n.parent.context.$implicit.owner)}),(function(l,n){l(n,0,0,n.component.indexSelected==n.parent.context.index),l(n,11,0,n.parent.context.$implicit?n.parent.context.$implicit.lottery+" "+n.parent.context.$implicit.draw:"");var t=u.Jb(n,13,0,u.Bb(n,15).transform(u.Jb(n,13,0,l(n,14,0,u.Bb(n.parent.parent,0),n.parent.context.$implicit.emitDate,"es-do"))));l(n,13,0,t),l(n,17,0,"user"===n.parent.context.$implicit.owner?"folder":"document"),l(n,19,0,n.parent.context.$implicit._id)}))}function $(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,2,"div",[["style","padding: 0; margin: 0;"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.openActions(l.context.index)&&u),u}),null,null)),(l()(),u.eb(16777216,null,null,1,null,B)),u.ob(2,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,2,0,"Reciclaje"===n.component.folder)}),null)}function P(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,25,"ion-label",[],null,null,null,i.db,i.u)),u.ob(1,49152,null,0,r.N,[u.h,u.k,u.x],null,null),(l()(),u.pb(2,0,null,0,23,"ion-toolbar",[],null,null,null,i.rb,i.I)),u.ob(3,49152,null,0,r.zb,[u.h,u.k,u.x],null,null),(l()(),u.pb(4,0,null,0,1,"h2",[],null,null,null,null,null)),(l()(),u.Ib(5,null,["",""])),(l()(),u.pb(6,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),u.Ib(7,null,["Creada: ",""])),u.Eb(8,2),u.Db(131072,b.d,[u.h,u.x]),(l()(),u.pb(10,0,null,0,3,"h3",[],null,null,null,null,null)),(l()(),u.Ib(11,null,["",": ",""])),u.Eb(12,2),u.Db(131072,b.d,[u.h,u.x]),(l()(),u.pb(14,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),u.Ib(15,null,["id: ",""])),(l()(),u.pb(16,0,null,0,9,"ion-buttons",[["slot","end"]],null,null,null,i.N,i.e)),u.ob(17,49152,null,0,r.l,[u.h,u.k,u.x],null,null),(l()(),u.pb(18,0,null,0,3,"ion-button",[],null,[[null,"click"]],(function(l,n,t){var u=!0,e=l.component;return"click"===n&&(u=!1!==e.openActions(e.indexSelected)&&u),u}),i.M,i.d)),u.ob(19,49152,null,0,r.k,[u.h,u.k,u.x],null,null),(l()(),u.pb(20,0,null,0,1,"ion-icon",[],null,null,null,i.ab,i.r)),u.ob(21,49152,null,0,r.C,[u.h,u.k,u.x],{ios:[0,"ios"],md:[1,"md"]},null),(l()(),u.pb(22,0,null,0,3,"ion-button",[],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=0!=(l.component.detail=!1)&&u),u}),i.M,i.d)),u.ob(23,49152,null,0,r.k,[u.h,u.k,u.x],null,null),(l()(),u.pb(24,0,null,0,1,"ion-icon",[["color","danger"],["name","close-circle-outline"]],null,null,null,i.ab,i.r)),u.ob(25,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],name:[1,"name"]},null)],(function(l,n){l(n,21,0,"ellipsis-horizontal-circle-sharp","ellipsis-vertical-sharp"),l(n,25,0,"danger","close-circle-outline")}),(function(l,n){var t=n.component;l(n,5,0,t.draw?t.draw.lottery+" "+t.draw.draw:"");var e=u.Jb(n,7,0,u.Bb(n,9).transform(u.Jb(n,7,0,l(n,8,0,u.Bb(n.parent.parent,0),t.draw.emitDate,"es-do"))));l(n,7,0,e);var o=t.dateNow>t.dateExp?"Venci\xf3":"Vence",i=u.Jb(n,11,1,u.Bb(n,13).transform(u.Jb(n,11,1,l(n,12,0,u.Bb(n.parent.parent,0),t.draw.expiryDate,"es-do"))));l(n,11,0,o,i),l(n,15,0,t.draw._id)}))}function j(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"ion-icon",[["color","success"],["name","cash-outline"],["slot","start"]],null,null,null,i.ab,i.r)),u.ob(1,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"success","cash-outline")}),null)}function S(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"ion-icon",[["color","warning"],["name","construct-outline"],["slot","start"]],null,null,null,i.ab,i.r)),u.ob(1,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"warning","construct-outline")}),null)}function D(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"ion-icon",[["color","danger"],["name","shuffle-outline"],["slot","start"]],null,null,null,i.ab,i.r)),u.ob(1,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"danger","shuffle-outline")}),null)}function E(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,7,"p",[],[[8,"className",0]],null,null,null,null)),(l()(),u.Ib(1,null,[" "," "])),(l()(),u.eb(16777216,null,null,1,null,j)),u.ob(3,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,S)),u.ob(5,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,D)),u.ob(7,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,3,0,"normal"==n.parent.context.$implicit[n.context.index]),l(n,5,0,"personalizado"==n.parent.context.$implicit[n.context.index]),l(n,7,0,"aleatorio"==n.parent.context.$implicit[n.context.index])}),(function(l,n){l(n,0,0,u.tb(1,"",n.context.index>n.parent.context.$implicit.length-2?"truncate-text":"","")),l(n,1,0," - "+n.context.$implicit)}))}function F(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,5,"ion-item",[["button",""],["detail","true"]],null,null,null,i.cb,i.t)),u.ob(1,49152,null,0,r.H,[u.h,u.k,u.x],{button:[0,"button"],detail:[1,"detail"]},null),(l()(),u.pb(2,0,null,0,1,"ion-icon",[["name","heart-circle-outline"]],null,null,null,i.ab,i.r)),u.ob(3,49152,null,0,r.C,[u.h,u.k,u.x],{name:[0,"name"]},null),(l()(),u.eb(16777216,null,0,1,null,E)),u.ob(5,278528,null,0,a.k,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,1,0,"","true"),l(n,3,0,"heart-circle-outline"),l(n,5,0,n.context.$implicit)}),null)}function A(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,13,"ion-col",[["size","11.5"],["size-md",""]],null,null,null,i.S,i.j)),u.ob(1,49152,null,0,r.t,[u.h,u.k,u.x],{size:[0,"size"]},null),(l()(),u.pb(2,0,null,0,11,"ion-list",[],null,null,null,i.fb,i.v)),u.ob(3,49152,null,0,r.O,[u.h,u.k,u.x],null,null),(l()(),u.pb(4,0,null,0,7,"ion-item",[["button",""],["detail","true"]],null,null,null,i.cb,i.t)),u.ob(5,49152,null,0,r.H,[u.h,u.k,u.x],{button:[0,"button"],detail:[1,"detail"]},null),(l()(),u.pb(6,0,null,0,3,"ion-avatar",[],null,null,null,i.K,i.b)),u.ob(7,49152,null,0,r.f,[u.h,u.k,u.x],null,null),(l()(),u.pb(8,0,null,0,1,"ion-icon",[["color","danger"],["size","large"]],null,null,null,i.ab,i.r)),u.ob(9,49152,null,0,r.C,[u.h,u.k,u.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null),(l()(),u.eb(16777216,null,0,1,null,P)),u.ob(11,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,0,1,null,F)),u.ob(13,278528,null,0,a.k,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var t=n.component;l(n,1,0,"11.5"),l(n,5,0,"","true"),l(n,9,0,"danger","document-outline","document-sharp","large"),l(n,11,0,null!=t.draw&&"Reciclaje"!=t.folder),l(n,13,0,t.draw.Data)}),null)}function N(l){return u.Kb(0,[u.Db(0,b.a,[]),(l()(),u.pb(1,0,null,null,16,"ion-header",[],null,null,null,i.Z,i.q)),u.ob(2,49152,null,0,r.B,[u.h,u.k,u.x],{translucent:[0,"translucent"]},null),(l()(),u.pb(3,0,null,0,12,"ion-toolbar",[["color","tertiary"]],null,null,null,i.rb,i.I)),u.ob(4,49152,null,0,r.zb,[u.h,u.k,u.x],{color:[0,"color"]},null),(l()(),u.pb(5,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,i.N,i.e)),u.ob(6,49152,null,0,r.l,[u.h,u.k,u.x],null,null),(l()(),u.pb(7,0,null,0,1,"ion-menu-button",[],null,null,null,i.gb,i.y)),u.ob(8,49152,null,0,r.R,[u.h,u.k,u.x],null,null),(l()(),u.pb(9,0,null,0,2,"ion-title",[],null,null,null,i.qb,i.H)),u.ob(10,49152,null,0,r.xb,[u.h,u.k,u.x],null,null),(l()(),u.Ib(11,0,["",""])),(l()(),u.pb(12,0,null,0,3,"ion-buttons",[["slot","end"]],null,null,null,i.N,i.e)),u.ob(13,49152,null,0,r.l,[u.h,u.k,u.x],null,null),(l()(),u.eb(16777216,null,0,1,null,x)),u.ob(15,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,0,1,null,k)),u.ob(17,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.pb(18,0,null,null,15,"ion-content",[],null,null,null,i.T,i.k)),u.ob(19,49152,null,0,r.u,[u.h,u.k,u.x],null,null),(l()(),u.pb(20,0,null,0,13,"ion-grid",[],null,null,null,i.Y,i.p)),u.ob(21,49152,null,0,r.A,[u.h,u.k,u.x],null,null),(l()(),u.pb(22,0,null,0,11,"ion-row",[],null,null,null,i.kb,i.B)),u.ob(23,49152,null,0,r.gb,[u.h,u.k,u.x],null,null),(l()(),u.pb(24,0,null,0,7,"ion-col",[["size-md",""]],null,null,null,i.S,i.j)),u.ob(25,49152,null,0,r.t,[u.h,u.k,u.x],{size:[0,"size"]},null),(l()(),u.pb(26,0,null,0,5,"ion-list",[],null,null,null,i.fb,i.v)),u.ob(27,49152,null,0,r.O,[u.h,u.k,u.x],null,null),(l()(),u.eb(16777216,null,0,1,null,J)),u.ob(29,278528,null,0,a.k,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null),(l()(),u.eb(16777216,null,0,1,null,$)),u.ob(31,278528,null,0,a.k,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null),(l()(),u.eb(16777216,null,0,1,null,A)),u.ob(33,16384,null,0,a.l,[u.M,u.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){var t=n.component;l(n,2,0,!0),l(n,4,0,"tertiary"),l(n,15,0,"Reciclaje"===t.folder),l(n,17,0,"Reciclaje"!=t.folder),l(n,25,0,u.tb(1,"",t.detail?"0.5":"12","")),l(n,29,0,t.user.archived),l(n,31,0,t.user.recicle),l(n,33,0,t.detail)}),(function(l,n){l(n,11,0,n.component.folder)}))}function q(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"app-folder",[],null,null,null,N,g)),u.ob(1,114688,null,0,h,[r.Lb,r.b,r.a,r.Gb,f.m,m.a,m.m],null,null)],(function(l,n){l(n,1,0)}),null)}var H=u.lb("app-folder",h,q,{},{},[]);class R{}t.d(n,"FolderPageModuleNgFactory",(function(){return L}));var L=u.mb(e,[],(function(l){return u.yb([u.zb(512,u.j,u.X,[[8,[o.a,H]],[3,u.j],u.v]),u.zb(4608,a.n,a.m,[u.s,[2,a.v]]),u.zb(4608,c.o,c.o,[]),u.zb(4608,r.c,r.c,[u.x,u.g]),u.zb(4608,r.Db,r.Db,[r.c,u.j,u.p]),u.zb(4608,r.Hb,r.Hb,[r.c,u.j,u.p]),u.zb(1073742336,a.c,a.c,[]),u.zb(1073742336,c.n,c.n,[]),u.zb(1073742336,c.e,c.e,[]),u.zb(1073742336,b.b,b.b,[]),u.zb(1073742336,r.Bb,r.Bb,[]),u.zb(1073742336,m.q,m.q,[[2,m.v],[2,m.m]]),u.zb(1073742336,R,R,[]),u.zb(1073742336,e,e,[]),u.zb(1024,m.k,(function(){return[[{path:"",component:h}]]}),[]),u.zb(256,b.c,{},[])])}))}}]);