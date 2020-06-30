import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common'
import localeEs from '@angular/common/locales/es-DO'
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StoreModel } from './models/store.model';
import { UserModel } from './models/user.model';
import { Store } from '@ngrx/store';
import * as userAction from './actions/user.actions';
import { Router } from '@angular/router';
import { NativeHelpersService } from './services/native-helpers.service';

registerLocaleData(localeEs, 'es-Do')

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
      style: 'tertiary',
      icon: 'home'
    },
    {
      title: 'Sorteos',
      url: '/sorteos',
      style: 'success',
      icon: 'apps'
    },
    {
      title: 'Usuarios',
      url: '/users',
      style: 'medium',
      icon: 'person'
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
      title: 'Configuración',
      url: '/config',
      style: 'primary',
      icon: 'settings'
    },
    {
      title: 'Reciclaje',
      url: '/folder/Reciclaje',
      style: 'danger',
      icon: 'trash'
    }
  ];

  constructor(
    private router: Router,
    private store: Store<StoreModel>,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private native: NativeHelpersService
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

    if(localStorage.getItem('token')){
      this.router.navigate(['inicio']);
    }

/*     addEventListener('beforeunload', (evt)=>{
      evt.preventDefault();
      this.store.dispatch(SAVE_STATE());
    }); */

    this.store.select('user_state').subscribe(state=>{
      this.user = {...state};
      //console.log(this.user)
    });

    //this.store.dispatch(userAction.GET());
  }

  get is_loggin_route(){
    return window.location.href.includes('login');
  }

  get is_game_route(){
    return window.location.href.includes('/game/');
  }

  async removeToken(){
    const result = await this.native.comfirmModal('Seguro que quieres salir!');
    if(result){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user_data');
      this.router.navigate(['login']);
    }
  }
}
