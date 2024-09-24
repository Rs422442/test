import * as PIXI from 'pixi.js';
import { Game } from './Game';


export class DvDSprite extends PIXI.Container{
    vect: Record<string,number> = {
        x:Math.random(),
        y:Math.random()
    }; // не использовать массивы, заменить на объекты
    speed:number = 5;
    sprite!: PIXI.Sprite;

    constructor(xCor:number, yCor:number){
        super();
        this.spawnSprite(this);
        this.x = xCor;
        this.y = yCor;
    };

    spawnSprite(container: PIXI.Container){
        const image = Game.GameLoading.getTexture("DvD")?? PIXI.Texture.EMPTY;
        
        container.addChild(this.createSprite(image));
    }

    private createSprite(
        image:PIXI.Texture<PIXI.Resource>,
        posX:number = 0,
        posY:number = 0,
        anchorX:number = 0.5,
        anchorY:number = 0.5,
        scaleX:number = 2,
        scaleY:number = 2,
    ): PIXI.Sprite {

        this.sprite = new PIXI.Sprite(image);

        this.sprite.anchor.x = anchorX;
        this.sprite.anchor.y = anchorY;
        this.sprite.scale.x = scaleX;
        this.sprite.scale.y = scaleY;
        this.sprite.x = posX;
        this.sprite.y = posY;

        return this.sprite;
    };

    update(dt:number){
            this.x += this.speed*this.oneVect(this.vect.x)*dt;
            
            this.y += this.speed*this.oneVect(this.vect.y)*dt;

            if (this.x + this.width/2>= Game.width) {
                this.vect.x *= -1;
                this.sprite.tint = this.getRandomColor();
            };

            if (this.x - this.width/2 <= 0) {
                this.vect.x *= -1;
                this.sprite.tint = this.getRandomColor();
            };

            if (this.y+ this.height/2 >= Game.height) {
                this.vect.y *= -1;
                this.sprite.tint = this.getRandomColor();
            };            

            if (this.y - this.height/2 <= 0) {
                this.vect.y *= -1;
                this.sprite.tint = this.getRandomColor();
            };
    }

    oneVect(vect:number): number {
        return (vect)/this.vectsize(this.vect.x, this.vect.y)
    };

    vectsize(x: number, y:number): number {
        return ((x)**2 + (y)**2)**(1/2)
    };

    getRandomColor():number {
        const letters:string = '0123456789ABCDEF';
        let color:string = '0x';
        for (let i:number = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return +color;
    }
};