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
character.x = app.screen.width / 8;
character.y = app.screen.height / 4;
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

const targetGithub = { x: app.screen.width / 4, y: 3 * app.screen.height / 4 };

const spriteSetup = (sprite, visible, targetLocation) => {
    sprite.anchor.set(0.5);
    sprite.visible = visible;
    sprite.x = targetLocation.x;
    sprite.y = targetLocation.y;
    app.stage.addChild(sprite);
};

const githubSpriteWhite = new PIXI.Sprite(PIXI.Texture.from('github-mark-white.png'));
// githubSpriteWhite.anchor.set(0.5);
// githubSpriteWhite.visible = false;
// githubSpriteWhite.x = targetGithub.x;
// githubSpriteWhite.y = targetGithub.y;
// app.stage.addChild(githubSpriteWhite);
spriteSetup(githubSpriteWhite, false, targetGithub);

const githubSpriteDark = new PIXI.Sprite(PIXI.Texture.from('github-mark.png'));
// githubSpriteDark.anchor.set(0.5);
// githubSpriteDark.visible = true;
// githubSpriteDark.x = targetGithub.x;
// githubSpriteDark.y = targetGithub.y;
// app.stage.addChild(githubSpriteDark);
spriteSetup(githubSpriteDark, true, targetGithub);





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
        githubSpriteWhite.on('pointerdown', () => {
            // Handle the click event here
            window.location.href = url;'https://github.com/TaihouAnF'
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
    // const playerNearLocationLinkedIn = isPlayerNearLocation(character.x, character.y, targetLocation.x, targetLocation.y);
    // const playerNearLocationItchio = isPlayerNearLocation(character.x, character.y, targetLocation.x, targetLocation.y);
    // Show or hide clickable sprites accordingly
    updateClickable(githubSpriteWhite, githubSpriteDark, playerNearLocationGithub, 'https://github.com/TaihouAnF');
    // updateClickable(githubClickableSprite, playerNearLocation);
    // updateClickable(githubClickableSprite, playerNearLocation);
});

