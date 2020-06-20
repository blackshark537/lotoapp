import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  //check if the platform is Android
  get matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }
}
