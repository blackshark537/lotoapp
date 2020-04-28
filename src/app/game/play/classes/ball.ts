import * as p5 from 'p5';

export class Ball{
  private ball: p5.Vector;
  private vel: p5.Vector;
  private r: number;
  private edge: number;

  constructor(
    private p: p5,
    private num?: number
  ){
    this.edge = 140;
    this.ball = p.createVector(p.random(0+this.edge, p.width-this.edge), p.random(0+this.edge, p.height-this.edge))
    this.r = 20;
    this.vel = p.createVector(0,5);
  }
  
  add_force(force: p5.Vector){
    this.vel.add(force)
    this.ball.add(this.vel)
  }

  get_num(): number{
    return this.num;
  }
  
  draw(){
    this.p.fill(250,200,10); //ball color
    this.p.ellipse(this.ball.x, this.ball.y, this.r);
    this.p.fill(0);
    this.p.text(this.num+1, this.ball.x, this.ball.y+5)
    this.p.noFill();
    this.edges();
  }

  _draw(pos: { tex: number; x: number; y: number;}){
    this.p.fill(250,200,10); //ball color
    this.p.ellipse(pos.x, pos.y, this.r);
    this.p.fill(0);
    this.p.text(pos.tex, pos.x, pos.y+5)
    this.p.noFill();
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