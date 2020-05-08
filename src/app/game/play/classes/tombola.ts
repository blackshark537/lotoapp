import * as p5 from 'p5';

export class Tombola{
    
    private p: p5;
    private basketImg: p5.Image;

    constructor(p: p5, basket: p5.Image, stand?: p5.Image){
        this.p = p;
        this.basketImg = basket;
    }

    draw(){
        this.p.push();
        this.p.translate(0,0,30)
        this.p.texture(this.basketImg);
        this.p.noStroke();
        this.p.plane(300,300);
        this.p.pop();
    }
}