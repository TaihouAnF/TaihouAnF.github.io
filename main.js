import './style.css'
import * as PIXI from 'pixi.js';

// Create a PixiJS application
const app = new PIXI.Application({
    width: 800,
    height: 800
});

// Add the PixiJS canvas to the game-container div
document.body.appendChild(app.view);

// Your game logic here...