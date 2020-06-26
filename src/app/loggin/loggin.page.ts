import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.page.html',
  styleUrls: ['./loggin.page.scss'],
})
export class LogginPage implements OnInit {

  step: number = 0;
  step2: number = 0;
  register: boolean = false;

  constructor() { }

  ngOnInit() {
  }


}
