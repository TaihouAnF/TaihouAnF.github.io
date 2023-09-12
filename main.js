import './style.css'
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x191970,
});

document.body.appendChild(app.view);

const character = new PIXI.Sprite(PIXI.Texture.from('taihou.png'));
character.anchor.set(0.5);
character.scale.x = 0.5;
character.scale.y = 0.5;
character.x = app.screen.width / 8;
character.y = app.screen.height / 4;
app.stage.addChild(character);

// Define the character's speed
const characterSpeed = 10;

// Create an object to store key states
const keys = {};

// Listen for keydown and keyup events
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});


const handleControl = () => {
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
}

const spriteSetup = (sprite, visible, targetLocation, scale) => {
    sprite.anchor.set(0.5);
    sprite.visible = visible;
    sprite.scale.x = scale;
    sprite.scale.y = scale;
    sprite.x = targetLocation.x;
    sprite.y = targetLocation.y;
    app.stage.addChild(sprite);
};

const targetGithub = { x: app.screen.width / 4, y: 3 * app.screen.height / 4 };

const githubSpriteWhite = new PIXI.Sprite(PIXI.Texture.from('github-mark-white.png'));
spriteSetup(githubSpriteWhite, false, targetGithub, 0.5);

const githubSpriteDark = new PIXI.Sprite(PIXI.Texture.from('github-mark.png'));
spriteSetup(githubSpriteDark, true, targetGithub, 0.5);

const targetLinkedIn = { x: app.screen.width / 2, y: 3 * app.screen.height / 4 };

const linkedInSpriteWhite = new PIXI.Sprite(PIXI.Texture.from('LinkedIn-White.png'));
spriteSetup(linkedInSpriteWhite, false, targetLinkedIn, 0.5);

const linkedInSpriteDark = new PIXI.Sprite(PIXI.Texture.from('LinkedIn-Dark.png'));
spriteSetup(linkedInSpriteDark, true, targetLinkedIn, 0.5);


const proximityThreshold = 100; // Adjust this value as needed

function isPlayerNearLocation(playerX, playerY, targetX, targetY) {
    const distance = Math.sqrt(Math.pow(playerX - targetX, 2) + Math.pow(playerY - targetY, 2));
    return distance < proximityThreshold;
}

const updateClickable = (sprite1, sprite2, boolean, url) => {
    sprite1.visible = boolean;
    sprite1.interactive = boolean;
    sprite1.buttonMode = boolean;
    
    if (boolean) {
        sprite1.cursor = 'pointer';
        sprite1.on('pointerdown', () => {
            // Handle the click event here
            window.location.href = url;
        });
    } 
    else {
        sprite2.cursor = 'default';
    }

    sprite2.visible = !boolean;
}

// Create a game loop to update character position
app.ticker.add(() => {
    handleControl();

    // Check player's proximity to the target location
    const playerNearLocationGithub = isPlayerNearLocation(character.x, character.y, targetGithub.x, targetGithub.y);
    const playerNearLocationLinkedIn = isPlayerNearLocation(character.x, character.y, targetLinkedIn.x, targetLinkedIn.y);
    // const playerNearLocationItchio = isPlayerNearLocation(character.x, character.y, targetLocation.x, targetLocation.y);
    // Show or hide clickable sprites accordingly
    updateClickable(githubSpriteWhite, githubSpriteDark, playerNearLocationGithub, 'https://github.com/TaihouAnF');
    updateClickable(linkedInSpriteWhite, linkedInSpriteDark, playerNearLocationLinkedIn, 'https://www.linkedin.com/in/anson-feng/');
    // updateClickable(githubClickableSprite, playerNearLocation);
});

