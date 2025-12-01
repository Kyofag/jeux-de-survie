import { GameScene } from './src/GameScene.js';

// Configuration du jeu Phaser
const config = {
    type: Phaser.AUTO, // Utilise WebGL si possible, sinon Canvas
    width: 960, // 30 tuiles * 32px (ou 15 tuiles * 64px si vous utilisez un scale)
    height: 640, // 20 tuiles * 32px (ou 10 tuiles * 64px)
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // Le système de physique est essentiel pour le mouvement du joueur
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Pas de gravité pour un jeu top-down
            debug: true // Mettez à 'false' en production
        }
    },
    scene: [GameScene]
};

// Lance le jeu !
const game = new Phaser.Game(config);