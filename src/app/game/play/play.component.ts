import { Component, OnInit, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Ball } from './classes/ball';
import { Tombola } from './classes/tombola';
import { DrawBall } from './classes/ball_draw';
import * as P5 from 'p5';
import { Router } from '@angular/router';
import { AdminDraw, Draw, TipoSorteo } from 'src/app/models/draw.model';
import * as userAction from '../../actions/user.actions';
import { Store } from '@ngrx/store';
import { StoreModel } from 'src/app/models/store.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit, OnDestroy {

  @Input('game') game: string;
  @Input('credits') credits: number = 0;
  //@Input('draw') draw: number[];
  @Input('price') price: number = 0;
  @Input('UserDraw') UserDraw: Draw;
  @Input('AdminDraw') AdminDraw: AdminDraw;
  @Output('data') data: any[];


  soundApi;
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
    private router: Router,
    private store: Store<StoreModel>
   ) { }

  ngOnInit() {
    if(this.canvas) this.canvas.remove();
    this.data     = [];
    this.UserDraw = {...this.UserDraw};
    this.UserDraw.Data = [];
    this.can_save = false;
    this.goforit  = false;
    this.finished = false;
    this.webgl    = false;
    this.balls    = [];
    this.index    = 0;
    this.draw_type = this.game === TipoSorteo.GOLD? 0:1;
    this.soundApi = new Audio();
    this.sketch();
  }

  pickOne(p: P5){
    setTimeout(async _=>{
      if(this.index < this.AdminDraw.ballsqty){
        if(this.game != TipoSorteo.RANDOM){
          this.data.push( await this.pick_one(this.AdminDraw.Games[0].Data[this.index], p) );
        } else {
          this.data.push( await this.pick_random(p) );
        }
        this.drawBall.pick_one(this.data[this.index]);
        this.index++;
        this.pickOne(p);
      }
    }, 1000);
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
        
        for(let i=0; i < this.UserDraw.ballsqty; i++){
          draw_balls.push(new Ball(p, 0, this.webgl));
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
        if(p.mouseX > 100 && p.mouseX < 400-100 && p.mouseY > 100 && p.mouseY < 400-100){
          if(!loop) loop = true;
          this.pickOne(p);
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
            this.soundApi.src = 'assets/game_won.wav'
            this.soundApi.onloadeddata = () =>{
              this.soundApi.play();
              this.finished = true;
              this.save();
            }
          }
        }

        if(loop && !this.drawBall.end_drawing){
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

  openLastDraw(){
    //this.save();
    this.dismiss();
    this.router.navigate(['/game']);
  }

  async pick_one(list: any[], p: P5) {
    let i = Math.floor(p.noise(p.mouseX, p.mouseY, Date.now()) * list.length);
    return list[i];
  }

  async pick_random(p:P5) {
    let index = this.data.length//this.numbers_draws.length;
    if(index === 6){
      return Math.floor(p.noise(p.mouseX, p.mouseY, Date.now()) * 9) +1
    } else if(index === 7){
      return Math.floor(p.noise(p.mouseX, p.mouseY, Date.now()) * 14) +1
    } else {
      return Math.floor(p.noise(p.mouseX, p.mouseY, Date.now()) * this.AdminDraw.max_values) +1
    }
  }

  get saveBtn(): boolean{
    return this.can_save;
  }

  keyPressed(){
    if(!this.finished)this.soundApi.play();
  }

  async save(){
    this.credits -= this.price * this.AdminDraw.ballsqty;
    this.data.push(this.game);
    this.data.push(this.price * this.AdminDraw.ballsqty);
    this.UserDraw.Data.push(this.data);
    await this.store.dispatch(userAction.ARCHIVE_DRAW({draw: this.UserDraw}));
    await this.store.dispatch(userAction.CHARGE_USER({ballsQty: this.AdminDraw.ballsqty, price: this.price}))
  }

  async dismiss() {
    if(this.canvas) this.canvas.remove();
    await this.modalCtrl.dismiss({ 'dismissed': true });
  }

  ngOnDestroy(){
    
  }

}
