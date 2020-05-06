import { Component, OnInit, OnDestroy, Input, Output, ViewChild } from '@angular/core';
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

  graphic = 'WebGL'
  balls: Ball[]=[];
  tombola: Tombola;
  drawBall: DrawBall;
  can_save: boolean=false;
  canvas;

  constructor(
    private modalCtrl: ModalController
   ) { }

  ngOnInit() {
    if(this.canvas) this.canvas.remove();
    this.data = [];
    this.sketch();
  }

  sketch(){
    
    this.canvas = new P5((p: P5)=>{

      const gvty = p.createVector(0,1);
      const wind = p.createVector(0.02,0);
      let loop = false;
      let img;
      let playButton;
      let draw_balls = [];
      let myFont;
      
      p.preload = ()=>{
        img = p.loadImage('assets/hover.png');
        playButton = p.loadImage('assets/play.png');
        myFont = p.loadFont('assets/Inconsolata-Condensed.otf');
      }

      p.setup = ()=>{
        if(this.graphic === '2D') p.createCanvas(400,400, p.P2D);
        if(this.graphic === 'WebGL') p.createCanvas(400,400, p.WEBGL);
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
        p.frameRate(60);
        p.textFont(myFont, 18);
        p.noFill();
      }
      
      p.mouseClicked = ()=>{
        if(loop)this.drawBall.pick_one();
        if(p.mouseX > 100 && p.mouseX < 400-100 && p.mouseY > 100 && p.mouseY < 400-100){
          if(!loop) loop = true;
        }
      }

      p.keyPressed = ()=>{
        if(p.keyCode === 32 && loop)this.drawBall.pick_one();
        if(!loop) loop = true;
      }
  
      p.draw = ()=>{
        if(this.graphic === 'WebGL') p.translate(-200, -200);
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
          p.remove();
        }

        this.drawBall.draw();
        this.tombola.draw();
        if (!loop){
          p.image(playButton, p.width/2, p.height/2, 70, 50);
          //p.text('Press play button or key Enter to start', p.width/2, 20);
        } else {
          p.text('Press key Enter to draw a ball', p.width/2, 20);
        }
        
      }

    }, document.getElementById('canvas'));
  }

  saveBtn(): boolean{
    return this.can_save;
  }

  save(){
    this.data = this.draw
    this.data.push(this.game);
    this.dismiss()
  }

  async dismiss() {
    await this.modalCtrl.dismiss({
      'dismissed': true,
      'data': this.data
    });
  }

  ngOnDestroy(){
    
  }

}
