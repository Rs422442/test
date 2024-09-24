import * as PIXI from 'pixi.js';
import { Game } from './Game';

  const pixiApp = new PIXI.Application(
    {
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTo: window,
      backgroundColor: 0xFFFFFF
    });

    document.body.appendChild(pixiApp.view);

    new Game(pixiApp); 