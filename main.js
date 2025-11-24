// main.js

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
    // Déclare les deux scènes, le Menu sera chargé en premier
    scene: [MenuScene, GameScene] 
};

// Lance le jeu
const game = new Phaser.Game(config);