import * as p5 from 'p5';

export class Tombola{
    
    private p: p5;
    private pg;
    private basketImg: p5.Image;
    private x;
    private y;

    constructor(p: p5, basket: p5.Image, stand?: p5.Image){
        this.p = p;
        this.x = p.width;
        this.y = p.height;
        this.basketImg = basket;
        this.pg = p.createGraphics(300,300);
        this.pg.textAlign(this.pg.CENTER);
        this.pg.ellipseMode(this.pg.CENTER);
    }

    get basket_base(){
        this.pg.stroke(150);
        this.pg.noFill();
        this.pg.line(2,270,150,270);
        this.pg.line(2,299,160,299);
        this.pg.line(2,270, 2,299);
        this.pg.line(145,0, 145,30);
        this.pg.arc(150, 150, 298, 298, 29.8, -29.8);
        this.pg.fill(0);
        this.pg.stroke(0);
        this.pg.text("L o t o ",20,265)
        return this.pg;
    }
    draw(){
        this.p.push();
        //this.p.translate(this.x/2, this.y/2,30);
        /* this.p.texture(this.basketImg);
        this.p.noStroke();
        this.p.plane(300,300); */
        this.p.image(this.basketImg,this.x/2, this.y/2,330,330);
        //this.p.translate(this.x/2, this.y/2);
        /* this.p.texture(this.basket_base);
        this.p.plane(300,300); */
        this.p.image(this.basket_base,this.x/2, this.y/2,330,330);
        this.p.pop();
    }
}