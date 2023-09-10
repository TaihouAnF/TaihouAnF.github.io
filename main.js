import './style.css'
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    resizeTo: window,
    transparent: true,
});

document.body.appendChild(app.view);

const character = new PIXI.Sprite(PIXI.Texture.from('taihou.png'));
character.anchor.set(0.5);
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;
app.stage.addChild(character);

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
});

const clickableSprite = new PIXI.Sprite(PIXI.Texture.from('github-mark-white.png'));
clickableSprite.visible = false; // Initially hidden
app.stage.addChild(clickableSprite);

const proximityThreshold = 100; // Adjust this value as needed
const targetLocation = { x: 400, y: 300 }; // Replace with your target coordinates

function isPlayerNearLocation(playerX, playerY, targetX, targetY) {
    const distance = Math.sqrt(Math.pow(playerX - targetX, 2) + Math.pow(playerY - targetY, 2));
    return distance < proximityThreshold;
}

app.ticker.add(() => {
    // Check player's proximity to the target location
    const playerNearLocation = isPlayerNearLocation(player.x, player.y, targetLocation.x, targetLocation.y);

    // Show or hide clickable sprites accordingly
    clickableSprite.visible = playerNearLocation;
});