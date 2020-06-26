import * as p5 from 'p5';

export class Ball{
  private ball: p5.Vector;
  private vel: p5.Vector;
  private r: number;
  private pg
  private angle = 0;
  public ball_type = 0;
  private audio = new Audio();
  private webgl;

  constructor(
    private p: p5,
    private num?: number,
    webgl?: boolean
  ){
    this.webgl = webgl;
    this.audio.src = 'assets/ball_hit.wav';
    this.audio.volume = 0.2;
    this.ball = p.createVector(p.random(-70,70), p.random(-70,30), 0);
    this.r = 50;
    this.vel = p.createVector(0,5);
    this.pg = p.createGraphics(50,50);
    this.pg.textAlign(this.pg.CENTER);
    this.pg.ellipseMode(this.pg.CENTER);
  }

  get textura2() {
    if(this.ball_type == 0) this.pg.fill(250,250,250);//this.pg.fill(255,200,0);
    if(this.ball_type == 1) this.pg.fill(255,0,0);
    if(this.ball_type == 2) this.pg.fill(0,0,255);
    this.pg.noStroke();
    this.pg.ellipse(25,25,25);

    if(this.ball_type == 0){ 
      this.pg.fill(0);
      this.pg.stroke(0);
    } else {
      this.pg.fill(250);
      this.pg.stroke(250);
    }
    this.pg.text(this.num, 25, 28);
    this.pg.text('_', 25, 30);
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
    this.p.noStroke();

    if(this.webgl){
      this.p.translate(this.ball.x, this.ball.y, 0);
      this.p.rotateZ(this.angle*-1);
      this.p.texture(this.textura2);
      this.p.plane(this.r);
      this.angle +=0.1;
    } else {
      this.p.translate(this.p.width/2, this.p.height/2);
      this.p.image(this.textura2,this.ball.x, this.ball.y);
    }
    this.edges_3d();
    this.p.pop();
  }

  _draw(pos: { tex: number; x: number; y: number;}){
    this.p.push();
    this.p.noStroke();
    if(this.webgl){
      this.p.translate(pos.x, pos.y,0);
      //this.p.rotateZ(this.angle*-1);
      this.p.texture(this.textura2);
      this.p.plane(this.r);
      this.angle+=0.1;
    } else {
      this.p.translate(this.p.width/2, this.p.height/2);
      this.p.image(this.textura2, pos.x, pos.y);
    }
    this.p.pop();
  }
  
  private edges_3d(){
    if(this.ball.y >= 80){
      this.ball.y = 60;
      this.vel.y *= -1
   } else if(this.ball.y <= -80){
       this.ball.y = -60;
       this.vel.y *= -1
       //this.audio.play();
   }else if(this.ball.x >= 80){
     this.ball.x = 60;
     this.vel.x *= -1
   }else if(this.ball.x <= -80){
       this.ball.x = -60
       this.vel.x *= 1
   }
  }

}