// main.js

// --- Objet de configuration des contrôles ---
const Controls = {
    UP: Phaser.Input.Keyboard.KeyCodes.UP,
    DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
    LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
    RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    ACTION: Phaser.Input.Keyboard.KeyCodes.SPACE 
};
// ----------------------------------------------------

// Fonction pour ajuster la taille du jeu à la fenêtre
function resize() {
    const game_width = window.innerWidth;
    const game_height = window.innerHeight;
    
    if (game) {
        game.scale.resize(game_width, game_height);
    }
}

// Configuration du jeu
const config = {
    type: Phaser.AUTO,
    width: 800, 
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false 
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE, 
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MenuScene, GameScene] 
};

// Initialisation du jeu
const game = new Phaser.Game(config);

resize(); 
window.addEventListener('resize', resize, false);