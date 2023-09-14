import './style.css'
import * as PIXI from 'pixi.js';


const defaultWidth = Math.max(window.innerWidth, 800);
const defaultHeight = Math.max(window.innerHeight, 600);

const app = new PIXI.Application({
    width: defaultWidth,
    height: defaultHeight,
    backgroundColor: 0x191970,
    autoResize: true,
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

    
    // Continue with creating text using the custom font
    
const textDummy = new PIXI.HTMLText ("Dummy", {fontFamily: 'Pixelfont'}); // I suspect the issue was loading the font, 
                                                                          // I put a dummy html text here just for making
                                                                          // the font work, I don't like this at all.
textDummy.style.loadFont('font/pixel.ttf', {family: 'Pixelfont'}).then();

const textStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 20,
        fontFamily: "Pixelfont",
        wordWrap: true,
        wordWrapWidth: 800,
});

const textContent1 = "Welcome! I'm Anson/Taihou.\n\n";
const textContent2 = "I like developing/coding game features \n\nwhile I also enjoy playing games.\n\n";
const textContent3 = "This is an ongoing project that will be\n\nconstantly updated. And it is a game:\n\n";
const textContent4 = "1.Use WASD/Arrow keys to move my avatar;\n\n2.Move Close to icons to unlock them;\n\n3.then you can click on them to pass the\n\nportal to find out more about me.";
const text1 = new PIXI.Text("");
text1.text = textContent1 + textContent2 + textContent3 + textContent4;
text1.x = app.screen.width / 4;
text1.y = app.screen.height / 8;
text1.style = textStyle;

// Add the text to the PixiJS stage
app.stage.addChild(text1);

// Create a game loop to update character position
app.ticker.add(() => {
    handleControl();

    // Check player's proximity to the target location
    let curtargetGithub = { x: app.screen.width / 4, y: 3 * app.screen.height / 4 };
    let curtargetLinkedIn = { x: app.screen.width / 2, y: 3 * app.screen.height / 4 };
    let curtargetItchio = { x: 3 * app.screen.width / 4, y: 3 * app.screen.height / 4 };
    const playerNearLocationGithub = isPlayerNearLocation(character, curtargetGithub);
    const playerNearLocationLinkedIn = isPlayerNearLocation(character, curtargetLinkedIn);
    const playerNearLocationItchio = isPlayerNearLocation(character, curtargetItchio);
    // Show or hide clickable sprites accordingly
    updateClickable(githubSpriteWhite, githubSpriteDark, playerNearLocationGithub, 'https://github.com/TaihouAnF');
    updateClickable(linkedInSpriteWhite, linkedInSpriteDark, playerNearLocationLinkedIn, 'https://www.linkedin.com/in/anson-feng/');
    updateClickable(itchioSpriteWhite, itchioSpriteDark, playerNearLocationItchio, 'https://taihoudesu.itch.io/');
});

window.addEventListener('resize', () => {
    const currentWidth = Math.max(window.innerWidth, 800);
    const currentHeight = Math.max(window.innerHeight, 600);
    app.renderer.resize(currentWidth, currentHeight);
    character.position.set(app.screen.width / 8, app.screen.height / 4);
    githubSpriteDark.position.set(app.screen.width / 4, 3 * app.screen.height / 4);
    githubSpriteWhite.position.set(app.screen.width / 4, 3 * app.screen.height / 4);
    linkedInSpriteDark.position.set(app.screen.width / 2, 3 * app.screen.height / 4);
    linkedInSpriteWhite.position.set(app.screen.width / 2, 3 * app.screen.height / 4);
    itchioSpriteDark.position.set(3 * app.screen.width / 4, 3 * app.screen.height / 4);
    itchioSpriteWhite.position.set(3 * app.screen.width / 4, 3 * app.screen.height / 4);
    text1.position.set(app.screen.width / 4, app.screen.height / 8);
});
