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

const spriteSetup = (sprite, visible, scaleX, scaleY, targetLocation) => {
    sprite.anchor.set(0.5);
    sprite.visible = visible;
    sprite.scale.x = scaleX;
    sprite.scale.y = scaleY;
    sprite.x = targetLocation.x;
    sprite.y = targetLocation.y;
    app.stage.addChild(sprite);
};

const targetGithub = { x: app.screen.width / 4, y: 3 * app.screen.height / 4 };
const githubSpriteWhite = new PIXI.Sprite(PIXI.Texture.from('Github-White.png'));
spriteSetup(githubSpriteWhite, false, 0.5, 0.5, targetGithub);
const githubSpriteDark = new PIXI.Sprite(PIXI.Texture.from('Github-Dark.png'));
spriteSetup(githubSpriteDark, true, 0.5, 0.5, targetGithub);


const targetLinkedIn = { x: app.screen.width / 2, y: 3 * app.screen.height / 4 };
const linkedInSpriteWhite = new PIXI.Sprite(PIXI.Texture.from('LinkedIn-White.png'));
spriteSetup(linkedInSpriteWhite, false, 0.5, 0.5, targetLinkedIn);
const linkedInSpriteDark = new PIXI.Sprite(PIXI.Texture.from('LinkedIn-Dark.png'));
spriteSetup(linkedInSpriteDark, true, 0.5, 0.5, targetLinkedIn);

const targetItchio = { x: 3 * app.screen.width / 4, y: 3 * app.screen.height / 4 };
const itchioSpriteWhite = new PIXI.Sprite(PIXI.Texture.from('Itchio-White.png'));
spriteSetup(itchioSpriteWhite, false, 0.5, 0.5, targetItchio);
const itchioSpriteDark = new PIXI.Sprite(PIXI.Texture.from('Itchio-Dark.png'));
spriteSetup(itchioSpriteDark, true, 0.5, 0.5, targetItchio);



const proximityThreshold = 100; // Adjust this value as needed

function isPlayerNearLocation(character, target) {
    const distance = Math.sqrt(Math.pow(character.x - target.x, 2) + Math.pow(character.y - target.y, 2));
    return distance < proximityThreshold;
}

const updateClickable = (sprite1, sprite2, boolean, url) => {
    sprite1.visible = boolean;
    sprite1.interactive = boolean;
    sprite1.buttonMode = boolean;
    
    if (boolean) {
        sprite1.cursor = 'pointer';
        sprite1.on('pointertap', () => {
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
    const playerNearLocationGithub = isPlayerNearLocation(character, targetGithub);
    const playerNearLocationLinkedIn = isPlayerNearLocation(character, targetLinkedIn);
    const playerNearLocationItchio = isPlayerNearLocation(character, targetItchio);
    // Show or hide clickable sprites accordingly
    updateClickable(githubSpriteWhite, githubSpriteDark, playerNearLocationGithub, 'https://github.com/TaihouAnF');
    updateClickable(linkedInSpriteWhite, linkedInSpriteDark, playerNearLocationLinkedIn, 'https://www.linkedin.com/in/anson-feng/');
    updateClickable(itchioSpriteWhite, itchioSpriteDark, playerNearLocationItchio, 'https://taihoudesu.itch.io/');
});

