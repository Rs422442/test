import * as PIXI from 'pixi.js';
import { Game } from './Game';

document.addEventListener('DOMContentLoaded', () =>
  {
    const pixiapp = new PIXI.Application(
      {
        width: window.innerWidth,
        height: window.innerHeight,
        resizeTo: window,
        backgroundColor: 0xFFFFFF
      });

      document.body.appendChild(pixiapp.view);

      new Game(pixiapp); 
  });