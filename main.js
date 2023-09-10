import './style.css'
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    resizeTo: window,
    transparent: true,
});

document.body.appendChild(app.view);

const background = new PIXI.Sprite(PIXI.Texture.from('background.jpg'));
background.anchor.set(0.5);
background.x = app.screen.width / 2;
background.y = app.screen.height / 2;
app.stage.addChild(background);

const character = new PIXI.Sprite(PIXI.Texture.from('pic/taihou.png'));
character.anchor.set(0.5);
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;
app.stage.addChild(character);

// // Define the character's speed
// const characterSpeed = 5;

// // Create an object to store key states
// const keys = {};

// // Listen for keydown and keyup events
// window.addEventListener('keydown', (e) => {
//     keys[e.key] = true;
// });

// window.addEventListener('keyup', (e) => {
//     keys[e.key] = false;
// });

// // Create a game loop to update character position
// app.ticker.add(() => {
//     if (keys['w'] || keys['ArrowUp']) {
//         character.y -= characterSpeed;
//     }

//     if (keys['s'] || keys['ArrowDown']) {
//         character.y += characterSpeed;
//     }

//     if (keys['a'] || keys['ArrowLeft']) {
//         character.x -= characterSpeed;
//     }

//     if (keys['d'] || keys['ArrowRight']) {
//         character.x += characterSpeed;
//     }
// });


// Enable interactive mode for the character
character.interactive = true;
character.buttonMode = true;

// Define a function to handle character movement
function handleCharacterMovement(event) {
    character.x = event.data.global.x;
    character.y = event.data.global.y;
}

// Listen for pointer (mouse or touch) events to move the character
character.on('pointerdown', handleCharacterMovement);
character.on('pointermove', handleCharacterMovement);

// Animate the character (optional)
app.ticker.add(() => {
    // Add your character animation or game logic here
});