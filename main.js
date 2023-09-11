import './style.css'
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    // resizeTo: window,
    width: innerWidth,
    height: innerHeight,
    transparent: true,
});

document.body.appendChild(app.view);

const background = new PIXI.Sprite(PIXI.Texture.from('background.png'));
background.anchor.set(0.5);
background.x = app.screen.width / 2;
background.y = app.screen.height / 2;
app.stage.addChild(background);

const character = new PIXI.Sprite(PIXI.Texture.from('taihou.png'));
character.anchor.set(0.5);
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;
app.stage.addChild(character);

const githubClickableSprite = new PIXI.Sprite(PIXI.Texture.from('github-mark-white.png'));
githubClickableSprite.anchor.set(0.5);
githubClickableSprite.x = app.screen.width / 2 + 100;
githubClickableSprite.y = app.screen.height / 2 + 200;
app.stage.addChild(githubClickableSprite);

// Define the character's speed
const characterSpeed = 5;

// Create an object to store key states
const keys = {};

// Listen for keydown and keyup events
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

const proximityThreshold = 100; // Adjust this value as needed
const targetLocation = { x: githubClickableSprite.x, y: githubClickableSprite.y }; // Replace with your target coordinates

function isPlayerNearLocation(playerX, playerY, targetX, targetY) {
    const distance = Math.sqrt(Math.pow(playerX - targetX, 2) + Math.pow(playerY - targetY, 2));
    return distance < proximityThreshold;
}

const updateClickable = (sprite, boolean) => {
    sprite.visible = boolean;
    sprite.interactive = boolean;
    sprite.buttonMode = boolean;
    if (boolean) {
        sprite.cursor = 'pointer';
    }
}

githubClickableSprite.on('pointerdown', () => {
    // Handle the click event here
    window.location.href = 'https://github.com/TaihouAnF';
});

// Create a game loop to update character position
app.ticker.add(() => {
    if (keys['w'] || keys['ArrowUp']) {
        character.y -= characterSpeed;
    }

    if (keys['s'] || keys['ArrowDown']) {
        character.y += characterSpeed;
    }

    if (keys['a'] || keys['ArrowLeft']) {
        character.x -= characterSpeed;
    }

    if (keys['d'] || keys['ArrowRight']) {
        character.x += characterSpeed;
    }

    // Check player's proximity to the target location
    const playerNearLocation = isPlayerNearLocation(character.x, character.y, targetLocation.x, targetLocation.y);

    // Show or hide clickable sprites accordingly
    updateClickable(githubClickableSprite, playerNearLocation);
});

