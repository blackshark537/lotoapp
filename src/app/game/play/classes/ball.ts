import * as p5 from 'p5';

export class Ball{
  private ball: p5.Vector;
  private vel: p5.Vector;
  private r: number;
  private edge: number;
  private pg
  private angle = 0;

  constructor(
    private p: p5,
    private num?: number
  ){
    this.edge = 70;
    //this.ball = p.createVector(p.random(0+this.edge, p.width-this.edge), p.random(0+this.edge, p.height-this.edge))
    this.ball = p.createVector(p.random(-70,70), p.random(-70,70), 0);
    this.r = 15;
    this.vel = p.createVector(0,5);
    this.pg = p.createGraphics(50,50);
  }

  get textura() {
    this.pg.background(255,200,0);
    this.pg.fill(0);
    this.pg.stroke(0);
    this.pg.text(this.num, 10, 25);
    this.pg.text(this.num, 33, 25);
    this.pg.text('_', 13, 28);
    this.pg.text('_', 33, 28);
    return this.pg;
  }

  set force(force: p5.Vector){
    this.vel.add(force);
    this.ball.add(this.vel);
  }

  get numero(): number{
    return this.num;
  }
  
  draw(){
    this.p.push();
    //this.p.ambientMaterial(250,200,10); //ball color
    this.p.noStroke();
    //this.p.ellipse(this.ball.x, this.ball.y, this.r);
    this.p.translate(this.ball.x, this.ball.y, 0);
    this.p.rotateY(this.angle);
    this.p.rotateX(this.angle);
    //this.p.rotateZ(this.angle);
    this.p.texture(this.textura);
    this.p.sphere(this.r);
    this.angle +=0.1;
    this.p.pop();
    //this.p.stroke(0);
    //this.p.fill(0);
    //this.p.strokeWeight(1.5);
    //this.p.text(this.num+1, this.ball.x, this.ball.y+5);
    //this.p.strokeWeight(1);
    //this.p.noFill();
    this.edges_3d();
  }

  _draw(pos: { tex: number; x: number; y: number;}){
    this.p.push();
    this.p.ambientMaterial(250,200,10); //ball color
    this.p.noStroke();
    //this.p.ellipse(pos.x, pos.y, this.r);
    this.p.translate(pos.x, pos.y);
    this.p.rotateY(this.angle);
    //this.p.rotateX(this.angle);
    //this.p.rotateZ(this.angle);
    this.p.texture(this.textura);
    this.p.sphere(this.r);
    this.angle+=0.1;
    this.p.pop();
    //this.p.stroke(0);
    //this.p.fill(0);
    //this.p.strokeWeight(1.5);
    //this.p.text(pos.tex, pos.x, pos.y+5);
    //this.p.strokeWeight(1);
    //this.p.noFill();
  }
  
  private edges_3d(){
    if(this.ball.y >= this.edge){
      this.ball.y = -this.edge+this.r;
      this.vel.y *= -1
   } else if(this.ball.y <= -this.edge){
       this.ball.y = this.edge-this.r;
       this.vel.y *= +1
   } else if(this.ball.x >= this.edge){
     this.ball.x = 0-(this.edge+this.r);
     this.vel.x *= -1
   }else if(this.ball.x <= -this.edge){
       this.ball.x = 0+(this.edge-this.r);
       this.vel.x *= +1
   }
  }

  private edges(){
    if(this.ball.y >= this.p.height-this.edge){
      this.ball.y = this.p.height-(this.edge+5)
      this.vel.y *= -1
   } else if(this.ball.y <= 0+this.edge){
       this.ball.y = this.p.height+(this.edge-5)
       this.vel.y *= +1
   } else if(this.ball.x >= this.p.width-this.edge){
     this.ball.x = this.p.width-(this.edge+5)
     this.vel.x *= -1
   }else if(this.ball.x <= 0+this.edge){
       this.ball.x = this.p.width+(this.edge-5)
       this.vel.x *= +1
   }
  }
}