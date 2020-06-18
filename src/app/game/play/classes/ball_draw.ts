import { Ball } from './ball';
import * as p5 from 'p5';

export class DrawBall{
    private x:number=-115;
    private y:number=-115;
    private angle:number=0;
    private radius:number=150;
    private index: number=0;
    private can_withdraw: boolean=false;

    constructor(
        private p: p5,
        private data?: Ball[]
    ){ }

    draw(){
        this.p.push();
        if (this.can_withdraw) {
            this.x = this.p.sin(this.angle) * this.radius;
            if (this.x > 0) this.y = this.p.cos(this.angle) * (this.radius * -1);
            if (this.x > -110+(this.index*15)) {
                let ball = this.data[this.index];
                ball._draw({ tex: ball.numero, x: this.x, y: this.y });
            } else {
                this.can_withdraw = false;
                this.index += 1;
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

    pick_one(){
        if(this.index < this.data.length){
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
            if(i < this.index) ball._draw({ tex: ball.numero, x: -140+(i*25), y: 150});
        });
    }
    
}
