// main.js

// Fonction pour ajuster la taille du jeu à la fenêtre (inchangée)
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
            // Mettre debug à FALSE par défaut
            debug: false 
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MenuScene, GameScene] 
};

const game = new Phaser.Game(config);

resize(); 
window.addEventListener('resize', resize, false);