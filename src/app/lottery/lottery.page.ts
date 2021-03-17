import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.page.html',
  styleUrls: ['./lottery.page.scss'],
})
export class LotteryPage implements OnInit {

  _url: string;
  _title: string = 'Loterias';
  
  lotteryModel = [
    {
      lottery: 'Leidsa',
      img: 'assets/leidsa.png'
    },
    {
      lottery: 'Nacional',
      img: 'assets/loteria-nacional.png'
    },
    {
      lottery: 'Real',
      img: 'assets/loteria-real.png'
    },
    {
      lottery: 'Loteka',
      img: 'assets/loteka.png'
    }
  ];

  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._url = this._activeRoute.snapshot.paramMap.get('route');
  }

  openUrl(draw){
    if(this._url=='folder'){
      this._router.navigate([`${this._url}/${draw.lottery}/Archivadas`])
    } else {
      this._router.navigate([`${this._url}/${draw.lottery}`])
    }
  }
}
