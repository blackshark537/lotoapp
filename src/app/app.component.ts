import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Store} from '@ngrx/store';
import { EXIT } from './actions/admin_draw.action';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
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
    }
  ];

  constructor(
    private store: Store,
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
    });
  }
}
