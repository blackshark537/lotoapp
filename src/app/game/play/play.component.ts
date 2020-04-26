import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ball } from './classes/ball';
import * as P5 from 'p5';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {

  img: P5.Image;
  balls: Ball[]=[];

  constructor(
    private modalCtrl: ModalController
   ) { }

  ngOnInit() {
    const p5 = new P5((p: P5)=>{
      p.preload = ()=>{
        this.img = p.loadImage('assets/hover.png');
      }

      p.setup = ()=>{
        p.createCanvas(400,400);
        p.ellipseMode(p.CENTER);
        p.rectMode(p.CENTER);
        p.textAlign(p.CENTER);
        p.imageMode(p.CENTER);
        p.image(this.img, p.width/2, p.height/2, 250, 250);
        for(let i=0; i<20; i++){
          this.balls.push(new Ball(i, p));
        }
        p.noFill();
        p.noLoop();
      }
    }, document.getElementById('canvas'))
    
    this.sketch(p5);
  }

  sketch(p: P5){
    
    const gvty = p.createVector(0,1);
    const wind = p.createVector(0.02,0);
    
    p.mouseClicked = ()=>{
      if(p.mouseX > 100 && p.mouseX < 400-100 && p.mouseY > 100 && p.mouseY < 400-100){
        p.loop();
      }
    }

    p.draw = ()=>{
      p.background(250);
      this.balls.map((ball: Ball) =>{
        ball.add_force(gvty);
        ball.add_force(wind);
        ball.draw(p);
      });
      p.image(this.img, p.width/2, p.height/2, 250, 250);
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss({
      'dismissed': true
    });
  }  

}
