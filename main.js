import './style.css'
import * as PIXI from 'pixi.js';

const currentWidth = Math.max(window.innerWidth, 800);
const currentHeight = Math.max(window.innerHeight, 600);

const app = new PIXI.Application({
    width: currentWidth,
    height: currentHeight,
    backgroundColor: 0x191970,
    autoResize: true,
    // resolution: devicePixelRatio
});

document.body.appendChild(app.view);

const spriteSetup = (sprite, visible, scaleX, scaleY, targetLocation) => {
    sprite.anchor.set(0.5);
    sprite.visible = visible;
    sprite.scale.x = scaleX;
    sprite.scale.y = scaleY;
    sprite.position.set(targetLocation.x, targetLocation.y);
    app.stage.addChild(sprite);
};

const characterLocation = { x: app.screen.width / 8, y: app.screen.height / 4 };
const character = new PIXI.Sprite(PIXI.Texture.from('taihou.png'));
spriteSetup(character, true, 0.5, 0.5, characterLocation);

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

window.addEventListener('resize', () => {
    if (window.innerWidth >= 800 && window.innerHeight >= 600) {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        character.position.set(app.screen.width / 8, app.screen.height / 4);
        githubSpriteDark.position.set(app.screen.width / 4, 3 * app.screen.height / 4);
        githubSpriteWhite.position.set(app.screen.width / 4, 3 * app.screen.height / 4);
        linkedInSpriteDark.position.set(app.screen.width / 2, 3 * app.screen.height / 4);
        linkedInSpriteWhite.position.set(app.screen.width / 2, 3 * app.screen.height / 4);
        itchioSpriteDark.position.set(3 * app.screen.width / 4, 3 * app.screen.height / 4);
        itchioSpriteWhite.position.set(3 * app.screen.width / 4, 3 * app.screen.height / 4);
    }
});
