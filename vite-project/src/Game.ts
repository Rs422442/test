import * as PIXI from 'pixi.js';
import AssetManager from './assetsManager';
import { DvDSprite } from './sprite';


export class Game extends PIXI.Container{
    pixiApp: PIXI.Application;
    DvD!: DvDSprite;
    static width = window.innerWidth;
    static height = window.innerHeight;

    static GameLoading = new AssetManager();
    
    constructor(pixiApp: PIXI.Application){
        super();
        this.pixiApp = pixiApp;   

        this.x = 0;
        this.y = 0;

        this.width = Game.width;
        this.height = Game.height;

        this.pixiApp.stage.addChild(this);

        this.loading();
    };

    async loading() {
        await Game.GameLoading.preload([["DvD","./assets/DvDImage.png"]], () => {

            this.DvD = new DvDSprite(window.innerWidth/2, window.innerHeight/2);
            this.addChild(this.DvD);

            this.pixiApp.ticker.add((ticker) => {
                this.DvD.update(ticker)
            });
        });
    };
}