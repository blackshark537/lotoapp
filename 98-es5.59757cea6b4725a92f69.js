function _toConsumableArray(n){return _arrayWithoutHoles(n)||_iterableToArray(n)||_unsupportedIterableToArray(n)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(n,l){if(n){if("string"==typeof n)return _arrayLikeToArray(n,l);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(n,l):void 0}}function _iterableToArray(n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}function _arrayWithoutHoles(n){if(Array.isArray(n))return _arrayLikeToArray(n)}function _arrayLikeToArray(n,l){(null==l||l>n.length)&&(l=n.length);for(var e=0,t=new Array(l);e<l;e++)t[e]=n[e];return t}function _defineProperties(n,l){for(var e=0;e<l.length;e++){var t=l[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function _createClass(n,l,e){return l&&_defineProperties(n.prototype,l),e&&_defineProperties(n,e),n}function _classCallCheck(n,l){if(!(n instanceof l))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{F6Eh:function(n,l,e){"use strict";e.r(l);var t=e("8Y7J"),o=function n(){_classCallCheck(this,n)},r=e("pMnS"),u=e("MKJQ"),i=e("sZkV"),a=e("s7LF"),c=e("SVse"),s=e("lawv"),b=e("mrSG"),d=e("Z54v"),p=e("eWZr"),f=function(){function n(l,e,t,o,r,u,i){_classCallCheck(this,n),this.toastCtrl=l,this.alertCtrl=e,this.actionCtrl=t,this.platform=o,this.store=r,this.activatedRoute=u,this.router=i,this.alertSound=new Audio,this.dateNow=new Date(Date.now()),this.user={archived:[],recycle:[],name:"",password:""}}return _createClass(n,[{key:"ngOnInit",value:function(){var n=this;this.folder=this.activatedRoute.snapshot.paramMap.get("id"),this.store.select("user_state").subscribe((function(l){n.user=Object.assign({},l),n.user.archived=_toConsumableArray(l.archived),n.user.recycle=_toConsumableArray(l.recycle)}))}},{key:"openFolder",value:function(n){return b.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:this.indexSelected===n?this.router.navigate(["/file",n]):this.indexSelected=n;case 1:case"end":return l.stop()}}),l,this)})))}},{key:"openActions",value:function(n){return b.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var e,t;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return e=this.isRecycle?this.recicleOptions(n):this.normalOptions(this.indexSelected),l.next=3,this.actionCtrl.create(e);case 3:return t=l.sent,l.next=6,t.present();case 6:case"end":return l.stop()}}),l,this)})))}},{key:"restore",value:function(n){return b.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:if(l.t0="user"===this.user.recycle[n].owner,!l.t0){l.next=4;break}return l.next=4,this.store.dispatch(Object(d.b)({draw:this.user.recycle[n]}));case 4:if(l.t1="admin"===this.user.recycle[n].owner,!l.t1){l.next=8;break}return l.next=8,this.store.dispatch(Object(p.e)(this.user.recycle[n]));case 8:return l.next=10,this.store.dispatch(Object(d.c)({index:n}));case 10:case"end":return l.stop()}}),l,this)})))}},{key:"normalOptions",value:function(n){var l=this,e={header:"Acciones",translucent:!0,buttons:[{text:"Abrir",icon:"open",handler:function(){l.openFolder(l.indexSelected)}},{text:"Favorito",icon:"heart",handler:function(){l.store.dispatch(Object(d.f)({index:n})),l.showToast("Archivadas"===l.folder?"Enviado a favoritas!":"Enviado a archivadas!")}},{text:"Reciclar",icon:"trash",cssClass:"delete",role:"destructive",handler:function(){l.store.dispatch(Object(d.g)({index:n})),l.showToast("Enviado a la papelera de reciclaje!")}},{text:"cancelar",icon:"close",role:"cancel"}]};return"Archivadas"!=this.folder&&(e.buttons[1].icon="heart-dislike"),e}},{key:"recicleOptions",value:function(n){var l=this;return{header:"Acciones",translucent:!0,buttons:[{text:"restaurar",icon:"push",handler:function(){l.restore(n),l.showToast("Objeto resturado!")}},{text:"eliminar",icon:"close-circle",cssClass:"delete",handler:function(){l.showAlert(!1,n)}},{text:"vaciar papelera",icon:"trash-bin",cssClass:"delete",role:"destructive",handler:function(){l.showAlert(!0)}},{text:"cancelar",icon:"close",role:"cancel"}]}}},{key:"showAlert",value:function(n,l){return b.a(this,void 0,void 0,regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.alertCtrl.create({header:"Alerta!",message:"<strong>Al eliminar estos archivos no se podran recuperar</strong>",animated:!0,backdropDismiss:!1,translucent:!0,buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary"},{text:"Ok",cssClass:"primary",handler:function(){n?(t.store.dispatch(Object(d.d)()),t.showToast("Objetos eliminados!")):(t.store.dispatch(Object(d.c)({index:l})),t.showToast("Objeto eliminado!"))}}]});case 2:e.sent.present().then((function(){t.alertSound.src="assets/notify.mp3",t.alertSound.volume=1,t.alertSound.onloadeddata=function(){t.alertSound.play()}}));case 3:case"end":return e.stop()}}),e,this)})))}},{key:"showToast",value:function(n){return b.a(this,void 0,void 0,regeneratorRuntime.mark((function l(){var e;return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,this.toastCtrl.create({position:"top",buttons:[{icon:"close",side:"end",role:"cancel"}],message:n,animated:!0,translucent:!0,duration:4e3});case 2:return(e=l.sent).position=this.matdesign?"bottom":"top",l.next=6,e.present();case 6:case"end":return l.stop()}}),l,this)})))}},{key:"matdesign",get:function(){return!(!this.platform.is("android")&&!this.platform.is("desktop"))}},{key:"isRecycle",get:function(){return"Reciclaje"===this.folder}}]),n}(),h=e("DQLy"),m=e("iInd"),g=t.nb({encapsulation:0,styles:[[".truncate-text[_ngcontent-%COMP%]{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}ion-content[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:transparent}.selected[_ngcontent-%COMP%]{--background:rgba(var(--ion-color-medium-rgb), 0.14)}.card-hover[_ngcontent-%COMP%]:hover{cursor:pointer}ion-item[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{--background:--ion-color-light-rgb}ion-item[_ngcontent-%COMP%]{--padding-start:10px;--padding-end:10px;border-radius:4px}ion-item.selected[_ngcontent-%COMP%]{--background:rgba(var(--ion-color-primary-rgb), 0.14)}ion-item.selected[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:var(--ion-color-primary)}ion-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:#616e7e}ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-weight:500}"]],data:{}});function x(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,4,"ion-button",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.showAlert(!0)&&t),t}),u.N,u.d)),t.ob(1,49152,null,0,i.l,[t.h,t.k,t.x],{disabled:[0,"disabled"]},null),(n()(),t.Ib(-1,0,[" Vaciar "])),(n()(),t.pb(3,0,null,0,1,"ion-icon",[["color","danger"]],null,null,null,u.bb,u.r)),t.ob(4,49152,null,0,i.D,[t.h,t.k,t.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"]},null)],(function(n,l){n(l,1,0,t.tb(1,"",0===l.component.user.recycle.length,"")),n(l,4,0,"danger","trash-bin-outline","trash-bin-sharp")}),null)}function v(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,3,"ion-button",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.openActions()&&t),t}),u.N,u.d)),t.ob(1,49152,null,0,i.l,[t.h,t.k,t.x],{disabled:[0,"disabled"]},null),(n()(),t.pb(2,0,null,0,1,"ion-icon",[],null,null,null,u.bb,u.r)),t.ob(3,49152,null,0,i.D,[t.h,t.k,t.x],{ios:[0,"ios"],md:[1,"md"]},null)],(function(n,l){n(l,1,0,void 0===l.component.indexSelected),n(l,3,0,"ellipsis-vertical-circle-sharp","ellipsis-vertical-sharp")}),null)}function k(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,3,"ion-searchbar",[["animated",""]],null,[[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0;return"ionBlur"===l&&(o=!1!==t.Bb(n,3)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==t.Bb(n,3)._handleInputEvent(e.target)&&o),o}),u.mb,u.C)),t.Fb(5120,null,a.g,(function(n){return[n]}),[i.Lb]),t.ob(2,49152,null,0,i.ib,[t.h,t.k,t.x],{animated:[0,"animated"]},null),t.ob(3,16384,null,0,i.Lb,[t.k],null,null)],(function(n,l){n(l,2,0,"")}),null)}function y(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,1,"ion-icon",[["color","warning"],["size","large"]],null,null,null,u.bb,u.r)),t.ob(1,49152,null,0,i.D,[t.h,t.k,t.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(n,l){n(l,1,0,"warning","folder-open-outline","folder-open-sharp","large")}),null)}function C(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,1,"ion-icon",[["color","primary"],["size","large"]],null,null,null,u.bb,u.r)),t.ob(1,49152,null,0,i.D,[t.h,t.k,t.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(n,l){n(l,1,0,"primary","folder-outline","folder-sharp","large")}),null)}function w(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,16,"ion-item",[["button",""],["detail","true"]],[[2,"selected",null]],null,null,u.db,u.t)),t.ob(1,49152,null,0,i.I,[t.h,t.k,t.x],{button:[0,"button"],detail:[1,"detail"]},null),(n()(),t.pb(2,0,null,0,4,"ion-avatar",[["slot","start"]],null,null,null,u.L,u.b)),t.ob(3,49152,null,0,i.g,[t.h,t.k,t.x],null,null),(n()(),t.eb(16777216,null,0,1,null,y)),t.ob(5,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),t.eb(0,[["closeBlock",2]],0,0,null,C)),(n()(),t.pb(7,0,null,0,9,"ion-label",[],null,null,null,u.eb,u.u)),t.ob(8,49152,null,0,i.O,[t.h,t.k,t.x],null,null),(n()(),t.pb(9,0,null,0,1,"h2",[],null,null,null,null,null)),(n()(),t.Ib(10,null,["Loter\xeda: ",""])),(n()(),t.pb(11,0,null,0,3,"h3",[],null,null,null,null,null)),(n()(),t.Ib(12,null,["Creada: ",""])),t.Eb(13,2),t.Db(131072,s.d,[t.h,t.x]),(n()(),t.pb(15,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),t.Ib(16,null,["activa: ",""]))],(function(n,l){var e=l.component;n(l,1,0,"","true"),n(l,5,0,e.indexSelected===l.parent.parent.context.index,t.Bb(l,6))}),(function(n,l){n(l,0,0,l.component.indexSelected==l.parent.parent.context.index),n(l,10,0,l.parent.parent.context.$implicit.lottery+" "+l.parent.parent.context.$implicit.draw);var e=t.Jb(l,12,0,t.Bb(l,14).transform(t.Jb(l,12,0,n(l,13,0,t.Bb(l.parent.parent.parent,0),l.parent.parent.context.$implicit.emitDate,"es-do"))));n(l,12,0,e),n(l,16,0,l.parent.parent.context.$implicit.active?"Si":"No")}))}function I(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,2,"div",[],null,null,null,null,null)),(n()(),t.eb(16777216,null,null,1,null,w)),t.ob(2,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,2,0,!l.parent.context.$implicit.favorite)}),null)}function O(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,1,"ion-icon",[["color","warning"],["size","large"]],null,null,null,u.bb,u.r)),t.ob(1,49152,null,0,i.D,[t.h,t.k,t.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(n,l){n(l,1,0,"warning","folder-open-outline","folder-open-sharp","large")}),null)}function _(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,1,"ion-icon",[["color","tertiary"],["size","large"]],null,null,null,u.bb,u.r)),t.ob(1,49152,null,0,i.D,[t.h,t.k,t.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(n,l){n(l,1,0,"tertiary","folder-outline","folder-sharp","large")}),null)}function M(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,18,"ion-item",[["button",""]],[[2,"selected",null]],null,null,u.db,u.t)),t.ob(1,49152,null,0,i.I,[t.h,t.k,t.x],{button:[0,"button"]},null),(n()(),t.pb(2,0,null,0,4,"ion-avatar",[["slot","start"]],null,null,null,u.L,u.b)),t.ob(3,49152,null,0,i.g,[t.h,t.k,t.x],null,null),(n()(),t.eb(16777216,null,0,1,null,O)),t.ob(5,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),t.eb(0,[["closeBlock",2]],0,0,null,_)),(n()(),t.pb(7,0,null,0,9,"ion-label",[],null,null,null,u.eb,u.u)),t.ob(8,49152,null,0,i.O,[t.h,t.k,t.x],null,null),(n()(),t.pb(9,0,null,0,1,"h2",[],null,null,null,null,null)),(n()(),t.Ib(10,null,["Loter\xeda: ",""])),(n()(),t.pb(11,0,null,0,3,"h3",[],null,null,null,null,null)),(n()(),t.Ib(12,null,["Creada: ",""])),t.Eb(13,2),t.Db(131072,s.d,[t.h,t.x]),(n()(),t.pb(15,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),t.Ib(16,null,["activa: ",""])),(n()(),t.pb(17,0,null,0,1,"ion-icon",[["color","danger"],["slot","end"]],null,null,null,u.bb,u.r)),t.ob(18,49152,null,0,i.D,[t.h,t.k,t.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"]},null)],(function(n,l){var e=l.component;n(l,1,0,""),n(l,5,0,e.indexSelected===l.parent.parent.context.index,t.Bb(l,6)),n(l,18,0,"danger","heart-outline","heart-sharp")}),(function(n,l){n(l,0,0,l.component.indexSelected==l.parent.parent.context.index),n(l,10,0,l.parent.parent.context.$implicit.lottery+" "+l.parent.parent.context.$implicit.draw);var e=t.Jb(l,12,0,t.Bb(l,14).transform(t.Jb(l,12,0,n(l,13,0,t.Bb(l.parent.parent.parent,0),l.parent.parent.context.$implicit.emitDate,"es-do"))));n(l,12,0,e),n(l,16,0,l.parent.parent.context.$implicit.active?"Si":"No")}))}function z(n){return t.Kb(0,[(n()(),t.eb(16777216,null,null,1,null,M)),t.ob(1,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.eb(0,null,null,0))],(function(n,l){n(l,1,0,l.parent.context.$implicit.favorite&&"Favoritas"===l.component.folder)}),null)}function A(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,3,"div",[["style","padding: 0; margin: 0;"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.openFolder(n.context.index)&&t),t}),null,null)),(n()(),t.eb(16777216,null,null,1,null,I)),t.ob(2,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),t.eb(0,[["elseBlock",2]],null,0,null,z))],(function(n,l){n(l,2,0,"Archivadas"===l.component.folder,t.Bb(l,3))}),null)}function P(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,1,"ion-icon",[["color","danger"],["size","large"]],null,null,null,u.bb,u.r)),t.ob(1,49152,null,0,i.D,[t.h,t.k,t.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(n,l){n(l,1,0,"danger","folder-outline","folder-sharp","large")}),null)}function S(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,1,"ion-icon",[["color","danger"],["size","large"]],null,null,null,u.bb,u.r)),t.ob(1,49152,null,0,i.D,[t.h,t.k,t.x],{color:[0,"color"],ios:[1,"ios"],md:[2,"md"],size:[3,"size"]},null)],(function(n,l){n(l,1,0,"danger","document-outline","document-sharp","large")}),null)}function j(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,19,"ion-item",[["button",""],["detail","true"]],[[2,"selected",null]],null,null,u.db,u.t)),t.ob(1,49152,null,0,i.I,[t.h,t.k,t.x],{button:[0,"button"],detail:[1,"detail"]},null),(n()(),t.pb(2,0,null,0,5,"ion-avatar",[["slot","start"]],null,null,null,u.L,u.b)),t.ob(3,49152,null,0,i.g,[t.h,t.k,t.x],null,null),(n()(),t.eb(16777216,null,0,1,null,P)),t.ob(5,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.eb(16777216,null,0,1,null,S)),t.ob(7,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.pb(8,0,null,0,11,"ion-label",[],null,null,null,u.eb,u.u)),t.ob(9,49152,null,0,i.O,[t.h,t.k,t.x],null,null),(n()(),t.pb(10,0,null,0,1,"h2",[],null,null,null,null,null)),(n()(),t.Ib(11,null,["Loter\xeda: ",""])),(n()(),t.pb(12,0,null,0,3,"h3",[],null,null,null,null,null)),(n()(),t.Ib(13,null,["Creada: ",""])),t.Eb(14,2),t.Db(131072,s.d,[t.h,t.x]),(n()(),t.pb(16,0,null,0,1,"h4",[],null,null,null,null,null)),(n()(),t.Ib(17,null,["type: ",""])),(n()(),t.pb(18,0,null,0,1,"p",[],null,null,null,null,null)),(n()(),t.Ib(19,null,["id: ",""]))],(function(n,l){n(l,1,0,"","true"),n(l,5,0,"user"===l.parent.context.$implicit.owner),n(l,7,0,"admin"===l.parent.context.$implicit.owner)}),(function(n,l){n(l,0,0,l.component.indexSelected==l.parent.context.index),n(l,11,0,l.parent.context.$implicit?l.parent.context.$implicit.lottery+" "+l.parent.context.$implicit.draw:"");var e=t.Jb(l,13,0,t.Bb(l,15).transform(t.Jb(l,13,0,n(l,14,0,t.Bb(l.parent.parent,0),l.parent.context.$implicit.emitDate,"es-do"))));n(l,13,0,e),n(l,17,0,"user"===l.parent.context.$implicit.owner?"folder":"document"),n(l,19,0,l.parent.context.$implicit._id)}))}function J(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,2,"div",[["style","padding: 0; margin: 0;"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.openActions(n.context.index)&&t),t}),null,null)),(n()(),t.eb(16777216,null,null,1,null,j)),t.ob(2,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,2,0,"Reciclaje"===l.component.folder)}),null)}function D(n){return t.Kb(0,[t.Db(0,s.a,[]),(n()(),t.pb(1,0,null,null,18,"ion-header",[],null,null,null,u.ab,u.q)),t.ob(2,49152,null,0,i.C,[t.h,t.k,t.x],{translucent:[0,"translucent"]},null),(n()(),t.pb(3,0,null,0,14,"ion-toolbar",[["color","tertiary"]],null,null,null,u.tb,u.J)),t.ob(4,49152,null,0,i.Ab,[t.h,t.k,t.x],{color:[0,"color"]},null),(n()(),t.pb(5,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,u.O,u.e)),t.ob(6,49152,null,0,i.m,[t.h,t.k,t.x],null,null),(n()(),t.pb(7,0,null,0,1,"ion-menu-button",[],null,null,null,u.hb,u.y)),t.ob(8,49152,null,0,i.S,[t.h,t.k,t.x],null,null),(n()(),t.pb(9,0,null,0,2,"ion-title",[],null,null,null,u.rb,u.H)),t.ob(10,49152,null,0,i.yb,[t.h,t.k,t.x],null,null),(n()(),t.Ib(11,0,["",""])),(n()(),t.pb(12,0,null,0,5,"ion-buttons",[["slot","end"]],null,null,null,u.O,u.e)),t.ob(13,49152,null,0,i.m,[t.h,t.k,t.x],null,null),(n()(),t.eb(16777216,null,0,1,null,x)),t.ob(15,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.eb(16777216,null,0,1,null,v)),t.ob(17,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.eb(16777216,null,0,1,null,k)),t.ob(19,16384,null,0,c.l,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.pb(20,0,null,null,13,"ion-content",[],null,null,null,u.U,u.k)),t.ob(21,49152,null,0,i.v,[t.h,t.k,t.x],null,null),(n()(),t.pb(22,0,null,0,11,"ion-grid",[],null,null,null,u.Z,u.p)),t.ob(23,49152,null,0,i.B,[t.h,t.k,t.x],null,null),(n()(),t.pb(24,0,null,0,9,"ion-row",[],null,null,null,u.lb,u.B)),t.ob(25,49152,null,0,i.hb,[t.h,t.k,t.x],null,null),(n()(),t.pb(26,0,null,0,7,"ion-col",[["size","12"]],null,null,null,u.T,u.j)),t.ob(27,49152,null,0,i.u,[t.h,t.k,t.x],{size:[0,"size"]},null),(n()(),t.pb(28,0,null,0,5,"ion-list",[],null,null,null,u.gb,u.v)),t.ob(29,49152,null,0,i.P,[t.h,t.k,t.x],null,null),(n()(),t.eb(16777216,null,0,1,null,A)),t.ob(31,278528,null,0,c.k,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(n()(),t.eb(16777216,null,0,1,null,J)),t.ob(33,278528,null,0,c.k,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){var e=l.component;n(l,2,0,!0),n(l,4,0,"tertiary"),n(l,15,0,"Reciclaje"===e.folder),n(l,17,0,!e.isRecycle),n(l,19,0,"Reciclaje"!=e.folder),n(l,27,0,"12"),n(l,31,0,e.user.archived),n(l,33,0,e.user.recycle)}),(function(n,l){n(l,11,0,l.component.folder)}))}var R=t.lb("app-folder",f,(function(n){return t.Kb(0,[(n()(),t.pb(0,0,null,null,1,"app-folder",[],null,null,null,D,g)),t.ob(1,114688,null,0,f,[i.Mb,i.b,i.a,i.Hb,h.m,m.a,m.m],null,null)],(function(n,l){n(l,1,0)}),null)}),{},{},[]),B=function n(){_classCallCheck(this,n)};e.d(l,"FolderPageModuleNgFactory",(function(){return E}));var E=t.mb(o,[],(function(n){return t.yb([t.zb(512,t.j,t.X,[[8,[r.a,R]],[3,t.j],t.v]),t.zb(4608,c.n,c.m,[t.s,[2,c.v]]),t.zb(4608,a.o,a.o,[]),t.zb(4608,i.c,i.c,[t.x,t.g]),t.zb(4608,i.Eb,i.Eb,[i.c,t.j,t.p]),t.zb(4608,i.Ib,i.Ib,[i.c,t.j,t.p]),t.zb(1073742336,c.c,c.c,[]),t.zb(1073742336,a.n,a.n,[]),t.zb(1073742336,a.e,a.e,[]),t.zb(1073742336,s.b,s.b,[]),t.zb(1073742336,i.Cb,i.Cb,[]),t.zb(1073742336,m.q,m.q,[[2,m.v],[2,m.m]]),t.zb(1073742336,B,B,[]),t.zb(1073742336,o,o,[]),t.zb(1024,m.k,(function(){return[[{path:"",component:f}]]}),[]),t.zb(256,s.c,{},[])])}))}}]);