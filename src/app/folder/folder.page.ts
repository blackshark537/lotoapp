import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  
  constructor(
    private platform: Platform,
    private activatedRoute: ActivatedRoute) { }

  matdesign(): boolean{
    return this.platform.is('android') || this.platform.is('desktop')? true : false;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

  }

}
