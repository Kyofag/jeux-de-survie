// main.js

// L'importation est maintenant './GameScene.js'
import { GameScene } from './GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 960, 
    height: 640,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, 
            debug: true
        }
    },
    scene: [GameScene]
};

new Phaser.Game(config);