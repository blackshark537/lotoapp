import { Ball } from './ball';
import * as p5 from 'p5';

export class DrawBall{
    private x:number=-115;
    private y:number=-115;
    private angle:number=0;
    private radius:number=150;
    private index: number=0;
    private can_withdraw: boolean=false;
    private audio = new Audio();
    public numero = [];
    private finished = false;

    constructor(
        private p: p5,
        private data?: Ball[]
    ){ 
        this.audio.src = "assets/notify2.wav";
    }

    draw(){
        this.p.push();
        if (this.can_withdraw) { // si se puede sacar una bola
            this.x = this.p.sin(this.angle) * this.radius;
            if (this.x > 0) this.y = this.p.cos(this.angle) * (this.radius * -1); //block y
            if (this.x > -110+(this.index*15)) { // draw the ball
                let ball = this.data[this.index];
                ball._draw({ tex: this.numero[this.index], x: this.x, y: this.y });
            } else {
                this.can_withdraw = false;
                this.index += 1;
                this.audio.volume = 0.5;
                this.audio.play();
                //setTimeout(()=> this.pick_one(), 300);
                if(this.index == 6){
                    this.data[this.index].ball_type = 1;
                }
                if( this.index == 7){
                    this.data[this.index].ball_type = 2;
                }
                
            }
            this.angle += 0.07;
        }
        this.withdraw();
        this.p.pop();
    }

    pick_one(numero?: number){
        if(this.index < this.data.length){
            this.numero.push(numero);
            this.x=-150;
            this.y=-150;
            this.angle=0;
            this.can_withdraw=true;
        }
    }

    get end_drawing(): boolean{
        return this.index === this.data.length? true : false;
    }

    get draw_super(){
        return this.index === 6? true : false;
    }

    private withdraw(){
        this.data.map((ball, i)=>{
            if(i < this.index) ball._draw({ tex: this.numero[i], x: -140+(i*25), y: 150});
        });
    }
    
}
