// MenuScene.js

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Optionnel : Tu peux charger ici des assets spécifiques au menu
    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        // --- Titre du Jeu ---
        this.add.text(screenWidth / 2, screenHeight / 3, 'JEU DE SURVIE RAPIDE', {
            fontSize: '48px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);

        // --- Bouton Jouer ---
        const playButton = this.add.text(screenWidth / 2, screenHeight / 2, 'COMMENCER LA SURVIE', {
            fontSize: '32px',
            fill: '#FFD700', // Couleur or
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); // Rend le texte cliquable

        // Changement de style au survol pour l'effet de bouton
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#FFFFFF', backgroundColor: '#555555' });
        });
        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#FFD700', backgroundColor: '#333333' });
        });

        // Action au clic : démarrer la GameScene
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}