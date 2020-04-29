import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StoreModel } from './models/store.model';
import { UserModel } from './models/user.model';
import { EXIT } from './actions/admin_draw.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SAVE_STATE } from './actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  user: UserModel;

  public appPages = [
    {
      title: 'Inicio',
      url: '/inicio',
      icon: 'home'
    },
    {
      title: 'Sorteos',
      url: '/sorteos',
      icon: 'apps'
    },
    {
      title: 'Archivadas',
      url: '/folder/Archivadas',
      icon: 'archive'
    },
    {
      title: 'Favoritas',
      url: '/folder/Favoritas',
      icon: 'heart'
    },
    {
      title: 'Reciclaje',
      url: '/folder/Reciclaje',
      icon: 'trash'
    },
    {
      title: 'Perfil',
      url: '/folder/Profile',
      icon: 'person-circle'
    }
  ];

  constructor(
    private store: Store<StoreModel>,
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
}
