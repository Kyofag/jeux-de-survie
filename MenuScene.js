// MenuScene.js

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        this.cameras.main.setBackgroundColor('#1a1a1a'); 

        // --- Titre du Jeu (CENTRÉ) ---
        this.add.text(screenWidth / 2, screenHeight / 4, 'JEU DE SURVIE RAPIDE', {
            fontSize: '48px',
            fill: '#E0E0E0', 
            fontFamily: 'Arial' 
        })
        .setOrigin(0.5);

        // --- Bouton "COMMENCER LA SURVIE" (CENTRÉ) ---
        const playButton = this.add.text(screenWidth / 2, screenHeight / 2 - 40, 'COMMENCER LA SURVIE', {
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

        // --- BOUTON "OPTIONS" (CENTRÉ) ---
        const optionsButton = this.add.text(screenWidth / 2, screenHeight / 2 + 40, 'OPTIONS', {
            fontSize: '32px',
            fill: '#E0E0E0',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); 

        optionsButton.on('pointerdown', () => {
            console.log("Ouvrir le menu d'options pour changer les contrôles.");
            
            const tempText = this.add.text(screenWidth / 2, screenHeight / 2 + 120, 
                'Contrôles par défaut: Flèches pour le mouvement, ESPACE pour l\'action.', 
                {
                    fontSize: '18px',
                    fill: '#FFFFFF'
                }).setOrigin(0.5);
            
            this.time.delayedCall(3000, () => { tempText.destroy(); }, [], this);
        });

        optionsButton.on('pointerover', () => {
            optionsButton.setStyle({ fill: '#FFFFFF', backgroundColor: '#555555' });
        });
        optionsButton.on('pointerout', () => {
            optionsButton.setStyle({ fill: '#E0E0E0', backgroundColor: '#333333' });
        });
    }
}