// MenuScene.js

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        this.cameras.main.setBackgroundColor('#1a1a1a'); 

        // Titre du Jeu
        this.add.text(screenWidth / 2, screenHeight * 0.25, 'JEU DE SURVIE RAPIDE', {
            fontSize: '48px',
            fill: '#E0E0E0', 
            fontFamily: 'Arial' 
        })
        .setOrigin(0.5);

        // Bouton "COMMENCER LA SURVIE"
        const playButton = this.add.text(screenWidth / 2, screenHeight * 0.5, 'COMMENCER LA SURVIE', {
            fontSize: '32px',
            fill: '#FFD700', 
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); 

        playButton.on('pointerdown', () => {
            this.scene.start('GameScene'); 
        });
        
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#FFFFFF', backgroundColor: '#555555' });
        });
        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#FFD700', backgroundColor: '#333333' });
        });

        // Bouton "OPTIONS"
        const optionsButton = this.add.text(screenWidth / 2, screenHeight * 0.5 + 80, 'OPTIONS', {
            fontSize: '32px',
            fill: '#E0E0E0',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); 

        optionsButton.on('pointerdown', () => {
            this.scene.start('OptionsScene'); 
        });

        optionsButton.on('pointerover', () => {
            optionsButton.setStyle({ fill: '#FFFFFF', backgroundColor: '#555555' });
        });
        optionsButton.on('pointerout', () => {
            optionsButton.setStyle({ fill: '#E0E0E0', backgroundColor: '#333333' });
        });
    }
}