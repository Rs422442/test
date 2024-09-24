import * as PIXI from 'pixi.js';
import { Game } from './Game';


export class DvDSprite extends PIXI.Container{
    vect: number[] = [];
    speed:number = 1;

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
        scaleX:number = 1,
        scaleY:number = 1,
    ): PIXI.Sprite {

        const sprite = new PIXI.Sprite(image);

        sprite.anchor.x = anchorX;
        sprite.anchor.y = anchorY;
        sprite.scale.x = scaleX;
        sprite.scale.y = scaleY;
        sprite.x = posX;
        sprite.y = posY;

        return sprite;
    };

    spriteMoving(xCor:number, yCor:number){
            xCor += this.speed*this.oneVect(this.vect[0]);
            
            yCor += this.speed*this.oneVect(this.vect[1]);

            if (xCor + this.width/2>= window.innerWidth) {
                this.vect[0] *= -1;
            };

            if (xCor - this.width/2 <= 0) {
                this.vect[0] *= -1;
            };

            if (yCor + this.height/2 >= window.innerHeight) {
                this.vect[1] *= -1;
            };            

            if (yCor - this.height/2 <= 0) {
                this.vect[1] *= -1;
            };
        return [xCor,yCor]
    }

    oneVect(vectEnd:number): number {
        return (vectEnd)/this.vectsize(this.vect)
    };

    vectsize(vect: number[]): number {
        return ((vect[0])**2 + (vect[1])**2)**(1/2)
    };
};