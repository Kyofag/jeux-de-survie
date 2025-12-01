// main.js

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true, 
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE, 
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MenuScene, OptionsScene, GameScene] 
};

// Définition des contrôles par défaut (Z, S, Q, D, E)
const Controls = {
    UP: Phaser.Input.Keyboard.KeyCodes.Z,
    DOWN: Phaser.Input.Keyboard.KeyCodes.S,
    LEFT: Phaser.Input.Keyboard.KeyCodes.Q,
    RIGHT: Phaser.Input.Keyboard.KeyCodes.D,
    ACTION: Phaser.Input.Keyboard.KeyCodes.E
};

const game = new Phaser.Game(config);