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

  balls: Ball[]=[];
  tombola: Tombola;
  drawBall: DrawBall;
  can_save: boolean=false;
  goforit: boolean = false;
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
      let playButton;
      let draw_balls = [];
      let myFont;
      let x, y;

      p.preload = ()=>{
        img = p.loadImage('assets/hover.png');
        playButton = p.loadImage('assets/play.png');
        myFont = p.loadFont('assets/Inconsolata-Condensed.otf');
      }

      p.setup = ()=>{
        p.createCanvas(400,400);
        p.ellipseMode(p.CENTER);
        p.rectMode(p.CENTER);
        p.textAlign(p.CENTER);
        p.imageMode(p.CENTER);
        x = p.width;
        y = p.height;
        for(let i=0; i<20; i++){
          this.balls.push(new Ball(p, i));
        };
        
        this.draw.map(val=> draw_balls.push(new Ball(p, val)));
        this.drawBall = new DrawBall( p, draw_balls);
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
        
        p.background(250);
        //p.directionalLight(255,255,30,1,1,-1);
        //p.ambientLight(255);

/*         if(loop && this.drawBall.draw_super && !this.goforit){
          p.noLoop();
          this.ask_for_slmas();
          if(this.goforit){
            this.goforit = true;
            p.loop();
          } else {
            this.draw[this.draw.length-1] = null;
            this.draw[this.draw.length-2] = null;
            this.can_save = true;
          }
        } */
        
        if(loop && !this.drawBall.end_drawing){
          this.balls.map((ball: Ball) =>{
            ball.force = gvty;
            ball.force = wind;
            ball.draw();
          });
        }
        
        if(this.drawBall.end_drawing){          
          this.can_save = true;
          //p.remove(); */
        }

        this.drawBall.draw();
        this.tombola.draw();
        if (!loop){
          p.push();
          p.translate(x/2,y/2);
          p.noStroke();
          /* p.texture(playButton)
          p.plane(70,50) */
          p.image(playButton,0,0, 70, 50)
          p.pop();
        } 

      }

    }, document.getElementById('canvas'));
  }

  get saveBtn(): boolean{
    return this.can_save;
  }

  save(){
    this.data = this.draw
    this.data.push(this.game);
    this.dismiss()
  }

  get ask_for_slmas(){
    return confirm('quieres continuar con super mas');
  }

  async show_alert(msg){
    const alerta = await this.alertCtrl.create({
      animated: true,
      translucent: true,
      backdropDismiss: false,
      header: "Alerta!",
      message: msg,
      buttons: [{
        text: "Cancelar",
        role: 'cancel',
        handler: () => this.goforit = false
      },{
        text: "Ok",
        handler: () => this.goforit = true
      }]
    });

    await alerta.present();
  }

  async dismiss() {
    if(this.canvas) this.canvas.remove();
    await this.modalCtrl.dismiss({
      'dismissed': true,
      'data': this.data
    });
  }

  ngOnDestroy(){
    
  }

}
