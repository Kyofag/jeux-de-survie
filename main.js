// main.js

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
            // Débogage désactivé par défaut, activable avec la touche '$' dans GameScene
            debug: false 
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE, // Redimensionnement actif
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    // Déclare les scènes
    scene: [MenuScene, GameScene] 
};

// Initialisation du jeu
const game = new Phaser.Game(config);

// Appeler la fonction de redimensionnement au lancement
resize(); 

// Détecter le changement de taille de la fenêtre et redimensionner le jeu
window.addEventListener('resize', resize, false);