import * as p5 from 'p5';

export class Ball{
  ball: p5.Vector;
  vel: p5.Vector;
  r: number;
  edge: number;
  num:number;

  constructor(num: number , p: p5){
    this.edge = 140;
    this.ball = p.createVector(p.random(0+this.edge, p.width-this.edge), p.random(0+this.edge, p.height-this.edge))
    this.r = 20;
    this.vel = p.createVector(0,5)
    this.num = num;
  }
  
  add_force(force){
    this.vel.add(force)
    this.ball.add(this.vel)

  }
  
  draw(p: p5){
    
    p.fill(250,200,10); //ball color
    p.ellipse(this.ball.x, this.ball.y, this.r);
    p.fill(0);
    p.text(this.num+1, this.ball.x, this.ball.y+5)
    p.noFill();
    
    if(this.ball.y >= p.height-this.edge){
       this.ball.y = p.height-(this.edge+5)
       this.vel.y *= -1
    } else if(this.ball.y <= 0+this.edge){
        this.ball.y = p.height+(this.edge-5)
        this.vel.y *= +1
    } else if(this.ball.x >= p.width-this.edge){
      this.ball.x = p.width-(this.edge+5)
      this.vel.x *= -1
    }else if(this.ball.x <= 0+this.edge){
        this.ball.x = p.width+(this.edge-5)
        this.vel.x *= +1
    }
  }
  
}