import * as PIXI from 'pixi.js';
import { Game } from './Game';


export class DvDSprite extends PIXI.Container{
    vect: number[] = [];
    speed:number = 3;
    sprite!: PIXI.Sprite;

    constructor(xCor:number, yCor:number){
        super();
        this.spawnSprite(this);
        this.x = xCor;
        this.y = yCor;
        this.vect = [Math.random()*200 - this.x, Math.random()*100 - this.y]
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

    spriteMoving(xCor:number, yCor:number){
            xCor += this.speed*this.oneVect(this.vect[0]);
            
            yCor += this.speed*this.oneVect(this.vect[1]);

            

            if (xCor + this.width/2>= window.innerWidth) {
                this.vect[0] *= -1;
                this.sprite.tint = this.getRandomColor();
            };

            if (xCor - this.width/2 <= 0) {
                this.vect[0] *= -1;
                this.sprite.tint = this.getRandomColor();
            };

            if (yCor + this.height/2 >= window.innerHeight) {
                this.vect[1] *= -1;
                this.sprite.tint = this.getRandomColor();
            };            

            if (yCor - this.height/2 <= 0) {
                this.vect[1] *= -1;
                this.sprite.tint = this.getRandomColor();
            };

        return [xCor,yCor]
    }

    oneVect(vectEnd:number): number {
        return (vectEnd)/this.vectsize(this.vect)
    };

    vectsize(vect: number[]): number {
        return ((vect[0])**2 + (vect[1])**2)**(1/2)
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