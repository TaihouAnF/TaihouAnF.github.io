import './style.css'
const PIXI = require('pixi.js');

// Create a PixiJS application
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
});

// Add the PixiJS canvas to the game-container div
document.getElementById('game-container').appendChild(app.view);

// Your game logic here...

// Load and display your game assets (textures, sprites, etc.)

// Handle player interactions and movement

// Show information about you when the player enters different areas

// Example: When clicking on the "Contact" area, show contact info
document.getElementById('contact-info').addEventListener('click', () => {
    // Display contact information or trigger game logic
    alert('Contact information goes here.');
});

// Start the PixiJS application
app.start();