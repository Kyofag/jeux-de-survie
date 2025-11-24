// main.js

// Fonction pour ajuster la taille du jeu à la fenêtre
function resize() {
    const game_width = window.innerWidth;
    const game_height = window.innerHeight;
    
    // Si le jeu a déjà été créé, nous mettons à jour sa taille
    if (game) {
        game.scale.resize(game_width, game_height);
    }
}

// Configuration du jeu
const config = {
    type: Phaser.AUTO,
    width: 800, // Les valeurs initiales n'ont plus d'importance, elles seront écrasées
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false 
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE, // DIT À PHASER DE GÉRER LE REDIMENSIONNEMENT
        autoCenter: Phaser.Scale.CENTER_BOTH // Centre le jeu à l'écran
    },
    scene: [MenuScene, GameScene] 
};

// Initialisation du jeu
const game = new Phaser.Game(config);

// Appeler la fonction de redimensionnement au lancement
resize(); 

// Détecter le changement de taille de la fenêtre et redimensionner le jeu
window.addEventListener('resize', resize, false);