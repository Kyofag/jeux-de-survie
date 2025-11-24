const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true // Utile pour voir les hitboxes du joueur!
        }
    },
    // Déclare la scène que nous allons utiliser
    scene: [GameScene] 
};

// Lance le jeu
const game = new Phaser.Game(config);