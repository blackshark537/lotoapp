import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common'
import localeEs from '@angular/common/locales/es-DO'
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StoreModel } from './models/store.model';
import { UserModel } from './models/user.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NativeHelpersService } from './services/native-helpers.service';
import { environment } from '../environments/environment'

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
      url: 'lottery/inicio',
      style: 'tertiary',
      icon: 'home'
    },
    {
      title: 'Usuarios',
      url: '/users',
      style: 'medium',
      icon: 'person'
    },
    {
      title: 'Histórico de Sorteos',
      url: 'lottery/publish',
      style: 'success',
      icon: 'reader'
    },
    {
      title: 'Histórico de jugadas',
      url: 'lottery/folder', ///Archivadas
      style: 'warning',
      icon: 'stats-chart'
    },
    /* {
      title: 'Favoritas',
      url: '/folder/null/Favoritas',
      style: 'tertiary',
      icon: 'heart'
    }, */
    {
      title: 'Configuración',
      url: '/config',
      style: 'primary',
      icon: 'settings'
    },
/*     {
      title: 'Reciclaje',
      url: '/folder/Reciclaje',
      style: 'danger',
      icon: 'trash'
    } */
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

    if(!environment.production){
      this.appPages.push({
        title: 'Configuración de Sorteos',
        url: '/sorteos',
        style: 'success',
        icon: 'apps'
      })
    }

    addEventListener('offline', (evt)=>{
      evt.preventDefault();
      this.native.showToast('No esta conectado!');
    });

    addEventListener('online', (evt)=>{
      evt.preventDefault();
      this.native.showToast('Se ha restablecido la conexion!', [
        {
          icon: 'wifi',
          side: 'end'
        }
      ]);
    });

    this.store.select('user_state').subscribe(state=>{
      this.user = {...state};
      //console.log(this.user)
    });

    //this.store.dispatch(userAction.GET());
  }

  get is_loggin_route(){
    return window.location.href.includes('login') || window.location.href.includes('/sorteos/new');
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
