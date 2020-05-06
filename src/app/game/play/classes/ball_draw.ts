import { Ball } from './ball';
import * as p5 from 'p5';

export class DrawBall{
    private x:number=-115;
    private y:number=-115;
    private angle:number=0;
    private radius:number=115;
    private index: number=0;
    private can_withdraw: boolean=false;

    constructor(
        private ball: Ball,
        private p: p5,
        private data?: Ball[]
    ){ }

    draw(){
        this.p.push();
        this.p.translate(this.p.width/2, this.p.height/2);
        if (this.can_withdraw) {
            this.x = this.p.sin(this.angle) * this.radius;
            if (this.x > 0) this.y = this.p.cos(this.angle) * (this.radius * -1);
            if (this.x > -110+(this.index*15)) {
                let ball = this.data[this.index];
                ball._draw({ tex: ball.get_num(), x: this.x, y: this.y });
            } else {
                this.can_withdraw = false;
                this.index += 1;
            }
            this.angle += 0.05;
        }
        this.withdraw();
        this.p.pop();
    }

    pick_one(){
        if(this.index < this.data.length){
            this.x=-115;
            this.y=-115;
            this.angle=0;
            this.can_withdraw=true;
        }
    }

    end_drawing(): boolean{
        return this.index === this.data.length? true : false;
    }

    private withdraw(){
        this.data.map((ball, i)=>{
            if(i < this.index) ball._draw({ tex: ball.get_num(), x: -116+(i*20), y: 115});
        });
    }
    
}