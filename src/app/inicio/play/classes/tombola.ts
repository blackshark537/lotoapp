import * as p5 from 'p5';

export class Tombola{
    
    private p: p5;
    private pg;
    private text_pg;
    private basketImg: p5.Image;
    private x;
    private y;
    private webgl;

    constructor(p: p5, basket: p5.Image, webgl?: boolean){
        this.p = p;
        this.x = p.width;
        this.y = p.height;
        this.basketImg = basket;
        this.pg = p.createGraphics(300,300);
        this.text_pg = p.createGraphics(200,50);
        this.text_pg.textAlign(this.pg.CENTER);
        this.pg.ellipseMode(this.pg.CENTER);
        this.webgl = webgl;
    }

    get basket_base(){
        this.pg.stroke(150);
        this.pg.noFill();
        this.pg.line(2,270,150,270);
        this.pg.line(2,299,160,299);
        this.pg.line(2,270, 2,299);
        this.pg.line(145,0, 145,30);
        this.pg.arc(150, 150, 298, 298, 29.8, -29.8);
        return this.pg;
    }

    text(){
        this.p.fill(0);
        this.p.stroke(0);
        this.p.text(" B o l o s ",70,this.p.height-70);
        this.p.text("1",60, this.p.height-20);
        this.p.text("2",85, this.p.height-20);
        this.p.text("3",110, this.p.height-20);
        this.p.text("4",135, this.p.height-20);
        this.p.text("5",160, this.p.height-20);
        this.p.text("6",185, this.p.height-20);
        this.p.fill(0,0,255);
        this.p.fill(0,0,255);
        this.p.text("7",210, this.p.height-20);
        this.p.fill(255,0,0);
        this.p.fill(255,0,0);
        this.p.text("8",235, this.p.height-20);
    }

    draw(){
        this.p.push();
        if(this.webgl){
            this.p.texture(this.basketImg);
            this.p.noStroke();
            this.p.plane(330,330);
            this.p.texture(this.basket_base);
            this.p.plane(330,330);
        } else {
            this.p.image(this.basketImg,this.x/2, this.y/2,330,330);
            this.p.image(this.basket_base,this.x/2, this.y/2,330,330);
            this.text();
        }
        this.p.pop();
    }
}