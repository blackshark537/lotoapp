import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ball } from './classes/ball';
import { Tombola } from './classes/tombola';
import { DrawBall } from './classes/ball_draw';

import * as P5 from 'p5';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {

  @Input('game') game: string;
  @Input('draw') draw: number[];
  @Output('data') data: any[];

  balls: Ball[]=[];
  tombola: Tombola;
  drawBall: DrawBall;
  can_save: boolean=false;

  constructor(
    private modalCtrl: ModalController
   ) { }

  ngOnInit() {
    this.data = [];
    this.sketch();
  }

  sketch(){
    
    new P5((p: P5)=>{
      
      const gvty = p.createVector(0,1);
      const wind = p.createVector(0.02,0);
      let loop = false;
      let img;
      let playButton;
      let draw_balls = [];

      p.preload = ()=>{
        img = p.loadImage('assets/hover.png');
        playButton = p.loadImage('assets/play.png');
      }

      p.setup = ()=>{
        p.createCanvas(400,400);
        p.ellipseMode(p.CENTER);
        p.rectMode(p.CENTER);
        p.textAlign(p.CENTER);
        p.imageMode(p.CENTER);

        for(let i=0; i<20; i++){
          this.balls.push(new Ball(p, i));
        }
        this.draw.map(val=> draw_balls.push(new Ball(p, val)));
        this.drawBall = new DrawBall(this.balls[0], p, draw_balls);
        this.tombola = new Tombola(p, img);
        p.noFill();
      }
      
      p.mouseClicked = ()=>{
        if(p.mouseX > 100 && p.mouseX < 400-100 && p.mouseY > 100 && p.mouseY < 400-100){
          if(!loop) loop = true;
          this.drawBall.pick_one();
        }
      }
  
      p.draw = ()=>{
        p.background(250);
        if(loop && !this.drawBall.end_drawing()){
          this.balls.map((ball: Ball) =>{
            ball.add_force(gvty);
            ball.add_force(wind);
            ball.draw();
          });
        }
        
        if(this.drawBall.end_drawing()){
          console.log('Game Over');
          this.can_save = true;
          p.noLoop();
        }
        this.drawBall.draw();
        this.tombola.draw();
        if (!loop) p.image(playButton, p.width/2, p.height/2, 70, 50);
      }

    }, document.getElementById('canvas'));
  }

  saveBtn(): boolean{
    return this.can_save;
  }

  save(){
    this.data = this.draw
    this.data.push(this.game.length > 6? this.game.slice(0,4) + '...' : this.game);
    this.dismiss()
  }

  async dismiss() {
    await this.modalCtrl.dismiss({
      'dismissed': true,
      'data': this.data
    });
  }

  ngOnDestroy(){
    delete this.sketch;
  }

}
