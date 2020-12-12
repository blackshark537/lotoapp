import { Component, OnInit, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Ball } from './classes/ball';
import { Tombola } from './classes/tombola';
import { DrawBall } from './classes/ball_draw';
import * as P5 from 'p5';
import { AdminDraw } from 'src/app/models/draw.model';
import { GamePage } from '../../game/game.page';
import { UserhttpService } from 'src/app/services/userhttp.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {

  @Input('game') game: number;
  @Input('credits') credits: number = 0;
  @Input('drawType') drawType: string;
  @Input('AdminDraw') AdminDraw: AdminDraw;

  soundApi;
  data: {Data: any[], ballsqty: number};
  index: number;
  draw_type: number;
  balls: Ball[];
  tombola: Tombola;
  drawBall: DrawBall;
  can_save: boolean;
  goforit: boolean;
  finished: boolean;
  webgl: boolean;
  canvas;

  constructor(
    private modalCtrl: ModalController,
    private http: UserhttpService
   ) { }

  ngOnInit() {
    if(this.canvas) this.canvas.remove();
    
    this.can_save = false;
    this.goforit  = false;
    this.finished = false;
    this.webgl    = false;
    this.balls    = [];
    this.index    = 0;
    
    this.http.createDraw(this.AdminDraw._id, this.game).subscribe(resp =>{
      this.data = resp.body;
    }, error =>{
      this.dismiss(false);
    });
    this.soundApi = new Audio();
    this.sketch();
  }

  sketch(){
    
    this.canvas = new P5((p: P5)=>{

      const gvty = p.createVector(0,0.9);
      const wind = p.createVector(0.01,0);
      let loop = false;
      let img;
      let bgImg;
      let playButton;
      let draw_balls = [];
      let myFont;
      let x, y;
      let withdraw = false;
      let new_sec = null;
      let old_sec = null;

      p.preload = ()=>{
        img = p.loadImage('assets/hover.png');
        playButton = p.loadImage('assets/play.png');
        myFont = p.loadFont('assets/Inconsolata-Condensed.otf');
        bgImg = p.loadImage('assets/game-bg.png');
        this.soundApi.src = 'assets/key_pressed.wav';
      }

      p.setup = ()=>{
        this.webgl? p.createCanvas(400,400, p.WEBGL) : p.createCanvas(400,400);
        p.ellipseMode(p.CENTER);
        p.rectMode(p.CENTER);
        p.textAlign(p.CENTER);
        p.imageMode(p.CENTER);
        this.soundApi.volume = 1;
        x = p.width;
        y = p.height;
        for(let i=0; i<15; i++){
          this.balls.push(new Ball(p, i+15, this.webgl));
        };
        
        for(let i=0; i < this.data.ballsqty; i++){
          draw_balls.push(new Ball(p, this.data.Data[i], this.webgl));
        }
        this.drawBall = new DrawBall( p, draw_balls);
        this.tombola = new Tombola(p, img, this.webgl);
        p.frameRate(60);
        p.textFont(myFont, 18);
        p.noFill();
      }
      
      p.mouseClicked = ()=>{
        if(loop){
          this.keyPressed();
        }

        //play button
        if(p.mouseX > 100 && p.mouseX < 400-100 && p.mouseY > 100 && p.mouseY < 400-100){
          old_sec = new Date().getSeconds();
          if(!loop) loop = true;
        }
      }

      p.keyPressed = ()=>{
        if(p.keyCode === 32 && loop){
          this.keyPressed();
        }
        if(!loop) loop = true;
      }
  
      p.draw = ()=>{
        p.background(250);
        new_sec = new Date().getSeconds();
        if(new_sec === old_sec+2){
          withdraw = true;
          old_sec = new_sec;
        }

        if(loop && withdraw) {
          this.drawBall.pick_one(this.data.Data[this.index]);
          this.index++;
          withdraw = false;
        }
        
        if(this.webgl){
          p.directionalLight(255,255,30,1,1,-1);
          p.ambientLight(255);
          p.texture(bgImg);
          p.noStroke();
          p.plane(p.width,p.height);
        }else{
          p.image(bgImg, 0, 0, p.width*2, p.height*2);
        }

        if(this.drawBall.end_drawing){
          p.noLoop();
          if(!this.finished){
            this.soundApi.volume = 0.5;
            this.soundApi.src = 'assets/game_won.wav';
            this.finished = true;
            //this.save();
            this.soundApi.onloadeddata = () =>{
              this.soundApi.play();
            }
          }
        }

        if(loop && !this.drawBall.end_drawing){
          //if(withdraw) this.pickOne(p);
          for (let i = this.balls.length-1; i > 0; i--) {
            let ball = this.balls[i];
            ball.force = gvty;
            ball.force = wind;
            ball.draw();
          }
        }

        this.drawBall.draw();
        this.tombola.draw();
        if (!loop){
          p.push();
          p.noStroke();
          if(this.webgl){
            p.texture(playButton);
            p.plane(70,50);
          }else{
            p.translate(x/2,y/2);
            p.image(playButton,0,0, 70, 50)
          }
          p.pop();
        } 

      }

    }, document.getElementById('canvas'));
  }

  async openLastDraw(){
    const modal = await this.modalCtrl.create({
      animated: true,
      swipeToClose: true,
      backdropDismiss: false,
      component: GamePage,
      id: 'game-modal',
      cssClass: 'fullscreen'
    });

    await modal.present();
  }

  async pick_one(list: any[], p: P5) {
    let i = Math.floor(p.noise(p.random(255), p.random(255), Date.now()) * list.length);
    return list[i];
  }

  get saveBtn(): boolean{
    return this.can_save;
  }

  keyPressed(){
    if(!this.finished)this.soundApi.play();
  }

  async dismiss(see_result?: boolean) {
    if(this.canvas) this.canvas.remove();
    await this.modalCtrl.dismiss({ 'dismissed': see_result});
  }

  ngOnDestroy(){
    
  }

}
