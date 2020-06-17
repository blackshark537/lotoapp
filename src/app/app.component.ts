import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common'
import localeEs from '@angular/common/locales/es'
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StoreModel } from './models/store.model';
import { UserModel } from './models/user.model';
import { EXIT } from './actions/admin_draw.action';
import { Store } from '@ngrx/store';
import { SAVE_STATE } from './actions/user.actions';

registerLocaleData(localeEs, 'es-do')

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  user: UserModel;
  selectedIndex:number;

  public appPages = [
    {
      title: 'Inicio',
      url: '/inicio',
      style: 'primary',
      icon: 'home'
    },
    {
      title: 'Sorteos',
      url: '/sorteos',
      style: 'success',
      icon: 'apps'
    },
    {
      title: 'Archivadas',
      url: '/folder/Archivadas',
      style: 'warning',
      icon: 'archive'
    },
    {
      title: 'Favoritas',
      url: '/folder/Favoritas',
      style: 'tertiary',
      icon: 'heart'
    },
    {
      title: 'Reciclaje',
      url: '/folder/Reciclaje',
      style: 'danger',
      icon: 'trash'
    },
/*     {
      title: 'Perfil',
      url: '/folder/Profile',
      icon: 'person-circle'
    } */
  ];

  constructor(
    private store: Store<StoreModel>,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

    addEventListener('beforeunload', (evt)=>{
      evt.preventDefault();
      this.store.dispatch(EXIT());
      this.store.dispatch(SAVE_STATE());
    });

    this.store.select('user_state').subscribe(state=>{
      this.user = {...state};
    });
  }

  get is_game_route(){
    return window.location.href.includes('/game/');
  }
}
