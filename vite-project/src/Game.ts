import * as PIXI from 'pixi.js';
import AssetManager from './assetsManager';
import { DvDSprite } from './sprite';


export class Game extends PIXI.Container{
    pixiapp: PIXI.Application;
    DvD!: DvDSprite;

    static GameLoading = new AssetManager();
    
    constructor(pixiapp: PIXI.Application){
        super();
        this.pixiapp = pixiapp;   

        this.x = 0;
        this.y = 0;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.pixiapp.stage.addChild(this);

        this.loading();
    };

    async loading() {
        await Game.GameLoading.preload([["DvD","./assets/DvDImage.png"]], () => {

            this.DvD = new DvDSprite(window.innerWidth/2, window.innerHeight/2);
            this.addChild(this.DvD);

            this.pixiapp.ticker.add(() => {
                [this.DvD.x, this.DvD.y] = this.DvD.spriteMoving(this.DvD.x, this.DvD.y)
            });
        });
    };
}