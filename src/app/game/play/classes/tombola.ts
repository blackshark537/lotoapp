import * as p5 from 'p5';

export class Tombola{
    
    private p: p5;
    private basketImg: p5.Image;
    private standImg: p5.Image
    constructor(p: p5, basket: p5.Image, stand?: p5.Image){
        this.p = p;
        this.standImg = stand;
        this.basketImg = basket;
    }

    draw(){
        this.p.arc(this.p.width/2, this.p.height/2, 255, 255,  4.64, 83.22);
        this.p.line(this.p.width/2-10, this.p.height/2-100, this.p.width/2-10, this.p.height/2-127); // | up
        this.p.line(this.p.width/2+10, this.p.height/2+100, this.p.width/2-130, this.p.height/2+100); //---- down up
        this.p.line(this.p.width/2+10, this.p.height/2+127, this.p.width/2-130, this.p.height/2+127); //---- down down
        this.p.line(this.p.width/2-130, this.p.height/2+100, this.p.width/2-130, this.p.height/2+127);// | close line
        this.p.image(this.basketImg, this.p.width/2, this.p.height/2, 250, 250);
    }
}