import { Component, OnInit, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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

  soundApi = new Audio();
  balls: Ball[]=[];
  tombola: Tombola;
  drawBall: DrawBall;
  can_save: boolean=false;
  goforit: boolean = false;
  finished: boolean = false;
  webgl: boolean = false;
  canvas;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
   ) { }

  ngOnInit() {
    if(this.canvas) this.canvas.remove();
    this.data = [];
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
        
        this.draw.map(val=> draw_balls.push(new Ball(p, val, this.webgl)));
        this.drawBall = new DrawBall( p, draw_balls);
        this.tombola = new Tombola(p, img, this.webgl);
        p.frameRate(60);
        p.textFont(myFont, 18);
        p.noFill();
      }
      
      p.mouseClicked = ()=>{
        if(loop){
          this.drawBall.pick_one();
          this.keyPressed();
        }
        if(p.mouseX > 100 && p.mouseX < 400-100 && p.mouseY > 100 && p.mouseY < 400-100){
          if(!loop) loop = true;
          setTimeout(()=> this.drawBall.pick_one(), 500);
        }
      }

      p.keyPressed = ()=>{
        if(p.keyCode === 32 && loop){
          this.drawBall.pick_one();
          this.keyPressed();
        }
        if(!loop) loop = true;
      }
  
      p.draw = ()=>{
        p.background(250);
        if(this.webgl){
          p.directionalLight(255,255,30,1,1,-1);
          p.ambientLight(255);
          //background wallpaper
          p.texture(bgImg);
          p.noStroke();
          p.plane(p.width,p.height);
        }else{
          p.image(bgImg, 0, 0, p.width*2, p.height*2);
        }

        if(this.drawBall.end_drawing){          
          p.remove();
          if(!this.finished){
            this.soundApi.volume = 0.5;
            this.soundApi.src = 'assets/game_won.wav'
            this.soundApi.onloadeddata = () =>{
              this.soundApi.play();
              this.can_save = true;
              this.finished = true;
            }
          }
        }

        if(loop && !this.drawBall.end_drawing){
          this.balls.map((ball: Ball) =>{
            ball.force = gvty;
            ball.force = wind;
            ball.draw();
          });
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

  get saveBtn(): boolean{
    return this.can_save;
  }

  keyPressed(){
    if(!this.finished)this.soundApi.play();
  }

  save(){
    this.data = this.draw
    this.data.push(this.game);
    this.dismiss()
  }

  get ask_for_slmas(){
    return this.show_alert('quieres continuar con super mas');
  }

  async show_alert(msg){
    let goforit = false;
    const alerta = await this.alertCtrl.create({
      animated: true,
      translucent: true,
      backdropDismiss: false,
      header: "Alerta!",
      message: msg,
      buttons: [{
        text: "Cancelar",
        role: 'cancel'
      },{
        text: "Ok",
        handler: () => goforit = true
      }]
    });

    await alerta.present();
    await alerta.onWillDismiss();
    return goforit;
  }

  async dismiss() {
    this.canvas.remove();
    await this.modalCtrl.dismiss({
      'dismissed': true,
      'data': this.data
    });
  }

  ngOnDestroy(){
    
  }

}
